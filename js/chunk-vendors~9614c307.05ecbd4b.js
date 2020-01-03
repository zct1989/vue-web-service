(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~9614c307"],{

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

/***/ "afa0":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("6d8b");

var env = __webpack_require__("22d1");

var Group = __webpack_require__("e1fc");

var timsort = __webpack_require__("04f6");

// Use timsort because in most case elements are partially sorted
// https://jsfiddle.net/pissang/jr4x7mdm/8/
function shapeCompareFunc(a, b) {
  if (a.zlevel === b.zlevel) {
    if (a.z === b.z) {
      // if (a.z2 === b.z2) {
      //     // FIXME Slow has renderidx compare
      //     // http://stackoverflow.com/questions/20883421/sorting-in-javascript-should-every-compare-function-have-a-return-0-statement
      //     // https://github.com/v8/v8/blob/47cce544a31ed5577ffe2963f67acb4144ee0232/src/js/array.js#L1012
      //     return a.__renderidx - b.__renderidx;
      // }
      return a.z2 - b.z2;
    }

    return a.z - b.z;
  }

  return a.zlevel - b.zlevel;
}
/**
 * 内容仓库 (M)
 * @alias module:zrender/Storage
 * @constructor
 */


var Storage = function () {
  // jshint ignore:line
  this._roots = [];
  this._displayList = [];
  this._displayListLen = 0;
};

Storage.prototype = {
  constructor: Storage,

  /**
   * @param  {Function} cb
   *
   */
  traverse: function (cb, context) {
    for (var i = 0; i < this._roots.length; i++) {
      this._roots[i].traverse(cb, context);
    }
  },

  /**
   * 返回所有图形的绘制队列
   * @param {boolean} [update=false] 是否在返回前更新该数组
   * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组, 在 update 为 true 的时候有效
   *
   * 详见{@link module:zrender/graphic/Displayable.prototype.updateDisplayList}
   * @return {Array.<module:zrender/graphic/Displayable>}
   */
  getDisplayList: function (update, includeIgnore) {
    includeIgnore = includeIgnore || false;

    if (update) {
      this.updateDisplayList(includeIgnore);
    }

    return this._displayList;
  },

  /**
   * 更新图形的绘制队列。
   * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
   * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
   * @param {boolean} [includeIgnore=false] 是否包含 ignore 的数组
   */
  updateDisplayList: function (includeIgnore) {
    this._displayListLen = 0;
    var roots = this._roots;
    var displayList = this._displayList;

    for (var i = 0, len = roots.length; i < len; i++) {
      this._updateAndAddDisplayable(roots[i], null, includeIgnore);
    }

    displayList.length = this._displayListLen;
    env.canvasSupported && timsort(displayList, shapeCompareFunc);
  },
  _updateAndAddDisplayable: function (el, clipPaths, includeIgnore) {
    if (el.ignore && !includeIgnore) {
      return;
    }

    el.beforeUpdate();

    if (el.__dirty) {
      el.update();
    }

    el.afterUpdate();
    var userSetClipPath = el.clipPath;

    if (userSetClipPath) {
      // FIXME 效率影响
      if (clipPaths) {
        clipPaths = clipPaths.slice();
      } else {
        clipPaths = [];
      }

      var currentClipPath = userSetClipPath;
      var parentClipPath = el; // Recursively add clip path

      while (currentClipPath) {
        // clipPath 的变换是基于使用这个 clipPath 的元素
        currentClipPath.parent = parentClipPath;
        currentClipPath.updateTransform();
        clipPaths.push(currentClipPath);
        parentClipPath = currentClipPath;
        currentClipPath = currentClipPath.clipPath;
      }
    }

    if (el.isGroup) {
      var children = el._children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i]; // Force to mark as dirty if group is dirty
        // FIXME __dirtyPath ?

        if (el.__dirty) {
          child.__dirty = true;
        }

        this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
      } // Mark group clean here


      el.__dirty = false;
    } else {
      el.__clipPaths = clipPaths;
      this._displayList[this._displayListLen++] = el;
    }
  },

  /**
   * 添加图形(Shape)或者组(Group)到根节点
   * @param {module:zrender/Element} el
   */
  addRoot: function (el) {
    if (el.__storage === this) {
      return;
    }

    if (el instanceof Group) {
      el.addChildrenToStorage(this);
    }

    this.addToStorage(el);

    this._roots.push(el);
  },

  /**
   * 删除指定的图形(Shape)或者组(Group)
   * @param {string|Array.<string>} [el] 如果为空清空整个Storage
   */
  delRoot: function (el) {
    if (el == null) {
      // 不指定el清空
      for (var i = 0; i < this._roots.length; i++) {
        var root = this._roots[i];

        if (root instanceof Group) {
          root.delChildrenFromStorage(this);
        }
      }

      this._roots = [];
      this._displayList = [];
      this._displayListLen = 0;
      return;
    }

    if (el instanceof Array) {
      for (var i = 0, l = el.length; i < l; i++) {
        this.delRoot(el[i]);
      }

      return;
    }

    var idx = util.indexOf(this._roots, el);

    if (idx >= 0) {
      this.delFromStorage(el);

      this._roots.splice(idx, 1);

      if (el instanceof Group) {
        el.delChildrenFromStorage(this);
      }
    }
  },
  addToStorage: function (el) {
    if (el) {
      el.__storage = this;
      el.dirty(false);
    }

    return this;
  },
  delFromStorage: function (el) {
    if (el) {
      el.__storage = null;
    }

    return this;
  },

  /**
   * 清空并且释放Storage
   */
  dispose: function () {
    this._renderList = this._roots = null;
  },
  displayableSortFunc: shapeCompareFunc
};
var _default = Storage;
module.exports = _default;

