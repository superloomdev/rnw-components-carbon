import mechanism from '../component/useFocusTrap.js';

export default function (shared_libs, config, errors) { // eslint-disable-line no-unused-vars
  const Lib = { Utils: shared_libs.Utils, Debug: shared_libs.Debug, React: shared_libs.React };
  return mechanism(Lib);
}
