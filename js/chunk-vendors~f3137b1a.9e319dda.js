(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~f3137b1a"],{

/***/ "08c3":
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

var Axis = __webpack_require__("84ce");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Extend axis 2d
 * @constructor module:echarts/coord/cartesian/Axis2D
 * @extends {module:echarts/coord/cartesian/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 * @param {string} position
 */
var TimelineAxis = function (dim, scale, coordExtent, axisType) {
  Axis.call(this, dim, scale, coordExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = axisType || 'value';
  /**
   * Axis model
   * @param {module:echarts/component/TimelineModel}
   */

  this.model = null;
};

TimelineAxis.prototype = {
  constructor: TimelineAxis,

  /**
   * @override
   */
  getLabelModel: function () {
    return this.model.getModel('label');
  },

  /**
   * @override
   */
  isHorizontal: function () {
    return this.model.get('orient') === 'horizontal';
  }
};
zrUtil.inherits(TimelineAxis, Axis);
var _default = TimelineAxis;
module.exports = _default;

/***/ }),

/***/ "0b4b":
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

__webpack_require__("d28f");

__webpack_require__("f14c");

__webpack_require__("0ee7");

__webpack_require__("ebf9");

/***/ }),

/***/ "0ee7":
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

var layoutUtil = __webpack_require__("f934");

var LegendView = __webpack_require__("5e97");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Separate legend and scrollable legend to reduce package size.
 */
var Group = graphic.Group;
var WH = ['width', 'height'];
var XY = ['x', 'y'];
var ScrollableLegendView = LegendView.extend({
  type: 'legend.scroll',
  newlineDisabled: true,
  init: function () {
    ScrollableLegendView.superCall(this, 'init');
    /**
     * @private
     * @type {number} For `scroll`.
     */

    this._currentIndex = 0;
    /**
     * @private
     * @type {module:zrender/container/Group}
     */

    this.group.add(this._containerGroup = new Group());

    this._containerGroup.add(this.getContentGroup());
    /**
     * @private
     * @type {module:zrender/container/Group}
     */


    this.group.add(this._controllerGroup = new Group());
    /**
     *
     * @private
     */

    this._showController;
  },

  /**
   * @override
   */
  resetInner: function () {
    ScrollableLegendView.superCall(this, 'resetInner');

    this._controllerGroup.removeAll();

    this._containerGroup.removeClipPath();

    this._containerGroup.__rectSize = null;
  },

  /**
   * @override
   */
  renderInner: function (itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition) {
    var me = this; // Render content items.

    ScrollableLegendView.superCall(this, 'renderInner', itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition);
    var controllerGroup = this._controllerGroup; // FIXME: support be 'auto' adapt to size number text length,
    // e.g., '3/12345' should not overlap with the control arrow button.

    var pageIconSize = legendModel.get('pageIconSize', true);

    if (!zrUtil.isArray(pageIconSize)) {
      pageIconSize = [pageIconSize, pageIconSize];
    }

    createPageButton('pagePrev', 0);
    var pageTextStyleModel = legendModel.getModel('pageTextStyle');
    controllerGroup.add(new graphic.Text({
      name: 'pageText',
      style: {
        textFill: pageTextStyleModel.getTextColor(),
        font: pageTextStyleModel.getFont(),
        textVerticalAlign: 'middle',
        textAlign: 'center'
      },
      silent: true
    }));
    createPageButton('pageNext', 1);

    function createPageButton(name, iconIdx) {
      var pageDataIndexName = name + 'DataIndex';
      var icon = graphic.createIcon(legendModel.get('pageIcons', true)[legendModel.getOrient().name][iconIdx], {
        // Buttons will be created in each render, so we do not need
        // to worry about avoiding using legendModel kept in scope.
        onclick: zrUtil.bind(me._pageGo, me, pageDataIndexName, legendModel, api)
      }, {
        x: -pageIconSize[0] / 2,
        y: -pageIconSize[1] / 2,
        width: pageIconSize[0],
        height: pageIconSize[1]
      });
      icon.name = name;
      controllerGroup.add(icon);
    }
  },

  /**
   * @override
   */
  layoutInner: function (legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition) {
    var selectorGroup = this.getSelectorGroup();
    var orientIdx = legendModel.getOrient().index;
    var wh = WH[orientIdx];
    var xy = XY[orientIdx];
    var hw = WH[1 - orientIdx];
    var yx = XY[1 - orientIdx];
    selector && layoutUtil.box( // Buttons in selectorGroup always layout horizontally
    'horizontal', selectorGroup, legendModel.get('selectorItemGap', true));
    var selectorButtonGap = legendModel.get('selectorButtonGap', true);
    var selectorRect = selectorGroup.getBoundingRect();
    var selectorPos = [-selectorRect.x, -selectorRect.y];
    var processMaxSize = zrUtil.clone(maxSize);
    selector && (processMaxSize[wh] = maxSize[wh] - selectorRect[wh] - selectorButtonGap);

    var mainRect = this._layoutContentAndController(legendModel, isFirstRender, processMaxSize, orientIdx, wh, hw, yx);

    if (selector) {
      if (selectorPosition === 'end') {
        selectorPos[orientIdx] += mainRect[wh] + selectorButtonGap;
      } else {
        var offset = selectorRect[wh] + selectorButtonGap;
        selectorPos[orientIdx] -= offset;
        mainRect[xy] -= offset;
      }

      mainRect[wh] += selectorRect[wh] + selectorButtonGap;
      selectorPos[1 - orientIdx] += mainRect[yx] + mainRect[hw] / 2 - selectorRect[hw] / 2;
      mainRect[hw] = Math.max(mainRect[hw], selectorRect[hw]);
      mainRect[yx] = Math.min(mainRect[yx], selectorRect[yx] + selectorPos[1 - orientIdx]);
      selectorGroup.attr('position', selectorPos);
    }

    return mainRect;
  },
  _layoutContentAndController: function (legendModel, isFirstRender, maxSize, orientIdx, wh, hw, yx) {
    var contentGroup = this.getContentGroup();
    var containerGroup = this._containerGroup;
    var controllerGroup = this._controllerGroup; // Place items in contentGroup.

    layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), !orientIdx ? null : maxSize.width, orientIdx ? null : maxSize.height);
    layoutUtil.box( // Buttons in controller are layout always horizontally.
    'horizontal', controllerGroup, legendModel.get('pageButtonItemGap', true));
    var contentRect = contentGroup.getBoundingRect();
    var controllerRect = controllerGroup.getBoundingRect();
    var showController = this._showController = contentRect[wh] > maxSize[wh];
    var contentPos = [-contentRect.x, -contentRect.y]; // Remain contentPos when scroll animation perfroming.
    // If first rendering, `contentGroup.position` is [0, 0], which
    // does not make sense and may cause unexepcted animation if adopted.

    if (!isFirstRender) {
      contentPos[orientIdx] = contentGroup.position[orientIdx];
    } // Layout container group based on 0.


    var containerPos = [0, 0];
    var controllerPos = [-controllerRect.x, -controllerRect.y];
    var pageButtonGap = zrUtil.retrieve2(legendModel.get('pageButtonGap', true), legendModel.get('itemGap', true)); // Place containerGroup and controllerGroup and contentGroup.

    if (showController) {
      var pageButtonPosition = legendModel.get('pageButtonPosition', true); // controller is on the right / bottom.

      if (pageButtonPosition === 'end') {
        controllerPos[orientIdx] += maxSize[wh] - controllerRect[wh];
      } // controller is on the left / top.
      else {
          containerPos[orientIdx] += controllerRect[wh] + pageButtonGap;
        }
    } // Always align controller to content as 'middle'.


    controllerPos[1 - orientIdx] += contentRect[hw] / 2 - controllerRect[hw] / 2;
    contentGroup.attr('position', contentPos);
    containerGroup.attr('position', containerPos);
    controllerGroup.attr('position', controllerPos); // Calculate `mainRect` and set `clipPath`.
    // mainRect should not be calculated by `this.group.getBoundingRect()`
    // for sake of the overflow.

    var mainRect = {
      x: 0,
      y: 0
    }; // Consider content may be overflow (should be clipped).

    mainRect[wh] = showController ? maxSize[wh] : contentRect[wh];
    mainRect[hw] = Math.max(contentRect[hw], controllerRect[hw]); // `containerRect[yx] + containerPos[1 - orientIdx]` is 0.

    mainRect[yx] = Math.min(0, controllerRect[yx] + controllerPos[1 - orientIdx]);
    containerGroup.__rectSize = maxSize[wh];

    if (showController) {
      var clipShape = {
        x: 0,
        y: 0
      };
      clipShape[wh] = Math.max(maxSize[wh] - controllerRect[wh] - pageButtonGap, 0);
      clipShape[hw] = mainRect[hw];
      containerGroup.setClipPath(new graphic.Rect({
        shape: clipShape
      })); // Consider content may be larger than container, container rect
      // can not be obtained from `containerGroup.getBoundingRect()`.

      containerGroup.__rectSize = clipShape[wh];
    } else {
      // Do not remove or ignore controller. Keep them set as placeholders.
      controllerGroup.eachChild(function (child) {
        child.attr({
          invisible: true,
          silent: true
        });
      });
    } // Content translate animation.


    var pageInfo = this._getPageInfo(legendModel);

    pageInfo.pageIndex != null && graphic.updateProps(contentGroup, {
      position: pageInfo.contentPosition
    }, // When switch from "show controller" to "not show controller", view should be
    // updated immediately without animation, otherwise causes weird effect.
    showController ? legendModel : false);

    this._updatePageInfoView(legendModel, pageInfo);

    return mainRect;
  },
  _pageGo: function (to, legendModel, api) {
    var scrollDataIndex = this._getPageInfo(legendModel)[to];

    scrollDataIndex != null && api.dispatchAction({
      type: 'legendScroll',
      scrollDataIndex: scrollDataIndex,
      legendId: legendModel.id
    });
  },
  _updatePageInfoView: function (legendModel, pageInfo) {
    var controllerGroup = this._controllerGroup;
    zrUtil.each(['pagePrev', 'pageNext'], function (name) {
      var canJump = pageInfo[name + 'DataIndex'] != null;
      var icon = controllerGroup.childOfName(name);

      if (icon) {
        icon.setStyle('fill', canJump ? legendModel.get('pageIconColor', true) : legendModel.get('pageIconInactiveColor', true));
        icon.cursor = canJump ? 'pointer' : 'default';
      }
    });
    var pageText = controllerGroup.childOfName('pageText');
    var pageFormatter = legendModel.get('pageFormatter');
    var pageIndex = pageInfo.pageIndex;
    var current = pageIndex != null ? pageIndex + 1 : 0;
    var total = pageInfo.pageCount;
    pageText && pageFormatter && pageText.setStyle('text', zrUtil.isString(pageFormatter) ? pageFormatter.replace('{current}', current).replace('{total}', total) : pageFormatter({
      current: current,
      total: total
    }));
  },

  /**
   * @param {module:echarts/model/Model} legendModel
   * @return {Object} {
   *  contentPosition: Array.<number>, null when data item not found.
   *  pageIndex: number, null when data item not found.
   *  pageCount: number, always be a number, can be 0.
   *  pagePrevDataIndex: number, null when no previous page.
   *  pageNextDataIndex: number, null when no next page.
   * }
   */
  _getPageInfo: function (legendModel) {
    var scrollDataIndex = legendModel.get('scrollDataIndex', true);
    var contentGroup = this.getContentGroup();
    var containerRectSize = this._containerGroup.__rectSize;
    var orientIdx = legendModel.getOrient().index;
    var wh = WH[orientIdx];
    var xy = XY[orientIdx];

    var targetItemIndex = this._findTargetItemIndex(scrollDataIndex);

    var children = contentGroup.children();
    var targetItem = children[targetItemIndex];
    var itemCount = children.length;
    var pCount = !itemCount ? 0 : 1;
    var result = {
      contentPosition: contentGroup.position.slice(),
      pageCount: pCount,
      pageIndex: pCount - 1,
      pagePrevDataIndex: null,
      pageNextDataIndex: null
    };

    if (!targetItem) {
      return result;
    }

    var targetItemInfo = getItemInfo(targetItem);
    result.contentPosition[orientIdx] = -targetItemInfo.s; // Strategy:
    // (1) Always align based on the left/top most item.
    // (2) It is user-friendly that the last item shown in the
    // current window is shown at the begining of next window.
    // Otherwise if half of the last item is cut by the window,
    // it will have no chance to display entirely.
    // (3) Consider that item size probably be different, we
    // have calculate pageIndex by size rather than item index,
    // and we can not get page index directly by division.
    // (4) The window is to narrow to contain more than
    // one item, we should make sure that the page can be fliped.

    for (var i = targetItemIndex + 1, winStartItemInfo = targetItemInfo, winEndItemInfo = targetItemInfo, currItemInfo = null; i <= itemCount; ++i) {
      currItemInfo = getItemInfo(children[i]);

      if ( // Half of the last item is out of the window.
      !currItemInfo && winEndItemInfo.e > winStartItemInfo.s + containerRectSize || // If the current item does not intersect with the window, the new page
      // can be started at the current item or the last item.
      currItemInfo && !intersect(currItemInfo, winStartItemInfo.s)) {
        if (winEndItemInfo.i > winStartItemInfo.i) {
          winStartItemInfo = winEndItemInfo;
        } else {
          // e.g., when page size is smaller than item size.
          winStartItemInfo = currItemInfo;
        }

        if (winStartItemInfo) {
          if (result.pageNextDataIndex == null) {
            result.pageNextDataIndex = winStartItemInfo.i;
          }

          ++result.pageCount;
        }
      }

      winEndItemInfo = currItemInfo;
    }

    for (var i = targetItemIndex - 1, winStartItemInfo = targetItemInfo, winEndItemInfo = targetItemInfo, currItemInfo = null; i >= -1; --i) {
      currItemInfo = getItemInfo(children[i]);

      if ( // If the the end item does not intersect with the window started
      // from the current item, a page can be settled.
      (!currItemInfo || !intersect(winEndItemInfo, currItemInfo.s)) && // e.g., when page size is smaller than item size.
      winStartItemInfo.i < winEndItemInfo.i) {
        winEndItemInfo = winStartItemInfo;

        if (result.pagePrevDataIndex == null) {
          result.pagePrevDataIndex = winStartItemInfo.i;
        }

        ++result.pageCount;
        ++result.pageIndex;
      }

      winStartItemInfo = currItemInfo;
    }

    return result;

    function getItemInfo(el) {
      if (el) {
        var itemRect = el.getBoundingRect();
        var start = itemRect[xy] + el.position[orientIdx];
        return {
          s: start,
          e: start + itemRect[wh],
          i: el.__legendDataIndex
        };
      }
    }

    function intersect(itemInfo, winStart) {
      return itemInfo.e >= winStart && itemInfo.s <= winStart + containerRectSize;
    }
  },
  _findTargetItemIndex: function (targetDataIndex) {
    var index;
    var contentGroup = this.getContentGroup();
    var defaultIndex;

    if (this._showController) {
      contentGroup.eachChild(function (child, idx) {
        var legendDataIdx = child.__legendDataIndex; // FIXME
        // If the given targetDataIndex (from model) is illegal,
        // we use defualtIndex. But the index on the legend model and
        // action payload is still illegal. That case will not be
        // changed until some scenario requires.

        if (defaultIndex == null && legendDataIdx != null) {
          defaultIndex = idx;
        }

        if (legendDataIdx === targetDataIndex) {
          index = idx;
        }
      });
    }

    return index != null ? index : defaultIndex;
  }
});
var _default = ScrollableLegendView;
module.exports = _default;

/***/ }),

/***/ "1953":
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

var MarkerModel = __webpack_require__("2449");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = MarkerModel.extend({
  type: 'markLine',
  defaultOption: {
    zlevel: 0,
    z: 5,
    symbol: ['circle', 'arrow'],
    symbolSize: [8, 16],
    //symbolRotate: 0,
    precision: 2,
    tooltip: {
      trigger: 'item'
    },
    label: {
      show: true,
      position: 'end'
    },
    lineStyle: {
      type: 'dashed'
    },
    emphasis: {
      label: {
        show: true
      },
      lineStyle: {
        width: 3
      }
    },
    animationEasing: 'linear'
  }
});

