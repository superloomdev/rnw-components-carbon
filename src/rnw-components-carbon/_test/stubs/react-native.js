'use strict';

// React Native stub for pure-Node testing.
// Provides mock implementations of the RN components and APIs the library uses.
// Interactive components (Pressable, TextInput, Switch, Modal) are proper React
// function components so they handle children-as-function and style-as-function.
// Forwards aria-* props to the output element so tests can assert on them.


const React = require('react');


// --- Platform ---

const Platform = {
  OS: 'web',
  select: function (options) {
    if (options.web) {
      return options.web;
    }
    return options.default;
  }
};


// --- I18nManager ---

const I18nManager = {
  isRTL: false
};


// --- StyleSheet ---

const StyleSheet = {
  create: function (styles) {
    return styles;
  },
  flatten: function (styles) {
    if (!Array.isArray(styles)) {
      return styles;
    }
    return Object.assign.apply(null, [{}].concat(styles.filter(Boolean)));
  }
};


// --- Animated ---

const Animated = {
  Value: function (initial) {
    return {
      _value: initial,
      interpolate: function () {
        return initial;
      }
    };
  },
  timing: function () {
    return {
      start: function (cb) {
        if (cb) {
          cb({ finished: true });
        }
      },
      stop: function () {}
    };
  },
  loop: function (animation) {
    return {
      start: function () {},
      stop: function () {}
    };
  },
  View: 'AnimatedView'
};


// --- Component stubs ---
// Presentational components are string host components (React renders them as plain nodes).
// Interactive components are function components so they handle function-children and function-styles.

const View = 'View';
const Text = 'Text';
const Image = 'Image';

// Pressable: calls children/style as functions with a default pressed state
function Pressable (props) {

  const state = { pressed: false, hovered: false, focused: false };

  // Resolve style: if it's a function, call it with the state
  const resolvedStyle = typeof props.style === 'function' ? props.style(state) : props.style;

  // Resolve children: if it's a function, call it with the state
  const resolvedChildren = typeof props.children === 'function' ? props.children(state) : props.children;

  return React.createElement('Pressable', {
    onPress: props.onPress,
    disabled: props.disabled,
    accessibilityRole: props.accessibilityRole,
    accessibilityLabel: props.accessibilityLabel,
    'aria-checked': props['aria-checked'],
    'aria-disabled': props['aria-disabled'],
    'aria-expanded': props['aria-expanded'],
    'aria-selected': props['aria-selected'],
    'aria-invalid': props['aria-invalid'],
    'aria-required': props['aria-required'],
    'aria-readonly': props['aria-readonly'],
    'aria-busy': props['aria-busy'],
    'aria-pressed': props['aria-pressed'],
    'aria-current': props['aria-current'],
    'aria-hidden': props['aria-hidden'],
    'aria-modal': props['aria-modal'],
    'aria-valuenow': props['aria-valuenow'],
    'aria-valuemin': props['aria-valuemin'],
    'aria-valuemax': props['aria-valuemax'],
    'aria-valuetext': props['aria-valuetext'],
    'aria-controls': props['aria-controls'],
    'aria-describedby': props['aria-describedby'],
    'aria-labelledby': props['aria-labelledby'],
    'aria-owns': props['aria-owns'],
    'aria-activedescendant': props['aria-activedescendant'],
    'aria-posinset': props['aria-posinset'],
    'aria-setsize': props['aria-setsize'],
    'aria-level': props['aria-level'],
    'aria-live': props['aria-live'],
    hitSlop: props.hitSlop,
    onHoverIn: props.onHoverIn,
    onHoverOut: props.onHoverOut,
    onPressIn: props.onPressIn,
    onPressOut: props.onPressOut,
    onLayout: props.onLayout,
    onKeyDown: props.onKeyDown,
    style: resolvedStyle,
    visible: props.visible,
    transparent: props.transparent,
    animationType: props.animationType,
    onRequestClose: props.onRequestClose,
    focusable: props.focusable
  }, resolvedChildren);

}

// TextInput: a controlled input stub
function TextInput (props) {

  return React.createElement('TextInput', {
    style: props.style,
    value: props.value,
    onChangeText: props.onChangeText,
    placeholder: props.placeholder,
    placeholderTextColor: props.placeholderTextColor,
    editable: props.editable,
    multiline: props.multiline,
    numberOfLines: props.numberOfLines,
    secureTextEntry: props.secureTextEntry,
    keyboardType: props.keyboardType,
    accessibilityRole: props.accessibilityRole,
    accessibilityLabel: props.accessibilityLabel,
    'aria-disabled': props['aria-disabled'],
    'aria-invalid': props['aria-invalid'],
    'aria-valuemin': props['aria-valuemin'],
    'aria-valuemax': props['aria-valuemax'],
    'aria-valuenow': props['aria-valuenow'],
    'aria-valuetext': props['aria-valuetext'],
    onFocus: props.onFocus,
    onBlur: props.onBlur
  });

}

// Switch: a toggle stub
function Switch (props) {

  return React.createElement('Switch', {
    value: props.value,
    onValueChange: props.onValueChange,
    disabled: props.disabled,
    trackColor: props.trackColor,
    thumbColor: props.thumbColor,
    accessibilityRole: props.accessibilityRole,
    accessibilityLabel: props.accessibilityLabel,
    'aria-checked': props['aria-checked'],
    'aria-disabled': props['aria-disabled'],
    style: props.style
  });

}

// Modal: renders children when visible
function Modal (props) {

  if (!props.visible) {
    return null;
  }

  return React.createElement('Modal', {
    visible: props.visible,
    transparent: props.transparent,
    animationType: props.animationType,
    onRequestClose: props.onRequestClose
  }, props.children);

}

// Slider: a range slider stub
function Slider (props) {

  return React.createElement('Slider', {
    value: props.value,
    onValueChange: props.onValueChange,
    minimumValue: props.minimumValue,
    maximumValue: props.maximumValue,
    step: props.step,
    minimumTrackTintColor: props.minimumTrackTintColor,
    maximumTrackTintColor: props.maximumTrackTintColor,
    thumbTintColor: props.thumbTintColor,
    disabled: props.disabled,
    accessibilityRole: props.accessibilityRole,
    accessibilityLabel: props.accessibilityLabel,
    'aria-disabled': props['aria-disabled'],
    'aria-valuemin': props['aria-valuemin'],
    'aria-valuemax': props['aria-valuemax'],
    'aria-valuenow': props['aria-valuenow'],
    'aria-valuetext': props['aria-valuetext'],
    style: props.style
  });

}

// ActivityIndicator: a loading spinner stub
function ActivityIndicator (props) {

  return React.createElement('ActivityIndicator', {
    size: props.size,
    color: props.color,
    style: props.style
  });

}


// --- BackHandler ---

const BackHandler = {
  addEventListener: function () {},
  removeEventListener: function () {}
};


// --- AccessibilityInfo ---

const AccessibilityInfo = {
  setAccessibilityFocus: function () {},
  announceForAccessibility: function () {}
};


module.exports = {
  Platform: Platform,
  I18nManager: I18nManager,
  StyleSheet: StyleSheet,
  Animated: Animated,
  View: View,
  Text: Text,
  Image: Image,
  TextInput: TextInput,
  Pressable: Pressable,
  Switch: Switch,
  Slider: Slider,
  ActivityIndicator: ActivityIndicator,
  Modal: Modal,
  BackHandler: BackHandler,
  AccessibilityInfo: AccessibilityInfo
};
