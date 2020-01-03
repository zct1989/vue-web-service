(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~ed9be1e3"],{

/***/ "0046":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var each = _util.each;
var createHashMap = _util.createHashMap;

var SeriesModel = __webpack_require__("4f85");

var createListFromArray = __webpack_require__("3301");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'series.parallel',
  dependencies: ['parallel'],
  visualColorAccessPath: 'lineStyle.color',
  getInitialData: function (option, ecModel) {
    var source = this.getSource();
    setEncodeAndDimensions(source, this);
    return createListFromArray(source, this);
  },

  /**
   * User can get data raw indices on 'axisAreaSelected' event received.
   *
   * @public
   * @param {string} activeState 'active' or 'inactive' or 'normal'
   * @return {Array.<number>} Raw indices
   */
  getRawIndicesByActiveState: function (activeState) {
    var coordSys = this.coordinateSystem;
    var data = this.getData();
    var indices = [];
    coordSys.eachActiveState(data, function (theActiveState, dataIndex) {
      if (activeState === theActiveState) {
        indices.push(data.getRawIndex(dataIndex));
      }
    });
    return indices;
  },
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    coordinateSystem: 'parallel',
    parallelIndex: 0,
    label: {
      show: false
    },
    inactiveOpacity: 0.05,
    activeOpacity: 1,
    lineStyle: {
      width: 1,
      opacity: 0.45,
      type: 'solid'
    },
    emphasis: {
      label: {
        show: false
      }
    },
    progressive: 500,
    smooth: false,
    // true | false | number
    animationEasing: 'linear'
  }
});

function setEncodeAndDimensions(source, seriesModel) {
  // The mapping of parallelAxis dimension to data dimension can
  // be specified in parallelAxis.option.dim. For example, if
  // parallelAxis.option.dim is 'dim3', it mapping to the third
  // dimension of data. But `data.encode` has higher priority.
  // Moreover, parallelModel.dimension should not be regarded as data
  // dimensions. Consider dimensions = ['dim4', 'dim2', 'dim6'];
  if (source.encodeDefine) {
    return;
  }

  var parallelModel = seriesModel.ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));

  if (!parallelModel) {
    return;
  }

  var encodeDefine = source.encodeDefine = createHashMap();
  each(parallelModel.dimensions, function (axisDim) {
    var dataDimIndex = convertDimNameToNumber(axisDim);
    encodeDefine.set(axisDim, dataDimIndex);
  });
}

function convertDimNameToNumber(dimName) {
  return +dimName.replace('dim', '');
}

module.exports = _default;

/***/ }),

/***/ "0817":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("f306");

__webpack_require__("0046");

__webpack_require__("60d7");

var parallelVisual = __webpack_require__("ab71");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerVisual(parallelVisual);

/***/ }),

/***/ "1466":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var graphic = __webpack_require__("2306");

var zrUtil = __webpack_require__("6d8b");

var symbolUtil = __webpack_require__("a15a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function normalizeSymbolSize(symbolSize) {
  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [+symbolSize, +symbolSize];
  }

  return symbolSize;
}

var _default = echarts.extendChartView({
  type: 'radar',
  render: function (seriesModel, ecModel, api) {
    var polar = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;

    function createSymbol(data, idx) {
      var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
      var color = data.getItemVisual(idx, 'color');

      if (symbolType === 'none') {
        return;
      }

      var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
      var symbolPath = symbolUtil.createSymbol(symbolType, -1, -1, 2, 2, color);
      symbolPath.attr({
        style: {
          strokeNoScale: true
        },
        z2: 100,
        scale: [symbolSize[0] / 2, symbolSize[1] / 2]
      });
      return symbolPath;
    }

    function updateSymbols(oldPoints, newPoints, symbolGroup, data, idx, isInit) {
      // Simply rerender all
      symbolGroup.removeAll();

      for (var i = 0; i < newPoints.length - 1; i++) {
        var symbolPath = createSymbol(data, idx);

        if (symbolPath) {
          symbolPath.__dimIdx = i;

          if (oldPoints[i]) {
            symbolPath.attr('position', oldPoints[i]);
            graphic[isInit ? 'initProps' : 'updateProps'](symbolPath, {
              position: newPoints[i]
            }, seriesModel, idx);
          } else {
            symbolPath.attr('position', newPoints[i]);
          }

          symbolGroup.add(symbolPath);
        }
      }
    }

    function getInitialPoints(points) {
      return zrUtil.map(points, function (pt) {
        return [polar.cx, polar.cy];
      });
    }

    data.diff(oldData).add(function (idx) {
      var points = data.getItemLayout(idx);

      if (!points) {
        return;
      }

      var polygon = new graphic.Polygon();
      var polyline = new graphic.Polyline();
      var target = {
        shape: {
          points: points
        }
      };
      polygon.shape.points = getInitialPoints(points);
      polyline.shape.points = getInitialPoints(points);
      graphic.initProps(polygon, target, seriesModel, idx);
      graphic.initProps(polyline, target, seriesModel, idx);
      var itemGroup = new graphic.Group();
      var symbolGroup = new graphic.Group();
      itemGroup.add(polyline);
      itemGroup.add(polygon);
      itemGroup.add(symbolGroup);
      updateSymbols(polyline.shape.points, points, symbolGroup, data, idx, true);
      data.setItemGraphicEl(idx, itemGroup);
    }).update(function (newIdx, oldIdx) {
      var itemGroup = oldData.getItemGraphicEl(oldIdx);
      var polyline = itemGroup.childAt(0);
      var polygon = itemGroup.childAt(1);
      var symbolGroup = itemGroup.childAt(2);
      var target = {
        shape: {
          points: data.getItemLayout(newIdx)
        }
      };

      if (!target.shape.points) {
        return;
      }

      updateSymbols(polyline.shape.points, target.shape.points, symbolGroup, data, newIdx, false);
      graphic.updateProps(polyline, target, seriesModel);
      graphic.updateProps(polygon, target, seriesModel);
      data.setItemGraphicEl(newIdx, itemGroup);
    }).remove(function (idx) {
      group.remove(oldData.getItemGraphicEl(idx));
    }).execute();
    data.eachItemGraphicEl(function (itemGroup, idx) {
      var itemModel = data.getItemModel(idx);
      var polyline = itemGroup.childAt(0);
      var polygon = itemGroup.childAt(1);
      var symbolGroup = itemGroup.childAt(2);
      var color = data.getItemVisual(idx, 'color');
      group.add(itemGroup);
      polyline.useStyle(zrUtil.defaults(itemModel.getModel('lineStyle').getLineStyle(), {
        fill: 'none',
        stroke: color
      }));
      polyline.hoverStyle = itemModel.getModel('emphasis.lineStyle').getLineStyle();
      var areaStyleModel = itemModel.getModel('areaStyle');
      var hoverAreaStyleModel = itemModel.getModel('emphasis.areaStyle');
      var polygonIgnore = areaStyleModel.isEmpty() && areaStyleModel.parentModel.isEmpty();
      var hoverPolygonIgnore = hoverAreaStyleModel.isEmpty() && hoverAreaStyleModel.parentModel.isEmpty();
      hoverPolygonIgnore = hoverPolygonIgnore && polygonIgnore;
      polygon.ignore = polygonIgnore;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: color,
        opacity: 0.7
      }));
      polygon.hoverStyle = hoverAreaStyleModel.getAreaStyle();
      var itemStyle = itemModel.getModel('itemStyle').getItemStyle(['color']);
      var itemHoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
      var labelModel = itemModel.getModel('label');
      var labelHoverModel = itemModel.getModel('emphasis.label');
      symbolGroup.eachChild(function (symbolPath) {
        symbolPath.setStyle(itemStyle);
        symbolPath.hoverStyle = zrUtil.clone(itemHoverStyle);
        var defaultText = data.get(data.dimensions[symbolPath.__dimIdx], idx);
        (defaultText == null || isNaN(defaultText)) && (defaultText = '');
        graphic.setLabelStyle(symbolPath.style, symbolPath.hoverStyle, labelModel, labelHoverModel, {
          labelFetcher: data.hostModel,
          labelDataIndex: idx,
          labelDimIndex: symbolPath.__dimIdx,
          defaultText: defaultText,
          autoColor: color,
          isRectText: true
        });
      });

      itemGroup.highDownOnUpdate = function (fromState, toState) {
        polygon.attr('ignore', toState === 'emphasis' ? hoverPolygonIgnore : polygonIgnore);
      };

      graphic.setHoverStyle(itemGroup);
    });
    this._data = data;
  },
  remove: function () {
    this.group.removeAll();
    this._data = null;
  },
  dispose: function () {}
});

