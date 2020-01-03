(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~0e467392"],{

/***/ "5e68":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("6d8b");

var _config = __webpack_require__("2cf4");

var devicePixelRatio = _config.devicePixelRatio;

var Style = __webpack_require__("2b61");

var Pattern = __webpack_require__("dc2f");

/**
 * @module zrender/Layer
 * @author pissang(https://www.github.com/pissang)
 */
function returnFalse() {
  return false;
}
/**
 * 创建dom
 *
 * @inner
 * @param {string} id dom id 待用
 * @param {Painter} painter painter instance
 * @param {number} number
 */


function createDom(id, painter, dpr) {
  var newDom = util.createCanvas();
  var width = painter.getWidth();
  var height = painter.getHeight();
  var newDomStyle = newDom.style;

  if (newDomStyle) {
    // In node or some other non-browser environment
    newDomStyle.position = 'absolute';
    newDomStyle.left = 0;
    newDomStyle.top = 0;
    newDomStyle.width = width + 'px';
    newDomStyle.height = height + 'px';
    newDom.setAttribute('data-zr-dom-id', id);
  }

  newDom.width = width * dpr;
  newDom.height = height * dpr;
  return newDom;
}
/**
 * @alias module:zrender/Layer
 * @constructor
 * @extends module:zrender/mixin/Transformable
 * @param {string} id
 * @param {module:zrender/Painter} painter
 * @param {number} [dpr]
 */


var Layer = function (id, painter, dpr) {
  var dom;
  dpr = dpr || devicePixelRatio;

  if (typeof id === 'string') {
    dom = createDom(id, painter, dpr);
  } // Not using isDom because in node it will return false
  else if (util.isObject(id)) {
      dom = id;
      id = dom.id;
    }

  this.id = id;
  this.dom = dom;
  var domStyle = dom.style;

  if (domStyle) {
    // Not in node
    dom.onselectstart = returnFalse; // 避免页面选中的尴尬

    domStyle['-webkit-user-select'] = 'none';
    domStyle['user-select'] = 'none';
    domStyle['-webkit-touch-callout'] = 'none';
    domStyle['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
    domStyle['padding'] = 0; // eslint-disable-line dot-notation

    domStyle['margin'] = 0; // eslint-disable-line dot-notation

    domStyle['border-width'] = 0;
  }

  this.domBack = null;
  this.ctxBack = null;
  this.painter = painter;
  this.config = null; // Configs

  /**
   * 每次清空画布的颜色
   * @type {string}
   * @default 0
   */

  this.clearColor = 0;
  /**
   * 是否开启动态模糊
   * @type {boolean}
   * @default false
   */

  this.motionBlur = false;
  /**
   * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
   * @type {number}
   * @default 0.7
   */

  this.lastFrameAlpha = 0.7;
  /**
   * Layer dpr
   * @type {number}
   */

  this.dpr = dpr;
};

Layer.prototype = {
  constructor: Layer,
  __dirty: true,
  __used: false,
  __drawIndex: 0,
  __startIndex: 0,
  __endIndex: 0,
  incremental: false,
  getElementCount: function () {
    return this.__endIndex - this.__startIndex;
  },
  initContext: function () {
    this.ctx = this.dom.getContext('2d');
    this.ctx.dpr = this.dpr;
  },
  createBackBuffer: function () {
    var dpr = this.dpr;
    this.domBack = createDom('back-' + this.id, this.painter, dpr);
    this.ctxBack = this.domBack.getContext('2d');

    if (dpr !== 1) {
      this.ctxBack.scale(dpr, dpr);
    }
  },

  /**
   * @param  {number} width
   * @param  {number} height
   */
  resize: function (width, height) {
    var dpr = this.dpr;
    var dom = this.dom;
    var domStyle = dom.style;
    var domBack = this.domBack;

    if (domStyle) {
      domStyle.width = width + 'px';
      domStyle.height = height + 'px';
    }

    dom.width = width * dpr;
    dom.height = height * dpr;

    if (domBack) {
      domBack.width = width * dpr;
      domBack.height = height * dpr;

      if (dpr !== 1) {
        this.ctxBack.scale(dpr, dpr);
      }
    }
  },

  /**
   * 清空该层画布
   * @param {boolean} [clearAll]=false Clear all with out motion blur
   * @param {Color} [clearColor]
   */
  clear: function (clearAll, clearColor) {
    var dom = this.dom;
    var ctx = this.ctx;
    var width = dom.width;
    var height = dom.height;
    var clearColor = clearColor || this.clearColor;
    var haveMotionBLur = this.motionBlur && !clearAll;
    var lastFrameAlpha = this.lastFrameAlpha;
    var dpr = this.dpr;

    if (haveMotionBLur) {
      if (!this.domBack) {
        this.createBackBuffer();
      }

      this.ctxBack.globalCompositeOperation = 'copy';
      this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
    }

    ctx.clearRect(0, 0, width, height);

    if (clearColor && clearColor !== 'transparent') {
      var clearColorGradientOrPattern; // Gradient

      if (clearColor.colorStops) {
        // Cache canvas gradient
        clearColorGradientOrPattern = clearColor.__canvasGradient || Style.getGradient(ctx, clearColor, {
          x: 0,
          y: 0,
          width: width,
          height: height
        });
        clearColor.__canvasGradient = clearColorGradientOrPattern;
      } // Pattern
      else if (clearColor.image) {
          clearColorGradientOrPattern = Pattern.prototype.getCanvasPattern.call(clearColor, ctx);
        }

      ctx.save();
      ctx.fillStyle = clearColorGradientOrPattern || clearColor;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    if (haveMotionBLur) {
      var domBack = this.domBack;
      ctx.save();
      ctx.globalAlpha = lastFrameAlpha;
      ctx.drawImage(domBack, 0, 0, width, height);
      ctx.restore();
    }
  }
};
var _default = Layer;
module.exports = _default;

/***/ }),

/***/ "d2cf":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("6d8b");

var vec2 = __webpack_require__("401b");

var Draggable = __webpack_require__("cb6d");

var Eventful = __webpack_require__("1fab");

var eventTool = __webpack_require__("607d");

var GestureMgr = __webpack_require__("0b44");

/**
 * [The interface between `Handler` and `HandlerProxy`]:
 *
 * The default `HandlerProxy` only support the common standard web environment
 * (e.g., standalone browser, headless browser, embed browser in mobild APP, ...).
 * But `HandlerProxy` can be replaced to support more non-standard environment
 * (e.g., mini app), or to support more feature that the default `HandlerProxy`
 * not provided (like echarts-gl did).
 * So the interface between `Handler` and `HandlerProxy` should be stable. Do not
 * make break changes util inevitable. The interface include the public methods
 * of `Handler` and the events listed in `handlerNames` below, by which `HandlerProxy`
 * drives `Handler`.
 */

/**
 * [Drag outside]:
 *
 * That is, triggering `mousemove` and `mouseup` event when the pointer is out of the
 * zrender area when dragging. That is important for the improvement of the user experience
 * when dragging something near the boundary without being terminated unexpectedly.
 *
 * We originally consider to introduce new events like `pagemovemove` and `pagemouseup`
 * to resolve this issue. But some drawbacks of it is described in
 * https://github.com/ecomfe/zrender/pull/536#issuecomment-560286899
 *
 * Instead, we referenced the specifications:
 * https://www.w3.org/TR/touch-events/#the-touchmove-event
 * https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#event-type-mousemove
 * where the the mousemove/touchmove can be continue to fire if the user began a drag
 * operation and the pointer has left the boundary. (for the mouse event, browsers
 * only do it on `document` and when the pointer has left the boundary of the browser.)
 *
 * So the default `HandlerProxy` supports this feature similarly: if it is in the dragging
 * state (see `pointerCapture` in `HandlerProxy`), the `mousemove` and `mouseup` continue
 * to fire until release the pointer. That is implemented by listen to those event on
 * `document`.
 * If we implement some other `HandlerProxy` only for touch device, that would be easier.
 * The touch event support this feature by default.
 *
 * Note:
 * There might be some cases that the mouse event can not be
 * received on `document`. For example,
 * (A) `useCapture` is not supported and some user defined event listeners on the ancestor
 * of zr dom throw Error .
 * (B) `useCapture` is not supported Some user defined event listeners on the ancestor of
 * zr dom call `stopPropagation`.
 * In these cases, the `mousemove` event might be keep triggered event
 * if the mouse is released. We try to reduce the side-effect in those cases.
 * That is, do nothing (especially, `findHover`) in those cases. See `isOutsideBoundary`.
 *
 * Note:
 * If `HandlerProxy` listens to `document` with `useCapture`, `HandlerProxy` needs to
 * make sure `stopPropagation` and `preventDefault` doing nothing if and only if the event
 * target is not zrender dom. Becuase it is dangerous to enable users to call them in
 * `document` capture phase to prevent the propagation to any listener of the webpage.
 * But they are needed to work when the pointer inside the zrender dom.
 */
var SILENT = 'silent';

function makeEventPacket(eveType, targetInfo, event) {
  return {
    type: eveType,
    event: event,
    // target can only be an element that is not silent.
    target: targetInfo.target,
    // topTarget can be a silent element.
    topTarget: targetInfo.topTarget,
    cancelBubble: false,
    offsetX: event.zrX,
    offsetY: event.zrY,
    gestureEvent: event.gestureEvent,
    pinchX: event.pinchX,
    pinchY: event.pinchY,
    pinchScale: event.pinchScale,
    wheelDelta: event.zrDelta,
    zrByTouch: event.zrByTouch,
    which: event.which,
    stop: stopEvent
  };
}

function stopEvent() {
  eventTool.stop(this.event);
}

function EmptyProxy() {}

EmptyProxy.prototype.dispose = function () {};

var handlerNames = ['click', 'dblclick', 'mousewheel', 'mouseout', 'mouseup', 'mousedown', 'mousemove', 'contextmenu'];
/**
 * @alias module:zrender/Handler
 * @constructor
 * @extends module:zrender/mixin/Eventful
 * @param {module:zrender/Storage} storage Storage instance.
 * @param {module:zrender/Painter} painter Painter instance.
 * @param {module:zrender/dom/HandlerProxy} proxy HandlerProxy instance.
 * @param {HTMLElement} painterRoot painter.root (not painter.getViewportRoot()).
 */

var Handler = function (storage, painter, proxy, painterRoot) {
  Eventful.call(this);
  this.storage = storage;
  this.painter = painter;
  this.painterRoot = painterRoot;
  proxy = proxy || new EmptyProxy();
  /**
   * Proxy of event. can be Dom, WebGLSurface, etc.
   */

  this.proxy = null;
  /**
   * {target, topTarget, x, y}
   * @private
   * @type {Object}
   */

  this._hovered = {};
  /**
   * @private
   * @type {Date}
   */

  this._lastTouchMoment;
  /**
   * @private
   * @type {number}
   */

  this._lastX;
  /**
   * @private
   * @type {number}
   */

  this._lastY;
  /**
   * @private
   * @type {module:zrender/core/GestureMgr}
   */

  this._gestureMgr;
  Draggable.call(this);
  this.setHandlerProxy(proxy);
};

Handler.prototype = {
  constructor: Handler,
  setHandlerProxy: function (proxy) {
    if (this.proxy) {
      this.proxy.dispose();
    }

    if (proxy) {
      util.each(handlerNames, function (name) {
        proxy.on && proxy.on(name, this[name], this);
      }, this); // Attach handler

      proxy.handler = this;
    }

    this.proxy = proxy;
  },
  mousemove: function (event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var lastHovered = this._hovered;
    var lastHoveredTarget = lastHovered.target; // If lastHoveredTarget is removed from zr (detected by '__zr') by some API call
    // (like 'setOption' or 'dispatchAction') in event handlers, we should find
    // lastHovered again here. Otherwise 'mouseout' can not be triggered normally.
    // See #6198.

    if (lastHoveredTarget && !lastHoveredTarget.__zr) {
      lastHovered = this.findHover(lastHovered.x, lastHovered.y);
      lastHoveredTarget = lastHovered.target;
    }

    var hovered = this._hovered = isOutside ? {
      x: x,
      y: y
    } : this.findHover(x, y);
    var hoveredTarget = hovered.target;
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : 'default'); // Mouse out on previous hovered element

    if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(lastHovered, 'mouseout', event);
    } // Mouse moving on one element


    this.dispatchToElement(hovered, 'mousemove', event); // Mouse over on a new element

    if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(hovered, 'mouseover', event);
    }
  },
  mouseout: function (event) {
    var eventControl = event.zrEventControl;
    var zrIsToLocalDOM = event.zrIsToLocalDOM;

    if (eventControl !== 'only_globalout') {
      this.dispatchToElement(this._hovered, 'mouseout', event);
    }

    if (eventControl !== 'no_globalout') {
      // FIXME: if the pointer moving from the extra doms to realy "outside",
      // the `globalout` should have been triggered. But currently not.
      !zrIsToLocalDOM && this.trigger('globalout', {
        type: 'globalout',
        event: event
      });
    }
  },

  /**
   * Resize
   */
  resize: function (event) {
    this._hovered = {};
  },

  /**
   * Dispatch event
   * @param {string} eventName
   * @param {event=} eventArgs
   */
  dispatch: function (eventName, eventArgs) {
    var handler = this[eventName];
    handler && handler.call(this, eventArgs);
  },

  /**
   * Dispose
   */
  dispose: function () {
    this.proxy.dispose();
    this.storage = this.proxy = this.painter = null;
  },

  /**
   * 设置默认的cursor style
   * @param {string} [cursorStyle='default'] 例如 crosshair
   */
  setCursorStyle: function (cursorStyle) {
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(cursorStyle);
  },

  /**
   * 事件分发代理
   *
   * @private
   * @param {Object} targetInfo {target, topTarget} 目标图形元素
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   */
  dispatchToElement: function (targetInfo, eventName, event) {
    targetInfo = targetInfo || {};
    var el = targetInfo.target;

    if (el && el.silent) {
      return;
    }

    var eventHandler = 'on' + eventName;
    var eventPacket = makeEventPacket(eventName, targetInfo, event);

    while (el) {
      el[eventHandler] && (eventPacket.cancelBubble = el[eventHandler].call(el, eventPacket));
      el.trigger(eventName, eventPacket);
      el = el.parent;

      if (eventPacket.cancelBubble) {
        break;
      }
    }

    if (!eventPacket.cancelBubble) {
      // 冒泡到顶级 zrender 对象
      this.trigger(eventName, eventPacket); // 分发事件到用户自定义层
      // 用户有可能在全局 click 事件中 dispose，所以需要判断下 painter 是否存在

      this.painter && this.painter.eachOtherLayer(function (layer) {
        if (typeof layer[eventHandler] === 'function') {
          layer[eventHandler].call(layer, eventPacket);
        }

        if (layer.trigger) {
          layer.trigger(eventName, eventPacket);
        }
      });
    }
  },

  /**
   * @private
   * @param {number} x
   * @param {number} y
   * @param {module:zrender/graphic/Displayable} exclude
   * @return {model:zrender/Element}
   * @method
   */
  findHover: function (x, y, exclude) {
    var list = this.storage.getDisplayList();
    var out = {
      x: x,
      y: y
    };

    for (var i = list.length - 1; i >= 0; i--) {
      var hoverCheckResult;

      if (list[i] !== exclude // getDisplayList may include ignored item in VML mode
      && !list[i].ignore && (hoverCheckResult = isHover(list[i], x, y))) {
        !out.topTarget && (out.topTarget = list[i]);

        if (hoverCheckResult !== SILENT) {
          out.target = list[i];
          break;
        }
      }
    }

    return out;
  },
  processGesture: function (event, stage) {
    if (!this._gestureMgr) {
      this._gestureMgr = new GestureMgr();
    }

    var gestureMgr = this._gestureMgr;
    stage === 'start' && gestureMgr.clear();
    var gestureInfo = gestureMgr.recognize(event, this.findHover(event.zrX, event.zrY, null).target, this.proxy.dom);
    stage === 'end' && gestureMgr.clear(); // Do not do any preventDefault here. Upper application do that if necessary.

    if (gestureInfo) {
      var type = gestureInfo.type;
      event.gestureEvent = type;
      this.dispatchToElement({
        target: gestureInfo.target
      }, type, gestureInfo.event);
    }
  }
}; // Common handlers

