(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~ef4b7b69"],{

/***/ "18c0":
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

var Scale = __webpack_require__("e0d8");

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

/**
 * Linear continuous scale
 * @module echarts/coord/scale/Ordinal
 *
 * http://en.wikipedia.org/wiki/Level_of_measurement
 */
// FIXME only one data
var scaleProto = Scale.prototype;
var OrdinalScale = Scale.extend({
  type: 'ordinal',

  /**
   * @param {module:echarts/data/OrdianlMeta|Array.<string>} ordinalMeta
   */
  init: function (ordinalMeta, extent) {
    // Caution: Should not use instanceof, consider ec-extensions using
    // import approach to get OrdinalMeta class.
    if (!ordinalMeta || zrUtil.isArray(ordinalMeta)) {
      ordinalMeta = new OrdinalMeta({
        categories: ordinalMeta
      });
    }

    this._ordinalMeta = ordinalMeta;
    this._extent = extent || [0, ordinalMeta.categories.length - 1];
  },
  parse: function (val) {
    return typeof val === 'string' ? this._ordinalMeta.getOrdinal(val) // val might be float.
    : Math.round(val);
  },
  contain: function (rank) {
    rank = this.parse(rank);
    return scaleProto.contain.call(this, rank) && this._ordinalMeta.categories[rank] != null;
  },

  /**
   * Normalize given rank or name to linear [0, 1]
   * @param {number|string} [val]
   * @return {number}
   */
  normalize: function (val) {
    return scaleProto.normalize.call(this, this.parse(val));
  },
  scale: function (val) {
    return Math.round(scaleProto.scale.call(this, val));
  },

  /**
   * @return {Array}
   */
  getTicks: function () {
    var ticks = [];
    var extent = this._extent;
    var rank = extent[0];

    while (rank <= extent[1]) {
      ticks.push(rank);
      rank++;
    }

    return ticks;
  },

  /**
   * Get item on rank n
   * @param {number} n
   * @return {string}
   */
  getLabel: function (n) {
    if (!this.isBlank()) {
      // Note that if no data, ordinalMeta.categories is an empty array.
      return this._ordinalMeta.categories[n];
    }
  },

  /**
   * @return {number}
   */
  count: function () {
    return this._extent[1] - this._extent[0] + 1;
  },

  /**
   * @override
   */
  unionExtentFromData: function (data, dim) {
    this.unionExtent(data.getApproximateExtent(dim));
  },
  getOrdinalMeta: function () {
    return this._ordinalMeta;
  },
  niceTicks: zrUtil.noop,
  niceExtent: zrUtil.noop
});
/**
 * @return {module:echarts/scale/Time}
 */

OrdinalScale.create = function () {
  return new OrdinalScale();
};

var _default = OrdinalScale;
module.exports = _default;

/***/ }),

/***/ "216a":
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

var formatUtil = __webpack_require__("eda2");

var scaleHelper = __webpack_require__("944e");

var IntervalScale = __webpack_require__("89e3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
* A third-party license is embeded for some of the code in this file:
* The "scaleLevels" was originally copied from "d3.js" with some
* modifications made for this project.
* (See more details in the comment on the definition of "scaleLevels" below.)
* The use of the source code of this file is also subject to the terms
* and consitions of the license of "d3.js" (BSD-3Clause, see
* </licenses/LICENSE-d3>).
*/
// [About UTC and local time zone]:
// In most cases, `number.parseDate` will treat input data string as local time
// (except time zone is specified in time string). And `format.formateTime` returns
// local time by default. option.useUTC is false by default. This design have
// concidered these common case:
// (1) Time that is persistent in server is in UTC, but it is needed to be diplayed
// in local time by default.
// (2) By default, the input data string (e.g., '2011-01-02') should be displayed
// as its original time, without any time difference.
var intervalScaleProto = IntervalScale.prototype;
var mathCeil = Math.ceil;
var mathFloor = Math.floor;
var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND * 60;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24; // FIXME 公用？

var bisect = function (a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;

    if (a[mid][1] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
};
/**
 * @alias module:echarts/coord/scale/Time
 * @constructor
 */


var TimeScale = IntervalScale.extend({
  type: 'time',

  /**
   * @override
   */
  getLabel: function (val) {
    var stepLvl = this._stepLvl;
    var date = new Date(val);
    return formatUtil.formatTime(stepLvl[0], date, this.getSetting('useUTC'));
  },

  /**
   * @override
   */
  niceExtent: function (opt) {
    var extent = this._extent; // If extent start and end are same, expand them

    if (extent[0] === extent[1]) {
      // Expand extent
      extent[0] -= ONE_DAY;
      extent[1] += ONE_DAY;
    } // If there are no data and extent are [Infinity, -Infinity]


    if (extent[1] === -Infinity && extent[0] === Infinity) {
      var d = new Date();
      extent[1] = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
      extent[0] = extent[1] - ONE_DAY;
    }

    this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval); // var extent = this._extent;

    var interval = this._interval;

    if (!opt.fixMin) {
      extent[0] = numberUtil.round(mathFloor(extent[0] / interval) * interval);
    }

    if (!opt.fixMax) {
      extent[1] = numberUtil.round(mathCeil(extent[1] / interval) * interval);
    }
  },

  /**
   * @override
   */
  niceTicks: function (approxTickNum, minInterval, maxInterval) {
    approxTickNum = approxTickNum || 10;
    var extent = this._extent;
    var span = extent[1] - extent[0];
    var approxInterval = span / approxTickNum;

    if (minInterval != null && approxInterval < minInterval) {
      approxInterval = minInterval;
    }

    if (maxInterval != null && approxInterval > maxInterval) {
      approxInterval = maxInterval;
    }

    var scaleLevelsLen = scaleLevels.length;
    var idx = bisect(scaleLevels, approxInterval, 0, scaleLevelsLen);
    var level = scaleLevels[Math.min(idx, scaleLevelsLen - 1)];
    var interval = level[1]; // Same with interval scale if span is much larger than 1 year

    if (level[0] === 'year') {
      var yearSpan = span / interval; // From "Nice Numbers for Graph Labels" of Graphic Gems
      // var niceYearSpan = numberUtil.nice(yearSpan, false);

      var yearStep = numberUtil.nice(yearSpan / approxTickNum, true);
      interval *= yearStep;
    }

    var timezoneOffset = this.getSetting('useUTC') ? 0 : new Date(+extent[0] || +extent[1]).getTimezoneOffset() * 60 * 1000;
    var niceExtent = [Math.round(mathCeil((extent[0] - timezoneOffset) / interval) * interval + timezoneOffset), Math.round(mathFloor((extent[1] - timezoneOffset) / interval) * interval + timezoneOffset)];
    scaleHelper.fixExtent(niceExtent, extent);
    this._stepLvl = level; // Interval will be used in getTicks

    this._interval = interval;
    this._niceExtent = niceExtent;
  },
  parse: function (val) {
    // val might be float.
    return +numberUtil.parseDate(val);
  }
});
zrUtil.each(['contain', 'normalize'], function (methodName) {
  TimeScale.prototype[methodName] = function (val) {
    return intervalScaleProto[methodName].call(this, this.parse(val));
  };
});
/**
 * This implementation was originally copied from "d3.js"
 * <https://github.com/d3/d3/blob/b516d77fb8566b576088e73410437494717ada26/src/time/scale.js>
 * with some modifications made for this program.
 * See the license statement at the head of this file.
 */

var scaleLevels = [// Format              interval
['hh:mm:ss', ONE_SECOND], // 1s
['hh:mm:ss', ONE_SECOND * 5], // 5s
['hh:mm:ss', ONE_SECOND * 10], // 10s
['hh:mm:ss', ONE_SECOND * 15], // 15s
['hh:mm:ss', ONE_SECOND * 30], // 30s
['hh:mm\nMM-dd', ONE_MINUTE], // 1m
['hh:mm\nMM-dd', ONE_MINUTE * 5], // 5m
['hh:mm\nMM-dd', ONE_MINUTE * 10], // 10m
['hh:mm\nMM-dd', ONE_MINUTE * 15], // 15m
['hh:mm\nMM-dd', ONE_MINUTE * 30], // 30m
['hh:mm\nMM-dd', ONE_HOUR], // 1h
['hh:mm\nMM-dd', ONE_HOUR * 2], // 2h
['hh:mm\nMM-dd', ONE_HOUR * 6], // 6h
['hh:mm\nMM-dd', ONE_HOUR * 12], // 12h
['MM-dd\nyyyy', ONE_DAY], // 1d
['MM-dd\nyyyy', ONE_DAY * 2], // 2d
['MM-dd\nyyyy', ONE_DAY * 3], // 3d
['MM-dd\nyyyy', ONE_DAY * 4], // 4d
['MM-dd\nyyyy', ONE_DAY * 5], // 5d
['MM-dd\nyyyy', ONE_DAY * 6], // 6d
['week', ONE_DAY * 7], // 7d
['MM-dd\nyyyy', ONE_DAY * 10], // 10d
['week', ONE_DAY * 14], // 2w
['week', ONE_DAY * 21], // 3w
['month', ONE_DAY * 31], // 1M
['week', ONE_DAY * 42], // 6w
['month', ONE_DAY * 62], // 2M
['week', ONE_DAY * 70], // 10w
['quarter', ONE_DAY * 95], // 3M
['month', ONE_DAY * 31 * 4], // 4M
['month', ONE_DAY * 31 * 5], // 5M
['half-year', ONE_DAY * 380 / 2], // 6M
['month', ONE_DAY * 31 * 8], // 8M
['month', ONE_DAY * 31 * 10], // 10M
['year', ONE_DAY * 380] // 1Y
];
/**
 * @param {module:echarts/model/Model}
 * @return {module:echarts/scale/Time}
 */

TimeScale.create = function (model) {
  return new TimeScale({
    useUTC: model.ecModel.get('useUTC')
  });
};

var _default = TimeScale;
module.exports = _default;

/***/ }),

/***/ "26e1":
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
var each = zrUtil.each;
var isObject = zrUtil.isObject;
var POSSIBLE_STYLES = ['areaStyle', 'lineStyle', 'nodeStyle', 'linkStyle', 'chordStyle', 'label', 'labelLine'];

function compatEC2ItemStyle(opt) {
  var itemStyleOpt = opt && opt.itemStyle;

  if (!itemStyleOpt) {
    return;
  }

  for (var i = 0, len = POSSIBLE_STYLES.length; i < len; i++) {
    var styleName = POSSIBLE_STYLES[i];
    var normalItemStyleOpt = itemStyleOpt.normal;
    var emphasisItemStyleOpt = itemStyleOpt.emphasis;

    if (normalItemStyleOpt && normalItemStyleOpt[styleName]) {
      opt[styleName] = opt[styleName] || {};

      if (!opt[styleName].normal) {
        opt[styleName].normal = normalItemStyleOpt[styleName];
      } else {
        zrUtil.merge(opt[styleName].normal, normalItemStyleOpt[styleName]);
      }

      normalItemStyleOpt[styleName] = null;
    }

    if (emphasisItemStyleOpt && emphasisItemStyleOpt[styleName]) {
      opt[styleName] = opt[styleName] || {};

      if (!opt[styleName].emphasis) {
        opt[styleName].emphasis = emphasisItemStyleOpt[styleName];
      } else {
        zrUtil.merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]);
      }

      emphasisItemStyleOpt[styleName] = null;
    }
  }
}

function convertNormalEmphasis(opt, optType, useExtend) {
  if (opt && opt[optType] && (opt[optType].normal || opt[optType].emphasis)) {
    var normalOpt = opt[optType].normal;
    var emphasisOpt = opt[optType].emphasis;

    if (normalOpt) {
      // Timeline controlStyle has other properties besides normal and emphasis
      if (useExtend) {
        opt[optType].normal = opt[optType].emphasis = null;
        zrUtil.defaults(opt[optType], normalOpt);
      } else {
        opt[optType] = normalOpt;
      }
    }

    if (emphasisOpt) {
      opt.emphasis = opt.emphasis || {};
      opt.emphasis[optType] = emphasisOpt;
    }
  }
}

function removeEC3NormalStatus(opt) {
  convertNormalEmphasis(opt, 'itemStyle');
  convertNormalEmphasis(opt, 'lineStyle');
  convertNormalEmphasis(opt, 'areaStyle');
  convertNormalEmphasis(opt, 'label');
  convertNormalEmphasis(opt, 'labelLine'); // treemap

  convertNormalEmphasis(opt, 'upperLabel'); // graph

  convertNormalEmphasis(opt, 'edgeLabel');
}

function compatTextStyle(opt, propName) {
  // Check whether is not object (string\null\undefined ...)
  var labelOptSingle = isObject(opt) && opt[propName];
  var textStyle = isObject(labelOptSingle) && labelOptSingle.textStyle;

  if (textStyle) {
    for (var i = 0, len = modelUtil.TEXT_STYLE_OPTIONS.length; i < len; i++) {
      var propName = modelUtil.TEXT_STYLE_OPTIONS[i];

      if (textStyle.hasOwnProperty(propName)) {
        labelOptSingle[propName] = textStyle[propName];
      }
    }
  }
}

function compatEC3CommonStyles(opt) {
  if (opt) {
    removeEC3NormalStatus(opt);
    compatTextStyle(opt, 'label');
    opt.emphasis && compatTextStyle(opt.emphasis, 'label');
  }
}

function processSeries(seriesOpt) {
  if (!isObject(seriesOpt)) {
    return;
  }

  compatEC2ItemStyle(seriesOpt);
  removeEC3NormalStatus(seriesOpt);
  compatTextStyle(seriesOpt, 'label'); // treemap

  compatTextStyle(seriesOpt, 'upperLabel'); // graph

  compatTextStyle(seriesOpt, 'edgeLabel');

  if (seriesOpt.emphasis) {
    compatTextStyle(seriesOpt.emphasis, 'label'); // treemap

    compatTextStyle(seriesOpt.emphasis, 'upperLabel'); // graph

    compatTextStyle(seriesOpt.emphasis, 'edgeLabel');
  }

  var markPoint = seriesOpt.markPoint;

  if (markPoint) {
    compatEC2ItemStyle(markPoint);
    compatEC3CommonStyles(markPoint);
  }

  var markLine = seriesOpt.markLine;

  if (markLine) {
    compatEC2ItemStyle(markLine);
    compatEC3CommonStyles(markLine);
  }

  var markArea = seriesOpt.markArea;

  if (markArea) {
    compatEC3CommonStyles(markArea);
  }

  var data = seriesOpt.data; // Break with ec3: if `setOption` again, there may be no `type` in option,
  // then the backward compat based on option type will not be performed.

  if (seriesOpt.type === 'graph') {
    data = data || seriesOpt.nodes;
    var edgeData = seriesOpt.links || seriesOpt.edges;

    if (edgeData && !zrUtil.isTypedArray(edgeData)) {
      for (var i = 0; i < edgeData.length; i++) {
        compatEC3CommonStyles(edgeData[i]);
      }
    }

    zrUtil.each(seriesOpt.categories, function (opt) {
      removeEC3NormalStatus(opt);
    });
  }

  if (data && !zrUtil.isTypedArray(data)) {
    for (var i = 0; i < data.length; i++) {
      compatEC3CommonStyles(data[i]);
    }
  } // mark point data


  var markPoint = seriesOpt.markPoint;

  if (markPoint && markPoint.data) {
    var mpData = markPoint.data;

    for (var i = 0; i < mpData.length; i++) {
      compatEC3CommonStyles(mpData[i]);
    }
  } // mark line data


  var markLine = seriesOpt.markLine;

  if (markLine && markLine.data) {
    var mlData = markLine.data;

    for (var i = 0; i < mlData.length; i++) {
      if (zrUtil.isArray(mlData[i])) {
        compatEC3CommonStyles(mlData[i][0]);
        compatEC3CommonStyles(mlData[i][1]);
      } else {
        compatEC3CommonStyles(mlData[i]);
      }
    }
  } // Series


  if (seriesOpt.type === 'gauge') {
    compatTextStyle(seriesOpt, 'axisLabel');
    compatTextStyle(seriesOpt, 'title');
    compatTextStyle(seriesOpt, 'detail');
  } else if (seriesOpt.type === 'treemap') {
    convertNormalEmphasis(seriesOpt.breadcrumb, 'itemStyle');
    zrUtil.each(seriesOpt.levels, function (opt) {
      removeEC3NormalStatus(opt);
    });
  } else if (seriesOpt.type === 'tree') {
    removeEC3NormalStatus(seriesOpt.leaves);
  } // sunburst starts from ec4, so it does not need to compat levels.

}