module.exports = _default;

/***/ }),

/***/ "1ab3":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @param {module:echarts/model/Series} seriesModel
 * @param {boolean} hasAnimation
 * @inner
 */
function updateDataSelected(uid, seriesModel, hasAnimation, api) {
  var data = seriesModel.getData();
  var dataIndex = this.dataIndex;
  var name = data.getName(dataIndex);
  var selectedOffset = seriesModel.get('selectedOffset');
  api.dispatchAction({
    type: 'pieToggleSelect',
    from: uid,
    name: name,
    seriesId: seriesModel.id
  });
  data.each(function (idx) {
    toggleItemSelected(data.getItemGraphicEl(idx), data.getItemLayout(idx), seriesModel.isSelected(data.getName(idx)), selectedOffset, hasAnimation);
  });
}
/**
 * @param {module:zrender/graphic/Sector} el
 * @param {Object} layout
 * @param {boolean} isSelected
 * @param {number} selectedOffset
 * @param {boolean} hasAnimation
 * @inner
 */


function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
  var midAngle = (layout.startAngle + layout.endAngle) / 2;
  var dx = Math.cos(midAngle);
  var dy = Math.sin(midAngle);
  var offset = isSelected ? selectedOffset : 0;
  var position = [dx * offset, dy * offset];
  hasAnimation // animateTo will stop revious animation like update transition
  ? el.animate().when(200, {
    position: position
  }).start('bounceOut') : el.attr('position', position);
}
/**
 * Piece of pie including Sector, Label, LabelLine
 * @constructor
 * @extends {module:zrender/graphic/Group}
 */


function PiePiece(data, idx) {
  graphic.Group.call(this);
  var sector = new graphic.Sector({
    z2: 2
  });
  var polyline = new graphic.Polyline();
  var text = new graphic.Text();
  this.add(sector);
  this.add(polyline);
  this.add(text);
  this.updateData(data, idx, true);
}

var piePieceProto = PiePiece.prototype;

piePieceProto.updateData = function (data, idx, firstCreate) {
  var sector = this.childAt(0);
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var sectorShape = zrUtil.extend({}, layout);
  sectorShape.label = null;
  var animationTypeUpdate = seriesModel.getShallow('animationTypeUpdate');

  if (firstCreate) {
    sector.setShape(sectorShape);
    var animationType = seriesModel.getShallow('animationType');

    if (animationType === 'scale') {
      sector.shape.r = layout.r0;
      graphic.initProps(sector, {
        shape: {
          r: layout.r
        }
      }, seriesModel, idx);
    } // Expansion
    else {
        sector.shape.endAngle = layout.startAngle;
        graphic.updateProps(sector, {
          shape: {
            endAngle: layout.endAngle
          }
        }, seriesModel, idx);
      }
  } else {
    if (animationTypeUpdate === 'expansion') {
      // Sectors are set to be target shape and an overlaying clipPath is used for animation
      sector.setShape(sectorShape);
    } else {
      // Transition animation from the old shape
      graphic.updateProps(sector, {
        shape: sectorShape
      }, seriesModel, idx);
    }
  } // Update common style


  var visualColor = data.getItemVisual(idx, 'color');
  sector.useStyle(zrUtil.defaults({
    lineJoin: 'bevel',
    fill: visualColor
  }, itemModel.getModel('itemStyle').getItemStyle()));
  sector.hoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && sector.attr('cursor', cursorStyle); // Toggle selected

  toggleItemSelected(this, data.getItemLayout(idx), seriesModel.isSelected(null, idx), seriesModel.get('selectedOffset'), seriesModel.get('animation')); // Label and text animation should be applied only for transition type animation when update

  var withAnimation = !firstCreate && animationTypeUpdate === 'transition';

  this._updateLabel(data, idx, withAnimation);

  this.highDownOnUpdate = itemModel.get('hoverAnimation') && seriesModel.isAnimationEnabled() ? function (fromState, toState) {
    if (toState === 'emphasis') {
      labelLine.ignore = labelLine.hoverIgnore;
      labelText.ignore = labelText.hoverIgnore; // Sector may has animation of updating data. Force to move to the last frame
      // Or it may stopped on the wrong shape

      sector.stopAnimation(true);
      sector.animateTo({
        shape: {
          r: layout.r + seriesModel.get('hoverOffset')
        }
      }, 300, 'elasticOut');
    } else {
      labelLine.ignore = labelLine.normalIgnore;
      labelText.ignore = labelText.normalIgnore;
      sector.stopAnimation(true);
      sector.animateTo({
        shape: {
          r: layout.r
        }
      }, 300, 'elasticOut');
    }
  } : null;
  graphic.setHoverStyle(this);
};

piePieceProto._updateLabel = function (data, idx, withAnimation) {
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var labelLayout = layout.label;
  var visualColor = data.getItemVisual(idx, 'color');

  if (!labelLayout || isNaN(labelLayout.x) || isNaN(labelLayout.y)) {
    labelText.ignore = labelText.normalIgnore = labelText.hoverIgnore = labelLine.ignore = labelLine.normalIgnore = labelLine.hoverIgnore = true;
    return;
  }

  var targetLineShape = {
    points: labelLayout.linePoints || [[labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]]
  };
  var targetTextStyle = {
    x: labelLayout.x,
    y: labelLayout.y
  };

  if (withAnimation) {
    graphic.updateProps(labelLine, {
      shape: targetLineShape
    }, seriesModel, idx);
    graphic.updateProps(labelText, {
      style: targetTextStyle
    }, seriesModel, idx);
  } else {
    labelLine.attr({
      shape: targetLineShape
    });
    labelText.attr({
      style: targetTextStyle
    });
  }

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
    defaultText: labelLayout.text,
    autoColor: visualColor,
    useInsideStyle: !!labelLayout.inside
  }, {
    textAlign: labelLayout.textAlign,
    textVerticalAlign: labelLayout.verticalAlign,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
  labelText.hoverIgnore = !labelHoverModel.get('show');
  labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
  labelLine.hoverIgnore = !labelLineHoverModel.get('show'); // Default use item visual color

  labelLine.setStyle({
    stroke: visualColor,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());
  labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();
  var smooth = labelLineModel.get('smooth');

  if (smooth && smooth === true) {
    smooth = 0.4;
  }

  labelLine.setShape({
    smooth: smooth
  });
};

zrUtil.inherits(PiePiece, graphic.Group); // Pie view

var PieView = ChartView.extend({
  type: 'pie',
  init: function () {
    var sectorGroup = new graphic.Group();
    this._sectorGroup = sectorGroup;
  },
  render: function (seriesModel, ecModel, api, payload) {
    if (payload && payload.from === this.uid) {
      return;
    }

    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var hasAnimation = ecModel.get('animation');
    var isFirstRender = !oldData;
    var animationType = seriesModel.get('animationType');
    var animationTypeUpdate = seriesModel.get('animationTypeUpdate');
    var onSectorClick = zrUtil.curry(updateDataSelected, this.uid, seriesModel, hasAnimation, api);
    var selectedMode = seriesModel.get('selectedMode');
    data.diff(oldData).add(function (idx) {
      var piePiece = new PiePiece(data, idx); // Default expansion animation

      if (isFirstRender && animationType !== 'scale') {
        piePiece.eachChild(function (child) {
          child.stopAnimation(true);
        });
      }

      selectedMode && piePiece.on('click', onSectorClick);
      data.setItemGraphicEl(idx, piePiece);
      group.add(piePiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);

      if (!isFirstRender && animationTypeUpdate !== 'transition') {
        piePiece.eachChild(function (child) {
          child.stopAnimation(true);
        });
      }

      piePiece.updateData(data, newIdx);
      piePiece.off('click');
      selectedMode && piePiece.on('click', onSectorClick);
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      group.remove(piePiece);
    }).execute();

    if (hasAnimation && data.count() > 0 && (isFirstRender ? animationType !== 'scale' : animationTypeUpdate !== 'transition')) {
      var shape = data.getItemLayout(0);

      for (var s = 1; isNaN(shape.startAngle) && s < data.count(); ++s) {
        shape = data.getItemLayout(s);
      }

      var r = Math.max(api.getWidth(), api.getHeight()) / 2;
      var removeClipPath = zrUtil.bind(group.removeClipPath, group);
      group.setClipPath(this._createClipPath(shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel, isFirstRender));
    } else {
      // clipPath is used in first-time animation, so remove it when otherwise. See: #8994
      group.removeClipPath();
    }

    this._data = data;
  },
  dispose: function () {},
  _createClipPath: function (cx, cy, r, startAngle, clockwise, cb, seriesModel, isFirstRender) {
    var clipPath = new graphic.Sector({
      shape: {
        cx: cx,
        cy: cy,
        r0: 0,
        r: r,
        startAngle: startAngle,
        endAngle: startAngle,
        clockwise: clockwise
      }
    });
    var initOrUpdate = isFirstRender ? graphic.initProps : graphic.updateProps;
    initOrUpdate(clipPath, {
      shape: {
        endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
      }
    }, seriesModel, cb);
    return clipPath;
  },

  /**
   * @implement
   */
  containPoint: function (point, seriesModel) {
    var data = seriesModel.getData();
    var itemLayout = data.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  }
});
var _default = PieView;
module.exports = _default;

/***/ }),