util.each(['click', 'mousedown', 'mouseup', 'mousewheel', 'dblclick', 'contextmenu'], function (name) {
  Handler.prototype[name] = function (event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var hovered;
    var hoveredTarget;

    if (name !== 'mouseup' || !isOutside) {
      // Find hover again to avoid click event is dispatched manually. Or click is triggered without mouseover
      hovered = this.findHover(x, y);
      hoveredTarget = hovered.target;
    }

    if (name === 'mousedown') {
      this._downEl = hoveredTarget;
      this._downPoint = [event.zrX, event.zrY]; // In case click triggered before mouseup

      this._upEl = hoveredTarget;
    } else if (name === 'mouseup') {
      this._upEl = hoveredTarget;
    } else if (name === 'click') {
      if (this._downEl !== this._upEl // Original click event is triggered on the whole canvas element,
      // including the case that `mousedown` - `mousemove` - `mouseup`,
      // which should be filtered, otherwise it will bring trouble to
      // pan and zoom.
      || !this._downPoint // Arbitrary value
      || vec2.dist(this._downPoint, [event.zrX, event.zrY]) > 4) {
        return;
      }

      this._downPoint = null;
    }

    this.dispatchToElement(hovered, name, event);
  };
});

function isHover(displayable, x, y) {
  if (displayable[displayable.rectHover ? 'rectContain' : 'contain'](x, y)) {
    var el = displayable;
    var isSilent;

    while (el) {
      // If clipped by ancestor.
      // FIXME: If clipPath has neither stroke nor fill,
      // el.clipPath.contain(x, y) will always return false.
      if (el.clipPath && !el.clipPath.contain(x, y)) {
        return false;
      }

      if (el.silent) {
        isSilent = true;
      }

      el = el.parent;
    }

    return isSilent ? SILENT : true;
  }

  return false;
}
/**
 * See [Drag outside].
 */


