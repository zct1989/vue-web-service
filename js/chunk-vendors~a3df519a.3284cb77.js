(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~a3df519a"],{

/***/ "217b":
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
  type: 'series.line',
  dependencies: ['grid', 'polar'],
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this, {
      useEncodeDefaulter: true
    });
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    hoverAnimation: true,
    // stack: null
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // polarIndex: 0,
    // If clip the overflow value
    clip: true,
    // cursor: null,
    label: {
      position: 'top'
    },
    // itemStyle: {
    // },
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    // areaStyle: {
    // origin of areaStyle. Valid values:
    // `'auto'/null/undefined`: from axisLine to data
    // `'start'`: from min to data
    // `'end'`: from data to max
    // origin: 'auto'
    // },
    // false, 'start', 'end', 'middle'
    step: false,
    // Disabled if step is true
    smooth: false,
    smoothMonotone: null,
    symbol: 'emptyCircle',
    symbolSize: 4,
    symbolRotate: null,
    showSymbol: true,
    // `false`: follow the label interval strategy.
    // `true`: show all symbols.
    // `'auto'`: If possible, show all symbols, otherwise
    //           follow the label interval strategy.
    showAllSymbol: 'auto',
    // Whether to connect break point.
    connectNulls: false,
    // Sampling for large data. Can be: 'average', 'max', 'min', 'sum'.
    sampling: 'none',
    animationEasing: 'linear',
    // Disable progressive
    progressive: 0,
    hoverLayerThreshold: Infinity
  }
});

module.exports = _default;

/***/ }),

/***/ "6582":
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

/* global Float32Array */
var _default = {
  seriesType: 'lines',
  plan: createRenderPlanner(),
  reset: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var isPolyline = seriesModel.get('polyline');
    var isLarge = seriesModel.pipelineContext.large;

    function progress(params, lineData) {
      var lineCoords = [];

      if (isLarge) {
        var points;
        var segCount = params.end - params.start;

        if (isPolyline) {
          var totalCoordsCount = 0;

          for (var i = params.start; i < params.end; i++) {
            totalCoordsCount += seriesModel.getLineCoordsCount(i);
          }

          points = new Float32Array(segCount + totalCoordsCount * 2);
        } else {
          points = new Float32Array(segCount * 4);
        }

        var offset = 0;
        var pt = [];

        for (var i = params.start; i < params.end; i++) {
          var len = seriesModel.getLineCoords(i, lineCoords);

          if (isPolyline) {
            points[offset++] = len;
          }

          for (var k = 0; k < len; k++) {
            pt = coordSys.dataToPoint(lineCoords[k], false, pt);
            points[offset++] = pt[0];
            points[offset++] = pt[1];
          }
        }

        lineData.setLayout('linesPoints', points);
      } else {
        for (var i = params.start; i < params.end; i++) {
          var itemModel = lineData.getItemModel(i);
          var len = seriesModel.getLineCoords(i, lineCoords);
          var pts = [];

          if (isPolyline) {
            for (var j = 0; j < len; j++) {
              pts.push(coordSys.dataToPoint(lineCoords[j]));
            }
          } else {
            pts[0] = coordSys.dataToPoint(lineCoords[0]);
            pts[1] = coordSys.dataToPoint(lineCoords[1]);
            var curveness = itemModel.get('lineStyle.curveness');

            if (+curveness) {
              pts[2] = [(pts[0][0] + pts[1][0]) / 2 - (pts[0][1] - pts[1][1]) * curveness, (pts[0][1] + pts[1][1]) / 2 - (pts[1][0] - pts[0][0]) * curveness];
            }
          }

          lineData.setItemLayout(i, pts);
        }
      }
    }

    return {
      progress: progress
    };
  }
};
module.exports = _default;

/***/ }),

/***/ "7293":
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

var SeriesModel = __webpack_require__("4f85");

var List = __webpack_require__("6179");

var _util = __webpack_require__("6d8b");

var concatArray = _util.concatArray;
var mergeAll = _util.mergeAll;
var map = _util.map;

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

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

/* global Uint32Array, Float64Array, Float32Array */
var Uint32Arr = typeof Uint32Array === 'undefined' ? Array : Uint32Array;
var Float64Arr = typeof Float64Array === 'undefined' ? Array : Float64Array;

function compatEc2(seriesOpt) {
  var data = seriesOpt.data;

  if (data && data[0] && data[0][0] && data[0][0].coord) {
    seriesOpt.data = map(data, function (itemOpt) {
      var coords = [itemOpt[0].coord, itemOpt[1].coord];
      var target = {
        coords: coords
      };

      if (itemOpt[0].name) {
        target.fromName = itemOpt[0].name;
      }

      if (itemOpt[1].name) {
        target.toName = itemOpt[1].name;
      }

      return mergeAll([target, itemOpt[0], itemOpt[1]]);
    });
  }
}

