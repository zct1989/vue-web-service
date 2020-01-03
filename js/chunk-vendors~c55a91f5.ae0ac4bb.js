(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~c55a91f5"],{

/***/ "1b8f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return placements; });
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset: targetOffset
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset: targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset: targetOffset
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset: targetOffset
  }
};

/* unused harmony default export */ var _unused_webpack_default_export = (placements);

/***/ }),

/***/ "1d31":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/warning/browser.js
var browser = __webpack_require__("e834");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/proxyComponent.js
var proxyComponent = __webpack_require__("58c1");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tree/src/util.js
var util = __webpack_require__("c9a4");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree/src/Tree.js













/**
 * Thought we still use `cloneElement` to pass `key`,
 * other props can pass with context for future refactor.
 */

function getWatch() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var watch = {};
  keys.forEach(function (k) {
    watch[k] = function () {
      this.needSyncKeys[k] = true;
    };
  });
  return watch;
}

var Tree = {
  name: 'Tree',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])({
    prefixCls: vue_types["a" /* default */].string,
    tabIndex: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    children: vue_types["a" /* default */].any,
    treeData: vue_types["a" /* default */].array, // Generate treeNode by children
    showLine: vue_types["a" /* default */].bool,
    showIcon: vue_types["a" /* default */].bool,
    icon: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].func]),
    focusable: vue_types["a" /* default */].bool,
    selectable: vue_types["a" /* default */].bool,
    disabled: vue_types["a" /* default */].bool,
    multiple: vue_types["a" /* default */].bool,
    checkable: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].bool]),
    checkStrictly: vue_types["a" /* default */].bool,
    draggable: vue_types["a" /* default */].bool,
    defaultExpandParent: vue_types["a" /* default */].bool,
    autoExpandParent: vue_types["a" /* default */].bool,
    defaultExpandAll: vue_types["a" /* default */].bool,
    defaultExpandedKeys: vue_types["a" /* default */].array,
    expandedKeys: vue_types["a" /* default */].array,
    defaultCheckedKeys: vue_types["a" /* default */].array,
    checkedKeys: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].array, vue_types["a" /* default */].object]),
    defaultSelectedKeys: vue_types["a" /* default */].array,
    selectedKeys: vue_types["a" /* default */].array,
    // onClick: PropTypes.func,
    // onDoubleClick: PropTypes.func,
    // onExpand: PropTypes.func,
    // onCheck: PropTypes.func,
    // onSelect: PropTypes.func,
    loadData: vue_types["a" /* default */].func,
    loadedKeys: vue_types["a" /* default */].array,
    // onMouseEnter: PropTypes.func,
    // onMouseLeave: PropTypes.func,
    // onRightClick: PropTypes.func,
    // onDragStart: PropTypes.func,
    // onDragEnter: PropTypes.func,
    // onDragOver: PropTypes.func,
    // onDragLeave: PropTypes.func,
    // onDragEnd: PropTypes.func,
    // onDrop: PropTypes.func,
    filterTreeNode: vue_types["a" /* default */].func,
    openTransitionName: vue_types["a" /* default */].string,
    openAnimation: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    switcherIcon: vue_types["a" /* default */].any,
    _propsSymbol: vue_types["a" /* default */].any
  }, {
    prefixCls: 'rc-tree',
    showLine: false,
    showIcon: true,
    selectable: true,
    multiple: false,
    checkable: false,
    disabled: false,
    checkStrictly: false,
    draggable: false,
    defaultExpandParent: true,
    autoExpandParent: false,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: []
  }),

  data: function data() {
    browser_default()(this.$props.__propsSymbol__, 'must pass __propsSymbol__');
    browser_default()(this.$props.children, 'please children prop replace slots.default');
    this.needSyncKeys = {};
    var state = {
      _posEntities: new Map(),
      _keyEntities: new Map(),
      _expandedKeys: [],
      _selectedKeys: [],
      _checkedKeys: [],
      _halfCheckedKeys: [],
      _loadedKeys: [],
      _loadingKeys: [],
      _treeNode: [],
      _prevProps: null,
      _dragOverNodeKey: '',
      _dropPosition: null,
      _dragNodesKeys: []
    };
    return extends_default()({}, state, this.getDerivedStateFromProps(Object(props_util["j" /* getOptionProps */])(this), state));
  },
  provide: function provide() {
    return {
      vcTree: this
    };
  },


  watch: extends_default()({}, getWatch(['treeData', 'children', 'expandedKeys', 'autoExpandParent', 'selectedKeys', 'checkedKeys', 'loadedKeys']), {
    __propsSymbol__: function __propsSymbol__() {
      this.setState(this.getDerivedStateFromProps(Object(props_util["j" /* getOptionProps */])(this), this.$data));
      this.needSyncKeys = {};
    }
  }),

  methods: {
    getDerivedStateFromProps: function getDerivedStateFromProps(props, prevState) {
      var _prevProps = prevState._prevProps;

      var newState = {
        _prevProps: extends_default()({}, props)
      };
      var self = this;
      function needSync(name) {
        return !_prevProps && name in props || _prevProps && self.needSyncKeys[name];
      }

      // ================== Tree Node ==================
      var treeNode = null;

      // Check if `treeData` or `children` changed and save into the state.
      if (needSync('treeData')) {
        treeNode = Object(util["g" /* convertDataToTree */])(this.$createElement, props.treeData);
      } else if (needSync('children')) {
        treeNode = props.children;
      }

      // Tree support filter function which will break the tree structure in the vdm.
      // We cache the treeNodes in state so that we can return the treeNode in event trigger.
      if (treeNode) {
        newState._treeNode = treeNode;

        // Calculate the entities data for quick match
        var entitiesMap = Object(util["h" /* convertTreeToEntities */])(treeNode);
        newState._posEntities = entitiesMap.posEntities;
        newState._keyEntities = entitiesMap.keyEntities;
      }

      var keyEntities = newState._keyEntities || prevState._keyEntities;

      // ================ expandedKeys =================
      if (needSync('expandedKeys') || _prevProps && needSync('autoExpandParent')) {
        newState._expandedKeys = props.autoExpandParent || !_prevProps && props.defaultExpandParent ? Object(util["f" /* conductExpandParent */])(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (!_prevProps && props.defaultExpandAll) {
        newState._expandedKeys = [].concat(toConsumableArray_default()(keyEntities.keys()));
      } else if (!_prevProps && props.defaultExpandedKeys) {
        newState._expandedKeys = props.autoExpandParent || props.defaultExpandParent ? Object(util["f" /* conductExpandParent */])(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      }

      // ================ selectedKeys =================
      if (props.selectable) {
        if (needSync('selectedKeys')) {
          newState._selectedKeys = Object(util["d" /* calcSelectedKeys */])(props.selectedKeys, props);
        } else if (!_prevProps && props.defaultSelectedKeys) {
          newState._selectedKeys = Object(util["d" /* calcSelectedKeys */])(props.defaultSelectedKeys, props);
        }
      }

      // ================= checkedKeys =================
      if (props.checkable) {
        var checkedKeyEntity = void 0;

        if (needSync('checkedKeys')) {
          checkedKeyEntity = Object(util["m" /* parseCheckedKeys */])(props.checkedKeys) || {};
        } else if (!_prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = Object(util["m" /* parseCheckedKeys */])(props.defaultCheckedKeys) || {};
        } else if (treeNode) {
          // If treeNode changed, we also need check it
          checkedKeyEntity = Object(util["m" /* parseCheckedKeys */])(props.checkedKeys) || {
            checkedKeys: prevState._checkedKeys,
            halfCheckedKeys: prevState._halfCheckedKeys
          };
        }

        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity,
              _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys,
              checkedKeys = _checkedKeyEntity$che === undefined ? [] : _checkedKeyEntity$che,
              _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys,
              halfCheckedKeys = _checkedKeyEntity$hal === undefined ? [] : _checkedKeyEntity$hal;


          if (!props.checkStrictly) {
            var conductKeys = Object(util["e" /* conductCheck */])(checkedKeys, true, keyEntities);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }

          newState._checkedKeys = checkedKeys;
          newState._halfCheckedKeys = halfCheckedKeys;
        }
      }
      // ================= loadedKeys ==================
      if (needSync('loadedKeys')) {
        newState._loadedKeys = props.loadedKeys;
      }

      return newState;
    },
    onNodeDragStart: function onNodeDragStart(event, node) {
      var _expandedKeys = this.$data._expandedKeys;
      var eventKey = node.eventKey;

      var children = Object(props_util["n" /* getSlots */])(node)['default'];
      this.dragNode = node;

      this.setState({
        _dragNodesKeys: Object(util["i" /* getDragNodesKeys */])(typeof children === 'function' ? children() : children, node),
        _expandedKeys: Object(util["b" /* arrDel */])(_expandedKeys, eventKey)
      });
      this.__emit('dragstart', { event: event, node: node });
    },


    /**
     * [Legacy] Select handler is less small than node,
     * so that this will trigger when drag enter node or select handler.
     * This is a little tricky if customize css without padding.
     * Better for use mouse move event to refresh drag state.
     * But let's just keep it to avoid event trigger logic change.
     */
    onNodeDragEnter: function onNodeDragEnter(event, node) {
      var _this = this;

      var expandedKeys = this.$data._expandedKeys;
      var pos = node.pos,
          eventKey = node.eventKey;


      if (!this.dragNode || !node.$refs.selectHandle) return;

      var dropPosition = Object(util["c" /* calcDropPosition */])(event, node);

      // Skip if drag node is self
      if (this.dragNode.eventKey === eventKey && dropPosition === 0) {
        this.setState({
          _dragOverNodeKey: '',
          _dropPosition: null
        });
        return;
      }

      // Ref: https://github.com/react-component/tree/issues/132
      // Add timeout to let onDragLevel fire before onDragEnter,
      // so that we can clean drag props for onDragLeave node.
      // Macro task for this:
      // https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-script
      setTimeout(function () {
        // Update drag over node
        _this.setState({
          _dragOverNodeKey: eventKey,
          _dropPosition: dropPosition
        });

        // Side effect for delay drag
        if (!_this.delayedDragEnterLogic) {
          _this.delayedDragEnterLogic = {};
        }
        Object.keys(_this.delayedDragEnterLogic).forEach(function (key) {
          clearTimeout(_this.delayedDragEnterLogic[key]);
        });
        _this.delayedDragEnterLogic[pos] = setTimeout(function () {
          var newExpandedKeys = Object(util["a" /* arrAdd */])(expandedKeys, eventKey);
          if (!Object(props_util["q" /* hasProp */])(_this, 'expandedKeys')) {
            _this.setState({
              _expandedKeys: newExpandedKeys
            });
          }
          _this.__emit('dragenter', { event: event, node: node, expandedKeys: newExpandedKeys });
        }, 400);
      }, 0);
    },
    onNodeDragOver: function onNodeDragOver(event, node) {
      var eventKey = node.eventKey;
      var _$data = this.$data,
          _dragOverNodeKey = _$data._dragOverNodeKey,
          _dropPosition = _$data._dropPosition;
      // Update drag position

      if (this.dragNode && eventKey === _dragOverNodeKey && node.$refs.selectHandle) {
        var dropPosition = Object(util["c" /* calcDropPosition */])(event, node);

        if (dropPosition === _dropPosition) return;

        this.setState({
          _dropPosition: dropPosition
        });
      }
      this.__emit('dragover', { event: event, node: node });
    },
    onNodeDragLeave: function onNodeDragLeave(event, node) {
      this.setState({
        _dragOverNodeKey: ''
      });
      this.__emit('dragleave', { event: event, node: node });
    },
    onNodeDragEnd: function onNodeDragEnd(event, node) {
      this.setState({
        _dragOverNodeKey: ''
      });
      this.__emit('dragend', { event: event, node: node });
      this.dragNode = null;
    },
    onNodeDrop: function onNodeDrop(event, node) {
      var _$data2 = this.$data,
          _$data2$_dragNodesKey = _$data2._dragNodesKeys,
          _dragNodesKeys = _$data2$_dragNodesKey === undefined ? [] : _$data2$_dragNodesKey,
          _dropPosition = _$data2._dropPosition;

      var eventKey = node.eventKey,
          pos = node.pos;


      this.setState({
        _dragOverNodeKey: ''
      });

      if (_dragNodesKeys.indexOf(eventKey) !== -1) {
        browser_default()(false, "Can not drop to dragNode(include it's children node)");
        return;
      }

      var posArr = Object(util["n" /* posToArr */])(pos);

      var dropResult = {
        event: event,
        node: node,
        dragNode: this.dragNode,
        dragNodesKeys: _dragNodesKeys.slice(),
        dropPosition: _dropPosition + Number(posArr[posArr.length - 1])
      };

      if (_dropPosition !== 0) {
        dropResult.dropToGap = true;
      }
      this.__emit('drop', dropResult);
      this.dragNode = null;
    },
    onNodeClick: function onNodeClick(e, treeNode) {
      this.__emit('click', e, treeNode);
    },
    onNodeDoubleClick: function onNodeDoubleClick(e, treeNode) {
      this.__emit('dblclick', e, treeNode);
    },
    onNodeSelect: function onNodeSelect(e, treeNode) {
      var selectedKeys = this.$data._selectedKeys;
      var keyEntities = this.$data._keyEntities;
      var multiple = this.$props.multiple;

      var _getOptionProps = Object(props_util["j" /* getOptionProps */])(treeNode),
          selected = _getOptionProps.selected,
          eventKey = _getOptionProps.eventKey;

      var targetSelected = !selected;
      // Update selected keys
      if (!targetSelected) {
        selectedKeys = Object(util["b" /* arrDel */])(selectedKeys, eventKey);
      } else if (!multiple) {
        selectedKeys = [eventKey];
      } else {
        selectedKeys = Object(util["a" /* arrAdd */])(selectedKeys, eventKey);
      }

      // [Legacy] Not found related usage in doc or upper libs
      var selectedNodes = selectedKeys.map(function (key) {
        var entity = keyEntities.get(key);
        if (!entity) return null;

        return entity.node;
      }).filter(function (node) {
        return node;
      });

      this.setUncontrolledState({ _selectedKeys: selectedKeys });

      var eventObj = {
        event: 'select',
        selected: targetSelected,
        node: treeNode,
        selectedNodes: selectedNodes,
        nativeEvent: e
      };
      this.__emit('update:selectedKeys', selectedKeys);
      this.__emit('select', selectedKeys, eventObj);
    },
    onNodeCheck: function onNodeCheck(e, treeNode, checked) {
      var _$data3 = this.$data,
          keyEntities = _$data3._keyEntities,
          oriCheckedKeys = _$data3._checkedKeys,
          oriHalfCheckedKeys = _$data3._halfCheckedKeys;
      var checkStrictly = this.$props.checkStrictly;

      var _getOptionProps2 = Object(props_util["j" /* getOptionProps */])(treeNode),
          eventKey = _getOptionProps2.eventKey;

      // Prepare trigger arguments


      var checkedObj = void 0;
      var eventObj = {
        event: 'check',
        node: treeNode,
        checked: checked,
        nativeEvent: e
      };

      if (checkStrictly) {
        var checkedKeys = checked ? Object(util["a" /* arrAdd */])(oriCheckedKeys, eventKey) : Object(util["b" /* arrDel */])(oriCheckedKeys, eventKey);
        var halfCheckedKeys = Object(util["b" /* arrDel */])(oriHalfCheckedKeys, eventKey);
        checkedObj = { checked: checkedKeys, halfChecked: halfCheckedKeys };

        eventObj.checkedNodes = checkedKeys.map(function (key) {
          return keyEntities.get(key);
        }).filter(function (entity) {
          return entity;
        }).map(function (entity) {
          return entity.node;
        });

        this.setUncontrolledState({ _checkedKeys: checkedKeys });
      } else {
        var _conductCheck = Object(util["e" /* conductCheck */])([eventKey], checked, keyEntities, {
          checkedKeys: oriCheckedKeys,
          halfCheckedKeys: oriHalfCheckedKeys
        }),
            _checkedKeys = _conductCheck.checkedKeys,
            _halfCheckedKeys = _conductCheck.halfCheckedKeys;

        checkedObj = _checkedKeys;

        // [Legacy] This is used for `rc-tree-select`
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;

        _checkedKeys.forEach(function (key) {
          var entity = keyEntities.get(key);
          if (!entity) return;

          var node = entity.node,
              pos = entity.pos;


          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({ node: node, pos: pos });
        });

        this.setUncontrolledState({
          _checkedKeys: _checkedKeys,
          _halfCheckedKeys: _halfCheckedKeys
        });
      }
      this.__emit('check', checkedObj, eventObj);
    },
    onNodeLoad: function onNodeLoad(treeNode) {
      var _this2 = this;

      return new Promise(function (resolve) {
        // We need to get the latest state of loading/loaded keys
        _this2.setState(function (_ref) {
          var _ref$_loadedKeys = _ref._loadedKeys,
              loadedKeys = _ref$_loadedKeys === undefined ? [] : _ref$_loadedKeys,
              _ref$_loadingKeys = _ref._loadingKeys,
              loadingKeys = _ref$_loadingKeys === undefined ? [] : _ref$_loadingKeys;
          var loadData = _this2.$props.loadData;

          var _getOptionProps3 = Object(props_util["j" /* getOptionProps */])(treeNode),
              eventKey = _getOptionProps3.eventKey;

          if (!loadData || loadedKeys.indexOf(eventKey) !== -1 || loadingKeys.indexOf(eventKey) !== -1) {
            return {};
          }

          // Process load data
          var promise = loadData(treeNode);
          promise.then(function () {
            var newLoadedKeys = Object(util["a" /* arrAdd */])(_this2.$data._loadedKeys, eventKey);
            var newLoadingKeys = Object(util["b" /* arrDel */])(_this2.$data._loadingKeys, eventKey);

            // onLoad should trigger before internal setState to avoid `loadData` trigger twice.
            // https://github.com/ant-design/ant-design/issues/12464
            var eventObj = {
              event: 'load',
              node: treeNode
            };
            _this2.__emit('load', newLoadedKeys, eventObj);
            _this2.setUncontrolledState({
              _loadedKeys: newLoadedKeys
            });
            _this2.setState({
              _loadingKeys: newLoadingKeys
            });
            resolve();
          });

          return {
            _loadingKeys: Object(util["a" /* arrAdd */])(loadingKeys, eventKey)
          };
        });
      });
    },
    onNodeExpand: function onNodeExpand(e, treeNode) {
      var _this3 = this;

      var expandedKeys = this.$data._expandedKeys;
      var loadData = this.$props.loadData;

      var _getOptionProps4 = Object(props_util["j" /* getOptionProps */])(treeNode),
          eventKey = _getOptionProps4.eventKey,
          expanded = _getOptionProps4.expanded;

      // Update selected keys


      var index = expandedKeys.indexOf(eventKey);
      var targetExpanded = !expanded;

      browser_default()(expanded && index !== -1 || !expanded && index === -1, 'Expand state not sync with index check');

      if (targetExpanded) {
        expandedKeys = Object(util["a" /* arrAdd */])(expandedKeys, eventKey);
      } else {
        expandedKeys = Object(util["b" /* arrDel */])(expandedKeys, eventKey);
      }

      this.setUncontrolledState({ _expandedKeys: expandedKeys });
      this.__emit('expand', expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e
      });
      this.__emit('update:expandedKeys', expandedKeys);

      // Async Load data
      if (targetExpanded && loadData) {
        var loadPromise = this.onNodeLoad(treeNode);
        return loadPromise ? loadPromise.then(function () {
          // [Legacy] Refresh logic
          _this3.setUncontrolledState({ _expandedKeys: expandedKeys });
        }) : null;
      }

      return null;
    },
    onNodeMouseEnter: function onNodeMouseEnter(event, node) {
      this.__emit('mouseenter', { event: event, node: node });
    },
    onNodeMouseLeave: function onNodeMouseLeave(event, node) {
      this.__emit('mouseleave', { event: event, node: node });
    },
    onNodeContextMenu: function onNodeContextMenu(event, node) {
      event.preventDefault();
      this.__emit('rightClick', { event: event, node: node });
    },


    /**
     * Only update the value which is not in props
     */
    setUncontrolledState: function setUncontrolledState(state) {
      var needSync = false;
      var newState = {};
      var props = Object(props_util["j" /* getOptionProps */])(this);
      Object.keys(state).forEach(function (name) {
        if (name.replace('_', '') in props) return;
        needSync = true;
        newState[name] = state[name];
      });

      if (needSync) {
        this.setState(newState);
      }
    },
    isKeyChecked: function isKeyChecked(key) {
      var _$data$_checkedKeys = this.$data._checkedKeys,
          checkedKeys = _$data$_checkedKeys === undefined ? [] : _$data$_checkedKeys;

      return checkedKeys.indexOf(key) !== -1;
    },


    /**
     * [Legacy] Original logic use `key` as tracking clue.
     * We have to use `cloneElement` to pass `key`.
     */
    renderTreeNode: function renderTreeNode(child, index) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _$data4 = this.$data,
          keyEntities = _$data4._keyEntities,
          _$data4$_expandedKeys = _$data4._expandedKeys,
          expandedKeys = _$data4$_expandedKeys === undefined ? [] : _$data4$_expandedKeys,
          _$data4$_selectedKeys = _$data4._selectedKeys,
          selectedKeys = _$data4$_selectedKeys === undefined ? [] : _$data4$_selectedKeys,
          _$data4$_halfCheckedK = _$data4._halfCheckedKeys,
          halfCheckedKeys = _$data4$_halfCheckedK === undefined ? [] : _$data4$_halfCheckedK,
          _$data4$_loadedKeys = _$data4._loadedKeys,
          loadedKeys = _$data4$_loadedKeys === undefined ? [] : _$data4$_loadedKeys,
          _$data4$_loadingKeys = _$data4._loadingKeys,
          loadingKeys = _$data4$_loadingKeys === undefined ? [] : _$data4$_loadingKeys,
          dragOverNodeKey = _$data4._dragOverNodeKey,
          dropPosition = _$data4._dropPosition;

      var pos = Object(util["k" /* getPosition */])(level, index);
      var key = child.key;
      if (!key && (key === undefined || key === null)) {
        key = pos;
      }
      if (!keyEntities.get(key)) {
        Object(util["o" /* warnOnlyTreeNode */])();
        return null;
      }

      return Object(vnode["a" /* cloneElement */])(child, {
        props: {
          eventKey: key,
          expanded: expandedKeys.indexOf(key) !== -1,
          selected: selectedKeys.indexOf(key) !== -1,
          loaded: loadedKeys.indexOf(key) !== -1,
          loading: loadingKeys.indexOf(key) !== -1,
          checked: this.isKeyChecked(key),
          halfChecked: halfCheckedKeys.indexOf(key) !== -1,
          pos: pos,

          // [Legacy] Drag props
          dragOver: dragOverNodeKey === key && dropPosition === 0,
          dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
          dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
        },
        key: key
      });
    }
  },

  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    var treeNode = this.$data._treeNode;
    var _$props = this.$props,
        prefixCls = _$props.prefixCls,
        focusable = _$props.focusable,
        showLine = _$props.showLine,
        _$props$tabIndex = _$props.tabIndex,
        tabIndex = _$props$tabIndex === undefined ? 0 : _$props$tabIndex;

    var domProps = {};

    return h(
      'ul',
      babel_helper_vue_jsx_merge_props_default()([domProps, {
        'class': classnames_default()(prefixCls, defineProperty_default()({}, prefixCls + '-show-line', showLine)),
        attrs: { role: 'tree',
          unselectable: 'on',
          tabIndex: focusable ? tabIndex : null
        },
        on: {
          'keydown': focusable ? this.onKeydown : function () {}
        }
      }]),
      [Object(util["l" /* mapChildren */])(treeNode, function (node, index) {
        return _this4.renderTreeNode(node, index);
      })]
    );
  }
};



