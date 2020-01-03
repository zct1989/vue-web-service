(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~588225d9"],{

/***/ "0156":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Can only be called after coordinate system creation stage.
 * (Can be called before coordinate system update stage).
 *
 * @param {Object} opt {labelInside}
 * @return {Object} {
 *  position, rotation, labelDirection, labelOffset,
 *  tickDirection, labelRotate, z2
 * }
 */
function layout(gridModel, axisModel, opt) {
  opt = opt || {};
  var grid = gridModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout = {};
  var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
  var rawAxisPosition = axis.position;
  var axisPosition = otherAxisOnZeroOf ? 'onZero' : rawAxisPosition;
  var axisDim = axis.dim;
  var rect = grid.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var idx = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  };
  var axisOffset = axisModel.get('offset') || 0;
  var posBound = axisDim === 'x' ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];

  if (otherAxisOnZeroOf) {
    var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
    posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
  } // Axis position


  layout.position = [axisDim === 'y' ? posBound[idx[axisPosition]] : rectBound[0], axisDim === 'x' ? posBound[idx[axisPosition]] : rectBound[3]]; // Axis rotation

  layout.rotation = Math.PI / 2 * (axisDim === 'x' ? 0 : 1); // Tick and label direction, x y is axisDim

  var dirMap = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
  layout.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;

  if (axisModel.get('axisTick.inside')) {
    layout.tickDirection = -layout.tickDirection;
  }

  if (zrUtil.retrieve(opt.labelInside, axisModel.get('axisLabel.inside'))) {
    layout.labelDirection = -layout.labelDirection;
  } // Special label rotation


  var labelRotate = axisModel.get('axisLabel.rotate');
  layout.labelRotate = axisPosition === 'top' ? -labelRotate : labelRotate; // Over splitLine and splitArea

  layout.z2 = 1;
  return layout;
}

exports.layout = layout;

/***/ }),

/***/ "2023":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
// import * as axisHelper from './axisHelper';
var _default = {
  /**
   * @param {boolean} origin
   * @return {number|string} min value or 'dataMin' or null/undefined (means auto) or NaN
   */
  getMin: function (origin) {
    var option = this.option;
    var min = !origin && option.rangeStart != null ? option.rangeStart : option.min;

    if (this.axis && min != null && min !== 'dataMin' && typeof min !== 'function' && !zrUtil.eqNaN(min)) {
      min = this.axis.scale.parse(min);
    }

    return min;
  },

  /**
   * @param {boolean} origin
   * @return {number|string} max value or 'dataMax' or null/undefined (means auto) or NaN
   */
  getMax: function (origin) {
    var option = this.option;
    var max = !origin && option.rangeEnd != null ? option.rangeEnd : option.max;

    if (this.axis && max != null && max !== 'dataMax' && typeof max !== 'function' && !zrUtil.eqNaN(max)) {
      max = this.axis.scale.parse(max);
    }

    return max;
  },

  /**
   * @return {boolean}
   */
  getNeedCrossZero: function () {
    var option = this.option;
    return option.rangeStart != null || option.rangeEnd != null ? false : !option.scale;
  },

  /**
   * Should be implemented by each axis model if necessary.
   * @return {module:echarts/model/Component} coordinate system model
   */
  getCoordSysModel: zrUtil.noop,

  /**
   * @param {number} rangeStart Can only be finite number or null/undefined or NaN.
   * @param {number} rangeEnd Can only be finite number or null/undefined or NaN.
   */
  setRange: function (rangeStart, rangeEnd) {
    this.option.rangeStart = rangeStart;
    this.option.rangeEnd = rangeEnd;
  },

  /**
   * Reset range
   */
  resetRange: function () {
    // rangeStart and rangeEnd is readonly.
    this.option.rangeStart = this.option.rangeEnd = null;
  }
};
module.exports = _default;

/***/ }),

