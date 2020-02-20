(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~4939e289"],{

/***/ "00d8":
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
function dataToCoordSize(dataSize, dataItem) {
  dataItem = dataItem || [0, 0];
  return zrUtil.map([0, 1], function (dimIdx) {
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var p1 = [];
    var p2 = [];
    p1[dimIdx] = val - halfSize;
    p2[dimIdx] = val + halfSize;
    p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
    return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
  }, this);
}

function _default(coordSys) {
  var rect = coordSys.getBoundingRect();
  return {
    coordSys: {
      type: 'geo',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      zoom: coordSys.getZoom()
    },
    api: {
      coord: function (data) {
        // do not provide "out" and noRoam param,
        // Compatible with this usage:
        // echarts.util.map(item.points, api.coord)
        return coordSys.dataToPoint(data);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "0141":
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

var BoundingRect = __webpack_require__("9850");

var View = __webpack_require__("6cc5");

var geoSourceManager = __webpack_require__("5b87");

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
 * [Geo description]
 * For backward compatibility, the orginal interface:
 * `name, map, geoJson, specialAreas, nameMap` is kept.
 *
 * @param {string|Object} name
 * @param {string} map Map type
 *        Specify the positioned areas by left, top, width, height
 * @param {Object.<string, string>} [nameMap]
 *        Specify name alias
 * @param {boolean} [invertLongitute=true]
 */
function Geo(name, map, nameMap, invertLongitute) {
  View.call(this, name);
  /**
   * Map type
   * @type {string}
   */

  this.map = map;
  var source = geoSourceManager.load(map, nameMap);
  this._nameCoordMap = source.nameCoordMap;
  this._regionsMap = source.regionsMap;
  this._invertLongitute = invertLongitute == null ? true : invertLongitute;
  /**
   * @readOnly
   */

  this.regions = source.regions;
  /**
   * @type {module:zrender/src/core/BoundingRect}
   */

  this._rect = source.boundingRect;
}

Geo.prototype = {
  constructor: Geo,
  type: 'geo',

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['lng', 'lat'],

  /**
   * If contain given lng,lat coord
   * @param {Array.<number>}
   * @readOnly
   */
  containCoord: function (coord) {
    var regions = this.regions;

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].contain(coord)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @override
   */
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var invertLongitute = this._invertLongitute;
    rect = rect.clone();

    if (invertLongitute) {
      // Longitute is inverted
      rect.y = -rect.y - rect.height;
    }

    var rawTransformable = this._rawTransformable;
    rawTransformable.transform = rect.calculateTransform(new BoundingRect(x, y, width, height));
    rawTransformable.decomposeTransform();

    if (invertLongitute) {
      var scale = rawTransformable.scale;
      scale[1] = -scale[1];
    }

    rawTransformable.updateTransform();

    this._updateTransform();
  },

  /**
   * @param {string} name
   * @return {module:echarts/coord/geo/Region}
   */
  getRegion: function (name) {
    return this._regionsMap.get(name);
  },
  getRegionByCoord: function (coord) {
    var regions = this.regions;

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].contain(coord)) {
        return regions[i];
      }
    }
  },

  /**
   * Add geoCoord for indexing by name
   * @param {string} name
   * @param {Array.<number>} geoCoord
   */
  addGeoCoord: function (name, geoCoord) {
    this._nameCoordMap.set(name, geoCoord);
  },

  /**
   * Get geoCoord by name
   * @param {string} name
   * @return {Array.<number>}
   */
  getGeoCoord: function (name) {
    return this._nameCoordMap.get(name);
  },

  /**
   * @override
   */
  getBoundingRect: function () {
    return this._rect;
  },

  /**
   * @param {string|Array.<number>} data
   * @param {boolean} noRoam
   * @param {Array.<number>} [out]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, noRoam, out) {
    if (typeof data === 'string') {
      // Map area name to geoCoord
      data = this.getGeoCoord(data);
    }

    if (data) {
      return View.prototype.dataToPoint.call(this, data, noRoam, out);
    }
  },

  /**
   * @override
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @override
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData')
};
zrUtil.mixin(Geo, View);

function doConvert(methodName, ecModel, finder, value) {
  var geoModel = finder.geoModel;
  var seriesModel = finder.seriesModel;
  var coordSys = geoModel ? geoModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem // For map.
  || (seriesModel.getReferringComponents('geo')[0] || {}).coordinateSystem : null;
  return coordSys === this ? coordSys[methodName](value) : null;
}

var _default = Geo;
module.exports = _default;

/***/ }),

/***/ "0156":
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
 * Can only be called after coordinate system creation stage.
 * (Can be called before coordinate system update stage).
 *
 * @param {Object} opt {labelInside}
 * @return {Object} {
 *  position, rotation, labelDirection, labelOffset,
 *  tickDirection, labelRotate, z2
 * }
 */
function layout(gridModel, axisModel, opt) {
  opt = opt || {};
  var grid = gridModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout = {};
  var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
  var rawAxisPosition = axis.position;
  var axisPosition = otherAxisOnZeroOf ? 'onZero' : rawAxisPosition;
  var axisDim = axis.dim;
  var rect = grid.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var idx = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  };
  var axisOffset = axisModel.get('offset') || 0;
  var posBound = axisDim === 'x' ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];

  if (otherAxisOnZeroOf) {
    var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
    posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
  } // Axis position


  layout.position = [axisDim === 'y' ? posBound[idx[axisPosition]] : rectBound[0], axisDim === 'x' ? posBound[idx[axisPosition]] : rectBound[3]]; // Axis rotation

  layout.rotation = Math.PI / 2 * (axisDim === 'x' ? 0 : 1); // Tick and label direction, x y is axisDim

  var dirMap = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
  layout.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;

  if (axisModel.get('axisTick.inside')) {
    layout.tickDirection = -layout.tickDirection;
  }

  if (zrUtil.retrieve(opt.labelInside, axisModel.get('axisLabel.inside'))) {
    layout.labelDirection = -layout.labelDirection;
  } // Special label rotation


  var labelRotate = axisModel.get('axisLabel.rotate');
  layout.labelRotate = axisPosition === 'top' ? -labelRotate : labelRotate; // Over splitLine and splitArea

  layout.z2 = 1;
  return layout;
}

exports.layout = layout;

/***/ }),

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

/***/ "0f55":
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

var Axis = __webpack_require__("84ce");

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
 * @constructor module:echarts/coord/parallel/ParallelAxis
 * @extends {module:echarts/coord/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 */
var ParallelAxis = function (dim, scale, coordExtent, axisType, axisIndex) {
  Axis.call(this, dim, scale, coordExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = axisType || 'value';
  /**
   * @type {number}
   * @readOnly
   */

  this.axisIndex = axisIndex;
};

ParallelAxis.prototype = {
  constructor: ParallelAxis,

  /**
   * Axis model
   * @param {module:echarts/coord/parallel/AxisModel}
   */
  model: null,

  /**
   * @override
   */
  isHorizontal: function () {
    return this.coordinateSystem.getModel().get('layout') !== 'horizontal';
  }
};
zrUtil.inherits(ParallelAxis, Axis);
var _default = ParallelAxis;
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

/***/ "1748":
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

var echarts = __webpack_require__("3eba");

var zrUtil = __webpack_require__("6d8b");

var axisDefault = __webpack_require__("71ad");

var Model = __webpack_require__("4319");

var axisModelCommonMixin = __webpack_require__("2023");

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
var valueAxisDefault = axisDefault.valueAxis;

function defaultsShow(opt, show) {
  return zrUtil.defaults({
    show: show
  }, opt);
}

var RadarModel = echarts.extendComponentModel({
  type: 'radar',
  optionUpdated: function () {
    var boundaryGap = this.get('boundaryGap');
    var splitNumber = this.get('splitNumber');
    var scale = this.get('scale');
    var axisLine = this.get('axisLine');
    var axisTick = this.get('axisTick');
    var axisType = this.get('axisType');
    var axisLabel = this.get('axisLabel');
    var nameTextStyle = this.get('name');
    var showName = this.get('name.show');
    var nameFormatter = this.get('name.formatter');
    var nameGap = this.get('nameGap');
    var triggerEvent = this.get('triggerEvent');
    var indicatorModels = zrUtil.map(this.get('indicator') || [], function (indicatorOpt) {
      // PENDING
      if (indicatorOpt.max != null && indicatorOpt.max > 0 && !indicatorOpt.min) {
        indicatorOpt.min = 0;
      } else if (indicatorOpt.min != null && indicatorOpt.min < 0 && !indicatorOpt.max) {
        indicatorOpt.max = 0;
      }

      var iNameTextStyle = nameTextStyle;

      if (indicatorOpt.color != null) {
        iNameTextStyle = zrUtil.defaults({
          color: indicatorOpt.color
        }, nameTextStyle);
      } // Use same configuration


      indicatorOpt = zrUtil.merge(zrUtil.clone(indicatorOpt), {
        boundaryGap: boundaryGap,
        splitNumber: splitNumber,
        scale: scale,
        axisLine: axisLine,
        axisTick: axisTick,
        axisType: axisType,
        axisLabel: axisLabel,
        // Compatible with 2 and use text
        name: indicatorOpt.text,
        nameLocation: 'end',
        nameGap: nameGap,
        // min: 0,
        nameTextStyle: iNameTextStyle,
        triggerEvent: triggerEvent
      }, false);

      if (!showName) {
        indicatorOpt.name = '';
      }

      if (typeof nameFormatter === 'string') {
        var indName = indicatorOpt.name;
        indicatorOpt.name = nameFormatter.replace('{value}', indName != null ? indName : '');
      } else if (typeof nameFormatter === 'function') {
        indicatorOpt.name = nameFormatter(indicatorOpt.name, indicatorOpt);
      }

      var model = zrUtil.extend(new Model(indicatorOpt, null, this.ecModel), axisModelCommonMixin); // For triggerEvent.

      model.mainType = 'radar';
      model.componentIndex = this.componentIndex;
      return model;
    }, this);

    this.getIndicatorModels = function () {
      return indicatorModels;
    };
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    center: ['50%', '50%'],
    radius: '75%',
    startAngle: 90,
    name: {
      show: true // formatter: null
      // textStyle: {}

    },
    boundaryGap: [0, 0],
    splitNumber: 5,
    nameGap: 15,
    scale: false,
    // Polygon or circle
    shape: 'polygon',
    axisLine: zrUtil.merge({
      lineStyle: {
        color: '#bbb'
      }
    }, valueAxisDefault.axisLine),
    axisLabel: defaultsShow(valueAxisDefault.axisLabel, false),
    axisTick: defaultsShow(valueAxisDefault.axisTick, false),
    axisType: 'interval',
    splitLine: defaultsShow(valueAxisDefault.splitLine, true),
    splitArea: defaultsShow(valueAxisDefault.splitArea, true),
    // {text, min, max}
    indicator: []
  }
});
var _default = RadarModel;
module.exports = _default;

/***/ }),

/***/ "1792":
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
var coordsOffsetMap = {
  '南海诸岛': [32, 80],
  // 全国
  '广东': [0, -10],
  '香港': [10, 5],
  '澳门': [-10, 10],
  //'北京': [-10, 0],
  '天津': [5, 5]
};

function _default(mapType, region) {
  if (mapType === 'china') {
    var coordFix = coordsOffsetMap[region.name];

    if (coordFix) {
      var cp = region.center;
      cp[0] += coordFix[0] / 10.5;
      cp[1] += -coordFix[1] / (10.5 / 0.75);
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "1ccf":
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

var Polar = __webpack_require__("fd27");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

var _axisHelper = __webpack_require__("697e");

var createScaleByModel = _axisHelper.createScaleByModel;
var niceScaleExtent = _axisHelper.niceScaleExtent;

var CoordinateSystem = __webpack_require__("2039");

var _dataStackHelper = __webpack_require__("ee1a");

var getStackedDimension = _dataStackHelper.getStackedDimension;

__webpack_require__("78f0");

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
// TODO Axis scale

/**
 * Resize method bound to the polar
 * @param {module:echarts/coord/polar/PolarModel} polarModel
 * @param {module:echarts/ExtensionAPI} api
 */
function resizePolar(polar, polarModel, api) {
  var center = polarModel.get('center');
  var width = api.getWidth();
  var height = api.getHeight();
  polar.cx = parsePercent(center[0], width);
  polar.cy = parsePercent(center[1], height);
  var radiusAxis = polar.getRadiusAxis();
  var size = Math.min(width, height) / 2;
  var radius = polarModel.get('radius');

  if (radius == null) {
    radius = [0, '100%'];
  } else if (!zrUtil.isArray(radius)) {
    // r0 = 0
    radius = [0, radius];
  }

  radius = [parsePercent(radius[0], size), parsePercent(radius[1], size)];
  radiusAxis.inverse ? radiusAxis.setExtent(radius[1], radius[0]) : radiusAxis.setExtent(radius[0], radius[1]);
}
/**
 * Update polar
 */


function updatePolarScale(ecModel, api) {
  var polar = this;
  var angleAxis = polar.getAngleAxis();
  var radiusAxis = polar.getRadiusAxis(); // Reset scale

  angleAxis.scale.setExtent(Infinity, -Infinity);
  radiusAxis.scale.setExtent(Infinity, -Infinity);
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.coordinateSystem === polar) {
      var data = seriesModel.getData();
      zrUtil.each(data.mapDimension('radius', true), function (dim) {
        radiusAxis.scale.unionExtentFromData(data, getStackedDimension(data, dim));
      });
      zrUtil.each(data.mapDimension('angle', true), function (dim) {
        angleAxis.scale.unionExtentFromData(data, getStackedDimension(data, dim));
      });
    }
  });
  niceScaleExtent(angleAxis.scale, angleAxis.model);
  niceScaleExtent(radiusAxis.scale, radiusAxis.model); // Fix extent of category angle axis

  if (angleAxis.type === 'category' && !angleAxis.onBand) {
    var extent = angleAxis.getExtent();
    var diff = 360 / angleAxis.scale.count();
    angleAxis.inverse ? extent[1] += diff : extent[1] -= diff;
    angleAxis.setExtent(extent[0], extent[1]);
  }
}
/**
 * Set common axis properties
 * @param {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
 * @param {module:echarts/coord/polar/AxisModel}
 * @inner
 */


function setAxis(axis, axisModel) {
  axis.type = axisModel.get('type');
  axis.scale = createScaleByModel(axisModel);
  axis.onBand = axisModel.get('boundaryGap') && axis.type === 'category';
  axis.inverse = axisModel.get('inverse');

  if (axisModel.mainType === 'angleAxis') {
    axis.inverse ^= axisModel.get('clockwise');
    var startAngle = axisModel.get('startAngle');
    axis.setExtent(startAngle, startAngle + (axis.inverse ? -360 : 360));
  } // Inject axis instance


  axisModel.axis = axis;
  axis.model = axisModel;
}

var polarCreator = {
  dimensions: Polar.prototype.dimensions,
  create: function (ecModel, api) {
    var polarList = [];
    ecModel.eachComponent('polar', function (polarModel, idx) {
      var polar = new Polar(idx); // Inject resize and update method

      polar.update = updatePolarScale;
      var radiusAxis = polar.getRadiusAxis();
      var angleAxis = polar.getAngleAxis();
      var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
      var angleAxisModel = polarModel.findAxisModel('angleAxis');
      setAxis(radiusAxis, radiusAxisModel);
      setAxis(angleAxis, angleAxisModel);
      resizePolar(polar, polarModel, api);
      polarList.push(polar);
      polarModel.coordinateSystem = polar;
      polar.model = polarModel;
    }); // Inject coordinateSystem to series

    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.get('coordinateSystem') === 'polar') {
        var polarModel = ecModel.queryComponents({
          mainType: 'polar',
          index: seriesModel.get('polarIndex'),
          id: seriesModel.get('polarId')
        })[0];
        seriesModel.coordinateSystem = polarModel.coordinateSystem;
      }
    });
    return polarList;
  }
};
CoordinateSystem.register('polar', polarCreator);

/***/ }),

/***/ "1f1a":
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

var modelUtil = __webpack_require__("e0d3");

var ComponentModel = __webpack_require__("6cb7");

var Model = __webpack_require__("4319");

var selectableMixin = __webpack_require__("7023");

var geoCreator = __webpack_require__("eeea");

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
var GeoModel = ComponentModel.extend({
  type: 'geo',

  /**
   * @type {module:echarts/coord/geo/Geo}
   */
  coordinateSystem: null,
  layoutMode: 'box',
  init: function (option) {
    ComponentModel.prototype.init.apply(this, arguments); // Default label emphasis `show`

    modelUtil.defaultEmphasis(option, 'label', ['show']);
  },
  optionUpdated: function () {
    var option = this.option;
    var self = this;
    option.regions = geoCreator.getFilledRegions(option.regions, option.map, option.nameMap);
    this._optionModelMap = zrUtil.reduce(option.regions || [], function (optionModelMap, regionOpt) {
      if (regionOpt.name) {
        optionModelMap.set(regionOpt.name, new Model(regionOpt, self));
      }

      return optionModelMap;
    }, zrUtil.createHashMap());
    this.updateSelectedMap(option.regions);
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    show: true,
    left: 'center',
    top: 'center',
    // width:,
    // height:,
    // right
    // bottom
    // Aspect is width / height. Inited to be geoJson bbox aspect
    // This parameter is used for scale this aspect
    // If svg used, aspectScale is 1 by default.
    // aspectScale: 0.75,
    aspectScale: null,
    ///// Layout with center and size
    // If you wan't to put map in a fixed size box with right aspect ratio
    // This two properties may more conveninet
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    silent: false,
    // Map type
    map: '',
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ]
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    // selectedMode: false
    label: {
      show: false,
      color: '#000'
    },
    itemStyle: {
      // color: 各异,
      borderWidth: 0.5,
      borderColor: '#444',
      color: '#eee'
    },
    emphasis: {
      label: {
        show: true,
        color: 'rgb(100,0,0)'
      },
      itemStyle: {
        color: 'rgba(255,215,0,0.8)'
      }
    },
    regions: []
  },

  /**
   * Get model of region
   * @param  {string} name
   * @return {module:echarts/model/Model}
   */
  getRegionModel: function (name) {
    return this._optionModelMap.get(name) || new Model(null, this, this.ecModel);
  },

  /**
   * Format label
   * @param {string} name Region name
   * @param {string} [status='normal'] 'normal' or 'emphasis'
   * @return {string}
   */
  getFormattedLabel: function (name, status) {
    var regionModel = this.getRegionModel(name);
    var formatter = regionModel.get('label' + (status === 'normal' ? '.' : status + '.') + 'formatter');
    var params = {
      name: name
    };

    if (typeof formatter === 'function') {
      params.status = status;
      return formatter(params);
    } else if (typeof formatter === 'string') {
      return formatter.replace('{a}', name != null ? name : '');
    }
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  }
});
zrUtil.mixin(GeoModel, selectableMixin);
var _default = GeoModel;
module.exports = _default;

/***/ }),

/***/ "2023":
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
// import * as axisHelper from './axisHelper';
var _default = {
  /**
   * @param {boolean} origin
   * @return {number|string} min value or 'dataMin' or null/undefined (means auto) or NaN
   */
  getMin: function (origin) {
    var option = this.option;
    var min = !origin && option.rangeStart != null ? option.rangeStart : option.min;

    if (this.axis && min != null && min !== 'dataMin' && typeof min !== 'function' && !zrUtil.eqNaN(min)) {
      min = this.axis.scale.parse(min);
    }

    return min;
  },

  /**
   * @param {boolean} origin
   * @return {number|string} max value or 'dataMax' or null/undefined (means auto) or NaN
   */
  getMax: function (origin) {
    var option = this.option;
    var max = !origin && option.rangeEnd != null ? option.rangeEnd : option.max;

    if (this.axis && max != null && max !== 'dataMax' && typeof max !== 'function' && !zrUtil.eqNaN(max)) {
      max = this.axis.scale.parse(max);
    }

    return max;
  },

  /**
   * @return {boolean}
   */
  getNeedCrossZero: function () {
    var option = this.option;
    return option.rangeStart != null || option.rangeEnd != null ? false : !option.scale;
  },

  /**
   * Should be implemented by each axis model if necessary.
   * @return {module:echarts/model/Component} coordinate system model
   */
  getCoordSysModel: zrUtil.noop,

  /**
   * @param {number} rangeStart Can only be finite number or null/undefined or NaN.
   * @param {number} rangeEnd Can only be finite number or null/undefined or NaN.
   */
  setRange: function (rangeStart, rangeEnd) {
    this.option.rangeStart = rangeStart;
    this.option.rangeEnd = rangeEnd;
  },

  /**
   * Reset range
   */
  resetRange: function () {
    // rangeStart and rangeEnd is readonly.
    this.option.rangeStart = this.option.rangeEnd = null;
  }
};
module.exports = _default;

/***/ }),

/***/ "217c":
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

var Component = __webpack_require__("6cb7");

__webpack_require__("df3a0");

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
var _default = Component.extend({
  type: 'parallel',
  dependencies: ['parallelAxis'],

  /**
   * @type {module:echarts/coord/parallel/Parallel}
   */
  coordinateSystem: null,

  /**
   * Each item like: 'dim0', 'dim1', 'dim2', ...
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: null,

  /**
   * Coresponding to dimensions.
   * @type {Array.<number>}
   * @readOnly
   */
  parallelAxisIndex: null,
  layoutMode: 'box',
  defaultOption: {
    zlevel: 0,
    z: 0,
    left: 80,
    top: 60,
    right: 80,
    bottom: 60,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    layout: 'horizontal',
    // 'horizontal' or 'vertical'
    // FIXME
    // naming?
    axisExpandable: false,
    axisExpandCenter: null,
    axisExpandCount: 0,
    axisExpandWidth: 50,
    // FIXME '10%' ?
    axisExpandRate: 17,
    axisExpandDebounce: 50,
    // [out, in, jumpTarget]. In percentage. If use [null, 0.05], null means full.
    // Do not doc to user until necessary.
    axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
    axisExpandTriggerOn: 'click',
    // 'mousemove' or 'click'
    parallelAxisDefault: null
  },

  /**
   * @override
   */
  init: function () {
    Component.prototype.init.apply(this, arguments);
    this.mergeOption({});
  },

  /**
   * @override
   */
  mergeOption: function (newOption) {
    var thisOption = this.option;
    newOption && zrUtil.merge(thisOption, newOption, true);

    this._initDimensions();
  },

  /**
   * Whether series or axis is in this coordinate system.
   * @param {module:echarts/model/Series|module:echarts/coord/parallel/AxisModel} model
   * @param {module:echarts/model/Global} ecModel
   */
  contains: function (model, ecModel) {
    var parallelIndex = model.get('parallelIndex');
    return parallelIndex != null && ecModel.getComponent('parallel', parallelIndex) === this;
  },
  setAxisExpand: function (opt) {
    zrUtil.each(['axisExpandable', 'axisExpandCenter', 'axisExpandCount', 'axisExpandWidth', 'axisExpandWindow'], function (name) {
      if (opt.hasOwnProperty(name)) {
        this.option[name] = opt[name];
      }
    }, this);
  },

  /**
   * @private
   */
  _initDimensions: function () {
    var dimensions = this.dimensions = [];
    var parallelAxisIndex = this.parallelAxisIndex = [];
    var axisModels = zrUtil.filter(this.dependentModels.parallelAxis, function (axisModel) {
      // Can not use this.contains here, because
      // initialization has not been completed yet.
      return (axisModel.get('parallelIndex') || 0) === this.componentIndex;
    }, this);
    zrUtil.each(axisModels, function (axisModel) {
      dimensions.push('dim' + axisModel.get('dim'));
      parallelAxisIndex.push(axisModel.componentIndex);
    });
  }
});

