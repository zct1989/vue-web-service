(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~10d884ce"],{

/***/ "3f8e":
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__("8727");

var createElement = _core.createElement;

var PathProxy = __webpack_require__("20c8");

var BoundingRect = __webpack_require__("9850");

var matrix = __webpack_require__("1687");

var textContain = __webpack_require__("e86a");

var textHelper = __webpack_require__("a73c");

var Text = __webpack_require__("76a5");

// TODO
// 1. shadow
// 2. Image: sx, sy, sw, sh
var CMD = PathProxy.CMD;
var arrayJoin = Array.prototype.join;
var NONE = 'none';
var mathRound = Math.round;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;
var PI2 = Math.PI * 2;
var degree = 180 / PI;
var EPSILON = 1e-4;

function round4(val) {
  return mathRound(val * 1e4) / 1e4;
}

function isAroundZero(val) {
  return val < EPSILON && val > -EPSILON;
}

function pathHasFill(style, isText) {
  var fill = isText ? style.textFill : style.fill;
  return fill != null && fill !== NONE;
}

function pathHasStroke(style, isText) {
  var stroke = isText ? style.textStroke : style.stroke;
  return stroke != null && stroke !== NONE;
}

function setTransform(svgEl, m) {
  if (m) {
    attr(svgEl, 'transform', 'matrix(' + arrayJoin.call(m, ',') + ')');
  }
}

function attr(el, key, val) {
  if (!val || val.type !== 'linear' && val.type !== 'radial') {
    // Don't set attribute for gradient, since it need new dom nodes
    el.setAttribute(key, val);
  }
}

function attrXLink(el, key, val) {
  el.setAttributeNS('http://www.w3.org/1999/xlink', key, val);
}

function bindStyle(svgEl, style, isText, el) {
  if (pathHasFill(style, isText)) {
    var fill = isText ? style.textFill : style.fill;
    fill = fill === 'transparent' ? NONE : fill;
    attr(svgEl, 'fill', fill);
    attr(svgEl, 'fill-opacity', style.fillOpacity != null ? style.fillOpacity * style.opacity : style.opacity);
  } else {
    attr(svgEl, 'fill', NONE);
  }

  if (pathHasStroke(style, isText)) {
    var stroke = isText ? style.textStroke : style.stroke;
    stroke = stroke === 'transparent' ? NONE : stroke;
    attr(svgEl, 'stroke', stroke);
    var strokeWidth = isText ? style.textStrokeWidth : style.lineWidth;
    var strokeScale = !isText && style.strokeNoScale ? el.getLineScale() : 1;
    attr(svgEl, 'stroke-width', strokeWidth / strokeScale); // stroke then fill for text; fill then stroke for others

    attr(svgEl, 'paint-order', isText ? 'stroke' : 'fill');
    attr(svgEl, 'stroke-opacity', style.strokeOpacity != null ? style.strokeOpacity : style.opacity);
    var lineDash = style.lineDash;

    if (lineDash) {
      attr(svgEl, 'stroke-dasharray', style.lineDash.join(','));
      attr(svgEl, 'stroke-dashoffset', mathRound(style.lineDashOffset || 0));
    } else {
      attr(svgEl, 'stroke-dasharray', '');
    } // PENDING


    style.lineCap && attr(svgEl, 'stroke-linecap', style.lineCap);
    style.lineJoin && attr(svgEl, 'stroke-linejoin', style.lineJoin);
    style.miterLimit && attr(svgEl, 'stroke-miterlimit', style.miterLimit);
  } else {
    attr(svgEl, 'stroke', NONE);
  }
}
/***************************************************
 * PATH
 **************************************************/


function pathDataToString(path) {
  var str = [];
  var data = path.data;
  var dataLength = path.len();

  for (var i = 0; i < dataLength;) {
    var cmd = data[i++];
    var cmdStr = '';
    var nData = 0;

    switch (cmd) {
      case CMD.M:
        cmdStr = 'M';
        nData = 2;
        break;

      case CMD.L:
        cmdStr = 'L';
        nData = 2;
        break;

      case CMD.Q:
        cmdStr = 'Q';
        nData = 4;
        break;

      case CMD.C:
        cmdStr = 'C';
        nData = 6;
        break;

      case CMD.A:
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        var psi = data[i++];
        var clockwise = data[i++];
        var dThetaPositive = Math.abs(dTheta);
        var isCircle = isAroundZero(dThetaPositive - PI2) || (clockwise ? dTheta >= PI2 : -dTheta >= PI2); // Mapping to 0~2PI

        var unifiedTheta = dTheta > 0 ? dTheta % PI2 : dTheta % PI2 + PI2;
        var large = false;

        if (isCircle) {
          large = true;
        } else if (isAroundZero(dThetaPositive)) {
          large = false;
        } else {
          large = unifiedTheta >= PI === !!clockwise;
        }

        var x0 = round4(cx + rx * mathCos(theta));
        var y0 = round4(cy + ry * mathSin(theta)); // It will not draw if start point and end point are exactly the same
        // We need to shift the end point with a small value
        // FIXME A better way to draw circle ?

        if (isCircle) {
          if (clockwise) {
            dTheta = PI2 - 1e-4;
          } else {
            dTheta = -PI2 + 1e-4;
          }

          large = true;

          if (i === 9) {
            // Move to (x0, y0) only when CMD.A comes at the
            // first position of a shape.
            // For instance, when drawing a ring, CMD.A comes
            // after CMD.M, so it's unnecessary to move to
            // (x0, y0).
            str.push('M', x0, y0);
          }
        }

        var x = round4(cx + rx * mathCos(theta + dTheta));
        var y = round4(cy + ry * mathSin(theta + dTheta)); // FIXME Ellipse

        str.push('A', round4(rx), round4(ry), mathRound(psi * degree), +large, +clockwise, x, y);
        break;

      case CMD.Z:
        cmdStr = 'Z';
        break;

      case CMD.R:
        var x = round4(data[i++]);
        var y = round4(data[i++]);
        var w = round4(data[i++]);
        var h = round4(data[i++]);
        str.push('M', x, y, 'L', x + w, y, 'L', x + w, y + h, 'L', x, y + h, 'L', x, y);
        break;
    }

    cmdStr && str.push(cmdStr);

    for (var j = 0; j < nData; j++) {
      // PENDING With scale
      str.push(round4(data[i++]));
    }
  }

  return str.join(' ');
}

var svgPath = {};

svgPath.brush = function (el) {
  var style = el.style;
  var svgEl = el.__svgEl;

  if (!svgEl) {
    svgEl = createElement('path');
    el.__svgEl = svgEl;
  }

  if (!el.path) {
    el.createPathProxy();
  }

  var path = el.path;

  if (el.__dirtyPath) {
    path.beginPath();
    path.subPixelOptimize = false;
    el.buildPath(path, el.shape);
    el.__dirtyPath = false;
    var pathStr = pathDataToString(path);

    if (pathStr.indexOf('NaN') < 0) {
      // Ignore illegal path, which may happen such in out-of-range
      // data in Calendar series.
      attr(svgEl, 'd', pathStr);
    }
  }

  bindStyle(svgEl, style, false, el);
  setTransform(svgEl, el.transform);

  if (style.text != null) {
    svgTextDrawRectText(el, el.getBoundingRect());
  } else {
    removeOldTextNode(el);
  }
};
/***************************************************
 * IMAGE
 **************************************************/


var svgImage = {};

svgImage.brush = function (el) {
  var style = el.style;
  var image = style.image;

  if (image instanceof HTMLImageElement) {
    var src = image.src;
    image = src;
  }

  if (!image) {
    return;
  }

  var x = style.x || 0;
  var y = style.y || 0;
  var dw = style.width;
  var dh = style.height;
  var svgEl = el.__svgEl;

  if (!svgEl) {
    svgEl = createElement('image');
    el.__svgEl = svgEl;
  }

  if (image !== el.__imageSrc) {
    attrXLink(svgEl, 'href', image); // Caching image src

    el.__imageSrc = image;
  }

  attr(svgEl, 'width', dw);
  attr(svgEl, 'height', dh);
  attr(svgEl, 'x', x);
  attr(svgEl, 'y', y);
  setTransform(svgEl, el.transform);

  if (style.text != null) {
    svgTextDrawRectText(el, el.getBoundingRect());
  } else {
    removeOldTextNode(el);
  }
};
/***************************************************
 * TEXT
 **************************************************/


var svgText = {};

var _tmpTextHostRect = new BoundingRect();

var _tmpTextBoxPos = {};
var _tmpTextTransform = [];
var TEXT_ALIGN_TO_ANCHRO = {
  left: 'start',
  right: 'end',
  center: 'middle',
  middle: 'middle'
};
/**
 * @param {module:zrender/Element} el
 * @param {Object|boolean} [hostRect] {x, y, width, height}
 *        If set false, rect text is not used.
 */

var svgTextDrawRectText = function (el, hostRect) {
  var style = el.style;
  var elTransform = el.transform;
  var needTransformTextByHostEl = el instanceof Text || style.transformText;
  el.__dirty && textHelper.normalizeTextStyle(style, true);
  var text = style.text; // Convert to string

  text != null && (text += '');

  if (!textHelper.needDrawText(text, style)) {
    return;
  } // render empty text for svg if no text but need draw text.


  text == null && (text = ''); // Follow the setting in the canvas renderer, if not transform the
  // text, transform the hostRect, by which the text is located.

  if (!needTransformTextByHostEl && elTransform) {
    _tmpTextHostRect.copy(hostRect);

    _tmpTextHostRect.applyTransform(elTransform);

    hostRect = _tmpTextHostRect;
  }

  var textSvgEl = el.__textSvgEl;

  if (!textSvgEl) {
    textSvgEl = createElement('text');
    el.__textSvgEl = textSvgEl;
  } // style.font has been normalized by `normalizeTextStyle`.


  var textSvgElStyle = textSvgEl.style;
  var font = style.font || textContain.DEFAULT_FONT;
  var computedFont = textSvgEl.__computedFont;

  if (font !== textSvgEl.__styleFont) {
    textSvgElStyle.font = textSvgEl.__styleFont = font; // The computedFont might not be the orginal font if it is illegal font.

    computedFont = textSvgEl.__computedFont = textSvgElStyle.font;
  }

  var textPadding = style.textPadding;
  var textLineHeight = style.textLineHeight;
  var contentBlock = el.__textCotentBlock;

  if (!contentBlock || el.__dirtyText) {
    contentBlock = el.__textCotentBlock = textContain.parsePlainText(text, computedFont, textPadding, textLineHeight, style.truncate);
  }

  var outerHeight = contentBlock.outerHeight;
  var lineHeight = contentBlock.lineHeight;
  textHelper.getBoxPosition(_tmpTextBoxPos, el, style, hostRect);
  var baseX = _tmpTextBoxPos.baseX;
  var baseY = _tmpTextBoxPos.baseY;
  var textAlign = _tmpTextBoxPos.textAlign || 'left';
  var textVerticalAlign = _tmpTextBoxPos.textVerticalAlign;
  setTextTransform(textSvgEl, needTransformTextByHostEl, elTransform, style, hostRect, baseX, baseY);
  var boxY = textContain.adjustTextY(baseY, outerHeight, textVerticalAlign);
  var textX = baseX;
  var textY = boxY; // TODO needDrawBg

  if (textPadding) {
    textX = getTextXForPadding(baseX, textAlign, textPadding);
    textY += textPadding[0];
  } // `textBaseline` is set as 'middle'.


  textY += lineHeight / 2;
  bindStyle(textSvgEl, style, true, el); // FIXME
  // Add a <style> to reset all of the text font as inherit?
  // otherwise the outer <style> may set the unexpected style.
  // Font may affect position of each tspan elements

  var canCacheByTextString = contentBlock.canCacheByTextString;
  var tspanList = el.__tspanList || (el.__tspanList = []);
  var tspanOriginLen = tspanList.length; // Optimize for most cases, just compare text string to determine change.

  if (canCacheByTextString && el.__canCacheByTextString && el.__text === text) {
    if (el.__dirtyText && tspanOriginLen) {
      for (var idx = 0; idx < tspanOriginLen; ++idx) {
        updateTextLocation(tspanList[idx], textAlign, textX, textY + idx * lineHeight);
      }
    }
  } else {
    el.__text = text;
    el.__canCacheByTextString = canCacheByTextString;
    var textLines = contentBlock.lines;
    var nTextLines = textLines.length;
    var idx = 0;

    for (; idx < nTextLines; idx++) {
      // Using cached tspan elements
      var tspan = tspanList[idx];
      var singleLineText = textLines[idx];

      if (!tspan) {
        tspan = tspanList[idx] = createElement('tspan');
        textSvgEl.appendChild(tspan);
        tspan.appendChild(document.createTextNode(singleLineText));
      } else if (tspan.__zrText !== singleLineText) {
        tspan.innerHTML = '';
        tspan.appendChild(document.createTextNode(singleLineText));
      }

      updateTextLocation(tspan, textAlign, textX, textY + idx * lineHeight);
    } // Remove unused tspan elements


    if (tspanOriginLen > nTextLines) {
      for (; idx < tspanOriginLen; idx++) {
        textSvgEl.removeChild(tspanList[idx]);
      }

      tspanList.length = nTextLines;
    }
  }
};

function setTextTransform(textSvgEl, needTransformTextByHostEl, elTransform, style, hostRect, baseX, baseY) {
  matrix.identity(_tmpTextTransform);

  if (needTransformTextByHostEl && elTransform) {
    matrix.copy(_tmpTextTransform, elTransform);
  } // textRotation only apply in RectText.


  var textRotation = style.textRotation;

  if (hostRect && textRotation) {
    var origin = style.textOrigin;

    if (origin === 'center') {
      baseX = hostRect.width / 2 + hostRect.x;
      baseY = hostRect.height / 2 + hostRect.y;
    } else if (origin) {
      baseX = origin[0] + hostRect.x;
      baseY = origin[1] + hostRect.y;
    }

    _tmpTextTransform[4] -= baseX;
    _tmpTextTransform[5] -= baseY; // Positive: anticlockwise

    matrix.rotate(_tmpTextTransform, _tmpTextTransform, textRotation);
    _tmpTextTransform[4] += baseX;
    _tmpTextTransform[5] += baseY;
  } // See the definition in `Style.js#textOrigin`, the default
  // origin is from the result of `getBoxPosition`.


  setTransform(textSvgEl, _tmpTextTransform);
} // FIXME merge the same code with `helper/text.js#getTextXForPadding`;


function getTextXForPadding(x, textAlign, textPadding) {
  return textAlign === 'right' ? x - textPadding[1] : textAlign === 'center' ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
}

function updateTextLocation(tspan, textAlign, x, y) {
  // Consider different font display differently in vertial align, we always
  // set vertialAlign as 'middle', and use 'y' to locate text vertically.
  attr(tspan, 'dominant-baseline', 'middle');
  attr(tspan, 'text-anchor', TEXT_ALIGN_TO_ANCHRO[textAlign]);
  attr(tspan, 'x', x);
  attr(tspan, 'y', y);
}

function removeOldTextNode(el) {
  if (el && el.__textSvgEl) {
    // textSvgEl may has no parentNode if el has been removed temporary.
    if (el.__textSvgEl.parentNode) {
      el.__textSvgEl.parentNode.removeChild(el.__textSvgEl);
    }

    el.__textSvgEl = null;
    el.__tspanList = [];
    el.__text = null;
  }
}

svgText.drawRectText = svgTextDrawRectText;

svgText.brush = function (el) {
  var style = el.style;

  if (style.text != null) {
    svgTextDrawRectText(el, false);
  } else {
    removeOldTextNode(el);
  }
};

exports.path = svgPath;
exports.image = svgImage;
exports.text = svgText;

/***/ }),

