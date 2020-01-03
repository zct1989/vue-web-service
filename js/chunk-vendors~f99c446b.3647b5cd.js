(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~f99c446b"],{

/***/ "1462":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/omit.js/es/index.js
var es = __webpack_require__("0464");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/store/connect.js
var connect = __webpack_require__("e90a");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/util.js
var util = __webpack_require__("2b89");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var ResizeObserver_es = __webpack_require__("6dd8");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/SubMenu.js + 1 modules
var SubMenu = __webpack_require__("a3a2");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/DOMWrap.js












var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var MENUITEM_OVERFLOWED_CLASSNAME = 'menuitem-overflowed';
var FLOAT_PRECISION_ADJUST = 0.5;

// Fix ssr
if (canUseDOM) {
  __webpack_require__("0cdd");
}

var DOMWrap = {
  name: 'DOMWrap',
  mixins: [BaseMixin["a" /* default */]],
  data: function data() {
    this.resizeObserver = null;
    this.mutationObserver = null;

    // original scroll size of the list
    this.originalTotalWidth = 0;

    // copy of overflowed items
    this.overflowedItems = [];

    // cache item of the original items (so we can track the size and order)
    this.menuItemSizes = [];
    return {
      lastVisibleIndex: undefined
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.setChildrenWidthAndResize();
      if (_this.level === 1 && _this.mode === 'horizontal') {
        var menuUl = _this.$el;
        if (!menuUl) {
          return;
        }
        _this.resizeObserver = new ResizeObserver_es["a" /* default */](function (entries) {
          entries.forEach(_this.setChildrenWidthAndResize);
        });

        [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
          _this.resizeObserver.observe(el);
        });

        if (typeof MutationObserver !== 'undefined') {
          _this.mutationObserver = new MutationObserver(function () {
            _this.resizeObserver.disconnect();
            [].slice.call(menuUl.children).concat(menuUl).forEach(function (el) {
              _this.resizeObserver.observe(el);
            });
            _this.setChildrenWidthAndResize();
          });
          _this.mutationObserver.observe(menuUl, {
            attributes: false,
            childList: true,
            subTree: false
          });
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.resizeObserver.disconnect();
    }
  },

  methods: {
    // get all valid menuItem nodes
    getMenuItemNodes: function getMenuItemNodes() {
      var prefixCls = this.$props.prefixCls;

      var ul = this.$el;
      if (!ul) {
        return [];
      }

      // filter out all overflowed indicator placeholder
      return [].slice.call(ul.children).filter(function (node) {
        return node.className.split(' ').indexOf(prefixCls + '-overflowed-submenu') < 0;
      });
    },
    getOverflowedSubMenuItem: function getOverflowedSubMenuItem(keyPrefix, overflowedItems, renderPlaceholder) {
      var h = this.$createElement;
      var _$props = this.$props,
          overflowedIndicator = _$props.overflowedIndicator,
          level = _$props.level,
          mode = _$props.mode,
          prefixCls = _$props.prefixCls,
          theme = _$props.theme;

      if (level !== 1 || mode !== 'horizontal') {
        return null;
      }
      // put all the overflowed item inside a submenu
      // with a title of overflow indicator ('...')
      var copy = this.$slots['default'][0];

      var _getPropsData = Object(props_util["k" /* getPropsData */])(copy),
          title = _getPropsData.title,
          eventKey = _getPropsData.eventKey,
          rest = objectWithoutProperties_default()(_getPropsData, ['title', 'eventKey']); // eslint-disable-line no-unused-vars

      var style = {};
      var key = keyPrefix + '-overflowed-indicator';

      if (overflowedItems.length === 0 && renderPlaceholder !== true) {
        style = {
          display: 'none'
        };
      } else if (renderPlaceholder) {
        style = {
          visibility: 'hidden',
          // prevent from taking normal dom space
          position: 'absolute'
        };
        key = key + '-placeholder';
      }

      var popupClassName = theme ? prefixCls + '-' + theme : '';
      var props = {};
      util["g" /* menuAllProps */].props.forEach(function (k) {
        if (rest[k] !== undefined) {
          props[k] = rest[k];
        }
      });
      var subMenuProps = {
        props: extends_default()({
          title: overflowedIndicator,
          popupClassName: popupClassName
        }, props, {
          eventKey: keyPrefix + '-overflowed-indicator',
          disabled: false
        }),
        'class': prefixCls + '-overflowed-submenu',
        key: key,
        style: style,
        on: Object(props_util["h" /* getEvents */])(copy)
      };

      return h(
        SubMenu["a" /* default */],
        subMenuProps,
        [overflowedItems]
      );
    },


    // memorize rendered menuSize
    setChildrenWidthAndResize: function setChildrenWidthAndResize() {
      if (this.mode !== 'horizontal') {
        return;
      }
      var ul = this.$el;

      if (!ul) {
        return;
      }

      var ulChildrenNodes = ul.children;

      if (!ulChildrenNodes || ulChildrenNodes.length === 0) {
        return;
      }

      var lastOverflowedIndicatorPlaceholder = ul.children[ulChildrenNodes.length - 1];

      // need last overflowed indicator for calculating length;
      Object(util["i" /* setStyle */])(lastOverflowedIndicatorPlaceholder, 'display', 'inline-block');

      var menuItemNodes = this.getMenuItemNodes();

      // reset display attribute for all hidden elements caused by overflow to calculate updated width
      // and then reset to original state after width calculation

      var overflowedItems = menuItemNodes.filter(function (c) {
        return c.className.split(' ').indexOf(MENUITEM_OVERFLOWED_CLASSNAME) >= 0;
      });

      overflowedItems.forEach(function (c) {
        Object(util["i" /* setStyle */])(c, 'display', 'inline-block');
      });

      this.menuItemSizes = menuItemNodes.map(function (c) {
        return Object(util["c" /* getWidth */])(c);
      });

      overflowedItems.forEach(function (c) {
        Object(util["i" /* setStyle */])(c, 'display', 'none');
      });
      this.overflowedIndicatorWidth = Object(util["c" /* getWidth */])(ul.children[ul.children.length - 1]);
      this.originalTotalWidth = this.menuItemSizes.reduce(function (acc, cur) {
        return acc + cur;
      }, 0);
      this.handleResize();
      // prevent the overflowed indicator from taking space;
      Object(util["i" /* setStyle */])(lastOverflowedIndicatorPlaceholder, 'display', 'none');
    },
    handleResize: function handleResize() {
      var _this2 = this;

      if (this.mode !== 'horizontal') {
        return;
      }

      var ul = this.$el;
      if (!ul) {
        return;
      }
      var width = Object(util["c" /* getWidth */])(ul);

      this.overflowedItems = [];
      var currentSumWidth = 0;

      // index for last visible child in horizontal mode
      var lastVisibleIndex = void 0;

      // float number comparison could be problematic
      // e.g. 0.1 + 0.2 > 0.3 =====> true
      // thus using FLOAT_PRECISION_ADJUST as buffer to help the situation
      if (this.originalTotalWidth > width + FLOAT_PRECISION_ADJUST) {
        lastVisibleIndex = -1;

        this.menuItemSizes.forEach(function (liWidth) {
          currentSumWidth += liWidth;
          if (currentSumWidth + _this2.overflowedIndicatorWidth <= width) {
            lastVisibleIndex++;
          }
        });
      }

      this.setState({ lastVisibleIndex: lastVisibleIndex });
    },
    renderChildren: function renderChildren(children) {
      var _this3 = this;

      // need to take care of overflowed items in horizontal mode
      var lastVisibleIndex = this.$data.lastVisibleIndex;

      var className = Object(props_util["f" /* getClass */])(this);
      return (children || []).reduce(function (acc, childNode, index) {
        var item = childNode;
        var eventKey = Object(props_util["k" /* getPropsData */])(childNode).eventKey;
        if (_this3.mode === 'horizontal') {
          var overflowed = _this3.getOverflowedSubMenuItem(eventKey, []);
          if (lastVisibleIndex !== undefined && className[_this3.prefixCls + '-root'] !== -1) {
            if (index > lastVisibleIndex) {
              item = Object(vnode["a" /* cloneElement */])(childNode,
              // 这里修改 eventKey 是为了防止隐藏状态下还会触发 openkeys 事件
              {
                style: { display: 'none' },
                props: { eventKey: eventKey + '-hidden' },
                'class': extends_default()({}, Object(props_util["f" /* getClass */])(childNode), defineProperty_default()({}, MENUITEM_OVERFLOWED_CLASSNAME, true))
              });
            }
            if (index === lastVisibleIndex + 1) {
              _this3.overflowedItems = children.slice(lastVisibleIndex + 1).map(function (c) {
                return Object(vnode["a" /* cloneElement */])(c,
                // children[index].key will become '.$key' in clone by default,
                // we have to overwrite with the correct key explicitly
                { key: Object(props_util["k" /* getPropsData */])(c).eventKey, props: { mode: 'vertical-left' } });
              });

              overflowed = _this3.getOverflowedSubMenuItem(eventKey, _this3.overflowedItems);
            }
          }

          var ret = [].concat(toConsumableArray_default()(acc), [overflowed, item]);

          if (index === children.length - 1) {
            // need a placeholder for calculating overflowed indicator width
            ret.push(_this3.getOverflowedSubMenuItem(eventKey, [], true));
          }
          return ret;
        }
        return [].concat(toConsumableArray_default()(acc), [item]);
      }, []);
    }
  },

  render: function render() {
    var h = arguments[0];

    var Tag = this.$props.tag;
    var tagProps = {
      on: this.$listeners
    };
    return h(
      Tag,
      tagProps,
      [this.renderChildren(this.$slots['default'])]
    );
  }
};

DOMWrap.props = {
  mode: vue_types["a" /* default */].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
  prefixCls: vue_types["a" /* default */].string,
  level: vue_types["a" /* default */].number,
  theme: vue_types["a" /* default */].string,
  overflowedIndicator: vue_types["a" /* default */].node,
  visible: vue_types["a" /* default */].bool,
  hiddenClassName: vue_types["a" /* default */].string,
  tag: vue_types["a" /* default */].string.def('div')
};

/* harmony default export */ var vc_menu_DOMWrap = (DOMWrap);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/SubPopupMenu.js
/* unused harmony export saveRef */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getActiveKey; });














function allDisabled(arr) {
  if (!arr.length) {
    return true;
  }
  return arr.every(function (c) {
    return !!c.disabled;
  });
}

function updateActiveKey(store, menuId, activeKey) {
  var state = store.getState();
  store.setState({
    activeKey: extends_default()({}, state.activeKey, defineProperty_default()({}, menuId, activeKey))
  });
}

function getEventKey(props) {
  // when eventKey not available ,it's menu and return menu id '0-menu-'
  return props.eventKey || '0-menu-';
}

function saveRef(key, c) {
  if (c) {
    var index = this.instanceArrayKeyIndexMap[key];
    this.instanceArray[index] = c;
  }
}
function getActiveKey(props, originalActiveKey) {
  var activeKey = originalActiveKey;
  var eventKey = props.eventKey,
      defaultActiveFirst = props.defaultActiveFirst,
      children = props.children;

  if (activeKey !== undefined && activeKey !== null) {
    var found = void 0;
    Object(util["e" /* loopMenuItem */])(children, function (c, i) {
      var propsData = c.componentOptions.propsData || {};
      if (c && !propsData.disabled && activeKey === Object(util["a" /* getKeyFromChildrenIndex */])(c, eventKey, i)) {
        found = true;
      }
    });
    if (found) {
      return activeKey;
    }
  }
  activeKey = null;
  if (defaultActiveFirst) {
    Object(util["e" /* loopMenuItem */])(children, function (c, i) {
      var propsData = c.componentOptions.propsData || {};
      if (!activeKey && c && !propsData.disabled) {
        activeKey = Object(util["a" /* getKeyFromChildrenIndex */])(c, eventKey, i);
      }
    });
    return activeKey;
  }
  return activeKey;
}

var SubPopupMenu = {
  name: 'SubPopupMenu',
  props: Object(props_util["r" /* initDefaultProps */])({
    // onSelect: PropTypes.func,
    // onClick: PropTypes.func,
    // onDeselect: PropTypes.func,
    // onOpenChange: PropTypes.func,
    // onDestroy: PropTypes.func,
    prefixCls: vue_types["a" /* default */].string,
    openTransitionName: vue_types["a" /* default */].string,
    openAnimation: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    openKeys: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number])),
    visible: vue_types["a" /* default */].bool,
    parentMenu: vue_types["a" /* default */].object,
    eventKey: vue_types["a" /* default */].string,
    store: vue_types["a" /* default */].object,

    // adding in refactor
    focusable: vue_types["a" /* default */].bool,
    multiple: vue_types["a" /* default */].bool,
    defaultActiveFirst: vue_types["a" /* default */].bool,
    activeKey: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    selectedKeys: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number])),
    defaultSelectedKeys: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number])),
    defaultOpenKeys: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number])),
    level: vue_types["a" /* default */].number,
    mode: vue_types["a" /* default */].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']),
    triggerSubMenuAction: vue_types["a" /* default */].oneOf(['click', 'hover']),
    inlineIndent: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string]),
    manualRef: vue_types["a" /* default */].func,
    itemIcon: vue_types["a" /* default */].any,
    expandIcon: vue_types["a" /* default */].any,
    overflowedIndicator: vue_types["a" /* default */].any,
    children: vue_types["a" /* default */].any.def([]),
    __propsSymbol__: vue_types["a" /* default */].any // mock componentWillReceiveProps
  }, {
    prefixCls: 'rc-menu',
    mode: 'vertical',
    level: 1,
    inlineIndent: 24,
    visible: true,
    focusable: true,
    manualRef: util["h" /* noop */]
  }),

  mixins: [BaseMixin["a" /* default */]],
  created: function created() {
    var props = Object(props_util["j" /* getOptionProps */])(this);
    this.prevProps = extends_default()({}, props);
    props.store.setState({
      activeKey: extends_default()({}, props.store.getState().activeKey, defineProperty_default()({}, props.eventKey, getActiveKey(props, props.activeKey)))
    });
    this.instanceArray = [];
  },
  mounted: function mounted() {
    // invoke customized ref to expose component to mixin
    if (this.manualRef) {
      this.manualRef(this);
    }
  },
  updated: function updated() {
    var props = Object(props_util["j" /* getOptionProps */])(this);
    var prevProps = this.prevProps;
    var originalActiveKey = 'activeKey' in props ? props.activeKey : props.store.getState().activeKey[getEventKey(props)];
    var activeKey = getActiveKey(props, originalActiveKey);
    if (activeKey !== originalActiveKey) {
      updateActiveKey(props.store, getEventKey(props), activeKey);
    } else if ('activeKey' in prevProps) {
      // If prev activeKey is not same as current activeKey,
      // we should set it.
      var prevActiveKey = getActiveKey(prevProps, prevProps.activeKey);
      if (activeKey !== prevActiveKey) {
        updateActiveKey(props.store, getEventKey(props), activeKey);
      }
    }
    this.prevProps = extends_default()({}, props);
  },

  methods: {
    // all keyboard events callbacks run from here at first
    onKeyDown: function onKeyDown(e, callback) {
      var keyCode = e.keyCode;
      var handled = void 0;
      this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.active && obj.onKeyDown) {
          handled = obj.onKeyDown(e);
        }
      });
      if (handled) {
        return 1;
      }
      var activeItem = null;
      if (keyCode === KeyCode["a" /* default */].UP || keyCode === KeyCode["a" /* default */].DOWN) {
        activeItem = this.step(keyCode === KeyCode["a" /* default */].UP ? -1 : 1);
      }
      if (activeItem) {
        e.preventDefault();
        updateActiveKey(this.$props.store, getEventKey(this.$props), activeItem.eventKey);

        if (typeof callback === 'function') {
          callback(activeItem);
        }

        return 1;
      }
    },
    onItemHover: function onItemHover(e) {
      var key = e.key,
          hover = e.hover;

      updateActiveKey(this.$props.store, getEventKey(this.$props), hover ? key : null);
    },
    onDeselect: function onDeselect(selectInfo) {
      this.__emit('deselect', selectInfo);
    },
    onSelect: function onSelect(selectInfo) {
      this.__emit('select', selectInfo);
    },
    onClick: function onClick(e) {
      this.__emit('click', e);
    },
    onOpenChange: function onOpenChange(e) {
      this.__emit('openChange', e);
    },
    onDestroy: function onDestroy(key) {
      this.__emit('destroy', key);
    },
    getFlatInstanceArray: function getFlatInstanceArray() {
      return this.instanceArray;
    },
    getOpenTransitionName: function getOpenTransitionName() {
      return this.$props.openTransitionName;
    },
    step: function step(direction) {
      var children = this.getFlatInstanceArray();
      var activeKey = this.$props.store.getState().activeKey[getEventKey(this.$props)];
      var len = children.length;
      if (!len) {
        return null;
      }
      if (direction < 0) {
        children = children.concat().reverse();
      }
      // find current activeIndex
      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }
        return true;
      });
      if (!this.defaultActiveFirst && activeIndex !== -1 && allDisabled(children.slice(activeIndex, len - 1))) {
        return undefined;
      }
      var start = (activeIndex + 1) % len;
      var i = start;

      do {
        var child = children[i];
        if (!child || child.disabled) {
          i = (i + 1) % len;
        } else {
          return child;
        }
      } while (i !== start);

      return null;
    },
    getIcon: function getIcon(instance, name) {
      if (instance.$createElement) {
        var temp = instance[name];
        if (temp !== undefined) {
          return temp;
        }
        return instance.$slots[name] || instance.$scopedSlots[name];
      } else {
        var _temp = Object(props_util["k" /* getPropsData */])(instance)[name];
        if (_temp !== undefined) {
          return _temp;
        }
        var slotsProp = [];
        var componentOptions = instance.componentOptions || {};
        (componentOptions.children || []).forEach(function (child) {
          if (child.data && child.data.slot === name) {
            if (child.tag === 'template') {
              slotsProp.push(child.children);
            } else {
              slotsProp.push(child);
            }
          }
        });
        return slotsProp.length ? slotsProp : undefined;
      }
    },
    renderCommonMenuItem: function renderCommonMenuItem(child, i, extraProps) {
      var _this = this;

      if (child.tag === undefined) {
        return child;
      }
      var state = this.$props.store.getState();
      var props = this.$props;
      var key = Object(util["a" /* getKeyFromChildrenIndex */])(child, props.eventKey, i);
      var childProps = child.componentOptions.propsData || {};

      var isActive = key === state.activeKey[getEventKey(this.$props)];
      if (!childProps.disabled) {
        // manualRef的执行顺序不能保证，使用key映射ref在this.instanceArray中的位置
        this.instanceArrayKeyIndexMap[key] = Object.keys(this.instanceArrayKeyIndexMap).length;
      }
      var childListeners = Object(props_util["h" /* getEvents */])(child);
      var newChildProps = {
        props: extends_default()({
          mode: childProps.mode || props.mode,
          level: props.level,
          inlineIndent: props.inlineIndent,
          renderMenuItem: this.renderMenuItem,
          rootPrefixCls: props.prefixCls,
          index: i,
          parentMenu: props.parentMenu,
          // customized ref function, need to be invoked manually in child's componentDidMount
          manualRef: childProps.disabled ? util["h" /* noop */] : saveRef.bind(this, key),
          eventKey: key,
          active: !childProps.disabled && isActive,
          multiple: props.multiple,
          openTransitionName: this.getOpenTransitionName(),
          openAnimation: props.openAnimation,
          subMenuOpenDelay: props.subMenuOpenDelay,
          subMenuCloseDelay: props.subMenuCloseDelay,
          forceSubMenuRender: props.forceSubMenuRender,
          builtinPlacements: props.builtinPlacements,
          itemIcon: this.getIcon(child, 'itemIcon') || this.getIcon(this, 'itemIcon'),
          expandIcon: this.getIcon(child, 'expandIcon') || this.getIcon(this, 'expandIcon')
        }, extraProps),
        on: {
          click: function click(e) {
            if ('keyPath' in e) {
              (childListeners.click || util["h" /* noop */])(e);
              _this.onClick(e);
            }
          },
          itemHover: this.onItemHover,
          openChange: this.onOpenChange,
          deselect: this.onDeselect,
          // destroy: this.onDestroy,
          select: this.onSelect
        }
      };
      // ref: https://github.com/ant-design/ant-design/issues/13943
      if (props.mode === 'inline' || Object(util["d" /* isMobileDevice */])()) {
        newChildProps.props.triggerSubMenuAction = 'click';
      }
      return Object(vnode["a" /* cloneElement */])(child, newChildProps);
    },
    renderMenuItem: function renderMenuItem(c, i, subMenuKey) {
      if (!c) {
        return null;
      }
      var state = this.$props.store.getState();
      var extraProps = {
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        triggerSubMenuAction: this.triggerSubMenuAction,
        isRootMenu: false,
        subMenuKey: subMenuKey
      };
      return this.renderCommonMenuItem(c, i, extraProps);
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];

    var props = objectWithoutProperties_default()(this.$props, []);

    var eventKey = props.eventKey,
        prefixCls = props.prefixCls,
        visible = props.visible,
        level = props.level,
        mode = props.mode,
        theme = props.theme;

    this.instanceArray = [];
    this.instanceArrayKeyIndexMap = {};
    var className = classnames_default()(props.prefixCls, props.prefixCls + '-' + props.mode);
    var domWrapProps = {
      props: {
        tag: 'ul',
        // hiddenClassName: `${prefixCls}-hidden`,
        visible: visible,
        prefixCls: prefixCls,
        level: level,
        mode: mode,
        theme: theme,
        overflowedIndicator: Object(props_util["g" /* getComponentFromProp */])(this, 'overflowedIndicator')
      },
      attrs: {
        role: props.role || 'menu'
      },
      'class': className,
      // Otherwise, the propagated click event will trigger another onClick
      on: Object(es["a" /* default */])(this.$listeners || {}, ['click'])
    };
    // if (props.id) {
    //   domProps.id = props.id
    // }
    if (props.focusable) {
      domWrapProps.attrs.tabIndex = '0';
      domWrapProps.on.keydown = this.onKeyDown;
    }
    return (
      // ESLint is not smart enough to know that the type of `children` was checked.
      /* eslint-disable */
      h(
        vc_menu_DOMWrap,
        domWrapProps,
        [props.children.map(function (c, i) {
          return _this2.renderMenuItem(c, i, eventKey || '0-menu-');
        })]
      )
      /*eslint -enable */

    );
  }
};