module.exports = _default;

/***/ }),

/***/ "23e0":
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

var IndicatorAxis = __webpack_require__("7887");

var IntervalScale = __webpack_require__("89e3");

var numberUtil = __webpack_require__("3842");

var _axisHelper = __webpack_require__("697e");

var getScaleExtent = _axisHelper.getScaleExtent;
var niceScaleExtent = _axisHelper.niceScaleExtent;

var CoordinateSystem = __webpack_require__("2039");

var LogScale = __webpack_require__("8c2a");

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
// TODO clockwise
function Radar(radarModel, ecModel, api) {
  this._model = radarModel;
  /**
   * Radar dimensions
   * @type {Array.<string>}
   */

  this.dimensions = [];
  this._indicatorAxes = zrUtil.map(radarModel.getIndicatorModels(), function (indicatorModel, idx) {
    var dim = 'indicator_' + idx;
    var indicatorAxis = new IndicatorAxis(dim, indicatorModel.get('axisType') === 'log' ? new LogScale() : new IntervalScale());
    indicatorAxis.name = indicatorModel.get('name'); // Inject model and axis

    indicatorAxis.model = indicatorModel;
    indicatorModel.axis = indicatorAxis;
    this.dimensions.push(dim);
    return indicatorAxis;
  }, this);
  this.resize(radarModel, api);
  /**
   * @type {number}
   * @readOnly
   */

  this.cx;
  /**
   * @type {number}
   * @readOnly
   */

  this.cy;
  /**
   * @type {number}
   * @readOnly
   */

  this.r;
  /**
   * @type {number}
   * @readOnly
   */

  this.r0;
  /**
   * @type {number}
   * @readOnly
   */

  this.startAngle;
}

Radar.prototype.getIndicatorAxes = function () {
  return this._indicatorAxes;
};

Radar.prototype.dataToPoint = function (value, indicatorIndex) {
  var indicatorAxis = this._indicatorAxes[indicatorIndex];
  return this.coordToPoint(indicatorAxis.dataToCoord(value), indicatorIndex);
};

Radar.prototype.coordToPoint = function (coord, indicatorIndex) {
  var indicatorAxis = this._indicatorAxes[indicatorIndex];
  var angle = indicatorAxis.angle;
  var x = this.cx + coord * Math.cos(angle);
  var y = this.cy - coord * Math.sin(angle);
  return [x, y];
};

Radar.prototype.pointToData = function (pt) {
  var dx = pt[0] - this.cx;
  var dy = pt[1] - this.cy;
  var radius = Math.sqrt(dx * dx + dy * dy);
  dx /= radius;
  dy /= radius;
  var radian = Math.atan2(-dy, dx); // Find the closest angle
  // FIXME index can calculated directly

  var minRadianDiff = Infinity;
  var closestAxis;
  var closestAxisIdx = -1;

  for (var i = 0; i < this._indicatorAxes.length; i++) {
    var indicatorAxis = this._indicatorAxes[i];
    var diff = Math.abs(radian - indicatorAxis.angle);

    if (diff < minRadianDiff) {
      closestAxis = indicatorAxis;
      closestAxisIdx = i;
      minRadianDiff = diff;
    }
  }

  return [closestAxisIdx, +(closestAxis && closestAxis.coordToData(radius))];
};

Radar.prototype.resize = function (radarModel, api) {
  var center = radarModel.get('center');
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  var viewSize = Math.min(viewWidth, viewHeight) / 2;
  this.cx = numberUtil.parsePercent(center[0], viewWidth);
  this.cy = numberUtil.parsePercent(center[1], viewHeight);
  this.startAngle = radarModel.get('startAngle') * Math.PI / 180; // radius may be single value like `20`, `'80%'`, or array like `[10, '80%']`

  var radius = radarModel.get('radius');

  if (typeof radius === 'string' || typeof radius === 'number') {
    radius = [0, radius];
  }

  this.r0 = numberUtil.parsePercent(radius[0], viewSize);
  this.r = numberUtil.parsePercent(radius[1], viewSize);
  zrUtil.each(this._indicatorAxes, function (indicatorAxis, idx) {
    indicatorAxis.setExtent(this.r0, this.r);
    var angle = this.startAngle + idx * Math.PI * 2 / this._indicatorAxes.length; // Normalize to [-PI, PI]

    angle = Math.atan2(Math.sin(angle), Math.cos(angle));
    indicatorAxis.angle = angle;
  }, this);
};

Radar.prototype.update = function (ecModel, api) {
  var indicatorAxes = this._indicatorAxes;
  var radarModel = this._model;
  zrUtil.each(indicatorAxes, function (indicatorAxis) {
    indicatorAxis.scale.setExtent(Infinity, -Infinity);
  });
  ecModel.eachSeriesByType('radar', function (radarSeries, idx) {
    if (radarSeries.get('coordinateSystem') !== 'radar' || ecModel.getComponent('radar', radarSeries.get('radarIndex')) !== radarModel) {
      return;
    }

    var data = radarSeries.getData();
    zrUtil.each(indicatorAxes, function (indicatorAxis) {
      indicatorAxis.scale.unionExtentFromData(data, data.mapDimension(indicatorAxis.dim));
    });
  }, this);
  var splitNumber = radarModel.get('splitNumber');

  function increaseInterval(interval) {
    var exp10 = Math.pow(10, Math.floor(Math.log(interval) / Math.LN10)); // Increase interval

    var f = interval / exp10;

    if (f === 2) {
      f = 5;
    } else {
      // f is 2 or 5
      f *= 2;
    }

    return f * exp10;
  } // Force all the axis fixing the maxSplitNumber.


  zrUtil.each(indicatorAxes, function (indicatorAxis, idx) {
    var rawExtent = getScaleExtent(indicatorAxis.scale, indicatorAxis.model);
    niceScaleExtent(indicatorAxis.scale, indicatorAxis.model);
    var axisModel = indicatorAxis.model;
    var scale = indicatorAxis.scale;
    var fixedMin = axisModel.getMin();
    var fixedMax = axisModel.getMax();
    var interval = scale.getInterval();

    if (fixedMin != null && fixedMax != null) {
      // User set min, max, divide to get new interval
      scale.setExtent(+fixedMin, +fixedMax);
      scale.setInterval((fixedMax - fixedMin) / splitNumber);
    } else if (fixedMin != null) {
      var max; // User set min, expand extent on the other side

      do {
        max = fixedMin + interval * splitNumber;
        scale.setExtent(+fixedMin, max); // Interval must been set after extent
        // FIXME

        scale.setInterval(interval);
        interval = increaseInterval(interval);
      } while (max < rawExtent[1] && isFinite(max) && isFinite(rawExtent[1]));
    } else if (fixedMax != null) {
      var min; // User set min, expand extent on the other side

      do {
        min = fixedMax - interval * splitNumber;
        scale.setExtent(min, +fixedMax);
        scale.setInterval(interval);
        interval = increaseInterval(interval);
      } while (min > rawExtent[0] && isFinite(min) && isFinite(rawExtent[0]));
    } else {
      var nicedSplitNumber = scale.getTicks().length - 1;

      if (nicedSplitNumber > splitNumber) {
        interval = increaseInterval(interval);
      } // PENDING


      var center = Math.round((rawExtent[0] + rawExtent[1]) / 2 / interval) * interval;
      var halfSplitNumber = Math.round(splitNumber / 2);
      scale.setExtent(numberUtil.round(center - halfSplitNumber * interval), numberUtil.round(center + (splitNumber - halfSplitNumber) * interval));
      scale.setInterval(interval);
    }
  });
};
/**
 * Radar dimensions is based on the data
 * @type {Array}
 */


Radar.dimensions = [];

Radar.create = function (ecModel, api) {
  var radarList = [];
  ecModel.eachComponent('radar', function (radarModel) {
    var radar = new Radar(radarModel, ecModel, api);
    radarList.push(radar);
    radarModel.coordinateSystem = radar;
  });
  ecModel.eachSeriesByType('radar', function (radarSeries) {
    if (radarSeries.get('coordinateSystem') === 'radar') {
      // Inject coordinate system
      radarSeries.coordinateSystem = radarList[radarSeries.get('radarIndex') || 0];
    }
  });
  return radarList;
};

CoordinateSystem.register('radar', Radar);
var _default = Radar;
module.exports = _default;

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

/***/ "307b":
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
function dataToCoordSize(dataSize, dataItem) {
  // dataItem is necessary in log axis.
  var axis = this.getAxis();
  var val = dataItem instanceof Array ? dataItem[0] : dataItem;
  var halfSize = (dataSize instanceof Array ? dataSize[0] : dataSize) / 2;
  return axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
}

function _default(coordSys) {
  var rect = coordSys.getRect();
  return {
    coordSys: {
      type: 'singleAxis',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function (val) {
        // do not provide "out" param
        return coordSys.dataToPoint(val);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

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

/***/ "320a":
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

var Region = __webpack_require__("f279");

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
// Fix for 南海诸岛
var geoCoord = [126, 25];
var points = [[[0, 3.5], [7, 11.2], [15, 11.9], [30, 7], [42, 0.7], [52, 0.7], [56, 7.7], [59, 0.7], [64, 0.7], [64, 0], [5, 0], [0, 3.5]], [[13, 16.1], [19, 14.7], [16, 21.7], [11, 23.1], [13, 16.1]], [[12, 32.2], [14, 38.5], [15, 38.5], [13, 32.2], [12, 32.2]], [[16, 47.6], [12, 53.2], [13, 53.2], [18, 47.6], [16, 47.6]], [[6, 64.4], [8, 70], [9, 70], [8, 64.4], [6, 64.4]], [[23, 82.6], [29, 79.8], [30, 79.8], [25, 82.6], [23, 82.6]], [[37, 70.7], [43, 62.3], [44, 62.3], [39, 70.7], [37, 70.7]], [[48, 51.1], [51, 45.5], [53, 45.5], [50, 51.1], [48, 51.1]], [[51, 35], [51, 28.7], [53, 28.7], [53, 35], [51, 35]], [[52, 22.4], [55, 17.5], [56, 17.5], [53, 22.4], [52, 22.4]], [[58, 12.6], [62, 7], [63, 7], [60, 12.6], [58, 12.6]], [[0, 3.5], [0, 93.1], [64, 93.1], [64, 0], [63, 0], [63, 92.4], [1, 92.4], [1, 3.5], [0, 3.5]]];

for (var i = 0; i < points.length; i++) {
  for (var k = 0; k < points[i].length; k++) {
    points[i][k][0] /= 10.5;
    points[i][k][1] /= -10.5 / 0.75;
    points[i][k][0] += geoCoord[0];
    points[i][k][1] += geoCoord[1];
  }
}

function _default(mapType, regions) {
  if (mapType === 'china') {
    regions.push(new Region('南海诸岛', zrUtil.map(points, function (exterior) {
      return {
        type: 'polygon',
        exterior: exterior
      };
    }), geoCoord));
  }
}

module.exports = _default;

/***/ }),

/***/ "4338":
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

var Single = __webpack_require__("4bf6");

var CoordinateSystem = __webpack_require__("2039");

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
 * Single coordinate system creator.
 */

/**
 * Create single coordinate system and inject it into seriesModel.
 *
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 * @return {Array.<module:echarts/coord/single/Single>}
 */
function create(ecModel, api) {
  var singles = [];
  ecModel.eachComponent('singleAxis', function (axisModel, idx) {
    var single = new Single(axisModel, ecModel, api);
    single.name = 'single_' + idx;
    single.resize(axisModel, api);
    axisModel.coordinateSystem = single;
    singles.push(single);
  });
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'singleAxis') {
      var singleAxisModel = ecModel.queryComponents({
        mainType: 'singleAxis',
        index: seriesModel.get('singleAxisIndex'),
        id: seriesModel.get('singleAxisId')
      })[0];
      seriesModel.coordinateSystem = singleAxisModel && singleAxisModel.coordinateSystem;
    }
  });
  return singles;
}

CoordinateSystem.register('single', {
  create: create,
  dimensions: Single.prototype.dimensions
});

/***/ }),

/***/ "471e":
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
function _default(coordSys) {
  var rect = coordSys.getRect();
  var rangeInfo = coordSys.getRangeInfo();
  return {
    coordSys: {
      type: 'calendar',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      cellWidth: coordSys.getCellWidth(),
      cellHeight: coordSys.getCellHeight(),
      rangeInfo: {
        start: rangeInfo.start,
        end: rangeInfo.end,
        weeks: rangeInfo.weeks,
        dayCount: rangeInfo.allDay
      }
    },
    api: {
      coord: function (data, clamp) {
        return coordSys.dataToPoint(data, clamp);
      }
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "48c7":
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

var ComponentModel = __webpack_require__("6cb7");

var axisModelCreator = __webpack_require__("9e47");

var axisModelCommonMixin = __webpack_require__("2023");

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
var AxisModel = ComponentModel.extend({
  type: 'cartesian2dAxis',

  /**
   * @type {module:echarts/coord/cartesian/Axis2D}
   */
  axis: null,

  /**
   * @override
   */
  init: function () {
    AxisModel.superApply(this, 'init', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  mergeOption: function () {
    AxisModel.superApply(this, 'mergeOption', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  restoreData: function () {
    AxisModel.superApply(this, 'restoreData', arguments);
    this.resetRange();
  },

  /**
   * @override
   * @return {module:echarts/model/Component}
   */
  getCoordSysModel: function () {
    return this.ecModel.queryComponents({
      mainType: 'grid',
      index: this.option.gridIndex,
      id: this.option.gridId
    })[0];
  }
});

function getAxisType(axisDim, option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  // Offset is for multiple axis on the same position
  offset: 0
};
axisModelCreator('x', AxisModel, getAxisType, extraOption);
axisModelCreator('y', AxisModel, getAxisType, extraOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "4bf6":
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

var SingleAxis = __webpack_require__("66fc");

var axisHelper = __webpack_require__("697e");

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

var _util = __webpack_require__("6d8b");

var each = _util.each;

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
 * Single coordinates system.
 */

/**
 * Create a single coordinates system.
 *
 * @param {module:echarts/coord/single/AxisModel} axisModel
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 */
function Single(axisModel, ecModel, api) {
  /**
   * @type {string}
   * @readOnly
   */
  this.dimension = 'single';
  /**
   * Add it just for draw tooltip.
   *
   * @type {Array.<string>}
   * @readOnly
   */

  this.dimensions = ['single'];
  /**
   * @private
   * @type {module:echarts/coord/single/SingleAxis}.
   */

  this._axis = null;
  /**
   * @private
   * @type {module:zrender/core/BoundingRect}
   */

  this._rect;

  this._init(axisModel, ecModel, api);
  /**
   * @type {module:echarts/coord/single/AxisModel}
   */


  this.model = axisModel;
}

Single.prototype = {
  type: 'singleAxis',
  axisPointerEnabled: true,
  constructor: Single,

  /**
   * Initialize single coordinate system.
   *
   * @param  {module:echarts/coord/single/AxisModel} axisModel
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   * @private
   */
  _init: function (axisModel, ecModel, api) {
    var dim = this.dimension;
    var axis = new SingleAxis(dim, axisHelper.createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisModel.get('position'));
    var isCategory = axis.type === 'category';
    axis.onBand = isCategory && axisModel.get('boundaryGap');
    axis.inverse = axisModel.get('inverse');
    axis.orient = axisModel.get('orient');
    axisModel.axis = axis;
    axis.model = axisModel;
    axis.coordinateSystem = this;
    this._axis = axis;
  },

  /**
   * Update axis scale after data processed
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  update: function (ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.coordinateSystem === this) {
        var data = seriesModel.getData();
        each(data.mapDimension(this.dimension, true), function (dim) {
          this._axis.scale.unionExtentFromData(data, dim);
        }, this);
        axisHelper.niceScaleExtent(this._axis.scale, this._axis.model);
      }
    }, this);
  },

  /**
   * Resize the single coordinate system.
   *
   * @param  {module:echarts/coord/single/AxisModel} axisModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  resize: function (axisModel, api) {
    this._rect = getLayoutRect({
      left: axisModel.get('left'),
      top: axisModel.get('top'),
      right: axisModel.get('right'),
      bottom: axisModel.get('bottom'),
      width: axisModel.get('width'),
      height: axisModel.get('height')
    }, {
      width: api.getWidth(),
      height: api.getHeight()
    });

    this._adjustAxis();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getRect: function () {
    return this._rect;
  },

  /**
   * @private
   */
  _adjustAxis: function () {
    var rect = this._rect;
    var axis = this._axis;
    var isHorizontal = axis.isHorizontal();
    var extent = isHorizontal ? [0, rect.width] : [0, rect.height];
    var idx = axis.reverse ? 1 : 0;
    axis.setExtent(extent[idx], extent[1 - idx]);

    this._updateAxisTransform(axis, isHorizontal ? rect.x : rect.y);
  },

  /**
   * @param  {module:echarts/coord/single/SingleAxis} axis
   * @param  {number} coordBase
   */
  _updateAxisTransform: function (axis, coordBase) {
    var axisExtent = axis.getExtent();
    var extentSum = axisExtent[0] + axisExtent[1];
    var isHorizontal = axis.isHorizontal();
    axis.toGlobalCoord = isHorizontal ? function (coord) {
      return coord + coordBase;
    } : function (coord) {
      return extentSum - coord + coordBase;
    };
    axis.toLocalCoord = isHorizontal ? function (coord) {
      return coord - coordBase;
    } : function (coord) {
      return extentSum - coord + coordBase;
    };
  },

  /**
   * Get axis.
   *
   * @return {module:echarts/coord/single/SingleAxis}
   */
  getAxis: function () {
    return this._axis;
  },

  /**
   * Get axis, add it just for draw tooltip.
   *
   * @return {[type]} [description]
   */
  getBaseAxis: function () {
    return this._axis;
  },

  /**
   * @return {Array.<module:echarts/coord/Axis>}
   */
  getAxes: function () {
    return [this._axis];
  },

  /**
   * @return {Object} {baseAxes: [], otherAxes: []}
   */
  getTooltipAxes: function () {
    return {
      baseAxes: [this.getAxis()]
    };
  },

  /**
   * If contain point.
   *
   * @param  {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var rect = this.getRect();
    var axis = this.getAxis();
    var orient = axis.orient;

    if (orient === 'horizontal') {
      return axis.contain(axis.toLocalCoord(point[0])) && point[1] >= rect.y && point[1] <= rect.y + rect.height;
    } else {
      return axis.contain(axis.toLocalCoord(point[1])) && point[0] >= rect.y && point[0] <= rect.y + rect.height;
    }
  },

  /**
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToData: function (point) {
    var axis = this.getAxis();
    return [axis.coordToData(axis.toLocalCoord(point[axis.orient === 'horizontal' ? 0 : 1]))];
  },

  /**
   * Convert the series data to concrete point.
   *
   * @param  {number|Array.<number>} val
   * @return {Array.<number>}
   */
  dataToPoint: function (val) {
    var axis = this.getAxis();
    var rect = this.getRect();
    var pt = [];
    var idx = axis.orient === 'horizontal' ? 0 : 1;

    if (val instanceof Array) {
      val = val[0];
    }

    pt[idx] = axis.toGlobalCoord(axis.dataToCoord(+val));
    pt[1 - idx] = idx === 0 ? rect.y + rect.height / 2 : rect.x + rect.width / 2;
    return pt;
  }
};
var _default = Single;
module.exports = _default;

/***/ }),

/***/ "4c86":
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

var parseGeoJson = __webpack_require__("bda7");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var fixNanhai = __webpack_require__("320a");

var fixTextCoord = __webpack_require__("1792");

var fixGeoCoord = __webpack_require__("6bd4");

var fixDiaoyuIsland = __webpack_require__("a7f2");

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
// Built-in GEO fixer.
var inner = makeInner();
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} mapRecord {specialAreas, geoJSON}
   * @return {Object} {regions, boundingRect}
   */
  load: function (mapName, mapRecord) {
    var parsed = inner(mapRecord).parsed;

    if (parsed) {
      return parsed;
    }

    var specialAreas = mapRecord.specialAreas || {};
    var geoJSON = mapRecord.geoJSON;
    var regions; // https://jsperf.com/try-catch-performance-overhead

    try {
      regions = geoJSON ? parseGeoJson(geoJSON) : [];
    } catch (e) {
      throw new Error('Invalid geoJson format\n' + e.message);
    }

    fixNanhai(mapName, regions);
    each(regions, function (region) {
      var regionName = region.name;
      fixTextCoord(mapName, region);
      fixGeoCoord(mapName, region);
      fixDiaoyuIsland(mapName, region); // Some area like Alaska in USA map needs to be tansformed
      // to look better

      var specialArea = specialAreas[regionName];

      if (specialArea) {
        region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
      }
    });
    return inner(mapRecord).parsed = {
      regions: regions,
      boundingRect: getBoundingRect(regions)
    };
  }
};

function getBoundingRect(regions) {
  var rect;

  for (var i = 0; i < regions.length; i++) {
    var regionRect = regions[i].getBoundingRect();
    rect = rect || regionRect.clone();
    rect.union(regionRect);
  }

  return rect;
}

module.exports = _default;

/***/ }),

/***/ "4e08":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
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
// (1) The code `if (__DEV__) ...` can be removed by build tool.
// (2) If intend to use `__DEV__`, this module should be imported. Use a global
// variable `__DEV__` may cause that miss the declaration (see #6535), or the
// declaration is behind of the using position (for example in `Model.extent`,
// And tools like rollup can not analysis the dependency if not import).
var dev; // In browser

if (typeof window !== 'undefined') {
  dev = window.__DEV__;
} // In node
else if (typeof global !== 'undefined') {
    dev = global.__DEV__;
  }

if (typeof dev === 'undefined') {
  dev = true;
}

var __DEV__ = dev;
exports.__DEV__ = __DEV__;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

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

/***/ "5aa9":
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

var isObject = _util.isObject;
var each = _util.each;
var map = _util.map;
var indexOf = _util.indexOf;
var retrieve = _util.retrieve;

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

var _axisHelper = __webpack_require__("697e");

var createScaleByModel = _axisHelper.createScaleByModel;
var ifAxisCrossZero = _axisHelper.ifAxisCrossZero;
var niceScaleExtent = _axisHelper.niceScaleExtent;
var estimateLabelUnionRect = _axisHelper.estimateLabelUnionRect;

var Cartesian2D = __webpack_require__("cbe9");

var Axis2D = __webpack_require__("ec02");

var CoordinateSystem = __webpack_require__("2039");

var _dataStackHelper = __webpack_require__("ee1a");

var getStackedDimension = _dataStackHelper.getStackedDimension;

__webpack_require__("8ed2");

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
 * Grid is a region which contains at most 4 cartesian systems
 *
 * TODO Default cartesian
 */
// Depends on GridModel, AxisModel, which performs preprocess.

/**
 * Check if the axis is used in the specified grid
 * @inner
 */
function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
  return axisModel.getCoordSysModel() === gridModel;
}

function Grid(gridModel, ecModel, api) {
  /**
   * @type {Object.<string, module:echarts/coord/cartesian/Cartesian2D>}
   * @private
   */
  this._coordsMap = {};
  /**
   * @type {Array.<module:echarts/coord/cartesian/Cartesian>}
   * @private
   */

  this._coordsList = [];
  /**
   * @type {Object.<string, Array.<module:echarts/coord/cartesian/Axis2D>>}
   * @private
   */

  this._axesMap = {};
  /**
   * @type {Array.<module:echarts/coord/cartesian/Axis2D>}
   * @private
   */

  this._axesList = [];

  this._initCartesian(gridModel, ecModel, api);

  this.model = gridModel;
}

var gridProto = Grid.prototype;
gridProto.type = 'grid';
gridProto.axisPointerEnabled = true;

gridProto.getRect = function () {
  return this._rect;
};

gridProto.update = function (ecModel, api) {
  var axesMap = this._axesMap;

  this._updateScale(ecModel, this.model);

  each(axesMap.x, function (xAxis) {
    niceScaleExtent(xAxis.scale, xAxis.model);
  });
  each(axesMap.y, function (yAxis) {
    niceScaleExtent(yAxis.scale, yAxis.model);
  }); // Key: axisDim_axisIndex, value: boolean, whether onZero target.

  var onZeroRecords = {};
  each(axesMap.x, function (xAxis) {
    fixAxisOnZero(axesMap, 'y', xAxis, onZeroRecords);
  });
  each(axesMap.y, function (yAxis) {
    fixAxisOnZero(axesMap, 'x', yAxis, onZeroRecords);
  }); // Resize again if containLabel is enabled
  // FIXME It may cause getting wrong grid size in data processing stage

  this.resize(this.model, api);
};

function fixAxisOnZero(axesMap, otherAxisDim, axis, onZeroRecords) {
  axis.getAxesOnZeroOf = function () {
    // TODO: onZero of multiple axes.
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
  }; // onZero can not be enabled in these two situations:
  // 1. When any other axis is a category axis.
  // 2. When no axis is cross 0 point.


  var otherAxes = axesMap[otherAxisDim];
  var otherAxisOnZeroOf;
  var axisModel = axis.model;
  var onZero = axisModel.get('axisLine.onZero');
  var onZeroAxisIndex = axisModel.get('axisLine.onZeroAxisIndex');

  if (!onZero) {
    return;
  } // If target axis is specified.


  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
    }
  } else {
    // Find the first available other axis.
    for (var idx in otherAxes) {
      if (otherAxes.hasOwnProperty(idx) && canOnZeroToAxis(otherAxes[idx]) // Consider that two Y axes on one value axis,
      // if both onZero, the two Y axes overlap.
      && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
        otherAxisOnZeroOf = otherAxes[idx];
        break;
      }
    }
  }

  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
  }

  function getOnZeroRecordKey(axis) {
    return axis.dim + '_' + axis.index;
  }
}

