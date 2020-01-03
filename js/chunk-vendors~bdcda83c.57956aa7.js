(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~bdcda83c"],{

/***/ "06c7":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__("6d8b");

var Model = __webpack_require__("4319");

var linkList = __webpack_require__("31d9");

var List = __webpack_require__("6179");

var createDimensions = __webpack_require__("b1d4");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Tree data structure
 *
 * @module echarts/data/Tree
 */

/**
 * @constructor module:echarts/data/Tree~TreeNode
 * @param {string} name
 * @param {module:echarts/data/Tree} hostTree
 */
var TreeNode = function (name, hostTree) {
  /**
   * @type {string}
   */
  this.name = name || '';
  /**
   * Depth of node
   *
   * @type {number}
   * @readOnly
   */

  this.depth = 0;
  /**
   * Height of the subtree rooted at this node.
   * @type {number}
   * @readOnly
   */

  this.height = 0;
  /**
   * @type {module:echarts/data/Tree~TreeNode}
   * @readOnly
   */

  this.parentNode = null;
  /**
   * Reference to list item.
   * Do not persistent dataIndex outside,
   * besause it may be changed by list.
   * If dataIndex -1,
   * this node is logical deleted (filtered) in list.
   *
   * @type {Object}
   * @readOnly
   */

  this.dataIndex = -1;
  /**
   * @type {Array.<module:echarts/data/Tree~TreeNode>}
   * @readOnly
   */

  this.children = [];
  /**
   * @type {Array.<module:echarts/data/Tree~TreeNode>}
   * @pubilc
   */

  this.viewChildren = [];
  /**
   * @type {moduel:echarts/data/Tree}
   * @readOnly
   */

  this.hostTree = hostTree;
};

TreeNode.prototype = {
  constructor: TreeNode,

  /**
   * The node is removed.
   * @return {boolean} is removed.
   */
  isRemoved: function () {
    return this.dataIndex < 0;
  },

  /**
   * Travel this subtree (include this node).
   * Usage:
   *    node.eachNode(function () { ... }); // preorder
   *    node.eachNode('preorder', function () { ... }); // preorder
   *    node.eachNode('postorder', function () { ... }); // postorder
   *    node.eachNode(
   *        {order: 'postorder', attr: 'viewChildren'},
   *        function () { ... }
   *    ); // postorder
   *
   * @param {(Object|string)} options If string, means order.
   * @param {string=} options.order 'preorder' or 'postorder'
   * @param {string=} options.attr 'children' or 'viewChildren'
   * @param {Function} cb If in preorder and return false,
   *                      its subtree will not be visited.
   * @param {Object} [context]
   */
  eachNode: function (options, cb, context) {
    if (typeof options === 'function') {
      context = cb;
      cb = options;
      options = null;
    }

    options = options || {};

    if (zrUtil.isString(options)) {
      options = {
        order: options
      };
    }

    var order = options.order || 'preorder';
    var children = this[options.attr || 'children'];
    var suppressVisitSub;
    order === 'preorder' && (suppressVisitSub = cb.call(context, this));

    for (var i = 0; !suppressVisitSub && i < children.length; i++) {
      children[i].eachNode(options, cb, context);
    }

    order === 'postorder' && cb.call(context, this);
  },

  /**
   * Update depth and height of this subtree.
   *
   * @param  {number} depth
   */
  updateDepthAndHeight: function (depth) {
    var height = 0;
    this.depth = depth;

    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      child.updateDepthAndHeight(depth + 1);

      if (child.height > height) {
        height = child.height;
      }
    }

    this.height = height + 1;
  },

  /**
   * @param  {string} id
   * @return {module:echarts/data/Tree~TreeNode}
   */
  getNodeById: function (id) {
    if (this.getId() === id) {
      return this;
    }

    for (var i = 0, children = this.children, len = children.length; i < len; i++) {
      var res = children[i].getNodeById(id);

      if (res) {
        return res;
      }
    }
  },

  /**
   * @param {module:echarts/data/Tree~TreeNode} node
   * @return {boolean}
   */
  contains: function (node) {
    if (node === this) {
      return true;
    }

    for (var i = 0, children = this.children, len = children.length; i < len; i++) {
      var res = children[i].contains(node);

      if (res) {
        return res;
      }
    }
  },

  /**
   * @param {boolean} includeSelf Default false.
   * @return {Array.<module:echarts/data/Tree~TreeNode>} order: [root, child, grandchild, ...]
   */
  getAncestors: function (includeSelf) {
    var ancestors = [];
    var node = includeSelf ? this : this.parentNode;

    while (node) {
      ancestors.push(node);
      node = node.parentNode;
    }

    ancestors.reverse();
    return ancestors;
  },

  /**
   * @param {string|Array=} [dimension='value'] Default 'value'. can be 0, 1, 2, 3
   * @return {number} Value.
   */
  getValue: function (dimension) {
    var data = this.hostTree.data;
    return data.get(data.getDimension(dimension || 'value'), this.dataIndex);
  },

  /**
   * @param {Object} layout
   * @param {boolean=} [merge=false]
   */
  setLayout: function (layout, merge) {
    this.dataIndex >= 0 && this.hostTree.data.setItemLayout(this.dataIndex, layout, merge);
  },

  /**
   * @return {Object} layout
   */
  getLayout: function () {
    return this.hostTree.data.getItemLayout(this.dataIndex);
  },

  /**
   * @param {string} [path]
   * @return {module:echarts/model/Model}
   */
  getModel: function (path) {
    if (this.dataIndex < 0) {
      return;
    }

    var hostTree = this.hostTree;
    var itemModel = hostTree.data.getItemModel(this.dataIndex);
    var levelModel = this.getLevelModel();
    var leavesModel;

    if (!levelModel && (this.children.length === 0 || this.children.length !== 0 && this.isExpand === false)) {
      leavesModel = this.getLeavesModel();
    }

    return itemModel.getModel(path, (levelModel || leavesModel || hostTree.hostModel).getModel(path));
  },

  /**
   * @return {module:echarts/model/Model}
   */
  getLevelModel: function () {
    return (this.hostTree.levelModels || [])[this.depth];
  },

  /**
   * @return {module:echarts/model/Model}
   */
  getLeavesModel: function () {
    return this.hostTree.leavesModel;
  },

  /**
   * @example
   *  setItemVisual('color', color);
   *  setItemVisual({
   *      'color': color
   *  });
   */
  setVisual: function (key, value) {
    this.dataIndex >= 0 && this.hostTree.data.setItemVisual(this.dataIndex, key, value);
  },

  /**
   * Get item visual
   */
  getVisual: function (key, ignoreParent) {
    return this.hostTree.data.getItemVisual(this.dataIndex, key, ignoreParent);
  },

  /**
   * @public
   * @return {number}
   */
  getRawIndex: function () {
    return this.hostTree.data.getRawIndex(this.dataIndex);
  },

  /**
   * @public
   * @return {string}
   */
  getId: function () {
    return this.hostTree.data.getId(this.dataIndex);
  },

  /**
   * if this is an ancestor of another node
   *
   * @public
   * @param {TreeNode} node another node
   * @return {boolean} if is ancestor
   */
  isAncestorOf: function (node) {
    var parent = node.parentNode;

    while (parent) {
      if (parent === this) {
        return true;
      }

      parent = parent.parentNode;
    }

    return false;
  },

  /**
   * if this is an descendant of another node
   *
   * @public
   * @param {TreeNode} node another node
   * @return {boolean} if is descendant
   */
  isDescendantOf: function (node) {
    return node !== this && node.isAncestorOf(this);
  }
};
/**
 * @constructor
 * @alias module:echarts/data/Tree
 * @param {module:echarts/model/Model} hostModel
 * @param {Array.<Object>} levelOptions
 * @param {Object} leavesOption
 */

function Tree(hostModel, levelOptions, leavesOption) {
  /**
   * @type {module:echarts/data/Tree~TreeNode}
   * @readOnly
   */
  this.root;
  /**
   * @type {module:echarts/data/List}
   * @readOnly
   */

  this.data;
  /**
   * Index of each item is the same as the raw index of coresponding list item.
   * @private
   * @type {Array.<module:echarts/data/Tree~TreeNode}
   */

  this._nodes = [];
  /**
   * @private
   * @readOnly
   * @type {module:echarts/model/Model}
   */

  this.hostModel = hostModel;
  /**
   * @private
   * @readOnly
   * @type {Array.<module:echarts/model/Model}
   */

  this.levelModels = zrUtil.map(levelOptions || [], function (levelDefine) {
    return new Model(levelDefine, hostModel, hostModel.ecModel);
  });
  this.leavesModel = new Model(leavesOption || {}, hostModel, hostModel.ecModel);
}

Tree.prototype = {
  constructor: Tree,
  type: 'tree',

  /**
   * Travel this subtree (include this node).
   * Usage:
   *    node.eachNode(function () { ... }); // preorder
   *    node.eachNode('preorder', function () { ... }); // preorder
   *    node.eachNode('postorder', function () { ... }); // postorder
   *    node.eachNode(
   *        {order: 'postorder', attr: 'viewChildren'},
   *        function () { ... }
   *    ); // postorder
   *
   * @param {(Object|string)} options If string, means order.
   * @param {string=} options.order 'preorder' or 'postorder'
   * @param {string=} options.attr 'children' or 'viewChildren'
   * @param {Function} cb
   * @param {Object}   [context]
   */
  eachNode: function (options, cb, context) {
    this.root.eachNode(options, cb, context);
  },

  /**
   * @param {number} dataIndex
   * @return {module:echarts/data/Tree~TreeNode}
   */
  getNodeByDataIndex: function (dataIndex) {
    var rawIndex = this.data.getRawIndex(dataIndex);
    return this._nodes[rawIndex];
  },

  /**
   * @param {string} name
   * @return {module:echarts/data/Tree~TreeNode}
   */
  getNodeByName: function (name) {
    return this.root.getNodeByName(name);
  },

  /**
   * Update item available by list,
   * when list has been performed options like 'filterSelf' or 'map'.
   */
  update: function () {
    var data = this.data;
    var nodes = this._nodes;

    for (var i = 0, len = nodes.length; i < len; i++) {
      nodes[i].dataIndex = -1;
    }

    for (var i = 0, len = data.count(); i < len; i++) {
      nodes[data.getRawIndex(i)].dataIndex = i;
    }
  },

  /**
   * Clear all layouts
   */
  clearLayouts: function () {
    this.data.clearItemLayouts();
  }
};
/**
 * data node format:
 * {
 *     name: ...
 *     value: ...
 *     children: [
 *         {
 *             name: ...
 *             value: ...
 *             children: ...
 *         },
 *         ...
 *     ]
 * }
 *
 * @static
 * @param {Object} dataRoot Root node.
 * @param {module:echarts/model/Model} hostModel
 * @param {Object} treeOptions
 * @param {Array.<Object>} treeOptions.levels
 * @param {Array.<Object>} treeOptions.leaves
 * @return module:echarts/data/Tree
 */

Tree.createTree = function (dataRoot, hostModel, treeOptions, beforeLink) {
  var tree = new Tree(hostModel, treeOptions.levels, treeOptions.leaves);
  var listData = [];
  var dimMax = 1;
  buildHierarchy(dataRoot);

  function buildHierarchy(dataNode, parentNode) {
    var value = dataNode.value;
    dimMax = Math.max(dimMax, zrUtil.isArray(value) ? value.length : 1);
    listData.push(dataNode);
    var node = new TreeNode(dataNode.name, tree);
    parentNode ? addChild(node, parentNode) : tree.root = node;

    tree._nodes.push(node);

    var children = dataNode.children;

    if (children) {
      for (var i = 0; i < children.length; i++) {
        buildHierarchy(children[i], node);
      }
    }
  }

  tree.root.updateDepthAndHeight(0);
  var dimensionsInfo = createDimensions(listData, {
    coordDimensions: ['value'],
    dimensionsCount: dimMax
  });
  var list = new List(dimensionsInfo, hostModel);
  list.initData(listData);
  linkList({
    mainData: list,
    struct: tree,
    structAttr: 'tree'
  });
  tree.update();
  beforeLink && beforeLink(list);
  return tree;
};
/**
 * It is needed to consider the mess of 'list', 'hostModel' when creating a TreeNote,
 * so this function is not ready and not necessary to be public.
 *
 * @param {(module:echarts/data/Tree~TreeNode|Object)} child
 */


function addChild(child, node) {
  var children = node.children;

  if (child.parentNode === node) {
    return;
  }

  children.push(child);
  child.parentNode = node;
}

var _default = Tree;
module.exports = _default;

/***/ }),

/***/ "0f99":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;
var getDataItemValue = _model.getDataItemValue;

var _util = __webpack_require__("6d8b");

var createHashMap = _util.createHashMap;
var each = _util.each;
var map = _util.map;
var isArray = _util.isArray;
var isString = _util.isString;
var isObject = _util.isObject;
var isTypedArray = _util.isTypedArray;
var isArrayLike = _util.isArrayLike;
var extend = _util.extend;
var assert = _util.assert;

var Source = __webpack_require__("ec6f");

var _sourceType = __webpack_require__("93d0");

var SOURCE_FORMAT_ORIGINAL = _sourceType.SOURCE_FORMAT_ORIGINAL;
var SOURCE_FORMAT_ARRAY_ROWS = _sourceType.SOURCE_FORMAT_ARRAY_ROWS;
var SOURCE_FORMAT_OBJECT_ROWS = _sourceType.SOURCE_FORMAT_OBJECT_ROWS;
var SOURCE_FORMAT_KEYED_COLUMNS = _sourceType.SOURCE_FORMAT_KEYED_COLUMNS;
var SOURCE_FORMAT_UNKNOWN = _sourceType.SOURCE_FORMAT_UNKNOWN;
var SOURCE_FORMAT_TYPED_ARRAY = _sourceType.SOURCE_FORMAT_TYPED_ARRAY;
var SERIES_LAYOUT_BY_ROW = _sourceType.SERIES_LAYOUT_BY_ROW;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// The result of `guessOrdinal`.
var BE_ORDINAL = {
  Must: 1,
  // Encounter string but not '-' and not number-like.
  Might: 2,
  // Encounter string but number-like.
  Not: 3 // Other cases

};
var inner = makeInner();
/**
 * @see {module:echarts/data/Source}
 * @param {module:echarts/component/dataset/DatasetModel} datasetModel
 * @return {string} sourceFormat
 */

function detectSourceFormat(datasetModel) {
  var data = datasetModel.option.source;
  var sourceFormat = SOURCE_FORMAT_UNKNOWN;

  if (isTypedArray(data)) {
    sourceFormat = SOURCE_FORMAT_TYPED_ARRAY;
  } else if (isArray(data)) {
    // FIXME Whether tolerate null in top level array?
    if (data.length === 0) {
      sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
    }

    for (var i = 0, len = data.length; i < len; i++) {
      var item = data[i];

      if (item == null) {
        continue;
      } else if (isArray(item)) {
        sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
        break;
      } else if (isObject(item)) {
        sourceFormat = SOURCE_FORMAT_OBJECT_ROWS;
        break;
      }
    }
  } else if (isObject(data)) {
    for (var key in data) {
      if (data.hasOwnProperty(key) && isArrayLike(data[key])) {
        sourceFormat = SOURCE_FORMAT_KEYED_COLUMNS;
        break;
      }
    }
  } else if (data != null) {
    throw new Error('Invalid data');
  }

  inner(datasetModel).sourceFormat = sourceFormat;
}
/**
 * [Scenarios]:
 * (1) Provide source data directly:
 *     series: {
 *         encode: {...},
 *         dimensions: [...]
 *         seriesLayoutBy: 'row',
 *         data: [[...]]
 *     }
 * (2) Refer to datasetModel.
 *     series: [{
 *         encode: {...}
 *         // Ignore datasetIndex means `datasetIndex: 0`
 *         // and the dimensions defination in dataset is used
 *     }, {
 *         encode: {...},
 *         seriesLayoutBy: 'column',
 *         datasetIndex: 1
 *     }]
 *
 * Get data from series itself or datset.
 * @return {module:echarts/data/Source} source
 */


function getSource(seriesModel) {
  return inner(seriesModel).source;
}
/**
 * MUST be called before mergeOption of all series.
 * @param {module:echarts/model/Global} ecModel
 */


function resetSourceDefaulter(ecModel) {
  // `datasetMap` is used to make default encode.
  inner(ecModel).datasetMap = createHashMap();
}
/**
 * [Caution]:
 * MUST be called after series option merged and
 * before "series.getInitailData()" called.
 *
 * [The rule of making default encode]:
 * Category axis (if exists) alway map to the first dimension.
 * Each other axis occupies a subsequent dimension.
 *
 * [Why make default encode]:
 * Simplify the typing of encode in option, avoiding the case like that:
 * series: [{encode: {x: 0, y: 1}}, {encode: {x: 0, y: 2}}, {encode: {x: 0, y: 3}}],
 * where the "y" have to be manually typed as "1, 2, 3, ...".
 *
 * @param {module:echarts/model/Series} seriesModel
 */


function prepareSource(seriesModel) {
  var seriesOption = seriesModel.option;
  var data = seriesOption.data;
  var sourceFormat = isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL;
  var fromDataset = false;
  var seriesLayoutBy = seriesOption.seriesLayoutBy;
  var sourceHeader = seriesOption.sourceHeader;
  var dimensionsDefine = seriesOption.dimensions;
  var datasetModel = getDatasetModel(seriesModel);

  if (datasetModel) {
    var datasetOption = datasetModel.option;
    data = datasetOption.source;
    sourceFormat = inner(datasetModel).sourceFormat;
    fromDataset = true; // These settings from series has higher priority.

    seriesLayoutBy = seriesLayoutBy || datasetOption.seriesLayoutBy;
    sourceHeader == null && (sourceHeader = datasetOption.sourceHeader);
    dimensionsDefine = dimensionsDefine || datasetOption.dimensions;
  }

  var completeResult = completeBySourceData(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine);
  inner(seriesModel).source = new Source({
    data: data,
    fromDataset: fromDataset,
    seriesLayoutBy: seriesLayoutBy,
    sourceFormat: sourceFormat,
    dimensionsDefine: completeResult.dimensionsDefine,
    startIndex: completeResult.startIndex,
    dimensionsDetectCount: completeResult.dimensionsDetectCount,
    // Note: dataset option does not have `encode`.
    encodeDefine: seriesOption.encode
  });
} // return {startIndex, dimensionsDefine, dimensionsCount}


