(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~be6a9b4d"],{

/***/ "0fd3":
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

var Line = __webpack_require__("7e5b");

var zrUtil = __webpack_require__("6d8b");

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var vec2 = __webpack_require__("401b");

var curveUtil = __webpack_require__("4a3f");

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
 * Provide effect for line
 * @module echarts/chart/helper/EffectLine
 */

/**
 * @constructor
 * @extends {module:zrender/graphic/Group}
 * @alias {module:echarts/chart/helper/Line}
 */
function EffectLine(lineData, idx, seriesScope) {
  graphic.Group.call(this);
  this.add(this.createLine(lineData, idx, seriesScope));

  this._updateEffectSymbol(lineData, idx);
}

var effectLineProto = EffectLine.prototype;

effectLineProto.createLine = function (lineData, idx, seriesScope) {
  return new Line(lineData, idx, seriesScope);
};

effectLineProto._updateEffectSymbol = function (lineData, idx) {
  var itemModel = lineData.getItemModel(idx);
  var effectModel = itemModel.getModel('effect');
  var size = effectModel.get('symbolSize');
  var symbolType = effectModel.get('symbol');

  if (!zrUtil.isArray(size)) {
    size = [size, size];
  }

  var color = effectModel.get('color') || lineData.getItemVisual(idx, 'color');
  var symbol = this.childAt(1);

  if (this._symbolType !== symbolType) {
    // Remove previous
    this.remove(symbol);
    symbol = createSymbol(symbolType, -0.5, -0.5, 1, 1, color);
    symbol.z2 = 100;
    symbol.culling = true;
    this.add(symbol);
  } // Symbol may be removed if loop is false


  if (!symbol) {
    return;
  } // Shadow color is same with color in default


  symbol.setStyle('shadowColor', color);
  symbol.setStyle(effectModel.getItemStyle(['color']));
  symbol.attr('scale', size);
  symbol.setColor(color);
  symbol.attr('scale', size);
  this._symbolType = symbolType;

  this._updateEffectAnimation(lineData, effectModel, idx);
};

effectLineProto._updateEffectAnimation = function (lineData, effectModel, idx) {
  var symbol = this.childAt(1);

  if (!symbol) {
    return;
  }

  var self = this;
  var points = lineData.getItemLayout(idx);
  var period = effectModel.get('period') * 1000;
  var loop = effectModel.get('loop');
  var constantSpeed = effectModel.get('constantSpeed');
  var delayExpr = zrUtil.retrieve(effectModel.get('delay'), function (idx) {
    return idx / lineData.count() * period / 3;
  });
  var isDelayFunc = typeof delayExpr === 'function'; // Ignore when updating

  symbol.ignore = true;
  this.updateAnimationPoints(symbol, points);

  if (constantSpeed > 0) {
    period = this.getLineLength(symbol) / constantSpeed * 1000;
  }

  if (period !== this._period || loop !== this._loop) {
    symbol.stopAnimation();
    var delay = delayExpr;

    if (isDelayFunc) {
      delay = delayExpr(idx);
    }

    if (symbol.__t > 0) {
      delay = -period * symbol.__t;
    }

    symbol.__t = 0;
    var animator = symbol.animate('', loop).when(period, {
      __t: 1
    }).delay(delay).during(function () {
      self.updateSymbolPosition(symbol);
    });

    if (!loop) {
      animator.done(function () {
        self.remove(symbol);
      });
    }

    animator.start();
  }

  this._period = period;
  this._loop = loop;
};

effectLineProto.getLineLength = function (symbol) {
  // Not so accurate
  return vec2.dist(symbol.__p1, symbol.__cp1) + vec2.dist(symbol.__cp1, symbol.__p2);
};

effectLineProto.updateAnimationPoints = function (symbol, points) {
  symbol.__p1 = points[0];
  symbol.__p2 = points[1];
  symbol.__cp1 = points[2] || [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2];
};

effectLineProto.updateData = function (lineData, idx, seriesScope) {
  this.childAt(0).updateData(lineData, idx, seriesScope);

  this._updateEffectSymbol(lineData, idx);
};

effectLineProto.updateSymbolPosition = function (symbol) {
  var p1 = symbol.__p1;
  var p2 = symbol.__p2;
  var cp1 = symbol.__cp1;
  var t = symbol.__t;
  var pos = symbol.position;
  var quadraticAt = curveUtil.quadraticAt;
  var quadraticDerivativeAt = curveUtil.quadraticDerivativeAt;
  pos[0] = quadraticAt(p1[0], cp1[0], p2[0], t);
  pos[1] = quadraticAt(p1[1], cp1[1], p2[1], t); // Tangent

  var tx = quadraticDerivativeAt(p1[0], cp1[0], p2[0], t);
  var ty = quadraticDerivativeAt(p1[1], cp1[1], p2[1], t);
  symbol.rotation = -Math.atan2(ty, tx) - Math.PI / 2;
  symbol.ignore = false;
};

effectLineProto.updateLayout = function (lineData, idx) {
  this.childAt(0).updateLayout(lineData, idx);
  var effectModel = lineData.getItemModel(idx).getModel('effect');

  this._updateEffectAnimation(lineData, effectModel, idx);
};

zrUtil.inherits(EffectLine, graphic.Group);
var _default = EffectLine;
module.exports = _default;

/***/ }),

/***/ "1418":
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

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var graphic = __webpack_require__("2306");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

var _labelHelper = __webpack_require__("c775");

var getDefaultLabel = _labelHelper.getDefaultLabel;

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
 * @module echarts/chart/helper/Symbol
 */

/**
 * @constructor
 * @alias {module:echarts/chart/helper/Symbol}
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @extends {module:zrender/graphic/Group}
 */
function SymbolClz(data, idx, seriesScope) {
  graphic.Group.call(this);
  this.updateData(data, idx, seriesScope);
}

var symbolProto = SymbolClz.prototype;
/**
 * @public
 * @static
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @return {Array.<number>} [width, height]
 */

var getSymbolSize = SymbolClz.getSymbolSize = function (data, idx) {
  var symbolSize = data.getItemVisual(idx, 'symbolSize');
  return symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize];
};

function getScale(symbolSize) {
  return [symbolSize[0] / 2, symbolSize[1] / 2];
}

function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}

symbolProto._createSymbol = function (symbolType, data, idx, symbolSize, keepAspect) {
  // Remove paths created before
  this.removeAll();
  var color = data.getItemVisual(idx, 'color'); // var symbolPath = createSymbol(
  //     symbolType, -0.5, -0.5, 1, 1, color
  // );
  // If width/height are set too small (e.g., set to 1) on ios10
  // and macOS Sierra, a circle stroke become a rect, no matter what
  // the scale is set. So we set width/height as 2. See #4150.

  var symbolPath = createSymbol(symbolType, -1, -1, 2, 2, color, keepAspect);
  symbolPath.attr({
    z2: 100,
    culling: true,
    scale: getScale(symbolSize)
  }); // Rewrite drift method

  symbolPath.drift = driftSymbol;
  this._symbolType = symbolType;
  this.add(symbolPath);
};
/**
 * Stop animation
 * @param {boolean} toLastFrame
 */


symbolProto.stopSymbolAnimation = function (toLastFrame) {
  this.childAt(0).stopAnimation(toLastFrame);
};
/**
 * FIXME:
 * Caution: This method breaks the encapsulation of this module,
 * but it indeed brings convenience. So do not use the method
 * unless you detailedly know all the implements of `Symbol`,
 * especially animation.
 *
 * Get symbol path element.
 */


symbolProto.getSymbolPath = function () {
  return this.childAt(0);
};
/**
 * Get scale(aka, current symbol size).
 * Including the change caused by animation
 */


symbolProto.getScale = function () {
  return this.childAt(0).scale;
};
/**
 * Highlight symbol
 */


symbolProto.highlight = function () {
  this.childAt(0).trigger('emphasis');
};
/**
 * Downplay symbol
 */


symbolProto.downplay = function () {
  this.childAt(0).trigger('normal');
};
/**
 * @param {number} zlevel
 * @param {number} z
 */


symbolProto.setZ = function (zlevel, z) {
  var symbolPath = this.childAt(0);
  symbolPath.zlevel = zlevel;
  symbolPath.z = z;
};

symbolProto.setDraggable = function (draggable) {
  var symbolPath = this.childAt(0);
  symbolPath.draggable = draggable;
  symbolPath.cursor = draggable ? 'move' : symbolPath.cursor;
};
/**
 * Update symbol properties
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Object} [seriesScope]
 * @param {Object} [seriesScope.itemStyle]
 * @param {Object} [seriesScope.hoverItemStyle]
 * @param {Object} [seriesScope.symbolRotate]
 * @param {Object} [seriesScope.symbolOffset]
 * @param {module:echarts/model/Model} [seriesScope.labelModel]
 * @param {module:echarts/model/Model} [seriesScope.hoverLabelModel]
 * @param {boolean} [seriesScope.hoverAnimation]
 * @param {Object} [seriesScope.cursorStyle]
 * @param {module:echarts/model/Model} [seriesScope.itemModel]
 * @param {string} [seriesScope.symbolInnerColor]
 * @param {Object} [seriesScope.fadeIn=false]
 */


symbolProto.updateData = function (data, idx, seriesScope) {
  this.silent = false;
  var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
  var seriesModel = data.hostModel;
  var symbolSize = getSymbolSize(data, idx);
  var isInit = symbolType !== this._symbolType;

  if (isInit) {
    var keepAspect = data.getItemVisual(idx, 'symbolKeepAspect');

    this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
  } else {
    var symbolPath = this.childAt(0);
    symbolPath.silent = false;
    graphic.updateProps(symbolPath, {
      scale: getScale(symbolSize)
    }, seriesModel, idx);
  }

  this._updateCommon(data, idx, symbolSize, seriesScope);

  if (isInit) {
    var symbolPath = this.childAt(0);
    var fadeIn = seriesScope && seriesScope.fadeIn;
    var target = {
      scale: symbolPath.scale.slice()
    };
    fadeIn && (target.style = {
      opacity: symbolPath.style.opacity
    });
    symbolPath.scale = [0, 0];
    fadeIn && (symbolPath.style.opacity = 0);
    graphic.initProps(symbolPath, target, seriesModel, idx);
  }

  this._seriesModel = seriesModel;
}; // Update common properties


var normalStyleAccessPath = ['itemStyle'];
var emphasisStyleAccessPath = ['emphasis', 'itemStyle'];
var normalLabelAccessPath = ['label'];
var emphasisLabelAccessPath = ['emphasis', 'label'];
/**
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Array.<number>} symbolSize
 * @param {Object} [seriesScope]
 */

symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
  var symbolPath = this.childAt(0);
  var seriesModel = data.hostModel;
  var color = data.getItemVisual(idx, 'color'); // Reset style

  if (symbolPath.type !== 'image') {
    symbolPath.useStyle({
      strokeNoScale: true
    });
  } else {
    symbolPath.setStyle({
      opacity: null,
      shadowBlur: null,
      shadowOffsetX: null,
      shadowOffsetY: null,
      shadowColor: null
    });
  }

  var itemStyle = seriesScope && seriesScope.itemStyle;
  var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
  var symbolRotate = seriesScope && seriesScope.symbolRotate;
  var symbolOffset = seriesScope && seriesScope.symbolOffset;
  var labelModel = seriesScope && seriesScope.labelModel;
  var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
  var hoverAnimation = seriesScope && seriesScope.hoverAnimation;
  var cursorStyle = seriesScope && seriesScope.cursorStyle;

  if (!seriesScope || data.hasItemOption) {
    var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx); // Color must be excluded.
    // Because symbol provide setColor individually to set fill and stroke

    itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(['color']);
    hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
    symbolRotate = itemModel.getShallow('symbolRotate');
    symbolOffset = itemModel.getShallow('symbolOffset');
    labelModel = itemModel.getModel(normalLabelAccessPath);
    hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
    hoverAnimation = itemModel.getShallow('hoverAnimation');
    cursorStyle = itemModel.getShallow('cursor');
  } else {
    hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
  }

  var elStyle = symbolPath.style;
  symbolPath.attr('rotation', (symbolRotate || 0) * Math.PI / 180 || 0);

  if (symbolOffset) {
    symbolPath.attr('position', [parsePercent(symbolOffset[0], symbolSize[0]), parsePercent(symbolOffset[1], symbolSize[1])]);
  }

  cursorStyle && symbolPath.attr('cursor', cursorStyle); // PENDING setColor before setStyle!!!

  symbolPath.setColor(color, seriesScope && seriesScope.symbolInnerColor);
  symbolPath.setStyle(itemStyle);
  var opacity = data.getItemVisual(idx, 'opacity');

  if (opacity != null) {
    elStyle.opacity = opacity;
  }

  var liftZ = data.getItemVisual(idx, 'liftZ');
  var z2Origin = symbolPath.__z2Origin;

  if (liftZ != null) {
    if (z2Origin == null) {
      symbolPath.__z2Origin = symbolPath.z2;
      symbolPath.z2 += liftZ;
    }
  } else if (z2Origin != null) {
    symbolPath.z2 = z2Origin;
    symbolPath.__z2Origin = null;
  }

  var useNameLabel = seriesScope && seriesScope.useNameLabel;
  graphic.setLabelStyle(elStyle, hoverItemStyle, labelModel, hoverLabelModel, {
    labelFetcher: seriesModel,
    labelDataIndex: idx,
    defaultText: getLabelDefaultText,
    isRectText: true,
    autoColor: color
  }); // Do not execute util needed.

  function getLabelDefaultText(idx, opt) {
    return useNameLabel ? data.getName(idx) : getDefaultLabel(data, idx);
  }

  symbolPath.__symbolOriginalScale = getScale(symbolSize);
  symbolPath.hoverStyle = hoverItemStyle;
  symbolPath.highDownOnUpdate = hoverAnimation && seriesModel.isAnimationEnabled() ? highDownOnUpdate : null;
  graphic.setHoverStyle(symbolPath);
};

function highDownOnUpdate(fromState, toState) {
  // Do not support this hover animation util some scenario required.
  // Animation can only be supported in hover layer when using `el.incremetal`.
  if (this.incremental || this.useHoverLayer) {
    return;
  }

  if (toState === 'emphasis') {
    var scale = this.__symbolOriginalScale;
    var ratio = scale[1] / scale[0];
    var emphasisOpt = {
      scale: [Math.max(scale[0] * 1.1, scale[0] + 3), Math.max(scale[1] * 1.1, scale[1] + 3 * ratio)]
    }; // FIXME
    // modify it after support stop specified animation.
    // toState === fromState
    //     ? (this.stopAnimation(), this.attr(emphasisOpt))

    this.animateTo(emphasisOpt, 400, 'elasticOut');
  } else if (toState === 'normal') {
    this.animateTo({
      scale: this.__symbolOriginalScale
    }, 400, 'elasticOut');
  }
}
/**
 * @param {Function} cb
 * @param {Object} [opt]
 * @param {Object} [opt.keepLabel=true]
 */


symbolProto.fadeOut = function (cb, opt) {
  var symbolPath = this.childAt(0); // Avoid mistaken hover when fading out

  this.silent = symbolPath.silent = true; // Not show text when animating

  !(opt && opt.keepLabel) && (symbolPath.style.text = null);
  graphic.updateProps(symbolPath, {
    style: {
      opacity: 0
    },
    scale: [0, 0]
  }, this._seriesModel, this.dataIndex, cb);
};

zrUtil.inherits(SymbolClz, graphic.Group);
var _default = SymbolClz;
module.exports = _default;

/***/ }),

/***/ "1c5f":
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

var vec2 = __webpack_require__("401b");

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
function simpleLayout(seriesModel) {
  var coordSys = seriesModel.coordinateSystem;

  if (coordSys && coordSys.type !== 'view') {
    return;
  }

  var graph = seriesModel.getGraph();
  graph.eachNode(function (node) {
    var model = node.getModel();
    node.setLayout([+model.get('x'), +model.get('y')]);
  });
  simpleLayoutEdge(graph);
}

function simpleLayoutEdge(graph) {
  graph.eachEdge(function (edge) {
    var curveness = edge.getModel().get('lineStyle.curveness') || 0;
    var p1 = vec2.clone(edge.node1.getLayout());
    var p2 = vec2.clone(edge.node2.getLayout());
    var points = [p1, p2];

    if (+curveness) {
      points.push([(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness]);
    }

    edge.setLayout(points);
  });
}

exports.simpleLayout = simpleLayout;
exports.simpleLayoutEdge = simpleLayoutEdge;

/***/ }),

/***/ "237f":
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

var List = __webpack_require__("6179");

var Graph = __webpack_require__("7368");

var linkList = __webpack_require__("31d9");

var createDimensions = __webpack_require__("b1d4");

var CoordinateSystem = __webpack_require__("2039");