/***/ "471e":
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
function _default(coordSys) {
  var rect = coordSys.getRect();
  var rangeInfo = coordSys.getRangeInfo();
  return {
    coordSys: {
      type: 'calendar',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      cellWidth: coordSys.getCellWidth(),
      cellHeight: coordSys.getCellHeight(),
      rangeInfo: {
        start: rangeInfo.start,
        end: rangeInfo.end,
        weeks: rangeInfo.weeks,
        dayCount: rangeInfo.allDay
      }
    },
    api: {
      coord: function (data, clamp) {
        return coordSys.dataToPoint(data, clamp);
      }
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "48c7":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var axisModelCreator = __webpack_require__("9e47");

var axisModelCommonMixin = __webpack_require__("2023");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var AxisModel = ComponentModel.extend({
  type: 'cartesian2dAxis',

  /**
   * @type {module:echarts/coord/cartesian/Axis2D}
   */
  axis: null,

  /**
   * @override
   */
  init: function () {
    AxisModel.superApply(this, 'init', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  mergeOption: function () {
    AxisModel.superApply(this, 'mergeOption', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  restoreData: function () {
    AxisModel.superApply(this, 'restoreData', arguments);
    this.resetRange();
  },

  /**
   * @override
   * @return {module:echarts/model/Component}
   */
  getCoordSysModel: function () {
    return this.ecModel.queryComponents({
      mainType: 'grid',
      index: this.option.gridIndex,
      id: this.option.gridId
    })[0];
  }
});

function getAxisType(axisDim, option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  // Offset is for multiple axis on the same position
  offset: 0
};
axisModelCreator('x', AxisModel, getAxisType, extraOption);
axisModelCreator('y', AxisModel, getAxisType, extraOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "5aa9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var _util = __webpack_require__("6d8b");

var isObject = _util.isObject;
var each = _util.each;
var map = _util.map;
var indexOf = _util.indexOf;
var retrieve = _util.retrieve;

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

var _axisHelper = __webpack_require__("697e");

var createScaleByModel = _axisHelper.createScaleByModel;
var ifAxisCrossZero = _axisHelper.ifAxisCrossZero;
var niceScaleExtent = _axisHelper.niceScaleExtent;
var estimateLabelUnionRect = _axisHelper.estimateLabelUnionRect;

var Cartesian2D = __webpack_require__("cbe9");

var Axis2D = __webpack_require__("ec02");

var CoordinateSystem = __webpack_require__("2039");

var _dataStackHelper = __webpack_require__("ee1a");

var getStackedDimension = _dataStackHelper.getStackedDimension;

__webpack_require__("8ed2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Grid is a region which contains at most 4 cartesian systems
 *
 * TODO Default cartesian
 */
// Depends on GridModel, AxisModel, which performs preprocess.

/**
 * Check if the axis is used in the specified grid
 * @inner
 */
function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
  return axisModel.getCoordSysModel() === gridModel;
}

function Grid(gridModel, ecModel, api) {
  /**
   * @type {Object.<string, module:echarts/coord/cartesian/Cartesian2D>}
   * @private
   */
  this._coordsMap = {};
  /**
   * @type {Array.<module:echarts/coord/cartesian/Cartesian>}
   * @private
   */

  this._coordsList = [];
  /**
   * @type {Object.<string, Array.<module:echarts/coord/cartesian/Axis2D>>}
   * @private
   */

  this._axesMap = {};
  /**
   * @type {Array.<module:echarts/coord/cartesian/Axis2D>}
   * @private
   */

  this._axesList = [];

  this._initCartesian(gridModel, ecModel, api);

  this.model = gridModel;
}

var gridProto = Grid.prototype;
gridProto.type = 'grid';
gridProto.axisPointerEnabled = true;

gridProto.getRect = function () {
  return this._rect;
};

gridProto.update = function (ecModel, api) {
  var axesMap = this._axesMap;

  this._updateScale(ecModel, this.model);

  each(axesMap.x, function (xAxis) {
    niceScaleExtent(xAxis.scale, xAxis.model);
  });
  each(axesMap.y, function (yAxis) {
    niceScaleExtent(yAxis.scale, yAxis.model);
  }); // Key: axisDim_axisIndex, value: boolean, whether onZero target.

  var onZeroRecords = {};
  each(axesMap.x, function (xAxis) {
    fixAxisOnZero(axesMap, 'y', xAxis, onZeroRecords);
  });
  each(axesMap.y, function (yAxis) {
    fixAxisOnZero(axesMap, 'x', yAxis, onZeroRecords);
  }); // Resize again if containLabel is enabled
  // FIXME It may cause getting wrong grid size in data processing stage

  this.resize(this.model, api);
};

function fixAxisOnZero(axesMap, otherAxisDim, axis, onZeroRecords) {
  axis.getAxesOnZeroOf = function () {
    // TODO: onZero of multiple axes.
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
  }; // onZero can not be enabled in these two situations:
  // 1. When any other axis is a category axis.
  // 2. When no axis is cross 0 point.


  var otherAxes = axesMap[otherAxisDim];
  var otherAxisOnZeroOf;
  var axisModel = axis.model;
  var onZero = axisModel.get('axisLine.onZero');
  var onZeroAxisIndex = axisModel.get('axisLine.onZeroAxisIndex');

  if (!onZero) {
    return;
  } // If target axis is specified.


  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
    }
  } else {
    // Find the first available other axis.
    for (var idx in otherAxes) {
      if (otherAxes.hasOwnProperty(idx) && canOnZeroToAxis(otherAxes[idx]) // Consider that two Y axes on one value axis,
      // if both onZero, the two Y axes overlap.
      && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
        otherAxisOnZeroOf = otherAxes[idx];
        break;
      }
    }
  }

  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
  }

  function getOnZeroRecordKey(axis) {
    return axis.dim + '_' + axis.index;
  }
}

function canOnZeroToAxis(axis) {
  return axis && axis.type !== 'category' && axis.type !== 'time' && ifAxisCrossZero(axis);
}
/**
 * Resize the grid
 * @param {module:echarts/coord/cartesian/GridModel} gridModel
 * @param {module:echarts/ExtensionAPI} api
 */


gridProto.resize = function (gridModel, api, ignoreContainLabel) {
  var gridRect = getLayoutRect(gridModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
  this._rect = gridRect;
  var axesList = this._axesList;
  adjustAxes(); // Minus label size

  if (!ignoreContainLabel && gridModel.get('containLabel')) {
    each(axesList, function (axis) {
      if (!axis.model.get('axisLabel.inside')) {
        var labelUnionRect = estimateLabelUnionRect(axis);

        if (labelUnionRect) {
          var dim = axis.isHorizontal() ? 'height' : 'width';
          var margin = axis.model.get('axisLabel.margin');
          gridRect[dim] -= labelUnionRect[dim] + margin;

          if (axis.position === 'top') {
            gridRect.y += labelUnionRect.height + margin;
          } else if (axis.position === 'left') {
            gridRect.x += labelUnionRect.width + margin;
          }
        }
      }
    });
    adjustAxes();
  }

  function adjustAxes() {
    each(axesList, function (axis) {
      var isHorizontal = axis.isHorizontal();
      var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
      var idx = axis.inverse ? 1 : 0;
      axis.setExtent(extent[idx], extent[1 - idx]);
      updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y);
    });
  }
};
/**
 * @param {string} axisType
 * @param {number} [axisIndex]
 */


gridProto.getAxis = function (axisType, axisIndex) {
  var axesMapOnDim = this._axesMap[axisType];

  if (axesMapOnDim != null) {
    if (axisIndex == null) {
      // Find first axis
      for (var name in axesMapOnDim) {
        if (axesMapOnDim.hasOwnProperty(name)) {
          return axesMapOnDim[name];
        }
      }
    }

    return axesMapOnDim[axisIndex];
  }
};
/**
 * @return {Array.<module:echarts/coord/Axis>}
 */


gridProto.getAxes = function () {
  return this._axesList.slice();
};
/**
 * Usage:
 *      grid.getCartesian(xAxisIndex, yAxisIndex);
 *      grid.getCartesian(xAxisIndex);
 *      grid.getCartesian(null, yAxisIndex);
 *      grid.getCartesian({xAxisIndex: ..., yAxisIndex: ...});
 *
 * @param {number|Object} [xAxisIndex]
 * @param {number} [yAxisIndex]
 */


gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
  if (xAxisIndex != null && yAxisIndex != null) {
    var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
    return this._coordsMap[key];
  }

  if (isObject(xAxisIndex)) {
    yAxisIndex = xAxisIndex.yAxisIndex;
    xAxisIndex = xAxisIndex.xAxisIndex;
  } // When only xAxisIndex or yAxisIndex given, find its first cartesian.


  for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
    if (coordList[i].getAxis('x').index === xAxisIndex || coordList[i].getAxis('y').index === yAxisIndex) {
      return coordList[i];
    }
  }
};

gridProto.getCartesians = function () {
  return this._coordsList.slice();
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.convertToPixel = function (ecModel, finder, value) {
  var target = this._findConvertTarget(ecModel, finder);

  return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.convertFromPixel = function (ecModel, finder, value) {
  var target = this._findConvertTarget(ecModel, finder);

  return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
};
/**
 * @inner
 */


gridProto._findConvertTarget = function (ecModel, finder) {
  var seriesModel = finder.seriesModel;
  var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents('xAxis')[0];
  var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents('yAxis')[0];
  var gridModel = finder.gridModel;
  var coordsList = this._coordsList;
  var cartesian;
  var axis;

  if (seriesModel) {
    cartesian = seriesModel.coordinateSystem;
    indexOf(coordsList, cartesian) < 0 && (cartesian = null);
  } else if (xAxisModel && yAxisModel) {
    cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
  } else if (xAxisModel) {
    axis = this.getAxis('x', xAxisModel.componentIndex);
  } else if (yAxisModel) {
    axis = this.getAxis('y', yAxisModel.componentIndex);
  } // Lowest priority.
  else if (gridModel) {
      var grid = gridModel.coordinateSystem;

      if (grid === this) {
        cartesian = this._coordsList[0];
      }
    }

  return {
    cartesian: cartesian,
    axis: axis
  };
};
/**
 * @implements
 * see {module:echarts/CoodinateSystem}
 */


gridProto.containPoint = function (point) {
  var coord = this._coordsList[0];

  if (coord) {
    return coord.containPoint(point);
  }
};
/**
 * Initialize cartesian coordinate systems
 * @private
 */


gridProto._initCartesian = function (gridModel, ecModel, api) {
  var axisPositionUsed = {
    left: false,
    right: false,
    top: false,
    bottom: false
  };
  var axesMap = {
    x: {},
    y: {}
  };
  var axesCount = {
    x: 0,
    y: 0
  }; /// Create axis

  ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
  ecModel.eachComponent('yAxis', createAxisCreator('y'), this);

  if (!axesCount.x || !axesCount.y) {
    // Roll back when there no either x or y axis
    this._axesMap = {};
    this._axesList = [];
    return;
  }

  this._axesMap = axesMap; /// Create cartesian2d

  each(axesMap.x, function (xAxis, xAxisIndex) {
    each(axesMap.y, function (yAxis, yAxisIndex) {
      var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
      var cartesian = new Cartesian2D(key);
      cartesian.grid = this;
      cartesian.model = gridModel;
      this._coordsMap[key] = cartesian;

      this._coordsList.push(cartesian);

      cartesian.addAxis(xAxis);
      cartesian.addAxis(yAxis);
    }, this);
  }, this);

  function createAxisCreator(axisType) {
    return function (axisModel, idx) {
      if (!isAxisUsedInTheGrid(axisModel, gridModel, ecModel)) {
        return;
      }

      var axisPosition = axisModel.get('position');

      if (axisType === 'x') {
        // Fix position
        if (axisPosition !== 'top' && axisPosition !== 'bottom') {
          // Default bottom of X
          axisPosition = axisPositionUsed.bottom ? 'top' : 'bottom';
        }
      } else {
        // Fix position
        if (axisPosition !== 'left' && axisPosition !== 'right') {
          // Default left of Y
          axisPosition = axisPositionUsed.left ? 'right' : 'left';
        }
      }

      axisPositionUsed[axisPosition] = true;
      var axis = new Axis2D(axisType, createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisPosition);
      var isCategory = axis.type === 'category';
      axis.onBand = isCategory && axisModel.get('boundaryGap');
      axis.inverse = axisModel.get('inverse'); // Inject axis into axisModel

      axisModel.axis = axis; // Inject axisModel into axis

      axis.model = axisModel; // Inject grid info axis

      axis.grid = this; // Index of axis, can be used as key

      axis.index = idx;

      this._axesList.push(axis);

      axesMap[axisType][idx] = axis;
      axesCount[axisType]++;
    };
  }
};
/**
 * Update cartesian properties from series
 * @param  {module:echarts/model/Option} option
 * @private
 */


gridProto._updateScale = function (ecModel, gridModel) {
  // Reset scale
  each(this._axesList, function (axis) {
    axis.scale.setExtent(Infinity, -Infinity);
  });
  ecModel.eachSeries(function (seriesModel) {
    if (isCartesian2D(seriesModel)) {
      var axesModels = findAxesModels(seriesModel, ecModel);
      var xAxisModel = axesModels[0];
      var yAxisModel = axesModels[1];

      if (!isAxisUsedInTheGrid(xAxisModel, gridModel, ecModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel, ecModel)) {
        return;
      }

      var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
      var data = seriesModel.getData();
      var xAxis = cartesian.getAxis('x');
      var yAxis = cartesian.getAxis('y');

      if (data.type === 'list') {
        unionExtent(data, xAxis, seriesModel);
        unionExtent(data, yAxis, seriesModel);
      }
    }
  }, this);

  function unionExtent(data, axis, seriesModel) {
    each(data.mapDimension(axis.dim, true), function (dim) {
      axis.scale.unionExtentFromData( // For example, the extent of the orginal dimension
      // is [0.1, 0.5], the extent of the `stackResultDimension`
      // is [7, 9], the final extent should not include [0.1, 0.5].
      data, getStackedDimension(data, dim));
    });
  }
};
/**
 * @param {string} [dim] 'x' or 'y' or 'auto' or null/undefined
 * @return {Object} {baseAxes: [], otherAxes: []}
 */


gridProto.getTooltipAxes = function (dim) {
  var baseAxes = [];
  var otherAxes = [];
  each(this.getCartesians(), function (cartesian) {
    var baseAxis = dim != null && dim !== 'auto' ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
    var otherAxis = cartesian.getOtherAxis(baseAxis);
    indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
    indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
  });
  return {
    baseAxes: baseAxes,
    otherAxes: otherAxes
  };
};
/**
 * @inner
 */


function updateAxisTransform(axis, coordBase) {
  var axisExtent = axis.getExtent();
  var axisExtentSum = axisExtent[0] + axisExtent[1]; // Fast transform

  axis.toGlobalCoord = axis.dim === 'x' ? function (coord) {
    return coord + coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
  axis.toLocalCoord = axis.dim === 'x' ? function (coord) {
    return coord - coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
}

var axesTypes = ['xAxis', 'yAxis'];
/**
 * @inner
 */

function findAxesModels(seriesModel, ecModel) {
  return map(axesTypes, function (axisType) {
    var axisModel = seriesModel.getReferringComponents(axisType)[0];
    return axisModel;
  });
}
/**
 * @inner
 */


function isCartesian2D(seriesModel) {
  return seriesModel.get('coordinateSystem') === 'cartesian2d';
}

Grid.create = function (ecModel, api) {
  var grids = [];
  ecModel.eachComponent('grid', function (gridModel, idx) {
    var grid = new Grid(gridModel, ecModel, api);
    grid.name = 'grid_' + idx; // dataSampling requires axis extent, so resize
    // should be performed in create stage.

    grid.resize(gridModel, api, true);
    gridModel.coordinateSystem = grid;
    grids.push(grid);
  }); // Inject the coordinateSystems into seriesModel

  ecModel.eachSeries(function (seriesModel) {
    if (!isCartesian2D(seriesModel)) {
      return;
    }

    var axesModels = findAxesModels(seriesModel, ecModel);
    var xAxisModel = axesModels[0];
    var yAxisModel = axesModels[1];
    var gridModel = xAxisModel.getCoordSysModel();
    var grid = gridModel.coordinateSystem;
    seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
  });
  return grids;
}; // For deciding which dimensions to use when creating list data


Grid.dimensions = Grid.prototype.dimensions = Cartesian2D.prototype.dimensions;
CoordinateSystem.register('cartesian2d', Grid);
var _default = Grid;
module.exports = _default;

/***/ }),

/***/ "697e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var OrdinalScale = __webpack_require__("18c0");

var IntervalScale = __webpack_require__("89e3");

var Scale = __webpack_require__("e0d8");

var numberUtil = __webpack_require__("3842");

var _barGrid = __webpack_require__("9d57");

var prepareLayoutBarSeries = _barGrid.prepareLayoutBarSeries;
var makeColumnLayout = _barGrid.makeColumnLayout;
var retrieveColumnLayout = _barGrid.retrieveColumnLayout;

var BoundingRect = __webpack_require__("9850");

__webpack_require__("216a");

__webpack_require__("8c2a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Get axis scale extent before niced.
 * Item of returned array can only be number (including Infinity and NaN).
 */
function getScaleExtent(scale, model) {
  var scaleType = scale.type;
  var min = model.getMin();
  var max = model.getMax();
  var fixMin = min != null;
  var fixMax = max != null;
  var originalExtent = scale.getExtent();
  var axisDataLen;
  var boundaryGap;
  var span;

  if (scaleType === 'ordinal') {
    axisDataLen = model.getCategories().length;
  } else {
    boundaryGap = model.get('boundaryGap');

    if (!zrUtil.isArray(boundaryGap)) {
      boundaryGap = [boundaryGap || 0, boundaryGap || 0];
    }

    if (typeof boundaryGap[0] === 'boolean') {
      boundaryGap = [0, 0];
    }

    boundaryGap[0] = numberUtil.parsePercent(boundaryGap[0], 1);
    boundaryGap[1] = numberUtil.parsePercent(boundaryGap[1], 1);
    span = originalExtent[1] - originalExtent[0] || Math.abs(originalExtent[0]);
  } // Notice: When min/max is not set (that is, when there are null/undefined,
  // which is the most common case), these cases should be ensured:
  // (1) For 'ordinal', show all axis.data.
  // (2) For others:
  //      + `boundaryGap` is applied (if min/max set, boundaryGap is
  //      disabled).
  //      + If `needCrossZero`, min/max should be zero, otherwise, min/max should
  //      be the result that originalExtent enlarged by boundaryGap.
  // (3) If no data, it should be ensured that `scale.setBlank` is set.
  // FIXME
  // (1) When min/max is 'dataMin' or 'dataMax', should boundaryGap be able to used?
  // (2) When `needCrossZero` and all data is positive/negative, should it be ensured
  // that the results processed by boundaryGap are positive/negative?


  if (min == null) {
    min = scaleType === 'ordinal' ? axisDataLen ? 0 : NaN : originalExtent[0] - boundaryGap[0] * span;
  }

  if (max == null) {
    max = scaleType === 'ordinal' ? axisDataLen ? axisDataLen - 1 : NaN : originalExtent[1] + boundaryGap[1] * span;
  }

  if (min === 'dataMin') {
    min = originalExtent[0];
  } else if (typeof min === 'function') {
    min = min({
      min: originalExtent[0],
      max: originalExtent[1]
    });
  }

  if (max === 'dataMax') {
    max = originalExtent[1];
  } else if (typeof max === 'function') {
    max = max({
      min: originalExtent[0],
      max: originalExtent[1]
    });
  }

  (min == null || !isFinite(min)) && (min = NaN);
  (max == null || !isFinite(max)) && (max = NaN);
  scale.setBlank(zrUtil.eqNaN(min) || zrUtil.eqNaN(max) || scaleType === 'ordinal' && !scale.getOrdinalMeta().categories.length); // Evaluate if axis needs cross zero

  if (model.getNeedCrossZero()) {
    // Axis is over zero and min is not set
    if (min > 0 && max > 0 && !fixMin) {
      min = 0;
    } // Axis is under zero and max is not set


    if (min < 0 && max < 0 && !fixMax) {
      max = 0;
    }
  } // If bars are placed on a base axis of type time or interval account for axis boundary overflow and current axis
  // is base axis
  // FIXME
  // (1) Consider support value axis, where below zero and axis `onZero` should be handled properly.
  // (2) Refactor the logic with `barGrid`. Is it not need to `makeBarWidthAndOffsetInfo` twice with different extent?
  //     Should not depend on series type `bar`?
  // (3) Fix that might overlap when using dataZoom.
  // (4) Consider other chart types using `barGrid`?
  // See #6728, #4862, `test/bar-overflow-time-plot.html`


  var ecModel = model.ecModel;

  if (ecModel && scaleType === 'time'
  /*|| scaleType === 'interval' */
  ) {
    var barSeriesModels = prepareLayoutBarSeries('bar', ecModel);
    var isBaseAxisAndHasBarSeries;
    zrUtil.each(barSeriesModels, function (seriesModel) {
      isBaseAxisAndHasBarSeries |= seriesModel.getBaseAxis() === model.axis;
    });

    if (isBaseAxisAndHasBarSeries) {
      // Calculate placement of bars on axis
      var barWidthAndOffset = makeColumnLayout(barSeriesModels); // Adjust axis min and max to account for overflow

      var adjustedScale = adjustScaleForOverflow(min, max, model, barWidthAndOffset);
      min = adjustedScale.min;
      max = adjustedScale.max;
    }
  }

  return [min, max];
}

function adjustScaleForOverflow(min, max, model, barWidthAndOffset) {
  // Get Axis Length
  var axisExtent = model.axis.getExtent();
  var axisLength = axisExtent[1] - axisExtent[0]; // Get bars on current base axis and calculate min and max overflow

  var barsOnCurrentAxis = retrieveColumnLayout(barWidthAndOffset, model.axis);

  if (barsOnCurrentAxis === undefined) {
    return {
      min: min,
      max: max
    };
  }

  var minOverflow = Infinity;
  zrUtil.each(barsOnCurrentAxis, function (item) {
    minOverflow = Math.min(item.offset, minOverflow);
  });
  var maxOverflow = -Infinity;
  zrUtil.each(barsOnCurrentAxis, function (item) {
    maxOverflow = Math.max(item.offset + item.width, maxOverflow);
  });
  minOverflow = Math.abs(minOverflow);
  maxOverflow = Math.abs(maxOverflow);
  var totalOverFlow = minOverflow + maxOverflow; // Calulate required buffer based on old range and overflow

  var oldRange = max - min;
  var oldRangePercentOfNew = 1 - (minOverflow + maxOverflow) / axisLength;
  var overflowBuffer = oldRange / oldRangePercentOfNew - oldRange;
  max += overflowBuffer * (maxOverflow / totalOverFlow);
  min -= overflowBuffer * (minOverflow / totalOverFlow);
  return {
    min: min,
    max: max
  };
}

function niceScaleExtent(scale, model) {
  var extent = getScaleExtent(scale, model);
  var fixMin = model.getMin() != null;
  var fixMax = model.getMax() != null;
  var splitNumber = model.get('splitNumber');

  if (scale.type === 'log') {
    scale.base = model.get('logBase');
  }

  var scaleType = scale.type;
  scale.setExtent(extent[0], extent[1]);
  scale.niceExtent({
    splitNumber: splitNumber,
    fixMin: fixMin,
    fixMax: fixMax,
    minInterval: scaleType === 'interval' || scaleType === 'time' ? model.get('minInterval') : null,
    maxInterval: scaleType === 'interval' || scaleType === 'time' ? model.get('maxInterval') : null
  }); // If some one specified the min, max. And the default calculated interval
  // is not good enough. He can specify the interval. It is often appeared
  // in angle axis with angle 0 - 360. Interval calculated in interval scale is hard
  // to be 60.
  // FIXME

  var interval = model.get('interval');

  if (interval != null) {
    scale.setInterval && scale.setInterval(interval);
  }
}
/**
 * @param {module:echarts/model/Model} model
 * @param {string} [axisType] Default retrieve from model.type
 * @return {module:echarts/scale/*}
 */


function createScaleByModel(model, axisType) {
  axisType = axisType || model.get('type');

  if (axisType) {
    switch (axisType) {
      // Buildin scale
      case 'category':
        return new OrdinalScale(model.getOrdinalMeta ? model.getOrdinalMeta() : model.getCategories(), [Infinity, -Infinity]);

      case 'value':
        return new IntervalScale();
      // Extended scale, like time and log

      default:
        return (Scale.getClass(axisType) || IntervalScale).create(model);
    }
  }
}
/**
 * Check if the axis corss 0
 */


function ifAxisCrossZero(axis) {
  var dataExtent = axis.scale.getExtent();
  var min = dataExtent[0];
  var max = dataExtent[1];
  return !(min > 0 && max > 0 || min < 0 && max < 0);
}
/**
 * @param {module:echarts/coord/Axis} axis
 * @return {Function} Label formatter function.
 *         param: {number} tickValue,
 *         param: {number} idx, the index in all ticks.
 *                         If category axis, this param is not requied.
 *         return: {string} label string.
 */


function makeLabelFormatter(axis) {
  var labelFormatter = axis.getLabelModel().get('formatter');
  var categoryTickStart = axis.type === 'category' ? axis.scale.getExtent()[0] : null;

  if (typeof labelFormatter === 'string') {
    labelFormatter = function (tpl) {
      return function (val) {
        // For category axis, get raw value; for numeric axis,
        // get foramtted label like '1,333,444'.
        val = axis.scale.getLabel(val);
        return tpl.replace('{value}', val != null ? val : '');
      };
    }(labelFormatter); // Consider empty array


    return labelFormatter;
  } else if (typeof labelFormatter === 'function') {
    return function (tickValue, idx) {
      // The original intention of `idx` is "the index of the tick in all ticks".
      // But the previous implementation of category axis do not consider the
      // `axisLabel.interval`, which cause that, for example, the `interval` is
      // `1`, then the ticks "name5", "name7", "name9" are displayed, where the
      // corresponding `idx` are `0`, `2`, `4`, but not `0`, `1`, `2`. So we keep
      // the definition here for back compatibility.
      if (categoryTickStart != null) {
        idx = tickValue - categoryTickStart;
      }

      return labelFormatter(getAxisRawValue(axis, tickValue), idx);
    };
  } else {
    return function (tick) {
      return axis.scale.getLabel(tick);
    };
  }
}

function getAxisRawValue(axis, value) {
  // In category axis with data zoom, tick is not the original
  // index of axis.data. So tick should not be exposed to user
  // in category axis.
  return axis.type === 'category' ? axis.scale.getLabel(value) : value;
}
/**
 * @param {module:echarts/coord/Axis} axis
 * @return {module:zrender/core/BoundingRect} Be null/undefined if no labels.
 */


function estimateLabelUnionRect(axis) {
  var axisModel = axis.model;
  var scale = axis.scale;

  if (!axisModel.get('axisLabel.show') || scale.isBlank()) {
    return;
  }

  var isCategory = axis.type === 'category';
  var realNumberScaleTicks;
  var tickCount;
  var categoryScaleExtent = scale.getExtent(); // Optimize for large category data, avoid call `getTicks()`.

  if (isCategory) {
    tickCount = scale.count();
  } else {
    realNumberScaleTicks = scale.getTicks();
    tickCount = realNumberScaleTicks.length;
  }

  var axisLabelModel = axis.getLabelModel();
  var labelFormatter = makeLabelFormatter(axis);
  var rect;
  var step = 1; // Simple optimization for large amount of labels

  if (tickCount > 40) {
    step = Math.ceil(tickCount / 40);
  }

  for (var i = 0; i < tickCount; i += step) {
    var tickValue = realNumberScaleTicks ? realNumberScaleTicks[i] : categoryScaleExtent[0] + i;
    var label = labelFormatter(tickValue);
    var unrotatedSingleRect = axisLabelModel.getTextRect(label);
    var singleRect = rotateTextRect(unrotatedSingleRect, axisLabelModel.get('rotate') || 0);
    rect ? rect.union(singleRect) : rect = singleRect;
  }

  return rect;
}

function rotateTextRect(textRect, rotate) {
  var rotateRadians = rotate * Math.PI / 180;
  var boundingBox = textRect.plain();
  var beforeWidth = boundingBox.width;
  var beforeHeight = boundingBox.height;
  var afterWidth = beforeWidth * Math.cos(rotateRadians) + beforeHeight * Math.sin(rotateRadians);
  var afterHeight = beforeWidth * Math.sin(rotateRadians) + beforeHeight * Math.cos(rotateRadians);
  var rotatedRect = new BoundingRect(boundingBox.x, boundingBox.y, afterWidth, afterHeight);
  return rotatedRect;
}
/**
 * @param {module:echarts/src/model/Model} model axisLabelModel or axisTickModel
 * @return {number|String} Can be null|'auto'|number|function
 */


function getOptionCategoryInterval(model) {
  var interval = model.get('interval');
  return interval == null ? 'auto' : interval;
}
/**
 * Set `categoryInterval` as 0 implicitly indicates that
 * show all labels reguardless of overlap.
 * @param {Object} axis axisModel.axis
 * @return {boolean}
 */


function shouldShowAllLabels(axis) {
  return axis.type === 'category' && getOptionCategoryInterval(axis.getLabelModel()) === 0;
}

exports.getScaleExtent = getScaleExtent;
exports.niceScaleExtent = niceScaleExtent;
exports.createScaleByModel = createScaleByModel;
exports.ifAxisCrossZero = ifAxisCrossZero;
exports.makeLabelFormatter = makeLabelFormatter;
exports.getAxisRawValue = getAxisRawValue;
exports.estimateLabelUnionRect = estimateLabelUnionRect;
exports.getOptionCategoryInterval = getOptionCategoryInterval;
exports.shouldShowAllLabels = shouldShowAllLabels;

/***/ }),

/***/ "71ad":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var defaultOption = {
  show: true,
  zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: false,
  // Axis name displayed.
  name: '',
  // 'start' | 'middle' | 'end'
  nameLocation: 'end',
  // By degree. By defualt auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: '...',
    placeholder: '.'
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: false,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: true,
    onZeroAxisIndex: null,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    },
    // The arrow at both ends the the axis.
    symbol: ['none', 'none'],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: true,
    // Whether axisTick is inside the grid or outside the grid.
    inside: false,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: false,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#ccc'],
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
    }
  }
};
var axisDefault = {};
axisDefault.categoryAxis = zrUtil.merge({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: true,
  // Set false to faster category collection.
  // Only usefull in the case like: category is
  // ['2012-01-01', '2012-01-02', ...], where the input
  // data has been ensured not duplicate and is large data.
  // null means "auto":
  // if axis.data provided, do not deduplication,
  // else do deduplication.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: false
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: false,
    interval: 'auto'
  },
  axisLabel: {
    interval: 'auto'
  }
}, defaultOption);
axisDefault.valueAxis = zrUtil.merge({
  // The gap at both ends of the axis. For value axis, [GAP, GAP], where
  // `GAP` can be an absolute pixel number (like `35`), or percent (like `'30%'`)
  boundaryGap: [0, 0],
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  // Min value of the axis. can be:
  // + a number
  // + 'dataMin': use the min value in data.
  // + null/undefined: auto decide min value (consider pretty look and boundaryGap).
  // min: null,
  // Max value of the axis. can be:
  // + a number
  // + 'dataMax': use the max value in data.
  // + null/undefined: auto decide max value (consider pretty look and boundaryGap).
  // max: null,
  // Readonly prop, specifies start value of the range when using data zoom.
  // rangeStart: null
  // Readonly prop, specifies end value of the range when using data zoom.
  // rangeEnd: null
  // Optional value can be:
  // + `false`: always include value 0.
  // + `true`: the extent do not consider value 0.
  // scale: false,
  // AxisTick and axisLabel and splitLine are caculated based on splitNumber.
  splitNumber: 5,
  // Interval specifies the span of the ticks is mandatorily.
  // interval: null
  // Specify min interval when auto calculate tick interval.
  // minInterval: null
  // Specify max interval when auto calculate tick interval.
  // maxInterval: null
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: false,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Lenght of minor tick
    length: 3,
    // Same inside with axisTick
    // Line style
    lineStyle: {// Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: '#eee',
      width: 1
    }
  }
}, defaultOption);
axisDefault.timeAxis = zrUtil.defaults({
  scale: true,
  min: 'dataMin',
  max: 'dataMax'
}, axisDefault.valueAxis);
axisDefault.logAxis = zrUtil.defaults({
  scale: true,
  logBase: 10
}, axisDefault.valueAxis);
var _default = axisDefault;
module.exports = _default;