/* harmony default export */ var src_Tree = (Object(proxyComponent["a" /* default */])(Tree));
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tree/src/TreeNode.js
var TreeNode = __webpack_require__("cdd1");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree/src/index.js
/* concated harmony reexport Tree */__webpack_require__.d(__webpack_exports__, "Tree", function() { return Tree; });
/* concated harmony reexport TreeNode */__webpack_require__.d(__webpack_exports__, "TreeNode", function() { return TreeNode["a" /* default */]; });


Tree.TreeNode = TreeNode["a" /* default */];
src_Tree.TreeNode = TreeNode["a" /* default */];


/* harmony default export */ var src = __webpack_exports__["default"] = (src_Tree);

/***/ }),

/***/ "2322":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("9b57");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/shallowequal/index.js
var shallowequal = __webpack_require__("1b2b");
var shallowequal_default = /*#__PURE__*/__webpack_require__.n(shallowequal);

// EXTERNAL MODULE: ./node_modules/raf/index.js
var raf = __webpack_require__("c449");
var raf_default = /*#__PURE__*/__webpack_require__.n(raf);

// EXTERNAL MODULE: ./node_modules/warning/browser.js
var browser = __webpack_require__("e834");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/KeyCode.js
var KeyCode = __webpack_require__("18a7");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js + 5 modules
var vc_trigger = __webpack_require__("8496");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/omit.js/es/index.js
var es = __webpack_require__("0464");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tree/src/util.js
var util = __webpack_require__("c9a4");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tree/index.js
var vc_tree = __webpack_require__("7d1c");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/SelectNode.js


/**
 * SelectNode wrapped the tree node.
 * Let's use SelectNode instead of TreeNode
 * since TreeNode is so confuse here.
 */
/* harmony default export */ var SelectNode = ({
  name: 'SelectNode',
  functional: true,
  isTreeNode: true,
  props: vc_tree["TreeNode"].props,
  render: function render(h, context) {
    var props = context.props,
        slots = context.slots,
        listeners = context.listeners,
        data = context.data,
        scopedSlots = context.scopedSlots;

    var $slots = slots() || {};
    var children = $slots['default'];
    var slotsKey = Object.keys($slots);
    var scopedSlotsTemp = {}; // for vue 2.5.x
    slotsKey.forEach(function (name) {
      scopedSlotsTemp[name] = function () {
        return $slots[name];
      };
    });
    var treeNodeProps = extends_default()({}, data, {
      on: extends_default()({}, listeners, data.nativeOn),
      props: props,
      scopedSlots: extends_default()({}, scopedSlotsTemp, scopedSlots)
    });
    return h(
      vc_tree["TreeNode"],
      treeNodeProps,
      [children]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/strategies.js
var strategies = __webpack_require__("86a4");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/util.js










var warnDeprecatedLabel = false;

// =================== MISC ====================
function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}

function toArray(data) {
  if (data === undefined || data === null) return [];

  return Array.isArray(data) ? data : [data];
}

function createRef() {
  var func = function setRef(node) {
    func.current = node;
  };
  return func;
}

// =============== Legacy ===============
var UNSELECTABLE_STYLE = {
  userSelect: 'none',
  WebkitUserSelect: 'none'
};

var UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'unselectable'
};

/**
 * Convert position list to hierarchy structure.
 * This is little hack since use '-' to split the position.
 */
function flatToHierarchy(positionList) {
  if (!positionList.length) {
    return [];
  }

  var entrances = {};

  // Prepare the position map
  var posMap = {};
  var parsedList = positionList.slice().map(function (entity) {
    var clone = extends_default()({}, entity, {
      fields: entity.pos.split('-')
    });
    delete clone.children;
    return clone;
  });

  parsedList.forEach(function (entity) {
    posMap[entity.pos] = entity;
  });

  parsedList.sort(function (a, b) {
    return a.fields.length - b.fields.length;
  });

  // Create the hierarchy
  parsedList.forEach(function (entity) {
    var parentPos = entity.fields.slice(0, -1).join('-');
    var parentEntity = posMap[parentPos];

    if (!parentEntity) {
      entrances[entity.pos] = entity;
    } else {
      parentEntity.children = parentEntity.children || [];
      parentEntity.children.push(entity);
    }

    // Some time position list provide `key`, we don't need it
    delete entity.key;
    delete entity.fields;
  });

  return Object.keys(entrances).map(function (key) {
    return entrances[key];
  });
}

// =============== Accessibility ===============
var util_ariaId = 0;

function resetAriaId() {
  util_ariaId = 0;
}

function generateAriaId(prefix) {
  util_ariaId += 1;
  return prefix + '_' + util_ariaId;
}

function util_isLabelInValue(props) {
  var treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      labelInValue = props.labelInValue;

  if (treeCheckable && treeCheckStrictly) {
    return true;
  }
  return labelInValue || false;
}

// =================== Tree ====================
function parseSimpleTreeData(treeData, _ref) {
  var id = _ref.id,
      pId = _ref.pId,
      rootPId = _ref.rootPId;

  var keyNodes = {};
  var rootNodeList = [];

  // Fill in the map
  var nodeList = treeData.map(function (node) {
    var clone = extends_default()({}, node);
    var key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    return clone;
  });

  // Connect tree
  nodeList.forEach(function (node) {
    var parentKey = node[pId];
    var parent = keyNodes[parentKey];

    // Fill parent
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    }

    // Fill root tree node
    if (parentKey === rootPId || !parent && rootPId === null) {
      rootNodeList.push(node);
    }
  });

  return rootNodeList;
}

/**
 * Detect if position has relation.
 * e.g. 1-2 related with 1-2-3
 * e.g. 1-3-2 related with 1
 * e.g. 1-2 not related with 1-21
 */
function isPosRelated(pos1, pos2) {
  var fields1 = pos1.split('-');
  var fields2 = pos2.split('-');

  var minLen = Math.min(fields1.length, fields2.length);
  for (var i = 0; i < minLen; i += 1) {
    if (fields1[i] !== fields2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * This function is only used on treeNode check (none treeCheckStrictly but has searchInput).
 * We convert entity to { node, pos, children } format.
 * This is legacy bug but we still need to do with it.
 * @param entity
 */
function cleanEntity(_ref2) {
  var node = _ref2.node,
      pos = _ref2.pos,
      children = _ref2.children;

  var instance = {
    node: node,
    pos: pos
  };

  if (children) {
    instance.children = children.map(cleanEntity);
  }

  return instance;
}

/**
 * Get a filtered TreeNode list by provided treeNodes.
 * [Legacy] Since `Tree` use `key` as map but `key` will changed by React,
 * we have to convert `treeNodes > data > treeNodes` to keep the key.
 * Such performance hungry!
 */
function getFilterTree(h, treeNodes, searchValue, filterFunc, valueEntities) {
  if (!searchValue) {
    return null;
  }

  function mapFilteredNodeToData(node) {
    if (!node || Object(props_util["s" /* isEmptyElement */])(node)) return null;

    var match = false;
    if (filterFunc(searchValue, node)) {
      match = true;
    }
    var children = Object(props_util["n" /* getSlots */])(node)['default'];
    children = ((typeof children === 'function' ? children() : children) || []).map(mapFilteredNodeToData).filter(function (n) {
      return n;
    });
    if (children.length || match) {
      return h(
        SelectNode,
        babel_helper_vue_jsx_merge_props_default()([node.data, { key: valueEntities[Object(props_util["k" /* getPropsData */])(node).value].key }]),
        [children]
      );
    }

    return null;
  }
  return treeNodes.map(mapFilteredNodeToData).filter(function (node) {
    return node;
  });
}

// =================== Value ===================
/**
 * Convert value to array format to make logic simplify.
 */
function formatInternalValue(value, props) {
  var valueList = toArray(value);

  // Parse label in value
  if (util_isLabelInValue(props)) {
    return valueList.map(function (val) {
      if ((typeof val === 'undefined' ? 'undefined' : typeof_default()(val)) !== 'object' || !val) {
        return {
          value: '',
          label: ''
        };
      }

      return val;
    });
  }

  return valueList.map(function (val) {
    return {
      value: val
    };
  });
}

function getLabel(wrappedValue, entity, treeNodeLabelProp) {
  if (wrappedValue.label) {
    return wrappedValue.label;
  }

  if (entity) {
    var props = Object(props_util["k" /* getPropsData */])(entity.node);
    if (Object.keys(props).length) {
      return props[treeNodeLabelProp];
    }
  }

  // Since value without entity will be in missValueList.
  // This code will never reached, but we still need this in case.
  return wrappedValue.value;
}

/**
 * Convert internal state `valueList` to user needed value list.
 * This will return an array list. You need check if is not multiple when return.
 *
 * `allCheckedNodes` is used for `treeCheckStrictly`
 */
function formatSelectorValue(valueList, props, valueEntities) {
  var treeNodeLabelProp = props.treeNodeLabelProp,
      treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      showCheckedStrategy = props.showCheckedStrategy;

  // Will hide some value if `showCheckedStrategy` is set

  if (treeCheckable && !treeCheckStrictly) {
    var values = {};
    valueList.forEach(function (wrappedValue) {
      values[wrappedValue.value] = wrappedValue;
    });
    var hierarchyList = flatToHierarchy(valueList.map(function (_ref3) {
      var value = _ref3.value;
      return valueEntities[value];
    }));

    if (showCheckedStrategy === strategies["c" /* SHOW_PARENT */]) {
      // Only get the parent checked value
      return hierarchyList.map(function (_ref4) {
        var node = _ref4.node;

        var value = Object(props_util["k" /* getPropsData */])(node).value;
        return {
          label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
          value: value
        };
      });
    }
    if (showCheckedStrategy === strategies["b" /* SHOW_CHILD */]) {
      // Only get the children checked value
      var targetValueList = [];

      // Find the leaf children
      var traverse = function traverse(_ref5) {
        var node = _ref5.node,
            children = _ref5.children;

        var value = Object(props_util["k" /* getPropsData */])(node).value;
        if (!children || children.length === 0) {
          targetValueList.push({
            label: getLabel(values[value], valueEntities[value], treeNodeLabelProp),
            value: value
          });
          return;
        }

        children.forEach(function (entity) {
          traverse(entity);
        });
      };

      hierarchyList.forEach(function (entity) {
        traverse(entity);
      });

      return targetValueList;
    }
  }

  return valueList.map(function (wrappedValue) {
    return {
      label: getLabel(wrappedValue, valueEntities[wrappedValue.value], treeNodeLabelProp),
      value: wrappedValue.value
    };
  });
}

/**
 * Use `rc-tree` convertDataToTree to convert treeData to TreeNodes.
 * This will change the label to title value
 */
function processProps(props) {
  var title = props.title,
      label = props.label,
      value = props.value,
      cls = props['class'],
      style = props.style,
      _props$on = props.on,
      on = _props$on === undefined ? {} : _props$on;

  var key = props.key;
  if (!key && (key === undefined || key === null)) {
    key = value;
  }
  var p = {
    props: Object(es["a" /* default */])(props, ['on', 'key', 'class', 'className', 'style']),
    on: on,
    'class': cls || props.className,
    style: style,
    key: key
  };
  // Warning user not to use deprecated label prop.
  if (label && !title) {
    if (!warnDeprecatedLabel) {
      browser_default()(false, "'label' in treeData is deprecated. Please use 'title' instead.");
      warnDeprecatedLabel = true;
    }

    p.props.title = label;
  }

  return p;
}

function convertDataToTree(h, treeData) {
  return Object(util["g" /* convertDataToTree */])(h, treeData, { processProps: processProps });
}

/**
 * Use `rc-tree` convertTreeToEntities for entities calculation.
 * We have additional entities of `valueEntities`
 */
function initWrapper(wrapper) {
  return extends_default()({}, wrapper, {
    valueEntities: {}
  });
}

function processEntity(entity, wrapper) {
  var value = Object(props_util["k" /* getPropsData */])(entity.node).value;
  entity.value = value;

  // This should be empty, or will get error message.
  var currentEntity = wrapper.valueEntities[value];
  if (currentEntity) {
    browser_default()(false, 'Conflict! value of node \'' + entity.key + '\' (' + value + ') has already used by node \'' + currentEntity.key + '\'.');
  }
  wrapper.valueEntities[value] = entity;
}

function convertTreeToEntities(treeNodes) {
  return Object(util["h" /* convertTreeToEntities */])(treeNodes, {
    initWrapper: initWrapper,
    processEntity: processEntity
  });
}

/**
 * https://github.com/ant-design/ant-design/issues/13328
 * We need calculate the half check key when searchValue is set.
 */
// TODO: This logic may better move to rc-tree
function getHalfCheckedKeys(valueList, valueEntities) {
  var values = {};

  // Fill checked keys
  valueList.forEach(function (_ref6) {
    var value = _ref6.value;

    values[value] = false;
  });

  // Fill half checked keys
  valueList.forEach(function (_ref7) {
    var value = _ref7.value;

    var current = valueEntities[value];

    while (current && current.parent) {
      var parentValue = current.parent.value;
      if (parentValue in values) break;
      values[parentValue] = true;

      current = current.parent;
    }
  });

  // Get half keys
  return Object.keys(values).filter(function (value) {
    return values[value];
  }).map(function (value) {
    return valueEntities[value].key;
  });
}

var conductCheck = util["e" /* conductCheck */];
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/SelectTrigger.js








var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    },
    ignoreShake: true
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    },
    ignoreShake: true
  }
};

var SelectTrigger = {
  name: 'SelectTrigger',
  props: {
    // Pass by outside user props
    disabled: vue_types["a" /* default */].bool,
    showSearch: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string,
    dropdownPopupAlign: vue_types["a" /* default */].object,
    dropdownClassName: vue_types["a" /* default */].string,
    dropdownStyle: vue_types["a" /* default */].object,
    transitionName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].string,
    getPopupContainer: vue_types["a" /* default */].func,

    dropdownMatchSelectWidth: vue_types["a" /* default */].bool,

    // Pass by Select
    isMultiple: vue_types["a" /* default */].bool,
    dropdownPrefixCls: vue_types["a" /* default */].string,
    dropdownVisibleChange: vue_types["a" /* default */].func,
    popupElement: vue_types["a" /* default */].node,
    open: vue_types["a" /* default */].bool
  },
  created: function created() {
    this.triggerRef = createRef();
  },

  methods: {
    getDropdownTransitionName: function getDropdownTransitionName() {
      var _$props = this.$props,
          transitionName = _$props.transitionName,
          animation = _$props.animation,
          dropdownPrefixCls = _$props.dropdownPrefixCls;

      if (!transitionName && animation) {
        return dropdownPrefixCls + '-' + animation;
      }
      return transitionName;
    },
    forcePopupAlign: function forcePopupAlign() {
      var $trigger = this.triggerRef.current;
      if ($trigger) {
        $trigger.forcePopupAlign();
      }
    }
  },

  render: function render() {
    var _classNames;

    var h = arguments[0];
    var _$props2 = this.$props,
        disabled = _$props2.disabled,
        isMultiple = _$props2.isMultiple,
        dropdownPopupAlign = _$props2.dropdownPopupAlign,
        dropdownMatchSelectWidth = _$props2.dropdownMatchSelectWidth,
        dropdownClassName = _$props2.dropdownClassName,
        dropdownStyle = _$props2.dropdownStyle,
        dropdownVisibleChange = _$props2.dropdownVisibleChange,
        getPopupContainer = _$props2.getPopupContainer,
        dropdownPrefixCls = _$props2.dropdownPrefixCls,
        popupElement = _$props2.popupElement,
        open = _$props2.open;

    // TODO: [Legacy] Use new action when trigger fixed: https://github.com/react-component/trigger/pull/86

    // When false do nothing with the width
    // ref: https://github.com/ant-design/ant-design/issues/10927

    var stretch = void 0;
    if (dropdownMatchSelectWidth !== false) {
      stretch = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    }
    return h(
      vc_trigger["a" /* default */],
      babel_helper_vue_jsx_merge_props_default()([{
        directives: [{
          name: 'ant-ref',
          value: this.triggerRef
        }]
      }, {
        attrs: {
          action: disabled ? [] : ['click'],
          popupPlacement: 'bottomLeft',
          builtinPlacements: BUILT_IN_PLACEMENTS,
          popupAlign: dropdownPopupAlign,
          prefixCls: dropdownPrefixCls,
          popupTransitionName: this.getDropdownTransitionName(),

          popup: popupElement,
          popupVisible: open,
          getPopupContainer: getPopupContainer,
          stretch: stretch,
          popupClassName: classnames_default()(dropdownClassName, (_classNames = {}, defineProperty_default()(_classNames, dropdownPrefixCls + '--multiple', isMultiple), defineProperty_default()(_classNames, dropdownPrefixCls + '--single', !isMultiple), _classNames)),
          popupStyle: dropdownStyle
        },
        on: {
          'popupVisibleChange': dropdownVisibleChange
        }
      }]),
      [this.$slots['default']]
    );
  }
};

/* harmony default export */ var src_SelectTrigger = (SelectTrigger);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Base/BaseSelector.js



/**
 * Input Box is in different position for different mode.
 * This not the same design as `Select` cause it's followed by antd 0.x `Select`.
 * We will not follow the new design immediately since antd 3.x is already released.
 *
 * So this file named as Selector to avoid confuse.
 */





var BaseSelector_selectorPropTypes = function selectorPropTypes() {
  return {
    prefixCls: vue_types["a" /* default */].string,
    className: vue_types["a" /* default */].string,
    open: vue_types["a" /* default */].bool,
    selectorValueList: vue_types["a" /* default */].array,
    allowClear: vue_types["a" /* default */].bool,
    showArrow: vue_types["a" /* default */].bool,
    // onClick: PropTypes.func,
    // onBlur: PropTypes.func,
    // onFocus: PropTypes.func,
    removeSelected: vue_types["a" /* default */].func,
    choiceTransitionName: vue_types["a" /* default */].string,
    // Pass by component
    ariaId: vue_types["a" /* default */].string,
    inputIcon: vue_types["a" /* default */].any,
    clearIcon: vue_types["a" /* default */].any,
    removeIcon: vue_types["a" /* default */].any,
    placeholder: vue_types["a" /* default */].any,
    disabled: vue_types["a" /* default */].bool,
    focused: vue_types["a" /* default */].bool
  };
};

