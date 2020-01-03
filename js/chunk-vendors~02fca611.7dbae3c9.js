(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~02fca611"],{

/***/ "697e7":
/***/ (function(module, exports, __webpack_require__) {

var guid = __webpack_require__("de00");

var env = __webpack_require__("22d1");

var zrUtil = __webpack_require__("6d8b");

var Handler = __webpack_require__("d2cf");

var Storage = __webpack_require__("afa0");

var Painter = __webpack_require__("ed21");

var Animation = __webpack_require__("30a3");

var HandlerProxy = __webpack_require__("cdaa");

/*!
* ZRender, a high performance 2d drawing library.
*
* Copyright (c) 2013, Baidu Inc.
* All rights reserved.
*
* LICENSE
* https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
*/
var useVML = !env.canvasSupported;
var painterCtors = {
  canvas: Painter
};
var instances = {}; // ZRender实例map索引

/**
 * @type {string}
 */

var version = '4.2.0';
/**
 * Initializing a zrender instance
 * @param {HTMLElement} dom
 * @param {Object} [opts]
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
 * @return {module:zrender/ZRender}
 */

function init(dom, opts) {
  var zr = new ZRender(guid(), dom, opts);
  instances[zr.id] = zr;
  return zr;
}
/**
 * Dispose zrender instance
 * @param {module:zrender/ZRender} zr
 */


function dispose(zr) {
  if (zr) {
    zr.dispose();
  } else {
    for (var key in instances) {
      if (instances.hasOwnProperty(key)) {
        instances[key].dispose();
      }
    }

    instances = {};
  }

  return this;
}
/**
 * Get zrender instance by id
 * @param {string} id zrender instance id
 * @return {module:zrender/ZRender}
 */


function getInstance(id) {
  return instances[id];
}

function registerPainter(name, Ctor) {
  painterCtors[name] = Ctor;
}

function delInstance(id) {
  delete instances[id];
}
/**
 * @module zrender/ZRender
 */

/**
 * @constructor
 * @alias module:zrender/ZRender
 * @param {string} id
 * @param {HTMLElement} dom
 * @param {Object} opts
 * @param {string} [opts.renderer='canvas'] 'canvas' or 'svg'
 * @param {number} [opts.devicePixelRatio]
 * @param {number} [opts.width] Can be 'auto' (the same as null/undefined)
 * @param {number} [opts.height] Can be 'auto' (the same as null/undefined)
 */


var ZRender = function (id, dom, opts) {
  opts = opts || {};
  /**
   * @type {HTMLDomElement}
   */

  this.dom = dom;
  /**
   * @type {string}
   */

  this.id = id;
  var self = this;
  var storage = new Storage();
  var rendererType = opts.renderer; // TODO WebGL

  if (useVML) {
    if (!painterCtors.vml) {
      throw new Error('You need to require \'zrender/vml/vml\' to support IE8');
    }

    rendererType = 'vml';
  } else if (!rendererType || !painterCtors[rendererType]) {
    rendererType = 'canvas';
  }

  var painter = new painterCtors[rendererType](dom, storage, opts, id);
  this.storage = storage;
  this.painter = painter;
  var handerProxy = !env.node && !env.worker ? new HandlerProxy(painter.getViewportRoot(), painter.root) : null;
  this.handler = new Handler(storage, painter, handerProxy, painter.root);
  /**
   * @type {module:zrender/animation/Animation}
   */

  this.animation = new Animation({
    stage: {
      update: zrUtil.bind(this.flush, this)
    }
  });
  this.animation.start();
  /**
   * @type {boolean}
   * @private
   */

  this._needsRefresh; // 修改 storage.delFromStorage, 每次删除元素之前删除动画
  // FIXME 有点ugly

  var oldDelFromStorage = storage.delFromStorage;
  var oldAddToStorage = storage.addToStorage;

  storage.delFromStorage = function (el) {
    oldDelFromStorage.call(storage, el);
    el && el.removeSelfFromZr(self);
  };

  storage.addToStorage = function (el) {
    oldAddToStorage.call(storage, el);
    el.addSelfToZr(self);
  };
};

ZRender.prototype = {
  constructor: ZRender,

  /**
   * 获取实例唯一标识
   * @return {string}
   */
  getId: function () {
    return this.id;
  },

  /**
   * 添加元素
   * @param  {module:zrender/Element} el
   */
  add: function (el) {
    this.storage.addRoot(el);
    this._needsRefresh = true;
  },

  /**
   * 删除元素
   * @param  {module:zrender/Element} el
   */
  remove: function (el) {
    this.storage.delRoot(el);
    this._needsRefresh = true;
  },

  /**
   * Change configuration of layer
   * @param {string} zLevel
   * @param {Object} config
   * @param {string} [config.clearColor=0] Clear color
   * @param {string} [config.motionBlur=false] If enable motion blur
   * @param {number} [config.lastFrameAlpha=0.7] Motion blur factor. Larger value cause longer trailer
  */
  configLayer: function (zLevel, config) {
    if (this.painter.configLayer) {
      this.painter.configLayer(zLevel, config);
    }

    this._needsRefresh = true;
  },

  /**
   * Set background color
   * @param {string} backgroundColor
   */
  setBackgroundColor: function (backgroundColor) {
    if (this.painter.setBackgroundColor) {
      this.painter.setBackgroundColor(backgroundColor);
    }

    this._needsRefresh = true;
  },

  /**
   * Repaint the canvas immediately
   */
  refreshImmediately: function () {
    // var start = new Date();
    // Clear needsRefresh ahead to avoid something wrong happens in refresh
    // Or it will cause zrender refreshes again and again.
    this._needsRefresh = this._needsRefreshHover = false;
    this.painter.refresh(); // Avoid trigger zr.refresh in Element#beforeUpdate hook

    this._needsRefresh = this._needsRefreshHover = false; // var end = new Date();
    // var log = document.getElementById('log');
    // if (log) {
    //     log.innerHTML = log.innerHTML + '<br>' + (end - start);
    // }
  },

  /**
   * Mark and repaint the canvas in the next frame of browser
   */
  refresh: function () {
    this._needsRefresh = true;
  },

  /**
   * Perform all refresh
   */
  flush: function () {
    var triggerRendered;

    if (this._needsRefresh) {
      triggerRendered = true;
      this.refreshImmediately();
    }

    if (this._needsRefreshHover) {
      triggerRendered = true;
      this.refreshHoverImmediately();
    }

    triggerRendered && this.trigger('rendered');
  },

  /**
   * Add element to hover layer
   * @param  {module:zrender/Element} el
   * @param {Object} style
   */
  addHover: function (el, style) {
    if (this.painter.addHover) {
      var elMirror = this.painter.addHover(el, style);
      this.refreshHover();
      return elMirror;
    }
  },

  /**
   * Add element from hover layer
   * @param  {module:zrender/Element} el
   */
  removeHover: function (el) {
    if (this.painter.removeHover) {
      this.painter.removeHover(el);
      this.refreshHover();
    }
  },

  /**
   * Clear all hover elements in hover layer
   * @param  {module:zrender/Element} el
   */
  clearHover: function () {
    if (this.painter.clearHover) {
      this.painter.clearHover();
      this.refreshHover();
    }
  },

  /**
   * Refresh hover in next frame
   */
  refreshHover: function () {
    this._needsRefreshHover = true;
  },

  /**
   * Refresh hover immediately
   */
  refreshHoverImmediately: function () {
    this._needsRefreshHover = false;
    this.painter.refreshHover && this.painter.refreshHover();
  },

  /**
   * Resize the canvas.
   * Should be invoked when container size is changed
   * @param {Object} [opts]
   * @param {number|string} [opts.width] Can be 'auto' (the same as null/undefined)
   * @param {number|string} [opts.height] Can be 'auto' (the same as null/undefined)
   */
  resize: function (opts) {
    opts = opts || {};
    this.painter.resize(opts.width, opts.height);
    this.handler.resize();
  },

  /**
   * Stop and clear all animation immediately
   */
  clearAnimation: function () {
    this.animation.clear();
  },

  /**
   * Get container width
   */
  getWidth: function () {
    return this.painter.getWidth();
  },

  /**
   * Get container height
   */
  getHeight: function () {
    return this.painter.getHeight();
  },

  /**
   * Export the canvas as Base64 URL
   * @param {string} type
   * @param {string} [backgroundColor='#fff']
   * @return {string} Base64 URL
   */
  // toDataURL: function(type, backgroundColor) {
  //     return this.painter.getRenderedCanvas({
  //         backgroundColor: backgroundColor
  //     }).toDataURL(type);
  // },

  /**
   * Converting a path to image.
   * It has much better performance of drawing image rather than drawing a vector path.
   * @param {module:zrender/graphic/Path} e
   * @param {number} width
   * @param {number} height
   */
  pathToImage: function (e, dpr) {
    return this.painter.pathToImage(e, dpr);
  },

  /**
   * Set default cursor
   * @param {string} [cursorStyle='default'] 例如 crosshair
   */
  setCursorStyle: function (cursorStyle) {
    this.handler.setCursorStyle(cursorStyle);
  },

  /**
   * Find hovered element
   * @param {number} x
   * @param {number} y
   * @return {Object} {target, topTarget}
   */
  findHover: function (x, y) {
    return this.handler.findHover(x, y);
  },

  /**
   * Bind event
   *
   * @param {string} eventName Event name
   * @param {Function} eventHandler Handler function
   * @param {Object} [context] Context object
   */
  on: function (eventName, eventHandler, context) {
    this.handler.on(eventName, eventHandler, context);
  },

  /**
   * Unbind event
   * @param {string} eventName Event name
   * @param {Function} [eventHandler] Handler function
   */
  off: function (eventName, eventHandler) {
    this.handler.off(eventName, eventHandler);
  },

  /**
   * Trigger event manually
   *
   * @param {string} eventName Event name
   * @param {event=} event Event object
   */
  trigger: function (eventName, event) {
    this.handler.trigger(eventName, event);
  },

  /**
   * Clear all objects and the canvas.
   */
  clear: function () {
    this.storage.delRoot();
    this.painter.clear();
  },

  /**
   * Dispose self.
   */
  dispose: function () {
    this.animation.stop();
    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();
    this.animation = this.storage = this.painter = this.handler = null;
    delInstance(this.id);
  }
};
exports.version = version;
exports.init = init;
exports.dispose = dispose;
exports.getInstance = getInstance;
exports.registerPainter = registerPainter;

/***/ }),

/***/ "a87d":
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__("22d1");

var _vector = __webpack_require__("401b");

var applyTransform = _vector.applyTransform;

var BoundingRect = __webpack_require__("9850");

var colorTool = __webpack_require__("41ef");

var textContain = __webpack_require__("e86a");

var textHelper = __webpack_require__("a73c");

var RectText = __webpack_require__("9e2e");

var Displayable = __webpack_require__("19eb");

var ZImage = __webpack_require__("0da8");

var Text = __webpack_require__("76a5");

var Path = __webpack_require__("cbe5");

var PathProxy = __webpack_require__("20c8");

var Gradient = __webpack_require__("42e5");

var vmlCore = __webpack_require__("d3a4");

// http://www.w3.org/TR/NOTE-VML
// TODO Use proxy like svg instead of overwrite brush methods
var CMD = PathProxy.CMD;
var round = Math.round;
var sqrt = Math.sqrt;
var abs = Math.abs;
var cos = Math.cos;
var sin = Math.sin;
var mathMax = Math.max;

if (!env.canvasSupported) {
  var comma = ',';
  var imageTransformPrefix = 'progid:DXImageTransform.Microsoft';
  var Z = 21600;
  var Z2 = Z / 2;
  var ZLEVEL_BASE = 100000;
  var Z_BASE = 1000;

  var initRootElStyle = function (el) {
    el.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;';
    el.coordsize = Z + ',' + Z;
    el.coordorigin = '0,0';
  };

  var encodeHtmlAttribute = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  };

  var rgb2Str = function (r, g, b) {
    return 'rgb(' + [r, g, b].join(',') + ')';
  };

  var append = function (parent, child) {
    if (child && parent && child.parentNode !== parent) {
      parent.appendChild(child);
    }
  };

  var remove = function (parent, child) {
    if (child && parent && child.parentNode === parent) {
      parent.removeChild(child);
    }
  };

  var getZIndex = function (zlevel, z, z2) {
    // z 的取值范围为 [0, 1000]
    return (parseFloat(zlevel) || 0) * ZLEVEL_BASE + (parseFloat(z) || 0) * Z_BASE + z2;
  };

  var parsePercent = textHelper.parsePercent;
  /***************************************************
   * PATH
   **************************************************/

  var setColorAndOpacity = function (el, color, opacity) {
    var colorArr = colorTool.parse(color);
    opacity = +opacity;

    if (isNaN(opacity)) {
      opacity = 1;
    }

    if (colorArr) {
      el.color = rgb2Str(colorArr[0], colorArr[1], colorArr[2]);
      el.opacity = opacity * colorArr[3];
    }
  };

  var getColorAndAlpha = function (color) {
    var colorArr = colorTool.parse(color);
    return [rgb2Str(colorArr[0], colorArr[1], colorArr[2]), colorArr[3]];
  };

  var updateFillNode = function (el, style, zrEl) {
    // TODO pattern
    var fill = style.fill;

    if (fill != null) {
      // Modified from excanvas
      if (fill instanceof Gradient) {
        var gradientType;
        var angle = 0;
        var focus = [0, 0]; // additional offset

        var shift = 0; // scale factor for offset

        var expansion = 1;
        var rect = zrEl.getBoundingRect();
        var rectWidth = rect.width;
        var rectHeight = rect.height;

        if (fill.type === 'linear') {
          gradientType = 'gradient';
          var transform = zrEl.transform;
          var p0 = [fill.x * rectWidth, fill.y * rectHeight];
          var p1 = [fill.x2 * rectWidth, fill.y2 * rectHeight];

          if (transform) {
            applyTransform(p0, p0, transform);
            applyTransform(p1, p1, transform);
          }

          var dx = p1[0] - p0[0];
          var dy = p1[1] - p0[1];
          angle = Math.atan2(dx, dy) * 180 / Math.PI; // The angle should be a non-negative number.

          if (angle < 0) {
            angle += 360;
          } // Very small angles produce an unexpected result because they are
          // converted to a scientific notation string.


          if (angle < 1e-6) {
            angle = 0;
          }
        } else {
          gradientType = 'gradientradial';
          var p0 = [fill.x * rectWidth, fill.y * rectHeight];
          var transform = zrEl.transform;
          var scale = zrEl.scale;
          var width = rectWidth;
          var height = rectHeight;
          focus = [// Percent in bounding rect
          (p0[0] - rect.x) / width, (p0[1] - rect.y) / height];

          if (transform) {
            applyTransform(p0, p0, transform);
          }

          width /= scale[0] * Z;
          height /= scale[1] * Z;
          var dimension = mathMax(width, height);
          shift = 2 * 0 / dimension;
          expansion = 2 * fill.r / dimension - shift;
        } // We need to sort the color stops in ascending order by offset,
        // otherwise IE won't interpret it correctly.


        var stops = fill.colorStops.slice();
        stops.sort(function (cs1, cs2) {
          return cs1.offset - cs2.offset;
        });
        var length = stops.length; // Color and alpha list of first and last stop

        var colorAndAlphaList = [];
        var colors = [];

        for (var i = 0; i < length; i++) {
          var stop = stops[i];
          var colorAndAlpha = getColorAndAlpha(stop.color);
          colors.push(stop.offset * expansion + shift + ' ' + colorAndAlpha[0]);

          if (i === 0 || i === length - 1) {
            colorAndAlphaList.push(colorAndAlpha);
          }
        }

        if (length >= 2) {
          var color1 = colorAndAlphaList[0][0];
          var color2 = colorAndAlphaList[1][0];
          var opacity1 = colorAndAlphaList[0][1] * style.opacity;
          var opacity2 = colorAndAlphaList[1][1] * style.opacity;
          el.type = gradientType;
          el.method = 'none';
          el.focus = '100%';
          el.angle = angle;
          el.color = color1;
          el.color2 = color2;
          el.colors = colors.join(','); // When colors attribute is used, the meanings of opacity and o:opacity2
          // are reversed.

          el.opacity = opacity2; // FIXME g_o_:opacity ?

          el.opacity2 = opacity1;
        }

        if (gradientType === 'radial') {
          el.focusposition = focus.join(',');
        }
      } else {
        // FIXME Change from Gradient fill to color fill
        setColorAndOpacity(el, fill, style.opacity);
      }
    }
  };

  var updateStrokeNode = function (el, style) {
    // if (style.lineJoin != null) {
    //     el.joinstyle = style.lineJoin;
    // }
    // if (style.miterLimit != null) {
    //     el.miterlimit = style.miterLimit * Z;
    // }
    // if (style.lineCap != null) {
    //     el.endcap = style.lineCap;
    // }
    if (style.lineDash) {
      el.dashstyle = style.lineDash.join(' ');
    }

    if (style.stroke != null && !(style.stroke instanceof Gradient)) {
      setColorAndOpacity(el, style.stroke, style.opacity);
    }
  };

  var updateFillAndStroke = function (vmlEl, type, style, zrEl) {
    var isFill = type === 'fill';
    var el = vmlEl.getElementsByTagName(type)[0]; // Stroke must have lineWidth

    if (style[type] != null && style[type] !== 'none' && (isFill || !isFill && style.lineWidth)) {
      vmlEl[isFill ? 'filled' : 'stroked'] = 'true'; // FIXME Remove before updating, or set `colors` will throw error

      if (style[type] instanceof Gradient) {
        remove(vmlEl, el);
      }

      if (!el) {
        el = vmlCore.createNode(type);
      }

      isFill ? updateFillNode(el, style, zrEl) : updateStrokeNode(el, style);
      append(vmlEl, el);
    } else {
      vmlEl[isFill ? 'filled' : 'stroked'] = 'false';
      remove(vmlEl, el);
    }
  };

  var points = [[], [], []];

  var pathDataToString = function (path, m) {
    var M = CMD.M;
    var C = CMD.C;
    var L = CMD.L;
    var A = CMD.A;
    var Q = CMD.Q;
    var str = [];
    var nPoint;
    var cmdStr;
    var cmd;
    var i;
    var xi;
    var yi;
    var data = path.data;
    var dataLength = path.len();

    for (i = 0; i < dataLength;) {
      cmd = data[i++];
      cmdStr = '';
      nPoint = 0;

      switch (cmd) {
        case M:
          cmdStr = ' m ';
          nPoint = 1;
          xi = data[i++];
          yi = data[i++];
          points[0][0] = xi;
          points[0][1] = yi;
          break;

        case L:
          cmdStr = ' l ';
          nPoint = 1;
          xi = data[i++];
          yi = data[i++];
          points[0][0] = xi;
          points[0][1] = yi;
          break;

        case Q:
        case C:
          cmdStr = ' c ';
          nPoint = 3;
          var x1 = data[i++];
          var y1 = data[i++];
          var x2 = data[i++];
          var y2 = data[i++];
          var x3;
          var y3;

          if (cmd === Q) {
            // Convert quadratic to cubic using degree elevation
            x3 = x2;
            y3 = y2;
            x2 = (x2 + 2 * x1) / 3;
            y2 = (y2 + 2 * y1) / 3;
            x1 = (xi + 2 * x1) / 3;
            y1 = (yi + 2 * y1) / 3;
          } else {
            x3 = data[i++];
            y3 = data[i++];
          }

          points[0][0] = x1;
          points[0][1] = y1;
          points[1][0] = x2;
          points[1][1] = y2;
          points[2][0] = x3;
          points[2][1] = y3;
          xi = x3;
          yi = y3;
          break;

        case A:
          var x = 0;
          var y = 0;
          var sx = 1;
          var sy = 1;
          var angle = 0;

          if (m) {
            // Extract SRT from matrix
            x = m[4];
            y = m[5];
            sx = sqrt(m[0] * m[0] + m[1] * m[1]);
            sy = sqrt(m[2] * m[2] + m[3] * m[3]);
            angle = Math.atan2(-m[1] / sy, m[0] / sx);
          }

          var cx = data[i++];
          var cy = data[i++];
          var rx = data[i++];
          var ry = data[i++];
          var startAngle = data[i++] + angle;
          var endAngle = data[i++] + startAngle + angle; // FIXME
          // var psi = data[i++];

          i++;
          var clockwise = data[i++];
          var x0 = cx + cos(startAngle) * rx;
          var y0 = cy + sin(startAngle) * ry;
          var x1 = cx + cos(endAngle) * rx;
          var y1 = cy + sin(endAngle) * ry;
          var type = clockwise ? ' wa ' : ' at ';

          if (Math.abs(x0 - x1) < 1e-4) {
            // IE won't render arches drawn counter clockwise if x0 == x1.
            if (Math.abs(endAngle - startAngle) > 1e-2) {
              // Offset x0 by 1/80 of a pixel. Use something
              // that can be represented in binary
              if (clockwise) {
                x0 += 270 / Z;
              }
            } else {
              // Avoid case draw full circle
              if (Math.abs(y0 - cy) < 1e-4) {
                if (clockwise && x0 < cx || !clockwise && x0 > cx) {
                  y1 -= 270 / Z;
                } else {
                  y1 += 270 / Z;
                }
              } else if (clockwise && y0 < cy || !clockwise && y0 > cy) {
                x1 += 270 / Z;
              } else {
                x1 -= 270 / Z;
              }
            }
          }

          str.push(type, round(((cx - rx) * sx + x) * Z - Z2), comma, round(((cy - ry) * sy + y) * Z - Z2), comma, round(((cx + rx) * sx + x) * Z - Z2), comma, round(((cy + ry) * sy + y) * Z - Z2), comma, round((x0 * sx + x) * Z - Z2), comma, round((y0 * sy + y) * Z - Z2), comma, round((x1 * sx + x) * Z - Z2), comma, round((y1 * sy + y) * Z - Z2));
          xi = x1;
          yi = y1;
          break;

        case CMD.R:
          var p0 = points[0];
          var p1 = points[1]; // x0, y0

          p0[0] = data[i++];
          p0[1] = data[i++]; // x1, y1

          p1[0] = p0[0] + data[i++];
          p1[1] = p0[1] + data[i++];

          if (m) {
            applyTransform(p0, p0, m);
            applyTransform(p1, p1, m);
          }

          p0[0] = round(p0[0] * Z - Z2);
          p1[0] = round(p1[0] * Z - Z2);
          p0[1] = round(p0[1] * Z - Z2);
          p1[1] = round(p1[1] * Z - Z2);
          str.push( // x0, y0
          ' m ', p0[0], comma, p0[1], // x1, y0
          ' l ', p1[0], comma, p0[1], // x1, y1
          ' l ', p1[0], comma, p1[1], // x0, y1
          ' l ', p0[0], comma, p1[1]);
          break;

        case CMD.Z:
          // FIXME Update xi, yi
          str.push(' x ');
      }

      if (nPoint > 0) {
        str.push(cmdStr);

        for (var k = 0; k < nPoint; k++) {
          var p = points[k];
          m && applyTransform(p, p, m); // 不 round 会非常慢

          str.push(round(p[0] * Z - Z2), comma, round(p[1] * Z - Z2), k < nPoint - 1 ? comma : '');
        }
      }
    }

    return str.join('');
  }; // Rewrite the original path method


  Path.prototype.brushVML = function (vmlRoot) {
    var style = this.style;
    var vmlEl = this._vmlEl;

    if (!vmlEl) {
      vmlEl = vmlCore.createNode('shape');
      initRootElStyle(vmlEl);
      this._vmlEl = vmlEl;
    }

    updateFillAndStroke(vmlEl, 'fill', style, this);
    updateFillAndStroke(vmlEl, 'stroke', style, this);
    var m = this.transform;
    var needTransform = m != null;
    var strokeEl = vmlEl.getElementsByTagName('stroke')[0];

    if (strokeEl) {
      var lineWidth = style.lineWidth; // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.

      if (needTransform && !style.strokeNoScale) {
        var det = m[0] * m[3] - m[1] * m[2];
        lineWidth *= sqrt(abs(det));
      }

      strokeEl.weight = lineWidth + 'px';
    }

    var path = this.path || (this.path = new PathProxy());

    if (this.__dirtyPath) {
      path.beginPath();
      path.subPixelOptimize = false;
      this.buildPath(path, this.shape);
      path.toStatic();
      this.__dirtyPath = false;
    }

    vmlEl.path = pathDataToString(path, this.transform);
    vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Append to root

    append(vmlRoot, vmlEl); // Text

    if (style.text != null) {
      this.drawRectText(vmlRoot, this.getBoundingRect());
    } else {
      this.removeRectText(vmlRoot);
    }
  };

  Path.prototype.onRemove = function (vmlRoot) {
    remove(vmlRoot, this._vmlEl);
    this.removeRectText(vmlRoot);
  };

  Path.prototype.onAdd = function (vmlRoot) {
    append(vmlRoot, this._vmlEl);
    this.appendRectText(vmlRoot);
  };
  /***************************************************
   * IMAGE
   **************************************************/


  var isImage = function (img) {
    // FIXME img instanceof Image 如果 img 是一个字符串的时候，IE8 下会报错
    return typeof img === 'object' && img.tagName && img.tagName.toUpperCase() === 'IMG'; // return img instanceof Image;
  }; // Rewrite the original path method


  ZImage.prototype.brushVML = function (vmlRoot) {
    var style = this.style;
    var image = style.image; // Image original width, height

    var ow;
    var oh;

    if (isImage(image)) {
      var src = image.src;

      if (src === this._imageSrc) {
        ow = this._imageWidth;
        oh = this._imageHeight;
      } else {
        var imageRuntimeStyle = image.runtimeStyle;
        var oldRuntimeWidth = imageRuntimeStyle.width;
        var oldRuntimeHeight = imageRuntimeStyle.height;
        imageRuntimeStyle.width = 'auto';
        imageRuntimeStyle.height = 'auto'; // get the original size

        ow = image.width;
        oh = image.height; // and remove overides

        imageRuntimeStyle.width = oldRuntimeWidth;
        imageRuntimeStyle.height = oldRuntimeHeight; // Caching image original width, height and src

        this._imageSrc = src;
        this._imageWidth = ow;
        this._imageHeight = oh;
      }

      image = src;
    } else {
      if (image === this._imageSrc) {
        ow = this._imageWidth;
        oh = this._imageHeight;
      }
    }

    if (!image) {
      return;
    }

    var x = style.x || 0;
    var y = style.y || 0;
    var dw = style.width;
    var dh = style.height;
    var sw = style.sWidth;
    var sh = style.sHeight;
    var sx = style.sx || 0;
    var sy = style.sy || 0;
    var hasCrop = sw && sh;
    var vmlEl = this._vmlEl;

    if (!vmlEl) {
      // FIXME 使用 group 在 left, top 都不是 0 的时候就无法显示了。
      // vmlEl = vmlCore.createNode('group');
      vmlEl = vmlCore.doc.createElement('div');
      initRootElStyle(vmlEl);
      this._vmlEl = vmlEl;
    }

    var vmlElStyle = vmlEl.style;
    var hasRotation = false;
    var m;
    var scaleX = 1;
    var scaleY = 1;

    if (this.transform) {
      m = this.transform;
      scaleX = sqrt(m[0] * m[0] + m[1] * m[1]);
      scaleY = sqrt(m[2] * m[2] + m[3] * m[3]);
      hasRotation = m[1] || m[2];
    }

    if (hasRotation) {
      // If filters are necessary (rotation exists), create them
      // filters are bog-slow, so only create them if abbsolutely necessary
      // The following check doesn't account for skews (which don't exist
      // in the canvas spec (yet) anyway.
      // From excanvas
      var p0 = [x, y];
      var p1 = [x + dw, y];
      var p2 = [x, y + dh];
      var p3 = [x + dw, y + dh];
      applyTransform(p0, p0, m);
      applyTransform(p1, p1, m);
      applyTransform(p2, p2, m);
      applyTransform(p3, p3, m);
      var maxX = mathMax(p0[0], p1[0], p2[0], p3[0]);
      var maxY = mathMax(p0[1], p1[1], p2[1], p3[1]);
      var transformFilter = [];
      transformFilter.push('M11=', m[0] / scaleX, comma, 'M12=', m[2] / scaleY, comma, 'M21=', m[1] / scaleX, comma, 'M22=', m[3] / scaleY, comma, 'Dx=', round(x * scaleX + m[4]), comma, 'Dy=', round(y * scaleY + m[5]));
      vmlElStyle.padding = '0 ' + round(maxX) + 'px ' + round(maxY) + 'px 0'; // FIXME DXImageTransform 在 IE11 的兼容模式下不起作用

      vmlElStyle.filter = imageTransformPrefix + '.Matrix(' + transformFilter.join('') + ', SizingMethod=clip)';
    } else {
      if (m) {
        x = x * scaleX + m[4];
        y = y * scaleY + m[5];
      }

      vmlElStyle.filter = '';
      vmlElStyle.left = round(x) + 'px';
      vmlElStyle.top = round(y) + 'px';
    }

    var imageEl = this._imageEl;
    var cropEl = this._cropEl;

    if (!imageEl) {
      imageEl = vmlCore.doc.createElement('div');
      this._imageEl = imageEl;
    }

    var imageELStyle = imageEl.style;

    if (hasCrop) {
      // Needs know image original width and height
      if (!(ow && oh)) {
        var tmpImage = new Image();
        var self = this;

        tmpImage.onload = function () {
          tmpImage.onload = null;
          ow = tmpImage.width;
          oh = tmpImage.height; // Adjust image width and height to fit the ratio destinationSize / sourceSize

          imageELStyle.width = round(scaleX * ow * dw / sw) + 'px';
          imageELStyle.height = round(scaleY * oh * dh / sh) + 'px'; // Caching image original width, height and src

          self._imageWidth = ow;
          self._imageHeight = oh;
          self._imageSrc = image;
        };

        tmpImage.src = image;
      } else {
        imageELStyle.width = round(scaleX * ow * dw / sw) + 'px';
        imageELStyle.height = round(scaleY * oh * dh / sh) + 'px';
      }

      if (!cropEl) {
        cropEl = vmlCore.doc.createElement('div');
        cropEl.style.overflow = 'hidden';
        this._cropEl = cropEl;
      }

      var cropElStyle = cropEl.style;
      cropElStyle.width = round((dw + sx * dw / sw) * scaleX);
      cropElStyle.height = round((dh + sy * dh / sh) * scaleY);
      cropElStyle.filter = imageTransformPrefix + '.Matrix(Dx=' + -sx * dw / sw * scaleX + ',Dy=' + -sy * dh / sh * scaleY + ')';

      if (!cropEl.parentNode) {
        vmlEl.appendChild(cropEl);
      }

      if (imageEl.parentNode !== cropEl) {
        cropEl.appendChild(imageEl);
      }
    } else {
      imageELStyle.width = round(scaleX * dw) + 'px';
      imageELStyle.height = round(scaleY * dh) + 'px';
      vmlEl.appendChild(imageEl);

      if (cropEl && cropEl.parentNode) {
        vmlEl.removeChild(cropEl);
        this._cropEl = null;
      }
    }

    var filterStr = '';
    var alpha = style.opacity;

    if (alpha < 1) {
      filterStr += '.Alpha(opacity=' + round(alpha * 100) + ') ';
    }

    filterStr += imageTransformPrefix + '.AlphaImageLoader(src=' + image + ', SizingMethod=scale)';
    imageELStyle.filter = filterStr;
    vmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Append to root

    append(vmlRoot, vmlEl); // Text

    if (style.text != null) {
      this.drawRectText(vmlRoot, this.getBoundingRect());
    }
  };

  ZImage.prototype.onRemove = function (vmlRoot) {
    remove(vmlRoot, this._vmlEl);
    this._vmlEl = null;
    this._cropEl = null;
    this._imageEl = null;
    this.removeRectText(vmlRoot);
  };

  ZImage.prototype.onAdd = function (vmlRoot) {
    append(vmlRoot, this._vmlEl);
    this.appendRectText(vmlRoot);
  };
  /***************************************************
   * TEXT
   **************************************************/


  var DEFAULT_STYLE_NORMAL = 'normal';
  var fontStyleCache = {};
  var fontStyleCacheCount = 0;
  var MAX_FONT_CACHE_SIZE = 100;
  var fontEl = document.createElement('div');

  var getFontStyle = function (fontString) {
    var fontStyle = fontStyleCache[fontString];

    if (!fontStyle) {
      // Clear cache
      if (fontStyleCacheCount > MAX_FONT_CACHE_SIZE) {
        fontStyleCacheCount = 0;
        fontStyleCache = {};
      }

      var style = fontEl.style;
      var fontFamily;

      try {
        style.font = fontString;
        fontFamily = style.fontFamily.split(',')[0];
      } catch (e) {}

      fontStyle = {
        style: style.fontStyle || DEFAULT_STYLE_NORMAL,
        variant: style.fontVariant || DEFAULT_STYLE_NORMAL,
        weight: style.fontWeight || DEFAULT_STYLE_NORMAL,
        size: parseFloat(style.fontSize || 12) | 0,
        family: fontFamily || 'Microsoft YaHei'
      };
      fontStyleCache[fontString] = fontStyle;
      fontStyleCacheCount++;
    }

    return fontStyle;
  };

  var textMeasureEl; // Overwrite measure text method

  textContain.$override('measureText', function (text, textFont) {
    var doc = vmlCore.doc;

    if (!textMeasureEl) {
      textMeasureEl = doc.createElement('div');
      textMeasureEl.style.cssText = 'position:absolute;top:-20000px;left:0;' + 'padding:0;margin:0;border:none;white-space:pre;';
      vmlCore.doc.body.appendChild(textMeasureEl);
    }

    try {
      textMeasureEl.style.font = textFont;
    } catch (ex) {// Ignore failures to set to invalid font.
    }

    textMeasureEl.innerHTML = ''; // Don't use innerHTML or innerText because they allow markup/whitespace.

    textMeasureEl.appendChild(doc.createTextNode(text));
    return {
      width: textMeasureEl.offsetWidth
    };
  });
  var tmpRect = new BoundingRect();

  var drawRectText = function (vmlRoot, rect, textRect, fromTextEl) {
    var style = this.style; // Optimize, avoid normalize every time.

    this.__dirty && textHelper.normalizeTextStyle(style, true);
    var text = style.text; // Convert to string

    text != null && (text += '');

    if (!text) {
      return;
    } // Convert rich text to plain text. Rich text is not supported in
    // IE8-, but tags in rich text template will be removed.


    if (style.rich) {
      var contentBlock = textContain.parseRichText(text, style);
      text = [];

      for (var i = 0; i < contentBlock.lines.length; i++) {
        var tokens = contentBlock.lines[i].tokens;
        var textLine = [];

        for (var j = 0; j < tokens.length; j++) {
          textLine.push(tokens[j].text);
        }

        text.push(textLine.join(''));
      }

      text = text.join('\n');
    }

    var x;
    var y;
    var align = style.textAlign;
    var verticalAlign = style.textVerticalAlign;
    var fontStyle = getFontStyle(style.font); // FIXME encodeHtmlAttribute ?

    var font = fontStyle.style + ' ' + fontStyle.variant + ' ' + fontStyle.weight + ' ' + fontStyle.size + 'px "' + fontStyle.family + '"';
    textRect = textRect || textContain.getBoundingRect(text, font, align, verticalAlign, style.textPadding, style.textLineHeight); // Transform rect to view space

    var m = this.transform; // Ignore transform for text in other element

    if (m && !fromTextEl) {
      tmpRect.copy(rect);
      tmpRect.applyTransform(m);
      rect = tmpRect;
    }

    if (!fromTextEl) {
      var textPosition = style.textPosition; // Text position represented by coord

      if (textPosition instanceof Array) {
        x = rect.x + parsePercent(textPosition[0], rect.width);
        y = rect.y + parsePercent(textPosition[1], rect.height);
        align = align || 'left';
      } else {
        var res = this.calculateTextPosition ? this.calculateTextPosition({}, style, rect) : textContain.calculateTextPosition({}, style, rect);
        x = res.x;
        y = res.y; // Default align and baseline when has textPosition

        align = align || res.textAlign;
        verticalAlign = verticalAlign || res.textVerticalAlign;
      }
    } else {
      x = rect.x;
      y = rect.y;
    }

    x = textContain.adjustTextX(x, textRect.width, align);
    y = textContain.adjustTextY(y, textRect.height, verticalAlign); // Force baseline 'middle'

    y += textRect.height / 2; // var fontSize = fontStyle.size;
    // 1.75 is an arbitrary number, as there is no info about the text baseline
    // switch (baseline) {
    // case 'hanging':
    // case 'top':
    //     y += fontSize / 1.75;
    //     break;
    //     case 'middle':
    //         break;
    //     default:
    //     // case null:
    //     // case 'alphabetic':
    //     // case 'ideographic':
    //     // case 'bottom':
    //         y -= fontSize / 2.25;
    //         break;
    // }
    // switch (align) {
    //     case 'left':
    //         break;
    //     case 'center':
    //         x -= textRect.width / 2;
    //         break;
    //     case 'right':
    //         x -= textRect.width;
    //         break;
    // case 'end':
    // align = elementStyle.direction == 'ltr' ? 'right' : 'left';
    // break;
    // case 'start':
    // align = elementStyle.direction == 'rtl' ? 'right' : 'left';
    // break;
    // default:
    //     align = 'left';
    // }

    var createNode = vmlCore.createNode;
    var textVmlEl = this._textVmlEl;
    var pathEl;
    var textPathEl;
    var skewEl;

    if (!textVmlEl) {
      textVmlEl = createNode('line');
      pathEl = createNode('path');
      textPathEl = createNode('textpath');
      skewEl = createNode('skew'); // FIXME Why here is not cammel case
      // Align 'center' seems wrong

      textPathEl.style['v-text-align'] = 'left';
      initRootElStyle(textVmlEl);
      pathEl.textpathok = true;
      textPathEl.on = true;
      textVmlEl.from = '0 0';
      textVmlEl.to = '1000 0.05';
      append(textVmlEl, skewEl);
      append(textVmlEl, pathEl);
      append(textVmlEl, textPathEl);
      this._textVmlEl = textVmlEl;
    } else {
      // 这里是在前面 appendChild 保证顺序的前提下
      skewEl = textVmlEl.firstChild;
      pathEl = skewEl.nextSibling;
      textPathEl = pathEl.nextSibling;
    }

    var coords = [x, y];
    var textVmlElStyle = textVmlEl.style; // Ignore transform for text in other element

    if (m && fromTextEl) {
      applyTransform(coords, coords, m);
      skewEl.on = true;
      skewEl.matrix = m[0].toFixed(3) + comma + m[2].toFixed(3) + comma + m[1].toFixed(3) + comma + m[3].toFixed(3) + ',0,0'; // Text position

      skewEl.offset = (round(coords[0]) || 0) + ',' + (round(coords[1]) || 0); // Left top point as origin

      skewEl.origin = '0 0';
      textVmlElStyle.left = '0px';
      textVmlElStyle.top = '0px';
    } else {
      skewEl.on = false;
      textVmlElStyle.left = round(x) + 'px';
      textVmlElStyle.top = round(y) + 'px';
    }

    textPathEl.string = encodeHtmlAttribute(text); // TODO

    try {
      textPathEl.style.font = font;
    } // Error font format
    catch (e) {}

    updateFillAndStroke(textVmlEl, 'fill', {
      fill: style.textFill,
      opacity: style.opacity
    }, this);
    updateFillAndStroke(textVmlEl, 'stroke', {
      stroke: style.textStroke,
      opacity: style.opacity,
      lineDash: style.lineDash || null // style.lineDash can be `false`.

    }, this);
    textVmlEl.style.zIndex = getZIndex(this.zlevel, this.z, this.z2); // Attached to root

    append(vmlRoot, textVmlEl);
  };

  var removeRectText = function (vmlRoot) {
    remove(vmlRoot, this._textVmlEl);
    this._textVmlEl = null;
  };

  var appendRectText = function (vmlRoot) {
    append(vmlRoot, this._textVmlEl);
  };

  var list = [RectText, Displayable, ZImage, Path, Text]; // In case Displayable has been mixed in RectText

  for (var i = 0; i < list.length; i++) {
    var proto = list[i].prototype;
    proto.drawRectText = drawRectText;
    proto.removeRectText = removeRectText;
    proto.appendRectText = appendRectText;
  }

  Text.prototype.brushVML = function (vmlRoot) {
    var style = this.style;

    if (style.text != null) {
      this.drawRectText(vmlRoot, {
        x: style.x || 0,
        y: style.y || 0,
        width: 0,
        height: 0
      }, this.getBoundingRect(), true);
    } else {
      this.removeRectText(vmlRoot);
    }
  };

  Text.prototype.onRemove = function (vmlRoot) {
    this.removeRectText(vmlRoot);
  };

  Text.prototype.onAdd = function (vmlRoot) {
    this.appendRectText(vmlRoot);
  };
}

