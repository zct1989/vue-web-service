(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~4813aef3"],{

/***/ "00d8":
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
  dataItem = dataItem || [0, 0];
  return zrUtil.map([0, 1], function (dimIdx) {
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var p1 = [];
    var p2 = [];
    p1[dimIdx] = val - halfSize;
    p2[dimIdx] = val + halfSize;
    p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
    return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
  }, this);
}

function _default(coordSys) {
  var rect = coordSys.getBoundingRect();
  return {
    coordSys: {
      type: 'geo',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      zoom: coordSys.getZoom()
    },
    api: {
      coord: function (data) {
        // do not provide "out" and noRoam param,
        // Compatible with this usage:
        // echarts.util.map(item.points, api.coord)
        return coordSys.dataToPoint(data);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "0141":
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

var View = __webpack_require__("6cc5");

var geoSourceManager = __webpack_require__("5b87");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * [Geo description]
 * For backward compatibility, the orginal interface:
 * `name, map, geoJson, specialAreas, nameMap` is kept.
 *
 * @param {string|Object} name
 * @param {string} map Map type
 *        Specify the positioned areas by left, top, width, height
 * @param {Object.<string, string>} [nameMap]
 *        Specify name alias
 * @param {boolean} [invertLongitute=true]
 */
function Geo(name, map, nameMap, invertLongitute) {
  View.call(this, name);
  /**
   * Map type
   * @type {string}
   */

  this.map = map;
  var source = geoSourceManager.load(map, nameMap);
  this._nameCoordMap = source.nameCoordMap;
  this._regionsMap = source.regionsMap;
  this._invertLongitute = invertLongitute == null ? true : invertLongitute;
  /**
   * @readOnly
   */

  this.regions = source.regions;
  /**
   * @type {module:zrender/src/core/BoundingRect}
   */

  this._rect = source.boundingRect;
}

Geo.prototype = {
  constructor: Geo,
  type: 'geo',

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['lng', 'lat'],

  /**
   * If contain given lng,lat coord
   * @param {Array.<number>}
   * @readOnly
   */
  containCoord: function (coord) {
    var regions = this.regions;

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].contain(coord)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @override
   */
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var invertLongitute = this._invertLongitute;
    rect = rect.clone();

    if (invertLongitute) {
      // Longitute is inverted
      rect.y = -rect.y - rect.height;
    }

    var rawTransformable = this._rawTransformable;
    rawTransformable.transform = rect.calculateTransform(new BoundingRect(x, y, width, height));
    rawTransformable.decomposeTransform();

    if (invertLongitute) {
      var scale = rawTransformable.scale;
      scale[1] = -scale[1];
    }

    rawTransformable.updateTransform();

    this._updateTransform();
  },

  /**
   * @param {string} name
   * @return {module:echarts/coord/geo/Region}
   */
  getRegion: function (name) {
    return this._regionsMap.get(name);
  },
  getRegionByCoord: function (coord) {
    var regions = this.regions;

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].contain(coord)) {
        return regions[i];
      }
    }
  },

  /**
   * Add geoCoord for indexing by name
   * @param {string} name
   * @param {Array.<number>} geoCoord
   */
  addGeoCoord: function (name, geoCoord) {
    this._nameCoordMap.set(name, geoCoord);
  },

  /**
   * Get geoCoord by name
   * @param {string} name
   * @return {Array.<number>}
   */
  getGeoCoord: function (name) {
    return this._nameCoordMap.get(name);
  },

  /**
   * @override
   */
  getBoundingRect: function () {
    return this._rect;
  },

  /**
   * @param {string|Array.<number>} data
   * @param {boolean} noRoam
   * @param {Array.<number>} [out]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, noRoam, out) {
    if (typeof data === 'string') {
      // Map area name to geoCoord
      data = this.getGeoCoord(data);
    }

    if (data) {
      return View.prototype.dataToPoint.call(this, data, noRoam, out);
    }
  },

  /**
   * @override
   */
  convertToPixel: zrUtil.curry(doConvert, 'dataToPoint'),

  /**
   * @override
   */
  convertFromPixel: zrUtil.curry(doConvert, 'pointToData')
};
zrUtil.mixin(Geo, View);

function doConvert(methodName, ecModel, finder, value) {
  var geoModel = finder.geoModel;
  var seriesModel = finder.seriesModel;
  var coordSys = geoModel ? geoModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem // For map.
  || (seriesModel.getReferringComponents('geo')[0] || {}).coordinateSystem : null;
  return coordSys === this ? coordSys[methodName](value) : null;
}

var _default = Geo;
module.exports = _default;

/***/ }),

/***/ "0f55":
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
 * @constructor module:echarts/coord/parallel/ParallelAxis
 * @extends {module:echarts/coord/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 */
var ParallelAxis = function (dim, scale, coordExtent, axisType, axisIndex) {
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
   * @type {number}
   * @readOnly
   */

  this.axisIndex = axisIndex;
};

ParallelAxis.prototype = {
  constructor: ParallelAxis,

  /**
   * Axis model
   * @param {module:echarts/coord/parallel/AxisModel}
   */
  model: null,

  /**
   * @override
   */
  isHorizontal: function () {
    return this.coordinateSystem.getModel().get('layout') !== 'horizontal';
  }
};
zrUtil.inherits(ParallelAxis, Axis);
var _default = ParallelAxis;
module.exports = _default;

/***/ }),

/***/ "1748":
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

var axisDefault = __webpack_require__("71ad");

var Model = __webpack_require__("4319");

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
var valueAxisDefault = axisDefault.valueAxis;

function defaultsShow(opt, show) {
  return zrUtil.defaults({
    show: show
  }, opt);
}

var RadarModel = echarts.extendComponentModel({
  type: 'radar',
  optionUpdated: function () {
    var boundaryGap = this.get('boundaryGap');
    var splitNumber = this.get('splitNumber');
    var scale = this.get('scale');
    var axisLine = this.get('axisLine');
    var axisTick = this.get('axisTick');
    var axisType = this.get('axisType');
    var axisLabel = this.get('axisLabel');
    var nameTextStyle = this.get('name');
    var showName = this.get('name.show');
    var nameFormatter = this.get('name.formatter');
    var nameGap = this.get('nameGap');
    var triggerEvent = this.get('triggerEvent');
    var indicatorModels = zrUtil.map(this.get('indicator') || [], function (indicatorOpt) {
      // PENDING
      if (indicatorOpt.max != null && indicatorOpt.max > 0 && !indicatorOpt.min) {
        indicatorOpt.min = 0;
      } else if (indicatorOpt.min != null && indicatorOpt.min < 0 && !indicatorOpt.max) {
        indicatorOpt.max = 0;
      }

      var iNameTextStyle = nameTextStyle;

      if (indicatorOpt.color != null) {
        iNameTextStyle = zrUtil.defaults({
          color: indicatorOpt.color
        }, nameTextStyle);
      } // Use same configuration


      indicatorOpt = zrUtil.merge(zrUtil.clone(indicatorOpt), {
        boundaryGap: boundaryGap,
        splitNumber: splitNumber,
        scale: scale,
        axisLine: axisLine,
        axisTick: axisTick,
        axisType: axisType,
        axisLabel: axisLabel,
        // Compatible with 2 and use text
        name: indicatorOpt.text,
        nameLocation: 'end',
        nameGap: nameGap,
        // min: 0,
        nameTextStyle: iNameTextStyle,
        triggerEvent: triggerEvent
      }, false);

      if (!showName) {
        indicatorOpt.name = '';
      }

      if (typeof nameFormatter === 'string') {
        var indName = indicatorOpt.name;
        indicatorOpt.name = nameFormatter.replace('{value}', indName != null ? indName : '');
      } else if (typeof nameFormatter === 'function') {
        indicatorOpt.name = nameFormatter(indicatorOpt.name, indicatorOpt);
      }

      var model = zrUtil.extend(new Model(indicatorOpt, null, this.ecModel), axisModelCommonMixin); // For triggerEvent.

      model.mainType = 'radar';
      model.componentIndex = this.componentIndex;
      return model;
    }, this);

    this.getIndicatorModels = function () {
      return indicatorModels;
    };
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    center: ['50%', '50%'],
    radius: '75%',
    startAngle: 90,
    name: {
      show: true // formatter: null
      // textStyle: {}

    },
    boundaryGap: [0, 0],
    splitNumber: 5,
    nameGap: 15,
    scale: false,
    // Polygon or circle
    shape: 'polygon',
    axisLine: zrUtil.merge({
      lineStyle: {
        color: '#bbb'
      }
    }, valueAxisDefault.axisLine),
    axisLabel: defaultsShow(valueAxisDefault.axisLabel, false),
    axisTick: defaultsShow(valueAxisDefault.axisTick, false),
    axisType: 'interval',
    splitLine: defaultsShow(valueAxisDefault.splitLine, true),
    splitArea: defaultsShow(valueAxisDefault.splitArea, true),
    // {text, min, max}
    indicator: []
  }
});
var _default = RadarModel;
module.exports = _default;

/***/ }),

/***/ "1792":
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
var coordsOffsetMap = {
  '南海诸岛': [32, 80],
  // 全国
  '广东': [0, -10],
  '香港': [10, 5],
  '澳门': [-10, 10],
  //'北京': [-10, 0],
  '天津': [5, 5]
};

function _default(mapType, region) {
  if (mapType === 'china') {
    var coordFix = coordsOffsetMap[region.name];

    if (coordFix) {
      var cp = region.center;
      cp[0] += coordFix[0] / 10.5;
      cp[1] += -coordFix[1] / (10.5 / 0.75);
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "1ccf":
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

var Polar = __webpack_require__("fd27");

var _number = __webpack_require__("3842");

var parsePercent = _number.parsePercent;

var _axisHelper = __webpack_require__("697e");

var createScaleByModel = _axisHelper.createScaleByModel;
var niceScaleExtent = _axisHelper.niceScaleExtent;

var CoordinateSystem = __webpack_require__("2039");

var _dataStackHelper = __webpack_require__("ee1a");

var getStackedDimension = _dataStackHelper.getStackedDimension;

__webpack_require__("78f0");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// TODO Axis scale

/**
 * Resize method bound to the polar
 * @param {module:echarts/coord/polar/PolarModel} polarModel
 * @param {module:echarts/ExtensionAPI} api
 */
function resizePolar(polar, polarModel, api) {
  var center = polarModel.get('center');
  var width = api.getWidth();
  var height = api.getHeight();
  polar.cx = parsePercent(center[0], width);
  polar.cy = parsePercent(center[1], height);
  var radiusAxis = polar.getRadiusAxis();
  var size = Math.min(width, height) / 2;
  var radius = polarModel.get('radius');

  if (radius == null) {
    radius = [0, '100%'];
  } else if (!zrUtil.isArray(radius)) {
    // r0 = 0
    radius = [0, radius];
  }

  radius = [parsePercent(radius[0], size), parsePercent(radius[1], size)];
  radiusAxis.inverse ? radiusAxis.setExtent(radius[1], radius[0]) : radiusAxis.setExtent(radius[0], radius[1]);
}
/**
 * Update polar
 */


function updatePolarScale(ecModel, api) {
  var polar = this;
  var angleAxis = polar.getAngleAxis();
  var radiusAxis = polar.getRadiusAxis(); // Reset scale

  angleAxis.scale.setExtent(Infinity, -Infinity);
  radiusAxis.scale.setExtent(Infinity, -Infinity);
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.coordinateSystem === polar) {
      var data = seriesModel.getData();
      zrUtil.each(data.mapDimension('radius', true), function (dim) {
        radiusAxis.scale.unionExtentFromData(data, getStackedDimension(data, dim));
      });
      zrUtil.each(data.mapDimension('angle', true), function (dim) {
        angleAxis.scale.unionExtentFromData(data, getStackedDimension(data, dim));
      });
    }
  });
  niceScaleExtent(angleAxis.scale, angleAxis.model);
  niceScaleExtent(radiusAxis.scale, radiusAxis.model); // Fix extent of category angle axis

  if (angleAxis.type === 'category' && !angleAxis.onBand) {
    var extent = angleAxis.getExtent();
    var diff = 360 / angleAxis.scale.count();
    angleAxis.inverse ? extent[1] += diff : extent[1] -= diff;
    angleAxis.setExtent(extent[0], extent[1]);
  }
}
/**
 * Set common axis properties
 * @param {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
 * @param {module:echarts/coord/polar/AxisModel}
 * @inner
 */


