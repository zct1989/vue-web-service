(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~ed9be1e3"],{

/***/ "0046":
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

var SeriesModel = __webpack_require__("4f85");

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
var _default = SeriesModel.extend({
  type: 'series.parallel',
  dependencies: ['parallel'],
  visualColorAccessPath: 'lineStyle.color',
  getInitialData: function (option, ecModel) {
    var source = this.getSource();
    setEncodeAndDimensions(source, this);
    return createListFromArray(source, this);
  },

  /**
   * User can get data raw indices on 'axisAreaSelected' event received.
   *
   * @public
   * @param {string} activeState 'active' or 'inactive' or 'normal'
   * @return {Array.<number>} Raw indices
   */
  getRawIndicesByActiveState: function (activeState) {
    var coordSys = this.coordinateSystem;
    var data = this.getData();
    var indices = [];
    coordSys.eachActiveState(data, function (theActiveState, dataIndex) {
      if (activeState === theActiveState) {
        indices.push(data.getRawIndex(dataIndex));
      }
    });
    return indices;
  },
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    coordinateSystem: 'parallel',
    parallelIndex: 0,
    label: {
      show: false
    },
    inactiveOpacity: 0.05,
    activeOpacity: 1,
    lineStyle: {
      width: 1,
      opacity: 0.45,
      type: 'solid'
    },
    emphasis: {
      label: {
        show: false
      }
    },
    progressive: 500,
    smooth: false,
    // true | false | number
    animationEasing: 'linear'
  }
});

function setEncodeAndDimensions(source, seriesModel) {
  // The mapping of parallelAxis dimension to data dimension can
  // be specified in parallelAxis.option.dim. For example, if
  // parallelAxis.option.dim is 'dim3', it mapping to the third
  // dimension of data. But `data.encode` has higher priority.
  // Moreover, parallelModel.dimension should not be regarded as data
  // dimensions. Consider dimensions = ['dim4', 'dim2', 'dim6'];
  if (source.encodeDefine) {
    return;
  }

  var parallelModel = seriesModel.ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));

  if (!parallelModel) {
    return;
  }

  var encodeDefine = source.encodeDefine = createHashMap();
  each(parallelModel.dimensions, function (axisDim) {
    var dataDimIndex = convertDimNameToNumber(axisDim);
    encodeDefine.set(axisDim, dataDimIndex);
  });
}

function convertDimNameToNumber(dimName) {
  return +dimName.replace('dim', '');
}

module.exports = _default;

/***/ }),

/***/ "0817":
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

__webpack_require__("f306");

__webpack_require__("0046");

__webpack_require__("60d7");

var parallelVisual = __webpack_require__("ab71");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerVisual(parallelVisual);

/***/ }),

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

/***/ "1466":
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

var graphic = __webpack_require__("2306");

var zrUtil = __webpack_require__("6d8b");

var symbolUtil = __webpack_require__("a15a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function normalizeSymbolSize(symbolSize) {
  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [+symbolSize, +symbolSize];
  }

  return symbolSize;
}

var _default = echarts.extendChartView({
  type: 'radar',
  render: function (seriesModel, ecModel, api) {
    var polar = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;

    function createSymbol(data, idx) {
      var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
      var color = data.getItemVisual(idx, 'color');

      if (symbolType === 'none') {
        return;
      }

      var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
      var symbolPath = symbolUtil.createSymbol(symbolType, -1, -1, 2, 2, color);
      symbolPath.attr({
        style: {
          strokeNoScale: true
        },
        z2: 100,
        scale: [symbolSize[0] / 2, symbolSize[1] / 2]
      });
      return symbolPath;
    }

    function updateSymbols(oldPoints, newPoints, symbolGroup, data, idx, isInit) {
      // Simply rerender all
      symbolGroup.removeAll();

      for (var i = 0; i < newPoints.length - 1; i++) {
        var symbolPath = createSymbol(data, idx);

        if (symbolPath) {
          symbolPath.__dimIdx = i;

          if (oldPoints[i]) {
            symbolPath.attr('position', oldPoints[i]);
            graphic[isInit ? 'initProps' : 'updateProps'](symbolPath, {
              position: newPoints[i]
            }, seriesModel, idx);
          } else {
            symbolPath.attr('position', newPoints[i]);
          }

          symbolGroup.add(symbolPath);
        }
      }
    }

    function getInitialPoints(points) {
      return zrUtil.map(points, function (pt) {
        return [polar.cx, polar.cy];
      });
    }

    data.diff(oldData).add(function (idx) {
      var points = data.getItemLayout(idx);

      if (!points) {
        return;
      }

      var polygon = new graphic.Polygon();
      var polyline = new graphic.Polyline();
      var target = {
        shape: {
          points: points
        }
      };
      polygon.shape.points = getInitialPoints(points);
      polyline.shape.points = getInitialPoints(points);
      graphic.initProps(polygon, target, seriesModel, idx);
      graphic.initProps(polyline, target, seriesModel, idx);
      var itemGroup = new graphic.Group();
      var symbolGroup = new graphic.Group();
      itemGroup.add(polyline);
      itemGroup.add(polygon);
      itemGroup.add(symbolGroup);
      updateSymbols(polyline.shape.points, points, symbolGroup, data, idx, true);
      data.setItemGraphicEl(idx, itemGroup);
    }).update(function (newIdx, oldIdx) {
      var itemGroup = oldData.getItemGraphicEl(oldIdx);
      var polyline = itemGroup.childAt(0);
      var polygon = itemGroup.childAt(1);
      var symbolGroup = itemGroup.childAt(2);
      var target = {
        shape: {
          points: data.getItemLayout(newIdx)
        }
      };

      if (!target.shape.points) {
        return;
      }

      updateSymbols(polyline.shape.points, target.shape.points, symbolGroup, data, newIdx, false);
      graphic.updateProps(polyline, target, seriesModel);
      graphic.updateProps(polygon, target, seriesModel);
      data.setItemGraphicEl(newIdx, itemGroup);
    }).remove(function (idx) {
      group.remove(oldData.getItemGraphicEl(idx));
    }).execute();
    data.eachItemGraphicEl(function (itemGroup, idx) {
      var itemModel = data.getItemModel(idx);
      var polyline = itemGroup.childAt(0);
      var polygon = itemGroup.childAt(1);
      var symbolGroup = itemGroup.childAt(2);
      var color = data.getItemVisual(idx, 'color');
      group.add(itemGroup);
      polyline.useStyle(zrUtil.defaults(itemModel.getModel('lineStyle').getLineStyle(), {
        fill: 'none',
        stroke: color
      }));
      polyline.hoverStyle = itemModel.getModel('emphasis.lineStyle').getLineStyle();
      var areaStyleModel = itemModel.getModel('areaStyle');
      var hoverAreaStyleModel = itemModel.getModel('emphasis.areaStyle');
      var polygonIgnore = areaStyleModel.isEmpty() && areaStyleModel.parentModel.isEmpty();
      var hoverPolygonIgnore = hoverAreaStyleModel.isEmpty() && hoverAreaStyleModel.parentModel.isEmpty();
      hoverPolygonIgnore = hoverPolygonIgnore && polygonIgnore;
      polygon.ignore = polygonIgnore;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: color,
        opacity: 0.7
      }));
      polygon.hoverStyle = hoverAreaStyleModel.getAreaStyle();
      var itemStyle = itemModel.getModel('itemStyle').getItemStyle(['color']);
      var itemHoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
      var labelModel = itemModel.getModel('label');
      var labelHoverModel = itemModel.getModel('emphasis.label');
      symbolGroup.eachChild(function (symbolPath) {
        symbolPath.setStyle(itemStyle);
        symbolPath.hoverStyle = zrUtil.clone(itemHoverStyle);
        var defaultText = data.get(data.dimensions[symbolPath.__dimIdx], idx);
        (defaultText == null || isNaN(defaultText)) && (defaultText = '');
        graphic.setLabelStyle(symbolPath.style, symbolPath.hoverStyle, labelModel, labelHoverModel, {
          labelFetcher: data.hostModel,
          labelDataIndex: idx,
          labelDimIndex: symbolPath.__dimIdx,
          defaultText: defaultText,
          autoColor: color,
          isRectText: true
        });
      });

      itemGroup.highDownOnUpdate = function (fromState, toState) {
        polygon.attr('ignore', toState === 'emphasis' ? hoverPolygonIgnore : polygonIgnore);
      };

      graphic.setHoverStyle(itemGroup);
    });
    this._data = data;
  },
  remove: function () {
    this.group.removeAll();
    this._data = null;
  },
  dispose: function () {}
});

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