/***/ }),

/***/ "83ba":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var _layout = __webpack_require__("f934");

var getLayoutParams = _layout.getLayoutParams;
var sizeCalculable = _layout.sizeCalculable;
var mergeLayoutParam = _layout.mergeLayoutParam;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var CalendarModel = ComponentModel.extend({
  type: 'calendar',

  /**
   * @type {module:echarts/coord/calendar/Calendar}
   */
  coordinateSystem: null,
  defaultOption: {
    zlevel: 0,
    z: 2,
    left: 80,
    top: 60,
    cellSize: 20,
    // horizontal vertical
    orient: 'horizontal',
    // month separate line style
    splitLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 1,
        type: 'solid'
      }
    },
    // rect style  temporarily unused emphasis
    itemStyle: {
      color: '#fff',
      borderWidth: 1,
      borderColor: '#ccc'
    },
    // week text style
    dayLabel: {
      show: true,
      // a week first day
      firstDay: 0,
      // start end
      position: 'start',
      margin: '50%',
      // 50% of cellSize
      nameMap: 'en',
      color: '#000'
    },
    // month text style
    monthLabel: {
      show: true,
      // start end
      position: 'start',
      margin: 5,
      // center or left
      align: 'center',
      // cn en []
      nameMap: 'en',
      formatter: null,
      color: '#000'
    },
    // year text style
    yearLabel: {
      show: true,
      // top bottom left right
      position: null,
      margin: 30,
      formatter: null,
      color: '#ccc',
      fontFamily: 'sans-serif',
      fontWeight: 'bolder',
      fontSize: 20
    }
  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel, extraOpt) {
    var inputPositionParams = getLayoutParams(option);
    CalendarModel.superApply(this, 'init', arguments);
    mergeAndNormalizeLayoutParams(option, inputPositionParams);
  },

  /**
   * @override
   */
  mergeOption: function (option, extraOpt) {
    CalendarModel.superApply(this, 'mergeOption', arguments);
    mergeAndNormalizeLayoutParams(this.option, option);
  }
});

