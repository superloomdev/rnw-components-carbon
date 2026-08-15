'use strict';

// React Native stub for pure-Node testing.
// Provides mock implementations of the RN components and APIs the library uses.
// Interactive components (Pressable, TextInput, Switch, Modal) are proper React
// function components so they handle children-as-function and style-as-function.


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
    accessibilityState: props.accessibilityState,
    hitSlop: props.hitSlop,
    onHoverIn: props.onHoverIn,
    onHoverOut: props.onHoverOut,
    onPressIn: props.onPressIn,
    onPressOut: props.onPressOut,
    onLayout: props.onLayout,
    style: resolvedStyle,
    visible: props.visible,
    transparent: props.transparent,
    animationType: props.animationType,
    onRequestClose: props.onRequestClose,
    accessibilityViewIsModal: props.accessibilityViewIsModal,
    focusable: props.focusable
  }, resolvedChildren);

}

// TextInput: a controlled input stub
function TextInput (props) {

  return React.createElement('TextInput', {
    style: props.style,
    placeholderTextColor: props.placeholderTextColor,
    editable: props.editable,
    accessibilityRole: props.accessibilityRole,
    accessibilityLabel: props.accessibilityLabel,
    accessibilityState: props.accessibilityState,
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
    accessibilityState: props.accessibilityState,
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
    onRequestClose: props.onRequestClose,
    accessibilityViewIsModal: props.accessibilityViewIsModal
  }, props.children);

}


// --- BackHandler ---

const BackHandler = {
  addEventListener: function () {},
  removeEventListener: function () {}
};


// --- AccessibilityInfo ---

const AccessibilityInfo = {
  setAccessibilityFocus: function () {}
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
  Modal: Modal,
  BackHandler: BackHandler,
  AccessibilityInfo: AccessibilityInfo
};
