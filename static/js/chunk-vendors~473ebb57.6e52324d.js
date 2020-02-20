(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~473ebb57"],{

/***/ "004f":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var VisualMapView = __webpack_require__("72b6");

var graphic = __webpack_require__("2306");

var _symbol = __webpack_require__("a15a");

var createSymbol = _symbol.createSymbol;

var layout = __webpack_require__("f934");

var helper = __webpack_require__("cbb0");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PiecewiseVisualMapView = VisualMapView.extend({
  type: 'visualMap.piecewise',

  /**
   * @protected
   * @override
   */
  doRender: function () {
    var thisGroup = this.group;
    thisGroup.removeAll();
    var visualMapModel = this.visualMapModel;
    var textGap = visualMapModel.get('textGap');
    var textStyleModel = visualMapModel.textStyleModel;
    var textFont = textStyleModel.getFont();
    var textFill = textStyleModel.getTextColor();

    var itemAlign = this._getItemAlign();

    var itemSize = visualMapModel.itemSize;

    var viewData = this._getViewData();

    var endsText = viewData.endsText;
    var showLabel = zrUtil.retrieve(visualMapModel.get('showLabel', true), !endsText);
    endsText && this._renderEndsText(thisGroup, endsText[0], itemSize, showLabel, itemAlign);
    zrUtil.each(viewData.viewPieceList, renderItem, this);
    endsText && this._renderEndsText(thisGroup, endsText[1], itemSize, showLabel, itemAlign);
    layout.box(visualMapModel.get('orient'), thisGroup, visualMapModel.get('itemGap'));
    this.renderBackground(thisGroup);
    this.positionGroup(thisGroup);

    function renderItem(item) {
      var piece = item.piece;
      var itemGroup = new graphic.Group();
      itemGroup.onclick = zrUtil.bind(this._onItemClick, this, piece);

      this._enableHoverLink(itemGroup, item.indexInModelPieceList);

      var representValue = visualMapModel.getRepresentValue(piece);

      this._createItemSymbol(itemGroup, representValue, [0, 0, itemSize[0], itemSize[1]]);

      if (showLabel) {
        var visualState = this.visualMapModel.getValueState(representValue);
        itemGroup.add(new graphic.Text({
          style: {
            x: itemAlign === 'right' ? -textGap : itemSize[0] + textGap,
            y: itemSize[1] / 2,
            text: piece.text,
            textVerticalAlign: 'middle',
            textAlign: itemAlign,
            textFont: textFont,
            textFill: textFill,
            opacity: visualState === 'outOfRange' ? 0.5 : 1
          }
        }));
      }

      thisGroup.add(itemGroup);
    }
  },

  /**
   * @private
   */
  _enableHoverLink: function (itemGroup, pieceIndex) {
    itemGroup.on('mouseover', zrUtil.bind(onHoverLink, this, 'highlight')).on('mouseout', zrUtil.bind(onHoverLink, this, 'downplay'));

    function onHoverLink(method) {
      var visualMapModel = this.visualMapModel;
      visualMapModel.option.hoverLink && this.api.dispatchAction({
        type: method,
        batch: helper.makeHighDownBatch(visualMapModel.findTargetDataIndices(pieceIndex), visualMapModel)
      });
    }
  },

  /**
   * @private
   */
  _getItemAlign: function () {
    var visualMapModel = this.visualMapModel;
    var modelOption = visualMapModel.option;

    if (modelOption.orient === 'vertical') {
      return helper.getItemAlign(visualMapModel, this.api, visualMapModel.itemSize);
    } else {
      // horizontal, most case left unless specifying right.
      var align = modelOption.align;

      if (!align || align === 'auto') {
        align = 'left';
      }

      return align;
    }
  },

  /**
   * @private
   */
  _renderEndsText: function (group, text, itemSize, showLabel, itemAlign) {
    if (!text) {
      return;
    }

    var itemGroup = new graphic.Group();
    var textStyleModel = this.visualMapModel.textStyleModel;
    itemGroup.add(new graphic.Text({
      style: {
        x: showLabel ? itemAlign === 'right' ? itemSize[0] : 0 : itemSize[0] / 2,
        y: itemSize[1] / 2,
        textVerticalAlign: 'middle',
        textAlign: showLabel ? itemAlign : 'center',
        text: text,
        textFont: textStyleModel.getFont(),
        textFill: textStyleModel.getTextColor()
      }
    }));
    group.add(itemGroup);
  },

  /**
   * @private
   * @return {Object} {peiceList, endsText} The order is the same as screen pixel order.
   */
  _getViewData: function () {
    var visualMapModel = this.visualMapModel;
    var viewPieceList = zrUtil.map(visualMapModel.getPieceList(), function (piece, index) {
      return {
        piece: piece,
        indexInModelPieceList: index
      };
    });
    var endsText = visualMapModel.get('text'); // Consider orient and inverse.

    var orient = visualMapModel.get('orient');
    var inverse = visualMapModel.get('inverse'); // Order of model pieceList is always [low, ..., high]

    if (orient === 'horizontal' ? inverse : !inverse) {
      viewPieceList.reverse();
    } // Origin order of endsText is [high, low]
    else if (endsText) {
        endsText = endsText.slice().reverse();
      }

    return {
      viewPieceList: viewPieceList,
      endsText: endsText
    };
  },

  /**
   * @private
   */
  _createItemSymbol: function (group, representValue, shapeParam) {
    group.add(createSymbol(this.getControllerVisual(representValue, 'symbol'), shapeParam[0], shapeParam[1], shapeParam[2], shapeParam[3], this.getControllerVisual(representValue, 'color')));
  },

  /**
   * @private
   */
  _onItemClick: function (piece) {
    var visualMapModel = this.visualMapModel;
    var option = visualMapModel.option;
    var selected = zrUtil.clone(option.selected);
    var newKey = visualMapModel.getSelectedMapKey(piece);

    if (option.selectedMode === 'single') {
      selected[newKey] = true;
      zrUtil.each(selected, function (o, key) {
        selected[key] = key === newKey;
      });
    } else {
      selected[newKey] = !selected[newKey];
    }

    this.api.dispatchAction({
      type: 'selectDataRange',
      from: this.uid,
      visualMapId: this.visualMapModel.id,
      selected: selected
    });
  }
});
var _default = PiecewiseVisualMapView;
module.exports = _default;

/***/ }),

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

/***/ "01ef":
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
 * For geo and graph.
 *
 * @param {Object} controllerHost
 * @param {module:zrender/Element} controllerHost.target
 */
function updateViewOnPan(controllerHost, dx, dy) {
  var target = controllerHost.target;
  var pos = target.position;
  pos[0] += dx;
  pos[1] += dy;
  target.dirty();
}
/**
 * For geo and graph.
 *
 * @param {Object} controllerHost
 * @param {module:zrender/Element} controllerHost.target
 * @param {number} controllerHost.zoom
 * @param {number} controllerHost.zoomLimit like: {min: 1, max: 2}
 */


function updateViewOnZoom(controllerHost, zoomDelta, zoomX, zoomY) {
  var target = controllerHost.target;
  var zoomLimit = controllerHost.zoomLimit;
  var pos = target.position;
  var scale = target.scale;
  var newZoom = controllerHost.zoom = controllerHost.zoom || 1;
  newZoom *= zoomDelta;

  if (zoomLimit) {
    var zoomMin = zoomLimit.min || 0;
    var zoomMax = zoomLimit.max || Infinity;
    newZoom = Math.max(Math.min(zoomMax, newZoom), zoomMin);
  }

  var zoomScale = newZoom / controllerHost.zoom;
  controllerHost.zoom = newZoom; // Keep the mouse center when scaling

  pos[0] -= (zoomX - pos[0]) * (zoomScale - 1);
  pos[1] -= (zoomY - pos[1]) * (zoomScale - 1);
  scale[0] *= zoomScale;
  scale[1] *= zoomScale;
  target.dirty();
}

exports.updateViewOnPan = updateViewOnPan;
exports.updateViewOnZoom = updateViewOnZoom;

/***/ }),

/***/ "06ea":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var VisualMapModel = __webpack_require__("eaea");

var VisualMapping = __webpack_require__("5f14");

var visualDefault = __webpack_require__("60e3");

var _number = __webpack_require__("3842");

var reformIntervals = _number.reformIntervals;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PiecewiseModel = VisualMapModel.extend({
  type: 'visualMap.piecewise',

  /**
   * Order Rule:
   *
   * option.categories / option.pieces / option.text / option.selected:
   *     If !option.inverse,
   *     Order when vertical: ['top', ..., 'bottom'].
   *     Order when horizontal: ['left', ..., 'right'].
   *     If option.inverse, the meaning of
   *     the order should be reversed.
   *
   * this._pieceList:
   *     The order is always [low, ..., high].
   *
   * Mapping from location to low-high:
   *     If !option.inverse
   *     When vertical, top is high.
   *     When horizontal, right is high.
   *     If option.inverse, reverse.
   */

  /**
   * @protected
   */
  defaultOption: {
    selected: null,
    // Object. If not specified, means selected.
    // When pieces and splitNumber: {'0': true, '5': true}
    // When categories: {'cate1': false, 'cate3': true}
    // When selected === false, means all unselected.
    minOpen: false,
    // Whether include values that smaller than `min`.
    maxOpen: false,
    // Whether include values that bigger than `max`.
    align: 'auto',
    // 'auto', 'left', 'right'
    itemWidth: 20,
    // When put the controller vertically, it is the length of
    // horizontal side of each item. Otherwise, vertical side.
    itemHeight: 14,
    // When put the controller vertically, it is the length of
    // vertical side of each item. Otherwise, horizontal side.
    itemSymbol: 'roundRect',
    pieceList: null,
    // Each item is Object, with some of those attrs:
    // {min, max, lt, gt, lte, gte, value,
    // color, colorSaturation, colorAlpha, opacity,
    // symbol, symbolSize}, which customize the range or visual
    // coding of the certain piece. Besides, see "Order Rule".
    categories: null,
    // category names, like: ['some1', 'some2', 'some3'].
    // Attr min/max are ignored when categories set. See "Order Rule"
    splitNumber: 5,
    // If set to 5, auto split five pieces equally.
    // If set to 0 and component type not set, component type will be
    // determined as "continuous". (It is less reasonable but for ec2
    // compatibility, see echarts/component/visualMap/typeDefaulter)
    selectedMode: 'multiple',
    // Can be 'multiple' or 'single'.
    itemGap: 10,
    // The gap between two items, in px.
    hoverLink: true,
    // Enable hover highlight.
    showLabel: null // By default, when text is used, label will hide (the logic
    // is remained for compatibility reason)

  },

  /**
   * @override
   */
  optionUpdated: function (newOption, isInit) {
    PiecewiseModel.superApply(this, 'optionUpdated', arguments);
    /**
     * The order is always [low, ..., high].
     * [{text: string, interval: Array.<number>}, ...]
     * @private
     * @type {Array.<Object>}
     */

    this._pieceList = [];
    this.resetExtent();
    /**
     * 'pieces', 'categories', 'splitNumber'
     * @type {string}
     */

    var mode = this._mode = this._determineMode();

    resetMethods[this._mode].call(this);

    this._resetSelected(newOption, isInit);

    var categories = this.option.categories;
    this.resetVisual(function (mappingOption, state) {
      if (mode === 'categories') {
        mappingOption.mappingMethod = 'category';
        mappingOption.categories = zrUtil.clone(categories);
      } else {
        mappingOption.dataExtent = this.getExtent();
        mappingOption.mappingMethod = 'piecewise';
        mappingOption.pieceList = zrUtil.map(this._pieceList, function (piece) {
          var piece = zrUtil.clone(piece);

          if (state !== 'inRange') {
            // FIXME
            // outOfRange do not support special visual in pieces.
            piece.visual = null;
          }

          return piece;
        });
      }
    });
  },

  /**
   * @protected
   * @override
   */
  completeVisualOption: function () {
    // Consider this case:
    // visualMap: {
    //      pieces: [{symbol: 'circle', lt: 0}, {symbol: 'rect', gte: 0}]
    // }
    // where no inRange/outOfRange set but only pieces. So we should make
    // default inRange/outOfRange for this case, otherwise visuals that only
    // appear in `pieces` will not be taken into account in visual encoding.
    var option = this.option;
    var visualTypesInPieces = {};
    var visualTypes = VisualMapping.listVisualTypes();
    var isCategory = this.isCategory();
    zrUtil.each(option.pieces, function (piece) {
      zrUtil.each(visualTypes, function (visualType) {
        if (piece.hasOwnProperty(visualType)) {
          visualTypesInPieces[visualType] = 1;
        }
      });
    });
    zrUtil.each(visualTypesInPieces, function (v, visualType) {
      var exists = 0;
      zrUtil.each(this.stateList, function (state) {
        exists |= has(option, state, visualType) || has(option.target, state, visualType);
      }, this);
      !exists && zrUtil.each(this.stateList, function (state) {
        (option[state] || (option[state] = {}))[visualType] = visualDefault.get(visualType, state === 'inRange' ? 'active' : 'inactive', isCategory);
      });
    }, this);

    function has(obj, state, visualType) {
      return obj && obj[state] && (zrUtil.isObject(obj[state]) ? obj[state].hasOwnProperty(visualType) : obj[state] === visualType // e.g., inRange: 'symbol'
      );
    }

    VisualMapModel.prototype.completeVisualOption.apply(this, arguments);
  },
  _resetSelected: function (newOption, isInit) {
    var thisOption = this.option;
    var pieceList = this._pieceList; // Selected do not merge but all override.

    var selected = (isInit ? thisOption : newOption).selected || {};
    thisOption.selected = selected; // Consider 'not specified' means true.

    zrUtil.each(pieceList, function (piece, index) {
      var key = this.getSelectedMapKey(piece);

      if (!selected.hasOwnProperty(key)) {
        selected[key] = true;
      }
    }, this);

    if (thisOption.selectedMode === 'single') {
      // Ensure there is only one selected.
      var hasSel = false;
      zrUtil.each(pieceList, function (piece, index) {
        var key = this.getSelectedMapKey(piece);

        if (selected[key]) {
          hasSel ? selected[key] = false : hasSel = true;
        }
      }, this);
    } // thisOption.selectedMode === 'multiple', default: all selected.

  },

  /**
   * @public
   */
  getSelectedMapKey: function (piece) {
    return this._mode === 'categories' ? piece.value + '' : piece.index + '';
  },

  /**
   * @public
   */
  getPieceList: function () {
    return this._pieceList;
  },

  /**
   * @private
   * @return {string}
   */
  _determineMode: function () {
    var option = this.option;
    return option.pieces && option.pieces.length > 0 ? 'pieces' : this.option.categories ? 'categories' : 'splitNumber';
  },

  /**
   * @public
   * @override
   */
  setSelected: function (selected) {
    this.option.selected = zrUtil.clone(selected);
  },

  /**
   * @public
   * @override
   */
  getValueState: function (value) {
    var index = VisualMapping.findPieceIndex(value, this._pieceList);
    return index != null ? this.option.selected[this.getSelectedMapKey(this._pieceList[index])] ? 'inRange' : 'outOfRange' : 'outOfRange';
  },

  /**
   * @public
   * @params {number} pieceIndex piece index in visualMapModel.getPieceList()
   * @return {Array.<Object>} [{seriesId, dataIndex: <Array.<number>>}, ...]
   */
  findTargetDataIndices: function (pieceIndex) {
    var result = [];
    this.eachTargetSeries(function (seriesModel) {
      var dataIndices = [];
      var data = seriesModel.getData();
      data.each(this.getDataDimension(data), function (value, dataIndex) {
        // Should always base on model pieceList, because it is order sensitive.
        var pIdx = VisualMapping.findPieceIndex(value, this._pieceList);
        pIdx === pieceIndex && dataIndices.push(dataIndex);
      }, this);
      result.push({
        seriesId: seriesModel.id,
        dataIndex: dataIndices
      });
    }, this);
    return result;
  },

  /**
   * @private
   * @param {Object} piece piece.value or piece.interval is required.
   * @return {number} Can be Infinity or -Infinity
   */
  getRepresentValue: function (piece) {
    var representValue;

    if (this.isCategory()) {
      representValue = piece.value;
    } else {
      if (piece.value != null) {
        representValue = piece.value;
      } else {
        var pieceInterval = piece.interval || [];
        representValue = pieceInterval[0] === -Infinity && pieceInterval[1] === Infinity ? 0 : (pieceInterval[0] + pieceInterval[1]) / 2;
      }
    }

    return representValue;
  },
  getVisualMeta: function (getColorVisual) {
    // Do not support category. (category axis is ordinal, numerical)
    if (this.isCategory()) {
      return;
    }

    var stops = [];
    var outerColors = [];
    var visualMapModel = this;

    function setStop(interval, valueState) {
      var representValue = visualMapModel.getRepresentValue({
        interval: interval
      });

      if (!valueState) {
        valueState = visualMapModel.getValueState(representValue);
      }

      var color = getColorVisual(representValue, valueState);

      if (interval[0] === -Infinity) {
        outerColors[0] = color;
      } else if (interval[1] === Infinity) {
        outerColors[1] = color;
      } else {
        stops.push({
          value: interval[0],
          color: color
        }, {
          value: interval[1],
          color: color
        });
      }
    } // Suplement


    var pieceList = this._pieceList.slice();

    if (!pieceList.length) {
      pieceList.push({
        interval: [-Infinity, Infinity]
      });
    } else {
      var edge = pieceList[0].interval[0];
      edge !== -Infinity && pieceList.unshift({
        interval: [-Infinity, edge]
      });
      edge = pieceList[pieceList.length - 1].interval[1];
      edge !== Infinity && pieceList.push({
        interval: [edge, Infinity]
      });
    }

    var curr = -Infinity;
    zrUtil.each(pieceList, function (piece) {
      var interval = piece.interval;

      if (interval) {
        // Fulfill gap.
        interval[0] > curr && setStop([curr, interval[0]], 'outOfRange');
        setStop(interval.slice());
        curr = interval[1];
      }
    }, this);
    return {
      stops: stops,
      outerColors: outerColors
    };
  }
});
/**
 * Key is this._mode
 * @type {Object}
 * @this {module:echarts/component/viusalMap/PiecewiseMode}
 */