/***/ "4ab1":
/***/ (function(module, exports, __webpack_require__) {

var _core = __webpack_require__("8727");

var createElement = _core.createElement;

var zrUtil = __webpack_require__("6d8b");

var Path = __webpack_require__("cbe5");

var ZImage = __webpack_require__("0da8");

var ZText = __webpack_require__("76a5");

var _graphic = __webpack_require__("3f8e");

var svgPath = _graphic.path;
var svgImage = _graphic.image;
var svgText = _graphic.text;

/**
 * @file Manages elements that can be defined in <defs> in SVG,
 *       e.g., gradients, clip path, etc.
 * @author Zhang Wenli
 */
var MARK_UNUSED = '0';
var MARK_USED = '1';
/**
 * Manages elements that can be defined in <defs> in SVG,
 * e.g., gradients, clip path, etc.
 *
 * @class
 * @param {number}          zrId      zrender instance id
 * @param {SVGElement}      svgRoot   root of SVG document
 * @param {string|string[]} tagNames  possible tag names
 * @param {string}          markLabel label name to make if the element
 *                                    is used
 */

function Definable(zrId, svgRoot, tagNames, markLabel, domName) {
  this._zrId = zrId;
  this._svgRoot = svgRoot;
  this._tagNames = typeof tagNames === 'string' ? [tagNames] : tagNames;
  this._markLabel = markLabel;
  this._domName = domName || '_dom';
  this.nextId = 0;
}

Definable.prototype.createElement = createElement;
/**
 * Get the <defs> tag for svgRoot; optionally creates one if not exists.
 *
 * @param {boolean} isForceCreating if need to create when not exists
 * @return {SVGDefsElement} SVG <defs> element, null if it doesn't
 * exist and isForceCreating is false
 */

Definable.prototype.getDefs = function (isForceCreating) {
  var svgRoot = this._svgRoot;

  var defs = this._svgRoot.getElementsByTagName('defs');

  if (defs.length === 0) {
    // Not exist
    if (isForceCreating) {
      defs = svgRoot.insertBefore(this.createElement('defs'), // Create new tag
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
};
/**
 * Update DOM element if necessary.
 *
 * @param {Object|string} element style element. e.g., for gradient,
 *                                it may be '#ccc' or {type: 'linear', ...}
 * @param {Function|undefined} onUpdate update callback
 */


Definable.prototype.update = function (element, onUpdate) {
  if (!element) {
    return;
  }

  var defs = this.getDefs(false);

  if (element[this._domName] && defs.contains(element[this._domName])) {
    // Update DOM
    if (typeof onUpdate === 'function') {
      onUpdate(element);
    }
  } else {
    // No previous dom, create new
    var dom = this.add(element);

    if (dom) {
      element[this._domName] = dom;
    }
  }
};
/**
 * Add gradient dom to defs
 *
 * @param {SVGElement} dom DOM to be added to <defs>
 */


Definable.prototype.addDom = function (dom) {
  var defs = this.getDefs(true);
  defs.appendChild(dom);
};
/**
 * Remove DOM of a given element.
 *
 * @param {SVGElement} element element to remove dom
 */


Definable.prototype.removeDom = function (element) {
  var defs = this.getDefs(false);

  if (defs && element[this._domName]) {
    defs.removeChild(element[this._domName]);
    element[this._domName] = null;
  }
};
/**
 * Get DOMs of this element.
 *
 * @return {HTMLDomElement} doms of this defineable elements in <defs>
 */


Definable.prototype.getDoms = function () {
  var defs = this.getDefs(false);

  if (!defs) {
    // No dom when defs is not defined
    return [];
  }

  var doms = [];
  zrUtil.each(this._tagNames, function (tagName) {
    var tags = defs.getElementsByTagName(tagName); // Note that tags is HTMLCollection, which is array-like
    // rather than real array.
    // So `doms.concat(tags)` add tags as one object.

    doms = doms.concat([].slice.call(tags));
  });
  return doms;
};
/**
 * Mark DOMs to be unused before painting, and clear unused ones at the end
 * of the painting.
 */


Definable.prototype.markAllUnused = function () {
  var doms = this.getDoms();
  var that = this;
  zrUtil.each(doms, function (dom) {
    dom[that._markLabel] = MARK_UNUSED;
  });
};
/**
 * Mark a single DOM to be used.
 *
 * @param {SVGElement} dom DOM to mark
 */


Definable.prototype.markUsed = function (dom) {
  if (dom) {
    dom[this._markLabel] = MARK_USED;
  }
};
/**
 * Remove unused DOMs defined in <defs>
 */


Definable.prototype.removeUnused = function () {
  var defs = this.getDefs(false);

  if (!defs) {
    // Nothing to remove
    return;
  }

  var doms = this.getDoms();
  var that = this;
  zrUtil.each(doms, function (dom) {
    if (dom[that._markLabel] !== MARK_USED) {
      // Remove gradient
      defs.removeChild(dom);
    }
  });
};
/**
 * Get SVG proxy.
 *
 * @param {Displayable} displayable displayable element
 * @return {Path|Image|Text} svg proxy of given element
 */


Definable.prototype.getSvgProxy = function (displayable) {
  if (displayable instanceof Path) {
    return svgPath;
  } else if (displayable instanceof ZImage) {
    return svgImage;
  } else if (displayable instanceof ZText) {
    return svgText;
  } else {
    return svgPath;
  }
};
/**
 * Get text SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element of text
 */


Definable.prototype.getTextSvgElement = function (displayable) {
  return displayable.__textSvgEl;
};
/**
 * Get SVG element.
 *
 * @param {Displayable} displayable displayable element
 * @return {SVGElement} SVG element
 */


Definable.prototype.getSvgElement = function (displayable) {
  return displayable.__svgEl;
};

var _default = Definable;
module.exports = _default;

/***/ }),

/***/ "8727":
/***/ (function(module, exports) {

var svgURI = 'http://www.w3.org/2000/svg';

function createElement(name) {
  return document.createElementNS(svgURI, name);
}

exports.createElement = createElement;

/***/ }),

/***/ "8ee0":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3f8e");

var _zrender = __webpack_require__("697e7");

var registerPainter = _zrender.registerPainter;

var Painter = __webpack_require__("dc20");

registerPainter('svg', Painter);

/***/ }),

/***/ "9fa3":
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__("4ab1");

var zrUtil = __webpack_require__("6d8b");

var matrix = __webpack_require__("1687");

/**
 * @file Manages SVG clipPath elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG clipPath elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ClippathManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, 'clipPath', '__clippath_in_use__');
}

zrUtil.inherits(ClippathManager, Definable);
/**
 * Update clipPath.
 *
 * @param {Displayable} displayable displayable element
 */

ClippathManager.prototype.update = function (displayable) {
  var svgEl = this.getSvgElement(displayable);

  if (svgEl) {
    this.updateDom(svgEl, displayable.__clipPaths, false);
  }

  var textEl = this.getTextSvgElement(displayable);

  if (textEl) {
    // Make another clipPath for text, since it's transform
    // matrix is not the same with svgElement
    this.updateDom(textEl, displayable.__clipPaths, true);
  }

  this.markUsed(displayable);
};
/**
 * Create an SVGElement of displayable and create a <clipPath> of its
 * clipPath
 *
 * @param {Displayable} parentEl  parent element
 * @param {ClipPath[]}  clipPaths clipPaths of parent element
 * @param {boolean}     isText    if parent element is Text
 */


ClippathManager.prototype.updateDom = function (parentEl, clipPaths, isText) {
  if (clipPaths && clipPaths.length > 0) {
    // Has clipPath, create <clipPath> with the first clipPath
    var defs = this.getDefs(true);
    var clipPath = clipPaths[0];
    var clipPathEl;
    var id;
    var dom = isText ? '_textDom' : '_dom';

    if (clipPath[dom]) {
      // Use a dom that is already in <defs>
      id = clipPath[dom].getAttribute('id');
      clipPathEl = clipPath[dom]; // Use a dom that is already in <defs>

      if (!defs.contains(clipPathEl)) {
        // This happens when set old clipPath that has
        // been previously removed
        defs.appendChild(clipPathEl);
      }
    } else {
      // New <clipPath>
      id = 'zr' + this._zrId + '-clip-' + this.nextId;
      ++this.nextId;
      clipPathEl = this.createElement('clipPath');
      clipPathEl.setAttribute('id', id);
      defs.appendChild(clipPathEl);
      clipPath[dom] = clipPathEl;
    } // Build path and add to <clipPath>


    var svgProxy = this.getSvgProxy(clipPath);

    if (clipPath.transform && clipPath.parent.invTransform && !isText) {
      /**
       * If a clipPath has a parent with transform, the transform
       * of parent should not be considered when setting transform
       * of clipPath. So we need to transform back from parent's
       * transform, which is done by multiplying parent's inverse
       * transform.
       */
      // Store old transform
      var transform = Array.prototype.slice.call(clipPath.transform); // Transform back from parent, and brush path

      matrix.mul(clipPath.transform, clipPath.parent.invTransform, clipPath.transform);
      svgProxy.brush(clipPath); // Set back transform of clipPath

      clipPath.transform = transform;
    } else {
      svgProxy.brush(clipPath);
    }

    var pathEl = this.getSvgElement(clipPath);
    clipPathEl.innerHTML = '';
    /**
     * Use `cloneNode()` here to appendChild to multiple parents,
     * which may happend when Text and other shapes are using the same
     * clipPath. Since Text will create an extra clipPath DOM due to
     * different transform rules.
     */

    clipPathEl.appendChild(pathEl.cloneNode());
    parentEl.setAttribute('clip-path', 'url(#' + id + ')');

    if (clipPaths.length > 1) {
      // Make the other clipPaths recursively
      this.updateDom(clipPathEl, clipPaths.slice(1), isText);
    }
  } else {
    // No clipPath
    if (parentEl) {
      parentEl.setAttribute('clip-path', 'none');
    }
  }
};
/**
 * Mark a single clipPath to be used
 *
 * @param {Displayable} displayable displayable element
 */


ClippathManager.prototype.markUsed = function (displayable) {
  var that = this; // displayable.__clipPaths can only be `null`/`undefined` or an non-empty array.

  if (displayable.__clipPaths) {
    zrUtil.each(displayable.__clipPaths, function (clipPath) {
      if (clipPath._dom) {
        Definable.prototype.markUsed.call(that, clipPath._dom);
      }

      if (clipPath._textDom) {
        Definable.prototype.markUsed.call(that, clipPath._textDom);
      }
    });
  }
};

var _default = ClippathManager;
module.exports = _default;

/***/ }),

