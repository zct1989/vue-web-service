(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~1ce92aa8"],{

/***/ "0b9f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4d91");
/* harmony import */ var _util_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("6a21");
/* harmony import */ var _util_BaseMixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("b488");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("daa3");
/* harmony import */ var _common_Track__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0fd9");
/* harmony import */ var _common_createSlider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("a404");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("3d63");









var Slider = {
  name: 'Slider',
  mixins: [_util_BaseMixin__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]],
  props: {
    defaultValue: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number,
    value: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number,
    disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].bool,
    autoFocus: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].bool,
    tabIndex: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number,
    min: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number,
    max: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number
  },
  data: function data() {
    var defaultValue = this.defaultValue !== undefined ? this.defaultValue : this.min;
    var value = this.value !== undefined ? this.value : defaultValue;

    if (_utils__WEBPACK_IMPORTED_MODULE_7__[/* isDev */ "g"]()) {
      Object(_util_warning__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(!Object(_util_props_util__WEBPACK_IMPORTED_MODULE_4__[/* hasProp */ "q"])(this, 'minimumTrackStyle'), 'minimumTrackStyle will be deprecate, please use trackStyle instead.');
      Object(_util_warning__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(!Object(_util_props_util__WEBPACK_IMPORTED_MODULE_4__[/* hasProp */ "q"])(this, 'maximumTrackStyle'), 'maximumTrackStyle will be deprecate, please use railStyle instead.');
    }
    return {
      sValue: this.trimAlignValue(value),
      dragging: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      var autoFocus = _this.autoFocus,
          disabled = _this.disabled;

      if (autoFocus && !disabled) {
        _this.focus();
      }
    });
  },

  watch: {
    value: {
      handler: function handler(val) {
        var min = this.min,
            max = this.max;

        this.setChangeValue(val, min, max);
      },

      deep: true
    },
    min: function min(val) {
      var sValue = this.sValue,
          max = this.max;

      this.setChangeValue(sValue, val, max);
    },
    max: function max(val) {
      var sValue = this.sValue,
          min = this.min;

      this.setChangeValue(sValue, min, val);
    }
  },
  methods: {
    setChangeValue: function setChangeValue(value, min, max) {
      var minAmaxProps = {
        min: min,
        max: max
      };
      var newValue = value !== undefined ? value : this.sValue;
      var nextValue = this.trimAlignValue(newValue, minAmaxProps);
      if (nextValue === this.sValue) return;

      this.setState({ sValue: nextValue });
      if (_utils__WEBPACK_IMPORTED_MODULE_7__[/* isValueOutOfRange */ "j"](newValue, minAmaxProps)) {
        this.$emit('change', nextValue);
      }
    },
    onChange: function onChange(state) {
      var isNotControlled = !Object(_util_props_util__WEBPACK_IMPORTED_MODULE_4__[/* hasProp */ "q"])(this, 'value');
      if (isNotControlled) {
        this.setState(state);
      }

      var changedValue = state.sValue;
      this.$emit('change', changedValue);
    },
    onStart: function onStart(position) {
      this.setState({ dragging: true });
      var sValue = this.sValue;

      this.$emit('beforeChange', sValue);

      var value = this.calcValueByPos(position);

      this.startValue = value;
      this.startPosition = position;
      if (value === sValue) return;

      this.prevMovedHandleIndex = 0;
      this.onChange({ sValue: value });
    },
    onEnd: function onEnd(force) {
      var dragging = this.dragging;

      this.removeDocumentEvents();
      if (dragging || force) {
        this.$emit('afterChange', this.sValue);
      }
      this.setState({ dragging: false });
    },
    onMove: function onMove(e, position) {
      _utils__WEBPACK_IMPORTED_MODULE_7__[/* pauseEvent */ "k"](e);
      var sValue = this.sValue;

      var value = this.calcValueByPos(position);
      if (value === sValue) return;

      this.onChange({ sValue: value });
    },
    onKeyboard: function onKeyboard(e) {
      var valueMutator = _utils__WEBPACK_IMPORTED_MODULE_7__[/* getKeyboardValueMutator */ "d"](e);

      if (valueMutator) {
        _utils__WEBPACK_IMPORTED_MODULE_7__[/* pauseEvent */ "k"](e);
        var sValue = this.sValue;

        var mutatedValue = valueMutator(sValue, this.$props);
        var value = this.trimAlignValue(mutatedValue);
        if (value === sValue) return;

        this.onChange({ sValue: value });
      }
    },
    getLowerBound: function getLowerBound() {
      return this.min;
    },
    getUpperBound: function getUpperBound() {
      return this.sValue;
    },
    trimAlignValue: function trimAlignValue(v) {
      var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (v === null) {
        return null;
      }
      var mergedProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.$props, nextProps);
      var val = _utils__WEBPACK_IMPORTED_MODULE_7__[/* ensureValueInRange */ "a"](v, mergedProps);
      return _utils__WEBPACK_IMPORTED_MODULE_7__[/* ensureValuePrecision */ "b"](val, mergedProps);
    },
    getTrack: function getTrack(_ref) {
      var prefixCls = _ref.prefixCls,
          vertical = _ref.vertical,
          included = _ref.included,
          offset = _ref.offset,
          minimumTrackStyle = _ref.minimumTrackStyle,
          _trackStyle = _ref._trackStyle;
      var h = this.$createElement;

      return h(_common_Track__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
        'class': prefixCls + '-track',
        attrs: { vertical: vertical,
          included: included,
          offset: 0,
          length: offset
        },
        style: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, minimumTrackStyle, _trackStyle)
      });
    },
    renderSlider: function renderSlider() {
      var _this2 = this;

      var prefixCls = this.prefixCls,
          vertical = this.vertical,
          included = this.included,
          disabled = this.disabled,
          minimumTrackStyle = this.minimumTrackStyle,
          trackStyle = this.trackStyle,
          handleStyle = this.handleStyle,
          tabIndex = this.tabIndex,
          min = this.min,
          max = this.max,
          handle = this.handle,
          defaultHandle = this.defaultHandle;

      var handleGenerator = handle || defaultHandle;
      var sValue = this.sValue,
          dragging = this.dragging;

      var offset = this.calcOffset(sValue);
      var handles = handleGenerator({
        className: prefixCls + '-handle',
        prefixCls: prefixCls,
        vertical: vertical,
        offset: offset,
        value: sValue,
        dragging: dragging,
        disabled: disabled,
        min: min,
        max: max,
        index: 0,
        tabIndex: tabIndex,
        style: handleStyle[0] || handleStyle,
        directives: [{
          name: 'ant-ref',
          value: function value(h) {
            return _this2.saveHandle(0, h);
          }
        }],
        on: {
          focus: this.onFocus,
          blur: this.onBlur
        }
      });

      var _trackStyle = trackStyle[0] || trackStyle;
      return {
        tracks: this.getTrack({
          prefixCls: prefixCls,
          vertical: vertical,
          included: included,
          offset: offset,
          minimumTrackStyle: minimumTrackStyle,
          _trackStyle: _trackStyle
        }),
        handles: handles
      };
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Object(_common_createSlider__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(Slider));

/***/ }),

/***/ "0fd9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);

/* eslint-disable */
var Track = {
  functional: true,
  render: function render(createElement, context) {
    var h = arguments[0];
    var _context$props = context.props,
        included = _context$props.included,
        vertical = _context$props.vertical,
        offset = _context$props.offset,
        length = _context$props.length;
    var _context$data = context.data,
        style = _context$data.style,
        className = _context$data["class"];


    var positonStyle = vertical ? {
      bottom: offset + "%",
      height: length + "%"
    } : {
      left: offset + "%",
      width: length + "%"
    };

    var elStyle = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, style, positonStyle);
    return included ? h("div", { "class": className, style: elStyle }) : null;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Track);

/***/ }),

/***/ "3d63":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isEventFromHandle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isValueOutOfRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isNotTouchEvent; });
/* unused harmony export getClosestPoint */
/* unused harmony export getPrecision */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getMousePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getTouchPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getHandleCenterPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ensureValueInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ensureValuePrecision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return pauseEvent; });
/* unused harmony export calculateNextValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getKeyboardValueMutator; });
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9b57");
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("18a7");



function isDev() {
  return "production" !== 'production';
}

function isEventFromHandle(e, handles) {
  try {
    return Object.keys(handles).some(function (key) {
      return e.target === handles[key].$el || e.target === handles[key];
    });
  } catch (error) {
    return false;
  }
}

function isValueOutOfRange(value, _ref) {
  var min = _ref.min,
      max = _ref.max;

  return value < min || value > max;
}

function isNotTouchEvent(e) {
  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
}

function getClosestPoint(val, _ref2) {
  var marks = _ref2.marks,
      step = _ref2.step,
      min = _ref2.min;

  var points = Object.keys(marks).map(parseFloat);
  if (step !== null) {
    var closestStep = Math.round((val - min) / step) * step + min;
    points.push(closestStep);
  }
  var diffs = points.map(function (point) {
    return Math.abs(val - point);
  });
  return points[diffs.indexOf(Math.min.apply(Math, babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(diffs)))];
}

function getPrecision(step) {
  var stepString = step.toString();
  var precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

function getMousePosition(vertical, e) {
  var zoom = 1;
  if (window.visualViewport) {
    zoom = +(window.visualViewport.width / document.body.getBoundingClientRect().width).toFixed(2);
  }
  return (vertical ? e.clientY : e.pageX) / zoom;
}

function getTouchPosition(vertical, e) {
  var zoom = 1;
  if (window.visualViewport) {
    zoom = +(window.visualViewport.width / document.body.getBoundingClientRect().width).toFixed(2);
  }
  return (vertical ? e.touches[0].clientY : e.touches[0].pageX) / zoom;
}

function getHandleCenterPosition(vertical, handle) {
  var coords = handle.getBoundingClientRect();
  return vertical ? coords.top + coords.height * 0.5 : window.pageXOffset + coords.left + coords.width * 0.5;
}

function ensureValueInRange(val, _ref3) {
  var max = _ref3.max,
      min = _ref3.min;

  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

function ensureValuePrecision(val, props) {
  var step = props.step;

  var closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0; // eslint-disable-line
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

function calculateNextValue(func, value, props) {
  var operations = {
    increase: function increase(a, b) {
      return a + b;
    },
    decrease: function decrease(a, b) {
      return a - b;
    }
  };

  var indexToGet = operations[func](Object.keys(props.marks).indexOf(JSON.stringify(value)), 1);
  var keyToGet = Object.keys(props.marks)[indexToGet];

  if (props.step) {
    return operations[func](value, props.step);
  } else if (!!Object.keys(props.marks).length && !!props.marks[keyToGet]) {
    return props.marks[keyToGet];
  }
  return value;
}

function getKeyboardValueMutator(e) {
  switch (e.keyCode) {
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].UP:
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].RIGHT:
      return function (value, props) {
        return calculateNextValue('increase', value, props);
      };

    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].DOWN:
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].LEFT:
      return function (value, props) {
        return calculateNextValue('decrease', value, props);
      };

    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].END:
      return function (value, props) {
        return props.max;
      };
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].HOME:
      return function (value, props) {
        return props.min;
      };
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].PAGE_UP:
      return function (value, props) {
        return value + props.step * 2;
      };
    case _util_KeyCode__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].PAGE_DOWN:
      return function (value, props) {
        return value - props.step * 2;
      };

    default:
      return undefined;
  }
}

/***/ }),