/* harmony default export */ var vc_menu_SubPopupMenu = __webpack_exports__["a"] = (Object(connect["a" /* default */])()(SubPopupMenu));

/***/ }),

/***/ "22a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4d91");

/* harmony default export */ __webpack_exports__["a"] = ({
  prefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string.def('rc-menu'),
  focusable: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool.def(true),
  multiple: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool,
  defaultActiveFirst: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool,
  visible: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool.def(true),
  activeKey: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number]),
  selectedKeys: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])),
  defaultSelectedKeys: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])).def([]),
  defaultOpenKeys: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])).def([]),
  openKeys: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrayOf(_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number])),
  openAnimation: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].object]),
  mode: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']).def('vertical'),
  triggerSubMenuAction: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string.def('hover'),
  subMenuOpenDelay: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number.def(0.1),
  subMenuCloseDelay: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number.def(0.1),
  level: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number.def(1),
  inlineIndent: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].number.def(24),
  theme: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].oneOf(['light', 'dark']).def('light'),
  getPopupContainer: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].func,
  openTransitionName: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].string,
  forceSubMenuRender: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool,
  selectable: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool,
  isRootMenu: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bool.def(true),
  builtinPlacements: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].object.def({}),
  itemIcon: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].any,
  expandIcon: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].any,
  overflowedIndicator: _util_vue_types__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].any
});

/***/ }),

/***/ "2811":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-ref/index.js
var vue_ref = __webpack_require__("46cf");
var vue_ref_default = /*#__PURE__*/__webpack_require__.n(vue_ref);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/ContainerRender.js
var ContainerRender = __webpack_require__("98d3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getScrollBarSize.js
var getScrollBarSize = __webpack_require__("6f7a");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-drawer/src/drawerProps.js


/* harmony default export */ var drawerProps = ({
  wrapperClassName: vue_types["a" /* default */].string,
  width: vue_types["a" /* default */].any,
  height: vue_types["a" /* default */].any,
  defaultOpen: vue_types["a" /* default */].bool,
  firstEnter: vue_types["a" /* default */].bool,
  open: vue_types["a" /* default */].bool,
  prefixCls: vue_types["a" /* default */].string,
  placement: vue_types["a" /* default */].string,
  level: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].array]),
  levelMove: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].func, vue_types["a" /* default */].array]),
  ease: vue_types["a" /* default */].string,
  duration: vue_types["a" /* default */].string,
  getContainer: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].func, vue_types["a" /* default */].object, vue_types["a" /* default */].bool]),
  handler: vue_types["a" /* default */].any,
  showMask: vue_types["a" /* default */].bool,
  maskStyle: vue_types["a" /* default */].object,
  className: vue_types["a" /* default */].string,
  wrapStyle: vue_types["a" /* default */].object
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-drawer/src/utils.js
function dataToArray(vars) {
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}
var transitionEndObject = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend'
};
var transitionStr = Object.keys(transitionEndObject).filter(function (key) {
  if (typeof document === 'undefined') {
    return false;
  }
  var html = document.getElementsByTagName('html')[0];
  return key in (html ? html.style : {});
})[0];
var transitionEnd = transitionEndObject[transitionStr];

function addEventListener(target, eventType, callback, options) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
  }
}

function removeEventListener(target, eventType, callback, options) {
  if (target.removeEventListener) {
    target.removeEventListener(eventType, callback, options);
  } else if (target.attachEvent) {
    target.detachEvent('on' + eventType, callback);
  }
}

function transformArguments(arg, cb) {
  var result = void 0;
  if (typeof arg === 'function') {
    result = arg(cb);
  } else {
    result = arg;
  }
  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }
    return [result[0], result[1]];
  }
  return [result];
}

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value); // eslint-disable-line
};
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-drawer/src/Drawer.js















function noop() {}

var currentDrawer = {};
var windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);

vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });
var Drawer = {
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])(drawerProps, {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    firstEnter: false, // 记录首次进入.
    showMask: true,
    handler: true,
    maskStyle: {},
    wrapperClassName: '',
    className: ''
  }),
  data: function data() {
    this.levelDom = [];
    this.contentDom = null;
    this.maskDom = null;
    this.handlerdom = null;
    this.mousePos = null;
    this.sFirstEnter = this.firstEnter;
    this.timeout = null;
    this.children = null;
    this.drawerId = Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16);
    var open = this.open !== undefined ? this.open : !!this.defaultOpen;
    currentDrawer[this.drawerId] = open;
    this.orignalOpen = this.open;
    this.preProps = extends_default()({}, this.$props);
    return {
      sOpen: open
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!windowIsUndefined) {
        var passiveSupported = false;
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
          get: function get() {
            passiveSupported = true;
            return null;
          }
        }));
        _this.passive = passiveSupported ? { passive: false } : false;
      }
      var open = _this.getOpen();
      if (_this.handler || open || _this.sFirstEnter) {
        _this.getDefault(_this.$props);
        if (open) {
          _this.isOpenChange = true;
        }
        _this.$forceUpdate();
      }
    });
  },

  watch: {
    open: function (_open) {
      function open(_x) {
        return _open.apply(this, arguments);
      }

      open.toString = function () {
        return _open.toString();
      };

      return open;
    }(function (val) {
      if (val !== undefined && val !== this.preProps.open) {
        this.isOpenChange = true;
        // 没渲染 dom 时，获取默认数据;
        if (!this.container) {
          this.getDefault(this.$props);
        }
        this.setState({
          sOpen: open
        });
      }
      this.preProps.open = val;
    }),
    placement: function placement(val) {
      if (val !== this.preProps.placement) {
        // test 的 bug, 有动画过场，删除 dom
        this.contentDom = null;
      }
      this.preProps.placement = val;
    },
    level: function level(val) {
      if (this.preProps.level !== val) {
        this.getParentAndLevelDom(this.$props);
      }
      this.preProps.level = val;
    }
  },
  updated: function updated() {
    var _this2 = this;

    this.$nextTick(function () {
      // dom 没渲染时，重走一遍。
      if (!_this2.sFirstEnter && _this2.container) {
        _this2.$forceUpdate();
        _this2.sFirstEnter = true;
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    delete currentDrawer[this.drawerId];
    delete this.isOpenChange;
    if (this.container) {
      if (this.sOpen) {
        this.setLevelDomTransform(false, true);
      }
      document.body.style.overflow = '';
      // 拦不住。。直接删除；
      if (this.getSelfContainer) {
        this.container.parentNode.removeChild(this.container);
      }
    }
    this.sFirstEnter = false;
    clearTimeout(this.timeout);
    // 需要 didmount 后也会渲染，直接 unmount 将不会渲染，加上判断.
    if (this.renderComponent) {
      this.renderComponent({
        afterClose: this.removeContainer,
        onClose: function onClose() {},

        visible: false
      });
    }
  },

  methods: {
    onMaskTouchEnd: function onMaskTouchEnd(e) {
      this.$emit('maskClick', e);
      this.onTouchEnd(e, true);
    },
    onIconTouchEnd: function onIconTouchEnd(e) {
      this.$emit('handleClick', e);
      this.onTouchEnd(e);
    },
    onTouchEnd: function onTouchEnd(e, close) {
      if (this.open !== undefined) {
        return;
      }
      var open = close || this.sOpen;
      this.isOpenChange = true;
      this.setState({
        sOpen: !open
      });
    },
    onWrapperTransitionEnd: function onWrapperTransitionEnd(e) {
      if (e.target === this.contentWrapper) {
        this.dom.style.transition = '';
        if (!this.sOpen && this.getCurrentDrawerSome()) {
          document.body.style.overflowX = '';
          if (this.maskDom) {
            this.maskDom.style.left = '';
            this.maskDom.style.width = '';
          }
        }
      }
    },
    getDefault: function getDefault(props) {
      this.getParentAndLevelDom(props);
      if (props.getContainer || props.parent) {
        this.container = this.defaultGetContainer();
      }
    },
    getCurrentDrawerSome: function getCurrentDrawerSome() {
      return !Object.keys(currentDrawer).some(function (key) {
        return currentDrawer[key];
      });
    },
    getSelfContainer: function getSelfContainer() {
      return this.container;
    },
    getParentAndLevelDom: function getParentAndLevelDom(props) {
      var _this3 = this;

      if (windowIsUndefined) {
        return;
      }
      var level = props.level,
          getContainer = props.getContainer;

      this.levelDom = [];
      if (getContainer) {
        if (typeof getContainer === 'string') {
          var dom = document.querySelectorAll(getContainer)[0];
          this.parent = dom;
        }
        if (typeof getContainer === 'function') {
          this.parent = getContainer();
        }
        if ((typeof getContainer === 'undefined' ? 'undefined' : typeof_default()(getContainer)) === 'object' && getContainer instanceof window.HTMLElement) {
          this.parent = getContainer;
        }
      }
      if (!getContainer && this.container) {
        this.parent = this.container.parentNode;
      }
      if (level === 'all') {
        var children = Array.prototype.slice.call(this.parent.children);
        children.forEach(function (child) {
          if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== _this3.container) {
            _this3.levelDom.push(child);
          }
        });
      } else if (level) {
        dataToArray(level).forEach(function (key) {
          document.querySelectorAll(key).forEach(function (item) {
            _this3.levelDom.push(item);
          });
        });
      }
    },
    setLevelDomTransform: function setLevelDomTransform(open, openTransition, placementName, value) {
      var _this4 = this;

      var _$props = this.$props,
          placement = _$props.placement,
          levelMove = _$props.levelMove,
          duration = _$props.duration,
          ease = _$props.ease,
          getContainer = _$props.getContainer;

      if (!windowIsUndefined) {
        this.levelDom.forEach(function (dom) {
          if (_this4.isOpenChange || openTransition) {
            /* eslint no-param-reassign: "error" */
            dom.style.transition = 'transform ' + duration + ' ' + ease;
            addEventListener(dom, transitionEnd, _this4.trnasitionEnd);
            var levelValue = open ? value : 0;
            if (levelMove) {
              var $levelMove = transformArguments(levelMove, { target: dom, open: open });
              levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
            }
            var $value = typeof levelValue === 'number' ? levelValue + 'px' : levelValue;
            var placementPos = placement === 'left' || placement === 'top' ? $value : '-' + $value;
            dom.style.transform = levelValue ? placementName + '(' + placementPos + ')' : '';
            dom.style.msTransform = levelValue ? placementName + '(' + placementPos + ')' : '';
          }
        });
        // 处理 body 滚动
        if (getContainer === 'body') {
          var eventArray = ['touchstart'];
          var domArray = [document.body, this.maskDom, this.handlerdom, this.contentDom];
          var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? Object(getScrollBarSize["a" /* default */])(1) : 0;
          var widthTransition = 'width ' + duration + ' ' + ease;
          var trannsformTransition = 'transform ' + duration + ' ' + ease;
          if (open && document.body.style.overflow !== 'hidden') {
            document.body.style.overflow = 'hidden';
            if (right) {
              document.body.style.position = 'relative';
              document.body.style.width = 'calc(100% - ' + right + 'px)';
              this.dom.style.transition = 'none';
              switch (placement) {
                case 'right':
                  this.dom.style.transform = 'translateX(-' + right + 'px)';
                  this.dom.style.msTransform = 'translateX(-' + right + 'px)';
                  break;
                case 'top':
                case 'bottom':
                  this.dom.style.width = 'calc(100% - ' + right + 'px)';
                  this.dom.style.transform = 'translateZ(0)';
                  break;
                default:
                  break;
              }
              clearTimeout(this.timeout);
              this.timeout = setTimeout(function () {
                _this4.dom.style.transition = trannsformTransition + ',' + widthTransition;
                _this4.dom.style.width = '';
                _this4.dom.style.transform = '';
                _this4.dom.style.msTransform = '';
              });
            }
            // 手机禁滚
            domArray.forEach(function (item, i) {
              if (!item) {
                return;
              }
              addEventListener(item, eventArray[i] || 'touchmove', i ? _this4.removeMoveHandler : _this4.removeStartHandler, _this4.passive);
            });
          } else if (this.getCurrentDrawerSome()) {
            document.body.style.overflow = '';
            if ((this.isOpenChange || openTransition) && right) {
              document.body.style.position = '';
              document.body.style.width = '';
              if (transitionStr) {
                document.body.style.overflowX = 'hidden';
              }
              this.dom.style.transition = 'none';
              var heightTransition = void 0;
              switch (placement) {
                case 'right':
                  {
                    this.dom.style.transform = 'translateX(' + right + 'px)';
                    this.dom.style.msTransform = 'translateX(' + right + 'px)';
                    this.dom.style.width = '100%';
                    widthTransition = 'width 0s ' + ease + ' ' + duration;
                    if (this.maskDom) {
                      this.maskDom.style.left = '-' + right + 'px';
                      this.maskDom.style.width = 'calc(100% + ' + right + 'px)';
                    }
                    break;
                  }
                case 'top':
                case 'bottom':
                  {
                    this.dom.style.width = 'calc(100% + ' + right + 'px)';
                    this.dom.style.height = '100%';
                    this.dom.style.transform = 'translateZ(0)';
                    heightTransition = 'height 0s ' + ease + ' ' + duration;
                    break;
                  }
                default:
                  break;
              }
              clearTimeout(this.timeout);
              this.timeout = setTimeout(function () {
                _this4.dom.style.transition = trannsformTransition + ',' + (heightTransition ? heightTransition + ',' : '') + widthTransition;
                _this4.dom.style.transform = '';
                _this4.dom.style.msTransform = '';
                _this4.dom.style.width = '';
                _this4.dom.style.height = '';
              });
            }
            domArray.forEach(function (item, i) {
              if (!item) {
                return;
              }
              removeEventListener(item, eventArray[i] || 'touchmove', i ? _this4.removeMoveHandler : _this4.removeStartHandler, _this4.passive);
            });
          }
        }
      }
      var change = this.$listeners.change;

      if (change && this.isOpenChange && this.sFirstEnter) {
        change(open);
        this.isOpenChange = false;
      }
    },
    getChildToRender: function getChildToRender(open) {
      var _classnames,
          _this5 = this;

      var h = this.$createElement;
      var _$props2 = this.$props,
          className = _$props2.className,
          prefixCls = _$props2.prefixCls,
          placement = _$props2.placement,
          handler = _$props2.handler,
          showMask = _$props2.showMask,
          maskStyle = _$props2.maskStyle,
          width = _$props2.width,
          height = _$props2.height,
          wrapStyle = _$props2.wrapStyle;

      var children = this.$slots['default'];
      var wrapperClassname = classnames_default()(prefixCls, (_classnames = {}, defineProperty_default()(_classnames, prefixCls + '-' + placement, true), defineProperty_default()(_classnames, prefixCls + '-open', open), defineProperty_default()(_classnames, className, !!className), _classnames));
      var isOpenChange = this.isOpenChange;
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = 'translate' + (isHorizontal ? 'X' : 'Y');
      // 百分比与像素动画不同步，第一次打用后全用像素动画。
      // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;
      var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
      var transform = open ? '' : placementName + '(' + placementPos + ')';
      if (isOpenChange === undefined || isOpenChange) {
        var contentValue = this.contentDom ? this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
        var value = (isHorizontal ? width : height) || contentValue;
        this.setLevelDomTransform(open, false, placementName, value);
      }
      var handlerChildren = void 0;
      if (handler !== false) {
        var handlerDefalut = h(
          'div',
          { 'class': 'drawer-handle' },
          [h('i', { 'class': 'drawer-handle-icon' })]
        );
        var handlerSlot = this.handler;

        var handlerSlotVnode = handlerSlot && handlerSlot[0] || handlerDefalut;

        var _getEvents = Object(props_util["h" /* getEvents */])(handlerSlotVnode),
            handleIconClick = _getEvents.click;

        handlerChildren = Object(vnode["a" /* cloneElement */])(handlerSlotVnode, {
          on: {
            click: function click(e) {
              handleIconClick && handleIconClick();
              _this5.onIconTouchEnd(e);
            }
          },
          directives: [{
            name: 'ant-ref',
            value: function value(c) {
              _this5.handlerdom = c;
            }
          }]
        });
      }

      var domContProps = {
        'class': wrapperClassname,
        directives: [{
          name: 'ant-ref',
          value: function value(c) {
            _this5.dom = c;
          }
        }],
        on: {
          transitionend: this.onWrapperTransitionEnd
        },
        style: wrapStyle
      };
      var directivesMaskDom = [{
        name: 'ant-ref',
        value: function value(c) {
          _this5.maskDom = c;
        }
      }];
      var directivesContentWrapper = [{
        name: 'ant-ref',
        value: function value(c) {
          _this5.contentWrapper = c;
        }
      }];
      var directivesContentDom = [{
        name: 'ant-ref',
        value: function value(c) {
          _this5.contentDom = c;
        }
      }];
      return h(
        'div',
        domContProps,
        [showMask && h('div', babel_helper_vue_jsx_merge_props_default()([{
          'class': prefixCls + '-mask',
          on: {
            'click': this.onMaskTouchEnd
          },

          style: maskStyle
        }, { directives: directivesMaskDom }])), h(
          'div',
          babel_helper_vue_jsx_merge_props_default()([{
            'class': prefixCls + '-content-wrapper',
            style: {
              transform: transform,
              msTransform: transform,
              width: isNumeric(width) ? width + 'px' : width,
              height: isNumeric(height) ? height + 'px' : height
            }
          }, { directives: directivesContentWrapper }]),
          [h(
            'div',
            babel_helper_vue_jsx_merge_props_default()([{
              'class': prefixCls + '-content'
            }, { directives: directivesContentDom }, {
              on: {
                'touchstart': open ? this.removeStartHandler : noop,
                'touchmove': open ? this.removeMoveHandler : noop
              }
            }]),
            [children]
          ), handlerChildren]
        )]
      );
    },
    getOpen: function getOpen() {
      return this.open !== undefined ? this.open : this.sOpen;
    },
    getTouchParentScroll: function getTouchParentScroll(root, currentTarget, differX, differY) {
      if (!currentTarget || currentTarget === document) {
        return false;
      }
      // root 为 drawer-content 设定了 overflow, 判断为 root 的 parent 时结束滚动；
      if (currentTarget === root.parentNode) {
        return true;
      }

      var isY = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differY);
      var isX = Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differX);

      var scrollY = currentTarget.scrollHeight - currentTarget.clientHeight;
      var scrollX = currentTarget.scrollWidth - currentTarget.clientWidth;
      /**
       * <div style="height: 300px">
       *   <div style="height: 900px"></div>
       * </div>
       * 在没设定 overflow: auto 或 scroll 时，currentTarget 里获取不到 scrollTop 或 scrollLeft,
       * 预先用 scrollTo 来滚动，如果取出的值跟滚动前取出不同，则 currnetTarget 被设定了 overflow; 否则就是上面这种。
       */
      var t = currentTarget.scrollTop;
      var l = currentTarget.scrollLeft;
      if (currentTarget.scrollTo) {
        currentTarget.scrollTo(currentTarget.scrollLeft + 1, currentTarget.scrollTop + 1);
      }
      var currentT = currentTarget.scrollTop;
      var currentL = currentTarget.scrollLeft;
      if (currentTarget.scrollTo) {
        currentTarget.scrollTo(currentTarget.scrollLeft - 1, currentTarget.scrollTop - 1);
      }
      if (isY && (!scrollY || !(currentT - t) || scrollY && (currentTarget.scrollTop >= scrollY && differY < 0 || currentTarget.scrollTop <= 0 && differY > 0)) || isX && (!scrollX || !(currentL - l) || scrollX && (currentTarget.scrollLeft >= scrollX && differX < 0 || currentTarget.scrollLeft <= 0 && differX > 0))) {
        return this.getTouchParentScroll(root, currentTarget.parentNode, differX, differY);
      }
      return false;
    },
    removeStartHandler: function removeStartHandler(e) {
      if (e.touches.length > 1) {
        return;
      }
      this.startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    },
    removeMoveHandler: function removeMoveHandler(e) {
      if (e.changedTouches.length > 1) {
        return;
      }
      var currentTarget = e.currentTarget;
      var differX = e.changedTouches[0].clientX - this.startPos.x;
      var differY = e.changedTouches[0].clientY - this.startPos.y;
      if (currentTarget === this.maskDom || currentTarget === this.handlerdom || currentTarget === this.contentDom && this.getTouchParentScroll(currentTarget, e.target, differX, differY)) {
        e.preventDefault();
      }
    },
    trnasitionEnd: function trnasitionEnd(e) {
      removeEventListener(e.target, transitionEnd, this.trnasitionEnd);
      e.target.style.transition = '';
    },
    defaultGetContainer: function defaultGetContainer() {
      if (windowIsUndefined) {
        return null;
      }
      var container = document.createElement('div');
      this.parent.appendChild(container);
      if (this.wrapperClassName) {
        container.className = this.wrapperClassName;
      }
      return container;
    }
  },

  render: function render() {
    var _this6 = this;

    var h = arguments[0];
    var _$props3 = this.$props,
        getContainer = _$props3.getContainer,
        wrapperClassName = _$props3.wrapperClassName;

    var open = this.getOpen();
    currentDrawer[this.drawerId] = open ? this.container : open;
    var children = this.getChildToRender(this.sFirstEnter ? open : false);
    if (!getContainer) {
      var directives = [{
        name: 'ant-ref',
        value: function value(c) {
          _this6.container = c;
        }
      }];
      return h(
        'div',
        babel_helper_vue_jsx_merge_props_default()([{ 'class': wrapperClassName }, { directives: directives }]),
        [children]
      );
    }
    if (!this.container || !open && !this.sFirstEnter) {
      return null;
    }
    return h(ContainerRender["a" /* default */], {
      attrs: {
        parent: this,
        visible: true,
        autoMount: true,
        autoDestroy: false,
        getComponent: function getComponent() {
          return children;
        },
        getContainer: this.getSelfContainer,
        children: function children(_ref) {
          var renderComponent = _ref.renderComponent,
              removeContainer = _ref.removeContainer;

          _this6.renderComponent = renderComponent;
          _this6.removeContainer = removeContainer;
          return null;
        }
      }
    });
  }
};

