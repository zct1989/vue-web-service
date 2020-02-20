(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~b5906859"],{

/***/ "10d5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("250d")


/***/ }),

/***/ "250d":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__("313e")):undefined}(this,function(t){return function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(e,o){e.exports=t},function(t,e,o){function n(t,e){this._amap=t,this.dimensions=["lng","lat"],this._mapOffset=[0,0],this._api=e}var a=o(0);n.prototype.dimensions=["lng","lat"],n.prototype.setZoom=function(t){this._zoom=t},n.prototype.setCenter=function(t){this._center=this._amap.lnglatToPixel(t)},n.prototype.setMapOffset=function(t){this._mapOffset=t},n.prototype.getAMap=function(){return this._amap},n.prototype.dataToPoint=function(t){var e=new AMap.LngLat(t[0],t[1]),o=this._amap.lngLatToContainer(e),n=this._mapOffset;return[o.x-n[0],o.y-n[1]]},n.prototype.pointToData=function(t){var e=this._mapOffset,t=this._amap.containerToLngLat({x:t[0]+e[0],y:t[1]+e[1]});return[t.lng,t.lat]},n.prototype.getViewRect=function(){var t=this._api;return new a.graphic.BoundingRect(0,0,t.getWidth(),t.getHeight())},n.prototype.getRoamTransform=function(){return a.matrix.create()};n.dimensions=n.prototype.dimensions,n.create=function(t,e){var o,r=e.getDom();t.eachComponent("amap",function(t){var i=e.getZr().painter.getViewportRoot();if("undefined"==typeof AMap)throw new Error("AMap api is not loaded");if(o)throw new Error("Only one amap component can exist");if(!t.__amap){var p=r.querySelector(".ec-extension-amap");p&&(i.style.left="0px",i.style.top="0px",r.removeChild(p)),p=document.createElement("div"),p.style.cssText="width:100%;height:100%",p.classList.add("ec-extension-amap"),r.appendChild(p);var s=t.get()||{};s=t.__options=a.util.clone(s);var c=t.__amap=new AMap.Map(p,s),f=t.__layer=new AMap.CustomLayer(i);f.setMap(c)}var c=t.getAMap(),f=t.getLayer();f.hide();var m=c.getZoom(),u=c.getCenter();o=new n(c,e),o.setMapOffset(t.__mapOffset||[0,0]),o.setZoom(m),o.setCenter([u.lng,u.lat]),t.coordinateSystem=o,f.show()}),t.eachSeries(function(t){"amap"===t.get("coordinateSystem")&&(t.coordinateSystem=o)})},t.exports=n},function(t,e,o){function n(t,e){return t&&e&&t[0]===e[0]&&t[1]===e[1]}t.exports=o(0).extendComponentModel({type:"amap",getAMap:function(){return this.__amap},getLayer:function(){return this.__layer},getMapOptions:function(){return this.__options},setCenterAndZoom:function(t,e){this.option.center=t,this.option.zoom=e},centerOrZoomChanged:function(t,e){var o=this.option;return!(n(t,o.center)&&e===o.zoom)},defaultOption:{center:[116.397475,39.908695],zoom:4}})},function(t,e,o){function n(t,e,o){var n,a,r,i;return i=function(){n=!1,a&&(r.apply(o,a),a=!1)},r=function(){n?a=arguments:(t.apply(o,arguments),setTimeout(i,e),n=!0)}}var a=o(0);t.exports=o(0).extendComponentView({type:"amap",render:function(t,e,o){function r(){p||o.dispatchAction({type:"amapRoam"})}function i(t){a.getInstanceByDom(o.getDom()).resize(),m.call(this,t)}var p=!0,s=t.getAMap(),c=o.getZr().painter.getViewportRoot(),f=t.coordinateSystem,m=function(e){if(!p){var n=c.parentNode.parentNode.parentNode,a=[-parseInt(n.style.left,10)||0,-parseInt(n.style.top,10)||0];c.style.left=a[0]+"px",c.style.top=a[1]+"px",f.setMapOffset(a),t.__mapOffset=a,o.dispatchAction({type:"amapRoam"})}},u=n(i,300,s);s.off("movestart",this._oldMoveHandler),s.off("zoomend",this._oldZoomEndHandler),s.off("moveend",this._oldZoomEndHandler),s.off("complete",this._oldZoomEndHandler),t.get("resizeEnable")&&s.off("resize",this._oldResizeHandler),s.on("movestart",m),s.on("zoomend",r),s.on("moveend",r),s.on("complete",r),t.get("resizeEnable")&&s.on("resize",u),this._oldMoveHandler=m,this._oldZoomEndHandler=r,this._oldResizeHandler=u,p=!1}})},function(t,e,o){o(0).registerCoordinateSystem("amap",o(1)),o(2),o(3),o(0).registerAction({type:"amapRoam",event:"amapRoam",update:"updateLayout"},function(t,e){e.eachComponent("amap",function(t){var e=t.getAMap(),o=e.getCenter();t.setCenterAndZoom([o.lng,o.lat],e.getZoom())})}),t.exports={version:"1.0.0-rc.6"}}])});
//# sourceMappingURL=echarts-amap.min.js.map

