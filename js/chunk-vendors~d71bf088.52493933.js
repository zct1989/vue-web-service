(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~d71bf088"],{

/***/ "2163":
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

var SeriesModel = __webpack_require__("4f85");

var Tree = __webpack_require__("06c7");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

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
var _default = SeriesModel.extend({
  type: 'series.tree',
  layoutInfo: null,
  // can support the position parameters 'left', 'top','right','bottom', 'width',
  // 'height' in the setOption() with 'merge' mode normal.
  layoutMode: 'box',

  /**
   * Init a tree data structure from data in option series
   * @param  {Object} option  the object used to config echarts view
   * @return {module:echarts/data/List} storage initial data
   */
  getInitialData: function (option) {
    //create an virtual root
    var root = {
      name: option.name,
      children: option.data
    };
    var leaves = option.leaves || {};
    var treeOption = {};
    treeOption.leaves = leaves;
    var tree = Tree.createTree(root, this, treeOption, beforeLink);

    function beforeLink(nodeData) {
      nodeData.wrapMethod('getItemModel', function (model, idx) {
        var node = tree.getNodeByDataIndex(idx);
        var leavesModel = node.getLeavesModel();

        if (!node.children.length || !node.isExpand) {
          model.parentModel = leavesModel;
        }

        return model;
      });
    }

    var treeDepth = 0;
    tree.eachNode('preorder', function (node) {
      if (node.depth > treeDepth) {
        treeDepth = node.depth;
      }
    });
    var expandAndCollapse = option.expandAndCollapse;
    var expandTreeDepth = expandAndCollapse && option.initialTreeDepth >= 0 ? option.initialTreeDepth : treeDepth;
    tree.root.eachNode('preorder', function (node) {
      var item = node.hostTree.data.getRawDataItem(node.dataIndex); // Add item.collapsed != null, because users can collapse node original in the series.data.

      node.isExpand = item && item.collapsed != null ? !item.collapsed : node.depth <= expandTreeDepth;
    });
    return tree.data;
  },

  /**
   * Make the configuration 'orient' backward compatibly, with 'horizontal = LR', 'vertical = TB'.
   * @returns {string} orient
   */
  getOrient: function () {
    var orient = this.get('orient');

    if (orient === 'horizontal') {
      orient = 'LR';
    } else if (orient === 'vertical') {
      orient = 'TB';
    }

    return orient;
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  },

  /**
   * @override
   * @param {number} dataIndex
   */
  formatTooltip: function (dataIndex) {
    var tree = this.getData().tree;
    var realRoot = tree.root.children[0];
    var node = tree.getNodeByDataIndex(dataIndex);
    var value = node.getValue();
    var name = node.name;

    while (node && node !== realRoot) {
      name = node.parentNode.name + '.' + name;
      node = node.parentNode;
    }

    return encodeHTML(name + (isNaN(value) || value == null ? '' : ' : ' + value));
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'view',
    // the position of the whole view
    left: '12%',
    top: '12%',
    right: '12%',
    bottom: '12%',
    // the layout of the tree, two value can be selected, 'orthogonal' or 'radial'
    layout: 'orthogonal',
    // true | false | 'move' | 'scale', see module:component/helper/RoamController.
    roam: false,
    // Symbol size scale ratio in roam
    nodeScaleRatio: 0.4,
    // Default on center of graph
    center: null,
    zoom: 1,
    // The orient of orthoginal layout, can be setted to 'LR', 'TB', 'RL', 'BT'.
    // and the backward compatibility configuration 'horizontal = LR', 'vertical = TB'.
    orient: 'LR',
    symbol: 'emptyCircle',
    symbolSize: 7,
    expandAndCollapse: true,
    initialTreeDepth: 2,
    lineStyle: {
      color: '#ccc',
      width: 1.5,
      curveness: 0.5
    },
    itemStyle: {
      color: 'lightsteelblue',
      borderColor: '#c23531',
      borderWidth: 1.5
    },
    label: {
      show: true,
      color: '#555'
    },
    leaves: {
      label: {
        show: true
      }
    },
    animationEasing: 'linear',
    animationDuration: 700,
    animationDurationUpdate: 1000
  }
});

module.exports = _default;

/***/ }),

/***/ "22da":
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

var layout = __webpack_require__("f934");

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
* A third-party license is embeded for some of the code in this file:
* The tree layoutHelper implementation was originally copied from
* "d3.js"(https://github.com/d3/d3-hierarchy) with
* some modifications made for this project.
* (see more details in the comment of the specific method below.)
* The use of the source code of this file is also subject to the terms
* and consitions of the licence of "d3.js" (BSD-3Clause, see
* </licenses/LICENSE-d3>).
*/

/**
 * @file The layout algorithm of node-link tree diagrams. Here we using Reingold-Tilford algorithm to drawing
 *       the tree.
 */

/**
 * Initialize all computational message for following algorithm.
 *
 * @param  {module:echarts/data/Tree~TreeNode} root   The virtual root of the tree.
 */
function init(root) {
  root.hierNode = {
    defaultAncestor: null,
    ancestor: root,
    prelim: 0,
    modifier: 0,
    change: 0,
    shift: 0,
    i: 0,
    thread: null
  };
  var nodes = [root];
  var node;
  var children;

  while (node = nodes.pop()) {
    // jshint ignore:line
    children = node.children;

    if (node.isExpand && children.length) {
      var n = children.length;

      for (var i = n - 1; i >= 0; i--) {
        var child = children[i];
        child.hierNode = {
          defaultAncestor: null,
          ancestor: child,
          prelim: 0,
          modifier: 0,
          change: 0,
          shift: 0,
          i: i,
          thread: null
        };
        nodes.push(child);
      }
    }
  }
}
/**
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * Computes a preliminary x coordinate for node. Before that, this function is
 * applied recursively to the children of node, as well as the function
 * apportion(). After spacing out the children by calling executeShifts(), the
 * node is placed to the midpoint of its outermost children.
 *
 * @param  {module:echarts/data/Tree~TreeNode} node
 * @param {Function} separation
 */


function firstWalk(node, separation) {
  var children = node.isExpand ? node.children : [];
  var siblings = node.parentNode.children;
  var subtreeW = node.hierNode.i ? siblings[node.hierNode.i - 1] : null;

  if (children.length) {
    executeShifts(node);
    var midPoint = (children[0].hierNode.prelim + children[children.length - 1].hierNode.prelim) / 2;

    if (subtreeW) {
      node.hierNode.prelim = subtreeW.hierNode.prelim + separation(node, subtreeW);
      node.hierNode.modifier = node.hierNode.prelim - midPoint;
    } else {
      node.hierNode.prelim = midPoint;
    }
  } else if (subtreeW) {
    node.hierNode.prelim = subtreeW.hierNode.prelim + separation(node, subtreeW);
  }

  node.parentNode.hierNode.defaultAncestor = apportion(node, subtreeW, node.parentNode.hierNode.defaultAncestor || siblings[0], separation);
}
/**
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * Computes all real x-coordinates by summing up the modifiers recursively.
 *
 * @param  {module:echarts/data/Tree~TreeNode} node
 */


function secondWalk(node) {
  var nodeX = node.hierNode.prelim + node.parentNode.hierNode.modifier;
  node.setLayout({
    x: nodeX
  }, true);
  node.hierNode.modifier += node.parentNode.hierNode.modifier;
}

function separation(cb) {
  return arguments.length ? cb : defaultSeparation;
}
/**
 * Transform the common coordinate to radial coordinate.
 *
 * @param  {number} x
 * @param  {number} y
 * @return {Object}
 */


function radialCoordinate(x, y) {
  var radialCoor = {};
  x -= Math.PI / 2;
  radialCoor.x = y * Math.cos(x);
  radialCoor.y = y * Math.sin(x);
  return radialCoor;
}
/**
 * Get the layout position of the whole view.
 *
 * @param {module:echarts/model/Series} seriesModel  the model object of sankey series
 * @param {module:echarts/ExtensionAPI} api  provide the API list that the developer can call
 * @return {module:zrender/core/BoundingRect}  size of rect to draw the sankey view
 */


function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}
/**
 * All other shifts, applied to the smaller subtrees between w- and w+, are
 * performed by this function.
 *
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * @param  {module:echarts/data/Tree~TreeNode} node
 */


function executeShifts(node) {
  var children = node.children;
  var n = children.length;
  var shift = 0;
  var change = 0;

  while (--n >= 0) {
    var child = children[n];
    child.hierNode.prelim += shift;
    child.hierNode.modifier += shift;
    change += child.hierNode.change;
    shift += child.hierNode.shift + change;
  }
}
/**
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * The core of the algorithm. Here, a new subtree is combined with the
 * previous subtrees. Threads are used to traverse the inside and outside
 * contours of the left and right subtree up to the highest common level.
 * Whenever two nodes of the inside contours conflict, we compute the left
 * one of the greatest uncommon ancestors using the function nextAncestor()
 * and call moveSubtree() to shift the subtree and prepare the shifts of
 * smaller subtrees. Finally, we add a new thread (if necessary).
 *
 * @param  {module:echarts/data/Tree~TreeNode} subtreeV
 * @param  {module:echarts/data/Tree~TreeNode} subtreeW
 * @param  {module:echarts/data/Tree~TreeNode} ancestor
 * @param  {Function} separation
 * @return {module:echarts/data/Tree~TreeNode}
 */


function apportion(subtreeV, subtreeW, ancestor, separation) {
  if (subtreeW) {
    var nodeOutRight = subtreeV;
    var nodeInRight = subtreeV;
    var nodeOutLeft = nodeInRight.parentNode.children[0];
    var nodeInLeft = subtreeW;
    var sumOutRight = nodeOutRight.hierNode.modifier;
    var sumInRight = nodeInRight.hierNode.modifier;
    var sumOutLeft = nodeOutLeft.hierNode.modifier;
    var sumInLeft = nodeInLeft.hierNode.modifier;

    while (nodeInLeft = nextRight(nodeInLeft), nodeInRight = nextLeft(nodeInRight), nodeInLeft && nodeInRight) {
      nodeOutRight = nextRight(nodeOutRight);
      nodeOutLeft = nextLeft(nodeOutLeft);
      nodeOutRight.hierNode.ancestor = subtreeV;
      var shift = nodeInLeft.hierNode.prelim + sumInLeft - nodeInRight.hierNode.prelim - sumInRight + separation(nodeInLeft, nodeInRight);

      if (shift > 0) {
        moveSubtree(nextAncestor(nodeInLeft, subtreeV, ancestor), subtreeV, shift);
        sumInRight += shift;
        sumOutRight += shift;
      }

      sumInLeft += nodeInLeft.hierNode.modifier;
      sumInRight += nodeInRight.hierNode.modifier;
      sumOutRight += nodeOutRight.hierNode.modifier;
      sumOutLeft += nodeOutLeft.hierNode.modifier;
    }

    if (nodeInLeft && !nextRight(nodeOutRight)) {
      nodeOutRight.hierNode.thread = nodeInLeft;
      nodeOutRight.hierNode.modifier += sumInLeft - sumOutRight;
    }

    if (nodeInRight && !nextLeft(nodeOutLeft)) {
      nodeOutLeft.hierNode.thread = nodeInRight;
      nodeOutLeft.hierNode.modifier += sumInRight - sumOutLeft;
      ancestor = subtreeV;
    }
  }

  return ancestor;
}
/**
 * This function is used to traverse the right contour of a subtree.
 * It returns the rightmost child of node or the thread of node. The function
 * returns null if and only if node is on the highest depth of its subtree.
 *
 * @param  {module:echarts/data/Tree~TreeNode} node
 * @return {module:echarts/data/Tree~TreeNode}
 */


function nextRight(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[children.length - 1] : node.hierNode.thread;
}
/**
 * This function is used to traverse the left contour of a subtree (or a subforest).
 * It returns the leftmost child of node or the thread of node. The function
 * returns null if and only if node is on the highest depth of its subtree.
 *
 * @param  {module:echarts/data/Tree~TreeNode} node
 * @return {module:echarts/data/Tree~TreeNode}
 */


function nextLeft(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[0] : node.hierNode.thread;
}
/**
 * If nodeInLeft’s ancestor is a sibling of node, returns nodeInLeft’s ancestor.
 * Otherwise, returns the specified ancestor.
 *
 * @param  {module:echarts/data/Tree~TreeNode} nodeInLeft
 * @param  {module:echarts/data/Tree~TreeNode} node
 * @param  {module:echarts/data/Tree~TreeNode} ancestor
 * @return {module:echarts/data/Tree~TreeNode}
 */


function nextAncestor(nodeInLeft, node, ancestor) {
  return nodeInLeft.hierNode.ancestor.parentNode === node.parentNode ? nodeInLeft.hierNode.ancestor : ancestor;
}
/**
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * Shifts the current subtree rooted at wr.
 * This is done by increasing prelim(w+) and modifier(w+) by shift.
 *
 * @param  {module:echarts/data/Tree~TreeNode} wl
 * @param  {module:echarts/data/Tree~TreeNode} wr
 * @param  {number} shift [description]
 */


function moveSubtree(wl, wr, shift) {
  var change = shift / (wr.hierNode.i - wl.hierNode.i);
  wr.hierNode.change -= change;
  wr.hierNode.shift += shift;
  wr.hierNode.modifier += shift;
  wr.hierNode.prelim += shift;
  wl.hierNode.change += change;
}
/**
 * The implementation of this function was originally copied from "d3.js"
 * <https://github.com/d3/d3-hierarchy/blob/4c1f038f2725d6eae2e49b61d01456400694bac4/src/tree.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 */


function defaultSeparation(node1, node2) {
  return node1.parentNode === node2.parentNode ? 1 : 2;
}

exports.init = init;
exports.firstWalk = firstWalk;
exports.secondWalk = secondWalk;
exports.separation = separation;
exports.radialCoordinate = radialCoordinate;
exports.getViewRect = getViewRect;

/***/ }),

/***/ "255c":
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

var _poly = __webpack_require__("d4d1");

var Polygon = _poly.Polygon;

var graphic = __webpack_require__("2306");

var _util = __webpack_require__("6d8b");

var bind = _util.bind;
var extend = _util.extend;

var DataDiffer = __webpack_require__("80f0");

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
var _default = echarts.extendChartView({
  type: 'themeRiver',
  init: function () {
    this._layers = [];
  },
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var group = this.group;
    var layerSeries = seriesModel.getLayerSeries();
    var layoutInfo = data.getLayout('layoutInfo');
    var rect = layoutInfo.rect;
    var boundaryGap = layoutInfo.boundaryGap;
    group.attr('position', [0, rect.y + boundaryGap[0]]);

    function keyGetter(item) {
      return item.name;
    }

    var dataDiffer = new DataDiffer(this._layersSeries || [], layerSeries, keyGetter, keyGetter);
    var newLayersGroups = {};
    dataDiffer.add(bind(process, this, 'add')).update(bind(process, this, 'update')).remove(bind(process, this, 'remove')).execute();

    function process(status, idx, oldIdx) {
      var oldLayersGroups = this._layers;

      if (status === 'remove') {
        group.remove(oldLayersGroups[idx]);
        return;
      }

      var points0 = [];
      var points1 = [];
      var color;
      var indices = layerSeries[idx].indices;

      for (var j = 0; j < indices.length; j++) {
        var layout = data.getItemLayout(indices[j]);
        var x = layout.x;
        var y0 = layout.y0;
        var y = layout.y;
        points0.push([x, y0]);
        points1.push([x, y0 + y]);
        color = data.getItemVisual(indices[j], 'color');
      }

      var polygon;
      var text;
      var textLayout = data.getItemLayout(indices[0]);
      var itemModel = data.getItemModel(indices[j - 1]);
      var labelModel = itemModel.getModel('label');
      var margin = labelModel.get('margin');

      if (status === 'add') {
        var layerGroup = newLayersGroups[idx] = new graphic.Group();
        polygon = new Polygon({
          shape: {
            points: points0,
            stackedOnPoints: points1,
            smooth: 0.4,
            stackedOnSmooth: 0.4,
            smoothConstraint: false
          },
          z2: 0
        });
        text = new graphic.Text({
          style: {
            x: textLayout.x - margin,
            y: textLayout.y0 + textLayout.y / 2
          }
        });
        layerGroup.add(polygon);
        layerGroup.add(text);
        group.add(layerGroup);
        polygon.setClipPath(createGridClipShape(polygon.getBoundingRect(), seriesModel, function () {
          polygon.removeClipPath();
        }));
      } else {
        var layerGroup = oldLayersGroups[oldIdx];
        polygon = layerGroup.childAt(0);
        text = layerGroup.childAt(1);
        group.add(layerGroup);
        newLayersGroups[idx] = layerGroup;
        graphic.updateProps(polygon, {
          shape: {
            points: points0,
            stackedOnPoints: points1
          }
        }, seriesModel);
        graphic.updateProps(text, {
          style: {
            x: textLayout.x - margin,
            y: textLayout.y0 + textLayout.y / 2
          }
        }, seriesModel);
      }

      var hoverItemStyleModel = itemModel.getModel('emphasis.itemStyle');
      var itemStyleModel = itemModel.getModel('itemStyle');
      graphic.setTextStyle(text.style, labelModel, {
        text: labelModel.get('show') ? seriesModel.getFormattedLabel(indices[j - 1], 'normal') || data.getName(indices[j - 1]) : null,
        textVerticalAlign: 'middle'
      });
      polygon.setStyle(extend({
        fill: color
      }, itemStyleModel.getItemStyle(['color'])));
      graphic.setHoverStyle(polygon, hoverItemStyleModel.getItemStyle());
    }

    this._layersSeries = layerSeries;
    this._layers = newLayersGroups;
  },
  dispose: function () {}
}); // add animation to the view


function createGridClipShape(rect, seriesModel, cb) {
  var rectEl = new graphic.Rect({
    shape: {
      x: rect.x - 10,
      y: rect.y - 10,
      width: 0,
      height: rect.height + 20
    }
  });
  graphic.initProps(rectEl, {
    shape: {
      width: rect.width + 20,
      height: rect.height + 20
    }
  }, seriesModel, cb);
  return rectEl;
}