function canOnZeroToAxis(axis) {
  return axis && axis.type !== 'category' && axis.type !== 'time' && ifAxisCrossZero(axis);
}
/**
 * Resize the grid
 * @param {module:echarts/coord/cartesian/GridModel} gridModel
 * @param {module:echarts/ExtensionAPI} api
 */


gridProto.resize = function (gridModel, api, ignoreContainLabel) {
  var gridRect = getLayoutRect(gridModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
  this._rect = gridRect;
  var axesList = this._axesList;
  adjustAxes(); // Minus label size

  if (!ignoreContainLabel && gridModel.get('containLabel')) {
    each(axesList, function (axis) {
      if (!axis.model.get('axisLabel.inside')) {
        var labelUnionRect = estimateLabelUnionRect(axis);

        if (labelUnionRect) {
          var dim = axis.isHorizontal() ? 'height' : 'width';
          var margin = axis.model.get('axisLabel.margin');
          gridRect[dim] -= labelUnionRect[dim] + margin;

          if (axis.position === 'top') {
            gridRect.y += labelUnionRect.height + margin;
          } else if (axis.position === 'left') {
            gridRect.x += labelUnionRect.width + margin;
          }
        }
      }
    });
    adjustAxes();
  }

  function adjustAxes() {
    each(axesList, function (axis) {
      var isHorizontal = axis.isHorizontal();
      var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
      var idx = axis.inverse ? 1 : 0;
      axis.setExtent(extent[idx], extent[1 - idx]);
      updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y);
    });
  }
};
/**
 * @param {string} axisType
 * @param {number} [axisIndex]
 */


gridProto.getAxis = function (axisType, axisIndex) {
  var axesMapOnDim = this._axesMap[axisType];

  if (axesMapOnDim != null) {
    if (axisIndex == null) {
      // Find first axis
      for (var name in axesMapOnDim) {
        if (axesMapOnDim.hasOwnProperty(name)) {
          return axesMapOnDim[name];
        }
      }
    }

    return axesMapOnDim[axisIndex];
  }
};
/**
 * @return {Array.<module:echarts/coord/Axis>}
 */


gridProto.getAxes = function () {
  return this._axesList.slice();
};
/**
 * Usage:
 *      grid.getCartesian(xAxisIndex, yAxisIndex);
 *      grid.getCartesian(xAxisIndex);
 *      grid.getCartesian(null, yAxisIndex);
 *      grid.getCartesian({xAxisIndex: ..., yAxisIndex: ...});
 *
 * @param {number|Object} [xAxisIndex]
 * @param {number} [yAxisIndex]
 */


gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
  if (xAxisIndex != null && yAxisIndex != null) {
    var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
    return this._coordsMap[key];
  }

  if (isObject(xAxisIndex)) {
    yAxisIndex = xAxisIndex.yAxisIndex;
    xAxisIndex = xAxisIndex.xAxisIndex;
  } // When only xAxisIndex or yAxisIndex given, find its first cartesian.


  for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
    if (coordList[i].getAxis('x').index === xAxisIndex || coordList[i].getAxis('y').index === yAxisIndex) {
      return coordList[i];
    }
  }
};

gridProto.getCartesians = function () {
  return this._coordsList.slice();
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.convertToPixel = function (ecModel, finder, value) {
  var target = this._findConvertTarget(ecModel, finder);

  return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.convertFromPixel = function (ecModel, finder, value) {
  var target = this._findConvertTarget(ecModel, finder);

  return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
};
/**
 * @inner
 */


gridProto._findConvertTarget = function (ecModel, finder) {
  var seriesModel = finder.seriesModel;
  var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents('xAxis')[0];
  var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents('yAxis')[0];
  var gridModel = finder.gridModel;
  var coordsList = this._coordsList;
  var cartesian;
  var axis;

  if (seriesModel) {
    cartesian = seriesModel.coordinateSystem;
    indexOf(coordsList, cartesian) < 0 && (cartesian = null);
  } else if (xAxisModel && yAxisModel) {
    cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
  } else if (xAxisModel) {
    axis = this.getAxis('x', xAxisModel.componentIndex);
  } else if (yAxisModel) {
    axis = this.getAxis('y', yAxisModel.componentIndex);
  } // Lowest priority.
  else if (gridModel) {
      var grid = gridModel.coordinateSystem;

      if (grid === this) {
        cartesian = this._coordsList[0];
      }
    }

  return {
    cartesian: cartesian,
    axis: axis
  };
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.containPoint = function (point) {
  var coord = this._coordsList[0];

  if (coord) {
    return coord.containPoint(point);
  }
};
/**
 * Initialize cartesian coordinate systems
 * @private
 */


gridProto._initCartesian = function (gridModel, ecModel, api) {
  var axisPositionUsed = {
    left: false,
    right: false,
    top: false,
    bottom: false
  };
  var axesMap = {
    x: {},
    y: {}
  };
  var axesCount = {
    x: 0,
    y: 0
  }; /// Create axis

  ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
  ecModel.eachComponent('yAxis', createAxisCreator('y'), this);

  if (!axesCount.x || !axesCount.y) {
    // Roll back when there no either x or y axis
    this._axesMap = {};
    this._axesList = [];
    return;
  }

  this._axesMap = axesMap; /// Create cartesian2d

  each(axesMap.x, function (xAxis, xAxisIndex) {
    each(axesMap.y, function (yAxis, yAxisIndex) {
      var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
      var cartesian = new Cartesian2D(key);
      cartesian.grid = this;
      cartesian.model = gridModel;
      this._coordsMap[key] = cartesian;

      this._coordsList.push(cartesian);

      cartesian.addAxis(xAxis);
      cartesian.addAxis(yAxis);
    }, this);
  }, this);

  function createAxisCreator(axisType) {
    return function (axisModel, idx) {
      if (!isAxisUsedInTheGrid(axisModel, gridModel, ecModel)) {
        return;
      }

      var axisPosition = axisModel.get('position');

      if (axisType === 'x') {
        // Fix position
        if (axisPosition !== 'top' && axisPosition !== 'bottom') {
          // Default bottom of X
          axisPosition = axisPositionUsed.bottom ? 'top' : 'bottom';
        }
      } else {
        // Fix position
        if (axisPosition !== 'left' && axisPosition !== 'right') {
          // Default left of Y
          axisPosition = axisPositionUsed.left ? 'right' : 'left';
        }
      }

      axisPositionUsed[axisPosition] = true;
      var axis = new Axis2D(axisType, createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisPosition);
      var isCategory = axis.type === 'category';
      axis.onBand = isCategory && axisModel.get('boundaryGap');
      axis.inverse = axisModel.get('inverse'); // Inject axis into axisModel

      axisModel.axis = axis; // Inject axisModel into axis

      axis.model = axisModel; // Inject grid info axis

      axis.grid = this; // Index of axis, can be used as key

      axis.index = idx;

      this._axesList.push(axis);

      axesMap[axisType][idx] = axis;
      axesCount[axisType]++;
    };
  }
};
/**
 * Update cartesian properties from series
 * @param  {module:echarts/model/Option} option
 * @private
 */


gridProto._updateScale = function (ecModel, gridModel) {
  // Reset scale
  each(this._axesList, function (axis) {
    axis.scale.setExtent(Infinity, -Infinity);
  });
  ecModel.eachSeries(function (seriesModel) {
    if (isCartesian2D(seriesModel)) {
      var axesModels = findAxesModels(seriesModel, ecModel);
      var xAxisModel = axesModels[0];
      var yAxisModel = axesModels[1];

      if (!isAxisUsedInTheGrid(xAxisModel, gridModel, ecModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel, ecModel)) {
        return;
      }

      var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
      var data = seriesModel.getData();
      var xAxis = cartesian.getAxis('x');
      var yAxis = cartesian.getAxis('y');

      if (data.type === 'list') {
        unionExtent(data, xAxis, seriesModel);
        unionExtent(data, yAxis, seriesModel);
      }
    }
  }, this);

  function unionExtent(data, axis, seriesModel) {
    each(data.mapDimension(axis.dim, true), function (dim) {
      axis.scale.unionExtentFromData( // For example, the extent of the orginal dimension
      // is [0.1, 0.5], the extent of the `stackResultDimension`
      // is [7, 9], the final extent should not include [0.1, 0.5].
      data, getStackedDimension(data, dim));
    });
  }
};
/**
 * @param {string} [dim] 'x' or 'y' or 'auto' or null/undefined
 * @return {Object} {baseAxes: [], otherAxes: []}
 */


gridProto.getTooltipAxes = function (dim) {
  var baseAxes = [];
  var otherAxes = [];
  each(this.getCartesians(), function (cartesian) {
    var baseAxis = dim != null && dim !== 'auto' ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
    var otherAxis = cartesian.getOtherAxis(baseAxis);
    indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
    indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
  });
  return {
    baseAxes: baseAxes,
    otherAxes: otherAxes
  };
};
/**
 * @inner
 */


function updateAxisTransform(axis, coordBase) {
  var axisExtent = axis.getExtent();
  var axisExtentSum = axisExtent[0] + axisExtent[1]; // Fast transform

  axis.toGlobalCoord = axis.dim === 'x' ? function (coord) {
    return coord + coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
  axis.toLocalCoord = axis.dim === 'x' ? function (coord) {
    return coord - coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
}

var axesTypes = ['xAxis', 'yAxis'];
/**
 * @inner
 */

function findAxesModels(seriesModel, ecModel) {
  return map(axesTypes, function (axisType) {
    var axisModel = seriesModel.getReferringComponents(axisType)[0];
    return axisModel;
  });
}
/**
 * @inner
 */


function isCartesian2D(seriesModel) {
  return seriesModel.get('coordinateSystem') === 'cartesian2d';
}

Grid.create = function (ecModel, api) {
  var grids = [];
  ecModel.eachComponent('grid', function (gridModel, idx) {
    var grid = new Grid(gridModel, ecModel, api);
    grid.name = 'grid_' + idx; // dataSampling requires axis extent, so resize
    // should be performed in create stage.

    grid.resize(gridModel, api, true);
    gridModel.coordinateSystem = grid;
    grids.push(grid);
  }); // Inject the coordinateSystems into seriesModel

  ecModel.eachSeries(function (seriesModel) {
    if (!isCartesian2D(seriesModel)) {
      return;
    }

    var axesModels = findAxesModels(seriesModel, ecModel);
    var xAxisModel = axesModels[0];
    var yAxisModel = axesModels[1];
    var gridModel = xAxisModel.getCoordSysModel();
    var grid = gridModel.coordinateSystem;
    seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
  });
  return grids;
}; // For deciding which dimensions to use when creating list data


Grid.dimensions = Grid.prototype.dimensions = Cartesian2D.prototype.dimensions;
CoordinateSystem.register('cartesian2d', Grid);
var _default = Grid;
module.exports = _default;

/***/ }),

/***/ "5b87":
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

var each = _util.each;
var createHashMap = _util.createHashMap;

var mapDataStorage = __webpack_require__("ec34");

var geoJSONLoader = __webpack_require__("4c86");

var geoSVGLoader = __webpack_require__("c92f");

var BoundingRect = __webpack_require__("9850");

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
var loaders = {
  geoJSON: geoJSONLoader,
  svg: geoSVGLoader
};
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} nameMap
   * @return {Object} source {regions, regionsMap, nameCoordMap, boundingRect}
   */
  load: function (mapName, nameMap) {
    var regions = [];
    var regionsMap = createHashMap();
    var nameCoordMap = createHashMap();
    var boundingRect;
    var mapRecords = retrieveMap(mapName);
    each(mapRecords, function (record) {
      var singleSource = loaders[record.type].load(mapName, record);
      each(singleSource.regions, function (region) {
        var regionName = region.name; // Try use the alias in geoNameMap

        if (nameMap && nameMap.hasOwnProperty(regionName)) {
          region = region.cloneShallow(regionName = nameMap[regionName]);
        }

        regions.push(region);
        regionsMap.set(regionName, region);
        nameCoordMap.set(regionName, region.center);
      });
      var rect = singleSource.boundingRect;

      if (rect) {
        boundingRect ? boundingRect.union(rect) : boundingRect = rect.clone();
      }
    });
    return {
      regions: regions,
      regionsMap: regionsMap,
      nameCoordMap: nameCoordMap,
      // FIXME Always return new ?
      boundingRect: boundingRect || new BoundingRect(0, 0, 0, 0)
    };
  },

  /**
   * @param {string} mapName
   * @param {string} hostKey For cache.
   * @return {Array.<module:zrender/Element>} Roots.
   */
  makeGraphic: makeInvoker('makeGraphic'),

  /**
   * @param {string} mapName
   * @param {string} hostKey For cache.
   */
  removeGraphic: makeInvoker('removeGraphic')
};

function makeInvoker(methodName) {
  return function (mapName, hostKey) {
    var mapRecords = retrieveMap(mapName);
    var results = [];
    each(mapRecords, function (record) {
      var method = loaders[record.type][methodName];
      method && results.push(method(mapName, record, hostKey));
    });
    return results;
  };
}

function mapNotExistsError(mapName) {}

function retrieveMap(mapName) {
  var mapRecords = mapDataStorage.retrieveMap(mapName) || [];
  return mapRecords;
}

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

/***/ "6569":
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

var modelUtil = __webpack_require__("e0d3");

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
function _default(option) {
  createParallelIfNeeded(option);
  mergeAxisOptionFromParallel(option);
}
/**
 * Create a parallel coordinate if not exists.
 * @inner
 */


function createParallelIfNeeded(option) {
  if (option.parallel) {
    return;
  }

  var hasParallelSeries = false;
  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'parallel') {
      hasParallelSeries = true;
    }
  });

  if (hasParallelSeries) {
    option.parallel = [{}];
  }
}
/**
 * Merge aixs definition from parallel option (if exists) to axis option.
 * @inner
 */


function mergeAxisOptionFromParallel(option) {
  var axes = modelUtil.normalizeToArray(option.parallelAxis);
  zrUtil.each(axes, function (axisOption) {
    if (!zrUtil.isObject(axisOption)) {
      return;
    }

    var parallelIndex = axisOption.parallelIndex || 0;
    var parallelOption = modelUtil.normalizeToArray(option.parallel)[parallelIndex];

    if (parallelOption && parallelOption.parallelAxisDefault) {
      zrUtil.merge(axisOption, parallelOption.parallelAxisDefault, false);
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "66fc":
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

var Axis = __webpack_require__("84ce");

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
 * @constructor  module:echarts/coord/single/SingleAxis
 * @extends {module:echarts/coord/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 * @param {string} position
 */
var SingleAxis = function (dim, scale, coordExtent, axisType, position) {
  Axis.call(this, dim, scale, coordExtent);
  /**
   * Axis type
   * - 'category'
   * - 'value'
   * - 'time'
   * - 'log'
   * @type {string}
   */

  this.type = axisType || 'value';
  /**
   * Axis position
   *  - 'top'
   *  - 'bottom'
   *  - 'left'
   *  - 'right'
   *  @type {string}
   */

  this.position = position || 'bottom';
  /**
   * Axis orient
   *  - 'horizontal'
   *  - 'vertical'
   * @type {[type]}
   */

  this.orient = null;
};

SingleAxis.prototype = {
  constructor: SingleAxis,

  /**
   * Axis model
   * @type {module:echarts/coord/single/AxisModel}
   */
  model: null,

  /**
   * Judge the orient of the axis.
   * @return {boolean}
   */
  isHorizontal: function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  },

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.coordinateSystem.pointToData(point, clamp)[0];
  },

  /**
   * Convert the local coord(processed by dataToCoord())
   * to global coord(concrete pixel coord).
   * designated by module:echarts/coord/single/Single.
   * @type {Function}
   */
  toGlobalCoord: null,

  /**
   * Convert the global coord to local coord.
   * designated by module:echarts/coord/single/Single.
   * @type {Function}
   */
  toLocalCoord: null
};
zrUtil.inherits(SingleAxis, Axis);
var _default = SingleAxis;
module.exports = _default;

/***/ }),

/***/ "697e":
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

var OrdinalScale = __webpack_require__("18c0");

var IntervalScale = __webpack_require__("89e3");

var Scale = __webpack_require__("e0d8");

var numberUtil = __webpack_require__("3842");

var _barGrid = __webpack_require__("9d57");

var prepareLayoutBarSeries = _barGrid.prepareLayoutBarSeries;
var makeColumnLayout = _barGrid.makeColumnLayout;
var retrieveColumnLayout = _barGrid.retrieveColumnLayout;

var BoundingRect = __webpack_require__("9850");

__webpack_require__("216a");

__webpack_require__("8c2a");

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
 * Get axis scale extent before niced.
 * Item of returned array can only be number (including Infinity and NaN).
 */
function getScaleExtent(scale, model) {
  var scaleType = scale.type;
  var min = model.getMin();
  var max = model.getMax();
  var fixMin = min != null;
  var fixMax = max != null;
  var originalExtent = scale.getExtent();
  var axisDataLen;
  var boundaryGap;
  var span;

  if (scaleType === 'ordinal') {
    axisDataLen = model.getCategories().length;
  } else {
    boundaryGap = model.get('boundaryGap');

    if (!zrUtil.isArray(boundaryGap)) {
      boundaryGap = [boundaryGap || 0, boundaryGap || 0];
    }

    if (typeof boundaryGap[0] === 'boolean') {
      boundaryGap = [0, 0];
    }

    boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], 1);
    boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], 1);
    span = originalExtent[1] - originalExtent[0] || Math.abs(originalExtent[0]);
  } // Notice: When min/max is not set (that is, when there are null/undefined,
  // which is the most common case), these cases should be ensured:
  // (1) For 'ordinal', show all axis.data.
  // (2) For others:
  //      + `boundaryGap` is applied (if min/max set, boundaryGap is
  //      disabled).
  //      + If `needCrossZero`, min/max should be zero, otherwise, min/max should
  //      be the result that originalExtent enlarged by boundaryGap.
  // (3) If no data, it should be ensured that `scale.setBlank` is set.
  // FIXME
  // (1) When min/max is 'dataMin' or 'dataMax', should boundaryGap be able to used?
  // (2) When `needCrossZero` and all data is positive/negative, should it be ensured
  // that the results processed by boundaryGap are positive/negative?


  if (min == null) {
    min = scaleType === 'ordinal' ? axisDataLen ? 0 : NaN : originalExtent[0] - boundaryGap[0] * span;
  }

  if (max == null) {
    max = scaleType === 'ordinal' ? axisDataLen ? axisDataLen - 1 : NaN : originalExtent[1] + boundaryGap[1] * span;
  }

  if (min === 'dataMin') {
    min = originalExtent[0];
  } else if (typeof min === 'function') {
    min = min({
      min: originalExtent[0],
      max: originalExtent[1]
    });
  }

  if (max === 'dataMax') {
    max = originalExtent[1];
  } else if (typeof max === 'function') {
    max = max({
      min: originalExtent[0],
      max: originalExtent[1]
    });
  }

  (min == null || !isFinite(min)) && (min = NaN);
  (max == null || !isFinite(max)) && (max = NaN);
  scale.setBlank(zrUtil.eqNaN(min) || zrUtil.eqNaN(max) || scaleType === 'ordinal' && !scale.getOrdinalMeta().categories.length); // Evaluate if axis needs cross zero

  if (model.getNeedCrossZero()) {
    // Axis is over zero and min is not set
    if (min > 0 && max > 0 && !fixMin) {
      min = 0;
    } // Axis is under zero and max is not set


    if (min < 0 && max < 0 && !fixMax) {
      max = 0;
    }
  } // If bars are placed on a base axis of type time or interval account for axis boundary overflow and current axis
  // is base axis
  // FIXME
  // (1) Consider support value axis, where below zero and axis `onZero` should be handled properly.
  // (2) Refactor the logic with `barGrid`. Is it not need to `makeBarWidthAndOffsetInfo` twice with different extent?
  //     Should not depend on series type `bar`?
  // (3) Fix that might overlap when using dataZoom.
  // (4) Consider other chart types using `barGrid`?
  // See #6728, #4862, `test/bar-overflow-time-plot.html`


  var ecModel = model.ecModel;

  if (ecModel && scaleType === 'time'
  /*|| scaleType === 'interval' */
  ) {
    var barSeriesModels = prepareLayoutBarSeries('bar', ecModel);
    var isBaseAxisAndHasBarSeries;
    zrUtil.each(barSeriesModels, function (seriesModel) {
      isBaseAxisAndHasBarSeries |= seriesModel.getBaseAxis() === model.axis;
    });

    if (isBaseAxisAndHasBarSeries) {
      // Calculate placement of bars on axis
      var barWidthAndOffset = makeColumnLayout(barSeriesModels); // Adjust axis min and max to account for overflow

      var adjustedScale = adjustScaleForOverflow(min, max, model, barWidthAndOffset);
      min = adjustedScale.min;
      max = adjustedScale.max;
    }
  }

  return [min, max];
}

