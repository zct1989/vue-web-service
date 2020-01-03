(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~35c1050b"],{

/***/ "00bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function emoji_html(tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/***/ }),

/***/ "33db":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _clone = _interopRequireDefault(__webpack_require__("2410"));

var _uslug = _interopRequireDefault(__webpack_require__("19dd"));

var _token = _interopRequireDefault(__webpack_require__("096b"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOC = "@[toc]";
var TOC_RE = /^@\[toc\]/im;

var markdownItSecondInstance = function markdownItSecondInstance() {};

var headingIds = {};
var tocHtml = "";

var repeat = function repeat(string, num) {
  return new Array(num + 1).join(string);
};

var makeSafe = function makeSafe(string, headingIds, slugifyFn) {
  var key = slugifyFn(string); // slugify

  if (!headingIds[key]) {
    headingIds[key] = 0;
  }

  headingIds[key]++;
  return key + (headingIds[key] > 1 ? "-".concat(headingIds[key]) : "");
};

var space = function space() {
  return _objectSpread({}, new _token.default("text", "", 0), {
    content: " "
  });
};

var renderAnchorLinkSymbol = function renderAnchorLinkSymbol(options) {
  if (options.anchorLinkSymbolClassName) {
    return [_objectSpread({}, new _token.default("span_open", "span", 1), {
      attrs: [["class", options.anchorLinkSymbolClassName]]
    }), _objectSpread({}, new _token.default("text", "", 0), {
      content: options.anchorLinkSymbol
    }), new _token.default("span_close", "span", -1)];
  } else {
    return [_objectSpread({}, new _token.default("text", "", 0), {
      content: options.anchorLinkSymbol
    })];
  }
};

var renderAnchorLink = function renderAnchorLink(anchor, options, tokens, idx) {
  var attrs = [];

  if (options.anchorClassName != null) {
    attrs.push(["class", options.anchorClassName]);
  }

  attrs.push(["href", "#".concat(anchor)]);

  var openLinkToken = _objectSpread({}, new _token.default("link_open", "a", 1), {
    attrs: attrs
  });

  var closeLinkToken = new _token.default("link_close", "a", -1);

  if (options.wrapHeadingTextInAnchor) {
    tokens[idx + 1].children.unshift(openLinkToken);
    tokens[idx + 1].children.push(closeLinkToken);
  } else {
    var _tokens$children;

    var linkTokens = [openLinkToken].concat(_toConsumableArray(renderAnchorLinkSymbol(options)), [closeLinkToken]); // `push` or `unshift` according to anchorLinkBefore option
    // space is at the opposite side.

    var actionOnArray = {
      false: "push",
      true: "unshift"
    }; // insert space between anchor link and heading ?

    if (options.anchorLinkSpace) {
      linkTokens[actionOnArray[!options.anchorLinkBefore]](space());
    }

    (_tokens$children = tokens[idx + 1].children)[actionOnArray[options.anchorLinkBefore]].apply(_tokens$children, _toConsumableArray(linkTokens));
  }
};

var treeToMarkdownBulletList = function treeToMarkdownBulletList(tree) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return tree.map(function (item) {
    var indentation = "  ";
    var node = "".concat(repeat(indentation, indent), "*");

    if (item.heading.content) {
      var contentWithoutAnchor = item.heading.content.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
      node += " " + "[".concat(contentWithoutAnchor, "](#").concat(item.heading.anchor, ")\n");
    } else {
      node += "\n";
    }

    if (item.nodes.length) {
      node += treeToMarkdownBulletList(item.nodes, indent + 1);
    }

    return node;
  }).join("");
};

var generateTocMarkdownFromArray = function generateTocMarkdownFromArray(headings, options) {
  var tree = {
    nodes: []
  }; // create an ast

  headings.forEach(function (heading) {
    if (heading.level < options.tocFirstLevel || heading.level > options.tocLastLevel) {
      return;
    }

    var i = 1;
    var lastItem = tree;

    for (; i < heading.level - options.tocFirstLevel + 1; i++) {
      if (lastItem.nodes.length === 0) {
        lastItem.nodes.push({
          heading: {},
          nodes: []
        });
      }

      lastItem = lastItem.nodes[lastItem.nodes.length - 1];
    }

    lastItem.nodes.push({
      heading: heading,
      nodes: []
    });
  });
  return treeToMarkdownBulletList(tree.nodes);
};

function _default(md, options) {
  options = _objectSpread({
    toc: true,
    tocClassName: "markdownIt-TOC",
    tocFirstLevel: 1,
    tocLastLevel: 6,
    tocCallback: null,
    anchorLink: true,
    anchorLinkSymbol: "#",
    anchorLinkBefore: true,
    anchorClassName: "markdownIt-Anchor",
    resetIds: true,
    anchorLinkSpace: true,
    anchorLinkSymbolClassName: null,
    wrapHeadingTextInAnchor: false
  }, options);
  markdownItSecondInstance = (0, _clone.default)(md); // initialize key ids for each instance

  headingIds = {};
  md.core.ruler.push("init_toc", function (state) {
    var tokens = state.tokens; // reset key ids for each document

    if (options.resetIds) {
      headingIds = {};
    }

    var tocArray = [];
    var tocMarkdown = "";
    var tocTokens = [];
    var slugifyFn = typeof options.slugify === "function" && options.slugify || _uslug.default;

    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "heading_close") {
        continue;
      }

      var heading = tokens[i - 1];
      var heading_close = tokens[i];

      if (heading.type === "inline") {
        var content = void 0;

        if (heading.children && heading.children.length > 0 && heading.children[0].type === "link_open") {
          // headings that contain links have to be processed
          // differently since nested links aren't allowed in markdown
          content = heading.children[1].content;
          heading._tocAnchor = makeSafe(content, headingIds, slugifyFn);
        } else {
          content = heading.content;
          heading._tocAnchor = makeSafe(heading.children.reduce(function (acc, t) {
            return acc + t.content;
          }, ""), headingIds, slugifyFn);
        }

        if (options.anchorLinkPrefix) {
          heading._tocAnchor = options.anchorLinkPrefix + heading._tocAnchor;
        }

        tocArray.push({
          content: content,
          anchor: heading._tocAnchor,
          level: +heading_close.tag.substr(1, 1)
        });
      }
    }

    tocMarkdown = generateTocMarkdownFromArray(tocArray, options);
    tocTokens = markdownItSecondInstance.parse(tocMarkdown, {}); // Adding tocClassName to 'ul' element

    if (_typeof(tocTokens[0]) === "object" && tocTokens[0].type === "bullet_list_open") {
      var attrs = tocTokens[0].attrs = tocTokens[0].attrs || [];

      if (options.tocClassName != null) {
        attrs.push(["class", options.tocClassName]);
      }
    }

    tocHtml = markdownItSecondInstance.renderer.render(tocTokens, markdownItSecondInstance.options);

    if (typeof state.env.tocCallback === "function") {
      state.env.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    } else if (typeof options.tocCallback === "function") {
      options.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    } else if (typeof md.options.tocCallback === "function") {
      md.options.tocCallback.call(undefined, tocMarkdown, tocArray, tocHtml);
    }
  });
  md.inline.ruler.after("emphasis", "toc", function (state, silent) {
    var token;
    var match;

    if ( // Reject if the token does not start with @[
    state.src.charCodeAt(state.pos) !== 0x40 || state.src.charCodeAt(state.pos + 1) !== 0x5b || // Don’t run any pairs in validation mode
    silent) {
      return false;
    } // Detect TOC markdown


    match = TOC_RE.exec(state.src);
    match = !match ? [] : match.filter(function (m) {
      return m;
    });

    if (match.length < 1) {
      return false;
    } // Build content


    token = state.push("toc_open", "toc", 1);
    token.markup = TOC;
    token = state.push("toc_body", "", 0);
    token = state.push("toc_close", "toc", -1); // Update pos so the parser can continue

    state.pos = state.pos + 6;
    return true;
  });

  var originalHeadingOpen = md.renderer.rules.heading_open || function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var tokens = args[0],
        idx = args[1],
        options = args[2],
        self = args[4];
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_open = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var tokens = args[0],
        idx = args[1];
    var attrs = tokens[idx].attrs = tokens[idx].attrs || [];
    var anchor = tokens[idx + 1]._tocAnchor;
    attrs.push(["id", anchor]);

    if (options.anchorLink) {
      renderAnchorLink.apply(void 0, [anchor, options].concat(args));
    }

    return originalHeadingOpen.apply(this, args);
  };

  md.renderer.rules.toc_open = function () {
    return "";
  };

  md.renderer.rules.toc_close = function () {
    return "";
  };

  md.renderer.rules.toc_body = function () {
    return "";
  };

  if (options.toc) {
    md.renderer.rules.toc_body = function () {
      return tocHtml;
    };
  }
}

/***/ }),

/***/ "362d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var emojies_defs      = __webpack_require__("fa38");
var emojies_shortcuts = __webpack_require__("aa43");
var emoji_html        = __webpack_require__("00bd");
var emoji_replace     = __webpack_require__("48cc");
var normalize_opts    = __webpack_require__("38c8");


module.exports = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };

  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));

  md.renderer.rules.emoji = emoji_html;

  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE));
};


/***/ }),

/***/ "38c8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Convert input options to more useable format
// and compile search regexp




function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}


module.exports = function normalize_opts(options) {
  var emojies = options.defs,
      shortcuts;

  // Filter emojies by whitelist, if needed
  if (options.enabled.length) {
    emojies = Object.keys(emojies).reduce(function (acc, key) {
      if (options.enabled.indexOf(key) >= 0) {
        acc[key] = emojies[key];
      }
      return acc;
    }, {});
  }

  // Flatten shortcuts to simple object: { alias: emoji_name }
  shortcuts = Object.keys(options.shortcuts).reduce(function (acc, key) {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) { return acc; }

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(function (alias) {
        acc[alias] = key;
      });
      return acc;
    }

    acc[options.shortcuts[key]] = key;
    return acc;
  }, {});

  // Compile regexp
  var names = Object.keys(emojies)
                .map(function (name) { return ':' + name + ':'; })
                .concat(Object.keys(shortcuts))
                .sort()
                .reverse()
                .map(function (name) { return quoteRE(name); })
                .join('|');
  var scanRE = RegExp(names);
  var replaceRE = RegExp(names, 'g');

  return {
    defs: emojies,
    shortcuts: shortcuts,
    scanRE: scanRE,
    replaceRE: replaceRE
  };
};


/***/ }),

/***/ "48cc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Emojies & shortcuts replacement logic.
//
// Note: In theory, it could be faster to parse :smile: in inline chain and
// leave only shortcuts here. But, who care...
//




module.exports = function create_rule(md, emojies, shortcuts, scanRE, replaceRE) {
  var arrayReplaceAt = md.utils.arrayReplaceAt,
      ucm = md.utils.lib.ucmicro,
      ZPCc = new RegExp([ ucm.Z.source, ucm.P.source, ucm.Cc.source ].join('|'));

  function splitTextToken(text, level, Token) {
    var token, last_pos = 0, nodes = [];

    text.replace(replaceRE, function (match, offset, src) {
      var emoji_name;
      // Validate emoji name
      if (shortcuts.hasOwnProperty(match)) {
        // replace shortcut with full name
        emoji_name = shortcuts[match];

        // Don't allow letters before any shortcut (as in no ":/" in http://)
        if (offset > 0 && !ZPCc.test(src[offset - 1])) {
          return;
        }

        // Don't allow letters after any shortcut
        if (offset + match.length < src.length && !ZPCc.test(src[offset + match.length])) {
          return;
        }
      } else {
        emoji_name = match.slice(1, -1);
      }

      // Add new tokens to pending list
      if (offset > last_pos) {
        token         = new Token('text', '', 0);
        token.content = text.slice(last_pos, offset);
        nodes.push(token);
      }

      token         = new Token('emoji', '', 0);
      token.markup  = emoji_name;
      token.content = emojies[emoji_name];
      nodes.push(token);

      last_pos = offset + match.length;
    });

    if (last_pos < text.length) {
      token         = new Token('text', '', 0);
      token.content = text.slice(last_pos);
      nodes.push(token);
    }

    return nodes;
  }

  return function emoji_replace(state) {
    var i, j, l, tokens, token,
        blockTokens = state.tokens,
        autolinkLevel = 0;

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') { continue; }
      tokens = blockTokens[j].children;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];

        if (token.type === 'link_open' || token.type === 'link_close') {
          if (token.info === 'auto') { autolinkLevel -= token.nesting; }
        }

        if (token.type === 'text' && autolinkLevel === 0 && scanRE.test(token.content)) {
          // replace current node
          blockTokens[j].children = tokens = arrayReplaceAt(
            tokens, i, splitTextToken(token.content, token.level, state.Token)
          );
        }
      }
    }
  };
};


/***/ }),