function mergeAndNormalizeLayoutParams(target, raw) {
  // Normalize cellSize
  var cellSize = target.cellSize;

  if (!zrUtil.isArray(cellSize)) {
    cellSize = target.cellSize = [cellSize, cellSize];
  } else if (cellSize.length === 1) {
    cellSize[1] = cellSize[0];
  }

  var ignoreSize = zrUtil.map([0, 1], function (hvIdx) {
    // If user have set `width` or both `left` and `right`, cellSize
    // will be automatically set to 'auto', otherwise the default
    // setting of cellSize will make `width` setting not work.
    if (sizeCalculable(raw, hvIdx)) {
      cellSize[hvIdx] = 'auto';
    }

    return cellSize[hvIdx] != null && cellSize[hvIdx] !== 'auto';
  });
  mergeLayoutParam(target, raw, {
    type: 'box',
    ignoreSize: ignoreSize
  });
}

var _default = CalendarModel;
module.exports = _default;

/***/ }),

/***/ "8ed2":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var ComponentModel = __webpack_require__("6cb7");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Grid 是在有直角坐标系的时候必须要存在的
// 所以这里也要被 Cartesian2D 依赖
var _default = ComponentModel.extend({
  type: 'grid',
  dependencies: ['xAxis', 'yAxis'],
  layoutMode: 'box',

  /**
   * @type {module:echarts/coord/cartesian/Grid}
   */
  coordinateSystem: null,
  defaultOption: {
    show: false,
    zlevel: 0,
    z: 0,
    left: '10%',
    top: 60,
    right: '10%',
    bottom: 60,
    // If grid size contain label
    containLabel: false,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#ccc'
  }
});