function toArr(o) {
  return zrUtil.isArray(o) ? o : o ? [o] : [];
}

function toObj(o) {
  return (zrUtil.isArray(o) ? o[0] : o) || {};
}

function _default(option, isTheme) {
  each(toArr(option.series), function (seriesOpt) {
    isObject(seriesOpt) && processSeries(seriesOpt);
  });
  var axes = ['xAxis', 'yAxis', 'radiusAxis', 'angleAxis', 'singleAxis', 'parallelAxis', 'radar'];
  isTheme && axes.push('valueAxis', 'categoryAxis', 'logAxis', 'timeAxis');
  each(axes, function (axisName) {
    each(toArr(option[axisName]), function (axisOpt) {
      if (axisOpt) {
        compatTextStyle(axisOpt, 'axisLabel');
        compatTextStyle(axisOpt.axisPointer, 'label');
      }
    });
  });
  each(toArr(option.parallel), function (parallelOpt) {
    var parallelAxisDefault = parallelOpt && parallelOpt.parallelAxisDefault;
    compatTextStyle(parallelAxisDefault, 'axisLabel');
    compatTextStyle(parallelAxisDefault && parallelAxisDefault.axisPointer, 'label');
  });
  each(toArr(option.calendar), function (calendarOpt) {
    convertNormalEmphasis(calendarOpt, 'itemStyle');
    compatTextStyle(calendarOpt, 'dayLabel');
    compatTextStyle(calendarOpt, 'monthLabel');
    compatTextStyle(calendarOpt, 'yearLabel');
  }); // radar.name.textStyle

  each(toArr(option.radar), function (radarOpt) {
    compatTextStyle(radarOpt, 'name');
  });
  each(toArr(option.geo), function (geoOpt) {
    if (isObject(geoOpt)) {
      compatEC3CommonStyles(geoOpt);
      each(toArr(geoOpt.regions), function (regionObj) {
        compatEC3CommonStyles(regionObj);
      });
    }
  });
  each(toArr(option.timeline), function (timelineOpt) {
    compatEC3CommonStyles(timelineOpt);
    convertNormalEmphasis(timelineOpt, 'label');
    convertNormalEmphasis(timelineOpt, 'itemStyle');
    convertNormalEmphasis(timelineOpt, 'controlStyle', true);
    var data = timelineOpt.data;
    zrUtil.isArray(data) && zrUtil.each(data, function (item) {
      if (zrUtil.isObject(item)) {
        convertNormalEmphasis(item, 'label');
        convertNormalEmphasis(item, 'itemStyle');
      }
    });
  });
  each(toArr(option.toolbox), function (toolboxOpt) {
    convertNormalEmphasis(toolboxOpt, 'iconStyle');
    each(toolboxOpt.feature, function (featureOpt) {
      convertNormalEmphasis(featureOpt, 'iconStyle');
    });
  });
  compatTextStyle(toObj(option.axisPointer), 'label');
  compatTextStyle(toObj(option.tooltip).axisPointer, 'label');
}

module.exports = _default;

/***/ }),

/***/ "282b":
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
// TODO Parse shadow style
// TODO Only shallow path support
function _default(properties) {
  // Normalize
  for (var i = 0; i < properties.length; i++) {
    if (!properties[i][1]) {
      properties[i][1] = properties[i][0];
    }
  }

  return function (model, excludes, includes) {
    var style = {};

    for (var i = 0; i < properties.length; i++) {
      var propName = properties[i][1];

      if (excludes && zrUtil.indexOf(excludes, propName) >= 0 || includes && zrUtil.indexOf(includes, propName) < 0) {
        continue;
      }

      var val = model.getShallow(propName);

      if (val != null) {
        style[properties[i][0]] = val;
      }
    }

    return style;
  };
}

module.exports = _default;

/***/ }),

/***/ "38a2":
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

var _dataProvider = __webpack_require__("2b17");

var retrieveRawValue = _dataProvider.retrieveRawValue;

var _format = __webpack_require__("eda2");

var getTooltipMarker = _format.getTooltipMarker;
var formatTpl = _format.formatTpl;

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
var DIMENSION_LABEL_REG = /\{@(.+?)\}/g; // PENDING A little ugly

var _default = {
  /**
   * Get params for formatter
   * @param {number} dataIndex
   * @param {string} [dataType]
   * @return {Object}
   */
  getDataParams: function (dataIndex, dataType) {
    var data = this.getData(dataType);
    var rawValue = this.getRawValue(dataIndex, dataType);
    var rawDataIndex = data.getRawIndex(dataIndex);
    var name = data.getName(dataIndex);
    var itemOpt = data.getRawDataItem(dataIndex);
    var color = data.getItemVisual(dataIndex, 'color');
    var borderColor = data.getItemVisual(dataIndex, 'borderColor');
    var tooltipModel = this.ecModel.getComponent('tooltip');
    var renderModeOption = tooltipModel && tooltipModel.get('renderMode');
    var renderMode = getTooltipRenderMode(renderModeOption);
    var mainType = this.mainType;
    var isSeries = mainType === 'series';
    var userOutput = data.userOutput;
    return {
      componentType: mainType,
      componentSubType: this.subType,
      componentIndex: this.componentIndex,
      seriesType: isSeries ? this.subType : null,
      seriesIndex: this.seriesIndex,
      seriesId: isSeries ? this.id : null,
      seriesName: isSeries ? this.name : null,
      name: name,
      dataIndex: rawDataIndex,
      data: itemOpt,
      dataType: dataType,
      value: rawValue,
      color: color,
      borderColor: borderColor,
      dimensionNames: userOutput ? userOutput.dimensionNames : null,
      encode: userOutput ? userOutput.encode : null,
      marker: getTooltipMarker({
        color: color,
        renderMode: renderMode
      }),
      // Param name list for mapping `a`, `b`, `c`, `d`, `e`
      $vars: ['seriesName', 'name', 'value']
    };
  },

  /**
   * Format label
   * @param {number} dataIndex
   * @param {string} [status='normal'] 'normal' or 'emphasis'
   * @param {string} [dataType]
   * @param {number} [dimIndex] Only used in some chart that
   *        use formatter in different dimensions, like radar.
   * @param {string} [labelProp='label']
   * @return {string} If not formatter, return null/undefined
   */
  getFormattedLabel: function (dataIndex, status, dataType, dimIndex, labelProp) {
    status = status || 'normal';
    var data = this.getData(dataType);
    var itemModel = data.getItemModel(dataIndex);
    var params = this.getDataParams(dataIndex, dataType);

    if (dimIndex != null && params.value instanceof Array) {
      params.value = params.value[dimIndex];
    }

    var formatter = itemModel.get(status === 'normal' ? [labelProp || 'label', 'formatter'] : [status, labelProp || 'label', 'formatter']);

    if (typeof formatter === 'function') {
      params.status = status;
      params.dimensionIndex = dimIndex;
      return formatter(params);
    } else if (typeof formatter === 'string') {
      var str = formatTpl(formatter, params); // Support 'aaa{@[3]}bbb{@product}ccc'.
      // Do not support '}' in dim name util have to.

      return str.replace(DIMENSION_LABEL_REG, function (origin, dim) {
        var len = dim.length;

        if (dim.charAt(0) === '[' && dim.charAt(len - 1) === ']') {
          dim = +dim.slice(1, len - 1); // Also: '[]' => 0
        }

        return retrieveRawValue(data, dataIndex, dim);
      });
    }
  },

  /**
   * Get raw value in option
   * @param {number} idx
   * @param {string} [dataType]
   * @return {Array|number|string}
   */
  getRawValue: function (idx, dataType) {
    return retrieveRawValue(this.getData(dataType), idx);
  },

  /**
   * Should be implemented.
   * @param {number} dataIndex
   * @param {boolean} [multipleSeries=false]
   * @param {number} [dataType]
   * @return {string} tooltip string
   */
  formatTooltip: function () {// Empty function
  }
};
module.exports = _default;

/***/ }),

/***/ "3901":
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

var makeStyleMapper = __webpack_require__("282b");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var getLineStyle = makeStyleMapper([['lineWidth', 'width'], ['stroke', 'color'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);
var _default = {
  getLineStyle: function (excludes) {
    var style = getLineStyle(this, excludes); // Always set lineDash whether dashed, otherwise we can not
    // erase the previous style when assigning to el.style.

    style.lineDash = this.getLineDash(style.lineWidth);
    return style;
  },
  getLineDash: function (lineWidth) {
    if (lineWidth == null) {
      lineWidth = 1;
    }

    var lineType = this.get('type');
    var dotSize = Math.max(lineWidth, 2);
    var dashSize = lineWidth * 4;
    return lineType === 'solid' || lineType == null ? // Use `false` but not `null` for the solid line here, because `null` might be
    // ignored when assigning to `el.style`. e.g., when setting `lineStyle.type` as
    // `'dashed'` and `emphasis.lineStyle.type` as `'solid'` in graph series, the
    // `lineDash` gotten form the latter one is not able to erase that from the former
    // one if using `null` here according to the emhpsis strategy in `util/graphic.js`.
    false : lineType === 'dashed' ? [dashSize, dashSize] : [dotSize, dotSize];
  }
};
module.exports = _default;

/***/ }),

/***/ "4319":
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

var env = __webpack_require__("22d1");

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var _clazz = __webpack_require__("625e");

var enableClassExtend = _clazz.enableClassExtend;
var enableClassCheck = _clazz.enableClassCheck;

var lineStyleMixin = __webpack_require__("3901");

var areaStyleMixin = __webpack_require__("9bdb");

var textStyleMixin = __webpack_require__("fe21");

var itemStyleMixin = __webpack_require__("551f");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * @module echarts/model/Model
 */
var mixin = zrUtil.mixin;
var inner = makeInner();
/**
 * @alias module:echarts/model/Model
 * @constructor
 * @param {Object} [option]
 * @param {module:echarts/model/Model} [parentModel]
 * @param {module:echarts/model/Global} [ecModel]
 */

function Model(option, parentModel, ecModel) {
  /**
   * @type {module:echarts/model/Model}
   * @readOnly
   */
  this.parentModel = parentModel;
  /**
   * @type {module:echarts/model/Global}
   * @readOnly
   */

  this.ecModel = ecModel;
  /**
   * @type {Object}
   * @protected
   */

  this.option = option; // Simple optimization
  // if (this.init) {
  //     if (arguments.length <= 4) {
  //         this.init(option, parentModel, ecModel, extraOpt);
  //     }
  //     else {
  //         this.init.apply(this, arguments);
  //     }
  // }
}

Model.prototype = {
  constructor: Model,

  /**
   * Model 的初始化函数
   * @param {Object} option
   */
  init: null,

  /**
   * 从新的 Option merge
   */
  mergeOption: function (option) {
    zrUtil.merge(this.option, option, true);
  },

  /**
   * @param {string|Array.<string>} path
   * @param {boolean} [ignoreParent=false]
   * @return {*}
   */
  get: function (path, ignoreParent) {
    if (path == null) {
      return this.option;
    }

    return doGet(this.option, this.parsePath(path), !ignoreParent && getParent(this, path));
  },

  /**
   * @param {string} key
   * @param {boolean} [ignoreParent=false]
   * @return {*}
   */
  getShallow: function (key, ignoreParent) {
    var option = this.option;
    var val = option == null ? option : option[key];
    var parentModel = !ignoreParent && getParent(this, key);

    if (val == null && parentModel) {
      val = parentModel.getShallow(key);
    }

    return val;
  },

  /**
   * @param {string|Array.<string>} [path]
   * @param {module:echarts/model/Model} [parentModel]
   * @return {module:echarts/model/Model}
   */
  getModel: function (path, parentModel) {
    var obj = path == null ? this.option : doGet(this.option, path = this.parsePath(path));
    var thisParentModel;
    parentModel = parentModel || (thisParentModel = getParent(this, path)) && thisParentModel.getModel(path);
    return new Model(obj, parentModel, this.ecModel);
  },

  /**
   * If model has option
   */
  isEmpty: function () {
    return this.option == null;
  },
  restoreData: function () {},
  // Pending
  clone: function () {
    var Ctor = this.constructor;
    return new Ctor(zrUtil.clone(this.option));
  },
  setReadOnly: function (properties) {// clazzUtil.setReadOnly(this, properties);
  },
  // If path is null/undefined, return null/undefined.
  parsePath: function (path) {
    if (typeof path === 'string') {
      path = path.split('.');
    }

    return path;
  },

  /**
   * @param {Function} getParentMethod
   *        param {Array.<string>|string} path
   *        return {module:echarts/model/Model}
   */
  customizeGetParent: function (getParentMethod) {
    inner(this).getParent = getParentMethod;
  },
  isAnimationEnabled: function () {
    if (!env.node) {
      if (this.option.animation != null) {
        return !!this.option.animation;
      } else if (this.parentModel) {
        return this.parentModel.isAnimationEnabled();
      }
    }
  }
};

function doGet(obj, pathArr, parentModel) {
  for (var i = 0; i < pathArr.length; i++) {
    // Ignore empty
    if (!pathArr[i]) {
      continue;
    } // obj could be number/string/... (like 0)


    obj = obj && typeof obj === 'object' ? obj[pathArr[i]] : null;

    if (obj == null) {
      break;
    }
  }

  if (obj == null && parentModel) {
    obj = parentModel.get(pathArr);
  }

  return obj;
} // `path` can be null/undefined


function getParent(model, path) {
  var getParentMethod = inner(model).getParent;
  return getParentMethod ? getParentMethod.call(model, path) : model.parentModel;
} // Enable Model.extend.


enableClassExtend(Model);
enableClassCheck(Model);
mixin(Model, lineStyleMixin);
mixin(Model, areaStyleMixin);
mixin(Model, textStyleMixin);
mixin(Model, itemStyleMixin);
var _default = Model;
module.exports = _default;

/***/ }),

/***/ "4f85":
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

var env = __webpack_require__("22d1");

var _format = __webpack_require__("eda2");

