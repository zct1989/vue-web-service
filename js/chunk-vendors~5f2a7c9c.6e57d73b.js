(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~5f2a7c9c"],{

/***/ "1e32":
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

var _dataStackHelper = __webpack_require__("ee1a");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function getSeriesStackId(seriesModel) {
  return seriesModel.get('stack') || '__ec_stack_' + seriesModel.seriesIndex;
}

function getAxisKey(polar, axis) {
  return axis.dim + polar.model.componentIndex;
}
/**
 * @param {string} seriesType
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 */


function barLayoutPolar(seriesType, ecModel, api) {
  var lastStackCoords = {};
  var barWidthAndOffset = calRadialBar(zrUtil.filter(ecModel.getSeriesByType(seriesType), function (seriesModel) {
    return !ecModel.isSeriesFiltered(seriesModel) && seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === 'polar';
  }));
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    // Check series coordinate, do layout for polar only
    if (seriesModel.coordinateSystem.type !== 'polar') {
      return;
    }

    var data = seriesModel.getData();
    var polar = seriesModel.coordinateSystem;
    var baseAxis = polar.getBaseAxis();
    var axisKey = getAxisKey(polar, baseAxis);
    var stackId = getSeriesStackId(seriesModel);
    var columnLayoutInfo = barWidthAndOffset[axisKey][stackId];
    var columnOffset = columnLayoutInfo.offset;
    var columnWidth = columnLayoutInfo.width;
    var valueAxis = polar.getOtherAxis(baseAxis);
    var cx = seriesModel.coordinateSystem.cx;
    var cy = seriesModel.coordinateSystem.cy;
    var barMinHeight = seriesModel.get('barMinHeight') || 0;
    var barMinAngle = seriesModel.get('barMinAngle') || 0;
    lastStackCoords[stackId] = lastStackCoords[stackId] || [];
    var valueDim = data.mapDimension(valueAxis.dim);
    var baseDim = data.mapDimension(baseAxis.dim);
    var stacked = isDimensionStacked(data, valueDim
    /*, baseDim*/
    );
    var clampLayout = baseAxis.dim !== 'radius' || !seriesModel.get('roundCap', true);
    var valueAxisStart = valueAxis.getExtent()[0];

    for (var idx = 0, len = data.count(); idx < len; idx++) {
      var value = data.get(valueDim, idx);
      var baseValue = data.get(baseDim, idx);

      if (isNaN(value)) {
        continue;
      }

      var sign = value >= 0 ? 'p' : 'n';
      var baseCoord = valueAxisStart; // Because of the barMinHeight, we can not use the value in
      // stackResultDimension directly.
      // Only ordinal axis can be stacked.

      if (stacked) {
        if (!lastStackCoords[stackId][baseValue]) {
          lastStackCoords[stackId][baseValue] = {
            p: valueAxisStart,
            // Positive stack
            n: valueAxisStart // Negative stack

          };
        } // Should also consider #4243


        baseCoord = lastStackCoords[stackId][baseValue][sign];
      }

      var r0;
      var r;
      var startAngle;
      var endAngle; // radial sector

      if (valueAxis.dim === 'radius') {
        var radiusSpan = valueAxis.dataToRadius(value) - valueAxisStart;
        var angle = baseAxis.dataToAngle(baseValue);

        if (Math.abs(radiusSpan) < barMinHeight) {
          radiusSpan = (radiusSpan < 0 ? -1 : 1) * barMinHeight;
        }

        r0 = baseCoord;
        r = baseCoord + radiusSpan;
        startAngle = angle - columnOffset;
        endAngle = startAngle - columnWidth;
        stacked && (lastStackCoords[stackId][baseValue][sign] = r);
      } // tangential sector
      else {
          var angleSpan = valueAxis.dataToAngle(value, clampLayout) - valueAxisStart;
          var radius = baseAxis.dataToRadius(baseValue);

          if (Math.abs(angleSpan) < barMinAngle) {
            angleSpan = (angleSpan < 0 ? -1 : 1) * barMinAngle;
          }

          r0 = radius + columnOffset;
          r = r0 + columnWidth;
          startAngle = baseCoord;
          endAngle = baseCoord + angleSpan; // if the previous stack is at the end of the ring,
          // add a round to differentiate it from origin
          // var extent = angleAxis.getExtent();
          // var stackCoord = angle;
          // if (stackCoord === extent[0] && value > 0) {
          //     stackCoord = extent[1];
          // }
          // else if (stackCoord === extent[1] && value < 0) {
          //     stackCoord = extent[0];
          // }

          stacked && (lastStackCoords[stackId][baseValue][sign] = endAngle);
        }

      data.setItemLayout(idx, {
        cx: cx,
        cy: cy,
        r0: r0,
        r: r,
        // Consider that positive angle is anti-clockwise,
        // while positive radian of sector is clockwise
        startAngle: -startAngle * Math.PI / 180,
        endAngle: -endAngle * Math.PI / 180
      });
    }
  }, this);
}
/**
 * Calculate bar width and offset for radial bar charts
 */