module.exports = _default;

/***/ }),

/***/ "2449":
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

var formatUtil = __webpack_require__("eda2");

var dataFormatMixin = __webpack_require__("38a2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var addCommas = formatUtil.addCommas;
var encodeHTML = formatUtil.encodeHTML;

function fillLabel(opt) {
  modelUtil.defaultEmphasis(opt, 'label', ['show']);
}

var MarkerModel = echarts.extendComponentModel({
  type: 'marker',
  dependencies: ['series', 'grid', 'polar', 'geo'],

  /**
   * @overrite
   */
  init: function (option, parentModel, ecModel) {
    this.mergeDefaultAndTheme(option, ecModel);

    this._mergeOption(option, ecModel, false, true);
  },

  /**
   * @return {boolean}
   */
  isAnimationEnabled: function () {
    if (env.node) {
      return false;
    }

    var hostSeries = this.__hostSeries;
    return this.getShallow('animation') && hostSeries && hostSeries.isAnimationEnabled();
  },

  /**
   * @overrite
   */
  mergeOption: function (newOpt, ecModel) {
    this._mergeOption(newOpt, ecModel, false, false);
  },
  _mergeOption: function (newOpt, ecModel, createdBySelf, isInit) {
    var MarkerModel = this.constructor;
    var modelPropName = this.mainType + 'Model';

    if (!createdBySelf) {
      ecModel.eachSeries(function (seriesModel) {
        var markerOpt = seriesModel.get(this.mainType, true);
        var markerModel = seriesModel[modelPropName];

        if (!markerOpt || !markerOpt.data) {
          seriesModel[modelPropName] = null;
          return;
        }

        if (!markerModel) {
          if (isInit) {
            // Default label emphasis `position` and `show`
            fillLabel(markerOpt);
          }

          zrUtil.each(markerOpt.data, function (item) {
            // FIXME Overwrite fillLabel method ?
            if (item instanceof Array) {
              fillLabel(item[0]);
              fillLabel(item[1]);
            } else {
              fillLabel(item);
            }
          });
          markerModel = new MarkerModel(markerOpt, this, ecModel);
          zrUtil.extend(markerModel, {
            mainType: this.mainType,
            // Use the same series index and name
            seriesIndex: seriesModel.seriesIndex,
            name: seriesModel.name,
            createdBySelf: true
          });
          markerModel.__hostSeries = seriesModel;
        } else {
          markerModel._mergeOption(markerOpt, ecModel, true);
        }

        seriesModel[modelPropName] = markerModel;
      }, this);
    }
  },
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var value = this.getRawValue(dataIndex);
    var formattedValue = zrUtil.isArray(value) ? zrUtil.map(value, addCommas).join(', ') : addCommas(value);
    var name = data.getName(dataIndex);
    var html = encodeHTML(this.name);

    if (value != null || name) {
      html += '<br />';
    }

    if (name) {
      html += encodeHTML(name);

      if (value != null) {
        html += ' : ';
      }
    }

    if (value != null) {
      html += encodeHTML(formattedValue);
    }

    return html;
  },
  getData: function () {
    return this._data;
  },
  setData: function (data) {
    this._data = data;
  }
});
zrUtil.mixin(MarkerModel, dataFormatMixin);
var _default = MarkerModel;
module.exports = _default;

/***/ }),

/***/ "2cfc":
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

__webpack_require__("4338");

__webpack_require__("bcbe");

__webpack_require__("c62c");

__webpack_require__("cb8f");

__webpack_require__("f138");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.extendComponentView({
  type: 'single'
});

/***/ }),

/***/ "2f73":
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

var barPolar = __webpack_require__("1e32");

__webpack_require__("1ccf");

__webpack_require__("f5e6");

__webpack_require__("792e");

__webpack_require__("cb8f");

__webpack_require__("6acf");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// For reducing size of echarts.min, barLayoutPolar is required by polar.
echarts.registerLayout(zrUtil.curry(barPolar, 'bar')); // Polar view

echarts.extendComponentView({
  type: 'polar'
});

/***/ }),

/***/ "307d":
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

var numberUtil = __webpack_require__("3842");

var markerHelper = __webpack_require__("923d");

var LineDraw = __webpack_require__("73ca");

var MarkerView = __webpack_require__("88f0");

var _dataStackHelper = __webpack_require__("ee1a");

var getStackedDimension = _dataStackHelper.getStackedDimension;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var markLineTransform = function (seriesModel, coordSys, mlModel, item) {
  var data = seriesModel.getData(); // Special type markLine like 'min', 'max', 'average', 'median'

  var mlType = item.type;

  if (!zrUtil.isArray(item) && (mlType === 'min' || mlType === 'max' || mlType === 'average' || mlType === 'median' // In case
  // data: [{
  //   yAxis: 10
  // }]
  || item.xAxis != null || item.yAxis != null)) {
    var valueAxis;
    var value;

    if (item.yAxis != null || item.xAxis != null) {
      valueAxis = coordSys.getAxis(item.yAxis != null ? 'y' : 'x');
      value = zrUtil.retrieve(item.yAxis, item.xAxis);
    } else {
      var axisInfo = markerHelper.getAxisInfo(item, data, coordSys, seriesModel);
      valueAxis = axisInfo.valueAxis;
      var valueDataDim = getStackedDimension(data, axisInfo.valueDataDim);
      value = markerHelper.numCalculate(data, valueDataDim, mlType);
    }

    var valueIndex = valueAxis.dim === 'x' ? 0 : 1;
    var baseIndex = 1 - valueIndex;
    var mlFrom = zrUtil.clone(item);
    var mlTo = {};
    mlFrom.type = null;
    mlFrom.coord = [];
    mlTo.coord = [];
    mlFrom.coord[baseIndex] = -Infinity;
    mlTo.coord[baseIndex] = Infinity;
    var precision = mlModel.get('precision');

    if (precision >= 0 && typeof value === 'number') {
      value = +value.toFixed(Math.min(precision, 20));
    }

    mlFrom.coord[valueIndex] = mlTo.coord[valueIndex] = value;
    item = [mlFrom, mlTo, {
      // Extra option for tooltip and label
      type: mlType,
      valueIndex: item.valueIndex,
      // Force to use the value of calculated value.
      value: value
    }];
  }

  item = [markerHelper.dataTransform(seriesModel, item[0]), markerHelper.dataTransform(seriesModel, item[1]), zrUtil.extend({}, item[2])]; // Avoid line data type is extended by from(to) data type

  item[2].type = item[2].type || ''; // Merge from option and to option into line option

  zrUtil.merge(item[2], item[0]);
  zrUtil.merge(item[2], item[1]);
  return item;
};

function isInifinity(val) {
  return !isNaN(val) && !isFinite(val);
} // If a markLine has one dim


function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
  var otherDimIndex = 1 - dimIndex;
  var dimName = coordSys.dimensions[dimIndex];
  return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex]) && fromCoord[dimIndex] === toCoord[dimIndex] && coordSys.getAxis(dimName).containData(fromCoord[dimIndex]);
}

function markLineFilter(coordSys, item) {
  if (coordSys.type === 'cartesian2d') {
    var fromCoord = item[0].coord;
    var toCoord = item[1].coord; // In case
    // {
    //  markLine: {
    //    data: [{ yAxis: 2 }]
    //  }
    // }

    if (fromCoord && toCoord && (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys) || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys))) {
      return true;
    }
  }

  return markerHelper.dataFilter(coordSys, item[0]) && markerHelper.dataFilter(coordSys, item[1]);
}

function updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api) {
  var coordSys = seriesModel.coordinateSystem;
  var itemModel = data.getItemModel(idx);
  var point;
  var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
  var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());

  if (!isNaN(xPx) && !isNaN(yPx)) {
    point = [xPx, yPx];
  } else {
    // Chart like bar may have there own marker positioning logic
    if (seriesModel.getMarkerPosition) {
      // Use the getMarkerPoisition
      point = seriesModel.getMarkerPosition(data.getValues(data.dimensions, idx));
    } else {
      var dims = coordSys.dimensions;
      var x = data.get(dims[0], idx);
      var y = data.get(dims[1], idx);
      point = coordSys.dataToPoint([x, y]);
    } // Expand line to the edge of grid if value on one axis is Inifnity
    // In case
    //  markLine: {
    //    data: [{
    //      yAxis: 2
    //      // or
    //      type: 'average'
    //    }]
    //  }


    if (coordSys.type === 'cartesian2d') {
      var xAxis = coordSys.getAxis('x');
      var yAxis = coordSys.getAxis('y');
      var dims = coordSys.dimensions;

      if (isInifinity(data.get(dims[0], idx))) {
        point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[isFrom ? 0 : 1]);
      } else if (isInifinity(data.get(dims[1], idx))) {
        point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[isFrom ? 0 : 1]);
      }
    } // Use x, y if has any


    if (!isNaN(xPx)) {
      point[0] = xPx;
    }

    if (!isNaN(yPx)) {
      point[1] = yPx;
    }
  }

  data.setItemLayout(idx, point);
}

var _default = MarkerView.extend({
  type: 'markLine',
  // updateLayout: function (markLineModel, ecModel, api) {
  //     ecModel.eachSeries(function (seriesModel) {
  //         var mlModel = seriesModel.markLineModel;
  //         if (mlModel) {
  //             var mlData = mlModel.getData();
  //             var fromData = mlModel.__from;
  //             var toData = mlModel.__to;
  //             // Update visual and layout of from symbol and to symbol
  //             fromData.each(function (idx) {
  //                 updateSingleMarkerEndLayout(fromData, idx, true, seriesModel, api);
  //                 updateSingleMarkerEndLayout(toData, idx, false, seriesModel, api);
  //             });
  //             // Update layout of line
  //             mlData.each(function (idx) {
  //                 mlData.setItemLayout(idx, [
  //                     fromData.getItemLayout(idx),
  //                     toData.getItemLayout(idx)
  //                 ]);
  //             });
  //             this.markerGroupMap.get(seriesModel.id).updateLayout();
  //         }
  //     }, this);
  // },
  updateTransform: function (markLineModel, ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      var mlModel = seriesModel.markLineModel;

      if (mlModel) {
        var mlData = mlModel.getData();
        var fromData = mlModel.__from;
        var toData = mlModel.__to; // Update visual and layout of from symbol and to symbol

        fromData.each(function (idx) {
          updateSingleMarkerEndLayout(fromData, idx, true, seriesModel, api);
          updateSingleMarkerEndLayout(toData, idx, false, seriesModel, api);
        }); // Update layout of line

        mlData.each(function (idx) {
          mlData.setItemLayout(idx, [fromData.getItemLayout(idx), toData.getItemLayout(idx)]);
        });
        this.markerGroupMap.get(seriesModel.id).updateLayout();
      }
    }, this);
  },
  renderSeries: function (seriesModel, mlModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesId = seriesModel.id;
    var seriesData = seriesModel.getData();
    var lineDrawMap = this.markerGroupMap;
    var lineDraw = lineDrawMap.get(seriesId) || lineDrawMap.set(seriesId, new LineDraw());
    this.group.add(lineDraw.group);
    var mlData = createList(coordSys, seriesModel, mlModel);
    var fromData = mlData.from;
    var toData = mlData.to;
    var lineData = mlData.line;
    mlModel.__from = fromData;
    mlModel.__to = toData; // Line data for tooltip and formatter

    mlModel.setData(lineData);
    var symbolType = mlModel.get('symbol');
    var symbolSize = mlModel.get('symbolSize');

    if (!zrUtil.isArray(symbolType)) {
      symbolType = [symbolType, symbolType];
    }

    if (typeof symbolSize === 'number') {
      symbolSize = [symbolSize, symbolSize];
    } // Update visual and layout of from symbol and to symbol


    mlData.from.each(function (idx) {
      updateDataVisualAndLayout(fromData, idx, true);
      updateDataVisualAndLayout(toData, idx, false);
    }); // Update visual and layout of line

    lineData.each(function (idx) {
      var lineColor = lineData.getItemModel(idx).get('lineStyle.color');
      lineData.setItemVisual(idx, {
        color: lineColor || fromData.getItemVisual(idx, 'color')
      });
      lineData.setItemLayout(idx, [fromData.getItemLayout(idx), toData.getItemLayout(idx)]);
      lineData.setItemVisual(idx, {
        'fromSymbolSize': fromData.getItemVisual(idx, 'symbolSize'),
        'fromSymbol': fromData.getItemVisual(idx, 'symbol'),
        'toSymbolSize': toData.getItemVisual(idx, 'symbolSize'),
        'toSymbol': toData.getItemVisual(idx, 'symbol')
      });
    });
    lineDraw.updateData(lineData); // Set host model for tooltip
    // FIXME

    mlData.line.eachItemGraphicEl(function (el, idx) {
      el.traverse(function (child) {
        child.dataModel = mlModel;
      });
    });

    function updateDataVisualAndLayout(data, idx, isFrom) {
      var itemModel = data.getItemModel(idx);
      updateSingleMarkerEndLayout(data, idx, isFrom, seriesModel, api);
      data.setItemVisual(idx, {
        symbolSize: itemModel.get('symbolSize') || symbolSize[isFrom ? 0 : 1],
        symbol: itemModel.get('symbol', true) || symbolType[isFrom ? 0 : 1],
        color: itemModel.get('itemStyle.color') || seriesData.getVisual('color')
      });
    }

    lineDraw.__keep = true;
    lineDraw.group.silent = mlModel.get('silent') || seriesModel.get('silent');
  }
});
/**
 * @inner
 * @param {module:echarts/coord/*} coordSys
 * @param {module:echarts/model/Series} seriesModel
 * @param {module:echarts/model/Model} mpModel
 */


function createList(coordSys, seriesModel, mlModel) {
  var coordDimsInfos;

  if (coordSys) {
    coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
      var info = seriesModel.getData().getDimensionInfo(seriesModel.getData().mapDimension(coordDim)) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys

      return zrUtil.defaults({
        name: coordDim
      }, info);
    });
  } else {
    coordDimsInfos = [{
      name: 'value',
      type: 'float'
    }];
  }

  var fromData = new List(coordDimsInfos, mlModel);
  var toData = new List(coordDimsInfos, mlModel); // No dimensions

  var lineData = new List([], mlModel);
  var optData = zrUtil.map(mlModel.get('data'), zrUtil.curry(markLineTransform, seriesModel, coordSys, mlModel));

  if (coordSys) {
    optData = zrUtil.filter(optData, zrUtil.curry(markLineFilter, coordSys));
  }

  var dimValueGetter = coordSys ? markerHelper.dimValueGetter : function (item) {
    return item.value;
  };
  fromData.initData(zrUtil.map(optData, function (item) {
    return item[0];
  }), null, dimValueGetter);
  toData.initData(zrUtil.map(optData, function (item) {
    return item[1];
  }), null, dimValueGetter);
  lineData.initData(zrUtil.map(optData, function (item) {
    return item[2];
  }));
  lineData.hasItemOption = true;
  return {
    from: fromData,
    to: toData,
    line: lineData
  };
}

module.exports = _default;

/***/ }),

/***/ "347f":
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

var matrix = __webpack_require__("1687");

var graphic = __webpack_require__("2306");

var layout = __webpack_require__("f934");

var TimelineView = __webpack_require__("933b");

var TimelineAxis = __webpack_require__("08c3");

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var axisHelper = __webpack_require__("697e");

var numberUtil = __webpack_require__("3842");

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
var bind = zrUtil.bind;
var each = zrUtil.each;
var PI = Math.PI;

