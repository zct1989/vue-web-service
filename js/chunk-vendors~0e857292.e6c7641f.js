(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~0e857292"],{

/***/ "007d":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("cb8f");

__webpack_require__("a96b");

__webpack_require__("42f6");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME Better way to pack data in graphic element

/**
 * @action
 * @property {string} type
 * @property {number} seriesIndex
 * @property {number} dataIndex
 * @property {number} [x]
 * @property {number} [y]
 */
echarts.registerAction({
  type: 'showTip',
  event: 'showTip',
  update: 'tooltip:manuallyShowTip'
}, // noop
function () {});
echarts.registerAction({
  type: 'hideTip',
  event: 'hideTip',
  update: 'tooltip:manuallyHideTip'
}, // noop
function () {});

/***/ }),

/***/ "07d7":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var zrColor = __webpack_require__("41ef");

var eventUtil = __webpack_require__("607d");

var env = __webpack_require__("22d1");

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
var each = zrUtil.each;
var toCamelCase = formatUtil.toCamelCase;
var vendors = ['', '-webkit-', '-moz-', '-o-'];
var gCssText = 'position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;';
/**
 * @param {number} duration
 * @return {string}
 * @inner
 */

function assembleTransition(duration) {
  var transitionCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
  var transitionText = 'left ' + duration + 's ' + transitionCurve + ',' + 'top ' + duration + 's ' + transitionCurve;
  return zrUtil.map(vendors, function (vendorPrefix) {
    return vendorPrefix + 'transition:' + transitionText;
  }).join(';');
}
/**
 * @param {Object} textStyle
 * @return {string}
 * @inner
 */


function assembleFont(textStyleModel) {
  var cssText = [];
  var fontSize = textStyleModel.get('fontSize');
  var color = textStyleModel.getTextColor();
  color && cssText.push('color:' + color);
  cssText.push('font:' + textStyleModel.getFont());
  fontSize && cssText.push('line-height:' + Math.round(fontSize * 3 / 2) + 'px');
  each(['decoration', 'align'], function (name) {
    var val = textStyleModel.get(name);
    val && cssText.push('text-' + name + ':' + val);
  });
  return cssText.join(';');
}
/**
 * @param {Object} tooltipModel
 * @return {string}
 * @inner
 */


function assembleCssText(tooltipModel) {
  var cssText = [];
  var transitionDuration = tooltipModel.get('transitionDuration');
  var backgroundColor = tooltipModel.get('backgroundColor');
  var textStyleModel = tooltipModel.getModel('textStyle');
  var padding = tooltipModel.get('padding'); // Animation transition. Do not animate when transitionDuration is 0.

  transitionDuration && cssText.push(assembleTransition(transitionDuration));

  if (backgroundColor) {
    if (env.canvasSupported) {
      cssText.push('background-Color:' + backgroundColor);
    } else {
      // for ie
      cssText.push('background-Color:#' + zrColor.toHex(backgroundColor));
      cssText.push('filter:alpha(opacity=70)');
    }
  } // Border style


  each(['width', 'color', 'radius'], function (name) {
    var borderName = 'border-' + name;
    var camelCase = toCamelCase(borderName);
    var val = tooltipModel.get(camelCase);
    val != null && cssText.push(borderName + ':' + val + (name === 'color' ? '' : 'px'));
  }); // Text style

  cssText.push(assembleFont(textStyleModel)); // Padding

  if (padding != null) {
    cssText.push('padding:' + formatUtil.normalizeCssArray(padding).join('px ') + 'px');
  }

  return cssText.join(';') + ';';
}
/**
 * @alias module:echarts/component/tooltip/TooltipContent
 * @constructor
 */


function TooltipContent(container, api) {
  if (env.wxa) {
    return null;
  }

  var el = document.createElement('div');
  var zr = this._zr = api.getZr();
  this.el = el;
  this._x = api.getWidth() / 2;
  this._y = api.getHeight() / 2;
  container.appendChild(el);
  this._container = container;
  this._show = false;
  /**
   * @private
   */

  this._hideTimeout; // FIXME
  // Is it needed to trigger zr event manually if
  // the browser do not support `pointer-events: none`.

  var self = this;

  el.onmouseenter = function () {
    // clear the timeout in hideLater and keep showing tooltip
    if (self._enterable) {
      clearTimeout(self._hideTimeout);
      self._show = true;
    }

    self._inContent = true;
  };

  el.onmousemove = function (e) {
    e = e || window.event;

    if (!self._enterable) {
      // `pointer-events: none` is set to tooltip content div
      // if `enterable` is set as `false`, and `el.onmousemove`
      // can not be triggered. But in browser that do not
      // support `pointer-events`, we need to do this:
      // Try trigger zrender event to avoid mouse
      // in and out shape too frequently
      var handler = zr.handler;
      eventUtil.normalizeEvent(container, e, true);
      handler.dispatch('mousemove', e);
    }
  };

  el.onmouseleave = function () {
    if (self._enterable) {
      if (self._show) {
        self.hideLater(self._hideDelay);
      }
    }

    self._inContent = false;
  };
}

TooltipContent.prototype = {
  constructor: TooltipContent,

  /**
   * @private
   * @type {boolean}
   */
  _enterable: true,

  /**
   * Update when tooltip is rendered
   */
  update: function () {
    // FIXME
    // Move this logic to ec main?
    var container = this._container;
    var stl = container.currentStyle || document.defaultView.getComputedStyle(container);
    var domStyle = container.style;

    if (domStyle.position !== 'absolute' && stl.position !== 'absolute') {
      domStyle.position = 'relative';
    } // Hide the tooltip
    // PENDING
    // this.hide();

  },
  show: function (tooltipModel) {
    clearTimeout(this._hideTimeout);
    var el = this.el;
    el.style.cssText = gCssText + assembleCssText(tooltipModel) // Because of the reason described in:
    // http://stackoverflow.com/questions/21125587/css3-transition-not-working-in-chrome-anymore
    // we should set initial value to `left` and `top`.
    + ';left:' + this._x + 'px;top:' + this._y + 'px;' + (tooltipModel.get('extraCssText') || '');
    el.style.display = el.innerHTML ? 'block' : 'none'; // If mouse occsionally move over the tooltip, a mouseout event will be
    // triggered by canvas, and cuase some unexpectable result like dragging
    // stop, "unfocusAdjacency". Here `pointer-events: none` is used to solve
    // it. Although it is not suppored by IE8~IE10, fortunately it is a rare
    // scenario.

    el.style.pointerEvents = this._enterable ? 'auto' : 'none';
    this._show = true;
  },
  setContent: function (content) {
    this.el.innerHTML = content == null ? '' : content;
  },
  setEnterable: function (enterable) {
    this._enterable = enterable;
  },
  getSize: function () {
    var el = this.el;
    return [el.clientWidth, el.clientHeight];
  },
  moveTo: function (x, y) {
    // xy should be based on canvas root. But tooltipContent is
    // the sibling of canvas root. So padding of ec container
    // should be considered here.
    var zr = this._zr;
    var viewportRootOffset;

    if (zr && zr.painter && (viewportRootOffset = zr.painter.getViewportRootOffset())) {
      x += viewportRootOffset.offsetLeft;
      y += viewportRootOffset.offsetTop;
    }

    var style = this.el.style;
    style.left = x + 'px';
    style.top = y + 'px';
    this._x = x;
    this._y = y;
  },
  hide: function () {
    this.el.style.display = 'none';
    this._show = false;
  },
  hideLater: function (time) {
    if (this._show && !(this._inContent && this._enterable)) {
      if (time) {
        this._hideDelay = time; // Set show false to avoid invoke hideLater mutiple times

        this._show = false;
        this._hideTimeout = setTimeout(zrUtil.bind(this.hide, this), time);
      } else {
        this.hide();
      }
    }
  },
  isShow: function () {
    return this._show;
  },
  getOuterSize: function () {
    var width = this.el.clientWidth;
    var height = this.el.clientHeight; // Consider browser compatibility.
    // IE8 does not support getComputedStyle.

    if (document.defaultView && document.defaultView.getComputedStyle) {
      var stl = document.defaultView.getComputedStyle(this.el);

      if (stl) {
        width += parseInt(stl.borderLeftWidth, 10) + parseInt(stl.borderRightWidth, 10);
        height += parseInt(stl.borderTopWidth, 10) + parseInt(stl.borderBottomWidth, 10);
      }
    }

    return {
      width: width,
      height: height
    };
  }
};
var _default = TooltipContent;
module.exports = _default;

/***/ }),

/***/ "2145":
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
var features = {};

function register(name, ctor) {
  features[name] = ctor;
}

function get(name) {
  return features[name];
}

exports.register = register;
exports.get = get;

/***/ }),

/***/ "42f6":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var env = __webpack_require__("22d1");

var TooltipContent = __webpack_require__("07d7");

var TooltipRichContent = __webpack_require__("82f9");

var formatUtil = __webpack_require__("eda2");

var numberUtil = __webpack_require__("3842");

var graphic = __webpack_require__("2306");

var findPointFromSeries = __webpack_require__("133d");

var layoutUtil = __webpack_require__("f934");

var Model = __webpack_require__("4319");

var globalListener = __webpack_require__("17d6");

var axisHelper = __webpack_require__("697e");

var axisPointerViewHelper = __webpack_require__("ff2e");

var _model = __webpack_require__("e0d3");

var getTooltipRenderMode = _model.getTooltipRenderMode;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var each = zrUtil.each;
var parsePercent = numberUtil.parsePercent;
var proxyRect = new graphic.Rect({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
});

