(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~fd542d86"],{

/***/ "0cde":
/***/ (function(module, exports, __webpack_require__) {

var matrix = __webpack_require__("1687");

var vector = __webpack_require__("401b");

/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */
var mIdentity = matrix.identity;
var EPSILON = 5e-5;

function isNotAroundZero(val) {
  return val > EPSILON || val < -EPSILON;
}
/**
 * @alias module:zrender/mixin/Transformable
 * @constructor
 */


var Transformable = function (opts) {
  opts = opts || {}; // If there are no given position, rotation, scale

  if (!opts.position) {
    /**
     * 平移
     * @type {Array.<number>}
     * @default [0, 0]
     */
    this.position = [0, 0];
  }

  if (opts.rotation == null) {
    /**
     * 旋转
     * @type {Array.<number>}
     * @default 0
     */
    this.rotation = 0;
  }

  if (!opts.scale) {
    /**
     * 缩放
     * @type {Array.<number>}
     * @default [1, 1]
     */
    this.scale = [1, 1];
  }
  /**
   * 旋转和缩放的原点
   * @type {Array.<number>}
   * @default null
   */


  this.origin = this.origin || null;
};

var transformableProto = Transformable.prototype;
transformableProto.transform = null;
/**
 * 判断是否需要有坐标变换
 * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
 */

transformableProto.needLocalTransform = function () {
  return isNotAroundZero(this.rotation) || isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1]) || isNotAroundZero(this.scale[0] - 1) || isNotAroundZero(this.scale[1] - 1);
};

var scaleTmp = [];

transformableProto.updateTransform = function () {
  var parent = this.parent;
  var parentHasTransform = parent && parent.transform;
  var needLocalTransform = this.needLocalTransform();
  var m = this.transform;

  if (!(needLocalTransform || parentHasTransform)) {
    m && mIdentity(m);
    return;
  }

  m = m || matrix.create();

  if (needLocalTransform) {
    this.getLocalTransform(m);
  } else {
    mIdentity(m);
  } // 应用父节点变换


  if (parentHasTransform) {
    if (needLocalTransform) {
      matrix.mul(m, parent.transform, m);
    } else {
      matrix.copy(m, parent.transform);
    }
  } // 保存这个变换矩阵


  this.transform = m;
  var globalScaleRatio = this.globalScaleRatio;

  if (globalScaleRatio != null && globalScaleRatio !== 1) {
    this.getGlobalScale(scaleTmp);
    var relX = scaleTmp[0] < 0 ? -1 : 1;
    var relY = scaleTmp[1] < 0 ? -1 : 1;
    var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
    var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
    m[0] *= sx;
    m[1] *= sx;
    m[2] *= sy;
    m[3] *= sy;
  }

  this.invTransform = this.invTransform || matrix.create();
  matrix.invert(this.invTransform, m);
};

transformableProto.getLocalTransform = function (m) {
  return Transformable.getLocalTransform(this, m);
};
/**
 * 将自己的transform应用到context上
 * @param {CanvasRenderingContext2D} ctx
 */


transformableProto.setTransform = function (ctx) {
  var m = this.transform;
  var dpr = ctx.dpr || 1;

  if (m) {
    ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
  } else {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
};

transformableProto.restoreTransform = function (ctx) {
  var dpr = ctx.dpr || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

var tmpTransform = [];
var originTransform = matrix.create();

transformableProto.setLocalTransform = function (m) {
  if (!m) {
    // TODO return or set identity?
    return;
  }

  var sx = m[0] * m[0] + m[1] * m[1];
  var sy = m[2] * m[2] + m[3] * m[3];
  var position = this.position;
  var scale = this.scale;

  if (isNotAroundZero(sx - 1)) {
    sx = Math.sqrt(sx);
  }

  if (isNotAroundZero(sy - 1)) {
    sy = Math.sqrt(sy);
  }

  if (m[0] < 0) {
    sx = -sx;
  }

  if (m[3] < 0) {
    sy = -sy;
  }

  position[0] = m[4];
  position[1] = m[5];
  scale[0] = sx;
  scale[1] = sy;
  this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
};
/**
 * 分解`transform`矩阵到`position`, `rotation`, `scale`
 */


transformableProto.decomposeTransform = function () {
  if (!this.transform) {
    return;
  }

  var parent = this.parent;
  var m = this.transform;

  if (parent && parent.transform) {
    // Get local transform and decompose them to position, scale, rotation
    matrix.mul(tmpTransform, parent.invTransform, m);
    m = tmpTransform;
  }

  var origin = this.origin;

  if (origin && (origin[0] || origin[1])) {
    originTransform[4] = origin[0];
    originTransform[5] = origin[1];
    matrix.mul(tmpTransform, m, originTransform);
    tmpTransform[4] -= origin[0];
    tmpTransform[5] -= origin[1];
    m = tmpTransform;
  }

  this.setLocalTransform(m);
};
/**
 * Get global scale
 * @return {Array.<number>}
 */


transformableProto.getGlobalScale = function (out) {
  var m = this.transform;
  out = out || [];

  if (!m) {
    out[0] = 1;
    out[1] = 1;
    return out;
  }

  out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
  out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);

  if (m[0] < 0) {
    out[0] = -out[0];
  }

  if (m[3] < 0) {
    out[1] = -out[1];
  }

  return out;
};
/**
 * 变换坐标位置到 shape 的局部坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */


transformableProto.transformCoordToLocal = function (x, y) {
  var v2 = [x, y];
  var invTransform = this.invTransform;

  if (invTransform) {
    vector.applyTransform(v2, v2, invTransform);
  }

  return v2;
};
/**
 * 变换局部坐标位置到全局坐标空间
 * @method
 * @param {number} x
 * @param {number} y
 * @return {Array.<number>}
 */


transformableProto.transformCoordToGlobal = function (x, y) {
  var v2 = [x, y];
  var transform = this.transform;

  if (transform) {
    vector.applyTransform(v2, v2, transform);
  }

  return v2;
};
/**
 * @static
 * @param {Object} target
 * @param {Array.<number>} target.origin
 * @param {number} target.rotation
 * @param {Array.<number>} target.position
 * @param {Array.<number>} [m]
 */


Transformable.getLocalTransform = function (target, m) {
  m = m || [];
  mIdentity(m);
  var origin = target.origin;
  var scale = target.scale || [1, 1];
  var rotation = target.rotation || 0;
  var position = target.position || [0, 0];

  if (origin) {
    // Translate to origin
    m[4] -= origin[0];
    m[5] -= origin[1];
  }

  matrix.scale(m, m, scale);

  if (rotation) {
    matrix.rotate(m, m, rotation);
  }

  if (origin) {
    // Translate back from origin
    m[4] += origin[0];
    m[5] += origin[1];
  }

  m[4] += position[0];
  m[5] += position[1];
  return m;
};

var _default = Transformable;
module.exports = _default;

/***/ }),

/***/ "0da8":
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__("19eb");

var BoundingRect = __webpack_require__("9850");

var zrUtil = __webpack_require__("6d8b");

var imageHelper = __webpack_require__("5e76");

/**
 * @alias zrender/graphic/Image
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
function ZImage(opts) {
  Displayable.call(this, opts);
}

ZImage.prototype = {
  constructor: ZImage,
  type: 'image',
  brush: function (ctx, prevEl) {
    var style = this.style;
    var src = style.image; // Must bind each time

    style.bind(ctx, this, prevEl);
    var image = this._image = imageHelper.createOrUpdateImage(src, this._image, this, this.onload);

    if (!image || !imageHelper.isImageReady(image)) {
      return;
    } // 图片已经加载完成
    // if (image.nodeName.toUpperCase() == 'IMG') {
    //     if (!image.complete) {
    //         return;
    //     }
    // }
    // Else is canvas


    var x = style.x || 0;
    var y = style.y || 0;
    var width = style.width;
    var height = style.height;
    var aspect = image.width / image.height;

    if (width == null && height != null) {
      // Keep image/height ratio
      width = height * aspect;
    } else if (height == null && width != null) {
      height = width / aspect;
    } else if (width == null && height == null) {
      width = image.width;
      height = image.height;
    } // 设置transform


    this.setTransform(ctx);

    if (style.sWidth && style.sHeight) {
      var sx = style.sx || 0;
      var sy = style.sy || 0;
      ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
    } else if (style.sx && style.sy) {
      var sx = style.sx;
      var sy = style.sy;
      var sWidth = width - sx;
      var sHeight = height - sy;
      ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    } else {
      ctx.drawImage(image, x, y, width, height);
    } // Draw rect text


    if (style.text != null) {
      // Only restore transform when needs draw text.
      this.restoreTransform(ctx);
      this.drawRectText(ctx, this.getBoundingRect());
    }
  },
  getBoundingRect: function () {
    var style = this.style;

    if (!this._rect) {
      this._rect = new BoundingRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
    }

    return this._rect;
  }
};
zrUtil.inherits(ZImage, Displayable);
var _default = ZImage;
module.exports = _default;

/***/ }),

/***/ "19eb":
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__("6d8b");

var Style = __webpack_require__("2b61");

var Element = __webpack_require__("d5b7");

var RectText = __webpack_require__("9e2e");

/**
 * Base class of all displayable graphic objects
 * @module zrender/graphic/Displayable
 */

/**
 * @alias module:zrender/graphic/Displayable
 * @extends module:zrender/Element
 * @extends module:zrender/graphic/mixin/RectText
 */
function Displayable(opts) {
  opts = opts || {};
  Element.call(this, opts); // Extend properties

  for (var name in opts) {
    if (opts.hasOwnProperty(name) && name !== 'style') {
      this[name] = opts[name];
    }
  }
  /**
   * @type {module:zrender/graphic/Style}
   */


  this.style = new Style(opts.style, this);
  this._rect = null; // Shapes for cascade clipping.
  // Can only be `null`/`undefined` or an non-empty array, MUST NOT be an empty array.
  // because it is easy to only using null to check whether clipPaths changed.

  this.__clipPaths = null; // FIXME Stateful must be mixined after style is setted
  // Stateful.call(this, opts);
}

Displayable.prototype = {
  constructor: Displayable,
  type: 'displayable',

  /**
   * Dirty flag. From which painter will determine if this displayable object needs brush.
   * @name module:zrender/graphic/Displayable#__dirty
   * @type {boolean}
   */
  __dirty: true,

  /**
   * Whether the displayable object is visible. when it is true, the displayable object
   * is not drawn, but the mouse event can still trigger the object.
   * @name module:/zrender/graphic/Displayable#invisible
   * @type {boolean}
   * @default false
   */
  invisible: false,

  /**
   * @name module:/zrender/graphic/Displayable#z
   * @type {number}
   * @default 0
   */
  z: 0,

  /**
   * @name module:/zrender/graphic/Displayable#z
   * @type {number}
   * @default 0
   */
  z2: 0,

  /**
   * The z level determines the displayable object can be drawn in which layer canvas.
   * @name module:/zrender/graphic/Displayable#zlevel
   * @type {number}
   * @default 0
   */
  zlevel: 0,

  /**
   * Whether it can be dragged.
   * @name module:/zrender/graphic/Displayable#draggable
   * @type {boolean}
   * @default false
   */
  draggable: false,

  /**
   * Whether is it dragging.
   * @name module:/zrender/graphic/Displayable#draggable
   * @type {boolean}
   * @default false
   */
  dragging: false,

  /**
   * Whether to respond to mouse events.
   * @name module:/zrender/graphic/Displayable#silent
   * @type {boolean}
   * @default false
   */
  silent: false,

  /**
   * If enable culling
   * @type {boolean}
   * @default false
   */
  culling: false,

  /**
   * Mouse cursor when hovered
   * @name module:/zrender/graphic/Displayable#cursor
   * @type {string}
   */
  cursor: 'pointer',

  /**
   * If hover area is bounding rect
   * @name module:/zrender/graphic/Displayable#rectHover
   * @type {string}
   */
  rectHover: false,

  /**
   * Render the element progressively when the value >= 0,
   * usefull for large data.
   * @type {boolean}
   */
  progressive: false,

  /**
   * @type {boolean}
   */
  incremental: false,

  /**
   * Scale ratio for global scale.
   * @type {boolean}
   */
  globalScaleRatio: 1,
  beforeBrush: function (ctx) {},
  afterBrush: function (ctx) {},

  /**
   * Graphic drawing method.
   * @param {CanvasRenderingContext2D} ctx
   */
  // Interface
  brush: function (ctx, prevEl) {},

  /**
   * Get the minimum bounding box.
   * @return {module:zrender/core/BoundingRect}
   */
  // Interface
  getBoundingRect: function () {},

  /**
   * If displayable element contain coord x, y
   * @param  {number} x
   * @param  {number} y
   * @return {boolean}
   */
  contain: function (x, y) {
    return this.rectContain(x, y);
  },

  /**
   * @param  {Function} cb
   * @param  {}   context
   */
  traverse: function (cb, context) {
    cb.call(context, this);
  },

  /**
   * If bounding rect of element contain coord x, y
   * @param  {number} x
   * @param  {number} y
   * @return {boolean}
   */
  rectContain: function (x, y) {
    var coord = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    return rect.contain(coord[0], coord[1]);
  },

  /**
   * Mark displayable element dirty and refresh next frame
   */
  dirty: function () {
    this.__dirty = this.__dirtyText = true;
    this._rect = null;
    this.__zr && this.__zr.refresh();
  },

  /**
   * If displayable object binded any event
   * @return {boolean}
   */
  // TODO, events bound by bind
  // isSilent: function () {
  //     return !(
  //         this.hoverable || this.draggable
  //         || this.onmousemove || this.onmouseover || this.onmouseout
  //         || this.onmousedown || this.onmouseup || this.onclick
  //         || this.ondragenter || this.ondragover || this.ondragleave
  //         || this.ondrop
  //     );
  // },

  /**
   * Alias for animate('style')
   * @param {boolean} loop
   */
  animateStyle: function (loop) {
    return this.animate('style', loop);
  },
  attrKV: function (key, value) {
    if (key !== 'style') {
      Element.prototype.attrKV.call(this, key, value);
    } else {
      this.style.set(value);
    }
  },

  /**
   * @param {Object|string} key
   * @param {*} value
   */
  setStyle: function (key, value) {
    this.style.set(key, value);
    this.dirty(false);
    return this;
  },

  /**
   * Use given style object
   * @param  {Object} obj
   */
  useStyle: function (obj) {
    this.style = new Style(obj, this);
    this.dirty(false);
    return this;
  },

  /**
   * The string value of `textPosition` needs to be calculated to a real postion.
   * For example, `'inside'` is calculated to `[rect.width/2, rect.height/2]`
   * by default. See `contain/text.js#calculateTextPosition` for more details.
   * But some coutom shapes like "pin", "flag" have center that is not exactly
   * `[width/2, height/2]`. So we provide this hook to customize the calculation
   * for those shapes. It will be called if the `style.textPosition` is a string.
   * @param {Obejct} [out] Prepared out object. If not provided, this method should
   *        be responsible for creating one.
   * @param {module:zrender/graphic/Style} style
   * @param {Object} rect {x, y, width, height}
   * @return {Obejct} out The same as the input out.
   *         {
   *             x: number. mandatory.
   *             y: number. mandatory.
   *             textAlign: string. optional. use style.textAlign by default.
   *             textVerticalAlign: string. optional. use style.textVerticalAlign by default.
   *         }
   */
  calculateTextPosition: null
};
zrUtil.inherits(Displayable, Element);
zrUtil.mixin(Displayable, RectText); // zrUtil.mixin(Displayable, Stateful);