/***/ "1ab3":
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

var ChartView = __webpack_require__("e887");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @param {module:echarts/model/Series} seriesModel
 * @param {boolean} hasAnimation
 * @inner
 */
function updateDataSelected(uid, seriesModel, hasAnimation, api) {
  var data = seriesModel.getData();
  var dataIndex = this.dataIndex;
  var name = data.getName(dataIndex);
  var selectedOffset = seriesModel.get('selectedOffset');
  api.dispatchAction({
    type: 'pieToggleSelect',
    from: uid,
    name: name,
    seriesId: seriesModel.id
  });
  data.each(function (idx) {
    toggleItemSelected(data.getItemGraphicEl(idx), data.getItemLayout(idx), seriesModel.isSelected(data.getName(idx)), selectedOffset, hasAnimation);
  });
}
/**
 * @param {module:zrender/graphic/Sector} el
 * @param {Object} layout
 * @param {boolean} isSelected
 * @param {number} selectedOffset
 * @param {boolean} hasAnimation
 * @inner
 */


function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
  var midAngle = (layout.startAngle + layout.endAngle) / 2;
  var dx = Math.cos(midAngle);
  var dy = Math.sin(midAngle);
  var offset = isSelected ? selectedOffset : 0;
  var position = [dx * offset, dy * offset];
  hasAnimation // animateTo will stop revious animation like update transition
  ? el.animate().when(200, {
    position: position
  }).start('bounceOut') : el.attr('position', position);
}
/**
 * Piece of pie including Sector, Label, LabelLine
 * @constructor
 * @extends {module:zrender/graphic/Group}
 */


function PiePiece(data, idx) {
  graphic.Group.call(this);
  var sector = new graphic.Sector({
    z2: 2
  });
  var polyline = new graphic.Polyline();
  var text = new graphic.Text();
  this.add(sector);
  this.add(polyline);
  this.add(text);
  this.updateData(data, idx, true);
}

var piePieceProto = PiePiece.prototype;

piePieceProto.updateData = function (data, idx, firstCreate) {
  var sector = this.childAt(0);
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var sectorShape = zrUtil.extend({}, layout);
  sectorShape.label = null;
  var animationTypeUpdate = seriesModel.getShallow('animationTypeUpdate');

  if (firstCreate) {
    sector.setShape(sectorShape);
    var animationType = seriesModel.getShallow('animationType');

    if (animationType === 'scale') {
      sector.shape.r = layout.r0;
      graphic.initProps(sector, {
        shape: {
          r: layout.r
        }
      }, seriesModel, idx);
    } // Expansion
    else {
        sector.shape.endAngle = layout.startAngle;
        graphic.updateProps(sector, {
          shape: {
            endAngle: layout.endAngle
          }
        }, seriesModel, idx);
      }
  } else {
    if (animationTypeUpdate === 'expansion') {
      // Sectors are set to be target shape and an overlaying clipPath is used for animation
      sector.setShape(sectorShape);
    } else {
      // Transition animation from the old shape
      graphic.updateProps(sector, {
        shape: sectorShape
      }, seriesModel, idx);
    }
  } // Update common style


  var visualColor = data.getItemVisual(idx, 'color');
  sector.useStyle(zrUtil.defaults({
    lineJoin: 'bevel',
    fill: visualColor
  }, itemModel.getModel('itemStyle').getItemStyle()));
  sector.hoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && sector.attr('cursor', cursorStyle); // Toggle selected

  toggleItemSelected(this, data.getItemLayout(idx), seriesModel.isSelected(null, idx), seriesModel.get('selectedOffset'), seriesModel.get('animation')); // Label and text animation should be applied only for transition type animation when update

  var withAnimation = !firstCreate && animationTypeUpdate === 'transition';

  this._updateLabel(data, idx, withAnimation);

  this.highDownOnUpdate = itemModel.get('hoverAnimation') && seriesModel.isAnimationEnabled() ? function (fromState, toState) {
    if (toState === 'emphasis') {
      labelLine.ignore = labelLine.hoverIgnore;
      labelText.ignore = labelText.hoverIgnore; // Sector may has animation of updating data. Force to move to the last frame
      // Or it may stopped on the wrong shape

      sector.stopAnimation(true);
      sector.animateTo({
        shape: {
          r: layout.r + seriesModel.get('hoverOffset')
        }
      }, 300, 'elasticOut');
    } else {
      labelLine.ignore = labelLine.normalIgnore;
      labelText.ignore = labelText.normalIgnore;
      sector.stopAnimation(true);
      sector.animateTo({
        shape: {
          r: layout.r
        }
      }, 300, 'elasticOut');
    }
  } : null;
  graphic.setHoverStyle(this);
};

piePieceProto._updateLabel = function (data, idx, withAnimation) {
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var labelLayout = layout.label;
  var visualColor = data.getItemVisual(idx, 'color');

  if (!labelLayout || isNaN(labelLayout.x) || isNaN(labelLayout.y)) {
    labelText.ignore = labelText.normalIgnore = labelText.hoverIgnore = labelLine.ignore = labelLine.normalIgnore = labelLine.hoverIgnore = true;
    return;
  }

  var targetLineShape = {
    points: labelLayout.linePoints || [[labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]]
  };
  var targetTextStyle = {
    x: labelLayout.x,
    y: labelLayout.y
  };

  if (withAnimation) {
    graphic.updateProps(labelLine, {
      shape: targetLineShape
    }, seriesModel, idx);
    graphic.updateProps(labelText, {
      style: targetTextStyle
    }, seriesModel, idx);
  } else {
    labelLine.attr({
      shape: targetLineShape
    });
    labelText.attr({
      style: targetTextStyle
    });
  }

  labelText.attr({
    rotation: labelLayout.rotation,
    origin: [labelLayout.x, labelLayout.y],
    z2: 10
  });
  var labelModel = itemModel.getModel('label');
  var labelHoverModel = itemModel.getModel('emphasis.label');
  var labelLineModel = itemModel.getModel('labelLine');
  var labelLineHoverModel = itemModel.getModel('emphasis.labelLine');
  var visualColor = data.getItemVisual(idx, 'color');
  graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, labelHoverModel, {
    labelFetcher: data.hostModel,
    labelDataIndex: idx,
    defaultText: labelLayout.text,
    autoColor: visualColor,
    useInsideStyle: !!labelLayout.inside
  }, {
    textAlign: labelLayout.textAlign,
    textVerticalAlign: labelLayout.verticalAlign,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
  labelText.hoverIgnore = !labelHoverModel.get('show');
  labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
  labelLine.hoverIgnore = !labelLineHoverModel.get('show'); // Default use item visual color

  labelLine.setStyle({
    stroke: visualColor,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());
  labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();
  var smooth = labelLineModel.get('smooth');

  if (smooth && smooth === true) {
    smooth = 0.4;
  }

  labelLine.setShape({
    smooth: smooth
  });
};

zrUtil.inherits(PiePiece, graphic.Group); // Pie view

var PieView = ChartView.extend({
  type: 'pie',
  init: function () {
    var sectorGroup = new graphic.Group();
    this._sectorGroup = sectorGroup;
  },
  render: function (seriesModel, ecModel, api, payload) {
    if (payload && payload.from === this.uid) {
      return;
    }

    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var hasAnimation = ecModel.get('animation');
    var isFirstRender = !oldData;
    var animationType = seriesModel.get('animationType');
    var animationTypeUpdate = seriesModel.get('animationTypeUpdate');
    var onSectorClick = zrUtil.curry(updateDataSelected, this.uid, seriesModel, hasAnimation, api);
    var selectedMode = seriesModel.get('selectedMode');
    data.diff(oldData).add(function (idx) {
      var piePiece = new PiePiece(data, idx); // Default expansion animation

      if (isFirstRender && animationType !== 'scale') {
        piePiece.eachChild(function (child) {
          child.stopAnimation(true);
        });
      }

      selectedMode && piePiece.on('click', onSectorClick);
      data.setItemGraphicEl(idx, piePiece);
      group.add(piePiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);

      if (!isFirstRender && animationTypeUpdate !== 'transition') {
        piePiece.eachChild(function (child) {
          child.stopAnimation(true);
        });
      }

      piePiece.updateData(data, newIdx);
      piePiece.off('click');
      selectedMode && piePiece.on('click', onSectorClick);
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      group.remove(piePiece);
    }).execute();

    if (hasAnimation && data.count() > 0 && (isFirstRender ? animationType !== 'scale' : animationTypeUpdate !== 'transition')) {
      var shape = data.getItemLayout(0);

      for (var s = 1; isNaN(shape.startAngle) && s < data.count(); ++s) {
        shape = data.getItemLayout(s);
      }

      var r = Math.max(api.getWidth(), api.getHeight()) / 2;
      var removeClipPath = zrUtil.bind(group.removeClipPath, group);
      group.setClipPath(this._createClipPath(shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel, isFirstRender));
    } else {
      // clipPath is used in first-time animation, so remove it when otherwise. See: #8994
      group.removeClipPath();
    }

    this._data = data;
  },
  dispose: function () {},
  _createClipPath: function (cx, cy, r, startAngle, clockwise, cb, seriesModel, isFirstRender) {
    var clipPath = new graphic.Sector({
      shape: {
        cx: cx,
        cy: cy,
        r0: 0,
        r: r,
        startAngle: startAngle,
        endAngle: startAngle,
        clockwise: clockwise
      }
    });
    var initOrUpdate = isFirstRender ? graphic.initProps : graphic.updateProps;
    initOrUpdate(clipPath, {
      shape: {
        endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
      }
    }, seriesModel, cb);
    return clipPath;
  },

  /**
   * @implement
   */
  containPoint: function (point, seriesModel) {
    var data = seriesModel.getData();
    var itemLayout = data.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  }
});
var _default = PieView;
module.exports = _default;

/***/ }),

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

