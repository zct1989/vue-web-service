(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~943f0697"],{

/***/ "085d":
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

__webpack_require__("bd92");

__webpack_require__("19e2");

var preprocessor = __webpack_require__("eabf");

var candlestickVisual = __webpack_require__("4c99");

var candlestickLayout = __webpack_require__("09b1");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerPreprocessor(preprocessor);
echarts.registerVisual(candlestickVisual);
echarts.registerLayout(candlestickLayout);

/***/ }),

/***/ "09b1":
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

var _graphic = __webpack_require__("2306");

var subPixelOptimize = _graphic.subPixelOptimize;

var createRenderPlanner = __webpack_require__("cccd");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

var _util = __webpack_require__("6d8b");

var retrieve2 = _util.retrieve2;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var LargeArr = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var _default = {
  seriesType: 'candlestick',
  plan: createRenderPlanner(),
  reset: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var data = seriesModel.getData();
    var candleWidth = calculateCandleWidth(seriesModel, data);
    var cDimIdx = 0;
    var vDimIdx = 1;
    var coordDims = ['x', 'y'];
    var cDim = data.mapDimension(coordDims[cDimIdx]);
    var vDims = data.mapDimension(coordDims[vDimIdx], true);
    var openDim = vDims[0];
    var closeDim = vDims[1];
    var lowestDim = vDims[2];
    var highestDim = vDims[3];
    data.setLayout({
      candleWidth: candleWidth,
      // The value is experimented visually.
      isSimpleBox: candleWidth <= 1.3
    });

    if (cDim == null || vDims.length < 4) {
      return;
    }

    return {
      progress: seriesModel.pipelineContext.large ? largeProgress : normalProgress
    };

    function normalProgress(params, data) {
      var dataIndex;

      while ((dataIndex = params.next()) != null) {
        var axisDimVal = data.get(cDim, dataIndex);
        var openVal = data.get(openDim, dataIndex);
        var closeVal = data.get(closeDim, dataIndex);
        var lowestVal = data.get(lowestDim, dataIndex);
        var highestVal = data.get(highestDim, dataIndex);
        var ocLow = Math.min(openVal, closeVal);
        var ocHigh = Math.max(openVal, closeVal);
        var ocLowPoint = getPoint(ocLow, axisDimVal);
        var ocHighPoint = getPoint(ocHigh, axisDimVal);
        var lowestPoint = getPoint(lowestVal, axisDimVal);
        var highestPoint = getPoint(highestVal, axisDimVal);
        var ends = [];
        addBodyEnd(ends, ocHighPoint, 0);
        addBodyEnd(ends, ocLowPoint, 1);
        ends.push(subPixelOptimizePoint(highestPoint), subPixelOptimizePoint(ocHighPoint), subPixelOptimizePoint(lowestPoint), subPixelOptimizePoint(ocLowPoint));
        data.setItemLayout(dataIndex, {
          sign: getSign(data, dataIndex, openVal, closeVal, closeDim),
          initBaseline: openVal > closeVal ? ocHighPoint[vDimIdx] : ocLowPoint[vDimIdx],
          // open point.
          ends: ends,
          brushRect: makeBrushRect(lowestVal, highestVal, axisDimVal)
        });
      }

      function getPoint(val, axisDimVal) {
        var p = [];
        p[cDimIdx] = axisDimVal;
        p[vDimIdx] = val;
        return isNaN(axisDimVal) || isNaN(val) ? [NaN, NaN] : coordSys.dataToPoint(p);
      }

      function addBodyEnd(ends, point, start) {
        var point1 = point.slice();
        var point2 = point.slice();
        point1[cDimIdx] = subPixelOptimize(point1[cDimIdx] + candleWidth / 2, 1, false);
        point2[cDimIdx] = subPixelOptimize(point2[cDimIdx] - candleWidth / 2, 1, true);
        start ? ends.push(point1, point2) : ends.push(point2, point1);
      }

      function makeBrushRect(lowestVal, highestVal, axisDimVal) {
        var pmin = getPoint(lowestVal, axisDimVal);
        var pmax = getPoint(highestVal, axisDimVal);
        pmin[cDimIdx] -= candleWidth / 2;
        pmax[cDimIdx] -= candleWidth / 2;
        return {
          x: pmin[0],
          y: pmin[1],
          width: vDimIdx ? candleWidth : pmax[0] - pmin[0],
          height: vDimIdx ? pmax[1] - pmin[1] : candleWidth
        };
      }

      function subPixelOptimizePoint(point) {
        point[cDimIdx] = subPixelOptimize(point[cDimIdx], 1);
        return point;
      }
    }

    function largeProgress(params, data) {
      // Structure: [sign, x, yhigh, ylow, sign, x, yhigh, ylow, ...]
      var points = new LargeArr(params.count * 4);
      var offset = 0;
      var point;
      var tmpIn = [];
      var tmpOut = [];
      var dataIndex;

      while ((dataIndex = params.next()) != null) {
        var axisDimVal = data.get(cDim, dataIndex);
        var openVal = data.get(openDim, dataIndex);
        var closeVal = data.get(closeDim, dataIndex);
        var lowestVal = data.get(lowestDim, dataIndex);
        var highestVal = data.get(highestDim, dataIndex);

        if (isNaN(axisDimVal) || isNaN(lowestVal) || isNaN(highestVal)) {
          points[offset++] = NaN;
          offset += 3;
          continue;
        }

        points[offset++] = getSign(data, dataIndex, openVal, closeVal, closeDim);
        tmpIn[cDimIdx] = axisDimVal;
        tmpIn[vDimIdx] = lowestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[0] : NaN;
        points[offset++] = point ? point[1] : NaN;
        tmpIn[vDimIdx] = highestVal;
        point = coordSys.dataToPoint(tmpIn, null, tmpOut);
        points[offset++] = point ? point[1] : NaN;
      }

      data.setLayout('largePoints', points);
    }
  }
};

function getSign(data, dataIndex, openVal, closeVal, closeDim) {
  var sign;

  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign = dataIndex > 0 // If close === open, compare with close of last record
    ? data.get(closeDim, dataIndex - 1) <= closeVal ? 1 : -1 : // No record of previous, set to be positive
    1;
  }

  return sign;
}

function calculateCandleWidth(seriesModel, data) {
  var baseAxis = seriesModel.getBaseAxis();
  var extent;
  var bandWidth = baseAxis.type === 'category' ? baseAxis.getBandWidth() : (extent = baseAxis.getExtent(), Math.abs(extent[1] - extent[0]) / data.count());
  var barMaxWidth = parsePercent(retrieve2(seriesModel.get('barMaxWidth'), bandWidth), bandWidth);
  var barMinWidth = parsePercent(retrieve2(seriesModel.get('barMinWidth'), 1), bandWidth);
  var barWidth = seriesModel.get('barWidth');
  return barWidth != null ? parsePercent(barWidth, bandWidth) // Put max outer to ensure bar visible in spite of overlap.
  : Math.max(Math.min(bandWidth / 2, barMaxWidth), barMinWidth);
}

module.exports = _default;

/***/ }),

/***/ "17b8":
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

var BaseBarSeries = __webpack_require__("3014");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = BaseBarSeries.extend({
  type: 'series.bar',
  dependencies: ['grid', 'polar'],
  brushSelector: 'rect',

  /**
   * @override
   */
  getProgressive: function () {
    // Do not support progressive in normal mode.
    return this.get('large') ? this.get('progressive') : false;
  },

  /**
   * @override
   */
  getProgressiveThreshold: function () {
    // Do not support progressive in normal mode.
    var progressiveThreshold = this.get('progressiveThreshold');
    var largeThreshold = this.get('largeThreshold');

    if (largeThreshold > progressiveThreshold) {
      progressiveThreshold = largeThreshold;
    }

    return progressiveThreshold;
  },
  defaultOption: {
    // If clipped
    // Only available on cartesian2d
    clip: true,
    // If use caps on two sides of bars
    // Only available on tangential polar bar
    roundCap: false
  }
});

module.exports = _default;

/***/ }),

/***/ "19e2":
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

var graphic = __webpack_require__("2306");

var Path = __webpack_require__("cbe5");

var _createClipPathFromCoordSys = __webpack_require__("b0af");

var createClipPath = _createClipPathFromCoordSys.createClipPath;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var NORMAL_ITEM_STYLE_PATH = ['itemStyle'];
var EMPHASIS_ITEM_STYLE_PATH = ['emphasis', 'itemStyle'];
var SKIP_PROPS = ['color', 'color0', 'borderColor', 'borderColor0'];
var CandlestickView = ChartView.extend({
  type: 'candlestick',
  render: function (seriesModel, ecModel, api) {
    // If there is clipPath created in large mode. Remove it.
    this.group.removeClipPath();

    this._updateDrawMode(seriesModel);

    this._isLargeDraw ? this._renderLarge(seriesModel) : this._renderNormal(seriesModel);
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this._clear();

    this._updateDrawMode(seriesModel);
  },
  incrementalRender: function (params, seriesModel, ecModel, api) {
    this._isLargeDraw ? this._incrementalRenderLarge(params, seriesModel) : this._incrementalRenderNormal(params, seriesModel);
  },
  _updateDrawMode: function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;

    if (this._isLargeDraw == null || isLargeDraw ^ this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;

      this._clear();
    }
  },
  _renderNormal: function (seriesModel) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var isSimpleBox = data.getLayout('isSimpleBox');
    var needsClip = seriesModel.get('clip', true);
    var coord = seriesModel.coordinateSystem;
    var clipArea = coord.getArea && coord.getArea(); // There is no old data only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.

    if (!this._data) {
      group.removeAll();
    }

    data.diff(oldData).add(function (newIdx) {
      if (data.hasValue(newIdx)) {
        var el;
        var itemLayout = data.getItemLayout(newIdx);

        if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
          return;
        }

        el = createNormalBox(itemLayout, newIdx, true);
        graphic.initProps(el, {
          shape: {
            points: itemLayout.ends
          }
        }, seriesModel, newIdx);
        setBoxCommon(el, data, newIdx, isSimpleBox);
        group.add(el);
        data.setItemGraphicEl(newIdx, el);
      }
    }).update(function (newIdx, oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx); // Empty data

      if (!data.hasValue(newIdx)) {
        group.remove(el);
        return;
      }

      var itemLayout = data.getItemLayout(newIdx);

      if (needsClip && isNormalBoxClipped(clipArea, itemLayout)) {
        group.remove(el);
        return;
      }

      if (!el) {
        el = createNormalBox(itemLayout, newIdx);
      } else {
        graphic.updateProps(el, {
          shape: {
            points: itemLayout.ends
          }
        }, seriesModel, newIdx);
      }

      setBoxCommon(el, data, newIdx, isSimpleBox);
      group.add(el);
      data.setItemGraphicEl(newIdx, el);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && group.remove(el);
    }).execute();
    this._data = data;
  },
  _renderLarge: function (seriesModel) {
    this._clear();

    createLarge(seriesModel, this.group);
    var clipPath = seriesModel.get('clip', true) ? createClipPath(seriesModel.coordinateSystem, false, seriesModel) : null;

    if (clipPath) {
      this.group.setClipPath(clipPath);
    } else {
      this.group.removeClipPath();
    }
  },
  _incrementalRenderNormal: function (params, seriesModel) {
    var data = seriesModel.getData();
    var isSimpleBox = data.getLayout('isSimpleBox');
    var dataIndex;

    while ((dataIndex = params.next()) != null) {
      var el;
      var itemLayout = data.getItemLayout(dataIndex);
      el = createNormalBox(itemLayout, dataIndex);
      setBoxCommon(el, data, dataIndex, isSimpleBox);
      el.incremental = true;
      this.group.add(el);
    }
  },
  _incrementalRenderLarge: function (params, seriesModel) {
    createLarge(seriesModel, this.group, true);
  },
  remove: function (ecModel) {
    this._clear();
  },
  _clear: function () {
    this.group.removeAll();
    this._data = null;
  },
  dispose: zrUtil.noop
});
var NormalBoxPath = Path.extend({
  type: 'normalCandlestickBox',
  shape: {},
  buildPath: function (ctx, shape) {
    var ends = shape.points;

    if (this.__simpleBox) {
      ctx.moveTo(ends[4][0], ends[4][1]);
      ctx.lineTo(ends[6][0], ends[6][1]);
    } else {
      ctx.moveTo(ends[0][0], ends[0][1]);
      ctx.lineTo(ends[1][0], ends[1][1]);
      ctx.lineTo(ends[2][0], ends[2][1]);
      ctx.lineTo(ends[3][0], ends[3][1]);
      ctx.closePath();
      ctx.moveTo(ends[4][0], ends[4][1]);
      ctx.lineTo(ends[5][0], ends[5][1]);
      ctx.moveTo(ends[6][0], ends[6][1]);
      ctx.lineTo(ends[7][0], ends[7][1]);
    }
  }
});

function createNormalBox(itemLayout, dataIndex, isInit) {
  var ends = itemLayout.ends;
  return new NormalBoxPath({
    shape: {
      points: isInit ? transInit(ends, itemLayout) : ends
    },
    z2: 100
  });
}