function calRadialBar(barSeries, api) {
  // Columns info on each category axis. Key is polar name
  var columnsMap = {};
  zrUtil.each(barSeries, function (seriesModel, idx) {
    var data = seriesModel.getData();
    var polar = seriesModel.coordinateSystem;
    var baseAxis = polar.getBaseAxis();
    var axisKey = getAxisKey(polar, baseAxis);
    var axisExtent = baseAxis.getExtent();
    var bandWidth = baseAxis.type === 'category' ? baseAxis.getBandWidth() : Math.abs(axisExtent[1] - axisExtent[0]) / data.count();
    var columnsOnAxis = columnsMap[axisKey] || {
      bandWidth: bandWidth,
      remainedWidth: bandWidth,
      autoWidthCount: 0,
      categoryGap: '20%',
      gap: '30%',
      stacks: {}
    };
    var stacks = columnsOnAxis.stacks;
    columnsMap[axisKey] = columnsOnAxis;
    var stackId = getSeriesStackId(seriesModel);

    if (!stacks[stackId]) {
      columnsOnAxis.autoWidthCount++;
    }

    stacks[stackId] = stacks[stackId] || {
      width: 0,
      maxWidth: 0
    };
    var barWidth = parsePercent(seriesModel.get('barWidth'), bandWidth);
    var barMaxWidth = parsePercent(seriesModel.get('barMaxWidth'), bandWidth);
    var barGap = seriesModel.get('barGap');
    var barCategoryGap = seriesModel.get('barCategoryGap');

    if (barWidth && !stacks[stackId].width) {
      barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
      stacks[stackId].width = barWidth;
      columnsOnAxis.remainedWidth -= barWidth;
    }

    barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
    barGap != null && (columnsOnAxis.gap = barGap);
    barCategoryGap != null && (columnsOnAxis.categoryGap = barCategoryGap);
  });
  var result = {};
  zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {
    result[coordSysName] = {};
    var stacks = columnsOnAxis.stacks;
    var bandWidth = columnsOnAxis.bandWidth;
    var categoryGap = parsePercent(columnsOnAxis.categoryGap, bandWidth);
    var barGapPercent = parsePercent(columnsOnAxis.gap, 1);
    var remainedWidth = columnsOnAxis.remainedWidth;
    var autoWidthCount = columnsOnAxis.autoWidthCount;
    var autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0); // Find if any auto calculated bar exceeded maxBarWidth

    zrUtil.each(stacks, function (column, stack) {
      var maxWidth = column.maxWidth;

      if (maxWidth && maxWidth < autoWidth) {
        maxWidth = Math.min(maxWidth, remainedWidth);

        if (column.width) {
          maxWidth = Math.min(maxWidth, column.width);
        }

        remainedWidth -= maxWidth;
        column.width = maxWidth;
        autoWidthCount--;
      }
    }); // Recalculate width again

    autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    var widthSum = 0;
    var lastColumn;
    zrUtil.each(stacks, function (column, idx) {
      if (!column.width) {
        column.width = autoWidth;
      }

      lastColumn = column;
      widthSum += column.width * (1 + barGapPercent);
    });

    if (lastColumn) {
      widthSum -= lastColumn.width * barGapPercent;
    }

    var offset = -widthSum / 2;
    zrUtil.each(stacks, function (column, stackId) {
      result[coordSysName][stackId] = result[coordSysName][stackId] || {
        offset: offset,
        width: column.width
      };
      offset += column.width * (1 + barGapPercent);
    });
  });
  return result;
}