function noop() {}
/* harmony default export */ var Base_BaseSelector = (function (modeName) {
  var BaseSelector = {
    name: 'BaseSelector',
    mixins: [BaseMixin["a" /* default */]],
    props: Object(props_util["r" /* initDefaultProps */])(extends_default()({}, BaseSelector_selectorPropTypes(), {

      // Pass by HOC
      renderSelection: vue_types["a" /* default */].func.isRequired,
      renderPlaceholder: vue_types["a" /* default */].func,
      tabIndex: vue_types["a" /* default */].number
    }), {
      tabIndex: 0
    }),
    inject: {
      vcTreeSelect: { 'default': function _default() {
          return {};
        } }
    },
    created: function created() {
      this.domRef = createRef();
    },

    methods: {
      onFocus: function onFocus(e) {
        var focused = this.$props.focused;
        var onSelectorFocus = this.vcTreeSelect.onSelectorFocus;


        if (!focused) {
          onSelectorFocus();
        }
        this.__emit('focus', e);
      },
      onBlur: function onBlur(e) {
        var onSelectorBlur = this.vcTreeSelect.onSelectorBlur;

        // TODO: Not trigger when is inner component get focused

        onSelectorBlur();
        this.__emit('blur', e);
      },
      focus: function focus() {
        this.domRef.current.focus();
      },
      blur: function blur() {
        this.domRef.current.blur();
      },
      renderClear: function renderClear() {
        var h = this.$createElement;
        var _$props = this.$props,
            prefixCls = _$props.prefixCls,
            allowClear = _$props.allowClear,
            selectorValueList = _$props.selectorValueList;
        var onSelectorClear = this.vcTreeSelect.onSelectorClear;


        if (!allowClear || !selectorValueList.length || !selectorValueList[0].value) {
          return null;
        }
        var clearIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'clearIcon');
        return h(
          'span',
          { key: 'clear', 'class': prefixCls + '-selection__clear', on: {
              'click': onSelectorClear
            }
          },
          [clearIcon]
        );
      },
      renderArrow: function renderArrow() {
        var h = this.$createElement;
        var _$props2 = this.$props,
            prefixCls = _$props2.prefixCls,
            showArrow = _$props2.showArrow;

        if (!showArrow) {
          return null;
        }
        var inputIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'inputIcon');
        return h(
          'span',
          { key: 'arrow', 'class': prefixCls + '-arrow', style: { outline: 'none' } },
          [inputIcon]
        );
      }
    },

    render: function render() {
      var _classNames;

      var h = arguments[0];
      var _$props3 = this.$props,
          prefixCls = _$props3.prefixCls,
          className = _$props3.className,
          style = _$props3.style,
          open = _$props3.open,
          focused = _$props3.focused,
          disabled = _$props3.disabled,
          allowClear = _$props3.allowClear,
          ariaId = _$props3.ariaId,
          renderSelection = _$props3.renderSelection,
          renderPlaceholder = _$props3.renderPlaceholder,
          tabIndex = _$props3.tabIndex;
      var onSelectorKeyDown = this.vcTreeSelect.onSelectorKeyDown,
          $listeners = this.$listeners;


      var myTabIndex = tabIndex;
      if (disabled) {
        myTabIndex = null;
      }

      return h(
        'span',
        babel_helper_vue_jsx_merge_props_default()([{
          style: style,
          on: {
            'click': $listeners.click || noop
          },

          'class': classnames_default()(className, prefixCls, (_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-open', open), defineProperty_default()(_classNames, prefixCls + '-focused', open || focused), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), defineProperty_default()(_classNames, prefixCls + '-enabled', !disabled), defineProperty_default()(_classNames, prefixCls + '-allow-clear', allowClear), _classNames))
        }, {
          directives: [{
            name: 'ant-ref',
            value: this.domRef
          }]
        }, {
          attrs: {
            role: 'combobox',
            'aria-expanded': open,
            'aria-owns': open ? ariaId : undefined,
            'aria-controls': open ? ariaId : undefined,
            'aria-haspopup': 'listbox',
            'aria-disabled': disabled,
            tabIndex: myTabIndex
          },
          on: {
            'focus': this.onFocus,
            'blur': this.onBlur,
            'keydown': onSelectorKeyDown
          }
        }]),
        [h(
          'span',
          {
            key: 'selection',
            'class': classnames_default()(prefixCls + '-selection', prefixCls + '-selection--' + modeName)
          },
          [renderSelection(), this.renderClear(), this.renderArrow(), renderPlaceholder && renderPlaceholder()]
        )]
      );
    }
  };

  return BaseSelector;
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Selector/SingleSelector.js





var SingleSelector_Selector = Base_BaseSelector('single');

var SingleSelector = {
  name: 'SingleSelector',
  props: BaseSelector_selectorPropTypes(),
  created: function created() {
    this.selectorRef = createRef();
  },

  methods: {
    focus: function focus() {
      this.selectorRef.current.focus();
    },
    blur: function blur() {
      this.selectorRef.current.blur();
    },
    renderSelection: function renderSelection() {
      var h = this.$createElement;
      var _$props = this.$props,
          selectorValueList = _$props.selectorValueList,
          placeholder = _$props.placeholder,
          prefixCls = _$props.prefixCls;


      var innerNode = void 0;

      if (selectorValueList.length) {
        var _selectorValueList$ = selectorValueList[0],
            label = _selectorValueList$.label,
            value = _selectorValueList$.value;

        innerNode = h(
          'span',
          { key: 'value', attrs: { title: toTitle(label) },
            'class': prefixCls + '-selection-selected-value' },
          [label || value]
        );
      } else {
        innerNode = h(
          'span',
          { key: 'placeholder', 'class': prefixCls + '-selection__placeholder' },
          [placeholder]
        );
      }

      return h(
        'span',
        { 'class': prefixCls + '-selection__rendered' },
        [innerNode]
      );
    }
  },

  render: function render() {
    var h = arguments[0];

    var props = {
      props: extends_default()({}, Object(props_util["j" /* getOptionProps */])(this), {
        renderSelection: this.renderSelection
      }),
      on: this.$listeners,
      directives: [{
        name: 'ant-ref',
        value: this.selectorRef
      }]
    };
    return h(SingleSelector_Selector, props);
  }
};

/* harmony default export */ var Selector_SingleSelector = (SingleSelector);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/SearchInput.js


/**
 * Since search box is in different position with different mode.
 * - Single: in the popup box
 * - multiple: in the selector
 * Move the code as a SearchInput for easy management.
 */




var SearchInput = {
  name: 'SearchInput',
  props: {
    open: vue_types["a" /* default */].bool,
    searchValue: vue_types["a" /* default */].string,
    prefixCls: vue_types["a" /* default */].string,
    disabled: vue_types["a" /* default */].bool,
    renderPlaceholder: vue_types["a" /* default */].func,
    needAlign: vue_types["a" /* default */].bool,
    ariaId: vue_types["a" /* default */].string
  },
  inject: {
    vcTreeSelect: { 'default': function _default() {
        return {};
      } }
  },
  data: function data() {
    return {
      mirrorSearchValue: this.searchValue
    };
  },

  watch: {
    searchValue: function searchValue(val) {
      this.mirrorSearchValue = val;
    }
  },
  created: function created() {
    this.inputRef = createRef();
    this.mirrorInputRef = createRef();
    this.prevProps = extends_default()({}, this.$props);
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      var _$props = _this.$props,
          open = _$props.open,
          needAlign = _$props.needAlign;

      if (needAlign) {
        _this.alignInputWidth();
      }

      if (open) {
        _this.focus(true);
      }
    });
  },
  updated: function updated() {
    var _this2 = this;

    var _$props2 = this.$props,
        open = _$props2.open,
        searchValue = _$props2.searchValue,
        needAlign = _$props2.needAlign;
    var prevProps = this.prevProps;

    this.$nextTick(function () {
      if (open && prevProps.open !== open) {
        _this2.focus();
      }
      if (needAlign && searchValue !== prevProps.searchValue) {
        _this2.alignInputWidth();
      }
      _this2.prevProps = extends_default()({}, _this2.$props);
    });
  },

  methods: {
    /**
     * `scrollWidth` is not correct in IE, do the workaround.
     * ref: https://github.com/react-component/tree-select/issues/65
     *  clientWidth 0 when mounted in vue. why?
     */
    alignInputWidth: function alignInputWidth() {
      this.inputRef.current.style.width = (this.mirrorInputRef.current.clientWidth || this.mirrorInputRef.current.offsetWidth) + 'px';
    },


    /**
     * Need additional timeout for focus cause parent dom is not ready when didMount trigger
     */
    focus: function focus(isDidMount) {
      var _this3 = this;

      if (this.inputRef.current) {
        if (isDidMount) {
          setTimeout(function () {
            _this3.inputRef.current.focus();
          }, 0);
        } else {
          // set it into else, Avoid scrolling when focus
          this.inputRef.current.focus();
        }
      }
    },
    blur: function blur() {
      if (this.inputRef.current) {
        this.inputRef.current.blur();
      }
    },
    handleInputChange: function handleInputChange(e) {
      var _e$target = e.target,
          value = _e$target.value,
          composing = _e$target.composing;
      var _searchValue = this.searchValue,
          searchValue = _searchValue === undefined ? '' : _searchValue;

      if (composing || searchValue === value) {
        this.mirrorSearchValue = value;
        return;
      }
      this.vcTreeSelect.onSearchInputChange(e);
    }
  },

  render: function render() {
    var h = arguments[0];
    var _$props3 = this.$props,
        searchValue = _$props3.searchValue,
        prefixCls = _$props3.prefixCls,
        disabled = _$props3.disabled,
        renderPlaceholder = _$props3.renderPlaceholder,
        open = _$props3.open,
        ariaId = _$props3.ariaId;
    var onSearchInputKeyDown = this.vcTreeSelect.onSearchInputKeyDown,
        handleInputChange = this.handleInputChange,
        mirrorSearchValue = this.mirrorSearchValue;

    return h(
      'span',
      { 'class': prefixCls + '-search__field__wrap' },
      [h('input', babel_helper_vue_jsx_merge_props_default()([{
        attrs: {
          type: 'text'
        }
      }, {
        directives: [{
          name: 'ant-ref',
          value: this.inputRef
        }, {
          name: 'ant-input'
        }]
      }, {
        on: {
          'input': handleInputChange,
          'keydown': onSearchInputKeyDown
        },
        domProps: {
          'value': searchValue
        },
        attrs: {
          disabled: disabled,

          'aria-label': 'filter select',
          'aria-autocomplete': 'list',
          'aria-controls': open ? ariaId : undefined,
          'aria-multiline': 'false'
        },
        'class': prefixCls + '-search__field' }])), h(
        'span',
        babel_helper_vue_jsx_merge_props_default()([{
          directives: [{
            name: 'ant-ref',
            value: this.mirrorInputRef
          }]
        }, {
          'class': prefixCls + '-search__field__mirror'
        }]),
        [mirrorSearchValue, '\xA0']
      ), renderPlaceholder ? renderPlaceholder() : null]
    );
  }
};

/* harmony default export */ var src_SearchInput = (SearchInput);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Selector/MultipleSelector/Selection.js






var Selection = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    prefixCls: vue_types["a" /* default */].string,
    maxTagTextLength: vue_types["a" /* default */].number,
    // onRemove: PropTypes.func,

    label: vue_types["a" /* default */].any,
    value: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].number]),
    removeIcon: vue_types["a" /* default */].any
  },
  methods: {
    onRemove: function onRemove(event) {
      var value = this.$props.value;

      this.__emit('remove', event, value);
      event.stopPropagation();
    }
  },

  render: function render() {
    var h = arguments[0];
    var _$props = this.$props,
        prefixCls = _$props.prefixCls,
        maxTagTextLength = _$props.maxTagTextLength,
        label = _$props.label,
        value = _$props.value;
    var $listeners = this.$listeners;

    var content = label || value;
    if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
      content = content.slice(0, maxTagTextLength) + '...';
    }

    return h(
      'li',
      babel_helper_vue_jsx_merge_props_default()([{
        style: UNSELECTABLE_STYLE
      }, { attrs: UNSELECTABLE_ATTRIBUTE }, {
        attrs: {
          role: 'menuitem',

          title: toTitle(label)
        },
        'class': prefixCls + '-selection__choice' }]),
      [$listeners.remove && h(
        'span',
        { 'class': prefixCls + '-selection__choice__remove', on: {
            'click': this.onRemove
          }
        },
        [Object(props_util["g" /* getComponentFromProp */])(this, 'removeIcon')]
      ), h(
        'span',
        { 'class': prefixCls + '-selection__choice__content' },
        [content]
      )]
    );
  }
};

/* harmony default export */ var MultipleSelector_Selection = (Selection);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Selector/MultipleSelector/index.js











var TREE_SELECT_EMPTY_VALUE_KEY = 'RC_TREE_SELECT_EMPTY_VALUE_KEY';

var MultipleSelector_Selector = Base_BaseSelector('multiple');

// export const multipleSelectorContextTypes = {
//   onMultipleSelectorRemove: PropTypes.func.isRequired,
// }

var MultipleSelector = {
  mixins: [BaseMixin["a" /* default */]],
  props: extends_default()({}, BaseSelector_selectorPropTypes(), src_SearchInput.props, {
    selectorValueList: vue_types["a" /* default */].array,
    disabled: vue_types["a" /* default */].bool,
    searchValue: vue_types["a" /* default */].string,
    labelInValue: vue_types["a" /* default */].bool,
    maxTagCount: vue_types["a" /* default */].number,
    maxTagPlaceholder: vue_types["a" /* default */].any

    // onChoiceAnimationLeave: PropTypes.func,
  }),
  inject: {
    vcTreeSelect: { 'default': function _default() {
        return {};
      } }
  },
  created: function created() {
    this.inputRef = createRef();
  },

  methods: {
    onPlaceholderClick: function onPlaceholderClick() {
      this.inputRef.current.focus();
    },
    focus: function focus() {
      this.inputRef.current.focus();
    },
    blur: function blur() {
      this.inputRef.current.blur();
    },
    _renderPlaceholder: function _renderPlaceholder() {
      var h = this.$createElement;
      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          placeholder = _$props.placeholder,
          searchPlaceholder = _$props.searchPlaceholder,
          searchValue = _$props.searchValue,
          selectorValueList = _$props.selectorValueList;


      var currentPlaceholder = placeholder || searchPlaceholder;

      if (!currentPlaceholder) return null;

      var hidden = searchValue || selectorValueList.length;

      // [Legacy] Not remove the placeholder
      return h(
        'span',
        {
          style: {
            display: hidden ? 'none' : 'block'
          },
          on: {
            'click': this.onPlaceholderClick
          },

          'class': prefixCls + '-search__field__placeholder'
        },
        [currentPlaceholder]
      );
    },
    onChoiceAnimationLeave: function onChoiceAnimationLeave() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.__emit.apply(this, ['choiceAnimationLeave'].concat(toConsumableArray_default()(args)));
    },
    renderSelection: function renderSelection() {
      var _this = this;

      var h = this.$createElement;
      var _$props2 = this.$props,
          selectorValueList = _$props2.selectorValueList,
          choiceTransitionName = _$props2.choiceTransitionName,
          prefixCls = _$props2.prefixCls,
          labelInValue = _$props2.labelInValue,
          maxTagCount = _$props2.maxTagCount;
      var onMultipleSelectorRemove = this.vcTreeSelect.onMultipleSelectorRemove,
          $listeners = this.$listeners,
          $slots = this.$slots;

      // Check if `maxTagCount` is set

      var myValueList = selectorValueList;
      if (maxTagCount >= 0) {
        myValueList = selectorValueList.slice(0, maxTagCount);
      }
      // Selector node list
      var selectedValueNodes = myValueList.map(function (_ref) {
        var label = _ref.label,
            value = _ref.value;
        return h(
          MultipleSelector_Selection,
          babel_helper_vue_jsx_merge_props_default()([{
            props: extends_default()({}, _this.$props, {
              label: label,
              value: value
            }),
            on: extends_default()({}, $listeners, { remove: onMultipleSelectorRemove })
          }, {
            key: value || TREE_SELECT_EMPTY_VALUE_KEY
          }]),
          [$slots['default']]
        );
      });

      // Rest node count
      if (maxTagCount >= 0 && maxTagCount < selectorValueList.length) {
        var content = '+ ' + (selectorValueList.length - maxTagCount) + ' ...';
        var maxTagPlaceholder = Object(props_util["g" /* getComponentFromProp */])(this, 'maxTagPlaceholder', {}, false);
        if (typeof maxTagPlaceholder === 'string') {
          content = maxTagPlaceholder;
        } else if (typeof maxTagPlaceholder === 'function') {
          var restValueList = selectorValueList.slice(maxTagCount);
          content = maxTagPlaceholder(labelInValue ? restValueList : restValueList.map(function (_ref2) {
            var value = _ref2.value;
            return value;
          }));
        }

        var restNodeSelect = h(
          MultipleSelector_Selection,
          babel_helper_vue_jsx_merge_props_default()([{
            props: extends_default()({}, this.$props, {
              label: content,
              value: null
            }),
            on: $listeners
          }, {
            key: 'rc-tree-select-internal-max-tag-counter'
          }]),
          [$slots['default']]
        );

        selectedValueNodes.push(restNodeSelect);
      }

      selectedValueNodes.push(h(
        'li',
        { 'class': prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
        [h(
          src_SearchInput,
          {
            props: extends_default()({}, this.$props, {
              needAlign: true
            }),
            on: $listeners,
            directives: [{
              name: 'ant-ref',
              value: this.inputRef
            }]
          },
          [$slots['default']]
        )]
      ));
      var className = prefixCls + '-selection__rendered';
      if (choiceTransitionName) {
        var transitionProps = Object(getTransitionProps["a" /* default */])(choiceTransitionName, {
          tag: 'ul',
          afterLeave: this.onChoiceAnimationLeave
        });
        return h(
          'transition-group',
          babel_helper_vue_jsx_merge_props_default()([{ 'class': className }, transitionProps]),
          [selectedValueNodes]
        );
      }
      return h(
        'ul',
        { 'class': className, attrs: { role: 'menubar' }
        },
        [selectedValueNodes]
      );
    }
  },

  render: function render() {
    var h = arguments[0];
    var $listeners = this.$listeners,
        $slots = this.$slots;

    return h(
      MultipleSelector_Selector,
      {
        props: extends_default()({}, this.$props, {
          tabIndex: -1,
          showArrow: false,
          renderSelection: this.renderSelection,
          renderPlaceholder: this._renderPlaceholder
        }),
        on: $listeners
      },
      [$slots['default']]
    );
  }
};

/* harmony default export */ var Selector_MultipleSelector = (MultipleSelector);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Base/BasePopup.js