/* harmony default export */ var src_Drawer = (Drawer);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-drawer/src/index.js
// base in 1.7.7
// export this package's api


/* harmony default export */ var src = __webpack_exports__["a"] = (src_Drawer);

/***/ }),

/***/ "2b89":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getKeyFromChildrenIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMenuIdFromSubMenuEventKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return loopMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return loopMenuItemRecursively; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return menuAllProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isMobileDevice; });
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1098");
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

var isMobile = __webpack_require__("8114");

function noop() {}

function getKeyFromChildrenIndex(child, menuEventKey, index) {
  var prefix = menuEventKey || '';
  return child.key === undefined ? prefix + 'item_' + index : child.key;
}

function getMenuIdFromSubMenuEventKey(eventKey) {
  return eventKey + '-menu-';
}

function loopMenuItem(children, cb) {
  var index = -1;
  children.forEach(function (c) {
    index++;
    if (c && c.type && c.type.isMenuItemGroup) {
      c.$slots['default'].forEach(function (c2) {
        index++;
        c.componentOptions && cb(c2, index);
      });
    } else {
      c.componentOptions && cb(c, index);
    }
  });
}

function loopMenuItemRecursively(children, keys, ret) {
  if (!children || ret.find) {
    return;
  }
  children.forEach(function (c) {
    if (ret.find) {
      return;
    }
    if (c.data && c.data.slot && c.data.slot !== 'default') {
      return;
    }
    if (c && c.componentOptions) {
      var options = c.componentOptions.Ctor.options;
      if (!options || !(options.isSubMenu || options.isMenuItem || options.isMenuItemGroup)) {
        return;
      }
      if (keys.indexOf(c.key) !== -1) {
        ret.find = true;
      } else if (c.componentOptions.children) {
        loopMenuItemRecursively(c.componentOptions.children, keys, ret);
      }
    }
  });
}

var menuAllProps = {
  props: ['defaultSelectedKeys', 'selectedKeys', 'defaultOpenKeys', 'openKeys', 'mode', 'getPopupContainer', 'openTransitionName', 'openAnimation', 'subMenuOpenDelay', 'subMenuCloseDelay', 'forceSubMenuRender', 'triggerSubMenuAction', 'level', 'selectable', 'multiple', 'visible', 'focusable', 'defaultActiveFirst', 'prefixCls', 'inlineIndent', 'parentMenu', 'title', 'rootPrefixCls', 'eventKey', 'active', 'popupAlign', 'popupOffset', 'isOpen', 'renderMenuItem', 'manualRef', 'subMenuKey', 'disabled', 'index', 'isSelected', 'store', 'activeKey', 'builtinPlacements', 'overflowedIndicator',

  // the following keys found need to be removed from test regression
  'attribute', 'value', 'popupClassName', 'inlineCollapsed', 'menu', 'theme', 'itemIcon', 'expandIcon'],
  on: ['select', 'deselect', 'destroy', 'openChange', 'itemHover', 'titleMouseenter', 'titleMouseleave', 'titleClick']
};

// ref: https://github.com/ant-design/ant-design/issues/14007
// ref: https://bugs.chromium.org/p/chromium/issues/detail?id=360889
// getBoundingClientRect return the full precision value, which is
// not the same behavior as on chrome. Set the precision to 6 to
// unify their behavior
var getWidth = function getWidth(elem) {
  var width = elem && typeof elem.getBoundingClientRect === 'function' && elem.getBoundingClientRect().width;
  if (width) {
    width = +width.toFixed(6);
  }
  return width || 0;
};

var setStyle = function setStyle(elem, styleProperty, value) {
  if (elem && babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(elem.style) === 'object') {
    elem.style[styleProperty] = value;
  }
};

var isMobileDevice = function isMobileDevice() {
  return isMobile.any;
};

/***/ }),

/***/ "428d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/addEventListener.js
var addEventListener = __webpack_require__("f194");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/warning.js
var warning = __webpack_require__("6a21");

// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__("b047");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./node_modules/lodash/throttle.js
var throttle = __webpack_require__("0f32");
var throttle_default = /*#__PURE__*/__webpack_require__.n(throttle);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-lazy-load/src/utils/parentScroll.js
var style = function style(element, prop) {
  var styleVal = '';
  if (typeof getComputedStyle !== 'undefined') {
    styleVal = window.getComputedStyle(element, null).getPropertyValue(prop);
  } else {
    styleVal = element.style[prop];
  }
  return styleVal;
};

var overflow = function overflow(element) {
  return style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');
};

var scrollParent = function scrollParent(element) {
  if (!(element instanceof window.HTMLElement)) {
    return window;
  }

  var parent = element;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }
    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return window;
};

/* harmony default export */ var parentScroll = (scrollParent);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-lazy-load/src/utils/getElementPosition.js
/*
 * Finds element's position relative to the whole document,
 * rather than to the viewport as it is the case with .getBoundingClientRect().
 */
function getElementPosition(element) {
  var rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-lazy-load/src/utils/inViewport.js


var isHidden = function isHidden(element) {
  return element.offsetParent === null;
};

function inViewport(element, container, customOffset) {
  if (isHidden(element)) {
    return false;
  }

  var top = void 0;
  var bottom = void 0;
  var left = void 0;
  var right = void 0;

  if (typeof container === 'undefined' || container === window) {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    var containerPosition = getElementPosition(container);

    top = containerPosition.top;
    left = containerPosition.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  var elementPosition = getElementPosition(element);

  return top <= elementPosition.top + element.offsetHeight + customOffset.top && bottom >= elementPosition.top - customOffset.bottom && left <= elementPosition.left + element.offsetWidth + customOffset.left && right >= elementPosition.left - customOffset.right;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-lazy-load/src/LazyLoad.js










var lazyLoadProps = {
  debounce: vue_types["a" /* default */].bool,
  elementType: vue_types["a" /* default */].string,
  height: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
  offset: vue_types["a" /* default */].number,
  offsetBottom: vue_types["a" /* default */].number,
  offsetHorizontal: vue_types["a" /* default */].number,
  offsetLeft: vue_types["a" /* default */].number,
  offsetRight: vue_types["a" /* default */].number,
  offsetTop: vue_types["a" /* default */].number,
  offsetVertical: vue_types["a" /* default */].number,
  threshold: vue_types["a" /* default */].number,
  throttle: vue_types["a" /* default */].number,
  width: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
  _propsSymbol: vue_types["a" /* default */].any
};

/* harmony default export */ var LazyLoad = ({
  name: 'LazyLoad',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])(lazyLoadProps, {
    elementType: 'div',
    debounce: true,
    offset: 0,
    offsetBottom: 0,
    offsetHorizontal: 0,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
    offsetVertical: 0,
    throttle: 250
  }),
  data: function data() {
    if (this.throttle > 0) {
      if (this.debounce) {
        this.lazyLoadHandler = debounce_default()(this.lazyLoadHandler, this.throttle);
      } else {
        this.lazyLoadHandler = throttle_default()(this.lazyLoadHandler, this.throttle);
      }
    }
    return {
      visible: false
    };
  },

  watch: {
    _propsSymbol: function _propsSymbol() {
      if (!this.visible) {
        this.lazyLoadHandler();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this._mounted = true;
      var eventNode = _this.getEventNode();

      _this.lazyLoadHandler();

      if (_this.lazyLoadHandler.flush) {
        _this.lazyLoadHandler.flush();
      }
      _this.resizeHander = Object(addEventListener["a" /* default */])(window, 'resize', _this.lazyLoadHandler);
      _this.scrollHander = Object(addEventListener["a" /* default */])(eventNode, 'scroll', _this.lazyLoadHandler);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this._mounted = false;
    if (this.lazyLoadHandler.cancel) {
      this.lazyLoadHandler.cancel();
    }

    this.detachListeners();
  },

  methods: {
    getEventNode: function getEventNode() {
      return parentScroll(this.$el);
    },
    getOffset: function getOffset() {
      var _$props = this.$props,
          offset = _$props.offset,
          offsetVertical = _$props.offsetVertical,
          offsetHorizontal = _$props.offsetHorizontal,
          offsetTop = _$props.offsetTop,
          offsetBottom = _$props.offsetBottom,
          offsetLeft = _$props.offsetLeft,
          offsetRight = _$props.offsetRight,
          threshold = _$props.threshold;


      var _offsetAll = threshold || offset;
      var _offsetVertical = offsetVertical || _offsetAll;
      var _offsetHorizontal = offsetHorizontal || _offsetAll;

      return {
        top: offsetTop || _offsetVertical,
        bottom: offsetBottom || _offsetVertical,
        left: offsetLeft || _offsetHorizontal,
        right: offsetRight || _offsetHorizontal
      };
    },
    lazyLoadHandler: function lazyLoadHandler() {
      var _this2 = this;

      if (!this._mounted) {
        return;
      }
      var offset = this.getOffset();
      var node = this.$el;
      var eventNode = this.getEventNode();

      if (inViewport(node, eventNode, offset)) {
        this.setState({ visible: true }, function () {
          _this2.__emit('contentVisible');
        });
        this.detachListeners();
      }
    },
    detachListeners: function detachListeners() {
      this.resizeHander && this.resizeHander.remove();
      this.scrollHander && this.scrollHander.remove();
    }
  },
  render: function render(createElement) {
    var children = this.$slots['default'];
    if (children.length !== 1) {
      Object(warning["a" /* default */])(false, 'lazyLoad组件只能包含一个子元素');
      return null;
    }
    var _$props2 = this.$props,
        height = _$props2.height,
        width = _$props2.width,
        elementType = _$props2.elementType;
    var visible = this.visible;


    var elStyles = {
      height: typeof height === 'number' ? height + 'px' : height,
      width: typeof width === 'number' ? width + 'px' : width
    };
    var elClasses = {
      LazyLoad: true,
      'is-visible': visible
    };

    return createElement(elementType, {
      'class': elClasses,
      style: elStyles
    }, [visible ? children[0] : null]);
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-lazy-load/index.js

/* harmony default export */ var vc_lazy_load = __webpack_exports__["a"] = (LazyLoad);

/***/ }),

/***/ "45df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js + 5 modules
var vc_trigger = __webpack_require__("8496");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dropdown/src/placements.js
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topCenter: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  }
};

/* harmony default export */ var src_placements = (placements);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dropdown/src/Dropdown.js









/* harmony default export */ var Dropdown = ({
  mixins: [BaseMixin["a" /* default */]],
  props: {
    minOverlayWidthMatchTrigger: vue_types["a" /* default */].bool.def(true),
    prefixCls: vue_types["a" /* default */].string.def('rc-dropdown'),
    transitionName: vue_types["a" /* default */].string,
    overlayClassName: vue_types["a" /* default */].string.def(''),
    openClassName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].any,
    align: vue_types["a" /* default */].object,
    overlayStyle: vue_types["a" /* default */].object.def({}),
    placement: vue_types["a" /* default */].string.def('bottomLeft'),
    overlay: vue_types["a" /* default */].any,
    trigger: vue_types["a" /* default */].array.def(['hover']),
    alignPoint: vue_types["a" /* default */].bool,
    showAction: vue_types["a" /* default */].array.def([]),
    hideAction: vue_types["a" /* default */].array.def([]),
    getPopupContainer: vue_types["a" /* default */].func,
    visible: vue_types["a" /* default */].bool,
    defaultVisible: vue_types["a" /* default */].bool.def(false),
    mouseEnterDelay: vue_types["a" /* default */].number.def(0.15),
    mouseLeaveDelay: vue_types["a" /* default */].number.def(0.1)
  },
  data: function data() {
    var sVisible = this.defaultVisible;
    if (Object(props_util["q" /* hasProp */])(this, 'visible')) {
      sVisible = this.visible;
    }
    return {
      sVisible: sVisible
    };
  },

  watch: {
    visible: function visible(val) {
      if (val !== undefined) {
        this.setState({
          sVisible: val
        });
      }
    }
  },
  methods: {
    onClick: function onClick(e) {
      // do no call onVisibleChange, if you need click to hide, use onClick and control visible
      if (!Object(props_util["q" /* hasProp */])(this, 'visible')) {
        this.setState({
          sVisible: false
        });
      }
      this.$emit('overlayClick', e);
      if (this.childOriginEvents.click) {
        this.childOriginEvents.click(e);
      }
    },
    onVisibleChange: function onVisibleChange(visible) {
      if (!Object(props_util["q" /* hasProp */])(this, 'visible')) {
        this.setState({
          sVisible: visible
        });
      }
      this.__emit('visibleChange', visible);
    },
    getMinOverlayWidthMatchTrigger: function getMinOverlayWidthMatchTrigger() {
      var props = Object(props_util["j" /* getOptionProps */])(this);
      var minOverlayWidthMatchTrigger = props.minOverlayWidthMatchTrigger,
          alignPoint = props.alignPoint;

      if ('minOverlayWidthMatchTrigger' in props) {
        return minOverlayWidthMatchTrigger;
      }

      return !alignPoint;
    },
    getOverlayElement: function getOverlayElement() {
      var overlay = this.overlay || this.$slots.overlay || this.$scopedSlots.overlay;
      var overlayElement = void 0;
      if (typeof overlay === 'function') {
        overlayElement = overlay();
      } else {
        overlayElement = overlay;
      }
      return overlayElement;
    },
    getMenuElement: function getMenuElement() {
      var _this = this;

      var onClick = this.onClick,
          prefixCls = this.prefixCls,
          $slots = this.$slots;

      this.childOriginEvents = Object(props_util["h" /* getEvents */])($slots.overlay[0]);
      var overlayElement = this.getOverlayElement();
      var extraOverlayProps = {
        props: {
          prefixCls: prefixCls + '-menu',
          getPopupContainer: function getPopupContainer() {
            return _this.getPopupDomNode();
          }
        },
        on: {
          click: onClick
        }
      };
      if (typeof overlayElement.type === 'string') {
        delete extraOverlayProps.props.prefixCls;
      }
      return Object(vnode["a" /* cloneElement */])($slots.overlay[0], extraOverlayProps);
    },
    getMenuElementOrLambda: function getMenuElementOrLambda() {
      var overlay = this.overlay || this.$slots.overlay || this.$scopedSlots.overlay;
      if (typeof overlay === 'function') {
        return this.getMenuElement;
      }
      return this.getMenuElement();
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.$refs.trigger.getPopupDomNode();
    },
    getOpenClassName: function getOpenClassName() {
      var _$props = this.$props,
          openClassName = _$props.openClassName,
          prefixCls = _$props.prefixCls;

      if (openClassName !== undefined) {
        return openClassName;
      }
      return prefixCls + '-open';
    },
    afterVisibleChange: function afterVisibleChange(visible) {
      if (visible && this.getMinOverlayWidthMatchTrigger()) {
        var overlayNode = this.getPopupDomNode();
        var rootNode = this.$el;
        if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
          overlayNode.style.minWidth = rootNode.offsetWidth + 'px';
          if (this.$refs.trigger && this.$refs.trigger._component && this.$refs.trigger._component.alignInstance) {
            this.$refs.trigger._component.alignInstance.forceAlign();
          }
        }
      }
    },
    renderChildren: function renderChildren() {
      var children = this.$slots['default'] && this.$slots['default'][0];
      var sVisible = this.sVisible;

      return sVisible && children ? Object(vnode["a" /* cloneElement */])(children, { 'class': this.getOpenClassName() }) : children;
    }
  },

  render: function render() {
    var h = arguments[0];

    var _$props2 = this.$props,
        prefixCls = _$props2.prefixCls,
        transitionName = _$props2.transitionName,
        animation = _$props2.animation,
        align = _$props2.align,
        placement = _$props2.placement,
        getPopupContainer = _$props2.getPopupContainer,
        showAction = _$props2.showAction,
        hideAction = _$props2.hideAction,
        overlayClassName = _$props2.overlayClassName,
        overlayStyle = _$props2.overlayStyle,
        trigger = _$props2.trigger,
        otherProps = objectWithoutProperties_default()(_$props2, ['prefixCls', 'transitionName', 'animation', 'align', 'placement', 'getPopupContainer', 'showAction', 'hideAction', 'overlayClassName', 'overlayStyle', 'trigger']);

    var triggerHideAction = hideAction;
    if (!triggerHideAction && trigger.indexOf('contextmenu') !== -1) {
      triggerHideAction = ['click'];
    }

    var triggerProps = {
      props: extends_default()({}, otherProps, {
        prefixCls: prefixCls,
        popupClassName: overlayClassName,
        popupStyle: overlayStyle,
        builtinPlacements: src_placements,
        action: trigger,
        showAction: showAction,
        hideAction: triggerHideAction || [],
        popupPlacement: placement,
        popupAlign: align,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        popupVisible: this.sVisible,
        afterPopupVisibleChange: this.afterVisibleChange,
        getPopupContainer: getPopupContainer
      }),
      on: {
        popupVisibleChange: this.onVisibleChange
      },
      ref: 'trigger'
    };
    var child = this.$slots['default'] && this.$slots['default'][0];
    return h(
      vc_trigger["a" /* default */],
      triggerProps,
      [this.renderChildren(), h(
        'template',
        { slot: 'popup' },
        [this.$slots.overlay && this.getMenuElement()]
      )]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dropdown/src/index.js
// base in 2.4.1

/* harmony default export */ var src = __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ "4a15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4d91");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("daa3");



// import { menuAllProps } from './util'

var MenuItemGroup = {
  name: 'MenuItemGroup',

  props: {
    renderMenuItem: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].func,
    index: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].number,
    className: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].string,
    subMenuKey: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].string,
    rootPrefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].string,
    disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].bool.def(true),
    title: _util_vue_types__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].any
  },
  isMenuItemGroup: true,
  methods: {
    renderInnerMenuItem: function renderInnerMenuItem(item) {
      var _$props = this.$props,
          renderMenuItem = _$props.renderMenuItem,
          index = _$props.index,
          subMenuKey = _$props.subMenuKey;

      return renderMenuItem(item, index, subMenuKey);
    }
  },
  render: function render() {
    var h = arguments[0];

    var props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.$props);
    var rootPrefixCls = props.rootPrefixCls,
        title = props.title;

    var titleClassName = rootPrefixCls + '-item-group-title';
    var listClassName = rootPrefixCls + '-item-group-list';
    // menuAllProps.props.forEach(key => delete props[key])
    var listeners = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.$listeners);
    delete listeners.click;

    return h(
      'li',
      { on: listeners, 'class': rootPrefixCls + '-item-group' },
      [h(
        'div',
        { 'class': titleClassName, attrs: { title: typeof title === 'string' ? title : undefined }
        },
        [Object(_util_props_util__WEBPACK_IMPORTED_MODULE_2__[/* getComponentFromProp */ "g"])(this, 'title')]
      ), h(
        'ul',
        { 'class': listClassName },
        [this.$slots['default'] && this.$slots['default'].map(this.renderInnerMenuItem)]
      )]
    );
  }
};

/* harmony default export */ __webpack_exports__["a"] = (MenuItemGroup);

/***/ }),

/***/ "4bf8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'MenuDivider',
  props: {
    disabled: {
      type: Boolean,
      'default': true
    },
    rootPrefixCls: String
  },
  render: function render() {
    var h = arguments[0];
    var rootPrefixCls = this.$props.rootPrefixCls;

    return h('li', { 'class': rootPrefixCls + '-item-divider' });
  }
});

/***/ }),

/***/ "4c82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isFormField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createFormField; });
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8827");
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);



var Field = function Field(fields) {
  babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Field);

  babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()(this, fields);
};

function isFormField(obj) {
  return obj instanceof Field;
}

function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }
  return new Field(field);
}

/***/ }),

/***/ "528d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return props; });
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("92fa");
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6042");
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4d91");
/* harmony import */ var _util_KeyCode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("18a7");
/* harmony import */ var _util_BaseMixin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("b488");
/* harmony import */ var dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("f43a");
/* harmony import */ var dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("e90a");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("2b89");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("daa3");