var formatTime = _format.formatTime;
var encodeHTML = _format.encodeHTML;
var addCommas = _format.addCommas;
var getTooltipMarker = _format.getTooltipMarker;

var modelUtil = __webpack_require__("e0d3");

var ComponentModel = __webpack_require__("6cb7");

var colorPaletteMixin = __webpack_require__("e47b");

var dataFormatMixin = __webpack_require__("38a2");

var _layout = __webpack_require__("f934");

var getLayoutParams = _layout.getLayoutParams;
var mergeLayoutParam = _layout.mergeLayoutParam;

var _task = __webpack_require__("f47d");

var createTask = _task.createTask;

var _sourceHelper = __webpack_require__("0f99");

var prepareSource = _sourceHelper.prepareSource;
var getSource = _sourceHelper.getSource;

var _dataProvider = __webpack_require__("2b17");

var retrieveRawValue = _dataProvider.retrieveRawValue;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var inner = modelUtil.makeInner();
var SeriesModel = ComponentModel.extend({
  type: 'series.__base__',

  /**
   * @readOnly
   */
  seriesIndex: 0,
  // coodinateSystem will be injected in the echarts/CoordinateSystem
  coordinateSystem: null,

  /**
   * @type {Object}
   * @protected
   */
  defaultOption: null,

  /**
   * legend visual provider to the legend component
   * @type {Object}
   */
  // PENDING
  legendVisualProvider: null,

  /**
   * Access path of color for visual
   */
  visualColorAccessPath: 'itemStyle.color',

  /**
   * Access path of borderColor for visual
   */
  visualBorderColorAccessPath: 'itemStyle.borderColor',

  /**
   * Support merge layout params.
   * Only support 'box' now (left/right/top/bottom/width/height).
   * @type {string|Object} Object can be {ignoreSize: true}
   * @readOnly
   */
  layoutMode: null,
  init: function (option, parentModel, ecModel, extraOpt) {
    /**
     * @type {number}
     * @readOnly
     */
    this.seriesIndex = this.componentIndex;
    this.dataTask = createTask({
      count: dataTaskCount,
      reset: dataTaskReset
    });
    this.dataTask.context = {
      model: this
    };
    this.mergeDefaultAndTheme(option, ecModel);
    prepareSource(this);
    var data = this.getInitialData(option, ecModel);
    wrapData(data, this);
    this.dataTask.context.data = data;

    /**
     * @type {module:echarts/data/List|module:echarts/data/Tree|module:echarts/data/Graph}
     * @private
     */
    inner(this).dataBeforeProcessed = data; // If we reverse the order (make data firstly, and then make
    // dataBeforeProcessed by cloneShallow), cloneShallow will
    // cause data.graph.data !== data when using
    // module:echarts/data/Graph or module:echarts/data/Tree.
    // See module:echarts/data/helper/linkList
    // Theoretically, it is unreasonable to call `seriesModel.getData()` in the model
    // init or merge stage, because the data can be restored. So we do not `restoreData`
    // and `setData` here, which forbids calling `seriesModel.getData()` in this stage.
    // Call `seriesModel.getRawData()` instead.
    // this.restoreData();

    autoSeriesName(this);
  },

  /**
   * Util for merge default and theme to option
   * @param  {Object} option
   * @param  {module:echarts/model/Global} ecModel
   */
  mergeDefaultAndTheme: function (option, ecModel) {
    var layoutMode = this.layoutMode;
    var inputPositionParams = layoutMode ? getLayoutParams(option) : {}; // Backward compat: using subType on theme.
    // But if name duplicate between series subType
    // (for example: parallel) add component mainType,
    // add suffix 'Series'.

    var themeSubType = this.subType;

    if (ComponentModel.hasClass(themeSubType)) {
      themeSubType += 'Series';
    }

    zrUtil.merge(option, ecModel.getTheme().get(this.subType));
    zrUtil.merge(option, this.getDefaultOption()); // Default label emphasis `show`

    modelUtil.defaultEmphasis(option, 'label', ['show']);
    this.fillDataTextStyle(option.data);

    if (layoutMode) {
      mergeLayoutParam(option, inputPositionParams, layoutMode);
    }
  },
  mergeOption: function (newSeriesOption, ecModel) {
    // this.settingTask.dirty();
    newSeriesOption = zrUtil.merge(this.option, newSeriesOption, true);
    this.fillDataTextStyle(newSeriesOption.data);
    var layoutMode = this.layoutMode;

    if (layoutMode) {
      mergeLayoutParam(this.option, newSeriesOption, layoutMode);
    }

    prepareSource(this);
    var data = this.getInitialData(newSeriesOption, ecModel);
    wrapData(data, this);
    this.dataTask.dirty();
    this.dataTask.context.data = data;
    inner(this).dataBeforeProcessed = data;
    autoSeriesName(this);
  },
  fillDataTextStyle: function (data) {
    // Default data label emphasis `show`
    // FIXME Tree structure data ?
    // FIXME Performance ?
    if (data && !zrUtil.isTypedArray(data)) {
      var props = ['show'];

      for (var i = 0; i < data.length; i++) {
        if (data[i] && data[i].label) {
          modelUtil.defaultEmphasis(data[i], 'label', props);
        }
      }
    }
  },

  /**
   * Init a data structure from data related option in series
   * Must be overwritten
   */
  getInitialData: function () {},

  /**
   * Append data to list
   * @param {Object} params
   * @param {Array|TypedArray} params.data
   */
  appendData: function (params) {
    // FIXME ???
    // (1) If data from dataset, forbidden append.
    // (2) support append data of dataset.
    var data = this.getRawData();
    data.appendData(params.data);
  },

  /**
   * Consider some method like `filter`, `map` need make new data,
   * We should make sure that `seriesModel.getData()` get correct
   * data in the stream procedure. So we fetch data from upstream
   * each time `task.perform` called.
   * @param {string} [dataType]
   * @return {module:echarts/data/List}
   */
  getData: function (dataType) {
    var task = getCurrentTask(this);

    if (task) {
      var data = task.context.data;
      return dataType == null ? data : data.getLinkedData(dataType);
    } else {
      // When series is not alive (that may happen when click toolbox
      // restore or setOption with not merge mode), series data may
      // be still need to judge animation or something when graphic
      // elements want to know whether fade out.
      return inner(this).data;
    }
  },

  /**
   * @param {module:echarts/data/List} data
   */
  setData: function (data) {
    var task = getCurrentTask(this);

    if (task) {
      var context = task.context; // Consider case: filter, data sample.

      if (context.data !== data && task.modifyOutputEnd) {
        task.setOutputEnd(data.count());
      }

      context.outputData = data; // Caution: setData should update context.data,
      // Because getData may be called multiply in a
      // single stage and expect to get the data just
      // set. (For example, AxisProxy, x y both call
      // getData and setDate sequentially).
      // So the context.data should be fetched from
      // upstream each time when a stage starts to be
      // performed.

      if (task !== this.dataTask) {
        context.data = data;
      }
    }

    inner(this).data = data;
  },

  /**
   * @see {module:echarts/data/helper/sourceHelper#getSource}
   * @return {module:echarts/data/Source} source
   */
  getSource: function () {
    return getSource(this);
  },

  /**
   * Get data before processed
   * @return {module:echarts/data/List}
   */
  getRawData: function () {
    return inner(this).dataBeforeProcessed;
  },

  /**
   * Get base axis if has coordinate system and has axis.
   * By default use coordSys.getBaseAxis();
   * Can be overrided for some chart.
   * @return {type} description
   */
  getBaseAxis: function () {
    var coordSys = this.coordinateSystem;
    return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
  },
  // FIXME

  /**
   * Default tooltip formatter
   *
   * @param {number} dataIndex
   * @param {boolean} [multipleSeries=false]
   * @param {number} [dataType]
   * @param {string} [renderMode='html'] valid values: 'html' and 'richText'.
   *                                     'html' is used for rendering tooltip in extra DOM form, and the result
   *                                     string is used as DOM HTML content.
   *                                     'richText' is used for rendering tooltip in rich text form, for those where
   *                                     DOM operation is not supported.
   * @return {Object} formatted tooltip with `html` and `markers`
   */
  formatTooltip: function (dataIndex, multipleSeries, dataType, renderMode) {
    var series = this;
    renderMode = renderMode || 'html';
    var newLine = renderMode === 'html' ? '<br/>' : '\n';
    var isRichText = renderMode === 'richText';
    var markers = {};
    var markerId = 0;

    function formatArrayValue(value) {
      // ??? TODO refactor these logic.
      // check: category-no-encode-has-axis-data in dataset.html
      var vertially = zrUtil.reduce(value, function (vertially, val, idx) {
        var dimItem = data.getDimensionInfo(idx);
        return vertially |= dimItem && dimItem.tooltip !== false && dimItem.displayName != null;
      }, 0);
      var result = [];
      tooltipDims.length ? zrUtil.each(tooltipDims, function (dim) {
        setEachItem(retrieveRawValue(data, dataIndex, dim), dim);
      }) // By default, all dims is used on tooltip.
      : zrUtil.each(value, setEachItem);

      function setEachItem(val, dim) {
        var dimInfo = data.getDimensionInfo(dim); // If `dimInfo.tooltip` is not set, show tooltip.

        if (!dimInfo || dimInfo.otherDims.tooltip === false) {
          return;
        }

        var dimType = dimInfo.type;
        var markName = 'sub' + series.seriesIndex + 'at' + markerId;
        var dimHead = getTooltipMarker({
          color: color,
          type: 'subItem',
          renderMode: renderMode,
          markerId: markName
        });
        var dimHeadStr = typeof dimHead === 'string' ? dimHead : dimHead.content;
        var valStr = (vertially ? dimHeadStr + encodeHTML(dimInfo.displayName || '-') + ': ' : '') + // FIXME should not format time for raw data?
        encodeHTML(dimType === 'ordinal' ? val + '' : dimType === 'time' ? multipleSeries ? '' : formatTime('yyyy/MM/dd hh:mm:ss', val) : addCommas(val));
        valStr && result.push(valStr);

        if (isRichText) {
          markers[markName] = color;
          ++markerId;
        }
      }

      var newLine = vertially ? isRichText ? '\n' : '<br/>' : '';
      var content = newLine + result.join(newLine || ', ');
      return {
        renderMode: renderMode,
        content: content,
        style: markers
      };
    }

    function formatSingleValue(val) {
      // return encodeHTML(addCommas(val));
      return {
        renderMode: renderMode,
        content: encodeHTML(addCommas(val)),
        style: markers
      };
    }

    var data = this.getData();
    var tooltipDims = data.mapDimension('defaultedTooltip', true);
    var tooltipDimLen = tooltipDims.length;
    var value = this.getRawValue(dataIndex);
    var isValueArr = zrUtil.isArray(value);
    var color = data.getItemVisual(dataIndex, 'color');

    if (zrUtil.isObject(color) && color.colorStops) {
      color = (color.colorStops[0] || {}).color;
    }

    color = color || 'transparent'; // Complicated rule for pretty tooltip.

    var formattedValue = tooltipDimLen > 1 || isValueArr && !tooltipDimLen ? formatArrayValue(value) : tooltipDimLen ? formatSingleValue(retrieveRawValue(data, dataIndex, tooltipDims[0])) : formatSingleValue(isValueArr ? value[0] : value);
    var content = formattedValue.content;
    var markName = series.seriesIndex + 'at' + markerId;
    var colorEl = getTooltipMarker({
      color: color,
      type: 'item',
      renderMode: renderMode,
      markerId: markName
    });
    markers[markName] = color;
    ++markerId;
    var name = data.getName(dataIndex);
    var seriesName = this.name;

    if (!modelUtil.isNameSpecified(this)) {
      seriesName = '';
    }

    seriesName = seriesName ? encodeHTML(seriesName) + (!multipleSeries ? newLine : ': ') : '';
    var colorStr = typeof colorEl === 'string' ? colorEl : colorEl.content;
    var html = !multipleSeries ? seriesName + colorStr + (name ? encodeHTML(name) + ': ' + content : content) : colorStr + seriesName + content;
    return {
      html: html,
      markers: markers
    };
  },

  /**
   * @return {boolean}
   */
  isAnimationEnabled: function () {
    if (env.node) {
      return false;
    }

    var animationEnabled = this.getShallow('animation');

    if (animationEnabled) {
      if (this.getData().count() > this.getShallow('animationThreshold')) {
        animationEnabled = false;
      }
    }

    return animationEnabled;
  },
  restoreData: function () {
    this.dataTask.dirty();
  },
  getColorFromPalette: function (name, scope, requestColorNum) {
    var ecModel = this.ecModel; // PENDING

    var color = colorPaletteMixin.getColorFromPalette.call(this, name, scope, requestColorNum);

    if (!color) {
      color = ecModel.getColorFromPalette(name, scope, requestColorNum);
    }

    return color;
  },

  /**
   * Use `data.mapDimension(coordDim, true)` instead.
   * @deprecated
   */
  coordDimToDataDim: function (coordDim) {
    return this.getRawData().mapDimension(coordDim, true);
  },

  /**
   * Get progressive rendering count each step
   * @return {number}
   */
  getProgressive: function () {
    return this.get('progressive');
  },

  /**
   * Get progressive rendering count each step
   * @return {number}
   */
  getProgressiveThreshold: function () {
    return this.get('progressiveThreshold');
  },

  /**
   * Get data indices for show tooltip content. See tooltip.
   * @abstract
   * @param {Array.<string>|string} dim
   * @param {Array.<number>} value
   * @param {module:echarts/coord/single/SingleAxis} baseAxis
   * @return {Object} {dataIndices, nestestValue}.
   */
  getAxisTooltipData: null,

  /**
   * See tooltip.
   * @abstract
   * @param {number} dataIndex
   * @return {Array.<number>} Point of tooltip. null/undefined can be returned.
   */
  getTooltipPosition: null,

  /**
   * @see {module:echarts/stream/Scheduler}
   */
  pipeTask: null,

  /**
   * Convinient for override in extended class.
   * @protected
   * @type {Function}
   */
  preventIncremental: null,

  /**
   * @public
   * @readOnly
   * @type {Object}
   */
  pipelineContext: null
});
zrUtil.mixin(SeriesModel, dataFormatMixin);
zrUtil.mixin(SeriesModel, colorPaletteMixin);
/**
 * MUST be called after `prepareSource` called
 * Here we need to make auto series, especially for auto legend. But we
 * do not modify series.name in option to avoid side effects.
 */

function autoSeriesName(seriesModel) {
  // User specified name has higher priority, otherwise it may cause
  // series can not be queried unexpectedly.
  var name = seriesModel.name;

  if (!modelUtil.isNameSpecified(seriesModel)) {
    seriesModel.name = getSeriesAutoName(seriesModel) || name;
  }
}

function getSeriesAutoName(seriesModel) {
  var data = seriesModel.getRawData();
  var dataDims = data.mapDimension('seriesName', true);
  var nameArr = [];
  zrUtil.each(dataDims, function (dataDim) {
    var dimInfo = data.getDimensionInfo(dataDim);
    dimInfo.displayName && nameArr.push(dimInfo.displayName);
  });
  return nameArr.join(' ');
}

function dataTaskCount(context) {
  return context.model.getRawData().count();
}

