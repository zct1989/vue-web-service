(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~5068d5f8"],{

/***/ "2819":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__("3eba"), __webpack_require__("007d"), __webpack_require__("d28f"), __webpack_require__("94b1"), __webpack_require__("ef97"), __webpack_require__("c037"), __webpack_require__("a4b1"), __webpack_require__("8deb"), __webpack_require__("675c"), __webpack_require__("a00a"), __webpack_require__("10d5"), __webpack_require__("311a"), __webpack_require__("5ce2"), __webpack_require__("5450"), __webpack_require__("15af"), __webpack_require__("085d"), __webpack_require__("0a6d"), __webpack_require__("07e6"), __webpack_require__("ef97a"), __webpack_require__("d015"), __webpack_require__("87a1")) :
  undefined;
}(this, (function (echartsLib) { 'use strict';

  echartsLib = echartsLib && echartsLib.hasOwnProperty('default') ? echartsLib['default'] : echartsLib;

  var DEFAULT_THEME = {
    categoryAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    valueAxis: {
      axisLine: { show: false }
    },
    line: {
      smooth: true
    },
    grid: {
      containLabel: true,
      left: 10,
      right: 10
    }
  };

  var DEFAULT_COLORS = ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'];

  var HEAT_MAP_COLOR = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'];

  var HEAT_BMAP_COLOR = ['blue', 'blue', 'green', 'yellow', 'red'];

  var itemPoint = function itemPoint(color) {
    return ['<span style="', 'background-color:' + color + ';', 'display: inline-block;', 'width: 10px;', 'height: 10px;', 'border-radius: 50%;', 'margin-right:2px;', '"></span>'].join('');
  };

  var STATIC_PROPS = ['initOptions', 'loading', 'dataEmpty', 'judgeWidth', 'widthChangeDelay'];

  var ECHARTS_SETTINGS = ['grid', 'dataZoom', 'visualMap', 'toolbox', 'title', 'legend', 'xAxis', 'yAxis', 'radar', 'tooltip', 'axisPointer', 'brush', 'geo', 'timeline', 'graphic', 'series', 'backgroundColor', 'textStyle'];

  var ABBR = {
    th: 3,
    mi: 6,
    bi: 9,
    tr: 12
  };

  var DEFAULT_OPTIONS = {
    zeroFormat: null,
    nullFormat: null,
    defaultFormat: '0,0',
    scalePercentBy100: true,
    abbrLabel: {
      th: 'k',
      mi: 'm',
      bi: 'b',
      tr: 't'
    }
  };

  var TRILLION = 1e12;
  var BILLION = 1e9;
  var MILLION = 1e6;
  var THOUSAND = 1e3;

  function numIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
  }

  function toFixed(value, maxDecimals, roundingFunction, optionals) {
    var splitValue = value.toString().split('.');
    var minDecimals = maxDecimals - (optionals || 0);
    var boundedPrecision = splitValue.length === 2 ? Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals) : minDecimals;
    var power = Math.pow(10, boundedPrecision);
    var output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

    if (optionals > maxDecimals - boundedPrecision) {
      var optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
      output = output.replace(optionalsRegExp, '');
    }

    return output;
  }

  function numberToFormat(options, value, format, roundingFunction) {
    var abs = Math.abs(value);
    var negP = false;
    var optDec = false;
    var abbr = '';
    var decimal = '';
    var neg = false;
    var abbrForce = void 0;
    var signed = void 0;
    format = format || '';

    value = value || 0;

    if (~format.indexOf('(')) {
      negP = true;
      format = format.replace(/[(|)]/g, '');
    } else if (~format.indexOf('+') || ~format.indexOf('-')) {
      signed = ~format.indexOf('+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
      format = format.replace(/[+|-]/g, '');
    }
    if (~format.indexOf('a')) {
      abbrForce = format.match(/a(k|m|b|t)?/);

      abbrForce = abbrForce ? abbrForce[1] : false;

      if (~format.indexOf(' a')) abbr = ' ';
      format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

      if (abs >= TRILLION && !abbrForce || abbrForce === 't') {
        abbr += options.abbrLabel.tr;
        value = value / TRILLION;
      } else if (abs < TRILLION && abs >= BILLION && !abbrForce || abbrForce === 'b') {
        abbr += options.abbrLabel.bi;
        value = value / BILLION;
      } else if (abs < BILLION && abs >= MILLION && !abbrForce || abbrForce === 'm') {
        abbr += options.abbrLabel.mi;
        value = value / MILLION;
      } else if (abs < MILLION && abs >= THOUSAND && !abbrForce || abbrForce === 'k') {
        abbr += options.abbrLabel.th;
        value = value / THOUSAND;
      }
    }
    if (~format.indexOf('[.]')) {
      optDec = true;
      format = format.replace('[.]', '.');
    }
    var int = value.toString().split('.')[0];
    var precision = format.split('.')[1];
    var thousands = format.indexOf(',');
    var leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

    if (precision) {
      if (~precision.indexOf('[')) {
        precision = precision.replace(']', '');
        precision = precision.split('[');
        decimal = toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
      } else {
        decimal = toFixed(value, precision.length, roundingFunction);
      }

      int = decimal.split('.')[0];
      decimal = ~decimal.indexOf('.') ? '.' + decimal.split('.')[1] : '';
      if (optDec && +decimal.slice(1) === 0) decimal = '';
    } else {
      int = toFixed(value, 0, roundingFunction);
    }
    if (abbr && !abbrForce && +int >= 1000 && abbr !== ABBR.trillion) {
      int = '' + +int / 1000;
      abbr = ABBR.million;
    }
    if (~int.indexOf('-')) {
      int = int.slice(1);
      neg = true;
    }
    if (int.length < leadingCount) {
      for (var i = leadingCount - int.length; i > 0; i--) {
        int = '0' + int;
      }
    }

    if (thousands > -1) {
      int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
    }

    if (!format.indexOf('.')) int = '';

    var output = int + decimal + (abbr || '');

    if (negP) {
      output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
    } else {
      if (signed >= 0) {
        output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
      } else if (neg) {
        output = '-' + output;
      }
    }

    return output;
  }

  function extend(target, sub) {
    Object.keys(sub).forEach(function (key) {
      target[key] = sub[key];
    });
  }

  var numerifyPercent = {
    regexp: /%/,
    format: function format(value, formatType, roundingFunction, numerify) {
      var space = ~formatType.indexOf(' %') ? ' ' : '';
      var output = void 0;

      if (numerify.options.scalePercentBy100) value = value * 100;

      formatType = formatType.replace(/\s?%/, '');

      output = numerify._numberToFormat(value, formatType, roundingFunction);

      if (~output.indexOf(')')) {
        output = output.split('');
        output.splice(-1, 0, space + '%');
        output = output.join('');
      } else {
        output = output + space + '%';
      }

      return output;
    }
  };

  var options = {};
  var formats = {};

  extend(options, DEFAULT_OPTIONS);

  function format(value, formatType, roundingFunction) {
    formatType = formatType || options.defaultFormat;
    roundingFunction = roundingFunction || Math.round;
    var output = void 0;
    var formatFunction = void 0;

    if (value === 0 && options.zeroFormat !== null) {
      output = options.zeroFormat;
    } else if (value === null && options.nullFormat !== null) {
      output = options.nullFormat;
    } else {
      for (var kind in formats) {
        if (formats[kind] && formatType.match(formats[kind].regexp)) {
          formatFunction = formats[kind].format;
          break;
        }
      }
      formatFunction = formatFunction || numberToFormat.bind(null, options);
      output = formatFunction(value, formatType, roundingFunction, numerify);
    }

    return output;
  }

  function numerify(input, formatType, roundingFunction) {
    var value = void 0;

    if (input === 0 || typeof input === 'undefined') {
      value = 0;
    } else if (input === null || numIsNaN(input)) {
      value = null;
    } else if (typeof input === 'string') {
      if (options.zeroFormat && input === options.zeroFormat) {
        value = 0;
      } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
        value = null;
      } else {
        value = +input;
      }
    } else {
      value = +input || null;
    }

    return format(value, formatType, roundingFunction);
  }

  numerify.options = options;
  numerify._numberToFormat = numberToFormat.bind(null, options);
  numerify.register = function (name, format) {
    formats[name] = format;
  };
  numerify.unregister = function (name) {
    formats[name] = null;
  };
  numerify.setOptions = function (opts) {
    extend(options, opts);
  };
  numerify.reset = function () {
    extend(options, DEFAULT_OPTIONS);
  };

  numerify.register('percentage', numerifyPercent);

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    };
  }

  function set$1(target, path, value) {
    if (!path) return;
    var targetTemp = target;
    var pathArr = path.split('.');
    pathArr.forEach(function (item, index) {
      if (index === pathArr.length - 1) {
        targetTemp[item] = value;
      } else {
        if (!targetTemp[item]) targetTemp[item] = {};
        targetTemp = targetTemp[item];
      }
    });
  }

  function get$1(target, path, defaultValue) {
    if (!path) return target;
    var pathArr = path.split('.');
    var targetTemp = target;
    pathArr.some(function (item, index) {
      if (targetTemp[item] === undefined) {
        targetTemp = defaultValue;
        return true;
      } else {
        targetTemp = targetTemp[item];
      }
    });
    return targetTemp;
  }

  var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  function getType(v) {
    return Object.prototype.toString.call(v);
  }

  function getTypeof(v) {
    return typeof v === 'undefined' ? 'undefined' : _typeof$1(v);
  }

  function isObject(v) {
    return getType(v) === '[object Object]';
  }

  function isArray(v) {
    return getType(v) === '[object Array]';
  }

  function isFunction(v) {
    return getType(v) === '[object Function]';
  }

  function cloneDeep(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function camelToKebab(s) {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function hasOwn(source, target) {
    return Object.prototype.hasOwnProperty.call(source, target);
  }

  function isEqual(alice, bob) {
    if (alice === bob) return true;
    if (alice === null || bob === null || getTypeof(alice) !== 'object' || getTypeof(bob) !== 'object') {
      return alice === bob;
    }

    for (var key in alice) {
      if (!hasOwn(alice, key)) continue;
      var aliceValue = alice[key];
      var bobValue = bob[key];
      var aliceType = getTypeof(aliceValue);

      if (getTypeof(bobValue) === 'undefined') {
        return false;
      } else if (aliceType === 'object') {
        if (!isEqual(aliceValue, bobValue)) return false;
      } else if (aliceValue !== bobValue) {
        return false;
      }
    }
    for (var _key in bob) {
      if (!hasOwn(bob, _key)) continue;
      if (getTypeof(alice)[_key] === 'undefined') return false;
    }

    return true;
  }

  var getFormated = function getFormated(val, type, digit) {
    var defaultVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

    if (isNaN(val)) return defaultVal;
    if (!type) return val;
    if (isFunction(type)) return type(val, numerify);

    digit = isNaN(digit) ? 0 : ++digit;
    var digitStr = '.[' + new Array(digit).join(0) + ']';
    var formatter = type;
    switch (type) {
      case 'KMB':
        formatter = digit ? '0,0' + digitStr + 'a' : '0,0a';
        break;
      case 'normal':
        formatter = digit ? '0,0' + digitStr : '0,0';
        break;
      case 'percent':
        formatter = digit ? '0,0' + digitStr + '%' : '0,0.[00]%';
        break;
    }
    return numerify(val, formatter);
  };

  var getStackMap = function getStackMap(stack) {
    var stackMap = {};
    Object.keys(stack).forEach(function (item) {
      stack[item].forEach(function (name) {
        stackMap[name] = item;
      });
    });
    return stackMap;
  };

  var $get = function $get(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send(null);
      xhr.onload = function () {
        resolve(JSON.parse(xhr.responseText));
      };
      xhr.onerror = function () {
        reject(JSON.parse(xhr.responseText));
      };
    });
  };

  var mapPromise = {};

  var getMapJSON = function getMapJSON(_ref) {
    var position = _ref.position,
        positionJsonLink = _ref.positionJsonLink,
        beforeRegisterMapOnce = _ref.beforeRegisterMapOnce,
        mapURLProfix = _ref.mapURLProfix;

    var link = positionJsonLink || '' + mapURLProfix + position + '.json';
    if (!mapPromise[link]) {
      mapPromise[link] = $get(link).then(function (res) {
        if (beforeRegisterMapOnce) res = beforeRegisterMapOnce(res);
        return res;
      });
    }
    return mapPromise[link];
  };

  var bmapPromise = null;
  var amapPromise = null;

  var getBmap = function getBmap(key, v) {
    if (!bmapPromise) {
      bmapPromise = new Promise(function (resolve, reject) {
        var callbackName = 'bmap' + Date.now();
        window[callbackName] = resolve;
        var script = document.createElement('script');
        script.src = ['https://api.map.baidu.com/api?v=' + (v || '2.0'), 'ak=' + key, 'callback=' + callbackName].join('&');

        document.body.appendChild(script);
      });
    }
    return bmapPromise;
  };

  var getAmap = function getAmap(key, v) {
    if (!amapPromise) {
      amapPromise = new Promise(function (resolve, reject) {
        var callbackName = 'amap' + Date.now();
        window[callbackName] = resolve;
        var script = document.createElement('script');
        script.src = ['https://webapi.amap.com/maps?v=' + (v || '1.4.3'), 'key=' + key, 'callback=' + callbackName].join('&');

        document.body.appendChild(script);
      });
    }
    return amapPromise;
  };

  function setArrayValue(arr, index, value) {
    if (arr[index] !== undefined) {
      arr[index].push(value);
    } else {
      arr[index] = [value];
    }
  }

  // default opacity of bar while dim-axis type is 'value'
  var VALUE_AXIS_OPACITY = 0.5;

  function getBarDimAxis(args) {
    var innerRows = args.innerRows,
        dimAxisName = args.dimAxisName,
        dimension = args.dimension,
        axisVisible = args.axisVisible,
        dimAxisType = args.dimAxisType,
        dims = args.dims;

    return dimension.map(function (item) {
      return {
        type: 'category',
        name: dimAxisName,
        nameLocation: 'middle',
        nameGap: 22,
        data: dimAxisType === 'value' ? getValueAxisData(dims) : innerRows.map(function (row) {
          return row[item];
        }),
        axisLabel: {
          formatter: function formatter(v) {
            return String(v);
          }
        },
        show: axisVisible
      };
    });
  }

  function getValueAxisData(dims) {
    var max = Math.max.apply(null, dims);
    var min = Math.min.apply(null, dims);
    var result = [];
    for (var i = min; i <= max; i++) {
      result.push(i);
    }
    return result;
  }

  function getBarMeaAxis(args) {
    var meaAxisName = args.meaAxisName,
        meaAxisType = args.meaAxisType,
        axisVisible = args.axisVisible,
        digit = args.digit,
        scale = args.scale,
        min = args.min,
        max = args.max;

    var meaAxisBase = {
      type: 'value',
      axisTick: {
        show: false
      },
      show: axisVisible
    };
    var meaAxis = [];

    var _loop = function _loop(i) {
      if (meaAxisType[i]) {
        meaAxis[i] = _extends({}, meaAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return getFormated(val, meaAxisType[i], digit);
            }
          }
        });
      } else {
        meaAxis[i] = _extends({}, meaAxisBase);
      }
      meaAxis[i].name = meaAxisName[i] || '';
      meaAxis[i].scale = scale[i] || false;
      meaAxis[i].min = min[i] || null;
      meaAxis[i].max = max[i] || null;
    };

    for (var i = 0; i < 2; i++) {
      _loop(i);
    }

    return meaAxis;
  }

  function getBarTooltip(args) {
    var axisSite = args.axisSite,
        isHistogram = args.isHistogram,
        meaAxisType = args.meaAxisType,
        digit = args.digit,
        labelMap = args.labelMap;

    var secondAxis = isHistogram ? axisSite.right || [] : axisSite.top || [];
    if (labelMap) {
      secondAxis = secondAxis.map(function (item) {
        return labelMap[item] === undefined ? item : labelMap[item];
      });
    }
    return {
      trigger: 'axis',
      formatter: function formatter(items) {
        var tpl = [];
        tpl.push(items[0].name + '<br>');
        items.forEach(function (item) {
          var seriesName = item.seriesName;
          var type = ~secondAxis.indexOf(seriesName) ? meaAxisType[1] : meaAxisType[0];
          tpl.push(itemPoint(item.color));
          tpl.push(seriesName + ': ');
          tpl.push(getFormated(item.value, type, digit));
          tpl.push('<br>');
        });

        return tpl.join('');
      }
    };
  }

  function getValueData(seriesTemp, dims) {
    var max = Math.max.apply(null, dims);
    var min = Math.min.apply(null, dims);
    var result = [];
    for (var i = min; i <= max; i++) {
      var index = dims.indexOf(i);
      if (~index) {
        result.push(seriesTemp[index]);
      } else {
        result.push(null);
      }
    }
    return result;
  }

  function getBarSeries(args) {
    var innerRows = args.innerRows,
        metrics = args.metrics,
        stack = args.stack,
        axisSite = args.axisSite,
        isHistogram = args.isHistogram,
        labelMap = args.labelMap,
        itemStyle = args.itemStyle,
        label = args.label,
        _args$showLine = args.showLine,
        showLine = _args$showLine === undefined ? [] : _args$showLine,
        dimAxisType = args.dimAxisType,
        barGap = args.barGap,
        opacity = args.opacity,
        dims = args.dims;

    var series = [];
    var seriesTemp = {};
    var secondAxis = isHistogram ? axisSite.right || [] : axisSite.top || [];
    var secondDimAxisIndex = isHistogram ? 'yAxisIndex' : 'xAxisIndex';
    var stackMap = stack && getStackMap(stack);
    metrics.forEach(function (item) {
      seriesTemp[item] = [];
    });
    innerRows.forEach(function (row) {
      metrics.forEach(function (item) {
        seriesTemp[item].push(row[item]);
      });
    });
    series = Object.keys(seriesTemp).map(function (item, index) {
      var data = dimAxisType === 'value' ? getValueData(seriesTemp[item], dims) : seriesTemp[item];
      var seriesItem = defineProperty({
        name: labelMap[item] != null ? labelMap[item] : item,
        type: ~showLine.indexOf(item) ? 'line' : 'bar',
        data: data
      }, secondDimAxisIndex, ~secondAxis.indexOf(item) ? '1' : '0');

      if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

      if (label) seriesItem.label = label;
      if (itemStyle) seriesItem.itemStyle = itemStyle;

      var itemOpacity = opacity || get$1(seriesItem, 'itemStyle.normal.opacity');
      if (dimAxisType === 'value') {
        seriesItem.barGap = barGap;
        seriesItem.barCategoryGap = '1%';
        if (itemOpacity == null) itemOpacity = VALUE_AXIS_OPACITY;
      }

      if (itemOpacity != null) {
        set$1(seriesItem, 'itemStyle.normal.opacity', itemOpacity);
      }

      return seriesItem;
    });

    return series.length ? series : false;
  }

  function getLegend(args) {
    var metrics = args.metrics,
        labelMap = args.labelMap,
        legendName = args.legendName;

    if (!legendName && !labelMap) return { data: metrics };
    var data = labelMap ? metrics.map(function (item) {
      return labelMap[item] == null ? item : labelMap[item];
    }) : metrics;
    return {
      data: data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function getDims(rows, dimension) {
    return rows.map(function (row) {
      return row[dimension[0]];
    });
  }

  var bar$1 = function bar$$1(columns, rows, settings, extra) {
    var innerRows = cloneDeep(rows);
    var _settings$axisSite = settings.axisSite,
        axisSite = _settings$axisSite === undefined ? {} : _settings$axisSite,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? [columns[0]] : _settings$dimension,
        _settings$stack = settings.stack,
        stack = _settings$stack === undefined ? {} : _settings$stack,
        _settings$axisVisible = settings.axisVisible,
        axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$dataOrder = settings.dataOrder,
        dataOrder = _settings$dataOrder === undefined ? false : _settings$dataOrder,
        _settings$scale = settings.scale,
        scale = _settings$scale === undefined ? [false, false] : _settings$scale,
        _settings$min = settings.min,
        min = _settings$min === undefined ? [null, null] : _settings$min,
        _settings$max = settings.max,
        max = _settings$max === undefined ? [null, null] : _settings$max,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        label = settings.label,
        itemStyle = settings.itemStyle,
        showLine = settings.showLine,
        _settings$barGap = settings.barGap,
        barGap = _settings$barGap === undefined ? '-100%' : _settings$barGap,
        opacity = settings.opacity;
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible;

    var metrics = columns.slice();
    if (axisSite.top && axisSite.bottom) {
      metrics = axisSite.top.concat(axisSite.bottom);
    } else if (axisSite.bottom && !axisSite.right) {
      metrics = axisSite.bottom;
    } else if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension[0]), 1);
    }
    var meaAxisType = settings.xAxisType || ['normal', 'normal'];
    var dimAxisType = settings.yAxisType || 'category';
    var meaAxisName = settings.xAxisName || [];
    var dimAxisName = settings.yAxisName || '';
    var isHistogram = false;

    if (dataOrder) {
      var _label = dataOrder.label,
          order = dataOrder.order;

      if (!_label || !order) {
        console.warn('Need to provide name and order parameters');
      } else {
        innerRows.sort(function (a, b) {
          if (order === 'desc') {
            return a[_label] - b[_label];
          } else {
            return b[_label] - a[_label];
          }
        });
      }
    }
    var dims = getDims(innerRows, dimension);

    var legend$$1 = legendVisible && getLegend({ metrics: metrics, labelMap: labelMap, legendName: legendName });
    var yAxis = getBarDimAxis({
      innerRows: innerRows,
      dimAxisName: dimAxisName,
      dimension: dimension,
      axisVisible: axisVisible,
      dimAxisType: dimAxisType,
      dims: dims
    });
    var xAxis = getBarMeaAxis({
      meaAxisName: meaAxisName,
      meaAxisType: meaAxisType,
      axisVisible: axisVisible,
      digit: digit,
      scale: scale,
      min: min,
      max: max
    });
    var series = getBarSeries({
      innerRows: innerRows,
      metrics: metrics,
      stack: stack,
      axisSite: axisSite,
      isHistogram: isHistogram,
      labelMap: labelMap,
      itemStyle: itemStyle,
      label: label,
      showLine: showLine,
      dimAxisType: dimAxisType,
      dimension: dimension,
      barGap: barGap,
      opacity: opacity,
      dims: dims
    });
    var tooltipParams = { axisSite: axisSite, isHistogram: isHistogram, meaAxisType: meaAxisType, digit: digit, labelMap: labelMap };
    var tooltip$$1 = tooltipVisible && getBarTooltip(tooltipParams);
    var options = { legend: legend$$1, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip$$1 };
    return options;
  };

  var histogram = function histogram(columns, rows, settings, status) {
    var innerRows = cloneDeep(rows);
    var _settings$axisSite2 = settings.axisSite,
        axisSite = _settings$axisSite2 === undefined ? {} : _settings$axisSite2,
        _settings$dimension2 = settings.dimension,
        dimension = _settings$dimension2 === undefined ? [columns[0]] : _settings$dimension2,
        _settings$stack2 = settings.stack,
        stack = _settings$stack2 === undefined ? {} : _settings$stack2,
        _settings$axisVisible2 = settings.axisVisible,
        axisVisible = _settings$axisVisible2 === undefined ? true : _settings$axisVisible2,
        _settings$digit2 = settings.digit,
        digit = _settings$digit2 === undefined ? 2 : _settings$digit2,
        _settings$dataOrder2 = settings.dataOrder,
        dataOrder = _settings$dataOrder2 === undefined ? false : _settings$dataOrder2,
        _settings$scale2 = settings.scale,
        scale = _settings$scale2 === undefined ? [false, false] : _settings$scale2,
        _settings$min2 = settings.min,
        min = _settings$min2 === undefined ? [null, null] : _settings$min2,
        _settings$max2 = settings.max,
        max = _settings$max2 === undefined ? [null, null] : _settings$max2,
        _settings$labelMap2 = settings.labelMap,
        labelMap = _settings$labelMap2 === undefined ? {} : _settings$labelMap2,
        _settings$legendName2 = settings.legendName,
        legendName = _settings$legendName2 === undefined ? {} : _settings$legendName2,
        label = settings.label,
        itemStyle = settings.itemStyle,
        showLine = settings.showLine,
        _settings$barGap2 = settings.barGap,
        barGap = _settings$barGap2 === undefined ? '-100%' : _settings$barGap2,
        opacity = settings.opacity;


    if (dataOrder) {
      var _label2 = dataOrder.label,
          order = dataOrder.order;

      if (!_label2 || !order) {
        console.warn('Need to provide name and order parameters');
      } else {
        innerRows.sort(function (a, b) {
          if (order === 'desc') {
            return a[_label2] - b[_label2];
          } else {
            return b[_label2] - a[_label2];
          }
        });
      }
    }

    var tooltipVisible = status.tooltipVisible,
        legendVisible = status.legendVisible;

    var metrics = columns.slice();
    if (axisSite.left && axisSite.right) {
      metrics = axisSite.left.concat(axisSite.right);
    } else if (axisSite.left && !axisSite.right) {
      metrics = axisSite.left;
    } else if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension[0]), 1);
    }
    var meaAxisType = settings.yAxisType || ['normal', 'normal'];
    var dimAxisType = settings.xAxisType || 'category';
    var meaAxisName = settings.yAxisName || [];
    var dimAxisName = settings.xAxisName || '';
    var isHistogram = true;
    var dims = getDims(innerRows, dimension);

    var legend$$1 = legendVisible && getLegend({ metrics: metrics, labelMap: labelMap, legendName: legendName });
    var xAxis = getBarDimAxis({
      innerRows: innerRows,
      dimAxisName: dimAxisName,
      dimension: dimension,
      axisVisible: axisVisible,
      dimAxisType: dimAxisType,
      dims: dims
    });
    var yAxis = getBarMeaAxis({
      meaAxisName: meaAxisName,
      meaAxisType: meaAxisType,
      axisVisible: axisVisible,
      digit: digit,
      scale: scale,
      min: min,
      max: max
    });
    var series = getBarSeries({
      innerRows: innerRows,
      metrics: metrics,
      stack: stack,
      axisSite: axisSite,
      isHistogram: isHistogram,
      labelMap: labelMap,
      itemStyle: itemStyle,
      label: label,
      showLine: showLine,
      dimAxisType: dimAxisType,
      dimension: dimension,
      barGap: barGap,
      opacity: opacity,
      dims: dims
    });
    var tooltipParams = { axisSite: axisSite, isHistogram: isHistogram, meaAxisType: meaAxisType, digit: digit, labelMap: labelMap };
    var tooltip$$1 = tooltipVisible && getBarTooltip(tooltipParams);
    var options = { legend: legend$$1, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip$$1 };
    return options;
  };

  var Loading = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
    }, staticRenderFns: []
  };

  var DataEmpty = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
    }, staticRenderFns: []
  };

  function setExtend (options, extend) {
    Object.keys(extend).forEach(function (attr) {
      var value = extend[attr];
      if (~attr.indexOf('.')) {
        // eg: a.b.c a.1.b
        set$1(options, attr, value);
      } else if (typeof value === 'function') {
        // get callback value
        options[attr] = value(options[attr]);
      } else {
        // mixin extend value
        if (isArray(options[attr]) && isObject(options[attr][0])) {
          // eg: [{ xx: 1 }, { xx: 2 }]
          options[attr].forEach(function (option, index) {
            options[attr][index] = _extends({}, option, value);
          });
        } else if (isObject(options[attr])) {
          // eg: { xx: 1, yy: 2 }
          options[attr] = _extends({}, options[attr], value);
        } else {
          options[attr] = value;
        }
      }
    });
  }

  function setMark (seriesItem, marks) {
    Object.keys(marks).forEach(function (key) {
      if (marks[key]) seriesItem[key] = marks[key];
    });
  }

  function setAnimation (options, animation) {
    Object.keys(animation).forEach(function (key) {
      options[key] = animation[key];
    });
  }

  var Core = {
    render: function render(h) {
      return h('div', {
        class: [camelToKebab(this.$options.name || this.$options._componentTag)],
        style: this.canvasStyle
      }, [h('div', {
        style: this.canvasStyle,
        class: { 'v-charts-mask-status': this.dataEmpty || this.loading },
        ref: 'canvas'
      }), h(DataEmpty, {
        style: { display: this.dataEmpty ? '' : 'none' }
      }), h(Loading, {
        style: { display: this.loading ? '' : 'none' }
      }), this.$slots.default]);
    },


    props: {
      data: { type: [Object, Array], default: function _default() {
          return {};
        }
      },
      settings: { type: Object, default: function _default() {
          return {};
        }
      },
      width: { type: String, default: 'auto' },
      height: { type: String, default: '400px' },
      beforeConfig: { type: Function },
      afterConfig: { type: Function },
      afterSetOption: { type: Function },
      afterSetOptionOnce: { type: Function },
      events: { type: Object },
      grid: { type: [Object, Array] },
      colors: { type: Array },
      tooltipVisible: { type: Boolean, default: true },
      legendVisible: { type: Boolean, default: true },
      legendPosition: { type: String },
      markLine: { type: Object },
      markArea: { type: Object },
      markPoint: { type: Object },
      visualMap: { type: [Object, Array] },
      dataZoom: { type: [Object, Array] },
      toolbox: { type: [Object, Array] },
      initOptions: { type: Object, default: function _default() {
          return {};
        }
      },
      title: [Object, Array],
      legend: [Object, Array],
      xAxis: [Object, Array],
      yAxis: [Object, Array],
      radar: Object,
      tooltip: Object,
      axisPointer: [Object, Array],
      brush: [Object, Array],
      geo: [Object, Array],
      timeline: [Object, Array],
      graphic: [Object, Array],
      series: [Object, Array],
      backgroundColor: [Object, String],
      textStyle: [Object, Array],
      animation: Object,
      theme: Object,
      themeName: String,
      loading: Boolean,
      dataEmpty: Boolean,
      extend: Object,
      judgeWidth: { type: Boolean, default: false },
      widthChangeDelay: { type: Number, default: 300 },
      tooltipFormatter: { type: Function },
      resizeable: { type: Boolean, default: true },
      resizeDelay: { type: Number, default: 200 },
      changeDelay: { type: Number, default: 0 },
      setOptionOpts: { type: [Boolean, Object], default: true },
      cancelResizeCheck: Boolean,
      notSetUnchange: Array,
      log: Boolean
    },

    watch: {
      data: {
        deep: true,
        handler: function handler(v) {
          if (v) {
            this.changeHandler();
          }
        }
      },

      settings: {
        deep: true,
        handler: function handler(v) {
          if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
          this.changeHandler();
        }
      },

      width: 'nextTickResize',
      height: 'nextTickResize',

      events: {
        deep: true,
        handler: 'createEventProxy'
      },

      theme: {
        deep: true,
        handler: 'themeChange'
      },

      themeName: 'themeChange',

      resizeable: 'resizeableHandler'
    },

    computed: {
      canvasStyle: function canvasStyle() {
        return {
          width: this.width,
          height: this.height,
          position: 'relative'
        };
      },
      chartColor: function chartColor() {
        return this.colors || this.theme && this.theme.color || DEFAULT_COLORS;
      }
    },

    methods: {
      dataHandler: function dataHandler() {
        if (!this.chartHandler) return;
        var data = this.data;
        var _data = data,
            _data$columns = _data.columns,
            columns = _data$columns === undefined ? [] : _data$columns,
            _data$rows = _data.rows,
            rows = _data$rows === undefined ? [] : _data$rows;

        var extra = {
          tooltipVisible: this.tooltipVisible,
          legendVisible: this.legendVisible,
          echarts: this.echarts,
          color: this.chartColor,
          tooltipFormatter: this.tooltipFormatter,
          _once: this._once
        };
        if (this.beforeConfig) data = this.beforeConfig(data);

        var options = this.chartHandler(columns, rows, this.settings, extra);
        if (options) {
          if (typeof options.then === 'function') {
            options.then(this.optionsHandler);
          } else {
            this.optionsHandler(options);
          }
        }
      },
      nextTickResize: function nextTickResize() {
        this.$nextTick(this.resize);
      },
      resize: function resize() {
        if (!this.cancelResizeCheck) {
          if (this.$el && this.$el.clientWidth && this.$el.clientHeight) {
            this.echartsResize();
          }
        } else {
          this.echartsResize();
        }
      },
      echartsResize: function echartsResize() {
        this.echarts && this.echarts.resize();
      },
      optionsHandler: function optionsHandler(options) {
        var _this = this;

        // legend
        if (this.legendPosition && options.legend) {
          options.legend[this.legendPosition] = 10;
          if (~['left', 'right'].indexOf(this.legendPosition)) {
            options.legend.top = 'middle';
            options.legend.orient = 'vertical';
          }
        }
        // color
        options.color = this.chartColor;
        // echarts self settings
        ECHARTS_SETTINGS.forEach(function (setting) {
          if (_this[setting]) options[setting] = _this[setting];
        });
        // animation
        if (this.animation) setAnimation(options, this.animation);
        // marks
        if (this.markArea || this.markLine || this.markPoint) {
          var marks = {
            markArea: this.markArea,
            markLine: this.markLine,
            markPoint: this.markPoint
          };
          var series = options.series;
          if (isArray(series)) {
            series.forEach(function (item) {
              setMark(item, marks);
            });
          } else if (isObject(series)) {
            setMark(series, marks);
          }
        }
        // change inited echarts settings
        if (this.extend) setExtend(options, this.extend);
        if (this.afterConfig) options = this.afterConfig(options);
        var setOptionOpts = this.setOptionOpts;
        // map chart not merge
        if ((this.settings.bmap || this.settings.amap) && !isObject(setOptionOpts)) {
          setOptionOpts = false;
        }
        // exclude unchange options
        if (this.notSetUnchange && this.notSetUnchange.length) {
          this.notSetUnchange.forEach(function (item) {
            var value = options[item];
            if (value) {
              if (isEqual(value, _this._store[item])) {
                options[item] = undefined;
              } else {
                _this._store[item] = cloneDeep(value);
              }
            }
          });
          if (isObject(setOptionOpts)) {
            setOptionOpts.notMerge = false;
          } else {
            setOptionOpts = false;
          }
        }
        if (this._isDestroyed) return;
        if (this.log) console.log(options);
        this.echarts.setOption(options, setOptionOpts);
        this.$emit('ready', this.echarts, options, echartsLib);
        if (!this._once['ready-once']) {
          this._once['ready-once'] = true;
          this.$emit('ready-once', this.echarts, options, echartsLib);
        }
        if (this.judgeWidth) this.judgeWidthHandler(options);
        if (this.afterSetOption) this.afterSetOption(this.echarts, options, echartsLib);
        if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
          this._once['afterSetOptionOnce'] = true;
          this.afterSetOptionOnce(this.echarts, options, echartsLib);
        }
      },
      judgeWidthHandler: function judgeWidthHandler(options) {
        var _this2 = this;

        var widthChangeDelay = this.widthChangeDelay,
            resize = this.resize;

        if (this.$el.clientWidth || this.$el.clientHeight) {
          resize();
        } else {
          this.$nextTick(function (_) {
            if (_this2.$el.clientWidth || _this2.$el.clientHeight) {
              resize();
            } else {
              setTimeout(function (_) {
                resize();
                if (!_this2.$el.clientWidth || !_this2.$el.clientHeight) {
                  console.warn(' Can\'t get dom width or height ');
                }
              }, widthChangeDelay);
            }
          });
        }
      },
      resizeableHandler: function resizeableHandler(resizeable) {
        if (resizeable && !this._once.onresize) this.addResizeListener();
        if (!resizeable && this._once.onresize) this.removeResizeListener();
      },
      init: function init() {
        if (this.echarts) return;
        var themeName = this.themeName || this.theme || DEFAULT_THEME;
        this.echarts = echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
        if (this.data) this.changeHandler();
        this.createEventProxy();
        if (this.resizeable) this.addResizeListener();
      },
      addResizeListener: function addResizeListener() {
        window.addEventListener('resize', this.resizeHandler);
        this._once.onresize = true;
      },
      removeResizeListener: function removeResizeListener() {
        window.removeEventListener('resize', this.resizeHandler);
        this._once.onresize = false;
      },
      addWatchToProps: function addWatchToProps() {
        var _this3 = this;

        var watchedVariable = this._watchers.map(function (watcher) {
          return watcher.expression;
        });
        Object.keys(this.$props).forEach(function (prop) {
          if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
            var opts = {};
            if (~['[object Object]', '[object Array]'].indexOf(getType(_this3.$props[prop]))) {
              opts.deep = true;
            }
            _this3.$watch(prop, function () {
              _this3.changeHandler();
            }, opts);
          }
        });
      },
      createEventProxy: function createEventProxy() {
        var _this4 = this;

        // 只要用户使用 on 方法绑定的事件都做一层代理，
        // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
        // 实现 events 的动态响应
        var self = this;
        var keys = Object.keys(this.events || {});
        keys.length && keys.forEach(function (ev) {
          if (_this4.registeredEvents.indexOf(ev) === -1) {
            _this4.registeredEvents.push(ev);
            _this4.echarts.on(ev, function (ev) {
              return function () {
                if (ev in self.events) {
                  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }

                  self.events[ev].apply(null, args);
                }
              };
            }(ev));
          }
        });
      },
      themeChange: function themeChange(theme) {
        this.clean();
        this.echarts = null;
        this.init();
      },
      clean: function clean() {
        if (this.resizeable) this.removeResizeListener();
        this.echarts.dispose();
      }
    },

    created: function created() {
      this.echarts = null;
      this.registeredEvents = [];
      this._once = {};
      this._store = {};
      this.resizeHandler = debounce(this.resize, this.resizeDelay);
      this.changeHandler = debounce(this.dataHandler, this.changeDelay);
      this.addWatchToProps();
    },
    mounted: function mounted() {
      this.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.clean();
    },


    _numerify: numerify
  };

  var VeBar = _extends({}, Core, {
    name: 'VeBar',
    data: function data() {
      this.chartHandler = bar$1;
      return {};
    }
  });

  var VeHistogram = _extends({}, Core, {
    name: 'VeHistogram',
    data: function data() {
      this.chartHandler = histogram;
      return {};
    }
  });

  function getLineXAxis(args) {
    var dimension = args.dimension,
        rows = args.rows,
        xAxisName = args.xAxisName,
        axisVisible = args.axisVisible,
        xAxisType = args.xAxisType;

    return dimension.map(function (item, index) {
      return {
        type: xAxisType,
        nameLocation: 'middle',
        nameGap: 22,
        name: xAxisName[index] || '',
        axisTick: { show: true, lineStyle: { color: '#eee' } },
        data: rows.map(function (row) {
          return row[item];
        }),
        show: axisVisible
      };
    });
  }

  function getLineSeries(args) {
    var rows = args.rows,
        axisSite = args.axisSite,
        metrics = args.metrics,
        area = args.area,
        stack = args.stack,
        nullAddZero = args.nullAddZero,
        labelMap = args.labelMap,
        label = args.label,
        itemStyle = args.itemStyle,
        lineStyle = args.lineStyle,
        areaStyle = args.areaStyle,
        dimension = args.dimension;

    var series = [];
    var dataTemp = {};
    var stackMap = stack && getStackMap(stack);
    metrics.forEach(function (item) {
      dataTemp[item] = [];
    });
    rows.forEach(function (row) {
      metrics.forEach(function (item) {
        var value = null;
        if (row[item] != null) {
          value = row[item];
        } else if (nullAddZero) {
          value = 0;
        }
        dataTemp[item].push([row[dimension[0]], value]);
      });
    });
    metrics.forEach(function (item) {
      var seriesItem = {
        name: labelMap[item] != null ? labelMap[item] : item,
        type: 'line',
        data: dataTemp[item]
      };

      if (area) seriesItem.areaStyle = { normal: {} };
      if (axisSite.right) {
        seriesItem.yAxisIndex = ~axisSite.right.indexOf(item) ? 1 : 0;
      }

      if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

      if (label) seriesItem.label = label;
      if (itemStyle) seriesItem.itemStyle = itemStyle;
      if (lineStyle) seriesItem.lineStyle = lineStyle;
      if (areaStyle) seriesItem.areaStyle = areaStyle;

      series.push(seriesItem);
    });
    return series;
  }

  function getLineYAxis(args) {
    var yAxisName = args.yAxisName,
        yAxisType = args.yAxisType,
        axisVisible = args.axisVisible,
        scale = args.scale,
        min = args.min,
        max = args.max,
        digit = args.digit;

    var yAxisBase = {
      type: 'value',
      axisTick: {
        show: false
      },
      show: axisVisible
    };
    var yAxis = [];

    var _loop = function _loop(i) {
      if (yAxisType[i]) {
        yAxis[i] = _extends({}, yAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return getFormated(val, yAxisType[i], digit);
            }
          }
        });
      } else {
        yAxis[i] = _extends({}, yAxisBase);
      }
      yAxis[i].name = yAxisName[i] || '';
      yAxis[i].scale = scale[i] || false;
      yAxis[i].min = min[i] || null;
      yAxis[i].max = max[i] || null;
    };

    for (var i = 0; i < 2; i++) {
      _loop(i);
    }
    return yAxis;
  }

  function getLineTooltip(args) {
    var axisSite = args.axisSite,
        yAxisType = args.yAxisType,
        digit = args.digit,
        labelMap = args.labelMap,
        tooltipFormatter = args.tooltipFormatter;

    var rightItems = axisSite.right || [];
    var rightList = labelMap ? rightItems.map(function (item) {
      return labelMap[item] === undefined ? item : labelMap[item];
    }) : rightItems;
    return {
      trigger: 'axis',
      formatter: function formatter(items) {
        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, arguments);
        }
        var tpl = [];
        var _items$ = items[0],
            name = _items$.name,
            axisValueLabel = _items$.axisValueLabel;

        var title = name || axisValueLabel;
        tpl.push(title + '<br>');
        items.forEach(function (_ref) {
          var seriesName = _ref.seriesName,
              data = _ref.data,
              marker = _ref.marker;

          var showData = null;
          var type = ~rightList.indexOf(seriesName) ? yAxisType[1] : yAxisType[0];
          var itemData = isArray(data) ? data[1] : data;
          showData = getFormated(itemData, type, digit);
          tpl.push(marker);
          tpl.push(seriesName + ': ' + showData);
          tpl.push('<br>');
        });
        return tpl.join('');
      }
    };
  }

  function getLegend$1(args) {
    var metrics = args.metrics,
        legendName = args.legendName,
        labelMap = args.labelMap;

    if (!legendName && !labelMap) return { data: metrics };
    var data = labelMap ? metrics.map(function (item) {
      return labelMap[item] == null ? item : labelMap[item];
    }) : metrics;
    return {
      data: data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  var line$1 = function line$$1(columns, rows, settings, extra) {
    rows = isArray(rows) ? rows : [];
    columns = isArray(columns) ? columns : [];
    var _settings$axisSite = settings.axisSite,
        axisSite = _settings$axisSite === undefined ? {} : _settings$axisSite,
        _settings$yAxisType = settings.yAxisType,
        yAxisType = _settings$yAxisType === undefined ? ['normal', 'normal'] : _settings$yAxisType,
        _settings$xAxisType = settings.xAxisType,
        xAxisType = _settings$xAxisType === undefined ? 'category' : _settings$xAxisType,
        _settings$yAxisName = settings.yAxisName,
        yAxisName = _settings$yAxisName === undefined ? [] : _settings$yAxisName,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? [columns[0]] : _settings$dimension,
        _settings$xAxisName = settings.xAxisName,
        xAxisName = _settings$xAxisName === undefined ? [] : _settings$xAxisName,
        _settings$axisVisible = settings.axisVisible,
        axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
        area = settings.area,
        stack = settings.stack,
        _settings$scale = settings.scale,
        scale = _settings$scale === undefined ? [false, false] : _settings$scale,
        _settings$min = settings.min,
        min = _settings$min === undefined ? [null, null] : _settings$min,
        _settings$max = settings.max,
        max = _settings$max === undefined ? [null, null] : _settings$max,
        _settings$nullAddZero = settings.nullAddZero,
        nullAddZero = _settings$nullAddZero === undefined ? false : _settings$nullAddZero,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        label = settings.label,
        itemStyle = settings.itemStyle,
        lineStyle = settings.lineStyle,
        areaStyle = settings.areaStyle;
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible,
        tooltipFormatter = extra.tooltipFormatter;

    var metrics = columns.slice();

    if (axisSite.left && axisSite.right) {
      metrics = axisSite.left.concat(axisSite.right);
    } else if (axisSite.left && !axisSite.right) {
      metrics = axisSite.left;
    } else if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension[0]), 1);
    }

    var legend$$1 = legendVisible && getLegend$1({ metrics: metrics, legendName: legendName, labelMap: labelMap });
    var tooltip$$1 = tooltipVisible && getLineTooltip({
      axisSite: axisSite,
      yAxisType: yAxisType,
      digit: digit,
      labelMap: labelMap,
      xAxisType: xAxisType,
      tooltipFormatter: tooltipFormatter
    });
    var xAxis = getLineXAxis({
      dimension: dimension,
      rows: rows,
      xAxisName: xAxisName,
      axisVisible: axisVisible,
      xAxisType: xAxisType
    });
    var yAxis = getLineYAxis({
      yAxisName: yAxisName,
      yAxisType: yAxisType,
      axisVisible: axisVisible,
      scale: scale,
      min: min,
      max: max,
      digit: digit
    });
    var series = getLineSeries({
      rows: rows,
      axisSite: axisSite,
      metrics: metrics,
      area: area,
      stack: stack,
      nullAddZero: nullAddZero,
      labelMap: labelMap,
      label: label,
      itemStyle: itemStyle,
      lineStyle: lineStyle,
      areaStyle: areaStyle,
      xAxisType: xAxisType,
      dimension: dimension
    });
    var options = { legend: legend$$1, xAxis: xAxis, series: series, yAxis: yAxis, tooltip: tooltip$$1 };
    return options;
  };

  var VeLine = _extends({}, Core, {
    name: 'VeLine',
    data: function data() {
      this.chartHandler = line$1;
      return {};
    }
  });

  var pieRadius = 100;
  var ringRadius = [80, 100];
  var roseRingRadius = [20, 100];
  var pieOffsetY = 200;

  function getPieSeries(args) {
    var innerRows = args.innerRows,
        dataType = args.dataType,
        percentShow = args.percentShow,
        dimension = args.dimension,
        metrics = args.metrics,
        radius = args.radius,
        offsetY = args.offsetY,
        selectedMode = args.selectedMode,
        hoverAnimation = args.hoverAnimation,
        digit = args.digit,
        roseType = args.roseType,
        label = args.label,
        level = args.level,
        limitShowNum = args.limitShowNum,
        isRing = args.isRing,
        labelLine = args.labelLine,
        itemStyle = args.itemStyle;


    var series = [];
    var levelTemp = {};
    var rowsTemp = [];
    if (level) {
      level.forEach(function (levelItems, index) {
        levelItems.forEach(function (item) {
          setArrayValue(levelTemp, item, index);
        });
      });
      innerRows.forEach(function (row) {
        var itemLevel = levelTemp[row[dimension]];
        if (itemLevel && itemLevel.length) {
          itemLevel.forEach(function (levelItem) {
            setArrayValue(rowsTemp, levelItem, row);
          });
        }
      });
    } else {
      rowsTemp.push(innerRows);
    }
    var seriesBase = {
      type: 'pie',
      selectedMode: selectedMode,
      hoverAnimation: hoverAnimation,
      roseType: roseType,
      center: ['50%', offsetY]
    };
    var rowsTempLength = rowsTemp.length;
    rowsTemp.forEach(function (dataRows, index) {
      var seriesItem = _extends({ data: [] }, seriesBase);
      var centerWidth = radius / rowsTempLength;
      if (!index) {
        seriesItem.radius = isRing ? radius : centerWidth;
      } else {
        var outerWidth = centerWidth + radius / (2 * rowsTempLength) * (2 * index - 1);
        var innerWidth = outerWidth + radius / (2 * rowsTempLength);
        seriesItem.radius = [outerWidth, innerWidth];
      }
      if (rowsTempLength > 1 && index === 0) {
        seriesItem.label = {
          normal: { position: 'inner' }
        };
      }
      if (label) seriesItem.label = label;
      if (labelLine) seriesItem.labelLine = labelLine;
      if (itemStyle) seriesItem.itemStyle = itemStyle;
      if (percentShow) {
        seriesItem.label = {
          normal: {
            show: true,
            position: rowsTempLength > 1 && index === 0 ? 'inner' : 'outside',
            formatter: function formatter(item) {
              var tpl = [];
              tpl.push(item.name + ':');
              tpl.push(getFormated(item.value, dataType, digit));
              tpl.push('(' + item.percent + '%)');
              return tpl.join(' ');
            }
          }
        };
      }
      seriesItem.data = dataRows.map(function (row) {
        return {
          name: row[dimension],
          value: row[metrics]
        };
      });
      series.push(seriesItem);
    });
    if (limitShowNum && limitShowNum < series[0].data.length) {
      var firstData = series[0].data;
      var remainArr = firstData.slice(limitShowNum, firstData.length);
      var sum = 0;
      remainArr.forEach(function (item) {
        sum += item.value;
      });
      series[0].data = firstData.slice(0, limitShowNum);
      series[0].data.push({ name: '其他', value: sum });
    }
    return series;
  }

  function getPieLegend(args) {
    var innerRows = args.innerRows,
        dimension = args.dimension,
        legendLimit = args.legendLimit,
        legendName = args.legendName,
        level = args.level,
        limitShowNum = args.limitShowNum;

    var legend$$1 = [];
    var levelTemp = [];
    if (level) {
      level.forEach(function (levelItem) {
        levelItem.forEach(function (item) {
          levelTemp.push(item);
        });
      });
      legend$$1 = levelTemp;
    } else if (limitShowNum && limitShowNum < innerRows.length) {
      for (var i = 0; i < limitShowNum; i++) {
        legend$$1.push(innerRows[i][dimension]);
      }
      legend$$1.push('其他');
    } else {
      legend$$1 = innerRows.map(function (row) {
        return row[dimension];
      });
    }
    if (legend$$1.length) {
      return {
        data: legend$$1,
        show: legend$$1.length < legendLimit,
        formatter: function formatter(name) {
          return legendName[name] != null ? legendName[name] : name;
        }
      };
    } else {
      return false;
    }
  }

  function getPieTooltip(args) {
    var dataType = args.dataType,
        innerRows = args.innerRows,
        limitShowNum = args.limitShowNum,
        digit = args.digit,
        metrics = args.metrics,
        dimension = args.dimension;

    var sum = 0;
    var remainArr = innerRows.map(function (row) {
      sum += row[metrics];
      return {
        name: row[dimension],
        value: row[metrics]
      };
    }).slice(limitShowNum, innerRows.length);
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        if (limitShowNum && item.name === '其他') {
          tpl.push('其他:');
          remainArr.forEach(function (_ref) {
            var name = _ref.name,
                value = _ref.value;

            var percent = getFormated(value / sum, 'percent');
            tpl.push('<br>' + name + ':');
            tpl.push(getFormated(value, dataType, digit));
            tpl.push('(' + percent + ')');
          });
        } else {
          tpl.push(item.name + ':');
          tpl.push(getFormated(item.value, dataType, digit));
          tpl.push('(' + item.percent + '%)');
        }
        return tpl.join(' ');
      }
    };
  }

  var pie$1 = function pie$$1(columns, rows, settings, extra, isRing) {
    var innerRows = cloneDeep(rows);
    var _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
        percentShow = settings.percentShow,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$roseType = settings.roseType,
        roseType = _settings$roseType === undefined ? false : _settings$roseType,
        _settings$radius = settings.radius,
        radius = _settings$radius === undefined ? isRing ? roseType ? roseRingRadius : ringRadius : pieRadius : _settings$radius,
        _settings$offsetY = settings.offsetY,
        offsetY = _settings$offsetY === undefined ? pieOffsetY : _settings$offsetY,
        _settings$legendLimit = settings.legendLimit,
        legendLimit = _settings$legendLimit === undefined ? 30 : _settings$legendLimit,
        _settings$selectedMod = settings.selectedMode,
        selectedMode = _settings$selectedMod === undefined ? false : _settings$selectedMod,
        _settings$hoverAnimat = settings.hoverAnimation,
        hoverAnimation = _settings$hoverAnimat === undefined ? true : _settings$hoverAnimat,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$label = settings.label,
        label = _settings$label === undefined ? false : _settings$label,
        _settings$level = settings.level,
        level = _settings$level === undefined ? false : _settings$level,
        _settings$limitShowNu = settings.limitShowNum,
        limitShowNum = _settings$limitShowNu === undefined ? 0 : _settings$limitShowNu,
        labelLine = settings.labelLine,
        itemStyle = settings.itemStyle;
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible;

    if (limitShowNum) innerRows.sort(function (a, b) {
      return b[metrics] - a[metrics];
    });
    var seriesParams = {
      innerRows: innerRows,
      dataType: dataType,
      percentShow: percentShow,
      dimension: dimension,
      metrics: metrics,
      radius: radius,
      offsetY: offsetY,
      selectedMode: selectedMode,
      hoverAnimation: hoverAnimation,
      digit: digit,
      roseType: roseType,
      label: label,
      level: level,
      legendName: legendName,
      limitShowNum: limitShowNum,
      isRing: isRing,
      labelLine: labelLine,
      itemStyle: itemStyle
    };
    var series = getPieSeries(seriesParams);
    var legendParams = {
      innerRows: innerRows,
      dimension: dimension,
      legendLimit: legendLimit,
      legendName: legendName,
      level: level,
      limitShowNum: limitShowNum
    };
    var legend$$1 = legendVisible && getPieLegend(legendParams);
    var tooltip$$1 = tooltipVisible && getPieTooltip({
      dataType: dataType,
      innerRows: innerRows,
      limitShowNum: limitShowNum,
      digit: digit,
      metrics: metrics,
      dimension: dimension
    });
    var options = { series: series, legend: legend$$1, tooltip: tooltip$$1 };
    return options;
  };

  var ring = function ring(columns, rows, settings, extra) {
    return pie$1(columns, rows, settings, extra, true);
  };

  var VePie = _extends({}, Core, {
    name: 'VePie',
    data: function data() {
      this.chartHandler = pie$1;
      return {};
    }
  });

  var VeRing = _extends({}, Core, {
    name: 'VeRing',
    data: function data() {
      this.chartHandler = ring;
      return {};
    }
  });

  function getWaterfallTooltip(dataType, digit) {
    return {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function formatter(items) {
        var item = items[1];
        return [item.name + '<br/>' + item.seriesName + ' :', '' + getFormated(item.value, dataType, digit)].join('');
      }
    };
  }

  function getWaterfallXAxis(args) {
    var dimension = args.dimension,
        rows = args.rows,
        remainStatus = args.remainStatus,
        totalName = args.totalName,
        remainName = args.remainName,
        labelMap = args.labelMap,
        xAxisName = args.xAxisName,
        axisVisible = args.axisVisible;

    var xAxisData = [totalName].concat(rows.map(function (row) {
      return row[dimension];
    }));
    if (remainStatus === 'have-remain') {
      xAxisData = xAxisData.concat([remainName]);
    }

    return {
      type: 'category',
      name: labelMap && labelMap[xAxisName] || xAxisName,
      splitLine: { show: false },
      data: xAxisData,
      show: axisVisible
    };
  }

  function getWaterfallYAxis(args) {
    var dataType = args.dataType,
        yAxisName = args.yAxisName,
        axisVisible = args.axisVisible,
        digit = args.digit,
        labelMap = args.labelMap;

    return {
      type: 'value',
      name: labelMap[yAxisName] != null ? labelMap[yAxisName] : yAxisName,
      axisTick: { show: false },
      axisLabel: {
        formatter: function formatter(val) {
          return getFormated(val, dataType, digit);
        }
      },
      show: axisVisible
    };
  }

  function getWaterfallSeries(args) {
    var dataType = args.dataType,
        rows = args.rows,
        metrics = args.metrics,
        totalNum = args.totalNum,
        remainStatus = args.remainStatus,
        dataSum = args.dataSum,
        digit = args.digit;

    var seriesBase = { type: 'bar', stack: '总量' };
    var dataSumTemp = dataSum;
    var totalNumTemp = totalNum;
    var assistData = void 0;
    var mainData = void 0;
    var rowData = rows.map(function (row) {
      return row[metrics];
    });

    if (remainStatus === 'have-remain') {
      assistData = [0].concat(rows.map(function (row) {
        totalNumTemp -= row[metrics];
        return totalNumTemp;
      })).concat([0]);
      mainData = [totalNum].concat(rowData).concat([totalNum - dataSum]);
    } else {
      assistData = [0].concat(rows.map(function (row) {
        dataSumTemp -= row[metrics];
        return dataSumTemp;
      }));
      mainData = [dataSum].concat(rowData);
    }
    var series = [];

    series.push(_extends({
      name: '辅助',
      itemStyle: {
        normal: { opacity: 0 },
        emphasis: { opacity: 0 }
      },
      data: assistData
    }, seriesBase));

    series.push(_extends({
      name: '数值',
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: function formatter(item) {
            return getFormated(item.value, dataType, digit);
          }
        }
      },
      data: mainData
    }, seriesBase));
    return series;
  }

  function getWaterfallRemainStatus(dataSum, totalNum) {
    if (!totalNum) return 'not-total';
    return totalNum > dataSum ? 'have-remain' : 'none-remain';
  }

  var waterfall = function waterfall(columns, rows, settings, extra) {
    var _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$totalName = settings.totalName,
        totalName = _settings$totalName === undefined ? '总计' : _settings$totalName,
        totalNum = settings.totalNum,
        _settings$remainName = settings.remainName,
        remainName = _settings$remainName === undefined ? '其他' : _settings$remainName,
        _settings$xAxisName = settings.xAxisName,
        xAxisName = _settings$xAxisName === undefined ? dimension : _settings$xAxisName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$axisVisible = settings.axisVisible,
        axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit;
    var tooltipVisible = extra.tooltipVisible;

    var metricsTemp = columns.slice();
    metricsTemp.splice(metricsTemp.indexOf(dimension), 1);
    var metrics = metricsTemp[0];
    var yAxisName = metrics;
    var tooltip$$1 = tooltipVisible && getWaterfallTooltip(dataType, digit);
    var dataSum = parseFloat(rows.reduce(function (pre, cur) {
      return pre + Number(cur[metrics]);
    }, 0).toFixed(digit));
    var remainStatus = getWaterfallRemainStatus(dataSum, totalNum);
    var xAxisParams = {
      dimension: dimension,
      rows: rows,
      remainStatus: remainStatus,
      totalName: totalName,
      remainName: remainName,
      xAxisName: xAxisName,
      labelMap: labelMap,
      axisVisible: axisVisible
    };
    var xAxis = getWaterfallXAxis(xAxisParams);
    var yAxis = getWaterfallYAxis({ dataType: dataType, yAxisName: yAxisName, axisVisible: axisVisible, digit: digit, labelMap: labelMap });
    var seriesParams = {
      dataType: dataType,
      rows: rows,
      dimension: dimension,
      metrics: metrics,
      totalNum: totalNum,
      remainStatus: remainStatus,
      dataSum: dataSum,
      digit: digit
    };
    var series = getWaterfallSeries(seriesParams);
    var options = { tooltip: tooltip$$1, xAxis: xAxis, yAxis: yAxis, series: series };
    return options;
  };

  var VeWaterfall = _extends({}, Core, {
    name: 'VeWaterfall',
    data: function data() {
      this.chartHandler = waterfall;
      return {};
    }
  });

  function getFunnelTooltip(dataType, digit) {
    return {
      trigger: 'item',
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.name + ': ' + getFormated(item.data.realValue, dataType, digit));
        return tpl.join('');
      }
    };
  }

  function getFunnelLegend(args) {
    var data = args.data,
        legendName = args.legendName;

    return {
      data: data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function getFunnelSeries(args) {
    var dimension = args.dimension,
        metrics = args.metrics,
        rows = args.rows,
        sequence = args.sequence,
        ascending = args.ascending,
        label = args.label,
        labelLine = args.labelLine,
        itemStyle = args.itemStyle,
        filterZero = args.filterZero,
        useDefaultOrder = args.useDefaultOrder;

    var series = { type: 'funnel' };
    var innerRows = rows.sort(function (a, b) {
      return sequence.indexOf(a[dimension]) - sequence.indexOf(b[dimension]);
    });

    if (filterZero) {
      innerRows = innerRows.filter(function (row) {
        return row[metrics];
      });
    }

    var falseFunnel = false;
    innerRows.some(function (row, index) {
      if (index && row[metrics] > innerRows[index - 1][metrics]) {
        falseFunnel = true;
        return true;
      }
    });

    var step = 100 / innerRows.length;

    if (falseFunnel && !useDefaultOrder) {
      series.data = innerRows.slice().reverse().map(function (row, index) {
        return {
          name: row[dimension],
          value: (index + 1) * step,
          realValue: row[metrics]
        };
      });
    } else {
      series.data = innerRows.map(function (row) {
        return {
          name: row[dimension],
          value: row[metrics],
          realValue: row[metrics]
        };
      });
    }

    if (ascending) series.sort = 'ascending';
    if (label) series.label = label;
    if (labelLine) series.labelLine = labelLine;
    if (itemStyle) series.itemStyle = itemStyle;
    return series;
  }

  var funnel$1 = function funnel$$1(outerColumns, outerRows, settings, extra) {
    var columns = outerColumns.slice();
    var rows = outerRows.slice();
    var _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$sequence = settings.sequence,
        sequence = _settings$sequence === undefined ? rows.map(function (row) {
      return row[dimension];
    }) : _settings$sequence,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        ascending = settings.ascending,
        label = settings.label,
        labelLine = settings.labelLine,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        itemStyle = settings.itemStyle,
        filterZero = settings.filterZero,
        useDefaultOrder = settings.useDefaultOrder;
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible;

    var metrics = void 0;
    if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      var metricsTemp = columns.slice();
      metricsTemp.splice(columns.indexOf(dimension), 1);
      metrics = metricsTemp[0];
    }

    var tooltip$$1 = tooltipVisible && getFunnelTooltip(dataType, digit);
    var legend$$1 = legendVisible && getFunnelLegend({ data: sequence, legendName: legendName });
    var series = getFunnelSeries({
      dimension: dimension,
      metrics: metrics,
      rows: rows,
      sequence: sequence,
      ascending: ascending,
      label: label,
      labelLine: labelLine,
      itemStyle: itemStyle,
      filterZero: filterZero,
      useDefaultOrder: useDefaultOrder
    });
    var options = { tooltip: tooltip$$1, legend: legend$$1, series: series };
    return options;
  };

  var VeFunnel = _extends({}, Core, {
    name: 'VeFunnel',
    data: function data() {
      this.chartHandler = funnel$1;
      return {};
    }
  });

  function getRadarLegend(rows, dimension, legendName) {
    var legendData = rows.map(function (row) {
      return row[dimension];
    });

    return {
      data: legendData,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function getRadarTooltip(dataType, radar$$1, digit) {
    var typeTemp = [];
    var nameTemp = [];
    radar$$1.indicator.map(function (item, index) {
      typeTemp[index] = dataType[item.name];
      nameTemp[index] = item.name;
    });
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.name + '<br />');
        item.data.value.forEach(function (val, index) {
          tpl.push(nameTemp[index] + ': ');
          tpl.push(getFormated(val, typeTemp[index], digit) + '<br />');
        });
        return tpl.join('');
      }
    };
  }

  function getRadarSetting(rows, metrics, labelMap) {
    var settingBase = {
      indicator: [],
      shape: 'circle',
      splitNumber: 5
    };
    var indicatorTemp = {};
    rows.forEach(function (items) {
      metrics.forEach(function (item) {
        var key = labelMap[item] != null ? labelMap[item] : item;
        if (!indicatorTemp[key]) {
          indicatorTemp[key] = [items[item]];
        } else {
          indicatorTemp[key].push(items[item]);
        }
      });
    });
    settingBase.indicator = Object.keys(indicatorTemp).map(function (key) {
      return {
        name: key,
        max: Math.max.apply(null, indicatorTemp[key])
      };
    });
    return settingBase;
  }

  function getRadarSeries(args) {
    var rows = args.rows,
        dimension = args.dimension,
        metrics = args.metrics,
        radar$$1 = args.radar,
        label = args.label,
        itemStyle = args.itemStyle,
        lineStyle = args.lineStyle,
        labelMap = args.labelMap,
        areaStyle = args.areaStyle;

    var radarIndexObj = {};
    radar$$1.indicator.forEach(function (item, index) {
      var name = item.name;
      radarIndexObj[name] = index;
    });

    var seriesData = rows.map(function (row) {
      var serieData = {
        value: [],
        name: row[dimension]
      };
      Object.keys(row).forEach(function (key) {
        if (~metrics.indexOf(key)) {
          var k = labelMap[key] != null ? radarIndexObj[labelMap[key]] : radarIndexObj[key];
          serieData.value[k] = row[key];
        }
      });
      return serieData;
    });
    var result = {
      name: dimension,
      type: 'radar',
      data: seriesData
    };
    if (label) result.label = label;
    if (itemStyle) result.itemStyle = itemStyle;
    if (lineStyle) result.lineStyle = lineStyle;
    if (areaStyle) result.areaStyle = areaStyle;
    return [result];
  }

  var radar$1 = function radar$$1(columns, rows, settings, extra) {
    var _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? {} : _settings$dataType,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        label = settings.label,
        itemStyle = settings.itemStyle,
        lineStyle = settings.lineStyle,
        areaStyle = settings.areaStyle;
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible;

    var metrics = columns.slice();
    if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension), 1);
    }
    var legend$$1 = legendVisible && getRadarLegend(rows, dimension, legendName);
    var radar$$1 = getRadarSetting(rows, metrics, labelMap);
    var tooltip$$1 = tooltipVisible && getRadarTooltip(dataType, radar$$1, digit);
    var series = getRadarSeries({
      rows: rows,
      dimension: dimension,
      metrics: metrics,
      radar: radar$$1,
      label: label,
      itemStyle: itemStyle,
      lineStyle: lineStyle,
      labelMap: labelMap,
      areaStyle: areaStyle
    });
    var options = { legend: legend$$1, tooltip: tooltip$$1, radar: radar$$1, series: series };
    return options;
  };

  var VeRadar = _extends({}, Core, {
    name: 'VeRadar',
    data: function data() {
      this.chartHandler = radar$1;
      return {};
    }
  });

  var VeChart = _extends({}, Core, {
    name: 'VeChart',
    data: function data() {
      this.chartLib = {
        bar: bar$1,
        histogram: histogram,
        line: line$1,
        pie: pie$1,
        ring: ring,
        funnel: funnel$1,
        radar: radar$1,
        waterfall: waterfall
      };
      this.chartHandler = this.chartLib[this.settings.type];
      return {};
    }
  });

  function getTooltip(dataType, digit, dataStore, metrics, color, labelMap) {
    return {
      formatter: function formatter(item) {
        var tpl = [];
        if (!item.name) return '';
        tpl.push(item.name + '<br>');
        metrics.forEach(function (label, index) {
          var title = labelMap[label] != null ? labelMap[label] : label;
          tpl.push(itemPoint(color[index]) + ' ' + title + ' : ');
          if (dataStore[item.name]) {
            tpl.push(getFormated(dataStore[item.name][label], dataType[label], digit));
          } else {
            tpl.push('-');
          }
          tpl.push('<br>');
        });
        return tpl.join(' ');
      }
    };
  }

  function getSeries(args) {
    var position = args.position,
        selectData = args.selectData,
        dimension = args.dimension,
        metrics = args.metrics,
        rows = args.rows,
        label = args.label,
        itemStyle = args.itemStyle,
        selectedMode = args.selectedMode,
        roam = args.roam,
        center = args.center,
        aspectScale = args.aspectScale,
        boundingCoords = args.boundingCoords,
        zoom = args.zoom,
        labelMap = args.labelMap,
        scaleLimit = args.scaleLimit,
        mapGrid = args.mapGrid;

    var result = [];
    var mapBase = {
      type: 'map',
      mapType: position
    };

    metrics.forEach(function (itemName) {
      var itemResult = _extends({
        name: labelMap[itemName] != null ? labelMap[itemName] : itemName,
        data: [],
        selectedMode: selectedMode,
        roam: roam,
        center: center,
        aspectScale: aspectScale,
        boundingCoords: boundingCoords,
        zoom: zoom,
        scaleLimit: scaleLimit
      }, mapBase);

      if (mapGrid) {
        Object.keys(mapGrid).forEach(function (key) {
          itemResult[key] = mapGrid[key];
        });
      }

      setGeoLabel(itemStyle, itemResult, 'itemStyle');
      setGeoLabel(label, itemResult, 'label');

      rows.forEach(function (row) {
        itemResult.data.push({
          name: row[dimension],
          value: row[itemName],
          selected: selectData
        });
      });
      result.push(itemResult);
    });

    return result;
  }

  function setGeoLabel(value, target, label) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      target[label] = value;
    } else if (value) {
      target[label] = {
        normal: { show: true },
        emphasis: { show: true }
      };
    }
  }

  function getLegendMap(args) {
    var metrics = args.metrics,
        legendName = args.legendName,
        labelMap = args.labelMap;

    if (!legendName && !labelMap) return { data: metrics };
    var data = labelMap ? metrics.map(function (item) {
      return labelMap[item] == null ? item : labelMap[item];
    }) : metrics;
    return {
      data: data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function registerMap(args, mapOrigin) {
    var _once = args._once,
        registerSign = args.registerSign,
        beforeRegisterMap = args.beforeRegisterMap,
        beforeRegisterMapOnce = args.beforeRegisterMapOnce,
        registerSignOnce = args.registerSignOnce,
        position = args.position,
        specialAreas = args.specialAreas;

    if (!_once[registerSign]) {
      if (beforeRegisterMap) mapOrigin = beforeRegisterMap(mapOrigin);
      if (beforeRegisterMapOnce && !_once[registerSignOnce]) {
        _once[registerSignOnce] = true;
        mapOrigin = beforeRegisterMapOnce(mapOrigin);
      }
      _once[registerSign] = true;
      echartsLib.registerMap(position, mapOrigin, specialAreas);
    }
  }

  var map$1 = function map$$1(columns, rows, settings, extra) {
    var _settings$position = settings.position,
        position = _settings$position === undefined ? 'china' : _settings$position,
        _settings$selectData = settings.selectData,
        selectData = _settings$selectData === undefined ? false : _settings$selectData,
        selectedMode = settings.selectedMode,
        _settings$label = settings.label,
        label = _settings$label === undefined ? true : _settings$label,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? {} : _settings$dataType,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        roam = settings.roam,
        center = settings.center,
        aspectScale = settings.aspectScale,
        boundingCoords = settings.boundingCoords,
        zoom = settings.zoom,
        scaleLimit = settings.scaleLimit,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        mapGrid = settings.mapGrid,
        itemStyle = settings.itemStyle,
        positionJsonLink = settings.positionJsonLink,
        beforeRegisterMap = settings.beforeRegisterMap,
        beforeRegisterMapOnce = settings.beforeRegisterMapOnce,
        _settings$mapURLProfi = settings.mapURLProfix,
        mapURLProfix = _settings$mapURLProfi === undefined ? 'https://unpkg.com/echarts@3.6.2/map/json/' : _settings$mapURLProfi,
        _settings$specialArea = settings.specialAreas,
        specialAreas = _settings$specialArea === undefined ? {} : _settings$specialArea;

    var mapOrigin = settings.mapOrigin;
    var metrics = columns.slice();
    if (settings.metrics) {
      metrics = settings.metrics;
    } else {
      metrics.splice(columns.indexOf(dimension), 1);
    }
    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible,
        color = extra.color,
        _once = extra._once;

    var dataStore = {};
    rows.forEach(function (row) {
      dataStore[row[dimension]] = row;
    });
    var tooltip$$1 = tooltipVisible && getTooltip(dataType, digit, dataStore, metrics, color, labelMap);
    var legend$$1 = legendVisible && getLegendMap({ metrics: metrics, legendName: legendName, labelMap: labelMap });
    var seriesParams = {
      position: position,
      selectData: selectData,
      label: label,
      itemStyle: itemStyle,
      dimension: dimension,
      metrics: metrics,
      rows: rows,
      selectedMode: selectedMode,
      roam: roam,
      center: center,
      aspectScale: aspectScale,
      boundingCoords: boundingCoords,
      zoom: zoom,
      labelMap: labelMap,
      scaleLimit: scaleLimit,
      mapGrid: mapGrid
    };
    var series = getSeries(seriesParams);
    var registerOptions = {
      _once: _once,
      beforeRegisterMap: beforeRegisterMap,
      beforeRegisterMapOnce: beforeRegisterMapOnce,
      registerSign: 'MAP_REGISTER_' + position,
      registerSignOnce: 'ONCE_MAP_REGISTER_' + position,
      position: position,
      specialAreas: specialAreas
    };
    if (mapOrigin) {
      registerMap(registerOptions, mapOrigin);
      return { series: series, tooltip: tooltip$$1, legend: legend$$1 };
    } else {
      return getMapJSON({
        position: position,
        positionJsonLink: positionJsonLink,
        beforeRegisterMapOnce: beforeRegisterMapOnce,
        mapURLProfix: mapURLProfix
      }).then(function (json) {
        registerMap(registerOptions, json);
        return { series: series, tooltip: tooltip$$1, legend: legend$$1 };
      });
    }
  };

  var VeMap = _extends({}, Core, {
    name: 'VeMap',
    data: function data() {
      this.chartHandler = map$1;
      return {};
    }
  });

  var bmap$1 = function bmap$$1(_, __, settings, extra) {
    var key = settings.key,
        v = settings.v,
        bmap$$1 = settings.bmap,
        useOuterMap = settings.useOuterMap;
    var _once = extra._once;

    var registerSign = 'bmap_register';
    if (!key && !useOuterMap) console.warn('settings.key must be a string.');
    if (_once[registerSign]) return {};
    _once[registerSign] = true;
    if (useOuterMap) return { bmap: bmap$$1 };
    return getBmap(key, v).then(function (_) {
      return { bmap: bmap$$1 };
    });
  };

  var VeBmap = _extends({}, Core, {
    name: 'VeBmap',
    data: function data() {
      this.chartHandler = bmap$1;
      return {};
    }
  });

  var amap = function amap(_, __, settings, extra) {
    var key = settings.key,
        v = settings.v,
        amap = settings.amap,
        useOuterMap = settings.useOuterMap;
    var _once = extra._once;

    var registerSign = 'amap_register';
    if (!key && !useOuterMap) console.warn('settings.key must be a string.');
    if (_once[registerSign]) return {};
    _once[registerSign] = true;
    if (useOuterMap) return { amap: amap };
    return getAmap(key, v).then(function (_) {
      return { amap: amap };
    });
  };

  var VeAmap = _extends({}, Core, {
    name: 'VeAmap',
    data: function data() {
      this.chartHandler = amap;
      return {};
    }
  });

  function getTooltip$1(args) {
    var itemDataType = args.itemDataType,
        linksDataType = args.linksDataType,
        digit = args.digit;

    return {
      trigger: 'item',
      formatter: function formatter(item) {
        var tpl = [];
        var name = item.name,
            data = item.data,
            value = item.value,
            color = item.color;

        tpl.push(itemPoint(color));
        tpl.push(name + ' : ');
        if (data && data.source) {
          tpl.push(getFormated(value, linksDataType, digit) + '<br />');
        } else {
          tpl.push(getFormated(value, itemDataType, digit) + '<br />');
        }
        return tpl.join('');
      }
    };
  }

  function getSeries$1(args) {
    var rows = args.rows,
        dimension = args.dimension,
        metrics = args.metrics,
        links = args.links,
        valueFull = args.valueFull,
        useDataValue = args.useDataValue,
        label = args.label,
        itemStyle = args.itemStyle,
        lineStyle = args.lineStyle;

    var dataMap = {};
    var seriesData = rows.map(function (row) {
      dataMap[row[dimension]] = row[metrics];
      return { name: row[dimension], value: row[metrics] };
    });
    var innerLinks = null;
    if (useDataValue) {
      innerLinks = links.map(function (link) {
        return _extends({}, link, { value: dataMap[link.target] });
      });
    } else if (!valueFull) {
      innerLinks = links.map(function (link) {
        return link.value == null ? _extends({}, link, { value: dataMap[link.target] }) : link;
      });
    } else {
      innerLinks = links;
    }

    var result = {
      type: 'sankey',
      data: seriesData,
      links: innerLinks
    };
    if (label) result.label = label;
    if (itemStyle) result.itemStyle = itemStyle;
    if (lineStyle) result.lineStyle = lineStyle;
    return [result];
  }

  var sankey$1 = function sankey$$1(columns, rows, settings, extra) {
    var links = settings.links,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? ['normal', 'normal'] : _settings$dataType,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$valueFull = settings.valueFull,
        valueFull = _settings$valueFull === undefined ? false : _settings$valueFull,
        _settings$useDataValu = settings.useDataValue,
        useDataValue = _settings$useDataValu === undefined ? false : _settings$useDataValu,
        label = settings.label,
        itemStyle = settings.itemStyle,
        lineStyle = settings.lineStyle;


    if (!links) {
      console.warn('links is needed in settings!');
      return;
    }

    var itemDataType = dataType[0];
    var linksDataType = dataType[1];
    var tooltip$$1 = getTooltip$1({
      itemDataType: itemDataType,
      linksDataType: linksDataType,
      digit: digit
    });
    var series = getSeries$1({
      rows: rows,
      dimension: dimension,
      metrics: metrics,
      links: links,
      valueFull: valueFull,
      useDataValue: useDataValue,
      label: label,
      itemStyle: itemStyle,
      lineStyle: lineStyle
    });
    return { tooltip: tooltip$$1, series: series };
  };

  var VeSankey = _extends({}, Core, {
    name: 'VeSankey',
    data: function data() {
      this.chartHandler = sankey$1;
      return {};
    }
  });

  function getAxisList(rows, label) {
    var result = [];
    rows.forEach(function (row) {
      if (!~result.indexOf(row[label])) result.push(row[label]);
    });
    return result;
  }

  function getData(args) {
    var rows = args.rows,
        innerXAxisList = args.innerXAxisList,
        innerYAxisList = args.innerYAxisList,
        xDim = args.xDim,
        yDim = args.yDim,
        metrics = args.metrics,
        type = args.type,
        extraMetrics = args.extraMetrics;

    var result = null;
    if (type === 'cartesian') {
      result = rows.map(function (row) {
        var xIndex = innerXAxisList.indexOf(row[xDim]);
        var yIndex = innerYAxisList.indexOf(row[yDim]);
        var value = metrics ? row[metrics] : 1;
        var extraData = extraMetrics.map(function (m) {
          return row[m] || '-';
        });
        return { value: [xIndex, yIndex, value].concat(extraData) };
      });
    } else {
      result = rows.map(function (row) {
        var value = metrics ? row[metrics] : 1;
        return { value: [row[xDim], row[yDim], value] };
      });
    }
    return result;
  }

  function getAxis(list, name) {
    return {
      type: 'category',
      data: list,
      name: name,
      nameLocation: 'end',
      splitArea: { show: true }
    };
  }

  function getVisualMap(args) {
    var min = args.innerMin,
        max = args.innerMax,
        type = args.type,
        heatColor = args.heatColor,
        series = args.series;

    var result = {
      min: min,
      max: max,
      calculable: true
    };
    var extra = null;
    if (type === 'map') {
      extra = {
        orient: 'vertical',
        left: 0,
        bottom: 0,
        inRange: { color: heatColor || HEAT_MAP_COLOR }
      };
      if (!series[0].data.length) extra.show = false;
    } else if (type === 'bmap' || type === 'amap') {
      extra = {
        show: false,
        orient: 'vertical',
        left: 0,
        bottom: 0,
        inRange: { color: heatColor || HEAT_BMAP_COLOR }
      };
    } else {
      extra = {
        orient: 'horizontal',
        left: 'center',
        bottom: 10,
        dimension: 2,
        inRange: heatColor && { color: heatColor }
      };
    }

    return _extends(result, extra);
  }

  function getSeries$2(args) {
    var chartData = args.chartData;

    return [{
      type: 'heatmap',
      data: chartData
    }];
  }

  function getTooltip$2(args) {
    var dataType = args.dataType,
        innerXAxisList = args.innerXAxisList,
        innerYAxisList = args.innerYAxisList,
        digit = args.digit,
        extraMetrics = args.extraMetrics,
        metrics = args.metrics;


    return {
      trigger: 'item',
      formatter: function formatter(_ref) {
        var color = _ref.color,
            _ref$data$value = toArray(_ref.data.value),
            xDim = _ref$data$value[0],
            yDim = _ref$data$value[1],
            value = _ref$data$value[2],
            extraData = _ref$data$value.slice(3);

        var tpl = [];
        tpl.push(innerXAxisList[xDim] + ' ~ ' + innerYAxisList[yDim] + '<br>');
        extraMetrics.forEach(function (m, index) {
          tpl.push(m + ': ' + extraData[index] + '<br>');
        });
        tpl.push(itemPoint(color) + ' ' + metrics + ': ' + getFormated(value, dataType, digit) + '<br>');
        return tpl.join('');
      }
    };
  }

  var heatmap$1 = function heatmap$$1(columns, rows, settings, status) {
    var _settings$type = settings.type,
        type = _settings$type === undefined ? 'cartesian' : _settings$type,
        xAxisList = settings.xAxisList,
        yAxisList = settings.yAxisList,
        _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? [columns[0], columns[1]] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[2] : _settings$metrics,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
        min = settings.min,
        max = settings.max,
        digit = settings.digit,
        bmap$$1 = settings.bmap,
        amap = settings.amap,
        geo = settings.geo,
        key = settings.key,
        _settings$v = settings.v,
        v = _settings$v === undefined ? '2.0' : _settings$v,
        position = settings.position,
        positionJsonLink = settings.positionJsonLink,
        beforeRegisterMap = settings.beforeRegisterMap,
        _settings$pointSize = settings.pointSize,
        pointSize = _settings$pointSize === undefined ? 10 : _settings$pointSize,
        _settings$blurSize = settings.blurSize,
        blurSize = _settings$blurSize === undefined ? 5 : _settings$blurSize,
        heatColor = settings.heatColor,
        yAxisName = settings.yAxisName,
        xAxisName = settings.xAxisName,
        beforeRegisterMapOnce = settings.beforeRegisterMapOnce,
        _settings$mapURLProfi = settings.mapURLProfix,
        mapURLProfix = _settings$mapURLProfi === undefined ? 'https://unpkg.com/echarts@3.6.2/map/json/' : _settings$mapURLProfi,
        _settings$specialArea = settings.specialAreas,
        specialAreas = _settings$specialArea === undefined ? {} : _settings$specialArea;
    var tooltipVisible = status.tooltipVisible;

    var innerXAxisList = xAxisList;
    var innerYAxisList = yAxisList;
    var chartData = [];
    // add extraMetrics prop for data which only display in tooltip
    var extraMetrics = [];
    var mainColumn = dimension.concat([metrics]);
    columns.forEach(function (column) {
      if (!~mainColumn.indexOf(column)) extraMetrics.push(column);
    });

    if (type === 'cartesian') {
      if (!innerXAxisList || !innerXAxisList.length) {
        innerXAxisList = getAxisList(rows, dimension[0]);
      }
      if (!innerYAxisList || !innerYAxisList.length) {
        innerYAxisList = getAxisList(rows, dimension[1]);
      }
      chartData = getData({
        rows: rows,
        innerXAxisList: innerXAxisList,
        innerYAxisList: innerYAxisList,
        xDim: dimension[0],
        yDim: dimension[1],
        metrics: metrics,
        type: type,
        extraMetrics: extraMetrics
      });
    } else {
      chartData = getData({
        rows: rows,
        xDim: dimension[0],
        yDim: dimension[1],
        metrics: metrics,
        type: type,
        extraMetrics: extraMetrics
      });
    }
    var metricsList = metrics ? rows.map(function (row) {
      return row[metrics];
    }) : [0, 5];
    if (!metricsList.length) metricsList = [0];
    var innerMin = min || Math.min.apply(null, metricsList);
    var innerMax = max || Math.max.apply(null, metricsList);

    var xAxis = getAxis(innerXAxisList, xAxisName);
    var yAxis = getAxis(innerYAxisList, yAxisName);
    var series = getSeries$2({ chartData: chartData });
    var visualMap$$1 = getVisualMap({ innerMin: innerMin, innerMax: innerMax, type: type, heatColor: heatColor, series: series });
    var tooltip$$1 = tooltipVisible && getTooltip$2({
      dataType: dataType,
      innerXAxisList: innerXAxisList,
      innerYAxisList: innerYAxisList,
      digit: digit,
      extraMetrics: extraMetrics,
      metrics: metrics
    });

    var options = { visualMap: visualMap$$1, series: series };
    if (type === 'bmap') {
      _extends(options.series[0], { coordinateSystem: 'bmap', pointSize: pointSize, blurSize: blurSize });

      return getBmap(key, v).then(function (_) {
        return _extends({ bmap: bmap$$1 }, options);
      });
    } else if (type === 'map') {
      options.series[0].coordinateSystem = 'geo';
      return getMapJSON({
        position: position,
        positionJsonLink: positionJsonLink,
        beforeRegisterMapOnce: beforeRegisterMapOnce,
        mapURLProfix: mapURLProfix
      }).then(function (json) {
        var geoAttr = _extends({ map: position }, geo);
        if (beforeRegisterMap) json = beforeRegisterMap(json);
        echartsLib.registerMap(position, json, specialAreas);
        return _extends({ geo: geoAttr }, options);
      });
    } else if (type === 'amap') {
      _extends(options.series[0], { coordinateSystem: 'amap', pointSize: pointSize, blurSize: blurSize });

      return getAmap(key, v).then(function (_) {
        return _extends({ amap: amap }, options);
      });
    } else {
      return _extends({ xAxis: xAxis, yAxis: yAxis, tooltip: tooltip$$1 }, options);
    }
  };

  var VeHeatmap = _extends({}, Core, {
    name: 'VeHeatmap',
    data: function data() {
      this.chartHandler = heatmap$1;
      return {};
    }
  });

  function getScatterLegend(dataLabels, legendName) {
    return {
      data: dataLabels,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function getScatterTooltip(args) {
    var tooltipTrigger = args.tooltipTrigger;

    return {
      trigger: tooltipTrigger,
      formatter: function formatter(item) {
        if (isArray(item)) {
          return item.map(function (i) {
            return getTooltipContent(i, args);
          }).join('');
        } else {
          return getTooltipContent(item, args);
        }
      }
    };
  }

  function getTooltipContent(item, args) {
    var labelMap = args.labelMap,
        columns = args.columns,
        dataType = args.dataType,
        digit = args.digit;

    var tpl = [];
    var color = item.color,
        seriesName = item.seriesName,
        value = item.data.value;

    tpl.push(itemPoint(color) + ' ' + seriesName + '<br>');
    value.forEach(function (d, i) {
      var name = labelMap[columns[i]] || columns[i];
      var num = isNaN(d) ? d : getFormated(d, dataType[columns[i]], digit);
      tpl.push(name + ': ' + num + '<br>');
    });
    return tpl.join('');
  }

  function getScatterXAxis(args) {
    var xAxisName = args.xAxisName,
        axisVisible = args.axisVisible,
        xAxisType = args.xAxisType,
        rows = args.rows,
        dataLabels = args.dataLabels,
        dimension = args.dimension;

    var data = [];
    dataLabels.forEach(function (dataLabel) {
      var itemData = rows[dataLabel];
      itemData.forEach(function (item) {
        var name = item[dimension];
        if (name && !~data.indexOf(name)) data.push(name);
      });
    });

    return [{
      type: xAxisType,
      show: axisVisible,
      name: xAxisName,
      data: data
    }];
  }

  function getScatterYAxis(args) {
    var min = args.min,
        max = args.max,
        scale = args.scale,
        yAxisName = args.yAxisName,
        dataType = args.dataType,
        metrics = args.metrics,
        digit = args.digit,
        axisVisible = args.axisVisible;


    return {
      type: 'value',
      show: axisVisible,
      scale: scale,
      min: min,
      max: max,
      axisTick: { show: false },
      name: yAxisName,
      axisLabel: {
        formatter: function formatter(val) {
          return getFormated(val, dataType[metrics[0]], digit);
        }
      }
    };
  }

  function getScatterSeries(args) {
    var rows = args.rows,
        dataLabels = args.dataLabels,
        columns = args.columns,
        metrics = args.metrics,
        dimension = args.dimension,
        label = args.label,
        itemStyle = args.itemStyle,
        symbol = args.symbol,
        symbolSizeMax = args.symbolSizeMax,
        symbolSize = args.symbolSize,
        symbolRotate = args.symbolRotate,
        symbolOffset = args.symbolOffset,
        cursor = args.cursor;

    var extraMetrics = columns.filter(function (column) {
      return !~metrics.indexOf(column) && column !== dimension;
    });
    var numbers = [];
    dataLabels.forEach(function (dataLabel) {
      rows[dataLabel].forEach(function (row) {
        numbers.push(row[metrics[1]]);
      });
    });
    var maxNum = Math.max.apply(null, numbers);

    var series = [];
    dataLabels.forEach(function (dataLabel) {
      var result = [];
      var itemData = rows[dataLabel];
      itemData.forEach(function (item) {
        var itemResult = { value: [] };
        itemResult.value.push(item[dimension], item[metrics[0]], item[metrics[1]]);
        extraMetrics.forEach(function (ext) {
          itemResult.value.push(item[ext]);
        });
        itemResult.symbolSize = symbolSize || item[metrics[1]] / maxNum * symbolSizeMax;
        result.push(itemResult);
      });
      series.push({
        type: 'scatter',
        data: result,
        name: dataLabel,
        label: label,
        itemStyle: itemStyle,
        symbol: symbol,
        symbolRotate: symbolRotate,
        symbolOffset: symbolOffset,
        cursor: cursor
      });
    });
    return series;
  }

  var scatter$1 = function scatter$$1(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? [columns[1], columns[2]] : _settings$metrics,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? {} : _settings$dataType,
        _settings$xAxisType = settings.xAxisType,
        xAxisType = _settings$xAxisType === undefined ? 'category' : _settings$xAxisType,
        xAxisName = settings.xAxisName,
        yAxisName = settings.yAxisName,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$tooltipTrig = settings.tooltipTrigger,
        tooltipTrigger = _settings$tooltipTrig === undefined ? 'item' : _settings$tooltipTrig,
        _settings$axisVisible = settings.axisVisible,
        axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
        _settings$symbolSizeM = settings.symbolSizeMax,
        symbolSizeMax = _settings$symbolSizeM === undefined ? 50 : _settings$symbolSizeM,
        symbol = settings.symbol,
        symbolSize = settings.symbolSize,
        symbolRotate = settings.symbolRotate,
        symbolOffset = settings.symbolOffset,
        cursor = settings.cursor,
        min = settings.min,
        max = settings.max,
        scale = settings.scale,
        label = settings.label,
        itemStyle = settings.itemStyle;


    if (isArray(rows)) {
      var lineSettings = _extends({}, settings, {
        xAxisName: xAxisName ? [xAxisName] : undefined,
        yAxisName: yAxisName ? [yAxisName] : undefined,
        scale: scale ? [scale] : undefined,
        min: min ? [min] : undefined,
        max: max ? [max] : undefined,
        dimension: dimension ? [dimension] : undefined
      });
      var options = line$1(columns, rows, lineSettings, extra);
      if (!options || !options.series) return {};
      options.series.forEach(function (item) {
        _extends(item, {
          type: 'scatter',
          symbol: symbol,
          symbolSize: symbolSize || 10,
          symbolRotate: symbolRotate,
          symbolOffset: symbolOffset,
          cursor: cursor,
          label: label,
          itemStyle: itemStyle
        });
      });
      return options;
    }

    var tooltipVisible = extra.tooltipVisible,
        legendVisible = extra.legendVisible;

    var dataLabels = Object.keys(rows);

    var legend$$1 = legendVisible && getScatterLegend(dataLabels, legendName);
    var tooltip$$1 = tooltipVisible && getScatterTooltip({
      tooltipTrigger: tooltipTrigger,
      labelMap: labelMap,
      columns: columns,
      dataType: dataType,
      digit: digit
    });
    var xAxis = getScatterXAxis({
      xAxisName: xAxisName,
      axisVisible: axisVisible,
      xAxisType: xAxisType,
      dataLabels: dataLabels,
      dimension: dimension,
      rows: rows
    });
    var yAxis = getScatterYAxis({
      min: min,
      max: max,
      scale: scale,
      yAxisName: yAxisName,
      dataType: dataType,
      metrics: metrics,
      digit: digit,
      axisVisible: axisVisible
    });
    var series = getScatterSeries({
      rows: rows,
      dataLabels: dataLabels,
      columns: columns,
      metrics: metrics,
      dimension: dimension,
      label: label,
      itemStyle: itemStyle,
      symbol: symbol,
      symbolSizeMax: symbolSizeMax,
      symbolSize: symbolSize,
      symbolRotate: symbolRotate,
      symbolOffset: symbolOffset,
      cursor: cursor
    });
    return { legend: legend$$1, tooltip: tooltip$$1, xAxis: xAxis, yAxis: yAxis, series: series };
  };

  var VeScatter = _extends({}, Core, {
    name: 'VeScatter',
    data: function data() {
      this.chartHandler = scatter$1;
      return {};
    }
  });

  var DEFAULT_MA = [5, 10, 20, 30];
  var DEFAULT_K_NAME = '日K';
  var DEFAULT_DOWN_COLOR = '#ec0000';
  var DEFAULT_UP_COLOR = '#00da3c';
  var DEFAULT_START = 50;
  var DEFAULT_END = 100;
  var SHOW_FALSE = { show: false };

  function getCandleLegend(args) {
    var showMA = args.showMA,
        MA = args.MA,
        legendName = args.legendName,
        labelMap = args.labelMap;

    var data = [DEFAULT_K_NAME];
    if (showMA) data = data.concat(MA.map(function (v) {
      return 'MA' + v;
    }));
    if (labelMap) data = data.map(function (v) {
      return labelMap[v] == null ? v : labelMap[v];
    });
    return {
      data: data,
      formatter: function formatter(name) {
        return legendName[name] != null ? legendName[name] : name;
      }
    };
  }

  function getCandleTooltip(args) {
    var metrics = args.metrics,
        dataType = args.dataType,
        digit = args.digit,
        labelMap = args.labelMap;

    return {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      position: function position(pos, params, el, elRect, size) {
        var result = { top: 10 };
        var side = pos[0] < size.viewSize[0] / 2 ? 'right' : 'left';
        result[side] = 60;
        return result;
      },
      formatter: function formatter(options) {
        var tpl = [];
        tpl.push(options[0].axisValue + '<br>');
        options.forEach(function (option) {
          var data = option.data,
              seriesName = option.seriesName,
              componentSubType = option.componentSubType,
              color = option.color;

          var name = labelMap[seriesName] == null ? seriesName : labelMap[seriesName];
          tpl.push(itemPoint(color) + ' ' + name + ': ');
          if (componentSubType === 'candlestick') {
            tpl.push('<br>');
            metrics.slice(0, 4).forEach(function (m, i) {
              var name = labelMap[m] != null ? labelMap[m] : m;
              var val = getFormated(data[i + 1], dataType, digit);
              tpl.push('- ' + name + ': ' + val + '<br>');
            });
          } else if (componentSubType === 'line') {
            var val = getFormated(data, dataType, digit);
            tpl.push(val + '<br>');
          } else if (componentSubType === 'bar') {
            var _val = getFormated(data[1], dataType, digit);
            tpl.push(_val + '<br>');
          }
        });
        return tpl.join('');
      }
    };
  }

  function getCandleVisualMap(args) {
    var downColor = args.downColor,
        upColor = args.upColor,
        MA = args.MA,
        showMA = args.showMA;

    return {
      show: false,
      seriesIndex: showMA ? 1 + MA.length : 1,
      dimension: 2,
      pieces: [{ value: 1, color: downColor }, { value: -1, color: upColor }]
    };
  }

  function getCandleGrid(args) {
    var showVol = args.showVol;

    return [{
      left: '10%',
      right: '8%',
      top: '10%',
      height: showVol ? '50%' : '65%',
      containLabel: false
    }, {
      left: '10%',
      right: '8%',
      top: '65%',
      height: '16%',
      containLabel: false
    }];
  }

  function getCandleXAxis(args) {
    var data = args.dims;

    var type = 'category';
    var scale = true;
    var boundaryGap = false;
    var splitLine = SHOW_FALSE;
    var axisLine = { onZero: false };
    var axisTick = SHOW_FALSE;
    var axisLabel = SHOW_FALSE;
    var min = 'dataMin';
    var max = 'dataMax';
    var gridIndex = 1;

    return [{ type: type, data: data, scale: scale, boundaryGap: boundaryGap, axisLine: axisLine, splitLine: splitLine, min: min, max: max }, { type: type, gridIndex: gridIndex, data: data, scale: scale, boundaryGap: boundaryGap, axisLine: axisLine, axisTick: axisTick, splitLine: splitLine, axisLabel: axisLabel, min: min, max: max }];
  }

  function getCandleYAxis(args) {
    var dataType = args.dataType,
        digit = args.digit;

    var scale = true;
    var gridIndex = 1;
    var splitNumber = 2;
    var axisLine = SHOW_FALSE;
    var axisTick = SHOW_FALSE;
    var axisLabel = SHOW_FALSE;
    var splitLine = SHOW_FALSE;
    var formatter = function formatter(val) {
      return getFormated(val, dataType, digit);
    };

    return [{ scale: scale, axisTick: axisTick, axisLabel: { formatter: formatter } }, { scale: scale, gridIndex: gridIndex, splitNumber: splitNumber, axisLine: axisLine, axisTick: axisTick, splitLine: splitLine, axisLabel: axisLabel }];
  }

  function getCandleDataZoom(args) {
    var start = args.start,
        end = args.end;


    return [{
      type: 'inside',
      xAxisIndex: [0, 1],
      start: start,
      end: end
    }, {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: start,
      end: end
    }];
  }

  function getCandleSeries(args) {
    var values = args.values,
        volumes = args.volumes,
        upColor = args.upColor,
        downColor = args.downColor,
        showMA = args.showMA,
        MA = args.MA,
        showVol = args.showVol,
        labelMap = args.labelMap,
        digit = args.digit,
        itemStyle = args.itemStyle;

    var style = itemStyle || {
      normal: {
        color: upColor,
        color0: downColor,
        borderColor: null,
        borderColor0: null
      }
    };
    var lineStyle = { normal: { opacity: 0.5 } };
    var series = [{
      name: labelMap[DEFAULT_K_NAME] == null ? DEFAULT_K_NAME : labelMap[DEFAULT_K_NAME],
      type: 'candlestick',
      data: values,
      itemStyle: style
    }];

    if (showMA) {
      MA.forEach(function (d) {
        var name = 'MA' + d;
        series.push({
          name: labelMap[name] == null ? name : labelMap[name],
          data: calculateMA(d, values, digit),
          type: 'line',
          lineStyle: lineStyle,
          smooth: true
        });
      });
    }

    if (showVol) {
      series.push({
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumes
      });
    }

    return series;
  }

  function calculateMA(dayCount, data, digit) {
    var result = [];
    data.forEach(function (d, i) {
      if (i < dayCount) {
        result.push('-');
      } else {
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }result.push(+(sum / dayCount).toFixed(digit));
      }
    });
    return result;
  }

  var candle = function candle(columns, rows, settings, status) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns.slice(1, 6) : _settings$metrics,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        itemStyle = settings.itemStyle,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$MA = settings.MA,
        MA = _settings$MA === undefined ? DEFAULT_MA : _settings$MA,
        _settings$showMA = settings.showMA,
        showMA = _settings$showMA === undefined ? false : _settings$showMA,
        _settings$showVol = settings.showVol,
        showVol = _settings$showVol === undefined ? false : _settings$showVol,
        _settings$showDataZoo = settings.showDataZoom,
        showDataZoom = _settings$showDataZoo === undefined ? false : _settings$showDataZoo,
        _settings$downColor = settings.downColor,
        downColor = _settings$downColor === undefined ? DEFAULT_DOWN_COLOR : _settings$downColor,
        _settings$upColor = settings.upColor,
        upColor = _settings$upColor === undefined ? DEFAULT_UP_COLOR : _settings$upColor,
        _settings$start = settings.start,
        start = _settings$start === undefined ? DEFAULT_START : _settings$start,
        _settings$end = settings.end,
        end = _settings$end === undefined ? DEFAULT_END : _settings$end,
        dataType = settings.dataType;
    var tooltipVisible = status.tooltipVisible,
        legendVisible = status.legendVisible;


    var isLiteData = isArray(rows[0]);
    var dims = [];
    var values = [];
    var volumes = [];
    var candleMetrics = metrics.slice(0, 4);
    var volumeMetrics = metrics[4];

    if (isLiteData) {
      rows.forEach(function (row) {
        var itemResult = [];
        dims.push(row[columns.indexOf(dimension)]);
        candleMetrics.forEach(function (item) {
          itemResult.push(row[columns.indexOf(item)]);
        });
        values.push(itemResult);
        if (volumeMetrics) volumes.push(row[columns.indexOf(volumeMetrics)]);
      });
    } else {
      rows.forEach(function (row, index) {
        var itemResult = [];
        dims.push(row[dimension]);
        candleMetrics.forEach(function (item) {
          itemResult.push(row[item]);
        });
        values.push(itemResult);
        if (volumeMetrics) {
          var _status = row[metrics[0]] > row[metrics[1]] ? 1 : -1;
          volumes.push([index, row[volumeMetrics], _status]);
        }
      });
    }

    var legend$$1 = legendVisible && getCandleLegend({ showMA: showMA, MA: MA, legendName: legendName, labelMap: labelMap });
    var tooltip$$1 = tooltipVisible && getCandleTooltip({ metrics: metrics, dataType: dataType, digit: digit, labelMap: labelMap });
    var visualMap$$1 = showVol && getCandleVisualMap({ downColor: downColor, upColor: upColor, MA: MA, showMA: showMA });
    var dataZoom$$1 = showDataZoom && getCandleDataZoom({ start: start, end: end });
    var grid = getCandleGrid({ showVol: showVol });
    var xAxis = getCandleXAxis({ dims: dims });
    var yAxis = getCandleYAxis({ dataType: dataType, digit: digit });
    var series = getCandleSeries({
      values: values,
      volumes: volumes,
      upColor: upColor,
      downColor: downColor,
      showMA: showMA,
      MA: MA,
      showVol: showVol,
      labelMap: labelMap,
      digit: digit,
      itemStyle: itemStyle
    });
    var axisPointer = { link: { xAxisIndex: 'all' } };
    return { legend: legend$$1, tooltip: tooltip$$1, visualMap: visualMap$$1, grid: grid, xAxis: xAxis, yAxis: yAxis, dataZoom: dataZoom$$1, series: series, axisPointer: axisPointer };
  };

  var VeCandle = _extends({}, Core, {
    name: 'VeCandle',
    data: function data() {
      this.chartHandler = candle;
      return {};
    }
  });

  function getTooltip$3(args) {
    var tooltipFormatter = args.tooltipFormatter,
        dataType = args.dataType,
        digit = args.digit;

    return {
      formatter: function formatter(options) {
        var seriesName = options.seriesName,
            _options$data = options.data,
            value = _options$data.value,
            name = _options$data.name;

        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, arguments);
        }
        var tpl = [];
        tpl.push(seriesName + ': ');
        tpl.push(getFormated(value, dataType[seriesName], digit) + ' ' + name);
        return tpl.join('');
      }
    };
  }

  function getSeries$3(args) {
    var rows = args.rows,
        dimension = args.dimension,
        metrics = args.metrics,
        digit = args.digit,
        dataType = args.dataType,
        labelMap = args.labelMap,
        seriesMap = args.seriesMap,
        dataName = args.dataName;


    var series = rows.map(function (row) {
      var label = row[dimension];
      var seriesItem = seriesMap[label];
      var result = {
        type: 'gauge',
        name: labelMap[label] != null ? labelMap[label] : label,
        data: [{
          name: dataName[label] || '',
          value: row[metrics]
        }],
        detail: {
          formatter: function formatter(v) {
            return getFormated(v, dataType[label], digit);
          }
        },
        axisLabel: {
          formatter: function formatter(v) {
            return getFormated(v, dataType[label], digit);
          }
        }
      };

      if (seriesItem) {
        Object.keys(seriesItem).forEach(function (key) {
          if (isObject(result[key])) {
            _extends(result[key], seriesItem[key]);
          } else {
            result[key] = seriesItem[key];
          }
        });
      }

      return result;
    });

    return series;
  }

  var gauge$1 = function gauge$$1(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? {} : _settings$dataType,
        _settings$labelMap = settings.labelMap,
        labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
        _settings$seriesMap = settings.seriesMap,
        seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap,
        _settings$dataName = settings.dataName,
        dataName = _settings$dataName === undefined ? {} : _settings$dataName;
    var tooltipFormatter = extra.tooltipFormatter,
        tooltipVisible = extra.tooltipVisible;


    var tooltip$$1 = tooltipVisible && getTooltip$3({
      tooltipFormatter: tooltipFormatter,
      dataType: dataType
    });

    var series = getSeries$3({
      rows: rows,
      dimension: dimension,
      metrics: metrics,
      digit: digit,
      dataType: dataType,
      labelMap: labelMap,
      seriesMap: seriesMap,
      dataName: dataName
    });
    return { tooltip: tooltip$$1, series: series };
  };

  var VeGauge = _extends({}, Core, {
    name: 'VeGauge',
    data: function data() {
      this.chartHandler = gauge$1;
      return {};
    }
  });

  function getTreeLegend(args) {
    var dimension = args.dimension,
        rows = args.rows;

    var result = rows.map(function (row) {
      return row[dimension];
    });
    return { data: result };
  }

  function getTreeTooltip(args) {
    var tooltipFormatter = args.tooltipFormatter;


    return {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: tooltipFormatter
    };
  }

  function getTreeSeries(args) {
    var dimension = args.dimension,
        metrics = args.metrics,
        rows = args.rows,
        seriesMap = args.seriesMap;


    var series = [];
    rows.forEach(function (row) {
      var label = row[dimension];
      var seriesItem = seriesMap[label];
      var result = {
        type: 'tree',
        name: row[dimension],
        data: row[metrics]
      };
      if (seriesMap[row[dimension]]) {
        Object.keys(seriesItem).forEach(function (key) {
          if (isObject(result[key])) {
            _extends(result[key], seriesItem[key]);
          } else {
            result[key] = seriesItem[key];
          }
        });
      }
      series.push(result);
    });

    return series;
  }

  var tree$1 = function tree$$1(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$seriesMap = settings.seriesMap,
        seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap;
    var legendVisible = extra.legendVisible,
        tooltipFormatter = extra.tooltipFormatter,
        tooltipVisible = extra.tooltipVisible;


    var series = getTreeSeries({
      dimension: dimension,
      metrics: metrics,
      rows: rows,
      seriesMap: seriesMap
    });
    var legend$$1 = legendVisible && rows.length > 1 && getTreeLegend({
      dimension: dimension,
      rows: rows
    });
    var tooltip$$1 = tooltipVisible && getTreeTooltip({
      tooltipFormatter: tooltipFormatter
    });
    return { series: series, legend: legend$$1, tooltip: tooltip$$1 };
  };

  var VeTree = _extends({}, Core, {
    name: 'VeTree',
    data: function data() {
      this.chartHandler = tree$1;
      return {};
    }
  });

  function getTooltip$4(args) {
    var tooltipFormatter = args.tooltipFormatter,
        dataType = args.dataType,
        digit = args.digit;


    return {
      show: true,
      formatter: function formatter(options) {
        var seriesName = options.seriesName,
            value = options.value;

        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, arguments);
        }

        return [seriesName + ': ', getFormated(value, dataType, digit)].join('');
      }
    };
  }

  function getSeries$4(args) {
    var dimension = args.dimension,
        metrics = args.metrics,
        seriesMap = args.seriesMap,
        rows = args.rows,
        wave = args.wave;


    var itemWave = wave;
    var len = isArray(seriesMap) ? seriesMap.length : 0;

    return rows.slice().map(function (item, index) {
      var data = [];
      var result = {
        type: 'liquidFill'
      };

      var name = item[dimension];
      var val = Number(item[metrics]);
      var itemMap = {};

      if (isArray(seriesMap)) {
        itemMap = !seriesMap[index] ? seriesMap[len - 1] : seriesMap[index];
      } else if (isObject(seriesMap[name])) {
        itemMap = seriesMap[name];
      }

      if (isArray(wave) && isArray(wave[0])) {
        itemWave = isArray(wave[index]) ? wave[index] : wave[wave.length - 1];
      }

      // 根据传入的数据(rows)和额外配置(seriesMap)的数据组合data
      data.push({ value: val });
      if (itemWave && itemWave.length) {
        data = data.concat(itemWave.map(function (val) {
          return { value: val };
        }));
      }

      result = _extends(result, { data: data, name: name }, itemMap);
      return result;
    });
  }

  var liquidfill = function liquidfill(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$seriesMap = settings.seriesMap,
        seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap,
        _settings$dataType = settings.dataType,
        dataType = _settings$dataType === undefined ? 'percent' : _settings$dataType,
        _settings$digit = settings.digit,
        digit = _settings$digit === undefined ? 2 : _settings$digit,
        _settings$wave = settings.wave,
        wave = _settings$wave === undefined ? [] : _settings$wave;
    var tooltipVisible = extra.tooltipVisible,
        tooltipFormatter = extra.tooltipFormatter;


    var tooltip$$1 = tooltipVisible && getTooltip$4({
      tooltipFormatter: tooltipFormatter,
      dataType: dataType,
      digit: digit
    });
    var series = getSeries$4({
      rows: rows,
      columns: columns,
      dimension: dimension,
      metrics: metrics,
      seriesMap: seriesMap,
      wave: wave
    });

    return {
      tooltip: tooltip$$1,
      series: series
    };
  };

  var VeLiquidfill = _extends({}, Core, {
    name: 'VeLiquidfill',
    data: function data() {
      this.chartHandler = liquidfill;
      return {};
    }
  });

  function getSeries$5(args) {
    var dimension = args.dimension,
        metrics = args.metrics,
        rows = args.rows,
        color = args.color,
        sizeMax = args.sizeMax,
        sizeMin = args.sizeMin,
        shape = args.shape;


    var baseType = {
      type: 'wordCloud',
      textStyle: {
        normal: {
          color: !isArray(color) && !!color ? color : function () {
            return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')';
          }
        }
      },
      shape: shape,
      sizeRange: [sizeMin, sizeMax]
    };

    var len = isArray(color) ? color.length : 0;
    var data = rows.slice().map(function (row) {
      var text = {
        name: row[dimension],
        value: row[metrics]
      };

      if (len > 0) {
        text.textStyle = {
          normal: {
            color: color[Math.floor(Math.random() * len)]
          }
        };
      }
      return text;
    });

    baseType.data = data;

    return [baseType];
  }

  function getTooltip$5(args) {
    var tooltipFormatter = args.tooltipFormatter;


    return {
      show: true,
      formatter: function formatter(params) {
        var _params$data = params.data,
            name = _params$data.name,
            value = _params$data.value;


        if (tooltipFormatter) {
          return tooltipFormatter.apply(null, params);
        }

        return name + ': ' + value;
      }
    };
  }

  var wordcloud = function wordcloud(columns, rows, settings, extra) {
    var _settings$dimension = settings.dimension,
        dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
        _settings$metrics = settings.metrics,
        metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
        _settings$color = settings.color,
        color = _settings$color === undefined ? '' : _settings$color,
        _settings$sizeMax = settings.sizeMax,
        sizeMax = _settings$sizeMax === undefined ? 60 : _settings$sizeMax,
        _settings$sizeMin = settings.sizeMin,
        sizeMin = _settings$sizeMin === undefined ? 12 : _settings$sizeMin,
        _settings$shape = settings.shape,
        shape = _settings$shape === undefined ? 'circle' : _settings$shape;
    var tooltipVisible = extra.tooltipVisible,
        tooltipFormatter = extra.tooltipFormatter;


    var series = getSeries$5({ dimension: dimension, metrics: metrics, rows: rows, color: color, sizeMax: sizeMax, sizeMin: sizeMin, shape: shape });
    var tooltip$$1 = tooltipVisible && getTooltip$5({ tooltipFormatter: tooltipFormatter });

    return {
      series: series,
      tooltip: tooltip$$1
    };
  };

  var VeWordcloud = _extends({}, Core, {
    name: 'VeWordcloud',
    data: function data() {
      this.chartHandler = wordcloud;
      return {};
    }
  });

  var components = [VeBar, VeHistogram, VeLine, VePie, VeRing, VeWaterfall, VeFunnel, VeRadar, VeChart, VeMap, VeBmap, VeAmap, VeSankey, VeHeatmap, VeScatter, VeCandle, VeGauge, VeTree, VeLiquidfill, VeWordcloud];

  function install(Vue, _) {
    components.forEach(function (component) {
      Vue.component(component.name, component);
    });
  }

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var index = {
    VeBar: VeBar,
    VeHistogram: VeHistogram,
    VeRing: VeRing,
    VeLine: VeLine,
    VePie: VePie,
    VeWaterfall: VeWaterfall,
    VeFunnel: VeFunnel,
    VeRadar: VeRadar,
    VeChart: VeChart,
    VeMap: VeMap,
    VeBmap: VeBmap,
    VeAmap: VeAmap,
    VeSankey: VeSankey,
    VeScatter: VeScatter,
    VeCandle: VeCandle,
    VeGauge: VeGauge,
    VeTree: VeTree,
    VeLiquidfill: VeLiquidfill,
    VeWordcloud: VeWordcloud,
    install: install
  };

  return index;

})));