function setAxis(axis, axisModel) {
  axis.type = axisModel.get('type');
  axis.scale = createScaleByModel(axisModel);
  axis.onBand = axisModel.get('boundaryGap') && axis.type === 'category';
  axis.inverse = axisModel.get('inverse');

  if (axisModel.mainType === 'angleAxis') {
    axis.inverse ^= axisModel.get('clockwise');
    var startAngle = axisModel.get('startAngle');
    axis.setExtent(startAngle, startAngle + (axis.inverse ? -360 : 360));
  } // Inject axis instance


  axisModel.axis = axis;
  axis.model = axisModel;
}

var polarCreator = {
  dimensions: Polar.prototype.dimensions,
  create: function (ecModel, api) {
    var polarList = [];
    ecModel.eachComponent('polar', function (polarModel, idx) {
      var polar = new Polar(idx); // Inject resize and update method

      polar.update = updatePolarScale;
      var radiusAxis = polar.getRadiusAxis();
      var angleAxis = polar.getAngleAxis();
      var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
      var angleAxisModel = polarModel.findAxisModel('angleAxis');
      setAxis(radiusAxis, radiusAxisModel);
      setAxis(angleAxis, angleAxisModel);
      resizePolar(polar, polarModel, api);
      polarList.push(polar);
      polarModel.coordinateSystem = polar;
      polar.model = polarModel;
    }); // Inject coordinateSystem to series

    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.get('coordinateSystem') === 'polar') {
        var polarModel = ecModel.queryComponents({
          mainType: 'polar',
          index: seriesModel.get('polarIndex'),
          id: seriesModel.get('polarId')
        })[0];
        seriesModel.coordinateSystem = polarModel.coordinateSystem;
      }
    });
    return polarList;
  }
};
CoordinateSystem.register('polar', polarCreator);

/***/ }),

/***/ "1f1a":
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

var modelUtil = __webpack_require__("e0d3");

var ComponentModel = __webpack_require__("6cb7");

var Model = __webpack_require__("4319");

var selectableMixin = __webpack_require__("7023");

var geoCreator = __webpack_require__("eeea");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var GeoModel = ComponentModel.extend({
  type: 'geo',

  /**
   * @type {module:echarts/coord/geo/Geo}
   */
  coordinateSystem: null,
  layoutMode: 'box',
  init: function (option) {
    ComponentModel.prototype.init.apply(this, arguments); // Default label emphasis `show`

    modelUtil.defaultEmphasis(option, 'label', ['show']);
  },
  optionUpdated: function () {
    var option = this.option;
    var self = this;
    option.regions = geoCreator.getFilledRegions(option.regions, option.map, option.nameMap);
    this._optionModelMap = zrUtil.reduce(option.regions || [], function (optionModelMap, regionOpt) {
      if (regionOpt.name) {
        optionModelMap.set(regionOpt.name, new Model(regionOpt, self));
      }

      return optionModelMap;
    }, zrUtil.createHashMap());
    this.updateSelectedMap(option.regions);
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    show: true,
    left: 'center',
    top: 'center',
    // width:,
    // height:,
    // right
    // bottom
    // Aspect is width / height. Inited to be geoJson bbox aspect
    // This parameter is used for scale this aspect
    // If svg used, aspectScale is 1 by default.
    // aspectScale: 0.75,
    aspectScale: null,
    ///// Layout with center and size
    // If you wan't to put map in a fixed size box with right aspect ratio
    // This two properties may more conveninet
    // layoutCenter: [50%, 50%]
    // layoutSize: 100
    silent: false,
    // Map type
    map: '',
    // Define left-top, right-bottom coords to control view
    // For example, [ [180, 90], [-180, -90] ]
    boundingCoords: null,
    // Default on center of map
    center: null,
    zoom: 1,
    scaleLimit: null,
    // selectedMode: false
    label: {
      show: false,
      color: '#000'
    },
    itemStyle: {
      // color: 各异,
      borderWidth: 0.5,
      borderColor: '#444',
      color: '#eee'
    },
    emphasis: {
      label: {
        show: true,
        color: 'rgb(100,0,0)'
      },
      itemStyle: {
        color: 'rgba(255,215,0,0.8)'
      }
    },
    regions: []
  },

  /**
   * Get model of region
   * @param  {string} name
   * @return {module:echarts/model/Model}
   */
  getRegionModel: function (name) {
    return this._optionModelMap.get(name) || new Model(null, this, this.ecModel);
  },

  /**
   * Format label
   * @param {string} name Region name
   * @param {string} [status='normal'] 'normal' or 'emphasis'
   * @return {string}
   */
  getFormattedLabel: function (name, status) {
    var regionModel = this.getRegionModel(name);
    var formatter = regionModel.get('label' + (status === 'normal' ? '.' : status + '.') + 'formatter');
    var params = {
      name: name
    };

    if (typeof formatter === 'function') {
      params.status = status;
      return formatter(params);
    } else if (typeof formatter === 'string') {
      return formatter.replace('{a}', name != null ? name : '');
    }
  },
  setZoom: function (zoom) {
    this.option.zoom = zoom;
  },
  setCenter: function (center) {
    this.option.center = center;
  }
});
zrUtil.mixin(GeoModel, selectableMixin);
var _default = GeoModel;
module.exports = _default;

/***/ }),

/***/ "217c":
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

var Component = __webpack_require__("6cb7");

__webpack_require__("df3a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = Component.extend({
  type: 'parallel',
  dependencies: ['parallelAxis'],

  /**
   * @type {module:echarts/coord/parallel/Parallel}
   */
  coordinateSystem: null,

  /**
   * Each item like: 'dim0', 'dim1', 'dim2', ...
   * @type {Array.<string>}
   * @readOnly
   */
  dimensions: null,

  /**
   * Coresponding to dimensions.
   * @type {Array.<number>}
   * @readOnly
   */
  parallelAxisIndex: null,
  layoutMode: 'box',
  defaultOption: {
    zlevel: 0,
    z: 0,
    left: 80,
    top: 60,
    right: 80,
    bottom: 60,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    layout: 'horizontal',
    // 'horizontal' or 'vertical'
    // FIXME
    // naming?
    axisExpandable: false,
    axisExpandCenter: null,
    axisExpandCount: 0,
    axisExpandWidth: 50,
    // FIXME '10%' ?
    axisExpandRate: 17,
    axisExpandDebounce: 50,
    // [out, in, jumpTarget]. In percentage. If use [null, 0.05], null means full.
    // Do not doc to user until necessary.
    axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
    axisExpandTriggerOn: 'click',
    // 'mousemove' or 'click'
    parallelAxisDefault: null
  },

  /**
   * @override
   */
  init: function () {
    Component.prototype.init.apply(this, arguments);
    this.mergeOption({});
  },

  /**
   * @override
   */
  mergeOption: function (newOption) {
    var thisOption = this.option;
    newOption && zrUtil.merge(thisOption, newOption, true);

    this._initDimensions();
  },

  /**
   * Whether series or axis is in this coordinate system.
   * @param {module:echarts/model/Series|module:echarts/coord/parallel/AxisModel} model
   * @param {module:echarts/model/Global} ecModel
   */
  contains: function (model, ecModel) {
    var parallelIndex = model.get('parallelIndex');
    return parallelIndex != null && ecModel.getComponent('parallel', parallelIndex) === this;
  },
  setAxisExpand: function (opt) {
    zrUtil.each(['axisExpandable', 'axisExpandCenter', 'axisExpandCount', 'axisExpandWidth', 'axisExpandWindow'], function (name) {
      if (opt.hasOwnProperty(name)) {
        this.option[name] = opt[name];
      }
    }, this);
  },

  /**
   * @private
   */
  _initDimensions: function () {
    var dimensions = this.dimensions = [];
    var parallelAxisIndex = this.parallelAxisIndex = [];
    var axisModels = zrUtil.filter(this.dependentModels.parallelAxis, function (axisModel) {
      // Can not use this.contains here, because
      // initialization has not been completed yet.
      return (axisModel.get('parallelIndex') || 0) === this.componentIndex;
    }, this);
    zrUtil.each(axisModels, function (axisModel) {
      dimensions.push('dim' + axisModel.get('dim'));
      parallelAxisIndex.push(axisModel.componentIndex);
    });
  }
});

module.exports = _default;

/***/ }),

/***/ "23e0":
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

var IndicatorAxis = __webpack_require__("7887");

var IntervalScale = __webpack_require__("89e3");

var numberUtil = __webpack_require__("3842");

var _axisHelper = __webpack_require__("697e");

var getScaleExtent = _axisHelper.getScaleExtent;
var niceScaleExtent = _axisHelper.niceScaleExtent;

var CoordinateSystem = __webpack_require__("2039");

var LogScale = __webpack_require__("8c2a");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// TODO clockwise
function Radar(radarModel, ecModel, api) {
  this._model = radarModel;
  /**
   * Radar dimensions
   * @type {Array.<string>}
   */

  this.dimensions = [];
  this._indicatorAxes = zrUtil.map(radarModel.getIndicatorModels(), function (indicatorModel, idx) {
    var dim = 'indicator_' + idx;
    var indicatorAxis = new IndicatorAxis(dim, indicatorModel.get('axisType') === 'log' ? new LogScale() : new IntervalScale());
    indicatorAxis.name = indicatorModel.get('name'); // Inject model and axis

    indicatorAxis.model = indicatorModel;
    indicatorModel.axis = indicatorAxis;
    this.dimensions.push(dim);
    return indicatorAxis;
  }, this);
  this.resize(radarModel, api);
  /**
   * @type {number}
   * @readOnly
   */

  this.cx;
  /**
   * @type {number}
   * @readOnly
   */

  this.cy;
  /**
   * @type {number}
   * @readOnly
   */

  this.r;
  /**
   * @type {number}
   * @readOnly
   */

  this.r0;
  /**
   * @type {number}
   * @readOnly
   */

  this.startAngle;
}

Radar.prototype.getIndicatorAxes = function () {
  return this._indicatorAxes;
};

Radar.prototype.dataToPoint = function (value, indicatorIndex) {
  var indicatorAxis = this._indicatorAxes[indicatorIndex];
  return this.coordToPoint(indicatorAxis.dataToCoord(value), indicatorIndex);
};

Radar.prototype.coordToPoint = function (coord, indicatorIndex) {
  var indicatorAxis = this._indicatorAxes[indicatorIndex];
  var angle = indicatorAxis.angle;
  var x = this.cx + coord * Math.cos(angle);
  var y = this.cy - coord * Math.sin(angle);
  return [x, y];
};

Radar.prototype.pointToData = function (pt) {
  var dx = pt[0] - this.cx;
  var dy = pt[1] - this.cy;
  var radius = Math.sqrt(dx * dx + dy * dy);
  dx /= radius;
  dy /= radius;
  var radian = Math.atan2(-dy, dx); // Find the closest angle
  // FIXME index can calculated directly

  var minRadianDiff = Infinity;
  var closestAxis;
  var closestAxisIdx = -1;

  for (var i = 0; i < this._indicatorAxes.length; i++) {
    var indicatorAxis = this._indicatorAxes[i];
    var diff = Math.abs(radian - indicatorAxis.angle);

    if (diff < minRadianDiff) {
      closestAxis = indicatorAxis;
      closestAxisIdx = i;
      minRadianDiff = diff;
    }
  }

  return [closestAxisIdx, +(closestAxis && closestAxis.coordToData(radius))];
};

Radar.prototype.resize = function (radarModel, api) {
  var center = radarModel.get('center');
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  var viewSize = Math.min(viewWidth, viewHeight) / 2;
  this.cx = numberUtil.parsePercent(center[0], viewWidth);
  this.cy = numberUtil.parsePercent(center[1], viewHeight);
  this.startAngle = radarModel.get('startAngle') * Math.PI / 180; // radius may be single value like `20`, `'80%'`, or array like `[10, '80%']`

  var radius = radarModel.get('radius');

  if (typeof radius === 'string' || typeof radius === 'number') {
    radius = [0, radius];
  }

  this.r0 = numberUtil.parsePercent(radius[0], viewSize);
  this.r = numberUtil.parsePercent(radius[1], viewSize);
  zrUtil.each(this._indicatorAxes, function (indicatorAxis, idx) {
    indicatorAxis.setExtent(this.r0, this.r);
    var angle = this.startAngle + idx * Math.PI * 2 / this._indicatorAxes.length; // Normalize to [-PI, PI]

    angle = Math.atan2(Math.sin(angle), Math.cos(angle));
    indicatorAxis.angle = angle;
  }, this);
};