var _default = echarts.extendComponentView({
  type: 'tooltip',
  init: function (ecModel, api) {
    if (env.node) {
      return;
    }

    var tooltipModel = ecModel.getComponent('tooltip');
    var renderMode = tooltipModel.get('renderMode');
    this._renderMode = getTooltipRenderMode(renderMode);
    var tooltipContent;

    if (this._renderMode === 'html') {
      tooltipContent = new TooltipContent(api.getDom(), api);
      this._newLine = '<br/>';
    } else {
      tooltipContent = new TooltipRichContent(api);
      this._newLine = '\n';
    }

    this._tooltipContent = tooltipContent;
  },
  render: function (tooltipModel, ecModel, api) {
    if (env.node) {
      return;
    } // Reset


    this.group.removeAll();
    /**
     * @private
     * @type {module:echarts/component/tooltip/TooltipModel}
     */

    this._tooltipModel = tooltipModel;
    /**
     * @private
     * @type {module:echarts/model/Global}
     */

    this._ecModel = ecModel;
    /**
     * @private
     * @type {module:echarts/ExtensionAPI}
     */

    this._api = api;
    /**
     * Should be cleaned when render.
     * @private
     * @type {Array.<Array.<Object>>}
     */

    this._lastDataByCoordSys = null;
    /**
     * @private
     * @type {boolean}
     */

    this._alwaysShowContent = tooltipModel.get('alwaysShowContent');
    var tooltipContent = this._tooltipContent;
    tooltipContent.update();
    tooltipContent.setEnterable(tooltipModel.get('enterable'));

    this._initGlobalListener();

    this._keepShow();
  },
  _initGlobalListener: function () {
    var tooltipModel = this._tooltipModel;
    var triggerOn = tooltipModel.get('triggerOn');
    globalListener.register('itemTooltip', this._api, bind(function (currTrigger, e, dispatchAction) {
      // If 'none', it is not controlled by mouse totally.
      if (triggerOn !== 'none') {
        if (triggerOn.indexOf(currTrigger) >= 0) {
          this._tryShow(e, dispatchAction);
        } else if (currTrigger === 'leave') {
          this._hide(dispatchAction);
        }
      }
    }, this));
  },
  _keepShow: function () {
    var tooltipModel = this._tooltipModel;
    var ecModel = this._ecModel;
    var api = this._api; // Try to keep the tooltip show when refreshing

    if (this._lastX != null && this._lastY != null // When user is willing to control tooltip totally using API,
    // self.manuallyShowTip({x, y}) might cause tooltip hide,
    // which is not expected.
    && tooltipModel.get('triggerOn') !== 'none') {
      var self = this;
      clearTimeout(this._refreshUpdateTimeout);
      this._refreshUpdateTimeout = setTimeout(function () {
        // Show tip next tick after other charts are rendered
        // In case highlight action has wrong result
        // FIXME
        !api.isDisposed() && self.manuallyShowTip(tooltipModel, ecModel, api, {
          x: self._lastX,
          y: self._lastY
        });
      });
    }
  },

  /**
   * Show tip manually by
   * dispatchAction({
   *     type: 'showTip',
   *     x: 10,
   *     y: 10
   * });
   * Or
   * dispatchAction({
   *      type: 'showTip',
   *      seriesIndex: 0,
   *      dataIndex or dataIndexInside or name
   * });
   *
   *  TODO Batch
   */
  manuallyShowTip: function (tooltipModel, ecModel, api, payload) {
    if (payload.from === this.uid || env.node) {
      return;
    }

    var dispatchAction = makeDispatchAction(payload, api); // Reset ticket

    this._ticket = ''; // When triggered from axisPointer.

    var dataByCoordSys = payload.dataByCoordSys;

    if (payload.tooltip && payload.x != null && payload.y != null) {
      var el = proxyRect;
      el.position = [payload.x, payload.y];
      el.update();
      el.tooltip = payload.tooltip; // Manually show tooltip while view is not using zrender elements.

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        target: el
      }, dispatchAction);
    } else if (dataByCoordSys) {
      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        event: {},
        dataByCoordSys: payload.dataByCoordSys,
        tooltipOption: payload.tooltipOption
      }, dispatchAction);
    } else if (payload.seriesIndex != null) {
      if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload)) {
        return;
      }

      var pointInfo = findPointFromSeries(payload, ecModel);
      var cx = pointInfo.point[0];
      var cy = pointInfo.point[1];

      if (cx != null && cy != null) {
        this._tryShow({
          offsetX: cx,
          offsetY: cy,
          position: payload.position,
          target: pointInfo.el,
          event: {}
        }, dispatchAction);
      }
    } else if (payload.x != null && payload.y != null) {
      // FIXME
      // should wrap dispatchAction like `axisPointer/globalListener` ?
      api.dispatchAction({
        type: 'updateAxisPointer',
        x: payload.x,
        y: payload.y
      });

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        target: api.getZr().findHover(payload.x, payload.y).target,
        event: {}
      }, dispatchAction);
    }
  },
  manuallyHideTip: function (tooltipModel, ecModel, api, payload) {
    var tooltipContent = this._tooltipContent;

    if (!this._alwaysShowContent && this._tooltipModel) {
      tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
    }

    this._lastX = this._lastY = null;

    if (payload.from !== this.uid) {
      this._hide(makeDispatchAction(payload, api));
    }
  },
  // Be compatible with previous design, that is, when tooltip.type is 'axis' and
  // dispatchAction 'showTip' with seriesIndex and dataIndex will trigger axis pointer
  // and tooltip.
  _manuallyAxisShowTip: function (tooltipModel, ecModel, api, payload) {
    var seriesIndex = payload.seriesIndex;
    var dataIndex = payload.dataIndex;
    var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo;

    if (seriesIndex == null || dataIndex == null || coordSysAxesInfo == null) {
      return;
    }

    var seriesModel = ecModel.getSeriesByIndex(seriesIndex);

    if (!seriesModel) {
      return;
    }

    var data = seriesModel.getData();
    var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), seriesModel, (seriesModel.coordinateSystem || {}).model, tooltipModel]);

    if (tooltipModel.get('trigger') !== 'axis') {
      return;
    }

    api.dispatchAction({
      type: 'updateAxisPointer',
      seriesIndex: seriesIndex,
      dataIndex: dataIndex,
      position: payload.position
    });
    return true;
  },
  _tryShow: function (e, dispatchAction) {
    var el = e.target;
    var tooltipModel = this._tooltipModel;

    if (!tooltipModel) {
      return;
    } // Save mouse x, mouse y. So we can try to keep showing the tip if chart is refreshed


    this._lastX = e.offsetX;
    this._lastY = e.offsetY;
    var dataByCoordSys = e.dataByCoordSys;

    if (dataByCoordSys && dataByCoordSys.length) {
      this._showAxisTooltip(dataByCoordSys, e);
    } // Always show item tooltip if mouse is on the element with dataIndex
    else if (el && el.dataIndex != null) {
        this._lastDataByCoordSys = null;

        this._showSeriesItemTooltip(e, el, dispatchAction);
      } // Tooltip provided directly. Like legend.
      else if (el && el.tooltip) {
          this._lastDataByCoordSys = null;

          this._showComponentItemTooltip(e, el, dispatchAction);
        } else {
          this._lastDataByCoordSys = null;

          this._hide(dispatchAction);
        }
  },
  _showOrMove: function (tooltipModel, cb) {
    // showDelay is used in this case: tooltip.enterable is set
    // as true. User intent to move mouse into tooltip and click
    // something. `showDelay` makes it easyer to enter the content
    // but tooltip do not move immediately.
    var delay = tooltipModel.get('showDelay');
    cb = zrUtil.bind(cb, this);
    clearTimeout(this._showTimout);
    delay > 0 ? this._showTimout = setTimeout(cb, delay) : cb();
  },
  _showAxisTooltip: function (dataByCoordSys, e) {
    var ecModel = this._ecModel;
    var globalTooltipModel = this._tooltipModel;
    var point = [e.offsetX, e.offsetY];
    var singleDefaultHTML = [];
    var singleParamsList = [];
    var singleTooltipModel = buildTooltipModel([e.tooltipOption, globalTooltipModel]);
    var renderMode = this._renderMode;
    var newLine = this._newLine;
    var markers = {};
    each(dataByCoordSys, function (itemCoordSys) {
      // var coordParamList = [];
      // var coordDefaultHTML = [];
      // var coordTooltipModel = buildTooltipModel([
      //     e.tooltipOption,
      //     itemCoordSys.tooltipOption,
      //     ecModel.getComponent(itemCoordSys.coordSysMainType, itemCoordSys.coordSysIndex),
      //     globalTooltipModel
      // ]);
      // var displayMode = coordTooltipModel.get('displayMode');
      // var paramsList = displayMode === 'single' ? singleParamsList : [];
      each(itemCoordSys.dataByAxis, function (item) {
        var axisModel = ecModel.getComponent(item.axisDim + 'Axis', item.axisIndex);
        var axisValue = item.value;
        var seriesDefaultHTML = [];

        if (!axisModel || axisValue == null) {
          return;
        }

        var valueLabel = axisPointerViewHelper.getValueLabel(axisValue, axisModel.axis, ecModel, item.seriesDataIndices, item.valueLabelOpt);
        zrUtil.each(item.seriesDataIndices, function (idxItem) {
          var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
          var dataIndex = idxItem.dataIndexInside;
          var dataParams = series && series.getDataParams(dataIndex);
          dataParams.axisDim = item.axisDim;
          dataParams.axisIndex = item.axisIndex;
          dataParams.axisType = item.axisType;
          dataParams.axisId = item.axisId;
          dataParams.axisValue = axisHelper.getAxisRawValue(axisModel.axis, axisValue);
          dataParams.axisValueLabel = valueLabel;

          if (dataParams) {
            singleParamsList.push(dataParams);
            var seriesTooltip = series.formatTooltip(dataIndex, true, null, renderMode);
            var html;

            if (zrUtil.isObject(seriesTooltip)) {
              html = seriesTooltip.html;
              var newMarkers = seriesTooltip.markers;
              zrUtil.merge(markers, newMarkers);
            } else {
              html = seriesTooltip;
            }

            seriesDefaultHTML.push(html);
          }
        }); // Default tooltip content
        // FIXME
        // (1) shold be the first data which has name?
        // (2) themeRiver, firstDataIndex is array, and first line is unnecessary.

        var firstLine = valueLabel;

        if (renderMode !== 'html') {
          singleDefaultHTML.push(seriesDefaultHTML.join(newLine));
        } else {
          singleDefaultHTML.push((firstLine ? formatUtil.encodeHTML(firstLine) + newLine : '') + seriesDefaultHTML.join(newLine));
        }
      });
    }, this); // In most case, the second axis is shown upper than the first one.

    singleDefaultHTML.reverse();
    singleDefaultHTML = singleDefaultHTML.join(this._newLine + this._newLine);
    var positionExpr = e.position;

    this._showOrMove(singleTooltipModel, function () {
      if (this._updateContentNotChangedOnAxis(dataByCoordSys)) {
        this._updatePosition(singleTooltipModel, positionExpr, point[0], point[1], this._tooltipContent, singleParamsList);
      } else {
        this._showTooltipContent(singleTooltipModel, singleDefaultHTML, singleParamsList, Math.random(), point[0], point[1], positionExpr, undefined, markers);
      }
    }); // Do not trigger events here, because this branch only be entered
    // from dispatchAction.

  },
  _showSeriesItemTooltip: function (e, el, dispatchAction) {
    var ecModel = this._ecModel; // Use dataModel in element if possible
    // Used when mouseover on a element like markPoint or edge
    // In which case, the data is not main data in series.

    var seriesIndex = el.seriesIndex;
    var seriesModel = ecModel.getSeriesByIndex(seriesIndex); // For example, graph link.

    var dataModel = el.dataModel || seriesModel;
    var dataIndex = el.dataIndex;
    var dataType = el.dataType;
    var data = dataModel.getData();
    var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), dataModel, seriesModel && (seriesModel.coordinateSystem || {}).model, this._tooltipModel]);
    var tooltipTrigger = tooltipModel.get('trigger');

    if (tooltipTrigger != null && tooltipTrigger !== 'item') {
      return;
    }

    var params = dataModel.getDataParams(dataIndex, dataType);
    var seriesTooltip = dataModel.formatTooltip(dataIndex, false, dataType, this._renderMode);
    var defaultHtml;
    var markers;

    if (zrUtil.isObject(seriesTooltip)) {
      defaultHtml = seriesTooltip.html;
      markers = seriesTooltip.markers;
    } else {
      defaultHtml = seriesTooltip;
      markers = null;
    }

    var asyncTicket = 'item_' + dataModel.name + '_' + dataIndex;

    this._showOrMove(tooltipModel, function () {
      this._showTooltipContent(tooltipModel, defaultHtml, params, asyncTicket, e.offsetX, e.offsetY, e.position, e.target, markers);
    }); // FIXME
    // duplicated showtip if manuallyShowTip is called from dispatchAction.


    dispatchAction({
      type: 'showTip',
      dataIndexInside: dataIndex,
      dataIndex: data.getRawIndex(dataIndex),
      seriesIndex: seriesIndex,
      from: this.uid
    });
  },
  _showComponentItemTooltip: function (e, el, dispatchAction) {
    var tooltipOpt = el.tooltip;

    if (typeof tooltipOpt === 'string') {
      var content = tooltipOpt;
      tooltipOpt = {
        content: content,
        // Fixed formatter
        formatter: content
      };
    }

    var subTooltipModel = new Model(tooltipOpt, this._tooltipModel, this._ecModel);
    var defaultHtml = subTooltipModel.get('content');
    var asyncTicket = Math.random(); // Do not check whether `trigger` is 'none' here, because `trigger`
    // only works on cooridinate system. In fact, we have not found case
    // that requires setting `trigger` nothing on component yet.

    this._showOrMove(subTooltipModel, function () {
      this._showTooltipContent(subTooltipModel, defaultHtml, subTooltipModel.get('formatterParams') || {}, asyncTicket, e.offsetX, e.offsetY, e.position, el);
    }); // If not dispatch showTip, tip may be hide triggered by axis.


    dispatchAction({
      type: 'showTip',
      from: this.uid
    });
  },
  _showTooltipContent: function (tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el, markers) {
    // Reset ticket
    this._ticket = '';

    if (!tooltipModel.get('showContent') || !tooltipModel.get('show')) {
      return;
    }

    var tooltipContent = this._tooltipContent;
    var formatter = tooltipModel.get('formatter');
    positionExpr = positionExpr || tooltipModel.get('position');
    var html = defaultHtml;

    if (formatter && typeof formatter === 'string') {
      html = formatUtil.formatTpl(formatter, params, true);
    } else if (typeof formatter === 'function') {
      var callback = bind(function (cbTicket, html) {
        if (cbTicket === this._ticket) {
          tooltipContent.setContent(html, markers, tooltipModel);

          this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
        }
      }, this);
      this._ticket = asyncTicket;
      html = formatter(params, asyncTicket, callback);
    }

    tooltipContent.setContent(html, markers, tooltipModel);
    tooltipContent.show(tooltipModel);

    this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
  },

  /**
   * @param  {string|Function|Array.<number>|Object} positionExpr
   * @param  {number} x Mouse x
   * @param  {number} y Mouse y
   * @param  {boolean} confine Whether confine tooltip content in view rect.
   * @param  {Object|<Array.<Object>} params
   * @param  {module:zrender/Element} el target element
   * @param  {module:echarts/ExtensionAPI} api
   * @return {Array.<number>}
   */
  _updatePosition: function (tooltipModel, positionExpr, x, y, content, params, el) {
    var viewWidth = this._api.getWidth();

    var viewHeight = this._api.getHeight();

    positionExpr = positionExpr || tooltipModel.get('position');
    var contentSize = content.getSize();
    var align = tooltipModel.get('align');
    var vAlign = tooltipModel.get('verticalAlign');
    var rect = el && el.getBoundingRect().clone();
    el && rect.applyTransform(el.transform);

    if (typeof positionExpr === 'function') {
      // Callback of position can be an array or a string specify the position
      positionExpr = positionExpr([x, y], params, content.el, rect, {
        viewSize: [viewWidth, viewHeight],
        contentSize: contentSize.slice()
      });
    }

    if (zrUtil.isArray(positionExpr)) {
      x = parsePercent(positionExpr[0], viewWidth);
      y = parsePercent(positionExpr[1], viewHeight);
    } else if (zrUtil.isObject(positionExpr)) {
      positionExpr.width = contentSize[0];
      positionExpr.height = contentSize[1];
      var layoutRect = layoutUtil.getLayoutRect(positionExpr, {
        width: viewWidth,
        height: viewHeight
      });
      x = layoutRect.x;
      y = layoutRect.y;
      align = null; // When positionExpr is left/top/right/bottom,
      // align and verticalAlign will not work.

      vAlign = null;
    } // Specify tooltip position by string 'top' 'bottom' 'left' 'right' around graphic element
    else if (typeof positionExpr === 'string' && el) {
        var pos = calcTooltipPosition(positionExpr, rect, contentSize);
        x = pos[0];
        y = pos[1];
      } else {
        var pos = refixTooltipPosition(x, y, content, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20);
        x = pos[0];
        y = pos[1];
      }

    align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : align === 'right' ? contentSize[0] : 0);
    vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : vAlign === 'bottom' ? contentSize[1] : 0);

    if (tooltipModel.get('confine')) {
      var pos = confineTooltipPosition(x, y, content, viewWidth, viewHeight);
      x = pos[0];
      y = pos[1];
    }

    content.moveTo(x, y);
  },
  // FIXME
  // Should we remove this but leave this to user?
  _updateContentNotChangedOnAxis: function (dataByCoordSys) {
    var lastCoordSys = this._lastDataByCoordSys;
    var contentNotChanged = !!lastCoordSys && lastCoordSys.length === dataByCoordSys.length;
    contentNotChanged && each(lastCoordSys, function (lastItemCoordSys, indexCoordSys) {
      var lastDataByAxis = lastItemCoordSys.dataByAxis || {};
      var thisItemCoordSys = dataByCoordSys[indexCoordSys] || {};
      var thisDataByAxis = thisItemCoordSys.dataByAxis || [];
      contentNotChanged &= lastDataByAxis.length === thisDataByAxis.length;
      contentNotChanged && each(lastDataByAxis, function (lastItem, indexAxis) {
        var thisItem = thisDataByAxis[indexAxis] || {};
        var lastIndices = lastItem.seriesDataIndices || [];
        var newIndices = thisItem.seriesDataIndices || [];
        contentNotChanged &= lastItem.value === thisItem.value && lastItem.axisType === thisItem.axisType && lastItem.axisId === thisItem.axisId && lastIndices.length === newIndices.length;
        contentNotChanged && each(lastIndices, function (lastIdxItem, j) {
          var newIdxItem = newIndices[j];
          contentNotChanged &= lastIdxItem.seriesIndex === newIdxItem.seriesIndex && lastIdxItem.dataIndex === newIdxItem.dataIndex;
        });
      });
    });
    this._lastDataByCoordSys = dataByCoordSys;
    return !!contentNotChanged;
  },
  _hide: function (dispatchAction) {
    // Do not directly hideLater here, because this behavior may be prevented
    // in dispatchAction when showTip is dispatched.
    // FIXME
    // duplicated hideTip if manuallyHideTip is called from dispatchAction.
    this._lastDataByCoordSys = null;
    dispatchAction({
      type: 'hideTip',
      from: this.uid
    });
  },
  dispose: function (ecModel, api) {
    if (env.node) {
      return;
    }

    this._tooltipContent.hide();

    globalListener.unregister('itemTooltip', api);
  }
});
/**
 * @param {Array.<Object|module:echarts/model/Model>} modelCascade
 * From top to bottom. (the last one should be globalTooltipModel);
 */