var LinesSeries = SeriesModel.extend({
  type: 'series.lines',
  dependencies: ['grid', 'polar'],
  visualColorAccessPath: 'lineStyle.color',
  init: function (option) {
    // The input data may be null/undefined.
    option.data = option.data || []; // Not using preprocessor because mergeOption may not have series.type

    compatEc2(option);

    var result = this._processFlatCoordsArray(option.data);

    this._flatCoords = result.flatCoords;
    this._flatCoordsOffset = result.flatCoordsOffset;

    if (result.flatCoords) {
      option.data = new Float32Array(result.count);
    }

    LinesSeries.superApply(this, 'init', arguments);
  },
  mergeOption: function (option) {
    // The input data may be null/undefined.
    option.data = option.data || [];
    compatEc2(option);

    if (option.data) {
      // Only update when have option data to merge.
      var result = this._processFlatCoordsArray(option.data);

      this._flatCoords = result.flatCoords;
      this._flatCoordsOffset = result.flatCoordsOffset;

      if (result.flatCoords) {
        option.data = new Float32Array(result.count);
      }
    }

    LinesSeries.superApply(this, 'mergeOption', arguments);
  },
  appendData: function (params) {
    var result = this._processFlatCoordsArray(params.data);

    if (result.flatCoords) {
      if (!this._flatCoords) {
        this._flatCoords = result.flatCoords;
        this._flatCoordsOffset = result.flatCoordsOffset;
      } else {
        this._flatCoords = concatArray(this._flatCoords, result.flatCoords);
        this._flatCoordsOffset = concatArray(this._flatCoordsOffset, result.flatCoordsOffset);
      }

      params.data = new Float32Array(result.count);
    }

    this.getRawData().appendData(params.data);
  },
  _getCoordsFromItemModel: function (idx) {
    var itemModel = this.getData().getItemModel(idx);
    var coords = itemModel.option instanceof Array ? itemModel.option : itemModel.getShallow('coords');
    return coords;
  },
  getLineCoordsCount: function (idx) {
    if (this._flatCoordsOffset) {
      return this._flatCoordsOffset[idx * 2 + 1];
    } else {
      return this._getCoordsFromItemModel(idx).length;
    }
  },
  getLineCoords: function (idx, out) {
    if (this._flatCoordsOffset) {
      var offset = this._flatCoordsOffset[idx * 2];
      var len = this._flatCoordsOffset[idx * 2 + 1];

      for (var i = 0; i < len; i++) {
        out[i] = out[i] || [];
        out[i][0] = this._flatCoords[offset + i * 2];
        out[i][1] = this._flatCoords[offset + i * 2 + 1];
      }

      return len;
    } else {
      var coords = this._getCoordsFromItemModel(idx);

      for (var i = 0; i < coords.length; i++) {
        out[i] = out[i] || [];
        out[i][0] = coords[i][0];
        out[i][1] = coords[i][1];
      }

      return coords.length;
    }
  },
  _processFlatCoordsArray: function (data) {
    var startOffset = 0;

    if (this._flatCoords) {
      startOffset = this._flatCoords.length;
    } // Stored as a typed array. In format
    // Points Count(2) | x | y | x | y | Points Count(3) | x |  y | x | y | x | y |


    if (typeof data[0] === 'number') {
      var len = data.length; // Store offset and len of each segment

      var coordsOffsetAndLenStorage = new Uint32Arr(len);
      var coordsStorage = new Float64Arr(len);
      var coordsCursor = 0;
      var offsetCursor = 0;
      var dataCount = 0;

      for (var i = 0; i < len;) {
        dataCount++;
        var count = data[i++]; // Offset

        coordsOffsetAndLenStorage[offsetCursor++] = coordsCursor + startOffset; // Len

        coordsOffsetAndLenStorage[offsetCursor++] = count;

        for (var k = 0; k < count; k++) {
          var x = data[i++];
          var y = data[i++];
          coordsStorage[coordsCursor++] = x;
          coordsStorage[coordsCursor++] = y;

          if (i > len) {}
        }
      }

      return {
        flatCoordsOffset: new Uint32Array(coordsOffsetAndLenStorage.buffer, 0, offsetCursor),
        flatCoords: coordsStorage,
        count: dataCount
      };
    }

    return {
      flatCoordsOffset: null,
      flatCoords: null,
      count: data.length
    };
  },
  getInitialData: function (option, ecModel) {
    var lineData = new List(['value'], this);
    lineData.hasItemOption = false;
    lineData.initData(option.data, [], function (dataItem, dimName, dataIndex, dimIndex) {
      // dataItem is simply coords
      if (dataItem instanceof Array) {
        return NaN;
      } else {
        lineData.hasItemOption = true;
        var value = dataItem.value;

        if (value != null) {
          return value instanceof Array ? value[dimIndex] : value;
        }
      }
    });
    return lineData;
  },
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var itemModel = data.getItemModel(dataIndex);
    var name = itemModel.get('name');

    if (name) {
      return name;
    }

    var fromName = itemModel.get('fromName');
    var toName = itemModel.get('toName');
    var html = [];
    fromName != null && html.push(fromName);
    toName != null && html.push(toName);
    return encodeHTML(html.join(' > '));
  },
  preventIncremental: function () {
    return !!this.get('effect.show');
  },
  getProgressive: function () {
    var progressive = this.option.progressive;

    if (progressive == null) {
      return this.option.large ? 1e4 : this.get('progressive');
    }

    return progressive;
  },
  getProgressiveThreshold: function () {
    var progressiveThreshold = this.option.progressiveThreshold;

    if (progressiveThreshold == null) {
      return this.option.large ? 2e4 : this.get('progressiveThreshold');
    }

    return progressiveThreshold;
  },
  defaultOption: {
    coordinateSystem: 'geo',
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    hoverAnimation: true,
    // Cartesian coordinate system
    xAxisIndex: 0,
    yAxisIndex: 0,
    symbol: ['none', 'none'],
    symbolSize: [10, 10],
    // Geo coordinate system
    geoIndex: 0,
    effect: {
      show: false,
      period: 4,
      // Animation delay. support callback
      // delay: 0,
      // If move with constant speed px/sec
      // period will be ignored if this property is > 0,
      constantSpeed: 0,
      symbol: 'circle',
      symbolSize: 3,
      loop: true,
      // Length of trail, 0 - 1
      trailLength: 0.2 // Same with lineStyle.color
      // color

    },
    large: false,
    // Available when large is true
    largeThreshold: 2000,
    // If lines are polyline
    // polyline not support curveness, label, animation
    polyline: false,
    // If clip the overflow.
    // Available when coordinateSystem is cartesian or polar.
    clip: true,
    label: {
      show: false,
      position: 'end' // distance: 5,
      // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调

    },
    lineStyle: {
      opacity: 0.5
    }
  }
});
var _default = LinesSeries;
module.exports = _default;

/***/ }),

/***/ "9f82":
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

var _dataStackHelper = __webpack_require__("ee1a");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

var _util = __webpack_require__("6d8b");

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
 * @param {Object} coordSys
 * @param {module:echarts/data/List} data
 * @param {string} valueOrigin lineSeries.option.areaStyle.origin
 */
