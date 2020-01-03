(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~717e1328"],{

/***/ "0e0f":
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
function _default(ecModel, payload) {
  ecModel.eachSeriesByType('sankey', function (seriesModel) {
    var graph = seriesModel.getGraph();
    var nodes = graph.nodes;

    if (nodes.length) {
      var minValue = Infinity;
      var maxValue = -Infinity;
      zrUtil.each(nodes, function (node) {
        var nodeValue = node.getLayout().value;

        if (nodeValue < minValue) {
          minValue = nodeValue;
        }

        if (nodeValue > maxValue) {
          maxValue = nodeValue;
        }
      });
      zrUtil.each(nodes, function (node) {
        var mapping = new VisualMapping({
          type: 'color',
          mappingMethod: 'linear',
          dataExtent: [minValue, maxValue],
          visual: seriesModel.get('color')
        });
        var mapValueToColor = mapping.mapValueToVisual(node.getLayout().value);
        var customColor = node.getModel().get('itemStyle.color');
        customColor != null ? node.setVisual('color', customColor) : node.setVisual('color', mapValueToColor);
      });
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "15af":
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

__webpack_require__("cb69");

__webpack_require__("abff");

var visualSymbol = __webpack_require__("7f96");

var layoutPoints = __webpack_require__("87c3");

__webpack_require__("01ed");

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
// import * as zrUtil from 'zrender/src/core/util';
// In case developer forget to include grid component
echarts.registerVisual(visualSymbol('scatter', 'circle'));
echarts.registerLayout(layoutPoints('scatter')); // echarts.registerProcessor(function (ecModel, api) {
//     ecModel.eachSeriesByType('scatter', function (seriesModel) {
//         var data = seriesModel.getData();
//         var coordSys = seriesModel.coordinateSystem;
//         if (coordSys.type !== 'geo') {
//             return;
//         }
//         var startPt = coordSys.pointToData([0, 0]);
//         var endPt = coordSys.pointToData([api.getWidth(), api.getHeight()]);
//         var dims = zrUtil.map(coordSys.dimensions, function (dim) {
//             return data.mapDimension(dim);
//         });
//         var range = {};
//         range[dims[0]] = [Math.min(startPt[0], endPt[0]), Math.max(startPt[0], endPt[0])];
//         range[dims[1]] = [Math.min(startPt[1], endPt[1]), Math.max(startPt[1], endPt[1])];
//         data.selectRange(range);
//     });
// });

/***/ }),

/***/ "311a":
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

__webpack_require__("d01c");

__webpack_require__("5b69");

__webpack_require__("bdc0");

var sankeyLayout = __webpack_require__("81ac");

var sankeyVisual = __webpack_require__("0e0f");

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
echarts.registerLayout(sankeyLayout);
echarts.registerVisual(sankeyVisual);

/***/ }),

/***/ "5b69":
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

var echarts = __webpack_require__("3eba");

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
var nodeOpacityPath = ['itemStyle', 'opacity'];
var lineOpacityPath = ['lineStyle', 'opacity'];

function getItemOpacity(item, opacityPath) {
  return item.getVisual('opacity') || item.getModel().get(opacityPath);
}

function fadeOutItem(item, opacityPath, opacityRatio) {
  var el = item.getGraphicEl();
  var opacity = getItemOpacity(item, opacityPath);

  if (opacityRatio != null) {
    opacity == null && (opacity = 1);
    opacity *= opacityRatio;
  }

  el.downplay && el.downplay();
  el.traverse(function (child) {
    if (child.type !== 'group') {
      child.setStyle('opacity', opacity);
    }
  });
}

function fadeInItem(item, opacityPath) {
  var opacity = getItemOpacity(item, opacityPath);
  var el = item.getGraphicEl();
  el.highlight && el.highlight();
  el.traverse(function (child) {
    if (child.type !== 'group') {
      child.setStyle('opacity', opacity);
    }
  });
}

var SankeyShape = graphic.extendShape({
  shape: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    cpx1: 0,
    cpy1: 0,
    cpx2: 0,
    cpy2: 0,
    extent: 0,
    orient: ''
  },
  buildPath: function (ctx, shape) {
    var extent = shape.extent;
    ctx.moveTo(shape.x1, shape.y1);
    ctx.bezierCurveTo(shape.cpx1, shape.cpy1, shape.cpx2, shape.cpy2, shape.x2, shape.y2);

    if (shape.orient === 'vertical') {
      ctx.lineTo(shape.x2 + extent, shape.y2);
      ctx.bezierCurveTo(shape.cpx2 + extent, shape.cpy2, shape.cpx1 + extent, shape.cpy1, shape.x1 + extent, shape.y1);
    } else {
      ctx.lineTo(shape.x2, shape.y2 + extent);
      ctx.bezierCurveTo(shape.cpx2, shape.cpy2 + extent, shape.cpx1, shape.cpy1 + extent, shape.x1, shape.y1 + extent);
    }

    ctx.closePath();
  }
});