function buildTooltipModel(modelCascade) {
  var resultModel = modelCascade.pop();

  while (modelCascade.length) {
    var tooltipOpt = modelCascade.pop();

    if (tooltipOpt) {
      if (Model.isInstance(tooltipOpt)) {
        tooltipOpt = tooltipOpt.get('tooltip', true);
      } // In each data item tooltip can be simply write:
      // {
      //  value: 10,
      //  tooltip: 'Something you need to know'
      // }


      if (typeof tooltipOpt === 'string') {
        tooltipOpt = {
          formatter: tooltipOpt
        };
      }

      resultModel = new Model(tooltipOpt, resultModel, resultModel.ecModel);
    }
  }

  return resultModel;
}

function makeDispatchAction(payload, api) {
  return payload.dispatchAction || zrUtil.bind(api.dispatchAction, api);
}

function refixTooltipPosition(x, y, content, viewWidth, viewHeight, gapH, gapV) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;

  if (gapH != null) {
    if (x + width + gapH > viewWidth) {
      x -= width + gapH;
    } else {
      x += gapH;
    }
  }

  if (gapV != null) {
    if (y + height + gapV > viewHeight) {
      y -= height + gapV;
    } else {
      y += gapV;
    }
  }

  return [x, y];
}

function confineTooltipPosition(x, y, content, viewWidth, viewHeight) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;
  x = Math.min(x + width, viewWidth) - width;
  y = Math.min(y + height, viewHeight) - height;
  x = Math.max(x, 0);
  y = Math.max(y, 0);
  return [x, y];
}