var resetMethods = {
  splitNumber: function () {
    var thisOption = this.option;
    var pieceList = this._pieceList;
    var precision = Math.min(thisOption.precision, 20);
    var dataExtent = this.getExtent();
    var splitNumber = thisOption.splitNumber;
    splitNumber = Math.max(parseInt(splitNumber, 10), 1);
    thisOption.splitNumber = splitNumber;
    var splitStep = (dataExtent[1] - dataExtent[0]) / splitNumber; // Precision auto-adaption

    while (+splitStep.toFixed(precision) !== splitStep && precision < 5) {
      precision++;
    }

    thisOption.precision = precision;
    splitStep = +splitStep.toFixed(precision);
    var index = 0;

    if (thisOption.minOpen) {
      pieceList.push({
        index: index++,
        interval: [-Infinity, dataExtent[0]],
        close: [0, 0]
      });
    }

    for (var curr = dataExtent[0], len = index + splitNumber; index < len; curr += splitStep) {
      var max = index === splitNumber - 1 ? dataExtent[1] : curr + splitStep;
      pieceList.push({
        index: index++,
        interval: [curr, max],
        close: [1, 1]
      });
    }

    if (thisOption.maxOpen) {
      pieceList.push({
        index: index++,
        interval: [dataExtent[1], Infinity],
        close: [0, 0]
      });
    }

    reformIntervals(pieceList);
    zrUtil.each(pieceList, function (piece) {
      piece.text = this.formatValueText(piece.interval);
    }, this);
  },
  categories: function () {
    var thisOption = this.option;
    zrUtil.each(thisOption.categories, function (cate) {
      // FIXME category模式也使用pieceList，但在visualMapping中不是使用pieceList。
      // 是否改一致。
      this._pieceList.push({
        text: this.formatValueText(cate, true),
        value: cate
      });
    }, this); // See "Order Rule".

    normalizeReverse(thisOption, this._pieceList);
  },
  pieces: function () {
    var thisOption = this.option;
    var pieceList = this._pieceList;
    zrUtil.each(thisOption.pieces, function (pieceListItem, index) {
      if (!zrUtil.isObject(pieceListItem)) {
        pieceListItem = {
          value: pieceListItem
        };
      }

      var item = {
        text: '',
        index: index
      };

      if (pieceListItem.label != null) {
        item.text = pieceListItem.label;
      }

      if (pieceListItem.hasOwnProperty('value')) {
        var value = item.value = pieceListItem.value;
        item.interval = [value, value];
        item.close = [1, 1];
      } else {
        // `min` `max` is legacy option.
        // `lt` `gt` `lte` `gte` is recommanded.
        var interval = item.interval = [];
        var close = item.close = [0, 0];
        var closeList = [1, 0, 1];
        var infinityList = [-Infinity, Infinity];
        var useMinMax = [];

        for (var lg = 0; lg < 2; lg++) {
          var names = [['gte', 'gt', 'min'], ['lte', 'lt', 'max']][lg];

          for (var i = 0; i < 3 && interval[lg] == null; i++) {
            interval[lg] = pieceListItem[names[i]];
            close[lg] = closeList[i];
            useMinMax[lg] = i === 2;
          }

          interval[lg] == null && (interval[lg] = infinityList[lg]);
        }

        useMinMax[0] && interval[1] === Infinity && (close[0] = 0);
        useMinMax[1] && interval[0] === -Infinity && (close[1] = 0);

        if (interval[0] === interval[1] && close[0] && close[1]) {
          // Consider: [{min: 5, max: 5, visual: {...}}, {min: 0, max: 5}],
          // we use value to lift the priority when min === max
          item.value = interval[0];
        }
      }

      item.visual = VisualMapping.retrieveVisuals(pieceListItem);
      pieceList.push(item);
    }, this); // See "Order Rule".

    normalizeReverse(thisOption, pieceList); // Only pieces

    reformIntervals(pieceList);
    zrUtil.each(pieceList, function (piece) {
      var close = piece.close;
      var edgeSymbols = [['<', '≤'][close[1]], ['>', '≥'][close[0]]];
      piece.text = piece.text || this.formatValueText(piece.value != null ? piece.value : piece.interval, false, edgeSymbols);
    }, this);
  }
};

function normalizeReverse(thisOption, pieceList) {
  var inverse = thisOption.inverse;

  if (thisOption.orient === 'vertical' ? !inverse : inverse) {
    pieceList.reverse();
  }
}

var _default = PiecewiseModel;
module.exports = _default;

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

/***/ "0c41":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var roamHelper = __webpack_require__("01ef");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphic = __webpack_require__("2306");

var geoSourceManager = __webpack_require__("5b87");

var _component = __webpack_require__("8918");

var getUID = _component.getUID;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function getFixedItemStyle(model) {
  var itemStyle = model.getItemStyle();
  var areaColor = model.get('areaColor'); // If user want the color not to be changed when hover,
  // they should both set areaColor and color to be null.

  if (areaColor != null) {
    itemStyle.fill = areaColor;
  }

  return itemStyle;
}

function updateMapSelectHandler(mapDraw, mapOrGeoModel, regionsGroup, api, fromView) {
  regionsGroup.off('click');
  regionsGroup.off('mousedown');

  if (mapOrGeoModel.get('selectedMode')) {
    regionsGroup.on('mousedown', function () {
      mapDraw._mouseDownFlag = true;
    });
    regionsGroup.on('click', function (e) {
      if (!mapDraw._mouseDownFlag) {
        return;
      }

      mapDraw._mouseDownFlag = false;
      var el = e.target;

      while (!el.__regions) {
        el = el.parent;
      }

      if (!el) {
        return;
      }

      var action = {
        type: (mapOrGeoModel.mainType === 'geo' ? 'geo' : 'map') + 'ToggleSelect',
        batch: zrUtil.map(el.__regions, function (region) {
          return {
            name: region.name,
            from: fromView.uid
          };
        })
      };
      action[mapOrGeoModel.mainType + 'Id'] = mapOrGeoModel.id;
      api.dispatchAction(action);
      updateMapSelected(mapOrGeoModel, regionsGroup);
    });
  }
}

function updateMapSelected(mapOrGeoModel, regionsGroup) {
  // FIXME
  regionsGroup.eachChild(function (otherRegionEl) {
    zrUtil.each(otherRegionEl.__regions, function (region) {
      otherRegionEl.trigger(mapOrGeoModel.isSelected(region.name) ? 'emphasis' : 'normal');
    });
  });
}
/**
 * @alias module:echarts/component/helper/MapDraw
 * @param {module:echarts/ExtensionAPI} api
 * @param {boolean} updateGroup
 */


function MapDraw(api, updateGroup) {
  var group = new graphic.Group();
  /**
   * @type {string}
   * @private
   */

  this.uid = getUID('ec_map_draw');
  /**
   * @type {module:echarts/component/helper/RoamController}
   * @private
   */

  this._controller = new RoamController(api.getZr());
  /**
   * @type {Object} {target, zoom, zoomLimit}
   * @private
   */

  this._controllerHost = {
    target: updateGroup ? group : null
  };
  /**
   * @type {module:zrender/container/Group}
   * @readOnly
   */

  this.group = group;
  /**
   * @type {boolean}
   * @private
   */

  this._updateGroup = updateGroup;
  /**
   * This flag is used to make sure that only one among
   * `pan`, `zoom`, `click` can occurs, otherwise 'selected'
   * action may be triggered when `pan`, which is unexpected.
   * @type {booelan}
   */

  this._mouseDownFlag;
  /**
   * @type {string}
   */

  this._mapName;
  /**
   * @type {boolean}
   */

  this._initialized;
  /**
   * @type {module:zrender/container/Group}
   */

  group.add(this._regionsGroup = new graphic.Group());
  /**
   * @type {module:zrender/container/Group}
   */

  group.add(this._backgroundGroup = new graphic.Group());
}

MapDraw.prototype = {
  constructor: MapDraw,
  draw: function (mapOrGeoModel, ecModel, api, fromView, payload) {
    var isGeo = mapOrGeoModel.mainType === 'geo'; // Map series has data. GEO model that controlled by map series
    // will be assigned with map data. Other GEO model has no data.

    var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
    isGeo && ecModel.eachComponent({
      mainType: 'series',
      subType: 'map'
    }, function (mapSeries) {
      if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
        data = mapSeries.getData();
      }
    });
    var geo = mapOrGeoModel.coordinateSystem;

    this._updateBackground(geo);

    var regionsGroup = this._regionsGroup;
    var group = this.group;

    if (geo._roamTransformable.transform) {
      group.transform = geo._roamTransformable.transform.slice();
      group.decomposeTransform();
    }

    var scale = geo._rawTransformable.scale;
    var position = geo._rawTransformable.position;
    regionsGroup.removeAll();
    var itemStyleAccessPath = ['itemStyle'];
    var hoverItemStyleAccessPath = ['emphasis', 'itemStyle'];
    var labelAccessPath = ['label'];
    var hoverLabelAccessPath = ['emphasis', 'label'];
    var nameMap = zrUtil.createHashMap();
    zrUtil.each(geo.regions, function (region) {
      // Consider in GeoJson properties.name may be duplicated, for example,
      // there is multiple region named "United Kindom" or "France" (so many
      // colonies). And it is not appropriate to merge them in geo, which
      // will make them share the same label and bring trouble in label
      // location calculation.
      var regionGroup = nameMap.get(region.name) || nameMap.set(region.name, new graphic.Group());
      var compoundPath = new graphic.CompoundPath({
        segmentIgnoreThreshold: 1,
        shape: {
          paths: []
        }
      });
      regionGroup.add(compoundPath);
      var regionModel = mapOrGeoModel.getRegionModel(region.name) || mapOrGeoModel;
      var itemStyleModel = regionModel.getModel(itemStyleAccessPath);
      var hoverItemStyleModel = regionModel.getModel(hoverItemStyleAccessPath);
      var itemStyle = getFixedItemStyle(itemStyleModel);
      var hoverItemStyle = getFixedItemStyle(hoverItemStyleModel);
      var labelModel = regionModel.getModel(labelAccessPath);
      var hoverLabelModel = regionModel.getModel(hoverLabelAccessPath);
      var dataIdx; // Use the itemStyle in data if has data

      if (data) {
        dataIdx = data.indexOfName(region.name); // Only visual color of each item will be used. It can be encoded by dataRange
        // But visual color of series is used in symbol drawing
        //
        // Visual color for each series is for the symbol draw

        var visualColor = data.getItemVisual(dataIdx, 'color', true);

        if (visualColor) {
          itemStyle.fill = visualColor;
        }
      }

      var transformPoint = function (point) {
        return [point[0] * scale[0] + position[0], point[1] * scale[1] + position[1]];
      };

      zrUtil.each(region.geometries, function (geometry) {
        if (geometry.type !== 'polygon') {
          return;
        }

        var points = [];

        for (var i = 0; i < geometry.exterior.length; ++i) {
          points.push(transformPoint(geometry.exterior[i]));
        }

        compoundPath.shape.paths.push(new graphic.Polygon({
          segmentIgnoreThreshold: 1,
          shape: {
            points: points
          }
        }));

        for (var i = 0; i < (geometry.interiors ? geometry.interiors.length : 0); ++i) {
          var interior = geometry.interiors[i];
          var points = [];

          for (var j = 0; j < interior.length; ++j) {
            points.push(transformPoint(interior[j]));
          }

          compoundPath.shape.paths.push(new graphic.Polygon({
            segmentIgnoreThreshold: 1,
            shape: {
              points: points
            }
          }));
        }
      });
      compoundPath.setStyle(itemStyle);
      compoundPath.style.strokeNoScale = true;
      compoundPath.culling = true; // Label

      var showLabel = labelModel.get('show');
      var hoverShowLabel = hoverLabelModel.get('show');
      var isDataNaN = data && isNaN(data.get(data.mapDimension('value'), dataIdx));
      var itemLayout = data && data.getItemLayout(dataIdx); // In the following cases label will be drawn
      // 1. In map series and data value is NaN
      // 2. In geo component
      // 4. Region has no series legendSymbol, which will be add a showLabel flag in mapSymbolLayout

      if (isGeo || isDataNaN && (showLabel || hoverShowLabel) || itemLayout && itemLayout.showLabel) {
        var query = !isGeo ? dataIdx : region.name;
        var labelFetcher; // Consider dataIdx not found.

        if (!data || dataIdx >= 0) {
          labelFetcher = mapOrGeoModel;
        }

        var textEl = new graphic.Text({
          position: transformPoint(region.center.slice()),
          // FIXME
          // label rotation is not support yet in geo or regions of series-map
          // that has no data. The rotation will be effected by this `scale`.
          // So needed to change to RectText?
          scale: [1 / group.scale[0], 1 / group.scale[1]],
          z2: 10,
          silent: true
        });
        graphic.setLabelStyle(textEl.style, textEl.hoverStyle = {}, labelModel, hoverLabelModel, {
          labelFetcher: labelFetcher,
          labelDataIndex: query,
          defaultText: region.name,
          useInsideStyle: false
        }, {
          textAlign: 'center',
          textVerticalAlign: 'middle'
        });
        regionGroup.add(textEl);
      } // setItemGraphicEl, setHoverStyle after all polygons and labels
      // are added to the rigionGroup


      if (data) {
        data.setItemGraphicEl(dataIdx, regionGroup);
      } else {
        var regionModel = mapOrGeoModel.getRegionModel(region.name); // Package custom mouse event for geo component

        compoundPath.eventData = {
          componentType: 'geo',
          componentIndex: mapOrGeoModel.componentIndex,
          geoIndex: mapOrGeoModel.componentIndex,
          name: region.name,
          region: regionModel && regionModel.option || {}
        };
      }

      var groupRegions = regionGroup.__regions || (regionGroup.__regions = []);
      groupRegions.push(region);
      regionGroup.highDownSilentOnTouch = !!mapOrGeoModel.get('selectedMode');
      graphic.setHoverStyle(regionGroup, hoverItemStyle);
      regionsGroup.add(regionGroup);
    });

    this._updateController(mapOrGeoModel, ecModel, api);

    updateMapSelectHandler(this, mapOrGeoModel, regionsGroup, api, fromView);
    updateMapSelected(mapOrGeoModel, regionsGroup);
  },
  remove: function () {
    this._regionsGroup.removeAll();

    this._backgroundGroup.removeAll();

    this._controller.dispose();

    this._mapName && geoSourceManager.removeGraphic(this._mapName, this.uid);
    this._mapName = null;
    this._controllerHost = {};
  },
  _updateBackground: function (geo) {
    var mapName = geo.map;

    if (this._mapName !== mapName) {
      zrUtil.each(geoSourceManager.makeGraphic(mapName, this.uid), function (root) {
        this._backgroundGroup.add(root);
      }, this);
    }

    this._mapName = mapName;
  },
  _updateController: function (mapOrGeoModel, ecModel, api) {
    var geo = mapOrGeoModel.coordinateSystem;
    var controller = this._controller;
    var controllerHost = this._controllerHost;
    controllerHost.zoomLimit = mapOrGeoModel.get('scaleLimit');
    controllerHost.zoom = geo.getZoom(); // roamType is will be set default true if it is null

    controller.enable(mapOrGeoModel.get('roam') || false);
    var mainType = mapOrGeoModel.mainType;

    function makeActionBase() {
      var action = {
        type: 'geoRoam',
        componentType: mainType
      };
      action[mainType + 'Id'] = mapOrGeoModel.id;
      return action;
    }

    controller.off('pan').on('pan', function (e) {
      this._mouseDownFlag = false;
      roamHelper.updateViewOnPan(controllerHost, e.dx, e.dy);
      api.dispatchAction(zrUtil.extend(makeActionBase(), {
        dx: e.dx,
        dy: e.dy
      }));
    }, this);
    controller.off('zoom').on('zoom', function (e) {
      this._mouseDownFlag = false;
      roamHelper.updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
      api.dispatchAction(zrUtil.extend(makeActionBase(), {
        zoom: e.scale,
        originX: e.originX,
        originY: e.originY
      }));

      if (this._updateGroup) {
        var scale = this.group.scale;

        this._regionsGroup.traverse(function (el) {
          if (el.type === 'text') {
            el.attr('scale', [1 / scale[0], 1 / scale[1]]);
          }
        });
      }
    }, this);
    controller.setPointerChecker(function (e, x, y) {
      return geo.getViewRectAfterRoam().contain(x, y) && !onIrrelevantElement(e, api, mapOrGeoModel);
    });
  }
};
var _default = MapDraw;
module.exports = _default;

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

/***/ "29a9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var preprocessor = __webpack_require__("b336");

__webpack_require__("bc5f");

__webpack_require__("ab05");

__webpack_require__("06ea");

__webpack_require__("004f");

__webpack_require__("d6ef");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