function dataTaskReset(context) {
  var seriesModel = context.model;
  seriesModel.setData(seriesModel.getRawData().cloneShallow());
  return dataTaskProgress;
}

function dataTaskProgress(param, context) {
  // Avoid repead cloneShallow when data just created in reset.
  if (param.end > context.outputData.count()) {
    context.model.getRawData().cloneShallow(context.outputData);
  }
} // TODO refactor


function wrapData(data, seriesModel) {
  zrUtil.each(data.CHANGABLE_METHODS, function (methodName) {
    data.wrapMethod(methodName, zrUtil.curry(onDataSelfChange, seriesModel));
  });
}

function onDataSelfChange(seriesModel) {
  var task = getCurrentTask(seriesModel);

  if (task) {
    // Consider case: filter, selectRange
    task.setOutputEnd(this.count());
  }
}

function getCurrentTask(seriesModel) {
  var scheduler = (seriesModel.ecModel || {}).scheduler;
  var pipeline = scheduler && scheduler.getPipeline(seriesModel.uid);

  if (pipeline) {
    // When pipline finished, the currrentTask keep the last
    // task (renderTask).
    var task = pipeline.currentTask;

    if (task) {
      var agentStubMap = task.agentStubMap;

      if (agentStubMap) {
        task = agentStubMap.get(seriesModel.uid);
      }
    }

    return task;
  }
}

var _default = SeriesModel;
module.exports = _default;

/***/ }),

/***/ "551f":
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

var makeStyleMapper = __webpack_require__("282b");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var getItemStyle = makeStyleMapper([['fill', 'color'], ['stroke', 'borderColor'], ['lineWidth', 'borderWidth'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor'], ['textPosition'], ['textAlign']]);
var _default = {
  getItemStyle: function (excludes, includes) {
    var style = getItemStyle(this, excludes, includes);
    var lineDash = this.getBorderLineDash();
    lineDash && (style.lineDash = lineDash);
    return style;
  },
  getBorderLineDash: function () {
    var lineType = this.get('borderType');
    return lineType === 'solid' || lineType == null ? null : lineType === 'dashed' ? [5, 5] : [1, 1];
  }
};
module.exports = _default;

/***/ }),

/***/ "6cb7":
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

var Model = __webpack_require__("4319");

var componentUtil = __webpack_require__("8918");

var _clazz = __webpack_require__("625e");

var enableClassManagement = _clazz.enableClassManagement;
var parseClassType = _clazz.parseClassType;

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;

var layout = __webpack_require__("f934");

var boxLayoutMixin = __webpack_require__("de1c");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Component model
 *
 * @module echarts/model/Component
 */
var inner = makeInner();
/**
 * @alias module:echarts/model/Component
 * @constructor
 * @param {Object} option
 * @param {module:echarts/model/Model} parentModel
 * @param {module:echarts/model/Model} ecModel
 */

var ComponentModel = Model.extend({
  type: 'component',

  /**
   * @readOnly
   * @type {string}
   */
  id: '',

  /**
   * Because simplified concept is probably better, series.name (or component.name)
   * has been having too many resposibilities:
   * (1) Generating id (which requires name in option should not be modified).
   * (2) As an index to mapping series when merging option or calling API (a name
   * can refer to more then one components, which is convinient is some case).
   * (3) Display.
   * @readOnly
   */
  name: '',

  /**
   * @readOnly
   * @type {string}
   */
  mainType: '',

  /**
   * @readOnly
   * @type {string}
   */
  subType: '',

  /**
   * @readOnly
   * @type {number}
   */
  componentIndex: 0,

  /**
   * @type {Object}
   * @protected
   */
  defaultOption: null,

  /**
   * @type {module:echarts/model/Global}
   * @readOnly
   */
  ecModel: null,

  /**
   * key: componentType
   * value:  Component model list, can not be null.
   * @type {Object.<string, Array.<module:echarts/model/Model>>}
   * @readOnly
   */
  dependentModels: [],

  /**
   * @type {string}
   * @readOnly
   */
  uid: null,

  /**
   * Support merge layout params.
   * Only support 'box' now (left/right/top/bottom/width/height).
   * @type {string|Object} Object can be {ignoreSize: true}
   * @readOnly
   */
  layoutMode: null,
  $constructor: function (option, parentModel, ecModel, extraOpt) {
    Model.call(this, option, parentModel, ecModel, extraOpt);
    this.uid = componentUtil.getUID('ec_cpt_model');
  },
  init: function (option, parentModel, ecModel, extraOpt) {
    this.mergeDefaultAndTheme(option, ecModel);
  },
  mergeDefaultAndTheme: function (option, ecModel) {
    var layoutMode = this.layoutMode;
    var inputPositionParams = layoutMode ? layout.getLayoutParams(option) : {};
    var themeModel = ecModel.getTheme();
    zrUtil.merge(option, themeModel.get(this.mainType));
    zrUtil.merge(option, this.getDefaultOption());

    if (layoutMode) {
      layout.mergeLayoutParam(option, inputPositionParams, layoutMode);
    }
  },
  mergeOption: function (option, extraOpt) {
    zrUtil.merge(this.option, option, true);
    var layoutMode = this.layoutMode;

    if (layoutMode) {
      layout.mergeLayoutParam(this.option, option, layoutMode);
    }
  },
  // Hooker after init or mergeOption
  optionUpdated: function (newCptOption, isInit) {},
  getDefaultOption: function () {
    var fields = inner(this);

    if (!fields.defaultOption) {
      var optList = [];
      var Class = this.constructor;

      while (Class) {
        var opt = Class.prototype.defaultOption;
        opt && optList.push(opt);
        Class = Class.superClass;
      }

      var defaultOption = {};

      for (var i = optList.length - 1; i >= 0; i--) {
        defaultOption = zrUtil.merge(defaultOption, optList[i], true);
      }

      fields.defaultOption = defaultOption;
    }

    return fields.defaultOption;
  },
  getReferringComponents: function (mainType) {
    return this.ecModel.queryComponents({
      mainType: mainType,
      index: this.get(mainType + 'Index', true),
      id: this.get(mainType + 'Id', true)
    });
  }
}); // Reset ComponentModel.extend, add preConstruct.
// clazzUtil.enableClassExtend(
//     ComponentModel,
//     function (option, parentModel, ecModel, extraOpt) {
//         // Set dependentModels, componentIndex, name, id, mainType, subType.
//         zrUtil.extend(this, extraOpt);
//         this.uid = componentUtil.getUID('componentModel');
//         // this.setReadOnly([
//         //     'type', 'id', 'uid', 'name', 'mainType', 'subType',
//         //     'dependentModels', 'componentIndex'
//         // ]);
//     }
// );
// Add capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.

enableClassManagement(ComponentModel, {
  registerWhenExtend: true
});
componentUtil.enableSubTypeDefaulter(ComponentModel); // Add capability of ComponentModel.topologicalTravel.

componentUtil.enableTopologicalTravel(ComponentModel, getDependencies);

function getDependencies(componentType) {
  var deps = [];
  zrUtil.each(ComponentModel.getClassesByMainType(componentType), function (Clazz) {
    deps = deps.concat(Clazz.prototype.dependencies || []);
  }); // Ensure main type.

  deps = zrUtil.map(deps, function (type) {
    return parseClassType(type).main;
  }); // Hack dataset for convenience.

  if (componentType !== 'dataset' && zrUtil.indexOf(deps, 'dataset') <= 0) {
    deps.unshift('dataset');
  }

  return deps;
}

zrUtil.mixin(ComponentModel, boxLayoutMixin);
var _default = ComponentModel;
module.exports = _default;

/***/ }),

/***/ "7e63":
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
var filter = _util.filter;
var map = _util.map;
var isArray = _util.isArray;
var indexOf = _util.indexOf;
var isObject = _util.isObject;
var isString = _util.isString;
var createHashMap = _util.createHashMap;
var assert = _util.assert;
var clone = _util.clone;
var merge = _util.merge;
var extend = _util.extend;
var mixin = _util.mixin;

var modelUtil = __webpack_require__("e0d3");

var Model = __webpack_require__("4319");

var ComponentModel = __webpack_require__("6cb7");

var globalDefault = __webpack_require__("8971");

var colorPaletteMixin = __webpack_require__("e47b");

var _sourceHelper = __webpack_require__("0f99");

var resetSourceDefaulter = _sourceHelper.resetSourceDefaulter;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * ECharts global model
 *
 * @module {echarts/model/Global}
 */

/**
 * Caution: If the mechanism should be changed some day, these cases
 * should be considered:
 *
 * (1) In `merge option` mode, if using the same option to call `setOption`
 * many times, the result should be the same (try our best to ensure that).
 * (2) In `merge option` mode, if a component has no id/name specified, it
 * will be merged by index, and the result sequence of the components is
 * consistent to the original sequence.
 * (3) `reset` feature (in toolbox). Find detailed info in comments about
 * `mergeOption` in module:echarts/model/OptionManager.
 */
var OPTION_INNER_KEY = '\0_ec_inner';
/**
 * @alias module:echarts/model/Global
 *
 * @param {Object} option
 * @param {module:echarts/model/Model} parentModel
 * @param {Object} theme
 */