var _default = echarts.extendChartView({
  type: 'sankey',

  /**
   * @private
   * @type {module:echarts/chart/sankey/SankeySeries}
   */
  _model: null,

  /**
   * @private
   * @type {boolean}
   */
  _focusAdjacencyDisabled: false,
  render: function (seriesModel, ecModel, api) {
    var sankeyView = this;
    var graph = seriesModel.getGraph();
    var group = this.group;
    var layoutInfo = seriesModel.layoutInfo; // view width

    var width = layoutInfo.width; // view height

    var height = layoutInfo.height;
    var nodeData = seriesModel.getData();
    var edgeData = seriesModel.getData('edge');
    var orient = seriesModel.get('orient');
    this._model = seriesModel;
    group.removeAll();
    group.attr('position', [layoutInfo.x, layoutInfo.y]); // generate a bezire Curve for each edge

    graph.eachEdge(function (edge) {
      var curve = new SankeyShape();
      curve.dataIndex = edge.dataIndex;
      curve.seriesIndex = seriesModel.seriesIndex;
      curve.dataType = 'edge';
      var lineStyleModel = edge.getModel('lineStyle');
      var curvature = lineStyleModel.get('curveness');
      var n1Layout = edge.node1.getLayout();
      var node1Model = edge.node1.getModel();
      var dragX1 = node1Model.get('localX');
      var dragY1 = node1Model.get('localY');
      var n2Layout = edge.node2.getLayout();
      var node2Model = edge.node2.getModel();
      var dragX2 = node2Model.get('localX');
      var dragY2 = node2Model.get('localY');
      var edgeLayout = edge.getLayout();
      var x1;
      var y1;
      var x2;
      var y2;
      var cpx1;
      var cpy1;
      var cpx2;
      var cpy2;
      curve.shape.extent = Math.max(1, edgeLayout.dy);
      curve.shape.orient = orient;

      if (orient === 'vertical') {
        x1 = (dragX1 != null ? dragX1 * width : n1Layout.x) + edgeLayout.sy;
        y1 = (dragY1 != null ? dragY1 * height : n1Layout.y) + n1Layout.dy;
        x2 = (dragX2 != null ? dragX2 * width : n2Layout.x) + edgeLayout.ty;
        y2 = dragY2 != null ? dragY2 * height : n2Layout.y;
        cpx1 = x1;
        cpy1 = y1 * (1 - curvature) + y2 * curvature;
        cpx2 = x2;
        cpy2 = y1 * curvature + y2 * (1 - curvature);
      } else {
        x1 = (dragX1 != null ? dragX1 * width : n1Layout.x) + n1Layout.dx;
        y1 = (dragY1 != null ? dragY1 * height : n1Layout.y) + edgeLayout.sy;
        x2 = dragX2 != null ? dragX2 * width : n2Layout.x;
        y2 = (dragY2 != null ? dragY2 * height : n2Layout.y) + edgeLayout.ty;
        cpx1 = x1 * (1 - curvature) + x2 * curvature;
        cpy1 = y1;
        cpx2 = x1 * curvature + x2 * (1 - curvature);
        cpy2 = y2;
      }

      curve.setShape({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        cpx1: cpx1,
        cpy1: cpy1,
        cpx2: cpx2,
        cpy2: cpy2
      });
      curve.setStyle(lineStyleModel.getItemStyle()); // Special color, use source node color or target node color

      switch (curve.style.fill) {
        case 'source':
          curve.style.fill = edge.node1.getVisual('color');
          break;

        case 'target':
          curve.style.fill = edge.node2.getVisual('color');
          break;
      }

      graphic.setHoverStyle(curve, edge.getModel('emphasis.lineStyle').getItemStyle());
      group.add(curve);
      edgeData.setItemGraphicEl(edge.dataIndex, curve);
    }); // Generate a rect for each node

    graph.eachNode(function (node) {
      var layout = node.getLayout();
      var itemModel = node.getModel();
      var dragX = itemModel.get('localX');
      var dragY = itemModel.get('localY');
      var labelModel = itemModel.getModel('label');
      var labelHoverModel = itemModel.getModel('emphasis.label');
      var rect = new graphic.Rect({
        shape: {
          x: dragX != null ? dragX * width : layout.x,
          y: dragY != null ? dragY * height : layout.y,
          width: layout.dx,
          height: layout.dy
        },
        style: itemModel.getModel('itemStyle').getItemStyle()
      });
      var hoverStyle = node.getModel('emphasis.itemStyle').getItemStyle();
      graphic.setLabelStyle(rect.style, hoverStyle, labelModel, labelHoverModel, {
        labelFetcher: seriesModel,
        labelDataIndex: node.dataIndex,
        defaultText: node.id,
        isRectText: true
      });
      rect.setStyle('fill', node.getVisual('color'));
      graphic.setHoverStyle(rect, hoverStyle);
      group.add(rect);
      nodeData.setItemGraphicEl(node.dataIndex, rect);
      rect.dataType = 'node';
    });
    nodeData.eachItemGraphicEl(function (el, dataIndex) {
      var itemModel = nodeData.getItemModel(dataIndex);

      if (itemModel.get('draggable')) {
        el.drift = function (dx, dy) {
          sankeyView._focusAdjacencyDisabled = true;
          this.shape.x += dx;
          this.shape.y += dy;
          this.dirty();
          api.dispatchAction({
            type: 'dragNode',
            seriesId: seriesModel.id,
            dataIndex: nodeData.getRawIndex(dataIndex),
            localX: this.shape.x / width,
            localY: this.shape.y / height
          });
        };

        el.ondragend = function () {
          sankeyView._focusAdjacencyDisabled = false;
        };

        el.draggable = true;
        el.cursor = 'move';
      }

      if (itemModel.get('focusNodeAdjacency')) {
        el.off('mouseover').on('mouseover', function () {
          if (!sankeyView._focusAdjacencyDisabled) {
            sankeyView._clearTimer();

            api.dispatchAction({
              type: 'focusNodeAdjacency',
              seriesId: seriesModel.id,
              dataIndex: el.dataIndex
            });
          }
        });
        el.off('mouseout').on('mouseout', function () {
          if (!sankeyView._focusAdjacencyDisabled) {
            sankeyView._dispatchUnfocus(api);
          }
        });
      }
    });
    edgeData.eachItemGraphicEl(function (el, dataIndex) {
      var edgeModel = edgeData.getItemModel(dataIndex);

      if (edgeModel.get('focusNodeAdjacency')) {
        el.off('mouseover').on('mouseover', function () {
          if (!sankeyView._focusAdjacencyDisabled) {
            sankeyView._clearTimer();

            api.dispatchAction({
              type: 'focusNodeAdjacency',
              seriesId: seriesModel.id,
              edgeDataIndex: el.dataIndex
            });
          }
        });
        el.off('mouseout').on('mouseout', function () {
          if (!sankeyView._focusAdjacencyDisabled) {
            sankeyView._dispatchUnfocus(api);
          }
        });
      }
    });

    if (!this._data && seriesModel.get('animation')) {
      group.setClipPath(createGridClipShape(group.getBoundingRect(), seriesModel, function () {
        group.removeClipPath();
      }));
    }

    this._data = seriesModel.getData();
  },
  dispose: function () {
    this._clearTimer();
  },
  _dispatchUnfocus: function (api) {
    var self = this;

    this._clearTimer();

    this._unfocusDelayTimer = setTimeout(function () {
      self._unfocusDelayTimer = null;
      api.dispatchAction({
        type: 'unfocusNodeAdjacency',
        seriesId: self._model.id
      });
    }, 500);
  },
  _clearTimer: function () {
    if (this._unfocusDelayTimer) {
      clearTimeout(this._unfocusDelayTimer);
      this._unfocusDelayTimer = null;
    }
  },
  focusNodeAdjacency: function (seriesModel, ecModel, api, payload) {
    var data = this._model.getData();

    var graph = data.graph;
    var dataIndex = payload.dataIndex;
    var itemModel = data.getItemModel(dataIndex);
    var edgeDataIndex = payload.edgeDataIndex;

    if (dataIndex == null && edgeDataIndex == null) {
      return;
    }

    var node = graph.getNodeByIndex(dataIndex);
    var edge = graph.getEdgeByIndex(edgeDataIndex);
    graph.eachNode(function (node) {
      fadeOutItem(node, nodeOpacityPath, 0.1);
    });
    graph.eachEdge(function (edge) {
      fadeOutItem(edge, lineOpacityPath, 0.1);
    });

    if (node) {
      fadeInItem(node, nodeOpacityPath);
      var focusNodeAdj = itemModel.get('focusNodeAdjacency');

      if (focusNodeAdj === 'outEdges') {
        zrUtil.each(node.outEdges, function (edge) {
          if (edge.dataIndex < 0) {
            return;
          }

          fadeInItem(edge, lineOpacityPath);
          fadeInItem(edge.node2, nodeOpacityPath);
        });
      } else if (focusNodeAdj === 'inEdges') {
        zrUtil.each(node.inEdges, function (edge) {
          if (edge.dataIndex < 0) {
            return;
          }

          fadeInItem(edge, lineOpacityPath);
          fadeInItem(edge.node1, nodeOpacityPath);
        });
      } else if (focusNodeAdj === 'allEdges') {
        zrUtil.each(node.edges, function (edge) {
          if (edge.dataIndex < 0) {
            return;
          }

          fadeInItem(edge, lineOpacityPath);
          fadeInItem(edge.node1, nodeOpacityPath);
          fadeInItem(edge.node2, nodeOpacityPath);
        });
      }
    }

    if (edge) {
      fadeInItem(edge, lineOpacityPath);
      fadeInItem(edge.node1, nodeOpacityPath);
      fadeInItem(edge.node2, nodeOpacityPath);
    }
  },
  unfocusNodeAdjacency: function (seriesModel, ecModel, api, payload) {
    var graph = this._model.getGraph();

    graph.eachNode(function (node) {
      fadeOutItem(node, nodeOpacityPath);
    });
    graph.eachEdge(function (edge) {
      fadeOutItem(edge, lineOpacityPath);
    });
  }
}); // Add animation to the view


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