/***/ "307a":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var VisualMapModel = __webpack_require__("eaea");

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
// Constant
var DEFAULT_BAR_BOUND = [20, 140];
var ContinuousModel = VisualMapModel.extend({
  type: 'visualMap.continuous',

  /**
   * @protected
   */
  defaultOption: {
    align: 'auto',
    // 'auto', 'left', 'right', 'top', 'bottom'
    calculable: false,
    // This prop effect default component type determine,
    // See echarts/component/visualMap/typeDefaulter.
    range: null,
    // selected range. In default case `range` is [min, max]
    // and can auto change along with modification of min max,
    // util use specifid a range.
    realtime: true,
    // Whether realtime update.
    itemHeight: null,
    // The length of the range control edge.
    itemWidth: null,
    // The length of the other side.
    hoverLink: true,
    // Enable hover highlight.
    hoverLinkDataSize: null,
    // The size of hovered data.
    hoverLinkOnHandle: null // Whether trigger hoverLink when hover handle.
    // If not specified, follow the value of `realtime`.

  },

  /**
   * @override
   */
  optionUpdated: function (newOption, isInit) {
    ContinuousModel.superApply(this, 'optionUpdated', arguments);
    this.resetExtent();
    this.resetVisual(function (mappingOption) {
      mappingOption.mappingMethod = 'linear';
      mappingOption.dataExtent = this.getExtent();
    });

    this._resetRange();
  },

  /**
   * @protected
   * @override
   */
  resetItemSize: function () {
    ContinuousModel.superApply(this, 'resetItemSize', arguments);
    var itemSize = this.itemSize;
    this._orient === 'horizontal' && itemSize.reverse();
    (itemSize[0] == null || isNaN(itemSize[0])) && (itemSize[0] = DEFAULT_BAR_BOUND[0]);
    (itemSize[1] == null || isNaN(itemSize[1])) && (itemSize[1] = DEFAULT_BAR_BOUND[1]);
  },

  /**
   * @private
   */
  _resetRange: function () {
    var dataExtent = this.getExtent();
    var range = this.option.range;

    if (!range || range.auto) {
      // `range` should always be array (so we dont use other
      // value like 'auto') for user-friend. (consider getOption).
      dataExtent.auto = 1;
      this.option.range = dataExtent;
    } else if (zrUtil.isArray(range)) {
      if (range[0] > range[1]) {
        range.reverse();
      }

      range[0] = Math.max(range[0], dataExtent[0]);
      range[1] = Math.min(range[1], dataExtent[1]);
    }
  },

  /**
   * @protected
   * @override
   */
  completeVisualOption: function () {
    VisualMapModel.prototype.completeVisualOption.apply(this, arguments);
    zrUtil.each(this.stateList, function (state) {
      var symbolSize = this.option.controller[state].symbolSize;

      if (symbolSize && symbolSize[0] !== symbolSize[1]) {
        symbolSize[0] = 0; // For good looking.
      }
    }, this);
  },

  /**
   * @override
   */
  setSelected: function (selected) {
    this.option.range = selected.slice();

    this._resetRange();
  },

  /**
   * @public
   */
  getSelected: function () {
    var dataExtent = this.getExtent();
    var dataInterval = numberUtil.asc((this.get('range') || []).slice()); // Clamp

    dataInterval[0] > dataExtent[1] && (dataInterval[0] = dataExtent[1]);
    dataInterval[1] > dataExtent[1] && (dataInterval[1] = dataExtent[1]);
    dataInterval[0] < dataExtent[0] && (dataInterval[0] = dataExtent[0]);
    dataInterval[1] < dataExtent[0] && (dataInterval[1] = dataExtent[0]);
    return dataInterval;
  },

  /**
   * @override
   */
  getValueState: function (value) {
    var range = this.option.range;
    var dataExtent = this.getExtent(); // When range[0] === dataExtent[0], any value larger than dataExtent[0] maps to 'inRange'.
    // range[1] is processed likewise.

    return (range[0] <= dataExtent[0] || range[0] <= value) && (range[1] >= dataExtent[1] || value <= range[1]) ? 'inRange' : 'outOfRange';
  },

  /**
   * @params {Array.<number>} range target value: range[0] <= value && value <= range[1]
   * @return {Array.<Object>} [{seriesId, dataIndices: <Array.<number>>}, ...]
   */
  findTargetDataIndices: function (range) {
    var result = [];
    this.eachTargetSeries(function (seriesModel) {
      var dataIndices = [];
      var data = seriesModel.getData();
      data.each(this.getDataDimension(data), function (value, dataIndex) {
        range[0] <= value && value <= range[1] && dataIndices.push(dataIndex);
      }, this);
      result.push({
        seriesId: seriesModel.id,
        dataIndex: dataIndices
      });
    }, this);
    return result;
  },

  /**
   * @implement
   */
  getVisualMeta: function (getColorVisual) {
    var oVals = getColorStopValues(this, 'outOfRange', this.getExtent());
    var iVals = getColorStopValues(this, 'inRange', this.option.range.slice());
    var stops = [];

    function setStop(value, valueState) {
      stops.push({
        value: value,
        color: getColorVisual(value, valueState)
      });
    } // Format to: outOfRange -- inRange -- outOfRange.


    var iIdx = 0;
    var oIdx = 0;
    var iLen = iVals.length;
    var oLen = oVals.length;

    for (; oIdx < oLen && (!iVals.length || oVals[oIdx] <= iVals[0]); oIdx++) {
      // If oVal[oIdx] === iVals[iIdx], oVal[oIdx] should be ignored.
      if (oVals[oIdx] < iVals[iIdx]) {
        setStop(oVals[oIdx], 'outOfRange');
      }
    }

    for (var first = 1; iIdx < iLen; iIdx++, first = 0) {
      // If range is full, value beyond min, max will be clamped.
      // make a singularity
      first && stops.length && setStop(iVals[iIdx], 'outOfRange');
      setStop(iVals[iIdx], 'inRange');
    }

    for (var first = 1; oIdx < oLen; oIdx++) {
      if (!iVals.length || iVals[iVals.length - 1] < oVals[oIdx]) {
        // make a singularity
        if (first) {
          stops.length && setStop(stops[stops.length - 1].value, 'outOfRange');
          first = 0;
        }

        setStop(oVals[oIdx], 'outOfRange');
      }
    }

    var stopsLen = stops.length;
    return {
      stops: stops,
      outerColors: [stopsLen ? stops[0].color : 'transparent', stopsLen ? stops[stopsLen - 1].color : 'transparent']
    };
  }
});

function getColorStopValues(visualMapModel, valueState, dataExtent) {
  if (dataExtent[0] === dataExtent[1]) {
    return dataExtent.slice();
  } // When using colorHue mapping, it is not linear color any more.
  // Moreover, canvas gradient seems not to be accurate linear.
  // FIXME
  // Should be arbitrary value 100? or based on pixel size?


  var count = 200;
  var step = (dataExtent[1] - dataExtent[0]) / count;
  var value = dataExtent[0];
  var stopValues = [];

  for (var i = 0; i <= count && value < dataExtent[1]; i++) {
    stopValues.push(value);
    value += step;
  }

  stopValues.push(dataExtent[1]);
  return stopValues;
}

var _default = ContinuousModel;
module.exports = _default;

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

/***/ "3cd6":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var LinearGradient = __webpack_require__("48a9");

var eventTool = __webpack_require__("607d");

var VisualMapView = __webpack_require__("72b6");

var graphic = __webpack_require__("2306");

var numberUtil = __webpack_require__("3842");

var sliderMove = __webpack_require__("ef6a");

var helper = __webpack_require__("cbb0");

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
var linearMap = numberUtil.linearMap;
var each = zrUtil.each;
var mathMin = Math.min;
var mathMax = Math.max; // Arbitrary value

var HOVER_LINK_SIZE = 12;
var HOVER_LINK_OUT = 6; // Notice:
// Any "interval" should be by the order of [low, high].
// "handle0" (handleIndex === 0) maps to
// low data value: this._dataInterval[0] and has low coord.
// "handle1" (handleIndex === 1) maps to
// high data value: this._dataInterval[1] and has high coord.
// The logic of transform is implemented in this._createBarGroup.

var ContinuousView = VisualMapView.extend({
  type: 'visualMap.continuous',

  /**
   * @override
   */
  init: function () {
    ContinuousView.superApply(this, 'init', arguments);
    /**
     * @private
     */

    this._shapes = {};
    /**
     * @private
     */

    this._dataInterval = [];
    /**
     * @private
     */

    this._handleEnds = [];
    /**
     * @private
     */

    this._orient;
    /**
     * @private
     */

    this._useHandle;
    /**
     * @private
     */

    this._hoverLinkDataIndices = [];
    /**
     * @private
     */

    this._dragging;
    /**
     * @private
     */

    this._hovering;
  },

  /**
   * @protected
   * @override
   */
  doRender: function (visualMapModel, ecModel, api, payload) {
    if (!payload || payload.type !== 'selectDataRange' || payload.from !== this.uid) {
      this._buildView();
    }
  },

  /**
   * @private
   */
  _buildView: function () {
    this.group.removeAll();
    var visualMapModel = this.visualMapModel;
    var thisGroup = this.group;
    this._orient = visualMapModel.get('orient');
    this._useHandle = visualMapModel.get('calculable');

    this._resetInterval();

    this._renderBar(thisGroup);

    var dataRangeText = visualMapModel.get('text');

    this._renderEndsText(thisGroup, dataRangeText, 0);

    this._renderEndsText(thisGroup, dataRangeText, 1); // Do this for background size calculation.


    this._updateView(true); // After updating view, inner shapes is built completely,
    // and then background can be rendered.


    this.renderBackground(thisGroup); // Real update view

    this._updateView();

    this._enableHoverLinkToSeries();

    this._enableHoverLinkFromSeries();

    this.positionGroup(thisGroup);
  },

  /**
   * @private
   */
  _renderEndsText: function (group, dataRangeText, endsIndex) {
    if (!dataRangeText) {
      return;
    } // Compatible with ec2, text[0] map to high value, text[1] map low value.


    var text = dataRangeText[1 - endsIndex];
    text = text != null ? text + '' : '';
    var visualMapModel = this.visualMapModel;
    var textGap = visualMapModel.get('textGap');
    var itemSize = visualMapModel.itemSize;
    var barGroup = this._shapes.barGroup;

    var position = this._applyTransform([itemSize[0] / 2, endsIndex === 0 ? -textGap : itemSize[1] + textGap], barGroup);

    var align = this._applyTransform(endsIndex === 0 ? 'bottom' : 'top', barGroup);

    var orient = this._orient;
    var textStyleModel = this.visualMapModel.textStyleModel;
    this.group.add(new graphic.Text({
      style: {
        x: position[0],
        y: position[1],
        textVerticalAlign: orient === 'horizontal' ? 'middle' : align,
        textAlign: orient === 'horizontal' ? align : 'center',
        text: text,
        textFont: textStyleModel.getFont(),
        textFill: textStyleModel.getTextColor()
      }
    }));
  },

  /**
   * @private
   */
  _renderBar: function (targetGroup) {
    var visualMapModel = this.visualMapModel;
    var shapes = this._shapes;
    var itemSize = visualMapModel.itemSize;
    var orient = this._orient;
    var useHandle = this._useHandle;
    var itemAlign = helper.getItemAlign(visualMapModel, this.api, itemSize);

    var barGroup = shapes.barGroup = this._createBarGroup(itemAlign); // Bar


    barGroup.add(shapes.outOfRange = createPolygon());
    barGroup.add(shapes.inRange = createPolygon(null, useHandle ? getCursor(this._orient) : null, zrUtil.bind(this._dragHandle, this, 'all', false), zrUtil.bind(this._dragHandle, this, 'all', true)));
    var textRect = visualMapModel.textStyleModel.getTextRect('国');
    var textSize = mathMax(textRect.width, textRect.height); // Handle

    if (useHandle) {
      shapes.handleThumbs = [];
      shapes.handleLabels = [];
      shapes.handleLabelPoints = [];

      this._createHandle(barGroup, 0, itemSize, textSize, orient, itemAlign);

      this._createHandle(barGroup, 1, itemSize, textSize, orient, itemAlign);
    }

    this._createIndicator(barGroup, itemSize, textSize, orient);

    targetGroup.add(barGroup);
  },

  /**
   * @private
   */
  _createHandle: function (barGroup, handleIndex, itemSize, textSize, orient) {
    var onDrift = zrUtil.bind(this._dragHandle, this, handleIndex, false);
    var onDragEnd = zrUtil.bind(this._dragHandle, this, handleIndex, true);
    var handleThumb = createPolygon(createHandlePoints(handleIndex, textSize), getCursor(this._orient), onDrift, onDragEnd);
    handleThumb.position[0] = itemSize[0];
    barGroup.add(handleThumb); // Text is always horizontal layout but should not be effected by
    // transform (orient/inverse). So label is built separately but not
    // use zrender/graphic/helper/RectText, and is located based on view
    // group (according to handleLabelPoint) but not barGroup.

    var textStyleModel = this.visualMapModel.textStyleModel;
    var handleLabel = new graphic.Text({
      draggable: true,
      drift: onDrift,
      onmousemove: function (e) {
        // Fot mobile devicem, prevent screen slider on the button.
        eventTool.stop(e.event);
      },
      ondragend: onDragEnd,
      style: {
        x: 0,
        y: 0,
        text: '',
        textFont: textStyleModel.getFont(),
        textFill: textStyleModel.getTextColor()
      }
    });
    this.group.add(handleLabel);
    var handleLabelPoint = [orient === 'horizontal' ? textSize / 2 : textSize * 1.5, orient === 'horizontal' ? handleIndex === 0 ? -(textSize * 1.5) : textSize * 1.5 : handleIndex === 0 ? -textSize / 2 : textSize / 2];
    var shapes = this._shapes;
    shapes.handleThumbs[handleIndex] = handleThumb;
    shapes.handleLabelPoints[handleIndex] = handleLabelPoint;
    shapes.handleLabels[handleIndex] = handleLabel;
  },

  /**
   * @private
   */
  _createIndicator: function (barGroup, itemSize, textSize, orient) {
    var indicator = createPolygon([[0, 0]], 'move');
    indicator.position[0] = itemSize[0];
    indicator.attr({
      invisible: true,
      silent: true
    });
    barGroup.add(indicator);
    var textStyleModel = this.visualMapModel.textStyleModel;
    var indicatorLabel = new graphic.Text({
      silent: true,
      invisible: true,
      style: {
        x: 0,
        y: 0,
        text: '',
        textFont: textStyleModel.getFont(),
        textFill: textStyleModel.getTextColor()
      }
    });
    this.group.add(indicatorLabel);
    var indicatorLabelPoint = [orient === 'horizontal' ? textSize / 2 : HOVER_LINK_OUT + 3, 0];
    var shapes = this._shapes;
    shapes.indicator = indicator;
    shapes.indicatorLabel = indicatorLabel;
    shapes.indicatorLabelPoint = indicatorLabelPoint;
  },

  /**
   * @private
   */
  _dragHandle: function (handleIndex, isEnd, dx, dy) {
    if (!this._useHandle) {
      return;
    }

    this._dragging = !isEnd;

    if (!isEnd) {
      // Transform dx, dy to bar coordination.
      var vertex = this._applyTransform([dx, dy], this._shapes.barGroup, true);

      this._updateInterval(handleIndex, vertex[1]); // Considering realtime, update view should be executed
      // before dispatch action.


      this._updateView();
    } // dragEnd do not dispatch action when realtime.


    if (isEnd === !this.visualMapModel.get('realtime')) {
      // jshint ignore:line
      this.api.dispatchAction({
        type: 'selectDataRange',
        from: this.uid,
        visualMapId: this.visualMapModel.id,
        selected: this._dataInterval.slice()
      });
    }

    if (isEnd) {
      !this._hovering && this._clearHoverLinkToSeries();
    } else if (useHoverLinkOnHandle(this.visualMapModel)) {
      this._doHoverLinkToSeries(this._handleEnds[handleIndex], false);
    }
  },

  /**
   * @private
   */
  _resetInterval: function () {
    var visualMapModel = this.visualMapModel;
    var dataInterval = this._dataInterval = visualMapModel.getSelected();
    var dataExtent = visualMapModel.getExtent();
    var sizeExtent = [0, visualMapModel.itemSize[1]];
    this._handleEnds = [linearMap(dataInterval[0], dataExtent, sizeExtent, true), linearMap(dataInterval[1], dataExtent, sizeExtent, true)];
  },

  /**
   * @private
   * @param {(number|string)} handleIndex 0 or 1 or 'all'
   * @param {number} dx
   * @param {number} dy
   */
  _updateInterval: function (handleIndex, delta) {
    delta = delta || 0;
    var visualMapModel = this.visualMapModel;
    var handleEnds = this._handleEnds;
    var sizeExtent = [0, visualMapModel.itemSize[1]];
    sliderMove(delta, handleEnds, sizeExtent, handleIndex, // cross is forbiden
    0);
    var dataExtent = visualMapModel.getExtent(); // Update data interval.

    this._dataInterval = [linearMap(handleEnds[0], sizeExtent, dataExtent, true), linearMap(handleEnds[1], sizeExtent, dataExtent, true)];
  },

  /**
   * @private
   */
  _updateView: function (forSketch) {
    var visualMapModel = this.visualMapModel;
    var dataExtent = visualMapModel.getExtent();
    var shapes = this._shapes;
    var outOfRangeHandleEnds = [0, visualMapModel.itemSize[1]];
    var inRangeHandleEnds = forSketch ? outOfRangeHandleEnds : this._handleEnds;

    var visualInRange = this._createBarVisual(this._dataInterval, dataExtent, inRangeHandleEnds, 'inRange');

    var visualOutOfRange = this._createBarVisual(dataExtent, dataExtent, outOfRangeHandleEnds, 'outOfRange');

    shapes.inRange.setStyle({
      fill: visualInRange.barColor,
      opacity: visualInRange.opacity
    }).setShape('points', visualInRange.barPoints);
    shapes.outOfRange.setStyle({
      fill: visualOutOfRange.barColor,
      opacity: visualOutOfRange.opacity
    }).setShape('points', visualOutOfRange.barPoints);

    this._updateHandle(inRangeHandleEnds, visualInRange);
  },

  /**
   * @private
   */
  _createBarVisual: function (dataInterval, dataExtent, handleEnds, forceState) {
    var opts = {
      forceState: forceState,
      convertOpacityToAlpha: true
    };

    var colorStops = this._makeColorGradient(dataInterval, opts);

    var symbolSizes = [this.getControllerVisual(dataInterval[0], 'symbolSize', opts), this.getControllerVisual(dataInterval[1], 'symbolSize', opts)];

    var barPoints = this._createBarPoints(handleEnds, symbolSizes);

    return {
      barColor: new LinearGradient(0, 0, 0, 1, colorStops),
      barPoints: barPoints,
      handlesColor: [colorStops[0].color, colorStops[colorStops.length - 1].color]
    };
  },

  /**
   * @private
   */
  _makeColorGradient: function (dataInterval, opts) {
    // Considering colorHue, which is not linear, so we have to sample
    // to calculate gradient color stops, but not only caculate head
    // and tail.
    var sampleNumber = 100; // Arbitrary value.

    var colorStops = [];
    var step = (dataInterval[1] - dataInterval[0]) / sampleNumber;
    colorStops.push({
      color: this.getControllerVisual(dataInterval[0], 'color', opts),
      offset: 0
    });

    for (var i = 1; i < sampleNumber; i++) {
      var currValue = dataInterval[0] + step * i;

      if (currValue > dataInterval[1]) {
        break;
      }

      colorStops.push({
        color: this.getControllerVisual(currValue, 'color', opts),
        offset: i / sampleNumber
      });
    }

    colorStops.push({
      color: this.getControllerVisual(dataInterval[1], 'color', opts),
      offset: 1
    });
    return colorStops;
  },

  /**
   * @private
   */
  _createBarPoints: function (handleEnds, symbolSizes) {
    var itemSize = this.visualMapModel.itemSize;
    return [[itemSize[0] - symbolSizes[0], handleEnds[0]], [itemSize[0], handleEnds[0]], [itemSize[0], handleEnds[1]], [itemSize[0] - symbolSizes[1], handleEnds[1]]];
  },

  /**
   * @private
   */
  _createBarGroup: function (itemAlign) {
    var orient = this._orient;
    var inverse = this.visualMapModel.get('inverse');
    return new graphic.Group(orient === 'horizontal' && !inverse ? {
      scale: itemAlign === 'bottom' ? [1, 1] : [-1, 1],
      rotation: Math.PI / 2
    } : orient === 'horizontal' && inverse ? {
      scale: itemAlign === 'bottom' ? [-1, 1] : [1, 1],
      rotation: -Math.PI / 2
    } : orient === 'vertical' && !inverse ? {
      scale: itemAlign === 'left' ? [1, -1] : [-1, -1]
    } : {
      scale: itemAlign === 'left' ? [1, 1] : [-1, 1]
    });
  },

  /**
   * @private
   */
  _updateHandle: function (handleEnds, visualInRange) {
    if (!this._useHandle) {
      return;
    }

    var shapes = this._shapes;
    var visualMapModel = this.visualMapModel;
    var handleThumbs = shapes.handleThumbs;
    var handleLabels = shapes.handleLabels;
    each([0, 1], function (handleIndex) {
      var handleThumb = handleThumbs[handleIndex];
      handleThumb.setStyle('fill', visualInRange.handlesColor[handleIndex]);
      handleThumb.position[1] = handleEnds[handleIndex]; // Update handle label position.

      var textPoint = graphic.applyTransform(shapes.handleLabelPoints[handleIndex], graphic.getTransform(handleThumb, this.group));
      handleLabels[handleIndex].setStyle({
        x: textPoint[0],
        y: textPoint[1],
        text: visualMapModel.formatValueText(this._dataInterval[handleIndex]),
        textVerticalAlign: 'middle',
        textAlign: this._applyTransform(this._orient === 'horizontal' ? handleIndex === 0 ? 'bottom' : 'top' : 'left', shapes.barGroup)
      });
    }, this);
  },

  /**
   * @private
   * @param {number} cursorValue
   * @param {number} textValue
   * @param {string} [rangeSymbol]
   * @param {number} [halfHoverLinkSize]
   */
  _showIndicator: function (cursorValue, textValue, rangeSymbol, halfHoverLinkSize) {
    var visualMapModel = this.visualMapModel;
    var dataExtent = visualMapModel.getExtent();
    var itemSize = visualMapModel.itemSize;
    var sizeExtent = [0, itemSize[1]];
    var pos = linearMap(cursorValue, dataExtent, sizeExtent, true);
    var shapes = this._shapes;
    var indicator = shapes.indicator;

    if (!indicator) {
      return;
    }

    indicator.position[1] = pos;
    indicator.attr('invisible', false);
    indicator.setShape('points', createIndicatorPoints(!!rangeSymbol, halfHoverLinkSize, pos, itemSize[1]));
    var opts = {
      convertOpacityToAlpha: true
    };
    var color = this.getControllerVisual(cursorValue, 'color', opts);
    indicator.setStyle('fill', color); // Update handle label position.

    var textPoint = graphic.applyTransform(shapes.indicatorLabelPoint, graphic.getTransform(indicator, this.group));
    var indicatorLabel = shapes.indicatorLabel;
    indicatorLabel.attr('invisible', false);

    var align = this._applyTransform('left', shapes.barGroup);

    var orient = this._orient;
    indicatorLabel.setStyle({
      text: (rangeSymbol ? rangeSymbol : '') + visualMapModel.formatValueText(textValue),
      textVerticalAlign: orient === 'horizontal' ? align : 'middle',
      textAlign: orient === 'horizontal' ? 'center' : align,
      x: textPoint[0],
      y: textPoint[1]
    });
  },

  /**
   * @private
   */
  _enableHoverLinkToSeries: function () {
    var self = this;

    this._shapes.barGroup.on('mousemove', function (e) {
      self._hovering = true;

      if (!self._dragging) {
        var itemSize = self.visualMapModel.itemSize;

        var pos = self._applyTransform([e.offsetX, e.offsetY], self._shapes.barGroup, true, true); // For hover link show when hover handle, which might be
        // below or upper than sizeExtent.


        pos[1] = mathMin(mathMax(0, pos[1]), itemSize[1]);

        self._doHoverLinkToSeries(pos[1], 0 <= pos[0] && pos[0] <= itemSize[0]);
      }
    }).on('mouseout', function () {
      // When mouse is out of handle, hoverLink still need
      // to be displayed when realtime is set as false.
      self._hovering = false;
      !self._dragging && self._clearHoverLinkToSeries();
    });
  },

  /**
   * @private
   */
  _enableHoverLinkFromSeries: function () {
    var zr = this.api.getZr();

    if (this.visualMapModel.option.hoverLink) {
      zr.on('mouseover', this._hoverLinkFromSeriesMouseOver, this);
      zr.on('mouseout', this._hideIndicator, this);
    } else {
      this._clearHoverLinkFromSeries();
    }
  },

  /**
   * @private
   */
  _doHoverLinkToSeries: function (cursorPos, hoverOnBar) {
    var visualMapModel = this.visualMapModel;
    var itemSize = visualMapModel.itemSize;

    if (!visualMapModel.option.hoverLink) {
      return;
    }

    var sizeExtent = [0, itemSize[1]];
    var dataExtent = visualMapModel.getExtent(); // For hover link show when hover handle, which might be below or upper than sizeExtent.

    cursorPos = mathMin(mathMax(sizeExtent[0], cursorPos), sizeExtent[1]);
    var halfHoverLinkSize = getHalfHoverLinkSize(visualMapModel, dataExtent, sizeExtent);
    var hoverRange = [cursorPos - halfHoverLinkSize, cursorPos + halfHoverLinkSize];
    var cursorValue = linearMap(cursorPos, sizeExtent, dataExtent, true);
    var valueRange = [linearMap(hoverRange[0], sizeExtent, dataExtent, true), linearMap(hoverRange[1], sizeExtent, dataExtent, true)]; // Consider data range is out of visualMap range, see test/visualMap-continuous.html,
    // where china and india has very large population.

    hoverRange[0] < sizeExtent[0] && (valueRange[0] = -Infinity);
    hoverRange[1] > sizeExtent[1] && (valueRange[1] = Infinity); // Do not show indicator when mouse is over handle,
    // otherwise labels overlap, especially when dragging.

    if (hoverOnBar) {
      if (valueRange[0] === -Infinity) {
        this._showIndicator(cursorValue, valueRange[1], '< ', halfHoverLinkSize);
      } else if (valueRange[1] === Infinity) {
        this._showIndicator(cursorValue, valueRange[0], '> ', halfHoverLinkSize);
      } else {
        this._showIndicator(cursorValue, cursorValue, '≈ ', halfHoverLinkSize);
      }
    } // When realtime is set as false, handles, which are in barGroup,
    // also trigger hoverLink, which help user to realize where they
    // focus on when dragging. (see test/heatmap-large.html)
    // When realtime is set as true, highlight will not show when hover
    // handle, because the label on handle, which displays a exact value
    // but not range, might mislead users.


    var oldBatch = this._hoverLinkDataIndices;
    var newBatch = [];

    if (hoverOnBar || useHoverLinkOnHandle(visualMapModel)) {
      newBatch = this._hoverLinkDataIndices = visualMapModel.findTargetDataIndices(valueRange);
    }

    var resultBatches = modelUtil.compressBatches(oldBatch, newBatch);

    this._dispatchHighDown('downplay', helper.makeHighDownBatch(resultBatches[0], visualMapModel));

    this._dispatchHighDown('highlight', helper.makeHighDownBatch(resultBatches[1], visualMapModel));
  },

  /**
   * @private
   */
  _hoverLinkFromSeriesMouseOver: function (e) {
    var el = e.target;
    var visualMapModel = this.visualMapModel;

    if (!el || el.dataIndex == null) {
      return;
    }

    var dataModel = this.ecModel.getSeriesByIndex(el.seriesIndex);

    if (!visualMapModel.isTargetSeries(dataModel)) {
      return;
    }

    var data = dataModel.getData(el.dataType);
    var value = data.get(visualMapModel.getDataDimension(data), el.dataIndex, true);

    if (!isNaN(value)) {
      this._showIndicator(value, value);
    }
  },

  /**
   * @private
   */
  _hideIndicator: function () {
    var shapes = this._shapes;
    shapes.indicator && shapes.indicator.attr('invisible', true);
    shapes.indicatorLabel && shapes.indicatorLabel.attr('invisible', true);
  },

  /**
   * @private
   */
  _clearHoverLinkToSeries: function () {
    this._hideIndicator();

    var indices = this._hoverLinkDataIndices;

    this._dispatchHighDown('downplay', helper.makeHighDownBatch(indices, this.visualMapModel));

    indices.length = 0;
  },

  /**
   * @private
   */
  _clearHoverLinkFromSeries: function () {
    this._hideIndicator();

    var zr = this.api.getZr();
    zr.off('mouseover', this._hoverLinkFromSeriesMouseOver);
    zr.off('mouseout', this._hideIndicator);
  },

  /**
   * @private
   */
  _applyTransform: function (vertex, element, inverse, global) {
    var transform = graphic.getTransform(element, global ? null : this.group);
    return graphic[zrUtil.isArray(vertex) ? 'applyTransform' : 'transformDirection'](vertex, transform, inverse);
  },

  /**
   * @private
   */
  _dispatchHighDown: function (type, batch) {
    batch && batch.length && this.api.dispatchAction({
      type: type,
      batch: batch
    });
  },

  /**
   * @override
   */
  dispose: function () {
    this._clearHoverLinkFromSeries();

    this._clearHoverLinkToSeries();
  },

  /**
   * @override
   */
  remove: function () {
    this._clearHoverLinkFromSeries();

    this._clearHoverLinkToSeries();
  }
});