var props = {
  attribute: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].object,
  rootPrefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string,
  eventKey: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number]),
  active: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
  selectedKeys: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].array,
  disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
  title: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
  index: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number,
  inlineIndent: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number.def(24),
  level: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number.def(1),
  mode: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']).def('vertical'),
  parentMenu: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].object,
  multiple: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
  value: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
  isSelected: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
  manualRef: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].func.def(_util__WEBPACK_IMPORTED_MODULE_8__[/* noop */ "h"]),
  role: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
  subMenuKey: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string,
  itemIcon: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any
  // clearSubMenuTimers: PropTypes.func.def(noop),
};
var MenuItem = {
  name: 'MenuItem',
  props: props,
  mixins: [_util_BaseMixin__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]],
  isMenuItem: true,
  created: function created() {
    // invoke customized ref to expose component to mixin
    this.callRef();
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.active) {
        dom_scroll_into_view__WEBPACK_IMPORTED_MODULE_6___default()(_this.$el, _this.parentMenu.$el, {
          onlyScrollIfNeeded: true
        });
      }
    });
    this.callRef();
  },
  beforeDestroy: function beforeDestroy() {
    var props = this.$props;
    this.__emit('destroy', props.eventKey);
  },

  methods: {
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      if (keyCode === _util_KeyCode__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].ENTER) {
        this.onClick(e);
        return true;
      }
    },
    onMouseLeave: function onMouseLeave(e) {
      var eventKey = this.$props.eventKey;

      this.__emit('itemHover', {
        key: eventKey,
        hover: false
      });
      this.__emit('mouseleave', {
        key: eventKey,
        domEvent: e
      });
    },
    onMouseEnter: function onMouseEnter(e) {
      var eventKey = this.eventKey;

      this.__emit('itemHover', {
        key: eventKey,
        hover: true
      });
      this.__emit('mouseenter', {
        key: eventKey,
        domEvent: e
      });
    },
    onClick: function onClick(e) {
      var _$props = this.$props,
          eventKey = _$props.eventKey,
          multiple = _$props.multiple,
          isSelected = _$props.isSelected;

      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };

      this.__emit('click', info);
      if (multiple) {
        if (isSelected) {
          this.__emit('deselect', info);
        } else {
          this.__emit('select', info);
        }
      } else if (!isSelected) {
        this.__emit('select', info);
      }
    },
    getPrefixCls: function getPrefixCls() {
      return this.$props.rootPrefixCls + '-item';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getSelectedClassName: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    callRef: function callRef() {
      if (this.manualRef) {
        this.manualRef(this);
      }
    }
  },

  render: function render() {
    var _className;

    var h = arguments[0];

    var props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, this.$props);
    var className = (_className = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_className, this.getPrefixCls(), true), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_className, this.getActiveClassName(), !props.disabled && props.active), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_className, this.getSelectedClassName(), props.isSelected), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_className, this.getDisabledClassName(), props.disabled), _className);
    var attrs = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, props.attribute, {
      title: props.title,
      role: props.role || 'menuitem',
      'aria-disabled': props.disabled
    });
    if (props.role === 'option') {
      // overwrite to option
      attrs = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, attrs, {
        role: 'option',
        'aria-selected': props.isSelected
      });
    } else if (props.role === null || props.role === 'none') {
      // sometimes we want to specify role inside <li/> element
      // <li><a role='menuitem'>Link</a></li> would be a good example
      // in this case the role on <li/> should be "none" to
      // remove the implied listitem role.
      // https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
      attrs.role = 'none';
    }
    // In case that onClick/onMouseLeave/onMouseEnter is passed down from owner
    var mouseEvent = {
      click: props.disabled ? _util__WEBPACK_IMPORTED_MODULE_8__[/* noop */ "h"] : this.onClick,
      mouseleave: props.disabled ? _util__WEBPACK_IMPORTED_MODULE_8__[/* noop */ "h"] : this.onMouseLeave,
      mouseenter: props.disabled ? _util__WEBPACK_IMPORTED_MODULE_8__[/* noop */ "h"] : this.onMouseEnter
    };

    var style = {};
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level + 'px';
    }
    var listeners = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, this.$listeners);
    _util__WEBPACK_IMPORTED_MODULE_8__[/* menuAllProps */ "g"].props.forEach(function (key) {
      return delete props[key];
    });
    _util__WEBPACK_IMPORTED_MODULE_8__[/* menuAllProps */ "g"].on.forEach(function (key) {
      return delete listeners[key];
    });
    var liProps = {
      attrs: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, props, attrs),
      on: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, listeners, mouseEvent)
    };
    return h(
      'li',
      babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([liProps, { style: style, 'class': className }]),
      [this.$slots['default'], Object(_util_props_util__WEBPACK_IMPORTED_MODULE_9__[/* getComponentFromProp */ "g"])(this, 'itemIcon', props)]
    );
  }
};

var connected = Object(_util_store__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(function (_ref, _ref2) {
  var activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  };
})(MenuItem);

/* harmony default export */ __webpack_exports__["a"] = (connected);


/***/ }),

/***/ "64fa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/is-negative-zero/index.js
var is_negative_zero = __webpack_require__("05cd");
var is_negative_zero_default = /*#__PURE__*/__webpack_require__.n(is_negative_zero);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/warning.js
var warning = __webpack_require__("6a21");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-m-feedback/src/PropTypes.js


var ITouchProps = {
  disabled: vue_types["a" /* default */].bool,
  activeClassName: vue_types["a" /* default */].string,
  activeStyle: vue_types["a" /* default */].any
  // onTouchStart: PropTypes.func,
  // onTouchEnd: PropTypes.func,
  // onTouchCancel: PropTypes.func,
  // onMouseDown: PropTypes.func,
  // onMouseUp: PropTypes.func,
  // onMouseLeave: PropTypes.func,
};
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-m-feedback/src/TouchFeedback.js







/* harmony default export */ var TouchFeedback = ({
  name: 'TouchFeedback',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])(ITouchProps, {
    disabled: false
  }),
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.disabled && _this.active) {
        _this.setState({
          active: false
        });
      }
    });
  },

  methods: {
    triggerEvent: function triggerEvent(type, isActive, ev) {
      // 暂时仅有input-number用到，事件直接到挂载到Touchable上，不需要像antd那样从子组件触发
      this.$emit(type, ev);
      if (isActive !== this.active) {
        this.setState({
          active: isActive
        });
      }
    },
    onTouchStart: function onTouchStart(e) {
      this.triggerEvent('touchstart', true, e);
    },
    onTouchMove: function onTouchMove(e) {
      this.triggerEvent('touchmove', false, e);
    },
    onTouchEnd: function onTouchEnd(e) {
      this.triggerEvent('touchend', false, e);
    },
    onTouchCancel: function onTouchCancel(e) {
      this.triggerEvent('touchcancel', false, e);
    },
    onMouseDown: function onMouseDown(e) {
      // pc simulate mobile
      this.triggerEvent('mousedown', true, e);
    },
    onMouseUp: function onMouseUp(e) {
      this.triggerEvent('mouseup', false, e);
    },
    onMouseLeave: function onMouseLeave(e) {
      this.triggerEvent('mouseleave', false, e);
    }
  },
  render: function render() {
    var _$props = this.$props,
        disabled = _$props.disabled,
        _$props$activeClassNa = _$props.activeClassName,
        activeClassName = _$props$activeClassNa === undefined ? '' : _$props$activeClassNa,
        _$props$activeStyle = _$props.activeStyle,
        activeStyle = _$props$activeStyle === undefined ? {} : _$props$activeStyle;


    var child = this.$slots['default'];
    if (child.length !== 1) {
      Object(warning["a" /* default */])(false, 'm-feedback组件只能包含一个子元素');
      return null;
    }
    var childProps = {
      on: disabled ? {} : {
        touchstart: this.onTouchStart,
        touchmove: this.onTouchMove,
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchCancel,
        mousedown: this.onMouseDown,
        mouseup: this.onMouseUp,
        mouseleave: this.onMouseLeave
      }
    };

    if (!disabled && this.active) {
      childProps = extends_default()({}, childProps, {
        style: activeStyle,
        'class': activeClassName
      });
    }

    return Object(vnode["a" /* cloneElement */])(child, childProps);
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-m-feedback/index.js
// based on 2.0.0

/* harmony default export */ var vc_m_feedback = (TouchFeedback);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-input-number/src/InputHandler.js



var InputHandler = {
  props: {
    prefixCls: vue_types["a" /* default */].string,
    disabled: vue_types["a" /* default */].bool
  },
  render: function render() {
    var h = arguments[0];
    var _$props = this.$props,
        prefixCls = _$props.prefixCls,
        disabled = _$props.disabled;

    var touchableProps = {
      props: {
        disabled: disabled,
        activeClassName: prefixCls + '-handler-active'
      },
      on: this.$listeners
    };
    return h(
      vc_m_feedback,
      touchableProps,
      [h('span', [this.$slots['default']])]
    );
  }
};

/* harmony default export */ var src_InputHandler = (InputHandler);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-input-number/src/index.js


// based on rc-input-number 4.4.0








function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

function defaultParser(input) {
  return input.replace(/[^\w\.-]+/g, '');
}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
var SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
var DELAY = 600;

/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var isValidProps = function isValidProps(value) {
  return value !== undefined && value !== null;
};

var inputNumberProps = {
  value: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string]),
  defaultValue: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string]),
  focusOnUpDown: vue_types["a" /* default */].bool,
  autoFocus: vue_types["a" /* default */].bool,
  // onChange: PropTypes.func,
  // onKeyDown: PropTypes.func,
  // onKeyUp: PropTypes.func,
  prefixCls: vue_types["a" /* default */].string,
  tabIndex: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
  placeholder: vue_types["a" /* default */].string,
  disabled: vue_types["a" /* default */].bool,
  // onFocus: PropTypes.func,
  // onBlur: PropTypes.func,
  readOnly: vue_types["a" /* default */].bool,
  max: vue_types["a" /* default */].number,
  min: vue_types["a" /* default */].number,
  step: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].number, vue_types["a" /* default */].string]),
  upHandler: vue_types["a" /* default */].any,
  downHandler: vue_types["a" /* default */].any,
  useTouch: vue_types["a" /* default */].bool,
  formatter: vue_types["a" /* default */].func,
  parser: vue_types["a" /* default */].func,
  // onMouseEnter: PropTypes.func,
  // onMouseLeave: PropTypes.func,
  // onMouseOver: PropTypes.func,
  // onMouseOut: PropTypes.func,
  precision: vue_types["a" /* default */].number,
  required: vue_types["a" /* default */].bool,
  pattern: vue_types["a" /* default */].string,
  decimalSeparator: vue_types["a" /* default */].string,
  autoComplete: vue_types["a" /* default */].string,
  title: vue_types["a" /* default */].string,
  name: vue_types["a" /* default */].string,
  id: vue_types["a" /* default */].string
};

/* harmony default export */ var src = __webpack_exports__["a"] = ({
  name: 'InputNumber',
  mixins: [BaseMixin["a" /* default */]],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: Object(props_util["r" /* initDefaultProps */])(inputNumberProps, {
    focusOnUpDown: true,
    useTouch: false,
    prefixCls: 'rc-input-number',
    min: -MAX_SAFE_INTEGER,
    step: 1,
    parser: defaultParser,
    required: false,
    autoComplete: 'off'
  }),
  data: function data() {
    var value = void 0;
    if (Object(props_util["q" /* hasProp */])(this, 'value')) {
      value = this.value;
    } else {
      value = this.defaultValue;
    }
    value = this.toNumber(value);

    return {
      inputValue: this.toPrecisionAsStep(value),
      sValue: value,
      focused: this.autoFocus
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.autoFocus && !_this.disabled) {
        _this.focus();
      }
      _this.updatedFunc();
    });
  },
  beforeUpdate: function beforeUpdate() {
    var _this2 = this;

    this.$nextTick(function () {
      try {
        _this2.start = _this2.$refs.inputRef.selectionStart;
        _this2.end = _this2.$refs.inputRef.selectionEnd;
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    });
  },
  updated: function updated() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.updatedFunc();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.stop();
  },

  watch: {
    value: function value(val) {
      var value = this.focused ? val : this.getValidValue(val, this.min, this.max);
      this.setState({
        sValue: val,
        inputValue: this.inputting ? value : this.toPrecisionAsStep(value)
      });
    },
    max: function max(val) {
      var props = Object(props_util["j" /* getOptionProps */])(this);
      // Trigger onChange when max or min change
      // https://github.com/ant-design/ant-design/issues/11574
      var nextValue = 'value' in props ? props.value : this.sValue;
      // ref: null < 20 === true
      // https://github.com/ant-design/ant-design/issues/14277
      if (typeof nextValue === 'number' && nextValue > val) {
        this.__emit('change', val);
      }
    },
    min: function min(val) {
      var props = Object(props_util["j" /* getOptionProps */])(this);
      var nextValue = 'value' in props ? props.value : this.sValue;
      if (typeof nextValue === 'number' && nextValue < val) {
        this.__emit('change', val);
      }
    }
  },
  methods: {
    updatedFunc: function updatedFunc() {
      var inputElem = this.$refs.inputRef;
      // Restore cursor
      try {
        // Firefox set the input cursor after it get focused.
        // This caused that if an input didn't init with the selection,
        // set will cause cursor not correct when first focus.
        // Safari will focus input if set selection. We need skip this.
        if (this.cursorStart !== undefined && this.focused) {
          // In most cases, the string after cursor is stable.
          // We can move the cursor before it

          if (
          // If not match full str, try to match part of str
          !this.partRestoreByAfter(this.cursorAfter) && this.sValue !== this.value) {
            // If not match any of then, let's just keep the position
            // TODO: Logic should not reach here, need check if happens
            var pos = this.cursorStart + 1;

            // If not have last string, just position to the end
            if (!this.cursorAfter) {
              pos = inputElem.value.length;
            } else if (this.lastKeyCode === KeyCode["a" /* default */].BACKSPACE) {
              pos = this.cursorStart - 1;
            } else if (this.lastKeyCode === KeyCode["a" /* default */].DELETE) {
              pos = this.cursorStart;
            }
            this.fixCaret(pos, pos);
          } else if (this.currentValue === inputElem.value) {
            // Handle some special key code
            switch (this.lastKeyCode) {
              case KeyCode["a" /* default */].BACKSPACE:
                this.fixCaret(this.cursorStart - 1, this.cursorStart - 1);
                break;
              case KeyCode["a" /* default */].DELETE:
                this.fixCaret(this.cursorStart + 1, this.cursorStart + 1);
                break;
              default:
              // Do nothing
            }
          }
        }
      } catch (e) {}
      // Do nothing

      // Reset last key
      this.lastKeyCode = null;

      // pressingUpOrDown is true means that someone just click up or down button
      if (!this.pressingUpOrDown) {
        return;
      }
      if (this.focusOnUpDown && this.focused) {
        if (document.activeElement !== inputElem) {
          this.focus();
        }
      }

      this.pressingUpOrDown = false;
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === KeyCode["a" /* default */].UP) {
        var ratio = this.getRatio(e);
        this.up(e, ratio);
        this.stop();
      } else if (e.keyCode === KeyCode["a" /* default */].DOWN) {
        var _ratio = this.getRatio(e);
        this.down(e, _ratio);
        this.stop();
      }
      // Trigger user key down
      this.recordCursorPosition();
      this.lastKeyCode = e.keyCode;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.$emit.apply(this, ['keydown', e].concat(toConsumableArray_default()(args)));
    },
    onKeyUp: function onKeyUp(e) {
      this.stop();

      this.recordCursorPosition();

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.$emit.apply(this, ['keyup', e].concat(toConsumableArray_default()(args)));
    },
    onChange: function onChange(e) {
      if (this.focused) {
        this.inputting = true;
      }
      var input = this.parser(this.getValueFromEvent(e));
      this.setState({ inputValue: input });
      this.$emit('change', this.toNumberWhenUserInput(input)); // valid number or invalid string
    },
    onFocus: function onFocus() {
      this.setState({
        focused: true
      });

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.$emit.apply(this, ['focus'].concat(toConsumableArray_default()(args)));
    },
    onBlur: function onBlur(e) {
      var _this4 = this;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this.inputting = false;
      this.setState({
        focused: false
      });
      var value = this.getCurrentValidValue(this.inputValue);
      // todo
      // e.persist() // fix https://github.com/react-component/input-number/issues/51
      this.setValue(value, function () {
        _this4.$emit.apply(_this4, ['blur', e].concat(toConsumableArray_default()(args)));
      });
    },
    getCurrentValidValue: function getCurrentValidValue(value) {
      var val = value;
      if (val === '') {
        val = '';
      } else if (!this.isNotCompleteNumber(parseFloat(val, 10))) {
        val = this.getValidValue(val);
      } else {
        val = this.sValue;
      }
      return this.toNumber(val);
    },
    getRatio: function getRatio(e) {
      var ratio = 1;
      if (e.metaKey || e.ctrlKey) {
        ratio = 0.1;
      } else if (e.shiftKey) {
        ratio = 10;
      }
      return ratio;
    },
    getValueFromEvent: function getValueFromEvent(e) {
      // optimize for chinese input expierence
      // https://github.com/ant-design/ant-design/issues/8196
      var value = e.target.value.trim().replace(/。/g, '.');

      if (isValidProps(this.decimalSeparator)) {
        value = value.replace(this.decimalSeparator, '.');
      }

      return value;
    },
    getValidValue: function getValidValue(value) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.min;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.max;

      var val = parseFloat(value, 10);
      // https://github.com/ant-design/ant-design/issues/7358
      if (isNaN(val)) {
        return value;
      }
      if (val < min) {
        val = min;
      }
      if (val > max) {
        val = max;
      }
      return val;
    },
    setValue: function setValue(v, callback) {
      // trigger onChange
      var newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? null : parseFloat(v, 10);
      var changed = newValue !== this.sValue || '' + newValue !== '' + this.inputValue; // https://github.com/ant-design/ant-design/issues/7363
      if (!Object(props_util["q" /* hasProp */])(this, 'value')) {
        this.setState({
          sValue: newValue,
          inputValue: this.toPrecisionAsStep(v)
        }, callback);
      } else {
        // always set input value same as value
        this.setState({
          inputValue: this.toPrecisionAsStep(this.sValue)
        }, callback);
      }
      if (changed) {
        this.$emit('change', newValue);
      }
    },
    getPrecision: function getPrecision(value) {
      if (isValidProps(this.precision)) {
        return this.precision;
      }
      var valueString = value.toString();
      if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
      }
      var precision = 0;
      if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
      }
      return precision;
    },

    // step={1.0} value={1.51}
    // press +
    // then value should be 2.51, rather than 2.5
    // if this.props.precision is undefined
    // https://github.com/react-component/input-number/issues/39
    getMaxPrecision: function getMaxPrecision(currentValue) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (isValidProps(this.precision)) {
        return this.precision;
      }
      var step = this.step;

      var ratioPrecision = this.getPrecision(ratio);
      var stepPrecision = this.getPrecision(step);
      var currentValuePrecision = this.getPrecision(currentValue);
      if (!currentValue) {
        return ratioPrecision + stepPrecision;
      }
      return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    },
    getPrecisionFactor: function getPrecisionFactor(currentValue) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var precision = this.getMaxPrecision(currentValue, ratio);
      return Math.pow(10, precision);
    },
    getInputDisplayValue: function getInputDisplayValue() {
      var focused = this.focused,
          inputValue = this.inputValue,
          sValue = this.sValue;

      var inputDisplayValue = void 0;
      if (focused) {
        inputDisplayValue = inputValue;
      } else {
        inputDisplayValue = this.toPrecisionAsStep(sValue);
      }

      if (inputDisplayValue === undefined || inputDisplayValue === null) {
        inputDisplayValue = '';
      }

      return inputDisplayValue;
    },
    recordCursorPosition: function recordCursorPosition() {
      // Record position
      try {
        var inputElem = this.$refs.inputRef;
        this.cursorStart = inputElem.selectionStart;
        this.cursorEnd = inputElem.selectionEnd;
        this.currentValue = inputElem.value;
        this.cursorBefore = inputElem.value.substring(0, this.cursorStart);
        this.cursorAfter = inputElem.value.substring(this.cursorEnd);
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    },
    fixCaret: function fixCaret(start, end) {
      if (start === undefined || end === undefined || !this.input || !this.input.value) {
        return;
      }

      try {
        var inputElem = this.$refs.inputRef;
        var currentStart = inputElem.selectionStart;
        var currentEnd = inputElem.selectionEnd;

        if (start !== currentStart || end !== currentEnd) {
          inputElem.setSelectionRange(start, end);
        }
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    },
    restoreByAfter: function restoreByAfter(str) {
      if (str === undefined) return false;

      var fullStr = this.$refs.inputRef.value;
      var index = fullStr.lastIndexOf(str);

      if (index === -1) return false;

      if (index + str.length === fullStr.length) {
        this.fixCaret(index, index);

        return true;
      }
      return false;
    },
    partRestoreByAfter: function partRestoreByAfter(str) {
      var _this5 = this;

      if (str === undefined) return false;

      // For loop from full str to the str with last char to map. e.g. 123
      // -> 123
      // -> 23
      // -> 3
      return Array.prototype.some.call(str, function (_, start) {
        var partStr = str.substring(start);

        return _this5.restoreByAfter(partStr);
      });
    },
    focus: function focus() {
      this.$refs.inputRef.focus();
      this.recordCursorPosition();
    },
    blur: function blur() {
      this.$refs.inputRef.blur();
    },
    formatWrapper: function formatWrapper(num) {
      // http://2ality.com/2012/03/signedzero.html
      // https://github.com/ant-design/ant-design/issues/9439
      if (is_negative_zero_default()(num)) {
        return '-0';
      }
      if (this.formatter) {
        return this.formatter(num);
      }
      return num;
    },
    toPrecisionAsStep: function toPrecisionAsStep(num) {
      if (this.isNotCompleteNumber(num) || num === '') {
        return num;
      }
      var precision = Math.abs(this.getMaxPrecision(num));
      if (precision === 0) {
        return num.toString();
      }
      if (!isNaN(precision)) {
        return Number(num).toFixed(precision);
      }
      return num.toString();
    },

    // '1.' '1x' 'xx' '' => are not complete numbers
    isNotCompleteNumber: function isNotCompleteNumber(num) {
      return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
    },
    toNumber: function toNumber(num) {
      if (this.isNotCompleteNumber(num)) {
        return num;
      }
      if (isValidProps(this.precision)) {
        return Number(Number(num).toFixed(this.precision));
      }
      return Number(num);
    },

    // '1.0' '1.00'  => may be a inputing number
    toNumberWhenUserInput: function toNumberWhenUserInput(num) {
      // num.length > 16 => prevent input large number will became Infinity
      if ((/\.\d*0$/.test(num) || num.length > 16) && this.focused) {
        return num;
      }
      return this.toNumber(num);
    },
    upStep: function upStep(val, rat) {
      var step = this.step,
          min = this.min;

      var precisionFactor = this.getPrecisionFactor(val, rat);
      var precision = Math.abs(this.getMaxPrecision(val, rat));
      var result = void 0;
      if (typeof val === 'number') {
        result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? step : min;
      }
      return this.toNumber(result);
    },
    downStep: function downStep(val, rat) {
      var step = this.step,
          min = this.min;

      var precisionFactor = this.getPrecisionFactor(val, rat);
      var precision = Math.abs(this.getMaxPrecision(val, rat));
      var result = void 0;
      if (typeof val === 'number') {
        result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? -step : min;
      }
      return this.toNumber(result);
    },
    stepFn: function stepFn(type, e) {
      var _this6 = this;

      var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var recursive = arguments[3];

      this.stop();
      if (e) {
        // e.persist()
        e.preventDefault();
      }
      if (this.disabled) {
        return;
      }
      var max = this.max,
          min = this.min;

      var value = this.getCurrentValidValue(this.inputValue) || 0;
      if (this.isNotCompleteNumber(value)) {
        return;
      }
      var val = this[type + 'Step'](value, ratio);
      var outOfRange = val > max || val < min;
      if (val > max) {
        val = max;
      } else if (val < min) {
        val = min;
      }
      this.setValue(val);
      this.setState({
        focused: true
      });
      if (outOfRange) {
        return;
      }
      this.autoStepTimer = setTimeout(function () {
        _this6[type](e, ratio, true);
      }, recursive ? SPEED : DELAY);
    },
    stop: function stop() {
      if (this.autoStepTimer) {
        clearTimeout(this.autoStepTimer);
      }
    },
    down: function down(e, ratio, recursive) {
      this.pressingUpOrDown = true;
      this.stepFn('down', e, ratio, recursive);
    },
    up: function up(e, ratio, recursive) {
      this.pressingUpOrDown = true;
      this.stepFn('up', e, ratio, recursive);
    },
    handleInputClick: function handleInputClick() {
      this.$emit('click');
    }
  },
  render: function render() {
    var _classNames;

    var h = arguments[0];
    var _$props = this.$props,
        prefixCls = _$props.prefixCls,
        disabled = _$props.disabled,
        readOnly = _$props.readOnly,
        useTouch = _$props.useTouch,
        autoComplete = _$props.autoComplete,
        upHandler = _$props.upHandler,
        downHandler = _$props.downHandler;

    var classes = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls, true), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), defineProperty_default()(_classNames, prefixCls + '-focused', this.focused), _classNames));
    var upDisabledClass = '';
    var downDisabledClass = '';
    var sValue = this.sValue;

    if (sValue || sValue === 0) {
      if (!isNaN(sValue)) {
        var val = Number(sValue);
        if (val >= this.max) {
          upDisabledClass = prefixCls + '-handler-up-disabled';
        }
        if (val <= this.min) {
          downDisabledClass = prefixCls + '-handler-down-disabled';
        }
      } else {
        upDisabledClass = prefixCls + '-handler-up-disabled';
        downDisabledClass = prefixCls + '-handler-down-disabled';
      }
    }

    var editable = !this.readOnly && !this.disabled;

    // focus state, show input value
    // unfocus state, show valid value
    var inputDisplayValue = void 0;
    if (this.focused) {
      inputDisplayValue = this.inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(this.sValue);
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }

    var upEvents = void 0;
    var downEvents = void 0;
    if (useTouch) {
      upEvents = {
        touchstart: editable && !upDisabledClass ? this.up : noop,
        touchend: this.stop
      };
      downEvents = {
        touchstart: editable && !downDisabledClass ? this.down : noop,
        touchend: this.stop
      };
    } else {
      upEvents = {
        mousedown: editable && !upDisabledClass ? this.up : noop,
        mouseup: this.stop,
        mouseleave: this.stop
      };
      downEvents = {
        mousedown: editable && !downDisabledClass ? this.down : noop,
        mouseup: this.stop,
        mouseleave: this.stop
      };
    }
    var inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    if (isValidProps(this.decimalSeparator)) {
      inputDisplayValueFormat = inputDisplayValueFormat.toString().replace('.', this.decimalSeparator);
    }
    var isUpDisabled = !!upDisabledClass || disabled || readOnly;
    var isDownDisabled = !!downDisabledClass || disabled || readOnly;
    var _$listeners = this.$listeners,
        _$listeners$mouseente = _$listeners.mouseenter,
        mouseenter = _$listeners$mouseente === undefined ? noop : _$listeners$mouseente,
        _$listeners$mouseleav = _$listeners.mouseleave,
        mouseleave = _$listeners$mouseleav === undefined ? noop : _$listeners$mouseleav,
        _$listeners$mouseover = _$listeners.mouseover,
        mouseover = _$listeners$mouseover === undefined ? noop : _$listeners$mouseover,
        _$listeners$mouseout = _$listeners.mouseout,
        mouseout = _$listeners$mouseout === undefined ? noop : _$listeners$mouseout;

    var contentProps = {
      on: { mouseenter: mouseenter, mouseleave: mouseleave, mouseover: mouseover, mouseout: mouseout },
      'class': classes,
      attrs: { title: this.$props.title }
    };
    var upHandlerProps = {
      props: {
        disabled: isUpDisabled,
        prefixCls: prefixCls
      },
      attrs: {
        unselectable: 'unselectable',
        role: 'button',
        'aria-label': 'Increase Value',
        'aria-disabled': !!isUpDisabled
      },
      'class': prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass,
      on: upEvents,
      ref: 'up'
    };
    var downHandlerProps = {
      props: {
        disabled: isDownDisabled,
        prefixCls: prefixCls
      },
      attrs: {
        unselectable: 'unselectable',
        role: 'button',
        'aria-label': 'Decrease Value',
        'aria-disabled': !!isDownDisabled
      },
      'class': prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass,
      on: downEvents,
      ref: 'down'
    };
    // ref for test
    return h(
      'div',
      contentProps,
      [h(
        'div',
        { 'class': prefixCls + '-handler-wrap' },
        [h(
          src_InputHandler,
          upHandlerProps,
          [upHandler || h('span', {
            attrs: {
              unselectable: 'unselectable'
            },
            'class': prefixCls + '-handler-up-inner',
            on: {
              'click': preventDefault
            }
          })]
        ), h(
          src_InputHandler,
          downHandlerProps,
          [downHandler || h('span', {
            attrs: {
              unselectable: 'unselectable'
            },
            'class': prefixCls + '-handler-down-inner',
            on: {
              'click': preventDefault
            }
          })]
        )]
      ), h(
        'div',
        {
          'class': prefixCls + '-input-wrap',
          attrs: { role: 'spinbutton',
            'aria-valuemin': this.min,
            'aria-valuemax': this.max,
            'aria-valuenow': sValue
          }
        },
        [h('input', {
          attrs: {
            required: this.required,
            type: this.type,
            placeholder: this.placeholder,

            tabIndex: this.tabIndex,
            autoComplete: autoComplete,

            maxLength: this.maxLength,
            readOnly: this.readOnly,
            disabled: this.disabled,
            max: this.max,
            min: this.min,
            step: this.step,
            name: this.name,
            id: this.id,

            pattern: this.pattern
          },
          on: {
            'click': this.handleInputClick,
            'focus': this.onFocus,
            'blur': this.onBlur,
            'keydown': editable ? this.onKeyDown : noop,
            'keyup': editable ? this.onKeyUp : noop,
            'input': this.onChange
          },

          'class': prefixCls + '-input',
          ref: 'inputRef',
          domProps: {
            'value': inputDisplayValueFormat
          }
        })]
      )]
    );
  }
});

