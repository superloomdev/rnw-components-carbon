'use strict';
module.exports = function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };
  return require('../component/a11y')(Lib);
};