/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "2fe1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createDecorator; });
/* unused harmony export mixins */
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b0e");
/**
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }

  return vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (false) {}

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"] ? superProto.constructor : vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (false) {}

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/* harmony default export */ __webpack_exports__["b"] = (Component);



/***/ }),

/***/ "46cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var directiveName = options.name || 'ref';
    Vue.directive(directiveName, {
      bind: function bind(el, binding, vnode) {
        binding.value(vnode.componentInstance || el, vnode.key);
      },
      update: function update(el, binding, vnode, oldVnode) {
        if (oldVnode.data && oldVnode.data.directives) {
          var oldBinding = oldVnode.data.directives.find(function (directive) {
            var name = directive.name;
            return name === directiveName;
          });
          if (oldBinding && oldBinding.value !== binding.value) {
            oldBinding && oldBinding.value(null, oldVnode.key);
            binding.value(vnode.componentInstance || el, vnode.key);
            return;
          }
        }
        // Should not have this situation
        if (vnode.componentInstance !== oldVnode.componentInstance || vnode.elm !== oldVnode.elm) {
          binding.value(vnode.componentInstance || el, vnode.key);
        }
      },
      unbind: function unbind(el, binding, vnode) {
        binding.value(null, vnode.key);
      }
    });
  }
};

/***/ }),