function adjustScaleForOverflow(min, max, model, barWidthAndOffset) {
  // Get Axis Length
  var axisExtent = model.axis.getExtent();
  var axisLength = axisExtent[1] - axisExtent[0]; // Get bars on current base axis and calculate min and max overflow

  var barsOnCurrentAxis = retrieveColumnLayout(barWidthAndOffset, model.axis);

  if (barsOnCurrentAxis === undefined) {
    return {
      min: min,
      max: max
    };
  }

  var minOverflow = Infinity;
  zrUtil.each(barsOnCurrentAxis, function (item) {
    minOverflow = Math.min(item.offset, minOverflow);
  });
  var maxOverflow = -Infinity;
  zrUtil.each(barsOnCurrentAxis, function (item) {
    maxOverflow = Math.max(item.offset + item.width, maxOverflow);
  });
  minOverflow = Math.abs(minOverflow);
  maxOverflow = Math.abs(maxOverflow);
  var totalOverFlow = minOverflow + maxOverflow; // Calulate required buffer based on old range and overflow

  var oldRange = max - min;
  var oldRangePercentOfNew = 1 - (minOverflow + maxOverflow) / axisLength;
  var overflowBuffer = oldRange / oldRangePercentOfNew - oldRange;
  max += overflowBuffer * (maxOverflow / totalOverFlow);
  min -= overflowBuffer * (minOverflow / totalOverFlow);
  return {
    min: min,
    max: max
  };
}

function niceScaleExtent(scale, model) {
  var extent = getScaleExtent(scale, model);
  var fixMin = model.getMin() != null;
  var fixMax = model.getMax() != null;
  var splitNumber = model.get('splitNumber');

  if (scale.type === 'log') {
    scale.base = model.get('logBase');
  }

  var scaleType = scale.type;
  scale.setExtent(extent[0], extent[1]);
  scale.niceExtent({
    splitNumber: splitNumber,
    fixMin: fixMin,
    fixMax: fixMax,
    minInterval: scaleType === 'interval' || scaleType === 'time' ? model.get('minInterval') : null,
    maxInterval: scaleType === 'interval' || scaleType === 'time' ? model.get('maxInterval') : null
  }); // If some one specified the min, max. And the default calculated interval
  // is not good enough. He can specify the interval. It is often appeared
  // in angle axis with angle 0 - 360. Interval calculated in interval scale is hard
  // to be 60.
  // FIXME

  var interval = model.get('interval');

  if (interval != null) {
    scale.setInterval && scale.setInterval(interval);
  }
}
/**
 * @param {module:echarts/model/Model} model
 * @param {string} [axisType] Default retrieve from model.type
 * @return {module:echarts/scale/*}
 */


function createScaleByModel(model, axisType) {
  axisType = axisType || model.get('type');

  if (axisType) {
    switch (axisType) {
      // Buildin scale
      case 'category':
        return new OrdinalScale(model.getOrdinalMeta ? model.getOrdinalMeta() : model.getCategories(), [Infinity, -Infinity]);

      case 'value':
        return new IntervalScale();
      // Extended scale, like time and log

      default:
        return (Scale.getClass(axisType) || IntervalScale).create(model);
    }
  }
}
/**
 * Check if the axis corss 0
 */


function ifAxisCrossZero(axis) {
  var dataExtent = axis.scale.getExtent();
  var min = dataExtent[0];
  var max = dataExtent[1];
  return !(min > 0 && max > 0 || min < 0 && max < 0);
}
/**
 * @param {module:echarts/coord/Axis} axis
 * @return {Function} Label formatter function.
 *         param: {number} tickValue,
 *         param: {number} idx, the index in all ticks.
 *                         If category axis, this param is not requied.
 *         return: {string} label string.
 */


function makeLabelFormatter(axis) {
  var labelFormatter = axis.getLabelModel().get('formatter');
  var categoryTickStart = axis.type === 'category' ? axis.scale.getExtent()[0] : null;

  if (typeof labelFormatter === 'string') {
    labelFormatter = function (tpl) {
      return function (val) {
        // For category axis, get raw value; for numeric axis,
        // get foramtted label like '1,333,444'.
        val = axis.scale.getLabel(val);
        return tpl.replace('{value}', val != null ? val : '');
      };
    }(labelFormatter); // Consider empty array


    return labelFormatter;
  } else if (typeof labelFormatter === 'function') {
    return function (tickValue, idx) {
      // The original intention of `idx` is "the index of the tick in all ticks".
      // But the previous implementation of category axis do not consider the
      // `axisLabel.interval`, which cause that, for example, the `interval` is
      // `1`, then the ticks "name5", "name7", "name9" are displayed, where the
      // corresponding `idx` are `0`, `2`, `4`, but not `0`, `1`, `2`. So we keep
      // the definition here for back compatibility.
      if (categoryTickStart != null) {
        idx = tickValue - categoryTickStart;
      }

      return labelFormatter(getAxisRawValue(axis, tickValue), idx);
    };
  } else {
    return function (tick) {
      return axis.scale.getLabel(tick);
    };
  }
}

function getAxisRawValue(axis, value) {
  // In category axis with data zoom, tick is not the original
  // index of axis.data. So tick should not be exposed to user
  // in category axis.
  return axis.type === 'category' ? axis.scale.getLabel(value) : value;
}
/**
 * @param {module:echarts/coord/Axis} axis
 * @return {module:zrender/core/BoundingRect} Be null/undefined if no labels.
 */


function estimateLabelUnionRect(axis) {
  var axisModel = axis.model;
  var scale = axis.scale;

  if (!axisModel.get('axisLabel.show') || scale.isBlank()) {
    return;
  }

  var isCategory = axis.type === 'category';
  var realNumberScaleTicks;
  var tickCount;
  var categoryScaleExtent = scale.getExtent(); // Optimize for large category data, avoid call `getTicks()`.

  if (isCategory) {
    tickCount = scale.count();
  } else {
    realNumberScaleTicks = scale.getTicks();
    tickCount = realNumberScaleTicks.length;
  }

  var axisLabelModel = axis.getLabelModel();
  var labelFormatter = makeLabelFormatter(axis);
  var rect;
  var step = 1; // Simple optimization for large amount of labels

  if (tickCount > 40) {
    step = Math.ceil(tickCount / 40);
  }

  for (var i = 0; i < tickCount; i += step) {
    var tickValue = realNumberScaleTicks ? realNumberScaleTicks[i] : categoryScaleExtent[0] + i;
    var label = labelFormatter(tickValue);
    var unrotatedSingleRect = axisLabelModel.getTextRect(label);
    var singleRect = rotateTextRect(unrotatedSingleRect, axisLabelModel.get('rotate') || 0);
    rect ? rect.union(singleRect) : rect = singleRect;
  }

  return rect;
}

function rotateTextRect(textRect, rotate) {
  var rotateRadians = rotate * Math.PI / 180;
  var boundingBox = textRect.plain();
  var beforeWidth = boundingBox.width;
  var beforeHeight = boundingBox.height;
  var afterWidth = beforeWidth * Math.cos(rotateRadians) + beforeHeight * Math.sin(rotateRadians);
  var afterHeight = beforeWidth * Math.sin(rotateRadians) + beforeHeight * Math.cos(rotateRadians);
  var rotatedRect = new BoundingRect(boundingBox.x, boundingBox.y, afterWidth, afterHeight);
  return rotatedRect;
}
/**
 * @param {module:echarts/src/model/Model} model axisLabelModel or axisTickModel
 * @return {number|String} Can be null|'auto'|number|function
 */


function getOptionCategoryInterval(model) {
  var interval = model.get('interval');
  return interval == null ? 'auto' : interval;
}
/**
 * Set `categoryInterval` as 0 implicitly indicates that
 * show all labels reguardless of overlap.
 * @param {Object} axis axisModel.axis
 * @return {boolean}
 */


function shouldShowAllLabels(axis) {
  return axis.type === 'category' && getOptionCategoryInterval(axis.getLabelModel()) === 0;
}

exports.getScaleExtent = getScaleExtent;
exports.niceScaleExtent = niceScaleExtent;
exports.createScaleByModel = createScaleByModel;
exports.ifAxisCrossZero = ifAxisCrossZero;
exports.makeLabelFormatter = makeLabelFormatter;
exports.getAxisRawValue = getAxisRawValue;
exports.estimateLabelUnionRect = estimateLabelUnionRect;
exports.getOptionCategoryInterval = getOptionCategoryInterval;
exports.shouldShowAllLabels = shouldShowAllLabels;

/***/ }),

/***/ "6bd4":
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
var geoCoordMap = {
  'Russia': [100, 60],
  'United States': [-99, 38],
  'United States of America': [-99, 38]
};

function _default(mapType, region) {
  if (mapType === 'world') {
    var geoCoord = geoCoordMap[region.name];

    if (geoCoord) {
      var cp = region.center;
      cp[0] = geoCoord[0];
      cp[1] = geoCoord[1];
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "6cc5":
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

var vector = __webpack_require__("401b");

var matrix = __webpack_require__("1687");

var BoundingRect = __webpack_require__("9850");

var Transformable = __webpack_require__("0cde");

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
 * Simple view coordinate system
 * Mapping given x, y to transformd view x, y
 */
var v2ApplyTransform = vector.applyTransform; // Dummy transform node

function TransformDummy() {
  Transformable.call(this);
}

zrUtil.mixin(TransformDummy, Transformable);

function View(name) {
  /**
   * @type {string}
   */
  this.name = name;
  /**
   * @type {Object}
   */

  this.zoomLimit;
  Transformable.call(this);
  this._roamTransformable = new TransformDummy();
  this._rawTransformable = new TransformDummy();
  this._center;
  this._zoom;
}

View.prototype = {
  constructor: View,
  type: 'view',

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['x', 'y'],

  /**
   * Set bounding rect
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  // PENDING to getRect
  setBoundingRect: function (x, y, width, height) {
    this._rect = new BoundingRect(x, y, width, height);
    return this._rect;
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  // PENDING to getRect
  getBoundingRect: function () {
    return this._rect;
  },

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  setViewRect: function (x, y, width, height) {
    this.transformTo(x, y, width, height);
    this._viewRect = new BoundingRect(x, y, width, height);
  },

  /**
   * Transformed to particular position and size
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var rawTransform = this._rawTransformable;
    rawTransform.transform = rect.calculateTransform(new BoundingRect(x, y, width, height));
    rawTransform.decomposeTransform();

    this._updateTransform();
  },

  /**
   * Set center of view
   * @param {Array.<number>} [centerCoord]
   */
  setCenter: function (centerCoord) {
    if (!centerCoord) {
      return;
    }

    this._center = centerCoord;

    this._updateCenterAndZoom();
  },

  /**
   * @param {number} zoom
   */
  setZoom: function (zoom) {
    zoom = zoom || 1;
    var zoomLimit = this.zoomLimit;

    if (zoomLimit) {
      if (zoomLimit.max != null) {
        zoom = Math.min(zoomLimit.max, zoom);
      }

      if (zoomLimit.min != null) {
        zoom = Math.max(zoomLimit.min, zoom);
      }
    }

    this._zoom = zoom;

    this._updateCenterAndZoom();
  },

  /**
   * Get default center without roam
   */
  getDefaultCenter: function () {
    // Rect before any transform
    var rawRect = this.getBoundingRect();
    var cx = rawRect.x + rawRect.width / 2;
    var cy = rawRect.y + rawRect.height / 2;
    return [cx, cy];
  },
  getCenter: function () {
    return this._center || this.getDefaultCenter();
  },
  getZoom: function () {
    return this._zoom || 1;
  },

  /**
   * @return {Array.<number}
   */
  getRoamTransform: function () {
    return this._roamTransformable.getLocalTransform();
  },

  /**
   * Remove roam
   */
  _updateCenterAndZoom: function () {
    // Must update after view transform updated
    var rawTransformMatrix = this._rawTransformable.getLocalTransform();

    var roamTransform = this._roamTransformable;
    var defaultCenter = this.getDefaultCenter();
    var center = this.getCenter();
    var zoom = this.getZoom();
    center = vector.applyTransform([], center, rawTransformMatrix);
    defaultCenter = vector.applyTransform([], defaultCenter, rawTransformMatrix);
    roamTransform.origin = center;
    roamTransform.position = [defaultCenter[0] - center[0], defaultCenter[1] - center[1]];
    roamTransform.scale = [zoom, zoom];

    this._updateTransform();
  },

  /**
   * Update transform from roam and mapLocation
   * @private
   */
  _updateTransform: function () {
    var roamTransformable = this._roamTransformable;
    var rawTransformable = this._rawTransformable;
    rawTransformable.parent = roamTransformable;
    roamTransformable.updateTransform();
    rawTransformable.updateTransform();
    matrix.copy(this.transform || (this.transform = []), rawTransformable.transform || matrix.create());
    this._rawTransform = rawTransformable.getLocalTransform();
    this.invTransform = this.invTransform || [];
    matrix.invert(this.invTransform, this.transform);
    this.decomposeTransform();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getViewRect: function () {
    return this._viewRect;
  },

  /**
   * Get view rect after roam transform
   * @return {module:zrender/core/BoundingRect}
   */
  getViewRectAfterRoam: function () {
    var rect = this.getBoundingRect().clone();
    rect.applyTransform(this.transform);
    return rect;
  },

  /**
   * Convert a single (lon, lat) data item to (x, y) point.
   * @param {Array.<number>} data
   * @param {boolean} noRoam
   * @param {Array.<number>} [out]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, noRoam, out) {
    var transform = noRoam ? this._rawTransform : this.transform;
    out = out || [];
    return transform ? v2ApplyTransform(out, data, transform) : vector.copy(out, data);
  },

  /**
   * Convert a (x, y) point to (lon, lat) data
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToData: function (point) {
    var invTransform = this.invTransform;
    return invTransform ? v2ApplyTransform([], point, invTransform) : [point[0], point[1]];
  },

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData'),

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  containPoint: function (point) {
    return this.getViewRectAfterRoam().contain(point[0], point[1]);
  }
  /**
   * @return {number}
   */
  // getScalarScale: function () {
  //     // Use determinant square root of transform to mutiply scalar
  //     var m = this.transform;
  //     var det = Math.sqrt(Math.abs(m[0] * m[3] - m[2] * m[1]));
  //     return det;
  // }

};
zrUtil.mixin(View, Transformable);

function doConvert(methodName, ecModel, finder, value) {
  var seriesModel = finder.seriesModel;
  var coordSys = seriesModel ? seriesModel.coordinateSystem : null; // e.g., graph.

  return coordSys === this ? coordSys[methodName](value) : null;
}

var _default = View;
module.exports = _default;

/***/ }),

/***/ "71ad":
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
var defaultOption = {
  show: true,
  zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: false,
  // Axis name displayed.
  name: '',
  // 'start' | 'middle' | 'end'
  nameLocation: 'end',
  // By degree. By defualt auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: '...',
    placeholder: '.'
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: false,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: true,
    onZeroAxisIndex: null,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    },
    // The arrow at both ends the the axis.
    symbol: ['none', 'none'],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: true,
    // Whether axisTick is inside the grid or outside the grid.
    inside: false,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: false,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#ccc'],
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
    }
  }
};
var axisDefault = {};
axisDefault.categoryAxis = zrUtil.merge({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: true,
  // Set false to faster category collection.
  // Only usefull in the case like: category is
  // ['2012-01-01', '2012-01-02', ...], where the input
  // data has been ensured not duplicate and is large data.
  // null means "auto":
  // if axis.data provided, do not deduplication,
  // else do deduplication.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: false
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: false,
    interval: 'auto'
  },
  axisLabel: {
    interval: 'auto'
  }
}, defaultOption);
axisDefault.valueAxis = zrUtil.merge({
  // The gap at both ends of the axis. For value axis, [GAP, GAP], where
  // `GAP` can be an absolute pixel number (like `35`), or percent (like `'30%'`)
  boundaryGap: [0, 0],
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  // Min value of the axis. can be:
  // + a number
  // + 'dataMin': use the min value in data.
  // + null/undefined: auto decide min value (consider pretty look and boundaryGap).
  // min: null,
  // Max value of the axis. can be:
  // + a number
  // + 'dataMax': use the max value in data.
  // + null/undefined: auto decide max value (consider pretty look and boundaryGap).
  // max: null,
  // Readonly prop, specifies start value of the range when using data zoom.
  // rangeStart: null
  // Readonly prop, specifies end value of the range when using data zoom.
  // rangeEnd: null
  // Optional value can be:
  // + `false`: always include value 0.
  // + `true`: the extent do not consider value 0.
  // scale: false,
  // AxisTick and axisLabel and splitLine are caculated based on splitNumber.
  splitNumber: 5,
  // Interval specifies the span of the ticks is mandatorily.
  // interval: null
  // Specify min interval when auto calculate tick interval.
  // minInterval: null
  // Specify max interval when auto calculate tick interval.
  // maxInterval: null
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: false,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Lenght of minor tick
    length: 3,
    // Same inside with axisTick
    // Line style
    lineStyle: {// Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: '#eee',
      width: 1
    }
  }
}, defaultOption);
axisDefault.timeAxis = zrUtil.defaults({
  scale: true,
  min: 'dataMin',
  max: 'dataMax'
}, axisDefault.valueAxis);
axisDefault.logAxis = zrUtil.defaults({
  scale: true,
  logBase: 10
}, axisDefault.valueAxis);
var _default = axisDefault;
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

/***/ "7887":
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

var Axis = __webpack_require__("84ce");

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
function IndicatorAxis(dim, scale, radiusExtent) {
  Axis.call(this, dim, scale, radiusExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'value';
  this.angle = 0;
  /**
   * Indicator name
   * @type {string}
   */

  this.name = '';
  /**
   * @type {module:echarts/model/Model}
   */

  this.model;
}

zrUtil.inherits(IndicatorAxis, Axis);
var _default = IndicatorAxis;
module.exports = _default;

/***/ }),

/***/ "78f0":
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

var echarts = __webpack_require__("3eba");

__webpack_require__("d9f1");

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
var _default = echarts.extendComponentModel({
  type: 'polar',
  dependencies: ['polarAxis', 'angleAxis'],

  /**
   * @type {module:echarts/coord/polar/Polar}
   */
  coordinateSystem: null,

  /**
   * @param {string} axisType
   * @return {module:echarts/coord/polar/AxisModel}
   */
  findAxisModel: function (axisType) {
    var foundAxisModel;
    var ecModel = this.ecModel;
    ecModel.eachComponent(axisType, function (axisModel) {
      if (axisModel.getCoordSysModel() === this) {
        foundAxisModel = axisModel;
      }
    }, this);
    return foundAxisModel;
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    center: ['50%', '50%'],
    radius: '80%'
  }
});

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

/***/ "83ba":
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

var ComponentModel = __webpack_require__("6cb7");

var _layout = __webpack_require__("f934");

var getLayoutParams = _layout.getLayoutParams;
var sizeCalculable = _layout.sizeCalculable;
var mergeLayoutParam = _layout.mergeLayoutParam;

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
var CalendarModel = ComponentModel.extend({
  type: 'calendar',

  /**
   * @type {module:echarts/coord/calendar/Calendar}
   */
  coordinateSystem: null,
  defaultOption: {
    zlevel: 0,
    z: 2,
    left: 80,
    top: 60,
    cellSize: 20,
    // horizontal vertical
    orient: 'horizontal',
    // month separate line style
    splitLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 1,
        type: 'solid'
      }
    },
    // rect style  temporarily unused emphasis
    itemStyle: {
      color: '#fff',
      borderWidth: 1,
      borderColor: '#ccc'
    },
    // week text style
    dayLabel: {
      show: true,
      // a week first day
      firstDay: 0,
      // start end
      position: 'start',
      margin: '50%',
      // 50% of cellSize
      nameMap: 'en',
      color: '#000'
    },
    // month text style
    monthLabel: {
      show: true,
      // start end
      position: 'start',
      margin: 5,
      // center or left
      align: 'center',
      // cn en []
      nameMap: 'en',
      formatter: null,
      color: '#000'
    },
    // year text style
    yearLabel: {
      show: true,
      // top bottom left right
      position: null,
      margin: 30,
      formatter: null,
      color: '#ccc',
      fontFamily: 'sans-serif',
      fontWeight: 'bolder',
      fontSize: 20
    }
  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel, extraOpt) {
    var inputPositionParams = getLayoutParams(option);
    CalendarModel.superApply(this, 'init', arguments);
    mergeAndNormalizeLayoutParams(option, inputPositionParams);
  },

  /**
   * @override
   */
  mergeOption: function (option, extraOpt) {
    CalendarModel.superApply(this, 'mergeOption', arguments);
    mergeAndNormalizeLayoutParams(this.option, option);
  }
});

function mergeAndNormalizeLayoutParams(target, raw) {
  // Normalize cellSize
  var cellSize = target.cellSize;

  if (!zrUtil.isArray(cellSize)) {
    cellSize = target.cellSize = [cellSize, cellSize];
  } else if (cellSize.length === 1) {
    cellSize[1] = cellSize[0];
  }

  var ignoreSize = zrUtil.map([0, 1], function (hvIdx) {
    // If user have set `width` or both `left` and `right`, cellSize
    // will be automatically set to 'auto', otherwise the default
    // setting of cellSize will make `width` setting not work.
    if (sizeCalculable(raw, hvIdx)) {
      cellSize[hvIdx] = 'auto';
    }

    return cellSize[hvIdx] != null && cellSize[hvIdx] !== 'auto';
  });
  mergeLayoutParam(target, raw, {
    type: 'box',
    ignoreSize: ignoreSize
  });
}

var _default = CalendarModel;
module.exports = _default;

/***/ }),

/***/ "849b":
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

var Parallel = __webpack_require__("d9d0");

var CoordinateSystem = __webpack_require__("2039");

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
 * Parallel coordinate system creater.
 */
function create(ecModel, api) {
  var coordSysList = [];
  ecModel.eachComponent('parallel', function (parallelModel, idx) {
    var coordSys = new Parallel(parallelModel, ecModel, api);
    coordSys.name = 'parallel_' + idx;
    coordSys.resize(parallelModel, api);
    parallelModel.coordinateSystem = coordSys;
    coordSys.model = parallelModel;
    coordSysList.push(coordSys);
  }); // Inject the coordinateSystems into seriesModel

  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'parallel') {
      var parallelModel = ecModel.queryComponents({
        mainType: 'parallel',
        index: seriesModel.get('parallelIndex'),
        id: seriesModel.get('parallelId')
      })[0];
      seriesModel.coordinateSystem = parallelModel.coordinateSystem;
    }
  });
  return coordSysList;
}

CoordinateSystem.register('parallel', {
  create: create
});

/***/ }),

/***/ "84ce":
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
var map = _util.map;

var _number = __webpack_require__("3842");

var linearMap = _number.linearMap;
var getPixelPrecision = _number.getPixelPrecision;
var round = _number.round;

var _axisTickLabelBuilder = __webpack_require__("e073");

var createAxisTicks = _axisTickLabelBuilder.createAxisTicks;
var createAxisLabels = _axisTickLabelBuilder.createAxisLabels;
var calculateCategoryInterval = _axisTickLabelBuilder.calculateCategoryInterval;

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
var NORMALIZED_EXTENT = [0, 1];
/**
 * Base class of Axis.
 * @constructor
 */

