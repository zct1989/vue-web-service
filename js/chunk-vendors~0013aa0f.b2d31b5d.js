(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~0013aa0f"],{

/***/ "2b8c":
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

/**
 * @file Visual solution, for consistent option specification.
 */
var each = zrUtil.each;

function hasKeys(obj) {
  if (obj) {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        return true;
      }
    }
  }
}
/**
 * @param {Object} option
 * @param {Array.<string>} stateList
 * @param {Function} [supplementVisualOption]
 * @return {Object} visualMappings <state, <visualType, module:echarts/visual/VisualMapping>>
 */


function createVisualMappings(option, stateList, supplementVisualOption) {
  var visualMappings = {};
  each(stateList, function (state) {
    var mappings = visualMappings[state] = createMappings();
    each(option[state], function (visualData, visualType) {
      if (!VisualMapping.isValidType(visualType)) {
        return;
      }

      var mappingOption = {
        type: visualType,
        visual: visualData
      };
      supplementVisualOption && supplementVisualOption(mappingOption, state);
      mappings[visualType] = new VisualMapping(mappingOption); // Prepare a alpha for opacity, for some case that opacity
      // is not supported, such as rendering using gradient color.

      if (visualType === 'opacity') {
        mappingOption = zrUtil.clone(mappingOption);
        mappingOption.type = 'colorAlpha';
        mappings.__hidden.__alphaForOpacity = new VisualMapping(mappingOption);
      }
    });
  });
  return visualMappings;

  function createMappings() {
    var Creater = function () {}; // Make sure hidden fields will not be visited by
    // object iteration (with hasOwnProperty checking).


    Creater.prototype.__hidden = Creater.prototype;
    var obj = new Creater();
    return obj;
  }
}
/**
 * @param {Object} thisOption
 * @param {Object} newOption
 * @param {Array.<string>} keys
 */


function replaceVisualOption(thisOption, newOption, keys) {
  // Visual attributes merge is not supported, otherwise it
  // brings overcomplicated merge logic. See #2853. So if
  // newOption has anyone of these keys, all of these keys
  // will be reset. Otherwise, all keys remain.
  var has;
  zrUtil.each(keys, function (key) {
    if (newOption.hasOwnProperty(key) && hasKeys(newOption[key])) {
      has = true;
    }
  });
  has && zrUtil.each(keys, function (key) {
    if (newOption.hasOwnProperty(key) && hasKeys(newOption[key])) {
      thisOption[key] = zrUtil.clone(newOption[key]);
    } else {
      delete thisOption[key];
    }
  });
}
/**
 * @param {Array.<string>} stateList
 * @param {Object} visualMappings <state, Object.<visualType, module:echarts/visual/VisualMapping>>
 * @param {module:echarts/data/List} list
 * @param {Function} getValueState param: valueOrIndex, return: state.
 * @param {object} [scope] Scope for getValueState
 * @param {string} [dimension] Concrete dimension, if used.
 */
// ???! handle brush?


function applyVisual(stateList, visualMappings, data, getValueState, scope, dimension) {
  var visualTypesMap = {};
  zrUtil.each(stateList, function (state) {
    var visualTypes = VisualMapping.prepareVisualTypes(visualMappings[state]);
    visualTypesMap[state] = visualTypes;
  });
  var dataIndex;

  function getVisual(key) {
    return data.getItemVisual(dataIndex, key);
  }

  function setVisual(key, value) {
    data.setItemVisual(dataIndex, key, value);
  }

  if (dimension == null) {
    data.each(eachItem);
  } else {
    data.each([dimension], eachItem);
  }

  function eachItem(valueOrIndex, index) {
    dataIndex = dimension == null ? valueOrIndex : index;
    var rawDataItem = data.getRawDataItem(dataIndex); // Consider performance

    if (rawDataItem && rawDataItem.visualMap === false) {
      return;
    }

    var valueState = getValueState.call(scope, valueOrIndex);
    var mappings = visualMappings[valueState];
    var visualTypes = visualTypesMap[valueState];

    for (var i = 0, len = visualTypes.length; i < len; i++) {
      var type = visualTypes[i];
      mappings[type] && mappings[type].applyVisual(valueOrIndex, getVisual, setVisual);
    }
  }
}
/**
 * @param {module:echarts/data/List} data
 * @param {Array.<string>} stateList
 * @param {Object} visualMappings <state, Object.<visualType, module:echarts/visual/VisualMapping>>
 * @param {Function} getValueState param: valueOrIndex, return: state.
 * @param {number} [dim] dimension or dimension index.
 */


