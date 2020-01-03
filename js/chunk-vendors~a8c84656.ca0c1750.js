(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~a8c84656"],{

/***/ "15d1":
/***/ (function(module, exports) {

/**
 * This file holds a list of all no-argument functions and single-character
 * symbols (like 'a' or ';').
 *
 * For each of the symbols, there are three properties they can have:
 * - font (required): the font to be used for this symbol. Either "main" (the
     normal font), or "ams" (the ams fonts).
 * - group (required): the ParseNode group type the symbol should have (i.e.
     "textord", "mathord", etc).
     See https://github.com/Khan/KaTeX/wiki/Examining-TeX#group-types
 * - replace: the character that this symbol or function should be
 *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
 *   character in the main font).
 *
 * The outermost map in the table indicates what mode the symbols should be
 * accepted in (e.g. "math" or "text").
 */

module.exports = {
    math: {},
    text: {},
};

function defineSymbol(mode, font, group, replace, name) {
    module.exports[mode][name] = {
        font: font,
        group: group,
        replace: replace,
    };
}

// Some abbreviations for commonly used strings.
// This helps minify the code, and also spotting typos using jshint.

// modes:
var math = "math";
var text = "text";

// fonts:
var main = "main";
var ams = "ams";

// groups:
var accent = "accent";
var bin = "bin";
var close = "close";
var inner = "inner";
var mathord = "mathord";
var op = "op";
var open = "open";
var punct = "punct";
var rel = "rel";
var spacing = "spacing";
var textord = "textord";

// Now comes the symbol table

// Relation Symbols
defineSymbol(math, main, rel, "\u2261", "\\equiv");
defineSymbol(math, main, rel, "\u227a", "\\prec");
defineSymbol(math, main, rel, "\u227b", "\\succ");
defineSymbol(math, main, rel, "\u223c", "\\sim");
defineSymbol(math, main, rel, "\u22a5", "\\perp");
defineSymbol(math, main, rel, "\u2aaf", "\\preceq");
defineSymbol(math, main, rel, "\u2ab0", "\\succeq");
defineSymbol(math, main, rel, "\u2243", "\\simeq");
defineSymbol(math, main, rel, "\u2223", "\\mid");
defineSymbol(math, main, rel, "\u226a", "\\ll");
defineSymbol(math, main, rel, "\u226b", "\\gg");
defineSymbol(math, main, rel, "\u224d", "\\asymp");
defineSymbol(math, main, rel, "\u2225", "\\parallel");
defineSymbol(math, main, rel, "\u22c8", "\\bowtie");
defineSymbol(math, main, rel, "\u2323", "\\smile");
defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq");
defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq");
defineSymbol(math, main, rel, "\u2250", "\\doteq");
defineSymbol(math, main, rel, "\u2322", "\\frown");
defineSymbol(math, main, rel, "\u220b", "\\ni");
defineSymbol(math, main, rel, "\u221d", "\\propto");
defineSymbol(math, main, rel, "\u22a2", "\\vdash");
defineSymbol(math, main, rel, "\u22a3", "\\dashv");
defineSymbol(math, main, rel, "\u220b", "\\owns");

// Punctuation
defineSymbol(math, main, punct, "\u002e", "\\ldotp");
defineSymbol(math, main, punct, "\u22c5", "\\cdotp");

// Misc Symbols
defineSymbol(math, main, textord, "\u0023", "\\#");
defineSymbol(math, main, textord, "\u0026", "\\&");
defineSymbol(math, main, textord, "\u2135", "\\aleph");
defineSymbol(math, main, textord, "\u2200", "\\forall");
defineSymbol(math, main, textord, "\u210f", "\\hbar");
defineSymbol(math, main, textord, "\u2203", "\\exists");
defineSymbol(math, main, textord, "\u2207", "\\nabla");
defineSymbol(math, main, textord, "\u266d", "\\flat");
defineSymbol(math, main, textord, "\u2113", "\\ell");
defineSymbol(math, main, textord, "\u266e", "\\natural");
defineSymbol(math, main, textord, "\u2663", "\\clubsuit");
defineSymbol(math, main, textord, "\u2118", "\\wp");
defineSymbol(math, main, textord, "\u266f", "\\sharp");
defineSymbol(math, main, textord, "\u2662", "\\diamondsuit");
defineSymbol(math, main, textord, "\u211c", "\\Re");
defineSymbol(math, main, textord, "\u2661", "\\heartsuit");
defineSymbol(math, main, textord, "\u2111", "\\Im");
defineSymbol(math, main, textord, "\u2660", "\\spadesuit");

// Math and Text
defineSymbol(math, main, textord, "\u2020", "\\dag");
defineSymbol(math, main, textord, "\u2021", "\\ddag");

// Large Delimiters
defineSymbol(math, main, close, "\u23b1", "\\rmoustache");
defineSymbol(math, main, open, "\u23b0", "\\lmoustache");
defineSymbol(math, main, close, "\u27ef", "\\rgroup");
defineSymbol(math, main, open, "\u27ee", "\\lgroup");

// Binary Operators
defineSymbol(math, main, bin, "\u2213", "\\mp");
defineSymbol(math, main, bin, "\u2296", "\\ominus");
defineSymbol(math, main, bin, "\u228e", "\\uplus");
defineSymbol(math, main, bin, "\u2293", "\\sqcap");
defineSymbol(math, main, bin, "\u2217", "\\ast");
defineSymbol(math, main, bin, "\u2294", "\\sqcup");
defineSymbol(math, main, bin, "\u25ef", "\\bigcirc");
defineSymbol(math, main, bin, "\u2219", "\\bullet");
defineSymbol(math, main, bin, "\u2021", "\\ddagger");
defineSymbol(math, main, bin, "\u2240", "\\wr");
defineSymbol(math, main, bin, "\u2a3f", "\\amalg");

// Arrow Symbols
defineSymbol(math, main, rel, "\u27f5", "\\longleftarrow");
defineSymbol(math, main, rel, "\u21d0", "\\Leftarrow");
defineSymbol(math, main, rel, "\u27f8", "\\Longleftarrow");
defineSymbol(math, main, rel, "\u27f6", "\\longrightarrow");
defineSymbol(math, main, rel, "\u21d2", "\\Rightarrow");
defineSymbol(math, main, rel, "\u27f9", "\\Longrightarrow");
defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow");
defineSymbol(math, main, rel, "\u27f7", "\\longleftrightarrow");
defineSymbol(math, main, rel, "\u21d4", "\\Leftrightarrow");
defineSymbol(math, main, rel, "\u27fa", "\\Longleftrightarrow");
defineSymbol(math, main, rel, "\u21a6", "\\mapsto");
defineSymbol(math, main, rel, "\u27fc", "\\longmapsto");
defineSymbol(math, main, rel, "\u2197", "\\nearrow");
defineSymbol(math, main, rel, "\u21a9", "\\hookleftarrow");
defineSymbol(math, main, rel, "\u21aa", "\\hookrightarrow");
defineSymbol(math, main, rel, "\u2198", "\\searrow");
defineSymbol(math, main, rel, "\u21bc", "\\leftharpoonup");
defineSymbol(math, main, rel, "\u21c0", "\\rightharpoonup");
defineSymbol(math, main, rel, "\u2199", "\\swarrow");
defineSymbol(math, main, rel, "\u21bd", "\\leftharpoondown");
defineSymbol(math, main, rel, "\u21c1", "\\rightharpoondown");
defineSymbol(math, main, rel, "\u2196", "\\nwarrow");
defineSymbol(math, main, rel, "\u21cc", "\\rightleftharpoons");

// AMS Negated Binary Relations
defineSymbol(math, ams, rel, "\u226e", "\\nless");
defineSymbol(math, ams, rel, "\ue010", "\\nleqslant");
defineSymbol(math, ams, rel, "\ue011", "\\nleqq");
defineSymbol(math, ams, rel, "\u2a87", "\\lneq");
defineSymbol(math, ams, rel, "\u2268", "\\lneqq");
defineSymbol(math, ams, rel, "\ue00c", "\\lvertneqq");
defineSymbol(math, ams, rel, "\u22e6", "\\lnsim");
defineSymbol(math, ams, rel, "\u2a89", "\\lnapprox");
defineSymbol(math, ams, rel, "\u2280", "\\nprec");
defineSymbol(math, ams, rel, "\u22e0", "\\npreceq");
defineSymbol(math, ams, rel, "\u22e8", "\\precnsim");
defineSymbol(math, ams, rel, "\u2ab9", "\\precnapprox");
defineSymbol(math, ams, rel, "\u2241", "\\nsim");
defineSymbol(math, ams, rel, "\ue006", "\\nshortmid");
defineSymbol(math, ams, rel, "\u2224", "\\nmid");
defineSymbol(math, ams, rel, "\u22ac", "\\nvdash");
defineSymbol(math, ams, rel, "\u22ad", "\\nvDash");
defineSymbol(math, ams, rel, "\u22ea", "\\ntriangleleft");
defineSymbol(math, ams, rel, "\u22ec", "\\ntrianglelefteq");
defineSymbol(math, ams, rel, "\u228a", "\\subsetneq");
defineSymbol(math, ams, rel, "\ue01a", "\\varsubsetneq");
defineSymbol(math, ams, rel, "\u2acb", "\\subsetneqq");
defineSymbol(math, ams, rel, "\ue017", "\\varsubsetneqq");
defineSymbol(math, ams, rel, "\u226f", "\\ngtr");
defineSymbol(math, ams, rel, "\ue00f", "\\ngeqslant");
defineSymbol(math, ams, rel, "\ue00e", "\\ngeqq");
defineSymbol(math, ams, rel, "\u2a88", "\\gneq");
defineSymbol(math, ams, rel, "\u2269", "\\gneqq");
defineSymbol(math, ams, rel, "\ue00d", "\\gvertneqq");
defineSymbol(math, ams, rel, "\u22e7", "\\gnsim");
defineSymbol(math, ams, rel, "\u2a8a", "\\gnapprox");
defineSymbol(math, ams, rel, "\u2281", "\\nsucc");
defineSymbol(math, ams, rel, "\u22e1", "\\nsucceq");
defineSymbol(math, ams, rel, "\u22e9", "\\succnsim");
defineSymbol(math, ams, rel, "\u2aba", "\\succnapprox");
defineSymbol(math, ams, rel, "\u2246", "\\ncong");
defineSymbol(math, ams, rel, "\ue007", "\\nshortparallel");
defineSymbol(math, ams, rel, "\u2226", "\\nparallel");
defineSymbol(math, ams, rel, "\u22af", "\\nVDash");
defineSymbol(math, ams, rel, "\u22eb", "\\ntriangleright");
defineSymbol(math, ams, rel, "\u22ed", "\\ntrianglerighteq");
defineSymbol(math, ams, rel, "\ue018", "\\nsupseteqq");
defineSymbol(math, ams, rel, "\u228b", "\\supsetneq");
defineSymbol(math, ams, rel, "\ue01b", "\\varsupsetneq");
defineSymbol(math, ams, rel, "\u2acc", "\\supsetneqq");
defineSymbol(math, ams, rel, "\ue019", "\\varsupsetneqq");
defineSymbol(math, ams, rel, "\u22ae", "\\nVdash");
defineSymbol(math, ams, rel, "\u2ab5", "\\precneqq");
defineSymbol(math, ams, rel, "\u2ab6", "\\succneqq");
defineSymbol(math, ams, rel, "\ue016", "\\nsubseteqq");
defineSymbol(math, ams, bin, "\u22b4", "\\unlhd");
defineSymbol(math, ams, bin, "\u22b5", "\\unrhd");

// AMS Negated Arrows
defineSymbol(math, ams, rel, "\u219a", "\\nleftarrow");
defineSymbol(math, ams, rel, "\u219b", "\\nrightarrow");
defineSymbol(math, ams, rel, "\u21cd", "\\nLeftarrow");
defineSymbol(math, ams, rel, "\u21cf", "\\nRightarrow");
defineSymbol(math, ams, rel, "\u21ae", "\\nleftrightarrow");
defineSymbol(math, ams, rel, "\u21ce", "\\nLeftrightarrow");

// AMS Misc
defineSymbol(math, ams, rel, "\u25b3", "\\vartriangle");
defineSymbol(math, ams, textord, "\u210f", "\\hslash");
defineSymbol(math, ams, textord, "\u25bd", "\\triangledown");
defineSymbol(math, ams, textord, "\u25ca", "\\lozenge");
defineSymbol(math, ams, textord, "\u24c8", "\\circledS");
defineSymbol(math, ams, textord, "\u00ae", "\\circledR");
defineSymbol(math, ams, textord, "\u2221", "\\measuredangle");
defineSymbol(math, ams, textord, "\u2204", "\\nexists");
defineSymbol(math, ams, textord, "\u2127", "\\mho");
defineSymbol(math, ams, textord, "\u2132", "\\Finv");
defineSymbol(math, ams, textord, "\u2141", "\\Game");
defineSymbol(math, ams, textord, "\u006b", "\\Bbbk");
defineSymbol(math, ams, textord, "\u2035", "\\backprime");
defineSymbol(math, ams, textord, "\u25b2", "\\blacktriangle");
defineSymbol(math, ams, textord, "\u25bc", "\\blacktriangledown");
defineSymbol(math, ams, textord, "\u25a0", "\\blacksquare");
defineSymbol(math, ams, textord, "\u29eb", "\\blacklozenge");
defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle");
defineSymbol(math, ams, textord, "\u2201", "\\complement");
defineSymbol(math, ams, textord, "\u00f0", "\\eth");
defineSymbol(math, ams, textord, "\u2571", "\\diagup");
defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
defineSymbol(math, ams, textord, "\u25a1", "\\square");
defineSymbol(math, ams, textord, "\u25a1", "\\Box");
defineSymbol(math, ams, textord, "\u25ca", "\\Diamond");
defineSymbol(math, ams, textord, "\u00a5", "\\yen");
defineSymbol(math, ams, textord, "\u2713", "\\checkmark");

// AMS Hebrew
defineSymbol(math, ams, textord, "\u2136", "\\beth");
defineSymbol(math, ams, textord, "\u2138", "\\daleth");
defineSymbol(math, ams, textord, "\u2137", "\\gimel");

// AMS Greek
defineSymbol(math, ams, textord, "\u03dd", "\\digamma");
defineSymbol(math, ams, textord, "\u03f0", "\\varkappa");

// AMS Delimiters
defineSymbol(math, ams, open, "\u250c", "\\ulcorner");
defineSymbol(math, ams, close, "\u2510", "\\urcorner");
defineSymbol(math, ams, open, "\u2514", "\\llcorner");
defineSymbol(math, ams, close, "\u2518", "\\lrcorner");

// AMS Binary Relations
defineSymbol(math, ams, rel, "\u2266", "\\leqq");
defineSymbol(math, ams, rel, "\u2a7d", "\\leqslant");
defineSymbol(math, ams, rel, "\u2a95", "\\eqslantless");
defineSymbol(math, ams, rel, "\u2272", "\\lesssim");
defineSymbol(math, ams, rel, "\u2a85", "\\lessapprox");
defineSymbol(math, ams, rel, "\u224a", "\\approxeq");
defineSymbol(math, ams, bin, "\u22d6", "\\lessdot");
defineSymbol(math, ams, rel, "\u22d8", "\\lll");
defineSymbol(math, ams, rel, "\u2276", "\\lessgtr");
defineSymbol(math, ams, rel, "\u22da", "\\lesseqgtr");
defineSymbol(math, ams, rel, "\u2a8b", "\\lesseqqgtr");
defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq");
defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq");
defineSymbol(math, ams, rel, "\u223d", "\\backsim");
defineSymbol(math, ams, rel, "\u22cd", "\\backsimeq");
defineSymbol(math, ams, rel, "\u2ac5", "\\subseteqq");
defineSymbol(math, ams, rel, "\u22d0", "\\Subset");
defineSymbol(math, ams, rel, "\u228f", "\\sqsubset");
defineSymbol(math, ams, rel, "\u227c", "\\preccurlyeq");
defineSymbol(math, ams, rel, "\u22de", "\\curlyeqprec");
defineSymbol(math, ams, rel, "\u227e", "\\precsim");
defineSymbol(math, ams, rel, "\u2ab7", "\\precapprox");
defineSymbol(math, ams, rel, "\u22b2", "\\vartriangleleft");
defineSymbol(math, ams, rel, "\u22b4", "\\trianglelefteq");
defineSymbol(math, ams, rel, "\u22a8", "\\vDash");
defineSymbol(math, ams, rel, "\u22aa", "\\Vvdash");
defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
defineSymbol(math, ams, rel, "\u224f", "\\bumpeq");
defineSymbol(math, ams, rel, "\u224e", "\\Bumpeq");
defineSymbol(math, ams, rel, "\u2267", "\\geqq");
defineSymbol(math, ams, rel, "\u2a7e", "\\geqslant");
defineSymbol(math, ams, rel, "\u2a96", "\\eqslantgtr");
defineSymbol(math, ams, rel, "\u2273", "\\gtrsim");
defineSymbol(math, ams, rel, "\u2a86", "\\gtrapprox");
defineSymbol(math, ams, bin, "\u22d7", "\\gtrdot");
defineSymbol(math, ams, rel, "\u22d9", "\\ggg");
defineSymbol(math, ams, rel, "\u2277", "\\gtrless");
defineSymbol(math, ams, rel, "\u22db", "\\gtreqless");
defineSymbol(math, ams, rel, "\u2a8c", "\\gtreqqless");
defineSymbol(math, ams, rel, "\u2256", "\\eqcirc");
defineSymbol(math, ams, rel, "\u2257", "\\circeq");
defineSymbol(math, ams, rel, "\u225c", "\\triangleq");
defineSymbol(math, ams, rel, "\u223c", "\\thicksim");
defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
defineSymbol(math, ams, rel, "\u2ac6", "\\supseteqq");
defineSymbol(math, ams, rel, "\u22d1", "\\Supset");
defineSymbol(math, ams, rel, "\u2290", "\\sqsupset");
defineSymbol(math, ams, rel, "\u227d", "\\succcurlyeq");
defineSymbol(math, ams, rel, "\u22df", "\\curlyeqsucc");
defineSymbol(math, ams, rel, "\u227f", "\\succsim");
defineSymbol(math, ams, rel, "\u2ab8", "\\succapprox");
defineSymbol(math, ams, rel, "\u22b3", "\\vartriangleright");
defineSymbol(math, ams, rel, "\u22b5", "\\trianglerighteq");
defineSymbol(math, ams, rel, "\u22a9", "\\Vdash");
defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
defineSymbol(math, ams, rel, "\u226c", "\\between");
defineSymbol(math, ams, rel, "\u22d4", "\\pitchfork");
defineSymbol(math, ams, rel, "\u221d", "\\varpropto");
defineSymbol(math, ams, rel, "\u25c0", "\\blacktriangleleft");
defineSymbol(math, ams, rel, "\u2234", "\\therefore");
defineSymbol(math, ams, rel, "\u220d", "\\backepsilon");
defineSymbol(math, ams, rel, "\u25b6", "\\blacktriangleright");
defineSymbol(math, ams, rel, "\u2235", "\\because");
defineSymbol(math, ams, rel, "\u22d8", "\\llless");
defineSymbol(math, ams, rel, "\u22d9", "\\gggtr");
defineSymbol(math, ams, bin, "\u22b2", "\\lhd");
defineSymbol(math, ams, bin, "\u22b3", "\\rhd");
defineSymbol(math, ams, rel, "\u2242", "\\eqsim");
defineSymbol(math, main, rel, "\u22c8", "\\Join");
defineSymbol(math, ams, rel, "\u2251", "\\Doteq");

// AMS Binary Operators
defineSymbol(math, ams, bin, "\u2214", "\\dotplus");
defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
defineSymbol(math, ams, bin, "\u22d2", "\\Cap");
defineSymbol(math, ams, bin, "\u22d3", "\\Cup");
defineSymbol(math, ams, bin, "\u2a5e", "\\doublebarwedge");
defineSymbol(math, ams, bin, "\u229f", "\\boxminus");
defineSymbol(math, ams, bin, "\u229e", "\\boxplus");
defineSymbol(math, ams, bin, "\u22c7", "\\divideontimes");
defineSymbol(math, ams, bin, "\u22c9", "\\ltimes");
defineSymbol(math, ams, bin, "\u22ca", "\\rtimes");
defineSymbol(math, ams, bin, "\u22cb", "\\leftthreetimes");
defineSymbol(math, ams, bin, "\u22cc", "\\rightthreetimes");
defineSymbol(math, ams, bin, "\u22cf", "\\curlywedge");
defineSymbol(math, ams, bin, "\u22ce", "\\curlyvee");
defineSymbol(math, ams, bin, "\u229d", "\\circleddash");
defineSymbol(math, ams, bin, "\u229b", "\\circledast");
defineSymbol(math, ams, bin, "\u22c5", "\\centerdot");
defineSymbol(math, ams, bin, "\u22ba", "\\intercal");
defineSymbol(math, ams, bin, "\u22d2", "\\doublecap");
defineSymbol(math, ams, bin, "\u22d3", "\\doublecup");
defineSymbol(math, ams, bin, "\u22a0", "\\boxtimes");

// AMS Arrows
defineSymbol(math, ams, rel, "\u21e2", "\\dashrightarrow");
defineSymbol(math, ams, rel, "\u21e0", "\\dashleftarrow");
defineSymbol(math, ams, rel, "\u21c7", "\\leftleftarrows");
defineSymbol(math, ams, rel, "\u21c6", "\\leftrightarrows");
defineSymbol(math, ams, rel, "\u21da", "\\Lleftarrow");
defineSymbol(math, ams, rel, "\u219e", "\\twoheadleftarrow");
defineSymbol(math, ams, rel, "\u21a2", "\\leftarrowtail");
defineSymbol(math, ams, rel, "\u21ab", "\\looparrowleft");
defineSymbol(math, ams, rel, "\u21cb", "\\leftrightharpoons");
defineSymbol(math, ams, rel, "\u21b6", "\\curvearrowleft");
defineSymbol(math, ams, rel, "\u21ba", "\\circlearrowleft");
defineSymbol(math, ams, rel, "\u21b0", "\\Lsh");
defineSymbol(math, ams, rel, "\u21c8", "\\upuparrows");
defineSymbol(math, ams, rel, "\u21bf", "\\upharpoonleft");
defineSymbol(math, ams, rel, "\u21c3", "\\downharpoonleft");
defineSymbol(math, ams, rel, "\u22b8", "\\multimap");
defineSymbol(math, ams, rel, "\u21ad", "\\leftrightsquigarrow");
defineSymbol(math, ams, rel, "\u21c9", "\\rightrightarrows");
defineSymbol(math, ams, rel, "\u21c4", "\\rightleftarrows");
defineSymbol(math, ams, rel, "\u21a0", "\\twoheadrightarrow");
defineSymbol(math, ams, rel, "\u21a3", "\\rightarrowtail");
defineSymbol(math, ams, rel, "\u21ac", "\\looparrowright");
defineSymbol(math, ams, rel, "\u21b7", "\\curvearrowright");
defineSymbol(math, ams, rel, "\u21bb", "\\circlearrowright");
defineSymbol(math, ams, rel, "\u21b1", "\\Rsh");
defineSymbol(math, ams, rel, "\u21ca", "\\downdownarrows");
defineSymbol(math, ams, rel, "\u21be", "\\upharpoonright");
defineSymbol(math, ams, rel, "\u21c2", "\\downharpoonright");
defineSymbol(math, ams, rel, "\u21dd", "\\rightsquigarrow");
defineSymbol(math, ams, rel, "\u21dd", "\\leadsto");
defineSymbol(math, ams, rel, "\u21db", "\\Rrightarrow");
defineSymbol(math, ams, rel, "\u21be", "\\restriction");

defineSymbol(math, main, textord, "\u2018", "`");
defineSymbol(math, main, textord, "$", "\\$");
defineSymbol(math, main, textord, "%", "\\%");
defineSymbol(math, main, textord, "_", "\\_");
defineSymbol(math, main, textord, "\u2220", "\\angle");
defineSymbol(math, main, textord, "\u221e", "\\infty");
defineSymbol(math, main, textord, "\u2032", "\\prime");
defineSymbol(math, main, textord, "\u25b3", "\\triangle");
defineSymbol(math, main, textord, "\u0393", "\\Gamma");
defineSymbol(math, main, textord, "\u0394", "\\Delta");
defineSymbol(math, main, textord, "\u0398", "\\Theta");
defineSymbol(math, main, textord, "\u039b", "\\Lambda");
defineSymbol(math, main, textord, "\u039e", "\\Xi");
defineSymbol(math, main, textord, "\u03a0", "\\Pi");
defineSymbol(math, main, textord, "\u03a3", "\\Sigma");
defineSymbol(math, main, textord, "\u03a5", "\\Upsilon");
defineSymbol(math, main, textord, "\u03a6", "\\Phi");
defineSymbol(math, main, textord, "\u03a8", "\\Psi");
defineSymbol(math, main, textord, "\u03a9", "\\Omega");
defineSymbol(math, main, textord, "\u00ac", "\\neg");
defineSymbol(math, main, textord, "\u00ac", "\\lnot");
defineSymbol(math, main, textord, "\u22a4", "\\top");
defineSymbol(math, main, textord, "\u22a5", "\\bot");
defineSymbol(math, main, textord, "\u2205", "\\emptyset");
defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
defineSymbol(math, main, mathord, "\u03b1", "\\alpha");
defineSymbol(math, main, mathord, "\u03b2", "\\beta");
defineSymbol(math, main, mathord, "\u03b3", "\\gamma");
defineSymbol(math, main, mathord, "\u03b4", "\\delta");
defineSymbol(math, main, mathord, "\u03f5", "\\epsilon");
defineSymbol(math, main, mathord, "\u03b6", "\\zeta");
defineSymbol(math, main, mathord, "\u03b7", "\\eta");
defineSymbol(math, main, mathord, "\u03b8", "\\theta");
defineSymbol(math, main, mathord, "\u03b9", "\\iota");
defineSymbol(math, main, mathord, "\u03ba", "\\kappa");
defineSymbol(math, main, mathord, "\u03bb", "\\lambda");
defineSymbol(math, main, mathord, "\u03bc", "\\mu");
defineSymbol(math, main, mathord, "\u03bd", "\\nu");
defineSymbol(math, main, mathord, "\u03be", "\\xi");
defineSymbol(math, main, mathord, "o", "\\omicron");
defineSymbol(math, main, mathord, "\u03c0", "\\pi");
defineSymbol(math, main, mathord, "\u03c1", "\\rho");
defineSymbol(math, main, mathord, "\u03c3", "\\sigma");
defineSymbol(math, main, mathord, "\u03c4", "\\tau");
defineSymbol(math, main, mathord, "\u03c5", "\\upsilon");
defineSymbol(math, main, mathord, "\u03d5", "\\phi");
defineSymbol(math, main, mathord, "\u03c7", "\\chi");
defineSymbol(math, main, mathord, "\u03c8", "\\psi");
defineSymbol(math, main, mathord, "\u03c9", "\\omega");
defineSymbol(math, main, mathord, "\u03b5", "\\varepsilon");
defineSymbol(math, main, mathord, "\u03d1", "\\vartheta");
defineSymbol(math, main, mathord, "\u03d6", "\\varpi");
defineSymbol(math, main, mathord, "\u03f1", "\\varrho");
defineSymbol(math, main, mathord, "\u03c2", "\\varsigma");
defineSymbol(math, main, mathord, "\u03c6", "\\varphi");
defineSymbol(math, main, bin, "\u2217", "*");
defineSymbol(math, main, bin, "+", "+");
defineSymbol(math, main, bin, "\u2212", "-");
defineSymbol(math, main, bin, "\u22c5", "\\cdot");
defineSymbol(math, main, bin, "\u2218", "\\circ");
defineSymbol(math, main, bin, "\u00f7", "\\div");
defineSymbol(math, main, bin, "\u00b1", "\\pm");
defineSymbol(math, main, bin, "\u00d7", "\\times");
defineSymbol(math, main, bin, "\u2229", "\\cap");
defineSymbol(math, main, bin, "\u222a", "\\cup");
defineSymbol(math, main, bin, "\u2216", "\\setminus");
defineSymbol(math, main, bin, "\u2227", "\\land");
defineSymbol(math, main, bin, "\u2228", "\\lor");
defineSymbol(math, main, bin, "\u2227", "\\wedge");
defineSymbol(math, main, bin, "\u2228", "\\vee");
defineSymbol(math, main, textord, "\u221a", "\\surd");
defineSymbol(math, main, open, "(", "(");
defineSymbol(math, main, open, "[", "[");
defineSymbol(math, main, open, "\u27e8", "\\langle");
defineSymbol(math, main, open, "\u2223", "\\lvert");
defineSymbol(math, main, open, "\u2225", "\\lVert");
defineSymbol(math, main, close, ")", ")");
defineSymbol(math, main, close, "]", "]");
defineSymbol(math, main, close, "?", "?");
defineSymbol(math, main, close, "!", "!");
defineSymbol(math, main, close, "\u27e9", "\\rangle");
defineSymbol(math, main, close, "\u2223", "\\rvert");
defineSymbol(math, main, close, "\u2225", "\\rVert");
defineSymbol(math, main, rel, "=", "=");
defineSymbol(math, main, rel, "<", "<");
defineSymbol(math, main, rel, ">", ">");
defineSymbol(math, main, rel, ":", ":");
defineSymbol(math, main, rel, "\u2248", "\\approx");
defineSymbol(math, main, rel, "\u2245", "\\cong");
defineSymbol(math, main, rel, "\u2265", "\\ge");
defineSymbol(math, main, rel, "\u2265", "\\geq");
defineSymbol(math, main, rel, "\u2190", "\\gets");
defineSymbol(math, main, rel, ">", "\\gt");
defineSymbol(math, main, rel, "\u2208", "\\in");
defineSymbol(math, main, rel, "\u2209", "\\notin");
defineSymbol(math, main, rel, "\u2282", "\\subset");
defineSymbol(math, main, rel, "\u2283", "\\supset");
defineSymbol(math, main, rel, "\u2286", "\\subseteq");
defineSymbol(math, main, rel, "\u2287", "\\supseteq");
defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq");
defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq");
defineSymbol(math, main, rel, "\u22a8", "\\models");
defineSymbol(math, main, rel, "\u2190", "\\leftarrow");
defineSymbol(math, main, rel, "\u2264", "\\le");
defineSymbol(math, main, rel, "\u2264", "\\leq");
defineSymbol(math, main, rel, "<", "\\lt");
defineSymbol(math, main, rel, "\u2260", "\\ne");
defineSymbol(math, main, rel, "\u2260", "\\neq");
defineSymbol(math, main, rel, "\u2192", "\\rightarrow");
defineSymbol(math, main, rel, "\u2192", "\\to");
defineSymbol(math, ams, rel, "\u2271", "\\ngeq");
defineSymbol(math, ams, rel, "\u2270", "\\nleq");
defineSymbol(math, main, spacing, null, "\\!");
defineSymbol(math, main, spacing, "\u00a0", "\\ ");
defineSymbol(math, main, spacing, "\u00a0", "~");
defineSymbol(math, main, spacing, null, "\\,");
defineSymbol(math, main, spacing, null, "\\:");
defineSymbol(math, main, spacing, null, "\\;");
defineSymbol(math, main, spacing, null, "\\enspace");
defineSymbol(math, main, spacing, null, "\\qquad");
defineSymbol(math, main, spacing, null, "\\quad");
defineSymbol(math, main, spacing, "\u00a0", "\\space");
defineSymbol(math, main, punct, ",", ",");
defineSymbol(math, main, punct, ";", ";");
defineSymbol(math, main, punct, ":", "\\colon");
defineSymbol(math, ams, bin, "\u22bc", "\\barwedge");
defineSymbol(math, ams, bin, "\u22bb", "\\veebar");
defineSymbol(math, main, bin, "\u2299", "\\odot");
defineSymbol(math, main, bin, "\u2295", "\\oplus");
defineSymbol(math, main, bin, "\u2297", "\\otimes");
defineSymbol(math, main, textord, "\u2202", "\\partial");
defineSymbol(math, main, bin, "\u2298", "\\oslash");
defineSymbol(math, ams, bin, "\u229a", "\\circledcirc");
defineSymbol(math, ams, bin, "\u22a1", "\\boxdot");
defineSymbol(math, main, bin, "\u25b3", "\\bigtriangleup");
defineSymbol(math, main, bin, "\u25bd", "\\bigtriangledown");
defineSymbol(math, main, bin, "\u2020", "\\dagger");
defineSymbol(math, main, bin, "\u22c4", "\\diamond");
defineSymbol(math, main, bin, "\u22c6", "\\star");
defineSymbol(math, main, bin, "\u25c3", "\\triangleleft");
defineSymbol(math, main, bin, "\u25b9", "\\triangleright");
defineSymbol(math, main, open, "{", "\\{");
defineSymbol(math, main, close, "}", "\\}");
defineSymbol(math, main, open, "{", "\\lbrace");
defineSymbol(math, main, close, "}", "\\rbrace");
defineSymbol(math, main, open, "[", "\\lbrack");
defineSymbol(math, main, close, "]", "\\rbrack");
defineSymbol(math, main, open, "\u230a", "\\lfloor");
defineSymbol(math, main, close, "\u230b", "\\rfloor");
defineSymbol(math, main, open, "\u2308", "\\lceil");
defineSymbol(math, main, close, "\u2309", "\\rceil");
defineSymbol(math, main, textord, "\\", "\\backslash");
defineSymbol(math, main, textord, "\u2223", "|");
defineSymbol(math, main, textord, "\u2223", "\\vert");
defineSymbol(math, main, textord, "\u2225", "\\|");
defineSymbol(math, main, textord, "\u2225", "\\Vert");
defineSymbol(math, main, rel, "\u2191", "\\uparrow");
defineSymbol(math, main, rel, "\u21d1", "\\Uparrow");
defineSymbol(math, main, rel, "\u2193", "\\downarrow");
defineSymbol(math, main, rel, "\u21d3", "\\Downarrow");
defineSymbol(math, main, rel, "\u2195", "\\updownarrow");
defineSymbol(math, main, rel, "\u21d5", "\\Updownarrow");
defineSymbol(math, math, op, "\u2210", "\\coprod");
defineSymbol(math, math, op, "\u22c1", "\\bigvee");
defineSymbol(math, math, op, "\u22c0", "\\bigwedge");
defineSymbol(math, math, op, "\u2a04", "\\biguplus");
defineSymbol(math, math, op, "\u22c2", "\\bigcap");
defineSymbol(math, math, op, "\u22c3", "\\bigcup");
defineSymbol(math, math, op, "\u222b", "\\int");
defineSymbol(math, math, op, "\u222b", "\\intop");
defineSymbol(math, math, op, "\u222c", "\\iint");
defineSymbol(math, math, op, "\u222d", "\\iiint");
defineSymbol(math, math, op, "\u220f", "\\prod");
defineSymbol(math, math, op, "\u2211", "\\sum");
defineSymbol(math, math, op, "\u2a02", "\\bigotimes");
defineSymbol(math, math, op, "\u2a01", "\\bigoplus");
defineSymbol(math, math, op, "\u2a00", "\\bigodot");
defineSymbol(math, math, op, "\u222e", "\\oint");
defineSymbol(math, math, op, "\u2a06", "\\bigsqcup");
defineSymbol(math, math, op, "\u222b", "\\smallint");
defineSymbol(math, main, inner, "\u2026", "\\ldots");
defineSymbol(math, main, inner, "\u22ef", "\\cdots");
defineSymbol(math, main, inner, "\u22f1", "\\ddots");
defineSymbol(math, main, textord, "\u22ee", "\\vdots");
defineSymbol(math, main, accent, "\u00b4", "\\acute");
defineSymbol(math, main, accent, "\u0060", "\\grave");
defineSymbol(math, main, accent, "\u00a8", "\\ddot");
defineSymbol(math, main, accent, "\u007e", "\\tilde");
defineSymbol(math, main, accent, "\u00af", "\\bar");
defineSymbol(math, main, accent, "\u02d8", "\\breve");
defineSymbol(math, main, accent, "\u02c7", "\\check");
defineSymbol(math, main, accent, "\u005e", "\\hat");
defineSymbol(math, main, accent, "\u20d7", "\\vec");
defineSymbol(math, main, accent, "\u02d9", "\\dot");
defineSymbol(math, main, mathord, "\u0131", "\\imath");
defineSymbol(math, main, mathord, "\u0237", "\\jmath");

defineSymbol(text, main, spacing, "\u00a0", "\\ ");
defineSymbol(text, main, spacing, "\u00a0", " ");
defineSymbol(text, main, spacing, "\u00a0", "~");

// There are lots of symbols which are the same, so we add them in afterwards.
var i;
var ch;

// All of these are textords in math mode
var mathTextSymbols = "0123456789/@.\"";
for (i = 0; i < mathTextSymbols.length; i++) {
    ch = mathTextSymbols.charAt(i);
    defineSymbol(math, main, textord, ch, ch);
}

// All of these are textords in text mode
var textSymbols = "0123456789`!@*()-=+[]'\";:?/.,";
for (i = 0; i < textSymbols.length; i++) {
    ch = textSymbols.charAt(i);
    defineSymbol(text, main, textord, ch, ch);
}

// All of these are textords in text mode, and mathords in math mode
var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (i = 0; i < letters.length; i++) {
    ch = letters.charAt(i);
    defineSymbol(math, main, mathord, ch, ch);
    defineSymbol(text, main, textord, ch, ch);
}


/***/ }),

/***/ "5061":
/***/ (function(module, exports, __webpack_require__) {

/**
 * These objects store data about MathML nodes. This is the MathML equivalent
 * of the types in domTree.js. Since MathML handles its own rendering, and
 * since we're mainly using MathML to improve accessibility, we don't manage
 * any of the styling state that the plain DOM nodes do.
 *
 * The `toNode` and `toMarkup` functions work simlarly to how they do in
 * domTree.js, creating namespaced DOM nodes and HTML text markup respectively.
 */

var utils = __webpack_require__("b3ce");

/**
 * This node represents a general purpose MathML node of any type. The
 * constructor requires the type of node to create (for example, `"mo"` or
 * `"mspace"`, corresponding to `<mo>` and `<mspace>` tags).
 */
function MathNode(type, children) {
    this.type = type;
    this.attributes = {};
    this.children = children || [];
}

/**
 * Sets an attribute on a MathML node. MathML depends on attributes to convey a
 * semantic content, so this is used heavily.
 */
MathNode.prototype.setAttribute = function(name, value) {
    this.attributes[name] = value;
};

/**
 * Converts the math node into a MathML-namespaced DOM element.
 */
MathNode.prototype.toNode = function() {
    var node = document.createElementNS(
        "http://www.w3.org/1998/Math/MathML", this.type);

    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            node.setAttribute(attr, this.attributes[attr]);
        }
    }

    for (var i = 0; i < this.children.length; i++) {
        node.appendChild(this.children[i].toNode());
    }

    return node;
};

/**
 * Converts the math node into an HTML markup string.
 */
MathNode.prototype.toMarkup = function() {
    var markup = "<" + this.type;

    // Add the attributes
    for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
            markup += " " + attr + "=\"";
            markup += utils.escape(this.attributes[attr]);
            markup += "\"";
        }
    }

    markup += ">";

    for (var i = 0; i < this.children.length; i++) {
        markup += this.children[i].toMarkup();
    }

    markup += "</" + this.type + ">";

    return markup;
};