module.exports = _default;

/***/ }),

/***/ "340d":
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

var ChartView = __webpack_require__("e887");

var SunburstPiece = __webpack_require__("4e47");

var DataDiffer = __webpack_require__("80f0");

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
var ROOT_TO_NODE_ACTION = 'sunburstRootToNode';
var SunburstView = ChartView.extend({
  type: 'sunburst',
  init: function () {},
  render: function (seriesModel, ecModel, api, payload) {
    var that = this;
    this.seriesModel = seriesModel;
    this.api = api;
    this.ecModel = ecModel;
    var data = seriesModel.getData();
    var virtualRoot = data.tree.root;
    var newRoot = seriesModel.getViewRoot();
    var group = this.group;
    var renderLabelForZeroData = seriesModel.get('renderLabelForZeroData');
    var newChildren = [];
    newRoot.eachNode(function (node) {
      newChildren.push(node);
    });
    var oldChildren = this._oldChildren || [];
    dualTravel(newChildren, oldChildren);
    renderRollUp(virtualRoot, newRoot);

    if (payload && payload.highlight && payload.highlight.piece) {
      var highlightPolicy = seriesModel.getShallow('highlightPolicy');
      payload.highlight.piece.onEmphasis(highlightPolicy);
    } else if (payload && payload.unhighlight) {
      var piece = this.virtualPiece;

      if (!piece && virtualRoot.children.length) {
        piece = virtualRoot.children[0].piece;
      }

      if (piece) {
        piece.onNormal();
      }
    }

    this._initEvents();

    this._oldChildren = newChildren;

    function dualTravel(newChildren, oldChildren) {
      if (newChildren.length === 0 && oldChildren.length === 0) {
        return;
      }

      new DataDiffer(oldChildren, newChildren, getKey, getKey).add(processNode).update(processNode).remove(zrUtil.curry(processNode, null)).execute();

      function getKey(node) {
        return node.getId();
      }

      function processNode(newId, oldId) {
        var newNode = newId == null ? null : newChildren[newId];
        var oldNode = oldId == null ? null : oldChildren[oldId];
        doRenderNode(newNode, oldNode);
      }
    }

    function doRenderNode(newNode, oldNode) {
      if (!renderLabelForZeroData && newNode && !newNode.getValue()) {
        // Not render data with value 0
        newNode = null;
      }

      if (newNode !== virtualRoot && oldNode !== virtualRoot) {
        if (oldNode && oldNode.piece) {
          if (newNode) {
            // Update
            oldNode.piece.updateData(false, newNode, 'normal', seriesModel, ecModel); // For tooltip

            data.setItemGraphicEl(newNode.dataIndex, oldNode.piece);
          } else {
            // Remove
            removeNode(oldNode);
          }
        } else if (newNode) {
          // Add
          var piece = new SunburstPiece(newNode, seriesModel, ecModel);
          group.add(piece); // For tooltip

          data.setItemGraphicEl(newNode.dataIndex, piece);
        }
      }
    }

    function removeNode(node) {
      if (!node) {
        return;
      }

      if (node.piece) {
        group.remove(node.piece);
        node.piece = null;
      }
    }

    function renderRollUp(virtualRoot, viewRoot) {
      if (viewRoot.depth > 0) {
        // Render
        if (that.virtualPiece) {
          // Update
          that.virtualPiece.updateData(false, virtualRoot, 'normal', seriesModel, ecModel);
        } else {
          // Add
          that.virtualPiece = new SunburstPiece(virtualRoot, seriesModel, ecModel);
          group.add(that.virtualPiece);
        }

        if (viewRoot.piece._onclickEvent) {
          viewRoot.piece.off('click', viewRoot.piece._onclickEvent);
        }

        var event = function (e) {
          that._rootToNode(viewRoot.parentNode);
        };

        viewRoot.piece._onclickEvent = event;
        that.virtualPiece.on('click', event);
      } else if (that.virtualPiece) {
        // Remove
        group.remove(that.virtualPiece);
        that.virtualPiece = null;
      }
    }
  },
  dispose: function () {},

  /**
   * @private
   */
  _initEvents: function () {
    var that = this;

    var event = function (e) {
      var targetFound = false;
      var viewRoot = that.seriesModel.getViewRoot();
      viewRoot.eachNode(function (node) {
        if (!targetFound && node.piece && node.piece.childAt(0) === e.target) {
          var nodeClick = node.getModel().get('nodeClick');

          if (nodeClick === 'rootToNode') {
            that._rootToNode(node);
          } else if (nodeClick === 'link') {
            var itemModel = node.getModel();
            var link = itemModel.get('link');

            if (link) {
              var linkTarget = itemModel.get('target', true) || '_blank';
              window.open(link, linkTarget);
            }
          }

          targetFound = true;
        }
      });
    };

    if (this.group._onclickEvent) {
      this.group.off('click', this.group._onclickEvent);
    }

    this.group.on('click', event);
    this.group._onclickEvent = event;
  },

  /**
   * @private
   */
  _rootToNode: function (node) {
    if (node !== this.seriesModel.getViewRoot()) {
      this.api.dispatchAction({
        type: ROOT_TO_NODE_ACTION,
        from: this.uid,
        seriesId: this.seriesModel.id,
        targetNode: node
      });
    }
  },

  /**
   * @implement
   */
  containPoint: function (point, seriesModel) {
    var treeRoot = seriesModel.getData();
    var itemLayout = treeRoot.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  }
});
var _default = SunburstView;
module.exports = _default;

/***/ }),

/***/ "44110":
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

var helper = __webpack_require__("55ac");

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
 * @file Treemap action
 */
var noop = function () {};

var actionTypes = ['treemapZoomToNode', 'treemapRender', 'treemapMove'];

for (var i = 0; i < actionTypes.length; i++) {
  echarts.registerAction({
    type: actionTypes[i],
    update: 'updateView'
  }, noop);
}

echarts.registerAction({
  type: 'treemapRootToNode',
  update: 'updateView'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'treemap',
    query: payload
  }, handleRootToNode);

  function handleRootToNode(model, index) {
    var types = ['treemapZoomToNode', 'treemapRootToNode'];
    var targetInfo = helper.retrieveTargetInfo(payload, types, model);

    if (targetInfo) {
      var originViewRoot = model.getViewRoot();

      if (originViewRoot) {
        payload.direction = helper.aboveViewRoot(originViewRoot, targetInfo.node) ? 'rollUp' : 'drillDown';
      }

      model.resetViewRoot(targetInfo.node);
    }
  }
});

/***/ }),

/***/ "44fb":
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

var helper = __webpack_require__("55ac");

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
 * @file Sunburst action
 */
var ROOT_TO_NODE_ACTION = 'sunburstRootToNode';
echarts.registerAction({
  type: ROOT_TO_NODE_ACTION,
  update: 'updateView'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'sunburst',
    query: payload
  }, handleRootToNode);

  function handleRootToNode(model, index) {
    var targetInfo = helper.retrieveTargetInfo(payload, [ROOT_TO_NODE_ACTION], model);

    if (targetInfo) {
      var originViewRoot = model.getViewRoot();

      if (originViewRoot) {
        payload.direction = helper.aboveViewRoot(originViewRoot, targetInfo.node) ? 'rollUp' : 'drillDown';
      }

      model.resetViewRoot(targetInfo.node);
    }
  }
});
var HIGHLIGHT_ACTION = 'sunburstHighlight';
echarts.registerAction({
  type: HIGHLIGHT_ACTION,
  update: 'updateView'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'sunburst',
    query: payload
  }, handleHighlight);

  function handleHighlight(model, index) {
    var targetInfo = helper.retrieveTargetInfo(payload, [HIGHLIGHT_ACTION], model);

    if (targetInfo) {
      payload.highlight = targetInfo.node;
    }
  }
});
var UNHIGHLIGHT_ACTION = 'sunburstUnhighlight';
echarts.registerAction({
  type: UNHIGHLIGHT_ACTION,
  update: 'updateView'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'sunburst',
    query: payload
  }, handleUnhighlight);

  function handleUnhighlight(model, index) {
    payload.unhighlight = true;
  }
});

/***/ }),

/***/ "4e47":
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

var graphic = __webpack_require__("2306");

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
var NodeHighlightPolicy = {
  NONE: 'none',
  // not downplay others
  DESCENDANT: 'descendant',
  ANCESTOR: 'ancestor',
  SELF: 'self'
};
var DEFAULT_SECTOR_Z = 2;
var DEFAULT_TEXT_Z = 4;
/**
 * Sunburstce of Sunburst including Sector, Label, LabelLine
 * @constructor
 * @extends {module:zrender/graphic/Group}
 */

function SunburstPiece(node, seriesModel, ecModel) {
  graphic.Group.call(this);
  var sector = new graphic.Sector({
    z2: DEFAULT_SECTOR_Z
  });
  sector.seriesIndex = seriesModel.seriesIndex;
  var text = new graphic.Text({
    z2: DEFAULT_TEXT_Z,
    silent: node.getModel('label').get('silent')
  });
  this.add(sector);
  this.add(text);
  this.updateData(true, node, 'normal', seriesModel, ecModel); // Hover to change label and labelLine

  function onEmphasis() {
    text.ignore = text.hoverIgnore;
  }

  function onNormal() {
    text.ignore = text.normalIgnore;
  }

  this.on('emphasis', onEmphasis).on('normal', onNormal).on('mouseover', onEmphasis).on('mouseout', onNormal);
}

var SunburstPieceProto = SunburstPiece.prototype;

SunburstPieceProto.updateData = function (firstCreate, node, state, seriesModel, ecModel) {
  this.node = node;
  node.piece = this;
  seriesModel = seriesModel || this._seriesModel;
  ecModel = ecModel || this._ecModel;
  var sector = this.childAt(0);
  sector.dataIndex = node.dataIndex;
  var itemModel = node.getModel();
  var layout = node.getLayout(); // if (!layout) {
  //     console.log(node.getLayout());
  // }

  var sectorShape = zrUtil.extend({}, layout);
  sectorShape.label = null;
  var visualColor = getNodeColor(node, seriesModel, ecModel);
  fillDefaultColor(node, seriesModel, visualColor);
  var normalStyle = itemModel.getModel('itemStyle').getItemStyle();
  var style;

  if (state === 'normal') {
    style = normalStyle;
  } else {
    var stateStyle = itemModel.getModel(state + '.itemStyle').getItemStyle();
    style = zrUtil.merge(stateStyle, normalStyle);
  }

  style = zrUtil.defaults({
    lineJoin: 'bevel',
    fill: style.fill || visualColor
  }, style);

  if (firstCreate) {
    sector.setShape(sectorShape);
    sector.shape.r = layout.r0;
    graphic.updateProps(sector, {
      shape: {
        r: layout.r
      }
    }, seriesModel, node.dataIndex);
    sector.useStyle(style);
  } else if (typeof style.fill === 'object' && style.fill.type || typeof sector.style.fill === 'object' && sector.style.fill.type) {
    // Disable animation for gradient since no interpolation method
    // is supported for gradient
    graphic.updateProps(sector, {
      shape: sectorShape
    }, seriesModel);
    sector.useStyle(style);
  } else {
    graphic.updateProps(sector, {
      shape: sectorShape,
      style: style
    }, seriesModel);
  }

  this._updateLabel(seriesModel, visualColor, state);

  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && sector.attr('cursor', cursorStyle);

  if (firstCreate) {
    var highlightPolicy = seriesModel.getShallow('highlightPolicy');

    this._initEvents(sector, node, seriesModel, highlightPolicy);
  }

  this._seriesModel = seriesModel || this._seriesModel;
  this._ecModel = ecModel || this._ecModel;
};

SunburstPieceProto.onEmphasis = function (highlightPolicy) {
  var that = this;
  this.node.hostTree.root.eachNode(function (n) {
    if (n.piece) {
      if (that.node === n) {
        n.piece.updateData(false, n, 'emphasis');
      } else if (isNodeHighlighted(n, that.node, highlightPolicy)) {
        n.piece.childAt(0).trigger('highlight');
      } else if (highlightPolicy !== NodeHighlightPolicy.NONE) {
        n.piece.childAt(0).trigger('downplay');
      }
    }
  });
};

SunburstPieceProto.onNormal = function () {
  this.node.hostTree.root.eachNode(function (n) {
    if (n.piece) {
      n.piece.updateData(false, n, 'normal');
    }
  });
};

SunburstPieceProto.onHighlight = function () {
  this.updateData(false, this.node, 'highlight');
};

SunburstPieceProto.onDownplay = function () {
  this.updateData(false, this.node, 'downplay');
};

SunburstPieceProto._updateLabel = function (seriesModel, visualColor, state) {
  var itemModel = this.node.getModel();
  var normalModel = itemModel.getModel('label');
  var labelModel = state === 'normal' || state === 'emphasis' ? normalModel : itemModel.getModel(state + '.label');
  var labelHoverModel = itemModel.getModel('emphasis.label');
  var text = zrUtil.retrieve(seriesModel.getFormattedLabel(this.node.dataIndex, state, null, null, 'label'), this.node.name);

  if (getLabelAttr('show') === false) {
    text = '';
  }

  var layout = this.node.getLayout();
  var labelMinAngle = labelModel.get('minAngle');

  if (labelMinAngle == null) {
    labelMinAngle = normalModel.get('minAngle');
  }

  labelMinAngle = labelMinAngle / 180 * Math.PI;
  var angle = layout.endAngle - layout.startAngle;

  if (labelMinAngle != null && Math.abs(angle) < labelMinAngle) {
    // Not displaying text when angle is too small
    text = '';
  }

  var label = this.childAt(1);
  graphic.setLabelStyle(label.style, label.hoverStyle || {}, normalModel, labelHoverModel, {
    defaultText: labelModel.getShallow('show') ? text : null,
    autoColor: visualColor,
    useInsideStyle: true
  });
  var midAngle = (layout.startAngle + layout.endAngle) / 2;
  var dx = Math.cos(midAngle);
  var dy = Math.sin(midAngle);
  var r;
  var labelPosition = getLabelAttr('position');
  var labelPadding = getLabelAttr('distance') || 0;
  var textAlign = getLabelAttr('align');

  if (labelPosition === 'outside') {
    r = layout.r + labelPadding;
    textAlign = midAngle > Math.PI / 2 ? 'right' : 'left';
  } else {
    if (!textAlign || textAlign === 'center') {
      r = (layout.r + layout.r0) / 2;
      textAlign = 'center';
    } else if (textAlign === 'left') {
      r = layout.r0 + labelPadding;

      if (midAngle > Math.PI / 2) {
        textAlign = 'right';
      }
    } else if (textAlign === 'right') {
      r = layout.r - labelPadding;

      if (midAngle > Math.PI / 2) {
        textAlign = 'left';
      }
    }
  }

  label.attr('style', {
    text: text,
    textAlign: textAlign,
    textVerticalAlign: getLabelAttr('verticalAlign') || 'middle',
    opacity: getLabelAttr('opacity')
  });
  var textX = r * dx + layout.cx;
  var textY = r * dy + layout.cy;
  label.attr('position', [textX, textY]);
  var rotateType = getLabelAttr('rotate');
  var rotate = 0;

  if (rotateType === 'radial') {
    rotate = -midAngle;

    if (rotate < -Math.PI / 2) {
      rotate += Math.PI;
    }
  } else if (rotateType === 'tangential') {
    rotate = Math.PI / 2 - midAngle;

    if (rotate > Math.PI / 2) {
      rotate -= Math.PI;
    } else if (rotate < -Math.PI / 2) {
      rotate += Math.PI;
    }
  } else if (typeof rotateType === 'number') {
    rotate = rotateType * Math.PI / 180;
  }

  label.attr('rotation', rotate);

  function getLabelAttr(name) {
    var stateAttr = labelModel.get(name);

    if (stateAttr == null) {
      return normalModel.get(name);
    } else {
      return stateAttr;
    }
  }
};

SunburstPieceProto._initEvents = function (sector, node, seriesModel, highlightPolicy) {
  sector.off('mouseover').off('mouseout').off('emphasis').off('normal');
  var that = this;

  var onEmphasis = function () {
    that.onEmphasis(highlightPolicy);
  };

  var onNormal = function () {
    that.onNormal();
  };

  var onDownplay = function () {
    that.onDownplay();
  };

  var onHighlight = function () {
    that.onHighlight();
  };

  if (seriesModel.isAnimationEnabled()) {
    sector.on('mouseover', onEmphasis).on('mouseout', onNormal).on('emphasis', onEmphasis).on('normal', onNormal).on('downplay', onDownplay).on('highlight', onHighlight);
  }
};

zrUtil.inherits(SunburstPiece, graphic.Group);
var _default = SunburstPiece;
/**
 * Get node color
 *
 * @param {TreeNode} node the node to get color
 * @param {module:echarts/model/Series} seriesModel series
 * @param {module:echarts/model/Global} ecModel echarts defaults
 */

function getNodeColor(node, seriesModel, ecModel) {
  // Color from visualMap
  var visualColor = node.getVisual('color');
  var visualMetaList = node.getVisual('visualMeta');

  if (!visualMetaList || visualMetaList.length === 0) {
    // Use first-generation color if has no visualMap
    visualColor = null;
  } // Self color or level color


  var color = node.getModel('itemStyle').get('color');

  if (color) {
    return color;
  } else if (visualColor) {
    // Color mapping
    return visualColor;
  } else if (node.depth === 0) {
    // Virtual root node
    return ecModel.option.color[0];
  } else {
    // First-generation color
    var length = ecModel.option.color.length;
    color = ecModel.option.color[getRootId(node) % length];
  }

  return color;
}
/**
 * Get index of root in sorted order
 *
 * @param {TreeNode} node current node
 * @return {number} index in root
 */


function getRootId(node) {
  var ancestor = node;

  while (ancestor.depth > 1) {
    ancestor = ancestor.parentNode;
  }

  var virtualRoot = node.getAncestors()[0];
  return zrUtil.indexOf(virtualRoot.children, ancestor);
}