/***/ "292e":
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
var linearMap = _number.linearMap;

var layout = __webpack_require__("f934");

var labelLayout = __webpack_require__("bb70");

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
var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;

function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function _default(seriesType, ecModel, api, payload) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var viewRect = getViewRect(seriesModel, api);
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!zrUtil.isArray(radius)) {
      radius = [0, radius];
    }

    if (!zrUtil.isArray(center)) {
      center = [center, center];
    }

    var width = parsePercent(viewRect.width, api.getWidth());
    var height = parsePercent(viewRect.height, api.getHeight());
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width) + viewRect.x;
    var cy = parsePercent(center[1], height) + viewRect.y;
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var validDataCount = 0;
    data.each(valueDim, function (value) {
      !isNaN(value) && validDataCount++;
    });
    var sum = data.getSum(valueDim); // Sum may be 0

    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var clockwise = seriesModel.get('clockwise');
    var roseType = seriesModel.get('roseType');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum'); // [0...max]

    var extent = data.getDataExtent(valueDim);
    extent[0] = 0; // In the case some sector angle is smaller than minAngle

    var restAngle = PI2;
    var valueSumLargerThanMinAngle = 0;
    var currentAngle = startAngle;
    var dir = clockwise ? 1 : -1;
    data.each(valueDim, function (value, idx) {
      var angle;

      if (isNaN(value)) {
        data.setItemLayout(idx, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: r0,
          r: roseType ? NaN : r,
          viewRect: viewRect
        });
        return;
      } // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？


      if (roseType !== 'area') {
        angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
      } else {
        angle = PI2 / validDataCount;
      }

      if (angle < minAngle) {
        angle = minAngle;
        restAngle -= minAngle;
      } else {
        valueSumLargerThanMinAngle += value;
      }

      var endAngle = currentAngle + dir * angle;
      data.setItemLayout(idx, {
        angle: angle,
        startAngle: currentAngle,
        endAngle: endAngle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: r0,
        r: roseType ? linearMap(value, extent, [r0, r]) : r,
        viewRect: viewRect
      });
      currentAngle = endAngle;
    }); // Some sector is constrained by minAngle
    // Rest sectors needs recalculate angle

    if (restAngle < PI2 && validDataCount) {
      // Average the angle if rest angle is not enough after all angles is
      // Constrained by minAngle
      if (restAngle <= 1e-3) {
        var angle = PI2 / validDataCount;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            layout.angle = angle;
            layout.startAngle = startAngle + dir * idx * angle;
            layout.endAngle = startAngle + dir * (idx + 1) * angle;
          }
        });
      } else {
        unitRadian = restAngle / valueSumLargerThanMinAngle;
        currentAngle = startAngle;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            var angle = layout.angle === minAngle ? minAngle : value * unitRadian;
            layout.startAngle = currentAngle;
            layout.endAngle = currentAngle + dir * angle;
            currentAngle += dir * angle;
          }
        });
      }
    }

    labelLayout(seriesModel, r, viewRect.width, viewRect.height, viewRect.x, viewRect.y);
  });
}

module.exports = _default;

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

/***/ "4411":
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

/***/ "4e10":
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

var createListSimply = __webpack_require__("e46b");

var SeriesModel = __webpack_require__("4f85");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;
var addCommas = _format.addCommas;

var dataSelectableMixin = __webpack_require__("7023");

var _dataProvider = __webpack_require__("2b17");

var retrieveRawAttr = _dataProvider.retrieveRawAttr;

var geoSourceManager = __webpack_require__("5b87");

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForNameBased = _sourceHelper.makeSeriesEncodeForNameBased;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var MapSeries = SeriesModel.extend({
  type: 'series.map',
  dependencies: ['geo'],
  layoutMode: 'box',

  /**
   * Only first map series of same mapType will drawMap
   * @type {boolean}
   */
  needsDrawMap: false,

  /**
   * Group of all map series with same mapType
   * @type {boolean}
   */
  seriesGroup: [],
  getInitialData: function (option) {
    var data = createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
    var valueDim = data.mapDimension('value');
    var dataNameMap = zrUtil.createHashMap();
    var selectTargetList = [];
    var toAppendNames = [];

    for (var i = 0, len = data.count(); i < len; i++) {
      var name = data.getName(i);
      dataNameMap.set(name, true);
      selectTargetList.push({
        name: name,
        value: data.get(valueDim, i),
        selected: retrieveRawAttr(data, i, 'selected')
      });
    }

    var geoSource = geoSourceManager.load(this.getMapType(), this.option.nameMap);
    zrUtil.each(geoSource.regions, function (region) {
      var name = region.name;

      if (!dataNameMap.get(name)) {
        selectTargetList.push({
          name: name
        });
        toAppendNames.push(name);
      }
    });
    this.updateSelectedMap(selectTargetList); // Complete data with missing regions. The consequent processes (like visual
    // map and render) can not be performed without a "full data". For example,
    // find `dataIndex` by name.

    data.appendValues([], toAppendNames);
    return data;
  },

  /**
   * If no host geo model, return null, which means using a
   * inner exclusive geo model.
   */
  getHostGeoModel: function () {
    var geoIndex = this.option.geoIndex;
    return geoIndex != null ? this.dependentModels.geo[geoIndex] : null;
  },
  getMapType: function () {
    return (this.getHostGeoModel() || this).option.map;
  },
  // _fillOption: function (option, mapName) {
  // Shallow clone
  // option = zrUtil.extend({}, option);
  // option.data = geoCreator.getFilledRegions(option.data, mapName, option.nameMap);
  // return option;
  // },
  getRawValue: function (dataIndex) {
    // Use value stored in data instead because it is calculated from multiple series
    // FIXME Provide all value of multiple series ?
    var data = this.getData();
    return data.get(data.mapDimension('value'), dataIndex);
  },

  /**
   * Get model of region
   * @param  {string} name
   * @return {module:echarts/model/Model}
   */
  getRegionModel: function (regionName) {
    var data = this.getData();
    return data.getItemModel(data.indexOfName(regionName));
  },

  /**
   * Map tooltip formatter
   *
   * @param {number} dataIndex
   */
  formatTooltip: function (dataIndex) {
    // FIXME orignalData and data is a bit confusing
    var data = this.getData();
    var formattedValue = addCommas(this.getRawValue(dataIndex));
    var name = data.getName(dataIndex);
    var seriesGroup = this.seriesGroup;
    var seriesNames = [];

    for (var i = 0; i < seriesGroup.length; i++) {
      var otherIndex = seriesGroup[i].originalData.indexOfName(name);
      var valueDim = data.mapDimension('value');

      if (!isNaN(seriesGroup[i].originalData.get(valueDim, otherIndex))) {
        seriesNames.push(encodeHTML(seriesGroup[i].name));
      }
    }

    return seriesNames.join(', ') + '<br />' + encodeHTML(name + ' : ' + formattedValue);
  },

  /**
   * @implement
   */
  getTooltipPosition: function (dataIndex) {
    if (dataIndex != null) {
      var name = this.getData().getName(dataIndex);
      var geo = this.coordinateSystem;
      var region = geo.getRegion(name);
      return region && geo.dataToPoint(region.center);
    }
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  },
  defaultOption: {
    // 一级层叠
    zlevel: 0,
    // 二级层叠
    z: 2,
    coordinateSystem: 'geo',
    // map should be explicitly specified since ec3.
    map: '',
    // If `geoIndex` is not specified, a exclusive geo will be
    // created. Otherwise use the specified geo component, and
    // `map` and `mapType` are ignored.
    // geoIndex: 0,
    // 'center' | 'left' | 'right' | 'x%' | {number}
    left: 'center',
    // 'center' | 'top' | 'bottom' | 'x%' | {number}
    top: 'center',
    // right
    // bottom
    // width:
    // height
    // Aspect is width / height. Inited to be geoJson bbox aspect
    // This parameter is used for scale this aspect
    aspectScale: 0.75,
    ///// Layout with center and size
    // If you wan't to put map in a fixed size box with right aspect ratio
    // This two properties may more conveninet
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    // 数值合并方式，默认加和，可选为：
    // 'sum' | 'average' | 'max' | 'min'
    // mapValueCalculation: 'sum',
    // 地图数值计算结果小数精度
    // mapValuePrecision: 0,
    // 显示图例颜色标识（系列标识的小圆点），图例开启时有效
    showLegendSymbol: true,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    dataRangeHoverLink: true,
    // 是否开启缩放及漫游模式
    // roam: false,
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ],
    // higher priority than center and zoom
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    label: {
      show: false,
      color: '#000'
    },
    // scaleLimit: null,
    itemStyle: {
      borderWidth: 0.5,
      borderColor: '#444',
      areaColor: '#eee'
    },
    emphasis: {
      label: {
        show: true,
        color: 'rgb(100,0,0)'
      },
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)'
      }
    }
  }
});
zrUtil.mixin(MapSeries, dataSelectableMixin);
var _default = MapSeries;
module.exports = _default;

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