var createListFromArray = __webpack_require__("3301");

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
function _default(nodes, edges, seriesModel, directed, beforeLink) {
  // ??? TODO
  // support dataset?
  var graph = new Graph(directed);

  for (var i = 0; i < nodes.length; i++) {
    graph.addNode(zrUtil.retrieve( // Id, name, dataIndex
    nodes[i].id, nodes[i].name, i), i);
  }

  var linkNameList = [];
  var validEdges = [];
  var linkCount = 0;

  for (var i = 0; i < edges.length; i++) {
    var link = edges[i];
    var source = link.source;
    var target = link.target; // addEdge may fail when source or target not exists

    if (graph.addEdge(source, target, linkCount)) {
      validEdges.push(link);
      linkNameList.push(zrUtil.retrieve(link.id, source + ' > ' + target));
      linkCount++;
    }
  }

  var coordSys = seriesModel.get('coordinateSystem');
  var nodeData;

  if (coordSys === 'cartesian2d' || coordSys === 'polar') {
    nodeData = createListFromArray(nodes, seriesModel);
  } else {
    var coordSysCtor = CoordinateSystem.get(coordSys);
    var coordDimensions = coordSysCtor && coordSysCtor.type !== 'view' ? coordSysCtor.dimensions || [] : []; // FIXME: Some geo do not need `value` dimenson, whereas `calendar` needs
    // `value` dimension, but graph need `value` dimension. It's better to
    // uniform this behavior.

    if (zrUtil.indexOf(coordDimensions, 'value') < 0) {
      coordDimensions.concat(['value']);
    }

    var dimensionNames = createDimensions(nodes, {
      coordDimensions: coordDimensions
    });
    nodeData = new List(dimensionNames, seriesModel);
    nodeData.initData(nodes);
  }

  var edgeData = new List(['value'], seriesModel);
  edgeData.initData(validEdges, linkNameList);
  beforeLink && beforeLink(nodeData, edgeData);
  linkList({
    mainData: nodeData,
    struct: graph,
    structAttr: 'graph',
    datas: {
      node: nodeData,
      edge: edgeData
    },
    datasAttr: {
      node: 'data',
      edge: 'edgeData'
    }
  }); // Update dataIndex of nodes and edges because invalid edge may be removed

  graph.update();
  return graph;
}

module.exports = _default;

/***/ }),

/***/ "23ee":
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

__webpack_require__("879e");

__webpack_require__("9704");

__webpack_require__("d747");

var categoryFilter = __webpack_require__("675a");

var visualSymbol = __webpack_require__("7f96");

var categoryVisual = __webpack_require__("2943");

var edgeVisual = __webpack_require__("de6e");

var simpleLayout = __webpack_require__("d357");

var circularLayout = __webpack_require__("adda");

var forceLayout = __webpack_require__("5866");

var createView = __webpack_require__("7b0c");

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
echarts.registerProcessor(categoryFilter);
echarts.registerVisual(visualSymbol('graph', 'circle', null));
echarts.registerVisual(categoryVisual);
echarts.registerVisual(edgeVisual);
echarts.registerLayout(simpleLayout);
echarts.registerLayout(echarts.PRIORITY.VISUAL.POST_CHART_LAYOUT, circularLayout);
echarts.registerLayout(forceLayout); // Graph view coordinate system

echarts.registerCoordinateSystem('graphView', {
  create: createView
});

/***/ }),

/***/ "2943":
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
function _default(ecModel) {
  var paletteScope = {};
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    var categoriesData = seriesModel.getCategoriesData();
    var data = seriesModel.getData();
    var categoryNameIdxMap = {};
    categoriesData.each(function (idx) {
      var name = categoriesData.getName(idx); // Add prefix to avoid conflict with Object.prototype.

      categoryNameIdxMap['ec-' + name] = idx;
      var itemModel = categoriesData.getItemModel(idx);
      var color = itemModel.get('itemStyle.color') || seriesModel.getColorFromPalette(name, paletteScope);
      categoriesData.setItemVisual(idx, 'color', color);
      var itemStyleList = ['opacity', 'symbol', 'symbolSize', 'symbolKeepAspect'];

      for (var i = 0; i < itemStyleList.length; i++) {
        var itemStyle = itemModel.getShallow(itemStyleList[i], true);

        if (itemStyle != null) {
          categoriesData.setItemVisual(idx, itemStyleList[i], itemStyle);
        }
      }
    }); // Assign category color to visual

    if (categoriesData.count()) {
      data.each(function (idx) {
        var model = data.getItemModel(idx);
        var category = model.getShallow('category');

        if (category != null) {
          if (typeof category === 'string') {
            category = categoryNameIdxMap['ec-' + category];
          }

          var itemStyleList = ['color', 'opacity', 'symbol', 'symbolSize', 'symbolKeepAspect'];

          for (var i = 0; i < itemStyleList.length; i++) {
            if (data.getItemVisual(idx, itemStyleList[i], true) == null) {
              data.setItemVisual(idx, itemStyleList[i], categoriesData.getItemVisual(category, itemStyleList[i]));
            }
          }
        }
      });
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "3301":
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

var List = __webpack_require__("6179");

var createDimensions = __webpack_require__("b1d4");

var _sourceType = __webpack_require__("93d0");

var SOURCE_FORMAT_ORIGINAL = _sourceType.SOURCE_FORMAT_ORIGINAL;

var _dimensionHelper = __webpack_require__("2f45");

var getDimensionTypeByAxis = _dimensionHelper.getDimensionTypeByAxis;

var _model = __webpack_require__("e0d3");

var getDataItemValue = _model.getDataItemValue;

var CoordinateSystem = __webpack_require__("2039");

var _referHelper = __webpack_require__("8b7f0");

var getCoordSysInfoBySeries = _referHelper.getCoordSysInfoBySeries;

var Source = __webpack_require__("ec6f");

var _dataStackHelper = __webpack_require__("ee1a");

var enableDataStack = _dataStackHelper.enableDataStack;

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForAxisCoordSys = _sourceHelper.makeSeriesEncodeForAxisCoordSys;

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
 * @param {module:echarts/data/Source|Array} source Or raw data.
 * @param {module:echarts/model/Series} seriesModel
 * @param {Object} [opt]
 * @param {string} [opt.generateCoord]
 * @param {boolean} [opt.useEncodeDefaulter]
 */
function createListFromArray(source, seriesModel, opt) {
  opt = opt || {};

  if (!Source.isInstance(source)) {
    source = Source.seriesDataToSource(source);
  }

  var coordSysName = seriesModel.get('coordinateSystem');
  var registeredCoordSys = CoordinateSystem.get(coordSysName);
  var coordSysInfo = getCoordSysInfoBySeries(seriesModel);
  var coordSysDimDefs;

  if (coordSysInfo) {
    coordSysDimDefs = zrUtil.map(coordSysInfo.coordSysDims, function (dim) {
      var dimInfo = {
        name: dim
      };
      var axisModel = coordSysInfo.axisMap.get(dim);

      if (axisModel) {
        var axisType = axisModel.get('type');
        dimInfo.type = getDimensionTypeByAxis(axisType); // dimInfo.stackable = isStackable(axisType);
      }

      return dimInfo;
    });
  }

  if (!coordSysDimDefs) {
    // Get dimensions from registered coordinate system
    coordSysDimDefs = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ['x', 'y'];
  }

  var dimInfoList = createDimensions(source, {
    coordDimensions: coordSysDimDefs,
    generateCoord: opt.generateCoord,
    encodeDefaulter: opt.useEncodeDefaulter ? zrUtil.curry(makeSeriesEncodeForAxisCoordSys, coordSysDimDefs, seriesModel) : null
  });
  var firstCategoryDimIndex;
  var hasNameEncode;
  coordSysInfo && zrUtil.each(dimInfoList, function (dimInfo, dimIndex) {
    var coordDim = dimInfo.coordDim;
    var categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim);

    if (categoryAxisModel) {
      if (firstCategoryDimIndex == null) {
        firstCategoryDimIndex = dimIndex;
      }

      dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta();
    }

    if (dimInfo.otherDims.itemName != null) {
      hasNameEncode = true;
    }
  });

  if (!hasNameEncode && firstCategoryDimIndex != null) {
    dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0;
  }

  var stackCalculationInfo = enableDataStack(seriesModel, dimInfoList);
  var list = new List(dimInfoList, seriesModel);
  list.setCalculationInfo(stackCalculationInfo);
  var dimValueGetter = firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source) ? function (itemOpt, dimName, dataIndex, dimIndex) {
    // Use dataIndex as ordinal value in categoryAxis
    return dimIndex === firstCategoryDimIndex ? dataIndex : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex);
  } : null;
  list.hasItemOption = false;
  list.initData(source, null, dimValueGetter);
  return list;
}

function isNeedCompleteOrdinalData(source) {
  if (source.sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var sampleItem = firstDataNotNull(source.data || []);
    return sampleItem != null && !zrUtil.isArray(getDataItemValue(sampleItem));
  }
}

function firstDataNotNull(data) {
  var i = 0;

  while (i < data.length && data[i] == null) {
    i++;
  }

  return data[i];
}

var _default = createListFromArray;
module.exports = _default;

/***/ }),

/***/ "3970":
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

var createListFromArray = __webpack_require__("3301");

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
var _default = SeriesModel.extend({
  type: 'series.heatmap',
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this, {
      generateCoord: 'value'
    });
  },
  preventIncremental: function () {
    var coordSysCreator = CoordinateSystem.get(this.get('coordinateSystem'));

    if (coordSysCreator && coordSysCreator.dimensions) {
      return coordSysCreator.dimensions[0] === 'lng' && coordSysCreator.dimensions[1] === 'lat';
    }
  },
  defaultOption: {
    // Cartesian2D or geo
    coordinateSystem: 'cartesian2d',
    zlevel: 0,
    z: 2,
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // Geo coordinate system
    geoIndex: 0,
    blurSize: 30,
    pointSize: 20,
    maxOpacity: 1,
    minOpacity: 0
  }
});

module.exports = _default;

/***/ }),

/***/ "4527":
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
 * @module echarts/chart/helper/Line
 */

/**
 * @constructor
 * @extends {module:zrender/graphic/Group}
 * @alias {module:echarts/chart/helper/Polyline}
 */
function Polyline(lineData, idx, seriesScope) {
  graphic.Group.call(this);

  this._createPolyline(lineData, idx, seriesScope);
}

var polylineProto = Polyline.prototype;

polylineProto._createPolyline = function (lineData, idx, seriesScope) {
  // var seriesModel = lineData.hostModel;
  var points = lineData.getItemLayout(idx);
  var line = new graphic.Polyline({
    shape: {
      points: points
    }
  });
  this.add(line);

  this._updateCommonStl(lineData, idx, seriesScope);
};

polylineProto.updateData = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var line = this.childAt(0);
  var target = {
    shape: {
      points: lineData.getItemLayout(idx)
    }
  };
  graphic.updateProps(line, target, seriesModel, idx);

  this._updateCommonStl(lineData, idx, seriesScope);
};

polylineProto._updateCommonStl = function (lineData, idx, seriesScope) {
  var line = this.childAt(0);
  var itemModel = lineData.getItemModel(idx);
  var visualColor = lineData.getItemVisual(idx, 'color');
  var lineStyle = seriesScope && seriesScope.lineStyle;
  var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;

  if (!seriesScope || lineData.hasItemOption) {
    lineStyle = itemModel.getModel('lineStyle').getLineStyle();
    hoverLineStyle = itemModel.getModel('emphasis.lineStyle').getLineStyle();
  }

  line.useStyle(zrUtil.defaults({
    strokeNoScale: true,
    fill: 'none',
    stroke: visualColor
  }, lineStyle));
  line.hoverStyle = hoverLineStyle;
  graphic.setHoverStyle(this);
};

polylineProto.updateLayout = function (lineData, idx) {
  var polyline = this.childAt(0);
  polyline.setShape('points', lineData.getItemLayout(idx));
};

zrUtil.inherits(Polyline, graphic.Group);
var _default = Polyline;
module.exports = _default;

/***/ }),

/***/ "480e":
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

var graphic = __webpack_require__("2306");

var HeatmapLayer = __webpack_require__("cd84");

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
function getIsInPiecewiseRange(dataExtent, pieceList, selected) {
  var dataSpan = dataExtent[1] - dataExtent[0];
  pieceList = zrUtil.map(pieceList, function (piece) {
    return {
      interval: [(piece.interval[0] - dataExtent[0]) / dataSpan, (piece.interval[1] - dataExtent[0]) / dataSpan]
    };
  });
  var len = pieceList.length;
  var lastIndex = 0;
  return function (val) {
    // Try to find in the location of the last found
    for (var i = lastIndex; i < len; i++) {
      var interval = pieceList[i].interval;

      if (interval[0] <= val && val <= interval[1]) {
        lastIndex = i;
        break;
      }
    }

    if (i === len) {
      // Not found, back interation
      for (var i = lastIndex - 1; i >= 0; i--) {
        var interval = pieceList[i].interval;

        if (interval[0] <= val && val <= interval[1]) {
          lastIndex = i;
          break;
        }
      }
    }

    return i >= 0 && i < len && selected[i];
  };
}

function getIsInContinuousRange(dataExtent, range) {
  var dataSpan = dataExtent[1] - dataExtent[0];
  range = [(range[0] - dataExtent[0]) / dataSpan, (range[1] - dataExtent[0]) / dataSpan];
  return function (val) {
    return val >= range[0] && val <= range[1];
  };
}

function isGeoCoordSys(coordSys) {
  var dimensions = coordSys.dimensions; // Not use coorSys.type === 'geo' because coordSys maybe extended

  return dimensions[0] === 'lng' && dimensions[1] === 'lat';
}

var _default = echarts.extendChartView({
  type: 'heatmap',
  render: function (seriesModel, ecModel, api) {
    var visualMapOfThisSeries;
    ecModel.eachComponent('visualMap', function (visualMap) {
      visualMap.eachTargetSeries(function (targetSeries) {
        if (targetSeries === seriesModel) {
          visualMapOfThisSeries = visualMap;
        }
      });
    });
    this.group.removeAll();
    this._incrementalDisplayable = null;
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys.type === 'cartesian2d' || coordSys.type === 'calendar') {
      this._renderOnCartesianAndCalendar(seriesModel, api, 0, seriesModel.getData().count());
    } else if (isGeoCoordSys(coordSys)) {
      this._renderOnGeo(coordSys, seriesModel, visualMapOfThisSeries, api);
    }
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this.group.removeAll();
  },
  incrementalRender: function (params, seriesModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys) {
      this._renderOnCartesianAndCalendar(seriesModel, api, params.start, params.end, true);
    }
  },
  _renderOnCartesianAndCalendar: function (seriesModel, api, start, end, incremental) {
    var coordSys = seriesModel.coordinateSystem;
    var width;
    var height;

    if (coordSys.type === 'cartesian2d') {
      var xAxis = coordSys.getAxis('x');
      var yAxis = coordSys.getAxis('y');
      width = xAxis.getBandWidth();
      height = yAxis.getBandWidth();
    }

    var group = this.group;
    var data = seriesModel.getData();
    var itemStyleQuery = 'itemStyle';
    var hoverItemStyleQuery = 'emphasis.itemStyle';
    var labelQuery = 'label';
    var hoverLabelQuery = 'emphasis.label';
    var style = seriesModel.getModel(itemStyleQuery).getItemStyle(['color']);
    var hoverStl = seriesModel.getModel(hoverItemStyleQuery).getItemStyle();
    var labelModel = seriesModel.getModel(labelQuery);
    var hoverLabelModel = seriesModel.getModel(hoverLabelQuery);
    var coordSysType = coordSys.type;
    var dataDims = coordSysType === 'cartesian2d' ? [data.mapDimension('x'), data.mapDimension('y'), data.mapDimension('value')] : [data.mapDimension('time'), data.mapDimension('value')];

    for (var idx = start; idx < end; idx++) {
      var rect;

      if (coordSysType === 'cartesian2d') {
        // Ignore empty data
        if (isNaN(data.get(dataDims[2], idx))) {
          continue;
        }

        var point = coordSys.dataToPoint([data.get(dataDims[0], idx), data.get(dataDims[1], idx)]);
        rect = new graphic.Rect({
          shape: {
            x: Math.floor(point[0] - width / 2),
            y: Math.floor(point[1] - height / 2),
            width: Math.ceil(width),
            height: Math.ceil(height)
          },
          style: {
            fill: data.getItemVisual(idx, 'color'),
            opacity: data.getItemVisual(idx, 'opacity')
          }
        });
      } else {
        // Ignore empty data
        if (isNaN(data.get(dataDims[1], idx))) {
          continue;
        }

        rect = new graphic.Rect({
          z2: 1,
          shape: coordSys.dataToRect([data.get(dataDims[0], idx)]).contentShape,
          style: {
            fill: data.getItemVisual(idx, 'color'),
            opacity: data.getItemVisual(idx, 'opacity')
          }
        });
      }

      var itemModel = data.getItemModel(idx); // Optimization for large datset

      if (data.hasItemOption) {
        style = itemModel.getModel(itemStyleQuery).getItemStyle(['color']);
        hoverStl = itemModel.getModel(hoverItemStyleQuery).getItemStyle();
        labelModel = itemModel.getModel(labelQuery);
        hoverLabelModel = itemModel.getModel(hoverLabelQuery);
      }

      var rawValue = seriesModel.getRawValue(idx);
      var defaultText = '-';

      if (rawValue && rawValue[2] != null) {
        defaultText = rawValue[2];
      }

      graphic.setLabelStyle(style, hoverStl, labelModel, hoverLabelModel, {
        labelFetcher: seriesModel,
        labelDataIndex: idx,
        defaultText: defaultText,
        isRectText: true
      });
      rect.setStyle(style);
      graphic.setHoverStyle(rect, data.hasItemOption ? hoverStl : zrUtil.extend({}, hoverStl));
      rect.incremental = incremental; // PENDING

      if (incremental) {
        // Rect must use hover layer if it's incremental.
        rect.useHoverLayer = true;
      }

      group.add(rect);
      data.setItemGraphicEl(idx, rect);
    }
  },
  _renderOnGeo: function (geo, seriesModel, visualMapModel, api) {
    var inRangeVisuals = visualMapModel.targetVisuals.inRange;
    var outOfRangeVisuals = visualMapModel.targetVisuals.outOfRange; // if (!visualMapping) {
    //     throw new Error('Data range must have color visuals');
    // }

    var data = seriesModel.getData();
    var hmLayer = this._hmLayer || this._hmLayer || new HeatmapLayer();
    hmLayer.blurSize = seriesModel.get('blurSize');
    hmLayer.pointSize = seriesModel.get('pointSize');
    hmLayer.minOpacity = seriesModel.get('minOpacity');
    hmLayer.maxOpacity = seriesModel.get('maxOpacity');
    var rect = geo.getViewRect().clone();
    var roamTransform = geo.getRoamTransform();
    rect.applyTransform(roamTransform); // Clamp on viewport

    var x = Math.max(rect.x, 0);
    var y = Math.max(rect.y, 0);
    var x2 = Math.min(rect.width + rect.x, api.getWidth());
    var y2 = Math.min(rect.height + rect.y, api.getHeight());
    var width = x2 - x;
    var height = y2 - y;
    var dims = [data.mapDimension('lng'), data.mapDimension('lat'), data.mapDimension('value')];
    var points = data.mapArray(dims, function (lng, lat, value) {
      var pt = geo.dataToPoint([lng, lat]);
      pt[0] -= x;
      pt[1] -= y;
      pt.push(value);
      return pt;
    });
    var dataExtent = visualMapModel.getExtent();
    var isInRange = visualMapModel.type === 'visualMap.continuous' ? getIsInContinuousRange(dataExtent, visualMapModel.option.range) : getIsInPiecewiseRange(dataExtent, visualMapModel.getPieceList(), visualMapModel.option.selected);
    hmLayer.update(points, width, height, inRangeVisuals.color.getNormalizer(), {
      inRange: inRangeVisuals.color.getColorMapper(),
      outOfRange: outOfRangeVisuals.color.getColorMapper()
    }, isInRange);
    var img = new graphic.Image({
      style: {
        width: width,
        height: height,
        x: x,
        y: y,
        image: hmLayer.canvas
      },
      silent: true
    });
    this.group.add(img);
  },
  dispose: function () {}
});