function incrementalApplyVisual(stateList, visualMappings, getValueState, dim) {
  var visualTypesMap = {};
  zrUtil.each(stateList, function (state) {
    var visualTypes = VisualMapping.prepareVisualTypes(visualMappings[state]);
    visualTypesMap[state] = visualTypes;
  });

  function progress(params, data) {
    if (dim != null) {
      dim = data.getDimension(dim);
    }

    function getVisual(key) {
      return data.getItemVisual(dataIndex, key);
    }

    function setVisual(key, value) {
      data.setItemVisual(dataIndex, key, value);
    }

    var dataIndex;

    while ((dataIndex = params.next()) != null) {
      var rawDataItem = data.getRawDataItem(dataIndex); // Consider performance

      if (rawDataItem && rawDataItem.visualMap === false) {
        continue;
      }

      var value = dim != null ? data.get(dim, dataIndex, true) : dataIndex;
      var valueState = getValueState(value);
      var mappings = visualMappings[valueState];
      var visualTypes = visualTypesMap[valueState];

      for (var i = 0, len = visualTypes.length; i < len; i++) {
        var type = visualTypes[i];
        mappings[type] && mappings[type].applyVisual(value, getVisual, setVisual);
      }
    }
  }

  return {
    progress: progress
  };
}

exports.createVisualMappings = createVisualMappings;
exports.replaceVisualOption = replaceVisualOption;
exports.applyVisual = applyVisual;
exports.incrementalApplyVisual = incrementalApplyVisual;

/***/ }),

/***/ "5f14":
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

var _number = __webpack_require__("3842");

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
var each = zrUtil.each;
var isObject = zrUtil.isObject;
var CATEGORY_DEFAULT_VISUAL_INDEX = -1;
/**
 * @param {Object} option
 * @param {string} [option.type] See visualHandlers.
 * @param {string} [option.mappingMethod] 'linear' or 'piecewise' or 'category' or 'fixed'
 * @param {Array.<number>=} [option.dataExtent] [minExtent, maxExtent],
 *                                              required when mappingMethod is 'linear'
 * @param {Array.<Object>=} [option.pieceList] [
 *                                             {value: someValue},
 *                                             {interval: [min1, max1], visual: {...}},
 *                                             {interval: [min2, max2]}
 *                                             ],
 *                                            required when mappingMethod is 'piecewise'.
 *                                            Visual for only each piece can be specified.
 * @param {Array.<string|Object>=} [option.categories] ['cate1', 'cate2']
 *                                            required when mappingMethod is 'category'.
 *                                            If no option.categories, categories is set
 *                                            as [0, 1, 2, ...].
 * @param {boolean} [option.loop=false] Whether loop mapping when mappingMethod is 'category'.
 * @param {(Array|Object|*)} [option.visual]  Visual data.
 *                                            when mappingMethod is 'category',
 *                                            visual data can be array or object
 *                                            (like: {cate1: '#222', none: '#fff'})
 *                                            or primary types (which represents
 *                                            defualt category visual), otherwise visual
 *                                            can be array or primary (which will be
 *                                            normalized to array).
 *
 */

var VisualMapping = function (option) {
  var mappingMethod = option.mappingMethod;
  var visualType = option.type;
  /**
   * @readOnly
   * @type {Object}
   */

  var thisOption = this.option = zrUtil.clone(option);
  /**
   * @readOnly
   * @type {string}
   */

  this.type = visualType;
  /**
   * @readOnly
   * @type {string}
   */

  this.mappingMethod = mappingMethod;
  /**
   * @private
   * @type {Function}
   */

  this._normalizeData = normalizers[mappingMethod];
  var visualHandler = visualHandlers[visualType];
  /**
   * @public
   * @type {Function}
   */

  this.applyVisual = visualHandler.applyVisual;
  /**
   * @public
   * @type {Function}
   */

  this.getColorMapper = visualHandler.getColorMapper;
  /**
   * @private
   * @type {Function}
   */

  this._doMap = visualHandler._doMap[mappingMethod];

  if (mappingMethod === 'piecewise') {
    normalizeVisualRange(thisOption);
    preprocessForPiecewise(thisOption);
  } else if (mappingMethod === 'category') {
    thisOption.categories ? preprocessForSpecifiedCategory(thisOption) // categories is ordinal when thisOption.categories not specified,
    // which need no more preprocess except normalize visual.
    : normalizeVisualRange(thisOption, true);
  } else {
    // mappingMethod === 'linear' or 'fixed'
    zrUtil.assert(mappingMethod !== 'linear' || thisOption.dataExtent);
    normalizeVisualRange(thisOption);
  }
};