/***/ "292e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;
var linearMap = _number.linearMap;

var layout = __webpack_require__("f934");

var labelLayout = __webpack_require__("bb70");

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
var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;

function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function _default(seriesType, ecModel, api, payload) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var viewRect = getViewRect(seriesModel, api);
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!zrUtil.isArray(radius)) {
      radius = [0, radius];
    }

    if (!zrUtil.isArray(center)) {
      center = [center, center];
    }

    var width = parsePercent(viewRect.width, api.getWidth());
    var height = parsePercent(viewRect.height, api.getHeight());
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width) + viewRect.x;
    var cy = parsePercent(center[1], height) + viewRect.y;
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var validDataCount = 0;
    data.each(valueDim, function (value) {
      !isNaN(value) && validDataCount++;
    });
    var sum = data.getSum(valueDim); // Sum may be 0

    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var clockwise = seriesModel.get('clockwise');
    var roseType = seriesModel.get('roseType');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum'); // [0...max]

    var extent = data.getDataExtent(valueDim);
    extent[0] = 0; // In the case some sector angle is smaller than minAngle

    var restAngle = PI2;
    var valueSumLargerThanMinAngle = 0;
    var currentAngle = startAngle;
    var dir = clockwise ? 1 : -1;
    data.each(valueDim, function (value, idx) {
      var angle;

      if (isNaN(value)) {
        data.setItemLayout(idx, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: r0,
          r: roseType ? NaN : r,
          viewRect: viewRect
        });
        return;
      } // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？


      if (roseType !== 'area') {
        angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
      } else {
        angle = PI2 / validDataCount;
      }

      if (angle < minAngle) {
        angle = minAngle;
        restAngle -= minAngle;
      } else {
        valueSumLargerThanMinAngle += value;
      }

      var endAngle = currentAngle + dir * angle;
      data.setItemLayout(idx, {
        angle: angle,
        startAngle: currentAngle,
        endAngle: endAngle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: r0,
        r: roseType ? linearMap(value, extent, [r0, r]) : r,
        viewRect: viewRect
      });
      currentAngle = endAngle;
    }); // Some sector is constrained by minAngle
    // Rest sectors needs recalculate angle

    if (restAngle < PI2 && validDataCount) {
      // Average the angle if rest angle is not enough after all angles is
      // Constrained by minAngle
      if (restAngle <= 1e-3) {
        var angle = PI2 / validDataCount;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            layout.angle = angle;
            layout.startAngle = startAngle + dir * idx * angle;
            layout.endAngle = startAngle + dir * (idx + 1) * angle;
          }
        });
      } else {
        unitRadian = restAngle / valueSumLargerThanMinAngle;
        currentAngle = startAngle;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            var angle = layout.angle === minAngle ? minAngle : value * unitRadian;
            layout.startAngle = currentAngle;
            layout.endAngle = currentAngle + dir * angle;
            currentAngle += dir * angle;
          }
        });
      }
    }

    labelLayout(seriesModel, r, viewRect.width, viewRect.height, viewRect.x, viewRect.y);
  });
}

module.exports = _default;

/***/ }),

/***/ "4e10":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var createListSimply = __webpack_require__("e46b");

var SeriesModel = __webpack_require__("4f85");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;
var addCommas = _format.addCommas;

var dataSelectableMixin = __webpack_require__("7023");

var _dataProvider = __webpack_require__("2b17");

var retrieveRawAttr = _dataProvider.retrieveRawAttr;

var geoSourceManager = __webpack_require__("5b87");

var _sourceHelper = __webpack_require__("0f99");

var makeSeriesEncodeForNameBased = _sourceHelper.makeSeriesEncodeForNameBased;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var MapSeries = SeriesModel.extend({
  type: 'series.map',
  dependencies: ['geo'],
  layoutMode: 'box',

  /**
   * Only first map series of same mapType will drawMap
   * @type {boolean}
   */
  needsDrawMap: false,

  /**
   * Group of all map series with same mapType
   * @type {boolean}
   */
  seriesGroup: [],
  getInitialData: function (option) {
    var data = createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
    var valueDim = data.mapDimension('value');
    var dataNameMap = zrUtil.createHashMap();
    var selectTargetList = [];
    var toAppendNames = [];

    for (var i = 0, len = data.count(); i < len; i++) {
      var name = data.getName(i);
      dataNameMap.set(name, true);
      selectTargetList.push({
        name: name,
        value: data.get(valueDim, i),
        selected: retrieveRawAttr(data, i, 'selected')
      });
    }

    var geoSource = geoSourceManager.load(this.getMapType(), this.option.nameMap);
    zrUtil.each(geoSource.regions, function (region) {
      var name = region.name;

      if (!dataNameMap.get(name)) {
        selectTargetList.push({
          name: name
        });
        toAppendNames.push(name);
      }
    });
    this.updateSelectedMap(selectTargetList); // Complete data with missing regions. The consequent processes (like visual
    // map and render) can not be performed without a "full data". For example,
    // find `dataIndex` by name.

    data.appendValues([], toAppendNames);
    return data;
  },

  /**
   * If no host geo model, return null, which means using a
   * inner exclusive geo model.
   */
  getHostGeoModel: function () {
    var geoIndex = this.option.geoIndex;
    return geoIndex != null ? this.dependentModels.geo[geoIndex] : null;
  },
  getMapType: function () {
    return (this.getHostGeoModel() || this).option.map;
  },
  // _fillOption: function (option, mapName) {
  // Shallow clone
  // option = zrUtil.extend({}, option);
  // option.data = geoCreator.getFilledRegions(option.data, mapName, option.nameMap);
  // return option;
  // },
  getRawValue: function (dataIndex) {
    // Use value stored in data instead because it is calculated from multiple series
    // FIXME Provide all value of multiple series ?
    var data = this.getData();
    return data.get(data.mapDimension('value'), dataIndex);
  },

  /**
   * Get model of region
   * @param  {string} name
   * @return {module:echarts/model/Model}
   */
  getRegionModel: function (regionName) {
    var data = this.getData();
    return data.getItemModel(data.indexOfName(regionName));
  },

  /**
   * Map tooltip formatter
   *
   * @param {number} dataIndex
   */
  formatTooltip: function (dataIndex) {
    // FIXME orignalData and data is a bit confusing
    var data = this.getData();
    var formattedValue = addCommas(this.getRawValue(dataIndex));
    var name = data.getName(dataIndex);
    var seriesGroup = this.seriesGroup;
    var seriesNames = [];

    for (var i = 0; i < seriesGroup.length; i++) {
      var otherIndex = seriesGroup[i].originalData.indexOfName(name);
      var valueDim = data.mapDimension('value');

      if (!isNaN(seriesGroup[i].originalData.get(valueDim, otherIndex))) {
        seriesNames.push(encodeHTML(seriesGroup[i].name));
      }
    }

    return seriesNames.join(', ') + '<br />' + encodeHTML(name + ' : ' + formattedValue);
  },

  /**
   * @implement
   */
  getTooltipPosition: function (dataIndex) {
    if (dataIndex != null) {
      var name = this.getData().getName(dataIndex);
      var geo = this.coordinateSystem;
      var region = geo.getRegion(name);
      return region && geo.dataToPoint(region.center);
    }
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  },
  defaultOption: {
    // 一级层叠
    zlevel: 0,
    // 二级层叠
    z: 2,
    coordinateSystem: 'geo',
    // map should be explicitly specified since ec3.
    map: '',
    // If `geoIndex` is not specified, a exclusive geo will be
    // created. Otherwise use the specified geo component, and
    // `map` and `mapType` are ignored.
    // geoIndex: 0,
    // 'center' | 'left' | 'right' | 'x%' | {number}
    left: 'center',
    // 'center' | 'top' | 'bottom' | 'x%' | {number}
    top: 'center',
    // right
    // bottom
    // width:
    // height
    // Aspect is width / height. Inited to be geoJson bbox aspect
    // This parameter is used for scale this aspect
    aspectScale: 0.75,
    ///// Layout with center and size
    // If you wan't to put map in a fixed size box with right aspect ratio
    // This two properties may more conveninet
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    // 数值合并方式，默认加和，可选为：
    // 'sum' | 'average' | 'max' | 'min'
    // mapValueCalculation: 'sum',
    // 地图数值计算结果小数精度
    // mapValuePrecision: 0,
    // 显示图例颜色标识（系列标识的小圆点），图例开启时有效
    showLegendSymbol: true,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    dataRangeHoverLink: true,
    // 是否开启缩放及漫游模式
    // roam: false,
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ],
    // higher priority than center and zoom
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    label: {
      show: false,
      color: '#000'
    },
    // scaleLimit: null,
    itemStyle: {
      borderWidth: 0.5,
      borderColor: '#444',
      areaColor: '#eee'
    },
    emphasis: {
      label: {
        show: true,
        color: 'rgb(100,0,0)'
      },
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)'
      }
    }
  }
});
zrUtil.mixin(MapSeries, dataSelectableMixin);
var _default = MapSeries;
module.exports = _default;