/***/ "81ac":
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

var zrUtil = __webpack_require__("6d8b");

var _model = __webpack_require__("e0d3");

var groupData = _model.groupData;

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
function _default(ecModel, api, payload) {
  ecModel.eachSeriesByType('sankey', function (seriesModel) {
    var nodeWidth = seriesModel.get('nodeWidth');
    var nodeGap = seriesModel.get('nodeGap');
    var layoutInfo = getViewRect(seriesModel, api);
    seriesModel.layoutInfo = layoutInfo;
    var width = layoutInfo.width;
    var height = layoutInfo.height;
    var graph = seriesModel.getGraph();
    var nodes = graph.nodes;
    var edges = graph.edges;
    computeNodeValues(nodes);
    var filteredNodes = zrUtil.filter(nodes, function (node) {
      return node.getLayout().value === 0;
    });
    var iterations = filteredNodes.length !== 0 ? 0 : seriesModel.get('layoutIterations');
    var orient = seriesModel.get('orient');
    var nodeAlign = seriesModel.get('nodeAlign');
    layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign);
  });
}
/**
 * Get the layout position of the whole view
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

function layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign) {
  computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign);
  computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient);
  computeEdgeDepths(nodes, orient);
}
/**
 * Compute the value of each node by summing the associated edge's value
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 */