function completeBySourceData(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine) {
  if (!data) {
    return {
      dimensionsDefine: normalizeDimensionsDefine(dimensionsDefine)
    };
  }

  var dimensionsDetectCount;
  var startIndex;

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    // Rule: Most of the first line are string: it is header.
    // Caution: consider a line with 5 string and 1 number,
    // it still can not be sure it is a head, because the
    // 5 string may be 5 values of category columns.
    if (sourceHeader === 'auto' || sourceHeader == null) {
      arrayRowsTravelFirst(function (val) {
        // '-' is regarded as null/undefined.
        if (val != null && val !== '-') {
          if (isString(val)) {
            startIndex == null && (startIndex = 1);
          } else {
            startIndex = 0;
          }
        } // 10 is an experience number, avoid long loop.

      }, seriesLayoutBy, data, 10);
    } else {
      startIndex = sourceHeader ? 1 : 0;
    }

    if (!dimensionsDefine && startIndex === 1) {
      dimensionsDefine = [];
      arrayRowsTravelFirst(function (val, index) {
        dimensionsDefine[index] = val != null ? val : '';
      }, seriesLayoutBy, data);
    }

    dimensionsDetectCount = dimensionsDefine ? dimensionsDefine.length : seriesLayoutBy === SERIES_LAYOUT_BY_ROW ? data.length : data[0] ? data[0].length : null;
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    if (!dimensionsDefine) {
      dimensionsDefine = objectRowsCollectDimensions(data);
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    if (!dimensionsDefine) {
      dimensionsDefine = [];
      each(data, function (colArr, key) {
        dimensionsDefine.push(key);
      });
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var value0 = getDataItemValue(data[0]);
    dimensionsDetectCount = isArray(value0) && value0.length || 1;
  } else if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {}

  return {
    startIndex: startIndex,
    dimensionsDefine: normalizeDimensionsDefine(dimensionsDefine),
    dimensionsDetectCount: dimensionsDetectCount
  };
} // Consider dimensions defined like ['A', 'price', 'B', 'price', 'C', 'price'],
// which is reasonable. But dimension name is duplicated.
// Returns undefined or an array contains only object without null/undefiend or string.


function normalizeDimensionsDefine(dimensionsDefine) {
  if (!dimensionsDefine) {
    // The meaning of null/undefined is different from empty array.
    return;
  }

  var nameMap = createHashMap();
  return map(dimensionsDefine, function (item, index) {
    item = extend({}, isObject(item) ? item : {
      name: item
    }); // User can set null in dimensions.
    // We dont auto specify name, othewise a given name may
    // cause it be refered unexpectedly.

    if (item.name == null) {
      return item;
    } // Also consider number form like 2012.


    item.name += ''; // User may also specify displayName.
    // displayName will always exists except user not
    // specified or dim name is not specified or detected.
    // (A auto generated dim name will not be used as
    // displayName).

    if (item.displayName == null) {
      item.displayName = item.name;
    }

    var exist = nameMap.get(item.name);

    if (!exist) {
      nameMap.set(item.name, {
        count: 1
      });
    } else {
      item.name += '-' + exist.count++;
    }

    return item;
  });
}

function arrayRowsTravelFirst(cb, seriesLayoutBy, data, maxLoop) {
  maxLoop == null && (maxLoop = Infinity);

  if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
    for (var i = 0; i < data.length && i < maxLoop; i++) {
      cb(data[i] ? data[i][0] : null, i);
    }
  } else {
    var value0 = data[0] || [];

    for (var i = 0; i < value0.length && i < maxLoop; i++) {
      cb(value0[i], i);
    }
  }
}

function objectRowsCollectDimensions(data) {
  var firstIndex = 0;
  var obj;

  while (firstIndex < data.length && !(obj = data[firstIndex++])) {} // jshint ignore: line


  if (obj) {
    var dimensions = [];
    each(obj, function (value, key) {
      dimensions.push(key);
    });
    return dimensions;
  }
}
/**
 * [The strategy of the arrengment of data dimensions for dataset]:
 * "value way": all axes are non-category axes. So series one by one take
 *     several (the number is coordSysDims.length) dimensions from dataset.
 *     The result of data arrengment of data dimensions like:
 *     | ser0_x | ser0_y | ser1_x | ser1_y | ser2_x | ser2_y |
 * "category way": at least one axis is category axis. So the the first data
 *     dimension is always mapped to the first category axis and shared by
 *     all of the series. The other data dimensions are taken by series like
 *     "value way" does.
 *     The result of data arrengment of data dimensions like:
 *     | ser_shared_x | ser0_y | ser1_y | ser2_y |
 *
 * @param {Array.<Object|string>} coordDimensions [{name: <string>, type: <string>, dimsDef: <Array>}, ...]
 * @param {module:model/Series} seriesModel
 * @param {module:data/Source} source
 * @return {Object} encode Never be `null/undefined`.
 */


function makeSeriesEncodeForAxisCoordSys(coordDimensions, seriesModel, source) {
  var encode = {};
  var datasetModel = getDatasetModel(seriesModel); // Currently only make default when using dataset, util more reqirements occur.

  if (!datasetModel || !coordDimensions) {
    return encode;
  }

  var encodeItemName = [];
  var encodeSeriesName = [];
  var ecModel = seriesModel.ecModel;
  var datasetMap = inner(ecModel).datasetMap;
  var key = datasetModel.uid + '_' + source.seriesLayoutBy;
  var baseCategoryDimIndex;
  var categoryWayValueDimStart;
  coordDimensions = coordDimensions.slice();
  each(coordDimensions, function (coordDimInfo, coordDimIdx) {
    !isObject(coordDimInfo) && (coordDimensions[coordDimIdx] = {
      name: coordDimInfo
    });

    if (coordDimInfo.type === 'ordinal' && baseCategoryDimIndex == null) {
      baseCategoryDimIndex = coordDimIdx;
      categoryWayValueDimStart = getDataDimCountOnCoordDim(coordDimensions[coordDimIdx]);
    }

    encode[coordDimInfo.name] = [];
  });
  var datasetRecord = datasetMap.get(key) || datasetMap.set(key, {
    categoryWayDim: categoryWayValueDimStart,
    valueWayDim: 0
  }); // TODO
  // Auto detect first time axis and do arrangement.

  each(coordDimensions, function (coordDimInfo, coordDimIdx) {
    var coordDimName = coordDimInfo.name;
    var count = getDataDimCountOnCoordDim(coordDimInfo); // In value way.

    if (baseCategoryDimIndex == null) {
      var start = datasetRecord.valueWayDim;
      pushDim(encode[coordDimName], start, count);
      pushDim(encodeSeriesName, start, count);
      datasetRecord.valueWayDim += count; // ??? TODO give a better default series name rule?
      // especially when encode x y specified.
      // consider: when mutiple series share one dimension
      // category axis, series name should better use
      // the other dimsion name. On the other hand, use
      // both dimensions name.
    } // In category way, the first category axis.
    else if (baseCategoryDimIndex === coordDimIdx) {
        pushDim(encode[coordDimName], 0, count);
        pushDim(encodeItemName, 0, count);
      } // In category way, the other axis.
      else {
          var start = datasetRecord.categoryWayDim;
          pushDim(encode[coordDimName], start, count);
          pushDim(encodeSeriesName, start, count);
          datasetRecord.categoryWayDim += count;
        }
  });

  function pushDim(dimIdxArr, idxFrom, idxCount) {
    for (var i = 0; i < idxCount; i++) {
      dimIdxArr.push(idxFrom + i);
    }
  }

  function getDataDimCountOnCoordDim(coordDimInfo) {
    var dimsDef = coordDimInfo.dimsDef;
    return dimsDef ? dimsDef.length : 1;
  }

  encodeItemName.length && (encode.itemName = encodeItemName);
  encodeSeriesName.length && (encode.seriesName = encodeSeriesName);
  return encode;
}
/**
 * Work for data like [{name: ..., value: ...}, ...].
 *
 * @param {module:model/Series} seriesModel
 * @param {module:data/Source} source
 * @return {Object} encode Never be `null/undefined`.
 */


function makeSeriesEncodeForNameBased(seriesModel, source, dimCount) {
  var encode = {};
  var datasetModel = getDatasetModel(seriesModel); // Currently only make default when using dataset, util more reqirements occur.

  if (!datasetModel) {
    return encode;
  }

  var sourceFormat = source.sourceFormat;
  var dimensionsDefine = source.dimensionsDefine;
  var potentialNameDimIndex;

  if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS || sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    each(dimensionsDefine, function (dim, idx) {
      if ((isObject(dim) ? dim.name : dim) === 'name') {
        potentialNameDimIndex = idx;
      }
    });
  } // idxResult: {v, n}.


  var idxResult = function () {
    var idxRes0 = {};
    var idxRes1 = {};
    var guessRecords = []; // 5 is an experience value.

    for (var i = 0, len = Math.min(5, dimCount); i < len; i++) {
      var guessResult = doGuessOrdinal(source.data, sourceFormat, source.seriesLayoutBy, dimensionsDefine, source.startIndex, i);
      guessRecords.push(guessResult);
      var isPureNumber = guessResult === BE_ORDINAL.Not; // [Strategy of idxRes0]: find the first BE_ORDINAL.Not as the value dim,
      // and then find a name dim with the priority:
      // "BE_ORDINAL.Might|BE_ORDINAL.Must" > "other dim" > "the value dim itself".

      if (isPureNumber && idxRes0.v == null && i !== potentialNameDimIndex) {
        idxRes0.v = i;
      }

      if (idxRes0.n == null || idxRes0.n === idxRes0.v || !isPureNumber && guessRecords[idxRes0.n] === BE_ORDINAL.Not) {
        idxRes0.n = i;
      }

      if (fulfilled(idxRes0) && guessRecords[idxRes0.n] !== BE_ORDINAL.Not) {
        return idxRes0;
      } // [Strategy of idxRes1]: if idxRes0 not satisfied (that is, no BE_ORDINAL.Not),
      // find the first BE_ORDINAL.Might as the value dim,
      // and then find a name dim with the priority:
      // "other dim" > "the value dim itself".
      // That is for backward compat: number-like (e.g., `'3'`, `'55'`) can be
      // treated as number.


      if (!isPureNumber) {
        if (guessResult === BE_ORDINAL.Might && idxRes1.v == null && i !== potentialNameDimIndex) {
          idxRes1.v = i;
        }

        if (idxRes1.n == null || idxRes1.n === idxRes1.v) {
          idxRes1.n = i;
        }
      }
    }

    function fulfilled(idxResult) {
      return idxResult.v != null && idxResult.n != null;
    }

    return fulfilled(idxRes0) ? idxRes0 : fulfilled(idxRes1) ? idxRes1 : null;
  }();

  if (idxResult) {
    encode.value = idxResult.v; // `potentialNameDimIndex` has highest priority.

    var nameDimIndex = potentialNameDimIndex != null ? potentialNameDimIndex : idxResult.n; // By default, label use itemName in charts.
    // So we dont set encodeLabel here.

    encode.itemName = [nameDimIndex];
    encode.seriesName = [nameDimIndex];
  }

  return encode;
}
/**
 * If return null/undefined, indicate that should not use datasetModel.
 */


function getDatasetModel(seriesModel) {
  var option = seriesModel.option; // Caution: consider the scenario:
  // A dataset is declared and a series is not expected to use the dataset,
  // and at the beginning `setOption({series: { noData })` (just prepare other
  // option but no data), then `setOption({series: {data: [...]}); In this case,
  // the user should set an empty array to avoid that dataset is used by default.

  var thisData = option.data;

  if (!thisData) {
    return seriesModel.ecModel.getComponent('dataset', option.datasetIndex || 0);
  }
}
/**
 * The rule should not be complex, otherwise user might not
 * be able to known where the data is wrong.
 * The code is ugly, but how to make it neat?
 *
 * @param {module:echars/data/Source} source
 * @param {number} dimIndex
 * @return {BE_ORDINAL} guess result.
 */


function guessOrdinal(source, dimIndex) {
  return doGuessOrdinal(source.data, source.sourceFormat, source.seriesLayoutBy, source.dimensionsDefine, source.startIndex, dimIndex);
} // dimIndex may be overflow source data.
// return {BE_ORDINAL}


function doGuessOrdinal(data, sourceFormat, seriesLayoutBy, dimensionsDefine, startIndex, dimIndex) {
  var result; // Experience value.

  var maxLoop = 5;

  if (isTypedArray(data)) {
    return BE_ORDINAL.Not;
  } // When sourceType is 'objectRows' or 'keyedColumns', dimensionsDefine
  // always exists in source.


  var dimName;
  var dimType;

  if (dimensionsDefine) {
    var dimDefItem = dimensionsDefine[dimIndex];

    if (isObject(dimDefItem)) {
      dimName = dimDefItem.name;
      dimType = dimDefItem.type;
    } else if (isString(dimDefItem)) {
      dimName = dimDefItem;
    }
  }

  if (dimType != null) {
    return dimType === 'ordinal' ? BE_ORDINAL.Must : BE_ORDINAL.Not;
  }

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
      var sample = data[dimIndex];

      for (var i = 0; i < (sample || []).length && i < maxLoop; i++) {
        if ((result = detectValue(sample[startIndex + i])) != null) {
          return result;
        }
      }
    } else {
      for (var i = 0; i < data.length && i < maxLoop; i++) {
        var row = data[startIndex + i];

        if (row && (result = detectValue(row[dimIndex])) != null) {
          return result;
        }
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    if (!dimName) {
      return BE_ORDINAL.Not;
    }

    for (var i = 0; i < data.length && i < maxLoop; i++) {
      var item = data[i];

      if (item && (result = detectValue(item[dimName])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    if (!dimName) {
      return BE_ORDINAL.Not;
    }

    var sample = data[dimName];

    if (!sample || isTypedArray(sample)) {
      return BE_ORDINAL.Not;
    }

    for (var i = 0; i < sample.length && i < maxLoop; i++) {
      if ((result = detectValue(sample[i])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    for (var i = 0; i < data.length && i < maxLoop; i++) {
      var item = data[i];
      var val = getDataItemValue(item);

      if (!isArray(val)) {
        return BE_ORDINAL.Not;
      }

      if ((result = detectValue(val[dimIndex])) != null) {
        return result;
      }
    }
  }

  function detectValue(val) {
    var beStr = isString(val); // Consider usage convenience, '1', '2' will be treated as "number".
    // `isFinit('')` get `true`.

    if (val != null && isFinite(val) && val !== '') {
      return beStr ? BE_ORDINAL.Might : BE_ORDINAL.Not;
    } else if (beStr && val !== '-') {
      return BE_ORDINAL.Must;
    }
  }

  return BE_ORDINAL.Not;
}

exports.BE_ORDINAL = BE_ORDINAL;
exports.detectSourceFormat = detectSourceFormat;
exports.getSource = getSource;
exports.resetSourceDefaulter = resetSourceDefaulter;
exports.prepareSource = prepareSource;
exports.makeSeriesEncodeForAxisCoordSys = makeSeriesEncodeForAxisCoordSys;
exports.makeSeriesEncodeForNameBased = makeSeriesEncodeForNameBased;
exports.guessOrdinal = guessOrdinal;

/***/ }),

/***/ "2b17":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var _util = __webpack_require__("6d8b");

var isTypedArray = _util.isTypedArray;
var extend = _util.extend;
var assert = _util.assert;
var each = _util.each;
var isObject = _util.isObject;

var _model = __webpack_require__("e0d3");

var getDataItemValue = _model.getDataItemValue;
var isDataItemOption = _model.isDataItemOption;

var _number = __webpack_require__("3842");

var parseDate = _number.parseDate;

var Source = __webpack_require__("ec6f");

var _sourceType = __webpack_require__("93d0");

var SOURCE_FORMAT_TYPED_ARRAY = _sourceType.SOURCE_FORMAT_TYPED_ARRAY;
var SOURCE_FORMAT_ARRAY_ROWS = _sourceType.SOURCE_FORMAT_ARRAY_ROWS;
var SOURCE_FORMAT_ORIGINAL = _sourceType.SOURCE_FORMAT_ORIGINAL;
var SOURCE_FORMAT_OBJECT_ROWS = _sourceType.SOURCE_FORMAT_OBJECT_ROWS;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// TODO
// ??? refactor? check the outer usage of data provider.
// merge with defaultDimValueGetter?

/**
 * If normal array used, mutable chunk size is supported.
 * If typed array used, chunk size must be fixed.
 */
function DefaultDataProvider(source, dimSize) {
  if (!Source.isInstance(source)) {
    source = Source.seriesDataToSource(source);
  }

  this._source = source;
  var data = this._data = source.data;
  var sourceFormat = source.sourceFormat; // Typed array. TODO IE10+?

  if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
    this._offset = 0;
    this._dimSize = dimSize;
    this._data = data;
  }

  var methods = providerMethods[sourceFormat === SOURCE_FORMAT_ARRAY_ROWS ? sourceFormat + '_' + source.seriesLayoutBy : sourceFormat];
  extend(this, methods);
}

var providerProto = DefaultDataProvider.prototype; // If data is pure without style configuration

providerProto.pure = false; // If data is persistent and will not be released after use.

providerProto.persistent = true; // ???! FIXME legacy data provider do not has method getSource

providerProto.getSource = function () {
  return this._source;
};

var providerMethods = {
  'arrayRows_column': {
    pure: true,
    count: function () {
      return Math.max(0, this._data.length - this._source.startIndex);
    },
    getItem: function (idx) {
      return this._data[idx + this._source.startIndex];
    },
    appendData: appendDataSimply
  },
  'arrayRows_row': {
    pure: true,
    count: function () {
      var row = this._data[0];
      return row ? Math.max(0, row.length - this._source.startIndex) : 0;
    },
    getItem: function (idx) {
      idx += this._source.startIndex;
      var item = [];
      var data = this._data;

      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        item.push(row ? row[idx] : null);
      }

      return item;
    },
    appendData: function () {
      throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
    }
  },
  'objectRows': {
    pure: true,
    count: countSimply,
    getItem: getItemSimply,
    appendData: appendDataSimply
  },
  'keyedColumns': {
    pure: true,
    count: function () {
      var dimName = this._source.dimensionsDefine[0].name;
      var col = this._data[dimName];
      return col ? col.length : 0;
    },
    getItem: function (idx) {
      var item = [];
      var dims = this._source.dimensionsDefine;

      for (var i = 0; i < dims.length; i++) {
        var col = this._data[dims[i].name];
        item.push(col ? col[idx] : null);
      }

      return item;
    },
    appendData: function (newData) {
      var data = this._data;
      each(newData, function (newCol, key) {
        var oldCol = data[key] || (data[key] = []);

        for (var i = 0; i < (newCol || []).length; i++) {
          oldCol.push(newCol[i]);
        }
      });
    }
  },
  'original': {
    count: countSimply,
    getItem: getItemSimply,
    appendData: appendDataSimply
  },
  'typedArray': {
    persistent: false,
    pure: true,
    count: function () {
      return this._data ? this._data.length / this._dimSize : 0;
    },
    getItem: function (idx, out) {
      idx = idx - this._offset;
      out = out || [];
      var offset = this._dimSize * idx;

      for (var i = 0; i < this._dimSize; i++) {
        out[i] = this._data[offset + i];
      }

      return out;
    },
    appendData: function (newData) {
      this._data = newData;
    },
    // Clean self if data is already used.
    clean: function () {
      // PENDING
      this._offset += this.count();
      this._data = null;
    }
  }
};

function countSimply() {
  return this._data.length;
}

function getItemSimply(idx) {
  return this._data[idx];
}

function appendDataSimply(newData) {
  for (var i = 0; i < newData.length; i++) {
    this._data.push(newData[i]);
  }
}

var rawValueGetters = {
  arrayRows: getRawValueSimply,
  objectRows: function (dataItem, dataIndex, dimIndex, dimName) {
    return dimIndex != null ? dataItem[dimName] : dataItem;
  },
  keyedColumns: getRawValueSimply,
  original: function (dataItem, dataIndex, dimIndex, dimName) {
    // FIXME
    // In some case (markpoint in geo (geo-map.html)), dataItem
    // is {coord: [...]}
    var value = getDataItemValue(dataItem);
    return dimIndex == null || !(value instanceof Array) ? value : value[dimIndex];
  },
  typedArray: getRawValueSimply
};

function getRawValueSimply(dataItem, dataIndex, dimIndex, dimName) {
  return dimIndex != null ? dataItem[dimIndex] : dataItem;
}

var defaultDimValueGetters = {
  arrayRows: getDimValueSimply,
  objectRows: function (dataItem, dimName, dataIndex, dimIndex) {
    return converDataValue(dataItem[dimName], this._dimensionInfos[dimName]);
  },
  keyedColumns: getDimValueSimply,
  original: function (dataItem, dimName, dataIndex, dimIndex) {
    // Performance sensitive, do not use modelUtil.getDataItemValue.
    // If dataItem is an plain object with no value field, the var `value`
    // will be assigned with the object, but it will be tread correctly
    // in the `convertDataValue`.
    var value = dataItem && (dataItem.value == null ? dataItem : dataItem.value); // If any dataItem is like { value: 10 }

    if (!this._rawData.pure && isDataItemOption(dataItem)) {
      this.hasItemOption = true;
    }

    return converDataValue(value instanceof Array ? value[dimIndex] // If value is a single number or something else not array.
    : value, this._dimensionInfos[dimName]);
  },
  typedArray: function (dataItem, dimName, dataIndex, dimIndex) {
    return dataItem[dimIndex];
  }
};

function getDimValueSimply(dataItem, dimName, dataIndex, dimIndex) {
  return converDataValue(dataItem[dimIndex], this._dimensionInfos[dimName]);
}
/**
 * This helper method convert value in data.
 * @param {string|number|Date} value
 * @param {Object|string} [dimInfo] If string (like 'x'), dimType defaults 'number'.
 *        If "dimInfo.ordinalParseAndSave", ordinal value can be parsed.
 */


function converDataValue(value, dimInfo) {
  // Performance sensitive.
  var dimType = dimInfo && dimInfo.type;

  if (dimType === 'ordinal') {
    // If given value is a category string
    var ordinalMeta = dimInfo && dimInfo.ordinalMeta;
    return ordinalMeta ? ordinalMeta.parseAndCollect(value) : value;
  }

  if (dimType === 'time' // spead up when using timestamp
  && typeof value !== 'number' && value != null && value !== '-') {
    value = +parseDate(value);
  } // dimType defaults 'number'.
  // If dimType is not ordinal and value is null or undefined or NaN or '-',
  // parse to NaN.


  return value == null || value === '' ? NaN // If string (like '-'), using '+' parse to NaN
  // If object, also parse to NaN
  : +value;
} // ??? FIXME can these logic be more neat: getRawValue, getRawDataItem,
// Consider persistent.
// Caution: why use raw value to display on label or tooltip?
// A reason is to avoid format. For example time value we do not know
// how to format is expected. More over, if stack is used, calculated
// value may be 0.91000000001, which have brings trouble to display.
// TODO: consider how to treat null/undefined/NaN when display?

/**
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @param {string|number} [dim] dimName or dimIndex
 * @return {Array.<number>|string|number} can be null/undefined.
 */


function retrieveRawValue(data, dataIndex, dim) {
  if (!data) {
    return;
  } // Consider data may be not persistent.


  var dataItem = data.getRawDataItem(dataIndex);

  if (dataItem == null) {
    return;
  }

  var sourceFormat = data.getProvider().getSource().sourceFormat;
  var dimName;
  var dimIndex;
  var dimInfo = data.getDimensionInfo(dim);

  if (dimInfo) {
    dimName = dimInfo.name;
    dimIndex = dimInfo.index;
  }

  return rawValueGetters[sourceFormat](dataItem, dataIndex, dimIndex, dimName);
}
/**
 * Compatible with some cases (in pie, map) like:
 * data: [{name: 'xx', value: 5, selected: true}, ...]
 * where only sourceFormat is 'original' and 'objectRows' supported.
 *
 * ??? TODO
 * Supported detail options in data item when using 'arrayRows'.
 *
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @param {string} attr like 'selected'
 */


function retrieveRawAttr(data, dataIndex, attr) {
  if (!data) {
    return;
  }

  var sourceFormat = data.getProvider().getSource().sourceFormat;

  if (sourceFormat !== SOURCE_FORMAT_ORIGINAL && sourceFormat !== SOURCE_FORMAT_OBJECT_ROWS) {
    return;
  }

  var dataItem = data.getRawDataItem(dataIndex);

  if (sourceFormat === SOURCE_FORMAT_ORIGINAL && !isObject(dataItem)) {
    dataItem = null;
  }

  if (dataItem) {
    return dataItem[attr];
  }
}

exports.DefaultDataProvider = DefaultDataProvider;
exports.defaultDimValueGetters = defaultDimValueGetters;
exports.retrieveRawValue = retrieveRawValue;
exports.retrieveRawAttr = retrieveRawAttr;

/***/ }),

