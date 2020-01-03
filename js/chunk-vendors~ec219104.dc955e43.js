(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~ec219104"],{

/***/ "00ba":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var bind = zrUtil.bind;

var createListSimply = __webpack_require__("e46b");

var _model = __webpack_require__("e0d3");

var defaultEmphasis = _model.defaultEmphasis;

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForNameBased = _sourceHelper.makeSeriesEncodeForNameBased;

var LegendVisualProvider = __webpack_require__("c4a3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var FunnelSeries = echarts.extendSeriesModel({
  type: 'series.funnel',
  init: function (option) {
    FunnelSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(bind(this.getData, this), bind(this.getRawData, this)); // Extend labelLine emphasis

    this._defaultLabelLine(option);
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
  },
  _defaultLabelLine: function (option) {
    // Extend labelLine emphasis
    defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine; // Not show label line if `label.normal.show = false`

    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  },
  // Overwrite
  getDataParams: function (dataIndex) {
    var data = this.getData();
    var params = FunnelSeries.superCall(this, 'getDataParams', dataIndex);
    var valueDim = data.mapDimension('value');
    var sum = data.getSum(valueDim); // Percent is 0 if sum is 0

    params.percent = !sum ? 0 : +(data.get(valueDim, dataIndex) / sum * 100).toFixed(2);
    params.$vars.push('percent');
    return params;
  },
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    legendHoverLink: true,
    left: 80,
    top: 60,
    right: 80,
    bottom: 60,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    // 默认取数据最小最大值
    // min: 0,
    // max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    // 'ascending', 'descending'
    gap: 0,
    funnelAlign: 'center',
    label: {
      show: true,
      position: 'outer' // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调

    },
    labelLine: {
      show: true,
      length: 20,
      lineStyle: {
        // color: 各异,
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      // color: 各异,
      borderColor: '#fff',
      borderWidth: 1
    },
    emphasis: {
      label: {
        show: true
      }
    }
  }
});
var _default = FunnelSeries;
module.exports = _default;

/***/ }),

/***/ "1111":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("67a8");

__webpack_require__("4784");

var visualSymbol = __webpack_require__("7f96");

var layoutPoints = __webpack_require__("87c3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerVisual(visualSymbol('effectScatter', 'circle'));
echarts.registerLayout(layoutPoints('effectScatter'));

/***/ }),

/***/ "24b9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var layout = __webpack_require__("f934");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;
var linearMap = _number.linearMap;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function getSortedIndices(data, sort) {
  var valueDim = data.mapDimension('value');
  var valueArr = data.mapArray(valueDim, function (val) {
    return val;
  });
  var indices = [];
  var isAscending = sort === 'ascending';

  for (var i = 0, len = data.count(); i < len; i++) {
    indices[i] = i;
  } // Add custom sortable function & none sortable opetion by "options.sort"


  if (typeof sort === 'function') {
    indices.sort(sort);
  } else if (sort !== 'none') {
    indices.sort(function (a, b) {
      return isAscending ? valueArr[a] - valueArr[b] : valueArr[b] - valueArr[a];
    });
  }

  return indices;
}