Radar.prototype.update = function (ecModel, api) {
  var indicatorAxes = this._indicatorAxes;
  var radarModel = this._model;
  zrUtil.each(indicatorAxes, function (indicatorAxis) {
    indicatorAxis.scale.setExtent(Infinity, -Infinity);
  });
  ecModel.eachSeriesByType('radar', function (radarSeries, idx) {
    if (radarSeries.get('coordinateSystem') !== 'radar' || ecModel.getComponent('radar', radarSeries.get('radarIndex')) !== radarModel) {
      return;
    }

    var data = radarSeries.getData();
    zrUtil.each(indicatorAxes, function (indicatorAxis) {
      indicatorAxis.scale.unionExtentFromData(data, data.mapDimension(indicatorAxis.dim));
    });
  }, this);
  var splitNumber = radarModel.get('splitNumber');

  function increaseInterval(interval) {
    var exp10 = Math.pow(10, Math.floor(Math.log(interval) / Math.LN10)); // Increase interval

    var f = interval / exp10;

    if (f === 2) {
      f = 5;
    } else {
      // f is 2 or 5
      f *= 2;
    }

    return f * exp10;
  } // Force all the axis fixing the maxSplitNumber.


  zrUtil.each(indicatorAxes, function (indicatorAxis, idx) {
    var rawExtent = getScaleExtent(indicatorAxis.scale, indicatorAxis.model);
    niceScaleExtent(indicatorAxis.scale, indicatorAxis.model);
    var axisModel = indicatorAxis.model;
    var scale = indicatorAxis.scale;
    var fixedMin = axisModel.getMin();
    var fixedMax = axisModel.getMax();
    var interval = scale.getInterval();

    if (fixedMin != null && fixedMax != null) {
      // User set min, max, divide to get new interval
      scale.setExtent(+fixedMin, +fixedMax);
      scale.setInterval((fixedMax - fixedMin) / splitNumber);
    } else if (fixedMin != null) {
      var max; // User set min, expand extent on the other side

      do {
        max = fixedMin + interval * splitNumber;
        scale.setExtent(+fixedMin, max); // Interval must been set after extent
        // FIXME

        scale.setInterval(interval);
        interval = increaseInterval(interval);
      } while (max < rawExtent[1] && isFinite(max) && isFinite(rawExtent[1]));
    } else if (fixedMax != null) {
      var min; // User set min, expand extent on the other side

      do {
        min = fixedMax - interval * splitNumber;
        scale.setExtent(min, +fixedMax);
        scale.setInterval(interval);
        interval = increaseInterval(interval);
      } while (min > rawExtent[0] && isFinite(min) && isFinite(rawExtent[0]));
    } else {
      var nicedSplitNumber = scale.getTicks().length - 1;

      if (nicedSplitNumber > splitNumber) {
        interval = increaseInterval(interval);
      } // PENDING


      var center = Math.round((rawExtent[0] + rawExtent[1]) / 2 / interval) * interval;
      var halfSplitNumber = Math.round(splitNumber / 2);
      scale.setExtent(numberUtil.round(center - halfSplitNumber * interval), numberUtil.round(center + (splitNumber - halfSplitNumber) * interval));
      scale.setInterval(interval);
    }
  });
};
/**
 * Radar dimensions is based on the data
 * @type {Array}
 */


Radar.dimensions = [];

Radar.create = function (ecModel, api) {
  var radarList = [];
  ecModel.eachComponent('radar', function (radarModel) {
    var radar = new Radar(radarModel, ecModel, api);
    radarList.push(radar);
    radarModel.coordinateSystem = radar;
  });
  ecModel.eachSeriesByType('radar', function (radarSeries) {
    if (radarSeries.get('coordinateSystem') === 'radar') {
      // Inject coordinate system
      radarSeries.coordinateSystem = radarList[radarSeries.get('radarIndex') || 0];
    }
  });
  return radarList;
};

CoordinateSystem.register('radar', Radar);
var _default = Radar;
module.exports = _default;

/***/ }),

/***/ "307b":
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
  var axis = this.getAxis();
  var val = dataItem instanceof Array ? dataItem[0] : dataItem;
  var halfSize = (dataSize instanceof Array ? dataSize[0] : dataSize) / 2;
  return axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize));
}

function _default(coordSys) {
  var rect = coordSys.getRect();
  return {
    coordSys: {
      type: 'singleAxis',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: function (val) {
        // do not provide "out" param
        return coordSys.dataToPoint(val);
      },
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "320a":
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

var Region = __webpack_require__("f279");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Fix for 南海诸岛
var geoCoord = [126, 25];
var points = [[[0, 3.5], [7, 11.2], [15, 11.9], [30, 7], [42, 0.7], [52, 0.7], [56, 7.7], [59, 0.7], [64, 0.7], [64, 0], [5, 0], [0, 3.5]], [[13, 16.1], [19, 14.7], [16, 21.7], [11, 23.1], [13, 16.1]], [[12, 32.2], [14, 38.5], [15, 38.5], [13, 32.2], [12, 32.2]], [[16, 47.6], [12, 53.2], [13, 53.2], [18, 47.6], [16, 47.6]], [[6, 64.4], [8, 70], [9, 70], [8, 64.4], [6, 64.4]], [[23, 82.6], [29, 79.8], [30, 79.8], [25, 82.6], [23, 82.6]], [[37, 70.7], [43, 62.3], [44, 62.3], [39, 70.7], [37, 70.7]], [[48, 51.1], [51, 45.5], [53, 45.5], [50, 51.1], [48, 51.1]], [[51, 35], [51, 28.7], [53, 28.7], [53, 35], [51, 35]], [[52, 22.4], [55, 17.5], [56, 17.5], [53, 22.4], [52, 22.4]], [[58, 12.6], [62, 7], [63, 7], [60, 12.6], [58, 12.6]], [[0, 3.5], [0, 93.1], [64, 93.1], [64, 0], [63, 0], [63, 92.4], [1, 92.4], [1, 3.5], [0, 3.5]]];

for (var i = 0; i < points.length; i++) {
  for (var k = 0; k < points[i].length; k++) {
    points[i][k][0] /= 10.5;
    points[i][k][1] /= -10.5 / 0.75;
    points[i][k][0] += geoCoord[0];
    points[i][k][1] += geoCoord[1];
  }
}

function _default(mapType, regions) {
  if (mapType === 'china') {
    regions.push(new Region('南海诸岛', zrUtil.map(points, function (exterior) {
      return {
        type: 'polygon',
        exterior: exterior
      };
    }), geoCoord));
  }
}

module.exports = _default;

/***/ }),

/***/ "4338":
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

var Single = __webpack_require__("4bf6");

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

/**
 * Single coordinate system creator.
 */

/**
 * Create single coordinate system and inject it into seriesModel.
 *
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 * @return {Array.<module:echarts/coord/single/Single>}
 */
function create(ecModel, api) {
  var singles = [];
  ecModel.eachComponent('singleAxis', function (axisModel, idx) {
    var single = new Single(axisModel, ecModel, api);
    single.name = 'single_' + idx;
    single.resize(axisModel, api);
    axisModel.coordinateSystem = single;
    singles.push(single);
  });
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'singleAxis') {
      var singleAxisModel = ecModel.queryComponents({
        mainType: 'singleAxis',
        index: seriesModel.get('singleAxisIndex'),
        id: seriesModel.get('singleAxisId')
      })[0];
      seriesModel.coordinateSystem = singleAxisModel && singleAxisModel.coordinateSystem;
    }
  });
  return singles;
}

CoordinateSystem.register('single', {
  create: create,
  dimensions: Single.prototype.dimensions
});

/***/ }),

/***/ "4bf6":
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

var SingleAxis = __webpack_require__("66fc");

var axisHelper = __webpack_require__("697e");

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;

var _util = __webpack_require__("6d8b");

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

/**
 * Single coordinates system.
 */

/**
 * Create a single coordinates system.
 *
 * @param {module:echarts/coord/single/AxisModel} axisModel
 * @param {module:echarts/model/Global} ecModel
 * @param {module:echarts/ExtensionAPI} api
 */
function Single(axisModel, ecModel, api) {
  /**
   * @type {string}
   * @readOnly
   */
  this.dimension = 'single';
  /**
   * Add it just for draw tooltip.
   *
   * @type {Array.<string>}
   * @readOnly
   */

  this.dimensions = ['single'];
  /**
   * @private
   * @type {module:echarts/coord/single/SingleAxis}.
   */

  this._axis = null;
  /**
   * @private
   * @type {module:zrender/core/BoundingRect}
   */

  this._rect;

  this._init(axisModel, ecModel, api);
  /**
   * @type {module:echarts/coord/single/AxisModel}
   */


  this.model = axisModel;
}

Single.prototype = {
  type: 'singleAxis',
  axisPointerEnabled: true,
  constructor: Single,

  /**
   * Initialize single coordinate system.
   *
   * @param  {module:echarts/coord/single/AxisModel} axisModel
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   * @private
   */
  _init: function (axisModel, ecModel, api) {
    var dim = this.dimension;
    var axis = new SingleAxis(dim, axisHelper.createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisModel.get('position'));
    var isCategory = axis.type === 'category';
    axis.onBand = isCategory && axisModel.get('boundaryGap');
    axis.inverse = axisModel.get('inverse');
    axis.orient = axisModel.get('orient');
    axisModel.axis = axis;
    axis.model = axisModel;
    axis.coordinateSystem = this;
    this._axis = axis;
  },

  /**
   * Update axis scale after data processed
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  update: function (ecModel, api) {
    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.coordinateSystem === this) {
        var data = seriesModel.getData();
        each(data.mapDimension(this.dimension, true), function (dim) {
          this._axis.scale.unionExtentFromData(data, dim);
        }, this);
        axisHelper.niceScaleExtent(this._axis.scale, this._axis.model);
      }
    }, this);
  },

  /**
   * Resize the single coordinate system.
   *
   * @param  {module:echarts/coord/single/AxisModel} axisModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  resize: function (axisModel, api) {
    this._rect = getLayoutRect({
      left: axisModel.get('left'),
      top: axisModel.get('top'),
      right: axisModel.get('right'),
      bottom: axisModel.get('bottom'),
      width: axisModel.get('width'),
      height: axisModel.get('height')
    }, {
      width: api.getWidth(),
      height: api.getHeight()
    });

    this._adjustAxis();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getRect: function () {
    return this._rect;
  },

  /**
   * @private
   */
  _adjustAxis: function () {
    var rect = this._rect;
    var axis = this._axis;
    var isHorizontal = axis.isHorizontal();
    var extent = isHorizontal ? [0, rect.width] : [0, rect.height];
    var idx = axis.reverse ? 1 : 0;
    axis.setExtent(extent[idx], extent[1 - idx]);

    this._updateAxisTransform(axis, isHorizontal ? rect.x : rect.y);
  },

  /**
   * @param  {module:echarts/coord/single/SingleAxis} axis
   * @param  {number} coordBase
   */
  _updateAxisTransform: function (axis, coordBase) {
    var axisExtent = axis.getExtent();
    var extentSum = axisExtent[0] + axisExtent[1];
    var isHorizontal = axis.isHorizontal();
    axis.toGlobalCoord = isHorizontal ? function (coord) {
      return coord + coordBase;
    } : function (coord) {
      return extentSum - coord + coordBase;
    };
    axis.toLocalCoord = isHorizontal ? function (coord) {
      return coord - coordBase;
    } : function (coord) {
      return extentSum - coord + coordBase;
    };
  },

  /**
   * Get axis.
   *
   * @return {module:echarts/coord/single/SingleAxis}
   */
  getAxis: function () {
    return this._axis;
  },

  /**
   * Get axis, add it just for draw tooltip.
   *
   * @return {[type]} [description]
   */
  getBaseAxis: function () {
    return this._axis;
  },

  /**
   * @return {Array.<module:echarts/coord/Axis>}
   */
  getAxes: function () {
    return [this._axis];
  },

  /**
   * @return {Object} {baseAxes: [], otherAxes: []}
   */
  getTooltipAxes: function () {
    return {
      baseAxes: [this.getAxis()]
    };
  },

  /**
   * If contain point.
   *
   * @param  {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var rect = this.getRect();
    var axis = this.getAxis();
    var orient = axis.orient;

    if (orient === 'horizontal') {
      return axis.contain(axis.toLocalCoord(point[0])) && point[1] >= rect.y && point[1] <= rect.y + rect.height;
    } else {
      return axis.contain(axis.toLocalCoord(point[1])) && point[0] >= rect.y && point[0] <= rect.y + rect.height;
    }
  },

  /**
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToData: function (point) {
    var axis = this.getAxis();
    return [axis.coordToData(axis.toLocalCoord(point[axis.orient === 'horizontal' ? 0 : 1]))];
  },

  /**
   * Convert the series data to concrete point.
   *
   * @param  {number|Array.<number>} val
   * @return {Array.<number>}
   */
  dataToPoint: function (val) {
    var axis = this.getAxis();
    var rect = this.getRect();
    var pt = [];
    var idx = axis.orient === 'horizontal' ? 0 : 1;

    if (val instanceof Array) {
      val = val[0];
    }

    pt[idx] = axis.toGlobalCoord(axis.dataToCoord(+val));
    pt[1 - idx] = idx === 0 ? rect.y + rect.height / 2 : rect.x + rect.width / 2;
    return pt;
  }
};
var _default = Single;
module.exports = _default;