/***/ }),

/***/ "a3a2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/omit.js/es/index.js
var es = __webpack_require__("0464");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js + 5 modules
var vc_trigger = __webpack_require__("8496");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/store/connect.js
var connect = __webpack_require__("e90a");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/SubPopupMenu.js + 1 modules
var SubPopupMenu = __webpack_require__("1462");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/placements.js
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};

/* harmony default export */ var vc_menu_placements = (placements);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/requestAnimationTimeout.js + 1 modules
var requestAnimationTimeout = __webpack_require__("d41d");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/util.js
var util = __webpack_require__("2b89");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/SubMenu.js

















var guid = 0;

var popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop',
  'vertical-left': 'rightTop',
  'vertical-right': 'leftTop'
};

var SubMenu_updateDefaultActiveFirst = function updateDefaultActiveFirst(store, eventKey, defaultActiveFirst) {
  var menuId = Object(util["b" /* getMenuIdFromSubMenuEventKey */])(eventKey);
  var state = store.getState();
  store.setState({
    defaultActiveFirst: extends_default()({}, state.defaultActiveFirst, defineProperty_default()({}, menuId, defaultActiveFirst))
  });
};

var SubMenu = {
  name: 'SubMenu',
  props: {
    parentMenu: vue_types["a" /* default */].object,
    title: vue_types["a" /* default */].any,
    selectedKeys: vue_types["a" /* default */].array.def([]),
    openKeys: vue_types["a" /* default */].array.def([]),
    openChange: vue_types["a" /* default */].func.def(util["h" /* noop */]),
    rootPrefixCls: vue_types["a" /* default */].string,
    eventKey: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    multiple: vue_types["a" /* default */].bool,
    active: vue_types["a" /* default */].bool, // TODO: remove
    isRootMenu: vue_types["a" /* default */].bool.def(false),
    index: vue_types["a" /* default */].number,
    triggerSubMenuAction: vue_types["a" /* default */].string,
    popupClassName: vue_types["a" /* default */].string,
    getPopupContainer: vue_types["a" /* default */].func,
    forceSubMenuRender: vue_types["a" /* default */].bool,
    openAnimation: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    disabled: vue_types["a" /* default */].bool,
    subMenuOpenDelay: vue_types["a" /* default */].number.def(0.1),
    subMenuCloseDelay: vue_types["a" /* default */].number.def(0.1),
    level: vue_types["a" /* default */].number.def(1),
    inlineIndent: vue_types["a" /* default */].number.def(24),
    openTransitionName: vue_types["a" /* default */].string,
    popupOffset: vue_types["a" /* default */].array,
    isOpen: vue_types["a" /* default */].bool,
    store: vue_types["a" /* default */].object,
    mode: vue_types["a" /* default */].oneOf(['horizontal', 'vertical', 'vertical-left', 'vertical-right', 'inline']).def('vertical'),
    manualRef: vue_types["a" /* default */].func.def(util["h" /* noop */]),
    builtinPlacements: vue_types["a" /* default */].object.def({}),
    itemIcon: vue_types["a" /* default */].any,
    expandIcon: vue_types["a" /* default */].any
  },
  mixins: [BaseMixin["a" /* default */]],
  isSubMenu: true,
  data: function data() {
    var props = this.$props;
    var store = props.store;
    var eventKey = props.eventKey;
    var defaultActiveFirst = store.getState().defaultActiveFirst;
    var value = false;

    if (defaultActiveFirst) {
      value = defaultActiveFirst[eventKey];
    }

    SubMenu_updateDefaultActiveFirst(store, eventKey, value);
    return {
      // defaultActiveFirst: false,
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.handleUpdated();
    });
  },
  updated: function updated() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.handleUpdated();
    });
  },
  beforeDestroy: function beforeDestroy() {
    var eventKey = this.eventKey;

    this.__emit('destroy', eventKey);

    /* istanbul ignore if */
    if (this.minWidthTimeout) {
      Object(requestAnimationTimeout["a" /* cancelAnimationTimeout */])(this.minWidthTimeout);
      this.minWidthTimeout = null;
    }

    /* istanbul ignore if */
    if (this.mouseenterTimeout) {
      Object(requestAnimationTimeout["a" /* cancelAnimationTimeout */])(this.mouseenterTimeout);
      this.mouseenterTimeout = null;
    }
  },

  methods: {
    handleUpdated: function handleUpdated() {
      var _this3 = this;

      var _$props = this.$props,
          mode = _$props.mode,
          parentMenu = _$props.parentMenu,
          manualRef = _$props.manualRef;

      // invoke customized ref to expose component to mixin

      if (manualRef) {
        manualRef(this);
      }

      if (mode !== 'horizontal' || !parentMenu.isRootMenu || !this.isOpen) {
        return;
      }

      this.minWidthTimeout = Object(requestAnimationTimeout["b" /* requestAnimationTimeout */])(function () {
        return _this3.adjustWidth();
      }, 0);
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      var menu = this.menuInstance;
      var _$props2 = this.$props,
          store = _$props2.store,
          isOpen = _$props2.isOpen;


      if (keyCode === KeyCode["a" /* default */].ENTER) {
        this.onTitleClick(e);
        SubMenu_updateDefaultActiveFirst(store, this.eventKey, true);
        return true;
      }

      if (keyCode === KeyCode["a" /* default */].RIGHT) {
        if (isOpen) {
          menu.onKeyDown(e);
        } else {
          this.triggerOpenChange(true);
          // need to update current menu's defaultActiveFirst value
          SubMenu_updateDefaultActiveFirst(store, this.eventKey, true);
        }
        return true;
      }
      if (keyCode === KeyCode["a" /* default */].LEFT) {
        var handled = void 0;
        if (isOpen) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }
        if (!handled) {
          this.triggerOpenChange(false);
          handled = true;
        }
        return handled;
      }

      if (isOpen && (keyCode === KeyCode["a" /* default */].UP || keyCode === KeyCode["a" /* default */].DOWN)) {
        return menu.onKeyDown(e);
      }
    },
    onPopupVisibleChange: function onPopupVisibleChange(visible) {
      this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
    },
    onMouseEnter: function onMouseEnter(e) {
      var _$props3 = this.$props,
          key = _$props3.eventKey,
          store = _$props3.store;

      SubMenu_updateDefaultActiveFirst(store, key, false);
      this.__emit('mouseenter', {
        key: key,
        domEvent: e
      });
    },
    onMouseLeave: function onMouseLeave(e) {
      var eventKey = this.eventKey,
          parentMenu = this.parentMenu;

      parentMenu.subMenuInstance = this;
      // parentMenu.subMenuLeaveFn = () => {
      // // trigger mouseleave
      //   this.__emit('mouseleave', {
      //     key: eventKey,
      //     domEvent: e,
      //   })
      // }
      this.__emit('mouseleave', {
        key: eventKey,
        domEvent: e
      });
      // prevent popup menu and submenu gap
      // parentMenu.subMenuLeaveTimer = setTimeout(parentMenu.subMenuLeaveFn, 100)
    },
    onTitleMouseEnter: function onTitleMouseEnter(domEvent) {
      var key = this.$props.eventKey;
      // this.clearSubMenuTitleLeaveTimer()

      this.__emit('itemHover', {
        key: key,
        hover: true
      });
      this.__emit('titleMouseenter', {
        key: key,
        domEvent: domEvent
      });
    },
    onTitleMouseLeave: function onTitleMouseLeave(e) {
      var eventKey = this.eventKey,
          parentMenu = this.parentMenu;

      parentMenu.subMenuInstance = this;
      this.__emit('itemHover', {
        key: eventKey,
        hover: false
      });
      this.__emit('titleMouseleave', {
        key: eventKey,
        domEvent: e
      });
    },
    onTitleClick: function onTitleClick(e) {
      var _$props4 = this.$props,
          triggerSubMenuAction = _$props4.triggerSubMenuAction,
          eventKey = _$props4.eventKey,
          isOpen = _$props4.isOpen,
          store = _$props4.store;

      this.__emit('titleClick', {
        key: eventKey,
        domEvent: e
      });
      if (triggerSubMenuAction === 'hover') {
        return;
      }
      this.triggerOpenChange(!isOpen, 'click');
      SubMenu_updateDefaultActiveFirst(store, eventKey, false);
    },
    onSubMenuClick: function onSubMenuClick(info) {
      this.__emit('click', this.addKeyPath(info));
    },
    getPrefixCls: function getPrefixCls() {
      return this.$props.rootPrefixCls + '-submenu';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    getSelectedClassName: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },
    getOpenClassName: function getOpenClassName() {
      return this.$props.rootPrefixCls + '-submenu-open';
    },
    saveMenuInstance: function saveMenuInstance(c) {
      // children menu instance
      this.menuInstance = c;
    },
    addKeyPath: function addKeyPath(info) {
      return extends_default()({}, info, {
        keyPath: (info.keyPath || []).concat(this.$props.eventKey)
      });
    },


    // triggerOpenChange (open, type) {
    //   const key = this.$props.eventKey
    //   this.__emit('openChange', {
    //     key,
    //     item: this,
    //     trigger: type,
    //     open,
    //   })
    // },
    triggerOpenChange: function triggerOpenChange(open, type) {
      var _this4 = this;

      var key = this.$props.eventKey;
      var openChange = function openChange() {
        _this4.__emit('openChange', {
          key: key,
          item: _this4,
          trigger: type,
          open: open
        });
      };
      if (type === 'mouseenter') {
        // make sure mouseenter happen after other menu item's mouseleave
        this.mouseenterTimeout = Object(requestAnimationTimeout["b" /* requestAnimationTimeout */])(function () {
          openChange();
        }, 0);
      } else {
        openChange();
      }
    },
    isChildrenSelected: function isChildrenSelected() {
      var ret = { find: false };
      Object(util["f" /* loopMenuItemRecursively */])(this.$slots['default'], this.$props.selectedKeys, ret);
      return ret.find;
    },

    // isOpen () {
    //   return this.$props.openKeys.indexOf(this.$props.eventKey) !== -1
    // },

    adjustWidth: function adjustWidth() {
      /* istanbul ignore if */
      if (!this.$refs.subMenuTitle || !this.menuInstance) {
        return;
      }
      var popupMenu = this.menuInstance.$el;
      if (popupMenu.offsetWidth >= this.$refs.subMenuTitle.offsetWidth) {
        return;
      }

      /* istanbul ignore next */
      popupMenu.style.minWidth = this.$refs.subMenuTitle.offsetWidth + 'px';
    },
    renderChildren: function renderChildren(children) {
      var h = this.$createElement;

      var props = this.$props;
      var _$listeners = this.$listeners,
          select = _$listeners.select,
          deselect = _$listeners.deselect,
          openChange = _$listeners.openChange;

      var subPopupMenuProps = {
        props: {
          mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
          visible: props.isOpen,
          level: props.level + 1,
          inlineIndent: props.inlineIndent,
          focusable: false,
          selectedKeys: props.selectedKeys,
          eventKey: props.eventKey + '-menu-',
          openKeys: props.openKeys,
          openTransitionName: props.openTransitionName,
          openAnimation: props.openAnimation,
          subMenuOpenDelay: props.subMenuOpenDelay,
          parentMenu: this,
          subMenuCloseDelay: props.subMenuCloseDelay,
          forceSubMenuRender: props.forceSubMenuRender,
          triggerSubMenuAction: props.triggerSubMenuAction,
          builtinPlacements: props.builtinPlacements,
          defaultActiveFirst: props.store.getState().defaultActiveFirst[Object(util["b" /* getMenuIdFromSubMenuEventKey */])(props.eventKey)],
          multiple: props.multiple,
          prefixCls: props.rootPrefixCls,
          manualRef: this.saveMenuInstance,
          itemIcon: Object(props_util["g" /* getComponentFromProp */])(this, 'itemIcon'),
          expandIcon: Object(props_util["g" /* getComponentFromProp */])(this, 'expandIcon'),
          children: children
        },
        on: {
          click: this.onSubMenuClick,
          select: select,
          deselect: deselect,
          openChange: openChange
        },
        id: this._menuId
      };
      var baseProps = subPopupMenuProps.props;
      var haveRendered = this.haveRendered;
      this.haveRendered = true;

      this.haveOpened = this.haveOpened || baseProps.visible || baseProps.forceSubMenuRender;
      // never rendered not planning to, don't render
      if (!this.haveOpened) {
        return h('div');
      }

      // don't show transition on first rendering (no animation for opened menu)
      // show appear transition if it's not visible (not sure why)
      // show appear transition if it's not inline mode
      var transitionAppear = haveRendered || !baseProps.visible || !baseProps.mode === 'inline';
      subPopupMenuProps['class'] = ' ' + baseProps.prefixCls + '-sub';
      var animProps = { appear: transitionAppear, css: false };
      var transitionProps = {
        props: animProps,
        on: {}
      };
      if (baseProps.openTransitionName) {
        transitionProps = Object(getTransitionProps["a" /* default */])(baseProps.openTransitionName, {
          appear: transitionAppear
        });
      } else if (typeof_default()(baseProps.openAnimation) === 'object') {
        animProps = extends_default()({}, animProps, baseProps.openAnimation.props || {});
        if (!transitionAppear) {
          animProps.appear = false;
        }
      } else if (typeof baseProps.openAnimation === 'string') {
        transitionProps = Object(getTransitionProps["a" /* default */])(baseProps.openAnimation, { appear: transitionAppear });
      }

      if (typeof_default()(baseProps.openAnimation) === 'object' && baseProps.openAnimation.on) {
        transitionProps.on = baseProps.openAnimation.on;
      }
      return h(
        'transition',
        transitionProps,
        [h(SubPopupMenu["a" /* default */], babel_helper_vue_jsx_merge_props_default()([{
          directives: [{
            name: 'show',
            value: props.isOpen
          }]
        }, subPopupMenuProps]))]
      );
    }
  },

  render: function render() {
    var _className, _attrs;

    var h = arguments[0];

    var props = this.$props;
    var rootPrefixCls = this.rootPrefixCls,
        parentMenu = this.parentMenu,
        _$listeners2 = this.$listeners,
        $listeners = _$listeners2 === undefined ? {} : _$listeners2;

    var isOpen = props.isOpen;
    var prefixCls = this.getPrefixCls();
    var isInlineMode = props.mode === 'inline';
    var className = (_className = {}, defineProperty_default()(_className, prefixCls, true), defineProperty_default()(_className, prefixCls + '-' + props.mode, true), defineProperty_default()(_className, this.getOpenClassName(), isOpen), defineProperty_default()(_className, this.getActiveClassName(), props.active || isOpen && !isInlineMode), defineProperty_default()(_className, this.getDisabledClassName(), props.disabled), defineProperty_default()(_className, this.getSelectedClassName(), this.isChildrenSelected()), _className);

    if (!this._menuId) {
      if (props.eventKey) {
        this._menuId = props.eventKey + '$Menu';
      } else {
        this._menuId = '$__$' + ++guid + '$Menu';
      }
    }

    var mouseEvents = {};
    var titleClickEvents = {};
    var titleMouseEvents = {};
    if (!props.disabled) {
      mouseEvents = {
        mouseleave: this.onMouseLeave,
        mouseenter: this.onMouseEnter
      };

      // only works in title, not outer li
      titleClickEvents = {
        click: this.onTitleClick
      };
      titleMouseEvents = {
        mouseenter: this.onTitleMouseEnter,
        mouseleave: this.onTitleMouseLeave
      };
    }

    var style = {};
    if (isInlineMode) {
      style.paddingLeft = props.inlineIndent * props.level + 'px';
    }
    var ariaOwns = {};
    // only set aria-owns when menu is open
    // otherwise it would be an invalid aria-owns value
    // since corresponding node cannot be found
    if (isOpen) {
      ariaOwns = {
        'aria-owns': this._menuId
      };
    }
    var titleProps = {
      attrs: extends_default()({
        'aria-expanded': isOpen
      }, ariaOwns, {
        'aria-haspopup': 'true',
        title: typeof props.title === 'string' ? props.title : undefined
      }),
      on: extends_default()({}, titleMouseEvents, titleClickEvents),
      style: style,
      'class': prefixCls + '-title',
      ref: 'subMenuTitle'
    };
    // expand custom icon should NOT be displayed in menu with horizontal mode.
    var icon = null;
    if (props.mode !== 'horizontal') {
      icon = Object(props_util["g" /* getComponentFromProp */])(this, 'expandIcon', props);
    }
    var title = h(
      'div',
      titleProps,
      [Object(props_util["g" /* getComponentFromProp */])(this, 'title'), icon || h('i', { 'class': prefixCls + '-arrow' })]
    );
    var children = this.renderChildren(Object(props_util["c" /* filterEmpty */])(this.$slots['default']));

    var getPopupContainer = this.parentMenu.isRootMenu ? this.parentMenu.getPopupContainer : function (triggerNode) {
      return triggerNode.parentNode;
    };
    var popupPlacement = popupPlacementMap[props.mode];
    var popupAlign = props.popupOffset ? { offset: props.popupOffset } : {};
    var popupClassName = props.mode === 'inline' ? '' : props.popupClassName;
    var liProps = {
      on: extends_default()({}, Object(es["a" /* default */])($listeners, ['click']), mouseEvents),
      'class': className
    };

    return h(
      'li',
      babel_helper_vue_jsx_merge_props_default()([liProps, {
        attrs: { role: 'menuitem' }
      }]),
      [isInlineMode && title, isInlineMode && children, !isInlineMode && h(
        vc_trigger["a" /* default */],
        {
          attrs: (_attrs = {
            prefixCls: prefixCls,
            popupClassName: prefixCls + '-popup ' + rootPrefixCls + '-' + parentMenu.theme + ' ' + (popupClassName || ''),
            getPopupContainer: getPopupContainer,
            builtinPlacements: vc_menu_placements
          }, defineProperty_default()(_attrs, 'builtinPlacements', extends_default()({}, vc_menu_placements, props.builtinPlacements)), defineProperty_default()(_attrs, 'popupPlacement', popupPlacement), defineProperty_default()(_attrs, 'popupVisible', isOpen), defineProperty_default()(_attrs, 'popupAlign', popupAlign), defineProperty_default()(_attrs, 'action', props.disabled ? [] : [props.triggerSubMenuAction]), defineProperty_default()(_attrs, 'mouseEnterDelay', props.subMenuOpenDelay), defineProperty_default()(_attrs, 'mouseLeaveDelay', props.subMenuCloseDelay), defineProperty_default()(_attrs, 'forceRender', props.forceSubMenuRender), _attrs),
          on: {
            'popupVisibleChange': this.onPopupVisibleChange
          }
        },
        [h(
          'template',
          { slot: 'popup' },
          [children]
        ), title]
      )]
    );
  }
};

