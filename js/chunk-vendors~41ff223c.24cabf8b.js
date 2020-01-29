(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~41ff223c"],{

/***/ "01ed":
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

__webpack_require__("5aa9");

__webpack_require__("af24");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Grid view
echarts.extendComponentView({
  type: 'grid',
  render: function (gridModel, ecModel) {
    this.group.removeAll();

    if (gridModel.get('show')) {
      this.group.add(new graphic.Rect({
        shape: gridModel.coordinateSystem.getRect(),
        style: zrUtil.defaults({
          fill: gridModel.get('backgroundColor')
        }, gridModel.getItemStyle()),
        silent: true,
        z2: -1
      }));
    }
  }
});
echarts.registerPreprocessor(function (option) {
  // Only create grid when need
  if (option.xAxis && option.yAxis && !option.grid) {
    option.grid = {};
  }
});

/***/ }),

/***/ "0352":
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

var ComponentModel = __webpack_require__("6cb7");

var ComponentView = __webpack_require__("b12f");

var _sourceHelper = __webpack_require__("0f99");

var detectSourceFormat = _sourceHelper.detectSourceFormat;

var _sourceType = __webpack_require__("93d0");

var SERIES_LAYOUT_BY_COLUMN = _sourceType.SERIES_LAYOUT_BY_COLUMN;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * This module is imported by echarts directly.
 *
 * Notice:
 * Always keep this file exists for backward compatibility.
 * Because before 4.1.0, dataset is an optional component,
 * some users may import this module manually.
 */
ComponentModel.extend({
  type: 'dataset',

  /**
   * @protected
   */
  defaultOption: {
    // 'row', 'column'
    seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
    // null/'auto': auto detect header, see "module:echarts/data/helper/sourceHelper"
    sourceHeader: null,
    dimensions: null,
    source: null
  },
  optionUpdated: function () {
    detectSourceFormat(this);
  }
});
ComponentView.extend({
  type: 'dataset'
});

/***/ }),

/***/ "0a6d":
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

__webpack_require__("e4d1");

__webpack_require__("7f72");

/***/ }),

/***/ "10cc":
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

var BoundingRect = __webpack_require__("9850");

var visualSolution = __webpack_require__("2b8c");

var selector = __webpack_require__("a890");

var throttleUtil = __webpack_require__("88b3");

var BrushTargetManager = __webpack_require__("bd9e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var STATE_LIST = ['inBrush', 'outOfBrush'];
var DISPATCH_METHOD = '__ecBrushSelect';
var DISPATCH_FLAG = '__ecInBrushSelectEvent';
var PRIORITY_BRUSH = echarts.PRIORITY.VISUAL.BRUSH;
/**
 * Layout for visual, the priority higher than other layout, and before brush visual.
 */

echarts.registerLayout(PRIORITY_BRUSH, function (ecModel, api, payload) {
  ecModel.eachComponent({
    mainType: 'brush'
  }, function (brushModel) {
    payload && payload.type === 'takeGlobalCursor' && brushModel.setBrushOption(payload.key === 'brush' ? payload.brushOption : {
      brushType: false
    });
    var brushTargetManager = brushModel.brushTargetManager = new BrushTargetManager(brushModel.option, ecModel);
    brushTargetManager.setInputRanges(brushModel.areas, ecModel);
  });
});
/**
 * Register the visual encoding if this modules required.
 */

echarts.registerVisual(PRIORITY_BRUSH, function (ecModel, api, payload) {
  var brushSelected = [];
  var throttleType;
  var throttleDelay;
  ecModel.eachComponent({
    mainType: 'brush'
  }, function (brushModel, brushIndex) {
    var thisBrushSelected = {
      brushId: brushModel.id,
      brushIndex: brushIndex,
      brushName: brushModel.name,
      areas: zrUtil.clone(brushModel.areas),
      selected: []
    }; // Every brush component exists in event params, convenient
    // for user to find by index.

    brushSelected.push(thisBrushSelected);
    var brushOption = brushModel.option;
    var brushLink = brushOption.brushLink;
    var linkedSeriesMap = [];
    var selectedDataIndexForLink = [];
    var rangeInfoBySeries = [];
    var hasBrushExists = 0;

    if (!brushIndex) {
      // Only the first throttle setting works.
      throttleType = brushOption.throttleType;
      throttleDelay = brushOption.throttleDelay;
    } // Add boundingRect and selectors to range.


    var areas = zrUtil.map(brushModel.areas, function (area) {
      return bindSelector(zrUtil.defaults({
        boundingRect: boundingRectBuilders[area.brushType](area)
      }, area));
    });
    var visualMappings = visualSolution.createVisualMappings(brushModel.option, STATE_LIST, function (mappingOption) {
      mappingOption.mappingMethod = 'fixed';
    });
    zrUtil.isArray(brushLink) && zrUtil.each(brushLink, function (seriesIndex) {
      linkedSeriesMap[seriesIndex] = 1;
    });

    function linkOthers(seriesIndex) {
      return brushLink === 'all' || linkedSeriesMap[seriesIndex];
    } // If no supported brush or no brush on the series,
    // all visuals should be in original state.


    function brushed(rangeInfoList) {
      return !!rangeInfoList.length;
    }
    /**
     * Logic for each series: (If the logic has to be modified one day, do it carefully!)
     *
     * ( brushed ┬ && ┬hasBrushExist ┬ && linkOthers  ) => StepA: ┬record, ┬ StepB: ┬visualByRecord.
     *   !brushed┘    ├hasBrushExist ┤                            └nothing,┘        ├visualByRecord.
     *                └!hasBrushExist┘                                              └nothing.
     * ( !brushed  && ┬hasBrushExist ┬ && linkOthers  ) => StepA:  nothing,  StepB: ┬visualByRecord.
     *                └!hasBrushExist┘                                              └nothing.
     * ( brushed ┬ &&                     !linkOthers ) => StepA:  nothing,  StepB: ┬visualByCheck.
     *   !brushed┘                                                                  └nothing.
     * ( !brushed  &&                     !linkOthers ) => StepA:  nothing,  StepB:  nothing.
     */
    // Step A


    ecModel.eachSeries(function (seriesModel, seriesIndex) {
      var rangeInfoList = rangeInfoBySeries[seriesIndex] = [];
      seriesModel.subType === 'parallel' ? stepAParallel(seriesModel, seriesIndex, rangeInfoList) : stepAOthers(seriesModel, seriesIndex, rangeInfoList);
    });

    function stepAParallel(seriesModel, seriesIndex) {
      var coordSys = seriesModel.coordinateSystem;
      hasBrushExists |= coordSys.hasAxisBrushed();
      linkOthers(seriesIndex) && coordSys.eachActiveState(seriesModel.getData(), function (activeState, dataIndex) {
        activeState === 'active' && (selectedDataIndexForLink[dataIndex] = 1);
      });
    }

    function stepAOthers(seriesModel, seriesIndex, rangeInfoList) {
      var selectorsByBrushType = getSelectorsByBrushType(seriesModel);

      if (!selectorsByBrushType || brushModelNotControll(brushModel, seriesIndex)) {
        return;
      }

      zrUtil.each(areas, function (area) {
        selectorsByBrushType[area.brushType] && brushModel.brushTargetManager.controlSeries(area, seriesModel, ecModel) && rangeInfoList.push(area);
        hasBrushExists |= brushed(rangeInfoList);
      });

      if (linkOthers(seriesIndex) && brushed(rangeInfoList)) {
        var data = seriesModel.getData();
        data.each(function (dataIndex) {
          if (checkInRange(selectorsByBrushType, rangeInfoList, data, dataIndex)) {
            selectedDataIndexForLink[dataIndex] = 1;
          }
        });
      }
    } // Step B


    ecModel.eachSeries(function (seriesModel, seriesIndex) {
      var seriesBrushSelected = {
        seriesId: seriesModel.id,
        seriesIndex: seriesIndex,
        seriesName: seriesModel.name,
        dataIndex: []
      }; // Every series exists in event params, convenient
      // for user to find series by seriesIndex.

      thisBrushSelected.selected.push(seriesBrushSelected);
      var selectorsByBrushType = getSelectorsByBrushType(seriesModel);
      var rangeInfoList = rangeInfoBySeries[seriesIndex];
      var data = seriesModel.getData();
      var getValueState = linkOthers(seriesIndex) ? function (dataIndex) {
        return selectedDataIndexForLink[dataIndex] ? (seriesBrushSelected.dataIndex.push(data.getRawIndex(dataIndex)), 'inBrush') : 'outOfBrush';
      } : function (dataIndex) {
        return checkInRange(selectorsByBrushType, rangeInfoList, data, dataIndex) ? (seriesBrushSelected.dataIndex.push(data.getRawIndex(dataIndex)), 'inBrush') : 'outOfBrush';
      }; // If no supported brush or no brush, all visuals are in original state.

      (linkOthers(seriesIndex) ? hasBrushExists : brushed(rangeInfoList)) && visualSolution.applyVisual(STATE_LIST, visualMappings, data, getValueState);
    });
  });
  dispatchAction(api, throttleType, throttleDelay, brushSelected, payload);
});

function dispatchAction(api, throttleType, throttleDelay, brushSelected, payload) {
  // This event will not be triggered when `setOpion`, otherwise dead lock may
  // triggered when do `setOption` in event listener, which we do not find
  // satisfactory way to solve yet. Some considered resolutions:
  // (a) Diff with prevoius selected data ant only trigger event when changed.
  // But store previous data and diff precisely (i.e., not only by dataIndex, but
  // also detect value changes in selected data) might bring complexity or fragility.
  // (b) Use spectial param like `silent` to suppress event triggering.
  // But such kind of volatile param may be weird in `setOption`.
  if (!payload) {
    return;
  }

  var zr = api.getZr();

  if (zr[DISPATCH_FLAG]) {
    return;
  }

  if (!zr[DISPATCH_METHOD]) {
    zr[DISPATCH_METHOD] = doDispatch;
  }

  var fn = throttleUtil.createOrUpdate(zr, DISPATCH_METHOD, throttleDelay, throttleType);
  fn(api, brushSelected);
}

function doDispatch(api, brushSelected) {
  if (!api.isDisposed()) {
    var zr = api.getZr();
    zr[DISPATCH_FLAG] = true;
    api.dispatchAction({
      type: 'brushSelect',
      batch: brushSelected
    });
    zr[DISPATCH_FLAG] = false;
  }
}

function checkInRange(selectorsByBrushType, rangeInfoList, data, dataIndex) {
  for (var i = 0, len = rangeInfoList.length; i < len; i++) {
    var area = rangeInfoList[i];

    if (selectorsByBrushType[area.brushType](dataIndex, data, area.selectors, area)) {
      return true;
    }
  }
}

function getSelectorsByBrushType(seriesModel) {
  var brushSelector = seriesModel.brushSelector;

  if (zrUtil.isString(brushSelector)) {
    var sels = [];
    zrUtil.each(selector, function (selectorsByElementType, brushType) {
      sels[brushType] = function (dataIndex, data, selectors, area) {
        var itemLayout = data.getItemLayout(dataIndex);
        return selectorsByElementType[brushSelector](itemLayout, selectors, area);
      };
    });
    return sels;
  } else if (zrUtil.isFunction(brushSelector)) {
    var bSelector = {};
    zrUtil.each(selector, function (sel, brushType) {
      bSelector[brushType] = brushSelector;
    });
    return bSelector;
  }

  return brushSelector;
}

function brushModelNotControll(brushModel, seriesIndex) {
  var seriesIndices = brushModel.option.seriesIndex;
  return seriesIndices != null && seriesIndices !== 'all' && (zrUtil.isArray(seriesIndices) ? zrUtil.indexOf(seriesIndices, seriesIndex) < 0 : seriesIndex !== seriesIndices);
}

function bindSelector(area) {
  var selectors = area.selectors = {};
  zrUtil.each(selector[area.brushType], function (selFn, elType) {
    // Do not use function binding or curry for performance.
    selectors[elType] = function (itemLayout) {
      return selFn(itemLayout, selectors, area);
    };
  });
  return area;
}

var boundingRectBuilders = {
  lineX: zrUtil.noop,
  lineY: zrUtil.noop,
  rect: function (area) {
    return getBoundingRectFromMinMax(area.range);
  },
  polygon: function (area) {
    var minMax;
    var range = area.range;

    for (var i = 0, len = range.length; i < len; i++) {
      minMax = minMax || [[Infinity, -Infinity], [Infinity, -Infinity]];
      var rg = range[i];
      rg[0] < minMax[0][0] && (minMax[0][0] = rg[0]);
      rg[0] > minMax[0][1] && (minMax[0][1] = rg[0]);
      rg[1] < minMax[1][0] && (minMax[1][0] = rg[1]);
      rg[1] > minMax[1][1] && (minMax[1][1] = rg[1]);
    }

    return minMax && getBoundingRectFromMinMax(minMax);
  }
};

function getBoundingRectFromMinMax(minMax) {
  return new BoundingRect(minMax[0][0], minMax[1][0], minMax[0][1] - minMax[0][0], minMax[1][1] - minMax[1][0]);
}

/***/ }),

/***/ "133d":
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

/**
 * @param {Object} finder contains {seriesIndex, dataIndex, dataIndexInside}
 * @param {module:echarts/model/Global} ecModel
 * @return {Object} {point: [x, y], el: ...} point Will not be null.
 */
function _default(finder, ecModel) {
  var point = [];
  var seriesIndex = finder.seriesIndex;
  var seriesModel;

  if (seriesIndex == null || !(seriesModel = ecModel.getSeriesByIndex(seriesIndex))) {
    return {
      point: []
    };
  }

  var data = seriesModel.getData();
  var dataIndex = modelUtil.queryDataIndex(data, finder);

  if (dataIndex == null || dataIndex < 0 || zrUtil.isArray(dataIndex)) {
    return {
      point: []
    };
  }

  var el = data.getItemGraphicEl(dataIndex);
  var coordSys = seriesModel.coordinateSystem;

  if (seriesModel.getTooltipPosition) {
    point = seriesModel.getTooltipPosition(dataIndex) || [];
  } else if (coordSys && coordSys.dataToPoint) {
    point = coordSys.dataToPoint(data.getValues(zrUtil.map(coordSys.dimensions, function (dim) {
      return data.mapDimension(dim);
    }), dataIndex, true)) || [];
  } else if (el) {
    // Use graphic bounding rect
    var rect = el.getBoundingRect().clone();
    rect.applyTransform(el.transform);
    point = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  }

  return {
    point: point,
    el: el
  };
}

module.exports = _default;

/***/ }),

/***/ "14d3":
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

var AxisBuilder = __webpack_require__("fab2");

var AxisView = __webpack_require__("6679");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'];
var selfBuilderAttrs = ['splitLine', 'splitArea', 'minorSplitLine'];

var _default = AxisView.extend({
  type: 'radiusAxis',
  axisPointerClass: 'PolarAxisPointer',
  render: function (radiusAxisModel, ecModel) {
    this.group.removeAll();

    if (!radiusAxisModel.get('show')) {
      return;
    }

    var radiusAxis = radiusAxisModel.axis;
    var polar = radiusAxis.polar;
    var angleAxis = polar.getAngleAxis();
    var ticksCoords = radiusAxis.getTicksCoords();
    var minorTicksCoords = radiusAxis.getMinorTicksCoords();
    var axisAngle = angleAxis.getExtent()[0];
    var radiusExtent = radiusAxis.getExtent();
    var layout = layoutAxis(polar, radiusAxisModel, axisAngle);
    var axisBuilder = new AxisBuilder(radiusAxisModel, layout);
    zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);
    this.group.add(axisBuilder.getGroup());
    zrUtil.each(selfBuilderAttrs, function (name) {
      if (radiusAxisModel.get(name + '.show') && !radiusAxis.scale.isBlank()) {
        this['_' + name](radiusAxisModel, polar, axisAngle, radiusExtent, ticksCoords, minorTicksCoords);
      }
    }, this);
  },

  /**
   * @private
   */
  _splitLine: function (radiusAxisModel, polar, axisAngle, radiusExtent, ticksCoords) {
    var splitLineModel = radiusAxisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineColors = lineStyleModel.get('color');
    var lineCount = 0;
    lineColors = lineColors instanceof Array ? lineColors : [lineColors];
    var splitLines = [];

    for (var i = 0; i < ticksCoords.length; i++) {
      var colorIndex = lineCount++ % lineColors.length;
      splitLines[colorIndex] = splitLines[colorIndex] || [];
      splitLines[colorIndex].push(new graphic.Circle({
        shape: {
          cx: polar.cx,
          cy: polar.cy,
          r: ticksCoords[i].coord
        }
      }));
    } // Simple optimization
    // Batching the lines if color are the same


    for (var i = 0; i < splitLines.length; i++) {
      this.group.add(graphic.mergePath(splitLines[i], {
        style: zrUtil.defaults({
          stroke: lineColors[i % lineColors.length],
          fill: null
        }, lineStyleModel.getLineStyle()),
        silent: true
      }));
    }
  },

  /**
   * @private
   */
  _minorSplitLine: function (radiusAxisModel, polar, axisAngle, radiusExtent, ticksCoords, minorTicksCoords) {
    if (!minorTicksCoords.length) {
      return;
    }

    var minorSplitLineModel = radiusAxisModel.getModel('minorSplitLine');
    var lineStyleModel = minorSplitLineModel.getModel('lineStyle');
    var lines = [];

    for (var i = 0; i < minorTicksCoords.length; i++) {
      for (var k = 0; k < minorTicksCoords[i].length; k++) {
        lines.push(new graphic.Circle({
          shape: {
            cx: polar.cx,
            cy: polar.cy,
            r: minorTicksCoords[i][k].coord
          }
        }));
      }
    }

    this.group.add(graphic.mergePath(lines, {
      style: zrUtil.defaults({
        fill: null
      }, lineStyleModel.getLineStyle()),
      silent: true
    }));
  },

  /**
   * @private
   */
  _splitArea: function (radiusAxisModel, polar, axisAngle, radiusExtent, ticksCoords) {
    if (!ticksCoords.length) {
      return;
    }

    var splitAreaModel = radiusAxisModel.getModel('splitArea');
    var areaStyleModel = splitAreaModel.getModel('areaStyle');
    var areaColors = areaStyleModel.get('color');
    var lineCount = 0;
    areaColors = areaColors instanceof Array ? areaColors : [areaColors];
    var splitAreas = [];
    var prevRadius = ticksCoords[0].coord;

    for (var i = 1; i < ticksCoords.length; i++) {
      var colorIndex = lineCount++ % areaColors.length;
      splitAreas[colorIndex] = splitAreas[colorIndex] || [];
      splitAreas[colorIndex].push(new graphic.Sector({
        shape: {
          cx: polar.cx,
          cy: polar.cy,
          r0: prevRadius,
          r: ticksCoords[i].coord,
          startAngle: 0,
          endAngle: Math.PI * 2
        },
        silent: true
      }));
      prevRadius = ticksCoords[i].coord;
    } // Simple optimization
    // Batching the lines if color are the same


    for (var i = 0; i < splitAreas.length; i++) {
      this.group.add(graphic.mergePath(splitAreas[i], {
        style: zrUtil.defaults({
          fill: areaColors[i % areaColors.length]
        }, areaStyleModel.getAreaStyle()),
        silent: true
      }));
    }
  }
});
/**
 * @inner
 */


function layoutAxis(polar, radiusAxisModel, axisAngle) {
  return {
    position: [polar.cx, polar.cy],
    rotation: axisAngle / 180 * Math.PI,
    labelDirection: -1,
    tickDirection: -1,
    nameDirection: 1,
    labelRotate: radiusAxisModel.getModel('axisLabel').get('rotate'),
    // Over splitLine and splitArea
    z2: 1
  };
}

module.exports = _default;

/***/ }),

/***/ "17d6":
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

var env = __webpack_require__("22d1");

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
var each = zrUtil.each;
/**
 * @param {string} key
 * @param {module:echarts/ExtensionAPI} api
 * @param {Function} handler
 *      param: {string} currTrigger
 *      param: {Array.<number>} point
 */

function register(key, api, handler) {
  if (env.node) {
    return;
  }

  var zr = api.getZr();
  inner(zr).records || (inner(zr).records = {});
  initGlobalListeners(zr, api);
  var record = inner(zr).records[key] || (inner(zr).records[key] = {});
  record.handler = handler;
}

function initGlobalListeners(zr, api) {
  if (inner(zr).initialized) {
    return;
  }

  inner(zr).initialized = true;
  useHandler('click', zrUtil.curry(doEnter, 'click'));
  useHandler('mousemove', zrUtil.curry(doEnter, 'mousemove')); // useHandler('mouseout', onLeave);

  useHandler('globalout', onLeave);

  function useHandler(eventType, cb) {
    zr.on(eventType, function (e) {
      var dis = makeDispatchAction(api);
      each(inner(zr).records, function (record) {
        record && cb(record, e, dis.dispatchAction);
      });
      dispatchTooltipFinally(dis.pendings, api);
    });
  }
}

function dispatchTooltipFinally(pendings, api) {
  var showLen = pendings.showTip.length;
  var hideLen = pendings.hideTip.length;
  var actuallyPayload;

  if (showLen) {
    actuallyPayload = pendings.showTip[showLen - 1];
  } else if (hideLen) {
    actuallyPayload = pendings.hideTip[hideLen - 1];
  }

  if (actuallyPayload) {
    actuallyPayload.dispatchAction = null;
    api.dispatchAction(actuallyPayload);
  }
}

function onLeave(record, e, dispatchAction) {
  record.handler('leave', null, dispatchAction);
}

function doEnter(currTrigger, record, e, dispatchAction) {
  record.handler(currTrigger, e, dispatchAction);
}

function makeDispatchAction(api) {
  var pendings = {
    showTip: [],
    hideTip: []
  }; // FIXME
  // better approach?
  // 'showTip' and 'hideTip' can be triggered by axisPointer and tooltip,
  // which may be conflict, (axisPointer call showTip but tooltip call hideTip);
  // So we have to add "final stage" to merge those dispatched actions.

  var dispatchAction = function (payload) {
    var pendingList = pendings[payload.type];

    if (pendingList) {
      pendingList.push(payload);
    } else {
      payload.dispatchAction = dispatchAction;
      api.dispatchAction(payload);
    }
  };

  return {
    dispatchAction: dispatchAction,
    pendings: pendings
  };
}
/**
 * @param {string} key
 * @param {module:echarts/ExtensionAPI} api
 */


function unregister(key, api) {
  if (env.node) {
    return;
  }

  var zr = api.getZr();
  var record = (inner(zr).records || {})[key];

  if (record) {
    inner(zr).records[key] = null;
  }
}

exports.register = register;
exports.unregister = unregister;

/***/ }),

/***/ "2325":
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

var eventTool = __webpack_require__("607d");

var graphic = __webpack_require__("2306");

var throttle = __webpack_require__("88b3");

var DataZoomView = __webpack_require__("7dcf");

var numberUtil = __webpack_require__("3842");

var layout = __webpack_require__("f934");

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
var Rect = graphic.Rect;
var linearMap = numberUtil.linearMap;
var asc = numberUtil.asc;
var bind = zrUtil.bind;
var each = zrUtil.each; // Constants