function isNormalBoxClipped(clipArea, itemLayout) {
  var clipped = true;

  for (var i = 0; i < itemLayout.ends.length; i++) {
    // If any point are in the region.
    if (clipArea.contain(itemLayout.ends[i][0], itemLayout.ends[i][1])) {
      clipped = false;
      break;
    }
  }

  return clipped;
}

function setBoxCommon(el, data, dataIndex, isSimpleBox) {
  var itemModel = data.getItemModel(dataIndex);
  var normalItemStyleModel = itemModel.getModel(NORMAL_ITEM_STYLE_PATH);
  var color = data.getItemVisual(dataIndex, 'color');
  var borderColor = data.getItemVisual(dataIndex, 'borderColor') || color; // Color must be excluded.
  // Because symbol provide setColor individually to set fill and stroke

  var itemStyle = normalItemStyleModel.getItemStyle(SKIP_PROPS);
  el.useStyle(itemStyle);
  el.style.strokeNoScale = true;
  el.style.fill = color;
  el.style.stroke = borderColor;
  el.__simpleBox = isSimpleBox;
  var hoverStyle = itemModel.getModel(EMPHASIS_ITEM_STYLE_PATH).getItemStyle();
  graphic.setHoverStyle(el, hoverStyle);
}

function transInit(points, itemLayout) {
  return zrUtil.map(points, function (point) {
    point = point.slice();
    point[1] = itemLayout.initBaseline;
    return point;
  });
}

var LargeBoxPath = Path.extend({
  type: 'largeCandlestickBox',
  shape: {},
  buildPath: function (ctx, shape) {
    // Drawing lines is more efficient than drawing
    // a whole line or drawing rects.
    var points = shape.points;

    for (var i = 0; i < points.length;) {
      if (this.__sign === points[i++]) {
        var x = points[i++];
        ctx.moveTo(x, points[i++]);
        ctx.lineTo(x, points[i++]);
      } else {
        i += 3;
      }
    }
  }
});

function createLarge(seriesModel, group, incremental) {
  var data = seriesModel.getData();
  var largePoints = data.getLayout('largePoints');
  var elP = new LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: 1
  });
  group.add(elP);
  var elN = new LargeBoxPath({
    shape: {
      points: largePoints
    },
    __sign: -1
  });
  group.add(elN);
  setLargeStyle(1, elP, seriesModel, data);
  setLargeStyle(-1, elN, seriesModel, data);

  if (incremental) {
    elP.incremental = true;
    elN.incremental = true;
  }
}

function setLargeStyle(sign, el, seriesModel, data) {
  var suffix = sign > 0 ? 'P' : 'N';
  var borderColor = data.getVisual('borderColor' + suffix) || data.getVisual('color' + suffix); // Color must be excluded.
  // Because symbol provide setColor individually to set fill and stroke

  var itemStyle = seriesModel.getModel(NORMAL_ITEM_STYLE_PATH).getItemStyle(SKIP_PROPS);
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor; // No different
  // el.style.lineWidth = .5;
}

var _default = CandlestickView;
module.exports = _default;

/***/ }),

/***/ "2039":
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
var coordinateSystemCreators = {};

function CoordinateSystemManager() {
  this._coordinateSystems = [];
}

CoordinateSystemManager.prototype = {
  constructor: CoordinateSystemManager,
  create: function (ecModel, api) {
    var coordinateSystems = [];
    zrUtil.each(coordinateSystemCreators, function (creater, type) {
      var list = creater.create(ecModel, api);
      coordinateSystems = coordinateSystems.concat(list || []);
    });
    this._coordinateSystems = coordinateSystems;
  },
  update: function (ecModel, api) {
    zrUtil.each(this._coordinateSystems, function (coordSys) {
      coordSys.update && coordSys.update(ecModel, api);
    });
  },
  getCoordinateSystems: function () {
    return this._coordinateSystems.slice();
  }
};

CoordinateSystemManager.register = function (type, coordinateSystemCreator) {
  coordinateSystemCreators[type] = coordinateSystemCreator;
};

CoordinateSystemManager.get = function (type) {
  return coordinateSystemCreators[type];
};

var _default = CoordinateSystemManager;
module.exports = _default;

/***/ }),

/***/ "2f91":
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
var borderColorQuery = ['itemStyle', 'borderColor'];

function _default(ecModel, api) {
  var globalColors = ecModel.get('color');
  ecModel.eachRawSeriesByType('boxplot', function (seriesModel) {
    var defaulColor = globalColors[seriesModel.seriesIndex % globalColors.length];
    var data = seriesModel.getData();
    data.setVisual({
      legendSymbol: 'roundRect',
      // Use name 'color' but not 'borderColor' for legend usage and
      // visual coding from other component like dataRange.
      color: seriesModel.get(borderColorQuery) || defaulColor
    }); // Only visible series has each data be visual encoded

    if (!ecModel.isSeriesFiltered(seriesModel)) {
      data.each(function (idx) {
        var itemModel = data.getItemModel(idx);
        data.setItemVisual(idx, {
          color: itemModel.get(borderColorQuery, true)
        });
      });
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "3014":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'series.__base_bar__',
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this, {
      useEncodeDefaulter: true
    });
  },
  getMarkerPosition: function (value) {
    var coordSys = this.coordinateSystem;

    if (coordSys) {
      // PENDING if clamp ?
      var pt = coordSys.dataToPoint(coordSys.clampData(value));
      var data = this.getData();
      var offset = data.getLayout('offset');
      var size = data.getLayout('size');
      var offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
      pt[offsetIndex] += offset + size / 2;
      return pt;
    }

    return [NaN, NaN];
  },
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    // stack: null
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // 最小高度改为0
    barMinHeight: 0,
    // 最小角度为0，仅对极坐标系下的柱状图有效
    barMinAngle: 0,
    // cursor: null,
    large: false,
    largeThreshold: 400,
    progressive: 3e3,
    progressiveChunkMode: 'mod',
    // barMaxWidth: null,
    // In cartesian, the default value is 1. Otherwise null.
    // barMinWidth: null,
    // 默认自适应
    // barWidth: null,
    // 柱间距离，默认为柱形宽度的30%，可设固定值
    // barGap: '30%',
    // 类目间柱形距离，默认为类目间距的20%，可设固定值
    // barCategoryGap: '20%',
    // label: {
    //      show: false
    // },
    itemStyle: {},
    emphasis: {}
  }
});

module.exports = _default;

/***/ }),

/***/ "3329":
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

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;
var isNumeric = _number.isNumeric;

var _helper = __webpack_require__("e7aa");

var setLabel = _helper.setLabel;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'borderWidth']; // index: +isHorizontal

var LAYOUT_ATTRS = [{
  xy: 'x',
  wh: 'width',
  index: 0,
  posDesc: ['left', 'right']
}, {
  xy: 'y',
  wh: 'height',
  index: 1,
  posDesc: ['top', 'bottom']
}];
var pathForLineWidth = new graphic.Circle();
var BarView = echarts.extendChartView({
  type: 'pictorialBar',
  render: function (seriesModel, ecModel, api) {
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var isHorizontal = !!baseAxis.isHorizontal();
    var coordSysRect = cartesian.grid.getRect();
    var opt = {
      ecSize: {
        width: api.getWidth(),
        height: api.getHeight()
      },
      seriesModel: seriesModel,
      coordSys: cartesian,
      coordSysExtent: [[coordSysRect.x, coordSysRect.x + coordSysRect.width], [coordSysRect.y, coordSysRect.y + coordSysRect.height]],
      isHorizontal: isHorizontal,
      valueDim: LAYOUT_ATTRS[+isHorizontal],
      categoryDim: LAYOUT_ATTRS[1 - isHorizontal]
    };
    data.diff(oldData).add(function (dataIndex) {
      if (!data.hasValue(dataIndex)) {
        return;
      }

      var itemModel = getItemModel(data, dataIndex);
      var symbolMeta = getSymbolMeta(data, dataIndex, itemModel, opt);
      var bar = createBar(data, opt, symbolMeta);
      data.setItemGraphicEl(dataIndex, bar);
      group.add(bar);
      updateCommon(bar, opt, symbolMeta);
    }).update(function (newIndex, oldIndex) {
      var bar = oldData.getItemGraphicEl(oldIndex);

      if (!data.hasValue(newIndex)) {
        group.remove(bar);
        return;
      }

      var itemModel = getItemModel(data, newIndex);
      var symbolMeta = getSymbolMeta(data, newIndex, itemModel, opt);
      var pictorialShapeStr = getShapeStr(data, symbolMeta);

      if (bar && pictorialShapeStr !== bar.__pictorialShapeStr) {
        group.remove(bar);
        data.setItemGraphicEl(newIndex, null);
        bar = null;
      }

      if (bar) {
        updateBar(bar, opt, symbolMeta);
      } else {
        bar = createBar(data, opt, symbolMeta, true);
      }

      data.setItemGraphicEl(newIndex, bar);
      bar.__pictorialSymbolMeta = symbolMeta; // Add back

      group.add(bar);
      updateCommon(bar, opt, symbolMeta);
    }).remove(function (dataIndex) {
      var bar = oldData.getItemGraphicEl(dataIndex);
      bar && removeBar(oldData, dataIndex, bar.__pictorialSymbolMeta.animationModel, bar);
    }).execute();
    this._data = data;
    return this.group;
  },
  dispose: zrUtil.noop,
  remove: function (ecModel, api) {
    var group = this.group;
    var data = this._data;

    if (ecModel.get('animation')) {
      if (data) {
        data.eachItemGraphicEl(function (bar) {
          removeBar(data, bar.dataIndex, ecModel, bar);
        });
      }
    } else {
      group.removeAll();
    }
  }
}); // Set or calculate default value about symbol, and calculate layout info.

function getSymbolMeta(data, dataIndex, itemModel, opt) {
  var layout = data.getItemLayout(dataIndex);
  var symbolRepeat = itemModel.get('symbolRepeat');
  var symbolClip = itemModel.get('symbolClip');
  var symbolPosition = itemModel.get('symbolPosition') || 'start';
  var symbolRotate = itemModel.get('symbolRotate');
  var rotation = (symbolRotate || 0) * Math.PI / 180 || 0;
  var symbolPatternSize = itemModel.get('symbolPatternSize') || 2;
  var isAnimationEnabled = itemModel.isAnimationEnabled();
  var symbolMeta = {
    dataIndex: dataIndex,
    layout: layout,
    itemModel: itemModel,
    symbolType: data.getItemVisual(dataIndex, 'symbol') || 'circle',
    color: data.getItemVisual(dataIndex, 'color'),
    symbolClip: symbolClip,
    symbolRepeat: symbolRepeat,
    symbolRepeatDirection: itemModel.get('symbolRepeatDirection'),
    symbolPatternSize: symbolPatternSize,
    rotation: rotation,
    animationModel: isAnimationEnabled ? itemModel : null,
    hoverAnimation: isAnimationEnabled && itemModel.get('hoverAnimation'),
    z2: itemModel.getShallow('z', true) || 0
  };
  prepareBarLength(itemModel, symbolRepeat, layout, opt, symbolMeta);
  prepareSymbolSize(data, dataIndex, layout, symbolRepeat, symbolClip, symbolMeta.boundingLength, symbolMeta.pxSign, symbolPatternSize, opt, symbolMeta);
  prepareLineWidth(itemModel, symbolMeta.symbolScale, rotation, opt, symbolMeta);
  var symbolSize = symbolMeta.symbolSize;
  var symbolOffset = itemModel.get('symbolOffset');

  if (zrUtil.isArray(symbolOffset)) {
    symbolOffset = [parsePercent(symbolOffset[0], symbolSize[0]), parsePercent(symbolOffset[1], symbolSize[1])];
  }

  prepareLayoutInfo(itemModel, symbolSize, layout, symbolRepeat, symbolClip, symbolOffset, symbolPosition, symbolMeta.valueLineWidth, symbolMeta.boundingLength, symbolMeta.repeatCutLength, opt, symbolMeta);
  return symbolMeta;
} // bar length can be negative.


function prepareBarLength(itemModel, symbolRepeat, layout, opt, output) {
  var valueDim = opt.valueDim;
  var symbolBoundingData = itemModel.get('symbolBoundingData');
  var valueAxis = opt.coordSys.getOtherAxis(opt.coordSys.getBaseAxis());
  var zeroPx = valueAxis.toGlobalCoord(valueAxis.dataToCoord(0));
  var pxSignIdx = 1 - +(layout[valueDim.wh] <= 0);
  var boundingLength;

  if (zrUtil.isArray(symbolBoundingData)) {
    var symbolBoundingExtent = [convertToCoordOnAxis(valueAxis, symbolBoundingData[0]) - zeroPx, convertToCoordOnAxis(valueAxis, symbolBoundingData[1]) - zeroPx];
    symbolBoundingExtent[1] < symbolBoundingExtent[0] && symbolBoundingExtent.reverse();
    boundingLength = symbolBoundingExtent[pxSignIdx];
  } else if (symbolBoundingData != null) {
    boundingLength = convertToCoordOnAxis(valueAxis, symbolBoundingData) - zeroPx;
  } else if (symbolRepeat) {
    boundingLength = opt.coordSysExtent[valueDim.index][pxSignIdx] - zeroPx;
  } else {
    boundingLength = layout[valueDim.wh];
  }

  output.boundingLength = boundingLength;

  if (symbolRepeat) {
    output.repeatCutLength = layout[valueDim.wh];
  }

  output.pxSign = boundingLength > 0 ? 1 : boundingLength < 0 ? -1 : 0;
}

