// Info: Generator for the named component exports block and the render-time
// dependency manifest. Reads components.js as the single source of truth for
// the registry-key to factory-file mapping, then writes two artifacts.
//
// Run from the repo root: node .github/ci-scripts/generate-exports.js
//
// Writes:
//   data/component-exports.generated.js  - the named export block, spliced into components.js
//   data/component-deps.js               - render-time dependency manifest
//
// Both artifacts are deterministic. The G21 CI gate regenerates them and
// fails on any diff, so a hand edit cannot drift from components.js.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const COMPONENTS_FILE = path.join(ROOT, 'components.js');
const EXPORTS_OUT = path.join(ROOT, 'data', 'component-exports.generated.js');
const DEPS_OUT = path.join(ROOT, 'data', 'component-deps.js');


/////////////////////////// Private Functions START ////////////////////////////

/********************************************************************
Parse components.js and return the registry-key to factory-path map.
Covers all four registration namespaces: flat, variant, freeform,
and provider.

@param {String} src - Full text of components.js

@return {Object} - { flat, variant, freeform, provider } name maps
*********************************************************************/
const parseRegistrations = function (src) {

  // Map every factory import identifier to its relative module path
  const imports = {};
  const importPattern = /^import\s+([A-Za-z0-9]+Factory)\s+from\s+'(\.\/component\/[^']+)';/gm;
  let match = importPattern.exec(src);

  while (match !== null) {
    imports[match[1]] = match[2];
    match = importPattern.exec(src);
  }

  // Collect flat registrations: Component.Name = make(nameFactory);
  const flat = {};
  const flatPattern = /^\s+Component\.([A-Za-z0-9]+)\s*=\s*make\(([A-Za-z0-9]+Factory)\);/gm;
  match = flatPattern.exec(src);

  while (match !== null) {
    flat[match[1]] = imports[match[2]];
    match = flatPattern.exec(src);
  }

  // Collect variant registrations: Name: make(nameFactory)
  const variant = {};
  const variantPattern = /^\s{8}([A-Za-z0-9]+):\s*make\(([A-Za-z0-9]+Factory)\)/gm;
  match = variantPattern.exec(src);

  while (match !== null) {
    variant[match[1]] = imports[match[2]];
    match = variantPattern.exec(src);
  }

  // Collect freeform registrations: Name: nameFactory(Lib)
  const freeform = {};
  const freeformPattern = /^\s{8}([A-Za-z0-9]+):\s*([A-Za-z0-9]+Factory)\(Lib\)/gm;
  match = freeformPattern.exec(src);

  while (match !== null) {
    freeform[match[1]] = imports[match[2]];
    match = freeformPattern.exec(src);
  }

  // Collect provider registrations by pairing module vars to registry keys
  const providerModules = {};
  const provModPattern = /^\s+const\s+([A-Za-z0-9]+)Module\s*=\s*([A-Za-z0-9]+Factory)\(/gm;
  match = provModPattern.exec(src);

  while (match !== null) {
    providerModules[match[1]] = imports[match[2]];
    match = provModPattern.exec(src);
  }

  // Resolve provider registry keys to their factory paths
  const provider = {};
  const provKeyPattern = /^\s+([A-Za-z0-9]+):\s*([A-Za-z0-9]+)Module\.[A-Za-z0-9]+,?$/gm;
  match = provKeyPattern.exec(src);

  while (match !== null) {
    provider[match[1]] = providerModules[match[2]];
    match = provKeyPattern.exec(src);
  }

  // Return the four namespace maps
  return { flat: flat, variant: variant, freeform: freeform, provider: provider };

};


/********************************************************************
Scan every component file for render-time Registry dereferences and
build the dependency manifest keyed by registry name.

@param {Object} nameToPath - Registry key to relative factory path

@return {Object} - Registry key to sorted array of dependency keys
*********************************************************************/
const buildDependencyMap = function (nameToPath) {

  // Invert the map so a file path resolves back to its registry key
  const deps = {};
  const names = Object.keys(nameToPath);

  // Scan each component file for Registry.X references
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const filePath = path.join(ROOT, nameToPath[name]);

    // Skip a registration whose file is missing rather than crashing
    if (!fs.existsSync(filePath)) {
      continue;
    }

    // Read the source and collect every Registry dereference
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    const found = new Set();

    // Walk each line, ignoring comment and JSDoc rows
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l];
      const trimmed = line.trim();

      // Skip comment lines so documentation mentions do not count
      if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
        continue;
      }

      // Record every Registry.X identifier on this line
      const refPattern = /Registry\.([A-Za-z][A-Za-z0-9]*)/g;
      let ref = refPattern.exec(line);

      while (ref !== null) {
        found.add(ref[1]);
        ref = refPattern.exec(line);
      }

    }

    // Record only components that actually depend on siblings
    if (found.size > 0) {
      deps[name] = Array.from(found).sort();
    }

  }

  // Return the completed manifest
  return deps;

};