var DEFAULT_LOCATION_EDGE_GAP = 7;
var DEFAULT_FRAME_BORDER_WIDTH = 1;
var DEFAULT_FILLER_SIZE = 30;
var HORIZONTAL = 'horizontal';
var VERTICAL = 'vertical';
var LABEL_GAP = 5;
var SHOW_DATA_SHADOW_SERIES_TYPE = ['line', 'bar', 'candlestick', 'scatter'];
var SliderZoomView = DataZoomView.extend({
  type: 'dataZoom.slider',
  init: function (ecModel, api) {
    /**
     * @private
     * @type {Object}
     */
    this._displayables = {};
    /**
     * @private
     * @type {string}
     */

    this._orient;
    /**
     * [0, 100]
     * @private
     */

    this._range;
    /**
     * [coord of the first handle, coord of the second handle]
     * @private
     */

    this._handleEnds;
    /**
     * [length, thick]
     * @private
     * @type {Array.<number>}
     */

    this._size;
    /**
     * @private
     * @type {number}
     */

    this._handleWidth;
    /**
     * @private
     * @type {number}
     */

    this._handleHeight;
    /**
     * @private
     */

    this._location;
    /**
     * @private
     */

    this._dragging;
    /**
     * @private
     */

    this._dataShadowInfo;
    this.api = api;
  },

  /**
   * @override
   */
  render: function (dataZoomModel, ecModel, api, payload) {
    SliderZoomView.superApply(this, 'render', arguments);
    throttle.createOrUpdate(this, '_dispatchZoomAction', this.dataZoomModel.get('throttle'), 'fixRate');
    this._orient = dataZoomModel.get('orient');

    if (this.dataZoomModel.get('show') === false) {
      this.group.removeAll();
      return;
    } // Notice: this._resetInterval() should not be executed when payload.type
    // is 'dataZoom', origin this._range should be maintained, otherwise 'pan'
    // or 'zoom' info will be missed because of 'throttle' of this.dispatchAction,


    if (!payload || payload.type !== 'dataZoom' || payload.from !== this.uid) {
      this._buildView();
    }

    this._updateView();
  },

  /**
   * @override
   */
  remove: function () {
    SliderZoomView.superApply(this, 'remove', arguments);
    throttle.clear(this, '_dispatchZoomAction');
  },

  /**
   * @override
   */
  dispose: function () {
    SliderZoomView.superApply(this, 'dispose', arguments);
    throttle.clear(this, '_dispatchZoomAction');
  },
  _buildView: function () {
    var thisGroup = this.group;
    thisGroup.removeAll();

    this._resetLocation();

    this._resetInterval();

    var barGroup = this._displayables.barGroup = new graphic.Group();

    this._renderBackground();

    this._renderHandle();

    this._renderDataShadow();

    thisGroup.add(barGroup);

    this._positionGroup();
  },

  /**
   * @private
   */
  _resetLocation: function () {
    var dataZoomModel = this.dataZoomModel;
    var api = this.api; // If some of x/y/width/height are not specified,
    // auto-adapt according to target grid.

    var coordRect = this._findCoordRect();

    var ecSize = {
      width: api.getWidth(),
      height: api.getHeight()
    }; // Default align by coordinate system rect.

    var positionInfo = this._orient === HORIZONTAL ? {
      // Why using 'right', because right should be used in vertical,
      // and it is better to be consistent for dealing with position param merge.
      right: ecSize.width - coordRect.x - coordRect.width,
      top: ecSize.height - DEFAULT_FILLER_SIZE - DEFAULT_LOCATION_EDGE_GAP,
      width: coordRect.width,
      height: DEFAULT_FILLER_SIZE
    } : {
      // vertical
      right: DEFAULT_LOCATION_EDGE_GAP,
      top: coordRect.y,
      width: DEFAULT_FILLER_SIZE,
      height: coordRect.height
    }; // Do not write back to option and replace value 'ph', because
    // the 'ph' value should be recalculated when resize.

    var layoutParams = layout.getLayoutParams(dataZoomModel.option); // Replace the placeholder value.

    zrUtil.each(['right', 'top', 'width', 'height'], function (name) {
      if (layoutParams[name] === 'ph') {
        layoutParams[name] = positionInfo[name];
      }
    });
    var layoutRect = layout.getLayoutRect(layoutParams, ecSize, dataZoomModel.padding);
    this._location = {
      x: layoutRect.x,
      y: layoutRect.y
    };
    this._size = [layoutRect.width, layoutRect.height];
    this._orient === VERTICAL && this._size.reverse();
  },

  /**
   * @private
   */
  _positionGroup: function () {
    var thisGroup = this.group;
    var location = this._location;
    var orient = this._orient; // Just use the first axis to determine mapping.

    var targetAxisModel = this.dataZoomModel.getFirstTargetAxisModel();
    var inverse = targetAxisModel && targetAxisModel.get('inverse');
    var barGroup = this._displayables.barGroup;
    var otherAxisInverse = (this._dataShadowInfo || {}).otherAxisInverse; // Transform barGroup.

    barGroup.attr(orient === HORIZONTAL && !inverse ? {
      scale: otherAxisInverse ? [1, 1] : [1, -1]
    } : orient === HORIZONTAL && inverse ? {
      scale: otherAxisInverse ? [-1, 1] : [-1, -1]
    } : orient === VERTICAL && !inverse ? {
      scale: otherAxisInverse ? [1, -1] : [1, 1],
      rotation: Math.PI / 2 // Dont use Math.PI, considering shadow direction.

    } : {
      scale: otherAxisInverse ? [-1, -1] : [-1, 1],
      rotation: Math.PI / 2
    }); // Position barGroup

    var rect = thisGroup.getBoundingRect([barGroup]);
    thisGroup.attr('position', [location.x - rect.x, location.y - rect.y]);
  },

  /**
   * @private
   */
  _getViewExtent: function () {
    return [0, this._size[0]];
  },
  _renderBackground: function () {
    var dataZoomModel = this.dataZoomModel;
    var size = this._size;
    var barGroup = this._displayables.barGroup;
    barGroup.add(new Rect({
      silent: true,
      shape: {
        x: 0,
        y: 0,
        width: size[0],
        height: size[1]
      },
      style: {
        fill: dataZoomModel.get('backgroundColor')
      },
      z2: -40
    })); // Click panel, over shadow, below handles.

    barGroup.add(new Rect({
      shape: {
        x: 0,
        y: 0,
        width: size[0],
        height: size[1]
      },
      style: {
        fill: 'transparent'
      },
      z2: 0,
      onclick: zrUtil.bind(this._onClickPanelClick, this)
    }));
  },
  _renderDataShadow: function () {
    var info = this._dataShadowInfo = this._prepareDataShadowInfo();

    if (!info) {
      return;
    }

    var size = this._size;
    var seriesModel = info.series;
    var data = seriesModel.getRawData();
    var otherDim = seriesModel.getShadowDim ? seriesModel.getShadowDim() // @see candlestick
    : info.otherDim;

    if (otherDim == null) {
      return;
    }

    var otherDataExtent = data.getDataExtent(otherDim); // Nice extent.

    var otherOffset = (otherDataExtent[1] - otherDataExtent[0]) * 0.3;
    otherDataExtent = [otherDataExtent[0] - otherOffset, otherDataExtent[1] + otherOffset];
    var otherShadowExtent = [0, size[1]];
    var thisShadowExtent = [0, size[0]];
    var areaPoints = [[size[0], 0], [0, 0]];
    var linePoints = [];
    var step = thisShadowExtent[1] / (data.count() - 1);
    var thisCoord = 0; // Optimize for large data shadow

    var stride = Math.round(data.count() / size[0]);
    var lastIsEmpty;
    data.each([otherDim], function (value, index) {
      if (stride > 0 && index % stride) {
        thisCoord += step;
        return;
      } // FIXME
      // Should consider axis.min/axis.max when drawing dataShadow.
      // FIXME
      // 应该使用统一的空判断？还是在list里进行空判断？


      var isEmpty = value == null || isNaN(value) || value === ''; // See #4235.

      var otherCoord = isEmpty ? 0 : linearMap(value, otherDataExtent, otherShadowExtent, true); // Attempt to draw data shadow precisely when there are empty value.

      if (isEmpty && !lastIsEmpty && index) {
        areaPoints.push([areaPoints[areaPoints.length - 1][0], 0]);
        linePoints.push([linePoints[linePoints.length - 1][0], 0]);
      } else if (!isEmpty && lastIsEmpty) {
        areaPoints.push([thisCoord, 0]);
        linePoints.push([thisCoord, 0]);
      }

      areaPoints.push([thisCoord, otherCoord]);
      linePoints.push([thisCoord, otherCoord]);
      thisCoord += step;
      lastIsEmpty = isEmpty;
    });
    var dataZoomModel = this.dataZoomModel; // var dataBackgroundModel = dataZoomModel.getModel('dataBackground');

    this._displayables.barGroup.add(new graphic.Polygon({
      shape: {
        points: areaPoints
      },
      style: zrUtil.defaults({
        fill: dataZoomModel.get('dataBackgroundColor')
      }, dataZoomModel.getModel('dataBackground.areaStyle').getAreaStyle()),
      silent: true,
      z2: -20
    }));

    this._displayables.barGroup.add(new graphic.Polyline({
      shape: {
        points: linePoints
      },
      style: dataZoomModel.getModel('dataBackground.lineStyle').getLineStyle(),
      silent: true,
      z2: -19
    }));
  },
  _prepareDataShadowInfo: function () {
    var dataZoomModel = this.dataZoomModel;
    var showDataShadow = dataZoomModel.get('showDataShadow');

    if (showDataShadow === false) {
      return;
    } // Find a representative series.


    var result;
    var ecModel = this.ecModel;
    dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
      var seriesModels = dataZoomModel.getAxisProxy(dimNames.name, axisIndex).getTargetSeriesModels();
      zrUtil.each(seriesModels, function (seriesModel) {
        if (result) {
          return;
        }

        if (showDataShadow !== true && zrUtil.indexOf(SHOW_DATA_SHADOW_SERIES_TYPE, seriesModel.get('type')) < 0) {
          return;
        }

        var thisAxis = ecModel.getComponent(dimNames.axis, axisIndex).axis;
        var otherDim = getOtherDim(dimNames.name);
        var otherAxisInverse;
        var coordSys = seriesModel.coordinateSystem;

        if (otherDim != null && coordSys.getOtherAxis) {
          otherAxisInverse = coordSys.getOtherAxis(thisAxis).inverse;
        }

        otherDim = seriesModel.getData().mapDimension(otherDim);
        result = {
          thisAxis: thisAxis,
          series: seriesModel,
          thisDim: dimNames.name,
          otherDim: otherDim,
          otherAxisInverse: otherAxisInverse
        };
      }, this);
    }, this);
    return result;
  },
  _renderHandle: function () {
    var displaybles = this._displayables;
    var handles = displaybles.handles = [];
    var handleLabels = displaybles.handleLabels = [];
    var barGroup = this._displayables.barGroup;
    var size = this._size;
    var dataZoomModel = this.dataZoomModel;
    barGroup.add(displaybles.filler = new Rect({
      draggable: true,
      cursor: getCursor(this._orient),
      drift: bind(this._onDragMove, this, 'all'),
      ondragstart: bind(this._showDataInfo, this, true),
      ondragend: bind(this._onDragEnd, this),
      onmouseover: bind(this._showDataInfo, this, true),
      onmouseout: bind(this._showDataInfo, this, false),
      style: {
        fill: dataZoomModel.get('fillerColor'),
        textPosition: 'inside'
      }
    })); // Frame border.

    barGroup.add(new Rect({
      silent: true,
      subPixelOptimize: true,
      shape: {
        x: 0,
        y: 0,
        width: size[0],
        height: size[1]
      },
      style: {
        stroke: dataZoomModel.get('dataBackgroundColor') || dataZoomModel.get('borderColor'),
        lineWidth: DEFAULT_FRAME_BORDER_WIDTH,
        fill: 'rgba(0,0,0,0)'
      }
    }));
    each([0, 1], function (handleIndex) {
      var path = graphic.createIcon(dataZoomModel.get('handleIcon'), {
        cursor: getCursor(this._orient),
        draggable: true,
        drift: bind(this._onDragMove, this, handleIndex),
        ondragend: bind(this._onDragEnd, this),
        onmouseover: bind(this._showDataInfo, this, true),
        onmouseout: bind(this._showDataInfo, this, false)
      }, {
        x: -1,
        y: 0,
        width: 2,
        height: 2
      });
      var bRect = path.getBoundingRect();
      this._handleHeight = numberUtil.parsePercent(dataZoomModel.get('handleSize'), this._size[1]);
      this._handleWidth = bRect.width / bRect.height * this._handleHeight;
      path.setStyle(dataZoomModel.getModel('handleStyle').getItemStyle());
      var handleColor = dataZoomModel.get('handleColor'); // Compatitable with previous version

      if (handleColor != null) {
        path.style.fill = handleColor;
      }

      barGroup.add(handles[handleIndex] = path);
      var textStyleModel = dataZoomModel.textStyleModel;
      this.group.add(handleLabels[handleIndex] = new graphic.Text({
        silent: true,
        invisible: true,
        style: {
          x: 0,
          y: 0,
          text: '',
          textVerticalAlign: 'middle',
          textAlign: 'center',
          textFill: textStyleModel.getTextColor(),
          textFont: textStyleModel.getFont()
        },
        z2: 10
      }));
    }, this);
  },

  /**
   * @private
   */
  _resetInterval: function () {
    var range = this._range = this.dataZoomModel.getPercentRange();

    var viewExtent = this._getViewExtent();

    this._handleEnds = [linearMap(range[0], [0, 100], viewExtent, true), linearMap(range[1], [0, 100], viewExtent, true)];
  },

  /**
   * @private
   * @param {(number|string)} handleIndex 0 or 1 or 'all'
   * @param {number} delta
   * @return {boolean} changed
   */
  _updateInterval: function (handleIndex, delta) {
    var dataZoomModel = this.dataZoomModel;
    var handleEnds = this._handleEnds;

    var viewExtend = this._getViewExtent();

    var minMaxSpan = dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
    var percentExtent = [0, 100];
    sliderMove(delta, handleEnds, viewExtend, dataZoomModel.get('zoomLock') ? 'all' : handleIndex, minMaxSpan.minSpan != null ? linearMap(minMaxSpan.minSpan, percentExtent, viewExtend, true) : null, minMaxSpan.maxSpan != null ? linearMap(minMaxSpan.maxSpan, percentExtent, viewExtend, true) : null);
    var lastRange = this._range;
    var range = this._range = asc([linearMap(handleEnds[0], viewExtend, percentExtent, true), linearMap(handleEnds[1], viewExtend, percentExtent, true)]);
    return !lastRange || lastRange[0] !== range[0] || lastRange[1] !== range[1];
  },

  /**
   * @private
   */
  _updateView: function (nonRealtime) {
    var displaybles = this._displayables;
    var handleEnds = this._handleEnds;
    var handleInterval = asc(handleEnds.slice());
    var size = this._size;
    each([0, 1], function (handleIndex) {
      // Handles
      var handle = displaybles.handles[handleIndex];
      var handleHeight = this._handleHeight;
      handle.attr({
        scale: [handleHeight / 2, handleHeight / 2],
        position: [handleEnds[handleIndex], size[1] / 2 - handleHeight / 2]
      });
    }, this); // Filler

    displaybles.filler.setShape({
      x: handleInterval[0],
      y: 0,
      width: handleInterval[1] - handleInterval[0],
      height: size[1]
    });

    this._updateDataInfo(nonRealtime);
  },

  /**
   * @private
   */
  _updateDataInfo: function (nonRealtime) {
    var dataZoomModel = this.dataZoomModel;
    var displaybles = this._displayables;
    var handleLabels = displaybles.handleLabels;
    var orient = this._orient;
    var labelTexts = ['', '']; // FIXME
    // date型，支持formatter，autoformatter（ec2 date.getAutoFormatter）

    if (dataZoomModel.get('showDetail')) {
      var axisProxy = dataZoomModel.findRepresentativeAxisProxy();

      if (axisProxy) {
        var axis = axisProxy.getAxisModel().axis;
        var range = this._range;
        var dataInterval = nonRealtime // See #4434, data and axis are not processed and reset yet in non-realtime mode.
        ? axisProxy.calculateDataWindow({
          start: range[0],
          end: range[1]
        }).valueWindow : axisProxy.getDataValueWindow();
        labelTexts = [this._formatLabel(dataInterval[0], axis), this._formatLabel(dataInterval[1], axis)];
      }
    }

    var orderedHandleEnds = asc(this._handleEnds.slice());
    setLabel.call(this, 0);
    setLabel.call(this, 1);

    function setLabel(handleIndex) {
      // Label
      // Text should not transform by barGroup.
      // Ignore handlers transform
      var barTransform = graphic.getTransform(displaybles.handles[handleIndex].parent, this.group);
      var direction = graphic.transformDirection(handleIndex === 0 ? 'right' : 'left', barTransform);
      var offset = this._handleWidth / 2 + LABEL_GAP;
      var textPoint = graphic.applyTransform([orderedHandleEnds[handleIndex] + (handleIndex === 0 ? -offset : offset), this._size[1] / 2], barTransform);
      handleLabels[handleIndex].setStyle({
        x: textPoint[0],
        y: textPoint[1],
        textVerticalAlign: orient === HORIZONTAL ? 'middle' : direction,
        textAlign: orient === HORIZONTAL ? direction : 'center',
        text: labelTexts[handleIndex]
      });
    }
  },

  /**
   * @private
   */
  _formatLabel: function (value, axis) {
    var dataZoomModel = this.dataZoomModel;
    var labelFormatter = dataZoomModel.get('labelFormatter');
    var labelPrecision = dataZoomModel.get('labelPrecision');

    if (labelPrecision == null || labelPrecision === 'auto') {
      labelPrecision = axis.getPixelPrecision();
    }

    var valueStr = value == null || isNaN(value) ? '' // FIXME Glue code
    : axis.type === 'category' || axis.type === 'time' ? axis.scale.getLabel(Math.round(value)) // param of toFixed should less then 20.
    : value.toFixed(Math.min(labelPrecision, 20));
    return zrUtil.isFunction(labelFormatter) ? labelFormatter(value, valueStr) : zrUtil.isString(labelFormatter) ? labelFormatter.replace('{value}', valueStr) : valueStr;
  },

  /**
   * @private
   * @param {boolean} showOrHide true: show, false: hide
   */
  _showDataInfo: function (showOrHide) {
    // Always show when drgging.
    showOrHide = this._dragging || showOrHide;
    var handleLabels = this._displayables.handleLabels;
    handleLabels[0].attr('invisible', !showOrHide);
    handleLabels[1].attr('invisible', !showOrHide);
  },
  _onDragMove: function (handleIndex, dx, dy, event) {
    this._dragging = true; // For mobile device, prevent screen slider on the button.

    eventTool.stop(event.event); // Transform dx, dy to bar coordination.

    var barTransform = this._displayables.barGroup.getLocalTransform();

    var vertex = graphic.applyTransform([dx, dy], barTransform, true);

    var changed = this._updateInterval(handleIndex, vertex[0]);

    var realtime = this.dataZoomModel.get('realtime');

    this._updateView(!realtime); // Avoid dispatch dataZoom repeatly but range not changed,
    // which cause bad visual effect when progressive enabled.


    changed && realtime && this._dispatchZoomAction();
  },
  _onDragEnd: function () {
    this._dragging = false;

    this._showDataInfo(false); // While in realtime mode and stream mode, dispatch action when
    // drag end will cause the whole view rerender, which is unnecessary.


    var realtime = this.dataZoomModel.get('realtime');
    !realtime && this._dispatchZoomAction();
  },
  _onClickPanelClick: function (e) {
    var size = this._size;

    var localPoint = this._displayables.barGroup.transformCoordToLocal(e.offsetX, e.offsetY);

    if (localPoint[0] < 0 || localPoint[0] > size[0] || localPoint[1] < 0 || localPoint[1] > size[1]) {
      return;
    }

    var handleEnds = this._handleEnds;
    var center = (handleEnds[0] + handleEnds[1]) / 2;

    var changed = this._updateInterval('all', localPoint[0] - center);

    this._updateView();

    changed && this._dispatchZoomAction();
  },

  /**
   * This action will be throttled.
   * @private
   */
  _dispatchZoomAction: function () {
    var range = this._range;
    this.api.dispatchAction({
      type: 'dataZoom',
      from: this.uid,
      dataZoomId: this.dataZoomModel.id,
      start: range[0],
      end: range[1]
    });
  },

  /**
   * @private
   */
  _findCoordRect: function () {
    // Find the grid coresponding to the first axis referred by dataZoom.
    var rect;
    each(this.getTargetCoordInfo(), function (coordInfoList) {
      if (!rect && coordInfoList.length) {
        var coordSys = coordInfoList[0].model.coordinateSystem;
        rect = coordSys.getRect && coordSys.getRect();
      }
    });

    if (!rect) {
      var width = this.api.getWidth();
      var height = this.api.getHeight();
      rect = {
        x: width * 0.2,
        y: height * 0.2,
        width: width * 0.6,
        height: height * 0.6
      };
    }

    return rect;
  }
});

function getOtherDim(thisDim) {
  // FIXME
  // 这个逻辑和getOtherAxis里一致，但是写在这里是否不好
  var map = {
    x: 'y',
    y: 'x',
    radius: 'angle',
    angle: 'radius'
  };
  return map[thisDim];
}

function getCursor(orient) {
  return orient === 'vertical' ? 'ns-resize' : 'ew-resize';
}

var _default = SliderZoomView;
module.exports = _default;

/***/ }),

/***/ "2c17":
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

var _util = __webpack_require__("6d8b");

var createHashMap = _util.createHashMap;
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
echarts.registerProcessor({
  // `dataZoomProcessor` will only be performed in needed series. Consider if
  // there is a line series and a pie series, it is better not to update the
  // line series if only pie series is needed to be updated.
  getTargetSeries: function (ecModel) {
    var seriesModelMap = createHashMap();
    ecModel.eachComponent('dataZoom', function (dataZoomModel) {
      dataZoomModel.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel) {
        var axisProxy = dataZoomModel.getAxisProxy(dimNames.name, axisIndex);
        each(axisProxy.getTargetSeriesModels(), function (seriesModel) {
          seriesModelMap.set(seriesModel.uid, seriesModel);
        });
      });
    });
    return seriesModelMap;
  },
  modifyOutputEnd: true,
  // Consider appendData, where filter should be performed. Because data process is
  // in block mode currently, it is not need to worry about that the overallProgress
  // execute every frame.
  overallReset: function (ecModel, api) {
    ecModel.eachComponent('dataZoom', function (dataZoomModel) {
      // We calculate window and reset axis here but not in model
      // init stage and not after action dispatch handler, because
      // reset should be called after seriesData.restoreData.
      dataZoomModel.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel) {
        dataZoomModel.getAxisProxy(dimNames.name, axisIndex).reset(dataZoomModel, api);
      }); // Caution: data zoom filtering is order sensitive when using
      // percent range and no min/max/scale set on axis.
      // For example, we have dataZoom definition:
      // [
      //      {xAxisIndex: 0, start: 30, end: 70},
      //      {yAxisIndex: 0, start: 20, end: 80}
      // ]
      // In this case, [20, 80] of y-dataZoom should be based on data
      // that have filtered by x-dataZoom using range of [30, 70],
      // but should not be based on full raw data. Thus sliding
      // x-dataZoom will change both ranges of xAxis and yAxis,
      // while sliding y-dataZoom will only change the range of yAxis.
      // So we should filter x-axis after reset x-axis immediately,
      // and then reset y-axis and filter y-axis.

      dataZoomModel.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel) {
        dataZoomModel.getAxisProxy(dimNames.name, axisIndex).filterData(dataZoomModel, api);
      });
    });
    ecModel.eachComponent('dataZoom', function (dataZoomModel) {
      // Fullfill all of the range props so that user
      // is able to get them from chart.getOption().
      var axisProxy = dataZoomModel.findRepresentativeAxisProxy();
      var percentRange = axisProxy.getDataPercentWindow();
      var valueRange = axisProxy.getDataValueWindow();
      dataZoomModel.setCalculatedRange({
        start: percentRange[0],
        end: percentRange[1],
        startValue: valueRange[0],
        endValue: valueRange[1]
      });
    });
  }
});

/***/ }),

/***/ "2f31":
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

var preprocessor = __webpack_require__("ae75");

__webpack_require__("10cc");

__webpack_require__("f31f");

__webpack_require__("c2dd");

__webpack_require__("b8ec");

__webpack_require__("fecb");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Brush component entry
 */
echarts.registerPreprocessor(preprocessor);

/***/ }),

/***/ "32a1":
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

var DataZoomView = __webpack_require__("7dcf");

var sliderMove = __webpack_require__("ef6a");

var roams = __webpack_require__("5576");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var InsideZoomView = DataZoomView.extend({
  type: 'dataZoom.inside',

  /**
   * @override
   */
  init: function (ecModel, api) {
    /**
     * 'throttle' is used in this.dispatchAction, so we save range
     * to avoid missing some 'pan' info.
     * @private
     * @type {Array.<number>}
     */
    this._range;
  },

  /**
   * @override
   */
  render: function (dataZoomModel, ecModel, api, payload) {
    InsideZoomView.superApply(this, 'render', arguments); // Hence the `throttle` util ensures to preserve command order,
    // here simply updating range all the time will not cause missing
    // any of the the roam change.

    this._range = dataZoomModel.getPercentRange(); // Reset controllers.

    zrUtil.each(this.getTargetCoordInfo(), function (coordInfoList, coordSysName) {
      var allCoordIds = zrUtil.map(coordInfoList, function (coordInfo) {
        return roams.generateCoordId(coordInfo.model);
      });
      zrUtil.each(coordInfoList, function (coordInfo) {
        var coordModel = coordInfo.model;
        var getRange = {};
        zrUtil.each(['pan', 'zoom', 'scrollMove'], function (eventName) {
          getRange[eventName] = bind(roamHandlers[eventName], this, coordInfo, coordSysName);
        }, this);
        roams.register(api, {
          coordId: roams.generateCoordId(coordModel),
          allCoordIds: allCoordIds,
          containsPoint: function (e, x, y) {
            return coordModel.coordinateSystem.containPoint([x, y]);
          },
          dataZoomId: dataZoomModel.id,
          dataZoomModel: dataZoomModel,
          getRange: getRange
        });
      }, this);
    }, this);
  },

  /**
   * @override
   */
  dispose: function () {
    roams.unregister(this.api, this.dataZoomModel.id);
    InsideZoomView.superApply(this, 'dispose', arguments);
    this._range = null;
  }
});
var roamHandlers = {
  /**
   * @this {module:echarts/component/dataZoom/InsideZoomView}
   */
  zoom: function (coordInfo, coordSysName, controller, e) {
    var lastRange = this._range;
    var range = lastRange.slice(); // Calculate transform by the first axis.

    var axisModel = coordInfo.axisModels[0];

    if (!axisModel) {
      return;
    }

    var directionInfo = getDirectionInfo[coordSysName](null, [e.originX, e.originY], axisModel, controller, coordInfo);
    var percentPoint = (directionInfo.signal > 0 ? directionInfo.pixelStart + directionInfo.pixelLength - directionInfo.pixel : directionInfo.pixel - directionInfo.pixelStart) / directionInfo.pixelLength * (range[1] - range[0]) + range[0];
    var scale = Math.max(1 / e.scale, 0);
    range[0] = (range[0] - percentPoint) * scale + percentPoint;
    range[1] = (range[1] - percentPoint) * scale + percentPoint; // Restrict range.

    var minMaxSpan = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
    sliderMove(0, range, [0, 100], 0, minMaxSpan.minSpan, minMaxSpan.maxSpan);
    this._range = range;

    if (lastRange[0] !== range[0] || lastRange[1] !== range[1]) {
      return range;
    }
  },

  /**
   * @this {module:echarts/component/dataZoom/InsideZoomView}
   */
  pan: makeMover(function (range, axisModel, coordInfo, coordSysName, controller, e) {
    var directionInfo = getDirectionInfo[coordSysName]([e.oldX, e.oldY], [e.newX, e.newY], axisModel, controller, coordInfo);
    return directionInfo.signal * (range[1] - range[0]) * directionInfo.pixel / directionInfo.pixelLength;
  }),

  /**
   * @this {module:echarts/component/dataZoom/InsideZoomView}
   */
  scrollMove: makeMover(function (range, axisModel, coordInfo, coordSysName, controller, e) {
    var directionInfo = getDirectionInfo[coordSysName]([0, 0], [e.scrollDelta, e.scrollDelta], axisModel, controller, coordInfo);
    return directionInfo.signal * (range[1] - range[0]) * e.scrollDelta;
  })
};

function makeMover(getPercentDelta) {
  return function (coordInfo, coordSysName, controller, e) {
    var lastRange = this._range;
    var range = lastRange.slice(); // Calculate transform by the first axis.

    var axisModel = coordInfo.axisModels[0];

    if (!axisModel) {
      return;
    }

    var percentDelta = getPercentDelta(range, axisModel, coordInfo, coordSysName, controller, e);
    sliderMove(percentDelta, range, [0, 100], 'all');
    this._range = range;

    if (lastRange[0] !== range[0] || lastRange[1] !== range[1]) {
      return range;
    }
  };
}

var getDirectionInfo = {
  grid: function (oldPoint, newPoint, axisModel, controller, coordInfo) {
    var axis = axisModel.axis;
    var ret = {};
    var rect = coordInfo.model.coordinateSystem.getRect();
    oldPoint = oldPoint || [0, 0];

    if (axis.dim === 'x') {
      ret.pixel = newPoint[0] - oldPoint[0];
      ret.pixelLength = rect.width;
      ret.pixelStart = rect.x;
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      // axis.dim === 'y'
      ret.pixel = newPoint[1] - oldPoint[1];
      ret.pixelLength = rect.height;
      ret.pixelStart = rect.y;
      ret.signal = axis.inverse ? -1 : 1;
    }

    return ret;
  },
  polar: function (oldPoint, newPoint, axisModel, controller, coordInfo) {
    var axis = axisModel.axis;
    var ret = {};
    var polar = coordInfo.model.coordinateSystem;
    var radiusExtent = polar.getRadiusAxis().getExtent();
    var angleExtent = polar.getAngleAxis().getExtent();
    oldPoint = oldPoint ? polar.pointToCoord(oldPoint) : [0, 0];
    newPoint = polar.pointToCoord(newPoint);

    if (axisModel.mainType === 'radiusAxis') {
      ret.pixel = newPoint[0] - oldPoint[0]; // ret.pixelLength = Math.abs(radiusExtent[1] - radiusExtent[0]);
      // ret.pixelStart = Math.min(radiusExtent[0], radiusExtent[1]);

      ret.pixelLength = radiusExtent[1] - radiusExtent[0];
      ret.pixelStart = radiusExtent[0];
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      // 'angleAxis'
      ret.pixel = newPoint[1] - oldPoint[1]; // ret.pixelLength = Math.abs(angleExtent[1] - angleExtent[0]);
      // ret.pixelStart = Math.min(angleExtent[0], angleExtent[1]);

      ret.pixelLength = angleExtent[1] - angleExtent[0];
      ret.pixelStart = angleExtent[0];
      ret.signal = axis.inverse ? -1 : 1;
    }

    return ret;
  },
  singleAxis: function (oldPoint, newPoint, axisModel, controller, coordInfo) {
    var axis = axisModel.axis;
    var rect = coordInfo.model.coordinateSystem.getRect();
    var ret = {};
    oldPoint = oldPoint || [0, 0];

    if (axis.orient === 'horizontal') {
      ret.pixel = newPoint[0] - oldPoint[0];
      ret.pixelLength = rect.width;
      ret.pixelStart = rect.x;
      ret.signal = axis.inverse ? 1 : -1;
    } else {
      // 'vertical'
      ret.pixel = newPoint[1] - oldPoint[1];
      ret.pixelLength = rect.height;
      ret.pixelStart = rect.y;
      ret.signal = axis.inverse ? -1 : 1;
    }

    return ret;
  }
};
var _default = InsideZoomView;
module.exports = _default;

/***/ }),

/***/ "3790":
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

var DataZoomModel = __webpack_require__("3a56");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var SliderZoomModel = DataZoomModel.extend({
  type: 'dataZoom.slider',
  layoutMode: 'box',

  /**
   * @protected
   */
  defaultOption: {
    show: true,
    // ph => placeholder. Using placehoder here because
    // deault value can only be drived in view stage.
    right: 'ph',
    // Default align to grid rect.
    top: 'ph',
    // Default align to grid rect.
    width: 'ph',
    // Default align to grid rect.
    height: 'ph',
    // Default align to grid rect.
    left: null,
    // Default align to grid rect.
    bottom: null,
    // Default align to grid rect.
    backgroundColor: 'rgba(47,69,84,0)',
    // Background of slider zoom component.
    // dataBackgroundColor: '#ddd',         // Background coor of data shadow and border of box,
    // highest priority, remain for compatibility of
    // previous version, but not recommended any more.
    dataBackground: {
      lineStyle: {
        color: '#2f4554',
        width: 0.5,
        opacity: 0.3
      },
      areaStyle: {
        color: 'rgba(47,69,84,0.3)',
        opacity: 0.3
      }
    },
    borderColor: '#ddd',
    // border color of the box. For compatibility,
    // if dataBackgroundColor is set, borderColor
    // is ignored.
    fillerColor: 'rgba(167,183,204,0.4)',
    // Color of selected area.
    // handleColor: 'rgba(89,170,216,0.95)',     // Color of handle.
    // handleIcon: 'path://M4.9,17.8c0-1.4,4.5-10.5,5.5-12.4c0-0.1,0.6-1.1,0.9-1.1c0.4,0,0.9,1,0.9,1.1c1.1,2.2,5.4,11,5.4,12.4v17.8c0,1.5-0.6,2.1-1.3,2.1H6.1c-0.7,0-1.3-0.6-1.3-2.1V17.8z',

    /* eslint-disable */
    handleIcon: 'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',

    /* eslint-enable */
    // Percent of the slider height
    handleSize: '100%',
    handleStyle: {
      color: '#a7b7cc'
    },
    labelPrecision: null,
    labelFormatter: null,
    showDetail: true,
    showDataShadow: 'auto',
    // Default auto decision.
    realtime: true,
    zoomLock: false,
    // Whether disable zoom.
    textStyle: {
      color: '#333'
    }
  }
});
var _default = SliderZoomModel;
module.exports = _default;

/***/ }),

/***/ "3a56":
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

var env = __webpack_require__("22d1");

var modelUtil = __webpack_require__("e0d3");

var helper = __webpack_require__("50e5");