var Axis = function (dim, scale, extent) {
  /**
   * Axis dimension. Such as 'x', 'y', 'z', 'angle', 'radius'.
   * @type {string}
   */
  this.dim = dim;
  /**
   * Axis scale
   * @type {module:echarts/coord/scale/*}
   */

  this.scale = scale;
  /**
   * @type {Array.<number>}
   * @private
   */

  this._extent = extent || [0, 0];
  /**
   * @type {boolean}
   */

  this.inverse = false;
  /**
   * Usually true when axis has a ordinal scale
   * @type {boolean}
   */

  this.onBand = false;
};

Axis.prototype = {
  constructor: Axis,

  /**
   * If axis extent contain given coord
   * @param {number} coord
   * @return {boolean}
   */
  contain: function (coord) {
    var extent = this._extent;
    var min = Math.min(extent[0], extent[1]);
    var max = Math.max(extent[0], extent[1]);
    return coord >= min && coord <= max;
  },

  /**
   * If axis extent contain given data
   * @param {number} data
   * @return {boolean}
   */
  containData: function (data) {
    return this.scale.contain(data);
  },

  /**
   * Get coord extent.
   * @return {Array.<number>}
   */
  getExtent: function () {
    return this._extent.slice();
  },

  /**
   * Get precision used for formatting
   * @param {Array.<number>} [dataExtent]
   * @return {number}
   */
  getPixelPrecision: function (dataExtent) {
    return getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent);
  },

  /**
   * Set coord extent
   * @param {number} start
   * @param {number} end
   */
  setExtent: function (start, end) {
    var extent = this._extent;
    extent[0] = start;
    extent[1] = end;
  },

  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   * @param {number} data
   * @param  {boolean} clamp
   * @return {number}
   */
  dataToCoord: function (data, clamp) {
    var extent = this._extent;
    var scale = this.scale;
    data = scale.normalize(data);

    if (this.onBand && scale.type === 'ordinal') {
      extent = extent.slice();
      fixExtentWithBands(extent, scale.count());
    }

    return linearMap(data, NORMALIZED_EXTENT, extent, clamp);
  },

  /**
   * Convert coord to data. Data is the rank if it has an ordinal scale
   * @param {number} coord
   * @param  {boolean} clamp
   * @return {number}
   */
  coordToData: function (coord, clamp) {
    var extent = this._extent;
    var scale = this.scale;

    if (this.onBand && scale.type === 'ordinal') {
      extent = extent.slice();
      fixExtentWithBands(extent, scale.count());
    }

    var t = linearMap(coord, extent, NORMALIZED_EXTENT, clamp);
    return this.scale.scale(t);
  },

  /**
   * Convert pixel point to data in axis
   * @param {Array.<number>} point
   * @param  {boolean} clamp
   * @return {number} data
   */
  pointToData: function (point, clamp) {// Should be implemented in derived class if necessary.
  },

  /**
   * Different from `zrUtil.map(axis.getTicks(), axis.dataToCoord, axis)`,
   * `axis.getTicksCoords` considers `onBand`, which is used by
   * `boundaryGap:true` of category axis and splitLine and splitArea.
   * @param {Object} [opt]
   * @param {Model} [opt.tickModel=axis.model.getModel('axisTick')]
   * @param {boolean} [opt.clamp] If `true`, the first and the last
   *        tick must be at the axis end points. Otherwise, clip ticks
   *        that outside the axis extent.
   * @return {Array.<Object>} [{
   *     coord: ...,
   *     tickValue: ...
   * }, ...]
   */
  getTicksCoords: function (opt) {
    opt = opt || {};
    var tickModel = opt.tickModel || this.getTickModel();
    var result = createAxisTicks(this, tickModel);
    var ticks = result.ticks;
    var ticksCoords = map(ticks, function (tickValue) {
      return {
        coord: this.dataToCoord(tickValue),
        tickValue: tickValue
      };
    }, this);
    var alignWithLabel = tickModel.get('alignWithLabel');
    fixOnBandTicksCoords(this, ticksCoords, alignWithLabel, opt.clamp);
    return ticksCoords;
  },

  /**
   * @return {Array.<Array.<Object>>} [{ coord: ..., tickValue: ...}]
   */
  getMinorTicksCoords: function () {
    if (this.scale.type === 'ordinal') {
      // Category axis doesn't support minor ticks
      return [];
    }

    var minorTickModel = this.model.getModel('minorTick');
    var splitNumber = minorTickModel.get('splitNumber'); // Protection.

    if (!(splitNumber > 0 && splitNumber < 100)) {
      splitNumber = 5;
    }

    var minorTicks = this.scale.getMinorTicks(splitNumber);
    var minorTicksCoords = map(minorTicks, function (minorTicksGroup) {
      return map(minorTicksGroup, function (minorTick) {
        return {
          coord: this.dataToCoord(minorTick),
          tickValue: minorTick
        };
      }, this);
    }, this);
    return minorTicksCoords;
  },

  /**
   * @return {Array.<Object>} [{
   *     formattedLabel: string,
   *     rawLabel: axis.scale.getLabel(tickValue)
   *     tickValue: number
   * }, ...]
   */
  getViewLabels: function () {
    return createAxisLabels(this).labels;
  },

  /**
   * @return {module:echarts/coord/model/Model}
   */
  getLabelModel: function () {
    return this.model.getModel('axisLabel');
  },

  /**
   * Notice here we only get the default tick model. For splitLine
   * or splitArea, we should pass the splitLineModel or splitAreaModel
   * manually when calling `getTicksCoords`.
   * In GL, this method may be overrided to:
   * `axisModel.getModel('axisTick', grid3DModel.getModel('axisTick'));`
   * @return {module:echarts/coord/model/Model}
   */
  getTickModel: function () {
    return this.model.getModel('axisTick');
  },

  /**
   * Get width of band
   * @return {number}
   */
  getBandWidth: function () {
    var axisExtent = this._extent;
    var dataExtent = this.scale.getExtent();
    var len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0); // Fix #2728, avoid NaN when only one data.

    len === 0 && (len = 1);
    var size = Math.abs(axisExtent[1] - axisExtent[0]);
    return Math.abs(size) / len;
  },

  /**
   * @abstract
   * @return {boolean} Is horizontal
   */
  isHorizontal: null,

  /**
   * @abstract
   * @return {number} Get axis rotate, by degree.
   */
  getRotate: null,

  /**
   * Only be called in category axis.
   * Can be overrided, consider other axes like in 3D.
   * @return {number} Auto interval for cateogry axis tick and label
   */
  calculateCategoryInterval: function () {
    return calculateCategoryInterval(this);
  }
};

function fixExtentWithBands(extent, nTick) {
  var size = extent[1] - extent[0];
  var len = nTick;
  var margin = size / len / 2;
  extent[0] += margin;
  extent[1] -= margin;
} // If axis has labels [1, 2, 3, 4]. Bands on the axis are
// |---1---|---2---|---3---|---4---|.
// So the displayed ticks and splitLine/splitArea should between
// each data item, otherwise cause misleading (e.g., split tow bars
// of a single data item when there are two bar series).
// Also consider if tickCategoryInterval > 0 and onBand, ticks and
// splitLine/spliteArea should layout appropriately corresponding
// to displayed labels. (So we should not use `getBandWidth` in this
// case).


function fixOnBandTicksCoords(axis, ticksCoords, alignWithLabel, clamp) {
  var ticksLen = ticksCoords.length;

  if (!axis.onBand || alignWithLabel || !ticksLen) {
    return;
  }

  var axisExtent = axis.getExtent();
  var last;
  var diffSize;

  if (ticksLen === 1) {
    ticksCoords[0].coord = axisExtent[0];
    last = ticksCoords[1] = {
      coord: axisExtent[0]
    };
  } else {
    var crossLen = ticksCoords[ticksLen - 1].tickValue - ticksCoords[0].tickValue;
    var shift = (ticksCoords[ticksLen - 1].coord - ticksCoords[0].coord) / crossLen;
    each(ticksCoords, function (ticksItem) {
      ticksItem.coord -= shift / 2;
    });
    var dataExtent = axis.scale.getExtent();
    diffSize = 1 + dataExtent[1] - ticksCoords[ticksLen - 1].tickValue;
    last = {
      coord: ticksCoords[ticksLen - 1].coord + shift * diffSize
    };
    ticksCoords.push(last);
  }

  var inverse = axisExtent[0] > axisExtent[1]; // Handling clamp.

  if (littleThan(ticksCoords[0].coord, axisExtent[0])) {
    clamp ? ticksCoords[0].coord = axisExtent[0] : ticksCoords.shift();
  }

  if (clamp && littleThan(axisExtent[0], ticksCoords[0].coord)) {
    ticksCoords.unshift({
      coord: axisExtent[0]
    });
  }

  if (littleThan(axisExtent[1], last.coord)) {
    clamp ? last.coord = axisExtent[1] : ticksCoords.pop();
  }

  if (clamp && littleThan(last.coord, axisExtent[1])) {
    ticksCoords.push({
      coord: axisExtent[1]
    });
  }

  function littleThan(a, b) {
    // Avoid rounding error cause calculated tick coord different with extent.
    // It may cause an extra unecessary tick added.
    a = round(a);
    b = round(b);
    return inverse ? a > b : a < b;
  }
}

var _default = Axis;
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

/***/ "8ed2":
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

__webpack_require__("48c7");

var ComponentModel = __webpack_require__("6cb7");

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
// Grid 是在有直角坐标系的时候必须要存在的
// 所以这里也要被 Cartesian2D 依赖
var _default = ComponentModel.extend({
  type: 'grid',
  dependencies: ['xAxis', 'yAxis'],
  layoutMode: 'box',

  /**
   * @type {module:echarts/coord/cartesian/Grid}
   */
  coordinateSystem: null,
  defaultOption: {
    show: false,
    zlevel: 0,
    z: 0,
    left: '10%',
    top: 60,
    right: '10%',
    bottom: 60,
    // If grid size contain label
    containLabel: false,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#ccc'
  }
});

module.exports = _default;

/***/ }),

/***/ "9273":
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

var Axis = __webpack_require__("84ce");

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
function RadiusAxis(scale, radiusExtent) {
  Axis.call(this, 'radius', scale, radiusExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'category';
}

RadiusAxis.prototype = {
  constructor: RadiusAxis,

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
  },
  dataToRadius: Axis.prototype.dataToCoord,
  radiusToData: Axis.prototype.coordToData
};
zrUtil.inherits(RadiusAxis, Axis);
var _default = RadiusAxis;
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

/***/ "9e47":
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

var axisDefault = __webpack_require__("71ad");

var ComponentModel = __webpack_require__("6cb7");

var _layout = __webpack_require__("f934");

var getLayoutParams = _layout.getLayoutParams;
var mergeLayoutParam = _layout.mergeLayoutParam;

var OrdinalMeta = __webpack_require__("8e43");

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
// FIXME axisType is fixed ?
var AXIS_TYPES = ['value', 'category', 'time', 'log'];
/**
 * Generate sub axis model class
 * @param {string} axisName 'x' 'y' 'radius' 'angle' 'parallel'
 * @param {module:echarts/model/Component} BaseAxisModelClass
 * @param {Function} axisTypeDefaulter
 * @param {Object} [extraDefaultOption]
 */

function _default(axisName, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {
  zrUtil.each(AXIS_TYPES, function (axisType) {
    BaseAxisModelClass.extend({
      /**
       * @readOnly
       */
      type: axisName + 'Axis.' + axisType,
      mergeDefaultAndTheme: function (option, ecModel) {
        var layoutMode = this.layoutMode;
        var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
        var themeModel = ecModel.getTheme();
        zrUtil.merge(option, themeModel.get(axisType + 'Axis'));
        zrUtil.merge(option, this.getDefaultOption());
        option.type = axisTypeDefaulter(axisName, option);

        if (layoutMode) {
          mergeLayoutParam(option, inputPositionParams, layoutMode);
        }
      },

      /**
       * @override
       */
      optionUpdated: function () {
        var thisOption = this.option;

        if (thisOption.type === 'category') {
          this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
        }
      },

      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */
      getCategories: function (rawData) {
        var option = this.option; // FIXME
        // warning if called before all of 'getInitailData' finished.

        if (option.type === 'category') {
          if (rawData) {
            return option.data;
          }

          return this.__ordinalMeta.categories;
        }
      },
      getOrdinalMeta: function () {
        return this.__ordinalMeta;
      },
      defaultOption: zrUtil.mergeAll([{}, axisDefault[axisType + 'Axis'], extraDefaultOption], true)
    });
  });
  ComponentModel.registerSubTypeDefaulter(axisName + 'Axis', zrUtil.curry(axisTypeDefaulter, axisName));
}

module.exports = _default;

/***/ }),

/***/ "a7f2":
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
// Fix for 钓鱼岛
// var Region = require('../Region');
// var zrUtil = require('zrender/src/core/util');
// var geoCoord = [126, 25];
var points = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]];

function _default(mapType, region) {
  if (mapType === 'china' && region.name === '台湾') {
    region.geometries.push({
      type: 'polygon',
      exterior: points[0]
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "a991":
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

var textContain = __webpack_require__("e86a");

var Axis = __webpack_require__("84ce");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

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
var inner = makeInner();

function AngleAxis(scale, angleExtent) {
  angleExtent = angleExtent || [0, 360];
  Axis.call(this, 'angle', scale, angleExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'category';
}

AngleAxis.prototype = {
  constructor: AngleAxis,

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
  },
  dataToAngle: Axis.prototype.dataToCoord,
  angleToData: Axis.prototype.coordToData,

  /**
   * Only be called in category axis.
   * Angle axis uses text height to decide interval
   *
   * @override
   * @return {number} Auto interval for cateogry axis tick and label
   */
  calculateCategoryInterval: function () {
    var axis = this;
    var labelModel = axis.getLabelModel();
    var ordinalScale = axis.scale;
    var ordinalExtent = ordinalScale.getExtent(); // Providing this method is for optimization:
    // avoid generating a long array by `getTicks`
    // in large category data case.

    var tickCount = ordinalScale.count();

    if (ordinalExtent[1] - ordinalExtent[0] < 1) {
      return 0;
    }

    var tickValue = ordinalExtent[0];
    var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
    var unitH = Math.abs(unitSpan); // Not precise, just use height as text width
    // and each distance from axis line yet.

    var rect = textContain.getBoundingRect(tickValue, labelModel.getFont(), 'center', 'top');
    var maxH = Math.max(rect.height, 7);
    var dh = maxH / unitH; // 0/0 is NaN, 1/0 is Infinity.

    isNaN(dh) && (dh = Infinity);
    var interval = Math.max(0, Math.floor(dh));
    var cache = inner(axis.model);
    var lastAutoInterval = cache.lastAutoInterval;
    var lastTickCount = cache.lastTickCount; // Use cache to keep interval stable while moving zoom window,
    // otherwise the calculated interval might jitter when the zoom
    // window size is close to the interval-changing size.

    if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 // Always choose the bigger one, otherwise the critical
    // point is not the same when zooming in or zooming out.
    && lastAutoInterval > interval) {
      interval = lastAutoInterval;
    } // Only update cache if cache not used, otherwise the
    // changing of interval is too insensitive.
    else {
        cache.lastTickCount = tickCount;
        cache.lastAutoInterval = interval;
      }

    return interval;
  }
};
zrUtil.inherits(AngleAxis, Axis);
var _default = AngleAxis;
module.exports = _default;

/***/ }),

/***/ "aa3e":
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
function dataToCoordSize(dataSize, dataItem) {
  // dataItem is necessary in log axis.
  dataItem = dataItem || [0, 0];
  return zrUtil.map(['x', 'y'], function (dim, dimIdx) {
    var axis = this.getAxis(dim);
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    return axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
  }, this);
}

function _default(coordSys) {
  var rect = coordSys.grid.getRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: 'cartesian2d',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function (data) {
        // do not provide "out" param
        return coordSys.dataToPoint(data);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

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

/***/ "bda7":
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

var Region = __webpack_require__("f279");

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
 * Parse and decode geo json
 * @module echarts/coord/geo/parseGeoJson
 */
function decode(json) {
  if (!json.UTF8Encoding) {
    return json;
  }

  var encodeScale = json.UTF8Scale;

  if (encodeScale == null) {
    encodeScale = 1024;
  }

  var features = json.features;

  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    var geometry = feature.geometry;
    var coordinates = geometry.coordinates;
    var encodeOffsets = geometry.encodeOffsets;

    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c];

      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(coordinate, encodeOffsets[c], encodeScale);
      } else if (geometry.type === 'MultiPolygon') {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2];
          coordinate[c2] = decodePolygon(polygon, encodeOffsets[c][c2], encodeScale);
        }
      }
    }
  } // Has been decoded


  json.UTF8Encoding = false;
  return json;
}

function decodePolygon(coordinate, encodeOffsets, encodeScale) {
  var result = [];
  var prevX = encodeOffsets[0];
  var prevY = encodeOffsets[1];

  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64;
    var y = coordinate.charCodeAt(i + 1) - 64; // ZigZag decoding

    x = x >> 1 ^ -(x & 1);
    y = y >> 1 ^ -(y & 1); // Delta deocding

    x += prevX;
    y += prevY;
    prevX = x;
    prevY = y; // Dequantize

    result.push([x / encodeScale, y / encodeScale]);
  }

  return result;
}
/**
 * @alias module:echarts/coord/geo/parseGeoJson
 * @param {Object} geoJson
 * @return {module:zrender/container/Group}
 */


function _default(geoJson) {
  decode(geoJson);
  return zrUtil.map(zrUtil.filter(geoJson.features, function (featureObj) {
    // Output of mapshaper may have geometry null
    return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0;
  }), function (featureObj) {
    var properties = featureObj.properties;
    var geo = featureObj.geometry;
    var coordinates = geo.coordinates;
    var geometries = [];

    if (geo.type === 'Polygon') {
      geometries.push({
        type: 'polygon',
        // According to the GeoJSON specification.
        // First must be exterior, and the rest are all interior(holes).
        exterior: coordinates[0],
        interiors: coordinates.slice(1)
      });
    }

    if (geo.type === 'MultiPolygon') {
      zrUtil.each(coordinates, function (item) {
        if (item[0]) {
          geometries.push({
            type: 'polygon',
            exterior: item[0],
            interiors: item.slice(1)
          });
        }
      });
    }

    var region = new Region(properties.name, geometries, properties.cp);
    region.properties = properties;
    return region;
  });
}

module.exports = _default;

/***/ }),

/***/ "c62c":
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

var ComponentModel = __webpack_require__("6cb7");

var axisModelCreator = __webpack_require__("9e47");

var axisModelCommonMixin = __webpack_require__("2023");

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
var AxisModel = ComponentModel.extend({
  type: 'singleAxis',
  layoutMode: 'box',

  /**
   * @type {module:echarts/coord/single/SingleAxis}
   */
  axis: null,

  /**
   * @type {module:echarts/coord/single/Single}
   */
  coordinateSystem: null,

  /**
   * @override
   */
  getCoordSysModel: function () {
    return this;
  }
});
var defaultOption = {
  left: '5%',
  top: '5%',
  right: '5%',
  bottom: '5%',
  type: 'value',
  position: 'bottom',
  orient: 'horizontal',
  axisLine: {
    show: true,
    lineStyle: {
      width: 1,
      type: 'solid'
    }
  },
  // Single coordinate system and single axis is the,
  // which is used as the parent tooltip model.
  // same model, so we set default tooltip show as true.
  tooltip: {
    show: true
  },
  axisTick: {
    show: true,
    length: 6,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    interval: 'auto'
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: 'dashed',
      opacity: 0.2
    }
  }
};

function getAxisType(axisName, option) {
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
axisModelCreator('single', AxisModel, getAxisType, defaultOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "c92f":
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

var _parseSVG = __webpack_require__("3041");

var parseSVG = _parseSVG.parseSVG;
var makeViewBoxTransform = _parseSVG.makeViewBoxTransform;

var Group = __webpack_require__("e1fc");

var Rect = __webpack_require__("c7a2");

var _util = __webpack_require__("6d8b");

var assert = _util.assert;
var createHashMap = _util.createHashMap;

var BoundingRect = __webpack_require__("9850");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

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
var inner = makeInner();
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} mapRecord {specialAreas, geoJSON}
   * @return {Object} {root, boundingRect}
   */
  load: function (mapName, mapRecord) {
    var originRoot = inner(mapRecord).originRoot;

    if (originRoot) {
      return {
        root: originRoot,
        boundingRect: inner(mapRecord).boundingRect
      };
    }

    var graphic = buildGraphic(mapRecord);
    inner(mapRecord).originRoot = graphic.root;
    inner(mapRecord).boundingRect = graphic.boundingRect;
    return graphic;
  },
  makeGraphic: function (mapName, mapRecord, hostKey) {
    // For performance consideration (in large SVG), graphic only maked
    // when necessary and reuse them according to hostKey.
    var field = inner(mapRecord);
    var rootMap = field.rootMap || (field.rootMap = createHashMap());
    var root = rootMap.get(hostKey);

    if (root) {
      return root;
    }

    var originRoot = field.originRoot;
    var boundingRect = field.boundingRect; // For performance, if originRoot is not used by a view,
    // assign it to a view, but not reproduce graphic elements.

    if (!field.originRootHostKey) {
      field.originRootHostKey = hostKey;
      root = originRoot;
    } else {
      root = buildGraphic(mapRecord, boundingRect).root;
    }

    return rootMap.set(hostKey, root);
  },
  removeGraphic: function (mapName, mapRecord, hostKey) {
    var field = inner(mapRecord);
    var rootMap = field.rootMap;
    rootMap && rootMap.removeKey(hostKey);

    if (hostKey === field.originRootHostKey) {
      field.originRootHostKey = null;
    }
  }
};

function buildGraphic(mapRecord, boundingRect) {
  var svgXML = mapRecord.svgXML;
  var result;
  var root;

  try {
    result = svgXML && parseSVG(svgXML, {
      ignoreViewBox: true,
      ignoreRootClip: true
    }) || {};
    root = result.root;
    assert(root != null);
  } catch (e) {
    throw new Error('Invalid svg format\n' + e.message);
  }

  var svgWidth = result.width;
  var svgHeight = result.height;
  var viewBoxRect = result.viewBoxRect;

  if (!boundingRect) {
    boundingRect = svgWidth == null || svgHeight == null ? // If svg width / height not specified, calculate
    // bounding rect as the width / height
    root.getBoundingRect() : new BoundingRect(0, 0, 0, 0);

    if (svgWidth != null) {
      boundingRect.width = svgWidth;
    }

    if (svgHeight != null) {
      boundingRect.height = svgHeight;
    }
  }

  if (viewBoxRect) {
    var viewBoxTransform = makeViewBoxTransform(viewBoxRect, boundingRect.width, boundingRect.height);
    var elRoot = root;
    root = new Group();
    root.add(elRoot);
    elRoot.scale = viewBoxTransform.scale;
    elRoot.position = viewBoxTransform.position;
  }

  root.setClipPath(new Rect({
    shape: boundingRect.plain()
  }));
  return {
    root: root,
    boundingRect: boundingRect
  };
}

module.exports = _default;

/***/ }),

/***/ "cbe9":
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

var BoundingRect = __webpack_require__("9850");

var Cartesian = __webpack_require__("cf7e");

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
function Cartesian2D(name) {
  Cartesian.call(this, name);
}