function labelLayout(data) {
  data.each(function (idx) {
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel('label');
    var labelPosition = labelModel.get('position');
    var labelLineModel = itemModel.getModel('labelLine');
    var layout = data.getItemLayout(idx);
    var points = layout.points;
    var isLabelInside = labelPosition === 'inner' || labelPosition === 'inside' || labelPosition === 'center' || labelPosition === 'insideLeft' || labelPosition === 'insideRight';
    var textAlign;
    var textX;
    var textY;
    var linePoints;

    if (isLabelInside) {
      if (labelPosition === 'insideLeft') {
        textX = (points[0][0] + points[3][0]) / 2 + 5;
        textY = (points[0][1] + points[3][1]) / 2;
        textAlign = 'left';
      } else if (labelPosition === 'insideRight') {
        textX = (points[1][0] + points[2][0]) / 2 - 5;
        textY = (points[1][1] + points[2][1]) / 2;
        textAlign = 'right';
      } else {
        textX = (points[0][0] + points[1][0] + points[2][0] + points[3][0]) / 4;
        textY = (points[0][1] + points[1][1] + points[2][1] + points[3][1]) / 4;
        textAlign = 'center';
      }

      linePoints = [[textX, textY], [textX, textY]];
    } else {
      var x1;
      var y1;
      var x2;
      var labelLineLen = labelLineModel.get('length');

      if (labelPosition === 'left') {
        // Left side
        x1 = (points[3][0] + points[0][0]) / 2;
        y1 = (points[3][1] + points[0][1]) / 2;
        x2 = x1 - labelLineLen;
        textX = x2 - 5;
        textAlign = 'right';
      } else if (labelPosition === 'right') {
        // Right side
        x1 = (points[1][0] + points[2][0]) / 2;
        y1 = (points[1][1] + points[2][1]) / 2;
        x2 = x1 + labelLineLen;
        textX = x2 + 5;
        textAlign = 'left';
      } else if (labelPosition === 'rightTop') {
        // RightTop side
        x1 = points[1][0];
        y1 = points[1][1];
        x2 = x1 + labelLineLen;
        textX = x2 + 5;
        textAlign = 'top';
      } else if (labelPosition === 'rightBottom') {
        // RightBottom side
        x1 = points[2][0];
        y1 = points[2][1];
        x2 = x1 + labelLineLen;
        textX = x2 + 5;
        textAlign = 'bottom';
      } else if (labelPosition === 'leftTop') {
        // LeftTop side
        x1 = points[0][0];
        y1 = points[1][1];
        x2 = x1 - labelLineLen;
        textX = x2 - 5;
        textAlign = 'right';
      } else if (labelPosition === 'leftBottom') {
        // LeftBottom side
        x1 = points[3][0];
        y1 = points[2][1];
        x2 = x1 - labelLineLen;
        textX = x2 - 5;
        textAlign = 'right';
      } else {
        // Right side
        x1 = (points[1][0] + points[2][0]) / 2;
        y1 = (points[1][1] + points[2][1]) / 2;
        x2 = x1 + labelLineLen;
        textX = x2 + 5;
        textAlign = 'left';
      }

      var y2 = y1;
      linePoints = [[x1, y1], [x2, y2]];
      textY = y2;
    }

    layout.label = {
      linePoints: linePoints,
      x: textX,
      y: textY,
      verticalAlign: 'middle',
      textAlign: textAlign,
      inside: isLabelInside
    };
  });
}

function _default(ecModel, api, payload) {
  ecModel.eachSeriesByType('funnel', function (seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var sort = seriesModel.get('sort');
    var viewRect = getViewRect(seriesModel, api);
    var indices = getSortedIndices(data, sort);
    var sizeExtent = [parsePercent(seriesModel.get('minSize'), viewRect.width), parsePercent(seriesModel.get('maxSize'), viewRect.width)];
    var dataExtent = data.getDataExtent(valueDim);
    var min = seriesModel.get('min');
    var max = seriesModel.get('max');

    if (min == null) {
      min = Math.min(dataExtent[0], 0);
    }

    if (max == null) {
      max = dataExtent[1];
    }

    var funnelAlign = seriesModel.get('funnelAlign');
    var gap = seriesModel.get('gap');
    var itemHeight = (viewRect.height - gap * (data.count() - 1)) / data.count();
    var y = viewRect.y;

    var getLinePoints = function (idx, offY) {
      // End point index is data.count() and we assign it 0
      var val = data.get(valueDim, idx) || 0;
      var itemWidth = linearMap(val, [min, max], sizeExtent, true);
      var x0;

      switch (funnelAlign) {
        case 'left':
          x0 = viewRect.x;
          break;

        case 'center':
          x0 = viewRect.x + (viewRect.width - itemWidth) / 2;
          break;

        case 'right':
          x0 = viewRect.x + viewRect.width - itemWidth;
          break;
      }

      return [[x0, offY], [x0 + itemWidth, offY]];
    };

    if (sort === 'ascending') {
      // From bottom to top
      itemHeight = -itemHeight;
      gap = -gap;
      y += viewRect.height;
      indices = indices.reverse();
    }

    for (var i = 0; i < indices.length; i++) {
      var idx = indices[i];
      var nextIdx = indices[i + 1];
      var itemModel = data.getItemModel(idx);
      var height = itemModel.get('itemStyle.height');

      if (height == null) {
        height = itemHeight;
      } else {
        height = parsePercent(height, viewRect.height);

        if (sort === 'ascending') {
          height = -height;
        }
      }

      var start = getLinePoints(idx, y);
      var end = getLinePoints(nextIdx, y + height);
      y += height + gap;
      data.setItemLayout(idx, {
        points: start.concat(end.slice().reverse())
      });
    }

    labelLayout(data);
  });
}

