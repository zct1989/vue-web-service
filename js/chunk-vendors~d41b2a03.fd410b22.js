(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~d41b2a03"],{

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

/***/ "2deb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  // Options.jsx
  items_per_page: '/ page',
  jump_to: 'Goto',
  jump_to_confirm: 'confirm',
  page: '',

  // Pagination.jsx
  prev_page: 'Previous Page',
  next_page: 'Next Page',
  prev_5: 'Previous 5 Pages',
  next_5: 'Next 5 Pages',
  prev_3: 'Previous 3 Pages',
  next_3: 'Next 3 Pages'
});

/***/ }),

/***/ "2fcd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/createChainedFunction.js
var createChainedFunction = __webpack_require__("3f50");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/Notice.js





function noop() {}

/* harmony default export */ var Notice = ({
  mixins: [BaseMixin["a" /* default */]],
  props: {
    duration: vue_types["a" /* default */].number.def(1.5),
    closable: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string,
    update: vue_types["a" /* default */].bool,
    closeIcon: vue_types["a" /* default */].any
  },
  watch: {
    duration: function duration() {
      this.restartCloseTimer();
    }
  },

  mounted: function mounted() {
    this.startCloseTimer();
  },
  updated: function updated() {
    if (this.update) {
      this.restartCloseTimer();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clearCloseTimer();
    this.willDestroy = true; // beforeDestroy调用后依然会触发onMouseleave事件
  },

  methods: {
    close: function close(e) {
      if (e) {
        e.stopPropagation();
      }
      this.clearCloseTimer();
      this.__emit('close');
    },
    startCloseTimer: function startCloseTimer() {
      var _this = this;

      this.clearCloseTimer();
      if (!this.willDestroy && this.duration) {
        this.closeTimer = setTimeout(function () {
          _this.close();
        }, this.duration * 1000);
      }
    },
    clearCloseTimer: function clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    restartCloseTimer: function restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    }
  },

  render: function render() {
    var _className;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        closable = this.closable,
        clearCloseTimer = this.clearCloseTimer,
        startCloseTimer = this.startCloseTimer,
        $slots = this.$slots,
        close = this.close,
        $listeners = this.$listeners;

    var componentClass = prefixCls + '-notice';
    var className = (_className = {}, defineProperty_default()(_className, '' + componentClass, 1), defineProperty_default()(_className, componentClass + '-closable', closable), _className);
    var style = Object(props_util["o" /* getStyle */])(this);
    var closeIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'closeIcon');
    return h(
      'div',
      {
        'class': className,
        style: style || { right: '50%' },
        on: {
          'mouseenter': clearCloseTimer,
          'mouseleave': startCloseTimer,
          'click': $listeners.click || noop
        }
      },
      [h(
        'div',
        { 'class': componentClass + '-content' },
        [$slots['default']]
      ), closable ? h(
        'a',
        {
          attrs: { tabIndex: '0' },
          on: {
            'click': close
          },
          'class': componentClass + '-close' },
        [closeIcon || h('span', { 'class': componentClass + '-close-x' })]
      ) : null]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/base/index.js + 1 modules
var base = __webpack_require__("db14");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/Notification.js











function Notification_noop() {}

var seed = 0;
var now = Date.now();

function getUuid() {
  return 'rcNotification_' + now + '_' + seed++;
}

var Notification = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    prefixCls: vue_types["a" /* default */].string.def('rc-notification'),
    transitionName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]).def('fade'),
    maxCount: vue_types["a" /* default */].number,
    closeIcon: vue_types["a" /* default */].any
  },
  data: function data() {
    return {
      notices: []
    };
  },

  methods: {
    getTransitionName: function getTransitionName() {
      var props = this.$props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    },
    add: function add(notice) {
      var key = notice.key = notice.key || getUuid();
      var maxCount = this.$props.maxCount;

      this.setState(function (previousState) {
        var notices = previousState.notices;
        var noticeIndex = notices.map(function (v) {
          return v.key;
        }).indexOf(key);
        var updatedNotices = notices.concat();
        if (noticeIndex !== -1) {
          updatedNotices.splice(noticeIndex, 1, notice);
        } else {
          if (maxCount && notices.length >= maxCount) {
            // XXX, use key of first item to update new added (let React to move exsiting
            // instead of remove and mount). Same key was used before for both a) external
            // manual control and b) internal react 'key' prop , which is not that good.
            notice.updateKey = updatedNotices[0].updateKey || updatedNotices[0].key;
            updatedNotices.shift();
          }
          updatedNotices.push(notice);
        }
        return {
          notices: updatedNotices
        };
      });
    },
    remove: function remove(key) {
      this.setState(function (previousState) {
        return {
          notices: previousState.notices.filter(function (notice) {
            return notice.key !== key;
          })
        };
      });
    }
  },

  render: function render(h) {
    var _this = this;

    var prefixCls = this.prefixCls,
        notices = this.notices,
        remove = this.remove,
        getTransitionName = this.getTransitionName;

    var transitionProps = Object(getTransitionProps["a" /* default */])(getTransitionName());
    var noticeNodes = notices.map(function (notice, index) {
      var update = Boolean(index === notices.length - 1 && notice.updateKey);
      var key = notice.updateKey ? notice.updateKey : notice.key;

      var content = notice.content,
          duration = notice.duration,
          closable = notice.closable,
          onClose = notice.onClose,
          style = notice.style,
          className = notice['class'];

      var close = Object(createChainedFunction["a" /* default */])(remove.bind(_this, notice.key), onClose);
      var noticeProps = {
        props: {
          prefixCls: prefixCls,
          duration: duration,
          closable: closable,
          update: update,
          closeIcon: Object(props_util["g" /* getComponentFromProp */])(_this, 'closeIcon')
        },
        on: {
          close: close,
          click: notice.onClick || Notification_noop
        },
        style: style,
        'class': className,
        key: key
      };
      return h(
        Notice,
        noticeProps,
        [typeof content === 'function' ? content(h) : content]
      );
    });
    var className = defineProperty_default()({}, prefixCls, 1);
    var style = Object(props_util["o" /* getStyle */])(this);
    return h(
      'div',
      {
        'class': className,
        style: style || {
          top: '65px',
          left: '50%'
        }
      },
      [h(
        'transition-group',
        transitionProps,
        [noticeNodes]
      )]
    );
  }
};

Notification.newInstance = function newNotificationInstance(properties, callback) {
  var _ref = properties || {},
      getContainer = _ref.getContainer,
      style = _ref.style,
      className = _ref['class'],
      props = objectWithoutProperties_default()(_ref, ['getContainer', 'style', 'class']);

  var div = document.createElement('div');
  if (getContainer) {
    var root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  var V = base["a" /* default */].Vue || vue_runtime_esm["a" /* default */];
  new V({
    el: div,
    mounted: function mounted() {
      var self = this;
      this.$nextTick(function () {
        callback({
          notice: function notice(noticeProps) {
            self.$refs.notification.add(noticeProps);
          },
          removeNotice: function removeNotice(key) {
            self.$refs.notification.remove(key);
          },

          component: self,
          destroy: function destroy() {
            self.$destroy();
            self.$el.parentNode.removeChild(self.$el);
          }
        });
      });
    },
    render: function render() {
      var h = arguments[0];

      var p = {
        props: props,
        ref: 'notification',
        style: style,
        'class': className
      };
      return h(Notification, p);
    }
  });
};

/* harmony default export */ var vc_notification_Notification = (Notification);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-notification/index.js
// based on rc-notification 3.3.1

/* harmony default export */ var vc_notification = __webpack_exports__["a"] = (vc_notification_Notification);

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

/***/ "43a6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/component-classes/index.js
var component_classes = __webpack_require__("3c55");
var component_classes_default = /*#__PURE__*/__webpack_require__.n(component_classes);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/MenuItem.js
var MenuItem = __webpack_require__("528d");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/MenuItemGroup.js
var MenuItemGroup = __webpack_require__("4a15");

// EXTERNAL MODULE: ./node_modules/warning/browser.js
var browser = __webpack_require__("e834");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-select/Option.js
var Option = __webpack_require__("d4b2");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-select/OptGroup.js
var OptGroup = __webpack_require__("a615");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/proxyComponent.js
var proxyComponent = __webpack_require__("58c1");

// EXTERNAL MODULE: ./node_modules/vue-ref/index.js
var vue_ref = __webpack_require__("46cf");
var vue_ref_default = /*#__PURE__*/__webpack_require__.n(vue_ref);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js + 5 modules
var vc_trigger = __webpack_require__("8496");

// EXTERNAL MODULE: ./node_modules/raf/index.js
var raf = __webpack_require__("c449");
var raf_default = /*#__PURE__*/__webpack_require__.n(raf);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/index.js + 1 modules
var vc_menu = __webpack_require__("da30");

// EXTERNAL MODULE: ./node_modules/dom-scroll-into-view/lib/index.js
var lib = __webpack_require__("f43a");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-select/util.js




function toTitle(title) {
  if (typeof title === 'string') {
    return title.trim();
  }
  return '';
}
function getValuePropValue(child) {
  if (!child) {
    return null;
  }
  var props = Object(props_util["k" /* getPropsData */])(child);
  if ('value' in props) {
    return props.value;
  }
  if (Object(props_util["i" /* getKey */])(child) !== undefined) {
    return Object(props_util["i" /* getKey */])(child);
  }
  if (Object(props_util["m" /* getSlotOptions */])(child).isSelectOptGroup) {
    var label = Object(props_util["g" /* getComponentFromProp */])(child, 'label');
    if (label) {
      return label;
    }
  }
  throw new Error('Need at least a key or a value or a label (only for OptGroup) for ' + child);
}

function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  if (prop === 'children') {
    var newChild = child.$slots ? Object(vnode["b" /* cloneVNodes */])(child.$slots['default'], true) : Object(vnode["b" /* cloneVNodes */])(child.componentOptions.children, true);
    if (newChild.length === 1 && !newChild[0].tag) {
      return newChild[0].text;
    }
    return newChild;
  }
  var data = Object(props_util["k" /* getPropsData */])(child);
  if (prop in data) {
    return data[prop];
  } else {
    return Object(props_util["e" /* getAttrs */])(child)[prop];
  }
}

function isMultiple(props) {
  return props.multiple;
}

function isCombobox(props) {
  return props.combobox;
}

function isMultipleOrTags(props) {
  return props.multiple || props.tags;
}

function isMultipleOrTagsOrCombobox(props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

function toArray(value) {
  var ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

function getMapKey(value) {
  return (typeof value === 'undefined' ? 'undefined' : typeof_default()(value)) + '-' + value;
}

function preventDefaultEvent(e) {
  e.preventDefault();
}

function findIndexInValueBySingleValue(value, singleValue) {
  var index = -1;
  if (value) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === singleValue) {
        index = i;
        break;
      }
    }
  }
  return index;
}

function getLabelFromPropsValue(value, key) {
  var label = void 0;
  value = toArray(value);
  if (value) {
    for (var i = 0; i < value.length; i++) {
      if (value[i].key === key) {
        label = value[i].label;
        break;
      }
    }
  }
  return label;
}

function getSelectKeys(menuItems, value) {
  if (value === null || value === undefined) {
    return [];
  }
  var selectedKeys = [];
  menuItems.forEach(function (item) {
    if (Object(props_util["m" /* getSlotOptions */])(item).isMenuItemGroup) {
      selectedKeys = selectedKeys.concat(getSelectKeys(item.componentOptions.children, value));
    } else {
      var itemValue = getValuePropValue(item);
      var itemKey = item.key;
      if (findIndexInValueBySingleValue(value, itemValue) !== -1 && itemKey !== undefined) {
        selectedKeys.push(itemKey);
      }
    }
  });
  return selectedKeys;
}

var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};

var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'on'
};

function findFirstMenuItem(children) {
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var props = Object(props_util["k" /* getPropsData */])(child);
    if (Object(props_util["m" /* getSlotOptions */])(child).isMenuItemGroup) {
      var found = findFirstMenuItem(child.componentOptions.children);
      if (found) {
        return found;
      }
    } else if (!props.disabled) {
      return child;
    }
  }
  return null;
}

function includesSeparators(str, separators) {
  for (var i = 0; i < separators.length; ++i) {
    if (str.lastIndexOf(separators[i]) > 0) {
      return true;
    }
  }
  return false;
}

function splitBySeparators(str, separators) {
  var reg = new RegExp('[' + separators.join() + ']');
  return str.split(reg).filter(function (token) {
    return token;
  });
}

function defaultFilterFn(input, child) {
  var props = Object(props_util["k" /* getPropsData */])(child);
  if (props.disabled) {
    return false;
  }
  var value = getPropValue(child, this.optionFilterProp);
  if (value.length && value[0].text) {
    value = value[0].text;
  } else {
    value = String(value);
  }
  return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}

function validateOptionValue(value, props) {
  if (isSingleMode(props) || isMultiple(props)) {
    return;
  }
  if (typeof value !== 'string') {
    throw new Error('Invalid `value` of type `' + (typeof value === 'undefined' ? 'undefined' : typeof_default()(value)) + '` supplied to Option, ' + 'expected `string` when `tags/combobox` is `true`.');
  }
}

function saveRef(instance, name) {
  return function (node) {
    instance[name] = node;
  };
}