var AxisProxy = __webpack_require__("cc39");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var eachAxisDim = helper.eachAxisDim;
var DataZoomModel = echarts.extendComponentModel({
  type: 'dataZoom',
  dependencies: ['xAxis', 'yAxis', 'zAxis', 'radiusAxis', 'angleAxis', 'singleAxis', 'series'],

  /**
   * @protected
   */
  defaultOption: {
    zlevel: 0,
    z: 4,
    // Higher than normal component (z: 2).
    orient: null,
    // Default auto by axisIndex. Possible value: 'horizontal', 'vertical'.
    xAxisIndex: null,
    // Default the first horizontal category axis.
    yAxisIndex: null,
    // Default the first vertical category axis.
    filterMode: 'filter',
    // Possible values: 'filter' or 'empty' or 'weakFilter'.
    // 'filter': data items which are out of window will be removed. This option is
    //          applicable when filtering outliers. For each data item, it will be
    //          filtered if one of the relevant dimensions is out of the window.
    // 'weakFilter': data items which are out of window will be removed. This option
    //          is applicable when filtering outliers. For each data item, it will be
    //          filtered only if all  of the relevant dimensions are out of the same
    //          side of the window.
    // 'empty': data items which are out of window will be set to empty.
    //          This option is applicable when user should not neglect
    //          that there are some data items out of window.
    // 'none': Do not filter.
    // Taking line chart as an example, line will be broken in
    // the filtered points when filterModel is set to 'empty', but
    // be connected when set to 'filter'.
    throttle: null,
    // Dispatch action by the fixed rate, avoid frequency.
    // default 100. Do not throttle when use null/undefined.
    // If animation === true and animationDurationUpdate > 0,
    // default value is 100, otherwise 20.
    start: 0,
    // Start percent. 0 ~ 100
    end: 100,
    // End percent. 0 ~ 100
    startValue: null,
    // Start value. If startValue specified, start is ignored.
    endValue: null,
    // End value. If endValue specified, end is ignored.
    minSpan: null,
    // 0 ~ 100
    maxSpan: null,
    // 0 ~ 100
    minValueSpan: null,
    // The range of dataZoom can not be smaller than that.
    maxValueSpan: null,
    // The range of dataZoom can not be larger than that.
    rangeMode: null // Array, can be 'value' or 'percent'.

  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel) {
    /**
     * key like x_0, y_1
     * @private
     * @type {Object}
     */
    this._dataIntervalByAxis = {};
    /**
     * @private
     */

    this._dataInfo = {};
    /**
     * key like x_0, y_1
     * @private
     */

    this._axisProxies = {};
    /**
     * @readOnly
     */

    this.textStyleModel;
    /**
     * @private
     */

    this._autoThrottle = true;
    /**
     * It is `[rangeModeForMin, rangeModeForMax]`.
     * The optional values for `rangeMode`:
     * + `'value'` mode: the axis extent will always be determined by
     *     `dataZoom.startValue` and `dataZoom.endValue`, despite
     *     how data like and how `axis.min` and `axis.max` are.
     * + `'percent'` mode: `100` represents 100% of the `[dMin, dMax]`,
     *     where `dMin` is `axis.min` if `axis.min` specified, otherwise `data.extent[0]`,
     *     and `dMax` is `axis.max` if `axis.max` specified, otherwise `data.extent[1]`.
     *     Axis extent will be determined by the result of the percent of `[dMin, dMax]`.
     *
     * For example, when users are using dynamic data (update data periodically via `setOption`),
     * if in `'value`' mode, the window will be kept in a fixed value range despite how
     * data are appended, while if in `'percent'` mode, whe window range will be changed alone with
     * the appended data (suppose `axis.min` and `axis.max` are not specified).
     *
     * @private
     */

    this._rangePropMode = ['percent', 'percent'];
    var inputRawOption = retrieveRawOption(option);
    /**
     * Suppose a "main process" start at the point that model prepared (that is,
     * model initialized or merged or method called in `action`).
     * We should keep the `main process` idempotent, that is, given a set of values
     * on `option`, we get the same result.
     *
     * But sometimes, values on `option` will be updated for providing users
     * a "final calculated value" (`dataZoomProcessor` will do that). Those value
     * should not be the base/input of the `main process`.
     *
     * So in that case we should save and keep the input of the `main process`
     * separately, called `settledOption`.
     *
     * For example, consider the case:
     * (Step_1) brush zoom the grid by `toolbox.dataZoom`,
     *     where the original input `option.startValue`, `option.endValue` are earsed by
     *     calculated value.
     * (Step)2) click the legend to hide and show a series,
     *     where the new range is calculated by the earsed `startValue` and `endValue`,
     *     which brings incorrect result.
     *
     * @readOnly
     */

    this.settledOption = inputRawOption;
    this.mergeDefaultAndTheme(option, ecModel);
    this.doInit(inputRawOption);
  },

  /**
   * @override
   */
  mergeOption: function (newOption) {
    var inputRawOption = retrieveRawOption(newOption); //FIX #2591

    zrUtil.merge(this.option, newOption, true);
    zrUtil.merge(this.settledOption, inputRawOption, true);
    this.doInit(inputRawOption);
  },

  /**
   * @protected
   */
  doInit: function (inputRawOption) {
    var thisOption = this.option; // Disable realtime view update if canvas is not supported.

    if (!env.canvasSupported) {
      thisOption.realtime = false;
    }

    this._setDefaultThrottle(inputRawOption);

    updateRangeUse(this, inputRawOption);
    var settledOption = this.settledOption;
    each([['start', 'startValue'], ['end', 'endValue']], function (names, index) {
      // start/end has higher priority over startValue/endValue if they
      // both set, but we should make chart.setOption({endValue: 1000})
      // effective, rather than chart.setOption({endValue: 1000, end: null}).
      if (this._rangePropMode[index] === 'value') {
        thisOption[names[0]] = settledOption[names[0]] = null;
      } // Otherwise do nothing and use the merge result.

    }, this);
    this.textStyleModel = this.getModel('textStyle');

    this._resetTarget();

    this._giveAxisProxies();
  },

  /**
   * @private
   */
  _giveAxisProxies: function () {
    var axisProxies = this._axisProxies;
    this.eachTargetAxis(function (dimNames, axisIndex, dataZoomModel, ecModel) {
      var axisModel = this.dependentModels[dimNames.axis][axisIndex]; // If exists, share axisProxy with other dataZoomModels.

      var axisProxy = axisModel.__dzAxisProxy || ( // Use the first dataZoomModel as the main model of axisProxy.
      axisModel.__dzAxisProxy = new AxisProxy(dimNames.name, axisIndex, this, ecModel)); // FIXME
      // dispose __dzAxisProxy

      axisProxies[dimNames.name + '_' + axisIndex] = axisProxy;
    }, this);
  },

  /**
   * @private
   */
  _resetTarget: function () {
    var thisOption = this.option;

    var autoMode = this._judgeAutoMode();

    eachAxisDim(function (dimNames) {
      var axisIndexName = dimNames.axisIndex;
      thisOption[axisIndexName] = modelUtil.normalizeToArray(thisOption[axisIndexName]);
    }, this);

    if (autoMode === 'axisIndex') {
      this._autoSetAxisIndex();
    } else if (autoMode === 'orient') {
      this._autoSetOrient();
    }
  },

  /**
   * @private
   */
  _judgeAutoMode: function () {
    // Auto set only works for setOption at the first time.
    // The following is user's reponsibility. So using merged
    // option is OK.
    var thisOption = this.option;
    var hasIndexSpecified = false;
    eachAxisDim(function (dimNames) {
      // When user set axisIndex as a empty array, we think that user specify axisIndex
      // but do not want use auto mode. Because empty array may be encountered when
      // some error occured.
      if (thisOption[dimNames.axisIndex] != null) {
        hasIndexSpecified = true;
      }
    }, this);
    var orient = thisOption.orient;

    if (orient == null && hasIndexSpecified) {
      return 'orient';
    } else if (!hasIndexSpecified) {
      if (orient == null) {
        thisOption.orient = 'horizontal';
      }

      return 'axisIndex';
    }
  },

  /**
   * @private
   */
  _autoSetAxisIndex: function () {
    var autoAxisIndex = true;
    var orient = this.get('orient', true);
    var thisOption = this.option;
    var dependentModels = this.dependentModels;

    if (autoAxisIndex) {
      // Find axis that parallel to dataZoom as default.
      var dimName = orient === 'vertical' ? 'y' : 'x';

      if (dependentModels[dimName + 'Axis'].length) {
        thisOption[dimName + 'AxisIndex'] = [0];
        autoAxisIndex = false;
      } else {
        each(dependentModels.singleAxis, function (singleAxisModel) {
          if (autoAxisIndex && singleAxisModel.get('orient', true) === orient) {
            thisOption.singleAxisIndex = [singleAxisModel.componentIndex];
            autoAxisIndex = false;
          }
        });
      }
    }

    if (autoAxisIndex) {
      // Find the first category axis as default. (consider polar)
      eachAxisDim(function (dimNames) {
        if (!autoAxisIndex) {
          return;
        }

        var axisIndices = [];
        var axisModels = this.dependentModels[dimNames.axis];

        if (axisModels.length && !axisIndices.length) {
          for (var i = 0, len = axisModels.length; i < len; i++) {
            if (axisModels[i].get('type') === 'category') {
              axisIndices.push(i);
            }
          }
        }

        thisOption[dimNames.axisIndex] = axisIndices;

        if (axisIndices.length) {
          autoAxisIndex = false;
        }
      }, this);
    }

    if (autoAxisIndex) {
      // FIXME
      // 这里是兼容ec2的写法（没指定xAxisIndex和yAxisIndex时把scatter和双数值轴折柱纳入dataZoom控制），
      // 但是实际是否需要Grid.js#getScaleByOption来判断（考虑time，log等axis type）？
      // If both dataZoom.xAxisIndex and dataZoom.yAxisIndex is not specified,
      // dataZoom component auto adopts series that reference to
      // both xAxis and yAxis which type is 'value'.
      this.ecModel.eachSeries(function (seriesModel) {
        if (this._isSeriesHasAllAxesTypeOf(seriesModel, 'value')) {
          eachAxisDim(function (dimNames) {
            var axisIndices = thisOption[dimNames.axisIndex];
            var axisIndex = seriesModel.get(dimNames.axisIndex);
            var axisId = seriesModel.get(dimNames.axisId);
            var axisModel = seriesModel.ecModel.queryComponents({
              mainType: dimNames.axis,
              index: axisIndex,
              id: axisId
            })[0];
            axisIndex = axisModel.componentIndex;

            if (zrUtil.indexOf(axisIndices, axisIndex) < 0) {
              axisIndices.push(axisIndex);
            }
          });
        }
      }, this);
    }
  },

  /**
   * @private
   */
  _autoSetOrient: function () {
    var dim; // Find the first axis

    this.eachTargetAxis(function (dimNames) {
      !dim && (dim = dimNames.name);
    }, this);
    this.option.orient = dim === 'y' ? 'vertical' : 'horizontal';
  },

  /**
   * @private
   */
  _isSeriesHasAllAxesTypeOf: function (seriesModel, axisType) {
    // FIXME
    // 需要series的xAxisIndex和yAxisIndex都首先自动设置上。
    // 例如series.type === scatter时。
    var is = true;
    eachAxisDim(function (dimNames) {
      var seriesAxisIndex = seriesModel.get(dimNames.axisIndex);
      var axisModel = this.dependentModels[dimNames.axis][seriesAxisIndex];

      if (!axisModel || axisModel.get('type') !== axisType) {
        is = false;
      }
    }, this);
    return is;
  },

  /**
   * @private
   */
  _setDefaultThrottle: function (inputRawOption) {
    // When first time user set throttle, auto throttle ends.
    if (inputRawOption.hasOwnProperty('throttle')) {
      this._autoThrottle = false;
    }

    if (this._autoThrottle) {
      var globalOption = this.ecModel.option;
      this.option.throttle = globalOption.animation && globalOption.animationDurationUpdate > 0 ? 100 : 20;
    }
  },

  /**
   * @public
   */
  getFirstTargetAxisModel: function () {
    var firstAxisModel;
    eachAxisDim(function (dimNames) {
      if (firstAxisModel == null) {
        var indices = this.get(dimNames.axisIndex);

        if (indices.length) {
          firstAxisModel = this.dependentModels[dimNames.axis][indices[0]];
        }
      }
    }, this);
    return firstAxisModel;
  },

  /**
   * @public
   * @param {Function} callback param: axisModel, dimNames, axisIndex, dataZoomModel, ecModel
   */
  eachTargetAxis: function (callback, context) {
    var ecModel = this.ecModel;
    eachAxisDim(function (dimNames) {
      each(this.get(dimNames.axisIndex), function (axisIndex) {
        callback.call(context, dimNames, axisIndex, this, ecModel);
      }, this);
    }, this);
  },

  /**
   * @param {string} dimName
   * @param {number} axisIndex
   * @return {module:echarts/component/dataZoom/AxisProxy} If not found, return null/undefined.
   */
  getAxisProxy: function (dimName, axisIndex) {
    return this._axisProxies[dimName + '_' + axisIndex];
  },

  /**
   * @param {string} dimName
   * @param {number} axisIndex
   * @return {module:echarts/model/Model} If not found, return null/undefined.
   */
  getAxisModel: function (dimName, axisIndex) {
    var axisProxy = this.getAxisProxy(dimName, axisIndex);
    return axisProxy && axisProxy.getAxisModel();
  },

  /**
   * If not specified, set to undefined.
   *
   * @public
   * @param {Object} opt
   * @param {number} [opt.start]
   * @param {number} [opt.end]
   * @param {number} [opt.startValue]
   * @param {number} [opt.endValue]
   */
  setRawRange: function (opt) {
    var thisOption = this.option;
    var settledOption = this.settledOption;
    each([['start', 'startValue'], ['end', 'endValue']], function (names) {
      // Consider the pair <start, startValue>:
      // If one has value and the other one is `null/undefined`, we both set them
      // to `settledOption`. This strategy enables the feature to clear the original
      // value in `settledOption` to `null/undefined`.
      // But if both of them are `null/undefined`, we do not set them to `settledOption`
      // and keep `settledOption` with the original value. This strategy enables users to
      // only set <end or endValue> but not set <start or startValue> when calling
      // `dispatchAction`.
      // The pair <end, endValue> is treated in the same way.
      if (opt[names[0]] != null || opt[names[1]] != null) {
        thisOption[names[0]] = settledOption[names[0]] = opt[names[0]];
        thisOption[names[1]] = settledOption[names[1]] = opt[names[1]];
      }
    }, this);
    updateRangeUse(this, opt);
  },

  /**
   * @public
   * @param {Object} opt
   * @param {number} [opt.start]
   * @param {number} [opt.end]
   * @param {number} [opt.startValue]
   * @param {number} [opt.endValue]
   */
  setCalculatedRange: function (opt) {
    var option = this.option;
    each(['start', 'startValue', 'end', 'endValue'], function (name) {
      option[name] = opt[name];
    });
  },

  /**
   * @public
   * @return {Array.<number>} [startPercent, endPercent]
   */
  getPercentRange: function () {
    var axisProxy = this.findRepresentativeAxisProxy();

    if (axisProxy) {
      return axisProxy.getDataPercentWindow();
    }
  },

  /**
   * @public
   * For example, chart.getModel().getComponent('dataZoom').getValueRange('y', 0);
   *
   * @param {string} [axisDimName]
   * @param {number} [axisIndex]
   * @return {Array.<number>} [startValue, endValue] value can only be '-' or finite number.
   */
  getValueRange: function (axisDimName, axisIndex) {
    if (axisDimName == null && axisIndex == null) {
      var axisProxy = this.findRepresentativeAxisProxy();

      if (axisProxy) {
        return axisProxy.getDataValueWindow();
      }
    } else {
      return this.getAxisProxy(axisDimName, axisIndex).getDataValueWindow();
    }
  },

  /**
   * @public
   * @param {module:echarts/model/Model} [axisModel] If axisModel given, find axisProxy
   *      corresponding to the axisModel
   * @return {module:echarts/component/dataZoom/AxisProxy}
   */
  findRepresentativeAxisProxy: function (axisModel) {
    if (axisModel) {
      return axisModel.__dzAxisProxy;
    } // Find the first hosted axisProxy


    var axisProxies = this._axisProxies;

    for (var key in axisProxies) {
      if (axisProxies.hasOwnProperty(key) && axisProxies[key].hostedBy(this)) {
        return axisProxies[key];
      }
    } // If no hosted axis find not hosted axisProxy.
    // Consider this case: dataZoomModel1 and dataZoomModel2 control the same axis,
    // and the option.start or option.end settings are different. The percentRange
    // should follow axisProxy.
    // (We encounter this problem in toolbox data zoom.)


    for (var key in axisProxies) {
      if (axisProxies.hasOwnProperty(key) && !axisProxies[key].hostedBy(this)) {
        return axisProxies[key];
      }
    }
  },

  /**
   * @return {Array.<string>}
   */
  getRangePropMode: function () {
    return this._rangePropMode.slice();
  }
});
/**
 * Retrieve the those raw params from option, which will be cached separately.
 * becasue they will be overwritten by normalized/calculated values in the main
 * process.
 */

function retrieveRawOption(option) {
  var ret = {};
  each(['start', 'end', 'startValue', 'endValue', 'throttle'], function (name) {
    option.hasOwnProperty(name) && (ret[name] = option[name]);
  });
  return ret;
}

function updateRangeUse(dataZoomModel, inputRawOption) {
  var rangePropMode = dataZoomModel._rangePropMode;
  var rangeModeInOption = dataZoomModel.get('rangeMode');
  each([['start', 'startValue'], ['end', 'endValue']], function (names, index) {
    var percentSpecified = inputRawOption[names[0]] != null;
    var valueSpecified = inputRawOption[names[1]] != null;

    if (percentSpecified && !valueSpecified) {
      rangePropMode[index] = 'percent';
    } else if (!percentSpecified && valueSpecified) {
      rangePropMode[index] = 'value';
    } else if (rangeModeInOption) {
      rangePropMode[index] = rangeModeInOption[index];
    } else if (percentSpecified) {
      // percentSpecified && valueSpecified
      rangePropMode[index] = 'percent';
    } // else remain its original setting.

  });
}

var _default = DataZoomModel;
module.exports = _default;

/***/ }),

/***/ "414c":
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

var DataZoomModel = __webpack_require__("3a56");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = DataZoomModel.extend({
  type: 'dataZoom.select'
});

module.exports = _default;

/***/ }),

/***/ "48ac":
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
var AxisPointerModel = echarts.extendComponentModel({
  type: 'axisPointer',
  coordSysAxesInfo: null,
  defaultOption: {
    // 'auto' means that show when triggered by tooltip or handle.
    show: 'auto',
    // 'click' | 'mousemove' | 'none'
    triggerOn: null,
    // set default in AxisPonterView.js
    zlevel: 0,
    z: 50,
    type: 'line',
    // 'line' 'shadow' 'cross' 'none'.
    // axispointer triggered by tootip determine snap automatically,
    // see `modelHelper`.
    snap: false,
    triggerTooltip: true,
    value: null,
    status: null,
    // Init value depends on whether handle is used.
    // [group0, group1, ...]
    // Each group can be: {
    //      mapper: function () {},
    //      singleTooltip: 'multiple',  // 'multiple' or 'single'
    //      xAxisId: ...,
    //      yAxisName: ...,
    //      angleAxisIndex: ...
    // }
    // mapper: can be ignored.
    //      input: {axisInfo, value}
    //      output: {axisInfo, value}
    link: [],
    // Do not set 'auto' here, otherwise global animation: false
    // will not effect at this axispointer.
    animation: null,
    animationDurationUpdate: 200,
    lineStyle: {
      color: '#aaa',
      width: 1,
      type: 'solid'
    },
    shadowStyle: {
      color: 'rgba(150,150,150,0.3)'
    },
    label: {
      show: true,
      formatter: null,
      // string | Function
      precision: 'auto',
      // Or a number like 0, 1, 2 ...
      margin: 3,
      color: '#fff',
      padding: [5, 7, 5, 7],
      backgroundColor: 'auto',
      // default: axis line color
      borderColor: null,
      borderWidth: 0,
      shadowBlur: 3,
      shadowColor: '#aaa' // Considering applicability, common style should
      // better not have shadowOffset.
      // shadowOffsetX: 0,
      // shadowOffsetY: 2

    },
    handle: {
      show: false,

      /* eslint-disable */
      icon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
      // jshint ignore:line

      /* eslint-enable */
      size: 45,
      // handle margin is from symbol center to axis, which is stable when circular move.
      margin: 50,
      // color: '#1b8bbd'
      // color: '#2f4554'
      color: '#333',
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 2,
      // For mobile performance
      throttle: 40
    }
  }
});
var _default = AxisPointerModel;
module.exports = _default;

/***/ }),

/***/ "4a9d":
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

var BaseAxisPointer = __webpack_require__("dcb3");

var viewHelper = __webpack_require__("ff2e");

var cartesianAxisHelper = __webpack_require__("0156");

var AxisView = __webpack_require__("6679");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var CartesianAxisPointer = BaseAxisPointer.extend({
  /**
   * @override
   */
  makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {
    var axis = axisModel.axis;
    var grid = axis.grid;
    var axisPointerType = axisPointerModel.get('type');
    var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
    var pixelValue = axis.toGlobalCoord(axis.dataToCoord(value, true));

    if (axisPointerType && axisPointerType !== 'none') {
      var elStyle = viewHelper.buildElStyle(axisPointerModel);
      var pointerOption = pointerShapeBuilder[axisPointerType](axis, pixelValue, otherExtent);
      pointerOption.style = elStyle;
      elOption.graphicKey = pointerOption.type;
      elOption.pointer = pointerOption;
    }

    var layoutInfo = cartesianAxisHelper.layout(grid.model, axisModel);
    viewHelper.buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api);
  },

  /**
   * @override
   */
  getHandleTransform: function (value, axisModel, axisPointerModel) {
    var layoutInfo = cartesianAxisHelper.layout(axisModel.axis.grid.model, axisModel, {
      labelInside: false
    });
    layoutInfo.labelMargin = axisPointerModel.get('handle.margin');
    return {
      position: viewHelper.getTransformedPosition(axisModel.axis, value, layoutInfo),
      rotation: layoutInfo.rotation + (layoutInfo.labelDirection < 0 ? Math.PI : 0)
    };
  },

  /**
   * @override
   */
  updateHandleTransform: function (transform, delta, axisModel, axisPointerModel) {
    var axis = axisModel.axis;
    var grid = axis.grid;
    var axisExtent = axis.getGlobalExtent(true);
    var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
    var dimIndex = axis.dim === 'x' ? 0 : 1;
    var currPosition = transform.position;
    currPosition[dimIndex] += delta[dimIndex];
    currPosition[dimIndex] = Math.min(axisExtent[1], currPosition[dimIndex]);
    currPosition[dimIndex] = Math.max(axisExtent[0], currPosition[dimIndex]);
    var cursorOtherValue = (otherExtent[1] + otherExtent[0]) / 2;
    var cursorPoint = [cursorOtherValue, cursorOtherValue];
    cursorPoint[dimIndex] = currPosition[dimIndex]; // Make tooltip do not overlap axisPointer and in the middle of the grid.

    var tooltipOptions = [{
      verticalAlign: 'middle'
    }, {
      align: 'center'
    }];
    return {
      position: currPosition,
      rotation: transform.rotation,
      cursorPoint: cursorPoint,
      tooltipOption: tooltipOptions[dimIndex]
    };
  }
});

function getCartesian(grid, axis) {
  var opt = {};
  opt[axis.dim + 'AxisIndex'] = axis.index;
  return grid.getCartesian(opt);
}

var pointerShapeBuilder = {
  line: function (axis, pixelValue, otherExtent) {
    var targetShape = viewHelper.makeLineShape([pixelValue, otherExtent[0]], [pixelValue, otherExtent[1]], getAxisDimIndex(axis));
    return {
      type: 'Line',
      subPixelOptimize: true,
      shape: targetShape
    };
  },
  shadow: function (axis, pixelValue, otherExtent) {
    var bandWidth = Math.max(1, axis.getBandWidth());
    var span = otherExtent[1] - otherExtent[0];
    return {
      type: 'Rect',
      shape: viewHelper.makeRectShape([pixelValue - bandWidth / 2, otherExtent[0]], [bandWidth, span], getAxisDimIndex(axis))
    };
  }
};

function getAxisDimIndex(axis) {
  return axis.dim === 'x' ? 0 : 1;
}

AxisView.registerAxisPointerClass('CartesianAxisPointer', CartesianAxisPointer);
var _default = CartesianAxisPointer;
module.exports = _default;

/***/ }),

/***/ "4b08":
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

var DataZoomView = __webpack_require__("7dcf");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = DataZoomView.extend({
  type: 'dataZoom.select'
});

module.exports = _default;

/***/ }),

/***/ "50e5":
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

var formatUtil = __webpack_require__("eda2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var AXIS_DIMS = ['x', 'y', 'z', 'radius', 'angle', 'single']; // Supported coords.

var COORDS = ['cartesian2d', 'polar', 'singleAxis'];
/**
 * @param {string} coordType
 * @return {boolean}
 */

function isCoordSupported(coordType) {
  return zrUtil.indexOf(COORDS, coordType) >= 0;
}
/**
 * Create "each" method to iterate names.
 *
 * @pubilc
 * @param  {Array.<string>} names
 * @param  {Array.<string>=} attrs
 * @return {Function}
 */


function createNameEach(names, attrs) {
  names = names.slice();
  var capitalNames = zrUtil.map(names, formatUtil.capitalFirst);
  attrs = (attrs || []).slice();
  var capitalAttrs = zrUtil.map(attrs, formatUtil.capitalFirst);
  return function (callback, context) {
    zrUtil.each(names, function (name, index) {
      var nameObj = {
        name: name,
        capital: capitalNames[index]
      };

      for (var j = 0; j < attrs.length; j++) {
        nameObj[attrs[j]] = name + capitalAttrs[j];
      }

      callback.call(context, nameObj);
    });
  };
}
/**
 * Iterate each dimension name.
 *
 * @public
 * @param {Function} callback The parameter is like:
 *                            {
 *                                name: 'angle',
 *                                capital: 'Angle',
 *                                axis: 'angleAxis',
 *                                axisIndex: 'angleAixs',
 *                                index: 'angleIndex'
 *                            }
 * @param {Object} context
 */


var eachAxisDim = createNameEach(AXIS_DIMS, ['axisIndex', 'axis', 'index', 'id']);
/**
 * If tow dataZoomModels has the same axis controlled, we say that they are 'linked'.
 * dataZoomModels and 'links' make up one or more graphics.
 * This function finds the graphic where the source dataZoomModel is in.
 *
 * @public
 * @param {Function} forEachNode Node iterator.
 * @param {Function} forEachEdgeType edgeType iterator
 * @param {Function} edgeIdGetter Giving node and edgeType, return an array of edge id.
 * @return {Function} Input: sourceNode, Output: Like {nodes: [], dims: {}}
 */

function createLinkedNodesFinder(forEachNode, forEachEdgeType, edgeIdGetter) {
  return function (sourceNode) {
    var result = {
      nodes: [],
      records: {} // key: edgeType.name, value: Object (key: edge id, value: boolean).

    };
    forEachEdgeType(function (edgeType) {
      result.records[edgeType.name] = {};
    });

    if (!sourceNode) {
      return result;
    }

    absorb(sourceNode, result);
    var existsLink;

    do {
      existsLink = false;
      forEachNode(processSingleNode);
    } while (existsLink);

    function processSingleNode(node) {
      if (!isNodeAbsorded(node, result) && isLinked(node, result)) {
        absorb(node, result);
        existsLink = true;
      }
    }

    return result;
  };

  function isNodeAbsorded(node, result) {
    return zrUtil.indexOf(result.nodes, node) >= 0;
  }

  function isLinked(node, result) {
    var hasLink = false;
    forEachEdgeType(function (edgeType) {
      zrUtil.each(edgeIdGetter(node, edgeType) || [], function (edgeId) {
        result.records[edgeType.name][edgeId] && (hasLink = true);
      });
    });
    return hasLink;
  }

  function absorb(node, result) {
    result.nodes.push(node);
    forEachEdgeType(function (edgeType) {
      zrUtil.each(edgeIdGetter(node, edgeType) || [], function (edgeId) {
        result.records[edgeType.name][edgeId] = true;
      });
    });
  }
}

exports.isCoordSupported = isCoordSupported;
exports.createNameEach = createNameEach;
exports.eachAxisDim = eachAxisDim;
exports.createLinkedNodesFinder = createLinkedNodesFinder;

/***/ }),

/***/ "5576":
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

var RoamController = __webpack_require__("4a01");

var throttleUtil = __webpack_require__("88b3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Only create one roam controller for each coordinate system.
// one roam controller might be refered by two inside data zoom
// components (for example, one for x and one for y). When user
// pan or zoom, only dispatch one action for those data zoom
// components.
var ATTR = '\0_ec_dataZoom_roams';
/**
 * @public
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} dataZoomInfo
 * @param {string} dataZoomInfo.coordId
 * @param {Function} dataZoomInfo.containsPoint
 * @param {Array.<string>} dataZoomInfo.allCoordIds
 * @param {string} dataZoomInfo.dataZoomId
 * @param {Object} dataZoomInfo.getRange
 * @param {Function} dataZoomInfo.getRange.pan
 * @param {Function} dataZoomInfo.getRange.zoom
 * @param {Function} dataZoomInfo.getRange.scrollMove
 * @param {boolean} dataZoomInfo.dataZoomModel
 */

function register(api, dataZoomInfo) {
  var store = giveStore(api);
  var theDataZoomId = dataZoomInfo.dataZoomId;
  var theCoordId = dataZoomInfo.coordId; // Do clean when a dataZoom changes its target coordnate system.
  // Avoid memory leak, dispose all not-used-registered.

  zrUtil.each(store, function (record, coordId) {
    var dataZoomInfos = record.dataZoomInfos;

    if (dataZoomInfos[theDataZoomId] && zrUtil.indexOf(dataZoomInfo.allCoordIds, theCoordId) < 0) {
      delete dataZoomInfos[theDataZoomId];
      record.count--;
    }
  });
  cleanStore(store);
  var record = store[theCoordId]; // Create if needed.

  if (!record) {
    record = store[theCoordId] = {
      coordId: theCoordId,
      dataZoomInfos: {},
      count: 0
    };
    record.controller = createController(api, record);
    record.dispatchAction = zrUtil.curry(dispatchAction, api);
  } // Update reference of dataZoom.


  !record.dataZoomInfos[theDataZoomId] && record.count++;
  record.dataZoomInfos[theDataZoomId] = dataZoomInfo;
  var controllerParams = mergeControllerParams(record.dataZoomInfos);
  record.controller.enable(controllerParams.controlType, controllerParams.opt); // Consider resize, area should be always updated.

  record.controller.setPointerChecker(dataZoomInfo.containsPoint); // Update throttle.

  throttleUtil.createOrUpdate(record, 'dispatchAction', dataZoomInfo.dataZoomModel.get('throttle', true), 'fixRate');
}
/**
 * @public
 * @param {module:echarts/ExtensionAPI} api
 * @param {string} dataZoomId
 */


function unregister(api, dataZoomId) {
  var store = giveStore(api);
  zrUtil.each(store, function (record) {
    record.controller.dispose();
    var dataZoomInfos = record.dataZoomInfos;

    if (dataZoomInfos[dataZoomId]) {
      delete dataZoomInfos[dataZoomId];
      record.count--;
    }
  });
  cleanStore(store);
}
/**
 * @public
 */


function generateCoordId(coordModel) {
  return coordModel.type + '\0_' + coordModel.id;
}
/**
 * Key: coordId, value: {dataZoomInfos: [], count, controller}
 * @type {Array.<Object>}
 */


function giveStore(api) {
  // Mount store on zrender instance, so that we do not
  // need to worry about dispose.
  var zr = api.getZr();
  return zr[ATTR] || (zr[ATTR] = {});
}

function createController(api, newRecord) {
  var controller = new RoamController(api.getZr());
  zrUtil.each(['pan', 'zoom', 'scrollMove'], function (eventName) {
    controller.on(eventName, function (event) {
      var batch = [];
      zrUtil.each(newRecord.dataZoomInfos, function (info) {
        // Check whether the behaviors (zoomOnMouseWheel, moveOnMouseMove,
        // moveOnMouseWheel, ...) enabled.
        if (!event.isAvailableBehavior(info.dataZoomModel.option)) {
          return;
        }

        var method = (info.getRange || {})[eventName];
        var range = method && method(newRecord.controller, event);
        !info.dataZoomModel.get('disabled', true) && range && batch.push({
          dataZoomId: info.dataZoomId,
          start: range[0],
          end: range[1]
        });
      });
      batch.length && newRecord.dispatchAction(batch);
    });
  });
  return controller;
}

function cleanStore(store) {
  zrUtil.each(store, function (record, coordId) {
    if (!record.count) {
      record.controller.dispose();
      delete store[coordId];
    }
  });
}
/**
 * This action will be throttled.
 */


function dispatchAction(api, batch) {
  api.dispatchAction({
    type: 'dataZoom',
    batch: batch
  });
}
/**
 * Merge roamController settings when multiple dataZooms share one roamController.
 */


function mergeControllerParams(dataZoomInfos) {
  var controlType; // DO NOT use reserved word (true, false, undefined) as key literally. Even if encapsulated
  // as string, it is probably revert to reserved word by compress tool. See #7411.

  var prefix = 'type_';
  var typePriority = {
    'type_true': 2,
    'type_move': 1,
    'type_false': 0,
    'type_undefined': -1
  };
  var preventDefaultMouseMove = true;
  zrUtil.each(dataZoomInfos, function (dataZoomInfo) {
    var dataZoomModel = dataZoomInfo.dataZoomModel;
    var oneType = dataZoomModel.get('disabled', true) ? false : dataZoomModel.get('zoomLock', true) ? 'move' : true;

    if (typePriority[prefix + oneType] > typePriority[prefix + controlType]) {
      controlType = oneType;
    } // Prevent default move event by default. If one false, do not prevent. Otherwise
    // users may be confused why it does not work when multiple insideZooms exist.


    preventDefaultMouseMove &= dataZoomModel.get('preventDefaultMouseMove', true);
  });
  return {
    controlType: controlType,
    opt: {
      // RoamController will enable all of these functionalities,
      // and the final behavior is determined by its event listener
      // provided by each inside zoom.
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      preventDefaultMouseMove: !!preventDefaultMouseMove
    }
  };
}

exports.register = register;
exports.unregister = unregister;
exports.generateCoordId = generateCoordId;

/***/ }),

/***/ "6679":
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

var axisPointerModelHelper = __webpack_require__("cd33");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Base class of AxisView.
 */
var AxisView = echarts.extendComponentView({
  type: 'axis',

  /**
   * @private
   */
  _axisPointer: null,

  /**
   * @protected
   * @type {string}
   */
  axisPointerClass: null,

  /**
   * @override
   */
  render: function (axisModel, ecModel, api, payload) {
    // FIXME
    // This process should proformed after coordinate systems updated
    // (axis scale updated), and should be performed each time update.
    // So put it here temporarily, although it is not appropriate to
    // put a model-writing procedure in `view`.
    this.axisPointerClass && axisPointerModelHelper.fixValue(axisModel);
    AxisView.superApply(this, 'render', arguments);
    updateAxisPointer(this, axisModel, ecModel, api, payload, true);
  },

  /**
   * Action handler.
   * @public
   * @param {module:echarts/coord/cartesian/AxisModel} axisModel
   * @param {module:echarts/model/Global} ecModel
   * @param {module:echarts/ExtensionAPI} api
   * @param {Object} payload
   */
  updateAxisPointer: function (axisModel, ecModel, api, payload, force) {
    updateAxisPointer(this, axisModel, ecModel, api, payload, false);
  },

  /**
   * @override
   */
  remove: function (ecModel, api) {
    var axisPointer = this._axisPointer;
    axisPointer && axisPointer.remove(api);
    AxisView.superApply(this, 'remove', arguments);
  },

  /**
   * @override
   */
  dispose: function (ecModel, api) {
    disposeAxisPointer(this, api);
    AxisView.superApply(this, 'dispose', arguments);
  }
});

function updateAxisPointer(axisView, axisModel, ecModel, api, payload, forceRender) {
  var Clazz = AxisView.getAxisPointerClass(axisView.axisPointerClass);

  if (!Clazz) {
    return;
  }

  var axisPointerModel = axisPointerModelHelper.getAxisPointerModel(axisModel);
  axisPointerModel ? (axisView._axisPointer || (axisView._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : disposeAxisPointer(axisView, api);
}

function disposeAxisPointer(axisView, ecModel, api) {
  var axisPointer = axisView._axisPointer;
  axisPointer && axisPointer.dispose(ecModel, api);
  axisView._axisPointer = null;
}

var axisPointerClazz = [];

AxisView.registerAxisPointerClass = function (type, clazz) {
  axisPointerClazz[type] = clazz;
};

AxisView.getAxisPointerClass = function (type) {
  return type && axisPointerClazz[type];
};

var _default = AxisView;
module.exports = _default;

/***/ }),

/***/ "6932":
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

var Component = __webpack_require__("6cb7");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
Component.registerSubTypeDefaulter('dataZoom', function () {
  // Default 'slider' when no type specified.
  return 'slider';
});

/***/ }),

/***/ "6acf":
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

var formatUtil = __webpack_require__("eda2");

var BaseAxisPointer = __webpack_require__("dcb3");

var graphic = __webpack_require__("2306");

var viewHelper = __webpack_require__("ff2e");

var matrix = __webpack_require__("1687");

var AxisBuilder = __webpack_require__("fab2");

var AxisView = __webpack_require__("6679");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PolarAxisPointer = BaseAxisPointer.extend({
  /**
   * @override
   */
  makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {
    var axis = axisModel.axis;

    if (axis.dim === 'angle') {
      this.animationThreshold = Math.PI / 18;
    }

    var polar = axis.polar;
    var otherAxis = polar.getOtherAxis(axis);
    var otherExtent = otherAxis.getExtent();
    var coordValue;
    coordValue = axis['dataTo' + formatUtil.capitalFirst(axis.dim)](value);
    var axisPointerType = axisPointerModel.get('type');

    if (axisPointerType && axisPointerType !== 'none') {
      var elStyle = viewHelper.buildElStyle(axisPointerModel);
      var pointerOption = pointerShapeBuilder[axisPointerType](axis, polar, coordValue, otherExtent, elStyle);
      pointerOption.style = elStyle;
      elOption.graphicKey = pointerOption.type;
      elOption.pointer = pointerOption;
    }

    var labelMargin = axisPointerModel.get('label.margin');
    var labelPos = getLabelPosition(value, axisModel, axisPointerModel, polar, labelMargin);
    viewHelper.buildLabelElOption(elOption, axisModel, axisPointerModel, api, labelPos);
  } // Do not support handle, utill any user requires it.

});