/***/ "b16f":
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__("4ab1");

var zrUtil = __webpack_require__("6d8b");

var logError = __webpack_require__("4942");

var colorTool = __webpack_require__("41ef");

/**
 * @file Manages SVG gradient elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG gradient elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function GradientManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, ['linearGradient', 'radialGradient'], '__gradient_in_use__');
}

zrUtil.inherits(GradientManager, Definable);
/**
 * Create new gradient DOM for fill or stroke if not exist,
 * but will not update gradient if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */

GradientManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
  if (displayable && displayable.style) {
    var that = this;
    zrUtil.each(['fill', 'stroke'], function (fillOrStroke) {
      if (displayable.style[fillOrStroke] && (displayable.style[fillOrStroke].type === 'linear' || displayable.style[fillOrStroke].type === 'radial')) {
        var gradient = displayable.style[fillOrStroke];
        var defs = that.getDefs(true); // Create dom in <defs> if not exists

        var dom;

        if (gradient._dom) {
          // Gradient exists
          dom = gradient._dom;

          if (!defs.contains(gradient._dom)) {
            // _dom is no longer in defs, recreate
            that.addDom(dom);
          }
        } else {
          // New dom
          dom = that.add(gradient);
        }

        that.markUsed(displayable);
        var id = dom.getAttribute('id');
        svgElement.setAttribute(fillOrStroke, 'url(#' + id + ')');
      }
    });
  }
};
/**
 * Add a new gradient tag in <defs>
 *
 * @param   {Gradient} gradient zr gradient instance
 * @return {SVGLinearGradientElement | SVGRadialGradientElement}
 *                            created DOM
 */