/***/ "4ae6":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t=document.createElement("textarea"),n=void 0;if("string"!=typeof e)try{n=JSON.stringify(e)}catch(e){throw"Failed to copy value to clipboard. Unknown type."}else n=e;if(t.value=n,t.setAttribute("readonly",""),t.style.cssText="position:fixed;pointer-events:none;z-index:-9999;opacity:0;",document.body.appendChild(t),navigator.userAgent.match(/ipad|ipod|iphone/i)){var r=t.contentEditable,o=t.readOnly;t.contentEditable=!0,t.readOnly=!0;var a=document.createRange();a.selectNodeContents(t);var i=window.getSelection();i.removeAllRanges(),i.addRange(a),t.setSelectionRange(0,999999),t.contentEditable=r,t.readOnly=o}else t.select();var c=!1;try{c=document.execCommand("copy")}catch(e){console.warn(e)}return document.body.removeChild(t),c};t.default={install:function(e){e.prototype.$clipboard=r;var t=function(e){return function(){return"$"+e++}}(1),n={},o=function(e){e&&(n[e]=null,delete n[e])},a=function(e){var r=t();return n[r]=e,r};e.directive("clipboard",{bind:function(e,t){var o=t.arg,i=t.value;switch(o){case"error":var c=a(i);return void(e.dataset.clipboardErrorHandler=c);case"success":var d=a(i);return void(e.dataset.clipboardSuccessHandler=d);default:var l=function(o){if(t.hasOwnProperty("value")){var a={value:"function"==typeof i?i():i,event:o},c=r(a.value)?e.dataset.clipboardSuccessHandler:e.dataset.clipboardErrorHandler,d=n[c];d&&d(a)}},u=a(l);return e.dataset.clipboardClickHandler=u,void e.addEventListener("click",n[u])}},unbind:function(e){var t=e.dataset,r=t.clipboardSuccessHandler,a=t.clipboardErrorHandler,i=t.clipboardClickHandler;o(r),o(a),i&&(e.removeEventListener("click",n[i]),o(i))}})}}}])});
//# sourceMappingURL=index.min.js.map