/***/ }),

/***/ "4c86":
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

var parseGeoJson = __webpack_require__("bda7");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var fixNanhai = __webpack_require__("320a");

var fixTextCoord = __webpack_require__("1792");

var fixGeoCoord = __webpack_require__("6bd4");

var fixDiaoyuIsland = __webpack_require__("a7f2");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Built-in GEO fixer.
var inner = makeInner();
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} mapRecord {specialAreas, geoJSON}
   * @return {Object} {regions, boundingRect}
   */
  load: function (mapName, mapRecord) {
    var parsed = inner(mapRecord).parsed;

    if (parsed) {
      return parsed;
    }

    var specialAreas = mapRecord.specialAreas || {};
    var geoJSON = mapRecord.geoJSON;
    var regions; // https://jsperf.com/try-catch-performance-overhead

    try {
      regions = geoJSON ? parseGeoJson(geoJSON) : [];
    } catch (e) {
      throw new Error('Invalid geoJson format\n' + e.message);
    }

    fixNanhai(mapName, regions);
    each(regions, function (region) {
      var regionName = region.name;
      fixTextCoord(mapName, region);
      fixGeoCoord(mapName, region);
      fixDiaoyuIsland(mapName, region); // Some area like Alaska in USA map needs to be tansformed
      // to look better

      var specialArea = specialAreas[regionName];

      if (specialArea) {
        region.transformTo(specialArea.left, specialArea.top, specialArea.width, specialArea.height);
      }
    });
    return inner(mapRecord).parsed = {
      regions: regions,
      boundingRect: getBoundingRect(regions)
    };
  }
};

function getBoundingRect(regions) {
  var rect;

  for (var i = 0; i < regions.length; i++) {
    var regionRect = regions[i].getBoundingRect();
    rect = rect || regionRect.clone();
    rect.union(regionRect);
  }

  return rect;
}

module.exports = _default;

/***/ }),

/***/ "5b87":
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

var each = _util.each;
var createHashMap = _util.createHashMap;

var mapDataStorage = __webpack_require__("ec34");

var geoJSONLoader = __webpack_require__("4c86");

var geoSVGLoader = __webpack_require__("c92f");

var BoundingRect = __webpack_require__("9850");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var loaders = {
  geoJSON: geoJSONLoader,
  svg: geoSVGLoader
};
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} nameMap
   * @return {Object} source {regions, regionsMap, nameCoordMap, boundingRect}
   */
  load: function (mapName, nameMap) {
    var regions = [];
    var regionsMap = createHashMap();
    var nameCoordMap = createHashMap();
    var boundingRect;
    var mapRecords = retrieveMap(mapName);
    each(mapRecords, function (record) {
      var singleSource = loaders[record.type].load(mapName, record);
      each(singleSource.regions, function (region) {
        var regionName = region.name; // Try use the alias in geoNameMap

        if (nameMap && nameMap.hasOwnProperty(regionName)) {
          region = region.cloneShallow(regionName = nameMap[regionName]);
        }

        regions.push(region);
        regionsMap.set(regionName, region);
        nameCoordMap.set(regionName, region.center);
      });
      var rect = singleSource.boundingRect;

      if (rect) {
        boundingRect ? boundingRect.union(rect) : boundingRect = rect.clone();
      }
    });
    return {
      regions: regions,
      regionsMap: regionsMap,
      nameCoordMap: nameCoordMap,
      // FIXME Always return new ?
      boundingRect: boundingRect || new BoundingRect(0, 0, 0, 0)
    };
  },

  /**
   * @param {string} mapName
   * @param {string} hostKey For cache.
   * @return {Array.<module:zrender/Element>} Roots.
   */
  makeGraphic: makeInvoker('makeGraphic'),

  /**
   * @param {string} mapName
   * @param {string} hostKey For cache.
   */
  removeGraphic: makeInvoker('removeGraphic')
};

function makeInvoker(methodName) {
  return function (mapName, hostKey) {
    var mapRecords = retrieveMap(mapName);
    var results = [];
    each(mapRecords, function (record) {
      var method = loaders[record.type][methodName];
      method && results.push(method(mapName, record, hostKey));
    });
    return results;
  };
}

function mapNotExistsError(mapName) {}

function retrieveMap(mapName) {
  var mapRecords = mapDataStorage.retrieveMap(mapName) || [];
  return mapRecords;
}

module.exports = _default;

/***/ }),

/***/ "6569":
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
function _default(option) {
  createParallelIfNeeded(option);
  mergeAxisOptionFromParallel(option);
}
/**
 * Create a parallel coordinate if not exists.
 * @inner
 */


function createParallelIfNeeded(option) {
  if (option.parallel) {
    return;
  }

  var hasParallelSeries = false;
  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'parallel') {
      hasParallelSeries = true;
    }
  });

  if (hasParallelSeries) {
    option.parallel = [{}];
  }
}
/**
 * Merge aixs definition from parallel option (if exists) to axis option.
 * @inner
 */


function mergeAxisOptionFromParallel(option) {
  var axes = modelUtil.normalizeToArray(option.parallelAxis);
  zrUtil.each(axes, function (axisOption) {
    if (!zrUtil.isObject(axisOption)) {
      return;
    }

    var parallelIndex = axisOption.parallelIndex || 0;
    var parallelOption = modelUtil.normalizeToArray(option.parallel)[parallelIndex];

    if (parallelOption && parallelOption.parallelAxisDefault) {
      zrUtil.merge(axisOption, parallelOption.parallelAxisDefault, false);
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "66fc":
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
 * @constructor  module:echarts/coord/single/SingleAxis
 * @extends {module:echarts/coord/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 * @param {string} position
 */
var SingleAxis = function (dim, scale, coordExtent, axisType, position) {
  Axis.call(this, dim, scale, coordExtent);
  /**
   * Axis type
   * - 'category'
   * - 'value'
   * - 'time'
   * - 'log'
   * @type {string}
   */

  this.type = axisType || 'value';
  /**
   * Axis position
   *  - 'top'
   *  - 'bottom'
   *  - 'left'
   *  - 'right'
   *  @type {string}
   */

  this.position = position || 'bottom';
  /**
   * Axis orient
   *  - 'horizontal'
   *  - 'vertical'
   * @type {[type]}
   */

  this.orient = null;
};

SingleAxis.prototype = {
  constructor: SingleAxis,

  /**
   * Axis model
   * @type {module:echarts/coord/single/AxisModel}
   */
  model: null,

  /**
   * Judge the orient of the axis.
   * @return {boolean}
   */
  isHorizontal: function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  },

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.coordinateSystem.pointToData(point, clamp)[0];
  },

  /**
   * Convert the local coord(processed by dataToCoord())
   * to global coord(concrete pixel coord).
   * designated by module:echarts/coord/single/Single.
   * @type {Function}
   */
  toGlobalCoord: null,

  /**
   * Convert the global coord to local coord.
   * designated by module:echarts/coord/single/Single.
   * @type {Function}
   */
  toLocalCoord: null
};
zrUtil.inherits(SingleAxis, Axis);
var _default = SingleAxis;
module.exports = _default;

/***/ }),

/***/ "6bd4":
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
var geoCoordMap = {
  'Russia': [100, 60],
  'United States': [-99, 38],
  'United States of America': [-99, 38]
};

function _default(mapType, region) {
  if (mapType === 'world') {
    var geoCoord = geoCoordMap[region.name];

    if (geoCoord) {
      var cp = region.center;
      cp[0] = geoCoord[0];
      cp[1] = geoCoord[1];
    }
  }
}

module.exports = _default;

/***/ }),

/***/ "7887":
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
function IndicatorAxis(dim, scale, radiusExtent) {
  Axis.call(this, dim, scale, radiusExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'value';
  this.angle = 0;
  /**
   * Indicator name
   * @type {string}
   */

  this.name = '';
  /**
   * @type {module:echarts/model/Model}
   */

  this.model;
}

zrUtil.inherits(IndicatorAxis, Axis);
var _default = IndicatorAxis;
module.exports = _default;

/***/ }),

/***/ "78f0":
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

__webpack_require__("d9f1");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  type: 'polar',
  dependencies: ['polarAxis', 'angleAxis'],

  /**
   * @type {module:echarts/coord/polar/Polar}
   */
  coordinateSystem: null,

  /**
   * @param {string} axisType
   * @return {module:echarts/coord/polar/AxisModel}
   */
  findAxisModel: function (axisType) {
    var foundAxisModel;
    var ecModel = this.ecModel;
    ecModel.eachComponent(axisType, function (axisModel) {
      if (axisModel.getCoordSysModel() === this) {
        foundAxisModel = axisModel;
      }
    }, this);
    return foundAxisModel;
  },
  defaultOption: {
    zlevel: 0,
    z: 0,
    center: ['50%', '50%'],
    radius: '80%'
  }
});

module.exports = _default;

/***/ }),

/***/ "849b":
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

var Parallel = __webpack_require__("d9d0");

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

/**
 * Parallel coordinate system creater.
 */
function create(ecModel, api) {
  var coordSysList = [];
  ecModel.eachComponent('parallel', function (parallelModel, idx) {
    var coordSys = new Parallel(parallelModel, ecModel, api);
    coordSys.name = 'parallel_' + idx;
    coordSys.resize(parallelModel, api);
    parallelModel.coordinateSystem = coordSys;
    coordSys.model = parallelModel;
    coordSysList.push(coordSys);
  }); // Inject the coordinateSystems into seriesModel

  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'parallel') {
      var parallelModel = ecModel.queryComponents({
        mainType: 'parallel',
        index: seriesModel.get('parallelIndex'),
        id: seriesModel.get('parallelId')
      })[0];
      seriesModel.coordinateSystem = parallelModel.coordinateSystem;
    }
  });
  return coordSysList;
}

CoordinateSystem.register('parallel', {
  create: create
});

/***/ }),

/***/ "9273":
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
function RadiusAxis(scale, radiusExtent) {
  Axis.call(this, 'radius', scale, radiusExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'category';
}

RadiusAxis.prototype = {
  constructor: RadiusAxis,

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
  },
  dataToRadius: Axis.prototype.dataToCoord,
  radiusToData: Axis.prototype.coordToData
};
zrUtil.inherits(RadiusAxis, Axis);
var _default = RadiusAxis;
module.exports = _default;

/***/ }),

/***/ "a7f2":
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
// Fix for 钓鱼岛
// var Region = require('../Region');
// var zrUtil = require('zrender/src/core/util');
// var geoCoord = [126, 25];
var points = [[[123.45165252685547, 25.73527164402261], [123.49731445312499, 25.73527164402261], [123.49731445312499, 25.750734064600884], [123.45165252685547, 25.750734064600884], [123.45165252685547, 25.73527164402261]]];