function getLabelPosition(value, axisModel, axisPointerModel, polar, labelMargin) {
  var axis = axisModel.axis;
  var coord = axis.dataToCoord(value);
  var axisAngle = polar.getAngleAxis().getExtent()[0];
  axisAngle = axisAngle / 180 * Math.PI;
  var radiusExtent = polar.getRadiusAxis().getExtent();
  var position;
  var align;
  var verticalAlign;

  if (axis.dim === 'radius') {
    var transform = matrix.create();
    matrix.rotate(transform, transform, axisAngle);
    matrix.translate(transform, transform, [polar.cx, polar.cy]);
    position = graphic.applyTransform([coord, -labelMargin], transform);
    var labelRotation = axisModel.getModel('axisLabel').get('rotate') || 0;
    var labelLayout = AxisBuilder.innerTextLayout(axisAngle, labelRotation * Math.PI / 180, -1);
    align = labelLayout.textAlign;
    verticalAlign = labelLayout.textVerticalAlign;
  } else {
    // angle axis
    var r = radiusExtent[1];
    position = polar.coordToPoint([r + labelMargin, coord]);
    var cx = polar.cx;
    var cy = polar.cy;
    align = Math.abs(position[0] - cx) / r < 0.3 ? 'center' : position[0] > cx ? 'left' : 'right';
    verticalAlign = Math.abs(position[1] - cy) / r < 0.3 ? 'middle' : position[1] > cy ? 'top' : 'bottom';
  }

  return {
    position: position,
    align: align,
    verticalAlign: verticalAlign
  };
}

var pointerShapeBuilder = {
  line: function (axis, polar, coordValue, otherExtent, elStyle) {
    return axis.dim === 'angle' ? {
      type: 'Line',
      shape: viewHelper.makeLineShape(polar.coordToPoint([otherExtent[0], coordValue]), polar.coordToPoint([otherExtent[1], coordValue]))
    } : {
      type: 'Circle',
      shape: {
        cx: polar.cx,
        cy: polar.cy,
        r: coordValue
      }
    };
  },
  shadow: function (axis, polar, coordValue, otherExtent, elStyle) {
    var bandWidth = Math.max(1, axis.getBandWidth());
    var radian = Math.PI / 180;
    return axis.dim === 'angle' ? {
      type: 'Sector',
      shape: viewHelper.makeSectorShape(polar.cx, polar.cy, otherExtent[0], otherExtent[1], // In ECharts y is negative if angle is positive
      (-coordValue - bandWidth / 2) * radian, (-coordValue + bandWidth / 2) * radian)
    } : {
      type: 'Sector',
      shape: viewHelper.makeSectorShape(polar.cx, polar.cy, coordValue - bandWidth / 2, coordValue + bandWidth / 2, 0, Math.PI * 2)
    };
  }
};
AxisView.registerAxisPointerClass('PolarAxisPointer', PolarAxisPointer);
var _default = PolarAxisPointer;
module.exports = _default;

/***/ }),

/***/ "6fda":
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
var each = zrUtil.each;
var ATTR = '\0_ec_hist_store';
/**
 * @param {module:echarts/model/Global} ecModel
 * @param {Object} newSnapshot {dataZoomId, batch: [payloadInfo, ...]}
 */

function push(ecModel, newSnapshot) {
  var store = giveStore(ecModel); // If previous dataZoom can not be found,
  // complete an range with current range.

  each(newSnapshot, function (batchItem, dataZoomId) {
    var i = store.length - 1;

    for (; i >= 0; i--) {
      var snapshot = store[i];

      if (snapshot[dataZoomId]) {
        break;
      }
    }

    if (i < 0) {
      // No origin range set, create one by current range.
      var dataZoomModel = ecModel.queryComponents({
        mainType: 'dataZoom',
        subType: 'select',
        id: dataZoomId
      })[0];

      if (dataZoomModel) {
        var percentRange = dataZoomModel.getPercentRange();
        store[0][dataZoomId] = {
          dataZoomId: dataZoomId,
          start: percentRange[0],
          end: percentRange[1]
        };
      }
    }
  });
  store.push(newSnapshot);
}
/**
 * @param {module:echarts/model/Global} ecModel
 * @return {Object} snapshot
 */


function pop(ecModel) {
  var store = giveStore(ecModel);
  var head = store[store.length - 1];
  store.length > 1 && store.pop(); // Find top for all dataZoom.

  var snapshot = {};
  each(head, function (batchItem, dataZoomId) {
    for (var i = store.length - 1; i >= 0; i--) {
      var batchItem = store[i][dataZoomId];

      if (batchItem) {
        snapshot[dataZoomId] = batchItem;
        break;
      }
    }
  });
  return snapshot;
}
/**
 * @param {module:echarts/model/Global} ecModel
 */


function clear(ecModel) {
  ecModel[ATTR] = null;
}
/**
 * @param {module:echarts/model/Global} ecModel
 * @return {number} records. always >= 1.
 */


function count(ecModel) {
  return giveStore(ecModel).length;
}
/**
 * [{key: dataZoomId, value: {dataZoomId, range}}, ...]
 * History length of each dataZoom may be different.
 * this._history[0] is used to store origin range.
 * @type {Array.<Object>}
 */


function giveStore(ecModel) {
  var store = ecModel[ATTR];

  if (!store) {
    store = ecModel[ATTR] = [{}];
  }

  return store;
}

exports.push = push;
exports.pop = pop;
exports.clear = clear;
exports.count = count;

/***/ }),

/***/ "7661":
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

var MapDraw = __webpack_require__("0c41");

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
var _default = echarts.extendComponentView({
  type: 'geo',
  init: function (ecModel, api) {
    var mapDraw = new MapDraw(api, true);
    this._mapDraw = mapDraw;
    this.group.add(mapDraw.group);
  },
  render: function (geoModel, ecModel, api, payload) {
    // Not render if it is an toggleSelect action from self
    if (payload && payload.type === 'geoToggleSelect' && payload.from === this.uid) {
      return;
    }

    var mapDraw = this._mapDraw;

    if (geoModel.get('show')) {
      mapDraw.draw(geoModel, ecModel, api, this, payload);
    } else {
      this._mapDraw.group.removeAll();
    }

    this.group.silent = geoModel.get('silent');
  },
  dispose: function () {
    this._mapDraw && this._mapDraw.remove();
  }
});

module.exports = _default;

/***/ }),

/***/ "7dcf":
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

var ComponentView = __webpack_require__("b12f");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = ComponentView.extend({
  type: 'dataZoom',
  render: function (dataZoomModel, ecModel, api, payload) {
    this.dataZoomModel = dataZoomModel;
    this.ecModel = ecModel;
    this.api = api;
  },

  /**
   * Find the first target coordinate system.
   *
   * @protected
   * @return {Object} {
   *                   grid: [
   *                       {model: coord0, axisModels: [axis1, axis3], coordIndex: 1},
   *                       {model: coord1, axisModels: [axis0, axis2], coordIndex: 0},
   *                       ...
   *                   ],  // cartesians must not be null/undefined.
   *                   polar: [
   *                       {model: coord0, axisModels: [axis4], coordIndex: 0},
   *                       ...
   *                   ],  // polars must not be null/undefined.
   *                   singleAxis: [
   *                       {model: coord0, axisModels: [], coordIndex: 0}
   *                   ]
   */
  getTargetCoordInfo: function () {
    var dataZoomModel = this.dataZoomModel;
    var ecModel = this.ecModel;
    var coordSysLists = {};
    dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
      var axisModel = ecModel.getComponent(dimNames.axis, axisIndex);

      if (axisModel) {
        var coordModel = axisModel.getCoordSysModel();
        coordModel && save(coordModel, axisModel, coordSysLists[coordModel.mainType] || (coordSysLists[coordModel.mainType] = []), coordModel.componentIndex);
      }
    }, this);

    function save(coordModel, axisModel, store, coordIndex) {
      var item;

      for (var i = 0; i < store.length; i++) {
        if (store[i].model === coordModel) {
          item = store[i];
          break;
        }
      }

      if (!item) {
        store.push(item = {
          model: coordModel,
          axisModels: [],
          coordIndex: coordIndex
        });
      }

      item.axisModels.push(axisModel);
    }

    return coordSysLists;
  }
});

module.exports = _default;

/***/ }),

/***/ "7f59":
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

var modelUtil = __webpack_require__("e0d3");

var graphicUtil = __webpack_require__("2306");

var layoutUtil = __webpack_require__("f934");

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
var _nonShapeGraphicElements = {
  // Reserved but not supported in graphic component.
  path: null,
  compoundPath: null,
  // Supported in graphic component.
  group: graphicUtil.Group,
  image: graphicUtil.Image,
  text: graphicUtil.Text
}; // -------------
// Preprocessor
// -------------

echarts.registerPreprocessor(function (option) {
  var graphicOption = option.graphic; // Convert
  // {graphic: [{left: 10, type: 'circle'}, ...]}
  // or
  // {graphic: {left: 10, type: 'circle'}}
  // to
  // {graphic: [{elements: [{left: 10, type: 'circle'}, ...]}]}

  if (zrUtil.isArray(graphicOption)) {
    if (!graphicOption[0] || !graphicOption[0].elements) {
      option.graphic = [{
        elements: graphicOption
      }];
    } else {
      // Only one graphic instance can be instantiated. (We dont
      // want that too many views are created in echarts._viewMap)
      option.graphic = [option.graphic[0]];
    }
  } else if (graphicOption && !graphicOption.elements) {
    option.graphic = [{
      elements: [graphicOption]
    }];
  }
}); // ------
// Model
// ------

var GraphicModel = echarts.extendComponentModel({
  type: 'graphic',
  defaultOption: {
    // Extra properties for each elements:
    //
    // left/right/top/bottom: (like 12, '22%', 'center', default undefined)
    //      If left/rigth is set, shape.x/shape.cx/position will not be used.
    //      If top/bottom is set, shape.y/shape.cy/position will not be used.
    //      This mechanism is useful when you want to position a group/element
    //      against the right side or the center of this container.
    //
    // width/height: (can only be pixel value, default 0)
    //      Only be used to specify contianer(group) size, if needed. And
    //      can not be percentage value (like '33%'). See the reason in the
    //      layout algorithm below.
    //
    // bounding: (enum: 'all' (default) | 'raw')
    //      Specify how to calculate boundingRect when locating.
    //      'all': Get uioned and transformed boundingRect
    //          from both itself and its descendants.
    //          This mode simplies confining a group of elements in the bounding
    //          of their ancester container (e.g., using 'right: 0').
    //      'raw': Only use the boundingRect of itself and before transformed.
    //          This mode is similar to css behavior, which is useful when you
    //          want an element to be able to overflow its container. (Consider
    //          a rotated circle needs to be located in a corner.)
    // info: custom info. enables user to mount some info on elements and use them
    //      in event handlers. Update them only when user specified, otherwise, remain.
    // Note: elements is always behind its ancestors in this elements array.
    elements: [],
    parentId: null
  },

  /**
   * Save el options for the sake of the performance (only update modified graphics).
   * The order is the same as those in option. (ancesters -> descendants)
   *
   * @private
   * @type {Array.<Object>}
   */
  _elOptionsToUpdate: null,

  /**
   * @override
   */
  mergeOption: function (option) {
    // Prevent default merge to elements
    var elements = this.option.elements;
    this.option.elements = null;
    GraphicModel.superApply(this, 'mergeOption', arguments);
    this.option.elements = elements;
  },

  /**
   * @override
   */
  optionUpdated: function (newOption, isInit) {
    var thisOption = this.option;
    var newList = (isInit ? thisOption : newOption).elements;
    var existList = thisOption.elements = isInit ? [] : thisOption.elements;
    var flattenedList = [];

    this._flatten(newList, flattenedList);

    var mappingResult = modelUtil.mappingToExists(existList, flattenedList);
    modelUtil.makeIdAndName(mappingResult); // Clear elOptionsToUpdate

    var elOptionsToUpdate = this._elOptionsToUpdate = [];
    zrUtil.each(mappingResult, function (resultItem, index) {
      var newElOption = resultItem.option;

      if (!newElOption) {
        return;
      }

      elOptionsToUpdate.push(newElOption);
      setKeyInfoToNewElOption(resultItem, newElOption);
      mergeNewElOptionToExist(existList, index, newElOption);
      setLayoutInfoToExist(existList[index], newElOption);
    }, this); // Clean

    for (var i = existList.length - 1; i >= 0; i--) {
      if (existList[i] == null) {
        existList.splice(i, 1);
      } else {
        // $action should be volatile, otherwise option gotten from
        // `getOption` will contain unexpected $action.
        delete existList[i].$action;
      }
    }
  },

  /**
   * Convert
   * [{
   *  type: 'group',
   *  id: 'xx',
   *  children: [{type: 'circle'}, {type: 'polygon'}]
   * }]
   * to
   * [
   *  {type: 'group', id: 'xx'},
   *  {type: 'circle', parentId: 'xx'},
   *  {type: 'polygon', parentId: 'xx'}
   * ]
   *
   * @private
   * @param {Array.<Object>} optionList option list
   * @param {Array.<Object>} result result of flatten
   * @param {Object} parentOption parent option
   */
  _flatten: function (optionList, result, parentOption) {
    zrUtil.each(optionList, function (option) {
      if (!option) {
        return;
      }

      if (parentOption) {
        option.parentOption = parentOption;
      }

      result.push(option);
      var children = option.children;

      if (option.type === 'group' && children) {
        this._flatten(children, result, option);
      } // Deleting for JSON output, and for not affecting group creation.


      delete option.children;
    }, this);
  },
  // FIXME
  // Pass to view using payload? setOption has a payload?
  useElOptionsToUpdate: function () {
    var els = this._elOptionsToUpdate; // Clear to avoid render duplicately when zooming.

    this._elOptionsToUpdate = null;
    return els;
  }
}); // -----
// View
// -----

echarts.extendComponentView({
  type: 'graphic',

  /**
   * @override
   */
  init: function (ecModel, api) {
    /**
     * @private
     * @type {module:zrender/core/util.HashMap}
     */
    this._elMap = zrUtil.createHashMap();
    /**
     * @private
     * @type {module:echarts/graphic/GraphicModel}
     */

    this._lastGraphicModel;
  },

  /**
   * @override
   */
  render: function (graphicModel, ecModel, api) {
    // Having leveraged between use cases and algorithm complexity, a very
    // simple layout mechanism is used:
    // The size(width/height) can be determined by itself or its parent (not
    // implemented yet), but can not by its children. (Top-down travel)
    // The location(x/y) can be determined by the bounding rect of itself
    // (can including its descendants or not) and the size of its parent.
    // (Bottom-up travel)
    // When `chart.clear()` or `chart.setOption({...}, true)` with the same id,
    // view will be reused.
    if (graphicModel !== this._lastGraphicModel) {
      this._clear();
    }

    this._lastGraphicModel = graphicModel;

    this._updateElements(graphicModel);

    this._relocate(graphicModel, api);
  },

  /**
   * Update graphic elements.
   *
   * @private
   * @param {Object} graphicModel graphic model
   */
  _updateElements: function (graphicModel) {
    var elOptionsToUpdate = graphicModel.useElOptionsToUpdate();

    if (!elOptionsToUpdate) {
      return;
    }

    var elMap = this._elMap;
    var rootGroup = this.group; // Top-down tranverse to assign graphic settings to each elements.

    zrUtil.each(elOptionsToUpdate, function (elOption) {
      var $action = elOption.$action;
      var id = elOption.id;
      var existEl = elMap.get(id);
      var parentId = elOption.parentId;
      var targetElParent = parentId != null ? elMap.get(parentId) : rootGroup;
      var elOptionStyle = elOption.style;

      if (elOption.type === 'text' && elOptionStyle) {
        // In top/bottom mode, textVerticalAlign should not be used, which cause
        // inaccurately locating.
        if (elOption.hv && elOption.hv[1]) {
          elOptionStyle.textVerticalAlign = elOptionStyle.textBaseline = null;
        } // Compatible with previous setting: both support fill and textFill,
        // stroke and textStroke.


        !elOptionStyle.hasOwnProperty('textFill') && elOptionStyle.fill && (elOptionStyle.textFill = elOptionStyle.fill);
        !elOptionStyle.hasOwnProperty('textStroke') && elOptionStyle.stroke && (elOptionStyle.textStroke = elOptionStyle.stroke);
      } // Remove unnecessary props to avoid potential problems.


      var elOptionCleaned = getCleanedElOption(elOption); // For simple, do not support parent change, otherwise reorder is needed.

      if (!$action || $action === 'merge') {
        existEl ? existEl.attr(elOptionCleaned) : createEl(id, targetElParent, elOptionCleaned, elMap);
      } else if ($action === 'replace') {
        removeEl(existEl, elMap);
        createEl(id, targetElParent, elOptionCleaned, elMap);
      } else if ($action === 'remove') {
        removeEl(existEl, elMap);
      }

      var el = elMap.get(id);

      if (el) {
        el.__ecGraphicWidthOption = elOption.width;
        el.__ecGraphicHeightOption = elOption.height;
        setEventData(el, graphicModel, elOption);
      }
    });
  },

  /**
   * Locate graphic elements.
   *
   * @private
   * @param {Object} graphicModel graphic model
   * @param {module:echarts/ExtensionAPI} api extension API
   */
  _relocate: function (graphicModel, api) {
    var elOptions = graphicModel.option.elements;
    var rootGroup = this.group;
    var elMap = this._elMap;
    var apiWidth = api.getWidth();
    var apiHeight = api.getHeight(); // Top-down to calculate percentage width/height of group

    for (var i = 0; i < elOptions.length; i++) {
      var elOption = elOptions[i];
      var el = elMap.get(elOption.id);

      if (!el || !el.isGroup) {
        continue;
      }

      var parentEl = el.parent;
      var isParentRoot = parentEl === rootGroup; // Like 'position:absolut' in css, default 0.

      el.__ecGraphicWidth = parsePercent(el.__ecGraphicWidthOption, isParentRoot ? apiWidth : parentEl.__ecGraphicWidth) || 0;
      el.__ecGraphicHeight = parsePercent(el.__ecGraphicHeightOption, isParentRoot ? apiHeight : parentEl.__ecGraphicHeight) || 0;
    } // Bottom-up tranvese all elements (consider ec resize) to locate elements.


    for (var i = elOptions.length - 1; i >= 0; i--) {
      var elOption = elOptions[i];
      var el = elMap.get(elOption.id);

      if (!el) {
        continue;
      }

      var parentEl = el.parent;
      var containerInfo = parentEl === rootGroup ? {
        width: apiWidth,
        height: apiHeight
      } : {
        width: parentEl.__ecGraphicWidth,
        height: parentEl.__ecGraphicHeight
      }; // PENDING
      // Currently, when `bounding: 'all'`, the union bounding rect of the group
      // does not include the rect of [0, 0, group.width, group.height], which
      // is probably weird for users. Should we make a break change for it?

      layoutUtil.positionElement(el, elOption, containerInfo, null, {
        hv: elOption.hv,
        boundingMode: elOption.bounding
      });
    }
  },

  /**
   * Clear all elements.
   *
   * @private
   */
  _clear: function () {
    var elMap = this._elMap;
    elMap.each(function (el) {
      removeEl(el, elMap);
    });
    this._elMap = zrUtil.createHashMap();
  },

  /**
   * @override
   */
  dispose: function () {
    this._clear();
  }
});

function createEl(id, targetElParent, elOption, elMap) {
  var graphicType = elOption.type;
  var Clz = _nonShapeGraphicElements.hasOwnProperty(graphicType) // Those graphic elements are not shapes. They should not be
  // overwritten by users, so do them first.
  ? _nonShapeGraphicElements[graphicType] : graphicUtil.getShapeClass(graphicType);
  var el = new Clz(elOption);
  targetElParent.add(el);
  elMap.set(id, el);
  el.__ecGraphicId = id;
}

function removeEl(existEl, elMap) {
  var existElParent = existEl && existEl.parent;

  if (existElParent) {
    existEl.type === 'group' && existEl.traverse(function (el) {
      removeEl(el, elMap);
    });
    elMap.removeKey(existEl.__ecGraphicId);
    existElParent.remove(existEl);
  }
} // Remove unnecessary props to avoid potential problems.


function getCleanedElOption(elOption) {
  elOption = zrUtil.extend({}, elOption);
  zrUtil.each(['id', 'parentId', '$action', 'hv', 'bounding'].concat(layoutUtil.LOCATION_PARAMS), function (name) {
    delete elOption[name];
  });
  return elOption;
}

function isSetLoc(obj, props) {
  var isSet;
  zrUtil.each(props, function (prop) {
    obj[prop] != null && obj[prop] !== 'auto' && (isSet = true);
  });
  return isSet;
}

function setKeyInfoToNewElOption(resultItem, newElOption) {
  var existElOption = resultItem.exist; // Set id and type after id assigned.

  newElOption.id = resultItem.keyInfo.id;
  !newElOption.type && existElOption && (newElOption.type = existElOption.type); // Set parent id if not specified

  if (newElOption.parentId == null) {
    var newElParentOption = newElOption.parentOption;

    if (newElParentOption) {
      newElOption.parentId = newElParentOption.id;
    } else if (existElOption) {
      newElOption.parentId = existElOption.parentId;
    }
  } // Clear


  newElOption.parentOption = null;
}

function mergeNewElOptionToExist(existList, index, newElOption) {
  // Update existing options, for `getOption` feature.
  var newElOptCopy = zrUtil.extend({}, newElOption);
  var existElOption = existList[index];
  var $action = newElOption.$action || 'merge';

  if ($action === 'merge') {
    if (existElOption) {
      // We can ensure that newElOptCopy and existElOption are not
      // the same object, so `merge` will not change newElOptCopy.
      zrUtil.merge(existElOption, newElOptCopy, true); // Rigid body, use ignoreSize.

      layoutUtil.mergeLayoutParam(existElOption, newElOptCopy, {
        ignoreSize: true
      }); // Will be used in render.

      layoutUtil.copyLayoutParams(newElOption, existElOption);
    } else {
      existList[index] = newElOptCopy;
    }
  } else if ($action === 'replace') {
    existList[index] = newElOptCopy;
  } else if ($action === 'remove') {
    // null will be cleaned later.
    existElOption && (existList[index] = null);
  }
}

function setLayoutInfoToExist(existItem, newElOption) {
  if (!existItem) {
    return;
  }

  existItem.hv = newElOption.hv = [// Rigid body, dont care `width`.
  isSetLoc(newElOption, ['left', 'right']), // Rigid body, dont care `height`.
  isSetLoc(newElOption, ['top', 'bottom'])]; // Give default group size. Otherwise layout error may occur.

  if (existItem.type === 'group') {
    existItem.width == null && (existItem.width = newElOption.width = 0);
    existItem.height == null && (existItem.height = newElOption.height = 0);
  }
}

function setEventData(el, graphicModel, elOption) {
  var eventData = el.eventData; // Simple optimize for large amount of elements that no need event.

  if (!el.silent && !el.ignore && !eventData) {
    eventData = el.eventData = {
      componentType: 'graphic',
      componentIndex: graphicModel.componentIndex,
      name: el.name
    };
  } // `elOption.info` enables user to mount some info on
  // elements and use them in event handlers.


  if (eventData) {
    eventData.info = el.info;
  }
}

/***/ }),

/***/ "7f72":
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

__webpack_require__("6932");

__webpack_require__("3a56");

__webpack_require__("7dcf");

__webpack_require__("a18f");

__webpack_require__("32a1");

__webpack_require__("2c17");

__webpack_require__("9e87");

/***/ }),

/***/ "8459":
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
 * @property {string} parallelAxisId
 * @property {Array.<Array.<number>>} intervals
 */
var actionInfo = {
  type: 'axisAreaSelect',
  event: 'axisAreaSelected' // update: 'updateVisual'

};
echarts.registerAction(actionInfo, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'parallelAxis',
    query: payload
  }, function (parallelAxisModel) {
    parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
  });
});
/**
 * @payload
 */

echarts.registerAction('parallelAxisExpand', function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'parallel',
    query: payload
  }, function (parallelModel) {
    parallelModel.setAxisExpand(payload);
  });
});

/***/ }),

/***/ "9390":
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

__webpack_require__("d090");

__webpack_require__("83ba");

__webpack_require__("ee66");

/***/ }),

/***/ "9e87":
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

var helper = __webpack_require__("50e5");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerAction('dataZoom', function (payload, ecModel) {
  var linkedNodesFinder = helper.createLinkedNodesFinder(zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'), helper.eachAxisDim, function (model, dimNames) {
    return model.get(dimNames.axisIndex);
  });
  var effectedModels = [];
  ecModel.eachComponent({
    mainType: 'dataZoom',
    query: payload
  }, function (model, index) {
    effectedModels.push.apply(effectedModels, linkedNodesFinder(model).nodes);
  });
  zrUtil.each(effectedModels, function (dataZoomModel, index) {
    dataZoomModel.setRawRange({
      start: payload.start,
      end: payload.end,
      startValue: payload.startValue,
      endValue: payload.endValue
    });
  });
});

/***/ }),

/***/ "a18f":
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

var DataZoomModel = __webpack_require__("3a56");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = DataZoomModel.extend({
  type: 'dataZoom.inside',

  /**
   * @protected
   */
  defaultOption: {
    disabled: false,
    // Whether disable this inside zoom.
    zoomLock: false,
    // Whether disable zoom but only pan.
    zoomOnMouseWheel: true,
    // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
    moveOnMouseMove: true,
    // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
    moveOnMouseWheel: false,
    // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
    preventDefaultMouseMove: true
  }
});

module.exports = _default;

/***/ }),

/***/ "a890":
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

var polygonContain = __webpack_require__("0655");

var BoundingRect = __webpack_require__("9850");

var _graphic = __webpack_require__("2306");

var linePolygonIntersect = _graphic.linePolygonIntersect;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Key of the first level is brushType: `line`, `rect`, `polygon`.
// Key of the second level is chart element type: `point`, `rect`.
// See moudule:echarts/component/helper/BrushController
// function param:
//      {Object} itemLayout fetch from data.getItemLayout(dataIndex)
//      {Object} selectors {point: selector, rect: selector, ...}
//      {Object} area {range: [[], [], ..], boudingRect}
// function return:
//      {boolean} Whether in the given brush.
var selector = {
  lineX: getLineSelectors(0),
  lineY: getLineSelectors(1),
  rect: {
    point: function (itemLayout, selectors, area) {
      return itemLayout && area.boundingRect.contain(itemLayout[0], itemLayout[1]);
    },
    rect: function (itemLayout, selectors, area) {
      return itemLayout && area.boundingRect.intersect(itemLayout);
    }
  },
  polygon: {
    point: function (itemLayout, selectors, area) {
      return itemLayout && area.boundingRect.contain(itemLayout[0], itemLayout[1]) && polygonContain.contain(area.range, itemLayout[0], itemLayout[1]);
    },
    rect: function (itemLayout, selectors, area) {
      var points = area.range;

      if (!itemLayout || points.length <= 1) {
        return false;
      }

      var x = itemLayout.x;
      var y = itemLayout.y;
      var width = itemLayout.width;
      var height = itemLayout.height;
      var p = points[0];

      if (polygonContain.contain(points, x, y) || polygonContain.contain(points, x + width, y) || polygonContain.contain(points, x, y + height) || polygonContain.contain(points, x + width, y + height) || BoundingRect.create(itemLayout).contain(p[0], p[1]) || linePolygonIntersect(x, y, x + width, y, points) || linePolygonIntersect(x, y, x, y + height, points) || linePolygonIntersect(x + width, y, x + width, y + height, points) || linePolygonIntersect(x, y + height, x + width, y + height, points)) {
        return true;
      }
    }
  }
};

function getLineSelectors(xyIndex) {
  var xy = ['x', 'y'];
  var wh = ['width', 'height'];
  return {
    point: function (itemLayout, selectors, area) {
      if (itemLayout) {
        var range = area.range;
        var p = itemLayout[xyIndex];
        return inLineRange(p, range);
      }
    },
    rect: function (itemLayout, selectors, area) {
      if (itemLayout) {
        var range = area.range;
        var layoutRange = [itemLayout[xy[xyIndex]], itemLayout[xy[xyIndex]] + itemLayout[wh[xyIndex]]];
        layoutRange[1] < layoutRange[0] && layoutRange.reverse();
        return inLineRange(layoutRange[0], range) || inLineRange(layoutRange[1], range) || inLineRange(range[0], layoutRange) || inLineRange(range[1], layoutRange);
      }
    }
  };
}

function inLineRange(p, range) {
  return range[0] <= p && p <= range[1];
}

var _default = selector;
module.exports = _default;

/***/ }),

/***/ "ae75":
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
var DEFAULT_TOOLBOX_BTNS = ['rect', 'polygon', 'keep', 'clear'];

function _default(option, isNew) {
  var brushComponents = option && option.brush;

  if (!zrUtil.isArray(brushComponents)) {
    brushComponents = brushComponents ? [brushComponents] : [];
  }

  if (!brushComponents.length) {
    return;
  }

  var brushComponentSpecifiedBtns = [];
  zrUtil.each(brushComponents, function (brushOpt) {
    var tbs = brushOpt.hasOwnProperty('toolbox') ? brushOpt.toolbox : [];

    if (tbs instanceof Array) {
      brushComponentSpecifiedBtns = brushComponentSpecifiedBtns.concat(tbs);
    }
  });
  var toolbox = option && option.toolbox;

  if (zrUtil.isArray(toolbox)) {
    toolbox = toolbox[0];
  }

  if (!toolbox) {
    toolbox = {
      feature: {}
    };
    option.toolbox = [toolbox];
  }

  var toolboxFeature = toolbox.feature || (toolbox.feature = {});
  var toolboxBrush = toolboxFeature.brush || (toolboxFeature.brush = {});
  var brushTypes = toolboxBrush.type || (toolboxBrush.type = []);
  brushTypes.push.apply(brushTypes, brushComponentSpecifiedBtns);
  removeDuplicate(brushTypes);

  if (isNew && !brushTypes.length) {
    brushTypes.push.apply(brushTypes, DEFAULT_TOOLBOX_BTNS);
  }
}

function removeDuplicate(arr) {
  var map = {};
  zrUtil.each(arr, function (val) {
    map[val] = 1;
  });
  arr.length = 0;
  zrUtil.each(map, function (flag, val) {
    arr.push(val);
  });
}

module.exports = _default;

/***/ }),

/***/ "af24":
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

__webpack_require__("f273");

/***/ }),

/***/ "b006":
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

var AxisBuilder = __webpack_require__("fab2");

var BrushController = __webpack_require__("fc82");

var brushHelper = __webpack_require__("f4a2");

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
var elementList = ['axisLine', 'axisTickLabel', 'axisName'];
var AxisView = echarts.extendComponentView({
  type: 'parallelAxis',

  /**
   * @override
   */
  init: function (ecModel, api) {
    AxisView.superApply(this, 'init', arguments);
    /**
     * @type {module:echarts/component/helper/BrushController}
     */

    (this._brushController = new BrushController(api.getZr())).on('brush', zrUtil.bind(this._onBrush, this));
  },

  /**
   * @override
   */
  render: function (axisModel, ecModel, api, payload) {
    if (fromAxisAreaSelect(axisModel, ecModel, payload)) {
      return;
    }

    this.axisModel = axisModel;
    this.api = api;
    this.group.removeAll();
    var oldAxisGroup = this._axisGroup;
    this._axisGroup = new graphic.Group();
    this.group.add(this._axisGroup);

    if (!axisModel.get('show')) {
      return;
    }

    var coordSysModel = getCoordSysModel(axisModel, ecModel);
    var coordSys = coordSysModel.coordinateSystem;
    var areaSelectStyle = axisModel.getAreaSelectStyle();
    var areaWidth = areaSelectStyle.width;
    var dim = axisModel.axis.dim;
    var axisLayout = coordSys.getAxisLayout(dim);
    var builderOpt = zrUtil.extend({
      strokeContainThreshold: areaWidth
    }, axisLayout);
    var axisBuilder = new AxisBuilder(axisModel, builderOpt);
    zrUtil.each(elementList, axisBuilder.add, axisBuilder);

    this._axisGroup.add(axisBuilder.getGroup());

    this._refreshBrushController(builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api);

    var animationModel = payload && payload.animation === false ? null : axisModel;
    graphic.groupTransition(oldAxisGroup, this._axisGroup, animationModel);
  },
  // /**
  //  * @override
  //  */
  // updateVisual: function (axisModel, ecModel, api, payload) {
  //     this._brushController && this._brushController
  //         .updateCovers(getCoverInfoList(axisModel));
  // },
  _refreshBrushController: function (builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api) {
    // After filtering, axis may change, select area needs to be update.
    var extent = axisModel.axis.getExtent();
    var extentLen = extent[1] - extent[0];
    var extra = Math.min(30, Math.abs(extentLen) * 0.1); // Arbitrary value.
    // width/height might be negative, which will be
    // normalized in BoundingRect.

    var rect = graphic.BoundingRect.create({
      x: extent[0],
      y: -areaWidth / 2,
      width: extentLen,
      height: areaWidth
    });
    rect.x -= extra;
    rect.width += 2 * extra;

    this._brushController.mount({
      enableGlobalPan: true,
      rotation: builderOpt.rotation,
      position: builderOpt.position
    }).setPanels([{
      panelId: 'pl',
      clipPath: brushHelper.makeRectPanelClipPath(rect),
      isTargetByCursor: brushHelper.makeRectIsTargetByCursor(rect, api, coordSysModel),
      getLinearBrushOtherExtent: brushHelper.makeLinearBrushOtherExtent(rect, 0)
    }]).enableBrush({
      brushType: 'lineX',
      brushStyle: areaSelectStyle,
      removeOnClick: true
    }).updateCovers(getCoverInfoList(axisModel));
  },
  _onBrush: function (coverInfoList, opt) {
    // Do not cache these object, because the mey be changed.
    var axisModel = this.axisModel;
    var axis = axisModel.axis;
    var intervals = zrUtil.map(coverInfoList, function (coverInfo) {
      return [axis.coordToData(coverInfo.range[0], true), axis.coordToData(coverInfo.range[1], true)];
    }); // If realtime is true, action is not dispatched on drag end, because
    // the drag end emits the same params with the last drag move event,
    // and may have some delay when using touch pad.

    if (!axisModel.option.realtime === opt.isEnd || opt.removeOnClick) {
      // jshint ignore:line
      this.api.dispatchAction({
        type: 'axisAreaSelect',
        parallelAxisId: axisModel.id,
        intervals: intervals
      });
    }
  },

  /**
   * @override
   */
  dispose: function () {
    this._brushController.dispose();
  }
});