/***/ }),

/***/ "60a3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Inject */
/* unused harmony export InjectReactive */
/* unused harmony export Provide */
/* unused harmony export ProvideReactive */
/* unused harmony export Model */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Prop; });
/* unused harmony export PropSync */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Watch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Emit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Ref; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2b0e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return vue__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2fe1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return vue_class_component__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/** vue-property-decorator verson 8.4.0 MIT LICENSE copyright 2019 kaorun343 */
/// <reference types='reflect-metadata'/>




/** Used for keying reactive provide/inject properties */
var reactiveInjectKey = '__reactiveInject__';
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
/**
 * decorator of a reactive inject
 * @param from key
 * @return PropertyDecorator
 */
function InjectReactive(options) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            var fromKey_1 = !!options ? options.from || options : key;
            var defaultVal_1 = (!!options && options.default) || undefined;
            if (!componentOptions.computed)
                componentOptions.computed = {};
            componentOptions.computed[key] = function () {
                var obj = this[reactiveInjectKey];
                return obj ? obj[fromKey_1] : defaultVal_1;
            };
            componentOptions.inject[reactiveInjectKey] = reactiveInjectKey;
        }
    });
}
function produceProvide(original) {
    var provide = function () {
        var _this = this;
        var rv = typeof original === 'function' ? original.call(this) : original;
        rv = Object.create(rv || null);
        // set reactive services (propagates previous services if necessary)
        rv[reactiveInjectKey] = this[reactiveInjectKey] || {};
        for (var i in provide.managed) {
            rv[provide.managed[i]] = this[i];
        }
        var _loop_1 = function (i) {
            rv[provide.managedReactive[i]] = this_1[i]; // Duplicates the behavior of `@Provide`
            Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i], {
                enumerable: true,
                get: function () { return _this[i]; },
            });
        };
        var this_1 = this;
        for (var i in provide.managedReactive) {
            _loop_1(i);
        }
        return rv;
    };
    provide.managed = {};
    provide.managedReactive = {};
    return provide;
}
function needToProduceProvide(original) {
    return (typeof original !== 'function' ||
        (!original.managed && !original.managedReactive));
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (needToProduceProvide(provide)) {
            provide = componentOptions.provide = produceProvide(provide);
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of a reactive provide
 * @param key key
 * @return PropertyDecorator | void
 */
function ProvideReactive(key) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, k) {
        var provide = componentOptions.provide;
        // inject parent reactive services (if any)
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject = componentOptions.inject || {};
            componentOptions.inject[reactiveInjectKey] = {
                from: reactiveInjectKey,
                default: {},
            };
        }
        if (needToProduceProvide(provide)) {
            provide = componentOptions.provide = produceProvide(provide);
        }
        provide.managedReactive[k] = key || k;
    });
}
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
    }
}
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
function PropSync(propName, options) {
    if (options === void 0) { options = {}; }
    // @ts-ignore
    return function (target, key) {
        applyMetadata(options, target, key);
        Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[propName] = options;
            (componentOptions.computed || (componentOptions.computed = {}))[k] = {
                get: function () {
                    return this[propName];
                },
                set: function (value) {
                    // @ts-ignore
                    this.$emit("update:" + propName, value);
                },
            };
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                if (returnValue !== undefined)
                    args.unshift(returnValue);
                _this.$emit.apply(_this, [event || key].concat(args));
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(function (returnValue) {
                    emit(returnValue);
                });
            }
            else {
                emit(returnValue);
            }
            return returnValue;
        };
    };
}
/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
function Ref(refKey) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__[/* createDecorator */ "a"])(function (options, key) {
        options.computed = options.computed || {};
        options.computed[key] = {
            cache: false,
            get: function () {
                return this.$refs[refKey || key];
            },
        };
    });
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}