module.exports = _default;

/***/ }),

/***/ "4784":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var SymbolDraw = __webpack_require__("f706");

var EffectSymbol = __webpack_require__("c8ef");

var matrix = __webpack_require__("1687");

var pointsLayout = __webpack_require__("87c3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'effectScatter',
  init: function () {
    this._symbolDraw = new SymbolDraw(EffectSymbol);
  },
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var effectSymbolDraw = this._symbolDraw;
    effectSymbolDraw.updateData(data);
    this.group.add(effectSymbolDraw.group);
  },
  updateTransform: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    this.group.dirty();
    var res = pointsLayout().reset(seriesModel);

    if (res.progress) {
      res.progress({
        start: 0,
        end: data.count()
      }, data);
    }

    this._symbolDraw.updateLayout(data);
  },
  _updateGroupTransform: function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys && coordSys.getRoamTransform) {
      this.group.transform = matrix.clone(coordSys.getRoamTransform());
      this.group.decomposeTransform();
    }
  },
  remove: function (ecModel, api) {
    this._symbolDraw && this._symbolDraw.remove(api);
  },
  dispose: function () {}
});

module.exports = _default;

/***/ }),

/***/ "4d62":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var zrUtil = __webpack_require__("6d8b");

var ChartView = __webpack_require__("e887");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Piece of pie including Sector, Label, LabelLine
 * @constructor
 * @extends {module:zrender/graphic/Group}
 */
function FunnelPiece(data, idx) {
  graphic.Group.call(this);
  var polygon = new graphic.Polygon();
  var labelLine = new graphic.Polyline();
  var text = new graphic.Text();
  this.add(polygon);
  this.add(labelLine);
  this.add(text);

  this.highDownOnUpdate = function (fromState, toState) {
    if (toState === 'emphasis') {
      labelLine.ignore = labelLine.hoverIgnore;
      text.ignore = text.hoverIgnore;
    } else {
      labelLine.ignore = labelLine.normalIgnore;
      text.ignore = text.normalIgnore;
    }
  };

  this.updateData(data, idx, true);
}

var funnelPieceProto = FunnelPiece.prototype;
var opacityAccessPath = ['itemStyle', 'opacity'];

funnelPieceProto.updateData = function (data, idx, firstCreate) {
  var polygon = this.childAt(0);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var opacity = data.getItemModel(idx).get(opacityAccessPath);
  opacity = opacity == null ? 1 : opacity; // Reset style

  polygon.useStyle({});

  if (firstCreate) {
    polygon.setShape({
      points: layout.points
    });
    polygon.setStyle({
      opacity: 0
    });
    graphic.initProps(polygon, {
      style: {
        opacity: opacity
      }
    }, seriesModel, idx);
  } else {
    graphic.updateProps(polygon, {
      style: {
        opacity: opacity
      },
      shape: {
        points: layout.points
      }
    }, seriesModel, idx);
  } // Update common style


  var itemStyleModel = itemModel.getModel('itemStyle');
  var visualColor = data.getItemVisual(idx, 'color');
  polygon.setStyle(zrUtil.defaults({
    lineJoin: 'round',
    fill: visualColor
  }, itemStyleModel.getItemStyle(['opacity'])));
  polygon.hoverStyle = itemStyleModel.getModel('emphasis').getItemStyle();

  this._updateLabel(data, idx);

  graphic.setHoverStyle(this);
};