function prepareDataCoordInfo(coordSys, data, valueOrigin) {
  var baseAxis = coordSys.getBaseAxis();
  var valueAxis = coordSys.getOtherAxis(baseAxis);
  var valueStart = getValueStart(valueAxis, valueOrigin);
  var baseAxisDim = baseAxis.dim;
  var valueAxisDim = valueAxis.dim;
  var valueDim = data.mapDimension(valueAxisDim);
  var baseDim = data.mapDimension(baseAxisDim);
  var baseDataOffset = valueAxisDim === 'x' || valueAxisDim === 'radius' ? 1 : 0;
  var dims = map(coordSys.dimensions, function (coordDim) {
    return data.mapDimension(coordDim);
  });
  var stacked;
  var stackResultDim = data.getCalculationInfo('stackResultDimension');

  if (stacked |= isDimensionStacked(data, dims[0]
  /*, dims[1]*/
  )) {
    // jshint ignore:line
    dims[0] = stackResultDim;
  }

  if (stacked |= isDimensionStacked(data, dims[1]
  /*, dims[0]*/
  )) {
    // jshint ignore:line
    dims[1] = stackResultDim;
  }

  return {
    dataDimsForPoint: dims,
    valueStart: valueStart,
    valueAxisDim: valueAxisDim,
    baseAxisDim: baseAxisDim,
    stacked: !!stacked,
    valueDim: valueDim,
    baseDim: baseDim,
    baseDataOffset: baseDataOffset,
    stackedOverDimension: data.getCalculationInfo('stackedOverDimension')
  };
}

function getValueStart(valueAxis, valueOrigin) {
  var valueStart = 0;
  var extent = valueAxis.scale.getExtent();

  if (valueOrigin === 'start') {
    valueStart = extent[0];
  } else if (valueOrigin === 'end') {
    valueStart = extent[1];
  } // auto
  else {
      // Both positive
      if (extent[0] > 0) {
        valueStart = extent[0];
      } // Both negative
      else if (extent[1] < 0) {
          valueStart = extent[1];
        } // If is one positive, and one negative, onZero shall be true

    }

  return valueStart;
}

function getStackedOnPoint(dataCoordInfo, coordSys, data, idx) {
  var value = NaN;

  if (dataCoordInfo.stacked) {
    value = data.get(data.getCalculationInfo('stackedOverDimension'), idx);
  }

  if (isNaN(value)) {
    value = dataCoordInfo.valueStart;
  }

  var baseDataOffset = dataCoordInfo.baseDataOffset;
  var stackedData = [];
  stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
  stackedData[1 - baseDataOffset] = value;
  return coordSys.dataToPoint(stackedData);
}

exports.prepareDataCoordInfo = prepareDataCoordInfo;
exports.getStackedOnPoint = getStackedOnPoint;

/***/ }),

/***/ "a7e2":
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

__webpack_require__("7293");

__webpack_require__("ae46");

var linesLayout = __webpack_require__("6582");

var linesVisual = __webpack_require__("ee98");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerLayout(linesLayout);
echarts.registerVisual(linesVisual);

/***/ }),

/***/ "ae46":
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

var LineDraw = __webpack_require__("73ca");

var EffectLine = __webpack_require__("0fd3");

var Line = __webpack_require__("7e5b");

var Polyline = __webpack_require__("4527");

var EffectPolyline = __webpack_require__("6a4c");

var LargeLineDraw = __webpack_require__("a38d");

var linesLayout = __webpack_require__("6582");

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
var _default = echarts.extendChartView({
  type: 'lines',
  init: function () {},
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();

    var lineDraw = this._updateLineDraw(data, seriesModel);

    var zlevel = seriesModel.get('zlevel');
    var trailLength = seriesModel.get('effect.trailLength');
    var zr = api.getZr(); // Avoid the drag cause ghost shadow
    // FIXME Better way ?
    // SVG doesn't support

    var isSvg = zr.painter.getType() === 'svg';

    if (!isSvg) {
      zr.painter.getLayer(zlevel).clear(true);
    } // Config layer with motion blur


    if (this._lastZlevel != null && !isSvg) {
      zr.configLayer(this._lastZlevel, {
        motionBlur: false
      });
    }

    if (this._showEffect(seriesModel) && trailLength) {
      if (!isSvg) {
        zr.configLayer(zlevel, {
          motionBlur: true,
          lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
        });
      }
    }

    lineDraw.updateData(data);
    var clipPath = seriesModel.get('clip', true) && createClipPath(seriesModel.coordinateSystem, false, seriesModel);

    if (clipPath) {
      this.group.setClipPath(clipPath);
    } else {
      this.group.removeClipPath();
    }

    this._lastZlevel = zlevel;
    this._finished = true;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();

    var lineDraw = this._updateLineDraw(data, seriesModel);

    lineDraw.incrementalPrepareUpdate(data);

    this._clearLayer(api);

    this._finished = false;
  },
  incrementalRender: function (taskParams, seriesModel, ecModel) {
    this._lineDraw.incrementalUpdate(taskParams, seriesModel.getData());

    this._finished = taskParams.end === seriesModel.getData().count();
  },
  updateTransform: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var pipelineContext = seriesModel.pipelineContext;

    if (!this._finished || pipelineContext.large || pipelineContext.progressiveRender) {
      // TODO Don't have to do update in large mode. Only do it when there are millions of data.
      return {
        update: true
      };
    } else {
      // TODO Use same logic with ScatterView.
      // Manually update layout
      var res = linesLayout.reset(seriesModel);

      if (res.progress) {
        res.progress({
          start: 0,
          end: data.count()
        }, data);
      }

      this._lineDraw.updateLayout();

      this._clearLayer(api);
    }
  },
  _updateLineDraw: function (data, seriesModel) {
    var lineDraw = this._lineDraw;

    var hasEffect = this._showEffect(seriesModel);

    var isPolyline = !!seriesModel.get('polyline');
    var pipelineContext = seriesModel.pipelineContext;
    var isLargeDraw = pipelineContext.large;

    if (!lineDraw || hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLargeDraw !== this._isLargeDraw) {
      if (lineDraw) {
        lineDraw.remove();
      }

      lineDraw = this._lineDraw = isLargeDraw ? new LargeLineDraw() : new LineDraw(isPolyline ? hasEffect ? EffectPolyline : Polyline : hasEffect ? EffectLine : Line);
      this._hasEffet = hasEffect;
      this._isPolyline = isPolyline;
      this._isLargeDraw = isLargeDraw;
      this.group.removeAll();
    }

    this.group.add(lineDraw.group);
    return lineDraw;
  },
  _showEffect: function (seriesModel) {
    return !!seriesModel.get('effect.show');
  },
  _clearLayer: function (api) {
    // Not use motion when dragging or zooming
    var zr = api.getZr();
    var isSvg = zr.painter.getType() === 'svg';

    if (!isSvg && this._lastZlevel != null) {
      zr.painter.getLayer(this._lastZlevel).clear(true);
    }
  },
  remove: function (ecModel, api) {
    this._lineDraw && this._lineDraw.remove();
    this._lineDraw = null; // Clear motion when lineDraw is removed

    this._clearLayer(api);
  },
  dispose: function () {}
});