var _default = Displayable;
module.exports = _default;

/***/ }),

/***/ "1fab":
/***/ (function(module, exports) {

/**
 * Event Mixin
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */
var arrySlice = Array.prototype.slice;
/**
 * Event dispatcher.
 *
 * @alias module:zrender/mixin/Eventful
 * @constructor
 * @param {Object} [eventProcessor] The object eventProcessor is the scope when
 *        `eventProcessor.xxx` called.
 * @param {Function} [eventProcessor.normalizeQuery]
 *        param: {string|Object} Raw query.
 *        return: {string|Object} Normalized query.
 * @param {Function} [eventProcessor.filter] Event will be dispatched only
 *        if it returns `true`.
 *        param: {string} eventType
 *        param: {string|Object} query
 *        return: {boolean}
 * @param {Function} [eventProcessor.afterTrigger] Called after all handlers called.
 *        param: {string} eventType
 */

var Eventful = function (eventProcessor) {
  this._$handlers = {};
  this._$eventProcessor = eventProcessor;
};

Eventful.prototype = {
  constructor: Eventful,

  /**
   * The handler can only be triggered once, then removed.
   *
   * @param {string} event The event name.
   * @param {string|Object} [query] Condition used on event filter.
   * @param {Function} handler The event handler.
   * @param {Object} context
   */
  one: function (event, query, handler, context) {
    return on(this, event, query, handler, context, true);
  },

  /**
   * Bind a handler.
   *
   * @param {string} event The event name.
   * @param {string|Object} [query] Condition used on event filter.
   * @param {Function} handler The event handler.
   * @param {Object} [context]
   */
  on: function (event, query, handler, context) {
    return on(this, event, query, handler, context, false);
  },

  /**
   * Whether any handler has bound.
   *
   * @param  {string}  event
   * @return {boolean}
   */
  isSilent: function (event) {
    var _h = this._$handlers;
    return !_h[event] || !_h[event].length;
  },

  /**
   * Unbind a event.
   *
   * @param {string} [event] The event name.
   *        If no `event` input, "off" all listeners.
   * @param {Function} [handler] The event handler.
   *        If no `handler` input, "off" all listeners of the `event`.
   */
  off: function (event, handler) {
    var _h = this._$handlers;

    if (!event) {
      this._$handlers = {};
      return this;
    }

    if (handler) {
      if (_h[event]) {
        var newList = [];

        for (var i = 0, l = _h[event].length; i < l; i++) {
          if (_h[event][i].h !== handler) {
            newList.push(_h[event][i]);
          }
        }

        _h[event] = newList;
      }

      if (_h[event] && _h[event].length === 0) {
        delete _h[event];
      }
    } else {
      delete _h[event];
    }

    return this;
  },

  /**
   * Dispatch a event.
   *
   * @param {string} type The event name.
   */
  trigger: function (type) {
    var _h = this._$handlers[type];
    var eventProcessor = this._$eventProcessor;

    if (_h) {
      var args = arguments;
      var argLen = args.length;

      if (argLen > 3) {
        args = arrySlice.call(args, 1);
      }

      var len = _h.length;

      for (var i = 0; i < len;) {
        var hItem = _h[i];

        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
          i++;
          continue;
        } // Optimize advise from backbone


        switch (argLen) {
          case 1:
            hItem.h.call(hItem.ctx);
            break;

          case 2:
            hItem.h.call(hItem.ctx, args[1]);
            break;

          case 3:
            hItem.h.call(hItem.ctx, args[1], args[2]);
            break;

          default:
            // have more than 2 given arguments
            hItem.h.apply(hItem.ctx, args);
            break;
        }

        if (hItem.one) {
          _h.splice(i, 1);

          len--;
        } else {
          i++;
        }
      }
    }

    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
    return this;
  },

  /**
   * Dispatch a event with context, which is specified at the last parameter.
   *
   * @param {string} type The event name.
   */
  triggerWithContext: function (type) {
    var _h = this._$handlers[type];
    var eventProcessor = this._$eventProcessor;

    if (_h) {
      var args = arguments;
      var argLen = args.length;

      if (argLen > 4) {
        args = arrySlice.call(args, 1, args.length - 1);
      }

      var ctx = args[args.length - 1];
      var len = _h.length;

      for (var i = 0; i < len;) {
        var hItem = _h[i];

        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
          i++;
          continue;
        } // Optimize advise from backbone


        switch (argLen) {
          case 1:
            hItem.h.call(ctx);
            break;

          case 2:
            hItem.h.call(ctx, args[1]);
            break;

          case 3:
            hItem.h.call(ctx, args[1], args[2]);
            break;

          default:
            // have more than 2 given arguments
            hItem.h.apply(ctx, args);
            break;
        }

        if (hItem.one) {
          _h.splice(i, 1);

          len--;
        } else {
          i++;
        }
      }
    }

    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
    return this;
  }
};

function normalizeQuery(host, query) {
  var eventProcessor = host._$eventProcessor;

  if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
    query = eventProcessor.normalizeQuery(query);
  }

  return query;
}

function on(eventful, event, query, handler, context, isOnce) {
  var _h = eventful._$handlers;

  if (typeof query === 'function') {
    context = handler;
    handler = query;
    query = null;
  }

  if (!handler || !event) {
    return eventful;
  }

  query = normalizeQuery(eventful, query);

  if (!_h[event]) {
    _h[event] = [];
  }

  for (var i = 0; i < _h[event].length; i++) {
    if (_h[event][i].h === handler) {
      return eventful;
    }
  }

  var wrap = {
    h: handler,
    one: isOnce,
    query: query,
    ctx: context || eventful,
    // FIXME
    // Do not publish this feature util it is proved that it makes sense.
    callAtLast: handler.zrEventfulCallAtLast
  };
  var lastIndex = _h[event].length - 1;
  var lastWrap = _h[event][lastIndex];
  lastWrap && lastWrap.callAtLast ? _h[event].splice(lastIndex, 0, wrap) : _h[event].push(wrap);
  return eventful;
} // ----------------------
// The events in zrender
// ----------------------

/**
 * @event module:zrender/mixin/Eventful#onclick
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseover
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseout
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousemove
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousewheel
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmousedown
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#onmouseup
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondrag
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragstart
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragend
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragenter
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragleave
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondragover
 * @type {Function}
 * @default null
 */

/**
 * @event module:zrender/mixin/Eventful#ondrop
 * @type {Function}
 * @default null
 */


var _default = Eventful;
module.exports = _default;

/***/ }),

/***/ "2b61":
/***/ (function(module, exports, __webpack_require__) {

var fixShadow = __webpack_require__("7d6d");

var _constant = __webpack_require__("82eb");

var ContextCachedBy = _constant.ContextCachedBy;
var STYLE_COMMON_PROPS = [['shadowBlur', 0], ['shadowOffsetX', 0], ['shadowOffsetY', 0], ['shadowColor', '#000'], ['lineCap', 'butt'], ['lineJoin', 'miter'], ['miterLimit', 10]]; // var SHADOW_PROPS = STYLE_COMMON_PROPS.slice(0, 4);
// var LINE_PROPS = STYLE_COMMON_PROPS.slice(4);

var Style = function (opts) {
  this.extendFrom(opts, false);
};

function createLinearGradient(ctx, obj, rect) {
  var x = obj.x == null ? 0 : obj.x;
  var x2 = obj.x2 == null ? 1 : obj.x2;
  var y = obj.y == null ? 0 : obj.y;
  var y2 = obj.y2 == null ? 0 : obj.y2;

  if (!obj.global) {
    x = x * rect.width + rect.x;
    x2 = x2 * rect.width + rect.x;
    y = y * rect.height + rect.y;
    y2 = y2 * rect.height + rect.y;
  } // Fix NaN when rect is Infinity


  x = isNaN(x) ? 0 : x;
  x2 = isNaN(x2) ? 1 : x2;
  y = isNaN(y) ? 0 : y;
  y2 = isNaN(y2) ? 0 : y2;
  var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
  return canvasGradient;
}

function createRadialGradient(ctx, obj, rect) {
  var width = rect.width;
  var height = rect.height;
  var min = Math.min(width, height);
  var x = obj.x == null ? 0.5 : obj.x;
  var y = obj.y == null ? 0.5 : obj.y;
  var r = obj.r == null ? 0.5 : obj.r;

  if (!obj.global) {
    x = x * width + rect.x;
    y = y * height + rect.y;
    r = r * min;
  }

  var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  return canvasGradient;
}

Style.prototype = {
  constructor: Style,

  /**
   * @type {string}
   */
  fill: '#000',

  /**
   * @type {string}
   */
  stroke: null,

  /**
   * @type {number}
   */
  opacity: 1,

  /**
   * @type {number}
   */
  fillOpacity: null,

  /**
   * @type {number}
   */
  strokeOpacity: null,

  /**
   * `true` is not supported.
   * `false`/`null`/`undefined` are the same.
   * `false` is used to remove lineDash in some
   * case that `null`/`undefined` can not be set.
   * (e.g., emphasis.lineStyle in echarts)
   * @type {Array.<number>|boolean}
   */
  lineDash: null,

  /**
   * @type {number}
   */
  lineDashOffset: 0,

  /**
   * @type {number}
   */
  shadowBlur: 0,

  /**
   * @type {number}
   */
  shadowOffsetX: 0,

  /**
   * @type {number}
   */
  shadowOffsetY: 0,

  /**
   * @type {number}
   */
  lineWidth: 1,

  /**
   * If stroke ignore scale
   * @type {Boolean}
   */
  strokeNoScale: false,
  // Bounding rect text configuration
  // Not affected by element transform

  /**
   * @type {string}
   */
  text: null,

  /**
   * If `fontSize` or `fontFamily` exists, `font` will be reset by
   * `fontSize`, `fontStyle`, `fontWeight`, `fontFamily`.
   * So do not visit it directly in upper application (like echarts),
   * but use `contain/text#makeFont` instead.
   * @type {string}
   */
  font: null,

  /**
   * The same as font. Use font please.
   * @deprecated
   * @type {string}
   */
  textFont: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontStyle: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontWeight: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * Should be 12 but not '12px'.
   * @type {number}
   */
  fontSize: null,

  /**
   * It helps merging respectively, rather than parsing an entire font string.
   * @type {string}
   */
  fontFamily: null,

  /**
   * Reserved for special functinality, like 'hr'.
   * @type {string}
   */
  textTag: null,

  /**
   * @type {string}
   */
  textFill: '#000',

  /**
   * @type {string}
   */
  textStroke: null,

  /**
   * @type {number}
   */
  textWidth: null,

  /**
   * Only for textBackground.
   * @type {number}
   */
  textHeight: null,

  /**
   * textStroke may be set as some color as a default
   * value in upper applicaion, where the default value
   * of textStrokeWidth should be 0 to make sure that
   * user can choose to do not use text stroke.
   * @type {number}
   */
  textStrokeWidth: 0,

  /**
   * @type {number}
   */
  textLineHeight: null,

  /**
   * 'inside', 'left', 'right', 'top', 'bottom'
   * [x, y]
   * Based on x, y of rect.
   * @type {string|Array.<number>}
   * @default 'inside'
   */
  textPosition: 'inside',

  /**
   * If not specified, use the boundingRect of a `displayable`.
   * @type {Object}
   */
  textRect: null,

  /**
   * [x, y]
   * @type {Array.<number>}
   */
  textOffset: null,

  /**
   * @type {string}
   */
  textAlign: null,

  /**
   * @type {string}
   */
  textVerticalAlign: null,

  /**
   * @type {number}
   */
  textDistance: 5,

  /**
   * @type {string}
   */
  textShadowColor: 'transparent',

  /**
   * @type {number}
   */
  textShadowBlur: 0,

  /**
   * @type {number}
   */
  textShadowOffsetX: 0,

  /**
   * @type {number}
   */
  textShadowOffsetY: 0,

  /**
   * @type {string}
   */
  textBoxShadowColor: 'transparent',

  /**
   * @type {number}
   */
  textBoxShadowBlur: 0,

  /**
   * @type {number}
   */
  textBoxShadowOffsetX: 0,

  /**
   * @type {number}
   */
  textBoxShadowOffsetY: 0,

  /**
   * Whether transform text.
   * Only available in Path and Image element,
   * where the text is called as `RectText`.
   * @type {boolean}
   */
  transformText: false,

  /**
   * Text rotate around position of Path or Image.
   * The origin of the rotation can be specified by `textOrigin`.
   * Only available in Path and Image element,
   * where the text is called as `RectText`.
   */
  textRotation: 0,

  /**
   * Text origin of text rotation.
   * Useful in the case like label rotation of circular symbol.
   * Only available in Path and Image element, where the text is called
   * as `RectText` and the element is called as "host element".
   * The value can be:
   * + If specified as a coordinate like `[10, 40]`, it is the `[x, y]`
   * base on the left-top corner of the rect of its host element.
   * + If specified as a string `center`, it is the center of the rect of
   * its host element.
   * + By default, this origin is the `textPosition`.
   * @type {string|Array.<number>}
   */
  textOrigin: null,

  /**
   * @type {string}
   */
  textBackgroundColor: null,

  /**
   * @type {string}
   */
  textBorderColor: null,

  /**
   * @type {number}
   */
  textBorderWidth: 0,

  /**
   * @type {number}
   */
  textBorderRadius: 0,

  /**
   * Can be `2` or `[2, 4]` or `[2, 3, 4, 5]`
   * @type {number|Array.<number>}
   */
  textPadding: null,

  /**
   * Text styles for rich text.
   * @type {Object}
   */
  rich: null,

  /**
   * {outerWidth, outerHeight, ellipsis, placeholder}
   * @type {Object}
   */
  truncate: null,

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
   * @type {string}
   */
  blend: null,

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  bind: function (ctx, el, prevEl) {
    var style = this;
    var prevStyle = prevEl && prevEl.style; // If no prevStyle, it means first draw.
    // Only apply cache if the last time cachced by this function.

    var notCheckCache = !prevStyle || ctx.__attrCachedBy !== ContextCachedBy.STYLE_BIND;
    ctx.__attrCachedBy = ContextCachedBy.STYLE_BIND;

    for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
      var prop = STYLE_COMMON_PROPS[i];
      var styleName = prop[0];

      if (notCheckCache || style[styleName] !== prevStyle[styleName]) {
        // FIXME Invalid property value will cause style leak from previous element.
        ctx[styleName] = fixShadow(ctx, styleName, style[styleName] || prop[1]);
      }
    }

    if (notCheckCache || style.fill !== prevStyle.fill) {
      ctx.fillStyle = style.fill;
    }

    if (notCheckCache || style.stroke !== prevStyle.stroke) {
      ctx.strokeStyle = style.stroke;
    }

    if (notCheckCache || style.opacity !== prevStyle.opacity) {
      ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
    }

    if (notCheckCache || style.blend !== prevStyle.blend) {
      ctx.globalCompositeOperation = style.blend || 'source-over';
    }

    if (this.hasStroke()) {
      var lineWidth = style.lineWidth;
      ctx.lineWidth = lineWidth / (this.strokeNoScale && el && el.getLineScale ? el.getLineScale() : 1);
    }
  },
  hasFill: function () {
    var fill = this.fill;
    return fill != null && fill !== 'none';
  },
  hasStroke: function () {
    var stroke = this.stroke;
    return stroke != null && stroke !== 'none' && this.lineWidth > 0;
  },

  /**
   * Extend from other style
   * @param {zrender/graphic/Style} otherStyle
   * @param {boolean} overwrite true: overwrirte any way.
   *                            false: overwrite only when !target.hasOwnProperty
   *                            others: overwrite when property is not null/undefined.
   */
  extendFrom: function (otherStyle, overwrite) {
    if (otherStyle) {
      for (var name in otherStyle) {
        if (otherStyle.hasOwnProperty(name) && (overwrite === true || (overwrite === false ? !this.hasOwnProperty(name) : otherStyle[name] != null))) {
          this[name] = otherStyle[name];
        }
      }
    }
  },

  /**
   * Batch setting style with a given object
   * @param {Object|string} obj
   * @param {*} [obj]
   */
  set: function (obj, value) {
    if (typeof obj === 'string') {
      this[obj] = value;
    } else {
      this.extendFrom(obj, true);
    }
  },

  /**
   * Clone
   * @return {zrender/graphic/Style} [description]
   */
  clone: function () {
    var newStyle = new this.constructor();
    newStyle.extendFrom(this, true);
    return newStyle;
  },
  getGradient: function (ctx, obj, rect) {
    var method = obj.type === 'radial' ? createRadialGradient : createLinearGradient;
    var canvasGradient = method(ctx, obj, rect);
    var colorStops = obj.colorStops;

    for (var i = 0; i < colorStops.length; i++) {
      canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
    }

    return canvasGradient;
  }
};
var styleProto = Style.prototype;

for (var i = 0; i < STYLE_COMMON_PROPS.length; i++) {
  var prop = STYLE_COMMON_PROPS[i];

  if (!(prop[0] in styleProto)) {
    styleProto[prop[0]] = prop[1];
  }
} // Provide for others


Style.getGradient = styleProto.getGradient;
var _default = Style;
module.exports = _default;

/***/ }),