function createPolygon(points, cursor, onDrift, onDragEnd) {
  return new graphic.Polygon({
    shape: {
      points: points
    },
    draggable: !!onDrift,
    cursor: cursor,
    drift: onDrift,
    onmousemove: function (e) {
      // Fot mobile devicem, prevent screen slider on the button.
      eventTool.stop(e.event);
    },
    ondragend: onDragEnd
  });
}

function createHandlePoints(handleIndex, textSize) {
  return handleIndex === 0 ? [[0, 0], [textSize, 0], [textSize, -textSize]] : [[0, 0], [textSize, 0], [textSize, textSize]];
}

function createIndicatorPoints(isRange, halfHoverLinkSize, pos, extentMax) {
  return isRange ? [// indicate range
  [0, -mathMin(halfHoverLinkSize, mathMax(pos, 0))], [HOVER_LINK_OUT, 0], [0, mathMin(halfHoverLinkSize, mathMax(extentMax - pos, 0))]] : [// indicate single value
  [0, 0], [5, -5], [5, 5]];
}

function getHalfHoverLinkSize(visualMapModel, dataExtent, sizeExtent) {
  var halfHoverLinkSize = HOVER_LINK_SIZE / 2;
  var hoverLinkDataSize = visualMapModel.get('hoverLinkDataSize');

  if (hoverLinkDataSize) {
    halfHoverLinkSize = linearMap(hoverLinkDataSize, dataExtent, sizeExtent, true) / 2;
  }

  return halfHoverLinkSize;
}

function useHoverLinkOnHandle(visualMapModel) {
  var hoverLinkOnHandle = visualMapModel.get('hoverLinkOnHandle');
  return !!(hoverLinkOnHandle == null ? visualMapModel.get('realtime') : hoverLinkOnHandle);
}

function getCursor(orient) {
  return orient === 'vertical' ? 'ns-resize' : 'ew-resize';
}

var _default = ContinuousView;
module.exports = _default;

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

/***/ "43b8":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

/***/ "4a01":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var Eventful = __webpack_require__("1fab");

var eventTool = __webpack_require__("607d");

var interactionMutex = __webpack_require__("a4fe");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @alias module:echarts/component/helper/RoamController
 * @constructor
 * @mixin {module:zrender/mixin/Eventful}
 *
 * @param {module:zrender/zrender~ZRender} zr
 */
function RoamController(zr) {
  /**
   * @type {Function}
   */
  this.pointerChecker;
  /**
   * @type {module:zrender}
   */

  this._zr = zr;
  /**
   * @type {Object}
   */

  this._opt = {}; // Avoid two roamController bind the same handler

  var bind = zrUtil.bind;
  var mousedownHandler = bind(mousedown, this);
  var mousemoveHandler = bind(mousemove, this);
  var mouseupHandler = bind(mouseup, this);
  var mousewheelHandler = bind(mousewheel, this);
  var pinchHandler = bind(pinch, this);
  Eventful.call(this);
  /**
   * @param {Function} pointerChecker
   *                   input: x, y
   *                   output: boolean
   */

  this.setPointerChecker = function (pointerChecker) {
    this.pointerChecker = pointerChecker;
  };
  /**
   * Notice: only enable needed types. For example, if 'zoom'
   * is not needed, 'zoom' should not be enabled, otherwise
   * default mousewheel behaviour (scroll page) will be disabled.
   *
   * @param  {boolean|string} [controlType=true] Specify the control type,
   *                          which can be null/undefined or true/false
   *                          or 'pan/move' or 'zoom'/'scale'
   * @param {Object} [opt]
   * @param {Object} [opt.zoomOnMouseWheel=true] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.moveOnMouseMove=true] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.moveOnMouseWheel=false] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.preventDefaultMouseMove=true] When pan.
   */


  this.enable = function (controlType, opt) {
    // Disable previous first
    this.disable();
    this._opt = zrUtil.defaults(zrUtil.clone(opt) || {}, {
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      // By default, wheel do not trigger move.
      moveOnMouseWheel: false,
      preventDefaultMouseMove: true
    });

    if (controlType == null) {
      controlType = true;
    }

    if (controlType === true || controlType === 'move' || controlType === 'pan') {
      zr.on('mousedown', mousedownHandler);
      zr.on('mousemove', mousemoveHandler);
      zr.on('mouseup', mouseupHandler);
    }

    if (controlType === true || controlType === 'scale' || controlType === 'zoom') {
      zr.on('mousewheel', mousewheelHandler);
      zr.on('pinch', pinchHandler);
    }
  };

  this.disable = function () {
    zr.off('mousedown', mousedownHandler);
    zr.off('mousemove', mousemoveHandler);
    zr.off('mouseup', mouseupHandler);
    zr.off('mousewheel', mousewheelHandler);
    zr.off('pinch', pinchHandler);
  };

  this.dispose = this.disable;

  this.isDragging = function () {
    return this._dragging;
  };

  this.isPinching = function () {
    return this._pinching;
  };
}

zrUtil.mixin(RoamController, Eventful);

function mousedown(e) {
  if (eventTool.isMiddleOrRightButtonOnMouseUpDown(e) || e.target && e.target.draggable) {
    return;
  }

  var x = e.offsetX;
  var y = e.offsetY; // Only check on mosedown, but not mousemove.
  // Mouse can be out of target when mouse moving.

  if (this.pointerChecker && this.pointerChecker(e, x, y)) {
    this._x = x;
    this._y = y;
    this._dragging = true;
  }
}

function mousemove(e) {
  if (!this._dragging || !isAvailableBehavior('moveOnMouseMove', e, this._opt) || e.gestureEvent === 'pinch' || interactionMutex.isTaken(this._zr, 'globalPan')) {
    return;
  }

  var x = e.offsetX;
  var y = e.offsetY;
  var oldX = this._x;
  var oldY = this._y;
  var dx = x - oldX;
  var dy = y - oldY;
  this._x = x;
  this._y = y;
  this._opt.preventDefaultMouseMove && eventTool.stop(e.event);
  trigger(this, 'pan', 'moveOnMouseMove', e, {
    dx: dx,
    dy: dy,
    oldX: oldX,
    oldY: oldY,
    newX: x,
    newY: y
  });
}

function mouseup(e) {
  if (!eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
    this._dragging = false;
  }
}

function mousewheel(e) {
  var shouldZoom = isAvailableBehavior('zoomOnMouseWheel', e, this._opt);
  var shouldMove = isAvailableBehavior('moveOnMouseWheel', e, this._opt);
  var wheelDelta = e.wheelDelta;
  var absWheelDeltaDelta = Math.abs(wheelDelta);
  var originX = e.offsetX;
  var originY = e.offsetY; // wheelDelta maybe -0 in chrome mac.

  if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
    return;
  } // If both `shouldZoom` and `shouldMove` is true, trigger
  // their event both, and the final behavior is determined
  // by event listener themselves.


  if (shouldZoom) {
    // Convenience:
    // Mac and VM Windows on Mac: scroll up: zoom out.
    // Windows: scroll up: zoom in.
    // FIXME: Should do more test in different environment.
    // wheelDelta is too complicated in difference nvironment
    // (https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel),
    // although it has been normallized by zrender.
    // wheelDelta of mouse wheel is bigger than touch pad.
    var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
    var scale = wheelDelta > 0 ? factor : 1 / factor;
    checkPointerAndTrigger(this, 'zoom', 'zoomOnMouseWheel', e, {
      scale: scale,
      originX: originX,
      originY: originY
    });
  }

  if (shouldMove) {
    // FIXME: Should do more test in different environment.
    var absDelta = Math.abs(wheelDelta); // wheelDelta of mouse wheel is bigger than touch pad.

    var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
    checkPointerAndTrigger(this, 'scrollMove', 'moveOnMouseWheel', e, {
      scrollDelta: scrollDelta,
      originX: originX,
      originY: originY
    });
  }
}

function pinch(e) {
  if (interactionMutex.isTaken(this._zr, 'globalPan')) {
    return;
  }

  var scale = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
  checkPointerAndTrigger(this, 'zoom', null, e, {
    scale: scale,
    originX: e.pinchX,
    originY: e.pinchY
  });
}

function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)) {
    // When mouse is out of roamController rect,
    // default befavoius should not be be disabled, otherwise
    // page sliding is disabled, contrary to expectation.
    eventTool.stop(e.event);
    trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
  }
}