function calcTooltipPosition(position, rect, contentSize) {
  var domWidth = contentSize[0];
  var domHeight = contentSize[1];
  var gap = 5;
  var x = 0;
  var y = 0;
  var rectWidth = rect.width;
  var rectHeight = rect.height;

  switch (position) {
    case 'inside':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'top':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y - domHeight - gap;
      break;

    case 'bottom':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight + gap;
      break;

    case 'left':
      x = rect.x - domWidth - gap;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'right':
      x = rect.x + rectWidth + gap;
      y = rect.y + rectHeight / 2 - domHeight / 2;
  }

  return [x, y];
}

function isCenterAlign(align) {
  return align === 'center' || align === 'middle';
}

module.exports = _default;

/***/ }),

/***/ "4e9f":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var env = __webpack_require__("22d1");

var lang = __webpack_require__("29a8");

var featureManager = __webpack_require__("2145");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/* global Uint8Array */
var saveAsImageLang = lang.toolbox.saveAsImage;

function SaveAsImage(model) {
  this.model = model;
}

SaveAsImage.defaultOption = {
  show: true,
  icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
  title: saveAsImageLang.title,
  type: 'png',
  // Default use option.backgroundColor
  // backgroundColor: '#fff',
  connectedBackgroundColor: '#fff',
  name: '',
  excludeComponents: ['toolbox'],
  pixelRatio: 1,
  lang: saveAsImageLang.lang.slice()
};
SaveAsImage.prototype.unusable = !env.canvasSupported;
var proto = SaveAsImage.prototype;

proto.onclick = function (ecModel, api) {
  var model = this.model;
  var title = model.get('name') || ecModel.get('title.0.text') || 'echarts';
  var type = model.get('type', true) || 'png';
  var url = api.getConnectedDataURL({
    type: type,
    backgroundColor: model.get('backgroundColor', true) || ecModel.get('backgroundColor') || '#fff',
    connectedBackgroundColor: model.get('connectedBackgroundColor'),
    excludeComponents: model.get('excludeComponents'),
    pixelRatio: model.get('pixelRatio')
  }); // Chrome and Firefox

  if (typeof MouseEvent === 'function' && !env.browser.ie && !env.browser.edge) {
    var $a = document.createElement('a');
    $a.download = title + '.' + type;
    $a.target = '_blank';
    $a.href = url;
    var evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    $a.dispatchEvent(evt);
  } // IE
  else {
      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(url.split(',')[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, title + '.' + type);
      } else {
        var lang = model.get('lang');
        var html = '' + '<body style="margin:0;">' + '<img src="' + url + '" style="max-width:100%;" title="' + (lang && lang[0] || '') + '" />' + '</body>';
        var tab = window.open();
        tab.document.write(html);
      }
    }
};

featureManager.register('saveAsImage', SaveAsImage);
var _default = SaveAsImage;
module.exports = _default;

/***/ }),

/***/ "767c":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var eventTool = __webpack_require__("607d");

var lang = __webpack_require__("29a8");

var featureManager = __webpack_require__("2145");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var dataViewLang = lang.toolbox.dataView;
var BLOCK_SPLITER = new Array(60).join('-');
var ITEM_SPLITER = '\t';
/**
 * Group series into two types
 *  1. on category axis, like line, bar
 *  2. others, like scatter, pie
 * @param {module:echarts/model/Global} ecModel
 * @return {Object}
 * @inner
 */

function groupSeries(ecModel) {
  var seriesGroupByCategoryAxis = {};
  var otherSeries = [];
  var meta = [];
  ecModel.eachRawSeries(function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys && (coordSys.type === 'cartesian2d' || coordSys.type === 'polar')) {
      var baseAxis = coordSys.getBaseAxis();

      if (baseAxis.type === 'category') {
        var key = baseAxis.dim + '_' + baseAxis.index;

        if (!seriesGroupByCategoryAxis[key]) {
          seriesGroupByCategoryAxis[key] = {
            categoryAxis: baseAxis,
            valueAxis: coordSys.getOtherAxis(baseAxis),
            series: []
          };
          meta.push({
            axisDim: baseAxis.dim,
            axisIndex: baseAxis.index
          });
        }

        seriesGroupByCategoryAxis[key].series.push(seriesModel);
      } else {
        otherSeries.push(seriesModel);
      }
    } else {
      otherSeries.push(seriesModel);
    }
  });
  return {
    seriesGroupByCategoryAxis: seriesGroupByCategoryAxis,
    other: otherSeries,
    meta: meta
  };
}
/**
 * Assemble content of series on cateogory axis
 * @param {Array.<module:echarts/model/Series>} series
 * @return {string}
 * @inner
 */


function assembleSeriesWithCategoryAxis(series) {
  var tables = [];
  zrUtil.each(series, function (group, key) {
    var categoryAxis = group.categoryAxis;
    var valueAxis = group.valueAxis;
    var valueAxisDim = valueAxis.dim;
    var headers = [' '].concat(zrUtil.map(group.series, function (series) {
      return series.name;
    }));
    var columns = [categoryAxis.model.getCategories()];
    zrUtil.each(group.series, function (series) {
      columns.push(series.getRawData().mapArray(valueAxisDim, function (val) {
        return val;
      }));
    }); // Assemble table content

    var lines = [headers.join(ITEM_SPLITER)];

    for (var i = 0; i < columns[0].length; i++) {
      var items = [];

      for (var j = 0; j < columns.length; j++) {
        items.push(columns[j][i]);
      }

      lines.push(items.join(ITEM_SPLITER));
    }

    tables.push(lines.join('\n'));
  });
  return tables.join('\n\n' + BLOCK_SPLITER + '\n\n');
}
/**
 * Assemble content of other series
 * @param {Array.<module:echarts/model/Series>} series
 * @return {string}
 * @inner
 */


function assembleOtherSeries(series) {
  return zrUtil.map(series, function (series) {
    var data = series.getRawData();
    var lines = [series.name];
    var vals = [];
    data.each(data.dimensions, function () {
      var argLen = arguments.length;
      var dataIndex = arguments[argLen - 1];
      var name = data.getName(dataIndex);

      for (var i = 0; i < argLen - 1; i++) {
        vals[i] = arguments[i];
      }

      lines.push((name ? name + ITEM_SPLITER : '') + vals.join(ITEM_SPLITER));
    });
    return lines.join('\n');
  }).join('\n\n' + BLOCK_SPLITER + '\n\n');
}
/**
 * @param {module:echarts/model/Global}
 * @return {Object}
 * @inner
 */


function getContentFromModel(ecModel) {
  var result = groupSeries(ecModel);
  return {
    value: zrUtil.filter([assembleSeriesWithCategoryAxis(result.seriesGroupByCategoryAxis), assembleOtherSeries(result.other)], function (str) {
      return str.replace(/[\n\t\s]/g, '');
    }).join('\n\n' + BLOCK_SPLITER + '\n\n'),
    meta: result.meta
  };
}

function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
/**
 * If a block is tsv format
 */


function isTSVFormat(block) {
  // Simple method to find out if a block is tsv format
  var firstLine = block.slice(0, block.indexOf('\n'));

  if (firstLine.indexOf(ITEM_SPLITER) >= 0) {
    return true;
  }
}

var itemSplitRegex = new RegExp('[' + ITEM_SPLITER + ']+', 'g');
/**
 * @param {string} tsv
 * @return {Object}
 */

function parseTSVContents(tsv) {
  var tsvLines = tsv.split(/\n+/g);
  var headers = trim(tsvLines.shift()).split(itemSplitRegex);
  var categories = [];
  var series = zrUtil.map(headers, function (header) {
    return {
      name: header,
      data: []
    };
  });

  for (var i = 0; i < tsvLines.length; i++) {
    var items = trim(tsvLines[i]).split(itemSplitRegex);
    categories.push(items.shift());

    for (var j = 0; j < items.length; j++) {
      series[j] && (series[j].data[i] = items[j]);
    }
  }

  return {
    series: series,
    categories: categories
  };
}
/**
 * @param {string} str
 * @return {Array.<Object>}
 * @inner
 */


function parseListContents(str) {
  var lines = str.split(/\n+/g);
  var seriesName = trim(lines.shift());
  var data = [];

  for (var i = 0; i < lines.length; i++) {
    var items = trim(lines[i]).split(itemSplitRegex);
    var name = '';
    var value;
    var hasName = false;

    if (isNaN(items[0])) {
      // First item is name
      hasName = true;
      name = items[0];
      items = items.slice(1);
      data[i] = {
        name: name,
        value: []
      };
      value = data[i].value;
    } else {
      value = data[i] = [];
    }

    for (var j = 0; j < items.length; j++) {
      value.push(+items[j]);
    }

    if (value.length === 1) {
      hasName ? data[i].value = value[0] : data[i] = value[0];
    }
  }

  return {
    name: seriesName,
    data: data
  };
}
/**
 * @param {string} str
 * @param {Array.<Object>} blockMetaList
 * @return {Object}
 * @inner
 */


function parseContents(str, blockMetaList) {
  var blocks = str.split(new RegExp('\n*' + BLOCK_SPLITER + '\n*', 'g'));
  var newOption = {
    series: []
  };
  zrUtil.each(blocks, function (block, idx) {
    if (isTSVFormat(block)) {
      var result = parseTSVContents(block);
      var blockMeta = blockMetaList[idx];
      var axisKey = blockMeta.axisDim + 'Axis';

      if (blockMeta) {
        newOption[axisKey] = newOption[axisKey] || [];
        newOption[axisKey][blockMeta.axisIndex] = {
          data: result.categories
        };
        newOption.series = newOption.series.concat(result.series);
      }
    } else {
      var result = parseListContents(block);
      newOption.series.push(result);
    }
  });
  return newOption;
}
/**
 * @alias {module:echarts/component/toolbox/feature/DataView}
 * @constructor
 * @param {module:echarts/model/Model} model
 */


function DataView(model) {
  this._dom = null;
  this.model = model;
}

DataView.defaultOption = {
  show: true,
  readOnly: false,
  optionToContent: null,
  contentToOption: null,
  icon: 'M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28',
  title: zrUtil.clone(dataViewLang.title),
  lang: zrUtil.clone(dataViewLang.lang),
  backgroundColor: '#fff',
  textColor: '#000',
  textareaColor: '#fff',
  textareaBorderColor: '#333',
  buttonColor: '#c23531',
  buttonTextColor: '#fff'
};

