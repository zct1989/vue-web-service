(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~7621f983"],{

/***/ "3041":
/***/ (function(module, exports, __webpack_require__) {

var Group = __webpack_require__("e1fc");

var ZImage = __webpack_require__("0da8");

var Text = __webpack_require__("76a5");

var Circle = __webpack_require__("d9fc");

var Rect = __webpack_require__("c7a2");

var Ellipse = __webpack_require__("ae69");

var Line = __webpack_require__("cb11");

var Path = __webpack_require__("cbe5");

var Polygon = __webpack_require__("87b1");

var Polyline = __webpack_require__("d498");

var LinearGradient = __webpack_require__("48a9");

var Style = __webpack_require__("2b61");

var matrix = __webpack_require__("1687");

var _path = __webpack_require__("342d");

var createFromString = _path.createFromString;

var _util = __webpack_require__("6d8b");

var isString = _util.isString;
var extend = _util.extend;
var defaults = _util.defaults;
var trim = _util.trim;
var each = _util.each;
// import RadialGradient from '../graphic/RadialGradient';
// import Pattern from '../graphic/Pattern';
// import * as vector from '../core/vector';
// Most of the values can be separated by comma and/or white space.
var DILIMITER_REG = /[\s,]+/;
/**
 * For big svg string, this method might be time consuming.
 *
 * @param {string} svg xml string
 * @return {Object} xml root.
 */

function parseXML(svg) {
  if (isString(svg)) {
    var parser = new DOMParser();
    svg = parser.parseFromString(svg, 'text/xml');
  } // Document node. If using $.get, doc node may be input.


  if (svg.nodeType === 9) {
    svg = svg.firstChild;
  } // nodeName of <!DOCTYPE svg> is also 'svg'.


  while (svg.nodeName.toLowerCase() !== 'svg' || svg.nodeType !== 1) {
    svg = svg.nextSibling;
  }

  return svg;
}

function SVGParser() {
  this._defs = {};
  this._root = null;
  this._isDefine = false;
  this._isText = false;
}

SVGParser.prototype.parse = function (xml, opt) {
  opt = opt || {};
  var svg = parseXML(xml);

  if (!svg) {
    throw new Error('Illegal svg');
  }

  var root = new Group();
  this._root = root; // parse view port

  var viewBox = svg.getAttribute('viewBox') || ''; // If width/height not specified, means "100%" of `opt.width/height`.
  // TODO: Other percent value not supported yet.

  var width = parseFloat(svg.getAttribute('width') || opt.width);
  var height = parseFloat(svg.getAttribute('height') || opt.height); // If width/height not specified, set as null for output.

  isNaN(width) && (width = null);
  isNaN(height) && (height = null); // Apply inline style on svg element.

  parseAttributes(svg, root, null, true);
  var child = svg.firstChild;

  while (child) {
    this._parseNode(child, root);

    child = child.nextSibling;
  }

  var viewBoxRect;
  var viewBoxTransform;

  if (viewBox) {
    var viewBoxArr = trim(viewBox).split(DILIMITER_REG); // Some invalid case like viewBox: 'none'.

    if (viewBoxArr.length >= 4) {
      viewBoxRect = {
        x: parseFloat(viewBoxArr[0] || 0),
        y: parseFloat(viewBoxArr[1] || 0),
        width: parseFloat(viewBoxArr[2]),
        height: parseFloat(viewBoxArr[3])
      };
    }
  }

  if (viewBoxRect && width != null && height != null) {
    viewBoxTransform = makeViewBoxTransform(viewBoxRect, width, height);

    if (!opt.ignoreViewBox) {
      // If set transform on the output group, it probably bring trouble when
      // some users only intend to show the clipped content inside the viewBox,
      // but not intend to transform the output group. So we keep the output
      // group no transform. If the user intend to use the viewBox as a
      // camera, just set `opt.ignoreViewBox` as `true` and set transfrom
      // manually according to the viewBox info in the output of this method.
      var elRoot = root;
      root = new Group();
      root.add(elRoot);
      elRoot.scale = viewBoxTransform.scale.slice();
      elRoot.position = viewBoxTransform.position.slice();
    }
  } // Some shapes might be overflow the viewport, which should be
  // clipped despite whether the viewBox is used, as the SVG does.


  if (!opt.ignoreRootClip && width != null && height != null) {
    root.setClipPath(new Rect({
      shape: {
        x: 0,
        y: 0,
        width: width,
        height: height
      }
    }));
  } // Set width/height on group just for output the viewport size.


  return {
    root: root,
    width: width,
    height: height,
    viewBoxRect: viewBoxRect,
    viewBoxTransform: viewBoxTransform
  };
};

SVGParser.prototype._parseNode = function (xmlNode, parentGroup) {
  var nodeName = xmlNode.nodeName.toLowerCase(); // TODO
  // support <style>...</style> in svg, where nodeName is 'style',
  // CSS classes is defined globally wherever the style tags are declared.

  if (nodeName === 'defs') {
    // define flag
    this._isDefine = true;
  } else if (nodeName === 'text') {
    this._isText = true;
  }

  var el;

  if (this._isDefine) {
    var parser = defineParsers[nodeName];

    if (parser) {
      var def = parser.call(this, xmlNode);
      var id = xmlNode.getAttribute('id');

      if (id) {
        this._defs[id] = def;
      }
    }
  } else {
    var parser = nodeParsers[nodeName];

    if (parser) {
      el = parser.call(this, xmlNode, parentGroup);
      parentGroup.add(el);
    }
  }

  var child = xmlNode.firstChild;

  while (child) {
    if (child.nodeType === 1) {
      this._parseNode(child, el);
    } // Is text


    if (child.nodeType === 3 && this._isText) {
      this._parseText(child, el);
    }

    child = child.nextSibling;
  } // Quit define


  if (nodeName === 'defs') {
    this._isDefine = false;
  } else if (nodeName === 'text') {
    this._isText = false;
  }
};

SVGParser.prototype._parseText = function (xmlNode, parentGroup) {
  if (xmlNode.nodeType === 1) {
    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    this._textX += parseFloat(dx);
    this._textY += parseFloat(dy);
  }

  var text = new Text({
    style: {
      text: xmlNode.textContent,
      transformText: true
    },
    position: [this._textX || 0, this._textY || 0]
  });
  inheritStyle(parentGroup, text);
  parseAttributes(xmlNode, text, this._defs);
  var fontSize = text.style.fontSize;

  if (fontSize && fontSize < 9) {
    // PENDING
    text.style.fontSize = 9;
    text.scale = text.scale || [1, 1];
    text.scale[0] *= fontSize / 9;
    text.scale[1] *= fontSize / 9;
  }

  var rect = text.getBoundingRect();
  this._textX += rect.width;
  parentGroup.add(text);
  return text;
};

var nodeParsers = {
  'g': function (xmlNode, parentGroup) {
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    return g;
  },
  'rect': function (xmlNode, parentGroup) {
    var rect = new Rect();
    inheritStyle(parentGroup, rect);
    parseAttributes(xmlNode, rect, this._defs);
    rect.setShape({
      x: parseFloat(xmlNode.getAttribute('x') || 0),
      y: parseFloat(xmlNode.getAttribute('y') || 0),
      width: parseFloat(xmlNode.getAttribute('width') || 0),
      height: parseFloat(xmlNode.getAttribute('height') || 0)
    }); // console.log(xmlNode.getAttribute('transform'));
    // console.log(rect.transform);

    return rect;
  },
  'circle': function (xmlNode, parentGroup) {
    var circle = new Circle();
    inheritStyle(parentGroup, circle);
    parseAttributes(xmlNode, circle, this._defs);
    circle.setShape({
      cx: parseFloat(xmlNode.getAttribute('cx') || 0),
      cy: parseFloat(xmlNode.getAttribute('cy') || 0),
      r: parseFloat(xmlNode.getAttribute('r') || 0)
    });
    return circle;
  },
  'line': function (xmlNode, parentGroup) {
    var line = new Line();
    inheritStyle(parentGroup, line);
    parseAttributes(xmlNode, line, this._defs);
    line.setShape({
      x1: parseFloat(xmlNode.getAttribute('x1') || 0),
      y1: parseFloat(xmlNode.getAttribute('y1') || 0),
      x2: parseFloat(xmlNode.getAttribute('x2') || 0),
      y2: parseFloat(xmlNode.getAttribute('y2') || 0)
    });
    return line;
  },
  'ellipse': function (xmlNode, parentGroup) {
    var ellipse = new Ellipse();
    inheritStyle(parentGroup, ellipse);
    parseAttributes(xmlNode, ellipse, this._defs);
    ellipse.setShape({
      cx: parseFloat(xmlNode.getAttribute('cx') || 0),
      cy: parseFloat(xmlNode.getAttribute('cy') || 0),
      rx: parseFloat(xmlNode.getAttribute('rx') || 0),
      ry: parseFloat(xmlNode.getAttribute('ry') || 0)
    });
    return ellipse;
  },
  'polygon': function (xmlNode, parentGroup) {
    var points = xmlNode.getAttribute('points');

    if (points) {
      points = parsePoints(points);
    }

    var polygon = new Polygon({
      shape: {
        points: points || []
      }
    });
    inheritStyle(parentGroup, polygon);
    parseAttributes(xmlNode, polygon, this._defs);
    return polygon;
  },
  'polyline': function (xmlNode, parentGroup) {
    var path = new Path();
    inheritStyle(parentGroup, path);
    parseAttributes(xmlNode, path, this._defs);
    var points = xmlNode.getAttribute('points');

    if (points) {
      points = parsePoints(points);
    }

    var polyline = new Polyline({
      shape: {
        points: points || []
      }
    });
    return polyline;
  },
  'image': function (xmlNode, parentGroup) {
    var img = new ZImage();
    inheritStyle(parentGroup, img);
    parseAttributes(xmlNode, img, this._defs);
    img.setStyle({
      image: xmlNode.getAttribute('xlink:href'),
      x: xmlNode.getAttribute('x'),
      y: xmlNode.getAttribute('y'),
      width: xmlNode.getAttribute('width'),
      height: xmlNode.getAttribute('height')
    });
    return img;
  },
  'text': function (xmlNode, parentGroup) {
    var x = xmlNode.getAttribute('x') || 0;
    var y = xmlNode.getAttribute('y') || 0;
    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    this._textX = parseFloat(x) + parseFloat(dx);
    this._textY = parseFloat(y) + parseFloat(dy);
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    return g;
  },
  'tspan': function (xmlNode, parentGroup) {
    var x = xmlNode.getAttribute('x');
    var y = xmlNode.getAttribute('y');

    if (x != null) {
      // new offset x
      this._textX = parseFloat(x);
    }

    if (y != null) {
      // new offset y
      this._textY = parseFloat(y);
    }

    var dx = xmlNode.getAttribute('dx') || 0;
    var dy = xmlNode.getAttribute('dy') || 0;
    var g = new Group();
    inheritStyle(parentGroup, g);
    parseAttributes(xmlNode, g, this._defs);
    this._textX += dx;
    this._textY += dy;
    return g;
  },
  'path': function (xmlNode, parentGroup) {
    // TODO svg fill rule
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule
    // path.style.globalCompositeOperation = 'xor';
    var d = xmlNode.getAttribute('d') || ''; // Performance sensitive.

    var path = createFromString(d);
    inheritStyle(parentGroup, path);
    parseAttributes(xmlNode, path, this._defs);
    return path;
  }
};
var defineParsers = {
  'lineargradient': function (xmlNode) {
    var x1 = parseInt(xmlNode.getAttribute('x1') || 0, 10);
    var y1 = parseInt(xmlNode.getAttribute('y1') || 0, 10);
    var x2 = parseInt(xmlNode.getAttribute('x2') || 10, 10);
    var y2 = parseInt(xmlNode.getAttribute('y2') || 0, 10);
    var gradient = new LinearGradient(x1, y1, x2, y2);

    _parseGradientColorStops(xmlNode, gradient);

    return gradient;
  },
  'radialgradient': function (xmlNode) {}
};

function _parseGradientColorStops(xmlNode, gradient) {
  var stop = xmlNode.firstChild;

  while (stop) {
    if (stop.nodeType === 1) {
      var offset = stop.getAttribute('offset');

      if (offset.indexOf('%') > 0) {
        // percentage
        offset = parseInt(offset, 10) / 100;
      } else if (offset) {
        // number from 0 to 1
        offset = parseFloat(offset);
      } else {
        offset = 0;
      }

      var stopColor = stop.getAttribute('stop-color') || '#000000';
      gradient.addColorStop(offset, stopColor);
    }

    stop = stop.nextSibling;
  }
}

function inheritStyle(parent, child) {
  if (parent && parent.__inheritedStyle) {
    if (!child.__inheritedStyle) {
      child.__inheritedStyle = {};
    }

    defaults(child.__inheritedStyle, parent.__inheritedStyle);
  }
}

function parsePoints(pointsString) {
  var list = trim(pointsString).split(DILIMITER_REG);
  var points = [];

  for (var i = 0; i < list.length; i += 2) {
    var x = parseFloat(list[i]);
    var y = parseFloat(list[i + 1]);
    points.push([x, y]);
  }

  return points;
}

var attributesMap = {
  'fill': 'fill',
  'stroke': 'stroke',
  'stroke-width': 'lineWidth',
  'opacity': 'opacity',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stroke-dasharray': 'lineDash',
  'stroke-dashoffset': 'lineDashOffset',
  'stroke-linecap': 'lineCap',
  'stroke-linejoin': 'lineJoin',
  'stroke-miterlimit': 'miterLimit',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-style': 'fontStyle',
  'font-weight': 'fontWeight',
  'text-align': 'textAlign',
  'alignment-baseline': 'textBaseline'
};

function parseAttributes(xmlNode, el, defs, onlyInlineStyle) {
  var zrStyle = el.__inheritedStyle || {};
  var isTextEl = el.type === 'text'; // TODO Shadow

  if (xmlNode.nodeType === 1) {
    parseTransformAttribute(xmlNode, el);
    extend(zrStyle, parseStyleAttribute(xmlNode));

    if (!onlyInlineStyle) {
      for (var svgAttrName in attributesMap) {
        if (attributesMap.hasOwnProperty(svgAttrName)) {
          var attrValue = xmlNode.getAttribute(svgAttrName);

          if (attrValue != null) {
            zrStyle[attributesMap[svgAttrName]] = attrValue;
          }
        }
      }
    }
  }

  var elFillProp = isTextEl ? 'textFill' : 'fill';
  var elStrokeProp = isTextEl ? 'textStroke' : 'stroke';
  el.style = el.style || new Style();
  var elStyle = el.style;
  zrStyle.fill != null && elStyle.set(elFillProp, getPaint(zrStyle.fill, defs));
  zrStyle.stroke != null && elStyle.set(elStrokeProp, getPaint(zrStyle.stroke, defs));
  each(['lineWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'miterLimit', 'fontSize'], function (propName) {
    var elPropName = propName === 'lineWidth' && isTextEl ? 'textStrokeWidth' : propName;
    zrStyle[propName] != null && elStyle.set(elPropName, parseFloat(zrStyle[propName]));
  });

  if (!zrStyle.textBaseline || zrStyle.textBaseline === 'auto') {
    zrStyle.textBaseline = 'alphabetic';
  }

  if (zrStyle.textBaseline === 'alphabetic') {
    zrStyle.textBaseline = 'bottom';
  }

  if (zrStyle.textAlign === 'start') {
    zrStyle.textAlign = 'left';
  }

  if (zrStyle.textAlign === 'end') {
    zrStyle.textAlign = 'right';
  }

  each(['lineDashOffset', 'lineCap', 'lineJoin', 'fontWeight', 'fontFamily', 'fontStyle', 'textAlign', 'textBaseline'], function (propName) {
    zrStyle[propName] != null && elStyle.set(propName, zrStyle[propName]);
  });

  if (zrStyle.lineDash) {
    el.style.lineDash = trim(zrStyle.lineDash).split(DILIMITER_REG);
  }

  if (elStyle[elStrokeProp] && elStyle[elStrokeProp] !== 'none') {
    // enable stroke
    el[elStrokeProp] = true;
  }

  el.__inheritedStyle = zrStyle;
}

var urlRegex = /url\(\s*#(.*?)\)/;

function getPaint(str, defs) {
  // if (str === 'none') {
  //     return;
  // }
  var urlMatch = defs && str && str.match(urlRegex);

  if (urlMatch) {
    var url = trim(urlMatch[1]);
    var def = defs[url];
    return def;
  }

  return str;
}

var transformRegex = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g;

function parseTransformAttribute(xmlNode, node) {
  var transform = xmlNode.getAttribute('transform');

  if (transform) {
    transform = transform.replace(/,/g, ' ');
    var m = null;
    var transformOps = [];
    transform.replace(transformRegex, function (str, type, value) {
      transformOps.push(type, value);
    });

    for (var i = transformOps.length - 1; i > 0; i -= 2) {
      var value = transformOps[i];
      var type = transformOps[i - 1];
      m = m || matrix.create();

      switch (type) {
        case 'translate':
          value = trim(value).split(DILIMITER_REG);
          matrix.translate(m, m, [parseFloat(value[0]), parseFloat(value[1] || 0)]);
          break;

        case 'scale':
          value = trim(value).split(DILIMITER_REG);
          matrix.scale(m, m, [parseFloat(value[0]), parseFloat(value[1] || value[0])]);
          break;

        case 'rotate':
          value = trim(value).split(DILIMITER_REG);
          matrix.rotate(m, m, parseFloat(value[0]));
          break;

        case 'skew':
          value = trim(value).split(DILIMITER_REG);
          console.warn('Skew transform is not supported yet');
          break;

        case 'matrix':
          var value = trim(value).split(DILIMITER_REG);
          m[0] = parseFloat(value[0]);
          m[1] = parseFloat(value[1]);
          m[2] = parseFloat(value[2]);
          m[3] = parseFloat(value[3]);
          m[4] = parseFloat(value[4]);
          m[5] = parseFloat(value[5]);
          break;
      }
    }

    node.setLocalTransform(m);
  }
} // Value may contain space.


var styleRegex = /([^\s:;]+)\s*:\s*([^:;]+)/g;

function parseStyleAttribute(xmlNode) {
  var style = xmlNode.getAttribute('style');
  var result = {};

  if (!style) {
    return result;
  }

  var styleList = {};
  styleRegex.lastIndex = 0;
  var styleRegResult;

  while ((styleRegResult = styleRegex.exec(style)) != null) {
    styleList[styleRegResult[1]] = styleRegResult[2];
  }

  for (var svgAttrName in attributesMap) {
    if (attributesMap.hasOwnProperty(svgAttrName) && styleList[svgAttrName] != null) {
      result[attributesMap[svgAttrName]] = styleList[svgAttrName];
    }
  }

  return result;
}
/**
 * @param {Array.<number>} viewBoxRect
 * @param {number} width
 * @param {number} height
 * @return {Object} {scale, position}
 */


function makeViewBoxTransform(viewBoxRect, width, height) {
  var scaleX = width / viewBoxRect.width;
  var scaleY = height / viewBoxRect.height;
  var scale = Math.min(scaleX, scaleY); // preserveAspectRatio 'xMidYMid'

  var viewBoxScale = [scale, scale];
  var viewBoxPosition = [-(viewBoxRect.x + viewBoxRect.width / 2) * scale + width / 2, -(viewBoxRect.y + viewBoxRect.height / 2) * scale + height / 2];
  return {
    scale: viewBoxScale,
    position: viewBoxPosition
  };
}
/**
 * @param {string|XMLElement} xml
 * @param {Object} [opt]
 * @param {number} [opt.width] Default width if svg width not specified or is a percent value.
 * @param {number} [opt.height] Default height if svg height not specified or is a percent value.
 * @param {boolean} [opt.ignoreViewBox]
 * @param {boolean} [opt.ignoreRootClip]
 * @return {Object} result:
 * {
 *     root: Group, The root of the the result tree of zrender shapes,
 *     width: number, the viewport width of the SVG,
 *     height: number, the viewport height of the SVG,
 *     viewBoxRect: {x, y, width, height}, the declared viewBox rect of the SVG, if exists,
 *     viewBoxTransform: the {scale, position} calculated by viewBox and viewport, is exists.
 * }
 */


function parseSVG(xml, opt) {
  var parser = new SVGParser();
  return parser.parse(xml, opt);
}

exports.parseXML = parseXML;
exports.makeViewBoxTransform = makeViewBoxTransform;
exports.parseSVG = parseSVG;

/***/ }),

/***/ "342d":
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__("cbe5");

var PathProxy = __webpack_require__("20c8");

var transformPath = __webpack_require__("ee84");

// command chars
// var cc = [
//     'm', 'M', 'l', 'L', 'v', 'V', 'h', 'H', 'z', 'Z',
//     'c', 'C', 'q', 'Q', 't', 'T', 's', 'S', 'a', 'A'
// ];
var mathSqrt = Math.sqrt;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;

var vMag = function (v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

var vRatio = function (u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
};

var vAngle = function (u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
};

function processArc(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg, cmd, path) {
  var psi = psiDeg * (PI / 180.0);
  var xp = mathCos(psi) * (x1 - x2) / 2.0 + mathSin(psi) * (y1 - y2) / 2.0;
  var yp = -1 * mathSin(psi) * (x1 - x2) / 2.0 + mathCos(psi) * (y1 - y2) / 2.0;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

  if (lambda > 1) {
    rx *= mathSqrt(lambda);
    ry *= mathSqrt(lambda);
  }

  var f = (fa === fs ? -1 : 1) * mathSqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0;
  var cxp = f * rx * yp / ry;
  var cyp = f * -ry * xp / rx;
  var cx = (x1 + x2) / 2.0 + mathCos(psi) * cxp - mathSin(psi) * cyp;
  var cy = (y1 + y2) / 2.0 + mathSin(psi) * cxp + mathCos(psi) * cyp;
  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var dTheta = vAngle(u, v);

  if (vRatio(u, v) <= -1) {
    dTheta = PI;
  }

  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }

  if (fs === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * PI;
  }

  if (fs === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * PI;
  }

  path.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs);
}

var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig; // Consider case:
// (1) delimiter can be comma or space, where continuous commas
// or spaces should be seen as one comma.
// (2) value can be like:
// '2e-4', 'l.5.9' (ignore 0), 'M-10-10', 'l-2.43e-1,34.9983',
// 'l-.5E1,54', '121-23-44-11' (no delimiter)

var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g; // var valueSplitReg = /[\s,]+/;

function createPathProxyFromString(data) {
  if (!data) {
    return new PathProxy();
  } // var data = data.replace(/-/g, ' -')
  //     .replace(/  /g, ' ')
  //     .replace(/ /g, ',')
  //     .replace(/,,/g, ',');
  // var n;
  // create pipes so that we can split the data
  // for (n = 0; n < cc.length; n++) {
  //     cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
  // }
  // data = data.replace(/-/g, ',-');
  // create array
  // var arr = cs.split('|');
  // init context point


  var cpx = 0;
  var cpy = 0;
  var subpathX = cpx;
  var subpathY = cpy;
  var prevCmd;
  var path = new PathProxy();
  var CMD = PathProxy.CMD; // commandReg.lastIndex = 0;
  // var cmdResult;
  // while ((cmdResult = commandReg.exec(data)) != null) {
  //     var cmdStr = cmdResult[1];
  //     var cmdContent = cmdResult[2];

  var cmdList = data.match(commandReg);

  for (var l = 0; l < cmdList.length; l++) {
    var cmdText = cmdList[l];
    var cmdStr = cmdText.charAt(0);
    var cmd; // String#split is faster a little bit than String#replace or RegExp#exec.
    // var p = cmdContent.split(valueSplitReg);
    // var pLen = 0;
    // for (var i = 0; i < p.length; i++) {
    //     // '' and other invalid str => NaN
    //     var val = parseFloat(p[i]);
    //     !isNaN(val) && (p[pLen++] = val);
    // }

    var p = cmdText.match(numberReg) || [];
    var pLen = p.length;

    for (var i = 0; i < pLen; i++) {
      p[i] = parseFloat(p[i]);
    }

    var off = 0;

    while (off < pLen) {
      var ctlPtx;
      var ctlPty;
      var rx;
      var ry;
      var psi;
      var fa;
      var fs;
      var x1 = cpx;
      var y1 = cpy; // convert l, H, h, V, and v to L

      switch (cmdStr) {
        case 'l':
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'L':
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'm':
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = 'l';
          break;

        case 'M':
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.M;
          path.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = 'L';
          break;

        case 'h':
          cpx += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'H':
          cpx = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'v':
          cpy += p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'V':
          cpy = p[off++];
          cmd = CMD.L;
          path.addData(cmd, cpx, cpy);
          break;

        case 'C':
          cmd = CMD.C;
          path.addData(cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]);
          cpx = p[off - 2];
          cpy = p[off - 1];
          break;

        case 'c':
          cmd = CMD.C;
          path.addData(cmd, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy);
          cpx += p[off - 2];
          cpy += p[off - 1];
          break;

        case 'S':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.C) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cmd = CMD.C;
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;

        case 's':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.C) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cmd = CMD.C;
          x1 = cpx + p[off++];
          y1 = cpy + p[off++];
          cpx += p[off++];
          cpy += p[off++];
          path.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;

        case 'Q':
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;

        case 'q':
          x1 = p[off++] + cpx;
          y1 = p[off++] + cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.Q;
          path.addData(cmd, x1, y1, cpx, cpy);
          break;

        case 'T':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.Q) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;

        case 't':
          ctlPtx = cpx;
          ctlPty = cpy;
          var len = path.len();
          var pathData = path.data;

          if (prevCmd === CMD.Q) {
            ctlPtx += cpx - pathData[len - 4];
            ctlPty += cpy - pathData[len - 3];
          }

          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.Q;
          path.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;

        case 'A':
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs = p[off++];
          x1 = cpx, y1 = cpy;
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;

        case 'a':
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs = p[off++];
          x1 = cpx, y1 = cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD.A;
          processArc(x1, y1, cpx, cpy, fa, fs, rx, ry, psi, cmd, path);
          break;
      }
    }

    if (cmdStr === 'z' || cmdStr === 'Z') {
      cmd = CMD.Z;
      path.addData(cmd); // z may be in the middle of the path.

      cpx = subpathX;
      cpy = subpathY;
    }

    prevCmd = cmd;
  }

  path.toStatic();
  return path;
} // TODO Optimize double memory cost problem