function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  // Also provide behavior checker for event listener, for some case that
  // multiple components share one listener.
  contollerEvent.isAvailableBehavior = zrUtil.bind(isAvailableBehavior, null, behaviorToCheck, e);
  controller.trigger(eventName, contollerEvent);
} // settings: {
//     zoomOnMouseWheel
//     moveOnMouseMove
//     moveOnMouseWheel
// }
// The value can be: true / false / 'shift' / 'ctrl' / 'alt'.


function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!zrUtil.isString(setting) || e.event[setting + 'Key']);
}

var _default = RoamController;
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

/***/ "5450":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

__webpack_require__("7419");

__webpack_require__("29a9");

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

/***/ "7023":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

/**
 * Data selectable mixin for chart series.
 * To eanble data select, option of series must have `selectedMode`.
 * And each data item will use `selected` to toggle itself selected status
 */
var _default = {
  /**
   * @param {Array.<Object>} targetList [{name, value, selected}, ...]
   *        If targetList is an array, it should like [{name: ..., value: ...}, ...].
   *        If targetList is a "List", it must have coordDim: 'value' dimension and name.
   */
  updateSelectedMap: function (targetList) {
    this._targetList = zrUtil.isArray(targetList) ? targetList.slice() : [];
    this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
      targetMap.set(target.name, target);
      return targetMap;
    }, zrUtil.createHashMap());
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  // PENGING If selectedMode is null ?
  select: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    var selectedMode = this.get('selectedMode');

    if (selectedMode === 'single') {
      this._selectTargetMap.each(function (target) {
        target.selected = false;
      });
    }

    target && (target.selected = true);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  unSelect: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name); // var selectedMode = this.get('selectedMode');
    // selectedMode !== 'single' && target && (target.selected = false);

    target && (target.selected = false);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  toggleSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);

    if (target != null) {
      this[target.selected ? 'unSelect' : 'select'](name, id);
      return target.selected;
    }
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  isSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    return target && target.selected;
  }
};
module.exports = _default;

/***/ }),

/***/ "72b6":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var layout = __webpack_require__("f934");

var VisualMapping = __webpack_require__("5f14");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'visualMap',

  /**
   * @readOnly
   * @type {Object}
   */
  autoPositionValues: {
    left: 1,
    right: 1,
    top: 1,
    bottom: 1
  },
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
     * @type {module:echarts/component/visualMap/visualMapModel}
     */

    this.visualMapModel;
  },

  /**
   * @protected
   */
  render: function (visualMapModel, ecModel, api, payload) {
    this.visualMapModel = visualMapModel;

    if (visualMapModel.get('show') === false) {
      this.group.removeAll();
      return;
    }

    this.doRender.apply(this, arguments);
  },

  /**
   * @protected
   */
  renderBackground: function (group) {
    var visualMapModel = this.visualMapModel;
    var padding = formatUtil.normalizeCssArray(visualMapModel.get('padding') || 0);
    var rect = group.getBoundingRect();
    group.add(new graphic.Rect({
      z2: -1,
      // Lay background rect on the lowest layer.
      silent: true,
      shape: {
        x: rect.x - padding[3],
        y: rect.y - padding[0],
        width: rect.width + padding[3] + padding[1],
        height: rect.height + padding[0] + padding[2]
      },
      style: {
        fill: visualMapModel.get('backgroundColor'),
        stroke: visualMapModel.get('borderColor'),
        lineWidth: visualMapModel.get('borderWidth')
      }
    }));
  },

  /**
   * @protected
   * @param {number} targetValue can be Infinity or -Infinity
   * @param {string=} visualCluster Only can be 'color' 'opacity' 'symbol' 'symbolSize'
   * @param {Object} [opts]
   * @param {string=} [opts.forceState] Specify state, instead of using getValueState method.
   * @param {string=} [opts.convertOpacityToAlpha=false] For color gradient in controller widget.
   * @return {*} Visual value.
   */
  getControllerVisual: function (targetValue, visualCluster, opts) {
    opts = opts || {};
    var forceState = opts.forceState;
    var visualMapModel = this.visualMapModel;
    var visualObj = {}; // Default values.

    if (visualCluster === 'symbol') {
      visualObj.symbol = visualMapModel.get('itemSymbol');
    }

    if (visualCluster === 'color') {
      var defaultColor = visualMapModel.get('contentColor');
      visualObj.color = defaultColor;
    }

    function getter(key) {
      return visualObj[key];
    }

    function setter(key, value) {
      visualObj[key] = value;
    }

    var mappings = visualMapModel.controllerVisuals[forceState || visualMapModel.getValueState(targetValue)];
    var visualTypes = VisualMapping.prepareVisualTypes(mappings);
    zrUtil.each(visualTypes, function (type) {
      var visualMapping = mappings[type];

      if (opts.convertOpacityToAlpha && type === 'opacity') {
        type = 'colorAlpha';
        visualMapping = mappings.__alphaForOpacity;
      }

      if (VisualMapping.dependsOn(type, visualCluster)) {
        visualMapping && visualMapping.applyVisual(targetValue, getter, setter);
      }
    });
    return visualObj[visualCluster];
  },

  /**
   * @protected
   */
  positionGroup: function (group) {
    var model = this.visualMapModel;
    var api = this.api;
    layout.positionElement(group, model.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });
  },

  /**
   * @protected
   * @abstract
   */
  doRender: zrUtil.noop
});

module.exports = _default;

/***/ }),

/***/ "7419":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var preprocessor = __webpack_require__("b336");

__webpack_require__("bc5f");

__webpack_require__("ab05");

__webpack_require__("307a");

__webpack_require__("3cd6");

__webpack_require__("d6ef");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

/***/ "7919":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;
var layoutBox = _layout.box;
var positionElement = _layout.positionElement;

var formatUtil = __webpack_require__("eda2");

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

/**
 * Layout list like component.
 * It will box layout each items in group of component and then position the whole group in the viewport
 * @param {module:zrender/group/Group} group
 * @param {module:echarts/model/Component} componentModel
 * @param {module:echarts/ExtensionAPI}
 */
function layout(group, componentModel, api) {
  var boxLayoutParams = componentModel.getBoxLayoutParams();
  var padding = componentModel.get('padding');
  var viewportSize = {
    width: api.getWidth(),
    height: api.getHeight()
  };
  var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
  layoutBox(componentModel.get('orient'), group, componentModel.get('itemGap'), rect.width, rect.height);
  positionElement(group, boxLayoutParams, viewportSize, padding);
}

function makeBackground(rect, componentModel) {
  var padding = formatUtil.normalizeCssArray(componentModel.get('padding'));
  var style = componentModel.getItemStyle(['color', 'opacity']);
  style.fill = componentModel.get('backgroundColor');
  var rect = new graphic.Rect({
    shape: {
      x: rect.x - padding[3],
      y: rect.y - padding[0],
      width: rect.width + padding[1] + padding[3],
      height: rect.height + padding[0] + padding[2],
      r: componentModel.get('borderRadius')
    },
    style: style,
    silent: true,
    z2: -1
  }); // FIXME
  // `subPixelOptimizeRect` may bring some gap between edge of viewpart
  // and background rect when setting like `left: 0`, `top: 0`.
  // graphic.subPixelOptimizeRect(rect);

  return rect;
}

exports.layout = layout;
exports.makeBackground = makeBackground;

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

__webpack_require__("43b8");

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

/***/ "a4fe":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var ATTR = '\0_ec_interaction_mutex';

function take(zr, resourceKey, userKey) {
  var store = getStore(zr);
  store[resourceKey] = userKey;
}

function release(zr, resourceKey, userKey) {
  var store = getStore(zr);
  var uKey = store[resourceKey];

  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}

function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}

function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
/**
 * payload: {
 *     type: 'takeGlobalCursor',
 *     key: 'dataZoomSelect', or 'brush', or ...,
 *         If no userKey, release global cursor.
 * }
 */


echarts.registerAction({
  type: 'takeGlobalCursor',
  event: 'globalCursorTaken',
  update: 'update'
}, function () {});
exports.take = take;
exports.release = release;
exports.isTaken = isTaken;

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

/***/ "ab05":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var visualSolution = __webpack_require__("2b8c");

var VisualMapping = __webpack_require__("5f14");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var VISUAL_PRIORITY = echarts.PRIORITY.VISUAL.COMPONENT;
echarts.registerVisual(VISUAL_PRIORITY, {
  createOnAllSeries: true,
  reset: function (seriesModel, ecModel) {
    var resetDefines = [];
    ecModel.eachComponent('visualMap', function (visualMapModel) {
      var pipelineContext = seriesModel.pipelineContext;

      if (!visualMapModel.isTargetSeries(seriesModel) || pipelineContext && pipelineContext.large) {
        return;
      }

      resetDefines.push(visualSolution.incrementalApplyVisual(visualMapModel.stateList, visualMapModel.targetVisuals, zrUtil.bind(visualMapModel.getValueState, visualMapModel), visualMapModel.getDataDimension(seriesModel.getData())));
    });
    return resetDefines;
  }
}); // Only support color.

echarts.registerVisual(VISUAL_PRIORITY, {
  createOnAllSeries: true,
  reset: function (seriesModel, ecModel) {
    var data = seriesModel.getData();
    var visualMetaList = [];
    ecModel.eachComponent('visualMap', function (visualMapModel) {
      if (visualMapModel.isTargetSeries(seriesModel)) {
        var visualMeta = visualMapModel.getVisualMeta(zrUtil.bind(getColorVisual, null, seriesModel, visualMapModel)) || {
          stops: [],
          outerColors: []
        };
        var concreteDim = visualMapModel.getDataDimension(data);
        var dimInfo = data.getDimensionInfo(concreteDim);

        if (dimInfo != null) {
          // visualMeta.dimension should be dimension index, but not concrete dimension.
          visualMeta.dimension = dimInfo.index;
          visualMetaList.push(visualMeta);
        }
      }
    }); // console.log(JSON.stringify(visualMetaList.map(a => a.stops)));

    seriesModel.getData().setVisual('visualMeta', visualMetaList);
  }
}); // FIXME
// performance and export for heatmap?
// value can be Infinity or -Infinity

function getColorVisual(seriesModel, visualMapModel, value, valueState) {
  var mappings = visualMapModel.targetVisuals[valueState];
  var visualTypes = VisualMapping.prepareVisualTypes(mappings);
  var resultVisual = {
    color: seriesModel.getData().getVisual('color') // default color.

  };

  for (var i = 0, len = visualTypes.length; i < len; i++) {
    var type = visualTypes[i];
    var mapping = mappings[type === 'opacity' ? '__alphaForOpacity' : type];
    mapping && mapping.applyVisual(value, getVisual, setVisual);
  }

  return resultVisual.color;

  function getVisual(key) {
    return resultVisual[key];
  }

  function setVisual(key, value) {
    resultVisual[key] = value;
  }
}

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

/***/ "b336":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

function _default(option) {
  var visualMap = option && option.visualMap;

  if (!zrUtil.isArray(visualMap)) {
    visualMap = visualMap ? [visualMap] : [];
  }

  each(visualMap, function (opt) {
    if (!opt) {
      return;
    } // rename splitList to pieces


    if (has(opt, 'splitList') && !has(opt, 'pieces')) {
      opt.pieces = opt.splitList;
      delete opt.splitList;
    }

    var pieces = opt.pieces;

    if (pieces && zrUtil.isArray(pieces)) {
      each(pieces, function (piece) {
        if (zrUtil.isObject(piece)) {
          if (has(piece, 'start') && !has(piece, 'min')) {
            piece.min = piece.start;
          }

          if (has(piece, 'end') && !has(piece, 'max')) {
            piece.max = piece.end;
          }
        }
      });
    }
  });
}

function has(obj, name) {
  return obj && obj.hasOwnProperty && obj.hasOwnProperty(name);
}

module.exports = _default;

/***/ }),

/***/ "bc5f":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
Component.registerSubTypeDefaulter('visualMap', function (option) {
  // Compatible with ec2, when splitNumber === 0, continuous visualMap will be used.
  return !option.categories && (!(option.pieces ? option.pieces.length > 0 : option.splitNumber > 0) || option.calculable) ? 'continuous' : 'piecewise';
});

/***/ }),

/***/ "bd9e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var graphic = __webpack_require__("2306");

var modelUtil = __webpack_require__("e0d3");