function convertToCoordOnAxis(axis, value) {
  return axis.toGlobalCoord(axis.dataToCoord(axis.scale.parse(value)));
} // Support ['100%', '100%']


function prepareSymbolSize(data, dataIndex, layout, symbolRepeat, symbolClip, boundingLength, pxSign, symbolPatternSize, opt, output) {
  var valueDim = opt.valueDim;
  var categoryDim = opt.categoryDim;
  var categorySize = Math.abs(layout[categoryDim.wh]);
  var symbolSize = data.getItemVisual(dataIndex, 'symbolSize');

  if (zrUtil.isArray(symbolSize)) {
    symbolSize = symbolSize.slice();
  } else {
    if (symbolSize == null) {
      symbolSize = '100%';
    }

    symbolSize = [symbolSize, symbolSize];
  } // Note: percentage symbolSize (like '100%') do not consider lineWidth, because it is
  // to complicated to calculate real percent value if considering scaled lineWidth.
  // So the actual size will bigger than layout size if lineWidth is bigger than zero,
  // which can be tolerated in pictorial chart.


  symbolSize[categoryDim.index] = parsePercent(symbolSize[categoryDim.index], categorySize);
  symbolSize[valueDim.index] = parsePercent(symbolSize[valueDim.index], symbolRepeat ? categorySize : Math.abs(boundingLength));
  output.symbolSize = symbolSize; // If x or y is less than zero, show reversed shape.

  var symbolScale = output.symbolScale = [symbolSize[0] / symbolPatternSize, symbolSize[1] / symbolPatternSize]; // Follow convention, 'right' and 'top' is the normal scale.

  symbolScale[valueDim.index] *= (opt.isHorizontal ? -1 : 1) * pxSign;
}

function prepareLineWidth(itemModel, symbolScale, rotation, opt, output) {
  // In symbols are drawn with scale, so do not need to care about the case that width
  // or height are too small. But symbol use strokeNoScale, where acture lineWidth should
  // be calculated.
  var valueLineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;

  if (valueLineWidth) {
    pathForLineWidth.attr({
      scale: symbolScale.slice(),
      rotation: rotation
    });
    pathForLineWidth.updateTransform();
    valueLineWidth /= pathForLineWidth.getLineScale();
    valueLineWidth *= symbolScale[opt.valueDim.index];
  }

  output.valueLineWidth = valueLineWidth;
}

function prepareLayoutInfo(itemModel, symbolSize, layout, symbolRepeat, symbolClip, symbolOffset, symbolPosition, valueLineWidth, boundingLength, repeatCutLength, opt, output) {
  var categoryDim = opt.categoryDim;
  var valueDim = opt.valueDim;
  var pxSign = output.pxSign;
  var unitLength = Math.max(symbolSize[valueDim.index] + valueLineWidth, 0);
  var pathLen = unitLength; // Note: rotation will not effect the layout of symbols, because user may
  // want symbols to rotate on its center, which should not be translated
  // when rotating.

  if (symbolRepeat) {
    var absBoundingLength = Math.abs(boundingLength);
    var symbolMargin = zrUtil.retrieve(itemModel.get('symbolMargin'), '15%') + '';
    var hasEndGap = false;

    if (symbolMargin.lastIndexOf('!') === symbolMargin.length - 1) {
      hasEndGap = true;
      symbolMargin = symbolMargin.slice(0, symbolMargin.length - 1);
    }

    symbolMargin = parsePercent(symbolMargin, symbolSize[valueDim.index]);
    var uLenWithMargin = Math.max(unitLength + symbolMargin * 2, 0); // When symbol margin is less than 0, margin at both ends will be subtracted
    // to ensure that all of the symbols will not be overflow the given area.

    var endFix = hasEndGap ? 0 : symbolMargin * 2; // Both final repeatTimes and final symbolMargin area calculated based on
    // boundingLength.

    var repeatSpecified = isNumeric(symbolRepeat);
    var repeatTimes = repeatSpecified ? symbolRepeat : toIntTimes((absBoundingLength + endFix) / uLenWithMargin); // Adjust calculate margin, to ensure each symbol is displayed
    // entirely in the given layout area.

    var mDiff = absBoundingLength - repeatTimes * unitLength;
    symbolMargin = mDiff / 2 / (hasEndGap ? repeatTimes : repeatTimes - 1);
    uLenWithMargin = unitLength + symbolMargin * 2;
    endFix = hasEndGap ? 0 : symbolMargin * 2; // Update repeatTimes when not all symbol will be shown.

    if (!repeatSpecified && symbolRepeat !== 'fixed') {
      repeatTimes = repeatCutLength ? toIntTimes((Math.abs(repeatCutLength) + endFix) / uLenWithMargin) : 0;
    }

    pathLen = repeatTimes * uLenWithMargin - endFix;
    output.repeatTimes = repeatTimes;
    output.symbolMargin = symbolMargin;
  }

  var sizeFix = pxSign * (pathLen / 2);
  var pathPosition = output.pathPosition = [];
  pathPosition[categoryDim.index] = layout[categoryDim.wh] / 2;
  pathPosition[valueDim.index] = symbolPosition === 'start' ? sizeFix : symbolPosition === 'end' ? boundingLength - sizeFix : boundingLength / 2; // 'center'

  if (symbolOffset) {
    pathPosition[0] += symbolOffset[0];
    pathPosition[1] += symbolOffset[1];
  }

  var bundlePosition = output.bundlePosition = [];
  bundlePosition[categoryDim.index] = layout[categoryDim.xy];
  bundlePosition[valueDim.index] = layout[valueDim.xy];
  var barRectShape = output.barRectShape = zrUtil.extend({}, layout);
  barRectShape[valueDim.wh] = pxSign * Math.max(Math.abs(layout[valueDim.wh]), Math.abs(pathPosition[valueDim.index] + sizeFix));
  barRectShape[categoryDim.wh] = layout[categoryDim.wh];
  var clipShape = output.clipShape = {}; // Consider that symbol may be overflow layout rect.

  clipShape[categoryDim.xy] = -layout[categoryDim.xy];
  clipShape[categoryDim.wh] = opt.ecSize[categoryDim.wh];
  clipShape[valueDim.xy] = 0;
  clipShape[valueDim.wh] = layout[valueDim.wh];
}

function createPath(symbolMeta) {
  var symbolPatternSize = symbolMeta.symbolPatternSize;
  var path = createSymbol( // Consider texture img, make a big size.
  symbolMeta.symbolType, -symbolPatternSize / 2, -symbolPatternSize / 2, symbolPatternSize, symbolPatternSize, symbolMeta.color);
  path.attr({
    culling: true
  });
  path.type !== 'image' && path.setStyle({
    strokeNoScale: true
  });
  return path;
}

function createOrUpdateRepeatSymbols(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var symbolSize = symbolMeta.symbolSize;
  var valueLineWidth = symbolMeta.valueLineWidth;
  var pathPosition = symbolMeta.pathPosition;
  var valueDim = opt.valueDim;
  var repeatTimes = symbolMeta.repeatTimes || 0;
  var index = 0;
  var unit = symbolSize[opt.valueDim.index] + valueLineWidth + symbolMeta.symbolMargin * 2;
  eachPath(bar, function (path) {
    path.__pictorialAnimationIndex = index;
    path.__pictorialRepeatTimes = repeatTimes;

    if (index < repeatTimes) {
      updateAttr(path, null, makeTarget(index), symbolMeta, isUpdate);
    } else {
      updateAttr(path, null, {
        scale: [0, 0]
      }, symbolMeta, isUpdate, function () {
        bundle.remove(path);
      });
    }

    updateHoverAnimation(path, symbolMeta);
    index++;
  });

  for (; index < repeatTimes; index++) {
    var path = createPath(symbolMeta);
    path.__pictorialAnimationIndex = index;
    path.__pictorialRepeatTimes = repeatTimes;
    bundle.add(path);
    var target = makeTarget(index);
    updateAttr(path, {
      position: target.position,
      scale: [0, 0]
    }, {
      scale: target.scale,
      rotation: target.rotation
    }, symbolMeta, isUpdate); // FIXME
    // If all emphasis/normal through action.

    path.on('mouseover', onMouseOver).on('mouseout', onMouseOut);
    updateHoverAnimation(path, symbolMeta);
  }

  function makeTarget(index) {
    var position = pathPosition.slice(); // (start && pxSign > 0) || (end && pxSign < 0): i = repeatTimes - index
    // Otherwise: i = index;

    var pxSign = symbolMeta.pxSign;
    var i = index;

    if (symbolMeta.symbolRepeatDirection === 'start' ? pxSign > 0 : pxSign < 0) {
      i = repeatTimes - 1 - index;
    }

    position[valueDim.index] = unit * (i - repeatTimes / 2 + 0.5) + pathPosition[valueDim.index];
    return {
      position: position,
      scale: symbolMeta.symbolScale.slice(),
      rotation: symbolMeta.rotation
    };
  }

  function onMouseOver() {
    eachPath(bar, function (path) {
      path.trigger('emphasis');
    });
  }

  function onMouseOut() {
    eachPath(bar, function (path) {
      path.trigger('normal');
    });
  }
}

function createOrUpdateSingleSymbol(bar, opt, symbolMeta, isUpdate) {
  var bundle = bar.__pictorialBundle;
  var mainPath = bar.__pictorialMainPath;

  if (!mainPath) {
    mainPath = bar.__pictorialMainPath = createPath(symbolMeta);
    bundle.add(mainPath);
    updateAttr(mainPath, {
      position: symbolMeta.pathPosition.slice(),
      scale: [0, 0],
      rotation: symbolMeta.rotation
    }, {
      scale: symbolMeta.symbolScale.slice()
    }, symbolMeta, isUpdate);
    mainPath.on('mouseover', onMouseOver).on('mouseout', onMouseOut);
  } else {
    updateAttr(mainPath, null, {
      position: symbolMeta.pathPosition.slice(),
      scale: symbolMeta.symbolScale.slice(),
      rotation: symbolMeta.rotation
    }, symbolMeta, isUpdate);
  }

  updateHoverAnimation(mainPath, symbolMeta);

  function onMouseOver() {
    this.trigger('emphasis');
  }

  function onMouseOut() {
    this.trigger('normal');
  }
} // bar rect is used for label.


function createOrUpdateBarRect(bar, symbolMeta, isUpdate) {
  var rectShape = zrUtil.extend({}, symbolMeta.barRectShape);
  var barRect = bar.__pictorialBarRect;

  if (!barRect) {
    barRect = bar.__pictorialBarRect = new graphic.Rect({
      z2: 2,
      shape: rectShape,
      silent: true,
      style: {
        stroke: 'transparent',
        fill: 'transparent',
        lineWidth: 0
      }
    });
    bar.add(barRect);
  } else {
    updateAttr(barRect, null, {
      shape: rectShape
    }, symbolMeta, isUpdate);
  }
}

function createOrUpdateClip(bar, opt, symbolMeta, isUpdate) {
  // If not clip, symbol will be remove and rebuilt.
  if (symbolMeta.symbolClip) {
    var clipPath = bar.__pictorialClipPath;
    var clipShape = zrUtil.extend({}, symbolMeta.clipShape);
    var valueDim = opt.valueDim;
    var animationModel = symbolMeta.animationModel;
    var dataIndex = symbolMeta.dataIndex;

    if (clipPath) {
      graphic.updateProps(clipPath, {
        shape: clipShape
      }, animationModel, dataIndex);
    } else {
      clipShape[valueDim.wh] = 0;
      clipPath = new graphic.Rect({
        shape: clipShape
      });

      bar.__pictorialBundle.setClipPath(clipPath);

      bar.__pictorialClipPath = clipPath;
      var target = {};
      target[valueDim.wh] = symbolMeta.clipShape[valueDim.wh];
      graphic[isUpdate ? 'updateProps' : 'initProps'](clipPath, {
        shape: target
      }, animationModel, dataIndex);
    }
  }
}

function getItemModel(data, dataIndex) {
  var itemModel = data.getItemModel(dataIndex);
  itemModel.getAnimationDelayParams = getAnimationDelayParams;
  itemModel.isAnimationEnabled = isAnimationEnabled;
  return itemModel;
}

function getAnimationDelayParams(path) {
  // The order is the same as the z-order, see `symbolRepeatDiretion`.
  return {
    index: path.__pictorialAnimationIndex,
    count: path.__pictorialRepeatTimes
  };
}

function isAnimationEnabled() {
  // `animation` prop can be set on itemModel in pictorial bar chart.
  return this.parentModel.isAnimationEnabled() && !!this.getShallow('animation');
}

function updateHoverAnimation(path, symbolMeta) {
  path.off('emphasis').off('normal');
  var scale = symbolMeta.symbolScale.slice();
  symbolMeta.hoverAnimation && path.on('emphasis', function () {
    this.animateTo({
      scale: [scale[0] * 1.1, scale[1] * 1.1]
    }, 400, 'elasticOut');
  }).on('normal', function () {
    this.animateTo({
      scale: scale.slice()
    }, 400, 'elasticOut');
  });
}