var _default = TimelineView.extend({
  type: 'timeline.slider',
  init: function (ecModel, api) {
    this.api = api;
    /**
     * @private
     * @type {module:echarts/component/timeline/TimelineAxis}
     */

    this._axis;
    /**
     * @private
     * @type {module:zrender/core/BoundingRect}
     */

    this._viewRect;
    /**
     * @type {number}
     */

    this._timer;
    /**
     * @type {module:zrender/Element}
     */

    this._currentPointer;
    /**
     * @type {module:zrender/container/Group}
     */

    this._mainGroup;
    /**
     * @type {module:zrender/container/Group}
     */

    this._labelGroup;
  },

  /**
   * @override
   */
  render: function (timelineModel, ecModel, api, payload) {
    this.model = timelineModel;
    this.api = api;
    this.ecModel = ecModel;
    this.group.removeAll();

    if (timelineModel.get('show', true)) {
      var layoutInfo = this._layout(timelineModel, api);

      var mainGroup = this._createGroup('mainGroup');

      var labelGroup = this._createGroup('labelGroup');
      /**
       * @private
       * @type {module:echarts/component/timeline/TimelineAxis}
       */


      var axis = this._axis = this._createAxis(layoutInfo, timelineModel);

      timelineModel.formatTooltip = function (dataIndex) {
        return encodeHTML(axis.scale.getLabel(dataIndex));
      };

      each(['AxisLine', 'AxisTick', 'Control', 'CurrentPointer'], function (name) {
        this['_render' + name](layoutInfo, mainGroup, axis, timelineModel);
      }, this);

      this._renderAxisLabel(layoutInfo, labelGroup, axis, timelineModel);

      this._position(layoutInfo, timelineModel);
    }

    this._doPlayStop();
  },

  /**
   * @override
   */
  remove: function () {
    this._clearTimer();

    this.group.removeAll();
  },

  /**
   * @override
   */
  dispose: function () {
    this._clearTimer();
  },
  _layout: function (timelineModel, api) {
    var labelPosOpt = timelineModel.get('label.position');
    var orient = timelineModel.get('orient');
    var viewRect = getViewRect(timelineModel, api); // Auto label offset.

    if (labelPosOpt == null || labelPosOpt === 'auto') {
      labelPosOpt = orient === 'horizontal' ? viewRect.y + viewRect.height / 2 < api.getHeight() / 2 ? '-' : '+' : viewRect.x + viewRect.width / 2 < api.getWidth() / 2 ? '+' : '-';
    } else if (isNaN(labelPosOpt)) {
      labelPosOpt = {
        horizontal: {
          top: '-',
          bottom: '+'
        },
        vertical: {
          left: '-',
          right: '+'
        }
      }[orient][labelPosOpt];
    }

    var labelAlignMap = {
      horizontal: 'center',
      vertical: labelPosOpt >= 0 || labelPosOpt === '+' ? 'left' : 'right'
    };
    var labelBaselineMap = {
      horizontal: labelPosOpt >= 0 || labelPosOpt === '+' ? 'top' : 'bottom',
      vertical: 'middle'
    };
    var rotationMap = {
      horizontal: 0,
      vertical: PI / 2
    }; // Position

    var mainLength = orient === 'vertical' ? viewRect.height : viewRect.width;
    var controlModel = timelineModel.getModel('controlStyle');
    var showControl = controlModel.get('show', true);
    var controlSize = showControl ? controlModel.get('itemSize') : 0;
    var controlGap = showControl ? controlModel.get('itemGap') : 0;
    var sizePlusGap = controlSize + controlGap; // Special label rotate.

    var labelRotation = timelineModel.get('label.rotate') || 0;
    labelRotation = labelRotation * PI / 180; // To radian.

    var playPosition;
    var prevBtnPosition;
    var nextBtnPosition;
    var axisExtent;
    var controlPosition = controlModel.get('position', true);
    var showPlayBtn = showControl && controlModel.get('showPlayBtn', true);
    var showPrevBtn = showControl && controlModel.get('showPrevBtn', true);
    var showNextBtn = showControl && controlModel.get('showNextBtn', true);
    var xLeft = 0;
    var xRight = mainLength; // position[0] means left, position[1] means middle.

    if (controlPosition === 'left' || controlPosition === 'bottom') {
      showPlayBtn && (playPosition = [0, 0], xLeft += sizePlusGap);
      showPrevBtn && (prevBtnPosition = [xLeft, 0], xLeft += sizePlusGap);
      showNextBtn && (nextBtnPosition = [xRight - controlSize, 0], xRight -= sizePlusGap);
    } else {
      // 'top' 'right'
      showPlayBtn && (playPosition = [xRight - controlSize, 0], xRight -= sizePlusGap);
      showPrevBtn && (prevBtnPosition = [0, 0], xLeft += sizePlusGap);
      showNextBtn && (nextBtnPosition = [xRight - controlSize, 0], xRight -= sizePlusGap);
    }

    axisExtent = [xLeft, xRight];

    if (timelineModel.get('inverse')) {
      axisExtent.reverse();
    }

    return {
      viewRect: viewRect,
      mainLength: mainLength,
      orient: orient,
      rotation: rotationMap[orient],
      labelRotation: labelRotation,
      labelPosOpt: labelPosOpt,
      labelAlign: timelineModel.get('label.align') || labelAlignMap[orient],
      labelBaseline: timelineModel.get('label.verticalAlign') || timelineModel.get('label.baseline') || labelBaselineMap[orient],
      // Based on mainGroup.
      playPosition: playPosition,
      prevBtnPosition: prevBtnPosition,
      nextBtnPosition: nextBtnPosition,
      axisExtent: axisExtent,
      controlSize: controlSize,
      controlGap: controlGap
    };
  },
  _position: function (layoutInfo, timelineModel) {
    // Position is be called finally, because bounding rect is needed for
    // adapt content to fill viewRect (auto adapt offset).
    // Timeline may be not all in the viewRect when 'offset' is specified
    // as a number, because it is more appropriate that label aligns at
    // 'offset' but not the other edge defined by viewRect.
    var mainGroup = this._mainGroup;
    var labelGroup = this._labelGroup;
    var viewRect = layoutInfo.viewRect;

    if (layoutInfo.orient === 'vertical') {
      // transform to horizontal, inverse rotate by left-top point.
      var m = matrix.create();
      var rotateOriginX = viewRect.x;
      var rotateOriginY = viewRect.y + viewRect.height;
      matrix.translate(m, m, [-rotateOriginX, -rotateOriginY]);
      matrix.rotate(m, m, -PI / 2);
      matrix.translate(m, m, [rotateOriginX, rotateOriginY]);
      viewRect = viewRect.clone();
      viewRect.applyTransform(m);
    }

    var viewBound = getBound(viewRect);
    var mainBound = getBound(mainGroup.getBoundingRect());
    var labelBound = getBound(labelGroup.getBoundingRect());
    var mainPosition = mainGroup.position;
    var labelsPosition = labelGroup.position;
    labelsPosition[0] = mainPosition[0] = viewBound[0][0];
    var labelPosOpt = layoutInfo.labelPosOpt;

    if (isNaN(labelPosOpt)) {
      // '+' or '-'
      var mainBoundIdx = labelPosOpt === '+' ? 0 : 1;
      toBound(mainPosition, mainBound, viewBound, 1, mainBoundIdx);
      toBound(labelsPosition, labelBound, viewBound, 1, 1 - mainBoundIdx);
    } else {
      var mainBoundIdx = labelPosOpt >= 0 ? 0 : 1;
      toBound(mainPosition, mainBound, viewBound, 1, mainBoundIdx);
      labelsPosition[1] = mainPosition[1] + labelPosOpt;
    }

    mainGroup.attr('position', mainPosition);
    labelGroup.attr('position', labelsPosition);
    mainGroup.rotation = labelGroup.rotation = layoutInfo.rotation;
    setOrigin(mainGroup);
    setOrigin(labelGroup);

    function setOrigin(targetGroup) {
      var pos = targetGroup.position;
      targetGroup.origin = [viewBound[0][0] - pos[0], viewBound[1][0] - pos[1]];
    }

    function getBound(rect) {
      // [[xmin, xmax], [ymin, ymax]]
      return [[rect.x, rect.x + rect.width], [rect.y, rect.y + rect.height]];
    }

    function toBound(fromPos, from, to, dimIdx, boundIdx) {
      fromPos[dimIdx] += to[dimIdx][boundIdx] - from[dimIdx][boundIdx];
    }
  },
  _createAxis: function (layoutInfo, timelineModel) {
    var data = timelineModel.getData();
    var axisType = timelineModel.get('axisType');
    var scale = axisHelper.createScaleByModel(timelineModel, axisType); // Customize scale. The `tickValue` is `dataIndex`.

    scale.getTicks = function () {
      return data.mapArray(['value'], function (value) {
        return value;
      });
    };

    var dataExtent = data.getDataExtent('value');
    scale.setExtent(dataExtent[0], dataExtent[1]);
    scale.niceTicks();
    var axis = new TimelineAxis('value', scale, layoutInfo.axisExtent, axisType);
    axis.model = timelineModel;
    return axis;
  },
  _createGroup: function (name) {
    var newGroup = this['_' + name] = new graphic.Group();
    this.group.add(newGroup);
    return newGroup;
  },
  _renderAxisLine: function (layoutInfo, group, axis, timelineModel) {
    var axisExtent = axis.getExtent();

    if (!timelineModel.get('lineStyle.show')) {
      return;
    }

    group.add(new graphic.Line({
      shape: {
        x1: axisExtent[0],
        y1: 0,
        x2: axisExtent[1],
        y2: 0
      },
      style: zrUtil.extend({
        lineCap: 'round'
      }, timelineModel.getModel('lineStyle').getLineStyle()),
      silent: true,
      z2: 1
    }));
  },

  /**
   * @private
   */
  _renderAxisTick: function (layoutInfo, group, axis, timelineModel) {
    var data = timelineModel.getData(); // Show all ticks, despite ignoring strategy.

    var ticks = axis.scale.getTicks(); // The value is dataIndex, see the costomized scale.

    each(ticks, function (value) {
      var tickCoord = axis.dataToCoord(value);
      var itemModel = data.getItemModel(value);
      var itemStyleModel = itemModel.getModel('itemStyle');
      var hoverStyleModel = itemModel.getModel('emphasis.itemStyle');
      var symbolOpt = {
        position: [tickCoord, 0],
        onclick: bind(this._changeTimeline, this, value)
      };
      var el = giveSymbol(itemModel, itemStyleModel, group, symbolOpt);
      graphic.setHoverStyle(el, hoverStyleModel.getItemStyle());

      if (itemModel.get('tooltip')) {
        el.dataIndex = value;
        el.dataModel = timelineModel;
      } else {
        el.dataIndex = el.dataModel = null;
      }
    }, this);
  },

  /**
   * @private
   */
  _renderAxisLabel: function (layoutInfo, group, axis, timelineModel) {
    var labelModel = axis.getLabelModel();

    if (!labelModel.get('show')) {
      return;
    }

    var data = timelineModel.getData();
    var labels = axis.getViewLabels();
    each(labels, function (labelItem) {
      // The tickValue is dataIndex, see the costomized scale.
      var dataIndex = labelItem.tickValue;
      var itemModel = data.getItemModel(dataIndex);
      var normalLabelModel = itemModel.getModel('label');
      var hoverLabelModel = itemModel.getModel('emphasis.label');
      var tickCoord = axis.dataToCoord(labelItem.tickValue);
      var textEl = new graphic.Text({
        position: [tickCoord, 0],
        rotation: layoutInfo.labelRotation - layoutInfo.rotation,
        onclick: bind(this._changeTimeline, this, dataIndex),
        silent: false
      });
      graphic.setTextStyle(textEl.style, normalLabelModel, {
        text: labelItem.formattedLabel,
        textAlign: layoutInfo.labelAlign,
        textVerticalAlign: layoutInfo.labelBaseline
      });
      group.add(textEl);
      graphic.setHoverStyle(textEl, graphic.setTextStyle({}, hoverLabelModel));
    }, this);
  },

  /**
   * @private
   */
  _renderControl: function (layoutInfo, group, axis, timelineModel) {
    var controlSize = layoutInfo.controlSize;
    var rotation = layoutInfo.rotation;
    var itemStyle = timelineModel.getModel('controlStyle').getItemStyle();
    var hoverStyle = timelineModel.getModel('emphasis.controlStyle').getItemStyle();
    var rect = [0, -controlSize / 2, controlSize, controlSize];
    var playState = timelineModel.getPlayState();
    var inverse = timelineModel.get('inverse', true);
    makeBtn(layoutInfo.nextBtnPosition, 'controlStyle.nextIcon', bind(this._changeTimeline, this, inverse ? '-' : '+'));
    makeBtn(layoutInfo.prevBtnPosition, 'controlStyle.prevIcon', bind(this._changeTimeline, this, inverse ? '+' : '-'));
    makeBtn(layoutInfo.playPosition, 'controlStyle.' + (playState ? 'stopIcon' : 'playIcon'), bind(this._handlePlayClick, this, !playState), true);

    function makeBtn(position, iconPath, onclick, willRotate) {
      if (!position) {
        return;
      }

      var opt = {
        position: position,
        origin: [controlSize / 2, 0],
        rotation: willRotate ? -rotation : 0,
        rectHover: true,
        style: itemStyle,
        onclick: onclick
      };
      var btn = makeIcon(timelineModel, iconPath, rect, opt);
      group.add(btn);
      graphic.setHoverStyle(btn, hoverStyle);
    }
  },
  _renderCurrentPointer: function (layoutInfo, group, axis, timelineModel) {
    var data = timelineModel.getData();
    var currentIndex = timelineModel.getCurrentIndex();
    var pointerModel = data.getItemModel(currentIndex).getModel('checkpointStyle');
    var me = this;
    var callback = {
      onCreate: function (pointer) {
        pointer.draggable = true;
        pointer.drift = bind(me._handlePointerDrag, me);
        pointer.ondragend = bind(me._handlePointerDragend, me);
        pointerMoveTo(pointer, currentIndex, axis, timelineModel, true);
      },
      onUpdate: function (pointer) {
        pointerMoveTo(pointer, currentIndex, axis, timelineModel);
      }
    }; // Reuse when exists, for animation and drag.

    this._currentPointer = giveSymbol(pointerModel, pointerModel, this._mainGroup, {}, this._currentPointer, callback);
  },
  _handlePlayClick: function (nextState) {
    this._clearTimer();

    this.api.dispatchAction({
      type: 'timelinePlayChange',
      playState: nextState,
      from: this.uid
    });
  },
  _handlePointerDrag: function (dx, dy, e) {
    this._clearTimer();

    this._pointerChangeTimeline([e.offsetX, e.offsetY]);
  },
  _handlePointerDragend: function (e) {
    this._pointerChangeTimeline([e.offsetX, e.offsetY], true);
  },
  _pointerChangeTimeline: function (mousePos, trigger) {
    var toCoord = this._toAxisCoord(mousePos)[0];

    var axis = this._axis;
    var axisExtent = numberUtil.asc(axis.getExtent().slice());
    toCoord > axisExtent[1] && (toCoord = axisExtent[1]);
    toCoord < axisExtent[0] && (toCoord = axisExtent[0]);
    this._currentPointer.position[0] = toCoord;

    this._currentPointer.dirty();

    var targetDataIndex = this._findNearestTick(toCoord);

    var timelineModel = this.model;

    if (trigger || targetDataIndex !== timelineModel.getCurrentIndex() && timelineModel.get('realtime')) {
      this._changeTimeline(targetDataIndex);
    }
  },
  _doPlayStop: function () {
    this._clearTimer();

    if (this.model.getPlayState()) {
      this._timer = setTimeout(bind(handleFrame, this), this.model.get('playInterval'));
    }

    function handleFrame() {
      // Do not cache
      var timelineModel = this.model;

      this._changeTimeline(timelineModel.getCurrentIndex() + (timelineModel.get('rewind', true) ? -1 : 1));
    }
  },
  _toAxisCoord: function (vertex) {
    var trans = this._mainGroup.getLocalTransform();

    return graphic.applyTransform(vertex, trans, true);
  },
  _findNearestTick: function (axisCoord) {
    var data = this.model.getData();
    var dist = Infinity;
    var targetDataIndex;
    var axis = this._axis;
    data.each(['value'], function (value, dataIndex) {
      var coord = axis.dataToCoord(value);
      var d = Math.abs(coord - axisCoord);

      if (d < dist) {
        dist = d;
        targetDataIndex = dataIndex;
      }
    });
    return targetDataIndex;
  },
  _clearTimer: function () {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  },
  _changeTimeline: function (nextIndex) {
    var currentIndex = this.model.getCurrentIndex();

    if (nextIndex === '+') {
      nextIndex = currentIndex + 1;
    } else if (nextIndex === '-') {
      nextIndex = currentIndex - 1;
    }

    this.api.dispatchAction({
      type: 'timelineChange',
      currentIndex: nextIndex,
      from: this.uid
    });
  }
});

function getViewRect(model, api) {
  return layout.getLayoutRect(model.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  }, model.get('padding'));
}