function createPathOptions(str, opts) {
  var pathProxy = createPathProxyFromString(str);
  opts = opts || {};

  opts.buildPath = function (path) {
    if (path.setData) {
      path.setData(pathProxy.data); // Svg and vml renderer don't have context

      var ctx = path.getContext();

      if (ctx) {
        path.rebuildPath(ctx);
      }
    } else {
      var ctx = path;
      pathProxy.rebuildPath(ctx);
    }
  };

  opts.applyTransform = function (m) {
    transformPath(pathProxy, m);
    this.dirty(true);
  };

  return opts;
}
/**
 * Create a Path object from path string data
 * http://www.w3.org/TR/SVG/paths.html#PathData
 * @param  {Object} opts Other options
 */


function createFromString(str, opts) {
  return new Path(createPathOptions(str, opts));
}
/**
 * Create a Path class from path string data
 * @param  {string} str
 * @param  {Object} opts Other options
 */


function extendFromString(str, opts) {
  return Path.extend(createPathOptions(str, opts));
}
/**
 * Merge multiple paths
 */
// TODO Apply transform
// TODO stroke dash
// TODO Optimize double memory cost problem


function mergePath(pathEls, opts) {
  var pathList = [];
  var len = pathEls.length;

  for (var i = 0; i < len; i++) {
    var pathEl = pathEls[i];

    if (!pathEl.path) {
      pathEl.createPathProxy();
    }

    if (pathEl.__dirtyPath) {
      pathEl.buildPath(pathEl.path, pathEl.shape, true);
    }

    pathList.push(pathEl.path);
  }

  var pathBundle = new Path(opts); // Need path proxy.

  pathBundle.createPathProxy();

  pathBundle.buildPath = function (path) {
    path.appendPath(pathList); // Svg and vml renderer don't have context

    var ctx = path.getContext();

    if (ctx) {
      path.rebuildPath(ctx);
    }
  };

  return pathBundle;
}

