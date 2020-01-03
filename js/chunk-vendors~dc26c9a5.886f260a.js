(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~dc26c9a5"],{

/***/ "4e08":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
// (1) The code `if (__DEV__) ...` can be removed by build tool.
// (2) If intend to use `__DEV__`, this module should be imported. Use a global
// variable `__DEV__` may cause that miss the declaration (see #6535), or the
// declaration is behind of the using position (for example in `Model.extent`,
// And tools like rollup can not analysis the dependency if not import).
var dev; // In browser

if (typeof window !== 'undefined') {
  dev = window.__DEV__;
} // In node
else if (typeof global !== 'undefined') {
    dev = global.__DEV__;
  }

if (typeof dev === 'undefined') {
  dev = true;
}

var __DEV__ = dev;
exports.__DEV__ = __DEV__;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "6cc5":
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

var vector = __webpack_require__("401b");

var matrix = __webpack_require__("1687");

var BoundingRect = __webpack_require__("9850");

var Transformable = __webpack_require__("0cde");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Simple view coordinate system
 * Mapping given x, y to transformd view x, y
 */
var v2ApplyTransform = vector.applyTransform; // Dummy transform node

function TransformDummy() {
  Transformable.call(this);
}

zrUtil.mixin(TransformDummy, Transformable);

function View(name) {
  /**
   * @type {string}
   */
  this.name = name;
  /**
   * @type {Object}
   */

  this.zoomLimit;
  Transformable.call(this);
  this._roamTransformable = new TransformDummy();
  this._rawTransformable = new TransformDummy();
  this._center;
  this._zoom;
}

View.prototype = {
  constructor: View,
  type: 'view',

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['x', 'y'],

  /**
   * Set bounding rect
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  // PENDING to getRect
  setBoundingRect: function (x, y, width, height) {
    this._rect = new BoundingRect(x, y, width, height);
    return this._rect;
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  // PENDING to getRect
  getBoundingRect: function () {
    return this._rect;
  },

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  setViewRect: function (x, y, width, height) {
    this.transformTo(x, y, width, height);
    this._viewRect = new BoundingRect(x, y, width, height);
  },

  /**
   * Transformed to particular position and size
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var rawTransform = this._rawTransformable;
    rawTransform.transform = rect.calculateTransform(new BoundingRect(x, y, width, height));
    rawTransform.decomposeTransform();

    this._updateTransform();
  },

  /**
   * Set center of view
   * @param {Array.<number>} [centerCoord]
   */
  setCenter: function (centerCoord) {
    if (!centerCoord) {
      return;
    }

    this._center = centerCoord;

    this._updateCenterAndZoom();
  },

  /**
   * @param {number} zoom
   */
  setZoom: function (zoom) {
    zoom = zoom || 1;
    var zoomLimit = this.zoomLimit;

    if (zoomLimit) {
      if (zoomLimit.max != null) {
        zoom = Math.min(zoomLimit.max, zoom);
      }

      if (zoomLimit.min != null) {
        zoom = Math.max(zoomLimit.min, zoom);
      }
    }

    this._zoom = zoom;

    this._updateCenterAndZoom();
  },

  /**
   * Get default center without roam
   */
  getDefaultCenter: function () {
    // Rect before any transform
    var rawRect = this.getBoundingRect();
    var cx = rawRect.x + rawRect.width / 2;
    var cy = rawRect.y + rawRect.height / 2;
    return [cx, cy];
  },
  getCenter: function () {
    return this._center || this.getDefaultCenter();
  },
  getZoom: function () {
    return this._zoom || 1;
  },

  /**
   * @return {Array.<number}
   */
  getRoamTransform: function () {
    return this._roamTransformable.getLocalTransform();
  },

  /**
   * Remove roam
   */
  _updateCenterAndZoom: function () {
    // Must update after view transform updated
    var rawTransformMatrix = this._rawTransformable.getLocalTransform();

    var roamTransform = this._roamTransformable;
    var defaultCenter = this.getDefaultCenter();
    var center = this.getCenter();
    var zoom = this.getZoom();
    center = vector.applyTransform([], center, rawTransformMatrix);
    defaultCenter = vector.applyTransform([], defaultCenter, rawTransformMatrix);
    roamTransform.origin = center;
    roamTransform.position = [defaultCenter[0] - center[0], defaultCenter[1] - center[1]];
    roamTransform.scale = [zoom, zoom];

    this._updateTransform();
  },

  /**
   * Update transform from roam and mapLocation
   * @private
   */
  _updateTransform: function () {
    var roamTransformable = this._roamTransformable;
    var rawTransformable = this._rawTransformable;
    rawTransformable.parent = roamTransformable;
    roamTransformable.updateTransform();
    rawTransformable.updateTransform();
    matrix.copy(this.transform || (this.transform = []), rawTransformable.transform || matrix.create());
    this._rawTransform = rawTransformable.getLocalTransform();
    this.invTransform = this.invTransform || [];
    matrix.invert(this.invTransform, this.transform);
    this.decomposeTransform();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getViewRect: function () {
    return this._viewRect;
  },

  /**
   * Get view rect after roam transform
   * @return {module:zrender/core/BoundingRect}
   */
  getViewRectAfterRoam: function () {
    var rect = this.getBoundingRect().clone();
    rect.applyTransform(this.transform);
    return rect;
  },

  /**
   * Convert a single (lon, lat) data item to (x, y) point.
   * @param {Array.<number>} data
   * @param {boolean} noRoam
   * @param {Array.<number>} [out]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, noRoam, out) {
    var transform = noRoam ? this._rawTransform : this.transform;
    out = out || [];
    return transform ? v2ApplyTransform(out, data, transform) : vector.copy(out, data);
  },

  /**
   * Convert a (x, y) point to (lon, lat) data
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToData: function (point) {
    var invTransform = this.invTransform;
    return invTransform ? v2ApplyTransform([], point, invTransform) : [point[0], point[1]];
  },

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData'),

  /**
   * @implements
   * see {module:echarts/CoodinateSystem}
   */
  containPoint: function (point) {
    return this.getViewRectAfterRoam().contain(point[0], point[1]);
  }
  /**
   * @return {number}
   */
  // getScalarScale: function () {
  //     // Use determinant square root of transform to mutiply scalar
  //     var m = this.transform;
  //     var det = Math.sqrt(Math.abs(m[0] * m[3] - m[2] * m[1]));
  //     return det;
  // }

};
zrUtil.mixin(View, Transformable);

function doConvert(methodName, ecModel, finder, value) {
  var seriesModel = finder.seriesModel;
  var coordSys = seriesModel ? seriesModel.coordinateSystem : null; // e.g., graph.

  return coordSys === this ? coordSys[methodName](value) : null;
}

var _default = View;
module.exports = _default;

/***/ }),