/***/ }),

/***/ "953d":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__("9339")):undefined}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var l=n[i]={i:i,l:!1,exports:{}};return t[i].call(l.exports,l,l.exports,e),l.l=!0,l.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),l=n.n(i),o=n(6),r=n(5),u=r(l.a,o.a,!1,null,null,null);e.default=u.exports},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.install=e.quillEditor=e.Quill=void 0;var l=n(0),o=i(l),r=n(1),u=i(r),s=window.Quill||o.default,a=function(t,e){e&&(u.default.props.globalOptions.default=function(){return e}),t.component(u.default.name,u.default)},c={Quill:s,quillEditor:u.default,install:a};e.default=c,e.Quill=s,e.quillEditor=u.default,e.install=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={theme:"snow",boundary:document.body,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]},placeholder:"Insert text here ...",readOnly:!1}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l=n(0),o=i(l),r=n(3),u=i(r),s=window.Quill||o.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),i=1;i<arguments.length;i++){var l=arguments[i];if(null!=l)for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(n[o]=l[o])}return n},writable:!0,configurable:!0}),e.default={name:"quill-editor",data:function(){return{_options:{},_content:"",defaultOptions:u.default}},props:{content:String,value:String,disabled:{type:Boolean,default:!1},options:{type:Object,required:!1,default:function(){return{}}},globalOptions:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initialize:function(){var t=this;this.$el&&(this._options=Object.assign({},this.defaultOptions,this.globalOptions,this.options),this.quill=new s(this.$refs.editor,this._options),this.quill.enable(!1),(this.value||this.content)&&this.quill.pasteHTML(this.value||this.content),this.disabled||this.quill.enable(!0),this.quill.on("selection-change",function(e){e?t.$emit("focus",t.quill):t.$emit("blur",t.quill)}),this.quill.on("text-change",function(e,n,i){var l=t.$refs.editor.children[0].innerHTML,o=t.quill,r=t.quill.getText();"<p><br></p>"===l&&(l=""),t._content=l,t.$emit("input",t._content),t.$emit("change",{html:l,text:r,quill:o})}),this.$emit("ready",this.quill))}},watch:{content:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,e){this.quill&&this.quill.enable(!t)}}}},function(t,e){t.exports=function(t,e,n,i,l,o){var r,u=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(r=t,u=t.default);var a="function"==typeof u?u.options:u;e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),l&&(a._scopeId=l);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},a._ssrRegister=c):i&&(c=i),c){var d=a.functional,f=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(t,e){return c.call(e),f(t,e)}):a.beforeCreate=f?[].concat(f,c):[c]}return{esModule:r,exports:u,options:a}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quill-editor"},[t._t("toolbar"),t._v(" "),n("div",{ref:"editor"})],2)},l=[],o={render:i,staticRenderFns:l};e.a=o}])});