/***/ "392f":
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__("6d8b");

var inherits = _util.inherits;

var Displayble = __webpack_require__("19eb");

var BoundingRect = __webpack_require__("9850");

/**
 * Displayable for incremental rendering. It will be rendered in a separate layer
 * IncrementalDisplay have two main methods. `clearDisplayables` and `addDisplayables`
 * addDisplayables will render the added displayables incremetally.
 *
 * It use a not clearFlag to tell the painter don't clear the layer if it's the first element.
 */
// TODO Style override ?
function IncrementalDisplayble(opts) {
  Displayble.call(this, opts);
  this._displayables = [];
  this._temporaryDisplayables = [];
  this._cursor = 0;
  this.notClear = true;
}

IncrementalDisplayble.prototype.incremental = true;

IncrementalDisplayble.prototype.clearDisplaybles = function () {
  this._displayables = [];
  this._temporaryDisplayables = [];
  this._cursor = 0;
  this.dirty();
  this.notClear = false;
};

IncrementalDisplayble.prototype.addDisplayable = function (displayable, notPersistent) {
  if (notPersistent) {
    this._temporaryDisplayables.push(displayable);
  } else {
    this._displayables.push(displayable);
  }

  this.dirty();
};

IncrementalDisplayble.prototype.addDisplayables = function (displayables, notPersistent) {
  notPersistent = notPersistent || false;

  for (var i = 0; i < displayables.length; i++) {
    this.addDisplayable(displayables[i], notPersistent);
  }
};

IncrementalDisplayble.prototype.eachPendingDisplayable = function (cb) {
  for (var i = this._cursor; i < this._displayables.length; i++) {
    cb && cb(this._displayables[i]);
  }

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    cb && cb(this._temporaryDisplayables[i]);
  }
};

IncrementalDisplayble.prototype.update = function () {
  this.updateTransform();

  for (var i = this._cursor; i < this._displayables.length; i++) {
    var displayable = this._displayables[i]; // PENDING

    displayable.parent = this;
    displayable.update();
    displayable.parent = null;
  }

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    var displayable = this._temporaryDisplayables[i]; // PENDING

    displayable.parent = this;
    displayable.update();
    displayable.parent = null;
  }
};

IncrementalDisplayble.prototype.brush = function (ctx, prevEl) {
  // Render persistant displayables.
  for (var i = this._cursor; i < this._displayables.length; i++) {
    var displayable = this._displayables[i];
    displayable.beforeBrush && displayable.beforeBrush(ctx);
    displayable.brush(ctx, i === this._cursor ? null : this._displayables[i - 1]);
    displayable.afterBrush && displayable.afterBrush(ctx);
  }

  this._cursor = i; // Render temporary displayables.

  for (var i = 0; i < this._temporaryDisplayables.length; i++) {
    var displayable = this._temporaryDisplayables[i];
    displayable.beforeBrush && displayable.beforeBrush(ctx);
    displayable.brush(ctx, i === 0 ? null : this._temporaryDisplayables[i - 1]);
    displayable.afterBrush && displayable.afterBrush(ctx);
  }

  this._temporaryDisplayables = [];
  this.notClear = true;
};

var m = [];

IncrementalDisplayble.prototype.getBoundingRect = function () {
  if (!this._rect) {
    var rect = new BoundingRect(Infinity, Infinity, -Infinity, -Infinity);

    for (var i = 0; i < this._displayables.length; i++) {
      var displayable = this._displayables[i];
      var childRect = displayable.getBoundingRect().clone();

      if (displayable.needLocalTransform()) {
        childRect.applyTransform(displayable.getLocalTransform(m));
      }

      rect.union(childRect);
    }

    this._rect = rect;
  }

  return this._rect;
};

IncrementalDisplayble.prototype.contain = function (x, y) {
  var localPos = this.transformCoordToLocal(x, y);
  var rect = this.getBoundingRect();

  if (rect.contain(localPos[0], localPos[1])) {
    for (var i = 0; i < this._displayables.length; i++) {
      var displayable = this._displayables[i];

      if (displayable.contain(x, y)) {
        return true;
      }
    }
  }

  return false;
};

inherits(IncrementalDisplayble, Displayble);
var _default = IncrementalDisplayble;
module.exports = _default;

/***/ }),

/***/ "42e5":
/***/ (function(module, exports) {

/**
 * @param {Array.<Object>} colorStops
 */
var Gradient = function (colorStops) {
  this.colorStops = colorStops || [];
};

Gradient.prototype = {
  constructor: Gradient,
  addColorStop: function (offset, color) {
    this.colorStops.push({
      offset: offset,
      color: color
    });
  }
};
var _default = Gradient;
module.exports = _default;

/***/ }),

/***/ "4573":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

/**
 * 圆环
 * @module zrender/graphic/shape/Ring
 */
var _default = Path.extend({
  type: 'ring',
  shape: {
    cx: 0,
    cy: 0,
    r: 0,
    r0: 0
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var PI2 = Math.PI * 2;
    ctx.moveTo(x + shape.r, y);
    ctx.arc(x, y, shape.r, 0, PI2, false);
    ctx.moveTo(x + shape.r0, y);
    ctx.arc(x, y, shape.r0, 0, PI2, true);
  }
});

module.exports = _default;

/***/ }),

/***/ "48a9":
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__("6d8b");

var Gradient = __webpack_require__("42e5");

/**
 * x, y, x2, y2 are all percent from 0 to 1
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [x2=1]
 * @param {number} [y2=0]
 * @param {Array.<Object>} colorStops
 * @param {boolean} [globalCoord=false]
 */
