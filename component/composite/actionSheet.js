// Info: ActionSheet composite [S3 overlay]. A menu triggered by long-press
// on native, right-click on web. Uses A11y, Overlay,
// AnchoredPosition, CompoundContext.
//   items       -> array of { label, onPress, disabled }
//   children    -> the element to attach the long-press handler to
//   style       -> custom style overrides


// Imports
import menuFactory from './menu.js';
import { View as RNView, Platform } from 'react-native';


/////////////////////////// Component Factory START ////////////////////////////

/********************************************************************
Build the ActionSheet composite.

@param {Object} Lib      - { Utils, Debug, React }
@param {Object} CONFIG   - Package configuration
@param {Object} ERRORS   - Frozen error catalog
@param {Object} Parts    - Mechanisms: { A11y, PressKeys, ControllableState, Units, Overlay, AnchoredPosition }
@param {Object} Registry - Component registry (for atom composition)
@param {Object} Style   - { utilities, tokens, breakpoint }

@return {Function} - The ActionSheet component
*********************************************************************/
export default function (Lib, CONFIG, ERRORS, Parts, Registry, Style) {

  /////////////////////////// Static Constants START ////////////////////////////

  const Menu = menuFactory(Lib, CONFIG, ERRORS, Parts, Registry, Style);

  /////////////////////////// Static Constants END //////////////////////////////



  /////////////////////////// Public Functions START ////////////////////////////
  const ActionSheet = function ActionSheet (props) {


    const {
      items, children, style, // eslint-disable-line no-unused-vars
      ...rest
    } = props;

    const React = Lib.React;
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose = function () {
      setIsOpen(false);
    };

    // Build aria state props
    const ariaProps = Parts.A11y.state({
      expanded: !!isOpen
    });

    // Trigger handlers: long-press on native, context menu on web
    const triggerProps = Platform.OS === 'web'
      ? { onContextMenu: function (e) {
        e.preventDefault(); setIsOpen(true);
      } }
      : { onLongPress: function () {
        setIsOpen(true);
      } };

    // Build menu items
    const menuItems = (items || []).map(function (item) {
      return React.createElement(Registry.MenuItem, {
        key: item.label,
        label: item.label,
        onPress: function () {
          setIsOpen(false);
          if (Lib.Utils.isFunction(item.onPress)) {
            item.onPress();
          }
        },
        disabled: item.disabled
      });
    });

    // Wrap children in a container with trigger props instead of cloneElement.
    // cloneElement breaks when children are wrapped in React.memo or forwardRef.
    const trigger = React.createElement(
      RNView,
      Object.assign({}, ariaProps, triggerProps),
      children
    );

    return React.createElement(
      RNView,
      Object.assign({ style: { position: 'relative' } }, rest),
      trigger,
      React.createElement(Menu, { isOpen: isOpen, onClose: handleClose }, menuItems)
    );
  };////////////////////////// Public Functions END ////////////////////////////



  ////////////////////////// Private Functions START ///////////////////////////
  const _ActionSheet = { // eslint-disable-line no-unused-vars
    // None.
  };////////////////////////// Private Functions END ///////////////////////////



  // Return the public component
  return ActionSheet;

}/////////////////////////// Component Factory END /////////////////////////////