/***/ "4bb9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function ins_plugin(md) {
  // Insert each marker as a separate text token, and add it to delimiter list
  //
  function tokenize(state, silent) {
    var i, scanned, token, len, ch,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x3D/* = */) { return false; }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len < 2) { return false; }

    if (len % 2) {
      token         = state.push('text', '', 0);
      token.content = ch;
      len--;
    }

    for (i = 0; i < len; i += 2) {
      token         = state.push('text', '', 0);
      token.content = ch + ch;

      state.delimiters.push({
        marker: marker,
        jump:   i,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   scanned.can_open,
        close:  scanned.can_close
      });
    }

    state.pos += scanned.length;

    return true;
  }


  // Walk through delimiter list and replace text tokens with tags
  //
  function postProcess(state) {
    var i, j,
        startDelim,
        endDelim,
        token,
        loneMarkers = [],
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x3D/* = */) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token         = state.tokens[startDelim.token];
      token.type    = 'mark_open';
      token.tag     = 'mark';
      token.nesting = 1;
      token.markup  = '==';
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 'mark_close';
      token.tag     = 'mark';
      token.nesting = -1;
      token.markup  = '==';
      token.content = '';

      if (state.tokens[endDelim.token - 1].type === 'text' &&
          state.tokens[endDelim.token - 1].content === '=') {

        loneMarkers.push(endDelim.token - 1);
      }
    }

    // If a marker sequence has an odd number of characters, it's splitted
    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
    // start of the sequence.
    //
    // So, we have to move all those markers after subsequent s_close tags.
    //
    while (loneMarkers.length) {
      i = loneMarkers.pop();
      j = i + 1;

      while (j < state.tokens.length && state.tokens[j].type === 'mark_close') {
        j++;
      }

      j--;

      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }

  md.inline.ruler.before('emphasis', 'mark', tokenize);
  md.inline.ruler2.before('emphasis', 'mark', postProcess);
};


/***/ }),

/***/ "5121":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Enclose abbreviations in <abbr> tags
//



module.exports = function sub_plugin(md) {
  var escapeRE        = md.utils.escapeRE,
      arrayReplaceAt  = md.utils.arrayReplaceAt;

  // ASCII characters in Cc, Sc, Sm, Sk categories we should terminate on;
  // you can check character classes here:
  // http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
  var OTHER_CHARS      = ' \r\n$+<=>^`|~';

  var UNICODE_PUNCT_RE = md.utils.lib.ucmicro.P.source;
  var UNICODE_SPACE_RE = md.utils.lib.ucmicro.Z.source;


  function abbr_def(state, startLine, endLine, silent) {
    var label, title, ch, labelStart, labelEnd,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    if (pos + 2 >= max) { return false; }

    if (state.src.charCodeAt(pos++) !== 0x2A/* * */) { return false; }
    if (state.src.charCodeAt(pos++) !== 0x5B/* [ */) { return false; }

    labelStart = pos;

    for (; pos < max; pos++) {
      ch = state.src.charCodeAt(pos);
      if (ch === 0x5B /* [ */) {
        return false;
      } else if (ch === 0x5D /* ] */) {
        labelEnd = pos;
        break;
      } else if (ch === 0x5C /* \ */) {
        pos++;
      }
    }

    if (labelEnd < 0 || state.src.charCodeAt(labelEnd + 1) !== 0x3A/* : */) {
      return false;
    }

    if (silent) { return true; }

    label = state.src.slice(labelStart, labelEnd).replace(/\\(.)/g, '$1');
    title = state.src.slice(labelEnd + 2, max).trim();
    if (label.length === 0) { return false; }
    if (title.length === 0) { return false; }
    if (!state.env.abbreviations) { state.env.abbreviations = {}; }
    // prepend ':' to avoid conflict with Object.prototype members
    if (typeof state.env.abbreviations[':' + label] === 'undefined') {
      state.env.abbreviations[':' + label] = title;
    }

    state.line = startLine + 1;
    return true;
  }


  function abbr_replace(state) {
    var i, j, l, tokens, token, text, nodes, pos, reg, m, regText, regSimple,
        currentToken,
        blockTokens = state.tokens;

    if (!state.env.abbreviations) { return; }

    regSimple = new RegExp('(?:' +
      Object.keys(state.env.abbreviations).map(function (x) {
        return x.substr(1);
      }).sort(function (a, b) {
        return b.length - a.length;
      }).map(escapeRE).join('|') +
    ')');

    regText = '(^|' + UNICODE_PUNCT_RE + '|' + UNICODE_SPACE_RE +
                    '|[' + OTHER_CHARS.split('').map(escapeRE).join('') + '])'
            + '(' + Object.keys(state.env.abbreviations).map(function (x) {
                      return x.substr(1);
                    }).sort(function (a, b) {
                      return b.length - a.length;
                    }).map(escapeRE).join('|') + ')'
            + '($|' + UNICODE_PUNCT_RE + '|' + UNICODE_SPACE_RE +
                    '|[' + OTHER_CHARS.split('').map(escapeRE).join('') + '])';

    reg = new RegExp(regText, 'g');

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline') { continue; }
      tokens = blockTokens[j].children;

      // We scan from the end, to keep position when new tags added.
      for (i = tokens.length - 1; i >= 0; i--) {
        currentToken = tokens[i];
        if (currentToken.type !== 'text') { continue; }

        pos = 0;
        text = currentToken.content;
        reg.lastIndex = 0;
        nodes = [];

        // fast regexp run to determine whether there are any abbreviated words
        // in the current token
        if (!regSimple.test(text)) { continue; }

        while ((m = reg.exec(text))) {
          if (m.index > 0 || m[1].length > 0) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(pos, m.index + m[1].length);
            nodes.push(token);
          }

          token         = new state.Token('abbr_open', 'abbr', 1);
          token.attrs   = [ [ 'title', state.env.abbreviations[':' + m[2]] ] ];
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = m[2];
          nodes.push(token);

          token         = new state.Token('abbr_close', 'abbr', -1);
          nodes.push(token);

          reg.lastIndex -= m[3].length;
          pos = reg.lastIndex;
        }

        if (!nodes.length) { continue; }

        if (pos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(pos);
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }

  md.block.ruler.before('reference', 'abbr_def', abbr_def, { alt: [ 'paragraph', 'reference' ] });

  md.core.ruler.after('linkify', 'abbr_replace', abbr_replace);
};


/***/ }),

/***/ "54f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ~subscript~



// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;


function subscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 2 >= max) { return false; }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token         = state.push('sub_open', 'sub', 1);
  token.markup  = '~';

  token         = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token         = state.push('sub_close', 'sub', -1);
  token.markup  = '~';

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


module.exports = function sub_plugin(md) {
  md.inline.ruler.after('emphasis', 'sub', subscript);
};


/***/ }),

/***/ "7ba6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ^superscript^



// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function superscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 2 >= max) { return false; }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5E/* ^ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token         = state.push('sup_open', 'sup', 1);
  token.markup  = '^';

  token         = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token         = state.push('sup_close', 'sup', -1);
  token.markup  = '^';

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


module.exports = function sup_plugin(md) {
  md.inline.ruler.after('emphasis', 'sup', superscript);
};


/***/ }),

/***/ "a68e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Process inline math */
/*
Like markdown-it-simplemath, this is a stripped down, simplified version of:
https://github.com/runarberg/markdown-it-math

It differs in that it takes (a subset of) LaTeX as input and relies on KaTeX
for rendering output.
*/

/*jslint node: true */


var katex = __webpack_require__("c759");

// Test if potential opening or closing delimieter
// Assumes that there is a "$" at state.src[pos]
function isValidDelim(state, pos) {
    var prevChar, nextChar,
        max = state.posMax,
        can_open = true,
        can_close = true;

    prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

    // Check non-whitespace conditions for opening and closing, and
    // check that closing delimeter isn't followed by a number
    if (prevChar === 0x20/* " " */ || prevChar === 0x09/* \t */ ||
            (nextChar >= 0x30/* "0" */ && nextChar <= 0x39/* "9" */)) {
        can_close = false;
    }
    if (nextChar === 0x20/* " " */ || nextChar === 0x09/* \t */) {
        can_open = false;
    }

    return {
        can_open: can_open,
        can_close: can_close
    };
}

function math_inline(state, silent) {
    var start, match, token, res, pos, esc_count;

    if (state.src[state.pos] !== "$") { return false; }

    res = isValidDelim(state, state.pos);
    if (!res.can_open) {
        if (!silent) { state.pending += "$"; }
        state.pos += 1;
        return true;
    }

    // First check for and bypass all properly escaped delimieters
    // This loop will assume that the first leading backtick can not
    // be the first character in state.src, which is known since
    // we have found an opening delimieter already.
    start = state.pos + 1;
    match = start;
    while ( (match = state.src.indexOf("$", match)) !== -1) {
        // Found potential $, look for escapes, pos will point to
        // first non escape when complete
        pos = match - 1;
        while (state.src[pos] === "\\") { pos -= 1; }

        // Even number of escapes, potential closing delimiter found
        if ( ((match - pos) % 2) == 1 ) { break; }
        match += 1;
    }

    // No closing delimter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent) { state.pending += "$"; }
        state.pos = start;
        return true;
    }

    // Check if we have empty content, ie: $$.  Do not parse.
    if (match - start === 0) {
        if (!silent) { state.pending += "$$"; }
        state.pos = start + 1;
        return true;
    }

    // Check for valid closing delimiter
    res = isValidDelim(state, match);
    if (!res.can_close) {
        if (!silent) { state.pending += "$"; }
        state.pos = start;
        return true;
    }

    if (!silent) {
        token         = state.push('math_inline', 'math', 0);
        token.markup  = "$";
        token.content = state.src.slice(start, match);
    }

    state.pos = match + 1;
    return true;
}

function math_block(state, start, end, silent){
    var firstLine, lastLine, next, lastPos, found = false, token,
        pos = state.bMarks[start] + state.tShift[start],
        max = state.eMarks[start]

    if(pos + 2 > max){ return false; }
    if(state.src.slice(pos,pos+2)!=='$$'){ return false; }

    pos += 2;
    firstLine = state.src.slice(pos,max);

    if(silent){ return true; }
    if(firstLine.trim().slice(-2)==='$$'){
        // Single line expression
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
    }

    for(next = start; !found; ){

        next++;

        if(next >= end){ break; }

        pos = state.bMarks[next]+state.tShift[next];
        max = state.eMarks[next];

        if(pos < max && state.tShift[next] < state.blkIndent){
            // non-empty line with negative indent should stop the list:
            break;
        }

        if(state.src.slice(pos,max).trim().slice(-2)==='$$'){
            lastPos = state.src.slice(0,max).lastIndexOf('$$');
            lastLine = state.src.slice(pos,lastPos);
            found = true;
        }

    }

    state.line = next + 1;

    token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '')
    + state.getLines(start + 1, next, state.tShift[start], true)
    + (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [ start, state.line ];
    token.markup = '$$';
    return true;
}

module.exports = function math_plugin(md, options) {
    // Default options

    options = options || {};

    // set KaTeX as the renderer for markdown-it-simplemath
    var katexInline = function(latex){
        options.displayMode = false;
        try{
            return katex.renderToString(latex, options);
        }
        catch(error){
            if(options.throwOnError){ console.log(error); }
            return latex;
        }
    };

    var inlineRenderer = function(tokens, idx){
        return katexInline(tokens[idx].content);
    };

    var katexBlock = function(latex){
        options.displayMode = true;
        try{
            return "<p>" + katex.renderToString(latex, options) + "</p>";
        }
        catch(error){
            if(options.throwOnError){ console.log(error); }
            return latex;
        }
    }

    var blockRenderer = function(tokens, idx){
        return  katexBlock(tokens[idx].content) + '\n';
    }

    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
    });
    md.renderer.rules.math_inline = inlineRenderer;
    md.renderer.rules.math_block = blockRenderer;
};


/***/ }),

/***/ "aa43":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Emoticons -> Emoji mapping.
//
// (!) Some patterns skipped, to avoid collisions
// without increase matcher complicity. Than can change in future.
//
// Places to look for more emoticons info:
//
// - http://en.wikipedia.org/wiki/List_of_emoticons#Western
// - https://github.com/wooorm/emoticon/blob/master/Support.md
// - http://factoryjoe.com/projects/emoticons/
//