function createBar(data, opt, symbolMeta, isUpdate) {
  // bar is the main element for each data.
  var bar = new graphic.Group(); // bundle is used for location and clip.

  var bundle = new graphic.Group();
  bar.add(bundle);
  bar.__pictorialBundle = bundle;
  bundle.attr('position', symbolMeta.bundlePosition.slice());

  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta);
  }

  createOrUpdateBarRect(bar, symbolMeta, isUpdate);
  createOrUpdateClip(bar, opt, symbolMeta, isUpdate);
  bar.__pictorialShapeStr = getShapeStr(data, symbolMeta);
  bar.__pictorialSymbolMeta = symbolMeta;
  return bar;
}

function updateBar(bar, opt, symbolMeta) {
  var animationModel = symbolMeta.animationModel;
  var dataIndex = symbolMeta.dataIndex;
  var bundle = bar.__pictorialBundle;
  graphic.updateProps(bundle, {
    position: symbolMeta.bundlePosition.slice()
  }, animationModel, dataIndex);

  if (symbolMeta.symbolRepeat) {
    createOrUpdateRepeatSymbols(bar, opt, symbolMeta, true);
  } else {
    createOrUpdateSingleSymbol(bar, opt, symbolMeta, true);
  }

  createOrUpdateBarRect(bar, symbolMeta, true);
  createOrUpdateClip(bar, opt, symbolMeta, true);
}

function removeBar(data, dataIndex, animationModel, bar) {
  // Not show text when animating
  var labelRect = bar.__pictorialBarRect;
  labelRect && (labelRect.style.text = null);
  var pathes = [];
  eachPath(bar, function (path) {
    pathes.push(path);
  });
  bar.__pictorialMainPath && pathes.push(bar.__pictorialMainPath); // I do not find proper remove animation for clip yet.

  bar.__pictorialClipPath && (animationModel = null);
  zrUtil.each(pathes, function (path) {
    graphic.updateProps(path, {
      scale: [0, 0]
    }, animationModel, dataIndex, function () {
      bar.parent && bar.parent.remove(bar);
    });
  });
  data.setItemGraphicEl(dataIndex, null);
}

function getShapeStr(data, symbolMeta) {
  return [data.getItemVisual(symbolMeta.dataIndex, 'symbol') || 'none', !!symbolMeta.symbolRepeat, !!symbolMeta.symbolClip].join(':');
}

function eachPath(bar, cb, context) {
  // Do not use Group#eachChild, because it do not support remove.
  zrUtil.each(bar.__pictorialBundle.children(), function (el) {
    el !== bar.__pictorialBarRect && cb.call(context, el);
  });
}

function updateAttr(el, immediateAttrs, animationAttrs, symbolMeta, isUpdate, cb) {
  immediateAttrs && el.attr(immediateAttrs); // when symbolCip used, only clip path has init animation, otherwise it would be weird effect.

  if (symbolMeta.symbolClip && !isUpdate) {
    animationAttrs && el.attr(animationAttrs);
  } else {
    animationAttrs && graphic[isUpdate ? 'updateProps' : 'initProps'](el, animationAttrs, symbolMeta.animationModel, symbolMeta.dataIndex, cb);
  }
}

function updateCommon(bar, opt, symbolMeta) {
  var color = symbolMeta.color;
  var dataIndex = symbolMeta.dataIndex;
  var itemModel = symbolMeta.itemModel; // Color must be excluded.
  // Because symbol provide setColor individually to set fill and stroke

  var normalStyle = itemModel.getModel('itemStyle').getItemStyle(['color']);
  var hoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
  var cursorStyle = itemModel.getShallow('cursor');
  eachPath(bar, function (path) {
    // PENDING setColor should be before setStyle!!!
    path.setColor(color);
    path.setStyle(zrUtil.defaults({
      fill: color,
      opacity: symbolMeta.opacity
    }, normalStyle));
    graphic.setHoverStyle(path, hoverStyle);
    cursorStyle && (path.cursor = cursorStyle);
    path.z2 = symbolMeta.z2;
  });
  var barRectHoverStyle = {};
  var barPositionOutside = opt.valueDim.posDesc[+(symbolMeta.boundingLength > 0)];
  var barRect = bar.__pictorialBarRect;
  setLabel(barRect.style, barRectHoverStyle, itemModel, color, opt.seriesModel, dataIndex, barPositionOutside);
  graphic.setHoverStyle(barRect, barRectHoverStyle);
}

function toIntTimes(times) {
  var roundedTimes = Math.round(times); // Escapse accurate error

  return Math.abs(times - roundedTimes) < 1e-4 ? roundedTimes : Math.ceil(times);
}

var _default = BarView;
module.exports = _default;

/***/ }),

/***/ "49e8":
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

/**
 * @payload
 * @property {string} [componentType=series]
 * @property {number} [dx]
 * @property {number} [dy]
 * @property {number} [zoom]
 * @property {number} [originX]
 * @property {number} [originY]
 */
echarts.registerAction({
  type: 'geoRoam',
  event: 'geoRoam',
  update: 'updateTransform'
}, function (payload, ecModel) {
  var componentType = payload.componentType || 'series';
  ecModel.eachComponent({
    mainType: componentType,
    query: payload
  }, function (componentModel) {
    var geo = componentModel.coordinateSystem;

    if (geo.type !== 'geo') {
      return;
    }

    var res = updateCenterAndZoom(geo, payload, componentModel.get('scaleLimit'));
    componentModel.setCenter && componentModel.setCenter(res.center);
    componentModel.setZoom && componentModel.setZoom(res.zoom); // All map series with same `map` use the same geo coordinate system
    // So the center and zoom must be in sync. Include the series not selected by legend

    if (componentType === 'series') {
      zrUtil.each(componentModel.seriesGroup, function (seriesModel) {
        seriesModel.setCenter(res.center);
        seriesModel.setZoom(res.zoom);
      });
    }
  });
});

/***/ }),

/***/ "4c99":
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

var createRenderPlanner = __webpack_require__("cccd");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var positiveBorderColorQuery = ['itemStyle', 'borderColor'];
var negativeBorderColorQuery = ['itemStyle', 'borderColor0'];
var positiveColorQuery = ['itemStyle', 'color'];
var negativeColorQuery = ['itemStyle', 'color0'];
var _default = {
  seriesType: 'candlestick',
  plan: createRenderPlanner(),
  // For legend.
  performRawSeries: true,
  reset: function (seriesModel, ecModel) {
    var data = seriesModel.getData();
    var isLargeRender = seriesModel.pipelineContext.large;
    data.setVisual({
      legendSymbol: 'roundRect',
      colorP: getColor(1, seriesModel),
      colorN: getColor(-1, seriesModel),
      borderColorP: getBorderColor(1, seriesModel),
      borderColorN: getBorderColor(-1, seriesModel)
    }); // Only visible series has each data be visual encoded

    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }

    return !isLargeRender && {
      progress: progress
    };

    function progress(params, data) {
      var dataIndex;

      while ((dataIndex = params.next()) != null) {
        var itemModel = data.getItemModel(dataIndex);
        var sign = data.getItemLayout(dataIndex).sign;
        data.setItemVisual(dataIndex, {
          color: getColor(sign, itemModel),
          borderColor: getBorderColor(sign, itemModel)
        });
      }
    }

    function getColor(sign, model) {
      return model.get(sign > 0 ? positiveColorQuery : negativeColorQuery);
    }

    function getBorderColor(sign, model) {
      return model.get(sign > 0 ? positiveBorderColorQuery : negativeBorderColorQuery);
    }
  }
};
module.exports = _default;

/***/ }),

/***/ "67cc":
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

var graphic = __webpack_require__("2306");

var _helper = __webpack_require__("e7aa");

var setLabel = _helper.setLabel;

var Model = __webpack_require__("4319");

var barItemStyle = __webpack_require__("b5c7");

var Path = __webpack_require__("cbe5");

var _throttle = __webpack_require__("88b3");

var throttle = _throttle.throttle;

var _createClipPathFromCoordSys = __webpack_require__("b0af");

var createClipPath = _createClipPathFromCoordSys.createClipPath;

var Sausage = __webpack_require__("c2be");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'barBorderWidth'];
var _eventPos = [0, 0]; // FIXME
// Just for compatible with ec2.

zrUtil.extend(Model.prototype, barItemStyle);

function getClipArea(coord, data) {
  var coordSysClipArea = coord.getArea && coord.getArea();

  if (coord.type === 'cartesian2d') {
    var baseAxis = coord.getBaseAxis(); // When boundaryGap is false or using time axis. bar may exceed the grid.
    // We should not clip this part.
    // See test/bar2.html

    if (baseAxis.type !== 'category' || !baseAxis.onBand) {
      var expandWidth = data.getLayout('bandWidth');

      if (baseAxis.isHorizontal()) {
        coordSysClipArea.x -= expandWidth;
        coordSysClipArea.width += expandWidth * 2;
      } else {
        coordSysClipArea.y -= expandWidth;
        coordSysClipArea.height += expandWidth * 2;
      }
    }
  }

  return coordSysClipArea;
}

var _default = echarts.extendChartView({
  type: 'bar',
  render: function (seriesModel, ecModel, api) {
    this._updateDrawMode(seriesModel);

    var coordinateSystemType = seriesModel.get('coordinateSystem');

    if (coordinateSystemType === 'cartesian2d' || coordinateSystemType === 'polar') {
      this._isLargeDraw ? this._renderLarge(seriesModel, ecModel, api) : this._renderNormal(seriesModel, ecModel, api);
    } else {}

    return this.group;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this._clear();

    this._updateDrawMode(seriesModel);
  },
  incrementalRender: function (params, seriesModel, ecModel, api) {
    // Do not support progressive in normal mode.
    this._incrementalRenderLarge(params, seriesModel);
  },
  _updateDrawMode: function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;

    if (this._isLargeDraw == null || isLargeDraw ^ this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;

      this._clear();
    }
  },
  _renderNormal: function (seriesModel, ecModel, api) {
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coord = seriesModel.coordinateSystem;
    var baseAxis = coord.getBaseAxis();
    var isHorizontalOrRadial;

    if (coord.type === 'cartesian2d') {
      isHorizontalOrRadial = baseAxis.isHorizontal();
    } else if (coord.type === 'polar') {
      isHorizontalOrRadial = baseAxis.dim === 'angle';
    }

    var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
    var needsClip = seriesModel.get('clip', true);
    var coordSysClipArea = getClipArea(coord, data); // If there is clipPath created in large mode. Remove it.

    group.removeClipPath(); // We don't use clipPath in normal mode because we needs a perfect animation
    // And don't want the label are clipped.

    var roundCap = seriesModel.get('roundCap', true);
    data.diff(oldData).add(function (dataIndex) {
      if (!data.hasValue(dataIndex)) {
        return;
      }

      var itemModel = data.getItemModel(dataIndex);
      var layout = getLayout[coord.type](data, dataIndex, itemModel);

      if (needsClip) {
        // Clip will modify the layout params.
        // And return a boolean to determine if the shape are fully clipped.
        var isClipped = clip[coord.type](coordSysClipArea, layout);

        if (isClipped) {
          group.remove(el);
          return;
        }
      }

      var el = elementCreator[coord.type](dataIndex, layout, isHorizontalOrRadial, animationModel, false, roundCap);
      data.setItemGraphicEl(dataIndex, el);
      group.add(el);
      updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
    }).update(function (newIndex, oldIndex) {
      var el = oldData.getItemGraphicEl(oldIndex);

      if (!data.hasValue(newIndex)) {
        group.remove(el);
        return;
      }

      var itemModel = data.getItemModel(newIndex);
      var layout = getLayout[coord.type](data, newIndex, itemModel);

      if (needsClip) {
        var isClipped = clip[coord.type](coordSysClipArea, layout);

        if (isClipped) {
          group.remove(el);
          return;
        }
      }

      if (el) {
        graphic.updateProps(el, {
          shape: layout
        }, animationModel, newIndex);
      } else {
        el = elementCreator[coord.type](newIndex, layout, isHorizontalOrRadial, animationModel, true, roundCap);
      }

      data.setItemGraphicEl(newIndex, el); // Add back

      group.add(el);
      updateStyle(el, data, newIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
    }).remove(function (dataIndex) {
      var el = oldData.getItemGraphicEl(dataIndex);

      if (coord.type === 'cartesian2d') {
        el && removeRect(dataIndex, animationModel, el);
      } else {
        el && removeSector(dataIndex, animationModel, el);
      }
    }).execute();
    this._data = data;
  },
  _renderLarge: function (seriesModel, ecModel, api) {
    this._clear();

    createLarge(seriesModel, this.group); // Use clipPath in large mode.

    var clipPath = seriesModel.get('clip', true) ? createClipPath(seriesModel.coordinateSystem, false, seriesModel) : null;

    if (clipPath) {
      this.group.setClipPath(clipPath);
    } else {
      this.group.removeClipPath();
    }
  },
  _incrementalRenderLarge: function (params, seriesModel) {
    createLarge(seriesModel, this.group, true);
  },
  dispose: zrUtil.noop,
  remove: function (ecModel) {
    this._clear(ecModel);
  },
  _clear: function (ecModel) {
    var group = this.group;
    var data = this._data;

    if (ecModel && ecModel.get('animation') && data && !this._isLargeDraw) {
      data.eachItemGraphicEl(function (el) {
        if (el.type === 'sector') {
          removeSector(el.dataIndex, ecModel, el);
        } else {
          removeRect(el.dataIndex, ecModel, el);
        }
      });
    } else {
      group.removeAll();
    }

    this._data = null;
  }
});