function _default(mapType, region) {
  if (mapType === 'china' && region.name === '台湾') {
    region.geometries.push({
      type: 'polygon',
      exterior: points[0]
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "a991":
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

var Axis = __webpack_require__("84ce");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

function AngleAxis(scale, angleExtent) {
  angleExtent = angleExtent || [0, 360];
  Axis.call(this, 'angle', scale, angleExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'category';
}

AngleAxis.prototype = {
  constructor: AngleAxis,

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
  },
  dataToAngle: Axis.prototype.dataToCoord,
  angleToData: Axis.prototype.coordToData,

  /**
   * Only be called in category axis.
   * Angle axis uses text height to decide interval
   *
   * @override
   * @return {number} Auto interval for cateogry axis tick and label
   */
  calculateCategoryInterval: function () {
    var axis = this;
    var labelModel = axis.getLabelModel();
    var ordinalScale = axis.scale;
    var ordinalExtent = ordinalScale.getExtent(); // Providing this method is for optimization:
    // avoid generating a long array by `getTicks`
    // in large category data case.

    var tickCount = ordinalScale.count();

    if (ordinalExtent[1] - ordinalExtent[0] < 1) {
      return 0;
    }

    var tickValue = ordinalExtent[0];
    var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
    var unitH = Math.abs(unitSpan); // Not precise, just use height as text width
    // and each distance from axis line yet.

    var rect = textContain.getBoundingRect(tickValue, labelModel.getFont(), 'center', 'top');
    var maxH = Math.max(rect.height, 7);
    var dh = maxH / unitH; // 0/0 is NaN, 1/0 is Infinity.

    isNaN(dh) && (dh = Infinity);
    var interval = Math.max(0, Math.floor(dh));
    var cache = inner(axis.model);
    var lastAutoInterval = cache.lastAutoInterval;
    var lastTickCount = cache.lastTickCount; // Use cache to keep interval stable while moving zoom window,
    // otherwise the calculated interval might jitter when the zoom
    // window size is close to the interval-changing size.

    if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 // Always choose the bigger one, otherwise the critical
    // point is not the same when zooming in or zooming out.
    && lastAutoInterval > interval) {
      interval = lastAutoInterval;
    } // Only update cache if cache not used, otherwise the
    // changing of interval is too insensitive.
    else {
        cache.lastTickCount = tickCount;
        cache.lastAutoInterval = interval;
      }

    return interval;
  }
};
zrUtil.inherits(AngleAxis, Axis);
var _default = AngleAxis;
module.exports = _default;

/***/ }),

/***/ "bda7":
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

var Region = __webpack_require__("f279");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Parse and decode geo json
 * @module echarts/coord/geo/parseGeoJson
 */
function decode(json) {
  if (!json.UTF8Encoding) {
    return json;
  }

  var encodeScale = json.UTF8Scale;

  if (encodeScale == null) {
    encodeScale = 1024;
  }

  var features = json.features;

  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    var geometry = feature.geometry;
    var coordinates = geometry.coordinates;
    var encodeOffsets = geometry.encodeOffsets;

    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c];

      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(coordinate, encodeOffsets[c], encodeScale);
      } else if (geometry.type === 'MultiPolygon') {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2];
          coordinate[c2] = decodePolygon(polygon, encodeOffsets[c][c2], encodeScale);
        }
      }
    }
  } // Has been decoded


  json.UTF8Encoding = false;
  return json;
}

function decodePolygon(coordinate, encodeOffsets, encodeScale) {
  var result = [];
  var prevX = encodeOffsets[0];
  var prevY = encodeOffsets[1];

  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64;
    var y = coordinate.charCodeAt(i + 1) - 64; // ZigZag decoding

    x = x >> 1 ^ -(x & 1);
    y = y >> 1 ^ -(y & 1); // Delta deocding

    x += prevX;
    y += prevY;
    prevX = x;
    prevY = y; // Dequantize

    result.push([x / encodeScale, y / encodeScale]);
  }

  return result;
}
/**
 * @alias module:echarts/coord/geo/parseGeoJson
 * @param {Object} geoJson
 * @return {module:zrender/container/Group}
 */


function _default(geoJson) {
  decode(geoJson);
  return zrUtil.map(zrUtil.filter(geoJson.features, function (featureObj) {
    // Output of mapshaper may have geometry null
    return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0;
  }), function (featureObj) {
    var properties = featureObj.properties;
    var geo = featureObj.geometry;
    var coordinates = geo.coordinates;
    var geometries = [];

    if (geo.type === 'Polygon') {
      geometries.push({
        type: 'polygon',
        // According to the GeoJSON specification.
        // First must be exterior, and the rest are all interior(holes).
        exterior: coordinates[0],
        interiors: coordinates.slice(1)
      });
    }

    if (geo.type === 'MultiPolygon') {
      zrUtil.each(coordinates, function (item) {
        if (item[0]) {
          geometries.push({
            type: 'polygon',
            exterior: item[0],
            interiors: item.slice(1)
          });
        }
      });
    }

    var region = new Region(properties.name, geometries, properties.cp);
    region.properties = properties;
    return region;
  });
}

module.exports = _default;

/***/ }),

/***/ "c62c":
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
  type: 'singleAxis',
  layoutMode: 'box',

  /**
   * @type {module:echarts/coord/single/SingleAxis}
   */
  axis: null,

  /**
   * @type {module:echarts/coord/single/Single}
   */
  coordinateSystem: null,

  /**
   * @override
   */
  getCoordSysModel: function () {
    return this;
  }
});
var defaultOption = {
  left: '5%',
  top: '5%',
  right: '5%',
  bottom: '5%',
  type: 'value',
  position: 'bottom',
  orient: 'horizontal',
  axisLine: {
    show: true,
    lineStyle: {
      width: 1,
      type: 'solid'
    }
  },
  // Single coordinate system and single axis is the,
  // which is used as the parent tooltip model.
  // same model, so we set default tooltip show as true.
  tooltip: {
    show: true
  },
  axisTick: {
    show: true,
    length: 6,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    interval: 'auto'
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: 'dashed',
      opacity: 0.2
    }
  }
};

function getAxisType(axisName, option) {
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
axisModelCreator('single', AxisModel, getAxisType, defaultOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "c92f":
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

var _parseSVG = __webpack_require__("3041");

var parseSVG = _parseSVG.parseSVG;
var makeViewBoxTransform = _parseSVG.makeViewBoxTransform;

var Group = __webpack_require__("e1fc");

var Rect = __webpack_require__("c7a2");

var _util = __webpack_require__("6d8b");

var assert = _util.assert;
var createHashMap = _util.createHashMap;

var BoundingRect = __webpack_require__("9850");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
var _default = {
  /**
   * @param {string} mapName
   * @param {Object} mapRecord {specialAreas, geoJSON}
   * @return {Object} {root, boundingRect}
   */
  load: function (mapName, mapRecord) {
    var originRoot = inner(mapRecord).originRoot;

    if (originRoot) {
      return {
        root: originRoot,
        boundingRect: inner(mapRecord).boundingRect
      };
    }

    var graphic = buildGraphic(mapRecord);
    inner(mapRecord).originRoot = graphic.root;
    inner(mapRecord).boundingRect = graphic.boundingRect;
    return graphic;
  },
  makeGraphic: function (mapName, mapRecord, hostKey) {
    // For performance consideration (in large SVG), graphic only maked
    // when necessary and reuse them according to hostKey.
    var field = inner(mapRecord);
    var rootMap = field.rootMap || (field.rootMap = createHashMap());
    var root = rootMap.get(hostKey);

    if (root) {
      return root;
    }

    var originRoot = field.originRoot;
    var boundingRect = field.boundingRect; // For performance, if originRoot is not used by a view,
    // assign it to a view, but not reproduce graphic elements.

    if (!field.originRootHostKey) {
      field.originRootHostKey = hostKey;
      root = originRoot;
    } else {
      root = buildGraphic(mapRecord, boundingRect).root;
    }

    return rootMap.set(hostKey, root);
  },
  removeGraphic: function (mapName, mapRecord, hostKey) {
    var field = inner(mapRecord);
    var rootMap = field.rootMap;
    rootMap && rootMap.removeKey(hostKey);

    if (hostKey === field.originRootHostKey) {
      field.originRootHostKey = null;
    }
  }
};

function buildGraphic(mapRecord, boundingRect) {
  var svgXML = mapRecord.svgXML;
  var result;
  var root;

  try {
    result = svgXML && parseSVG(svgXML, {
      ignoreViewBox: true,
      ignoreRootClip: true
    }) || {};
    root = result.root;
    assert(root != null);
  } catch (e) {
    throw new Error('Invalid svg format\n' + e.message);
  }

  var svgWidth = result.width;
  var svgHeight = result.height;
  var viewBoxRect = result.viewBoxRect;

  if (!boundingRect) {
    boundingRect = svgWidth == null || svgHeight == null ? // If svg width / height not specified, calculate
    // bounding rect as the width / height
    root.getBoundingRect() : new BoundingRect(0, 0, 0, 0);

    if (svgWidth != null) {
      boundingRect.width = svgWidth;
    }

    if (svgHeight != null) {
      boundingRect.height = svgHeight;
    }
  }

  if (viewBoxRect) {
    var viewBoxTransform = makeViewBoxTransform(viewBoxRect, boundingRect.width, boundingRect.height);
    var elRoot = root;
    root = new Group();
    root.add(elRoot);
    elRoot.scale = viewBoxTransform.scale;
    elRoot.position = viewBoxTransform.position;
  }

  root.setClipPath(new Rect({
    shape: boundingRect.plain()
  }));
  return {
    root: root,
    boundingRect: boundingRect
  };
}

module.exports = _default;

/***/ }),

/***/ "d9d0":
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

var matrix = __webpack_require__("1687");

var layoutUtil = __webpack_require__("f934");

var axisHelper = __webpack_require__("697e");

var ParallelAxis = __webpack_require__("0f55");

var graphic = __webpack_require__("2306");

var numberUtil = __webpack_require__("3842");

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

/**
 * Parallel Coordinates
 * <https://en.wikipedia.org/wiki/Parallel_coordinates>
 */
var each = zrUtil.each;
var mathMin = Math.min;
var mathMax = Math.max;
var mathFloor = Math.floor;
var mathCeil = Math.ceil;
var round = numberUtil.round;
var PI = Math.PI;

function Parallel(parallelModel, ecModel, api) {
  /**
   * key: dimension
   * @type {Object.<string, module:echarts/coord/parallel/Axis>}
   * @private
   */
  this._axesMap = zrUtil.createHashMap();
  /**
   * key: dimension
   * value: {position: [], rotation, }
   * @type {Object.<string, Object>}
   * @private
   */

  this._axesLayout = {};
  /**
   * Always follow axis order.
   * @type {Array.<string>}
   * @readOnly
   */

  this.dimensions = parallelModel.dimensions;
  /**
   * @type {module:zrender/core/BoundingRect}
   */

  this._rect;
  /**
   * @type {module:echarts/coord/parallel/ParallelModel}
   */

  this._model = parallelModel;

  this._init(parallelModel, ecModel, api);
}