VisualMapping.prototype = {
  constructor: VisualMapping,
  mapValueToVisual: function (value) {
    var normalized = this._normalizeData(value);

    return this._doMap(normalized, value);
  },
  getNormalizer: function () {
    return zrUtil.bind(this._normalizeData, this);
  }
};
var visualHandlers = VisualMapping.visualHandlers = {
  color: {
    applyVisual: makeApplyVisual('color'),

    /**
     * Create a mapper function
     * @return {Function}
     */
    getColorMapper: function () {
      var thisOption = this.option;
      return zrUtil.bind(thisOption.mappingMethod === 'category' ? function (value, isNormalized) {
        !isNormalized && (value = this._normalizeData(value));
        return doMapCategory.call(this, value);
      } : function (value, isNormalized, out) {
        // If output rgb array
        // which will be much faster and useful in pixel manipulation
        var returnRGBArray = !!out;
        !isNormalized && (value = this._normalizeData(value));
        out = zrColor.fastLerp(value, thisOption.parsedVisual, out);
        return returnRGBArray ? out : zrColor.stringify(out, 'rgba');
      }, this);
    },
    _doMap: {
      linear: function (normalized) {
        return zrColor.stringify(zrColor.fastLerp(normalized, this.option.parsedVisual), 'rgba');
      },
      category: doMapCategory,
      piecewise: function (normalized, value) {
        var result = getSpecifiedVisual.call(this, value);

        if (result == null) {
          result = zrColor.stringify(zrColor.fastLerp(normalized, this.option.parsedVisual), 'rgba');
        }

        return result;
      },
      fixed: doMapFixed
    }
  },
  colorHue: makePartialColorVisualHandler(function (color, value) {
    return zrColor.modifyHSL(color, value);
  }),
  colorSaturation: makePartialColorVisualHandler(function (color, value) {
    return zrColor.modifyHSL(color, null, value);
  }),
  colorLightness: makePartialColorVisualHandler(function (color, value) {
    return zrColor.modifyHSL(color, null, null, value);
  }),
  colorAlpha: makePartialColorVisualHandler(function (color, value) {
    return zrColor.modifyAlpha(color, value);
  }),
  opacity: {
    applyVisual: makeApplyVisual('opacity'),
    _doMap: makeDoMap([0, 1])
  },
  liftZ: {
    applyVisual: makeApplyVisual('liftZ'),
    _doMap: {
      linear: doMapFixed,
      category: doMapFixed,
      piecewise: doMapFixed,
      fixed: doMapFixed
    }
  },
  symbol: {
    applyVisual: function (value, getter, setter) {
      var symbolCfg = this.mapValueToVisual(value);

      if (zrUtil.isString(symbolCfg)) {
        setter('symbol', symbolCfg);
      } else if (isObject(symbolCfg)) {
        for (var name in symbolCfg) {
          if (symbolCfg.hasOwnProperty(name)) {
            setter(name, symbolCfg[name]);
          }
        }
      }
    },
    _doMap: {
      linear: doMapToArray,
      category: doMapCategory,
      piecewise: function (normalized, value) {
        var result = getSpecifiedVisual.call(this, value);

        if (result == null) {
          result = doMapToArray.call(this, normalized);
        }

        return result;
      },
      fixed: doMapFixed
    }
  },
  symbolSize: {
    applyVisual: makeApplyVisual('symbolSize'),
    _doMap: makeDoMap([0, 1])
  }
};

function preprocessForPiecewise(thisOption) {
  var pieceList = thisOption.pieceList;
  thisOption.hasSpecialVisual = false;
  zrUtil.each(pieceList, function (piece, index) {
    piece.originIndex = index; // piece.visual is "result visual value" but not
    // a visual range, so it does not need to be normalized.

    if (piece.visual != null) {
      thisOption.hasSpecialVisual = true;
    }
  });
}