function fromAxisAreaSelect(axisModel, ecModel, payload) {
  return payload && payload.type === 'axisAreaSelect' && ecModel.findComponents({
    mainType: 'parallelAxis',
    query: payload
  })[0] === axisModel;
}

function getCoverInfoList(axisModel) {
  var axis = axisModel.axis;
  return zrUtil.map(axisModel.activeIntervals, function (interval) {
    return {
      brushType: 'lineX',
      panelId: 'pl',
      range: [axis.dataToCoord(interval[0], true), axis.dataToCoord(interval[1], true)]
    };
  });
}

function getCoordSysModel(axisModel, ecModel) {
  return ecModel.getComponent('parallel', axisModel.get('parallelIndex'));
}

var _default = AxisView;
module.exports = _default;

/***/ }),

/***/ "b419":
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

var Model = __webpack_require__("4319");

var AxisView = __webpack_require__("6679");

var AxisBuilder = __webpack_require__("fab2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var elementList = ['axisLine', 'axisLabel', 'axisTick', 'minorTick', 'splitLine', 'minorSplitLine', 'splitArea'];

function getAxisLineShape(polar, rExtent, angle) {
  rExtent[1] > rExtent[0] && (rExtent = rExtent.slice().reverse());
  var start = polar.coordToPoint([rExtent[0], angle]);
  var end = polar.coordToPoint([rExtent[1], angle]);
  return {
    x1: start[0],
    y1: start[1],
    x2: end[0],
    y2: end[1]
  };
}

function getRadiusIdx(polar) {
  var radiusAxis = polar.getRadiusAxis();
  return radiusAxis.inverse ? 0 : 1;
} // Remove the last tick which will overlap the first tick


function fixAngleOverlap(list) {
  var firstItem = list[0];
  var lastItem = list[list.length - 1];

  if (firstItem && lastItem && Math.abs(Math.abs(firstItem.coord - lastItem.coord) - 360) < 1e-4) {
    list.pop();
  }
}

var _default = AxisView.extend({
  type: 'angleAxis',
  axisPointerClass: 'PolarAxisPointer',
  render: function (angleAxisModel, ecModel) {
    this.group.removeAll();

    if (!angleAxisModel.get('show')) {
      return;
    }

    var angleAxis = angleAxisModel.axis;
    var polar = angleAxis.polar;
    var radiusExtent = polar.getRadiusAxis().getExtent();
    var ticksAngles = angleAxis.getTicksCoords();
    var minorTickAngles = angleAxis.getMinorTicksCoords();
    var labels = zrUtil.map(angleAxis.getViewLabels(), function (labelItem) {
      var labelItem = zrUtil.clone(labelItem);
      labelItem.coord = angleAxis.dataToCoord(labelItem.tickValue);
      return labelItem;
    });
    fixAngleOverlap(labels);
    fixAngleOverlap(ticksAngles);
    zrUtil.each(elementList, function (name) {
      if (angleAxisModel.get(name + '.show') && (!angleAxis.scale.isBlank() || name === 'axisLine')) {
        this['_' + name](angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent, labels);
      }
    }, this);
  },

  /**
   * @private
   */
  _axisLine: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent) {
    var lineStyleModel = angleAxisModel.getModel('axisLine.lineStyle'); // extent id of the axis radius (r0 and r)

    var rId = getRadiusIdx(polar);
    var r0Id = rId ? 0 : 1;
    var shape;

    if (radiusExtent[r0Id] === 0) {
      shape = new graphic.Circle({
        shape: {
          cx: polar.cx,
          cy: polar.cy,
          r: radiusExtent[rId]
        },
        style: lineStyleModel.getLineStyle(),
        z2: 1,
        silent: true
      });
    } else {
      shape = new graphic.Ring({
        shape: {
          cx: polar.cx,
          cy: polar.cy,
          r: radiusExtent[rId],
          r0: radiusExtent[r0Id]
        },
        style: lineStyleModel.getLineStyle(),
        z2: 1,
        silent: true
      });
    }

    shape.style.fill = null;
    this.group.add(shape);
  },

  /**
   * @private
   */
  _axisTick: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent) {
    var tickModel = angleAxisModel.getModel('axisTick');
    var tickLen = (tickModel.get('inside') ? -1 : 1) * tickModel.get('length');
    var radius = radiusExtent[getRadiusIdx(polar)];
    var lines = zrUtil.map(ticksAngles, function (tickAngleItem) {
      return new graphic.Line({
        shape: getAxisLineShape(polar, [radius, radius + tickLen], tickAngleItem.coord)
      });
    });
    this.group.add(graphic.mergePath(lines, {
      style: zrUtil.defaults(tickModel.getModel('lineStyle').getLineStyle(), {
        stroke: angleAxisModel.get('axisLine.lineStyle.color')
      })
    }));
  },

  /**
   * @private
   */
  _minorTick: function (angleAxisModel, polar, tickAngles, minorTickAngles, radiusExtent) {
    if (!minorTickAngles.length) {
      return;
    }

    var tickModel = angleAxisModel.getModel('axisTick');
    var minorTickModel = angleAxisModel.getModel('minorTick');
    var tickLen = (tickModel.get('inside') ? -1 : 1) * minorTickModel.get('length');
    var radius = radiusExtent[getRadiusIdx(polar)];
    var lines = [];

    for (var i = 0; i < minorTickAngles.length; i++) {
      for (var k = 0; k < minorTickAngles[i].length; k++) {
        lines.push(new graphic.Line({
          shape: getAxisLineShape(polar, [radius, radius + tickLen], minorTickAngles[i][k].coord)
        }));
      }
    }

    this.group.add(graphic.mergePath(lines, {
      style: zrUtil.defaults(minorTickModel.getModel('lineStyle').getLineStyle(), zrUtil.defaults(tickModel.getLineStyle(), {
        stroke: angleAxisModel.get('axisLine.lineStyle.color')
      }))
    }));
  },

  /**
   * @private
   */
  _axisLabel: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent, labels) {
    var rawCategoryData = angleAxisModel.getCategories(true);
    var commonLabelModel = angleAxisModel.getModel('axisLabel');
    var labelMargin = commonLabelModel.get('margin');
    var triggerEvent = angleAxisModel.get('triggerEvent'); // Use length of ticksAngles because it may remove the last tick to avoid overlapping

    zrUtil.each(labels, function (labelItem, idx) {
      var labelModel = commonLabelModel;
      var tickValue = labelItem.tickValue;
      var r = radiusExtent[getRadiusIdx(polar)];
      var p = polar.coordToPoint([r + labelMargin, labelItem.coord]);
      var cx = polar.cx;
      var cy = polar.cy;
      var labelTextAlign = Math.abs(p[0] - cx) / r < 0.3 ? 'center' : p[0] > cx ? 'left' : 'right';
      var labelTextVerticalAlign = Math.abs(p[1] - cy) / r < 0.3 ? 'middle' : p[1] > cy ? 'top' : 'bottom';

      if (rawCategoryData && rawCategoryData[tickValue] && rawCategoryData[tickValue].textStyle) {
        labelModel = new Model(rawCategoryData[tickValue].textStyle, commonLabelModel, commonLabelModel.ecModel);
      }

      var textEl = new graphic.Text({
        silent: AxisBuilder.isLabelSilent(angleAxisModel)
      });
      this.group.add(textEl);
      graphic.setTextStyle(textEl.style, labelModel, {
        x: p[0],
        y: p[1],
        textFill: labelModel.getTextColor() || angleAxisModel.get('axisLine.lineStyle.color'),
        text: labelItem.formattedLabel,
        textAlign: labelTextAlign,
        textVerticalAlign: labelTextVerticalAlign
      }); // Pack data for mouse event

      if (triggerEvent) {
        textEl.eventData = AxisBuilder.makeAxisEventDataBase(angleAxisModel);
        textEl.eventData.targetType = 'axisLabel';
        textEl.eventData.value = labelItem.rawLabel;
      }
    }, this);
  },

  /**
   * @private
   */
  _splitLine: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent) {
    var splitLineModel = angleAxisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineColors = lineStyleModel.get('color');
    var lineCount = 0;
    lineColors = lineColors instanceof Array ? lineColors : [lineColors];
    var splitLines = [];

    for (var i = 0; i < ticksAngles.length; i++) {
      var colorIndex = lineCount++ % lineColors.length;
      splitLines[colorIndex] = splitLines[colorIndex] || [];
      splitLines[colorIndex].push(new graphic.Line({
        shape: getAxisLineShape(polar, radiusExtent, ticksAngles[i].coord)
      }));
    } // Simple optimization
    // Batching the lines if color are the same


    for (var i = 0; i < splitLines.length; i++) {
      this.group.add(graphic.mergePath(splitLines[i], {
        style: zrUtil.defaults({
          stroke: lineColors[i % lineColors.length]
        }, lineStyleModel.getLineStyle()),
        silent: true,
        z: angleAxisModel.get('z')
      }));
    }
  },

  /**
   * @private
   */
  _minorSplitLine: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent) {
    if (!minorTickAngles.length) {
      return;
    }

    var minorSplitLineModel = angleAxisModel.getModel('minorSplitLine');
    var lineStyleModel = minorSplitLineModel.getModel('lineStyle');
    var lines = [];

    for (var i = 0; i < minorTickAngles.length; i++) {
      for (var k = 0; k < minorTickAngles[i].length; k++) {
        lines.push(new graphic.Line({
          shape: getAxisLineShape(polar, radiusExtent, minorTickAngles[i][k].coord)
        }));
      }
    }

    this.group.add(graphic.mergePath(lines, {
      style: lineStyleModel.getLineStyle(),
      silent: true,
      z: angleAxisModel.get('z')
    }));
  },

  /**
   * @private
   */
  _splitArea: function (angleAxisModel, polar, ticksAngles, minorTickAngles, radiusExtent) {
    if (!ticksAngles.length) {
      return;
    }

    var splitAreaModel = angleAxisModel.getModel('splitArea');
    var areaStyleModel = splitAreaModel.getModel('areaStyle');
    var areaColors = areaStyleModel.get('color');
    var lineCount = 0;
    areaColors = areaColors instanceof Array ? areaColors : [areaColors];
    var splitAreas = [];
    var RADIAN = Math.PI / 180;
    var prevAngle = -ticksAngles[0].coord * RADIAN;
    var r0 = Math.min(radiusExtent[0], radiusExtent[1]);
    var r1 = Math.max(radiusExtent[0], radiusExtent[1]);
    var clockwise = angleAxisModel.get('clockwise');

    for (var i = 1; i < ticksAngles.length; i++) {
      var colorIndex = lineCount++ % areaColors.length;
      splitAreas[colorIndex] = splitAreas[colorIndex] || [];
      splitAreas[colorIndex].push(new graphic.Sector({
        shape: {
          cx: polar.cx,
          cy: polar.cy,
          r0: r0,
          r: r1,
          startAngle: prevAngle,
          endAngle: -ticksAngles[i].coord * RADIAN,
          clockwise: clockwise
        },
        silent: true
      }));
      prevAngle = -ticksAngles[i].coord * RADIAN;
    } // Simple optimization
    // Batching the lines if color are the same


    for (var i = 0; i < splitAreas.length; i++) {
      this.group.add(graphic.mergePath(splitAreas[i], {
        style: zrUtil.defaults({
          fill: areaColors[i % areaColors.length]
        }, areaStyleModel.getAreaStyle()),
        silent: true
      }));
    }
  }
});

module.exports = _default;

/***/ }),

/***/ "b8ec":
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
 * payload: {
 *      brushIndex: number, or,
 *      brushId: string, or,
 *      brushName: string,
 *      globalRanges: Array
 * }
 */
echarts.registerAction({
  type: 'brush',
  event: 'brush'
  /*, update: 'updateView' */

}, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'brush',
    query: payload
  }, function (brushModel) {
    brushModel.setAreas(payload.areas);
  });
});
/**
 * payload: {
 *      brushComponents: [
 *          {
 *              brushId,
 *              brushIndex,
 *              brushName,
 *              series: [
 *                  {
 *                      seriesId,
 *                      seriesIndex,
 *                      seriesName,
 *                      rawIndices: [21, 34, ...]
 *                  },
 *                  ...
 *              ]
 *          },
 *          ...
 *      ]
 * }
 */

echarts.registerAction({
  type: 'brushSelect',
  event: 'brushSelected',
  update: 'none'
}, function () {});
echarts.registerAction({
  type: 'brushEnd',
  event: 'brushEnd',
  update: 'none'
}, function () {});

/***/ }),

/***/ "bcbe":
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

var AxisBuilder = __webpack_require__("fab2");

var graphic = __webpack_require__("2306");

var singleAxisHelper = __webpack_require__("edb9");

var AxisView = __webpack_require__("6679");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'];
var selfBuilderAttr = 'splitLine';
var SingleAxisView = AxisView.extend({
  type: 'singleAxis',
  axisPointerClass: 'SingleAxisPointer',
  render: function (axisModel, ecModel, api, payload) {
    var group = this.group;
    group.removeAll();
    var layout = singleAxisHelper.layout(axisModel);
    var axisBuilder = new AxisBuilder(axisModel, layout);
    zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);
    group.add(axisBuilder.getGroup());

    if (axisModel.get(selfBuilderAttr + '.show')) {
      this['_' + selfBuilderAttr](axisModel);
    }

    SingleAxisView.superCall(this, 'render', axisModel, ecModel, api, payload);
  },
  _splitLine: function (axisModel) {
    var axis = axisModel.axis;

    if (axis.scale.isBlank()) {
      return;
    }

    var splitLineModel = axisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineWidth = lineStyleModel.get('width');
    var lineColors = lineStyleModel.get('color');
    lineColors = lineColors instanceof Array ? lineColors : [lineColors];
    var gridRect = axisModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var splitLines = [];
    var lineCount = 0;
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitLineModel
    });
    var p1 = [];
    var p2 = [];

    for (var i = 0; i < ticksCoords.length; ++i) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);

      if (isHorizontal) {
        p1[0] = tickCoord;
        p1[1] = gridRect.y;
        p2[0] = tickCoord;
        p2[1] = gridRect.y + gridRect.height;
      } else {
        p1[0] = gridRect.x;
        p1[1] = tickCoord;
        p2[0] = gridRect.x + gridRect.width;
        p2[1] = tickCoord;
      }

      var colorIndex = lineCount++ % lineColors.length;
      splitLines[colorIndex] = splitLines[colorIndex] || [];
      splitLines[colorIndex].push(new graphic.Line({
        subPixelOptimize: true,
        shape: {
          x1: p1[0],
          y1: p1[1],
          x2: p2[0],
          y2: p2[1]
        },
        style: {
          lineWidth: lineWidth
        },
        silent: true
      }));
    }

    for (var i = 0; i < splitLines.length; ++i) {
      this.group.add(graphic.mergePath(splitLines[i], {
        style: {
          stroke: lineColors[i % lineColors.length],
          lineDash: lineStyleModel.getLineDash(lineWidth),
          lineWidth: lineWidth
        },
        silent: true
      }));
    }
  }
});
var _default = SingleAxisView;
module.exports = _default;

/***/ }),

/***/ "c2dd":
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

var BrushController = __webpack_require__("fc82");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = echarts.extendComponentView({
  type: 'brush',
  init: function (ecModel, api) {
    /**
     * @readOnly
     * @type {module:echarts/model/Global}
     */
    this.ecModel = ecModel;
    /**
     * @readOnly
     * @type {module:echarts/ExtensionAPI}
     */

    this.api = api;
    /**
     * @readOnly
     * @type {module:echarts/component/brush/BrushModel}
     */

    this.model;
    /**
     * @private
     * @type {module:echarts/component/helper/BrushController}
     */

    (this._brushController = new BrushController(api.getZr())).on('brush', zrUtil.bind(this._onBrush, this)).mount();
  },

  /**
   * @override
   */
  render: function (brushModel) {
    this.model = brushModel;
    return updateController.apply(this, arguments);
  },

  /**
   * @override
   */
  updateTransform: updateController,

  /**
   * @override
   */
  updateView: updateController,
  // /**
  //  * @override
  //  */
  // updateLayout: updateController,
  // /**
  //  * @override
  //  */
  // updateVisual: updateController,

  /**
   * @override
   */
  dispose: function () {
    this._brushController.dispose();
  },

  /**
   * @private
   */
  _onBrush: function (areas, opt) {
    var modelId = this.model.id;
    this.model.brushTargetManager.setOutputRanges(areas, this.ecModel); // Action is not dispatched on drag end, because the drag end
    // emits the same params with the last drag move event, and
    // may have some delay when using touch pad, which makes
    // animation not smooth (when using debounce).

    (!opt.isEnd || opt.removeOnClick) && this.api.dispatchAction({
      type: 'brush',
      brushId: modelId,
      areas: zrUtil.clone(areas),
      $from: modelId
    });
    opt.isEnd && this.api.dispatchAction({
      type: 'brushEnd',
      brushId: modelId,
      areas: zrUtil.clone(areas),
      $from: modelId
    });
  }
});

function updateController(brushModel, ecModel, api, payload) {
  // Do not update controller when drawing.
  (!payload || payload.$from !== brushModel.id) && this._brushController.setPanels(brushModel.brushTargetManager.makePanelOpts(api)).enableBrush(brushModel.brushOption).updateCovers(brushModel.areas.slice());
}

module.exports = _default;

/***/ }),

/***/ "cb8f":
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

var axisPointerModelHelper = __webpack_require__("cd33");

var axisTrigger = __webpack_require__("eb6b");

__webpack_require__("48ac");

__webpack_require__("d4b1");

__webpack_require__("4a9d");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// CartesianAxisPointer is not supposed to be required here. But consider
// echarts.simple.js and online build tooltip, which only require gridSimple,
// CartesianAxisPointer should be able to required somewhere.
echarts.registerPreprocessor(function (option) {
  // Always has a global axisPointerModel for default setting.
  if (option) {
    (!option.axisPointer || option.axisPointer.length === 0) && (option.axisPointer = {});
    var link = option.axisPointer.link; // Normalize to array to avoid object mergin. But if link
    // is not set, remain null/undefined, otherwise it will
    // override existent link setting.

    if (link && !zrUtil.isArray(link)) {
      option.axisPointer.link = [link];
    }
  }
}); // This process should proformed after coordinate systems created
// and series data processed. So put it on statistic processing stage.

echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, function (ecModel, api) {
  // Build axisPointerModel, mergin tooltip.axisPointer model for each axis.
  // allAxesInfo should be updated when setOption performed.
  ecModel.getComponent('axisPointer').coordSysAxesInfo = axisPointerModelHelper.collect(ecModel, api);
}); // Broadcast to all views.

echarts.registerAction({
  type: 'updateAxisPointer',
  event: 'updateAxisPointer',
  update: ':updateAxisPointer'
}, axisTrigger);

/***/ }),

/***/ "cc39":
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

var helper = __webpack_require__("50e5");

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
var each = zrUtil.each;
var asc = numberUtil.asc;
/**
 * Operate single axis.
 * One axis can only operated by one axis operator.
 * Different dataZoomModels may be defined to operate the same axis.
 * (i.e. 'inside' data zoom and 'slider' data zoom components)
 * So dataZoomModels share one axisProxy in that case.
 *
 * @class
 */

var AxisProxy = function (dimName, axisIndex, dataZoomModel, ecModel) {
  /**
   * @private
   * @type {string}
   */
  this._dimName = dimName;
  /**
   * @private
   */

  this._axisIndex = axisIndex;
  /**
   * @private
   * @type {Array.<number>}
   */

  this._valueWindow;
  /**
   * @private
   * @type {Array.<number>}
   */

  this._percentWindow;
  /**
   * @private
   * @type {Array.<number>}
   */

  this._dataExtent;
  /**
   * {minSpan, maxSpan, minValueSpan, maxValueSpan}
   * @private
   * @type {Object}
   */

  this._minMaxSpan;
  /**
   * @readOnly
   * @type {module: echarts/model/Global}
   */

  this.ecModel = ecModel;
  /**
   * @private
   * @type {module: echarts/component/dataZoom/DataZoomModel}
   */

  this._dataZoomModel = dataZoomModel; // /**
  //  * @readOnly
  //  * @private
  //  */
  // this.hasSeriesStacked;
};

AxisProxy.prototype = {
  constructor: AxisProxy,

  /**
   * Whether the axisProxy is hosted by dataZoomModel.
   *
   * @public
   * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
   * @return {boolean}
   */
  hostedBy: function (dataZoomModel) {
    return this._dataZoomModel === dataZoomModel;
  },

  /**
   * @return {Array.<number>} Value can only be NaN or finite value.
   */
  getDataValueWindow: function () {
    return this._valueWindow.slice();
  },

  /**
   * @return {Array.<number>}
   */
  getDataPercentWindow: function () {
    return this._percentWindow.slice();
  },

  /**
   * @public
   * @param {number} axisIndex
   * @return {Array} seriesModels
   */
  getTargetSeriesModels: function () {
    var seriesModels = [];
    var ecModel = this.ecModel;
    ecModel.eachSeries(function (seriesModel) {
      if (helper.isCoordSupported(seriesModel.get('coordinateSystem'))) {
        var dimName = this._dimName;
        var axisModel = ecModel.queryComponents({
          mainType: dimName + 'Axis',
          index: seriesModel.get(dimName + 'AxisIndex'),
          id: seriesModel.get(dimName + 'AxisId')
        })[0];

        if (this._axisIndex === (axisModel && axisModel.componentIndex)) {
          seriesModels.push(seriesModel);
        }
      }
    }, this);
    return seriesModels;
  },
  getAxisModel: function () {
    return this.ecModel.getComponent(this._dimName + 'Axis', this._axisIndex);
  },
  getOtherAxisModel: function () {
    var axisDim = this._dimName;
    var ecModel = this.ecModel;
    var axisModel = this.getAxisModel();
    var isCartesian = axisDim === 'x' || axisDim === 'y';
    var otherAxisDim;
    var coordSysIndexName;

    if (isCartesian) {
      coordSysIndexName = 'gridIndex';
      otherAxisDim = axisDim === 'x' ? 'y' : 'x';
    } else {
      coordSysIndexName = 'polarIndex';
      otherAxisDim = axisDim === 'angle' ? 'radius' : 'angle';
    }

    var foundOtherAxisModel;
    ecModel.eachComponent(otherAxisDim + 'Axis', function (otherAxisModel) {
      if ((otherAxisModel.get(coordSysIndexName) || 0) === (axisModel.get(coordSysIndexName) || 0)) {
        foundOtherAxisModel = otherAxisModel;
      }
    });
    return foundOtherAxisModel;
  },
  getMinMaxSpan: function () {
    return zrUtil.clone(this._minMaxSpan);
  },

  /**
   * Only calculate by given range and this._dataExtent, do not change anything.
   *
   * @param {Object} opt
   * @param {number} [opt.start]
   * @param {number} [opt.end]
   * @param {number} [opt.startValue]
   * @param {number} [opt.endValue]
   */
  calculateDataWindow: function (opt) {
    var dataExtent = this._dataExtent;
    var axisModel = this.getAxisModel();
    var scale = axisModel.axis.scale;

    var rangePropMode = this._dataZoomModel.getRangePropMode();

    var percentExtent = [0, 100];
    var percentWindow = [];
    var valueWindow = [];
    var hasPropModeValue;
    each(['start', 'end'], function (prop, idx) {
      var boundPercent = opt[prop];
      var boundValue = opt[prop + 'Value']; // Notice: dataZoom is based either on `percentProp` ('start', 'end') or
      // on `valueProp` ('startValue', 'endValue'). (They are based on the data extent
      // but not min/max of axis, which will be calculated by data window then).
      // The former one is suitable for cases that a dataZoom component controls multiple
      // axes with different unit or extent, and the latter one is suitable for accurate
      // zoom by pixel (e.g., in dataZoomSelect).
      // we use `getRangePropMode()` to mark which prop is used. `rangePropMode` is updated
      // only when setOption or dispatchAction, otherwise it remains its original value.
      // (Why not only record `percentProp` and always map to `valueProp`? Because
      // the map `valueProp` -> `percentProp` -> `valueProp` probably not the original
      // `valueProp`. consider two axes constrolled by one dataZoom. They have different
      // data extent. All of values that are overflow the `dataExtent` will be calculated
      // to percent '100%').

      if (rangePropMode[idx] === 'percent') {
        boundPercent == null && (boundPercent = percentExtent[idx]); // Use scale.parse to math round for category or time axis.

        boundValue = scale.parse(numberUtil.linearMap(boundPercent, percentExtent, dataExtent));
      } else {
        hasPropModeValue = true;
        boundValue = boundValue == null ? dataExtent[idx] : scale.parse(boundValue); // Calculating `percent` from `value` may be not accurate, because
        // This calculation can not be inversed, because all of values that
        // are overflow the `dataExtent` will be calculated to percent '100%'

        boundPercent = numberUtil.linearMap(boundValue, dataExtent, percentExtent);
      } // valueWindow[idx] = round(boundValue);
      // percentWindow[idx] = round(boundPercent);


      valueWindow[idx] = boundValue;
      percentWindow[idx] = boundPercent;
    });
    asc(valueWindow);
    asc(percentWindow); // The windows from user calling of `dispatchAction` might be out of the extent,
    // or do not obey the `min/maxSpan`, `min/maxValueSpan`. But we dont restrict window
    // by `zoomLock` here, because we see `zoomLock` just as a interaction constraint,
    // where API is able to initialize/modify the window size even though `zoomLock`
    // specified.

    var spans = this._minMaxSpan;
    hasPropModeValue ? restrictSet(valueWindow, percentWindow, dataExtent, percentExtent, false) : restrictSet(percentWindow, valueWindow, percentExtent, dataExtent, true);

    function restrictSet(fromWindow, toWindow, fromExtent, toExtent, toValue) {
      var suffix = toValue ? 'Span' : 'ValueSpan';
      sliderMove(0, fromWindow, fromExtent, 'all', spans['min' + suffix], spans['max' + suffix]);

      for (var i = 0; i < 2; i++) {
        toWindow[i] = numberUtil.linearMap(fromWindow[i], fromExtent, toExtent, true);
        toValue && (toWindow[i] = scale.parse(toWindow[i]));
      }
    }

    return {
      valueWindow: valueWindow,
      percentWindow: percentWindow
    };
  },

  /**
   * Notice: reset should not be called before series.restoreData() called,
   * so it is recommanded to be called in "process stage" but not "model init
   * stage".
   *
   * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
   */
  reset: function (dataZoomModel) {
    if (dataZoomModel !== this._dataZoomModel) {
      return;
    }

    var targetSeries = this.getTargetSeriesModels(); // Culculate data window and data extent, and record them.

    this._dataExtent = calculateDataExtent(this, this._dimName, targetSeries); // this.hasSeriesStacked = false;
    // each(targetSeries, function (series) {
    // var data = series.getData();
    // var dataDim = data.mapDimension(this._dimName);
    // var stackedDimension = data.getCalculationInfo('stackedDimension');
    // if (stackedDimension && stackedDimension === dataDim) {
    // this.hasSeriesStacked = true;
    // }
    // }, this);
    // `calculateDataWindow` uses min/maxSpan.

    setMinMaxSpan(this);
    var dataWindow = this.calculateDataWindow(dataZoomModel.settledOption);
    this._valueWindow = dataWindow.valueWindow;
    this._percentWindow = dataWindow.percentWindow; // Update axis setting then.

    setAxisModel(this);
  },

  /**
   * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
   */
  restore: function (dataZoomModel) {
    if (dataZoomModel !== this._dataZoomModel) {
      return;
    }

    this._valueWindow = this._percentWindow = null;
    setAxisModel(this, true);
  },

  /**
   * @param {module: echarts/component/dataZoom/DataZoomModel} dataZoomModel
   */
  filterData: function (dataZoomModel, api) {
    if (dataZoomModel !== this._dataZoomModel) {
      return;
    }

    var axisDim = this._dimName;
    var seriesModels = this.getTargetSeriesModels();
    var filterMode = dataZoomModel.get('filterMode');
    var valueWindow = this._valueWindow;

    if (filterMode === 'none') {
      return;
    } // FIXME
    // Toolbox may has dataZoom injected. And if there are stacked bar chart
    // with NaN data, NaN will be filtered and stack will be wrong.
    // So we need to force the mode to be set empty.
    // In fect, it is not a big deal that do not support filterMode-'filter'
    // when using toolbox#dataZoom, utill tooltip#dataZoom support "single axis
    // selection" some day, which might need "adapt to data extent on the
    // otherAxis", which is disabled by filterMode-'empty'.
    // But currently, stack has been fixed to based on value but not index,
    // so this is not an issue any more.
    // var otherAxisModel = this.getOtherAxisModel();
    // if (dataZoomModel.get('$fromToolbox')
    //     && otherAxisModel
    //     && otherAxisModel.hasSeriesStacked
    // ) {
    //     filterMode = 'empty';
    // }
    // TODO
    // filterMode 'weakFilter' and 'empty' is not optimized for huge data yet.


    each(seriesModels, function (seriesModel) {
      var seriesData = seriesModel.getData();
      var dataDims = seriesData.mapDimension(axisDim, true);

      if (!dataDims.length) {
        return;
      }

      if (filterMode === 'weakFilter') {
        seriesData.filterSelf(function (dataIndex) {
          var leftOut;
          var rightOut;
          var hasValue;

          for (var i = 0; i < dataDims.length; i++) {
            var value = seriesData.get(dataDims[i], dataIndex);
            var thisHasValue = !isNaN(value);
            var thisLeftOut = value < valueWindow[0];
            var thisRightOut = value > valueWindow[1];

            if (thisHasValue && !thisLeftOut && !thisRightOut) {
              return true;
            }

            thisHasValue && (hasValue = true);
            thisLeftOut && (leftOut = true);
            thisRightOut && (rightOut = true);
          } // If both left out and right out, do not filter.


          return hasValue && leftOut && rightOut;
        });
      } else {
        each(dataDims, function (dim) {
          if (filterMode === 'empty') {
            seriesModel.setData(seriesData = seriesData.map(dim, function (value) {
              return !isInWindow(value) ? NaN : value;
            }));
          } else {
            var range = {};
            range[dim] = valueWindow; // console.time('select');

            seriesData.selectRange(range); // console.timeEnd('select');
          }
        });
      }

      each(dataDims, function (dim) {
        seriesData.setApproximateExtent(valueWindow, dim);
      });
    });

    function isInWindow(value) {
      return value >= valueWindow[0] && value <= valueWindow[1];
    }
  }
};