module.exports = {
  angry:            [ '>:(', '>:-(' ],
  blush:            [ ':")', ':-")' ],
  broken_heart:     [ '</3', '<\\3' ],
  // :\ and :-\ not used because of conflict with markdown escaping
  confused:         [ ':/', ':-/' ], // twemoji shows question
  cry:              [ ":'(", ":'-(", ':,(', ':,-(' ],
  frowning:         [ ':(', ':-(' ],
  heart:            [ '<3' ],
  imp:              [ ']:(', ']:-(' ],
  innocent:         [ 'o:)', 'O:)', 'o:-)', 'O:-)', '0:)', '0:-)' ],
  joy:              [ ":')", ":'-)", ':,)', ':,-)', ":'D", ":'-D", ':,D', ':,-D' ],
  kissing:          [ ':*', ':-*' ],
  laughing:         [ 'x-)', 'X-)' ],
  neutral_face:     [ ':|', ':-|' ],
  open_mouth:       [ ':o', ':-o', ':O', ':-O' ],
  rage:             [ ':@', ':-@' ],
  smile:            [ ':D', ':-D' ],
  smiley:           [ ':)', ':-)' ],
  smiling_imp:      [ ']:)', ']:-)' ],
  sob:              [ ":,'(", ":,'-(", ';(', ';-(' ],
  stuck_out_tongue: [ ':P', ':-P' ],
  sunglasses:       [ '8-)', 'B-)' ],
  sweat:            [ ',:(', ',:-(' ],
  sweat_smile:      [ ',:)', ',:-)' ],
  unamused:         [ ':s', ':-S', ':z', ':-Z', ':$', ':-$' ],
  wink:             [ ';)', ';-)' ]
};


/***/ }),

/***/ "be03":
/***/ (function(module, exports) {

// Markdown-it plugin to render GitHub-style task lists; see
//
// https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
// https://github.com/blog/1825-task-lists-in-all-markdown-documents

var disableCheckboxes = true;
var useLabelWrapper = false;
var useLabelAfter = false;

module.exports = function(md, options) {
	if (options) {
		disableCheckboxes = !options.enabled;
		useLabelWrapper = !!options.label;
		useLabelAfter = !!options.labelAfter;
	}

	md.core.ruler.after('inline', 'github-task-lists', function(state) {
		var tokens = state.tokens;
		for (var i = 2; i < tokens.length; i++) {
			if (isTodoItem(tokens, i)) {
				todoify(tokens[i], state.Token);
				attrSet(tokens[i-2], 'class', 'task-list-item' + (!disableCheckboxes ? ' enabled' : ''));
				attrSet(tokens[parentToken(tokens, i-2)], 'class', 'contains-task-list');
			}
		}
	});
};

function attrSet(token, name, value) {
	var index = token.attrIndex(name);
	var attr = [name, value];

	if (index < 0) {
		token.attrPush(attr);
	} else {
		token.attrs[index] = attr;
	}
}

function parentToken(tokens, index) {
	var targetLevel = tokens[index].level - 1;
	for (var i = index - 1; i >= 0; i--) {
		if (tokens[i].level === targetLevel) {
			return i;
		}
	}
	return -1;
}

function isTodoItem(tokens, index) {
	return isInline(tokens[index]) &&
	       isParagraph(tokens[index - 1]) &&
	       isListItem(tokens[index - 2]) &&
	       startsWithTodoMarkdown(tokens[index]);
}

function todoify(token, TokenConstructor) {
	token.children.unshift(makeCheckbox(token, TokenConstructor));
	token.children[1].content = token.children[1].content.slice(3);
	token.content = token.content.slice(3);

	if (useLabelWrapper) {
		if (useLabelAfter) {
			token.children.pop();

			// Use large random number as id property of the checkbox.
			var id = 'task-item-' + Math.ceil(Math.random() * (10000 * 1000) - 1000);
			token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
			token.children.push(afterLabel(token.content, id, TokenConstructor));
		} else {
			token.children.unshift(beginLabel(TokenConstructor));
			token.children.push(endLabel(TokenConstructor));
		}
	}
}

function makeCheckbox(token, TokenConstructor) {
	var checkbox = new TokenConstructor('html_inline', '', 0);
	var disabledAttr = disableCheckboxes ? ' disabled="" ' : '';
	if (token.content.indexOf('[ ] ') === 0) {
		checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
	} else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
		checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
	}
	return checkbox;
}

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
function beginLabel(TokenConstructor) {
	var token = new TokenConstructor('html_inline', '', 0);
	token.content = '<label>';
	return token;
}

function endLabel(TokenConstructor) {
	var token = new TokenConstructor('html_inline', '', 0);
	token.content = '</label>';
	return token;
}

function afterLabel(content, id, TokenConstructor) {
	var token = new TokenConstructor('html_inline', '', 0);
	token.content = '<label class="task-list-item-label" for="' + id + '">' + content + '</label>';
	token.attrs = [{for: id}];
	return token;
}

function isInline(token) { return token.type === 'inline'; }
function isParagraph(token) { return token.type === 'paragraph_open'; }
function isListItem(token) { return token.type === 'list_item_open'; }

function startsWithTodoMarkdown(token) {
	// leading whitespace in a list item is already trimmed off by markdown-it
	return token.content.indexOf('[ ] ') === 0 || token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0;
}


/***/ }),

/***/ "cf2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function ins_plugin(md) {
  // Insert each marker as a separate text token, and add it to delimiter list
  //
  function tokenize(state, silent) {
    var i, scanned, token, len, ch,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x2B/* + */) { return false; }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len < 2) { return false; }

    if (len % 2) {
      token         = state.push('text', '', 0);
      token.content = ch;
      len--;
    }

    for (i = 0; i < len; i += 2) {
      token         = state.push('text', '', 0);
      token.content = ch + ch;

      state.delimiters.push({
        marker: marker,
        jump:   i,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   scanned.can_open,
        close:  scanned.can_close
      });
    }

    state.pos += scanned.length;

    return true;
  }


  // Walk through delimiter list and replace text tokens with tags
  //
  function postProcess(state) {
    var i, j,
        startDelim,
        endDelim,
        token,
        loneMarkers = [],
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x2B/* + */) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token         = state.tokens[startDelim.token];
      token.type    = 'ins_open';
      token.tag     = 'ins';
      token.nesting = 1;
      token.markup  = '++';
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 'ins_close';
      token.tag     = 'ins';
      token.nesting = -1;
      token.markup  = '++';
      token.content = '';

      if (state.tokens[endDelim.token - 1].type === 'text' &&
          state.tokens[endDelim.token - 1].content === '+') {

        loneMarkers.push(endDelim.token - 1);
      }
    }

    // If a marker sequence has an odd number of characters, it's splitted
    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
    // start of the sequence.
    //
    // So, we have to move all those markers after subsequent s_close tags.
    //
    while (loneMarkers.length) {
      i = loneMarkers.pop();
      j = i + 1;

      while (j < state.tokens.length && state.tokens[j].type === 'ins_close') {
        j++;
      }

      j--;

      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }

  md.inline.ruler.before('emphasis', 'ins', tokenize);
  md.inline.ruler2.before('emphasis', 'ins', postProcess);
};


/***/ }),

/***/ "e6f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process footnotes
//


////////////////////////////////////////////////////////////////////////////////
// Renderer partials

function _footnote_ref(tokens, idx) {
  var n = Number(tokens[idx].meta.id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }
  return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
}
function _footnote_block_open(tokens, idx, options) {
  return (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') +
         '<section class="footnotes">\n' +
         '<ol class="footnotes-list">\n';
}
function _footnote_block_close() {
  return '</ol>\n</section>\n';
}
function _footnote_open(tokens, idx) {
  var id = Number(tokens[idx].meta.id + 1).toString();
  return '<li id="fn' + id + '"  class="footnote-item">';
}
function _footnote_close() {
  return '</li>\n';
}
function _footnote_anchor(tokens, idx) {
  var n = Number(tokens[idx].meta.id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId;
  }
  return ' <a href="#' + id + '" class="footnote-backref">\u21a9</a>'; /* ↩ */
}

////////////////////////////////////////////////////////////////////////////////


module.exports = function sub_plugin(md) {
  var parseLinkLabel = md.helpers.parseLinkLabel,
      isSpace = md.utils.isSpace;

  md.renderer.rules.footnote_ref          = _footnote_ref;
  md.renderer.rules.footnote_block_open   = _footnote_block_open;
  md.renderer.rules.footnote_block_close  = _footnote_block_close;
  md.renderer.rules.footnote_open         = _footnote_open;
  md.renderer.rules.footnote_close        = _footnote_close;
  md.renderer.rules.footnote_anchor       = _footnote_anchor;

  // Process footnote block definition
  function footnote_def(state, startLine, endLine, silent) {
    var oldBMark, oldTShift, oldSCount, oldParentType, pos, label, token,
        initial, offset, ch, posAfterColon,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) { return false; }

    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) { return false; }
    if (silent) { return true; }
    pos++;

    if (!state.env.footnotes) { state.env.footnotes = {}; }
    if (!state.env.footnotes.refs) { state.env.footnotes.refs = {}; }
    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[':' + label] = -1;

    token       = new state.Token('footnote_reference_open', '', 1);
    token.meta  = { label: label };
    token.level = state.level++;
    state.tokens.push(token);

    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];
    oldParentType = state.parentType;

    posAfterColon = pos;
    initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
      } else {
        break;
      }

      pos++;
    }

    state.tShift[startLine] = pos - posAfterColon;
    state.sCount[startLine] = offset - initial;

    state.bMarks[startLine] = posAfterColon;
    state.blkIndent += 4;
    state.parentType = 'footnote';

    if (state.sCount[startLine] < state.blkIndent) {
      state.sCount[startLine] += state.blkIndent;
    }

    state.md.block.tokenize(state, startLine, endLine, true);

    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.bMarks[startLine] = oldBMark;

    token       = new state.Token('footnote_reference_close', '', -1);
    token.level = --state.level;
    state.tokens.push(token);

    return true;
  }

  // Process inline footnotes (^[...])
  function footnote_inline(state, silent) {
    var labelStart,
        labelEnd,
        footnoteId,
        token,
        tokens,
        max = state.posMax,
        start = state.pos;

    if (start + 2 >= max) { return false; }
    if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5B/* [ */) { return false; }

    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1);

    // parser failed to find ']', so it's not a valid note
    if (labelEnd < 0) { return false; }

    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      if (!state.env.footnotes) { state.env.footnotes = {}; }
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
      footnoteId = state.env.footnotes.list.length;

      state.md.inline.parse(
        state.src.slice(labelStart, labelEnd),
        state.md,
        state.env,
        tokens = []
      );

      token      = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId };

      state.env.footnotes.list[footnoteId] = { tokens: tokens };
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  }

  // Process footnote references ([^...])
  function footnote_ref(state, silent) {
    var label,
        pos,
        footnoteId,
        footnoteSubId,
        token,
        max = state.posMax,
        start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) { return false; }

    if (!state.env.footnotes || !state.env.footnotes.refs) { return false; }
    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x0A) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos >= max) { return false; }
    pos++;

    label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[':' + label] === 'undefined') { return false; }

    if (!silent) {
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }

      if (state.env.footnotes.refs[':' + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
        state.env.footnotes.refs[':' + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[':' + label];
      }

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;

      token      = state.push('footnote_ref', '', 0);
      token.meta = { id: footnoteId, subId: footnoteSubId };
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // Glue footnote tokens to end of token stream
  function footnote_tail(state) {
    var i, l, j, t, lastParagraph, list, token, tokens, current, currentLabel,
        insideRef = false,
        refTokens = {};

    if (!state.env.footnotes) { return; }

    state.tokens = state.tokens.filter(function(tok) {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.meta.label;
        return false;
      }
      if (tok.type === 'footnote_reference_close') {
        insideRef = false;
        // prepend ':' to avoid conflict with Object.prototype members
        refTokens[':' + currentLabel] = current;
        return false;
      }
      if (insideRef) { current.push(tok); }
      return !insideRef;
    });

    if (!state.env.footnotes.list) { return; }
    list = state.env.footnotes.list;

    token = new state.Token('footnote_block_open', '', 1);
    state.tokens.push(token);

    for (i = 0, l = list.length; i < l; i++) {
      token      = new state.Token('footnote_open', '', 1);
      token.meta = { id: i };
      state.tokens.push(token);

      if (list[i].tokens) {
        tokens = [];

        token          = new state.Token('paragraph_open', 'p', 1);
        token.block    = true;
        tokens.push(token);

        token          = new state.Token('inline', '', 0);
        token.children = list[i].tokens;
        token.content  = '';
        tokens.push(token);

        token          = new state.Token('paragraph_close', 'p', -1);
        token.block    = true;
        tokens.push(token);

      } else if (list[i].label) {
        tokens = refTokens[':' + list[i].label];
      }

      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }

      t = list[i].count > 0 ? list[i].count : 1;
      for (j = 0; j < t; j++) {
        token      = new state.Token('footnote_anchor', '', 0);
        token.meta = { id: i, subId: j };
        state.tokens.push(token);
      }

      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }

      token = new state.Token('footnote_close', '', -1);
      state.tokens.push(token);
    }

    token = new state.Token('footnote_block_close', '', -1);
    state.tokens.push(token);
  }

  md.block.ruler.before('reference', 'footnote_def', footnote_def, { alt: [ 'paragraph', 'reference' ] });
  md.inline.ruler.after('image', 'footnote_inline', footnote_inline);
  md.inline.ruler.after('footnote_inline', 'footnote_ref', footnote_ref);
  md.core.ruler.after('inline', 'footnote_tail', footnote_tail);
};


/***/ }),