/***/ "6f15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6042");
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4d26");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4d91");
/* harmony import */ var _util_BaseMixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b488");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("daa3");
/* harmony import */ var _util_Dom_addEventListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("f194");








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Handle',
  mixins: [_util_BaseMixin__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]],
  props: {
    prefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string,
    vertical: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    offset: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
    disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    min: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
    max: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
    value: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
    tabIndex: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
    className: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string
    // handleFocus: PropTypes.func.def(noop),
    // handleBlur: PropTypes.func.def(noop),
  },
  data: function data() {
    return {
      clickFocused: false
    };
  },
  mounted: function mounted() {
    // mouseup won't trigger if mouse moved out of handle
    // so we listen on document here.
    this.onMouseUpListener = Object(_util_Dom_addEventListener__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(document, 'mouseup', this.handleMouseUp);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.onMouseUpListener) {
      this.onMouseUpListener.remove();
    }
  },

  methods: {
    setClickFocus: function setClickFocus(focused) {
      this.setState({ clickFocused: focused });
    },
    handleMouseUp: function handleMouseUp() {
      if (document.activeElement === this.$refs.handle) {
        this.setClickFocus(true);
      }
    },
    handleBlur: function handleBlur(e) {
      this.setClickFocus(false);
      this.__emit('blur', e);
    },
    handleKeyDown: function handleKeyDown() {
      this.setClickFocus(false);
    },
    clickFocus: function clickFocus() {
      this.setClickFocus(true);
      this.focus();
    },
    focus: function focus() {
      this.$refs.handle.focus();
    },
    blur: function blur() {
      this.$refs.handle.blur();
    },

    // when click can not focus in vue, use mousedown trigger focus
    handleMousedown: function handleMousedown(e) {
      this.focus();
      this.__emit('mousedown', e);
    }
  },
  render: function render() {
    var h = arguments[0];

    var _getOptionProps = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_5__[/* getOptionProps */ "j"])(this),
        prefixCls = _getOptionProps.prefixCls,
        vertical = _getOptionProps.vertical,
        offset = _getOptionProps.offset,
        disabled = _getOptionProps.disabled,
        min = _getOptionProps.min,
        max = _getOptionProps.max,
        value = _getOptionProps.value,
        tabIndex = _getOptionProps.tabIndex;

    var className = classnames__WEBPACK_IMPORTED_MODULE_2___default()(this.$props.className, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, prefixCls + '-handle-click-focused', this.clickFocused));

    var postionStyle = vertical ? { bottom: offset + '%' } : { left: offset + '%' };

    var ariaProps = {
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-disabled': !!disabled
    };

    var handleProps = {
      attrs: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        role: 'slider',
        tabIndex: disabled ? null : tabIndex || 0
      }, ariaProps),
      'class': className,
      on: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.$listeners, {
        blur: this.handleBlur,
        keydown: this.handleKeyDown,
        mousedown: this.handleMousedown
      }),
      ref: 'handle',
      style: postionStyle
    };
    return h('div', handleProps);
  }
});

/***/ }),

/***/ "9c14":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6042");
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9b57");
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4d26");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4d91");
/* harmony import */ var _util_BaseMixin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b488");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("daa3");
/* harmony import */ var _common_Track__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0fd9");
/* harmony import */ var _common_createSlider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("a404");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("3d63");











var rangeProps = {
  defaultValue: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number),
  value: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number),
  count: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number,
  pushable: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].bool, _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number]),
  allowCross: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].bool,
  disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].bool,
  tabIndex: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number),
  prefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].string,
  min: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number,
  max: _util_vue_types__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].number
};
var Range = {
  name: 'Range',
  displayName: 'Range',
  mixins: [_util_BaseMixin__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]],
  props: Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* initDefaultProps */ "r"])(rangeProps, {
    count: 1,
    allowCross: true,
    pushable: false,
    tabIndex: []
  }),
  data: function data() {
    var _this = this;

    var count = this.count,
        min = this.min,
        max = this.max;

    var initialValue = Array.apply(undefined, babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(Array(count + 1))).map(function () {
      return min;
    });
    var defaultValue = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* hasProp */ "q"])(this, 'defaultValue') ? this.defaultValue : initialValue;
    var value = this.value;

    if (value === undefined) {
      value = defaultValue;
    }
    var bounds = value.map(function (v, i) {
      return _this.trimAlignValue(v, i);
    });
    var recent = bounds[0] === max ? 0 : bounds.length - 1;
    return {
      sHandle: null,
      recent: recent,
      bounds: bounds
    };
  },

  watch: {
    value: {
      handler: function handler(val) {
        var min = this.min,
            max = this.max;

        this.setChangeValue(val, min, max);
      },

      deep: true
    },
    min: function min(val) {
      var bounds = this.bounds,
          max = this.max;

      this.setChangeValue(bounds, val, max);
    },
    max: function max(val) {
      var bounds = this.bounds,
          min = this.min;

      this.setChangeValue(bounds, min, val);
    }
  },
  methods: {
    setChangeValue: function setChangeValue(value, min, max) {
      var _this2 = this;

      var bounds = this.bounds;

      var newValue = value || bounds;
      var minAmaxProps = {
        min: min,
        max: max
      };
      var nextBounds = newValue.map(function (v, i) {
        return _this2.trimAlignValue(v, i, minAmaxProps);
      });
      if (nextBounds.length === bounds.length && nextBounds.every(function (v, i) {
        return v === bounds[i];
      })) return;

      this.setState({ bounds: nextBounds });

      if (value.some(function (v) {
        return _utils__WEBPACK_IMPORTED_MODULE_9__[/* isValueOutOfRange */ "j"](v, minAmaxProps);
      })) {
        var newValues = value.map(function (v) {
          return _utils__WEBPACK_IMPORTED_MODULE_9__[/* ensureValueInRange */ "a"](v, minAmaxProps);
        });
        this.$emit('change', newValues);
      }
    },
    onChange: function onChange(state) {
      var isNotControlled = !Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* hasProp */ "q"])(this, 'value');
      if (isNotControlled) {
        this.setState(state);
      } else if (state.sHandle !== undefined) {
        this.setState({ sHandle: state.sHandle });
      }

      var data = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, this.$data, state);
      var changedValue = data.bounds;
      this.$emit('change', changedValue);
    },
    onStart: function onStart(position) {
      var bounds = this.bounds;

      this.$emit('beforeChange', bounds);

      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;

      var closestBound = this.getClosestBound(value);
      this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);

      this.setState({
        sHandle: this.prevMovedHandleIndex,
        recent: this.prevMovedHandleIndex
      });

      var prevValue = bounds[this.prevMovedHandleIndex];
      if (value === prevValue) return;
      var nextBounds = [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(bounds));
      nextBounds[this.prevMovedHandleIndex] = value;
      this.onChange({ bounds: nextBounds });
    },
    onEnd: function onEnd(force) {
      var sHandle = this.sHandle;

      this.removeDocumentEvents();
      if (sHandle || force) {
        this.$emit('afterChange', this.bounds);
      }
      this.setState({ sHandle: null });
    },
    onMove: function onMove(e, position) {
      _utils__WEBPACK_IMPORTED_MODULE_9__[/* pauseEvent */ "k"](e);
      var bounds = this.bounds,
          sHandle = this.sHandle;

      var value = this.calcValueByPos(position);
      var oldValue = bounds[sHandle];
      if (value === oldValue) return;

      this.moveTo(value);
    },
    onKeyboard: function onKeyboard(e) {
      var valueMutator = _utils__WEBPACK_IMPORTED_MODULE_9__[/* getKeyboardValueMutator */ "d"](e);

      if (valueMutator) {
        _utils__WEBPACK_IMPORTED_MODULE_9__[/* pauseEvent */ "k"](e);
        var bounds = this.bounds,
            sHandle = this.sHandle;

        var oldValue = bounds[sHandle === null ? this.recent : sHandle];
        var mutatedValue = valueMutator(oldValue, this.$props);
        var value = this.trimAlignValue(mutatedValue);
        if (value === oldValue) return;
        var isFromKeyboardEvent = true;
        this.moveTo(value, isFromKeyboardEvent);
      }
    },
    getClosestBound: function getClosestBound(value) {
      var bounds = this.bounds;

      var closestBound = 0;
      for (var i = 1; i < bounds.length - 1; ++i) {
        if (value > bounds[i]) {
          closestBound = i;
        }
      }
      if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
        closestBound += 1;
      }
      return closestBound;
    },
    getBoundNeedMoving: function getBoundNeedMoving(value, closestBound) {
      var bounds = this.bounds,
          recent = this.recent;

      var boundNeedMoving = closestBound;
      var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

      if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
        boundNeedMoving = recent;
      }

      if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
        boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
      }
      return boundNeedMoving;
    },
    getLowerBound: function getLowerBound() {
      return this.bounds[0];
    },
    getUpperBound: function getUpperBound() {
      var bounds = this.bounds;

      return bounds[bounds.length - 1];
    },

    /**
     * Returns an array of possible slider points, taking into account both
     * `marks` and `step`. The result is cached.
     */
    getPoints: function getPoints() {
      var marks = this.marks,
          step = this.step,
          min = this.min,
          max = this.max;

      var cache = this._getPointsCache;
      if (!cache || cache.marks !== marks || cache.step !== step) {
        var pointsObject = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, marks);
        if (step !== null) {
          for (var point = min; point <= max; point += step) {
            pointsObject[point] = point;
          }
        }
        var points = Object.keys(pointsObject).map(parseFloat);
        points.sort(function (a, b) {
          return a - b;
        });
        this._getPointsCache = { marks: marks, step: step, points: points };
      }
      return this._getPointsCache.points;
    },
    moveTo: function moveTo(value, isFromKeyboardEvent) {
      var _this3 = this;

      var nextBounds = [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(this.bounds));
      var sHandle = this.sHandle,
          recent = this.recent;

      var handle = sHandle === null ? recent : sHandle;
      nextBounds[handle] = value;
      var nextHandle = handle;
      if (this.$props.pushable !== false) {
        this.pushSurroundingHandles(nextBounds, nextHandle);
      } else if (this.$props.allowCross) {
        nextBounds.sort(function (a, b) {
          return a - b;
        });
        nextHandle = nextBounds.indexOf(value);
      }
      this.onChange({
        sHandle: nextHandle,
        bounds: nextBounds
      });
      if (isFromKeyboardEvent) {
        // known problem: because setState is async,
        // so trigger focus will invoke handler's onEnd and another handler's onStart too early,
        // cause onBeforeChange and onAfterChange receive wrong value.
        // here use setState callback to hack，but not elegant
        this.setState({}, function () {
          _this3.handlesRefs[nextHandle].focus();
        });
      }
    },
    pushSurroundingHandles: function pushSurroundingHandles(bounds, handle) {
      var value = bounds[handle];
      var threshold = this.pushable;

      threshold = Number(threshold);

      var direction = 0;
      if (bounds[handle + 1] - value < threshold) {
        direction = +1; // push to right
      }
      if (value - bounds[handle - 1] < threshold) {
        direction = -1; // push to left
      }

      if (direction === 0) {
        return;
      }

      var nextHandle = handle + direction;
      var diffToNext = direction * (bounds[nextHandle] - value);
      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // revert to original value if pushing is impossible
        bounds[handle] = bounds[nextHandle] - direction * threshold;
      }
    },
    pushHandle: function pushHandle(bounds, handle, direction, amount) {
      var originalValue = bounds[handle];
      var currentValue = bounds[handle];
      while (direction * (currentValue - originalValue) < amount) {
        if (!this.pushHandleOnePoint(bounds, handle, direction)) {
          // can't push handle enough to create the needed `amount` gap, so we
          // revert its position to the original value
          bounds[handle] = originalValue;
          return false;
        }
        currentValue = bounds[handle];
      }
      // the handle was pushed enough to create the needed `amount` gap
      return true;
    },
    pushHandleOnePoint: function pushHandleOnePoint(bounds, handle, direction) {
      var points = this.getPoints();
      var pointIndex = points.indexOf(bounds[handle]);
      var nextPointIndex = pointIndex + direction;
      if (nextPointIndex >= points.length || nextPointIndex < 0) {
        // reached the minimum or maximum available point, can't push anymore
        return false;
      }
      var nextHandle = handle + direction;
      var nextValue = points[nextPointIndex];
      var threshold = this.pushable;

      var diffToNext = direction * (bounds[nextHandle] - nextValue);
      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // couldn't push next handle, so we won't push this one either
        return false;
      }
      // push the handle
      bounds[handle] = nextValue;
      return true;
    },
    trimAlignValue: function trimAlignValue(v, handle) {
      var nextProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var mergedProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, this.$props, nextProps);
      var valInRange = _utils__WEBPACK_IMPORTED_MODULE_9__[/* ensureValueInRange */ "a"](v, mergedProps);
      var valNotConflict = this.ensureValueNotConflict(handle, valInRange, mergedProps);
      return _utils__WEBPACK_IMPORTED_MODULE_9__[/* ensureValuePrecision */ "b"](valNotConflict, mergedProps);
    },
    ensureValueNotConflict: function ensureValueNotConflict(handle, val, _ref) {
      var allowCross = _ref.allowCross,
          thershold = _ref.pushable;

      var state = this.$data || {};
      var bounds = state.bounds;

      handle = handle === undefined ? state.sHandle : handle;
      thershold = Number(thershold);
      /* eslint-disable eqeqeq */
      if (!allowCross && handle != null && bounds !== undefined) {
        if (handle > 0 && val <= bounds[handle - 1] + thershold) {
          return bounds[handle - 1] + thershold;
        }
        if (handle < bounds.length - 1 && val >= bounds[handle + 1] - thershold) {
          return bounds[handle + 1] - thershold;
        }
      }
      /* eslint-enable eqeqeq */
      return val;
    },
    getTrack: function getTrack(_ref2) {
      var bounds = _ref2.bounds,
          prefixCls = _ref2.prefixCls,
          vertical = _ref2.vertical,
          included = _ref2.included,
          offsets = _ref2.offsets,
          trackStyle = _ref2.trackStyle;
      var h = this.$createElement;

      return bounds.slice(0, -1).map(function (_, index) {
        var _classNames;

        var i = index + 1;
        var trackClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()((_classNames = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_classNames, prefixCls + '-track', true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_classNames, prefixCls + '-track-' + i, true), _classNames));
        return h(_common_Track__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
          'class': trackClassName,
          attrs: { vertical: vertical,
            included: included,
            offset: offsets[i - 1],
            length: offsets[i] - offsets[i - 1]
          },
          style: trackStyle[index],
          key: i
        });
      });
    },
    renderSlider: function renderSlider() {
      var _this4 = this;

      var sHandle = this.sHandle,
          bounds = this.bounds,
          prefixCls = this.prefixCls,
          vertical = this.vertical,
          included = this.included,
          disabled = this.disabled,
          min = this.min,
          max = this.max,
          handle = this.handle,
          defaultHandle = this.defaultHandle,
          trackStyle = this.trackStyle,
          handleStyle = this.handleStyle,
          tabIndex = this.tabIndex;

      var handleGenerator = handle || defaultHandle;
      var offsets = bounds.map(function (v) {
        return _this4.calcOffset(v);
      });

      var handleClassName = prefixCls + '-handle';
      var handles = bounds.map(function (v, i) {
        var _classNames2;

        return handleGenerator({
          className: classnames__WEBPACK_IMPORTED_MODULE_3___default()((_classNames2 = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_classNames2, handleClassName, true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_classNames2, handleClassName + '-' + (i + 1), true), _classNames2)),
          prefixCls: prefixCls,
          vertical: vertical,
          offset: offsets[i],
          value: v,
          dragging: sHandle === i,
          index: i,
          tabIndex: tabIndex[i] || 0,
          min: min,
          max: max,
          disabled: disabled,
          style: handleStyle[i],
          directives: [{
            name: 'ant-ref',
            value: function value(h) {
              return _this4.saveHandle(i, h);
            }
          }],
          on: {
            focus: _this4.onFocus,
            blur: _this4.onBlur
          }
        });
      });

      return {
        tracks: this.getTrack({ bounds: bounds, prefixCls: prefixCls, vertical: vertical, included: included, offsets: offsets, trackStyle: trackStyle }),
        handles: handles
      };
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Object(_common_createSlider__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Range));