function calculateDataExtent(axisProxy, axisDim, seriesModels) {
  var dataExtent = [Infinity, -Infinity];
  each(seriesModels, function (seriesModel) {
    var seriesData = seriesModel.getData();

    if (seriesData) {
      each(seriesData.mapDimension(axisDim, true), function (dim) {
        var seriesExtent = seriesData.getApproximateExtent(dim);
        seriesExtent[0] < dataExtent[0] && (dataExtent[0] = seriesExtent[0]);
        seriesExtent[1] > dataExtent[1] && (dataExtent[1] = seriesExtent[1]);
      });
    }
  });

  if (dataExtent[1] < dataExtent[0]) {
    dataExtent = [NaN, NaN];
  } // It is important to get "consistent" extent when more then one axes is
  // controlled by a `dataZoom`, otherwise those axes will not be synchronized
  // when zooming. But it is difficult to know what is "consistent", considering
  // axes have different type or even different meanings (For example, two
  // time axes are used to compare data of the same date in different years).
  // So basically dataZoom just obtains extent by series.data (in category axis
  // extent can be obtained from axis.data).
  // Nevertheless, user can set min/max/scale on axes to make extent of axes
  // consistent.


  fixExtentByAxis(axisProxy, dataExtent);
  return dataExtent;
}

function fixExtentByAxis(axisProxy, dataExtent) {
  var axisModel = axisProxy.getAxisModel();
  var min = axisModel.getMin(true); // For category axis, if min/max/scale are not set, extent is determined
  // by axis.data by default.

  var isCategoryAxis = axisModel.get('type') === 'category';
  var axisDataLen = isCategoryAxis && axisModel.getCategories().length;

  if (min != null && min !== 'dataMin' && typeof min !== 'function') {
    dataExtent[0] = min;
  } else if (isCategoryAxis) {
    dataExtent[0] = axisDataLen > 0 ? 0 : NaN;
  }

  var max = axisModel.getMax(true);

  if (max != null && max !== 'dataMax' && typeof max !== 'function') {
    dataExtent[1] = max;
  } else if (isCategoryAxis) {
    dataExtent[1] = axisDataLen > 0 ? axisDataLen - 1 : NaN;
  }

  if (!axisModel.get('scale', true)) {
    dataExtent[0] > 0 && (dataExtent[0] = 0);
    dataExtent[1] < 0 && (dataExtent[1] = 0);
  } // For value axis, if min/max/scale are not set, we just use the extent obtained
  // by series data, which may be a little different from the extent calculated by
  // `axisHelper.getScaleExtent`. But the different just affects the experience a
  // little when zooming. So it will not be fixed until some users require it strongly.


  return dataExtent;
}

function setAxisModel(axisProxy, isRestore) {
  var axisModel = axisProxy.getAxisModel();
  var percentWindow = axisProxy._percentWindow;
  var valueWindow = axisProxy._valueWindow;

  if (!percentWindow) {
    return;
  } // [0, 500]: arbitrary value, guess axis extent.


  var precision = numberUtil.getPixelPrecision(valueWindow, [0, 500]);
  precision = Math.min(precision, 20); // isRestore or isFull

  var useOrigin = isRestore || percentWindow[0] === 0 && percentWindow[1] === 100;
  axisModel.setRange(useOrigin ? null : +valueWindow[0].toFixed(precision), useOrigin ? null : +valueWindow[1].toFixed(precision));
}

function setMinMaxSpan(axisProxy) {
  var minMaxSpan = axisProxy._minMaxSpan = {};
  var dataZoomModel = axisProxy._dataZoomModel;
  var dataExtent = axisProxy._dataExtent;
  each(['min', 'max'], function (minMax) {
    var percentSpan = dataZoomModel.get(minMax + 'Span');
    var valueSpan = dataZoomModel.get(minMax + 'ValueSpan');
    valueSpan != null && (valueSpan = axisProxy.getAxisModel().axis.scale.parse(valueSpan)); // minValueSpan and maxValueSpan has higher priority than minSpan and maxSpan

    if (valueSpan != null) {
      percentSpan = numberUtil.linearMap(dataExtent[0] + valueSpan, dataExtent, [0, 100], true);
    } else if (percentSpan != null) {
      valueSpan = numberUtil.linearMap(percentSpan, [0, 100], dataExtent, true) - dataExtent[0];
    }

    minMaxSpan[minMax + 'Span'] = percentSpan;
    minMaxSpan[minMax + 'ValueSpan'] = valueSpan;
  });
}

var _default = AxisProxy;
module.exports = _default;

/***/ }),

/***/ "cd12":
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

__webpack_require__("01ed");

__webpack_require__("4a9d");

__webpack_require__("cb8f");

/***/ }),

/***/ "cd33":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var curry = zrUtil.curry; // Build axisPointerModel, mergin tooltip.axisPointer model for each axis.
// allAxesInfo should be updated when setOption performed.

function collect(ecModel, api) {
  var result = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: false,

    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  collectAxesInfo(result, ecModel, api); // Check seriesInvolved for performance, in case too many series in some chart.

  result.seriesInvolved && collectSeriesInfo(result, ecModel);
  return result;
}

function collectAxesInfo(result, ecModel, api) {
  var globalTooltipModel = ecModel.getComponent('tooltip');
  var globalAxisPointerModel = ecModel.getComponent('axisPointer'); // links can only be set on global.

  var linksOption = globalAxisPointerModel.get('link', true) || [];
  var linkGroups = []; // Collect axes info.

  each(api.getCoordinateSystems(), function (coordSys) {
    // Some coordinate system do not support axes, like geo.
    if (!coordSys.axisPointerEnabled) {
      return;
    }

    var coordSysKey = makeKey(coordSys.model);
    var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
    result.coordSysMap[coordSysKey] = coordSys; // Set tooltip (like 'cross') is a convienent way to show axisPointer
    // for user. So we enable seting tooltip on coordSys model.

    var coordSysModel = coordSys.model;
    var baseTooltipModel = coordSysModel.getModel('tooltip', globalTooltipModel);
    each(coordSys.getAxes(), curry(saveTooltipAxisInfo, false, null)); // If axis tooltip used, choose tooltip axis for each coordSys.
    // Notice this case: coordSys is `grid` but not `cartesian2D` here.

    if (coordSys.getTooltipAxes && globalTooltipModel // If tooltip.showContent is set as false, tooltip will not
    // show but axisPointer will show as normal.
    && baseTooltipModel.get('show')) {
      // Compatible with previous logic. But series.tooltip.trigger: 'axis'
      // or series.data[n].tooltip.trigger: 'axis' are not support any more.
      var triggerAxis = baseTooltipModel.get('trigger') === 'axis';
      var cross = baseTooltipModel.get('axisPointer.type') === 'cross';
      var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get('axisPointer.axis'));

      if (triggerAxis || cross) {
        each(tooltipAxes.baseAxes, curry(saveTooltipAxisInfo, cross ? 'cross' : true, triggerAxis));
      }

      if (cross) {
        each(tooltipAxes.otherAxes, curry(saveTooltipAxisInfo, 'cross', false));
      }
    } // fromTooltip: true | false | 'cross'
    // triggerTooltip: true | false | null


    function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
      var axisPointerModel = axis.model.getModel('axisPointer', globalAxisPointerModel);
      var axisPointerShow = axisPointerModel.get('show');

      if (!axisPointerShow || axisPointerShow === 'auto' && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
        return;
      }

      if (triggerTooltip == null) {
        triggerTooltip = axisPointerModel.get('triggerTooltip');
      }

      axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
      var snap = axisPointerModel.get('snap');
      var key = makeKey(axis.model);
      var involveSeries = triggerTooltip || snap || axis.type === 'category'; // If result.axesInfo[key] exist, override it (tooltip has higher priority).

      var axisInfo = result.axesInfo[key] = {
        key: key,
        axis: axis,
        coordSys: coordSys,
        axisPointerModel: axisPointerModel,
        triggerTooltip: triggerTooltip,
        involveSeries: involveSeries,
        snap: snap,
        useHandle: isHandleTrigger(axisPointerModel),
        seriesModels: []
      };
      axesInfoInCoordSys[key] = axisInfo;
      result.seriesInvolved |= involveSeries;
      var groupIndex = getLinkGroupIndex(linksOption, axis);

      if (groupIndex != null) {
        var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
          axesInfo: {}
        });
        linkGroup.axesInfo[key] = axisInfo;
        linkGroup.mapper = linksOption[groupIndex].mapper;
        axisInfo.linkGroup = linkGroup;
      }
    }
  });
}

function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
  var tooltipAxisPointerModel = baseTooltipModel.getModel('axisPointer');
  var volatileOption = {};
  each(['type', 'snap', 'lineStyle', 'shadowStyle', 'label', 'animation', 'animationDurationUpdate', 'animationEasingUpdate', 'z'], function (field) {
    volatileOption[field] = zrUtil.clone(tooltipAxisPointerModel.get(field));
  }); // category axis do not auto snap, otherwise some tick that do not
  // has value can not be hovered. value/time/log axis default snap if
  // triggered from tooltip and trigger tooltip.

  volatileOption.snap = axis.type !== 'category' && !!triggerTooltip; // Compatibel with previous behavior, tooltip axis do not show label by default.
  // Only these properties can be overrided from tooltip to axisPointer.

  if (tooltipAxisPointerModel.get('type') === 'cross') {
    volatileOption.type = 'line';
  }

  var labelOption = volatileOption.label || (volatileOption.label = {}); // Follow the convention, do not show label when triggered by tooltip by default.

  labelOption.show == null && (labelOption.show = false);

  if (fromTooltip === 'cross') {
    // When 'cross', both axes show labels.
    var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get('label.show');
    labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true; // If triggerTooltip, this is a base axis, which should better not use cross style
    // (cross style is dashed by default)

    if (!triggerTooltip) {
      var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get('crossStyle');
      crossStyle && zrUtil.defaults(labelOption, crossStyle.textStyle);
    }
  }

  return axis.model.getModel('axisPointer', new Model(volatileOption, globalAxisPointerModel, ecModel));
}

function collectSeriesInfo(result, ecModel) {
  // Prepare data for axis trigger
  ecModel.eachSeries(function (seriesModel) {
    // Notice this case: this coordSys is `cartesian2D` but not `grid`.
    var coordSys = seriesModel.coordinateSystem;
    var seriesTooltipTrigger = seriesModel.get('tooltip.trigger', true);
    var seriesTooltipShow = seriesModel.get('tooltip.show', true);

    if (!coordSys || seriesTooltipTrigger === 'none' || seriesTooltipTrigger === false || seriesTooltipTrigger === 'item' || seriesTooltipShow === false || seriesModel.get('axisPointer.show', true) === false) {
      return;
    }

    each(result.coordSysAxesInfo[makeKey(coordSys.model)], function (axisInfo) {
      var axis = axisInfo.axis;

      if (coordSys.getAxis(axis.dim) === axis) {
        axisInfo.seriesModels.push(seriesModel);
        axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
        axisInfo.seriesDataCount += seriesModel.getData().count();
      }
    });
  }, this);
}
/**
 * For example:
 * {
 *     axisPointer: {
 *         links: [{
 *             xAxisIndex: [2, 4],
 *             yAxisIndex: 'all'
 *         }, {
 *             xAxisId: ['a5', 'a7'],
 *             xAxisName: 'xxx'
 *         }]
 *     }
 * }
 */


function getLinkGroupIndex(linksOption, axis) {
  var axisModel = axis.model;
  var dim = axis.dim;

  for (var i = 0; i < linksOption.length; i++) {
    var linkOption = linksOption[i] || {};

    if (checkPropInLink(linkOption[dim + 'AxisId'], axisModel.id) || checkPropInLink(linkOption[dim + 'AxisIndex'], axisModel.componentIndex) || checkPropInLink(linkOption[dim + 'AxisName'], axisModel.name)) {
      return i;
    }
  }
}

function checkPropInLink(linkPropValue, axisPropValue) {
  return linkPropValue === 'all' || zrUtil.isArray(linkPropValue) && zrUtil.indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
}

function fixValue(axisModel) {
  var axisInfo = getAxisInfo(axisModel);

  if (!axisInfo) {
    return;
  }

  var axisPointerModel = axisInfo.axisPointerModel;
  var scale = axisInfo.axis.scale;
  var option = axisPointerModel.option;
  var status = axisPointerModel.get('status');
  var value = axisPointerModel.get('value'); // Parse init value for category and time axis.

  if (value != null) {
    value = scale.parse(value);
  }

  var useHandle = isHandleTrigger(axisPointerModel); // If `handle` used, `axisPointer` will always be displayed, so value
  // and status should be initialized.

  if (status == null) {
    option.status = useHandle ? 'show' : 'hide';
  }

  var extent = scale.getExtent().slice();
  extent[0] > extent[1] && extent.reverse();

  if ( // Pick a value on axis when initializing.
  value == null // If both `handle` and `dataZoom` are used, value may be out of axis extent,
  // where we should re-pick a value to keep `handle` displaying normally.
  || value > extent[1]) {
    // Make handle displayed on the end of the axis when init, which looks better.
    value = extent[1];
  }

  if (value < extent[0]) {
    value = extent[0];
  }

  option.value = value;

  if (useHandle) {
    option.status = axisInfo.axis.scale.isBlank() ? 'hide' : 'show';
  }
}

function getAxisInfo(axisModel) {
  var coordSysAxesInfo = (axisModel.ecModel.getComponent('axisPointer') || {}).coordSysAxesInfo;
  return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
}

function getAxisPointerModel(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  return axisInfo && axisInfo.axisPointerModel;
}

function isHandleTrigger(axisPointerModel) {
  return !!axisPointerModel.get('handle.show');
}
/**
 * @param {module:echarts/model/Model} model
 * @return {string} unique key
 */


function makeKey(model) {
  return model.type + '||' + model.id;
}

exports.collect = collect;
exports.fixValue = fixValue;
exports.getAxisInfo = getAxisInfo;
exports.getAxisPointerModel = getAxisPointerModel;
exports.makeKey = makeKey;

/***/ }),

/***/ "d070":
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

__webpack_require__("1f1a");

__webpack_require__("eeea");

__webpack_require__("7661");

__webpack_require__("49e8");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function makeAction(method, actionInfo) {
  actionInfo.update = 'updateView';
  echarts.registerAction(actionInfo, function (payload, ecModel) {
    var selected = {};
    ecModel.eachComponent({
      mainType: 'geo',
      query: payload
    }, function (geoModel) {
      geoModel[method](payload.name);
      var geo = geoModel.coordinateSystem;
      zrUtil.each(geo.regions, function (region) {
        selected[region.name] = geoModel.isSelected(region.name) || false;
      });
    });
    return {
      selected: selected,
      name: payload.name
    };
  });
}

makeAction('toggleSelected', {
  type: 'geoToggleSelect',
  event: 'geoselectchanged'
});
makeAction('select', {
  type: 'geoSelect',
  event: 'geoselected'
});
makeAction('unSelect', {
  type: 'geoUnSelect',
  event: 'geounselected'
});

/***/ }),

/***/ "d4b1":
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

var globalListener = __webpack_require__("17d6");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var AxisPointerView = echarts.extendComponentView({
  type: 'axisPointer',
  render: function (globalAxisPointerModel, ecModel, api) {
    var globalTooltipModel = ecModel.getComponent('tooltip');
    var triggerOn = globalAxisPointerModel.get('triggerOn') || globalTooltipModel && globalTooltipModel.get('triggerOn') || 'mousemove|click'; // Register global listener in AxisPointerView to enable
    // AxisPointerView to be independent to Tooltip.

    globalListener.register('axisPointer', api, function (currTrigger, e, dispatchAction) {
      // If 'none', it is not controlled by mouse totally.
      if (triggerOn !== 'none' && (currTrigger === 'leave' || triggerOn.indexOf(currTrigger) >= 0)) {
        dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: currTrigger,
          x: e && e.offsetX,
          y: e && e.offsetY
        });
      }
    });
  },

  /**
   * @override
   */
  remove: function (ecModel, api) {
    globalListener.unregister(api.getZr(), 'axisPointer');
    AxisPointerView.superApply(this._model, 'remove', arguments);
  },

  /**
   * @override
   */
  dispose: function (ecModel, api) {
    globalListener.unregister('axisPointer', api);
    AxisPointerView.superApply(this._model, 'dispose', arguments);
  }
});
var _default = AxisPointerView;
module.exports = _default;

/***/ }),

/***/ "dcb3":
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

var clazzUtil = __webpack_require__("625e");

var graphic = __webpack_require__("2306");

var axisPointerModelHelper = __webpack_require__("cd33");

var eventTool = __webpack_require__("607d");

var throttleUtil = __webpack_require__("88b3");

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
var clone = zrUtil.clone;
var bind = zrUtil.bind;
/**
 * Base axis pointer class in 2D.
 * Implemenents {module:echarts/component/axis/IAxisPointer}.
 */

function BaseAxisPointer() {}

BaseAxisPointer.prototype = {
  /**
   * @private
   */
  _group: null,

  /**
   * @private
   */
  _lastGraphicKey: null,

  /**
   * @private
   */
  _handle: null,

  /**
   * @private
   */
  _dragging: false,

  /**
   * @private
   */
  _lastValue: null,

  /**
   * @private
   */
  _lastStatus: null,

  /**
   * @private
   */
  _payloadInfo: null,

  /**
   * In px, arbitrary value. Do not set too small,
   * no animation is ok for most cases.
   * @protected
   */
  animationThreshold: 15,

  /**
   * @implement
   */
  render: function (axisModel, axisPointerModel, api, forceRender) {
    var value = axisPointerModel.get('value');
    var status = axisPointerModel.get('status'); // Bind them to `this`, not in closure, otherwise they will not
    // be replaced when user calling setOption in not merge mode.

    this._axisModel = axisModel;
    this._axisPointerModel = axisPointerModel;
    this._api = api; // Optimize: `render` will be called repeatly during mouse move.
    // So it is power consuming if performing `render` each time,
    // especially on mobile device.

    if (!forceRender && this._lastValue === value && this._lastStatus === status) {
      return;
    }

    this._lastValue = value;
    this._lastStatus = status;
    var group = this._group;
    var handle = this._handle;

    if (!status || status === 'hide') {
      // Do not clear here, for animation better.
      group && group.hide();
      handle && handle.hide();
      return;
    }

    group && group.show();
    handle && handle.show(); // Otherwise status is 'show'

    var elOption = {};
    this.makeElOption(elOption, value, axisModel, axisPointerModel, api); // Enable change axis pointer type.

    var graphicKey = elOption.graphicKey;

    if (graphicKey !== this._lastGraphicKey) {
      this.clear(api);
    }

    this._lastGraphicKey = graphicKey;
    var moveAnimation = this._moveAnimation = this.determineAnimation(axisModel, axisPointerModel);

    if (!group) {
      group = this._group = new graphic.Group();
      this.createPointerEl(group, elOption, axisModel, axisPointerModel);
      this.createLabelEl(group, elOption, axisModel, axisPointerModel);
      api.getZr().add(group);
    } else {
      var doUpdateProps = zrUtil.curry(updateProps, axisPointerModel, moveAnimation);
      this.updatePointerEl(group, elOption, doUpdateProps, axisPointerModel);
      this.updateLabelEl(group, elOption, doUpdateProps, axisPointerModel);
    }

    updateMandatoryProps(group, axisPointerModel, true);

    this._renderHandle(value);
  },

  /**
   * @implement
   */
  remove: function (api) {
    this.clear(api);
  },

  /**
   * @implement
   */
  dispose: function (api) {
    this.clear(api);
  },

  /**
   * @protected
   */
  determineAnimation: function (axisModel, axisPointerModel) {
    var animation = axisPointerModel.get('animation');
    var axis = axisModel.axis;
    var isCategoryAxis = axis.type === 'category';
    var useSnap = axisPointerModel.get('snap'); // Value axis without snap always do not snap.

    if (!useSnap && !isCategoryAxis) {
      return false;
    }

    if (animation === 'auto' || animation == null) {
      var animationThreshold = this.animationThreshold;

      if (isCategoryAxis && axis.getBandWidth() > animationThreshold) {
        return true;
      } // It is important to auto animation when snap used. Consider if there is
      // a dataZoom, animation will be disabled when too many points exist, while
      // it will be enabled for better visual effect when little points exist.


      if (useSnap) {
        var seriesDataCount = axisPointerModelHelper.getAxisInfo(axisModel).seriesDataCount;
        var axisExtent = axis.getExtent(); // Approximate band width

        return Math.abs(axisExtent[0] - axisExtent[1]) / seriesDataCount > animationThreshold;
      }

      return false;
    }

    return animation === true;
  },

  /**
   * add {pointer, label, graphicKey} to elOption
   * @protected
   */
  makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {// Shoule be implemenented by sub-class.
  },

  /**
   * @protected
   */
  createPointerEl: function (group, elOption, axisModel, axisPointerModel) {
    var pointerOption = elOption.pointer;

    if (pointerOption) {
      var pointerEl = inner(group).pointerEl = new graphic[pointerOption.type](clone(elOption.pointer));
      group.add(pointerEl);
    }
  },

  /**
   * @protected
   */
  createLabelEl: function (group, elOption, axisModel, axisPointerModel) {
    if (elOption.label) {
      var labelEl = inner(group).labelEl = new graphic.Rect(clone(elOption.label));
      group.add(labelEl);
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  },

  /**
   * @protected
   */
  updatePointerEl: function (group, elOption, updateProps) {
    var pointerEl = inner(group).pointerEl;

    if (pointerEl && elOption.pointer) {
      pointerEl.setStyle(elOption.pointer.style);
      updateProps(pointerEl, {
        shape: elOption.pointer.shape
      });
    }
  },

  /**
   * @protected
   */
  updateLabelEl: function (group, elOption, updateProps, axisPointerModel) {
    var labelEl = inner(group).labelEl;

    if (labelEl) {
      labelEl.setStyle(elOption.label.style);
      updateProps(labelEl, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        shape: elOption.label.shape,
        position: elOption.label.position
      });
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  },

  /**
   * @private
   */
  _renderHandle: function (value) {
    if (this._dragging || !this.updateHandleTransform) {
      return;
    }

    var axisPointerModel = this._axisPointerModel;

    var zr = this._api.getZr();

    var handle = this._handle;
    var handleModel = axisPointerModel.getModel('handle');
    var status = axisPointerModel.get('status');

    if (!handleModel.get('show') || !status || status === 'hide') {
      handle && zr.remove(handle);
      this._handle = null;
      return;
    }

    var isInit;

    if (!this._handle) {
      isInit = true;
      handle = this._handle = graphic.createIcon(handleModel.get('icon'), {
        cursor: 'move',
        draggable: true,
        onmousemove: function (e) {
          // Fot mobile devicem, prevent screen slider on the button.
          eventTool.stop(e.event);
        },
        onmousedown: bind(this._onHandleDragMove, this, 0, 0),
        drift: bind(this._onHandleDragMove, this),
        ondragend: bind(this._onHandleDragEnd, this)
      });
      zr.add(handle);
    }

    updateMandatoryProps(handle, axisPointerModel, false); // update style

    var includeStyles = ['color', 'borderColor', 'borderWidth', 'opacity', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY'];
    handle.setStyle(handleModel.getItemStyle(null, includeStyles)); // update position

    var handleSize = handleModel.get('size');

    if (!zrUtil.isArray(handleSize)) {
      handleSize = [handleSize, handleSize];
    }

    handle.attr('scale', [handleSize[0] / 2, handleSize[1] / 2]);
    throttleUtil.createOrUpdate(this, '_doDispatchAxisPointer', handleModel.get('throttle') || 0, 'fixRate');

    this._moveHandleToValue(value, isInit);
  },

  /**
   * @private
   */
  _moveHandleToValue: function (value, isInit) {
    updateProps(this._axisPointerModel, !isInit && this._moveAnimation, this._handle, getHandleTransProps(this.getHandleTransform(value, this._axisModel, this._axisPointerModel)));
  },

  /**
   * @private
   */
  _onHandleDragMove: function (dx, dy) {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    this._dragging = true; // Persistent for throttle.

    var trans = this.updateHandleTransform(getHandleTransProps(handle), [dx, dy], this._axisModel, this._axisPointerModel);
    this._payloadInfo = trans;
    handle.stopAnimation();
    handle.attr(getHandleTransProps(trans));
    inner(handle).lastProp = null;

    this._doDispatchAxisPointer();
  },

  /**
   * Throttled method.
   * @private
   */
  _doDispatchAxisPointer: function () {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var payloadInfo = this._payloadInfo;
    var axisModel = this._axisModel;

    this._api.dispatchAction({
      type: 'updateAxisPointer',
      x: payloadInfo.cursorPoint[0],
      y: payloadInfo.cursorPoint[1],
      tooltipOption: payloadInfo.tooltipOption,
      axesInfo: [{
        axisDim: axisModel.axis.dim,
        axisIndex: axisModel.componentIndex
      }]
    });
  },

  /**
   * @private
   */
  _onHandleDragEnd: function (moveAnimation) {
    this._dragging = false;
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var value = this._axisPointerModel.get('value'); // Consider snap or categroy axis, handle may be not consistent with
    // axisPointer. So move handle to align the exact value position when
    // drag ended.


    this._moveHandleToValue(value); // For the effect: tooltip will be shown when finger holding on handle
    // button, and will be hidden after finger left handle button.


    this._api.dispatchAction({
      type: 'hideTip'
    });
  },

  /**
   * Should be implemenented by sub-class if support `handle`.
   * @protected
   * @param {number} value
   * @param {module:echarts/model/Model} axisModel
   * @param {module:echarts/model/Model} axisPointerModel
   * @return {Object} {position: [x, y], rotation: 0}
   */
  getHandleTransform: null,

  /**
   * * Should be implemenented by sub-class if support `handle`.
   * @protected
   * @param {Object} transform {position, rotation}
   * @param {Array.<number>} delta [dx, dy]
   * @param {module:echarts/model/Model} axisModel
   * @param {module:echarts/model/Model} axisPointerModel
   * @return {Object} {position: [x, y], rotation: 0, cursorPoint: [x, y]}
   */
  updateHandleTransform: null,

  /**
   * @private
   */
  clear: function (api) {
    this._lastValue = null;
    this._lastStatus = null;
    var zr = api.getZr();
    var group = this._group;
    var handle = this._handle;

    if (zr && group) {
      this._lastGraphicKey = null;
      group && zr.remove(group);
      handle && zr.remove(handle);
      this._group = null;
      this._handle = null;
      this._payloadInfo = null;
    }
  },

  /**
   * @protected
   */
  doClear: function () {// Implemented by sub-class if necessary.
  },

  /**
   * @protected
   * @param {Array.<number>} xy
   * @param {Array.<number>} wh
   * @param {number} [xDimIndex=0] or 1
   */
  buildLabel: function (xy, wh, xDimIndex) {
    xDimIndex = xDimIndex || 0;
    return {
      x: xy[xDimIndex],
      y: xy[1 - xDimIndex],
      width: wh[xDimIndex],
      height: wh[1 - xDimIndex]
    };
  }
};
BaseAxisPointer.prototype.constructor = BaseAxisPointer;

function updateProps(animationModel, moveAnimation, el, props) {
  // Animation optimize.
  if (!propsEqual(inner(el).lastProp, props)) {
    inner(el).lastProp = props;
    moveAnimation ? graphic.updateProps(el, props, animationModel) : (el.stopAnimation(), el.attr(props));
  }
}

function propsEqual(lastProps, newProps) {
  if (zrUtil.isObject(lastProps) && zrUtil.isObject(newProps)) {
    var equals = true;
    zrUtil.each(newProps, function (item, key) {
      equals = equals && propsEqual(lastProps[key], item);
    });
    return !!equals;
  } else {
    return lastProps === newProps;
  }
}

function updateLabelShowHide(labelEl, axisPointerModel) {
  labelEl[axisPointerModel.get('label.show') ? 'show' : 'hide']();
}

function getHandleTransProps(trans) {
  return {
    position: trans.position.slice(),
    rotation: trans.rotation || 0
  };
}

function updateMandatoryProps(group, axisPointerModel, silent) {
  var z = axisPointerModel.get('z');
  var zlevel = axisPointerModel.get('zlevel');
  group && group.traverse(function (el) {
    if (el.type !== 'group') {
      z != null && (el.z = z);
      zlevel != null && (el.zlevel = zlevel);
      el.silent = silent;
    }
  });
}

clazzUtil.enableClassExtend(BaseAxisPointer);
var _default = BaseAxisPointer;
module.exports = _default;

/***/ }),

/***/ "dd39":
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

__webpack_require__("6932");

__webpack_require__("3a56");

__webpack_require__("7dcf");

__webpack_require__("414c");

__webpack_require__("4b08");

__webpack_require__("2c17");

__webpack_require__("9e87");

/***/ }),

/***/ "e4d1":
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

__webpack_require__("6932");

__webpack_require__("3a56");

__webpack_require__("7dcf");

__webpack_require__("3790");

__webpack_require__("2325");

__webpack_require__("2c17");

__webpack_require__("9e87");

/***/ }),

/***/ "eb6b":
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

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var modelHelper = __webpack_require__("cd33");

var findPointFromSeries = __webpack_require__("133d");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var curry = zrUtil.curry;
var inner = makeInner();
/**
 * Basic logic: check all axis, if they do not demand show/highlight,
 * then hide/downplay them.
 *
 * @param {Object} coordSysAxesInfo
 * @param {Object} payload
 * @param {string} [payload.currTrigger] 'click' | 'mousemove' | 'leave'
 * @param {Array.<number>} [payload.x] x and y, which are mandatory, specify a point to
 *              trigger axisPointer and tooltip.
 * @param {Array.<number>} [payload.y] x and y, which are mandatory, specify a point to
 *              trigger axisPointer and tooltip.
 * @param {Object} [payload.seriesIndex] finder, optional, restrict target axes.
 * @param {Object} [payload.dataIndex] finder, restrict target axes.
 * @param {Object} [payload.axesInfo] finder, restrict target axes.
 *        [{
 *          axisDim: 'x'|'y'|'angle'|...,
 *          axisIndex: ...,
 *          value: ...
 *        }, ...]
 * @param {Function} [payload.dispatchAction]
 * @param {Object} [payload.tooltipOption]
 * @param {Object|Array.<number>|Function} [payload.position] Tooltip position,
 *        which can be specified in dispatchAction
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 * @return {Object} content of event obj for echarts.connect.
 */

function _default(payload, ecModel, api) {
  var currTrigger = payload.currTrigger;
  var point = [payload.x, payload.y];
  var finder = payload;
  var dispatchAction = payload.dispatchAction || zrUtil.bind(api.dispatchAction, api);
  var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo; // Pending
  // See #6121. But we are not able to reproduce it yet.

  if (!coordSysAxesInfo) {
    return;
  }

  if (illegalPoint(point)) {
    // Used in the default behavior of `connection`: use the sample seriesIndex
    // and dataIndex. And also used in the tooltipView trigger.
    point = findPointFromSeries({
      seriesIndex: finder.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: finder.dataIndex
    }, ecModel).point;
  }

  var isIllegalPoint = illegalPoint(point); // Axis and value can be specified when calling dispatchAction({type: 'updateAxisPointer'}).
  // Notice: In this case, it is difficult to get the `point` (which is necessary to show
  // tooltip, so if point is not given, we just use the point found by sample seriesIndex
  // and dataIndex.

  var inputAxesInfo = finder.axesInfo;
  var axesInfo = coordSysAxesInfo.axesInfo;
  var shouldHide = currTrigger === 'leave' || illegalPoint(point);
  var outputFinder = {};
  var showValueMap = {};
  var dataByCoordSys = {
    list: [],
    map: {}
  };
  var updaters = {
    showPointer: curry(showPointer, showValueMap),
    showTooltip: curry(showTooltip, dataByCoordSys)
  }; // Process for triggered axes.

  each(coordSysAxesInfo.coordSysMap, function (coordSys, coordSysKey) {
    // If a point given, it must be contained by the coordinate system.
    var coordSysContainsPoint = isIllegalPoint || coordSys.containPoint(point);
    each(coordSysAxesInfo.coordSysAxesInfo[coordSysKey], function (axisInfo, key) {
      var axis = axisInfo.axis;
      var inputAxisInfo = findInputAxisInfo(inputAxesInfo, axisInfo); // If no inputAxesInfo, no axis is restricted.

      if (!shouldHide && coordSysContainsPoint && (!inputAxesInfo || inputAxisInfo)) {
        var val = inputAxisInfo && inputAxisInfo.value;

        if (val == null && !isIllegalPoint) {
          val = axis.pointToData(point);
        }

        val != null && processOnAxis(axisInfo, val, updaters, false, outputFinder);
      }
    });
  }); // Process for linked axes.

  var linkTriggers = {};
  each(axesInfo, function (tarAxisInfo, tarKey) {
    var linkGroup = tarAxisInfo.linkGroup; // If axis has been triggered in the previous stage, it should not be triggered by link.

    if (linkGroup && !showValueMap[tarKey]) {
      each(linkGroup.axesInfo, function (srcAxisInfo, srcKey) {
        var srcValItem = showValueMap[srcKey]; // If srcValItem exist, source axis is triggered, so link to target axis.

        if (srcAxisInfo !== tarAxisInfo && srcValItem) {
          var val = srcValItem.value;
          linkGroup.mapper && (val = tarAxisInfo.axis.scale.parse(linkGroup.mapper(val, makeMapperParam(srcAxisInfo), makeMapperParam(tarAxisInfo))));
          linkTriggers[tarAxisInfo.key] = val;
        }
      });
    }
  });
  each(linkTriggers, function (val, tarKey) {
    processOnAxis(axesInfo[tarKey], val, updaters, true, outputFinder);
  });
  updateModelActually(showValueMap, axesInfo, outputFinder);
  dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction);
  dispatchHighDownActually(axesInfo, dispatchAction, api);
  return outputFinder;
}