/***/ "54fb":
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
  ecModel.eachSeriesByType('map', function (seriesModel) {
    var colorList = seriesModel.get('color');
    var itemStyleModel = seriesModel.getModel('itemStyle');
    var areaColor = itemStyleModel.get('areaColor');
    var color = itemStyleModel.get('color') || colorList[seriesModel.seriesIndex % colorList.length];
    seriesModel.getData().setVisual({
      'areaColor': areaColor,
      'color': color
    });
  });
}

module.exports = _default;

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

/***/ "60d7":
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

var ChartView = __webpack_require__("e887");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var DEFAULT_SMOOTH = 0.3;
var ParallelView = ChartView.extend({
  type: 'parallel',
  init: function () {
    /**
     * @type {module:zrender/container/Group}
     * @private
     */
    this._dataGroup = new graphic.Group();
    this.group.add(this._dataGroup);
    /**
     * @type {module:echarts/data/List}
     */

    this._data;
    /**
     * @type {boolean}
     */

    this._initialized;
  },

  /**
   * @override
   */
  render: function (seriesModel, ecModel, api, payload) {
    var dataGroup = this._dataGroup;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coordSys = seriesModel.coordinateSystem;
    var dimensions = coordSys.dimensions;
    var seriesScope = makeSeriesScope(seriesModel);
    data.diff(oldData).add(add).update(update).remove(remove).execute();

    function add(newDataIndex) {
      var line = addEl(data, dataGroup, newDataIndex, dimensions, coordSys);
      updateElCommon(line, data, newDataIndex, seriesScope);
    }

    function update(newDataIndex, oldDataIndex) {
      var line = oldData.getItemGraphicEl(oldDataIndex);
      var points = createLinePoints(data, newDataIndex, dimensions, coordSys);
      data.setItemGraphicEl(newDataIndex, line);
      var animationModel = payload && payload.animation === false ? null : seriesModel;
      graphic.updateProps(line, {
        shape: {
          points: points
        }
      }, animationModel, newDataIndex);
      updateElCommon(line, data, newDataIndex, seriesScope);
    }

    function remove(oldDataIndex) {
      var line = oldData.getItemGraphicEl(oldDataIndex);
      dataGroup.remove(line);
    } // First create


    if (!this._initialized) {
      this._initialized = true;
      var clipPath = createGridClipShape(coordSys, seriesModel, function () {
        // Callback will be invoked immediately if there is no animation
        setTimeout(function () {
          dataGroup.removeClipPath();
        });
      });
      dataGroup.setClipPath(clipPath);
    }

    this._data = data;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this._initialized = true;
    this._data = null;

    this._dataGroup.removeAll();
  },
  incrementalRender: function (taskParams, seriesModel, ecModel) {
    var data = seriesModel.getData();
    var coordSys = seriesModel.coordinateSystem;
    var dimensions = coordSys.dimensions;
    var seriesScope = makeSeriesScope(seriesModel);

    for (var dataIndex = taskParams.start; dataIndex < taskParams.end; dataIndex++) {
      var line = addEl(data, this._dataGroup, dataIndex, dimensions, coordSys);
      line.incremental = true;
      updateElCommon(line, data, dataIndex, seriesScope);
    }
  },
  dispose: function () {},
  // _renderForProgressive: function (seriesModel) {
  //     var dataGroup = this._dataGroup;
  //     var data = seriesModel.getData();
  //     var oldData = this._data;
  //     var coordSys = seriesModel.coordinateSystem;
  //     var dimensions = coordSys.dimensions;
  //     var option = seriesModel.option;
  //     var progressive = option.progressive;
  //     var smooth = option.smooth ? SMOOTH : null;
  //     // In progressive animation is disabled, so use simple data diff,
  //     // which effects performance less.
  //     // (Typically performance for data with length 7000+ like:
  //     // simpleDiff: 60ms, addEl: 184ms,
  //     // in RMBP 2.4GHz intel i7, OSX 10.9 chrome 50.0.2661.102 (64-bit))
  //     if (simpleDiff(oldData, data, dimensions)) {
  //         dataGroup.removeAll();
  //         data.each(function (dataIndex) {
  //             addEl(data, dataGroup, dataIndex, dimensions, coordSys);
  //         });
  //     }
  //     updateElCommon(data, progressive, smooth);
  //     // Consider switch between progressive and not.
  //     data.__plProgressive = true;
  //     this._data = data;
  // },

  /**
   * @override
   */
  remove: function () {
    this._dataGroup && this._dataGroup.removeAll();
    this._data = null;
  }
});

function createGridClipShape(coordSys, seriesModel, cb) {
  var parallelModel = coordSys.model;
  var rect = coordSys.getRect();
  var rectEl = new graphic.Rect({
    shape: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    }
  });
  var dim = parallelModel.get('layout') === 'horizontal' ? 'width' : 'height';
  rectEl.setShape(dim, 0);
  graphic.initProps(rectEl, {
    shape: {
      width: rect.width,
      height: rect.height
    }
  }, seriesModel, cb);
  return rectEl;
}

function createLinePoints(data, dataIndex, dimensions, coordSys) {
  var points = [];

  for (var i = 0; i < dimensions.length; i++) {
    var dimName = dimensions[i];
    var value = data.get(data.mapDimension(dimName), dataIndex);

    if (!isEmptyValue(value, coordSys.getAxis(dimName).type)) {
      points.push(coordSys.dataToPoint(value, dimName));
    }
  }

  return points;
}

function addEl(data, dataGroup, dataIndex, dimensions, coordSys) {
  var points = createLinePoints(data, dataIndex, dimensions, coordSys);
  var line = new graphic.Polyline({
    shape: {
      points: points
    },
    silent: true,
    z2: 10
  });
  dataGroup.add(line);
  data.setItemGraphicEl(dataIndex, line);
  return line;
}

function makeSeriesScope(seriesModel) {
  var smooth = seriesModel.get('smooth', true);
  smooth === true && (smooth = DEFAULT_SMOOTH);
  return {
    lineStyle: seriesModel.getModel('lineStyle').getLineStyle(),
    smooth: smooth != null ? smooth : DEFAULT_SMOOTH
  };
}