module.exports = _default;

/***/ }),

/***/ "480f":
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

var curveTool = __webpack_require__("4a3f");

var vec2 = __webpack_require__("401b");

var _graphHelper = __webpack_require__("53f3");

var getSymbolSize = _graphHelper.getSymbolSize;

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
var v1 = [];
var v2 = [];
var v3 = [];
var quadraticAt = curveTool.quadraticAt;
var v2DistSquare = vec2.distSquare;
var mathAbs = Math.abs;

function intersectCurveCircle(curvePoints, center, radius) {
  var p0 = curvePoints[0];
  var p1 = curvePoints[1];
  var p2 = curvePoints[2];
  var d = Infinity;
  var t;
  var radiusSquare = radius * radius;
  var interval = 0.1;

  for (var _t = 0.1; _t <= 0.9; _t += 0.1) {
    v1[0] = quadraticAt(p0[0], p1[0], p2[0], _t);
    v1[1] = quadraticAt(p0[1], p1[1], p2[1], _t);
    var diff = mathAbs(v2DistSquare(v1, center) - radiusSquare);

    if (diff < d) {
      d = diff;
      t = _t;
    }
  } // Assume the segment is monotone，Find root through Bisection method
  // At most 32 iteration


  for (var i = 0; i < 32; i++) {
    // var prev = t - interval;
    var next = t + interval; // v1[0] = quadraticAt(p0[0], p1[0], p2[0], prev);
    // v1[1] = quadraticAt(p0[1], p1[1], p2[1], prev);

    v2[0] = quadraticAt(p0[0], p1[0], p2[0], t);
    v2[1] = quadraticAt(p0[1], p1[1], p2[1], t);
    v3[0] = quadraticAt(p0[0], p1[0], p2[0], next);
    v3[1] = quadraticAt(p0[1], p1[1], p2[1], next);
    var diff = v2DistSquare(v2, center) - radiusSquare;

    if (mathAbs(diff) < 1e-2) {
      break;
    } // var prevDiff = v2DistSquare(v1, center) - radiusSquare;


    var nextDiff = v2DistSquare(v3, center) - radiusSquare;
    interval /= 2;

    if (diff < 0) {
      if (nextDiff >= 0) {
        t = t + interval;
      } else {
        t = t - interval;
      }
    } else {
      if (nextDiff >= 0) {
        t = t - interval;
      } else {
        t = t + interval;
      }
    }
  }

  return t;
} // Adjust edge to avoid


function _default(graph, scale) {
  var tmp0 = [];
  var quadraticSubdivide = curveTool.quadraticSubdivide;
  var pts = [[], [], []];
  var pts2 = [[], []];
  var v = [];
  scale /= 2;
  graph.eachEdge(function (edge, idx) {
    var linePoints = edge.getLayout();
    var fromSymbol = edge.getVisual('fromSymbol');
    var toSymbol = edge.getVisual('toSymbol');

    if (!linePoints.__original) {
      linePoints.__original = [vec2.clone(linePoints[0]), vec2.clone(linePoints[1])];

      if (linePoints[2]) {
        linePoints.__original.push(vec2.clone(linePoints[2]));
      }
    }

    var originalPoints = linePoints.__original; // Quadratic curve

    if (linePoints[2] != null) {
      vec2.copy(pts[0], originalPoints[0]);
      vec2.copy(pts[1], originalPoints[2]);
      vec2.copy(pts[2], originalPoints[1]);

      if (fromSymbol && fromSymbol !== 'none') {
        var symbolSize = getSymbolSize(edge.node1);
        var t = intersectCurveCircle(pts, originalPoints[0], symbolSize * scale); // Subdivide and get the second

        quadraticSubdivide(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
        pts[0][0] = tmp0[3];
        pts[1][0] = tmp0[4];
        quadraticSubdivide(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
        pts[0][1] = tmp0[3];
        pts[1][1] = tmp0[4];
      }

      if (toSymbol && toSymbol !== 'none') {
        var symbolSize = getSymbolSize(edge.node2);
        var t = intersectCurveCircle(pts, originalPoints[1], symbolSize * scale); // Subdivide and get the first

        quadraticSubdivide(pts[0][0], pts[1][0], pts[2][0], t, tmp0);
        pts[1][0] = tmp0[1];
        pts[2][0] = tmp0[2];
        quadraticSubdivide(pts[0][1], pts[1][1], pts[2][1], t, tmp0);
        pts[1][1] = tmp0[1];
        pts[2][1] = tmp0[2];
      } // Copy back to layout


      vec2.copy(linePoints[0], pts[0]);
      vec2.copy(linePoints[1], pts[2]);
      vec2.copy(linePoints[2], pts[1]);
    } // Line
    else {
        vec2.copy(pts2[0], originalPoints[0]);
        vec2.copy(pts2[1], originalPoints[1]);
        vec2.sub(v, pts2[1], pts2[0]);
        vec2.normalize(v, v);

        if (fromSymbol && fromSymbol !== 'none') {
          var symbolSize = getSymbolSize(edge.node1);
          vec2.scaleAndAdd(pts2[0], pts2[0], v, symbolSize * scale);
        }

        if (toSymbol && toSymbol !== 'none') {
          var symbolSize = getSymbolSize(edge.node2);
          vec2.scaleAndAdd(pts2[1], pts2[1], v, -symbolSize * scale);
        }

        vec2.copy(linePoints[0], pts2[0]);
        vec2.copy(linePoints[1], pts2[1]);
      }
  });
}

module.exports = _default;

/***/ }),

/***/ "53f3":
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
function getNodeGlobalScale(seriesModel) {
  var coordSys = seriesModel.coordinateSystem;

  if (coordSys.type !== 'view') {
    return 1;
  }

  var nodeScaleRatio = seriesModel.option.nodeScaleRatio;
  var groupScale = coordSys.scale;
  var groupZoom = groupScale && groupScale[0] || 1; // Scale node when zoom changes

  var roamZoom = coordSys.getZoom();
  var nodeScale = (roamZoom - 1) * nodeScaleRatio + 1;
  return nodeScale / groupZoom;
}

function getSymbolSize(node) {
  var symbolSize = node.getVisual('symbolSize');

  if (symbolSize instanceof Array) {
    symbolSize = (symbolSize[0] + symbolSize[1]) / 2;
  }

  return +symbolSize;
}

exports.getNodeGlobalScale = getNodeGlobalScale;
exports.getSymbolSize = getSymbolSize;

/***/ }),

/***/ "55ac":
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
function retrieveTargetInfo(payload, validPayloadTypes, seriesModel) {
  if (payload && zrUtil.indexOf(validPayloadTypes, payload.type) >= 0) {
    var root = seriesModel.getData().tree.root;
    var targetNode = payload.targetNode;

    if (typeof targetNode === 'string') {
      targetNode = root.getNodeById(targetNode);
    }

    if (targetNode && root.contains(targetNode)) {
      return {
        node: targetNode
      };
    }

    var targetNodeId = payload.targetNodeId;

    if (targetNodeId != null && (targetNode = root.getNodeById(targetNodeId))) {
      return {
        node: targetNode
      };
    }
  }
} // Not includes the given node at the last item.


function getPathToRoot(node) {
  var path = [];

  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }

  return path.reverse();
}

function aboveViewRoot(viewRoot, node) {
  var viewPath = getPathToRoot(viewRoot);
  return zrUtil.indexOf(viewPath, node) >= 0;
} // From root to the input node (the input node will be included).


function wrapTreePathInfo(node, seriesModel) {
  var treePathInfo = [];

  while (node) {
    var nodeDataIndex = node.dataIndex;
    treePathInfo.push({
      name: node.name,
      dataIndex: nodeDataIndex,
      value: seriesModel.getRawValue(nodeDataIndex)
    });
    node = node.parentNode;
  }

  treePathInfo.reverse();
  return treePathInfo;
}

exports.retrieveTargetInfo = retrieveTargetInfo;
exports.getPathToRoot = getPathToRoot;
exports.aboveViewRoot = aboveViewRoot;
exports.wrapTreePathInfo = wrapTreePathInfo;

/***/ }),

/***/ "5866":
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

var _forceHelper = __webpack_require__("ef2b");

var forceLayout = _forceHelper.forceLayout;

var _simpleLayoutHelper = __webpack_require__("1c5f");

var simpleLayout = _simpleLayoutHelper.simpleLayout;

var _circularLayoutHelper = __webpack_require__("94e4");

var circularLayout = _circularLayoutHelper.circularLayout;

var _number = __webpack_require__("3842");

var linearMap = _number.linearMap;

var vec2 = __webpack_require__("401b");

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
function _default(ecModel) {
  ecModel.eachSeriesByType('graph', function (graphSeries) {
    var coordSys = graphSeries.coordinateSystem;

    if (coordSys && coordSys.type !== 'view') {
      return;
    }

    if (graphSeries.get('layout') === 'force') {
      var preservedPoints = graphSeries.preservedPoints || {};
      var graph = graphSeries.getGraph();
      var nodeData = graph.data;
      var edgeData = graph.edgeData;
      var forceModel = graphSeries.getModel('force');
      var initLayout = forceModel.get('initLayout');

      if (graphSeries.preservedPoints) {
        nodeData.each(function (idx) {
          var id = nodeData.getId(idx);
          nodeData.setItemLayout(idx, preservedPoints[id] || [NaN, NaN]);
        });
      } else if (!initLayout || initLayout === 'none') {
        simpleLayout(graphSeries);
      } else if (initLayout === 'circular') {
        circularLayout(graphSeries, 'value');
      }

      var nodeDataExtent = nodeData.getDataExtent('value');
      var edgeDataExtent = edgeData.getDataExtent('value'); // var edgeDataExtent = edgeData.getDataExtent('value');

      var repulsion = forceModel.get('repulsion');
      var edgeLength = forceModel.get('edgeLength');

      if (!zrUtil.isArray(repulsion)) {
        repulsion = [repulsion, repulsion];
      }

      if (!zrUtil.isArray(edgeLength)) {
        edgeLength = [edgeLength, edgeLength];
      } // Larger value has smaller length


      edgeLength = [edgeLength[1], edgeLength[0]];
      var nodes = nodeData.mapArray('value', function (value, idx) {
        var point = nodeData.getItemLayout(idx);
        var rep = linearMap(value, nodeDataExtent, repulsion);

        if (isNaN(rep)) {
          rep = (repulsion[0] + repulsion[1]) / 2;
        }

        return {
          w: rep,
          rep: rep,
          fixed: nodeData.getItemModel(idx).get('fixed'),
          p: !point || isNaN(point[0]) || isNaN(point[1]) ? null : point
        };
      });
      var edges = edgeData.mapArray('value', function (value, idx) {
        var edge = graph.getEdgeByIndex(idx);
        var d = linearMap(value, edgeDataExtent, edgeLength);

        if (isNaN(d)) {
          d = (edgeLength[0] + edgeLength[1]) / 2;
        }

        var edgeModel = edge.getModel();
        return {
          n1: nodes[edge.node1.dataIndex],
          n2: nodes[edge.node2.dataIndex],
          d: d,
          curveness: edgeModel.get('lineStyle.curveness') || 0,
          ignoreForceLayout: edgeModel.get('ignoreForceLayout')
        };
      });
      var coordSys = graphSeries.coordinateSystem;
      var rect = coordSys.getBoundingRect();
      var forceInstance = forceLayout(nodes, edges, {
        rect: rect,
        gravity: forceModel.get('gravity'),
        friction: forceModel.get('friction')
      });
      var oldStep = forceInstance.step;

      forceInstance.step = function (cb) {
        for (var i = 0, l = nodes.length; i < l; i++) {
          if (nodes[i].fixed) {
            // Write back to layout instance
            vec2.copy(nodes[i].p, graph.getNodeByIndex(i).getLayout());
          }
        }

        oldStep(function (nodes, edges, stopped) {
          for (var i = 0, l = nodes.length; i < l; i++) {
            if (!nodes[i].fixed) {
              graph.getNodeByIndex(i).setLayout(nodes[i].p);
            }

            preservedPoints[nodeData.getId(i)] = nodes[i].p;
          }

          for (var i = 0, l = edges.length; i < l; i++) {
            var e = edges[i];
            var edge = graph.getEdgeByIndex(i);
            var p1 = e.n1.p;
            var p2 = e.n2.p;
            var points = edge.getLayout();
            points = points ? points.slice() : [];
            points[0] = points[0] || [];
            points[1] = points[1] || [];
            vec2.copy(points[0], p1);
            vec2.copy(points[1], p2);

            if (+e.curveness) {
              points[2] = [(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * e.curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * e.curveness];
            }

            edge.setLayout(points);
          } // Update layout


          cb && cb(stopped);
        });
      };

      graphSeries.forceLayout = forceInstance;
      graphSeries.preservedPoints = preservedPoints; // Step to get the layout

      forceInstance.step();
    } else {
      // Remove prev injected forceLayout instance
      graphSeries.forceLayout = null;
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "5ce2":
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

__webpack_require__("3970");

__webpack_require__("480e");

/***/ }),

/***/ "675a":
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
function _default(ecModel) {
  var legendModels = ecModel.findComponents({
    mainType: 'legend'
  });

  if (!legendModels || !legendModels.length) {
    return;
  }

  ecModel.eachSeriesByType('graph', function (graphSeries) {
    var categoriesData = graphSeries.getCategoriesData();
    var graph = graphSeries.getGraph();
    var data = graph.data;
    var categoryNames = categoriesData.mapArray(categoriesData.getName);
    data.filterSelf(function (idx) {
      var model = data.getItemModel(idx);
      var category = model.getShallow('category');

      if (category != null) {
        if (typeof category === 'number') {
          category = categoryNames[category];
        } // If in any legend component the status is not selected.


        for (var i = 0; i < legendModels.length; i++) {
          if (!legendModels[i].isSelected(category)) {
            return false;
          }
        }
      }

      return true;
    });
  }, this);
}

module.exports = _default;

/***/ }),

/***/ "6a4c":
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

var Polyline = __webpack_require__("4527");

var zrUtil = __webpack_require__("6d8b");

var EffectLine = __webpack_require__("0fd3");

var vec2 = __webpack_require__("401b");

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
 * Provide effect for line
 * @module echarts/chart/helper/EffectLine
 */

/**
 * @constructor
 * @extends {module:echarts/chart/helper/EffectLine}
 * @alias {module:echarts/chart/helper/Polyline}
 */
function EffectPolyline(lineData, idx, seriesScope) {
  EffectLine.call(this, lineData, idx, seriesScope);
  this._lastFrame = 0;
  this._lastFramePercent = 0;
}

var effectPolylineProto = EffectPolyline.prototype; // Overwrite

effectPolylineProto.createLine = function (lineData, idx, seriesScope) {
  return new Polyline(lineData, idx, seriesScope);
}; // Overwrite


effectPolylineProto.updateAnimationPoints = function (symbol, points) {
  this._points = points;
  var accLenArr = [0];
  var len = 0;

  for (var i = 1; i < points.length; i++) {
    var p1 = points[i - 1];
    var p2 = points[i];
    len += vec2.dist(p1, p2);
    accLenArr.push(len);
  }

  if (len === 0) {
    return;
  }

  for (var i = 0; i < accLenArr.length; i++) {
    accLenArr[i] /= len;
  }

  this._offsets = accLenArr;
  this._length = len;
}; // Overwrite


effectPolylineProto.getLineLength = function (symbol) {
  return this._length;
}; // Overwrite


effectPolylineProto.updateSymbolPosition = function (symbol) {
  var t = symbol.__t;
  var points = this._points;
  var offsets = this._offsets;
  var len = points.length;

  if (!offsets) {
    // Has length 0
    return;
  }

  var lastFrame = this._lastFrame;
  var frame;

  if (t < this._lastFramePercent) {
    // Start from the next frame
    // PENDING start from lastFrame ?
    var start = Math.min(lastFrame + 1, len - 1);

    for (frame = start; frame >= 0; frame--) {
      if (offsets[frame] <= t) {
        break;
      }
    } // PENDING really need to do this ?


    frame = Math.min(frame, len - 2);
  } else {
    for (var frame = lastFrame; frame < len; frame++) {
      if (offsets[frame] > t) {
        break;
      }
    }

    frame = Math.min(frame - 1, len - 2);
  }

  vec2.lerp(symbol.position, points[frame], points[frame + 1], (t - offsets[frame]) / (offsets[frame + 1] - offsets[frame]));
  var tx = points[frame + 1][0] - points[frame][0];
  var ty = points[frame + 1][1] - points[frame][1];
  symbol.rotation = -Math.atan2(ty, tx) - Math.PI / 2;
  this._lastFrame = frame;
  this._lastFramePercent = t;
  symbol.ignore = false;
};

zrUtil.inherits(EffectPolyline, EffectLine);
var _default = EffectPolyline;
module.exports = _default;

/***/ }),