function processOnAxis(axisInfo, newValue, updaters, dontSnap, outputFinder) {
  var axis = axisInfo.axis;

  if (axis.scale.isBlank() || !axis.containData(newValue)) {
    return;
  }

  if (!axisInfo.involveSeries) {
    updaters.showPointer(axisInfo, newValue);
    return;
  } // Heavy calculation. So put it after axis.containData checking.


  var payloadInfo = buildPayloadsBySeries(newValue, axisInfo);
  var payloadBatch = payloadInfo.payloadBatch;
  var snapToValue = payloadInfo.snapToValue; // Fill content of event obj for echarts.connect.
  // By defualt use the first involved series data as a sample to connect.

  if (payloadBatch[0] && outputFinder.seriesIndex == null) {
    zrUtil.extend(outputFinder, payloadBatch[0]);
  } // If no linkSource input, this process is for collecting link
  // target, where snap should not be accepted.


  if (!dontSnap && axisInfo.snap) {
    if (axis.containData(snapToValue) && snapToValue != null) {
      newValue = snapToValue;
    }
  }

  updaters.showPointer(axisInfo, newValue, payloadBatch, outputFinder); // Tooltip should always be snapToValue, otherwise there will be
  // incorrect "axis value ~ series value" mapping displayed in tooltip.

  updaters.showTooltip(axisInfo, payloadInfo, snapToValue);
}

function buildPayloadsBySeries(value, axisInfo) {
  var axis = axisInfo.axis;
  var dim = axis.dim;
  var snapToValue = value;
  var payloadBatch = [];
  var minDist = Number.MAX_VALUE;
  var minDiff = -1;
  each(axisInfo.seriesModels, function (series, idx) {
    var dataDim = series.getData().mapDimension(dim, true);
    var seriesNestestValue;
    var dataIndices;

    if (series.getAxisTooltipData) {
      var result = series.getAxisTooltipData(dataDim, value, axis);
      dataIndices = result.dataIndices;
      seriesNestestValue = result.nestestValue;
    } else {
      dataIndices = series.getData().indicesOfNearest(dataDim[0], value, // Add a threshold to avoid find the wrong dataIndex
      // when data length is not same.
      // false,
      axis.type === 'category' ? 0.5 : null);

      if (!dataIndices.length) {
        return;
      }

      seriesNestestValue = series.getData().get(dataDim[0], dataIndices[0]);
    }

    if (seriesNestestValue == null || !isFinite(seriesNestestValue)) {
      return;
    }

    var diff = value - seriesNestestValue;
    var dist = Math.abs(diff); // Consider category case

    if (dist <= minDist) {
      if (dist < minDist || diff >= 0 && minDiff < 0) {
        minDist = dist;
        minDiff = diff;
        snapToValue = seriesNestestValue;
        payloadBatch.length = 0;
      }

      each(dataIndices, function (dataIndex) {
        payloadBatch.push({
          seriesIndex: series.seriesIndex,
          dataIndexInside: dataIndex,
          dataIndex: series.getData().getRawIndex(dataIndex)
        });
      });
    }
  });
  return {
    payloadBatch: payloadBatch,
    snapToValue: snapToValue
  };
}

function showPointer(showValueMap, axisInfo, value, payloadBatch) {
  showValueMap[axisInfo.key] = {
    value: value,
    payloadBatch: payloadBatch
  };
}

function showTooltip(dataByCoordSys, axisInfo, payloadInfo, value) {
  var payloadBatch = payloadInfo.payloadBatch;
  var axis = axisInfo.axis;
  var axisModel = axis.model;
  var axisPointerModel = axisInfo.axisPointerModel; // If no data, do not create anything in dataByCoordSys,
  // whose length will be used to judge whether dispatch action.

  if (!axisInfo.triggerTooltip || !payloadBatch.length) {
    return;
  }

  var coordSysModel = axisInfo.coordSys.model;
  var coordSysKey = modelHelper.makeKey(coordSysModel);
  var coordSysItem = dataByCoordSys.map[coordSysKey];

  if (!coordSysItem) {
    coordSysItem = dataByCoordSys.map[coordSysKey] = {
      coordSysId: coordSysModel.id,
      coordSysIndex: coordSysModel.componentIndex,
      coordSysType: coordSysModel.type,
      coordSysMainType: coordSysModel.mainType,
      dataByAxis: []
    };
    dataByCoordSys.list.push(coordSysItem);
  }

  coordSysItem.dataByAxis.push({
    axisDim: axis.dim,
    axisIndex: axisModel.componentIndex,
    axisType: axisModel.type,
    axisId: axisModel.id,
    value: value,
    // Caustion: viewHelper.getValueLabel is actually on "view stage", which
    // depends that all models have been updated. So it should not be performed
    // here. Considering axisPointerModel used here is volatile, which is hard
    // to be retrieve in TooltipView, we prepare parameters here.
    valueLabelOpt: {
      precision: axisPointerModel.get('label.precision'),
      formatter: axisPointerModel.get('label.formatter')
    },
    seriesDataIndices: payloadBatch.slice()
  });
}

function updateModelActually(showValueMap, axesInfo, outputFinder) {
  var outputAxesInfo = outputFinder.axesInfo = []; // Basic logic: If no 'show' required, 'hide' this axisPointer.

  each(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    var valItem = showValueMap[key];

    if (valItem) {
      !axisInfo.useHandle && (option.status = 'show');
      option.value = valItem.value; // For label formatter param and highlight.

      option.seriesDataIndices = (valItem.payloadBatch || []).slice();
    } // When always show (e.g., handle used), remain
    // original value and status.
    else {
        // If hide, value still need to be set, consider
        // click legend to toggle axis blank.
        !axisInfo.useHandle && (option.status = 'hide');
      } // If status is 'hide', should be no info in payload.


    option.status === 'show' && outputAxesInfo.push({
      axisDim: axisInfo.axis.dim,
      axisIndex: axisInfo.axis.model.componentIndex,
      value: option.value
    });
  });
}

function dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction) {
  // Basic logic: If no showTip required, hideTip will be dispatched.
  if (illegalPoint(point) || !dataByCoordSys.list.length) {
    dispatchAction({
      type: 'hideTip'
    });
    return;
  } // In most case only one axis (or event one series is used). It is
  // convinient to fetch payload.seriesIndex and payload.dataIndex
  // dirtectly. So put the first seriesIndex and dataIndex of the first
  // axis on the payload.


  var sampleItem = ((dataByCoordSys.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  dispatchAction({
    type: 'showTip',
    escapeConnect: true,
    x: point[0],
    y: point[1],
    tooltipOption: payload.tooltipOption,
    position: payload.position,
    dataIndexInside: sampleItem.dataIndexInside,
    dataIndex: sampleItem.dataIndex,
    seriesIndex: sampleItem.seriesIndex,
    dataByCoordSys: dataByCoordSys.list
  });
}

function dispatchHighDownActually(axesInfo, dispatchAction, api) {
  // FIXME
  // highlight status modification shoule be a stage of main process?
  // (Consider confilct (e.g., legend and axisPointer) and setOption)
  var zr = api.getZr();
  var highDownKey = 'axisPointerLastHighlights';
  var lastHighlights = inner(zr)[highDownKey] || {};
  var newHighlights = inner(zr)[highDownKey] = {}; // Update highlight/downplay status according to axisPointer model.
  // Build hash map and remove duplicate incidentally.

  each(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    option.status === 'show' && each(option.seriesDataIndices, function (batchItem) {
      var key = batchItem.seriesIndex + ' | ' + batchItem.dataIndex;
      newHighlights[key] = batchItem;
    });
  }); // Diff.

  var toHighlight = [];
  var toDownplay = [];
  zrUtil.each(lastHighlights, function (batchItem, key) {
    !newHighlights[key] && toDownplay.push(batchItem);
  });
  zrUtil.each(newHighlights, function (batchItem, key) {
    !lastHighlights[key] && toHighlight.push(batchItem);
  });
  toDownplay.length && api.dispatchAction({
    type: 'downplay',
    escapeConnect: true,
    batch: toDownplay
  });
  toHighlight.length && api.dispatchAction({
    type: 'highlight',
    escapeConnect: true,
    batch: toHighlight
  });
}

function findInputAxisInfo(inputAxesInfo, axisInfo) {
  for (var i = 0; i < (inputAxesInfo || []).length; i++) {
    var inputAxisInfo = inputAxesInfo[i];

    if (axisInfo.axis.dim === inputAxisInfo.axisDim && axisInfo.axis.model.componentIndex === inputAxisInfo.axisIndex) {
      return inputAxisInfo;
    }
  }
}

function makeMapperParam(axisInfo) {
  var axisModel = axisInfo.axis.model;
  var item = {};
  var dim = item.axisDim = axisInfo.axis.dim;
  item.axisIndex = item[dim + 'AxisIndex'] = axisModel.componentIndex;
  item.axisName = item[dim + 'AxisName'] = axisModel.name;
  item.axisId = item[dim + 'AxisId'] = axisModel.id;
  return item;
}

function illegalPoint(point) {
  return !point || point[0] == null || isNaN(point[0]) || point[1] == null || isNaN(point[1]);
}

module.exports = _default;

/***/ }),

/***/ "ee66":
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

var formatUtil = __webpack_require__("eda2");

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
var MONTH_TEXT = {
  EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  CN: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};
var WEEK_TEXT = {
  EN: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  CN: ['日', '一', '二', '三', '四', '五', '六']
};

var _default = echarts.extendComponentView({
  type: 'calendar',

  /**
   * top/left line points
   *  @private
   */
  _tlpoints: null,

  /**
   * bottom/right line points
   *  @private
   */
  _blpoints: null,

  /**
   * first day of month
   *  @private
   */
  _firstDayOfMonth: null,

  /**
   * first day point of month
   *  @private
   */
  _firstDayPoints: null,
  render: function (calendarModel, ecModel, api) {
    var group = this.group;
    group.removeAll();
    var coordSys = calendarModel.coordinateSystem; // range info

    var rangeData = coordSys.getRangeInfo();
    var orient = coordSys.getOrient();

    this._renderDayRect(calendarModel, rangeData, group); // _renderLines must be called prior to following function


    this._renderLines(calendarModel, rangeData, orient, group);

    this._renderYearText(calendarModel, rangeData, orient, group);

    this._renderMonthText(calendarModel, orient, group);

    this._renderWeekText(calendarModel, rangeData, orient, group);
  },
  // render day rect
  _renderDayRect: function (calendarModel, rangeData, group) {
    var coordSys = calendarModel.coordinateSystem;
    var itemRectStyleModel = calendarModel.getModel('itemStyle').getItemStyle();
    var sw = coordSys.getCellWidth();
    var sh = coordSys.getCellHeight();

    for (var i = rangeData.start.time; i <= rangeData.end.time; i = coordSys.getNextNDay(i, 1).time) {
      var point = coordSys.dataToRect([i], false).tl; // every rect

      var rect = new graphic.Rect({
        shape: {
          x: point[0],
          y: point[1],
          width: sw,
          height: sh
        },
        cursor: 'default',
        style: itemRectStyleModel
      });
      group.add(rect);
    }
  },
  // render separate line
  _renderLines: function (calendarModel, rangeData, orient, group) {
    var self = this;
    var coordSys = calendarModel.coordinateSystem;
    var lineStyleModel = calendarModel.getModel('splitLine.lineStyle').getLineStyle();
    var show = calendarModel.get('splitLine.show');
    var lineWidth = lineStyleModel.lineWidth;
    this._tlpoints = [];
    this._blpoints = [];
    this._firstDayOfMonth = [];
    this._firstDayPoints = [];
    var firstDay = rangeData.start;

    for (var i = 0; firstDay.time <= rangeData.end.time; i++) {
      addPoints(firstDay.formatedDate);

      if (i === 0) {
        firstDay = coordSys.getDateInfo(rangeData.start.y + '-' + rangeData.start.m);
      }

      var date = firstDay.date;
      date.setMonth(date.getMonth() + 1);
      firstDay = coordSys.getDateInfo(date);
    }

    addPoints(coordSys.getNextNDay(rangeData.end.time, 1).formatedDate);

    function addPoints(date) {
      self._firstDayOfMonth.push(coordSys.getDateInfo(date));

      self._firstDayPoints.push(coordSys.dataToRect([date], false).tl);

      var points = self._getLinePointsOfOneWeek(calendarModel, date, orient);

      self._tlpoints.push(points[0]);

      self._blpoints.push(points[points.length - 1]);

      show && self._drawSplitline(points, lineStyleModel, group);
    } // render top/left line


    show && this._drawSplitline(self._getEdgesPoints(self._tlpoints, lineWidth, orient), lineStyleModel, group); // render bottom/right line

    show && this._drawSplitline(self._getEdgesPoints(self._blpoints, lineWidth, orient), lineStyleModel, group);
  },
  // get points at both ends
  _getEdgesPoints: function (points, lineWidth, orient) {
    var rs = [points[0].slice(), points[points.length - 1].slice()];
    var idx = orient === 'horizontal' ? 0 : 1; // both ends of the line are extend half lineWidth

    rs[0][idx] = rs[0][idx] - lineWidth / 2;
    rs[1][idx] = rs[1][idx] + lineWidth / 2;
    return rs;
  },
  // render split line
  _drawSplitline: function (points, lineStyleModel, group) {
    var poyline = new graphic.Polyline({
      z2: 20,
      shape: {
        points: points
      },
      style: lineStyleModel
    });
    group.add(poyline);
  },
  // render month line of one week points
  _getLinePointsOfOneWeek: function (calendarModel, date, orient) {
    var coordSys = calendarModel.coordinateSystem;
    date = coordSys.getDateInfo(date);
    var points = [];

    for (var i = 0; i < 7; i++) {
      var tmpD = coordSys.getNextNDay(date.time, i);
      var point = coordSys.dataToRect([tmpD.time], false);
      points[2 * tmpD.day] = point.tl;
      points[2 * tmpD.day + 1] = point[orient === 'horizontal' ? 'bl' : 'tr'];
    }

    return points;
  },
  _formatterLabel: function (formatter, params) {
    if (typeof formatter === 'string' && formatter) {
      return formatUtil.formatTplSimple(formatter, params);
    }

    if (typeof formatter === 'function') {
      return formatter(params);
    }

    return params.nameMap;
  },
  _yearTextPositionControl: function (textEl, point, orient, position, margin) {
    point = point.slice();
    var aligns = ['center', 'bottom'];

    if (position === 'bottom') {
      point[1] += margin;
      aligns = ['center', 'top'];
    } else if (position === 'left') {
      point[0] -= margin;
    } else if (position === 'right') {
      point[0] += margin;
      aligns = ['center', 'top'];
    } else {
      // top
      point[1] -= margin;
    }

    var rotate = 0;

    if (position === 'left' || position === 'right') {
      rotate = Math.PI / 2;
    }

    return {
      rotation: rotate,
      position: point,
      style: {
        textAlign: aligns[0],
        textVerticalAlign: aligns[1]
      }
    };
  },
  // render year
  _renderYearText: function (calendarModel, rangeData, orient, group) {
    var yearLabel = calendarModel.getModel('yearLabel');

    if (!yearLabel.get('show')) {
      return;
    }

    var margin = yearLabel.get('margin');
    var pos = yearLabel.get('position');

    if (!pos) {
      pos = orient !== 'horizontal' ? 'top' : 'left';
    }

    var points = [this._tlpoints[this._tlpoints.length - 1], this._blpoints[0]];
    var xc = (points[0][0] + points[1][0]) / 2;
    var yc = (points[0][1] + points[1][1]) / 2;
    var idx = orient === 'horizontal' ? 0 : 1;
    var posPoints = {
      top: [xc, points[idx][1]],
      bottom: [xc, points[1 - idx][1]],
      left: [points[1 - idx][0], yc],
      right: [points[idx][0], yc]
    };
    var name = rangeData.start.y;

    if (+rangeData.end.y > +rangeData.start.y) {
      name = name + '-' + rangeData.end.y;
    }

    var formatter = yearLabel.get('formatter');
    var params = {
      start: rangeData.start.y,
      end: rangeData.end.y,
      nameMap: name
    };

    var content = this._formatterLabel(formatter, params);

    var yearText = new graphic.Text({
      z2: 30
    });
    graphic.setTextStyle(yearText.style, yearLabel, {
      text: content
    }), yearText.attr(this._yearTextPositionControl(yearText, posPoints[pos], orient, pos, margin));
    group.add(yearText);
  },
  _monthTextPositionControl: function (point, isCenter, orient, position, margin) {
    var align = 'left';
    var vAlign = 'top';
    var x = point[0];
    var y = point[1];

    if (orient === 'horizontal') {
      y = y + margin;

      if (isCenter) {
        align = 'center';
      }

      if (position === 'start') {
        vAlign = 'bottom';
      }
    } else {
      x = x + margin;

      if (isCenter) {
        vAlign = 'middle';
      }

      if (position === 'start') {
        align = 'right';
      }
    }

    return {
      x: x,
      y: y,
      textAlign: align,
      textVerticalAlign: vAlign
    };
  },
  // render month and year text
  _renderMonthText: function (calendarModel, orient, group) {
    var monthLabel = calendarModel.getModel('monthLabel');

    if (!monthLabel.get('show')) {
      return;
    }

    var nameMap = monthLabel.get('nameMap');
    var margin = monthLabel.get('margin');
    var pos = monthLabel.get('position');
    var align = monthLabel.get('align');
    var termPoints = [this._tlpoints, this._blpoints];

    if (zrUtil.isString(nameMap)) {
      nameMap = MONTH_TEXT[nameMap.toUpperCase()] || [];
    }

    var idx = pos === 'start' ? 0 : 1;
    var axis = orient === 'horizontal' ? 0 : 1;
    margin = pos === 'start' ? -margin : margin;
    var isCenter = align === 'center';

    for (var i = 0; i < termPoints[idx].length - 1; i++) {
      var tmp = termPoints[idx][i].slice();
      var firstDay = this._firstDayOfMonth[i];

      if (isCenter) {
        var firstDayPoints = this._firstDayPoints[i];
        tmp[axis] = (firstDayPoints[axis] + termPoints[0][i + 1][axis]) / 2;
      }

      var formatter = monthLabel.get('formatter');
      var name = nameMap[+firstDay.m - 1];
      var params = {
        yyyy: firstDay.y,
        yy: (firstDay.y + '').slice(2),
        MM: firstDay.m,
        M: +firstDay.m,
        nameMap: name
      };

      var content = this._formatterLabel(formatter, params);

      var monthText = new graphic.Text({
        z2: 30
      });
      zrUtil.extend(graphic.setTextStyle(monthText.style, monthLabel, {
        text: content
      }), this._monthTextPositionControl(tmp, isCenter, orient, pos, margin));
      group.add(monthText);
    }
  },
  _weekTextPositionControl: function (point, orient, position, margin, cellSize) {
    var align = 'center';
    var vAlign = 'middle';
    var x = point[0];
    var y = point[1];
    var isStart = position === 'start';

    if (orient === 'horizontal') {
      x = x + margin + (isStart ? 1 : -1) * cellSize[0] / 2;
      align = isStart ? 'right' : 'left';
    } else {
      y = y + margin + (isStart ? 1 : -1) * cellSize[1] / 2;
      vAlign = isStart ? 'bottom' : 'top';
    }

    return {
      x: x,
      y: y,
      textAlign: align,
      textVerticalAlign: vAlign
    };
  },
  // render weeks
  _renderWeekText: function (calendarModel, rangeData, orient, group) {
    var dayLabel = calendarModel.getModel('dayLabel');

    if (!dayLabel.get('show')) {
      return;
    }

    var coordSys = calendarModel.coordinateSystem;
    var pos = dayLabel.get('position');
    var nameMap = dayLabel.get('nameMap');
    var margin = dayLabel.get('margin');
    var firstDayOfWeek = coordSys.getFirstDayOfWeek();

    if (zrUtil.isString(nameMap)) {
      nameMap = WEEK_TEXT[nameMap.toUpperCase()] || [];
    }

    var start = coordSys.getNextNDay(rangeData.end.time, 7 - rangeData.lweek).time;
    var cellSize = [coordSys.getCellWidth(), coordSys.getCellHeight()];
    margin = numberUtil.parsePercent(margin, cellSize[orient === 'horizontal' ? 0 : 1]);

    if (pos === 'start') {
      start = coordSys.getNextNDay(rangeData.start.time, -(7 + rangeData.fweek)).time;
      margin = -margin;
    }

    for (var i = 0; i < 7; i++) {
      var tmpD = coordSys.getNextNDay(start, i);
      var point = coordSys.dataToRect([tmpD.time], false).center;
      var day = i;
      day = Math.abs((i + firstDayOfWeek) % 7);
      var weekText = new graphic.Text({
        z2: 30
      });
      zrUtil.extend(graphic.setTextStyle(weekText.style, dayLabel, {
        text: nameMap[day]
      }), this._weekTextPositionControl(point, orient, pos, margin, cellSize));
      group.add(weekText);
    }
  }
});

module.exports = _default;

/***/ }),

/***/ "f138":
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

var BaseAxisPointer = __webpack_require__("dcb3");

var viewHelper = __webpack_require__("ff2e");

var singleAxisHelper = __webpack_require__("edb9");

var AxisView = __webpack_require__("6679");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var XY = ['x', 'y'];
var WH = ['width', 'height'];
var SingleAxisPointer = BaseAxisPointer.extend({
  /**
   * @override
   */
  makeElOption: function (elOption, value, axisModel, axisPointerModel, api) {
    var axis = axisModel.axis;
    var coordSys = axis.coordinateSystem;
    var otherExtent = getGlobalExtent(coordSys, 1 - getPointDimIndex(axis));
    var pixelValue = coordSys.dataToPoint(value)[0];
    var axisPointerType = axisPointerModel.get('type');

    if (axisPointerType && axisPointerType !== 'none') {
      var elStyle = viewHelper.buildElStyle(axisPointerModel);
      var pointerOption = pointerShapeBuilder[axisPointerType](axis, pixelValue, otherExtent);
      pointerOption.style = elStyle;
      elOption.graphicKey = pointerOption.type;
      elOption.pointer = pointerOption;
    }

    var layoutInfo = singleAxisHelper.layout(axisModel);
    viewHelper.buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api);
  },

  /**
   * @override
   */
  getHandleTransform: function (value, axisModel, axisPointerModel) {
    var layoutInfo = singleAxisHelper.layout(axisModel, {
      labelInside: false
    });
    layoutInfo.labelMargin = axisPointerModel.get('handle.margin');
    return {
      position: viewHelper.getTransformedPosition(axisModel.axis, value, layoutInfo),
      rotation: layoutInfo.rotation + (layoutInfo.labelDirection < 0 ? Math.PI : 0)
    };
  },

  /**
   * @override
   */
  updateHandleTransform: function (transform, delta, axisModel, axisPointerModel) {
    var axis = axisModel.axis;
    var coordSys = axis.coordinateSystem;
    var dimIndex = getPointDimIndex(axis);
    var axisExtent = getGlobalExtent(coordSys, dimIndex);
    var currPosition = transform.position;
    currPosition[dimIndex] += delta[dimIndex];
    currPosition[dimIndex] = Math.min(axisExtent[1], currPosition[dimIndex]);
    currPosition[dimIndex] = Math.max(axisExtent[0], currPosition[dimIndex]);
    var otherExtent = getGlobalExtent(coordSys, 1 - dimIndex);
    var cursorOtherValue = (otherExtent[1] + otherExtent[0]) / 2;
    var cursorPoint = [cursorOtherValue, cursorOtherValue];
    cursorPoint[dimIndex] = currPosition[dimIndex];
    return {
      position: currPosition,
      rotation: transform.rotation,
      cursorPoint: cursorPoint,
      tooltipOption: {
        verticalAlign: 'middle'
      }
    };
  }
});
var pointerShapeBuilder = {
  line: function (axis, pixelValue, otherExtent) {
    var targetShape = viewHelper.makeLineShape([pixelValue, otherExtent[0]], [pixelValue, otherExtent[1]], getPointDimIndex(axis));
    return {
      type: 'Line',
      subPixelOptimize: true,
      shape: targetShape
    };
  },
  shadow: function (axis, pixelValue, otherExtent) {
    var bandWidth = axis.getBandWidth();
    var span = otherExtent[1] - otherExtent[0];
    return {
      type: 'Rect',
      shape: viewHelper.makeRectShape([pixelValue - bandWidth / 2, otherExtent[0]], [bandWidth, span], getPointDimIndex(axis))
    };
  }
};

function getPointDimIndex(axis) {
  return axis.isHorizontal() ? 0 : 1;
}

function getGlobalExtent(coordSys, dimIndex) {
  var rect = coordSys.getRect();
  return [rect[XY[dimIndex]], rect[XY[dimIndex]] + rect[WH[dimIndex]]];
}

AxisView.registerAxisPointerClass('SingleAxisPointer', SingleAxisPointer);
var _default = SingleAxisPointer;
module.exports = _default;

/***/ }),

/***/ "f273":
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

var AxisBuilder = __webpack_require__("fab2");

var AxisView = __webpack_require__("6679");

var cartesianAxisHelper = __webpack_require__("0156");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'];
var selfBuilderAttrs = ['splitArea', 'splitLine', 'minorSplitLine'];
var CartesianAxisView = AxisView.extend({
  type: 'cartesianAxis',
  axisPointerClass: 'CartesianAxisPointer',

  /**
   * @override
   */
  render: function (axisModel, ecModel, api, payload) {
    this.group.removeAll();
    var oldAxisGroup = this._axisGroup;
    this._axisGroup = new graphic.Group();
    this.group.add(this._axisGroup);

    if (!axisModel.get('show')) {
      return;
    }

    var gridModel = axisModel.getCoordSysModel();
    var layout = cartesianAxisHelper.layout(gridModel, axisModel);
    var axisBuilder = new AxisBuilder(axisModel, layout);
    zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);

    this._axisGroup.add(axisBuilder.getGroup());

    zrUtil.each(selfBuilderAttrs, function (name) {
      if (axisModel.get(name + '.show')) {
        this['_' + name](axisModel, gridModel);
      }
    }, this);
    graphic.groupTransition(oldAxisGroup, this._axisGroup, axisModel);
    CartesianAxisView.superCall(this, 'render', axisModel, ecModel, api, payload);
  },
  remove: function () {
    this._splitAreaColors = null;
  },

  /**
   * @param {module:echarts/coord/cartesian/AxisModel} axisModel
   * @param {module:echarts/coord/cartesian/GridModel} gridModel
   * @private
   */
  _splitLine: function (axisModel, gridModel) {
    var axis = axisModel.axis;

    if (axis.scale.isBlank()) {
      return;
    }

    var splitLineModel = axisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineColors = lineStyleModel.get('color');
    lineColors = zrUtil.isArray(lineColors) ? lineColors : [lineColors];
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var lineCount = 0;
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitLineModel
    });
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();

    for (var i = 0; i < ticksCoords.length; i++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);

      if (isHorizontal) {
        p1[0] = tickCoord;
        p1[1] = gridRect.y;
        p2[0] = tickCoord;
        p2[1] = gridRect.y + gridRect.height;
      } else {
        p1[0] = gridRect.x;
        p1[1] = tickCoord;
        p2[0] = gridRect.x + gridRect.width;
        p2[1] = tickCoord;
      }

      var colorIndex = lineCount++ % lineColors.length;
      var tickValue = ticksCoords[i].tickValue;

      this._axisGroup.add(new graphic.Line({
        anid: tickValue != null ? 'line_' + ticksCoords[i].tickValue : null,
        subPixelOptimize: true,
        shape: {
          x1: p1[0],
          y1: p1[1],
          x2: p2[0],
          y2: p2[1]
        },
        style: zrUtil.defaults({
          stroke: lineColors[colorIndex]
        }, lineStyle),
        silent: true
      }));
    }
  },

  /**
   * @param {module:echarts/coord/cartesian/AxisModel} axisModel
   * @param {module:echarts/coord/cartesian/GridModel} gridModel
   * @private
   */
  _minorSplitLine: function (axisModel, gridModel) {
    var axis = axisModel.axis;
    var minorSplitLineModel = axisModel.getModel('minorSplitLine');
    var lineStyleModel = minorSplitLineModel.getModel('lineStyle');
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var minorTicksCoords = axis.getMinorTicksCoords();

    if (!minorTicksCoords.length) {
      return;
    }

    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();

    for (var i = 0; i < minorTicksCoords.length; i++) {
      for (var k = 0; k < minorTicksCoords[i].length; k++) {
        var tickCoord = axis.toGlobalCoord(minorTicksCoords[i][k].coord);

        if (isHorizontal) {
          p1[0] = tickCoord;
          p1[1] = gridRect.y;
          p2[0] = tickCoord;
          p2[1] = gridRect.y + gridRect.height;
        } else {
          p1[0] = gridRect.x;
          p1[1] = tickCoord;
          p2[0] = gridRect.x + gridRect.width;
          p2[1] = tickCoord;
        }

        this._axisGroup.add(new graphic.Line({
          anid: 'minor_line_' + minorTicksCoords[i][k].tickValue,
          subPixelOptimize: true,
          shape: {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
          },
          style: lineStyle,
          silent: true
        }));
      }
    }
  },

  /**
   * @param {module:echarts/coord/cartesian/AxisModel} axisModel
   * @param {module:echarts/coord/cartesian/GridModel} gridModel
   * @private
   */
  _splitArea: function (axisModel, gridModel) {
    var axis = axisModel.axis;

    if (axis.scale.isBlank()) {
      return;
    }

    var splitAreaModel = axisModel.getModel('splitArea');
    var areaStyleModel = splitAreaModel.getModel('areaStyle');
    var areaColors = areaStyleModel.get('color');
    var gridRect = gridModel.coordinateSystem.getRect();
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitAreaModel,
      clamp: true
    });

    if (!ticksCoords.length) {
      return;
    } // For Making appropriate splitArea animation, the color and anid
    // should be corresponding to previous one if possible.


    var areaColorsLen = areaColors.length;
    var lastSplitAreaColors = this._splitAreaColors;
    var newSplitAreaColors = zrUtil.createHashMap();
    var colorIndex = 0;

    if (lastSplitAreaColors) {
      for (var i = 0; i < ticksCoords.length; i++) {
        var cIndex = lastSplitAreaColors.get(ticksCoords[i].tickValue);

        if (cIndex != null) {
          colorIndex = (cIndex + (areaColorsLen - 1) * i) % areaColorsLen;
          break;
        }
      }
    }

    var prev = axis.toGlobalCoord(ticksCoords[0].coord);
    var areaStyle = areaStyleModel.getAreaStyle();
    areaColors = zrUtil.isArray(areaColors) ? areaColors : [areaColors];

    for (var i = 1; i < ticksCoords.length; i++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
      var x;
      var y;
      var width;
      var height;

      if (axis.isHorizontal()) {
        x = prev;
        y = gridRect.y;
        width = tickCoord - x;
        height = gridRect.height;
        prev = x + width;
      } else {
        x = gridRect.x;
        y = prev;
        width = gridRect.width;
        height = tickCoord - y;
        prev = y + height;
      }

      var tickValue = ticksCoords[i - 1].tickValue;
      tickValue != null && newSplitAreaColors.set(tickValue, colorIndex);

      this._axisGroup.add(new graphic.Rect({
        anid: tickValue != null ? 'area_' + tickValue : null,
        shape: {
          x: x,
          y: y,
          width: width,
          height: height
        },
        style: zrUtil.defaults({
          fill: areaColors[colorIndex]
        }, areaStyle),
        silent: true
      }));

      colorIndex = (colorIndex + 1) % areaColorsLen;
    }

    this._splitAreaColors = newSplitAreaColors;
  }
});
CartesianAxisView.extend({
  type: 'xAxis'
});
CartesianAxisView.extend({
  type: 'yAxis'
});

