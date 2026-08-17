// Info: The single translator from semantic state to aria-* props.
//
// This is the ONLY module in the package allowed to emit accessibility
// state/value/relation/position props. Components call a11y.state(),
// a11y.value(), a11y.relation(), a11y.position(), and a11y.id() to get
// props that they spread onto their host element.
//
// Never emits the deprecated RN accessibility state/value/hint props or
// the view-is-modal/elements-hidden/important-for-accessibility props.
// Those are silent no-ops on web. accessibilityRole and accessibilityLabel
// remain correct and are passed directly by components, not through this
// module.
//
// Omits keys whose value is null or undefined so the DOM never receives
// aria-checked="undefined".


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
    Factory part loader. Uniform parts signature.

    @param {Object} shared_libs - Lib container with Utils, Debug, React
    @param {Object} config - Merged config from the parent module
    @param {Object} errors - Frozen error catalog from the parent module

    @return {Object} - { state, value, relation, position, id }
*********************************************************************/
export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars

  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };

  return createInterface(Lib);

}/////////////////////////// Module-Loader END /////////////////////////////////



/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
    Build the a11y translator. Closes over Lib for the id generator's
    counter storage.

    @param {Object} Lib - The shared Lib container (requires React for refs)

    @return {Object} - { state, value, relation, position, id }
*********************************************************************/
const createInterface = function (Lib) { // eslint-disable-line no-unused-vars


  ///////////////////////////Public Functions START//////////////////////////////

  // Monotonic id counter, stable per loader instance
  let idCounter = 0;


  // Semantic state -> aria-* props. Omits keys whose value is null/undefined.
  // checked accepts true | false | 'mixed'.
  const state = function (opts) {

    if (!opts) {
      return {};
    }

    const props = {};

    // checked: true, false, or 'mixed' (for indeterminate checkboxes)
    if (opts.checked !== null && opts.checked !== undefined) {
      props['aria-checked'] = opts.checked;
    }

    // disabled: boolean
    if (opts.disabled !== null && opts.disabled !== undefined) {
      props['aria-disabled'] = !!opts.disabled;
    }

    // expanded: boolean
    if (opts.expanded !== null && opts.expanded !== undefined) {
      props['aria-expanded'] = !!opts.expanded;
    }

    // selected: boolean
    if (opts.selected !== null && opts.selected !== undefined) {
      props['aria-selected'] = !!opts.selected;
    }

    // invalid: boolean
    if (opts.invalid !== null && opts.invalid !== undefined) {
      props['aria-invalid'] = !!opts.invalid;
    }

    // required: boolean
    if (opts.required !== null && opts.required !== undefined) {
      props['aria-required'] = !!opts.required;
    }

    // readonly: boolean
    if (opts.readonly !== null && opts.readonly !== undefined) {
      props['aria-readonly'] = !!opts.readonly;
    }

    // busy: boolean
    if (opts.busy !== null && opts.busy !== undefined) {
      props['aria-busy'] = !!opts.busy;
    }

    // pressed: boolean (for toggle buttons)
    if (opts.pressed !== null && opts.pressed !== undefined) {
      props['aria-pressed'] = !!opts.pressed;
    }

    // current: 'page' | 'step' | 'location' | 'date' | 'time' | true | false
    if (opts.current !== null && opts.current !== undefined) {
      props['aria-current'] = opts.current;
    }

    // hidden: boolean
    if (opts.hidden !== null && opts.hidden !== undefined) {
      props['aria-hidden'] = !!opts.hidden;
    }

    // modal: boolean (for overlay containers)
    if (opts.modal !== null && opts.modal !== undefined) {
      props['aria-modal'] = !!opts.modal;
    }

    return props;

  };


  // Numeric value semantics for slider, progressbar, spinbutton.
  const value = function (opts) {

    if (!opts) {
      return {};
    }

    const props = {};

    if (opts.min !== null && opts.min !== undefined) {
      props['aria-valuemin'] = opts.min;
    }

    if (opts.max !== null && opts.max !== undefined) {
      props['aria-valuemax'] = opts.max;
    }

    if (opts.now !== null && opts.now !== undefined) {
      props['aria-valuenow'] = opts.now;
    }

    if (opts.text !== null && opts.text !== undefined) {
      props['aria-valuetext'] = opts.text;
    }

    return props;

  };


  // Relationship props. Web-only in effect; harmless on native.
  const relation = function (opts) {

    if (!opts) {
      return {};
    }

    const props = {};

    if (opts.controls) {
      props['aria-controls'] = opts.controls;
    }

    if (opts.describedby) {
      props['aria-describedby'] = opts.describedby;
    }

    if (opts.labelledby) {
      props['aria-labelledby'] = opts.labelledby;
    }

    if (opts.owns) {
      props['aria-owns'] = opts.owns;
    }

    if (opts.activedescendant) {
      props['aria-activedescendant'] = opts.activedescendant;
    }

    return props;

  };


  // Position-in-set for list/option/step semantics.
  const position = function (opts) {

    if (!opts) {
      return {};
    }

    const props = {};

    if (opts.posinset !== null && opts.posinset !== undefined) {
      props['aria-posinset'] = opts.posinset;
    }

    if (opts.setsize !== null && opts.setsize !== undefined) {
      props['aria-setsize'] = opts.setsize;
    }

    if (opts.level !== null && opts.level !== undefined) {
      props['aria-level'] = opts.level;
    }

    return props;

  };


  // Monotonic id generator for labelledby/describedby wiring.
  // Callers hold the result in a ref so it is stable across re-renders.
  const id = function (prefix) {

    idCounter += 1;
    return (prefix || 'carbon') + '-' + idCounter;

  };


  return {
    state: state,
    value: value,
    relation: relation,
    position: position,
    id: id
  };

};/////////////////////////// createInterface END //////////////////////////////