function computeNodeValues(nodes) {
  zrUtil.each(nodes, function (node) {
    var value1 = sum(node.outEdges, getEdgeValue);
    var value2 = sum(node.inEdges, getEdgeValue);
    var value = Math.max(value1, value2);
    node.setLayout({
      value: value
    }, true);
  });
}
/**
 * Compute the x-position for each node.
 *
 * Here we use Kahn algorithm to detect cycle when we traverse
 * the node to computer the initial x position.
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 * @param  {number} nodeWidth  the dx of the node
 * @param  {number} width  the whole width of the area to draw the view
 */


function computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign) {
  // Used to mark whether the edge is deleted. if it is deleted,
  // the value is 0, otherwise it is 1.
  var remainEdges = []; // Storage each node's indegree.

  var indegreeArr = []; //Used to storage the node with indegree is equal to 0.

  var zeroIndegrees = [];
  var nextTargetNode = [];
  var x = 0;
  var kx = 0;

  for (var i = 0; i < edges.length; i++) {
    remainEdges[i] = 1;
  }

  for (i = 0; i < nodes.length; i++) {
    indegreeArr[i] = nodes[i].inEdges.length;

    if (indegreeArr[i] === 0) {
      zeroIndegrees.push(nodes[i]);
    }
  }

  var maxNodeDepth = -1; // Traversing nodes using topological sorting to calculate the
  // horizontal(if orient === 'horizontal') or vertical(if orient === 'vertical')
  // position of the nodes.

  while (zeroIndegrees.length) {
    for (var idx = 0; idx < zeroIndegrees.length; idx++) {
      var node = zeroIndegrees[idx];
      var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
      var isItemDepth = item.depth != null && item.depth >= 0;

      if (isItemDepth && item.depth > maxNodeDepth) {
        maxNodeDepth = item.depth;
      }

      node.setLayout({
        depth: isItemDepth ? item.depth : x
      }, true);
      orient === 'vertical' ? node.setLayout({
        dy: nodeWidth
      }, true) : node.setLayout({
        dx: nodeWidth
      }, true);

      for (var edgeIdx = 0; edgeIdx < node.outEdges.length; edgeIdx++) {
        var edge = node.outEdges[edgeIdx];
        var indexEdge = edges.indexOf(edge);
        remainEdges[indexEdge] = 0;
        var targetNode = edge.node2;
        var nodeIndex = nodes.indexOf(targetNode);

        if (--indegreeArr[nodeIndex] === 0 && nextTargetNode.indexOf(targetNode) < 0) {
          nextTargetNode.push(targetNode);
        }
      }
    }

    ++x;
    zeroIndegrees = nextTargetNode;
    nextTargetNode = [];
  }

  for (i = 0; i < remainEdges.length; i++) {
    if (remainEdges[i] === 1) {
      throw new Error('Sankey is a DAG, the original data has cycle!');
    }
  }

  var maxDepth = maxNodeDepth > x - 1 ? maxNodeDepth : x - 1;

  if (nodeAlign && nodeAlign !== 'left') {
    adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth);
  }

  var kx = orient === 'vertical' ? (height - nodeWidth) / maxDepth : (width - nodeWidth) / maxDepth;
  scaleNodeBreadths(nodes, kx, orient);
}