exports.createFromString = createFromString;
exports.extendFromString = extendFromString;
exports.mergePath = mergePath;

/***/ }),

/***/ "41ef":
/***/ (function(module, exports, __webpack_require__) {

var LRU = __webpack_require__("d51b");

var kCSSColorTable = {
  'transparent': [0, 0, 0, 0],
  'aliceblue': [240, 248, 255, 1],
  'antiquewhite': [250, 235, 215, 1],
  'aqua': [0, 255, 255, 1],
  'aquamarine': [127, 255, 212, 1],
  'azure': [240, 255, 255, 1],
  'beige': [245, 245, 220, 1],
  'bisque': [255, 228, 196, 1],
  'black': [0, 0, 0, 1],
  'blanchedalmond': [255, 235, 205, 1],
  'blue': [0, 0, 255, 1],
  'blueviolet': [138, 43, 226, 1],
  'brown': [165, 42, 42, 1],
  'burlywood': [222, 184, 135, 1],
  'cadetblue': [95, 158, 160, 1],
  'chartreuse': [127, 255, 0, 1],
  'chocolate': [210, 105, 30, 1],
  'coral': [255, 127, 80, 1],
  'cornflowerblue': [100, 149, 237, 1],
  'cornsilk': [255, 248, 220, 1],
  'crimson': [220, 20, 60, 1],
  'cyan': [0, 255, 255, 1],
  'darkblue': [0, 0, 139, 1],
  'darkcyan': [0, 139, 139, 1],
  'darkgoldenrod': [184, 134, 11, 1],
  'darkgray': [169, 169, 169, 1],
  'darkgreen': [0, 100, 0, 1],
  'darkgrey': [169, 169, 169, 1],
  'darkkhaki': [189, 183, 107, 1],
  'darkmagenta': [139, 0, 139, 1],
  'darkolivegreen': [85, 107, 47, 1],
  'darkorange': [255, 140, 0, 1],
  'darkorchid': [153, 50, 204, 1],
  'darkred': [139, 0, 0, 1],
  'darksalmon': [233, 150, 122, 1],
  'darkseagreen': [143, 188, 143, 1],
  'darkslateblue': [72, 61, 139, 1],
  'darkslategray': [47, 79, 79, 1],
  'darkslategrey': [47, 79, 79, 1],
  'darkturquoise': [0, 206, 209, 1],
  'darkviolet': [148, 0, 211, 1],
  'deeppink': [255, 20, 147, 1],
  'deepskyblue': [0, 191, 255, 1],
  'dimgray': [105, 105, 105, 1],
  'dimgrey': [105, 105, 105, 1],
  'dodgerblue': [30, 144, 255, 1],
  'firebrick': [178, 34, 34, 1],
  'floralwhite': [255, 250, 240, 1],
  'forestgreen': [34, 139, 34, 1],
  'fuchsia': [255, 0, 255, 1],
  'gainsboro': [220, 220, 220, 1],
  'ghostwhite': [248, 248, 255, 1],
  'gold': [255, 215, 0, 1],
  'goldenrod': [218, 165, 32, 1],
  'gray': [128, 128, 128, 1],
  'green': [0, 128, 0, 1],
  'greenyellow': [173, 255, 47, 1],
  'grey': [128, 128, 128, 1],
  'honeydew': [240, 255, 240, 1],
  'hotpink': [255, 105, 180, 1],
  'indianred': [205, 92, 92, 1],
  'indigo': [75, 0, 130, 1],
  'ivory': [255, 255, 240, 1],
  'khaki': [240, 230, 140, 1],
  'lavender': [230, 230, 250, 1],
  'lavenderblush': [255, 240, 245, 1],
  'lawngreen': [124, 252, 0, 1],
  'lemonchiffon': [255, 250, 205, 1],
  'lightblue': [173, 216, 230, 1],
  'lightcoral': [240, 128, 128, 1],
  'lightcyan': [224, 255, 255, 1],
  'lightgoldenrodyellow': [250, 250, 210, 1],
  'lightgray': [211, 211, 211, 1],
  'lightgreen': [144, 238, 144, 1],
  'lightgrey': [211, 211, 211, 1],
  'lightpink': [255, 182, 193, 1],
  'lightsalmon': [255, 160, 122, 1],
  'lightseagreen': [32, 178, 170, 1],
  'lightskyblue': [135, 206, 250, 1],
  'lightslategray': [119, 136, 153, 1],
  'lightslategrey': [119, 136, 153, 1],
  'lightsteelblue': [176, 196, 222, 1],
  'lightyellow': [255, 255, 224, 1],
  'lime': [0, 255, 0, 1],
  'limegreen': [50, 205, 50, 1],
  'linen': [250, 240, 230, 1],
  'magenta': [255, 0, 255, 1],
  'maroon': [128, 0, 0, 1],
  'mediumaquamarine': [102, 205, 170, 1],
  'mediumblue': [0, 0, 205, 1],
  'mediumorchid': [186, 85, 211, 1],
  'mediumpurple': [147, 112, 219, 1],
  'mediumseagreen': [60, 179, 113, 1],
  'mediumslateblue': [123, 104, 238, 1],
  'mediumspringgreen': [0, 250, 154, 1],
  'mediumturquoise': [72, 209, 204, 1],
  'mediumvioletred': [199, 21, 133, 1],
  'midnightblue': [25, 25, 112, 1],
  'mintcream': [245, 255, 250, 1],
  'mistyrose': [255, 228, 225, 1],
  'moccasin': [255, 228, 181, 1],
  'navajowhite': [255, 222, 173, 1],
  'navy': [0, 0, 128, 1],
  'oldlace': [253, 245, 230, 1],
  'olive': [128, 128, 0, 1],
  'olivedrab': [107, 142, 35, 1],
  'orange': [255, 165, 0, 1],
  'orangered': [255, 69, 0, 1],
  'orchid': [218, 112, 214, 1],
  'palegoldenrod': [238, 232, 170, 1],
  'palegreen': [152, 251, 152, 1],
  'paleturquoise': [175, 238, 238, 1],
  'palevioletred': [219, 112, 147, 1],
  'papayawhip': [255, 239, 213, 1],
  'peachpuff': [255, 218, 185, 1],
  'peru': [205, 133, 63, 1],
  'pink': [255, 192, 203, 1],
  'plum': [221, 160, 221, 1],
  'powderblue': [176, 224, 230, 1],
  'purple': [128, 0, 128, 1],
  'red': [255, 0, 0, 1],
  'rosybrown': [188, 143, 143, 1],
  'royalblue': [65, 105, 225, 1],
  'saddlebrown': [139, 69, 19, 1],
  'salmon': [250, 128, 114, 1],
  'sandybrown': [244, 164, 96, 1],
  'seagreen': [46, 139, 87, 1],
  'seashell': [255, 245, 238, 1],
  'sienna': [160, 82, 45, 1],
  'silver': [192, 192, 192, 1],
  'skyblue': [135, 206, 235, 1],
  'slateblue': [106, 90, 205, 1],
  'slategray': [112, 128, 144, 1],
  'slategrey': [112, 128, 144, 1],
  'snow': [255, 250, 250, 1],
  'springgreen': [0, 255, 127, 1],
  'steelblue': [70, 130, 180, 1],
  'tan': [210, 180, 140, 1],
  'teal': [0, 128, 128, 1],
  'thistle': [216, 191, 216, 1],
  'tomato': [255, 99, 71, 1],
  'turquoise': [64, 224, 208, 1],
  'violet': [238, 130, 238, 1],
  'wheat': [245, 222, 179, 1],
  'white': [255, 255, 255, 1],
  'whitesmoke': [245, 245, 245, 1],
  'yellow': [255, 255, 0, 1],
  'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {
  // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {
  // Clamp to integer 0 .. 360.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {
  // int or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssByte(parseFloat(str) / 100 * 255);
  }

  return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) {
  // float or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssFloat(parseFloat(str) / 100);
  }

  return clampCssFloat(parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
  if (h < 0) {
    h += 1;
  } else if (h > 1) {
    h -= 1;
  }

  if (h * 6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  }

  if (h * 2 < 1) {
    return m2;
  }

  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }

  return m1;
}