/***/ "fa38":
/***/ (function(module) {

module.exports = JSON.parse("{\"100\":\"💯\",\"1234\":\"🔢\",\"grinning\":\"😀\",\"smiley\":\"😃\",\"smile\":\"😄\",\"grin\":\"😁\",\"laughing\":\"😆\",\"satisfied\":\"😆\",\"sweat_smile\":\"😅\",\"joy\":\"😂\",\"rofl\":\"🤣\",\"relaxed\":\"☺️\",\"blush\":\"😊\",\"innocent\":\"😇\",\"slightly_smiling_face\":\"🙂\",\"upside_down_face\":\"🙃\",\"wink\":\"😉\",\"relieved\":\"😌\",\"heart_eyes\":\"😍\",\"kissing_heart\":\"😘\",\"kissing\":\"😗\",\"kissing_smiling_eyes\":\"😙\",\"kissing_closed_eyes\":\"😚\",\"yum\":\"😋\",\"stuck_out_tongue_winking_eye\":\"😜\",\"stuck_out_tongue_closed_eyes\":\"😝\",\"stuck_out_tongue\":\"😛\",\"money_mouth_face\":\"🤑\",\"hugs\":\"🤗\",\"nerd_face\":\"🤓\",\"sunglasses\":\"😎\",\"clown_face\":\"🤡\",\"cowboy_hat_face\":\"🤠\",\"smirk\":\"😏\",\"unamused\":\"😒\",\"disappointed\":\"😞\",\"pensive\":\"😔\",\"worried\":\"😟\",\"confused\":\"😕\",\"slightly_frowning_face\":\"🙁\",\"frowning_face\":\"☹️\",\"persevere\":\"😣\",\"confounded\":\"😖\",\"tired_face\":\"😫\",\"weary\":\"😩\",\"triumph\":\"😤\",\"angry\":\"😠\",\"rage\":\"😡\",\"pout\":\"😡\",\"no_mouth\":\"😶\",\"neutral_face\":\"😐\",\"expressionless\":\"😑\",\"hushed\":\"😯\",\"frowning\":\"😦\",\"anguished\":\"😧\",\"open_mouth\":\"😮\",\"astonished\":\"😲\",\"dizzy_face\":\"😵\",\"flushed\":\"😳\",\"scream\":\"😱\",\"fearful\":\"😨\",\"cold_sweat\":\"😰\",\"cry\":\"😢\",\"disappointed_relieved\":\"😥\",\"drooling_face\":\"🤤\",\"sob\":\"😭\",\"sweat\":\"😓\",\"sleepy\":\"😪\",\"sleeping\":\"😴\",\"roll_eyes\":\"🙄\",\"thinking\":\"🤔\",\"lying_face\":\"🤥\",\"grimacing\":\"😬\",\"zipper_mouth_face\":\"🤐\",\"nauseated_face\":\"🤢\",\"sneezing_face\":\"🤧\",\"mask\":\"😷\",\"face_with_thermometer\":\"🤒\",\"face_with_head_bandage\":\"🤕\",\"smiling_imp\":\"😈\",\"imp\":\"👿\",\"japanese_ogre\":\"👹\",\"japanese_goblin\":\"👺\",\"hankey\":\"💩\",\"poop\":\"💩\",\"shit\":\"💩\",\"ghost\":\"👻\",\"skull\":\"💀\",\"skull_and_crossbones\":\"☠️\",\"alien\":\"👽\",\"space_invader\":\"👾\",\"robot\":\"🤖\",\"jack_o_lantern\":\"🎃\",\"smiley_cat\":\"😺\",\"smile_cat\":\"😸\",\"joy_cat\":\"😹\",\"heart_eyes_cat\":\"😻\",\"smirk_cat\":\"😼\",\"kissing_cat\":\"😽\",\"scream_cat\":\"🙀\",\"crying_cat_face\":\"😿\",\"pouting_cat\":\"😾\",\"open_hands\":\"👐\",\"raised_hands\":\"🙌\",\"clap\":\"👏\",\"pray\":\"🙏\",\"handshake\":\"🤝\",\"+1\":\"👍\",\"thumbsup\":\"👍\",\"-1\":\"👎\",\"thumbsdown\":\"👎\",\"fist_oncoming\":\"👊\",\"facepunch\":\"👊\",\"punch\":\"👊\",\"fist_raised\":\"✊\",\"fist\":\"✊\",\"fist_left\":\"🤛\",\"fist_right\":\"🤜\",\"crossed_fingers\":\"🤞\",\"v\":\"✌️\",\"metal\":\"🤘\",\"ok_hand\":\"👌\",\"point_left\":\"👈\",\"point_right\":\"👉\",\"point_up_2\":\"👆\",\"point_down\":\"👇\",\"point_up\":\"☝️\",\"hand\":\"✋\",\"raised_hand\":\"✋\",\"raised_back_of_hand\":\"🤚\",\"raised_hand_with_fingers_splayed\":\"🖐\",\"vulcan_salute\":\"🖖\",\"wave\":\"👋\",\"call_me_hand\":\"🤙\",\"muscle\":\"💪\",\"middle_finger\":\"🖕\",\"fu\":\"🖕\",\"writing_hand\":\"✍️\",\"selfie\":\"🤳\",\"nail_care\":\"💅\",\"ring\":\"💍\",\"lipstick\":\"💄\",\"kiss\":\"💋\",\"lips\":\"👄\",\"tongue\":\"👅\",\"ear\":\"👂\",\"nose\":\"👃\",\"footprints\":\"👣\",\"eye\":\"👁\",\"eyes\":\"👀\",\"speaking_head\":\"🗣\",\"bust_in_silhouette\":\"👤\",\"busts_in_silhouette\":\"👥\",\"baby\":\"👶\",\"boy\":\"👦\",\"girl\":\"👧\",\"man\":\"👨\",\"woman\":\"👩\",\"blonde_woman\":\"👱‍♀\",\"blonde_man\":\"👱\",\"person_with_blond_hair\":\"👱\",\"older_man\":\"👴\",\"older_woman\":\"👵\",\"man_with_gua_pi_mao\":\"👲\",\"woman_with_turban\":\"👳‍♀\",\"man_with_turban\":\"👳\",\"policewoman\":\"👮‍♀\",\"policeman\":\"👮\",\"cop\":\"👮\",\"construction_worker_woman\":\"👷‍♀\",\"construction_worker_man\":\"👷\",\"construction_worker\":\"👷\",\"guardswoman\":\"💂‍♀\",\"guardsman\":\"💂\",\"female_detective\":\"🕵️‍♀️\",\"male_detective\":\"🕵\",\"detective\":\"🕵\",\"woman_health_worker\":\"👩‍⚕\",\"man_health_worker\":\"👨‍⚕\",\"woman_farmer\":\"👩‍🌾\",\"man_farmer\":\"👨‍🌾\",\"woman_cook\":\"👩‍🍳\",\"man_cook\":\"👨‍🍳\",\"woman_student\":\"👩‍🎓\",\"man_student\":\"👨‍🎓\",\"woman_singer\":\"👩‍🎤\",\"man_singer\":\"👨‍🎤\",\"woman_teacher\":\"👩‍🏫\",\"man_teacher\":\"👨‍🏫\",\"woman_factory_worker\":\"👩‍🏭\",\"man_factory_worker\":\"👨‍🏭\",\"woman_technologist\":\"👩‍💻\",\"man_technologist\":\"👨‍💻\",\"woman_office_worker\":\"👩‍💼\",\"man_office_worker\":\"👨‍💼\",\"woman_mechanic\":\"👩‍🔧\",\"man_mechanic\":\"👨‍🔧\",\"woman_scientist\":\"👩‍🔬\",\"man_scientist\":\"👨‍🔬\",\"woman_artist\":\"👩‍🎨\",\"man_artist\":\"👨‍🎨\",\"woman_firefighter\":\"👩‍🚒\",\"man_firefighter\":\"👨‍🚒\",\"woman_pilot\":\"👩‍✈\",\"man_pilot\":\"👨‍✈\",\"woman_astronaut\":\"👩‍🚀\",\"man_astronaut\":\"👨‍🚀\",\"woman_judge\":\"👩‍⚖\",\"man_judge\":\"👨‍⚖\",\"mrs_claus\":\"🤶\",\"santa\":\"🎅\",\"princess\":\"👸\",\"prince\":\"🤴\",\"bride_with_veil\":\"👰\",\"man_in_tuxedo\":\"🤵\",\"angel\":\"👼\",\"pregnant_woman\":\"🤰\",\"bowing_woman\":\"🙇‍♀\",\"bowing_man\":\"🙇\",\"bow\":\"🙇\",\"tipping_hand_woman\":\"💁\",\"information_desk_person\":\"💁\",\"sassy_woman\":\"💁\",\"tipping_hand_man\":\"💁‍♂\",\"sassy_man\":\"💁‍♂\",\"no_good_woman\":\"🙅\",\"no_good\":\"🙅\",\"ng_woman\":\"🙅\",\"no_good_man\":\"🙅‍♂\",\"ng_man\":\"🙅‍♂\",\"ok_woman\":\"🙆\",\"ok_man\":\"🙆‍♂\",\"raising_hand_woman\":\"🙋\",\"raising_hand\":\"🙋\",\"raising_hand_man\":\"🙋‍♂\",\"woman_facepalming\":\"🤦‍♀\",\"man_facepalming\":\"🤦‍♂\",\"woman_shrugging\":\"🤷‍♀\",\"man_shrugging\":\"🤷‍♂\",\"pouting_woman\":\"🙎\",\"person_with_pouting_face\":\"🙎\",\"pouting_man\":\"🙎‍♂\",\"frowning_woman\":\"🙍\",\"person_frowning\":\"🙍\",\"frowning_man\":\"🙍‍♂\",\"haircut_woman\":\"💇\",\"haircut\":\"💇\",\"haircut_man\":\"💇‍♂\",\"massage_woman\":\"💆\",\"massage\":\"💆\",\"massage_man\":\"💆‍♂\",\"business_suit_levitating\":\"🕴\",\"dancer\":\"💃\",\"man_dancing\":\"🕺\",\"dancing_women\":\"👯\",\"dancers\":\"👯\",\"dancing_men\":\"👯‍♂\",\"walking_woman\":\"🚶‍♀\",\"walking_man\":\"🚶\",\"walking\":\"🚶\",\"running_woman\":\"🏃‍♀\",\"running_man\":\"🏃\",\"runner\":\"🏃\",\"running\":\"🏃\",\"couple\":\"👫\",\"two_women_holding_hands\":\"👭\",\"two_men_holding_hands\":\"👬\",\"couple_with_heart_woman_man\":\"💑\",\"couple_with_heart\":\"💑\",\"couple_with_heart_woman_woman\":\"👩‍❤️‍👩\",\"couple_with_heart_man_man\":\"👨‍❤️‍👨\",\"couplekiss_man_woman\":\"💏\",\"couplekiss_woman_woman\":\"👩‍❤️‍💋‍👩\",\"couplekiss_man_man\":\"👨‍❤️‍💋‍👨\",\"family_man_woman_boy\":\"👪\",\"family\":\"👪\",\"family_man_woman_girl\":\"👨‍👩‍👧\",\"family_man_woman_girl_boy\":\"👨‍👩‍👧‍👦\",\"family_man_woman_boy_boy\":\"👨‍👩‍👦‍👦\",\"family_man_woman_girl_girl\":\"👨‍👩‍👧‍👧\",\"family_woman_woman_boy\":\"👩‍👩‍👦\",\"family_woman_woman_girl\":\"👩‍👩‍👧\",\"family_woman_woman_girl_boy\":\"👩‍👩‍👧‍👦\",\"family_woman_woman_boy_boy\":\"👩‍👩‍👦‍👦\",\"family_woman_woman_girl_girl\":\"👩‍👩‍👧‍👧\",\"family_man_man_boy\":\"👨‍👨‍👦\",\"family_man_man_girl\":\"👨‍👨‍👧\",\"family_man_man_girl_boy\":\"👨‍👨‍👧‍👦\",\"family_man_man_boy_boy\":\"👨‍👨‍👦‍👦\",\"family_man_man_girl_girl\":\"👨‍👨‍👧‍👧\",\"family_woman_boy\":\"👩‍👦\",\"family_woman_girl\":\"👩‍👧\",\"family_woman_girl_boy\":\"👩‍👧‍👦\",\"family_woman_boy_boy\":\"👩‍👦‍👦\",\"family_woman_girl_girl\":\"👩‍👧‍👧\",\"family_man_boy\":\"👨‍👦\",\"family_man_girl\":\"👨‍👧\",\"family_man_girl_boy\":\"👨‍👧‍👦\",\"family_man_boy_boy\":\"👨‍👦‍👦\",\"family_man_girl_girl\":\"👨‍👧‍👧\",\"womans_clothes\":\"👚\",\"shirt\":\"👕\",\"tshirt\":\"👕\",\"jeans\":\"👖\",\"necktie\":\"👔\",\"dress\":\"👗\",\"bikini\":\"👙\",\"kimono\":\"👘\",\"high_heel\":\"👠\",\"sandal\":\"👡\",\"boot\":\"👢\",\"mans_shoe\":\"👞\",\"shoe\":\"👞\",\"athletic_shoe\":\"👟\",\"womans_hat\":\"👒\",\"tophat\":\"🎩\",\"mortar_board\":\"🎓\",\"crown\":\"👑\",\"rescue_worker_helmet\":\"⛑\",\"school_satchel\":\"🎒\",\"pouch\":\"👝\",\"purse\":\"👛\",\"handbag\":\"👜\",\"briefcase\":\"💼\",\"eyeglasses\":\"👓\",\"dark_sunglasses\":\"🕶\",\"closed_umbrella\":\"🌂\",\"open_umbrella\":\"☂️\",\"dog\":\"🐶\",\"cat\":\"🐱\",\"mouse\":\"🐭\",\"hamster\":\"🐹\",\"rabbit\":\"🐰\",\"fox_face\":\"🦊\",\"bear\":\"🐻\",\"panda_face\":\"🐼\",\"koala\":\"🐨\",\"tiger\":\"🐯\",\"lion\":\"🦁\",\"cow\":\"🐮\",\"pig\":\"🐷\",\"pig_nose\":\"🐽\",\"frog\":\"🐸\",\"monkey_face\":\"🐵\",\"see_no_evil\":\"🙈\",\"hear_no_evil\":\"🙉\",\"speak_no_evil\":\"🙊\",\"monkey\":\"🐒\",\"chicken\":\"🐔\",\"penguin\":\"🐧\",\"bird\":\"🐦\",\"baby_chick\":\"🐤\",\"hatching_chick\":\"🐣\",\"hatched_chick\":\"🐥\",\"duck\":\"🦆\",\"eagle\":\"🦅\",\"owl\":\"🦉\",\"bat\":\"🦇\",\"wolf\":\"🐺\",\"boar\":\"🐗\",\"horse\":\"🐴\",\"unicorn\":\"🦄\",\"bee\":\"🐝\",\"honeybee\":\"🐝\",\"bug\":\"🐛\",\"butterfly\":\"🦋\",\"snail\":\"🐌\",\"shell\":\"🐚\",\"beetle\":\"🐞\",\"ant\":\"🐜\",\"spider\":\"🕷\",\"spider_web\":\"🕸\",\"turtle\":\"🐢\",\"snake\":\"🐍\",\"lizard\":\"🦎\",\"scorpion\":\"🦂\",\"crab\":\"🦀\",\"squid\":\"🦑\",\"octopus\":\"🐙\",\"shrimp\":\"🦐\",\"tropical_fish\":\"🐠\",\"fish\":\"🐟\",\"blowfish\":\"🐡\",\"dolphin\":\"🐬\",\"flipper\":\"🐬\",\"shark\":\"🦈\",\"whale\":\"🐳\",\"whale2\":\"🐋\",\"crocodile\":\"🐊\",\"leopard\":\"🐆\",\"tiger2\":\"🐅\",\"water_buffalo\":\"🐃\",\"ox\":\"🐂\",\"cow2\":\"🐄\",\"deer\":\"🦌\",\"dromedary_camel\":\"🐪\",\"camel\":\"🐫\",\"elephant\":\"🐘\",\"rhinoceros\":\"🦏\",\"gorilla\":\"🦍\",\"racehorse\":\"🐎\",\"pig2\":\"🐖\",\"goat\":\"🐐\",\"ram\":\"🐏\",\"sheep\":\"🐑\",\"dog2\":\"🐕\",\"poodle\":\"🐩\",\"cat2\":\"🐈\",\"rooster\":\"🐓\",\"turkey\":\"🦃\",\"dove\":\"🕊\",\"rabbit2\":\"🐇\",\"mouse2\":\"🐁\",\"rat\":\"🐀\",\"chipmunk\":\"🐿\",\"feet\":\"🐾\",\"paw_prints\":\"🐾\",\"dragon\":\"🐉\",\"dragon_face\":\"🐲\",\"cactus\":\"🌵\",\"christmas_tree\":\"🎄\",\"evergreen_tree\":\"🌲\",\"deciduous_tree\":\"🌳\",\"palm_tree\":\"🌴\",\"seedling\":\"🌱\",\"herb\":\"🌿\",\"shamrock\":\"☘️\",\"four_leaf_clover\":\"🍀\",\"bamboo\":\"🎍\",\"tanabata_tree\":\"🎋\",\"leaves\":\"🍃\",\"fallen_leaf\":\"🍂\",\"maple_leaf\":\"🍁\",\"mushroom\":\"🍄\",\"ear_of_rice\":\"🌾\",\"bouquet\":\"💐\",\"tulip\":\"🌷\",\"rose\":\"🌹\",\"wilted_flower\":\"🥀\",\"sunflower\":\"🌻\",\"blossom\":\"🌼\",\"cherry_blossom\":\"🌸\",\"hibiscus\":\"🌺\",\"earth_americas\":\"🌎\",\"earth_africa\":\"🌍\",\"earth_asia\":\"🌏\",\"full_moon\":\"🌕\",\"waning_gibbous_moon\":\"🌖\",\"last_quarter_moon\":\"🌗\",\"waning_crescent_moon\":\"🌘\",\"new_moon\":\"🌑\",\"waxing_crescent_moon\":\"🌒\",\"first_quarter_moon\":\"🌓\",\"moon\":\"🌔\",\"waxing_gibbous_moon\":\"🌔\",\"new_moon_with_face\":\"🌚\",\"full_moon_with_face\":\"🌝\",\"sun_with_face\":\"🌞\",\"first_quarter_moon_with_face\":\"🌛\",\"last_quarter_moon_with_face\":\"🌜\",\"crescent_moon\":\"🌙\",\"dizzy\":\"💫\",\"star\":\"⭐️\",\"star2\":\"🌟\",\"sparkles\":\"✨\",\"zap\":\"⚡️\",\"fire\":\"🔥\",\"boom\":\"💥\",\"collision\":\"💥\",\"comet\":\"☄\",\"sunny\":\"☀️\",\"sun_behind_small_cloud\":\"🌤\",\"partly_sunny\":\"⛅️\",\"sun_behind_large_cloud\":\"🌥\",\"sun_behind_rain_cloud\":\"🌦\",\"rainbow\":\"🌈\",\"cloud\":\"☁️\",\"cloud_with_rain\":\"🌧\",\"cloud_with_lightning_and_rain\":\"⛈\",\"cloud_with_lightning\":\"🌩\",\"cloud_with_snow\":\"🌨\",\"snowman_with_snow\":\"☃️\",\"snowman\":\"⛄️\",\"snowflake\":\"❄️\",\"wind_face\":\"🌬\",\"dash\":\"💨\",\"tornado\":\"🌪\",\"fog\":\"🌫\",\"ocean\":\"🌊\",\"droplet\":\"💧\",\"sweat_drops\":\"💦\",\"umbrella\":\"☔️\",\"green_apple\":\"🍏\",\"apple\":\"🍎\",\"pear\":\"🍐\",\"tangerine\":\"🍊\",\"orange\":\"🍊\",\"mandarin\":\"🍊\",\"lemon\":\"🍋\",\"banana\":\"🍌\",\"watermelon\":\"🍉\",\"grapes\":\"🍇\",\"strawberry\":\"🍓\",\"melon\":\"🍈\",\"cherries\":\"🍒\",\"peach\":\"🍑\",\"pineapple\":\"🍍\",\"kiwi_fruit\":\"🥝\",\"avocado\":\"🥑\",\"tomato\":\"🍅\",\"eggplant\":\"🍆\",\"cucumber\":\"🥒\",\"carrot\":\"🥕\",\"corn\":\"🌽\",\"hot_pepper\":\"🌶\",\"potato\":\"🥔\",\"sweet_potato\":\"🍠\",\"chestnut\":\"🌰\",\"peanuts\":\"🥜\",\"honey_pot\":\"🍯\",\"croissant\":\"🥐\",\"bread\":\"🍞\",\"baguette_bread\":\"🥖\",\"cheese\":\"🧀\",\"egg\":\"🥚\",\"fried_egg\":\"🍳\",\"bacon\":\"🥓\",\"pancakes\":\"🥞\",\"fried_shrimp\":\"🍤\",\"poultry_leg\":\"🍗\",\"meat_on_bone\":\"🍖\",\"pizza\":\"🍕\",\"hotdog\":\"🌭\",\"hamburger\":\"🍔\",\"fries\":\"🍟\",\"stuffed_flatbread\":\"🥙\",\"taco\":\"🌮\",\"burrito\":\"🌯\",\"green_salad\":\"🥗\",\"shallow_pan_of_food\":\"🥘\",\"spaghetti\":\"🍝\",\"ramen\":\"🍜\",\"stew\":\"🍲\",\"fish_cake\":\"🍥\",\"sushi\":\"🍣\",\"bento\":\"🍱\",\"curry\":\"🍛\",\"rice\":\"🍚\",\"rice_ball\":\"🍙\",\"rice_cracker\":\"🍘\",\"oden\":\"🍢\",\"dango\":\"🍡\",\"shaved_ice\":\"🍧\",\"ice_cream\":\"🍨\",\"icecream\":\"🍦\",\"cake\":\"🍰\",\"birthday\":\"🎂\",\"custard\":\"🍮\",\"lollipop\":\"🍭\",\"candy\":\"🍬\",\"chocolate_bar\":\"🍫\",\"popcorn\":\"🍿\",\"doughnut\":\"🍩\",\"cookie\":\"🍪\",\"milk_glass\":\"🥛\",\"baby_bottle\":\"🍼\",\"coffee\":\"☕️\",\"tea\":\"🍵\",\"sake\":\"🍶\",\"beer\":\"🍺\",\"beers\":\"🍻\",\"clinking_glasses\":\"🥂\",\"wine_glass\":\"🍷\",\"tumbler_glass\":\"🥃\",\"cocktail\":\"🍸\",\"tropical_drink\":\"🍹\",\"champagne\":\"🍾\",\"spoon\":\"🥄\",\"fork_and_knife\":\"🍴\",\"plate_with_cutlery\":\"🍽\",\"soccer\":\"⚽️\",\"basketball\":\"🏀\",\"football\":\"🏈\",\"baseball\":\"⚾️\",\"tennis\":\"🎾\",\"volleyball\":\"🏐\",\"rugby_football\":\"🏉\",\"8ball\":\"🎱\",\"ping_pong\":\"🏓\",\"badminton\":\"🏸\",\"goal_net\":\"🥅\",\"ice_hockey\":\"🏒\",\"field_hockey\":\"🏑\",\"cricket\":\"🏏\",\"golf\":\"⛳️\",\"bow_and_arrow\":\"🏹\",\"fishing_pole_and_fish\":\"🎣\",\"boxing_glove\":\"🥊\",\"martial_arts_uniform\":\"🥋\",\"ice_skate\":\"⛸\",\"ski\":\"🎿\",\"skier\":\"⛷\",\"snowboarder\":\"🏂\",\"weight_lifting_woman\":\"🏋️‍♀️\",\"weight_lifting_man\":\"🏋\",\"person_fencing\":\"🤺\",\"women_wrestling\":\"🤼‍♀\",\"men_wrestling\":\"🤼‍♂\",\"woman_cartwheeling\":\"🤸‍♀\",\"man_cartwheeling\":\"🤸‍♂\",\"basketball_woman\":\"⛹️‍♀️\",\"basketball_man\":\"⛹\",\"woman_playing_handball\":\"🤾‍♀\",\"man_playing_handball\":\"🤾‍♂\",\"golfing_woman\":\"🏌️‍♀️\",\"golfing_man\":\"🏌\",\"surfing_woman\":\"🏄‍♀\",\"surfing_man\":\"🏄\",\"surfer\":\"🏄\",\"swimming_woman\":\"🏊‍♀\",\"swimming_man\":\"🏊\",\"swimmer\":\"🏊\",\"woman_playing_water_polo\":\"🤽‍♀\",\"man_playing_water_polo\":\"🤽‍♂\",\"rowing_woman\":\"🚣‍♀\",\"rowing_man\":\"🚣\",\"rowboat\":\"🚣\",\"horse_racing\":\"🏇\",\"biking_woman\":\"🚴‍♀\",\"biking_man\":\"🚴\",\"bicyclist\":\"🚴\",\"mountain_biking_woman\":\"🚵‍♀\",\"mountain_biking_man\":\"🚵\",\"mountain_bicyclist\":\"🚵\",\"running_shirt_with_sash\":\"🎽\",\"medal_sports\":\"🏅\",\"medal_military\":\"🎖\",\"1st_place_medal\":\"🥇\",\"2nd_place_medal\":\"🥈\",\"3rd_place_medal\":\"🥉\",\"trophy\":\"🏆\",\"rosette\":\"🏵\",\"reminder_ribbon\":\"🎗\",\"ticket\":\"🎫\",\"tickets\":\"🎟\",\"circus_tent\":\"🎪\",\"woman_juggling\":\"🤹‍♀\",\"man_juggling\":\"🤹‍♂\",\"performing_arts\":\"🎭\",\"art\":\"🎨\",\"clapper\":\"🎬\",\"microphone\":\"🎤\",\"headphones\":\"🎧\",\"musical_score\":\"🎼\",\"musical_keyboard\":\"🎹\",\"drum\":\"🥁\",\"saxophone\":\"🎷\",\"trumpet\":\"🎺\",\"guitar\":\"🎸\",\"violin\":\"🎻\",\"game_die\":\"🎲\",\"dart\":\"🎯\",\"bowling\":\"🎳\",\"video_game\":\"🎮\",\"slot_machine\":\"🎰\",\"car\":\"🚗\",\"red_car\":\"🚗\",\"taxi\":\"🚕\",\"blue_car\":\"🚙\",\"bus\":\"🚌\",\"trolleybus\":\"🚎\",\"racing_car\":\"🏎\",\"police_car\":\"🚓\",\"ambulance\":\"🚑\",\"fire_engine\":\"🚒\",\"minibus\":\"🚐\",\"truck\":\"🚚\",\"articulated_lorry\":\"🚛\",\"tractor\":\"🚜\",\"kick_scooter\":\"🛴\",\"bike\":\"🚲\",\"motor_scooter\":\"🛵\",\"motorcycle\":\"🏍\",\"rotating_light\":\"🚨\",\"oncoming_police_car\":\"🚔\",\"oncoming_bus\":\"🚍\",\"oncoming_automobile\":\"🚘\",\"oncoming_taxi\":\"🚖\",\"aerial_tramway\":\"🚡\",\"mountain_cableway\":\"🚠\",\"suspension_railway\":\"🚟\",\"railway_car\":\"🚃\",\"train\":\"🚋\",\"mountain_railway\":\"🚞\",\"monorail\":\"🚝\",\"bullettrain_side\":\"🚄\",\"bullettrain_front\":\"🚅\",\"light_rail\":\"🚈\",\"steam_locomotive\":\"🚂\",\"train2\":\"🚆\",\"metro\":\"🚇\",\"tram\":\"🚊\",\"station\":\"🚉\",\"helicopter\":\"🚁\",\"small_airplane\":\"🛩\",\"airplane\":\"✈️\",\"flight_departure\":\"🛫\",\"flight_arrival\":\"🛬\",\"rocket\":\"🚀\",\"artificial_satellite\":\"🛰\",\"seat\":\"💺\",\"canoe\":\"🛶\",\"boat\":\"⛵️\",\"sailboat\":\"⛵️\",\"motor_boat\":\"🛥\",\"speedboat\":\"🚤\",\"passenger_ship\":\"🛳\",\"ferry\":\"⛴\",\"ship\":\"🚢\",\"anchor\":\"⚓️\",\"construction\":\"🚧\",\"fuelpump\":\"⛽️\",\"busstop\":\"🚏\",\"vertical_traffic_light\":\"🚦\",\"traffic_light\":\"🚥\",\"world_map\":\"🗺\",\"moyai\":\"🗿\",\"statue_of_liberty\":\"🗽\",\"fountain\":\"⛲️\",\"tokyo_tower\":\"🗼\",\"european_castle\":\"🏰\",\"japanese_castle\":\"🏯\",\"stadium\":\"🏟\",\"ferris_wheel\":\"🎡\",\"roller_coaster\":\"🎢\",\"carousel_horse\":\"🎠\",\"parasol_on_ground\":\"⛱\",\"beach_umbrella\":\"🏖\",\"desert_island\":\"🏝\",\"mountain\":\"⛰\",\"mountain_snow\":\"🏔\",\"mount_fuji\":\"🗻\",\"volcano\":\"🌋\",\"desert\":\"🏜\",\"camping\":\"🏕\",\"tent\":\"⛺️\",\"railway_track\":\"🛤\",\"motorway\":\"🛣\",\"building_construction\":\"🏗\",\"factory\":\"🏭\",\"house\":\"🏠\",\"house_with_garden\":\"🏡\",\"houses\":\"🏘\",\"derelict_house\":\"🏚\",\"office\":\"🏢\",\"department_store\":\"🏬\",\"post_office\":\"🏣\",\"european_post_office\":\"🏤\",\"hospital\":\"🏥\",\"bank\":\"🏦\",\"hotel\":\"🏨\",\"convenience_store\":\"🏪\",\"school\":\"🏫\",\"love_hotel\":\"🏩\",\"wedding\":\"💒\",\"classical_building\":\"🏛\",\"church\":\"⛪️\",\"mosque\":\"🕌\",\"synagogue\":\"🕍\",\"kaaba\":\"🕋\",\"shinto_shrine\":\"⛩\",\"japan\":\"🗾\",\"rice_scene\":\"🎑\",\"national_park\":\"🏞\",\"sunrise\":\"🌅\",\"sunrise_over_mountains\":\"🌄\",\"stars\":\"🌠\",\"sparkler\":\"🎇\",\"fireworks\":\"🎆\",\"city_sunrise\":\"🌇\",\"city_sunset\":\"🌆\",\"cityscape\":\"🏙\",\"night_with_stars\":\"🌃\",\"milky_way\":\"🌌\",\"bridge_at_night\":\"🌉\",\"foggy\":\"🌁\",\"watch\":\"⌚️\",\"iphone\":\"📱\",\"calling\":\"📲\",\"computer\":\"💻\",\"keyboard\":\"⌨️\",\"desktop_computer\":\"🖥\",\"printer\":\"🖨\",\"computer_mouse\":\"🖱\",\"trackball\":\"🖲\",\"joystick\":\"🕹\",\"clamp\":\"🗜\",\"minidisc\":\"💽\",\"floppy_disk\":\"💾\",\"cd\":\"💿\",\"dvd\":\"📀\",\"vhs\":\"📼\",\"camera\":\"📷\",\"camera_flash\":\"📸\",\"video_camera\":\"📹\",\"movie_camera\":\"🎥\",\"film_projector\":\"📽\",\"film_strip\":\"🎞\",\"telephone_receiver\":\"📞\",\"phone\":\"☎️\",\"telephone\":\"☎️\",\"pager\":\"📟\",\"fax\":\"📠\",\"tv\":\"📺\",\"radio\":\"📻\",\"studio_microphone\":\"🎙\",\"level_slider\":\"🎚\",\"control_knobs\":\"🎛\",\"stopwatch\":\"⏱\",\"timer_clock\":\"⏲\",\"alarm_clock\":\"⏰\",\"mantelpiece_clock\":\"🕰\",\"hourglass\":\"⌛️\",\"hourglass_flowing_sand\":\"⏳\",\"satellite\":\"📡\",\"battery\":\"🔋\",\"electric_plug\":\"🔌\",\"bulb\":\"💡\",\"flashlight\":\"🔦\",\"candle\":\"🕯\",\"wastebasket\":\"🗑\",\"oil_drum\":\"🛢\",\"money_with_wings\":\"💸\",\"dollar\":\"💵\",\"yen\":\"💴\",\"euro\":\"💶\",\"pound\":\"💷\",\"moneybag\":\"💰\",\"credit_card\":\"💳\",\"gem\":\"💎\",\"balance_scale\":\"⚖️\",\"wrench\":\"🔧\",\"hammer\":\"🔨\",\"hammer_and_pick\":\"⚒\",\"hammer_and_wrench\":\"🛠\",\"pick\":\"⛏\",\"nut_and_bolt\":\"🔩\",\"gear\":\"⚙️\",\"chains\":\"⛓\",\"gun\":\"🔫\",\"bomb\":\"💣\",\"hocho\":\"🔪\",\"knife\":\"🔪\",\"dagger\":\"🗡\",\"crossed_swords\":\"⚔️\",\"shield\":\"🛡\",\"smoking\":\"🚬\",\"coffin\":\"⚰️\",\"funeral_urn\":\"⚱️\",\"amphora\":\"🏺\",\"crystal_ball\":\"🔮\",\"prayer_beads\":\"📿\",\"barber\":\"💈\",\"alembic\":\"⚗️\",\"telescope\":\"🔭\",\"microscope\":\"🔬\",\"hole\":\"🕳\",\"pill\":\"💊\",\"syringe\":\"💉\",\"thermometer\":\"🌡\",\"toilet\":\"🚽\",\"potable_water\":\"🚰\",\"shower\":\"🚿\",\"bathtub\":\"🛁\",\"bath\":\"🛀\",\"bellhop_bell\":\"🛎\",\"key\":\"🔑\",\"old_key\":\"🗝\",\"door\":\"🚪\",\"couch_and_lamp\":\"🛋\",\"bed\":\"🛏\",\"sleeping_bed\":\"🛌\",\"framed_picture\":\"🖼\",\"shopping\":\"🛍\",\"shopping_cart\":\"🛒\",\"gift\":\"🎁\",\"balloon\":\"🎈\",\"flags\":\"🎏\",\"ribbon\":\"🎀\",\"confetti_ball\":\"🎊\",\"tada\":\"🎉\",\"dolls\":\"🎎\",\"izakaya_lantern\":\"🏮\",\"lantern\":\"🏮\",\"wind_chime\":\"🎐\",\"email\":\"✉️\",\"envelope\":\"✉️\",\"envelope_with_arrow\":\"📩\",\"incoming_envelope\":\"📨\",\"e-mail\":\"📧\",\"love_letter\":\"💌\",\"inbox_tray\":\"📥\",\"outbox_tray\":\"📤\",\"package\":\"📦\",\"label\":\"🏷\",\"mailbox_closed\":\"📪\",\"mailbox\":\"📫\",\"mailbox_with_mail\":\"📬\",\"mailbox_with_no_mail\":\"📭\",\"postbox\":\"📮\",\"postal_horn\":\"📯\",\"scroll\":\"📜\",\"page_with_curl\":\"📃\",\"page_facing_up\":\"📄\",\"bookmark_tabs\":\"📑\",\"bar_chart\":\"📊\",\"chart_with_upwards_trend\":\"📈\",\"chart_with_downwards_trend\":\"📉\",\"spiral_notepad\":\"🗒\",\"spiral_calendar\":\"🗓\",\"calendar\":\"📆\",\"date\":\"📅\",\"card_index\":\"📇\",\"card_file_box\":\"🗃\",\"ballot_box\":\"🗳\",\"file_cabinet\":\"🗄\",\"clipboard\":\"📋\",\"file_folder\":\"📁\",\"open_file_folder\":\"📂\",\"card_index_dividers\":\"🗂\",\"newspaper_roll\":\"🗞\",\"newspaper\":\"📰\",\"notebook\":\"📓\",\"notebook_with_decorative_cover\":\"📔\",\"ledger\":\"📒\",\"closed_book\":\"📕\",\"green_book\":\"📗\",\"blue_book\":\"📘\",\"orange_book\":\"📙\",\"books\":\"📚\",\"book\":\"📖\",\"open_book\":\"📖\",\"bookmark\":\"🔖\",\"link\":\"🔗\",\"paperclip\":\"📎\",\"paperclips\":\"🖇\",\"triangular_ruler\":\"📐\",\"straight_ruler\":\"📏\",\"pushpin\":\"📌\",\"round_pushpin\":\"📍\",\"scissors\":\"✂️\",\"pen\":\"🖊\",\"fountain_pen\":\"🖋\",\"black_nib\":\"✒️\",\"paintbrush\":\"🖌\",\"crayon\":\"🖍\",\"memo\":\"📝\",\"pencil\":\"📝\",\"pencil2\":\"✏️\",\"mag\":\"🔍\",\"mag_right\":\"🔎\",\"lock_with_ink_pen\":\"🔏\",\"closed_lock_with_key\":\"🔐\",\"lock\":\"🔒\",\"unlock\":\"🔓\",\"heart\":\"❤️\",\"yellow_heart\":\"💛\",\"green_heart\":\"💚\",\"blue_heart\":\"💙\",\"purple_heart\":\"💜\",\"black_heart\":\"🖤\",\"broken_heart\":\"💔\",\"heavy_heart_exclamation\":\"❣️\",\"two_hearts\":\"💕\",\"revolving_hearts\":\"💞\",\"heartbeat\":\"💓\",\"heartpulse\":\"💗\",\"sparkling_heart\":\"💖\",\"cupid\":\"💘\",\"gift_heart\":\"💝\",\"heart_decoration\":\"💟\",\"peace_symbol\":\"☮️\",\"latin_cross\":\"✝️\",\"star_and_crescent\":\"☪️\",\"om\":\"🕉\",\"wheel_of_dharma\":\"☸️\",\"star_of_david\":\"✡️\",\"six_pointed_star\":\"🔯\",\"menorah\":\"🕎\",\"yin_yang\":\"☯️\",\"orthodox_cross\":\"☦️\",\"place_of_worship\":\"🛐\",\"ophiuchus\":\"⛎\",\"aries\":\"♈️\",\"taurus\":\"♉️\",\"gemini\":\"♊️\",\"cancer\":\"♋️\",\"leo\":\"♌️\",\"virgo\":\"♍️\",\"libra\":\"♎️\",\"scorpius\":\"♏️\",\"sagittarius\":\"♐️\",\"capricorn\":\"♑️\",\"aquarius\":\"♒️\",\"pisces\":\"♓️\",\"id\":\"🆔\",\"atom_symbol\":\"⚛️\",\"accept\":\"🉑\",\"radioactive\":\"☢️\",\"biohazard\":\"☣️\",\"mobile_phone_off\":\"📴\",\"vibration_mode\":\"📳\",\"eight_pointed_black_star\":\"✴️\",\"vs\":\"🆚\",\"white_flower\":\"💮\",\"ideograph_advantage\":\"🉐\",\"secret\":\"㊙️\",\"congratulations\":\"㊗️\",\"u6e80\":\"🈵\",\"a\":\"🅰️\",\"b\":\"🅱️\",\"ab\":\"🆎\",\"cl\":\"🆑\",\"o2\":\"🅾️\",\"sos\":\"🆘\",\"x\":\"❌\",\"o\":\"⭕️\",\"stop_sign\":\"🛑\",\"no_entry\":\"⛔️\",\"name_badge\":\"📛\",\"no_entry_sign\":\"🚫\",\"anger\":\"💢\",\"hotsprings\":\"♨️\",\"no_pedestrians\":\"🚷\",\"do_not_litter\":\"🚯\",\"no_bicycles\":\"🚳\",\"non-potable_water\":\"🚱\",\"underage\":\"🔞\",\"no_mobile_phones\":\"📵\",\"no_smoking\":\"🚭\",\"exclamation\":\"❗️\",\"heavy_exclamation_mark\":\"❗️\",\"grey_exclamation\":\"❕\",\"question\":\"❓\",\"grey_question\":\"❔\",\"bangbang\":\"‼️\",\"interrobang\":\"⁉️\",\"low_brightness\":\"🔅\",\"high_brightness\":\"🔆\",\"part_alternation_mark\":\"〽️\",\"warning\":\"⚠️\",\"children_crossing\":\"🚸\",\"trident\":\"🔱\",\"fleur_de_lis\":\"⚜️\",\"beginner\":\"🔰\",\"recycle\":\"♻️\",\"white_check_mark\":\"✅\",\"chart\":\"💹\",\"sparkle\":\"❇️\",\"eight_spoked_asterisk\":\"✳️\",\"negative_squared_cross_mark\":\"❎\",\"globe_with_meridians\":\"🌐\",\"diamond_shape_with_a_dot_inside\":\"💠\",\"m\":\"Ⓜ️\",\"cyclone\":\"🌀\",\"zzz\":\"💤\",\"atm\":\"🏧\",\"wc\":\"🚾\",\"wheelchair\":\"♿️\",\"parking\":\"🅿️\",\"sa\":\"🈂️\",\"passport_control\":\"🛂\",\"customs\":\"🛃\",\"baggage_claim\":\"🛄\",\"left_luggage\":\"🛅\",\"mens\":\"🚹\",\"womens\":\"🚺\",\"baby_symbol\":\"🚼\",\"restroom\":\"🚻\",\"put_litter_in_its_place\":\"🚮\",\"cinema\":\"🎦\",\"signal_strength\":\"📶\",\"koko\":\"🈁\",\"symbols\":\"🔣\",\"information_source\":\"ℹ️\",\"abc\":\"🔤\",\"abcd\":\"🔡\",\"capital_abcd\":\"🔠\",\"ng\":\"🆖\",\"ok\":\"🆗\",\"up\":\"🆙\",\"cool\":\"🆒\",\"new\":\"🆕\",\"free\":\"🆓\",\"zero\":\"0️⃣\",\"one\":\"1️⃣\",\"two\":\"2️⃣\",\"three\":\"3️⃣\",\"four\":\"4️⃣\",\"five\":\"5️⃣\",\"six\":\"6️⃣\",\"seven\":\"7️⃣\",\"eight\":\"8️⃣\",\"nine\":\"9️⃣\",\"keycap_ten\":\"🔟\",\"hash\":\"#️⃣\",\"asterisk\":\"*️⃣\",\"arrow_forward\":\"▶️\",\"pause_button\":\"⏸\",\"play_or_pause_button\":\"⏯\",\"stop_button\":\"⏹\",\"record_button\":\"⏺\",\"next_track_button\":\"⏭\",\"previous_track_button\":\"⏮\",\"fast_forward\":\"⏩\",\"rewind\":\"⏪\",\"arrow_double_up\":\"⏫\",\"arrow_double_down\":\"⏬\",\"arrow_backward\":\"◀️\",\"arrow_up_small\":\"🔼\",\"arrow_down_small\":\"🔽\",\"arrow_right\":\"➡️\",\"arrow_left\":\"⬅️\",\"arrow_up\":\"⬆️\",\"arrow_down\":\"⬇️\",\"arrow_upper_right\":\"↗️\",\"arrow_lower_right\":\"↘️\",\"arrow_lower_left\":\"↙️\",\"arrow_upper_left\":\"↖️\",\"arrow_up_down\":\"↕️\",\"left_right_arrow\":\"↔️\",\"arrow_right_hook\":\"↪️\",\"leftwards_arrow_with_hook\":\"↩️\",\"arrow_heading_up\":\"⤴️\",\"arrow_heading_down\":\"⤵️\",\"twisted_rightwards_arrows\":\"🔀\",\"repeat\":\"🔁\",\"repeat_one\":\"🔂\",\"arrows_counterclockwise\":\"🔄\",\"arrows_clockwise\":\"🔃\",\"musical_note\":\"🎵\",\"notes\":\"🎶\",\"heavy_plus_sign\":\"➕\",\"heavy_minus_sign\":\"➖\",\"heavy_division_sign\":\"➗\",\"heavy_multiplication_x\":\"✖️\",\"heavy_dollar_sign\":\"💲\",\"currency_exchange\":\"💱\",\"tm\":\"™️\",\"copyright\":\"©️\",\"registered\":\"®️\",\"wavy_dash\":\"〰️\",\"curly_loop\":\"➰\",\"loop\":\"➿\",\"end\":\"🔚\",\"back\":\"🔙\",\"on\":\"🔛\",\"top\":\"🔝\",\"soon\":\"🔜\",\"heavy_check_mark\":\"✔️\",\"ballot_box_with_check\":\"☑️\",\"radio_button\":\"🔘\",\"white_circle\":\"⚪️\",\"black_circle\":\"⚫️\",\"red_circle\":\"🔴\",\"large_blue_circle\":\"🔵\",\"small_red_triangle\":\"🔺\",\"small_red_triangle_down\":\"🔻\",\"small_orange_diamond\":\"🔸\",\"small_blue_diamond\":\"🔹\",\"large_orange_diamond\":\"🔶\",\"large_blue_diamond\":\"🔷\",\"white_square_button\":\"🔳\",\"black_square_button\":\"🔲\",\"black_small_square\":\"▪️\",\"white_small_square\":\"▫️\",\"black_medium_small_square\":\"◾️\",\"white_medium_small_square\":\"◽️\",\"black_medium_square\":\"◼️\",\"white_medium_square\":\"◻️\",\"black_large_square\":\"⬛️\",\"white_large_square\":\"⬜️\",\"speaker\":\"🔈\",\"mute\":\"🔇\",\"sound\":\"🔉\",\"loud_sound\":\"🔊\",\"bell\":\"🔔\",\"no_bell\":\"🔕\",\"mega\":\"📣\",\"loudspeaker\":\"📢\",\"eye_speech_bubble\":\"👁‍🗨\",\"speech_balloon\":\"💬\",\"thought_balloon\":\"💭\",\"right_anger_bubble\":\"🗯\",\"spades\":\"♠️\",\"clubs\":\"♣️\",\"hearts\":\"♥️\",\"diamonds\":\"♦️\",\"black_joker\":\"🃏\",\"flower_playing_cards\":\"🎴\",\"mahjong\":\"🀄️\",\"clock1\":\"🕐\",\"clock2\":\"🕑\",\"clock3\":\"🕒\",\"clock4\":\"🕓\",\"clock5\":\"🕔\",\"clock6\":\"🕕\",\"clock7\":\"🕖\",\"clock8\":\"🕗\",\"clock9\":\"🕘\",\"clock10\":\"🕙\",\"clock11\":\"🕚\",\"clock12\":\"🕛\",\"clock130\":\"🕜\",\"clock230\":\"🕝\",\"clock330\":\"🕞\",\"clock430\":\"🕟\",\"clock530\":\"🕠\",\"clock630\":\"🕡\",\"clock730\":\"🕢\",\"clock830\":\"🕣\",\"clock930\":\"🕤\",\"clock1030\":\"🕥\",\"clock1130\":\"🕦\",\"clock1230\":\"🕧\",\"white_flag\":\"🏳️\",\"black_flag\":\"🏴\",\"checkered_flag\":\"🏁\",\"triangular_flag_on_post\":\"🚩\",\"rainbow_flag\":\"🏳️‍🌈\",\"afghanistan\":\"🇦🇫\",\"aland_islands\":\"🇦🇽\",\"albania\":\"🇦🇱\",\"algeria\":\"🇩🇿\",\"american_samoa\":\"🇦🇸\",\"andorra\":\"🇦🇩\",\"angola\":\"🇦🇴\",\"anguilla\":\"🇦🇮\",\"antarctica\":\"🇦🇶\",\"antigua_barbuda\":\"🇦🇬\",\"argentina\":\"🇦🇷\",\"armenia\":\"🇦🇲\",\"aruba\":\"🇦🇼\",\"australia\":\"🇦🇺\",\"austria\":\"🇦🇹\",\"azerbaijan\":\"🇦🇿\",\"bahamas\":\"🇧🇸\",\"bahrain\":\"🇧🇭\",\"bangladesh\":\"🇧🇩\",\"barbados\":\"🇧🇧\",\"belarus\":\"🇧🇾\",\"belgium\":\"🇧🇪\",\"belize\":\"🇧🇿\",\"benin\":\"🇧🇯\",\"bermuda\":\"🇧🇲\",\"bhutan\":\"🇧🇹\",\"bolivia\":\"🇧🇴\",\"caribbean_netherlands\":\"🇧🇶\",\"bosnia_herzegovina\":\"🇧🇦\",\"botswana\":\"🇧🇼\",\"brazil\":\"🇧🇷\",\"british_indian_ocean_territory\":\"🇮🇴\",\"british_virgin_islands\":\"🇻🇬\",\"brunei\":\"🇧🇳\",\"bulgaria\":\"🇧🇬\",\"burkina_faso\":\"🇧🇫\",\"burundi\":\"🇧🇮\",\"cape_verde\":\"🇨🇻\",\"cambodia\":\"🇰🇭\",\"cameroon\":\"🇨🇲\",\"canada\":\"🇨🇦\",\"canary_islands\":\"🇮🇨\",\"cayman_islands\":\"🇰🇾\",\"central_african_republic\":\"🇨🇫\",\"chad\":\"🇹🇩\",\"chile\":\"🇨🇱\",\"cn\":\"🇨🇳\",\"christmas_island\":\"🇨🇽\",\"cocos_islands\":\"🇨🇨\",\"colombia\":\"🇨🇴\",\"comoros\":\"🇰🇲\",\"congo_brazzaville\":\"🇨🇬\",\"congo_kinshasa\":\"🇨🇩\",\"cook_islands\":\"🇨🇰\",\"costa_rica\":\"🇨🇷\",\"cote_divoire\":\"🇨🇮\",\"croatia\":\"🇭🇷\",\"cuba\":\"🇨🇺\",\"curacao\":\"🇨🇼\",\"cyprus\":\"🇨🇾\",\"czech_republic\":\"🇨🇿\",\"denmark\":\"🇩🇰\",\"djibouti\":\"🇩🇯\",\"dominica\":\"🇩🇲\",\"dominican_republic\":\"🇩🇴\",\"ecuador\":\"🇪🇨\",\"egypt\":\"🇪🇬\",\"el_salvador\":\"🇸🇻\",\"equatorial_guinea\":\"🇬🇶\",\"eritrea\":\"🇪🇷\",\"estonia\":\"🇪🇪\",\"ethiopia\":\"🇪🇹\",\"eu\":\"🇪🇺\",\"european_union\":\"🇪🇺\",\"falkland_islands\":\"🇫🇰\",\"faroe_islands\":\"🇫🇴\",\"fiji\":\"🇫🇯\",\"finland\":\"🇫🇮\",\"fr\":\"🇫🇷\",\"french_guiana\":\"🇬🇫\",\"french_polynesia\":\"🇵🇫\",\"french_southern_territories\":\"🇹🇫\",\"gabon\":\"🇬🇦\",\"gambia\":\"🇬🇲\",\"georgia\":\"🇬🇪\",\"de\":\"🇩🇪\",\"ghana\":\"🇬🇭\",\"gibraltar\":\"🇬🇮\",\"greece\":\"🇬🇷\",\"greenland\":\"🇬🇱\",\"grenada\":\"🇬🇩\",\"guadeloupe\":\"🇬🇵\",\"guam\":\"🇬🇺\",\"guatemala\":\"🇬🇹\",\"guernsey\":\"🇬🇬\",\"guinea\":\"🇬🇳\",\"guinea_bissau\":\"🇬🇼\",\"guyana\":\"🇬🇾\",\"haiti\":\"🇭🇹\",\"honduras\":\"🇭🇳\",\"hong_kong\":\"🇭🇰\",\"hungary\":\"🇭🇺\",\"iceland\":\"🇮🇸\",\"india\":\"🇮🇳\",\"indonesia\":\"🇮🇩\",\"iran\":\"🇮🇷\",\"iraq\":\"🇮🇶\",\"ireland\":\"🇮🇪\",\"isle_of_man\":\"🇮🇲\",\"israel\":\"🇮🇱\",\"it\":\"🇮🇹\",\"jamaica\":\"🇯🇲\",\"jp\":\"🇯🇵\",\"crossed_flags\":\"🎌\",\"jersey\":\"🇯🇪\",\"jordan\":\"🇯🇴\",\"kazakhstan\":\"🇰🇿\",\"kenya\":\"🇰🇪\",\"kiribati\":\"🇰🇮\",\"kosovo\":\"🇽🇰\",\"kuwait\":\"🇰🇼\",\"kyrgyzstan\":\"🇰🇬\",\"laos\":\"🇱🇦\",\"latvia\":\"🇱🇻\",\"lebanon\":\"🇱🇧\",\"lesotho\":\"🇱🇸\",\"liberia\":\"🇱🇷\",\"libya\":\"🇱🇾\",\"liechtenstein\":\"🇱🇮\",\"lithuania\":\"🇱🇹\",\"luxembourg\":\"🇱🇺\",\"macau\":\"🇲🇴\",\"macedonia\":\"🇲🇰\",\"madagascar\":\"🇲🇬\",\"malawi\":\"🇲🇼\",\"malaysia\":\"🇲🇾\",\"maldives\":\"🇲🇻\",\"mali\":\"🇲🇱\",\"malta\":\"🇲🇹\",\"marshall_islands\":\"🇲🇭\",\"martinique\":\"🇲🇶\",\"mauritania\":\"🇲🇷\",\"mauritius\":\"🇲🇺\",\"mayotte\":\"🇾🇹\",\"mexico\":\"🇲🇽\",\"micronesia\":\"🇫🇲\",\"moldova\":\"🇲🇩\",\"monaco\":\"🇲🇨\",\"mongolia\":\"🇲🇳\",\"montenegro\":\"🇲🇪\",\"montserrat\":\"🇲🇸\",\"morocco\":\"🇲🇦\",\"mozambique\":\"🇲🇿\",\"myanmar\":\"🇲🇲\",\"namibia\":\"🇳🇦\",\"nauru\":\"🇳🇷\",\"nepal\":\"🇳🇵\",\"netherlands\":\"🇳🇱\",\"new_caledonia\":\"🇳🇨\",\"new_zealand\":\"🇳🇿\",\"nicaragua\":\"🇳🇮\",\"niger\":\"🇳🇪\",\"nigeria\":\"🇳🇬\",\"niue\":\"🇳🇺\",\"norfolk_island\":\"🇳🇫\",\"northern_mariana_islands\":\"🇲🇵\",\"north_korea\":\"🇰🇵\",\"norway\":\"🇳🇴\",\"oman\":\"🇴🇲\",\"pakistan\":\"🇵🇰\",\"palau\":\"🇵🇼\",\"palestinian_territories\":\"🇵🇸\",\"panama\":\"🇵🇦\",\"papua_new_guinea\":\"🇵🇬\",\"paraguay\":\"🇵🇾\",\"peru\":\"🇵🇪\",\"philippines\":\"🇵🇭\",\"pitcairn_islands\":\"🇵🇳\",\"poland\":\"🇵🇱\",\"portugal\":\"🇵🇹\",\"puerto_rico\":\"🇵🇷\",\"qatar\":\"🇶🇦\",\"reunion\":\"🇷🇪\",\"romania\":\"🇷🇴\",\"ru\":\"🇷🇺\",\"rwanda\":\"🇷🇼\",\"st_barthelemy\":\"🇧🇱\",\"st_helena\":\"🇸🇭\",\"st_kitts_nevis\":\"🇰🇳\",\"st_lucia\":\"🇱🇨\",\"st_pierre_miquelon\":\"🇵🇲\",\"st_vincent_grenadines\":\"🇻🇨\",\"samoa\":\"🇼🇸\",\"san_marino\":\"🇸🇲\",\"sao_tome_principe\":\"🇸🇹\",\"saudi_arabia\":\"🇸🇦\",\"senegal\":\"🇸🇳\",\"serbia\":\"🇷🇸\",\"seychelles\":\"🇸🇨\",\"sierra_leone\":\"🇸🇱\",\"singapore\":\"🇸🇬\",\"sint_maarten\":\"🇸🇽\",\"slovakia\":\"🇸🇰\",\"slovenia\":\"🇸🇮\",\"solomon_islands\":\"🇸🇧\",\"somalia\":\"🇸🇴\",\"south_africa\":\"🇿🇦\",\"south_georgia_south_sandwich_islands\":\"🇬🇸\",\"kr\":\"🇰🇷\",\"south_sudan\":\"🇸🇸\",\"es\":\"🇪🇸\",\"sri_lanka\":\"🇱🇰\",\"sudan\":\"🇸🇩\",\"suriname\":\"🇸🇷\",\"swaziland\":\"🇸🇿\",\"sweden\":\"🇸🇪\",\"switzerland\":\"🇨🇭\",\"syria\":\"🇸🇾\",\"taiwan\":\"🇹🇼\",\"tajikistan\":\"🇹🇯\",\"tanzania\":\"🇹🇿\",\"thailand\":\"🇹🇭\",\"timor_leste\":\"🇹🇱\",\"togo\":\"🇹🇬\",\"tokelau\":\"🇹🇰\",\"tonga\":\"🇹🇴\",\"trinidad_tobago\":\"🇹🇹\",\"tunisia\":\"🇹🇳\",\"tr\":\"🇹🇷\",\"turkmenistan\":\"🇹🇲\",\"turks_caicos_islands\":\"🇹🇨\",\"tuvalu\":\"🇹🇻\",\"uganda\":\"🇺🇬\",\"ukraine\":\"🇺🇦\",\"united_arab_emirates\":\"🇦🇪\",\"gb\":\"🇬🇧\",\"uk\":\"🇬🇧\",\"us\":\"🇺🇸\",\"us_virgin_islands\":\"🇻🇮\",\"uruguay\":\"🇺🇾\",\"uzbekistan\":\"🇺🇿\",\"vanuatu\":\"🇻🇺\",\"vatican_city\":\"🇻🇦\",\"venezuela\":\"🇻🇪\",\"vietnam\":\"🇻🇳\",\"wallis_futuna\":\"🇼🇫\",\"western_sahara\":\"🇪🇭\",\"yemen\":\"🇾🇪\",\"zambia\":\"🇿🇲\",\"zimbabwe\":\"🇿🇼\"}");

/***/ }),