/***/ "2f45":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__("6d8b");

var each = _util.each;
var createHashMap = _util.createHashMap;
var assert = _util.assert;

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var OTHER_DIMENSIONS = createHashMap(['tooltip', 'label', 'itemName', 'itemId', 'seriesName']);

function summarizeDimensions(data) {
  var summary = {};
  var encode = summary.encode = {};
  var notExtraCoordDimMap = createHashMap();
  var defaultedLabel = [];
  var defaultedTooltip = []; // See the comment of `List.js#userOutput`.

  var userOutput = summary.userOutput = {
    dimensionNames: data.dimensions.slice(),
    encode: {}
  };
  each(data.dimensions, function (dimName) {
    var dimItem = data.getDimensionInfo(dimName);
    var coordDim = dimItem.coordDim;

    if (coordDim) {
      var coordDimIndex = dimItem.coordDimIndex;
      getOrCreateEncodeArr(encode, coordDim)[coordDimIndex] = dimName;

      if (!dimItem.isExtraCoord) {
        notExtraCoordDimMap.set(coordDim, 1); // Use the last coord dim (and label friendly) as default label,
        // because when dataset is used, it is hard to guess which dimension
        // can be value dimension. If both show x, y on label is not look good,
        // and conventionally y axis is focused more.

        if (mayLabelDimType(dimItem.type)) {
          defaultedLabel[0] = dimName;
        } // User output encode do not contain generated coords.
        // And it only has index. User can use index to retrieve value from the raw item array.


        getOrCreateEncodeArr(userOutput.encode, coordDim)[coordDimIndex] = dimItem.index;
      }

      if (dimItem.defaultTooltip) {
        defaultedTooltip.push(dimName);
      }
    }

    OTHER_DIMENSIONS.each(function (v, otherDim) {
      var encodeArr = getOrCreateEncodeArr(encode, otherDim);
      var dimIndex = dimItem.otherDims[otherDim];

      if (dimIndex != null && dimIndex !== false) {
        encodeArr[dimIndex] = dimItem.name;
      }
    });
  });
  var dataDimsOnCoord = [];
  var encodeFirstDimNotExtra = {};
  notExtraCoordDimMap.each(function (v, coordDim) {
    var dimArr = encode[coordDim]; // ??? FIXME extra coord should not be set in dataDimsOnCoord.
    // But should fix the case that radar axes: simplify the logic
    // of `completeDimension`, remove `extraPrefix`.

    encodeFirstDimNotExtra[coordDim] = dimArr[0]; // Not necessary to remove duplicate, because a data
    // dim canot on more than one coordDim.

    dataDimsOnCoord = dataDimsOnCoord.concat(dimArr);
  });
  summary.dataDimsOnCoord = dataDimsOnCoord;
  summary.encodeFirstDimNotExtra = encodeFirstDimNotExtra;
  var encodeLabel = encode.label; // FIXME `encode.label` is not recommanded, because formatter can not be set
  // in this way. Use label.formatter instead. May be remove this approach someday.

  if (encodeLabel && encodeLabel.length) {
    defaultedLabel = encodeLabel.slice();
  }

  var encodeTooltip = encode.tooltip;

  if (encodeTooltip && encodeTooltip.length) {
    defaultedTooltip = encodeTooltip.slice();
  } else if (!defaultedTooltip.length) {
    defaultedTooltip = defaultedLabel.slice();
  }

  encode.defaultedLabel = defaultedLabel;
  encode.defaultedTooltip = defaultedTooltip;
  return summary;
}

function getOrCreateEncodeArr(encode, dim) {
  if (!encode.hasOwnProperty(dim)) {
    encode[dim] = [];
  }

  return encode[dim];
}

function getDimensionTypeByAxis(axisType) {
  return axisType === 'category' ? 'ordinal' : axisType === 'time' ? 'time' : 'float';
}

function mayLabelDimType(dimType) {
  // In most cases, ordinal and time do not suitable for label.
  // Ordinal info can be displayed on axis. Time is too long.
  return !(dimType === 'ordinal' || dimType === 'time');
} // function findTheLastDimMayLabel(data) {
//     // Get last value dim
//     var dimensions = data.dimensions.slice();
//     var valueType;
//     var valueDim;
//     while (dimensions.length && (
//         valueDim = dimensions.pop(),
//         valueType = data.getDimensionInfo(valueDim).type,
//         valueType === 'ordinal' || valueType === 'time'
//     )) {} // jshint ignore:line
//     return valueDim;
// }


exports.OTHER_DIMENSIONS = OTHER_DIMENSIONS;
exports.summarizeDimensions = summarizeDimensions;
exports.getDimensionTypeByAxis = getDimensionTypeByAxis;

/***/ }),

/***/ "31d9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__("6d8b");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Link lists and struct (graph or tree)
 */
var each = zrUtil.each;
var DATAS = '\0__link_datas';
var MAIN_DATA = '\0__link_mainData'; // Caution:
// In most case, either list or its shallow clones (see list.cloneShallow)
// is active in echarts process. So considering heap memory consumption,
// we do not clone tree or graph, but share them among list and its shallow clones.
// But in some rare case, we have to keep old list (like do animation in chart). So
// please take care that both the old list and the new list share the same tree/graph.

/**
 * @param {Object} opt
 * @param {module:echarts/data/List} opt.mainData
 * @param {Object} [opt.struct] For example, instance of Graph or Tree.
 * @param {string} [opt.structAttr] designation: list[structAttr] = struct;
 * @param {Object} [opt.datas] {dataType: data},
 *                 like: {node: nodeList, edge: edgeList}.
 *                 Should contain mainData.
 * @param {Object} [opt.datasAttr] {dataType: attr},
 *                 designation: struct[datasAttr[dataType]] = list;
 */

function linkList(opt) {
  var mainData = opt.mainData;
  var datas = opt.datas;

  if (!datas) {
    datas = {
      main: mainData
    };
    opt.datasAttr = {
      main: 'data'
    };
  }

  opt.datas = opt.mainData = null;
  linkAll(mainData, datas, opt); // Porxy data original methods.

  each(datas, function (data) {
    each(mainData.TRANSFERABLE_METHODS, function (methodName) {
      data.wrapMethod(methodName, zrUtil.curry(transferInjection, opt));
    });
  }); // Beyond transfer, additional features should be added to `cloneShallow`.

  mainData.wrapMethod('cloneShallow', zrUtil.curry(cloneShallowInjection, opt)); // Only mainData trigger change, because struct.update may trigger
  // another changable methods, which may bring about dead lock.

  each(mainData.CHANGABLE_METHODS, function (methodName) {
    mainData.wrapMethod(methodName, zrUtil.curry(changeInjection, opt));
  }); // Make sure datas contains mainData.

  zrUtil.assert(datas[mainData.dataType] === mainData);
}

function transferInjection(opt, res) {
  if (isMainData(this)) {
    // Transfer datas to new main data.
    var datas = zrUtil.extend({}, this[DATAS]);
    datas[this.dataType] = res;
    linkAll(res, datas, opt);
  } else {
    // Modify the reference in main data to point newData.
    linkSingle(res, this.dataType, this[MAIN_DATA], opt);
  }

  return res;
}

function changeInjection(opt, res) {
  opt.struct && opt.struct.update(this);
  return res;
}

function cloneShallowInjection(opt, res) {
  // cloneShallow, which brings about some fragilities, may be inappropriate
  // to be exposed as an API. So for implementation simplicity we can make
  // the restriction that cloneShallow of not-mainData should not be invoked
  // outside, but only be invoked here.
  each(res[DATAS], function (data, dataType) {
    data !== res && linkSingle(data.cloneShallow(), dataType, res, opt);
  });
  return res;
}
/**
 * Supplement method to List.
 *
 * @public
 * @param {string} [dataType] If not specified, return mainData.
 * @return {module:echarts/data/List}
 */


function getLinkedData(dataType) {
  var mainData = this[MAIN_DATA];
  return dataType == null || mainData == null ? mainData : mainData[DATAS][dataType];
}

function isMainData(data) {
  return data[MAIN_DATA] === data;
}

function linkAll(mainData, datas, opt) {
  mainData[DATAS] = {};
  each(datas, function (data, dataType) {
    linkSingle(data, dataType, mainData, opt);
  });
}

function linkSingle(data, dataType, mainData, opt) {
  mainData[DATAS][dataType] = data;
  data[MAIN_DATA] = mainData;
  data.dataType = dataType;

  if (opt.struct) {
    data[opt.structAttr] = opt.struct;
    opt.struct[opt.datasAttr[dataType]] = data;
  } // Supplement method.


  data.getLinkedData = getLinkedData;
}

var _default = linkList;
module.exports = _default;

/***/ }),

/***/ "562e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__("6d8b");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @class
 * @param {Object|DataDimensionInfo} [opt] All of the fields will be shallow copied.
 */
function DataDimensionInfo(opt) {
  if (opt != null) {
    zrUtil.extend(this, opt);
  }
  /**
   * Dimension name.
   * Mandatory.
   * @type {string}
   */
  // this.name;

  /**
   * The origin name in dimsDef, see source helper.
   * If displayName given, the tooltip will displayed vertically.
   * Optional.
   * @type {string}
   */
  // this.displayName;

  /**
   * Which coordSys dimension this dimension mapped to.
   * A `coordDim` can be a "coordSysDim" that the coordSys required
   * (for example, an item in `coordSysDims` of `model/referHelper#CoordSysInfo`),
   * or an generated "extra coord name" if does not mapped to any "coordSysDim"
   * (That is determined by whether `isExtraCoord` is `true`).
   * Mandatory.
   * @type {string}
   */
  // this.coordDim;

  /**
   * The index of this dimension in `series.encode[coordDim]`.
   * Mandatory.
   * @type {number}
   */
  // this.coordDimIndex;

  /**
   * Dimension type. The enumerable values are the key of
   * `dataCtors` of `data/List`.
   * Optional.
   * @type {string}
   */
  // this.type;

  /**
   * This index of this dimension info in `data/List#_dimensionInfos`.
   * Mandatory after added to `data/List`.
   * @type {number}
   */
  // this.index;

  /**
   * The format of `otherDims` is:
   * ```js
   * {
   *     tooltip: number optional,
   *     label: number optional,
   *     itemName: number optional,
   *     seriesName: number optional,
   * }
   * ```
   *
   * A `series.encode` can specified these fields:
   * ```js
   * encode: {
   *     // "3, 1, 5" is the index of data dimension.
   *     tooltip: [3, 1, 5],
   *     label: [0, 3],
   *     ...
   * }
   * ```
   * `otherDims` is the parse result of the `series.encode` above, like:
   * ```js
   * // Suppose the index of this data dimension is `3`.
   * this.otherDims = {
   *     // `3` is at the index `0` of the `encode.tooltip`
   *     tooltip: 0,
   *     // `3` is at the index `1` of the `encode.tooltip`
   *     label: 1
   * };
   * ```
   *
   * This prop should never be `null`/`undefined` after initialized.
   * @type {Object}
   */


  this.otherDims = {};
  /**
   * Be `true` if this dimension is not mapped to any "coordSysDim" that the
   * "coordSys" required.
   * Mandatory.
   * @type {boolean}
   */
  // this.isExtraCoord;

  /**
   * @type {module:data/OrdinalMeta}
   */
  // this.ordinalMeta;

  /**
   * Whether to create inverted indices.
   * @type {boolean}
   */
  // this.createInvertedIndices;
}

;
var _default = DataDimensionInfo;
module.exports = _default;

/***/ }),

/***/ "6179":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__("6d8b");

var Model = __webpack_require__("4319");

var DataDiffer = __webpack_require__("80f0");

var Source = __webpack_require__("ec6f");

var _dataProvider = __webpack_require__("2b17");

var defaultDimValueGetters = _dataProvider.defaultDimValueGetters;
var DefaultDataProvider = _dataProvider.DefaultDataProvider;

var _dimensionHelper = __webpack_require__("2f45");

var summarizeDimensions = _dimensionHelper.summarizeDimensions;