function isNodeDepth(node) {
  var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
  return item.depth != null && item.depth >= 0;
}

function adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth) {
  if (nodeAlign === 'right') {
    var nextSourceNode = [];
    var remainNodes = nodes;
    var nodeHeight = 0;

    while (remainNodes.length) {
      for (var i = 0; i < remainNodes.length; i++) {
        var node = remainNodes[i];
        node.setLayout({
          skNodeHeight: nodeHeight
        }, true);

        for (var j = 0; j < node.inEdges.length; j++) {
          var edge = node.inEdges[j];

          if (nextSourceNode.indexOf(edge.node1) < 0) {
            nextSourceNode.push(edge.node1);
          }
        }
      }

      remainNodes = nextSourceNode;
      nextSourceNode = [];
      ++nodeHeight;
    }

    zrUtil.each(nodes, function (node) {
      if (!isNodeDepth(node)) {
        node.setLayout({
          depth: Math.max(0, maxDepth - node.getLayout().skNodeHeight)
        }, true);
      }
    });
  } else if (nodeAlign === 'justify') {
    moveSinksRight(nodes, maxDepth);
  }
}
/**
 * All the node without outEgdes are assigned maximum x-position and
 *     be aligned in the last column.
 *
 * @param {module:echarts/data/Graph~Node} nodes.  node of sankey view.
 * @param {number} maxDepth.  use to assign to node without outEdges as x-position.
 */


function moveSinksRight(nodes, maxDepth) {
  zrUtil.each(nodes, function (node) {
    if (!isNodeDepth(node) && !node.outEdges.length) {
      node.setLayout({
        depth: maxDepth
      }, true);
    }
  });
}
/**
 * Scale node x-position to the width
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 * @param {number} kx   multiple used to scale nodes
 */


function scaleNodeBreadths(nodes, kx, orient) {
  zrUtil.each(nodes, function (node) {
    var nodeDepth = node.getLayout().depth * kx;
    orient === 'vertical' ? node.setLayout({
      y: nodeDepth
    }, true) : node.setLayout({
      x: nodeDepth
    }, true);
  });
}
/**
 * Using Gauss-Seidel iterations method to compute the node depth(y-position)
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 * @param {module:echarts/data/Graph~Edge} edges  edge of sankey view
 * @param {number} height  the whole height of the area to draw the view
 * @param {number} nodeGap  the vertical distance between two nodes
 *     in the same column.
 * @param {number} iterations  the number of iterations for the algorithm
 */


function computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient) {
  var nodesByBreadth = prepareNodesByBreadth(nodes, orient);
  initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient);
  resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);

  for (var alpha = 1; iterations > 0; iterations--) {
    // 0.99 is a experience parameter, ensure that each iterations of
    // changes as small as possible.
    alpha *= 0.99;
    relaxRightToLeft(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
    relaxLeftToRight(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
  }
}

function prepareNodesByBreadth(nodes, orient) {
  var nodesByBreadth = [];
  var keyAttr = orient === 'vertical' ? 'y' : 'x';
  var groupResult = groupData(nodes, function (node) {
    return node.getLayout()[keyAttr];
  });
  groupResult.keys.sort(function (a, b) {
    return a - b;
  });
  zrUtil.each(groupResult.keys, function (key) {
    nodesByBreadth.push(groupResult.buckets.get(key));
  });
  return nodesByBreadth;
}
/**
 * Compute the original y-position for each node
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 * @param {Array.<Array.<module:echarts/data/Graph~Node>>} nodesByBreadth
 *     group by the array of all sankey nodes based on the nodes x-position.
 * @param {module:echarts/data/Graph~Edge} edges  edge of sankey view
 * @param {number} height  the whole height of the area to draw the view
 * @param {number} nodeGap  the vertical distance between two nodes
 */


function initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient) {
  var minKy = Infinity;
  zrUtil.each(nodesByBreadth, function (nodes) {
    var n = nodes.length;
    var sum = 0;
    zrUtil.each(nodes, function (node) {
      sum += node.getLayout().value;
    });
    var ky = orient === 'vertical' ? (width - (n - 1) * nodeGap) / sum : (height - (n - 1) * nodeGap) / sum;

    if (ky < minKy) {
      minKy = ky;
    }
  });
  zrUtil.each(nodesByBreadth, function (nodes) {
    zrUtil.each(nodes, function (node, i) {
      var nodeDy = node.getLayout().value * minKy;

      if (orient === 'vertical') {
        node.setLayout({
          x: i
        }, true);
        node.setLayout({
          dx: nodeDy
        }, true);
      } else {
        node.setLayout({
          y: i
        }, true);
        node.setLayout({
          dy: nodeDy
        }, true);
      }
    });
  });
  zrUtil.each(edges, function (edge) {
    var edgeDy = +edge.getValue() * minKy;
    edge.setLayout({
      dy: edgeDy
    }, true);
  });
}
/**
 * Resolve the collision of initialized depth (y-position)
 *
 * @param {Array.<Array.<module:echarts/data/Graph~Node>>} nodesByBreadth
 *     group by the array of all sankey nodes based on the nodes x-position.
 * @param {number} nodeGap  the vertical distance between two nodes
 * @param {number} height  the whole height of the area to draw the view
 */