function isOutsideBoundary(handlerInstance, x, y) {
  var painter = handlerInstance.painter;
  return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}

util.mixin(Handler, Eventful);
util.mixin(Handler, Draggable);
var _default = Handler;
module.exports = _default;

/***/ }),

/***/ "d5b7":
/***/ (function(module, exports, __webpack_require__) {

var guid = __webpack_require__("de00");

var Eventful = __webpack_require__("1fab");

var Transformable = __webpack_require__("0cde");

var Animatable = __webpack_require__("bd6b");

var zrUtil = __webpack_require__("6d8b");

/**
 * @alias module:zrender/Element
 * @constructor
 * @extends {module:zrender/mixin/Animatable}
 * @extends {module:zrender/mixin/Transformable}
 * @extends {module:zrender/mixin/Eventful}
 */
var Element = function (opts) {
  // jshint ignore:line
  Transformable.call(this, opts);
  Eventful.call(this, opts);
  Animatable.call(this, opts);
  /**
   * 画布元素ID
   * @type {string}
   */

  this.id = opts.id || guid();
};

Element.prototype = {
  /**
   * 元素类型
   * Element type
   * @type {string}
   */
  type: 'element',

  /**
   * 元素名字
   * Element name
   * @type {string}
   */
  name: '',

  /**
   * ZRender 实例对象，会在 element 添加到 zrender 实例中后自动赋值
   * ZRender instance will be assigned when element is associated with zrender
   * @name module:/zrender/Element#__zr
   * @type {module:zrender/ZRender}
   */
  __zr: null,

  /**
   * 图形是否忽略，为true时忽略图形的绘制以及事件触发
   * If ignore drawing and events of the element object
   * @name module:/zrender/Element#ignore
   * @type {boolean}
   * @default false
   */
  ignore: false,

  /**
   * 用于裁剪的路径(shape)，所有 Group 内的路径在绘制时都会被这个路径裁剪
   * 该路径会继承被裁减对象的变换
   * @type {module:zrender/graphic/Path}
   * @see http://www.w3.org/TR/2dcontext/#clipping-region
   * @readOnly
   */
  clipPath: null,

  /**
   * 是否是 Group
   * @type {boolean}
   */
  isGroup: false,

  /**
   * Drift element
   * @param  {number} dx dx on the global space
   * @param  {number} dy dy on the global space
   */
  drift: function (dx, dy) {
    switch (this.draggable) {
      case 'horizontal':
        dy = 0;
        break;

      case 'vertical':
        dx = 0;
        break;
    }

    var m = this.transform;

    if (!m) {
      m = this.transform = [1, 0, 0, 1, 0, 0];
    }

    m[4] += dx;
    m[5] += dy;
    this.decomposeTransform();
    this.dirty(false);
  },

  /**
   * Hook before update
   */
  beforeUpdate: function () {},

  /**
   * Hook after update
   */
  afterUpdate: function () {},

  /**
   * Update each frame
   */
  update: function () {
    this.updateTransform();
  },

  /**
   * @param  {Function} cb
   * @param  {}   context
   */
  traverse: function (cb, context) {},

  /**
   * @protected
   */
  attrKV: function (key, value) {
    if (key === 'position' || key === 'scale' || key === 'origin') {
      // Copy the array
      if (value) {
        var target = this[key];

        if (!target) {
          target = this[key] = [];
        }

        target[0] = value[0];
        target[1] = value[1];
      }
    } else {
      this[key] = value;
    }
  },

  /**
   * Hide the element
   */
  hide: function () {
    this.ignore = true;
    this.__zr && this.__zr.refresh();
  },

  /**
   * Show the element
   */
  show: function () {
    this.ignore = false;
    this.__zr && this.__zr.refresh();
  },

  /**
   * @param {string|Object} key
   * @param {*} value
   */
  attr: function (key, value) {
    if (typeof key === 'string') {
      this.attrKV(key, value);
    } else if (zrUtil.isObject(key)) {
      for (var name in key) {
        if (key.hasOwnProperty(name)) {
          this.attrKV(name, key[name]);
        }
      }
    }

    this.dirty(false);
    return this;
  },

  /**
   * @param {module:zrender/graphic/Path} clipPath
   */
  setClipPath: function (clipPath) {
    var zr = this.__zr;

    if (zr) {
      clipPath.addSelfToZr(zr);
    } // Remove previous clip path


    if (this.clipPath && this.clipPath !== clipPath) {
      this.removeClipPath();
    }

    this.clipPath = clipPath;
    clipPath.__zr = zr;
    clipPath.__clipTarget = this;
    this.dirty(false);
  },

  /**
   */
  removeClipPath: function () {
    var clipPath = this.clipPath;

    if (clipPath) {
      if (clipPath.__zr) {
        clipPath.removeSelfFromZr(clipPath.__zr);
      }

      clipPath.__zr = null;
      clipPath.__clipTarget = null;
      this.clipPath = null;
      this.dirty(false);
    }
  },

  /**
   * Add self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   * @param {module:zrender/ZRender} zr
   */
  addSelfToZr: function (zr) {
    this.__zr = zr; // 添加动画

    var animators = this.animators;

    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.addAnimator(animators[i]);
      }
    }

    if (this.clipPath) {
      this.clipPath.addSelfToZr(zr);
    }
  },

  /**
   * Remove self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   * @param {module:zrender/ZRender} zr
   */
  removeSelfFromZr: function (zr) {
    this.__zr = null; // 移除动画

    var animators = this.animators;

    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.removeAnimator(animators[i]);
      }
    }

    if (this.clipPath) {
      this.clipPath.removeSelfFromZr(zr);
    }
  }
};
zrUtil.mixin(Element, Animatable);
zrUtil.mixin(Element, Transformable);
zrUtil.mixin(Element, Eventful);
var _default = Element;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~0e467392.48973491.js.map