var GlobalModel = Model.extend({
  init: function (option, parentModel, theme, optionManager) {
    theme = theme || {};
    this.option = null; // Mark as not initialized.

    /**
     * @type {module:echarts/model/Model}
     * @private
     */

    this._theme = new Model(theme);
    /**
     * @type {module:echarts/model/OptionManager}
     */

    this._optionManager = optionManager;
  },
  setOption: function (option, optionPreprocessorFuncs) {
    assert(!(OPTION_INNER_KEY in option), 'please use chart.getOption()');

    this._optionManager.setOption(option, optionPreprocessorFuncs);

    this.resetOption(null);
  },

  /**
   * @param {string} type null/undefined: reset all.
   *                      'recreate': force recreate all.
   *                      'timeline': only reset timeline option
   *                      'media': only reset media query option
   * @return {boolean} Whether option changed.
   */
  resetOption: function (type) {
    var optionChanged = false;
    var optionManager = this._optionManager;

    if (!type || type === 'recreate') {
      var baseOption = optionManager.mountOption(type === 'recreate');

      if (!this.option || type === 'recreate') {
        initBase.call(this, baseOption);
      } else {
        this.restoreData();
        this.mergeOption(baseOption);
      }

      optionChanged = true;
    }

    if (type === 'timeline' || type === 'media') {
      this.restoreData();
    }

    if (!type || type === 'recreate' || type === 'timeline') {
      var timelineOption = optionManager.getTimelineOption(this);
      timelineOption && (this.mergeOption(timelineOption), optionChanged = true);
    }

    if (!type || type === 'recreate' || type === 'media') {
      var mediaOptions = optionManager.getMediaOption(this, this._api);

      if (mediaOptions.length) {
        each(mediaOptions, function (mediaOption) {
          this.mergeOption(mediaOption, optionChanged = true);
        }, this);
      }
    }

    return optionChanged;
  },

  /**
   * @protected
   */
  mergeOption: function (newOption) {
    var option = this.option;
    var componentsMap = this._componentsMap;
    var newCptTypes = [];
    resetSourceDefaulter(this); // If no component class, merge directly.
    // For example: color, animaiton options, etc.

    each(newOption, function (componentOption, mainType) {
      if (componentOption == null) {
        return;
      }

      if (!ComponentModel.hasClass(mainType)) {
        // globalSettingTask.dirty();
        option[mainType] = option[mainType] == null ? clone(componentOption) : merge(option[mainType], componentOption, true);
      } else if (mainType) {
        newCptTypes.push(mainType);
      }
    });
    ComponentModel.topologicalTravel(newCptTypes, ComponentModel.getAllClassMainTypes(), visitComponent, this);

    function visitComponent(mainType, dependencies) {
      var newCptOptionList = modelUtil.normalizeToArray(newOption[mainType]);
      var mapResult = modelUtil.mappingToExists(componentsMap.get(mainType), newCptOptionList);
      modelUtil.makeIdAndName(mapResult); // Set mainType and complete subType.

      each(mapResult, function (item, index) {
        var opt = item.option;

        if (isObject(opt)) {
          item.keyInfo.mainType = mainType;
          item.keyInfo.subType = determineSubType(mainType, opt, item.exist);
        }
      });
      var dependentModels = getComponentsByTypes(componentsMap, dependencies);
      option[mainType] = [];
      componentsMap.set(mainType, []);
      each(mapResult, function (resultItem, index) {
        var componentModel = resultItem.exist;
        var newCptOption = resultItem.option;
        assert(isObject(newCptOption) || componentModel, 'Empty component definition'); // Consider where is no new option and should be merged using {},
        // see removeEdgeAndAdd in topologicalTravel and
        // ComponentModel.getAllClassMainTypes.

        if (!newCptOption) {
          componentModel.mergeOption({}, this);
          componentModel.optionUpdated({}, false);
        } else {
          var ComponentModelClass = ComponentModel.getClass(mainType, resultItem.keyInfo.subType, true);

          if (componentModel && componentModel.constructor === ComponentModelClass) {
            componentModel.name = resultItem.keyInfo.name; // componentModel.settingTask && componentModel.settingTask.dirty();

            componentModel.mergeOption(newCptOption, this);
            componentModel.optionUpdated(newCptOption, false);
          } else {
            // PENDING Global as parent ?
            var extraOpt = extend({
              dependentModels: dependentModels,
              componentIndex: index
            }, resultItem.keyInfo);
            componentModel = new ComponentModelClass(newCptOption, this, this, extraOpt);
            extend(componentModel, extraOpt);
            componentModel.init(newCptOption, this, this, extraOpt); // Call optionUpdated after init.
            // newCptOption has been used as componentModel.option
            // and may be merged with theme and default, so pass null
            // to avoid confusion.

            componentModel.optionUpdated(null, true);
          }
        }

        componentsMap.get(mainType)[index] = componentModel;
        option[mainType][index] = componentModel.option;
      }, this); // Backup series for filtering.

      if (mainType === 'series') {
        createSeriesIndices(this, componentsMap.get('series'));
      }
    }

    this._seriesIndicesMap = createHashMap(this._seriesIndices = this._seriesIndices || []);
  },

  /**
   * Get option for output (cloned option and inner info removed)
   * @public
   * @return {Object}
   */
  getOption: function () {
    var option = clone(this.option);
    each(option, function (opts, mainType) {
      if (ComponentModel.hasClass(mainType)) {
        var opts = modelUtil.normalizeToArray(opts);

        for (var i = opts.length - 1; i >= 0; i--) {
          // Remove options with inner id.
          if (modelUtil.isIdInner(opts[i])) {
            opts.splice(i, 1);
          }
        }

        option[mainType] = opts;
      }
    });
    delete option[OPTION_INNER_KEY];
    return option;
  },

  /**
   * @return {module:echarts/model/Model}
   */
  getTheme: function () {
    return this._theme;
  },

  /**
   * @param {string} mainType
   * @param {number} [idx=0]
   * @return {module:echarts/model/Component}
   */
  getComponent: function (mainType, idx) {
    var list = this._componentsMap.get(mainType);

    if (list) {
      return list[idx || 0];
    }
  },

  /**
   * If none of index and id and name used, return all components with mainType.
   * @param {Object} condition
   * @param {string} condition.mainType
   * @param {string} [condition.subType] If ignore, only query by mainType
   * @param {number|Array.<number>} [condition.index] Either input index or id or name.
   * @param {string|Array.<string>} [condition.id] Either input index or id or name.
   * @param {string|Array.<string>} [condition.name] Either input index or id or name.
   * @return {Array.<module:echarts/model/Component>}
   */
  queryComponents: function (condition) {
    var mainType = condition.mainType;

    if (!mainType) {
      return [];
    }

    var index = condition.index;
    var id = condition.id;
    var name = condition.name;

    var cpts = this._componentsMap.get(mainType);

    if (!cpts || !cpts.length) {
      return [];
    }

    var result;

    if (index != null) {
      if (!isArray(index)) {
        index = [index];
      }

      result = filter(map(index, function (idx) {
        return cpts[idx];
      }), function (val) {
        return !!val;
      });
    } else if (id != null) {
      var isIdArray = isArray(id);
      result = filter(cpts, function (cpt) {
        return isIdArray && indexOf(id, cpt.id) >= 0 || !isIdArray && cpt.id === id;
      });
    } else if (name != null) {
      var isNameArray = isArray(name);
      result = filter(cpts, function (cpt) {
        return isNameArray && indexOf(name, cpt.name) >= 0 || !isNameArray && cpt.name === name;
      });
    } else {
      // Return all components with mainType
      result = cpts.slice();
    }

    return filterBySubType(result, condition);
  },

  /**
   * The interface is different from queryComponents,
   * which is convenient for inner usage.
   *
   * @usage
   * var result = findComponents(
   *     {mainType: 'dataZoom', query: {dataZoomId: 'abc'}}
   * );
   * var result = findComponents(
   *     {mainType: 'series', subType: 'pie', query: {seriesName: 'uio'}}
   * );
   * var result = findComponents(
   *     {mainType: 'series',
   *     filter: function (model, index) {...}}
   * );
   * // result like [component0, componnet1, ...]
   *
   * @param {Object} condition
   * @param {string} condition.mainType Mandatory.
   * @param {string} [condition.subType] Optional.
   * @param {Object} [condition.query] like {xxxIndex, xxxId, xxxName},
   *        where xxx is mainType.
   *        If query attribute is null/undefined or has no index/id/name,
   *        do not filtering by query conditions, which is convenient for
   *        no-payload situations or when target of action is global.
   * @param {Function} [condition.filter] parameter: component, return boolean.
   * @return {Array.<module:echarts/model/Component>}
   */
  findComponents: function (condition) {
    var query = condition.query;
    var mainType = condition.mainType;
    var queryCond = getQueryCond(query);
    var result = queryCond ? this.queryComponents(queryCond) : this._componentsMap.get(mainType);
    return doFilter(filterBySubType(result, condition));

    function getQueryCond(q) {
      var indexAttr = mainType + 'Index';
      var idAttr = mainType + 'Id';
      var nameAttr = mainType + 'Name';
      return q && (q[indexAttr] != null || q[idAttr] != null || q[nameAttr] != null) ? {
        mainType: mainType,
        // subType will be filtered finally.
        index: q[indexAttr],
        id: q[idAttr],
        name: q[nameAttr]
      } : null;
    }

    function doFilter(res) {
      return condition.filter ? filter(res, condition.filter) : res;
    }
  },

  /**
   * @usage
   * eachComponent('legend', function (legendModel, index) {
   *     ...
   * });
   * eachComponent(function (componentType, model, index) {
   *     // componentType does not include subType
   *     // (componentType is 'xxx' but not 'xxx.aa')
   * });
   * eachComponent(
   *     {mainType: 'dataZoom', query: {dataZoomId: 'abc'}},
   *     function (model, index) {...}
   * );
   * eachComponent(
   *     {mainType: 'series', subType: 'pie', query: {seriesName: 'uio'}},
   *     function (model, index) {...}
   * );
   *
   * @param {string|Object=} mainType When mainType is object, the definition
   *                                  is the same as the method 'findComponents'.
   * @param {Function} cb
   * @param {*} context
   */
  eachComponent: function (mainType, cb, context) {
    var componentsMap = this._componentsMap;

    if (typeof mainType === 'function') {
      context = cb;
      cb = mainType;
      componentsMap.each(function (components, componentType) {
        each(components, function (component, index) {
          cb.call(context, componentType, component, index);
        });
      });
    } else if (isString(mainType)) {
      each(componentsMap.get(mainType), cb, context);
    } else if (isObject(mainType)) {
      var queryResult = this.findComponents(mainType);
      each(queryResult, cb, context);
    }
  },

  /**
   * @param {string} name
   * @return {Array.<module:echarts/model/Series>}
   */
  getSeriesByName: function (name) {
    var series = this._componentsMap.get('series');

    return filter(series, function (oneSeries) {
      return oneSeries.name === name;
    });
  },

  /**
   * @param {number} seriesIndex
   * @return {module:echarts/model/Series}
   */
  getSeriesByIndex: function (seriesIndex) {
    return this._componentsMap.get('series')[seriesIndex];
  },

  /**
   * Get series list before filtered by type.
   * FIXME: rename to getRawSeriesByType?
   *
   * @param {string} subType
   * @return {Array.<module:echarts/model/Series>}
   */
  getSeriesByType: function (subType) {
    var series = this._componentsMap.get('series');

    return filter(series, function (oneSeries) {
      return oneSeries.subType === subType;
    });
  },

  /**
   * @return {Array.<module:echarts/model/Series>}
   */
  getSeries: function () {
    return this._componentsMap.get('series').slice();
  },

  /**
   * @return {number}
   */
  getSeriesCount: function () {
    return this._componentsMap.get('series').length;
  },

  /**
   * After filtering, series may be different
   * frome raw series.
   *
   * @param {Function} cb
   * @param {*} context
   */
  eachSeries: function (cb, context) {
    assertSeriesInitialized(this);
    each(this._seriesIndices, function (rawSeriesIndex) {
      var series = this._componentsMap.get('series')[rawSeriesIndex];

      cb.call(context, series, rawSeriesIndex);
    }, this);
  },

  /**
   * Iterate raw series before filtered.
   *
   * @param {Function} cb
   * @param {*} context
   */
  eachRawSeries: function (cb, context) {
    each(this._componentsMap.get('series'), cb, context);
  },

  /**
   * After filtering, series may be different.
   * frome raw series.
   *
   * @param {string} subType.
   * @param {Function} cb
   * @param {*} context
   */
  eachSeriesByType: function (subType, cb, context) {
    assertSeriesInitialized(this);
    each(this._seriesIndices, function (rawSeriesIndex) {
      var series = this._componentsMap.get('series')[rawSeriesIndex];

      if (series.subType === subType) {
        cb.call(context, series, rawSeriesIndex);
      }
    }, this);
  },

  /**
   * Iterate raw series before filtered of given type.
   *
   * @parma {string} subType
   * @param {Function} cb
   * @param {*} context
   */
  eachRawSeriesByType: function (subType, cb, context) {
    return each(this.getSeriesByType(subType), cb, context);
  },

  /**
   * @param {module:echarts/model/Series} seriesModel
   */
  isSeriesFiltered: function (seriesModel) {
    assertSeriesInitialized(this);
    return this._seriesIndicesMap.get(seriesModel.componentIndex) == null;
  },

  /**
   * @return {Array.<number>}
   */
  getCurrentSeriesIndices: function () {
    return (this._seriesIndices || []).slice();
  },

  /**
   * @param {Function} cb
   * @param {*} context
   */
  filterSeries: function (cb, context) {
    assertSeriesInitialized(this);
    var filteredSeries = filter(this._componentsMap.get('series'), cb, context);
    createSeriesIndices(this, filteredSeries);
  },
  restoreData: function (payload) {
    var componentsMap = this._componentsMap;
    createSeriesIndices(this, componentsMap.get('series'));
    var componentTypes = [];
    componentsMap.each(function (components, componentType) {
      componentTypes.push(componentType);
    });
    ComponentModel.topologicalTravel(componentTypes, ComponentModel.getAllClassMainTypes(), function (componentType, dependencies) {
      each(componentsMap.get(componentType), function (component) {
        (componentType !== 'series' || !isNotTargetSeries(component, payload)) && component.restoreData();
      });
    });
  }
});

function isNotTargetSeries(seriesModel, payload) {
  if (payload) {
    var index = payload.seiresIndex;
    var id = payload.seriesId;
    var name = payload.seriesName;
    return index != null && seriesModel.componentIndex !== index || id != null && seriesModel.id !== id || name != null && seriesModel.name !== name;
  }
}
/**
 * @inner
 */


function mergeTheme(option, theme) {
  // PENDING
  // NOT use `colorLayer` in theme if option has `color`
  var notMergeColorLayer = option.color && !option.colorLayer;
  each(theme, function (themeItem, name) {
    if (name === 'colorLayer' && notMergeColorLayer) {
      return;
    } // 如果有 component model 则把具体的 merge 逻辑交给该 model 处理


    if (!ComponentModel.hasClass(name)) {
      if (typeof themeItem === 'object') {
        option[name] = !option[name] ? clone(themeItem) : merge(option[name], themeItem, false);
      } else {
        if (option[name] == null) {
          option[name] = themeItem;
        }
      }
    }
  });
}

function initBase(baseOption) {
  baseOption = baseOption; // Using OPTION_INNER_KEY to mark that this option can not be used outside,
  // i.e. `chart.setOption(chart.getModel().option);` is forbiden.

  this.option = {};
  this.option[OPTION_INNER_KEY] = 1;
  /**
   * Init with series: [], in case of calling findSeries method
   * before series initialized.
   * @type {Object.<string, Array.<module:echarts/model/Model>>}
   * @private
   */

  this._componentsMap = createHashMap({
    series: []
  });
  /**
   * Mapping between filtered series list and raw series list.
   * key: filtered series indices, value: raw series indices.
   * @type {Array.<nubmer>}
   * @private
   */

  this._seriesIndices;
  this._seriesIndicesMap;
  mergeTheme(baseOption, this._theme.option); // TODO Needs clone when merging to the unexisted property

  merge(baseOption, globalDefault, false);
  this.mergeOption(baseOption);
}
/**
 * @inner
 * @param {Array.<string>|string} types model types
 * @return {Object} key: {string} type, value: {Array.<Object>} models
 */


function getComponentsByTypes(componentsMap, types) {
  if (!isArray(types)) {
    types = types ? [types] : [];
  }

  var ret = {};
  each(types, function (type) {
    ret[type] = (componentsMap.get(type) || []).slice();
  });
  return ret;
}
/**
 * @inner
 */


function determineSubType(mainType, newCptOption, existComponent) {
  var subType = newCptOption.type ? newCptOption.type : existComponent ? existComponent.subType // Use determineSubType only when there is no existComponent.
  : ComponentModel.determineSubType(mainType, newCptOption); // tooltip, markline, markpoint may always has no subType

  return subType;
}
/**
 * @inner
 */


function createSeriesIndices(ecModel, seriesModels) {
  ecModel._seriesIndicesMap = createHashMap(ecModel._seriesIndices = map(seriesModels, function (series) {
    return series.componentIndex;
  }) || []);
}
/**
 * @inner
 */


function filterBySubType(components, condition) {
  // Using hasOwnProperty for restrict. Consider
  // subType is undefined in user payload.
  return condition.hasOwnProperty('subType') ? filter(components, function (cpt) {
    return cpt.subType === condition.subType;
  }) : components;
}
/**
 * @inner
 */


function assertSeriesInitialized(ecModel) {}

mixin(GlobalModel, colorPaletteMixin);
var _default = GlobalModel;
module.exports = _default;

/***/ }),

/***/ "8971":
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
var platform = ''; // Navigator not exists in node

if (typeof navigator !== 'undefined') {
  platform = navigator.platform || '';
}

var _default = {
  // backgroundColor: 'rgba(0,0,0,0)',
  // https://dribbble.com/shots/1065960-Infographic-Pie-chart-visualization
  // color: ['#5793f3', '#d14a61', '#fd9c35', '#675bba', '#fec42c', '#dd4444', '#d4df5a', '#cd4870'],
  // Light colors:
  // color: ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'],
  // color: ['#cc5664', '#9bd6ec', '#ea946e', '#8acaaa', '#f1ec64', '#ee8686', '#a48dc1', '#5da6bc', '#b9dcae'],
  // Dark colors:
  color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
  gradientColor: ['#f6efa6', '#d88273', '#bf444c'],
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: platform.match(/^Win/) ? 'Microsoft YaHei' : 'sans-serif',
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  animation: 'auto',
  animationDuration: 1000,
  animationDurationUpdate: 300,
  animationEasing: 'exponentialOut',
  animationEasingUpdate: 'cubicOut',
  animationThreshold: 2000,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3000,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3000,
  // See: module:echarts/scale/Time
  useUTC: false
};
module.exports = _default;

/***/ }),

/***/ "89e3":
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

var numberUtil = __webpack_require__("3842");

var formatUtil = __webpack_require__("eda2");

var Scale = __webpack_require__("e0d8");