function isNodeHighlighted(node, activeNode, policy) {
  if (policy === NodeHighlightPolicy.NONE) {
    return false;
  } else if (policy === NodeHighlightPolicy.SELF) {
    return node === activeNode;
  } else if (policy === NodeHighlightPolicy.ANCESTOR) {
    return node === activeNode || node.isAncestorOf(activeNode);
  } else {
    return node === activeNode || node.isDescendantOf(activeNode);
  }
} // Fix tooltip callback function params.color incorrect when pick a default color


function fillDefaultColor(node, seriesModel, color) {
  var data = seriesModel.getData();
  data.setItemVisual(node.dataIndex, 'color', color);
}

module.exports = _default;

/***/ }),

/***/ "527a":
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

var numberUtil = __webpack_require__("3842");

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
function _default(ecModel, api) {
  ecModel.eachSeriesByType('themeRiver', function (seriesModel) {
    var data = seriesModel.getData();
    var single = seriesModel.coordinateSystem;
    var layoutInfo = {}; // use the axis boundingRect for view

    var rect = single.getRect();
    layoutInfo.rect = rect;
    var boundaryGap = seriesModel.get('boundaryGap');
    var axis = single.getAxis();
    layoutInfo.boundaryGap = boundaryGap;

    if (axis.orient === 'horizontal') {
      boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], rect.height);
      boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], rect.height);
      var height = rect.height - boundaryGap[0] - boundaryGap[1];
      themeRiverLayout(data, seriesModel, height);
    } else {
      boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], rect.width);
      boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], rect.width);
      var width = rect.width - boundaryGap[0] - boundaryGap[1];
      themeRiverLayout(data, seriesModel, width);
    }

    data.setLayout('layoutInfo', layoutInfo);
  });
}
/**
 * The layout information about themeriver
 *
 * @param {module:echarts/data/List} data  data in the series
 * @param {module:echarts/model/Series} seriesModel  the model object of themeRiver series
 * @param {number} height  value used to compute every series height
 */


function themeRiverLayout(data, seriesModel, height) {
  if (!data.count()) {
    return;
  }

  var coordSys = seriesModel.coordinateSystem; // the data in each layer are organized into a series.

  var layerSeries = seriesModel.getLayerSeries(); // the points in each layer.

  var timeDim = data.mapDimension('single');
  var valueDim = data.mapDimension('value');
  var layerPoints = zrUtil.map(layerSeries, function (singleLayer) {
    return zrUtil.map(singleLayer.indices, function (idx) {
      var pt = coordSys.dataToPoint(data.get(timeDim, idx));
      pt[1] = data.get(valueDim, idx);
      return pt;
    });
  });
  var base = computeBaseline(layerPoints);
  var baseLine = base.y0;
  var ky = height / base.max; // set layout information for each item.

  var n = layerSeries.length;
  var m = layerSeries[0].indices.length;
  var baseY0;

  for (var j = 0; j < m; ++j) {
    baseY0 = baseLine[j] * ky;
    data.setItemLayout(layerSeries[0].indices[j], {
      layerIndex: 0,
      x: layerPoints[0][j][0],
      y0: baseY0,
      y: layerPoints[0][j][1] * ky
    });

    for (var i = 1; i < n; ++i) {
      baseY0 += layerPoints[i - 1][j][1] * ky;
      data.setItemLayout(layerSeries[i].indices[j], {
        layerIndex: i,
        x: layerPoints[i][j][0],
        y0: baseY0,
        y: layerPoints[i][j][1] * ky
      });
    }
  }
}
/**
 * Compute the baseLine of the rawdata
 * Inspired by Lee Byron's paper Stacked Graphs - Geometry & Aesthetics
 *
 * @param  {Array.<Array>} data  the points in each layer
 * @return {Object}
 */


function computeBaseline(data) {
  var layerNum = data.length;
  var pointNum = data[0].length;
  var sums = [];
  var y0 = [];
  var max = 0;
  var temp;
  var base = {};

  for (var i = 0; i < pointNum; ++i) {
    for (var j = 0, temp = 0; j < layerNum; ++j) {
      temp += data[j][i][1];
    }

    if (temp > max) {
      max = temp;
    }

    sums.push(temp);
  }

  for (var k = 0; k < pointNum; ++k) {
    y0[k] = (max - sums[k]) / 2;
  }

  max = 0;

  for (var l = 0; l < pointNum; ++l) {
    var sum = sums[l] + y0[l];

    if (sum > max) {
      max = sum;
    }
  }

  base.y0 = y0;
  base.max = max;
  return base;
}

module.exports = _default;

/***/ }),

/***/ "6c12f":
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

__webpack_require__("2cfc");

__webpack_require__("adf4");

__webpack_require__("255c");

var themeRiverLayout = __webpack_require__("527a");

var themeRiverVisual = __webpack_require__("71b2");

var dataFilter = __webpack_require__("d3f4");

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
echarts.registerLayout(themeRiverLayout);
echarts.registerVisual(themeRiverVisual);
echarts.registerProcessor(dataFilter('themeRiver'));

/***/ }),

/***/ "6cd8":
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

var graphic = __webpack_require__("2306");

var SymbolClz = __webpack_require__("1418");

var _layoutHelper = __webpack_require__("22da");

var radialCoordinate = _layoutHelper.radialCoordinate;

var echarts = __webpack_require__("3eba");

var bbox = __webpack_require__("e263");

var View = __webpack_require__("6cc5");

var roamHelper = __webpack_require__("01ef");

var RoamController = __webpack_require__("4a01");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

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
var _default = echarts.extendChartView({
  type: 'tree',

  /**
   * Init the chart
   * @override
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  init: function (ecModel, api) {
    /**
     * @private
     * @type {module:echarts/data/Tree}
     */
    this._oldTree;
    /**
     * @private
     * @type {module:zrender/container/Group}
     */

    this._mainGroup = new graphic.Group();
    /**
     * @private
     * @type {module:echarts/componet/helper/RoamController}
     */

    this._controller = new RoamController(api.getZr());
    this._controllerHost = {
      target: this.group
    };
    this.group.add(this._mainGroup);
  },
  render: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var layoutInfo = seriesModel.layoutInfo;
    var group = this._mainGroup;
    var layout = seriesModel.get('layout');

    if (layout === 'radial') {
      group.attr('position', [layoutInfo.x + layoutInfo.width / 2, layoutInfo.y + layoutInfo.height / 2]);
    } else {
      group.attr('position', [layoutInfo.x, layoutInfo.y]);
    }

    this._updateViewCoordSys(seriesModel, layoutInfo, layout);

    this._updateController(seriesModel, ecModel, api);

    var oldData = this._data;
    var seriesScope = {
      expandAndCollapse: seriesModel.get('expandAndCollapse'),
      layout: layout,
      orient: seriesModel.getOrient(),
      curvature: seriesModel.get('lineStyle.curveness'),
      symbolRotate: seriesModel.get('symbolRotate'),
      symbolOffset: seriesModel.get('symbolOffset'),
      hoverAnimation: seriesModel.get('hoverAnimation'),
      useNameLabel: true,
      fadeIn: true
    };
    data.diff(oldData).add(function (newIdx) {
      if (symbolNeedsDraw(data, newIdx)) {
        // Create node and edge
        updateNode(data, newIdx, null, group, seriesModel, seriesScope);
      }
    }).update(function (newIdx, oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx);

      if (!symbolNeedsDraw(data, newIdx)) {
        symbolEl && removeNode(oldData, oldIdx, symbolEl, group, seriesModel, seriesScope);
        return;
      } // Update node and edge


      updateNode(data, newIdx, symbolEl, group, seriesModel, seriesScope);
    }).remove(function (oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx); // When remove a collapsed node of subtree, since the collapsed
      // node haven't been initialized with a symbol element,
      // you can't found it's symbol element through index.
      // so if we want to remove the symbol element we should insure
      // that the symbol element is not null.

      if (symbolEl) {
        removeNode(oldData, oldIdx, symbolEl, group, seriesModel, seriesScope);
      }
    }).execute();
    this._nodeScaleRatio = seriesModel.get('nodeScaleRatio');

    this._updateNodeAndLinkScale(seriesModel);

    if (seriesScope.expandAndCollapse === true) {
      data.eachItemGraphicEl(function (el, dataIndex) {
        el.off('click').on('click', function () {
          api.dispatchAction({
            type: 'treeExpandAndCollapse',
            seriesId: seriesModel.id,
            dataIndex: dataIndex
          });
        });
      });
    }

    this._data = data;
  },
  _updateViewCoordSys: function (seriesModel) {
    var data = seriesModel.getData();
    var points = [];
    data.each(function (idx) {
      var layout = data.getItemLayout(idx);

      if (layout && !isNaN(layout.x) && !isNaN(layout.y)) {
        points.push([+layout.x, +layout.y]);
      }
    });
    var min = [];
    var max = [];
    bbox.fromPoints(points, min, max); // If don't Store min max when collapse the root node after roam,
    // the root node will disappear.

    var oldMin = this._min;
    var oldMax = this._max; // If width or height is 0

    if (max[0] - min[0] === 0) {
      min[0] = oldMin ? oldMin[0] : min[0] - 1;
      max[0] = oldMax ? oldMax[0] : max[0] + 1;
    }

    if (max[1] - min[1] === 0) {
      min[1] = oldMin ? oldMin[1] : min[1] - 1;
      max[1] = oldMax ? oldMax[1] : max[1] + 1;
    }

    var viewCoordSys = seriesModel.coordinateSystem = new View();
    viewCoordSys.zoomLimit = seriesModel.get('scaleLimit');
    viewCoordSys.setBoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    viewCoordSys.setCenter(seriesModel.get('center'));
    viewCoordSys.setZoom(seriesModel.get('zoom')); // Here we use viewCoordSys just for computing the 'position' and 'scale' of the group

    this.group.attr({
      position: viewCoordSys.position,
      scale: viewCoordSys.scale
    });
    this._viewCoordSys = viewCoordSys;
    this._min = min;
    this._max = max;
  },
  _updateController: function (seriesModel, ecModel, api) {
    var controller = this._controller;
    var controllerHost = this._controllerHost;
    var group = this.group;
    controller.setPointerChecker(function (e, x, y) {
      var rect = group.getBoundingRect();
      rect.applyTransform(group.transform);
      return rect.contain(x, y) && !onIrrelevantElement(e, api, seriesModel);
    });
    controller.enable(seriesModel.get('roam'));
    controllerHost.zoomLimit = seriesModel.get('scaleLimit');
    controllerHost.zoom = seriesModel.coordinateSystem.getZoom();
    controller.off('pan').off('zoom').on('pan', function (e) {
      roamHelper.updateViewOnPan(controllerHost, e.dx, e.dy);
      api.dispatchAction({
        seriesId: seriesModel.id,
        type: 'treeRoam',
        dx: e.dx,
        dy: e.dy
      });
    }, this).on('zoom', function (e) {
      roamHelper.updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
      api.dispatchAction({
        seriesId: seriesModel.id,
        type: 'treeRoam',
        zoom: e.scale,
        originX: e.originX,
        originY: e.originY
      });

      this._updateNodeAndLinkScale(seriesModel);
    }, this);
  },
  _updateNodeAndLinkScale: function (seriesModel) {
    var data = seriesModel.getData();

    var nodeScale = this._getNodeGlobalScale(seriesModel);

    var invScale = [nodeScale, nodeScale];
    data.eachItemGraphicEl(function (el, idx) {
      el.attr('scale', invScale);
    });
  },
  _getNodeGlobalScale: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys.type !== 'view') {
      return 1;
    }

    var nodeScaleRatio = this._nodeScaleRatio;
    var groupScale = coordSys.scale;
    var groupZoom = groupScale && groupScale[0] || 1; // Scale node when zoom changes

    var roamZoom = coordSys.getZoom();
    var nodeScale = (roamZoom - 1) * nodeScaleRatio + 1;
    return nodeScale / groupZoom;
  },
  dispose: function () {
    this._controller && this._controller.dispose();
    this._controllerHost = {};
  },
  remove: function () {
    this._mainGroup.removeAll();

    this._data = null;
  }
});

function symbolNeedsDraw(data, dataIndex) {
  var layout = data.getItemLayout(dataIndex);
  return layout && !isNaN(layout.x) && !isNaN(layout.y) && data.getItemVisual(dataIndex, 'symbol') !== 'none';
}

function getTreeNodeStyle(node, itemModel, seriesScope) {
  seriesScope.itemModel = itemModel;
  seriesScope.itemStyle = itemModel.getModel('itemStyle').getItemStyle();
  seriesScope.hoverItemStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
  seriesScope.lineStyle = itemModel.getModel('lineStyle').getLineStyle();
  seriesScope.labelModel = itemModel.getModel('label');
  seriesScope.hoverLabelModel = itemModel.getModel('emphasis.label');

  if (node.isExpand === false && node.children.length !== 0) {
    seriesScope.symbolInnerColor = seriesScope.itemStyle.fill;
  } else {
    seriesScope.symbolInnerColor = '#fff';
  }

  return seriesScope;
}

function updateNode(data, dataIndex, symbolEl, group, seriesModel, seriesScope) {
  var isInit = !symbolEl;
  var node = data.tree.getNodeByDataIndex(dataIndex);
  var itemModel = node.getModel();
  var seriesScope = getTreeNodeStyle(node, itemModel, seriesScope);
  var virtualRoot = data.tree.root;
  var source = node.parentNode === virtualRoot ? node : node.parentNode || node;
  var sourceSymbolEl = data.getItemGraphicEl(source.dataIndex);
  var sourceLayout = source.getLayout();
  var sourceOldLayout = sourceSymbolEl ? {
    x: sourceSymbolEl.position[0],
    y: sourceSymbolEl.position[1],
    rawX: sourceSymbolEl.__radialOldRawX,
    rawY: sourceSymbolEl.__radialOldRawY
  } : sourceLayout;
  var targetLayout = node.getLayout();

  if (isInit) {
    symbolEl = new SymbolClz(data, dataIndex, seriesScope);
    symbolEl.attr('position', [sourceOldLayout.x, sourceOldLayout.y]);
  } else {
    symbolEl.updateData(data, dataIndex, seriesScope);
  }

  symbolEl.__radialOldRawX = symbolEl.__radialRawX;
  symbolEl.__radialOldRawY = symbolEl.__radialRawY;
  symbolEl.__radialRawX = targetLayout.rawX;
  symbolEl.__radialRawY = targetLayout.rawY;
  group.add(symbolEl);
  data.setItemGraphicEl(dataIndex, symbolEl);
  graphic.updateProps(symbolEl, {
    position: [targetLayout.x, targetLayout.y]
  }, seriesModel);
  var symbolPath = symbolEl.getSymbolPath();

  if (seriesScope.layout === 'radial') {
    var realRoot = virtualRoot.children[0];
    var rootLayout = realRoot.getLayout();
    var length = realRoot.children.length;
    var rad;
    var isLeft;

    if (targetLayout.x === rootLayout.x && node.isExpand === true) {
      var center = {};
      center.x = (realRoot.children[0].getLayout().x + realRoot.children[length - 1].getLayout().x) / 2;
      center.y = (realRoot.children[0].getLayout().y + realRoot.children[length - 1].getLayout().y) / 2;
      rad = Math.atan2(center.y - rootLayout.y, center.x - rootLayout.x);

      if (rad < 0) {
        rad = Math.PI * 2 + rad;
      }

      isLeft = center.x < rootLayout.x;

      if (isLeft) {
        rad = rad - Math.PI;
      }
    } else {
      rad = Math.atan2(targetLayout.y - rootLayout.y, targetLayout.x - rootLayout.x);

      if (rad < 0) {
        rad = Math.PI * 2 + rad;
      }

      if (node.children.length === 0 || node.children.length !== 0 && node.isExpand === false) {
        isLeft = targetLayout.x < rootLayout.x;

        if (isLeft) {
          rad = rad - Math.PI;
        }
      } else {
        isLeft = targetLayout.x > rootLayout.x;

        if (!isLeft) {
          rad = rad - Math.PI;
        }
      }
    }

    var textPosition = isLeft ? 'left' : 'right';
    var rotate = seriesScope.labelModel.get('rotate');
    var labelRotateRadian = rotate * (Math.PI / 180);
    symbolPath.setStyle({
      textPosition: seriesScope.labelModel.get('position') || textPosition,
      textRotation: rotate == null ? -rad : labelRotateRadian,
      textOrigin: 'center',
      verticalAlign: 'middle'
    });
  }

  if (node.parentNode && node.parentNode !== virtualRoot) {
    var edge = symbolEl.__edge;

    if (!edge) {
      edge = symbolEl.__edge = new graphic.BezierCurve({
        shape: getEdgeShape(seriesScope, sourceOldLayout, sourceOldLayout),
        style: zrUtil.defaults({
          opacity: 0,
          strokeNoScale: true
        }, seriesScope.lineStyle)
      });
    }

    graphic.updateProps(edge, {
      shape: getEdgeShape(seriesScope, sourceLayout, targetLayout),
      style: {
        opacity: 1
      }
    }, seriesModel);
    group.add(edge);
  }
}

function removeNode(data, dataIndex, symbolEl, group, seriesModel, seriesScope) {
  var node = data.tree.getNodeByDataIndex(dataIndex);
  var virtualRoot = data.tree.root;
  var itemModel = node.getModel();
  var seriesScope = getTreeNodeStyle(node, itemModel, seriesScope);
  var source = node.parentNode === virtualRoot ? node : node.parentNode || node;
  var sourceLayout;

  while (sourceLayout = source.getLayout(), sourceLayout == null) {
    source = source.parentNode === virtualRoot ? source : source.parentNode || source;
  }

  graphic.updateProps(symbolEl, {
    position: [sourceLayout.x + 1, sourceLayout.y + 1]
  }, seriesModel, function () {
    group.remove(symbolEl);
    data.setItemGraphicEl(dataIndex, null);
  });
  symbolEl.fadeOut(null, {
    keepLabel: true
  });
  var edge = symbolEl.__edge;

  if (edge) {
    graphic.updateProps(edge, {
      shape: getEdgeShape(seriesScope, sourceLayout, sourceLayout),
      style: {
        opacity: 0
      }
    }, seriesModel, function () {
      group.remove(edge);
    });
  }
}