Cartesian2D.prototype = {
  constructor: Cartesian2D,
  type: 'cartesian2d',

  /**
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: ['x', 'y'],

  /**
   * Base axis will be used on stacking.
   *
   * @return {module:echarts/coord/cartesian/Axis2D}
   */
  getBaseAxis: function () {
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAxis('x');
  },

  /**
   * If contain point
   * @param {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var axisX = this.getAxis('x');
    var axisY = this.getAxis('y');
    return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
  },

  /**
   * If contain data
   * @param {Array.<number>} data
   * @return {boolean}
   */
  containData: function (data) {
    return this.getAxis('x').containData(data[0]) && this.getAxis('y').containData(data[1]);
  },

  /**
   * @param {Array.<number>} data
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  dataToPoint: function (data, reserved, out) {
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out = out || [];
    out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(data[0]));
    out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(data[1]));
    return out;
  },

  /**
   * @param {Array.<number>} data
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  clampData: function (data, out) {
    var xScale = this.getAxis('x').scale;
    var yScale = this.getAxis('y').scale;
    var xAxisExtent = xScale.getExtent();
    var yAxisExtent = yScale.getExtent();
    var x = xScale.parse(data[0]);
    var y = yScale.parse(data[1]);
    out = out || [];
    out[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
    out[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
    return out;
  },

  /**
   * @param {Array.<number>} point
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  pointToData: function (point, out) {
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out = out || [];
    out[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]));
    out[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]));
    return out;
  },

  /**
   * Get other axis
   * @param {module:echarts/coord/cartesian/Axis2D} axis
   */
  getOtherAxis: function (axis) {
    return this.getAxis(axis.dim === 'x' ? 'y' : 'x');
  },

  /**
   * Get rect area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   * @return {BoundingRect}
   */
  getArea: function () {
    var xExtent = this.getAxis('x').getGlobalExtent();
    var yExtent = this.getAxis('y').getGlobalExtent();
    var x = Math.min(xExtent[0], xExtent[1]);
    var y = Math.min(yExtent[0], yExtent[1]);
    var width = Math.max(xExtent[0], xExtent[1]) - x;
    var height = Math.max(yExtent[0], yExtent[1]) - y;
    var rect = new BoundingRect(x, y, width, height);
    return rect;
  }
};
zrUtil.inherits(Cartesian2D, Cartesian);
var _default = Cartesian2D;
module.exports = _default;

/***/ }),

/***/ "cf7e":
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
 * Cartesian coordinate system
 * @module  echarts/coord/Cartesian
 *
 */
function dimAxisMapper(dim) {
  return this._axes[dim];
}
/**
 * @alias module:echarts/coord/Cartesian
 * @constructor
 */


var Cartesian = function (name) {
  this._axes = {};
  this._dimList = [];
  /**
   * @type {string}
   */

  this.name = name || '';
};

Cartesian.prototype = {
  constructor: Cartesian,
  type: 'cartesian',

  /**
   * Get axis
   * @param  {number|string} dim
   * @return {module:echarts/coord/Cartesian~Axis}
   */
  getAxis: function (dim) {
    return this._axes[dim];
  },

  /**
   * Get axes list
   * @return {Array.<module:echarts/coord/Cartesian~Axis>}
   */
  getAxes: function () {
    return zrUtil.map(this._dimList, dimAxisMapper, this);
  },

  /**
   * Get axes list by given scale type
   */
  getAxesByScale: function (scaleType) {
    scaleType = scaleType.toLowerCase();
    return zrUtil.filter(this.getAxes(), function (axis) {
      return axis.scale.type === scaleType;
    });
  },

  /**
   * Add axis
   * @param {module:echarts/coord/Cartesian.Axis}
   */
  addAxis: function (axis) {
    var dim = axis.dim;
    this._axes[dim] = axis;

    this._dimList.push(dim);
  },

  /**
   * Convert data to coord in nd space
   * @param {Array.<number>|Object.<string, number>} val
   * @return {Array.<number>|Object.<string, number>}
   */
  dataToCoord: function (val) {
    return this._dataCoordConvert(val, 'dataToCoord');
  },

  /**
   * Convert coord in nd space to data
   * @param  {Array.<number>|Object.<string, number>} val
   * @return {Array.<number>|Object.<string, number>}
   */
  coordToData: function (val) {
    return this._dataCoordConvert(val, 'coordToData');
  },
  _dataCoordConvert: function (input, method) {
    var dimList = this._dimList;
    var output = input instanceof Array ? [] : {};

    for (var i = 0; i < dimList.length; i++) {
      var dim = dimList[i];
      var axis = this._axes[dim];
      output[dim] = axis[method](input[dim]);
    }

    return output;
  }
};
var _default = Cartesian;
module.exports = _default;

/***/ }),

/***/ "d090":
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

var layout = __webpack_require__("f934");

var numberUtil = __webpack_require__("3842");

var CoordinateSystem = __webpack_require__("2039");

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
// (24*60*60*1000)
var PROXIMATE_ONE_DAY = 86400000;
/**
 * Calendar
 *
 * @constructor
 *
 * @param {Object} calendarModel calendarModel
 * @param {Object} ecModel       ecModel
 * @param {Object} api           api
 */

function Calendar(calendarModel, ecModel, api) {
  this._model = calendarModel;
}

Calendar.prototype = {
  constructor: Calendar,
  type: 'calendar',
  dimensions: ['time', 'value'],
  // Required in createListFromData
  getDimensionsInfo: function () {
    return [{
      name: 'time',
      type: 'time'
    }, 'value'];
  },
  getRangeInfo: function () {
    return this._rangeInfo;
  },
  getModel: function () {
    return this._model;
  },
  getRect: function () {
    return this._rect;
  },
  getCellWidth: function () {
    return this._sw;
  },
  getCellHeight: function () {
    return this._sh;
  },
  getOrient: function () {
    return this._orient;
  },

  /**
   * getFirstDayOfWeek
   *
   * @example
   *     0 : start at Sunday
   *     1 : start at Monday
   *
   * @return {number}
   */
  getFirstDayOfWeek: function () {
    return this._firstDayOfWeek;
  },

  /**
   * get date info
   *
   * @param  {string|number} date date
   * @return {Object}
   * {
   *      y: string, local full year, eg., '1940',
   *      m: string, local month, from '01' ot '12',
   *      d: string, local date, from '01' to '31' (if exists),
   *      day: It is not date.getDay(). It is the location of the cell in a week, from 0 to 6,
   *      time: timestamp,
   *      formatedDate: string, yyyy-MM-dd,
   *      date: original date object.
   * }
   */
  getDateInfo: function (date) {
    date = numberUtil.parseDate(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    var day = date.getDay();
    day = Math.abs((day + 7 - this.getFirstDayOfWeek()) % 7);
    return {
      y: y,
      m: m,
      d: d,
      day: day,
      time: date.getTime(),
      formatedDate: y + '-' + m + '-' + d,
      date: date
    };
  },
  getNextNDay: function (date, n) {
    n = n || 0;

    if (n === 0) {
      return this.getDateInfo(date);
    }

    date = new Date(this.getDateInfo(date).time);
    date.setDate(date.getDate() + n);
    return this.getDateInfo(date);
  },
  update: function (ecModel, api) {
    this._firstDayOfWeek = +this._model.getModel('dayLabel').get('firstDay');
    this._orient = this._model.get('orient');
    this._lineWidth = this._model.getModel('itemStyle').getItemStyle().lineWidth || 0;
    this._rangeInfo = this._getRangeInfo(this._initRangeOption());
    var weeks = this._rangeInfo.weeks || 1;
    var whNames = ['width', 'height'];

    var cellSize = this._model.get('cellSize').slice();

    var layoutParams = this._model.getBoxLayoutParams();

    var cellNumbers = this._orient === 'horizontal' ? [weeks, 7] : [7, weeks];
    zrUtil.each([0, 1], function (idx) {
      if (cellSizeSpecified(cellSize, idx)) {
        layoutParams[whNames[idx]] = cellSize[idx] * cellNumbers[idx];
      }
    });
    var whGlobal = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var calendarRect = this._rect = layout.getLayoutRect(layoutParams, whGlobal);
    zrUtil.each([0, 1], function (idx) {
      if (!cellSizeSpecified(cellSize, idx)) {
        cellSize[idx] = calendarRect[whNames[idx]] / cellNumbers[idx];
      }
    });

    function cellSizeSpecified(cellSize, idx) {
      return cellSize[idx] != null && cellSize[idx] !== 'auto';
    }

    this._sw = cellSize[0];
    this._sh = cellSize[1];
  },

  /**
   * Convert a time data(time, value) item to (x, y) point.
   *
   * @override
   * @param  {Array|number} data data
   * @param  {boolean} [clamp=true] out of range
   * @return {Array} point
   */
  dataToPoint: function (data, clamp) {
    zrUtil.isArray(data) && (data = data[0]);
    clamp == null && (clamp = true);
    var dayInfo = this.getDateInfo(data);
    var range = this._rangeInfo;
    var date = dayInfo.formatedDate; // if not in range return [NaN, NaN]

    if (clamp && !(dayInfo.time >= range.start.time && dayInfo.time < range.end.time + PROXIMATE_ONE_DAY)) {
      return [NaN, NaN];
    }

    var week = dayInfo.day;

    var nthWeek = this._getRangeInfo([range.start.time, date]).nthWeek;

    if (this._orient === 'vertical') {
      return [this._rect.x + week * this._sw + this._sw / 2, this._rect.y + nthWeek * this._sh + this._sh / 2];
    }

    return [this._rect.x + nthWeek * this._sw + this._sw / 2, this._rect.y + week * this._sh + this._sh / 2];
  },

  /**
   * Convert a (x, y) point to time data
   *
   * @override
   * @param  {string} point point
   * @return {string}       data
   */
  pointToData: function (point) {
    var date = this.pointToDate(point);
    return date && date.time;
  },

  /**
   * Convert a time date item to (x, y) four point.
   *
   * @param  {Array} data  date[0] is date
   * @param  {boolean} [clamp=true]  out of range
   * @return {Object}       point
   */
  dataToRect: function (data, clamp) {
    var point = this.dataToPoint(data, clamp);
    return {
      contentShape: {
        x: point[0] - (this._sw - this._lineWidth) / 2,
        y: point[1] - (this._sh - this._lineWidth) / 2,
        width: this._sw - this._lineWidth,
        height: this._sh - this._lineWidth
      },
      center: point,
      tl: [point[0] - this._sw / 2, point[1] - this._sh / 2],
      tr: [point[0] + this._sw / 2, point[1] - this._sh / 2],
      br: [point[0] + this._sw / 2, point[1] + this._sh / 2],
      bl: [point[0] - this._sw / 2, point[1] + this._sh / 2]
    };
  },

  /**
   * Convert a (x, y) point to time date
   *
   * @param  {Array} point point
   * @return {Object}       date
   */
  pointToDate: function (point) {
    var nthX = Math.floor((point[0] - this._rect.x) / this._sw) + 1;
    var nthY = Math.floor((point[1] - this._rect.y) / this._sh) + 1;
    var range = this._rangeInfo.range;

    if (this._orient === 'vertical') {
      return this._getDateByWeeksAndDay(nthY, nthX - 1, range);
    }

    return this._getDateByWeeksAndDay(nthX, nthY - 1, range);
  },

  /**
   * @inheritDoc
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @inheritDoc
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData'),

  /**
   * initRange
   *
   * @private
   * @return {Array} [start, end]
   */
  _initRangeOption: function () {
    var range = this._model.get('range');

    var rg = range;

    if (zrUtil.isArray(rg) && rg.length === 1) {
      rg = rg[0];
    }

    if (/^\d{4}$/.test(rg)) {
      range = [rg + '-01-01', rg + '-12-31'];
    }

    if (/^\d{4}[\/|-]\d{1,2}$/.test(rg)) {
      var start = this.getDateInfo(rg);
      var firstDay = start.date;
      firstDay.setMonth(firstDay.getMonth() + 1);
      var end = this.getNextNDay(firstDay, -1);
      range = [start.formatedDate, end.formatedDate];
    }

    if (/^\d{4}[\/|-]\d{1,2}[\/|-]\d{1,2}$/.test(rg)) {
      range = [rg, rg];
    }

    var tmp = this._getRangeInfo(range);

    if (tmp.start.time > tmp.end.time) {
      range.reverse();
    }

    return range;
  },

  /**
   * range info
   *
   * @private
   * @param  {Array} range range ['2017-01-01', '2017-07-08']
   *  If range[0] > range[1], they will not be reversed.
   * @return {Object}       obj
   */
  _getRangeInfo: function (range) {
    range = [this.getDateInfo(range[0]), this.getDateInfo(range[1])];
    var reversed;

    if (range[0].time > range[1].time) {
      reversed = true;
      range.reverse();
    }

    var allDay = Math.floor(range[1].time / PROXIMATE_ONE_DAY) - Math.floor(range[0].time / PROXIMATE_ONE_DAY) + 1; // Consider case:
    // Firstly set system timezone as "Time Zone: America/Toronto",
    // ```
    // var first = new Date(1478412000000 - 3600 * 1000 * 2.5);
    // var second = new Date(1478412000000);
    // var allDays = Math.floor(second / ONE_DAY) - Math.floor(first / ONE_DAY) + 1;
    // ```
    // will get wrong result because of DST. So we should fix it.

    var date = new Date(range[0].time);
    var startDateNum = date.getDate();
    var endDateNum = range[1].date.getDate();
    date.setDate(startDateNum + allDay - 1); // The bias can not over a month, so just compare date.

    if (date.getDate() !== endDateNum) {
      var sign = date.getTime() - range[1].time > 0 ? 1 : -1;

      while (date.getDate() !== endDateNum && (date.getTime() - range[1].time) * sign > 0) {
        allDay -= sign;
        date.setDate(startDateNum + allDay - 1);
      }
    }

    var weeks = Math.floor((allDay + range[0].day + 6) / 7);
    var nthWeek = reversed ? -weeks + 1 : weeks - 1;
    reversed && range.reverse();
    return {
      range: [range[0].formatedDate, range[1].formatedDate],
      start: range[0],
      end: range[1],
      allDay: allDay,
      weeks: weeks,
      // From 0.
      nthWeek: nthWeek,
      fweek: range[0].day,
      lweek: range[1].day
    };
  },

  /**
   * get date by nthWeeks and week day in range
   *
   * @private
   * @param  {number} nthWeek the week
   * @param  {number} day   the week day
   * @param  {Array} range [d1, d2]
   * @return {Object}
   */
  _getDateByWeeksAndDay: function (nthWeek, day, range) {
    var rangeInfo = this._getRangeInfo(range);

    if (nthWeek > rangeInfo.weeks || nthWeek === 0 && day < rangeInfo.fweek || nthWeek === rangeInfo.weeks && day > rangeInfo.lweek) {
      return false;
    }

    var nthDay = (nthWeek - 1) * 7 - rangeInfo.fweek + day;
    var date = new Date(rangeInfo.start.time);
    date.setDate(rangeInfo.start.d + nthDay);
    return this.getDateInfo(date);
  }
};
Calendar.dimensions = Calendar.prototype.dimensions;
Calendar.getDimensionsInfo = Calendar.prototype.getDimensionsInfo;

Calendar.create = function (ecModel, api) {
  var calendarList = [];
  ecModel.eachComponent('calendar', function (calendarModel) {
    var calendar = new Calendar(calendarModel, ecModel, api);
    calendarList.push(calendar);
    calendarModel.coordinateSystem = calendar;
  });
  ecModel.eachSeries(function (calendarSeries) {
    if (calendarSeries.get('coordinateSystem') === 'calendar') {
      // Inject coordinate system
      calendarSeries.coordinateSystem = calendarList[calendarSeries.get('calendarIndex') || 0];
    }
  });
  return calendarList;
};

function doConvert(methodName, ecModel, finder, value) {
  var calendarModel = finder.calendarModel;
  var seriesModel = finder.seriesModel;
  var coordSys = calendarModel ? calendarModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem : null;
  return coordSys === this ? coordSys[methodName](value) : null;
}

CoordinateSystem.register('calendar', Calendar);
var _default = Calendar;
module.exports = _default;

/***/ }),

/***/ "d9d0":
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

var matrix = __webpack_require__("1687");

var layoutUtil = __webpack_require__("f934");

var axisHelper = __webpack_require__("697e");

var ParallelAxis = __webpack_require__("0f55");

var graphic = __webpack_require__("2306");

var numberUtil = __webpack_require__("3842");

var sliderMove = __webpack_require__("ef6a");

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
 * Parallel Coordinates
 * <https://en.wikipedia.org/wiki/Parallel_coordinates>
 */
var each = zrUtil.each;
var mathMin = Math.min;
var mathMax = Math.max;
var mathFloor = Math.floor;
var mathCeil = Math.ceil;
var round = numberUtil.round;
var PI = Math.PI;

function Parallel(parallelModel, ecModel, api) {
  /**
   * key: dimension
   * @type {Object.<string, module:echarts/coord/parallel/Axis>}
   * @private
   */
  this._axesMap = zrUtil.createHashMap();
  /**
   * key: dimension
   * value: {position: [], rotation, }
   * @type {Object.<string, Object>}
   * @private
   */

  this._axesLayout = {};
  /**
   * Always follow axis order.
   * @type {Array.<string>}
   * @readOnly
   */

  this.dimensions = parallelModel.dimensions;
  /**
   * @type {module:zrender/core/BoundingRect}
   */

  this._rect;
  /**
   * @type {module:echarts/coord/parallel/ParallelModel}
   */

  this._model = parallelModel;

  this._init(parallelModel, ecModel, api);
}