GradientManager.prototype.add = function (gradient) {
  var dom;

  if (gradient.type === 'linear') {
    dom = this.createElement('linearGradient');
  } else if (gradient.type === 'radial') {
    dom = this.createElement('radialGradient');
  } else {
    logError('Illegal gradient type.');
    return null;
  } // Set dom id with gradient id, since each gradient instance
  // will have no more than one dom element.
  // id may exists before for those dirty elements, in which case
  // id should remain the same, and other attributes should be
  // updated.


  gradient.id = gradient.id || this.nextId++;
  dom.setAttribute('id', 'zr' + this._zrId + '-gradient-' + gradient.id);
  this.updateDom(gradient, dom);
  this.addDom(dom);
  return dom;
};
/**
 * Update gradient.
 *
 * @param {Gradient} gradient zr gradient instance
 */


GradientManager.prototype.update = function (gradient) {
  var that = this;
  Definable.prototype.update.call(this, gradient, function () {
    var type = gradient.type;
    var tagName = gradient._dom.tagName;

    if (type === 'linear' && tagName === 'linearGradient' || type === 'radial' && tagName === 'radialGradient') {
      // Gradient type is not changed, update gradient
      that.updateDom(gradient, gradient._dom);
    } else {
      // Remove and re-create if type is changed
      that.removeDom(gradient);
      that.add(gradient);
    }
  });
};
/**
 * Update gradient dom
 *
 * @param {Gradient} gradient zr gradient instance
 * @param {SVGLinearGradientElement | SVGRadialGradientElement} dom
 *                            DOM to update
 */


