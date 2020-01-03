(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~a7f6b37e"],{

/***/ "07e6":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

__webpack_require__("4d85");

__webpack_require__("a753");

/***/ }),

/***/ "1f0e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var Path = __webpack_require__("cbe5");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = Path.extend({
  type: 'echartsGaugePointer',
  shape: {
    angle: 0,
    width: 10,
    r: 10,
    x: 0,
    y: 0
  },
  buildPath: function (ctx, shape) {
    var mathCos = Math.cos;
    var mathSin = Math.sin;
    var r = shape.r;
    var width = shape.width;
    var angle = shape.angle;
    var x = shape.x - mathCos(angle) * width * (width >= r / 3 ? 1 : 2);
    var y = shape.y - mathSin(angle) * width * (width >= r / 3 ? 1 : 2);
    angle = shape.angle - Math.PI / 2;
    ctx.moveTo(x, y);
    ctx.lineTo(shape.x + mathCos(angle) * width, shape.y + mathSin(angle) * width);
    ctx.lineTo(shape.x + mathCos(shape.angle) * r, shape.y + mathSin(shape.angle) * r);
    ctx.lineTo(shape.x - mathCos(angle) * width, shape.y - mathSin(angle) * width);
    ctx.lineTo(x, y);
    return;
  }
});

module.exports = _default;

/***/ }),

/***/ "4d85":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var createListSimply = __webpack_require__("e46b");

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
var GaugeSeries = SeriesModel.extend({
  type: 'series.gauge',
  getInitialData: function (option, ecModel) {
    return createListSimply(this, ['value']);
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    // 默认全局居中
    center: ['50%', '50%'],
    legendHoverLink: true,
    radius: '75%',
    startAngle: 225,
    endAngle: -45,
    clockwise: true,
    // 最小值
    min: 0,
    // 最大值
    max: 100,
    // 分割段数，默认为10
    splitNumber: 10,
    // 坐标轴线
    axisLine: {
      // 默认显示，属性show控制显示与否
      show: true,
      lineStyle: {
        // 属性lineStyle控制线条样式
        color: [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']],
        width: 30
      }
    },
    // 分隔线
    splitLine: {
      // 默认显示，属性show控制显示与否
      show: true,
      // 属性length控制线长
      length: 30,
      // 属性lineStyle（详见lineStyle）控制线条样式
      lineStyle: {
        color: '#eee',
        width: 2,
        type: 'solid'
      }
    },
    // 坐标轴小标记
    axisTick: {
      // 属性show控制显示与否，默认不显示
      show: true,
      // 每份split细分多少段
      splitNumber: 5,
      // 属性length控制线长
      length: 8,
      // 属性lineStyle控制线条样式
      lineStyle: {
        color: '#eee',
        width: 1,
        type: 'solid'
      }
    },
    axisLabel: {
      show: true,
      distance: 5,
      // formatter: null,
      color: 'auto'
    },
    pointer: {
      show: true,
      length: '80%',
      width: 8
    },
    itemStyle: {
      color: 'auto'
    },
    title: {
      show: true,
      // x, y，单位px
      offsetCenter: [0, '-40%'],
      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      color: '#333',
      fontSize: 15
    },
    detail: {
      show: true,
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      borderColor: '#ccc',
      width: 100,
      height: null,
      // self-adaption
      padding: [5, 10],
      // x, y，单位px
      offsetCenter: [0, '40%'],
      // formatter: null,
      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      color: 'auto',
      fontSize: 30
    }
  }
});
var _default = GaugeSeries;
module.exports = _default;

/***/ }),

/***/ "a753":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var PointerPath = __webpack_require__("1f0e");

var graphic = __webpack_require__("2306");

var ChartView = __webpack_require__("e887");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;
var round = _number.round;
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
function parsePosition(seriesModel, api) {
  var center = seriesModel.get('center');
  var width = api.getWidth();
  var height = api.getHeight();
  var size = Math.min(width, height);
  var cx = parsePercent(center[0], api.getWidth());
  var cy = parsePercent(center[1], api.getHeight());
  var r = parsePercent(seriesModel.get('radius'), size / 2);
  return {
    cx: cx,
    cy: cy,
    r: r
  };
}

function formatLabel(label, labelFormatter) {
  if (labelFormatter) {
    if (typeof labelFormatter === 'string') {
      label = labelFormatter.replace('{value}', label != null ? label : '');
    } else if (typeof labelFormatter === 'function') {
      label = labelFormatter(label);
    }
  }

  return label;
}