/********************************************************************
Render the named export block for one namespace as sorted ESM lines.

@param {String} heading    - Section comment heading
@param {Object} nameToPath - Registry key to relative factory path

@return {String} - Rendered export lines
*********************************************************************/
const renderExportBlock = function (heading, nameToPath) {

  // Sort keys so the generated output is byte-stable across runs
  const names = Object.keys(nameToPath).sort();
  let out = '// ~~~~~~~~~~ ' + heading + ' ~~~~~~~~~~\n';

  // Emit one re-export line per registry key
  for (let i = 0; i < names.length; i++) {
    out += 'export { default as ' + names[i] + ' } from \'' + nameToPath[names[i]] + '\';\n';
  }

  // Return the rendered block
  return out;

};

/////////////////////////// Private Functions END //////////////////////////////



/////////////////////////// Main START /////////////////////////////////////////

// Read components.js and parse every registration namespace
const src = fs.readFileSync(COMPONENTS_FILE, 'utf8');
const reg = parseRegistrations(src);

// Merge all namespaces into one flat export surface and assert no collisions
const all = {};
const groups = [reg.flat, reg.variant, reg.freeform, reg.provider];

// Fold each namespace in, failing loudly on a duplicate registry key
for (let g = 0; g < groups.length; g++) {
  const keys = Object.keys(groups[g]);

  // Copy each key, refusing to overwrite an existing entry
  for (let k = 0; k < keys.length; k++) {

    // A duplicate key would silently shadow an export, so stop the run
    if (Object.prototype.hasOwnProperty.call(all, keys[k])) {
      throw new Error('Duplicate registry key across namespaces: ' + keys[k]);
    }

    all[keys[k]] = groups[g][keys[k]];
  }

}

// Build the export artifact from the four namespaces in stable order
let exportsOut = '// Info: GENERATED FILE - do not edit by hand.\n';
exportsOut += '// Produced by .github/ci-scripts/generate-exports.js from components.js.\n';
exportsOut += '// This block is spliced into components.js between the\n';
exportsOut += '// "Named Component Exports START" and "END" banners.\n\n';
exportsOut += renderExportBlock('Atoms, molecules, and composites', reg.flat) + '\n';
exportsOut += renderExportBlock('Variants', reg.variant) + '\n';
exportsOut += renderExportBlock('Freeform', reg.freeform) + '\n';
exportsOut += renderExportBlock('Providers', reg.provider);

// Write the export artifact
fs.writeFileSync(EXPORTS_OUT, exportsOut, 'utf8');

// Build the render-time dependency manifest across every namespace
const deps = buildDependencyMap(all);
const depNames = Object.keys(deps).sort();

// Render the manifest as a frozen ESM default export
let depsOut = '// Info: GENERATED FILE - do not edit by hand.\n';
depsOut += '// Produced by .github/ci-scripts/generate-exports.js from components.js.\n';
depsOut += '//\n';
depsOut += '// Render-time component dependencies. A component listed here reads the\n';
depsOut += '// named siblings from the shared registry when it renders, so a consumer\n';
depsOut += '// using createSystem must register those siblings too. checkRegistry()\n';
depsOut += '// reads this manifest to report what is missing.\n\n';
depsOut += 'const COMPONENT_DEPS = Object.freeze({\n';

// Emit one frozen entry per component that has dependencies
for (let i = 0; i < depNames.length; i++) {
  const name = depNames[i];
  const quoted = deps[name].map(function (dep) {
    return '\'' + dep + '\'';
  });
  const list = quoted.join(', ');
  const comma = i === depNames.length - 1 ? '' : ',';
  depsOut += '  ' + name + ': Object.freeze([' + list + '])' + comma + '\n';
}

depsOut += '});\n\n';
depsOut += 'export default COMPONENT_DEPS;\n';

// Write the manifest artifact
fs.writeFileSync(DEPS_OUT, depsOut, 'utf8');

// Report what was generated
process.stdout.write('generate-exports: ' + Object.keys(all).length + ' named exports ('
  + Object.keys(reg.flat).length + ' flat, '
  + Object.keys(reg.variant).length + ' variant, '
  + Object.keys(reg.freeform).length + ' freeform, '
  + Object.keys(reg.provider).length + ' provider)\n');
process.stdout.write('generate-exports: ' + depNames.length + ' components with render-time deps\n');

/////////////////////////// Main END ///////////////////////////////////////////