function getEdgeShape(seriesScope, sourceLayout, targetLayout) {
  var cpx1;
  var cpy1;
  var cpx2;
  var cpy2;
  var orient = seriesScope.orient;
  var x1;
  var x2;
  var y1;
  var y2;

  if (seriesScope.layout === 'radial') {
    x1 = sourceLayout.rawX;
    y1 = sourceLayout.rawY;
    x2 = targetLayout.rawX;
    y2 = targetLayout.rawY;
    var radialCoor1 = radialCoordinate(x1, y1);
    var radialCoor2 = radialCoordinate(x1, y1 + (y2 - y1) * seriesScope.curvature);
    var radialCoor3 = radialCoordinate(x2, y2 + (y1 - y2) * seriesScope.curvature);
    var radialCoor4 = radialCoordinate(x2, y2);
    return {
      x1: radialCoor1.x,
      y1: radialCoor1.y,
      x2: radialCoor4.x,
      y2: radialCoor4.y,
      cpx1: radialCoor2.x,
      cpy1: radialCoor2.y,
      cpx2: radialCoor3.x,
      cpy2: radialCoor3.y
    };
  } else {
    x1 = sourceLayout.x;
    y1 = sourceLayout.y;
    x2 = targetLayout.x;
    y2 = targetLayout.y;

    if (orient === 'LR' || orient === 'RL') {
      cpx1 = x1 + (x2 - x1) * seriesScope.curvature;
      cpy1 = y1;
      cpx2 = x2 + (x1 - x2) * seriesScope.curvature;
      cpy2 = y2;
    }

    if (orient === 'TB' || orient === 'BT') {
      cpx1 = x1;
      cpy1 = y1 + (y2 - y1) * seriesScope.curvature;
      cpx2 = x2;
      cpy2 = y2 + (y1 - y2) * seriesScope.curvature;
    }
  }

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    cpx1: cpx1,
    cpy1: cpy1,
    cpx2: cpx2,
    cpy2: cpy2
  };
}

module.exports = _default;

/***/ }),

/***/ "6d9a":
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

/**
 * Traverse the tree from bottom to top and do something
 * @param  {module:echarts/data/Tree~TreeNode} root  The real root of the tree
 * @param  {Function} callback
 */
function eachAfter(root, callback, separation) {
  var nodes = [root];
  var next = [];
  var node;

  while (node = nodes.pop()) {
    // jshint ignore:line
    next.push(node);

    if (node.isExpand) {
      var children = node.children;

      if (children.length) {
        for (var i = 0; i < children.length; i++) {
          nodes.push(children[i]);
        }
      }
    }
  }

  while (node = next.pop()) {
    // jshint ignore:line
    callback(node, separation);
  }
}
/**
 * Traverse the tree from top to bottom and do something
 * @param  {module:echarts/data/Tree~TreeNode} root  The real root of the tree
 * @param  {Function} callback
 */


function eachBefore(root, callback) {
  var nodes = [root];
  var node;

  while (node = nodes.pop()) {
    // jshint ignore:line
    callback(node);

    if (node.isExpand) {
      var children = node.children;

      if (children.length) {
        for (var i = children.length - 1; i >= 0; i--) {
          nodes.push(children[i]);
        }
      }
    }
  }
}

exports.eachAfter = eachAfter;
exports.eachBefore = eachBefore;

/***/ }),

/***/ "71b2":
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
function _default(ecModel) {
  ecModel.eachSeriesByType('themeRiver', function (seriesModel) {
    var data = seriesModel.getData();
    var rawData = seriesModel.getRawData();
    var colorList = seriesModel.get('color');
    var idxMap = createHashMap();
    data.each(function (idx) {
      idxMap.set(data.getRawIndex(idx), idx);
    });
    rawData.each(function (rawIndex) {
      var name = rawData.getName(rawIndex);
      var color = colorList[(seriesModel.nameMap.get(name) - 1) % colorList.length];
      rawData.setItemVisual(rawIndex, 'color', color);
      var idx = idxMap.get(rawIndex);

      if (idx != null) {
        data.setItemVisual(idx, 'color', color);
      }
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "90c2":
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

var VisualMapping = __webpack_require__("5f14");

var zrColor = __webpack_require__("41ef");

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
var isArray = zrUtil.isArray;
var ITEM_STYLE_NORMAL = 'itemStyle';
var _default = {
  seriesType: 'treemap',
  reset: function (seriesModel, ecModel, api, payload) {
    var tree = seriesModel.getData().tree;
    var root = tree.root;
    var seriesItemStyleModel = seriesModel.getModel(ITEM_STYLE_NORMAL);

    if (root.isRemoved()) {
      return;
    }

    var levelItemStyles = zrUtil.map(tree.levelModels, function (levelModel) {
      return levelModel ? levelModel.get(ITEM_STYLE_NORMAL) : null;
    });
    travelTree(root, // Visual should calculate from tree root but not view root.
    {}, levelItemStyles, seriesItemStyleModel, seriesModel.getViewRoot().getAncestors(), seriesModel);
  }
};

function travelTree(node, designatedVisual, levelItemStyles, seriesItemStyleModel, viewRootAncestors, seriesModel) {
  var nodeModel = node.getModel();
  var nodeLayout = node.getLayout(); // Optimize

  if (!nodeLayout || nodeLayout.invisible || !nodeLayout.isInView) {
    return;
  }

  var nodeItemStyleModel = node.getModel(ITEM_STYLE_NORMAL);
  var levelItemStyle = levelItemStyles[node.depth];
  var visuals = buildVisuals(nodeItemStyleModel, designatedVisual, levelItemStyle, seriesItemStyleModel); // calculate border color

  var borderColor = nodeItemStyleModel.get('borderColor');
  var borderColorSaturation = nodeItemStyleModel.get('borderColorSaturation');
  var thisNodeColor;

  if (borderColorSaturation != null) {
    // For performance, do not always execute 'calculateColor'.
    thisNodeColor = calculateColor(visuals, node);
    borderColor = calculateBorderColor(borderColorSaturation, thisNodeColor);
  }

  node.setVisual('borderColor', borderColor);
  var viewChildren = node.viewChildren;

  if (!viewChildren || !viewChildren.length) {
    thisNodeColor = calculateColor(visuals, node); // Apply visual to this node.

    node.setVisual('color', thisNodeColor);
  } else {
    var mapping = buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren); // Designate visual to children.

    zrUtil.each(viewChildren, function (child, index) {
      // If higher than viewRoot, only ancestors of viewRoot is needed to visit.
      if (child.depth >= viewRootAncestors.length || child === viewRootAncestors[child.depth]) {
        var childVisual = mapVisual(nodeModel, visuals, child, index, mapping, seriesModel);
        travelTree(child, childVisual, levelItemStyles, seriesItemStyleModel, viewRootAncestors, seriesModel);
      }
    });
  }
}

function buildVisuals(nodeItemStyleModel, designatedVisual, levelItemStyle, seriesItemStyleModel) {
  var visuals = zrUtil.extend({}, designatedVisual);
  zrUtil.each(['color', 'colorAlpha', 'colorSaturation'], function (visualName) {
    // Priority: thisNode > thisLevel > parentNodeDesignated > seriesModel
    var val = nodeItemStyleModel.get(visualName, true); // Ignore parent

    val == null && levelItemStyle && (val = levelItemStyle[visualName]);
    val == null && (val = designatedVisual[visualName]);
    val == null && (val = seriesItemStyleModel.get(visualName));
    val != null && (visuals[visualName] = val);
  });
  return visuals;
}

function calculateColor(visuals) {
  var color = getValueVisualDefine(visuals, 'color');

  if (color) {
    var colorAlpha = getValueVisualDefine(visuals, 'colorAlpha');
    var colorSaturation = getValueVisualDefine(visuals, 'colorSaturation');

    if (colorSaturation) {
      color = zrColor.modifyHSL(color, null, null, colorSaturation);
    }

    if (colorAlpha) {
      color = zrColor.modifyAlpha(color, colorAlpha);
    }

    return color;
  }
}

function calculateBorderColor(borderColorSaturation, thisNodeColor) {
  return thisNodeColor != null ? zrColor.modifyHSL(thisNodeColor, null, null, borderColorSaturation) : null;
}

function getValueVisualDefine(visuals, name) {
  var value = visuals[name];

  if (value != null && value !== 'none') {
    return value;
  }
}

function buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren) {
  if (!viewChildren || !viewChildren.length) {
    return;
  }

  var rangeVisual = getRangeVisual(nodeModel, 'color') || visuals.color != null && visuals.color !== 'none' && (getRangeVisual(nodeModel, 'colorAlpha') || getRangeVisual(nodeModel, 'colorSaturation'));

  if (!rangeVisual) {
    return;
  }

  var visualMin = nodeModel.get('visualMin');
  var visualMax = nodeModel.get('visualMax');
  var dataExtent = nodeLayout.dataExtent.slice();
  visualMin != null && visualMin < dataExtent[0] && (dataExtent[0] = visualMin);
  visualMax != null && visualMax > dataExtent[1] && (dataExtent[1] = visualMax);
  var colorMappingBy = nodeModel.get('colorMappingBy');
  var opt = {
    type: rangeVisual.name,
    dataExtent: dataExtent,
    visual: rangeVisual.range
  };

  if (opt.type === 'color' && (colorMappingBy === 'index' || colorMappingBy === 'id')) {
    opt.mappingMethod = 'category';
    opt.loop = true; // categories is ordinal, so do not set opt.categories.
  } else {
    opt.mappingMethod = 'linear';
  }

  var mapping = new VisualMapping(opt);
  mapping.__drColorMappingBy = colorMappingBy;
  return mapping;
} // Notice: If we dont have the attribute 'colorRange', but only use
// attribute 'color' to represent both concepts of 'colorRange' and 'color',
// (It means 'colorRange' when 'color' is Array, means 'color' when not array),
// this problem will be encountered:
// If a level-1 node dont have children, and its siblings has children,
// and colorRange is set on level-1, then the node can not be colored.
// So we separate 'colorRange' and 'color' to different attributes.


function getRangeVisual(nodeModel, name) {
  // 'colorRange', 'colorARange', 'colorSRange'.
  // If not exsits on this node, fetch from levels and series.
  var range = nodeModel.get(name);
  return isArray(range) && range.length ? {
    name: name,
    range: range
  } : null;
}

function mapVisual(nodeModel, visuals, child, index, mapping, seriesModel) {
  var childVisuals = zrUtil.extend({}, visuals);

  if (mapping) {
    var mappingType = mapping.type;
    var colorMappingBy = mappingType === 'color' && mapping.__drColorMappingBy;
    var value = colorMappingBy === 'index' ? index : colorMappingBy === 'id' ? seriesModel.mapIdToIndex(child.getId()) : child.getValue(nodeModel.get('visualDimension'));
    childVisuals[mappingType] = mapping.mapValueToVisual(value);
  }

  return childVisuals;
}

module.exports = _default;

/***/ }),

/***/ "928d":
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

var SeriesModel = __webpack_require__("4f85");

var Tree = __webpack_require__("06c7");

var Model = __webpack_require__("4319");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;
var addCommas = _format.addCommas;

var _treeHelper = __webpack_require__("55ac");

var wrapTreePathInfo = _treeHelper.wrapTreePathInfo;

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
var _default = SeriesModel.extend({
  type: 'series.treemap',
  layoutMode: 'box',
  dependencies: ['grid', 'polar'],
  preventUsingHoverLayer: true,

  /**
   * @type {module:echarts/data/Tree~Node}
   */
  _viewRoot: null,
  defaultOption: {
    // Disable progressive rendering
    progressive: 0,
    // center: ['50%', '50%'],          // not supported in ec3.
    // size: ['80%', '80%'],            // deprecated, compatible with ec2.
    left: 'center',
    top: 'middle',
    right: null,
    bottom: null,
    width: '80%',
    height: '80%',
    sort: true,
    // Can be null or false or true
    // (order by desc default, asc not supported yet (strange effect))
    clipWindow: 'origin',
    // Size of clipped window when zooming. 'origin' or 'fullscreen'
    squareRatio: 0.5 * (1 + Math.sqrt(5)),
    // golden ratio
    leafDepth: null,
    // Nodes on depth from root are regarded as leaves.
    // Count from zero (zero represents only view root).
    drillDownIcon: '▶',
    // Use html character temporarily because it is complicated
    // to align specialized icon. ▷▶❒❐▼✚
    zoomToNodeRatio: 0.32 * 0.32,
    // Be effective when using zoomToNode. Specify the proportion of the
    // target node area in the view area.
    roam: true,
    // true, false, 'scale' or 'zoom', 'move'.
    nodeClick: 'zoomToNode',
    // Leaf node click behaviour: 'zoomToNode', 'link', false.
    // If leafDepth is set and clicking a node which has children but
    // be on left depth, the behaviour would be changing root. Otherwise
    // use behavious defined above.
    animation: true,
    animationDurationUpdate: 900,
    animationEasing: 'quinticInOut',
    breadcrumb: {
      show: true,
      height: 22,
      left: 'center',
      top: 'bottom',
      // right
      // bottom
      emptyItemWidth: 25,
      // Width of empty node.
      itemStyle: {
        color: 'rgba(0,0,0,0.7)',
        //'#5793f3',
        borderColor: 'rgba(255,255,255,0.7)',
        borderWidth: 1,
        shadowColor: 'rgba(150,150,150,1)',
        shadowBlur: 3,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        textStyle: {
          color: '#fff'
        }
      },
      emphasis: {
        textStyle: {}
      }
    },
    label: {
      show: true,
      // Do not use textDistance, for ellipsis rect just the same as treemap node rect.
      distance: 0,
      padding: 5,
      position: 'inside',
      // Can be [5, '5%'] or position stirng like 'insideTopLeft', ...
      // formatter: null,
      color: '#fff',
      ellipsis: true // align
      // verticalAlign

    },
    upperLabel: {
      // Label when node is parent.
      show: false,
      position: [0, '50%'],
      height: 20,
      // formatter: null,
      color: '#fff',
      ellipsis: true,
      // align: null,
      verticalAlign: 'middle'
    },
    itemStyle: {
      color: null,
      // Can be 'none' if not necessary.
      colorAlpha: null,
      // Can be 'none' if not necessary.
      colorSaturation: null,
      // Can be 'none' if not necessary.
      borderWidth: 0,
      gapWidth: 0,
      borderColor: '#fff',
      borderColorSaturation: null // If specified, borderColor will be ineffective, and the
      // border color is evaluated by color of current node and
      // borderColorSaturation.

    },
    emphasis: {
      upperLabel: {
        show: true,
        position: [0, '50%'],
        color: '#fff',
        ellipsis: true,
        verticalAlign: 'middle'
      }
    },
    visualDimension: 0,
    // Can be 0, 1, 2, 3.
    visualMin: null,
    visualMax: null,
    color: [],
    // + treemapSeries.color should not be modified. Please only modified
    // level[n].color (if necessary).
    // + Specify color list of each level. level[0].color would be global
    // color list if not specified. (see method `setDefault`).
    // + But set as a empty array to forbid fetch color from global palette
    // when using nodeModel.get('color'), otherwise nodes on deep level
    // will always has color palette set and are not able to inherit color
    // from parent node.
    // + TreemapSeries.color can not be set as 'none', otherwise effect
    // legend color fetching (see seriesColor.js).
    colorAlpha: null,
    // Array. Specify color alpha range of each level, like [0.2, 0.8]
    colorSaturation: null,
    // Array. Specify color saturation of each level, like [0.2, 0.5]
    colorMappingBy: 'index',
    // 'value' or 'index' or 'id'.
    visibleMin: 10,
    // If area less than this threshold (unit: pixel^2), node will not
    // be rendered. Only works when sort is 'asc' or 'desc'.
    childrenVisibleMin: null,
    // If area of a node less than this threshold (unit: pixel^2),
    // grandchildren will not show.
    // Why grandchildren? If not grandchildren but children,
    // some siblings show children and some not,
    // the appearance may be mess and not consistent,
    levels: [] // Each item: {
    //     visibleMin, itemStyle, visualDimension, label
    // }
    // data: {
    //      value: [],
    //      children: [],
    //      link: 'http://xxx.xxx.xxx',
    //      target: 'blank' or 'self'
    // }

  },

  /**
   * @override
   */
  getInitialData: function (option, ecModel) {
    // Create a virtual root.
    var root = {
      name: option.name,
      children: option.data
    };
    completeTreeValue(root);
    var levels = option.levels || [];
    levels = option.levels = setDefault(levels, ecModel);
    var treeOption = {};
    treeOption.levels = levels; // Make sure always a new tree is created when setOption,
    // in TreemapView, we check whether oldTree === newTree
    // to choose mappings approach among old shapes and new shapes.

    return Tree.createTree(root, this, treeOption).data;
  },
  optionUpdated: function () {
    this.resetViewRoot();
  },

  /**
   * @override
   * @param {number} dataIndex
   * @param {boolean} [mutipleSeries=false]
   */
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var value = this.getRawValue(dataIndex);
    var formattedValue = zrUtil.isArray(value) ? addCommas(value[0]) : addCommas(value);
    var name = data.getName(dataIndex);
    return encodeHTML(name + ': ' + formattedValue);
  },

  /**
   * Add tree path to tooltip param
   *
   * @override
   * @param {number} dataIndex
   * @return {Object}
   */
  getDataParams: function (dataIndex) {
    var params = SeriesModel.prototype.getDataParams.apply(this, arguments);
    var node = this.getData().tree.getNodeByDataIndex(dataIndex);
    params.treePathInfo = wrapTreePathInfo(node, this);
    return params;
  },

  /**
   * @public
   * @param {Object} layoutInfo {
   *                                x: containerGroup x
   *                                y: containerGroup y
   *                                width: containerGroup width
   *                                height: containerGroup height
   *                            }
   */
  setLayoutInfo: function (layoutInfo) {
    /**
     * @readOnly
     * @type {Object}
     */
    this.layoutInfo = this.layoutInfo || {};
    zrUtil.extend(this.layoutInfo, layoutInfo);
  },

  /**
   * @param  {string} id
   * @return {number} index
   */
  mapIdToIndex: function (id) {
    // A feature is implemented:
    // index is monotone increasing with the sequence of
    // input id at the first time.
    // This feature can make sure that each data item and its
    // mapped color have the same index between data list and
    // color list at the beginning, which is useful for user
    // to adjust data-color mapping.

    /**
     * @private
     * @type {Object}
     */
    var idIndexMap = this._idIndexMap;

    if (!idIndexMap) {
      idIndexMap = this._idIndexMap = zrUtil.createHashMap();
      /**
       * @private
       * @type {number}
       */

      this._idIndexMapCount = 0;
    }

    var index = idIndexMap.get(id);

    if (index == null) {
      idIndexMap.set(id, index = this._idIndexMapCount++);
    }

    return index;
  },
  getViewRoot: function () {
    return this._viewRoot;
  },

  /**
   * @param {module:echarts/data/Tree~Node} [viewRoot]
   */
  resetViewRoot: function (viewRoot) {
    viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
    var root = this.getRawData().tree.root;

    if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
      this._viewRoot = root;
    }
  }
});
/**
 * @param {Object} dataNode
 */