function preprocessForSpecifiedCategory(thisOption) {
  // Hash categories.
  var categories = thisOption.categories;
  var visual = thisOption.visual;
  var categoryMap = thisOption.categoryMap = {};
  each(categories, function (cate, index) {
    categoryMap[cate] = index;
  }); // Process visual map input.

  if (!zrUtil.isArray(visual)) {
    var visualArr = [];

    if (zrUtil.isObject(visual)) {
      each(visual, function (v, cate) {
        var index = categoryMap[cate];
        visualArr[index != null ? index : CATEGORY_DEFAULT_VISUAL_INDEX] = v;
      });
    } else {
      // Is primary type, represents default visual.
      visualArr[CATEGORY_DEFAULT_VISUAL_INDEX] = visual;
    }

    visual = setVisualToOption(thisOption, visualArr);
  } // Remove categories that has no visual,
  // then we can mapping them to CATEGORY_DEFAULT_VISUAL_INDEX.


  for (var i = categories.length - 1; i >= 0; i--) {
    if (visual[i] == null) {
      delete categoryMap[categories[i]];
      categories.pop();
    }
  }
}

function normalizeVisualRange(thisOption, isCategory) {
  var visual = thisOption.visual;
  var visualArr = [];

  if (zrUtil.isObject(visual)) {
    each(visual, function (v) {
      visualArr.push(v);
    });
  } else if (visual != null) {
    visualArr.push(visual);
  }

  var doNotNeedPair = {
    color: 1,
    symbol: 1
  };

  if (!isCategory && visualArr.length === 1 && !doNotNeedPair.hasOwnProperty(thisOption.type)) {
    // Do not care visualArr.length === 0, which is illegal.
    visualArr[1] = visualArr[0];
  }

  setVisualToOption(thisOption, visualArr);
}

function makePartialColorVisualHandler(applyValue) {
  return {
    applyVisual: function (value, getter, setter) {
      value = this.mapValueToVisual(value); // Must not be array value

      setter('color', applyValue(getter('color'), value));
    },
    _doMap: makeDoMap([0, 1])
  };
}

function doMapToArray(normalized) {
  var visual = this.option.visual;
  return visual[Math.round(linearMap(normalized, [0, 1], [0, visual.length - 1], true))] || {};
}

function makeApplyVisual(visualType) {
  return function (value, getter, setter) {
    setter(visualType, this.mapValueToVisual(value));
  };
}

function doMapCategory(normalized) {
  var visual = this.option.visual;
  return visual[this.option.loop && normalized !== CATEGORY_DEFAULT_VISUAL_INDEX ? normalized % visual.length : normalized];
}

function doMapFixed() {
  return this.option.visual[0];
}

function makeDoMap(sourceExtent) {
  return {
    linear: function (normalized) {
      return linearMap(normalized, sourceExtent, this.option.visual, true);
    },
    category: doMapCategory,
    piecewise: function (normalized, value) {
      var result = getSpecifiedVisual.call(this, value);

      if (result == null) {
        result = linearMap(normalized, sourceExtent, this.option.visual, true);
      }

      return result;
    },
    fixed: doMapFixed
  };
}

function getSpecifiedVisual(value) {
  var thisOption = this.option;
  var pieceList = thisOption.pieceList;

  if (thisOption.hasSpecialVisual) {
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList);
    var piece = pieceList[pieceIndex];

    if (piece && piece.visual) {
      return piece.visual[this.type];
    }
  }
}

function setVisualToOption(thisOption, visualArr) {
  thisOption.visual = visualArr;

  if (thisOption.type === 'color') {
    thisOption.parsedVisual = zrUtil.map(visualArr, function (item) {
      return zrColor.parse(item);
    });
  }

  return visualArr;
}
/**
 * Normalizers by mapping methods.
 */


var normalizers = {
  linear: function (value) {
    return linearMap(value, this.option.dataExtent, [0, 1], true);
  },
  piecewise: function (value) {
    var pieceList = this.option.pieceList;
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList, true);

    if (pieceIndex != null) {
      return linearMap(pieceIndex, [0, pieceList.length - 1], [0, 1], true);
    }
  },
  category: function (value) {
    var index = this.option.categories ? this.option.categoryMap[value] : value; // ordinal

    return index == null ? CATEGORY_DEFAULT_VISUAL_INDEX : index;
  },
  fixed: zrUtil.noop
};
/**
 * List available visual types.
 *
 * @public
 * @return {Array.<string>}
 */

VisualMapping.listVisualTypes = function () {
  var visualTypes = [];
  zrUtil.each(visualHandlers, function (handler, key) {
    visualTypes.push(key);
  });
  return visualTypes;
};
/**
 * @public
 */


VisualMapping.addVisualHandler = function (name, handler) {
  visualHandlers[name] = handler;
};
/**
 * @public
 */