function lerpNumber(a, b, p) {
  return a + (b - a) * p;
}

function setRgba(out, r, g, b, a) {
  out[0] = r;
  out[1] = g;
  out[2] = b;
  out[3] = a;
  return out;
}

function copyRgba(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

var colorCache = new LRU(20);
var lastRemovedArr = null;

function putToCache(colorStr, rgbaArr) {
  // Reuse removed array
  if (lastRemovedArr) {
    copyRgba(lastRemovedArr, rgbaArr);
  }

  lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice());
}
/**
 * @param {string} colorStr
 * @param {Array.<number>} out
 * @return {Array.<number>}
 * @memberOf module:zrender/util/color
 */


function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }

  rgbaArr = rgbaArr || [];
  var cached = colorCache.get(colorStr);

  if (cached) {
    return copyRgba(rgbaArr, cached);
  } // colorStr may be not string


  colorStr = colorStr + ''; // Remove all whitespace, not compliant, but should just be more accepting.

  var str = colorStr.replace(/ /g, '').toLowerCase(); // Color keywords (and transparent) lookup.

  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    putToCache(colorStr, rgbaArr);
    return rgbaArr;
  } // #abc and #abc123 syntax.


  if (str.charAt(0) === '#') {
    if (str.length === 4) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.

      if (!(iv >= 0 && iv <= 0xfff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (iv & 0xf00) >> 4 | (iv & 0xf00) >> 8, iv & 0xf0 | (iv & 0xf0) >> 4, iv & 0xf | (iv & 0xf) << 4, 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    } else if (str.length === 7) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.

      if (!(iv >= 0 && iv <= 0xffffff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    }

    return;
  }

  var op = str.indexOf('(');
  var ep = str.indexOf(')');

  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(',');
    var alpha = 1; // To allow case fallthrough.

    switch (fname) {
      case 'rgba':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        alpha = parseCssFloat(params.pop());
      // jshint ignore:line
      // Fall through.

      case 'rgb':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      case 'hsla':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        params[3] = parseCssFloat(params[3]);
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      case 'hsl':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;

      default:
        return;
    }
  }

  setRgba(rgbaArr, 0, 0, 0, 1);
  return;
}
/**
 * @param {Array.<number>} hsla
 * @param {Array.<number>} rgba
 * @return {Array.<number>} rgba
 */