function generateUUID() {
  if (false) {}
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-select/DropdownMenu.js










/* harmony default export */ var DropdownMenu = ({
  name: 'DropdownMenu',
  mixins: [BaseMixin["a" /* default */]],
  props: {
    ariaId: vue_types["a" /* default */].string,
    defaultActiveFirstOption: vue_types["a" /* default */].bool,
    value: vue_types["a" /* default */].any,
    dropdownMenuStyle: vue_types["a" /* default */].object,
    multiple: vue_types["a" /* default */].bool,
    // onPopupFocus: PropTypes.func,
    // onPopupScroll: PropTypes.func,
    // onMenuDeSelect: PropTypes.func,
    // onMenuSelect: PropTypes.func,
    prefixCls: vue_types["a" /* default */].string,
    menuItems: vue_types["a" /* default */].any,
    inputValue: vue_types["a" /* default */].string,
    visible: vue_types["a" /* default */].bool,
    backfillValue: vue_types["a" /* default */].any,
    firstActiveValue: vue_types["a" /* default */].string,
    menuItemSelectedIcon: vue_types["a" /* default */].any
  },
  watch: {
    visible: function visible(val) {
      if (!val) {
        this.lastVisible = val;
      }
    }
  },

  created: function created() {
    this.rafInstance = { cancel: function cancel() {
        return null;
      } };
    this.lastInputValue = this.$props.inputValue;
    this.lastVisible = false;
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.scrollActiveItemToView();
    });
    this.lastVisible = this.$props.visible;
  },
  updated: function updated() {
    var _this2 = this;

    var props = this.$props;
    if (!this.prevVisible && props.visible) {
      this.$nextTick(function () {
        _this2.scrollActiveItemToView();
      });
    }
    this.lastVisible = props.visible;
    this.lastInputValue = props.inputValue;
    this.prevVisible = this.visible;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.rafInstance && this.rafInstance.cancel) {
      this.rafInstance.cancel();
    }
  },

  methods: {
    scrollActiveItemToView: function scrollActiveItemToView() {
      var _this3 = this;

      // scroll into view
      var itemComponent = this.firstActiveItem && this.firstActiveItem.$el;
      var props = this.$props;
      var value = props.value,
          visible = props.visible,
          firstActiveValue = props.firstActiveValue;

      if (!itemComponent || !visible) {
        return;
      }
      var scrollIntoViewOpts = {
        onlyScrollIfNeeded: true
      };
      if ((!value || value.length === 0) && firstActiveValue) {
        scrollIntoViewOpts.alignWithTop = true;
      }
      // Delay to scroll since current frame item position is not ready when pre view is by filter
      // https://github.com/ant-design/ant-design/issues/11268#issuecomment-406634462
      this.rafInstance = raf_default()(function () {
        lib_default()(itemComponent, _this3.$refs.menuRef.$el, scrollIntoViewOpts);
      });
    },
    renderMenu: function renderMenu() {
      var _this4 = this;

      var h = this.$createElement;

      var props = this.$props;
      var menuItems = props.menuItems,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          value = props.value,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          inputValue = props.inputValue,
          firstActiveValue = props.firstActiveValue,
          dropdownMenuStyle = props.dropdownMenuStyle,
          backfillValue = props.backfillValue,
          visible = props.visible;

      var menuItemSelectedIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'menuItemSelectedIcon');
      var _$listeners = this.$listeners,
          menuDeselect = _$listeners.menuDeselect,
          menuSelect = _$listeners.menuSelect,
          popupScroll = _$listeners.popupScroll;

      if (menuItems && menuItems.length) {
        var selectedKeys = getSelectKeys(menuItems, value);
        var menuProps = {
          props: {
            multiple: multiple,
            itemIcon: multiple ? menuItemSelectedIcon : null,
            selectedKeys: selectedKeys,
            prefixCls: prefixCls + '-menu'
          },
          on: {},
          style: dropdownMenuStyle,
          ref: 'menuRef',
          attrs: {
            role: 'listbox'
          }
        };
        if (popupScroll) {
          menuProps.on.scroll = popupScroll;
        }
        if (multiple) {
          menuProps.on.deselect = menuDeselect;
          menuProps.on.select = menuSelect;
        } else {
          menuProps.on.click = menuSelect;
        }
        var activeKeyProps = {};

        var defaultActiveFirst = defaultActiveFirstOption;
        var clonedMenuItems = menuItems;
        if (selectedKeys.length || firstActiveValue) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
          } else if (!visible) {
            // Do not trigger auto active since we already have selectedKeys
            if (selectedKeys[0]) {
              defaultActiveFirst = false;
            }
            activeKeyProps.activeKey = undefined;
          }
          var foundFirst = false;
          // set firstActiveItem via cloning menus
          // for scroll into view
          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
              foundFirst = true;
              return Object(vnode["a" /* cloneElement */])(item, {
                directives: [{
                  name: 'ant-ref',
                  value: function value(ref) {
                    _this4.firstActiveItem = ref;
                  }
                }]
              });
            }
            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (Object(props_util["m" /* getSlotOptions */])(item).isMenuItemGroup) {
              var children = item.componentOptions.children.map(clone);
              return Object(vnode["a" /* cloneElement */])(item, { children: children });
            }
            return clone(item);
          });
        } else {
          // Clear firstActiveItem when dropdown menu items was empty
          // Avoid `Unable to find node on an unmounted component`
          // https://github.com/ant-design/ant-design/issues/10774
          this.firstActiveItem = null;
        }

        // clear activeKey when inputValue change
        var lastValue = value && value[value.length - 1];
        if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
          activeKeyProps.activeKey = '';
        }
        menuProps.props = extends_default()({}, activeKeyProps, menuProps.props, { defaultActiveFirst: defaultActiveFirst });
        return h(
          vc_menu["a" /* default */],
          menuProps,
          [clonedMenuItems]
        );
      }
      return null;
    }
  },
  render: function render() {
    var h = arguments[0];

    var renderMenu = this.renderMenu();
    var _$listeners2 = this.$listeners,
        popupFocus = _$listeners2.popupFocus,
        popupScroll = _$listeners2.popupScroll;

    return renderMenu ? h(
      'div',
      {
        style: {
          overflow: 'auto',
          transform: 'translateZ(0)'
        },
        attrs: { id: this.$props.ariaId,
          tabIndex: '-1'
        },
        on: {
          'focus': popupFocus,
          'mousedown': preventDefaultEvent,
          'scroll': popupScroll
        },

        ref: 'menuContainer'
      },
      [renderMenu]
    ) : null;
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-select/SelectTrigger.js









var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

/* harmony default export */ var SelectTrigger = ({
  name: 'SelectTrigger',
  mixins: [BaseMixin["a" /* default */]],
  props: {
    // onPopupFocus: PropTypes.func,
    // onPopupScroll: PropTypes.func,
    dropdownMatchSelectWidth: vue_types["a" /* default */].bool,
    defaultActiveFirstOption: vue_types["a" /* default */].bool,
    dropdownAlign: vue_types["a" /* default */].object,
    visible: vue_types["a" /* default */].bool,
    disabled: vue_types["a" /* default */].bool,
    showSearch: vue_types["a" /* default */].bool,
    dropdownClassName: vue_types["a" /* default */].string,
    dropdownStyle: vue_types["a" /* default */].object,
    dropdownMenuStyle: vue_types["a" /* default */].object,
    multiple: vue_types["a" /* default */].bool,
    inputValue: vue_types["a" /* default */].string,
    filterOption: vue_types["a" /* default */].any,
    empty: vue_types["a" /* default */].bool,
    options: vue_types["a" /* default */].any,
    prefixCls: vue_types["a" /* default */].string,
    popupClassName: vue_types["a" /* default */].string,
    value: vue_types["a" /* default */].array,
    // children: PropTypes.any,
    showAction: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string),
    combobox: vue_types["a" /* default */].bool,
    animation: vue_types["a" /* default */].string,
    transitionName: vue_types["a" /* default */].string,
    getPopupContainer: vue_types["a" /* default */].func,
    backfillValue: vue_types["a" /* default */].any,
    menuItemSelectedIcon: vue_types["a" /* default */].any,
    dropdownRender: vue_types["a" /* default */].func,
    ariaId: vue_types["a" /* default */].string
  },
  data: function data() {
    return {
      dropdownWidth: 0
    };
  },
  created: function created() {
    this.saveDropdownMenuRef = saveRef(this, 'dropdownMenuRef');
    this.saveTriggerRef = saveRef(this, 'triggerRef');
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.setDropdownWidth();
    });
  },
  updated: function updated() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.setDropdownWidth();
    });
  },

  methods: {
    setDropdownWidth: function setDropdownWidth() {
      var width = this.$el.offsetWidth;
      if (width !== this.dropdownWidth) {
        this.setState({ dropdownWidth: width });
      }
    },
    getInnerMenu: function getInnerMenu() {
      return this.dropdownMenuRef && this.dropdownMenuRef.$refs.menuRef;
    },
    getPopupDOMNode: function getPopupDOMNode() {
      return this.triggerRef.getPopupDomNode();
    },
    getDropdownElement: function getDropdownElement(newProps) {
      var h = this.$createElement;
      var value = this.value,
          firstActiveValue = this.firstActiveValue,
          defaultActiveFirstOption = this.defaultActiveFirstOption,
          dropdownMenuStyle = this.dropdownMenuStyle,
          getDropdownPrefixCls = this.getDropdownPrefixCls,
          backfillValue = this.backfillValue,
          menuItemSelectedIcon = this.menuItemSelectedIcon;
      var _$listeners = this.$listeners,
          menuSelect = _$listeners.menuSelect,
          menuDeselect = _$listeners.menuDeselect,
          popupScroll = _$listeners.popupScroll;

      var props = this.$props;

      var dropdownRender = props.dropdownRender,
          ariaId = props.ariaId;

      var dropdownMenuProps = {
        props: extends_default()({}, newProps.props, {
          ariaId: ariaId,
          prefixCls: getDropdownPrefixCls(),
          value: value,
          firstActiveValue: firstActiveValue,
          defaultActiveFirstOption: defaultActiveFirstOption,
          dropdownMenuStyle: dropdownMenuStyle,
          backfillValue: backfillValue,
          menuItemSelectedIcon: menuItemSelectedIcon
        }),
        on: extends_default()({}, newProps.on, {
          menuSelect: menuSelect,
          menuDeselect: menuDeselect,
          popupScroll: popupScroll
        }),
        directives: [{
          name: 'ant-ref',
          value: this.saveDropdownMenuRef
        }]
      };
      var menuNode = h(DropdownMenu, dropdownMenuProps);

      if (dropdownRender) {
        return dropdownRender(menuNode, props);
      }
      return null;
    },
    getDropdownTransitionName: function getDropdownTransitionName() {
      var props = this.$props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
      }
      return transitionName;
    },
    getDropdownPrefixCls: function getDropdownPrefixCls() {
      return this.prefixCls + '-dropdown';
    }
  },

  render: function render() {
    var _popupClassName;

    var h = arguments[0];
    var $props = this.$props,
        $slots = this.$slots,
        $listeners = this.$listeners;
    var multiple = $props.multiple,
        visible = $props.visible,
        inputValue = $props.inputValue,
        dropdownAlign = $props.dropdownAlign,
        disabled = $props.disabled,
        showSearch = $props.showSearch,
        dropdownClassName = $props.dropdownClassName,
        dropdownStyle = $props.dropdownStyle,
        dropdownMatchSelectWidth = $props.dropdownMatchSelectWidth,
        options = $props.options,
        getPopupContainer = $props.getPopupContainer,
        showAction = $props.showAction,
        empty = $props.empty;
    var mouseenter = $listeners.mouseenter,
        mouseleave = $listeners.mouseleave,
        popupFocus = $listeners.popupFocus,
        dropdownVisibleChange = $listeners.dropdownVisibleChange;

    var dropdownPrefixCls = this.getDropdownPrefixCls();
    var popupClassName = (_popupClassName = {}, defineProperty_default()(_popupClassName, dropdownClassName, !!dropdownClassName), defineProperty_default()(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), defineProperty_default()(_popupClassName, dropdownPrefixCls + '--empty', empty), _popupClassName);
    var popupElement = this.getDropdownElement({
      props: {
        menuItems: options,
        multiple: multiple,
        inputValue: inputValue,
        visible: visible
      },
      on: {
        popupFocus: popupFocus
      }
    });
    var hideAction = void 0;
    if (disabled) {
      hideAction = [];
    } else if (isSingleMode($props) && !showSearch) {
      hideAction = ['click'];
    } else {
      hideAction = ['blur'];
    }
    var popupStyle = extends_default()({}, dropdownStyle);
    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    if (this.dropdownWidth) {
      popupStyle[widthProp] = this.dropdownWidth + 'px';
    }
    var triggerProps = {
      props: extends_default()({}, $props, {
        showAction: disabled ? [] : showAction,
        hideAction: hideAction,
        ref: 'triggerRef',
        popupPlacement: 'bottomLeft',
        builtinPlacements: BUILT_IN_PLACEMENTS,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        popupAlign: dropdownAlign,
        popupVisible: visible,
        getPopupContainer: getPopupContainer,
        popupClassName: classnames_default()(popupClassName),
        popupStyle: popupStyle
      }),
      on: {
        popupVisibleChange: dropdownVisibleChange
      },
      directives: [{
        name: 'ant-ref',
        value: this.saveTriggerRef
      }]
    };
    if (mouseenter) {
      triggerProps.on.mouseenter = mouseenter;
    }
    if (mouseleave) {
      triggerProps.on.mouseleave = mouseleave;
    }
    return h(
      vc_trigger["a" /* default */],
      triggerProps,
      [$slots['default'], h(
        'template',
        { slot: 'popup' },
        [popupElement]
      )]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-select/PropTypes.js


var SelectPropTypes = {
  defaultActiveFirstOption: vue_types["a" /* default */].bool,
  multiple: vue_types["a" /* default */].bool,
  filterOption: vue_types["a" /* default */].any,
  // children: PropTypes.any,
  showSearch: vue_types["a" /* default */].bool,
  disabled: vue_types["a" /* default */].bool,
  allowClear: vue_types["a" /* default */].bool,
  showArrow: vue_types["a" /* default */].bool,
  tags: vue_types["a" /* default */].bool,
  prefixCls: vue_types["a" /* default */].string,
  // className: PropTypes.string,
  transitionName: vue_types["a" /* default */].string,
  optionLabelProp: vue_types["a" /* default */].string,
  optionFilterProp: vue_types["a" /* default */].string,
  animation: vue_types["a" /* default */].string,
  choiceTransitionName: vue_types["a" /* default */].string,
  open: vue_types["a" /* default */].bool,
  defaultOpen: vue_types["a" /* default */].bool,
  // onChange: PropTypes.func,
  // onBlur: PropTypes.func,
  // onFocus: PropTypes.func,
  // onSelect: PropTypes.func,
  // onSearch: PropTypes.func,
  // onPopupScroll: PropTypes.func,
  // onMouseEnter: PropTypes.func,
  // onMouseLeave: PropTypes.func,
  // onInputKeyDown: PropTypes.func,
  placeholder: vue_types["a" /* default */].any,
  // onDeselect: PropTypes.func,
  labelInValue: vue_types["a" /* default */].bool,
  loading: vue_types["a" /* default */].bool,
  value: vue_types["a" /* default */].any,
  defaultValue: vue_types["a" /* default */].any,
  dropdownStyle: vue_types["a" /* default */].object,
  dropdownClassName: vue_types["a" /* default */].string,
  maxTagTextLength: vue_types["a" /* default */].number,
  maxTagCount: vue_types["a" /* default */].number,
  maxTagPlaceholder: vue_types["a" /* default */].any,
  tokenSeparators: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string),
  getInputElement: vue_types["a" /* default */].func,
  showAction: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string),
  autoFocus: vue_types["a" /* default */].bool,
  getPopupContainer: vue_types["a" /* default */].func,
  clearIcon: vue_types["a" /* default */].any,
  inputIcon: vue_types["a" /* default */].any,
  removeIcon: vue_types["a" /* default */].any,
  menuItemSelectedIcon: vue_types["a" /* default */].any,
  dropdownRender: vue_types["a" /* default */].func,
  mode: vue_types["a" /* default */].oneOf(['multiple', 'tags']),
  backfill: vue_types["a" /* default */].bool,
  dropdownAlign: vue_types["a" /* default */].any,
  dropdownMatchSelectWidth: vue_types["a" /* default */].bool,
  dropdownMenuStyle: vue_types["a" /* default */].object,
  notFoundContent: vue_types["a" /* default */].oneOfType([String, Number]),
  tabIndex: vue_types["a" /* default */].oneOfType([String, Number])
};
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/contains.js
var contains = __webpack_require__("705c");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/env.js
var env = __webpack_require__("81a7");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-select/Select.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Select; });
























vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });
var SELECT_EMPTY_VALUE_KEY = 'RC_SELECT_EMPTY_VALUE_KEY';

var noop = function noop() {
  return null;
};