VisualMapping.isValidType = function (visualType) {
  return visualHandlers.hasOwnProperty(visualType);
};
/**
 * Convinent method.
 * Visual can be Object or Array or primary type.
 *
 * @public
 */


VisualMapping.eachVisual = function (visual, callback, context) {
  if (zrUtil.isObject(visual)) {
    zrUtil.each(visual, callback, context);
  } else {
    callback.call(context, visual);
  }
};

VisualMapping.mapVisual = function (visual, callback, context) {
  var isPrimary;
  var newVisual = zrUtil.isArray(visual) ? [] : zrUtil.isObject(visual) ? {} : (isPrimary = true, null);
  VisualMapping.eachVisual(visual, function (v, key) {
    var newVal = callback.call(context, v, key);
    isPrimary ? newVisual = newVal : newVisual[key] = newVal;
  });
  return newVisual;
};
/**
 * @public
 * @param {Object} obj
 * @return {Object} new object containers visual values.
 *                 If no visuals, return null.
 */


VisualMapping.retrieveVisuals = function (obj) {
  var ret = {};
  var hasVisual;
  obj && each(visualHandlers, function (h, visualType) {
    if (obj.hasOwnProperty(visualType)) {
      ret[visualType] = obj[visualType];
      hasVisual = true;
    }
  });
  return hasVisual ? ret : null;
};
/**
 * Give order to visual types, considering colorSaturation, colorAlpha depends on color.
 *
 * @public
 * @param {(Object|Array)} visualTypes If Object, like: {color: ..., colorSaturation: ...}
 *                                     IF Array, like: ['color', 'symbol', 'colorSaturation']
 * @return {Array.<string>} Sorted visual types.
 */


VisualMapping.prepareVisualTypes = function (visualTypes) {
  if (isObject(visualTypes)) {
    var types = [];
    each(visualTypes, function (item, type) {
      types.push(type);
    });
    visualTypes = types;
  } else if (zrUtil.isArray(visualTypes)) {
    visualTypes = visualTypes.slice();
  } else {
    return [];
  }

  visualTypes.sort(function (type1, type2) {
    // color should be front of colorSaturation, colorAlpha, ...
    // symbol and symbolSize do not matter.
    return type2 === 'color' && type1 !== 'color' && type1.indexOf('color') === 0 ? 1 : -1;
  });
  return visualTypes;
};
/**
 * 'color', 'colorSaturation', 'colorAlpha', ... are depends on 'color'.
 * Other visuals are only depends on themself.
 *
 * @public
 * @param {string} visualType1
 * @param {string} visualType2
 * @return {boolean}
 */


VisualMapping.dependsOn = function (visualType1, visualType2) {
  return visualType2 === 'color' ? !!(visualType1 && visualType1.indexOf(visualType2) === 0) : visualType1 === visualType2;
};
/**
 * @param {number} value
 * @param {Array.<Object>} pieceList [{value: ..., interval: [min, max]}, ...]
 *                         Always from small to big.
 * @param {boolean} [findClosestWhenOutside=false]
 * @return {number} index
 */


VisualMapping.findPieceIndex = function (value, pieceList, findClosestWhenOutside) {
  var possibleI;
  var abs = Infinity; // value has the higher priority.

  for (var i = 0, len = pieceList.length; i < len; i++) {
    var pieceValue = pieceList[i].value;

    if (pieceValue != null) {
      if (pieceValue === value // FIXME
      // It is supposed to compare value according to value type of dimension,
      // but currently value type can exactly be string or number.
      // Compromise for numeric-like string (like '12'), especially
      // in the case that visualMap.categories is ['22', '33'].
      || typeof pieceValue === 'string' && pieceValue === value + '') {
        return i;
      }

      findClosestWhenOutside && updatePossible(pieceValue, i);
    }
  }

  for (var i = 0, len = pieceList.length; i < len; i++) {
    var piece = pieceList[i];
    var interval = piece.interval;
    var close = piece.close;

    if (interval) {
      if (interval[0] === -Infinity) {
        if (littleThan(close[1], value, interval[1])) {
          return i;
        }
      } else if (interval[1] === Infinity) {
        if (littleThan(close[0], interval[0], value)) {
          return i;
        }
      } else if (littleThan(close[0], interval[0], value) && littleThan(close[1], value, interval[1])) {
        return i;
      }

      findClosestWhenOutside && updatePossible(interval[0], i);
      findClosestWhenOutside && updatePossible(interval[1], i);
    }
  }

  if (findClosestWhenOutside) {
    return value === Infinity ? pieceList.length - 1 : value === -Infinity ? 0 : possibleI;
  }

  function updatePossible(val, index) {
    var newAbs = Math.abs(val - value);

    if (newAbs < abs) {
      abs = newAbs;
      possibleI = index;
    }
  }
};