/***/ }),

/***/ "9ce6":
/***/ (function(module, exports, __webpack_require__) {

/**
 * vue-markdown v2.2.4
 * https://github.com/miaolz123/vue-markdown
 * MIT License
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__("1727"), __webpack_require__("1907"), __webpack_require__("d4cd"), __webpack_require__("362d"), __webpack_require__("54f6"), __webpack_require__("7ba6"), __webpack_require__("e6f9"), __webpack_require__("ff97"), __webpack_require__("5121"), __webpack_require__("cf2b"), __webpack_require__("4bb9"), __webpack_require__("33db"), __webpack_require__("a68e"), __webpack_require__("be03"));
	else {}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(1);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(2);

	var _keys2 = _interopRequireDefault(_keys);

	var _markdownIt = __webpack_require__(3);

	var _markdownIt2 = _interopRequireDefault(_markdownIt);

	var _markdownItEmoji = __webpack_require__(4);

	var _markdownItEmoji2 = _interopRequireDefault(_markdownItEmoji);

	var _markdownItSub = __webpack_require__(5);

	var _markdownItSub2 = _interopRequireDefault(_markdownItSub);

	var _markdownItSup = __webpack_require__(6);

	var _markdownItSup2 = _interopRequireDefault(_markdownItSup);

	var _markdownItFootnote = __webpack_require__(7);

	var _markdownItFootnote2 = _interopRequireDefault(_markdownItFootnote);

	var _markdownItDeflist = __webpack_require__(8);

	var _markdownItDeflist2 = _interopRequireDefault(_markdownItDeflist);

	var _markdownItAbbr = __webpack_require__(9);

	var _markdownItAbbr2 = _interopRequireDefault(_markdownItAbbr);

	var _markdownItIns = __webpack_require__(10);

	var _markdownItIns2 = _interopRequireDefault(_markdownItIns);

	var _markdownItMark = __webpack_require__(11);

	var _markdownItMark2 = _interopRequireDefault(_markdownItMark);

	var _markdownItTocAndAnchor = __webpack_require__(12);

	var _markdownItTocAndAnchor2 = _interopRequireDefault(_markdownItTocAndAnchor);

	var _markdownItKatex = __webpack_require__(13);

	var _markdownItKatex2 = _interopRequireDefault(_markdownItKatex);

	var _markdownItTaskLists = __webpack_require__(14);

	var _markdownItTaskLists2 = _interopRequireDefault(_markdownItTaskLists);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  md: new _markdownIt2.default(),

	  template: '<div><slot></slot></div>',

	  data: function data() {
	    return {
	      sourceData: this.source
	    };
	  },


	  props: {
	    watches: {
	      type: Array,
	      default: function _default() {
	        return ['source', 'show', 'toc'];
	      }
	    },
	    source: {
	      type: String,
	      default: ''
	    },
	    show: {
	      type: Boolean,
	      default: true
	    },
	    highlight: {
	      type: Boolean,
	      default: true
	    },
	    html: {
	      type: Boolean,
	      default: true
	    },
	    xhtmlOut: {
	      type: Boolean,
	      default: true
	    },
	    breaks: {
	      type: Boolean,
	      default: true
	    },
	    linkify: {
	      type: Boolean,
	      default: true
	    },
	    emoji: {
	      type: Boolean,
	      default: true
	    },
	    typographer: {
	      type: Boolean,
	      default: true
	    },
	    langPrefix: {
	      type: String,
	      default: 'language-'
	    },
	    quotes: {
	      type: String,
	      default: '“”‘’'
	    },
	    tableClass: {
	      type: String,
	      default: 'table'
	    },
	    taskLists: {
	      type: Boolean,
	      default: true
	    },
	    toc: {
	      type: Boolean,
	      default: false
	    },
	    tocId: {
	      type: String
	    },
	    tocClass: {
	      type: String,
	      default: 'table-of-contents'
	    },
	    tocFirstLevel: {
	      type: Number,
	      default: 2
	    },
	    tocLastLevel: {
	      type: Number
	    },
	    tocAnchorLink: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorClass: {
	      type: String,
	      default: 'toc-anchor'
	    },
	    tocAnchorLinkSymbol: {
	      type: String,
	      default: '#'
	    },
	    tocAnchorLinkSpace: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorLinkClass: {
	      type: String,
	      default: 'toc-anchor-link'
	    },
	    anchorAttributes: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    prerender: {
	      type: Function,
	      default: function _default(sourceData) {
	        return sourceData;
	      }
	    },
	    postrender: {
	      type: Function,
	      default: function _default(htmlData) {
	        return htmlData;
	      }
	    }
	  },

	  computed: {
	    tocLastLevelComputed: function tocLastLevelComputed() {
	      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1;
	    }
	  },

	  render: function render(createElement) {
	    var _this = this;

	    this.md = new _markdownIt2.default().use(_markdownItSub2.default).use(_markdownItSup2.default).use(_markdownItFootnote2.default).use(_markdownItDeflist2.default).use(_markdownItAbbr2.default).use(_markdownItIns2.default).use(_markdownItMark2.default).use(_markdownItKatex2.default, { "throwOnError": false, "errorColor": " #cc0000" }).use(_markdownItTaskLists2.default, { enabled: this.taskLists });

	    if (this.emoji) {
	      this.md.use(_markdownItEmoji2.default);
	    }

	    this.md.set({
	      html: this.html,
	      xhtmlOut: this.xhtmlOut,
	      breaks: this.breaks,
	      linkify: this.linkify,
	      typographer: this.typographer,
	      langPrefix: this.langPrefix,
	      quotes: this.quotes
	    });
	    this.md.renderer.rules.table_open = function () {
	      return '<table class="' + _this.tableClass + '">\n';
	    };
	    var defaultLinkRenderer = this.md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
	      return self.renderToken(tokens, idx, options);
	    };
	    this.md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	      (0, _keys2.default)(_this.anchorAttributes).map(function (attribute) {
	        var aIndex = tokens[idx].attrIndex(attribute);
	        var value = _this.anchorAttributes[attribute];
	        if (aIndex < 0) {
	          tokens[idx].attrPush([attribute, value]); // add new attribute
	        } else {
	          tokens[idx].attrs[aIndex][1] = value;
	        }
	      });
	      return defaultLinkRenderer(tokens, idx, options, env, self);
	    };

	    if (this.toc) {
	      this.md.use(_markdownItTocAndAnchor2.default, {
	        tocClassName: this.tocClass,
	        tocFirstLevel: this.tocFirstLevel,
	        tocLastLevel: this.tocLastLevelComputed,
	        anchorLink: this.tocAnchorLink,
	        anchorLinkSymbol: this.tocAnchorLinkSymbol,
	        anchorLinkSpace: this.tocAnchorLinkSpace,
	        anchorClassName: this.tocAnchorClass,
	        anchorLinkSymbolClassName: this.tocAnchorLinkClass,
	        tocCallback: function tocCallback(tocMarkdown, tocArray, tocHtml) {
	          if (tocHtml) {
	            if (_this.tocId && document.getElementById(_this.tocId)) {
	              document.getElementById(_this.tocId).innerHTML = tocHtml;
	            }

	            _this.$emit('toc-rendered', tocHtml);
	          }
	        }
	      });
	    }

	    var outHtml = this.show ? this.md.render(this.prerender(this.sourceData)) : '';
	    outHtml = this.postrender(outHtml);

	    this.$emit('rendered', outHtml);
	    return createElement('div', {
	      domProps: {
	        innerHTML: outHtml
	      }
	    });
	  },
	  beforeMount: function beforeMount() {
	    var _this2 = this;

	    if (this.$slots.default) {
	      this.sourceData = '';
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.$slots.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var slot = _step.value;

	          this.sourceData += slot.text;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    this.$watch('source', function () {
	      _this2.sourceData = _this2.prerender(_this2.source);
	      _this2.$forceUpdate();
	    });

	    this.watches.forEach(function (v) {
	      _this2.$watch(v, function () {
	        _this2.$forceUpdate();
	      });
	    });
	  }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ])
});
;

/***/ }),