var brushHelper = __webpack_require__("f4a2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var indexOf = zrUtil.indexOf;
var curry = zrUtil.curry;
var COORD_CONVERTS = ['dataToPoint', 'pointToData']; // FIXME
// how to genarialize to more coordinate systems.

var INCLUDE_FINDER_MAIN_TYPES = ['grid', 'xAxis', 'yAxis', 'geo', 'graph', 'polar', 'radiusAxis', 'angleAxis', 'bmap'];
/**
 * [option in constructor]:
 * {
 *     Index/Id/Name of geo, xAxis, yAxis, grid: See util/model#parseFinder.
 * }
 *
 *
 * [targetInfo]:
 *
 * There can be multiple axes in a single targetInfo. Consider the case
 * of `grid` component, a targetInfo represents a grid which contains one or more
 * cartesian and one or more axes. And consider the case of parallel system,
 * which has multiple axes in a coordinate system.
 * Can be {
 *     panelId: ...,
 *     coordSys: <a representitive cartesian in grid (first cartesian by default)>,
 *     coordSyses: all cartesians.
 *     gridModel: <grid component>
 *     xAxes: correspond to coordSyses on index
 *     yAxes: correspond to coordSyses on index
 * }
 * or {
 *     panelId: ...,
 *     coordSys: <geo coord sys>
 *     coordSyses: [<geo coord sys>]
 *     geoModel: <geo component>
 * }
 *
 *
 * [panelOpt]:
 *
 * Make from targetInfo. Input to BrushController.
 * {
 *     panelId: ...,
 *     rect: ...
 * }
 *
 *
 * [area]:
 *
 * Generated by BrushController or user input.
 * {
 *     panelId: Used to locate coordInfo directly. If user inpput, no panelId.
 *     brushType: determine how to convert to/from coord('rect' or 'polygon' or 'lineX/Y').
 *     Index/Id/Name of geo, xAxis, yAxis, grid: See util/model#parseFinder.
 *     range: pixel range.
 *     coordRange: representitive coord range (the first one of coordRanges).
 *     coordRanges: <Array> coord ranges, used in multiple cartesian in one grid.
 * }
 */

/**
 * @param {Object} option contains Index/Id/Name of xAxis/yAxis/geo/grid
 *        Each can be {number|Array.<number>}. like: {xAxisIndex: [3, 4]}
 * @param {module:echarts/model/Global} ecModel
 * @param {Object} [opt]
 * @param {Array.<string>} [opt.include] include coordinate system types.
 */

function BrushTargetManager(option, ecModel, opt) {
  /**
   * @private
   * @type {Array.<Object>}
   */
  var targetInfoList = this._targetInfoList = [];
  var info = {};
  var foundCpts = parseFinder(ecModel, option);
  each(targetInfoBuilders, function (builder, type) {
    if (!opt || !opt.include || indexOf(opt.include, type) >= 0) {
      builder(foundCpts, targetInfoList, info);
    }
  });
}

var proto = BrushTargetManager.prototype;

proto.setOutputRanges = function (areas, ecModel) {
  this.matchOutputRanges(areas, ecModel, function (area, coordRange, coordSys) {
    (area.coordRanges || (area.coordRanges = [])).push(coordRange); // area.coordRange is the first of area.coordRanges

    if (!area.coordRange) {
      area.coordRange = coordRange; // In 'category' axis, coord to pixel is not reversible, so we can not
      // rebuild range by coordRange accrately, which may bring trouble when
      // brushing only one item. So we use __rangeOffset to rebuilding range
      // by coordRange. And this it only used in brush component so it is no
      // need to be adapted to coordRanges.

      var result = coordConvert[area.brushType](0, coordSys, coordRange);
      area.__rangeOffset = {
        offset: diffProcessor[area.brushType](result.values, area.range, [1, 1]),
        xyMinMax: result.xyMinMax
      };
    }
  });
};

proto.matchOutputRanges = function (areas, ecModel, cb) {
  each(areas, function (area) {
    var targetInfo = this.findTargetInfo(area, ecModel);

    if (targetInfo && targetInfo !== true) {
      zrUtil.each(targetInfo.coordSyses, function (coordSys) {
        var result = coordConvert[area.brushType](1, coordSys, area.range);
        cb(area, result.values, coordSys, ecModel);
      });
    }
  }, this);
};

proto.setInputRanges = function (areas, ecModel) {
  each(areas, function (area) {
    var targetInfo = this.findTargetInfo(area, ecModel);
    area.range = area.range || []; // convert coordRange to global range and set panelId.

    if (targetInfo && targetInfo !== true) {
      area.panelId = targetInfo.panelId; // (1) area.range shoule always be calculate from coordRange but does
      // not keep its original value, for the sake of the dataZoom scenario,
      // where area.coordRange remains unchanged but area.range may be changed.
      // (2) Only support converting one coordRange to pixel range in brush
      // component. So do not consider `coordRanges`.
      // (3) About __rangeOffset, see comment above.

      var result = coordConvert[area.brushType](0, targetInfo.coordSys, area.coordRange);
      var rangeOffset = area.__rangeOffset;
      area.range = rangeOffset ? diffProcessor[area.brushType](result.values, rangeOffset.offset, getScales(result.xyMinMax, rangeOffset.xyMinMax)) : result.values;
    }
  }, this);
};

proto.makePanelOpts = function (api, getDefaultBrushType) {
  return zrUtil.map(this._targetInfoList, function (targetInfo) {
    var rect = targetInfo.getPanelRect();
    return {
      panelId: targetInfo.panelId,
      defaultBrushType: getDefaultBrushType && getDefaultBrushType(targetInfo),
      clipPath: brushHelper.makeRectPanelClipPath(rect),
      isTargetByCursor: brushHelper.makeRectIsTargetByCursor(rect, api, targetInfo.coordSysModel),
      getLinearBrushOtherExtent: brushHelper.makeLinearBrushOtherExtent(rect)
    };
  });
};

proto.controlSeries = function (area, seriesModel, ecModel) {
  // Check whether area is bound in coord, and series do not belong to that coord.
  // If do not do this check, some brush (like lineX) will controll all axes.
  var targetInfo = this.findTargetInfo(area, ecModel);
  return targetInfo === true || targetInfo && indexOf(targetInfo.coordSyses, seriesModel.coordinateSystem) >= 0;
};
/**
 * If return Object, a coord found.
 * If reutrn true, global found.
 * Otherwise nothing found.
 *
 * @param {Object} area
 * @param {Array} targetInfoList
 * @return {Object|boolean}
 */


proto.findTargetInfo = function (area, ecModel) {
  var targetInfoList = this._targetInfoList;
  var foundCpts = parseFinder(ecModel, area);

  for (var i = 0; i < targetInfoList.length; i++) {
    var targetInfo = targetInfoList[i];
    var areaPanelId = area.panelId;

    if (areaPanelId) {
      if (targetInfo.panelId === areaPanelId) {
        return targetInfo;
      }
    } else {
      for (var i = 0; i < targetInfoMatchers.length; i++) {
        if (targetInfoMatchers[i](foundCpts, targetInfo)) {
          return targetInfo;
        }
      }
    }
  }

  return true;
};

function formatMinMax(minMax) {
  minMax[0] > minMax[1] && minMax.reverse();
  return minMax;
}

function parseFinder(ecModel, option) {
  return modelUtil.parseFinder(ecModel, option, {
    includeMainTypes: INCLUDE_FINDER_MAIN_TYPES
  });
}

var targetInfoBuilders = {
  grid: function (foundCpts, targetInfoList) {
    var xAxisModels = foundCpts.xAxisModels;
    var yAxisModels = foundCpts.yAxisModels;
    var gridModels = foundCpts.gridModels; // Remove duplicated.

    var gridModelMap = zrUtil.createHashMap();
    var xAxesHas = {};
    var yAxesHas = {};

    if (!xAxisModels && !yAxisModels && !gridModels) {
      return;
    }

    each(xAxisModels, function (axisModel) {
      var gridModel = axisModel.axis.grid.model;
      gridModelMap.set(gridModel.id, gridModel);
      xAxesHas[gridModel.id] = true;
    });
    each(yAxisModels, function (axisModel) {
      var gridModel = axisModel.axis.grid.model;
      gridModelMap.set(gridModel.id, gridModel);
      yAxesHas[gridModel.id] = true;
    });
    each(gridModels, function (gridModel) {
      gridModelMap.set(gridModel.id, gridModel);
      xAxesHas[gridModel.id] = true;
      yAxesHas[gridModel.id] = true;
    });
    gridModelMap.each(function (gridModel) {
      var grid = gridModel.coordinateSystem;
      var cartesians = [];
      each(grid.getCartesians(), function (cartesian, index) {
        if (indexOf(xAxisModels, cartesian.getAxis('x').model) >= 0 || indexOf(yAxisModels, cartesian.getAxis('y').model) >= 0) {
          cartesians.push(cartesian);
        }
      });
      targetInfoList.push({
        panelId: 'grid--' + gridModel.id,
        gridModel: gridModel,
        coordSysModel: gridModel,
        // Use the first one as the representitive coordSys.
        coordSys: cartesians[0],
        coordSyses: cartesians,
        getPanelRect: panelRectBuilder.grid,
        xAxisDeclared: xAxesHas[gridModel.id],
        yAxisDeclared: yAxesHas[gridModel.id]
      });
    });
  },
  geo: function (foundCpts, targetInfoList) {
    each(foundCpts.geoModels, function (geoModel) {
      var coordSys = geoModel.coordinateSystem;
      targetInfoList.push({
        panelId: 'geo--' + geoModel.id,
        geoModel: geoModel,
        coordSysModel: geoModel,
        coordSys: coordSys,
        coordSyses: [coordSys],
        getPanelRect: panelRectBuilder.geo
      });
    });
  }
};
var targetInfoMatchers = [// grid
function (foundCpts, targetInfo) {
  var xAxisModel = foundCpts.xAxisModel;
  var yAxisModel = foundCpts.yAxisModel;
  var gridModel = foundCpts.gridModel;
  !gridModel && xAxisModel && (gridModel = xAxisModel.axis.grid.model);
  !gridModel && yAxisModel && (gridModel = yAxisModel.axis.grid.model);
  return gridModel && gridModel === targetInfo.gridModel;
}, // geo
function (foundCpts, targetInfo) {
  var geoModel = foundCpts.geoModel;
  return geoModel && geoModel === targetInfo.geoModel;
}];
var panelRectBuilder = {
  grid: function () {
    // grid is not Transformable.
    return this.coordSys.grid.getRect().clone();
  },
  geo: function () {
    var coordSys = this.coordSys;
    var rect = coordSys.getBoundingRect().clone(); // geo roam and zoom transform

    rect.applyTransform(graphic.getTransform(coordSys));
    return rect;
  }
};
var coordConvert = {
  lineX: curry(axisConvert, 0),
  lineY: curry(axisConvert, 1),
  rect: function (to, coordSys, rangeOrCoordRange) {
    var xminymin = coordSys[COORD_CONVERTS[to]]([rangeOrCoordRange[0][0], rangeOrCoordRange[1][0]]);
    var xmaxymax = coordSys[COORD_CONVERTS[to]]([rangeOrCoordRange[0][1], rangeOrCoordRange[1][1]]);
    var values = [formatMinMax([xminymin[0], xmaxymax[0]]), formatMinMax([xminymin[1], xmaxymax[1]])];
    return {
      values: values,
      xyMinMax: values
    };
  },
  polygon: function (to, coordSys, rangeOrCoordRange) {
    var xyMinMax = [[Infinity, -Infinity], [Infinity, -Infinity]];
    var values = zrUtil.map(rangeOrCoordRange, function (item) {
      var p = coordSys[COORD_CONVERTS[to]](item);
      xyMinMax[0][0] = Math.min(xyMinMax[0][0], p[0]);
      xyMinMax[1][0] = Math.min(xyMinMax[1][0], p[1]);
      xyMinMax[0][1] = Math.max(xyMinMax[0][1], p[0]);
      xyMinMax[1][1] = Math.max(xyMinMax[1][1], p[1]);
      return p;
    });
    return {
      values: values,
      xyMinMax: xyMinMax
    };
  }
};

function axisConvert(axisNameIndex, to, coordSys, rangeOrCoordRange) {
  var axis = coordSys.getAxis(['x', 'y'][axisNameIndex]);
  var values = formatMinMax(zrUtil.map([0, 1], function (i) {
    return to ? axis.coordToData(axis.toLocalCoord(rangeOrCoordRange[i])) : axis.toGlobalCoord(axis.dataToCoord(rangeOrCoordRange[i]));
  }));
  var xyMinMax = [];
  xyMinMax[axisNameIndex] = values;
  xyMinMax[1 - axisNameIndex] = [NaN, NaN];
  return {
    values: values,
    xyMinMax: xyMinMax
  };
}

var diffProcessor = {
  lineX: curry(axisDiffProcessor, 0),
  lineY: curry(axisDiffProcessor, 1),
  rect: function (values, refer, scales) {
    return [[values[0][0] - scales[0] * refer[0][0], values[0][1] - scales[0] * refer[0][1]], [values[1][0] - scales[1] * refer[1][0], values[1][1] - scales[1] * refer[1][1]]];
  },
  polygon: function (values, refer, scales) {
    return zrUtil.map(values, function (item, idx) {
      return [item[0] - scales[0] * refer[idx][0], item[1] - scales[1] * refer[idx][1]];
    });
  }
};

function axisDiffProcessor(axisNameIndex, values, refer, scales) {
  return [values[0] - scales[axisNameIndex] * refer[0], values[1] - scales[axisNameIndex] * refer[1]];
} // We have to process scale caused by dataZoom manually,
// although it might be not accurate.


function getScales(xyMinMaxCurr, xyMinMaxOrigin) {
  var sizeCurr = getSize(xyMinMaxCurr);
  var sizeOrigin = getSize(xyMinMaxOrigin);
  var scales = [sizeCurr[0] / sizeOrigin[0], sizeCurr[1] / sizeOrigin[1]];
  isNaN(scales[0]) && (scales[0] = 1);
  isNaN(scales[1]) && (scales[1] = 1);
  return scales;
}

function getSize(xyMinMax) {
  return xyMinMax ? [xyMinMax[0][1] - xyMinMax[0][0], xyMinMax[1][1] - xyMinMax[1][0]] : [NaN, NaN];
}

var _default = BrushTargetManager;
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

/***/ "c526":
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
var IRRELEVANT_EXCLUDES = {
  'axisPointer': 1,
  'tooltip': 1,
  'brush': 1
};
/**
 * Avoid that: mouse click on a elements that is over geo or graph,
 * but roam is triggered.
 */

function onIrrelevantElement(e, api, targetCoordSysModel) {
  var model = api.getComponentByElement(e.topTarget); // If model is axisModel, it works only if it is injected with coordinateSystem.

  var coordSys = model && model.coordinateSystem;
  return model && model !== targetCoordSysModel && !IRRELEVANT_EXCLUDES[model.mainType] && coordSys && coordSys.model !== targetCoordSysModel;
}

exports.onIrrelevantElement = onIrrelevantElement;

/***/ }),

/***/ "cbb0":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

/**
 * @param {module:echarts/component/visualMap/VisualMapModel} visualMapModel\
 * @param {module:echarts/ExtensionAPI} api
 * @param {Array.<number>} itemSize always [short, long]
 * @return {string} 'left' or 'right' or 'top' or 'bottom'
 */
function getItemAlign(visualMapModel, api, itemSize) {
  var modelOption = visualMapModel.option;
  var itemAlign = modelOption.align;

  if (itemAlign != null && itemAlign !== 'auto') {
    return itemAlign;
  } // Auto decision align.


  var ecSize = {
    width: api.getWidth(),
    height: api.getHeight()
  };
  var realIndex = modelOption.orient === 'horizontal' ? 1 : 0;
  var paramsSet = [['left', 'right', 'width'], ['top', 'bottom', 'height']];
  var reals = paramsSet[realIndex];
  var fakeValue = [0, null, 10];
  var layoutInput = {};

  for (var i = 0; i < 3; i++) {
    layoutInput[paramsSet[1 - realIndex][i]] = fakeValue[i];
    layoutInput[reals[i]] = i === 2 ? itemSize[0] : modelOption[reals[i]];
  }

  var rParam = [['x', 'width', 3], ['y', 'height', 0]][realIndex];
  var rect = getLayoutRect(layoutInput, ecSize, modelOption.padding);
  return reals[(rect.margin[rParam[2]] || 0) + rect[rParam[0]] + rect[rParam[1]] * 0.5 < ecSize[rParam[1]] * 0.5 ? 0 : 1];
}
/**
 * Prepare dataIndex for outside usage, where dataIndex means rawIndex, and
 * dataIndexInside means filtered index.
 */


function makeHighDownBatch(batch, visualMapModel) {
  zrUtil.each(batch || [], function (batchItem) {
    if (batchItem.dataIndex != null) {
      batchItem.dataIndexInside = batchItem.dataIndex;
      batchItem.dataIndex = null;
    }

    batchItem.highlightKey = 'visualMap' + (visualMapModel ? visualMapModel.componentIndex : '');
  });
  return batch;
}

exports.getItemAlign = getItemAlign;
exports.makeHighDownBatch = makeHighDownBatch;

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