function chaining() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // eslint-disable-line
    // eslint-disable-line
    for (var i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        fns[i].apply(chaining, args);
      }
    }
  };
}
var Select = {
  inheritAttrs: false,
  Option: Option["a" /* default */],
  OptGroup: OptGroup["a" /* default */],
  name: 'Select',
  mixins: [BaseMixin["a" /* default */]],
  props: extends_default()({}, SelectPropTypes, {
    prefixCls: SelectPropTypes.prefixCls.def('rc-select'),
    defaultOpen: vue_types["a" /* default */].bool.def(false),
    labelInValue: SelectPropTypes.labelInValue.def(false),
    defaultActiveFirstOption: SelectPropTypes.defaultActiveFirstOption.def(true),
    showSearch: SelectPropTypes.showSearch.def(true),
    allowClear: SelectPropTypes.allowClear.def(false),
    placeholder: SelectPropTypes.placeholder.def(''),
    // showArrow: SelectPropTypes.showArrow.def(true),
    dropdownMatchSelectWidth: vue_types["a" /* default */].bool.def(true),
    dropdownStyle: SelectPropTypes.dropdownStyle.def({}),
    dropdownMenuStyle: vue_types["a" /* default */].object.def({}),
    optionFilterProp: SelectPropTypes.optionFilterProp.def('value'),
    optionLabelProp: SelectPropTypes.optionLabelProp.def('value'),
    notFoundContent: vue_types["a" /* default */].any.def('Not Found'),
    backfill: vue_types["a" /* default */].bool.def(false),
    showAction: SelectPropTypes.showAction.def(['click']),
    combobox: vue_types["a" /* default */].bool.def(false),
    tokenSeparators: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string).def([]),
    autoClearSearchValue: vue_types["a" /* default */].bool.def(true),
    tabIndex: vue_types["a" /* default */].any.def(0),
    dropdownRender: vue_types["a" /* default */].func.def(function (menu) {
      return menu;
    })
    // onChange: noop,
    // onFocus: noop,
    // onBlur: noop,
    // onSelect: noop,
    // onSearch: noop,
    // onDeselect: noop,
    // onInputKeydown: noop,
  }),
  model: {
    prop: 'value',
    event: 'change'
  },
  created: function created() {
    this.saveInputRef = saveRef(this, 'inputRef');
    this.saveInputMirrorRef = saveRef(this, 'inputMirrorRef');
    this.saveTopCtrlRef = saveRef(this, 'topCtrlRef');
    this.saveSelectTriggerRef = saveRef(this, 'selectTriggerRef');
    this.saveRootRef = saveRef(this, 'rootRef');
    this.saveSelectionRef = saveRef(this, 'selectionRef');
    this._focused = false;
    this._mouseDown = false;
    this._options = [];
    this._empty = false;
  },
  data: function data() {
    var props = Object(props_util["j" /* getOptionProps */])(this);
    var optionsInfo = this.getOptionsInfoFromProps(props);
    browser_default()(this.__propsSymbol__, 'Replace slots.default with props.children and pass props.__propsSymbol__');
    var state = {
      _value: this.getValueFromProps(props, true), // true: use default value
      _inputValue: props.combobox ? this.getInputValueForCombobox(props, optionsInfo, true // use default value
      ) : '',
      _open: props.defaultOpen,
      _optionsInfo: optionsInfo,
      _backfillValue: '',
      // a flag for aviod redundant getOptionsInfoFromProps call
      _skipBuildOptionsInfo: true,
      _ariaId: generateUUID()
    };
    return extends_default()({}, state, {
      _mirrorInputValue: state._inputValue }, this.getDerivedStateFromProps(props, state));
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      // when defaultOpen is true, we should auto focus search input
      // https://github.com/ant-design/ant-design/issues/14254
      if (_this.autoFocus || _this._open) {
        _this.focus();
      }
      // this.setState({
      //   _ariaId: generateUUID(),
      // });
    });
  },

  watch: {
    __propsSymbol__: function __propsSymbol__() {
      extends_default()(this.$data, this.getDerivedStateFromProps(Object(props_util["j" /* getOptionProps */])(this), this.$data));
    },

    '$data._inputValue': function $data_inputValue(val) {
      this.$data._mirrorInputValue = val;
    }
  },
  updated: function updated() {
    var _this2 = this;

    this.$nextTick(function () {
      if (isMultipleOrTags(_this2.$props)) {
        var inputNode = _this2.getInputDOMNode();
        var mirrorNode = _this2.getInputMirrorDOMNode();
        if (inputNode && inputNode.value && mirrorNode) {
          inputNode.style.width = '';
          inputNode.style.width = mirrorNode.clientWidth + 10 + 'px';
        } else if (inputNode) {
          inputNode.style.width = '';
        }
      }
      _this2.forcePopupAlign();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.clearFocusTime();
    this.clearBlurTime();
    if (this.dropdownContainer) {
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  },

  methods: {
    getDerivedStateFromProps: function getDerivedStateFromProps(nextProps, prevState) {
      var optionsInfo = prevState._skipBuildOptionsInfo ? prevState._optionsInfo : this.getOptionsInfoFromProps(nextProps, prevState);

      var newState = {
        _optionsInfo: optionsInfo,
        _skipBuildOptionsInfo: false
      };

      if ('open' in nextProps) {
        newState._open = nextProps.open;
      }

      if ('value' in nextProps) {
        var value = this.getValueFromProps(nextProps);
        newState._value = value;
        if (nextProps.combobox) {
          newState._inputValue = this.getInputValueForCombobox(nextProps, optionsInfo);
        }
      }
      return newState;
    },
    getOptionsFromChildren: function getOptionsFromChildren() {
      var _this3 = this;

      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      children.forEach(function (child) {
        if (!child.data || child.data.slot !== undefined) {
          return;
        }
        if (Object(props_util["m" /* getSlotOptions */])(child).isSelectOptGroup) {
          _this3.getOptionsFromChildren(child.componentOptions.children, options);
        } else {
          options.push(child);
        }
      });
      return options;
    },
    getInputValueForCombobox: function getInputValueForCombobox(props, optionsInfo, useDefaultValue) {
      var value = [];
      if ('value' in props && !useDefaultValue) {
        value = toArray(props.value);
      }
      if ('defaultValue' in props && useDefaultValue) {
        value = toArray(props.defaultValue);
      }
      if (value.length) {
        value = value[0];
      } else {
        return '';
      }
      var label = value;
      if (props.labelInValue) {
        label = value.label;
      } else if (optionsInfo[getMapKey(value)]) {
        label = optionsInfo[getMapKey(value)].label;
      }
      if (label === undefined) {
        label = '';
      }
      return label;
    },
    getLabelFromOption: function getLabelFromOption(props, option) {
      return getPropValue(option, props.optionLabelProp);
    },
    getOptionsInfoFromProps: function getOptionsInfoFromProps(props, preState) {
      var _this4 = this;

      var options = this.getOptionsFromChildren(this.$props.children);
      var optionsInfo = {};
      options.forEach(function (option) {
        var singleValue = getValuePropValue(option);
        optionsInfo[getMapKey(singleValue)] = {
          option: option,
          value: singleValue,
          label: _this4.getLabelFromOption(props, option),
          title: Object(props_util["p" /* getValueByProp */])(option, 'title'),
          disabled: Object(props_util["p" /* getValueByProp */])(option, 'disabled')
        };
      });
      if (preState) {
        // keep option info in pre state value.
        var oldOptionsInfo = preState._optionsInfo;
        var value = preState._value;
        if (value) {
          value.forEach(function (v) {
            var key = getMapKey(v);
            if (!optionsInfo[key] && oldOptionsInfo[key] !== undefined) {
              optionsInfo[key] = oldOptionsInfo[key];
            }
          });
        }
      }
      return optionsInfo;
    },
    getValueFromProps: function getValueFromProps(props, useDefaultValue) {
      var value = [];
      if ('value' in props && !useDefaultValue) {
        value = toArray(props.value);
      }
      if ('defaultValue' in props && useDefaultValue) {
        value = toArray(props.defaultValue);
      }
      if (props.labelInValue) {
        value = value.map(function (v) {
          return v.key;
        });
      }
      return value;
    },
    onInputChange: function onInputChange(e) {
      var _e$target = e.target,
          val = _e$target.value,
          composing = _e$target.composing;

      var _$data$_inputValue = this.$data._inputValue,
          _inputValue = _$data$_inputValue === undefined ? '' : _$data$_inputValue;

      if (composing || _inputValue === val) {
        this.setState({
          _mirrorInputValue: val
        });
        return;
      }
      var tokenSeparators = this.$props.tokenSeparators;

      if (isMultipleOrTags(this.$props) && tokenSeparators.length && includesSeparators(val, tokenSeparators)) {
        var nextValue = this.getValueByInput(val);
        if (nextValue !== undefined) {
          this.fireChange(nextValue);
        }
        this.setOpenState(false, true);
        this.setInputValue('', false);
        return;
      }
      this.setInputValue(val);
      this.setState({
        _open: true
      });
      if (isCombobox(this.$props)) {
        this.fireChange([val]);
      }
    },
    onDropdownVisibleChange: function onDropdownVisibleChange(open) {
      if (open && !this._focused) {
        this.clearBlurTime();
        this.timeoutFocus();
        this._focused = true;
        this.updateFocusClassName();
      }
      this.setOpenState(open);
    },


    // combobox ignore
    onKeyDown: function onKeyDown(event) {
      var open = this.$data._open;
      var disabled = this.$props.disabled;

      if (disabled) {
        return;
      }
      var keyCode = event.keyCode;
      if (open && !this.getInputDOMNode()) {
        this.onInputKeydown(event);
      } else if (keyCode === KeyCode["a" /* default */].ENTER || keyCode === KeyCode["a" /* default */].DOWN) {
        // vue state是同步更新，onKeyDown在onMenuSelect后会再次调用，单选时不在调用setOpenState
        // https://github.com/vueComponent/ant-design-vue/issues/1142
        if (keyCode === KeyCode["a" /* default */].ENTER && !isMultipleOrTags(this.$props)) {
          this.maybeFocus(true);
        } else if (!open) {
          this.setOpenState(true);
        }
        event.preventDefault();
      } else if (keyCode === KeyCode["a" /* default */].SPACE) {
        // Not block space if popup is shown
        if (!open) {
          this.setOpenState(true);
          event.preventDefault();
        }
      }
    },
    onInputKeydown: function onInputKeydown(event) {
      var props = this.$props;
      if (props.disabled) {
        return;
      }
      var state = this.$data;
      var isRealOpen = this.getRealOpenState(state);
      var keyCode = event.keyCode;
      if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode["a" /* default */].BACKSPACE) {
        event.preventDefault();
        var value = state._value;

        if (value.length) {
          this.removeSelected(value[value.length - 1]);
        }
        return;
      }
      if (keyCode === KeyCode["a" /* default */].DOWN) {
        if (!state._open) {
          this.openIfHasChildren();
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      } else if (keyCode === KeyCode["a" /* default */].ENTER && state._open) {
        // Aviod trigger form submit when select item
        // https://github.com/ant-design/ant-design/issues/10861
        // https://github.com/ant-design/ant-design/issues/14544
        if (isRealOpen || !props.combobox) {
          event.preventDefault();
        }
      } else if (keyCode === KeyCode["a" /* default */].ESC) {
        if (state._open) {
          this.setOpenState(false);
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }

      if (isRealOpen && this.selectTriggerRef) {
        var menu = this.selectTriggerRef.getInnerMenu();
        if (menu && menu.onKeyDown(event, this.handleBackfill)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    },
    onMenuSelect: function onMenuSelect(_ref) {
      var item = _ref.item;

      if (!item) {
        return;
      }
      var value = this.$data._value;
      var props = this.$props;
      var selectedValue = getValuePropValue(item);
      var lastValue = value[value.length - 1];
      this.fireSelect(selectedValue);
      if (isMultipleOrTags(props)) {
        if (findIndexInValueBySingleValue(value, selectedValue) !== -1) {
          return;
        }
        value = value.concat([selectedValue]);
      } else {
        if (!isCombobox(props) && lastValue !== undefined && lastValue === selectedValue && selectedValue !== this.$data._backfillValue) {
          this.setOpenState(false, true);
          return;
        }
        value = [selectedValue];
        this.setOpenState(false, true);
      }
      this.fireChange(value);
      var inputValue = isCombobox(props) ? getPropValue(item, props.optionLabelProp) : '';

      if (props.autoClearSearchValue) {
        this.setInputValue(inputValue, false);
      }
    },
    onMenuDeselect: function onMenuDeselect(_ref2) {
      var item = _ref2.item,
          domEvent = _ref2.domEvent;

      if (domEvent.type === 'keydown' && domEvent.keyCode === KeyCode["a" /* default */].ENTER) {
        this.removeSelected(getValuePropValue(item));
        return;
      }
      if (domEvent.type === 'click') {
        this.removeSelected(getValuePropValue(item));
      }
      if (this.autoClearSearchValue) {
        this.setInputValue('', false);
      }
    },
    onArrowClick: function onArrowClick(e) {
      e.stopPropagation();
      e.preventDefault();
      this.clearBlurTime();
      if (!this.disabled) {
        this.setOpenState(!this.$data._open, !this.$data._open);
      }
    },
    onPlaceholderClick: function onPlaceholderClick() {
      if (this.getInputDOMNode() && this.getInputDOMNode()) {
        this.getInputDOMNode().focus();
      }
    },
    onPopupFocus: function onPopupFocus() {
      // fix ie scrollbar, focus element again
      this.maybeFocus(true, true);
    },
    onClearSelection: function onClearSelection(event) {
      var props = this.$props;
      var state = this.$data;
      if (props.disabled) {
        return;
      }
      var inputValue = state._inputValue,
          value = state._value;

      event.stopPropagation();
      if (inputValue || value.length) {
        if (value.length) {
          this.fireChange([]);
        }
        this.setOpenState(false, true);
        if (inputValue) {
          this.setInputValue('');
        }
      }
    },
    onChoiceAnimationLeave: function onChoiceAnimationLeave() {
      this.forcePopupAlign();
    },
    getOptionInfoBySingleValue: function getOptionInfoBySingleValue(value, optionsInfo) {
      var h = this.$createElement;

      var info = void 0;
      optionsInfo = optionsInfo || this.$data._optionsInfo;
      if (optionsInfo[getMapKey(value)]) {
        info = optionsInfo[getMapKey(value)];
      }
      if (info) {
        return info;
      }
      var defaultLabel = value;
      if (this.$props.labelInValue) {
        var label = getLabelFromPropsValue(this.$props.value, value);
        if (label !== undefined) {
          defaultLabel = label;
        }
      }
      var defaultInfo = {
        option: h(
          Option["a" /* default */],
          {
            attrs: { value: value },
            key: value },
          [value]
        ),
        value: value,
        label: defaultLabel
      };
      return defaultInfo;
    },
    getOptionBySingleValue: function getOptionBySingleValue(value) {
      var _getOptionInfoBySingl = this.getOptionInfoBySingleValue(value),
          option = _getOptionInfoBySingl.option;

      return option;
    },
    getOptionsBySingleValue: function getOptionsBySingleValue(values) {
      var _this5 = this;

      return values.map(function (value) {
        return _this5.getOptionBySingleValue(value);
      });
    },
    getValueByLabel: function getValueByLabel(label) {
      var _this6 = this;

      if (label === undefined) {
        return null;
      }
      var value = null;
      Object.keys(this.$data._optionsInfo).forEach(function (key) {
        var info = _this6.$data._optionsInfo[key];
        var disabled = info.disabled;

        if (disabled) {
          return;
        }
        var oldLable = toArray(info.label);
        if (oldLable && oldLable.join('') === label) {
          value = info.value;
        }
      });
      return value;
    },
    getVLBySingleValue: function getVLBySingleValue(value) {
      if (this.$props.labelInValue) {
        return {
          key: value,
          label: this.getLabelBySingleValue(value)
        };
      }
      return value;
    },
    getVLForOnChange: function getVLForOnChange(vlsS) {
      var _this7 = this;

      var vls = vlsS;
      if (vls !== undefined) {
        if (!this.labelInValue) {
          vls = vls.map(function (v) {
            return v;
          });
        } else {
          vls = vls.map(function (vl) {
            return {
              key: vl,
              label: _this7.getLabelBySingleValue(vl)
            };
          });
        }
        return isMultipleOrTags(this.$props) ? vls : vls[0];
      }
      return vls;
    },
    getLabelBySingleValue: function getLabelBySingleValue(value, optionsInfo) {
      var _getOptionInfoBySingl2 = this.getOptionInfoBySingleValue(value, optionsInfo),
          label = _getOptionInfoBySingl2.label;

      return label;
    },
    getDropdownContainer: function getDropdownContainer() {
      if (!this.dropdownContainer) {
        this.dropdownContainer = document.createElement('div');
        document.body.appendChild(this.dropdownContainer);
      }
      return this.dropdownContainer;
    },
    getPlaceholderElement: function getPlaceholderElement() {
      var h = this.$createElement;
      var props = this.$props,
          state = this.$data;

      var hidden = false;
      if (state._mirrorInputValue) {
        hidden = true;
      }
      var value = state._value;
      if (value.length) {
        hidden = true;
      }
      if (!state._mirrorInputValue && isCombobox(props) && value.length === 1 && state._value && !state._value[0]) {
        hidden = false;
      }
      var placeholder = props.placeholder;
      if (placeholder) {
        var p = {
          on: {
            mousedown: preventDefaultEvent,
            click: this.onPlaceholderClick
          },
          attrs: UNSELECTABLE_ATTRIBUTE,
          style: extends_default()({
            display: hidden ? 'none' : 'block'
          }, UNSELECTABLE_STYLE),
          'class': props.prefixCls + '-selection__placeholder'
        };
        return h(
          'div',
          p,
          [placeholder]
        );
      }
      return null;
    },
    inputClick: function inputClick(e) {
      if (this.$data._open) {
        this.clearBlurTime();
        e.stopPropagation();
      } else {
        this._focused = false;
      }
    },
    inputBlur: function inputBlur(e) {
      var _this8 = this;

      var target = e.relatedTarget || document.activeElement;

      // https://github.com/vueComponent/ant-design-vue/issues/999
      // https://github.com/vueComponent/ant-design-vue/issues/1223
      if ((env["b" /* isIE */] || env["a" /* isEdge */]) && (e.relatedTarget === this.$refs.arrow || target && this.selectTriggerRef && this.selectTriggerRef.getInnerMenu() && this.selectTriggerRef.getInnerMenu().$el === target || Object(contains["a" /* default */])(e.target, target))) {
        e.target.focus();
        e.preventDefault();
        return;
      }
      this.clearBlurTime();
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.blurTimer = setTimeout(function () {
        _this8._focused = false;
        _this8.updateFocusClassName();
        var props = _this8.$props;
        var value = _this8.$data._value;
        var inputValue = _this8.$data._inputValue;

        if (isSingleMode(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
          var options = _this8._options || [];
          if (options.length) {
            var firstOption = findFirstMenuItem(options);
            if (firstOption) {
              value = [getValuePropValue(firstOption)];
              _this8.fireChange(value);
            }
          }
        } else if (isMultipleOrTags(props) && inputValue) {
          if (_this8._mouseDown) {
            // need update dropmenu when not blur
            _this8.setInputValue('');
          } else {
            // why not use setState?
            _this8.$data._inputValue = '';
            if (_this8.getInputDOMNode && _this8.getInputDOMNode()) {
              _this8.getInputDOMNode().value = '';
            }
          }
          var tmpValue = _this8.getValueByInput(inputValue);
          if (tmpValue !== undefined) {
            value = tmpValue;
            _this8.fireChange(value);
          }
        }
        // if click the rest space of Select in multiple mode
        if (isMultipleOrTags(props) && _this8._mouseDown) {
          _this8.maybeFocus(true, true);
          _this8._mouseDown = false;
          return;
        }
        _this8.setOpenState(false);
        _this8.$emit('blur', _this8.getVLForOnChange(value));
      }, 200);
    },
    inputFocus: function inputFocus(e) {
      if (this.$props.disabled) {
        e.preventDefault();
        return;
      }
      this.clearBlurTime();
      if (!isMultipleOrTagsOrCombobox(this.$props) && e.target === this.getInputDOMNode()) {
        return;
      }
      if (this._focused) {
        return;
      }
      this._focused = true;
      this.updateFocusClassName();
      // only effect multiple or tag mode
      if (!isMultipleOrTags(this.$props) || !this._mouseDown) {
        this.timeoutFocus();
      }
    },
    _getInputElement: function _getInputElement() {
      var h = this.$createElement;

      var props = this.$props;
      var _$data = this.$data,
          inputValue = _$data._inputValue,
          _mirrorInputValue = _$data._mirrorInputValue;

      var attrs = Object(props_util["e" /* getAttrs */])(this);
      var defaultInput = h('input', {
        attrs: { id: attrs.id, autoComplete: 'off' }
      });

      var inputElement = props.getInputElement ? props.getInputElement() : defaultInput;
      var inputCls = classnames_default()(Object(props_util["f" /* getClass */])(inputElement), defineProperty_default()({}, props.prefixCls + '-search__field', true));
      var inputEvents = Object(props_util["h" /* getEvents */])(inputElement);
      // https://github.com/ant-design/ant-design/issues/4992#issuecomment-281542159
      // Add space to the end of the inputValue as the width measurement tolerance
      inputElement.data = inputElement.data || {};
      return h(
        'div',
        { 'class': props.prefixCls + '-search__field__wrap', on: {
            'click': this.inputClick
          }
        },
        [Object(vnode["a" /* cloneElement */])(inputElement, {
          props: {
            disabled: props.disabled,
            value: inputValue
          },
          attrs: extends_default()({}, inputElement.data.attrs || {}, {
            disabled: props.disabled,
            value: inputValue
          }),
          domProps: {
            value: inputValue
          },
          'class': inputCls,
          directives: [{
            name: 'ant-ref',
            value: this.saveInputRef
          }, {
            name: 'ant-input'
          }],
          on: {
            input: this.onInputChange,
            keydown: chaining(this.onInputKeydown, inputEvents.keydown, this.$listeners.inputKeydown),
            focus: chaining(this.inputFocus, inputEvents.focus),
            blur: chaining(this.inputBlur, inputEvents.blur)
          }
        }), h(
          'span',
          babel_helper_vue_jsx_merge_props_default()([{
            directives: [{
              name: 'ant-ref',
              value: this.saveInputMirrorRef
            }]
          }, {
            // ref='inputMirrorRef'
            'class': props.prefixCls + '-search__field__mirror'
          }]),
          [_mirrorInputValue, '\xA0']
        )]
      );
    },
    getInputDOMNode: function getInputDOMNode() {
      return this.topCtrlRef ? this.topCtrlRef.querySelector('input,textarea,div[contentEditable]') : this.inputRef;
    },
    getInputMirrorDOMNode: function getInputMirrorDOMNode() {
      return this.inputMirrorRef;
    },
    getPopupDOMNode: function getPopupDOMNode() {
      if (this.selectTriggerRef) {
        return this.selectTriggerRef.getPopupDOMNode();
      }
    },
    getPopupMenuComponent: function getPopupMenuComponent() {
      if (this.selectTriggerRef) {
        return this.selectTriggerRef.getInnerMenu();
      }
    },
    setOpenState: function setOpenState(open, needFocus) {
      var _this9 = this;

      var props = this.$props,
          state = this.$data;

      if (state._open === open) {
        this.maybeFocus(open, !!needFocus);
        return;
      }
      this.__emit('dropdownVisibleChange', open);
      var nextState = {
        _open: open,
        _backfillValue: ''
      };
      // clear search input value when open is false in singleMode.
      if (!open && isSingleMode(props) && props.showSearch) {
        this.setInputValue('', false);
      }
      if (!open) {
        this.maybeFocus(open, !!needFocus);
      }
      this.setState(nextState, function () {
        if (open) {
          _this9.maybeFocus(open, !!needFocus);
        }
      });
    },
    setInputValue: function setInputValue(inputValue) {
      var fireSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (inputValue !== this.$data._inputValue) {
        this.setState({
          _inputValue: inputValue
        }, this.forcePopupAlign);
        if (fireSearch) {
          this.$emit('search', inputValue);
        }
      }
    },
    getValueByInput: function getValueByInput(str) {
      var _this10 = this;

      var _$props = this.$props,
          multiple = _$props.multiple,
          tokenSeparators = _$props.tokenSeparators;

      var nextValue = this.$data._value;
      var hasNewValue = false;
      splitBySeparators(str, tokenSeparators).forEach(function (label) {
        var selectedValue = [label];
        if (multiple) {
          var value = _this10.getValueByLabel(label);
          if (value && findIndexInValueBySingleValue(nextValue, value) === -1) {
            nextValue = nextValue.concat(value);
            hasNewValue = true;
            _this10.fireSelect(value);
          }
        } else if (findIndexInValueBySingleValue(nextValue, label) === -1) {
          nextValue = nextValue.concat(selectedValue);
          hasNewValue = true;
          _this10.fireSelect(label);
        }
      });
      return hasNewValue ? nextValue : undefined;
    },
    getRealOpenState: function getRealOpenState(state) {
      var _open = this.$props.open;

      if (typeof _open === 'boolean') {
        return _open;
      }

      var open = (state || this.$data)._open;
      var options = this._options || [];
      if (isMultipleOrTagsOrCombobox(this.$props) || !this.$props.showSearch) {
        if (open && !options.length) {
          open = false;
        }
      }
      return open;
    },
    focus: function focus() {
      if (isSingleMode(this.$props) && this.selectionRef) {
        this.selectionRef.focus();
      } else if (this.getInputDOMNode()) {
        this.getInputDOMNode().focus();
      }
    },
    blur: function blur() {
      if (isSingleMode(this.$props) && this.selectionRef) {
        this.selectionRef.blur();
      } else if (this.getInputDOMNode()) {
        this.getInputDOMNode().blur();
      }
    },
    markMouseDown: function markMouseDown() {
      this._mouseDown = true;
    },
    markMouseLeave: function markMouseLeave() {
      this._mouseDown = false;
    },
    handleBackfill: function handleBackfill(item) {
      if (!this.backfill || !(isSingleMode(this.$props) || isCombobox(this.$props))) {
        return;
      }

      var key = getValuePropValue(item);

      if (isCombobox(this.$props)) {
        this.setInputValue(key, false);
      }

      this.setState({
        _value: [key],
        _backfillValue: key
      });
    },
    _filterOption: function _filterOption(input, child) {
      var defaultFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFilterFn;
      var _$data2 = this.$data,
          value = _$data2._value,
          backfillValue = _$data2._backfillValue;

      var lastValue = value[value.length - 1];
      if (!input || lastValue && lastValue === backfillValue) {
        return true;
      }
      var filterFn = this.$props.filterOption;
      if (Object(props_util["q" /* hasProp */])(this, 'filterOption')) {
        if (filterFn === true) {
          filterFn = defaultFilter.bind(this);
        }
      } else {
        filterFn = defaultFilter.bind(this);
      }
      if (!filterFn) {
        return true;
      } else if (typeof filterFn === 'function') {
        return filterFn.call(this, input, child);
      } else if (Object(props_util["p" /* getValueByProp */])(child, 'disabled')) {
        return false;
      }
      return true;
    },
    timeoutFocus: function timeoutFocus() {
      var _this11 = this;

      if (this.focusTimer) {
        this.clearFocusTime();
      }
      this.focusTimer = window.setTimeout(function () {
        // this._focused = true
        // this.updateFocusClassName()
        _this11.$emit('focus');
      }, 10);
    },
    clearFocusTime: function clearFocusTime() {
      if (this.focusTimer) {
        clearTimeout(this.focusTimer);
        this.focusTimer = null;
      }
    },
    clearBlurTime: function clearBlurTime() {
      if (this.blurTimer) {
        clearTimeout(this.blurTimer);
        this.blurTimer = null;
      }
    },
    updateFocusClassName: function updateFocusClassName() {
      var rootRef = this.rootRef,
          prefixCls = this.prefixCls;
      // avoid setState and its side effect

      if (this._focused) {
        component_classes_default()(rootRef).add(prefixCls + '-focused');
      } else {
        component_classes_default()(rootRef).remove(prefixCls + '-focused');
      }
    },
    maybeFocus: function maybeFocus(open, needFocus) {
      if (needFocus || open) {
        var input = this.getInputDOMNode();
        var _document = document,
            activeElement = _document.activeElement;

        if (input && (open || isMultipleOrTagsOrCombobox(this.$props))) {
          if (activeElement !== input) {
            input.focus();
            this._focused = true;
          }
        } else if (activeElement !== this.selectionRef && this.selectionRef) {
          this.selectionRef.focus();
          this._focused = true;
        }
      }
    },
    removeSelected: function removeSelected(selectedKey, e) {
      var props = this.$props;
      if (props.disabled || this.isChildDisabled(selectedKey)) {
        return;
      }
      // Do not trigger Trigger popup
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      var oldValue = this.$data._value;
      var value = oldValue.filter(function (singleValue) {
        return singleValue !== selectedKey;
      });
      var canMultiple = isMultipleOrTags(props);

      if (canMultiple) {
        var event = selectedKey;
        if (props.labelInValue) {
          event = {
            key: selectedKey,
            label: this.getLabelBySingleValue(selectedKey)
          };
        }
        this.$emit('deselect', event, this.getOptionBySingleValue(selectedKey));
      }
      this.fireChange(value);
    },
    openIfHasChildren: function openIfHasChildren() {
      var $props = this.$props;

      if ($props.children && $props.children.length || isSingleMode($props)) {
        this.setOpenState(true);
      }
    },
    fireSelect: function fireSelect(value) {
      this.$emit('select', this.getVLBySingleValue(value), this.getOptionBySingleValue(value));
    },
    fireChange: function fireChange(value) {
      if (!Object(props_util["q" /* hasProp */])(this, 'value')) {
        this.setState({
          _value: value
        }, this.forcePopupAlign);
      }
      var vls = this.getVLForOnChange(value);
      var options = this.getOptionsBySingleValue(value);
      this._valueOptions = options;
      this.$emit('change', vls, isMultipleOrTags(this.$props) ? options : options[0]);
    },
    isChildDisabled: function isChildDisabled(key) {
      return (this.$props.children || []).some(function (child) {
        var childValue = getValuePropValue(child);
        return childValue === key && Object(props_util["p" /* getValueByProp */])(child, 'disabled');
      });
    },
    forcePopupAlign: function forcePopupAlign() {
      if (!this.$data._open) {
        return;
      }
      if (this.selectTriggerRef && this.selectTriggerRef.triggerRef) {
        this.selectTriggerRef.triggerRef.forcePopupAlign();
      }
    },
    renderFilterOptions: function renderFilterOptions() {
      var _this12 = this;

      var h = this.$createElement;
      var inputValue = this.$data._inputValue;
      var _$props2 = this.$props,
          children = _$props2.children,
          tags = _$props2.tags,
          filterOption = _$props2.filterOption,
          notFoundContent = _$props2.notFoundContent;

      var menuItems = [];
      var childrenKeys = [];
      var empty = false;
      var options = this.renderFilterOptionsFromChildren(children, childrenKeys, menuItems);
      if (tags) {
        // tags value must be string
        var value = this.$data._value;
        value = value.filter(function (singleValue) {
          return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
        });

        // sort by length
        value.sort(function (val1, val2) {
          return val1.length - val2.length;
        });

        value.forEach(function (singleValue) {
          var key = singleValue;
          var attrs = extends_default()({}, UNSELECTABLE_ATTRIBUTE, {
            role: 'option'
          });
          var menuItem = h(
            MenuItem["a" /* default */],
            babel_helper_vue_jsx_merge_props_default()([{ style: UNSELECTABLE_STYLE }, { attrs: attrs }, {
              attrs: { value: key },
              key: key }]),
            [key]
          );
          options.push(menuItem);
          menuItems.push(menuItem);
        });
        if (inputValue) {
          var notFindInputItem = menuItems.every(function (option) {
            // this.filterOption return true has two meaning,
            // 1, some one exists after filtering
            // 2, filterOption is set to false
            // condition 2 does not mean the option has same value with inputValue
            var filterFn = function filterFn() {
              return getValuePropValue(option) === inputValue;
            };
            if (filterOption !== false) {
              return !_this12._filterOption(inputValue, option, filterFn);
            }
            return !filterFn();
          });
          if (notFindInputItem) {
            var p = {
              attrs: UNSELECTABLE_ATTRIBUTE,
              key: inputValue,
              props: {
                value: inputValue,
                role: 'option'
              },
              style: UNSELECTABLE_STYLE
            };
            options.unshift(h(
              MenuItem["a" /* default */],
              p,
              [inputValue]
            ));
          }
        }
      }

      if (!options.length && notFoundContent) {
        empty = true;
        var _p = {
          attrs: UNSELECTABLE_ATTRIBUTE,
          key: 'NOT_FOUND',
          props: {
            value: 'NOT_FOUND',
            disabled: true,
            role: 'option'
          },
          style: UNSELECTABLE_STYLE
        };
        options = [h(
          MenuItem["a" /* default */],
          _p,
          [notFoundContent]
        )];
      }
      return { empty: empty, options: options };
    },
    renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var _this13 = this;

      var childrenKeys = arguments[1];
      var menuItems = arguments[2];
      var h = this.$createElement;

      var sel = [];
      var props = this.$props;
      var inputValue = this.$data._inputValue;

      var tags = props.tags;
      children.forEach(function (child) {
        if (!child.data || child.data.slot !== undefined) {
          return;
        }
        if (Object(props_util["m" /* getSlotOptions */])(child).isSelectOptGroup) {
          var label = Object(props_util["g" /* getComponentFromProp */])(child, 'label');
          var key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          var childChildren = Object(props_util["n" /* getSlots */])(child)['default'];
          childChildren = typeof childChildren === 'function' ? childChildren() : childChildren;
          // Match option group label
          if (inputValue && _this13._filterOption(inputValue, child)) {
            var innerItems = childChildren.map(function (subChild) {
              var childValueSub = getValuePropValue(subChild) || subChild.key;
              return h(
                MenuItem["a" /* default */],
                babel_helper_vue_jsx_merge_props_default()([{ key: childValueSub, attrs: { value: childValueSub }
                }, subChild.data]),
                [subChild.componentOptions.children]
              );
            });

            sel.push(h(
              MenuItemGroup["a" /* default */],
              { key: key, attrs: { title: label },
                'class': Object(props_util["f" /* getClass */])(child) },
              [innerItems]
            ));

            // Not match
          } else {
            var _innerItems = _this13.renderFilterOptionsFromChildren(childChildren, childrenKeys, menuItems);
            if (_innerItems.length) {
              sel.push(h(
                MenuItemGroup["a" /* default */],
                babel_helper_vue_jsx_merge_props_default()([{ key: key, attrs: { title: label }
                }, child.data]),
                [_innerItems]
              ));
            }
          }

          return;
        }
        browser_default()(Object(props_util["m" /* getSlotOptions */])(child).isSelectOption, 'the children of `Select` should be `Select.Option` or `Select.OptGroup`, ' + ('instead of `' + (Object(props_util["m" /* getSlotOptions */])(child).name || Object(props_util["m" /* getSlotOptions */])(child)) + '`.'));

        var childValue = getValuePropValue(child);

        validateOptionValue(childValue, _this13.$props);
        if (_this13._filterOption(inputValue, child)) {
          var p = {
            attrs: extends_default()({}, UNSELECTABLE_ATTRIBUTE, Object(props_util["e" /* getAttrs */])(child)),
            key: childValue,
            props: extends_default()({
              value: childValue
            }, Object(props_util["k" /* getPropsData */])(child), {
              role: 'option'
            }),
            style: UNSELECTABLE_STYLE,
            on: Object(props_util["h" /* getEvents */])(child),
            'class': Object(props_util["f" /* getClass */])(child)
          };
          var menuItem = h(
            MenuItem["a" /* default */],
            p,
            [child.componentOptions.children]
          );
          sel.push(menuItem);
          menuItems.push(menuItem);
        }
        if (tags) {
          childrenKeys.push(childValue);
        }
      });

      return sel;
    },
    renderTopControlNode: function renderTopControlNode() {
      var _this14 = this;

      var h = this.$createElement;
      var props = this.$props;
      var _$data3 = this.$data,
          value = _$data3._value,
          inputValue = _$data3._inputValue,
          open = _$data3._open;
      var choiceTransitionName = props.choiceTransitionName,
          prefixCls = props.prefixCls,
          maxTagTextLength = props.maxTagTextLength,
          maxTagCount = props.maxTagCount,
          maxTagPlaceholder = props.maxTagPlaceholder,
          showSearch = props.showSearch;

      var removeIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'removeIcon');
      var className = prefixCls + '-selection__rendered';
      // search input is inside topControlNode in single, multiple & combobox. 2016/04/13
      var innerNode = null;
      if (isSingleMode(props)) {
        var selectedValue = null;
        if (value.length) {
          var showSelectedValue = false;
          var opacity = 1;
          if (!showSearch) {
            showSelectedValue = true;
          } else if (open) {
            showSelectedValue = !inputValue;
            if (showSelectedValue) {
              opacity = 0.4;
            }
          } else {
            showSelectedValue = true;
          }
          var singleValue = value[0];

          var _getOptionInfoBySingl3 = this.getOptionInfoBySingleValue(singleValue),
              label = _getOptionInfoBySingl3.label,
              title = _getOptionInfoBySingl3.title;

          selectedValue = h(
            'div',
            {
              key: 'value',
              'class': prefixCls + '-selection-selected-value',
              attrs: { title: toTitle(title || label)
              },
              style: {
                display: showSelectedValue ? 'block' : 'none',
                opacity: opacity
              }
            },
            [label]
          );
        }
        if (!showSearch) {
          innerNode = [selectedValue];
        } else {
          innerNode = [selectedValue, h(
            'div',
            {
              'class': prefixCls + '-search ' + prefixCls + '-search--inline',
              key: 'input',
              style: {
                display: open ? 'block' : 'none'
              }
            },
            [this._getInputElement()]
          )];
        }
      } else {
        var selectedValueNodes = [];
        var limitedCountValue = value;
        var maxTagPlaceholderEl = void 0;
        if (maxTagCount !== undefined && value.length > maxTagCount) {
          limitedCountValue = limitedCountValue.slice(0, maxTagCount);
          var omittedValues = this.getVLForOnChange(value.slice(maxTagCount, value.length));
          var content = '+ ' + (value.length - maxTagCount) + ' ...';
          if (maxTagPlaceholder) {
            content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
          }
          var attrs = extends_default()({}, UNSELECTABLE_ATTRIBUTE, {
            role: 'presentation',
            title: toTitle(content)
          });
          maxTagPlaceholderEl = h(
            'li',
            babel_helper_vue_jsx_merge_props_default()([{
              style: UNSELECTABLE_STYLE
            }, { attrs: attrs }, {
              on: {
                'mousedown': preventDefaultEvent
              },

              'class': prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled',
              key: 'maxTagPlaceholder'
            }]),
            [h(
              'div',
              { 'class': prefixCls + '-selection__choice__content' },
              [content]
            )]
          );
        }
        if (isMultipleOrTags(props)) {
          selectedValueNodes = limitedCountValue.map(function (singleValue) {
            var info = _this14.getOptionInfoBySingleValue(singleValue);
            var content = info.label;
            var title = info.title || content;
            if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
              content = content.slice(0, maxTagTextLength) + '...';
            }
            var disabled = _this14.isChildDisabled(singleValue);
            var choiceClassName = disabled ? prefixCls + '-selection__choice ' + prefixCls + '-selection__choice__disabled' : prefixCls + '-selection__choice';
            // attrs 放在一起，避免动态title混乱问题，很奇怪的问题 https://github.com/vueComponent/ant-design-vue/issues/588
            var attrs = extends_default()({}, UNSELECTABLE_ATTRIBUTE, {
              role: 'presentation',
              title: toTitle(title)
            });
            return h(
              'li',
              babel_helper_vue_jsx_merge_props_default()([{
                style: UNSELECTABLE_STYLE
              }, { attrs: attrs }, {
                on: {
                  'mousedown': preventDefaultEvent
                },

                'class': choiceClassName,
                key: singleValue || SELECT_EMPTY_VALUE_KEY
              }]),
              [h(
                'div',
                { 'class': prefixCls + '-selection__choice__content' },
                [content]
              ), disabled ? null : h(
                'span',
                {
                  on: {
                    'click': function click(event) {
                      _this14.removeSelected(singleValue, event);
                    }
                  },

                  'class': prefixCls + '-selection__choice__remove'
                },
                [removeIcon || h(
                  'i',
                  { 'class': prefixCls + '-selection__choice__remove-icon' },
                  ['\xD7']
                )]
              )]
            );
          });
        }
        if (maxTagPlaceholderEl) {
          selectedValueNodes.push(maxTagPlaceholderEl);
        }
        selectedValueNodes.push(h(
          'li',
          { 'class': prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
          [this._getInputElement()]
        ));

        if (isMultipleOrTags(props) && choiceTransitionName) {
          var transitionProps = Object(getTransitionProps["a" /* default */])(choiceTransitionName, {
            tag: 'ul',
            afterLeave: this.onChoiceAnimationLeave
          });
          innerNode = h(
            'transition-group',
            transitionProps,
            [selectedValueNodes]
          );
        } else {
          innerNode = h('ul', [selectedValueNodes]);
        }
      }
      return h(
        'div',
        babel_helper_vue_jsx_merge_props_default()([{
          'class': className
        }, {
          directives: [{
            name: 'ant-ref',
            value: this.saveTopCtrlRef
          }]
        }, {
          on: {
            'click': this.topCtrlContainerClick
          }
        }]),
        [this.getPlaceholderElement(), innerNode]
      );
    },
    renderArrow: function renderArrow(multiple) {
      var h = this.$createElement;

      // showArrow : Set to true if not multiple by default but keep set value.
      var _$props3 = this.$props,
          _$props3$showArrow = _$props3.showArrow,
          showArrow = _$props3$showArrow === undefined ? !multiple : _$props3$showArrow,
          loading = _$props3.loading,
          prefixCls = _$props3.prefixCls;

      var inputIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'inputIcon');
      if (!showArrow && !loading) {
        return null;
      }
      // if loading  have loading icon
      var defaultIcon = loading ? h('i', { 'class': prefixCls + '-arrow-loading' }) : h('i', { 'class': prefixCls + '-arrow-icon' });
      return h(
        'span',
        babel_helper_vue_jsx_merge_props_default()([{
          key: 'arrow',
          'class': prefixCls + '-arrow',
          style: UNSELECTABLE_STYLE
        }, { attrs: UNSELECTABLE_ATTRIBUTE }, {
          on: {
            'click': this.onArrowClick
          },

          ref: 'arrow'
        }]),
        [inputIcon || defaultIcon]
      );
    },
    topCtrlContainerClick: function topCtrlContainerClick(e) {
      if (this.$data._open && !isSingleMode(this.$props)) {
        e.stopPropagation();
      }
    },
    renderClear: function renderClear() {
      var h = this.$createElement;
      var _$props4 = this.$props,
          prefixCls = _$props4.prefixCls,
          allowClear = _$props4.allowClear;
      var _$data4 = this.$data,
          value = _$data4._value,
          inputValue = _$data4._inputValue;

      var clearIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'clearIcon');
      var clear = h(
        'span',
        babel_helper_vue_jsx_merge_props_default()([{
          key: 'clear',
          'class': prefixCls + '-selection__clear',
          on: {
            'mousedown': preventDefaultEvent
          },

          style: UNSELECTABLE_STYLE
        }, { attrs: UNSELECTABLE_ATTRIBUTE }, {
          on: {
            'click': this.onClearSelection
          }
        }]),
        [clearIcon || h(
          'i',
          { 'class': prefixCls + '-selection__clear-icon' },
          ['\xD7']
        )]
      );
      if (!allowClear) {
        return null;
      }
      if (isCombobox(this.$props)) {
        if (inputValue) {
          return clear;
        }
        return null;
      }
      if (inputValue || value.length) {
        return clear;
      }
      return null;
    },
    selectionRefClick: function selectionRefClick(e) {
      //e.stopPropagation();
      if (!this.disabled) {
        var input = this.getInputDOMNode();
        if (this._focused && this.$data._open) {
          // this._focused = false;
          this.setOpenState(false, false);
          input && input.blur();
        } else {
          this.clearBlurTime();
          //this._focused = true;
          this.setOpenState(true, true);
          input && input.focus();
        }
      }
    },
    selectionRefFocus: function selectionRefFocus(e) {
      if (this._focused || this.disabled || isMultipleOrTagsOrCombobox(this.$props)) {
        e.preventDefault();
        return;
      }
      this._focused = true;
      this.updateFocusClassName();
      this.$emit('focus');
    },
    selectionRefBlur: function selectionRefBlur(e) {
      if (isMultipleOrTagsOrCombobox(this.$props)) {
        e.preventDefault();
        return;
      }
      this.inputBlur(e);
    }
  },

  render: function render() {
    var _rootCls;

    var h = arguments[0];

    var props = this.$props;
    var multiple = isMultipleOrTags(props);
    // Default set showArrow to true if not set (not set directly in defaultProps to handle multiple case)
    var _props$showArrow = props.showArrow,
        showArrow = _props$showArrow === undefined ? true : _props$showArrow;

    var state = this.$data;
    var disabled = props.disabled,
        prefixCls = props.prefixCls,
        loading = props.loading;

    var ctrlNode = this.renderTopControlNode();
    var _$data5 = this.$data,
        open = _$data5._open,
        inputValue = _$data5._inputValue,
        value = _$data5._value;

    if (open) {
      var filterOptions = this.renderFilterOptions();
      this._empty = filterOptions.empty;
      this._options = filterOptions.options;
    }
    var realOpen = this.getRealOpenState();
    var empty = this._empty;
    var options = this._options || [];
    var $listeners = this.$listeners;
    var _$listeners$mouseente = $listeners.mouseenter,
        mouseenter = _$listeners$mouseente === undefined ? noop : _$listeners$mouseente,
        _$listeners$mouseleav = $listeners.mouseleave,
        mouseleave = _$listeners$mouseleav === undefined ? noop : _$listeners$mouseleav,
        _$listeners$popupScro = $listeners.popupScroll,
        popupScroll = _$listeners$popupScro === undefined ? noop : _$listeners$popupScro;

    var selectionProps = {
      props: {},
      attrs: {
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'true',
        'aria-expanded': realOpen,
        'aria-controls': this.$data._ariaId
      },
      on: {
        // click: this.selectionRefClick,
      },
      'class': prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
      // directives: [
      //   {
      //     name: 'ant-ref',
      //     value: this.saveSelectionRef,
      //   },
      // ],
      key: 'selection'
    };
    //if (!isMultipleOrTagsOrCombobox(props)) {
    // selectionProps.on.keydown = this.onKeyDown;
    // selectionProps.on.focus = this.selectionRefFocus;
    // selectionProps.on.blur = this.selectionRefBlur;
    // selectionProps.attrs.tabIndex = props.disabled ? -1 : props.tabIndex;
    //}
    var rootCls = (_rootCls = {}, defineProperty_default()(_rootCls, prefixCls, true), defineProperty_default()(_rootCls, prefixCls + '-open', open), defineProperty_default()(_rootCls, prefixCls + '-focused', open || !!this._focused), defineProperty_default()(_rootCls, prefixCls + '-combobox', isCombobox(props)), defineProperty_default()(_rootCls, prefixCls + '-disabled', disabled), defineProperty_default()(_rootCls, prefixCls + '-enabled', !disabled), defineProperty_default()(_rootCls, prefixCls + '-allow-clear', !!props.allowClear), defineProperty_default()(_rootCls, prefixCls + '-no-arrow', !showArrow), defineProperty_default()(_rootCls, prefixCls + '-loading', !!loading), _rootCls);
    return h(
      SelectTrigger,
      babel_helper_vue_jsx_merge_props_default()([{
        attrs: {
          dropdownAlign: props.dropdownAlign,
          dropdownClassName: props.dropdownClassName,
          dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
          defaultActiveFirstOption: props.defaultActiveFirstOption,
          dropdownMenuStyle: props.dropdownMenuStyle,
          transitionName: props.transitionName,
          animation: props.animation,
          prefixCls: props.prefixCls,
          dropdownStyle: props.dropdownStyle,
          combobox: props.combobox,
          showSearch: props.showSearch,
          options: options,
          empty: empty,
          multiple: multiple,
          disabled: disabled,
          visible: realOpen,
          inputValue: inputValue,
          value: value,
          backfillValue: state._backfillValue,
          firstActiveValue: props.firstActiveValue,

          getPopupContainer: props.getPopupContainer,

          showAction: props.showAction,
          menuItemSelectedIcon: Object(props_util["g" /* getComponentFromProp */])(this, 'menuItemSelectedIcon')
        },
        on: {
          'dropdownVisibleChange': this.onDropdownVisibleChange,
          'menuSelect': this.onMenuSelect,
          'menuDeselect': this.onMenuDeselect,
          'popupScroll': popupScroll,
          'popupFocus': this.onPopupFocus,
          'mouseenter': mouseenter,
          'mouseleave': mouseleave
        }
      }, {
        directives: [{
          name: 'ant-ref',
          value: this.saveSelectTriggerRef
        }]
      }, {
        attrs: {
          dropdownRender: props.dropdownRender,
          ariaId: this.$data._ariaId
        }
      }]),
      [h(
        'div',
        babel_helper_vue_jsx_merge_props_default()([{
          directives: [{
            name: 'ant-ref',
            value: chaining(this.saveRootRef, this.saveSelectionRef)
          }]
        }, {
          style: Object(props_util["o" /* getStyle */])(this),
          'class': classnames_default()(rootCls),
          on: {
            'mousedown': this.markMouseDown,
            'mouseup': this.markMouseLeave,
            'mouseout': this.markMouseLeave,
            'blur': this.selectionRefBlur,
            'focus': this.selectionRefFocus,
            'click': this.selectionRefClick,
            'keydown': isMultipleOrTagsOrCombobox(props) ? noop : this.onKeyDown
          },
          attrs: {
            tabIndex: props.disabled ? -1 : props.tabIndex
          }
        }]),
        [h(
          'div',
          selectionProps,
          [ctrlNode, this.renderClear(), this.renderArrow(!!multiple)]
        )]
      )]
    );
  }
};

/* harmony default export */ var vc_select_Select = (Object(proxyComponent["a" /* default */])(Select));

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

/***/ "9002":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-rate/src/util.js
function getScroll(w, top) {
  var ret = top ? w.pageYOffset : w.pageXOffset;
  var method = top ? 'scrollTop' : 'scrollLeft';
  if (typeof ret !== 'number') {
    var d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getClientPosition(elem) {
  var x = void 0;
  var y = void 0;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  var box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}

function getOffsetLeft(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  return pos.left;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-rate/src/Star.js



function noop() {}

/* harmony default export */ var Star = ({
  name: 'Star',
  mixins: [BaseMixin["a" /* default */]],
  props: {
    value: vue_types["a" /* default */].number,
    index: vue_types["a" /* default */].number,
    prefixCls: vue_types["a" /* default */].string,
    allowHalf: vue_types["a" /* default */].bool,
    disabled: vue_types["a" /* default */].bool,
    character: vue_types["a" /* default */].any,
    characterRender: vue_types["a" /* default */].func,
    focused: vue_types["a" /* default */].bool,
    count: vue_types["a" /* default */].number
  },
  methods: {
    onHover: function onHover(e) {
      var index = this.index;

      this.$emit('hover', e, index);
    },
    onClick: function onClick(e) {
      var index = this.index;

      this.$emit('click', e, index);
    },
    onKeyDown: function onKeyDown(e) {
      var index = this.$props.index;

      if (e.keyCode === 13) {
        this.__emit('click', e, index);
      }
    },
    getClassName: function getClassName() {
      var prefixCls = this.prefixCls,
          index = this.index,
          value = this.value,
          allowHalf = this.allowHalf,
          focused = this.focused;

      var starValue = index + 1;
      var className = prefixCls;
      if (value === 0 && index === 0 && focused) {
        className += ' ' + prefixCls + '-focused';
      } else if (allowHalf && value + 0.5 === starValue) {
        className += ' ' + prefixCls + '-half ' + prefixCls + '-active';
        if (focused) {
          className += ' ' + prefixCls + '-focused';
        }
      } else {
        className += starValue <= value ? ' ' + prefixCls + '-full' : ' ' + prefixCls + '-zero';
        if (starValue === value && focused) {
          className += ' ' + prefixCls + '-focused';
        }
      }
      return className;
    }
  },
  render: function render() {
    var h = arguments[0];
    var onHover = this.onHover,
        onClick = this.onClick,
        onKeyDown = this.onKeyDown,
        disabled = this.disabled,
        prefixCls = this.prefixCls,
        characterRender = this.characterRender,
        index = this.index,
        count = this.count,
        value = this.value;


    var character = Object(props_util["g" /* getComponentFromProp */])(this, 'character');
    var star = h(
      'li',
      { 'class': this.getClassName() },
      [h(
        'div',
        {
          on: {
            'click': disabled ? noop : onClick,
            'keydown': disabled ? noop : onKeyDown,
            'mousemove': disabled ? noop : onHover
          },
          attrs: {
            role: 'radio',
            'aria-checked': value > index ? 'true' : 'false',
            'aria-posinset': index + 1,
            'aria-setsize': count,
            tabIndex: 0
          }
        },
        [h(
          'div',
          { 'class': prefixCls + '-first' },
          [character]
        ), h(
          'div',
          { 'class': prefixCls + '-second' },
          [character]
        )]
      )]
    );
    if (characterRender) {
      star = characterRender(star, this.$props);
    }
    return star;
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-rate/src/Rate.js








var rateProps = {
  disabled: vue_types["a" /* default */].bool,
  value: vue_types["a" /* default */].number,
  defaultValue: vue_types["a" /* default */].number,
  count: vue_types["a" /* default */].number,
  allowHalf: vue_types["a" /* default */].bool,
  allowClear: vue_types["a" /* default */].bool,
  prefixCls: vue_types["a" /* default */].string,
  character: vue_types["a" /* default */].any,
  characterRender: vue_types["a" /* default */].func,
  tabIndex: vue_types["a" /* default */].number,
  autoFocus: vue_types["a" /* default */].bool
};

function Rate_noop() {}

/* harmony default export */ var Rate = ({
  name: 'Rate',
  mixins: [BaseMixin["a" /* default */]],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: Object(props_util["r" /* initDefaultProps */])(rateProps, {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    prefixCls: 'rc-rate',
    tabIndex: 0,
    character: '★'
  }),
  data: function data() {
    var value = this.value;
    if (!Object(props_util["q" /* hasProp */])(this, 'value')) {
      value = this.defaultValue;
    }
    return {
      sValue: value,
      focused: false,
      cleanedValue: null,
      hoverValue: undefined
    };
  },

  watch: {
    value: function value(val) {
      this.setState({
        sValue: val
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.autoFocus && !_this.disabled) {
        _this.focus();
      }
    });
  },

  methods: {
    onHover: function onHover(event, index) {
      var hoverValue = this.getStarValue(index, event.pageX);
      var cleanedValue = this.cleanedValue;

      if (hoverValue !== cleanedValue) {
        this.setState({
          hoverValue: hoverValue,
          cleanedValue: null
        });
      }
      this.$emit('hoverChange', hoverValue);
    },
    onMouseLeave: function onMouseLeave() {
      this.setState({
        hoverValue: undefined,
        cleanedValue: null
      });
      this.$emit('hoverChange', undefined);
    },
    onClick: function onClick(event, index) {
      var allowClear = this.allowClear,
          value = this.sValue;

      var newValue = this.getStarValue(index, event.pageX);
      var isReset = false;
      if (allowClear) {
        isReset = newValue === value;
      }
      this.onMouseLeave(true);
      this.changeValue(isReset ? 0 : newValue);
      this.setState({
        cleanedValue: isReset ? newValue : null
      });
    },
    onFocus: function onFocus() {
      this.setState({
        focused: true
      });
      this.$emit('focus');
    },
    onBlur: function onBlur() {
      this.setState({
        focused: false
      });
      this.$emit('blur');
    },
    onKeyDown: function onKeyDown(event) {
      var keyCode = event.keyCode;
      var count = this.count,
          allowHalf = this.allowHalf;
      var sValue = this.sValue;

      if (keyCode === KeyCode["a" /* default */].RIGHT && sValue < count) {
        if (allowHalf) {
          sValue += 0.5;
        } else {
          sValue += 1;
        }
        this.changeValue(sValue);
        event.preventDefault();
      } else if (keyCode === KeyCode["a" /* default */].LEFT && sValue > 0) {
        if (allowHalf) {
          sValue -= 0.5;
        } else {
          sValue -= 1;
        }
        this.changeValue(sValue);
        event.preventDefault();
      }
      this.$emit('keydown', event);
    },
    getStarDOM: function getStarDOM(index) {
      return this.$refs['stars' + index].$el;
    },
    getStarValue: function getStarValue(index, x) {
      var value = index + 1;
      if (this.allowHalf) {
        var starEle = this.getStarDOM(index);
        var leftDis = getOffsetLeft(starEle);
        var width = starEle.clientWidth;
        if (x - leftDis < width / 2) {
          value -= 0.5;
        }
      }
      return value;
    },
    focus: function focus() {
      if (!this.disabled) {
        this.$refs.rateRef.focus();
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        this.$refs.rateRef.blur();
      }
    },
    changeValue: function changeValue(value) {
      if (!Object(props_util["q" /* hasProp */])(this, 'value')) {
        this.setState({
          sValue: value
        });
      }
      this.$emit('change', value);
    }
  },
  render: function render() {
    var h = arguments[0];

    var _getOptionProps = Object(props_util["j" /* getOptionProps */])(this),
        count = _getOptionProps.count,
        allowHalf = _getOptionProps.allowHalf,
        prefixCls = _getOptionProps.prefixCls,
        disabled = _getOptionProps.disabled,
        tabIndex = _getOptionProps.tabIndex;

    var sValue = this.sValue,
        hoverValue = this.hoverValue,
        focused = this.focused;

    var stars = [];
    var disabledClass = disabled ? prefixCls + '-disabled' : '';
    var character = Object(props_util["g" /* getComponentFromProp */])(this, 'character');
    var characterRender = this.characterRender || this.$scopedSlots.characterRender;
    for (var index = 0; index < count; index++) {
      var starProps = {
        props: {
          index: index,
          count: count,
          disabled: disabled,
          prefixCls: prefixCls + '-star',
          allowHalf: allowHalf,
          value: hoverValue === undefined ? sValue : hoverValue,
          character: character,
          characterRender: characterRender,
          focused: focused
        },
        on: {
          click: this.onClick,
          hover: this.onHover
        },
        key: index,
        ref: 'stars' + index
      };
      stars.push(h(Star, starProps));
    }
    return h(
      'ul',
      {
        'class': classnames_default()(prefixCls, disabledClass),
        on: {
          'mouseleave': disabled ? Rate_noop : this.onMouseLeave,
          'focus': disabled ? Rate_noop : this.onFocus,
          'blur': disabled ? Rate_noop : this.onBlur,
          'keydown': disabled ? Rate_noop : this.onKeyDown
        },
        attrs: {
          tabIndex: disabled ? -1 : tabIndex,

          role: 'radiogroup'
        },

        ref: 'rateRef' },
      [stars]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-rate/src/index.js

/* harmony default export */ var src = (Rate);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-rate/index.js
// based on rc-rate 2.5.0

/* harmony default export */ var vc_rate = __webpack_exports__["a"] = (src);

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

/***/ "a615":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4d91");

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    value: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number]),
    label: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])
  },
  isSelectOptGroup: true
});

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

/***/ }),

/***/ "ceca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-ref/index.js
var vue_ref = __webpack_require__("46cf");
var vue_ref_default = /*#__PURE__*/__webpack_require__.n(vue_ref);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-progress/src/enhancer.js
function enhancer(Component) {
  return {
    mixins: [Component],
    updated: function updated() {
      var _this = this;

      var now = Date.now();
      var updated = false;

      Object.keys(this.paths).forEach(function (key) {
        var path = _this.paths[key];

        if (!path) {
          return;
        }

        updated = true;
        var pathStyle = path.style;
        pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

        if (_this.prevTimeStamp && now - _this.prevTimeStamp < 100) {
          pathStyle.transitionDuration = '0s, 0s';
        }
      });
      if (updated) {
        this.prevTimeStamp = Date.now();
      }
    }
  };
}

/* harmony default export */ var src_enhancer = (enhancer);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-progress/src/types.js


var defaultProps = {
  // className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  // style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};
var mixedType = vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string]);

var propTypes = {
  // className: PropTypes.string,
  percent: vue_types["a" /* default */].oneOfType([mixedType, vue_types["a" /* default */].arrayOf(mixedType)]),
  prefixCls: vue_types["a" /* default */].string,
  strokeColor: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string)]),
  strokeLinecap: vue_types["a" /* default */].oneOf(['butt', 'round', 'square']),
  strokeWidth: mixedType,
  // style: PropTypes.object,
  trailColor: vue_types["a" /* default */].string,
  trailWidth: mixedType
};
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-progress/src/Circle.js