function hsla2rgba(hsla, rgba) {
  var h = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360; // 0 .. 1
  // NOTE(deanm): According to the CSS spec s/l should only be
  // percentages, but we don't bother and let float or percentage.

  var s = parseCssFloat(hsla[1]);
  var l = parseCssFloat(hsla[2]);
  var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  var m1 = l * 2 - m2;
  rgba = rgba || [];
  setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);

  if (hsla.length === 4) {
    rgba[3] = hsla[3];
  }

  return rgba;
}
/**
 * @param {Array.<number>} rgba
 * @return {Array.<number>} hsla
 */


function rgba2hsla(rgba) {
  if (!rgba) {
    return;
  } // RGB from 0 to 255


  var R = rgba[0] / 255;
  var G = rgba[1] / 255;
  var B = rgba[2] / 255;
  var vMin = Math.min(R, G, B); // Min. value of RGB

  var vMax = Math.max(R, G, B); // Max. value of RGB

  var delta = vMax - vMin; // Delta RGB value

  var L = (vMax + vMin) / 2;
  var H;
  var S; // HSL results from 0 to 1

  if (delta === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = delta / (vMax + vMin);
    } else {
      S = delta / (2 - vMax - vMin);
    }

    var deltaR = ((vMax - R) / 6 + delta / 2) / delta;
    var deltaG = ((vMax - G) / 6 + delta / 2) / delta;
    var deltaB = ((vMax - B) / 6 + delta / 2) / delta;

    if (R === vMax) {
      H = deltaB - deltaG;
    } else if (G === vMax) {
      H = 1 / 3 + deltaR - deltaB;
    } else if (B === vMax) {
      H = 2 / 3 + deltaG - deltaR;
    }

    if (H < 0) {
      H += 1;
    }

    if (H > 1) {
      H -= 1;
    }
  }

  var hsla = [H * 360, S, L];

  if (rgba[3] != null) {
    hsla.push(rgba[3]);
  }

  return hsla;
}
/**
 * @param {string} color
 * @param {number} level
 * @return {string}
 * @memberOf module:zrender/util/color
 */