Parallel.prototype = {
  type: 'parallel',
  constructor: Parallel,

  /**
   * Initialize cartesian coordinate systems
   * @private
   */
  _init: function (parallelModel, ecModel, api) {
    var dimensions = parallelModel.dimensions;
    var parallelAxisIndex = parallelModel.parallelAxisIndex;
    each(dimensions, function (dim, idx) {
      var axisIndex = parallelAxisIndex[idx];
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);

      var axis = this._axesMap.set(dim, new ParallelAxis(dim, axisHelper.createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisIndex));

      var isCategory = axis.type === 'category';
      axis.onBand = isCategory && axisModel.get('boundaryGap');
      axis.inverse = axisModel.get('inverse'); // Injection

      axisModel.axis = axis;
      axis.model = axisModel;
      axis.coordinateSystem = axisModel.coordinateSystem = this;
    }, this);
  },

  /**
   * Update axis scale after data processed
   * @param  {module:echarts/model/Global} ecModel
   * @param  {module:echarts/ExtensionAPI} api
   */
  update: function (ecModel, api) {
    this._updateAxesFromSeries(this._model, ecModel);
  },

  /**
   * @override
   */
  containPoint: function (point) {
    var layoutInfo = this._makeLayoutInfo();

    var axisBase = layoutInfo.axisBase;
    var layoutBase = layoutInfo.layoutBase;
    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var pAxis = point[1 - pixelDimIndex];
    var pLayout = point[pixelDimIndex];
    return pAxis >= axisBase && pAxis <= axisBase + layoutInfo.axisLength && pLayout >= layoutBase && pLayout <= layoutBase + layoutInfo.layoutLength;
  },
  getModel: function () {
    return this._model;
  },

  /**
   * Update properties from series
   * @private
   */
  _updateAxesFromSeries: function (parallelModel, ecModel) {
    ecModel.eachSeries(function (seriesModel) {
      if (!parallelModel.contains(seriesModel, ecModel)) {
        return;
      }

      var data = seriesModel.getData();
      each(this.dimensions, function (dim) {
        var axis = this._axesMap.get(dim);

        axis.scale.unionExtentFromData(data, data.mapDimension(dim));
        axisHelper.niceScaleExtent(axis.scale, axis.model);
      }, this);
    }, this);
  },

  /**
   * Resize the parallel coordinate system.
   * @param {module:echarts/coord/parallel/ParallelModel} parallelModel
   * @param {module:echarts/ExtensionAPI} api
   */
  resize: function (parallelModel, api) {
    this._rect = layoutUtil.getLayoutRect(parallelModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });

    this._layoutAxes();
  },

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getRect: function () {
    return this._rect;
  },

  /**
   * @private
   */
  _makeLayoutInfo: function () {
    var parallelModel = this._model;
    var rect = this._rect;
    var xy = ['x', 'y'];
    var wh = ['width', 'height'];
    var layout = parallelModel.get('layout');
    var pixelDimIndex = layout === 'horizontal' ? 0 : 1;
    var layoutLength = rect[wh[pixelDimIndex]];
    var layoutExtent = [0, layoutLength];
    var axisCount = this.dimensions.length;
    var axisExpandWidth = restrict(parallelModel.get('axisExpandWidth'), layoutExtent);
    var axisExpandCount = restrict(parallelModel.get('axisExpandCount') || 0, [0, axisCount]);
    var axisExpandable = parallelModel.get('axisExpandable') && axisCount > 3 && axisCount > axisExpandCount && axisExpandCount > 1 && axisExpandWidth > 0 && layoutLength > 0; // `axisExpandWindow` is According to the coordinates of [0, axisExpandLength],
    // for sake of consider the case that axisCollapseWidth is 0 (when screen is narrow),
    // where collapsed axes should be overlapped.

    var axisExpandWindow = parallelModel.get('axisExpandWindow');
    var winSize;

    if (!axisExpandWindow) {
      winSize = restrict(axisExpandWidth * (axisExpandCount - 1), layoutExtent);
      var axisExpandCenter = parallelModel.get('axisExpandCenter') || mathFloor(axisCount / 2);
      axisExpandWindow = [axisExpandWidth * axisExpandCenter - winSize / 2];
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    } else {
      winSize = restrict(axisExpandWindow[1] - axisExpandWindow[0], layoutExtent);
      axisExpandWindow[1] = axisExpandWindow[0] + winSize;
    }

    var axisCollapseWidth = (layoutLength - winSize) / (axisCount - axisExpandCount); // Avoid axisCollapseWidth is too small.

    axisCollapseWidth < 3 && (axisCollapseWidth = 0); // Find the first and last indices > ewin[0] and < ewin[1].

    var winInnerIndices = [mathFloor(round(axisExpandWindow[0] / axisExpandWidth, 1)) + 1, mathCeil(round(axisExpandWindow[1] / axisExpandWidth, 1)) - 1]; // Pos in ec coordinates.

    var axisExpandWindow0Pos = axisCollapseWidth / axisExpandWidth * axisExpandWindow[0];
    return {
      layout: layout,
      pixelDimIndex: pixelDimIndex,
      layoutBase: rect[xy[pixelDimIndex]],
      layoutLength: layoutLength,
      axisBase: rect[xy[1 - pixelDimIndex]],
      axisLength: rect[wh[1 - pixelDimIndex]],
      axisExpandable: axisExpandable,
      axisExpandWidth: axisExpandWidth,
      axisCollapseWidth: axisCollapseWidth,
      axisExpandWindow: axisExpandWindow,
      axisCount: axisCount,
      winInnerIndices: winInnerIndices,
      axisExpandWindow0Pos: axisExpandWindow0Pos
    };
  },

  /**
   * @private
   */
  _layoutAxes: function () {
    var rect = this._rect;
    var axes = this._axesMap;
    var dimensions = this.dimensions;

    var layoutInfo = this._makeLayoutInfo();

    var layout = layoutInfo.layout;
    axes.each(function (axis) {
      var axisExtent = [0, layoutInfo.axisLength];
      var idx = axis.inverse ? 1 : 0;
      axis.setExtent(axisExtent[idx], axisExtent[1 - idx]);
    });
    each(dimensions, function (dim, idx) {
      var posInfo = (layoutInfo.axisExpandable ? layoutAxisWithExpand : layoutAxisWithoutExpand)(idx, layoutInfo);
      var positionTable = {
        horizontal: {
          x: posInfo.position,
          y: layoutInfo.axisLength
        },
        vertical: {
          x: 0,
          y: posInfo.position
        }
      };
      var rotationTable = {
        horizontal: PI / 2,
        vertical: 0
      };
      var position = [positionTable[layout].x + rect.x, positionTable[layout].y + rect.y];
      var rotation = rotationTable[layout];
      var transform = matrix.create();
      matrix.rotate(transform, transform, rotation);
      matrix.translate(transform, transform, position); // TODO
      // tick等排布信息。
      // TODO
      // 根据axis order 更新 dimensions顺序。

      this._axesLayout[dim] = {
        position: position,
        rotation: rotation,
        transform: transform,
        axisNameAvailableWidth: posInfo.axisNameAvailableWidth,
        axisLabelShow: posInfo.axisLabelShow,
        nameTruncateMaxWidth: posInfo.nameTruncateMaxWidth,
        tickDirection: 1,
        labelDirection: 1
      };
    }, this);
  },

  /**
   * Get axis by dim.
   * @param {string} dim
   * @return {module:echarts/coord/parallel/ParallelAxis} [description]
   */
  getAxis: function (dim) {
    return this._axesMap.get(dim);
  },

  /**
   * Convert a dim value of a single item of series data to Point.
   * @param {*} value
   * @param {string} dim
   * @return {Array}
   */
  dataToPoint: function (value, dim) {
    return this.axisCoordToPoint(this._axesMap.get(dim).dataToCoord(value), dim);
  },

  /**
   * Travel data for one time, get activeState of each data item.
   * @param {module:echarts/data/List} data
   * @param {Functio} cb param: {string} activeState 'active' or 'inactive' or 'normal'
   *                            {number} dataIndex
   * @param {number} [start=0] the start dataIndex that travel from.
   * @param {number} [end=data.count()] the next dataIndex of the last dataIndex will be travel.
   */
  eachActiveState: function (data, callback, start, end) {
    start == null && (start = 0);
    end == null && (end = data.count());
    var axesMap = this._axesMap;
    var dimensions = this.dimensions;
    var dataDimensions = [];
    var axisModels = [];
    zrUtil.each(dimensions, function (axisDim) {
      dataDimensions.push(data.mapDimension(axisDim));
      axisModels.push(axesMap.get(axisDim).model);
    });
    var hasActiveSet = this.hasAxisBrushed();

    for (var dataIndex = start; dataIndex < end; dataIndex++) {
      var activeState;

      if (!hasActiveSet) {
        activeState = 'normal';
      } else {
        activeState = 'active';
        var values = data.getValues(dataDimensions, dataIndex);

        for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
          var state = axisModels[j].getActiveState(values[j]);

          if (state === 'inactive') {
            activeState = 'inactive';
            break;
          }
        }
      }

      callback(activeState, dataIndex);
    }
  },

  /**
   * Whether has any activeSet.
   * @return {boolean}
   */
  hasAxisBrushed: function () {
    var dimensions = this.dimensions;
    var axesMap = this._axesMap;
    var hasActiveSet = false;

    for (var j = 0, lenj = dimensions.length; j < lenj; j++) {
      if (axesMap.get(dimensions[j]).model.getActiveState() !== 'normal') {
        hasActiveSet = true;
      }
    }

    return hasActiveSet;
  },

  /**
   * Convert coords of each axis to Point.
   *  Return point. For example: [10, 20]
   * @param {Array.<number>} coords
   * @param {string} dim
   * @return {Array.<number>}
   */
  axisCoordToPoint: function (coord, dim) {
    var axisLayout = this._axesLayout[dim];
    return graphic.applyTransform([coord, 0], axisLayout.transform);
  },

  /**
   * Get axis layout.
   */
  getAxisLayout: function (dim) {
    return zrUtil.clone(this._axesLayout[dim]);
  },

  /**
   * @param {Array.<number>} point
   * @return {Object} {axisExpandWindow, delta, behavior: 'jump' | 'slide' | 'none'}.
   */
  getSlidedAxisExpandWindow: function (point) {
    var layoutInfo = this._makeLayoutInfo();

    var pixelDimIndex = layoutInfo.pixelDimIndex;
    var axisExpandWindow = layoutInfo.axisExpandWindow.slice();
    var winSize = axisExpandWindow[1] - axisExpandWindow[0];
    var extent = [0, layoutInfo.axisExpandWidth * (layoutInfo.axisCount - 1)]; // Out of the area of coordinate system.

    if (!this.containPoint(point)) {
      return {
        behavior: 'none',
        axisExpandWindow: axisExpandWindow
      };
    } // Conver the point from global to expand coordinates.


    var pointCoord = point[pixelDimIndex] - layoutInfo.layoutBase - layoutInfo.axisExpandWindow0Pos; // For dragging operation convenience, the window should not be
    // slided when mouse is the center area of the window.

    var delta;
    var behavior = 'slide';
    var axisCollapseWidth = layoutInfo.axisCollapseWidth;

    var triggerArea = this._model.get('axisExpandSlideTriggerArea'); // But consider touch device, jump is necessary.


    var useJump = triggerArea[0] != null;

    if (axisCollapseWidth) {
      if (useJump && axisCollapseWidth && pointCoord < winSize * triggerArea[0]) {
        behavior = 'jump';
        delta = pointCoord - winSize * triggerArea[2];
      } else if (useJump && axisCollapseWidth && pointCoord > winSize * (1 - triggerArea[0])) {
        behavior = 'jump';
        delta = pointCoord - winSize * (1 - triggerArea[2]);
      } else {
        (delta = pointCoord - winSize * triggerArea[1]) >= 0 && (delta = pointCoord - winSize * (1 - triggerArea[1])) <= 0 && (delta = 0);
      }

      delta *= layoutInfo.axisExpandWidth / axisCollapseWidth;
      delta ? sliderMove(delta, axisExpandWindow, extent, 'all') // Avoid nonsense triger on mousemove.
      : behavior = 'none';
    } // When screen is too narrow, make it visible and slidable, although it is hard to interact.
    else {
        var winSize = axisExpandWindow[1] - axisExpandWindow[0];
        var pos = extent[1] * pointCoord / winSize;
        axisExpandWindow = [mathMax(0, pos - winSize / 2)];
        axisExpandWindow[1] = mathMin(extent[1], axisExpandWindow[0] + winSize);
        axisExpandWindow[0] = axisExpandWindow[1] - winSize;
      }

    return {
      axisExpandWindow: axisExpandWindow,
      behavior: behavior
    };
  }
};

function restrict(len, extent) {
  return mathMin(mathMax(len, extent[0]), extent[1]);
}

function layoutAxisWithoutExpand(axisIndex, layoutInfo) {
  var step = layoutInfo.layoutLength / (layoutInfo.axisCount - 1);
  return {
    position: step * axisIndex,
    axisNameAvailableWidth: step,
    axisLabelShow: true
  };
}

function layoutAxisWithExpand(axisIndex, layoutInfo) {
  var layoutLength = layoutInfo.layoutLength;
  var axisExpandWidth = layoutInfo.axisExpandWidth;
  var axisCount = layoutInfo.axisCount;
  var axisCollapseWidth = layoutInfo.axisCollapseWidth;
  var winInnerIndices = layoutInfo.winInnerIndices;
  var position;
  var axisNameAvailableWidth = axisCollapseWidth;
  var axisLabelShow = false;
  var nameTruncateMaxWidth;

  if (axisIndex < winInnerIndices[0]) {
    position = axisIndex * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  } else if (axisIndex <= winInnerIndices[1]) {
    position = layoutInfo.axisExpandWindow0Pos + axisIndex * axisExpandWidth - layoutInfo.axisExpandWindow[0];
    axisNameAvailableWidth = axisExpandWidth;
    axisLabelShow = true;
  } else {
    position = layoutLength - (axisCount - 1 - axisIndex) * axisCollapseWidth;
    nameTruncateMaxWidth = axisCollapseWidth;
  }

  return {
    position: position,
    axisNameAvailableWidth: axisNameAvailableWidth,
    axisLabelShow: axisLabelShow,
    nameTruncateMaxWidth: nameTruncateMaxWidth
  };
}

var _default = Parallel;
module.exports = _default;

/***/ }),

/***/ "d9f1":
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
var PolarAxisModel = ComponentModel.extend({
  type: 'polarAxis',

  /**
   * @type {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  axis: null,

  /**
   * @override
   */
  getCoordSysModel: function () {
    return this.ecModel.queryComponents({
      mainType: 'polar',
      index: this.option.polarIndex,
      id: this.option.polarId
    })[0];
  }
});
zrUtil.merge(PolarAxisModel.prototype, axisModelCommonMixin);
var polarAxisDefaultExtendedOption = {
  angle: {
    // polarIndex: 0,
    // polarId: '',
    startAngle: 90,
    clockwise: true,
    splitNumber: 12,
    axisLabel: {
      rotate: false
    }
  },
  radius: {
    // polarIndex: 0,
    // polarId: '',
    splitNumber: 5
  }
};