/**
 * This node represents a piece of text.
 */
function TextNode(text) {
    this.text = text;
}

/**
 * Converts the text node into a DOM text node.
 */
TextNode.prototype.toNode = function() {
    return document.createTextNode(this.text);
};

/**
 * Converts the text node into HTML markup (which is just the text itself).
 */
TextNode.prototype.toMarkup = function() {
    return utils.escape(this.text);
};

module.exports = {
    MathNode: MathNode,
    TextNode: TextNode,
};


/***/ }),

/***/ "7888":
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__("b3ce");
var ParseError = __webpack_require__("1349");

/* This file contains a list of functions that we parse, identified by
 * the calls to defineFunction.
 *
 * The first argument to defineFunction is a single name or a list of names.
 * All functions named in such a list will share a single implementation.
 *
 * Each declared function can have associated properties, which
 * include the following:
 *
 *  - numArgs: The number of arguments the function takes.
 *             If this is the only property, it can be passed as a number
 *             instead of an element of a properties object.
 *  - argTypes: (optional) An array corresponding to each argument of the
 *              function, giving the type of argument that should be parsed. Its
 *              length should be equal to `numArgs + numOptionalArgs`. Valid
 *              types:
 *               - "size": A size-like thing, such as "1em" or "5ex"
 *               - "color": An html color, like "#abc" or "blue"
 *               - "original": The same type as the environment that the
 *                             function being parsed is in (e.g. used for the
 *                             bodies of functions like \color where the first
 *                             argument is special and the second argument is
 *                             parsed normally)
 *              Other possible types (probably shouldn't be used)
 *               - "text": Text-like (e.g. \text)
 *               - "math": Normal math
 *              If undefined, this will be treated as an appropriate length
 *              array of "original" strings
 *  - greediness: (optional) The greediness of the function to use ungrouped
 *                arguments.
 *
 *                E.g. if you have an expression
 *                  \sqrt \frac 1 2
 *                since \frac has greediness=2 vs \sqrt's greediness=1, \frac
 *                will use the two arguments '1' and '2' as its two arguments,
 *                then that whole function will be used as the argument to
 *                \sqrt. On the other hand, the expressions
 *                  \frac \frac 1 2 3
 *                and
 *                  \frac \sqrt 1 2
 *                will fail because \frac and \frac have equal greediness
 *                and \sqrt has a lower greediness than \frac respectively. To
 *                make these parse, we would have to change them to:
 *                  \frac {\frac 1 2} 3
 *                and
 *                  \frac {\sqrt 1} 2
 *
 *                The default value is `1`
 *  - allowedInText: (optional) Whether or not the function is allowed inside
 *                   text mode (default false)
 *  - numOptionalArgs: (optional) The number of optional arguments the function
 *                     should parse. If the optional arguments aren't found,
 *                     `null` will be passed to the handler in their place.
 *                     (default 0)
 *
 * The last argument is that implementation, the handler for the function(s).
 * It is called to handle these functions and their arguments.
 * It receives two arguments:
 *  - context contains information and references provided by the parser
 *  - args is an array of arguments obtained from TeX input
 * The context contains the following properties:
 *  - funcName: the text (i.e. name) of the function, including \
 *  - parser: the parser object
 *  - lexer: the lexer object
 *  - positions: the positions in the overall string of the function
 *               and the arguments.
 * The latter three should only be used to produce error messages.
 *
 * The function should return an object with the following keys:
 *  - type: The type of element that this is. This is then used in
 *          buildHTML/buildMathML to determine which function
 *          should be called to build this node into a DOM node
 * Any other data can be added to the object, which will be passed
 * in to the function in buildHTML/buildMathML as `group.value`.
 */