var helper = __webpack_require__("944e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Interval scale
 * @module echarts/scale/Interval
 */
var roundNumber = numberUtil.round;
/**
 * @alias module:echarts/coord/scale/Interval
 * @constructor
 */

var IntervalScale = Scale.extend({
  type: 'interval',
  _interval: 0,
  _intervalPrecision: 2,
  setExtent: function (start, end) {
    var thisExtent = this._extent; //start,end may be a Number like '25',so...

    if (!isNaN(start)) {
      thisExtent[0] = parseFloat(start);
    }

    if (!isNaN(end)) {
      thisExtent[1] = parseFloat(end);
    }
  },
  unionExtent: function (other) {
    var extent = this._extent;
    other[0] < extent[0] && (extent[0] = other[0]);
    other[1] > extent[1] && (extent[1] = other[1]); // unionExtent may called by it's sub classes

    IntervalScale.prototype.setExtent.call(this, extent[0], extent[1]);
  },

  /**
   * Get interval
   */
  getInterval: function () {
    return this._interval;
  },

  /**
   * Set interval
   */
  setInterval: function (interval) {
    this._interval = interval; // Dropped auto calculated niceExtent and use user setted extent
    // We assume user wan't to set both interval, min, max to get a better result

    this._niceExtent = this._extent.slice();
    this._intervalPrecision = helper.getIntervalPrecision(interval);
  },

  /**
   * @param {boolean} [expandToNicedExtent=false] If expand the ticks to niced extent.
   * @return {Array.<number>}
   */
  getTicks: function (expandToNicedExtent) {
    var interval = this._interval;
    var extent = this._extent;
    var niceTickExtent = this._niceExtent;
    var intervalPrecision = this._intervalPrecision;
    var ticks = []; // If interval is 0, return [];

    if (!interval) {
      return ticks;
    } // Consider this case: using dataZoom toolbox, zoom and zoom.


    var safeLimit = 10000;

    if (extent[0] < niceTickExtent[0]) {
      if (expandToNicedExtent) {
        ticks.push(roundNumber(niceTickExtent[0] - interval));
      } else {
        ticks.push(extent[0]);
      }
    }

    var tick = niceTickExtent[0];

    while (tick <= niceTickExtent[1]) {
      ticks.push(tick); // Avoid rounding error

      tick = roundNumber(tick + interval, intervalPrecision);

      if (tick === ticks[ticks.length - 1]) {
        // Consider out of safe float point, e.g.,
        // -3711126.9907707 + 2e-10 === -3711126.9907707
        break;
      }

      if (ticks.length > safeLimit) {
        return [];
      }
    } // Consider this case: the last item of ticks is smaller
    // than niceTickExtent[1] and niceTickExtent[1] === extent[1].


    var lastNiceTick = ticks.length ? ticks[ticks.length - 1] : niceTickExtent[1];

    if (extent[1] > lastNiceTick) {
      if (expandToNicedExtent) {
        ticks.push(lastNiceTick + interval);
      } else {
        ticks.push(extent[1]);
      }
    }

    return ticks;
  },

  /**
   * @param {number} [splitNumber=5]
   * @return {Array.<Array.<number>>}
   */
  getMinorTicks: function (splitNumber) {
    var ticks = this.getTicks(true);
    var minorTicks = [];
    var extent = this.getExtent();

    for (var i = 1; i < ticks.length; i++) {
      var nextTick = ticks[i];
      var prevTick = ticks[i - 1];
      var count = 0;
      var minorTicksGroup = [];
      var interval = nextTick - prevTick;
      var minorInterval = interval / splitNumber;

      while (count < splitNumber - 1) {
        var minorTick = numberUtil.round(prevTick + (count + 1) * minorInterval); // For the first and last interval. The count may be less than splitNumber.

        if (minorTick > extent[0] && minorTick < extent[1]) {
          minorTicksGroup.push(minorTick);
        }

        count++;
      }

      minorTicks.push(minorTicksGroup);
    }

    return minorTicks;
  },

  /**
   * @param {number} data
   * @param {Object} [opt]
   * @param {number|string} [opt.precision] If 'auto', use nice presision.
   * @param {boolean} [opt.pad] returns 1.50 but not 1.5 if precision is 2.
   * @return {string}
   */
  getLabel: function (data, opt) {
    if (data == null) {
      return '';
    }

    var precision = opt && opt.precision;

    if (precision == null) {
      precision = numberUtil.getPrecisionSafe(data) || 0;
    } else if (precision === 'auto') {
      // Should be more precise then tick.
      precision = this._intervalPrecision;
    } // (1) If `precision` is set, 12.005 should be display as '12.00500'.
    // (2) Use roundNumber (toFixed) to avoid scientific notation like '3.5e-7'.


    data = roundNumber(data, precision, true);
    return formatUtil.addCommas(data);
  },

  /**
   * Update interval and extent of intervals for nice ticks
   *
   * @param {number} [splitNumber = 5] Desired number of ticks
   * @param {number} [minInterval]
   * @param {number} [maxInterval]
   */
  niceTicks: function (splitNumber, minInterval, maxInterval) {
    splitNumber = splitNumber || 5;
    var extent = this._extent;
    var span = extent[1] - extent[0];

    if (!isFinite(span)) {
      return;
    } // User may set axis min 0 and data are all negative
    // FIXME If it needs to reverse ?


    if (span < 0) {
      span = -span;
      extent.reverse();
    }

    var result = helper.intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval);
    this._intervalPrecision = result.intervalPrecision;
    this._interval = result.interval;
    this._niceExtent = result.niceTickExtent;
  },

  /**
   * Nice extent.
   * @param {Object} opt
   * @param {number} [opt.splitNumber = 5] Given approx tick number
   * @param {boolean} [opt.fixMin=false]
   * @param {boolean} [opt.fixMax=false]
   * @param {boolean} [opt.minInterval]
   * @param {boolean} [opt.maxInterval]
   */
  niceExtent: function (opt) {
    var extent = this._extent; // If extent start and end are same, expand them

    if (extent[0] === extent[1]) {
      if (extent[0] !== 0) {
        // Expand extent
        var expandSize = extent[0]; // In the fowllowing case
        //      Axis has been fixed max 100
        //      Plus data are all 100 and axis extent are [100, 100].
        // Extend to the both side will cause expanded max is larger than fixed max.
        // So only expand to the smaller side.

        if (!opt.fixMax) {
          extent[1] += expandSize / 2;
          extent[0] -= expandSize / 2;
        } else {
          extent[0] -= expandSize / 2;
        }
      } else {
        extent[1] = 1;
      }
    }

    var span = extent[1] - extent[0]; // If there are no data and extent are [Infinity, -Infinity]

    if (!isFinite(span)) {
      extent[0] = 0;
      extent[1] = 1;
    }

    this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval); // var extent = this._extent;

    var interval = this._interval;

    if (!opt.fixMin) {
      extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval);
    }

    if (!opt.fixMax) {
      extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval);
    }
  }
});
/**
 * @return {module:echarts/scale/Time}
 */

IntervalScale.create = function () {
  return new IntervalScale();
};

var _default = IntervalScale;
module.exports = _default;

/***/ }),

/***/ "8b7f0":
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
var retrieve = _util.retrieve;
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
 * Helper for model references.
 * There are many manners to refer axis/coordSys.
 */
// TODO
// merge relevant logic to this file?
// check: "modelHelper" of tooltip and "BrushTargetManager".

/**
 * @class
 * For example:
 * {
 *     coordSysName: 'cartesian2d',
 *     coordSysDims: ['x', 'y', ...],
 *     axisMap: HashMap({
 *         x: xAxisModel,
 *         y: yAxisModel
 *     }),
 *     categoryAxisMap: HashMap({
 *         x: xAxisModel,
 *         y: undefined
 *     }),
 *     // The index of the first category axis in `coordSysDims`.
 *     // `null/undefined` means no category axis exists.
 *     firstCategoryDimIndex: 1,
 *     // To replace user specified encode.
 * }
 */
function CoordSysInfo(coordSysName) {
  /**
   * @type {string}
   */
  this.coordSysName = coordSysName;
  /**
   * @type {Array.<string>}
   */

  this.coordSysDims = [];
  /**
   * @type {module:zrender/core/util#HashMap}
   */

  this.axisMap = createHashMap();
  /**
   * @type {module:zrender/core/util#HashMap}
   */

  this.categoryAxisMap = createHashMap();
  /**
   * @type {number}
   */

  this.firstCategoryDimIndex = null;
}
/**
 * @return {module:model/referHelper#CoordSysInfo}
 */


function getCoordSysInfoBySeries(seriesModel) {
  var coordSysName = seriesModel.get('coordinateSystem');
  var result = new CoordSysInfo(coordSysName);
  var fetch = fetchers[coordSysName];

  if (fetch) {
    fetch(seriesModel, result, result.axisMap, result.categoryAxisMap);
    return result;
  }
}

var fetchers = {
  cartesian2d: function (seriesModel, result, axisMap, categoryAxisMap) {
    var xAxisModel = seriesModel.getReferringComponents('xAxis')[0];
    var yAxisModel = seriesModel.getReferringComponents('yAxis')[0];
    result.coordSysDims = ['x', 'y'];
    axisMap.set('x', xAxisModel);
    axisMap.set('y', yAxisModel);

    if (isCategory(xAxisModel)) {
      categoryAxisMap.set('x', xAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(yAxisModel)) {
      categoryAxisMap.set('y', yAxisModel);
      result.firstCategoryDimIndex == null & (result.firstCategoryDimIndex = 1);
    }
  },
  singleAxis: function (seriesModel, result, axisMap, categoryAxisMap) {
    var singleAxisModel = seriesModel.getReferringComponents('singleAxis')[0];
    result.coordSysDims = ['single'];
    axisMap.set('single', singleAxisModel);

    if (isCategory(singleAxisModel)) {
      categoryAxisMap.set('single', singleAxisModel);
      result.firstCategoryDimIndex = 0;
    }
  },
  polar: function (seriesModel, result, axisMap, categoryAxisMap) {
    var polarModel = seriesModel.getReferringComponents('polar')[0];
    var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
    var angleAxisModel = polarModel.findAxisModel('angleAxis');
    result.coordSysDims = ['radius', 'angle'];
    axisMap.set('radius', radiusAxisModel);
    axisMap.set('angle', angleAxisModel);

    if (isCategory(radiusAxisModel)) {
      categoryAxisMap.set('radius', radiusAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(angleAxisModel)) {
      categoryAxisMap.set('angle', angleAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  geo: function (seriesModel, result, axisMap, categoryAxisMap) {
    result.coordSysDims = ['lng', 'lat'];
  },
  parallel: function (seriesModel, result, axisMap, categoryAxisMap) {
    var ecModel = seriesModel.ecModel;
    var parallelModel = ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));
    var coordSysDims = result.coordSysDims = parallelModel.dimensions.slice();
    each(parallelModel.parallelAxisIndex, function (axisIndex, index) {
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);
      var axisDim = coordSysDims[index];
      axisMap.set(axisDim, axisModel);

      if (isCategory(axisModel) && result.firstCategoryDimIndex == null) {
        categoryAxisMap.set(axisDim, axisModel);
        result.firstCategoryDimIndex = index;
      }
    });
  }
};

function isCategory(axisModel) {
  return axisModel.get('type') === 'category';
}

exports.getCoordSysInfoBySeries = getCoordSysInfoBySeries;

/***/ }),

/***/ "8c2a":
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

var Scale = __webpack_require__("e0d8");

var numberUtil = __webpack_require__("3842");

var IntervalScale = __webpack_require__("89e3");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * Log scale
 * @module echarts/scale/Log
 */
// Use some method of IntervalScale
var scaleProto = Scale.prototype;
var intervalScaleProto = IntervalScale.prototype;
var getPrecisionSafe = numberUtil.getPrecisionSafe;
var roundingErrorFix = numberUtil.round;
var mathFloor = Math.floor;
var mathCeil = Math.ceil;
var mathPow = Math.pow;
var mathLog = Math.log;
var LogScale = Scale.extend({
  type: 'log',
  base: 10,
  $constructor: function () {
    Scale.apply(this, arguments);
    this._originalScale = new IntervalScale();
  },

  /**
   * @param {boolean} [expandToNicedExtent=false] If expand the ticks to niced extent.
   * @return {Array.<number>}
   */
  getTicks: function (expandToNicedExtent) {
    var originalScale = this._originalScale;
    var extent = this._extent;
    var originalExtent = originalScale.getExtent();
    return zrUtil.map(intervalScaleProto.getTicks.call(this, expandToNicedExtent), function (val) {
      var powVal = numberUtil.round(mathPow(this.base, val)); // Fix #4158

      powVal = val === extent[0] && originalScale.__fixMin ? fixRoundingError(powVal, originalExtent[0]) : powVal;
      powVal = val === extent[1] && originalScale.__fixMax ? fixRoundingError(powVal, originalExtent[1]) : powVal;
      return powVal;
    }, this);
  },

  /**
   * @param {number} splitNumber
   * @return {Array.<Array.<number>>}
   */
  getMinorTicks: intervalScaleProto.getMinorTicks,

  /**
   * @param {number} val
   * @return {string}
   */
  getLabel: intervalScaleProto.getLabel,

  /**
   * @param  {number} val
   * @return {number}
   */
  scale: function (val) {
    val = scaleProto.scale.call(this, val);
    return mathPow(this.base, val);
  },

  /**
   * @param {number} start
   * @param {number} end
   */
  setExtent: function (start, end) {
    var base = this.base;
    start = mathLog(start) / mathLog(base);
    end = mathLog(end) / mathLog(base);
    intervalScaleProto.setExtent.call(this, start, end);
  },

  /**
   * @return {number} end
   */
  getExtent: function () {
    var base = this.base;
    var extent = scaleProto.getExtent.call(this);
    extent[0] = mathPow(base, extent[0]);
    extent[1] = mathPow(base, extent[1]); // Fix #4158

    var originalScale = this._originalScale;
    var originalExtent = originalScale.getExtent();
    originalScale.__fixMin && (extent[0] = fixRoundingError(extent[0], originalExtent[0]));
    originalScale.__fixMax && (extent[1] = fixRoundingError(extent[1], originalExtent[1]));
    return extent;
  },

  /**
   * @param  {Array.<number>} extent
   */
  unionExtent: function (extent) {
    this._originalScale.unionExtent(extent);

    var base = this.base;
    extent[0] = mathLog(extent[0]) / mathLog(base);
    extent[1] = mathLog(extent[1]) / mathLog(base);
    scaleProto.unionExtent.call(this, extent);
  },

  /**
   * @override
   */
  unionExtentFromData: function (data, dim) {
    // TODO
    // filter value that <= 0
    this.unionExtent(data.getApproximateExtent(dim));
  },

  /**
   * Update interval and extent of intervals for nice ticks
   * @param  {number} [approxTickNum = 10] Given approx tick number
   */
  niceTicks: function (approxTickNum) {
    approxTickNum = approxTickNum || 10;
    var extent = this._extent;
    var span = extent[1] - extent[0];

    if (span === Infinity || span <= 0) {
      return;
    }

    var interval = numberUtil.quantity(span);
    var err = approxTickNum / span * interval; // Filter ticks to get closer to the desired count.

    if (err <= 0.5) {
      interval *= 10;
    } // Interval should be integer


    while (!isNaN(interval) && Math.abs(interval) < 1 && Math.abs(interval) > 0) {
      interval *= 10;
    }

    var niceExtent = [numberUtil.round(mathCeil(extent[0] / interval) * interval), numberUtil.round(mathFloor(extent[1] / interval) * interval)];
    this._interval = interval;
    this._niceExtent = niceExtent;
  },

  /**
   * Nice extent.
   * @override
   */
  niceExtent: function (opt) {
    intervalScaleProto.niceExtent.call(this, opt);
    var originalScale = this._originalScale;
    originalScale.__fixMin = opt.fixMin;
    originalScale.__fixMax = opt.fixMax;
  }
});
zrUtil.each(['contain', 'normalize'], function (methodName) {
  LogScale.prototype[methodName] = function (val) {
    val = mathLog(val) / mathLog(this.base);
    return scaleProto[methodName].call(this, val);
  };
});

LogScale.create = function () {
  return new LogScale();
};

function fixRoundingError(val, originalVal) {
  return roundingErrorFix(val, getPrecisionSafe(originalVal));
}

var _default = LogScale;
module.exports = _default;

/***/ }),

/***/ "944e":
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

/**
 * For testable.
 */
var roundNumber = numberUtil.round;
/**
 * @param {Array.<number>} extent Both extent[0] and extent[1] should be valid number.
 *                                Should be extent[0] < extent[1].
 * @param {number} splitNumber splitNumber should be >= 1.
 * @param {number} [minInterval]
 * @param {number} [maxInterval]
 * @return {Object} {interval, intervalPrecision, niceTickExtent}
 */

function intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval) {
  var result = {};
  var span = extent[1] - extent[0];
  var interval = result.interval = numberUtil.nice(span / splitNumber, true);

  if (minInterval != null && interval < minInterval) {
    interval = result.interval = minInterval;
  }

  if (maxInterval != null && interval > maxInterval) {
    interval = result.interval = maxInterval;
  } // Tow more digital for tick.


  var precision = result.intervalPrecision = getIntervalPrecision(interval); // Niced extent inside original extent

  var niceTickExtent = result.niceTickExtent = [roundNumber(Math.ceil(extent[0] / interval) * interval, precision), roundNumber(Math.floor(extent[1] / interval) * interval, precision)];
  fixExtent(niceTickExtent, extent);
  return result;
}
/**
 * @param {number} interval
 * @return {number} interval precision
 */