function makeIcon(timelineModel, objPath, rect, opts) {
  var icon = graphic.makePath(timelineModel.get(objPath).replace(/^path:\/\//, ''), zrUtil.clone(opts || {}), new BoundingRect(rect[0], rect[1], rect[2], rect[3]), 'center');
  return icon;
}
/**
 * Create symbol or update symbol
 * opt: basic position and event handlers
 */


function giveSymbol(hostModel, itemStyleModel, group, opt, symbol, callback) {
  var color = itemStyleModel.get('color');

  if (!symbol) {
    var symbolType = hostModel.get('symbol');
    symbol = createSymbol(symbolType, -1, -1, 2, 2, color);
    symbol.setStyle('strokeNoScale', true);
    group.add(symbol);
    callback && callback.onCreate(symbol);
  } else {
    symbol.setColor(color);
    group.add(symbol); // Group may be new, also need to add.

    callback && callback.onUpdate(symbol);
  } // Style


  var itemStyle = itemStyleModel.getItemStyle(['color', 'symbol', 'symbolSize']);
  symbol.setStyle(itemStyle); // Transform and events.

  opt = zrUtil.merge({
    rectHover: true,
    z2: 100
  }, opt, true);
  var symbolSize = hostModel.get('symbolSize');
  symbolSize = symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize];
  symbolSize[0] /= 2;
  symbolSize[1] /= 2;
  opt.scale = symbolSize;
  var symbolOffset = hostModel.get('symbolOffset');

  if (symbolOffset) {
    var pos = opt.position = opt.position || [0, 0];
    pos[0] += numberUtil.parsePercent(symbolOffset[0], symbolSize[0]);
    pos[1] += numberUtil.parsePercent(symbolOffset[1], symbolSize[1]);
  }

  var symbolRotate = hostModel.get('symbolRotate');
  opt.rotation = (symbolRotate || 0) * Math.PI / 180 || 0;
  symbol.attr(opt); // FIXME
  // (1) When symbol.style.strokeNoScale is true and updateTransform is not performed,
  // getBoundingRect will return wrong result.
  // (This is supposed to be resolved in zrender, but it is a little difficult to
  // leverage performance and auto updateTransform)
  // (2) All of ancesters of symbol do not scale, so we can just updateTransform symbol.

  symbol.updateTransform();
  return symbol;
}

function pointerMoveTo(pointer, dataIndex, axis, timelineModel, noAnimation) {
  if (pointer.dragging) {
    return;
  }

  var pointerModel = timelineModel.getModel('checkpointStyle');
  var toCoord = axis.dataToCoord(timelineModel.getData().get(['value'], dataIndex));

  if (noAnimation || !pointerModel.get('animation', true)) {
    pointer.attr({
      position: [toCoord, 0]
    });
  } else {
    pointer.stopAnimation(true);
    pointer.animateTo({
      position: [toCoord, 0]
    }, pointerModel.get('animationDuration', true), pointerModel.get('animationEasing', true));
  }
}

module.exports = _default;

/***/ }),

/***/ "3942":
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
echarts.registerAction({
  type: 'timelineChange',
  event: 'timelineChanged',
  update: 'prepareAndUpdate'
}, function (payload, ecModel) {
  var timelineModel = ecModel.getComponent('timeline');

  if (timelineModel && payload.currentIndex != null) {
    timelineModel.setCurrentIndex(payload.currentIndex);

    if (!timelineModel.get('loop', true) && timelineModel.isIndexMax()) {
      timelineModel.setPlayState(false);
    }
  } // Set normalized currentIndex to payload.


  ecModel.resetOption('timeline');
  return zrUtil.defaults({
    currentIndex: timelineModel.option.currentIndex
  }, payload);
});
echarts.registerAction({
  type: 'timelinePlayChange',
  event: 'timelinePlayChanged',
  update: 'update'
}, function (payload, ecModel) {
  var timelineModel = ecModel.getComponent('timeline');

  if (timelineModel && payload.playState != null) {
    timelineModel.setPlayState(payload.playState);
  }
});

/***/ }),

/***/ "43b89":
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

var MarkerModel = __webpack_require__("2449");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = MarkerModel.extend({
  type: 'markArea',
  defaultOption: {
    zlevel: 0,
    // PENDING
    z: 1,
    tooltip: {
      trigger: 'item'
    },
    // markArea should fixed on the coordinate system
    animation: false,
    label: {
      show: true,
      position: 'top'
    },
    itemStyle: {
      // color and borderColor default to use color from series
      // color: 'auto'
      // borderColor: 'auto'
      borderWidth: 0
    },
    emphasis: {
      label: {
        show: true,
        position: 'top'
      }
    }
  }
});

module.exports = _default;

/***/ }),

/***/ "4650":
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
function legendSelectActionHandler(methodName, payload, ecModel) {
  var selectedMap = {};
  var isToggleSelect = methodName === 'toggleSelected';
  var isSelected; // Update all legend components

  ecModel.eachComponent('legend', function (legendModel) {
    if (isToggleSelect && isSelected != null) {
      // Force other legend has same selected status
      // Or the first is toggled to true and other are toggled to false
      // In the case one legend has some item unSelected in option. And if other legend
      // doesn't has the item, they will assume it is selected.
      legendModel[isSelected ? 'select' : 'unSelect'](payload.name);
    } else if (methodName === 'allSelect' || methodName === 'inverseSelect') {
      legendModel[methodName]();
    } else {
      legendModel[methodName](payload.name);
      isSelected = legendModel.isSelected(payload.name);
    }

    var legendData = legendModel.getData();
    zrUtil.each(legendData, function (model) {
      var name = model.get('name'); // Wrap element

      if (name === '\n' || name === '') {
        return;
      }

      var isItemSelected = legendModel.isSelected(name);

      if (selectedMap.hasOwnProperty(name)) {
        // Unselected if any legend is unselected
        selectedMap[name] = selectedMap[name] && isItemSelected;
      } else {
        selectedMap[name] = isItemSelected;
      }
    });
  }); // Return the event explicitly

  return methodName === 'allSelect' || methodName === 'inverseSelect' ? {
    selected: selectedMap
  } : {
    name: payload.name,
    selected: selectedMap
  };
}
/**
 * @event legendToggleSelect
 * @type {Object}
 * @property {string} type 'legendToggleSelect'
 * @property {string} [from]
 * @property {string} name Series name or data item name
 */


echarts.registerAction('legendToggleSelect', 'legendselectchanged', zrUtil.curry(legendSelectActionHandler, 'toggleSelected'));
echarts.registerAction('legendAllSelect', 'legendselectall', zrUtil.curry(legendSelectActionHandler, 'allSelect'));
echarts.registerAction('legendInverseSelect', 'legendinverseselect', zrUtil.curry(legendSelectActionHandler, 'inverseSelect'));
/**
 * @event legendSelect
 * @type {Object}
 * @property {string} type 'legendSelect'
 * @property {string} name Series name or data item name
 */

echarts.registerAction('legendSelect', 'legendselected', zrUtil.curry(legendSelectActionHandler, 'select'));
/**
 * @event legendUnSelect
 * @type {Object}
 * @property {string} type 'legendUnSelect'
 * @property {string} name Series name or data item name
 */

echarts.registerAction('legendUnSelect', 'legendunselected', zrUtil.curry(legendSelectActionHandler, 'unSelect'));

/***/ }),

/***/ "5522":
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

__webpack_require__("23e0");

__webpack_require__("1748");

__webpack_require__("6c12");

/***/ }),

/***/ "5e97":
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

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var graphic = __webpack_require__("2306");

var _listComponent = __webpack_require__("7919");

var makeBackground = _listComponent.makeBackground;

var layoutUtil = __webpack_require__("f934");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var curry = zrUtil.curry;
var each = zrUtil.each;
var Group = graphic.Group;

var _default = echarts.extendComponentView({
  type: 'legend.plain',
  newlineDisabled: false,

  /**
   * @override
   */
  init: function () {
    /**
     * @private
     * @type {module:zrender/container/Group}
     */
    this.group.add(this._contentGroup = new Group());
    /**
     * @private
     * @type {module:zrender/Element}
     */

    this._backgroundEl;
    /**
     * @private
     * @type {module:zrender/container/Group}
     */

    this.group.add(this._selectorGroup = new Group());
    /**
     * If first rendering, `contentGroup.position` is [0, 0], which
     * does not make sense and may cause unexepcted animation if adopted.
     * @private
     * @type {boolean}
     */

    this._isFirstRender = true;
  },

  /**
   * @protected
   */
  getContentGroup: function () {
    return this._contentGroup;
  },

  /**
   * @protected
   */
  getSelectorGroup: function () {
    return this._selectorGroup;
  },

  /**
   * @override
   */
  render: function (legendModel, ecModel, api) {
    var isFirstRender = this._isFirstRender;
    this._isFirstRender = false;
    this.resetInner();

    if (!legendModel.get('show', true)) {
      return;
    }

    var itemAlign = legendModel.get('align');
    var orient = legendModel.get('orient');

    if (!itemAlign || itemAlign === 'auto') {
      itemAlign = legendModel.get('left') === 'right' && orient === 'vertical' ? 'right' : 'left';
    }

    var selector = legendModel.get('selector', true);
    var selectorPosition = legendModel.get('selectorPosition', true);

    if (selector && (!selectorPosition || selectorPosition === 'auto')) {
      selectorPosition = orient === 'horizontal' ? 'end' : 'start';
    }

    this.renderInner(itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition); // Perform layout.

    var positionInfo = legendModel.getBoxLayoutParams();
    var viewportSize = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var padding = legendModel.get('padding');
    var maxSize = layoutUtil.getLayoutRect(positionInfo, viewportSize, padding);
    var mainRect = this.layoutInner(legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition); // Place mainGroup, based on the calculated `mainRect`.

    var layoutRect = layoutUtil.getLayoutRect(zrUtil.defaults({
      width: mainRect.width,
      height: mainRect.height
    }, positionInfo), viewportSize, padding);
    this.group.attr('position', [layoutRect.x - mainRect.x, layoutRect.y - mainRect.y]); // Render background after group is layout.

    this.group.add(this._backgroundEl = makeBackground(mainRect, legendModel));
  },

  /**
   * @protected
   */
  resetInner: function () {
    this.getContentGroup().removeAll();
    this._backgroundEl && this.group.remove(this._backgroundEl);
    this.getSelectorGroup().removeAll();
  },

  /**
   * @protected
   */
  renderInner: function (itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition) {
    var contentGroup = this.getContentGroup();
    var legendDrawnMap = zrUtil.createHashMap();
    var selectMode = legendModel.get('selectedMode');
    var excludeSeriesId = [];
    ecModel.eachRawSeries(function (seriesModel) {
      !seriesModel.get('legendHoverLink') && excludeSeriesId.push(seriesModel.id);
    });
    each(legendModel.getData(), function (itemModel, dataIndex) {
      var name = itemModel.get('name'); // Use empty string or \n as a newline string

      if (!this.newlineDisabled && (name === '' || name === '\n')) {
        contentGroup.add(new Group({
          newline: true
        }));
        return;
      } // Representitive series.


      var seriesModel = ecModel.getSeriesByName(name)[0];

      if (legendDrawnMap.get(name)) {
        // Have been drawed
        return;
      } // Legend to control series.


      if (seriesModel) {
        var data = seriesModel.getData();
        var color = data.getVisual('color');
        var borderColor = data.getVisual('borderColor'); // If color is a callback function

        if (typeof color === 'function') {
          // Use the first data
          color = color(seriesModel.getDataParams(0));
        } // If borderColor is a callback function


        if (typeof borderColor === 'function') {
          // Use the first data
          borderColor = borderColor(seriesModel.getDataParams(0));
        } // Using rect symbol defaultly


        var legendSymbolType = data.getVisual('legendSymbol') || 'roundRect';
        var symbolType = data.getVisual('symbol');

        var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, selectMode);

        itemGroup.on('click', curry(dispatchSelectAction, name, null, api, excludeSeriesId)).on('mouseover', curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
        legendDrawnMap.set(name, true);
      } else {
        // Legend to control data. In pie and funnel.
        ecModel.eachRawSeries(function (seriesModel) {
          // In case multiple series has same data name
          if (legendDrawnMap.get(name)) {
            return;
          }

          if (seriesModel.legendVisualProvider) {
            var provider = seriesModel.legendVisualProvider;

            if (!provider.containName(name)) {
              return;
            }

            var idx = provider.indexOfName(name);
            var color = provider.getItemVisual(idx, 'color');
            var borderColor = provider.getItemVisual(idx, 'borderColor');
            var legendSymbolType = 'roundRect';

            var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, null, itemAlign, color, borderColor, selectMode); // FIXME: consider different series has items with the same name.


            itemGroup.on('click', curry(dispatchSelectAction, null, name, api, excludeSeriesId)) // Should not specify the series name, consider legend controls
            // more than one pie series.
            .on('mouseover', curry(dispatchHighlightAction, null, name, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, null, name, api, excludeSeriesId));
            legendDrawnMap.set(name, true);
          }
        }, this);
      }
    }, this);

    if (selector) {
      this._createSelector(selector, legendModel, api, orient, selectorPosition);
    }
  },
  _createSelector: function (selector, legendModel, api, orient, selectorPosition) {
    var selectorGroup = this.getSelectorGroup();
    each(selector, function (selectorItem) {
      createSelectorButton(selectorItem);
    });

    function createSelectorButton(selectorItem) {
      var type = selectorItem.type;
      var labelText = new graphic.Text({
        style: {
          x: 0,
          y: 0,
          align: 'center',
          verticalAlign: 'middle'
        },
        onclick: function () {
          api.dispatchAction({
            type: type === 'all' ? 'legendAllSelect' : 'legendInverseSelect'
          });
        }
      });
      selectorGroup.add(labelText);
      var labelModel = legendModel.getModel('selectorLabel');
      var emphasisLabelModel = legendModel.getModel('emphasis.selectorLabel');
      graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, emphasisLabelModel, {
        defaultText: selectorItem.title,
        isRectText: false
      });
      graphic.setHoverStyle(labelText);
    }
  },
  _createItem: function (name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, selectMode) {
    var itemWidth = legendModel.get('itemWidth');
    var itemHeight = legendModel.get('itemHeight');
    var inactiveColor = legendModel.get('inactiveColor');
    var inactiveBorderColor = legendModel.get('inactiveBorderColor');
    var symbolKeepAspect = legendModel.get('symbolKeepAspect');
    var legendModelItemStyle = legendModel.getModel('itemStyle');
    var isSelected = legendModel.isSelected(name);
    var itemGroup = new Group();
    var textStyleModel = itemModel.getModel('textStyle');
    var itemIcon = itemModel.get('icon');
    var tooltipModel = itemModel.getModel('tooltip');
    var legendGlobalTooltipModel = tooltipModel.parentModel; // Use user given icon first

    legendSymbolType = itemIcon || legendSymbolType;
    var legendSymbol = createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
    symbolKeepAspect == null ? true : symbolKeepAspect);
    itemGroup.add(setSymbolStyle(legendSymbol, legendSymbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected)); // Compose symbols
    // PENDING

    if (!itemIcon && symbolType // At least show one symbol, can't be all none
    && (symbolType !== legendSymbolType || symbolType === 'none')) {
      var size = itemHeight * 0.8;

      if (symbolType === 'none') {
        symbolType = 'circle';
      }

      var legendSymbolCenter = createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
      symbolKeepAspect == null ? true : symbolKeepAspect); // Put symbol in the center

      itemGroup.add(setSymbolStyle(legendSymbolCenter, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected));
    }

    var textX = itemAlign === 'left' ? itemWidth + 5 : -5;
    var textAlign = itemAlign;
    var formatter = legendModel.get('formatter');
    var content = name;

    if (typeof formatter === 'string' && formatter) {
      content = formatter.replace('{name}', name != null ? name : '');
    } else if (typeof formatter === 'function') {
      content = formatter(name);
    }

    itemGroup.add(new graphic.Text({
      style: graphic.setTextStyle({}, textStyleModel, {
        text: content,
        x: textX,
        y: itemHeight / 2,
        textFill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
        textAlign: textAlign,
        textVerticalAlign: 'middle'
      })
    })); // Add a invisible rect to increase the area of mouse hover

    var hitRect = new graphic.Rect({
      shape: itemGroup.getBoundingRect(),
      invisible: true,
      tooltip: tooltipModel.get('show') ? zrUtil.extend({
        content: name,
        // Defaul formatter
        formatter: legendGlobalTooltipModel.get('formatter', true) || function () {
          return name;
        },
        formatterParams: {
          componentType: 'legend',
          legendIndex: legendModel.componentIndex,
          name: name,
          $vars: ['name']
        }
      }, tooltipModel.option) : null
    });
    itemGroup.add(hitRect);
    itemGroup.eachChild(function (child) {
      child.silent = true;
    });
    hitRect.silent = !selectMode;
    this.getContentGroup().add(itemGroup);
    graphic.setHoverStyle(itemGroup);
    itemGroup.__legendDataIndex = dataIndex;
    return itemGroup;
  },

  /**
   * @protected
   */
  layoutInner: function (legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition) {
    var contentGroup = this.getContentGroup();
    var selectorGroup = this.getSelectorGroup(); // Place items in contentGroup.

    layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), maxSize.width, maxSize.height);
    var contentRect = contentGroup.getBoundingRect();
    var contentPos = [-contentRect.x, -contentRect.y];

    if (selector) {
      // Place buttons in selectorGroup
      layoutUtil.box( // Buttons in selectorGroup always layout horizontally
      'horizontal', selectorGroup, legendModel.get('selectorItemGap', true));
      var selectorRect = selectorGroup.getBoundingRect();
      var selectorPos = [-selectorRect.x, -selectorRect.y];
      var selectorButtonGap = legendModel.get('selectorButtonGap', true);
      var orientIdx = legendModel.getOrient().index;
      var wh = orientIdx === 0 ? 'width' : 'height';
      var hw = orientIdx === 0 ? 'height' : 'width';
      var yx = orientIdx === 0 ? 'y' : 'x';

      if (selectorPosition === 'end') {
        selectorPos[orientIdx] += contentRect[wh] + selectorButtonGap;
      } else {
        contentPos[orientIdx] += selectorRect[wh] + selectorButtonGap;
      } //Always align selector to content as 'middle'


      selectorPos[1 - orientIdx] += contentRect[hw] / 2 - selectorRect[hw] / 2;
      selectorGroup.attr('position', selectorPos);
      contentGroup.attr('position', contentPos);
      var mainRect = {
        x: 0,
        y: 0
      };
      mainRect[wh] = contentRect[wh] + selectorButtonGap + selectorRect[wh];
      mainRect[hw] = Math.max(contentRect[hw], selectorRect[hw]);
      mainRect[yx] = Math.min(0, selectorRect[yx] + selectorPos[1 - orientIdx]);
      return mainRect;
    } else {
      contentGroup.attr('position', contentPos);
      return this.group.getBoundingRect();
    }
  },

  /**
   * @protected
   */
  remove: function () {
    this.getContentGroup().removeAll();
    this._isFirstRender = true;
  }
});