/***/ "d6ef":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var actionInfo = {
  type: 'selectDataRange',
  event: 'dataRangeSelected',
  // FIXME use updateView appears wrong
  update: 'update'
};
echarts.registerAction(actionInfo, function (payload, ecModel) {
  ecModel.eachComponent({
    mainType: 'visualMap',
    query: payload
  }, function (model) {
    model.setSelected(payload.selected);
  });
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

/***/ "eaea":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var visualDefault = __webpack_require__("60e3");

var VisualMapping = __webpack_require__("5f14");

var visualSolution = __webpack_require__("2b8c");

var modelUtil = __webpack_require__("e0d3");

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
var mapVisual = VisualMapping.mapVisual;
var eachVisual = VisualMapping.eachVisual;
var isArray = zrUtil.isArray;
var each = zrUtil.each;
var asc = numberUtil.asc;
var linearMap = numberUtil.linearMap;
var noop = zrUtil.noop;
var VisualMapModel = echarts.extendComponentModel({
  type: 'visualMap',
  dependencies: ['series'],

  /**
   * @readOnly
   * @type {Array.<string>}
   */
  stateList: ['inRange', 'outOfRange'],

  /**
   * @readOnly
   * @type {Array.<string>}
   */
  replacableOptionKeys: ['inRange', 'outOfRange', 'target', 'controller', 'color'],

  /**
   * [lowerBound, upperBound]
   *
   * @readOnly
   * @type {Array.<number>}
   */
  dataBound: [-Infinity, Infinity],

  /**
   * @readOnly
   * @type {string|Object}
   */
  layoutMode: {
    type: 'box',
    ignoreSize: true
  },

  /**
   * @protected
   */
  defaultOption: {
    show: true,
    zlevel: 0,
    z: 4,
    seriesIndex: 'all',
    // 'all' or null/undefined: all series.
    // A number or an array of number: the specified series.
    // set min: 0, max: 200, only for campatible with ec2.
    // In fact min max should not have default value.
    min: 0,
    // min value, must specified if pieces is not specified.
    max: 200,
    // max value, must specified if pieces is not specified.
    dimension: null,
    inRange: null,
    // 'color', 'colorHue', 'colorSaturation', 'colorLightness', 'colorAlpha',
    // 'symbol', 'symbolSize'
    outOfRange: null,
    // 'color', 'colorHue', 'colorSaturation',
    // 'colorLightness', 'colorAlpha',
    // 'symbol', 'symbolSize'
    left: 0,
    // 'center' ¦ 'left' ¦ 'right' ¦ {number} (px)
    right: null,
    // The same as left.
    top: null,
    // 'top' ¦ 'bottom' ¦ 'center' ¦ {number} (px)
    bottom: 0,
    // The same as top.
    itemWidth: null,
    itemHeight: null,
    inverse: false,
    orient: 'vertical',
    // 'horizontal' ¦ 'vertical'
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',
    // 值域边框颜色
    contentColor: '#5793f3',
    inactiveColor: '#aaa',
    borderWidth: 0,
    // 值域边框线宽，单位px，默认为0（无边框）
    padding: 5,
    // 值域内边距，单位px，默认各方向内边距为5，
    // 接受数组分别设定上右下左边距，同css
    textGap: 10,
    //
    precision: 0,
    // 小数精度，默认为0，无小数点
    color: null,
    //颜色（deprecated，兼容ec2，顺序同pieces，不同于inRange/outOfRange）
    formatter: null,
    text: null,
    // 文本，如['高', '低']，兼容ec2，text[0]对应高值，text[1]对应低值
    textStyle: {
      color: '#333' // 值域文字颜色

    }
  },

  /**
   * @protected
   */
  init: function (option, parentModel, ecModel) {
    /**
     * @private
     * @type {Array.<number>}
     */
    this._dataExtent;
    /**
     * @readOnly
     */

    this.targetVisuals = {};
    /**
     * @readOnly
     */

    this.controllerVisuals = {};
    /**
     * @readOnly
     */

    this.textStyleModel;
    /**
     * [width, height]
     * @readOnly
     * @type {Array.<number>}
     */

    this.itemSize;
    this.mergeDefaultAndTheme(option, ecModel);
  },

  /**
   * @protected
   */
  optionUpdated: function (newOption, isInit) {
    var thisOption = this.option; // FIXME
    // necessary?
    // Disable realtime view update if canvas is not supported.

    if (!env.canvasSupported) {
      thisOption.realtime = false;
    }

    !isInit && visualSolution.replaceVisualOption(thisOption, newOption, this.replacableOptionKeys);
    this.textStyleModel = this.getModel('textStyle');
    this.resetItemSize();
    this.completeVisualOption();
  },

  /**
   * @protected
   */
  resetVisual: function (supplementVisualOption) {
    var stateList = this.stateList;
    supplementVisualOption = zrUtil.bind(supplementVisualOption, this);
    this.controllerVisuals = visualSolution.createVisualMappings(this.option.controller, stateList, supplementVisualOption);
    this.targetVisuals = visualSolution.createVisualMappings(this.option.target, stateList, supplementVisualOption);
  },

  /**
   * @protected
   * @return {Array.<number>} An array of series indices.
   */
  getTargetSeriesIndices: function () {
    var optionSeriesIndex = this.option.seriesIndex;
    var seriesIndices = [];

    if (optionSeriesIndex == null || optionSeriesIndex === 'all') {
      this.ecModel.eachSeries(function (seriesModel, index) {
        seriesIndices.push(index);
      });
    } else {
      seriesIndices = modelUtil.normalizeToArray(optionSeriesIndex);
    }

    return seriesIndices;
  },

  /**
   * @public
   */
  eachTargetSeries: function (callback, context) {
    zrUtil.each(this.getTargetSeriesIndices(), function (seriesIndex) {
      callback.call(context, this.ecModel.getSeriesByIndex(seriesIndex));
    }, this);
  },

  /**
   * @pubilc
   */
  isTargetSeries: function (seriesModel) {
    var is = false;
    this.eachTargetSeries(function (model) {
      model === seriesModel && (is = true);
    });
    return is;
  },

  /**
   * @example
   * this.formatValueText(someVal); // format single numeric value to text.
   * this.formatValueText(someVal, true); // format single category value to text.
   * this.formatValueText([min, max]); // format numeric min-max to text.
   * this.formatValueText([this.dataBound[0], max]); // using data lower bound.
   * this.formatValueText([min, this.dataBound[1]]); // using data upper bound.
   *
   * @param {number|Array.<number>} value Real value, or this.dataBound[0 or 1].
   * @param {boolean} [isCategory=false] Only available when value is number.
   * @param {Array.<string>} edgeSymbols Open-close symbol when value is interval.
   * @return {string}
   * @protected
   */
  formatValueText: function (value, isCategory, edgeSymbols) {
    var option = this.option;
    var precision = option.precision;
    var dataBound = this.dataBound;
    var formatter = option.formatter;
    var isMinMax;
    var textValue;
    edgeSymbols = edgeSymbols || ['<', '>'];

    if (zrUtil.isArray(value)) {
      value = value.slice();
      isMinMax = true;
    }

    textValue = isCategory ? value : isMinMax ? [toFixed(value[0]), toFixed(value[1])] : toFixed(value);

    if (zrUtil.isString(formatter)) {
      return formatter.replace('{value}', isMinMax ? textValue[0] : textValue).replace('{value2}', isMinMax ? textValue[1] : textValue);
    } else if (zrUtil.isFunction(formatter)) {
      return isMinMax ? formatter(value[0], value[1]) : formatter(value);
    }

    if (isMinMax) {
      if (value[0] === dataBound[0]) {
        return edgeSymbols[0] + ' ' + textValue[1];
      } else if (value[1] === dataBound[1]) {
        return edgeSymbols[1] + ' ' + textValue[0];
      } else {
        return textValue[0] + ' - ' + textValue[1];
      }
    } else {
      // Format single value (includes category case).
      return textValue;
    }

    function toFixed(val) {
      return val === dataBound[0] ? 'min' : val === dataBound[1] ? 'max' : (+val).toFixed(Math.min(precision, 20));
    }
  },

  /**
   * @protected
   */
  resetExtent: function () {
    var thisOption = this.option; // Can not calculate data extent by data here.
    // Because series and data may be modified in processing stage.
    // So we do not support the feature "auto min/max".

    var extent = asc([thisOption.min, thisOption.max]);
    this._dataExtent = extent;
  },

  /**
   * @public
   * @param {module:echarts/data/List} list
   * @return {string} Concrete dimention. If return null/undefined,
   *                  no dimension used.
   */
  getDataDimension: function (list) {
    var optDim = this.option.dimension;
    var listDimensions = list.dimensions;

    if (optDim == null && !listDimensions.length) {
      return;
    }

    if (optDim != null) {
      return list.getDimension(optDim);
    }

    var dimNames = list.dimensions;

    for (var i = dimNames.length - 1; i >= 0; i--) {
      var dimName = dimNames[i];
      var dimInfo = list.getDimensionInfo(dimName);

      if (!dimInfo.isCalculationCoord) {
        return dimName;
      }
    }
  },

  /**
   * @public
   * @override
   */
  getExtent: function () {
    return this._dataExtent.slice();
  },

  /**
   * @protected
   */
  completeVisualOption: function () {
    var ecModel = this.ecModel;
    var thisOption = this.option;
    var base = {
      inRange: thisOption.inRange,
      outOfRange: thisOption.outOfRange
    };
    var target = thisOption.target || (thisOption.target = {});
    var controller = thisOption.controller || (thisOption.controller = {});
    zrUtil.merge(target, base); // Do not override

    zrUtil.merge(controller, base); // Do not override

    var isCategory = this.isCategory();
    completeSingle.call(this, target);
    completeSingle.call(this, controller);
    completeInactive.call(this, target, 'inRange', 'outOfRange'); // completeInactive.call(this, target, 'outOfRange', 'inRange');

    completeController.call(this, controller);

    function completeSingle(base) {
      // Compatible with ec2 dataRange.color.
      // The mapping order of dataRange.color is: [high value, ..., low value]
      // whereas inRange.color and outOfRange.color is [low value, ..., high value]
      // Notice: ec2 has no inverse.
      if (isArray(thisOption.color) // If there has been inRange: {symbol: ...}, adding color is a mistake.
      // So adding color only when no inRange defined.
      && !base.inRange) {
        base.inRange = {
          color: thisOption.color.slice().reverse()
        };
      } // Compatible with previous logic, always give a defautl color, otherwise
      // simple config with no inRange and outOfRange will not work.
      // Originally we use visualMap.color as the default color, but setOption at
      // the second time the default color will be erased. So we change to use
      // constant DEFAULT_COLOR.
      // If user do not want the defualt color, set inRange: {color: null}.


      base.inRange = base.inRange || {
        color: ecModel.get('gradientColor')
      }; // If using shortcut like: {inRange: 'symbol'}, complete default value.

      each(this.stateList, function (state) {
        var visualType = base[state];

        if (zrUtil.isString(visualType)) {
          var defa = visualDefault.get(visualType, 'active', isCategory);

          if (defa) {
            base[state] = {};
            base[state][visualType] = defa;
          } else {
            // Mark as not specified.
            delete base[state];
          }
        }
      }, this);
    }

    function completeInactive(base, stateExist, stateAbsent) {
      var optExist = base[stateExist];
      var optAbsent = base[stateAbsent];

      if (optExist && !optAbsent) {
        optAbsent = base[stateAbsent] = {};
        each(optExist, function (visualData, visualType) {
          if (!VisualMapping.isValidType(visualType)) {
            return;
          }

          var defa = visualDefault.get(visualType, 'inactive', isCategory);

          if (defa != null) {
            optAbsent[visualType] = defa; // Compatibable with ec2:
            // Only inactive color to rgba(0,0,0,0) can not
            // make label transparent, so use opacity also.

            if (visualType === 'color' && !optAbsent.hasOwnProperty('opacity') && !optAbsent.hasOwnProperty('colorAlpha')) {
              optAbsent.opacity = [0, 0];
            }
          }
        });
      }
    }

    function completeController(controller) {
      var symbolExists = (controller.inRange || {}).symbol || (controller.outOfRange || {}).symbol;
      var symbolSizeExists = (controller.inRange || {}).symbolSize || (controller.outOfRange || {}).symbolSize;
      var inactiveColor = this.get('inactiveColor');
      each(this.stateList, function (state) {
        var itemSize = this.itemSize;
        var visuals = controller[state]; // Set inactive color for controller if no other color
        // attr (like colorAlpha) specified.

        if (!visuals) {
          visuals = controller[state] = {
            color: isCategory ? inactiveColor : [inactiveColor]
          };
        } // Consistent symbol and symbolSize if not specified.


        if (visuals.symbol == null) {
          visuals.symbol = symbolExists && zrUtil.clone(symbolExists) || (isCategory ? 'roundRect' : ['roundRect']);
        }

        if (visuals.symbolSize == null) {
          visuals.symbolSize = symbolSizeExists && zrUtil.clone(symbolSizeExists) || (isCategory ? itemSize[0] : [itemSize[0], itemSize[0]]);
        } // Filter square and none.


        visuals.symbol = mapVisual(visuals.symbol, function (symbol) {
          return symbol === 'none' || symbol === 'square' ? 'roundRect' : symbol;
        }); // Normalize symbolSize

        var symbolSize = visuals.symbolSize;

        if (symbolSize != null) {
          var max = -Infinity; // symbolSize can be object when categories defined.

          eachVisual(symbolSize, function (value) {
            value > max && (max = value);
          });
          visuals.symbolSize = mapVisual(symbolSize, function (value) {
            return linearMap(value, [0, max], [0, itemSize[0]], true);
          });
        }
      }, this);
    }
  },

  /**
   * @protected
   */
  resetItemSize: function () {
    this.itemSize = [parseFloat(this.get('itemWidth')), parseFloat(this.get('itemHeight'))];
  },

  /**
   * @public
   */
  isCategory: function () {
    return !!this.option.categories;
  },

  /**
   * @public
   * @abstract
   */
  setSelected: noop,

  /**
   * @public
   * @abstract
   * @param {*|module:echarts/data/List} valueOrData
   * @param {number} dataIndex
   * @return {string} state See this.stateList
   */
  getValueState: noop,

  /**
   * FIXME
   * Do not publish to thirt-part-dev temporarily
   * util the interface is stable. (Should it return
   * a function but not visual meta?)
   *
   * @pubilc
   * @abstract
   * @param {Function} getColorVisual
   *        params: value, valueState
   *        return: color
   * @return {Object} visualMeta
   *        should includes {stops, outerColors}
   *        outerColor means [colorBeyondMinValue, colorBeyondMaxValue]
   */
  getVisualMeta: noop
});
var _default = VisualMapModel;
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

/***/ "ef6a":
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
 * Calculate slider move result.
 * Usage:
 * (1) If both handle0 and handle1 are needed to be moved, set minSpan the same as
 * maxSpan and the same as `Math.abs(handleEnd[1] - handleEnds[0])`.
 * (2) If handle0 is forbidden to cross handle1, set minSpan as `0`.
 *
 * @param {number} delta Move length.
 * @param {Array.<number>} handleEnds handleEnds[0] can be bigger then handleEnds[1].
 *              handleEnds will be modified in this method.
 * @param {Array.<number>} extent handleEnds is restricted by extent.
 *              extent[0] should less or equals than extent[1].
 * @param {number|string} handleIndex Can be 'all', means that both move the two handleEnds.
 * @param {number} [minSpan] The range of dataZoom can not be smaller than that.
 *              If not set, handle0 and cross handle1. If set as a non-negative
 *              number (including `0`), handles will push each other when reaching
 *              the minSpan.
 * @param {number} [maxSpan] The range of dataZoom can not be larger than that.
 * @return {Array.<number>} The input handleEnds.
 */
function _default(delta, handleEnds, extent, handleIndex, minSpan, maxSpan) {
  delta = delta || 0;
  var extentSpan = extent[1] - extent[0]; // Notice maxSpan and minSpan can be null/undefined.

  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }

  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }

  if (handleIndex === 'all') {
    var handleSpan = Math.abs(handleEnds[1] - handleEnds[0]);
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }

  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);
  var originalDistSign = getSpanSign(handleEnds, handleIndex);
  handleEnds[handleIndex] += delta; // Restrict in extent.

  var extentMinSpan = minSpan || 0;
  var realExtent = extent.slice();
  originalDistSign.sign < 0 ? realExtent[0] += extentMinSpan : realExtent[1] -= extentMinSpan;
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent); // Expand span.

  var currDistSign = getSpanSign(handleEnds, handleIndex);

  if (minSpan != null && (currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan)) {
    // If minSpan exists, 'cross' is forbidden.
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + originalDistSign.sign * minSpan;
  } // Shrink span.


  var currDistSign = getSpanSign(handleEnds, handleIndex);

  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + currDistSign.sign * maxSpan;
  }

  return handleEnds;
}

function getSpanSign(handleEnds, handleIndex) {
  var dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex]; // If `handleEnds[0] === handleEnds[1]`, always believe that handleEnd[0]
  // is at left of handleEnds[1] for non-cross case.

  return {
    span: Math.abs(dist),
    sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1
  };
}

function restrict(value, extend) {
  return Math.min(extend[1] != null ? extend[1] : Infinity, Math.max(extend[0] != null ? extend[0] : -Infinity, value));
}

module.exports = _default;

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

/***/ }),

/***/ "f4a2":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var BoundingRect = __webpack_require__("9850");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphicUtil = __webpack_require__("2306");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function makeRectPanelClipPath(rect) {
  rect = normalizeRect(rect);
  return function (localPoints, transform) {
    return graphicUtil.clipPointsByRect(localPoints, rect);
  };
}

function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
  rect = normalizeRect(rect);
  return function (xyIndex) {
    var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
    var brushWidth = idx ? rect.width : rect.height;
    var base = idx ? rect.x : rect.y;
    return [base, base + (brushWidth || 0)];
  };
}

function makeRectIsTargetByCursor(rect, api, targetModel) {
  rect = normalizeRect(rect);
  return function (e, localCursorPoint, transform) {
    return rect.contain(localCursorPoint[0], localCursorPoint[1]) && !onIrrelevantElement(e, api, targetModel);
  };
} // Consider width/height is negative.


function normalizeRect(rect) {
  return BoundingRect.create(rect);
}

exports.makeRectPanelClipPath = makeRectPanelClipPath;
exports.makeLinearBrushOtherExtent = makeLinearBrushOtherExtent;
exports.makeRectIsTargetByCursor = makeRectIsTargetByCursor;

/***/ }),

/***/ "fc82":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var Eventful = __webpack_require__("1fab");

var graphic = __webpack_require__("2306");

var interactionMutex = __webpack_require__("a4fe");

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
var curry = zrUtil.curry;
var each = zrUtil.each;
var map = zrUtil.map;
var mathMin = Math.min;
var mathMax = Math.max;
var mathPow = Math.pow;
var COVER_Z = 10000;
var UNSELECT_THRESHOLD = 6;
var MIN_RESIZE_LINE_WIDTH = 6;
var MUTEX_RESOURCE_KEY = 'globalPan';
var DIRECTION_MAP = {
  w: [0, 0],
  e: [0, 1],
  n: [1, 0],
  s: [1, 1]
};
var CURSOR_MAP = {
  w: 'ew',
  e: 'ew',
  n: 'ns',
  s: 'ns',
  ne: 'nesw',
  sw: 'nesw',
  nw: 'nwse',
  se: 'nwse'
};
var DEFAULT_BRUSH_OPT = {
  brushStyle: {
    lineWidth: 2,
    stroke: 'rgba(0,0,0,0.3)',
    fill: 'rgba(0,0,0,0.1)'
  },
  transformable: true,
  brushMode: 'single',
  removeOnClick: false
};
var baseUID = 0;
/**
 * @alias module:echarts/component/helper/BrushController
 * @constructor
 * @mixin {module:zrender/mixin/Eventful}
 * @event module:echarts/component/helper/BrushController#brush
 *        params:
 *            areas: Array.<Array>, coord relates to container group,
 *                                    If no container specified, to global.
 *            opt {
 *                isEnd: boolean,
 *                removeOnClick: boolean
 *            }
 *
 * @param {module:zrender/zrender~ZRender} zr
 */

function BrushController(zr) {
  Eventful.call(this);
  /**
   * @type {module:zrender/zrender~ZRender}
   * @private
   */

  this._zr = zr;
  /**
   * @type {module:zrender/container/Group}
   * @readOnly
   */

  this.group = new graphic.Group();
  /**
   * Only for drawing (after enabledBrush).
   *     'line', 'rect', 'polygon' or false
   *     If passing false/null/undefined, disable brush.
   *     If passing 'auto', determined by panel.defaultBrushType
   * @private
   * @type {string}
   */

  this._brushType;
  /**
   * Only for drawing (after enabledBrush).
   *
   * @private
   * @type {Object}
   */

  this._brushOption;
  /**
   * @private
   * @type {Object}
   */

  this._panels;
  /**
   * @private
   * @type {Array.<nubmer>}
   */

  this._track = [];
  /**
   * @private
   * @type {boolean}
   */

  this._dragging;
  /**
   * @private
   * @type {Array}
   */

  this._covers = [];
  /**
   * @private
   * @type {moudule:zrender/container/Group}
   */

  this._creatingCover;
  /**
   * `true` means global panel
   * @private
   * @type {module:zrender/container/Group|boolean}
   */

  this._creatingPanel;
  /**
   * @private
   * @type {boolean}
   */

  this._enableGlobalPan;
  /**
   * @private
   * @type {boolean}
   */

  /**
   * @private
   * @type {string}
   */
  this._uid = 'brushController_' + baseUID++;
  /**
   * @private
   * @type {Object}
   */

  this._handlers = {};
  each(pointerHandlers, function (handler, eventName) {
    this._handlers[eventName] = zrUtil.bind(handler, this);
  }, this);
}

BrushController.prototype = {
  constructor: BrushController,

  /**
   * If set to null/undefined/false, select disabled.
   * @param {Object} brushOption
   * @param {string|boolean} brushOption.brushType 'line', 'rect', 'polygon' or false
   *                          If passing false/null/undefined, disable brush.
   *                          If passing 'auto', determined by panel.defaultBrushType.
   *                              ('auto' can not be used in global panel)
   * @param {number} [brushOption.brushMode='single'] 'single' or 'multiple'
   * @param {boolean} [brushOption.transformable=true]
   * @param {boolean} [brushOption.removeOnClick=false]
   * @param {Object} [brushOption.brushStyle]
   * @param {number} [brushOption.brushStyle.width]
   * @param {number} [brushOption.brushStyle.lineWidth]
   * @param {string} [brushOption.brushStyle.stroke]
   * @param {string} [brushOption.brushStyle.fill]
   * @param {number} [brushOption.z]
   */
  enableBrush: function (brushOption) {
    this._brushType && doDisableBrush(this);
    brushOption.brushType && doEnableBrush(this, brushOption);
    return this;
  },

  /**
   * @param {Array.<Object>} panelOpts If not pass, it is global brush.
   *        Each items: {
   *            panelId, // mandatory.
   *            clipPath, // mandatory. function.
   *            isTargetByCursor, // mandatory. function.
   *            defaultBrushType, // optional, only used when brushType is 'auto'.
   *            getLinearBrushOtherExtent, // optional. function.
   *        }
   */
  setPanels: function (panelOpts) {
    if (panelOpts && panelOpts.length) {
      var panels = this._panels = {};
      zrUtil.each(panelOpts, function (panelOpts) {
        panels[panelOpts.panelId] = zrUtil.clone(panelOpts);
      });
    } else {
      this._panels = null;
    }

    return this;
  },

  /**
   * @param {Object} [opt]
   * @return {boolean} [opt.enableGlobalPan=false]
   */
  mount: function (opt) {
    opt = opt || {};
    this._enableGlobalPan = opt.enableGlobalPan;
    var thisGroup = this.group;

    this._zr.add(thisGroup);

    thisGroup.attr({
      position: opt.position || [0, 0],
      rotation: opt.rotation || 0,
      scale: opt.scale || [1, 1]
    });
    this._transform = thisGroup.getLocalTransform();
    return this;
  },
  eachCover: function (cb, context) {
    each(this._covers, cb, context);
  },

  /**
   * Update covers.
   * @param {Array.<Object>} brushOptionList Like:
   *        [
   *            {id: 'xx', brushType: 'line', range: [23, 44], brushStyle, transformable},
   *            {id: 'yy', brushType: 'rect', range: [[23, 44], [23, 54]]},
   *            ...
   *        ]
   *        `brushType` is required in each cover info. (can not be 'auto')
   *        `id` is not mandatory.
   *        `brushStyle`, `transformable` is not mandatory, use DEFAULT_BRUSH_OPT by default.
   *        If brushOptionList is null/undefined, all covers removed.
   */
  updateCovers: function (brushOptionList) {
    brushOptionList = zrUtil.map(brushOptionList, function (brushOption) {
      return zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
    });
    var tmpIdPrefix = '\0-brush-index-';
    var oldCovers = this._covers;
    var newCovers = this._covers = [];
    var controller = this;
    var creatingCover = this._creatingCover;
    new DataDiffer(oldCovers, brushOptionList, oldGetKey, getKey).add(addOrUpdate).update(addOrUpdate).remove(remove).execute();
    return this;

    function getKey(brushOption, index) {
      return (brushOption.id != null ? brushOption.id : tmpIdPrefix + index) + '-' + brushOption.brushType;
    }

    function oldGetKey(cover, index) {
      return getKey(cover.__brushOption, index);
    }

    function addOrUpdate(newIndex, oldIndex) {
      var newBrushOption = brushOptionList[newIndex]; // Consider setOption in event listener of brushSelect,
      // where updating cover when creating should be forbiden.

      if (oldIndex != null && oldCovers[oldIndex] === creatingCover) {
        newCovers[newIndex] = oldCovers[oldIndex];
      } else {
        var cover = newCovers[newIndex] = oldIndex != null ? (oldCovers[oldIndex].__brushOption = newBrushOption, oldCovers[oldIndex]) : endCreating(controller, createCover(controller, newBrushOption));
        updateCoverAfterCreation(controller, cover);
      }
    }

    function remove(oldIndex) {
      if (oldCovers[oldIndex] !== creatingCover) {
        controller.group.remove(oldCovers[oldIndex]);
      }
    }
  },
  unmount: function () {
    this.enableBrush(false); // container may 'removeAll' outside.

    clearCovers(this);

    this._zr.remove(this.group);

    return this;
  },
  dispose: function () {
    this.unmount();
    this.off();
  }
};
zrUtil.mixin(BrushController, Eventful);