Parallel.prototype = {
  type: 'parallel',
  constructor: Parallel,

  /**
   * Initialize cartesian coordinate systems
   * @private
   */
  _init: function (parallelModel, ecModel, api) {
    var dimensions = parallelModel.dimensions;
    var parallelAxisIndex = parallelModel.parallelAxisIndex;
    each(dimensions, function (dim, idx) {
      var axisIndex = parallelAxisIndex[idx];
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);

      var axis = this._axesMap.set(dim, new ParallelAxis(dim, axisHelper.createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisIndex));

      var isCategory = axis.type === 'category';
      axis.onBand = isCategory && axisModel.get('boundaryGap');
      axis.inverse = axisModel.get('inverse'); // Injection

      axisModel.axis = axis;
      axis.model = axisModel;
      axis.coordinateSystem = axisModel.coordinateSystem = this;
    }, this);
  },

  /**
   * Update axis scale after data processed
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  update: function (ecModel, api) {
    this._updateAxesFromSeries(this._model, ecModel);
  },

  /**
   * @override
   */
  containPoint: function (point) {
    var layoutInfo = this._makeLayoutInfo();

    var axisBase = layoutInfo.axisBase;
    var layoutBase = layoutInfo.layoutBase;
    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var pAxis = point[1 - pixelDimIndex];
    var pLayout = point[pixelDimIndex];
    return pAxis >= axisBase && pAxis <= axisBase + layoutInfo.axisLength && pLayout >= layoutBase && pLayout <= layoutBase + layoutInfo.layoutLength;
  },
  getModel: function () {
    return this._model;
  },

  /**
   * Update properties from series
   * @private
   */
  _updateAxesFromSeries: function (parallelModel, ecModel) {
    ecModel.eachSeries(function (seriesModel) {
      if (!parallelModel.contains(seriesModel, ecModel)) {
        return;
      }

      var data = seriesModel.getData();
      each(this.dimensions, function (dim) {
        var axis = this._axesMap.get(dim);

        axis.scale.unionExtentFromData(data, data.mapDimension(dim));
        axisHelper.niceScaleExtent(axis.scale, axis.model);
      }, this);
    }, this);
  },

  /**
   * Resize the parallel coordinate system.
   * @param {module:echarts/coord/parallel/ParallelModel} parallelModel
   * @param {module:echarts/ExtensionAPI} api
   */
  resize: function (parallelModel, api) {
    this._rect = layoutUtil.getLayoutRect(parallelModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });

    this._layoutAxes();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getRect: function () {
    return this._rect;
  },

  /**
   * @private
   */
  _makeLayoutInfo: function () {
    var parallelModel = this._model;
    var rect = this._rect;
    var xy = ['x', 'y'];
    var wh = ['width', 'height'];
    var layout = parallelModel.get('layout');
    var pixelDimIndex = layout === 'horizontal' ? 0 : 1;
    var layoutLength = rect[wh[pixelDimIndex]];
    var layoutExtent = [0, layoutLength];
    var axisCount = this.dimensions.length;
    var axisExpandWidth = restrict(parallelModel.get('axisExpandWidth'), layoutExtent);
    var axisExpandCount = restrict(parallelModel.get('axisExpandCount') || 0, [0, axisCount]);
    var axisExpandable = parallelModel.get('axisExpandable') && axisCount > 3 && axisCount > axisExpandCount && axisExpandCount > 1 && axisExpandWidth > 0 && layoutLength > 0; // `axisExpandWindow` is According to the coordinates of [0, axisExpandLength],
    // for sake of consider the case that axisCollapseWidth is 0 (when screen is narrow),
    // where collapsed axes should be overlapped.

    var axisExpandWindow = parallelModel.get('axisExpandWindow');
    var winSize;

    if (!axisExpandWindow) {
      winSize = restrict(axisExpandWidth * (axisExpandCount - 1), layoutExtent);
      var axisExpandCenter = parallelModel.get('axisExpandCenter') || mathFloor(axisCount / 2);
      axisExpandWindow = [axisExpandWidth * axisExpandCenter - winSize / 2];
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    } else {
      winSize = restrict(axisExpandWindow[1] - axisExpandWindow[0], layoutExtent);
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    }

    var axisCollapseWidth = (layoutLength - winSize) / (axisCount - axisExpandCount); // Avoid axisCollapseWidth is too small.

    axisCollapseWidth < 3 && (axisCollapseWidth = 0); // Find the first and last indices > ewin[0] and < ewin[1].

    var winInnerIndices = [mathFloor(round(axisExpandWindow[0] / axisExpandWidth, 1)) + 1, mathCeil(round(axisExpandWindow[1] / axisExpandWidth, 1)) - 1]; // Pos in ec coordinates.

    var axisExpandWindow0Pos = axisCollapseWidth / axisExpandWidth * axisExpandWindow[0];
    return {
      layout: layout,
      pixelDimIndex: pixelDimIndex,
      layoutBase: rect[xy[pixelDimIndex]],
      layoutLength: layoutLength,
      axisBase: rect[xy[1 - pixelDimIndex]],
      axisLength: rect[wh[1 - pixelDimIndex]],
      axisExpandable: axisExpandable,
      axisExpandWidth: axisExpandWidth,
      axisCollapseWidth: axisCollapseWidth,
      axisExpandWindow: axisExpandWindow,
      axisCount: axisCount,
      winInnerIndices: winInnerIndices,
      axisExpandWindow0Pos: axisExpandWindow0Pos
    };
  },

  /**
   * @private
   */
  _layoutAxes: function () {
    var rect = this._rect;
    var axes = this._axesMap;
    var dimensions = this.dimensions;

    var layoutInfo = this._makeLayoutInfo();

    var layout = layoutInfo.layout;
    axes.each(function (axis) {
      var axisExtent = [0, layoutInfo.axisLength];
      var idx = axis.inverse ? 1 : 0;
      axis.setExtent(axisExtent[idx], axisExtent[1 - idx]);
    });
    each(dimensions, function (dim, idx) {
      var posInfo = (layoutInfo.axisExpandable ? layoutAxisWithExpand : layoutAxisWithoutExpand)(idx, layoutInfo);
      var positionTable = {
        horizontal: {
          x: posInfo.position,
          y: layoutInfo.axisLength
        },
        vertical: {
          x: 0,
          y: posInfo.position
        }
      };
      var rotationTable = {
        horizontal: PI / 2,
        vertical: 0
      };
      var position = [positionTable[layout].x + rect.x, positionTable[layout].y + rect.y];
      var rotation = rotationTable[layout];
      var transform = matrix.create();
      matrix.rotate(transform, transform, rotation);
      matrix.translate(transform, transform, position); // TODO
      // tick等排布信息。
      // TODO
      // 根据axis order 更新 dimensions顺序。

      this._axesLayout[dim] = {
        position: position,
        rotation: rotation,
        transform: transform,
        axisNameAvailableWidth: posInfo.axisNameAvailableWidth,
        axisLabelShow: posInfo.axisLabelShow,
        nameTruncateMaxWidth: posInfo.nameTruncateMaxWidth,
        tickDirection: 1,
        labelDirection: 1
      };
    }, this);
  },

  /**
   * Get axis by dim.
   * @param {string} dim
   * @return {module:echarts/coord/parallel/ParallelAxis} [description]
   */
  getAxis: function (dim) {
    return this._axesMap.get(dim);
  },

  /**
   * Convert a dim value of a single item of series data to Point.
   * @param {*} value
   * @param {string} dim
   * @return {Array}
   */
  dataToPoint: function (value, dim) {
    return this.axisCoordToPoint(this._axesMap.get(dim).dataToCoord(value), dim);
  },

  /**
   * Travel data for one time, get activeState of each data item.
   * @param {module:echarts/data/List} data
   * @param {Functio} cb param: {string} activeState 'active' or 'inactive' or 'normal'
   *                            {number} dataIndex
   * @param {number} [start=0] the start dataIndex that travel from.
   * @param {number} [end=data.count()] the next dataIndex of the last dataIndex will be travel.
   */
  eachActiveState: function (data, callback, start, end) {
    start == null && (start = 0);
    end == null && (end = data.count());
    var axesMap = this._axesMap;
    var dimensions = this.dimensions;
    var dataDimensions = [];
    var axisModels = [];
    zrUtil.each(dimensions, function (axisDim) {
      dataDimensions.push(data.mapDimension(axisDim));
      axisModels.push(axesMap.get(axisDim).model);
    });
    var hasActiveSet = this.hasAxisBrushed();

    for (var dataIndex = start; dataIndex < end; dataIndex++) {
      var activeState;

      if (!hasActiveSet) {
        activeState = 'normal';
      } else {
        activeState = 'active';
        var values = data.getValues(dataDimensions, dataIndex);

        for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
          var state = axisModels[j].getActiveState(values[j]);

          if (state === 'inactive') {
            activeState = 'inactive';
            break;
          }
        }
      }

      callback(activeState, dataIndex);
    }
  },

  /**
   * Whether has any activeSet.
   * @return {boolean}
   */
  hasAxisBrushed: function () {
    var dimensions = this.dimensions;
    var axesMap = this._axesMap;
    var hasActiveSet = false;

    for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
      if (axesMap.get(dimensions[j]).model.getActiveState() !== 'normal') {
        hasActiveSet = true;
      }
    }

    return hasActiveSet;
  },

  /**
   * Convert coords of each axis to Point.
   *  Return point. For example: [10, 20]
   * @param {Array.<number>} coords
   * @param {string} dim
   * @return {Array.<number>}
   */
  axisCoordToPoint: function (coord, dim) {
    var axisLayout = this._axesLayout[dim];
    return graphic.applyTransform([coord, 0], axisLayout.transform);
  },

  /**
   * Get axis layout.
   */
  getAxisLayout: function (dim) {
    return zrUtil.clone(this._axesLayout[dim]);
  },

  /**
   * @param {Array.<number>} point
   * @return {Object} {axisExpandWindow, delta, behavior: 'jump' | 'slide' | 'none'}.
   */
  getSlidedAxisExpandWindow: function (point) {
    var layoutInfo = this._makeLayoutInfo();

    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var axisExpandWindow = layoutInfo.axisExpandWindow.slice();
    var winSize = axisExpandWindow[1] - axisExpandWindow[0];
    var extent = [0, layoutInfo.axisExpandWidth * (layoutInfo.axisCount - 1)]; // Out of the area of coordinate system.

    if (!this.containPoint(point)) {
      return {
        behavior: 'none',
        axisExpandWindow: axisExpandWindow
      };
    } // Conver the point from global to expand coordinates.


    var pointCoord = point[pixelDimIndex] - layoutInfo.layoutBase - layoutInfo.axisExpandWindow0Pos; // For dragging operation convenience, the window should not be
    // slided when mouse is the center area of the window.

    var delta;
    var behavior = 'slide';
    var axisCollapseWidth = layoutInfo.axisCollapseWidth;

    var triggerArea = this._model.get('axisExpandSlideTriggerArea'); // But consider touch device, jump is necessary.


    var useJump = triggerArea[0] != null;

    if (axisCollapseWidth) {
      if (useJump && axisCollapseWidth && pointCoord < winSize * triggerArea[0]) {
        behavior = 'jump';
        delta = pointCoord - winSize * triggerArea[2];
      } else if (useJump && axisCollapseWidth && pointCoord > winSize * (1 - triggerArea[0])) {
        behavior = 'jump';
        delta = pointCoord - winSize * (1 - triggerArea[2]);
      } else {
        (delta = pointCoord - winSize * triggerArea[1]) >= 0 && (delta = pointCoord - winSize * (1 - triggerArea[1])) <= 0 && (delta = 0);
      }

      delta *= layoutInfo.axisExpandWidth / axisCollapseWidth;
      delta ? sliderMove(delta, axisExpandWindow, extent, 'all') // Avoid nonsense triger on mousemove.
      : behavior = 'none';
    } // When screen is too narrow, make it visible and slidable, although it is hard to interact.
    else {
        var winSize = axisExpandWindow[1] - axisExpandWindow[0];
        var pos = extent[1] * pointCoord / winSize;
        axisExpandWindow = [mathMax(0, pos - winSize / 2)];
        axisExpandWindow[1] = mathMin(extent[1], axisExpandWindow[0] + winSize);
        axisExpandWindow[0] = axisExpandWindow[1] - winSize;
      }

    return {
      axisExpandWindow: axisExpandWindow,
      behavior: behavior
    };
  }
};

function restrict(len, extent) {
  return mathMin(mathMax(len, extent[0]), extent[1]);
}

function layoutAxisWithoutExpand(axisIndex, layoutInfo) {
  var step = layoutInfo.layoutLength / (layoutInfo.axisCount - 1);
  return {
    position: step * axisIndex,
    axisNameAvailableWidth: step,
    axisLabelShow: true
  };
}

function layoutAxisWithExpand(axisIndex, layoutInfo) {
  var layoutLength = layoutInfo.layoutLength;
  var axisExpandWidth = layoutInfo.axisExpandWidth;
  var axisCount = layoutInfo.axisCount;
  var axisCollapseWidth = layoutInfo.axisCollapseWidth;
  var winInnerIndices = layoutInfo.winInnerIndices;
  var position;
  var axisNameAvailableWidth = axisCollapseWidth;
  var axisLabelShow = false;
  var nameTruncateMaxWidth;

  if (axisIndex < winInnerIndices[0]) {
    position = axisIndex * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  } else if (axisIndex <= winInnerIndices[1]) {
    position = layoutInfo.axisExpandWindow0Pos + axisIndex * axisExpandWidth - layoutInfo.axisExpandWindow[0];
    axisNameAvailableWidth = axisExpandWidth;
    axisLabelShow = true;
  } else {
    position = layoutLength - (axisCount - 1 - axisIndex) * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  }

  return {
    position: position,
    axisNameAvailableWidth: axisNameAvailableWidth,
    axisLabelShow: axisLabelShow,
    nameTruncateMaxWidth: nameTruncateMaxWidth
  };
}

var _default = Parallel;
module.exports = _default;

/***/ }),

/***/ "d9f1":
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

var ComponentModel = __webpack_require__("6cb7");

var axisModelCreator = __webpack_require__("9e47");

var axisModelCommonMixin = __webpack_require__("2023");

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
var PolarAxisModel = ComponentModel.extend({
  type: 'polarAxis',

  /**
   * @type {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  axis: null,

  /**
   * @override
   */
  getCoordSysModel: function () {
    return this.ecModel.queryComponents({
      mainType: 'polar',
      index: this.option.polarIndex,
      id: this.option.polarId
    })[0];
  }
});
zrUtil.merge(PolarAxisModel.prototype, axisModelCommonMixin);
var polarAxisDefaultExtendedOption = {
  angle: {
    // polarIndex: 0,
    // polarId: '',
    startAngle: 90,
    clockwise: true,
    splitNumber: 12,
    axisLabel: {
      rotate: false
    }
  },
  radius: {
    // polarIndex: 0,
    // polarId: '',
    splitNumber: 5
  }
};

function getAxisType(axisDim, option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

axisModelCreator('angle', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.angle);
axisModelCreator('radius', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.radius);

/***/ }),

/***/ "df3a0":
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

var ComponentModel = __webpack_require__("6cb7");

var makeStyleMapper = __webpack_require__("282b");

var axisModelCreator = __webpack_require__("9e47");

var numberUtil = __webpack_require__("3842");

var axisModelCommonMixin = __webpack_require__("2023");

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
var AxisModel = ComponentModel.extend({
  type: 'baseParallelAxis',

  /**
   * @type {module:echarts/coord/parallel/Axis}
   */
  axis: null,

  /**
   * @type {Array.<Array.<number>}
   * @readOnly
   */
  activeIntervals: [],

  /**
   * @return {Object}
   */
  getAreaSelectStyle: function () {
    return makeStyleMapper([['fill', 'color'], ['lineWidth', 'borderWidth'], ['stroke', 'borderColor'], ['width', 'width'], ['opacity', 'opacity']])(this.getModel('areaSelectStyle'));
  },

  /**
   * The code of this feature is put on AxisModel but not ParallelAxis,
   * because axisModel can be alive after echarts updating but instance of
   * ParallelAxis having been disposed. this._activeInterval should be kept
   * when action dispatched (i.e. legend click).
   *
   * @param {Array.<Array<number>>} intervals interval.length === 0
   *                                          means set all active.
   * @public
   */
  setActiveIntervals: function (intervals) {
    var activeIntervals = this.activeIntervals = zrUtil.clone(intervals); // Normalize

    if (activeIntervals) {
      for (var i = activeIntervals.length - 1; i >= 0; i--) {
        numberUtil.asc(activeIntervals[i]);
      }
    }
  },

  /**
   * @param {number|string} [value] When attempting to detect 'no activeIntervals set',
   *                         value can not be input.
   * @return {string} 'normal': no activeIntervals set,
   *                  'active',
   *                  'inactive'.
   * @public
   */
  getActiveState: function (value) {
    var activeIntervals = this.activeIntervals;

    if (!activeIntervals.length) {
      return 'normal';
    }

    if (value == null || isNaN(value)) {
      return 'inactive';
    } // Simple optimization


    if (activeIntervals.length === 1) {
      var interval = activeIntervals[0];

      if (interval[0] <= value && value <= interval[1]) {
        return 'active';
      }
    } else {
      for (var i = 0, len = activeIntervals.length; i < len; i++) {
        if (activeIntervals[i][0] <= value && value <= activeIntervals[i][1]) {
          return 'active';
        }
      }
    }

    return 'inactive';
  }
});
var defaultOption = {
  type: 'value',

  /**
   * @type {Array.<number>}
   */
  dim: null,
  // 0, 1, 2, ...
  // parallelIndex: null,
  areaSelectStyle: {
    width: 20,
    borderWidth: 1,
    borderColor: 'rgba(160,197,232)',
    color: 'rgba(160,197,232)',
    opacity: 0.3
  },
  realtime: true,
  // Whether realtime update view when select.
  z: 10
};
zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);

function getAxisType(axisName, option) {
  return option.type || (option.data ? 'category' : 'value');
}

axisModelCreator('parallel', AxisModel, getAxisType, defaultOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "e073":
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

var textContain = __webpack_require__("e86a");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var _axisHelper = __webpack_require__("697e");

var makeLabelFormatter = _axisHelper.makeLabelFormatter;
var getOptionCategoryInterval = _axisHelper.getOptionCategoryInterval;
var shouldShowAllLabels = _axisHelper.shouldShowAllLabels;

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
var inner = makeInner();
/**
 * @param {module:echats/coord/Axis} axis
 * @return {Object} {
 *     labels: [{
 *         formattedLabel: string,
 *         rawLabel: string,
 *         tickValue: number
 *     }, ...],
 *     labelCategoryInterval: number
 * }
 */

function createAxisLabels(axis) {
  // Only ordinal scale support tick interval
  return axis.type === 'category' ? makeCategoryLabels(axis) : makeRealNumberLabels(axis);
}
/**
 * @param {module:echats/coord/Axis} axis
 * @param {module:echarts/model/Model} tickModel For example, can be axisTick, splitLine, splitArea.
 * @return {Object} {
 *     ticks: Array.<number>
 *     tickCategoryInterval: number
 * }
 */


function createAxisTicks(axis, tickModel) {
  // Only ordinal scale support tick interval
  return axis.type === 'category' ? makeCategoryTicks(axis, tickModel) : {
    ticks: axis.scale.getTicks()
  };
}

function makeCategoryLabels(axis) {
  var labelModel = axis.getLabelModel();
  var result = makeCategoryLabelsActually(axis, labelModel);
  return !labelModel.get('show') || axis.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: result.labelCategoryInterval
  } : result;
}

function makeCategoryLabelsActually(axis, labelModel) {
  var labelsCache = getListCache(axis, 'labels');
  var optionLabelInterval = getOptionCategoryInterval(labelModel);
  var result = listCacheGet(labelsCache, optionLabelInterval);

  if (result) {
    return result;
  }

  var labels;
  var numericLabelInterval;

  if (zrUtil.isFunction(optionLabelInterval)) {
    labels = makeLabelsByCustomizedCategoryInterval(axis, optionLabelInterval);
  } else {
    numericLabelInterval = optionLabelInterval === 'auto' ? makeAutoCategoryInterval(axis) : optionLabelInterval;
    labels = makeLabelsByNumericCategoryInterval(axis, numericLabelInterval);
  } // Cache to avoid calling interval function repeatly.


  return listCacheSet(labelsCache, optionLabelInterval, {
    labels: labels,
    labelCategoryInterval: numericLabelInterval
  });
}

function makeCategoryTicks(axis, tickModel) {
  var ticksCache = getListCache(axis, 'ticks');
  var optionTickInterval = getOptionCategoryInterval(tickModel);
  var result = listCacheGet(ticksCache, optionTickInterval);

  if (result) {
    return result;
  }

  var ticks;
  var tickCategoryInterval; // Optimize for the case that large category data and no label displayed,
  // we should not return all ticks.

  if (!tickModel.get('show') || axis.scale.isBlank()) {
    ticks = [];
  }

  if (zrUtil.isFunction(optionTickInterval)) {
    ticks = makeLabelsByCustomizedCategoryInterval(axis, optionTickInterval, true);
  } // Always use label interval by default despite label show. Consider this
  // scenario, Use multiple grid with the xAxis sync, and only one xAxis shows
  // labels. `splitLine` and `axisTick` should be consistent in this case.
  else if (optionTickInterval === 'auto') {
      var labelsResult = makeCategoryLabelsActually(axis, axis.getLabelModel());
      tickCategoryInterval = labelsResult.labelCategoryInterval;
      ticks = zrUtil.map(labelsResult.labels, function (labelItem) {
        return labelItem.tickValue;
      });
    } else {
      tickCategoryInterval = optionTickInterval;
      ticks = makeLabelsByNumericCategoryInterval(axis, tickCategoryInterval, true);
    } // Cache to avoid calling interval function repeatly.


  return listCacheSet(ticksCache, optionTickInterval, {
    ticks: ticks,
    tickCategoryInterval: tickCategoryInterval
  });
}

function makeRealNumberLabels(axis) {
  var ticks = axis.scale.getTicks();
  var labelFormatter = makeLabelFormatter(axis);
  return {
    labels: zrUtil.map(ticks, function (tickValue, idx) {
      return {
        formattedLabel: labelFormatter(tickValue, idx),
        rawLabel: axis.scale.getLabel(tickValue),
        tickValue: tickValue
      };
    })
  };
} // Large category data calculation is performence sensitive, and ticks and label
// probably be fetched by multiple times. So we cache the result.
// axis is created each time during a ec process, so we do not need to clear cache.


function getListCache(axis, prop) {
  // Because key can be funciton, and cache size always be small, we use array cache.
  return inner(axis)[prop] || (inner(axis)[prop] = []);
}

function listCacheGet(cache, key) {
  for (var i = 0; i < cache.length; i++) {
    if (cache[i].key === key) {
      return cache[i].value;
    }
  }
}

function listCacheSet(cache, key, value) {
  cache.push({
    key: key,
    value: value
  });
  return value;
}

function makeAutoCategoryInterval(axis) {
  var result = inner(axis).autoInterval;
  return result != null ? result : inner(axis).autoInterval = axis.calculateCategoryInterval();
}
/**
 * Calculate interval for category axis ticks and labels.
 * To get precise result, at least one of `getRotate` and `isHorizontal`
 * should be implemented in axis.
 */


function calculateCategoryInterval(axis) {
  var params = fetchAutoCategoryIntervalCalculationParams(axis);
  var labelFormatter = makeLabelFormatter(axis);
  var rotation = (params.axisRotate - params.labelRotate) / 180 * Math.PI;
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent(); // Providing this method is for optimization:
  // avoid generating a long array by `getTicks`
  // in large category data case.

  var tickCount = ordinalScale.count();

  if (ordinalExtent[1] - ordinalExtent[0] < 1) {
    return 0;
  }

  var step = 1; // Simple optimization. Empirical value: tick count should less than 40.

  if (tickCount > 40) {
    step = Math.max(1, Math.floor(tickCount / 40));
  }

  var tickValue = ordinalExtent[0];
  var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
  var unitW = Math.abs(unitSpan * Math.cos(rotation));
  var unitH = Math.abs(unitSpan * Math.sin(rotation));
  var maxW = 0;
  var maxH = 0; // Caution: Performance sensitive for large category data.
  // Consider dataZoom, we should make appropriate step to avoid O(n) loop.

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    var width = 0;
    var height = 0; // Not precise, do not consider align and vertical align
    // and each distance from axis line yet.

    var rect = textContain.getBoundingRect(labelFormatter(tickValue), params.font, 'center', 'top'); // Magic number

    width = rect.width * 1.3;
    height = rect.height * 1.3; // Min size, void long loop.

    maxW = Math.max(maxW, width, 7);
    maxH = Math.max(maxH, height, 7);
  }

  var dw = maxW / unitW;
  var dh = maxH / unitH; // 0/0 is NaN, 1/0 is Infinity.

  isNaN(dw) && (dw = Infinity);
  isNaN(dh) && (dh = Infinity);
  var interval = Math.max(0, Math.floor(Math.min(dw, dh)));
  var cache = inner(axis.model);
  var axisExtent = axis.getExtent();
  var lastAutoInterval = cache.lastAutoInterval;
  var lastTickCount = cache.lastTickCount; // Use cache to keep interval stable while moving zoom window,
  // otherwise the calculated interval might jitter when the zoom
  // window size is close to the interval-changing size.
  // For example, if all of the axis labels are `a, b, c, d, e, f, g`.
  // The jitter will cause that sometimes the displayed labels are
  // `a, d, g` (interval: 2) sometimes `a, c, e`(interval: 1).

  if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 // Always choose the bigger one, otherwise the critical
  // point is not the same when zooming in or zooming out.
  && lastAutoInterval > interval // If the axis change is caused by chart resize, the cache should not
  // be used. Otherwise some hiden labels might not be shown again.
  && cache.axisExtend0 === axisExtent[0] && cache.axisExtend1 === axisExtent[1]) {
    interval = lastAutoInterval;
  } // Only update cache if cache not used, otherwise the
  // changing of interval is too insensitive.
  else {
      cache.lastTickCount = tickCount;
      cache.lastAutoInterval = interval;
      cache.axisExtend0 = axisExtent[0];
      cache.axisExtend1 = axisExtent[1];
    }

  return interval;
}

function fetchAutoCategoryIntervalCalculationParams(axis) {
  var labelModel = axis.getLabelModel();
  return {
    axisRotate: axis.getRotate ? axis.getRotate() : axis.isHorizontal && !axis.isHorizontal() ? 90 : 0,
    labelRotate: labelModel.get('rotate') || 0,
    font: labelModel.getFont()
  };
}

function makeLabelsByNumericCategoryInterval(axis, categoryInterval, onlyTick) {
  var labelFormatter = makeLabelFormatter(axis);
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var labelModel = axis.getLabelModel();
  var result = []; // TODO: axisType: ordinalTime, pick the tick from each month/day/year/...

  var step = Math.max((categoryInterval || 0) + 1, 1);
  var startTick = ordinalExtent[0];
  var tickCount = ordinalScale.count(); // Calculate start tick based on zero if possible to keep label consistent
  // while zooming and moving while interval > 0. Otherwise the selection
  // of displayable ticks and symbols probably keep changing.
  // 3 is empirical value.

  if (startTick !== 0 && step > 1 && tickCount / step > 2) {
    startTick = Math.round(Math.ceil(startTick / step) * step);
  } // (1) Only add min max label here but leave overlap checking
  // to render stage, which also ensure the returned list
  // suitable for splitLine and splitArea rendering.
  // (2) Scales except category always contain min max label so
  // do not need to perform this process.


  var showAllLabel = shouldShowAllLabels(axis);
  var includeMinLabel = labelModel.get('showMinLabel') || showAllLabel;
  var includeMaxLabel = labelModel.get('showMaxLabel') || showAllLabel;

  if (includeMinLabel && startTick !== ordinalExtent[0]) {
    addItem(ordinalExtent[0]);
  } // Optimize: avoid generating large array by `ordinalScale.getTicks()`.


  var tickValue = startTick;

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    addItem(tickValue);
  }

  if (includeMaxLabel && tickValue - step !== ordinalExtent[1]) {
    addItem(ordinalExtent[1]);
  }

  function addItem(tVal) {
    result.push(onlyTick ? tVal : {
      formattedLabel: labelFormatter(tVal),
      rawLabel: ordinalScale.getLabel(tVal),
      tickValue: tVal
    });
  }

  return result;
} // When interval is function, the result `false` means ignore the tick.
// It is time consuming for large category data.


function makeLabelsByCustomizedCategoryInterval(axis, categoryInterval, onlyTick) {
  var ordinalScale = axis.scale;
  var labelFormatter = makeLabelFormatter(axis);
  var result = [];
  zrUtil.each(ordinalScale.getTicks(), function (tickValue) {
    var rawLabel = ordinalScale.getLabel(tickValue);

    if (categoryInterval(tickValue, rawLabel)) {
      result.push(onlyTick ? tickValue : {
        formattedLabel: labelFormatter(tickValue),
        rawLabel: rawLabel,
        tickValue: tickValue
      });
    }
  });
  return result;
}

exports.createAxisLabels = createAxisLabels;
exports.createAxisTicks = createAxisTicks;
exports.calculateCategoryInterval = calculateCategoryInterval;

/***/ }),