GradientManager.prototype.updateDom = function (gradient, dom) {
  if (gradient.type === 'linear') {
    dom.setAttribute('x1', gradient.x);
    dom.setAttribute('y1', gradient.y);
    dom.setAttribute('x2', gradient.x2);
    dom.setAttribute('y2', gradient.y2);
  } else if (gradient.type === 'radial') {
    dom.setAttribute('cx', gradient.x);
    dom.setAttribute('cy', gradient.y);
    dom.setAttribute('r', gradient.r);
  } else {
    logError('Illegal gradient type.');
    return;
  }

  if (gradient.global) {
    // x1, x2, y1, y2 in range of 0 to canvas width or height
    dom.setAttribute('gradientUnits', 'userSpaceOnUse');
  } else {
    // x1, x2, y1, y2 in range of 0 to 1
    dom.setAttribute('gradientUnits', 'objectBoundingBox');
  } // Remove color stops if exists


  dom.innerHTML = ''; // Add color stops

  var colors = gradient.colorStops;

  for (var i = 0, len = colors.length; i < len; ++i) {
    var stop = this.createElement('stop');
    stop.setAttribute('offset', colors[i].offset * 100 + '%');
    var color = colors[i].color;

    if (color.indexOf('rgba' > -1)) {
      // Fix Safari bug that stop-color not recognizing alpha #9014
      var opacity = colorTool.parse(color)[3];
      var hex = colorTool.toHex(color); // stop-color cannot be color, since:
      // The opacity value used for the gradient calculation is the
      // *product* of the value of stop-opacity and the opacity of the
      // value of stop-color.
      // See https://www.w3.org/TR/SVG2/pservers.html#StopOpacityProperty

      stop.setAttribute('stop-color', '#' + hex);
      stop.setAttribute('stop-opacity', opacity);
    } else {
      stop.setAttribute('stop-color', colors[i].color);
    }

    dom.appendChild(stop);
  } // Store dom element in gradient, to avoid creating multiple
  // dom instances for the same gradient element


  gradient._dom = dom;
};
/**
 * Mark a single gradient to be used
 *
 * @param {Displayable} displayable displayable element
 */