var _default = barLayoutPolar;
module.exports = _default;

/***/ }),

/***/ "87c3":
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

var map = _util.map;

var createRenderPlanner = __webpack_require__("cccd");

var _dataStackHelper = __webpack_require__("ee1a");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
function _default(seriesType) {
  return {
    seriesType: seriesType,
    plan: createRenderPlanner(),
    reset: function (seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeRender = pipelineContext.large;

      if (!coordSys) {
        return;
      }

      var dims = map(coordSys.dimensions, function (dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo('stackResultDimension');

      if (isDimensionStacked(data, dims[0]
      /*, dims[1]*/
      )) {
        dims[0] = stackResultDim;
      }

      if (isDimensionStacked(data, dims[1]
      /*, dims[0]*/
      )) {
        dims[1] = stackResultDim;
      }

      function progress(params, data) {
        var segCount = params.end - params.start;
        var points = isLargeRender && new Float32Array(segCount * dimLen);

        for (var i = params.start, offset = 0, tmpIn = [], tmpOut = []; i < params.end; i++) {
          var point;

          if (dimLen === 1) {
            var x = data.get(dims[0], i);
            point = !isNaN(x) && coordSys.dataToPoint(x, null, tmpOut);
          } else {
            var x = tmpIn[0] = data.get(dims[0], i);
            var y = tmpIn[1] = data.get(dims[1], i); // Also {Array.<number>}, not undefined to avoid if...else... statement

            point = !isNaN(x) && !isNaN(y) && coordSys.dataToPoint(tmpIn, null, tmpOut);
          }

          if (isLargeRender) {
            points[offset++] = point ? point[0] : NaN;
            points[offset++] = point ? point[1] : NaN;
          } else {
            data.setItemLayout(i, point && point.slice() || [NaN, NaN]);
          }
        }

        isLargeRender && data.setLayout('symbolPoints', points);
      }

      return dimLen && {
        progress: progress
      };
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "9d57":
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

var _dataStackHelper = __webpack_require__("ee1a");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

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
var STACK_PREFIX = '__ec_stack_';
var LARGE_BAR_MIN_WIDTH = 0.5;
var LargeArr = typeof Float32Array !== 'undefined' ? Float32Array : Array;

function getSeriesStackId(seriesModel) {
  return seriesModel.get('stack') || STACK_PREFIX + seriesModel.seriesIndex;
}

function getAxisKey(axis) {
  return axis.dim + axis.index;
}
/**
 * @param {Object} opt
 * @param {module:echarts/coord/Axis} opt.axis Only support category axis currently.
 * @param {number} opt.count Positive interger.
 * @param {number} [opt.barWidth]
 * @param {number} [opt.barMaxWidth]
 * @param {number} [opt.barMinWidth]
 * @param {number} [opt.barGap]
 * @param {number} [opt.barCategoryGap]
 * @return {Object} {width, offset, offsetCenter} If axis.type is not 'category', return undefined.
 */


function getLayoutOnAxis(opt) {
  var params = [];
  var baseAxis = opt.axis;
  var axisKey = 'axis0';

  if (baseAxis.type !== 'category') {
    return;
  }

  var bandWidth = baseAxis.getBandWidth();

  for (var i = 0; i < opt.count || 0; i++) {
    params.push(zrUtil.defaults({
      bandWidth: bandWidth,
      axisKey: axisKey,
      stackId: STACK_PREFIX + i
    }, opt));
  }

  var widthAndOffsets = doCalBarWidthAndOffset(params);
  var result = [];

  for (var i = 0; i < opt.count; i++) {
    var item = widthAndOffsets[axisKey][STACK_PREFIX + i];
    item.offsetCenter = item.offset + item.width / 2;
    result.push(item);
  }

  return result;
}

function prepareLayoutBarSeries(seriesType, ecModel) {
  var seriesModels = [];
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    // Check series coordinate, do layout for cartesian2d only
    if (isOnCartesian(seriesModel) && !isInLargeMode(seriesModel)) {
      seriesModels.push(seriesModel);
    }
  });
  return seriesModels;
}
/**
 * Map from (baseAxis.dim + '_' + baseAxis.index) to min gap of two adjacent
 * values.
 * This works for time axes, value axes, and log axes.
 * For a single time axis, return value is in the form like
 * {'x_0': [1000000]}.
 * The value of 1000000 is in milliseconds.
 */


function getValueAxesMinGaps(barSeries) {
  /**
   * Map from axis.index to values.
   * For a single time axis, axisValues is in the form like
   * {'x_0': [1495555200000, 1495641600000, 1495728000000]}.
   * Items in axisValues[x], e.g. 1495555200000, are time values of all
   * series.
   */
  var axisValues = {};
  zrUtil.each(barSeries, function (seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();

    if (baseAxis.type !== 'time' && baseAxis.type !== 'value') {
      return;
    }

    var data = seriesModel.getData();
    var key = baseAxis.dim + '_' + baseAxis.index;
    var dim = data.mapDimension(baseAxis.dim);

    for (var i = 0, cnt = data.count(); i < cnt; ++i) {
      var value = data.get(dim, i);

      if (!axisValues[key]) {
        // No previous data for the axis
        axisValues[key] = [value];
      } else {
        // No value in previous series
        axisValues[key].push(value);
      } // Ignore duplicated time values in the same axis

    }
  });
  var axisMinGaps = [];

  for (var key in axisValues) {
    if (axisValues.hasOwnProperty(key)) {
      var valuesInAxis = axisValues[key];

      if (valuesInAxis) {
        // Sort axis values into ascending order to calculate gaps
        valuesInAxis.sort(function (a, b) {
          return a - b;
        });
        var min = null;

        for (var j = 1; j < valuesInAxis.length; ++j) {
          var delta = valuesInAxis[j] - valuesInAxis[j - 1];

          if (delta > 0) {
            // Ignore 0 delta because they are of the same axis value
            min = min === null ? delta : Math.min(min, delta);
          }
        } // Set to null if only have one data


        axisMinGaps[key] = min;
      }
    }
  }

  return axisMinGaps;
}

function makeColumnLayout(barSeries) {
  var axisMinGaps = getValueAxesMinGaps(barSeries);
  var seriesInfoList = [];
  zrUtil.each(barSeries, function (seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var axisExtent = baseAxis.getExtent();
    var bandWidth;

    if (baseAxis.type === 'category') {
      bandWidth = baseAxis.getBandWidth();
    } else if (baseAxis.type === 'value' || baseAxis.type === 'time') {
      var key = baseAxis.dim + '_' + baseAxis.index;
      var minGap = axisMinGaps[key];
      var extentSpan = Math.abs(axisExtent[1] - axisExtent[0]);
      var scale = baseAxis.scale.getExtent();
      var scaleSpan = Math.abs(scale[1] - scale[0]);
      bandWidth = minGap ? extentSpan / scaleSpan * minGap : extentSpan; // When there is only one data value
    } else {
      var data = seriesModel.getData();
      bandWidth = Math.abs(axisExtent[1] - axisExtent[0]) / data.count();
    }

    var barWidth = parsePercent(seriesModel.get('barWidth'), bandWidth);
    var barMaxWidth = parsePercent(seriesModel.get('barMaxWidth'), bandWidth);
    var barMinWidth = parsePercent( // barMinWidth by default is 1 in cartesian. Because in value axis,
    // the auto-calculated bar width might be less than 1.
    seriesModel.get('barMinWidth') || 1, bandWidth);
    var barGap = seriesModel.get('barGap');
    var barCategoryGap = seriesModel.get('barCategoryGap');
    seriesInfoList.push({
      bandWidth: bandWidth,
      barWidth: barWidth,
      barMaxWidth: barMaxWidth,
      barMinWidth: barMinWidth,
      barGap: barGap,
      barCategoryGap: barCategoryGap,
      axisKey: getAxisKey(baseAxis),
      stackId: getSeriesStackId(seriesModel)
    });
  });
  return doCalBarWidthAndOffset(seriesInfoList);
}

function doCalBarWidthAndOffset(seriesInfoList) {
  // Columns info on each category axis. Key is cartesian name
  var columnsMap = {};
  zrUtil.each(seriesInfoList, function (seriesInfo, idx) {
    var axisKey = seriesInfo.axisKey;
    var bandWidth = seriesInfo.bandWidth;
    var columnsOnAxis = columnsMap[axisKey] || {
      bandWidth: bandWidth,
      remainedWidth: bandWidth,
      autoWidthCount: 0,
      categoryGap: '20%',
      gap: '30%',
      stacks: {}
    };
    var stacks = columnsOnAxis.stacks;
    columnsMap[axisKey] = columnsOnAxis;
    var stackId = seriesInfo.stackId;

    if (!stacks[stackId]) {
      columnsOnAxis.autoWidthCount++;
    }

    stacks[stackId] = stacks[stackId] || {
      width: 0,
      maxWidth: 0
    }; // Caution: In a single coordinate system, these barGrid attributes
    // will be shared by series. Consider that they have default values,
    // only the attributes set on the last series will work.
    // Do not change this fact unless there will be a break change.

    var barWidth = seriesInfo.barWidth;

    if (barWidth && !stacks[stackId].width) {
      // See #6312, do not restrict width.
      stacks[stackId].width = barWidth;
      barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
      columnsOnAxis.remainedWidth -= barWidth;
    }

    var barMaxWidth = seriesInfo.barMaxWidth;
    barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
    var barMinWidth = seriesInfo.barMinWidth;
    barMinWidth && (stacks[stackId].minWidth = barMinWidth);
    var barGap = seriesInfo.barGap;
    barGap != null && (columnsOnAxis.gap = barGap);
    var barCategoryGap = seriesInfo.barCategoryGap;
    barCategoryGap != null && (columnsOnAxis.categoryGap = barCategoryGap);
  });
  var result = {};
  zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {
    result[coordSysName] = {};
    var stacks = columnsOnAxis.stacks;
    var bandWidth = columnsOnAxis.bandWidth;
    var categoryGap = parsePercent(columnsOnAxis.categoryGap, bandWidth);
    var barGapPercent = parsePercent(columnsOnAxis.gap, 1);
    var remainedWidth = columnsOnAxis.remainedWidth;
    var autoWidthCount = columnsOnAxis.autoWidthCount;
    var autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0); // Find if any auto calculated bar exceeded maxBarWidth

    zrUtil.each(stacks, function (column) {
      var maxWidth = column.maxWidth;
      var minWidth = column.minWidth;

      if (!column.width) {
        var finalWidth = autoWidth;

        if (maxWidth && maxWidth < finalWidth) {
          finalWidth = Math.min(maxWidth, remainedWidth);
        } // `minWidth` has higher priority. `minWidth` decide that wheter the
        // bar is able to be visible. So `minWidth` should not be restricted
        // by `maxWidth` or `remainedWidth` (which is from `bandWidth`). In
        // the extreme cases for `value` axis, bars are allowed to overlap
        // with each other if `minWidth` specified.


        if (minWidth && minWidth > finalWidth) {
          finalWidth = minWidth;
        }

        if (finalWidth !== autoWidth) {
          column.width = finalWidth;
          remainedWidth -= finalWidth + barGapPercent * finalWidth;
          autoWidthCount--;
        }
      } else {
        // `barMinWidth/barMaxWidth` has higher priority than `barWidth`, as
        // CSS does. Becuase barWidth can be a percent value, where
        // `barMaxWidth` can be used to restrict the final width.
        var finalWidth = column.width;

        if (maxWidth) {
          finalWidth = Math.min(finalWidth, maxWidth);
        } // `minWidth` has higher priority, as described above


        if (minWidth) {
          finalWidth = Math.max(finalWidth, minWidth);
        }

        column.width = finalWidth;
        remainedWidth -= finalWidth + barGapPercent * finalWidth;
        autoWidthCount--;
      }
    }); // Recalculate width again

    autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    var widthSum = 0;
    var lastColumn;
    zrUtil.each(stacks, function (column, idx) {
      if (!column.width) {
        column.width = autoWidth;
      }

      lastColumn = column;
      widthSum += column.width * (1 + barGapPercent);
    });

    if (lastColumn) {
      widthSum -= lastColumn.width * barGapPercent;
    }

    var offset = -widthSum / 2;
    zrUtil.each(stacks, function (column, stackId) {
      result[coordSysName][stackId] = result[coordSysName][stackId] || {
        bandWidth: bandWidth,
        offset: offset,
        width: column.width
      };
      offset += column.width * (1 + barGapPercent);
    });
  });
  return result;
}
/**
 * @param {Object} barWidthAndOffset The result of makeColumnLayout
 * @param {module:echarts/coord/Axis} axis
 * @param {module:echarts/model/Series} [seriesModel] If not provided, return all.
 * @return {Object} {stackId: {offset, width}} or {offset, width} if seriesModel provided.
 */


function retrieveColumnLayout(barWidthAndOffset, axis, seriesModel) {
  if (barWidthAndOffset && axis) {
    var result = barWidthAndOffset[getAxisKey(axis)];

    if (result != null && seriesModel != null) {
      result = result[getSeriesStackId(seriesModel)];
    }

    return result;
  }
}
/**
 * @param {string} seriesType
 * @param {module:echarts/model/Global} ecModel
 */


function layout(seriesType, ecModel) {
  var seriesModels = prepareLayoutBarSeries(seriesType, ecModel);
  var barWidthAndOffset = makeColumnLayout(seriesModels);
  var lastStackCoords = {};
  var lastStackCoordsOrigin = {};
  zrUtil.each(seriesModels, function (seriesModel) {
    var data = seriesModel.getData();
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var stackId = getSeriesStackId(seriesModel);
    var columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId];
    var columnOffset = columnLayoutInfo.offset;
    var columnWidth = columnLayoutInfo.width;
    var valueAxis = cartesian.getOtherAxis(baseAxis);
    var barMinHeight = seriesModel.get('barMinHeight') || 0;
    lastStackCoords[stackId] = lastStackCoords[stackId] || [];
    lastStackCoordsOrigin[stackId] = lastStackCoordsOrigin[stackId] || []; // Fix #4243

    data.setLayout({
      bandWidth: columnLayoutInfo.bandWidth,
      offset: columnOffset,
      size: columnWidth
    });
    var valueDim = data.mapDimension(valueAxis.dim);
    var baseDim = data.mapDimension(baseAxis.dim);
    var stacked = isDimensionStacked(data, valueDim
    /*, baseDim*/
    );
    var isValueAxisH = valueAxis.isHorizontal();
    var valueAxisStart = getValueAxisStart(baseAxis, valueAxis, stacked);

    for (var idx = 0, len = data.count(); idx < len; idx++) {
      var value = data.get(valueDim, idx);
      var baseValue = data.get(baseDim, idx); // If dataZoom in filteMode: 'empty', the baseValue can be set as NaN in "axisProxy".

      if (isNaN(value) || isNaN(baseValue)) {
        continue;
      }

      var sign = value >= 0 ? 'p' : 'n';
      var baseCoord = valueAxisStart; // Because of the barMinHeight, we can not use the value in
      // stackResultDimension directly.

      if (stacked) {
        // Only ordinal axis can be stacked.
        if (!lastStackCoords[stackId][baseValue]) {
          lastStackCoords[stackId][baseValue] = {
            p: valueAxisStart,
            // Positive stack
            n: valueAxisStart // Negative stack

          };
        } // Should also consider #4243


        baseCoord = lastStackCoords[stackId][baseValue][sign];
      }

      var x;
      var y;
      var width;
      var height;

      if (isValueAxisH) {
        var coord = cartesian.dataToPoint([value, baseValue]);
        x = baseCoord;
        y = coord[1] + columnOffset;
        width = coord[0] - valueAxisStart;
        height = columnWidth;

        if (Math.abs(width) < barMinHeight) {
          width = (width < 0 ? -1 : 1) * barMinHeight;
        }

        stacked && (lastStackCoords[stackId][baseValue][sign] += width);
      } else {
        var coord = cartesian.dataToPoint([baseValue, value]);
        x = coord[0] + columnOffset;
        y = baseCoord;
        width = columnWidth;
        height = coord[1] - valueAxisStart;

        if (Math.abs(height) < barMinHeight) {
          // Include zero to has a positive bar
          height = (height <= 0 ? -1 : 1) * barMinHeight;
        }

        stacked && (lastStackCoords[stackId][baseValue][sign] += height);
      }

      data.setItemLayout(idx, {
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, this);
} // TODO: Do not support stack in large mode yet.


var largeLayout = {
  seriesType: 'bar',
  plan: createRenderPlanner(),
  reset: function (seriesModel) {
    if (!isOnCartesian(seriesModel) || !isInLargeMode(seriesModel)) {
      return;
    }

    var data = seriesModel.getData();
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var valueAxis = cartesian.getOtherAxis(baseAxis);
    var valueDim = data.mapDimension(valueAxis.dim);
    var baseDim = data.mapDimension(baseAxis.dim);
    var valueAxisHorizontal = valueAxis.isHorizontal();
    var valueDimIdx = valueAxisHorizontal ? 0 : 1;
    var barWidth = retrieveColumnLayout(makeColumnLayout([seriesModel]), baseAxis, seriesModel).width;

    if (!(barWidth > LARGE_BAR_MIN_WIDTH)) {
      // jshint ignore:line
      barWidth = LARGE_BAR_MIN_WIDTH;
    }

    return {
      progress: progress
    };

    function progress(params, data) {
      var count = params.count;
      var largePoints = new LargeArr(count * 2);
      var largeDataIndices = new LargeArr(count);
      var dataIndex;
      var coord = [];
      var valuePair = [];
      var pointsOffset = 0;
      var idxOffset = 0;

      while ((dataIndex = params.next()) != null) {
        valuePair[valueDimIdx] = data.get(valueDim, dataIndex);
        valuePair[1 - valueDimIdx] = data.get(baseDim, dataIndex);
        coord = cartesian.dataToPoint(valuePair, null, coord); // Data index might not be in order, depends on `progressiveChunkMode`.

        largePoints[pointsOffset++] = coord[0];
        largePoints[pointsOffset++] = coord[1];
        largeDataIndices[idxOffset++] = dataIndex;
      }

      data.setLayout({
        largePoints: largePoints,
        largeDataIndices: largeDataIndices,
        barWidth: barWidth,
        valueAxisStart: getValueAxisStart(baseAxis, valueAxis, false),
        valueAxisHorizontal: valueAxisHorizontal
      });
    }
  }
};

function isOnCartesian(seriesModel) {
  return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === 'cartesian2d';
}

function isInLargeMode(seriesModel) {
  return seriesModel.pipelineContext && seriesModel.pipelineContext.large;
} // See cases in `test/bar-start.html` and `#7412`, `#8747`.


function getValueAxisStart(baseAxis, valueAxis, stacked) {
  return valueAxis.toGlobalCoord(valueAxis.dataToCoord(valueAxis.type === 'log' ? 1 : 0));
}

exports.getLayoutOnAxis = getLayoutOnAxis;
exports.prepareLayoutBarSeries = prepareLayoutBarSeries;
exports.makeColumnLayout = makeColumnLayout;
exports.retrieveColumnLayout = retrieveColumnLayout;
exports.layout = layout;
exports.largeLayout = largeLayout;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~5f2a7c9c.6e57d73b.js.map