function updateElCommon(el, data, dataIndex, seriesScope) {
  var lineStyle = seriesScope.lineStyle;

  if (data.hasItemOption) {
    var lineStyleModel = data.getItemModel(dataIndex).getModel('lineStyle');
    lineStyle = lineStyleModel.getLineStyle();
  }

  el.useStyle(lineStyle);
  var elStyle = el.style;
  elStyle.fill = null; // lineStyle.color have been set to itemVisual in module:echarts/visual/seriesColor.

  elStyle.stroke = data.getItemVisual(dataIndex, 'color'); // lineStyle.opacity have been set to itemVisual in parallelVisual.

  elStyle.opacity = data.getItemVisual(dataIndex, 'opacity');
  seriesScope.smooth && (el.shape.smooth = seriesScope.smooth);
} // function simpleDiff(oldData, newData, dimensions) {
//     var oldLen;
//     if (!oldData
//         || !oldData.__plProgressive
//         || (oldLen = oldData.count()) !== newData.count()
//     ) {
//         return true;
//     }
//     var dimLen = dimensions.length;
//     for (var i = 0; i < oldLen; i++) {
//         for (var j = 0; j < dimLen; j++) {
//             if (oldData.get(dimensions[j], i) !== newData.get(dimensions[j], i)) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// FIXME
// 公用方法?


function isEmptyValue(val, axisType) {
  return axisType === 'category' ? val == null : val == null || isNaN(val); // axisType === 'value'
}

var _default = ParallelView;
module.exports = _default;

/***/ }),

/***/ "675c":
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

__webpack_require__("4e10");

__webpack_require__("a666");

__webpack_require__("49e8");

__webpack_require__("eeea");

var mapSymbolLayout = __webpack_require__("cee1");

var mapVisual = __webpack_require__("54fb");

var mapDataStatistic = __webpack_require__("f6ed");

var backwardCompat = __webpack_require__("9442");

var createDataSelectAction = __webpack_require__("7782");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerLayout(mapSymbolLayout);
echarts.registerVisual(mapVisual);
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, mapDataStatistic);
echarts.registerPreprocessor(backwardCompat);
createDataSelectAction('map', [{
  type: 'mapToggleSelect',
  event: 'mapselectchanged',
  method: 'toggleSelected'
}, {
  type: 'mapSelect',
  event: 'mapselected',
  method: 'select'
}, {
  type: 'mapUnSelect',
  event: 'mapunselected',
  method: 'unSelect'
}]);

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

/***/ "7891":
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
// Backward compat for radar chart in 2
function _default(option) {
  var polarOptArr = option.polar;

  if (polarOptArr) {
    if (!zrUtil.isArray(polarOptArr)) {
      polarOptArr = [polarOptArr];
    }

    var polarNotRadar = [];
    zrUtil.each(polarOptArr, function (polarOpt, idx) {
      if (polarOpt.indicator) {
        if (polarOpt.type && !polarOpt.shape) {
          polarOpt.shape = polarOpt.type;
        }

        option.radar = option.radar || [];

        if (!zrUtil.isArray(option.radar)) {
          option.radar = [option.radar];
        }

        option.radar.push(polarOpt);
      } else {
        polarNotRadar.push(polarOpt);
      }
    });
    option.polar = polarNotRadar;
  }

  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'radar' && seriesOpt.polarIndex) {
      seriesOpt.radarIndex = seriesOpt.polarIndex;
    }
  });
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

/***/ "870e":
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
function _default(ecModel) {
  ecModel.eachSeriesByType('radar', function (seriesModel) {
    var data = seriesModel.getData();
    var points = [];
    var coordSys = seriesModel.coordinateSystem;

    if (!coordSys) {
      return;
    }

    var axes = coordSys.getIndicatorAxes();
    zrUtil.each(axes, function (axis, axisIndex) {
      data.each(data.mapDimension(axes[axisIndex].dim), function (val, dataIndex) {
        points[dataIndex] = points[dataIndex] || [];
        var point = coordSys.dataToPoint(val, axisIndex);
        points[dataIndex][axisIndex] = isValidPoint(point) ? point : getValueMissingPoint(coordSys);
      });
    }); // Close polygon

    data.each(function (idx) {
      // TODO
      // Is it appropriate to connect to the next data when some data is missing?
      // Or, should trade it like `connectNull` in line chart?
      var firstPoint = zrUtil.find(points[idx], function (point) {
        return isValidPoint(point);
      }) || getValueMissingPoint(coordSys); // Copy the first actual point to the end of the array

      points[idx].push(firstPoint.slice());
      data.setItemLayout(idx, points[idx]);
    });
  });
}

function isValidPoint(point) {
  return !isNaN(point[0]) && !isNaN(point[1]);
}

function getValueMissingPoint(coordSys) {
  // It is error-prone to input [NaN, NaN] into polygon, polygon.
  // (probably cause problem when refreshing or animating)
  return [coordSys.cx, coordSys.cy];
}

module.exports = _default;

/***/ }),

/***/ "8deb":
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

__webpack_require__("5522");

__webpack_require__("a016");

__webpack_require__("1466");

var dataColor = __webpack_require__("98e7");

var visualSymbol = __webpack_require__("7f96");

var radarLayout = __webpack_require__("870e");

var dataFilter = __webpack_require__("d3f4");

var backwardCompat = __webpack_require__("7891");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Must use radar component
echarts.registerVisual(dataColor('radar'));
echarts.registerVisual(visualSymbol('radar', 'circle'));
echarts.registerLayout(radarLayout);
echarts.registerProcessor(dataFilter('radar'));
echarts.registerPreprocessor(backwardCompat);

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

/***/ "9442":
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
function _default(option) {
  // Save geoCoord
  var mapSeries = [];
  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'map') {
      mapSeries.push(seriesOpt);
      seriesOpt.map = seriesOpt.map || seriesOpt.mapType; // Put x, y, width, height, x2, y2 in the top level

      zrUtil.defaults(seriesOpt, seriesOpt.mapLocation);
    }
  });
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

/***/ "a016":
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

var createListSimply = __webpack_require__("e46b");

var zrUtil = __webpack_require__("6d8b");

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
var RadarSeries = SeriesModel.extend({
  type: 'series.radar',
  dependencies: ['radar'],
  // Overwrite
  init: function (option) {
    RadarSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, {
      generateCoord: 'indicator_',
      generateCoordCount: Infinity
    });
  },
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var coordSys = this.coordinateSystem;
    var indicatorAxes = coordSys.getIndicatorAxes();
    var name = this.getData().getName(dataIndex);
    return encodeHTML(name === '' ? this.name : name) + '<br/>' + zrUtil.map(indicatorAxes, function (axis, idx) {
      var val = data.get(data.mapDimension(axis.dim), dataIndex);
      return encodeHTML(axis.name + ' : ' + val);
    }).join('<br />');
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'radar',
    legendHoverLink: true,
    radarIndex: 0,
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    label: {
      position: 'top'
    },
    // areaStyle: {
    // },
    // itemStyle: {}
    symbol: 'emptyCircle',
    symbolSize: 4 // symbolRotate: null

  }
});
var _default = RadarSeries;
module.exports = _default;

/***/ }),

/***/ "a666":
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

var MapDraw = __webpack_require__("0c41");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var HIGH_DOWN_PROP = '__seriesMapHighDown';
var RECORD_VERSION_PROP = '__seriesMapCallKey';