module.exports = _default;

/***/ }),

/***/ "d4d1":
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

var Path = __webpack_require__("cbe5");

var vec2 = __webpack_require__("401b");

var fixClipWithShadow = __webpack_require__("897a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Poly path support NaN point
var vec2Min = vec2.min;
var vec2Max = vec2.max;
var scaleAndAdd = vec2.scaleAndAdd;
var v2Copy = vec2.copy; // Temporary variable

var v = [];
var cp0 = [];
var cp1 = [];

function isPointNull(p) {
  return isNaN(p[0]) || isNaN(p[1]);
}

function drawSegment(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  // if (smoothMonotone == null) {
  //     if (isMono(points, 'x')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'x', connectNulls);
  //     }
  //     else if (isMono(points, 'y')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'y', connectNulls);
  //     }
  //     else {
  //         return drawNonMono.apply(this, arguments);
  //     }
  // }
  // else if (smoothMonotone !== 'none' && isMono(points, smoothMonotone)) {
  //     return drawMono.apply(this, arguments);
  // }
  // else {
  //     return drawNonMono.apply(this, arguments);
  // }
  if (smoothMonotone === 'none' || !smoothMonotone) {
    return drawNonMono.apply(this, arguments);
  } else {
    return drawMono.apply(this, arguments);
  }
}
/**
 * Check if points is in monotone.
 *
 * @param {number[][]} points         Array of points which is in [x, y] form
 * @param {string}     smoothMonotone 'x', 'y', or 'none', stating for which
 *                                    dimension that is checking.
 *                                    If is 'none', `drawNonMono` should be
 *                                    called.
 *                                    If is undefined, either being monotone
 *                                    in 'x' or 'y' will call `drawMono`.
 */
// function isMono(points, smoothMonotone) {
//     if (points.length <= 1) {
//         return true;
//     }
//     var dim = smoothMonotone === 'x' ? 0 : 1;
//     var last = points[0][dim];
//     var lastDiff = 0;
//     for (var i = 1; i < points.length; ++i) {
//         var diff = points[i][dim] - last;
//         if (!isNaN(diff) && !isNaN(lastDiff)
//             && diff !== 0 && lastDiff !== 0
//             && ((diff >= 0) !== (lastDiff >= 0))
//         ) {
//             return false;
//         }
//         if (!isNaN(diff) && diff !== 0) {
//             lastDiff = diff;
//             last = points[i][dim];
//         }
//     }
//     return true;
// }

/**
 * Draw smoothed line in monotone, in which only vertical or horizontal bezier
 * control points will be used. This should be used when points are monotone
 * either in x or y dimension.
 */


function drawMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
    } else {
      if (smooth > 0) {
        var prevP = points[prevIdx];
        var dim = smoothMonotone === 'y' ? 1 : 0; // Length of control point to p, either in x or y, but not both

        var ctrlLen = (p[dim] - prevP[dim]) * smooth;
        v2Copy(cp0, prevP);
        cp0[dim] = prevP[dim] + ctrlLen;
        v2Copy(cp1, p);
        cp1[dim] = p[dim] - ctrlLen;
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}
/**
 * Draw smoothed line in non-monotone, in may cause undesired curve in extreme
 * situations. This should be used when points are non-monotone neither in x or
 * y dimension.
 */


function drawNonMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
      v2Copy(cp0, p);
    } else {
      if (smooth > 0) {
        var nextIdx = idx + dir;
        var nextP = points[nextIdx];

        if (connectNulls) {
          // Find next point not null
          while (nextP && isPointNull(points[nextIdx])) {
            nextIdx += dir;
            nextP = points[nextIdx];
          }
        }

        var ratioNextSeg = 0.5;
        var prevP = points[prevIdx];
        var nextP = points[nextIdx]; // Last point

        if (!nextP || isPointNull(nextP)) {
          v2Copy(cp1, p);
        } else {
          // If next data is null in not connect case
          if (isPointNull(nextP) && !connectNulls) {
            nextP = p;
          }

          vec2.sub(v, nextP, prevP);
          var lenPrevSeg;
          var lenNextSeg;

          if (smoothMonotone === 'x' || smoothMonotone === 'y') {
            var dim = smoothMonotone === 'x' ? 0 : 1;
            lenPrevSeg = Math.abs(p[dim] - prevP[dim]);
            lenNextSeg = Math.abs(p[dim] - nextP[dim]);
          } else {
            lenPrevSeg = vec2.dist(p, prevP);
            lenNextSeg = vec2.dist(p, nextP);
          } // Use ratio of seg length


          ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
          scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg));
        } // Smooth constraint


        vec2Min(cp0, cp0, smoothMax);
        vec2Max(cp0, cp0, smoothMin);
        vec2Min(cp1, cp1, smoothMax);
        vec2Max(cp1, cp1, smoothMin);
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]); // cp0 of next segment

        scaleAndAdd(cp0, p, v, smooth * ratioNextSeg);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}

function getBoundingBox(points, smoothConstraint) {
  var ptMin = [Infinity, Infinity];
  var ptMax = [-Infinity, -Infinity];

  if (smoothConstraint) {
    for (var i = 0; i < points.length; i++) {
      var pt = points[i];

      if (pt[0] < ptMin[0]) {
        ptMin[0] = pt[0];
      }

      if (pt[1] < ptMin[1]) {
        ptMin[1] = pt[1];
      }

      if (pt[0] > ptMax[0]) {
        ptMax[0] = pt[0];
      }

      if (pt[1] > ptMax[1]) {
        ptMax[1] = pt[1];
      }
    }
  }

  return {
    min: smoothConstraint ? ptMin : ptMax,
    max: smoothConstraint ? ptMax : ptMin
  };
}