function resolveCollisions(nodesByBreadth, nodeGap, height, width, orient) {
  var keyAttr = orient === 'vertical' ? 'x' : 'y';
  zrUtil.each(nodesByBreadth, function (nodes) {
    nodes.sort(function (a, b) {
      return a.getLayout()[keyAttr] - b.getLayout()[keyAttr];
    });
    var nodeX;
    var node;
    var dy;
    var y0 = 0;
    var n = nodes.length;
    var nodeDyAttr = orient === 'vertical' ? 'dx' : 'dy';

    for (var i = 0; i < n; i++) {
      node = nodes[i];
      dy = y0 - node.getLayout()[keyAttr];

      if (dy > 0) {
        nodeX = node.getLayout()[keyAttr] + dy;
        orient === 'vertical' ? node.setLayout({
          x: nodeX
        }, true) : node.setLayout({
          y: nodeX
        }, true);
      }

      y0 = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap;
    }

    var viewWidth = orient === 'vertical' ? width : height; // If the bottommost node goes outside the bounds, push it back up

    dy = y0 - nodeGap - viewWidth;

    if (dy > 0) {
      nodeX = node.getLayout()[keyAttr] - dy;
      orient === 'vertical' ? node.setLayout({
        x: nodeX
      }, true) : node.setLayout({
        y: nodeX
      }, true);
      y0 = nodeX;

      for (i = n - 2; i >= 0; --i) {
        node = nodes[i];
        dy = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap - y0;

        if (dy > 0) {
          nodeX = node.getLayout()[keyAttr] - dy;
          orient === 'vertical' ? node.setLayout({
            x: nodeX
          }, true) : node.setLayout({
            y: nodeX
          }, true);
        }

        y0 = node.getLayout()[keyAttr];
      }
    }
  });
}
/**
 * Change the y-position of the nodes, except most the right side nodes
 *
 * @param {Array.<Array.<module:echarts/data/Graph~Node>>} nodesByBreadth
 *     group by the array of all sankey nodes based on the node x-position.
 * @param {number} alpha  parameter used to adjust the nodes y-position
 */