/***/ "73ca":
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

var LineGroup = __webpack_require__("7e5b");

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
 * @module echarts/chart/helper/LineDraw
 */
// import IncrementalDisplayable from 'zrender/src/graphic/IncrementalDisplayable';

/**
 * @alias module:echarts/component/marker/LineDraw
 * @constructor
 */
function LineDraw(ctor) {
  this._ctor = ctor || LineGroup;
  this.group = new graphic.Group();
}

var lineDrawProto = LineDraw.prototype;

lineDrawProto.isPersistent = function () {
  return true;
};
/**
 * @param {module:echarts/data/List} lineData
 */


lineDrawProto.updateData = function (lineData) {
  var lineDraw = this;
  var group = lineDraw.group;
  var oldLineData = lineDraw._lineData;
  lineDraw._lineData = lineData; // There is no oldLineData only when first rendering or switching from
  // stream mode to normal mode, where previous elements should be removed.

  if (!oldLineData) {
    group.removeAll();
  }

  var seriesScope = makeSeriesScope(lineData);
  lineData.diff(oldLineData).add(function (idx) {
    doAdd(lineDraw, lineData, idx, seriesScope);
  }).update(function (newIdx, oldIdx) {
    doUpdate(lineDraw, oldLineData, lineData, oldIdx, newIdx, seriesScope);
  }).remove(function (idx) {
    group.remove(oldLineData.getItemGraphicEl(idx));
  }).execute();
};

function doAdd(lineDraw, lineData, idx, seriesScope) {
  var itemLayout = lineData.getItemLayout(idx);

  if (!lineNeedsDraw(itemLayout)) {
    return;
  }

  var el = new lineDraw._ctor(lineData, idx, seriesScope);
  lineData.setItemGraphicEl(idx, el);
  lineDraw.group.add(el);
}

function doUpdate(lineDraw, oldLineData, newLineData, oldIdx, newIdx, seriesScope) {
  var itemEl = oldLineData.getItemGraphicEl(oldIdx);

  if (!lineNeedsDraw(newLineData.getItemLayout(newIdx))) {
    lineDraw.group.remove(itemEl);
    return;
  }

  if (!itemEl) {
    itemEl = new lineDraw._ctor(newLineData, newIdx, seriesScope);
  } else {
    itemEl.updateData(newLineData, newIdx, seriesScope);
  }

  newLineData.setItemGraphicEl(newIdx, itemEl);
  lineDraw.group.add(itemEl);
}

lineDrawProto.updateLayout = function () {
  var lineData = this._lineData; // Do not support update layout in incremental mode.

  if (!lineData) {
    return;
  }

  lineData.eachItemGraphicEl(function (el, idx) {
    el.updateLayout(lineData, idx);
  }, this);
};

lineDrawProto.incrementalPrepareUpdate = function (lineData) {
  this._seriesScope = makeSeriesScope(lineData);
  this._lineData = null;
  this.group.removeAll();
};

lineDrawProto.incrementalUpdate = function (taskParams, lineData) {
  function updateIncrementalAndHover(el) {
    if (!el.isGroup) {
      el.incremental = el.useHoverLayer = true;
    }
  }

  for (var idx = taskParams.start; idx < taskParams.end; idx++) {
    var itemLayout = lineData.getItemLayout(idx);

    if (lineNeedsDraw(itemLayout)) {
      var el = new this._ctor(lineData, idx, this._seriesScope);
      el.traverse(updateIncrementalAndHover);
      this.group.add(el);
      lineData.setItemGraphicEl(idx, el);
    }
  }
};

function makeSeriesScope(lineData) {
  var hostModel = lineData.hostModel;
  return {
    lineStyle: hostModel.getModel('lineStyle').getLineStyle(),
    hoverLineStyle: hostModel.getModel('emphasis.lineStyle').getLineStyle(),
    labelModel: hostModel.getModel('label'),
    hoverLabelModel: hostModel.getModel('emphasis.label')
  };
}

lineDrawProto.remove = function () {
  this._clearIncremental();

  this._incremental = null;
  this.group.removeAll();
};

lineDrawProto._clearIncremental = function () {
  var incremental = this._incremental;

  if (incremental) {
    incremental.clearDisplaybles();
  }
};

function isPointNaN(pt) {
  return isNaN(pt[0]) || isNaN(pt[1]);
}

function lineNeedsDraw(pts) {
  return !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
}

var _default = LineDraw;
module.exports = _default;

/***/ }),

/***/ "7b0c":
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

var View = __webpack_require__("6cc5");

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

var bbox = __webpack_require__("e263");

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
// FIXME Where to create the simple view coordinate system
function getViewRect(seriesModel, api, aspect) {
  var option = seriesModel.getBoxLayoutParams();
  option.aspect = aspect;
  return getLayoutRect(option, {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function _default(ecModel, api) {
  var viewList = [];
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    var coordSysType = seriesModel.get('coordinateSystem');

    if (!coordSysType || coordSysType === 'view') {
      var data = seriesModel.getData();
      var positions = data.mapArray(function (idx) {
        var itemModel = data.getItemModel(idx);
        return [+itemModel.get('x'), +itemModel.get('y')];
      });
      var min = [];
      var max = [];
      bbox.fromPoints(positions, min, max); // If width or height is 0

      if (max[0] - min[0] === 0) {
        max[0] += 1;
        min[0] -= 1;
      }

      if (max[1] - min[1] === 0) {
        max[1] += 1;
        min[1] -= 1;
      }

      var aspect = (max[0] - min[0]) / (max[1] - min[1]); // FIXME If get view rect after data processed?

      var viewRect = getViewRect(seriesModel, api, aspect); // Position may be NaN, use view rect instead

      if (isNaN(aspect)) {
        min = [viewRect.x, viewRect.y];
        max = [viewRect.x + viewRect.width, viewRect.y + viewRect.height];
      }

      var bbWidth = max[0] - min[0];
      var bbHeight = max[1] - min[1];
      var viewWidth = viewRect.width;
      var viewHeight = viewRect.height;
      var viewCoordSys = seriesModel.coordinateSystem = new View();
      viewCoordSys.zoomLimit = seriesModel.get('scaleLimit');
      viewCoordSys.setBoundingRect(min[0], min[1], bbWidth, bbHeight);
      viewCoordSys.setViewRect(viewRect.x, viewRect.y, viewWidth, viewHeight); // Update roam info

      viewCoordSys.setCenter(seriesModel.get('center'));
      viewCoordSys.setZoom(seriesModel.get('zoom'));
      viewList.push(viewCoordSys);
    }
  });
  return viewList;
}

module.exports = _default;

/***/ }),

/***/ "7e5b":
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

var symbolUtil = __webpack_require__("a15a");

var LinePath = __webpack_require__("7f91");

var graphic = __webpack_require__("2306");

var _number = __webpack_require__("3842");

var round = _number.round;

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
 * @module echarts/chart/helper/Line
 */
var SYMBOL_CATEGORIES = ['fromSymbol', 'toSymbol'];

function makeSymbolTypeKey(symbolCategory) {
  return '_' + symbolCategory + 'Type';
}
/**
 * @inner
 */


function createSymbol(name, lineData, idx) {
  var color = lineData.getItemVisual(idx, 'color');
  var symbolType = lineData.getItemVisual(idx, name);
  var symbolSize = lineData.getItemVisual(idx, name + 'Size');

  if (!symbolType || symbolType === 'none') {
    return;
  }

  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [symbolSize, symbolSize];
  }

  var symbolPath = symbolUtil.createSymbol(symbolType, -symbolSize[0] / 2, -symbolSize[1] / 2, symbolSize[0], symbolSize[1], color);
  symbolPath.name = name;
  return symbolPath;
}

function createLine(points) {
  var line = new LinePath({
    name: 'line',
    subPixelOptimize: true
  });
  setLinePoints(line.shape, points);
  return line;
}

function setLinePoints(targetShape, points) {
  targetShape.x1 = points[0][0];
  targetShape.y1 = points[0][1];
  targetShape.x2 = points[1][0];
  targetShape.y2 = points[1][1];
  targetShape.percent = 1;
  var cp1 = points[2];

  if (cp1) {
    targetShape.cpx1 = cp1[0];
    targetShape.cpy1 = cp1[1];
  } else {
    targetShape.cpx1 = NaN;
    targetShape.cpy1 = NaN;
  }
}

function updateSymbolAndLabelBeforeLineUpdate() {
  var lineGroup = this;
  var symbolFrom = lineGroup.childOfName('fromSymbol');
  var symbolTo = lineGroup.childOfName('toSymbol');
  var label = lineGroup.childOfName('label'); // Quick reject

  if (!symbolFrom && !symbolTo && label.ignore) {
    return;
  }

  var invScale = 1;
  var parentNode = this.parent;

  while (parentNode) {
    if (parentNode.scale) {
      invScale /= parentNode.scale[0];
    }

    parentNode = parentNode.parent;
  }

  var line = lineGroup.childOfName('line'); // If line not changed
  // FIXME Parent scale changed

  if (!this.__dirty && !line.__dirty) {
    return;
  }

  var percent = line.shape.percent;
  var fromPos = line.pointAt(0);
  var toPos = line.pointAt(percent);
  var d = vector.sub([], toPos, fromPos);
  vector.normalize(d, d);

  if (symbolFrom) {
    symbolFrom.attr('position', fromPos);
    var tangent = line.tangentAt(0);
    symbolFrom.attr('rotation', Math.PI / 2 - Math.atan2(tangent[1], tangent[0]));
    symbolFrom.attr('scale', [invScale * percent, invScale * percent]);
  }

  if (symbolTo) {
    symbolTo.attr('position', toPos);
    var tangent = line.tangentAt(1);
    symbolTo.attr('rotation', -Math.PI / 2 - Math.atan2(tangent[1], tangent[0]));
    symbolTo.attr('scale', [invScale * percent, invScale * percent]);
  }

  if (!label.ignore) {
    label.attr('position', toPos);
    var textPosition;
    var textAlign;
    var textVerticalAlign;
    var distance = 5 * invScale; // End

    if (label.__position === 'end') {
      textPosition = [d[0] * distance + toPos[0], d[1] * distance + toPos[1]];
      textAlign = d[0] > 0.8 ? 'left' : d[0] < -0.8 ? 'right' : 'center';
      textVerticalAlign = d[1] > 0.8 ? 'top' : d[1] < -0.8 ? 'bottom' : 'middle';
    } // Middle
    else if (label.__position === 'middle') {
        var halfPercent = percent / 2;
        var tangent = line.tangentAt(halfPercent);
        var n = [tangent[1], -tangent[0]];
        var cp = line.pointAt(halfPercent);

        if (n[1] > 0) {
          n[0] = -n[0];
          n[1] = -n[1];
        }

        textPosition = [cp[0] + n[0] * distance, cp[1] + n[1] * distance];
        textAlign = 'center';
        textVerticalAlign = 'bottom';
        var rotation = -Math.atan2(tangent[1], tangent[0]);

        if (toPos[0] < fromPos[0]) {
          rotation = Math.PI + rotation;
        }

        label.attr('rotation', rotation);
      } // Start
      else {
          textPosition = [-d[0] * distance + fromPos[0], -d[1] * distance + fromPos[1]];
          textAlign = d[0] > 0.8 ? 'right' : d[0] < -0.8 ? 'left' : 'center';
          textVerticalAlign = d[1] > 0.8 ? 'bottom' : d[1] < -0.8 ? 'top' : 'middle';
        }

    label.attr({
      style: {
        // Use the user specified text align and baseline first
        textVerticalAlign: label.__verticalAlign || textVerticalAlign,
        textAlign: label.__textAlign || textAlign
      },
      position: textPosition,
      scale: [invScale, invScale]
    });
  }
}
/**
 * @constructor
 * @extends {module:zrender/graphic/Group}
 * @alias {module:echarts/chart/helper/Line}
 */


function Line(lineData, idx, seriesScope) {
  graphic.Group.call(this);

  this._createLine(lineData, idx, seriesScope);
}

var lineProto = Line.prototype; // Update symbol position and rotation

lineProto.beforeUpdate = updateSymbolAndLabelBeforeLineUpdate;

lineProto._createLine = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var linePoints = lineData.getItemLayout(idx);
  var line = createLine(linePoints);
  line.shape.percent = 0;
  graphic.initProps(line, {
    shape: {
      percent: 1
    }
  }, seriesModel, idx);
  this.add(line);
  var label = new graphic.Text({
    name: 'label',
    // FIXME
    // Temporary solution for `focusNodeAdjacency`.
    // line label do not use the opacity of lineStyle.
    lineLabelOriginalOpacity: 1
  });
  this.add(label);
  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbol = createSymbol(symbolCategory, lineData, idx); // symbols must added after line to make sure
    // it will be updated after line#update.
    // Or symbol position and rotation update in line#beforeUpdate will be one frame slow

    this.add(symbol);
    this[makeSymbolTypeKey(symbolCategory)] = lineData.getItemVisual(idx, symbolCategory);
  }, this);

  this._updateCommonStl(lineData, idx, seriesScope);
};

lineProto.updateData = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var line = this.childOfName('line');
  var linePoints = lineData.getItemLayout(idx);
  var target = {
    shape: {}
  };
  setLinePoints(target.shape, linePoints);
  graphic.updateProps(line, target, seriesModel, idx);
  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbolType = lineData.getItemVisual(idx, symbolCategory);
    var key = makeSymbolTypeKey(symbolCategory); // Symbol changed

    if (this[key] !== symbolType) {
      this.remove(this.childOfName(symbolCategory));
      var symbol = createSymbol(symbolCategory, lineData, idx);
      this.add(symbol);
    }

    this[key] = symbolType;
  }, this);

  this._updateCommonStl(lineData, idx, seriesScope);
};

lineProto._updateCommonStl = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var line = this.childOfName('line');
  var lineStyle = seriesScope && seriesScope.lineStyle;
  var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;
  var labelModel = seriesScope && seriesScope.labelModel;
  var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel; // Optimization for large dataset

  if (!seriesScope || lineData.hasItemOption) {
    var itemModel = lineData.getItemModel(idx);
    lineStyle = itemModel.getModel('lineStyle').getLineStyle();
    hoverLineStyle = itemModel.getModel('emphasis.lineStyle').getLineStyle();
    labelModel = itemModel.getModel('label');
    hoverLabelModel = itemModel.getModel('emphasis.label');
  }

  var visualColor = lineData.getItemVisual(idx, 'color');
  var visualOpacity = zrUtil.retrieve3(lineData.getItemVisual(idx, 'opacity'), lineStyle.opacity, 1);
  line.useStyle(zrUtil.defaults({
    strokeNoScale: true,
    fill: 'none',
    stroke: visualColor,
    opacity: visualOpacity
  }, lineStyle));
  line.hoverStyle = hoverLineStyle; // Update symbol

  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbol = this.childOfName(symbolCategory);

    if (symbol) {
      symbol.setColor(visualColor);
      symbol.setStyle({
        opacity: visualOpacity
      });
    }
  }, this);
  var showLabel = labelModel.getShallow('show');
  var hoverShowLabel = hoverLabelModel.getShallow('show');
  var label = this.childOfName('label');
  var defaultLabelColor;
  var baseText; // FIXME: the logic below probably should be merged to `graphic.setLabelStyle`.

  if (showLabel || hoverShowLabel) {
    defaultLabelColor = visualColor || '#000';
    baseText = seriesModel.getFormattedLabel(idx, 'normal', lineData.dataType);

    if (baseText == null) {
      var rawVal = seriesModel.getRawValue(idx);
      baseText = rawVal == null ? lineData.getName(idx) : isFinite(rawVal) ? round(rawVal) : rawVal;
    }
  }

  var normalText = showLabel ? baseText : null;
  var emphasisText = hoverShowLabel ? zrUtil.retrieve2(seriesModel.getFormattedLabel(idx, 'emphasis', lineData.dataType), baseText) : null;
  var labelStyle = label.style; // Always set `textStyle` even if `normalStyle.text` is null, because default
  // values have to be set on `normalStyle`.

  if (normalText != null || emphasisText != null) {
    graphic.setTextStyle(label.style, labelModel, {
      text: normalText
    }, {
      autoColor: defaultLabelColor
    });
    label.__textAlign = labelStyle.textAlign;
    label.__verticalAlign = labelStyle.textVerticalAlign; // 'start', 'middle', 'end'

    label.__position = labelModel.get('position') || 'middle';
  }

  if (emphasisText != null) {
    // Only these properties supported in this emphasis style here.
    label.hoverStyle = {
      text: emphasisText,
      textFill: hoverLabelModel.getTextColor(true),
      // For merging hover style to normal style, do not use
      // `hoverLabelModel.getFont()` here.
      fontStyle: hoverLabelModel.getShallow('fontStyle'),
      fontWeight: hoverLabelModel.getShallow('fontWeight'),
      fontSize: hoverLabelModel.getShallow('fontSize'),
      fontFamily: hoverLabelModel.getShallow('fontFamily')
    };
  } else {
    label.hoverStyle = {
      text: null
    };
  }

  label.ignore = !showLabel && !hoverShowLabel;
  graphic.setHoverStyle(this);
};