// export const popupContextTypes = {
//   onPopupKeyDown: PropTypes.func.isRequired,
//   onTreeNodeSelect: PropTypes.func.isRequired,
//   onTreeNodeCheck: PropTypes.func.isRequired,
// }
function BasePopup_getDerivedStateFromProps(nextProps, prevState) {
  var _ref = prevState || {},
      _ref$_prevProps = _ref._prevProps,
      prevProps = _ref$_prevProps === undefined ? {} : _ref$_prevProps,
      loadedKeys = _ref._loadedKeys,
      expandedKeyList = _ref._expandedKeyList,
      cachedExpandedKeyList = _ref._cachedExpandedKeyList;

  var valueList = nextProps.valueList,
      valueEntities = nextProps.valueEntities,
      keyEntities = nextProps.keyEntities,
      treeExpandedKeys = nextProps.treeExpandedKeys,
      filteredTreeNodes = nextProps.filteredTreeNodes,
      upperSearchValue = nextProps.upperSearchValue;


  var newState = {
    _prevProps: extends_default()({}, nextProps)
  };

  // Check value update
  if (valueList !== prevProps.valueList) {
    newState._keyList = valueList.map(function (_ref2) {
      var value = _ref2.value;
      return valueEntities[value];
    }).filter(function (entity) {
      return entity;
    }).map(function (_ref3) {
      var key = _ref3.key;
      return key;
    });
  }

  // Show all when tree is in filter mode
  if (!treeExpandedKeys && filteredTreeNodes && filteredTreeNodes.length && filteredTreeNodes !== prevProps.filteredTreeNodes) {
    newState._expandedKeyList = [].concat(toConsumableArray_default()(keyEntities.keys()));
  }

  // Cache `expandedKeyList` when filter set
  if (upperSearchValue && !prevProps.upperSearchValue) {
    newState._cachedExpandedKeyList = expandedKeyList;
  } else if (!upperSearchValue && prevProps.upperSearchValue && !treeExpandedKeys) {
    newState._expandedKeyList = cachedExpandedKeyList || [];
    newState._cachedExpandedKeyList = [];
  }

  // Use expandedKeys if provided
  if (prevProps.treeExpandedKeys !== treeExpandedKeys) {
    newState._expandedKeyList = treeExpandedKeys;
  }

  // Clean loadedKeys if key not exist in keyEntities anymore
  if (nextProps.loadData) {
    newState._loadedKeys = loadedKeys.filter(function (key) {
      return keyEntities.has(key);
    });
  }

  return newState;
}
var BasePopup = {
  mixins: [BaseMixin["a" /* default */]],
  name: 'BasePopup',
  props: {
    prefixCls: vue_types["a" /* default */].string,
    upperSearchValue: vue_types["a" /* default */].string,
    valueList: vue_types["a" /* default */].array,
    searchHalfCheckedKeys: vue_types["a" /* default */].array,
    valueEntities: vue_types["a" /* default */].object,
    keyEntities: Map,
    treeIcon: vue_types["a" /* default */].bool,
    treeLine: vue_types["a" /* default */].bool,
    treeNodeFilterProp: vue_types["a" /* default */].string,
    treeCheckable: vue_types["a" /* default */].any,
    treeCheckStrictly: vue_types["a" /* default */].bool,
    treeDefaultExpandAll: vue_types["a" /* default */].bool,
    treeDefaultExpandedKeys: vue_types["a" /* default */].array,
    treeExpandedKeys: vue_types["a" /* default */].array,
    loadData: vue_types["a" /* default */].func,
    multiple: vue_types["a" /* default */].bool,
    // onTreeExpand: PropTypes.func,
    searchValue: vue_types["a" /* default */].string,
    treeNodes: vue_types["a" /* default */].any,
    filteredTreeNodes: vue_types["a" /* default */].any,
    notFoundContent: vue_types["a" /* default */].any,

    ariaId: vue_types["a" /* default */].string,
    switcherIcon: vue_types["a" /* default */].any,
    // HOC
    renderSearch: vue_types["a" /* default */].func,
    // onTreeExpanded: PropTypes.func,

    __propsSymbol__: vue_types["a" /* default */].any
  },
  inject: {
    vcTreeSelect: { 'default': function _default() {
        return {};
      } }
  },
  watch: {
    __propsSymbol__: function __propsSymbol__() {
      var state = BasePopup_getDerivedStateFromProps(this.$props, this.$data);
      this.setState(state);
    }
  },
  data: function data() {
    browser_default()(this.$props.__propsSymbol__, 'must pass __propsSymbol__');
    var _$props = this.$props,
        treeDefaultExpandAll = _$props.treeDefaultExpandAll,
        treeDefaultExpandedKeys = _$props.treeDefaultExpandedKeys,
        keyEntities = _$props.keyEntities;

    // TODO: make `expandedKeyList` control

    var expandedKeyList = treeDefaultExpandedKeys;
    if (treeDefaultExpandAll) {
      expandedKeyList = [].concat(toConsumableArray_default()(keyEntities.keys()));
    }

    var state = {
      _keyList: [],
      _expandedKeyList: expandedKeyList,
      // Cache `expandedKeyList` when tree is in filter. This is used in `getDerivedStateFromProps`
      _cachedExpandedKeyList: [], // eslint-disable-line react/no-unused-state
      _loadedKeys: [],
      _prevProps: {}
    };
    return extends_default()({}, state, BasePopup_getDerivedStateFromProps(this.$props, state));
  },

  methods: {
    onTreeExpand: function onTreeExpand(expandedKeyList) {
      var _this = this;

      var treeExpandedKeys = this.$props.treeExpandedKeys;

      // Set uncontrolled state

      if (!treeExpandedKeys) {
        this.setState({ _expandedKeyList: expandedKeyList }, function () {
          _this.__emit('treeExpanded');
        });
      }
      this.__emit('update:treeExpandedKeys', expandedKeyList);
      this.__emit('treeExpand', expandedKeyList);
    },
    onLoad: function onLoad(loadedKeys) {
      this.setState({ _loadedKeys: loadedKeys });
    },


    /**
     * Not pass `loadData` when searching. To avoid loop ajax call makes browser crash.
     */
    getLoadData: function getLoadData() {
      var _$props2 = this.$props,
          loadData = _$props2.loadData,
          upperSearchValue = _$props2.upperSearchValue;

      if (upperSearchValue) return null;
      return loadData;
    },


    /**
     * This method pass to Tree component which is used for add filtered class
     * in TreeNode > li
     */
    filterTreeNode: function filterTreeNode(treeNode) {
      var _$props3 = this.$props,
          upperSearchValue = _$props3.upperSearchValue,
          treeNodeFilterProp = _$props3.treeNodeFilterProp;


      var filterVal = treeNode[treeNodeFilterProp];
      if (typeof filterVal === 'string') {
        return upperSearchValue && filterVal.toUpperCase().indexOf(upperSearchValue) !== -1;
      }

      return false;
    },
    renderNotFound: function renderNotFound() {
      var h = this.$createElement;
      var _$props4 = this.$props,
          prefixCls = _$props4.prefixCls,
          notFoundContent = _$props4.notFoundContent;


      return h(
        'span',
        { 'class': prefixCls + '-not-found' },
        [notFoundContent]
      );
    }
  },

  render: function render() {
    var h = arguments[0];
    var _$data = this.$data,
        keyList = _$data._keyList,
        expandedKeyList = _$data._expandedKeyList,
        loadedKeys = _$data._loadedKeys;
    var _$props5 = this.$props,
        prefixCls = _$props5.prefixCls,
        treeNodes = _$props5.treeNodes,
        filteredTreeNodes = _$props5.filteredTreeNodes,
        treeIcon = _$props5.treeIcon,
        treeLine = _$props5.treeLine,
        treeCheckable = _$props5.treeCheckable,
        treeCheckStrictly = _$props5.treeCheckStrictly,
        multiple = _$props5.multiple,
        ariaId = _$props5.ariaId,
        renderSearch = _$props5.renderSearch,
        switcherIcon = _$props5.switcherIcon,
        searchHalfCheckedKeys = _$props5.searchHalfCheckedKeys;
    var _vcTreeSelect = this.vcTreeSelect,
        onPopupKeyDown = _vcTreeSelect.onPopupKeyDown,
        onTreeNodeSelect = _vcTreeSelect.onTreeNodeSelect,
        onTreeNodeCheck = _vcTreeSelect.onTreeNodeCheck;


    var loadData = this.getLoadData();

    var treeProps = {};

    if (treeCheckable) {
      treeProps.checkedKeys = keyList;
    } else {
      treeProps.selectedKeys = keyList;
    }
    var $notFound = void 0;
    var $treeNodes = void 0;
    if (filteredTreeNodes) {
      if (filteredTreeNodes.length) {
        treeProps.checkStrictly = true;
        $treeNodes = filteredTreeNodes;

        // Fill halfCheckedKeys
        if (treeCheckable && !treeCheckStrictly) {
          treeProps.checkedKeys = {
            checked: keyList,
            halfChecked: searchHalfCheckedKeys
          };
        }
      } else {
        $notFound = this.renderNotFound();
      }
    } else if (!treeNodes.length) {
      $notFound = this.renderNotFound();
    } else {
      $treeNodes = treeNodes;
    }

    var $tree = void 0;
    if ($notFound) {
      $tree = $notFound;
    } else {
      var treeAllProps = {
        props: extends_default()({
          prefixCls: prefixCls + '-tree',
          showIcon: treeIcon,
          showLine: treeLine,
          selectable: !treeCheckable,
          checkable: treeCheckable,
          checkStrictly: treeCheckStrictly,
          multiple: multiple,
          loadData: loadData,
          loadedKeys: loadedKeys,
          expandedKeys: expandedKeyList,
          filterTreeNode: this.filterTreeNode,
          switcherIcon: switcherIcon
        }, treeProps, {
          __propsSymbol__: Symbol(),
          children: $treeNodes
        }),
        on: {
          select: onTreeNodeSelect,
          check: onTreeNodeCheck,
          expand: this.onTreeExpand,
          load: this.onLoad
        }
      };
      $tree = h(vc_tree["Tree"], treeAllProps);
    }

    return h(
      'div',
      {
        attrs: { role: 'listbox', id: ariaId, tabIndex: -1 },
        on: {
          'keydown': onPopupKeyDown
        }
      },
      [renderSearch ? renderSearch() : null, $tree]
    );
  }
};

/* harmony default export */ var Base_BasePopup = (BasePopup);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Popup/SinglePopup.js






var SinglePopup = {
  name: 'SinglePopup',
  props: extends_default()({}, Base_BasePopup.props, src_SearchInput.props, {
    searchValue: vue_types["a" /* default */].string,
    showSearch: vue_types["a" /* default */].bool,
    dropdownPrefixCls: vue_types["a" /* default */].string,
    disabled: vue_types["a" /* default */].bool,
    searchPlaceholder: vue_types["a" /* default */].string
  }),
  created: function created() {
    this.inputRef = createRef();
  },

  methods: {
    onPlaceholderClick: function onPlaceholderClick() {
      this.inputRef.current.focus();
    },
    _renderPlaceholder: function _renderPlaceholder() {
      var h = this.$createElement;
      var _$props = this.$props,
          searchPlaceholder = _$props.searchPlaceholder,
          searchValue = _$props.searchValue,
          prefixCls = _$props.prefixCls;


      if (!searchPlaceholder) {
        return null;
      }

      return h(
        'span',
        {
          style: {
            display: searchValue ? 'none' : 'block'
          },
          on: {
            'click': this.onPlaceholderClick
          },

          'class': prefixCls + '-search__field__placeholder'
        },
        [searchPlaceholder]
      );
    },
    _renderSearch: function _renderSearch() {
      var h = this.$createElement;
      var _$props2 = this.$props,
          showSearch = _$props2.showSearch,
          dropdownPrefixCls = _$props2.dropdownPrefixCls;


      if (!showSearch) {
        return null;
      }

      return h(
        'span',
        { 'class': dropdownPrefixCls + '-search' },
        [h(src_SearchInput, {
          props: extends_default()({}, this.$props, { renderPlaceholder: this._renderPlaceholder }),
          on: this.$listeners,
          directives: [{
            name: 'ant-ref',
            value: this.inputRef
          }]
        })]
      );
    }
  },
  render: function render() {
    var h = arguments[0];

    return h(Base_BasePopup, {
      props: extends_default()({}, this.$props, { renderSearch: this._renderSearch, __propsSymbol__: Symbol() }),
      on: this.$listeners
    });
  }
};

/* harmony default export */ var Popup_SinglePopup = (SinglePopup);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Popup/MultiplePopup.js


/* harmony default export */ var MultiplePopup = (Base_BasePopup);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/Select.js



/**
 * ARIA: https://www.w3.org/TR/wai-aria/#combobox
 * Sample 1: https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/combobox/aria1.1pattern/listbox-combo.html
 * Sample 2: https://www.w3.org/blog/wai-components-gallery/widget/combobox-with-aria-autocompleteinline/
 *
 * Tab logic:
 * Popup is close
 * 1. Focus input (mark component as focused)
 * 2. Press enter to show the popup
 * 3. If popup has input, focus it
 *
 * Popup is open
 * 1. press tab to close the popup
 * 2. Focus back to the selection input box
 * 3. Let the native tab going on
 *
 * TreeSelect use 2 design type.
 * In single mode, we should focus on the `span`
 * In multiple mode, we should focus on the `input`
 */


