var DataDimensionInfo = __webpack_require__("562e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/* global Float64Array, Int32Array, Uint32Array, Uint16Array */

/**
 * List for data storage
 * @module echarts/data/List
 */
var isObject = zrUtil.isObject;
var UNDEFINED = 'undefined';
var INDEX_NOT_FOUND = -1; // Use prefix to avoid index to be the same as otherIdList[idx],
// which will cause weird udpate animation.

var ID_PREFIX = 'e\0\0';
var dataCtors = {
  'float': typeof Float64Array === UNDEFINED ? Array : Float64Array,
  'int': typeof Int32Array === UNDEFINED ? Array : Int32Array,
  // Ordinal data type can be string or int
  'ordinal': Array,
  'number': Array,
  'time': Array
}; // Caution: MUST not use `new CtorUint32Array(arr, 0, len)`, because the Ctor of array is
// different from the Ctor of typed array.

var CtorUint32Array = typeof Uint32Array === UNDEFINED ? Array : Uint32Array;
var CtorInt32Array = typeof Int32Array === UNDEFINED ? Array : Int32Array;
var CtorUint16Array = typeof Uint16Array === UNDEFINED ? Array : Uint16Array;

function getIndicesCtor(list) {
  // The possible max value in this._indicies is always this._rawCount despite of filtering.
  return list._rawCount > 65535 ? CtorUint32Array : CtorUint16Array;
}

function cloneChunk(originalChunk) {
  var Ctor = originalChunk.constructor; // Only shallow clone is enough when Array.

  return Ctor === Array ? originalChunk.slice() : new Ctor(originalChunk);
}

var TRANSFERABLE_PROPERTIES = ['hasItemOption', '_nameList', '_idList', '_invertedIndicesMap', '_rawData', '_chunkSize', '_chunkCount', '_dimValueGetter', '_count', '_rawCount', '_nameDimIdx', '_idDimIdx'];
var CLONE_PROPERTIES = ['_extent', '_approximateExtent', '_rawExtent'];

function transferProperties(target, source) {
  zrUtil.each(TRANSFERABLE_PROPERTIES.concat(source.__wrappedMethods || []), function (propName) {
    if (source.hasOwnProperty(propName)) {
      target[propName] = source[propName];
    }
  });
  target.__wrappedMethods = source.__wrappedMethods;
  zrUtil.each(CLONE_PROPERTIES, function (propName) {
    target[propName] = zrUtil.clone(source[propName]);
  });
  target._calculationInfo = zrUtil.extend(source._calculationInfo);
}
/**
 * @constructor
 * @alias module:echarts/data/List
 *
 * @param {Array.<string|Object|module:data/DataDimensionInfo>} dimensions
 *      For example, ['someDimName', {name: 'someDimName', type: 'someDimType'}, ...].
 *      Dimensions should be concrete names like x, y, z, lng, lat, angle, radius
 * @param {module:echarts/model/Model} hostModel
 */


var List = function (dimensions, hostModel) {
  dimensions = dimensions || ['x', 'y'];
  var dimensionInfos = {};
  var dimensionNames = [];
  var invertedIndicesMap = {};

  for (var i = 0; i < dimensions.length; i++) {
    // Use the original dimensions[i], where other flag props may exists.
    var dimensionInfo = dimensions[i];

    if (zrUtil.isString(dimensionInfo)) {
      dimensionInfo = new DataDimensionInfo({
        name: dimensionInfo
      });
    } else if (!(dimensionInfo instanceof DataDimensionInfo)) {
      dimensionInfo = new DataDimensionInfo(dimensionInfo);
    }

    var dimensionName = dimensionInfo.name;
    dimensionInfo.type = dimensionInfo.type || 'float';

    if (!dimensionInfo.coordDim) {
      dimensionInfo.coordDim = dimensionName;
      dimensionInfo.coordDimIndex = 0;
    }

    dimensionInfo.otherDims = dimensionInfo.otherDims || {};
    dimensionNames.push(dimensionName);
    dimensionInfos[dimensionName] = dimensionInfo;
    dimensionInfo.index = i;

    if (dimensionInfo.createInvertedIndices) {
      invertedIndicesMap[dimensionName] = [];
    }
  }
  /**
   * @readOnly
   * @type {Array.<string>}
   */


  this.dimensions = dimensionNames;
  /**
   * Infomation of each data dimension, like data type.
   * @type {Object}
   */

  this._dimensionInfos = dimensionInfos;
  /**
   * @type {module:echarts/model/Model}
   */

  this.hostModel = hostModel;
  /**
   * @type {module:echarts/model/Model}
   */

  this.dataType;
  /**
   * Indices stores the indices of data subset after filtered.
   * This data subset will be used in chart.
   * @type {Array.<number>}
   * @readOnly
   */

  this._indices = null;
  this._count = 0;
  this._rawCount = 0;
  /**
   * Data storage
   * @type {Object.<key, Array.<TypedArray|Array>>}
   * @private
   */

  this._storage = {};
  /**
   * @type {Array.<string>}
   */

  this._nameList = [];
  /**
   * @type {Array.<string>}
   */

  this._idList = [];
  /**
   * Models of data option is stored sparse for optimizing memory cost
   * @type {Array.<module:echarts/model/Model>}
   * @private
   */

  this._optionModels = [];
  /**
   * Global visual properties after visual coding
   * @type {Object}
   * @private
   */

  this._visual = {};
  /**
   * Globel layout properties.
   * @type {Object}
   * @private
   */

  this._layout = {};
  /**
   * Item visual properties after visual coding
   * @type {Array.<Object>}
   * @private
   */

  this._itemVisuals = [];
  /**
   * Key: visual type, Value: boolean
   * @type {Object}
   * @readOnly
   */

  this.hasItemVisual = {};
  /**
   * Item layout properties after layout
   * @type {Array.<Object>}
   * @private
   */

  this._itemLayouts = [];
  /**
   * Graphic elemnents
   * @type {Array.<module:zrender/Element>}
   * @private
   */

  this._graphicEls = [];
  /**
   * Max size of each chunk.
   * @type {number}
   * @private
   */

  this._chunkSize = 1e5;
  /**
   * @type {number}
   * @private
   */

  this._chunkCount = 0;
  /**
   * @type {Array.<Array|Object>}
   * @private
   */

  this._rawData;
  /**
   * Raw extent will not be cloned, but only transfered.
   * It will not be calculated util needed.
   * key: dim,
   * value: {end: number, extent: Array.<number>}
   * @type {Object}
   * @private
   */

  this._rawExtent = {};
  /**
   * @type {Object}
   * @private
   */

  this._extent = {};
  /**
   * key: dim
   * value: extent
   * @type {Object}
   * @private
   */

  this._approximateExtent = {};
  /**
   * Cache summary info for fast visit. See "dimensionHelper".
   * @type {Object}
   * @private
   */

  this._dimensionsSummary = summarizeDimensions(this);
  /**
   * @type {Object.<Array|TypedArray>}
   * @private
   */

  this._invertedIndicesMap = invertedIndicesMap;
  /**
   * @type {Object}
   * @private
   */

  this._calculationInfo = {};
  /**
   * User output info of this data.
   * DO NOT use it in other places!
   *
   * When preparing user params for user callbacks, we have
   * to clone these inner data structures to prevent users
   * from modifying them to effect built-in logic. And for
   * performance consideration we make this `userOutput` to
   * avoid clone them too many times.
   *
   * @type {Object}
   * @readOnly
   */

  this.userOutput = this._dimensionsSummary.userOutput;
};

var listProto = List.prototype;
listProto.type = 'list';
/**
 * If each data item has it's own option
 * @type {boolean}
 */

listProto.hasItemOption = true;
/**
 * The meanings of the input parameter `dim`:
 *
 * + If dim is a number (e.g., `1`), it means the index of the dimension.
 *   For example, `getDimension(0)` will return 'x' or 'lng' or 'radius'.
 * + If dim is a number-like string (e.g., `"1"`):
 *     + If there is the same concrete dim name defined in `this.dimensions`, it means that concrete name.
 *     + If not, it will be converted to a number, which means the index of the dimension.
 *        (why? because of the backward compatbility. We have been tolerating number-like string in
 *        dimension setting, although now it seems that it is not a good idea.)
 *     For example, `visualMap[i].dimension: "1"` is the same meaning as `visualMap[i].dimension: 1`,
 *     if no dimension name is defined as `"1"`.
 * + If dim is a not-number-like string, it means the concrete dim name.
 *   For example, it can be be default name `"x"`, `"y"`, `"z"`, `"lng"`, `"lat"`, `"angle"`, `"radius"`,
 *   or customized in `dimensions` property of option like `"age"`.
 *
 * Get dimension name
 * @param {string|number} dim See above.
 * @return {string} Concrete dim name.
 */

listProto.getDimension = function (dim) {
  if (typeof dim === 'number' // If being a number-like string but not being defined a dimension name.
  || !isNaN(dim) && !this._dimensionInfos.hasOwnProperty(dim)) {
    dim = this.dimensions[dim];
  }

  return dim;
};
/**
 * Get type and calculation info of particular dimension
 * @param {string|number} dim
 *        Dimension can be concrete names like x, y, z, lng, lat, angle, radius
 *        Or a ordinal number. For example getDimensionInfo(0) will return 'x' or 'lng' or 'radius'
 */


listProto.getDimensionInfo = function (dim) {
  // Do not clone, because there may be categories in dimInfo.
  return this._dimensionInfos[this.getDimension(dim)];
};
/**
 * @return {Array.<string>} concrete dimension name list on coord.
 */


listProto.getDimensionsOnCoord = function () {
  return this._dimensionsSummary.dataDimsOnCoord.slice();
};
/**
 * @param {string} coordDim
 * @param {number} [idx] A coordDim may map to more than one data dim.
 *        If idx is `true`, return a array of all mapped dims.
 *        If idx is not specified, return the first dim not extra.
 * @return {string|Array.<string>} concrete data dim.
 *        If idx is number, and not found, return null/undefined.
 *        If idx is `true`, and not found, return empty array (always return array).
 */


listProto.mapDimension = function (coordDim, idx) {
  var dimensionsSummary = this._dimensionsSummary;

  if (idx == null) {
    return dimensionsSummary.encodeFirstDimNotExtra[coordDim];
  }

  var dims = dimensionsSummary.encode[coordDim];
  return idx === true // always return array if idx is `true`
  ? (dims || []).slice() : dims && dims[idx];
};
/**
 * Initialize from data
 * @param {Array.<Object|number|Array>} data source or data or data provider.
 * @param {Array.<string>} [nameLIst] The name of a datum is used on data diff and
 *        defualt label/tooltip.
 *        A name can be specified in encode.itemName,
 *        or dataItem.name (only for series option data),
 *        or provided in nameList from outside.
 * @param {Function} [dimValueGetter] (dataItem, dimName, dataIndex, dimIndex) => number
 */


listProto.initData = function (data, nameList, dimValueGetter) {
  var notProvider = Source.isInstance(data) || zrUtil.isArrayLike(data);

  if (notProvider) {
    data = new DefaultDataProvider(data, this.dimensions.length);
  }

  this._rawData = data; // Clear

  this._storage = {};
  this._indices = null;
  this._nameList = nameList || [];
  this._idList = [];
  this._nameRepeatCount = {};

  if (!dimValueGetter) {
    this.hasItemOption = false;
  }
  /**
   * @readOnly
   */


  this.defaultDimValueGetter = defaultDimValueGetters[this._rawData.getSource().sourceFormat]; // Default dim value getter

  this._dimValueGetter = dimValueGetter = dimValueGetter || this.defaultDimValueGetter;
  this._dimValueGetterArrayRows = defaultDimValueGetters.arrayRows; // Reset raw extent.

  this._rawExtent = {};

  this._initDataFromProvider(0, data.count()); // If data has no item option.


  if (data.pure) {
    this.hasItemOption = false;
  }
};

listProto.getProvider = function () {
  return this._rawData;
};
/**
 * Caution: Can be only called on raw data (before `this._indices` created).
 */


listProto.appendData = function (data) {
  var rawData = this._rawData;
  var start = this.count();
  rawData.appendData(data);
  var end = rawData.count();

  if (!rawData.persistent) {
    end += start;
  }

  this._initDataFromProvider(start, end);
};
/**
 * Caution: Can be only called on raw data (before `this._indices` created).
 * This method does not modify `rawData` (`dataProvider`), but only
 * add values to storage.
 *
 * The final count will be increased by `Math.max(values.length, names.length)`.
 *
 * @param {Array.<Array.<*>>} values That is the SourceType: 'arrayRows', like
 *        [
 *            [12, 33, 44],
 *            [NaN, 43, 1],
 *            ['-', 'asdf', 0]
 *        ]
 *        Each item is exaclty cooresponding to a dimension.
 * @param {Array.<string>} [names]
 */


listProto.appendValues = function (values, names) {
  var chunkSize = this._chunkSize;
  var storage = this._storage;
  var dimensions = this.dimensions;
  var dimLen = dimensions.length;
  var rawExtent = this._rawExtent;
  var start = this.count();
  var end = start + Math.max(values.length, names ? names.length : 0);
  var originalChunkCount = this._chunkCount;

  for (var i = 0; i < dimLen; i++) {
    var dim = dimensions[i];

    if (!rawExtent[dim]) {
      rawExtent[dim] = getInitialExtent();
    }

    if (!storage[dim]) {
      storage[dim] = [];
    }

    prepareChunks(storage, this._dimensionInfos[dim], chunkSize, originalChunkCount, end);
    this._chunkCount = storage[dim].length;
  }

  var emptyDataItem = new Array(dimLen);

  for (var idx = start; idx < end; idx++) {
    var sourceIdx = idx - start;
    var chunkIndex = Math.floor(idx / chunkSize);
    var chunkOffset = idx % chunkSize; // Store the data by dimensions

    for (var k = 0; k < dimLen; k++) {
      var dim = dimensions[k];

      var val = this._dimValueGetterArrayRows(values[sourceIdx] || emptyDataItem, dim, sourceIdx, k);

      storage[dim][chunkIndex][chunkOffset] = val;
      var dimRawExtent = rawExtent[dim];
      val < dimRawExtent[0] && (dimRawExtent[0] = val);
      val > dimRawExtent[1] && (dimRawExtent[1] = val);
    }

    if (names) {
      this._nameList[idx] = names[sourceIdx];
    }
  }

  this._rawCount = this._count = end; // Reset data extent

  this._extent = {};
  prepareInvertedIndex(this);
};

listProto._initDataFromProvider = function (start, end) {
  // Optimize.
  if (start >= end) {
    return;
  }

  var chunkSize = this._chunkSize;
  var rawData = this._rawData;
  var storage = this._storage;
  var dimensions = this.dimensions;
  var dimLen = dimensions.length;
  var dimensionInfoMap = this._dimensionInfos;
  var nameList = this._nameList;
  var idList = this._idList;
  var rawExtent = this._rawExtent;
  var nameRepeatCount = this._nameRepeatCount = {};
  var nameDimIdx;
  var originalChunkCount = this._chunkCount;

  for (var i = 0; i < dimLen; i++) {
    var dim = dimensions[i];

    if (!rawExtent[dim]) {
      rawExtent[dim] = getInitialExtent();
    }

    var dimInfo = dimensionInfoMap[dim];

    if (dimInfo.otherDims.itemName === 0) {
      nameDimIdx = this._nameDimIdx = i;
    }

    if (dimInfo.otherDims.itemId === 0) {
      this._idDimIdx = i;
    }

    if (!storage[dim]) {
      storage[dim] = [];
    }

    prepareChunks(storage, dimInfo, chunkSize, originalChunkCount, end);
    this._chunkCount = storage[dim].length;
  }

  var dataItem = new Array(dimLen);

  for (var idx = start; idx < end; idx++) {
    // NOTICE: Try not to write things into dataItem
    dataItem = rawData.getItem(idx, dataItem); // Each data item is value
    // [1, 2]
    // 2
    // Bar chart, line chart which uses category axis
    // only gives the 'y' value. 'x' value is the indices of category
    // Use a tempValue to normalize the value to be a (x, y) value

    var chunkIndex = Math.floor(idx / chunkSize);
    var chunkOffset = idx % chunkSize; // Store the data by dimensions

    for (var k = 0; k < dimLen; k++) {
      var dim = dimensions[k];
      var dimStorage = storage[dim][chunkIndex]; // PENDING NULL is empty or zero

      var val = this._dimValueGetter(dataItem, dim, idx, k);

      dimStorage[chunkOffset] = val;
      var dimRawExtent = rawExtent[dim];
      val < dimRawExtent[0] && (dimRawExtent[0] = val);
      val > dimRawExtent[1] && (dimRawExtent[1] = val);
    } // ??? FIXME not check by pure but sourceFormat?
    // TODO refactor these logic.


    if (!rawData.pure) {
      var name = nameList[idx];

      if (dataItem && name == null) {
        // If dataItem is {name: ...}, it has highest priority.
        // That is appropriate for many common cases.
        if (dataItem.name != null) {
          // There is no other place to persistent dataItem.name,
          // so save it to nameList.
          nameList[idx] = name = dataItem.name;
        } else if (nameDimIdx != null) {
          var nameDim = dimensions[nameDimIdx];
          var nameDimChunk = storage[nameDim][chunkIndex];

          if (nameDimChunk) {
            name = nameDimChunk[chunkOffset];
            var ordinalMeta = dimensionInfoMap[nameDim].ordinalMeta;

            if (ordinalMeta && ordinalMeta.categories.length) {
              name = ordinalMeta.categories[name];
            }
          }
        }
      } // Try using the id in option
      // id or name is used on dynamical data, mapping old and new items.


      var id = dataItem == null ? null : dataItem.id;

      if (id == null && name != null) {
        // Use name as id and add counter to avoid same name
        nameRepeatCount[name] = nameRepeatCount[name] || 0;
        id = name;

        if (nameRepeatCount[name] > 0) {
          id += '__ec__' + nameRepeatCount[name];
        }

        nameRepeatCount[name]++;
      }

      id != null && (idList[idx] = id);
    }
  }

  if (!rawData.persistent && rawData.clean) {
    // Clean unused data if data source is typed array.
    rawData.clean();
  }

  this._rawCount = this._count = end; // Reset data extent

  this._extent = {};
  prepareInvertedIndex(this);
};

function prepareChunks(storage, dimInfo, chunkSize, chunkCount, end) {
  var DataCtor = dataCtors[dimInfo.type];
  var lastChunkIndex = chunkCount - 1;
  var dim = dimInfo.name;
  var resizeChunkArray = storage[dim][lastChunkIndex];

  if (resizeChunkArray && resizeChunkArray.length < chunkSize) {
    var newStore = new DataCtor(Math.min(end - lastChunkIndex * chunkSize, chunkSize)); // The cost of the copy is probably inconsiderable
    // within the initial chunkSize.

    for (var j = 0; j < resizeChunkArray.length; j++) {
      newStore[j] = resizeChunkArray[j];
    }

    storage[dim][lastChunkIndex] = newStore;
  } // Create new chunks.


  for (var k = chunkCount * chunkSize; k < end; k += chunkSize) {
    storage[dim].push(new DataCtor(Math.min(end - k, chunkSize)));
  }
}

function prepareInvertedIndex(list) {
  var invertedIndicesMap = list._invertedIndicesMap;
  zrUtil.each(invertedIndicesMap, function (invertedIndices, dim) {
    var dimInfo = list._dimensionInfos[dim]; // Currently, only dimensions that has ordinalMeta can create inverted indices.

    var ordinalMeta = dimInfo.ordinalMeta;

    if (ordinalMeta) {
      invertedIndices = invertedIndicesMap[dim] = new CtorInt32Array(ordinalMeta.categories.length); // The default value of TypedArray is 0. To avoid miss
      // mapping to 0, we should set it as INDEX_NOT_FOUND.

      for (var i = 0; i < invertedIndices.length; i++) {
        invertedIndices[i] = INDEX_NOT_FOUND;
      }

      for (var i = 0; i < list._count; i++) {
        // Only support the case that all values are distinct.
        invertedIndices[list.get(dim, i)] = i;
      }
    }
  });
}

function getRawValueFromStore(list, dimIndex, rawIndex) {
  var val;

  if (dimIndex != null) {
    var chunkSize = list._chunkSize;
    var chunkIndex = Math.floor(rawIndex / chunkSize);
    var chunkOffset = rawIndex % chunkSize;
    var dim = list.dimensions[dimIndex];
    var chunk = list._storage[dim][chunkIndex];

    if (chunk) {
      val = chunk[chunkOffset];
      var ordinalMeta = list._dimensionInfos[dim].ordinalMeta;

      if (ordinalMeta && ordinalMeta.categories.length) {
        val = ordinalMeta.categories[val];
      }
    }
  }

  return val;
}
/**
 * @return {number}
 */


listProto.count = function () {
  return this._count;
};

listProto.getIndices = function () {
  var newIndices;
  var indices = this._indices;

  if (indices) {
    var Ctor = indices.constructor;
    var thisCount = this._count; // `new Array(a, b, c)` is different from `new Uint32Array(a, b, c)`.

    if (Ctor === Array) {
      newIndices = new Ctor(thisCount);

      for (var i = 0; i < thisCount; i++) {
        newIndices[i] = indices[i];
      }
    } else {
      newIndices = new Ctor(indices.buffer, 0, thisCount);
    }
  } else {
    var Ctor = getIndicesCtor(this);
    var newIndices = new Ctor(this.count());

    for (var i = 0; i < newIndices.length; i++) {
      newIndices[i] = i;
    }
  }

  return newIndices;
};
/**
 * Get value. Return NaN if idx is out of range.
 * @param {string} dim Dim must be concrete name.
 * @param {number} idx
 * @param {boolean} stack
 * @return {number}
 */


listProto.get = function (dim, idx
/*, stack */
) {
  if (!(idx >= 0 && idx < this._count)) {
    return NaN;
  }

  var storage = this._storage;

  if (!storage[dim]) {
    // TODO Warn ?
    return NaN;
  }

  idx = this.getRawIndex(idx);
  var chunkIndex = Math.floor(idx / this._chunkSize);
  var chunkOffset = idx % this._chunkSize;
  var chunkStore = storage[dim][chunkIndex];
  var value = chunkStore[chunkOffset]; // FIXME ordinal data type is not stackable
  // if (stack) {
  //     var dimensionInfo = this._dimensionInfos[dim];
  //     if (dimensionInfo && dimensionInfo.stackable) {
  //         var stackedOn = this.stackedOn;
  //         while (stackedOn) {
  //             // Get no stacked data of stacked on
  //             var stackedValue = stackedOn.get(dim, idx);
  //             // Considering positive stack, negative stack and empty data
  //             if ((value >= 0 && stackedValue > 0)  // Positive stack
  //                 || (value <= 0 && stackedValue < 0) // Negative stack
  //             ) {
  //                 value += stackedValue;
  //             }
  //             stackedOn = stackedOn.stackedOn;
  //         }
  //     }
  // }

  return value;
};
/**
 * @param {string} dim concrete dim
 * @param {number} rawIndex
 * @return {number|string}
 */


listProto.getByRawIndex = function (dim, rawIdx) {
  if (!(rawIdx >= 0 && rawIdx < this._rawCount)) {
    return NaN;
  }

  var dimStore = this._storage[dim];

  if (!dimStore) {
    // TODO Warn ?
    return NaN;
  }

  var chunkIndex = Math.floor(rawIdx / this._chunkSize);
  var chunkOffset = rawIdx % this._chunkSize;
  var chunkStore = dimStore[chunkIndex];
  return chunkStore[chunkOffset];
};
/**
 * FIXME Use `get` on chrome maybe slow(in filterSelf and selectRange).
 * Hack a much simpler _getFast
 * @private
 */


listProto._getFast = function (dim, rawIdx) {
  var chunkIndex = Math.floor(rawIdx / this._chunkSize);
  var chunkOffset = rawIdx % this._chunkSize;
  var chunkStore = this._storage[dim][chunkIndex];
  return chunkStore[chunkOffset];
};
/**
 * Get value for multi dimensions.
 * @param {Array.<string>} [dimensions] If ignored, using all dimensions.
 * @param {number} idx
 * @return {number}
 */


listProto.getValues = function (dimensions, idx
/*, stack */
) {
  var values = [];

  if (!zrUtil.isArray(dimensions)) {
    // stack = idx;
    idx = dimensions;
    dimensions = this.dimensions;
  }

  for (var i = 0, len = dimensions.length; i < len; i++) {
    values.push(this.get(dimensions[i], idx
    /*, stack */
    ));
  }

  return values;
};
/**
 * If value is NaN. Inlcuding '-'
 * Only check the coord dimensions.
 * @param {string} dim
 * @param {number} idx
 * @return {number}
 */


listProto.hasValue = function (idx) {
  var dataDimsOnCoord = this._dimensionsSummary.dataDimsOnCoord;

  for (var i = 0, len = dataDimsOnCoord.length; i < len; i++) {
    // Ordinal type originally can be string or number.
    // But when an ordinal type is used on coord, it can
    // not be string but only number. So we can also use isNaN.
    if (isNaN(this.get(dataDimsOnCoord[i], idx))) {
      return false;
    }
  }

  return true;
};
/**
 * Get extent of data in one dimension
 * @param {string} dim
 * @param {boolean} stack
 */


listProto.getDataExtent = function (dim
/*, stack */
) {
  // Make sure use concrete dim as cache name.
  dim = this.getDimension(dim);
  var dimData = this._storage[dim];
  var initialExtent = getInitialExtent(); // stack = !!((stack || false) && this.getCalculationInfo(dim));

  if (!dimData) {
    return initialExtent;
  } // Make more strict checkings to ensure hitting cache.


  var currEnd = this.count(); // var cacheName = [dim, !!stack].join('_');
  // var cacheName = dim;
  // Consider the most cases when using data zoom, `getDataExtent`
  // happened before filtering. We cache raw extent, which is not
  // necessary to be cleared and recalculated when restore data.

  var useRaw = !this._indices; // && !stack;

  var dimExtent;

  if (useRaw) {
    return this._rawExtent[dim].slice();
  }

  dimExtent = this._extent[dim];

  if (dimExtent) {
    return dimExtent.slice();
  }

  dimExtent = initialExtent;
  var min = dimExtent[0];
  var max = dimExtent[1];

  for (var i = 0; i < currEnd; i++) {
    // var value = stack ? this.get(dim, i, true) : this._getFast(dim, this.getRawIndex(i));
    var value = this._getFast(dim, this.getRawIndex(i));

    value < min && (min = value);
    value > max && (max = value);
  }

  dimExtent = [min, max];
  this._extent[dim] = dimExtent;
  return dimExtent;
};
/**
 * Optimize for the scenario that data is filtered by a given extent.
 * Consider that if data amount is more than hundreds of thousand,
 * extent calculation will cost more than 10ms and the cache will
 * be erased because of the filtering.
 */


listProto.getApproximateExtent = function (dim
/*, stack */
) {
  dim = this.getDimension(dim);
  return this._approximateExtent[dim] || this.getDataExtent(dim
  /*, stack */
  );
};

listProto.setApproximateExtent = function (extent, dim
/*, stack */
) {
  dim = this.getDimension(dim);
  this._approximateExtent[dim] = extent.slice();
};
/**
 * @param {string} key
 * @return {*}
 */


listProto.getCalculationInfo = function (key) {
  return this._calculationInfo[key];
};
/**
 * @param {string|Object} key or k-v object
 * @param {*} [value]
 */


listProto.setCalculationInfo = function (key, value) {
  isObject(key) ? zrUtil.extend(this._calculationInfo, key) : this._calculationInfo[key] = value;
};
/**
 * Get sum of data in one dimension
 * @param {string} dim
 */


listProto.getSum = function (dim
/*, stack */
) {
  var dimData = this._storage[dim];
  var sum = 0;

  if (dimData) {
    for (var i = 0, len = this.count(); i < len; i++) {
      var value = this.get(dim, i
      /*, stack */
      );

      if (!isNaN(value)) {
        sum += value;
      }
    }
  }

  return sum;
};
/**
 * Get median of data in one dimension
 * @param {string} dim
 */


listProto.getMedian = function (dim
/*, stack */
) {
  var dimDataArray = []; // map all data of one dimension

  this.each(dim, function (val, idx) {
    if (!isNaN(val)) {
      dimDataArray.push(val);
    }
  }); // TODO
  // Use quick select?
  // immutability & sort

  var sortedDimDataArray = [].concat(dimDataArray).sort(function (a, b) {
    return a - b;
  });
  var len = this.count(); // calculate median

  return len === 0 ? 0 : len % 2 === 1 ? sortedDimDataArray[(len - 1) / 2] : (sortedDimDataArray[len / 2] + sortedDimDataArray[len / 2 - 1]) / 2;
}; // /**
//  * Retreive the index with given value
//  * @param {string} dim Concrete dimension.
//  * @param {number} value
//  * @return {number}
//  */
// Currently incorrect: should return dataIndex but not rawIndex.
// Do not fix it until this method is to be used somewhere.
// FIXME Precision of float value
// listProto.indexOf = function (dim, value) {
//     var storage = this._storage;
//     var dimData = storage[dim];
//     var chunkSize = this._chunkSize;
//     if (dimData) {
//         for (var i = 0, len = this.count(); i < len; i++) {
//             var chunkIndex = Math.floor(i / chunkSize);
//             var chunkOffset = i % chunkSize;
//             if (dimData[chunkIndex][chunkOffset] === value) {
//                 return i;
//             }
//         }
//     }
//     return -1;
// };

/**
 * Only support the dimension which inverted index created.
 * Do not support other cases until required.
 * @param {string} concrete dim
 * @param {number|string} value
 * @return {number} rawIndex
 */


listProto.rawIndexOf = function (dim, value) {
  var invertedIndices = dim && this._invertedIndicesMap[dim];
  var rawIndex = invertedIndices[value];

  if (rawIndex == null || isNaN(rawIndex)) {
    return INDEX_NOT_FOUND;
  }

  return rawIndex;
};
/**
 * Retreive the index with given name
 * @param {number} idx
 * @param {number} name
 * @return {number}
 */


listProto.indexOfName = function (name) {
  for (var i = 0, len = this.count(); i < len; i++) {
    if (this.getName(i) === name) {
      return i;
    }
  }

  return -1;
};
/**
 * Retreive the index with given raw data index
 * @param {number} idx
 * @param {number} name
 * @return {number}
 */


listProto.indexOfRawIndex = function (rawIndex) {
  if (rawIndex >= this._rawCount || rawIndex < 0) {
    return -1;
  }

  if (!this._indices) {
    return rawIndex;
  } // Indices are ascending


  var indices = this._indices; // If rawIndex === dataIndex

  var rawDataIndex = indices[rawIndex];

  if (rawDataIndex != null && rawDataIndex < this._count && rawDataIndex === rawIndex) {
    return rawIndex;
  }

  var left = 0;
  var right = this._count - 1;

  while (left <= right) {
    var mid = (left + right) / 2 | 0;

    if (indices[mid] < rawIndex) {
      left = mid + 1;
    } else if (indices[mid] > rawIndex) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
};
/**
 * Retreive the index of nearest value
 * @param {string} dim
 * @param {number} value
 * @param {number} [maxDistance=Infinity]
 * @return {Array.<number>} If and only if multiple indices has
 *        the same value, they are put to the result.
 */


listProto.indicesOfNearest = function (dim, value, maxDistance) {
  var storage = this._storage;
  var dimData = storage[dim];
  var nearestIndices = [];

  if (!dimData) {
    return nearestIndices;
  }

  if (maxDistance == null) {
    maxDistance = Infinity;
  }

  var minDist = Infinity;
  var minDiff = -1;
  var nearestIndicesLen = 0; // Check the test case of `test/ut/spec/data/List.js`.

  for (var i = 0, len = this.count(); i < len; i++) {
    var diff = value - this.get(dim, i);
    var dist = Math.abs(diff);

    if (dist <= maxDistance) {
      // When the `value` is at the middle of `this.get(dim, i)` and `this.get(dim, i+1)`,
      // we'd better not push both of them to `nearestIndices`, otherwise it is easy to
      // get more than one item in `nearestIndices` (more specifically, in `tooltip`).
      // So we chose the one that `diff >= 0` in this csae.
      // But if `this.get(dim, i)` and `this.get(dim, j)` get the same value, both of them
      // should be push to `nearestIndices`.
      if (dist < minDist || dist === minDist && diff >= 0 && minDiff < 0) {
        minDist = dist;
        minDiff = diff;
        nearestIndicesLen = 0;
      }

      if (diff === minDiff) {
        nearestIndices[nearestIndicesLen++] = i;
      }
    }
  }

  nearestIndices.length = nearestIndicesLen;
  return nearestIndices;
};
/**
 * Get raw data index
 * @param {number} idx
 * @return {number}
 */


listProto.getRawIndex = getRawIndexWithoutIndices;

function getRawIndexWithoutIndices(idx) {
  return idx;
}

function getRawIndexWithIndices(idx) {
  if (idx < this._count && idx >= 0) {
    return this._indices[idx];
  }

  return -1;
}
/**
 * Get raw data item
 * @param {number} idx
 * @return {number}
 */


listProto.getRawDataItem = function (idx) {
  if (!this._rawData.persistent) {
    var val = [];

    for (var i = 0; i < this.dimensions.length; i++) {
      var dim = this.dimensions[i];
      val.push(this.get(dim, idx));
    }

    return val;
  } else {
    return this._rawData.getItem(this.getRawIndex(idx));
  }
};
/**
 * @param {number} idx
 * @param {boolean} [notDefaultIdx=false]
 * @return {string}
 */


listProto.getName = function (idx) {
  var rawIndex = this.getRawIndex(idx);
  return this._nameList[rawIndex] || getRawValueFromStore(this, this._nameDimIdx, rawIndex) || '';
};
/**
 * @param {number} idx
 * @param {boolean} [notDefaultIdx=false]
 * @return {string}
 */


listProto.getId = function (idx) {
  return getId(this, this.getRawIndex(idx));
};

function getId(list, rawIndex) {
  var id = list._idList[rawIndex];

  if (id == null) {
    id = getRawValueFromStore(list, list._idDimIdx, rawIndex);
  }

  if (id == null) {
    // FIXME Check the usage in graph, should not use prefix.
    id = ID_PREFIX + rawIndex;
  }

  return id;
}

function normalizeDimensions(dimensions) {
  if (!zrUtil.isArray(dimensions)) {
    dimensions = [dimensions];
  }

  return dimensions;
}

function validateDimensions(list, dims) {
  for (var i = 0; i < dims.length; i++) {
    // stroage may be empty when no data, so use
    // dimensionInfos to check.
    if (!list._dimensionInfos[dims[i]]) {
      console.error('Unkown dimension ' + dims[i]);
    }
  }
}
/**
 * Data iteration
 * @param {string|Array.<string>}
 * @param {Function} cb
 * @param {*} [context=this]
 *
 * @example
 *  list.each('x', function (x, idx) {});
 *  list.each(['x', 'y'], function (x, y, idx) {});
 *  list.each(function (idx) {})
 */


listProto.each = function (dims, cb, context, contextCompat) {
  'use strict';

  if (!this._count) {
    return;
  }

  if (typeof dims === 'function') {
    contextCompat = context;
    context = cb;
    cb = dims;
    dims = [];
  } // contextCompat just for compat echarts3


  context = context || contextCompat || this;
  dims = zrUtil.map(normalizeDimensions(dims), this.getDimension, this);
  var dimSize = dims.length;

  for (var i = 0; i < this.count(); i++) {
    // Simple optimization
    switch (dimSize) {
      case 0:
        cb.call(context, i);
        break;

      case 1:
        cb.call(context, this.get(dims[0], i), i);
        break;

      case 2:
        cb.call(context, this.get(dims[0], i), this.get(dims[1], i), i);
        break;

      default:
        var k = 0;
        var value = [];

        for (; k < dimSize; k++) {
          value[k] = this.get(dims[k], i);
        } // Index


        value[k] = i;
        cb.apply(context, value);
    }
  }
};
/**
 * Data filter
 * @param {string|Array.<string>}
 * @param {Function} cb
 * @param {*} [context=this]
 */


listProto.filterSelf = function (dimensions, cb, context, contextCompat) {
  'use strict';

  if (!this._count) {
    return;
  }

  if (typeof dimensions === 'function') {
    contextCompat = context;
    context = cb;
    cb = dimensions;
    dimensions = [];
  } // contextCompat just for compat echarts3


  context = context || contextCompat || this;
  dimensions = zrUtil.map(normalizeDimensions(dimensions), this.getDimension, this);
  var count = this.count();
  var Ctor = getIndicesCtor(this);
  var newIndices = new Ctor(count);
  var value = [];
  var dimSize = dimensions.length;
  var offset = 0;
  var dim0 = dimensions[0];

  for (var i = 0; i < count; i++) {
    var keep;
    var rawIdx = this.getRawIndex(i); // Simple optimization

    if (dimSize === 0) {
      keep = cb.call(context, i);
    } else if (dimSize === 1) {
      var val = this._getFast(dim0, rawIdx);

      keep = cb.call(context, val, i);
    } else {
      for (var k = 0; k < dimSize; k++) {
        value[k] = this._getFast(dim0, rawIdx);
      }

      value[k] = i;
      keep = cb.apply(context, value);
    }

    if (keep) {
      newIndices[offset++] = rawIdx;
    }
  } // Set indices after filtered.


  if (offset < count) {
    this._indices = newIndices;
  }

  this._count = offset; // Reset data extent

  this._extent = {};
  this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
  return this;
};
/**
 * Select data in range. (For optimization of filter)
 * (Manually inline code, support 5 million data filtering in data zoom.)
 */


listProto.selectRange = function (range) {
  'use strict';

  if (!this._count) {
    return;
  }

  var dimensions = [];

  for (var dim in range) {
    if (range.hasOwnProperty(dim)) {
      dimensions.push(dim);
    }
  }

  var dimSize = dimensions.length;

  if (!dimSize) {
    return;
  }

  var originalCount = this.count();
  var Ctor = getIndicesCtor(this);
  var newIndices = new Ctor(originalCount);
  var offset = 0;
  var dim0 = dimensions[0];
  var min = range[dim0][0];
  var max = range[dim0][1];
  var quickFinished = false;

  if (!this._indices) {
    // Extreme optimization for common case. About 2x faster in chrome.
    var idx = 0;

    if (dimSize === 1) {
      var dimStorage = this._storage[dimensions[0]];

      for (var k = 0; k < this._chunkCount; k++) {
        var chunkStorage = dimStorage[k];
        var len = Math.min(this._count - k * this._chunkSize, this._chunkSize);

        for (var i = 0; i < len; i++) {
          var val = chunkStorage[i]; // NaN will not be filtered. Consider the case, in line chart, empty
          // value indicates the line should be broken. But for the case like
          // scatter plot, a data item with empty value will not be rendered,
          // but the axis extent may be effected if some other dim of the data
          // item has value. Fortunately it is not a significant negative effect.

          if (val >= min && val <= max || isNaN(val)) {
            newIndices[offset++] = idx;
          }

          idx++;
        }
      }

      quickFinished = true;
    } else if (dimSize === 2) {
      var dimStorage = this._storage[dim0];
      var dimStorage2 = this._storage[dimensions[1]];
      var min2 = range[dimensions[1]][0];
      var max2 = range[dimensions[1]][1];

      for (var k = 0; k < this._chunkCount; k++) {
        var chunkStorage = dimStorage[k];
        var chunkStorage2 = dimStorage2[k];
        var len = Math.min(this._count - k * this._chunkSize, this._chunkSize);

        for (var i = 0; i < len; i++) {
          var val = chunkStorage[i];
          var val2 = chunkStorage2[i]; // Do not filter NaN, see comment above.

          if ((val >= min && val <= max || isNaN(val)) && (val2 >= min2 && val2 <= max2 || isNaN(val2))) {
            newIndices[offset++] = idx;
          }

          idx++;
        }
      }

      quickFinished = true;
    }
  }

  if (!quickFinished) {
    if (dimSize === 1) {
      for (var i = 0; i < originalCount; i++) {
        var rawIndex = this.getRawIndex(i);

        var val = this._getFast(dim0, rawIndex); // Do not filter NaN, see comment above.


        if (val >= min && val <= max || isNaN(val)) {
          newIndices[offset++] = rawIndex;
        }
      }
    } else {
      for (var i = 0; i < originalCount; i++) {
        var keep = true;
        var rawIndex = this.getRawIndex(i);

        for (var k = 0; k < dimSize; k++) {
          var dimk = dimensions[k];

          var val = this._getFast(dim, rawIndex); // Do not filter NaN, see comment above.


          if (val < range[dimk][0] || val > range[dimk][1]) {
            keep = false;
          }
        }

        if (keep) {
          newIndices[offset++] = this.getRawIndex(i);
        }
      }
    }
  } // Set indices after filtered.


  if (offset < originalCount) {
    this._indices = newIndices;
  }

  this._count = offset; // Reset data extent

  this._extent = {};
  this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
  return this;
};
/**
 * Data mapping to a plain array
 * @param {string|Array.<string>} [dimensions]
 * @param {Function} cb
 * @param {*} [context=this]
 * @return {Array}
 */


listProto.mapArray = function (dimensions, cb, context, contextCompat) {
  'use strict';

  if (typeof dimensions === 'function') {
    contextCompat = context;
    context = cb;
    cb = dimensions;
    dimensions = [];
  } // contextCompat just for compat echarts3


  context = context || contextCompat || this;
  var result = [];
  this.each(dimensions, function () {
    result.push(cb && cb.apply(this, arguments));
  }, context);
  return result;
}; // Data in excludeDimensions is copied, otherwise transfered.


function cloneListForMapAndSample(original, excludeDimensions) {
  var allDimensions = original.dimensions;
  var list = new List(zrUtil.map(allDimensions, original.getDimensionInfo, original), original.hostModel); // FIXME If needs stackedOn, value may already been stacked

  transferProperties(list, original);
  var storage = list._storage = {};
  var originalStorage = original._storage; // Init storage

  for (var i = 0; i < allDimensions.length; i++) {
    var dim = allDimensions[i];

    if (originalStorage[dim]) {
      // Notice that we do not reset invertedIndicesMap here, becuase
      // there is no scenario of mapping or sampling ordinal dimension.
      if (zrUtil.indexOf(excludeDimensions, dim) >= 0) {
        storage[dim] = cloneDimStore(originalStorage[dim]);
        list._rawExtent[dim] = getInitialExtent();
        list._extent[dim] = null;
      } else {
        // Direct reference for other dimensions
        storage[dim] = originalStorage[dim];
      }
    }
  }

  return list;
}

function cloneDimStore(originalDimStore) {
  var newDimStore = new Array(originalDimStore.length);

  for (var j = 0; j < originalDimStore.length; j++) {
    newDimStore[j] = cloneChunk(originalDimStore[j]);
  }

  return newDimStore;
}

function getInitialExtent() {
  return [Infinity, -Infinity];
}
/**
 * Data mapping to a new List with given dimensions
 * @param {string|Array.<string>} dimensions
 * @param {Function} cb
 * @param {*} [context=this]
 * @return {Array}
 */


listProto.map = function (dimensions, cb, context, contextCompat) {
  'use strict'; // contextCompat just for compat echarts3

  context = context || contextCompat || this;
  dimensions = zrUtil.map(normalizeDimensions(dimensions), this.getDimension, this);
  var list = cloneListForMapAndSample(this, dimensions); // Following properties are all immutable.
  // So we can reference to the same value

  list._indices = this._indices;
  list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
  var storage = list._storage;
  var tmpRetValue = [];
  var chunkSize = this._chunkSize;
  var dimSize = dimensions.length;
  var dataCount = this.count();
  var values = [];
  var rawExtent = list._rawExtent;

  for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
    for (var dimIndex = 0; dimIndex < dimSize; dimIndex++) {
      values[dimIndex] = this.get(dimensions[dimIndex], dataIndex
      /*, stack */
      );
    }

    values[dimSize] = dataIndex;
    var retValue = cb && cb.apply(context, values);

    if (retValue != null) {
      // a number or string (in oridinal dimension)?
      if (typeof retValue !== 'object') {
        tmpRetValue[0] = retValue;
        retValue = tmpRetValue;
      }

      var rawIndex = this.getRawIndex(dataIndex);
      var chunkIndex = Math.floor(rawIndex / chunkSize);
      var chunkOffset = rawIndex % chunkSize;

      for (var i = 0; i < retValue.length; i++) {
        var dim = dimensions[i];
        var val = retValue[i];
        var rawExtentOnDim = rawExtent[dim];
        var dimStore = storage[dim];

        if (dimStore) {
          dimStore[chunkIndex][chunkOffset] = val;
        }

        if (val < rawExtentOnDim[0]) {
          rawExtentOnDim[0] = val;
        }

        if (val > rawExtentOnDim[1]) {
          rawExtentOnDim[1] = val;
        }
      }
    }
  }

  return list;
};
/**
 * Large data down sampling on given dimension
 * @param {string} dimension
 * @param {number} rate
 * @param {Function} sampleValue
 * @param {Function} sampleIndex Sample index for name and id
 */


listProto.downSample = function (dimension, rate, sampleValue, sampleIndex) {
  var list = cloneListForMapAndSample(this, [dimension]);
  var targetStorage = list._storage;
  var frameValues = [];
  var frameSize = Math.floor(1 / rate);
  var dimStore = targetStorage[dimension];
  var len = this.count();
  var chunkSize = this._chunkSize;
  var rawExtentOnDim = list._rawExtent[dimension];
  var newIndices = new (getIndicesCtor(this))(len);
  var offset = 0;

  for (var i = 0; i < len; i += frameSize) {
    // Last frame
    if (frameSize > len - i) {
      frameSize = len - i;
      frameValues.length = frameSize;
    }

    for (var k = 0; k < frameSize; k++) {
      var dataIdx = this.getRawIndex(i + k);
      var originalChunkIndex = Math.floor(dataIdx / chunkSize);
      var originalChunkOffset = dataIdx % chunkSize;
      frameValues[k] = dimStore[originalChunkIndex][originalChunkOffset];
    }

    var value = sampleValue(frameValues);
    var sampleFrameIdx = this.getRawIndex(Math.min(i + sampleIndex(frameValues, value) || 0, len - 1));
    var sampleChunkIndex = Math.floor(sampleFrameIdx / chunkSize);
    var sampleChunkOffset = sampleFrameIdx % chunkSize; // Only write value on the filtered data

    dimStore[sampleChunkIndex][sampleChunkOffset] = value;

    if (value < rawExtentOnDim[0]) {
      rawExtentOnDim[0] = value;
    }

    if (value > rawExtentOnDim[1]) {
      rawExtentOnDim[1] = value;
    }

    newIndices[offset++] = sampleFrameIdx;
  }

  list._count = offset;
  list._indices = newIndices;
  list.getRawIndex = getRawIndexWithIndices;
  return list;
};
/**
 * Get model of one data item.
 *
 * @param {number} idx
 */
// FIXME Model proxy ?


listProto.getItemModel = function (idx) {
  var hostModel = this.hostModel;
  return new Model(this.getRawDataItem(idx), hostModel, hostModel && hostModel.ecModel);
};
/**
 * Create a data differ
 * @param {module:echarts/data/List} otherList
 * @return {module:echarts/data/DataDiffer}
 */


listProto.diff = function (otherList) {
  var thisList = this;
  return new DataDiffer(otherList ? otherList.getIndices() : [], this.getIndices(), function (idx) {
    return getId(otherList, idx);
  }, function (idx) {
    return getId(thisList, idx);
  });
};
/**
 * Get visual property.
 * @param {string} key
 */


listProto.getVisual = function (key) {
  var visual = this._visual;
  return visual && visual[key];
};
/**
 * Set visual property
 * @param {string|Object} key
 * @param {*} [value]
 *
 * @example
 *  setVisual('color', color);
 *  setVisual({
 *      'color': color
 *  });
 */


listProto.setVisual = function (key, val) {
  if (isObject(key)) {
    for (var name in key) {
      if (key.hasOwnProperty(name)) {
        this.setVisual(name, key[name]);
      }
    }

    return;
  }

  this._visual = this._visual || {};
  this._visual[key] = val;
};
/**
 * Set layout property.
 * @param {string|Object} key
 * @param {*} [val]
 */


listProto.setLayout = function (key, val) {
  if (isObject(key)) {
    for (var name in key) {
      if (key.hasOwnProperty(name)) {
        this.setLayout(name, key[name]);
      }
    }

    return;
  }

  this._layout[key] = val;
};
/**
 * Get layout property.
 * @param  {string} key.
 * @return {*}
 */


listProto.getLayout = function (key) {
  return this._layout[key];
};
/**
 * Get layout of single data item
 * @param {number} idx
 */


listProto.getItemLayout = function (idx) {
  return this._itemLayouts[idx];
};
/**
 * Set layout of single data item
 * @param {number} idx
 * @param {Object} layout
 * @param {boolean=} [merge=false]
 */


listProto.setItemLayout = function (idx, layout, merge) {
  this._itemLayouts[idx] = merge ? zrUtil.extend(this._itemLayouts[idx] || {}, layout) : layout;
};
/**
 * Clear all layout of single data item
 */


listProto.clearItemLayouts = function () {
  this._itemLayouts.length = 0;
};
/**
 * Get visual property of single data item
 * @param {number} idx
 * @param {string} key
 * @param {boolean} [ignoreParent=false]
 */


listProto.getItemVisual = function (idx, key, ignoreParent) {
  var itemVisual = this._itemVisuals[idx];
  var val = itemVisual && itemVisual[key];

  if (val == null && !ignoreParent) {
    // Use global visual property
    return this.getVisual(key);
  }

  return val;
};
/**
 * Set visual property of single data item
 *
 * @param {number} idx
 * @param {string|Object} key
 * @param {*} [value]
 *
 * @example
 *  setItemVisual(0, 'color', color);
 *  setItemVisual(0, {
 *      'color': color
 *  });
 */


listProto.setItemVisual = function (idx, key, value) {
  var itemVisual = this._itemVisuals[idx] || {};
  var hasItemVisual = this.hasItemVisual;
  this._itemVisuals[idx] = itemVisual;

  if (isObject(key)) {
    for (var name in key) {
      if (key.hasOwnProperty(name)) {
        itemVisual[name] = key[name];
        hasItemVisual[name] = true;
      }
    }

    return;
  }

  itemVisual[key] = value;
  hasItemVisual[key] = true;
};
/**
 * Clear itemVisuals and list visual.
 */


listProto.clearAllVisual = function () {
  this._visual = {};
  this._itemVisuals = [];
  this.hasItemVisual = {};
};

var setItemDataAndSeriesIndex = function (child) {
  child.seriesIndex = this.seriesIndex;
  child.dataIndex = this.dataIndex;
  child.dataType = this.dataType;
};
/**
 * Set graphic element relative to data. It can be set as null
 * @param {number} idx
 * @param {module:zrender/Element} [el]
 */


listProto.setItemGraphicEl = function (idx, el) {
  var hostModel = this.hostModel;

  if (el) {
    // Add data index and series index for indexing the data by element
    // Useful in tooltip
    el.dataIndex = idx;
    el.dataType = this.dataType;
    el.seriesIndex = hostModel && hostModel.seriesIndex;

    if (el.type === 'group') {
      el.traverse(setItemDataAndSeriesIndex, el);
    }
  }

  this._graphicEls[idx] = el;
};
/**
 * @param {number} idx
 * @return {module:zrender/Element}
 */


listProto.getItemGraphicEl = function (idx) {
  return this._graphicEls[idx];
};
/**
 * @param {Function} cb
 * @param {*} context
 */


listProto.eachItemGraphicEl = function (cb, context) {
  zrUtil.each(this._graphicEls, function (el, idx) {
    if (el) {
      cb && cb.call(context, el, idx);
    }
  });
};
/**
 * Shallow clone a new list except visual and layout properties, and graph elements.
 * New list only change the indices.
 */


listProto.cloneShallow = function (list) {
  if (!list) {
    var dimensionInfoList = zrUtil.map(this.dimensions, this.getDimensionInfo, this);
    list = new List(dimensionInfoList, this.hostModel);
  } // FIXME


  list._storage = this._storage;
  transferProperties(list, this); // Clone will not change the data extent and indices

  if (this._indices) {
    var Ctor = this._indices.constructor;
    list._indices = new Ctor(this._indices);
  } else {
    list._indices = null;
  }

  list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
  return list;
};
/**
 * Wrap some method to add more feature
 * @param {string} methodName
 * @param {Function} injectFunction
 */


listProto.wrapMethod = function (methodName, injectFunction) {
  var originalMethod = this[methodName];

  if (typeof originalMethod !== 'function') {
    return;
  }

  this.__wrappedMethods = this.__wrappedMethods || [];

  this.__wrappedMethods.push(methodName);

  this[methodName] = function () {
    var res = originalMethod.apply(this, arguments);
    return injectFunction.apply(this, [res].concat(zrUtil.slice(arguments)));
  };
}; // Methods that create a new list based on this list should be listed here.
// Notice that those method should `RETURN` the new list.


listProto.TRANSFERABLE_METHODS = ['cloneShallow', 'downSample', 'map']; // Methods that change indices of this list should be listed here.

listProto.CHANGABLE_METHODS = ['filterSelf', 'selectRange'];
var _default = List;
module.exports = _default;

/***/ }),