var LinearGradient = function (x, y, x2, y2, colorStops, globalCoord) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {type: 'linear', colorStops: ...}`, where
  // this constructor will not be called.
  this.x = x == null ? 0 : x;
  this.y = y == null ? 0 : y;
  this.x2 = x2 == null ? 1 : x2;
  this.y2 = y2 == null ? 0 : y2; // Can be cloned

  this.type = 'linear'; // If use global coord

  this.global = globalCoord || false;
  Gradient.call(this, colorStops);
};

LinearGradient.prototype = {
  constructor: LinearGradient
};
zrUtil.inherits(LinearGradient, Gradient);
var _default = LinearGradient;
module.exports = _default;

/***/ }),

/***/ "4aa2":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var fixClipWithShadow = __webpack_require__("897a");

/**
 * 扇形
 * @module zrender/graphic/shape/Sector
 */
var _default = Path.extend({
  type: 'sector',
  shape: {
    cx: 0,
    cy: 0,
    r0: 0,
    r: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    clockwise: true
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var r0 = Math.max(shape.r0 || 0, 0);
    var r = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r0 + x, unitY * r0 + y);
    ctx.lineTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
    ctx.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

    if (r0 !== 0) {
      ctx.arc(x, y, r0, endAngle, startAngle, clockwise);
    }

    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),

/***/ "4fac":
/***/ (function(module, exports, __webpack_require__) {

var smoothSpline = __webpack_require__("620b");

var smoothBezier = __webpack_require__("9c2c");

function buildPath(ctx, shape, closePath) {
  var points = shape.points;
  var smooth = shape.smooth;

  if (points && points.length >= 2) {
    if (smooth && smooth !== 'spline') {
      var controlPoints = smoothBezier(points, smooth, closePath, shape.smoothConstraint);
      ctx.moveTo(points[0][0], points[0][1]);
      var len = points.length;

      for (var i = 0; i < (closePath ? len : len - 1); i++) {
        var cp1 = controlPoints[i * 2];
        var cp2 = controlPoints[i * 2 + 1];
        var p = points[(i + 1) % len];
        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
      }
    } else {
      if (smooth === 'spline') {
        points = smoothSpline(points, closePath);
      }

      ctx.moveTo(points[0][0], points[0][1]);

      for (var i = 1, l = points.length; i < l; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
    }

    closePath && ctx.closePath();
  }
}

exports.buildPath = buildPath;

/***/ }),

/***/ "5693":
/***/ (function(module, exports) {

/**
 * @param {Object} ctx
 * @param {Object} shape
 * @param {number} shape.x
 * @param {number} shape.y
 * @param {number} shape.width
 * @param {number} shape.height
 * @param {number} shape.r
 */
function buildPath(ctx, shape) {
  var x = shape.x;
  var y = shape.y;
  var width = shape.width;
  var height = shape.height;
  var r = shape.r;
  var r1;
  var r2;
  var r3;
  var r4; // Convert width and height to positive for better borderRadius

  if (width < 0) {
    x = x + width;
    width = -width;
  }

  if (height < 0) {
    y = y + height;
    height = -height;
  }

  if (typeof r === 'number') {
    r1 = r2 = r3 = r4 = r;
  } else if (r instanceof Array) {
    if (r.length === 1) {
      r1 = r2 = r3 = r4 = r[0];
    } else if (r.length === 2) {
      r1 = r3 = r[0];
      r2 = r4 = r[1];
    } else if (r.length === 3) {
      r1 = r[0];
      r2 = r4 = r[1];
      r3 = r[2];
    } else {
      r1 = r[0];
      r2 = r[1];
      r3 = r[2];
      r4 = r[3];
    }
  } else {
    r1 = r2 = r3 = r4 = 0;
  }

  var total;

  if (r1 + r2 > width) {
    total = r1 + r2;
    r1 *= width / total;
    r2 *= width / total;
  }

  if (r3 + r4 > width) {
    total = r3 + r4;
    r3 *= width / total;
    r4 *= width / total;
  }

  if (r2 + r3 > height) {
    total = r2 + r3;
    r2 *= height / total;
    r3 *= height / total;
  }

  if (r1 + r4 > height) {
    total = r1 + r4;
    r1 *= height / total;
    r4 *= height / total;
  }

  ctx.moveTo(x + r1, y);
  ctx.lineTo(x + width - r2, y);
  r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
  ctx.lineTo(x + width, y + height - r3);
  r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
  ctx.lineTo(x + r4, y + height);
  r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
  ctx.lineTo(x, y + r1);
  r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
}

exports.buildPath = buildPath;

/***/ }),

/***/ "5e76":
/***/ (function(module, exports, __webpack_require__) {

var LRU = __webpack_require__("d51b");

var globalImageCache = new LRU(50);
/**
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */

function findExistImage(newImageOrSrc) {
  if (typeof newImageOrSrc === 'string') {
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    return cachedImgObj && cachedImgObj.image;
  } else {
    return newImageOrSrc;
  }
}
/**
 * Caution: User should cache loaded images, but not just count on LRU.
 * Consider if required images more than LRU size, will dead loop occur?
 *
 * @param {string|HTMLImageElement|HTMLCanvasElement|Canvas} newImageOrSrc
 * @param {HTMLImageElement|HTMLCanvasElement|Canvas} image Existent image.
 * @param {module:zrender/Element} [hostEl] For calling `dirty`.
 * @param {Function} [cb] params: (image, cbPayload)
 * @param {Object} [cbPayload] Payload on cb calling.
 * @return {HTMLImageElement|HTMLCanvasElement|Canvas} image
 */


function createOrUpdateImage(newImageOrSrc, image, hostEl, cb, cbPayload) {
  if (!newImageOrSrc) {
    return image;
  } else if (typeof newImageOrSrc === 'string') {
    // Image should not be loaded repeatly.
    if (image && image.__zrImageSrc === newImageOrSrc || !hostEl) {
      return image;
    } // Only when there is no existent image or existent image src
    // is different, this method is responsible for load.


    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    var pendingWrap = {
      hostEl: hostEl,
      cb: cb,
      cbPayload: cbPayload
    };

    if (cachedImgObj) {
      image = cachedImgObj.image;
      !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
    } else {
      image = new Image();
      image.onload = image.onerror = imageOnLoad;
      globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
        image: image,
        pending: [pendingWrap]
      });
      image.src = image.__zrImageSrc = newImageOrSrc;
    }

    return image;
  } // newImageOrSrc is an HTMLImageElement or HTMLCanvasElement or Canvas
  else {
      return newImageOrSrc;
    }
}

function imageOnLoad() {
  var cachedImgObj = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;

  for (var i = 0; i < cachedImgObj.pending.length; i++) {
    var pendingWrap = cachedImgObj.pending[i];
    var cb = pendingWrap.cb;
    cb && cb(this, pendingWrap.cbPayload);
    pendingWrap.hostEl.dirty();
  }

  cachedImgObj.pending.length = 0;
}

function isImageReady(image) {
  return image && image.width && image.height;
}

exports.findExistImage = findExistImage;
exports.createOrUpdateImage = createOrUpdateImage;
exports.isImageReady = isImageReady;

/***/ }),

/***/ "620b":
/***/ (function(module, exports, __webpack_require__) {

var _vector = __webpack_require__("401b");

var v2Distance = _vector.distance;

/**
 * Catmull-Rom spline 插值折线
 * @module zrender/shape/util/smoothSpline
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * @inner
 */
function interpolate(p0, p1, p2, p3, t, t2, t3) {
  var v0 = (p2 - p0) * 0.5;
  var v1 = (p3 - p1) * 0.5;
  return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}
/**
 * @alias module:zrender/shape/util/smoothSpline
 * @param {Array} points 线段顶点数组
 * @param {boolean} isLoop
 * @return {Array}
 */


function _default(points, isLoop) {
  var len = points.length;
  var ret = [];
  var distance = 0;

  for (var i = 1; i < len; i++) {
    distance += v2Distance(points[i - 1], points[i]);
  }

  var segs = distance / 2;
  segs = segs < len ? len : segs;

  for (var i = 0; i < segs; i++) {
    var pos = i / (segs - 1) * (isLoop ? len : len - 1);
    var idx = Math.floor(pos);
    var w = pos - idx;
    var p0;
    var p1 = points[idx % len];
    var p2;
    var p3;

    if (!isLoop) {
      p0 = points[idx === 0 ? idx : idx - 1];
      p2 = points[idx > len - 2 ? len - 1 : idx + 1];
      p3 = points[idx > len - 3 ? len - 1 : idx + 2];
    } else {
      p0 = points[(idx - 1 + len) % len];
      p2 = points[(idx + 1) % len];
      p3 = points[(idx + 2) % len];
    }

    var w2 = w * w;
    var w3 = w * w2;
    ret.push([interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
  }

  return ret;
}

module.exports = _default;

/***/ }),

/***/ "76a5":
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__("19eb");

var zrUtil = __webpack_require__("6d8b");

var textContain = __webpack_require__("e86a");

var textHelper = __webpack_require__("a73c");

var _constant = __webpack_require__("82eb");

var ContextCachedBy = _constant.ContextCachedBy;

/**
 * @alias zrender/graphic/Text
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */
var Text = function (opts) {
  // jshint ignore:line
  Displayable.call(this, opts);
};

Text.prototype = {
  constructor: Text,
  type: 'text',
  brush: function (ctx, prevEl) {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true); // Use props with prefix 'text'.

    style.fill = style.stroke = style.shadowBlur = style.shadowColor = style.shadowOffsetX = style.shadowOffsetY = null;
    var text = style.text; // Convert to string

    text != null && (text += ''); // Do not apply style.bind in Text node. Because the real bind job
    // is in textHelper.renderText, and performance of text render should
    // be considered.
    // style.bind(ctx, this, prevEl);

    if (!textHelper.needDrawText(text, style)) {
      // The current el.style is not applied
      // and should not be used as cache.
      ctx.__attrCachedBy = ContextCachedBy.NONE;
      return;
    }

    this.setTransform(ctx);
    textHelper.renderText(this, ctx, text, style, null, prevEl);
    this.restoreTransform(ctx);
  },
  getBoundingRect: function () {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);

    if (!this._rect) {
      var text = style.text;
      text != null ? text += '' : text = '';
      var rect = textContain.getBoundingRect(style.text + '', style.font, style.textAlign, style.textVerticalAlign, style.textPadding, style.textLineHeight, style.rich);
      rect.x += style.x || 0;
      rect.y += style.y || 0;

      if (textHelper.getStroke(style.textStroke, style.textStrokeWidth)) {
        var w = style.textStrokeWidth;
        rect.x -= w / 2;
        rect.y -= w / 2;
        rect.width += w;
        rect.height += w;
      }

      this._rect = rect;
    }

    return this._rect;
  }
};
zrUtil.inherits(Text, Displayable);
var _default = Text;
module.exports = _default;

/***/ }),

/***/ "7d6d":
/***/ (function(module, exports) {

var SHADOW_PROPS = {
  'shadowBlur': 1,
  'shadowOffsetX': 1,
  'shadowOffsetY': 1,
  'textShadowBlur': 1,
  'textShadowOffsetX': 1,
  'textShadowOffsetY': 1,
  'textBoxShadowBlur': 1,
  'textBoxShadowOffsetX': 1,
  'textBoxShadowOffsetY': 1
};

function _default(ctx, propName, value) {
  if (SHADOW_PROPS.hasOwnProperty(propName)) {
    return value *= ctx.dpr;
  }

  return value;
}

module.exports = _default;

/***/ }),

/***/ "82eb":
/***/ (function(module, exports) {

var ContextCachedBy = {
  NONE: 0,
  STYLE_BIND: 1,
  PLAIN_TEXT: 2
}; // Avoid confused with 0/false.

var WILL_BE_RESTORED = 9;
exports.ContextCachedBy = ContextCachedBy;
exports.WILL_BE_RESTORED = WILL_BE_RESTORED;

/***/ }),

/***/ "87b1":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var polyHelper = __webpack_require__("4fac");

/**
 * 多边形
 * @module zrender/shape/Polygon
 */
var _default = Path.extend({
  type: 'polygon',
  shape: {
    points: null,
    smooth: false,
    smoothConstraint: null
  },
  buildPath: function (ctx, shape) {
    polyHelper.buildPath(ctx, shape, true);
  }
});

module.exports = _default;

/***/ }),

/***/ "897a":
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__("22d1");

// Fix weird bug in some version of IE11 (like 11.0.9600.178**),
// where exception "unexpected call to method or property access"
// might be thrown when calling ctx.fill or ctx.stroke after a path
// whose area size is zero is drawn and ctx.clip() is called and
// shadowBlur is set. See #4572, #3112, #5777.
// (e.g.,
//  ctx.moveTo(10, 10);
//  ctx.lineTo(20, 10);
//  ctx.closePath();
//  ctx.clip();
//  ctx.shadowBlur = 10;
//  ...
//  ctx.fill();
// )
var shadowTemp = [['shadowBlur', 0], ['shadowColor', '#000'], ['shadowOffsetX', 0], ['shadowOffsetY', 0]];

function _default(orignalBrush) {
  // version string can be: '11.0'
  return env.browser.ie && env.browser.version >= 11 ? function () {
    var clipPaths = this.__clipPaths;
    var style = this.style;
    var modified;

    if (clipPaths) {
      for (var i = 0; i < clipPaths.length; i++) {
        var clipPath = clipPaths[i];
        var shape = clipPath && clipPath.shape;
        var type = clipPath && clipPath.type;

        if (shape && (type === 'sector' && shape.startAngle === shape.endAngle || type === 'rect' && (!shape.width || !shape.height))) {
          for (var j = 0; j < shadowTemp.length; j++) {
            // It is save to put shadowTemp static, because shadowTemp
            // will be all modified each item brush called.
            shadowTemp[j][2] = style[shadowTemp[j][0]];
            style[shadowTemp[j][0]] = shadowTemp[j][1];
          }

          modified = true;
          break;
        }
      }
    }

    orignalBrush.apply(this, arguments);

    if (modified) {
      for (var j = 0; j < shadowTemp.length; j++) {
        style[shadowTemp[j][0]] = shadowTemp[j][2];
      }
    }
  } : orignalBrush;
}

module.exports = _default;

/***/ }),

/***/ "8d32":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

/**
 * 圆弧
 * @module zrender/graphic/shape/Arc
 */
var _default = Path.extend({
  type: 'arc',
  shape: {
    cx: 0,
    cy: 0,
    r: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
    clockwise: true
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var r = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
  }
});

module.exports = _default;

/***/ }),

/***/ "9c2c":
/***/ (function(module, exports, __webpack_require__) {

var _vector = __webpack_require__("401b");

var v2Min = _vector.min;
var v2Max = _vector.max;
var v2Scale = _vector.scale;
var v2Distance = _vector.distance;
var v2Add = _vector.add;
var v2Clone = _vector.clone;
var v2Sub = _vector.sub;

/**
 * 贝塞尔平滑曲线
 * @module zrender/shape/util/smoothBezier
 * @author pissang (https://www.github.com/pissang)
 *         Kener (@Kener-林峰, kener.linfeng@gmail.com)
 *         errorrik (errorrik@gmail.com)
 */

/**
 * 贝塞尔平滑曲线
 * @alias module:zrender/shape/util/smoothBezier
 * @param {Array} points 线段顶点数组
 * @param {number} smooth 平滑等级, 0-1
 * @param {boolean} isLoop
 * @param {Array} constraint 将计算出来的控制点约束在一个包围盒内
 *                           比如 [[0, 0], [100, 100]], 这个包围盒会与
 *                           整个折线的包围盒做一个并集用来约束控制点。
 * @param {Array} 计算出来的控制点数组
 */
function _default(points, smooth, isLoop, constraint) {
  var cps = [];
  var v = [];
  var v1 = [];
  var v2 = [];
  var prevPoint;
  var nextPoint;
  var min;
  var max;

  if (constraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (var i = 0, len = points.length; i < len; i++) {
      v2Min(min, min, points[i]);
      v2Max(max, max, points[i]);
    } // 与指定的包围盒做并集


    v2Min(min, min, constraint[0]);
    v2Max(max, max, constraint[1]);
  }

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + 1) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(v2Clone(points[i]));
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }

    v2Sub(v, nextPoint, prevPoint); // use degree to scale the handle length

    v2Scale(v, v, smooth);
    var d0 = v2Distance(point, prevPoint);
    var d1 = v2Distance(point, nextPoint);
    var sum = d0 + d1;

    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    v2Scale(v1, v, -d0);
    v2Scale(v2, v, d1);
    var cp0 = v2Add([], point, v1);
    var cp1 = v2Add([], point, v2);

    if (constraint) {
      v2Max(cp0, cp0, min);
      v2Min(cp0, cp0, max);
      v2Max(cp1, cp1, min);
      v2Min(cp1, cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}

module.exports = _default;

/***/ }),

/***/ "9cf9":
/***/ (function(module, exports) {

/**
 * Sub-pixel optimize for canvas rendering, prevent from blur
 * when rendering a thin vertical/horizontal line.
 */
var round = Math.round;
/**
 * Sub pixel optimize line for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x1`, `x2`, `y1`, `y2` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x1]
 * @param {number} [inputShape.y1]
 * @param {number} [inputShape.x2]
 * @param {number} [inputShape.y2]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */

function subPixelOptimizeLine(outputShape, inputShape, style) {
  var lineWidth = style && style.lineWidth;

  if (!inputShape || !lineWidth) {
    return;
  }

  var x1 = inputShape.x1;
  var x2 = inputShape.x2;
  var y1 = inputShape.y1;
  var y2 = inputShape.y2;

  if (round(x1 * 2) === round(x2 * 2)) {
    outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
  } else {
    outputShape.x1 = x1;
    outputShape.x2 = x2;
  }

  if (round(y1 * 2) === round(y2 * 2)) {
    outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
  } else {
    outputShape.y1 = y1;
    outputShape.y2 = y2;
  }
}
/**
 * Sub pixel optimize rect for canvas
 *
 * @param {Object} outputShape The modification will be performed on `outputShape`.
 *                 `outputShape` and `inputShape` can be the same object.
 *                 `outputShape` object can be used repeatly, because all of
 *                 the `x`, `y`, `width`, `height` will be assigned in this method.
 * @param {Object} [inputShape]
 * @param {number} [inputShape.x]
 * @param {number} [inputShape.y]
 * @param {number} [inputShape.width]
 * @param {number} [inputShape.height]
 * @param {Object} [style]
 * @param {number} [style.lineWidth]
 */


function subPixelOptimizeRect(outputShape, inputShape, style) {
  var lineWidth = style && style.lineWidth;

  if (!inputShape || !lineWidth) {
    return;
  }

  var originX = inputShape.x;
  var originY = inputShape.y;
  var originWidth = inputShape.width;
  var originHeight = inputShape.height;
  outputShape.x = subPixelOptimize(originX, lineWidth, true);
  outputShape.y = subPixelOptimize(originY, lineWidth, true);
  outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
  outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
}
/**
 * Sub pixel optimize for canvas
 *
 * @param {number} position Coordinate, such as x, y
 * @param {number} lineWidth Should be nonnegative integer.
 * @param {boolean=} positiveOrNegative Default false (negative).
 * @return {number} Optimized position.
 */


function subPixelOptimize(position, lineWidth, positiveOrNegative) {
  // Assure that (position + lineWidth / 2) is near integer edge,
  // otherwise line will be fuzzy in canvas.
  var doubledPosition = round(position * 2);
  return (doubledPosition + round(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}

exports.subPixelOptimizeLine = subPixelOptimizeLine;
exports.subPixelOptimizeRect = subPixelOptimizeRect;
exports.subPixelOptimize = subPixelOptimize;

/***/ }),

/***/ "9e2e":
/***/ (function(module, exports, __webpack_require__) {

var textHelper = __webpack_require__("a73c");

var BoundingRect = __webpack_require__("9850");

var _constant = __webpack_require__("82eb");

var WILL_BE_RESTORED = _constant.WILL_BE_RESTORED;

/**
 * Mixin for drawing text in a element bounding rect
 * @module zrender/mixin/RectText
 */
var tmpRect = new BoundingRect();

var RectText = function () {};

RectText.prototype = {
  constructor: RectText,

  /**
   * Draw text in a rect with specified position.
   * @param  {CanvasRenderingContext2D} ctx
   * @param  {Object} rect Displayable rect
   */
  drawRectText: function (ctx, rect) {
    var style = this.style;
    rect = style.textRect || rect; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);
    var text = style.text; // Convert to string

    text != null && (text += '');

    if (!textHelper.needDrawText(text, style)) {
      return;
    } // FIXME
    // Do not provide prevEl to `textHelper.renderText` for ctx prop cache,
    // but use `ctx.save()` and `ctx.restore()`. Because the cache for rect
    // text propably break the cache for its host elements.


    ctx.save(); // Transform rect to view space

    var transform = this.transform;

    if (!style.transformText) {
      if (transform) {
        tmpRect.copy(rect);
        tmpRect.applyTransform(transform);
        rect = tmpRect;
      }
    } else {
      this.setTransform(ctx);
    } // transformText and textRotation can not be used at the same time.


    textHelper.renderText(this, ctx, text, style, rect, WILL_BE_RESTORED);
    ctx.restore();
  }
};
var _default = RectText;
module.exports = _default;

/***/ }),

/***/ "a73c":
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__("6d8b");