function setSymbolStyle(symbol, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, isSelected) {
  var itemStyle;

  if (symbolType !== 'line' && symbolType.indexOf('empty') < 0) {
    itemStyle = legendModelItemStyle.getItemStyle();
    symbol.style.stroke = borderColor;

    if (!isSelected) {
      itemStyle.stroke = inactiveBorderColor;
    }
  } else {
    itemStyle = legendModelItemStyle.getItemStyle(['borderWidth', 'borderColor']);
  }

  return symbol.setStyle(itemStyle);
}

function dispatchSelectAction(seriesName, dataName, api, excludeSeriesId) {
  // downplay before unselect
  dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId);
  api.dispatchAction({
    type: 'legendToggleSelect',
    name: seriesName != null ? seriesName : dataName
  }); // highlight after select

  dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId);
}

function dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId) {
  // If element hover will move to a hoverLayer.
  var el = api.getZr().storage.getDisplayList()[0];

  if (!(el && el.useHoverLayer)) {
    api.dispatchAction({
      type: 'highlight',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

function dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId) {
  // If element hover will move to a hoverLayer.
  var el = api.getZr().storage.getDisplayList()[0];

  if (!(el && el.useHoverLayer)) {
    api.dispatchAction({
      type: 'downplay',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "627c":
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

var echarts = __webpack_require__("3eba");

var graphic = __webpack_require__("2306");

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Model
echarts.extendComponentModel({
  type: 'title',
  layoutMode: {
    type: 'box',
    ignoreSize: true
  },
  defaultOption: {
    // 一级层叠
    zlevel: 0,
    // 二级层叠
    z: 6,
    show: true,
    text: '',
    // 超链接跳转
    // link: null,
    // 仅支持self | blank
    target: 'blank',
    subtext: '',
    // 超链接跳转
    // sublink: null,
    // 仅支持self | blank
    subtarget: 'blank',
    // 'center' ¦ 'left' ¦ 'right'
    // ¦ {number}（x坐标，单位px）
    left: 0,
    // 'top' ¦ 'bottom' ¦ 'center'
    // ¦ {number}（y坐标，单位px）
    top: 0,
    // 水平对齐
    // 'auto' | 'left' | 'right' | 'center'
    // 默认根据 left 的位置判断是左对齐还是右对齐
    // textAlign: null
    //
    // 垂直对齐
    // 'auto' | 'top' | 'bottom' | 'middle'
    // 默认根据 top 位置判断是上对齐还是下对齐
    // textVerticalAlign: null
    // textBaseline: null // The same as textVerticalAlign.
    backgroundColor: 'rgba(0,0,0,0)',
    // 标题边框颜色
    borderColor: '#ccc',
    // 标题边框线宽，单位px，默认为0（无边框）
    borderWidth: 0,
    // 标题内边距，单位px，默认各方向内边距为5，
    // 接受数组分别设定上右下左边距，同css
    padding: 5,
    // 主副标题纵向间隔，单位px，默认为10，
    itemGap: 10,
    textStyle: {
      fontSize: 18,
      fontWeight: 'bolder',
      color: '#333'
    },
    subtextStyle: {
      color: '#aaa'
    }
  }
}); // View

echarts.extendComponentView({
  type: 'title',
  render: function (titleModel, ecModel, api) {
    this.group.removeAll();

    if (!titleModel.get('show')) {
      return;
    }

    var group = this.group;
    var textStyleModel = titleModel.getModel('textStyle');
    var subtextStyleModel = titleModel.getModel('subtextStyle');
    var textAlign = titleModel.get('textAlign');
    var textVerticalAlign = zrUtil.retrieve2(titleModel.get('textBaseline'), titleModel.get('textVerticalAlign'));
    var textEl = new graphic.Text({
      style: graphic.setTextStyle({}, textStyleModel, {
        text: titleModel.get('text'),
        textFill: textStyleModel.getTextColor()
      }, {
        disableBox: true
      }),
      z2: 10
    });
    var textRect = textEl.getBoundingRect();
    var subText = titleModel.get('subtext');
    var subTextEl = new graphic.Text({
      style: graphic.setTextStyle({}, subtextStyleModel, {
        text: subText,
        textFill: subtextStyleModel.getTextColor(),
        y: textRect.height + titleModel.get('itemGap'),
        textVerticalAlign: 'top'
      }, {
        disableBox: true
      }),
      z2: 10
    });
    var link = titleModel.get('link');
    var sublink = titleModel.get('sublink');
    var triggerEvent = titleModel.get('triggerEvent', true);
    textEl.silent = !link && !triggerEvent;
    subTextEl.silent = !sublink && !triggerEvent;

    if (link) {
      textEl.on('click', function () {
        window.open(link, '_' + titleModel.get('target'));
      });
    }

    if (sublink) {
      subTextEl.on('click', function () {
        window.open(sublink, '_' + titleModel.get('subtarget'));
      });
    }

    textEl.eventData = subTextEl.eventData = triggerEvent ? {
      componentType: 'title',
      componentIndex: titleModel.componentIndex
    } : null;
    group.add(textEl);
    subText && group.add(subTextEl); // If no subText, but add subTextEl, there will be an empty line.

    var groupRect = group.getBoundingRect();
    var layoutOption = titleModel.getBoxLayoutParams();
    layoutOption.width = groupRect.width;
    layoutOption.height = groupRect.height;
    var layoutRect = getLayoutRect(layoutOption, {
      width: api.getWidth(),
      height: api.getHeight()
    }, titleModel.get('padding')); // Adjust text align based on position

    if (!textAlign) {
      // Align left if title is on the left. center and right is same
      textAlign = titleModel.get('left') || titleModel.get('right');

      if (textAlign === 'middle') {
        textAlign = 'center';
      } // Adjust layout by text align


      if (textAlign === 'right') {
        layoutRect.x += layoutRect.width;
      } else if (textAlign === 'center') {
        layoutRect.x += layoutRect.width / 2;
      }
    }

    if (!textVerticalAlign) {
      textVerticalAlign = titleModel.get('top') || titleModel.get('bottom');

      if (textVerticalAlign === 'center') {
        textVerticalAlign = 'middle';
      }

      if (textVerticalAlign === 'bottom') {
        layoutRect.y += layoutRect.height;
      } else if (textVerticalAlign === 'middle') {
        layoutRect.y += layoutRect.height / 2;
      }

      textVerticalAlign = textVerticalAlign || 'top';
    }

    group.attr('position', [layoutRect.x, layoutRect.y]);
    var alignStyle = {
      textAlign: textAlign,
      textVerticalAlign: textVerticalAlign
    };
    textEl.setStyle(alignStyle);
    subTextEl.setStyle(alignStyle); // Render background
    // Get groupRect again because textAlign has been changed

    groupRect = group.getBoundingRect();
    var padding = layoutRect.margin;
    var style = titleModel.getItemStyle(['color', 'opacity']);
    style.fill = titleModel.get('backgroundColor');
    var rect = new graphic.Rect({
      shape: {
        x: groupRect.x - padding[3],
        y: groupRect.y - padding[0],
        width: groupRect.width + padding[1] + padding[3],
        height: groupRect.height + padding[0] + padding[2],
        r: titleModel.get('borderRadius')
      },
      style: style,
      subPixelOptimize: true,
      silent: true
    });
    group.add(rect);
  }
});

/***/ }),

/***/ "66a4":
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
  var timelineOpt = option && option.timeline;

  if (!zrUtil.isArray(timelineOpt)) {
    timelineOpt = timelineOpt ? [timelineOpt] : [];
  }

  zrUtil.each(timelineOpt, function (opt) {
    if (!opt) {
      return;
    }

    compatibleEC2(opt);
  });
}

function compatibleEC2(opt) {
  var type = opt.type;
  var ec2Types = {
    'number': 'value',
    'time': 'time'
  }; // Compatible with ec2

  if (ec2Types[type]) {
    opt.axisType = ec2Types[type];
    delete opt.type;
  }

  transferItem(opt);

  if (has(opt, 'controlPosition')) {
    var controlStyle = opt.controlStyle || (opt.controlStyle = {});

    if (!has(controlStyle, 'position')) {
      controlStyle.position = opt.controlPosition;
    }

    if (controlStyle.position === 'none' && !has(controlStyle, 'show')) {
      controlStyle.show = false;
      delete controlStyle.position;
    }

    delete opt.controlPosition;
  }

  zrUtil.each(opt.data || [], function (dataItem) {
    if (zrUtil.isObject(dataItem) && !zrUtil.isArray(dataItem)) {
      if (!has(dataItem, 'value') && has(dataItem, 'name')) {
        // In ec2, using name as value.
        dataItem.value = dataItem.name;
      }

      transferItem(dataItem);
    }
  });
}

function transferItem(opt) {
  var itemStyle = opt.itemStyle || (opt.itemStyle = {});
  var itemStyleEmphasis = itemStyle.emphasis || (itemStyle.emphasis = {}); // Transfer label out

  var label = opt.label || opt.label || {};
  var labelNormal = label.normal || (label.normal = {});
  var excludeLabelAttr = {
    normal: 1,
    emphasis: 1
  };
  zrUtil.each(label, function (value, name) {
    if (!excludeLabelAttr[name] && !has(labelNormal, name)) {
      labelNormal[name] = value;
    }
  });

  if (itemStyleEmphasis.label && !has(label, 'emphasis')) {
    label.emphasis = itemStyleEmphasis.label;
    delete itemStyleEmphasis.label;
  }
}

function has(obj, attr) {
  return obj.hasOwnProperty(attr);
}

module.exports = _default;

/***/ }),

/***/ "6c12":
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

var AxisBuilder = __webpack_require__("fab2");

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
var axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'];

var _default = echarts.extendComponentView({
  type: 'radar',
  render: function (radarModel, ecModel, api) {
    var group = this.group;
    group.removeAll();

    this._buildAxes(radarModel);

    this._buildSplitLineAndArea(radarModel);
  },
  _buildAxes: function (radarModel) {
    var radar = radarModel.coordinateSystem;
    var indicatorAxes = radar.getIndicatorAxes();
    var axisBuilders = zrUtil.map(indicatorAxes, function (indicatorAxis) {
      var axisBuilder = new AxisBuilder(indicatorAxis.model, {
        position: [radar.cx, radar.cy],
        rotation: indicatorAxis.angle,
        labelDirection: -1,
        tickDirection: -1,
        nameDirection: 1
      });
      return axisBuilder;
    });
    zrUtil.each(axisBuilders, function (axisBuilder) {
      zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);
      this.group.add(axisBuilder.getGroup());
    }, this);
  },
  _buildSplitLineAndArea: function (radarModel) {
    var radar = radarModel.coordinateSystem;
    var indicatorAxes = radar.getIndicatorAxes();

    if (!indicatorAxes.length) {
      return;
    }

    var shape = radarModel.get('shape');
    var splitLineModel = radarModel.getModel('splitLine');
    var splitAreaModel = radarModel.getModel('splitArea');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var areaStyleModel = splitAreaModel.getModel('areaStyle');
    var showSplitLine = splitLineModel.get('show');
    var showSplitArea = splitAreaModel.get('show');
    var splitLineColors = lineStyleModel.get('color');
    var splitAreaColors = areaStyleModel.get('color');
    splitLineColors = zrUtil.isArray(splitLineColors) ? splitLineColors : [splitLineColors];
    splitAreaColors = zrUtil.isArray(splitAreaColors) ? splitAreaColors : [splitAreaColors];
    var splitLines = [];
    var splitAreas = [];

    function getColorIndex(areaOrLine, areaOrLineColorList, idx) {
      var colorIndex = idx % areaOrLineColorList.length;
      areaOrLine[colorIndex] = areaOrLine[colorIndex] || [];
      return colorIndex;
    }

    if (shape === 'circle') {
      var ticksRadius = indicatorAxes[0].getTicksCoords();
      var cx = radar.cx;
      var cy = radar.cy;

      for (var i = 0; i < ticksRadius.length; i++) {
        if (showSplitLine) {
          var colorIndex = getColorIndex(splitLines, splitLineColors, i);
          splitLines[colorIndex].push(new graphic.Circle({
            shape: {
              cx: cx,
              cy: cy,
              r: ticksRadius[i].coord
            }
          }));
        }

        if (showSplitArea && i < ticksRadius.length - 1) {
          var colorIndex = getColorIndex(splitAreas, splitAreaColors, i);
          splitAreas[colorIndex].push(new graphic.Ring({
            shape: {
              cx: cx,
              cy: cy,
              r0: ticksRadius[i].coord,
              r: ticksRadius[i + 1].coord
            }
          }));
        }
      }
    } // Polyyon
    else {
        var realSplitNumber;
        var axesTicksPoints = zrUtil.map(indicatorAxes, function (indicatorAxis, idx) {
          var ticksCoords = indicatorAxis.getTicksCoords();
          realSplitNumber = realSplitNumber == null ? ticksCoords.length - 1 : Math.min(ticksCoords.length - 1, realSplitNumber);
          return zrUtil.map(ticksCoords, function (tickCoord) {
            return radar.coordToPoint(tickCoord.coord, idx);
          });
        });
        var prevPoints = [];

        for (var i = 0; i <= realSplitNumber; i++) {
          var points = [];

          for (var j = 0; j < indicatorAxes.length; j++) {
            points.push(axesTicksPoints[j][i]);
          } // Close


          if (points[0]) {
            points.push(points[0].slice());
          } else {}

          if (showSplitLine) {
            var colorIndex = getColorIndex(splitLines, splitLineColors, i);
            splitLines[colorIndex].push(new graphic.Polyline({
              shape: {
                points: points
              }
            }));
          }

          if (showSplitArea && prevPoints) {
            var colorIndex = getColorIndex(splitAreas, splitAreaColors, i - 1);
            splitAreas[colorIndex].push(new graphic.Polygon({
              shape: {
                points: points.concat(prevPoints)
              }
            }));
          }

          prevPoints = points.slice().reverse();
        }
      }

    var lineStyle = lineStyleModel.getLineStyle();
    var areaStyle = areaStyleModel.getAreaStyle(); // Add splitArea before splitLine

    zrUtil.each(splitAreas, function (splitAreas, idx) {
      this.group.add(graphic.mergePath(splitAreas, {
        style: zrUtil.defaults({
          stroke: 'none',
          fill: splitAreaColors[idx % splitAreaColors.length]
        }, areaStyle),
        silent: true
      }));
    }, this);
    zrUtil.each(splitLines, function (splitLines, idx) {
      this.group.add(graphic.mergePath(splitLines, {
        style: zrUtil.defaults({
          fill: 'none',
          stroke: splitLineColors[idx % splitLineColors.length]
        }, lineStyle),
        silent: true
      }));
    }, this);
  }
});

module.exports = _default;

/***/ }),