module.exports = _default;

/***/ }),

/***/ "9e47":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var axisDefault = __webpack_require__("71ad");

var ComponentModel = __webpack_require__("6cb7");

var _layout = __webpack_require__("f934");

var getLayoutParams = _layout.getLayoutParams;
var mergeLayoutParam = _layout.mergeLayoutParam;

var OrdinalMeta = __webpack_require__("8e43");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME axisType is fixed ?
var AXIS_TYPES = ['value', 'category', 'time', 'log'];
/**
 * Generate sub axis model class
 * @param {string} axisName 'x' 'y' 'radius' 'angle' 'parallel'
 * @param {module:echarts/model/Component} BaseAxisModelClass
 * @param {Function} axisTypeDefaulter
 * @param {Object} [extraDefaultOption]
 */

function _default(axisName, BaseAxisModelClass, axisTypeDefaulter, extraDefaultOption) {
  zrUtil.each(AXIS_TYPES, function (axisType) {
    BaseAxisModelClass.extend({
      /**
       * @readOnly
       */
      type: axisName + 'Axis.' + axisType,
      mergeDefaultAndTheme: function (option, ecModel) {
        var layoutMode = this.layoutMode;
        var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
        var themeModel = ecModel.getTheme();
        zrUtil.merge(option, themeModel.get(axisType + 'Axis'));
        zrUtil.merge(option, this.getDefaultOption());
        option.type = axisTypeDefaulter(axisName, option);

        if (layoutMode) {
          mergeLayoutParam(option, inputPositionParams, layoutMode);
        }
      },

      /**
       * @override
       */
      optionUpdated: function () {
        var thisOption = this.option;

        if (thisOption.type === 'category') {
          this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
        }
      },

      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */
      getCategories: function (rawData) {
        var option = this.option; // FIXME
        // warning if called before all of 'getInitailData' finished.

        if (option.type === 'category') {
          if (rawData) {
            return option.data;
          }

          return this.__ordinalMeta.categories;
        }
      },
      getOrdinalMeta: function () {
        return this.__ordinalMeta;
      },
      defaultOption: zrUtil.mergeAll([{}, axisDefault[axisType + 'Axis'], extraDefaultOption], true)
    });
  });
  ComponentModel.registerSubTypeDefaulter(axisName + 'Axis', zrUtil.curry(axisTypeDefaulter, axisName));
}

module.exports = _default;

/***/ }),

/***/ "aa3e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
function dataToCoordSize(dataSize, dataItem) {
  // dataItem is necessary in log axis.
  dataItem = dataItem || [0, 0];
  return zrUtil.map(['x', 'y'], function (dim, dimIdx) {
    var axis = this.getAxis(dim);
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    return axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
  }, this);
}

function _default(coordSys) {
  var rect = coordSys.grid.getRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: 'cartesian2d',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function (data) {
        // do not provide "out" param
        return coordSys.dataToPoint(data);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "cbe9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var Cartesian = __webpack_require__("cf7e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function Cartesian2D(name) {
  Cartesian.call(this, name);
}

Cartesian2D.prototype = {
  constructor: Cartesian2D,
  type: 'cartesian2d',

  /**
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: ['x', 'y'],

  /**
   * Base axis will be used on stacking.
   *
   * @return {module:echarts/coord/cartesian/Axis2D}
   */
  getBaseAxis: function () {
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAxis('x');
  },

  /**
   * If contain point
   * @param {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var axisX = this.getAxis('x');
    var axisY = this.getAxis('y');
    return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
  },

  /**
   * If contain data
   * @param {Array.<number>} data
   * @return {boolean}
   */
  containData: function (data) {
    return this.getAxis('x').containData(data[0]) && this.getAxis('y').containData(data[1]);
  },

  /**
   * @param {Array.<number>} data
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  dataToPoint: function (data, reserved, out) {
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out = out || [];
    out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(data[0]));
    out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(data[1]));
    return out;
  },

  /**
   * @param {Array.<number>} data
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  clampData: function (data, out) {
    var xScale = this.getAxis('x').scale;
    var yScale = this.getAxis('y').scale;
    var xAxisExtent = xScale.getExtent();
    var yAxisExtent = yScale.getExtent();
    var x = xScale.parse(data[0]);
    var y = yScale.parse(data[1]);
    out = out || [];
    out[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
    out[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
    return out;
  },

  /**
   * @param {Array.<number>} point
   * @param {Array.<number>} out
   * @return {Array.<number>}
   */
  pointToData: function (point, out) {
    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out = out || [];
    out[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]));
    out[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]));
    return out;
  },

  /**
   * Get other axis
   * @param {module:echarts/coord/cartesian/Axis2D} axis
   */
  getOtherAxis: function (axis) {
    return this.getAxis(axis.dim === 'x' ? 'y' : 'x');
  },

  /**
   * Get rect area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   * @return {BoundingRect}
   */
  getArea: function () {
    var xExtent = this.getAxis('x').getGlobalExtent();
    var yExtent = this.getAxis('y').getGlobalExtent();
    var x = Math.min(xExtent[0], xExtent[1]);
    var y = Math.min(yExtent[0], yExtent[1]);
    var width = Math.max(xExtent[0], xExtent[1]) - x;
    var height = Math.max(yExtent[0], yExtent[1]) - y;
    var rect = new BoundingRect(x, y, width, height);
    return rect;
  }
};
zrUtil.inherits(Cartesian2D, Cartesian);
var _default = Cartesian2D;
module.exports = _default;