/***/ "a925":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
 * vue-i18n v8.15.4 
 * (c) 2020 kazuya kawaguchi
 * Released under the MIT License.
 */
/*  */

/**
 * constants
 */

var numberFormatKeys = [
  'style',
  'currency',
  'currencyDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'localeMatcher',
  'formatMatcher',
  'unit'
];

/**
 * utilities
 */

function warn (msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack);
    }
  }
}

function error (msg, err) {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack);
    }
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

function isNull (val) {
  return val === null || val === undefined
}

function parseArgs () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var locale = null;
  var params = null;
  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || Array.isArray(args[1])) {
      params = args[1];
    }
  }

  return { locale: locale, params: params }
}

function looseClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function merge (target) {
  var arguments$1 = arguments;

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];
    if (source !== undefined && source !== null) {
      var key = (void 0);
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output
}

function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/*  */

function extend (Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get () { return this._i18n }
    });
  }

  Vue.prototype.$t = function (key) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var i18n = this.$i18n;
    return i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this ].concat( values ))
  };

  Vue.prototype.$tc = function (key, choice) {
    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];

    var i18n = this.$i18n;
    return i18n._tc.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this, choice ].concat( values ))
  };

  Vue.prototype.$te = function (key, locale) {
    var i18n = this.$i18n;
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
  };

  Vue.prototype.$d = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).d.apply(ref, [ value ].concat( args ))
  };

  Vue.prototype.$n = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).n.apply(ref, [ value ].concat( args ))
  };
}

/*  */

var mixin = {
  beforeCreate: function beforeCreate () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = {};
            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });
            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            if (false) {}
          }
        }
        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root;
          options.i18n.formatter = this.$root.$i18n.formatter;
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale;
          options.i18n.formatFallbackMessages = this.$root.$i18n.formatFallbackMessages;
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn;
          options.i18n.silentFallbackWarn = this.$root.$i18n.silentFallbackWarn;
          options.i18n.pluralizationRules = this.$root.$i18n.pluralizationRules;
          options.i18n.preserveDirectiveContent = this.$root.$i18n.preserveDirectiveContent;
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages$1 = {};
            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });
            options.i18n.messages = localeMessages$1;
          } catch (e) {
            if (false) {}
          }
        }

        var ref = options.i18n;
        var sharedMessages = ref.sharedMessages;
        if (sharedMessages && isPlainObject(sharedMessages)) {
          options.i18n.messages = merge(options.i18n.messages, sharedMessages);
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }
      } else {
        if (false) {}
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
    }
  },

  beforeMount: function beforeMount () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else {
        if (false) {}
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (!this._i18n) { return }

    var self = this;
    this.$nextTick(function () {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self);
        delete self._subscribing;
      }

      if (self._i18nWatcher) {
        self._i18nWatcher();
        self._i18n.destroyVM();
        delete self._i18nWatcher;
      }

      if (self._localeWatcher) {
        self._localeWatcher();
        delete self._localeWatcher;
      }

      self._i18n = null;
    });
  }
};

/*  */

var interpolationComponent = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: String
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    },
    places: {
      type: [Array, Object]
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var parent = ref.parent;
    var props = ref.props;
    var slots = ref.slots;

    var $i18n = parent.$i18n;
    if (!$i18n) {
      if (false) {}
      return
    }

    var path = props.path;
    var locale = props.locale;
    var places = props.places;
    var params = slots();
    var children = $i18n.i(
      path,
      locale,
      onlyHasDefaultPlace(params) || places
        ? useLegacyPlaces(params.default, places)
        : params
    );

    var tag = props.tag || 'span';
    return tag ? h(tag, data, children) : children
  }
};

function onlyHasDefaultPlace (params) {
  var prop;
  for (prop in params) {
    if (prop !== 'default') { return false }
  }
  return Boolean(prop)
}

function useLegacyPlaces (children, places) {
  var params = places ? createParamsFromPlaces(places) : {};

  if (!children) { return params }

  // Filter empty text nodes
  children = children.filter(function (child) {
    return child.tag || child.text.trim() !== ''
  });

  var everyPlace = children.every(vnodeHasPlaceAttribute);
  if (false) {}

  return children.reduce(
    everyPlace ? assignChildPlace : assignChildIndex,
    params
  )
}

function createParamsFromPlaces (places) {
  if (false) {}

  return Array.isArray(places)
    ? places.reduce(assignChildIndex, {})
    : Object.assign({}, places)
}

function assignChildPlace (params, child) {
  if (child.data && child.data.attrs && child.data.attrs.place) {
    params[child.data.attrs.place] = child;
  }
  return params
}

function assignChildIndex (params, child, index) {
  params[index] = child;
  return params
}

function vnodeHasPlaceAttribute (vnode) {
  return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place)
}

/*  */

var numberComponent = {
  name: 'i18n-n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    },
    locale: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;

    var i18n = parent.$i18n;

    if (!i18n) {
      if (false) {}
      return null
    }

    var key = null;
    var options = null;

    if (typeof props.format === 'string') {
      key = props.format;
    } else if (isObject(props.format)) {
      if (props.format.key) {
        key = props.format.key;
      }

      // Filter out number format options only
      options = Object.keys(props.format).reduce(function (acc, prop) {
        var obj;

        if (numberFormatKeys.includes(prop)) {
          return Object.assign({}, acc, ( obj = {}, obj[prop] = props.format[prop], obj ))
        }
        return acc
      }, null);
    }

    var locale = props.locale || i18n.locale;
    var parts = i18n._ntp(props.value, locale, key, options);

    var values = parts.map(function (part, index) {
      var obj;

      var slot = data.scopedSlots && data.scopedSlots[part.type];
      return slot ? slot(( obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj )) : part.value
    });

    return h(props.tag, {
      attrs: data.attrs,
      'class': data['class'],
      staticClass: data.staticClass
    }, values)
  }
};

/*  */

function bind (el, binding, vnode) {
  if (!assert(el, vnode)) { return }

  t(el, binding, vnode);
}

function update (el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) { return }

  var i18n = vnode.context.$i18n;
  if (localeEqual(el, vnode) &&
    (looseEqual(binding.value, binding.oldValue) &&
     looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale)))) { return }

  t(el, binding, vnode);
}

function unbind (el, binding, vnode, oldVNode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return
  }

  var i18n = vnode.context.$i18n || {};
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = '';
  }
  el._vt = undefined;
  delete el['_vt'];
  el._locale = undefined;
  delete el['_locale'];
  el._localeMessage = undefined;
  delete el['_localeMessage'];
}

function assert (el, vnode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return false
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance');
    return false
  }

  return true
}

function localeEqual (el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale
}

function t (el, binding, vnode) {
  var ref$1, ref$2;

  var value = binding.value;

  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;
  if (!path && !locale && !args) {
    warn('value type not supported');
    return
  }

  if (!path) {
    warn('`path` is required in v-t directive');
    return
  }

  var vm = vnode.context;
  if (choice) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [ path, choice ].concat( makeParams(locale, args) ));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [ path ].concat( makeParams(locale, args) ));
  }
  el._locale = vm.$i18n.locale;
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
}