var connected = Object(connect["a" /* default */])(function (_ref, _ref2) {
  var openKeys = _ref.openKeys,
      activeKey = _ref.activeKey,
      selectedKeys = _ref.selectedKeys;
  var eventKey = _ref2.eventKey,
      subMenuKey = _ref2.subMenuKey;
  return {
    isOpen: openKeys.indexOf(eventKey) > -1,
    active: activeKey[subMenuKey] === eventKey,
    selectedKeys: selectedKeys
  };
})(SubMenu);

connected.isSubMenu = true;

/* harmony default export */ var vc_menu_SubMenu = __webpack_exports__["a"] = (connected);

/***/ }),

/***/ "add3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/dom-scroll-into-view/lib/index.js
var lib = __webpack_require__("f43a");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/lodash/has.js
var has = __webpack_require__("3852");
var has_default = /*#__PURE__*/__webpack_require__.n(has);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/async-validator/dist-web/index.js
var dist_web = __webpack_require__("2a95");

// EXTERNAL MODULE: ./node_modules/warning/browser.js
var browser = __webpack_require__("e834");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/lodash/get.js
var get = __webpack_require__("9b02");
var get_default = /*#__PURE__*/__webpack_require__.n(get);

// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__("0f5c");
var set_default = /*#__PURE__*/__webpack_require__.n(set);

// EXTERNAL MODULE: ./node_modules/lodash/eq.js
var eq = __webpack_require__("9638");
var eq_default = /*#__PURE__*/__webpack_require__.n(eq);

// EXTERNAL MODULE: ./node_modules/lodash/omit.js
var omit = __webpack_require__("3eea");
var omit_default = /*#__PURE__*/__webpack_require__.n(omit);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__("8827");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__("57ba");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-form/src/createFormField.js
var createFormField = __webpack_require__("4c82");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-form/src/utils.js




function getDisplayName(WrappedComponent) {
  return WrappedComponent.name || 'WrappedComponent';
}

function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.name = 'Form_' + getDisplayName(WrappedComponent);
  Container.WrappedComponent = WrappedComponent;
  Container.props = extends_default()({}, Container.props, WrappedComponent.props);
  return Container;
}

function identity(obj) {
  return obj;
}

function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}

function treeTraverse() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var tree = arguments[1];
  var isLeafNode = arguments[2];
  var errorMessage = arguments[3];
  var callback = arguments[4];

  if (isLeafNode(path, tree)) {
    callback(path, tree);
  } else if (tree === undefined || tree === null) {
    // Do nothing
  } else if (Array.isArray(tree)) {
    tree.forEach(function (subTree, index) {
      return treeTraverse(path + '[' + index + ']', subTree, isLeafNode, errorMessage, callback);
    });
  } else {
    // It's object and not a leaf node
    if ((typeof tree === 'undefined' ? 'undefined' : typeof_default()(tree)) !== 'object') {
      browser_default()(false, errorMessage);
      return;
    }
    Object.keys(tree).forEach(function (subTreeKey) {
      var subTree = tree[subTreeKey];
      treeTraverse('' + path + (path ? '.' : '') + subTreeKey, subTree, isLeafNode, errorMessage, callback);
    });
  }
}

function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  var fields = {};
  treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, function (path, node) {
    fields[path] = node;
  });
  return fields;
}

function normalizeValidateRules(validate, rules, validateTrigger) {
  var validateRules = validate.map(function (item) {
    var newItem = extends_default()({}, item, {
      trigger: item.trigger || []
    });
    if (typeof newItem.trigger === 'string') {
      newItem.trigger = [newItem.trigger];
    }
    return newItem;
  });
  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules: rules
    });
  }
  return validateRules;
}

function getValidateTriggers(validateRules) {
  return validateRules.filter(function (item) {
    return !!item.rules && item.rules.length;
  }).map(function (item) {
    return item.trigger;
  }).reduce(function (pre, curr) {
    return pre.concat(curr);
  }, []);
}

function getValueFromEvent(e) {
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  var target = e.target;

  return target.type === 'checkbox' ? target.checked : target.value;
}

function getErrorStrs(errors) {
  if (errors) {
    return errors.map(function (e) {
      if (e && e.message) {
        return e.message;
      }
      return e;
    });
  }
  return errors;
}

function getParams(ns, opt, cb) {
  var names = ns;
  var options = opt;
  var callback = cb;
  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }
  return {
    names: names,
    options: options,
    callback: callback
  };
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function hasRules(validate) {
  if (validate) {
    return validate.some(function (item) {
      return item.rules && item.rules.length;
    });
  }
  return false;
}

function startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-form/src/createFieldsStore.js








function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

function internalFlattenFields(fields) {
  return flattenFields(fields, function (_, node) {
    return Object(createFormField["b" /* isFormField */])(node);
  }, 'You must wrap field data with `createFormField`.');
}

var createFieldsStore_FieldsStore = function () {
  function FieldsStore(fields) {
    classCallCheck_default()(this, FieldsStore);

    createFieldsStore_initialiseProps.call(this);

    this.fields = internalFlattenFields(fields);
    this.fieldsMeta = {};
  }

  createClass_default()(FieldsStore, [{
    key: 'updateFields',
    value: function updateFields(fields) {
      this.fields = internalFlattenFields(fields);
    }
  }, {
    key: 'flattenRegisteredFields',
    value: function flattenRegisteredFields(fields) {
      var validFieldsName = this.getAllFieldsName();
      return flattenFields(fields, function (path) {
        return validFieldsName.indexOf(path) >= 0;
      }, 'You cannot set a form field before rendering a field associated with the value.');
    }
  }, {
    key: 'setFields',
    value: function setFields(fields) {
      var _this = this;

      var fieldsMeta = this.fieldsMeta;
      var nowFields = extends_default()({}, this.fields, fields);
      var nowValues = {};
      Object.keys(fieldsMeta).forEach(function (f) {
        nowValues[f] = _this.getValueFromFields(f, nowFields);
      });
      Object.keys(nowValues).forEach(function (f) {
        var value = nowValues[f];
        var fieldMeta = _this.getFieldMeta(f);
        if (fieldMeta && fieldMeta.normalize) {
          var nowValue = fieldMeta.normalize(value, _this.getValueFromFields(f, _this.fields), nowValues);
          if (nowValue !== value) {
            nowFields[f] = extends_default()({}, nowFields[f], {
              value: nowValue
            });
          }
        }
      });
      this.fields = nowFields;
    }
  }, {
    key: 'resetFields',
    value: function resetFields(ns) {
      var fields = this.fields;

      var names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
      return names.reduce(function (acc, name) {
        var field = fields[name];
        if (field && 'value' in field) {
          acc[name] = {};
        }
        return acc;
      }, {});
    }
  }, {
    key: 'setFieldMeta',
    value: function setFieldMeta(name, meta) {
      this.fieldsMeta[name] = meta;
    }
  }, {
    key: 'setFieldsAsDirty',
    value: function setFieldsAsDirty() {
      var _this2 = this;

      Object.keys(this.fields).forEach(function (name) {
        var field = _this2.fields[name];
        var fieldMeta = _this2.fieldsMeta[name];
        if (field && fieldMeta && hasRules(fieldMeta.validate)) {
          _this2.fields[name] = extends_default()({}, field, {
            dirty: true
          });
        }
      });
    }
  }, {
    key: 'getFieldMeta',
    value: function getFieldMeta(name) {
      this.fieldsMeta[name] = this.fieldsMeta[name] || {};
      return this.fieldsMeta[name];
    }
  }, {
    key: 'getValueFromFields',
    value: function getValueFromFields(name, fields) {
      var field = fields[name];
      if (field && 'value' in field) {
        return field.value;
      }
      var fieldMeta = this.getFieldMeta(name);
      return fieldMeta && fieldMeta.initialValue;
    }
  }, {
    key: 'getValidFieldsName',
    value: function getValidFieldsName() {
      var _this3 = this;

      var fieldsMeta = this.fieldsMeta;

      return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
        return !_this3.getFieldMeta(name).hidden;
      }) : [];
    }
  }, {
    key: 'getAllFieldsName',
    value: function getAllFieldsName() {
      var fieldsMeta = this.fieldsMeta;

      return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }
  }, {
    key: 'getValidFieldsFullName',
    value: function getValidFieldsFullName(maybePartialName) {
      var maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [maybePartialName];
      return this.getValidFieldsName().filter(function (fullName) {
        return maybePartialNames.some(function (partialName) {
          return fullName === partialName || startsWith(fullName, partialName) && ['.', '['].indexOf(fullName[partialName.length]) >= 0;
        });
      });
    }
  }, {
    key: 'getFieldValuePropValue',
    value: function getFieldValuePropValue(fieldMeta) {
      var name = fieldMeta.name,
          getValueProps = fieldMeta.getValueProps,
          valuePropName = fieldMeta.valuePropName;

      var field = this.getField(name);
      var fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
      if (getValueProps) {
        return getValueProps(fieldValue);
      }
      return defineProperty_default()({}, valuePropName, fieldValue);
    }
  }, {
    key: 'getField',
    value: function getField(name) {
      return extends_default()({}, this.fields[name], {
        name: name
      });
    }
  }, {
    key: 'getNotCollectedFields',
    value: function getNotCollectedFields() {
      var _this4 = this;

      var fieldsName = this.getValidFieldsName();
      return fieldsName.filter(function (name) {
        return !_this4.fields[name];
      }).map(function (name) {
        return {
          name: name,
          dirty: false,
          value: _this4.getFieldMeta(name).initialValue
        };
      }).reduce(function (acc, field) {
        return set_default()(acc, field.name, Object(createFormField["a" /* default */])(field));
      }, {});
    }
  }, {
    key: 'getNestedAllFields',
    value: function getNestedAllFields() {
      var _this5 = this;

      return Object.keys(this.fields).reduce(function (acc, name) {
        return set_default()(acc, name, Object(createFormField["a" /* default */])(_this5.fields[name]));
      }, this.getNotCollectedFields());
    }
  }, {
    key: 'getFieldMember',
    value: function getFieldMember(name, member) {
      return this.getField(name)[member];
    }
  }, {
    key: 'getNestedFields',
    value: function getNestedFields(names, getter) {
      var fields = names || this.getValidFieldsName();
      return fields.reduce(function (acc, f) {
        return set_default()(acc, f, getter(f));
      }, {});
    }
  }, {
    key: 'getNestedField',
    value: function getNestedField(name, getter) {
      var fullNames = this.getValidFieldsFullName(name);
      if (fullNames.length === 0 || // Not registered
      fullNames.length === 1 && fullNames[0] === name // Name already is full name.
      ) {
          return getter(name);
        }
      var isArrayValue = fullNames[0][name.length] === '[';
      var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
      return fullNames.reduce(function (acc, fullName) {
        return set_default()(acc, fullName.slice(suffixNameStartIndex), getter(fullName));
      }, isArrayValue ? [] : {});
    }
  }, {
    key: 'isValidNestedFieldName',


    // @private
    // BG: `a` and `a.b` cannot be use in the same form
    value: function isValidNestedFieldName(name) {
      var names = this.getAllFieldsName();
      return names.every(function (n) {
        return !partOf(n, name) && !partOf(name, n);
      });
    }
  }, {
    key: 'clearField',
    value: function clearField(name) {
      delete this.fields[name];
      delete this.fieldsMeta[name];
    }
  }]);

  return FieldsStore;
}();

var createFieldsStore_initialiseProps = function _initialiseProps() {
  var _this6 = this;

  this.setFieldsInitialValue = function (initialValues) {
    var flattenedInitialValues = _this6.flattenRegisteredFields(initialValues);
    var fieldsMeta = _this6.fieldsMeta;
    Object.keys(flattenedInitialValues).forEach(function (name) {
      if (fieldsMeta[name]) {
        _this6.setFieldMeta(name, extends_default()({}, _this6.getFieldMeta(name), {
          initialValue: flattenedInitialValues[name]
        }));
      }
    });
  };

  this.getAllValues = function () {
    var fieldsMeta = _this6.fieldsMeta,
        fields = _this6.fields;

    return Object.keys(fieldsMeta).reduce(function (acc, name) {
      return set_default()(acc, name, _this6.getValueFromFields(name, fields));
    }, {});
  };

  this.getFieldsValue = function (names) {
    return _this6.getNestedFields(names, _this6.getFieldValue);
  };

  this.getFieldValue = function (name) {
    var fields = _this6.fields;

    return _this6.getNestedField(name, function (fullName) {
      return _this6.getValueFromFields(fullName, fields);
    });
  };

  this.getFieldsError = function (names) {
    return _this6.getNestedFields(names, _this6.getFieldError);
  };

  this.getFieldError = function (name) {
    return _this6.getNestedField(name, function (fullName) {
      return getErrorStrs(_this6.getFieldMember(fullName, 'errors'));
    });
  };

  this.isFieldValidating = function (name) {
    return _this6.getFieldMember(name, 'validating');
  };

  this.isFieldsValidating = function (ns) {
    var names = ns || _this6.getValidFieldsName();
    return names.some(function (n) {
      return _this6.isFieldValidating(n);
    });
  };

  this.isFieldTouched = function (name) {
    return _this6.getFieldMember(name, 'touched');
  };

  this.isFieldsTouched = function (ns) {
    var names = ns || _this6.getValidFieldsName();
    return names.some(function (n) {
      return _this6.isFieldTouched(n);
    });
  };
};

function createFieldsStore(fields) {
  return new createFieldsStore_FieldsStore(fields);
}
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-form/src/createBaseForm.js



















var DEFAULT_TRIGGER = 'change';