funnelPieceProto._updateLabel = function (data, idx) {
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var labelLayout = layout.label;
  var visualColor = data.getItemVisual(idx, 'color');
  graphic.updateProps(labelLine, {
    shape: {
      points: labelLayout.linePoints || labelLayout.linePoints
    }
  }, seriesModel, idx);
  graphic.updateProps(labelText, {
    style: {
      x: labelLayout.x,
      y: labelLayout.y
    }
  }, seriesModel, idx);
  labelText.attr({
    rotation: labelLayout.rotation,
    origin: [labelLayout.x, labelLayout.y],
    z2: 10
  });
  var labelModel = itemModel.getModel('label');
  var labelHoverModel = itemModel.getModel('emphasis.label');
  var labelLineModel = itemModel.getModel('labelLine');
  var labelLineHoverModel = itemModel.getModel('emphasis.labelLine');
  var visualColor = data.getItemVisual(idx, 'color');
  graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, labelHoverModel, {
    labelFetcher: data.hostModel,
    labelDataIndex: idx,
    defaultText: data.getName(idx),
    autoColor: visualColor,
    useInsideStyle: !!labelLayout.inside
  }, {
    textAlign: labelLayout.textAlign,
    textVerticalAlign: labelLayout.verticalAlign
  });
  labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
  labelText.hoverIgnore = !labelHoverModel.get('show');
  labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
  labelLine.hoverIgnore = !labelLineHoverModel.get('show'); // Default use item visual color

  labelLine.setStyle({
    stroke: visualColor
  });
  labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());
  labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();
};

zrUtil.inherits(FunnelPiece, graphic.Group);
var FunnelView = ChartView.extend({
  type: 'funnel',
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    data.diff(oldData).add(function (idx) {
      var funnelPiece = new FunnelPiece(data, idx);
      data.setItemGraphicEl(idx, funnelPiece);
      group.add(funnelPiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);
      piePiece.updateData(data, newIdx);
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      group.remove(piePiece);
    }).execute();
    this._data = data;
  },
  remove: function () {
    this.group.removeAll();
    this._data = null;
  },
  dispose: function () {}
});
var _default = FunnelView;
module.exports = _default;

/***/ }),

/***/ "67a8":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

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
  type: 'series.effectScatter',
  dependencies: ['grid', 'polar'],
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this, {
      useEncodeDefaulter: true
    });
  },
  brushSelector: 'point',
  defaultOption: {
    coordinateSystem: 'cartesian2d',
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    effectType: 'ripple',
    progressive: 0,
    // When to show the effect, option: 'render'|'emphasis'
    showEffectOn: 'render',
    // Ripple effect config
    rippleEffect: {
      period: 4,
      // Scale of ripple
      scale: 2.5,
      // Brush type can be fill or stroke
      brushType: 'fill'
    },
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // Polar coordinate system
    // polarIndex: 0,
    // Geo coordinate system
    // geoIndex: 0,
    // symbol: null,        // 图形类型
    symbolSize: 10 // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
    // symbolRotate: null,  // 图形旋转控制
    // large: false,
    // Available when large is true
    // largeThreshold: 2000,
    // itemStyle: {
    //     opacity: 1
    // }

  }
});

module.exports = _default;

/***/ }),

/***/ "a4b1":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("00ba");

__webpack_require__("4d62");

var dataColor = __webpack_require__("98e7");

var funnelLayout = __webpack_require__("24b9");

var dataFilter = __webpack_require__("d3f4");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerVisual(dataColor('funnel'));
echarts.registerLayout(funnelLayout);
echarts.registerProcessor(dataFilter('funnel'));

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~ec219104.dc955e43.js.map