function littleThan(close, a, b) {
  return close ? a <= b : a < b;
}

var _default = VisualMapping;
module.exports = _default;

/***/ }),

/***/ "60e3":
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
 * @file Visual mapping.
 */
var visualDefault = {
  /**
   * @public
   */
  get: function (visualType, key, isCategory) {
    var value = zrUtil.clone((defaultOption[visualType] || {})[key]);
    return isCategory ? zrUtil.isArray(value) ? value[value.length - 1] : value : value;
  }
};
var defaultOption = {
  color: {
    active: ['#006edd', '#e0ffff'],
    inactive: ['rgba(0,0,0,0)']
  },
  colorHue: {
    active: [0, 360],
    inactive: [0, 0]
  },
  colorSaturation: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  colorLightness: {
    active: [0.9, 0.5],
    inactive: [0, 0]
  },
  colorAlpha: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  opacity: {
    active: [0.3, 1],
    inactive: [0, 0]
  },
  symbol: {
    active: ['circle', 'roundRect', 'diamond'],
    inactive: ['none']
  },
  symbolSize: {
    active: [10, 50],
    inactive: [0, 0]
  }
};
var _default = visualDefault;
module.exports = _default;

/***/ }),

/***/ "7f96":
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

var isFunction = _util.isFunction;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType, defaultSymbolType, legendSymbol) {
  // Encoding visual for all series include which is filtered for legend drawing
  return {
    seriesType: seriesType,
    // For legend.
    performRawSeries: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var symbolType = seriesModel.get('symbol');
      var symbolSize = seriesModel.get('symbolSize');
      var keepAspect = seriesModel.get('symbolKeepAspect');
      var hasSymbolTypeCallback = isFunction(symbolType);
      var hasSymbolSizeCallback = isFunction(symbolSize);
      var hasCallback = hasSymbolTypeCallback || hasSymbolSizeCallback;
      var seriesSymbol = !hasSymbolTypeCallback && symbolType ? symbolType : defaultSymbolType;
      var seriesSymbolSize = !hasSymbolSizeCallback ? symbolSize : null;
      data.setVisual({
        legendSymbol: legendSymbol || seriesSymbol,
        // If seting callback functions on `symbol` or `symbolSize`, for simplicity and avoiding
        // to bring trouble, we do not pick a reuslt from one of its calling on data item here,
        // but just use the default value. Callback on `symbol` or `symbolSize` is convenient in
        // some cases but generally it is not recommanded.
        symbol: seriesSymbol,
        symbolSize: seriesSymbolSize,
        symbolKeepAspect: keepAspect
      }); // Only visible series has each data be visual encoded

      if (ecModel.isSeriesFiltered(seriesModel)) {
        return;
      }

      function dataEach(data, idx) {
        if (hasCallback) {
          var rawValue = seriesModel.getRawValue(idx);
          var params = seriesModel.getDataParams(idx);
          hasSymbolTypeCallback && data.setItemVisual(idx, 'symbol', symbolType(rawValue, params));
          hasSymbolSizeCallback && data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue, params));
        }

        if (data.hasItemOption) {
          var itemModel = data.getItemModel(idx);
          var itemSymbolType = itemModel.getShallow('symbol', true);
          var itemSymbolSize = itemModel.getShallow('symbolSize', true);
          var itemSymbolKeepAspect = itemModel.getShallow('symbolKeepAspect', true); // If has item symbol

          if (itemSymbolType != null) {
            data.setItemVisual(idx, 'symbol', itemSymbolType);
          }

          if (itemSymbolSize != null) {
            // PENDING Transform symbolSize ?
            data.setItemVisual(idx, 'symbolSize', itemSymbolSize);
          }

          if (itemSymbolKeepAspect != null) {
            data.setItemVisual(idx, 'symbolKeepAspect', itemSymbolKeepAspect);
          }
        }
      }

      return {
        dataEach: data.hasItemOption || hasCallback ? dataEach : null
      };
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "98e7":
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

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Pick color from palette for each data item.
// Applicable for charts that require applying color palette
// in data level (like pie, funnel, chord).
function _default(seriesType) {
  return {
    getTargetSeries: function (ecModel) {
      // Pie and funnel may use diferrent scope
      var paletteScope = {};
      var seiresModelMap = createHashMap();
      ecModel.eachSeriesByType(seriesType, function (seriesModel) {
        seriesModel.__paletteScope = paletteScope;
        seiresModelMap.set(seriesModel.uid, seriesModel);
      });
      return seiresModelMap;
    },
    reset: function (seriesModel, ecModel) {
      var dataAll = seriesModel.getRawData();
      var idxMap = {};
      var data = seriesModel.getData();
      data.each(function (idx) {
        var rawIdx = data.getRawIndex(idx);
        idxMap[rawIdx] = idx;
      });
      dataAll.each(function (rawIdx) {
        var filteredIdx = idxMap[rawIdx]; // If series.itemStyle.normal.color is a function. itemVisual may be encoded

        var singleDataColor = filteredIdx != null && data.getItemVisual(filteredIdx, 'color', true);
        var singleDataBorderColor = filteredIdx != null && data.getItemVisual(filteredIdx, 'borderColor', true);
        var itemModel;

        if (!singleDataColor || !singleDataBorderColor) {
          // FIXME Performance
          itemModel = dataAll.getItemModel(rawIdx);
        }

        if (!singleDataColor) {
          var color = itemModel.get('itemStyle.color') || seriesModel.getColorFromPalette(dataAll.getName(rawIdx) || rawIdx + '', seriesModel.__paletteScope, dataAll.count()); // Data is not filtered

          if (filteredIdx != null) {
            data.setItemVisual(filteredIdx, 'color', color);
          }
        }

        if (!singleDataBorderColor) {
          var borderColor = itemModel.get('itemStyle.borderColor'); // Data is not filtered

          if (filteredIdx != null) {
            data.setItemVisual(filteredIdx, 'borderColor', borderColor);
          }
        }
      });
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "b809":
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

var lang = __webpack_require__("29a8");

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
function _default(dom, ecModel) {
  var ariaModel = ecModel.getModel('aria');

  if (!ariaModel.get('show')) {
    return;
  } else if (ariaModel.get('description')) {
    dom.setAttribute('aria-label', ariaModel.get('description'));
    return;
  }

  var seriesCnt = 0;
  ecModel.eachSeries(function (seriesModel, idx) {
    ++seriesCnt;
  }, this);
  var maxDataCnt = ariaModel.get('data.maxCount') || 10;
  var maxSeriesCnt = ariaModel.get('series.maxCount') || 10;
  var displaySeriesCnt = Math.min(seriesCnt, maxSeriesCnt);
  var ariaLabel;

  if (seriesCnt < 1) {
    // No series, no aria label
    return;
  } else {
    var title = getTitle();

    if (title) {
      ariaLabel = replace(getConfig('general.withTitle'), {
        title: title
      });
    } else {
      ariaLabel = getConfig('general.withoutTitle');
    }

    var seriesLabels = [];
    var prefix = seriesCnt > 1 ? 'series.multiple.prefix' : 'series.single.prefix';
    ariaLabel += replace(getConfig(prefix), {
      seriesCount: seriesCnt
    });
    ecModel.eachSeries(function (seriesModel, idx) {
      if (idx < displaySeriesCnt) {
        var seriesLabel;
        var seriesName = seriesModel.get('name');
        var seriesTpl = 'series.' + (seriesCnt > 1 ? 'multiple' : 'single') + '.';
        seriesLabel = getConfig(seriesName ? seriesTpl + 'withName' : seriesTpl + 'withoutName');
        seriesLabel = replace(seriesLabel, {
          seriesId: seriesModel.seriesIndex,
          seriesName: seriesModel.get('name'),
          seriesType: getSeriesTypeName(seriesModel.subType)
        });
        var data = seriesModel.getData();
        window.data = data;

        if (data.count() > maxDataCnt) {
          // Show part of data
          seriesLabel += replace(getConfig('data.partialData'), {
            displayCnt: maxDataCnt
          });
        } else {
          seriesLabel += getConfig('data.allData');
        }

        var dataLabels = [];

        for (var i = 0; i < data.count(); i++) {
          if (i < maxDataCnt) {
            var name = data.getName(i);
            var value = retrieveRawValue(data, i);
            dataLabels.push(replace(name ? getConfig('data.withName') : getConfig('data.withoutName'), {
              name: name,
              value: value
            }));
          }
        }

        seriesLabel += dataLabels.join(getConfig('data.separator.middle')) + getConfig('data.separator.end');
        seriesLabels.push(seriesLabel);
      }
    });
    ariaLabel += seriesLabels.join(getConfig('series.multiple.separator.middle')) + getConfig('series.multiple.separator.end');
    dom.setAttribute('aria-label', ariaLabel);
  }

  function replace(str, keyValues) {
    if (typeof str !== 'string') {
      return str;
    }

    var result = str;
    zrUtil.each(keyValues, function (value, key) {
      result = result.replace(new RegExp('\\{\\s*' + key + '\\s*\\}', 'g'), value);
    });
    return result;
  }

  function getConfig(path) {
    var userConfig = ariaModel.get(path);

    if (userConfig == null) {
      var pathArr = path.split('.');
      var result = lang.aria;

      for (var i = 0; i < pathArr.length; ++i) {
        result = result[pathArr[i]];
      }

      return result;
    } else {
      return userConfig;
    }
  }

  function getTitle() {
    var title = ecModel.getModel('title').option;

    if (title && title.length) {
      title = title[0];
    }

    return title && title.text;
  }

  function getSeriesTypeName(type) {
    return lang.series.typeNames[type] || '自定义图';
  }
}

module.exports = _default;

/***/ }),

/***/ "c4a3":
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
 * LegendVisualProvider is an bridge that pick encoded color from data and
 * provide to the legend component.
 * @param {Function} getDataWithEncodedVisual Function to get data after filtered. It stores all the encoding info
 * @param {Function} getRawData Function to get raw data before filtered.
 */
function LegendVisualProvider(getDataWithEncodedVisual, getRawData) {
  this.getAllNames = function () {
    var rawData = getRawData(); // We find the name from the raw data. In case it's filtered by the legend component.
    // Normally, the name can be found in rawData, but can't be found in filtered data will display as gray.

    return rawData.mapArray(rawData.getName);
  };

  this.containName = function (name) {
    var rawData = getRawData();
    return rawData.indexOfName(name) >= 0;
  };

  this.indexOfName = function (name) {
    // Only get data when necessary.
    // Because LegendVisualProvider constructor may be new in the stage that data is not prepared yet.
    // Invoking Series#getData immediately will throw an error.
    var dataWithEncodedVisual = getDataWithEncodedVisual();
    return dataWithEncodedVisual.indexOfName(name);
  };

  this.getItemVisual = function (dataIndex, key) {
    // Get encoded visual properties from final filtered data.
    var dataWithEncodedVisual = getDataWithEncodedVisual();
    return dataWithEncodedVisual.getItemVisual(dataIndex, key);
  };
}

var _default = LegendVisualProvider;
module.exports = _default;

/***/ }),