/***/ }),

/***/ "a404":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/addEventListener.js
var addEventListener = __webpack_require__("f194");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/warning.js
var warning = __webpack_require__("6a21");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slider/src/common/Steps.js





var Steps_calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  Object(warning["a" /* default */])(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
  var points = Object.keys(marks).map(parseFloat).sort(function (a, b) {
    return a - b;
  });
  if (dots) {
    for (var i = min; i <= max; i += step) {
      if (points.indexOf(i) === -1) {
        points.push(i);
      }
    }
  }
  return points;
};

var Steps = {
  functional: true,
  render: function render(h, context) {
    var _context$props = context.props,
        prefixCls = _context$props.prefixCls,
        vertical = _context$props.vertical,
        marks = _context$props.marks,
        dots = _context$props.dots,
        step = _context$props.step,
        included = _context$props.included,
        lowerBound = _context$props.lowerBound,
        upperBound = _context$props.upperBound,
        max = _context$props.max,
        min = _context$props.min,
        dotStyle = _context$props.dotStyle,
        activeDotStyle = _context$props.activeDotStyle;

    var range = max - min;
    var elements = Steps_calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
      var _classNames;

      var offset = Math.abs(point - min) / range * 100 + '%';

      var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
      var style = vertical ? extends_default()({ bottom: offset }, dotStyle) : extends_default()({ left: offset }, dotStyle);
      if (isActived) {
        style = extends_default()({}, style, activeDotStyle);
      }

      var pointClassName = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-dot', true), defineProperty_default()(_classNames, prefixCls + '-dot-active', isActived), _classNames));

      return h('span', { 'class': pointClassName, style: style, key: point });
    });

    return h(
      'div',
      { 'class': prefixCls + '-step' },
      [elements]
    );
  }
};

/* harmony default export */ var common_Steps = (Steps);
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slider/src/common/Marks.js






var Marks = {
  functional: true,
  render: function render(h, context) {
    var _context$props = context.props,
        className = _context$props.className,
        vertical = _context$props.vertical,
        marks = _context$props.marks,
        included = _context$props.included,
        upperBound = _context$props.upperBound,
        lowerBound = _context$props.lowerBound,
        max = _context$props.max,
        min = _context$props.min;
    var clickLabel = context.listeners.clickLabel;

    var marksKeys = Object.keys(marks);

    var range = max - min;
    var elements = marksKeys.map(parseFloat).sort(function (a, b) {
      return a - b;
    }).map(function (point) {
      var _classNames;

      var markPoint = typeof marks[point] === 'function' ? marks[point](h) : marks[point];
      var markPointIsObject = (typeof markPoint === 'undefined' ? 'undefined' : typeof_default()(markPoint)) === 'object' && !Object(props_util["t" /* isValidElement */])(markPoint);
      var markLabel = markPointIsObject ? markPoint.label : markPoint;
      if (!markLabel && markLabel !== 0) {
        return null;
      }

      var isActive = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
      var markClassName = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, className + '-text', true), defineProperty_default()(_classNames, className + '-text-active', isActive), _classNames));

      var bottomStyle = {
        marginBottom: '-50%',
        bottom: (point - min) / range * 100 + '%'
      };

      var leftStyle = {
        left: (point - min) / range * 100 + '%',
        transform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)'
      };

      var style = vertical ? bottomStyle : leftStyle;
      var markStyle = markPointIsObject ? extends_default()({}, style, markPoint.style) : style;
      return h(
        'span',
        {
          'class': markClassName,
          style: markStyle,
          key: point,
          on: {
            'mousedown': function mousedown(e) {
              return clickLabel(e, point);
            },
            'touchstart': function touchstart(e) {
              return clickLabel(e, point);
            }
          }
        },
        [markLabel]
      );
    });

    return h(
      'div',
      { 'class': className },
      [elements]
    );
  }
};

/* harmony default export */ var common_Marks = (Marks);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-slider/src/Handle.js
var Handle = __webpack_require__("6f15");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-slider/src/utils.js
var utils = __webpack_require__("3d63");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slider/src/common/createSlider.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSlider; });













function noop() {}

function createSlider(Component) {
  // const displayName = `ComponentEnhancer(${Component.displayName})`
  var propTypes = {
    min: vue_types["a" /* default */].number,
    max: vue_types["a" /* default */].number,
    step: vue_types["a" /* default */].number,
    marks: vue_types["a" /* default */].object,
    included: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string,
    disabled: vue_types["a" /* default */].bool,
    handle: vue_types["a" /* default */].func,
    dots: vue_types["a" /* default */].bool,
    vertical: vue_types["a" /* default */].bool,
    minimumTrackStyle: vue_types["a" /* default */].object, // just for compatibility, will be deperecate
    maximumTrackStyle: vue_types["a" /* default */].object, // just for compatibility, will be deperecate
    handleStyle: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].object)]),
    trackStyle: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].object)]),
    railStyle: vue_types["a" /* default */].object,
    dotStyle: vue_types["a" /* default */].object,
    activeDotStyle: vue_types["a" /* default */].object,
    autoFocus: vue_types["a" /* default */].bool
  };
  return {
    name: 'createSlider',
    mixins: [Component],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: Object(props_util["r" /* initDefaultProps */])(propTypes, {
      prefixCls: 'rc-slider',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      // handle ({ index, ref, className, style, ...restProps }) {
      //   delete restProps.dragging
      //   const handleProps = {
      //     props: {
      //       ...restProps,
      //     },
      //     class: className,
      //     style,
      //     key: index,
      //     ref,
      //   }
      //   return <Handle {...handleProps} />
      // },
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      trackStyle: [{}],
      handleStyle: [{}],
      railStyle: {},
      dotStyle: {},
      activeDotStyle: {}
    }),
    data: function data() {
      if (utils["g" /* isDev */]()) {
        var step = this.step,
            max = this.max,
            min = this.min;

        var isPointDiffEven = isFinite(max - min) ? (max - min) % step === 0 : true; // eslint-disable-line
        Object(warning["a" /* default */])(step && Math.floor(step) === step ? isPointDiffEven : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
      }
      this.handlesRefs = {};
      return {};
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        // Snapshot testing cannot handle refs, so be sure to null-check this.
        _this.document = _this.$refs.sliderRef && _this.$refs.sliderRef.ownerDocument;
        // this.setHandleRefs()
      });
    },
    beforeDestroy: function beforeDestroy() {
      var _this2 = this;

      this.$nextTick(function () {
        // if (super.componentWillUnmount) super.componentWillUnmount()
        _this2.removeDocumentEvents();
      });
    },

    methods: {
      defaultHandle: function defaultHandle(_ref) {
        var index = _ref.index,
            directives = _ref.directives,
            className = _ref.className,
            style = _ref.style,
            on = _ref.on,
            restProps = objectWithoutProperties_default()(_ref, ['index', 'directives', 'className', 'style', 'on']);

        var h = this.$createElement;

        delete restProps.dragging;
        if (restProps.value === null) {
          return null;
        }
        var handleProps = {
          props: extends_default()({}, restProps),
          'class': className,
          style: style,
          key: index,
          directives: directives,
          on: on
        };
        return h(Handle["a" /* default */], handleProps);
      },
      onMouseDown: function onMouseDown(e) {
        if (e.button !== 0) {
          return;
        }
        var isVertical = this.vertical;
        var position = utils["e" /* getMousePosition */](isVertical, e);
        if (!utils["h" /* isEventFromHandle */](e, this.handlesRefs)) {
          this.dragOffset = 0;
        } else {
          var handlePosition = utils["c" /* getHandleCenterPosition */](isVertical, e.target);
          this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        this.removeDocumentEvents();
        this.onStart(position);
        this.addDocumentMouseEvents();
        utils["k" /* pauseEvent */](e);
      },
      onTouchStart: function onTouchStart(e) {
        if (utils["i" /* isNotTouchEvent */](e)) return;

        var isVertical = this.vertical;
        var position = utils["f" /* getTouchPosition */](isVertical, e);
        if (!utils["h" /* isEventFromHandle */](e, this.handlesRefs)) {
          this.dragOffset = 0;
        } else {
          var handlePosition = utils["c" /* getHandleCenterPosition */](isVertical, e.target);
          this.dragOffset = position - handlePosition;
          position = handlePosition;
        }
        this.onStart(position);
        this.addDocumentTouchEvents();
        utils["k" /* pauseEvent */](e);
      },
      onFocus: function onFocus(e) {
        var vertical = this.vertical;

        if (utils["h" /* isEventFromHandle */](e, this.handlesRefs)) {
          var handlePosition = utils["c" /* getHandleCenterPosition */](vertical, e.target);
          this.dragOffset = 0;
          this.onStart(handlePosition);
          utils["k" /* pauseEvent */](e);
          this.$emit('focus', e);
        }
      },
      onBlur: function onBlur(e) {
        this.onEnd();
        this.$emit('blur', e);
      },
      onMouseUp: function onMouseUp() {
        if (this.handlesRefs[this.prevMovedHandleIndex]) {
          this.handlesRefs[this.prevMovedHandleIndex].clickFocus();
        }
      },
      onMouseMove: function onMouseMove(e) {
        if (!this.$refs.sliderRef) {
          this.onEnd();
          return;
        }
        var position = utils["e" /* getMousePosition */](this.vertical, e);
        this.onMove(e, position - this.dragOffset);
      },
      onTouchMove: function onTouchMove(e) {
        if (utils["i" /* isNotTouchEvent */](e) || !this.$refs.sliderRef) {
          this.onEnd();
          return;
        }

        var position = utils["f" /* getTouchPosition */](this.vertical, e);
        this.onMove(e, position - this.dragOffset);
      },
      onKeyDown: function onKeyDown(e) {
        if (this.$refs.sliderRef && utils["h" /* isEventFromHandle */](e, this.handlesRefs)) {
          this.onKeyboard(e);
        }
      },
      onClickMarkLabel: function onClickMarkLabel(e, value) {
        e.stopPropagation();
        this.onChange({ sValue: value });
        this.onEnd(true);
      },
      getSliderStart: function getSliderStart() {
        var slider = this.$refs.sliderRef;
        var rect = slider.getBoundingClientRect();

        return this.vertical ? rect.top : rect.left + window.pageXOffset;
      },
      getSliderLength: function getSliderLength() {
        var slider = this.$refs.sliderRef;
        if (!slider) {
          return 0;
        }

        var coords = slider.getBoundingClientRect();
        return this.vertical ? coords.height : coords.width;
      },
      addDocumentTouchEvents: function addDocumentTouchEvents() {
        // just work for Chrome iOS Safari and Android Browser
        this.onTouchMoveListener = Object(addEventListener["a" /* default */])(this.document, 'touchmove', this.onTouchMove);
        this.onTouchUpListener = Object(addEventListener["a" /* default */])(this.document, 'touchend', this.onEnd);
      },
      addDocumentMouseEvents: function addDocumentMouseEvents() {
        this.onMouseMoveListener = Object(addEventListener["a" /* default */])(this.document, 'mousemove', this.onMouseMove);
        this.onMouseUpListener = Object(addEventListener["a" /* default */])(this.document, 'mouseup', this.onEnd);
      },
      removeDocumentEvents: function removeDocumentEvents() {
        /* eslint-disable no-unused-expressions */
        this.onTouchMoveListener && this.onTouchMoveListener.remove();
        this.onTouchUpListener && this.onTouchUpListener.remove();

        this.onMouseMoveListener && this.onMouseMoveListener.remove();
        this.onMouseUpListener && this.onMouseUpListener.remove();
        /* eslint-enable no-unused-expressions */
      },
      focus: function focus() {
        if (!this.disabled) {
          this.handlesRefs[0].focus();
        }
      },
      blur: function blur() {
        var _this3 = this;

        if (!this.disabled) {
          Object.keys(this.handlesRefs).forEach(function (key) {
            if (_this3.handlesRefs[key] && _this3.handlesRefs[key].blur) {
              _this3.handlesRefs[key].blur();
            }
          });
        }
      },
      calcValue: function calcValue(offset) {
        var vertical = this.vertical,
            min = this.min,
            max = this.max;

        var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
      },
      calcValueByPos: function calcValueByPos(position) {
        var pixelOffset = position - this.getSliderStart();
        var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
        return nextValue;
      },
      calcOffset: function calcOffset(value) {
        var min = this.min,
            max = this.max;

        var ratio = (value - min) / (max - min);
        return ratio * 100;
      },
      saveHandle: function saveHandle(index, handle) {
        this.handlesRefs[index] = handle;
      }
    },
    render: function render(h) {
      var _classNames;

      var prefixCls = this.prefixCls,
          marks = this.marks,
          dots = this.dots,
          step = this.step,
          included = this.included,
          disabled = this.disabled,
          vertical = this.vertical,
          min = this.min,
          max = this.max,
          maximumTrackStyle = this.maximumTrackStyle,
          railStyle = this.railStyle,
          dotStyle = this.dotStyle,
          activeDotStyle = this.activeDotStyle;

      var _renderSlider = this.renderSlider(h),
          tracks = _renderSlider.tracks,
          handles = _renderSlider.handles;

      var sliderClassName = classnames_default()(prefixCls, (_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-with-marks', Object.keys(marks).length), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), defineProperty_default()(_classNames, prefixCls + '-vertical', vertical), _classNames));
      var markProps = {
        props: {
          vertical: vertical,
          marks: marks,
          included: included,
          lowerBound: this.getLowerBound(),
          upperBound: this.getUpperBound(),
          max: max,
          min: min,
          className: prefixCls + '-mark'
        },
        on: {
          clickLabel: disabled ? noop : this.onClickMarkLabel
        }
      };
      return h(
        'div',
        {
          ref: 'sliderRef',
          attrs: { tabIndex: '-1'
          },
          'class': sliderClassName,
          on: {
            'touchstart': disabled ? noop : this.onTouchStart,
            'mousedown': disabled ? noop : this.onMouseDown,
            'mouseup': disabled ? noop : this.onMouseUp,
            'keydown': disabled ? noop : this.onKeyDown,
            'focus': disabled ? noop : this.onFocus,
            'blur': disabled ? noop : this.onBlur
          }
        },
        [h('div', {
          'class': prefixCls + '-rail',
          style: extends_default()({}, maximumTrackStyle, railStyle)
        }), tracks, h(common_Steps, {
          attrs: {
            prefixCls: prefixCls,
            vertical: vertical,
            marks: marks,
            dots: dots,
            step: step,
            included: included,
            lowerBound: this.getLowerBound(),
            upperBound: this.getUpperBound(),
            max: max,
            min: min,
            dotStyle: dotStyle,
            activeDotStyle: activeDotStyle
          }
        }), handles, h(common_Marks, markProps), this.$slots['default']]
      );
    }
  };
}

/***/ }),