/***/ }),

/***/ "ed21":
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__("2cf4");

var devicePixelRatio = _config.devicePixelRatio;

var util = __webpack_require__("6d8b");

var logError = __webpack_require__("4942");

var BoundingRect = __webpack_require__("9850");

var timsort = __webpack_require__("04f6");

var Layer = __webpack_require__("5e68");

var requestAnimationFrame = __webpack_require__("98b7");

var Image = __webpack_require__("0da8");

var env = __webpack_require__("22d1");

var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 0.001;

function parseInt10(val) {
  return parseInt(val, 10);
}

function isLayerValid(layer) {
  if (!layer) {
    return false;
  }

  if (layer.__builtin__) {
    return true;
  }

  if (typeof layer.resize !== 'function' || typeof layer.refresh !== 'function') {
    return false;
  }

  return true;
}

var tmpRect = new BoundingRect(0, 0, 0, 0);
var viewRect = new BoundingRect(0, 0, 0, 0);

function isDisplayableCulled(el, width, height) {
  tmpRect.copy(el.getBoundingRect());

  if (el.transform) {
    tmpRect.applyTransform(el.transform);
  }

  viewRect.width = width;
  viewRect.height = height;
  return !tmpRect.intersect(viewRect);
}

function isClipPathChanged(clipPaths, prevClipPaths) {
  // displayable.__clipPaths can only be `null`/`undefined` or an non-empty array.
  if (clipPaths === prevClipPaths) {
    return false;
  }

  if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length) {
    return true;
  }

  for (var i = 0; i < clipPaths.length; i++) {
    if (clipPaths[i] !== prevClipPaths[i]) {
      return true;
    }
  }

  return false;
}

function doClip(clipPaths, ctx) {
  for (var i = 0; i < clipPaths.length; i++) {
    var clipPath = clipPaths[i];
    clipPath.setTransform(ctx);
    ctx.beginPath();
    clipPath.buildPath(ctx, clipPath.shape);
    ctx.clip(); // Transform back

    clipPath.restoreTransform(ctx);
  }
}