var retrieve2 = _util.retrieve2;
var retrieve3 = _util.retrieve3;
var each = _util.each;
var normalizeCssArray = _util.normalizeCssArray;
var isString = _util.isString;
var isObject = _util.isObject;

var textContain = __webpack_require__("e86a");

var roundRectHelper = __webpack_require__("5693");

var imageHelper = __webpack_require__("5e76");

var fixShadow = __webpack_require__("7d6d");

var _constant = __webpack_require__("82eb");

var ContextCachedBy = _constant.ContextCachedBy;
var WILL_BE_RESTORED = _constant.WILL_BE_RESTORED;
var DEFAULT_FONT = textContain.DEFAULT_FONT; // TODO: Have not support 'start', 'end' yet.

var VALID_TEXT_ALIGN = {
  left: 1,
  right: 1,
  center: 1
};
var VALID_TEXT_VERTICAL_ALIGN = {
  top: 1,
  bottom: 1,
  middle: 1
}; // Different from `STYLE_COMMON_PROPS` of `graphic/Style`,
// the default value of shadowColor is `'transparent'`.

var SHADOW_STYLE_COMMON_PROPS = [['textShadowBlur', 'shadowBlur', 0], ['textShadowOffsetX', 'shadowOffsetX', 0], ['textShadowOffsetY', 'shadowOffsetY', 0], ['textShadowColor', 'shadowColor', 'transparent']];
var _tmpTextPositionResult = {};
var _tmpBoxPositionResult = {};
/**
 * @param {module:zrender/graphic/Style} style
 * @return {module:zrender/graphic/Style} The input style.
 */

function normalizeTextStyle(style) {
  normalizeStyle(style);
  each(style.rich, normalizeStyle);
  return style;
}

function normalizeStyle(style) {
  if (style) {
    style.font = textContain.makeFont(style);
    var textAlign = style.textAlign;
    textAlign === 'middle' && (textAlign = 'center');
    style.textAlign = textAlign == null || VALID_TEXT_ALIGN[textAlign] ? textAlign : 'left'; // Compatible with textBaseline.

    var textVerticalAlign = style.textVerticalAlign || style.textBaseline;
    textVerticalAlign === 'center' && (textVerticalAlign = 'middle');
    style.textVerticalAlign = textVerticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[textVerticalAlign] ? textVerticalAlign : 'top';
    var textPadding = style.textPadding;

    if (textPadding) {
      style.textPadding = normalizeCssArray(style.textPadding);
    }
  }
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {module:zrender/graphic/Style} style
 * @param {Object|boolean} [rect] {x, y, width, height}
 *                  If set false, rect text is not used.
 * @param {Element|module:zrender/graphic/helper/constant.WILL_BE_RESTORED} [prevEl] For ctx prop cache.
 */


function renderText(hostEl, ctx, text, style, rect, prevEl) {
  style.rich ? renderRichText(hostEl, ctx, text, style, rect, prevEl) : renderPlainText(hostEl, ctx, text, style, rect, prevEl);
} // Avoid setting to ctx according to prevEl if possible for
// performance in scenarios of large amount text.


function renderPlainText(hostEl, ctx, text, style, rect, prevEl) {
  'use strict';

  var needDrawBg = needDrawBackground(style);
  var prevStyle;
  var checkCache = false;
  var cachedByMe = ctx.__attrCachedBy === ContextCachedBy.PLAIN_TEXT; // Only take and check cache for `Text` el, but not RectText.

  if (prevEl !== WILL_BE_RESTORED) {
    if (prevEl) {
      prevStyle = prevEl.style;
      checkCache = !needDrawBg && cachedByMe && prevStyle;
    } // Prevent from using cache in `Style::bind`, because of the case:
    // ctx property is modified by other properties than `Style::bind`
    // used, and Style::bind is called next.


    ctx.__attrCachedBy = needDrawBg ? ContextCachedBy.NONE : ContextCachedBy.PLAIN_TEXT;
  } // Since this will be restored, prevent from using these props to check cache in the next
  // entering of this method. But do not need to clear other cache like `Style::bind`.
  else if (cachedByMe) {
      ctx.__attrCachedBy = ContextCachedBy.NONE;
    }

  var styleFont = style.font || DEFAULT_FONT; // PENDING
  // Only `Text` el set `font` and keep it (`RectText` will restore). So theoretically
  // we can make font cache on ctx, which can cache for text el that are discontinuous.
  // But layer save/restore needed to be considered.
  // if (styleFont !== ctx.__fontCache) {
  //     ctx.font = styleFont;
  //     if (prevEl !== WILL_BE_RESTORED) {
  //         ctx.__fontCache = styleFont;
  //     }
  // }

  if (!checkCache || styleFont !== (prevStyle.font || DEFAULT_FONT)) {
    ctx.font = styleFont;
  } // Use the final font from context-2d, because the final
  // font might not be the style.font when it is illegal.
  // But get `ctx.font` might be time consuming.


  var computedFont = hostEl.__computedFont;

  if (hostEl.__styleFont !== styleFont) {
    hostEl.__styleFont = styleFont;
    computedFont = hostEl.__computedFont = ctx.font;
  }

  var textPadding = style.textPadding;
  var textLineHeight = style.textLineHeight;
  var contentBlock = hostEl.__textCotentBlock;

  if (!contentBlock || hostEl.__dirtyText) {
    contentBlock = hostEl.__textCotentBlock = textContain.parsePlainText(text, computedFont, textPadding, textLineHeight, style.truncate);
  }

  var outerHeight = contentBlock.outerHeight;
  var textLines = contentBlock.lines;
  var lineHeight = contentBlock.lineHeight;
  var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
  var baseX = boxPos.baseX;
  var baseY = boxPos.baseY;
  var textAlign = boxPos.textAlign || 'left';
  var textVerticalAlign = boxPos.textVerticalAlign; // Origin of textRotation should be the base point of text drawing.

  applyTextRotation(ctx, style, rect, baseX, baseY);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var textX = baseX;
  var textY = boxY;

  if (needDrawBg || textPadding) {
    // Consider performance, do not call getTextWidth util necessary.
    var textWidth = textContain.getWidth(text, computedFont);
    var outerWidth = textWidth;
    textPadding && (outerWidth += textPadding[1] + textPadding[3]);
    var boxX = textContain.adjustTextX(baseX, outerWidth, textAlign);
    needDrawBg && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);

    if (textPadding) {
      textX = getTextXForPadding(baseX, textAlign, textPadding);
      textY += textPadding[0];
    }
  } // Always set textAlign and textBase line, because it is difficute to calculate
  // textAlign from prevEl, and we dont sure whether textAlign will be reset if
  // font set happened.


  ctx.textAlign = textAlign; // Force baseline to be "middle". Otherwise, if using "top", the
  // text will offset downward a little bit in font "Microsoft YaHei".

  ctx.textBaseline = 'middle'; // Set text opacity

  ctx.globalAlpha = style.opacity || 1; // Always set shadowBlur and shadowOffset to avoid leak from displayable.

  for (var i = 0; i < SHADOW_STYLE_COMMON_PROPS.length; i++) {
    var propItem = SHADOW_STYLE_COMMON_PROPS[i];
    var styleProp = propItem[0];
    var ctxProp = propItem[1];
    var val = style[styleProp];

    if (!checkCache || val !== prevStyle[styleProp]) {
      ctx[ctxProp] = fixShadow(ctx, ctxProp, val || propItem[2]);
    }
  } // `textBaseline` is set as 'middle'.


  textY += lineHeight / 2;
  var textStrokeWidth = style.textStrokeWidth;
  var textStrokeWidthPrev = checkCache ? prevStyle.textStrokeWidth : null;
  var strokeWidthChanged = !checkCache || textStrokeWidth !== textStrokeWidthPrev;
  var strokeChanged = !checkCache || strokeWidthChanged || style.textStroke !== prevStyle.textStroke;
  var textStroke = getStroke(style.textStroke, textStrokeWidth);
  var textFill = getFill(style.textFill);

  if (textStroke) {
    if (strokeWidthChanged) {
      ctx.lineWidth = textStrokeWidth;
    }

    if (strokeChanged) {
      ctx.strokeStyle = textStroke;
    }
  }

  if (textFill) {
    if (!checkCache || style.textFill !== prevStyle.textFill) {
      ctx.fillStyle = textFill;
    }
  } // Optimize simply, in most cases only one line exists.


  if (textLines.length === 1) {
    // Fill after stroke so the outline will not cover the main part.
    textStroke && ctx.strokeText(textLines[0], textX, textY);
    textFill && ctx.fillText(textLines[0], textX, textY);
  } else {
    for (var i = 0; i < textLines.length; i++) {
      // Fill after stroke so the outline will not cover the main part.
      textStroke && ctx.strokeText(textLines[i], textX, textY);
      textFill && ctx.fillText(textLines[i], textX, textY);
      textY += lineHeight;
    }
  }
}

function renderRichText(hostEl, ctx, text, style, rect, prevEl) {
  // Do not do cache for rich text because of the complexity.
  // But `RectText` this will be restored, do not need to clear other cache like `Style::bind`.
  if (prevEl !== WILL_BE_RESTORED) {
    ctx.__attrCachedBy = ContextCachedBy.NONE;
  }

  var contentBlock = hostEl.__textCotentBlock;

  if (!contentBlock || hostEl.__dirtyText) {
    contentBlock = hostEl.__textCotentBlock = textContain.parseRichText(text, style);
  }

  drawRichText(hostEl, ctx, contentBlock, style, rect);
}

function drawRichText(hostEl, ctx, contentBlock, style, rect) {
  var contentWidth = contentBlock.width;
  var outerWidth = contentBlock.outerWidth;
  var outerHeight = contentBlock.outerHeight;
  var textPadding = style.textPadding;
  var boxPos = getBoxPosition(_tmpBoxPositionResult, hostEl, style, rect);
  var baseX = boxPos.baseX;
  var baseY = boxPos.baseY;
  var textAlign = boxPos.textAlign;
  var textVerticalAlign = boxPos.textVerticalAlign; // Origin of textRotation should be the base point of text drawing.

  applyTextRotation(ctx, style, rect, baseX, baseY);
  var boxX = textContain.adjustTextX(baseX, outerWidth, textAlign);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var xLeft = boxX;
  var lineTop = boxY;

  if (textPadding) {
    xLeft += textPadding[3];
    lineTop += textPadding[0];
  }

  var xRight = xLeft + contentWidth;
  needDrawBackground(style) && drawBackground(hostEl, ctx, style, boxX, boxY, outerWidth, outerHeight);

  for (var i = 0; i < contentBlock.lines.length; i++) {
    var line = contentBlock.lines[i];
    var tokens = line.tokens;
    var tokenCount = tokens.length;
    var lineHeight = line.lineHeight;
    var usedWidth = line.width;
    var leftIndex = 0;
    var lineXLeft = xLeft;
    var lineXRight = xRight;
    var rightIndex = tokenCount - 1;
    var token;

    while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.textAlign || token.textAlign === 'left')) {
      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft, 'left');
      usedWidth -= token.width;
      lineXLeft += token.width;
      leftIndex++;
    }

    while (rightIndex >= 0 && (token = tokens[rightIndex], token.textAlign === 'right')) {
      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXRight, 'right');
      usedWidth -= token.width;
      lineXRight -= token.width;
      rightIndex--;
    } // The other tokens are placed as textAlign 'center' if there is enough space.


    lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - usedWidth) / 2;

    while (leftIndex <= rightIndex) {
      token = tokens[leftIndex]; // Consider width specified by user, use 'center' rather than 'left'.

      placeToken(hostEl, ctx, token, style, lineHeight, lineTop, lineXLeft + token.width / 2, 'center');
      lineXLeft += token.width;
      leftIndex++;
    }

    lineTop += lineHeight;
  }
}

function applyTextRotation(ctx, style, rect, x, y) {
  // textRotation only apply in RectText.
  if (rect && style.textRotation) {
    var origin = style.textOrigin;

    if (origin === 'center') {
      x = rect.width / 2 + rect.x;
      y = rect.height / 2 + rect.y;
    } else if (origin) {
      x = origin[0] + rect.x;
      y = origin[1] + rect.y;
    }

    ctx.translate(x, y); // Positive: anticlockwise

    ctx.rotate(-style.textRotation);
    ctx.translate(-x, -y);
  }
}

function placeToken(hostEl, ctx, token, style, lineHeight, lineTop, x, textAlign) {
  var tokenStyle = style.rich[token.styleName] || {};
  tokenStyle.text = token.text; // 'ctx.textBaseline' is always set as 'middle', for sake of
  // the bias of "Microsoft YaHei".

  var textVerticalAlign = token.textVerticalAlign;
  var y = lineTop + lineHeight / 2;

  if (textVerticalAlign === 'top') {
    y = lineTop + token.height / 2;
  } else if (textVerticalAlign === 'bottom') {
    y = lineTop + lineHeight - token.height / 2;
  }

  !token.isLineHolder && needDrawBackground(tokenStyle) && drawBackground(hostEl, ctx, tokenStyle, textAlign === 'right' ? x - token.width : textAlign === 'center' ? x - token.width / 2 : x, y - token.height / 2, token.width, token.height);
  var textPadding = token.textPadding;

  if (textPadding) {
    x = getTextXForPadding(x, textAlign, textPadding);
    y -= token.height / 2 - textPadding[2] - token.textHeight / 2;
  }

  setCtx(ctx, 'shadowBlur', retrieve3(tokenStyle.textShadowBlur, style.textShadowBlur, 0));
  setCtx(ctx, 'shadowColor', tokenStyle.textShadowColor || style.textShadowColor || 'transparent');
  setCtx(ctx, 'shadowOffsetX', retrieve3(tokenStyle.textShadowOffsetX, style.textShadowOffsetX, 0));
  setCtx(ctx, 'shadowOffsetY', retrieve3(tokenStyle.textShadowOffsetY, style.textShadowOffsetY, 0));
  setCtx(ctx, 'textAlign', textAlign); // Force baseline to be "middle". Otherwise, if using "top", the
  // text will offset downward a little bit in font "Microsoft YaHei".

  setCtx(ctx, 'textBaseline', 'middle');
  setCtx(ctx, 'font', token.font || DEFAULT_FONT);
  var textStroke = getStroke(tokenStyle.textStroke || style.textStroke, textStrokeWidth);
  var textFill = getFill(tokenStyle.textFill || style.textFill);
  var textStrokeWidth = retrieve2(tokenStyle.textStrokeWidth, style.textStrokeWidth); // Fill after stroke so the outline will not cover the main part.

  if (textStroke) {
    setCtx(ctx, 'lineWidth', textStrokeWidth);
    setCtx(ctx, 'strokeStyle', textStroke);
    ctx.strokeText(token.text, x, y);
  }

  if (textFill) {
    setCtx(ctx, 'fillStyle', textFill);
    ctx.fillText(token.text, x, y);
  }
}

function needDrawBackground(style) {
  return !!(style.textBackgroundColor || style.textBorderWidth && style.textBorderColor);
} // style: {textBackgroundColor, textBorderWidth, textBorderColor, textBorderRadius, text}
// shape: {x, y, width, height}


