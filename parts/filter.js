// Info: Label filtering for combo boxes and multi-selects.
//
// Owns the case-insensitive label matching logic shared by ComboBox and
// FilterableMultiSelect. Extracted so both components use the same matching
// behavior and the logic is testable in isolation.


/////////////////////////// Module-Loader START ////////////////////////////////

/********************************************************************
    Factory part loader. Uniform parts signature.

    @param {Object} shared_libs - Lib container with Utils and Debug
    @param {Object} config - Merged config from the parent module
    @param {Object} errors - Frozen error catalog from the parent module

    @return {Object} - Public Filter interface
*********************************************************************/
export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars

  const Lib = {
    Utils: shared_libs.Utils,
    Debug: shared_libs.Debug
  };

  return createInterface(Lib);

}/////////////////////////// Module-Loader END /////////////////////////////////



/////////////////////////// createInterface START //////////////////////////////

/********************************************************************
    Build the Filter interface.

    @param {Object} Lib - The shared Lib container

    @return {Object} - { matchesLabel }
*********************************************************************/
const createInterface = function (Lib) { // eslint-disable-line no-unused-vars


  ///////////////////////////Public Functions START//////////////////////////////

  const Filter = {
    // Public Filter interface: case-insensitive label matching

    // Case-insensitive substring match: returns true if label contains input
    matchesLabel: function (inputValue, label) {

      if (!inputValue) {
        return true;
      }

      const lowerInput = String(inputValue).toLowerCase();

      return String(label).toLowerCase().indexOf(lowerInput) >= 0;

    }

  };


  // Return the public Filter interface
  return Filter;

};/////////////////////////// createInterface END //////////////////////////////