/***/ }),

/***/ "cf7e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Cartesian coordinate system
 * @module  echarts/coord/Cartesian
 *
 */
function dimAxisMapper(dim) {
  return this._axes[dim];
}
/**
 * @alias module:echarts/coord/Cartesian
 * @constructor
 */


var Cartesian = function (name) {
  this._axes = {};
  this._dimList = [];
  /**
   * @type {string}
   */

  this.name = name || '';
};

Cartesian.prototype = {
  constructor: Cartesian,
  type: 'cartesian',

  /**
   * Get axis
   * @param  {number|string} dim
   * @return {module:echarts/coord/Cartesian~Axis}
   */
  getAxis: function (dim) {
    return this._axes[dim];
  },

  /**
   * Get axes list
   * @return {Array.<module:echarts/coord/Cartesian~Axis>}
   */
  getAxes: function () {
    return zrUtil.map(this._dimList, dimAxisMapper, this);
  },

  /**
   * Get axes list by given scale type
   */
  getAxesByScale: function (scaleType) {
    scaleType = scaleType.toLowerCase();
    return zrUtil.filter(this.getAxes(), function (axis) {
      return axis.scale.type === scaleType;
    });
  },

  /**
   * Add axis
   * @param {module:echarts/coord/Cartesian.Axis}
   */
  addAxis: function (axis) {
    var dim = axis.dim;
    this._axes[dim] = axis;

    this._dimList.push(dim);
  },

  /**
   * Convert data to coord in nd space
   * @param {Array.<number>|Object.<string, number>} val
   * @return {Array.<number>|Object.<string, number>}
   */
  dataToCoord: function (val) {
    return this._dataCoordConvert(val, 'dataToCoord');
  },

  /**
   * Convert coord in nd space to data
   * @param  {Array.<number>|Object.<string, number>} val
   * @return {Array.<number>|Object.<string, number>}
   */
  coordToData: function (val) {
    return this._dataCoordConvert(val, 'coordToData');
  },
  _dataCoordConvert: function (input, method) {
    var dimList = this._dimList;
    var output = input instanceof Array ? [] : {};

    for (var i = 0; i < dimList.length; i++) {
      var dim = dimList[i];
      var axis = this._axes[dim];
      output[dim] = axis[method](input[dim]);
    }

    return output;
  }
};
var _default = Cartesian;
module.exports = _default;

/***/ }),

/***/ "d090":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var layout = __webpack_require__("f934");

var numberUtil = __webpack_require__("3842");

var CoordinateSystem = __webpack_require__("2039");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// (24*60*60*1000)
var PROXIMATE_ONE_DAY = 86400000;
/**
 * Calendar
 *
 * @constructor
 *
 * @param {Object} calendarModel calendarModel
 * @param {Object} ecModel       ecModel
 * @param {Object} api           api
 */

function Calendar(calendarModel, ecModel, api) {
  this._model = calendarModel;
}

Calendar.prototype = {
  constructor: Calendar,
  type: 'calendar',
  dimensions: ['time', 'value'],
  // Required in createListFromData
  getDimensionsInfo: function () {
    return [{
      name: 'time',
      type: 'time'
    }, 'value'];
  },
  getRangeInfo: function () {
    return this._rangeInfo;
  },
  getModel: function () {
    return this._model;
  },
  getRect: function () {
    return this._rect;
  },
  getCellWidth: function () {
    return this._sw;
  },
  getCellHeight: function () {
    return this._sh;
  },
  getOrient: function () {
    return this._orient;
  },

  /**
   * getFirstDayOfWeek
   *
   * @example
   *     0 : start at Sunday
   *     1 : start at Monday
   *
   * @return {number}
   */
  getFirstDayOfWeek: function () {
    return this._firstDayOfWeek;
  },

  /**
   * get date info
   *
   * @param  {string|number} date date
   * @return {Object}
   * {
   *      y: string, local full year, eg., '1940',
   *      m: string, local month, from '01' ot '12',
   *      d: string, local date, from '01' to '31' (if exists),
   *      day: It is not date.getDay(). It is the location of the cell in a week, from 0 to 6,
   *      time: timestamp,
   *      formatedDate: string, yyyy-MM-dd,
   *      date: original date object.
   * }
   */
  getDateInfo: function (date) {
    date = numberUtil.parseDate(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    var day = date.getDay();
    day = Math.abs((day + 7 - this.getFirstDayOfWeek()) % 7);
    return {
      y: y,
      m: m,
      d: d,
      day: day,
      time: date.getTime(),
      formatedDate: y + '-' + m + '-' + d,
      date: date
    };
  },
  getNextNDay: function (date, n) {
    n = n || 0;

    if (n === 0) {
      return this.getDateInfo(date);
    }

    date = new Date(this.getDateInfo(date).time);
    date.setDate(date.getDate() + n);
    return this.getDateInfo(date);
  },
  update: function (ecModel, api) {
    this._firstDayOfWeek = +this._model.getModel('dayLabel').get('firstDay');
    this._orient = this._model.get('orient');
    this._lineWidth = this._model.getModel('itemStyle').getItemStyle().lineWidth || 0;
    this._rangeInfo = this._getRangeInfo(this._initRangeOption());
    var weeks = this._rangeInfo.weeks || 1;
    var whNames = ['width', 'height'];

    var cellSize = this._model.get('cellSize').slice();

    var layoutParams = this._model.getBoxLayoutParams();

    var cellNumbers = this._orient === 'horizontal' ? [weeks, 7] : [7, weeks];
    zrUtil.each([0, 1], function (idx) {
      if (cellSizeSpecified(cellSize, idx)) {
        layoutParams[whNames[idx]] = cellSize[idx] * cellNumbers[idx];
      }
    });
    var whGlobal = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var calendarRect = this._rect = layout.getLayoutRect(layoutParams, whGlobal);
    zrUtil.each([0, 1], function (idx) {
      if (!cellSizeSpecified(cellSize, idx)) {
        cellSize[idx] = calendarRect[whNames[idx]] / cellNumbers[idx];
      }
    });

    function cellSizeSpecified(cellSize, idx) {
      return cellSize[idx] != null && cellSize[idx] !== 'auto';
    }

    this._sw = cellSize[0];
    this._sh = cellSize[1];
  },

  /**
   * Convert a time data(time, value) item to (x, y) point.
   *
   * @override
   * @param  {Array|number} data data
   * @param  {boolean} [clamp=true] out of range
   * @return {Array} point
   */
  dataToPoint: function (data, clamp) {
    zrUtil.isArray(data) && (data = data[0]);
    clamp == null && (clamp = true);
    var dayInfo = this.getDateInfo(data);
    var range = this._rangeInfo;
    var date = dayInfo.formatedDate; // if not in range return [NaN, NaN]

    if (clamp && !(dayInfo.time >= range.start.time && dayInfo.time < range.end.time + PROXIMATE_ONE_DAY)) {
      return [NaN, NaN];
    }

    var week = dayInfo.day;

    var nthWeek = this._getRangeInfo([range.start.time, date]).nthWeek;

    if (this._orient === 'vertical') {
      return [this._rect.x + week * this._sw + this._sw / 2, this._rect.y + nthWeek * this._sh + this._sh / 2];
    }

    return [this._rect.x + nthWeek * this._sw + this._sw / 2, this._rect.y + week * this._sh + this._sh / 2];
  },

  /**
   * Convert a (x, y) point to time data
   *
   * @override
   * @param  {string} point point
   * @return {string}       data
   */
  pointToData: function (point) {
    var date = this.pointToDate(point);
    return date && date.time;
  },

  /**
   * Convert a time date item to (x, y) four point.
   *
   * @param  {Array} data  date[0] is date
   * @param  {boolean} [clamp=true]  out of range
   * @return {Object}       point
   */
  dataToRect: function (data, clamp) {
    var point = this.dataToPoint(data, clamp);
    return {
      contentShape: {
        x: point[0] - (this._sw - this._lineWidth) / 2,
        y: point[1] - (this._sh - this._lineWidth) / 2,
        width: this._sw - this._lineWidth,
        height: this._sh - this._lineWidth
      },
      center: point,
      tl: [point[0] - this._sw / 2, point[1] - this._sh / 2],
      tr: [point[0] + this._sw / 2, point[1] - this._sh / 2],
      br: [point[0] + this._sw / 2, point[1] + this._sh / 2],
      bl: [point[0] - this._sw / 2, point[1] + this._sh / 2]
    };
  },

  /**
   * Convert a (x, y) point to time date
   *
   * @param  {Array} point point
   * @return {Object}       date
   */
  pointToDate: function (point) {
    var nthX = Math.floor((point[0] - this._rect.x) / this._sw) + 1;
    var nthY = Math.floor((point[1] - this._rect.y) / this._sh) + 1;
    var range = this._rangeInfo.range;

    if (this._orient === 'vertical') {
      return this._getDateByWeeksAndDay(nthY, nthX - 1, range);
    }

    return this._getDateByWeeksAndDay(nthX, nthY - 1, range);
  },

  /**
   * @inheritDoc
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @inheritDoc
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData'),

  /**
   * initRange
   *
   * @private
   * @return {Array} [start, end]
   */
  _initRangeOption: function () {
    var range = this._model.get('range');

    var rg = range;

    if (zrUtil.isArray(rg) && rg.length === 1) {
      rg = rg[0];
    }

    if (/^\d{4}$/.test(rg)) {
      range = [rg + '-01-01', rg + '-12-31'];
    }

    if (/^\d{4}[\/|-]\d{1,2}$/.test(rg)) {
      var start = this.getDateInfo(rg);
      var firstDay = start.date;
      firstDay.setMonth(firstDay.getMonth() + 1);
      var end = this.getNextNDay(firstDay, -1);
      range = [start.formatedDate, end.formatedDate];
    }

    if (/^\d{4}[\/|-]\d{1,2}[\/|-]\d{1,2}$/.test(rg)) {
      range = [rg, rg];
    }

    var tmp = this._getRangeInfo(range);

    if (tmp.start.time > tmp.end.time) {
      range.reverse();
    }

    return range;
  },

  /**
   * range info
   *
   * @private
   * @param  {Array} range range ['2017-01-01', '2017-07-08']
   *  If range[0] > range[1], they will not be reversed.
   * @return {Object}       obj
   */
  _getRangeInfo: function (range) {
    range = [this.getDateInfo(range[0]), this.getDateInfo(range[1])];
    var reversed;

    if (range[0].time > range[1].time) {
      reversed = true;
      range.reverse();
    }

    var allDay = Math.floor(range[1].time / PROXIMATE_ONE_DAY) - Math.floor(range[0].time / PROXIMATE_ONE_DAY) + 1; // Consider case:
    // Firstly set system timezone as "Time Zone: America/Toronto",
    // ```
    // var first = new Date(1478412000000 - 3600 * 1000 * 2.5);
    // var second = new Date(1478412000000);
    // var allDays = Math.floor(second / ONE_DAY) - Math.floor(first / ONE_DAY) + 1;
    // ```
    // will get wrong result because of DST. So we should fix it.

    var date = new Date(range[0].time);
    var startDateNum = date.getDate();
    var endDateNum = range[1].date.getDate();
    date.setDate(startDateNum + allDay - 1); // The bias can not over a month, so just compare date.

    if (date.getDate() !== endDateNum) {
      var sign = date.getTime() - range[1].time > 0 ? 1 : -1;

      while (date.getDate() !== endDateNum && (date.getTime() - range[1].time) * sign > 0) {
        allDay -= sign;
        date.setDate(startDateNum + allDay - 1);
      }
    }

    var weeks = Math.floor((allDay + range[0].day + 6) / 7);
    var nthWeek = reversed ? -weeks + 1 : weeks - 1;
    reversed && range.reverse();
    return {
      range: [range[0].formatedDate, range[1].formatedDate],
      start: range[0],
      end: range[1],
      allDay: allDay,
      weeks: weeks,
      // From 0.
      nthWeek: nthWeek,
      fweek: range[0].day,
      lweek: range[1].day
    };
  },

  /**
   * get date by nthWeeks and week day in range
   *
   * @private
   * @param  {number} nthWeek the week
   * @param  {number} day   the week day
   * @param  {Array} range [d1, d2]
   * @return {Object}
   */
  _getDateByWeeksAndDay: function (nthWeek, day, range) {
    var rangeInfo = this._getRangeInfo(range);

    if (nthWeek > rangeInfo.weeks || nthWeek === 0 && day < rangeInfo.fweek || nthWeek === rangeInfo.weeks && day > rangeInfo.lweek) {
      return false;
    }

    var nthDay = (nthWeek - 1) * 7 - rangeInfo.fweek + day;
    var date = new Date(rangeInfo.start.time);
    date.setDate(rangeInfo.start.d + nthDay);
    return this.getDateInfo(date);
  }
};
Calendar.dimensions = Calendar.prototype.dimensions;
Calendar.getDimensionsInfo = Calendar.prototype.getDimensionsInfo;

Calendar.create = function (ecModel, api) {
  var calendarList = [];
  ecModel.eachComponent('calendar', function (calendarModel) {
    var calendar = new Calendar(calendarModel, ecModel, api);
    calendarList.push(calendar);
    calendarModel.coordinateSystem = calendar;
  });
  ecModel.eachSeries(function (calendarSeries) {
    if (calendarSeries.get('coordinateSystem') === 'calendar') {
      // Inject coordinate system
      calendarSeries.coordinateSystem = calendarList[calendarSeries.get('calendarIndex') || 0];
    }
  });
  return calendarList;
};

function doConvert(methodName, ecModel, finder, value) {
  var calendarModel = finder.calendarModel;
  var seriesModel = finder.seriesModel;
  var coordSys = calendarModel ? calendarModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem : null;
  return coordSys === this ? coordSys[methodName](value) : null;
}

CoordinateSystem.register('calendar', Calendar);
var _default = Calendar;
module.exports = _default;

/***/ }),