function defineFunction(names, props, handler) {
    if (typeof names === "string") {
        names = [names];
    }
    if (typeof props === "number") {
        props = { numArgs: props };
    }
    // Set default values of functions
    var data = {
        numArgs: props.numArgs,
        argTypes: props.argTypes,
        greediness: (props.greediness === undefined) ? 1 : props.greediness,
        allowedInText: !!props.allowedInText,
        numOptionalArgs: props.numOptionalArgs || 0,
        handler: handler,
    };
    for (var i = 0; i < names.length; ++i) {
        module.exports[names[i]] = data;
    }
}

// A normal square root
defineFunction("\\sqrt", {
    numArgs: 1,
    numOptionalArgs: 1,
}, function(context, args) {
    var index = args[0];
    var body = args[1];
    return {
        type: "sqrt",
        body: body,
        index: index,
    };
});

// Some non-mathy text
defineFunction("\\text", {
    numArgs: 1,
    argTypes: ["text"],
    greediness: 2,
}, function(context, args) {
    var body = args[0];
    // Since the corresponding buildHTML/buildMathML function expects a
    // list of elements, we normalize for different kinds of arguments
    // TODO(emily): maybe this should be done somewhere else
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "text",
        body: inner,
    };
});

// A two-argument custom color
defineFunction("\\color", {
    numArgs: 2,
    allowedInText: true,
    greediness: 3,
    argTypes: ["color", "original"],
}, function(context, args) {
    var color = args[0];
    var body = args[1];
    // Normalize the different kinds of bodies (see \text above)
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "color",
        color: color.value,
        value: inner,
    };
});

