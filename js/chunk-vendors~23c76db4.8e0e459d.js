(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~23c76db4"],{

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

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~23c76db4.8e0e459d.js.map