var _default = echarts.extendChartView({
  type: 'map',
  render: function (mapModel, ecModel, api, payload) {
    // Not render if it is an toggleSelect action from self
    if (payload && payload.type === 'mapToggleSelect' && payload.from === this.uid) {
      return;
    }

    var group = this.group;
    group.removeAll();

    if (mapModel.getHostGeoModel()) {
      return;
    } // Not update map if it is an roam action from self


    if (!(payload && payload.type === 'geoRoam' && payload.componentType === 'series' && payload.seriesId === mapModel.id)) {
      if (mapModel.needsDrawMap) {
        var mapDraw = this._mapDraw || new MapDraw(api, true);
        group.add(mapDraw.group);
        mapDraw.draw(mapModel, ecModel, api, this, payload);
        this._mapDraw = mapDraw;
      } else {
        // Remove drawed map
        this._mapDraw && this._mapDraw.remove();
        this._mapDraw = null;
      }
    } else {
      var mapDraw = this._mapDraw;
      mapDraw && group.add(mapDraw.group);
    }

    mapModel.get('showLegendSymbol') && ecModel.getComponent('legend') && this._renderSymbols(mapModel, ecModel, api);
  },
  remove: function () {
    this._mapDraw && this._mapDraw.remove();
    this._mapDraw = null;
    this.group.removeAll();
  },
  dispose: function () {
    this._mapDraw && this._mapDraw.remove();
    this._mapDraw = null;
  },
  _renderSymbols: function (mapModel, ecModel, api) {
    var originalData = mapModel.originalData;
    var group = this.group;
    originalData.each(originalData.mapDimension('value'), function (value, originalDataIndex) {
      if (isNaN(value)) {
        return;
      }

      var layout = originalData.getItemLayout(originalDataIndex);

      if (!layout || !layout.point) {
        // Not exists in map
        return;
      }

      var point = layout.point;
      var offset = layout.offset;
      var circle = new graphic.Circle({
        style: {
          // Because the special of map draw.
          // Which needs statistic of multiple series and draw on one map.
          // And each series also need a symbol with legend color
          //
          // Layout and visual are put one the different data
          fill: mapModel.getData().getVisual('color')
        },
        shape: {
          cx: point[0] + offset * 9,
          cy: point[1],
          r: 3
        },
        silent: true,
        // Do not overlap the first series, on which labels are displayed.
        z2: 8 + (!offset ? graphic.Z2_EMPHASIS_LIFT + 1 : 0)
      }); // Only the series that has the first value on the same region is in charge of rendering the label.
      // But consider the case:
      // series: [
      //     {id: 'X', type: 'map', map: 'm', {data: [{name: 'A', value: 11}, {name: 'B', {value: 22}]},
      //     {id: 'Y', type: 'map', map: 'm', {data: [{name: 'A', value: 21}, {name: 'C', {value: 33}]}
      // ]
      // The offset `0` of item `A` is at series `X`, but of item `C` is at series `Y`.
      // For backward compatibility, we follow the rule that render label `A` by the
      // settings on series `X` but render label `C` by the settings on series `Y`.

      if (!offset) {
        var fullData = mapModel.mainSeries.getData();
        var name = originalData.getName(originalDataIndex);
        var fullIndex = fullData.indexOfName(name);
        var itemModel = originalData.getItemModel(originalDataIndex);
        var labelModel = itemModel.getModel('label');
        var hoverLabelModel = itemModel.getModel('emphasis.label');
        var regionGroup = fullData.getItemGraphicEl(fullIndex); // `getFormattedLabel` needs to use `getData` inside. Here
        // `mapModel.getData()` is shallow cloned from `mainSeries.getData()`.
        // FIXME
        // If this is not the `mainSeries`, the item model (like label formatter)
        // set on original data item will never get. But it has been working
        // like that from the begining, and this scenario is rarely encountered.
        // So it won't be fixed until have to.

        var normalText = zrUtil.retrieve2(mapModel.getFormattedLabel(fullIndex, 'normal'), name);
        var emphasisText = zrUtil.retrieve2(mapModel.getFormattedLabel(fullIndex, 'emphasis'), normalText);
        var highDownRecord = regionGroup[HIGH_DOWN_PROP];
        var recordVersion = Math.random(); // Prevent from register listeners duplicatedly when roaming.

        if (!highDownRecord) {
          highDownRecord = regionGroup[HIGH_DOWN_PROP] = {};
          var onEmphasis = zrUtil.curry(onRegionHighDown, true);
          var onNormal = zrUtil.curry(onRegionHighDown, false);
          regionGroup.on('mouseover', onEmphasis).on('mouseout', onNormal).on('emphasis', onEmphasis).on('normal', onNormal);
        } // Prevent removed regions effect current grapics.


        regionGroup[RECORD_VERSION_PROP] = recordVersion;
        zrUtil.extend(highDownRecord, {
          recordVersion: recordVersion,
          circle: circle,
          labelModel: labelModel,
          hoverLabelModel: hoverLabelModel,
          emphasisText: emphasisText,
          normalText: normalText
        }); // FIXME
        // Consider set option when emphasis.

        enterRegionHighDown(highDownRecord, false);
      }

      group.add(circle);
    });
  }
});

function onRegionHighDown(toHighOrDown) {
  var highDownRecord = this[HIGH_DOWN_PROP];

  if (highDownRecord && highDownRecord.recordVersion === this[RECORD_VERSION_PROP]) {
    enterRegionHighDown(highDownRecord, toHighOrDown);
  }
}

function enterRegionHighDown(highDownRecord, toHighOrDown) {
  var circle = highDownRecord.circle;
  var labelModel = highDownRecord.labelModel;
  var hoverLabelModel = highDownRecord.hoverLabelModel;
  var emphasisText = highDownRecord.emphasisText;
  var normalText = highDownRecord.normalText;

  if (toHighOrDown) {
    circle.style.extendFrom(graphic.setTextStyle({}, hoverLabelModel, {
      text: hoverLabelModel.get('show') ? emphasisText : null
    }, {
      isRectText: true,
      useInsideStyle: false
    }, true)); // Make label upper than others if overlaps.

    circle.__mapOriginalZ2 = circle.z2;
    circle.z2 += graphic.Z2_EMPHASIS_LIFT;
  } else {
    graphic.setTextStyle(circle.style, labelModel, {
      text: labelModel.get('show') ? normalText : null,
      textPosition: labelModel.getShallow('position') || 'bottom'
    }, {
      isRectText: true,
      useInsideStyle: false
    }); // Trigger normalize style like padding.

    circle.dirty(false);

    if (circle.__mapOriginalZ2 != null) {
      circle.z2 = circle.__mapOriginalZ2;
      circle.__mapOriginalZ2 = null;
    }
  }
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

/***/ "aadf":
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

__webpack_require__("5aa9");

__webpack_require__("d6d9");

__webpack_require__("3329");

var _barGrid = __webpack_require__("9d57");

var layout = _barGrid.layout;

var visualSymbol = __webpack_require__("7f96");

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
// In case developer forget to include grid component
echarts.registerLayout(zrUtil.curry(layout, 'pictorialBar'));
echarts.registerVisual(visualSymbol('pictorialBar', 'roundRect'));

/***/ }),

/***/ "ab71":
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
var opacityAccessPath = ['lineStyle', 'normal', 'opacity'];
var _default = {
  seriesType: 'parallel',
  reset: function (seriesModel, ecModel, api) {
    var itemStyleModel = seriesModel.getModel('itemStyle');
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var globalColors = ecModel.get('color');
    var color = lineStyleModel.get('color') || itemStyleModel.get('color') || globalColors[seriesModel.seriesIndex % globalColors.length];
    var inactiveOpacity = seriesModel.get('inactiveOpacity');
    var activeOpacity = seriesModel.get('activeOpacity');
    var lineStyle = seriesModel.getModel('lineStyle').getLineStyle();
    var coordSys = seriesModel.coordinateSystem;
    var data = seriesModel.getData();
    var opacityMap = {
      normal: lineStyle.opacity,
      active: activeOpacity,
      inactive: inactiveOpacity
    };
    data.setVisual('color', color);

    function progress(params, data) {
      coordSys.eachActiveState(data, function (activeState, dataIndex) {
        var opacity = opacityMap[activeState];

        if (activeState === 'normal' && data.hasItemOption) {
          var itemOpacity = data.getItemModel(dataIndex).get(opacityAccessPath, true);
          itemOpacity != null && (opacity = itemOpacity);
        }

        data.setItemVisual(dataIndex, 'opacity', opacity);
      }, params.start, params.end);
    }

    return {
      progress: progress
    };
  }
};
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

/***/ "bb70":
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

var textContain = __webpack_require__("e86a");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME emphasis label position is not same with normal label position
var RADIAN = Math.PI / 180;