lineProto.highlight = function () {
  this.trigger('emphasis');
};

lineProto.downplay = function () {
  this.trigger('normal');
};

lineProto.updateLayout = function (lineData, idx) {
  this.setLinePoints(lineData.getItemLayout(idx));
};

lineProto.setLinePoints = function (points) {
  var linePath = this.childOfName('line');
  setLinePoints(linePath.shape, points);
  linePath.dirty();
};

zrUtil.inherits(Line, graphic.Group);
var _default = Line;
module.exports = _default;

/***/ }),

/***/ "7f91":
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

var vec2 = __webpack_require__("401b");

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
 * Line path for bezier and straight line draw
 */
var straightLineProto = graphic.Line.prototype;
var bezierCurveProto = graphic.BezierCurve.prototype;

function isLine(shape) {
  return isNaN(+shape.cpx1) || isNaN(+shape.cpy1);
}

var _default = graphic.extendShape({
  type: 'ec-line',
  style: {
    stroke: '#000',
    fill: null
  },
  shape: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    percent: 1,
    cpx1: null,
    cpy1: null
  },
  buildPath: function (ctx, shape) {
    this[isLine(shape) ? '_buildPathLine' : '_buildPathCurve'](ctx, shape);
  },
  _buildPathLine: straightLineProto.buildPath,
  _buildPathCurve: bezierCurveProto.buildPath,
  pointAt: function (t) {
    return this[isLine(this.shape) ? '_pointAtLine' : '_pointAtCurve'](t);
  },
  _pointAtLine: straightLineProto.pointAt,
  _pointAtCurve: bezierCurveProto.pointAt,
  tangentAt: function (t) {
    var shape = this.shape;
    var p = isLine(shape) ? [shape.x2 - shape.x1, shape.y2 - shape.y1] : this._tangentAtCurve(t);
    return vec2.normalize(p, p);
  },
  _tangentAtCurve: bezierCurveProto.tangentAt
});

module.exports = _default;

/***/ }),

/***/ "879e":
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

var List = __webpack_require__("6179");

var zrUtil = __webpack_require__("6d8b");

var _model = __webpack_require__("e0d3");

var defaultEmphasis = _model.defaultEmphasis;

var Model = __webpack_require__("4319");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

var createGraphFromNodeEdge = __webpack_require__("237f");

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
var GraphSeries = echarts.extendSeriesModel({
  type: 'series.graph',
  init: function (option) {
    GraphSeries.superApply(this, 'init', arguments);
    var self = this;

    function getCategoriesData() {
      return self._categoriesData;
    } // Provide data for legend select


    this.legendVisualProvider = new LegendVisualProvider(getCategoriesData, getCategoriesData);
    this.fillDataTextStyle(option.edges || option.links);

    this._updateCategoriesData();
  },
  mergeOption: function (option) {
    GraphSeries.superApply(this, 'mergeOption', arguments);
    this.fillDataTextStyle(option.edges || option.links);

    this._updateCategoriesData();
  },
  mergeDefaultAndTheme: function (option) {
    GraphSeries.superApply(this, 'mergeDefaultAndTheme', arguments);
    defaultEmphasis(option, ['edgeLabel'], ['show']);
  },
  getInitialData: function (option, ecModel) {
    var edges = option.edges || option.links || [];
    var nodes = option.data || option.nodes || [];
    var self = this;

    if (nodes && edges) {
      return createGraphFromNodeEdge(nodes, edges, this, true, beforeLink).data;
    }

    function beforeLink(nodeData, edgeData) {
      // Overwrite nodeData.getItemModel to
      nodeData.wrapMethod('getItemModel', function (model) {
        var categoriesModels = self._categoriesModels;
        var categoryIdx = model.getShallow('category');
        var categoryModel = categoriesModels[categoryIdx];

        if (categoryModel) {
          categoryModel.parentModel = model.parentModel;
          model.parentModel = categoryModel;
        }

        return model;
      });
      var edgeLabelModel = self.getModel('edgeLabel'); // For option `edgeLabel` can be found by label.xxx.xxx on item mode.

      var fakeSeriesModel = new Model({
        label: edgeLabelModel.option
      }, edgeLabelModel.parentModel, ecModel);
      var emphasisEdgeLabelModel = self.getModel('emphasis.edgeLabel');
      var emphasisFakeSeriesModel = new Model({
        emphasis: {
          label: emphasisEdgeLabelModel.option
        }
      }, emphasisEdgeLabelModel.parentModel, ecModel);
      edgeData.wrapMethod('getItemModel', function (model) {
        model.customizeGetParent(edgeGetParent);
        return model;
      });

      function edgeGetParent(path) {
        path = this.parsePath(path);
        return path && path[0] === 'label' ? fakeSeriesModel : path && path[0] === 'emphasis' && path[1] === 'label' ? emphasisFakeSeriesModel : this.parentModel;
      }
    }
  },

  /**
   * @return {module:echarts/data/Graph}
   */
  getGraph: function () {
    return this.getData().graph;
  },

  /**
   * @return {module:echarts/data/List}
   */
  getEdgeData: function () {
    return this.getGraph().edgeData;
  },

  /**
   * @return {module:echarts/data/List}
   */
  getCategoriesData: function () {
    return this._categoriesData;
  },

  /**
   * @override
   */
  formatTooltip: function (dataIndex, multipleSeries, dataType) {
    if (dataType === 'edge') {
      var nodeData = this.getData();
      var params = this.getDataParams(dataIndex, dataType);
      var edge = nodeData.graph.getEdgeByIndex(dataIndex);
      var sourceName = nodeData.getName(edge.node1.dataIndex);
      var targetName = nodeData.getName(edge.node2.dataIndex);
      var html = [];
      sourceName != null && html.push(sourceName);
      targetName != null && html.push(targetName);
      html = encodeHTML(html.join(' > '));

      if (params.value) {
        html += ' : ' + encodeHTML(params.value);
      }

      return html;
    } else {
      // dataType === 'node' or empty
      return GraphSeries.superApply(this, 'formatTooltip', arguments);
    }
  },
  _updateCategoriesData: function () {
    var categories = zrUtil.map(this.option.categories || [], function (category) {
      // Data must has value
      return category.value != null ? category : zrUtil.extend({
        value: 0
      }, category);
    });
    var categoriesData = new List(['value'], this);
    categoriesData.initData(categories);
    this._categoriesData = categoriesData;
    this._categoriesModels = categoriesData.mapArray(function (idx) {
      return categoriesData.getItemModel(idx, true);
    });
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  },
  isAnimationEnabled: function () {
    return GraphSeries.superCall(this, 'isAnimationEnabled') // Not enable animation when do force layout
    && !(this.get('layout') === 'force' && this.get('force.layoutAnimation'));
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'view',
    // Default option for all coordinate systems
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // polarIndex: 0,
    // geoIndex: 0,
    legendHoverLink: true,
    hoverAnimation: true,
    layout: null,
    focusNodeAdjacency: false,
    // Configuration of circular layout
    circular: {
      rotateLabel: false
    },
    // Configuration of force directed layout
    force: {
      initLayout: null,
      // Node repulsion. Can be an array to represent range.
      repulsion: [0, 50],
      gravity: 0.1,
      // Initial friction
      friction: 0.6,
      // Edge length. Can be an array to represent range.
      edgeLength: 30,
      layoutAnimation: true
    },
    left: 'center',
    top: 'center',
    // right: null,
    // bottom: null,
    // width: '80%',
    // height: '80%',
    symbol: 'circle',
    symbolSize: 10,
    edgeSymbol: ['none', 'none'],
    edgeSymbolSize: 10,
    edgeLabel: {
      position: 'middle'
    },
    draggable: false,
    roam: false,
    // Default on center of graph
    center: null,
    zoom: 1,
    // Symbol size scale ratio in roam
    nodeScaleRatio: 0.6,
    // cursor: null,
    // categories: [],
    // data: []
    // Or
    // nodes: []
    //
    // links: []
    // Or
    // edges: []
    label: {
      show: false,
      formatter: '{b}'
    },
    itemStyle: {},
    lineStyle: {
      color: '#aaa',
      width: 1,
      curveness: 0,
      opacity: 0.5
    },
    emphasis: {
      label: {
        show: true
      }
    }
  }
});
var _default = GraphSeries;
module.exports = _default;

/***/ }),

/***/ "94e4":
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

var vec2 = __webpack_require__("401b");

var _graphHelper = __webpack_require__("53f3");

var getSymbolSize = _graphHelper.getSymbolSize;
var getNodeGlobalScale = _graphHelper.getNodeGlobalScale;

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
var PI = Math.PI;
var _symbolRadiansHalf = [];
/**
 * `basedOn` can be:
 * 'value':
 *     This layout is not accurate and have same bad case. For example,
 *     if the min value is very smaller than the max value, the nodes
 *     with the min value probably overlap even though there is enough
 *     space to layout them. So we only use this approach in the as the
 *     init layout of the force layout.
 *     FIXME
 *     Probably we do not need this method any more but use
 *     `basedOn: 'symbolSize'` in force layout if
 *     delay its init operations to GraphView.
 * 'symbolSize':
 *     This approach work only if all of the symbol size calculated.
 *     That is, the progressive rendering is not applied to graph.
 *     FIXME
 *     If progressive rendering is applied to graph some day,
 *     probably we have to use `basedOn: 'value'`.
 *
 * @param {module:echarts/src/model/Series} seriesModel
 * @param {string} basedOn 'value' or 'symbolSize'
 */

function circularLayout(seriesModel, basedOn) {
  var coordSys = seriesModel.coordinateSystem;

  if (coordSys && coordSys.type !== 'view') {
    return;
  }

  var rect = coordSys.getBoundingRect();
  var nodeData = seriesModel.getData();
  var graph = nodeData.graph;
  var cx = rect.width / 2 + rect.x;
  var cy = rect.height / 2 + rect.y;
  var r = Math.min(rect.width, rect.height) / 2;
  var count = nodeData.count();
  nodeData.setLayout({
    cx: cx,
    cy: cy
  });

  if (!count) {
    return;
  }

  _layoutNodesBasedOn[basedOn](seriesModel, coordSys, graph, nodeData, r, cx, cy, count);

  graph.eachEdge(function (edge) {
    var curveness = edge.getModel().get('lineStyle.curveness') || 0;
    var p1 = vec2.clone(edge.node1.getLayout());
    var p2 = vec2.clone(edge.node2.getLayout());
    var cp1;
    var x12 = (p1[0] + p2[0]) / 2;
    var y12 = (p1[1] + p2[1]) / 2;

    if (+curveness) {
      curveness *= 3;
      cp1 = [cx * curveness + x12 * (1 - curveness), cy * curveness + y12 * (1 - curveness)];
    }

    edge.setLayout([p1, p2, cp1]);
  });
}

var _layoutNodesBasedOn = {
  value: function (seriesModel, coordSys, graph, nodeData, r, cx, cy, count) {
    var angle = 0;
    var sum = nodeData.getSum('value');
    var unitAngle = Math.PI * 2 / (sum || count);
    graph.eachNode(function (node) {
      var value = node.getValue('value');
      var radianHalf = unitAngle * (sum ? value : 1) / 2;
      angle += radianHalf;
      node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
      angle += radianHalf;
    });
  },
  symbolSize: function (seriesModel, coordSys, graph, nodeData, r, cx, cy, count) {
    var sumRadian = 0;
    _symbolRadiansHalf.length = count;
    var nodeScale = getNodeGlobalScale(seriesModel);
    graph.eachNode(function (node) {
      var symbolSize = getSymbolSize(node); // Normally this case will not happen, but we still add
      // some the defensive code (2px is an arbitrary value).

      isNaN(symbolSize) && (symbolSize = 2);
      symbolSize < 0 && (symbolSize = 0);
      symbolSize *= nodeScale;
      var symbolRadianHalf = Math.asin(symbolSize / 2 / r); // when `symbolSize / 2` is bigger than `r`.

      isNaN(symbolRadianHalf) && (symbolRadianHalf = PI / 2);
      _symbolRadiansHalf[node.dataIndex] = symbolRadianHalf;
      sumRadian += symbolRadianHalf * 2;
    });
    var halfRemainRadian = (2 * PI - sumRadian) / count / 2;
    var angle = 0;
    graph.eachNode(function (node) {
      var radianHalf = halfRemainRadian + _symbolRadiansHalf[node.dataIndex];
      angle += radianHalf;
      node.setLayout([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
      angle += radianHalf;
    });
  }
};
exports.circularLayout = circularLayout;

/***/ }),

/***/ "9704":
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

var SymbolDraw = __webpack_require__("f706");

var LineDraw = __webpack_require__("73ca");

var RoamController = __webpack_require__("4a01");

var roamHelper = __webpack_require__("01ef");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphic = __webpack_require__("2306");

var adjustEdge = __webpack_require__("480f");

var _graphHelper = __webpack_require__("53f3");

var getNodeGlobalScale = _graphHelper.getNodeGlobalScale;

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
var FOCUS_ADJACENCY = '__focusNodeAdjacency';
var UNFOCUS_ADJACENCY = '__unfocusNodeAdjacency';
var nodeOpacityPath = ['itemStyle', 'opacity'];
var lineOpacityPath = ['lineStyle', 'opacity'];

function getItemOpacity(item, opacityPath) {
  var opacity = item.getVisual('opacity');
  return opacity != null ? opacity : item.getModel().get(opacityPath);
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
    if (!child.isGroup) {
      var opct = child.lineLabelOriginalOpacity;

      if (opct == null || opacityRatio != null) {
        opct = opacity;
      }

      child.setStyle('opacity', opct);
    }
  });
}

function fadeInItem(item, opacityPath) {
  var opacity = getItemOpacity(item, opacityPath);
  var el = item.getGraphicEl(); // Should go back to normal opacity first, consider hoverLayer,
  // where current state is copied to elMirror, and support
  // emphasis opacity here.

  el.traverse(function (child) {
    !child.isGroup && child.setStyle('opacity', opacity);
  });
  el.highlight && el.highlight();
}