var mathMax = Math.max;
var mathMin = Math.min;
var clip = {
  cartesian2d: function (coordSysBoundingRect, layout) {
    var signWidth = layout.width < 0 ? -1 : 1;
    var signHeight = layout.height < 0 ? -1 : 1; // Needs positive width and height

    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }

    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }

    var x = mathMax(layout.x, coordSysBoundingRect.x);
    var x2 = mathMin(layout.x + layout.width, coordSysBoundingRect.x + coordSysBoundingRect.width);
    var y = mathMax(layout.y, coordSysBoundingRect.y);
    var y2 = mathMin(layout.y + layout.height, coordSysBoundingRect.y + coordSysBoundingRect.height);
    layout.x = x;
    layout.y = y;
    layout.width = x2 - x;
    layout.height = y2 - y;
    var clipped = layout.width < 0 || layout.height < 0; // Reverse back

    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }

    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }

    return clipped;
  },
  polar: function (coordSysClipArea) {
    return false;
  }
};
var elementCreator = {
  cartesian2d: function (dataIndex, layout, isHorizontal, animationModel, isUpdate) {
    var rect = new graphic.Rect({
      shape: zrUtil.extend({}, layout)
    }); // Animation

    if (animationModel) {
      var rectShape = rect.shape;
      var animateProperty = isHorizontal ? 'height' : 'width';
      var animateTarget = {};
      rectShape[animateProperty] = 0;
      animateTarget[animateProperty] = layout[animateProperty];
      graphic[isUpdate ? 'updateProps' : 'initProps'](rect, {
        shape: animateTarget
      }, animationModel, dataIndex);
    }

    return rect;
  },
  polar: function (dataIndex, layout, isRadial, animationModel, isUpdate, roundCap) {
    // Keep the same logic with bar in catesion: use end value to control
    // direction. Notice that if clockwise is true (by default), the sector
    // will always draw clockwisely, no matter whether endAngle is greater
    // or less than startAngle.
    var clockwise = layout.startAngle < layout.endAngle;
    var ShapeClass = !isRadial && roundCap ? Sausage : graphic.Sector;
    var sector = new ShapeClass({
      shape: zrUtil.defaults({
        clockwise: clockwise
      }, layout)
    }); // Animation

    if (animationModel) {
      var sectorShape = sector.shape;
      var animateProperty = isRadial ? 'r' : 'endAngle';
      var animateTarget = {};
      sectorShape[animateProperty] = isRadial ? 0 : layout.startAngle;
      animateTarget[animateProperty] = layout[animateProperty];
      graphic[isUpdate ? 'updateProps' : 'initProps'](sector, {
        shape: animateTarget
      }, animationModel, dataIndex);
    }

    return sector;
  }
};

function removeRect(dataIndex, animationModel, el) {
  // Not show text when animating
  el.style.text = null;
  graphic.updateProps(el, {
    shape: {
      width: 0
    }
  }, animationModel, dataIndex, function () {
    el.parent && el.parent.remove(el);
  });
}

function removeSector(dataIndex, animationModel, el) {
  // Not show text when animating
  el.style.text = null;
  graphic.updateProps(el, {
    shape: {
      r: el.shape.r0
    }
  }, animationModel, dataIndex, function () {
    el.parent && el.parent.remove(el);
  });
}

var getLayout = {
  cartesian2d: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    var fixedLineWidth = getLineWidth(itemModel, layout); // fix layout with lineWidth

    var signX = layout.width > 0 ? 1 : -1;
    var signY = layout.height > 0 ? 1 : -1;
    return {
      x: layout.x + signX * fixedLineWidth / 2,
      y: layout.y + signY * fixedLineWidth / 2,
      width: layout.width - signX * fixedLineWidth,
      height: layout.height - signY * fixedLineWidth
    };
  },
  polar: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    return {
      cx: layout.cx,
      cy: layout.cy,
      r0: layout.r0,
      r: layout.r,
      startAngle: layout.startAngle,
      endAngle: layout.endAngle
    };
  }
};

function isZeroOnPolar(layout) {
  return layout.startAngle != null && layout.endAngle != null && layout.startAngle === layout.endAngle;
}

function updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal, isPolar) {
  var color = data.getItemVisual(dataIndex, 'color');
  var opacity = data.getItemVisual(dataIndex, 'opacity');
  var stroke = data.getVisual('borderColor');
  var itemStyleModel = itemModel.getModel('itemStyle');
  var hoverStyle = itemModel.getModel('emphasis.itemStyle').getBarItemStyle();

  if (!isPolar) {
    el.setShape('r', itemStyleModel.get('barBorderRadius') || 0);
  }

  el.useStyle(zrUtil.defaults({
    stroke: isZeroOnPolar(layout) ? 'none' : stroke,
    fill: isZeroOnPolar(layout) ? 'none' : color,
    opacity: opacity
  }, itemStyleModel.getBarItemStyle()));
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && el.attr('cursor', cursorStyle);
  var labelPositionOutside = isHorizontal ? layout.height > 0 ? 'bottom' : 'top' : layout.width > 0 ? 'left' : 'right';

  if (!isPolar) {
    setLabel(el.style, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside);
  }

  if (isZeroOnPolar(layout)) {
    hoverStyle.fill = hoverStyle.stroke = 'none';
  }

  graphic.setHoverStyle(el, hoverStyle);
} // In case width or height are too small.


function getLineWidth(itemModel, rawLayout) {
  var lineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
  return Math.min(lineWidth, Math.abs(rawLayout.width), Math.abs(rawLayout.height));
}

var LargePath = Path.extend({
  type: 'largeBar',
  shape: {
    points: []
  },
  buildPath: function (ctx, shape) {
    // Drawing lines is more efficient than drawing
    // a whole line or drawing rects.
    var points = shape.points;
    var startPoint = this.__startPoint;
    var baseDimIdx = this.__baseDimIdx;

    for (var i = 0; i < points.length; i += 2) {
      startPoint[baseDimIdx] = points[i + baseDimIdx];
      ctx.moveTo(startPoint[0], startPoint[1]);
      ctx.lineTo(points[i], points[i + 1]);
    }
  }
});

function createLarge(seriesModel, group, incremental) {
  // TODO support polar
  var data = seriesModel.getData();
  var startPoint = [];
  var baseDimIdx = data.getLayout('valueAxisHorizontal') ? 1 : 0;
  startPoint[1 - baseDimIdx] = data.getLayout('valueAxisStart');
  var el = new LargePath({
    shape: {
      points: data.getLayout('largePoints')
    },
    incremental: !!incremental,
    __startPoint: startPoint,
    __baseDimIdx: baseDimIdx,
    __largeDataIndices: data.getLayout('largeDataIndices'),
    __barWidth: data.getLayout('barWidth')
  });
  group.add(el);
  setLargeStyle(el, seriesModel, data); // Enable tooltip and user mouse/touch event handlers.

  el.seriesIndex = seriesModel.seriesIndex;

  if (!seriesModel.get('silent')) {
    el.on('mousedown', largePathUpdateDataIndex);
    el.on('mousemove', largePathUpdateDataIndex);
  }
} // Use throttle to avoid frequently traverse to find dataIndex.


var largePathUpdateDataIndex = throttle(function (event) {
  var largePath = this;
  var dataIndex = largePathFindDataIndex(largePath, event.offsetX, event.offsetY);
  largePath.dataIndex = dataIndex >= 0 ? dataIndex : null;
}, 30, false);

function largePathFindDataIndex(largePath, x, y) {
  var baseDimIdx = largePath.__baseDimIdx;
  var valueDimIdx = 1 - baseDimIdx;
  var points = largePath.shape.points;
  var largeDataIndices = largePath.__largeDataIndices;
  var barWidthHalf = Math.abs(largePath.__barWidth / 2);
  var startValueVal = largePath.__startPoint[valueDimIdx];
  _eventPos[0] = x;
  _eventPos[1] = y;
  var pointerBaseVal = _eventPos[baseDimIdx];
  var pointerValueVal = _eventPos[1 - baseDimIdx];
  var baseLowerBound = pointerBaseVal - barWidthHalf;
  var baseUpperBound = pointerBaseVal + barWidthHalf;

  for (var i = 0, len = points.length / 2; i < len; i++) {
    var ii = i * 2;
    var barBaseVal = points[ii + baseDimIdx];
    var barValueVal = points[ii + valueDimIdx];

    if (barBaseVal >= baseLowerBound && barBaseVal <= baseUpperBound && (startValueVal <= barValueVal ? pointerValueVal >= startValueVal && pointerValueVal <= barValueVal : pointerValueVal >= barValueVal && pointerValueVal <= startValueVal)) {
      return largeDataIndices[i];
    }
  }

  return -1;
}

function setLargeStyle(el, seriesModel, data) {
  var borderColor = data.getVisual('borderColor') || data.getVisual('color');
  var itemStyle = seriesModel.getModel('itemStyle').getItemStyle(['color', 'borderColor']);
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor;
  el.style.lineWidth = data.getLayout('barWidth');
}

module.exports = _default;

/***/ }),

/***/ "7782":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType, actionInfos) {
  zrUtil.each(actionInfos, function (actionInfo) {
    actionInfo.update = 'updateView';
    /**
     * @payload
     * @property {string} seriesName
     * @property {string} name
     */

    echarts.registerAction(actionInfo, function (payload, ecModel) {
      var selected = {};
      ecModel.eachComponent({
        mainType: 'series',
        subType: seriesType,
        query: payload
      }, function (seriesModel) {
        if (seriesModel[actionInfo.method]) {
          seriesModel[actionInfo.method](payload.name, payload.dataIndex);
        }

        var data = seriesModel.getData(); // Create selected map

        data.each(function (idx) {
          var name = data.getName(idx);
          selected[name] = seriesModel.isSelected(name) || false;
        });
      });
      return {
        name: payload.name,
        selected: selected,
        seriesId: payload.seriesId
      };
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "843e":
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
var echartsAPIList = ['getDom', 'getZr', 'getWidth', 'getHeight', 'getDevicePixelRatio', 'dispatchAction', 'isDisposed', 'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption', 'getViewOfComponentModel', 'getViewOfSeriesModel']; // And `getCoordinateSystems` and `getComponentByElement` will be injected in echarts.js

function ExtensionAPI(chartInstance) {
  zrUtil.each(echartsAPIList, function (name) {
    this[name] = zrUtil.bind(chartInstance[name], chartInstance);
  }, this);
}

var _default = ExtensionAPI;
module.exports = _default;

/***/ }),

/***/ "94b1":
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

var _barGrid = __webpack_require__("9d57");

var layout = _barGrid.layout;
var largeLayout = _barGrid.largeLayout;

__webpack_require__("5aa9");

__webpack_require__("17b8");

__webpack_require__("67cc");

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
echarts.registerLayout(echarts.PRIORITY.VISUAL.LAYOUT, zrUtil.curry(layout, 'bar')); // Use higher prority to avoid to be blocked by other overall layout, which do not
// only exist in this module, but probably also exist in other modules, like `barPolar`.

echarts.registerLayout(echarts.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, largeLayout);
echarts.registerVisual({
  seriesType: 'bar',
  reset: function (seriesModel) {
    // Visual coding for legend
    seriesModel.getData().setVisual('legendSymbol', 'roundRect');
  }
});

/***/ }),

/***/ "b5c7":
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
var getBarItemStyle = makeStyleMapper([['fill', 'color'], ['stroke', 'borderColor'], ['lineWidth', 'borderWidth'], // Compatitable with 2
['stroke', 'barBorderColor'], ['lineWidth', 'barBorderWidth'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);
var _default = {
  getBarItemStyle: function (excludes) {
    var style = getBarItemStyle(this, excludes);

    if (this.getBorderLineDash) {
      var lineDash = this.getBorderLineDash();
      lineDash && (style.lineDash = lineDash);
    }

    return style;
  }
};
module.exports = _default;

/***/ }),

/***/ "bd92":
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

var _whiskerBoxCommon = __webpack_require__("e468");

var seriesModelMixin = _whiskerBoxCommon.seriesModelMixin;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var CandlestickSeries = SeriesModel.extend({
  type: 'series.candlestick',
  dependencies: ['xAxis', 'yAxis', 'grid'],

  /**
   * @readOnly
   */
  defaultValueDimensions: [{
    name: 'open',
    defaultTooltip: true
  }, {
    name: 'close',
    defaultTooltip: true
  }, {
    name: 'lowest',
    defaultTooltip: true
  }, {
    name: 'highest',
    defaultTooltip: true
  }],

  /**
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: null,

  /**
   * @override
   */
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    hoverAnimation: true,
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    layout: null,
    // 'horizontal' or 'vertical'
    clip: true,
    itemStyle: {
      color: '#c23531',
      // 阳线 positive
      color0: '#314656',
      // 阴线 negative     '#c23531', '#314656'
      borderWidth: 1,
      // FIXME
      // ec2中使用的是lineStyle.color 和 lineStyle.color0
      borderColor: '#c23531',
      borderColor0: '#314656'
    },
    emphasis: {
      itemStyle: {
        borderWidth: 2
      }
    },
    barMaxWidth: null,
    barMinWidth: null,
    barWidth: null,
    large: true,
    largeThreshold: 600,
    progressive: 3e3,
    progressiveThreshold: 1e4,
    progressiveChunkMode: 'mod',
    animationUpdate: false,
    animationEasing: 'linear',
    animationDuration: 300
  },

  /**
   * Get dimension for shadow in dataZoom
   * @return {string} dimension name
   */
  getShadowDim: function () {
    return 'open';
  },
  brushSelector: function (dataIndex, data, selectors) {
    var itemLayout = data.getItemLayout(dataIndex);
    return itemLayout && selectors.rect(itemLayout.brushRect);
  }
});
zrUtil.mixin(CandlestickSeries, seriesModelMixin, true);
var _default = CandlestickSeries;
module.exports = _default;