/***/ "c3b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/json2mq/index.js
var json2mq = __webpack_require__("a48b");
var json2mq_default = /*#__PURE__*/__webpack_require__.n(json2mq);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-ref/index.js
var vue_ref = __webpack_require__("46cf");
var vue_ref_default = /*#__PURE__*/__webpack_require__.n(vue_ref);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/default-props.js


var defaultProps = {
  accessibility: vue_types["a" /* default */].bool.def(true),
  // 自定义高度
  adaptiveHeight: vue_types["a" /* default */].bool.def(false),
  afterChange: vue_types["a" /* default */].any.def(null),
  arrows: vue_types["a" /* default */].bool.def(true),
  autoplay: vue_types["a" /* default */].bool.def(false),
  autoplaySpeed: vue_types["a" /* default */].number.def(3000),
  beforeChange: vue_types["a" /* default */].any.def(null),
  centerMode: vue_types["a" /* default */].bool.def(false),
  centerPadding: vue_types["a" /* default */].string.def('50px'),
  cssEase: vue_types["a" /* default */].string.def('ease'),
  dots: vue_types["a" /* default */].bool.def(false),
  dotsClass: vue_types["a" /* default */].string.def('slick-dots'),
  draggable: vue_types["a" /* default */].bool.def(true),
  unslick: vue_types["a" /* default */].bool.def(false),
  easing: vue_types["a" /* default */].string.def('linear'),
  edgeFriction: vue_types["a" /* default */].number.def(0.35),
  fade: vue_types["a" /* default */].bool.def(false),
  focusOnSelect: vue_types["a" /* default */].bool.def(false),
  infinite: vue_types["a" /* default */].bool.def(true),
  initialSlide: vue_types["a" /* default */].number.def(0),
  lazyLoad: vue_types["a" /* default */].any.def(null),
  verticalSwiping: vue_types["a" /* default */].bool.def(false),
  asNavFor: vue_types["a" /* default */].any.def(null),
  // 圆点hover是否暂停
  pauseOnDotsHover: vue_types["a" /* default */].bool.def(false),
  // focus是否暂停
  pauseOnFocus: vue_types["a" /* default */].bool.def(false),
  // hover是否暂停
  pauseOnHover: vue_types["a" /* default */].bool.def(true),
  responsive: vue_types["a" /* default */].array,
  rows: vue_types["a" /* default */].number.def(1),
  rtl: vue_types["a" /* default */].bool.def(false),
  slide: vue_types["a" /* default */].string.def('div'),
  slidesPerRow: vue_types["a" /* default */].number.def(1),
  slidesToScroll: vue_types["a" /* default */].number.def(1),
  slidesToShow: vue_types["a" /* default */].number.def(1),
  speed: vue_types["a" /* default */].number.def(500),
  swipe: vue_types["a" /* default */].bool.def(true),
  swipeEvent: vue_types["a" /* default */].any.def(null),
  swipeToSlide: vue_types["a" /* default */].bool.def(false),
  touchMove: vue_types["a" /* default */].bool.def(true),
  touchThreshold: vue_types["a" /* default */].number.def(5),
  useCSS: vue_types["a" /* default */].bool.def(true),
  useTransform: vue_types["a" /* default */].bool.def(true),
  variableWidth: vue_types["a" /* default */].bool.def(false),
  vertical: vue_types["a" /* default */].bool.def(false),
  waitForAnimate: vue_types["a" /* default */].bool.def(true),
  children: vue_types["a" /* default */].array,
  __propsSymbol__: vue_types["a" /* default */].any
};

/* harmony default export */ var default_props = (defaultProps);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/initial-state.js
var initialState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false, // used by swipeEvent. differentites between touch and swipe.
  swiping: false,
  touchObject: { startX: 0, startY: 0, curX: 0, curY: 0 },
  trackStyle: {},
  trackWidth: 0
};

/* harmony default export */ var initial_state = (initialState);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/utils/innerSliderUtils.js

var getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
  var onDemandSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);
  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }
  return onDemandSlides;
};

// return list of slides that need to be present
var getRequiredLazySlides = function getRequiredLazySlides(spec) {
  var requiredSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);
  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    requiredSlides.push(slideIndex);
  }
  return requiredSlides;
};

// startIndex that needs to be present
var lazyStartIndex = function lazyStartIndex(spec) {
  return spec.currentSlide - lazySlidesOnLeft(spec);
};
var lazyEndIndex = function lazyEndIndex(spec) {
  return spec.currentSlide + lazySlidesOnRight(spec);
};
var lazySlidesOnLeft = function lazySlidesOnLeft(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};
var lazySlidesOnRight = function lazySlidesOnRight(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
};

// get width of an element
var getWidth = function getWidth(elem) {
  return elem && elem.offsetWidth || 0;
};
var getHeight = function getHeight(elem) {
  return elem && elem.offsetHeight || 0;
};
var getSwipeDirection = function getSwipeDirection(touchObject) {
  var verticalSwiping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var swipeAngle = void 0;
  var xDist = touchObject.startX - touchObject.curX;
  var yDist = touchObject.startY - touchObject.curY;
  var r = Math.atan2(yDist, xDist);
  swipeAngle = Math.round(r * 180 / Math.PI);
  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }
  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
    return 'left';
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return 'right';
  }
  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return 'up';
    } else {
      return 'down';
    }
  }

  return 'vertical';
};

// whether or not we can go next
var canGoNext = function canGoNext(spec) {
  var canGo = true;
  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false;
    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
      canGo = false;
    }
  }
  return canGo;
};

// given an object and a list of keys, return new object with given keys
var extractObject = function extractObject(spec, keys) {
  var newObject = {};
  keys.forEach(function (key) {
    return newObject[key] = spec[key];
  });
  return newObject;
};

// get initialized state
var initializedState = function initializedState(spec) {
  // spec also contains listRef, trackRef
  var slideCount = spec.children.length;
  var listWidth = Math.ceil(getWidth(spec.listRef));
  var trackWidth = Math.ceil(getWidth(spec.trackRef));
  var slideWidth = void 0;
  if (!spec.vertical) {
    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;
    if (typeof spec.centerPadding === 'string' && spec.centerPadding.slice(-1) === '%') {
      centerPaddingAdj *= listWidth / 100;
    }
    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
  } else {
    slideWidth = listWidth;
  }
  var slideHeight = spec.listRef && getHeight(spec.listRef.querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;
  if (spec.rtl && spec.currentSlide === undefined) {
    currentSlide = slideCount - 1 - spec.initialSlide;
  }
  var lazyLoadedList = spec.lazyLoadedList || [];
  var slidesToLoad = getOnDemandLazySlides({ currentSlide: currentSlide, lazyLoadedList: lazyLoadedList }, spec);
  lazyLoadedList.concat(slidesToLoad);

  var state = {
    slideCount: slideCount,
    slideWidth: slideWidth,
    listWidth: listWidth,
    trackWidth: trackWidth,
    currentSlide: currentSlide,
    slideHeight: slideHeight,
    listHeight: listHeight,
    lazyLoadedList: lazyLoadedList
  };

  if (spec.autoplaying === null && spec.autoplay) {
    state['autoplaying'] = 'playing';
  }

  return state;
};

var innerSliderUtils_slideHandler = function slideHandler(spec) {
  var waitForAnimate = spec.waitForAnimate,
      animating = spec.animating,
      fade = spec.fade,
      infinite = spec.infinite,
      index = spec.index,
      slideCount = spec.slideCount,
      lazyLoadedList = spec.lazyLoadedList,
      lazyLoad = spec.lazyLoad,
      currentSlide = spec.currentSlide,
      centerMode = spec.centerMode,
      slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      useCSS = spec.useCSS;

  if (waitForAnimate && animating) return {};
  var animationSlide = index;
  var finalSlide = void 0;
  var animationLeft = void 0;
  var finalLeft = void 0;
  var state = {};
  var nextState = {};
  if (fade) {
    if (!infinite && (index < 0 || index >= slideCount)) return {};
    if (index < 0) {
      animationSlide = index + slideCount;
    } else if (index >= slideCount) {
      animationSlide = index - slideCount;
    }
    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList.push(animationSlide);
    }
    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList: lazyLoadedList
    };
    nextState = { animating: false };
  } else {
    finalSlide = animationSlide;
    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount;
      if (!infinite) finalSlide = 0;else if (slideCount % slidesToScroll !== 0) {
        finalSlide = slideCount - slideCount % slidesToScroll;
      }
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide;
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1;
      finalSlide = infinite ? 0 : slideCount - 1;
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount;
      if (!infinite) finalSlide = slideCount - slidesToShow;else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
    }
    animationLeft = getTrackLeft(extends_default()({}, spec, { slideIndex: animationSlide }));
    finalLeft = getTrackLeft(extends_default()({}, spec, { slideIndex: finalSlide }));
    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide;
      animationLeft = finalLeft;
    }
    lazyLoad && lazyLoadedList.concat(getOnDemandLazySlides(extends_default()({}, spec, { currentSlide: animationSlide })));
    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: innerSliderUtils_getTrackCSS(extends_default()({}, spec, { left: finalLeft })),
        lazyLoadedList: lazyLoadedList
      };
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS(extends_default()({}, spec, { left: animationLeft })),
        lazyLoadedList: lazyLoadedList
      };
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: innerSliderUtils_getTrackCSS(extends_default()({}, spec, { left: finalLeft })),
        swipeLeft: null
      };
    }
  }
  return { state: state, nextState: nextState };
};