/***/ "eaeb":
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
function dataToCoordSize(dataSize, dataItem) {
  // dataItem is necessary in log axis.
  return zrUtil.map(['Radius', 'Angle'], function (dim, dimIdx) {
    var axis = this['get' + dim + 'Axis']();
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var method = 'dataTo' + dim;
    var result = axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis[method](val - halfSize) - axis[method](val + halfSize));

    if (dim === 'Angle') {
      result = result * Math.PI / 180;
    }

    return result;
  }, this);
}

function _default(coordSys) {
  var radiusAxis = coordSys.getRadiusAxis();
  var angleAxis = coordSys.getAngleAxis();
  var radius = radiusAxis.getExtent();
  radius[0] > radius[1] && radius.reverse();
  return {
    coordSys: {
      type: 'polar',
      cx: coordSys.cx,
      cy: coordSys.cy,
      r: radius[1],
      r0: radius[0]
    },
    api: {
      coord: zrUtil.bind(function (data) {
        var radius = radiusAxis.dataToRadius(data[0]);
        var angle = angleAxis.dataToAngle(data[1]);
        var coord = coordSys.coordToPoint([radius, angle]);
        coord.push(radius, angle * Math.PI / 180);
        return coord;
      }),
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "ec02":
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

var Axis = __webpack_require__("84ce");

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
 * Extend axis 2d
 * @constructor module:echarts/coord/cartesian/Axis2D
 * @extends {module:echarts/coord/cartesian/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 * @param {string} position
 */
var Axis2D = function (dim, scale, coordExtent, axisType, position) {
  Axis.call(this, dim, scale, coordExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = axisType || 'value';
  /**
   * Axis position
   *  - 'top'
   *  - 'bottom'
   *  - 'left'
   *  - 'right'
   */

  this.position = position || 'bottom';
};

Axis2D.prototype = {
  constructor: Axis2D,

  /**
   * Index of axis, can be used as key
   */
  index: 0,

  /**
   * Implemented in <module:echarts/coord/cartesian/Grid>.
   * @return {Array.<module:echarts/coord/cartesian/Axis2D>}
   *         If not on zero of other axis, return null/undefined.
   *         If no axes, return an empty array.
   */
  getAxesOnZeroOf: null,

  /**
   * Axis model
   * @param {module:echarts/coord/cartesian/AxisModel}
   */
  model: null,
  isHorizontal: function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  },

  /**
   * Each item cooresponds to this.getExtent(), which
   * means globalExtent[0] may greater than globalExtent[1],
   * unless `asc` is input.
   *
   * @param {boolean} [asc]
   * @return {Array.<number>}
   */
  getGlobalExtent: function (asc) {
    var ret = this.getExtent();
    ret[0] = this.toGlobalCoord(ret[0]);
    ret[1] = this.toGlobalCoord(ret[1]);
    asc && ret[0] > ret[1] && ret.reverse();
    return ret;
  },
  getOtherAxis: function () {
    this.grid.getOtherAxis();
  },

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.coordToData(this.toLocalCoord(point[this.dim === 'x' ? 0 : 1]), clamp);
  },

  /**
   * Transform global coord to local coord,
   * i.e. var localCoord = axis.toLocalCoord(80);
   * designate by module:echarts/coord/cartesian/Grid.
   * @type {Function}
   */
  toLocalCoord: null,

  /**
   * Transform global coord to local coord,
   * i.e. var globalCoord = axis.toLocalCoord(40);
   * designate by module:echarts/coord/cartesian/Grid.
   * @type {Function}
   */
  toGlobalCoord: null
};
zrUtil.inherits(Axis2D, Axis);
var _default = Axis2D;
module.exports = _default;

/***/ }),

/***/ "ec34":
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

var createHashMap = _util.createHashMap;
var isString = _util.isString;
var isArray = _util.isArray;
var each = _util.each;
var assert = _util.assert;

var _parseSVG = __webpack_require__("3041");

var parseXML = _parseSVG.parseXML;

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
var storage = createHashMap(); // For minimize the code size of common echarts package,
// do not put too much logic in this module.

var _default = {
  // The format of record: see `echarts.registerMap`.
  // Compatible with previous `echarts.registerMap`.
  registerMap: function (mapName, rawGeoJson, rawSpecialAreas) {
    var records;

    if (isArray(rawGeoJson)) {
      records = rawGeoJson;
    } else if (rawGeoJson.svg) {
      records = [{
        type: 'svg',
        source: rawGeoJson.svg,
        specialAreas: rawGeoJson.specialAreas
      }];
    } else {
      // Backward compatibility.
      if (rawGeoJson.geoJson && !rawGeoJson.features) {
        rawSpecialAreas = rawGeoJson.specialAreas;
        rawGeoJson = rawGeoJson.geoJson;
      }

      records = [{
        type: 'geoJSON',
        source: rawGeoJson,
        specialAreas: rawSpecialAreas
      }];
    }

    each(records, function (record) {
      var type = record.type;
      type === 'geoJson' && (type = record.type = 'geoJSON');
      var parse = parsers[type];
      parse(record);
    });
    return storage.set(mapName, records);
  },
  retrieveMap: function (mapName) {
    return storage.get(mapName);
  }
};
var parsers = {
  geoJSON: function (record) {
    var source = record.source;
    record.geoJSON = !isString(source) ? source : typeof JSON !== 'undefined' && JSON.parse ? JSON.parse(source) : new Function('return (' + source + ');')();
  },
  // Only perform parse to XML object here, which might be time
  // consiming for large SVG.
  // Although convert XML to zrender element is also time consiming,
  // if we do it here, the clone of zrender elements has to be
  // required. So we do it once for each geo instance, util real
  // performance issues call for optimizing it.
  svg: function (record) {
    record.svgXML = parseXML(record.source);
  }
};
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

/***/ "edb9":
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
 * @param {Object} opt {labelInside}
 * @return {Object} {
 *  position, rotation, labelDirection, labelOffset,
 *  tickDirection, labelRotate, z2
 * }
 */
function layout(axisModel, opt) {
  opt = opt || {};
  var single = axisModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout = {};
  var axisPosition = axis.position;
  var orient = axis.orient;
  var rect = single.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var positionMap = {
    horizontal: {
      top: rectBound[2],
      bottom: rectBound[3]
    },
    vertical: {
      left: rectBound[0],
      right: rectBound[1]
    }
  };
  layout.position = [orient === 'vertical' ? positionMap.vertical[axisPosition] : rectBound[0], orient === 'horizontal' ? positionMap.horizontal[axisPosition] : rectBound[3]];
  var r = {
    horizontal: 0,
    vertical: 1
  };
  layout.rotation = Math.PI / 2 * r[orient];
  var directionMap = {
    top: -1,
    bottom: 1,
    right: 1,
    left: -1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = directionMap[axisPosition];

  if (axisModel.get('axisTick.inside')) {
    layout.tickDirection = -layout.tickDirection;
  }

  if (zrUtil.retrieve(opt.labelInside, axisModel.get('axisLabel.inside'))) {
    layout.labelDirection = -layout.labelDirection;
  }

  var labelRotation = opt.rotate;
  labelRotation == null && (labelRotation = axisModel.get('axisLabel.rotate'));
  layout.labelRotation = axisPosition === 'top' ? -labelRotation : labelRotation;
  layout.z2 = 1;
  return layout;
}

exports.layout = layout;

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

/***/ }),

/***/ "eeea":
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

var echarts = __webpack_require__("3eba");

var zrUtil = __webpack_require__("6d8b");

var Geo = __webpack_require__("0141");

var layout = __webpack_require__("f934");

var numberUtil = __webpack_require__("3842");

var geoSourceManager = __webpack_require__("5b87");

var mapDataStorage = __webpack_require__("ec34");

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
 * Resize method bound to the geo
 * @param {module:echarts/coord/geo/GeoModel|module:echarts/chart/map/MapModel} geoModel
 * @param {module:echarts/ExtensionAPI} api
 */
function resizeGeo(geoModel, api) {
  var boundingCoords = geoModel.get('boundingCoords');

  if (boundingCoords != null) {
    var leftTop = boundingCoords[0];
    var rightBottom = boundingCoords[1];

    if (isNaN(leftTop[0]) || isNaN(leftTop[1]) || isNaN(rightBottom[0]) || isNaN(rightBottom[1])) {} else {
      this.setBoundingRect(leftTop[0], leftTop[1], rightBottom[0] - leftTop[0], rightBottom[1] - leftTop[1]);
    }
  }

  var rect = this.getBoundingRect();
  var boxLayoutOption;
  var center = geoModel.get('layoutCenter');
  var size = geoModel.get('layoutSize');
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  var aspect = rect.width / rect.height * this.aspectScale;
  var useCenterAndSize = false;

  if (center && size) {
    center = [numberUtil.parsePercent(center[0], viewWidth), numberUtil.parsePercent(center[1], viewHeight)];
    size = numberUtil.parsePercent(size, Math.min(viewWidth, viewHeight));

    if (!isNaN(center[0]) && !isNaN(center[1]) && !isNaN(size)) {
      useCenterAndSize = true;
    } else {}
  }

  var viewRect;

  if (useCenterAndSize) {
    var viewRect = {};

    if (aspect > 1) {
      // Width is same with size
      viewRect.width = size;
      viewRect.height = size / aspect;
    } else {
      viewRect.height = size;
      viewRect.width = size * aspect;
    }

    viewRect.y = center[1] - viewRect.height / 2;
    viewRect.x = center[0] - viewRect.width / 2;
  } else {
    // Use left/top/width/height
    boxLayoutOption = geoModel.getBoxLayoutParams(); // 0.75 rate

    boxLayoutOption.aspect = aspect;
    viewRect = layout.getLayoutRect(boxLayoutOption, {
      width: viewWidth,
      height: viewHeight
    });
  }

  this.setViewRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
  this.setCenter(geoModel.get('center'));
  this.setZoom(geoModel.get('zoom'));
}
/**
 * @param {module:echarts/coord/Geo} geo
 * @param {module:echarts/model/Model} model
 * @inner
 */


function setGeoCoords(geo, model) {
  zrUtil.each(model.get('geoCoord'), function (geoCoord, name) {
    geo.addGeoCoord(name, geoCoord);
  });
}

var geoCreator = {
  // For deciding which dimensions to use when creating list data
  dimensions: Geo.prototype.dimensions,
  create: function (ecModel, api) {
    var geoList = []; // FIXME Create each time may be slow

    ecModel.eachComponent('geo', function (geoModel, idx) {
      var name = geoModel.get('map');
      var aspectScale = geoModel.get('aspectScale');
      var invertLongitute = true;
      var mapRecords = mapDataStorage.retrieveMap(name);

      if (mapRecords && mapRecords[0] && mapRecords[0].type === 'svg') {
        aspectScale == null && (aspectScale = 1);
        invertLongitute = false;
      } else {
        aspectScale == null && (aspectScale = 0.75);
      }

      var geo = new Geo(name + idx, name, geoModel.get('nameMap'), invertLongitute);
      geo.aspectScale = aspectScale;
      geo.zoomLimit = geoModel.get('scaleLimit');
      geoList.push(geo);
      setGeoCoords(geo, geoModel);
      geoModel.coordinateSystem = geo;
      geo.model = geoModel; // Inject resize method

      geo.resize = resizeGeo;
      geo.resize(geoModel, api);
    });
    ecModel.eachSeries(function (seriesModel) {
      var coordSys = seriesModel.get('coordinateSystem');

      if (coordSys === 'geo') {
        var geoIndex = seriesModel.get('geoIndex') || 0;
        seriesModel.coordinateSystem = geoList[geoIndex];
      }
    }); // If has map series

    var mapModelGroupBySeries = {};
    ecModel.eachSeriesByType('map', function (seriesModel) {
      if (!seriesModel.getHostGeoModel()) {
        var mapType = seriesModel.getMapType();
        mapModelGroupBySeries[mapType] = mapModelGroupBySeries[mapType] || [];
        mapModelGroupBySeries[mapType].push(seriesModel);
      }
    });
    zrUtil.each(mapModelGroupBySeries, function (mapSeries, mapType) {
      var nameMapList = zrUtil.map(mapSeries, function (singleMapSeries) {
        return singleMapSeries.get('nameMap');
      });
      var geo = new Geo(mapType, mapType, zrUtil.mergeAll(nameMapList));
      geo.zoomLimit = zrUtil.retrieve.apply(null, zrUtil.map(mapSeries, function (singleMapSeries) {
        return singleMapSeries.get('scaleLimit');
      }));
      geoList.push(geo); // Inject resize method

      geo.resize = resizeGeo;
      geo.aspectScale = mapSeries[0].get('aspectScale');
      geo.resize(mapSeries[0], api);
      zrUtil.each(mapSeries, function (singleMapSeries) {
        singleMapSeries.coordinateSystem = geo;
        setGeoCoords(geo, singleMapSeries);
      });
    });
    return geoList;
  },

  /**
   * Fill given regions array
   * @param  {Array.<Object>} originRegionArr
   * @param  {string} mapName
   * @param  {Object} [nameMap]
   * @return {Array}
   */
  getFilledRegions: function (originRegionArr, mapName, nameMap) {
    // Not use the original
    var regionsArr = (originRegionArr || []).slice();
    var dataNameMap = zrUtil.createHashMap();

    for (var i = 0; i < regionsArr.length; i++) {
      dataNameMap.set(regionsArr[i].name, regionsArr[i]);
    }

    var source = geoSourceManager.load(mapName, nameMap);
    zrUtil.each(source.regions, function (region) {
      var name = region.name;
      !dataNameMap.get(name) && regionsArr.push({
        name: name
      });
    });
    return regionsArr;
  }
};
echarts.registerCoordinateSystem('geo', geoCreator);
var _default = geoCreator;
module.exports = _default;

/***/ }),

/***/ "f279":
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

var BoundingRect = __webpack_require__("9850");

var bbox = __webpack_require__("e263");

var vec2 = __webpack_require__("401b");

var polygonContain = __webpack_require__("0655");

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
 * @module echarts/coord/geo/Region
 */

/**
 * @param {string|Region} name
 * @param {Array} geometries
 * @param {Array.<number>} cp
 */
function Region(name, geometries, cp) {
  /**
   * @type {string}
   * @readOnly
   */
  this.name = name;
  /**
   * @type {Array.<Array>}
   * @readOnly
   */

  this.geometries = geometries;

  if (!cp) {
    var rect = this.getBoundingRect();
    cp = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  } else {
    cp = [cp[0], cp[1]];
  }
  /**
   * @type {Array.<number>}
   */


  this.center = cp;
}

Region.prototype = {
  constructor: Region,
  properties: null,

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getBoundingRect: function () {
    var rect = this._rect;

    if (rect) {
      return rect;
    }

    var MAX_NUMBER = Number.MAX_VALUE;
    var min = [MAX_NUMBER, MAX_NUMBER];
    var max = [-MAX_NUMBER, -MAX_NUMBER];
    var min2 = [];
    var max2 = [];
    var geometries = this.geometries;

    for (var i = 0; i < geometries.length; i++) {
      // Only support polygon
      if (geometries[i].type !== 'polygon') {
        continue;
      } // Doesn't consider hole


      var exterior = geometries[i].exterior;
      bbox.fromPoints(exterior, min2, max2);
      vec2.min(min, min, min2);
      vec2.max(max, max, max2);
    } // No data


    if (i === 0) {
      min[0] = min[1] = max[0] = max[1] = 0;
    }

    return this._rect = new BoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  },

  /**
   * @param {<Array.<number>} coord
   * @return {boolean}
   */
  contain: function (coord) {
    var rect = this.getBoundingRect();
    var geometries = this.geometries;

    if (!rect.contain(coord[0], coord[1])) {
      return false;
    }

    loopGeo: for (var i = 0, len = geometries.length; i < len; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      if (polygonContain.contain(exterior, coord[0], coord[1])) {
        // Not in the region if point is in the hole.
        for (var k = 0; k < (interiors ? interiors.length : 0); k++) {
          if (polygonContain.contain(interiors[k])) {
            continue loopGeo;
          }
        }

        return true;
      }
    }

    return false;
  },
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var aspect = rect.width / rect.height;

    if (!width) {
      width = aspect * height;
    } else if (!height) {
      height = width / aspect;
    }

    var target = new BoundingRect(x, y, width, height);
    var transform = rect.calculateTransform(target);
    var geometries = this.geometries;

    for (var i = 0; i < geometries.length; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      for (var p = 0; p < exterior.length; p++) {
        vec2.applyTransform(exterior[p], exterior[p], transform);
      }

      for (var h = 0; h < (interiors ? interiors.length : 0); h++) {
        for (var p = 0; p < interiors[h].length; p++) {
          vec2.applyTransform(interiors[h][p], interiors[h][p], transform);
        }
      }
    }

    rect = this._rect;
    rect.copy(target); // Update center

    this.center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  },
  cloneShallow: function (name) {
    name == null && (name = this.name);
    var newRegion = new Region(name, this.geometries, this.center);
    newRegion._rect = this._rect;
    newRegion.transformTo = null; // Simply avoid to be called.

    return newRegion;
  }
};
var _default = Region;
module.exports = _default;

/***/ }),

/***/ "fd27":
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

var RadiusAxis = __webpack_require__("9273");

var AngleAxis = __webpack_require__("a991");

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
 * @module echarts/coord/polar/Polar
 */

/**
 * @alias {module:echarts/coord/polar/Polar}
 * @constructor
 * @param {string} name
 */
var Polar = function (name) {
  /**
   * @type {string}
   */
  this.name = name || '';
  /**
   * x of polar center
   * @type {number}
   */

  this.cx = 0;
  /**
   * y of polar center
   * @type {number}
   */

  this.cy = 0;
  /**
   * @type {module:echarts/coord/polar/RadiusAxis}
   * @private
   */

  this._radiusAxis = new RadiusAxis();
  /**
   * @type {module:echarts/coord/polar/AngleAxis}
   * @private
   */

  this._angleAxis = new AngleAxis();
  this._radiusAxis.polar = this._angleAxis.polar = this;
};

Polar.prototype = {
  type: 'polar',
  axisPointerEnabled: true,
  constructor: Polar,

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['radius', 'angle'],

  /**
   * @type {module:echarts/coord/PolarModel}
   */
  model: null,

  /**
   * If contain coord
   * @param {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var coord = this.pointToCoord(point);
    return this._radiusAxis.contain(coord[0]) && this._angleAxis.contain(coord[1]);
  },

  /**
   * If contain data
   * @param {Array.<number>} data
   * @return {boolean}
   */
  containData: function (data) {
    return this._radiusAxis.containData(data[0]) && this._angleAxis.containData(data[1]);
  },

  /**
   * @param {string} dim
   * @return {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  getAxis: function (dim) {
    return this['_' + dim + 'Axis'];
  },

  /**
   * @return {Array.<module:echarts/coord/Axis>}
   */
  getAxes: function () {
    return [this._radiusAxis, this._angleAxis];
  },

  /**
   * Get axes by type of scale
   * @param {string} scaleType
   * @return {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  getAxesByScale: function (scaleType) {
    var axes = [];
    var angleAxis = this._angleAxis;
    var radiusAxis = this._radiusAxis;
    angleAxis.scale.type === scaleType && axes.push(angleAxis);
    radiusAxis.scale.type === scaleType && axes.push(radiusAxis);
    return axes;
  },

  /**
   * @return {module:echarts/coord/polar/AngleAxis}
   */
  getAngleAxis: function () {
    return this._angleAxis;
  },

  /**
   * @return {module:echarts/coord/polar/RadiusAxis}
   */
  getRadiusAxis: function () {
    return this._radiusAxis;
  },

  /**
   * @param {module:echarts/coord/polar/Axis}
   * @return {module:echarts/coord/polar/Axis}
   */
  getOtherAxis: function (axis) {
    var angleAxis = this._angleAxis;
    return axis === angleAxis ? this._radiusAxis : angleAxis;
  },

  /**
   * Base axis will be used on stacking.
   *
   * @return {module:echarts/coord/polar/Axis}
   */
  getBaseAxis: function () {
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAngleAxis();
  },

  /**
   * @param {string} [dim] 'radius' or 'angle' or 'auto' or null/undefined
   * @return {Object} {baseAxes: [], otherAxes: []}
   */
  getTooltipAxes: function (dim) {
    var baseAxis = dim != null && dim !== 'auto' ? this.getAxis(dim) : this.getBaseAxis();
    return {
      baseAxes: [baseAxis],
      otherAxes: [this.getOtherAxis(baseAxis)]
    };
  },

  /**
   * Convert a single data item to (x, y) point.
   * Parameter data is an array which the first element is radius and the second is angle
   * @param {Array.<number>} data
   * @param {boolean} [clamp=false]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, clamp) {
    return this.coordToPoint([this._radiusAxis.dataToRadius(data[0], clamp), this._angleAxis.dataToAngle(data[1], clamp)]);
  },

  /**
   * Convert a (x, y) point to data
   * @param {Array.<number>} point
   * @param {boolean} [clamp=false]
   * @return {Array.<number>}
   */
  pointToData: function (point, clamp) {
    var coord = this.pointToCoord(point);
    return [this._radiusAxis.radiusToData(coord[0], clamp), this._angleAxis.angleToData(coord[1], clamp)];
  },

  /**
   * Convert a (x, y) point to (radius, angle) coord
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToCoord: function (point) {
    var dx = point[0] - this.cx;
    var dy = point[1] - this.cy;
    var angleAxis = this.getAngleAxis();
    var extent = angleAxis.getExtent();
    var minAngle = Math.min(extent[0], extent[1]);
    var maxAngle = Math.max(extent[0], extent[1]); // Fix fixed extent in polarCreator
    // FIXME

    angleAxis.inverse ? minAngle = maxAngle - 360 : maxAngle = minAngle + 360;
    var radius = Math.sqrt(dx * dx + dy * dy);
    dx /= radius;
    dy /= radius;
    var radian = Math.atan2(-dy, dx) / Math.PI * 180; // move to angleExtent

    var dir = radian < minAngle ? 1 : -1;

    while (radian < minAngle || radian > maxAngle) {
      radian += dir * 360;
    }

    return [radius, radian];
  },

  /**
   * Convert a (radius, angle) coord to (x, y) point
   * @param {Array.<number>} coord
   * @return {Array.<number>}
   */
  coordToPoint: function (coord) {
    var radius = coord[0];
    var radian = coord[1] / 180 * Math.PI;
    var x = Math.cos(radian) * radius + this.cx; // Inverse the y

    var y = -Math.sin(radian) * radius + this.cy;
    return [x, y];
  },

  /**
   * Get ring area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   * @return {Ring}
   */
  getArea: function () {
    var angleAxis = this.getAngleAxis();
    var radiusAxis = this.getRadiusAxis();
    var radiusExtent = radiusAxis.getExtent().slice();
    radiusExtent[0] > radiusExtent[1] && radiusExtent.reverse();
    var angleExtent = angleAxis.getExtent();
    var RADIAN = Math.PI / 180;
    return {
      cx: this.cx,
      cy: this.cy,
      r0: radiusExtent[0],
      r: radiusExtent[1],
      startAngle: -angleExtent[0] * RADIAN,
      endAngle: -angleExtent[1] * RADIAN,
      clockwise: angleAxis.inverse,
      contain: function (x, y) {
        // It's a ring shape.
        // Start angle and end angle don't matter
        var dx = x - this.cx;
        var dy = y - this.cy;
        var d2 = dx * dx + dy * dy;
        var r = this.r;
        var r0 = this.r0;
        return d2 <= r * r && d2 >= r0 * r0;
      }
    };
  }
};
var _default = Polar;
module.exports = _default;

/***/ })

}]);