function getAxisType(axisDim, option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

axisModelCreator('angle', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.angle);
axisModelCreator('radius', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.radius);

/***/ }),

/***/ "df3a":
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

var makeStyleMapper = __webpack_require__("282b");

var axisModelCreator = __webpack_require__("9e47");

var numberUtil = __webpack_require__("3842");

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
  type: 'baseParallelAxis',

  /**
   * @type {module:echarts/coord/parallel/Axis}
   */
  axis: null,

  /**
   * @type {Array.<Array.<number>}
   * @readOnly
   */
  activeIntervals: [],

  /**
   * @return {Object}
   */
  getAreaSelectStyle: function () {
    return makeStyleMapper([['fill', 'color'], ['lineWidth', 'borderWidth'], ['stroke', 'borderColor'], ['width', 'width'], ['opacity', 'opacity']])(this.getModel('areaSelectStyle'));
  },

  /**
   * The code of this feature is put on AxisModel but not ParallelAxis,
   * because axisModel can be alive after echarts updating but instance of
   * ParallelAxis having been disposed. this._activeInterval should be kept
   * when action dispatched (i.e. legend click).
   *
   * @param {Array.<Array<number>>} intervals interval.length === 0
   *                                          means set all active.
   * @public
   */
  setActiveIntervals: function (intervals) {
    var activeIntervals = this.activeIntervals = zrUtil.clone(intervals); // Normalize

    if (activeIntervals) {
      for (var i = activeIntervals.length - 1; i >= 0; i--) {
        numberUtil.asc(activeIntervals[i]);
      }
    }
  },

  /**
   * @param {number|string} [value] When attempting to detect 'no activeIntervals set',
   *                         value can not be input.
   * @return {string} 'normal': no activeIntervals set,
   *                  'active',
   *                  'inactive'.
   * @public
   */
  getActiveState: function (value) {
    var activeIntervals = this.activeIntervals;

    if (!activeIntervals.length) {
      return 'normal';
    }

    if (value == null || isNaN(value)) {
      return 'inactive';
    } // Simple optimization


    if (activeIntervals.length === 1) {
      var interval = activeIntervals[0];

      if (interval[0] <= value && value <= interval[1]) {
        return 'active';
      }
    } else {
      for (var i = 0, len = activeIntervals.length; i < len; i++) {
        if (activeIntervals[i][0] <= value && value <= activeIntervals[i][1]) {
          return 'active';
        }
      }
    }

    return 'inactive';
  }
});
var defaultOption = {
  type: 'value',

  /**
   * @type {Array.<number>}
   */
  dim: null,
  // 0, 1, 2, ...
  // parallelIndex: null,
  areaSelectStyle: {
    width: 20,
    borderWidth: 1,
    borderColor: 'rgba(160,197,232)',
    color: 'rgba(160,197,232)',
    opacity: 0.3
  },
  realtime: true,
  // Whether realtime update view when select.
  z: 10
};
zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);

function getAxisType(axisName, option) {
  return option.type || (option.data ? 'category' : 'value');
}

axisModelCreator('parallel', AxisModel, getAxisType, defaultOption);
var _default = AxisModel;
module.exports = _default;

/***/ }),

/***/ "eaeb":
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
  return zrUtil.map(['Radius', 'Angle'], function (dim, dimIdx) {
    var axis = this['get' + dim + 'Axis']();
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var method = 'dataTo' + dim;
    var result = axis.type === 'category' ? axis.getBandWidth() : Math.abs(axis[method](val - halfSize) - axis[method](val + halfSize));

    if (dim === 'Angle') {
      result = result * Math.PI / 180;
    }

    return result;
  }, this);
}

function _default(coordSys) {
  var radiusAxis = coordSys.getRadiusAxis();
  var angleAxis = coordSys.getAngleAxis();
  var radius = radiusAxis.getExtent();
  radius[0] > radius[1] && radius.reverse();
  return {
    coordSys: {
      type: 'polar',
      cx: coordSys.cx,
      cy: coordSys.cy,
      r: radius[1],
      r0: radius[0]
    },
    api: {
      coord: zrUtil.bind(function (data) {
        var radius = radiusAxis.dataToRadius(data[0]);
        var angle = angleAxis.dataToAngle(data[1]);
        var coord = coordSys.coordToPoint([radius, angle]);
        coord.push(radius, angle * Math.PI / 180);
        return coord;
      }),
      size: zrUtil.bind(dataToCoordSize, coordSys)
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "ec34":
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

var createHashMap = _util.createHashMap;
var isString = _util.isString;
var isArray = _util.isArray;
var each = _util.each;
var assert = _util.assert;

var _parseSVG = __webpack_require__("3041");

var parseXML = _parseSVG.parseXML;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var storage = createHashMap(); // For minimize the code size of common echarts package,
// do not put too much logic in this module.

var _default = {
  // The format of record: see `echarts.registerMap`.
  // Compatible with previous `echarts.registerMap`.
  registerMap: function (mapName, rawGeoJson, rawSpecialAreas) {
    var records;

    if (isArray(rawGeoJson)) {
      records = rawGeoJson;
    } else if (rawGeoJson.svg) {
      records = [{
        type: 'svg',
        source: rawGeoJson.svg,
        specialAreas: rawGeoJson.specialAreas
      }];
    } else {
      // Backward compatibility.
      if (rawGeoJson.geoJson && !rawGeoJson.features) {
        rawSpecialAreas = rawGeoJson.specialAreas;
        rawGeoJson = rawGeoJson.geoJson;
      }

      records = [{
        type: 'geoJSON',
        source: rawGeoJson,
        specialAreas: rawSpecialAreas
      }];
    }

    each(records, function (record) {
      var type = record.type;
      type === 'geoJson' && (type = record.type = 'geoJSON');
      var parse = parsers[type];
      parse(record);
    });
    return storage.set(mapName, records);
  },
  retrieveMap: function (mapName) {
    return storage.get(mapName);
  }
};
var parsers = {
  geoJSON: function (record) {
    var source = record.source;
    record.geoJSON = !isString(source) ? source : typeof JSON !== 'undefined' && JSON.parse ? JSON.parse(source) : new Function('return (' + source + ');')();
  },
  // Only perform parse to XML object here, which might be time
  // consiming for large SVG.
  // Although convert XML to zrender element is also time consiming,
  // if we do it here, the clone of zrender elements has to be
  // required. So we do it once for each geo instance, util real
  // performance issues call for optimizing it.
  svg: function (record) {
    record.svgXML = parseXML(record.source);
  }
};
module.exports = _default;

/***/ }),

/***/ "edb9":
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
 * @param {Object} opt {labelInside}
 * @return {Object} {
 *  position, rotation, labelDirection, labelOffset,
 *  tickDirection, labelRotate, z2
 * }
 */
function layout(axisModel, opt) {
  opt = opt || {};
  var single = axisModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout = {};
  var axisPosition = axis.position;
  var orient = axis.orient;
  var rect = single.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var positionMap = {
    horizontal: {
      top: rectBound[2],
      bottom: rectBound[3]
    },
    vertical: {
      left: rectBound[0],
      right: rectBound[1]
    }
  };
  layout.position = [orient === 'vertical' ? positionMap.vertical[axisPosition] : rectBound[0], orient === 'horizontal' ? positionMap.horizontal[axisPosition] : rectBound[3]];
  var r = {
    horizontal: 0,
    vertical: 1
  };
  layout.rotation = Math.PI / 2 * r[orient];
  var directionMap = {
    top: -1,
    bottom: 1,
    right: 1,
    left: -1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = directionMap[axisPosition];

  if (axisModel.get('axisTick.inside')) {
    layout.tickDirection = -layout.tickDirection;
  }

  if (zrUtil.retrieve(opt.labelInside, axisModel.get('axisLabel.inside'))) {
    layout.labelDirection = -layout.labelDirection;
  }

  var labelRotation = opt.rotate;
  labelRotation == null && (labelRotation = axisModel.get('axisLabel.rotate'));
  layout.labelRotation = axisPosition === 'top' ? -labelRotation : labelRotation;
  layout.z2 = 1;
  return layout;
}

exports.layout = layout;

/***/ }),

/***/ "eeea":
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

var Geo = __webpack_require__("0141");

var layout = __webpack_require__("f934");

var numberUtil = __webpack_require__("3842");

var geoSourceManager = __webpack_require__("5b87");

var mapDataStorage = __webpack_require__("ec34");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Resize method bound to the geo
 * @param {module:echarts/coord/geo/GeoModel|module:echarts/chart/map/MapModel} geoModel
 * @param {module:echarts/ExtensionAPI} api
 */
function resizeGeo(geoModel, api) {
  var boundingCoords = geoModel.get('boundingCoords');

  if (boundingCoords != null) {
    var leftTop = boundingCoords[0];
    var rightBottom = boundingCoords[1];

    if (isNaN(leftTop[0]) || isNaN(leftTop[1]) || isNaN(rightBottom[0]) || isNaN(rightBottom[1])) {} else {
      this.setBoundingRect(leftTop[0], leftTop[1], rightBottom[0] - leftTop[0], rightBottom[1] - leftTop[1]);
    }
  }

  var rect = this.getBoundingRect();
  var boxLayoutOption;
  var center = geoModel.get('layoutCenter');
  var size = geoModel.get('layoutSize');
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  var aspect = rect.width / rect.height * this.aspectScale;
  var useCenterAndSize = false;

  if (center && size) {
    center = [numberUtil.parsePercent(center[0], viewWidth), numberUtil.parsePercent(center[1], viewHeight)];
    size = numberUtil.parsePercent(size, Math.min(viewWidth, viewHeight));

    if (!isNaN(center[0]) && !isNaN(center[1]) && !isNaN(size)) {
      useCenterAndSize = true;
    } else {}
  }

  var viewRect;

  if (useCenterAndSize) {
    var viewRect = {};

    if (aspect > 1) {
      // Width is same with size
      viewRect.width = size;
      viewRect.height = size / aspect;
    } else {
      viewRect.height = size;
      viewRect.width = size * aspect;
    }

    viewRect.y = center[1] - viewRect.height / 2;
    viewRect.x = center[0] - viewRect.width / 2;
  } else {
    // Use left/top/width/height
    boxLayoutOption = geoModel.getBoxLayoutParams(); // 0.75 rate

    boxLayoutOption.aspect = aspect;
    viewRect = layout.getLayoutRect(boxLayoutOption, {
      width: viewWidth,
      height: viewHeight
    });
  }

  this.setViewRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
  this.setCenter(geoModel.get('center'));
  this.setZoom(geoModel.get('zoom'));
}
/**
 * @param {module:echarts/coord/Geo} geo
 * @param {module:echarts/model/Model} model
 * @inner
 */


function setGeoCoords(geo, model) {
  zrUtil.each(model.get('geoCoord'), function (geoCoord, name) {
    geo.addGeoCoord(name, geoCoord);
  });
}