/***/ }),

/***/ "d3a4":
/***/ (function(module, exports, __webpack_require__) {

var env = __webpack_require__("22d1");

var urn = 'urn:schemas-microsoft-com:vml';
var win = typeof window === 'undefined' ? null : window;
var vmlInited = false;
var doc = win && win.document;

function createNode(tagName) {
  return doCreateNode(tagName);
} // Avoid assign to an exported variable, for transforming to cjs.


var doCreateNode;

if (doc && !env.canvasSupported) {
  try {
    !doc.namespaces.zrvml && doc.namespaces.add('zrvml', urn);

    doCreateNode = function (tagName) {
      return doc.createElement('<zrvml:' + tagName + ' class="zrvml">');
    };
  } catch (e) {
    doCreateNode = function (tagName) {
      return doc.createElement('<' + tagName + ' xmlns="' + urn + '" class="zrvml">');
    };
  }
} // From raphael


function initVML() {
  if (vmlInited || !doc) {
    return;
  }

  vmlInited = true;
  var styleSheets = doc.styleSheets;

  if (styleSheets.length < 31) {
    doc.createStyleSheet().addRule('.zrvml', 'behavior:url(#default#VML)');
  } else {
    // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
    styleSheets[0].addRule('.zrvml', 'behavior:url(#default#VML)');
  }
}

exports.doc = doc;
exports.createNode = createNode;
exports.initVML = initVML;

/***/ }),