function createRoot(width, height) {
  var domRoot = document.createElement('div'); // domRoot.onselectstart = returnFalse; // Avoid page selected

  domRoot.style.cssText = ['position:relative', // IOS13 safari probably has a compositing bug (z order of the canvas and the consequent
  // dom does not act as expected) when some of the parent dom has
  // `-webkit-overflow-scrolling: touch;` and the webpage is longer than one screen and
  // the canvas is not at the top part of the page.
  // Check `https://bugs.webkit.org/show_bug.cgi?id=203681` for more details. We remove
  // this `overflow:hidden` to avoid the bug.
  // 'overflow:hidden',
  'width:' + width + 'px', 'height:' + height + 'px', 'padding:0', 'margin:0', 'border-width:0'].join(';') + ';';
  return domRoot;
}
/**
 * @alias module:zrender/Painter
 * @constructor
 * @param {HTMLElement} root 绘图容器
 * @param {module:zrender/Storage} storage
 * @param {Object} opts
 */


var Painter = function (root, storage, opts) {
  this.type = 'canvas'; // In node environment using node-canvas

  var singleCanvas = !root.nodeName // In node ?
  || root.nodeName.toUpperCase() === 'CANVAS';
  this._opts = opts = util.extend({}, opts || {});
  /**
   * @type {number}
   */

  this.dpr = opts.devicePixelRatio || devicePixelRatio;
  /**
   * @type {boolean}
   * @private
   */

  this._singleCanvas = singleCanvas;
  /**
   * 绘图容器
   * @type {HTMLElement}
   */

  this.root = root;
  var rootStyle = root.style;

  if (rootStyle) {
    rootStyle['-webkit-tap-highlight-color'] = 'transparent';
    rootStyle['-webkit-user-select'] = rootStyle['user-select'] = rootStyle['-webkit-touch-callout'] = 'none';
    root.innerHTML = '';
  }
  /**
   * @type {module:zrender/Storage}
   */


  this.storage = storage;
  /**
   * @type {Array.<number>}
   * @private
   */

  var zlevelList = this._zlevelList = [];
  /**
   * @type {Object.<string, module:zrender/Layer>}
   * @private
   */

  var layers = this._layers = {};
  /**
   * @type {Object.<string, Object>}
   * @private
   */

  this._layerConfig = {};
  /**
   * zrender will do compositing when root is a canvas and have multiple zlevels.
   */

  this._needsManuallyCompositing = false;

  if (!singleCanvas) {
    this._width = this._getSize(0);
    this._height = this._getSize(1);
    var domRoot = this._domRoot = createRoot(this._width, this._height);
    root.appendChild(domRoot);
  } else {
    var width = root.width;
    var height = root.height;

    if (opts.width != null) {
      width = opts.width;
    }

    if (opts.height != null) {
      height = opts.height;
    }

    this.dpr = opts.devicePixelRatio || 1; // Use canvas width and height directly

    root.width = width * this.dpr;
    root.height = height * this.dpr;
    this._width = width;
    this._height = height; // Create layer if only one given canvas
    // Device can be specified to create a high dpi image.

    var mainLayer = new Layer(root, this, this.dpr);
    mainLayer.__builtin__ = true;
    mainLayer.initContext(); // FIXME Use canvas width and height
    // mainLayer.resize(width, height);

    layers[CANVAS_ZLEVEL] = mainLayer;
    mainLayer.zlevel = CANVAS_ZLEVEL; // Not use common zlevel.

    zlevelList.push(CANVAS_ZLEVEL);
    this._domRoot = root;
  }
  /**
   * @type {module:zrender/Layer}
   * @private
   */


  this._hoverlayer = null;
  this._hoverElements = [];
};