function lift(color, level) {
  var colorArr = parse(color);

  if (colorArr) {
    for (var i = 0; i < 3; i++) {
      if (level < 0) {
        colorArr[i] = colorArr[i] * (1 - level) | 0;
      } else {
        colorArr[i] = (255 - colorArr[i]) * level + colorArr[i] | 0;
      }

      if (colorArr[i] > 255) {
        colorArr[i] = 255;
      } else if (color[i] < 0) {
        colorArr[i] = 0;
      }
    }

    return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
  }
}
/**
 * @param {string} color
 * @return {string}
 * @memberOf module:zrender/util/color
 */


function toHex(color) {
  var colorArr = parse(color);

  if (colorArr) {
    return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + +colorArr[2]).toString(16).slice(1);
  }
}
/**
 * Map value to color. Faster than lerp methods because color is represented by rgba array.
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<Array.<number>>} colors List of rgba color array
 * @param {Array.<number>} [out] Mapped gba color array
 * @return {Array.<number>} will be null/undefined if input illegal.
 */


function fastLerp(normalizedValue, colors, out) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  out = out || [];
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = colors[leftIndex];
  var rightColor = colors[rightIndex];
  var dv = value - leftIndex;
  out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
  out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
  out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
  out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
  return out;
}
/**
 * @deprecated
 */