function drawBackground(hostEl, ctx, style, x, y, width, height) {
  var textBackgroundColor = style.textBackgroundColor;
  var textBorderWidth = style.textBorderWidth;
  var textBorderColor = style.textBorderColor;
  var isPlainBg = isString(textBackgroundColor);
  setCtx(ctx, 'shadowBlur', style.textBoxShadowBlur || 0);
  setCtx(ctx, 'shadowColor', style.textBoxShadowColor || 'transparent');
  setCtx(ctx, 'shadowOffsetX', style.textBoxShadowOffsetX || 0);
  setCtx(ctx, 'shadowOffsetY', style.textBoxShadowOffsetY || 0);

  if (isPlainBg || textBorderWidth && textBorderColor) {
    ctx.beginPath();
    var textBorderRadius = style.textBorderRadius;

    if (!textBorderRadius) {
      ctx.rect(x, y, width, height);
    } else {
      roundRectHelper.buildPath(ctx, {
        x: x,
        y: y,
        width: width,
        height: height,
        r: textBorderRadius
      });
    }

    ctx.closePath();
  }

  if (isPlainBg) {
    setCtx(ctx, 'fillStyle', textBackgroundColor);

    if (style.fillOpacity != null) {
      var originalGlobalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = style.fillOpacity * style.opacity;
      ctx.fill();
      ctx.globalAlpha = originalGlobalAlpha;
    } else {
      ctx.fill();
    }
  } else if (isObject(textBackgroundColor)) {
    var image = textBackgroundColor.image;
    image = imageHelper.createOrUpdateImage(image, null, hostEl, onBgImageLoaded, textBackgroundColor);

    if (image && imageHelper.isImageReady(image)) {
      ctx.drawImage(image, x, y, width, height);
    }
  }

  if (textBorderWidth && textBorderColor) {
    setCtx(ctx, 'lineWidth', textBorderWidth);
    setCtx(ctx, 'strokeStyle', textBorderColor);

    if (style.strokeOpacity != null) {
      var originalGlobalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = style.strokeOpacity * style.opacity;
      ctx.stroke();
      ctx.globalAlpha = originalGlobalAlpha;
    } else {
      ctx.stroke();
    }
  }
}

function onBgImageLoaded(image, textBackgroundColor) {
  // Replace image, so that `contain/text.js#parseRichText`
  // will get correct result in next tick.
  textBackgroundColor.image = image;
}

function getBoxPosition(out, hostEl, style, rect) {
  var baseX = style.x || 0;
  var baseY = style.y || 0;
  var textAlign = style.textAlign;
  var textVerticalAlign = style.textVerticalAlign; // Text position represented by coord

  if (rect) {
    var textPosition = style.textPosition;

    if (textPosition instanceof Array) {
      // Percent
      baseX = rect.x + parsePercent(textPosition[0], rect.width);
      baseY = rect.y + parsePercent(textPosition[1], rect.height);
    } else {
      var res = hostEl && hostEl.calculateTextPosition ? hostEl.calculateTextPosition(_tmpTextPositionResult, style, rect) : textContain.calculateTextPosition(_tmpTextPositionResult, style, rect);
      baseX = res.x;
      baseY = res.y; // Default align and baseline when has textPosition

      textAlign = textAlign || res.textAlign;
      textVerticalAlign = textVerticalAlign || res.textVerticalAlign;
    } // textOffset is only support in RectText, otherwise
    // we have to adjust boundingRect for textOffset.


    var textOffset = style.textOffset;

    if (textOffset) {
      baseX += textOffset[0];
      baseY += textOffset[1];
    }
  }

  out = out || {};
  out.baseX = baseX;
  out.baseY = baseY;
  out.textAlign = textAlign;
  out.textVerticalAlign = textVerticalAlign;
  return out;
}

function setCtx(ctx, prop, value) {
  ctx[prop] = fixShadow(ctx, prop, value);
  return ctx[prop];
}
/**
 * @param {string} [stroke] If specified, do not check style.textStroke.
 * @param {string} [lineWidth] If specified, do not check style.textStroke.
 * @param {number} style
 */


function getStroke(stroke, lineWidth) {
  return stroke == null || lineWidth <= 0 || stroke === 'transparent' || stroke === 'none' ? null // TODO pattern and gradient?
  : stroke.image || stroke.colorStops ? '#000' : stroke;
}

function getFill(fill) {
  return fill == null || fill === 'none' ? null // TODO pattern and gradient?
  : fill.image || fill.colorStops ? '#000' : fill;
}

function parsePercent(value, maxValue) {
  if (typeof value === 'string') {
    if (value.lastIndexOf('%') >= 0) {
      return parseFloat(value) / 100 * maxValue;
    }

    return parseFloat(value);
  }

  return value;
}

function getTextXForPadding(x, textAlign, textPadding) {
  return textAlign === 'right' ? x - textPadding[1] : textAlign === 'center' ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
}
/**
 * @param {string} text
 * @param {module:zrender/Style} style
 * @return {boolean}
 */


function needDrawText(text, style) {
  return text != null && (text || style.textBackgroundColor || style.textBorderWidth && style.textBorderColor || style.textPadding);
}

exports.normalizeTextStyle = normalizeTextStyle;
exports.renderText = renderText;
exports.getBoxPosition = getBoxPosition;
exports.getStroke = getStroke;
exports.getFill = getFill;
exports.parsePercent = parsePercent;
exports.needDrawText = needDrawText;

/***/ }),

/***/ "ac0f":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var vec2 = __webpack_require__("401b");

var _curve = __webpack_require__("4a3f");

var quadraticSubdivide = _curve.quadraticSubdivide;
var cubicSubdivide = _curve.cubicSubdivide;
var quadraticAt = _curve.quadraticAt;
var cubicAt = _curve.cubicAt;
var quadraticDerivativeAt = _curve.quadraticDerivativeAt;
var cubicDerivativeAt = _curve.cubicDerivativeAt;

/**
 * 贝塞尔曲线
 * @module zrender/shape/BezierCurve
 */
var out = [];

function someVectorAt(shape, t, isTangent) {
  var cpx2 = shape.cpx2;
  var cpy2 = shape.cpy2;

  if (cpx2 === null || cpy2 === null) {
    return [(isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t), (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)];
  } else {
    return [(isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t), (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)];
  }
}

var _default = Path.extend({
  type: 'bezier-curve',
  shape: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    cpx1: 0,
    cpy1: 0,
    // cpx2: 0,
    // cpy2: 0
    // Curve show percent, for animating
    percent: 1
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x1 = shape.x1;
    var y1 = shape.y1;
    var x2 = shape.x2;
    var y2 = shape.y2;
    var cpx1 = shape.cpx1;
    var cpy1 = shape.cpy1;
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    var percent = shape.percent;

    if (percent === 0) {
      return;
    }

    ctx.moveTo(x1, y1);

    if (cpx2 == null || cpy2 == null) {
      if (percent < 1) {
        quadraticSubdivide(x1, cpx1, x2, percent, out);
        cpx1 = out[1];
        x2 = out[2];
        quadraticSubdivide(y1, cpy1, y2, percent, out);
        cpy1 = out[1];
        y2 = out[2];
      }

      ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
    } else {
      if (percent < 1) {
        cubicSubdivide(x1, cpx1, cpx2, x2, percent, out);
        cpx1 = out[1];
        cpx2 = out[2];
        x2 = out[3];
        cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
        cpy1 = out[1];
        cpy2 = out[2];
        y2 = out[3];
      }

      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
  },

  /**
   * Get point at percent
   * @param  {number} t
   * @return {Array.<number>}
   */
  pointAt: function (t) {
    return someVectorAt(this.shape, t, false);
  },

  /**
   * Get tangent at percent
   * @param  {number} t
   * @return {Array.<number>}
   */
  tangentAt: function (t) {
    var p = someVectorAt(this.shape, t, true);
    return vec2.normalize(p, p);
  }
});

module.exports = _default;

/***/ }),

/***/ "ae69":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

/**
 * 椭圆形状
 * @module zrender/graphic/shape/Ellipse
 */
var _default = Path.extend({
  type: 'ellipse',
  shape: {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0
  },
  buildPath: function (ctx, shape) {
    var k = 0.5522848;
    var x = shape.cx;
    var y = shape.cy;
    var a = shape.rx;
    var b = shape.ry;
    var ox = a * k; // 水平控制点偏移量

    var oy = b * k; // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线

    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.closePath();
  }
});

module.exports = _default;

/***/ }),

/***/ "bd6b":
/***/ (function(module, exports, __webpack_require__) {

var Animator = __webpack_require__("06ad");

var logError = __webpack_require__("4942");

var _util = __webpack_require__("6d8b");

var isString = _util.isString;
var isFunction = _util.isFunction;
var isObject = _util.isObject;
var isArrayLike = _util.isArrayLike;
var indexOf = _util.indexOf;

/**
 * @alias modue:zrender/mixin/Animatable
 * @constructor
 */
var Animatable = function () {
  /**
   * @type {Array.<module:zrender/animation/Animator>}
   * @readOnly
   */
  this.animators = [];
};

Animatable.prototype = {
  constructor: Animatable,

  /**
   * 动画
   *
   * @param {string} path The path to fetch value from object, like 'a.b.c'.
   * @param {boolean} [loop] Whether to loop animation.
   * @return {module:zrender/animation/Animator}
   * @example:
   *     el.animate('style', false)
   *         .when(1000, {x: 10} )
   *         .done(function(){ // Animation done })
   *         .start()
   */
  animate: function (path, loop) {
    var target;
    var animatingShape = false;
    var el = this;
    var zr = this.__zr;

    if (path) {
      var pathSplitted = path.split('.');
      var prop = el; // If animating shape

      animatingShape = pathSplitted[0] === 'shape';

      for (var i = 0, l = pathSplitted.length; i < l; i++) {
        if (!prop) {
          continue;
        }

        prop = prop[pathSplitted[i]];
      }

      if (prop) {
        target = prop;
      }
    } else {
      target = el;
    }

    if (!target) {
      logError('Property "' + path + '" is not existed in element ' + el.id);
      return;
    }

    var animators = el.animators;
    var animator = new Animator(target, loop);
    animator.during(function (target) {
      el.dirty(animatingShape);
    }).done(function () {
      // FIXME Animator will not be removed if use `Animator#stop` to stop animation
      animators.splice(indexOf(animators, animator), 1);
    });
    animators.push(animator); // If animate after added to the zrender

    if (zr) {
      zr.animation.addAnimator(animator);
    }

    return animator;
  },

  /**
   * 停止动画
   * @param {boolean} forwardToLast If move to last frame before stop
   */
  stopAnimation: function (forwardToLast) {
    var animators = this.animators;
    var len = animators.length;

    for (var i = 0; i < len; i++) {
      animators[i].stop(forwardToLast);
    }

    animators.length = 0;
    return this;
  },

  /**
   * Caution: this method will stop previous animation.
   * So do not use this method to one element twice before
   * animation starts, unless you know what you are doing.
   * @param {Object} target
   * @param {number} [time=500] Time in ms
   * @param {string} [easing='linear']
   * @param {number} [delay=0]
   * @param {Function} [callback]
   * @param {Function} [forceAnimate] Prevent stop animation and callback
   *        immediently when target values are the same as current values.
   *
   * @example
   *  // Animate position
   *  el.animateTo({
   *      position: [10, 10]
   *  }, function () { // done })
   *
   *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
   *  el.animateTo({
   *      shape: {
   *          width: 500
   *      },
   *      style: {
   *          fill: 'red'
   *      }
   *      position: [10, 10]
   *  }, 100, 100, 'cubicOut', function () { // done })
   */
  // TODO Return animation key
  animateTo: function (target, time, delay, easing, callback, forceAnimate) {
    animateTo(this, target, time, delay, easing, callback, forceAnimate);
  },

  /**
   * Animate from the target state to current state.
   * The params and the return value are the same as `this.animateTo`.
   */
  animateFrom: function (target, time, delay, easing, callback, forceAnimate) {
    animateTo(this, target, time, delay, easing, callback, forceAnimate, true);
  }
};

function animateTo(animatable, target, time, delay, easing, callback, forceAnimate, reverse) {
  // animateTo(target, time, easing, callback);
  if (isString(delay)) {
    callback = easing;
    easing = delay;
    delay = 0;
  } // animateTo(target, time, delay, callback);
  else if (isFunction(easing)) {
      callback = easing;
      easing = 'linear';
      delay = 0;
    } // animateTo(target, time, callback);
    else if (isFunction(delay)) {
        callback = delay;
        delay = 0;
      } // animateTo(target, callback)
      else if (isFunction(time)) {
          callback = time;
          time = 500;
        } // animateTo(target)
        else if (!time) {
            time = 500;
          } // Stop all previous animations


  animatable.stopAnimation();
  animateToShallow(animatable, '', animatable, target, time, delay, reverse); // Animators may be removed immediately after start
  // if there is nothing to animate

  var animators = animatable.animators.slice();
  var count = animators.length;

  function done() {
    count--;

    if (!count) {
      callback && callback();
    }
  } // No animators. This should be checked before animators[i].start(),
  // because 'done' may be executed immediately if no need to animate.


  if (!count) {
    callback && callback();
  } // Start after all animators created
  // Incase any animator is done immediately when all animation properties are not changed


  for (var i = 0; i < animators.length; i++) {
    animators[i].done(done).start(easing, forceAnimate);
  }
}
/**
 * @param {string} path=''
 * @param {Object} source=animatable
 * @param {Object} target
 * @param {number} [time=500]
 * @param {number} [delay=0]
 * @param {boolean} [reverse] If `true`, animate
 *        from the `target` to current state.
 *
 * @example
 *  // Animate position
 *  el._animateToShallow({
 *      position: [10, 10]
 *  })
 *
 *  // Animate shape, style and position in 100ms, delayed 100ms
 *  el._animateToShallow({
 *      shape: {
 *          width: 500
 *      },
 *      style: {
 *          fill: 'red'
 *      }
 *      position: [10, 10]
 *  }, 100, 100)
 */


function animateToShallow(animatable, path, source, target, time, delay, reverse) {
  var objShallow = {};
  var propertyCount = 0;

  for (var name in target) {
    if (!target.hasOwnProperty(name)) {
      continue;
    }

    if (source[name] != null) {
      if (isObject(target[name]) && !isArrayLike(target[name])) {
        animateToShallow(animatable, path ? path + '.' + name : name, source[name], target[name], time, delay, reverse);
      } else {
        if (reverse) {
          objShallow[name] = source[name];
          setAttrByPath(animatable, path, name, target[name]);
        } else {
          objShallow[name] = target[name];
        }

        propertyCount++;
      }
    } else if (target[name] != null && !reverse) {
      setAttrByPath(animatable, path, name, target[name]);
    }
  }

  if (propertyCount > 0) {
    animatable.animate(path, false).when(time == null ? 500 : time, objShallow).delay(delay || 0);
  }
}

function setAttrByPath(el, path, name, value) {
  // Attr directly if not has property
  // FIXME, if some property not needed for element ?
  if (!path) {
    el.attr(name, value);
  } else {
    // Only support set shape or style
    var props = {};
    props[path] = {};
    props[path][name] = value;
    el.attr(props);
  }
}

var _default = Animatable;
module.exports = _default;

/***/ }),