var circlePropTypes = extends_default()({}, propTypes, {
  gapPosition: vue_types["a" /* default */].oneOf(['top', 'bottom', 'left', 'right']),
  gapDegree: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string, vue_types["a" /* default */].bool])
});

var circleDefaultProps = extends_default()({}, defaultProps, {
  gapPosition: 'top'
});

vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });

var Circle = {
  props: Object(props_util["r" /* initDefaultProps */])(circlePropTypes, circleDefaultProps),
  created: function created() {
    this.paths = {};
  },

  methods: {
    getPathStyles: function getPathStyles(offset, percent, strokeColor, strokeWidth) {
      var gapDegree = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var gapPosition = arguments[5];

      var radius = 50 - strokeWidth / 2;
      var beginPositionX = 0;
      var beginPositionY = -radius;
      var endPositionX = 0;
      var endPositionY = -2 * radius;
      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;
        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;
        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;
        default:
      }
      var pathString = 'M 50,50 m ' + beginPositionX + ',' + beginPositionY + '\n       a ' + radius + ',' + radius + ' 0 1 1 ' + endPositionX + ',' + -endPositionY + '\n       a ' + radius + ',' + radius + ' 0 1 1 ' + -endPositionX + ',' + endPositionY;
      var len = Math.PI * 2 * radius;
      var pathStyle = {
        stroke: strokeColor,
        strokeDasharray: percent / 100 * (len - gapDegree) + 'px ' + len + 'px',
        strokeDashoffset: '-' + (gapDegree / 2 + offset / 100 * (len - gapDegree)) + 'px',
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line
      };
      return {
        pathString: pathString,
        pathStyle: pathStyle
      };
    },
    getStokeList: function getStokeList() {
      var _this = this;

      var h = this.$createElement;
      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          percent = _$props.percent,
          strokeColor = _$props.strokeColor,
          strokeWidth = _$props.strokeWidth,
          strokeLinecap = _$props.strokeLinecap,
          gapDegree = _$props.gapDegree,
          gapPosition = _$props.gapPosition;

      var percentList = Array.isArray(percent) ? percent : [percent];
      var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

      var stackPtg = 0;
      return percentList.map(function (ptg, index) {
        var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];

        var _getPathStyles = _this.getPathStyles(stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition),
            pathString = _getPathStyles.pathString,
            pathStyle = _getPathStyles.pathStyle;

        stackPtg += ptg;

        var pathProps = {
          key: index,
          attrs: {
            d: pathString,
            'stroke-linecap': strokeLinecap,
            'stroke-width': ptg === 0 ? 0 : strokeWidth,
            'fill-opacity': '0'
          },
          'class': prefixCls + '-circle-path',
          style: pathStyle,
          directives: [{
            name: 'ant-ref',
            value: function value(c) {
              _this.paths[index] = c;
            }
          }]
        };
        return h('path', pathProps);
      });
    }
  },

  render: function render() {
    var h = arguments[0];

    var _$props2 = this.$props,
        prefixCls = _$props2.prefixCls,
        strokeWidth = _$props2.strokeWidth,
        trailWidth = _$props2.trailWidth,
        gapDegree = _$props2.gapDegree,
        gapPosition = _$props2.gapPosition,
        trailColor = _$props2.trailColor,
        strokeLinecap = _$props2.strokeLinecap,
        restProps = objectWithoutProperties_default()(_$props2, ['prefixCls', 'strokeWidth', 'trailWidth', 'gapDegree', 'gapPosition', 'trailColor', 'strokeLinecap']);

    var _getPathStyles2 = this.getPathStyles(0, 100, trailColor, strokeWidth, gapDegree, gapPosition),
        pathString = _getPathStyles2.pathString,
        pathStyle = _getPathStyles2.pathStyle;

    delete restProps.percent;
    delete restProps.strokeColor;
    var pathFirst = {
      attrs: {
        d: pathString,
        stroke: trailColor,
        'stroke-linecap': strokeLinecap,
        'stroke-width': trailWidth || strokeWidth,
        'fill-opacity': '0'
      },
      'class': prefixCls + '-circle-trail',
      style: pathStyle
    };

    return h(
      'svg',
      babel_helper_vue_jsx_merge_props_default()([{ 'class': prefixCls + '-circle', attrs: { viewBox: '0 0 100 100' }
      }, restProps]),
      [h('path', pathFirst), this.getStokeList()]
    );
  }
};