/***/ }),

/***/ "5b90":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if a DOM element matches a CSS selector
 *
 * @param {Element} elem
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function matches(elem, selector) {
  // Vendor-specific implementations of `Element.prototype.matches()`.
  var proto = window.Element.prototype;
  var nativeMatches = proto.matches ||
      proto.mozMatchesSelector ||
      proto.msMatchesSelector ||
      proto.oMatchesSelector ||
      proto.webkitMatchesSelector;

  if (!elem || elem.nodeType !== 1) {
    return false;
  }

  var parentElem = elem.parentNode;

  // use native 'matches'
  if (nativeMatches) {
    return nativeMatches.call(elem, selector);
  }

  // native support for `matches` is missing and a fallback is required
  var nodes = parentElem.querySelectorAll(selector);
  var len = nodes.length;

  for (var i = 0; i < len; i++) {
    if (nodes[i] === elem) {
      return true;
    }
  }

  return false;
}

/**
 * Expose `matches`
 */

module.exports = matches;


/***/ }),

/***/ "61fe":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var matches = __webpack_require__("5b90");

/**
 * @param element {Element}
 * @param selector {String}
 * @param context {Element}
 * @return {Element}
 */
module.exports = function (element, selector, context) {
  context = context || document;
  // guard against orphans
  element = { parentNode: element };

  while ((element = element.parentNode) && element !== context) {
    if (matches(element, selector)) {
      return element;
    }
  }
};


/***/ }),

/***/ "ec44":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

function getClientPosition(elem) {
  var box;
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement; // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式

  box = elem.getBoundingClientRect(); // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top; // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.
  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.
  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}

function getScroll(w, top) {
  var ret = w["page".concat(top ? 'Y' : 'X', "Offset")];
  var method = "scroll".concat(top ? 'Top' : 'Left');

  if (typeof ret !== 'number') {
    var d = w.document; // ie6,7,8 standard mode

    ret = d.documentElement[method];

    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }

  return ret;
}

function getScrollLeft(w) {
  return getScroll(w);
}

function getScrollTop(w) {
  return getScroll(w, true);
}

function getOffset(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScrollLeft(w);
  pos.top += getScrollTop(w);
  return pos;
}

function _getComputedStyle(elem, name, computedStyle_) {
  var val = '';
  var d = elem.ownerDocument;
  var computedStyle = computedStyle_ || d.defaultView.getComputedStyle(elem, null); // https://github.com/kissyteam/kissy/issues/61

  if (computedStyle) {
    val = computedStyle.getPropertyValue(name) || computedStyle[name];
  }

  return val;
}

var _RE_NUM_NO_PX = new RegExp("^(".concat(RE_NUM, ")(?!px)[a-z%]+$"), 'i');

var RE_POS = /^(top|right|bottom|left)$/;
var CURRENT_STYLE = 'currentStyle';
var RUNTIME_STYLE = 'runtimeStyle';
var LEFT = 'left';
var PX = 'px';

function _getComputedStyleIE(elem, name) {
  // currentStyle maybe null
  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name]; // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
  // 在 ie 下不对，需要直接用 offset 方式
  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了
  // From the awesome hack by Dean Edwards
  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  // If we're not dealing with a regular pixel number
  // but a number that has a weird ending, we need to convert it to pixels
  // exclude left right for relativity

  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
    // Remember the original values
    var style = elem.style;
    var left = style[LEFT];
    var rsLeft = elem[RUNTIME_STYLE][LEFT]; // prevent flashing of content

    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT]; // Put in the new values to get a computed value out

    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
    ret = style.pixelLeft + PX; // Revert the changed values

    style[LEFT] = left;
    elem[RUNTIME_STYLE][LEFT] = rsLeft;
  }

  return ret === '' ? 'auto' : ret;
}