/***/ }),

/***/ "d6d9":
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

var BaseBarSeries = __webpack_require__("3014");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PictorialBarSeries = BaseBarSeries.extend({
  type: 'series.pictorialBar',
  dependencies: ['grid'],
  defaultOption: {
    symbol: 'circle',
    // Customized bar shape
    symbolSize: null,
    // Can be ['100%', '100%'], null means auto.
    symbolRotate: null,
    symbolPosition: null,
    // 'start' or 'end' or 'center', null means auto.
    symbolOffset: null,
    symbolMargin: null,
    // start margin and end margin. Can be a number or a percent string.
    // Auto margin by defualt.
    symbolRepeat: false,
    // false/null/undefined, means no repeat.
    // Can be true, means auto calculate repeat times and cut by data.
    // Can be a number, specifies repeat times, and do not cut by data.
    // Can be 'fixed', means auto calculate repeat times but do not cut by data.
    symbolRepeatDirection: 'end',
    // 'end' means from 'start' to 'end'.
    symbolClip: false,
    symbolBoundingData: null,
    // Can be 60 or -40 or [-40, 60]
    symbolPatternSize: 400,
    // 400 * 400 px
    barGap: '-100%',
    // In most case, overlap is needed.
    // z can be set in data item, which is z2 actually.
    // Disable progressive
    progressive: 0,
    hoverAnimation: false // Open only when needed.

  },
  getInitialData: function (option) {
    // Disable stack.
    option.stack = null;
    return PictorialBarSeries.superApply(this, 'getInitialData', arguments);
  }
});
var _default = PictorialBarSeries;
module.exports = _default;

/***/ }),

/***/ "d81e":
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
 * @param {module:echarts/coord/View} view
 * @param {Object} payload
 * @param {Object} [zoomLimit]
 */
function updateCenterAndZoom(view, payload, zoomLimit) {
  var previousZoom = view.getZoom();
  var center = view.getCenter();
  var zoom = payload.zoom;
  var point = view.dataToPoint(center);

  if (payload.dx != null && payload.dy != null) {
    point[0] -= payload.dx;
    point[1] -= payload.dy;
    var center = view.pointToData(point);
    view.setCenter(center);
  }

  if (zoom != null) {
    if (zoomLimit) {
      var zoomMin = zoomLimit.min || 0;
      var zoomMax = zoomLimit.max || Infinity;
      zoom = Math.max(Math.min(previousZoom * zoom, zoomMax), zoomMin) / previousZoom;
    } // Zoom on given point(originX, originY)


    view.scale[0] *= zoom;
    view.scale[1] *= zoom;
    var position = view.position;
    var fixX = (payload.originX - position[0]) * (zoom - 1);
    var fixY = (payload.originY - position[1]) * (zoom - 1);
    position[0] -= fixX;
    position[1] -= fixY;
    view.updateTransform(); // Get the new center

    var center = view.pointToData(point);
    view.setCenter(center);
    view.setZoom(zoom * previousZoom);
  }

  return {
    center: view.getCenter(),
    zoom: view.getZoom()
  };
}

exports.updateCenterAndZoom = updateCenterAndZoom;

/***/ }),

/***/ "dcea":
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

var graphic = __webpack_require__("2306");

var Path = __webpack_require__("cbe5");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Update common properties
var NORMAL_ITEM_STYLE_PATH = ['itemStyle'];
var EMPHASIS_ITEM_STYLE_PATH = ['emphasis', 'itemStyle'];
var BoxplotView = ChartView.extend({
  type: 'boxplot',
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var group = this.group;
    var oldData = this._data; // There is no old data only when first rendering or switching from
    // stream mode to normal mode, where previous elements should be removed.

    if (!this._data) {
      group.removeAll();
    }

    var constDim = seriesModel.get('layout') === 'horizontal' ? 1 : 0;
    data.diff(oldData).add(function (newIdx) {
      if (data.hasValue(newIdx)) {
        var itemLayout = data.getItemLayout(newIdx);
        var symbolEl = createNormalBox(itemLayout, data, newIdx, constDim, true);
        data.setItemGraphicEl(newIdx, symbolEl);
        group.add(symbolEl);
      }
    }).update(function (newIdx, oldIdx) {
      var symbolEl = oldData.getItemGraphicEl(oldIdx); // Empty data

      if (!data.hasValue(newIdx)) {
        group.remove(symbolEl);
        return;
      }

      var itemLayout = data.getItemLayout(newIdx);

      if (!symbolEl) {
        symbolEl = createNormalBox(itemLayout, data, newIdx, constDim);
      } else {
        updateNormalBoxData(itemLayout, symbolEl, data, newIdx);
      }

      group.add(symbolEl);
      data.setItemGraphicEl(newIdx, symbolEl);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && group.remove(el);
    }).execute();
    this._data = data;
  },
  remove: function (ecModel) {
    var group = this.group;
    var data = this._data;
    this._data = null;
    data && data.eachItemGraphicEl(function (el) {
      el && group.remove(el);
    });
  },
  dispose: zrUtil.noop
});
var BoxPath = Path.extend({
  type: 'boxplotBoxPath',
  shape: {},
  buildPath: function (ctx, shape) {
    var ends = shape.points;
    var i = 0;
    ctx.moveTo(ends[i][0], ends[i][1]);
    i++;

    for (; i < 4; i++) {
      ctx.lineTo(ends[i][0], ends[i][1]);
    }

    ctx.closePath();

    for (; i < ends.length; i++) {
      ctx.moveTo(ends[i][0], ends[i][1]);
      i++;
      ctx.lineTo(ends[i][0], ends[i][1]);
    }
  }
});

function createNormalBox(itemLayout, data, dataIndex, constDim, isInit) {
  var ends = itemLayout.ends;
  var el = new BoxPath({
    shape: {
      points: isInit ? transInit(ends, constDim, itemLayout) : ends
    }
  });
  updateNormalBoxData(itemLayout, el, data, dataIndex, isInit);
  return el;
}

function updateNormalBoxData(itemLayout, el, data, dataIndex, isInit) {
  var seriesModel = data.hostModel;
  var updateMethod = graphic[isInit ? 'initProps' : 'updateProps'];
  updateMethod(el, {
    shape: {
      points: itemLayout.ends
    }
  }, seriesModel, dataIndex);
  var itemModel = data.getItemModel(dataIndex);
  var normalItemStyleModel = itemModel.getModel(NORMAL_ITEM_STYLE_PATH);
  var borderColor = data.getItemVisual(dataIndex, 'color'); // Exclude borderColor.

  var itemStyle = normalItemStyleModel.getItemStyle(['borderColor']);
  itemStyle.stroke = borderColor;
  itemStyle.strokeNoScale = true;
  el.useStyle(itemStyle);
  el.z2 = 100;
  var hoverStyle = itemModel.getModel(EMPHASIS_ITEM_STYLE_PATH).getItemStyle();
  graphic.setHoverStyle(el, hoverStyle);
}

function transInit(points, dim, itemLayout) {
  return zrUtil.map(points, function (point) {
    point = point.slice();
    point[dim] = itemLayout.initBaseline;
    return point;
  });
}

var _default = BoxplotView;
module.exports = _default;

/***/ }),

/***/ "e057":
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

var graphicUtil = __webpack_require__("2306");

var _labelHelper = __webpack_require__("c775");

var getDefaultLabel = _labelHelper.getDefaultLabel;

var createListFromArray = __webpack_require__("3301");

var _barGrid = __webpack_require__("9d57");

var getLayoutOnAxis = _barGrid.getLayoutOnAxis;

var DataDiffer = __webpack_require__("80f0");

var SeriesModel = __webpack_require__("4f85");

var Model = __webpack_require__("4319");

var ChartView = __webpack_require__("e887");

var _createClipPathFromCoordSys = __webpack_require__("b0af");

var createClipPath = _createClipPathFromCoordSys.createClipPath;

var prepareCartesian2d = __webpack_require__("aa3e");

var prepareGeo = __webpack_require__("00d8");

var prepareSingleAxis = __webpack_require__("307b");

var preparePolar = __webpack_require__("eaeb");

var prepareCalendar = __webpack_require__("471e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var CACHED_LABEL_STYLE_PROPERTIES = graphicUtil.CACHED_LABEL_STYLE_PROPERTIES;
var ITEM_STYLE_NORMAL_PATH = ['itemStyle'];
var ITEM_STYLE_EMPHASIS_PATH = ['emphasis', 'itemStyle'];
var LABEL_NORMAL = ['label'];
var LABEL_EMPHASIS = ['emphasis', 'label']; // Use prefix to avoid index to be the same as el.name,
// which will cause weird udpate animation.

var GROUP_DIFF_PREFIX = 'e\0\0';
/**
 * To reduce total package size of each coordinate systems, the modules `prepareCustom`
 * of each coordinate systems are not required by each coordinate systems directly, but
 * required by the module `custom`.
 *
 * prepareInfoForCustomSeries {Function}: optional
 *     @return {Object} {coordSys: {...}, api: {
 *         coord: function (data, clamp) {}, // return point in global.
 *         size: function (dataSize, dataItem) {} // return size of each axis in coordSys.
 *     }}
 */

var prepareCustoms = {
  cartesian2d: prepareCartesian2d,
  geo: prepareGeo,
  singleAxis: prepareSingleAxis,
  polar: preparePolar,
  calendar: prepareCalendar
}; // ------
// Model
// ------

SeriesModel.extend({
  type: 'series.custom',
  dependencies: ['grid', 'polar', 'geo', 'singleAxis', 'calendar'],
  defaultOption: {
    coordinateSystem: 'cartesian2d',
    // Can be set as 'none'
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    useTransform: true,
    // Custom series will not clip by default.
    // Some case will use custom series to draw label
    // For example https://echarts.apache.org/examples/en/editor.html?c=custom-gantt-flight
    // Only works on polar and cartesian2d coordinate system.
    clip: false // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // Polar coordinate system
    // polarIndex: 0,
    // Geo coordinate system
    // geoIndex: 0,
    // label: {}
    // itemStyle: {}

  },

  /**
   * @override
   */
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this);
  },

  /**
   * @override
   */
  getDataParams: function (dataIndex, dataType, el) {
    var params = SeriesModel.prototype.getDataParams.apply(this, arguments);
    el && (params.info = el.info);
    return params;
  }
}); // -----
// View
// -----

ChartView.extend({
  type: 'custom',

  /**
   * @private
   * @type {module:echarts/data/List}
   */
  _data: null,

  /**
   * @override
   */
  render: function (customSeries, ecModel, api, payload) {
    var oldData = this._data;
    var data = customSeries.getData();
    var group = this.group;
    var renderItem = makeRenderItem(customSeries, data, ecModel, api); // By default, merge mode is applied. In most cases, custom series is
    // used in the scenario that data amount is not large but graphic elements
    // is complicated, where merge mode is probably necessary for optimization.
    // For example, reuse graphic elements and only update the transform when
    // roam or data zoom according to `actionType`.

    data.diff(oldData).add(function (newIdx) {
      createOrUpdate(null, newIdx, renderItem(newIdx, payload), customSeries, group, data);
    }).update(function (newIdx, oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      createOrUpdate(el, newIdx, renderItem(newIdx, payload), customSeries, group, data);
    }).remove(function (oldIdx) {
      var el = oldData.getItemGraphicEl(oldIdx);
      el && group.remove(el);
    }).execute(); // Do clipping

    var clipPath = customSeries.get('clip', true) ? createClipPath(customSeries.coordinateSystem, false, customSeries) : null;

    if (clipPath) {
      group.setClipPath(clipPath);
    } else {
      group.removeClipPath();
    }

    this._data = data;
  },
  incrementalPrepareRender: function (customSeries, ecModel, api) {
    this.group.removeAll();
    this._data = null;
  },
  incrementalRender: function (params, customSeries, ecModel, api, payload) {
    var data = customSeries.getData();
    var renderItem = makeRenderItem(customSeries, data, ecModel, api);

    function setIncrementalAndHoverLayer(el) {
      if (!el.isGroup) {
        el.incremental = true;
        el.useHoverLayer = true;
      }
    }

    for (var idx = params.start; idx < params.end; idx++) {
      var el = createOrUpdate(null, idx, renderItem(idx, payload), customSeries, this.group, data);
      el.traverse(setIncrementalAndHoverLayer);
    }
  },

  /**
   * @override
   */
  dispose: zrUtil.noop,

  /**
   * @override
   */
  filterForExposedEvent: function (eventType, query, targetEl, packedEvent) {
    var elementName = query.element;

    if (elementName == null || targetEl.name === elementName) {
      return true;
    } // Enable to give a name on a group made by `renderItem`, and listen
    // events that triggerd by its descendents.


    while ((targetEl = targetEl.parent) && targetEl !== this.group) {
      if (targetEl.name === elementName) {
        return true;
      }
    }

    return false;
  }
});