var Polyline = Path.extend({
  type: 'ec-polyline',
  shape: {
    points: [],
    smooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  style: {
    fill: null,
    stroke: '#000'
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var i = 0;
    var len = points.length;
    var result = getBoundingBox(points, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      i += drawSegment(ctx, points, i, len, len, 1, result.min, result.max, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
    }
  }
});
var Polygon = Path.extend({
  type: 'ec-polygon',
  shape: {
    points: [],
    // Offset between stacked base points and points
    stackedOnPoints: [],
    smooth: 0,
    stackedOnSmooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var stackedOnPoints = shape.stackedOnPoints;
    var i = 0;
    var len = points.length;
    var smoothMonotone = shape.smoothMonotone;
    var bbox = getBoundingBox(points, shape.smoothConstraint);
    var stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      var k = drawSegment(ctx, points, i, len, len, 1, bbox.min, bbox.max, shape.smooth, smoothMonotone, shape.connectNulls);
      drawSegment(ctx, stackedOnPoints, i + k - 1, k, len, -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
      i += k + 1;
      ctx.closePath();
    }
  }
});
exports.Polyline = Polyline;
exports.Polygon = Polygon;

/***/ }),

/***/ "ee98":
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

var opacityQuery = 'lineStyle.opacity'.split('.');
var _default = {
  seriesType: 'lines',
  reset: function (seriesModel, ecModel, api) {
    var symbolType = normalize(seriesModel.get('symbol'));
    var symbolSize = normalize(seriesModel.get('symbolSize'));
    var data = seriesModel.getData();
    data.setVisual('fromSymbol', symbolType && symbolType[0]);
    data.setVisual('toSymbol', symbolType && symbolType[1]);
    data.setVisual('fromSymbolSize', symbolSize && symbolSize[0]);
    data.setVisual('toSymbolSize', symbolSize && symbolSize[1]);
    data.setVisual('opacity', seriesModel.get(opacityQuery));

    function dataEach(data, idx) {
      var itemModel = data.getItemModel(idx);
      var symbolType = normalize(itemModel.getShallow('symbol', true));
      var symbolSize = normalize(itemModel.getShallow('symbolSize', true));
      var opacity = itemModel.get(opacityQuery);
      symbolType[0] && data.setItemVisual(idx, 'fromSymbol', symbolType[0]);
      symbolType[1] && data.setItemVisual(idx, 'toSymbol', symbolType[1]);
      symbolSize[0] && data.setItemVisual(idx, 'fromSymbolSize', symbolSize[0]);
      symbolSize[1] && data.setItemVisual(idx, 'toSymbolSize', symbolSize[1]);
      data.setItemVisual(idx, 'opacity', opacity);
    }

    return {
      dataEach: data.hasItemOption ? dataEach : null
    };
  }
};
module.exports = _default;

/***/ }),

/***/ "ef97":
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

__webpack_require__("217b");

__webpack_require__("f17f");

var visualSymbol = __webpack_require__("7f96");

var layoutPoints = __webpack_require__("87c3");

var dataSample = __webpack_require__("fdde");

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
echarts.registerVisual(visualSymbol('line', 'circle', 'line'));
echarts.registerLayout(layoutPoints('line')); // Down sample after filter

echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, dataSample('line'));

/***/ }),

/***/ "f123":
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

var _helper = __webpack_require__("9f82");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// var arrayDiff = require('zrender/src/core/arrayDiff');
// 'zrender/src/core/arrayDiff' has been used before, but it did
// not do well in performance when roam with fixed dataZoom window.
// function convertToIntId(newIdList, oldIdList) {
//     // Generate int id instead of string id.
//     // Compare string maybe slow in score function of arrDiff
//     // Assume id in idList are all unique
//     var idIndicesMap = {};
//     var idx = 0;
//     for (var i = 0; i < newIdList.length; i++) {
//         idIndicesMap[newIdList[i]] = idx;
//         newIdList[i] = idx++;
//     }
//     for (var i = 0; i < oldIdList.length; i++) {
//         var oldId = oldIdList[i];
//         // Same with newIdList
//         if (idIndicesMap[oldId]) {
//             oldIdList[i] = idIndicesMap[oldId];
//         }
//         else {
//             oldIdList[i] = idx++;
//         }
//     }
// }
function diffData(oldData, newData) {
  var diffResult = [];
  newData.diff(oldData).add(function (idx) {
    diffResult.push({
      cmd: '+',
      idx: idx
    });
  }).update(function (newIdx, oldIdx) {
    diffResult.push({
      cmd: '=',
      idx: oldIdx,
      idx1: newIdx
    });
  }).remove(function (idx) {
    diffResult.push({
      cmd: '-',
      idx: idx
    });
  }).execute();
  return diffResult;
}