var innerSliderUtils_changeSlide = function changeSlide(spec, options) {
  var previousInt = void 0,
      slideOffset = void 0,
      targetSlide = void 0;
  var slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      slideCount = spec.slideCount,
      currentSlide = spec.currentSlide,
      lazyLoad = spec.lazyLoad,
      infinite = spec.infinite;

  var unevenOffset = slideCount % slidesToScroll !== 0;
  var indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

  if (options.message === 'previous') {
    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
    targetSlide = currentSlide - slideOffset;
    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset;
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
    }
  } else if (options.message === 'next') {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
    targetSlide = currentSlide + slideOffset;
    if (lazyLoad && !infinite) {
      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
    }
  } else if (options.message === 'dots') {
    // Click on dots
    targetSlide = options.index * options.slidesToScroll;
    if (targetSlide === options.currentSlide) {
      return null;
    }
  } else if (options.message === 'children') {
    // Click on the slides
    targetSlide = options.index;
    if (targetSlide === options.currentSlide) {
      return null;
    }
    if (infinite) {
      var direction = siblingDirection(extends_default()({}, spec, { targetSlide: targetSlide }));
      if (targetSlide > options.currentSlide && direction === 'left') {
        targetSlide = targetSlide - slideCount;
      } else if (targetSlide < options.currentSlide && direction === 'right') {
        targetSlide = targetSlide + slideCount;
      }
    }
  } else if (options.message === 'index') {
    targetSlide = Number(options.index);
    if (targetSlide === options.currentSlide) {
      return null;
    }
  }
  return targetSlide;
};
var innerSliderUtils_keyHandler = function keyHandler(e, accessibility, rtl) {
  if (e.target.tagName.match('TEXTAREA|INPUT|SELECT') || !accessibility) {
    return '';
  }
  if (e.keyCode === 37) return rtl ? 'next' : 'previous';
  if (e.keyCode === 39) return rtl ? 'previous' : 'next';
  return '';
};

var innerSliderUtils_swipeStart = function swipeStart(e, swipe, draggable) {
  e.target.tagName === 'IMG' && e.preventDefault();
  if (!swipe || !draggable && e.type.indexOf('mouse') !== -1) return '';
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};
var innerSliderUtils_swipeMove = function swipeMove(e, spec) {
  // spec also contains, trackRef and slideIndex
  var scrolling = spec.scrolling,
      animating = spec.animating,
      vertical = spec.vertical,
      swipeToSlide = spec.swipeToSlide,
      verticalSwiping = spec.verticalSwiping,
      rtl = spec.rtl,
      currentSlide = spec.currentSlide,
      edgeFriction = spec.edgeFriction,
      edgeDragged = spec.edgeDragged,
      onEdge = spec.onEdge,
      swiped = spec.swiped,
      swiping = spec.swiping,
      slideCount = spec.slideCount,
      slidesToScroll = spec.slidesToScroll,
      infinite = spec.infinite,
      touchObject = spec.touchObject,
      swipeEvent = spec.swipeEvent,
      listHeight = spec.listHeight,
      listWidth = spec.listWidth;

  if (scrolling) return;
  if (animating) return e.preventDefault();
  if (vertical && swipeToSlide && verticalSwiping) e.preventDefault();
  var swipeLeft = void 0;
  var state = {};
  var curLeft = getTrackLeft(spec);
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));
  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return { scrolling: true };
  }
  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping) {
    positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
  }

  var dotCount = Math.ceil(slideCount / slidesToScroll);
  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  var touchSwipeLength = touchObject.swipeLength;
  if (!infinite) {
    if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left' || !canGoNext(spec) && swipeDirection === 'left') {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;
      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state['edgeDragged'] = true;
      }
    }
  }
  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state['swiped'] = true;
  }
  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }
  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }
  state = extends_default()({}, state, {
    touchObject: touchObject,
    swipeLeft: swipeLeft,
    trackStyle: innerSliderUtils_getTrackCSS(extends_default()({}, spec, { left: swipeLeft }))
  });
  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state;
  }
  if (touchObject.swipeLength > 10) {
    state['swiping'] = true;
    e.preventDefault();
  }
  return state;
};
var innerSliderUtils_swipeEnd = function swipeEnd(e, spec) {
  var dragging = spec.dragging,
      swipe = spec.swipe,
      touchObject = spec.touchObject,
      listWidth = spec.listWidth,
      touchThreshold = spec.touchThreshold,
      verticalSwiping = spec.verticalSwiping,
      listHeight = spec.listHeight,
      currentSlide = spec.currentSlide,
      swipeToSlide = spec.swipeToSlide,
      scrolling = spec.scrolling,
      onSwipe = spec.onSwipe;

  if (!dragging) {
    if (swipe) e.preventDefault();
    return {};
  }
  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping);
  // reset the state of touch related state variables.
  var state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };
  if (scrolling) {
    return state;
  }
  if (!touchObject.swipeLength) {
    return state;
  }
  if (touchObject.swipeLength > minSwipe) {
    e.preventDefault();
    if (onSwipe) {
      onSwipe(swipeDirection);
    }
    var slideCount = void 0,
        newSlide = void 0;
    switch (swipeDirection) {
      case 'left':
      case 'up':
        newSlide = currentSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state['currentDirection'] = 0;
        break;
      case 'right':
      case 'down':
        newSlide = currentSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state['currentDirection'] = 1;
        break;
      default:
        slideCount = currentSlide;
    }
    state['triggerSlideHandler'] = slideCount;
  } else {
    // Adjust the track back to it's original position.
    var currentLeft = getTrackLeft(spec);
    state['trackStyle'] = getTrackAnimateCSS(extends_default()({}, spec, { left: currentLeft }));
  }
  return state;
};
var getNavigableIndexes = function getNavigableIndexes(spec) {
  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
  var indexes = [];
  while (breakpoint < max) {
    indexes.push(breakpoint);
    breakpoint = counter + spec.slidesToScroll;
    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
  }
  return indexes;
};
var checkNavigable = function checkNavigable(spec, index) {
  var navigables = getNavigableIndexes(spec);
  var prevNavigable = 0;
  if (index > navigables[navigables.length - 1]) {
    index = navigables[navigables.length - 1];
  } else {
    for (var n in navigables) {
      if (index < navigables[n]) {
        index = prevNavigable;
        break;
      }
      prevNavigable = navigables[n];
    }
  }
  return index;
};
var getSlideCount = function getSlideCount(spec) {
  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;
  if (spec.swipeToSlide) {
    var swipedSlide = void 0;
    var slickList = spec.listRef;
    var slides = slickList.querySelectorAll('.slick-slide');
    Array.from(slides).every(function (slide) {
      if (!spec.vertical) {
        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      }

      return true;
    });

    if (!swipedSlide) {
      return 0;
    }
    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
    return slidesTraversed;
  } else {
    return spec.slidesToScroll;
  }
};

var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
  return keysArray.reduce(function (value, key) {
    return value && spec.hasOwnProperty(key);
  }, true) ? null : console.error('Keys Missing:', spec);
};

var innerSliderUtils_getTrackCSS = function getTrackCSS(spec) {
  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);
  var trackWidth = void 0,
      trackHeight = void 0;
  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;
  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth;
  } else {
    trackHeight = trackChildren * spec.slideHeight;
  }
  var style = {
    opacity: 1,
    transition: '',
    WebkitTransition: ''
  };
  if (spec.useTransform) {
    var WebkitTransform = !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)';
    var transform = !spec.vertical ? 'translate3d(' + spec.left + 'px, 0px, 0px)' : 'translate3d(0px, ' + spec.left + 'px, 0px)';
    var msTransform = !spec.vertical ? 'translateX(' + spec.left + 'px)' : 'translateY(' + spec.left + 'px)';
    style = extends_default()({}, style, {
      WebkitTransform: WebkitTransform,
      transform: transform,
      msTransform: msTransform
    });
  } else {
    if (spec.vertical) {
      style['top'] = spec.left;
    } else {
      style['left'] = spec.left;
    }
  }
  if (spec.fade) style = { opacity: 1 };
  if (trackWidth) style.width = trackWidth + 'px';
  if (trackHeight) style.height = trackHeight + 'px';

  // Fallback for IE8
  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + 'px';
    } else {
      style.marginTop = spec.left + 'px';
    }
  }

  return style;
};
var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
  checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);
  var style = innerSliderUtils_getTrackCSS(spec);
  // useCSS is true by default so it can be undefined
  if (spec.useTransform) {
    style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
    style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
  } else {
    if (spec.vertical) {
      style.transition = 'top ' + spec.speed + 'ms ' + spec.cssEase;
    } else {
      style.transition = 'left ' + spec.speed + 'ms ' + spec.cssEase;
    }
  }
  return style;
};
var getTrackLeft = function getTrackLeft(spec) {
  if (spec.unslick) {
    return 0;
  }

  checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth', 'slideHeight']);

  var slideIndex = spec.slideIndex,
      trackRef = spec.trackRef,
      infinite = spec.infinite,
      centerMode = spec.centerMode,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow,
      slidesToScroll = spec.slidesToScroll,
      slideWidth = spec.slideWidth,
      listWidth = spec.listWidth,
      variableWidth = spec.variableWidth,
      slideHeight = spec.slideHeight,
      fade = spec.fade,
      vertical = spec.vertical;


  var slideOffset = 0;
  var targetLeft = void 0;
  var targetSlide = void 0;
  var verticalOffset = 0;

  if (fade || spec.slideCount === 1) {
    return 0;
  }

  var slidesToOffset = 0;
  if (infinite) {
    slidesToOffset = -getPreClones(spec); // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
    }
    // shift current slide to center of the frame
    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2);
    }
  } else {
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
    }
    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2);
    }
  }
  slideOffset = slidesToOffset * slideWidth;
  verticalOffset = slidesToOffset * slideHeight;

  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
  }

  if (variableWidth === true) {
    var targetSlideIndex = void 0;
    var trackElem = trackRef;
    targetSlideIndex = slideIndex + getPreClones(spec);
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
      targetSlide = trackElem && trackElem.children[targetSlideIndex];
      targetLeft = 0;
      for (var slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
      }
      targetLeft -= parseInt(spec.centerPadding);
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
    }
  }

  return targetLeft;
};

var getPreClones = function getPreClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }
  if (spec.variableWidth) {
    return spec.slideCount;
  }
  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
};

var getPostClones = function getPostClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }
  return spec.slideCount;
};

var getTotalSlides = function getTotalSlides(spec) {
  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
};
var siblingDirection = function siblingDirection(spec) {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
      return 'left';
    }
    return 'right';
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
      return 'right';
    }
    return 'left';
  }
};

var slidesOnRight = function slidesOnRight(_ref) {
  var slidesToShow = _ref.slidesToShow,
      centerMode = _ref.centerMode,
      rtl = _ref.rtl,
      centerPadding = _ref.centerPadding;

  // returns no of slides on the right of active slide
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) right += 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }
  if (rtl) {
    return 0;
  }
  return slidesToShow - 1;
};

var slidesOnLeft = function slidesOnLeft(_ref2) {
  var slidesToShow = _ref2.slidesToShow,
      centerMode = _ref2.centerMode,
      rtl = _ref2.rtl,
      centerPadding = _ref2.centerPadding;

  // returns no of slides on the left of active slide
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) left += 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }
  if (rtl) {
    return slidesToShow - 1;
  }
  return 0;
};

var canUseDOM = function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/track.js






// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
var getSlideClasses = function getSlideClasses(spec) {
  var slickActive = void 0,
      slickCenter = void 0;
  var centerOffset = void 0,
      index = void 0;

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index;
  } else {
    index = spec.index;
  }
  var slickCloned = index < 0 || index >= spec.slideCount;
  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }
  var slickCurrent = index === spec.currentSlide;
  return {
    'slick-slide': true,
    'slick-active': slickActive,
    'slick-center': slickCenter,
    'slick-cloned': slickCloned,
    'slick-current': slickCurrent // dubious in case of RTL
  };
};

var getSlideStyle = function getSlideStyle(spec) {
  var style = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth + (typeof spec.slideWidth === 'number' ? 'px' : '');
  }

  if (spec.fade) {
    style.position = 'relative';
    if (spec.vertical) {
      style.top = -spec.index * parseInt(spec.slideHeight) + 'px';
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth) + 'px';
    }
    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase + ', ' + 'visibility ' + spec.speed + 'ms ' + spec.cssEase;
    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase + ', ' + 'visibility ' + spec.speed + 'ms ' + spec.cssEase;
  }

  return style;
};