// An overline
defineFunction("\\overline", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    return {
        type: "overline",
        body: body,
    };
});

// An underline
defineFunction("\\underline", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    return {
        type: "underline",
        body: body,
    };
});

// A box of the width and height
defineFunction("\\rule", {
    numArgs: 2,
    numOptionalArgs: 1,
    argTypes: ["size", "size", "size"],
}, function(context, args) {
    var shift = args[0];
    var width = args[1];
    var height = args[2];
    return {
        type: "rule",
        shift: shift && shift.value,
        width: width.value,
        height: height.value,
    };
});

// A KaTeX logo
defineFunction("\\KaTeX", {
    numArgs: 0,
}, function(context) {
    return {
        type: "katex",
    };
});

defineFunction("\\phantom", {
    numArgs: 1,
}, function(context, args) {
    var body = args[0];
    var inner;
    if (body.type === "ordgroup") {
        inner = body.value;
    } else {
        inner = [body];
    }

    return {
        type: "phantom",
        value: inner,
    };
});

// Extra data needed for the delimiter handler down below
var delimiterSizes = {
    "\\bigl" : {type: "open",    size: 1},
    "\\Bigl" : {type: "open",    size: 2},
    "\\biggl": {type: "open",    size: 3},
    "\\Biggl": {type: "open",    size: 4},
    "\\bigr" : {type: "close",   size: 1},
    "\\Bigr" : {type: "close",   size: 2},
    "\\biggr": {type: "close",   size: 3},
    "\\Biggr": {type: "close",   size: 4},
    "\\bigm" : {type: "rel",     size: 1},
    "\\Bigm" : {type: "rel",     size: 2},
    "\\biggm": {type: "rel",     size: 3},
    "\\Biggm": {type: "rel",     size: 4},
    "\\big"  : {type: "textord", size: 1},
    "\\Big"  : {type: "textord", size: 2},
    "\\bigg" : {type: "textord", size: 3},
    "\\Bigg" : {type: "textord", size: 4},
};