/***/ "792e":
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

__webpack_require__("14d3");

/***/ }),

/***/ "7e32":
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

__webpack_require__("43b89");

__webpack_require__("8e77");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerPreprocessor(function (opt) {
  // Make sure markArea component is enabled
  opt.markArea = opt.markArea || {};
});

/***/ }),

/***/ "8344":
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

var SymbolDraw = __webpack_require__("f706");

var numberUtil = __webpack_require__("3842");

var List = __webpack_require__("6179");

var markerHelper = __webpack_require__("923d");

var MarkerView = __webpack_require__("88f0");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function updateMarkerLayout(mpData, seriesModel, api) {
  var coordSys = seriesModel.coordinateSystem;
  mpData.each(function (idx) {
    var itemModel = mpData.getItemModel(idx);
    var point;
    var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
    var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());

    if (!isNaN(xPx) && !isNaN(yPx)) {
      point = [xPx, yPx];
    } // Chart like bar may have there own marker positioning logic
    else if (seriesModel.getMarkerPosition) {
        // Use the getMarkerPoisition
        point = seriesModel.getMarkerPosition(mpData.getValues(mpData.dimensions, idx));
      } else if (coordSys) {
        var x = mpData.get(coordSys.dimensions[0], idx);
        var y = mpData.get(coordSys.dimensions[1], idx);
        point = coordSys.dataToPoint([x, y]);
      } // Use x, y if has any


    if (!isNaN(xPx)) {
      point[0] = xPx;
    }

    if (!isNaN(yPx)) {
      point[1] = yPx;
    }

    mpData.setItemLayout(idx, point);
  });
}

var _default = MarkerView.extend({
  type: 'markPoint',
  // updateLayout: function (markPointModel, ecModel, api) {
  //     ecModel.eachSeries(function (seriesModel) {
  //         var mpModel = seriesModel.markPointModel;
  //         if (mpModel) {
  //             updateMarkerLayout(mpModel.getData(), seriesModel, api);
  //             this.markerGroupMap.get(seriesModel.id).updateLayout(mpModel);
  //         }
  //     }, this);
  // },
  updateTransform: function (markPointModel, ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      var mpModel = seriesModel.markPointModel;

      if (mpModel) {
        updateMarkerLayout(mpModel.getData(), seriesModel, api);
        this.markerGroupMap.get(seriesModel.id).updateLayout(mpModel);
      }
    }, this);
  },
  renderSeries: function (seriesModel, mpModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesId = seriesModel.id;
    var seriesData = seriesModel.getData();
    var symbolDrawMap = this.markerGroupMap;
    var symbolDraw = symbolDrawMap.get(seriesId) || symbolDrawMap.set(seriesId, new SymbolDraw());
    var mpData = createList(coordSys, seriesModel, mpModel); // FIXME

    mpModel.setData(mpData);
    updateMarkerLayout(mpModel.getData(), seriesModel, api);
    mpData.each(function (idx) {
      var itemModel = mpData.getItemModel(idx);
      var symbol = itemModel.getShallow('symbol');
      var symbolSize = itemModel.getShallow('symbolSize');
      var isFnSymbol = zrUtil.isFunction(symbol);
      var isFnSymbolSize = zrUtil.isFunction(symbolSize);

      if (isFnSymbol || isFnSymbolSize) {
        var rawIdx = mpModel.getRawValue(idx);
        var dataParams = mpModel.getDataParams(idx);

        if (isFnSymbol) {
          symbol = symbol(rawIdx, dataParams);
        }

        if (isFnSymbolSize) {
          // FIXME 这里不兼容 ECharts 2.x，2.x 貌似参数是整个数据？
          symbolSize = symbolSize(rawIdx, dataParams);
        }
      }

      mpData.setItemVisual(idx, {
        symbol: symbol,
        symbolSize: symbolSize,
        color: itemModel.get('itemStyle.color') || seriesData.getVisual('color')
      });
    }); // TODO Text are wrong

    symbolDraw.updateData(mpData);
    this.group.add(symbolDraw.group); // Set host model for tooltip
    // FIXME

    mpData.eachItemGraphicEl(function (el) {
      el.traverse(function (child) {
        child.dataModel = mpModel;
      });
    });
    symbolDraw.__keep = true;
    symbolDraw.group.silent = mpModel.get('silent') || seriesModel.get('silent');
  }
});
/**
 * @inner
 * @param {module:echarts/coord/*} [coordSys]
 * @param {module:echarts/model/Series} seriesModel
 * @param {module:echarts/model/Model} mpModel
 */


function createList(coordSys, seriesModel, mpModel) {
  var coordDimsInfos;

  if (coordSys) {
    coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
      var info = seriesModel.getData().getDimensionInfo(seriesModel.getData().mapDimension(coordDim)) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys

      return zrUtil.defaults({
        name: coordDim
      }, info);
    });
  } else {
    coordDimsInfos = [{
      name: 'value',
      type: 'float'
    }];
  }

  var mpData = new List(coordDimsInfos, mpModel);
  var dataOpt = zrUtil.map(mpModel.get('data'), zrUtil.curry(markerHelper.dataTransform, seriesModel));

  if (coordSys) {
    dataOpt = zrUtil.filter(dataOpt, zrUtil.curry(markerHelper.dataFilter, coordSys));
  }

  mpData.initData(dataOpt, null, coordSys ? markerHelper.dimValueGetter : function (item) {
    return item.value;
  });
  return mpData;
}

module.exports = _default;

/***/ }),

/***/ "84d5":
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

var Model = __webpack_require__("4319");

var _model = __webpack_require__("e0d3");

var isNameSpecified = _model.isNameSpecified;

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
var langSelector = lang.legend.selector;
var defaultSelectorOption = {
  all: {
    type: 'all',
    title: zrUtil.clone(langSelector.all)
  },
  inverse: {
    type: 'inverse',
    title: zrUtil.clone(langSelector.inverse)
  }
};
var LegendModel = echarts.extendComponentModel({
  type: 'legend.plain',
  dependencies: ['series'],
  layoutMode: {
    type: 'box',
    // legend.width/height are maxWidth/maxHeight actually,
    // whereas realy width/height is calculated by its content.
    // (Setting {left: 10, right: 10} does not make sense).
    // So consider the case:
    // `setOption({legend: {left: 10});`
    // then `setOption({legend: {right: 10});`
    // The previous `left` should be cleared by setting `ignoreSize`.
    ignoreSize: true
  },
  init: function (option, parentModel, ecModel) {
    this.mergeDefaultAndTheme(option, ecModel);
    option.selected = option.selected || {};

    this._updateSelector(option);
  },
  mergeOption: function (option) {
    LegendModel.superCall(this, 'mergeOption', option);

    this._updateSelector(option);
  },
  _updateSelector: function (option) {
    var selector = option.selector;

    if (selector === true) {
      selector = option.selector = ['all', 'inverse'];
    }

    if (zrUtil.isArray(selector)) {
      zrUtil.each(selector, function (item, index) {
        zrUtil.isString(item) && (item = {
          type: item
        });
        selector[index] = zrUtil.merge(item, defaultSelectorOption[item.type]);
      });
    }
  },
  optionUpdated: function () {
    this._updateData(this.ecModel);

    var legendData = this._data; // If selectedMode is single, try to select one

    if (legendData[0] && this.get('selectedMode') === 'single') {
      var hasSelected = false; // If has any selected in option.selected

      for (var i = 0; i < legendData.length; i++) {
        var name = legendData[i].get('name');

        if (this.isSelected(name)) {
          // Force to unselect others
          this.select(name);
          hasSelected = true;
          break;
        }
      } // Try select the first if selectedMode is single


      !hasSelected && this.select(legendData[0].get('name'));
    }
  },
  _updateData: function (ecModel) {
    var potentialData = [];
    var availableNames = [];
    ecModel.eachRawSeries(function (seriesModel) {
      var seriesName = seriesModel.name;
      availableNames.push(seriesName);
      var isPotential;

      if (seriesModel.legendVisualProvider) {
        var provider = seriesModel.legendVisualProvider;
        var names = provider.getAllNames();

        if (!ecModel.isSeriesFiltered(seriesModel)) {
          availableNames = availableNames.concat(names);
        }

        if (names.length) {
          potentialData = potentialData.concat(names);
        } else {
          isPotential = true;
        }
      } else {
        isPotential = true;
      }

      if (isPotential && isNameSpecified(seriesModel)) {
        potentialData.push(seriesModel.name);
      }
    });
    /**
     * @type {Array.<string>}
     * @private
     */

    this._availableNames = availableNames; // If legend.data not specified in option, use availableNames as data,
    // which is convinient for user preparing option.

    var rawData = this.get('data') || potentialData;
    var legendData = zrUtil.map(rawData, function (dataItem) {
      // Can be string or number
      if (typeof dataItem === 'string' || typeof dataItem === 'number') {
        dataItem = {
          name: dataItem
        };
      }

      return new Model(dataItem, this, this.ecModel);
    }, this);
    /**
     * @type {Array.<module:echarts/model/Model>}
     * @private
     */

    this._data = legendData;
  },

  /**
   * @return {Array.<module:echarts/model/Model>}
   */
  getData: function () {
    return this._data;
  },

  /**
   * @param {string} name
   */
  select: function (name) {
    var selected = this.option.selected;
    var selectedMode = this.get('selectedMode');

    if (selectedMode === 'single') {
      var data = this._data;
      zrUtil.each(data, function (dataItem) {
        selected[dataItem.get('name')] = false;
      });
    }

    selected[name] = true;
  },

  /**
   * @param {string} name
   */
  unSelect: function (name) {
    if (this.get('selectedMode') !== 'single') {
      this.option.selected[name] = false;
    }
  },

  /**
   * @param {string} name
   */
  toggleSelected: function (name) {
    var selected = this.option.selected; // Default is true

    if (!selected.hasOwnProperty(name)) {
      selected[name] = true;
    }

    this[selected[name] ? 'unSelect' : 'select'](name);
  },
  allSelect: function () {
    var data = this._data;
    var selected = this.option.selected;
    zrUtil.each(data, function (dataItem) {
      selected[dataItem.get('name', true)] = true;
    });
  },
  inverseSelect: function () {
    var data = this._data;
    var selected = this.option.selected;
    zrUtil.each(data, function (dataItem) {
      var name = dataItem.get('name', true); // Initially, default value is true

      if (!selected.hasOwnProperty(name)) {
        selected[name] = true;
      }

      selected[name] = !selected[name];
    });
  },

  /**
   * @param {string} name
   */
  isSelected: function (name) {
    var selected = this.option.selected;
    return !(selected.hasOwnProperty(name) && !selected[name]) && zrUtil.indexOf(this._availableNames, name) >= 0;
  },
  getOrient: function () {
    return this.get('orient') === 'vertical' ? {
      index: 1,
      name: 'vertical'
    } : {
      index: 0,
      name: 'horizontal'
    };
  },
  defaultOption: {
    // 一级层叠
    zlevel: 0,
    // 二级层叠
    z: 4,
    show: true,
    // 布局方式，默认为水平布局，可选为：
    // 'horizontal' | 'vertical'
    orient: 'horizontal',
    left: 'center',
    // right: 'center',
    top: 0,
    // bottom: null,
    // 水平对齐
    // 'auto' | 'left' | 'right'
    // 默认为 'auto', 根据 x 的位置判断是左对齐还是右对齐
    align: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    // 图例边框颜色
    borderColor: '#ccc',
    borderRadius: 0,
    // 图例边框线宽，单位px，默认为0（无边框）
    borderWidth: 0,
    // 图例内边距，单位px，默认各方向内边距为5，
    // 接受数组分别设定上右下左边距，同css
    padding: 5,
    // 各个item之间的间隔，单位px，默认为10，
    // 横向布局时为水平间隔，纵向布局时为纵向间隔
    itemGap: 10,
    // the width of legend symbol
    itemWidth: 25,
    // the height of legend symbol
    itemHeight: 14,
    // the color of unselected legend symbol
    inactiveColor: '#ccc',
    // the borderColor of unselected legend symbol
    inactiveBorderColor: '#ccc',
    itemStyle: {
      // the default borderWidth of legend symbol
      borderWidth: 0
    },
    textStyle: {
      // 图例文字颜色
      color: '#333'
    },
    // formatter: '',
    // 选择模式，默认开启图例开关
    selectedMode: true,
    // 配置默认选中状态，可配合LEGEND.SELECTED事件做动态数据载入
    // selected: null,
    // 图例内容（详见legend.data，数组中每一项代表一个item
    // data: [],
    // Usage:
    // selector: [{type: 'all or inverse', title: xxx}]
    // or
    // selector: true
    // or
    // selector: ['all', 'inverse']
    selector: false,
    selectorLabel: {
      show: true,
      borderRadius: 10,
      padding: [3, 5, 3, 5],
      fontSize: 12,
      fontFamily: ' sans-serif',
      color: '#666',
      borderWidth: 1,
      borderColor: '#666'
    },
    emphasis: {
      selectorLabel: {
        show: true,
        color: '#eee',
        backgroundColor: '#666'
      }
    },
    // Value can be 'start' or 'end'
    selectorPosition: 'auto',
    selectorItemGap: 7,
    selectorButtonGap: 10,
    // Tooltip 相关配置
    tooltip: {
      show: false
    }
  }
});
var _default = LegendModel;
module.exports = _default;

/***/ }),

/***/ "88f0":
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
var _default = echarts.extendComponentView({
  type: 'marker',
  init: function () {
    /**
     * Markline grouped by series
     * @private
     * @type {module:zrender/core/util.HashMap}
     */
    this.markerGroupMap = zrUtil.createHashMap();
  },
  render: function (markerModel, ecModel, api) {
    var markerGroupMap = this.markerGroupMap;
    markerGroupMap.each(function (item) {
      item.__keep = false;
    });
    var markerModelKey = this.type + 'Model';
    ecModel.eachSeries(function (seriesModel) {
      var markerModel = seriesModel[markerModelKey];
      markerModel && this.renderSeries(seriesModel, markerModel, ecModel, api);
    }, this);
    markerGroupMap.each(function (item) {
      !item.__keep && this.group.remove(item.group);
    }, this);
  },
  renderSeries: function () {}
});

module.exports = _default;

/***/ }),

/***/ "8e77":
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

var colorUtil = __webpack_require__("41ef");

var List = __webpack_require__("6179");

var numberUtil = __webpack_require__("3842");

var graphic = __webpack_require__("2306");

var markerHelper = __webpack_require__("923d");