/***/ }),

/***/ "54fb":
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
  ecModel.eachSeriesByType('map', function (seriesModel) {
    var colorList = seriesModel.get('color');
    var itemStyleModel = seriesModel.getModel('itemStyle');
    var areaColor = itemStyleModel.get('areaColor');
    var color = itemStyleModel.get('color') || colorList[seriesModel.seriesIndex % colorList.length];
    seriesModel.getData().setVisual({
      'areaColor': areaColor,
      'color': color
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "60d7":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var DEFAULT_SMOOTH = 0.3;
var ParallelView = ChartView.extend({
  type: 'parallel',
  init: function () {
    /**
     * @type {module:zrender/container/Group}
     * @private
     */
    this._dataGroup = new graphic.Group();
    this.group.add(this._dataGroup);
    /**
     * @type {module:echarts/data/List}
     */

    this._data;
    /**
     * @type {boolean}
     */

    this._initialized;
  },

  /**
   * @override
   */
  render: function (seriesModel, ecModel, api, payload) {
    var dataGroup = this._dataGroup;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coordSys = seriesModel.coordinateSystem;
    var dimensions = coordSys.dimensions;
    var seriesScope = makeSeriesScope(seriesModel);
    data.diff(oldData).add(add).update(update).remove(remove).execute();

    function add(newDataIndex) {
      var line = addEl(data, dataGroup, newDataIndex, dimensions, coordSys);
      updateElCommon(line, data, newDataIndex, seriesScope);
    }

    function update(newDataIndex, oldDataIndex) {
      var line = oldData.getItemGraphicEl(oldDataIndex);
      var points = createLinePoints(data, newDataIndex, dimensions, coordSys);
      data.setItemGraphicEl(newDataIndex, line);
      var animationModel = payload && payload.animation === false ? null : seriesModel;
      graphic.updateProps(line, {
        shape: {
          points: points
        }
      }, animationModel, newDataIndex);
      updateElCommon(line, data, newDataIndex, seriesScope);
    }

    function remove(oldDataIndex) {
      var line = oldData.getItemGraphicEl(oldDataIndex);
      dataGroup.remove(line);
    } // First create


    if (!this._initialized) {
      this._initialized = true;
      var clipPath = createGridClipShape(coordSys, seriesModel, function () {
        // Callback will be invoked immediately if there is no animation
        setTimeout(function () {
          dataGroup.removeClipPath();
        });
      });
      dataGroup.setClipPath(clipPath);
    }

    this._data = data;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this._initialized = true;
    this._data = null;

    this._dataGroup.removeAll();
  },
  incrementalRender: function (taskParams, seriesModel, ecModel) {
    var data = seriesModel.getData();
    var coordSys = seriesModel.coordinateSystem;
    var dimensions = coordSys.dimensions;
    var seriesScope = makeSeriesScope(seriesModel);

    for (var dataIndex = taskParams.start; dataIndex < taskParams.end; dataIndex++) {
      var line = addEl(data, this._dataGroup, dataIndex, dimensions, coordSys);
      line.incremental = true;
      updateElCommon(line, data, dataIndex, seriesScope);
    }
  },
  dispose: function () {},
  // _renderForProgressive: function (seriesModel) {
  //     var dataGroup = this._dataGroup;
  //     var data = seriesModel.getData();
  //     var oldData = this._data;
  //     var coordSys = seriesModel.coordinateSystem;
  //     var dimensions = coordSys.dimensions;
  //     var option = seriesModel.option;
  //     var progressive = option.progressive;
  //     var smooth = option.smooth ? SMOOTH : null;
  //     // In progressive animation is disabled, so use simple data diff,
  //     // which effects performance less.
  //     // (Typically performance for data with length 7000+ like:
  //     // simpleDiff: 60ms, addEl: 184ms,
  //     // in RMBP 2.4GHz intel i7, OSX 10.9 chrome 50.0.2661.102 (64-bit))
  //     if (simpleDiff(oldData, data, dimensions)) {
  //         dataGroup.removeAll();
  //         data.each(function (dataIndex) {
  //             addEl(data, dataGroup, dataIndex, dimensions, coordSys);
  //         });
  //     }
  //     updateElCommon(data, progressive, smooth);
  //     // Consider switch between progressive and not.
  //     data.__plProgressive = true;
  //     this._data = data;
  // },

  /**
   * @override
   */
  remove: function () {
    this._dataGroup && this._dataGroup.removeAll();
    this._data = null;
  }
});

function createGridClipShape(coordSys, seriesModel, cb) {
  var parallelModel = coordSys.model;
  var rect = coordSys.getRect();
  var rectEl = new graphic.Rect({
    shape: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    }
  });
  var dim = parallelModel.get('layout') === 'horizontal' ? 'width' : 'height';
  rectEl.setShape(dim, 0);
  graphic.initProps(rectEl, {
    shape: {
      width: rect.width,
      height: rect.height
    }
  }, seriesModel, cb);
  return rectEl;
}

function createLinePoints(data, dataIndex, dimensions, coordSys) {
  var points = [];

  for (var i = 0; i < dimensions.length; i++) {
    var dimName = dimensions[i];
    var value = data.get(data.mapDimension(dimName), dataIndex);

    if (!isEmptyValue(value, coordSys.getAxis(dimName).type)) {
      points.push(coordSys.dataToPoint(value, dimName));
    }
  }

  return points;
}

function addEl(data, dataGroup, dataIndex, dimensions, coordSys) {
  var points = createLinePoints(data, dataIndex, dimensions, coordSys);
  var line = new graphic.Polyline({
    shape: {
      points: points
    },
    silent: true,
    z2: 10
  });
  dataGroup.add(line);
  data.setItemGraphicEl(dataIndex, line);
  return line;
}

function makeSeriesScope(seriesModel) {
  var smooth = seriesModel.get('smooth', true);
  smooth === true && (smooth = DEFAULT_SMOOTH);
  return {
    lineStyle: seriesModel.getModel('lineStyle').getLineStyle(),
    smooth: smooth != null ? smooth : DEFAULT_SMOOTH
  };
}

function updateElCommon(el, data, dataIndex, seriesScope) {
  var lineStyle = seriesScope.lineStyle;

  if (data.hasItemOption) {
    var lineStyleModel = data.getItemModel(dataIndex).getModel('lineStyle');
    lineStyle = lineStyleModel.getLineStyle();
  }

  el.useStyle(lineStyle);
  var elStyle = el.style;
  elStyle.fill = null; // lineStyle.color have been set to itemVisual in module:echarts/visual/seriesColor.

  elStyle.stroke = data.getItemVisual(dataIndex, 'color'); // lineStyle.opacity have been set to itemVisual in parallelVisual.

  elStyle.opacity = data.getItemVisual(dataIndex, 'opacity');
  seriesScope.smooth && (el.shape.smooth = seriesScope.smooth);
} // function simpleDiff(oldData, newData, dimensions) {
//     var oldLen;
//     if (!oldData
//         || !oldData.__plProgressive
//         || (oldLen = oldData.count()) !== newData.count()
//     ) {
//         return true;
//     }
//     var dimLen = dimensions.length;
//     for (var i = 0; i < oldLen; i++) {
//         for (var j = 0; j < dimLen; j++) {
//             if (oldData.get(dimensions[j], i) !== newData.get(dimensions[j], i)) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// FIXME
// 公用方法?


function isEmptyValue(val, axisType) {
  return axisType === 'category' ? val == null : val == null || isNaN(val); // axisType === 'value'
}

var _default = ParallelView;
module.exports = _default;

/***/ }),

/***/ "675c":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("4e10");

__webpack_require__("a666");

__webpack_require__("49e8");

__webpack_require__("eeea");

var mapSymbolLayout = __webpack_require__("cee1");

var mapVisual = __webpack_require__("54fb");

var mapDataStatistic = __webpack_require__("f6ed");

var backwardCompat = __webpack_require__("9442");

var createDataSelectAction = __webpack_require__("7782");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
echarts.registerLayout(mapSymbolLayout);
echarts.registerVisual(mapVisual);
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, mapDataStatistic);
echarts.registerPreprocessor(backwardCompat);
createDataSelectAction('map', [{
  type: 'mapToggleSelect',
  event: 'mapselectchanged',
  method: 'toggleSelected'
}, {
  type: 'mapSelect',
  event: 'mapselected',
  method: 'select'
}, {
  type: 'mapUnSelect',
  event: 'mapunselected',
  method: 'unSelect'
}]);