function getWatch() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var watch = {};
  keys.forEach(function (k) {
    watch[k] = function () {
      this.needSyncKeys[k] = true;
    };
  });
  return watch;
}
var Select = {
  name: 'Select',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])({
    prefixCls: vue_types["a" /* default */].string,
    prefixAria: vue_types["a" /* default */].string,
    multiple: vue_types["a" /* default */].bool,
    showArrow: vue_types["a" /* default */].bool,
    open: vue_types["a" /* default */].bool,
    value: vue_types["a" /* default */].any,

    autoFocus: vue_types["a" /* default */].bool,

    defaultOpen: vue_types["a" /* default */].bool,
    defaultValue: vue_types["a" /* default */].any,

    showSearch: vue_types["a" /* default */].bool,
    placeholder: vue_types["a" /* default */].any,
    inputValue: vue_types["a" /* default */].string, // [Legacy] Deprecated. Use `searchValue` instead.
    searchValue: vue_types["a" /* default */].string,
    autoClearSearchValue: vue_types["a" /* default */].bool,
    searchPlaceholder: vue_types["a" /* default */].any, // [Legacy] Confuse with placeholder
    disabled: vue_types["a" /* default */].bool,
    children: vue_types["a" /* default */].any,
    labelInValue: vue_types["a" /* default */].bool,
    maxTagCount: vue_types["a" /* default */].number,
    maxTagPlaceholder: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].any, vue_types["a" /* default */].func]),
    maxTagTextLength: vue_types["a" /* default */].number,
    showCheckedStrategy: vue_types["a" /* default */].oneOf([strategies["a" /* SHOW_ALL */], strategies["c" /* SHOW_PARENT */], strategies["b" /* SHOW_CHILD */]]),
    dropdownClassName: vue_types["a" /* default */].string,
    dropdownStyle: vue_types["a" /* default */].object,
    dropdownVisibleChange: vue_types["a" /* default */].func,
    dropdownMatchSelectWidth: vue_types["a" /* default */].bool,
    treeData: vue_types["a" /* default */].array,
    treeDataSimpleMode: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].bool, vue_types["a" /* default */].object]),
    treeNodeFilterProp: vue_types["a" /* default */].string,
    treeNodeLabelProp: vue_types["a" /* default */].string,
    treeCheckable: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].any, vue_types["a" /* default */].object, vue_types["a" /* default */].bool]),
    // treeCheckable: PropTypes.any,
    treeCheckStrictly: vue_types["a" /* default */].bool,
    treeIcon: vue_types["a" /* default */].bool,
    treeLine: vue_types["a" /* default */].bool,
    treeDefaultExpandAll: vue_types["a" /* default */].bool,
    treeDefaultExpandedKeys: vue_types["a" /* default */].array,
    treeExpandedKeys: vue_types["a" /* default */].array,
    loadData: vue_types["a" /* default */].func,
    filterTreeNode: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].func, vue_types["a" /* default */].bool]),

    notFoundContent: vue_types["a" /* default */].any,
    getPopupContainer: vue_types["a" /* default */].func,

    // onSearch: PropTypes.func,
    // onSelect: PropTypes.func,
    // onDeselect: PropTypes.func,
    // onChange: PropTypes.func,
    // onDropdownVisibleChange: PropTypes.func,

    // onTreeExpand: PropTypes.func,
    allowClear: vue_types["a" /* default */].bool,
    transitionName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].string,
    choiceTransitionName: vue_types["a" /* default */].string,
    inputIcon: vue_types["a" /* default */].any,
    clearIcon: vue_types["a" /* default */].any,
    removeIcon: vue_types["a" /* default */].any,
    switcherIcon: vue_types["a" /* default */].any,
    __propsSymbol__: vue_types["a" /* default */].any
  }, {
    prefixCls: 'rc-tree-select',
    prefixAria: 'rc-tree-select',
    showArrow: true,
    showSearch: true,
    autoClearSearchValue: true,
    showCheckedStrategy: strategies["b" /* SHOW_CHILD */],

    // dropdownMatchSelectWidth change the origin design, set to false now
    // ref: https://github.com/react-component/select/blob/4cad95e098a341a09de239ad6981067188842020/src/Select.jsx#L344
    // ref: https://github.com/react-component/select/pull/71
    treeNodeFilterProp: 'value',
    treeNodeLabelProp: 'title',
    treeIcon: false,
    notFoundContent: 'Not Found',
    dropdownStyle: {},
    dropdownVisibleChange: function dropdownVisibleChange() {
      return true;
    }
  }),

  data: function data() {
    browser_default()(this.$props.__propsSymbol__, 'must pass __propsSymbol__');
    var _$props = this.$props,
        prefixAria = _$props.prefixAria,
        defaultOpen = _$props.defaultOpen,
        open = _$props.open;

    this.needSyncKeys = {};
    this.selectorRef = createRef();
    this.selectTriggerRef = createRef();

    // ARIA need `aria-controls` props mapping
    // Since this need user input. Let's generate ourselves
    this.ariaId = generateAriaId(prefixAria + '-list');

    var state = {
      _open: open || defaultOpen,
      _valueList: [],
      _searchHalfCheckedKeys: [],
      _missValueList: [], // Contains the value not in the tree
      _selectorValueList: [], // Used for multiple selector
      _valueEntities: {},
      _posEntities: new Map(),
      _keyEntities: new Map(),
      _searchValue: '',
      _prevProps: {},
      _init: true,
      _focused: undefined,
      _treeNodes: undefined,
      _filteredTreeNodes: undefined
    };
    var newState = this.getDerivedStateFromProps(this.$props, state);
    return extends_default()({}, state, newState);
  },
  provide: function provide() {
    return {
      vcTreeSelect: {
        onSelectorFocus: this.onSelectorFocus,
        onSelectorBlur: this.onSelectorBlur,
        onSelectorKeyDown: this.onComponentKeyDown,
        onSelectorClear: this.onSelectorClear,
        onMultipleSelectorRemove: this.onMultipleSelectorRemove,

        onTreeNodeSelect: this.onTreeNodeSelect,
        onTreeNodeCheck: this.onTreeNodeCheck,
        onPopupKeyDown: this.onComponentKeyDown,

        onSearchInputChange: this.onSearchInputChange,
        onSearchInputKeyDown: this.onSearchInputKeyDown
      }
    };
  },

  watch: extends_default()({}, getWatch(['treeData', 'defaultValue', 'value']), {
    __propsSymbol__: function __propsSymbol__() {
      var state = this.getDerivedStateFromProps(this.$props, this.$data);
      this.setState(state);
      this.needSyncKeys = {};
    },

    '$data._valueList': function $data_valueList() {
      var _this = this;

      this.$nextTick(function () {
        _this.forcePopupAlign();
      });
    }
  }),
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      var _$props2 = _this2.$props,
          autoFocus = _$props2.autoFocus,
          disabled = _$props2.disabled;

      if (autoFocus && !disabled) {
        _this2.focus();
      }
    });
  },


  methods: {
    getDerivedStateFromProps: function getDerivedStateFromProps(nextProps, prevState) {
      var h = this.$createElement;
      var _prevState$_prevProps = prevState._prevProps,
          prevProps = _prevState$_prevProps === undefined ? {} : _prevState$_prevProps;
      var treeCheckable = nextProps.treeCheckable,
          treeCheckStrictly = nextProps.treeCheckStrictly,
          filterTreeNode = nextProps.filterTreeNode,
          treeNodeFilterProp = nextProps.treeNodeFilterProp,
          treeDataSimpleMode = nextProps.treeDataSimpleMode;

      var newState = {
        _prevProps: extends_default()({}, nextProps),
        _init: false
      };
      var self = this;
      // Process the state when props updated
      function processState(propName, updater) {
        if (prevProps[propName] !== nextProps[propName] || self.needSyncKeys[propName]) {
          updater(nextProps[propName], prevProps[propName]);
          return true;
        }
        return false;
      }

      var valueRefresh = false;

      // Open
      processState('open', function (propValue) {
        newState._open = propValue;
      });

      // Tree Nodes
      var treeNodes = void 0;
      var treeDataChanged = false;
      var treeDataModeChanged = false;
      processState('treeData', function (propValue) {
        treeNodes = convertDataToTree(h, propValue);
        treeDataChanged = true;
      });

      processState('treeDataSimpleMode', function (propValue, prevValue) {
        if (!propValue) return;

        var prev = !prevValue || prevValue === true ? {} : prevValue;

        // Shallow equal to avoid dynamic prop object
        if (!shallowequal_default()(propValue, prev)) {
          treeDataModeChanged = true;
        }
      });

      // Parse by `treeDataSimpleMode`
      if (treeDataSimpleMode && (treeDataChanged || treeDataModeChanged)) {
        var simpleMapper = extends_default()({
          id: 'id',
          pId: 'pId',
          rootPId: null
        }, treeDataSimpleMode !== true ? treeDataSimpleMode : {});
        treeNodes = convertDataToTree(h, parseSimpleTreeData(nextProps.treeData, simpleMapper));
      }

      // If `treeData` not provide, use children TreeNodes
      if (!nextProps.treeData) {
        // processState('children', (propValue) => {
        //   treeNodes = Array.isArray(propValue) ? propValue : [propValue]
        // })
        treeNodes = Object(props_util["c" /* filterEmpty */])(this.$slots['default']);
      }

      // Convert `treeData` to entities
      if (treeNodes) {
        var entitiesMap = convertTreeToEntities(treeNodes);
        newState._treeNodes = treeNodes;
        newState._posEntities = entitiesMap.posEntities;
        newState._valueEntities = entitiesMap.valueEntities;
        newState._keyEntities = entitiesMap.keyEntities;

        valueRefresh = true;
      }

      // Value List
      if (prevState._init) {
        processState('defaultValue', function (propValue) {
          newState._valueList = formatInternalValue(propValue, nextProps);
          valueRefresh = true;
        });
      }

      processState('value', function (propValue) {
        newState._valueList = formatInternalValue(propValue, nextProps);
        valueRefresh = true;
      });

      // Selector Value List
      if (valueRefresh) {
        // Find out that value not exist in the tree
        var missValueList = [];
        var filteredValueList = [];
        var keyList = [];

        // Get latest value list
        var latestValueList = newState._valueList;
        if (!latestValueList) {
          // Also need add prev missValueList to avoid new treeNodes contains the value
          latestValueList = [].concat(toConsumableArray_default()(prevState._valueList), toConsumableArray_default()(prevState._missValueList));
        }

        // Get key by value
        latestValueList.forEach(function (wrapperValue) {
          var value = wrapperValue.value;

          var entity = (newState._valueEntities || prevState._valueEntities)[value];

          if (entity) {
            keyList.push(entity.key);
            filteredValueList.push(wrapperValue);
            return;
          }

          // If not match, it may caused by ajax load. We need keep this
          missValueList.push(wrapperValue);
        });

        // We need calculate the value when tree is checked tree
        if (treeCheckable && !treeCheckStrictly) {
          // Calculate the keys need to be checked
          var _conductCheck = conductCheck(keyList, true, newState._keyEntities || prevState._keyEntities),
              checkedKeys = _conductCheck.checkedKeys;

          // Format value list again for internal usage


          newState._valueList = checkedKeys.map(function (key) {
            return {
              value: (newState._keyEntities || prevState._keyEntities).get(key).value
            };
          });
        } else {
          newState._valueList = filteredValueList;
        }

        // Fill the missValueList, we still need display in the selector
        newState._missValueList = missValueList;

        // Calculate the value list for `Selector` usage
        newState._selectorValueList = formatSelectorValue(newState._valueList, nextProps, newState._valueEntities || prevState._valueEntities);
      }

      // [Legacy] To align with `Select` component,
      // We use `searchValue` instead of `inputValue` but still keep the api
      // `inputValue` support `null` to work as `autoClearSearchValue`
      processState('inputValue', function (propValue) {
        if (propValue !== null) {
          newState._searchValue = propValue;
        }
      });

      // Search value
      processState('searchValue', function (propValue) {
        newState._searchValue = propValue;
      });

      // Do the search logic
      if (newState._searchValue !== undefined || prevState._searchValue && treeNodes) {
        var searchValue = newState._searchValue !== undefined ? newState._searchValue : prevState._searchValue;
        var upperSearchValue = String(searchValue).toUpperCase();

        var filterTreeNodeFn = filterTreeNode;
        if (filterTreeNode === false) {
          // Don't filter if is false
          filterTreeNodeFn = function filterTreeNodeFn() {
            return true;
          };
        } else if (typeof filterTreeNodeFn !== 'function') {
          // When is not function (true or undefined), use inner filter
          filterTreeNodeFn = function filterTreeNodeFn(_, node) {
            var nodeValue = String(Object(props_util["k" /* getPropsData */])(node)[treeNodeFilterProp]).toUpperCase();
            return nodeValue.indexOf(upperSearchValue) !== -1;
          };
        }

        newState._filteredTreeNodes = getFilterTree(this.$createElement, newState._treeNodes || prevState._treeNodes, searchValue, filterTreeNodeFn, newState._valueEntities || prevState._valueEntities);
      }

      // We should re-calculate the halfCheckedKeys when in search mode
      if (valueRefresh && treeCheckable && !treeCheckStrictly && (newState._searchValue || prevState._searchValue)) {
        newState._searchHalfCheckedKeys = getHalfCheckedKeys(newState._valueList, newState._valueEntities || prevState._valueEntities);
      }

      // Checked Strategy
      processState('showCheckedStrategy', function () {
        newState._selectorValueList = newState._selectorValueList || formatSelectorValue(newState._valueList || prevState._valueList, nextProps, newState._valueEntities || prevState._valueEntities);
      });

      return newState;
    },

    // ==================== Selector ====================
    onSelectorFocus: function onSelectorFocus() {
      this.setState({ _focused: true });
    },
    onSelectorBlur: function onSelectorBlur() {
      this.setState({ _focused: false });

      // TODO: Close when Popup is also not focused
      // this.setState({ open: false });
    },


    // Handle key board event in both Selector and Popup
    onComponentKeyDown: function onComponentKeyDown(event) {
      var open = this.$data._open;
      var keyCode = event.keyCode;


      if (!open) {
        if ([KeyCode["a" /* default */].ENTER, KeyCode["a" /* default */].DOWN].indexOf(keyCode) !== -1) {
          this.setOpenState(true);
        }
      } else if (KeyCode["a" /* default */].ESC === keyCode) {
        this.setOpenState(false);
      } else if ([KeyCode["a" /* default */].UP, KeyCode["a" /* default */].DOWN, KeyCode["a" /* default */].LEFT, KeyCode["a" /* default */].RIGHT].indexOf(keyCode) !== -1) {
        // TODO: Handle `open` state
        event.stopPropagation();
      }
    },
    onDeselect: function onDeselect(wrappedValue, node, nodeEventInfo) {
      this.__emit('deselect', wrappedValue, node, nodeEventInfo);
    },
    onSelectorClear: function onSelectorClear(event) {
      var disabled = this.$props.disabled;

      if (disabled) return;

      this.triggerChange([], []);

      if (!this.isSearchValueControlled()) {
        this.setUncontrolledState({
          _searchValue: '',
          _filteredTreeNodes: null
        });
      }

      event.stopPropagation();
    },
    onMultipleSelectorRemove: function onMultipleSelectorRemove(event, removeValue) {
      event.stopPropagation();

      var _$data = this.$data,
          valueList = _$data._valueList,
          missValueList = _$data._missValueList,
          valueEntities = _$data._valueEntities;
      var _$props3 = this.$props,
          treeCheckable = _$props3.treeCheckable,
          treeCheckStrictly = _$props3.treeCheckStrictly,
          treeNodeLabelProp = _$props3.treeNodeLabelProp,
          disabled = _$props3.disabled;

      if (disabled) return;

      // Find trigger entity
      var triggerEntity = valueEntities[removeValue];

      // Clean up value
      var newValueList = valueList;
      if (triggerEntity) {
        // If value is in tree
        if (treeCheckable && !treeCheckStrictly) {
          newValueList = valueList.filter(function (_ref) {
            var value = _ref.value;

            var entity = valueEntities[value];
            return !isPosRelated(entity.pos, triggerEntity.pos);
          });
        } else {
          newValueList = valueList.filter(function (_ref2) {
            var value = _ref2.value;
            return value !== removeValue;
          });
        }
      }

      var triggerNode = triggerEntity ? triggerEntity.node : null;

      var extraInfo = {
        triggerValue: removeValue,
        triggerNode: triggerNode
      };
      var deselectInfo = {
        node: triggerNode
      };

      // [Legacy] Little hack on this to make same action as `onCheck` event.
      if (treeCheckable) {
        var filteredEntityList = newValueList.map(function (_ref3) {
          var value = _ref3.value;
          return valueEntities[value];
        });

        deselectInfo.event = 'check';
        deselectInfo.checked = false;
        deselectInfo.checkedNodes = filteredEntityList.map(function (_ref4) {
          var node = _ref4.node;
          return node;
        });
        deselectInfo.checkedNodesPositions = filteredEntityList.map(function (_ref5) {
          var node = _ref5.node,
              pos = _ref5.pos;
          return {
            node: node,
            pos: pos
          };
        });

        if (treeCheckStrictly) {
          extraInfo.allCheckedNodes = deselectInfo.checkedNodes;
        } else {
          // TODO: It's too expansive to get `halfCheckedKeys` in onDeselect. Not pass this.
          extraInfo.allCheckedNodes = flatToHierarchy(filteredEntityList).map(function (_ref6) {
            var node = _ref6.node;
            return node;
          });
        }
      } else {
        deselectInfo.event = 'select';
        deselectInfo.selected = false;
        deselectInfo.selectedNodes = newValueList.map(function (_ref7) {
          var value = _ref7.value;
          return (valueEntities[value] || {}).node;
        });
      }

      // Some value user pass prop is not in the tree, we also need clean it
      var newMissValueList = missValueList.filter(function (_ref8) {
        var value = _ref8.value;
        return value !== removeValue;
      });
      var wrappedValue = void 0;
      if (this.isLabelInValue()) {
        wrappedValue = {
          label: triggerNode ? Object(props_util["k" /* getPropsData */])(triggerNode)[treeNodeLabelProp] : null,
          value: removeValue
        };
      } else {
        wrappedValue = removeValue;
      }

      this.onDeselect(wrappedValue, triggerNode, deselectInfo);

      this.triggerChange(newMissValueList, newValueList, extraInfo);
    },


    // ===================== Popup ======================
    onValueTrigger: function onValueTrigger(isAdd, nodeList, nodeEventInfo, nodeExtraInfo) {
      var node = nodeEventInfo.node;
      var value = node.$props.value;
      var _$data2 = this.$data,
          missValueList = _$data2._missValueList,
          valueEntities = _$data2._valueEntities,
          keyEntities = _$data2._keyEntities,
          searchValue = _$data2._searchValue;
      var _$props4 = this.$props,
          disabled = _$props4.disabled,
          inputValue = _$props4.inputValue,
          treeNodeLabelProp = _$props4.treeNodeLabelProp,
          multiple = _$props4.multiple,
          treeCheckable = _$props4.treeCheckable,
          treeCheckStrictly = _$props4.treeCheckStrictly,
          autoClearSearchValue = _$props4.autoClearSearchValue;

      var label = node.$props[treeNodeLabelProp];

      if (disabled) return;

      // Wrap the return value for user
      var wrappedValue = void 0;
      if (this.isLabelInValue()) {
        wrappedValue = {
          value: value,
          label: label
        };
      } else {
        wrappedValue = value;
      }

      // [Legacy] Origin code not trigger `onDeselect` every time. Let's align the behaviour.
      if (isAdd) {
        this.__emit('select', wrappedValue, node, nodeEventInfo);
      } else {
        this.__emit('deselect', wrappedValue, node, nodeEventInfo);
      }

      // Get wrapped value list.
      // This is a bit hack cause we use key to match the value.
      var newValueList = nodeList.map(function (node) {
        var props = Object(props_util["k" /* getPropsData */])(node);
        return {
          value: props.value,
          label: props[treeNodeLabelProp]
        };
      });

      // When is `treeCheckable` and with `searchValue`, `valueList` is not full filled.
      // We need calculate the missing nodes.
      if (treeCheckable && !treeCheckStrictly) {
        var keyList = newValueList.map(function (_ref9) {
          var val = _ref9.value;
          return valueEntities[val].key;
        });
        if (isAdd) {
          keyList = conductCheck(keyList, true, keyEntities).checkedKeys;
        } else {
          keyList = conductCheck([valueEntities[value].key], false, keyEntities, {
            checkedKeys: keyList
          }).checkedKeys;
        }
        newValueList = keyList.map(function (key) {
          var props = Object(props_util["k" /* getPropsData */])(keyEntities.get(key).node);
          return {
            value: props.value,
            label: props[treeNodeLabelProp]
          };
        });
      }

      // Clean up `searchValue` when this prop is set
      if (autoClearSearchValue || inputValue === null) {
        // Clean state `searchValue` if uncontrolled
        if (!this.isSearchValueControlled() && (multiple || treeCheckable)) {
          this.setUncontrolledState({
            _searchValue: '',
            _filteredTreeNodes: null
          });
        }

        // Trigger onSearch if `searchValue` to be empty.
        // We should also trigger onSearch with empty string here
        // since if user use `treeExpandedKeys`, it need user have the ability to reset it.
        if (searchValue && searchValue.length) {
          this.__emit('update:searchValue', '');
          this.__emit('search', '');
        }
      }

      // [Legacy] Provide extra info
      var extraInfo = extends_default()({}, nodeExtraInfo, {
        triggerValue: value,
        triggerNode: node
      });

      this.triggerChange(missValueList, newValueList, extraInfo);
    },
    onTreeNodeSelect: function onTreeNodeSelect(_, nodeEventInfo) {
      var _$data3 = this.$data,
          valueList = _$data3._valueList,
          valueEntities = _$data3._valueEntities;
      var _$props5 = this.$props,
          treeCheckable = _$props5.treeCheckable,
          multiple = _$props5.multiple;

      if (treeCheckable) return;

      if (!multiple) {
        this.setOpenState(false);
      }

      var isAdd = nodeEventInfo.selected;
      var selectedValue = nodeEventInfo.node.$props.value;


      var newValueList = void 0;

      if (!multiple) {
        newValueList = [{ value: selectedValue }];
      } else {
        newValueList = valueList.filter(function (_ref10) {
          var value = _ref10.value;
          return value !== selectedValue;
        });
        if (isAdd) {
          newValueList.push({ value: selectedValue });
        }
      }

      var selectedNodes = newValueList.map(function (_ref11) {
        var value = _ref11.value;
        return valueEntities[value];
      }).filter(function (entity) {
        return entity;
      }).map(function (_ref12) {
        var node = _ref12.node;
        return node;
      });

      this.onValueTrigger(isAdd, selectedNodes, nodeEventInfo, { selected: isAdd });
    },
    onTreeNodeCheck: function onTreeNodeCheck(_, nodeEventInfo) {
      var _$data4 = this.$data,
          searchValue = _$data4._searchValue,
          keyEntities = _$data4._keyEntities,
          valueEntities = _$data4._valueEntities,
          valueList = _$data4._valueList;
      var treeCheckStrictly = this.$props.treeCheckStrictly;
      var checkedNodes = nodeEventInfo.checkedNodes,
          checkedNodesPositions = nodeEventInfo.checkedNodesPositions;

      var isAdd = nodeEventInfo.checked;

      var extraInfo = {
        checked: isAdd
      };

      var checkedNodeList = checkedNodes;

      // [Legacy] Check event provide `allCheckedNodes`.
      // When `treeCheckStrictly` or internal `searchValue` is set, TreeNode will be unrelated:
      // - Related: Show the top checked nodes and has children prop.
      // - Unrelated: Show all the checked nodes.
      if (searchValue) {
        var oriKeyList = valueList.map(function (_ref13) {
          var value = _ref13.value;
          return valueEntities[value];
        }).filter(function (entity) {
          return entity;
        }).map(function (_ref14) {
          var key = _ref14.key;
          return key;
        });

        var keyList = void 0;
        if (isAdd) {
          keyList = Array.from(new Set([].concat(toConsumableArray_default()(oriKeyList), toConsumableArray_default()(checkedNodeList.map(function (node) {
            var _getPropsData = Object(props_util["k" /* getPropsData */])(node),
                value = _getPropsData.value;

            return valueEntities[value].key;
          })))));
        } else {
          keyList = conductCheck([Object(props_util["k" /* getPropsData */])(nodeEventInfo.node).eventKey], false, keyEntities, {
            checkedKeys: oriKeyList
          }).checkedKeys;
        }

        checkedNodeList = keyList.map(function (key) {
          return keyEntities.get(key).node;
        });

        // Let's follow as not `treeCheckStrictly` format
        extraInfo.allCheckedNodes = keyList.map(function (key) {
          return cleanEntity(keyEntities.get(key));
        });
      } else if (treeCheckStrictly) {
        extraInfo.allCheckedNodes = nodeEventInfo.checkedNodes;
      } else {
        extraInfo.allCheckedNodes = flatToHierarchy(checkedNodesPositions);
      }

      this.onValueTrigger(isAdd, checkedNodeList, nodeEventInfo, extraInfo);
    },


    // ==================== Trigger =====================

    onDropdownVisibleChange: function onDropdownVisibleChange(open) {
      var _$props6 = this.$props,
          multiple = _$props6.multiple,
          treeCheckable = _$props6.treeCheckable;
      var _searchValue = this._searchValue;

      // When set open success and single mode,
      // we will reset the input content.

      if (open && !multiple && !treeCheckable && _searchValue) {
        this.setUncontrolledState({
          _searchValue: '',
          _filteredTreeNodes: null
        });
      }
      this.setOpenState(open, true);
    },
    onSearchInputChange: function onSearchInputChange(event) {
      var value = event.target.value;
      var _$data5 = this.$data,
          treeNodes = _$data5._treeNodes,
          valueEntities = _$data5._valueEntities;
      var _$props7 = this.$props,
          filterTreeNode = _$props7.filterTreeNode,
          treeNodeFilterProp = _$props7.treeNodeFilterProp;

      this.__emit('update:searchValue', value);
      this.__emit('search', value);

      var isSet = false;

      if (!this.isSearchValueControlled()) {
        isSet = this.setUncontrolledState({
          _searchValue: value
        });
        this.setOpenState(true);
      }

      if (isSet) {
        // Do the search logic
        var upperSearchValue = String(value).toUpperCase();

        var filterTreeNodeFn = filterTreeNode;
        if (filterTreeNode === false) {
          filterTreeNodeFn = function filterTreeNodeFn() {
            return true;
          };
        } else if (!filterTreeNodeFn) {
          filterTreeNodeFn = function filterTreeNodeFn(_, node) {
            var nodeValue = String(Object(props_util["k" /* getPropsData */])(node)[treeNodeFilterProp]).toUpperCase();
            return nodeValue.indexOf(upperSearchValue) !== -1;
          };
        }

        this.setState({
          _filteredTreeNodes: getFilterTree(this.$createElement, treeNodes, value, filterTreeNodeFn, valueEntities)
        });
      }
    },
    onSearchInputKeyDown: function onSearchInputKeyDown(event) {
      var _$data6 = this.$data,
          searchValue = _$data6._searchValue,
          valueList = _$data6._valueList;
      var keyCode = event.keyCode;


      if (KeyCode["a" /* default */].BACKSPACE === keyCode && this.isMultiple() && !searchValue && valueList.length) {
        var lastValue = valueList[valueList.length - 1].value;
        this.onMultipleSelectorRemove(event, lastValue);
      }
    },
    onChoiceAnimationLeave: function onChoiceAnimationLeave() {
      this.forcePopupAlign();
    },


    /**
     * Only update the value which is not in props
     */
    setUncontrolledState: function setUncontrolledState(state) {
      var needSync = false;
      var newState = {};
      var props = Object(props_util["j" /* getOptionProps */])(this);
      Object.keys(state).forEach(function (name) {
        if (name.slice(1) in props) return;

        needSync = true;
        newState[name] = state[name];
      });

      if (needSync) {
        this.setState(newState);
      }

      return needSync;
    },


    // [Legacy] Origin provide `documentClickClose` which triggered by `Trigger`
    // Currently `TreeSelect` align the hide popup logic as `Select` which blur to hide.
    // `documentClickClose` is not accurate anymore. Let's just keep the key word.
    setOpenState: function setOpenState(open) {
      var byTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dropdownVisibleChange = this.$props.dropdownVisibleChange;


      if (dropdownVisibleChange && dropdownVisibleChange(open, { documentClickClose: !open && byTrigger }) === false) {
        return;
      }

      this.setUncontrolledState({ _open: open });
    },


    // Tree checkable is also a multiple case
    isMultiple: function isMultiple() {
      var _$props8 = this.$props,
          multiple = _$props8.multiple,
          treeCheckable = _$props8.treeCheckable;

      return !!(multiple || treeCheckable);
    },
    isLabelInValue: function isLabelInValue() {
      return util_isLabelInValue(this.$props);
    },


    // [Legacy] To align with `Select` component,
    // We use `searchValue` instead of `inputValue`
    // but currently still need support that.
    // Add this method the check if is controlled
    isSearchValueControlled: function isSearchValueControlled() {
      var props = Object(props_util["j" /* getOptionProps */])(this);
      var inputValue = props.inputValue;

      if ('searchValue' in props) return true;
      return 'inputValue' in props && inputValue !== null;
    },
    forcePopupAlign: function forcePopupAlign() {
      var $trigger = this.selectTriggerRef.current;
      if ($trigger) {
        $trigger.forcePopupAlign();
      }
    },
    delayForcePopupAlign: function delayForcePopupAlign() {
      var _this3 = this;

      // Wait 2 frame to avoid dom update & dom algin in the same time
      // https://github.com/ant-design/ant-design/issues/12031
      raf_default()(function () {
        raf_default()(_this3.forcePopupAlign);
      });
    },


    /**
     * 1. Update state valueList.
     * 2. Fire `onChange` event to user.
     */
    triggerChange: function triggerChange(missValueList, valueList) {
      var extraInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _$data7 = this.$data,
          valueEntities = _$data7._valueEntities,
          searchValue = _$data7._searchValue,
          prevSelectorValueList = _$data7._selectorValueList;

      var props = Object(props_util["j" /* getOptionProps */])(this);
      var disabled = props.disabled,
          treeCheckable = props.treeCheckable,
          treeCheckStrictly = props.treeCheckStrictly;

      if (disabled) return;

      // Trigger
      var extra = extends_default()({
        // [Legacy] Always return as array contains label & value
        preValue: prevSelectorValueList.map(function (_ref15) {
          var label = _ref15.label,
              value = _ref15.value;
          return { label: label, value: value };
        })
      }, extraInfo);

      // Format value by `treeCheckStrictly`
      var selectorValueList = formatSelectorValue(valueList, props, valueEntities);

      if (!('value' in props)) {
        var newState = {
          _missValueList: missValueList,
          _valueList: valueList,
          _selectorValueList: selectorValueList
        };

        if (searchValue && treeCheckable && !treeCheckStrictly) {
          newState._searchHalfCheckedKeys = getHalfCheckedKeys(valueList, valueEntities);
        }

        this.setState(newState);
      }

      // Only do the logic when `onChange` function provided
      if (this.$listeners.change) {
        var connectValueList = void 0;

        // Get value by mode
        if (this.isMultiple()) {
          connectValueList = [].concat(toConsumableArray_default()(missValueList), toConsumableArray_default()(selectorValueList));
        } else {
          connectValueList = selectorValueList.slice(0, 1);
        }

        var labelList = null;
        var returnValue = void 0;

        if (this.isLabelInValue()) {
          returnValue = connectValueList.map(function (_ref16) {
            var label = _ref16.label,
                value = _ref16.value;
            return { label: label, value: value };
          });
        } else {
          labelList = [];
          returnValue = connectValueList.map(function (_ref17) {
            var label = _ref17.label,
                value = _ref17.value;

            labelList.push(label);
            return value;
          });
        }

        if (!this.isMultiple()) {
          returnValue = returnValue[0];
        }
        this.__emit('change', returnValue, labelList, extra);
      }
    },
    focus: function focus() {
      this.selectorRef.current.focus();
    },
    blur: function blur() {
      this.selectorRef.current.blur();
    }
  },

  // ===================== Render =====================

  render: function render() {
    var h = arguments[0];
    var _$data8 = this.$data,
        valueList = _$data8._valueList,
        missValueList = _$data8._missValueList,
        selectorValueList = _$data8._selectorValueList,
        searchHalfCheckedKeys = _$data8._searchHalfCheckedKeys,
        valueEntities = _$data8._valueEntities,
        keyEntities = _$data8._keyEntities,
        searchValue = _$data8._searchValue,
        open = _$data8._open,
        focused = _$data8._focused,
        treeNodes = _$data8._treeNodes,
        filteredTreeNodes = _$data8._filteredTreeNodes;

    var props = Object(props_util["j" /* getOptionProps */])(this);
    var prefixCls = props.prefixCls,
        treeExpandedKeys = props.treeExpandedKeys;

    var isMultiple = this.isMultiple();

    var passProps = {
      props: extends_default()({}, props, {
        isMultiple: isMultiple,
        valueList: valueList,
        searchHalfCheckedKeys: searchHalfCheckedKeys,
        selectorValueList: [].concat(toConsumableArray_default()(missValueList), toConsumableArray_default()(selectorValueList)),
        valueEntities: valueEntities,
        keyEntities: keyEntities,
        searchValue: searchValue,
        upperSearchValue: (searchValue || '').toUpperCase(), // Perf save
        open: open,
        focused: focused,
        dropdownPrefixCls: prefixCls + '-dropdown',
        ariaId: this.ariaId
      }),
      on: extends_default()({}, this.$listeners, {
        choiceAnimationLeave: this.onChoiceAnimationLeave
      }),
      scopedSlots: this.$scopedSlots
    };
    var popupProps = Object(props_util["u" /* mergeProps */])(passProps, {
      props: {
        treeNodes: treeNodes,
        filteredTreeNodes: filteredTreeNodes,
        // Tree expanded control
        treeExpandedKeys: treeExpandedKeys,
        __propsSymbol__: Symbol()
      },
      on: {
        treeExpanded: this.delayForcePopupAlign
      }
    });

    var Popup = isMultiple ? MultiplePopup : Popup_SinglePopup;
    var $popup = h(Popup, popupProps);

    var Selector = isMultiple ? Selector_MultipleSelector : Selector_SingleSelector;
    var $selector = h(Selector, babel_helper_vue_jsx_merge_props_default()([passProps, {
      directives: [{
        name: 'ant-ref',
        value: this.selectorRef
      }]
    }]));
    var selectTriggerProps = Object(props_util["u" /* mergeProps */])(passProps, {
      props: {
        popupElement: $popup,
        dropdownVisibleChange: this.onDropdownVisibleChange
      },
      directives: [{
        name: 'ant-ref',
        value: this.selectTriggerRef
      }]
    });
    return h(
      src_SelectTrigger,
      selectTriggerProps,
      [$selector]
    );
  }
};