/***/ "7368":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__("6d8b");

var _clazz = __webpack_require__("625e");

var enableClassCheck = _clazz.enableClassCheck;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// id may be function name of Object, add a prefix to avoid this problem.
function generateNodeKey(id) {
  return '_EC_' + id;
}
/**
 * @alias module:echarts/data/Graph
 * @constructor
 * @param {boolean} directed
 */


var Graph = function (directed) {
  /**
   * 是否是有向图
   * @type {boolean}
   * @private
   */
  this._directed = directed || false;
  /**
   * @type {Array.<module:echarts/data/Graph.Node>}
   * @readOnly
   */

  this.nodes = [];
  /**
   * @type {Array.<module:echarts/data/Graph.Edge>}
   * @readOnly
   */

  this.edges = [];
  /**
   * @type {Object.<string, module:echarts/data/Graph.Node>}
   * @private
   */

  this._nodesMap = {};
  /**
   * @type {Object.<string, module:echarts/data/Graph.Edge>}
   * @private
   */

  this._edgesMap = {};
  /**
   * @type {module:echarts/data/List}
   * @readOnly
   */

  this.data;
  /**
   * @type {module:echarts/data/List}
   * @readOnly
   */

  this.edgeData;
};

var graphProto = Graph.prototype;
/**
 * @type {string}
 */