function parseValue (value) {
  var path;
  var locale;
  var args;
  var choice;

  if (typeof value === 'string') {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return { path: path, locale: locale, args: args, choice: choice }
}

function makeParams (locale, args) {
  var params = [];

  locale && params.push(locale);
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params
}

var Vue;

function install (_Vue) {
  /* istanbul ignore if */
  if (false) {}
  install.installed = true;

  Vue = _Vue;

  var version = (Vue.version && Number(Vue.version.split('.')[0])) || -1;
  /* istanbul ignore if */
  if (false) {}

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', { bind: bind, update: update, unbind: unbind });
  Vue.component(interpolationComponent.name, interpolationComponent);
  Vue.component(numberComponent.name, numberComponent);

  // use simple mergeStrategies to prevent i18n instance lose '__proto__'
  var strats = Vue.config.optionMergeStrategies;
  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };
}

/*  */

var BaseFormatter = function BaseFormatter () {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate (message, values) {
  if (!values) {
    return [message]
  }
  var tokens = this._caches[message];
  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }
  return compile(tokens, values)
};



var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

function parse (format) {
  var tokens = [];
  var position = 0;

  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }

      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== '}') {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === '}';

      var type = RE_TOKEN_LIST_VALUE.test(sub)
        ? 'list'
        : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
          ? 'named'
          : 'unknown';
      tokens.push({ value: sub, type: type });
    } else if (char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[(position)] !== '{') {
        text += char;
      }
    } else {
      text += char;
    }
  }

  text && tokens.push({ type: 'text', value: text });

  return tokens
}

function compile (tokens, values) {
  var compiled = [];
  var index = 0;

  var mode = Array.isArray(values)
    ? 'list'
    : isObject(values)
      ? 'named'
      : 'unknown';
  if (mode === 'unknown') { return compiled }

  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break
      case 'named':
        if (mode === 'named') {
          compiled.push((values)[token.value]);
        } else {
          if (false) {}
        }
        break
      case 'unknown':
        if (false) {}
        break
    }
    index++;
  }

  return compiled
}

/*  */

/**
 *  Path parser
 *  - Inspired:
 *    Vue.js Path parser
 */

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Check if an expression is a literal value.
 */

var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral (exp) {
  return literalValueRE.test(exp)
}

/**
 * Strip quotes from a string
 */

function stripQuotes (str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}

/**
 * Determine the type of a character in a keypath.
 */

function getPathCharType (ch) {
  if (ch === undefined || ch === null) { return 'eof' }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
      return ch

    case 0x5F: // _
    case 0x24: // $
    case 0x2D: // -
      return 'ident'

    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0:  // No-break space
    case 0xFEFF:  // Byte Order Mark
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return 'ws'
  }

  return 'ident'
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */

function formatSubPath (path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) { return false }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed
}

/**
 * Parse a string path into an array of segments
 */

function parse$1 (path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      if (key === undefined) { return false }
      key = formatSubPath(key);
      if (key === false) {
        return false
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote () {
    var nextChar = path[index + 1];
    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
      (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined
        ? c
        : newChar;
      if (action() === false) {
        return
      }
    }

    if (mode === AFTER_PATH) {
      return keys
    }
  }
}





var I18nPath = function I18nPath () {
  this._cache = Object.create(null);
};

/**
 * External parse that check for a cache hit first
 */
I18nPath.prototype.parsePath = function parsePath (path) {
  var hit = this._cache[path];
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      this._cache[path] = hit;
    }
  }
  return hit || []
};

/**
 * Get path value from path string
 */
I18nPath.prototype.getPathValue = function getPathValue (obj, path) {
  if (!isObject(obj)) { return null }

  var paths = this.parsePath(path);
  if (paths.length === 0) {
    return null
  } else {
    var length = paths.length;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        return null
      }
      last = value;
      i++;
    }

    return last
  }
};

/*  */



var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
var bracketsMatcher = /[()]/g;
var defaultModifiers = {
  'upper': function (str) { return str.toLocaleUpperCase(); },
  'lower': function (str) { return str.toLocaleLowerCase(); }
};

var defaultFormatter = new BaseFormatter();

var VueI18n = function VueI18n (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290
  /* istanbul ignore if */
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};

  this._vm = null;
  this._formatter = options.formatter || defaultFormatter;
  this._modifiers = options.modifiers || {};
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined
    ? true
    : !!options.fallbackRoot;
  this._formatFallbackMessages = options.formatFallbackMessages === undefined
    ? false
    : !!options.formatFallbackMessages;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined
    ? false
    : options.silentTranslationWarn;
  this._silentFallbackWarn = options.silentFallbackWarn === undefined
    ? false
    : !!options.silentFallbackWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];
  this._preserveDirectiveContent = options.preserveDirectiveContent === undefined
    ? false
    : !!options.preserveDirectiveContent;
  this.pluralizationRules = options.pluralizationRules || {};
  this._warnHtmlInMessage = options.warnHtmlInMessage || 'off';

  this._exist = function (message, key) {
    if (!message || !key) { return false }
    if (!isNull(this$1._path.getPathValue(message, key))) { return true }
    // fallback for flat key
    if (message[key]) { return true }
    return false
  };

  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats
  });
};

var prototypeAccessors = { vm: { configurable: true },messages: { configurable: true },dateTimeFormats: { configurable: true },numberFormats: { configurable: true },availableLocales: { configurable: true },locale: { configurable: true },fallbackLocale: { configurable: true },formatFallbackMessages: { configurable: true },missing: { configurable: true },formatter: { configurable: true },silentTranslationWarn: { configurable: true },silentFallbackWarn: { configurable: true },preserveDirectiveContent: { configurable: true },warnHtmlInMessage: { configurable: true } };

VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage (locale, level, message) {
  var paths = [];

  var fn = function (level, locale, message, paths) {
    if (isPlainObject(message)) {
      Object.keys(message).forEach(function (key) {
        var val = message[key];
        if (isPlainObject(val)) {
          paths.push(key);
          paths.push('.');
          fn(level, locale, val, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(key);
          fn(level, locale, val, paths);
          paths.pop();
        }
      });
    } else if (Array.isArray(message)) {
      message.forEach(function (item, index) {
        if (isPlainObject(item)) {
          paths.push(("[" + index + "]"));
          paths.push('.');
          fn(level, locale, item, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(("[" + index + "]"));
          fn(level, locale, item, paths);
          paths.pop();
        }
      });
    } else if (typeof message === 'string') {
      var ret = htmlTagMatcher.test(message);
      if (ret) {
        var msg = "Detected HTML in message '" + message + "' of keypath '" + (paths.join('')) + "' at '" + locale + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
        if (level === 'warn') {
          warn(msg);
        } else if (level === 'error') {
          error(msg);
        }
      }
    }
  };

  fn(level, locale, message, paths);
};

VueI18n.prototype._initVM = function _initVM (data) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  this._vm = new Vue({ data: data });
  Vue.config.silent = silent;
};

VueI18n.prototype.destroyVM = function destroyVM () {
  this._vm.$destroy();
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging (vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging (vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData () {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;
    while (i--) {
      Vue.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, { deep: true })
};

VueI18n.prototype.watchLocale = function watchLocale () {
  /* istanbul ignore if */
  if (!this._sync || !this._root) { return null }
  var target = this._vm;
  return this._root.$i18n.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, { immediate: true })
};

prototypeAccessors.vm.get = function () { return this._vm };

prototypeAccessors.messages.get = function () { return looseClone(this._getMessages()) };
prototypeAccessors.dateTimeFormats.get = function () { return looseClone(this._getDateTimeFormats()) };
prototypeAccessors.numberFormats.get = function () { return looseClone(this._getNumberFormats()) };
prototypeAccessors.availableLocales.get = function () { return Object.keys(this.messages).sort() };

prototypeAccessors.locale.get = function () { return this._vm.locale };
prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () { return this._vm.fallbackLocale };
prototypeAccessors.fallbackLocale.set = function (locale) {
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.formatFallbackMessages.get = function () { return this._formatFallbackMessages };
prototypeAccessors.formatFallbackMessages.set = function (fallback) { this._formatFallbackMessages = fallback; };

prototypeAccessors.missing.get = function () { return this._missing };
prototypeAccessors.missing.set = function (handler) { this._missing = handler; };

prototypeAccessors.formatter.get = function () { return this._formatter };
prototypeAccessors.formatter.set = function (formatter) { this._formatter = formatter; };

prototypeAccessors.silentTranslationWarn.get = function () { return this._silentTranslationWarn };
prototypeAccessors.silentTranslationWarn.set = function (silent) { this._silentTranslationWarn = silent; };

prototypeAccessors.silentFallbackWarn.get = function () { return this._silentFallbackWarn };
prototypeAccessors.silentFallbackWarn.set = function (silent) { this._silentFallbackWarn = silent; };

prototypeAccessors.preserveDirectiveContent.get = function () { return this._preserveDirectiveContent };
prototypeAccessors.preserveDirectiveContent.set = function (preserve) { this._preserveDirectiveContent = preserve; };

prototypeAccessors.warnHtmlInMessage.get = function () { return this._warnHtmlInMessage };
prototypeAccessors.warnHtmlInMessage.set = function (level) {
    var this$1 = this;

  var orgLevel = this._warnHtmlInMessage;
  this._warnHtmlInMessage = level;
  if (orgLevel !== level && (level === 'warn' || level === 'error')) {
    var messages = this._getMessages();
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }
};

VueI18n.prototype._getMessages = function _getMessages () { return this._vm.messages };
VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats () { return this._vm.dateTimeFormats };
VueI18n.prototype._getNumberFormats = function _getNumberFormats () { return this._vm.numberFormats };

VueI18n.prototype._warnDefault = function _warnDefault (locale, key, result, vm, values, interpolateMode) {
  if (!isNull(result)) { return result }
  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);
    if (typeof missingRet === 'string') {
      return missingRet
    }
  } else {
    if (false) {}
  }

  if (this._formatFallbackMessages) {
    var parsedArgs = parseArgs.apply(void 0, values);
    return this._render(key, interpolateMode, parsedArgs.params, key)
  } else {
    return key
  }
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot (val) {
  return !val && !isNull(this._root) && this._fallbackRoot
};

VueI18n.prototype._isSilentFallbackWarn = function _isSilentFallbackWarn (key) {
  return this._silentFallbackWarn instanceof RegExp
    ? this._silentFallbackWarn.test(key)
    : this._silentFallbackWarn
};

VueI18n.prototype._isSilentFallback = function _isSilentFallback (locale, key) {
  return this._isSilentFallbackWarn(key) && (this._isFallbackRoot() || locale !== this.fallbackLocale)
};

VueI18n.prototype._isSilentTranslationWarn = function _isSilentTranslationWarn (key) {
  return this._silentTranslationWarn instanceof RegExp
    ? this._silentTranslationWarn.test(key)
    : this._silentTranslationWarn
};

VueI18n.prototype._interpolate = function _interpolate (
  locale,
  message,
  key,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  if (!message) { return null }

  var pathRet = this._path.getPathValue(message, key);
  if (Array.isArray(pathRet) || isPlainObject(pathRet)) { return pathRet }

  var ret;
  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];
      if (typeof ret !== 'string') {
        if (false) {}
        return null
      }
    } else {
      return null
    }
  } else {
    /* istanbul ignore else */
    if (typeof pathRet === 'string') {
      ret = pathRet;
    } else {
      if (false) {}
      return null
    }
  }

  // Check for the existence of links within the translated string
  if (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0) {
    ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
  }

  return this._render(ret, interpolateMode, values, key)
};

VueI18n.prototype._link = function _link (
  locale,
  message,
  str,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  var ret = str;

  // Match all the links within the local
  // We are going to replace each of
  // them with its translation
  var matches = ret.match(linkKeyMatcher);
  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue
    }
    var link = matches[idx];
    var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
    var linkPrefix = linkKeyPrefixMatches[0];
      var formatterName = linkKeyPrefixMatches[1];

    // Remove the leading @:, @.case: and the brackets
    var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

    if (visitedLinkStack.includes(linkPlaceholder)) {
      if (false) {}
      return ret
    }
    visitedLinkStack.push(linkPlaceholder);

    // Translate the link
    var translated = this._interpolate(
      locale, message, linkPlaceholder, host,
      interpolateMode === 'raw' ? 'string' : interpolateMode,
      interpolateMode === 'raw' ? undefined : values,
      visitedLinkStack
    );

    if (this._isFallbackRoot(translated)) {
      if (false) {}
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      var root = this._root.$i18n;
      translated = root._translate(
        root._getMessages(), root.locale, root.fallbackLocale,
        linkPlaceholder, host, interpolateMode, values
      );
    }
    translated = this._warnDefault(
      locale, linkPlaceholder, translated, host,
      Array.isArray(values) ? values : [values],
      interpolateMode
    );

    if (this._modifiers.hasOwnProperty(formatterName)) {
      translated = this._modifiers[formatterName](translated);
    } else if (defaultModifiers.hasOwnProperty(formatterName)) {
      translated = defaultModifiers[formatterName](translated);
    }

    visitedLinkStack.pop();

    // Replace the link with the translated
    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret
};

VueI18n.prototype._render = function _render (message, interpolateMode, values, path) {
  var ret = this._formatter.interpolate(message, values, path);

  // If the custom formatter refuses to work - apply the default one
  if (!ret) {
    ret = defaultFormatter.interpolate(message, values, path);
  }

  // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
  return interpolateMode === 'string' ? ret.join('') : ret
};

VueI18n.prototype._translate = function _translate (
  messages,
  locale,
  fallback,
  key,
  host,
  interpolateMode,
  args
) {
  var res =
    this._interpolate(locale, messages[locale], key, host, interpolateMode, args, [key]);
  if (!isNull(res)) { return res }

  res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args, [key]);
  if (!isNull(res)) {
    if (false) {}
    return res
  } else {
    return null
  }
};

VueI18n.prototype._t = function _t (key, _locale, messages, host) {
    var ref;

    var values = [], len = arguments.length - 4;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 4 ];
  if (!key) { return '' }

  var parsedArgs = parseArgs.apply(void 0, values);
  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(
    messages, locale, this.fallbackLocale, key,
    host, 'string', parsedArgs.params
  );
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return (ref = this._root).$t.apply(ref, [ key ].concat( values ))
  } else {
    return this._warnDefault(locale, key, ret, host, values, 'string')
  }
};

VueI18n.prototype.t = function t (key) {
    var ref;

    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];
  return (ref = this)._t.apply(ref, [ key, this.locale, this._getMessages(), null ].concat( values ))
};

VueI18n.prototype._i = function _i (key, locale, messages, host, values) {
  var ret =
    this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.i(key, locale, values)
  } else {
    return this._warnDefault(locale, key, ret, host, [values], 'raw')
  }
};

VueI18n.prototype.i = function i (key, locale, values) {
  /* istanbul ignore if */
  if (!key) { return '' }

  if (typeof locale !== 'string') {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values)
};

VueI18n.prototype._tc = function _tc (
  key,
  _locale,
  messages,
  host,
  choice
) {
    var ref;

    var values = [], len = arguments.length - 5;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 5 ];
  if (!key) { return '' }
  if (choice === undefined) {
    choice = 1;
  }

  var predefined = { 'count': choice, 'n': choice };
  var parsedArgs = parseArgs.apply(void 0, values);
  parsedArgs.params = Object.assign(predefined, parsedArgs.params);
  values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
  return this.fetchChoice((ref = this)._t.apply(ref, [ key, _locale, messages, host ].concat( values )), choice)
};

VueI18n.prototype.fetchChoice = function fetchChoice (message, choice) {
  /* istanbul ignore if */
  if (!message && typeof message !== 'string') { return null }
  var choices = message.split('|');

  choice = this.getChoiceIndex(choice, choices.length);
  if (!choices[choice]) { return message }
  return choices[choice].trim()
};

/**
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index
*/
VueI18n.prototype.getChoiceIndex = function getChoiceIndex (choice, choicesLength) {
  // Default (old) getChoiceIndex implementation - english-compatible
  var defaultImpl = function (_choice, _choicesLength) {
    _choice = Math.abs(_choice);

    if (_choicesLength === 2) {
      return _choice
        ? _choice > 1
          ? 1
          : 0
        : 1
    }

    return _choice ? Math.min(_choice, 2) : 0
  };

  if (this.locale in this.pluralizationRules) {
    return this.pluralizationRules[this.locale].apply(this, [choice, choicesLength])
  } else {
    return defaultImpl(choice, choicesLength)
  }
};

VueI18n.prototype.tc = function tc (key, choice) {
    var ref;

    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];
  return (ref = this)._tc.apply(ref, [ key, this.locale, this._getMessages(), null, choice ].concat( values ))
};

VueI18n.prototype._te = function _te (key, locale, messages) {
    var args = [], len = arguments.length - 3;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 3 ];

  var _locale = parseArgs.apply(void 0, args).locale || locale;
  return this._exist(messages[_locale], key)
};

VueI18n.prototype.te = function te (key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale)
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage (locale) {
  return looseClone(this._vm.messages[locale] || {})
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
    if (this._warnHtmlInMessage === 'error') { return }
  }
  this._vm.$set(this._vm.messages, locale, message);
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
    if (this._warnHtmlInMessage === 'error') { return }
  }
  this._vm.$set(this._vm.messages, locale, merge({}, this._vm.messages[locale] || {}, message));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat (locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {})
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, format);
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime (
  value,
  locale,
  fallback,
  dateTimeFormats,
  key
) {
  var _locale = locale;
  var formats = dateTimeFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    if (false) {}
    _locale = fallback;
    formats = dateTimeFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];
    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }
    return formatter.format(value)
  }
};

VueI18n.prototype._d = function _d (value, locale, key) {
  /* istanbul ignore if */
  if (false) {}

  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value)
  }

  var ret =
    this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.d(value, key, locale)
  } else {
    return ret || ''
  }
};

VueI18n.prototype.d = function d (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._d(value, locale, key)
};

VueI18n.prototype.getNumberFormat = function getNumberFormat (locale) {
  return looseClone(this._vm.numberFormats[locale] || {})
};

VueI18n.prototype.setNumberFormat = function setNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, format);
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
};

VueI18n.prototype._getNumberFormatter = function _getNumberFormatter (
  value,
  locale,
  fallback,
  numberFormats,
  key,
  options
) {
  var _locale = locale;
  var formats = numberFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    if (false) {}
    _locale = fallback;
    formats = numberFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];

    var formatter;
    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }
    return formatter
  }
};

VueI18n.prototype._n = function _n (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (false) {}
    return ''
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.format(value);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.n(value, Object.assign({}, { key: key, locale: locale }, options))
  } else {
    return ret || ''
  }
};

VueI18n.prototype.n = function n (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }

      // Filter out number format options only
      options = Object.keys(args[0]).reduce(function (acc, key) {
          var obj;

        if (numberFormatKeys.includes(key)) {
          return Object.assign({}, acc, ( obj = {}, obj[key] = args[0][key], obj ))
        }
        return acc
      }, null);
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options)
};

VueI18n.prototype._ntp = function _ntp (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (false) {}
    return []
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.formatToParts(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.formatToParts(value);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n._ntp(value, locale, key, options)
  } else {
    return ret || []
  }
};

Object.defineProperties( VueI18n.prototype, prototypeAccessors );

var availabilities;
// $FlowFixMe
Object.defineProperty(VueI18n, 'availabilities', {
  get: function get () {
    if (!availabilities) {
      var intlDefined = typeof Intl !== 'undefined';
      availabilities = {
        dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
        numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
      };
    }

    return availabilities
  }
});

VueI18n.install = install;
VueI18n.version = '8.15.4';

/* harmony default export */ __webpack_exports__["a"] = (VueI18n);


/***/ })

}]);