function completeTreeValue(dataNode) {
  // Postorder travel tree.
  // If value of none-leaf node is not set,
  // calculate it by suming up the value of all children.
  var sum = 0;
  zrUtil.each(dataNode.children, function (child) {
    completeTreeValue(child);
    var childValue = child.value;
    zrUtil.isArray(childValue) && (childValue = childValue[0]);
    sum += childValue;
  });
  var thisValue = dataNode.value;

  if (zrUtil.isArray(thisValue)) {
    thisValue = thisValue[0];
  }

  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum;
  } // Value should not less than 0.


  if (thisValue < 0) {
    thisValue = 0;
  }

  zrUtil.isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}
/**
 * set default to level configuration
 */


function setDefault(levels, ecModel) {
  var globalColorList = ecModel.get('color');

  if (!globalColorList) {
    return;
  }

  levels = levels || [];
  var hasColorDefine;
  zrUtil.each(levels, function (levelDefine) {
    var model = new Model(levelDefine);
    var modelColor = model.get('color');

    if (model.get('itemStyle.color') || modelColor && modelColor !== 'none') {
      hasColorDefine = true;
    }
  });

  if (!hasColorDefine) {
    var level0 = levels[0] || (levels[0] = {});
    level0.color = globalColorList.slice();
  }

  return levels;
}

module.exports = _default;

/***/ }),

/***/ "9ca8":
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

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;
var MAX_SAFE_INTEGER = _number.MAX_SAFE_INTEGER;

var layout = __webpack_require__("f934");

var helper = __webpack_require__("55ac");

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
* A third-party license is embeded for some of the code in this file:
* The treemap layout implementation was originally copied from
* "d3.js" with some modifications made for this project.
* (See more details in the comment of the method "squarify" below.)
* The use of the source code of this file is also subject to the terms
* and consitions of the license of "d3.js" (BSD-3Clause, see
* </licenses/LICENSE-d3>).
*/
var mathMax = Math.max;
var mathMin = Math.min;
var retrieveValue = zrUtil.retrieve;
var each = zrUtil.each;
var PATH_BORDER_WIDTH = ['itemStyle', 'borderWidth'];
var PATH_GAP_WIDTH = ['itemStyle', 'gapWidth'];
var PATH_UPPER_LABEL_SHOW = ['upperLabel', 'show'];
var PATH_UPPER_LABEL_HEIGHT = ['upperLabel', 'height'];
/**
 * @public
 */

var _default = {
  seriesType: 'treemap',
  reset: function (seriesModel, ecModel, api, payload) {
    // Layout result in each node:
    // {x, y, width, height, area, borderWidth}
    var ecWidth = api.getWidth();
    var ecHeight = api.getHeight();
    var seriesOption = seriesModel.option;
    var layoutInfo = layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });
    var size = seriesOption.size || []; // Compatible with ec2.

    var containerWidth = parsePercent(retrieveValue(layoutInfo.width, size[0]), ecWidth);
    var containerHeight = parsePercent(retrieveValue(layoutInfo.height, size[1]), ecHeight); // Fetch payload info.

    var payloadType = payload && payload.type;
    var types = ['treemapZoomToNode', 'treemapRootToNode'];
    var targetInfo = helper.retrieveTargetInfo(payload, types, seriesModel);
    var rootRect = payloadType === 'treemapRender' || payloadType === 'treemapMove' ? payload.rootRect : null;
    var viewRoot = seriesModel.getViewRoot();
    var viewAbovePath = helper.getPathToRoot(viewRoot);

    if (payloadType !== 'treemapMove') {
      var rootSize = payloadType === 'treemapZoomToNode' ? estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) : rootRect ? [rootRect.width, rootRect.height] : [containerWidth, containerHeight];
      var sort = seriesOption.sort;

      if (sort && sort !== 'asc' && sort !== 'desc') {
        sort = 'desc';
      }

      var options = {
        squareRatio: seriesOption.squareRatio,
        sort: sort,
        leafDepth: seriesOption.leafDepth
      }; // layout should be cleared because using updateView but not update.

      viewRoot.hostTree.clearLayouts(); // TODO
      // optimize: if out of view clip, do not layout.
      // But take care that if do not render node out of view clip,
      // how to calculate start po

      var viewRootLayout = {
        x: 0,
        y: 0,
        width: rootSize[0],
        height: rootSize[1],
        area: rootSize[0] * rootSize[1]
      };
      viewRoot.setLayout(viewRootLayout);
      squarify(viewRoot, options, false, 0); // Supplement layout.

      var viewRootLayout = viewRoot.getLayout();
      each(viewAbovePath, function (node, index) {
        var childValue = (viewAbovePath[index + 1] || viewRoot).getValue();
        node.setLayout(zrUtil.extend({
          dataExtent: [childValue, childValue],
          borderWidth: 0,
          upperHeight: 0
        }, viewRootLayout));
      });
    }

    var treeRoot = seriesModel.getData().tree.root;
    treeRoot.setLayout(calculateRootPosition(layoutInfo, rootRect, targetInfo), true);
    seriesModel.setLayoutInfo(layoutInfo); // FIXME
    // 现在没有clip功能，暂时取ec高宽。

    prunning(treeRoot, // Transform to base element coordinate system.
    new BoundingRect(-layoutInfo.x, -layoutInfo.y, ecWidth, ecHeight), viewAbovePath, viewRoot, 0);
  }
};
/**
 * Layout treemap with squarify algorithm.
 * The original presentation of this algorithm
 * was made by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
 * <https://graphics.ethz.ch/teaching/scivis_common/Literature/squarifiedTreeMaps.pdf>.
 * The implementation of this algorithm was originally copied from "d3.js"
 * <https://github.com/d3/d3/blob/9cc9a875e636a1dcf36cc1e07bdf77e1ad6e2c74/src/layout/treemap.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 *
 * @protected
 * @param {module:echarts/data/Tree~TreeNode} node
 * @param {Object} options
 * @param {string} options.sort 'asc' or 'desc'
 * @param {number} options.squareRatio
 * @param {boolean} hideChildren
 * @param {number} depth
 */

function squarify(node, options, hideChildren, depth) {
  var width;
  var height;

  if (node.isRemoved()) {
    return;
  }

  var thisLayout = node.getLayout();
  width = thisLayout.width;
  height = thisLayout.height; // Considering border and gap

  var nodeModel = node.getModel();
  var borderWidth = nodeModel.get(PATH_BORDER_WIDTH);
  var halfGapWidth = nodeModel.get(PATH_GAP_WIDTH) / 2;
  var upperLabelHeight = getUpperLabelHeight(nodeModel);
  var upperHeight = Math.max(borderWidth, upperLabelHeight);
  var layoutOffset = borderWidth - halfGapWidth;
  var layoutOffsetUpper = upperHeight - halfGapWidth;
  var nodeModel = node.getModel();
  node.setLayout({
    borderWidth: borderWidth,
    upperHeight: upperHeight,
    upperLabelHeight: upperLabelHeight
  }, true);
  width = mathMax(width - 2 * layoutOffset, 0);
  height = mathMax(height - layoutOffset - layoutOffsetUpper, 0);
  var totalArea = width * height;
  var viewChildren = initChildren(node, nodeModel, totalArea, options, hideChildren, depth);

  if (!viewChildren.length) {
    return;
  }

  var rect = {
    x: layoutOffset,
    y: layoutOffsetUpper,
    width: width,
    height: height
  };
  var rowFixedLength = mathMin(width, height);
  var best = Infinity; // the best row score so far

  var row = [];
  row.area = 0;

  for (var i = 0, len = viewChildren.length; i < len;) {
    var child = viewChildren[i];
    row.push(child);
    row.area += child.getLayout().area;
    var score = worst(row, rowFixedLength, options.squareRatio); // continue with this orientation

    if (score <= best) {
      i++;
      best = score;
    } // abort, and try a different orientation
    else {
        row.area -= row.pop().getLayout().area;
        position(row, rowFixedLength, rect, halfGapWidth, false);
        rowFixedLength = mathMin(rect.width, rect.height);
        row.length = row.area = 0;
        best = Infinity;
      }
  }

  if (row.length) {
    position(row, rowFixedLength, rect, halfGapWidth, true);
  }

  if (!hideChildren) {
    var childrenVisibleMin = nodeModel.get('childrenVisibleMin');

    if (childrenVisibleMin != null && totalArea < childrenVisibleMin) {
      hideChildren = true;
    }
  }

  for (var i = 0, len = viewChildren.length; i < len; i++) {
    squarify(viewChildren[i], options, hideChildren, depth + 1);
  }
}
/**
 * Set area to each child, and calculate data extent for visual coding.
 */


function initChildren(node, nodeModel, totalArea, options, hideChildren, depth) {
  var viewChildren = node.children || [];
  var orderBy = options.sort;
  orderBy !== 'asc' && orderBy !== 'desc' && (orderBy = null);
  var overLeafDepth = options.leafDepth != null && options.leafDepth <= depth; // leafDepth has higher priority.

  if (hideChildren && !overLeafDepth) {
    return node.viewChildren = [];
  } // Sort children, order by desc.


  viewChildren = zrUtil.filter(viewChildren, function (child) {
    return !child.isRemoved();
  });
  sort(viewChildren, orderBy);
  var info = statistic(nodeModel, viewChildren, orderBy);

  if (info.sum === 0) {
    return node.viewChildren = [];
  }

  info.sum = filterByThreshold(nodeModel, totalArea, info.sum, orderBy, viewChildren);

  if (info.sum === 0) {
    return node.viewChildren = [];
  } // Set area to each child.


  for (var i = 0, len = viewChildren.length; i < len; i++) {
    var area = viewChildren[i].getValue() / info.sum * totalArea; // Do not use setLayout({...}, true), because it is needed to clear last layout.

    viewChildren[i].setLayout({
      area: area
    });
  }

  if (overLeafDepth) {
    viewChildren.length && node.setLayout({
      isLeafRoot: true
    }, true);
    viewChildren.length = 0;
  }

  node.viewChildren = viewChildren;
  node.setLayout({
    dataExtent: info.dataExtent
  }, true);
  return viewChildren;
}
/**
 * Consider 'visibleMin'. Modify viewChildren and get new sum.
 */


function filterByThreshold(nodeModel, totalArea, sum, orderBy, orderedChildren) {
  // visibleMin is not supported yet when no option.sort.
  if (!orderBy) {
    return sum;
  }

  var visibleMin = nodeModel.get('visibleMin');
  var len = orderedChildren.length;
  var deletePoint = len; // Always travel from little value to big value.

  for (var i = len - 1; i >= 0; i--) {
    var value = orderedChildren[orderBy === 'asc' ? len - i - 1 : i].getValue();

    if (value / sum * totalArea < visibleMin) {
      deletePoint = i;
      sum -= value;
    }
  }

  orderBy === 'asc' ? orderedChildren.splice(0, len - deletePoint) : orderedChildren.splice(deletePoint, len - deletePoint);
  return sum;
}
/**
 * Sort
 */


function sort(viewChildren, orderBy) {
  if (orderBy) {
    viewChildren.sort(function (a, b) {
      var diff = orderBy === 'asc' ? a.getValue() - b.getValue() : b.getValue() - a.getValue();
      return diff === 0 ? orderBy === 'asc' ? a.dataIndex - b.dataIndex : b.dataIndex - a.dataIndex : diff;
    });
  }

  return viewChildren;
}
/**
 * Statistic
 */


function statistic(nodeModel, children, orderBy) {
  // Calculate sum.
  var sum = 0;

  for (var i = 0, len = children.length; i < len; i++) {
    sum += children[i].getValue();
  } // Statistic data extent for latter visual coding.
  // Notice: data extent should be calculate based on raw children
  // but not filtered view children, otherwise visual mapping will not
  // be stable when zoom (where children is filtered by visibleMin).


  var dimension = nodeModel.get('visualDimension');
  var dataExtent; // The same as area dimension.

  if (!children || !children.length) {
    dataExtent = [NaN, NaN];
  } else if (dimension === 'value' && orderBy) {
    dataExtent = [children[children.length - 1].getValue(), children[0].getValue()];
    orderBy === 'asc' && dataExtent.reverse();
  } // Other dimension.
  else {
      var dataExtent = [Infinity, -Infinity];
      each(children, function (child) {
        var value = child.getValue(dimension);
        value < dataExtent[0] && (dataExtent[0] = value);
        value > dataExtent[1] && (dataExtent[1] = value);
      });
    }

  return {
    sum: sum,
    dataExtent: dataExtent
  };
}
/**
 * Computes the score for the specified row,
 * as the worst aspect ratio.
 */


function worst(row, rowFixedLength, ratio) {
  var areaMax = 0;
  var areaMin = Infinity;

  for (var i = 0, area, len = row.length; i < len; i++) {
    area = row[i].getLayout().area;

    if (area) {
      area < areaMin && (areaMin = area);
      area > areaMax && (areaMax = area);
    }
  }

  var squareArea = row.area * row.area;
  var f = rowFixedLength * rowFixedLength * ratio;
  return squareArea ? mathMax(f * areaMax / squareArea, squareArea / (f * areaMin)) : Infinity;
}
/**
 * Positions the specified row of nodes. Modifies `rect`.
 */


function position(row, rowFixedLength, rect, halfGapWidth, flush) {
  // When rowFixedLength === rect.width,
  // it is horizontal subdivision,
  // rowFixedLength is the width of the subdivision,
  // rowOtherLength is the height of the subdivision,
  // and nodes will be positioned from left to right.
  // wh[idx0WhenH] means: when horizontal,
  //      wh[idx0WhenH] => wh[0] => 'width'.
  //      xy[idx1WhenH] => xy[1] => 'y'.
  var idx0WhenH = rowFixedLength === rect.width ? 0 : 1;
  var idx1WhenH = 1 - idx0WhenH;
  var xy = ['x', 'y'];
  var wh = ['width', 'height'];
  var last = rect[xy[idx0WhenH]];
  var rowOtherLength = rowFixedLength ? row.area / rowFixedLength : 0;

  if (flush || rowOtherLength > rect[wh[idx1WhenH]]) {
    rowOtherLength = rect[wh[idx1WhenH]]; // over+underflow
  }

  for (var i = 0, rowLen = row.length; i < rowLen; i++) {
    var node = row[i];
    var nodeLayout = {};
    var step = rowOtherLength ? node.getLayout().area / rowOtherLength : 0;
    var wh1 = nodeLayout[wh[idx1WhenH]] = mathMax(rowOtherLength - 2 * halfGapWidth, 0); // We use Math.max/min to avoid negative width/height when considering gap width.

    var remain = rect[xy[idx0WhenH]] + rect[wh[idx0WhenH]] - last;
    var modWH = i === rowLen - 1 || remain < step ? remain : step;
    var wh0 = nodeLayout[wh[idx0WhenH]] = mathMax(modWH - 2 * halfGapWidth, 0);
    nodeLayout[xy[idx1WhenH]] = rect[xy[idx1WhenH]] + mathMin(halfGapWidth, wh1 / 2);
    nodeLayout[xy[idx0WhenH]] = last + mathMin(halfGapWidth, wh0 / 2);
    last += modWH;
    node.setLayout(nodeLayout, true);
  }

  rect[xy[idx1WhenH]] += rowOtherLength;
  rect[wh[idx1WhenH]] -= rowOtherLength;
} // Return [containerWidth, containerHeight] as defualt.


function estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) {
  // If targetInfo.node exists, we zoom to the node,
  // so estimate whold width and heigth by target node.
  var currNode = (targetInfo || {}).node;
  var defaultSize = [containerWidth, containerHeight];

  if (!currNode || currNode === viewRoot) {
    return defaultSize;
  }

  var parent;
  var viewArea = containerWidth * containerHeight;
  var area = viewArea * seriesModel.option.zoomToNodeRatio;

  while (parent = currNode.parentNode) {
    // jshint ignore:line
    var sum = 0;
    var siblings = parent.children;

    for (var i = 0, len = siblings.length; i < len; i++) {
      sum += siblings[i].getValue();
    }

    var currNodeValue = currNode.getValue();

    if (currNodeValue === 0) {
      return defaultSize;
    }

    area *= sum / currNodeValue; // Considering border, suppose aspect ratio is 1.

    var parentModel = parent.getModel();
    var borderWidth = parentModel.get(PATH_BORDER_WIDTH);
    var upperHeight = Math.max(borderWidth, getUpperLabelHeight(parentModel, borderWidth));
    area += 4 * borderWidth * borderWidth + (3 * borderWidth + upperHeight) * Math.pow(area, 0.5);
    area > MAX_SAFE_INTEGER && (area = MAX_SAFE_INTEGER);
    currNode = parent;
  }

  area < viewArea && (area = viewArea);
  var scale = Math.pow(area / viewArea, 0.5);
  return [containerWidth * scale, containerHeight * scale];
} // Root postion base on coord of containerGroup


