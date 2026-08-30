// Info: Generator for the named component exports block, the registration
// barrel, and the render-time dependency manifest. Scans the component
// directory tree as the single source of truth: one file under a namespace
// directory is one component, and its registry key is its basename with the
// first letter capitalized.
//
// Run from the repo root: node .github/ci-scripts/generate-exports.js
//
// Writes:
//   data/component-exports.generated.js  - named export block, spliced into components.js
//   all.js                               - registration barrel for consumers wanting everything
//   data/component-deps.js               - render-time dependency manifest
//
// All three artifacts are deterministic. The G21 CI gate regenerates them and
// fails on any diff, so a hand edit cannot drift from the directory tree.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const COMPONENT_DIR = path.join(ROOT, 'component');
const EXPORTS_OUT = path.join(ROOT, 'data', 'component-exports.generated.js');
const DEPS_OUT = path.join(ROOT, 'data', 'component-deps.js');
const BARREL_OUT = path.join(ROOT, 'all.js');

// The six component namespaces, in registration order. Any other directory
// under component/ holds shared infrastructure, not components, and is
// deliberately excluded: component/context/ and component/commonStyles.js.
const NAMESPACES = [
  { dir: 'atom', group: 'flat', heading: 'Atoms' },
  { dir: 'molecule', group: 'flat', heading: 'Molecules' },
  { dir: 'composite', group: 'flat', heading: 'Composites' },
  { dir: 'variant', group: 'variant', heading: 'Variants' },
  { dir: 'freeform', group: 'freeform', heading: 'Freeform' },
  { dir: 'provider', group: 'provider', heading: 'Providers' }
];


/////////////////////////// Private Functions START ////////////////////////////

/********************************************************************
Scan the component namespace directories and return every component
keyed by registry name.

@return {Array} - Sorted entries of { name, importPath, group, dir }
*********************************************************************/
const scanComponents = function () {

  // Collect one entry per component file across all six namespaces
  const found = [];

  // Walk each namespace directory in registration order
  for (let n = 0; n < NAMESPACES.length; n++) {
    const ns = NAMESPACES[n];
    const dirPath = path.join(COMPONENT_DIR, ns.dir);

    // A missing namespace directory is a structural error, not a skip
    if (!fs.existsSync(dirPath)) {
      throw new Error('Missing component namespace directory: ' + ns.dir);
    }

    // Read every JavaScript file in this namespace, sorted for stability
    const files = fs.readdirSync(dirPath)
      .filter(function (file) {
        return file.endsWith('.js');
      })
      .sort();

    // Derive the registry key from each filename
    for (let f = 0; f < files.length; f++) {
      const base = files[f].replace('.js', '');
      const name = base[0].toUpperCase() + base.slice(1);

      found.push({
        name: name,
        importPath: './component/' + ns.dir + '/' + files[f],
        group: ns.group,
        dir: ns.dir,
        varName: base + 'Factory'
      });

    }

  }

  // Fail loudly on a duplicate registry key across namespaces
  const seen = {};

  // Check every entry for a name collision
  for (let i = 0; i < found.length; i++) {

    // A duplicate would silently shadow an export, so stop the run
    if (Object.prototype.hasOwnProperty.call(seen, found[i].name)) {
      throw new Error('Duplicate registry key across namespaces: ' + found[i].name);
    }

    seen[found[i].name] = true;
  }

  // Return the complete component inventory
  return found;

};


/********************************************************************
Scan every component file for render-time Registry dereferences and
build the dependency manifest keyed by registry name.

@param {Array} entries - Component inventory from scanComponents

@return {Object} - Registry key to sorted array of dependency keys
*********************************************************************/
const buildDependencyMap = function (entries) {

  // Collect the sibling dependencies each component reads at render time
  const deps = {};

  // Scan each component file for Registry.X references
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const filePath = path.join(ROOT, entry.importPath);

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
      deps[entry.name] = Array.from(found).sort();
    }

  }

  // Return the completed manifest
  return deps;

};


/********************************************************************
Render the named export block for one namespace as sorted ESM lines.

@param {String} heading - Section comment heading
@param {Array}  entries - Component entries for this namespace

@return {String} - Rendered export lines
*********************************************************************/
const renderExportBlock = function (heading, entries) {

  // Sort by registry key so the generated output is byte-stable
  const sorted = entries.slice().sort(function (a, b) {
    return a.name < b.name ? -1 : 1;
  });
  let out = '// ~~~~~~~~~~ ' + heading + ' ~~~~~~~~~~\n';

  // Emit one re-export line per registry key
  for (let i = 0; i < sorted.length; i++) {
    out += 'export { default as ' + sorted[i].name + ' } from \'' + sorted[i].importPath + '\';\n';
  }

  // Return the rendered block
  return out;

};