Select.TreeNode = SelectNode;
Select.SHOW_ALL = strategies["a" /* SHOW_ALL */];
Select.SHOW_PARENT = strategies["c" /* SHOW_PARENT */];
Select.SHOW_CHILD = strategies["b" /* SHOW_CHILD */];

// Let warning show correct component name
Select.name = 'TreeSelect';

/* harmony default export */ var src_Select = (Select);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tree-select/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeNode; });
/* unused concated harmony import SHOW_ALL */
/* unused concated harmony import SHOW_CHILD */
/* unused concated harmony import SHOW_PARENT */




var TreeNode = SelectNode;

/* harmony default export */ var src = __webpack_exports__["b"] = (src_Select);

/***/ }),

/***/ "7d1c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// based on rc-tree 1.14.10


module.exports = __webpack_require__("1d31");

/***/ }),

/***/ "86a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHOW_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SHOW_PARENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SHOW_CHILD; });
var SHOW_ALL = 'SHOW_ALL';
var SHOW_PARENT = 'SHOW_PARENT';
var SHOW_CHILD = 'SHOW_CHILD';

/***/ }),

/***/ "9a16":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/Header.js







var Header = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    format: vue_types["a" /* default */].string,
    prefixCls: vue_types["a" /* default */].string,
    disabledDate: vue_types["a" /* default */].func,
    placeholder: vue_types["a" /* default */].string,
    clearText: vue_types["a" /* default */].string,
    value: vue_types["a" /* default */].object,
    inputReadOnly: vue_types["a" /* default */].bool.def(false),
    hourOptions: vue_types["a" /* default */].array,
    minuteOptions: vue_types["a" /* default */].array,
    secondOptions: vue_types["a" /* default */].array,
    disabledHours: vue_types["a" /* default */].func,
    disabledMinutes: vue_types["a" /* default */].func,
    disabledSeconds: vue_types["a" /* default */].func,
    // onChange: PropTypes.func,
    // onClear: PropTypes.func,
    // onEsc: PropTypes.func,
    allowEmpty: vue_types["a" /* default */].bool,
    defaultOpenValue: vue_types["a" /* default */].object,
    currentSelectPanel: vue_types["a" /* default */].string,
    focusOnOpen: vue_types["a" /* default */].bool,
    // onKeyDown: PropTypes.func,
    clearIcon: vue_types["a" /* default */].any
  },
  data: function data() {
    var value = this.value,
        format = this.format;

    return {
      str: value && value.format(format) || '',
      invalid: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.focusOnOpen) {
      // Wait one frame for the panel to be positioned before focusing
      var requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(function () {
        _this.$refs.input.focus();
        _this.$refs.input.select();
      });
    }
  },

  watch: {
    $props: {
      handler: function handler(nextProps) {
        var value = nextProps.value,
            format = nextProps.format;

        this.setState({
          str: value && value.format(format) || '',
          invalid: false
        });
      },
      deep: true
    }
  },

  methods: {
    onInputChange: function onInputChange(e) {
      var _e$target = e.target,
          str = _e$target.value,
          composing = _e$target.composing;
      var _str = this.str,
          oldStr = _str === undefined ? '' : _str;

      if (composing || oldStr === str) return;

      this.setState({
        str: str
      });
      var format = this.format,
          hourOptions = this.hourOptions,
          minuteOptions = this.minuteOptions,
          secondOptions = this.secondOptions,
          disabledHours = this.disabledHours,
          disabledMinutes = this.disabledMinutes,
          disabledSeconds = this.disabledSeconds,
          allowEmpty = this.allowEmpty,
          originalValue = this.value;


      if (str) {
        var value = this.getProtoValue().clone();
        var parsed = moment_default()(str, format, true);
        if (!parsed.isValid()) {
          this.setState({
            invalid: true
          });
          return;
        }
        value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second());

        // if time value not allowed, response warning.
        if (hourOptions.indexOf(value.hour()) < 0 || minuteOptions.indexOf(value.minute()) < 0 || secondOptions.indexOf(value.second()) < 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        // if time value is disabled, response warning.
        var disabledHourOptions = disabledHours();
        var disabledMinuteOptions = disabledMinutes(value.hour());
        var disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
        if (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0) {
          this.setState({
            invalid: true
          });
          return;
        }

        if (originalValue) {
          if (originalValue.hour() !== value.hour() || originalValue.minute() !== value.minute() || originalValue.second() !== value.second()) {
            // keep other fields for rc-calendar
            var changedValue = originalValue.clone();
            changedValue.hour(value.hour());
            changedValue.minute(value.minute());
            changedValue.second(value.second());
            this.__emit('change', changedValue);
          }
        } else if (originalValue !== value) {
          this.__emit('change', value);
        }
      } else if (allowEmpty) {
        this.__emit('change', null);
      } else {
        this.setState({
          invalid: true
        });
        return;
      }

      this.setState({
        invalid: false
      });
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 27) {
        this.__emit('esc');
      }
      this.__emit('keydown', e);
    },
    getProtoValue: function getProtoValue() {
      return this.value || this.defaultOpenValue;
    },
    getInput: function getInput() {
      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          placeholder = this.placeholder,
          inputReadOnly = this.inputReadOnly,
          invalid = this.invalid,
          str = this.str;

      var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
      return h('input', babel_helper_vue_jsx_merge_props_default()([{
        'class': prefixCls + '-input ' + invalidClass,
        ref: 'input',
        on: {
          'keydown': this.onKeyDown,
          'input': this.onInputChange
        },
        domProps: {
          'value': str
        },
        attrs: {
          placeholder: placeholder,

          readOnly: !!inputReadOnly
        }
      }, {
        directives: [{
          name: 'ant-input'
        }]
      }]));
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls;

    return h(
      'div',
      { 'class': prefixCls + '-input-wrap' },
      [this.getInput()]
    );
  }
};

/* harmony default export */ var vc_time_picker_Header = (Header);
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/Select.js




function noop() {}
var scrollTo = function scrollTo(element, to, duration) {
  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10);
  };
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  requestAnimationFrame(function () {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

var Select = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    prefixCls: vue_types["a" /* default */].string,
    options: vue_types["a" /* default */].array,
    selectedIndex: vue_types["a" /* default */].number,
    type: vue_types["a" /* default */].string
    // onSelect: PropTypes.func,
    // onMouseEnter: PropTypes.func,
  },
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      // jump to selected option
      _this.scrollToSelected(0);
    });
  },

  watch: {
    selectedIndex: function selectedIndex() {
      var _this2 = this;

      this.$nextTick(function () {
        // smooth scroll to selected option
        _this2.scrollToSelected(120);
      });
    }
  },
  methods: {
    onSelect: function onSelect(value) {
      var type = this.type;

      this.__emit('select', type, value);
    },
    getOptions: function getOptions() {
      var _this3 = this;

      var h = this.$createElement;
      var options = this.options,
          selectedIndex = this.selectedIndex,
          prefixCls = this.prefixCls;

      return options.map(function (item, index) {
        var _classnames;

        var cls = classnames_default()((_classnames = {}, defineProperty_default()(_classnames, prefixCls + '-select-option-selected', selectedIndex === index), defineProperty_default()(_classnames, prefixCls + '-select-option-disabled', item.disabled), _classnames));
        var onClick = item.disabled ? noop : function () {
          _this3.onSelect(item.value);
        };
        return h(
          'li',
          {
            attrs: { role: 'button', disabled: item.disabled },
            on: {
              'click': onClick
            },
            'class': cls, key: index },
          [item.value]
        );
      });
    },
    handleMouseEnter: function handleMouseEnter(e) {
      this.setState({ active: true });
      this.__emit('mouseenter', e);
    },
    handleMouseLeave: function handleMouseLeave() {
      this.setState({ active: false });
    },
    scrollToSelected: function scrollToSelected(duration) {
      // move to selected item
      var select = this.$el;
      var list = this.$refs.list;
      if (!list) {
        return;
      }
      var index = this.selectedIndex;
      if (index < 0) {
        index = 0;
      }
      var topOption = list.children[index];
      var to = topOption.offsetTop;
      scrollTo(select, to, duration);
    }
  },

  render: function render() {
    var _cls;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        options = this.options,
        active = this.active;

    if (options.length === 0) {
      return null;
    }

    var cls = (_cls = {}, defineProperty_default()(_cls, prefixCls + '-select', 1), defineProperty_default()(_cls, prefixCls + '-select-active', active), _cls);

    return h(
      'div',
      { 'class': cls, on: {
          'mouseenter': this.handleMouseEnter,
          'mouseleave': this.handleMouseLeave
        }
      },
      [h(
        'ul',
        { ref: 'list' },
        [this.getOptions()]
      )]
    );
  }
};

/* harmony default export */ var vc_time_picker_Select = (Select);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/Combobox.js




var formatOption = function formatOption(option, disabledOptions) {
  var value = '' + option;
  if (option < 10) {
    value = '0' + option;
  }

  var disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: value,
    disabled: disabled
  };
};

var Combobox = {
  mixins: [BaseMixin["a" /* default */]],
  name: 'Combobox',
  props: {
    format: vue_types["a" /* default */].string,
    defaultOpenValue: vue_types["a" /* default */].object,
    prefixCls: vue_types["a" /* default */].string,
    value: vue_types["a" /* default */].object,
    // onChange: PropTypes.func,
    // onAmPmChange: PropTypes.func,
    showHour: vue_types["a" /* default */].bool,
    showMinute: vue_types["a" /* default */].bool,
    showSecond: vue_types["a" /* default */].bool,
    hourOptions: vue_types["a" /* default */].array,
    minuteOptions: vue_types["a" /* default */].array,
    secondOptions: vue_types["a" /* default */].array,
    disabledHours: vue_types["a" /* default */].func,
    disabledMinutes: vue_types["a" /* default */].func,
    disabledSeconds: vue_types["a" /* default */].func,
    // onCurrentSelectPanelChange: PropTypes.func,
    use12Hours: vue_types["a" /* default */].bool,
    isAM: vue_types["a" /* default */].bool
  },
  methods: {
    onItemChange: function onItemChange(type, itemValue) {
      var defaultOpenValue = this.defaultOpenValue,
          use12Hours = this.use12Hours,
          propValue = this.value,
          isAM = this.isAM;

      var value = (propValue || defaultOpenValue).clone();

      if (type === 'hour') {
        if (use12Hours) {
          if (isAM) {
            value.hour(+itemValue % 12);
          } else {
            value.hour(+itemValue % 12 + 12);
          }
        } else {
          value.hour(+itemValue);
        }
      } else if (type === 'minute') {
        value.minute(+itemValue);
      } else if (type === 'ampm') {
        var ampm = itemValue.toUpperCase();
        if (use12Hours) {
          if (ampm === 'PM' && value.hour() < 12) {
            value.hour(value.hour() % 12 + 12);
          }

          if (ampm === 'AM') {
            if (value.hour() >= 12) {
              value.hour(value.hour() - 12);
            }
          }
        }
        this.__emit('amPmChange', ampm);
      } else {
        value.second(+itemValue);
      }
      this.__emit('change', value);
    },
    onEnterSelectPanel: function onEnterSelectPanel(range) {
      this.__emit('currentSelectPanelChange', range);
    },
    getHourSelect: function getHourSelect(hour) {
      var _this = this;

      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          hourOptions = this.hourOptions,
          disabledHours = this.disabledHours,
          showHour = this.showHour,
          use12Hours = this.use12Hours;

      if (!showHour) {
        return null;
      }
      var disabledOptions = disabledHours();
      var hourOptionsAdj = void 0;
      var hourAdj = void 0;
      if (use12Hours) {
        hourOptionsAdj = [12].concat(hourOptions.filter(function (h) {
          return h < 12 && h > 0;
        }));
        hourAdj = hour % 12 || 12;
      } else {
        hourOptionsAdj = hourOptions;
        hourAdj = hour;
      }

      return h(vc_time_picker_Select, {
        attrs: {
          prefixCls: prefixCls,
          options: hourOptionsAdj.map(function (option) {
            return formatOption(option, disabledOptions);
          }),
          selectedIndex: hourOptionsAdj.indexOf(hourAdj),
          type: 'hour'
        },
        on: {
          'select': this.onItemChange,
          'mouseenter': function mouseenter() {
            return _this.onEnterSelectPanel('hour');
          }
        }
      });
    },
    getMinuteSelect: function getMinuteSelect(minute) {
      var _this2 = this;

      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          minuteOptions = this.minuteOptions,
          disabledMinutes = this.disabledMinutes,
          defaultOpenValue = this.defaultOpenValue,
          showMinute = this.showMinute,
          propValue = this.value;

      if (!showMinute) {
        return null;
      }
      var value = propValue || defaultOpenValue;
      var disabledOptions = disabledMinutes(value.hour());

      return h(vc_time_picker_Select, {
        attrs: {
          prefixCls: prefixCls,
          options: minuteOptions.map(function (option) {
            return formatOption(option, disabledOptions);
          }),
          selectedIndex: minuteOptions.indexOf(minute),
          type: 'minute'
        },
        on: {
          'select': this.onItemChange,
          'mouseenter': function mouseenter() {
            return _this2.onEnterSelectPanel('minute');
          }
        }
      });
    },
    getSecondSelect: function getSecondSelect(second) {
      var _this3 = this;

      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          secondOptions = this.secondOptions,
          disabledSeconds = this.disabledSeconds,
          showSecond = this.showSecond,
          defaultOpenValue = this.defaultOpenValue,
          propValue = this.value;

      if (!showSecond) {
        return null;
      }
      var value = propValue || defaultOpenValue;
      var disabledOptions = disabledSeconds(value.hour(), value.minute());

      return h(vc_time_picker_Select, {
        attrs: {
          prefixCls: prefixCls,
          options: secondOptions.map(function (option) {
            return formatOption(option, disabledOptions);
          }),
          selectedIndex: secondOptions.indexOf(second),
          type: 'second'
        },
        on: {
          'select': this.onItemChange,
          'mouseenter': function mouseenter() {
            return _this3.onEnterSelectPanel('second');
          }
        }
      });
    },
    getAMPMSelect: function getAMPMSelect() {
      var _this4 = this;

      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          use12Hours = this.use12Hours,
          format = this.format,
          isAM = this.isAM;

      if (!use12Hours) {
        return null;
      }

      var AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
      .map(function (c) {
        return format.match(/\sA/) ? c.toUpperCase() : c;
      }).map(function (c) {
        return { value: c };
      });

      var selected = isAM ? 0 : 1;

      return h(vc_time_picker_Select, {
        attrs: {
          prefixCls: prefixCls,
          options: AMPMOptions,
          selectedIndex: selected,
          type: 'ampm'
        },
        on: {
          'select': this.onItemChange,
          'mouseenter': function mouseenter() {
            return _this4.onEnterSelectPanel('ampm');
          }
        }
      });
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        defaultOpenValue = this.defaultOpenValue,
        propValue = this.value;

    var value = propValue || defaultOpenValue;
    return h(
      'div',
      { 'class': prefixCls + '-combobox' },
      [this.getHourSelect(value.hour()), this.getMinuteSelect(value.minute()), this.getSecondSelect(value.second()), this.getAMPMSelect(value.hour())]
    );
  }
};

/* harmony default export */ var vc_time_picker_Combobox = (Combobox);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/Panel.js







function Panel_noop() {}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
  var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var arr = [];
  for (var value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions) {
  var hour = hourOptions.slice().sort(function (a, b) {
    return Math.abs(time.hour() - a) - Math.abs(time.hour() - b);
  })[0];
  var minute = minuteOptions.slice().sort(function (a, b) {
    return Math.abs(time.minute() - a) - Math.abs(time.minute() - b);
  })[0];
  var second = secondOptions.slice().sort(function (a, b) {
    return Math.abs(time.second() - a) - Math.abs(time.second() - b);
  })[0];
  return moment_default()(hour + ':' + minute + ':' + second, 'HH:mm:ss');
}

var Panel = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    clearText: vue_types["a" /* default */].string,
    prefixCls: vue_types["a" /* default */].string.def('rc-time-picker-panel'),
    defaultOpenValue: {
      type: Object,
      'default': function _default() {
        return moment_default()();
      }
    },
    value: vue_types["a" /* default */].any,
    defaultValue: vue_types["a" /* default */].any,
    placeholder: vue_types["a" /* default */].string,
    format: vue_types["a" /* default */].string,
    inputReadOnly: vue_types["a" /* default */].bool.def(false),
    disabledHours: vue_types["a" /* default */].func.def(Panel_noop),
    disabledMinutes: vue_types["a" /* default */].func.def(Panel_noop),
    disabledSeconds: vue_types["a" /* default */].func.def(Panel_noop),
    hideDisabledOptions: vue_types["a" /* default */].bool,
    // onChange: PropTypes.func,
    // onEsc: PropTypes.func,
    allowEmpty: vue_types["a" /* default */].bool,
    showHour: vue_types["a" /* default */].bool,
    showMinute: vue_types["a" /* default */].bool,
    showSecond: vue_types["a" /* default */].bool,
    // onClear: PropTypes.func,
    use12Hours: vue_types["a" /* default */].bool.def(false),
    hourStep: vue_types["a" /* default */].number,
    minuteStep: vue_types["a" /* default */].number,
    secondStep: vue_types["a" /* default */].number,
    addon: vue_types["a" /* default */].func.def(Panel_noop),
    focusOnOpen: vue_types["a" /* default */].bool,
    // onKeydown: PropTypes.func,
    clearIcon: vue_types["a" /* default */].any
  },
  data: function data() {
    return {
      sValue: this.value,
      selectionRange: [],
      currentSelectPanel: ''
    };
  },

  watch: {
    value: function value(val) {
      if (val) {
        this.setState({
          sValue: val
        });
      }
    }
  },

  methods: {
    onChange: function onChange(newValue) {
      this.setState({ sValue: newValue });
      this.__emit('change', newValue);
    },
    onAmPmChange: function onAmPmChange(ampm) {
      this.__emit('amPmChange', ampm);
    },
    onCurrentSelectPanelChange: function onCurrentSelectPanelChange(currentSelectPanel) {
      this.setState({ currentSelectPanel: currentSelectPanel });
    },


    // https://github.com/ant-design/ant-design/issues/5829
    close: function close() {
      this.__emit('esc');
    },
    disabledHours2: function disabledHours2() {
      var use12Hours = this.use12Hours,
          disabledHours = this.disabledHours;

      var disabledOptions = disabledHours();
      if (use12Hours && Array.isArray(disabledOptions)) {
        if (this.isAM()) {
          disabledOptions = disabledOptions.filter(function (h) {
            return h < 12;
          }).map(function (h) {
            return h === 0 ? 12 : h;
          });
        } else {
          disabledOptions = disabledOptions.map(function (h) {
            return h === 12 ? 12 : h - 12;
          });
        }
      }
      return disabledOptions;
    },
    isAM: function isAM() {
      var value = this.sValue || this.defaultOpenValue;
      return value.hour() >= 0 && value.hour() < 12;
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        placeholder = this.placeholder,
        disabledMinutes = this.disabledMinutes,
        addon = this.addon,
        disabledSeconds = this.disabledSeconds,
        hideDisabledOptions = this.hideDisabledOptions,
        allowEmpty = this.allowEmpty,
        showHour = this.showHour,
        showMinute = this.showMinute,
        showSecond = this.showSecond,
        format = this.format,
        defaultOpenValue = this.defaultOpenValue,
        clearText = this.clearText,
        use12Hours = this.use12Hours,
        focusOnOpen = this.focusOnOpen,
        hourStep = this.hourStep,
        minuteStep = this.minuteStep,
        secondStep = this.secondStep,
        inputReadOnly = this.inputReadOnly,
        sValue = this.sValue,
        currentSelectPanel = this.currentSelectPanel,
        _$listeners = this.$listeners,
        $listeners = _$listeners === undefined ? {} : _$listeners;

    var clearIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'clearIcon');
    var _$listeners$esc = $listeners.esc,
        esc = _$listeners$esc === undefined ? Panel_noop : _$listeners$esc,
        _$listeners$clear = $listeners.clear,
        clear = _$listeners$clear === undefined ? Panel_noop : _$listeners$clear,
        _$listeners$keydown = $listeners.keydown,
        keydown = _$listeners$keydown === undefined ? Panel_noop : _$listeners$keydown;


    var disabledHourOptions = this.disabledHours2();
    var disabledMinuteOptions = disabledMinutes(sValue ? sValue.hour() : null);
    var disabledSecondOptions = disabledSeconds(sValue ? sValue.hour() : null, sValue ? sValue.minute() : null);
    var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
    var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
    var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);
    var validDefaultOpenValue = toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);
    return h(
      'div',
      { 'class': prefixCls + '-inner' },
      [h(vc_time_picker_Header, {
        attrs: {
          clearText: clearText,
          prefixCls: prefixCls,
          defaultOpenValue: validDefaultOpenValue,
          value: sValue,
          currentSelectPanel: currentSelectPanel,

          format: format,
          placeholder: placeholder,
          hourOptions: hourOptions,
          minuteOptions: minuteOptions,
          secondOptions: secondOptions,
          disabledHours: this.disabledHours2,
          disabledMinutes: disabledMinutes,
          disabledSeconds: disabledSeconds,

          allowEmpty: allowEmpty,
          focusOnOpen: focusOnOpen,

          inputReadOnly: inputReadOnly,
          clearIcon: clearIcon
        },
        on: {
          'esc': esc,
          'change': this.onChange,
          'keydown': keydown
        }
      }), h(vc_time_picker_Combobox, {
        attrs: {
          prefixCls: prefixCls,
          value: sValue,
          defaultOpenValue: validDefaultOpenValue,
          format: format,

          showHour: showHour,
          showMinute: showMinute,
          showSecond: showSecond,
          hourOptions: hourOptions,
          minuteOptions: minuteOptions,
          secondOptions: secondOptions,
          disabledHours: this.disabledHours2,
          disabledMinutes: disabledMinutes,
          disabledSeconds: disabledSeconds,

          use12Hours: use12Hours,
          isAM: this.isAM()
        },
        on: {
          'change': this.onChange,
          'amPmChange': this.onAmPmChange,
          'currentSelectPanelChange': this.onCurrentSelectPanelChange
        }
      }), addon(this)]
    );
  }
};