var delimiters = [
    "(", ")", "[", "\\lbrack", "]", "\\rbrack",
    "\\{", "\\lbrace", "\\}", "\\rbrace",
    "\\lfloor", "\\rfloor", "\\lceil", "\\rceil",
    "<", ">", "\\langle", "\\rangle", "\\lt", "\\gt",
    "\\lvert", "\\rvert", "\\lVert", "\\rVert",
    "\\lgroup", "\\rgroup", "\\lmoustache", "\\rmoustache",
    "/", "\\backslash",
    "|", "\\vert", "\\|", "\\Vert",
    "\\uparrow", "\\Uparrow",
    "\\downarrow", "\\Downarrow",
    "\\updownarrow", "\\Updownarrow",
    ".",
];

var fontAliases = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak",
};

// Single-argument color functions
defineFunction([
    "\\blue", "\\orange", "\\pink", "\\red",
    "\\green", "\\gray", "\\purple",
    "\\blueA", "\\blueB", "\\blueC", "\\blueD", "\\blueE",
    "\\tealA", "\\tealB", "\\tealC", "\\tealD", "\\tealE",
    "\\greenA", "\\greenB", "\\greenC", "\\greenD", "\\greenE",
    "\\goldA", "\\goldB", "\\goldC", "\\goldD", "\\goldE",
    "\\redA", "\\redB", "\\redC", "\\redD", "\\redE",
    "\\maroonA", "\\maroonB", "\\maroonC", "\\maroonD", "\\maroonE",
    "\\purpleA", "\\purpleB", "\\purpleC", "\\purpleD", "\\purpleE",
    "\\mintA", "\\mintB", "\\mintC",
    "\\grayA", "\\grayB", "\\grayC", "\\grayD", "\\grayE",
    "\\grayF", "\\grayG", "\\grayH", "\\grayI",
    "\\kaBlue", "\\kaGreen",
], {
    numArgs: 1,
    allowedInText: true,
    greediness: 3,
}, function(context, args) {
    var body = args[0];
    var atoms;
    if (body.type === "ordgroup") {
        atoms = body.value;
    } else {
        atoms = [body];
    }

    return {
        type: "color",
        color: "katex-" + context.funcName.slice(1),
        value: atoms,
    };
});