var PI2 = Math.PI * 2;
var GaugeView = ChartView.extend({
  type: 'gauge',
  render: function (seriesModel, ecModel, api) {
    this.group.removeAll();
    var colorList = seriesModel.get('axisLine.lineStyle.color');
    var posInfo = parsePosition(seriesModel, api);

    this._renderMain(seriesModel, ecModel, api, colorList, posInfo);
  },
  dispose: function () {},
  _renderMain: function (seriesModel, ecModel, api, colorList, posInfo) {
    var group = this.group;
    var axisLineModel = seriesModel.getModel('axisLine');
    var lineStyleModel = axisLineModel.getModel('lineStyle');
    var clockwise = seriesModel.get('clockwise');
    var startAngle = -seriesModel.get('startAngle') / 180 * Math.PI;
    var endAngle = -seriesModel.get('endAngle') / 180 * Math.PI;
    var angleRangeSpan = (endAngle - startAngle) % PI2;
    var prevEndAngle = startAngle;
    var axisLineWidth = lineStyleModel.get('width');
    var showAxis = axisLineModel.get('show');

    for (var i = 0; showAxis && i < colorList.length; i++) {
      // Clamp
      var percent = Math.min(Math.max(colorList[i][0], 0), 1);
      var endAngle = startAngle + angleRangeSpan * percent;
      var sector = new graphic.Sector({
        shape: {
          startAngle: prevEndAngle,
          endAngle: endAngle,
          cx: posInfo.cx,
          cy: posInfo.cy,
          clockwise: clockwise,
          r0: posInfo.r - axisLineWidth,
          r: posInfo.r
        },
        silent: true
      });
      sector.setStyle({
        fill: colorList[i][1]
      });
      sector.setStyle(lineStyleModel.getLineStyle( // Because we use sector to simulate arc
      // so the properties for stroking are useless
      ['color', 'borderWidth', 'borderColor']));
      group.add(sector);
      prevEndAngle = endAngle;
    }

    var getColor = function (percent) {
      // Less than 0
      if (percent <= 0) {
        return colorList[0][1];
      }

      for (var i = 0; i < colorList.length; i++) {
        if (colorList[i][0] >= percent && (i === 0 ? 0 : colorList[i - 1][0]) < percent) {
          return colorList[i][1];
        }
      } // More than 1


      return colorList[i - 1][1];
    };

    if (!clockwise) {
      var tmp = startAngle;
      startAngle = endAngle;
      endAngle = tmp;
    }

    this._renderTicks(seriesModel, ecModel, api, getColor, posInfo, startAngle, endAngle, clockwise);

    this._renderPointer(seriesModel, ecModel, api, getColor, posInfo, startAngle, endAngle, clockwise);

    this._renderTitle(seriesModel, ecModel, api, getColor, posInfo);

    this._renderDetail(seriesModel, ecModel, api, getColor, posInfo);
  },
  _renderTicks: function (seriesModel, ecModel, api, getColor, posInfo, startAngle, endAngle, clockwise) {
    var group = this.group;
    var cx = posInfo.cx;
    var cy = posInfo.cy;
    var r = posInfo.r;
    var minVal = +seriesModel.get('min');
    var maxVal = +seriesModel.get('max');
    var splitLineModel = seriesModel.getModel('splitLine');
    var tickModel = seriesModel.getModel('axisTick');
    var labelModel = seriesModel.getModel('axisLabel');
    var splitNumber = seriesModel.get('splitNumber');
    var subSplitNumber = tickModel.get('splitNumber');
    var splitLineLen = parsePercent(splitLineModel.get('length'), r);
    var tickLen = parsePercent(tickModel.get('length'), r);
    var angle = startAngle;
    var step = (endAngle - startAngle) / splitNumber;
    var subStep = step / subSplitNumber;
    var splitLineStyle = splitLineModel.getModel('lineStyle').getLineStyle();
    var tickLineStyle = tickModel.getModel('lineStyle').getLineStyle();

    for (var i = 0; i <= splitNumber; i++) {
      var unitX = Math.cos(angle);
      var unitY = Math.sin(angle); // Split line

      if (splitLineModel.get('show')) {
        var splitLine = new graphic.Line({
          shape: {
            x1: unitX * r + cx,
            y1: unitY * r + cy,
            x2: unitX * (r - splitLineLen) + cx,
            y2: unitY * (r - splitLineLen) + cy
          },
          style: splitLineStyle,
          silent: true
        });

        if (splitLineStyle.stroke === 'auto') {
          splitLine.setStyle({
            stroke: getColor(i / splitNumber)
          });
        }

        group.add(splitLine);
      } // Label


      if (labelModel.get('show')) {
        var label = formatLabel(round(i / splitNumber * (maxVal - minVal) + minVal), labelModel.get('formatter'));
        var distance = labelModel.get('distance');
        var autoColor = getColor(i / splitNumber);
        group.add(new graphic.Text({
          style: graphic.setTextStyle({}, labelModel, {
            text: label,
            x: unitX * (r - splitLineLen - distance) + cx,
            y: unitY * (r - splitLineLen - distance) + cy,
            textVerticalAlign: unitY < -0.4 ? 'top' : unitY > 0.4 ? 'bottom' : 'middle',
            textAlign: unitX < -0.4 ? 'left' : unitX > 0.4 ? 'right' : 'center'
          }, {
            autoColor: autoColor
          }),
          silent: true
        }));
      } // Axis tick


      if (tickModel.get('show') && i !== splitNumber) {
        for (var j = 0; j <= subSplitNumber; j++) {
          var unitX = Math.cos(angle);
          var unitY = Math.sin(angle);
          var tickLine = new graphic.Line({
            shape: {
              x1: unitX * r + cx,
              y1: unitY * r + cy,
              x2: unitX * (r - tickLen) + cx,
              y2: unitY * (r - tickLen) + cy
            },
            silent: true,
            style: tickLineStyle
          });

          if (tickLineStyle.stroke === 'auto') {
            tickLine.setStyle({
              stroke: getColor((i + j / subSplitNumber) / splitNumber)
            });
          }

          group.add(tickLine);
          angle += subStep;
        }

        angle -= subStep;
      } else {
        angle += step;
      }
    }
  },
  _renderPointer: function (seriesModel, ecModel, api, getColor, posInfo, startAngle, endAngle, clockwise) {
    var group = this.group;
    var oldData = this._data;

    if (!seriesModel.get('pointer.show')) {
      // Remove old element
      oldData && oldData.eachItemGraphicEl(function (el) {
        group.remove(el);
      });
      return;
    }

    var valueExtent = [+seriesModel.get('min'), +seriesModel.get('max')];
    var angleExtent = [startAngle, endAngle];
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    data.diff(oldData).add(function (idx) {
      var pointer = new PointerPath({
        shape: {
          angle: startAngle
        }
      });
      graphic.initProps(pointer, {
        shape: {
          angle: linearMap(data.get(valueDim, idx), valueExtent, angleExtent, true)
        }
      }, seriesModel);
      group.add(pointer);
      data.setItemGraphicEl(idx, pointer);
    }).update(function (newIdx, oldIdx) {
      var pointer = oldData.getItemGraphicEl(oldIdx);
      graphic.updateProps(pointer, {
        shape: {
          angle: linearMap(data.get(valueDim, newIdx), valueExtent, angleExtent, true)
        }
      }, seriesModel);
      group.add(pointer);
      data.setItemGraphicEl(newIdx, pointer);
    }).remove(function (idx) {
      var pointer = oldData.getItemGraphicEl(idx);
      group.remove(pointer);
    }).execute();
    data.eachItemGraphicEl(function (pointer, idx) {
      var itemModel = data.getItemModel(idx);
      var pointerModel = itemModel.getModel('pointer');
      pointer.setShape({
        x: posInfo.cx,
        y: posInfo.cy,
        width: parsePercent(pointerModel.get('width'), posInfo.r),
        r: parsePercent(pointerModel.get('length'), posInfo.r)
      });
      pointer.useStyle(itemModel.getModel('itemStyle').getItemStyle());

      if (pointer.style.fill === 'auto') {
        pointer.setStyle('fill', getColor(linearMap(data.get(valueDim, idx), valueExtent, [0, 1], true)));
      }

      graphic.setHoverStyle(pointer, itemModel.getModel('emphasis.itemStyle').getItemStyle());
    });
    this._data = data;
  },
  _renderTitle: function (seriesModel, ecModel, api, getColor, posInfo) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var titleModel = seriesModel.getModel('title');

    if (titleModel.get('show')) {
      var offsetCenter = titleModel.get('offsetCenter');
      var x = posInfo.cx + parsePercent(offsetCenter[0], posInfo.r);
      var y = posInfo.cy + parsePercent(offsetCenter[1], posInfo.r);
      var minVal = +seriesModel.get('min');
      var maxVal = +seriesModel.get('max');
      var value = seriesModel.getData().get(valueDim, 0);
      var autoColor = getColor(linearMap(value, [minVal, maxVal], [0, 1], true));
      this.group.add(new graphic.Text({
        silent: true,
        style: graphic.setTextStyle({}, titleModel, {
          x: x,
          y: y,
          // FIXME First data name ?
          text: data.getName(0),
          textAlign: 'center',
          textVerticalAlign: 'middle'
        }, {
          autoColor: autoColor,
          forceRich: true
        })
      }));
    }
  },
  _renderDetail: function (seriesModel, ecModel, api, getColor, posInfo) {
    var detailModel = seriesModel.getModel('detail');
    var minVal = +seriesModel.get('min');
    var maxVal = +seriesModel.get('max');

    if (detailModel.get('show')) {
      var offsetCenter = detailModel.get('offsetCenter');
      var x = posInfo.cx + parsePercent(offsetCenter[0], posInfo.r);
      var y = posInfo.cy + parsePercent(offsetCenter[1], posInfo.r);
      var width = parsePercent(detailModel.get('width'), posInfo.r);
      var height = parsePercent(detailModel.get('height'), posInfo.r);
      var data = seriesModel.getData();
      var value = data.get(data.mapDimension('value'), 0);
      var autoColor = getColor(linearMap(value, [minVal, maxVal], [0, 1], true));
      this.group.add(new graphic.Text({
        silent: true,
        style: graphic.setTextStyle({}, detailModel, {
          x: x,
          y: y,
          text: formatLabel( // FIXME First data name ?
          value, detailModel.get('formatter')),
          textWidth: isNaN(width) ? null : width,
          textHeight: isNaN(height) ? null : height,
          textAlign: 'center',
          textVerticalAlign: 'middle'
        }, {
          autoColor: autoColor,
          forceRich: true
        })
      }));
    }
  }
});
var _default = GaugeView;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~a7f6b37e.aa7b85ea.js.map