/***/ "fd63":
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

var Gradient = __webpack_require__("42e5");

var _util = __webpack_require__("6d8b");

var isFunction = _util.isFunction;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
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
  createOnAllSeries: true,
  performRawSeries: true,
  reset: function (seriesModel, ecModel) {
    var data = seriesModel.getData();
    var colorAccessPath = (seriesModel.visualColorAccessPath || 'itemStyle.color').split('.'); // Set in itemStyle

    var color = seriesModel.get(colorAccessPath);
    var colorCallback = isFunction(color) && !(color instanceof Gradient) ? color : null; // Default color

    if (!color || colorCallback) {
      color = seriesModel.getColorFromPalette( // TODO series count changed.
      seriesModel.name, null, ecModel.getSeriesCount());
    }

    data.setVisual('color', color);
    var borderColorAccessPath = (seriesModel.visualBorderColorAccessPath || 'itemStyle.borderColor').split('.');
    var borderColor = seriesModel.get(borderColorAccessPath);
    data.setVisual('borderColor', borderColor); // Only visible series has each data be visual encoded

    if (!ecModel.isSeriesFiltered(seriesModel)) {
      if (colorCallback) {
        data.each(function (idx) {
          data.setItemVisual(idx, 'color', colorCallback(seriesModel.getDataParams(idx)));
        });
      } // itemStyle in each data item


      var dataEach = function (data, idx) {
        var itemModel = data.getItemModel(idx);
        var color = itemModel.get(colorAccessPath, true);
        var borderColor = itemModel.get(borderColorAccessPath, true);

        if (color != null) {
          data.setItemVisual(idx, 'color', color);
        }

        if (borderColor != null) {
          data.setItemVisual(idx, 'borderColor', borderColor);
        }
      };

      return {
        dataEach: data.hasItemOption ? dataEach : null
      };
    }
  }
};
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~0013aa0f.b2d31b5d.js.map