function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight, viewLeft, viewTop, farthestX) {
  list.sort(function (a, b) {
    return a.y - b.y;
  });

  function shiftDown(start, end, delta, dir) {
    for (var j = start; j < end; j++) {
      if (list[j].y + delta > viewTop + viewHeight) {
        break;
      }

      list[j].y += delta;

      if (j > start && j + 1 < end && list[j + 1].y > list[j].y + list[j].height) {
        shiftUp(j, delta / 2);
        return;
      }
    }

    shiftUp(end - 1, delta / 2);
  }

  function shiftUp(end, delta) {
    for (var j = end; j >= 0; j--) {
      if (list[j].y - delta < viewTop) {
        break;
      }

      list[j].y -= delta;

      if (j > 0 && list[j].y > list[j - 1].y + list[j - 1].height) {
        break;
      }
    }
  }

  function changeX(list, isDownList, cx, cy, r, dir) {
    var lastDeltaX = dir > 0 ? isDownList // right-side
    ? Number.MAX_VALUE // down
    : 0 // up
    : isDownList // left-side
    ? Number.MAX_VALUE // down
    : 0; // up

    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].labelAlignTo !== 'none') {
        continue;
      }

      var deltaY = Math.abs(list[i].y - cy);
      var length = list[i].len;
      var length2 = list[i].len2;
      var deltaX = deltaY < r + length ? Math.sqrt((r + length + length2) * (r + length + length2) - deltaY * deltaY) : Math.abs(list[i].x - cx);

      if (isDownList && deltaX >= lastDeltaX) {
        // right-down, left-down
        deltaX = lastDeltaX - 10;
      }

      if (!isDownList && deltaX <= lastDeltaX) {
        // right-up, left-up
        deltaX = lastDeltaX + 10;
      }

      list[i].x = cx + deltaX * dir;
      lastDeltaX = deltaX;
    }
  }

  var lastY = 0;
  var delta;
  var len = list.length;
  var upList = [];
  var downList = [];

  for (var i = 0; i < len; i++) {
    if (list[i].position === 'outer' && list[i].labelAlignTo === 'labelLine') {
      var dx = list[i].x - farthestX;
      list[i].linePoints[1][0] += dx;
      list[i].x = farthestX;
    }

    delta = list[i].y - lastY;

    if (delta < 0) {
      shiftDown(i, len, -delta, dir);
    }

    lastY = list[i].y + list[i].height;
  }

  if (viewHeight - lastY < 0) {
    shiftUp(len - 1, lastY - viewHeight);
  }

  for (var i = 0; i < len; i++) {
    if (list[i].y >= cy) {
      downList.push(list[i]);
    } else {
      upList.push(list[i]);
    }
  }

  changeX(upList, false, cx, cy, r, dir);
  changeX(downList, true, cx, cy, r, dir);
}

function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var leftList = [];
  var rightList = [];
  var leftmostX = Number.MAX_VALUE;
  var rightmostX = -Number.MAX_VALUE;

  for (var i = 0; i < labelLayoutList.length; i++) {
    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }

    if (labelLayoutList[i].x < cx) {
      leftmostX = Math.min(leftmostX, labelLayoutList[i].x);
      leftList.push(labelLayoutList[i]);
    } else {
      rightmostX = Math.max(rightmostX, labelLayoutList[i].x);
      rightList.push(labelLayoutList[i]);
    }
  }

  adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight, viewLeft, viewTop, rightmostX);
  adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight, viewLeft, viewTop, leftmostX);

  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout = labelLayoutList[i];

    if (isPositionCenter(layout)) {
      continue;
    }

    var linePoints = layout.linePoints;

    if (linePoints) {
      var isAlignToEdge = layout.labelAlignTo === 'edge';
      var realTextWidth = layout.textRect.width;
      var targetTextWidth;

      if (isAlignToEdge) {
        if (layout.x < cx) {
          targetTextWidth = linePoints[2][0] - layout.labelDistance - viewLeft - layout.labelMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout.labelMargin - linePoints[2][0] - layout.labelDistance;
        }
      } else {
        if (layout.x < cx) {
          targetTextWidth = layout.x - viewLeft - layout.bleedMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout.x - layout.bleedMargin;
        }
      }

      if (targetTextWidth < layout.textRect.width) {
        layout.text = textContain.truncateText(layout.text, targetTextWidth, layout.font);

        if (layout.labelAlignTo === 'edge') {
          realTextWidth = textContain.getWidth(layout.text, layout.font);
        }
      }

      var dist = linePoints[1][0] - linePoints[2][0];

      if (isAlignToEdge) {
        if (layout.x < cx) {
          linePoints[2][0] = viewLeft + layout.labelMargin + realTextWidth + layout.labelDistance;
        } else {
          linePoints[2][0] = viewLeft + viewWidth - layout.labelMargin - realTextWidth - layout.labelDistance;
        }
      } else {
        if (layout.x < cx) {
          linePoints[2][0] = layout.x + layout.labelDistance;
        } else {
          linePoints[2][0] = layout.x - layout.labelDistance;
        }

        linePoints[1][0] = linePoints[2][0] + dist;
      }

      linePoints[1][1] = linePoints[2][1] = layout.y;
    }
  }
}

function isPositionCenter(layout) {
  // Not change x for center label
  return layout.position === 'center';
}

function _default(seriesModel, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var data = seriesModel.getData();
  var labelLayoutList = [];
  var cx;
  var cy;
  var hasLabelRotate = false;
  var minShowLabelRadian = (seriesModel.get('minShowLabelAngle') || 0) * RADIAN;
  data.each(function (idx) {
    var layout = data.getItemLayout(idx);
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel('label'); // Use position in normal or emphasis

    var labelPosition = labelModel.get('position') || itemModel.get('emphasis.label.position');
    var labelDistance = labelModel.get('distanceToLabelLine');
    var labelAlignTo = labelModel.get('alignTo');
    var labelMargin = parsePercent(labelModel.get('margin'), viewWidth);
    var bleedMargin = labelModel.get('bleedMargin');
    var font = labelModel.getFont();
    var labelLineModel = itemModel.getModel('labelLine');
    var labelLineLen = labelLineModel.get('length');
    labelLineLen = parsePercent(labelLineLen, viewWidth);
    var labelLineLen2 = labelLineModel.get('length2');
    labelLineLen2 = parsePercent(labelLineLen2, viewWidth);

    if (layout.angle < minShowLabelRadian) {
      return;
    }

    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var dx = Math.cos(midAngle);
    var dy = Math.sin(midAngle);
    var textX;
    var textY;
    var linePoints;
    var textAlign;
    cx = layout.cx;
    cy = layout.cy;
    var text = seriesModel.getFormattedLabel(idx, 'normal') || data.getName(idx);
    var textRect = textContain.getBoundingRect(text, font, textAlign, 'top');
    var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';

    if (labelPosition === 'center') {
      textX = layout.cx;
      textY = layout.cy;
      textAlign = 'center';
    } else {
      var x1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dx : layout.r * dx) + cx;
      var y1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dy : layout.r * dy) + cy;
      textX = x1 + dx * 3;
      textY = y1 + dy * 3;

      if (!isLabelInside) {
        // For roseType
        var x2 = x1 + dx * (labelLineLen + r - layout.r);
        var y2 = y1 + dy * (labelLineLen + r - layout.r);
        var x3 = x2 + (dx < 0 ? -1 : 1) * labelLineLen2;
        var y3 = y2;

        if (labelAlignTo === 'edge') {
          // Adjust textX because text align of edge is opposite
          textX = dx < 0 ? viewLeft + labelMargin : viewLeft + viewWidth - labelMargin;
        } else {
          textX = x3 + (dx < 0 ? -labelDistance : labelDistance);
        }

        textY = y3;
        linePoints = [[x1, y1], [x2, y2], [x3, y3]];
      }

      textAlign = isLabelInside ? 'center' : labelAlignTo === 'edge' ? dx > 0 ? 'right' : 'left' : dx > 0 ? 'left' : 'right';
    }

    var labelRotate;
    var rotate = labelModel.get('rotate');

    if (typeof rotate === 'number') {
      labelRotate = rotate * (Math.PI / 180);
    } else {
      labelRotate = rotate ? dx < 0 ? -midAngle + Math.PI : -midAngle : 0;
    }

    hasLabelRotate = !!labelRotate;
    layout.label = {
      x: textX,
      y: textY,
      position: labelPosition,
      height: textRect.height,
      len: labelLineLen,
      len2: labelLineLen2,
      linePoints: linePoints,
      textAlign: textAlign,
      verticalAlign: 'middle',
      rotation: labelRotate,
      inside: isLabelInside,
      labelDistance: labelDistance,
      labelAlignTo: labelAlignTo,
      labelMargin: labelMargin,
      bleedMargin: bleedMargin,
      textRect: textRect,
      text: text,
      font: font
    }; // Not layout the inside label

    if (!isLabelInside) {
      labelLayoutList.push(layout.label);
    }
  });

  if (!hasLabelRotate && seriesModel.get('avoidLabelOverlap')) {
    avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop);
  }
}

module.exports = _default;

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

/***/ "c037":
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

__webpack_require__("f7c6");

__webpack_require__("1ab3");

var createDataSelectAction = __webpack_require__("7782");

var dataColor = __webpack_require__("98e7");