// There are 2 flags for operators; whether they produce limits in
// displaystyle, and whether they are symbols and should grow in
// displaystyle. These four groups cover the four possible choices.

// No limits, not symbols
defineFunction([
    "\\arcsin", "\\arccos", "\\arctan", "\\arg", "\\cos", "\\cosh",
    "\\cot", "\\coth", "\\csc", "\\deg", "\\dim", "\\exp", "\\hom",
    "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh",
    "\\tan", "\\tanh",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: false,
        body: context.funcName,
    };
});

// Limits, not symbols
defineFunction([
    "\\det", "\\gcd", "\\inf", "\\lim", "\\liminf", "\\limsup", "\\max",
    "\\min", "\\Pr", "\\sup",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: false,
        body: context.funcName,
    };
});

// No limits, symbols
defineFunction([
    "\\int", "\\iint", "\\iiint", "\\oint",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: false,
        symbol: true,
        body: context.funcName,
    };
});

// Limits, symbols
defineFunction([
    "\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap",
    "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes",
    "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint",
], {
    numArgs: 0,
}, function(context) {
    return {
        type: "op",
        limits: true,
        symbol: true,
        body: context.funcName,
    };
});

// Fractions
defineFunction([
    "\\dfrac", "\\frac", "\\tfrac",
    "\\dbinom", "\\binom", "\\tbinom",
], {
    numArgs: 2,
    greediness: 2,
}, function(context, args) {
    var numer = args[0];
    var denom = args[1];
    var hasBarLine;
    var leftDelim = null;
    var rightDelim = null;
    var size = "auto";

    switch (context.funcName) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
            hasBarLine = true;
            break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
            hasBarLine = false;
            leftDelim = "(";
            rightDelim = ")";
            break;
        default:
            throw new Error("Unrecognized genfrac command");
    }

    switch (context.funcName) {
        case "\\dfrac":
        case "\\dbinom":
            size = "display";
            break;
        case "\\tfrac":
        case "\\tbinom":
            size = "text";
            break;
    }

    return {
        type: "genfrac",
        numer: numer,
        denom: denom,
        hasBarLine: hasBarLine,
        leftDelim: leftDelim,
        rightDelim: rightDelim,
        size: size,
    };
});