graphProto.type = 'graph';
/**
 * If is directed graph
 * @return {boolean}
 */

graphProto.isDirected = function () {
  return this._directed;
};
/**
 * Add a new node
 * @param {string} id
 * @param {number} [dataIndex]
 */


graphProto.addNode = function (id, dataIndex) {
  id = id == null ? '' + dataIndex : '' + id;
  var nodesMap = this._nodesMap;

  if (nodesMap[generateNodeKey(id)]) {
    return;
  }

  var node = new Node(id, dataIndex);
  node.hostGraph = this;
  this.nodes.push(node);
  nodesMap[generateNodeKey(id)] = node;
  return node;
};
/**
 * Get node by data index
 * @param  {number} dataIndex
 * @return {module:echarts/data/Graph~Node}
 */


graphProto.getNodeByIndex = function (dataIndex) {
  var rawIdx = this.data.getRawIndex(dataIndex);
  return this.nodes[rawIdx];
};
/**
 * Get node by id
 * @param  {string} id
 * @return {module:echarts/data/Graph.Node}
 */


graphProto.getNodeById = function (id) {
  return this._nodesMap[generateNodeKey(id)];
};
/**
 * Add a new edge
 * @param {number|string|module:echarts/data/Graph.Node} n1
 * @param {number|string|module:echarts/data/Graph.Node} n2
 * @param {number} [dataIndex=-1]
 * @return {module:echarts/data/Graph.Edge}
 */


graphProto.addEdge = function (n1, n2, dataIndex) {
  var nodesMap = this._nodesMap;
  var edgesMap = this._edgesMap; // PNEDING

  if (typeof n1 === 'number') {
    n1 = this.nodes[n1];
  }

  if (typeof n2 === 'number') {
    n2 = this.nodes[n2];
  }

  if (!Node.isInstance(n1)) {
    n1 = nodesMap[generateNodeKey(n1)];
  }

  if (!Node.isInstance(n2)) {
    n2 = nodesMap[generateNodeKey(n2)];
  }

  if (!n1 || !n2) {
    return;
  }

  var key = n1.id + '-' + n2.id; // PENDING

  if (edgesMap[key]) {
    return;
  }

  var edge = new Edge(n1, n2, dataIndex);
  edge.hostGraph = this;

  if (this._directed) {
    n1.outEdges.push(edge);
    n2.inEdges.push(edge);
  }

  n1.edges.push(edge);

  if (n1 !== n2) {
    n2.edges.push(edge);
  }

  this.edges.push(edge);
  edgesMap[key] = edge;
  return edge;
};
/**
 * Get edge by data index
 * @param  {number} dataIndex
 * @return {module:echarts/data/Graph~Node}
 */