function calculateRootPosition(layoutInfo, rootRect, targetInfo) {
  if (rootRect) {
    return {
      x: rootRect.x,
      y: rootRect.y
    };
  }

  var defaultPosition = {
    x: 0,
    y: 0
  };

  if (!targetInfo) {
    return defaultPosition;
  } // If targetInfo is fetched by 'retrieveTargetInfo',
  // old tree and new tree are the same tree,
  // so the node still exists and we can visit it.


  var targetNode = targetInfo.node;
  var layout = targetNode.getLayout();

  if (!layout) {
    return defaultPosition;
  } // Transform coord from local to container.


  var targetCenter = [layout.width / 2, layout.height / 2];
  var node = targetNode;

  while (node) {
    var nodeLayout = node.getLayout();
    targetCenter[0] += nodeLayout.x;
    targetCenter[1] += nodeLayout.y;
    node = node.parentNode;
  }

  return {
    x: layoutInfo.width / 2 - targetCenter[0],
    y: layoutInfo.height / 2 - targetCenter[1]
  };
} // Mark nodes visible for prunning when visual coding and rendering.
// Prunning depends on layout and root position, so we have to do it after layout.


function prunning(node, clipRect, viewAbovePath, viewRoot, depth) {
  var nodeLayout = node.getLayout();
  var nodeInViewAbovePath = viewAbovePath[depth];
  var isAboveViewRoot = nodeInViewAbovePath && nodeInViewAbovePath === node;

  if (nodeInViewAbovePath && !isAboveViewRoot || depth === viewAbovePath.length && node !== viewRoot) {
    return;
  }

  node.setLayout({
    // isInView means: viewRoot sub tree + viewAbovePath
    isInView: true,
    // invisible only means: outside view clip so that the node can not
    // see but still layout for animation preparation but not render.
    invisible: !isAboveViewRoot && !clipRect.intersect(nodeLayout),
    isAboveViewRoot: isAboveViewRoot
  }, true); // Transform to child coordinate.

  var childClipRect = new BoundingRect(clipRect.x - nodeLayout.x, clipRect.y - nodeLayout.y, clipRect.width, clipRect.height);
  each(node.viewChildren || [], function (child) {
    prunning(child, childClipRect, viewAbovePath, viewRoot, depth + 1);
  });
}

function getUpperLabelHeight(model) {
  return model.get(PATH_UPPER_LABEL_SHOW) ? model.get(PATH_UPPER_LABEL_HEIGHT) : 0;
}

module.exports = _default;

/***/ }),

/***/ "aa01":
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

var SeriesModel = __webpack_require__("4f85");

var Tree = __webpack_require__("06c7");

var _treeHelper = __webpack_require__("55ac");

var wrapTreePathInfo = _treeHelper.wrapTreePathInfo;

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
var _default = SeriesModel.extend({
  type: 'series.sunburst',

  /**
   * @type {module:echarts/data/Tree~Node}
   */
  _viewRoot: null,
  getInitialData: function (option, ecModel) {
    // Create a virtual root.
    var root = {
      name: option.name,
      children: option.data
    };
    completeTreeValue(root);
    var levels = option.levels || []; // levels = option.levels = setDefault(levels, ecModel);

    var treeOption = {};
    treeOption.levels = levels; // Make sure always a new tree is created when setOption,
    // in TreemapView, we check whether oldTree === newTree
    // to choose mappings approach among old shapes and new shapes.

    return Tree.createTree(root, this, treeOption).data;
  },
  optionUpdated: function () {
    this.resetViewRoot();
  },

  /*
   * @override
   */
  getDataParams: function (dataIndex) {
    var params = SeriesModel.prototype.getDataParams.apply(this, arguments);
    var node = this.getData().tree.getNodeByDataIndex(dataIndex);
    params.treePathInfo = wrapTreePathInfo(node, this);
    return params;
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    // 默认全局居中
    center: ['50%', '50%'],
    radius: [0, '75%'],
    // 默认顺时针
    clockwise: true,
    startAngle: 90,
    // 最小角度改为0
    minAngle: 0,
    percentPrecision: 2,
    // If still show when all data zero.
    stillShowZeroSum: true,
    // Policy of highlighting pieces when hover on one
    // Valid values: 'none' (for not downplay others), 'descendant',
    // 'ancestor', 'self'
    highlightPolicy: 'descendant',
    // 'rootToNode', 'link', or false
    nodeClick: 'rootToNode',
    renderLabelForZeroData: false,
    label: {
      // could be: 'radial', 'tangential', or 'none'
      rotate: 'radial',
      show: true,
      opacity: 1,
      // 'left' is for inner side of inside, and 'right' is for outter
      // side for inside
      align: 'center',
      position: 'inside',
      distance: 5,
      silent: true,
      emphasis: {}
    },
    itemStyle: {
      borderWidth: 1,
      borderColor: 'white',
      borderType: 'solid',
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1,
      emphasis: {},
      highlight: {
        opacity: 1
      },
      downplay: {
        opacity: 0.9
      }
    },
    // Animation type canbe expansion, scale
    animationType: 'expansion',
    animationDuration: 1000,
    animationDurationUpdate: 500,
    animationEasing: 'cubicOut',
    data: [],
    levels: [],

    /**
     * Sort order.
     *
     * Valid values: 'desc', 'asc', null, or callback function.
     * 'desc' and 'asc' for descend and ascendant order;
     * null for not sorting;
     * example of callback function:
     * function(nodeA, nodeB) {
     *     return nodeA.getValue() - nodeB.getValue();
     * }
     */
    sort: 'desc'
  },
  getViewRoot: function () {
    return this._viewRoot;
  },

  /**
   * @param {module:echarts/data/Tree~Node} [viewRoot]
   */
  resetViewRoot: function (viewRoot) {
    viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
    var root = this.getRawData().tree.root;

    if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
      this._viewRoot = root;
    }
  }
});
/**
 * @param {Object} dataNode
 */


function completeTreeValue(dataNode) {
  // Postorder travel tree.
  // If value of none-leaf node is not set,
  // calculate it by suming up the value of all children.
  var sum = 0;
  zrUtil.each(dataNode.children, function (child) {
    completeTreeValue(child);
    var childValue = child.value;
    zrUtil.isArray(childValue) && (childValue = childValue[0]);
    sum += childValue;
  });
  var thisValue = dataNode.value;

  if (zrUtil.isArray(thisValue)) {
    thisValue = thisValue[0];
  }

  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum;
  } // Value should not less than 0.


  if (thisValue < 0) {
    thisValue = 0;
  }

  zrUtil.isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}

module.exports = _default;

/***/ }),

/***/ "adf4":
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

var SeriesModel = __webpack_require__("4f85");

var createDimensions = __webpack_require__("b1d4");

var _dimensionHelper = __webpack_require__("2f45");

var getDimensionTypeByAxis = _dimensionHelper.getDimensionTypeByAxis;

var List = __webpack_require__("6179");

var zrUtil = __webpack_require__("6d8b");

var _model = __webpack_require__("e0d3");

var groupData = _model.groupData;

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

var LegendVisualProvider = __webpack_require__("c4a3");

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
var DATA_NAME_INDEX = 2;
var ThemeRiverSeries = SeriesModel.extend({
  type: 'series.themeRiver',
  dependencies: ['singleAxis'],

  /**
   * @readOnly
   * @type {module:zrender/core/util#HashMap}
   */
  nameMap: null,

  /**
   * @override
   */
  init: function (option) {
    // eslint-disable-next-line
    ThemeRiverSeries.superApply(this, 'init', arguments); // Put this function here is for the sake of consistency of code style.
    // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));
  },

  /**
   * If there is no value of a certain point in the time for some event,set it value to 0.
   *
   * @param {Array} data  initial data in the option
   * @return {Array}
   */
  fixData: function (data) {
    var rawDataLength = data.length; // grouped data by name

    var groupResult = groupData(data, function (item) {
      return item[2];
    });
    var layData = [];
    groupResult.buckets.each(function (items, key) {
      layData.push({
        name: key,
        dataList: items
      });
    });
    var layerNum = layData.length;
    var largestLayer = -1;
    var index = -1;

    for (var i = 0; i < layerNum; ++i) {
      var len = layData[i].dataList.length;

      if (len > largestLayer) {
        largestLayer = len;
        index = i;
      }
    }

    for (var k = 0; k < layerNum; ++k) {
      if (k === index) {
        continue;
      }

      var name = layData[k].name;

      for (var j = 0; j < largestLayer; ++j) {
        var timeValue = layData[index].dataList[j][0];
        var length = layData[k].dataList.length;
        var keyIndex = -1;

        for (var l = 0; l < length; ++l) {
          var value = layData[k].dataList[l][0];

          if (value === timeValue) {
            keyIndex = l;
            break;
          }
        }

        if (keyIndex === -1) {
          data[rawDataLength] = [];
          data[rawDataLength][0] = timeValue;
          data[rawDataLength][1] = 0;
          data[rawDataLength][2] = name;
          rawDataLength++;
        }
      }
    }

    return data;
  },

  /**
   * @override
   * @param  {Object} option  the initial option that user gived
   * @param  {module:echarts/model/Model} ecModel  the model object for themeRiver option
   * @return {module:echarts/data/List}
   */
  getInitialData: function (option, ecModel) {
    var singleAxisModel = ecModel.queryComponents({
      mainType: 'singleAxis',
      index: this.get('singleAxisIndex'),
      id: this.get('singleAxisId')
    })[0];
    var axisType = singleAxisModel.get('type'); // filter the data item with the value of label is undefined

    var filterData = zrUtil.filter(option.data, function (dataItem) {
      return dataItem[2] !== undefined;
    }); // ??? TODO design a stage to transfer data for themeRiver and lines?

    var data = this.fixData(filterData || []);
    var nameList = [];
    var nameMap = this.nameMap = zrUtil.createHashMap();
    var count = 0;

    for (var i = 0; i < data.length; ++i) {
      nameList.push(data[i][DATA_NAME_INDEX]);

      if (!nameMap.get(data[i][DATA_NAME_INDEX])) {
        nameMap.set(data[i][DATA_NAME_INDEX], count);
        count++;
      }
    }

    var dimensionsInfo = createDimensions(data, {
      coordDimensions: ['single'],
      dimensionsDefine: [{
        name: 'time',
        type: getDimensionTypeByAxis(axisType)
      }, {
        name: 'value',
        type: 'float'
      }, {
        name: 'name',
        type: 'ordinal'
      }],
      encodeDefine: {
        single: 0,
        value: 1,
        itemName: 2
      }
    });
    var list = new List(dimensionsInfo, this);
    list.initData(data);
    return list;
  },

  /**
   * The raw data is divided into multiple layers and each layer
   *     has same name.
   *
   * @return {Array.<Array.<number>>}
   */
  getLayerSeries: function () {
    var data = this.getData();
    var lenCount = data.count();
    var indexArr = [];

    for (var i = 0; i < lenCount; ++i) {
      indexArr[i] = i;
    }

    var timeDim = data.mapDimension('single'); // data group by name

    var groupResult = groupData(indexArr, function (index) {
      return data.get('name', index);
    });
    var layerSeries = [];
    groupResult.buckets.each(function (items, key) {
      items.sort(function (index1, index2) {
        return data.get(timeDim, index1) - data.get(timeDim, index2);
      });
      layerSeries.push({
        name: key,
        indices: items
      });
    });
    return layerSeries;
  },

  /**
   * Get data indices for show tooltip content
    * @param {Array.<string>|string} dim  single coordinate dimension
   * @param {number} value axis value
   * @param {module:echarts/coord/single/SingleAxis} baseAxis  single Axis used
   *     the themeRiver.
   * @return {Object} {dataIndices, nestestValue}
   */
  getAxisTooltipData: function (dim, value, baseAxis) {
    if (!zrUtil.isArray(dim)) {
      dim = dim ? [dim] : [];
    }

    var data = this.getData();
    var layerSeries = this.getLayerSeries();
    var indices = [];
    var layerNum = layerSeries.length;
    var nestestValue;

    for (var i = 0; i < layerNum; ++i) {
      var minDist = Number.MAX_VALUE;
      var nearestIdx = -1;
      var pointNum = layerSeries[i].indices.length;

      for (var j = 0; j < pointNum; ++j) {
        var theValue = data.get(dim[0], layerSeries[i].indices[j]);
        var dist = Math.abs(theValue - value);

        if (dist <= minDist) {
          nestestValue = theValue;
          minDist = dist;
          nearestIdx = layerSeries[i].indices[j];
        }
      }

      indices.push(nearestIdx);
    }

    return {
      dataIndices: indices,
      nestestValue: nestestValue
    };
  },

  /**
   * @override
   * @param {number} dataIndex  index of data
   */
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var htmlName = data.getName(dataIndex);
    var htmlValue = data.get(data.mapDimension('value'), dataIndex);

    if (isNaN(htmlValue) || htmlValue == null) {
      htmlValue = '-';
    }

    return encodeHTML(htmlName + ' : ' + htmlValue);
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'singleAxis',
    // gap in axis's orthogonal orientation
    boundaryGap: ['10%', '10%'],
    // legendHoverLink: true,
    singleAxisIndex: 0,
    animationEasing: 'linear',
    label: {
      margin: 4,
      show: true,
      position: 'left',
      color: '#000',
      fontSize: 11
    },
    emphasis: {
      label: {
        show: true
      }
    }
  }
});
var _default = ThemeRiverSeries;
module.exports = _default;

/***/ }),

/***/ "b369":
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

var graphic = __webpack_require__("2306");

var DataDiffer = __webpack_require__("80f0");

var helper = __webpack_require__("55ac");

var Breadcrumb = __webpack_require__("f610");

var RoamController = __webpack_require__("4a01");

var BoundingRect = __webpack_require__("9850");

var matrix = __webpack_require__("1687");

var animationUtil = __webpack_require__("e6cd");

var makeStyleMapper = __webpack_require__("282b");

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
var bind = zrUtil.bind;
var Group = graphic.Group;
var Rect = graphic.Rect;
var each = zrUtil.each;
var DRAG_THRESHOLD = 3;
var PATH_LABEL_NOAMAL = ['label'];
var PATH_LABEL_EMPHASIS = ['emphasis', 'label'];
var PATH_UPPERLABEL_NORMAL = ['upperLabel'];
var PATH_UPPERLABEL_EMPHASIS = ['emphasis', 'upperLabel'];
var Z_BASE = 10; // Should bigger than every z.