var fastMapToColor = fastLerp;
/**
 * @param {number} normalizedValue A float between 0 and 1.
 * @param {Array.<string>} colors Color list.
 * @param {boolean=} fullOutput Default false.
 * @return {(string|Object)} Result color. If fullOutput,
 *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
 * @memberOf module:zrender/util/color
 */

function lerp(normalizedValue, colors, fullOutput) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = parse(colors[leftIndex]);
  var rightColor = parse(colors[rightIndex]);
  var dv = value - leftIndex;
  var color = stringify([clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)), clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)), clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)), clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))], 'rgba');
  return fullOutput ? {
    color: color,
    leftIndex: leftIndex,
    rightIndex: rightIndex,
    value: value
  } : color;
}
/**
 * @deprecated
 */


var mapToColor = lerp;
/**
 * @param {string} color
 * @param {number=} h 0 ~ 360, ignore when null.
 * @param {number=} s 0 ~ 1, ignore when null.
 * @param {number=} l 0 ~ 1, ignore when null.
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */

function modifyHSL(color, h, s, l) {
  color = parse(color);

  if (color) {
    color = rgba2hsla(color);
    h != null && (color[0] = clampCssAngle(h));
    s != null && (color[1] = parseCssFloat(s));
    l != null && (color[2] = parseCssFloat(l));
    return stringify(hsla2rgba(color), 'rgba');
  }
}
/**
 * @param {string} color
 * @param {number=} alpha 0 ~ 1
 * @return {string} Color string in rgba format.
 * @memberOf module:zrender/util/color
 */