var MarkerView = __webpack_require__("88f0");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// TODO Better on polar
var markAreaTransform = function (seriesModel, coordSys, maModel, item) {
  var lt = markerHelper.dataTransform(seriesModel, item[0]);
  var rb = markerHelper.dataTransform(seriesModel, item[1]);
  var retrieve = zrUtil.retrieve; // FIXME make sure lt is less than rb

  var ltCoord = lt.coord;
  var rbCoord = rb.coord;
  ltCoord[0] = retrieve(ltCoord[0], -Infinity);
  ltCoord[1] = retrieve(ltCoord[1], -Infinity);
  rbCoord[0] = retrieve(rbCoord[0], Infinity);
  rbCoord[1] = retrieve(rbCoord[1], Infinity); // Merge option into one

  var result = zrUtil.mergeAll([{}, lt, rb]);
  result.coord = [lt.coord, rb.coord];
  result.x0 = lt.x;
  result.y0 = lt.y;
  result.x1 = rb.x;
  result.y1 = rb.y;
  return result;
};

function isInifinity(val) {
  return !isNaN(val) && !isFinite(val);
} // If a markArea has one dim


function ifMarkLineHasOnlyDim(dimIndex, fromCoord, toCoord, coordSys) {
  var otherDimIndex = 1 - dimIndex;
  return isInifinity(fromCoord[otherDimIndex]) && isInifinity(toCoord[otherDimIndex]);
}

function markAreaFilter(coordSys, item) {
  var fromCoord = item.coord[0];
  var toCoord = item.coord[1];

  if (coordSys.type === 'cartesian2d') {
    // In case
    // {
    //  markArea: {
    //    data: [{ yAxis: 2 }]
    //  }
    // }
    if (fromCoord && toCoord && (ifMarkLineHasOnlyDim(1, fromCoord, toCoord, coordSys) || ifMarkLineHasOnlyDim(0, fromCoord, toCoord, coordSys))) {
      return true;
    }
  }

  return markerHelper.dataFilter(coordSys, {
    coord: fromCoord,
    x: item.x0,
    y: item.y0
  }) || markerHelper.dataFilter(coordSys, {
    coord: toCoord,
    x: item.x1,
    y: item.y1
  });
} // dims can be ['x0', 'y0'], ['x1', 'y1'], ['x0', 'y1'], ['x1', 'y0']


function getSingleMarkerEndPoint(data, idx, dims, seriesModel, api) {
  var coordSys = seriesModel.coordinateSystem;
  var itemModel = data.getItemModel(idx);
  var point;
  var xPx = numberUtil.parsePercent(itemModel.get(dims[0]), api.getWidth());
  var yPx = numberUtil.parsePercent(itemModel.get(dims[1]), api.getHeight());

  if (!isNaN(xPx) && !isNaN(yPx)) {
    point = [xPx, yPx];
  } else {
    // Chart like bar may have there own marker positioning logic
    if (seriesModel.getMarkerPosition) {
      // Use the getMarkerPoisition
      point = seriesModel.getMarkerPosition(data.getValues(dims, idx));
    } else {
      var x = data.get(dims[0], idx);
      var y = data.get(dims[1], idx);
      var pt = [x, y];
      coordSys.clampData && coordSys.clampData(pt, pt);
      point = coordSys.dataToPoint(pt, true);
    }

    if (coordSys.type === 'cartesian2d') {
      var xAxis = coordSys.getAxis('x');
      var yAxis = coordSys.getAxis('y');
      var x = data.get(dims[0], idx);
      var y = data.get(dims[1], idx);

      if (isInifinity(x)) {
        point[0] = xAxis.toGlobalCoord(xAxis.getExtent()[dims[0] === 'x0' ? 0 : 1]);
      } else if (isInifinity(y)) {
        point[1] = yAxis.toGlobalCoord(yAxis.getExtent()[dims[1] === 'y0' ? 0 : 1]);
      }
    } // Use x, y if has any


    if (!isNaN(xPx)) {
      point[0] = xPx;
    }

    if (!isNaN(yPx)) {
      point[1] = yPx;
    }
  }

  return point;
}

var dimPermutations = [['x0', 'y0'], ['x1', 'y0'], ['x1', 'y1'], ['x0', 'y1']];
MarkerView.extend({
  type: 'markArea',
  // updateLayout: function (markAreaModel, ecModel, api) {
  //     ecModel.eachSeries(function (seriesModel) {
  //         var maModel = seriesModel.markAreaModel;
  //         if (maModel) {
  //             var areaData = maModel.getData();
  //             areaData.each(function (idx) {
  //                 var points = zrUtil.map(dimPermutations, function (dim) {
  //                     return getSingleMarkerEndPoint(areaData, idx, dim, seriesModel, api);
  //                 });
  //                 // Layout
  //                 areaData.setItemLayout(idx, points);
  //                 var el = areaData.getItemGraphicEl(idx);
  //                 el.setShape('points', points);
  //             });
  //         }
  //     }, this);
  // },
  updateTransform: function (markAreaModel, ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      var maModel = seriesModel.markAreaModel;

      if (maModel) {
        var areaData = maModel.getData();
        areaData.each(function (idx) {
          var points = zrUtil.map(dimPermutations, function (dim) {
            return getSingleMarkerEndPoint(areaData, idx, dim, seriesModel, api);
          }); // Layout

          areaData.setItemLayout(idx, points);
          var el = areaData.getItemGraphicEl(idx);
          el.setShape('points', points);
        });
      }
    }, this);
  },
  renderSeries: function (seriesModel, maModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesId = seriesModel.id;
    var seriesData = seriesModel.getData();
    var areaGroupMap = this.markerGroupMap;
    var polygonGroup = areaGroupMap.get(seriesId) || areaGroupMap.set(seriesId, {
      group: new graphic.Group()
    });
    this.group.add(polygonGroup.group);
    polygonGroup.__keep = true;
    var areaData = createList(coordSys, seriesModel, maModel); // Line data for tooltip and formatter

    maModel.setData(areaData); // Update visual and layout of line

    areaData.each(function (idx) {
      // Layout
      areaData.setItemLayout(idx, zrUtil.map(dimPermutations, function (dim) {
        return getSingleMarkerEndPoint(areaData, idx, dim, seriesModel, api);
      })); // Visual

      areaData.setItemVisual(idx, {
        color: seriesData.getVisual('color')
      });
    });
    areaData.diff(polygonGroup.__data).add(function (idx) {
      var polygon = new graphic.Polygon({
        shape: {
          points: areaData.getItemLayout(idx)
        }
      });
      areaData.setItemGraphicEl(idx, polygon);
      polygonGroup.group.add(polygon);
    }).update(function (newIdx, oldIdx) {
      var polygon = polygonGroup.__data.getItemGraphicEl(oldIdx);

      graphic.updateProps(polygon, {
        shape: {
          points: areaData.getItemLayout(newIdx)
        }
      }, maModel, newIdx);
      polygonGroup.group.add(polygon);
      areaData.setItemGraphicEl(newIdx, polygon);
    }).remove(function (idx) {
      var polygon = polygonGroup.__data.getItemGraphicEl(idx);

      polygonGroup.group.remove(polygon);
    }).execute();
    areaData.eachItemGraphicEl(function (polygon, idx) {
      var itemModel = areaData.getItemModel(idx);
      var labelModel = itemModel.getModel('label');
      var labelHoverModel = itemModel.getModel('emphasis.label');
      var color = areaData.getItemVisual(idx, 'color');
      polygon.useStyle(zrUtil.defaults(itemModel.getModel('itemStyle').getItemStyle(), {
        fill: colorUtil.modifyAlpha(color, 0.4),
        stroke: color
      }));
      polygon.hoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
      graphic.setLabelStyle(polygon.style, polygon.hoverStyle, labelModel, labelHoverModel, {
        labelFetcher: maModel,
        labelDataIndex: idx,
        defaultText: areaData.getName(idx) || '',
        isRectText: true,
        autoColor: color
      });
      graphic.setHoverStyle(polygon, {});
      polygon.dataModel = maModel;
    });
    polygonGroup.__data = areaData;
    polygonGroup.group.silent = maModel.get('silent') || seriesModel.get('silent');
  }
});
/**
 * @inner
 * @param {module:echarts/coord/*} coordSys
 * @param {module:echarts/model/Series} seriesModel
 * @param {module:echarts/model/Model} mpModel
 */

function createList(coordSys, seriesModel, maModel) {
  var coordDimsInfos;
  var areaData;
  var dims = ['x0', 'y0', 'x1', 'y1'];

  if (coordSys) {
    coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
      var data = seriesModel.getData();
      var info = data.getDimensionInfo(data.mapDimension(coordDim)) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys

      return zrUtil.defaults({
        name: coordDim
      }, info);
    });
    areaData = new List(zrUtil.map(dims, function (dim, idx) {
      return {
        name: dim,
        type: coordDimsInfos[idx % 2].type
      };
    }), maModel);
  } else {
    coordDimsInfos = [{
      name: 'value',
      type: 'float'
    }];
    areaData = new List(coordDimsInfos, maModel);
  }

  var optData = zrUtil.map(maModel.get('data'), zrUtil.curry(markAreaTransform, seriesModel, coordSys, maModel));

  if (coordSys) {
    optData = zrUtil.filter(optData, zrUtil.curry(markAreaFilter, coordSys));
  }

  var dimValueGetter = coordSys ? function (item, dimName, dataIndex, dimIndex) {
    return item.coord[Math.floor(dimIndex / 2)][dimIndex % 2];
  } : function (item) {
    return item.value;
  };
  areaData.initData(optData, null, dimValueGetter);
  areaData.hasItemOption = true;
  return areaData;
}

/***/ }),

/***/ "903c":
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

  if (legendModels && legendModels.length) {
    ecModel.filterSeries(function (series) {
      // If in any legend component the status is not selected.
      // Because in legend series is assumed selected when it is not in the legend data.
      for (var i = 0; i < legendModels.length; i++) {
        if (!legendModels[i].isSelected(series.name)) {
          return false;
        }
      }

      return true;
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "923d":
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
var indexOf = zrUtil.indexOf;

function hasXOrY(item) {
  return !(isNaN(parseFloat(item.x)) && isNaN(parseFloat(item.y)));
}

function hasXAndY(item) {
  return !isNaN(parseFloat(item.x)) && !isNaN(parseFloat(item.y));
} // Make it simple, do not visit all stacked value to count precision.
// function getPrecision(data, valueAxisDim, dataIndex) {
//     var precision = -1;
//     var stackedDim = data.mapDimension(valueAxisDim);
//     do {
//         precision = Math.max(
//             numberUtil.getPrecision(data.get(stackedDim, dataIndex)),
//             precision
//         );
//         var stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
//         if (stackedOnSeries) {
//             var byValue = data.get(data.getCalculationInfo('stackedByDimension'), dataIndex);
//             data = stackedOnSeries.getData();
//             dataIndex = data.indexOf(data.getCalculationInfo('stackedByDimension'), byValue);
//             stackedDim = data.getCalculationInfo('stackedDimension');
//         }
//         else {
//             data = null;
//         }
//     } while (data);
//     return precision;
// }


function markerTypeCalculatorWithExtent(mlType, data, otherDataDim, targetDataDim, otherCoordIndex, targetCoordIndex) {
  var coordArr = [];
  var stacked = isDimensionStacked(data, targetDataDim
  /*, otherDataDim*/
  );
  var calcDataDim = stacked ? data.getCalculationInfo('stackResultDimension') : targetDataDim;
  var value = numCalculate(data, calcDataDim, mlType);
  var dataIndex = data.indicesOfNearest(calcDataDim, value)[0];
  coordArr[otherCoordIndex] = data.get(otherDataDim, dataIndex);
  coordArr[targetCoordIndex] = data.get(targetDataDim, dataIndex); // Make it simple, do not visit all stacked value to count precision.

  var precision = numberUtil.getPrecision(data.get(targetDataDim, dataIndex));
  precision = Math.min(precision, 20);

  if (precision >= 0) {
    coordArr[targetCoordIndex] = +coordArr[targetCoordIndex].toFixed(precision);
  }

  return coordArr;
}

var curry = zrUtil.curry; // TODO Specified percent

var markerTypeCalculator = {
  /**
   * @method
   * @param {module:echarts/data/List} data
   * @param {string} baseAxisDim
   * @param {string} valueAxisDim
   */
  min: curry(markerTypeCalculatorWithExtent, 'min'),

  /**
   * @method
   * @param {module:echarts/data/List} data
   * @param {string} baseAxisDim
   * @param {string} valueAxisDim
   */
  max: curry(markerTypeCalculatorWithExtent, 'max'),

  /**
   * @method
   * @param {module:echarts/data/List} data
   * @param {string} baseAxisDim
   * @param {string} valueAxisDim
   */
  average: curry(markerTypeCalculatorWithExtent, 'average')
};
/**
 * Transform markPoint data item to format used in List by do the following
 * 1. Calculate statistic like `max`, `min`, `average`
 * 2. Convert `item.xAxis`, `item.yAxis` to `item.coord` array
 * @param  {module:echarts/model/Series} seriesModel
 * @param  {module:echarts/coord/*} [coordSys]
 * @param  {Object} item
 * @return {Object}
 */

function dataTransform(seriesModel, item) {
  var data = seriesModel.getData();
  var coordSys = seriesModel.coordinateSystem; // 1. If not specify the position with pixel directly
  // 2. If `coord` is not a data array. Which uses `xAxis`,
  // `yAxis` to specify the coord on each dimension
  // parseFloat first because item.x and item.y can be percent string like '20%'

  if (item && !hasXAndY(item) && !zrUtil.isArray(item.coord) && coordSys) {
    var dims = coordSys.dimensions;
    var axisInfo = getAxisInfo(item, data, coordSys, seriesModel); // Clone the option
    // Transform the properties xAxis, yAxis, radiusAxis, angleAxis, geoCoord to value

    item = zrUtil.clone(item);

    if (item.type && markerTypeCalculator[item.type] && axisInfo.baseAxis && axisInfo.valueAxis) {
      var otherCoordIndex = indexOf(dims, axisInfo.baseAxis.dim);
      var targetCoordIndex = indexOf(dims, axisInfo.valueAxis.dim);
      item.coord = markerTypeCalculator[item.type](data, axisInfo.baseDataDim, axisInfo.valueDataDim, otherCoordIndex, targetCoordIndex); // Force to use the value of calculated value.

      item.value = item.coord[targetCoordIndex];
    } else {
      // FIXME Only has one of xAxis and yAxis.
      var coord = [item.xAxis != null ? item.xAxis : item.radiusAxis, item.yAxis != null ? item.yAxis : item.angleAxis]; // Each coord support max, min, average

      for (var i = 0; i < 2; i++) {
        if (markerTypeCalculator[coord[i]]) {
          coord[i] = numCalculate(data, data.mapDimension(dims[i]), coord[i]);
        }
      }

      item.coord = coord;
    }
  }

  return item;
}

function getAxisInfo(item, data, coordSys, seriesModel) {
  var ret = {};

  if (item.valueIndex != null || item.valueDim != null) {
    ret.valueDataDim = item.valueIndex != null ? data.getDimension(item.valueIndex) : item.valueDim;
    ret.valueAxis = coordSys.getAxis(dataDimToCoordDim(seriesModel, ret.valueDataDim));
    ret.baseAxis = coordSys.getOtherAxis(ret.valueAxis);
    ret.baseDataDim = data.mapDimension(ret.baseAxis.dim);
  } else {
    ret.baseAxis = seriesModel.getBaseAxis();
    ret.valueAxis = coordSys.getOtherAxis(ret.baseAxis);
    ret.baseDataDim = data.mapDimension(ret.baseAxis.dim);
    ret.valueDataDim = data.mapDimension(ret.valueAxis.dim);
  }

  return ret;
}

function dataDimToCoordDim(seriesModel, dataDim) {
  var data = seriesModel.getData();
  var dimensions = data.dimensions;
  dataDim = data.getDimension(dataDim);

  for (var i = 0; i < dimensions.length; i++) {
    var dimItem = data.getDimensionInfo(dimensions[i]);

    if (dimItem.name === dataDim) {
      return dimItem.coordDim;
    }
  }
}
/**
 * Filter data which is out of coordinateSystem range
 * [dataFilter description]
 * @param  {module:echarts/coord/*} [coordSys]
 * @param  {Object} item
 * @return {boolean}
 */


function dataFilter(coordSys, item) {
  // Alwalys return true if there is no coordSys
  return coordSys && coordSys.containData && item.coord && !hasXOrY(item) ? coordSys.containData(item.coord) : true;
}

function dimValueGetter(item, dimName, dataIndex, dimIndex) {
  // x, y, radius, angle
  if (dimIndex < 2) {
    return item.coord && item.coord[dimIndex];
  }

  return item.value;
}

function numCalculate(data, valueDataDim, type) {
  if (type === 'average') {
    var sum = 0;
    var count = 0;
    data.each(valueDataDim, function (val, idx) {
      if (!isNaN(val)) {
        sum += val;
        count++;
      }
    });
    return sum / count;
  } else if (type === 'median') {
    return data.getMedian(valueDataDim);
  } else {
    // max & min
    return data.getDataExtent(valueDataDim, true)[type === 'max' ? 1 : 0];
  }
}

exports.dataTransform = dataTransform;
exports.getAxisInfo = getAxisInfo;
exports.dataFilter = dataFilter;
exports.dimValueGetter = dimValueGetter;
exports.numCalculate = numCalculate;

/***/ }),

/***/ "933b":
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
  type: 'timeline'
});