/* harmony default export */ var vc_time_picker_Panel = __webpack_exports__["a"] = (Panel);

/***/ }),

/***/ "a102":
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

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-tooltip/placements.js
var placements = __webpack_require__("1b8f");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tooltip/Content.js


/* harmony default export */ var Content = ({
  props: {
    prefixCls: vue_types["a" /* default */].string,
    overlay: vue_types["a" /* default */].any,
    trigger: vue_types["a" /* default */].any
  },
  updated: function updated() {
    var trigger = this.trigger;

    if (trigger) {
      trigger.forcePopupAlign();
    }
  },
  render: function render() {
    var h = arguments[0];
    var overlay = this.overlay,
        prefixCls = this.prefixCls;

    return h(
      'div',
      { 'class': prefixCls + '-inner', attrs: { role: 'tooltip' }
      },
      [typeof overlay === 'function' ? overlay() : overlay]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tooltip/Tooltip.js







function noop() {}
/* harmony default export */ var Tooltip = ({
  props: {
    trigger: vue_types["a" /* default */].any.def(['hover']),
    defaultVisible: vue_types["a" /* default */].bool,
    visible: vue_types["a" /* default */].bool,
    placement: vue_types["a" /* default */].string.def('right'),
    transitionName: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    animation: vue_types["a" /* default */].any,
    afterVisibleChange: vue_types["a" /* default */].func.def(function () {}),
    overlay: vue_types["a" /* default */].any,
    overlayStyle: vue_types["a" /* default */].object,
    overlayClassName: vue_types["a" /* default */].string,
    prefixCls: vue_types["a" /* default */].string.def('rc-tooltip'),
    mouseEnterDelay: vue_types["a" /* default */].number.def(0),
    mouseLeaveDelay: vue_types["a" /* default */].number.def(0.1),
    getTooltipContainer: vue_types["a" /* default */].func,
    destroyTooltipOnHide: vue_types["a" /* default */].bool.def(false),
    align: vue_types["a" /* default */].object.def({}),
    arrowContent: vue_types["a" /* default */].any.def(null),
    tipId: vue_types["a" /* default */].string,
    builtinPlacements: vue_types["a" /* default */].object
  },
  methods: {
    getPopupElement: function getPopupElement() {
      var h = this.$createElement;
      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          tipId = _$props.tipId;

      return [h(
        'div',
        { 'class': prefixCls + '-arrow', key: 'arrow' },
        [Object(props_util["g" /* getComponentFromProp */])(this, 'arrowContent')]
      ), h(Content, {
        key: 'content',
        attrs: { trigger: this.$refs.trigger,
          prefixCls: prefixCls,
          id: tipId,
          overlay: Object(props_util["g" /* getComponentFromProp */])(this, 'overlay')
        }
      })];
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.$refs.trigger.getPopupDomNode();
    }
  },
  render: function render(h) {
    var _getOptionProps = Object(props_util["j" /* getOptionProps */])(this),
        overlayClassName = _getOptionProps.overlayClassName,
        trigger = _getOptionProps.trigger,
        mouseEnterDelay = _getOptionProps.mouseEnterDelay,
        mouseLeaveDelay = _getOptionProps.mouseLeaveDelay,
        overlayStyle = _getOptionProps.overlayStyle,
        prefixCls = _getOptionProps.prefixCls,
        afterVisibleChange = _getOptionProps.afterVisibleChange,
        transitionName = _getOptionProps.transitionName,
        animation = _getOptionProps.animation,
        placement = _getOptionProps.placement,
        align = _getOptionProps.align,
        destroyTooltipOnHide = _getOptionProps.destroyTooltipOnHide,
        defaultVisible = _getOptionProps.defaultVisible,
        getTooltipContainer = _getOptionProps.getTooltipContainer,
        restProps = objectWithoutProperties_default()(_getOptionProps, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'afterVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

    var extraProps = extends_default()({}, restProps);
    if (Object(props_util["q" /* hasProp */])(this, 'visible')) {
      extraProps.popupVisible = this.$props.visible;
    }
    var triggerProps = {
      props: extends_default()({
        popupClassName: overlayClassName,
        prefixCls: prefixCls,
        action: trigger,
        builtinPlacements: placements["a" /* placements */],
        popupPlacement: placement,
        popupAlign: align,
        getPopupContainer: getTooltipContainer,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltipOnHide,
        mouseLeaveDelay: mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay: mouseEnterDelay
      }, extraProps),
      on: extends_default()({}, this.$listeners, {
        popupVisibleChange: this.$listeners.visibleChange || noop,
        popupAlign: this.$listeners.popupAlign || noop
      }),
      ref: 'trigger'
    };
    return h(
      vc_trigger["a" /* default */],
      triggerProps,
      [h(
        'template',
        { slot: 'popup' },
        [this.getPopupElement(h)]
      ), this.$slots['default']]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-tooltip/index.js
// based on rc-tooltip 3.7.3


/* harmony default export */ var vc_tooltip = __webpack_exports__["a"] = (Tooltip);

/***/ }),

/***/ "c9a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return warnOnlyTreeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return arrDel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return arrAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return posToArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getPosition; });
/* unused harmony export isTreeNode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getNodeChildren; });
/* unused harmony export isCheckDisabled */
/* unused harmony export traverseTreeNodes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return mapChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getDragNodesKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return calcDropPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return calcSelectedKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return convertDataToTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return convertTreeToEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return parseCheckedKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return conductCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return conductExpandParent; });
/* unused harmony export getDataAndAria */
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9b57");
/* harmony import */ var babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b24f");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1098");
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8e8e");
/* harmony import */ var babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e834");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var omit_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0464");
/* harmony import */ var _TreeNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cdd1");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("daa3");




/* eslint no-loop-func: 0*/




var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;

var onlyTreeNodeWarned = false;

function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;

  onlyTreeNodeWarned = true;
  warning__WEBPACK_IMPORTED_MODULE_4___default()(false, 'Tree only accept TreeNode as children.');
}

function arrDel(list, value) {
  var clone = list.slice();
  var index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}

function arrAdd(list, value) {
  var clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

function posToArr(pos) {
  return pos.split('-');
}

function getPosition(level, index) {
  return level + '-' + index;
}

function isTreeNode(node) {
  return Object(_util_props_util__WEBPACK_IMPORTED_MODULE_7__[/* getSlotOptions */ "m"])(node).isTreeNode;
}

function getNodeChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return children.filter(isTreeNode);
}

function isCheckDisabled(node) {
  var _ref = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_7__[/* getOptionProps */ "j"])(node) || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox;

  return !!(disabled || disableCheckbox);
}

function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    var children = node ? node.componentOptions.children : treeNodes;
    var pos = node ? getPosition(parent.pos, index) : 0;

    // Filter children
    var childList = getNodeChildren(children);

    // Process node if is not root
    if (node) {
      var key = node.key;
      if (!key && (key === undefined || key === null)) {
        key = pos;
      }
      var data = {
        node: node,
        index: index,
        pos: pos,
        key: key,
        parentPos: parent.node ? parent.pos : null
      };
      callback(data);
    }

    // Process children node
    childList.forEach(function (subNode, subIndex) {
      processNode(subNode, subIndex, { node: node, pos: pos });
    });
  }

  processNode(null);
}

/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */
function mapChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var func = arguments[1];

  var list = children.map(func);
  if (list.length === 1) {
    return list[0];
  }
  return list;
}

function getDragNodesKeys(treeNodes, node) {
  var _getOptionProps = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_7__[/* getOptionProps */ "j"])(node),
      eventKey = _getOptionProps.eventKey,
      pos = _getOptionProps.pos;

  var dragNodesKeys = [];

  traverseTreeNodes(treeNodes, function (_ref2) {
    var key = _ref2.key;

    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
}

function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$$refs$selec = treeNode.$refs.selectHandle.getBoundingClientRect(),
      top = _treeNode$$refs$selec.top,
      bottom = _treeNode$$refs$selec.bottom,
      height = _treeNode$$refs$selec.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  } else if (clientY >= bottom - des) {
    return 1;
  }
  return 0;
}

/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */
function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) {
    return undefined;
  }

  var multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}

/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
// function keyListToString (keyList) {
//   if (!keyList) return keyList
//   return keyList.map(key => String(key))
// }

var internalProcessProps = function internalProcessProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    props: Object(omit_js__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(props, ['on', 'key', 'class', 'className', 'style']),
    on: props.on || {},
    'class': props['class'] || props.className,
    style: props.style,
    key: props.key
  };
};
function convertDataToTree(h, treeData, processer) {
  if (!treeData) return [];

  var _ref3 = processer || {},
      _ref3$processProps = _ref3.processProps,
      processProps = _ref3$processProps === undefined ? internalProcessProps : _ref3$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_ref4) {
    var children = _ref4.children,
        props = babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3___default()(_ref4, ['children']);

    var childrenNodes = convertDataToTree(h, children, processer);
    return h(
      _TreeNode__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],
      processProps(props),
      [childrenNodes]
    );
  });
}

// TODO: ========================= NEW LOGIC =========================
/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */
function convertTreeToEntities(treeNodes) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref5.initWrapper,
      processEntity = _ref5.processEntity,
      onProcessFinished = _ref5.onProcessFinished;

  var posEntities = new Map();
  var keyEntities = new Map();
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos;

    var entity = { node: node, index: index, key: key, pos: pos };

    posEntities.set(pos, entity);
    keyEntities.set(key, entity);

    // Fill children
    entity.parent = posEntities.get(parentPos);
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}

/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  }

  // Convert keys to object format
  var keyProps = void 0;
  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if ((typeof keys === 'undefined' ? 'undefined' : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(keys)) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    warning__WEBPACK_IMPORTED_MODULE_4___default()(false, '`checkedKeys` is not an array or an object');
    return null;
  }

  // keyProps.checkedKeys = keyListToString(keyProps.checkedKeys)
  // keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys)

  return keyProps;
}

/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 * @param keyList       list of keys
 * @param isCheck       is check the node or not
 * @param keyEntities   parsed by `convertTreeToEntities` function in Tree
 * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */
function conductCheck(keyList, isCheck, keyEntities) {
  var checkStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var checkedKeys = new Map();
  var halfCheckedKeys = new Map(); // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(function (key) {
    checkedKeys.set(key, true);
  });

  (checkStatus.halfCheckedKeys || []).forEach(function (key) {
    halfCheckedKeys.set(key, true);
  });

  // Conduct up
  function conductUp(key) {
    if (checkedKeys.get(key) === isCheck) return;

    var entity = keyEntities.get(key);
    if (!entity) return;

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;


    if (isCheckDisabled(node)) return;

    // Check child node checked status
    var everyChildChecked = true;
    var someChildChecked = false; // Child checked or half checked

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (_ref6) {
      var childKey = _ref6.key;

      var childChecked = checkedKeys.get(childKey);
      var childHalfChecked = halfCheckedKeys.get(childKey);

      if (childChecked || childHalfChecked) someChildChecked = true;
      if (!childChecked) everyChildChecked = false;
    });

    // Update checked status
    if (isCheck) {
      checkedKeys.set(key, everyChildChecked);
    } else {
      checkedKeys.set(key, false);
    }
    halfCheckedKeys.set(key, someChildChecked);

    if (parent) {
      conductUp(parent.key);
    }
  }

  // Conduct down
  function conductDown(key) {
    if (checkedKeys.get(key) === isCheck) return;

    var entity = keyEntities.get(key);
    if (!entity) return;

    var children = entity.children,
        node = entity.node;


    if (isCheckDisabled(node)) return;

    checkedKeys.set(key, isCheck);

    (children || []).forEach(function (child) {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    var entity = keyEntities.get(key);

    if (!entity) {
      warning__WEBPACK_IMPORTED_MODULE_4___default()(false, '\'' + key + '\' does not exist in the tree.');
      return;
    }
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;

    checkedKeys.set(key, isCheck);

    if (isCheckDisabled(node)) return;

    // Conduct down
    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      conductDown(child.key);
    });

    // Conduct up
    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });

  var checkedKeyList = [];
  var halfCheckedKeyList = [];

  // Fill checked list
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = checkedKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref7 = _step.value;

      var _ref8 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref7, 2);

      var key = _ref8[0];
      var value = _ref8[1];

      if (value) {
        checkedKeyList.push(key);
      }
    }

    // Fill half checked list
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = halfCheckedKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref9 = _step2.value;

      var _ref10 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref9, 2);

      var _key = _ref10[0];
      var _value = _ref10[1];

      if (!checkedKeys.get(_key) && _value) {
        halfCheckedKeyList.push(_key);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}

/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */
function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = new Map();

  function conductUp(key) {
    if (expandedKeys.get(key)) return;

    var entity = keyEntities.get(key);
    if (!entity) return;

    expandedKeys.set(key, true);

    var parent = entity.parent,
        node = entity.node;


    if (isCheckDisabled(node)) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });

  return [].concat(babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(expandedKeys.keys()));
}

/**
 * Returns only the data- and aria- key/value pairs
 * @param {object} props
 */
function getDataAndAria(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}

/***/ }),

/***/ "cdd1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6042");
/* harmony import */ var babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1098");
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("41b2");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_vue_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4d91");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4d26");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c9a4");
/* harmony import */ var _util_props_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("daa3");
/* harmony import */ var _util_BaseMixin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("b488");
/* harmony import */ var _util_getTransitionProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("94eb");
/* harmony import */ var _util_vnode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("7b05");











function noop() {}
var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';

var defaultTitle = '---';