function getIntervalPrecision(interval) {
  // Tow more digital for tick.
  return numberUtil.getPrecisionSafe(interval) + 2;
}

function clamp(niceTickExtent, idx, extent) {
  niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0]);
} // In some cases (e.g., splitNumber is 1), niceTickExtent may be out of extent.


function fixExtent(niceTickExtent, extent) {
  !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]);
  !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]);
  clamp(niceTickExtent, 0, extent);
  clamp(niceTickExtent, 1, extent);

  if (niceTickExtent[0] > niceTickExtent[1]) {
    niceTickExtent[0] = niceTickExtent[1];
  }
}

exports.intervalScaleNiceTicks = intervalScaleNiceTicks;
exports.getIntervalPrecision = getIntervalPrecision;
exports.fixExtent = fixExtent;

/***/ }),

/***/ "998c":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PI = Math.PI;
/**
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [opts]
 * @param {string} [opts.text]
 * @param {string} [opts.color]
 * @param {string} [opts.textColor]
 * @return {module:zrender/Element}
 */

function _default(api, opts) {
  opts = opts || {};
  zrUtil.defaults(opts, {
    text: 'loading',
    color: '#c23531',
    textColor: '#000',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0
  });
  var mask = new graphic.Rect({
    style: {
      fill: opts.maskColor
    },
    zlevel: opts.zlevel,
    z: 10000
  });
  var arc = new graphic.Arc({
    shape: {
      startAngle: -PI / 2,
      endAngle: -PI / 2 + 0.1,
      r: 10
    },
    style: {
      stroke: opts.color,
      lineCap: 'round',
      lineWidth: 5
    },
    zlevel: opts.zlevel,
    z: 10001
  });
  var labelRect = new graphic.Rect({
    style: {
      fill: 'none',
      text: opts.text,
      textPosition: 'right',
      textDistance: 10,
      textFill: opts.textColor
    },
    zlevel: opts.zlevel,
    z: 10001
  });
  arc.animateShape(true).when(1000, {
    endAngle: PI * 3 / 2
  }).start('circularInOut');
  arc.animateShape(true).when(1000, {
    startAngle: PI * 3 / 2
  }).delay(300).start('circularInOut');
  var group = new graphic.Group();
  group.add(arc);
  group.add(labelRect);
  group.add(mask); // Inject resize

  group.resize = function () {
    var cx = api.getWidth() / 2;
    var cy = api.getHeight() / 2;
    arc.setShape({
      cx: cx,
      cy: cy
    });
    var r = arc.shape.r;
    labelRect.setShape({
      x: cx - r,
      y: cy - r,
      width: r * 2,
      height: r * 2
    });
    mask.setShape({
      x: 0,
      y: 0,
      width: api.getWidth(),
      height: api.getHeight()
    });
  };

  group.resize();
  return group;
}

module.exports = _default;

/***/ }),

/***/ "9bdb":
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

var makeStyleMapper = __webpack_require__("282b");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var getAreaStyle = makeStyleMapper([['fill', 'color'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['opacity'], ['shadowColor']]);
var _default = {
  getAreaStyle: function (excludes, includes) {
    return getAreaStyle(this, excludes, includes);
  }
};
module.exports = _default;

/***/ }),

/***/ "ca98":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * ECharts option manager
 *
 * @module {echarts/model/OptionManager}
 */
var each = zrUtil.each;
var clone = zrUtil.clone;
var map = zrUtil.map;
var merge = zrUtil.merge;
var QUERY_REG = /^(min|max)?(.+)$/;
/**
 * TERM EXPLANATIONS:
 *
 * [option]:
 *
 *     An object that contains definitions of components. For example:
 *     var option = {
 *         title: {...},
 *         legend: {...},
 *         visualMap: {...},
 *         series: [
 *             {data: [...]},
 *             {data: [...]},
 *             ...
 *         ]
 *     };
 *
 * [rawOption]:
 *
 *     An object input to echarts.setOption. 'rawOption' may be an
 *     'option', or may be an object contains multi-options. For example:
 *     var option = {
 *         baseOption: {
 *             title: {...},
 *             legend: {...},
 *             series: [
 *                 {data: [...]},
 *                 {data: [...]},
 *                 ...
 *             ]
 *         },
 *         timeline: {...},
 *         options: [
 *             {title: {...}, series: {data: [...]}},
 *             {title: {...}, series: {data: [...]}},
 *             ...
 *         ],
 *         media: [
 *             {
 *                 query: {maxWidth: 320},
 *                 option: {series: {x: 20}, visualMap: {show: false}}
 *             },
 *             {
 *                 query: {minWidth: 320, maxWidth: 720},
 *                 option: {series: {x: 500}, visualMap: {show: true}}
 *             },
 *             {
 *                 option: {series: {x: 1200}, visualMap: {show: true}}
 *             }
 *         ]
 *     };
 *
 * @alias module:echarts/model/OptionManager
 * @param {module:echarts/ExtensionAPI} api
 */

function OptionManager(api) {
  /**
   * @private
   * @type {module:echarts/ExtensionAPI}
   */
  this._api = api;
  /**
   * @private
   * @type {Array.<number>}
   */

  this._timelineOptions = [];
  /**
   * @private
   * @type {Array.<Object>}
   */

  this._mediaList = [];
  /**
   * @private
   * @type {Object}
   */

  this._mediaDefault;
  /**
   * -1, means default.
   * empty means no media.
   * @private
   * @type {Array.<number>}
   */

  this._currentMediaIndices = [];
  /**
   * @private
   * @type {Object}
   */

  this._optionBackup;
  /**
   * @private
   * @type {Object}
   */

  this._newBaseOption;
} // timeline.notMerge is not supported in ec3. Firstly there is rearly
// case that notMerge is needed. Secondly supporting 'notMerge' requires
// rawOption cloned and backuped when timeline changed, which does no
// good to performance. What's more, that both timeline and setOption
// method supply 'notMerge' brings complex and some problems.
// Consider this case:
// (step1) chart.setOption({timeline: {notMerge: false}, ...}, false);
// (step2) chart.setOption({timeline: {notMerge: true}, ...}, false);


OptionManager.prototype = {
  constructor: OptionManager,

  /**
   * @public
   * @param {Object} rawOption Raw option.
   * @param {module:echarts/model/Global} ecModel
   * @param {Array.<Function>} optionPreprocessorFuncs
   * @return {Object} Init option
   */
  setOption: function (rawOption, optionPreprocessorFuncs) {
    if (rawOption) {
      // That set dat primitive is dangerous if user reuse the data when setOption again.
      zrUtil.each(modelUtil.normalizeToArray(rawOption.series), function (series) {
        series && series.data && zrUtil.isTypedArray(series.data) && zrUtil.setAsPrimitive(series.data);
      });
    } // Caution: some series modify option data, if do not clone,
    // it should ensure that the repeat modify correctly
    // (create a new object when modify itself).


    rawOption = clone(rawOption); // FIXME
    // 如果 timeline options 或者 media 中设置了某个属性，而baseOption中没有设置，则进行警告。

    var oldOptionBackup = this._optionBackup;
    var newParsedOption = parseRawOption.call(this, rawOption, optionPreprocessorFuncs, !oldOptionBackup);
    this._newBaseOption = newParsedOption.baseOption; // For setOption at second time (using merge mode);

    if (oldOptionBackup) {
      // Only baseOption can be merged.
      mergeOption(oldOptionBackup.baseOption, newParsedOption.baseOption); // For simplicity, timeline options and media options do not support merge,
      // that is, if you `setOption` twice and both has timeline options, the latter
      // timeline opitons will not be merged to the formers, but just substitude them.

      if (newParsedOption.timelineOptions.length) {
        oldOptionBackup.timelineOptions = newParsedOption.timelineOptions;
      }

      if (newParsedOption.mediaList.length) {
        oldOptionBackup.mediaList = newParsedOption.mediaList;
      }

      if (newParsedOption.mediaDefault) {
        oldOptionBackup.mediaDefault = newParsedOption.mediaDefault;
      }
    } else {
      this._optionBackup = newParsedOption;
    }
  },

  /**
   * @param {boolean} isRecreate
   * @return {Object}
   */
  mountOption: function (isRecreate) {
    var optionBackup = this._optionBackup; // TODO
    // 如果没有reset功能则不clone。

    this._timelineOptions = map(optionBackup.timelineOptions, clone);
    this._mediaList = map(optionBackup.mediaList, clone);
    this._mediaDefault = clone(optionBackup.mediaDefault);
    this._currentMediaIndices = [];
    return clone(isRecreate // this._optionBackup.baseOption, which is created at the first `setOption`
    // called, and is merged into every new option by inner method `mergeOption`
    // each time `setOption` called, can be only used in `isRecreate`, because
    // its reliability is under suspicion. In other cases option merge is
    // performed by `model.mergeOption`.
    ? optionBackup.baseOption : this._newBaseOption);
  },

  /**
   * @param {module:echarts/model/Global} ecModel
   * @return {Object}
   */
  getTimelineOption: function (ecModel) {
    var option;
    var timelineOptions = this._timelineOptions;

    if (timelineOptions.length) {
      // getTimelineOption can only be called after ecModel inited,
      // so we can get currentIndex from timelineModel.
      var timelineModel = ecModel.getComponent('timeline');

      if (timelineModel) {
        option = clone(timelineOptions[timelineModel.getCurrentIndex()], true);
      }
    }

    return option;
  },

  /**
   * @param {module:echarts/model/Global} ecModel
   * @return {Array.<Object>}
   */
  getMediaOption: function (ecModel) {
    var ecWidth = this._api.getWidth();

    var ecHeight = this._api.getHeight();

    var mediaList = this._mediaList;
    var mediaDefault = this._mediaDefault;
    var indices = [];
    var result = []; // No media defined.

    if (!mediaList.length && !mediaDefault) {
      return result;
    } // Multi media may be applied, the latter defined media has higher priority.


    for (var i = 0, len = mediaList.length; i < len; i++) {
      if (applyMediaQuery(mediaList[i].query, ecWidth, ecHeight)) {
        indices.push(i);
      }
    } // FIXME
    // 是否mediaDefault应该强制用户设置，否则可能修改不能回归。


    if (!indices.length && mediaDefault) {
      indices = [-1];
    }

    if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
      result = map(indices, function (index) {
        return clone(index === -1 ? mediaDefault.option : mediaList[index].option);
      });
    } // Otherwise return nothing.


    this._currentMediaIndices = indices;
    return result;
  }
};

function parseRawOption(rawOption, optionPreprocessorFuncs, isNew) {
  var timelineOptions = [];
  var mediaList = [];
  var mediaDefault;
  var baseOption; // Compatible with ec2.

  var timelineOpt = rawOption.timeline;

  if (rawOption.baseOption) {
    baseOption = rawOption.baseOption;
  } // For timeline


  if (timelineOpt || rawOption.options) {
    baseOption = baseOption || {};
    timelineOptions = (rawOption.options || []).slice();
  } // For media query


  if (rawOption.media) {
    baseOption = baseOption || {};
    var media = rawOption.media;
    each(media, function (singleMedia) {
      if (singleMedia && singleMedia.option) {
        if (singleMedia.query) {
          mediaList.push(singleMedia);
        } else if (!mediaDefault) {
          // Use the first media default.
          mediaDefault = singleMedia;
        }
      }
    });
  } // For normal option


  if (!baseOption) {
    baseOption = rawOption;
  } // Set timelineOpt to baseOption in ec3,
  // which is convenient for merge option.


  if (!baseOption.timeline) {
    baseOption.timeline = timelineOpt;
  } // Preprocess.


  each([baseOption].concat(timelineOptions).concat(zrUtil.map(mediaList, function (media) {
    return media.option;
  })), function (option) {
    each(optionPreprocessorFuncs, function (preProcess) {
      preProcess(option, isNew);
    });
  });
  return {
    baseOption: baseOption,
    timelineOptions: timelineOptions,
    mediaDefault: mediaDefault,
    mediaList: mediaList
  };
}
/**
 * @see <http://www.w3.org/TR/css3-mediaqueries/#media1>
 * Support: width, height, aspectRatio
 * Can use max or min as prefix.
 */


function applyMediaQuery(query, ecWidth, ecHeight) {
  var realMap = {
    width: ecWidth,
    height: ecHeight,
    aspectratio: ecWidth / ecHeight // lowser case for convenientce.

  };
  var applicatable = true;
  zrUtil.each(query, function (value, attr) {
    var matched = attr.match(QUERY_REG);

    if (!matched || !matched[1] || !matched[2]) {
      return;
    }

    var operator = matched[1];
    var realAttr = matched[2].toLowerCase();

    if (!compare(realMap[realAttr], value, operator)) {
      applicatable = false;
    }
  });
  return applicatable;
}

function compare(real, expect, operator) {
  if (operator === 'min') {
    return real >= expect;
  } else if (operator === 'max') {
    return real <= expect;
  } else {
    // Equals
    return real === expect;
  }
}

function indicesEquals(indices1, indices2) {
  // indices is always order by asc and has only finite number.
  return indices1.join(',') === indices2.join(',');
}
/**
 * Consider case:
 * `chart.setOption(opt1);`
 * Then user do some interaction like dataZoom, dataView changing.
 * `chart.setOption(opt2);`
 * Then user press 'reset button' in toolbox.
 *
 * After doing that all of the interaction effects should be reset, the
 * chart should be the same as the result of invoke
 * `chart.setOption(opt1); chart.setOption(opt2);`.
 *
 * Although it is not able ensure that
 * `chart.setOption(opt1); chart.setOption(opt2);` is equivalents to
 * `chart.setOption(merge(opt1, opt2));` exactly,
 * this might be the only simple way to implement that feature.
 *
 * MEMO: We've considered some other approaches:
 * 1. Each model handle its self restoration but not uniform treatment.
 *     (Too complex in logic and error-prone)
 * 2. Use a shadow ecModel. (Performace expensive)
 */


function mergeOption(oldOption, newOption) {
  newOption = newOption || {};
  each(newOption, function (newCptOpt, mainType) {
    if (newCptOpt == null) {
      return;
    }

    var oldCptOpt = oldOption[mainType];

    if (!ComponentModel.hasClass(mainType)) {
      oldOption[mainType] = merge(oldCptOpt, newCptOpt, true);
    } else {
      newCptOpt = modelUtil.normalizeToArray(newCptOpt);
      oldCptOpt = modelUtil.normalizeToArray(oldCptOpt);
      var mapResult = modelUtil.mappingToExists(oldCptOpt, newCptOpt);
      oldOption[mainType] = map(mapResult, function (item) {
        return item.option && item.exist ? merge(item.exist, item.option, true) : item.exist || item.option;
      });
    }
  });
}

var _default = OptionManager;
module.exports = _default;

/***/ }),

/***/ "d15d":
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