/***/ "e9f9":
/***/ (function(module, exports, __webpack_require__) {

var logError = __webpack_require__("4942");

var vmlCore = __webpack_require__("d3a4");

var _util = __webpack_require__("6d8b");

var each = _util.each;

/**
 * VML Painter.
 *
 * @module zrender/vml/Painter
 */
function parseInt10(val) {
  return parseInt(val, 10);
}
/**
 * @alias module:zrender/vml/Painter
 */


function VMLPainter(root, storage) {
  vmlCore.initVML();
  this.root = root;
  this.storage = storage;
  var vmlViewport = document.createElement('div');
  var vmlRoot = document.createElement('div');
  vmlViewport.style.cssText = 'display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;';
  vmlRoot.style.cssText = 'position:absolute;left:0;top:0;';
  root.appendChild(vmlViewport);
  this._vmlRoot = vmlRoot;
  this._vmlViewport = vmlViewport;
  this.resize(); // Modify storage

  var oldDelFromStorage = storage.delFromStorage;
  var oldAddToStorage = storage.addToStorage;

  storage.delFromStorage = function (el) {
    oldDelFromStorage.call(storage, el);

    if (el) {
      el.onRemove && el.onRemove(vmlRoot);
    }
  };

  storage.addToStorage = function (el) {
    // Displayable already has a vml node
    el.onAdd && el.onAdd(vmlRoot);
    oldAddToStorage.call(storage, el);
  };

  this._firstPaint = true;
}

VMLPainter.prototype = {
  constructor: VMLPainter,
  getType: function () {
    return 'vml';
  },

  /**
   * @return {HTMLDivElement}
   */
  getViewportRoot: function () {
    return this._vmlViewport;
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

  /**
   * 刷新
   */
  refresh: function () {
    var list = this.storage.getDisplayList(true, true);

    this._paintList(list);
  },
  _paintList: function (list) {
    var vmlRoot = this._vmlRoot;

    for (var i = 0; i < list.length; i++) {
      var el = list[i];

      if (el.invisible || el.ignore) {
        if (!el.__alreadyNotVisible) {
          el.onRemove(vmlRoot);
        } // Set as already invisible


        el.__alreadyNotVisible = true;
      } else {
        if (el.__alreadyNotVisible) {
          el.onAdd(vmlRoot);
        }

        el.__alreadyNotVisible = false;

        if (el.__dirty) {
          el.beforeBrush && el.beforeBrush();
          (el.brushVML || el.brush).call(el, vmlRoot);
          el.afterBrush && el.afterBrush();
        }
      }

      el.__dirty = false;
    }

    if (this._firstPaint) {
      // Detached from document at first time
      // to avoid page refreshing too many times
      // FIXME 如果每次都先 removeChild 可能会导致一些填充和描边的效果改变
      this._vmlViewport.appendChild(vmlRoot);

      this._firstPaint = false;
    }
  },
  resize: function (width, height) {
    var width = width == null ? this._getWidth() : width;
    var height = height == null ? this._getHeight() : height;

    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      var vmlViewportStyle = this._vmlViewport.style;
      vmlViewportStyle.width = width + 'px';
      vmlViewportStyle.height = height + 'px';
    }
  },
  dispose: function () {
    this.root.innerHTML = '';
    this._vmlRoot = this._vmlViewport = this.storage = null;
  },
  getWidth: function () {
    return this._width;
  },
  getHeight: function () {
    return this._height;
  },
  clear: function () {
    if (this._vmlViewport) {
      this.root.removeChild(this._vmlViewport);
    }
  },
  _getWidth: function () {
    var root = this.root;
    var stl = root.currentStyle;
    return (root.clientWidth || parseInt10(stl.width)) - parseInt10(stl.paddingLeft) - parseInt10(stl.paddingRight) | 0;
  },
  _getHeight: function () {
    var root = this.root;
    var stl = root.currentStyle;
    return (root.clientHeight || parseInt10(stl.height)) - parseInt10(stl.paddingTop) - parseInt10(stl.paddingBottom) | 0;
  }
}; // Not supported methods

function createMethodNotSupport(method) {
  return function () {
    logError('In IE8.0 VML mode painter not support method "' + method + '"');
  };
} // Unsupported methods


each(['getLayer', 'insertLayer', 'eachLayer', 'eachBuiltinLayer', 'eachOtherLayer', 'getLayers', 'modLayer', 'delLayer', 'clearLayer', 'toDataURL', 'pathToImage'], function (name) {
  VMLPainter.prototype[name] = createMethodNotSupport(name);
});
var _default = VMLPainter;
module.exports = _default;

/***/ }),

/***/ "f170":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("a87d");

var _zrender = __webpack_require__("697e7");

var registerPainter = _zrender.registerPainter;

var Painter = __webpack_require__("e9f9");

registerPainter('vml', Painter);

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~02fca611.7dbae3c9.js.map