(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~26381bd2"],{

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

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~26381bd2.a515f708.js.map