function modifyAlpha(color, alpha) {
  color = parse(color);

  if (color && alpha != null) {
    color[3] = clampCssFloat(alpha);
    return stringify(color, 'rgba');
  }
}
/**
 * @param {Array.<number>} arrColor like [12,33,44,0.4]
 * @param {string} type 'rgba', 'hsva', ...
 * @return {string} Result color. (If input illegal, return undefined).
 */


function stringify(arrColor, type) {
  if (!arrColor || !arrColor.length) {
    return;
  }

  var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];

  if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
    colorStr += ',' + arrColor[3];
  }

  return type + '(' + colorStr + ')';
}

exports.parse = parse;
exports.lift = lift;
exports.toHex = toHex;
exports.fastLerp = fastLerp;
exports.fastMapToColor = fastMapToColor;
exports.lerp = lerp;
exports.mapToColor = mapToColor;
exports.modifyHSL = modifyHSL;
exports.modifyAlpha = modifyAlpha;
exports.stringify = stringify;

/***/ }),

/***/ "ee84":
/***/ (function(module, exports, __webpack_require__) {

var PathProxy = __webpack_require__("20c8");

var _vector = __webpack_require__("401b");

var v2ApplyTransform = _vector.applyTransform;
var CMD = PathProxy.CMD;
var points = [[], [], []];
var mathSqrt = Math.sqrt;
var mathAtan2 = Math.atan2;

function _default(path, m) {
  var data = path.data;
  var cmd;
  var nPoint;
  var i;
  var j;
  var k;
  var p;
  var M = CMD.M;
  var C = CMD.C;
  var L = CMD.L;
  var R = CMD.R;
  var A = CMD.A;
  var Q = CMD.Q;

  for (i = 0, j = 0; i < data.length;) {
    cmd = data[i++];
    j = i;
    nPoint = 0;

    switch (cmd) {
      case M:
        nPoint = 1;
        break;

      case L:
        nPoint = 1;
        break;

      case C:
        nPoint = 3;
        break;

      case Q:
        nPoint = 2;
        break;

      case A:
        var x = m[4];
        var y = m[5];
        var sx = mathSqrt(m[0] * m[0] + m[1] * m[1]);
        var sy = mathSqrt(m[2] * m[2] + m[3] * m[3]);
        var angle = mathAtan2(-m[1] / sy, m[0] / sx); // cx

        data[i] *= sx;
        data[i++] += x; // cy

        data[i] *= sy;
        data[i++] += y; // Scale rx and ry
        // FIXME Assume psi is 0 here

        data[i++] *= sx;
        data[i++] *= sy; // Start angle

        data[i++] += angle; // end angle

        data[i++] += angle; // FIXME psi

        i += 2;
        j = i;
        break;

      case R:
        // x0, y0
        p[0] = data[i++];
        p[1] = data[i++];
        v2ApplyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1]; // x1, y1

        p[0] += data[i++];
        p[1] += data[i++];
        v2ApplyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1];
    }

    for (k = 0; k < nPoint; k++) {
      var p = points[k];
      p[0] = data[i++];
      p[1] = data[i++];
      v2ApplyTransform(p, p, m); // Write back

      data[j++] = p[0];
      data[j++] = p[1];
    }
  }
}

module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~7621f983.206e4ed4.js.map