var getKey = function getKey(child, fallbackKey) {
  return child.key || child.key === 0 && '0' || fallbackKey;
};

var track_renderSlides = function renderSlides(spec, children, createElement) {
  var key = void 0;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];
  var childrenCount = children.length;
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  children.forEach(function (elem, index) {
    var child = void 0;
    var childOnClickOptions = {
      message: 'children',
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    };

    // in case of lazyLoad, whether or not we want to fetch the slide
    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0) {
      child = elem;
    } else {
      child = createElement('div');
    }
    var childStyle = getSlideStyle(extends_default()({}, spec, { index: index }));
    var slideClass = Object(props_util["f" /* getClass */])(child.context) || '';
    var slideClasses = getSlideClasses(extends_default()({}, spec, { index: index }));
    // push a cloned element of the desired slide
    slides.push(Object(vnode["a" /* cloneElement */])(child, {
      key: 'original' + getKey(child, index),
      attrs: {
        tabIndex: '-1',
        'data-index': index,
        'aria-hidden': !slideClasses['slick-active']
      },
      'class': classnames_default()(slideClasses, slideClass),
      style: extends_default()({ outline: 'none' }, Object(props_util["o" /* getStyle */])(child.context) || {}, childStyle),
      on: {
        click: function click() {
          // child.props && child.props.onClick && child.props.onClick(e)
          if (spec.focusOnSelect) {
            spec.focusOnSelect(childOnClickOptions);
          }
        }
      }
    }, true));

    // if slide needs to be precloned or postcloned
    if (spec.infinite && spec.fade === false) {
      var preCloneNo = childrenCount - index;
      if (preCloneNo <= getPreClones(spec) && childrenCount !== spec.slidesToShow) {
        key = -preCloneNo;
        if (key >= startIndex) {
          child = elem;
        }
        slideClasses = getSlideClasses(extends_default()({}, spec, { index: key }));
        preCloneSlides.push(Object(vnode["a" /* cloneElement */])(child, {
          key: 'precloned' + getKey(child, key),
          'class': classnames_default()(slideClasses, slideClass),
          attrs: {
            tabIndex: '-1',
            'data-index': key,
            'aria-hidden': !slideClasses['slick-active']
          },
          style: extends_default()({}, Object(props_util["o" /* getStyle */])(child.context) || {}, childStyle),
          on: {
            click: function click() {
              // child.props && child.props.onClick && child.props.onClick(e)
              if (spec.focusOnSelect) {
                spec.focusOnSelect(childOnClickOptions);
              }
            }
          }
        }));
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index;
        if (key < endIndex) {
          child = elem;
        }
        slideClasses = getSlideClasses(extends_default()({}, spec, { index: key }));
        postCloneSlides.push(Object(vnode["a" /* cloneElement */])(child, {
          key: 'postcloned' + getKey(child, key),
          attrs: {
            tabIndex: '-1',
            'data-index': key,
            'aria-hidden': !slideClasses['slick-active']
          },
          'class': classnames_default()(slideClasses, slideClass),
          style: extends_default()({}, Object(props_util["o" /* getStyle */])(child.context) || {}, childStyle),
          on: {
            click: function click() {
              // child.props && child.props.onClick && child.props.onClick(e)
              if (spec.focusOnSelect) {
                spec.focusOnSelect(childOnClickOptions);
              }
            }
          }
        }));
      }
    }
  });
  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};

/* harmony default export */ var track = ({
  functional: true,
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props,
        listeners = context.listeners,
        children = context.children,
        data = context.data;

    var slides = track_renderSlides(props, children, createElement);
    var mouseenter = listeners.mouseenter,
        mouseover = listeners.mouseover,
        mouseleave = listeners.mouseleave;

    var mouseEvents = { mouseenter: mouseenter, mouseover: mouseover, mouseleave: mouseleave };
    var trackProps = {
      'class': 'slick-track',
      style: props.trackStyle,
      on: extends_default()({}, mouseEvents),
      directives: data.directives
    };
    return h(
      'div',
      trackProps,
      [slides]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/dots.js




var getDotCount = function getDotCount(spec) {
  var dots = void 0;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }

  return dots;
};

/* harmony default export */ var src_dots = ({
  functional: true,
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props,
        listeners = context.listeners;
    var slideCount = props.slideCount,
        slidesToScroll = props.slidesToScroll,
        slidesToShow = props.slidesToShow,
        infinite = props.infinite,
        currentSlide = props.currentSlide,
        appendDots = props.appendDots,
        customPaging = props.customPaging,
        clickHandler = props.clickHandler,
        dotsClass = props.dotsClass;

    var dotCount = getDotCount({
      slideCount: slideCount,
      slidesToScroll: slidesToScroll,
      slidesToShow: slidesToShow,
      infinite: infinite
    });

    // Apply join & split to Array to pre-fill it for IE8
    //
    // Credit: http://stackoverflow.com/a/13735425/1849458
    var mouseenter = listeners.mouseenter,
        mouseover = listeners.mouseover,
        mouseleave = listeners.mouseleave;

    var mouseEvents = { mouseenter: mouseenter, mouseover: mouseover, mouseleave: mouseleave };
    var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {
      var leftBound = i * slidesToScroll;
      var rightBound = i * slidesToScroll + (slidesToScroll - 1);
      var className = classnames_default()({
        'slick-active': currentSlide >= leftBound && currentSlide <= rightBound
      });

      var dotOptions = {
        message: 'dots',
        index: i,
        slidesToScroll: slidesToScroll,
        currentSlide: currentSlide
      };
      function onClick(e) {
        // In Autoplay the focus stays on clicked button even after transition
        // to next slide. That only goes away by click somewhere outside
        if (e) {
          e.preventDefault();
        }
        clickHandler(dotOptions);
      }
      return h(
        'li',
        { key: i, 'class': className },
        [Object(vnode["a" /* cloneElement */])(customPaging({ i: i }), {
          on: {
            click: onClick
          }
        })]
      );
    });

    return Object(vnode["a" /* cloneElement */])(appendDots({ dots: dots }), {
      'class': dotsClass,
      on: extends_default()({}, mouseEvents)
    });
  }
});
// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/arrows.js





function noop() {}

var PrevArrow = {
  functional: true,
  clickHandler: function clickHandler(options, handle, e) {
    if (e) {
      e.preventDefault();
    }
    handle(options, e);
  },
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props;
    var clickHandler = props.clickHandler,
        infinite = props.infinite,
        currentSlide = props.currentSlide,
        slideCount = props.slideCount,
        slidesToShow = props.slidesToShow;

    var prevClasses = { 'slick-arrow': true, 'slick-prev': true };
    var prevHandler = function prevHandler(e) {
      if (e) {
        e.preventDefault();
      }
      clickHandler({ message: 'previous' });
    };

    if (!infinite && (currentSlide === 0 || slideCount <= slidesToShow)) {
      prevClasses['slick-disabled'] = true;
      prevHandler = noop;
    }

    var prevArrowProps = {
      key: '0',
      domProps: {
        'data-role': 'none'
      },
      'class': prevClasses,
      style: { display: 'block' },
      on: {
        click: prevHandler
      }
    };
    var customProps = {
      currentSlide: currentSlide,
      slideCount: slideCount
    };
    var prevArrow = void 0;

    if (props.prevArrow) {
      prevArrow = Object(vnode["a" /* cloneElement */])(props.prevArrow(extends_default()({}, prevArrowProps, {
        props: customProps
      })), {
        key: '0',
        'class': prevClasses,
        style: { display: 'block' },
        on: {
          click: prevHandler
        }
      });
    } else {
      prevArrow = h(
        'button',
        babel_helper_vue_jsx_merge_props_default()([{ key: '0', attrs: { type: 'button' }
        }, prevArrowProps]),
        [' ', 'Previous']
      );
    }

    return prevArrow;
  }
};

var NextArrow = {
  functional: true,
  clickHandler: function clickHandler(options, handle, e) {
    if (e) {
      e.preventDefault();
    }
    handle(options, e);
  },
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props;
    var clickHandler = props.clickHandler,
        currentSlide = props.currentSlide,
        slideCount = props.slideCount;


    var nextClasses = { 'slick-arrow': true, 'slick-next': true };
    var nextHandler = function nextHandler(e) {
      if (e) {
        e.preventDefault();
      }
      clickHandler({ message: 'next' });
    };
    if (!canGoNext(props)) {
      nextClasses['slick-disabled'] = true;
      nextHandler = noop;
    }

    var nextArrowProps = {
      key: '1',
      domProps: {
        'data-role': 'none'
      },
      'class': nextClasses,
      style: { display: 'block' },
      on: {
        click: nextHandler
      }
    };
    var customProps = {
      currentSlide: currentSlide,
      slideCount: slideCount
    };
    var nextArrow = void 0;

    if (props.nextArrow) {
      nextArrow = Object(vnode["a" /* cloneElement */])(props.nextArrow(extends_default()({}, nextArrowProps, {
        props: customProps
      })), {
        key: '1',
        'class': nextClasses,
        style: { display: 'block' },
        on: {
          click: nextHandler
        }
      });
    } else {
      nextArrow = h(
        'button',
        babel_helper_vue_jsx_merge_props_default()([{ key: '1', attrs: { type: 'button' }
        }, nextArrowProps]),
        [' ', 'Next']
      );
    }

    return nextArrow;
  }
};
// EXTERNAL MODULE: ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var ResizeObserver_es = __webpack_require__("6dd8");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/inner-slider.js

















vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });

function inner_slider_noop() {}