GradientManager.prototype.markUsed = function (displayable) {
  if (displayable.style) {
    var gradient = displayable.style.fill;

    if (gradient && gradient._dom) {
      Definable.prototype.markUsed.call(this, gradient._dom);
    }

    gradient = displayable.style.stroke;

    if (gradient && gradient._dom) {
      Definable.prototype.markUsed.call(this, gradient._dom);
    }
  }
};

var _default = GradientManager;
module.exports = _default;

/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var Definable = __webpack_require__("4ab1");

var zrUtil = __webpack_require__("6d8b");

/**
 * @file Manages SVG shadow elements.
 * @author Zhang Wenli
 */

/**
 * Manages SVG shadow elements.
 *
 * @class
 * @extends Definable
 * @param   {number}     zrId    zrender instance id
 * @param   {SVGElement} svgRoot root of SVG document
 */
function ShadowManager(zrId, svgRoot) {
  Definable.call(this, zrId, svgRoot, ['filter'], '__filter_in_use__', '_shadowDom');
}

zrUtil.inherits(ShadowManager, Definable);
/**
 * Create new shadow DOM for fill or stroke if not exist,
 * but will not update shadow if exists.
 *
 * @param {SvgElement}  svgElement   SVG element to paint
 * @param {Displayable} displayable  zrender displayable element
 */

ShadowManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
  if (displayable && hasShadow(displayable.style)) {
    // Create dom in <defs> if not exists
    var dom;

    if (displayable._shadowDom) {
      // Gradient exists
      dom = displayable._shadowDom;
      var defs = this.getDefs(true);

      if (!defs.contains(displayable._shadowDom)) {
        // _shadowDom is no longer in defs, recreate
        this.addDom(dom);
      }
    } else {
      // New dom
      dom = this.add(displayable);
    }

    this.markUsed(displayable);
    var id = dom.getAttribute('id');
    svgElement.style.filter = 'url(#' + id + ')';
  }
};
/**
 * Add a new shadow tag in <defs>
 *
 * @param {Displayable} displayable  zrender displayable element
 * @return {SVGFilterElement} created DOM
 */


ShadowManager.prototype.add = function (displayable) {
  var dom = this.createElement('filter'); // Set dom id with shadow id, since each shadow instance
  // will have no more than one dom element.
  // id may exists before for those dirty elements, in which case
  // id should remain the same, and other attributes should be
  // updated.

  displayable._shadowDomId = displayable._shadowDomId || this.nextId++;
  dom.setAttribute('id', 'zr' + this._zrId + '-shadow-' + displayable._shadowDomId);
  this.updateDom(displayable, dom);
  this.addDom(dom);
  return dom;
};
/**
 * Update shadow.
 *
 * @param {Displayable} displayable  zrender displayable element
 */