/***/ "c7a2":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var roundRectHelper = __webpack_require__("5693");

var _subPixelOptimize = __webpack_require__("9cf9");

var subPixelOptimizeRect = _subPixelOptimize.subPixelOptimizeRect;

/**
 * 矩形
 * @module zrender/graphic/shape/Rect
 */
// Avoid create repeatly.
var subPixelOptimizeOutputShape = {};

var _default = Path.extend({
  type: 'rect',
  shape: {
    // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
    // r缩写为1         相当于 [1, 1, 1, 1]
    // r缩写为[1]       相当于 [1, 1, 1, 1]
    // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
    // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
    r: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function (ctx, shape) {
    var x;
    var y;
    var width;
    var height;

    if (this.subPixelOptimize) {
      subPixelOptimizeRect(subPixelOptimizeOutputShape, shape, this.style);
      x = subPixelOptimizeOutputShape.x;
      y = subPixelOptimizeOutputShape.y;
      width = subPixelOptimizeOutputShape.width;
      height = subPixelOptimizeOutputShape.height;
      subPixelOptimizeOutputShape.r = shape.r;
      shape = subPixelOptimizeOutputShape;
    } else {
      x = shape.x;
      y = shape.y;
      width = shape.width;
      height = shape.height;
    }

    if (!shape.r) {
      ctx.rect(x, y, width, height);
    } else {
      roundRectHelper.buildPath(ctx, shape);
    }

    ctx.closePath();
    return;
  }
});

module.exports = _default;

/***/ }),

/***/ "cb11":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var _subPixelOptimize = __webpack_require__("9cf9");

var subPixelOptimizeLine = _subPixelOptimize.subPixelOptimizeLine;

/**
 * 直线
 * @module zrender/graphic/shape/Line
 */
// Avoid create repeatly.
var subPixelOptimizeOutputShape = {};

var _default = Path.extend({
  type: 'line',
  shape: {
    // Start point
    x1: 0,
    y1: 0,
    // End point
    x2: 0,
    y2: 0,
    percent: 1
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    var x1;
    var y1;
    var x2;
    var y2;

    if (this.subPixelOptimize) {
      subPixelOptimizeLine(subPixelOptimizeOutputShape, shape, this.style);
      x1 = subPixelOptimizeOutputShape.x1;
      y1 = subPixelOptimizeOutputShape.y1;
      x2 = subPixelOptimizeOutputShape.x2;
      y2 = subPixelOptimizeOutputShape.y2;
    } else {
      x1 = shape.x1;
      y1 = shape.y1;
      x2 = shape.x2;
      y2 = shape.y2;
    }

    var percent = shape.percent;

    if (percent === 0) {
      return;
    }

    ctx.moveTo(x1, y1);

    if (percent < 1) {
      x2 = x1 * (1 - percent) + x2 * percent;
      y2 = y1 * (1 - percent) + y2 * percent;
    }

    ctx.lineTo(x2, y2);
  },

  /**
   * Get point at percent
   * @param  {number} percent
   * @return {Array.<number>}
   */
  pointAt: function (p) {
    var shape = this.shape;
    return [shape.x1 * (1 - p) + shape.x2 * p, shape.y1 * (1 - p) + shape.y2 * p];
  }
});

module.exports = _default;

/***/ }),

/***/ "cb6d":
/***/ (function(module, exports) {

// TODO Draggable for group
// FIXME Draggable on element which has parent rotation or scale
function Draggable() {
  this.on('mousedown', this._dragStart, this);
  this.on('mousemove', this._drag, this);
  this.on('mouseup', this._dragEnd, this); // `mosuemove` and `mouseup` can be continue to fire when dragging.
  // See [Drag outside] in `Handler.js`. So we do not need to trigger
  // `_dragEnd` when globalout. That would brings better user experience.
  // this.on('globalout', this._dragEnd, this);
  // this._dropTarget = null;
  // this._draggingTarget = null;
  // this._x = 0;
  // this._y = 0;
}

Draggable.prototype = {
  constructor: Draggable,
  _dragStart: function (e) {
    var draggingTarget = e.target;

    if (draggingTarget && draggingTarget.draggable) {
      this._draggingTarget = draggingTarget;
      draggingTarget.dragging = true;
      this._x = e.offsetX;
      this._y = e.offsetY;
      this.dispatchToElement(param(draggingTarget, e), 'dragstart', e.event);
    }
  },
  _drag: function (e) {
    var draggingTarget = this._draggingTarget;

    if (draggingTarget) {
      var x = e.offsetX;
      var y = e.offsetY;
      var dx = x - this._x;
      var dy = y - this._y;
      this._x = x;
      this._y = y;
      draggingTarget.drift(dx, dy, e);
      this.dispatchToElement(param(draggingTarget, e), 'drag', e.event);
      var dropTarget = this.findHover(x, y, draggingTarget).target;
      var lastDropTarget = this._dropTarget;
      this._dropTarget = dropTarget;

      if (draggingTarget !== dropTarget) {
        if (lastDropTarget && dropTarget !== lastDropTarget) {
          this.dispatchToElement(param(lastDropTarget, e), 'dragleave', e.event);
        }

        if (dropTarget && dropTarget !== lastDropTarget) {
          this.dispatchToElement(param(dropTarget, e), 'dragenter', e.event);
        }
      }
    }
  },
  _dragEnd: function (e) {
    var draggingTarget = this._draggingTarget;

    if (draggingTarget) {
      draggingTarget.dragging = false;
    }

    this.dispatchToElement(param(draggingTarget, e), 'dragend', e.event);

    if (this._dropTarget) {
      this.dispatchToElement(param(this._dropTarget, e), 'drop', e.event);
    }

    this._draggingTarget = null;
    this._dropTarget = null;
  }
};

function param(target, e) {
  return {
    target: target,
    topTarget: e && e.topTarget
  };
}

var _default = Draggable;
module.exports = _default;

/***/ }),

/***/ "cbe5":
/***/ (function(module, exports, __webpack_require__) {

var Displayable = __webpack_require__("19eb");

var zrUtil = __webpack_require__("6d8b");

var PathProxy = __webpack_require__("20c8");

var pathContain = __webpack_require__("d833");

var Pattern = __webpack_require__("dc2f");

var getCanvasPattern = Pattern.prototype.getCanvasPattern;
var abs = Math.abs;
var pathProxyForDraw = new PathProxy(true);
/**
 * @alias module:zrender/graphic/Path
 * @extends module:zrender/graphic/Displayable
 * @constructor
 * @param {Object} opts
 */

function Path(opts) {
  Displayable.call(this, opts);
  /**
   * @type {module:zrender/core/PathProxy}
   * @readOnly
   */

  this.path = null;
}

Path.prototype = {
  constructor: Path,
  type: 'path',
  __dirtyPath: true,
  strokeContainThreshold: 5,
  // This item default to be false. But in map series in echarts,
  // in order to improve performance, it should be set to true,
  // so the shorty segment won't draw.
  segmentIgnoreThreshold: 0,

  /**
   * See `module:zrender/src/graphic/helper/subPixelOptimize`.
   * @type {boolean}
   */
  subPixelOptimize: false,
  brush: function (ctx, prevEl) {
    var style = this.style;
    var path = this.path || pathProxyForDraw;
    var hasStroke = style.hasStroke();
    var hasFill = style.hasFill();
    var fill = style.fill;
    var stroke = style.stroke;
    var hasFillGradient = hasFill && !!fill.colorStops;
    var hasStrokeGradient = hasStroke && !!stroke.colorStops;
    var hasFillPattern = hasFill && !!fill.image;
    var hasStrokePattern = hasStroke && !!stroke.image;
    style.bind(ctx, this, prevEl);
    this.setTransform(ctx);

    if (this.__dirty) {
      var rect; // Update gradient because bounding rect may changed

      if (hasFillGradient) {
        rect = rect || this.getBoundingRect();
        this._fillGradient = style.getGradient(ctx, fill, rect);
      }

      if (hasStrokeGradient) {
        rect = rect || this.getBoundingRect();
        this._strokeGradient = style.getGradient(ctx, stroke, rect);
      }
    } // Use the gradient or pattern


    if (hasFillGradient) {
      // PENDING If may have affect the state
      ctx.fillStyle = this._fillGradient;
    } else if (hasFillPattern) {
      ctx.fillStyle = getCanvasPattern.call(fill, ctx);
    }

    if (hasStrokeGradient) {
      ctx.strokeStyle = this._strokeGradient;
    } else if (hasStrokePattern) {
      ctx.strokeStyle = getCanvasPattern.call(stroke, ctx);
    }

    var lineDash = style.lineDash;
    var lineDashOffset = style.lineDashOffset;
    var ctxLineDash = !!ctx.setLineDash; // Update path sx, sy

    var scale = this.getGlobalScale();
    path.setScale(scale[0], scale[1], this.segmentIgnoreThreshold); // Proxy context
    // Rebuild path in following 2 cases
    // 1. Path is dirty
    // 2. Path needs javascript implemented lineDash stroking.
    //    In this case, lineDash information will not be saved in PathProxy

    if (this.__dirtyPath || lineDash && !ctxLineDash && hasStroke) {
      path.beginPath(ctx); // Setting line dash before build path

      if (lineDash && !ctxLineDash) {
        path.setLineDash(lineDash);
        path.setLineDashOffset(lineDashOffset);
      }

      this.buildPath(path, this.shape, false); // Clear path dirty flag

      if (this.path) {
        this.__dirtyPath = false;
      }
    } else {
      // Replay path building
      ctx.beginPath();
      this.path.rebuildPath(ctx);
    }

    if (hasFill) {
      if (style.fillOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.fillOpacity * style.opacity;
        path.fill(ctx);
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        path.fill(ctx);
      }
    }

    if (lineDash && ctxLineDash) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }

    if (hasStroke) {
      if (style.strokeOpacity != null) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.strokeOpacity * style.opacity;
        path.stroke(ctx);
        ctx.globalAlpha = originalGlobalAlpha;
      } else {
        path.stroke(ctx);
      }
    }

    if (lineDash && ctxLineDash) {
      // PENDING
      // Remove lineDash
      ctx.setLineDash([]);
    } // Draw rect text


    if (style.text != null) {
      // Only restore transform when needs draw text.
      this.restoreTransform(ctx);
      this.drawRectText(ctx, this.getBoundingRect());
    }
  },
  // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
  // Like in circle
  buildPath: function (ctx, shapeCfg, inBundle) {},
  createPathProxy: function () {
    this.path = new PathProxy();
  },
  getBoundingRect: function () {
    var rect = this._rect;
    var style = this.style;
    var needsUpdateRect = !rect;

    if (needsUpdateRect) {
      var path = this.path;

      if (!path) {
        // Create path on demand.
        path = this.path = new PathProxy();
      }

      if (this.__dirtyPath) {
        path.beginPath();
        this.buildPath(path, this.shape, false);
      }

      rect = path.getBoundingRect();
    }

    this._rect = rect;

    if (style.hasStroke()) {
      // Needs update rect with stroke lineWidth when
      // 1. Element changes scale or lineWidth
      // 2. Shape is changed
      var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());

      if (this.__dirty || needsUpdateRect) {
        rectWithStroke.copy(rect); // FIXME Must after updateTransform

        var w = style.lineWidth; // PENDING, Min line width is needed when line is horizontal or vertical

        var lineScale = style.strokeNoScale ? this.getLineScale() : 1; // Only add extra hover lineWidth when there are no fill

        if (!style.hasFill()) {
          w = Math.max(w, this.strokeContainThreshold || 4);
        } // Consider line width
        // Line scale can't be 0;


        if (lineScale > 1e-10) {
          rectWithStroke.width += w / lineScale;
          rectWithStroke.height += w / lineScale;
          rectWithStroke.x -= w / lineScale / 2;
          rectWithStroke.y -= w / lineScale / 2;
        }
      } // Return rect with stroke


      return rectWithStroke;
    }

    return rect;
  },
  contain: function (x, y) {
    var localPos = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    var style = this.style;
    x = localPos[0];
    y = localPos[1];

    if (rect.contain(x, y)) {
      var pathData = this.path.data;

      if (style.hasStroke()) {
        var lineWidth = style.lineWidth;
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1; // Line scale can't be 0;

        if (lineScale > 1e-10) {
          // Only add extra hover lineWidth when there are no fill
          if (!style.hasFill()) {
            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
          }

          if (pathContain.containStroke(pathData, lineWidth / lineScale, x, y)) {
            return true;
          }
        }
      }

      if (style.hasFill()) {
        return pathContain.contain(pathData, x, y);
      }
    }

    return false;
  },

  /**
   * @param  {boolean} dirtyPath
   */
  dirty: function (dirtyPath) {
    if (dirtyPath == null) {
      dirtyPath = true;
    } // Only mark dirty, not mark clean


    if (dirtyPath) {
      this.__dirtyPath = dirtyPath;
      this._rect = null;
    }

    this.__dirty = this.__dirtyText = true;
    this.__zr && this.__zr.refresh(); // Used as a clipping path

    if (this.__clipTarget) {
      this.__clipTarget.dirty();
    }
  },

  /**
   * Alias for animate('shape')
   * @param {boolean} loop
   */
  animateShape: function (loop) {
    return this.animate('shape', loop);
  },
  // Overwrite attrKV
  attrKV: function (key, value) {
    // FIXME
    if (key === 'shape') {
      this.setShape(value);
      this.__dirtyPath = true;
      this._rect = null;
    } else {
      Displayable.prototype.attrKV.call(this, key, value);
    }
  },

  /**
   * @param {Object|string} key
   * @param {*} value
   */
  setShape: function (key, value) {
    var shape = this.shape; // Path from string may not have shape

    if (shape) {
      if (zrUtil.isObject(key)) {
        for (var name in key) {
          if (key.hasOwnProperty(name)) {
            shape[name] = key[name];
          }
        }
      } else {
        shape[key] = value;
      }

      this.dirty(true);
    }

    return this;
  },
  getLineScale: function () {
    var m = this.transform; // Get the line scale.
    // Determinant of `m` means how much the area is enlarged by the
    // transformation. So its square root can be used as a scale factor
    // for width.

    return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10 ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1])) : 1;
  }
};
/**
 * 扩展一个 Path element, 比如星形，圆等。
 * Extend a path element
 * @param {Object} props
 * @param {string} props.type Path type
 * @param {Function} props.init Initialize
 * @param {Function} props.buildPath Overwrite buildPath method
 * @param {Object} [props.style] Extended default style config
 * @param {Object} [props.shape] Extended default shape config
 */