function createEl(elOption) {
  var graphicType = elOption.type;
  var el; // Those graphic elements are not shapes. They should not be
  // overwritten by users, so do them first.

  if (graphicType === 'path') {
    var shape = elOption.shape; // Using pathRect brings convenience to users sacle svg path.

    var pathRect = shape.width != null && shape.height != null ? {
      x: shape.x || 0,
      y: shape.y || 0,
      width: shape.width,
      height: shape.height
    } : null;
    var pathData = getPathData(shape); // Path is also used for icon, so layout 'center' by default.

    el = graphicUtil.makePath(pathData, null, pathRect, shape.layout || 'center');
    el.__customPathData = pathData;
  } else if (graphicType === 'image') {
    el = new graphicUtil.Image({});
    el.__customImagePath = elOption.style.image;
  } else if (graphicType === 'text') {
    el = new graphicUtil.Text({});
    el.__customText = elOption.style.text;
  } else if (graphicType === 'group') {
    el = new graphicUtil.Group();
  } else if (graphicType === 'compoundPath') {
    throw new Error('"compoundPath" is not supported yet.');
  } else {
    var Clz = graphicUtil.getShapeClass(graphicType);
    el = new Clz();
  }

  el.__customGraphicType = graphicType;
  el.name = elOption.name;
  return el;
}

function updateEl(el, dataIndex, elOption, animatableModel, data, isInit, isRoot) {
  var transitionProps = {};
  var elOptionStyle = elOption.style || {};
  elOption.shape && (transitionProps.shape = zrUtil.clone(elOption.shape));
  elOption.position && (transitionProps.position = elOption.position.slice());
  elOption.scale && (transitionProps.scale = elOption.scale.slice());
  elOption.origin && (transitionProps.origin = elOption.origin.slice());
  elOption.rotation && (transitionProps.rotation = elOption.rotation);

  if (el.type === 'image' && elOption.style) {
    var targetStyle = transitionProps.style = {};
    zrUtil.each(['x', 'y', 'width', 'height'], function (prop) {
      prepareStyleTransition(prop, targetStyle, elOptionStyle, el.style, isInit);
    });
  }

  if (el.type === 'text' && elOption.style) {
    var targetStyle = transitionProps.style = {};
    zrUtil.each(['x', 'y'], function (prop) {
      prepareStyleTransition(prop, targetStyle, elOptionStyle, el.style, isInit);
    }); // Compatible with previous: both support
    // textFill and fill, textStroke and stroke in 'text' element.

    !elOptionStyle.hasOwnProperty('textFill') && elOptionStyle.fill && (elOptionStyle.textFill = elOptionStyle.fill);
    !elOptionStyle.hasOwnProperty('textStroke') && elOptionStyle.stroke && (elOptionStyle.textStroke = elOptionStyle.stroke);
  }

  if (el.type !== 'group') {
    el.useStyle(elOptionStyle); // Init animation.

    if (isInit) {
      el.style.opacity = 0;
      var targetOpacity = elOptionStyle.opacity;
      targetOpacity == null && (targetOpacity = 1);
      graphicUtil.initProps(el, {
        style: {
          opacity: targetOpacity
        }
      }, animatableModel, dataIndex);
    }
  }

  if (isInit) {
    el.attr(transitionProps);
  } else {
    graphicUtil.updateProps(el, transitionProps, animatableModel, dataIndex);
  } // Merge by default.
  // z2 must not be null/undefined, otherwise sort error may occur.


  elOption.hasOwnProperty('z2') && el.attr('z2', elOption.z2 || 0);
  elOption.hasOwnProperty('silent') && el.attr('silent', elOption.silent);
  elOption.hasOwnProperty('invisible') && el.attr('invisible', elOption.invisible);
  elOption.hasOwnProperty('ignore') && el.attr('ignore', elOption.ignore); // `elOption.info` enables user to mount some info on
  // elements and use them in event handlers.
  // Update them only when user specified, otherwise, remain.

  elOption.hasOwnProperty('info') && el.attr('info', elOption.info); // If `elOption.styleEmphasis` is `false`, remove hover style. The
  // logic is ensured by `graphicUtil.setElementHoverStyle`.

  var styleEmphasis = elOption.styleEmphasis; // hoverStyle should always be set here, because if the hover style
  // may already be changed, where the inner cache should be reset.

  graphicUtil.setElementHoverStyle(el, styleEmphasis);

  if (isRoot) {
    graphicUtil.setAsHighDownDispatcher(el, styleEmphasis !== false);
  }
}

function prepareStyleTransition(prop, targetStyle, elOptionStyle, oldElStyle, isInit) {
  if (elOptionStyle[prop] != null && !isInit) {
    targetStyle[prop] = elOptionStyle[prop];
    elOptionStyle[prop] = oldElStyle[prop];
  }
}

function makeRenderItem(customSeries, data, ecModel, api) {
  var renderItem = customSeries.get('renderItem');
  var coordSys = customSeries.coordinateSystem;
  var prepareResult = {};

  if (coordSys) {
    prepareResult = coordSys.prepareCustoms ? coordSys.prepareCustoms() : prepareCustoms[coordSys.type](coordSys);
  }

  var userAPI = zrUtil.defaults({
    getWidth: api.getWidth,
    getHeight: api.getHeight,
    getZr: api.getZr,
    getDevicePixelRatio: api.getDevicePixelRatio,
    value: value,
    style: style,
    styleEmphasis: styleEmphasis,
    visual: visual,
    barLayout: barLayout,
    currentSeriesIndices: currentSeriesIndices,
    font: font
  }, prepareResult.api || {});
  var userParams = {
    // The life cycle of context: current round of rendering.
    // The global life cycle is probably not necessary, because
    // user can store global status by themselves.
    context: {},
    seriesId: customSeries.id,
    seriesName: customSeries.name,
    seriesIndex: customSeries.seriesIndex,
    coordSys: prepareResult.coordSys,
    dataInsideLength: data.count(),
    encode: wrapEncodeDef(customSeries.getData())
  }; // Do not support call `api` asynchronously without dataIndexInside input.

  var currDataIndexInside;
  var currDirty = true;
  var currItemModel;
  var currLabelNormalModel;
  var currLabelEmphasisModel;
  var currVisualColor;
  return function (dataIndexInside, payload) {
    currDataIndexInside = dataIndexInside;
    currDirty = true;
    return renderItem && renderItem(zrUtil.defaults({
      dataIndexInside: dataIndexInside,
      dataIndex: data.getRawIndex(dataIndexInside),
      // Can be used for optimization when zoom or roam.
      actionType: payload ? payload.type : null
    }, userParams), userAPI);
  }; // Do not update cache until api called.

  function updateCache(dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);

    if (currDirty) {
      currItemModel = data.getItemModel(dataIndexInside);
      currLabelNormalModel = currItemModel.getModel(LABEL_NORMAL);
      currLabelEmphasisModel = currItemModel.getModel(LABEL_EMPHASIS);
      currVisualColor = data.getItemVisual(dataIndexInside, 'color');
      currDirty = false;
    }
  }
  /**
   * @public
   * @param {number|string} dim
   * @param {number} [dataIndexInside=currDataIndexInside]
   * @return {number|string} value
   */


  function value(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    return data.get(data.getDimension(dim || 0), dataIndexInside);
  }
  /**
   * By default, `visual` is applied to style (to support visualMap).
   * `visual.color` is applied at `fill`. If user want apply visual.color on `stroke`,
   * it can be implemented as:
   * `api.style({stroke: api.visual('color'), fill: null})`;
   * @public
   * @param {Object} [extra]
   * @param {number} [dataIndexInside=currDataIndexInside]
   */


  function style(extra, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    updateCache(dataIndexInside);
    var itemStyle = currItemModel.getModel(ITEM_STYLE_NORMAL_PATH).getItemStyle();
    currVisualColor != null && (itemStyle.fill = currVisualColor);
    var opacity = data.getItemVisual(dataIndexInside, 'opacity');
    opacity != null && (itemStyle.opacity = opacity);
    var labelModel = extra ? applyExtraBefore(extra, currLabelNormalModel) : currLabelNormalModel;
    graphicUtil.setTextStyle(itemStyle, labelModel, null, {
      autoColor: currVisualColor,
      isRectText: true
    });
    itemStyle.text = labelModel.getShallow('show') ? zrUtil.retrieve2(customSeries.getFormattedLabel(dataIndexInside, 'normal'), getDefaultLabel(data, dataIndexInside)) : null;
    extra && applyExtraAfter(itemStyle, extra);
    return itemStyle;
  }
  /**
   * @public
   * @param {Object} [extra]
   * @param {number} [dataIndexInside=currDataIndexInside]
   */


  function styleEmphasis(extra, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    updateCache(dataIndexInside);
    var itemStyle = currItemModel.getModel(ITEM_STYLE_EMPHASIS_PATH).getItemStyle();
    var labelModel = extra ? applyExtraBefore(extra, currLabelEmphasisModel) : currLabelEmphasisModel;
    graphicUtil.setTextStyle(itemStyle, labelModel, null, {
      isRectText: true
    }, true);
    itemStyle.text = labelModel.getShallow('show') ? zrUtil.retrieve3(customSeries.getFormattedLabel(dataIndexInside, 'emphasis'), customSeries.getFormattedLabel(dataIndexInside, 'normal'), getDefaultLabel(data, dataIndexInside)) : null;
    extra && applyExtraAfter(itemStyle, extra);
    return itemStyle;
  }
  /**
   * @public
   * @param {string} visualType
   * @param {number} [dataIndexInside=currDataIndexInside]
   */


  function visual(visualType, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    return data.getItemVisual(dataIndexInside, visualType);
  }
  /**
   * @public
   * @param {number} opt.count Positive interger.
   * @param {number} [opt.barWidth]
   * @param {number} [opt.barMaxWidth]
   * @param {number} [opt.barMinWidth]
   * @param {number} [opt.barGap]
   * @param {number} [opt.barCategoryGap]
   * @return {Object} {width, offset, offsetCenter} is not support, return undefined.
   */


  function barLayout(opt) {
    if (coordSys.getBaseAxis) {
      var baseAxis = coordSys.getBaseAxis();
      return getLayoutOnAxis(zrUtil.defaults({
        axis: baseAxis
      }, opt), api);
    }
  }
  /**
   * @public
   * @return {Array.<number>}
   */


  function currentSeriesIndices() {
    return ecModel.getCurrentSeriesIndices();
  }
  /**
   * @public
   * @param {Object} opt
   * @param {string} [opt.fontStyle]
   * @param {number} [opt.fontWeight]
   * @param {number} [opt.fontSize]
   * @param {string} [opt.fontFamily]
   * @return {string} font string
   */


  function font(opt) {
    return graphicUtil.getFont(opt, ecModel);
  }
}

function wrapEncodeDef(data) {
  var encodeDef = {};
  zrUtil.each(data.dimensions, function (dimName, dataDimIndex) {
    var dimInfo = data.getDimensionInfo(dimName);

    if (!dimInfo.isExtraCoord) {
      var coordDim = dimInfo.coordDim;
      var dataDims = encodeDef[coordDim] = encodeDef[coordDim] || [];
      dataDims[dimInfo.coordDimIndex] = dataDimIndex;
    }
  });
  return encodeDef;
}

function createOrUpdate(el, dataIndex, elOption, animatableModel, group, data) {
  el = doCreateOrUpdate(el, dataIndex, elOption, animatableModel, group, data, true);
  el && data.setItemGraphicEl(dataIndex, el);
  return el;
}