/***/ }),

/***/ "7891":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
// Backward compat for radar chart in 2
function _default(option) {
  var polarOptArr = option.polar;

  if (polarOptArr) {
    if (!zrUtil.isArray(polarOptArr)) {
      polarOptArr = [polarOptArr];
    }

    var polarNotRadar = [];
    zrUtil.each(polarOptArr, function (polarOpt, idx) {
      if (polarOpt.indicator) {
        if (polarOpt.type && !polarOpt.shape) {
          polarOpt.shape = polarOpt.type;
        }

        option.radar = option.radar || [];

        if (!zrUtil.isArray(option.radar)) {
          option.radar = [option.radar];
        }

        option.radar.push(polarOpt);
      } else {
        polarNotRadar.push(polarOpt);
      }
    });
    option.polar = polarNotRadar;
  }

  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'radar' && seriesOpt.polarIndex) {
      seriesOpt.radarIndex = seriesOpt.polarIndex;
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "870e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
function _default(ecModel) {
  ecModel.eachSeriesByType('radar', function (seriesModel) {
    var data = seriesModel.getData();
    var points = [];
    var coordSys = seriesModel.coordinateSystem;

    if (!coordSys) {
      return;
    }

    var axes = coordSys.getIndicatorAxes();
    zrUtil.each(axes, function (axis, axisIndex) {
      data.each(data.mapDimension(axes[axisIndex].dim), function (val, dataIndex) {
        points[dataIndex] = points[dataIndex] || [];
        var point = coordSys.dataToPoint(val, axisIndex);
        points[dataIndex][axisIndex] = isValidPoint(point) ? point : getValueMissingPoint(coordSys);
      });
    }); // Close polygon

    data.each(function (idx) {
      // TODO
      // Is it appropriate to connect to the next data when some data is missing?
      // Or, should trade it like `connectNull` in line chart?
      var firstPoint = zrUtil.find(points[idx], function (point) {
        return isValidPoint(point);
      }) || getValueMissingPoint(coordSys); // Copy the first actual point to the end of the array

      points[idx].push(firstPoint.slice());
      data.setItemLayout(idx, points[idx]);
    });
  });
}

function isValidPoint(point) {
  return !isNaN(point[0]) && !isNaN(point[1]);
}

function getValueMissingPoint(coordSys) {
  // It is error-prone to input [NaN, NaN] into polygon, polygon.
  // (probably cause problem when refreshing or animating)
  return [coordSys.cx, coordSys.cy];
}

module.exports = _default;

/***/ }),

/***/ "8deb":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("5522");

__webpack_require__("a016");

__webpack_require__("1466");

var dataColor = __webpack_require__("98e7");

var visualSymbol = __webpack_require__("7f96");

var radarLayout = __webpack_require__("870e");

var dataFilter = __webpack_require__("d3f4");

var backwardCompat = __webpack_require__("7891");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Must use radar component
echarts.registerVisual(dataColor('radar'));
echarts.registerVisual(visualSymbol('radar', 'circle'));
echarts.registerLayout(radarLayout);
echarts.registerProcessor(dataFilter('radar'));
echarts.registerPreprocessor(backwardCompat);

/***/ }),

/***/ "9442":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  // Save geoCoord
  var mapSeries = [];
  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'map') {
      mapSeries.push(seriesOpt);
      seriesOpt.map = seriesOpt.map || seriesOpt.mapType; // Put x, y, width, height, x2, y2 in the top level

      zrUtil.defaults(seriesOpt, seriesOpt.mapLocation);
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "a016":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var SeriesModel = __webpack_require__("4f85");

var createListSimply = __webpack_require__("e46b");

var zrUtil = __webpack_require__("6d8b");

var _format = __webpack_require__("eda2");

var encodeHTML = _format.encodeHTML;

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
var RadarSeries = SeriesModel.extend({
  type: 'series.radar',
  dependencies: ['radar'],
  // Overwrite
  init: function (option) {
    RadarSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, {
      generateCoord: 'indicator_',
      generateCoordCount: Infinity
    });
  },
  formatTooltip: function (dataIndex) {
    var data = this.getData();
    var coordSys = this.coordinateSystem;
    var indicatorAxes = coordSys.getIndicatorAxes();
    var name = this.getData().getName(dataIndex);
    return encodeHTML(name === '' ? this.name : name) + '<br/>' + zrUtil.map(indicatorAxes, function (axis, idx) {
      var val = data.get(data.mapDimension(axis.dim), dataIndex);
      return encodeHTML(axis.name + ' : ' + val);
    }).join('<br />');
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'radar',
    legendHoverLink: true,
    radarIndex: 0,
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    label: {
      position: 'top'
    },
    // areaStyle: {
    // },
    // itemStyle: {}
    symbol: 'emptyCircle',
    symbolSize: 4 // symbolRotate: null

  }
});
var _default = RadarSeries;
module.exports = _default;

/***/ }),

/***/ "a666":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var MapDraw = __webpack_require__("0c41");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var HIGH_DOWN_PROP = '__seriesMapHighDown';
var RECORD_VERSION_PROP = '__seriesMapCallKey';