function createBaseForm() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mixins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var validateMessages = option.validateMessages,
      onFieldsChange = option.onFieldsChange,
      onValuesChange = option.onValuesChange,
      _option$mapProps = option.mapProps,
      mapProps = _option$mapProps === undefined ? identity : _option$mapProps,
      mapPropsToFields = option.mapPropsToFields,
      fieldNameProp = option.fieldNameProp,
      fieldMetaProp = option.fieldMetaProp,
      fieldDataProp = option.fieldDataProp,
      _option$formPropName = option.formPropName,
      formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName,
      formName = option.name,
      _option$props = option.props,
      props = _option$props === undefined ? {} : _option$props,
      templateContext = option.templateContext;

  return function decorate(WrappedComponent) {
    var formProps = {};
    if (Array.isArray(props)) {
      props.forEach(function (prop) {
        formProps[prop] = vue_types["a" /* default */].any;
      });
    } else {
      formProps = props;
    }
    var Form = {
      mixins: [BaseMixin["a" /* default */]].concat(toConsumableArray_default()(mixins)),
      props: extends_default()({}, formProps, {
        wrappedComponentRef: vue_types["a" /* default */].func.def(function () {})
      }),
      data: function data() {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.$props);
        this.fieldsStore = createFieldsStore(fields || {});
        this.templateContext = templateContext;
        this.instances = {};
        this.cachedBind = {};
        this.clearedFieldMetaCache = {};
        this.formItems = {};
        this.renderFields = {};
        this.domFields = {};

        // HACK: https://github.com/ant-design/ant-design/issues/6406
        ['getFieldsValue', 'getFieldValue', 'setFieldsInitialValue', 'getFieldsError', 'getFieldError', 'isFieldValidating', 'isFieldsValidating', 'isFieldsTouched', 'isFieldTouched'].forEach(function (key) {
          _this[key] = function () {
            var _fieldsStore;

            return (_fieldsStore = _this.fieldsStore)[key].apply(_fieldsStore, arguments);
          };
        });

        return {
          submitting: false
        };
      },

      watch: templateContext ? {} : {
        $props: {
          handler: function handler(nextProps) {
            if (mapPropsToFields) {
              this.fieldsStore.updateFields(mapPropsToFields(nextProps));
            }
          },
          deep: true
        }
      },
      mounted: function mounted() {
        this.cleanUpUselessFields();
      },
      updated: function updated() {
        // form updated add for template v-decorator
        this.cleanUpUselessFields();
      },

      methods: {
        updateFields: function updateFields() {
          var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          this.fieldsStore.updateFields(mapPropsToFields(fields));
          if (templateContext) {
            templateContext.$forceUpdate();
          }
        },
        onCollectCommon: function onCollectCommon(name, action, args) {
          var fieldMeta = this.fieldsStore.getFieldMeta(name);
          if (fieldMeta[action]) {
            fieldMeta[action].apply(fieldMeta, toConsumableArray_default()(args));
          } else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
            var _fieldMeta$originalPr;

            (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(_fieldMeta$originalPr, toConsumableArray_default()(args));
          }
          var value = fieldMeta.getValueFromEvent ? fieldMeta.getValueFromEvent.apply(fieldMeta, toConsumableArray_default()(args)) : getValueFromEvent.apply(undefined, toConsumableArray_default()(args));
          if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
            var valuesAll = this.fieldsStore.getAllValues();
            var valuesAllSet = {};
            valuesAll[name] = value;
            Object.keys(valuesAll).forEach(function (key) {
              return set_default()(valuesAllSet, key, valuesAll[key]);
            });
            onValuesChange(extends_default()(defineProperty_default()({}, formPropName, this.getForm()), this.$props), set_default()({}, name, value), valuesAllSet);
          }
          var field = this.fieldsStore.getField(name);
          return { name: name, field: extends_default()({}, field, { value: value, touched: true }), fieldMeta: fieldMeta };
        },
        onCollect: function onCollect(name_, action) {
          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          var _onCollectCommon = this.onCollectCommon(name_, action, args),
              name = _onCollectCommon.name,
              field = _onCollectCommon.field,
              fieldMeta = _onCollectCommon.fieldMeta;

          var validate = fieldMeta.validate;

          this.fieldsStore.setFieldsAsDirty();
          var newField = extends_default()({}, field, {
            dirty: hasRules(validate)
          });
          this.setFields(defineProperty_default()({}, name, newField));
        },
        onCollectValidate: function onCollectValidate(name_, action) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          var _onCollectCommon2 = this.onCollectCommon(name_, action, args),
              field = _onCollectCommon2.field,
              fieldMeta = _onCollectCommon2.fieldMeta;

          var newField = extends_default()({}, field, {
            dirty: true
          });
          this.fieldsStore.setFieldsAsDirty();
          this.validateFieldsInternal([newField], {
            action: action,
            options: {
              firstFields: !!fieldMeta.validateFirst
            }
          });
        },
        getCacheBind: function getCacheBind(name, action, fn) {
          if (!this.cachedBind[name]) {
            this.cachedBind[name] = {};
          }
          var cache = this.cachedBind[name];
          if (!cache[action] || cache[action].oriFn !== fn) {
            cache[action] = {
              fn: fn.bind(this, name, action),
              oriFn: fn
            };
          }
          return cache[action].fn;
        },
        getFieldDecorator: function getFieldDecorator(name, fieldOption, formItem) {
          var _this2 = this;

          var _getFieldProps = this.getFieldProps(name, fieldOption),
              props = _getFieldProps.props,
              restProps = objectWithoutProperties_default()(_getFieldProps, ['props']);

          this.formItems[name] = formItem;
          return function (fieldElem) {
            // We should put field in record if it is rendered
            _this2.renderFields[name] = true;

            var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
            var originalProps = Object(props_util["j" /* getOptionProps */])(fieldElem);
            var originalEvents = Object(props_util["h" /* getEvents */])(fieldElem);
            if (false) { var defaultValuePropName, valuePropName; }
            fieldMeta.originalProps = originalProps;
            // fieldMeta.ref = fieldElem.data && fieldElem.data.ref
            var newProps = extends_default()({
              props: extends_default()({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta))
            }, restProps);
            newProps.domProps.value = newProps.props.value;
            var newEvents = {};
            Object.keys(newProps.on).forEach(function (key) {
              if (originalEvents[key]) {
                var triggerEvents = newProps.on[key];
                newEvents[key] = function () {
                  originalEvents[key].apply(originalEvents, arguments);
                  triggerEvents.apply(undefined, arguments);
                };
              } else {
                newEvents[key] = newProps.on[key];
              }
            });
            return Object(vnode["a" /* cloneElement */])(fieldElem, extends_default()({}, newProps, { on: newEvents }));
          };
        },
        getFieldProps: function getFieldProps(name) {
          var _this3 = this;

          var usersFieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (!name) {
            throw new Error('Must call `getFieldProps` with valid name string!');
          }
          if (false) {}

          delete this.clearedFieldMetaCache[name];

          var fieldOption = extends_default()({
            name: name,
            trigger: DEFAULT_TRIGGER,
            valuePropName: 'value',
            validate: []
          }, usersFieldOption);

          var rules = fieldOption.rules,
              trigger = fieldOption.trigger,
              _fieldOption$validate = fieldOption.validateTrigger,
              validateTrigger = _fieldOption$validate === undefined ? trigger : _fieldOption$validate,
              validate = fieldOption.validate;


          var fieldMeta = this.fieldsStore.getFieldMeta(name);
          if ('initialValue' in fieldOption) {
            fieldMeta.initialValue = fieldOption.initialValue;
          }

          var inputProps = extends_default()({}, this.fieldsStore.getFieldValuePropValue(fieldOption));
          var inputListeners = {};
          var inputAttrs = {};
          if (fieldNameProp) {
            inputProps[fieldNameProp] = formName ? formName + '_' + name : name;
          }

          var validateRules = normalizeValidateRules(validate, rules, validateTrigger);
          var validateTriggers = getValidateTriggers(validateRules);
          validateTriggers.forEach(function (action) {
            if (inputListeners[action]) return;
            inputListeners[action] = _this3.getCacheBind(name, action, _this3.onCollectValidate);
          });

          // make sure that the value will be collect
          if (trigger && validateTriggers.indexOf(trigger) === -1) {
            inputListeners[trigger] = this.getCacheBind(name, trigger, this.onCollect);
          }

          var meta = extends_default()({}, fieldMeta, fieldOption, {
            validate: validateRules
          });
          this.fieldsStore.setFieldMeta(name, meta);
          if (fieldMetaProp) {
            inputAttrs[fieldMetaProp] = meta;
          }

          if (fieldDataProp) {
            inputAttrs[fieldDataProp] = this.fieldsStore.getField(name);
          }
          // This field is rendered, record it
          this.renderFields[name] = true;
          return {
            props: omit_default()(inputProps, ['id']),
            // id: inputProps.id,
            domProps: {
              value: inputProps.value
            },
            attrs: extends_default()({}, inputAttrs, {
              id: inputProps.id
            }),
            directives: [{
              name: 'ant-ref',
              value: this.getCacheBind(name, name + '__ref', this.saveRef)
            }],
            on: inputListeners
          };
        },
        getFieldInstance: function getFieldInstance(name) {
          return this.instances[name];
        },
        getRules: function getRules(fieldMeta, action) {
          var actionRules = fieldMeta.validate.filter(function (item) {
            return !action || item.trigger.indexOf(action) >= 0;
          }).map(function (item) {
            return item.rules;
          });
          return flattenArray(actionRules);
        },
        setFields: function setFields(maybeNestedFields, callback) {
          var _this4 = this;

          var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
          this.fieldsStore.setFields(fields);
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return set_default()(acc, name, _this4.fieldsStore.getField(name));
          }, {});
          if (onFieldsChange) {
            var _changedFields = Object.keys(fields).reduce(function (acc, name) {
              return set_default()(acc, name, _this4.fieldsStore.getField(name));
            }, {});
            onFieldsChange(this, _changedFields, this.fieldsStore.getNestedAllFields());
          }
          var formContext = templateContext || this;
          var allUpdate = false;
          Object.keys(changedFields).forEach(function (key) {
            var formItem = _this4.formItems[key];
            formItem = typeof formItem === 'function' ? formItem() : formItem;
            if (formItem && formItem.itemSelfUpdate) {
              formItem.$forceUpdate();
            } else {
              allUpdate = true;
            }
          });
          if (allUpdate) {
            formContext.$forceUpdate();
          }
          this.$nextTick(function () {
            callback && callback();
          });
        },
        setFieldsValue: function setFieldsValue(changedValues, callback) {
          var fieldsMeta = this.fieldsStore.fieldsMeta;

          var values = this.fieldsStore.flattenRegisteredFields(changedValues);
          var newFields = Object.keys(values).reduce(function (acc, name) {
            var isRegistered = fieldsMeta[name];
            if (false) {}
            if (isRegistered) {
              var value = values[name];
              acc[name] = {
                value: value
              };
            }
            return acc;
          }, {});
          this.setFields(newFields, callback);
          if (onValuesChange) {
            var allValues = this.fieldsStore.getAllValues();
            onValuesChange(extends_default()(defineProperty_default()({}, formPropName, this.getForm()), this.$props), changedValues, allValues);
          }
        },
        saveRef: function saveRef(name, _, component) {
          if (!component) {
            var fieldMeta = this.fieldsStore.getFieldMeta(name);
            if (!fieldMeta.preserve) {
              // after destroy, delete data
              this.clearedFieldMetaCache[name] = {
                field: this.fieldsStore.getField(name),
                meta: fieldMeta
              };
              this.clearField(name);
            }
            delete this.domFields[name];
            return;
          }
          this.domFields[name] = true;
          this.recoverClearedField(name);
          // const fieldMeta = this.fieldsStore.getFieldMeta(name)
          // if (fieldMeta) {
          //   const ref = fieldMeta.ref
          //   if (ref) {
          //     if (typeof ref === 'string') {
          //       throw new Error(`can not set ref string for ${name}`)
          //     }
          //     ref(component)
          //   }
          // }
          this.instances[name] = component;
        },
        cleanUpUselessFields: function cleanUpUselessFields() {
          var _this5 = this;

          var fieldList = this.fieldsStore.getAllFieldsName();
          var removedList = fieldList.filter(function (field) {
            var fieldMeta = _this5.fieldsStore.getFieldMeta(field);
            return !_this5.renderFields[field] && !_this5.domFields[field] && !fieldMeta.preserve;
          });
          if (removedList.length) {
            removedList.forEach(this.clearField);
          }
          this.renderFields = {};
        },
        clearField: function clearField(name) {
          this.fieldsStore.clearField(name);
          delete this.instances[name];
          delete this.cachedBind[name];
        },
        resetFields: function resetFields(ns) {
          var _this6 = this;

          var newFields = this.fieldsStore.resetFields(ns);
          if (Object.keys(newFields).length > 0) {
            this.setFields(newFields);
          }
          if (ns) {
            var names = Array.isArray(ns) ? ns : [ns];
            names.forEach(function (name) {
              return delete _this6.clearedFieldMetaCache[name];
            });
          } else {
            this.clearedFieldMetaCache = {};
          }
        },
        recoverClearedField: function recoverClearedField(name) {
          if (this.clearedFieldMetaCache[name]) {
            this.fieldsStore.setFields(defineProperty_default()({}, name, this.clearedFieldMetaCache[name].field));
            this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
            delete this.clearedFieldMetaCache[name];
          }
        },
        validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
          var _this7 = this;

          var fieldNames = _ref.fieldNames,
              action = _ref.action,
              _ref$options = _ref.options,
              options = _ref$options === undefined ? {} : _ref$options;

          var allRules = {};
          var allValues = {};
          var allFields = {};
          var alreadyErrors = {};
          fields.forEach(function (field) {
            var name = field.name;
            if (options.force !== true && field.dirty === false) {
              if (field.errors) {
                set_default()(alreadyErrors, name, { errors: field.errors });
              }
              return;
            }
            var fieldMeta = _this7.fieldsStore.getFieldMeta(name);
            var newField = extends_default()({}, field);
            newField.errors = undefined;
            newField.validating = true;
            newField.dirty = true;
            allRules[name] = _this7.getRules(fieldMeta, action);
            allValues[name] = newField.value;
            allFields[name] = newField;
          });
          this.setFields(allFields);
          // in case normalize
          Object.keys(allValues).forEach(function (f) {
            allValues[f] = _this7.fieldsStore.getFieldValue(f);
          });
          if (callback && isEmptyObject(allFields)) {
            callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
            return;
          }
          var validator = new dist_web["a" /* default */](allRules);
          if (validateMessages) {
            validator.messages(validateMessages);
          }
          validator.validate(allValues, options, function (errors) {
            var errorsGroup = extends_default()({}, alreadyErrors);
            if (errors && errors.length) {
              errors.forEach(function (e) {
                var errorFieldName = e.field;
                var fieldName = errorFieldName;

                // Handle using array validation rule.
                // ref: https://github.com/ant-design/ant-design/issues/14275
                Object.keys(allRules).some(function (ruleFieldName) {
                  var rules = allRules[ruleFieldName] || [];

                  // Exist if match rule
                  if (ruleFieldName === errorFieldName) {
                    fieldName = ruleFieldName;
                    return true;
                  }

                  // Skip if not match array type
                  if (rules.every(function (_ref2) {
                    var type = _ref2.type;
                    return type !== 'array';
                  }) && errorFieldName.indexOf(ruleFieldName) !== 0) {
                    return false;
                  }

                  // Exist if match the field name
                  var restPath = errorFieldName.slice(ruleFieldName.length + 1);
                  if (/^\d+$/.test(restPath)) {
                    fieldName = ruleFieldName;
                    return true;
                  }

                  return false;
                });

                var field = get_default()(errorsGroup, fieldName);
                if ((typeof field === 'undefined' ? 'undefined' : typeof_default()(field)) !== 'object' || Array.isArray(field)) {
                  set_default()(errorsGroup, fieldName, { errors: [] });
                }
                var fieldErrors = get_default()(errorsGroup, fieldName.concat('.errors'));
                fieldErrors.push(e);
              });
            }
            var expired = [];
            var nowAllFields = {};
            Object.keys(allRules).forEach(function (name) {
              var fieldErrors = get_default()(errorsGroup, name);
              var nowField = _this7.fieldsStore.getField(name);
              // avoid concurrency problems
              if (!eq_default()(nowField.value, allValues[name])) {
                expired.push({
                  name: name
                });
              } else {
                nowField.errors = fieldErrors && fieldErrors.errors;
                nowField.value = allValues[name];
                nowField.validating = false;
                nowField.dirty = false;
                nowAllFields[name] = nowField;
              }
            });
            _this7.setFields(nowAllFields);
            if (callback) {
              if (expired.length) {
                expired.forEach(function (_ref3) {
                  var name = _ref3.name;

                  var fieldErrors = [{
                    message: name + ' need to revalidate',
                    field: name
                  }];
                  set_default()(errorsGroup, name, {
                    expired: true,
                    errors: fieldErrors
                  });
                });
              }

              callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this7.fieldsStore.getFieldsValue(fieldNames));
            }
          });
        },
        validateFields: function validateFields(ns, opt, cb) {
          var _this8 = this;

          var pending = new Promise(function (resolve, reject) {
            var _getParams = getParams(ns, opt, cb),
                names = _getParams.names,
                options = _getParams.options;

            var _getParams2 = getParams(ns, opt, cb),
                callback = _getParams2.callback;

            if (!callback || typeof callback === 'function') {
              var oldCb = callback;
              callback = function callback(errors, values) {
                if (oldCb) {
                  oldCb(errors, values);
                } else if (errors) {
                  reject({ errors: errors, values: values });
                } else {
                  resolve(values);
                }
              };
            }
            var fieldNames = names ? _this8.fieldsStore.getValidFieldsFullName(names) : _this8.fieldsStore.getValidFieldsName();
            var fields = fieldNames.filter(function (name) {
              var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
              return hasRules(fieldMeta.validate);
            }).map(function (name) {
              var field = _this8.fieldsStore.getField(name);
              field.value = _this8.fieldsStore.getFieldValue(name);
              return field;
            });
            if (!fields.length) {
              callback(null, _this8.fieldsStore.getFieldsValue(fieldNames));
              return;
            }
            if (!('firstFields' in options)) {
              options.firstFields = fieldNames.filter(function (name) {
                var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
                return !!fieldMeta.validateFirst;
              });
            }
            _this8.validateFieldsInternal(fields, {
              fieldNames: fieldNames,
              options: options
            }, callback);
          });
          pending['catch'](function (e) {
            if (console.error && "production" !== 'production') {
              console.error(e);
            }
            return e;
          });
          return pending;
        },
        isSubmitting: function isSubmitting() {
          if (false) {}
          return this.submitting;
        },
        submit: function submit(callback) {
          var _this9 = this;

          if (false) {}
          var fn = function fn() {
            _this9.setState({
              submitting: false
            });
          };
          this.setState({
            submitting: true
          });
          callback(fn);
        }
      },

      render: function render() {
        var h = arguments[0];
        var $listeners = this.$listeners,
            $slots = this.$slots;

        var formProps = defineProperty_default()({}, formPropName, this.getForm());

        var _getOptionProps = Object(props_util["j" /* getOptionProps */])(this),
            wrappedComponentRef = _getOptionProps.wrappedComponentRef,
            restProps = objectWithoutProperties_default()(_getOptionProps, ['wrappedComponentRef']);

        var wrappedComponentProps = {
          props: mapProps.call(this, extends_default()({}, formProps, restProps)),
          on: $listeners,
          ref: 'WrappedComponent',
          directives: [{
            name: 'ant-ref',
            value: wrappedComponentRef
          }]
        };

        return WrappedComponent ? h(
          WrappedComponent,
          wrappedComponentProps,
          [$slots['default']]
        ) : null;
      }
    };
    if (!WrappedComponent) return Form;
    if (Array.isArray(WrappedComponent.props)) {
      var newProps = {};
      WrappedComponent.props.forEach(function (prop) {
        newProps[prop] = vue_types["a" /* default */].any;
      });
      newProps[formPropName] = Object;
      WrappedComponent.props = newProps;
    } else {
      WrappedComponent.props = WrappedComponent.props || {};
      if (!(formPropName in WrappedComponent.props)) {
        WrappedComponent.props[formPropName] = Object;
      }
    }
    return argumentContainer(Form, WrappedComponent);
  };
}

/* harmony default export */ var src_createBaseForm = (createBaseForm);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-form/src/createForm.js


var mixin = {
  methods: {
    getForm: function getForm() {
      return {
        getFieldsValue: this.fieldsStore.getFieldsValue,
        getFieldValue: this.fieldsStore.getFieldValue,
        getFieldInstance: this.getFieldInstance,
        setFieldsValue: this.setFieldsValue,
        setFields: this.setFields,
        setFieldsInitialValue: this.fieldsStore.setFieldsInitialValue,
        getFieldDecorator: this.getFieldDecorator,
        getFieldProps: this.getFieldProps,
        getFieldsError: this.fieldsStore.getFieldsError,
        getFieldError: this.fieldsStore.getFieldError,
        isFieldValidating: this.fieldsStore.isFieldValidating,
        isFieldsValidating: this.fieldsStore.isFieldsValidating,
        isFieldsTouched: this.fieldsStore.isFieldsTouched,
        isFieldTouched: this.fieldsStore.isFieldTouched,
        isSubmitting: this.isSubmitting,
        submit: this.submit,
        validateFields: this.validateFields,
        resetFields: this.resetFields
      };
    }
  }
};

function createForm(options) {
  return src_createBaseForm(options, [mixin]);
}

/* harmony default export */ var src_createForm = (createForm);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-form/src/createDOMForm.js







function computedStyle(el, prop) {
  var getComputedStyle = window.getComputedStyle;
  var style =
  // If we have getComputedStyle
  getComputedStyle ? // Query it
  // TODO: From CSS-Query notes, we might need (node, null) for FF
  getComputedStyle(el) : // Otherwise, we are in IE and use currentStyle
  el.currentStyle;
  if (style) {
    return style[
    // Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase();
    })];
  }
  return undefined;
}

function getScrollableContainer(n) {
  var node = n;
  var nodeName = void 0;
  /* eslint no-cond-assign:0 */
  while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
    var overflowY = computedStyle(node, 'overflowY');
    // https://stackoverflow.com/a/36900407/3040605
    if (node !== n && (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode;
  }
  return nodeName === 'body' ? node.ownerDocument : node;
}

var createDOMForm_mixin = {
  methods: {
    getForm: function getForm() {
      return extends_default()({}, mixin.methods.getForm.call(this), {
        validateFieldsAndScroll: this.validateFieldsAndScroll
      });
    },
    validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
      var _this = this;

      var _getParams = getParams(ns, opt, cb),
          names = _getParams.names,
          callback = _getParams.callback,
          options = _getParams.options;

      var newCb = function newCb(error, values) {
        if (error) {
          var validNames = _this.fieldsStore.getValidFieldsName();
          var firstNode = void 0;
          var firstTop = void 0;
          validNames.forEach(function (name) {
            if (has_default()(error, name)) {
              var instance = _this.getFieldInstance(name);
              if (instance) {
                var node = instance.$el || instance.elm;
                var top = node.getBoundingClientRect().top;
                if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                  firstTop = top;
                  firstNode = node;
                }
              }
            }
          });

          if (firstNode) {
            var c = options.container || getScrollableContainer(firstNode);
            lib_default()(firstNode, c, extends_default()({
              onlyScrollIfNeeded: true
            }, options.scroll));
          }
        }

        if (typeof callback === 'function') {
          callback(error, values);
        }
      };

      return this.validateFields(names, options, newCb);
    }
  }
};

function createDOMForm(option) {
  return src_createBaseForm(extends_default()({}, option), [createDOMForm_mixin]);
}

/* harmony default export */ var src_createDOMForm = __webpack_exports__["a"] = (createDOMForm);

/***/ }),

/***/ "da30":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/store/create.js
var create = __webpack_require__("6f54");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/store/Provider.js + 1 modules
var Provider = __webpack_require__("32e8");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/SubPopupMenu.js + 1 modules
var SubPopupMenu = __webpack_require__("1462");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-menu/commonPropsType.js
var commonPropsType = __webpack_require__("22a4");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/Menu.js