var TreeNode = {
  name: 'TreeNode',
  mixins: [_util_BaseMixin__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]],
  __ANT_TREE_NODE: true,
  props: Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* initDefaultProps */ "r"])({
    eventKey: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].oneOfType([_util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string, _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].number]), // Pass by parent `cloneElement`
    prefixCls: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string,
    // className: PropTypes.string,
    root: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].object,
    // onSelect: PropTypes.func,

    // By parent
    expanded: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    selected: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    checked: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    loaded: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    loading: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    halfChecked: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    title: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
    pos: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].string,
    dragOver: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    dragOverGapTop: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    dragOverGapBottom: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,

    // By user
    isLeaf: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    selectable: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    disabled: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    disableCheckbox: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].bool,
    icon: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
    dataRef: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].object,
    switcherIcon: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,

    label: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any,
    value: _util_vue_types__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].any
  }, {}),

  data: function data() {
    return {
      dragNodeHighlight: false
    };
  },

  inject: {
    vcTree: { 'default': function _default() {
        return {};
      } },
    vcTreeNode: { 'default': function _default() {
        return {};
      } }
  },
  provide: function provide() {
    return {
      vcTreeNode: this
    };
  },


  // Isomorphic needn't load data in server side
  mounted: function mounted() {
    this.syncLoadData(this.$props);
  },
  updated: function updated() {
    this.syncLoadData(this.$props);
  },


  methods: {
    onSelectorClick: function onSelectorClick(e) {
      // Click trigger before select/check operation
      var onNodeClick = this.vcTree.onNodeClick;

      onNodeClick(e, this);
      if (this.isSelectable()) {
        this.onSelect(e);
      } else {
        this.onCheck(e);
      }
    },
    onSelectorDoubleClick: function onSelectorDoubleClick(e) {
      var onNodeDoubleClick = this.vcTree.onNodeDoubleClick;

      onNodeDoubleClick(e, this);
    },
    onSelect: function onSelect(e) {
      if (this.isDisabled()) return;

      var onNodeSelect = this.vcTree.onNodeSelect;

      e.preventDefault();
      onNodeSelect(e, this);
    },
    onCheck: function onCheck(e) {
      if (this.isDisabled()) return;

      var disableCheckbox = this.disableCheckbox,
          checked = this.checked;
      var _vcTree = this.vcTree,
          checkable = _vcTree.checkable,
          onNodeCheck = _vcTree.onNodeCheck;


      if (!checkable || disableCheckbox) return;

      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, this, targetChecked);
    },
    onMouseEnter: function onMouseEnter(e) {
      var onNodeMouseEnter = this.vcTree.onNodeMouseEnter;

      onNodeMouseEnter(e, this);
    },
    onMouseLeave: function onMouseLeave(e) {
      var onNodeMouseLeave = this.vcTree.onNodeMouseLeave;

      onNodeMouseLeave(e, this);
    },
    onContextMenu: function onContextMenu(e) {
      var onNodeContextMenu = this.vcTree.onNodeContextMenu;

      onNodeContextMenu(e, this);
    },
    onDragStart: function onDragStart(e) {
      var onNodeDragStart = this.vcTree.onNodeDragStart;


      e.stopPropagation();
      this.setState({
        dragNodeHighlight: true
      });
      onNodeDragStart(e, this);

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    },
    onDragEnter: function onDragEnter(e) {
      var onNodeDragEnter = this.vcTree.onNodeDragEnter;


      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, this);
    },
    onDragOver: function onDragOver(e) {
      var onNodeDragOver = this.vcTree.onNodeDragOver;


      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, this);
    },
    onDragLeave: function onDragLeave(e) {
      var onNodeDragLeave = this.vcTree.onNodeDragLeave;


      e.stopPropagation();
      onNodeDragLeave(e, this);
    },
    onDragEnd: function onDragEnd(e) {
      var onNodeDragEnd = this.vcTree.onNodeDragEnd;


      e.stopPropagation();
      this.setState({
        dragNodeHighlight: false
      });
      onNodeDragEnd(e, this);
    },
    onDrop: function onDrop(e) {
      var onNodeDrop = this.vcTree.onNodeDrop;


      e.preventDefault();
      e.stopPropagation();
      this.setState({
        dragNodeHighlight: false
      });
      onNodeDrop(e, this);
    },


    // Disabled item still can be switch
    onExpand: function onExpand(e) {
      var onNodeExpand = this.vcTree.onNodeExpand;

      onNodeExpand(e, this);
    },
    getNodeChildren: function getNodeChildren() {
      var children = this.$slots['default'];

      var originList = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* filterEmpty */ "c"])(children);
      var targetList = Object(_util__WEBPACK_IMPORTED_MODULE_5__[/* getNodeChildren */ "j"])(originList);

      if (originList.length !== targetList.length) {
        Object(_util__WEBPACK_IMPORTED_MODULE_5__[/* warnOnlyTreeNode */ "o"])();
      }

      return targetList;
    },
    getNodeState: function getNodeState() {
      var expanded = this.expanded;


      if (this.isLeaf2()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    },
    isLeaf2: function isLeaf2() {
      var isLeaf = this.isLeaf,
          loaded = this.loaded;
      var loadData = this.vcTree.loadData;


      var hasChildren = this.getNodeChildren().length !== 0;
      if (isLeaf === false) {
        return false;
      }
      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    },
    isDisabled: function isDisabled() {
      var disabled = this.disabled;
      var treeDisabled = this.vcTree.disabled;

      // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    },
    isSelectable: function isSelectable() {
      var selectable = this.selectable;
      var treeSelectable = this.vcTree.selectable;

      // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    },


    // Load data to avoid default expanded tree without data
    syncLoadData: function syncLoadData(props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _vcTree2 = this.vcTree,
          loadData = _vcTree2.loadData,
          onNodeLoad = _vcTree2.onNodeLoad;

      if (loading) return;
      // read from state to avoid loadData at same time
      if (loadData && expanded && !this.isLeaf2()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = this.getNodeChildren().length !== 0;
        if (!hasChildren && !loaded) {
          onNodeLoad(this);
        }
      }
    },


    // Switcher
    renderSwitcher: function renderSwitcher() {
      var h = this.$createElement;
      var expanded = this.expanded;
      var prefixCls = this.vcTree.prefixCls;

      var switcherIcon = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* getComponentFromProp */ "g"])(this, 'switcherIcon', {}, false) || Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* getComponentFromProp */ "g"])(this.vcTree, 'switcherIcon', {}, false);
      if (this.isLeaf2()) {
        return h(
          'span',
          {
            key: 'switcher',
            'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-switcher', prefixCls + '-switcher-noop')
          },
          [typeof switcherIcon === 'function' ? Object(_util_vnode__WEBPACK_IMPORTED_MODULE_9__[/* cloneElement */ "a"])(switcherIcon(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, this.$props, { isLeaf: true }))) : switcherIcon]
        );
      }

      var switcherCls = classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-switcher', prefixCls + '-switcher_' + (expanded ? ICON_OPEN : ICON_CLOSE));
      return h(
        'span',
        { key: 'switcher', on: {
            'click': this.onExpand
          },
          'class': switcherCls },
        [typeof switcherIcon === 'function' ? Object(_util_vnode__WEBPACK_IMPORTED_MODULE_9__[/* cloneElement */ "a"])(switcherIcon(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, this.$props, { isLeaf: false }))) : switcherIcon]
      );
    },


    // Checkbox
    renderCheckbox: function renderCheckbox() {
      var h = this.$createElement;
      var checked = this.checked,
          halfChecked = this.halfChecked,
          disableCheckbox = this.disableCheckbox;
      var _vcTree3 = this.vcTree,
          prefixCls = _vcTree3.prefixCls,
          checkable = _vcTree3.checkable;

      var disabled = this.isDisabled();

      if (!checkable) return null;

      // [Legacy] Custom element should be separate with `checkable` in future
      var $custom = typeof checkable !== 'boolean' ? checkable : null;

      return h(
        'span',
        {
          key: 'checkbox',
          'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-checkbox', checked && prefixCls + '-checkbox-checked', !checked && halfChecked && prefixCls + '-checkbox-indeterminate', (disabled || disableCheckbox) && prefixCls + '-checkbox-disabled'),
          on: {
            'click': this.onCheck
          }
        },
        [$custom]
      );
    },
    renderIcon: function renderIcon() {
      var h = this.$createElement;
      var loading = this.loading;
      var prefixCls = this.vcTree.prefixCls;


      return h('span', {
        key: 'icon',
        'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-iconEle', prefixCls + '-icon__' + (this.getNodeState() || 'docu'), loading && prefixCls + '-icon_loading')
      });
    },


    // Icon + Title
    renderSelector: function renderSelector(h) {
      var selected = this.selected,
          icon = this.icon,
          loading = this.loading,
          dragNodeHighlight = this.dragNodeHighlight;
      var _vcTree4 = this.vcTree,
          prefixCls = _vcTree4.prefixCls,
          showIcon = _vcTree4.showIcon,
          treeIcon = _vcTree4.icon,
          draggable = _vcTree4.draggable,
          loadData = _vcTree4.loadData;

      var disabled = this.isDisabled();
      var title = Object(_util_props_util__WEBPACK_IMPORTED_MODULE_6__[/* getComponentFromProp */ "g"])(this, 'title') || defaultTitle;
      var wrapClass = prefixCls + '-node-content-wrapper';

      // Icon - Still show loading icon when loading without showIcon
      var $icon = void 0;

      if (showIcon) {
        var currentIcon = icon || treeIcon;
        $icon = currentIcon ? h(
          'span',
          { 'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-iconEle', prefixCls + '-icon__customize') },
          [typeof currentIcon === 'function' ? currentIcon(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, this.$props), h) : currentIcon]
        ) : this.renderIcon();
      } else if (loadData && loading) {
        $icon = this.renderIcon();
      }

      // Title
      var $title = h(
        'span',
        { 'class': prefixCls + '-title' },
        [title]
      );

      return h(
        'span',
        {
          key: 'selector',
          ref: 'selectHandle',
          attrs: { title: typeof title === 'string' ? title : '',

            draggable: !disabled && draggable || undefined,
            'aria-grabbed': !disabled && draggable || undefined
          },
          'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()('' + wrapClass, wrapClass + '-' + (this.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && prefixCls + '-node-selected', !disabled && draggable && 'draggable'), on: {
            'mouseenter': this.onMouseEnter,
            'mouseleave': this.onMouseLeave,
            'contextmenu': this.onContextMenu,
            'click': this.onSelectorClick,
            'dblclick': this.onSelectorDoubleClick,
            'dragstart': draggable ? this.onDragStart : noop
          }
        },
        [$icon, $title]
      );
    },


    // Children list wrapped with `Animation`
    renderChildren: function renderChildren() {
      var h = this.$createElement;
      var expanded = this.expanded,
          pos = this.pos;
      var _vcTree5 = this.vcTree,
          prefixCls = _vcTree5.prefixCls,
          openTransitionName = _vcTree5.openTransitionName,
          openAnimation = _vcTree5.openAnimation,
          renderTreeNode = _vcTree5.renderTreeNode;


      var animProps = {};
      if (openTransitionName) {
        animProps = Object(_util_getTransitionProps__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(openTransitionName);
      } else if ((typeof openAnimation === 'undefined' ? 'undefined' : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(openAnimation)) === 'object') {
        animProps = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, openAnimation);
        animProps.props = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({ css: false }, animProps.props);
      }

      // Children TreeNode
      var nodeList = this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      var $children = void 0;
      if (expanded) {
        $children = h(
          'ul',
          {
            'class': classnames__WEBPACK_IMPORTED_MODULE_4___default()(prefixCls + '-child-tree', expanded && prefixCls + '-child-tree-open'),
            attrs: { 'data-expanded': expanded,
              role: 'group'
            }
          },
          [Object(_util__WEBPACK_IMPORTED_MODULE_5__[/* mapChildren */ "l"])(nodeList, function (node, index) {
            return renderTreeNode(node, index, pos);
          })]
        );
      }

      return h(
        'transition',
        animProps,
        [$children]
      );
    }
  },

  render: function render(h) {
    var _ref;

    var _$props = this.$props,
        dragOver = _$props.dragOver,
        dragOverGapTop = _$props.dragOverGapTop,
        dragOverGapBottom = _$props.dragOverGapBottom,
        isLeaf = _$props.isLeaf,
        expanded = _$props.expanded,
        selected = _$props.selected,
        checked = _$props.checked,
        halfChecked = _$props.halfChecked,
        loading = _$props.loading;
    var _vcTree6 = this.vcTree,
        prefixCls = _vcTree6.prefixCls,
        filterTreeNode = _vcTree6.filterTreeNode,
        draggable = _vcTree6.draggable;

    var disabled = this.isDisabled();
    return h(
      'li',
      {
        'class': (_ref = {}, babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-disabled', disabled), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-switcher-' + (expanded ? 'open' : 'close'), !isLeaf), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-checkbox-checked', checked), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-checkbox-indeterminate', halfChecked), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-selected', selected), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, prefixCls + '-treenode-loading', loading), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 'drag-over', !disabled && dragOver), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 'drag-over-gap-top', !disabled && dragOverGapTop), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 'filter-node', filterTreeNode && filterTreeNode(this)), _ref),
        attrs: { role: 'treeitem'
        },
        on: {
          'dragenter': draggable ? this.onDragEnter : noop,
          'dragover': draggable ? this.onDragOver : noop,
          'dragleave': draggable ? this.onDragLeave : noop,
          'drop': draggable ? this.onDrop : noop,
          'dragend': draggable ? this.onDragEnd : noop
        }
      },
      [this.renderSwitcher(), this.renderCheckbox(), this.renderSelector(h), this.renderChildren()]
    );
  }
};

TreeNode.isTreeNode = 1;

/* harmony default export */ __webpack_exports__["a"] = (TreeNode);

/***/ }),

/***/ "d591":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b0e");
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2322");
/* harmony import */ var vue_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("46cf");
/* harmony import */ var vue_ref__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_ref__WEBPACK_IMPORTED_MODULE_2__);
// export this package's api
// base 2.5.4




vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].use(vue_ref__WEBPACK_IMPORTED_MODULE_2___default.a, { name: 'ant-ref' });
/* harmony default export */ __webpack_exports__["a"] = (_src__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"]);



/***/ }),

/***/ "deb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js + 5 modules
var vc_trigger = __webpack_require__("8496");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/Panel.js + 3 modules
var Panel = __webpack_require__("9a16");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/placements.js
var autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

var targetOffset = [0, 0];

var placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset: targetOffset
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset: targetOffset
  }
};

/* harmony default export */ var vc_time_picker_placements = (placements);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-time-picker/TimePicker.js









function noop() {}

/* harmony default export */ var TimePicker = __webpack_exports__["a"] = ({
  name: 'VcTimePicker',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["r" /* initDefaultProps */])({
    prefixCls: vue_types["a" /* default */].string,
    clearText: vue_types["a" /* default */].string,
    value: vue_types["a" /* default */].any,
    defaultOpenValue: {
      type: Object,
      'default': function _default() {
        return moment_default()();
      }
    },
    inputReadOnly: vue_types["a" /* default */].bool,
    disabled: vue_types["a" /* default */].bool,
    allowEmpty: vue_types["a" /* default */].bool,
    defaultValue: vue_types["a" /* default */].any,
    open: vue_types["a" /* default */].bool,
    defaultOpen: vue_types["a" /* default */].bool,
    align: vue_types["a" /* default */].object,
    placement: vue_types["a" /* default */].any,
    transitionName: vue_types["a" /* default */].string,
    getPopupContainer: vue_types["a" /* default */].func,
    placeholder: vue_types["a" /* default */].string,
    format: vue_types["a" /* default */].string,
    showHour: vue_types["a" /* default */].bool,
    showMinute: vue_types["a" /* default */].bool,
    showSecond: vue_types["a" /* default */].bool,
    popupClassName: vue_types["a" /* default */].string,
    popupStyle: vue_types["a" /* default */].object,
    disabledHours: vue_types["a" /* default */].func,
    disabledMinutes: vue_types["a" /* default */].func,
    disabledSeconds: vue_types["a" /* default */].func,
    hideDisabledOptions: vue_types["a" /* default */].bool,
    // onChange: PropTypes.func,
    // onAmPmChange: PropTypes.func,
    // onOpen: PropTypes.func,
    // onClose: PropTypes.func,
    // onFocus: PropTypes.func,
    // onBlur: PropTypes.func,
    name: vue_types["a" /* default */].string,
    autoComplete: vue_types["a" /* default */].string,
    use12Hours: vue_types["a" /* default */].bool,
    hourStep: vue_types["a" /* default */].number,
    minuteStep: vue_types["a" /* default */].number,
    secondStep: vue_types["a" /* default */].number,
    focusOnOpen: vue_types["a" /* default */].bool,
    // onKeyDown: PropTypes.func,
    autoFocus: vue_types["a" /* default */].bool,
    id: vue_types["a" /* default */].string,
    inputIcon: vue_types["a" /* default */].any,
    clearIcon: vue_types["a" /* default */].any,
    addon: vue_types["a" /* default */].func
  }, {
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    inputReadOnly: false,
    popupClassName: '',
    popupStyle: {},
    align: {},
    id: '',
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    use12Hours: false,
    focusOnOpen: false
  }),
  data: function data() {
    var defaultOpen = this.defaultOpen,
        defaultValue = this.defaultValue,
        _open = this.open,
        open = _open === undefined ? defaultOpen : _open,
        _value = this.value,
        value = _value === undefined ? defaultValue : _value;

    return {
      sOpen: open,
      sValue: value
    };
  },


  watch: {
    value: function value(val) {
      this.setState({
        sValue: val
      });
    },
    open: function open(val) {
      if (val !== undefined) {
        this.setState({
          sOpen: val
        });
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.autoFocus) {
        _this.focus();
      }
    });
  },

  methods: {
    onPanelChange: function onPanelChange(value) {
      this.setValue(value);
    },
    onAmPmChange: function onAmPmChange(ampm) {
      this.__emit('amPmChange', ampm);
    },
    onClear: function onClear(event) {
      event.stopPropagation();
      this.setValue(null);
      this.setOpen(false);
    },
    onVisibleChange: function onVisibleChange(open) {
      this.setOpen(open);
    },
    onEsc: function onEsc() {
      this.setOpen(false);
      this.focus();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 40) {
        this.setOpen(true);
      }
    },
    onKeyDown2: function onKeyDown2(e) {
      this.__emit('keydown', e);
    },
    setValue: function setValue(value) {
      if (!Object(props_util["q" /* hasProp */])(this, 'value')) {
        this.setState({
          sValue: value
        });
      }
      this.__emit('change', value);
    },
    getFormat: function getFormat() {
      var format = this.format,
          showHour = this.showHour,
          showMinute = this.showMinute,
          showSecond = this.showSecond,
          use12Hours = this.use12Hours;

      if (format) {
        return format;
      }

      if (use12Hours) {
        var fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
          return !!item;
        }).join(':');

        return fmtString.concat(' a');
      }

      return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
        return !!item;
      }).join(':');
    },
    getPanelElement: function getPanelElement() {
      var h = this.$createElement;
      var prefixCls = this.prefixCls,
          placeholder = this.placeholder,
          disabledHours = this.disabledHours,
          addon = this.addon,
          disabledMinutes = this.disabledMinutes,
          disabledSeconds = this.disabledSeconds,
          hideDisabledOptions = this.hideDisabledOptions,
          inputReadOnly = this.inputReadOnly,
          allowEmpty = this.allowEmpty,
          showHour = this.showHour,
          showMinute = this.showMinute,
          showSecond = this.showSecond,
          defaultOpenValue = this.defaultOpenValue,
          clearText = this.clearText,
          use12Hours = this.use12Hours,
          focusOnOpen = this.focusOnOpen,
          onKeyDown2 = this.onKeyDown2,
          hourStep = this.hourStep,
          minuteStep = this.minuteStep,
          secondStep = this.secondStep,
          sValue = this.sValue;

      var clearIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'clearIcon');
      return h(Panel["a" /* default */], {
        attrs: {
          clearText: clearText,
          prefixCls: prefixCls + '-panel',

          value: sValue,
          inputReadOnly: inputReadOnly,

          defaultOpenValue: defaultOpenValue,
          showHour: showHour,
          showMinute: showMinute,
          showSecond: showSecond,

          allowEmpty: allowEmpty,
          format: this.getFormat(),
          placeholder: placeholder,
          disabledHours: disabledHours,
          disabledMinutes: disabledMinutes,
          disabledSeconds: disabledSeconds,
          hideDisabledOptions: hideDisabledOptions,
          use12Hours: use12Hours,
          hourStep: hourStep,
          minuteStep: minuteStep,
          secondStep: secondStep,
          focusOnOpen: focusOnOpen,

          clearIcon: clearIcon,
          addon: addon
        },
        ref: 'panel', on: {
          'change': this.onPanelChange,
          'amPmChange': this.onAmPmChange,
          'esc': this.onEsc,
          'keydown': onKeyDown2
        }
      });
    },
    getPopupClassName: function getPopupClassName() {
      var showHour = this.showHour,
          showMinute = this.showMinute,
          showSecond = this.showSecond,
          use12Hours = this.use12Hours,
          prefixCls = this.prefixCls;

      var popupClassName = this.popupClassName;
      // Keep it for old compatibility
      if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
        popupClassName += ' ' + prefixCls + '-panel-narrow';
      }
      var selectColumnCount = 0;
      if (showHour) {
        selectColumnCount += 1;
      }
      if (showMinute) {
        selectColumnCount += 1;
      }
      if (showSecond) {
        selectColumnCount += 1;
      }
      if (use12Hours) {
        selectColumnCount += 1;
      }
      popupClassName += ' ' + prefixCls + '-panel-column-' + selectColumnCount;
      return popupClassName;
    },
    setOpen: function setOpen(open) {
      if (this.sOpen !== open) {
        if (!Object(props_util["q" /* hasProp */])(this, 'open')) {
          this.setState({ sOpen: open });
        }
        if (open) {
          this.__emit('open', { open: open });
        } else {
          this.__emit('close', { open: open });
        }
      }
    },
    focus: function focus() {
      this.$refs.picker.focus();
    },
    blur: function blur() {
      this.$refs.picker.blur();
    },
    onFocus: function onFocus(e) {
      this.__emit('focus', e);
    },
    onBlur: function onBlur(e) {
      this.__emit('blur', e);
    },
    renderClearButton: function renderClearButton() {
      var _this2 = this;

      var h = this.$createElement;
      var sValue = this.sValue;
      var _$props = this.$props,
          prefixCls = _$props.prefixCls,
          allowEmpty = _$props.allowEmpty,
          clearText = _$props.clearText;

      if (!allowEmpty || !sValue) {
        return null;
      }
      var clearIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'clearIcon');
      if (Object(props_util["t" /* isValidElement */])(clearIcon)) {
        var _ref = Object(props_util["h" /* getEvents */])(clearIcon) || {},
            _click = _ref.click;

        return Object(vnode["a" /* cloneElement */])(clearIcon, {
          on: {
            click: function click() {
              if (_click) _click.apply(undefined, arguments);
              _this2.onClear.apply(_this2, arguments);
            }
          }
        });
      }

      return h(
        'a',
        {
          attrs: {
            role: 'button',

            title: clearText,

            tabIndex: 0
          },
          'class': prefixCls + '-clear', on: {
            'click': this.onClear
          }
        },
        [clearIcon || h('i', { 'class': prefixCls + '-clear-icon' })]
      );
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        placeholder = this.placeholder,
        placement = this.placement,
        align = this.align,
        id = this.id,
        disabled = this.disabled,
        transitionName = this.transitionName,
        getPopupContainer = this.getPopupContainer,
        name = this.name,
        autoComplete = this.autoComplete,
        autoFocus = this.autoFocus,
        inputReadOnly = this.inputReadOnly,
        sOpen = this.sOpen,
        sValue = this.sValue,
        onFocus = this.onFocus,
        onBlur = this.onBlur,
        popupStyle = this.popupStyle;

    var popupClassName = this.getPopupClassName();
    var inputIcon = Object(props_util["g" /* getComponentFromProp */])(this, 'inputIcon');
    return h(
      vc_trigger["a" /* default */],
      {
        attrs: {
          prefixCls: prefixCls + '-panel',
          popupClassName: popupClassName,
          popupStyle: popupStyle,
          popupAlign: align,
          builtinPlacements: vc_time_picker_placements,
          popupPlacement: placement,
          action: disabled ? [] : ['click'],
          destroyPopupOnHide: true,
          getPopupContainer: getPopupContainer,
          popupTransitionName: transitionName,
          popupVisible: sOpen
        },
        on: {
          'popupVisibleChange': this.onVisibleChange
        }
      },
      [h(
        'template',
        { slot: 'popup' },
        [this.getPanelElement()]
      ), h(
        'span',
        { 'class': '' + prefixCls },
        [h('input', {
          'class': prefixCls + '-input',
          ref: 'picker',
          attrs: { type: 'text',
            placeholder: placeholder,
            name: name,

            disabled: disabled,

            autoComplete: autoComplete,

            autoFocus: autoFocus,
            readOnly: !!inputReadOnly,
            id: id
          },
          on: {
            'keydown': this.onKeyDown,
            'focus': onFocus,
            'blur': onBlur
          },
          domProps: {
            'value': sValue && sValue.format(this.getFormat()) || ''
          }
        }), inputIcon || h('span', { 'class': prefixCls + '-icon' }), this.renderClearButton()]
      )]
    );
  }
});

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~c55a91f5.ae0ac4bb.js.map