var _default = echarts.extendChartView({
  type: 'graph',
  init: function (ecModel, api) {
    var symbolDraw = new SymbolDraw();
    var lineDraw = new LineDraw();
    var group = this.group;
    this._controller = new RoamController(api.getZr());
    this._controllerHost = {
      target: group
    };
    group.add(symbolDraw.group);
    group.add(lineDraw.group);
    this._symbolDraw = symbolDraw;
    this._lineDraw = lineDraw;
    this._firstRender = true;
  },
  render: function (seriesModel, ecModel, api) {
    var graphView = this;
    var coordSys = seriesModel.coordinateSystem;
    this._model = seriesModel;
    var symbolDraw = this._symbolDraw;
    var lineDraw = this._lineDraw;
    var group = this.group;

    if (coordSys.type === 'view') {
      var groupNewProp = {
        position: coordSys.position,
        scale: coordSys.scale
      };

      if (this._firstRender) {
        group.attr(groupNewProp);
      } else {
        graphic.updateProps(group, groupNewProp, seriesModel);
      }
    } // Fix edge contact point with node


    adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));
    var data = seriesModel.getData();
    symbolDraw.updateData(data);
    var edgeData = seriesModel.getEdgeData();
    lineDraw.updateData(edgeData);

    this._updateNodeAndLinkScale();

    this._updateController(seriesModel, ecModel, api);

    clearTimeout(this._layoutTimeout);
    var forceLayout = seriesModel.forceLayout;
    var layoutAnimation = seriesModel.get('force.layoutAnimation');

    if (forceLayout) {
      this._startForceLayoutIteration(forceLayout, layoutAnimation);
    }

    data.eachItemGraphicEl(function (el, idx) {
      var itemModel = data.getItemModel(idx); // Update draggable

      el.off('drag').off('dragend');
      var draggable = itemModel.get('draggable');

      if (draggable) {
        el.on('drag', function () {
          if (forceLayout) {
            forceLayout.warmUp();
            !this._layouting && this._startForceLayoutIteration(forceLayout, layoutAnimation);
            forceLayout.setFixed(idx); // Write position back to layout

            data.setItemLayout(idx, el.position);
          }
        }, this).on('dragend', function () {
          if (forceLayout) {
            forceLayout.setUnfixed(idx);
          }
        }, this);
      }

      el.setDraggable(draggable && forceLayout);
      el[FOCUS_ADJACENCY] && el.off('mouseover', el[FOCUS_ADJACENCY]);
      el[UNFOCUS_ADJACENCY] && el.off('mouseout', el[UNFOCUS_ADJACENCY]);

      if (itemModel.get('focusNodeAdjacency')) {
        el.on('mouseover', el[FOCUS_ADJACENCY] = function () {
          graphView._clearTimer();

          api.dispatchAction({
            type: 'focusNodeAdjacency',
            seriesId: seriesModel.id,
            dataIndex: el.dataIndex
          });
        });
        el.on('mouseout', el[UNFOCUS_ADJACENCY] = function () {
          graphView._dispatchUnfocus(api);
        });
      }
    }, this);
    data.graph.eachEdge(function (edge) {
      var el = edge.getGraphicEl();
      el[FOCUS_ADJACENCY] && el.off('mouseover', el[FOCUS_ADJACENCY]);
      el[UNFOCUS_ADJACENCY] && el.off('mouseout', el[UNFOCUS_ADJACENCY]);

      if (edge.getModel().get('focusNodeAdjacency')) {
        el.on('mouseover', el[FOCUS_ADJACENCY] = function () {
          graphView._clearTimer();

          api.dispatchAction({
            type: 'focusNodeAdjacency',
            seriesId: seriesModel.id,
            edgeDataIndex: edge.dataIndex
          });
        });
        el.on('mouseout', el[UNFOCUS_ADJACENCY] = function () {
          graphView._dispatchUnfocus(api);
        });
      }
    });
    var circularRotateLabel = seriesModel.get('layout') === 'circular' && seriesModel.get('circular.rotateLabel');
    var cx = data.getLayout('cx');
    var cy = data.getLayout('cy');
    data.eachItemGraphicEl(function (el, idx) {
      var itemModel = data.getItemModel(idx);
      var labelRotate = itemModel.get('label.rotate') || 0;
      var symbolPath = el.getSymbolPath();

      if (circularRotateLabel) {
        var pos = data.getItemLayout(idx);
        var rad = Math.atan2(pos[1] - cy, pos[0] - cx);

        if (rad < 0) {
          rad = Math.PI * 2 + rad;
        }

        var isLeft = pos[0] < cx;

        if (isLeft) {
          rad = rad - Math.PI;
        }

        var textPosition = isLeft ? 'left' : 'right';
        graphic.modifyLabelStyle(symbolPath, {
          textRotation: -rad,
          textPosition: textPosition,
          textOrigin: 'center'
        }, {
          textPosition: textPosition
        });
      } else {
        graphic.modifyLabelStyle(symbolPath, {
          textRotation: labelRotate *= Math.PI / 180
        });
      }
    });
    this._firstRender = false;
  },
  dispose: function () {
    this._controller && this._controller.dispose();
    this._controllerHost = {};

    this._clearTimer();
  },
  _dispatchUnfocus: function (api, opt) {
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
    var edgeDataIndex = payload.edgeDataIndex;
    var node = graph.getNodeByIndex(dataIndex);
    var edge = graph.getEdgeByIndex(edgeDataIndex);

    if (!node && !edge) {
      return;
    }

    graph.eachNode(function (node) {
      fadeOutItem(node, nodeOpacityPath, 0.1);
    });
    graph.eachEdge(function (edge) {
      fadeOutItem(edge, lineOpacityPath, 0.1);
    });

    if (node) {
      fadeInItem(node, nodeOpacityPath);
      zrUtil.each(node.edges, function (adjacentEdge) {
        if (adjacentEdge.dataIndex < 0) {
          return;
        }

        fadeInItem(adjacentEdge, lineOpacityPath);
        fadeInItem(adjacentEdge.node1, nodeOpacityPath);
        fadeInItem(adjacentEdge.node2, nodeOpacityPath);
      });
    }

    if (edge) {
      fadeInItem(edge, lineOpacityPath);
      fadeInItem(edge.node1, nodeOpacityPath);
      fadeInItem(edge.node2, nodeOpacityPath);
    }
  },
  unfocusNodeAdjacency: function (seriesModel, ecModel, api, payload) {
    var graph = this._model.getData().graph;

    graph.eachNode(function (node) {
      fadeOutItem(node, nodeOpacityPath);
    });
    graph.eachEdge(function (edge) {
      fadeOutItem(edge, lineOpacityPath);
    });
  },
  _startForceLayoutIteration: function (forceLayout, layoutAnimation) {
    var self = this;

    (function step() {
      forceLayout.step(function (stopped) {
        self.updateLayout(self._model);
        (self._layouting = !stopped) && (layoutAnimation ? self._layoutTimeout = setTimeout(step, 16) : step());
      });
    })();
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

    if (seriesModel.coordinateSystem.type !== 'view') {
      controller.disable();
      return;
    }

    controller.enable(seriesModel.get('roam'));
    controllerHost.zoomLimit = seriesModel.get('scaleLimit');
    controllerHost.zoom = seriesModel.coordinateSystem.getZoom();
    controller.off('pan').off('zoom').on('pan', function (e) {
      roamHelper.updateViewOnPan(controllerHost, e.dx, e.dy);
      api.dispatchAction({
        seriesId: seriesModel.id,
        type: 'graphRoam',
        dx: e.dx,
        dy: e.dy
      });
    }).on('zoom', function (e) {
      roamHelper.updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
      api.dispatchAction({
        seriesId: seriesModel.id,
        type: 'graphRoam',
        zoom: e.scale,
        originX: e.originX,
        originY: e.originY
      });

      this._updateNodeAndLinkScale();

      adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));

      this._lineDraw.updateLayout();
    }, this);
  },
  _updateNodeAndLinkScale: function () {
    var seriesModel = this._model;
    var data = seriesModel.getData();
    var nodeScale = getNodeGlobalScale(seriesModel);
    var invScale = [nodeScale, nodeScale];
    data.eachItemGraphicEl(function (el, idx) {
      el.attr('scale', invScale);
    });
  },
  updateLayout: function (seriesModel) {
    adjustEdge(seriesModel.getGraph(), getNodeGlobalScale(seriesModel));

    this._symbolDraw.updateLayout();

    this._lineDraw.updateLayout();
  },
  remove: function (ecModel, api) {
    this._symbolDraw && this._symbolDraw.remove();
    this._lineDraw && this._lineDraw.remove();
  }
});

module.exports = _default;

/***/ }),

/***/ "a38d":
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

var IncrementalDisplayable = __webpack_require__("392f");

var lineContain = __webpack_require__("9680");

var quadraticContain = __webpack_require__("68ab");

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
// TODO Batch by color
var LargeLineShape = graphic.extendShape({
  shape: {
    polyline: false,
    curveness: 0,
    segs: []
  },
  buildPath: function (path, shape) {
    var segs = shape.segs;
    var curveness = shape.curveness;

    if (shape.polyline) {
      for (var i = 0; i < segs.length;) {
        var count = segs[i++];

        if (count > 0) {
          path.moveTo(segs[i++], segs[i++]);

          for (var k = 1; k < count; k++) {
            path.lineTo(segs[i++], segs[i++]);
          }
        }
      }
    } else {
      for (var i = 0; i < segs.length;) {
        var x0 = segs[i++];
        var y0 = segs[i++];
        var x1 = segs[i++];
        var y1 = segs[i++];
        path.moveTo(x0, y0);

        if (curveness > 0) {
          var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
          var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;
          path.quadraticCurveTo(x2, y2, x1, y1);
        } else {
          path.lineTo(x1, y1);
        }
      }
    }
  },
  findDataIndex: function (x, y) {
    var shape = this.shape;
    var segs = shape.segs;
    var curveness = shape.curveness;

    if (shape.polyline) {
      var dataIndex = 0;

      for (var i = 0; i < segs.length;) {
        var count = segs[i++];

        if (count > 0) {
          var x0 = segs[i++];
          var y0 = segs[i++];

          for (var k = 1; k < count; k++) {
            var x1 = segs[i++];
            var y1 = segs[i++];

            if (lineContain.containStroke(x0, y0, x1, y1)) {
              return dataIndex;
            }
          }
        }

        dataIndex++;
      }
    } else {
      var dataIndex = 0;

      for (var i = 0; i < segs.length;) {
        var x0 = segs[i++];
        var y0 = segs[i++];
        var x1 = segs[i++];
        var y1 = segs[i++];

        if (curveness > 0) {
          var x2 = (x0 + x1) / 2 - (y0 - y1) * curveness;
          var y2 = (y0 + y1) / 2 - (x1 - x0) * curveness;

          if (quadraticContain.containStroke(x0, y0, x2, y2, x1, y1)) {
            return dataIndex;
          }
        } else {
          if (lineContain.containStroke(x0, y0, x1, y1)) {
            return dataIndex;
          }
        }

        dataIndex++;
      }
    }

    return -1;
  }
});

function LargeLineDraw() {
  this.group = new graphic.Group();
}

var largeLineProto = LargeLineDraw.prototype;

largeLineProto.isPersistent = function () {
  return !this._incremental;
};
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 */


largeLineProto.updateData = function (data) {
  this.group.removeAll();
  var lineEl = new LargeLineShape({
    rectHover: true,
    cursor: 'default'
  });
  lineEl.setShape({
    segs: data.getLayout('linesPoints')
  });

  this._setCommon(lineEl, data); // Add back


  this.group.add(lineEl);
  this._incremental = null;
};
/**
 * @override
 */


largeLineProto.incrementalPrepareUpdate = function (data) {
  this.group.removeAll();

  this._clearIncremental();

  if (data.count() > 5e5) {
    if (!this._incremental) {
      this._incremental = new IncrementalDisplayable({
        silent: true
      });
    }

    this.group.add(this._incremental);
  } else {
    this._incremental = null;
  }
};
/**
 * @override
 */


largeLineProto.incrementalUpdate = function (taskParams, data) {
  var lineEl = new LargeLineShape();
  lineEl.setShape({
    segs: data.getLayout('linesPoints')
  });

  this._setCommon(lineEl, data, !!this._incremental);

  if (!this._incremental) {
    lineEl.rectHover = true;
    lineEl.cursor = 'default';
    lineEl.__startIndex = taskParams.start;
    this.group.add(lineEl);
  } else {
    this._incremental.addDisplayable(lineEl, true);
  }
};
/**
 * @override
 */


largeLineProto.remove = function () {
  this._clearIncremental();

  this._incremental = null;
  this.group.removeAll();
};

largeLineProto._setCommon = function (lineEl, data, isIncremental) {
  var hostModel = data.hostModel;
  lineEl.setShape({
    polyline: hostModel.get('polyline'),
    curveness: hostModel.get('lineStyle.curveness')
  });
  lineEl.useStyle(hostModel.getModel('lineStyle').getLineStyle());
  lineEl.style.strokeNoScale = true;
  var visualColor = data.getVisual('color');

  if (visualColor) {
    lineEl.setStyle('stroke', visualColor);
  }

  lineEl.setStyle('fill');

  if (!isIncremental) {
    // Enable tooltip
    // PENDING May have performance issue when path is extremely large
    lineEl.seriesIndex = hostModel.seriesIndex;
    lineEl.on('mousemove', function (e) {
      lineEl.dataIndex = null;
      var dataIndex = lineEl.findDataIndex(e.offsetX, e.offsetY);

      if (dataIndex > 0) {
        // Provide dataIndex for tooltip
        lineEl.dataIndex = dataIndex + lineEl.__startIndex;
      }
    });
  }
};

largeLineProto._clearIncremental = function () {
  var incremental = this._incremental;

  if (incremental) {
    incremental.clearDisplaybles();
  }
};

var _default = LargeLineDraw;
module.exports = _default;

/***/ }),

/***/ "adda":
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

var _circularLayoutHelper = __webpack_require__("94e4");

var circularLayout = _circularLayoutHelper.circularLayout;

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
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    if (seriesModel.get('layout') === 'circular') {
      circularLayout(seriesModel, 'symbolSize');
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "b0af":
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

var _number = __webpack_require__("3842");

var round = _number.round;

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
function createGridClipPath(cartesian, hasAnimation, seriesModel) {
  var rect = cartesian.getArea();
  var isHorizontal = cartesian.getBaseAxis().isHorizontal();
  var x = rect.x;
  var y = rect.y;
  var width = rect.width;
  var height = rect.height;
  var lineWidth = seriesModel.get('lineStyle.width') || 2; // Expand the clip path a bit to avoid the border is clipped and looks thinner

  x -= lineWidth / 2;
  y -= lineWidth / 2;
  width += lineWidth;
  height += lineWidth;
  var clipPath = new graphic.Rect({
    shape: {
      x: x,
      y: y,
      width: width,
      height: height
    }
  });

  if (hasAnimation) {
    clipPath.shape[isHorizontal ? 'width' : 'height'] = 0;
    graphic.initProps(clipPath, {
      shape: {
        width: width,
        height: height
      }
    }, seriesModel);
  }

  return clipPath;
}

function createPolarClipPath(polar, hasAnimation, seriesModel) {
  var sectorArea = polar.getArea(); // Avoid float number rounding error for symbol on the edge of axis extent.

  var clipPath = new graphic.Sector({
    shape: {
      cx: round(polar.cx, 1),
      cy: round(polar.cy, 1),
      r0: round(sectorArea.r0, 1),
      r: round(sectorArea.r, 1),
      startAngle: sectorArea.startAngle,
      endAngle: sectorArea.endAngle,
      clockwise: sectorArea.clockwise
    }
  });

  if (hasAnimation) {
    clipPath.shape.endAngle = sectorArea.startAngle;
    graphic.initProps(clipPath, {
      shape: {
        endAngle: sectorArea.endAngle
      }
    }, seriesModel);
  }

  return clipPath;
}

function createClipPath(coordSys, hasAnimation, seriesModel) {
  if (!coordSys) {
    return null;
  } else if (coordSys.type === 'polar') {
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  } else if (coordSys.type === 'cartesian2d') {
    return createGridClipPath(coordSys, hasAnimation, seriesModel);
  }

  return null;
}

exports.createGridClipPath = createGridClipPath;
exports.createPolarClipPath = createPolarClipPath;
exports.createClipPath = createClipPath;

/***/ }),

/***/ "c775":
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

var _dataProvider = __webpack_require__("2b17");

var retrieveRawValue = _dataProvider.retrieveRawValue;

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
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @return {string} label string. Not null/undefined
 */
function getDefaultLabel(data, dataIndex) {
  var labelDims = data.mapDimension('defaultedLabel', true);
  var len = labelDims.length; // Simple optimization (in lots of cases, label dims length is 1)

  if (len === 1) {
    return retrieveRawValue(data, dataIndex, labelDims[0]);
  } else if (len) {
    var vals = [];

    for (var i = 0; i < labelDims.length; i++) {
      var val = retrieveRawValue(data, dataIndex, labelDims[i]);
      vals.push(val);
    }

    return vals.join(' ');
  }
}

exports.getDefaultLabel = getDefaultLabel;

/***/ }),

/***/ "c8ef":
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

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var _graphic = __webpack_require__("2306");

var Group = _graphic.Group;

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

var SymbolClz = __webpack_require__("1418");

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
 * Symbol with ripple effect
 * @module echarts/chart/helper/EffectSymbol
 */
var EFFECT_RIPPLE_NUMBER = 3;

function normalizeSymbolSize(symbolSize) {
  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [+symbolSize, +symbolSize];
  }

  return symbolSize;
}

function updateRipplePath(rippleGroup, effectCfg) {
  var color = effectCfg.rippleEffectColor || effectCfg.color;
  rippleGroup.eachChild(function (ripplePath) {
    ripplePath.attr({
      z: effectCfg.z,
      zlevel: effectCfg.zlevel,
      style: {
        stroke: effectCfg.brushType === 'stroke' ? color : null,
        fill: effectCfg.brushType === 'fill' ? color : null
      }
    });
  });
}
/**
 * @constructor
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @extends {module:zrender/graphic/Group}
 */


function EffectSymbol(data, idx) {
  Group.call(this);
  var symbol = new SymbolClz(data, idx);
  var rippleGroup = new Group();
  this.add(symbol);
  this.add(rippleGroup);

  rippleGroup.beforeUpdate = function () {
    this.attr(symbol.getScale());
  };

  this.updateData(data, idx);
}

var effectSymbolProto = EffectSymbol.prototype;

effectSymbolProto.stopEffectAnimation = function () {
  this.childAt(1).removeAll();
};

effectSymbolProto.startEffectAnimation = function (effectCfg) {
  var symbolType = effectCfg.symbolType;
  var color = effectCfg.color;
  var rippleGroup = this.childAt(1);

  for (var i = 0; i < EFFECT_RIPPLE_NUMBER; i++) {
    // If width/height are set too small (e.g., set to 1) on ios10
    // and macOS Sierra, a circle stroke become a rect, no matter what
    // the scale is set. So we set width/height as 2. See #4136.
    var ripplePath = createSymbol(symbolType, -1, -1, 2, 2, color);
    ripplePath.attr({
      style: {
        strokeNoScale: true
      },
      z2: 99,
      silent: true,
      scale: [0.5, 0.5]
    });
    var delay = -i / EFFECT_RIPPLE_NUMBER * effectCfg.period + effectCfg.effectOffset; // TODO Configurable effectCfg.period

    ripplePath.animate('', true).when(effectCfg.period, {
      scale: [effectCfg.rippleScale / 2, effectCfg.rippleScale / 2]
    }).delay(delay).start();
    ripplePath.animateStyle(true).when(effectCfg.period, {
      opacity: 0
    }).delay(delay).start();
    rippleGroup.add(ripplePath);
  }

  updateRipplePath(rippleGroup, effectCfg);
};
/**
 * Update effect symbol
 */