ShadowManager.prototype.update = function (svgElement, displayable) {
  var style = displayable.style;

  if (hasShadow(style)) {
    var that = this;
    Definable.prototype.update.call(this, displayable, function () {
      that.updateDom(displayable, displayable._shadowDom);
    });
  } else {
    // Remove shadow
    this.remove(svgElement, displayable);
  }
};
/**
 * Remove DOM and clear parent filter
 */


ShadowManager.prototype.remove = function (svgElement, displayable) {
  if (displayable._shadowDomId != null) {
    this.removeDom(svgElement);
    svgElement.style.filter = '';
  }
};
/**
 * Update shadow dom
 *
 * @param {Displayable} displayable  zrender displayable element
 * @param {SVGFilterElement} dom DOM to update
 */


ShadowManager.prototype.updateDom = function (displayable, dom) {
  var domChild = dom.getElementsByTagName('feDropShadow');

  if (domChild.length === 0) {
    domChild = this.createElement('feDropShadow');
  } else {
    domChild = domChild[0];
  }

  var style = displayable.style;
  var scaleX = displayable.scale ? displayable.scale[0] || 1 : 1;
  var scaleY = displayable.scale ? displayable.scale[1] || 1 : 1; // TODO: textBoxShadowBlur is not supported yet

  var offsetX;
  var offsetY;
  var blur;
  var color;

  if (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY) {
    offsetX = style.shadowOffsetX || 0;
    offsetY = style.shadowOffsetY || 0;
    blur = style.shadowBlur;
    color = style.shadowColor;
  } else if (style.textShadowBlur) {
    offsetX = style.textShadowOffsetX || 0;
    offsetY = style.textShadowOffsetY || 0;
    blur = style.textShadowBlur;
    color = style.textShadowColor;
  } else {
    // Remove shadow
    this.removeDom(dom, style);
    return;
  }

  domChild.setAttribute('dx', offsetX / scaleX);
  domChild.setAttribute('dy', offsetY / scaleY);
  domChild.setAttribute('flood-color', color); // Divide by two here so that it looks the same as in canvas
  // See: https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur

  var stdDx = blur / 2 / scaleX;
  var stdDy = blur / 2 / scaleY;
  var stdDeviation = stdDx + ' ' + stdDy;
  domChild.setAttribute('stdDeviation', stdDeviation); // Fix filter clipping problem

  dom.setAttribute('x', '-100%');
  dom.setAttribute('y', '-100%');
  dom.setAttribute('width', Math.ceil(blur / 2 * 200) + '%');
  dom.setAttribute('height', Math.ceil(blur / 2 * 200) + '%');
  dom.appendChild(domChild); // Store dom element in shadow, to avoid creating multiple
  // dom instances for the same shadow element

  displayable._shadowDom = dom;
};
/**
 * Mark a single shadow to be used
 *
 * @param {Displayable} displayable displayable element
 */


ShadowManager.prototype.markUsed = function (displayable) {
  if (displayable._shadowDom) {
    Definable.prototype.markUsed.call(this, displayable._shadowDom);
  }
};

function hasShadow(style) {
  // TODO: textBoxShadowBlur is not supported yet
  return style && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY || style.textShadowBlur || style.textShadowOffsetX || style.textShadowOffsetY);
}

var _default = ShadowManager;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~10d884ce.6359b537.js.map