Painter.prototype = {
  constructor: Painter,
  getType: function () {
    return 'canvas';
  },

  /**
   * If painter use a single canvas
   * @return {boolean}
   */
  isSingleCanvas: function () {
    return this._singleCanvas;
  },

  /**
   * @return {HTMLDivElement}
   */
  getViewportRoot: function () {
    return this._domRoot;
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
   * @param {boolean} [paintAll=false] 强制绘制所有displayable
   */
  refresh: function (paintAll) {
    var list = this.storage.getDisplayList(true);
    var zlevelList = this._zlevelList;
    this._redrawId = Math.random();

    this._paintList(list, paintAll, this._redrawId); // Paint custum layers


    for (var i = 0; i < zlevelList.length; i++) {
      var z = zlevelList[i];
      var layer = this._layers[z];

      if (!layer.__builtin__ && layer.refresh) {
        var clearColor = i === 0 ? this._backgroundColor : null;
        layer.refresh(clearColor);
      }
    }

    this.refreshHover();
    return this;
  },
  addHover: function (el, hoverStyle) {
    if (el.__hoverMir) {
      return;
    }

    var elMirror = new el.constructor({
      style: el.style,
      shape: el.shape,
      z: el.z,
      z2: el.z2,
      silent: el.silent
    });
    elMirror.__from = el;
    el.__hoverMir = elMirror;
    hoverStyle && elMirror.setStyle(hoverStyle);

    this._hoverElements.push(elMirror);

    return elMirror;
  },
  removeHover: function (el) {
    var elMirror = el.__hoverMir;
    var hoverElements = this._hoverElements;
    var idx = util.indexOf(hoverElements, elMirror);

    if (idx >= 0) {
      hoverElements.splice(idx, 1);
    }

    el.__hoverMir = null;
  },
  clearHover: function (el) {
    var hoverElements = this._hoverElements;

    for (var i = 0; i < hoverElements.length; i++) {
      var from = hoverElements[i].__from;

      if (from) {
        from.__hoverMir = null;
      }
    }

    hoverElements.length = 0;
  },
  refreshHover: function () {
    var hoverElements = this._hoverElements;
    var len = hoverElements.length;
    var hoverLayer = this._hoverlayer;
    hoverLayer && hoverLayer.clear();

    if (!len) {
      return;
    }

    timsort(hoverElements, this.storage.displayableSortFunc); // Use a extream large zlevel
    // FIXME?

    if (!hoverLayer) {
      hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
    }

    var scope = {};
    hoverLayer.ctx.save();

    for (var i = 0; i < len;) {
      var el = hoverElements[i];
      var originalEl = el.__from; // Original el is removed
      // PENDING

      if (!(originalEl && originalEl.__zr)) {
        hoverElements.splice(i, 1);
        originalEl.__hoverMir = null;
        len--;
        continue;
      }

      i++; // Use transform
      // FIXME style and shape ?

      if (!originalEl.invisible) {
        el.transform = originalEl.transform;
        el.invTransform = originalEl.invTransform;
        el.__clipPaths = originalEl.__clipPaths; // el.

        this._doPaintEl(el, hoverLayer, true, scope);
      }
    }

    hoverLayer.ctx.restore();
  },
  getHoverLayer: function () {
    return this.getLayer(HOVER_LAYER_ZLEVEL);
  },
  _paintList: function (list, paintAll, redrawId) {
    if (this._redrawId !== redrawId) {
      return;
    }

    paintAll = paintAll || false;

    this._updateLayerStatus(list);

    var finished = this._doPaintList(list, paintAll);

    if (this._needsManuallyCompositing) {
      this._compositeManually();
    }

    if (!finished) {
      var self = this;
      requestAnimationFrame(function () {
        self._paintList(list, paintAll, redrawId);
      });
    }
  },
  _compositeManually: function () {
    var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
    var width = this._domRoot.width;
    var height = this._domRoot.height;
    ctx.clearRect(0, 0, width, height); // PENDING, If only builtin layer?

    this.eachBuiltinLayer(function (layer) {
      if (layer.virtual) {
        ctx.drawImage(layer.dom, 0, 0, width, height);
      }
    });
  },
  _doPaintList: function (list, paintAll) {
    var layerList = [];

    for (var zi = 0; zi < this._zlevelList.length; zi++) {
      var zlevel = this._zlevelList[zi];
      var layer = this._layers[zlevel];

      if (layer.__builtin__ && layer !== this._hoverlayer && (layer.__dirty || paintAll)) {
        layerList.push(layer);
      }
    }

    var finished = true;

    for (var k = 0; k < layerList.length; k++) {
      var layer = layerList[k];
      var ctx = layer.ctx;
      var scope = {};
      ctx.save();
      var start = paintAll ? layer.__startIndex : layer.__drawIndex;
      var useTimer = !paintAll && layer.incremental && Date.now;
      var startTime = useTimer && Date.now();
      var clearColor = layer.zlevel === this._zlevelList[0] ? this._backgroundColor : null; // All elements in this layer are cleared.

      if (layer.__startIndex === layer.__endIndex) {
        layer.clear(false, clearColor);
      } else if (start === layer.__startIndex) {
        var firstEl = list[start];

        if (!firstEl.incremental || !firstEl.notClear || paintAll) {
          layer.clear(false, clearColor);
        }
      }

      if (start === -1) {
        console.error('For some unknown reason. drawIndex is -1');
        start = layer.__startIndex;
      }

      for (var i = start; i < layer.__endIndex; i++) {
        var el = list[i];

        this._doPaintEl(el, layer, paintAll, scope);

        el.__dirty = el.__dirtyText = false;

        if (useTimer) {
          // Date.now can be executed in 13,025,305 ops/second.
          var dTime = Date.now() - startTime; // Give 15 millisecond to draw.
          // The rest elements will be drawn in the next frame.

          if (dTime > 15) {
            break;
          }
        }
      }

      layer.__drawIndex = i;

      if (layer.__drawIndex < layer.__endIndex) {
        finished = false;
      }

      if (scope.prevElClipPaths) {
        // Needs restore the state. If last drawn element is in the clipping area.
        ctx.restore();
      }

      ctx.restore();
    }

    if (env.wxa) {
      // Flush for weixin application
      util.each(this._layers, function (layer) {
        if (layer && layer.ctx && layer.ctx.draw) {
          layer.ctx.draw();
        }
      });
    }

    return finished;
  },
  _doPaintEl: function (el, currentLayer, forcePaint, scope) {
    var ctx = currentLayer.ctx;
    var m = el.transform;

    if ((currentLayer.__dirty || forcePaint) && // Ignore invisible element
    !el.invisible // Ignore transparent element
    && el.style.opacity !== 0 // Ignore scale 0 element, in some environment like node-canvas
    // Draw a scale 0 element can cause all following draw wrong
    // And setTransform with scale 0 will cause set back transform failed.
    && !(m && !m[0] && !m[3]) // Ignore culled element
    && !(el.culling && isDisplayableCulled(el, this._width, this._height))) {
      var clipPaths = el.__clipPaths;
      var prevElClipPaths = scope.prevElClipPaths; // Optimize when clipping on group with several elements

      if (!prevElClipPaths || isClipPathChanged(clipPaths, prevElClipPaths)) {
        // If has previous clipping state, restore from it
        if (prevElClipPaths) {
          ctx.restore();
          scope.prevElClipPaths = null; // Reset prevEl since context has been restored

          scope.prevEl = null;
        } // New clipping state


        if (clipPaths) {
          ctx.save();
          doClip(clipPaths, ctx);
          scope.prevElClipPaths = clipPaths;
        }
      }

      el.beforeBrush && el.beforeBrush(ctx);
      el.brush(ctx, scope.prevEl || null);
      scope.prevEl = el;
      el.afterBrush && el.afterBrush(ctx);
    }
  },

  /**
   * 获取 zlevel 所在层，如果不存在则会创建一个新的层
   * @param {number} zlevel
   * @param {boolean} virtual Virtual layer will not be inserted into dom.
   * @return {module:zrender/Layer}
   */
  getLayer: function (zlevel, virtual) {
    if (this._singleCanvas && !this._needsManuallyCompositing) {
      zlevel = CANVAS_ZLEVEL;
    }

    var layer = this._layers[zlevel];

    if (!layer) {
      // Create a new layer
      layer = new Layer('zr_' + zlevel, this, this.dpr);
      layer.zlevel = zlevel;
      layer.__builtin__ = true;

      if (this._layerConfig[zlevel]) {
        util.merge(layer, this._layerConfig[zlevel], true);
      }

      if (virtual) {
        layer.virtual = virtual;
      }

      this.insertLayer(zlevel, layer); // Context is created after dom inserted to document
      // Or excanvas will get 0px clientWidth and clientHeight

      layer.initContext();
    }

    return layer;
  },
  insertLayer: function (zlevel, layer) {
    var layersMap = this._layers;
    var zlevelList = this._zlevelList;
    var len = zlevelList.length;
    var prevLayer = null;
    var i = -1;
    var domRoot = this._domRoot;

    if (layersMap[zlevel]) {
      logError('ZLevel ' + zlevel + ' has been used already');
      return;
    } // Check if is a valid layer


    if (!isLayerValid(layer)) {
      logError('Layer of zlevel ' + zlevel + ' is not valid');
      return;
    }

    if (len > 0 && zlevel > zlevelList[0]) {
      for (i = 0; i < len - 1; i++) {
        if (zlevelList[i] < zlevel && zlevelList[i + 1] > zlevel) {
          break;
        }
      }

      prevLayer = layersMap[zlevelList[i]];
    }

    zlevelList.splice(i + 1, 0, zlevel);
    layersMap[zlevel] = layer; // Vitual layer will not directly show on the screen.
    // (It can be a WebGL layer and assigned to a ZImage element)
    // But it still under management of zrender.

    if (!layer.virtual) {
      if (prevLayer) {
        var prevDom = prevLayer.dom;

        if (prevDom.nextSibling) {
          domRoot.insertBefore(layer.dom, prevDom.nextSibling);
        } else {
          domRoot.appendChild(layer.dom);
        }
      } else {
        if (domRoot.firstChild) {
          domRoot.insertBefore(layer.dom, domRoot.firstChild);
        } else {
          domRoot.appendChild(layer.dom);
        }
      }
    }
  },
  // Iterate each layer
  eachLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      cb.call(context, this._layers[z], z);
    }
  },
  // Iterate each buildin layer
  eachBuiltinLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var layer;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      layer = this._layers[z];

      if (layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  },
  // Iterate each other layer except buildin layer
  eachOtherLayer: function (cb, context) {
    var zlevelList = this._zlevelList;
    var layer;
    var z;
    var i;

    for (i = 0; i < zlevelList.length; i++) {
      z = zlevelList[i];
      layer = this._layers[z];

      if (!layer.__builtin__) {
        cb.call(context, layer, z);
      }
    }
  },

  /**
   * 获取所有已创建的层
   * @param {Array.<module:zrender/Layer>} [prevLayer]
   */
  getLayers: function () {
    return this._layers;
  },
  _updateLayerStatus: function (list) {
    this.eachBuiltinLayer(function (layer, z) {
      layer.__dirty = layer.__used = false;
    });

    function updatePrevLayer(idx) {
      if (prevLayer) {
        if (prevLayer.__endIndex !== idx) {
          prevLayer.__dirty = true;
        }

        prevLayer.__endIndex = idx;
      }
    }

    if (this._singleCanvas) {
      for (var i = 1; i < list.length; i++) {
        var el = list[i];

        if (el.zlevel !== list[i - 1].zlevel || el.incremental) {
          this._needsManuallyCompositing = true;
          break;
        }
      }
    }

    var prevLayer = null;
    var incrementalLayerCount = 0;

    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var zlevel = el.zlevel;
      var layer; // PENDING If change one incremental element style ?
      // TODO Where there are non-incremental elements between incremental elements.

      if (el.incremental) {
        layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
        layer.incremental = true;
        incrementalLayerCount = 1;
      } else {
        layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
      }

      if (!layer.__builtin__) {
        logError('ZLevel ' + zlevel + ' has been used by unkown layer ' + layer.id);
      }

      if (layer !== prevLayer) {
        layer.__used = true;

        if (layer.__startIndex !== i) {
          layer.__dirty = true;
        }

        layer.__startIndex = i;

        if (!layer.incremental) {
          layer.__drawIndex = i;
        } else {
          // Mark layer draw index needs to update.
          layer.__drawIndex = -1;
        }

        updatePrevLayer(i);
        prevLayer = layer;
      }

      if (el.__dirty) {
        layer.__dirty = true;

        if (layer.incremental && layer.__drawIndex < 0) {
          // Start draw from the first dirty element.
          layer.__drawIndex = i;
        }
      }
    }

    updatePrevLayer(i);
    this.eachBuiltinLayer(function (layer, z) {
      // Used in last frame but not in this frame. Needs clear
      if (!layer.__used && layer.getElementCount() > 0) {
        layer.__dirty = true;
        layer.__startIndex = layer.__endIndex = layer.__drawIndex = 0;
      } // For incremental layer. In case start index changed and no elements are dirty.


      if (layer.__dirty && layer.__drawIndex < 0) {
        layer.__drawIndex = layer.__startIndex;
      }
    });
  },

  /**
   * 清除hover层外所有内容
   */
  clear: function () {
    this.eachBuiltinLayer(this._clearLayer);
    return this;
  },
  _clearLayer: function (layer) {
    layer.clear();
  },
  setBackgroundColor: function (backgroundColor) {
    this._backgroundColor = backgroundColor;
  },

  /**
   * 修改指定zlevel的绘制参数
   *
   * @param {string} zlevel
   * @param {Object} config 配置对象
   * @param {string} [config.clearColor=0] 每次清空画布的颜色
   * @param {string} [config.motionBlur=false] 是否开启动态模糊
   * @param {number} [config.lastFrameAlpha=0.7]
   *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
   */
  configLayer: function (zlevel, config) {
    if (config) {
      var layerConfig = this._layerConfig;

      if (!layerConfig[zlevel]) {
        layerConfig[zlevel] = config;
      } else {
        util.merge(layerConfig[zlevel], config, true);
      }

      for (var i = 0; i < this._zlevelList.length; i++) {
        var _zlevel = this._zlevelList[i];

        if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
          var layer = this._layers[_zlevel];
          util.merge(layer, layerConfig[zlevel], true);
        }
      }
    }
  },

  /**
   * 删除指定层
   * @param {number} zlevel 层所在的zlevel
   */
  delLayer: function (zlevel) {
    var layers = this._layers;
    var zlevelList = this._zlevelList;
    var layer = layers[zlevel];

    if (!layer) {
      return;
    }

    layer.dom.parentNode.removeChild(layer.dom);
    delete layers[zlevel];
    zlevelList.splice(util.indexOf(zlevelList, zlevel), 1);
  },

  /**
   * 区域大小变化后重绘
   */
  resize: function (width, height) {
    if (!this._domRoot.style) {
      // Maybe in node or worker
      if (width == null || height == null) {
        return;
      }

      this._width = width;
      this._height = height;
      this.getLayer(CANVAS_ZLEVEL).resize(width, height);
    } else {
      var domRoot = this._domRoot; // FIXME Why ?

      domRoot.style.display = 'none'; // Save input w/h

      var opts = this._opts;
      width != null && (opts.width = width);
      height != null && (opts.height = height);
      width = this._getSize(0);
      height = this._getSize(1);
      domRoot.style.display = ''; // 优化没有实际改变的resize

      if (this._width !== width || height !== this._height) {
        domRoot.style.width = width + 'px';
        domRoot.style.height = height + 'px';

        for (var id in this._layers) {
          if (this._layers.hasOwnProperty(id)) {
            this._layers[id].resize(width, height);
          }
        }

        util.each(this._progressiveLayers, function (layer) {
          layer.resize(width, height);
        });
        this.refresh(true);
      }

      this._width = width;
      this._height = height;
    }

    return this;
  },

  /**
   * 清除单独的一个层
   * @param {number} zlevel
   */
  clearLayer: function (zlevel) {
    var layer = this._layers[zlevel];

    if (layer) {
      layer.clear();
    }
  },

  /**
   * 释放
   */
  dispose: function () {
    this.root.innerHTML = '';
    this.root = this.storage = this._domRoot = this._layers = null;
  },

  /**
   * Get canvas which has all thing rendered
   * @param {Object} opts
   * @param {string} [opts.backgroundColor]
   * @param {number} [opts.pixelRatio]
   */
  getRenderedCanvas: function (opts) {
    opts = opts || {};

    if (this._singleCanvas && !this._compositeManually) {
      return this._layers[CANVAS_ZLEVEL].dom;
    }

    var imageLayer = new Layer('image', this, opts.pixelRatio || this.dpr);
    imageLayer.initContext();
    imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);

    if (opts.pixelRatio <= this.dpr) {
      this.refresh();
      var width = imageLayer.dom.width;
      var height = imageLayer.dom.height;
      var ctx = imageLayer.ctx;
      this.eachLayer(function (layer) {
        if (layer.__builtin__) {
          ctx.drawImage(layer.dom, 0, 0, width, height);
        } else if (layer.renderToCanvas) {
          imageLayer.ctx.save();
          layer.renderToCanvas(imageLayer.ctx);
          imageLayer.ctx.restore();
        }
      });
    } else {
      // PENDING, echarts-gl and incremental rendering.
      var scope = {};
      var displayList = this.storage.getDisplayList(true);

      for (var i = 0; i < displayList.length; i++) {
        var el = displayList[i];

        this._doPaintEl(el, imageLayer, true, scope);
      }
    }

    return imageLayer.dom;
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
  pathToImage: function (path, dpr) {
    dpr = dpr || this.dpr;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rect = path.getBoundingRect();
    var style = path.style;
    var shadowBlurSize = style.shadowBlur * dpr;
    var shadowOffsetX = style.shadowOffsetX * dpr;
    var shadowOffsetY = style.shadowOffsetY * dpr;
    var lineWidth = style.hasStroke() ? style.lineWidth : 0;
    var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
    var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
    var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
    var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
    var width = rect.width + leftMargin + rightMargin;
    var height = rect.height + topMargin + bottomMargin;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    ctx.dpr = dpr;
    var pathTransform = {
      position: path.position,
      rotation: path.rotation,
      scale: path.scale
    };
    path.position = [leftMargin - rect.x, topMargin - rect.y];
    path.rotation = 0;
    path.scale = [1, 1];
    path.updateTransform();

    if (path) {
      path.brush(ctx);
    }

    var ImageShape = Image;
    var imgShape = new ImageShape({
      style: {
        x: 0,
        y: 0,
        image: canvas
      }
    });

    if (pathTransform.position != null) {
      imgShape.position = path.position = pathTransform.position;
    }

    if (pathTransform.rotation != null) {
      imgShape.rotation = path.rotation = pathTransform.rotation;
    }

    if (pathTransform.scale != null) {
      imgShape.scale = path.scale = pathTransform.scale;
    }

    return imgShape;
  }
};
var _default = Painter;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~9614c307.05ecbd4b.js.map