function doEnableBrush(controller, brushOption) {
  var zr = controller._zr; // Consider roam, which takes globalPan too.

  if (!controller._enableGlobalPan) {
    interactionMutex.take(zr, MUTEX_RESOURCE_KEY, controller._uid);
  }

  mountHandlers(zr, controller._handlers);
  controller._brushType = brushOption.brushType;
  controller._brushOption = zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
}

function doDisableBrush(controller) {
  var zr = controller._zr;
  interactionMutex.release(zr, MUTEX_RESOURCE_KEY, controller._uid);
  unmountHandlers(zr, controller._handlers);
  controller._brushType = controller._brushOption = null;
}

function mountHandlers(zr, handlers) {
  each(handlers, function (handler, eventName) {
    zr.on(eventName, handler);
  });
}

function unmountHandlers(zr, handlers) {
  each(handlers, function (handler, eventName) {
    zr.off(eventName, handler);
  });
}

function createCover(controller, brushOption) {
  var cover = coverRenderers[brushOption.brushType].createCover(controller, brushOption);
  cover.__brushOption = brushOption;
  updateZ(cover, brushOption);
  controller.group.add(cover);
  return cover;
}

function endCreating(controller, creatingCover) {
  var coverRenderer = getCoverRenderer(creatingCover);

  if (coverRenderer.endCreating) {
    coverRenderer.endCreating(controller, creatingCover);
    updateZ(creatingCover, creatingCover.__brushOption);
  }

  return creatingCover;
}

function updateCoverShape(controller, cover) {
  var brushOption = cover.__brushOption;
  getCoverRenderer(cover).updateCoverShape(controller, cover, brushOption.range, brushOption);
}

function updateZ(cover, brushOption) {
  var z = brushOption.z;
  z == null && (z = COVER_Z);
  cover.traverse(function (el) {
    el.z = z;
    el.z2 = z; // Consider in given container.
  });
}

function updateCoverAfterCreation(controller, cover) {
  getCoverRenderer(cover).updateCommon(controller, cover);
  updateCoverShape(controller, cover);
}

function getCoverRenderer(cover) {
  return coverRenderers[cover.__brushOption.brushType];
} // return target panel or `true` (means global panel)


function getPanelByPoint(controller, e, localCursorPoint) {
  var panels = controller._panels;

  if (!panels) {
    return true; // Global panel
  }

  var panel;
  var transform = controller._transform;
  each(panels, function (pn) {
    pn.isTargetByCursor(e, localCursorPoint, transform) && (panel = pn);
  });
  return panel;
} // Return a panel or true


function getPanelByCover(controller, cover) {
  var panels = controller._panels;

  if (!panels) {
    return true; // Global panel
  }

  var panelId = cover.__brushOption.panelId; // User may give cover without coord sys info,
  // which is then treated as global panel.

  return panelId != null ? panels[panelId] : true;
}

function clearCovers(controller) {
  var covers = controller._covers;
  var originalLength = covers.length;
  each(covers, function (cover) {
    controller.group.remove(cover);
  }, controller);
  covers.length = 0;
  return !!originalLength;
}

function trigger(controller, opt) {
  var areas = map(controller._covers, function (cover) {
    var brushOption = cover.__brushOption;
    var range = zrUtil.clone(brushOption.range);
    return {
      brushType: brushOption.brushType,
      panelId: brushOption.panelId,
      range: range
    };
  });
  controller.trigger('brush', areas, {
    isEnd: !!opt.isEnd,
    removeOnClick: !!opt.removeOnClick
  });
}

function shouldShowCover(controller) {
  var track = controller._track;

  if (!track.length) {
    return false;
  }

  var p2 = track[track.length - 1];
  var p1 = track[0];
  var dx = p2[0] - p1[0];
  var dy = p2[1] - p1[1];
  var dist = mathPow(dx * dx + dy * dy, 0.5);
  return dist > UNSELECT_THRESHOLD;
}

function getTrackEnds(track) {
  var tail = track.length - 1;
  tail < 0 && (tail = 0);
  return [track[0], track[tail]];
}

function createBaseRectCover(doDrift, controller, brushOption, edgeNames) {
  var cover = new graphic.Group();
  cover.add(new graphic.Rect({
    name: 'main',
    style: makeStyle(brushOption),
    silent: true,
    draggable: true,
    cursor: 'move',
    drift: curry(doDrift, controller, cover, 'nswe'),
    ondragend: curry(trigger, controller, {
      isEnd: true
    })
  }));
  each(edgeNames, function (name) {
    cover.add(new graphic.Rect({
      name: name,
      style: {
        opacity: 0
      },
      draggable: true,
      silent: true,
      invisible: true,
      drift: curry(doDrift, controller, cover, name),
      ondragend: curry(trigger, controller, {
        isEnd: true
      })
    }));
  });
  return cover;
}

function updateBaseRect(controller, cover, localRange, brushOption) {
  var lineWidth = brushOption.brushStyle.lineWidth || 0;
  var handleSize = mathMax(lineWidth, MIN_RESIZE_LINE_WIDTH);
  var x = localRange[0][0];
  var y = localRange[1][0];
  var xa = x - lineWidth / 2;
  var ya = y - lineWidth / 2;
  var x2 = localRange[0][1];
  var y2 = localRange[1][1];
  var x2a = x2 - handleSize + lineWidth / 2;
  var y2a = y2 - handleSize + lineWidth / 2;
  var width = x2 - x;
  var height = y2 - y;
  var widtha = width + lineWidth;
  var heighta = height + lineWidth;
  updateRectShape(controller, cover, 'main', x, y, width, height);

  if (brushOption.transformable) {
    updateRectShape(controller, cover, 'w', xa, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'e', x2a, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'n', xa, ya, widtha, handleSize);
    updateRectShape(controller, cover, 's', xa, y2a, widtha, handleSize);
    updateRectShape(controller, cover, 'nw', xa, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'ne', x2a, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'sw', xa, y2a, handleSize, handleSize);
    updateRectShape(controller, cover, 'se', x2a, y2a, handleSize, handleSize);
  }
}

function updateCommon(controller, cover) {
  var brushOption = cover.__brushOption;
  var transformable = brushOption.transformable;
  var mainEl = cover.childAt(0);
  mainEl.useStyle(makeStyle(brushOption));
  mainEl.attr({
    silent: !transformable,
    cursor: transformable ? 'move' : 'default'
  });
  each(['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw'], function (name) {
    var el = cover.childOfName(name);
    var globalDir = getGlobalDirection(controller, name);
    el && el.attr({
      silent: !transformable,
      invisible: !transformable,
      cursor: transformable ? CURSOR_MAP[globalDir] + '-resize' : null
    });
  });
}

function updateRectShape(controller, cover, name, x, y, w, h) {
  var el = cover.childOfName(name);
  el && el.setShape(pointsToRect(clipByPanel(controller, cover, [[x, y], [x + w, y + h]])));
}

function makeStyle(brushOption) {
  return zrUtil.defaults({
    strokeNoScale: true
  }, brushOption.brushStyle);
}

function formatRectRange(x, y, x2, y2) {
  var min = [mathMin(x, x2), mathMin(y, y2)];
  var max = [mathMax(x, x2), mathMax(y, y2)];
  return [[min[0], max[0]], // x range
  [min[1], max[1]] // y range
  ];
}

function getTransform(controller) {
  return graphic.getTransform(controller.group);
}

function getGlobalDirection(controller, localDirection) {
  if (localDirection.length > 1) {
    localDirection = localDirection.split('');
    var globalDir = [getGlobalDirection(controller, localDirection[0]), getGlobalDirection(controller, localDirection[1])];
    (globalDir[0] === 'e' || globalDir[0] === 'w') && globalDir.reverse();
    return globalDir.join('');
  } else {
    var map = {
      w: 'left',
      e: 'right',
      n: 'top',
      s: 'bottom'
    };
    var inverseMap = {
      left: 'w',
      right: 'e',
      top: 'n',
      bottom: 's'
    };
    var globalDir = graphic.transformDirection(map[localDirection], getTransform(controller));
    return inverseMap[globalDir];
  }
}

function driftRect(toRectRange, fromRectRange, controller, cover, name, dx, dy, e) {
  var brushOption = cover.__brushOption;
  var rectRange = toRectRange(brushOption.range);
  var localDelta = toLocalDelta(controller, dx, dy);
  each(name.split(''), function (namePart) {
    var ind = DIRECTION_MAP[namePart];
    rectRange[ind[0]][ind[1]] += localDelta[ind[0]];
  });
  brushOption.range = fromRectRange(formatRectRange(rectRange[0][0], rectRange[1][0], rectRange[0][1], rectRange[1][1]));
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}

function driftPolygon(controller, cover, dx, dy, e) {
  var range = cover.__brushOption.range;
  var localDelta = toLocalDelta(controller, dx, dy);
  each(range, function (point) {
    point[0] += localDelta[0];
    point[1] += localDelta[1];
  });
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}

function toLocalDelta(controller, dx, dy) {
  var thisGroup = controller.group;
  var localD = thisGroup.transformCoordToLocal(dx, dy);
  var localZero = thisGroup.transformCoordToLocal(0, 0);
  return [localD[0] - localZero[0], localD[1] - localZero[1]];
}

function clipByPanel(controller, cover, data) {
  var panel = getPanelByCover(controller, cover);
  return panel && panel !== true ? panel.clipPath(data, controller._transform) : zrUtil.clone(data);
}

function pointsToRect(points) {
  var xmin = mathMin(points[0][0], points[1][0]);
  var ymin = mathMin(points[0][1], points[1][1]);
  var xmax = mathMax(points[0][0], points[1][0]);
  var ymax = mathMax(points[0][1], points[1][1]);
  return {
    x: xmin,
    y: ymin,
    width: xmax - xmin,
    height: ymax - ymin
  };
}

function resetCursor(controller, e, localCursorPoint) {
  if ( // Check active
  !controller._brushType // resetCursor should be always called when mouse is in zr area,
  // but not called when mouse is out of zr area to avoid bad influence
  // if `mousemove`, `mouseup` are triggered from `document` event.
  || isOutsideZrArea(controller, e)) {
    return;
  }

  var zr = controller._zr;
  var covers = controller._covers;
  var currPanel = getPanelByPoint(controller, e, localCursorPoint); // Check whether in covers.

  if (!controller._dragging) {
    for (var i = 0; i < covers.length; i++) {
      var brushOption = covers[i].__brushOption;

      if (currPanel && (currPanel === true || brushOption.panelId === currPanel.panelId) && coverRenderers[brushOption.brushType].contain(covers[i], localCursorPoint[0], localCursorPoint[1])) {
        // Use cursor style set on cover.
        return;
      }
    }
  }

  currPanel && zr.setCursorStyle('crosshair');
}

function preventDefault(e) {
  var rawE = e.event;
  rawE.preventDefault && rawE.preventDefault();
}

function mainShapeContain(cover, x, y) {
  return cover.childOfName('main').contain(x, y);
}

function updateCoverByMouse(controller, e, localCursorPoint, isEnd) {
  var creatingCover = controller._creatingCover;
  var panel = controller._creatingPanel;
  var thisBrushOption = controller._brushOption;
  var eventParams;

  controller._track.push(localCursorPoint.slice());

  if (shouldShowCover(controller) || creatingCover) {
    if (panel && !creatingCover) {
      thisBrushOption.brushMode === 'single' && clearCovers(controller);
      var brushOption = zrUtil.clone(thisBrushOption);
      brushOption.brushType = determineBrushType(brushOption.brushType, panel);
      brushOption.panelId = panel === true ? null : panel.panelId;
      creatingCover = controller._creatingCover = createCover(controller, brushOption);

      controller._covers.push(creatingCover);
    }

    if (creatingCover) {
      var coverRenderer = coverRenderers[determineBrushType(controller._brushType, panel)];
      var coverBrushOption = creatingCover.__brushOption;
      coverBrushOption.range = coverRenderer.getCreatingRange(clipByPanel(controller, creatingCover, controller._track));

      if (isEnd) {
        endCreating(controller, creatingCover);
        coverRenderer.updateCommon(controller, creatingCover);
      }

      updateCoverShape(controller, creatingCover);
      eventParams = {
        isEnd: isEnd
      };
    }
  } else if (isEnd && thisBrushOption.brushMode === 'single' && thisBrushOption.removeOnClick) {
    // Help user to remove covers easily, only by a tiny drag, in 'single' mode.
    // But a single click do not clear covers, because user may have casual
    // clicks (for example, click on other component and do not expect covers
    // disappear).
    // Only some cover removed, trigger action, but not every click trigger action.
    if (getPanelByPoint(controller, e, localCursorPoint) && clearCovers(controller)) {
      eventParams = {
        isEnd: isEnd,
        removeOnClick: true
      };
    }
  }

  return eventParams;
}

function determineBrushType(brushType, panel) {
  if (brushType === 'auto') {
    return panel.defaultBrushType;
  }

  return brushType;
}

var pointerHandlers = {
  mousedown: function (e) {
    if (this._dragging) {
      // In case some browser do not support globalOut,
      // and release mose out side the browser.
      handleDragEnd(this, e);
    } else if (!e.target || !e.target.draggable) {
      preventDefault(e);
      var localCursorPoint = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
      this._creatingCover = null;
      var panel = this._creatingPanel = getPanelByPoint(this, e, localCursorPoint);

      if (panel) {
        this._dragging = true;
        this._track = [localCursorPoint.slice()];
      }
    }
  },
  mousemove: function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = this.group.transformCoordToLocal(x, y);
    resetCursor(this, e, localCursorPoint);

    if (this._dragging) {
      preventDefault(e);
      var eventParams = updateCoverByMouse(this, e, localCursorPoint, false);
      eventParams && trigger(this, eventParams);
    }
  },
  mouseup: function (e) {
    handleDragEnd(this, e);
  }
};

function handleDragEnd(controller, e) {
  if (controller._dragging) {
    preventDefault(e);
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = controller.group.transformCoordToLocal(x, y);
    var eventParams = updateCoverByMouse(controller, e, localCursorPoint, true);
    controller._dragging = false;
    controller._track = [];
    controller._creatingCover = null; // trigger event shoule be at final, after procedure will be nested.

    eventParams && trigger(controller, eventParams);
  }
}

function isOutsideZrArea(controller, x, y) {
  var zr = controller._zr;
  return x < 0 || x > zr.getWidth() || y < 0 || y > zr.getHeight();
}
/**
 * key: brushType
 * @type {Object}
 */


var coverRenderers = {
  lineX: getLineRenderer(0),
  lineY: getLineRenderer(1),
  rect: {
    createCover: function (controller, brushOption) {
      return createBaseRectCover(curry(driftRect, function (range) {
        return range;
      }, function (range) {
        return range;
      }), controller, brushOption, ['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw']);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      return formatRectRange(ends[1][0], ends[1][1], ends[0][0], ends[0][1]);
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      updateBaseRect(controller, cover, localRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  },
  polygon: {
    createCover: function (controller, brushOption) {
      var cover = new graphic.Group(); // Do not use graphic.Polygon because graphic.Polyline do not close the
      // border of the shape when drawing, which is a better experience for user.

      cover.add(new graphic.Polyline({
        name: 'main',
        style: makeStyle(brushOption),
        silent: true
      }));
      return cover;
    },
    getCreatingRange: function (localTrack) {
      return localTrack;
    },
    endCreating: function (controller, cover) {
      cover.remove(cover.childAt(0)); // Use graphic.Polygon close the shape.

      cover.add(new graphic.Polygon({
        name: 'main',
        draggable: true,
        drift: curry(driftPolygon, controller, cover),
        ondragend: curry(trigger, controller, {
          isEnd: true
        })
      }));
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      cover.childAt(0).setShape({
        points: clipByPanel(controller, cover, localRange)
      });
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  }
};

function getLineRenderer(xyIndex) {
  return {
    createCover: function (controller, brushOption) {
      return createBaseRectCover(curry(driftRect, function (range) {
        var rectRange = [range, [0, 100]];
        xyIndex && rectRange.reverse();
        return rectRange;
      }, function (rectRange) {
        return rectRange[xyIndex];
      }), controller, brushOption, [['w', 'e'], ['n', 's']][xyIndex]);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      var min = mathMin(ends[0][xyIndex], ends[1][xyIndex]);
      var max = mathMax(ends[0][xyIndex], ends[1][xyIndex]);
      return [min, max];
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      var otherExtent; // If brushWidth not specified, fit the panel.

      var panel = getPanelByCover(controller, cover);

      if (panel !== true && panel.getLinearBrushOtherExtent) {
        otherExtent = panel.getLinearBrushOtherExtent(xyIndex, controller._transform);
      } else {
        var zr = controller._zr;
        otherExtent = [0, [zr.getWidth(), zr.getHeight()][1 - xyIndex]];
      }

      var rectRange = [localRange, otherExtent];
      xyIndex && rectRange.reverse();
      updateBaseRect(controller, cover, rectRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  };
}

var _default = BrushController;
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