var Z_BG = 1;
var Z_CONTENT = 2;
var getItemStyleEmphasis = makeStyleMapper([['fill', 'color'], // `borderColor` and `borderWidth` has been occupied,
// so use `stroke` to indicate the stroke of the rect.
['stroke', 'strokeColor'], ['lineWidth', 'strokeWidth'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);

var getItemStyleNormal = function (model) {
  // Normal style props should include emphasis style props.
  var itemStyle = getItemStyleEmphasis(model); // Clear styles set by emphasis.

  itemStyle.stroke = itemStyle.fill = itemStyle.lineWidth = null;
  return itemStyle;
};

var _default = echarts.extendChartView({
  type: 'treemap',

  /**
   * @override
   */
  init: function (o, api) {
    /**
     * @private
     * @type {module:zrender/container/Group}
     */
    this._containerGroup;
    /**
     * @private
     * @type {Object.<string, Array.<module:zrender/container/Group>>}
     */

    this._storage = createStorage();
    /**
     * @private
     * @type {module:echarts/data/Tree}
     */

    this._oldTree;
    /**
     * @private
     * @type {module:echarts/chart/treemap/Breadcrumb}
     */

    this._breadcrumb;
    /**
     * @private
     * @type {module:echarts/component/helper/RoamController}
     */

    this._controller;
    /**
     * 'ready', 'animating'
     * @private
     */

    this._state = 'ready';
  },

  /**
   * @override
   */
  render: function (seriesModel, ecModel, api, payload) {
    var models = ecModel.findComponents({
      mainType: 'series',
      subType: 'treemap',
      query: payload
    });

    if (zrUtil.indexOf(models, seriesModel) < 0) {
      return;
    }

    this.seriesModel = seriesModel;
    this.api = api;
    this.ecModel = ecModel;
    var types = ['treemapZoomToNode', 'treemapRootToNode'];
    var targetInfo = helper.retrieveTargetInfo(payload, types, seriesModel);
    var payloadType = payload && payload.type;
    var layoutInfo = seriesModel.layoutInfo;
    var isInit = !this._oldTree;
    var thisStorage = this._storage; // Mark new root when action is treemapRootToNode.

    var reRoot = payloadType === 'treemapRootToNode' && targetInfo && thisStorage ? {
      rootNodeGroup: thisStorage.nodeGroup[targetInfo.node.getRawIndex()],
      direction: payload.direction
    } : null;

    var containerGroup = this._giveContainerGroup(layoutInfo);

    var renderResult = this._doRender(containerGroup, seriesModel, reRoot);

    !isInit && (!payloadType || payloadType === 'treemapZoomToNode' || payloadType === 'treemapRootToNode') ? this._doAnimation(containerGroup, renderResult, seriesModel, reRoot) : renderResult.renderFinally();

    this._resetController(api);

    this._renderBreadcrumb(seriesModel, api, targetInfo);
  },

  /**
   * @private
   */
  _giveContainerGroup: function (layoutInfo) {
    var containerGroup = this._containerGroup;

    if (!containerGroup) {
      // FIXME
      // 加一层containerGroup是为了clip，但是现在clip功能并没有实现。
      containerGroup = this._containerGroup = new Group();

      this._initEvents(containerGroup);

      this.group.add(containerGroup);
    }

    containerGroup.attr('position', [layoutInfo.x, layoutInfo.y]);
    return containerGroup;
  },

  /**
   * @private
   */
  _doRender: function (containerGroup, seriesModel, reRoot) {
    var thisTree = seriesModel.getData().tree;
    var oldTree = this._oldTree; // Clear last shape records.

    var lastsForAnimation = createStorage();
    var thisStorage = createStorage();
    var oldStorage = this._storage;
    var willInvisibleEls = [];
    var doRenderNode = zrUtil.curry(renderNode, seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls); // Notice: when thisTree and oldTree are the same tree (see list.cloneShallow),
    // the oldTree is actually losted, so we can not find all of the old graphic
    // elements from tree. So we use this stragegy: make element storage, move
    // from old storage to new storage, clear old storage.

    dualTravel(thisTree.root ? [thisTree.root] : [], oldTree && oldTree.root ? [oldTree.root] : [], containerGroup, thisTree === oldTree || !oldTree, 0); // Process all removing.

    var willDeleteEls = clearStorage(oldStorage);
    this._oldTree = thisTree;
    this._storage = thisStorage;
    return {
      lastsForAnimation: lastsForAnimation,
      willDeleteEls: willDeleteEls,
      renderFinally: renderFinally
    };

    function dualTravel(thisViewChildren, oldViewChildren, parentGroup, sameTree, depth) {
      // When 'render' is triggered by action,
      // 'this' and 'old' may be the same tree,
      // we use rawIndex in that case.
      if (sameTree) {
        oldViewChildren = thisViewChildren;
        each(thisViewChildren, function (child, index) {
          !child.isRemoved() && processNode(index, index);
        });
      } // Diff hierarchically (diff only in each subtree, but not whole).
      // because, consistency of view is important.
      else {
          new DataDiffer(oldViewChildren, thisViewChildren, getKey, getKey).add(processNode).update(processNode).remove(zrUtil.curry(processNode, null)).execute();
        }

      function getKey(node) {
        // Identify by name or raw index.
        return node.getId();
      }

      function processNode(newIndex, oldIndex) {
        var thisNode = newIndex != null ? thisViewChildren[newIndex] : null;
        var oldNode = oldIndex != null ? oldViewChildren[oldIndex] : null;
        var group = doRenderNode(thisNode, oldNode, parentGroup, depth);
        group && dualTravel(thisNode && thisNode.viewChildren || [], oldNode && oldNode.viewChildren || [], group, sameTree, depth + 1);
      }
    }

    function clearStorage(storage) {
      var willDeleteEls = createStorage();
      storage && each(storage, function (store, storageName) {
        var delEls = willDeleteEls[storageName];
        each(store, function (el) {
          el && (delEls.push(el), el.__tmWillDelete = 1);
        });
      });
      return willDeleteEls;
    }

    function renderFinally() {
      each(willDeleteEls, function (els) {
        each(els, function (el) {
          el.parent && el.parent.remove(el);
        });
      });
      each(willInvisibleEls, function (el) {
        el.invisible = true; // Setting invisible is for optimizing, so no need to set dirty,
        // just mark as invisible.

        el.dirty();
      });
    }
  },

  /**
   * @private
   */
  _doAnimation: function (containerGroup, renderResult, seriesModel, reRoot) {
    if (!seriesModel.get('animation')) {
      return;
    }

    var duration = seriesModel.get('animationDurationUpdate');
    var easing = seriesModel.get('animationEasing');
    var animationWrap = animationUtil.createWrap(); // Make delete animations.

    each(renderResult.willDeleteEls, function (store, storageName) {
      each(store, function (el, rawIndex) {
        if (el.invisible) {
          return;
        }

        var parent = el.parent; // Always has parent, and parent is nodeGroup.

        var target;

        if (reRoot && reRoot.direction === 'drillDown') {
          target = parent === reRoot.rootNodeGroup // This is the content element of view root.
          // Only `content` will enter this branch, because
          // `background` and `nodeGroup` will not be deleted.
          ? {
            shape: {
              x: 0,
              y: 0,
              width: parent.__tmNodeWidth,
              height: parent.__tmNodeHeight
            },
            style: {
              opacity: 0
            } // Others.

          } : {
            style: {
              opacity: 0
            }
          };
        } else {
          var targetX = 0;
          var targetY = 0;

          if (!parent.__tmWillDelete) {
            // Let node animate to right-bottom corner, cooperating with fadeout,
            // which is appropriate for user understanding.
            // Divided by 2 for reRoot rolling up effect.
            targetX = parent.__tmNodeWidth / 2;
            targetY = parent.__tmNodeHeight / 2;
          }

          target = storageName === 'nodeGroup' ? {
            position: [targetX, targetY],
            style: {
              opacity: 0
            }
          } : {
            shape: {
              x: targetX,
              y: targetY,
              width: 0,
              height: 0
            },
            style: {
              opacity: 0
            }
          };
        }

        target && animationWrap.add(el, target, duration, easing);
      });
    }); // Make other animations

    each(this._storage, function (store, storageName) {
      each(store, function (el, rawIndex) {
        var last = renderResult.lastsForAnimation[storageName][rawIndex];
        var target = {};

        if (!last) {
          return;
        }

        if (storageName === 'nodeGroup') {
          if (last.old) {
            target.position = el.position.slice();
            el.attr('position', last.old);
          }
        } else {
          if (last.old) {
            target.shape = zrUtil.extend({}, el.shape);
            el.setShape(last.old);
          }

          if (last.fadein) {
            el.setStyle('opacity', 0);
            target.style = {
              opacity: 1
            };
          } // When animation is stopped for succedent animation starting,
          // el.style.opacity might not be 1
          else if (el.style.opacity !== 1) {
              target.style = {
                opacity: 1
              };
            }
        }

        animationWrap.add(el, target, duration, easing);
      });
    }, this);
    this._state = 'animating';
    animationWrap.done(bind(function () {
      this._state = 'ready';
      renderResult.renderFinally();
    }, this)).start();
  },

  /**
   * @private
   */
  _resetController: function (api) {
    var controller = this._controller; // Init controller.

    if (!controller) {
      controller = this._controller = new RoamController(api.getZr());
      controller.enable(this.seriesModel.get('roam'));
      controller.on('pan', bind(this._onPan, this));
      controller.on('zoom', bind(this._onZoom, this));
    }

    var rect = new BoundingRect(0, 0, api.getWidth(), api.getHeight());
    controller.setPointerChecker(function (e, x, y) {
      return rect.contain(x, y);
    });
  },

  /**
   * @private
   */
  _clearController: function () {
    var controller = this._controller;

    if (controller) {
      controller.dispose();
      controller = null;
    }
  },

  /**
   * @private
   */
  _onPan: function (e) {
    if (this._state !== 'animating' && (Math.abs(e.dx) > DRAG_THRESHOLD || Math.abs(e.dy) > DRAG_THRESHOLD)) {
      // These param must not be cached.
      var root = this.seriesModel.getData().tree.root;

      if (!root) {
        return;
      }

      var rootLayout = root.getLayout();

      if (!rootLayout) {
        return;
      }

      this.api.dispatchAction({
        type: 'treemapMove',
        from: this.uid,
        seriesId: this.seriesModel.id,
        rootRect: {
          x: rootLayout.x + e.dx,
          y: rootLayout.y + e.dy,
          width: rootLayout.width,
          height: rootLayout.height
        }
      });
    }
  },

  /**
   * @private
   */
  _onZoom: function (e) {
    var mouseX = e.originX;
    var mouseY = e.originY;

    if (this._state !== 'animating') {
      // These param must not be cached.
      var root = this.seriesModel.getData().tree.root;

      if (!root) {
        return;
      }

      var rootLayout = root.getLayout();

      if (!rootLayout) {
        return;
      }

      var rect = new BoundingRect(rootLayout.x, rootLayout.y, rootLayout.width, rootLayout.height);
      var layoutInfo = this.seriesModel.layoutInfo; // Transform mouse coord from global to containerGroup.

      mouseX -= layoutInfo.x;
      mouseY -= layoutInfo.y; // Scale root bounding rect.

      var m = matrix.create();
      matrix.translate(m, m, [-mouseX, -mouseY]);
      matrix.scale(m, m, [e.scale, e.scale]);
      matrix.translate(m, m, [mouseX, mouseY]);
      rect.applyTransform(m);
      this.api.dispatchAction({
        type: 'treemapRender',
        from: this.uid,
        seriesId: this.seriesModel.id,
        rootRect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      });
    }
  },

  /**
   * @private
   */
  _initEvents: function (containerGroup) {
    containerGroup.on('click', function (e) {
      if (this._state !== 'ready') {
        return;
      }

      var nodeClick = this.seriesModel.get('nodeClick', true);

      if (!nodeClick) {
        return;
      }

      var targetInfo = this.findTarget(e.offsetX, e.offsetY);

      if (!targetInfo) {
        return;
      }

      var node = targetInfo.node;

      if (node.getLayout().isLeafRoot) {
        this._rootToNode(targetInfo);
      } else {
        if (nodeClick === 'zoomToNode') {
          this._zoomToNode(targetInfo);
        } else if (nodeClick === 'link') {
          var itemModel = node.hostTree.data.getItemModel(node.dataIndex);
          var link = itemModel.get('link', true);
          var linkTarget = itemModel.get('target', true) || 'blank';
          link && window.open(link, linkTarget);
        }
      }
    }, this);
  },

  /**
   * @private
   */
  _renderBreadcrumb: function (seriesModel, api, targetInfo) {
    if (!targetInfo) {
      targetInfo = seriesModel.get('leafDepth', true) != null ? {
        node: seriesModel.getViewRoot() // FIXME
        // better way?
        // Find breadcrumb tail on center of containerGroup.

      } : this.findTarget(api.getWidth() / 2, api.getHeight() / 2);

      if (!targetInfo) {
        targetInfo = {
          node: seriesModel.getData().tree.root
        };
      }
    }

    (this._breadcrumb || (this._breadcrumb = new Breadcrumb(this.group))).render(seriesModel, api, targetInfo.node, bind(onSelect, this));

    function onSelect(node) {
      if (this._state !== 'animating') {
        helper.aboveViewRoot(seriesModel.getViewRoot(), node) ? this._rootToNode({
          node: node
        }) : this._zoomToNode({
          node: node
        });
      }
    }
  },

  /**
   * @override
   */
  remove: function () {
    this._clearController();

    this._containerGroup && this._containerGroup.removeAll();
    this._storage = createStorage();
    this._state = 'ready';
    this._breadcrumb && this._breadcrumb.remove();
  },
  dispose: function () {
    this._clearController();
  },

  /**
   * @private
   */
  _zoomToNode: function (targetInfo) {
    this.api.dispatchAction({
      type: 'treemapZoomToNode',
      from: this.uid,
      seriesId: this.seriesModel.id,
      targetNode: targetInfo.node
    });
  },

  /**
   * @private
   */
  _rootToNode: function (targetInfo) {
    this.api.dispatchAction({
      type: 'treemapRootToNode',
      from: this.uid,
      seriesId: this.seriesModel.id,
      targetNode: targetInfo.node
    });
  },

  /**
   * @public
   * @param {number} x Global coord x.
   * @param {number} y Global coord y.
   * @return {Object} info If not found, return undefined;
   * @return {number} info.node Target node.
   * @return {number} info.offsetX x refer to target node.
   * @return {number} info.offsetY y refer to target node.
   */
  findTarget: function (x, y) {
    var targetInfo;
    var viewRoot = this.seriesModel.getViewRoot();
    viewRoot.eachNode({
      attr: 'viewChildren',
      order: 'preorder'
    }, function (node) {
      var bgEl = this._storage.background[node.getRawIndex()]; // If invisible, there might be no element.


      if (bgEl) {
        var point = bgEl.transformCoordToLocal(x, y);
        var shape = bgEl.shape; // For performance consideration, dont use 'getBoundingRect'.

        if (shape.x <= point[0] && point[0] <= shape.x + shape.width && shape.y <= point[1] && point[1] <= shape.y + shape.height) {
          targetInfo = {
            node: node,
            offsetX: point[0],
            offsetY: point[1]
          };
        } else {
          return false; // Suppress visit subtree.
        }
      }
    }, this);
    return targetInfo;
  }
});
/**
 * @inner
 */


function createStorage() {
  return {
    nodeGroup: [],
    background: [],
    content: []
  };
}
/**
 * @inner
 * @return Return undefined means do not travel further.
 */


function renderNode(seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls, thisNode, oldNode, parentGroup, depth) {
  // Whether under viewRoot.
  if (!thisNode) {
    // Deleting nodes will be performed finally. This method just find
    // element from old storage, or create new element, set them to new
    // storage, and set styles.
    return;
  } // -------------------------------------------------------------------
  // Start of closure variables available in "Procedures in renderNode".


  var thisLayout = thisNode.getLayout();

  if (!thisLayout || !thisLayout.isInView) {
    return;
  }

  var thisWidth = thisLayout.width;
  var thisHeight = thisLayout.height;
  var borderWidth = thisLayout.borderWidth;
  var thisInvisible = thisLayout.invisible;
  var thisRawIndex = thisNode.getRawIndex();
  var oldRawIndex = oldNode && oldNode.getRawIndex();
  var thisViewChildren = thisNode.viewChildren;
  var upperHeight = thisLayout.upperHeight;
  var isParent = thisViewChildren && thisViewChildren.length;
  var itemStyleNormalModel = thisNode.getModel('itemStyle');
  var itemStyleEmphasisModel = thisNode.getModel('emphasis.itemStyle'); // End of closure ariables available in "Procedures in renderNode".
  // -----------------------------------------------------------------
  // Node group

  var group = giveGraphic('nodeGroup', Group);

  if (!group) {
    return;
  }

  parentGroup.add(group); // x,y are not set when el is above view root.

  group.attr('position', [thisLayout.x || 0, thisLayout.y || 0]);
  group.__tmNodeWidth = thisWidth;
  group.__tmNodeHeight = thisHeight;

  if (thisLayout.isAboveViewRoot) {
    return group;
  } // Background


  var bg = giveGraphic('background', Rect, depth, Z_BG);
  bg && renderBackground(group, bg, isParent && thisLayout.upperHeight); // No children, render content.

  if (!isParent) {
    var content = giveGraphic('content', Rect, depth, Z_CONTENT);
    content && renderContent(group, content);
  }

  return group; // ----------------------------
  // | Procedures in renderNode |
  // ----------------------------

  function renderBackground(group, bg, useUpperLabel) {
    // For tooltip.
    bg.dataIndex = thisNode.dataIndex;
    bg.seriesIndex = seriesModel.seriesIndex;
    bg.setShape({
      x: 0,
      y: 0,
      width: thisWidth,
      height: thisHeight
    });
    var visualBorderColor = thisNode.getVisual('borderColor', true);
    var emphasisBorderColor = itemStyleEmphasisModel.get('borderColor');
    updateStyle(bg, function () {
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualBorderColor;
      var emphasisStyle = getItemStyleEmphasis(itemStyleEmphasisModel);
      emphasisStyle.fill = emphasisBorderColor;

      if (useUpperLabel) {
        var upperLabelWidth = thisWidth - 2 * borderWidth;
        prepareText(normalStyle, emphasisStyle, visualBorderColor, upperLabelWidth, upperHeight, {
          x: borderWidth,
          y: 0,
          width: upperLabelWidth,
          height: upperHeight
        });
      } // For old bg.
      else {
          normalStyle.text = emphasisStyle.text = null;
        }

      bg.setStyle(normalStyle);
      graphic.setHoverStyle(bg, emphasisStyle);
    });
    group.add(bg);
  }

  function renderContent(group, content) {
    // For tooltip.
    content.dataIndex = thisNode.dataIndex;
    content.seriesIndex = seriesModel.seriesIndex;
    var contentWidth = Math.max(thisWidth - 2 * borderWidth, 0);
    var contentHeight = Math.max(thisHeight - 2 * borderWidth, 0);
    content.culling = true;
    content.setShape({
      x: borderWidth,
      y: borderWidth,
      width: contentWidth,
      height: contentHeight
    });
    var visualColor = thisNode.getVisual('color', true);
    updateStyle(content, function () {
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualColor;
      var emphasisStyle = getItemStyleEmphasis(itemStyleEmphasisModel);
      prepareText(normalStyle, emphasisStyle, visualColor, contentWidth, contentHeight);
      content.setStyle(normalStyle);
      graphic.setHoverStyle(content, emphasisStyle);
    });
    group.add(content);
  }

  function updateStyle(element, cb) {
    if (!thisInvisible) {
      // If invisible, do not set visual, otherwise the element will
      // change immediately before animation. We think it is OK to
      // remain its origin color when moving out of the view window.
      cb();

      if (!element.__tmWillVisible) {
        element.invisible = false;
      }
    } else {
      // Delay invisible setting utill animation finished,
      // avoid element vanish suddenly before animation.
      !element.invisible && willInvisibleEls.push(element);
    }
  }

  function prepareText(normalStyle, emphasisStyle, visualColor, width, height, upperLabelRect) {
    var nodeModel = thisNode.getModel();
    var text = zrUtil.retrieve(seriesModel.getFormattedLabel(thisNode.dataIndex, 'normal', null, null, upperLabelRect ? 'upperLabel' : 'label'), nodeModel.get('name'));

    if (!upperLabelRect && thisLayout.isLeafRoot) {
      var iconChar = seriesModel.get('drillDownIcon', true);
      text = iconChar ? iconChar + ' ' + text : text;
    }

    var normalLabelModel = nodeModel.getModel(upperLabelRect ? PATH_UPPERLABEL_NORMAL : PATH_LABEL_NOAMAL);
    var emphasisLabelModel = nodeModel.getModel(upperLabelRect ? PATH_UPPERLABEL_EMPHASIS : PATH_LABEL_EMPHASIS);
    var isShow = normalLabelModel.getShallow('show');
    graphic.setLabelStyle(normalStyle, emphasisStyle, normalLabelModel, emphasisLabelModel, {
      defaultText: isShow ? text : null,
      autoColor: visualColor,
      isRectText: true
    });
    upperLabelRect && (normalStyle.textRect = zrUtil.clone(upperLabelRect));
    normalStyle.truncate = isShow && normalLabelModel.get('ellipsis') ? {
      outerWidth: width,
      outerHeight: height,
      minChar: 2
    } : null;
  }

  function giveGraphic(storageName, Ctor, depth, z) {
    var element = oldRawIndex != null && oldStorage[storageName][oldRawIndex];
    var lasts = lastsForAnimation[storageName];

    if (element) {
      // Remove from oldStorage
      oldStorage[storageName][oldRawIndex] = null;
      prepareAnimationWhenHasOld(lasts, element, storageName);
    } // If invisible and no old element, do not create new element (for optimizing).
    else if (!thisInvisible) {
        element = new Ctor({
          z: calculateZ(depth, z)
        });
        element.__tmDepth = depth;
        element.__tmStorageName = storageName;
        prepareAnimationWhenNoOld(lasts, element, storageName);
      } // Set to thisStorage


    return thisStorage[storageName][thisRawIndex] = element;
  }

  function prepareAnimationWhenHasOld(lasts, element, storageName) {
    var lastCfg = lasts[thisRawIndex] = {};
    lastCfg.old = storageName === 'nodeGroup' ? element.position.slice() : zrUtil.extend({}, element.shape);
  } // If a element is new, we need to find the animation start point carefully,
  // otherwise it will looks strange when 'zoomToNode'.


  function prepareAnimationWhenNoOld(lasts, element, storageName) {
    var lastCfg = lasts[thisRawIndex] = {};
    var parentNode = thisNode.parentNode;

    if (parentNode && (!reRoot || reRoot.direction === 'drillDown')) {
      var parentOldX = 0;
      var parentOldY = 0; // New nodes appear from right-bottom corner in 'zoomToNode' animation.
      // For convenience, get old bounding rect from background.

      var parentOldBg = lastsForAnimation.background[parentNode.getRawIndex()];

      if (!reRoot && parentOldBg && parentOldBg.old) {
        parentOldX = parentOldBg.old.width;
        parentOldY = parentOldBg.old.height;
      } // When no parent old shape found, its parent is new too,
      // so we can just use {x:0, y:0}.


      lastCfg.old = storageName === 'nodeGroup' ? [0, parentOldY] : {
        x: parentOldX,
        y: parentOldY,
        width: 0,
        height: 0
      };
    } // Fade in, user can be aware that these nodes are new.


    lastCfg.fadein = storageName !== 'nodeGroup';
  }
} // We can not set all backgroud with the same z, Because the behaviour of
// drill down and roll up differ background creation sequence from tree
// hierarchy sequence, which cause that lowser background element overlap
// upper ones. So we calculate z based on depth.
// Moreover, we try to shrink down z interval to [0, 1] to avoid that
// treemap with large z overlaps other components.


function calculateZ(depth, zInLevel) {
  var zb = depth * Z_BASE + zInLevel;
  return (zb - 1) / zb;
}

module.exports = _default;

/***/ }),