// Left and right overlap functions
defineFunction(["\\llap", "\\rlap"], {
    numArgs: 1,
    allowedInText: true,
}, function(context, args) {
    var body = args[0];
    return {
        type: context.funcName.slice(1),
        body: body,
    };
});

// Delimiter functions
defineFunction([
    "\\bigl", "\\Bigl", "\\biggl", "\\Biggl",
    "\\bigr", "\\Bigr", "\\biggr", "\\Biggr",
    "\\bigm", "\\Bigm", "\\biggm", "\\Biggm",
    "\\big",  "\\Big",  "\\bigg",  "\\Bigg",
    "\\left", "\\right",
], {
    numArgs: 1,
}, function(context, args) {
    var delim = args[0];
    if (!utils.contains(delimiters, delim.value)) {
        throw new ParseError(
            "Invalid delimiter: '" + delim.value + "' after '" +
                context.funcName + "'",
            context.lexer, context.positions[1]);
    }

    // \left and \right are caught somewhere in Parser.js, which is
    // why this data doesn't match what is in buildHTML.
    if (context.funcName === "\\left" || context.funcName === "\\right") {
        return {
            type: "leftright",
            value: delim.value,
        };
    } else {
        return {
            type: "delimsizing",
            size: delimiterSizes[context.funcName].size,
            delimType: delimiterSizes[context.funcName].type,
            value: delim.value,
        };
    }
});