effectSymbolProto.updateEffectAnimation = function (effectCfg) {
  var oldEffectCfg = this._effectCfg;
  var rippleGroup = this.childAt(1); // Must reinitialize effect if following configuration changed

  var DIFFICULT_PROPS = ['symbolType', 'period', 'rippleScale'];

  for (var i = 0; i < DIFFICULT_PROPS.length; i++) {
    var propName = DIFFICULT_PROPS[i];

    if (oldEffectCfg[propName] !== effectCfg[propName]) {
      this.stopEffectAnimation();
      this.startEffectAnimation(effectCfg);
      return;
    }
  }

  updateRipplePath(rippleGroup, effectCfg);
};
/**
 * Highlight symbol
 */


effectSymbolProto.highlight = function () {
  this.trigger('emphasis');
};
/**
 * Downplay symbol
 */


effectSymbolProto.downplay = function () {
  this.trigger('normal');
};
/**
 * Update symbol properties
 * @param  {module:echarts/data/List} data
 * @param  {number} idx
 */


effectSymbolProto.updateData = function (data, idx) {
  var seriesModel = data.hostModel;
  this.childAt(0).updateData(data, idx);
  var rippleGroup = this.childAt(1);
  var itemModel = data.getItemModel(idx);
  var symbolType = data.getItemVisual(idx, 'symbol');
  var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
  var color = data.getItemVisual(idx, 'color');
  rippleGroup.attr('scale', symbolSize);
  rippleGroup.traverse(function (ripplePath) {
    ripplePath.attr({
      fill: color
    });
  });
  var symbolOffset = itemModel.getShallow('symbolOffset');

  if (symbolOffset) {
    var pos = rippleGroup.position;
    pos[0] = parsePercent(symbolOffset[0], symbolSize[0]);
    pos[1] = parsePercent(symbolOffset[1], symbolSize[1]);
  }

  rippleGroup.rotation = (itemModel.getShallow('symbolRotate') || 0) * Math.PI / 180 || 0;
  var effectCfg = {};
  effectCfg.showEffectOn = seriesModel.get('showEffectOn');
  effectCfg.rippleScale = itemModel.get('rippleEffect.scale');
  effectCfg.brushType = itemModel.get('rippleEffect.brushType');
  effectCfg.period = itemModel.get('rippleEffect.period') * 1000;
  effectCfg.effectOffset = idx / data.count();
  effectCfg.z = itemModel.getShallow('z') || 0;
  effectCfg.zlevel = itemModel.getShallow('zlevel') || 0;
  effectCfg.symbolType = symbolType;
  effectCfg.color = color;
  effectCfg.rippleEffectColor = itemModel.get('rippleEffect.color');
  this.off('mouseover').off('mouseout').off('emphasis').off('normal');

  if (effectCfg.showEffectOn === 'render') {
    this._effectCfg ? this.updateEffectAnimation(effectCfg) : this.startEffectAnimation(effectCfg);
    this._effectCfg = effectCfg;
  } else {
    // Not keep old effect config
    this._effectCfg = null;
    this.stopEffectAnimation();
    var symbol = this.childAt(0);

    var onEmphasis = function () {
      symbol.highlight();

      if (effectCfg.showEffectOn !== 'render') {
        this.startEffectAnimation(effectCfg);
      }
    };

    var onNormal = function () {
      symbol.downplay();

      if (effectCfg.showEffectOn !== 'render') {
        this.stopEffectAnimation();
      }
    };

    this.on('mouseover', onEmphasis, this).on('mouseout', onNormal, this).on('emphasis', onEmphasis, this).on('normal', onNormal, this);
  }

  this._effectCfg = effectCfg;
};

effectSymbolProto.fadeOut = function (cb) {
  this.off('mouseover').off('mouseout').off('emphasis').off('normal');
  cb && cb();
};

zrUtil.inherits(EffectSymbol, Group);
var _default = EffectSymbol;
module.exports = _default;

/***/ }),

/***/ "c965":
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

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var IncrementalDisplayable = __webpack_require__("392f");

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

/* global Float32Array */
// TODO Batch by color
var BOOST_SIZE_THRESHOLD = 4;
var LargeSymbolPath = graphic.extendShape({
  shape: {
    points: null
  },
  symbolProxy: null,
  softClipShape: null,
  buildPath: function (path, shape) {
    var points = shape.points;
    var size = shape.size;
    var symbolProxy = this.symbolProxy;
    var symbolProxyShape = symbolProxy.shape;
    var ctx = path.getContext ? path.getContext() : path;
    var canBoost = ctx && size[0] < BOOST_SIZE_THRESHOLD; // Do draw in afterBrush.

    if (canBoost) {
      return;
    }

    for (var i = 0; i < points.length;) {
      var x = points[i++];
      var y = points[i++];

      if (isNaN(x) || isNaN(y)) {
        continue;
      }

      if (this.softClipShape && !this.softClipShape.contain(x, y)) {
        continue;
      }

      symbolProxyShape.x = x - size[0] / 2;
      symbolProxyShape.y = y - size[1] / 2;
      symbolProxyShape.width = size[0];
      symbolProxyShape.height = size[1];
      symbolProxy.buildPath(path, symbolProxyShape, true);
    }
  },
  afterBrush: function (ctx) {
    var shape = this.shape;
    var points = shape.points;
    var size = shape.size;
    var canBoost = size[0] < BOOST_SIZE_THRESHOLD;

    if (!canBoost) {
      return;
    }

    this.setTransform(ctx); // PENDING If style or other canvas status changed?

    for (var i = 0; i < points.length;) {
      var x = points[i++];
      var y = points[i++];

      if (isNaN(x) || isNaN(y)) {
        continue;
      }

      if (this.softClipShape && !this.softClipShape.contain(x, y)) {
        continue;
      } // fillRect is faster than building a rect path and draw.
      // And it support light globalCompositeOperation.


      ctx.fillRect(x - size[0] / 2, y - size[1] / 2, size[0], size[1]);
    }

    this.restoreTransform(ctx);
  },
  findDataIndex: function (x, y) {
    // TODO ???
    // Consider transform
    var shape = this.shape;
    var points = shape.points;
    var size = shape.size;
    var w = Math.max(size[0], 4);
    var h = Math.max(size[1], 4); // Not consider transform
    // Treat each element as a rect
    // top down traverse

    for (var idx = points.length / 2 - 1; idx >= 0; idx--) {
      var i = idx * 2;
      var x0 = points[i] - w / 2;
      var y0 = points[i + 1] - h / 2;

      if (x >= x0 && y >= y0 && x <= x0 + w && y <= y0 + h) {
        return idx;
      }
    }

    return -1;
  }
});

function LargeSymbolDraw() {
  this.group = new graphic.Group();
}

var largeSymbolProto = LargeSymbolDraw.prototype;

largeSymbolProto.isPersistent = function () {
  return !this._incremental;
};
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} opt
 * @param {Object} [opt.clipShape]
 */


largeSymbolProto.updateData = function (data, opt) {
  this.group.removeAll();
  var symbolEl = new LargeSymbolPath({
    rectHover: true,
    cursor: 'default'
  });
  symbolEl.setShape({
    points: data.getLayout('symbolPoints')
  });

  this._setCommon(symbolEl, data, false, opt);

  this.group.add(symbolEl);
  this._incremental = null;
};

largeSymbolProto.updateLayout = function (data) {
  if (this._incremental) {
    return;
  }

  var points = data.getLayout('symbolPoints');
  this.group.eachChild(function (child) {
    if (child.startIndex != null) {
      var len = (child.endIndex - child.startIndex) * 2;
      var byteOffset = child.startIndex * 4 * 2;
      points = new Float32Array(points.buffer, byteOffset, len);
    }

    child.setShape('points', points);
  });
};

largeSymbolProto.incrementalPrepareUpdate = function (data) {
  this.group.removeAll();

  this._clearIncremental(); // Only use incremental displayables when data amount is larger than 2 million.
  // PENDING Incremental data?


  if (data.count() > 2e6) {
    if (!this._incremental) {
      this._incremental = new IncrementalDisplayable({
        silent: true
      });
    }

    this.group.add(this._incremental);
  } else {
    this._incremental = null;
  }
};

largeSymbolProto.incrementalUpdate = function (taskParams, data, opt) {
  var symbolEl;

  if (this._incremental) {
    symbolEl = new LargeSymbolPath();

    this._incremental.addDisplayable(symbolEl, true);
  } else {
    symbolEl = new LargeSymbolPath({
      rectHover: true,
      cursor: 'default',
      startIndex: taskParams.start,
      endIndex: taskParams.end
    });
    symbolEl.incremental = true;
    this.group.add(symbolEl);
  }

  symbolEl.setShape({
    points: data.getLayout('symbolPoints')
  });

  this._setCommon(symbolEl, data, !!this._incremental, opt);
};

largeSymbolProto._setCommon = function (symbolEl, data, isIncremental, opt) {
  var hostModel = data.hostModel;
  opt = opt || {}; // TODO
  // if (data.hasItemVisual.symbolSize) {
  //     // TODO typed array?
  //     symbolEl.setShape('sizes', data.mapArray(
  //         function (idx) {
  //             var size = data.getItemVisual(idx, 'symbolSize');
  //             return (size instanceof Array) ? size : [size, size];
  //         }
  //     ));
  // }
  // else {

  var size = data.getVisual('symbolSize');
  symbolEl.setShape('size', size instanceof Array ? size : [size, size]); // }

  symbolEl.softClipShape = opt.clipShape || null; // Create symbolProxy to build path for each data

  symbolEl.symbolProxy = createSymbol(data.getVisual('symbol'), 0, 0, 0, 0); // Use symbolProxy setColor method

  symbolEl.setColor = symbolEl.symbolProxy.setColor;
  var extrudeShadow = symbolEl.shape.size[0] < BOOST_SIZE_THRESHOLD;
  symbolEl.useStyle( // Draw shadow when doing fillRect is extremely slow.
  hostModel.getModel('itemStyle').getItemStyle(extrudeShadow ? ['color', 'shadowBlur', 'shadowColor'] : ['color']));
  var visualColor = data.getVisual('color');

  if (visualColor) {
    symbolEl.setColor(visualColor);
  }

  if (!isIncremental) {
    // Enable tooltip
    // PENDING May have performance issue when path is extremely large
    symbolEl.seriesIndex = hostModel.seriesIndex;
    symbolEl.on('mousemove', function (e) {
      symbolEl.dataIndex = null;
      var dataIndex = symbolEl.findDataIndex(e.offsetX, e.offsetY);

      if (dataIndex >= 0) {
        // Provide dataIndex for tooltip
        symbolEl.dataIndex = dataIndex + (symbolEl.startIndex || 0);
      }
    });
  }
};

largeSymbolProto.remove = function () {
  this._clearIncremental();

  this._incremental = null;
  this.group.removeAll();
};

largeSymbolProto._clearIncremental = function () {
  var incremental = this._incremental;

  if (incremental) {
    incremental.clearDisplaybles();
  }
};

var _default = LargeSymbolDraw;
module.exports = _default;

/***/ }),

/***/ "cccd":
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

/**
 * @return {string} If large mode changed, return string 'reset';
 */
function _default() {
  var inner = makeInner();
  return function (seriesModel) {
    var fields = inner(seriesModel);
    var pipelineContext = seriesModel.pipelineContext;
    var originalLarge = fields.large;
    var originalProgressive = fields.progressiveRender;
    var large = fields.large = pipelineContext.large;
    var progressive = fields.progressiveRender = pipelineContext.progressiveRender;
    return !!(originalLarge ^ large || originalProgressive ^ progressive) && 'reset';
  };
}

module.exports = _default;

/***/ }),

/***/ "cd84":
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

/* global Uint8ClampedArray */
var GRADIENT_LEVELS = 256;
/**
 * Heatmap Chart
 *
 * @class
 */

function Heatmap() {
  var canvas = zrUtil.createCanvas();
  this.canvas = canvas;
  this.blurSize = 30;
  this.pointSize = 20;
  this.maxOpacity = 1;
  this.minOpacity = 0;
  this._gradientPixels = {};
}

Heatmap.prototype = {
  /**
   * Renders Heatmap and returns the rendered canvas
   * @param {Array} data array of data, each has x, y, value
   * @param {number} width canvas width
   * @param {number} height canvas height
   */
  update: function (data, width, height, normalize, colorFunc, isInRange) {
    var brush = this._getBrush();

    var gradientInRange = this._getGradient(data, colorFunc, 'inRange');

    var gradientOutOfRange = this._getGradient(data, colorFunc, 'outOfRange');

    var r = this.pointSize + this.blurSize;
    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');
    var len = data.length;
    canvas.width = width;
    canvas.height = height;

    for (var i = 0; i < len; ++i) {
      var p = data[i];
      var x = p[0];
      var y = p[1];
      var value = p[2]; // calculate alpha using value

      var alpha = normalize(value); // draw with the circle brush with alpha

      ctx.globalAlpha = alpha;
      ctx.drawImage(brush, x - r, y - r);
    }

    if (!canvas.width || !canvas.height) {
      // Avoid "Uncaught DOMException: Failed to execute 'getImageData' on
      // 'CanvasRenderingContext2D': The source height is 0."
      return canvas;
    } // colorize the canvas using alpha value and set with gradient


    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    var offset = 0;
    var pixelLen = pixels.length;
    var minOpacity = this.minOpacity;
    var maxOpacity = this.maxOpacity;
    var diffOpacity = maxOpacity - minOpacity;

    while (offset < pixelLen) {
      var alpha = pixels[offset + 3] / 256;
      var gradientOffset = Math.floor(alpha * (GRADIENT_LEVELS - 1)) * 4; // Simple optimize to ignore the empty data

      if (alpha > 0) {
        var gradient = isInRange(alpha) ? gradientInRange : gradientOutOfRange; // Any alpha > 0 will be mapped to [minOpacity, maxOpacity]

        alpha > 0 && (alpha = alpha * diffOpacity + minOpacity);
        pixels[offset++] = gradient[gradientOffset];
        pixels[offset++] = gradient[gradientOffset + 1];
        pixels[offset++] = gradient[gradientOffset + 2];
        pixels[offset++] = gradient[gradientOffset + 3] * alpha * 256;
      } else {
        offset += 4;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  },

  /**
   * get canvas of a black circle brush used for canvas to draw later
   * @private
   * @returns {Object} circle brush canvas
   */
  _getBrush: function () {
    var brushCanvas = this._brushCanvas || (this._brushCanvas = zrUtil.createCanvas()); // set brush size

    var r = this.pointSize + this.blurSize;
    var d = r * 2;
    brushCanvas.width = d;
    brushCanvas.height = d;
    var ctx = brushCanvas.getContext('2d');
    ctx.clearRect(0, 0, d, d); // in order to render shadow without the distinct circle,
    // draw the distinct circle in an invisible place,
    // and use shadowOffset to draw shadow in the center of the canvas

    ctx.shadowOffsetX = d;
    ctx.shadowBlur = this.blurSize; // draw the shadow in black, and use alpha and shadow blur to generate
    // color in color map

    ctx.shadowColor = '#000'; // draw circle in the left to the canvas

    ctx.beginPath();
    ctx.arc(-r, r, this.pointSize, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    return brushCanvas;
  },

  /**
   * get gradient color map
   * @private
   */
  _getGradient: function (data, colorFunc, state) {
    var gradientPixels = this._gradientPixels;
    var pixelsSingleState = gradientPixels[state] || (gradientPixels[state] = new Uint8ClampedArray(256 * 4));
    var color = [0, 0, 0, 0];
    var off = 0;

    for (var i = 0; i < 256; i++) {
      colorFunc[state](i / 255, true, color);
      pixelsSingleState[off++] = color[0];
      pixelsSingleState[off++] = color[1];
      pixelsSingleState[off++] = color[2];
      pixelsSingleState[off++] = color[3];
    }

    return pixelsSingleState;
  }
};
var _default = Heatmap;
module.exports = _default;

/***/ }),

/***/ "d2a5":
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
 * @payload
 * @property {number} [seriesIndex]
 * @property {string} [seriesId]
 * @property {string} [seriesName]
 * @property {number} [dataIndex]
 */
echarts.registerAction({
  type: 'focusNodeAdjacency',
  event: 'focusNodeAdjacency',
  update: 'series:focusNodeAdjacency'
}, function () {});
/**
 * @payload
 * @property {number} [seriesIndex]
 * @property {string} [seriesId]
 * @property {string} [seriesName]
 */

echarts.registerAction({
  type: 'unfocusNodeAdjacency',
  event: 'unfocusNodeAdjacency',
  update: 'series:unfocusNodeAdjacency'
}, function () {});

/***/ }),

/***/ "d357":
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

var _simpleLayoutHelper = __webpack_require__("1c5f");