graphProto.getEdgeByIndex = function (dataIndex) {
  var rawIdx = this.edgeData.getRawIndex(dataIndex);
  return this.edges[rawIdx];
};
/**
 * Get edge by two linked nodes
 * @param  {module:echarts/data/Graph.Node|string} n1
 * @param  {module:echarts/data/Graph.Node|string} n2
 * @return {module:echarts/data/Graph.Edge}
 */


graphProto.getEdge = function (n1, n2) {
  if (Node.isInstance(n1)) {
    n1 = n1.id;
  }

  if (Node.isInstance(n2)) {
    n2 = n2.id;
  }

  var edgesMap = this._edgesMap;

  if (this._directed) {
    return edgesMap[n1 + '-' + n2];
  } else {
    return edgesMap[n1 + '-' + n2] || edgesMap[n2 + '-' + n1];
  }
};
/**
 * Iterate all nodes
 * @param  {Function} cb
 * @param  {*} [context]
 */


graphProto.eachNode = function (cb, context) {
  var nodes = this.nodes;
  var len = nodes.length;

  for (var i = 0; i < len; i++) {
    if (nodes[i].dataIndex >= 0) {
      cb.call(context, nodes[i], i);
    }
  }
};
/**
 * Iterate all edges
 * @param  {Function} cb
 * @param  {*} [context]
 */


graphProto.eachEdge = function (cb, context) {
  var edges = this.edges;
  var len = edges.length;

  for (var i = 0; i < len; i++) {
    if (edges[i].dataIndex >= 0 && edges[i].node1.dataIndex >= 0 && edges[i].node2.dataIndex >= 0) {
      cb.call(context, edges[i], i);
    }
  }
};
/**
 * Breadth first traverse
 * @param {Function} cb
 * @param {module:echarts/data/Graph.Node} startNode
 * @param {string} [direction='none'] 'none'|'in'|'out'
 * @param {*} [context]
 */


graphProto.breadthFirstTraverse = function (cb, startNode, direction, context) {
  if (!Node.isInstance(startNode)) {
    startNode = this._nodesMap[generateNodeKey(startNode)];
  }

  if (!startNode) {
    return;
  }

  var edgeType = direction === 'out' ? 'outEdges' : direction === 'in' ? 'inEdges' : 'edges';

  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].__visited = false;
  }

  if (cb.call(context, startNode, null)) {
    return;
  }

  var queue = [startNode];

  while (queue.length) {
    var currentNode = queue.shift();
    var edges = currentNode[edgeType];

    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      var otherNode = e.node1 === currentNode ? e.node2 : e.node1;

      if (!otherNode.__visited) {
        if (cb.call(context, otherNode, currentNode)) {
          // Stop traversing
          return;
        }

        queue.push(otherNode);
        otherNode.__visited = true;
      }
    }
  }
}; // TODO
// graphProto.depthFirstTraverse = function (
//     cb, startNode, direction, context
// ) {
// };
// Filter update


graphProto.update = function () {
  var data = this.data;
  var edgeData = this.edgeData;
  var nodes = this.nodes;
  var edges = this.edges;

  for (var i = 0, len = nodes.length; i < len; i++) {
    nodes[i].dataIndex = -1;
  }

  for (var i = 0, len = data.count(); i < len; i++) {
    nodes[data.getRawIndex(i)].dataIndex = i;
  }

  edgeData.filterSelf(function (idx) {
    var edge = edges[edgeData.getRawIndex(idx)];
    return edge.node1.dataIndex >= 0 && edge.node2.dataIndex >= 0;
  }); // Update edge

  for (var i = 0, len = edges.length; i < len; i++) {
    edges[i].dataIndex = -1;
  }

  for (var i = 0, len = edgeData.count(); i < len; i++) {
    edges[edgeData.getRawIndex(i)].dataIndex = i;
  }
};
/**
 * @return {module:echarts/data/Graph}
 */


graphProto.clone = function () {
  var graph = new Graph(this._directed);
  var nodes = this.nodes;
  var edges = this.edges;

  for (var i = 0; i < nodes.length; i++) {
    graph.addNode(nodes[i].id, nodes[i].dataIndex);
  }

  for (var i = 0; i < edges.length; i++) {
    var e = edges[i];
    graph.addEdge(e.node1.id, e.node2.id, e.dataIndex);
  }

  return graph;
};
/**
 * @alias module:echarts/data/Graph.Node
 */


function Node(id, dataIndex) {
  /**
  * @type {string}
  */
  this.id = id == null ? '' : id;
  /**
  * @type {Array.<module:echarts/data/Graph.Edge>}
  */

  this.inEdges = [];
  /**
  * @type {Array.<module:echarts/data/Graph.Edge>}
  */

  this.outEdges = [];
  /**
  * @type {Array.<module:echarts/data/Graph.Edge>}
  */

  this.edges = [];
  /**
   * @type {module:echarts/data/Graph}
   */

  this.hostGraph;
  /**
   * @type {number}
   */

  this.dataIndex = dataIndex == null ? -1 : dataIndex;
}

Node.prototype = {
  constructor: Node,

  /**
   * @return {number}
   */
  degree: function () {
    return this.edges.length;
  },

  /**
   * @return {number}
   */
  inDegree: function () {
    return this.inEdges.length;
  },

  /**
  * @return {number}
  */
  outDegree: function () {
    return this.outEdges.length;
  },

  /**
   * @param {string} [path]
   * @return {module:echarts/model/Model}
   */
  getModel: function (path) {
    if (this.dataIndex < 0) {
      return;
    }

    var graph = this.hostGraph;
    var itemModel = graph.data.getItemModel(this.dataIndex);
    return itemModel.getModel(path);
  }
};
/**
 * 图边
 * @alias module:echarts/data/Graph.Edge
 * @param {module:echarts/data/Graph.Node} n1
 * @param {module:echarts/data/Graph.Node} n2
 * @param {number} [dataIndex=-1]
 */

function Edge(n1, n2, dataIndex) {
  /**
   * 节点1，如果是有向图则为源节点
   * @type {module:echarts/data/Graph.Node}
   */
  this.node1 = n1;
  /**
   * 节点2，如果是有向图则为目标节点
   * @type {module:echarts/data/Graph.Node}
   */

  this.node2 = n2;
  this.dataIndex = dataIndex == null ? -1 : dataIndex;
}
/**
 * @param {string} [path]
 * @return {module:echarts/model/Model}
 */


Edge.prototype.getModel = function (path) {
  if (this.dataIndex < 0) {
    return;
  }

  var graph = this.hostGraph;
  var itemModel = graph.edgeData.getItemModel(this.dataIndex);
  return itemModel.getModel(path);
};

var createGraphDataProxyMixin = function (hostName, dataName) {
  return {
    /**
     * @param {string=} [dimension='value'] Default 'value'. can be 'a', 'b', 'c', 'd', 'e'.
     * @return {number}
     */
    getValue: function (dimension) {
      var data = this[hostName][dataName];
      return data.get(data.getDimension(dimension || 'value'), this.dataIndex);
    },

    /**
     * @param {Object|string} key
     * @param {*} [value]
     */
    setVisual: function (key, value) {
      this.dataIndex >= 0 && this[hostName][dataName].setItemVisual(this.dataIndex, key, value);
    },

    /**
     * @param {string} key
     * @return {boolean}
     */
    getVisual: function (key, ignoreParent) {
      return this[hostName][dataName].getItemVisual(this.dataIndex, key, ignoreParent);
    },

    /**
     * @param {Object} layout
     * @return {boolean} [merge=false]
     */
    setLayout: function (layout, merge) {
      this.dataIndex >= 0 && this[hostName][dataName].setItemLayout(this.dataIndex, layout, merge);
    },

    /**
     * @return {Object}
     */
    getLayout: function () {
      return this[hostName][dataName].getItemLayout(this.dataIndex);
    },

    /**
     * @return {module:zrender/Element}
     */
    getGraphicEl: function () {
      return this[hostName][dataName].getItemGraphicEl(this.dataIndex);
    },

    /**
     * @return {number}
     */
    getRawIndex: function () {
      return this[hostName][dataName].getRawIndex(this.dataIndex);
    }
  };
};

zrUtil.mixin(Node, createGraphDataProxyMixin('hostGraph', 'data'));
zrUtil.mixin(Edge, createGraphDataProxyMixin('hostGraph', 'edgeData'));
Graph.Node = Node;
Graph.Edge = Edge;
enableClassCheck(Node);
enableClassCheck(Edge);
var _default = Graph;
module.exports = _default;

/***/ }),

/***/ "80f0":
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function defaultKeyGetter(item) {
  return item;
}
/**
 * @param {Array} oldArr
 * @param {Array} newArr
 * @param {Function} oldKeyGetter
 * @param {Function} newKeyGetter
 * @param {Object} [context] Can be visited by this.context in callback.
 */


function DataDiffer(oldArr, newArr, oldKeyGetter, newKeyGetter, context) {
  this._old = oldArr;
  this._new = newArr;
  this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
  this._newKeyGetter = newKeyGetter || defaultKeyGetter;
  this.context = context;
}

DataDiffer.prototype = {
  constructor: DataDiffer,

  /**
   * Callback function when add a data
   */
  add: function (func) {
    this._add = func;
    return this;
  },

  /**
   * Callback function when update a data
   */
  update: function (func) {
    this._update = func;
    return this;
  },

  /**
   * Callback function when remove a data
   */
  remove: function (func) {
    this._remove = func;
    return this;
  },
  execute: function () {
    var oldArr = this._old;
    var newArr = this._new;
    var oldDataIndexMap = {};
    var newDataIndexMap = {};
    var oldDataKeyArr = [];
    var newDataKeyArr = [];
    var i;
    initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, '_oldKeyGetter', this);
    initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter', this);

    for (i = 0; i < oldArr.length; i++) {
      var key = oldDataKeyArr[i];
      var idx = newDataIndexMap[key]; // idx can never be empty array here. see 'set null' logic below.

      if (idx != null) {
        // Consider there is duplicate key (for example, use dataItem.name as key).
        // We should make sure every item in newArr and oldArr can be visited.
        var len = idx.length;

        if (len) {
          len === 1 && (newDataIndexMap[key] = null);
          idx = idx.shift();
        } else {
          newDataIndexMap[key] = null;
        }

        this._update && this._update(idx, i);
      } else {
        this._remove && this._remove(i);
      }
    }

    for (var i = 0; i < newDataKeyArr.length; i++) {
      var key = newDataKeyArr[i];

      if (newDataIndexMap.hasOwnProperty(key)) {
        var idx = newDataIndexMap[key];

        if (idx == null) {
          continue;
        } // idx can never be empty array here. see 'set null' logic above.


        if (!idx.length) {
          this._add && this._add(idx);
        } else {
          for (var j = 0, len = idx.length; j < len; j++) {
            this._add && this._add(idx[j]);
          }
        }
      }
    }
  }
};

function initIndexMap(arr, map, keyArr, keyGetterName, dataDiffer) {
  for (var i = 0; i < arr.length; i++) {
    // Add prefix to avoid conflict with Object.prototype.
    var key = '_ec_' + dataDiffer[keyGetterName](arr[i], i);
    var existence = map[key];

    if (existence == null) {
      keyArr.push(key);
      map[key] = i;
    } else {
      if (!existence.length) {
        map[key] = existence = [existence];
      }

      existence.push(i);
    }
  }
}

var _default = DataDiffer;
module.exports = _default;

/***/ }),

/***/ "862d":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__("6d8b");

var createHashMap = _util.createHashMap;
var each = _util.each;
var isString = _util.isString;
var defaults = _util.defaults;
var extend = _util.extend;
var isObject = _util.isObject;
var clone = _util.clone;

var _model = __webpack_require__("e0d3");

var normalizeToArray = _model.normalizeToArray;

var _sourceHelper = __webpack_require__("0f99");

var guessOrdinal = _sourceHelper.guessOrdinal;
var BE_ORDINAL = _sourceHelper.BE_ORDINAL;

var Source = __webpack_require__("ec6f");

var _dimensionHelper = __webpack_require__("2f45");

var OTHER_DIMENSIONS = _dimensionHelper.OTHER_DIMENSIONS;

var DataDimensionInfo = __webpack_require__("562e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @deprecated
 * Use `echarts/data/helper/createDimensions` instead.
 */

/**
 * @see {module:echarts/test/ut/spec/data/completeDimensions}
 *
 * This method builds the relationship between:
 * + "what the coord sys or series requires (see `sysDims`)",
 * + "what the user defines (in `encode` and `dimensions`, see `opt.dimsDef` and `opt.encodeDef`)"
 * + "what the data source provids (see `source`)".
 *
 * Some guess strategy will be adapted if user does not define something.
 * If no 'value' dimension specified, the first no-named dimension will be
 * named as 'value'.
 *
 * @param {Array.<string>} sysDims Necessary dimensions, like ['x', 'y'], which
 *      provides not only dim template, but also default order.
 *      properties: 'name', 'type', 'displayName'.
 *      `name` of each item provides default coord name.
 *      [{dimsDef: [string|Object, ...]}, ...] dimsDef of sysDim item provides default dim name, and
 *                                    provide dims count that the sysDim required.
 *      [{ordinalMeta}] can be specified.
 * @param {module:echarts/data/Source|Array|Object} source or data (for compatibal with pervious)
 * @param {Object} [opt]
 * @param {Array.<Object|string>} [opt.dimsDef] option.series.dimensions User defined dimensions
 *      For example: ['asdf', {name, type}, ...].
 * @param {Object|HashMap} [opt.encodeDef] option.series.encode {x: 2, y: [3, 1], tooltip: [1, 2], label: 3}
 * @param {Function} [opt.encodeDefaulter] Called if no `opt.encodeDef` exists.
 *      If not specified, auto find the next available data dim.
 *      param source {module:data/Source}
 *      param dimCount {number}
 *      return {Object} encode Never be `null/undefined`.
 * @param {string} [opt.generateCoord] Generate coord dim with the given name.
 *      If not specified, extra dim names will be:
 *      'value', 'value0', 'value1', ...
 * @param {number} [opt.generateCoordCount] By default, the generated dim name is `generateCoord`.
 *      If `generateCoordCount` specified, the generated dim names will be:
 *      `generateCoord` + 0, `generateCoord` + 1, ...
 *      can be Infinity, indicate that use all of the remain columns.
 * @param {number} [opt.dimCount] If not specified, guess by the first data item.
 * @return {Array.<module:data/DataDimensionInfo>}
 */
function completeDimensions(sysDims, source, opt) {
  if (!Source.isInstance(source)) {
    source = Source.seriesDataToSource(source);
  }

  opt = opt || {};
  sysDims = (sysDims || []).slice();
  var dimsDef = (opt.dimsDef || []).slice();
  var dataDimNameMap = createHashMap();
  var coordDimNameMap = createHashMap(); // var valueCandidate;

  var result = [];
  var dimCount = getDimCount(source, sysDims, dimsDef, opt.dimCount); // Apply user defined dims (`name` and `type`) and init result.

  for (var i = 0; i < dimCount; i++) {
    var dimDefItem = dimsDef[i] = extend({}, isObject(dimsDef[i]) ? dimsDef[i] : {
      name: dimsDef[i]
    });
    var userDimName = dimDefItem.name;
    var resultItem = result[i] = new DataDimensionInfo(); // Name will be applied later for avoiding duplication.

    if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
      // Only if `series.dimensions` is defined in option
      // displayName, will be set, and dimension will be diplayed vertically in
      // tooltip by default.
      resultItem.name = resultItem.displayName = userDimName;
      dataDimNameMap.set(userDimName, i);
    }

    dimDefItem.type != null && (resultItem.type = dimDefItem.type);
    dimDefItem.displayName != null && (resultItem.displayName = dimDefItem.displayName);
  }

  var encodeDef = opt.encodeDef;

  if (!encodeDef && opt.encodeDefaulter) {
    encodeDef = opt.encodeDefaulter(source, dimCount);
  }

  encodeDef = createHashMap(encodeDef); // Set `coordDim` and `coordDimIndex` by `encodeDef` and normalize `encodeDef`.

  encodeDef.each(function (dataDims, coordDim) {
    dataDims = normalizeToArray(dataDims).slice(); // Note: It is allowed that `dataDims.length` is `0`, e.g., options is
    // `{encode: {x: -1, y: 1}}`. Should not filter anything in
    // this case.

    if (dataDims.length === 1 && !isString(dataDims[0]) && dataDims[0] < 0) {
      encodeDef.set(coordDim, false);
      return;
    }

    var validDataDims = encodeDef.set(coordDim, []);
    each(dataDims, function (resultDimIdx, idx) {
      // The input resultDimIdx can be dim name or index.
      isString(resultDimIdx) && (resultDimIdx = dataDimNameMap.get(resultDimIdx));

      if (resultDimIdx != null && resultDimIdx < dimCount) {
        validDataDims[idx] = resultDimIdx;
        applyDim(result[resultDimIdx], coordDim, idx);
      }
    });
  }); // Apply templetes and default order from `sysDims`.

  var availDimIdx = 0;
  each(sysDims, function (sysDimItem, sysDimIndex) {
    var coordDim;
    var sysDimItem;
    var sysDimItemDimsDef;
    var sysDimItemOtherDims;

    if (isString(sysDimItem)) {
      coordDim = sysDimItem;
      sysDimItem = {};
    } else {
      coordDim = sysDimItem.name;
      var ordinalMeta = sysDimItem.ordinalMeta;
      sysDimItem.ordinalMeta = null;
      sysDimItem = clone(sysDimItem);
      sysDimItem.ordinalMeta = ordinalMeta; // `coordDimIndex` should not be set directly.

      sysDimItemDimsDef = sysDimItem.dimsDef;
      sysDimItemOtherDims = sysDimItem.otherDims;
      sysDimItem.name = sysDimItem.coordDim = sysDimItem.coordDimIndex = sysDimItem.dimsDef = sysDimItem.otherDims = null;
    }

    var dataDims = encodeDef.get(coordDim); // negative resultDimIdx means no need to mapping.

    if (dataDims === false) {
      return;
    }

    var dataDims = normalizeToArray(dataDims); // dimensions provides default dim sequences.

    if (!dataDims.length) {
      for (var i = 0; i < (sysDimItemDimsDef && sysDimItemDimsDef.length || 1); i++) {
        while (availDimIdx < result.length && result[availDimIdx].coordDim != null) {
          availDimIdx++;
        }

        availDimIdx < result.length && dataDims.push(availDimIdx++);
      }
    } // Apply templates.


    each(dataDims, function (resultDimIdx, coordDimIndex) {
      var resultItem = result[resultDimIdx];
      applyDim(defaults(resultItem, sysDimItem), coordDim, coordDimIndex);

      if (resultItem.name == null && sysDimItemDimsDef) {
        var sysDimItemDimsDefItem = sysDimItemDimsDef[coordDimIndex];
        !isObject(sysDimItemDimsDefItem) && (sysDimItemDimsDefItem = {
          name: sysDimItemDimsDefItem
        });
        resultItem.name = resultItem.displayName = sysDimItemDimsDefItem.name;
        resultItem.defaultTooltip = sysDimItemDimsDefItem.defaultTooltip;
      } // FIXME refactor, currently only used in case: {otherDims: {tooltip: false}}


      sysDimItemOtherDims && defaults(resultItem.otherDims, sysDimItemOtherDims);
    });
  });

  function applyDim(resultItem, coordDim, coordDimIndex) {
    if (OTHER_DIMENSIONS.get(coordDim) != null) {
      resultItem.otherDims[coordDim] = coordDimIndex;
    } else {
      resultItem.coordDim = coordDim;
      resultItem.coordDimIndex = coordDimIndex;
      coordDimNameMap.set(coordDim, true);
    }
  } // Make sure the first extra dim is 'value'.


  var generateCoord = opt.generateCoord;
  var generateCoordCount = opt.generateCoordCount;
  var fromZero = generateCoordCount != null;
  generateCoordCount = generateCoord ? generateCoordCount || 1 : 0;
  var extra = generateCoord || 'value'; // Set dim `name` and other `coordDim` and other props.

  for (var resultDimIdx = 0; resultDimIdx < dimCount; resultDimIdx++) {
    var resultItem = result[resultDimIdx] = result[resultDimIdx] || new DataDimensionInfo();
    var coordDim = resultItem.coordDim;

    if (coordDim == null) {
      resultItem.coordDim = genName(extra, coordDimNameMap, fromZero);
      resultItem.coordDimIndex = 0;

      if (!generateCoord || generateCoordCount <= 0) {
        resultItem.isExtraCoord = true;
      }

      generateCoordCount--;
    }

    resultItem.name == null && (resultItem.name = genName(resultItem.coordDim, dataDimNameMap));

    if (resultItem.type == null && (guessOrdinal(source, resultDimIdx, resultItem.name) === BE_ORDINAL.Must // Consider the case:
    // {
    //    dataset: {source: [
    //        ['2001', 123],
    //        ['2002', 456],
    //        ...
    //        ['The others', 987],
    //    ]},
    //    series: {type: 'pie'}
    // }
    // The first colum should better be treated as a "ordinal" although it
    // might not able to be detected as an "ordinal" by `guessOrdinal`.
    || resultItem.isExtraCoord && (resultItem.otherDims.itemName != null || resultItem.otherDims.seriesName != null))) {
      resultItem.type = 'ordinal';
    }
  }

  return result;
} // ??? TODO
// Originally detect dimCount by data[0]. Should we
// optimize it to only by sysDims and dimensions and encode.
// So only necessary dims will be initialized.
// But
// (1) custom series should be considered. where other dims
// may be visited.
// (2) sometimes user need to calcualte bubble size or use visualMap
// on other dimensions besides coordSys needed.
// So, dims that is not used by system, should be shared in storage?