function doCreateOrUpdate(el, dataIndex, elOption, animatableModel, group, data, isRoot) {
  // [Rule]
  // By default, follow merge mode.
  //     (It probably brings benifit for performance in some cases of large data, where
  //     user program can be optimized to that only updated props needed to be re-calculated,
  //     or according to `actionType` some calculation can be skipped.)
  // If `renderItem` returns `null`/`undefined`/`false`, remove the previous el if existing.
  //     (It seems that violate the "merge" principle, but most of users probably intuitively
  //     regard "return;" as "show nothing element whatever", so make a exception to meet the
  //     most cases.)
  var simplyRemove = !elOption; // `null`/`undefined`/`false`

  elOption = elOption || {};
  var elOptionType = elOption.type;
  var elOptionShape = elOption.shape;
  var elOptionStyle = elOption.style;

  if (el && (simplyRemove // || elOption.$merge === false
  // If `elOptionType` is `null`, follow the merge principle.
  || elOptionType != null && elOptionType !== el.__customGraphicType || elOptionType === 'path' && hasOwnPathData(elOptionShape) && getPathData(elOptionShape) !== el.__customPathData || elOptionType === 'image' && hasOwn(elOptionStyle, 'image') && elOptionStyle.image !== el.__customImagePath // FIXME test and remove this restriction?
  || elOptionType === 'text' && hasOwn(elOptionShape, 'text') && elOptionStyle.text !== el.__customText)) {
    group.remove(el);
    el = null;
  } // `elOption.type` is undefined when `renderItem` returns nothing.


  if (simplyRemove) {
    return;
  }

  var isInit = !el;
  !el && (el = createEl(elOption));
  updateEl(el, dataIndex, elOption, animatableModel, data, isInit, isRoot);

  if (elOptionType === 'group') {
    mergeChildren(el, dataIndex, elOption, animatableModel, data);
  } // Always add whatever already added to ensure sequence.


  group.add(el);
  return el;
} // Usage:
// (1) By default, `elOption.$mergeChildren` is `'byIndex'`, which indicates that
//     the existing children will not be removed, and enables the feature that
//     update some of the props of some of the children simply by construct
//     the returned children of `renderItem` like:
//     `var children = group.children = []; children[3] = {opacity: 0.5};`
// (2) If `elOption.$mergeChildren` is `'byName'`, add/update/remove children
//     by child.name. But that might be lower performance.
// (3) If `elOption.$mergeChildren` is `false`, the existing children will be
//     replaced totally.
// (4) If `!elOption.children`, following the "merge" principle, nothing will happen.
//
// For implementation simpleness, do not provide a direct way to remove sinlge
// child (otherwise the total indicies of the children array have to be modified).
// User can remove a single child by set its `ignore` as `true` or replace
// it by another element, where its `$merge` can be set as `true` if necessary.


function mergeChildren(el, dataIndex, elOption, animatableModel, data) {
  var newChildren = elOption.children;
  var newLen = newChildren ? newChildren.length : 0;
  var mergeChildren = elOption.$mergeChildren; // `diffChildrenByName` has been deprecated.

  var byName = mergeChildren === 'byName' || elOption.diffChildrenByName;
  var notMerge = mergeChildren === false; // For better performance on roam update, only enter if necessary.

  if (!newLen && !byName && !notMerge) {
    return;
  }

  if (byName) {
    diffGroupChildren({
      oldChildren: el.children() || [],
      newChildren: newChildren || [],
      dataIndex: dataIndex,
      animatableModel: animatableModel,
      group: el,
      data: data
    });
    return;
  }

  notMerge && el.removeAll(); // Mapping children of a group simply by index, which
  // might be better performance.

  var index = 0;

  for (; index < newLen; index++) {
    newChildren[index] && doCreateOrUpdate(el.childAt(index), dataIndex, newChildren[index], animatableModel, el, data);
  }
}

function diffGroupChildren(context) {
  new DataDiffer(context.oldChildren, context.newChildren, getKey, getKey, context).add(processAddUpdate).update(processAddUpdate).remove(processRemove).execute();
}

function getKey(item, idx) {
  var name = item && item.name;
  return name != null ? name : GROUP_DIFF_PREFIX + idx;
}

function processAddUpdate(newIndex, oldIndex) {
  var context = this.context;
  var childOption = newIndex != null ? context.newChildren[newIndex] : null;
  var child = oldIndex != null ? context.oldChildren[oldIndex] : null;
  doCreateOrUpdate(child, context.dataIndex, childOption, context.animatableModel, context.group, context.data);
} // `graphic#applyDefaultTextStyle` will cache
// textFill, textStroke, textStrokeWidth.
// We have to do this trick.


function applyExtraBefore(extra, model) {
  var dummyModel = new Model({}, model);
  zrUtil.each(CACHED_LABEL_STYLE_PROPERTIES, function (stylePropName, modelPropName) {
    if (extra.hasOwnProperty(stylePropName)) {
      dummyModel.option[modelPropName] = extra[stylePropName];
    }
  });
  return dummyModel;
}

function applyExtraAfter(itemStyle, extra) {
  for (var key in extra) {
    if (extra.hasOwnProperty(key) || !CACHED_LABEL_STYLE_PROPERTIES.hasOwnProperty(key)) {
      itemStyle[key] = extra[key];
    }
  }
}

function processRemove(oldIndex) {
  var context = this.context;
  var child = context.oldChildren[oldIndex];
  child && context.group.remove(child);
}

function getPathData(shape) {
  // "d" follows the SVG convention.
  return shape && (shape.pathData || shape.d);
}

function hasOwnPathData(shape) {
  return shape && (shape.hasOwnProperty('pathData') || shape.hasOwnProperty('d'));
}

function hasOwn(host, prop) {
  return host && host.hasOwnProperty(prop);
}

/***/ }),

/***/ "e7aa":
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
function setLabel(normalStyle, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside) {
  var labelModel = itemModel.getModel('label');
  var hoverLabelModel = itemModel.getModel('emphasis.label');
  graphic.setLabelStyle(normalStyle, hoverStyle, labelModel, hoverLabelModel, {
    labelFetcher: seriesModel,
    labelDataIndex: dataIndex,
    defaultText: getDefaultLabel(seriesModel.getData(), dataIndex),
    isRectText: true,
    autoColor: color
  });
  fixPosition(normalStyle);
  fixPosition(hoverStyle);
}

function fixPosition(style, labelPositionOutside) {
  if (style.textPosition === 'outside') {
    style.textPosition = labelPositionOutside;
  }
}

exports.setLabel = setLabel;

/***/ }),

/***/ "eabf":
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
  if (!option || !zrUtil.isArray(option.series)) {
    return;
  } // Translate 'k' to 'candlestick'.


  zrUtil.each(option.series, function (seriesItem) {
    if (zrUtil.isObject(seriesItem) && seriesItem.type === 'k') {
      seriesItem.type = 'candlestick';
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "ecf8":
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
var each = zrUtil.each;

function _default(ecModel) {
  var groupResult = groupSeriesByAxis(ecModel);
  each(groupResult, function (groupItem) {
    var seriesModels = groupItem.seriesModels;

    if (!seriesModels.length) {
      return;
    }

    calculateBase(groupItem);
    each(seriesModels, function (seriesModel, idx) {
      layoutSingleSeries(seriesModel, groupItem.boxOffsetList[idx], groupItem.boxWidthList[idx]);
    });
  });
}
/**
 * Group series by axis.
 */


function groupSeriesByAxis(ecModel) {
  var result = [];
  var axisList = [];
  ecModel.eachSeriesByType('boxplot', function (seriesModel) {
    var baseAxis = seriesModel.getBaseAxis();
    var idx = zrUtil.indexOf(axisList, baseAxis);

    if (idx < 0) {
      idx = axisList.length;
      axisList[idx] = baseAxis;
      result[idx] = {
        axis: baseAxis,
        seriesModels: []
      };
    }

    result[idx].seriesModels.push(seriesModel);
  });
  return result;
}
/**
 * Calculate offset and box width for each series.
 */


function calculateBase(groupItem) {
  var extent;
  var baseAxis = groupItem.axis;
  var seriesModels = groupItem.seriesModels;
  var seriesCount = seriesModels.length;
  var boxWidthList = groupItem.boxWidthList = [];
  var boxOffsetList = groupItem.boxOffsetList = [];
  var boundList = [];
  var bandWidth;

  if (baseAxis.type === 'category') {
    bandWidth = baseAxis.getBandWidth();
  } else {
    var maxDataCount = 0;
    each(seriesModels, function (seriesModel) {
      maxDataCount = Math.max(maxDataCount, seriesModel.getData().count());
    });
    extent = baseAxis.getExtent(), Math.abs(extent[1] - extent[0]) / maxDataCount;
  }

  each(seriesModels, function (seriesModel) {
    var boxWidthBound = seriesModel.get('boxWidth');

    if (!zrUtil.isArray(boxWidthBound)) {
      boxWidthBound = [boxWidthBound, boxWidthBound];
    }

    boundList.push([parsePercent(boxWidthBound[0], bandWidth) || 0, parsePercent(boxWidthBound[1], bandWidth) || 0]);
  });
  var availableWidth = bandWidth * 0.8 - 2;
  var boxGap = availableWidth / seriesCount * 0.3;
  var boxWidth = (availableWidth - boxGap * (seriesCount - 1)) / seriesCount;
  var base = boxWidth / 2 - availableWidth / 2;
  each(seriesModels, function (seriesModel, idx) {
    boxOffsetList.push(base);
    base += boxGap + boxWidth;
    boxWidthList.push(Math.min(Math.max(boxWidth, boundList[idx][0]), boundList[idx][1]));
  });
}
/**
 * Calculate points location for each series.
 */


function layoutSingleSeries(seriesModel, offset, boxWidth) {
  var coordSys = seriesModel.coordinateSystem;
  var data = seriesModel.getData();
  var halfWidth = boxWidth / 2;
  var cDimIdx = seriesModel.get('layout') === 'horizontal' ? 0 : 1;
  var vDimIdx = 1 - cDimIdx;
  var coordDims = ['x', 'y'];
  var cDim = data.mapDimension(coordDims[cDimIdx]);
  var vDims = data.mapDimension(coordDims[vDimIdx], true);

  if (cDim == null || vDims.length < 5) {
    return;
  }

  for (var dataIndex = 0; dataIndex < data.count(); dataIndex++) {
    var axisDimVal = data.get(cDim, dataIndex);
    var median = getPoint(axisDimVal, vDims[2], dataIndex);
    var end1 = getPoint(axisDimVal, vDims[0], dataIndex);
    var end2 = getPoint(axisDimVal, vDims[1], dataIndex);
    var end4 = getPoint(axisDimVal, vDims[3], dataIndex);
    var end5 = getPoint(axisDimVal, vDims[4], dataIndex);
    var ends = [];
    addBodyEnd(ends, end2, 0);
    addBodyEnd(ends, end4, 1);
    ends.push(end1, end2, end5, end4);
    layEndLine(ends, end1);
    layEndLine(ends, end5);
    layEndLine(ends, median);
    data.setItemLayout(dataIndex, {
      initBaseline: median[vDimIdx],
      ends: ends
    });
  }

  function getPoint(axisDimVal, dimIdx, dataIndex) {
    var val = data.get(dimIdx, dataIndex);
    var p = [];
    p[cDimIdx] = axisDimVal;
    p[vDimIdx] = val;
    var point;

    if (isNaN(axisDimVal) || isNaN(val)) {
      point = [NaN, NaN];
    } else {
      point = coordSys.dataToPoint(p);
      point[cDimIdx] += offset;
    }

    return point;
  }

  function addBodyEnd(ends, point, start) {
    var point1 = point.slice();
    var point2 = point.slice();
    point1[cDimIdx] += halfWidth;
    point2[cDimIdx] -= halfWidth;
    start ? ends.push(point1, point2) : ends.push(point2, point1);
  }

  function layEndLine(ends, endCenter) {
    var from = endCenter.slice();
    var to = endCenter.slice();
    from[cDimIdx] -= halfWidth;
    to[cDimIdx] += halfWidth;
    ends.push(from, to);
  }
}

module.exports = _default;

/***/ }),

/***/ "fa52":
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

__webpack_require__("febc");

__webpack_require__("dcea");

var boxplotVisual = __webpack_require__("2f91");

var boxplotLayout = __webpack_require__("ecf8");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerVisual(boxplotVisual);
echarts.registerLayout(boxplotLayout);

/***/ }),

/***/ "febc":
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

var _whiskerBoxCommon = __webpack_require__("e468");

var seriesModelMixin = _whiskerBoxCommon.seriesModelMixin;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var BoxplotSeries = SeriesModel.extend({
  type: 'series.boxplot',
  dependencies: ['xAxis', 'yAxis', 'grid'],
  // TODO
  // box width represents group size, so dimension should have 'size'.

  /**
   * @see <https://en.wikipedia.org/wiki/Box_plot>
   * The meanings of 'min' and 'max' depend on user,
   * and echarts do not need to know it.
   * @readOnly
   */
  defaultValueDimensions: [{
    name: 'min',
    defaultTooltip: true
  }, {
    name: 'Q1',
    defaultTooltip: true
  }, {
    name: 'median',
    defaultTooltip: true
  }, {
    name: 'Q3',
    defaultTooltip: true
  }, {
    name: 'max',
    defaultTooltip: true
  }],

  /**
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: null,

  /**
   * @override
   */
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    hoverAnimation: true,
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    layout: null,
    // 'horizontal' or 'vertical'
    boxWidth: [7, 50],
    // [min, max] can be percent of band width.
    itemStyle: {
      color: '#fff',
      borderWidth: 1
    },
    emphasis: {
      itemStyle: {
        borderWidth: 2,
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: 'rgba(0,0,0,0.4)'
      }
    },
    animationEasing: 'elasticOut',
    animationDuration: 800
  }
});
zrUtil.mixin(BoxplotSeries, seriesModelMixin, true);
var _default = BoxplotSeries;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~943f0697.8db0f232.js.map