var getComputedStyleX;

if (typeof window !== 'undefined') {
  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
}

function each(arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
}

function isBorderBoxFn(elem) {
  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
}

var BOX_MODELS = ['margin', 'border', 'padding'];
var CONTENT_INDEX = -1;
var PADDING_INDEX = 2;
var BORDER_INDEX = 1;
var MARGIN_INDEX = 0;

function swap(elem, options, callback) {
  var old = {};
  var style = elem.style;
  var name; // Remember the old values, and insert the new ones

  for (name in options) {
    if (options.hasOwnProperty(name)) {
      old[name] = style[name];
      style[name] = options[name];
    }
  }

  callback.call(elem); // Revert the old values

  for (name in options) {
    if (options.hasOwnProperty(name)) {
      style[name] = old[name];
    }
  }
}

function getPBMWidth(elem, props, which) {
  var value = 0;
  var prop;
  var j;
  var i;

  for (j = 0; j < props.length; j++) {
    prop = props[j];

    if (prop) {
      for (i = 0; i < which.length; i++) {
        var cssProp = void 0;

        if (prop === 'border') {
          cssProp = "".concat(prop + which[i], "Width");
        } else {
          cssProp = prop + which[i];
        }

        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
      }
    }
  }

  return value;
}
/**
 * A crude way of determining if an object is a window
 * @member util
 */


function isWindow(obj) {
  // must use == for ie8

  /* eslint eqeqeq:0 */
  return obj != null && obj == obj.window;
}

var domUtils = {};
each(['Width', 'Height'], function (name) {
  domUtils["doc".concat(name)] = function (refWin) {
    var d = refWin.document;
    return Math.max( // firefox chrome documentElement.scrollHeight< body.scrollHeight
    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
    d.documentElement["scroll".concat(name)], // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
    d.body["scroll".concat(name)], domUtils["viewport".concat(name)](d));
  };

  domUtils["viewport".concat(name)] = function (win) {
    // pc browser includes scrollbar in window.innerWidth
    var prop = "client".concat(name);
    var doc = win.document;
    var body = doc.body;
    var documentElement = doc.documentElement;
    var documentElementProp = documentElement[prop]; // 标准模式取 documentElement
    // backcompat 取 body

    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
  };
});
/*
 得到元素的大小信息
 @param elem
 @param name
 @param {String} [extra]  'padding' : (css width) + padding
 'border' : (css width) + padding + border
 'margin' : (css width) + padding + border + margin
 */

function getWH(elem, name, extra) {
  if (isWindow(elem)) {
    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
  } else if (elem.nodeType === 9) {
    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
  }

  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
  var computedStyle = getComputedStyleX(elem);
  var isBorderBox = isBorderBoxFn(elem);
  var cssBoxValue = 0;

  if (borderBoxValue == null || borderBoxValue <= 0) {
    borderBoxValue = undefined; // Fall back to computed then un computed css if necessary

    cssBoxValue = getComputedStyleX(elem, name);

    if (cssBoxValue == null || Number(cssBoxValue) < 0) {
      cssBoxValue = elem.style[name] || 0;
    } // Normalize '', auto, and prepare for extra


    cssBoxValue = parseFloat(cssBoxValue) || 0;
  }

  if (extra === undefined) {
    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
  }

  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
  var val = borderBoxValue || cssBoxValue;

  if (extra === CONTENT_INDEX) {
    if (borderBoxValueOrIsBorderBox) {
      return val - getPBMWidth(elem, ['border', 'padding'], which);
    }

    return cssBoxValue;
  }

  if (borderBoxValueOrIsBorderBox) {
    var padding = extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which) : getPBMWidth(elem, ['margin'], which);
    return val + (extra === BORDER_INDEX ? 0 : padding);
  }

  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which);
}

var cssShow = {
  position: 'absolute',
  visibility: 'hidden',
  display: 'block'
}; // fix #119 : https://github.com/kissyteam/kissy/issues/119

function getWHIgnoreDisplay(elem) {
  var val;
  var args = arguments; // in case elem is window
  // elem.offsetWidth === undefined

  if (elem.offsetWidth !== 0) {
    val = getWH.apply(undefined, args);
  } else {
    swap(elem, cssShow, function () {
      val = getWH.apply(undefined, args);
    });
  }

  return val;
}