var Menu = {
  name: 'Menu',
  props: extends_default()({}, commonPropsType["a" /* default */], {
    selectable: vue_types["a" /* default */].bool.def(true)
  }),
  mixins: [BaseMixin["a" /* default */]],

  data: function data() {
    var props = Object(props_util["j" /* getOptionProps */])(this);
    var selectedKeys = props.defaultSelectedKeys;
    var openKeys = props.defaultOpenKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || [];
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || [];
    }

    this.store = Object(create["a" /* default */])({
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      activeKey: {
        '0-menu-': Object(SubPopupMenu["b" /* getActiveKey */])(extends_default()({}, props, { children: this.$slots['default'] || [] }), props.activeKey)
      }
    });

    // this.isRootMenu = true // 声明在props上
    return {};
  },
  mounted: function mounted() {
    this.updateMiniStore();
  },
  updated: function updated() {
    this.updateMiniStore();
  },

  methods: {
    onSelect: function onSelect(selectInfo) {
      var props = this.$props;
      if (props.selectable) {
        // root menu
        var selectedKeys = this.store.getState().selectedKeys;
        var selectedKey = selectInfo.key;
        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }
        if (!Object(props_util["b" /* default */])(this, 'selectedKeys')) {
          this.store.setState({
            selectedKeys: selectedKeys
          });
        }
        this.__emit('select', extends_default()({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    onClick: function onClick(e) {
      this.__emit('click', e);
    },

    // onKeyDown needs to be exposed as a instance method
    // e.g., in rc-select, we need to navigate menu item while
    // current active item is rc-select input box rather than the menu itself
    onKeyDown: function onKeyDown(e, callback) {
      this.$refs.innerMenu.getWrappedInstance().onKeyDown(e, callback);
    },
    onOpenChange: function onOpenChange(event) {
      var openKeys = this.store.getState().openKeys.concat();
      var changed = false;
      var processSingle = function processSingle(e) {
        var oneChanged = false;
        if (e.open) {
          oneChanged = openKeys.indexOf(e.key) === -1;
          if (oneChanged) {
            openKeys.push(e.key);
          }
        } else {
          var index = openKeys.indexOf(e.key);
          oneChanged = index !== -1;
          if (oneChanged) {
            openKeys.splice(index, 1);
          }
        }
        changed = changed || oneChanged;
      };
      if (Array.isArray(event)) {
        // batch change call
        event.forEach(processSingle);
      } else {
        processSingle(event);
      }
      if (changed) {
        if (!Object(props_util["b" /* default */])(this, 'openKeys')) {
          this.store.setState({ openKeys: openKeys });
        }
        this.__emit('openChange', openKeys);
      }
    },
    onDeselect: function onDeselect(selectInfo) {
      var props = this.$props;
      if (props.selectable) {
        var selectedKeys = this.store.getState().selectedKeys.concat();
        var selectedKey = selectInfo.key;
        var index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        if (!Object(props_util["b" /* default */])(this, 'selectedKeys')) {
          this.store.setState({
            selectedKeys: selectedKeys
          });
        }
        this.__emit('deselect', extends_default()({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    getOpenTransitionName: function getOpenTransitionName() {
      var props = this.$props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + '-open-' + animationName;
      }
      return transitionName;
    },
    updateMiniStore: function updateMiniStore() {
      var props = Object(props_util["j" /* getOptionProps */])(this);
      if ('selectedKeys' in props) {
        this.store.setState({
          selectedKeys: props.selectedKeys || []
        });
      }
      if ('openKeys' in props) {
        this.store.setState({
          openKeys: props.openKeys || []
        });
      }
    }
  },

  render: function render() {
    var h = arguments[0];

    var props = Object(props_util["j" /* getOptionProps */])(this);
    var subPopupMenuProps = {
      props: extends_default()({}, props, {
        itemIcon: Object(props_util["g" /* getComponentFromProp */])(this, 'itemIcon', props),
        expandIcon: Object(props_util["g" /* getComponentFromProp */])(this, 'expandIcon', props),
        overflowedIndicator: Object(props_util["g" /* getComponentFromProp */])(this, 'overflowedIndicator', props) || h('span', ['\xB7\xB7\xB7']),
        openTransitionName: this.getOpenTransitionName(),
        parentMenu: this,
        children: Object(props_util["c" /* filterEmpty */])(this.$slots['default'] || [])
      }),
      'class': props.prefixCls + '-root',
      on: extends_default()({}, this.$listeners, {
        click: this.onClick,
        openChange: this.onOpenChange,
        deselect: this.onDeselect,
        select: this.onSelect
      }),
      ref: 'innerMenu'
    };
    return h(
      Provider["a" /* default */],
      {
        attrs: { store: this.store }
      },
      [h(SubPopupMenu["a" /* default */], subPopupMenuProps)]
    );
  }
};
/* harmony default export */ var vc_menu_Menu = (Menu);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-menu/index.js
// based on rc-menu 7.4.21








/* harmony default export */ var vc_menu = __webpack_exports__["a"] = (vc_menu_Menu);

/***/ }),

/***/ "db84":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("8e8e");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/contains.js
var contains = __webpack_require__("705c");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dialog/LazyRenderBox.js


var ILazyRenderBoxPropTypes = {
  visible: vue_types["a" /* default */].bool,
  hiddenClassName: vue_types["a" /* default */].string,
  forceRender: vue_types["a" /* default */].bool
};

/* harmony default export */ var LazyRenderBox = ({
  props: ILazyRenderBoxPropTypes,
  render: function render() {
    var h = arguments[0];

    return h(
      'div',
      { on: this.$listeners },
      [this.$slots['default']]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/switchScrollingEffect.js
var _util_switchScrollingEffect = __webpack_require__("e31b");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dialog/IDialogPropTypes.js


function IDialogPropTypes() {
  return {
    keyboard: vue_types["a" /* default */].bool,
    mask: vue_types["a" /* default */].bool,
    afterClose: vue_types["a" /* default */].func,
    // onClose: PropTypes. (e: SyntheticEvent<HTMLDivElement>) =>any,
    closable: vue_types["a" /* default */].bool,
    maskClosable: vue_types["a" /* default */].bool,
    visible: vue_types["a" /* default */].bool,
    destroyOnClose: vue_types["a" /* default */].bool,
    mousePosition: vue_types["a" /* default */].shape({
      x: vue_types["a" /* default */].number,
      y: vue_types["a" /* default */].number
    }).loose,
    title: vue_types["a" /* default */].any,
    footer: vue_types["a" /* default */].any,
    transitionName: vue_types["a" /* default */].string,
    maskTransitionName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].any,
    maskAnimation: vue_types["a" /* default */].any,
    wrapStyle: vue_types["a" /* default */].object,
    bodyStyle: vue_types["a" /* default */].object,
    maskStyle: vue_types["a" /* default */].object,
    prefixCls: vue_types["a" /* default */].string,
    wrapClassName: vue_types["a" /* default */].string,
    width: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    height: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    zIndex: vue_types["a" /* default */].number,
    bodyProps: vue_types["a" /* default */].any,
    maskProps: vue_types["a" /* default */].any,
    wrapProps: vue_types["a" /* default */].any,
    getContainer: vue_types["a" /* default */].any,
    dialogStyle: vue_types["a" /* default */].object.def({}),
    dialogClass: vue_types["a" /* default */].object.def({}),
    closeIcon: vue_types["a" /* default */].any,
    forceRender: vue_types["a" /* default */].bool,
    getOpenCount: vue_types["a" /* default */].func,
    // https://github.com/ant-design/ant-design/issues/19771
    // https://github.com/react-component/dialog/issues/95
    focusTriggerAfterClose: vue_types["a" /* default */].bool
  };
}

/* harmony default export */ var vc_dialog_IDialogPropTypes = (IDialogPropTypes);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dialog/Dialog.js











var Dialog_IDialogPropTypes = vc_dialog_IDialogPropTypes();

var uuid = 0;

/* eslint react/no-is-mounted:0 */
function noop() {}
function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function setTransformOrigin(node, value) {
  var style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
    style[prefix + 'TransformOrigin'] = value;
  });
  style['transformOrigin'] = value;
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  var pos = {
    left: rect.left,
    top: rect.top
  };
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}

var cacheOverflow = {};

/* harmony default export */ var Dialog = ({
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])(Dialog_IDialogPropTypes, {
    mask: true,
    visible: false,
    keyboard: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    prefixCls: 'rc-dialog',
    getOpenCount: function getOpenCount() {
      return null;
    },
    focusTriggerAfterClose: true
  }),
  data: function data() {
    return {
      destroyPopup: false
    };
  },
  provide: function provide() {
    return {
      dialogContext: this
    };
  },


  watch: {
    visible: function visible(val) {
      var _this = this;

      if (val) {
        this.destroyPopup = false;
      }
      this.$nextTick(function () {
        _this.updatedCallback(!val);
      });
    }
  },

  beforeMount: function beforeMount() {
    this.inTransition = false;
    this.titleId = 'rcDialogTitle' + uuid++;
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.updatedCallback(false);
      // if forceRender is true, set element style display to be none;
      if ((_this2.forceRender || _this2.getContainer === false && !_this2.visible) && _this2.$refs.wrap) {
        _this2.$refs.wrap.style.display = 'none';
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var visible = this.visible,
        getOpenCount = this.getOpenCount;

    if ((visible || this.inTransition) && !getOpenCount()) {
      this.switchScrollingEffect();
    }
    clearTimeout(this.timeoutId);
  },

  methods: {
    // 对外暴露的 api 不要更改名称或删除
    getDialogWrap: function getDialogWrap() {
      return this.$refs.wrap;
    },
    updatedCallback: function updatedCallback(visible) {
      var mousePosition = this.mousePosition;
      var mask = this.mask,
          focusTriggerAfterClose = this.focusTriggerAfterClose;

      if (this.visible) {
        // first show
        if (!visible) {
          this.openTime = Date.now();
          // this.lastOutSideFocusNode = document.activeElement
          this.switchScrollingEffect();
          // this.$refs.wrap.focus()
          this.tryFocus();
          var dialogNode = this.$refs.dialog.$el;
          if (mousePosition) {
            var elOffset = offset(dialogNode);
            setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
          } else {
            setTransformOrigin(dialogNode, '');
          }
        }
      } else if (visible) {
        this.inTransition = true;
        if (mask && this.lastOutSideFocusNode && focusTriggerAfterClose) {
          try {
            this.lastOutSideFocusNode.focus();
          } catch (e) {
            this.lastOutSideFocusNode = null;
          }
          this.lastOutSideFocusNode = null;
        }
      }
    },
    tryFocus: function tryFocus() {
      if (!Object(contains["a" /* default */])(this.$refs.wrap, document.activeElement)) {
        this.lastOutSideFocusNode = document.activeElement;
        this.$refs.sentinelStart.focus();
      }
    },
    onAnimateLeave: function onAnimateLeave() {
      var afterClose = this.afterClose,
          destroyOnClose = this.destroyOnClose;
      // need demo?
      // https://github.com/react-component/dialog/pull/28

      if (this.$refs.wrap) {
        this.$refs.wrap.style.display = 'none';
      }
      if (destroyOnClose) {
        this.destroyPopup = true;
      }
      this.inTransition = false;
      this.switchScrollingEffect();
      if (afterClose) {
        afterClose();
      }
    },
    onDialogMouseDown: function onDialogMouseDown() {
      this.dialogMouseDown = true;
    },
    onMaskMouseUp: function onMaskMouseUp() {
      var _this3 = this;

      if (this.dialogMouseDown) {
        this.timeoutId = setTimeout(function () {
          _this3.dialogMouseDown = false;
        }, 0);
      }
    },
    onMaskClick: function onMaskClick(e) {
      // android trigger click on open (fastclick??)
      if (Date.now() - this.openTime < 300) {
        return;
      }
      if (e.target === e.currentTarget && !this.dialogMouseDown) {
        this.close(e);
      }
    },
    onKeydown: function onKeydown(e) {
      var props = this.$props;
      if (props.keyboard && e.keyCode === KeyCode["a" /* default */].ESC) {
        e.stopPropagation();
        this.close(e);
        return;
      }
      // keep focus inside dialog
      if (props.visible) {
        if (e.keyCode === KeyCode["a" /* default */].TAB) {
          var activeElement = document.activeElement;
          var sentinelStart = this.$refs.sentinelStart;
          if (e.shiftKey) {
            if (activeElement === sentinelStart) {
              this.$refs.sentinelEnd.focus();
            }
          } else if (activeElement === this.$refs.sentinelEnd) {
            sentinelStart.focus();
          }
        }
      }
    },
    getDialogElement: function getDialogElement() {
      var h = this.$createElement;
      var closable = this.closable,
          prefixCls = this.prefixCls,
          width = this.width,
          height = this.height,
          title = this.title,
          tempFooter = this.footer,
          bodyStyle = this.bodyStyle,
          visible = this.visible,
          bodyProps = this.bodyProps,
          forceRender = this.forceRender;

      var dest = {};
      if (width !== undefined) {
        dest.width = typeof width === 'number' ? width + 'px' : width;
      }
      if (height !== undefined) {
        dest.height = typeof height === 'number' ? height + 'px' : height;
      }

      var footer = void 0;
      if (tempFooter) {
        footer = h(
          'div',
          { key: 'footer', 'class': prefixCls + '-footer', ref: 'footer' },
          [tempFooter]
        );
      }

      var header = void 0;
      if (title) {
        header = h(
          'div',
          { key: 'header', 'class': prefixCls + '-header', ref: 'header' },
          [h(
            'div',
            { 'class': prefixCls + '-title', attrs: { id: this.titleId }
            },
            [title]
          )]
        );
      }

      var closer = void 0;
      if (closable) {
        var closeIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'closeIcon');
        closer = h(
          'button',
          {
            attrs: {
              type: 'button',

              'aria-label': 'Close'
            },
            key: 'close',
            on: {
              'click': this.close || noop
            },
            'class': prefixCls + '-close'
          },
          [closeIcon || h('span', { 'class': prefixCls + '-close-x' })]
        );
      }

      var style = extends_default()({}, this.dialogStyle, dest);
      var sentinelStyle = { width: 0, height: 0, overflow: 'hidden' };
      var cls = extends_default()(defineProperty_default()({}, prefixCls, true), this.dialogClass);
      var transitionName = this.getTransitionName();
      var dialogElement = h(
        LazyRenderBox,
        {
          directives: [{
            name: 'show',
            value: visible
          }],

          key: 'dialog-element',
          attrs: { role: 'document',

            forceRender: forceRender
          },
          ref: 'dialog',
          style: style,
          'class': cls, on: {
            'mousedown': this.onDialogMouseDown
          }
        },
        [h('div', {
          attrs: { tabIndex: 0, 'aria-hidden': 'true' },
          ref: 'sentinelStart', style: sentinelStyle }), h(
          'div',
          { 'class': prefixCls + '-content' },
          [closer, header, h(
            'div',
            babel_helper_vue_jsx_merge_props_default()([{ key: 'body', 'class': prefixCls + '-body', style: bodyStyle, ref: 'body' }, bodyProps]),
            [this.$slots['default']]
          ), footer]
        ), h('div', {
          attrs: { tabIndex: 0, 'aria-hidden': 'true' },
          ref: 'sentinelEnd', style: sentinelStyle })]
      );
      var dialogTransitionProps = Object(getTransitionProps["a" /* default */])(transitionName, {
        afterLeave: this.onAnimateLeave
      });
      return h(
        'transition',
        babel_helper_vue_jsx_merge_props_default()([{ key: 'dialog' }, dialogTransitionProps]),
        [visible || !this.destroyPopup ? dialogElement : null]
      );
    },
    getZIndexStyle: function getZIndexStyle() {
      var style = {};
      var props = this.$props;
      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }
      return style;
    },
    getWrapStyle: function getWrapStyle() {
      return extends_default()({}, this.getZIndexStyle(), this.wrapStyle);
    },
    getMaskStyle: function getMaskStyle() {
      return extends_default()({}, this.getZIndexStyle(), this.maskStyle);
    },
    getMaskElement: function getMaskElement() {
      var h = this.$createElement;

      var props = this.$props;
      var maskElement = void 0;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = h(LazyRenderBox, babel_helper_vue_jsx_merge_props_default()([{
          directives: [{
            name: 'show',
            value: props.visible
          }],

          style: this.getMaskStyle(),
          key: 'mask',
          'class': props.prefixCls + '-mask'
        }, props.maskProps]));
        if (maskTransition) {
          var maskTransitionProps = Object(getTransitionProps["a" /* default */])(maskTransition);
          maskElement = h(
            'transition',
            babel_helper_vue_jsx_merge_props_default()([{ key: 'mask' }, maskTransitionProps]),
            [maskElement]
          );
        }
      }
      return maskElement;
    },
    getMaskTransitionName: function getMaskTransitionName() {
      var props = this.$props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getTransitionName: function getTransitionName() {
      var props = this.$props;
      var transitionName = props.transitionName;
      var animation = props.animation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },

    // setScrollbar() {
    //   if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
    //     document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    //   }
    // },
    switchScrollingEffect: function switchScrollingEffect() {
      var getOpenCount = this.getOpenCount;

      var openCount = getOpenCount();
      if (openCount === 1) {
        if (cacheOverflow.hasOwnProperty('overflowX')) {
          return;
        }
        cacheOverflow = {
          overflowX: document.body.style.overflowX,
          overflowY: document.body.style.overflowY,
          overflow: document.body.style.overflow
        };
        Object(_util_switchScrollingEffect["a" /* default */])();
        // Must be set after switchScrollingEffect
        document.body.style.overflow = 'hidden';
      } else if (!openCount) {
        // IE browser doesn't merge overflow style, need to set it separately
        // https://github.com/ant-design/ant-design/issues/19393
        if (cacheOverflow.overflow !== undefined) {
          document.body.style.overflow = cacheOverflow.overflow;
        }
        if (cacheOverflow.overflowX !== undefined) {
          document.body.style.overflowX = cacheOverflow.overflowX;
        }
        if (cacheOverflow.overflowY !== undefined) {
          document.body.style.overflowY = cacheOverflow.overflowY;
        }
        cacheOverflow = {};
        Object(_util_switchScrollingEffect["a" /* default */])(true);
      }
    },

    // removeScrollingEffect() {
    //   const { getOpenCount } = this;
    //   const openCount = getOpenCount();
    //   if (openCount !== 0) {
    //     return;
    //   }
    //   document.body.style.overflow = '';
    //   switchScrollingEffect(true);
    //   // this.resetAdjustments();
    // },
    close: function close(e) {
      this.__emit('close', e);
    }
  },
  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        maskClosable = this.maskClosable,
        visible = this.visible,
        wrapClassName = this.wrapClassName,
        title = this.title,
        wrapProps = this.wrapProps;

    var style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (visible) {
      style.display = null;
    }
    return h(
      'div',
      { 'class': prefixCls + '-root' },
      [this.getMaskElement(), h(
        'div',
        babel_helper_vue_jsx_merge_props_default()([{
          attrs: {
            tabIndex: -1,

            role: 'dialog',
            'aria-labelledby': title ? this.titleId : null
          },
          on: {
            'keydown': this.onKeydown,
            'click': maskClosable ? this.onMaskClick : noop,
            'mouseup': maskClosable ? this.onMaskMouseUp : noop
          },

          'class': prefixCls + '-wrap ' + (wrapClassName || ''),
          ref: 'wrap',
          style: style
        }, wrapProps]),
        [this.getDialogElement()]
      )]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/ContainerRender.js
var ContainerRender = __webpack_require__("98d3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dialog/DialogWrap.js






var DialogWrap_IDialogPropTypes = vc_dialog_IDialogPropTypes();
var DialogWrap_openCount = 0;
var DialogWrap = {
  props: extends_default()({}, DialogWrap_IDialogPropTypes, {
    visible: DialogWrap_IDialogPropTypes.visible.def(false)
  }),
  data: function data() {
    DialogWrap_openCount = this.visible ? DialogWrap_openCount + 1 : DialogWrap_openCount;
    this.renderComponent = function () {};
    this.removeContainer = function () {};
    return {};
  },

  watch: {
    visible: function visible(val, preVal) {
      DialogWrap_openCount = val && !preVal ? DialogWrap_openCount + 1 : DialogWrap_openCount - 1;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.visible) {
      DialogWrap_openCount = DialogWrap_openCount ? DialogWrap_openCount - 1 : DialogWrap_openCount;
      this.renderComponent({
        afterClose: this.removeContainer,
        visible: false,
        on: {
          close: function close() {}
        }
      });
    } else {
      this.removeContainer();
    }
  },

  methods: {
    getComponent: function getComponent() {
      var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var h = this.$createElement;
      var $attrs = this.$attrs,
          $listeners = this.$listeners,
          $props = this.$props,
          $slots = this.$slots,
          getContainer = this.getContainer;

      var on = extra.on,
          otherProps = objectWithoutProperties_default()(extra, ['on']);

      var dialogProps = {
        props: extends_default()({}, $props, {
          dialogClass: Object(props_util["f" /* getClass */])(this),
          dialogStyle: Object(props_util["o" /* getStyle */])(this)
        }, otherProps, {
          getOpenCount: getContainer === false ? function () {
            return 2;
          } : function () {
            return DialogWrap_openCount;
          }
        }),
        attrs: $attrs,
        ref: '_component',
        key: 'dialog',
        on: extends_default()({}, $listeners, on)
      };
      return h(
        Dialog,
        dialogProps,
        [$slots['default']]
      );
    },
    getContainer2: function getContainer2() {
      var container = document.createElement('div');
      if (this.getContainer) {
        this.getContainer().appendChild(container);
      } else {
        document.body.appendChild(container);
      }
      return container;
    }
  },

  render: function render() {
    var _this = this;

    var h = arguments[0];
    var visible = this.visible;

    return h(ContainerRender["a" /* default */], {
      attrs: {
        parent: this,
        visible: visible,
        autoDestroy: false,
        getComponent: this.getComponent,
        getContainer: this.getContainer2,
        children: function children(_ref) {
          var renderComponent = _ref.renderComponent,
              removeContainer = _ref.removeContainer;

          _this.renderComponent = renderComponent;
          _this.removeContainer = removeContainer;
          return null;
        }
      }
    });
  }
};

/* harmony default export */ var vc_dialog_DialogWrap = (DialogWrap);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-dialog/index.js
// based on vc-dialog 7.5.14

/* harmony default export */ var vc_dialog = __webpack_exports__["a"] = (vc_dialog_DialogWrap);

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~f99c446b.3647b5cd.js.map