/* harmony default export */ var src_Circle = __webpack_exports__["a"] = (src_enhancer(Circle));

/***/ }),

/***/ "d4b2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4d91");


/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    value: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number]),
    label: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number]),
    disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool,
    title: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])
  },
  isSelectOption: true
});

/***/ }),

/***/ "f8cb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/Pager.js


/* harmony default export */ var Pager = ({
  name: 'Pager',
  props: {
    rootPrefixCls: vue_types["a" /* default */].string,
    page: vue_types["a" /* default */].number,
    active: vue_types["a" /* default */].bool,
    last: vue_types["a" /* default */].bool,
    locale: vue_types["a" /* default */].object,
    showTitle: vue_types["a" /* default */].bool,
    itemRender: {
      type: Function,
      'default': function _default() {}
    }
  },
  computed: {
    classes: function classes() {
      var prefixCls = this.rootPrefixCls + '-item';
      var cls = prefixCls + ' ' + prefixCls + '-' + this.page;
      if (this.active) {
        cls = cls + ' ' + prefixCls + '-active';
      }
      return cls;
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.$emit('click', this.page);
    },
    handleKeyPress: function handleKeyPress(event) {
      this.$emit('keypress', event, this.handleClick, this.page);
    }
  },
  render: function render() {
    var h = arguments[0];
    var rootPrefixCls = this.rootPrefixCls,
        page = this.page,
        active = this.active;

    var prefixCls = rootPrefixCls + '-item';
    var cls = prefixCls + ' ' + prefixCls + '-' + page;

    if (active) {
      cls = cls + ' ' + prefixCls + '-active';
    }

    if (!page) {
      cls = cls + ' ' + prefixCls + '-disabled';
    }

    return h(
      'li',
      {
        'class': cls,
        on: {
          'click': this.handleClick,
          'keypress': this.handleKeyPress
        },
        attrs: {
          title: this.showTitle ? this.page : null,
          tabIndex: '0'
        }
      },
      [this.itemRender(this.page, 'page', h('a', [this.page]))]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/KeyCode.js
/* harmony default export */ var KeyCode = ({
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,

  ARROW_UP: 38,
  ARROW_DOWN: 40
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/Options.js





/* harmony default export */ var Options = ({
  mixins: [BaseMixin["a" /* default */]],
  props: {
    disabled: vue_types["a" /* default */].bool,
    changeSize: vue_types["a" /* default */].func,
    quickGo: vue_types["a" /* default */].func,
    selectComponentClass: vue_types["a" /* default */].any,
    current: vue_types["a" /* default */].number,
    pageSizeOptions: vue_types["a" /* default */].array.def(['10', '20', '30', '40']),
    pageSize: vue_types["a" /* default */].number,
    buildOptionText: vue_types["a" /* default */].func,
    locale: vue_types["a" /* default */].object,
    rootPrefixCls: vue_types["a" /* default */].string,
    selectPrefixCls: vue_types["a" /* default */].string,
    goButton: vue_types["a" /* default */].any
  },
  data: function data() {
    return {
      goInputText: ''
    };
  },

  methods: {
    getValidValue: function getValidValue() {
      var goInputText = this.goInputText,
          current = this.current;

      return isNaN(goInputText) ? current : Number(goInputText);
    },
    defaultBuildOptionText: function defaultBuildOptionText(opt) {
      return opt.value + ' ' + this.locale.items_per_page;
    },
    handleChange: function handleChange(e) {
      var _e$target = e.target,
          value = _e$target.value,
          composing = _e$target.composing;

      if (composing || this.goInputText === value) return;
      this.setState({
        goInputText: value
      });
    },
    handleBlur: function handleBlur() {
      var goButton = this.goButton,
          quickGo = this.quickGo;

      if (goButton) {
        return;
      }
      quickGo(this.getValidValue());
    },
    go: function go(e) {
      var goInputText = this.goInputText;

      if (goInputText === '') {
        return;
      }
      if (e.keyCode === KeyCode.ENTER || e.type === 'click') {
        // https://github.com/vueComponent/ant-design-vue/issues/1316
        this.quickGo(this.getValidValue());
        this.setState({
          goInputText: ''
        });
      }
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var rootPrefixCls = this.rootPrefixCls,
        locale = this.locale,
        changeSize = this.changeSize,
        quickGo = this.quickGo,
        goButton = this.goButton,
        Select = this.selectComponentClass,
        defaultBuildOptionText = this.defaultBuildOptionText,
        selectPrefixCls = this.selectPrefixCls,
        pageSize = this.pageSize,
        pageSizeOptions = this.pageSizeOptions,
        goInputText = this.goInputText,
        disabled = this.disabled;

    var prefixCls = rootPrefixCls + '-options';
    var changeSelect = null;
    var goInput = null;
    var gotoButton = null;

    if (!changeSize && !quickGo) {
      return null;
    }

    if (changeSize && Select) {
      var buildOptionText = this.buildOptionText || defaultBuildOptionText;
      var options = pageSizeOptions.map(function (opt, i) {
        return h(
          Select.Option,
          { key: i, attrs: { value: opt }
          },
          [buildOptionText({ value: opt })]
        );
      });

      changeSelect = h(
        Select,
        {
          attrs: {
            disabled: disabled,
            prefixCls: selectPrefixCls,
            showSearch: false,

            optionLabelProp: 'children',
            dropdownMatchSelectWidth: false,
            value: (pageSize || pageSizeOptions[0]).toString(),

            getPopupContainer: function getPopupContainer(triggerNode) {
              return triggerNode.parentNode;
            }
          },
          'class': prefixCls + '-size-changer', on: {
            'change': function change(value) {
              return _this.changeSize(Number(value));
            }
          }
        },
        [options]
      );
    }

    if (quickGo) {
      if (goButton) {
        gotoButton = typeof goButton === 'boolean' ? h(
          'button',
          {
            attrs: { type: 'button', disabled: disabled },
            on: {
              'click': this.go,
              'keyup': this.go
            }
          },
          [locale.jump_to_confirm]
        ) : h(
          'span',
          {
            on: {
              'click': this.go,
              'keyup': this.go
            }
          },
          [goButton]
        );
      }
      goInput = h(
        'div',
        { 'class': prefixCls + '-quick-jumper' },
        [locale.jump_to, h('input', babel_helper_vue_jsx_merge_props_default()([{
          attrs: {
            disabled: disabled,
            type: 'text'
          },
          domProps: {
            'value': goInputText
          },
          on: {
            'input': this.handleChange,
            'keyup': this.go,
            'blur': this.handleBlur
          }
        }, {
          directives: [{
            name: 'ant-input'
          }]
        }])), locale.page, gotoButton]
      );
    }

    return h(
      'li',
      { 'class': '' + prefixCls },
      [changeSelect, goInput]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/locale/zh_CN.js
/* harmony default export */ var zh_CN = ({
  // Options.jsx
  items_per_page: '条/页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '页',

  // Pagination.jsx
  prev_page: '上一页',
  next_page: '下一页',
  prev_5: '向前 5 页',
  next_5: '向后 5 页',
  prev_3: '向前 3 页',
  next_3: '向后 3 页'
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-pagination/Pagination.js











function noop() {}

// 是否是正整数
function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  var pageSize = p;
  if (typeof pageSize === 'undefined') {
    pageSize = state.statePageSize;
  }
  return Math.floor((props.total - 1) / pageSize) + 1;
}

/* harmony default export */ var Pagination = __webpack_exports__["a"] = ({
  name: 'Pagination',
  mixins: [BaseMixin["a" /* default */]],
  model: {
    prop: 'current',
    event: 'change.current'
  },
  props: {
    disabled: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string.def('rc-pagination'),
    selectPrefixCls: vue_types["a" /* default */].string.def('rc-select'),
    current: vue_types["a" /* default */].number,
    defaultCurrent: vue_types["a" /* default */].number.def(1),
    total: vue_types["a" /* default */].number.def(0),
    pageSize: vue_types["a" /* default */].number,
    defaultPageSize: vue_types["a" /* default */].number.def(10),
    hideOnSinglePage: vue_types["a" /* default */].bool.def(false),
    showSizeChanger: vue_types["a" /* default */].bool.def(false),
    showLessItems: vue_types["a" /* default */].bool.def(false),
    // showSizeChange: PropTypes.func.def(noop),
    selectComponentClass: vue_types["a" /* default */].any,
    showPrevNextJumpers: vue_types["a" /* default */].bool.def(true),
    showQuickJumper: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].bool, vue_types["a" /* default */].object]).def(false),
    showTitle: vue_types["a" /* default */].bool.def(true),
    pageSizeOptions: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string),
    buildOptionText: vue_types["a" /* default */].func,
    showTotal: vue_types["a" /* default */].func,
    simple: vue_types["a" /* default */].bool,
    locale: vue_types["a" /* default */].object.def(zh_CN),
    itemRender: vue_types["a" /* default */].func.def(defaultItemRender),
    prevIcon: vue_types["a" /* default */].any,
    nextIcon: vue_types["a" /* default */].any,
    jumpPrevIcon: vue_types["a" /* default */].any,
    jumpNextIcon: vue_types["a" /* default */].any
  },
  data: function data() {
    var hasOnChange = this.onChange !== noop;
    var hasCurrent = Object(props_util["q" /* hasProp */])(this, 'current');
    if (hasCurrent && !hasOnChange) {
      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
    }
    var current = this.defaultCurrent;
    if (hasCurrent) {
      current = this.current;
    }

    var pageSize = this.defaultPageSize;
    if (Object(props_util["q" /* hasProp */])(this, 'pageSize')) {
      pageSize = this.pageSize;
    }

    return {
      stateCurrent: current,
      stateCurrentInputValue: current,
      statePageSize: pageSize
    };
  },

  watch: {
    current: function current(val) {
      this.setState({
        stateCurrent: val,
        stateCurrentInputValue: val
      });
    },
    pageSize: function pageSize(val) {
      var newState = {};
      var current = this.stateCurrent;
      var newCurrent = calculatePage(val, this.$data, this.$props);
      current = current > newCurrent ? newCurrent : current;
      if (!Object(props_util["q" /* hasProp */])(this, 'current')) {
        newState.stateCurrent = current;
        newState.stateCurrentInputValue = current;
      }
      newState.statePageSize = val;
      this.setState(newState);
    },
    stateCurrent: function stateCurrent(val, oldValue) {
      var _this = this;

      // When current page change, fix focused style of prev item
      // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
      this.$nextTick(function () {
        if (_this.$refs.paginationNode) {
          var lastCurrentNode = _this.$refs.paginationNode.querySelector('.' + _this.prefixCls + '-item-' + oldValue);
          if (lastCurrentNode && document.activeElement === lastCurrentNode) {
            lastCurrentNode.blur();
          }
        }
      });
    }
  },
  methods: {
    getJumpPrevPage: function getJumpPrevPage() {
      return Math.max(1, this.stateCurrent - (this.showLessItems ? 3 : 5));
    },
    getJumpNextPage: function getJumpNextPage() {
      return Math.min(calculatePage(undefined, this.$data, this.$props), this.stateCurrent + (this.showLessItems ? 3 : 5));
    },
    getItemIcon: function getItemIcon(icon) {
      var h = this.$createElement;
      var prefixCls = this.$props.prefixCls;

      var iconNode = Object(props_util["g" /* getComponentFromProp */])(this, icon, this.$props) || h('a', { 'class': prefixCls + '-item-link' });
      return iconNode;
    },
    getValidValue: function getValidValue(e) {
      var inputValue = e.target.value;
      var stateCurrentInputValue = this.$data.stateCurrentInputValue;

      var value = void 0;
      if (inputValue === '') {
        value = inputValue;
      } else if (isNaN(Number(inputValue))) {
        value = stateCurrentInputValue;
      } else {
        value = Number(inputValue);
      }
      return value;
    },
    isValid: function isValid(page) {
      return isInteger(page) && page >= 1 && page !== this.stateCurrent;
    },
    shouldDisplayQuickJumper: function shouldDisplayQuickJumper() {
      var _$props = this.$props,
          showQuickJumper = _$props.showQuickJumper,
          pageSize = _$props.pageSize,
          total = _$props.total;

      if (total <= pageSize) {
        return false;
      }
      return showQuickJumper;
    },

    // calculatePage (p) {
    //   let pageSize = p
    //   if (typeof pageSize === 'undefined') {
    //     pageSize = this.statePageSize
    //   }
    //   return Math.floor((this.total - 1) / pageSize) + 1
    // },
    handleKeyDown: function handleKeyDown(event) {
      if (event.keyCode === KeyCode.ARROW_UP || event.keyCode === KeyCode.ARROW_DOWN) {
        event.preventDefault();
      }
    },
    handleKeyUp: function handleKeyUp(e) {
      if (e.target.composing) return;
      var value = this.getValidValue(e);
      var stateCurrentInputValue = this.stateCurrentInputValue;

      if (value !== stateCurrentInputValue) {
        this.setState({
          stateCurrentInputValue: value
        });
      }

      if (e.keyCode === KeyCode.ENTER) {
        this.handleChange(value);
      } else if (e.keyCode === KeyCode.ARROW_UP) {
        this.handleChange(value - 1);
      } else if (e.keyCode === KeyCode.ARROW_DOWN) {
        this.handleChange(value + 1);
      }
    },
    changePageSize: function changePageSize(size) {
      var current = this.stateCurrent;
      var preCurrent = current;
      var newCurrent = calculatePage(size, this.$data, this.$props);
      current = current > newCurrent ? newCurrent : current;
      // fix the issue:
      // Once 'total' is 0, 'current' in 'onShowSizeChange' is 0, which is not correct.
      if (newCurrent === 0) {
        current = this.stateCurrent;
      }
      if (typeof size === 'number') {
        if (!Object(props_util["q" /* hasProp */])(this, 'pageSize')) {
          this.setState({
            statePageSize: size
          });
        }
        if (!Object(props_util["q" /* hasProp */])(this, 'current')) {
          this.setState({
            stateCurrent: current,
            stateCurrentInputValue: current
          });
        }
      }
      this.$emit('update:pageSize', size);
      this.$emit('showSizeChange', current, size);
      if (current !== preCurrent) {
        this.$emit('change.current', current, size);
      }
    },
    handleChange: function handleChange(p) {
      var disabled = this.$props.disabled;

      var page = p;
      if (this.isValid(page) && !disabled) {
        var currentPage = calculatePage(undefined, this.$data, this.$props);
        if (page > currentPage) {
          page = currentPage;
        }
        if (!Object(props_util["q" /* hasProp */])(this, 'current')) {
          this.setState({
            stateCurrent: page,
            stateCurrentInputValue: page
          });
        }
        // this.$emit('input', page)
        this.$emit('change', page, this.statePageSize);
        this.$emit('change.current', page, this.statePageSize);
        return page;
      }
      return this.stateCurrent;
    },
    prev: function prev() {
      if (this.hasPrev()) {
        this.handleChange(this.stateCurrent - 1);
      }
    },
    next: function next() {
      if (this.hasNext()) {
        this.handleChange(this.stateCurrent + 1);
      }
    },
    jumpPrev: function jumpPrev() {
      this.handleChange(this.getJumpPrevPage());
    },
    jumpNext: function jumpNext() {
      this.handleChange(this.getJumpNextPage());
    },
    hasPrev: function hasPrev() {
      return this.stateCurrent > 1;
    },
    hasNext: function hasNext() {
      return this.stateCurrent < calculatePage(undefined, this.$data, this.$props);
    },
    runIfEnter: function runIfEnter(event, callback) {
      if (event.key === 'Enter' || event.charCode === 13) {
        for (var _len = arguments.length, restParams = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          restParams[_key - 2] = arguments[_key];
        }

        callback.apply(undefined, toConsumableArray_default()(restParams));
      }
    },
    runIfEnterPrev: function runIfEnterPrev(event) {
      this.runIfEnter(event, this.prev);
    },
    runIfEnterNext: function runIfEnterNext(event) {
      this.runIfEnter(event, this.next);
    },
    runIfEnterJumpPrev: function runIfEnterJumpPrev(event) {
      this.runIfEnter(event, this.jumpPrev);
    },
    runIfEnterJumpNext: function runIfEnterJumpNext(event) {
      this.runIfEnter(event, this.jumpNext);
    },
    handleGoTO: function handleGoTO(event) {
      if (event.keyCode === KeyCode.ENTER || event.type === 'click') {
        this.handleChange(this.stateCurrentInputValue);
      }
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var _$props2 = this.$props,
        prefixCls = _$props2.prefixCls,
        disabled = _$props2.disabled;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager

    if (this.hideOnSinglePage === true && this.total <= this.statePageSize) {
      return null;
    }
    var props = this.$props;
    var locale = this.locale;

    var allPages = calculatePage(undefined, this.$data, this.$props);
    var pagerList = [];
    var jumpPrev = null;
    var jumpNext = null;
    var firstPager = null;
    var lastPager = null;
    var gotoButton = null;
    var goButton = this.showQuickJumper && this.showQuickJumper.goButton;
    var pageBufferSize = this.showLessItems ? 1 : 2;
    var stateCurrent = this.stateCurrent,
        statePageSize = this.statePageSize;

    var prevPage = stateCurrent - 1 > 0 ? stateCurrent - 1 : 0;
    var nextPage = stateCurrent + 1 < allPages ? stateCurrent + 1 : allPages;

    if (this.simple) {
      if (goButton) {
        if (typeof goButton === 'boolean') {
          gotoButton = h(
            'button',
            {
              attrs: { type: 'button' },
              on: {
                'click': this.handleGoTO,
                'keyup': this.handleGoTO
              }
            },
            [locale.jump_to_confirm]
          );
        } else {
          gotoButton = h(
            'span',
            {
              on: {
                'click': this.handleGoTO,
                'keyup': this.handleGoTO
              }
            },
            [goButton]
          );
        }
        gotoButton = h(
          'li',
          {
            attrs: {
              title: this.showTitle ? '' + locale.jump_to + this.stateCurrent + '/' + allPages : null
            },
            'class': prefixCls + '-simple-pager'
          },
          [gotoButton]
        );
      }
      var hasPrev = this.hasPrev();
      var hasNext = this.hasNext();
      return h(
        'ul',
        { 'class': prefixCls + ' ' + prefixCls + '-simple' },
        [h(
          'li',
          {
            attrs: {
              title: this.showTitle ? locale.prev_page : null,

              tabIndex: hasPrev ? 0 : null,

              'aria-disabled': !this.hasPrev()
            },
            on: {
              'click': this.prev,
              'keypress': this.runIfEnterPrev
            },

            'class': (hasPrev ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-prev' },
          [this.itemRender(prevPage, 'prev', this.getItemIcon('prevIcon'))]
        ), h(
          'li',
          {
            attrs: {
              title: this.showTitle ? stateCurrent + '/' + allPages : null
            },
            'class': prefixCls + '-simple-pager'
          },
          [h('input', babel_helper_vue_jsx_merge_props_default()([{
            attrs: {
              type: 'text',

              size: '3'
            },
            domProps: {
              'value': this.stateCurrentInputValue
            },
            on: {
              'keydown': this.handleKeyDown,
              'keyup': this.handleKeyUp,
              'input': this.handleKeyUp
            }
          }, {
            directives: [{
              name: 'ant-input'
            }]
          }])), h(
            'span',
            { 'class': prefixCls + '-slash' },
            ['\uFF0F']
          ), allPages]
        ), h(
          'li',
          {
            attrs: {
              title: this.showTitle ? locale.next_page : null,

              tabIndex: this.hasNext ? 0 : null,

              'aria-disabled': !this.hasNext()
            },
            on: {
              'click': this.next,
              'keypress': this.runIfEnterNext
            },

            'class': (hasNext ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-next' },
          [this.itemRender(nextPage, 'next', this.getItemIcon('nextIcon'))]
        ), gotoButton]
      );
    }
    if (allPages <= 5 + pageBufferSize * 2) {
      var pagerProps = {
        props: {
          locale: locale,
          rootPrefixCls: prefixCls,
          showTitle: props.showTitle,
          itemRender: props.itemRender
        },
        on: {
          click: this.handleChange,
          keypress: this.runIfEnter
        }
      };
      if (!allPages) {
        pagerList.push(h(Pager, babel_helper_vue_jsx_merge_props_default()([pagerProps, { key: 'noPager', attrs: { page: allPages },
          'class': prefixCls + '-disabled' }])));
      }
      for (var i = 1; i <= allPages; i++) {
        var active = stateCurrent === i;
        pagerList.push(h(Pager, babel_helper_vue_jsx_merge_props_default()([pagerProps, { key: i, attrs: { page: i, active: active }
        }])));
      }
    } else {
      var prevItemTitle = this.showLessItems ? locale.prev_3 : locale.prev_5;
      var nextItemTitle = this.showLessItems ? locale.next_3 : locale.next_5;
      if (this.showPrevNextJumpers) {
        var jumpPrevClassString = prefixCls + '-jump-prev';
        if (props.jumpPrevIcon) {
          jumpPrevClassString += ' ' + prefixCls + '-jump-prev-custom-icon';
        }
        jumpPrev = h(
          'li',
          {
            attrs: {
              title: this.showTitle ? prevItemTitle : null,

              tabIndex: '0'
            },
            key: 'prev',
            on: {
              'click': this.jumpPrev,
              'keypress': this.runIfEnterJumpPrev
            },

            'class': jumpPrevClassString
          },
          [this.itemRender(this.getJumpPrevPage(), 'jump-prev', this.getItemIcon('jumpPrevIcon'))]
        );
        var jumpNextClassString = prefixCls + '-jump-next';
        if (props.jumpNextIcon) {
          jumpNextClassString += ' ' + prefixCls + '-jump-next-custom-icon';
        }
        jumpNext = h(
          'li',
          {
            attrs: {
              title: this.showTitle ? nextItemTitle : null,

              tabIndex: '0'
            },
            key: 'next', on: {
              'click': this.jumpNext,
              'keypress': this.runIfEnterJumpNext
            },

            'class': jumpNextClassString
          },
          [this.itemRender(this.getJumpNextPage(), 'jump-next', this.getItemIcon('jumpNextIcon'))]
        );
      }

      lastPager = h(Pager, {
        attrs: {
          locale: locale,
          last: true,
          rootPrefixCls: prefixCls,

          page: allPages,
          active: false,
          showTitle: this.showTitle,
          itemRender: this.itemRender
        },
        on: {
          'click': this.handleChange,
          'keypress': this.runIfEnter
        },

        key: allPages });
      firstPager = h(Pager, {
        attrs: {
          locale: locale,
          rootPrefixCls: prefixCls,

          page: 1,
          active: false,
          showTitle: this.showTitle,
          itemRender: this.itemRender
        },
        on: {
          'click': this.handleChange,
          'keypress': this.runIfEnter
        },

        key: 1 });

      var left = Math.max(1, stateCurrent - pageBufferSize);
      var right = Math.min(stateCurrent + pageBufferSize, allPages);

      if (stateCurrent - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - stateCurrent <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (var _i = left; _i <= right; _i++) {
        var _active = stateCurrent === _i;
        pagerList.push(h(Pager, {
          attrs: {
            locale: locale,
            rootPrefixCls: prefixCls,

            page: _i,
            active: _active,
            showTitle: this.showTitle,
            itemRender: this.itemRender
          },
          on: {
            'click': this.handleChange,
            'keypress': this.runIfEnter
          },

          key: _i }));
      }

      if (stateCurrent - 1 >= pageBufferSize * 2 && stateCurrent !== 1 + 2) {
        pagerList[0] = h(Pager, {
          attrs: {
            locale: locale,
            rootPrefixCls: prefixCls,

            page: left,

            active: false,
            showTitle: this.showTitle,
            itemRender: this.itemRender
          },
          on: {
            'click': this.handleChange,
            'keypress': this.runIfEnter
          },

          key: left, 'class': prefixCls + '-item-after-jump-prev' });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - stateCurrent >= pageBufferSize * 2 && stateCurrent !== allPages - 2) {
        pagerList[pagerList.length - 1] = h(Pager, {
          attrs: {
            locale: locale,
            rootPrefixCls: prefixCls,

            page: right,

            active: false,
            showTitle: this.showTitle,
            itemRender: this.itemRender
          },
          on: {
            'click': this.handleChange,
            'keypress': this.runIfEnter
          },

          key: right, 'class': prefixCls + '-item-before-jump-next' });
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    var totalText = null;

    if (this.showTotal) {
      totalText = h(
        'li',
        { 'class': prefixCls + '-total-text' },
        [this.showTotal(this.total, [this.total === 0 ? 0 : (stateCurrent - 1) * statePageSize + 1, stateCurrent * statePageSize > this.total ? this.total : stateCurrent * statePageSize])]
      );
    }
    var prevDisabled = !this.hasPrev() || !allPages;
    var nextDisabled = !this.hasNext() || !allPages;
    var buildOptionText = this.buildOptionText || this.$scopedSlots.buildOptionText;
    return h(
      'ul',
      {
        'class': (_ref = {}, defineProperty_default()(_ref, '' + prefixCls, true), defineProperty_default()(_ref, prefixCls + '-disabled', disabled), _ref),
        attrs: { unselectable: 'unselectable'
        },
        ref: 'paginationNode'
      },
      [totalText, h(
        'li',
        {
          attrs: {
            title: this.showTitle ? locale.prev_page : null,

            tabIndex: prevDisabled ? null : 0,

            'aria-disabled': prevDisabled
          },
          on: {
            'click': this.prev,
            'keypress': this.runIfEnterPrev
          },

          'class': (!prevDisabled ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-prev' },
        [this.itemRender(prevPage, 'prev', this.getItemIcon('prevIcon'))]
      ), pagerList, h(
        'li',
        {
          attrs: {
            title: this.showTitle ? locale.next_page : null,

            tabIndex: nextDisabled ? null : 0,

            'aria-disabled': nextDisabled
          },
          on: {
            'click': this.next,
            'keypress': this.runIfEnterNext
          },

          'class': (!nextDisabled ? '' : prefixCls + '-disabled') + ' ' + prefixCls + '-next' },
        [this.itemRender(nextPage, 'next', this.getItemIcon('nextIcon'))]
      ), h(Options, {
        attrs: {
          disabled: disabled,
          locale: locale,
          rootPrefixCls: prefixCls,
          selectComponentClass: this.selectComponentClass,
          selectPrefixCls: this.selectPrefixCls,
          changeSize: this.showSizeChanger ? this.changePageSize : null,
          current: stateCurrent,
          pageSize: statePageSize,
          pageSizeOptions: this.pageSizeOptions,
          buildOptionText: buildOptionText || null,
          quickGo: this.shouldDisplayQuickJumper() ? this.handleChange : null,
          goButton: goButton
        }
      })]
    );
  }
});

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~d41b2a03.fd410b22.js.map