function _default(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
  var diff = diffData(oldData, newData); // var newIdList = newData.mapArray(newData.getId);
  // var oldIdList = oldData.mapArray(oldData.getId);
  // convertToIntId(newIdList, oldIdList);
  // // FIXME One data ?
  // diff = arrayDiff(oldIdList, newIdList);

  var currPoints = [];
  var nextPoints = []; // Points for stacking base line

  var currStackedPoints = [];
  var nextStackedPoints = [];
  var status = [];
  var sortedIndices = [];
  var rawIndices = [];
  var newDataOldCoordInfo = prepareDataCoordInfo(oldCoordSys, newData, oldValueOrigin);
  var oldDataNewCoordInfo = prepareDataCoordInfo(newCoordSys, oldData, newValueOrigin);

  for (var i = 0; i < diff.length; i++) {
    var diffItem = diff[i];
    var pointAdded = true; // FIXME, animation is not so perfect when dataZoom window moves fast
    // Which is in case remvoing or add more than one data in the tail or head

    switch (diffItem.cmd) {
      case '=':
        var currentPt = oldData.getItemLayout(diffItem.idx);
        var nextPt = newData.getItemLayout(diffItem.idx1); // If previous data is NaN, use next point directly

        if (isNaN(currentPt[0]) || isNaN(currentPt[1])) {
          currentPt = nextPt.slice();
        }

        currPoints.push(currentPt);
        nextPoints.push(nextPt);
        currStackedPoints.push(oldStackedOnPoints[diffItem.idx]);
        nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]);
        rawIndices.push(newData.getRawIndex(diffItem.idx1));
        break;

      case '+':
        var idx = diffItem.idx;
        currPoints.push(oldCoordSys.dataToPoint([newData.get(newDataOldCoordInfo.dataDimsForPoint[0], idx), newData.get(newDataOldCoordInfo.dataDimsForPoint[1], idx)]));
        nextPoints.push(newData.getItemLayout(idx).slice());
        currStackedPoints.push(getStackedOnPoint(newDataOldCoordInfo, oldCoordSys, newData, idx));
        nextStackedPoints.push(newStackedOnPoints[idx]);
        rawIndices.push(newData.getRawIndex(idx));
        break;

      case '-':
        var idx = diffItem.idx;
        var rawIndex = oldData.getRawIndex(idx); // Data is replaced. In the case of dynamic data queue
        // FIXME FIXME FIXME

        if (rawIndex !== idx) {
          currPoints.push(oldData.getItemLayout(idx));
          nextPoints.push(newCoordSys.dataToPoint([oldData.get(oldDataNewCoordInfo.dataDimsForPoint[0], idx), oldData.get(oldDataNewCoordInfo.dataDimsForPoint[1], idx)]));
          currStackedPoints.push(oldStackedOnPoints[idx]);
          nextStackedPoints.push(getStackedOnPoint(oldDataNewCoordInfo, newCoordSys, oldData, idx));
          rawIndices.push(rawIndex);
        } else {
          pointAdded = false;
        }

    } // Original indices


    if (pointAdded) {
      status.push(diffItem);
      sortedIndices.push(sortedIndices.length);
    }
  } // Diff result may be crossed if all items are changed
  // Sort by data index


  sortedIndices.sort(function (a, b) {
    return rawIndices[a] - rawIndices[b];
  });
  var sortedCurrPoints = [];
  var sortedNextPoints = [];
  var sortedCurrStackedPoints = [];
  var sortedNextStackedPoints = [];
  var sortedStatus = [];

  for (var i = 0; i < sortedIndices.length; i++) {
    var idx = sortedIndices[i];
    sortedCurrPoints[i] = currPoints[idx];
    sortedNextPoints[i] = nextPoints[idx];
    sortedCurrStackedPoints[i] = currStackedPoints[idx];
    sortedNextStackedPoints[i] = nextStackedPoints[idx];
    sortedStatus[i] = status[idx];
  }

  return {
    current: sortedCurrPoints,
    next: sortedNextPoints,
    stackedOnCurrent: sortedCurrStackedPoints,
    stackedOnNext: sortedNextStackedPoints,
    status: sortedStatus
  };
}

module.exports = _default;

/***/ }),

/***/ "f17f":
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

var SymbolDraw = __webpack_require__("f706");

var SymbolClz = __webpack_require__("1418");

var lineAnimationDiff = __webpack_require__("f123");

var graphic = __webpack_require__("2306");

var modelUtil = __webpack_require__("e0d3");

var _poly = __webpack_require__("d4d1");

var Polyline = _poly.Polyline;
var Polygon = _poly.Polygon;

var ChartView = __webpack_require__("e887");

var _helper = __webpack_require__("9f82");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

var _createClipPathFromCoordSys = __webpack_require__("b0af");

var createGridClipPath = _createClipPathFromCoordSys.createGridClipPath;
var createPolarClipPath = _createClipPathFromCoordSys.createPolarClipPath;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME step not support polar
function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }

  for (var i = 0; i < points1.length; i++) {
    var p1 = points1[i];
    var p2 = points2[i];

    if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
      return;
    }
  }

  return true;
}

function getSmooth(smooth) {
  return typeof smooth === 'number' ? smooth : smooth ? 0.5 : 0;
}
/**
 * @param {module:echarts/coord/cartesian/Cartesian2D|module:echarts/coord/polar/Polar} coordSys
 * @param {module:echarts/data/List} data
 * @param {Object} dataCoordInfo
 * @param {Array.<Array.<number>>} points
 */


function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }

  var points = [];

  for (var idx = 0, len = data.count(); idx < len; idx++) {
    points.push(getStackedOnPoint(dataCoordInfo, coordSys, data, idx));
  }

  return points;
}

function turnPointsIntoStep(points, coordSys, stepTurnAt) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;
  var stepPoints = [];

  for (var i = 0; i < points.length - 1; i++) {
    var nextPt = points[i + 1];
    var pt = points[i];
    stepPoints.push(pt);
    var stepPt = [];

    switch (stepTurnAt) {
      case 'end':
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
        break;

      case 'middle':
        // default is start
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt);
        stepPoints.push(stepPt2);
        break;

      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
    }
  } // Last points


  points[i] && stepPoints.push(points[i]);
  return stepPoints;
}