function getDimCount(source, sysDims, dimsDef, optDimCount) {
  // Note that the result dimCount should not small than columns count
  // of data, otherwise `dataDimNameMap` checking will be incorrect.
  var dimCount = Math.max(source.dimensionsDetectCount || 1, sysDims.length, dimsDef.length, optDimCount || 0);
  each(sysDims, function (sysDimItem) {
    var sysDimItemDimsDef = sysDimItem.dimsDef;
    sysDimItemDimsDef && (dimCount = Math.max(dimCount, sysDimItemDimsDef.length));
  });
  return dimCount;
}

function genName(name, map, fromZero) {
  if (fromZero || map.get(name) != null) {
    var i = 0;

    while (map.get(name + i) != null) {
      i++;
    }

    name += i;
  }

  map.set(name, true);
  return name;
}

var _default = completeDimensions;
module.exports = _default;

/***/ }),

/***/ "8e43":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__("6d8b");

var createHashMap = _util.createHashMap;
var isObject = _util.isObject;
var map = _util.map;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @constructor
 * @param {Object} [opt]
 * @param {Object} [opt.categories=[]]
 * @param {Object} [opt.needCollect=false]
 * @param {Object} [opt.deduplication=false]
 */
function OrdinalMeta(opt) {
  /**
   * @readOnly
   * @type {Array.<string>}
   */
  this.categories = opt.categories || [];
  /**
   * @private
   * @type {boolean}
   */

  this._needCollect = opt.needCollect;
  /**
   * @private
   * @type {boolean}
   */

  this._deduplication = opt.deduplication;
  /**
   * @private
   * @type {boolean}
   */

  this._map;
}
/**
 * @param {module:echarts/model/Model} axisModel
 * @return {module:echarts/data/OrdinalMeta}
 */


OrdinalMeta.createByAxisModel = function (axisModel) {
  var option = axisModel.option;
  var data = option.data;
  var categories = data && map(data, getName);
  return new OrdinalMeta({
    categories: categories,
    needCollect: !categories,
    // deduplication is default in axis.
    deduplication: option.dedplication !== false
  });
};

var proto = OrdinalMeta.prototype;
/**
 * @param {string} category
 * @return {number} ordinal
 */

proto.getOrdinal = function (category) {
  return getOrCreateMap(this).get(category);
};
/**
 * @param {*} category
 * @return {number} The ordinal. If not found, return NaN.
 */


proto.parseAndCollect = function (category) {
  var index;
  var needCollect = this._needCollect; // The value of category dim can be the index of the given category set.
  // This feature is only supported when !needCollect, because we should
  // consider a common case: a value is 2017, which is a number but is
  // expected to be tread as a category. This case usually happen in dataset,
  // where it happent to be no need of the index feature.

  if (typeof category !== 'string' && !needCollect) {
    return category;
  } // Optimize for the scenario:
  // category is ['2012-01-01', '2012-01-02', ...], where the input
  // data has been ensured not duplicate and is large data.
  // Notice, if a dataset dimension provide categroies, usually echarts
  // should remove duplication except user tell echarts dont do that
  // (set axis.deduplication = false), because echarts do not know whether
  // the values in the category dimension has duplication (consider the
  // parallel-aqi example)


  if (needCollect && !this._deduplication) {
    index = this.categories.length;
    this.categories[index] = category;
    return index;
  }

  var map = getOrCreateMap(this);
  index = map.get(category);

  if (index == null) {
    if (needCollect) {
      index = this.categories.length;
      this.categories[index] = category;
      map.set(category, index);
    } else {
      index = NaN;
    }
  }

  return index;
}; // Consider big data, do not create map until needed.


function getOrCreateMap(ordinalMeta) {
  return ordinalMeta._map || (ordinalMeta._map = createHashMap(ordinalMeta.categories));
}

function getName(obj) {
  if (isObject(obj) && obj.value != null) {
    return obj.value;
  } else {
    return obj + '';
  }
}

var _default = OrdinalMeta;
module.exports = _default;

/***/ }),

/***/ "93d0":
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Avoid typo.
var SOURCE_FORMAT_ORIGINAL = 'original';
var SOURCE_FORMAT_ARRAY_ROWS = 'arrayRows';
var SOURCE_FORMAT_OBJECT_ROWS = 'objectRows';
var SOURCE_FORMAT_KEYED_COLUMNS = 'keyedColumns';
var SOURCE_FORMAT_UNKNOWN = 'unknown'; // ??? CHANGE A NAME

var SOURCE_FORMAT_TYPED_ARRAY = 'typedArray';
var SERIES_LAYOUT_BY_COLUMN = 'column';
var SERIES_LAYOUT_BY_ROW = 'row';
exports.SOURCE_FORMAT_ORIGINAL = SOURCE_FORMAT_ORIGINAL;
exports.SOURCE_FORMAT_ARRAY_ROWS = SOURCE_FORMAT_ARRAY_ROWS;
exports.SOURCE_FORMAT_OBJECT_ROWS = SOURCE_FORMAT_OBJECT_ROWS;
exports.SOURCE_FORMAT_KEYED_COLUMNS = SOURCE_FORMAT_KEYED_COLUMNS;
exports.SOURCE_FORMAT_UNKNOWN = SOURCE_FORMAT_UNKNOWN;
exports.SOURCE_FORMAT_TYPED_ARRAY = SOURCE_FORMAT_TYPED_ARRAY;
exports.SERIES_LAYOUT_BY_COLUMN = SERIES_LAYOUT_BY_COLUMN;
exports.SERIES_LAYOUT_BY_ROW = SERIES_LAYOUT_BY_ROW;

/***/ }),

/***/ "b1d4":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var completeDimensions = __webpack_require__("862d");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Substitute `completeDimensions`.
 * `completeDimensions` is to be deprecated.
 */

/**
 * @param {module:echarts/data/Source|module:echarts/data/List} source or data.
 * @param {Object|Array} [opt]
 * @param {Array.<string|Object>} [opt.coordDimensions=[]]
 * @param {number} [opt.dimensionsCount]
 * @param {string} [opt.generateCoord]
 * @param {string} [opt.generateCoordCount]
 * @param {Array.<string|Object>} [opt.dimensionsDefine=source.dimensionsDefine] Overwrite source define.
 * @param {Object|HashMap} [opt.encodeDefine=source.encodeDefine] Overwrite source define.
 * @param {Function} [opt.encodeDefaulter] Make default encode if user not specified.
 * @return {Array.<Object>} dimensionsInfo
 */
function _default(source, opt) {
  opt = opt || {};
  return completeDimensions(opt.coordDimensions || [], source, {
    dimsDef: opt.dimensionsDefine || source.dimensionsDefine,
    encodeDef: opt.encodeDefine || source.encodeDefine,
    dimCount: opt.dimensionsCount,
    encodeDefaulter: opt.encodeDefaulter,
    generateCoord: opt.generateCoord,
    generateCoordCount: opt.generateCoordCount
  });
}

module.exports = _default;

/***/ }),

/***/ "ec6f":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__("6d8b");

var createHashMap = _util.createHashMap;
var isTypedArray = _util.isTypedArray;

var _clazz = __webpack_require__("625e");

var enableClassCheck = _clazz.enableClassCheck;

var _sourceType = __webpack_require__("93d0");

var SOURCE_FORMAT_ORIGINAL = _sourceType.SOURCE_FORMAT_ORIGINAL;
var SERIES_LAYOUT_BY_COLUMN = _sourceType.SERIES_LAYOUT_BY_COLUMN;
var SOURCE_FORMAT_UNKNOWN = _sourceType.SOURCE_FORMAT_UNKNOWN;
var SOURCE_FORMAT_TYPED_ARRAY = _sourceType.SOURCE_FORMAT_TYPED_ARRAY;
var SOURCE_FORMAT_KEYED_COLUMNS = _sourceType.SOURCE_FORMAT_KEYED_COLUMNS;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * [sourceFormat]
 *
 * + "original":
 * This format is only used in series.data, where
 * itemStyle can be specified in data item.
 *
 * + "arrayRows":
 * [
 *     ['product', 'score', 'amount'],
 *     ['Matcha Latte', 89.3, 95.8],
 *     ['Milk Tea', 92.1, 89.4],
 *     ['Cheese Cocoa', 94.4, 91.2],
 *     ['Walnut Brownie', 85.4, 76.9]
 * ]
 *
 * + "objectRows":
 * [
 *     {product: 'Matcha Latte', score: 89.3, amount: 95.8},
 *     {product: 'Milk Tea', score: 92.1, amount: 89.4},
 *     {product: 'Cheese Cocoa', score: 94.4, amount: 91.2},
 *     {product: 'Walnut Brownie', score: 85.4, amount: 76.9}
 * ]
 *
 * + "keyedColumns":
 * {
 *     'product': ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
 *     'count': [823, 235, 1042, 988],
 *     'score': [95.8, 81.4, 91.2, 76.9]
 * }
 *
 * + "typedArray"
 *
 * + "unknown"
 */

/**
 * @constructor
 * @param {Object} fields
 * @param {string} fields.sourceFormat
 * @param {Array|Object} fields.fromDataset
 * @param {Array|Object} [fields.data]
 * @param {string} [seriesLayoutBy='column']
 * @param {Array.<Object|string>} [dimensionsDefine]
 * @param {Objet|HashMap} [encodeDefine]
 * @param {number} [startIndex=0]
 * @param {number} [dimensionsDetectCount]
 */
function Source(fields) {
  /**
   * @type {boolean}
   */
  this.fromDataset = fields.fromDataset;
  /**
   * Not null/undefined.
   * @type {Array|Object}
   */

  this.data = fields.data || (fields.sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS ? {} : []);
  /**
   * See also "detectSourceFormat".
   * Not null/undefined.
   * @type {string}
   */

  this.sourceFormat = fields.sourceFormat || SOURCE_FORMAT_UNKNOWN;
  /**
   * 'row' or 'column'
   * Not null/undefined.
   * @type {string} seriesLayoutBy
   */

  this.seriesLayoutBy = fields.seriesLayoutBy || SERIES_LAYOUT_BY_COLUMN;
  /**
   * dimensions definition in option.
   * can be null/undefined.
   * @type {Array.<Object|string>}
   */

  this.dimensionsDefine = fields.dimensionsDefine;
  /**
   * encode definition in option.
   * can be null/undefined.
   * @type {Objet|HashMap}
   */

  this.encodeDefine = fields.encodeDefine && createHashMap(fields.encodeDefine);
  /**
   * Not null/undefined, uint.
   * @type {number}
   */

  this.startIndex = fields.startIndex || 0;
  /**
   * Can be null/undefined (when unknown), uint.
   * @type {number}
   */

  this.dimensionsDetectCount = fields.dimensionsDetectCount;
}
/**
 * Wrap original series data for some compatibility cases.
 */


Source.seriesDataToSource = function (data) {
  return new Source({
    data: data,
    sourceFormat: isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL,
    fromDataset: false
  });
};

enableClassCheck(Source);
var _default = Source;
module.exports = _default;

/***/ }),

/***/ "ee1a":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__("6d8b");

var each = _util.each;
var isString = _util.isString;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Note that it is too complicated to support 3d stack by value
 * (have to create two-dimension inverted index), so in 3d case
 * we just support that stacked by index.
 *
 * @param {module:echarts/model/Series} seriesModel
 * @param {Array.<string|Object>} dimensionInfoList The same as the input of <module:echarts/data/List>.
 *        The input dimensionInfoList will be modified.
 * @param {Object} [opt]
 * @param {boolean} [opt.stackedCoordDimension=''] Specify a coord dimension if needed.
 * @param {boolean} [opt.byIndex=false]
 * @return {Object} calculationInfo
 * {
 *     stackedDimension: string
 *     stackedByDimension: string
 *     isStackedByIndex: boolean
 *     stackedOverDimension: string
 *     stackResultDimension: string
 * }
 */
function enableDataStack(seriesModel, dimensionInfoList, opt) {
  opt = opt || {};
  var byIndex = opt.byIndex;
  var stackedCoordDimension = opt.stackedCoordDimension; // Compatibal: when `stack` is set as '', do not stack.

  var mayStack = !!(seriesModel && seriesModel.get('stack'));
  var stackedByDimInfo;
  var stackedDimInfo;
  var stackResultDimension;
  var stackedOverDimension;
  each(dimensionInfoList, function (dimensionInfo, index) {
    if (isString(dimensionInfo)) {
      dimensionInfoList[index] = dimensionInfo = {
        name: dimensionInfo
      };
    }

    if (mayStack && !dimensionInfo.isExtraCoord) {
      // Find the first ordinal dimension as the stackedByDimInfo.
      if (!byIndex && !stackedByDimInfo && dimensionInfo.ordinalMeta) {
        stackedByDimInfo = dimensionInfo;
      } // Find the first stackable dimension as the stackedDimInfo.


      if (!stackedDimInfo && dimensionInfo.type !== 'ordinal' && dimensionInfo.type !== 'time' && (!stackedCoordDimension || stackedCoordDimension === dimensionInfo.coordDim)) {
        stackedDimInfo = dimensionInfo;
      }
    }
  });

  if (stackedDimInfo && !byIndex && !stackedByDimInfo) {
    // Compatible with previous design, value axis (time axis) only stack by index.
    // It may make sense if the user provides elaborately constructed data.
    byIndex = true;
  } // Add stack dimension, they can be both calculated by coordinate system in `unionExtent`.
  // That put stack logic in List is for using conveniently in echarts extensions, but it
  // might not be a good way.


  if (stackedDimInfo) {
    // Use a weird name that not duplicated with other names.
    stackResultDimension = '__\0ecstackresult';
    stackedOverDimension = '__\0ecstackedover'; // Create inverted index to fast query index by value.

    if (stackedByDimInfo) {
      stackedByDimInfo.createInvertedIndices = true;
    }

    var stackedDimCoordDim = stackedDimInfo.coordDim;
    var stackedDimType = stackedDimInfo.type;
    var stackedDimCoordIndex = 0;
    each(dimensionInfoList, function (dimensionInfo) {
      if (dimensionInfo.coordDim === stackedDimCoordDim) {
        stackedDimCoordIndex++;
      }
    });
    dimensionInfoList.push({
      name: stackResultDimension,
      coordDim: stackedDimCoordDim,
      coordDimIndex: stackedDimCoordIndex,
      type: stackedDimType,
      isExtraCoord: true,
      isCalculationCoord: true
    });
    stackedDimCoordIndex++;
    dimensionInfoList.push({
      name: stackedOverDimension,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: stackedOverDimension,
      coordDimIndex: stackedDimCoordIndex,
      type: stackedDimType,
      isExtraCoord: true,
      isCalculationCoord: true
    });
  }

  return {
    stackedDimension: stackedDimInfo && stackedDimInfo.name,
    stackedByDimension: stackedByDimInfo && stackedByDimInfo.name,
    isStackedByIndex: byIndex,
    stackedOverDimension: stackedOverDimension,
    stackResultDimension: stackResultDimension
  };
}
/**
 * @param {module:echarts/data/List} data
 * @param {string} stackedDim
 */


function isDimensionStacked(data, stackedDim
/*, stackedByDim*/
) {
  // Each single series only maps to one pair of axis. So we do not need to
  // check stackByDim, whatever stacked by a dimension or stacked by index.
  return !!stackedDim && stackedDim === data.getCalculationInfo('stackedDimension'); // && (
  //     stackedByDim != null
  //         ? stackedByDim === data.getCalculationInfo('stackedByDimension')
  //         : data.getCalculationInfo('isStackedByIndex')
  // );
}
/**
 * @param {module:echarts/data/List} data
 * @param {string} targetDim
 * @param {string} [stackedByDim] If not input this parameter, check whether
 *                                stacked by index.
 * @return {string} dimension
 */


function getStackedDimension(data, targetDim) {
  return isDimensionStacked(data, targetDim) ? data.getCalculationInfo('stackResultDimension') : targetDim;
}

exports.enableDataStack = enableDataStack;
exports.isDimensionStacked = isDimensionStacked;
exports.getStackedDimension = getStackedDimension;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~bdcda83c.57956aa7.js.map