DataView.prototype.onclick = function (ecModel, api) {
  var container = api.getDom();
  var model = this.model;

  if (this._dom) {
    container.removeChild(this._dom);
  }

  var root = document.createElement('div');
  root.style.cssText = 'position:absolute;left:5px;top:5px;bottom:5px;right:5px;';
  root.style.backgroundColor = model.get('backgroundColor') || '#fff'; // Create elements

  var header = document.createElement('h4');
  var lang = model.get('lang') || [];
  header.innerHTML = lang[0] || model.get('title');
  header.style.cssText = 'margin: 10px 20px;';
  header.style.color = model.get('textColor');
  var viewMain = document.createElement('div');
  var textarea = document.createElement('textarea');
  viewMain.style.cssText = 'display:block;width:100%;overflow:auto;';
  var optionToContent = model.get('optionToContent');
  var contentToOption = model.get('contentToOption');
  var result = getContentFromModel(ecModel);

  if (typeof optionToContent === 'function') {
    var htmlOrDom = optionToContent(api.getOption());

    if (typeof htmlOrDom === 'string') {
      viewMain.innerHTML = htmlOrDom;
    } else if (zrUtil.isDom(htmlOrDom)) {
      viewMain.appendChild(htmlOrDom);
    }
  } else {
    // Use default textarea
    viewMain.appendChild(textarea);
    textarea.readOnly = model.get('readOnly');
    textarea.style.cssText = 'width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;';
    textarea.style.color = model.get('textColor');
    textarea.style.borderColor = model.get('textareaBorderColor');
    textarea.style.backgroundColor = model.get('textareaColor');
    textarea.value = result.value;
  }

  var blockMetaList = result.meta;
  var buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = 'position:absolute;bottom:0;left:0;right:0;';
  var buttonStyle = 'float:right;margin-right:20px;border:none;' + 'cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px';
  var closeButton = document.createElement('div');
  var refreshButton = document.createElement('div');
  buttonStyle += ';background-color:' + model.get('buttonColor');
  buttonStyle += ';color:' + model.get('buttonTextColor');
  var self = this;

  function close() {
    container.removeChild(root);
    self._dom = null;
  }

  eventTool.addEventListener(closeButton, 'click', close);
  eventTool.addEventListener(refreshButton, 'click', function () {
    var newOption;

    try {
      if (typeof contentToOption === 'function') {
        newOption = contentToOption(viewMain, api.getOption());
      } else {
        newOption = parseContents(textarea.value, blockMetaList);
      }
    } catch (e) {
      close();
      throw new Error('Data view format error ' + e);
    }

    if (newOption) {
      api.dispatchAction({
        type: 'changeDataView',
        newOption: newOption
      });
    }

    close();
  });
  closeButton.innerHTML = lang[1];
  refreshButton.innerHTML = lang[2];
  refreshButton.style.cssText = buttonStyle;
  closeButton.style.cssText = buttonStyle;
  !model.get('readOnly') && buttonContainer.appendChild(refreshButton);
  buttonContainer.appendChild(closeButton);
  root.appendChild(header);
  root.appendChild(viewMain);
  root.appendChild(buttonContainer);
  viewMain.style.height = container.clientHeight - 80 + 'px';
  container.appendChild(root);
  this._dom = root;
};

DataView.prototype.remove = function (ecModel, api) {
  this._dom && api.getDom().removeChild(this._dom);
};

DataView.prototype.dispose = function (ecModel, api) {
  this.remove(ecModel, api);
};
/**
 * @inner
 */


function tryMergeDataOption(newData, originalData) {
  return zrUtil.map(newData, function (newVal, idx) {
    var original = originalData && originalData[idx];

    if (zrUtil.isObject(original) && !zrUtil.isArray(original)) {
      if (zrUtil.isObject(newVal) && !zrUtil.isArray(newVal)) {
        newVal = newVal.value;
      } // Original data has option


      return zrUtil.defaults({
        value: newVal
      }, original);
    } else {
      return newVal;
    }
  });
}

featureManager.register('dataView', DataView);
echarts.registerAction({
  type: 'changeDataView',
  event: 'dataViewChanged',
  update: 'prepareAndUpdate'
}, function (payload, ecModel) {
  var newSeriesOptList = [];
  zrUtil.each(payload.newOption.series, function (seriesOpt) {
    var seriesModel = ecModel.getSeriesByName(seriesOpt.name)[0];

    if (!seriesModel) {
      // New created series
      // Geuss the series type
      newSeriesOptList.push(zrUtil.extend({
        // Default is scatter
        type: 'scatter'
      }, seriesOpt));
    } else {
      var originalData = seriesModel.get('data');
      newSeriesOptList.push({
        name: seriesOpt.name,
        data: tryMergeDataOption(seriesOpt.data, originalData)
      });
    }
  });
  ecModel.mergeOption(zrUtil.defaults({
    series: newSeriesOptList
  }, payload.newOption));
});
var _default = DataView;
module.exports = _default;

/***/ }),

/***/ "7c4d":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var BrushTargetManager = __webpack_require__("bd9e");

var history = __webpack_require__("6fda");

var sliderMove = __webpack_require__("ef6a");

var lang = __webpack_require__("29a8");

var featureManager = __webpack_require__("2145");

__webpack_require__("dd39");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Use dataZoomSelect
var dataZoomLang = lang.toolbox.dataZoom;
var each = zrUtil.each; // Spectial component id start with \0ec\0, see echarts/model/Global.js~hasInnerId

var DATA_ZOOM_ID_BASE = '\0_ec_\0toolbox-dataZoom_';

function DataZoom(model, ecModel, api) {
  /**
   * @private
   * @type {module:echarts/component/helper/BrushController}
   */
  (this._brushController = new BrushController(api.getZr())).on('brush', zrUtil.bind(this._onBrush, this)).mount();
  /**
   * @private
   * @type {boolean}
   */

  this._isZoomActive;
}

DataZoom.defaultOption = {
  show: true,
  filterMode: 'filter',
  // Icon group
  icon: {
    zoom: 'M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1',
    back: 'M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26'
  },
  // `zoom`, `back`
  title: zrUtil.clone(dataZoomLang.title)
};
var proto = DataZoom.prototype;

proto.render = function (featureModel, ecModel, api, payload) {
  this.model = featureModel;
  this.ecModel = ecModel;
  this.api = api;
  updateZoomBtnStatus(featureModel, ecModel, this, payload, api);
  updateBackBtnStatus(featureModel, ecModel);
};

proto.onclick = function (ecModel, api, type) {
  handlers[type].call(this);
};

proto.remove = function (ecModel, api) {
  this._brushController.unmount();
};

proto.dispose = function (ecModel, api) {
  this._brushController.dispose();
};
/**
 * @private
 */


var handlers = {
  zoom: function () {
    var nextActive = !this._isZoomActive;
    this.api.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: nextActive
    });
  },
  back: function () {
    this._dispatchZoomAction(history.pop(this.ecModel));
  }
};
/**
 * @private
 */

proto._onBrush = function (areas, opt) {
  if (!opt.isEnd || !areas.length) {
    return;
  }

  var snapshot = {};
  var ecModel = this.ecModel;

  this._brushController.updateCovers([]); // remove cover


  var brushTargetManager = new BrushTargetManager(retrieveAxisSetting(this.model.option), ecModel, {
    include: ['grid']
  });
  brushTargetManager.matchOutputRanges(areas, ecModel, function (area, coordRange, coordSys) {
    if (coordSys.type !== 'cartesian2d') {
      return;
    }

    var brushType = area.brushType;

    if (brushType === 'rect') {
      setBatch('x', coordSys, coordRange[0]);
      setBatch('y', coordSys, coordRange[1]);
    } else {
      setBatch({
        lineX: 'x',
        lineY: 'y'
      }[brushType], coordSys, coordRange);
    }
  });
  history.push(ecModel, snapshot);

  this._dispatchZoomAction(snapshot);

  function setBatch(dimName, coordSys, minMax) {
    var axis = coordSys.getAxis(dimName);
    var axisModel = axis.model;
    var dataZoomModel = findDataZoom(dimName, axisModel, ecModel); // Restrict range.

    var minMaxSpan = dataZoomModel.findRepresentativeAxisProxy(axisModel).getMinMaxSpan();

    if (minMaxSpan.minValueSpan != null || minMaxSpan.maxValueSpan != null) {
      minMax = sliderMove(0, minMax.slice(), axis.scale.getExtent(), 0, minMaxSpan.minValueSpan, minMaxSpan.maxValueSpan);
    }

    dataZoomModel && (snapshot[dataZoomModel.id] = {
      dataZoomId: dataZoomModel.id,
      startValue: minMax[0],
      endValue: minMax[1]
    });
  }

  function findDataZoom(dimName, axisModel, ecModel) {
    var found;
    ecModel.eachComponent({
      mainType: 'dataZoom',
      subType: 'select'
    }, function (dzModel) {
      var has = dzModel.getAxisModel(dimName, axisModel.componentIndex);
      has && (found = dzModel);
    });
    return found;
  }
};
/**
 * @private
 */


proto._dispatchZoomAction = function (snapshot) {
  var batch = []; // Convert from hash map to array.

  each(snapshot, function (batchItem, dataZoomId) {
    batch.push(zrUtil.clone(batchItem));
  });
  batch.length && this.api.dispatchAction({
    type: 'dataZoom',
    from: this.uid,
    batch: batch
  });
};

function retrieveAxisSetting(option) {
  var setting = {}; // Compatible with previous setting: null => all axis, false => no axis.

  zrUtil.each(['xAxisIndex', 'yAxisIndex'], function (name) {
    setting[name] = option[name];
    setting[name] == null && (setting[name] = 'all');
    (setting[name] === false || setting[name] === 'none') && (setting[name] = []);
  });
  return setting;
}

function updateBackBtnStatus(featureModel, ecModel) {
  featureModel.setIconStatus('back', history.count(ecModel) > 1 ? 'emphasis' : 'normal');
}

function updateZoomBtnStatus(featureModel, ecModel, view, payload, api) {
  var zoomActive = view._isZoomActive;

  if (payload && payload.type === 'takeGlobalCursor') {
    zoomActive = payload.key === 'dataZoomSelect' ? payload.dataZoomSelectActive : false;
  }

  view._isZoomActive = zoomActive;
  featureModel.setIconStatus('zoom', zoomActive ? 'emphasis' : 'normal');
  var brushTargetManager = new BrushTargetManager(retrieveAxisSetting(featureModel.option), ecModel, {
    include: ['grid']
  });

  view._brushController.setPanels(brushTargetManager.makePanelOpts(api, function (targetInfo) {
    return targetInfo.xAxisDeclared && !targetInfo.yAxisDeclared ? 'lineX' : !targetInfo.xAxisDeclared && targetInfo.yAxisDeclared ? 'lineY' : 'rect';
  })).enableBrush(zoomActive ? {
    brushType: 'auto',
    brushStyle: {
      // FIXME user customized?
      lineWidth: 0,
      fill: 'rgba(0,0,0,0.2)'
    }
  } : false);
}