var pieLayout = __webpack_require__("292e");

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
createDataSelectAction('pie', [{
  type: 'pieToggleSelect',
  event: 'pieselectchanged',
  method: 'toggleSelected'
}, {
  type: 'pieSelect',
  event: 'pieselected',
  method: 'select'
}, {
  type: 'pieUnSelect',
  event: 'pieunselected',
  method: 'unSelect'
}]);
echarts.registerVisual(dataColor('pie'));
echarts.registerLayout(zrUtil.curry(pieLayout, 'pie'));
echarts.registerProcessor(dataFilter('pie'));

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

/***/ "cee1":
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
function _default(ecModel) {
  var processedMapType = {};
  ecModel.eachSeriesByType('map', function (mapSeries) {
    var mapType = mapSeries.getMapType();

    if (mapSeries.getHostGeoModel() || processedMapType[mapType]) {
      return;
    }

    var mapSymbolOffsets = {};
    zrUtil.each(mapSeries.seriesGroup, function (subMapSeries) {
      var geo = subMapSeries.coordinateSystem;
      var data = subMapSeries.originalData;

      if (subMapSeries.get('showLegendSymbol') && ecModel.getComponent('legend')) {
        data.each(data.mapDimension('value'), function (value, idx) {
          var name = data.getName(idx);
          var region = geo.getRegion(name); // If input series.data is [11, 22, '-'/null/undefined, 44],
          // it will be filled with NaN: [11, 22, NaN, 44] and NaN will
          // not be drawn. So here must validate if value is NaN.

          if (!region || isNaN(value)) {
            return;
          }

          var offset = mapSymbolOffsets[name] || 0;
          var point = geo.dataToPoint(region.center);
          mapSymbolOffsets[name] = offset + 1;
          data.setItemLayout(idx, {
            point: point,
            offset: offset
          });
        });
      }
    }); // Show label of those region not has legendSymbol(which is offset 0)

    var data = mapSeries.getData();
    data.each(function (idx) {
      var name = data.getName(idx);
      var layout = data.getItemLayout(idx) || {};
      layout.showLabel = !mapSymbolOffsets[name];
      data.setItemLayout(idx, layout);
    });
    processedMapType[mapType] = true;
  });
}

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

__webpack_require__("4411");

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

/***/ }),

/***/ "f6ed":
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
// FIXME 公用？

/**
 * @param {Array.<module:echarts/data/List>} datas
 * @param {string} statisticType 'average' 'sum'
 * @inner
 */
function dataStatistics(datas, statisticType) {
  var dataNameMap = {};
  zrUtil.each(datas, function (data) {
    data.each(data.mapDimension('value'), function (value, idx) {
      // Add prefix to avoid conflict with Object.prototype.
      var mapKey = 'ec-' + data.getName(idx);
      dataNameMap[mapKey] = dataNameMap[mapKey] || [];

      if (!isNaN(value)) {
        dataNameMap[mapKey].push(value);
      }
    });
  });
  return datas[0].map(datas[0].mapDimension('value'), function (value, idx) {
    var mapKey = 'ec-' + datas[0].getName(idx);
    var sum = 0;
    var min = Infinity;
    var max = -Infinity;
    var len = dataNameMap[mapKey].length;

    for (var i = 0; i < len; i++) {
      min = Math.min(min, dataNameMap[mapKey][i]);
      max = Math.max(max, dataNameMap[mapKey][i]);
      sum += dataNameMap[mapKey][i];
    }

    var result;

    if (statisticType === 'min') {
      result = min;
    } else if (statisticType === 'max') {
      result = max;
    } else if (statisticType === 'average') {
      result = sum / len;
    } else {
      result = sum;
    }

    return len === 0 ? NaN : result;
  });
}

function _default(ecModel) {
  var seriesGroups = {};
  ecModel.eachSeriesByType('map', function (seriesModel) {
    var hostGeoModel = seriesModel.getHostGeoModel();
    var key = hostGeoModel ? 'o' + hostGeoModel.id : 'i' + seriesModel.getMapType();
    (seriesGroups[key] = seriesGroups[key] || []).push(seriesModel);
  });
  zrUtil.each(seriesGroups, function (seriesList, key) {
    var data = dataStatistics(zrUtil.map(seriesList, function (seriesModel) {
      return seriesModel.getData();
    }), seriesList[0].get('mapValueCalculation'));

    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].originalData = seriesList[i].getData();
    } // FIXME Put where?


    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].seriesGroup = seriesList;
      seriesList[i].needsDrawMap = i === 0 && !seriesList[i].getHostGeoModel();
      seriesList[i].setData(data.cloneShallow());
      seriesList[i].mainSeries = seriesList[0];
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "f7c6":
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

var createListSimply = __webpack_require__("e46b");

var zrUtil = __webpack_require__("6d8b");

var modelUtil = __webpack_require__("e0d3");

var _number = __webpack_require__("3842");

var getPercentWithPrecision = _number.getPercentWithPrecision;

var dataSelectableMixin = __webpack_require__("7023");

var _dataProvider = __webpack_require__("2b17");

var retrieveRawAttr = _dataProvider.retrieveRawAttr;

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForNameBased = _sourceHelper.makeSeriesEncodeForNameBased;

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
var PieSeries = echarts.extendSeriesModel({
  type: 'series.pie',
  // Overwrite
  init: function (option) {
    PieSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));
    this.updateSelectedMap(this._createSelectableList());

    this._defaultLabelLine(option);
  },
  // Overwrite
  mergeOption: function (newOption) {
    PieSeries.superCall(this, 'mergeOption', newOption);
    this.updateSelectedMap(this._createSelectableList());
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
  },
  _createSelectableList: function () {
    var data = this.getRawData();
    var valueDim = data.mapDimension('value');
    var targetList = [];

    for (var i = 0, len = data.count(); i < len; i++) {
      targetList.push({
        name: data.getName(i),
        value: data.get(valueDim, i),
        selected: retrieveRawAttr(data, i, 'selected')
      });
    }

    return targetList;
  },
  // Overwrite
  getDataParams: function (dataIndex) {
    var data = this.getData();
    var params = PieSeries.superCall(this, 'getDataParams', dataIndex); // FIXME toFixed?

    var valueList = [];
    data.each(data.mapDimension('value'), function (value) {
      valueList.push(value);
    });
    params.percent = getPercentWithPrecision(valueList, dataIndex, data.hostModel.get('percentPrecision'));
    params.$vars.push('percent');
    return params;
  },
  _defaultLabelLine: function (option) {
    // Extend labelLine emphasis
    modelUtil.defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine; // Not show label line if `label.normal.show = false`

    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    hoverAnimation: true,
    // 默认全局居中
    center: ['50%', '50%'],
    radius: [0, '75%'],
    // 默认顺时针
    clockwise: true,
    startAngle: 90,
    // 最小角度改为0
    minAngle: 0,
    // If the angle of a sector less than `minShowLabelAngle`,
    // the label will not be displayed.
    minShowLabelAngle: 0,
    // 选中时扇区偏移量
    selectedOffset: 10,
    // 高亮扇区偏移量
    hoverOffset: 10,
    // If use strategy to avoid label overlapping
    avoidLabelOverlap: true,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
    // roseType: null,
    percentPrecision: 2,
    // If still show when all data zero.
    stillShowZeroSum: true,
    // cursor: null,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    label: {
      // If rotate around circle
      rotate: false,
      show: true,
      // 'outer', 'inside', 'center'
      position: 'outer',
      // 'none', 'labelLine', 'edge'. Works only when position is 'outer'
      alignTo: 'none',
      // Closest distance between label and chart edge.
      // Works only position is 'outer' and alignTo is 'edge'.
      margin: '25%',
      // Works only position is 'outer' and alignTo is not 'edge'.
      bleedMargin: 10,
      // Distance between text and label line.
      distanceToLabelLine: 5 // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      // 默认使用全局文本样式，详见TEXTSTYLE
      // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数

    },
    // Enabled when label.normal.position is 'outer'
    labelLine: {
      show: true,
      // 引导线两段中的第一段长度
      length: 15,
      // 引导线两段中的第二段长度
      length2: 15,
      smooth: false,
      lineStyle: {
        // color: 各异,
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      borderWidth: 1
    },
    // Animation type. Valid values: expansion, scale
    animationType: 'expansion',
    // Animation type when update. Valid values: transition, expansion
    animationTypeUpdate: 'transition',
    animationEasing: 'cubicOut'
  }
});
zrUtil.mixin(PieSeries, dataSelectableMixin);
var _default = PieSeries;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~ed9be1e3.6ea9441f.js.map