function relaxRightToLeft(nodesByBreadth, alpha, orient) {
  zrUtil.each(nodesByBreadth.slice().reverse(), function (nodes) {
    zrUtil.each(nodes, function (node) {
      if (node.outEdges.length) {
        var y = sum(node.outEdges, weightedTarget, orient) / sum(node.outEdges, getEdgeValue, orient);

        if (orient === 'vertical') {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}

function weightedTarget(edge, orient) {
  return center(edge.node2, orient) * edge.getValue();
}

function weightedSource(edge, orient) {
  return center(edge.node1, orient) * edge.getValue();
}

function center(node, orient) {
  return orient === 'vertical' ? node.getLayout().x + node.getLayout().dx / 2 : node.getLayout().y + node.getLayout().dy / 2;
}

function getEdgeValue(edge) {
  return edge.getValue();
}

function sum(array, f, orient) {
  var sum = 0;
  var len = array.length;
  var i = -1;

  while (++i < len) {
    var value = +f.call(array, array[i], orient);

    if (!isNaN(value)) {
      sum += value;
    }
  }

  return sum;
}
/**
 * Change the y-position of the nodes, except most the left side nodes
 *
 * @param {Array.<Array.<module:echarts/data/Graph~Node>>} nodesByBreadth
 *     group by the array of all sankey nodes based on the node x-position.
 * @param {number} alpha  parameter used to adjust the nodes y-position
 */


function relaxLeftToRight(nodesByBreadth, alpha, orient) {
  zrUtil.each(nodesByBreadth, function (nodes) {
    zrUtil.each(nodes, function (node) {
      if (node.inEdges.length) {
        var y = sum(node.inEdges, weightedSource, orient) / sum(node.inEdges, getEdgeValue, orient);

        if (orient === 'vertical') {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}
/**
 * Compute the depth(y-position) of each edge
 *
 * @param {module:echarts/data/Graph~Node} nodes  node of sankey view
 */


function computeEdgeDepths(nodes, orient) {
  var keyAttr = orient === 'vertical' ? 'x' : 'y';
  zrUtil.each(nodes, function (node) {
    node.outEdges.sort(function (a, b) {
      return a.node2.getLayout()[keyAttr] - b.node2.getLayout()[keyAttr];
    });
    node.inEdges.sort(function (a, b) {
      return a.node1.getLayout()[keyAttr] - b.node1.getLayout()[keyAttr];
    });
  });
  zrUtil.each(nodes, function (node) {
    var sy = 0;
    var ty = 0;
    zrUtil.each(node.outEdges, function (edge) {
      edge.setLayout({
        sy: sy
      }, true);
      sy += edge.getLayout().dy;
    });
    zrUtil.each(node.inEdges, function (edge) {
      edge.setLayout({
        ty: ty
      }, true);
      ty += edge.getLayout().dy;
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "abff":
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

var SymbolDraw = __webpack_require__("f706");

var LargeSymbolDraw = __webpack_require__("c965");

var pointsLayout = __webpack_require__("87c3");

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
echarts.extendChartView({
  type: 'scatter',
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();

    var symbolDraw = this._updateSymbolDraw(data, seriesModel);

    symbolDraw.updateData(data, {
      // TODO
      // If this parameter should be a shape or a bounding volume
      // shape will be more general.
      // But bounding volume like bounding rect will be much faster in the contain calculation
      clipShape: this._getClipShape(seriesModel)
    });
    this._finished = true;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();

    var symbolDraw = this._updateSymbolDraw(data, seriesModel);

    symbolDraw.incrementalPrepareUpdate(data);
    this._finished = false;
  },
  incrementalRender: function (taskParams, seriesModel, ecModel) {
    this._symbolDraw.incrementalUpdate(taskParams, seriesModel.getData(), {
      clipShape: this._getClipShape(seriesModel)
    });

    this._finished = taskParams.end === seriesModel.getData().count();
  },
  updateTransform: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData(); // Must mark group dirty and make sure the incremental layer will be cleared
    // PENDING

    this.group.dirty();

    if (!this._finished || data.count() > 1e4 || !this._symbolDraw.isPersistent()) {
      return {
        update: true
      };
    } else {
      var res = pointsLayout().reset(seriesModel);

      if (res.progress) {
        res.progress({
          start: 0,
          end: data.count()
        }, data);
      }

      this._symbolDraw.updateLayout(data);
    }
  },
  _getClipShape: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var clipArea = coordSys && coordSys.getArea && coordSys.getArea();
    return seriesModel.get('clip', true) ? clipArea : null;
  },
  _updateSymbolDraw: function (data, seriesModel) {
    var symbolDraw = this._symbolDraw;
    var pipelineContext = seriesModel.pipelineContext;
    var isLargeDraw = pipelineContext.large;

    if (!symbolDraw || isLargeDraw !== this._isLargeDraw) {
      symbolDraw && symbolDraw.remove();
      symbolDraw = this._symbolDraw = isLargeDraw ? new LargeSymbolDraw() : new SymbolDraw();
      this._isLargeDraw = isLargeDraw;
      this.group.removeAll();
    }

    this.group.add(symbolDraw.group);
    return symbolDraw;
  },
  remove: function (ecModel, api) {
    this._symbolDraw && this._symbolDraw.remove(true);
    this._symbolDraw = null;
  },
  dispose: function () {}
});

/***/ }),

/***/ "bdc0":
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

__webpack_require__("d2a5");

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
  type: 'dragNode',
  event: 'dragnode',
  // here can only use 'update' now, other value is not support in echarts.
  update: 'update'
}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    subType: 'sankey',
    query: payload
  }, function (seriesModel) {
    seriesModel.setNodePosition(payload.dataIndex, [payload.localX, payload.localY]);
  });
});

/***/ }),

/***/ "cb69":
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

var createListFromArray = __webpack_require__("3301");

var SeriesModel = __webpack_require__("4f85");

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
  type: 'series.scatter',
  dependencies: ['grid', 'polar', 'geo', 'singleAxis', 'calendar'],
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this, {
      useEncodeDefaulter: true
    });
  },
  brushSelector: 'point',
  getProgressive: function () {
    var progressive = this.option.progressive;

    if (progressive == null) {
      // PENDING
      return this.option.large ? 5e3 : this.get('progressive');
    }

    return progressive;
  },
  getProgressiveThreshold: function () {
    var progressiveThreshold = this.option.progressiveThreshold;

    if (progressiveThreshold == null) {
      // PENDING
      return this.option.large ? 1e4 : this.get('progressiveThreshold');
    }

    return progressiveThreshold;
  },
  defaultOption: {
    coordinateSystem: 'cartesian2d',
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    hoverAnimation: true,
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // Polar coordinate system
    // polarIndex: 0,
    // Geo coordinate system
    // geoIndex: 0,
    // symbol: null,        // 图形类型
    symbolSize: 10,
    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
    // symbolRotate: null,  // 图形旋转控制
    large: false,
    // Available when large is true
    largeThreshold: 2000,
    // cursor: null,
    // label: {
    // show: false
    // distance: 5,
    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
    //           'inside'|'left'|'right'|'top'|'bottom'
    // 默认使用全局文本样式，详见TEXTSTYLE
    // },
    itemStyle: {
      opacity: 0.8 // color: 各异

    },
    // If clip the overflow graphics
    // Works on cartesian / polar series
    clip: true // progressive: null

  }
});

module.exports = _default;

/***/ }),