Path.extend = function (defaults) {
  var Sub = function (opts) {
    Path.call(this, opts);

    if (defaults.style) {
      // Extend default style
      this.style.extendFrom(defaults.style, false);
    } // Extend default shape


    var defaultShape = defaults.shape;

    if (defaultShape) {
      this.shape = this.shape || {};
      var thisShape = this.shape;

      for (var name in defaultShape) {
        if (!thisShape.hasOwnProperty(name) && defaultShape.hasOwnProperty(name)) {
          thisShape[name] = defaultShape[name];
        }
      }
    }

    defaults.init && defaults.init.call(this, opts);
  };

  zrUtil.inherits(Sub, Path); // FIXME 不能 extend position, rotation 等引用对象

  for (var name in defaults) {
    // Extending prototype values and methods
    if (name !== 'style' && name !== 'shape') {
      Sub.prototype[name] = defaults[name];
    }
  }

  return Sub;
};

zrUtil.inherits(Path, Displayable);
var _default = Path;
module.exports = _default;

/***/ }),

/***/ "d498":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var polyHelper = __webpack_require__("4fac");

/**
 * @module zrender/graphic/shape/Polyline
 */
var _default = Path.extend({
  type: 'polyline',
  shape: {
    points: null,
    smooth: false,
    smoothConstraint: null
  },
  style: {
    stroke: '#000',
    fill: null
  },
  buildPath: function (ctx, shape) {
    polyHelper.buildPath(ctx, shape, false);
  }
});

module.exports = _default;

/***/ }),

/***/ "d4c6":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

// CompoundPath to improve performance
var _default = Path.extend({
  type: 'compound',
  shape: {
    paths: null
  },
  _updatePathDirty: function () {
    var dirtyPath = this.__dirtyPath;
    var paths = this.shape.paths;

    for (var i = 0; i < paths.length; i++) {
      // Mark as dirty if any subpath is dirty
      dirtyPath = dirtyPath || paths[i].__dirtyPath;
    }

    this.__dirtyPath = dirtyPath;
    this.__dirty = this.__dirty || dirtyPath;
  },
  beforeBrush: function () {
    this._updatePathDirty();

    var paths = this.shape.paths || [];
    var scale = this.getGlobalScale(); // Update path scale

    for (var i = 0; i < paths.length; i++) {
      if (!paths[i].path) {
        paths[i].createPathProxy();
      }

      paths[i].path.setScale(scale[0], scale[1], paths[i].segmentIgnoreThreshold);
    }
  },
  buildPath: function (ctx, shape) {
    var paths = shape.paths || [];

    for (var i = 0; i < paths.length; i++) {
      paths[i].buildPath(ctx, paths[i].shape, true);
    }
  },
  afterBrush: function () {
    var paths = this.shape.paths || [];

    for (var i = 0; i < paths.length; i++) {
      paths[i].__dirtyPath = false;
    }
  },
  getBoundingRect: function () {
    this._updatePathDirty();

    return Path.prototype.getBoundingRect.call(this);
  }
});

module.exports = _default;

/***/ }),

/***/ "d9fc":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

/**
 * 圆形
 * @module zrender/shape/Circle
 */
var _default = Path.extend({
  type: 'circle',
  shape: {
    cx: 0,
    cy: 0,
    r: 0
  },
  buildPath: function (ctx, shape, inBundle) {
    // Better stroking in ShapeBundle
    // Always do it may have performence issue ( fill may be 2x more cost)
    if (inBundle) {
      ctx.moveTo(shape.cx + shape.r, shape.cy);
    } // else {
    //     if (ctx.allocate && !ctx.data.length) {
    //         ctx.allocate(ctx.CMD_MEM_SIZE.A);
    //     }
    // }
    // Better stroking in ShapeBundle
    // ctx.moveTo(shape.cx + shape.r, shape.cy);


    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
  }
});

module.exports = _default;

/***/ }),

/***/ "dc20":
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__("8727");

var createElement = _core.createElement;

var util = __webpack_require__("6d8b");

var logError = __webpack_require__("4942");

var Path = __webpack_require__("cbe5");

var ZImage = __webpack_require__("0da8");

var ZText = __webpack_require__("76a5");

var arrayDiff = __webpack_require__("0c12");

var GradientManager = __webpack_require__("b16f");

var ClippathManager = __webpack_require__("9fa3");

var ShadowManager = __webpack_require__("bcaa");

var _graphic = __webpack_require__("3f8e");

var svgPath = _graphic.path;
var svgImage = _graphic.image;
var svgText = _graphic.text;

/**
 * SVG Painter
 * @module zrender/svg/Painter
 */
function parseInt10(val) {
  return parseInt(val, 10);
}

function getSvgProxy(el) {
  if (el instanceof Path) {
    return svgPath;
  } else if (el instanceof ZImage) {
    return svgImage;
  } else if (el instanceof ZText) {
    return svgText;
  } else {
    return svgPath;
  }
}

function checkParentAvailable(parent, child) {
  return child && parent && child.parentNode !== parent;
}

function insertAfter(parent, child, prevSibling) {
  if (checkParentAvailable(parent, child) && prevSibling) {
    var nextSibling = prevSibling.nextSibling;
    nextSibling ? parent.insertBefore(child, nextSibling) : parent.appendChild(child);
  }
}

function prepend(parent, child) {
  if (checkParentAvailable(parent, child)) {
    var firstChild = parent.firstChild;
    firstChild ? parent.insertBefore(child, firstChild) : parent.appendChild(child);
  }
} // function append(parent, child) {
//     if (checkParentAvailable(parent, child)) {
//         parent.appendChild(child);
//     }
// }


function remove(parent, child) {
  if (child && parent && child.parentNode === parent) {
    parent.removeChild(child);
  }
}

function getTextSvgElement(displayable) {
  return displayable.__textSvgEl;
}

function getSvgElement(displayable) {
  return displayable.__svgEl;
}
/**
 * @alias module:zrender/svg/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */


var SVGPainter = function (root, storage, opts, zrId) {
  this.root = root;
  this.storage = storage;
  this._opts = opts = util.extend({}, opts || {});
  var svgRoot = createElement('svg');
  svgRoot.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgRoot.setAttribute('version', '1.1');
  svgRoot.setAttribute('baseProfile', 'full');
  svgRoot.style.cssText = 'user-select:none;position:absolute;left:0;top:0;';
  this.gradientManager = new GradientManager(zrId, svgRoot);
  this.clipPathManager = new ClippathManager(zrId, svgRoot);
  this.shadowManager = new ShadowManager(zrId, svgRoot);
  var viewport = document.createElement('div');
  viewport.style.cssText = 'overflow:hidden;position:relative';
  this._svgRoot = svgRoot;
  this._viewport = viewport;
  root.appendChild(viewport);
  viewport.appendChild(svgRoot);
  this.resize(opts.width, opts.height);
  this._visibleList = [];
};

SVGPainter.prototype = {
  constructor: SVGPainter,
  getType: function () {
    return 'svg';
  },
  getViewportRoot: function () {
    return this._viewport;
  },
  getViewportRootOffset: function () {
    var viewportRoot = this.getViewportRoot();

    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  },
  refresh: function () {
    var list = this.storage.getDisplayList(true);

    this._paintList(list);
  },
  setBackgroundColor: function (backgroundColor) {
    // TODO gradient
    this._viewport.style.background = backgroundColor;
  },
  _paintList: function (list) {
    this.gradientManager.markAllUnused();
    this.clipPathManager.markAllUnused();
    this.shadowManager.markAllUnused();
    var svgRoot = this._svgRoot;
    var visibleList = this._visibleList;
    var listLen = list.length;
    var newVisibleList = [];
    var i;

    for (i = 0; i < listLen; i++) {
      var displayable = list[i];
      var svgProxy = getSvgProxy(displayable);
      var svgElement = getSvgElement(displayable) || getTextSvgElement(displayable);

      if (!displayable.invisible) {
        if (displayable.__dirty) {
          svgProxy && svgProxy.brush(displayable); // Update clipPath

          this.clipPathManager.update(displayable); // Update gradient and shadow

          if (displayable.style) {
            this.gradientManager.update(displayable.style.fill);
            this.gradientManager.update(displayable.style.stroke);
            this.shadowManager.update(svgElement, displayable);
          }

          displayable.__dirty = false;
        }

        newVisibleList.push(displayable);
      }
    }

    var diff = arrayDiff(visibleList, newVisibleList);
    var prevSvgElement; // First do remove, in case element moved to the head and do remove
    // after add

    for (i = 0; i < diff.length; i++) {
      var item = diff[i];

      if (item.removed) {
        for (var k = 0; k < item.count; k++) {
          var displayable = visibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          remove(svgRoot, svgElement);
          remove(svgRoot, textSvgElement);
        }
      }
    }

    for (i = 0; i < diff.length; i++) {
      var item = diff[i];

      if (item.added) {
        for (var k = 0; k < item.count; k++) {
          var displayable = newVisibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          prevSvgElement ? insertAfter(svgRoot, svgElement, prevSvgElement) : prepend(svgRoot, svgElement);

          if (svgElement) {
            insertAfter(svgRoot, textSvgElement, svgElement);
          } else if (prevSvgElement) {
            insertAfter(svgRoot, textSvgElement, prevSvgElement);
          } else {
            prepend(svgRoot, textSvgElement);
          } // Insert text


          insertAfter(svgRoot, textSvgElement, svgElement);
          prevSvgElement = textSvgElement || svgElement || prevSvgElement; // zrender.Text only create textSvgElement.

          this.gradientManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.shadowManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.clipPathManager.markUsed(displayable);
        }
      } else if (!item.removed) {
        for (var k = 0; k < item.count; k++) {
          var displayable = newVisibleList[item.indices[k]];
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          var svgElement = getSvgElement(displayable);
          var textSvgElement = getTextSvgElement(displayable);
          this.gradientManager.markUsed(displayable);
          this.gradientManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.shadowManager.markUsed(displayable);
          this.shadowManager.addWithoutUpdate(svgElement || textSvgElement, displayable);
          this.clipPathManager.markUsed(displayable);

          if (textSvgElement) {
            // Insert text.
            insertAfter(svgRoot, textSvgElement, svgElement);
          }

          prevSvgElement = svgElement || textSvgElement || prevSvgElement;
        }
      }
    }

    this.gradientManager.removeUnused();
    this.clipPathManager.removeUnused();
    this.shadowManager.removeUnused();
    this._visibleList = newVisibleList;
  },
  _getDefs: function (isForceCreating) {
    var svgRoot = this._svgRoot;

    var defs = this._svgRoot.getElementsByTagName('defs');

    if (defs.length === 0) {
      // Not exist
      if (isForceCreating) {
        var defs = svgRoot.insertBefore(createElement('defs'), // Create new tag
        svgRoot.firstChild // Insert in the front of svg
        );

        if (!defs.contains) {
          // IE doesn't support contains method
          defs.contains = function (el) {
            var children = defs.children;

            if (!children) {
              return false;
            }

            for (var i = children.length - 1; i >= 0; --i) {
              if (children[i] === el) {
                return true;
              }
            }

            return false;
          };
        }

        return defs;
      } else {
        return null;
      }
    } else {
      return defs[0];
    }
  },
  resize: function (width, height) {
    var viewport = this._viewport; // FIXME Why ?

    viewport.style.display = 'none'; // Save input w/h

    var opts = this._opts;
    width != null && (opts.width = width);
    height != null && (opts.height = height);
    width = this._getSize(0);
    height = this._getSize(1);
    viewport.style.display = '';

    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      var viewportStyle = viewport.style;
      viewportStyle.width = width + 'px';
      viewportStyle.height = height + 'px';
      var svgRoot = this._svgRoot; // Set width by 'svgRoot.width = width' is invalid

      svgRoot.setAttribute('width', width);
      svgRoot.setAttribute('height', height);
    }
  },

  /**
   * 获取绘图区域宽度
   */
  getWidth: function () {
    return this._width;
  },

  /**
   * 获取绘图区域高度
   */
  getHeight: function () {
    return this._height;
  },
  _getSize: function (whIdx) {
    var opts = this._opts;
    var wh = ['width', 'height'][whIdx];
    var cwh = ['clientWidth', 'clientHeight'][whIdx];
    var plt = ['paddingLeft', 'paddingTop'][whIdx];
    var prb = ['paddingRight', 'paddingBottom'][whIdx];

    if (opts[wh] != null && opts[wh] !== 'auto') {
      return parseFloat(opts[wh]);
    }

    var root = this.root; // IE8 does not support getComputedStyle, but it use VML.

    var stl = document.defaultView.getComputedStyle(root);
    return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
  },
  dispose: function () {
    this.root.innerHTML = '';
    this._svgRoot = this._viewport = this.storage = null;
  },
  clear: function () {
    if (this._viewport) {
      this.root.removeChild(this._viewport);
    }
  },
  pathToDataUrl: function () {
    this.refresh();
    var html = this._svgRoot.outerHTML;
    return 'data:image/svg+xml;charset=UTF-8,' + html;
  }
}; // Not supported methods

function createMethodNotSupport(method) {
  return function () {
    logError('In SVG mode painter not support method "' + method + '"');
  };
} // Unsuppoted methods


util.each(['getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer', 'eachOtherLayer', 'getLayers', 'modLayer', 'delLayer', 'clearLayer', 'toDataURL', 'pathToImage'], function (name) {
  SVGPainter.prototype[name] = createMethodNotSupport(name);
});
var _default = SVGPainter;
module.exports = _default;

/***/ }),

/***/ "dc2f":
/***/ (function(module, exports) {

var Pattern = function (image, repeat) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {image: ...}`, where this constructor will not be called.
  this.image = image;
  this.repeat = repeat; // Can be cloned

  this.type = 'pattern';
};

Pattern.prototype.getCanvasPattern = function (ctx) {
  return ctx.createPattern(this.image, this.repeat || 'repeat');
};

var _default = Pattern;
module.exports = _default;

/***/ }),

/***/ "dded":
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__("6d8b");

var Gradient = __webpack_require__("42e5");

/**
 * x, y, r are all percent from 0 to 1
 * @param {number} [x=0.5]
 * @param {number} [y=0.5]
 * @param {number} [r=0.5]
 * @param {Array.<Object>} [colorStops]
 * @param {boolean} [globalCoord=false]
 */
var RadialGradient = function (x, y, r, colorStops, globalCoord) {
  // Should do nothing more in this constructor. Because gradient can be
  // declard by `color: {type: 'radial', colorStops: ...}`, where
  // this constructor will not be called.
  this.x = x == null ? 0.5 : x;
  this.y = y == null ? 0.5 : y;
  this.r = r == null ? 0.5 : r; // Can be cloned

  this.type = 'radial'; // If use global coord

  this.global = globalCoord || false;
  Gradient.call(this, colorStops);
};

RadialGradient.prototype = {
  constructor: RadialGradient
};
zrUtil.inherits(RadialGradient, Gradient);
var _default = RadialGradient;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~fd542d86.e53cc78d.js.map