function css(el, name, v) {
  var value = v;

  if (_typeof(name) === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        css(el, i, name[i]);
      }
    }

    return undefined;
  }

  if (typeof value !== 'undefined') {
    if (typeof value === 'number') {
      value += 'px';
    }

    el.style[name] = value;
    return undefined;
  }

  return getComputedStyleX(el, name);
}

each(['width', 'height'], function (name) {
  var first = name.charAt(0).toUpperCase() + name.slice(1);

  domUtils["outer".concat(first)] = function (el, includeMargin) {
    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
  };

  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

  domUtils[name] = function (elem, val) {
    if (val !== undefined) {
      if (elem) {
        var computedStyle = getComputedStyleX(elem);
        var isBorderBox = isBorderBoxFn(elem);

        if (isBorderBox) {
          val += getPBMWidth(elem, ['padding', 'border'], which);
        }

        return css(elem, name, val);
      }

      return undefined;
    }

    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
  };
}); // 设置 elem 相对 elem.ownerDocument 的坐标

function setOffset(elem, offset) {
  // set position first, in-case top/left are set even on static elem
  if (css(elem, 'position') === 'static') {
    elem.style.position = 'relative';
  }

  var old = getOffset(elem);
  var ret = {};
  var current;
  var key;

  for (key in offset) {
    if (offset.hasOwnProperty(key)) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
  }

  css(elem, ret);
}

var util = _objectSpread2({
  getWindow: function getWindow(node) {
    var doc = node.ownerDocument || node;
    return doc.defaultView || doc.parentWindow;
  },
  offset: function offset(el, value) {
    if (typeof value !== 'undefined') {
      setOffset(el, value);
    } else {
      return getOffset(el);
    }
  },
  isWindow: isWindow,
  each: each,
  css: css,
  clone: function clone(obj) {
    var ret = {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        ret[i] = obj[i];
      }
    }

    var overflow = obj.overflow;

    if (overflow) {
      for (var _i in obj) {
        if (obj.hasOwnProperty(_i)) {
          ret.overflow[_i] = obj.overflow[_i];
        }
      }
    }

    return ret;
  },
  scrollLeft: function scrollLeft(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollLeft(w);
      }

      window.scrollTo(v, getScrollTop(w));
    } else {
      if (v === undefined) {
        return w.scrollLeft;
      }

      w.scrollLeft = v;
    }
  },
  scrollTop: function scrollTop(w, v) {
    if (isWindow(w)) {
      if (v === undefined) {
        return getScrollTop(w);
      }

      window.scrollTo(getScrollLeft(w), v);
    } else {
      if (v === undefined) {
        return w.scrollTop;
      }

      w.scrollTop = v;
    }
  },
  viewportWidth: 0,
  viewportHeight: 0
}, domUtils);

function scrollIntoView(elem, container, config) {
  config = config || {}; // document 归一化到 window

  if (container.nodeType === 9) {
    container = util.getWindow(container);
  }

  var allowHorizontalScroll = config.allowHorizontalScroll;
  var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  var alignWithTop = config.alignWithTop;
  var alignWithLeft = config.alignWithLeft;
  var offsetTop = config.offsetTop || 0;
  var offsetLeft = config.offsetLeft || 0;
  var offsetBottom = config.offsetBottom || 0;
  var offsetRight = config.offsetRight || 0;
  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;
  var isWin = util.isWindow(container);
  var elemOffset = util.offset(elem);
  var eh = util.outerHeight(elem);
  var ew = util.outerWidth(elem);
  var containerOffset;
  var ch;
  var cw;
  var containerScroll;
  var diffTop;
  var diffBottom;
  var win;
  var winScroll;
  var ww;
  var wh;

  if (isWin) {
    win = container;
    wh = util.height(win);
    ww = util.width(win);
    winScroll = {
      left: util.scrollLeft(win),
      top: util.scrollTop(win)
    }; // elem 相对 container 可视视窗的距离

    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom
    };
    containerScroll = winScroll;
  } else {
    containerOffset = util.offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop
    }; // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点

    diffTop = {
      left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0)) - offsetTop
    };
    diffBottom = {
      left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0)) + offsetBottom
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      util.scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      util.scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;

      if (alignWithTop) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        util.scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        util.scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;

        if (alignWithLeft) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (scrollIntoView);
//# sourceMappingURL=index.js.map


/***/ })

}]);