var _default = echarts.extendChartView({
  type: 'map',
  render: function (mapModel, ecModel, api, payload) {
    // Not render if it is an toggleSelect action from self
    if (payload && payload.type === 'mapToggleSelect' && payload.from === this.uid) {
      return;
    }

    var group = this.group;
    group.removeAll();

    if (mapModel.getHostGeoModel()) {
      return;
    } // Not update map if it is an roam action from self


    if (!(payload && payload.type === 'geoRoam' && payload.componentType === 'series' && payload.seriesId === mapModel.id)) {
      if (mapModel.needsDrawMap) {
        var mapDraw = this._mapDraw || new MapDraw(api, true);
        group.add(mapDraw.group);
        mapDraw.draw(mapModel, ecModel, api, this, payload);
        this._mapDraw = mapDraw;
      } else {
        // Remove drawed map
        this._mapDraw && this._mapDraw.remove();
        this._mapDraw = null;
      }
    } else {
      var mapDraw = this._mapDraw;
      mapDraw && group.add(mapDraw.group);
    }

    mapModel.get('showLegendSymbol') && ecModel.getComponent('legend') && this._renderSymbols(mapModel, ecModel, api);
  },
  remove: function () {
    this._mapDraw && this._mapDraw.remove();
    this._mapDraw = null;
    this.group.removeAll();
  },
  dispose: function () {
    this._mapDraw && this._mapDraw.remove();
    this._mapDraw = null;
  },
  _renderSymbols: function (mapModel, ecModel, api) {
    var originalData = mapModel.originalData;
    var group = this.group;
    originalData.each(originalData.mapDimension('value'), function (value, originalDataIndex) {
      if (isNaN(value)) {
        return;
      }

      var layout = originalData.getItemLayout(originalDataIndex);

      if (!layout || !layout.point) {
        // Not exists in map
        return;
      }

      var point = layout.point;
      var offset = layout.offset;
      var circle = new graphic.Circle({
        style: {
          // Because the special of map draw.
          // Which needs statistic of multiple series and draw on one map.
          // And each series also need a symbol with legend color
          //
          // Layout and visual are put one the different data
          fill: mapModel.getData().getVisual('color')
        },
        shape: {
          cx: point[0] + offset * 9,
          cy: point[1],
          r: 3
        },
        silent: true,
        // Do not overlap the first series, on which labels are displayed.
        z2: 8 + (!offset ? graphic.Z2_EMPHASIS_LIFT + 1 : 0)
      }); // Only the series that has the first value on the same region is in charge of rendering the label.
      // But consider the case:
      // series: [
      //     {id: 'X', type: 'map', map: 'm', {data: [{name: 'A', value: 11}, {name: 'B', {value: 22}]},
      //     {id: 'Y', type: 'map', map: 'm', {data: [{name: 'A', value: 21}, {name: 'C', {value: 33}]}
      // ]
      // The offset `0` of item `A` is at series `X`, but of item `C` is at series `Y`.
      // For backward compatibility, we follow the rule that render label `A` by the
      // settings on series `X` but render label `C` by the settings on series `Y`.

      if (!offset) {
        var fullData = mapModel.mainSeries.getData();
        var name = originalData.getName(originalDataIndex);
        var fullIndex = fullData.indexOfName(name);
        var itemModel = originalData.getItemModel(originalDataIndex);
        var labelModel = itemModel.getModel('label');
        var hoverLabelModel = itemModel.getModel('emphasis.label');
        var regionGroup = fullData.getItemGraphicEl(fullIndex); // `getFormattedLabel` needs to use `getData` inside. Here
        // `mapModel.getData()` is shallow cloned from `mainSeries.getData()`.
        // FIXME
        // If this is not the `mainSeries`, the item model (like label formatter)
        // set on original data item will never get. But it has been working
        // like that from the begining, and this scenario is rarely encountered.
        // So it won't be fixed until have to.

        var normalText = zrUtil.retrieve2(mapModel.getFormattedLabel(fullIndex, 'normal'), name);
        var emphasisText = zrUtil.retrieve2(mapModel.getFormattedLabel(fullIndex, 'emphasis'), normalText);
        var highDownRecord = regionGroup[HIGH_DOWN_PROP];
        var recordVersion = Math.random(); // Prevent from register listeners duplicatedly when roaming.

        if (!highDownRecord) {
          highDownRecord = regionGroup[HIGH_DOWN_PROP] = {};
          var onEmphasis = zrUtil.curry(onRegionHighDown, true);
          var onNormal = zrUtil.curry(onRegionHighDown, false);
          regionGroup.on('mouseover', onEmphasis).on('mouseout', onNormal).on('emphasis', onEmphasis).on('normal', onNormal);
        } // Prevent removed regions effect current grapics.


        regionGroup[RECORD_VERSION_PROP] = recordVersion;
        zrUtil.extend(highDownRecord, {
          recordVersion: recordVersion,
          circle: circle,
          labelModel: labelModel,
          hoverLabelModel: hoverLabelModel,
          emphasisText: emphasisText,
          normalText: normalText
        }); // FIXME
        // Consider set option when emphasis.

        enterRegionHighDown(highDownRecord, false);
      }

      group.add(circle);
    });
  }
});

function onRegionHighDown(toHighOrDown) {
  var highDownRecord = this[HIGH_DOWN_PROP];

  if (highDownRecord && highDownRecord.recordVersion === this[RECORD_VERSION_PROP]) {
    enterRegionHighDown(highDownRecord, toHighOrDown);
  }
}

function enterRegionHighDown(highDownRecord, toHighOrDown) {
  var circle = highDownRecord.circle;
  var labelModel = highDownRecord.labelModel;
  var hoverLabelModel = highDownRecord.hoverLabelModel;
  var emphasisText = highDownRecord.emphasisText;
  var normalText = highDownRecord.normalText;

  if (toHighOrDown) {
    circle.style.extendFrom(graphic.setTextStyle({}, hoverLabelModel, {
      text: hoverLabelModel.get('show') ? emphasisText : null
    }, {
      isRectText: true,
      useInsideStyle: false
    }, true)); // Make label upper than others if overlaps.

    circle.__mapOriginalZ2 = circle.z2;
    circle.z2 += graphic.Z2_EMPHASIS_LIFT;
  } else {
    graphic.setTextStyle(circle.style, labelModel, {
      text: labelModel.get('show') ? normalText : null,
      textPosition: labelModel.getShallow('position') || 'bottom'
    }, {
      isRectText: true,
      useInsideStyle: false
    }); // Trigger normalize style like padding.

    circle.dirty(false);

    if (circle.__mapOriginalZ2 != null) {
      circle.z2 = circle.__mapOriginalZ2;
      circle.__mapOriginalZ2 = null;
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "aadf":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("5aa9");

__webpack_require__("d6d9");

__webpack_require__("3329");

var _barGrid = __webpack_require__("9d57");

var layout = _barGrid.layout;

var visualSymbol = __webpack_require__("7f96");

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
echarts.registerLayout(zrUtil.curry(layout, 'pictorialBar'));
echarts.registerVisual(visualSymbol('pictorialBar', 'roundRect'));

/***/ }),

/***/ "ab71":
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
var opacityAccessPath = ['lineStyle', 'normal', 'opacity'];
var _default = {
  seriesType: 'parallel',
  reset: function (seriesModel, ecModel, api) {
    var itemStyleModel = seriesModel.getModel('itemStyle');
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var globalColors = ecModel.get('color');
    var color = lineStyleModel.get('color') || itemStyleModel.get('color') || globalColors[seriesModel.seriesIndex % globalColors.length];
    var inactiveOpacity = seriesModel.get('inactiveOpacity');
    var activeOpacity = seriesModel.get('activeOpacity');
    var lineStyle = seriesModel.getModel('lineStyle').getLineStyle();
    var coordSys = seriesModel.coordinateSystem;
    var data = seriesModel.getData();
    var opacityMap = {
      normal: lineStyle.opacity,
      active: activeOpacity,
      inactive: inactiveOpacity
    };
    data.setVisual('color', color);

    function progress(params, data) {
      coordSys.eachActiveState(data, function (activeState, dataIndex) {
        var opacity = opacityMap[activeState];

        if (activeState === 'normal' && data.hasItemOption) {
          var itemOpacity = data.getItemModel(dataIndex).get(opacityAccessPath, true);
          itemOpacity != null && (opacity = itemOpacity);
        }

        data.setItemVisual(dataIndex, 'opacity', opacity);
      }, params.start, params.end);
    }

    return {
      progress: progress
    };
  }
};
module.exports = _default;

/***/ }),

/***/ "bb70":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var textContain = __webpack_require__("e86a");

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
// FIXME emphasis label position is not same with normal label position
var RADIAN = Math.PI / 180;