/* harmony default export */ var inner_slider = ({
  props: extends_default()({}, default_props),
  mixins: [BaseMixin["a" /* default */]],
  data: function data() {
    this.preProps = extends_default()({}, this.$props);
    this.list = null;
    this.track = null;
    this.callbackTimers = [];
    this.clickable = true;
    this.debouncedResize = null;
    return extends_default()({}, initial_state, {
      currentSlide: this.initialSlide,
      slideCount: this.children.length
    });
  },

  methods: {
    listRefHandler: function listRefHandler(ref) {
      this.list = ref;
    },
    trackRefHandler: function trackRefHandler(ref) {
      this.track = ref;
    },
    adaptHeight: function adaptHeight() {
      if (this.adaptiveHeight && this.list) {
        var elem = this.list.querySelector('[data-index="' + this.currentSlide + '"]');
        this.list.style.height = getHeight(elem) + 'px';
      }
    },
    onWindowResized: function onWindowResized(setTrackStyle) {
      var _this = this;

      if (this.debouncedResize) this.debouncedResize.cancel();
      this.debouncedResize = debounce_default()(function () {
        return _this.resizeWindow(setTrackStyle);
      }, 50);
      this.debouncedResize();
    },
    resizeWindow: function resizeWindow() {
      var _this2 = this;

      var setTrackStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.track) return;
      var spec = extends_default()({
        listRef: this.list,
        trackRef: this.track,
        children: this.children
      }, this.$props, this.$data);
      this.updateState(spec, setTrackStyle, function () {
        if (_this2.autoplay) {
          _this2.handleAutoPlay('update');
        } else {
          _this2.pause('paused');
        }
      });
      // animating state should be cleared while resizing, otherwise autoplay stops working
      this.setState({
        animating: false
      });
      clearTimeout(this.animationEndCallback);
      delete this.animationEndCallback;
    },
    updateState: function updateState(spec, setTrackStyle, callback) {
      var updatedState = initializedState(spec);
      spec = extends_default()({}, spec, updatedState, { slideIndex: updatedState.currentSlide });
      var targetLeft = getTrackLeft(spec);
      spec = extends_default()({}, spec, { left: targetLeft });
      var trackStyle = innerSliderUtils_getTrackCSS(spec);
      if (setTrackStyle || this.children.length !== spec.children.length) {
        updatedState['trackStyle'] = trackStyle;
      }
      this.setState(updatedState, callback);
    },
    ssrInit: function ssrInit() {
      var children = this.children;
      if (this.variableWidth) {
        var _trackWidth = 0;
        var _trackLeft = 0;
        var childrenWidths = [];
        var preClones = getPreClones(extends_default()({}, this.$props, this.$data, {
          slideCount: children.length
        }));
        var postClones = getPostClones(extends_default()({}, this.$props, this.$data, {
          slideCount: children.length
        }));
        children.forEach(function (child) {
          var childWidth = Object(props_util["o" /* getStyle */])(child).width.split('px')[0];
          childrenWidths.push(childWidth);
          _trackWidth += childWidth;
        });
        for (var i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }
        for (var _i = 0; _i < postClones; _i++) {
          _trackWidth += childrenWidths[_i];
        }
        for (var _i2 = 0; _i2 < this.currentSlide; _i2++) {
          _trackLeft += childrenWidths[_i2];
        }
        var _trackStyle = {
          width: _trackWidth + 'px',
          left: -_trackLeft + 'px'
        };
        if (this.centerMode) {
          var currentWidth = childrenWidths[this.currentSlide] + 'px';
          _trackStyle.left = 'calc(' + _trackStyle.left + ' + (100% - ' + currentWidth + ') / 2 ) ';
        }
        this.setState({
          trackStyle: _trackStyle
        });
        return;
      }
      var childrenCount = children.length;
      var spec = extends_default()({}, this.$props, this.$data, { slideCount: childrenCount });
      var slideCount = getPreClones(spec) + getPostClones(spec) + childrenCount;
      var trackWidth = 100 / this.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      var trackLeft = -slideWidth * (getPreClones(spec) + this.currentSlide) * trackWidth / 100;
      if (this.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }
      var trackStyle = {
        width: trackWidth + '%',
        left: trackLeft + '%'
      };
      this.setState({
        slideWidth: slideWidth + '%',
        trackStyle: trackStyle
      });
    },
    checkImagesLoad: function checkImagesLoad() {
      var _this3 = this;

      var images = document.querySelectorAll('.slick-slide img');
      var imagesCount = images.length;
      var loadedCount = 0;
      Array.prototype.forEach.call(images, function (image) {
        var handler = function handler() {
          return ++loadedCount && loadedCount >= imagesCount && _this3.onWindowResized();
        };
        if (!image.onclick) {
          image.onclick = function () {
            return image.parentNode.focus();
          };
        } else {
          var prevClickHandler = image.onclick;
          image.onclick = function () {
            prevClickHandler();
            image.parentNode.focus();
          };
        }
        if (!image.onload) {
          if (_this3.$props.lazyLoad) {
            image.onload = function () {
              _this3.adaptHeight();
              _this3.callbackTimers.push(setTimeout(_this3.onWindowResized, _this3.speed));
            };
          } else {
            image.onload = handler;
            image.onerror = function () {
              handler();
              _this3.$emit('lazyLoadError');
            };
          }
        }
      });
    },
    progressiveLazyLoad: function progressiveLazyLoad() {
      var slidesToLoad = [];
      var spec = extends_default()({}, this.$props, this.$data);
      for (var index = this.currentSlide; index < this.slideCount + getPostClones(spec); index++) {
        if (this.lazyLoadedList.indexOf(index) < 0) {
          slidesToLoad.push(index);
          break;
        }
      }
      for (var _index = this.currentSlide - 1; _index >= -getPreClones(spec); _index--) {
        if (this.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }
      if (slidesToLoad.length > 0) {
        this.setState(function (state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });
        this.$emit('lazyLoad', slidesToLoad);
      } else {
        if (this.lazyLoadTimer) {
          clearInterval(this.lazyLoadTimer);
          delete this.lazyLoadTimer;
        }
      }
    },
    slideHandler: function slideHandler(index) {
      var _this4 = this;

      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _$props = this.$props,
          asNavFor = _$props.asNavFor,
          currentSlide = _$props.currentSlide,
          beforeChange = _$props.beforeChange,
          speed = _$props.speed,
          afterChange = _$props.afterChange;

      var _slideHandler2 = innerSliderUtils_slideHandler(extends_default()({
        index: index
      }, this.$props, this.$data, {
        trackRef: this.track,
        useCSS: this.useCSS && !dontAnimate
      })),
          state = _slideHandler2.state,
          nextState = _slideHandler2.nextState;

      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      var slidesToLoad = state.lazyLoadedList.filter(function (value) {
        return _this4.lazyLoadedList.indexOf(value) < 0;
      });
      if (this.$listeners.lazyLoad && slidesToLoad.length > 0) {
        this.$emit('lazyLoad', slidesToLoad);
      }
      this.setState(state, function () {
        asNavFor && asNavFor.innerSlider.currentSlide !== currentSlide && asNavFor.innerSlider.slideHandler(index);
        if (!nextState) return;
        _this4.animationEndCallback = setTimeout(function () {
          var animating = nextState.animating,
              firstBatch = objectWithoutProperties_default()(nextState, ['animating']);

          _this4.setState(firstBatch, function () {
            _this4.callbackTimers.push(setTimeout(function () {
              return _this4.setState({ animating: animating });
            }, 10));
            afterChange && afterChange(state.currentSlide);
            delete _this4.animationEndCallback;
          });
        }, speed);
      });
    },
    changeSlide: function changeSlide(options) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var spec = extends_default()({}, this.$props, this.$data);
      var targetSlide = innerSliderUtils_changeSlide(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;
      if (dontAnimate === true) {
        this.slideHandler(targetSlide, dontAnimate);
      } else {
        this.slideHandler(targetSlide);
      }
    },
    clickHandler: function clickHandler(e) {
      if (this.clickable === false) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.clickable = true;
    },
    keyHandler: function keyHandler(e) {
      var dir = innerSliderUtils_keyHandler(e, this.accessibility, this.rtl);
      dir !== '' && this.changeSlide({ message: dir });
    },
    selectHandler: function selectHandler(options) {
      this.changeSlide(options);
    },
    disableBodyScroll: function disableBodyScroll() {
      var preventDefault = function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      };
      window.ontouchmove = preventDefault;
    },
    enableBodyScroll: function enableBodyScroll() {
      window.ontouchmove = null;
    },
    swipeStart: function swipeStart(e) {
      if (this.verticalSwiping) {
        this.disableBodyScroll();
      }
      var state = innerSliderUtils_swipeStart(e, this.swipe, this.draggable);
      state !== '' && this.setState(state);
    },
    swipeMove: function swipeMove(e) {
      var state = innerSliderUtils_swipeMove(e, extends_default()({}, this.$props, this.$data, {
        trackRef: this.track,
        listRef: this.list,
        slideIndex: this.currentSlide
      }));
      if (!state) return;
      if (state['swiping']) {
        this.clickable = false;
      }
      this.setState(state);
    },
    swipeEnd: function swipeEnd(e) {
      var state = innerSliderUtils_swipeEnd(e, extends_default()({}, this.$props, this.$data, {
        trackRef: this.track,
        listRef: this.list,
        slideIndex: this.currentSlide
      }));
      if (!state) return;
      var triggerSlideHandler = state['triggerSlideHandler'];
      delete state['triggerSlideHandler'];
      this.setState(state);
      if (triggerSlideHandler === undefined) return;
      this.slideHandler(triggerSlideHandler);
      if (this.$props.verticalSwiping) {
        this.enableBodyScroll();
      }
    },
    slickPrev: function slickPrev() {
      var _this5 = this;

      // this and fellow methods are wrapped in setTimeout
      // to make sure initialize setState has happened before
      // any of such methods are called
      this.callbackTimers.push(setTimeout(function () {
        return _this5.changeSlide({ message: 'previous' });
      }, 0));
    },
    slickNext: function slickNext() {
      var _this6 = this;

      this.callbackTimers.push(setTimeout(function () {
        return _this6.changeSlide({ message: 'next' });
      }, 0));
    },
    slickGoTo: function slickGoTo(slide) {
      var _this7 = this;

      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      slide = Number(slide);
      if (isNaN(slide)) return '';
      this.callbackTimers.push(setTimeout(function () {
        return _this7.changeSlide({
          message: 'index',
          index: slide,
          currentSlide: _this7.currentSlide
        }, dontAnimate);
      }, 0));
    },
    play: function play() {
      var nextIndex = void 0;
      if (this.rtl) {
        nextIndex = this.currentSlide - this.slidesToScroll;
      } else {
        if (canGoNext(extends_default()({}, this.$props, this.$data))) {
          nextIndex = this.currentSlide + this.slidesToScroll;
        } else {
          return false;
        }
      }

      this.slideHandler(nextIndex);
    },
    handleAutoPlay: function handleAutoPlay(playType) {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
      }
      var autoplaying = this.autoplaying;
      if (playType === 'update') {
        if (autoplaying === 'hovered' || autoplaying === 'focused' || autoplaying === 'paused') {
          return;
        }
      } else if (playType === 'leave') {
        if (autoplaying === 'paused' || autoplaying === 'focused') {
          return;
        }
      } else if (playType === 'blur') {
        if (autoplaying === 'paused' || autoplaying === 'hovered') {
          return;
        }
      }
      this.autoplayTimer = setInterval(this.play, this.autoplaySpeed + 50);
      this.setState({ autoplaying: 'playing' });
    },
    pause: function pause(pauseType) {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
      var autoplaying = this.autoplaying;
      if (pauseType === 'paused') {
        this.setState({ autoplaying: 'paused' });
      } else if (pauseType === 'focused') {
        if (autoplaying === 'hovered' || autoplaying === 'playing') {
          this.setState({ autoplaying: 'focused' });
        }
      } else {
        // pauseType  is 'hovered'
        if (autoplaying === 'playing') {
          this.setState({ autoplaying: 'hovered' });
        }
      }
    },
    onDotsOver: function onDotsOver() {
      this.autoplay && this.pause('hovered');
    },
    onDotsLeave: function onDotsLeave() {
      this.autoplay && this.autoplaying === 'hovered' && this.handleAutoPlay('leave');
    },
    onTrackOver: function onTrackOver() {
      this.autoplay && this.pause('hovered');
    },
    onTrackLeave: function onTrackLeave() {
      this.autoplay && this.autoplaying === 'hovered' && this.handleAutoPlay('leave');
    },
    onSlideFocus: function onSlideFocus() {
      this.autoplay && this.pause('focused');
    },
    onSlideBlur: function onSlideBlur() {
      this.autoplay && this.autoplaying === 'focused' && this.handleAutoPlay('blur');
    },
    customPaging: function customPaging(_ref) {
      var i = _ref.i;
      var h = this.$createElement;

      return h('button', [i + 1]);
    },
    appendDots: function appendDots(_ref2) {
      var dots = _ref2.dots;
      var h = this.$createElement;

      return h(
        'ul',
        { style: { display: 'block' } },
        [dots]
      );
    }
  },
  beforeMount: function beforeMount() {
    this.ssrInit();
    this.$emit('init');
    if (this.lazyLoad) {
      var slidesToLoad = getOnDemandLazySlides(extends_default()({}, this.$props, this.$data));
      if (slidesToLoad.length > 0) {
        this.setState(function (prevState) {
          return {
            lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
          };
        });
        this.$emit('lazyLoad', slidesToLoad);
      }
    }
  },
  mounted: function mounted() {
    var _this8 = this;

    this.$nextTick(function () {
      var spec = extends_default()({
        listRef: _this8.list,
        trackRef: _this8.track,
        children: _this8.children
      }, _this8.$props);
      _this8.updateState(spec, true, function () {
        _this8.adaptHeight();
        _this8.autoplay && _this8.handleAutoPlay('update');
      });
      if (_this8.lazyLoad === 'progressive') {
        _this8.lazyLoadTimer = setInterval(_this8.progressiveLazyLoad, 1000);
      }
      _this8.ro = new ResizeObserver_es["a" /* default */](function () {
        if (_this8.animating) {
          _this8.onWindowResized(false); // don't set trackStyle hence don't break animation
          _this8.callbackTimers.push(setTimeout(function () {
            return _this8.onWindowResized();
          }, _this8.speed));
        } else {
          _this8.onWindowResized();
        }
      });
      _this8.ro.observe(_this8.list);
      Array.prototype.forEach.call(document.querySelectorAll('.slick-slide'), function (slide) {
        slide.onfocus = _this8.$props.pauseOnFocus ? _this8.onSlideFocus : null;
        slide.onblur = _this8.$props.pauseOnFocus ? _this8.onSlideBlur : null;
      });
      // To support server-side rendering
      if (!window) {
        return;
      }
      if (window.addEventListener) {
        window.addEventListener('resize', _this8.onWindowResized);
      } else {
        window.attachEvent('onresize', _this8.onWindowResized);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.animationEndCallback) {
      clearTimeout(this.animationEndCallback);
    }
    if (this.lazyLoadTimer) {
      clearInterval(this.lazyLoadTimer);
    }
    if (this.callbackTimers.length) {
      this.callbackTimers.forEach(function (timer) {
        return clearTimeout(timer);
      });
      this.callbackTimers = [];
    }
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onWindowResized);
    } else {
      window.detachEvent('onresize', this.onWindowResized);
    }
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  },
  updated: function updated() {
    this.checkImagesLoad();
    this.$emit('reInit');
    if (this.lazyLoad) {
      var slidesToLoad = getOnDemandLazySlides(extends_default()({}, this.$props, this.$data));
      if (slidesToLoad.length > 0) {
        this.setState(function (prevState) {
          return {
            lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
          };
        });
        this.$emit('lazyLoad');
      }
    }
    // if (this.props.onLazyLoad) {
    //   this.props.onLazyLoad([leftMostSlide])
    // }
    this.adaptHeight();
  },

  watch: {
    __propsSymbol__: function __propsSymbol__() {
      var _this9 = this;

      var nextProps = this.$props;
      var spec = extends_default()({
        listRef: this.list,
        trackRef: this.track
      }, nextProps, this.$data);
      var setTrackStyle = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.preProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!nextProps.hasOwnProperty(key)) {
            setTrackStyle = true;
            break;
          }
          if (typeof_default()(nextProps[key]) === 'object' || typeof nextProps[key] === 'function' || typeof_default()(nextProps[key]) === 'symbol') {
            continue;
          }
          if (nextProps[key] !== this.preProps[key]) {
            setTrackStyle = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.updateState(spec, setTrackStyle, function () {
        if (_this9.currentSlide >= nextProps.children.length) {
          _this9.changeSlide({
            message: 'index',
            index: nextProps.children.length - nextProps.slidesToShow,
            currentSlide: _this9.currentSlide
          });
        }
        if (nextProps.autoplay) {
          _this9.handleAutoPlay('update');
        } else {
          _this9.pause('paused');
        }
      });
      this.preProps = extends_default()({}, nextProps);
    }
  },
  render: function render() {
    var h = arguments[0];

    var className = classnames_default()('slick-slider', {
      'slick-vertical': this.vertical,
      'slick-initialized': true
    });
    var spec = extends_default()({}, this.$props, this.$data);
    var trackProps = extractObject(spec, ['fade', 'cssEase', 'speed', 'infinite', 'centerMode', 'focusOnSelect', 'currentSlide', 'lazyLoad', 'lazyLoadedList', 'rtl', 'slideWidth', 'slideHeight', 'listHeight', 'vertical', 'slidesToShow', 'slidesToScroll', 'slideCount', 'trackStyle', 'variableWidth', 'unslick', 'centerPadding']);
    var pauseOnHover = this.$props.pauseOnHover;

    trackProps = {
      props: extends_default()({}, trackProps, {
        focusOnSelect: this.focusOnSelect ? this.selectHandler : null
      }),
      directives: [{
        name: 'ant-ref',
        value: this.trackRefHandler
      }],
      on: {
        mouseenter: pauseOnHover ? this.onTrackOver : inner_slider_noop,
        mouseleave: pauseOnHover ? this.onTrackLeave : inner_slider_noop,
        mouseover: pauseOnHover ? this.onTrackOver : inner_slider_noop
      }
    };

    var dots = void 0;
    if (this.dots === true && this.slideCount >= this.slidesToShow) {
      var dotProps = extractObject(spec, ['dotsClass', 'slideCount', 'slidesToShow', 'currentSlide', 'slidesToScroll', 'clickHandler', 'children', 'infinite', 'appendDots']);
      dotProps.customPaging = this.customPaging;
      dotProps.appendDots = this.appendDots;
      var _$scopedSlots = this.$scopedSlots,
          customPaging = _$scopedSlots.customPaging,
          appendDots = _$scopedSlots.appendDots;

      if (customPaging) {
        dotProps.customPaging = customPaging;
      }
      if (appendDots) {
        dotProps.appendDots = appendDots;
      }
      var pauseOnDotsHover = this.$props.pauseOnDotsHover;

      dotProps = {
        props: extends_default()({}, dotProps, {
          clickHandler: this.changeSlide
        }),
        on: {
          mouseenter: pauseOnDotsHover ? this.onDotsLeave : inner_slider_noop,
          mouseover: pauseOnDotsHover ? this.onDotsOver : inner_slider_noop,
          mouseleave: pauseOnDotsHover ? this.onDotsLeave : inner_slider_noop
        }
      };
      dots = h(src_dots, dotProps);
    }

    var prevArrow = void 0,
        nextArrow = void 0;
    var arrowProps = extractObject(spec, ['infinite', 'centerMode', 'currentSlide', 'slideCount', 'slidesToShow']);
    arrowProps.clickHandler = this.changeSlide;
    var _$scopedSlots2 = this.$scopedSlots,
        prevArrowCustom = _$scopedSlots2.prevArrow,
        nextArrowCustom = _$scopedSlots2.nextArrow;

    if (prevArrowCustom) {
      arrowProps.prevArrow = prevArrowCustom;
    }
    if (nextArrowCustom) {
      arrowProps.nextArrow = nextArrowCustom;
    }
    if (this.arrows) {
      prevArrow = h(PrevArrow, { props: arrowProps });
      nextArrow = h(NextArrow, { props: arrowProps });
    }
    var verticalHeightStyle = null;

    if (this.vertical) {
      verticalHeightStyle = {
        height: typeof this.listHeight === 'number' ? this.listHeight + 'px' : this.listHeight
      };
    }

    var centerPaddingStyle = null;

    if (this.vertical === false) {
      if (this.centerMode === true) {
        centerPaddingStyle = {
          padding: '0px ' + this.centerPadding
        };
      }
    } else {
      if (this.centerMode === true) {
        centerPaddingStyle = {
          padding: this.centerPadding + ' 0px'
        };
      }
    }

    var listStyle = extends_default()({}, verticalHeightStyle, centerPaddingStyle);
    var touchMove = this.touchMove;
    var listProps = {
      directives: [{
        name: 'ant-ref',
        value: this.listRefHandler
      }],
      'class': 'slick-list',
      style: listStyle,
      on: {
        click: this.clickHandler,
        mousedown: touchMove ? this.swipeStart : inner_slider_noop,
        mousemove: this.dragging && touchMove ? this.swipeMove : inner_slider_noop,
        mouseup: touchMove ? this.swipeEnd : inner_slider_noop,
        mouseleave: this.dragging && touchMove ? this.swipeEnd : inner_slider_noop,
        touchstart: touchMove ? this.swipeStart : inner_slider_noop,
        touchmove: this.dragging && touchMove ? this.swipeMove : inner_slider_noop,
        touchend: touchMove ? this.swipeEnd : inner_slider_noop,
        touchcancel: this.dragging && touchMove ? this.swipeEnd : inner_slider_noop,
        keydown: this.accessibility ? this.keyHandler : inner_slider_noop
      }
    };

    var innerSliderProps = {
      'class': className,
      props: {
        dir: 'ltr'
      }
    };

    if (this.unslick) {
      listProps = {
        'class': 'slick-list',
        directives: [{
          name: 'ant-ref',
          value: this.listRefHandler
        }]
      };
      innerSliderProps = { 'class': className };
    }
    return h(
      'div',
      innerSliderProps,
      [!this.unslick ? prevArrow : '', h(
        'div',
        listProps,
        [h(
          track,
          trackProps,
          [this.children]
        )]
      ), !this.unslick ? nextArrow : '', !this.unslick ? dots : '']
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/slider.js










var enquire = canUseDOM() && __webpack_require__("8e95");

vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });

/* harmony default export */ var slider = ({
  props: extends_default()({}, default_props),
  mixins: [BaseMixin["a" /* default */]],
  data: function data() {
    this._responsiveMediaHandlers = [];
    return {
      breakpoint: null
    };
  },

  methods: {
    innerSliderRefHandler: function innerSliderRefHandler(ref) {
      this.innerSlider = ref;
    },
    media: function media(query, handler) {
      // javascript handler for  css media query
      enquire.register(query, handler);
      this._responsiveMediaHandlers.push({ query: query, handler: handler });
    },
    slickPrev: function slickPrev() {
      this.innerSlider.slickPrev();
    },
    slickNext: function slickNext() {
      this.innerSlider.slickNext();
    },
    slickGoTo: function slickGoTo(slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.innerSlider.slickGoTo(slide, dontAnimate);
    },
    slickPause: function slickPause() {
      this.innerSlider.pause('paused');
    },
    slickPlay: function slickPlay() {
      this.innerSlider.handleAutoPlay('play');
    }
  },
  // handles responsive breakpoints
  beforeMount: function beforeMount() {
    var _this = this;

    // performance monitoring
    // if (process.env.NODE_ENV !== 'production') {
    // const { whyDidYouUpdate } = require('why-did-you-update')
    // whyDidYouUpdate(React)
    // }
    if (this.responsive) {
      var breakpoints = this.responsive.map(function (breakpt) {
        return breakpt.breakpoint;
      });
      // sort them in increasing order of their numerical value
      breakpoints.sort(function (x, y) {
        return x - y;
      });

      breakpoints.forEach(function (breakpoint, index) {
        // media query for each breakpoint
        var bQuery = void 0;
        if (index === 0) {
          bQuery = json2mq_default()({ minWidth: 0, maxWidth: breakpoint });
        } else {
          bQuery = json2mq_default()({
            minWidth: breakpoints[index - 1] + 1,
            maxWidth: breakpoint
          });
        }
        // when not using server side rendering
        canUseDOM() && _this.media(bQuery, function () {
          _this.setState({ breakpoint: breakpoint });
        });
      });

      // Register media query for full screen. Need to support resize from small to large
      // convert javascript object to media query string
      var query = json2mq_default()({ minWidth: breakpoints.slice(-1)[0] });

      canUseDOM() && this.media(query, function () {
        _this.setState({ breakpoint: null });
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    this._responsiveMediaHandlers.forEach(function (obj) {
      enquire.unregister(obj.query, obj.handler);
    });
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];

    var settings = void 0;
    var newProps = void 0;
    if (this.breakpoint) {
      newProps = this.responsive.filter(function (resp) {
        return resp.breakpoint === _this2.breakpoint;
      });
      settings = newProps[0].settings === 'unslick' ? 'unslick' : extends_default()({}, this.$props, newProps[0].settings);
    } else {
      settings = extends_default()({}, this.$props);
    }

    // force scrolling by one if centerMode is on
    if (settings.centerMode) {
      if (settings.slidesToScroll > 1 && "production" !== 'production') {
        console.warn('slidesToScroll should be equal to 1 in centerMode, you are using ' + settings.slidesToScroll);
      }
      settings.slidesToScroll = 1;
    }
    // force showing one slide and scrolling by one if the fade mode is on
    if (settings.fade) {
      if (settings.slidesToShow > 1 && "production" !== 'production') {
        console.warn('slidesToShow should be equal to 1 when fade is true, you\'re using ' + settings.slidesToShow);
      }
      if (settings.slidesToScroll > 1 && "production" !== 'production') {
        console.warn('slidesToScroll should be equal to 1 when fade is true, you\'re using ' + settings.slidesToScroll);
      }
      settings.slidesToShow = 1;
      settings.slidesToScroll = 1;
    }

    // makes sure that children is an array, even when there is only 1 child
    var children = this.$slots['default'] || [];

    // Children may contain false or null, so we should filter them
    // children may also contain string filled with spaces (in certain cases where we use jsx strings)
    children = children.filter(function (child) {
      if (typeof child === 'string') {
        return !!child.trim();
      }
      return !!child;
    });

    // rows and slidesPerRow logic is handled here
    if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
      console.warn('variableWidth is not supported in case of rows > 1 or slidesPerRow > 1');
      settings.variableWidth = false;
    }
    var newChildren = [];
    var currentWidth = null;
    for (var i = 0; i < children.length; i += settings.rows * settings.slidesPerRow) {
      var newSlide = [];
      for (var j = i; j < i + settings.rows * settings.slidesPerRow; j += settings.slidesPerRow) {
        var row = [];
        for (var k = j; k < j + settings.slidesPerRow; k += 1) {
          if (settings.variableWidth && Object(props_util["o" /* getStyle */])(children[k])) {
            currentWidth = Object(props_util["o" /* getStyle */])(children[k]).width;
          }
          if (k >= children.length) break;
          row.push(Object(vnode["a" /* cloneElement */])(children[k], {
            key: 100 * i + 10 * j + k,
            attrs: {
              tabIndex: -1
            },
            style: {
              width: 100 / settings.slidesPerRow + '%',
              display: 'inline-block'
            }
          }));
        }
        newSlide.push(h(
          'div',
          { key: 10 * i + j },
          [row]
        ));
      }
      if (settings.variableWidth) {
        newChildren.push(h(
          'div',
          { key: i, style: { width: currentWidth } },
          [newSlide]
        ));
      } else {
        newChildren.push(h(
          'div',
          { key: i },
          [newSlide]
        ));
      }
    }

    if (settings === 'unslick') {
      var className = 'regular slider ' + (this.className || '');
      return h(
        'div',
        { 'class': className },
        [newChildren]
      );
    } else if (newChildren.length <= settings.slidesToShow) {
      settings.unslick = true;
    }
    var sliderProps = {
      props: extends_default()({}, settings, {
        children: newChildren,
        __propsSymbol__: Symbol()
      }),
      on: extends_default()({}, this.$listeners),
      directives: [{
        name: 'ant-ref',
        value: this.innerSliderRefHandler
      }],
      scopedSlots: this.$scopedSlots
    };
    return h(inner_slider, sliderProps);
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-slick/src/index.js
// base react-slick 0.23.2


/* harmony default export */ var src = __webpack_exports__["default"] = (slider);

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~1ce92aa8.a07216ed.js.map