featureManager.register('dataZoom', DataZoom); // Create special dataZoom option for select
// FIXME consider the case of merge option, where axes options are not exists.

echarts.registerPreprocessor(function (option) {
  if (!option) {
    return;
  }

  var dataZoomOpts = option.dataZoom || (option.dataZoom = []);

  if (!zrUtil.isArray(dataZoomOpts)) {
    option.dataZoom = dataZoomOpts = [dataZoomOpts];
  }

  var toolboxOpt = option.toolbox;

  if (toolboxOpt) {
    // Assume there is only one toolbox
    if (zrUtil.isArray(toolboxOpt)) {
      toolboxOpt = toolboxOpt[0];
    }

    if (toolboxOpt && toolboxOpt.feature) {
      var dataZoomOpt = toolboxOpt.feature.dataZoom; // FIXME: If add dataZoom when setOption in merge mode,
      // no axis info to be added. See `test/dataZoom-extreme.html`

      addForAxis('xAxis', dataZoomOpt);
      addForAxis('yAxis', dataZoomOpt);
    }
  }

  function addForAxis(axisName, dataZoomOpt) {
    if (!dataZoomOpt) {
      return;
    } // Try not to modify model, because it is not merged yet.


    var axisIndicesName = axisName + 'Index';
    var givenAxisIndices = dataZoomOpt[axisIndicesName];

    if (givenAxisIndices != null && givenAxisIndices !== 'all' && !zrUtil.isArray(givenAxisIndices)) {
      givenAxisIndices = givenAxisIndices === false || givenAxisIndices === 'none' ? [] : [givenAxisIndices];
    }

    forEachComponent(axisName, function (axisOpt, axisIndex) {
      if (givenAxisIndices != null && givenAxisIndices !== 'all' && zrUtil.indexOf(givenAxisIndices, axisIndex) === -1) {
        return;
      }

      var newOpt = {
        type: 'select',
        $fromToolbox: true,
        // Default to be filter
        filterMode: dataZoomOpt.filterMode || 'filter',
        // Id for merge mapping.
        id: DATA_ZOOM_ID_BASE + axisName + axisIndex
      }; // FIXME
      // Only support one axis now.

      newOpt[axisIndicesName] = axisIndex;
      dataZoomOpts.push(newOpt);
    });
  }

  function forEachComponent(mainType, cb) {
    var opts = option[mainType];

    if (!zrUtil.isArray(opts)) {
      opts = opts ? [opts] : [];
    }

    each(opts, cb);
  }
});
var _default = DataZoom;
module.exports = _default;

/***/ }),

/***/ "82f9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var Text = __webpack_require__("76a5");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// import Group from 'zrender/src/container/Group';

/**
 * @alias module:echarts/component/tooltip/TooltipRichContent
 * @constructor
 */
function TooltipRichContent(api) {
  this._zr = api.getZr();
  this._show = false;
  /**
   * @private
   */

  this._hideTimeout;
}

TooltipRichContent.prototype = {
  constructor: TooltipRichContent,

  /**
   * @private
   * @type {boolean}
   */
  _enterable: true,

  /**
   * Update when tooltip is rendered
   */
  update: function () {// noop
  },
  show: function (tooltipModel) {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }

    this.el.attr('show', true);
    this._show = true;
  },

  /**
   * Set tooltip content
   *
   * @param {string} content rich text string of content
   * @param {Object} markerRich rich text style
   * @param {Object} tooltipModel tooltip model
   */
  setContent: function (content, markerRich, tooltipModel) {
    if (this.el) {
      this._zr.remove(this.el);
    }

    var markers = {};
    var text = content;
    var prefix = '{marker';
    var suffix = '|}';
    var startId = text.indexOf(prefix);

    while (startId >= 0) {
      var endId = text.indexOf(suffix);
      var name = text.substr(startId + prefix.length, endId - startId - prefix.length);

      if (name.indexOf('sub') > -1) {
        markers['marker' + name] = {
          textWidth: 4,
          textHeight: 4,
          textBorderRadius: 2,
          textBackgroundColor: markerRich[name],
          // TODO: textOffset is not implemented for rich text
          textOffset: [3, 0]
        };
      } else {
        markers['marker' + name] = {
          textWidth: 10,
          textHeight: 10,
          textBorderRadius: 5,
          textBackgroundColor: markerRich[name]
        };
      }

      text = text.substr(endId + 1);
      startId = text.indexOf('{marker');
    }

    this.el = new Text({
      style: {
        rich: markers,
        text: content,
        textLineHeight: 20,
        textBackgroundColor: tooltipModel.get('backgroundColor'),
        textBorderRadius: tooltipModel.get('borderRadius'),
        textFill: tooltipModel.get('textStyle.color'),
        textPadding: tooltipModel.get('padding')
      },
      z: tooltipModel.get('z')
    });

    this._zr.add(this.el);

    var self = this;
    this.el.on('mouseover', function () {
      // clear the timeout in hideLater and keep showing tooltip
      if (self._enterable) {
        clearTimeout(self._hideTimeout);
        self._show = true;
      }

      self._inContent = true;
    });
    this.el.on('mouseout', function () {
      if (self._enterable) {
        if (self._show) {
          self.hideLater(self._hideDelay);
        }
      }

      self._inContent = false;
    });
  },
  setEnterable: function (enterable) {
    this._enterable = enterable;
  },
  getSize: function () {
    var bounding = this.el.getBoundingRect();
    return [bounding.width, bounding.height];
  },
  moveTo: function (x, y) {
    if (this.el) {
      this.el.attr('position', [x, y]);
    }
  },
  hide: function () {
    if (this.el) {
      this.el.hide();
    }

    this._show = false;
  },
  hideLater: function (time) {
    if (this._show && !(this._inContent && this._enterable)) {
      if (time) {
        this._hideDelay = time; // Set show false to avoid invoke hideLater mutiple times

        this._show = false;
        this._hideTimeout = setTimeout(zrUtil.bind(this.hide, this), time);
      } else {
        this.hide();
      }
    }
  },
  isShow: function () {
    return this._show;
  },
  getOuterSize: function () {
    var size = this.getSize();
    return {
      width: size[0],
      height: size[1]
    };
  }
};
var _default = TooltipRichContent;
module.exports = _default;

/***/ }),

/***/ "8ec5":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var featureManager = __webpack_require__("2145");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var ToolboxModel = echarts.extendComponentModel({
  type: 'toolbox',
  layoutMode: {
    type: 'box',
    ignoreSize: true
  },
  optionUpdated: function () {
    ToolboxModel.superApply(this, 'optionUpdated', arguments);
    zrUtil.each(this.option.feature, function (featureOpt, featureName) {
      var Feature = featureManager.get(featureName);
      Feature && zrUtil.merge(featureOpt, Feature.defaultOption);
    });
  },
  defaultOption: {
    show: true,
    z: 6,
    zlevel: 0,
    orient: 'horizontal',
    left: 'right',
    top: 'top',
    // right
    // bottom
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderRadius: 0,
    borderWidth: 0,
    padding: 5,
    itemSize: 15,
    itemGap: 8,
    showTitle: true,
    iconStyle: {
      borderColor: '#666',
      color: 'none'
    },
    emphasis: {
      iconStyle: {
        borderColor: '#3E98C5'
      }
    },
    // textStyle: {},
    // feature
    tooltip: {
      show: false
    }
  }
});
var _default = ToolboxModel;
module.exports = _default;

/***/ }),

/***/ "a96b":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var _default = echarts.extendComponentModel({
  type: 'tooltip',
  dependencies: ['axisPointer'],
  defaultOption: {
    zlevel: 0,
    z: 60,
    show: true,
    // tooltip主体内容
    showContent: true,
    // 'trigger' only works on coordinate system.
    // 'item' | 'axis' | 'none'
    trigger: 'item',
    // 'click' | 'mousemove' | 'none'
    triggerOn: 'mousemove|click',
    alwaysShowContent: false,
    displayMode: 'single',
    // 'single' | 'multipleByCoordSys'
    renderMode: 'auto',
    // 'auto' | 'html' | 'richText'
    // 'auto': use html by default, and use non-html if `document` is not defined
    // 'html': use html for tooltip
    // 'richText': use canvas, svg, and etc. for tooltip
    // 位置 {Array} | {Function}
    // position: null
    // Consider triggered from axisPointer handle, verticalAlign should be 'middle'
    // align: null,
    // verticalAlign: null,
    // 是否约束 content 在 viewRect 中。默认 false 是为了兼容以前版本。
    confine: false,
    // 内容格式器：{string}（Template） ¦ {Function}
    // formatter: null
    showDelay: 0,
    // 隐藏延迟，单位ms
    hideDelay: 100,
    // 动画变换时间，单位s
    transitionDuration: 0.4,
    enterable: false,
    // 提示背景颜色，默认为透明度为0.7的黑色
    backgroundColor: 'rgba(50,50,50,0.7)',
    // 提示边框颜色
    borderColor: '#333',
    // 提示边框圆角，单位px，默认为4
    borderRadius: 4,
    // 提示边框线宽，单位px，默认为0（无边框）
    borderWidth: 0,
    // 提示内边距，单位px，默认各方向内边距为5，
    // 接受数组分别设定上右下左边距，同css
    padding: 5,
    // Extra css text
    extraCssText: '',
    // 坐标轴指示器，坐标轴触发有效
    axisPointer: {
      // 默认为直线
      // 可选为：'line' | 'shadow' | 'cross'
      type: 'line',
      // type 为 line 的时候有效，指定 tooltip line 所在的轴，可选
      // 可选 'x' | 'y' | 'angle' | 'radius' | 'auto'
      // 默认 'auto'，会选择类型为 category 的轴，对于双数值轴，笛卡尔坐标系会默认选择 x 轴
      // 极坐标系会默认选择 angle 轴
      axis: 'auto',
      animation: 'auto',
      animationDurationUpdate: 200,
      animationEasingUpdate: 'exponentialOut',
      crossStyle: {
        color: '#999',
        width: 1,
        type: 'dashed',
        // TODO formatter
        textStyle: {} // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.

      }
    },
    textStyle: {
      color: '#fff',
      fontSize: 14
    }
  }
});