function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight, viewLeft, viewTop, farthestX) {
  list.sort(function (a, b) {
    return a.y - b.y;
  });

  function shiftDown(start, end, delta, dir) {
    for (var j = start; j < end; j++) {
      if (list[j].y + delta > viewTop + viewHeight) {
        break;
      }

      list[j].y += delta;

      if (j > start && j + 1 < end && list[j + 1].y > list[j].y + list[j].height) {
        shiftUp(j, delta / 2);
        return;
      }
    }

    shiftUp(end - 1, delta / 2);
  }

  function shiftUp(end, delta) {
    for (var j = end; j >= 0; j--) {
      if (list[j].y - delta < viewTop) {
        break;
      }

      list[j].y -= delta;

      if (j > 0 && list[j].y > list[j - 1].y + list[j - 1].height) {
        break;
      }
    }
  }

  function changeX(list, isDownList, cx, cy, r, dir) {
    var lastDeltaX = dir > 0 ? isDownList // right-side
    ? Number.MAX_VALUE // down
    : 0 // up
    : isDownList // left-side
    ? Number.MAX_VALUE // down
    : 0; // up

    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].labelAlignTo !== 'none') {
        continue;
      }

      var deltaY = Math.abs(list[i].y - cy);
      var length = list[i].len;
      var length2 = list[i].len2;
      var deltaX = deltaY < r + length ? Math.sqrt((r + length + length2) * (r + length + length2) - deltaY * deltaY) : Math.abs(list[i].x - cx);

      if (isDownList && deltaX >= lastDeltaX) {
        // right-down, left-down
        deltaX = lastDeltaX - 10;
      }

      if (!isDownList && deltaX <= lastDeltaX) {
        // right-up, left-up
        deltaX = lastDeltaX + 10;
      }

      list[i].x = cx + deltaX * dir;
      lastDeltaX = deltaX;
    }
  }

  var lastY = 0;
  var delta;
  var len = list.length;
  var upList = [];
  var downList = [];

  for (var i = 0; i < len; i++) {
    if (list[i].position === 'outer' && list[i].labelAlignTo === 'labelLine') {
      var dx = list[i].x - farthestX;
      list[i].linePoints[1][0] += dx;
      list[i].x = farthestX;
    }

    delta = list[i].y - lastY;

    if (delta < 0) {
      shiftDown(i, len, -delta, dir);
    }

    lastY = list[i].y + list[i].height;
  }

  if (viewHeight - lastY < 0) {
    shiftUp(len - 1, lastY - viewHeight);
  }

  for (var i = 0; i < len; i++) {
    if (list[i].y >= cy) {
      downList.push(list[i]);
    } else {
      upList.push(list[i]);
    }
  }

  changeX(upList, false, cx, cy, r, dir);
  changeX(downList, true, cx, cy, r, dir);
}

function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var leftList = [];
  var rightList = [];
  var leftmostX = Number.MAX_VALUE;
  var rightmostX = -Number.MAX_VALUE;

  for (var i = 0; i < labelLayoutList.length; i++) {
    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }

    if (labelLayoutList[i].x < cx) {
      leftmostX = Math.min(leftmostX, labelLayoutList[i].x);
      leftList.push(labelLayoutList[i]);
    } else {
      rightmostX = Math.max(rightmostX, labelLayoutList[i].x);
      rightList.push(labelLayoutList[i]);
    }
  }

  adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight, viewLeft, viewTop, rightmostX);
  adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight, viewLeft, viewTop, leftmostX);

  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout = labelLayoutList[i];

    if (isPositionCenter(layout)) {
      continue;
    }

    var linePoints = layout.linePoints;

    if (linePoints) {
      var isAlignToEdge = layout.labelAlignTo === 'edge';
      var realTextWidth = layout.textRect.width;
      var targetTextWidth;

      if (isAlignToEdge) {
        if (layout.x < cx) {
          targetTextWidth = linePoints[2][0] - layout.labelDistance - viewLeft - layout.labelMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout.labelMargin - linePoints[2][0] - layout.labelDistance;
        }
      } else {
        if (layout.x < cx) {
          targetTextWidth = layout.x - viewLeft - layout.bleedMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout.x - layout.bleedMargin;
        }
      }

      if (targetTextWidth < layout.textRect.width) {
        layout.text = textContain.truncateText(layout.text, targetTextWidth, layout.font);

        if (layout.labelAlignTo === 'edge') {
          realTextWidth = textContain.getWidth(layout.text, layout.font);
        }
      }

      var dist = linePoints[1][0] - linePoints[2][0];

      if (isAlignToEdge) {
        if (layout.x < cx) {
          linePoints[2][0] = viewLeft + layout.labelMargin + realTextWidth + layout.labelDistance;
        } else {
          linePoints[2][0] = viewLeft + viewWidth - layout.labelMargin - realTextWidth - layout.labelDistance;
        }
      } else {
        if (layout.x < cx) {
          linePoints[2][0] = layout.x + layout.labelDistance;
        } else {
          linePoints[2][0] = layout.x - layout.labelDistance;
        }

        linePoints[1][0] = linePoints[2][0] + dist;
      }

      linePoints[1][1] = linePoints[2][1] = layout.y;
    }
  }
}

function isPositionCenter(layout) {
  // Not change x for center label
  return layout.position === 'center';
}

function _default(seriesModel, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var data = seriesModel.getData();
  var labelLayoutList = [];
  var cx;
  var cy;
  var hasLabelRotate = false;
  var minShowLabelRadian = (seriesModel.get('minShowLabelAngle') || 0) * RADIAN;
  data.each(function (idx) {
    var layout = data.getItemLayout(idx);
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel('label'); // Use position in normal or emphasis

    var labelPosition = labelModel.get('position') || itemModel.get('emphasis.label.position');
    var labelDistance = labelModel.get('distanceToLabelLine');
    var labelAlignTo = labelModel.get('alignTo');
    var labelMargin = parsePercent(labelModel.get('margin'), viewWidth);
    var bleedMargin = labelModel.get('bleedMargin');
    var font = labelModel.getFont();
    var labelLineModel = itemModel.getModel('labelLine');
    var labelLineLen = labelLineModel.get('length');
    labelLineLen = parsePercent(labelLineLen, viewWidth);
    var labelLineLen2 = labelLineModel.get('length2');
    labelLineLen2 = parsePercent(labelLineLen2, viewWidth);

    if (layout.angle < minShowLabelRadian) {
      return;
    }

    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var dx = Math.cos(midAngle);
    var dy = Math.sin(midAngle);
    var textX;
    var textY;
    var linePoints;
    var textAlign;
    cx = layout.cx;
    cy = layout.cy;
    var text = seriesModel.getFormattedLabel(idx, 'normal') || data.getName(idx);
    var textRect = textContain.getBoundingRect(text, font, textAlign, 'top');
    var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';

    if (labelPosition === 'center') {
      textX = layout.cx;
      textY = layout.cy;
      textAlign = 'center';
    } else {
      var x1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dx : layout.r * dx) + cx;
      var y1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dy : layout.r * dy) + cy;
      textX = x1 + dx * 3;
      textY = y1 + dy * 3;

      if (!isLabelInside) {
        // For roseType
        var x2 = x1 + dx * (labelLineLen + r - layout.r);
        var y2 = y1 + dy * (labelLineLen + r - layout.r);
        var x3 = x2 + (dx < 0 ? -1 : 1) * labelLineLen2;
        var y3 = y2;

        if (labelAlignTo === 'edge') {
          // Adjust textX because text align of edge is opposite
          textX = dx < 0 ? viewLeft + labelMargin : viewLeft + viewWidth - labelMargin;
        } else {
          textX = x3 + (dx < 0 ? -labelDistance : labelDistance);
        }

        textY = y3;
        linePoints = [[x1, y1], [x2, y2], [x3, y3]];
      }

      textAlign = isLabelInside ? 'center' : labelAlignTo === 'edge' ? dx > 0 ? 'right' : 'left' : dx > 0 ? 'left' : 'right';
    }

    var labelRotate;
    var rotate = labelModel.get('rotate');

    if (typeof rotate === 'number') {
      labelRotate = rotate * (Math.PI / 180);
    } else {
      labelRotate = rotate ? dx < 0 ? -midAngle + Math.PI : -midAngle : 0;
    }

    hasLabelRotate = !!labelRotate;
    layout.label = {
      x: textX,
      y: textY,
      position: labelPosition,
      height: textRect.height,
      len: labelLineLen,
      len2: labelLineLen2,
      linePoints: linePoints,
      textAlign: textAlign,
      verticalAlign: 'middle',
      rotation: labelRotate,
      inside: isLabelInside,
      labelDistance: labelDistance,
      labelAlignTo: labelAlignTo,
      labelMargin: labelMargin,
      bleedMargin: bleedMargin,
      textRect: textRect,
      text: text,
      font: font
    }; // Not layout the inside label

    if (!isLabelInside) {
      labelLayoutList.push(layout.label);
    }
  });

  if (!hasLabelRotate && seriesModel.get('avoidLabelOverlap')) {
    avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop);
  }
}

module.exports = _default;

/***/ }),

/***/ "c037":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

__webpack_require__("f7c6");

__webpack_require__("1ab3");

var createDataSelectAction = __webpack_require__("7782");

var dataColor = __webpack_require__("98e7");