function getVisualGradient(data, coordSys) {
  var visualMetaList = data.getVisual('visualMeta');

  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    // When data.count() is 0, gradient range can not be calculated.
    return;
  }

  if (coordSys.type !== 'cartesian2d') {
    return;
  }

  var coordDim;
  var visualMeta;

  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimIndex = visualMetaList[i].dimension;
    var dimName = data.dimensions[dimIndex];
    var dimInfo = data.getDimensionInfo(dimName);
    coordDim = dimInfo && dimInfo.coordDim; // Can only be x or y

    if (coordDim === 'x' || coordDim === 'y') {
      visualMeta = visualMetaList[i];
      break;
    }
  }

  if (!visualMeta) {
    return;
  } // If the area to be rendered is bigger than area defined by LinearGradient,
  // the canvas spec prescribes that the color of the first stop and the last
  // stop should be used. But if two stops are added at offset 0, in effect
  // browsers use the color of the second stop to render area outside
  // LinearGradient. So we can only infinitesimally extend area defined in
  // LinearGradient to render `outerColors`.


  var axis = coordSys.getAxis(coordDim); // dataToCoor mapping may not be linear, but must be monotonic.

  var colorStops = zrUtil.map(visualMeta.stops, function (stop) {
    return {
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();

  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }

  var tinyExtent = 10; // Arbitrary value: 10px

  var minCoord = colorStops[0].coord - tinyExtent;
  var maxCoord = colorStops[stopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;

  if (coordSpan < 1e-3) {
    return 'transparent';
  }

  zrUtil.each(colorStops, function (stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStops.push({
    offset: stopLen ? colorStops[stopLen - 1].offset : 0.5,
    color: outerColors[1] || 'transparent'
  });
  colorStops.unshift({
    // notice colorStops.length have been changed.
    offset: stopLen ? colorStops[0].offset : 0.5,
    color: outerColors[0] || 'transparent'
  }); // zrUtil.each(colorStops, function (colorStop) {
  //     // Make sure each offset has rounded px to avoid not sharp edge
  //     colorStop.offset = (Math.round(colorStop.offset * (end - start) + start) - start) / (end - start);
  // });

  var gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStops, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + '2'] = maxCoord;
  return gradient;
}

function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get('showAllSymbol');
  var isAuto = showAllSymbol === 'auto';

  if (showAllSymbol && !isAuto) {
    return;
  }

  var categoryAxis = coordSys.getAxesByScale('ordinal')[0];

  if (!categoryAxis) {
    return;
  } // Note that category label interval strategy might bring some weird effect
  // in some scenario: users may wonder why some of the symbols are not
  // displayed. So we show all symbols as possible as we can.


  if (isAuto // Simplify the logic, do not determine label overlap here.
  && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  } // Otherwise follow the label interval strategy on category axis.


  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  zrUtil.each(categoryAxis.getViewLabels(), function (labelItem) {
    labelMap[labelItem.tickValue] = 1;
  });
  return function (dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}

function canShowAllSymbolForCategory(categoryAxis, data) {
  // In mose cases, line is monotonous on category axis, and the label size
  // is close with each other. So we check the symbol size and some of the
  // label size alone with the category axis to estimate whether all symbol
  // can be shown without overlap.
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0); // 0/0 is NaN.
  // Sampling some points, max 5.

  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));

  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (SymbolClz.getSymbolSize(data, dataIndex // Only for cartesian, where `isHorizontal` exists.
    )[categoryAxis.isHorizontal() ? 1 : 0] // Empirical number
    * 1.5 > availSize) {
      return false;
    }
  }

  return true;
}

function createLineClipPath(coordSys, hasAnimation, seriesModel) {
  if (coordSys.type === 'cartesian2d') {
    var isHorizontal = coordSys.getBaseAxis().isHorizontal();
    var clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel); // Expand clip shape to avoid clipping when line value exceeds axis

    if (!seriesModel.get('clip', true)) {
      var rectShape = clipPath.shape;
      var expandSize = Math.max(rectShape.width, rectShape.height);

      if (isHorizontal) {
        rectShape.y -= expandSize;
        rectShape.height += expandSize * 2;
      } else {
        rectShape.x -= expandSize;
        rectShape.width += expandSize * 2;
      }
    }

    return clipPath;
  } else {
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  }
}