/***/ "ff97":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process definition lists
//



module.exports = function deflist_plugin(md) {
  var isSpace = md.utils.isSpace;

  // Search `[:~][\n ]`, returns next pos after marker on success
  // or -1 on fail.
  function skipMarker(state, line) {
    var pos, marker,
        start = state.bMarks[line] + state.tShift[line],
        max = state.eMarks[line];

    if (start >= max) { return -1; }

    // Check bullet
    marker = state.src.charCodeAt(start++);
    if (marker !== 0x7E/* ~ */ && marker !== 0x3A/* : */) { return -1; }

    pos = state.skipSpaces(start);

    // require space after ":"
    if (start === pos) { return -1; }

    // no empty definitions, e.g. "  : "
    if (pos >= max) { return -1; }

    return start;
  }

  function markTightParagraphs(state, idx) {
    var i, l,
        level = state.level + 2;

    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
        state.tokens[i + 2].hidden = true;
        state.tokens[i].hidden = true;
        i += 2;
      }
    }
  }

  function deflist(state, startLine, endLine, silent) {
    var ch,
        contentStart,
        ddLine,
        dtLine,
        itemLines,
        listLines,
        listTokIdx,
        max,
        nextLine,
        offset,
        oldDDIndent,
        oldIndent,
        oldParentType,
        oldSCount,
        oldTShift,
        oldTight,
        pos,
        prevEmptyEnd,
        tight,
        token;

    if (silent) {
      // quirk: validation mode validates a dd block only, not a whole deflist
      if (state.ddIndent < 0) { return false; }
      return skipMarker(state, startLine) >= 0;
    }

    nextLine = startLine + 1;
    if (nextLine >= endLine) { return false; }

    if (state.isEmpty(nextLine)) {
      nextLine++;
      if (nextLine >= endLine) { return false; }
    }

    if (state.sCount[nextLine] < state.blkIndent) { return false; }
    contentStart = skipMarker(state, nextLine);
    if (contentStart < 0) { return false; }

    // Start list
    listTokIdx = state.tokens.length;
    tight = true;

    token     = state.push('dl_open', 'dl', 1);
    token.map = listLines = [ startLine, 0 ];

    //
    // Iterate list items
    //

    dtLine = startLine;
    ddLine = nextLine;

    // One definition list can contain multiple DTs,
    // and one DT can be followed by multiple DDs.
    //
    // Thus, there is two loops here, and label is
    // needed to break out of the second one
    //
    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    for (;;) {
      prevEmptyEnd = false;

      token          = state.push('dt_open', 'dt', 1);
      token.map      = [ dtLine, dtLine ];

      token          = state.push('inline', '', 0);
      token.map      = [ dtLine, dtLine ];
      token.content  = state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim();
      token.children = [];

      token          = state.push('dt_close', 'dt', -1);

      for (;;) {
        token     = state.push('dd_open', 'dd', 1);
        token.map = itemLines = [ nextLine, 0 ];

        pos = contentStart;
        max = state.eMarks[ddLine];
        offset = state.sCount[ddLine] + contentStart - (state.bMarks[ddLine] + state.tShift[ddLine]);

        while (pos < max) {
          ch = state.src.charCodeAt(pos);

          if (isSpace(ch)) {
            if (ch === 0x09) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
          } else {
            break;
          }

          pos++;
        }

        contentStart = pos;

        oldTight = state.tight;
        oldDDIndent = state.ddIndent;
        oldIndent = state.blkIndent;
        oldTShift = state.tShift[ddLine];
        oldSCount = state.sCount[ddLine];
        oldParentType = state.parentType;
        state.blkIndent = state.ddIndent = state.sCount[ddLine] + 2;
        state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
        state.sCount[ddLine] = offset;
        state.tight = true;
        state.parentType = 'deflist';

        state.md.block.tokenize(state, ddLine, endLine, true);

        // If any of list item is tight, mark list as tight
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        // Item become loose if finish with empty line,
        // but we should filter last element, because it means list finish
        prevEmptyEnd = (state.line - ddLine) > 1 && state.isEmpty(state.line - 1);

        state.tShift[ddLine] = oldTShift;
        state.sCount[ddLine] = oldSCount;
        state.tight = oldTight;
        state.parentType = oldParentType;
        state.blkIndent = oldIndent;
        state.ddIndent = oldDDIndent;

        token = state.push('dd_close', 'dd', -1);

        itemLines[1] = nextLine = state.line;

        if (nextLine >= endLine) { break OUTER; }

        if (state.sCount[nextLine] < state.blkIndent) { break OUTER; }
        contentStart = skipMarker(state, nextLine);
        if (contentStart < 0) { break; }

        ddLine = nextLine;

        // go to the next loop iteration:
        // insert DD tag and repeat checking
      }

      if (nextLine >= endLine) { break; }
      dtLine = nextLine;

      if (state.isEmpty(dtLine)) { break; }
      if (state.sCount[dtLine] < state.blkIndent) { break; }

      ddLine = dtLine + 1;
      if (ddLine >= endLine) { break; }
      if (state.isEmpty(ddLine)) { ddLine++; }
      if (ddLine >= endLine) { break; }

      if (state.sCount[ddLine] < state.blkIndent) { break; }
      contentStart = skipMarker(state, ddLine);
      if (contentStart < 0) { break; }

      // go to the next loop iteration:
      // insert DT and DD tags and repeat checking
    }

    // Finilize list
    token = state.push('dl_close', 'dl', -1);

    listLines[1] = nextLine;

    state.line = nextLine;

    // mark paragraphs tight if needed
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }

    return true;
  }


  md.block.ruler.before('paragraph', 'deflist', deflist, { alt: [ 'paragraph', 'reference' ] });
};


/***/ })

}]);
//# sourceMappingURL=chunk-vendors~35c1050b.805c3358.js.map