/***/ "84ce":
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
var map = _util.map;

var _number = __webpack_require__("3842");

var linearMap = _number.linearMap;
var getPixelPrecision = _number.getPixelPrecision;
var round = _number.round;

var _axisTickLabelBuilder = __webpack_require__("e073");

var createAxisTicks = _axisTickLabelBuilder.createAxisTicks;
var createAxisLabels = _axisTickLabelBuilder.createAxisLabels;
var calculateCategoryInterval = _axisTickLabelBuilder.calculateCategoryInterval;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var NORMALIZED_EXTENT = [0, 1];
/**
 * Base class of Axis.
 * @constructor
 */

var Axis = function (dim, scale, extent) {
  /**
   * Axis dimension. Such as 'x', 'y', 'z', 'angle', 'radius'.
   * @type {string}
   */
  this.dim = dim;
  /**
   * Axis scale
   * @type {module:echarts/coord/scale/*}
   */

  this.scale = scale;
  /**
   * @type {Array.<number>}
   * @private
   */

  this._extent = extent || [0, 0];
  /**
   * @type {boolean}
   */

  this.inverse = false;
  /**
   * Usually true when axis has a ordinal scale
   * @type {boolean}
   */

  this.onBand = false;
};

Axis.prototype = {
  constructor: Axis,

  /**
   * If axis extent contain given coord
   * @param {number} coord
   * @return {boolean}
   */
  contain: function (coord) {
    var extent = this._extent;
    var min = Math.min(extent[0], extent[1]);
    var max = Math.max(extent[0], extent[1]);
    return coord >= min && coord <= max;
  },

  /**
   * If axis extent contain given data
   * @param {number} data
   * @return {boolean}
   */
  containData: function (data) {
    return this.scale.contain(data);
  },

  /**
   * Get coord extent.
   * @return {Array.<number>}
   */
  getExtent: function () {
    return this._extent.slice();
  },

  /**
   * Get precision used for formatting
   * @param {Array.<number>} [dataExtent]
   * @return {number}
   */
  getPixelPrecision: function (dataExtent) {
    return getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent);
  },

  /**
   * Set coord extent
   * @param {number} start
   * @param {number} end
   */
  setExtent: function (start, end) {
    var extent = this._extent;
    extent[0] = start;
    extent[1] = end;
  },

  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   * @param {number} data
   * @param  {boolean} clamp
   * @return {number}
   */
  dataToCoord: function (data, clamp) {
    var extent = this._extent;
    var scale = this.scale;
    data = scale.normalize(data);

    if (this.onBand && scale.type === 'ordinal') {
      extent = extent.slice();
      fixExtentWithBands(extent, scale.count());
    }

    return linearMap(data, NORMALIZED_EXTENT, extent, clamp);
  },

  /**
   * Convert coord to data. Data is the rank if it has an ordinal scale
   * @param {number} coord
   * @param  {boolean} clamp
   * @return {number}
   */
  coordToData: function (coord, clamp) {
    var extent = this._extent;
    var scale = this.scale;

    if (this.onBand && scale.type === 'ordinal') {
      extent = extent.slice();
      fixExtentWithBands(extent, scale.count());
    }

    var t = linearMap(coord, extent, NORMALIZED_EXTENT, clamp);
    return this.scale.scale(t);
  },

  /**
   * Convert pixel point to data in axis
   * @param {Array.<number>} point
   * @param  {boolean} clamp
   * @return {number} data
   */
  pointToData: function (point, clamp) {// Should be implemented in derived class if necessary.
  },

  /**
   * Different from `zrUtil.map(axis.getTicks(), axis.dataToCoord, axis)`,
   * `axis.getTicksCoords` considers `onBand`, which is used by
   * `boundaryGap:true` of category axis and splitLine and splitArea.
   * @param {Object} [opt]
   * @param {Model} [opt.tickModel=axis.model.getModel('axisTick')]
   * @param {boolean} [opt.clamp] If `true`, the first and the last
   *        tick must be at the axis end points. Otherwise, clip ticks
   *        that outside the axis extent.
   * @return {Array.<Object>} [{
   *     coord: ...,
   *     tickValue: ...
   * }, ...]
   */
  getTicksCoords: function (opt) {
    opt = opt || {};
    var tickModel = opt.tickModel || this.getTickModel();
    var result = createAxisTicks(this, tickModel);
    var ticks = result.ticks;
    var ticksCoords = map(ticks, function (tickValue) {
      return {
        coord: this.dataToCoord(tickValue),
        tickValue: tickValue
      };
    }, this);
    var alignWithLabel = tickModel.get('alignWithLabel');
    fixOnBandTicksCoords(this, ticksCoords, alignWithLabel, opt.clamp);
    return ticksCoords;
  },

  /**
   * @return {Array.<Array.<Object>>} [{ coord: ..., tickValue: ...}]
   */
  getMinorTicksCoords: function () {
    if (this.scale.type === 'ordinal') {
      // Category axis doesn't support minor ticks
      return [];
    }

    var minorTickModel = this.model.getModel('minorTick');
    var splitNumber = minorTickModel.get('splitNumber'); // Protection.

    if (!(splitNumber > 0 && splitNumber < 100)) {
      splitNumber = 5;
    }

    var minorTicks = this.scale.getMinorTicks(splitNumber);
    var minorTicksCoords = map(minorTicks, function (minorTicksGroup) {
      return map(minorTicksGroup, function (minorTick) {
        return {
          coord: this.dataToCoord(minorTick),
          tickValue: minorTick
        };
      }, this);
    }, this);
    return minorTicksCoords;
  },

  /**
   * @return {Array.<Object>} [{
   *     formattedLabel: string,
   *     rawLabel: axis.scale.getLabel(tickValue)
   *     tickValue: number
   * }, ...]
   */
  getViewLabels: function () {
    return createAxisLabels(this).labels;
  },

  /**
   * @return {module:echarts/coord/model/Model}
   */
  getLabelModel: function () {
    return this.model.getModel('axisLabel');
  },

  /**
   * Notice here we only get the default tick model. For splitLine
   * or splitArea, we should pass the splitLineModel or splitAreaModel
   * manually when calling `getTicksCoords`.
   * In GL, this method may be overrided to:
   * `axisModel.getModel('axisTick', grid3DModel.getModel('axisTick'));`
   * @return {module:echarts/coord/model/Model}
   */
  getTickModel: function () {
    return this.model.getModel('axisTick');
  },

  /**
   * Get width of band
   * @return {number}
   */
  getBandWidth: function () {
    var axisExtent = this._extent;
    var dataExtent = this.scale.getExtent();
    var len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0); // Fix #2728, avoid NaN when only one data.

    len === 0 && (len = 1);
    var size = Math.abs(axisExtent[1] - axisExtent[0]);
    return Math.abs(size) / len;
  },

  /**
   * @abstract
   * @return {boolean} Is horizontal
   */
  isHorizontal: null,

  /**
   * @abstract
   * @return {number} Get axis rotate, by degree.
   */
  getRotate: null,

  /**
   * Only be called in category axis.
   * Can be overrided, consider other axes like in 3D.
   * @return {number} Auto interval for cateogry axis tick and label
   */
  calculateCategoryInterval: function () {
    return calculateCategoryInterval(this);
  }
};