/***/ "d01c":
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

var createGraphFromNodeEdge = __webpack_require__("237f");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

var Model = __webpack_require__("4319");

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
var SankeySeries = SeriesModel.extend({
  type: 'series.sankey',
  layoutInfo: null,
  levelModels: null,

  /**
   * Init a graph data structure from data in option series
   *
   * @param  {Object} option  the object used to config echarts view
   * @return {module:echarts/data/List} storage initial data
   */
  getInitialData: function (option, ecModel) {
    var links = option.edges || option.links;
    var nodes = option.data || option.nodes;
    var levels = option.levels;
    var levelModels = this.levelModels = {};

    for (var i = 0; i < levels.length; i++) {
      if (levels[i].depth != null && levels[i].depth >= 0) {
        levelModels[levels[i].depth] = new Model(levels[i], this, ecModel);
      } else {}
    }

    if (nodes && links) {
      var graph = createGraphFromNodeEdge(nodes, links, this, true, beforeLink);
      return graph.data;
    }

    function beforeLink(nodeData, edgeData) {
      nodeData.wrapMethod('getItemModel', function (model, idx) {
        model.customizeGetParent(function (path) {
          var parentModel = this.parentModel;
          var nodeDepth = parentModel.getData().getItemLayout(idx).depth;
          var levelModel = parentModel.levelModels[nodeDepth];
          return levelModel || this.parentModel;
        });
        return model;
      });
      edgeData.wrapMethod('getItemModel', function (model, idx) {
        model.customizeGetParent(function (path) {
          var parentModel = this.parentModel;
          var edge = parentModel.getGraph().getEdgeByIndex(idx);
          var depth = edge.node1.getLayout().depth;
          var levelModel = parentModel.levelModels[depth];
          return levelModel || this.parentModel;
        });
        return model;
      });
    }
  },
  setNodePosition: function (dataIndex, localPosition) {
    var dataItem = this.option.data[dataIndex];
    dataItem.localX = localPosition[0];
    dataItem.localY = localPosition[1];
  },

  /**
   * Return the graphic data structure
   *
   * @return {module:echarts/data/Graph} graphic data structure
   */
  getGraph: function () {
    return this.getData().graph;
  },

  /**
   * Get edge data of graphic data structure
   *
   * @return {module:echarts/data/List} data structure of list
   */
  getEdgeData: function () {
    return this.getGraph().edgeData;
  },

  /**
   * @override
   */
  formatTooltip: function (dataIndex, multipleSeries, dataType) {
    // dataType === 'node' or empty do not show tooltip by default
    if (dataType === 'edge') {
      var params = this.getDataParams(dataIndex, dataType);
      var rawDataOpt = params.data;
      var html = rawDataOpt.source + ' -- ' + rawDataOpt.target;

      if (params.value) {
        html += ' : ' + params.value;
      }

      return encodeHTML(html);
    } else if (dataType === 'node') {
      var node = this.getGraph().getNodeByIndex(dataIndex);
      var value = node.getLayout().value;
      var name = this.getDataParams(dataIndex, dataType).data.name;

      if (value) {
        var html = name + ' : ' + value;
      }

      return encodeHTML(html);
    }

    return SankeySeries.superCall(this, 'formatTooltip', dataIndex, multipleSeries);
  },
  optionUpdated: function () {
    var option = this.option;

    if (option.focusNodeAdjacency === true) {
      option.focusNodeAdjacency = 'allEdges';
    }
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'view',
    layout: null,
    // The position of the whole view
    left: '5%',
    top: '5%',
    right: '20%',
    bottom: '5%',
    // Value can be 'vertical'
    orient: 'horizontal',
    // The dx of the node
    nodeWidth: 20,
    // The vertical distance between two nodes
    nodeGap: 8,
    // Control if the node can move or not
    draggable: true,
    // Value can be 'inEdges', 'outEdges', 'allEdges', true (the same as 'allEdges').
    focusNodeAdjacency: false,
    // The number of iterations to change the position of the node
    layoutIterations: 32,
    label: {
      show: true,
      position: 'right',
      color: '#000',
      fontSize: 12
    },
    levels: [],
    // Value can be 'left' or 'right'
    nodeAlign: 'justify',
    itemStyle: {
      borderWidth: 1,
      borderColor: '#333'
    },
    lineStyle: {
      color: '#314656',
      opacity: 0.2,
      curveness: 0.5
    },
    emphasis: {
      label: {
        show: true
      },
      lineStyle: {
        opacity: 0.6
      }
    },
    animationEasing: 'linear',
    animationDuration: 1000
  }
});
var _default = SankeySeries;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~717e1328.d30ab413.js.map