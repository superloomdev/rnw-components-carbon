'use strict';
module.exports = function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React, Device: shared_libs.Device };
  return require('../component/useAnchoredPosition')(Lib);
};