module.exports = _default;

/***/ }),

/***/ "b11c":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

__webpack_require__("8ec5");

__webpack_require__("db9e");

__webpack_require__("4e9f");

__webpack_require__("d3a0");

__webpack_require__("767c");

__webpack_require__("7c4d");

__webpack_require__("df70");

/***/ }),

/***/ "d3a0":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var lang = __webpack_require__("29a8");

var featureManager = __webpack_require__("2145");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var magicTypeLang = lang.toolbox.magicType;
var INNER_STACK_KEYWORD = '__ec_magicType_stack__';

function MagicType(model) {
  this.model = model;
}

MagicType.defaultOption = {
  show: true,
  type: [],
  // Icon group
  icon: {
    /* eslint-disable */
    line: 'M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4',
    bar: 'M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7',
    stack: 'M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z' // jshint ignore:line

    /* eslint-enable */

  },
  // `line`, `bar`, `stack`, `tiled`
  title: zrUtil.clone(magicTypeLang.title),
  option: {},
  seriesIndex: {}
};
var proto = MagicType.prototype;

proto.getIcons = function () {
  var model = this.model;
  var availableIcons = model.get('icon');
  var icons = {};
  zrUtil.each(model.get('type'), function (type) {
    if (availableIcons[type]) {
      icons[type] = availableIcons[type];
    }
  });
  return icons;
};

var seriesOptGenreator = {
  'line': function (seriesType, seriesId, seriesModel, model) {
    if (seriesType === 'bar') {
      return zrUtil.merge({
        id: seriesId,
        type: 'line',
        // Preserve data related option
        data: seriesModel.get('data'),
        stack: seriesModel.get('stack'),
        markPoint: seriesModel.get('markPoint'),
        markLine: seriesModel.get('markLine')
      }, model.get('option.line') || {}, true);
    }
  },
  'bar': function (seriesType, seriesId, seriesModel, model) {
    if (seriesType === 'line') {
      return zrUtil.merge({
        id: seriesId,
        type: 'bar',
        // Preserve data related option
        data: seriesModel.get('data'),
        stack: seriesModel.get('stack'),
        markPoint: seriesModel.get('markPoint'),
        markLine: seriesModel.get('markLine')
      }, model.get('option.bar') || {}, true);
    }
  },
  'stack': function (seriesType, seriesId, seriesModel, model) {
    var isStack = seriesModel.get('stack') === INNER_STACK_KEYWORD;

    if (seriesType === 'line' || seriesType === 'bar') {
      model.setIconStatus('stack', isStack ? 'normal' : 'emphasis');
      return zrUtil.merge({
        id: seriesId,
        stack: isStack ? '' : INNER_STACK_KEYWORD
      }, model.get('option.stack') || {}, true);
    }
  }
};
var radioTypes = [['line', 'bar'], ['stack']];

proto.onclick = function (ecModel, api, type) {
  var model = this.model;
  var seriesIndex = model.get('seriesIndex.' + type); // Not supported magicType

  if (!seriesOptGenreator[type]) {
    return;
  }

  var newOption = {
    series: []
  };

  var generateNewSeriesTypes = function (seriesModel) {
    var seriesType = seriesModel.subType;
    var seriesId = seriesModel.id;
    var newSeriesOpt = seriesOptGenreator[type](seriesType, seriesId, seriesModel, model);

    if (newSeriesOpt) {
      // PENDING If merge original option?
      zrUtil.defaults(newSeriesOpt, seriesModel.option);
      newOption.series.push(newSeriesOpt);
    } // Modify boundaryGap


    var coordSys = seriesModel.coordinateSystem;

    if (coordSys && coordSys.type === 'cartesian2d' && (type === 'line' || type === 'bar')) {
      var categoryAxis = coordSys.getAxesByScale('ordinal')[0];

      if (categoryAxis) {
        var axisDim = categoryAxis.dim;
        var axisType = axisDim + 'Axis';
        var axisModel = ecModel.queryComponents({
          mainType: axisType,
          index: seriesModel.get(name + 'Index'),
          id: seriesModel.get(name + 'Id')
        })[0];
        var axisIndex = axisModel.componentIndex;
        newOption[axisType] = newOption[axisType] || [];

        for (var i = 0; i <= axisIndex; i++) {
          newOption[axisType][axisIndex] = newOption[axisType][axisIndex] || {};
        }

        newOption[axisType][axisIndex].boundaryGap = type === 'bar';
      }
    }
  };

  zrUtil.each(radioTypes, function (radio) {
    if (zrUtil.indexOf(radio, type) >= 0) {
      zrUtil.each(radio, function (item) {
        model.setIconStatus(item, 'normal');
      });
    }
  });
  model.setIconStatus(type, 'emphasis');
  ecModel.eachComponent({
    mainType: 'series',
    query: seriesIndex == null ? null : {
      seriesIndex: seriesIndex
    }
  }, generateNewSeriesTypes);
  var newTitle; // Change title of stack

  if (type === 'stack') {
    var isStack = newOption.series && newOption.series[0] && newOption.series[0].stack === INNER_STACK_KEYWORD;
    newTitle = isStack ? zrUtil.merge({
      stack: magicTypeLang.title.tiled
    }, magicTypeLang.title) : zrUtil.clone(magicTypeLang.title);
  }

  api.dispatchAction({
    type: 'changeMagicType',
    currentType: type,
    newOption: newOption,
    newTitle: newTitle
  });
};

echarts.registerAction({
  type: 'changeMagicType',
  event: 'magicTypeChanged',
  update: 'prepareAndUpdate'
}, function (payload, ecModel) {
  ecModel.mergeOption(payload.newOption);
});
featureManager.register('magicType', MagicType);
var _default = MagicType;
module.exports = _default;

/***/ }),

/***/ "db9e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var textContain = __webpack_require__("e86a");

var featureManager = __webpack_require__("2145");

var graphic = __webpack_require__("2306");

var Model = __webpack_require__("4319");

var DataDiffer = __webpack_require__("80f0");

var listComponentHelper = __webpack_require__("7919");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'toolbox',
  render: function (toolboxModel, ecModel, api, payload) {
    var group = this.group;
    group.removeAll();

    if (!toolboxModel.get('show')) {
      return;
    }

    var itemSize = +toolboxModel.get('itemSize');
    var featureOpts = toolboxModel.get('feature') || {};
    var features = this._features || (this._features = {});
    var featureNames = [];
    zrUtil.each(featureOpts, function (opt, name) {
      featureNames.push(name);
    });
    new DataDiffer(this._featureNames || [], featureNames).add(processFeature).update(processFeature).remove(zrUtil.curry(processFeature, null)).execute(); // Keep for diff.

    this._featureNames = featureNames;

    function processFeature(newIndex, oldIndex) {
      var featureName = featureNames[newIndex];
      var oldName = featureNames[oldIndex];
      var featureOpt = featureOpts[featureName];
      var featureModel = new Model(featureOpt, toolboxModel, toolboxModel.ecModel);
      var feature; // FIX#11236, merge feature title from MagicType newOption. TODO: consider seriesIndex ?

      if (payload && payload.newTitle != null) {
        featureOpt.title = payload.newTitle;
      }

      if (featureName && !oldName) {
        // Create
        if (isUserFeatureName(featureName)) {
          feature = {
            model: featureModel,
            onclick: featureModel.option.onclick,
            featureName: featureName
          };
        } else {
          var Feature = featureManager.get(featureName);

          if (!Feature) {
            return;
          }

          feature = new Feature(featureModel, ecModel, api);
        }

        features[featureName] = feature;
      } else {
        feature = features[oldName]; // If feature does not exsit.

        if (!feature) {
          return;
        }

        feature.model = featureModel;
        feature.ecModel = ecModel;
        feature.api = api;
      }

      if (!featureName && oldName) {
        feature.dispose && feature.dispose(ecModel, api);
        return;
      }

      if (!featureModel.get('show') || feature.unusable) {
        feature.remove && feature.remove(ecModel, api);
        return;
      }

      createIconPaths(featureModel, feature, featureName);

      featureModel.setIconStatus = function (iconName, status) {
        var option = this.option;
        var iconPaths = this.iconPaths;
        option.iconStatus = option.iconStatus || {};
        option.iconStatus[iconName] = status; // FIXME

        iconPaths[iconName] && iconPaths[iconName].trigger(status);
      };

      if (feature.render) {
        feature.render(featureModel, ecModel, api, payload);
      }
    }

    function createIconPaths(featureModel, feature, featureName) {
      var iconStyleModel = featureModel.getModel('iconStyle');
      var iconStyleEmphasisModel = featureModel.getModel('emphasis.iconStyle'); // If one feature has mutiple icon. they are orginaized as
      // {
      //     icon: {
      //         foo: '',
      //         bar: ''
      //     },
      //     title: {
      //         foo: '',
      //         bar: ''
      //     }
      // }

      var icons = feature.getIcons ? feature.getIcons() : featureModel.get('icon');
      var titles = featureModel.get('title') || {};

      if (typeof icons === 'string') {
        var icon = icons;
        var title = titles;
        icons = {};
        titles = {};
        icons[featureName] = icon;
        titles[featureName] = title;
      }

      var iconPaths = featureModel.iconPaths = {};
      zrUtil.each(icons, function (iconStr, iconName) {
        var path = graphic.createIcon(iconStr, {}, {
          x: -itemSize / 2,
          y: -itemSize / 2,
          width: itemSize,
          height: itemSize
        });
        path.setStyle(iconStyleModel.getItemStyle());
        path.hoverStyle = iconStyleEmphasisModel.getItemStyle(); // Text position calculation

        path.setStyle({
          text: titles[iconName],
          textAlign: iconStyleEmphasisModel.get('textAlign'),
          textBorderRadius: iconStyleEmphasisModel.get('textBorderRadius'),
          textPadding: iconStyleEmphasisModel.get('textPadding'),
          textFill: null
        });
        var tooltipModel = toolboxModel.getModel('tooltip');

        if (tooltipModel && tooltipModel.get('show')) {
          path.attr('tooltip', zrUtil.extend({
            content: titles[iconName],
            formatter: tooltipModel.get('formatter', true) || function () {
              return titles[iconName];
            },
            formatterParams: {
              componentType: 'toolbox',
              name: iconName,
              title: titles[iconName],
              $vars: ['name', 'title']
            },
            position: tooltipModel.get('position', true) || 'bottom'
          }, tooltipModel.option));
        }

        graphic.setHoverStyle(path);

        if (toolboxModel.get('showTitle')) {
          path.__title = titles[iconName];
          path.on('mouseover', function () {
            // Should not reuse above hoverStyle, which might be modified.
            var hoverStyle = iconStyleEmphasisModel.getItemStyle();
            var defaultTextPosition = toolboxModel.get('orient') === 'vertical' ? toolboxModel.get('right') == null ? 'right' : 'left' : toolboxModel.get('bottom') == null ? 'bottom' : 'top';
            path.setStyle({
              textFill: iconStyleEmphasisModel.get('textFill') || hoverStyle.fill || hoverStyle.stroke || '#000',
              textBackgroundColor: iconStyleEmphasisModel.get('textBackgroundColor'),
              textPosition: iconStyleEmphasisModel.get('textPosition') || defaultTextPosition
            });
          }).on('mouseout', function () {
            path.setStyle({
              textFill: null,
              textBackgroundColor: null
            });
          });
        }

        path.trigger(featureModel.get('iconStatus.' + iconName) || 'normal');
        group.add(path);
        path.on('click', zrUtil.bind(feature.onclick, feature, ecModel, api, iconName));
        iconPaths[iconName] = path;
      });
    }

    listComponentHelper.layout(group, toolboxModel, api); // Render background after group is layout
    // FIXME

    group.add(listComponentHelper.makeBackground(group.getBoundingRect(), toolboxModel)); // Adjust icon title positions to avoid them out of screen

    group.eachChild(function (icon) {
      var titleText = icon.__title;
      var hoverStyle = icon.hoverStyle; // May be background element

      if (hoverStyle && titleText) {
        var rect = textContain.getBoundingRect(titleText, textContain.makeFont(hoverStyle));
        var offsetX = icon.position[0] + group.position[0];
        var offsetY = icon.position[1] + group.position[1] + itemSize;
        var needPutOnTop = false;

        if (offsetY + rect.height > api.getHeight()) {
          hoverStyle.textPosition = 'top';
          needPutOnTop = true;
        }

        var topOffset = needPutOnTop ? -5 - rect.height : itemSize + 8;

        if (offsetX + rect.width / 2 > api.getWidth()) {
          hoverStyle.textPosition = ['100%', topOffset];
          hoverStyle.textAlign = 'right';
        } else if (offsetX - rect.width / 2 < 0) {
          hoverStyle.textPosition = [0, topOffset];
          hoverStyle.textAlign = 'left';
        }
      }
    });
  },
  updateView: function (toolboxModel, ecModel, api, payload) {
    zrUtil.each(this._features, function (feature) {
      feature.updateView && feature.updateView(feature.model, ecModel, api, payload);
    });
  },
  // updateLayout: function (toolboxModel, ecModel, api, payload) {
  //     zrUtil.each(this._features, function (feature) {
  //         feature.updateLayout && feature.updateLayout(feature.model, ecModel, api, payload);
  //     });
  // },
  remove: function (ecModel, api) {
    zrUtil.each(this._features, function (feature) {
      feature.remove && feature.remove(ecModel, api);
    });
    this.group.removeAll();
  },
  dispose: function (ecModel, api) {
    zrUtil.each(this._features, function (feature) {
      feature.dispose && feature.dispose(ecModel, api);
    });
  }
});