// Sizing functions (handled in Parser.js explicitly, hence no handler)
defineFunction([
    "\\tiny", "\\scriptsize", "\\footnotesize", "\\small",
    "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge",
], 0, null);

// Style changing functions (handled in Parser.js explicitly, hence no
// handler)
defineFunction([
    "\\displaystyle", "\\textstyle", "\\scriptstyle",
    "\\scriptscriptstyle",
], 0, null);

defineFunction([
    // styles
    "\\mathrm", "\\mathit", "\\mathbf",

    // families
    "\\mathbb", "\\mathcal", "\\mathfrak", "\\mathscr", "\\mathsf",
    "\\mathtt",

    // aliases
    "\\Bbb", "\\bold", "\\frak",
], {
    numArgs: 1,
    greediness: 2,
}, function(context, args) {
    var body = args[0];
    var func = context.funcName;
    if (func in fontAliases) {
        func = fontAliases[func];
    }
    return {
        type: "font",
        font: func.slice(1),
        body: body,
    };
});

// Accents
defineFunction([
    "\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve",
    "\\check", "\\hat", "\\vec", "\\dot",
    // We don't support expanding accents yet
    // "\\widetilde", "\\widehat"
], {
    numArgs: 1,
}, function(context, args) {
    var base = args[0];
    return {
        type: "accent",
        accent: context.funcName,
        base: base,
    };
});

// Infix generalized fractions
defineFunction(["\\over", "\\choose"], {
    numArgs: 0,
}, function(context) {
    var replaceWith;
    switch (context.funcName) {
        case "\\over":
            replaceWith = "\\frac";
            break;
        case "\\choose":
            replaceWith = "\\binom";
            break;
        default:
            throw new Error("Unrecognized infix genfrac command");
    }
    return {
        type: "infix",
        replaceWith: replaceWith,
    };
});

// Row breaks for aligned data
defineFunction(["\\\\", "\\cr"], {
    numArgs: 0,
    numOptionalArgs: 1,
    argTypes: ["size"],
}, function(context, args) {
    var size = args[0];
    return {
        type: "cr",
        size: size,
    };
});

// Environment delimiters
defineFunction(["\\begin", "\\end"], {
    numArgs: 1,
    argTypes: ["text"],
}, function(context, args) {
    var nameGroup = args[0];
    if (nameGroup.type !== "ordgroup") {
        throw new ParseError(
            "Invalid environment name",
            context.lexer, context.positions[1]);
    }
    var name = "";
    for (var i = 0; i < nameGroup.value.length; ++i) {
        name += nameGroup.value[i].value;
    }
    return {
        type: "environment",
        name: name,
        namepos: context.positions[1],
    };
});


/***/ }),

/***/ "b3ce":
/***/ (function(module, exports) {

/**
 * This file contains a list of utility functions which are useful in other
 * files.
 */

/**
 * Provide an `indexOf` function which works in IE8, but defers to native if
 * possible.
 */
var nativeIndexOf = Array.prototype.indexOf;
var indexOf = function(list, elem) {
    if (list == null) {
        return -1;
    }
    if (nativeIndexOf && list.indexOf === nativeIndexOf) {
        return list.indexOf(elem);
    }
    var i = 0;
    var l = list.length;
    for (; i < l; i++) {
        if (list[i] === elem) {
            return i;
        }
    }
    return -1;
};

/**
 * Return whether an element is contained in a list
 */
var contains = function(list, elem) {
    return indexOf(list, elem) !== -1;
};

/**
 * Provide a default value if a setting is undefined
 */
var deflt = function(setting, defaultIfUndefined) {
    return setting === undefined ? defaultIfUndefined : setting;
};

// hyphenate and escape adapted from Facebook's React under Apache 2 license

var uppercase = /([A-Z])/g;
var hyphenate = function(str) {
    return str.replace(uppercase, "-$1").toLowerCase();
};

var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;",
};

var ESCAPE_REGEX = /[&><"']/g;

function escaper(match) {
    return ESCAPE_LOOKUP[match];
}

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escape(text) {
    return ("" + text).replace(ESCAPE_REGEX, escaper);
}

/**
 * A function to set the text content of a DOM element in all supported
 * browsers. Note that we don't define this if there is no document.
 */
var setTextContent;
if (typeof document !== "undefined") {
    var testNode = document.createElement("span");
    if ("textContent" in testNode) {
        setTextContent = function(node, text) {
            node.textContent = text;
        };
    } else {
        setTextContent = function(node, text) {
            node.innerText = text;
        };
    }
}

/**
 * A function to clear a node.
 */
function clearNode(node) {
    setTextContent(node, "");
}

module.exports = {
    contains: contains,
    deflt: deflt,
    escape: escape,
    hyphenate: hyphenate,
    indexOf: indexOf,
    setTextContent: setTextContent,
    clearNode: clearNode,
};


/***/ }),

/***/ "caac":
/***/ (function(module, exports) {

/**
 * The resulting parse tree nodes of the parse tree.
 */
function ParseNode(type, value, mode) {
    this.type = type;
    this.value = value;
    this.mode = mode;
}

module.exports = {
    ParseNode: ParseNode,
};



/***/ }),

/***/ "eac52":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Provides a single function for parsing an expression using a Parser
 * TODO(emily): Remove this
 */

var Parser = __webpack_require__("6f36");

/**
 * Parses an expression using a Parser, then returns the parsed result.
 */
var parseTree = function(toParse, settings) {
    var parser = new Parser(toParse, settings);

    return parser.parse();
};

module.exports = parseTree;


/***/ })

}]);
//# sourceMappingURL=chunk-vendors~a8c84656.ca0c1750.js.map