var geoCreator = {
  // For deciding which dimensions to use when creating list data
  dimensions: Geo.prototype.dimensions,
  create: function (ecModel, api) {
    var geoList = []; // FIXME Create each time may be slow

    ecModel.eachComponent('geo', function (geoModel, idx) {
      var name = geoModel.get('map');
      var aspectScale = geoModel.get('aspectScale');
      var invertLongitute = true;
      var mapRecords = mapDataStorage.retrieveMap(name);

      if (mapRecords && mapRecords[0] && mapRecords[0].type === 'svg') {
        aspectScale == null && (aspectScale = 1);
        invertLongitute = false;
      } else {
        aspectScale == null && (aspectScale = 0.75);
      }

      var geo = new Geo(name + idx, name, geoModel.get('nameMap'), invertLongitute);
      geo.aspectScale = aspectScale;
      geo.zoomLimit = geoModel.get('scaleLimit');
      geoList.push(geo);
      setGeoCoords(geo, geoModel);
      geoModel.coordinateSystem = geo;
      geo.model = geoModel; // Inject resize method

      geo.resize = resizeGeo;
      geo.resize(geoModel, api);
    });
    ecModel.eachSeries(function (seriesModel) {
      var coordSys = seriesModel.get('coordinateSystem');

      if (coordSys === 'geo') {
        var geoIndex = seriesModel.get('geoIndex') || 0;
        seriesModel.coordinateSystem = geoList[geoIndex];
      }
    }); // If has map series

    var mapModelGroupBySeries = {};
    ecModel.eachSeriesByType('map', function (seriesModel) {
      if (!seriesModel.getHostGeoModel()) {
        var mapType = seriesModel.getMapType();
        mapModelGroupBySeries[mapType] = mapModelGroupBySeries[mapType] || [];
        mapModelGroupBySeries[mapType].push(seriesModel);
      }
    });
    zrUtil.each(mapModelGroupBySeries, function (mapSeries, mapType) {
      var nameMapList = zrUtil.map(mapSeries, function (singleMapSeries) {
        return singleMapSeries.get('nameMap');
      });
      var geo = new Geo(mapType, mapType, zrUtil.mergeAll(nameMapList));
      geo.zoomLimit = zrUtil.retrieve.apply(null, zrUtil.map(mapSeries, function (singleMapSeries) {
        return singleMapSeries.get('scaleLimit');
      }));
      geoList.push(geo); // Inject resize method

      geo.resize = resizeGeo;
      geo.aspectScale = mapSeries[0].get('aspectScale');
      geo.resize(mapSeries[0], api);
      zrUtil.each(mapSeries, function (singleMapSeries) {
        singleMapSeries.coordinateSystem = geo;
        setGeoCoords(geo, singleMapSeries);
      });
    });
    return geoList;
  },

  /**
   * Fill given regions array
   * @param  {Array.<Object>} originRegionArr
   * @param  {string} mapName
   * @param  {Object} [nameMap]
   * @return {Array}
   */
  getFilledRegions: function (originRegionArr, mapName, nameMap) {
    // Not use the original
    var regionsArr = (originRegionArr || []).slice();
    var dataNameMap = zrUtil.createHashMap();

    for (var i = 0; i < regionsArr.length; i++) {
      dataNameMap.set(regionsArr[i].name, regionsArr[i]);
    }

    var source = geoSourceManager.load(mapName, nameMap);
    zrUtil.each(source.regions, function (region) {
      var name = region.name;
      !dataNameMap.get(name) && regionsArr.push({
        name: name
      });
    });
    return regionsArr;
  }
};
echarts.registerCoordinateSystem('geo', geoCreator);
var _default = geoCreator;
module.exports = _default;

/***/ }),

/***/ "f279":
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

var bbox = __webpack_require__("e263");

var vec2 = __webpack_require__("401b");

var polygonContain = __webpack_require__("0655");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @module echarts/coord/geo/Region
 */

/**
 * @param {string|Region} name
 * @param {Array} geometries
 * @param {Array.<number>} cp
 */
function Region(name, geometries, cp) {
  /**
   * @type {string}
   * @readOnly
   */
  this.name = name;
  /**
   * @type {Array.<Array>}
   * @readOnly
   */

  this.geometries = geometries;

  if (!cp) {
    var rect = this.getBoundingRect();
    cp = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  } else {
    cp = [cp[0], cp[1]];
  }
  /**
   * @type {Array.<number>}
   */


  this.center = cp;
}

Region.prototype = {
  constructor: Region,
  properties: null,

  /**
   * @return {module:zrender/core/BoundingRect}
   */
  getBoundingRect: function () {
    var rect = this._rect;

    if (rect) {
      return rect;
    }

    var MAX_NUMBER = Number.MAX_VALUE;
    var min = [MAX_NUMBER, MAX_NUMBER];
    var max = [-MAX_NUMBER, -MAX_NUMBER];
    var min2 = [];
    var max2 = [];
    var geometries = this.geometries;

    for (var i = 0; i < geometries.length; i++) {
      // Only support polygon
      if (geometries[i].type !== 'polygon') {
        continue;
      } // Doesn't consider hole


      var exterior = geometries[i].exterior;
      bbox.fromPoints(exterior, min2, max2);
      vec2.min(min, min, min2);
      vec2.max(max, max, max2);
    } // No data


    if (i === 0) {
      min[0] = min[1] = max[0] = max[1] = 0;
    }

    return this._rect = new BoundingRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
  },

  /**
   * @param {<Array.<number>} coord
   * @return {boolean}
   */
  contain: function (coord) {
    var rect = this.getBoundingRect();
    var geometries = this.geometries;

    if (!rect.contain(coord[0], coord[1])) {
      return false;
    }

    loopGeo: for (var i = 0, len = geometries.length; i < len; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      if (polygonContain.contain(exterior, coord[0], coord[1])) {
        // Not in the region if point is in the hole.
        for (var k = 0; k < (interiors ? interiors.length : 0); k++) {
          if (polygonContain.contain(interiors[k])) {
            continue loopGeo;
          }
        }

        return true;
      }
    }

    return false;
  },
  transformTo: function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var aspect = rect.width / rect.height;

    if (!width) {
      width = aspect * height;
    } else if (!height) {
      height = width / aspect;
    }

    var target = new BoundingRect(x, y, width, height);
    var transform = rect.calculateTransform(target);
    var geometries = this.geometries;

    for (var i = 0; i < geometries.length; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      for (var p = 0; p < exterior.length; p++) {
        vec2.applyTransform(exterior[p], exterior[p], transform);
      }

      for (var h = 0; h < (interiors ? interiors.length : 0); h++) {
        for (var p = 0; p < interiors[h].length; p++) {
          vec2.applyTransform(interiors[h][p], interiors[h][p], transform);
        }
      }
    }

    rect = this._rect;
    rect.copy(target); // Update center

    this.center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  },
  cloneShallow: function (name) {
    name == null && (name = this.name);
    var newRegion = new Region(name, this.geometries, this.center);
    newRegion._rect = this._rect;
    newRegion.transformTo = null; // Simply avoid to be called.

    return newRegion;
  }
};
var _default = Region;
module.exports = _default;

/***/ }),

/***/ "fd27":
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

var RadiusAxis = __webpack_require__("9273");

var AngleAxis = __webpack_require__("a991");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @module echarts/coord/polar/Polar
 */

/**
 * @alias {module:echarts/coord/polar/Polar}
 * @constructor
 * @param {string} name
 */
var Polar = function (name) {
  /**
   * @type {string}
   */
  this.name = name || '';
  /**
   * x of polar center
   * @type {number}
   */

  this.cx = 0;
  /**
   * y of polar center
   * @type {number}
   */

  this.cy = 0;
  /**
   * @type {module:echarts/coord/polar/RadiusAxis}
   * @private
   */

  this._radiusAxis = new RadiusAxis();
  /**
   * @type {module:echarts/coord/polar/AngleAxis}
   * @private
   */

  this._angleAxis = new AngleAxis();
  this._radiusAxis.polar = this._angleAxis.polar = this;
};

Polar.prototype = {
  type: 'polar',
  axisPointerEnabled: true,
  constructor: Polar,

  /**
   * @param {Array.<string>}
   * @readOnly
   */
  dimensions: ['radius', 'angle'],

  /**
   * @type {module:echarts/coord/PolarModel}
   */
  model: null,

  /**
   * If contain coord
   * @param {Array.<number>} point
   * @return {boolean}
   */
  containPoint: function (point) {
    var coord = this.pointToCoord(point);
    return this._radiusAxis.contain(coord[0]) && this._angleAxis.contain(coord[1]);
  },

  /**
   * If contain data
   * @param {Array.<number>} data
   * @return {boolean}
   */
  containData: function (data) {
    return this._radiusAxis.containData(data[0]) && this._angleAxis.containData(data[1]);
  },

  /**
   * @param {string} dim
   * @return {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  getAxis: function (dim) {
    return this['_' + dim + 'Axis'];
  },

  /**
   * @return {Array.<module:echarts/coord/Axis>}
   */
  getAxes: function () {
    return [this._radiusAxis, this._angleAxis];
  },

  /**
   * Get axes by type of scale
   * @param {string} scaleType
   * @return {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
   */
  getAxesByScale: function (scaleType) {
    var axes = [];
    var angleAxis = this._angleAxis;
    var radiusAxis = this._radiusAxis;
    angleAxis.scale.type === scaleType && axes.push(angleAxis);
    radiusAxis.scale.type === scaleType && axes.push(radiusAxis);
    return axes;
  },

  /**
   * @return {module:echarts/coord/polar/AngleAxis}
   */
  getAngleAxis: function () {
    return this._angleAxis;
  },

  /**
   * @return {module:echarts/coord/polar/RadiusAxis}
   */
  getRadiusAxis: function () {
    return this._radiusAxis;
  },

  /**
   * @param {module:echarts/coord/polar/Axis}
   * @return {module:echarts/coord/polar/Axis}
   */
  getOtherAxis: function (axis) {
    var angleAxis = this._angleAxis;
    return axis === angleAxis ? this._radiusAxis : angleAxis;
  },

  /**
   * Base axis will be used on stacking.
   *
   * @return {module:echarts/coord/polar/Axis}
   */
  getBaseAxis: function () {
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAngleAxis();
  },

  /**
   * @param {string} [dim] 'radius' or 'angle' or 'auto' or null/undefined
   * @return {Object} {baseAxes: [], otherAxes: []}
   */
  getTooltipAxes: function (dim) {
    var baseAxis = dim != null && dim !== 'auto' ? this.getAxis(dim) : this.getBaseAxis();
    return {
      baseAxes: [baseAxis],
      otherAxes: [this.getOtherAxis(baseAxis)]
    };
  },

  /**
   * Convert a single data item to (x, y) point.
   * Parameter data is an array which the first element is radius and the second is angle
   * @param {Array.<number>} data
   * @param {boolean} [clamp=false]
   * @return {Array.<number>}
   */
  dataToPoint: function (data, clamp) {
    return this.coordToPoint([this._radiusAxis.dataToRadius(data[0], clamp), this._angleAxis.dataToAngle(data[1], clamp)]);
  },

  /**
   * Convert a (x, y) point to data
   * @param {Array.<number>} point
   * @param {boolean} [clamp=false]
   * @return {Array.<number>}
   */
  pointToData: function (point, clamp) {
    var coord = this.pointToCoord(point);
    return [this._radiusAxis.radiusToData(coord[0], clamp), this._angleAxis.angleToData(coord[1], clamp)];
  },

  /**
   * Convert a (x, y) point to (radius, angle) coord
   * @param {Array.<number>} point
   * @return {Array.<number>}
   */
  pointToCoord: function (point) {
    var dx = point[0] - this.cx;
    var dy = point[1] - this.cy;
    var angleAxis = this.getAngleAxis();
    var extent = angleAxis.getExtent();
    var minAngle = Math.min(extent[0], extent[1]);
    var maxAngle = Math.max(extent[0], extent[1]); // Fix fixed extent in polarCreator
    // FIXME

    angleAxis.inverse ? minAngle = maxAngle - 360 : maxAngle = minAngle + 360;
    var radius = Math.sqrt(dx * dx + dy * dy);
    dx /= radius;
    dy /= radius;
    var radian = Math.atan2(-dy, dx) / Math.PI * 180; // move to angleExtent

    var dir = radian < minAngle ? 1 : -1;

    while (radian < minAngle || radian > maxAngle) {
      radian += dir * 360;
    }

    return [radius, radian];
  },

  /**
   * Convert a (radius, angle) coord to (x, y) point
   * @param {Array.<number>} coord
   * @return {Array.<number>}
   */
  coordToPoint: function (coord) {
    var radius = coord[0];
    var radian = coord[1] / 180 * Math.PI;
    var x = Math.cos(radian) * radius + this.cx; // Inverse the y

    var y = -Math.sin(radian) * radius + this.cy;
    return [x, y];
  },

  /**
   * Get ring area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   * @return {Ring}
   */
  getArea: function () {
    var angleAxis = this.getAngleAxis();
    var radiusAxis = this.getRadiusAxis();
    var radiusExtent = radiusAxis.getExtent().slice();
    radiusExtent[0] > radiusExtent[1] && radiusExtent.reverse();
    var angleExtent = angleAxis.getExtent();
    var RADIAN = Math.PI / 180;
    return {
      cx: this.cx,
      cy: this.cy,
      r0: radiusExtent[0],
      r: radiusExtent[1],
      startAngle: -angleExtent[0] * RADIAN,
      endAngle: -angleExtent[1] * RADIAN,
      clockwise: angleAxis.inverse,
      contain: function (x, y) {
        // It's a ring shape.
        // Start angle and end angle don't matter
        var dx = x - this.cx;
        var dy = y - this.cy;
        var d2 = dx * dx + dy * dy;
        var r = this.r;
        var r0 = this.r0;
        return d2 <= r * r && d2 >= r0 * r0;
      }
    };
  }
};
var _default = Polar;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~4813aef3.ebf99bae.js.map