/***/ }),

/***/ "f31f":
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

var visualSolution = __webpack_require__("2b8c");

var Model = __webpack_require__("4319");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var DEFAULT_OUT_OF_BRUSH_COLOR = ['#ddd'];
var BrushModel = echarts.extendComponentModel({
  type: 'brush',
  dependencies: ['geo', 'grid', 'xAxis', 'yAxis', 'parallel', 'series'],

  /**
   * @protected
   */
  defaultOption: {
    // inBrush: null,
    // outOfBrush: null,
    toolbox: null,
    // Default value see preprocessor.
    brushLink: null,
    // Series indices array, broadcast using dataIndex.
    // or 'all', which means all series. 'none' or null means no series.
    seriesIndex: 'all',
    // seriesIndex array, specify series controlled by this brush component.
    geoIndex: null,
    //
    xAxisIndex: null,
    yAxisIndex: null,
    brushType: 'rect',
    // Default brushType, see BrushController.
    brushMode: 'single',
    // Default brushMode, 'single' or 'multiple'
    transformable: true,
    // Default transformable.
    brushStyle: {
      // Default brushStyle
      borderWidth: 1,
      color: 'rgba(120,140,180,0.3)',
      borderColor: 'rgba(120,140,180,0.8)'
    },
    throttleType: 'fixRate',
    // Throttle in brushSelected event. 'fixRate' or 'debounce'.
    // If null, no throttle. Valid only in the first brush component
    throttleDelay: 0,
    // Unit: ms, 0 means every event will be triggered.
    // FIXME
    // 试验效果
    removeOnClick: true,
    z: 10000
  },

  /**
   * @readOnly
   * @type {Array.<Object>}
   */
  areas: [],

  /**
   * Current activated brush type.
   * If null, brush is inactived.
   * see module:echarts/component/helper/BrushController
   * @readOnly
   * @type {string}
   */
  brushType: null,

  /**
   * Current brush opt.
   * see module:echarts/component/helper/BrushController
   * @readOnly
   * @type {Object}
   */
  brushOption: {},

  /**
   * @readOnly
   * @type {Array.<Object>}
   */
  coordInfoList: [],
  optionUpdated: function (newOption, isInit) {
    var thisOption = this.option;
    !isInit && visualSolution.replaceVisualOption(thisOption, newOption, ['inBrush', 'outOfBrush']);
    var inBrush = thisOption.inBrush = thisOption.inBrush || {}; // Always give default visual, consider setOption at the second time.

    thisOption.outOfBrush = thisOption.outOfBrush || {
      color: DEFAULT_OUT_OF_BRUSH_COLOR
    };

    if (!inBrush.hasOwnProperty('liftZ')) {
      // Bigger than the highlight z lift, otherwise it will
      // be effected by the highlight z when brush.
      inBrush.liftZ = 5;
    }
  },

  /**
   * If ranges is null/undefined, range state remain.
   *
   * @param {Array.<Object>} [ranges]
   */
  setAreas: function (areas) {
    // If ranges is null/undefined, range state remain.
    // This helps user to dispatchAction({type: 'brush'}) with no areas
    // set but just want to get the current brush select info from a `brush` event.
    if (!areas) {
      return;
    }

    this.areas = zrUtil.map(areas, function (area) {
      return generateBrushOption(this.option, area);
    }, this);
  },

  /**
   * see module:echarts/component/helper/BrushController
   * @param {Object} brushOption
   */
  setBrushOption: function (brushOption) {
    this.brushOption = generateBrushOption(this.option, brushOption);
    this.brushType = this.brushOption.brushType;
  }
});

function generateBrushOption(option, brushOption) {
  return zrUtil.merge({
    brushType: option.brushType,
    brushMode: option.brushMode,
    transformable: option.transformable,
    brushStyle: new Model(option.brushStyle).getItemStyle(),
    removeOnClick: option.removeOnClick,
    z: option.z
  }, brushOption, true);
}

var _default = BrushModel;
module.exports = _default;

/***/ }),

/***/ "f5e6":
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

__webpack_require__("1ccf");

__webpack_require__("b419");

/***/ }),

/***/ "fab2":
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

var retrieve = _util.retrieve;
var defaults = _util.defaults;
var extend = _util.extend;
var each = _util.each;
var map = _util.map;

var formatUtil = __webpack_require__("eda2");

var graphic = __webpack_require__("2306");

var Model = __webpack_require__("4319");

var _number = __webpack_require__("3842");

var isRadianAroundZero = _number.isRadianAroundZero;
var remRadian = _number.remRadian;

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var matrixUtil = __webpack_require__("1687");

var _vector = __webpack_require__("401b");

var v2ApplyTransform = _vector.applyTransform;

var _axisHelper = __webpack_require__("697e");

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
var PI = Math.PI;
/**
 * A final axis is translated and rotated from a "standard axis".
 * So opt.position and opt.rotation is required.
 *
 * A standard axis is and axis from [0, 0] to [0, axisExtent[1]],
 * for example: (0, 0) ------------> (0, 50)
 *
 * nameDirection or tickDirection or labelDirection is 1 means tick
 * or label is below the standard axis, whereas is -1 means above
 * the standard axis. labelOffset means offset between label and axis,
 * which is useful when 'onZero', where axisLabel is in the grid and
 * label in outside grid.
 *
 * Tips: like always,
 * positive rotation represents anticlockwise, and negative rotation
 * represents clockwise.
 * The direction of position coordinate is the same as the direction
 * of screen coordinate.
 *
 * Do not need to consider axis 'inverse', which is auto processed by
 * axis extent.
 *
 * @param {module:zrender/container/Group} group
 * @param {Object} axisModel
 * @param {Object} opt Standard axis parameters.
 * @param {Array.<number>} opt.position [x, y]
 * @param {number} opt.rotation by radian
 * @param {number} [opt.nameDirection=1] 1 or -1 Used when nameLocation is 'middle' or 'center'.
 * @param {number} [opt.tickDirection=1] 1 or -1
 * @param {number} [opt.labelDirection=1] 1 or -1
 * @param {number} [opt.labelOffset=0] Usefull when onZero.
 * @param {string} [opt.axisLabelShow] default get from axisModel.
 * @param {string} [opt.axisName] default get from axisModel.
 * @param {number} [opt.axisNameAvailableWidth]
 * @param {number} [opt.labelRotate] by degree, default get from axisModel.
 * @param {number} [opt.strokeContainThreshold] Default label interval when label
 * @param {number} [opt.nameTruncateMaxWidth]
 */

var AxisBuilder = function (axisModel, opt) {
  /**
   * @readOnly
   */
  this.opt = opt;
  /**
   * @readOnly
   */

  this.axisModel = axisModel; // Default value

  defaults(opt, {
    labelOffset: 0,
    nameDirection: 1,
    tickDirection: 1,
    labelDirection: 1,
    silent: true
  });
  /**
   * @readOnly
   */

  this.group = new graphic.Group(); // FIXME Not use a seperate text group?

  var dumbGroup = new graphic.Group({
    position: opt.position.slice(),
    rotation: opt.rotation
  }); // this.group.add(dumbGroup);
  // this._dumbGroup = dumbGroup;

  dumbGroup.updateTransform();
  this._transform = dumbGroup.transform;
  this._dumbGroup = dumbGroup;
};

AxisBuilder.prototype = {
  constructor: AxisBuilder,
  hasBuilder: function (name) {
    return !!builders[name];
  },
  add: function (name) {
    builders[name].call(this);
  },
  getGroup: function () {
    return this.group;
  }
};
var builders = {
  /**
   * @private
   */
  axisLine: function () {
    var opt = this.opt;
    var axisModel = this.axisModel;

    if (!axisModel.get('axisLine.show')) {
      return;
    }

    var extent = this.axisModel.axis.getExtent();
    var matrix = this._transform;
    var pt1 = [extent[0], 0];
    var pt2 = [extent[1], 0];

    if (matrix) {
      v2ApplyTransform(pt1, pt1, matrix);
      v2ApplyTransform(pt2, pt2, matrix);
    }

    var lineStyle = extend({
      lineCap: 'round'
    }, axisModel.getModel('axisLine.lineStyle').getLineStyle());
    this.group.add(new graphic.Line({
      // Id for animation
      anid: 'line',
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: lineStyle,
      strokeContainThreshold: opt.strokeContainThreshold || 5,
      silent: true,
      z2: 1
    }));
    var arrows = axisModel.get('axisLine.symbol');
    var arrowSize = axisModel.get('axisLine.symbolSize');
    var arrowOffset = axisModel.get('axisLine.symbolOffset') || 0;

    if (typeof arrowOffset === 'number') {
      arrowOffset = [arrowOffset, arrowOffset];
    }

    if (arrows != null) {
      if (typeof arrows === 'string') {
        // Use the same arrow for start and end point
        arrows = [arrows, arrows];
      }

      if (typeof arrowSize === 'string' || typeof arrowSize === 'number') {
        // Use the same size for width and height
        arrowSize = [arrowSize, arrowSize];
      }

      var symbolWidth = arrowSize[0];
      var symbolHeight = arrowSize[1];
      each([{
        rotate: opt.rotation + Math.PI / 2,
        offset: arrowOffset[0],
        r: 0
      }, {
        rotate: opt.rotation - Math.PI / 2,
        offset: arrowOffset[1],
        r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
      }], function (point, index) {
        if (arrows[index] !== 'none' && arrows[index] != null) {
          var symbol = createSymbol(arrows[index], -symbolWidth / 2, -symbolHeight / 2, symbolWidth, symbolHeight, lineStyle.stroke, true); // Calculate arrow position with offset

          var r = point.r + point.offset;
          var pos = [pt1[0] + r * Math.cos(opt.rotation), pt1[1] - r * Math.sin(opt.rotation)];
          symbol.attr({
            rotation: point.rotate,
            position: pos,
            silent: true,
            z2: 11
          });
          this.group.add(symbol);
        }
      }, this);
    }
  },

  /**
   * @private
   */
  axisTickLabel: function () {
    var axisModel = this.axisModel;
    var opt = this.opt;
    var ticksEls = buildAxisMajorTicks(this, axisModel, opt);
    var labelEls = buildAxisLabel(this, axisModel, opt);
    fixMinMaxLabelShow(axisModel, labelEls, ticksEls);
    buildAxisMinorTicks(this, axisModel, opt);
  },

  /**
   * @private
   */
  axisName: function () {
    var opt = this.opt;
    var axisModel = this.axisModel;
    var name = retrieve(opt.axisName, axisModel.get('name'));

    if (!name) {
      return;
    }

    var nameLocation = axisModel.get('nameLocation');
    var nameDirection = opt.nameDirection;
    var textStyleModel = axisModel.getModel('nameTextStyle');
    var gap = axisModel.get('nameGap') || 0;
    var extent = this.axisModel.axis.getExtent();
    var gapSignal = extent[0] > extent[1] ? -1 : 1;
    var pos = [nameLocation === 'start' ? extent[0] - gapSignal * gap : nameLocation === 'end' ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2, // 'middle'
    // Reuse labelOffset.
    isNameLocationCenter(nameLocation) ? opt.labelOffset + nameDirection * gap : 0];
    var labelLayout;
    var nameRotation = axisModel.get('nameRotate');

    if (nameRotation != null) {
      nameRotation = nameRotation * PI / 180; // To radian.
    }

    var axisNameAvailableWidth;

    if (isNameLocationCenter(nameLocation)) {
      labelLayout = innerTextLayout(opt.rotation, nameRotation != null ? nameRotation : opt.rotation, // Adapt to axis.
      nameDirection);
    } else {
      labelLayout = endTextLayout(opt, nameLocation, nameRotation || 0, extent);
      axisNameAvailableWidth = opt.axisNameAvailableWidth;

      if (axisNameAvailableWidth != null) {
        axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
        !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
      }
    }

    var textFont = textStyleModel.getFont();
    var truncateOpt = axisModel.get('nameTruncate', true) || {};
    var ellipsis = truncateOpt.ellipsis;
    var maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth); // FIXME
    // truncate rich text? (consider performance)

    var truncatedText = ellipsis != null && maxWidth != null ? formatUtil.truncateText(name, maxWidth, textFont, ellipsis, {
      minChar: 2,
      placeholder: truncateOpt.placeholder
    }) : name;
    var tooltipOpt = axisModel.get('tooltip', true);
    var mainType = axisModel.mainType;
    var formatterParams = {
      componentType: mainType,
      name: name,
      $vars: ['name']
    };
    formatterParams[mainType + 'Index'] = axisModel.componentIndex;
    var textEl = new graphic.Text({
      // Id for animation
      anid: 'name',
      __fullText: name,
      __truncatedText: truncatedText,
      position: pos,
      rotation: labelLayout.rotation,
      silent: isLabelSilent(axisModel),
      z2: 1,
      tooltip: tooltipOpt && tooltipOpt.show ? extend({
        content: name,
        formatter: function () {
          return name;
        },
        formatterParams: formatterParams
      }, tooltipOpt) : null
    });
    graphic.setTextStyle(textEl.style, textStyleModel, {
      text: truncatedText,
      textFont: textFont,
      textFill: textStyleModel.getTextColor() || axisModel.get('axisLine.lineStyle.color'),
      textAlign: textStyleModel.get('align') || labelLayout.textAlign,
      textVerticalAlign: textStyleModel.get('verticalAlign') || labelLayout.textVerticalAlign
    });

    if (axisModel.get('triggerEvent')) {
      textEl.eventData = makeAxisEventDataBase(axisModel);
      textEl.eventData.targetType = 'axisName';
      textEl.eventData.name = name;
    } // FIXME


    this._dumbGroup.add(textEl);

    textEl.updateTransform();
    this.group.add(textEl);
    textEl.decomposeTransform();
  }
};

var makeAxisEventDataBase = AxisBuilder.makeAxisEventDataBase = function (axisModel) {
  var eventData = {
    componentType: axisModel.mainType,
    componentIndex: axisModel.componentIndex
  };
  eventData[axisModel.mainType + 'Index'] = axisModel.componentIndex;
  return eventData;
};
/**
 * @public
 * @static
 * @param {Object} opt
 * @param {number} axisRotation in radian
 * @param {number} textRotation in radian
 * @param {number} direction
 * @return {Object} {
 *  rotation, // according to axis
 *  textAlign,
 *  textVerticalAlign
 * }
 */


var innerTextLayout = AxisBuilder.innerTextLayout = function (axisRotation, textRotation, direction) {
  var rotationDiff = remRadian(textRotation - axisRotation);
  var textAlign;
  var textVerticalAlign;

  if (isRadianAroundZero(rotationDiff)) {
    // Label is parallel with axis line.
    textVerticalAlign = direction > 0 ? 'top' : 'bottom';
    textAlign = 'center';
  } else if (isRadianAroundZero(rotationDiff - PI)) {
    // Label is inverse parallel with axis line.
    textVerticalAlign = direction > 0 ? 'bottom' : 'top';
    textAlign = 'center';
  } else {
    textVerticalAlign = 'middle';

    if (rotationDiff > 0 && rotationDiff < PI) {
      textAlign = direction > 0 ? 'right' : 'left';
    } else {
      textAlign = direction > 0 ? 'left' : 'right';
    }
  }

  return {
    rotation: rotationDiff,
    textAlign: textAlign,
    textVerticalAlign: textVerticalAlign
  };
};

function endTextLayout(opt, textPosition, textRotate, extent) {
  var rotationDiff = remRadian(textRotate - opt.rotation);
  var textAlign;
  var textVerticalAlign;
  var inverse = extent[0] > extent[1];
  var onLeft = textPosition === 'start' && !inverse || textPosition !== 'start' && inverse;

  if (isRadianAroundZero(rotationDiff - PI / 2)) {
    textVerticalAlign = onLeft ? 'bottom' : 'top';
    textAlign = 'center';
  } else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
    textVerticalAlign = onLeft ? 'top' : 'bottom';
    textAlign = 'center';
  } else {
    textVerticalAlign = 'middle';

    if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
      textAlign = onLeft ? 'left' : 'right';
    } else {
      textAlign = onLeft ? 'right' : 'left';
    }
  }

  return {
    rotation: rotationDiff,
    textAlign: textAlign,
    textVerticalAlign: textVerticalAlign
  };
}

var isLabelSilent = AxisBuilder.isLabelSilent = function (axisModel) {
  var tooltipOpt = axisModel.get('tooltip');
  return axisModel.get('silent') // Consider mouse cursor, add these restrictions.
  || !(axisModel.get('triggerEvent') || tooltipOpt && tooltipOpt.show);
};

function fixMinMaxLabelShow(axisModel, labelEls, tickEls) {
  if (shouldShowAllLabels(axisModel.axis)) {
    return;
  } // If min or max are user set, we need to check
  // If the tick on min(max) are overlap on their neighbour tick
  // If they are overlapped, we need to hide the min(max) tick label


  var showMinLabel = axisModel.get('axisLabel.showMinLabel');
  var showMaxLabel = axisModel.get('axisLabel.showMaxLabel'); // FIXME
  // Have not consider onBand yet, where tick els is more than label els.

  labelEls = labelEls || [];
  tickEls = tickEls || [];
  var firstLabel = labelEls[0];
  var nextLabel = labelEls[1];
  var lastLabel = labelEls[labelEls.length - 1];
  var prevLabel = labelEls[labelEls.length - 2];
  var firstTick = tickEls[0];
  var nextTick = tickEls[1];
  var lastTick = tickEls[tickEls.length - 1];
  var prevTick = tickEls[tickEls.length - 2];

  if (showMinLabel === false) {
    ignoreEl(firstLabel);
    ignoreEl(firstTick);
  } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
    if (showMinLabel) {
      ignoreEl(nextLabel);
      ignoreEl(nextTick);
    } else {
      ignoreEl(firstLabel);
      ignoreEl(firstTick);
    }
  }

  if (showMaxLabel === false) {
    ignoreEl(lastLabel);
    ignoreEl(lastTick);
  } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
    if (showMaxLabel) {
      ignoreEl(prevLabel);
      ignoreEl(prevTick);
    } else {
      ignoreEl(lastLabel);
      ignoreEl(lastTick);
    }
  }
}

function ignoreEl(el) {
  el && (el.ignore = true);
}

function isTwoLabelOverlapped(current, next, labelLayout) {
  // current and next has the same rotation.
  var firstRect = current && current.getBoundingRect().clone();
  var nextRect = next && next.getBoundingRect().clone();

  if (!firstRect || !nextRect) {
    return;
  } // When checking intersect of two rotated labels, we use mRotationBack
  // to avoid that boundingRect is enlarge when using `boundingRect.applyTransform`.


  var mRotationBack = matrixUtil.identity([]);
  matrixUtil.rotate(mRotationBack, mRotationBack, -current.rotation);
  firstRect.applyTransform(matrixUtil.mul([], mRotationBack, current.getLocalTransform()));
  nextRect.applyTransform(matrixUtil.mul([], mRotationBack, next.getLocalTransform()));
  return firstRect.intersect(nextRect);
}

function isNameLocationCenter(nameLocation) {
  return nameLocation === 'middle' || nameLocation === 'center';
}

function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, aniid) {
  var tickEls = [];
  var pt1 = [];
  var pt2 = [];

  for (var i = 0; i < ticksCoords.length; i++) {
    var tickCoord = ticksCoords[i].coord;
    pt1[0] = tickCoord;
    pt1[1] = 0;
    pt2[0] = tickCoord;
    pt2[1] = tickEndCoord;

    if (tickTransform) {
      v2ApplyTransform(pt1, pt1, tickTransform);
      v2ApplyTransform(pt2, pt2, tickTransform);
    } // Tick line, Not use group transform to have better line draw


    var tickEl = new graphic.Line({
      // Id for animation
      anid: aniid + '_' + ticksCoords[i].tickValue,
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: tickLineStyle,
      z2: 2,
      silent: true
    });
    tickEls.push(tickEl);
  }

  return tickEls;
}

function buildAxisMajorTicks(axisBuilder, axisModel, opt) {
  var axis = axisModel.axis;
  var tickModel = axisModel.getModel('axisTick');

  if (!tickModel.get('show') || axis.scale.isBlank()) {
    return;
  }

  var lineStyleModel = tickModel.getModel('lineStyle');
  var tickEndCoord = opt.tickDirection * tickModel.get('length');
  var ticksCoords = axis.getTicksCoords();
  var ticksEls = createTicks(ticksCoords, axisBuilder._transform, tickEndCoord, defaults(lineStyleModel.getLineStyle(), {
    stroke: axisModel.get('axisLine.lineStyle.color')
  }), 'ticks');

  for (var i = 0; i < ticksEls.length; i++) {
    axisBuilder.group.add(ticksEls[i]);
  }

  return ticksEls;
}

function buildAxisMinorTicks(axisBuilder, axisModel, opt) {
  var axis = axisModel.axis;
  var minorTickModel = axisModel.getModel('minorTick');

  if (!minorTickModel.get('show') || axis.scale.isBlank()) {
    return;
  }

  var minorTicksCoords = axis.getMinorTicksCoords();

  if (!minorTicksCoords.length) {
    return;
  }

  var lineStyleModel = minorTickModel.getModel('lineStyle');
  var tickEndCoord = opt.tickDirection * minorTickModel.get('length');
  var minorTickLineStyle = defaults(lineStyleModel.getLineStyle(), defaults(axisModel.getModel('axisTick').getLineStyle(), {
    stroke: axisModel.get('axisLine.lineStyle.color')
  }));

  for (var i = 0; i < minorTicksCoords.length; i++) {
    var minorTicksEls = createTicks(minorTicksCoords[i], axisBuilder._transform, tickEndCoord, minorTickLineStyle, 'minorticks_' + i);

    for (var k = 0; k < minorTicksEls.length; k++) {
      axisBuilder.group.add(minorTicksEls[k]);
    }
  }
}

function buildAxisLabel(axisBuilder, axisModel, opt) {
  var axis = axisModel.axis;
  var show = retrieve(opt.axisLabelShow, axisModel.get('axisLabel.show'));

  if (!show || axis.scale.isBlank()) {
    return;
  }

  var labelModel = axisModel.getModel('axisLabel');
  var labelMargin = labelModel.get('margin');
  var labels = axis.getViewLabels(); // Special label rotate.

  var labelRotation = (retrieve(opt.labelRotate, labelModel.get('rotate')) || 0) * PI / 180;
  var labelLayout = innerTextLayout(opt.rotation, labelRotation, opt.labelDirection);
  var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
  var labelEls = [];
  var silent = isLabelSilent(axisModel);
  var triggerEvent = axisModel.get('triggerEvent');
  each(labels, function (labelItem, index) {
    var tickValue = labelItem.tickValue;
    var formattedLabel = labelItem.formattedLabel;
    var rawLabel = labelItem.rawLabel;
    var itemLabelModel = labelModel;

    if (rawCategoryData && rawCategoryData[tickValue] && rawCategoryData[tickValue].textStyle) {
      itemLabelModel = new Model(rawCategoryData[tickValue].textStyle, labelModel, axisModel.ecModel);
    }

    var textColor = itemLabelModel.getTextColor() || axisModel.get('axisLine.lineStyle.color');
    var tickCoord = axis.dataToCoord(tickValue);
    var pos = [tickCoord, opt.labelOffset + opt.labelDirection * labelMargin];
    var textEl = new graphic.Text({
      // Id for animation
      anid: 'label_' + tickValue,
      position: pos,
      rotation: labelLayout.rotation,
      silent: silent,
      z2: 10
    });
    graphic.setTextStyle(textEl.style, itemLabelModel, {
      text: formattedLabel,
      textAlign: itemLabelModel.getShallow('align', true) || labelLayout.textAlign,
      textVerticalAlign: itemLabelModel.getShallow('verticalAlign', true) || itemLabelModel.getShallow('baseline', true) || labelLayout.textVerticalAlign,
      textFill: typeof textColor === 'function' ? textColor( // (1) In category axis with data zoom, tick is not the original
      // index of axis.data. So tick should not be exposed to user
      // in category axis.
      // (2) Compatible with previous version, which always use formatted label as
      // input. But in interval scale the formatted label is like '223,445', which
      // maked user repalce ','. So we modify it to return original val but remain
      // it as 'string' to avoid error in replacing.
      axis.type === 'category' ? rawLabel : axis.type === 'value' ? tickValue + '' : tickValue, index) : textColor
    }); // Pack data for mouse event

    if (triggerEvent) {
      textEl.eventData = makeAxisEventDataBase(axisModel);
      textEl.eventData.targetType = 'axisLabel';
      textEl.eventData.value = rawLabel;
    } // FIXME


    axisBuilder._dumbGroup.add(textEl);

    textEl.updateTransform();
    labelEls.push(textEl);
    axisBuilder.group.add(textEl);
    textEl.decomposeTransform();
  });
  return labelEls;
}

var _default = AxisBuilder;
module.exports = _default;

/***/ }),

/***/ "ff2e":
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

var textContain = __webpack_require__("e86a");

var formatUtil = __webpack_require__("eda2");

var matrix = __webpack_require__("1687");

var axisHelper = __webpack_require__("697e");

var AxisBuilder = __webpack_require__("fab2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @param {module:echarts/model/Model} axisPointerModel
 */
function buildElStyle(axisPointerModel) {
  var axisPointerType = axisPointerModel.get('type');
  var styleModel = axisPointerModel.getModel(axisPointerType + 'Style');
  var style;

  if (axisPointerType === 'line') {
    style = styleModel.getLineStyle();
    style.fill = null;
  } else if (axisPointerType === 'shadow') {
    style = styleModel.getAreaStyle();
    style.stroke = null;
  }

  return style;
}
/**
 * @param {Function} labelPos {align, verticalAlign, position}
 */


function buildLabelElOption(elOption, axisModel, axisPointerModel, api, labelPos) {
  var value = axisPointerModel.get('value');
  var text = getValueLabel(value, axisModel.axis, axisModel.ecModel, axisPointerModel.get('seriesDataIndices'), {
    precision: axisPointerModel.get('label.precision'),
    formatter: axisPointerModel.get('label.formatter')
  });
  var labelModel = axisPointerModel.getModel('label');
  var paddings = formatUtil.normalizeCssArray(labelModel.get('padding') || 0);
  var font = labelModel.getFont();
  var textRect = textContain.getBoundingRect(text, font);
  var position = labelPos.position;
  var width = textRect.width + paddings[1] + paddings[3];
  var height = textRect.height + paddings[0] + paddings[2]; // Adjust by align.

  var align = labelPos.align;
  align === 'right' && (position[0] -= width);
  align === 'center' && (position[0] -= width / 2);
  var verticalAlign = labelPos.verticalAlign;
  verticalAlign === 'bottom' && (position[1] -= height);
  verticalAlign === 'middle' && (position[1] -= height / 2); // Not overflow ec container

  confineInContainer(position, width, height, api);
  var bgColor = labelModel.get('backgroundColor');

  if (!bgColor || bgColor === 'auto') {
    bgColor = axisModel.get('axisLine.lineStyle.color');
  }

  elOption.label = {
    shape: {
      x: 0,
      y: 0,
      width: width,
      height: height,
      r: labelModel.get('borderRadius')
    },
    position: position.slice(),
    // TODO: rich
    style: {
      text: text,
      textFont: font,
      textFill: labelModel.getTextColor(),
      textPosition: 'inside',
      textPadding: paddings,
      fill: bgColor,
      stroke: labelModel.get('borderColor') || 'transparent',
      lineWidth: labelModel.get('borderWidth') || 0,
      shadowBlur: labelModel.get('shadowBlur'),
      shadowColor: labelModel.get('shadowColor'),
      shadowOffsetX: labelModel.get('shadowOffsetX'),
      shadowOffsetY: labelModel.get('shadowOffsetY')
    },
    // Lable should be over axisPointer.
    z2: 10
  };
} // Do not overflow ec container


function confineInContainer(position, width, height, api) {
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  position[0] = Math.min(position[0] + width, viewWidth) - width;
  position[1] = Math.min(position[1] + height, viewHeight) - height;
  position[0] = Math.max(position[0], 0);
  position[1] = Math.max(position[1], 0);
}
/**
 * @param {number} value
 * @param {module:echarts/coord/Axis} axis
 * @param {module:echarts/model/Global} ecModel
 * @param {Object} opt
 * @param {Array.<Object>} seriesDataIndices
 * @param {number|string} opt.precision 'auto' or a number
 * @param {string|Function} opt.formatter label formatter
 */


function getValueLabel(value, axis, ecModel, seriesDataIndices, opt) {
  value = axis.scale.parse(value);
  var text = axis.scale.getLabel( // If `precision` is set, width can be fixed (like '12.00500'), which
  // helps to debounce when when moving label.
  value, {
    precision: opt.precision
  });
  var formatter = opt.formatter;

  if (formatter) {
    var params = {
      value: axisHelper.getAxisRawValue(axis, value),
      axisDimension: axis.dim,
      axisIndex: axis.index,
      seriesData: []
    };
    zrUtil.each(seriesDataIndices, function (idxItem) {
      var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
      var dataIndex = idxItem.dataIndexInside;
      var dataParams = series && series.getDataParams(dataIndex);
      dataParams && params.seriesData.push(dataParams);
    });

    if (zrUtil.isString(formatter)) {
      text = formatter.replace('{value}', text);
    } else if (zrUtil.isFunction(formatter)) {
      text = formatter(params);
    }
  }

  return text;
}
/**
 * @param {module:echarts/coord/Axis} axis
 * @param {number} value
 * @param {Object} layoutInfo {
 *  rotation, position, labelOffset, labelDirection, labelMargin
 * }
 */


function getTransformedPosition(axis, value, layoutInfo) {
  var transform = matrix.create();
  matrix.rotate(transform, transform, layoutInfo.rotation);
  matrix.translate(transform, transform, layoutInfo.position);
  return graphic.applyTransform([axis.dataToCoord(value), (layoutInfo.labelOffset || 0) + (layoutInfo.labelDirection || 1) * (layoutInfo.labelMargin || 0)], transform);
}

function buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api) {
  var textLayout = AxisBuilder.innerTextLayout(layoutInfo.rotation, 0, layoutInfo.labelDirection);
  layoutInfo.labelMargin = axisPointerModel.get('label.margin');
  buildLabelElOption(elOption, axisModel, axisPointerModel, api, {
    position: getTransformedPosition(axisModel.axis, value, layoutInfo),
    align: textLayout.textAlign,
    verticalAlign: textLayout.textVerticalAlign
  });
}
/**
 * @param {Array.<number>} p1
 * @param {Array.<number>} p2
 * @param {number} [xDimIndex=0] or 1
 */


function makeLineShape(p1, p2, xDimIndex) {
  xDimIndex = xDimIndex || 0;
  return {
    x1: p1[xDimIndex],
    y1: p1[1 - xDimIndex],
    x2: p2[xDimIndex],
    y2: p2[1 - xDimIndex]
  };
}
/**
 * @param {Array.<number>} xy
 * @param {Array.<number>} wh
 * @param {number} [xDimIndex=0] or 1
 */


function makeRectShape(xy, wh, xDimIndex) {
  xDimIndex = xDimIndex || 0;
  return {
    x: xy[xDimIndex],
    y: xy[1 - xDimIndex],
    width: wh[xDimIndex],
    height: wh[1 - xDimIndex]
  };
}

function makeSectorShape(cx, cy, r0, r, startAngle, endAngle) {
  return {
    cx: cx,
    cy: cy,
    r0: r0,
    r: r,
    startAngle: startAngle,
    endAngle: endAngle,
    clockwise: true
  };
}

exports.buildElStyle = buildElStyle;
exports.buildLabelElOption = buildLabelElOption;
exports.getValueLabel = getValueLabel;
exports.getTransformedPosition = getTransformedPosition;
exports.buildCartesianSingleLabelElOption = buildCartesianSingleLabelElOption;
exports.makeLineShape = makeLineShape;
exports.makeRectShape = makeRectShape;
exports.makeSectorShape = makeSectorShape;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~41ff223c.24cabf8b.js.map