/***/ "e073":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

var textContain = __webpack_require__("e86a");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var _axisHelper = __webpack_require__("697e");

var makeLabelFormatter = _axisHelper.makeLabelFormatter;
var getOptionCategoryInterval = _axisHelper.getOptionCategoryInterval;
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
var inner = makeInner();
/**
 * @param {module:echats/coord/Axis} axis
 * @return {Object} {
 *     labels: [{
 *         formattedLabel: string,
 *         rawLabel: string,
 *         tickValue: number
 *     }, ...],
 *     labelCategoryInterval: number
 * }
 */

function createAxisLabels(axis) {
  // Only ordinal scale support tick interval
  return axis.type === 'category' ? makeCategoryLabels(axis) : makeRealNumberLabels(axis);
}
/**
 * @param {module:echats/coord/Axis} axis
 * @param {module:echarts/model/Model} tickModel For example, can be axisTick, splitLine, splitArea.
 * @return {Object} {
 *     ticks: Array.<number>
 *     tickCategoryInterval: number
 * }
 */


function createAxisTicks(axis, tickModel) {
  // Only ordinal scale support tick interval
  return axis.type === 'category' ? makeCategoryTicks(axis, tickModel) : {
    ticks: axis.scale.getTicks()
  };
}

function makeCategoryLabels(axis) {
  var labelModel = axis.getLabelModel();
  var result = makeCategoryLabelsActually(axis, labelModel);
  return !labelModel.get('show') || axis.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: result.labelCategoryInterval
  } : result;
}

function makeCategoryLabelsActually(axis, labelModel) {
  var labelsCache = getListCache(axis, 'labels');
  var optionLabelInterval = getOptionCategoryInterval(labelModel);
  var result = listCacheGet(labelsCache, optionLabelInterval);

  if (result) {
    return result;
  }

  var labels;
  var numericLabelInterval;

  if (zrUtil.isFunction(optionLabelInterval)) {
    labels = makeLabelsByCustomizedCategoryInterval(axis, optionLabelInterval);
  } else {
    numericLabelInterval = optionLabelInterval === 'auto' ? makeAutoCategoryInterval(axis) : optionLabelInterval;
    labels = makeLabelsByNumericCategoryInterval(axis, numericLabelInterval);
  } // Cache to avoid calling interval function repeatly.


  return listCacheSet(labelsCache, optionLabelInterval, {
    labels: labels,
    labelCategoryInterval: numericLabelInterval
  });
}

function makeCategoryTicks(axis, tickModel) {
  var ticksCache = getListCache(axis, 'ticks');
  var optionTickInterval = getOptionCategoryInterval(tickModel);
  var result = listCacheGet(ticksCache, optionTickInterval);

  if (result) {
    return result;
  }

  var ticks;
  var tickCategoryInterval; // Optimize for the case that large category data and no label displayed,
  // we should not return all ticks.

  if (!tickModel.get('show') || axis.scale.isBlank()) {
    ticks = [];
  }

  if (zrUtil.isFunction(optionTickInterval)) {
    ticks = makeLabelsByCustomizedCategoryInterval(axis, optionTickInterval, true);
  } // Always use label interval by default despite label show. Consider this
  // scenario, Use multiple grid with the xAxis sync, and only one xAxis shows
  // labels. `splitLine` and `axisTick` should be consistent in this case.
  else if (optionTickInterval === 'auto') {
      var labelsResult = makeCategoryLabelsActually(axis, axis.getLabelModel());
      tickCategoryInterval = labelsResult.labelCategoryInterval;
      ticks = zrUtil.map(labelsResult.labels, function (labelItem) {
        return labelItem.tickValue;
      });
    } else {
      tickCategoryInterval = optionTickInterval;
      ticks = makeLabelsByNumericCategoryInterval(axis, tickCategoryInterval, true);
    } // Cache to avoid calling interval function repeatly.


  return listCacheSet(ticksCache, optionTickInterval, {
    ticks: ticks,
    tickCategoryInterval: tickCategoryInterval
  });
}

function makeRealNumberLabels(axis) {
  var ticks = axis.scale.getTicks();
  var labelFormatter = makeLabelFormatter(axis);
  return {
    labels: zrUtil.map(ticks, function (tickValue, idx) {
      return {
        formattedLabel: labelFormatter(tickValue, idx),
        rawLabel: axis.scale.getLabel(tickValue),
        tickValue: tickValue
      };
    })
  };
} // Large category data calculation is performence sensitive, and ticks and label
// probably be fetched by multiple times. So we cache the result.
// axis is created each time during a ec process, so we do not need to clear cache.