function fixExtentWithBands(extent, nTick) {
  var size = extent[1] - extent[0];
  var len = nTick;
  var margin = size / len / 2;
  extent[0] += margin;
  extent[1] -= margin;
} // If axis has labels [1, 2, 3, 4]. Bands on the axis are
// |---1---|---2---|---3---|---4---|.
// So the displayed ticks and splitLine/splitArea should between
// each data item, otherwise cause misleading (e.g., split tow bars
// of a single data item when there are two bar series).
// Also consider if tickCategoryInterval > 0 and onBand, ticks and
// splitLine/spliteArea should layout appropriately corresponding
// to displayed labels. (So we should not use `getBandWidth` in this
// case).


function fixOnBandTicksCoords(axis, ticksCoords, alignWithLabel, clamp) {
  var ticksLen = ticksCoords.length;

  if (!axis.onBand || alignWithLabel || !ticksLen) {
    return;
  }

  var axisExtent = axis.getExtent();
  var last;
  var diffSize;

  if (ticksLen === 1) {
    ticksCoords[0].coord = axisExtent[0];
    last = ticksCoords[1] = {
      coord: axisExtent[0]
    };
  } else {
    var crossLen = ticksCoords[ticksLen - 1].tickValue - ticksCoords[0].tickValue;
    var shift = (ticksCoords[ticksLen - 1].coord - ticksCoords[0].coord) / crossLen;
    each(ticksCoords, function (ticksItem) {
      ticksItem.coord -= shift / 2;
    });
    var dataExtent = axis.scale.getExtent();
    diffSize = 1 + dataExtent[1] - ticksCoords[ticksLen - 1].tickValue;
    last = {
      coord: ticksCoords[ticksLen - 1].coord + shift * diffSize
    };
    ticksCoords.push(last);
  }

  var inverse = axisExtent[0] > axisExtent[1]; // Handling clamp.

  if (littleThan(ticksCoords[0].coord, axisExtent[0])) {
    clamp ? ticksCoords[0].coord = axisExtent[0] : ticksCoords.shift();
  }

  if (clamp && littleThan(axisExtent[0], ticksCoords[0].coord)) {
    ticksCoords.unshift({
      coord: axisExtent[0]
    });
  }

  if (littleThan(axisExtent[1], last.coord)) {
    clamp ? last.coord = axisExtent[1] : ticksCoords.pop();
  }

  if (clamp && littleThan(last.coord, axisExtent[1])) {
    ticksCoords.push({
      coord: axisExtent[1]
    });
  }

  function littleThan(a, b) {
    // Avoid rounding error cause calculated tick coord different with extent.
    // It may cause an extra unecessary tick added.
    a = round(a);
    b = round(b);
    return inverse ? a > b : a < b;
  }
}

var _default = Axis;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~dc26c9a5.886f260a.js.map