module.exports = _default;

/***/ }),

/***/ "95a8":
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

__webpack_require__("1953");

__webpack_require__("307d");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerPreprocessor(function (opt) {
  // Make sure markLine component is enabled
  opt.markLine = opt.markLine || {};
});

/***/ }),

/***/ "a04e":
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
Component.registerSubTypeDefaulter('timeline', function () {
  // Only slider now.
  return 'slider';
});

/***/ }),

/***/ "a8c6":
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

var MarkerModel = __webpack_require__("2449");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = MarkerModel.extend({
  type: 'markPoint',
  defaultOption: {
    zlevel: 0,
    z: 5,
    symbol: 'pin',
    symbolSize: 50,
    //symbolRotate: 0,
    //symbolOffset: [0, 0]
    tooltip: {
      trigger: 'item'
    },
    label: {
      show: true,
      position: 'inside'
    },
    itemStyle: {
      borderWidth: 2
    },
    emphasis: {
      label: {
        show: true
      }
    }
  }
});

module.exports = _default;

/***/ }),

/***/ "c515":
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

__webpack_require__("849b");

__webpack_require__("8459");

__webpack_require__("b006");

/***/ }),

/***/ "d28f":
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

__webpack_require__("84d5");

__webpack_require__("4650");

__webpack_require__("5e97");

var legendFilter = __webpack_require__("903c");

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
// Do not contain scrollable legend, for sake of file size.
// Series Filter
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.SERIES_FILTER, legendFilter);
Component.registerSubTypeDefaulter('legend', function () {
  // Default 'plain' when no type specified.
  return 'plain';
});

/***/ }),

/***/ "db0e":
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

__webpack_require__("a8c6");

__webpack_require__("8344");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// HINT Markpoint can't be used too much
echarts.registerPreprocessor(function (opt) {
  // Make sure markPoint component is enabled
  opt.markPoint = opt.markPoint || {};
});

/***/ }),

/***/ "dd7e":
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

var TimelineModel = __webpack_require__("edaf");

var dataFormatMixin = __webpack_require__("38a2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var SliderTimelineModel = TimelineModel.extend({
  type: 'timeline.slider',

  /**
   * @protected
   */
  defaultOption: {
    backgroundColor: 'rgba(0,0,0,0)',
    // 时间轴背景颜色
    borderColor: '#ccc',
    // 时间轴边框颜色
    borderWidth: 0,
    // 时间轴边框线宽，单位px，默认为0（无边框）
    orient: 'horizontal',
    // 'vertical'
    inverse: false,
    tooltip: {
      // boolean or Object
      trigger: 'item' // data item may also have tootip attr.

    },
    symbol: 'emptyCircle',
    symbolSize: 10,
    lineStyle: {
      show: true,
      width: 2,
      color: '#304654'
    },
    label: {
      // 文本标签
      position: 'auto',
      // auto left right top bottom
      // When using number, label position is not
      // restricted by viewRect.
      // positive: right/bottom, negative: left/top
      show: true,
      interval: 'auto',
      rotate: 0,
      // formatter: null,
      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      color: '#304654'
    },
    itemStyle: {
      color: '#304654',
      borderWidth: 1
    },
    checkpointStyle: {
      symbol: 'circle',
      symbolSize: 13,
      color: '#c23531',
      borderWidth: 5,
      borderColor: 'rgba(194,53,49, 0.5)',
      animation: true,
      animationDuration: 300,
      animationEasing: 'quinticInOut'
    },
    controlStyle: {
      show: true,
      showPlayBtn: true,
      showPrevBtn: true,
      showNextBtn: true,
      itemSize: 22,
      itemGap: 12,
      position: 'left',
      // 'left' 'right' 'top' 'bottom'
      playIcon: 'path://M31.6,53C17.5,53,6,41.5,6,27.4S17.5,1.8,31.6,1.8C45.7,1.8,57.2,13.3,57.2,27.4S45.7,53,31.6,53z M31.6,3.3 C18.4,3.3,7.5,14.1,7.5,27.4c0,13.3,10.8,24.1,24.1,24.1C44.9,51.5,55.7,40.7,55.7,27.4C55.7,14.1,44.9,3.3,31.6,3.3z M24.9,21.3 c0-2.2,1.6-3.1,3.5-2l10.5,6.1c1.899,1.1,1.899,2.9,0,4l-10.5,6.1c-1.9,1.1-3.5,0.2-3.5-2V21.3z',
      // jshint ignore:line
      stopIcon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
      // jshint ignore:line
      nextIcon: 'path://M18.6,50.8l22.5-22.5c0.2-0.2,0.3-0.4,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7L18.7,4.4c-0.1-0.1-0.2-0.3-0.2-0.5 c0-0.4,0.3-0.8,0.8-0.8c0.2,0,0.5,0.1,0.6,0.3l23.5,23.5l0,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-0.1,0.1L19.7,52 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0-0.8-0.3-0.8-0.8C18.4,51.2,18.5,51,18.6,50.8z',
      // jshint ignore:line
      prevIcon: 'path://M43,52.8L20.4,30.3c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7L42.9,6.4c0.1-0.1,0.2-0.3,0.2-0.5 c0-0.4-0.3-0.8-0.8-0.8c-0.2,0-0.5,0.1-0.6,0.3L18.3,28.8l0,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l0.1,0.1L41.9,54 c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.3,0.8-0.8C43.2,53.2,43.1,53,43,52.8z',
      // jshint ignore:line
      color: '#304654',
      borderColor: '#304654',
      borderWidth: 1
    },
    emphasis: {
      label: {
        show: true,
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        color: '#c23531'
      },
      itemStyle: {
        color: '#c23531'
      },
      controlStyle: {
        color: '#c23531',
        borderColor: '#c23531',
        borderWidth: 2
      }
    },
    data: []
  }
});
zrUtil.mixin(SliderTimelineModel, dataFormatMixin);
var _default = SliderTimelineModel;
module.exports = _default;

/***/ }),

/***/ "ebf9":
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
 * @event legendScroll
 * @type {Object}
 * @property {string} type 'legendScroll'
 * @property {string} scrollDataIndex
 */
echarts.registerAction('legendScroll', 'legendscroll', function (payload, ecModel) {
  var scrollDataIndex = payload.scrollDataIndex;
  scrollDataIndex != null && ecModel.eachComponent({
    mainType: 'legend',
    subType: 'scroll',
    query: payload
  }, function (legendModel) {
    legendModel.setScrollDataIndex(scrollDataIndex);
  });
});

/***/ }),

/***/ "edaf":
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

var ComponentModel = __webpack_require__("6cb7");

var List = __webpack_require__("6179");

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
var TimelineModel = ComponentModel.extend({
  type: 'timeline',
  layoutMode: 'box',

  /**
   * @protected
   */
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 4,
    // 二级层叠
    show: true,
    axisType: 'time',
    // 模式是时间类型，支持 value, category
    realtime: true,
    left: '20%',
    top: null,
    right: '20%',
    bottom: 0,
    width: null,
    height: 40,
    padding: 5,
    controlPosition: 'left',
    // 'left' 'right' 'top' 'bottom' 'none'
    autoPlay: false,
    rewind: false,
    // 反向播放
    loop: true,
    playInterval: 2000,
    // 播放时间间隔，单位ms
    currentIndex: 0,
    itemStyle: {},
    label: {
      color: '#000'
    },
    data: []
  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel) {
    /**
     * @private
     * @type {module:echarts/data/List}
     */
    this._data;
    /**
     * @private
     * @type {Array.<string>}
     */

    this._names;
    this.mergeDefaultAndTheme(option, ecModel);

    this._initData();
  },

  /**
   * @override
   */
  mergeOption: function (option) {
    TimelineModel.superApply(this, 'mergeOption', arguments);

    this._initData();
  },

  /**
   * @param {number} [currentIndex]
   */
  setCurrentIndex: function (currentIndex) {
    if (currentIndex == null) {
      currentIndex = this.option.currentIndex;
    }

    var count = this._data.count();

    if (this.option.loop) {
      currentIndex = (currentIndex % count + count) % count;
    } else {
      currentIndex >= count && (currentIndex = count - 1);
      currentIndex < 0 && (currentIndex = 0);
    }

    this.option.currentIndex = currentIndex;
  },

  /**
   * @return {number} currentIndex
   */
  getCurrentIndex: function () {
    return this.option.currentIndex;
  },

  /**
   * @return {boolean}
   */
  isIndexMax: function () {
    return this.getCurrentIndex() >= this._data.count() - 1;
  },

  /**
   * @param {boolean} state true: play, false: stop
   */
  setPlayState: function (state) {
    this.option.autoPlay = !!state;
  },

  /**
   * @return {boolean} true: play, false: stop
   */
  getPlayState: function () {
    return !!this.option.autoPlay;
  },

  /**
   * @private
   */
  _initData: function () {
    var thisOption = this.option;
    var dataArr = thisOption.data || [];
    var axisType = thisOption.axisType;
    var names = this._names = [];

    if (axisType === 'category') {
      var idxArr = [];
      zrUtil.each(dataArr, function (item, index) {
        var value = modelUtil.getDataItemValue(item);
        var newItem;

        if (zrUtil.isObject(item)) {
          newItem = zrUtil.clone(item);
          newItem.value = index;
        } else {
          newItem = index;
        }

        idxArr.push(newItem);

        if (!zrUtil.isString(value) && (value == null || isNaN(value))) {
          value = '';
        }

        names.push(value + '');
      });
      dataArr = idxArr;
    }

    var dimType = {
      category: 'ordinal',
      time: 'time'
    }[axisType] || 'number';
    var data = this._data = new List([{
      name: 'value',
      type: dimType
    }], this);
    data.initData(dataArr, names);
  },
  getData: function () {
    return this._data;
  },

  /**
   * @public
   * @return {Array.<string>} categoreis
   */
  getCategories: function () {
    if (this.get('axisType') === 'category') {
      return this._names.slice();
    }
  }
});
var _default = TimelineModel;
module.exports = _default;

/***/ }),

/***/ "ee95":
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

var preprocessor = __webpack_require__("66a4");

__webpack_require__("a04e");

__webpack_require__("3942");

__webpack_require__("dd7e");

__webpack_require__("347f");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * DataZoom component entry
 */
echarts.registerPreprocessor(preprocessor);

/***/ }),

/***/ "f14c":
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

var LegendModel = __webpack_require__("84d5");

var _layout = __webpack_require__("f934");

var mergeLayoutParam = _layout.mergeLayoutParam;
var getLayoutParams = _layout.getLayoutParams;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var ScrollableLegendModel = LegendModel.extend({
  type: 'legend.scroll',

  /**
   * @param {number} scrollDataIndex
   */
  setScrollDataIndex: function (scrollDataIndex) {
    this.option.scrollDataIndex = scrollDataIndex;
  },
  defaultOption: {
    scrollDataIndex: 0,
    pageButtonItemGap: 5,
    pageButtonGap: null,
    pageButtonPosition: 'end',
    // 'start' or 'end'
    pageFormatter: '{current}/{total}',
    // If null/undefined, do not show page.
    pageIcons: {
      horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
      vertical: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z']
    },
    pageIconColor: '#2f4554',
    pageIconInactiveColor: '#aaa',
    pageIconSize: 15,
    // Can be [10, 3], which represents [width, height]
    pageTextStyle: {
      color: '#333'
    },
    animationDurationUpdate: 800
  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel, extraOpt) {
    var inputPositionParams = getLayoutParams(option);
    ScrollableLegendModel.superCall(this, 'init', option, parentModel, ecModel, extraOpt);
    mergeAndNormalizeLayoutParams(this, option, inputPositionParams);
  },

  /**
   * @override
   */
  mergeOption: function (option, extraOpt) {
    ScrollableLegendModel.superCall(this, 'mergeOption', option, extraOpt);
    mergeAndNormalizeLayoutParams(this, this.option, option);
  }
}); // Do not `ignoreSize` to enable setting {left: 10, right: 10}.

function mergeAndNormalizeLayoutParams(legendModel, target, raw) {
  var orient = legendModel.getOrient();
  var ignoreSize = [1, 1];
  ignoreSize[orient.index] = 0;
  mergeLayoutParam(target, raw, {
    type: 'box',
    ignoreSize: ignoreSize
  });
}

var _default = ScrollableLegendModel;
module.exports = _default;

/***/ }),

/***/ "f306":
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

var throttleUtil = __webpack_require__("88b3");

var parallelPreprocessor = __webpack_require__("6569");

__webpack_require__("849b");

__webpack_require__("217c");

__webpack_require__("c515");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var CLICK_THRESHOLD = 5; // > 4
// Parallel view

echarts.extendComponentView({
  type: 'parallel',
  render: function (parallelModel, ecModel, api) {
    this._model = parallelModel;
    this._api = api;

    if (!this._handlers) {
      this._handlers = {};
      zrUtil.each(handlers, function (handler, eventName) {
        api.getZr().on(eventName, this._handlers[eventName] = zrUtil.bind(handler, this));
      }, this);
    }

    throttleUtil.createOrUpdate(this, '_throttledDispatchExpand', parallelModel.get('axisExpandRate'), 'fixRate');
  },
  dispose: function (ecModel, api) {
    zrUtil.each(this._handlers, function (handler, eventName) {
      api.getZr().off(eventName, handler);
    });
    this._handlers = null;
  },

  /**
   * @param {Object} [opt] If null, cancle the last action triggering for debounce.
   */
  _throttledDispatchExpand: function (opt) {
    this._dispatchExpand(opt);
  },
  _dispatchExpand: function (opt) {
    opt && this._api.dispatchAction(zrUtil.extend({
      type: 'parallelAxisExpand'
    }, opt));
  }
});
var handlers = {
  mousedown: function (e) {
    if (checkTrigger(this, 'click')) {
      this._mouseDownPoint = [e.offsetX, e.offsetY];
    }
  },
  mouseup: function (e) {
    var mouseDownPoint = this._mouseDownPoint;

    if (checkTrigger(this, 'click') && mouseDownPoint) {
      var point = [e.offsetX, e.offsetY];
      var dist = Math.pow(mouseDownPoint[0] - point[0], 2) + Math.pow(mouseDownPoint[1] - point[1], 2);

      if (dist > CLICK_THRESHOLD) {
        return;
      }

      var result = this._model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);

      result.behavior !== 'none' && this._dispatchExpand({
        axisExpandWindow: result.axisExpandWindow
      });
    }

    this._mouseDownPoint = null;
  },
  mousemove: function (e) {
    // Should do nothing when brushing.
    if (this._mouseDownPoint || !checkTrigger(this, 'mousemove')) {
      return;
    }

    var model = this._model;
    var result = model.coordinateSystem.getSlidedAxisExpandWindow([e.offsetX, e.offsetY]);
    var behavior = result.behavior;
    behavior === 'jump' && this._throttledDispatchExpand.debounceNextCall(model.get('axisExpandDebounce'));

    this._throttledDispatchExpand(behavior === 'none' ? null // Cancle the last trigger, in case that mouse slide out of the area quickly.
    : {
      axisExpandWindow: result.axisExpandWindow,
      // Jumping uses animation, and sliding suppresses animation.
      animation: behavior === 'jump' ? null : false
    });
  }
};

function checkTrigger(view, triggerOn) {
  var model = view._model;
  return model.get('axisExpandable') && model.get('axisExpandTriggerOn') === triggerOn;
}

echarts.registerPreprocessor(parallelPreprocessor);

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~f3137b1a.9e319dda.js.map