function getListCache(axis, prop) {
  // Because key can be funciton, and cache size always be small, we use array cache.
  return inner(axis)[prop] || (inner(axis)[prop] = []);
}

function listCacheGet(cache, key) {
  for (var i = 0; i < cache.length; i++) {
    if (cache[i].key === key) {
      return cache[i].value;
    }
  }
}

function listCacheSet(cache, key, value) {
  cache.push({
    key: key,
    value: value
  });
  return value;
}

function makeAutoCategoryInterval(axis) {
  var result = inner(axis).autoInterval;
  return result != null ? result : inner(axis).autoInterval = axis.calculateCategoryInterval();
}
/**
 * Calculate interval for category axis ticks and labels.
 * To get precise result, at least one of `getRotate` and `isHorizontal`
 * should be implemented in axis.
 */


function calculateCategoryInterval(axis) {
  var params = fetchAutoCategoryIntervalCalculationParams(axis);
  var labelFormatter = makeLabelFormatter(axis);
  var rotation = (params.axisRotate - params.labelRotate) / 180 * Math.PI;
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent(); // Providing this method is for optimization:
  // avoid generating a long array by `getTicks`
  // in large category data case.

  var tickCount = ordinalScale.count();

  if (ordinalExtent[1] - ordinalExtent[0] < 1) {
    return 0;
  }

  var step = 1; // Simple optimization. Empirical value: tick count should less than 40.

  if (tickCount > 40) {
    step = Math.max(1, Math.floor(tickCount / 40));
  }

  var tickValue = ordinalExtent[0];
  var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
  var unitW = Math.abs(unitSpan * Math.cos(rotation));
  var unitH = Math.abs(unitSpan * Math.sin(rotation));
  var maxW = 0;
  var maxH = 0; // Caution: Performance sensitive for large category data.
  // Consider dataZoom, we should make appropriate step to avoid O(n) loop.

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    var width = 0;
    var height = 0; // Not precise, do not consider align and vertical align
    // and each distance from axis line yet.

    var rect = textContain.getBoundingRect(labelFormatter(tickValue), params.font, 'center', 'top'); // Magic number

    width = rect.width * 1.3;
    height = rect.height * 1.3; // Min size, void long loop.

    maxW = Math.max(maxW, width, 7);
    maxH = Math.max(maxH, height, 7);
  }

  var dw = maxW / unitW;
  var dh = maxH / unitH; // 0/0 is NaN, 1/0 is Infinity.

  isNaN(dw) && (dw = Infinity);
  isNaN(dh) && (dh = Infinity);
  var interval = Math.max(0, Math.floor(Math.min(dw, dh)));
  var cache = inner(axis.model);
  var axisExtent = axis.getExtent();
  var lastAutoInterval = cache.lastAutoInterval;
  var lastTickCount = cache.lastTickCount; // Use cache to keep interval stable while moving zoom window,
  // otherwise the calculated interval might jitter when the zoom
  // window size is close to the interval-changing size.
  // For example, if all of the axis labels are `a, b, c, d, e, f, g`.
  // The jitter will cause that sometimes the displayed labels are
  // `a, d, g` (interval: 2) sometimes `a, c, e`(interval: 1).

  if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 // Always choose the bigger one, otherwise the critical
  // point is not the same when zooming in or zooming out.
  && lastAutoInterval > interval // If the axis change is caused by chart resize, the cache should not
  // be used. Otherwise some hiden labels might not be shown again.
  && cache.axisExtend0 === axisExtent[0] && cache.axisExtend1 === axisExtent[1]) {
    interval = lastAutoInterval;
  } // Only update cache if cache not used, otherwise the
  // changing of interval is too insensitive.
  else {
      cache.lastTickCount = tickCount;
      cache.lastAutoInterval = interval;
      cache.axisExtend0 = axisExtent[0];
      cache.axisExtend1 = axisExtent[1];
    }

  return interval;
}

function fetchAutoCategoryIntervalCalculationParams(axis) {
  var labelModel = axis.getLabelModel();
  return {
    axisRotate: axis.getRotate ? axis.getRotate() : axis.isHorizontal && !axis.isHorizontal() ? 90 : 0,
    labelRotate: labelModel.get('rotate') || 0,
    font: labelModel.getFont()
  };
}

function makeLabelsByNumericCategoryInterval(axis, categoryInterval, onlyTick) {
  var labelFormatter = makeLabelFormatter(axis);
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var labelModel = axis.getLabelModel();
  var result = []; // TODO: axisType: ordinalTime, pick the tick from each month/day/year/...

  var step = Math.max((categoryInterval || 0) + 1, 1);
  var startTick = ordinalExtent[0];
  var tickCount = ordinalScale.count(); // Calculate start tick based on zero if possible to keep label consistent
  // while zooming and moving while interval > 0. Otherwise the selection
  // of displayable ticks and symbols probably keep changing.
  // 3 is empirical value.

  if (startTick !== 0 && step > 1 && tickCount / step > 2) {
    startTick = Math.round(Math.ceil(startTick / step) * step);
  } // (1) Only add min max label here but leave overlap checking
  // to render stage, which also ensure the returned list
  // suitable for splitLine and splitArea rendering.
  // (2) Scales except category always contain min max label so
  // do not need to perform this process.


  var showAllLabel = shouldShowAllLabels(axis);
  var includeMinLabel = labelModel.get('showMinLabel') || showAllLabel;
  var includeMaxLabel = labelModel.get('showMaxLabel') || showAllLabel;

  if (includeMinLabel && startTick !== ordinalExtent[0]) {
    addItem(ordinalExtent[0]);
  } // Optimize: avoid generating large array by `ordinalScale.getTicks()`.


  var tickValue = startTick;

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    addItem(tickValue);
  }

  if (includeMaxLabel && tickValue - step !== ordinalExtent[1]) {
    addItem(ordinalExtent[1]);
  }

  function addItem(tVal) {
    result.push(onlyTick ? tVal : {
      formattedLabel: labelFormatter(tVal),
      rawLabel: ordinalScale.getLabel(tVal),
      tickValue: tVal
    });
  }

  return result;
} // When interval is function, the result `false` means ignore the tick.
// It is time consuming for large category data.


function makeLabelsByCustomizedCategoryInterval(axis, categoryInterval, onlyTick) {
  var ordinalScale = axis.scale;
  var labelFormatter = makeLabelFormatter(axis);
  var result = [];
  zrUtil.each(ordinalScale.getTicks(), function (tickValue) {
    var rawLabel = ordinalScale.getLabel(tickValue);

    if (categoryInterval(tickValue, rawLabel)) {
      result.push(onlyTick ? tickValue : {
        formattedLabel: labelFormatter(tickValue),
        rawLabel: rawLabel,
        tickValue: tickValue
      });
    }
  });
  return result;
}

exports.createAxisLabels = createAxisLabels;
exports.createAxisTicks = createAxisTicks;
exports.calculateCategoryInterval = calculateCategoryInterval;

/***/ }),

/***/ "ec02":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var Axis2D = function (dim, scale, coordExtent, axisType, position) {
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
   * Axis position
   *  - 'top'
   *  - 'bottom'
   *  - 'left'
   *  - 'right'
   */

  this.position = position || 'bottom';
};

Axis2D.prototype = {
  constructor: Axis2D,

  /**
   * Index of axis, can be used as key
   */
  index: 0,

  /**
   * Implemented in <module:echarts/coord/cartesian/Grid>.
   * @return {Array.<module:echarts/coord/cartesian/Axis2D>}
   *         If not on zero of other axis, return null/undefined.
   *         If no axes, return an empty array.
   */
  getAxesOnZeroOf: null,

  /**
   * Axis model
   * @param {module:echarts/coord/cartesian/AxisModel}
   */
  model: null,
  isHorizontal: function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  },

  /**
   * Each item cooresponds to this.getExtent(), which
   * means globalExtent[0] may greater than globalExtent[1],
   * unless `asc` is input.
   *
   * @param {boolean} [asc]
   * @return {Array.<number>}
   */
  getGlobalExtent: function (asc) {
    var ret = this.getExtent();
    ret[0] = this.toGlobalCoord(ret[0]);
    ret[1] = this.toGlobalCoord(ret[1]);
    asc && ret[0] > ret[1] && ret.reverse();
    return ret;
  },
  getOtherAxis: function () {
    this.grid.getOtherAxis();
  },

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.coordToData(this.toLocalCoord(point[this.dim === 'x' ? 0 : 1]), clamp);
  },

  /**
   * Transform global coord to local coord,
   * i.e. var localCoord = axis.toLocalCoord(80);
   * designate by module:echarts/coord/cartesian/Grid.
   * @type {Function}
   */
  toLocalCoord: null,

  /**
   * Transform global coord to local coord,
   * i.e. var globalCoord = axis.toLocalCoord(40);
   * designate by module:echarts/coord/cartesian/Grid.
   * @type {Function}
   */
  toGlobalCoord: null
};
zrUtil.inherits(Axis2D, Axis);
var _default = Axis2D;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~588225d9.f2a368e0.js.map