var simpleLayout = _simpleLayoutHelper.simpleLayout;
var simpleLayoutEdge = _simpleLayoutHelper.simpleLayoutEdge;

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
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    var layout = seriesModel.get('layout');
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys && coordSys.type !== 'view') {
      var data = seriesModel.getData();
      var dimensions = [];
      each(coordSys.dimensions, function (coordDim) {
        dimensions = dimensions.concat(data.mapDimension(coordDim, true));
      });

      for (var dataIndex = 0; dataIndex < data.count(); dataIndex++) {
        var value = [];
        var hasValue = false;

        for (var i = 0; i < dimensions.length; i++) {
          var val = data.get(dimensions[i], dataIndex);

          if (!isNaN(val)) {
            hasValue = true;
          }

          value.push(val);
        }

        if (hasValue) {
          data.setItemLayout(dataIndex, coordSys.dataToPoint(value));
        } else {
          // Also {Array.<number>}, not undefined to avoid if...else... statement
          data.setItemLayout(dataIndex, [NaN, NaN]);
        }
      }

      simpleLayoutEdge(data.graph);
    } else if (!layout || layout === 'none') {
      simpleLayout(seriesModel);
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "d747":
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
var actionInfo = {
  type: 'graphRoam',
  event: 'graphRoam',
  update: 'none'
};
/**
 * @payload
 * @property {string} name Series name
 * @property {number} [dx]
 * @property {number} [dy]
 * @property {number} [zoom]
 * @property {number} [originX]
 * @property {number} [originY]
 */

echarts.registerAction(actionInfo, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'series',
    query: payload
  }, function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var res = updateCenterAndZoom(coordSys, payload);
    seriesModel.setCenter && seriesModel.setCenter(res.center);
    seriesModel.setZoom && seriesModel.setZoom(res.zoom);
  });
});

/***/ }),

/***/ "de6e":
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
function normalize(a) {
  if (!(a instanceof Array)) {
    a = [a, a];
  }

  return a;
}

function _default(ecModel) {
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    var graph = seriesModel.getGraph();
    var edgeData = seriesModel.getEdgeData();
    var symbolType = normalize(seriesModel.get('edgeSymbol'));
    var symbolSize = normalize(seriesModel.get('edgeSymbolSize'));
    var colorQuery = 'lineStyle.color'.split('.');
    var opacityQuery = 'lineStyle.opacity'.split('.');
    edgeData.setVisual('fromSymbol', symbolType && symbolType[0]);
    edgeData.setVisual('toSymbol', symbolType && symbolType[1]);
    edgeData.setVisual('fromSymbolSize', symbolSize && symbolSize[0]);
    edgeData.setVisual('toSymbolSize', symbolSize && symbolSize[1]);
    edgeData.setVisual('color', seriesModel.get(colorQuery));
    edgeData.setVisual('opacity', seriesModel.get(opacityQuery));
    edgeData.each(function (idx) {
      var itemModel = edgeData.getItemModel(idx);
      var edge = graph.getEdgeByIndex(idx);
      var symbolType = normalize(itemModel.getShallow('symbol', true));
      var symbolSize = normalize(itemModel.getShallow('symbolSize', true)); // Edge visual must after node visual

      var color = itemModel.get(colorQuery);
      var opacity = itemModel.get(opacityQuery);

      switch (color) {
        case 'source':
          color = edge.node1.getVisual('color');
          break;

        case 'target':
          color = edge.node2.getVisual('color');
          break;
      }

      symbolType[0] && edge.setVisual('fromSymbol', symbolType[0]);
      symbolType[1] && edge.setVisual('toSymbol', symbolType[1]);
      symbolSize[0] && edge.setVisual('fromSymbolSize', symbolSize[0]);
      symbolSize[1] && edge.setVisual('toSymbolSize', symbolSize[1]);
      edge.setVisual('color', color);
      edge.setVisual('opacity', opacity);
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "e468":
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

var createListSimply = __webpack_require__("e46b");

var zrUtil = __webpack_require__("6d8b");

var _dimensionHelper = __webpack_require__("2f45");

var getDimensionTypeByAxis = _dimensionHelper.getDimensionTypeByAxis;

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForAxisCoordSys = _sourceHelper.makeSeriesEncodeForAxisCoordSys;

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
var seriesModelMixin = {
  /**
   * @private
   * @type {string}
   */
  _baseAxisDim: null,

  /**
   * @override
   */
  getInitialData: function (option, ecModel) {
    // When both types of xAxis and yAxis are 'value', layout is
    // needed to be specified by user. Otherwise, layout can be
    // judged by which axis is category.
    var ordinalMeta;
    var xAxisModel = ecModel.getComponent('xAxis', this.get('xAxisIndex'));
    var yAxisModel = ecModel.getComponent('yAxis', this.get('yAxisIndex'));
    var xAxisType = xAxisModel.get('type');
    var yAxisType = yAxisModel.get('type');
    var addOrdinal; // FIXME
    // Consider time axis.

    if (xAxisType === 'category') {
      option.layout = 'horizontal';
      ordinalMeta = xAxisModel.getOrdinalMeta();
      addOrdinal = true;
    } else if (yAxisType === 'category') {
      option.layout = 'vertical';
      ordinalMeta = yAxisModel.getOrdinalMeta();
      addOrdinal = true;
    } else {
      option.layout = option.layout || 'horizontal';
    }

    var coordDims = ['x', 'y'];
    var baseAxisDimIndex = option.layout === 'horizontal' ? 0 : 1;
    var baseAxisDim = this._baseAxisDim = coordDims[baseAxisDimIndex];
    var otherAxisDim = coordDims[1 - baseAxisDimIndex];
    var axisModels = [xAxisModel, yAxisModel];
    var baseAxisType = axisModels[baseAxisDimIndex].get('type');
    var otherAxisType = axisModels[1 - baseAxisDimIndex].get('type');
    var data = option.data; // ??? FIXME make a stage to perform data transfrom.
    // MUST create a new data, consider setOption({}) again.

    if (data && addOrdinal) {
      var newOptionData = [];
      zrUtil.each(data, function (item, index) {
        var newItem;

        if (item.value && zrUtil.isArray(item.value)) {
          newItem = item.value.slice();
          item.value.unshift(index);
        } else if (zrUtil.isArray(item)) {
          newItem = item.slice();
          item.unshift(index);
        } else {
          newItem = item;
        }

        newOptionData.push(newItem);
      });
      option.data = newOptionData;
    }

    var defaultValueDimensions = this.defaultValueDimensions;
    var coordDimensions = [{
      name: baseAxisDim,
      type: getDimensionTypeByAxis(baseAxisType),
      ordinalMeta: ordinalMeta,
      otherDims: {
        tooltip: false,
        itemName: 0
      },
      dimsDef: ['base']
    }, {
      name: otherAxisDim,
      type: getDimensionTypeByAxis(otherAxisType),
      dimsDef: defaultValueDimensions.slice()
    }];
    return createListSimply(this, {
      coordDimensions: coordDimensions,
      dimensionsCount: defaultValueDimensions.length + 1,
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForAxisCoordSys, coordDimensions, this)
    });
  },

  /**
   * If horizontal, base axis is x, otherwise y.
   * @override
   */
  getBaseAxis: function () {
    var dim = this._baseAxisDim;
    return this.ecModel.getComponent(dim + 'Axis', this.get(dim + 'AxisIndex')).axis;
  }
};
exports.seriesModelMixin = seriesModelMixin;

/***/ }),

/***/ "e46b":
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

var createDimensions = __webpack_require__("b1d4");

var List = __webpack_require__("6179");

var _util = __webpack_require__("6d8b");

var extend = _util.extend;
var isArray = _util.isArray;

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
 * [Usage]:
 * (1)
 * createListSimply(seriesModel, ['value']);
 * (2)
 * createListSimply(seriesModel, {
 *     coordDimensions: ['value'],
 *     dimensionsCount: 5
 * });
 *
 * @param {module:echarts/model/Series} seriesModel
 * @param {Object|Array.<string|Object>} opt opt or coordDimensions
 *        The options in opt, see `echarts/data/helper/createDimensions`
 * @param {Array.<string>} [nameList]
 * @return {module:echarts/data/List}
 */
function _default(seriesModel, opt, nameList) {
  opt = isArray(opt) && {
    coordDimensions: opt
  } || extend({}, opt);
  var source = seriesModel.getSource();
  var dimensionsInfo = createDimensions(source, opt);
  var list = new List(dimensionsInfo, seriesModel);
  list.initData(source, nameList);
  return list;
}

module.exports = _default;

/***/ }),

/***/ "ef2b":
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

var vec2 = __webpack_require__("401b");

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
* Some formulas were originally copied from "d3.js" with some
* modifications made for this project.
* (See more details in the comment of the method "step" below.)
* The use of the source code of this file is also subject to the terms
* and consitions of the license of "d3.js" (BSD-3Clause, see
* </licenses/LICENSE-d3>).
*/
var scaleAndAdd = vec2.scaleAndAdd; // function adjacentNode(n, e) {
//     return e.n1 === n ? e.n2 : e.n1;
// }

function forceLayout(nodes, edges, opts) {
  var rect = opts.rect;
  var width = rect.width;
  var height = rect.height;
  var center = [rect.x + width / 2, rect.y + height / 2]; // var scale = opts.scale || 1;

  var gravity = opts.gravity == null ? 0.1 : opts.gravity; // for (var i = 0; i < edges.length; i++) {
  //     var e = edges[i];
  //     var n1 = e.n1;
  //     var n2 = e.n2;
  //     n1.edges = n1.edges || [];
  //     n2.edges = n2.edges || [];
  //     n1.edges.push(e);
  //     n2.edges.push(e);
  // }
  // Init position

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];

    if (!n.p) {
      n.p = vec2.create(width * (Math.random() - 0.5) + center[0], height * (Math.random() - 0.5) + center[1]);
    }

    n.pp = vec2.clone(n.p);
    n.edges = null;
  } // Formula in 'Graph Drawing by Force-directed Placement'
  // var k = scale * Math.sqrt(width * height / nodes.length);
  // var k2 = k * k;


  var initialFriction = opts.friction == null ? 0.6 : opts.friction;
  var friction = initialFriction;
  return {
    warmUp: function () {
      friction = initialFriction * 0.8;
    },
    setFixed: function (idx) {
      nodes[idx].fixed = true;
    },
    setUnfixed: function (idx) {
      nodes[idx].fixed = false;
    },

    /**
     * Some formulas were originally copied from "d3.js"
     * https://github.com/d3/d3/blob/b516d77fb8566b576088e73410437494717ada26/src/layout/force.js
     * with some modifications made for this project.
     * See the license statement at the head of this file.
     */
    step: function (cb) {
      var v12 = [];
      var nLen = nodes.length;

      for (var i = 0; i < edges.length; i++) {
        var e = edges[i];

        if (e.ignoreForceLayout) {
          continue;
        }

        var n1 = e.n1;
        var n2 = e.n2;
        vec2.sub(v12, n2.p, n1.p);
        var d = vec2.len(v12) - e.d;
        var w = n2.w / (n1.w + n2.w);

        if (isNaN(w)) {
          w = 0;
        }

        vec2.normalize(v12, v12);
        !n1.fixed && scaleAndAdd(n1.p, n1.p, v12, w * d * friction);
        !n2.fixed && scaleAndAdd(n2.p, n2.p, v12, -(1 - w) * d * friction);
      } // Gravity


      for (var i = 0; i < nLen; i++) {
        var n = nodes[i];

        if (!n.fixed) {
          vec2.sub(v12, center, n.p); // var d = vec2.len(v12);
          // vec2.scale(v12, v12, 1 / d);
          // var gravityFactor = gravity;

          scaleAndAdd(n.p, n.p, v12, gravity * friction);
        }
      } // Repulsive
      // PENDING


      for (var i = 0; i < nLen; i++) {
        var n1 = nodes[i];

        for (var j = i + 1; j < nLen; j++) {
          var n2 = nodes[j];
          vec2.sub(v12, n2.p, n1.p);
          var d = vec2.len(v12);

          if (d === 0) {
            // Random repulse
            vec2.set(v12, Math.random() - 0.5, Math.random() - 0.5);
            d = 1;
          }

          var repFact = (n1.rep + n2.rep) / d / d;
          !n1.fixed && scaleAndAdd(n1.pp, n1.pp, v12, repFact);
          !n2.fixed && scaleAndAdd(n2.pp, n2.pp, v12, -repFact);
        }
      }

      var v = [];

      for (var i = 0; i < nLen; i++) {
        var n = nodes[i];

        if (!n.fixed) {
          vec2.sub(v, n.p, n.pp);
          scaleAndAdd(n.p, n.p, v, friction);
          vec2.copy(n.pp, n.p);
        }
      }

      friction = friction * 0.992;
      cb && cb(nodes, edges, friction < 0.01);
    }
  };
}

exports.forceLayout = forceLayout;

/***/ }),

/***/ "f706":
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

var SymbolClz = __webpack_require__("1418");

var _util = __webpack_require__("6d8b");

var isObject = _util.isObject;

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
 * @module echarts/chart/helper/SymbolDraw
 */

/**
 * @constructor
 * @alias module:echarts/chart/helper/SymbolDraw
 * @param {module:zrender/graphic/Group} [symbolCtor]
 */
function SymbolDraw(symbolCtor) {
  this.group = new graphic.Group();
  this._symbolCtor = symbolCtor || SymbolClz;
}

var symbolDrawProto = SymbolDraw.prototype;

function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) // We do not set clipShape on group, because it will cut part of
  // the symbol element shape. We use the same clip shape here as
  // the line clip.
  && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, 'symbol') !== 'none';
}
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.updateData = function (data, opt) {
  opt = normalizeUpdateOpt(opt);
  var group = this.group;
  var seriesModel = data.hostModel;
  var oldData = this._data;
  var SymbolCtor = this._symbolCtor;
  var seriesScope = makeSeriesScope(data); // There is no oldLineData only when first rendering or switching from
  // stream mode to normal mode, where previous elements should be removed.

  if (!oldData) {
    group.removeAll();
  }

  data.diff(oldData).add(function (newIdx) {
    var point = data.getItemLayout(newIdx);

    if (symbolNeedsDraw(data, point, newIdx, opt)) {
      var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
      symbolEl.attr('position', point);
      data.setItemGraphicEl(newIdx, symbolEl);
      group.add(symbolEl);
    }
  }).update(function (newIdx, oldIdx) {
    var symbolEl = oldData.getItemGraphicEl(oldIdx);
    var point = data.getItemLayout(newIdx);

    if (!symbolNeedsDraw(data, point, newIdx, opt)) {
      group.remove(symbolEl);
      return;
    }

    if (!symbolEl) {
      symbolEl = new SymbolCtor(data, newIdx);
      symbolEl.attr('position', point);
    } else {
      symbolEl.updateData(data, newIdx, seriesScope);
      graphic.updateProps(symbolEl, {
        position: point
      }, seriesModel);
    } // Add back


    group.add(symbolEl);
    data.setItemGraphicEl(newIdx, symbolEl);
  }).remove(function (oldIdx) {
    var el = oldData.getItemGraphicEl(oldIdx);
    el && el.fadeOut(function () {
      group.remove(el);
    });
  }).execute();
  this._data = data;
};

symbolDrawProto.isPersistent = function () {
  return true;
};

symbolDrawProto.updateLayout = function () {
  var data = this._data;

  if (data) {
    // Not use animation
    data.eachItemGraphicEl(function (el, idx) {
      var point = data.getItemLayout(idx);
      el.attr('position', point);
    });
  }
};

symbolDrawProto.incrementalPrepareUpdate = function (data) {
  this._seriesScope = makeSeriesScope(data);
  this._data = null;
  this.group.removeAll();
};
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.incrementalUpdate = function (taskParams, data, opt) {
  opt = normalizeUpdateOpt(opt);

  function updateIncrementalAndHover(el) {
    if (!el.isGroup) {
      el.incremental = el.useHoverLayer = true;
    }
  }

  for (var idx = taskParams.start; idx < taskParams.end; idx++) {
    var point = data.getItemLayout(idx);

    if (symbolNeedsDraw(data, point, idx, opt)) {
      var el = new this._symbolCtor(data, idx, this._seriesScope);
      el.traverse(updateIncrementalAndHover);
      el.attr('position', point);
      this.group.add(el);
      data.setItemGraphicEl(idx, el);
    }
  }
};

function normalizeUpdateOpt(opt) {
  if (opt != null && !isObject(opt)) {
    opt = {
      isIgnore: opt
    };
  }

  return opt || {};
}

symbolDrawProto.remove = function (enableAnimation) {
  var group = this.group;
  var data = this._data; // Incremental model do not have this._data.

  if (data && enableAnimation) {
    data.eachItemGraphicEl(function (el) {
      el.fadeOut(function () {
        group.remove(el);
      });
    });
  } else {
    group.removeAll();
  }
};

function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  return {
    itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
    hoverItemStyle: seriesModel.getModel('emphasis.itemStyle').getItemStyle(),
    symbolRotate: seriesModel.get('symbolRotate'),
    symbolOffset: seriesModel.get('symbolOffset'),
    hoverAnimation: seriesModel.get('hoverAnimation'),
    labelModel: seriesModel.getModel('label'),
    hoverLabelModel: seriesModel.getModel('emphasis.label'),
    cursorStyle: seriesModel.get('cursor')
  };
}

var _default = SymbolDraw;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~be6a9b4d.065a54d4.js.map