function isUserFeatureName(featureName) {
  return featureName.indexOf('my') === 0;
}

module.exports = _default;

/***/ }),

/***/ "df70":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var history = __webpack_require__("6fda");

var lang = __webpack_require__("29a8");

var featureManager = __webpack_require__("2145");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var restoreLang = lang.toolbox.restore;

function Restore(model) {
  this.model = model;
}

Restore.defaultOption = {
  show: true,

  /* eslint-disable */
  icon: 'M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',

  /* eslint-enable */
  title: restoreLang.title
};
var proto = Restore.prototype;

proto.onclick = function (ecModel, api, type) {
  history.clear(ecModel);
  api.dispatchAction({
    type: 'restore',
    from: this.uid
  });
};

featureManager.register('restore', Restore);
echarts.registerAction({
  type: 'restore',
  event: 'restore',
  update: 'prepareAndUpdate'
}, function (payload, ecModel) {
  ecModel.resetOption('recreate');
});
var _default = Restore;
module.exports = _default;

/***/ }),

/***/ "fecb":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var featureManager = __webpack_require__("2145");

var lang = __webpack_require__("29a8");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var brushLang = lang.toolbox.brush;

function Brush(model, ecModel, api) {
  this.model = model;
  this.ecModel = ecModel;
  this.api = api;
  /**
   * @private
   * @type {string}
   */

  this._brushType;
  /**
   * @private
   * @type {string}
   */

  this._brushMode;
}

Brush.defaultOption = {
  show: true,
  type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
  icon: {
    /* eslint-disable */
    rect: 'M7.3,34.7 M0.4,10V-0.2h9.8 M89.6,10V-0.2h-9.8 M0.4,60v10.2h9.8 M89.6,60v10.2h-9.8 M12.3,22.4V10.5h13.1 M33.6,10.5h7.8 M49.1,10.5h7.8 M77.5,22.4V10.5h-13 M12.3,31.1v8.2 M77.7,31.1v8.2 M12.3,47.6v11.9h13.1 M33.6,59.5h7.6 M49.1,59.5 h7.7 M77.5,47.6v11.9h-13',
    // jshint ignore:line
    polygon: 'M55.2,34.9c1.7,0,3.1,1.4,3.1,3.1s-1.4,3.1-3.1,3.1 s-3.1-1.4-3.1-3.1S53.5,34.9,55.2,34.9z M50.4,51c1.7,0,3.1,1.4,3.1,3.1c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1 C47.3,52.4,48.7,51,50.4,51z M55.6,37.1l1.5-7.8 M60.1,13.5l1.6-8.7l-7.8,4 M59,19l-1,5.3 M24,16.1l6.4,4.9l6.4-3.3 M48.5,11.6 l-5.9,3.1 M19.1,12.8L9.7,5.1l1.1,7.7 M13.4,29.8l1,7.3l6.6,1.6 M11.6,18.4l1,6.1 M32.8,41.9 M26.6,40.4 M27.3,40.2l6.1,1.6 M49.9,52.1l-5.6-7.6l-4.9-1.2',
    // jshint ignore:line
    lineX: 'M15.2,30 M19.7,15.6V1.9H29 M34.8,1.9H40.4 M55.3,15.6V1.9H45.9 M19.7,44.4V58.1H29 M34.8,58.1H40.4 M55.3,44.4 V58.1H45.9 M12.5,20.3l-9.4,9.6l9.6,9.8 M3.1,29.9h16.5 M62.5,20.3l9.4,9.6L62.3,39.7 M71.9,29.9H55.4',
    // jshint ignore:line
    lineY: 'M38.8,7.7 M52.7,12h13.2v9 M65.9,26.6V32 M52.7,46.3h13.2v-9 M24.9,12H11.8v9 M11.8,26.6V32 M24.9,46.3H11.8v-9 M48.2,5.1l-9.3-9l-9.4,9.2 M38.9-3.9V12 M48.2,53.3l-9.3,9l-9.4-9.2 M38.9,62.3V46.4',
    // jshint ignore:line
    keep: 'M4,10.5V1h10.3 M20.7,1h6.1 M33,1h6.1 M55.4,10.5V1H45.2 M4,17.3v6.6 M55.6,17.3v6.6 M4,30.5V40h10.3 M20.7,40 h6.1 M33,40h6.1 M55.4,30.5V40H45.2 M21,18.9h62.9v48.6H21V18.9z',
    // jshint ignore:line
    clear: 'M22,14.7l30.9,31 M52.9,14.7L22,45.7 M4.7,16.8V4.2h13.1 M26,4.2h7.8 M41.6,4.2h7.8 M70.3,16.8V4.2H57.2 M4.7,25.9v8.6 M70.3,25.9v8.6 M4.7,43.2v12.6h13.1 M26,55.8h7.8 M41.6,55.8h7.8 M70.3,43.2v12.6H57.2' // jshint ignore:line

    /* eslint-enable */

  },
  // `rect`, `polygon`, `lineX`, `lineY`, `keep`, `clear`
  title: zrUtil.clone(brushLang.title)
};
var proto = Brush.prototype; // proto.updateLayout = function (featureModel, ecModel, api) {

/* eslint-disable */

proto.render =
/* eslint-enable */
proto.updateView = function (featureModel, ecModel, api) {
  var brushType;
  var brushMode;
  var isBrushed;
  ecModel.eachComponent({
    mainType: 'brush'
  }, function (brushModel) {
    brushType = brushModel.brushType;
    brushMode = brushModel.brushOption.brushMode || 'single';
    isBrushed |= brushModel.areas.length;
  });
  this._brushType = brushType;
  this._brushMode = brushMode;
  zrUtil.each(featureModel.get('type', true), function (type) {
    featureModel.setIconStatus(type, (type === 'keep' ? brushMode === 'multiple' : type === 'clear' ? isBrushed : type === brushType) ? 'emphasis' : 'normal');
  });
};

proto.getIcons = function () {
  var model = this.model;
  var availableIcons = model.get('icon', true);
  var icons = {};
  zrUtil.each(model.get('type', true), function (type) {
    if (availableIcons[type]) {
      icons[type] = availableIcons[type];
    }
  });
  return icons;
};

proto.onclick = function (ecModel, api, type) {
  var brushType = this._brushType;
  var brushMode = this._brushMode;

  if (type === 'clear') {
    // Trigger parallel action firstly
    api.dispatchAction({
      type: 'axisAreaSelect',
      intervals: []
    });
    api.dispatchAction({
      type: 'brush',
      command: 'clear',
      // Clear all areas of all brush components.
      areas: []
    });
  } else {
    api.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'brush',
      brushOption: {
        brushType: type === 'keep' ? brushType : brushType === type ? false : type,
        brushMode: type === 'keep' ? brushMode === 'multiple' ? 'single' : 'multiple' : brushMode
      }
    });
  }
};

featureManager.register('brush', Brush);
var _default = Brush;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~0e857292.e6c7641f.js.map