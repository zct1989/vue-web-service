(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~41ff223c"],{

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

var axisTrigger = __webpack_require__("eb6b1");

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

/***/ "eb6b1":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
//# sourceMappingURL=chunk-vendors~41ff223c.9e42ee07.js.map