var pieLayout = __webpack_require__("292e");

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
createDataSelectAction('pie', [{
  type: 'pieToggleSelect',
  event: 'pieselectchanged',
  method: 'toggleSelected'
}, {
  type: 'pieSelect',
  event: 'pieselected',
  method: 'select'
}, {
  type: 'pieUnSelect',
  event: 'pieunselected',
  method: 'unSelect'
}]);
echarts.registerVisual(dataColor('pie'));
echarts.registerLayout(zrUtil.curry(pieLayout, 'pie'));
echarts.registerProcessor(dataFilter('pie'));

/***/ }),

/***/ "cee1":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
function _default(ecModel) {
  var processedMapType = {};
  ecModel.eachSeriesByType('map', function (mapSeries) {
    var mapType = mapSeries.getMapType();

    if (mapSeries.getHostGeoModel() || processedMapType[mapType]) {
      return;
    }

    var mapSymbolOffsets = {};
    zrUtil.each(mapSeries.seriesGroup, function (subMapSeries) {
      var geo = subMapSeries.coordinateSystem;
      var data = subMapSeries.originalData;

      if (subMapSeries.get('showLegendSymbol') && ecModel.getComponent('legend')) {
        data.each(data.mapDimension('value'), function (value, idx) {
          var name = data.getName(idx);
          var region = geo.getRegion(name); // If input series.data is [11, 22, '-'/null/undefined, 44],
          // it will be filled with NaN: [11, 22, NaN, 44] and NaN will
          // not be drawn. So here must validate if value is NaN.

          if (!region || isNaN(value)) {
            return;
          }

          var offset = mapSymbolOffsets[name] || 0;
          var point = geo.dataToPoint(region.center);
          mapSymbolOffsets[name] = offset + 1;
          data.setItemLayout(idx, {
            point: point,
            offset: offset
          });
        });
      }
    }); // Show label of those region not has legendSymbol(which is offset 0)

    var data = mapSeries.getData();
    data.each(function (idx) {
      var name = data.getName(idx);
      var layout = data.getItemLayout(idx) || {};
      layout.showLabel = !mapSymbolOffsets[name];
      data.setItemLayout(idx, layout);
    });
    processedMapType[mapType] = true;
  });
}

module.exports = _default;

/***/ }),

/***/ "f6ed":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
// FIXME 公用？

/**
 * @param {Array.<module:echarts/data/List>} datas
 * @param {string} statisticType 'average' 'sum'
 * @inner
 */
function dataStatistics(datas, statisticType) {
  var dataNameMap = {};
  zrUtil.each(datas, function (data) {
    data.each(data.mapDimension('value'), function (value, idx) {
      // Add prefix to avoid conflict with Object.prototype.
      var mapKey = 'ec-' + data.getName(idx);
      dataNameMap[mapKey] = dataNameMap[mapKey] || [];

      if (!isNaN(value)) {
        dataNameMap[mapKey].push(value);
      }
    });
  });
  return datas[0].map(datas[0].mapDimension('value'), function (value, idx) {
    var mapKey = 'ec-' + datas[0].getName(idx);
    var sum = 0;
    var min = Infinity;
    var max = -Infinity;
    var len = dataNameMap[mapKey].length;

    for (var i = 0; i < len; i++) {
      min = Math.min(min, dataNameMap[mapKey][i]);
      max = Math.max(max, dataNameMap[mapKey][i]);
      sum += dataNameMap[mapKey][i];
    }

    var result;

    if (statisticType === 'min') {
      result = min;
    } else if (statisticType === 'max') {
      result = max;
    } else if (statisticType === 'average') {
      result = sum / len;
    } else {
      result = sum;
    }

    return len === 0 ? NaN : result;
  });
}

function _default(ecModel) {
  var seriesGroups = {};
  ecModel.eachSeriesByType('map', function (seriesModel) {
    var hostGeoModel = seriesModel.getHostGeoModel();
    var key = hostGeoModel ? 'o' + hostGeoModel.id : 'i' + seriesModel.getMapType();
    (seriesGroups[key] = seriesGroups[key] || []).push(seriesModel);
  });
  zrUtil.each(seriesGroups, function (seriesList, key) {
    var data = dataStatistics(zrUtil.map(seriesList, function (seriesModel) {
      return seriesModel.getData();
    }), seriesList[0].get('mapValueCalculation'));

    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].originalData = seriesList[i].getData();
    } // FIXME Put where?


    for (var i = 0; i < seriesList.length; i++) {
      seriesList[i].seriesGroup = seriesList;
      seriesList[i].needsDrawMap = i === 0 && !seriesList[i].getHostGeoModel();
      seriesList[i].setData(data.cloneShallow());
      seriesList[i].mainSeries = seriesList[0];
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "f7c6":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var createListSimply = __webpack_require__("e46b");

var zrUtil = __webpack_require__("6d8b");

var modelUtil = __webpack_require__("e0d3");

var _number = __webpack_require__("3842");

var getPercentWithPrecision = _number.getPercentWithPrecision;

var dataSelectableMixin = __webpack_require__("7023");

var _dataProvider = __webpack_require__("2b17");

var retrieveRawAttr = _dataProvider.retrieveRawAttr;

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
var PieSeries = echarts.extendSeriesModel({
  type: 'series.pie',
  // Overwrite
  init: function (option) {
    PieSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));
    this.updateSelectedMap(this._createSelectableList());

    this._defaultLabelLine(option);
  },
  // Overwrite
  mergeOption: function (newOption) {
    PieSeries.superCall(this, 'mergeOption', newOption);
    this.updateSelectedMap(this._createSelectableList());
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
  },
  _createSelectableList: function () {
    var data = this.getRawData();
    var valueDim = data.mapDimension('value');
    var targetList = [];

    for (var i = 0, len = data.count(); i < len; i++) {
      targetList.push({
        name: data.getName(i),
        value: data.get(valueDim, i),
        selected: retrieveRawAttr(data, i, 'selected')
      });
    }

    return targetList;
  },
  // Overwrite
  getDataParams: function (dataIndex) {
    var data = this.getData();
    var params = PieSeries.superCall(this, 'getDataParams', dataIndex); // FIXME toFixed?

    var valueList = [];
    data.each(data.mapDimension('value'), function (value) {
      valueList.push(value);
    });
    params.percent = getPercentWithPrecision(valueList, dataIndex, data.hostModel.get('percentPrecision'));
    params.$vars.push('percent');
    return params;
  },
  _defaultLabelLine: function (option) {
    // Extend labelLine emphasis
    modelUtil.defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine; // Not show label line if `label.normal.show = false`

    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    hoverAnimation: true,
    // 默认全局居中
    center: ['50%', '50%'],
    radius: [0, '75%'],
    // 默认顺时针
    clockwise: true,
    startAngle: 90,
    // 最小角度改为0
    minAngle: 0,
    // If the angle of a sector less than `minShowLabelAngle`,
    // the label will not be displayed.
    minShowLabelAngle: 0,
    // 选中时扇区偏移量
    selectedOffset: 10,
    // 高亮扇区偏移量
    hoverOffset: 10,
    // If use strategy to avoid label overlapping
    avoidLabelOverlap: true,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
    // roseType: null,
    percentPrecision: 2,
    // If still show when all data zero.
    stillShowZeroSum: true,
    // cursor: null,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    label: {
      // If rotate around circle
      rotate: false,
      show: true,
      // 'outer', 'inside', 'center'
      position: 'outer',
      // 'none', 'labelLine', 'edge'. Works only when position is 'outer'
      alignTo: 'none',
      // Closest distance between label and chart edge.
      // Works only position is 'outer' and alignTo is 'edge'.
      margin: '25%',
      // Works only position is 'outer' and alignTo is not 'edge'.
      bleedMargin: 10,
      // Distance between text and label line.
      distanceToLabelLine: 5 // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      // 默认使用全局文本样式，详见TEXTSTYLE
      // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数

    },
    // Enabled when label.normal.position is 'outer'
    labelLine: {
      show: true,
      // 引导线两段中的第一段长度
      length: 15,
      // 引导线两段中的第二段长度
      length2: 15,
      smooth: false,
      lineStyle: {
        // color: 各异,
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      borderWidth: 1
    },
    // Animation type. Valid values: expansion, scale
    animationType: 'expansion',
    // Animation type when update. Valid values: transition, expansion
    animationTypeUpdate: 'transition',
    animationEasing: 'cubicOut'
  }
});
zrUtil.mixin(PieSeries, dataSelectableMixin);
var _default = PieSeries;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~ed9be1e3.748f579a.js.map