var createHashMap = _util.createHashMap;
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
// (1) [Caution]: the logic is correct based on the premises:
//     data processing stage is blocked in stream.
//     See <module:echarts/stream/Scheduler#performDataProcessorTasks>
// (2) Only register once when import repeatly.
//     Should be executed after series filtered and before stack calculation.
function _default(ecModel) {
  var stackInfoMap = createHashMap();
  ecModel.eachSeries(function (seriesModel) {
    var stack = seriesModel.get('stack'); // Compatibal: when `stack` is set as '', do not stack.

    if (stack) {
      var stackInfoList = stackInfoMap.get(stack) || stackInfoMap.set(stack, []);
      var data = seriesModel.getData();
      var stackInfo = {
        // Used for calculate axis extent automatically.
        stackResultDimension: data.getCalculationInfo('stackResultDimension'),
        stackedOverDimension: data.getCalculationInfo('stackedOverDimension'),
        stackedDimension: data.getCalculationInfo('stackedDimension'),
        stackedByDimension: data.getCalculationInfo('stackedByDimension'),
        isStackedByIndex: data.getCalculationInfo('isStackedByIndex'),
        data: data,
        seriesModel: seriesModel
      }; // If stacked on axis that do not support data stack.

      if (!stackInfo.stackedDimension || !(stackInfo.isStackedByIndex || stackInfo.stackedByDimension)) {
        return;
      }

      stackInfoList.length && data.setCalculationInfo('stackedOnSeries', stackInfoList[stackInfoList.length - 1].seriesModel);
      stackInfoList.push(stackInfo);
    }
  });
  stackInfoMap.each(calculateStack);
}

function calculateStack(stackInfoList) {
  each(stackInfoList, function (targetStackInfo, idxInStack) {
    var resultVal = [];
    var resultNaN = [NaN, NaN];
    var dims = [targetStackInfo.stackResultDimension, targetStackInfo.stackedOverDimension];
    var targetData = targetStackInfo.data;
    var isStackedByIndex = targetStackInfo.isStackedByIndex; // Should not write on raw data, because stack series model list changes
    // depending on legend selection.

    var newData = targetData.map(dims, function (v0, v1, dataIndex) {
      var sum = targetData.get(targetStackInfo.stackedDimension, dataIndex); // Consider `connectNulls` of line area, if value is NaN, stackedOver
      // should also be NaN, to draw a appropriate belt area.

      if (isNaN(sum)) {
        return resultNaN;
      }

      var byValue;
      var stackedDataRawIndex;

      if (isStackedByIndex) {
        stackedDataRawIndex = targetData.getRawIndex(dataIndex);
      } else {
        byValue = targetData.get(targetStackInfo.stackedByDimension, dataIndex);
      } // If stackOver is NaN, chart view will render point on value start.


      var stackedOver = NaN;

      for (var j = idxInStack - 1; j >= 0; j--) {
        var stackInfo = stackInfoList[j]; // Has been optimized by inverted indices on `stackedByDimension`.

        if (!isStackedByIndex) {
          stackedDataRawIndex = stackInfo.data.rawIndexOf(stackInfo.stackedByDimension, byValue);
        }

        if (stackedDataRawIndex >= 0) {
          var val = stackInfo.data.getByRawIndex(stackInfo.stackResultDimension, stackedDataRawIndex); // Considering positive stack, negative stack and empty data

          if (sum >= 0 && val > 0 || // Positive stack
          sum <= 0 && val < 0 // Negative stack
          ) {
              sum += val;
              stackedOver = val;
              break;
            }
        }
      }

      resultVal[0] = sum;
      resultVal[1] = stackedOver;
      return resultVal;
    });
    targetData.hostModel.setData(newData); // Update for consequent calculation

    targetStackInfo.data = newData;
  });
}

module.exports = _default;

/***/ }),

/***/ "d3f4":
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
function _default(seriesType) {
  return {
    seriesType: seriesType,
    reset: function (seriesModel, ecModel) {
      var legendModels = ecModel.findComponents({
        mainType: 'legend'
      });

      if (!legendModels || !legendModels.length) {
        return;
      }

      var data = seriesModel.getData();
      data.filterSelf(function (idx) {
        var name = data.getName(idx); // If in any legend component the status is not selected.

        for (var i = 0; i < legendModels.length; i++) {
          if (!legendModels[i].isSelected(name)) {
            return false;
          }
        }

        return true;
      });
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "de1c":
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
var _default = {
  getBoxLayoutParams: function () {
    return {
      left: this.get('left'),
      top: this.get('top'),
      right: this.get('right'),
      bottom: this.get('bottom'),
      width: this.get('width'),
      height: this.get('height')
    };
  }
};
module.exports = _default;

/***/ }),

/***/ "e0d8":
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

var clazzUtil = __webpack_require__("625e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
 * // Scale class management
 * @module echarts/scale/Scale
 */

/**
 * @param {Object} [setting]
 */
function Scale(setting) {
  this._setting = setting || {};
  /**
   * Extent
   * @type {Array.<number>}
   * @protected
   */

  this._extent = [Infinity, -Infinity];
  /**
   * Step is calculated in adjustExtent
   * @type {Array.<number>}
   * @protected
   */

  this._interval = 0;
  this.init && this.init.apply(this, arguments);
}
/**
 * Parse input val to valid inner number.
 * @param {*} val
 * @return {number}
 */


Scale.prototype.parse = function (val) {
  // Notice: This would be a trap here, If the implementation
  // of this method depends on extent, and this method is used
  // before extent set (like in dataZoom), it would be wrong.
  // Nevertheless, parse does not depend on extent generally.
  return val;
};

Scale.prototype.getSetting = function (name) {
  return this._setting[name];
};

Scale.prototype.contain = function (val) {
  var extent = this._extent;
  return val >= extent[0] && val <= extent[1];
};
/**
 * Normalize value to linear [0, 1], return 0.5 if extent span is 0
 * @param {number} val
 * @return {number}
 */


Scale.prototype.normalize = function (val) {
  var extent = this._extent;

  if (extent[1] === extent[0]) {
    return 0.5;
  }

  return (val - extent[0]) / (extent[1] - extent[0]);
};
/**
 * Scale normalized value
 * @param {number} val
 * @return {number}
 */


Scale.prototype.scale = function (val) {
  var extent = this._extent;
  return val * (extent[1] - extent[0]) + extent[0];
};
/**
 * Set extent from data
 * @param {Array.<number>} other
 */


Scale.prototype.unionExtent = function (other) {
  var extent = this._extent;
  other[0] < extent[0] && (extent[0] = other[0]);
  other[1] > extent[1] && (extent[1] = other[1]); // not setExtent because in log axis it may transformed to power
  // this.setExtent(extent[0], extent[1]);
};
/**
 * Set extent from data
 * @param {module:echarts/data/List} data
 * @param {string} dim
 */


Scale.prototype.unionExtentFromData = function (data, dim) {
  this.unionExtent(data.getApproximateExtent(dim));
};
/**
 * Get extent
 * @return {Array.<number>}
 */


Scale.prototype.getExtent = function () {
  return this._extent.slice();
};
/**
 * Set extent
 * @param {number} start
 * @param {number} end
 */


Scale.prototype.setExtent = function (start, end) {
  var thisExtent = this._extent;

  if (!isNaN(start)) {
    thisExtent[0] = start;
  }

  if (!isNaN(end)) {
    thisExtent[1] = end;
  }
};
/**
 * When axis extent depends on data and no data exists,
 * axis ticks should not be drawn, which is named 'blank'.
 */


Scale.prototype.isBlank = function () {
  return this._isBlank;
},
/**
 * When axis extent depends on data and no data exists,
 * axis ticks should not be drawn, which is named 'blank'.
 */
Scale.prototype.setBlank = function (isBlank) {
  this._isBlank = isBlank;
};
/**
 * @abstract
 * @param {*} tick
 * @return {string} label of the tick.
 */

Scale.prototype.getLabel = null;
clazzUtil.enableClassExtend(Scale);
clazzUtil.enableClassManagement(Scale, {
  registerWhenExtend: true
});
var _default = Scale;
module.exports = _default;

/***/ }),

/***/ "e47b":
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

var _model = __webpack_require__("e0d3");

var makeInner = _model.makeInner;
var normalizeToArray = _model.normalizeToArray;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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

function getNearestColorPalette(colors, requestColorNum) {
  var paletteNum = colors.length; // TODO colors must be in order

  for (var i = 0; i < paletteNum; i++) {
    if (colors[i].length > requestColorNum) {
      return colors[i];
    }
  }

  return colors[paletteNum - 1];
}

var _default = {
  clearColorPalette: function () {
    inner(this).colorIdx = 0;
    inner(this).colorNameMap = {};
  },

  /**
   * @param {string} name MUST NOT be null/undefined. Otherwise call this function
   *                 twise with the same parameters will get different result.
   * @param {Object} [scope=this]
   * @param {Object} [requestColorNum]
   * @return {string} color string.
   */
  getColorFromPalette: function (name, scope, requestColorNum) {
    scope = scope || this;
    var scopeFields = inner(scope);
    var colorIdx = scopeFields.colorIdx || 0;
    var colorNameMap = scopeFields.colorNameMap = scopeFields.colorNameMap || {}; // Use `hasOwnProperty` to avoid conflict with Object.prototype.

    if (colorNameMap.hasOwnProperty(name)) {
      return colorNameMap[name];
    }

    var defaultColorPalette = normalizeToArray(this.get('color', true));
    var layeredColorPalette = this.get('colorLayer', true);
    var colorPalette = requestColorNum == null || !layeredColorPalette ? defaultColorPalette : getNearestColorPalette(layeredColorPalette, requestColorNum); // In case can't find in layered color palette.

    colorPalette = colorPalette || defaultColorPalette;

    if (!colorPalette || !colorPalette.length) {
      return;
    }

    var color = colorPalette[colorIdx];

    if (name) {
      colorNameMap[name] = color;
    }

    scopeFields.colorIdx = (colorIdx + 1) % colorPalette.length;
    return color;
  }
};
module.exports = _default;

/***/ }),

/***/ "fb05":
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
var isArray = _util.isArray;
var isObject = _util.isObject;

var compatStyle = __webpack_require__("26e1");

var _model = __webpack_require__("e0d3");

var normalizeToArray = _model.normalizeToArray;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Compatitable with 2.0
function get(opt, path) {
  path = path.split(',');
  var obj = opt;

  for (var i = 0; i < path.length; i++) {
    obj = obj && obj[path[i]];

    if (obj == null) {
      break;
    }
  }

  return obj;
}

function set(opt, path, val, overwrite) {
  path = path.split(',');
  var obj = opt;
  var key;

  for (var i = 0; i < path.length - 1; i++) {
    key = path[i];

    if (obj[key] == null) {
      obj[key] = {};
    }

    obj = obj[key];
  }

  if (overwrite || obj[path[i]] == null) {
    obj[path[i]] = val;
  }
}

function compatLayoutProperties(option) {
  each(LAYOUT_PROPERTIES, function (prop) {
    if (prop[0] in option && !(prop[1] in option)) {
      option[prop[1]] = option[prop[0]];
    }
  });
}

var LAYOUT_PROPERTIES = [['x', 'left'], ['y', 'top'], ['x2', 'right'], ['y2', 'bottom']];
var COMPATITABLE_COMPONENTS = ['grid', 'geo', 'parallel', 'legend', 'toolbox', 'title', 'visualMap', 'dataZoom', 'timeline'];

function _default(option, isTheme) {
  compatStyle(option, isTheme); // Make sure series array for model initialization.

  option.series = normalizeToArray(option.series);
  each(option.series, function (seriesOpt) {
    if (!isObject(seriesOpt)) {
      return;
    }

    var seriesType = seriesOpt.type;

    if (seriesType === 'line') {
      if (seriesOpt.clipOverflow != null) {
        seriesOpt.clip = seriesOpt.clipOverflow;
      }
    } else if (seriesType === 'pie' || seriesType === 'gauge') {
      if (seriesOpt.clockWise != null) {
        seriesOpt.clockwise = seriesOpt.clockWise;
      }
    } else if (seriesType === 'gauge') {
      var pointerColor = get(seriesOpt, 'pointer.color');
      pointerColor != null && set(seriesOpt, 'itemStyle.color', pointerColor);
    }

    compatLayoutProperties(seriesOpt);
  }); // dataRange has changed to visualMap

  if (option.dataRange) {
    option.visualMap = option.dataRange;
  }

  each(COMPATITABLE_COMPONENTS, function (componentName) {
    var options = option[componentName];

    if (options) {
      if (!isArray(options)) {
        options = [options];
      }

      each(options, function (option) {
        compatLayoutProperties(option);
      });
    }
  });
}

module.exports = _default;

/***/ }),

/***/ "fdde":
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
var samplers = {
  average: function (frame) {
    var sum = 0;
    var count = 0;

    for (var i = 0; i < frame.length; i++) {
      if (!isNaN(frame[i])) {
        sum += frame[i];
        count++;
      }
    } // Return NaN if count is 0


    return count === 0 ? NaN : sum / count;
  },
  sum: function (frame) {
    var sum = 0;

    for (var i = 0; i < frame.length; i++) {
      // Ignore NaN
      sum += frame[i] || 0;
    }

    return sum;
  },
  max: function (frame) {
    var max = -Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] > max && (max = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(max) ? max : NaN;
  },
  min: function (frame) {
    var min = Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] < min && (min = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(min) ? min : NaN;
  },
  // TODO
  // Median
  nearest: function (frame) {
    return frame[0];
  }
};

var indexSampler = function (frame, value) {
  return Math.round(frame.length / 2);
};

function _default(seriesType) {
  return {
    seriesType: seriesType,
    modifyOutputEnd: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var sampling = seriesModel.get('sampling');
      var coordSys = seriesModel.coordinateSystem; // Only cartesian2d support down sampling

      if (coordSys.type === 'cartesian2d' && sampling) {
        var baseAxis = coordSys.getBaseAxis();
        var valueAxis = coordSys.getOtherAxis(baseAxis);
        var extent = baseAxis.getExtent(); // Coordinste system has been resized

        var size = extent[1] - extent[0];
        var rate = Math.round(data.count() / size);

        if (rate > 1) {
          var sampler;

          if (typeof sampling === 'string') {
            sampler = samplers[sampling];
          } else if (typeof sampling === 'function') {
            sampler = sampling;
          }

          if (sampler) {
            // Only support sample the first dim mapped from value axis.
            seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
          }
        }
      }
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "fe21":
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
var PATH_COLOR = ['textStyle', 'color'];
var _default = {
  /**
   * Get color property or get color from option.textStyle.color
   * @param {boolean} [isEmphasis]
   * @return {string}
   */
  getTextColor: function (isEmphasis) {
    var ecModel = this.ecModel;
    return this.getShallow('color') || (!isEmphasis && ecModel ? ecModel.get(PATH_COLOR) : null);
  },

  /**
   * Create font string from fontStyle, fontWeight, fontSize, fontFamily
   * @return {string}
   */
  getFont: function () {
    return graphicUtil.getFont({
      fontStyle: this.getShallow('fontStyle'),
      fontWeight: this.getShallow('fontWeight'),
      fontSize: this.getShallow('fontSize'),
      fontFamily: this.getShallow('fontFamily')
    }, this.ecModel);
  },
  getTextRect: function (text) {
    return textContain.getBoundingRect(text, this.getFont(), this.getShallow('align'), this.getShallow('verticalAlign') || this.getShallow('baseline'), this.getShallow('padding'), this.getShallow('lineHeight'), this.getShallow('rich'), this.getShallow('truncateText'));
  }
};
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~ef4b7b69.dce3f04e.js.map