var _default = ChartView.extend({
  type: 'line',
  init: function () {
    var lineGroup = new graphic.Group();
    var symbolDraw = new SymbolDraw();
    this.group.add(symbolDraw.group);
    this._symbolDraw = symbolDraw;
    this._lineGroup = lineGroup;
  },
  render: function (seriesModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var areaStyleModel = seriesModel.getModel('areaStyle');
    var points = data.mapArray(data.getItemLayout);
    var isCoordSysPolar = coordSys.type === 'polar';
    var prevCoordSys = this._coordSys;
    var symbolDraw = this._symbolDraw;
    var polyline = this._polyline;
    var polygon = this._polygon;
    var lineGroup = this._lineGroup;
    var hasAnimation = seriesModel.get('animation');
    var isAreaChart = !areaStyleModel.isEmpty();
    var valueOrigin = areaStyleModel.get('origin');
    var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
    var stackedOnPoints = getStackedOnPoints(coordSys, data, dataCoordInfo);
    var showSymbol = seriesModel.get('showSymbol');
    var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys); // Remove temporary symbols

    var oldData = this._data;
    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    }); // Remove previous created symbols if showSymbol changed to false

    if (!showSymbol) {
      symbolDraw.remove();
    }

    group.add(lineGroup); // FIXME step not support polar

    var step = !isCoordSysPolar && seriesModel.get('step');
    var clipShapeForSymbol;

    if (coordSys && coordSys.getArea && seriesModel.get('clip', true)) {
      clipShapeForSymbol = coordSys.getArea(); // Avoid float number rounding error for symbol on the edge of axis extent.
      // See #7913 and `test/dataZoom-clip.html`.

      if (clipShapeForSymbol.width != null) {
        clipShapeForSymbol.x -= 0.1;
        clipShapeForSymbol.y -= 0.1;
        clipShapeForSymbol.width += 0.2;
        clipShapeForSymbol.height += 0.2;
      } else if (clipShapeForSymbol.r0) {
        clipShapeForSymbol.r0 -= 0.5;
        clipShapeForSymbol.r1 += 0.5;
      }
    }

    this._clipShapeForSymbol = clipShapeForSymbol; // Initialization animation or coordinate system changed

    if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: clipShapeForSymbol
      });

      if (step) {
        // TODO If stacked series is not step
        points = turnPointsIntoStep(points, coordSys, step);
        stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
      }

      polyline = this._newPolyline(points, coordSys, hasAnimation);

      if (isAreaChart) {
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      }

      lineGroup.setClipPath(createLineClipPath(coordSys, true, seriesModel));
    } else {
      if (isAreaChart && !polygon) {
        // If areaStyle is added
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      } else if (polygon && !isAreaChart) {
        // If areaStyle is removed
        lineGroup.remove(polygon);
        polygon = this._polygon = null;
      } // Update clipPath


      lineGroup.setClipPath(createLineClipPath(coordSys, false, seriesModel)); // Always update, or it is wrong in the case turning on legend
      // because points are not changed

      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: clipShapeForSymbol
      }); // Stop symbol animation and sync with line points
      // FIXME performance?

      data.eachItemGraphicEl(function (el) {
        el.stopAnimation(true);
      }); // In the case data zoom triggerred refreshing frequently
      // Data may not change if line has a category axis. So it should animate nothing

      if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
        if (hasAnimation) {
          this._updateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin);
        } else {
          // Not do it in update with animation
          if (step) {
            // TODO If stacked series is not step
            points = turnPointsIntoStep(points, coordSys, step);
            stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
          }

          polyline.setShape({
            points: points
          });
          polygon && polygon.setShape({
            points: points,
            stackedOnPoints: stackedOnPoints
          });
        }
      }
    }

    var visualColor = getVisualGradient(data, coordSys) || data.getVisual('color');
    polyline.useStyle(zrUtil.defaults( // Use color in lineStyle first
    lineStyleModel.getLineStyle(), {
      fill: 'none',
      stroke: visualColor,
      lineJoin: 'bevel'
    }));
    var smooth = seriesModel.get('smooth');
    smooth = getSmooth(seriesModel.get('smooth'));
    polyline.setShape({
      smooth: smooth,
      smoothMonotone: seriesModel.get('smoothMonotone'),
      connectNulls: seriesModel.get('connectNulls')
    });

    if (polygon) {
      var stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
      var stackedOnSmooth = 0;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: visualColor,
        opacity: 0.7,
        lineJoin: 'bevel'
      }));

      if (stackedOnSeries) {
        stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
      }

      polygon.setShape({
        smooth: smooth,
        stackedOnSmooth: stackedOnSmooth,
        smoothMonotone: seriesModel.get('smoothMonotone'),
        connectNulls: seriesModel.get('connectNulls')
      });
    }

    this._data = data; // Save the coordinate system for transition animation when data changed

    this._coordSys = coordSys;
    this._stackedOnPoints = stackedOnPoints;
    this._points = points;
    this._step = step;
    this._valueOrigin = valueOrigin;
  },
  dispose: function () {},
  highlight: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (!symbol) {
        // Create a temporary symbol if it is not exists
        var pt = data.getItemLayout(dataIndex);

        if (!pt) {
          // Null data
          return;
        } // fix #11360: should't draw symbol outside clipShapeForSymbol


        if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(pt[0], pt[1])) {
          return;
        }

        symbol = new SymbolClz(data, dataIndex);
        symbol.position = pt;
        symbol.setZ(seriesModel.get('zlevel'), seriesModel.get('z'));
        symbol.ignore = isNaN(pt[0]) || isNaN(pt[1]);
        symbol.__temp = true;
        data.setItemGraphicEl(dataIndex, symbol); // Stop scale animation

        symbol.stopSymbolAnimation(true);
        this.group.add(symbol);
      }

      symbol.highlight();
    } else {
      // Highlight whole series
      ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
    }
  },
  downplay: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (symbol) {
        if (symbol.__temp) {
          data.setItemGraphicEl(dataIndex, null);
          this.group.remove(symbol);
        } else {
          symbol.downplay();
        }
      }
    } else {
      // FIXME
      // can not downplay completely.
      // Downplay whole series
      ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
    }
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolyline: function (points) {
    var polyline = this._polyline; // Remove previous created polyline

    if (polyline) {
      this._lineGroup.remove(polyline);
    }

    polyline = new Polyline({
      shape: {
        points: points
      },
      silent: true,
      z2: 10
    });

    this._lineGroup.add(polyline);

    this._polyline = polyline;
    return polyline;
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} stackedOnPoints
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolygon: function (points, stackedOnPoints) {
    var polygon = this._polygon; // Remove previous created polygon

    if (polygon) {
      this._lineGroup.remove(polygon);
    }

    polygon = new Polygon({
      shape: {
        points: points,
        stackedOnPoints: stackedOnPoints
      },
      silent: true
    });

    this._lineGroup.add(polygon);

    this._polygon = polygon;
    return polygon;
  },

  /**
   * @private
   */
  // FIXME Two value axis
  _updateAnimation: function (data, stackedOnPoints, coordSys, api, step, valueOrigin) {
    var polyline = this._polyline;
    var polygon = this._polygon;
    var seriesModel = data.hostModel;
    var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
    var current = diff.current;
    var stackedOnCurrent = diff.stackedOnCurrent;
    var next = diff.next;
    var stackedOnNext = diff.stackedOnNext;

    if (step) {
      // TODO If stacked series is not step
      current = turnPointsIntoStep(diff.current, coordSys, step);
      stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
      next = turnPointsIntoStep(diff.next, coordSys, step);
      stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
    } // `diff.current` is subset of `current` (which should be ensured by
    // turnPointsIntoStep), so points in `__points` can be updated when
    // points in `current` are update during animation.


    polyline.shape.__points = diff.current;
    polyline.shape.points = current;
    graphic.updateProps(polyline, {
      shape: {
        points: next
      }
    }, seriesModel);

    if (polygon) {
      polygon.setShape({
        points: current,
        stackedOnPoints: stackedOnCurrent
      });
      graphic.updateProps(polygon, {
        shape: {
          points: next,
          stackedOnPoints: stackedOnNext
        }
      }, seriesModel);
    }

    var updatedDataInfo = [];
    var diffStatus = diff.status;

    for (var i = 0; i < diffStatus.length; i++) {
      var cmd = diffStatus[i].cmd;

      if (cmd === '=') {
        var el = data.getItemGraphicEl(diffStatus[i].idx1);

        if (el) {
          updatedDataInfo.push({
            el: el,
            ptIdx: i // Index of points

          });
        }
      }
    }

    if (polyline.animators && polyline.animators.length) {
      polyline.animators[0].during(function () {
        for (var i = 0; i < updatedDataInfo.length; i++) {
          var el = updatedDataInfo[i].el;
          el.attr('position', polyline.shape.__points[updatedDataInfo[i].ptIdx]);
        }
      });
    }
  },
  remove: function (ecModel) {
    var group = this.group;
    var oldData = this._data;

    this._lineGroup.removeAll();

    this._symbolDraw.remove(true); // Remove temporary created elements when highlighting


    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    });
    this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
  }
});

module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~a3df519a.3284cb77.js.map