/***/ "bf9b":
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

var _roamHelper = __webpack_require__("d81e");

var updateCenterAndZoom = _roamHelper.updateCenterAndZoom;

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
echarts.registerAction({
  type: 'treeExpandAndCollapse',
  event: 'treeExpandAndCollapse',
  update: 'update'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'tree',
    query: payload
  }, function (seriesModel) {
    var dataIndex = payload.dataIndex;
    var tree = seriesModel.getData().tree;
    var node = tree.getNodeByDataIndex(dataIndex);
    node.isExpand = !node.isExpand;
  });
});
echarts.registerAction({
  type: 'treeRoam',
  event: 'treeRoam',
  // Here we set 'none' instead of 'update', because roam action
  // just need to update the transform matrix without having to recalculate
  // the layout. So don't need to go through the whole update process, such
  // as 'dataPrcocess', 'coordSystemUpdate', 'layout' and so on.
  update: 'none'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'tree',
    query: payload
  }, function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var res = updateCenterAndZoom(coordSys, payload);
    seriesModel.setCenter && seriesModel.setCenter(res.center);
    seriesModel.setZoom && seriesModel.setZoom(res.zoom);
  });
});

/***/ }),

/***/ "ca29":
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

var _traversalHelper = __webpack_require__("6d9a");

var eachAfter = _traversalHelper.eachAfter;
var eachBefore = _traversalHelper.eachBefore;

var _layoutHelper = __webpack_require__("22da");

var init = _layoutHelper.init;
var firstWalk = _layoutHelper.firstWalk;
var secondWalk = _layoutHelper.secondWalk;
var sep = _layoutHelper.separation;
var radialCoordinate = _layoutHelper.radialCoordinate;
var getViewRect = _layoutHelper.getViewRect;

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
function _default(ecModel, api) {
  ecModel.eachSeriesByType('tree', function (seriesModel) {
    commonLayout(seriesModel, api);
  });
}

function commonLayout(seriesModel, api) {
  var layoutInfo = getViewRect(seriesModel, api);
  seriesModel.layoutInfo = layoutInfo;
  var layout = seriesModel.get('layout');
  var width = 0;
  var height = 0;
  var separation = null;

  if (layout === 'radial') {
    width = 2 * Math.PI;
    height = Math.min(layoutInfo.height, layoutInfo.width) / 2;
    separation = sep(function (node1, node2) {
      return (node1.parentNode === node2.parentNode ? 1 : 2) / node1.depth;
    });
  } else {
    width = layoutInfo.width;
    height = layoutInfo.height;
    separation = sep();
  }

  var virtualRoot = seriesModel.getData().tree.root;
  var realRoot = virtualRoot.children[0];

  if (realRoot) {
    init(virtualRoot);
    eachAfter(realRoot, firstWalk, separation);
    virtualRoot.hierNode.modifier = -realRoot.hierNode.prelim;
    eachBefore(realRoot, secondWalk);
    var left = realRoot;
    var right = realRoot;
    var bottom = realRoot;
    eachBefore(realRoot, function (node) {
      var x = node.getLayout().x;

      if (x < left.getLayout().x) {
        left = node;
      }

      if (x > right.getLayout().x) {
        right = node;
      }

      if (node.depth > bottom.depth) {
        bottom = node;
      }
    });
    var delta = left === right ? 1 : separation(left, right) / 2;
    var tx = delta - left.getLayout().x;
    var kx = 0;
    var ky = 0;
    var coorX = 0;
    var coorY = 0;

    if (layout === 'radial') {
      kx = width / (right.getLayout().x + delta + tx); // here we use (node.depth - 1), bucause the real root's depth is 1

      ky = height / (bottom.depth - 1 || 1);
      eachBefore(realRoot, function (node) {
        coorX = (node.getLayout().x + tx) * kx;
        coorY = (node.depth - 1) * ky;
        var finalCoor = radialCoordinate(coorX, coorY);
        node.setLayout({
          x: finalCoor.x,
          y: finalCoor.y,
          rawX: coorX,
          rawY: coorY
        }, true);
      });
    } else {
      var orient = seriesModel.getOrient();

      if (orient === 'RL' || orient === 'LR') {
        ky = height / (right.getLayout().x + delta + tx);
        kx = width / (bottom.depth - 1 || 1);
        eachBefore(realRoot, function (node) {
          coorY = (node.getLayout().x + tx) * ky;
          coorX = orient === 'LR' ? (node.depth - 1) * kx : width - (node.depth - 1) * kx;
          node.setLayout({
            x: coorX,
            y: coorY
          }, true);
        });
      } else if (orient === 'TB' || orient === 'BT') {
        kx = width / (right.getLayout().x + delta + tx);
        ky = height / (bottom.depth - 1 || 1);
        eachBefore(realRoot, function (node) {
          coorX = (node.getLayout().x + tx) * kx;
          coorY = orient === 'TB' ? (node.depth - 1) * ky : height - (node.depth - 1) * ky;
          node.setLayout({
            x: coorX,
            y: coorY
          }, true);
        });
      }
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "cb73":
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

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

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
// var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;

function _default(seriesType, ecModel, api, payload) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!zrUtil.isArray(radius)) {
      radius = [0, radius];
    }

    if (!zrUtil.isArray(center)) {
      center = [center, center];
    }

    var width = api.getWidth();
    var height = api.getHeight();
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width);
    var cy = parsePercent(center[1], height);
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var virtualRoot = seriesModel.getData().tree.root;
    var treeRoot = seriesModel.getViewRoot();
    var rootDepth = treeRoot.depth;
    var sort = seriesModel.get('sort');

    if (sort != null) {
      initChildren(treeRoot, sort);
    }

    var validDataCount = 0;
    zrUtil.each(treeRoot.children, function (child) {
      !isNaN(child.getValue()) && validDataCount++;
    });
    var sum = treeRoot.getValue(); // Sum may be 0

    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var renderRollupNode = treeRoot.depth > 0;
    var levels = treeRoot.height - (renderRollupNode ? -1 : 1);
    var rPerLevel = (r - r0) / (levels || 1);
    var clockwise = seriesModel.get('clockwise');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum'); // In the case some sector angle is smaller than minAngle
    // var restAngle = PI2;
    // var valueSumLargerThanMinAngle = 0;

    var dir = clockwise ? 1 : -1;
    /**
     * Render a tree
     * @return increased angle
     */

    var renderNode = function (node, startAngle) {
      if (!node) {
        return;
      }

      var endAngle = startAngle; // Render self

      if (node !== virtualRoot) {
        // Tree node is virtual, so it doesn't need to be drawn
        var value = node.getValue();
        var angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;

        if (angle < minAngle) {
          angle = minAngle; // restAngle -= minAngle;
        } // else {
        //     valueSumLargerThanMinAngle += value;
        // }


        endAngle = startAngle + dir * angle;
        var depth = node.depth - rootDepth - (renderRollupNode ? -1 : 1);
        var rStart = r0 + rPerLevel * depth;
        var rEnd = r0 + rPerLevel * (depth + 1);
        var itemModel = node.getModel();

        if (itemModel.get('r0') != null) {
          rStart = parsePercent(itemModel.get('r0'), size / 2);
        }

        if (itemModel.get('r') != null) {
          rEnd = parsePercent(itemModel.get('r'), size / 2);
        }

        node.setLayout({
          angle: angle,
          startAngle: startAngle,
          endAngle: endAngle,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: rStart,
          r: rEnd
        });
      } // Render children


      if (node.children && node.children.length) {
        // currentAngle = startAngle;
        var siblingAngle = 0;
        zrUtil.each(node.children, function (node) {
          siblingAngle += renderNode(node, startAngle + siblingAngle);
        });
      }

      return endAngle - startAngle;
    }; // Virtual root node for roll up


    if (renderRollupNode) {
      var rStart = r0;
      var rEnd = r0 + rPerLevel;
      var angle = Math.PI * 2;
      virtualRoot.setLayout({
        angle: angle,
        startAngle: startAngle,
        endAngle: startAngle + angle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: rStart,
        r: rEnd
      });
    }

    renderNode(treeRoot, startAngle);
  });
}
/**
 * Init node children by order and update visual
 *
 * @param {TreeNode} node  root node
 * @param {boolean}  isAsc if is in ascendant order
 */


function initChildren(node, isAsc) {
  var children = node.children || [];
  node.children = sort(children, isAsc); // Init children recursively

  if (children.length) {
    zrUtil.each(node.children, function (child) {
      initChildren(child, isAsc);
    });
  }
}
/**
 * Sort children nodes
 *
 * @param {TreeNode[]}               children children of node to be sorted
 * @param {string | function | null} sort sort method
 *                                   See SunburstSeries.js for details.
 */


function sort(children, sortOrder) {
  if (typeof sortOrder === 'function') {
    return children.sort(sortOrder);
  } else {
    var isAsc = sortOrder === 'asc';
    return children.sort(function (a, b) {
      var diff = (a.getValue() - b.getValue()) * (isAsc ? 1 : -1);
      return diff === 0 ? (a.dataIndex - b.dataIndex) * (isAsc ? -1 : 1) : diff;
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "d7169":
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

__webpack_require__("aa01");

__webpack_require__("340d");

__webpack_require__("44fb");

var dataColor = __webpack_require__("98e7");

var sunburstLayout = __webpack_require__("cb73");

var dataFilter = __webpack_require__("d3f4");

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
echarts.registerVisual(zrUtil.curry(dataColor, 'sunburst'));
echarts.registerLayout(zrUtil.curry(sunburstLayout, 'sunburst'));
echarts.registerProcessor(zrUtil.curry(dataFilter, 'sunburst'));

/***/ }),

/***/ "dae1":
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

__webpack_require__("928d");

__webpack_require__("b369");

__webpack_require__("44110");

var treemapVisual = __webpack_require__("90c2");

var treemapLayout = __webpack_require__("9ca8");

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
echarts.registerVisual(treemapVisual);
echarts.registerLayout(treemapLayout);

/***/ }),

/***/ "ef97a":
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

__webpack_require__("2163");

__webpack_require__("6cd8");

__webpack_require__("bf9b");

var visualSymbol = __webpack_require__("7f96");

var treeLayout = __webpack_require__("ca29");

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
echarts.registerVisual(visualSymbol('tree', 'circle'));
echarts.registerLayout(treeLayout);

/***/ }),

/***/ "f610":
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

var graphic = __webpack_require__("2306");

var layout = __webpack_require__("f934");

var zrUtil = __webpack_require__("6d8b");

var _treeHelper = __webpack_require__("55ac");

var wrapTreePathInfo = _treeHelper.wrapTreePathInfo;

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
var TEXT_PADDING = 8;
var ITEM_GAP = 8;
var ARRAY_LENGTH = 5;

function Breadcrumb(containerGroup) {
  /**
   * @private
   * @type {module:zrender/container/Group}
   */
  this.group = new graphic.Group();
  containerGroup.add(this.group);
}

Breadcrumb.prototype = {
  constructor: Breadcrumb,
  render: function (seriesModel, api, targetNode, onSelect) {
    var model = seriesModel.getModel('breadcrumb');
    var thisGroup = this.group;
    thisGroup.removeAll();

    if (!model.get('show') || !targetNode) {
      return;
    }

    var normalStyleModel = model.getModel('itemStyle'); // var emphasisStyleModel = model.getModel('emphasis.itemStyle');

    var textStyleModel = normalStyleModel.getModel('textStyle');
    var layoutParam = {
      pos: {
        left: model.get('left'),
        right: model.get('right'),
        top: model.get('top'),
        bottom: model.get('bottom')
      },
      box: {
        width: api.getWidth(),
        height: api.getHeight()
      },
      emptyItemWidth: model.get('emptyItemWidth'),
      totalWidth: 0,
      renderList: []
    };

    this._prepare(targetNode, layoutParam, textStyleModel);

    this._renderContent(seriesModel, layoutParam, normalStyleModel, textStyleModel, onSelect);

    layout.positionElement(thisGroup, layoutParam.pos, layoutParam.box);
  },

  /**
   * Prepare render list and total width
   * @private
   */
  _prepare: function (targetNode, layoutParam, textStyleModel) {
    for (var node = targetNode; node; node = node.parentNode) {
      var text = node.getModel().get('name');
      var textRect = textStyleModel.getTextRect(text);
      var itemWidth = Math.max(textRect.width + TEXT_PADDING * 2, layoutParam.emptyItemWidth);
      layoutParam.totalWidth += itemWidth + ITEM_GAP;
      layoutParam.renderList.push({
        node: node,
        text: text,
        width: itemWidth
      });
    }
  },

  /**
   * @private
   */
  _renderContent: function (seriesModel, layoutParam, normalStyleModel, textStyleModel, onSelect) {
    // Start rendering.
    var lastX = 0;
    var emptyItemWidth = layoutParam.emptyItemWidth;
    var height = seriesModel.get('breadcrumb.height');
    var availableSize = layout.getAvailableSize(layoutParam.pos, layoutParam.box);
    var totalWidth = layoutParam.totalWidth;
    var renderList = layoutParam.renderList;

    for (var i = renderList.length - 1; i >= 0; i--) {
      var item = renderList[i];
      var itemNode = item.node;
      var itemWidth = item.width;
      var text = item.text; // Hdie text and shorten width if necessary.

      if (totalWidth > availableSize.width) {
        totalWidth -= itemWidth - emptyItemWidth;
        itemWidth = emptyItemWidth;
        text = null;
      }

      var el = new graphic.Polygon({
        shape: {
          points: makeItemPoints(lastX, 0, itemWidth, height, i === renderList.length - 1, i === 0)
        },
        style: zrUtil.defaults(normalStyleModel.getItemStyle(), {
          lineJoin: 'bevel',
          text: text,
          textFill: textStyleModel.getTextColor(),
          textFont: textStyleModel.getFont()
        }),
        z: 10,
        onclick: zrUtil.curry(onSelect, itemNode)
      });
      this.group.add(el);
      packEventData(el, seriesModel, itemNode);
      lastX += itemWidth + ITEM_GAP;
    }
  },

  /**
   * @override
   */
  remove: function () {
    this.group.removeAll();
  }
};

function makeItemPoints(x, y, itemWidth, itemHeight, head, tail) {
  var points = [[head ? x : x - ARRAY_LENGTH, y], [x + itemWidth, y], [x + itemWidth, y + itemHeight], [head ? x : x - ARRAY_LENGTH, y + itemHeight]];
  !tail && points.splice(2, 0, [x + itemWidth + ARRAY_LENGTH, y + itemHeight / 2]);
  !head && points.push([x, y + itemHeight / 2]);
  return points;
} // Package custom mouse event.


function packEventData(el, seriesModel, itemNode) {
  el.eventData = {
    componentType: 'series',
    componentSubType: 'treemap',
    componentIndex: seriesModel.componentIndex,
    seriesIndex: seriesModel.componentIndex,
    seriesName: seriesModel.name,
    seriesType: 'treemap',
    selfType: 'breadcrumb',
    // Distinguish with click event on treemap node.
    nodeData: {
      dataIndex: itemNode && itemNode.dataIndex,
      name: itemNode && itemNode.name
    },
    treePathInfo: itemNode && wrapTreePathInfo(itemNode, seriesModel)
  };
}

var _default = Breadcrumb;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~d71bf088.52493933.js.map