/********************************************************************
Render one frozen registration map for the barrel module.

@param {String} constName - Exported constant name
@param {Array}  entries   - Component entries for this map

@return {String} - Rendered constant declaration
*********************************************************************/
const renderBarrelMap = function (constName, entries) {

  // Sort by registry key so the generated output is byte-stable
  const sorted = entries.slice().sort(function (a, b) {
    return a.name < b.name ? -1 : 1;
  });
  let out = 'const ' + constName + ' = Object.freeze({\n';

  // Emit one registry-key to factory pair per component
  for (let i = 0; i < sorted.length; i++) {
    const comma = i === sorted.length - 1 ? '' : ',';
    out += '  ' + sorted[i].name + ': ' + sorted[i].varName + comma + '\n';
  }

  out += '});\n';

  // Return the rendered constant
  return out;

};

/////////////////////////// Private Functions END //////////////////////////////



/////////////////////////// Main START /////////////////////////////////////////

// Scan the component tree and split the inventory by registration group
const entries = scanComponents();
const flat = entries.filter(function (e) {
  return e.group === 'flat';
});
const variant = entries.filter(function (e) {
  return e.group === 'variant';
});
const freeform = entries.filter(function (e) {
  return e.group === 'freeform';
});
const provider = entries.filter(function (e) {
  return e.group === 'provider';
});

// Build the named export artifact spliced into components.js
let exportsOut = '// Info: GENERATED FILE - do not edit by hand.\n';
exportsOut += '// Produced by .github/ci-scripts/generate-exports.js from the component tree.\n';
exportsOut += '// This block is spliced into components.js between the\n';
exportsOut += '// "Named Component Exports START" and "END" banners.\n\n';
exportsOut += renderExportBlock('Atoms, molecules, and composites', flat) + '\n';
exportsOut += renderExportBlock('Variants', variant) + '\n';
exportsOut += renderExportBlock('Freeform', freeform) + '\n';
exportsOut += renderExportBlock('Providers', provider);

// Write the export artifact
fs.writeFileSync(EXPORTS_OUT, exportsOut, 'utf8');

// Build the registration barrel for consumers that want the whole roster
let barrelOut = '// Info: GENERATED FILE - do not edit by hand.\n';
barrelOut += '// Produced by .github/ci-scripts/generate-exports.js from the component tree.\n';
barrelOut += '//\n';
barrelOut += '// Registration barrel. A consumer that wants the entire roster imports this\n';
barrelOut += '// module and passes each map to the matching createSystem registrar. Importing\n';
barrelOut += '// this file pulls in every component, so a consumer that wants a subset\n';
barrelOut += '// imports named components from the package root instead.\n\n';
barrelOut += '// Imports\n';

// Emit one factory import per component, grouped by namespace
for (let n = 0; n < NAMESPACES.length; n++) {
  const ns = NAMESPACES[n];
  const group = entries.filter(function (e) {
    return e.dir === ns.dir;
  });

  barrelOut += '\n// ~~~~~~~~~~ ' + ns.heading + ' ~~~~~~~~~~\n';

  // Emit the import lines for this namespace in filename order
  for (let i = 0; i < group.length; i++) {
    barrelOut += 'import ' + group[i].varName + ' from \'' + group[i].importPath + '\';\n';
  }

}

barrelOut += '\n\n/////////////////////////// Registration Maps START ////////////////////////////\n\n';
barrelOut += '// Flat components registered at Component.[name]\n';
barrelOut += renderBarrelMap('COMPONENTS', flat);
barrelOut += '\n// Structured exceptions registered at Component.variant.[name]\n';
barrelOut += renderBarrelMap('VARIANTS', variant);
barrelOut += '\n// Unstructured exceptions registered at Component.freeform.[name]\n';
barrelOut += renderBarrelMap('FREEFORMS', freeform);
barrelOut += '\n// Context providers registered at Component.provider.[name]\n';
barrelOut += renderBarrelMap('PROVIDERS', provider);
barrelOut += '\n/////////////////////////// Registration Maps END //////////////////////////////\n\n\n';
barrelOut += 'export { COMPONENTS, VARIANTS, FREEFORMS, PROVIDERS };\n';

// Write the barrel artifact
fs.writeFileSync(BARREL_OUT, barrelOut, 'utf8');

// Build the render-time dependency manifest across every namespace
const deps = buildDependencyMap(entries);
const depNames = Object.keys(deps).sort();

// Render the manifest as a frozen ESM default export
let depsOut = '// Info: GENERATED FILE - do not edit by hand.\n';
depsOut += '// Produced by .github/ci-scripts/generate-exports.js from the component tree.\n';
depsOut += '//\n';
depsOut += '// Render-time component dependencies. A component listed here reads the\n';
depsOut += '// named siblings from the shared registry when it renders, so a consumer\n';
depsOut += '// must register those siblings too. checkRegistry() reads this manifest\n';
depsOut += '// to report what is missing.\n\n';
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
process.stdout.write('generate-exports: ' + entries.length + ' components ('
  + flat.length + ' flat, '
  + variant.length + ' variant, '
  + freeform.length + ' freeform, '
  + provider.length + ' provider)\n');
process.stdout.write('generate-exports: ' + depNames.length + ' components with render-time deps\n');

/////////////////////////// Main END ///////////////////////////////////////////
