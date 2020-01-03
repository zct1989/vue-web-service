(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~61bc7846"],{

/***/ "0264":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/lodash/partition.js
var partition = __webpack_require__("327d");
var partition_default = /*#__PURE__*/__webpack_require__.n(partition);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/request.js
function getError(option, xhr) {
  var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
function upload(option) {
  var xhr = new window.XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  var formData = new window.FormData();

  if (option.data) {
    Object.keys(option.data).map(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };

  xhr.open('post', option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (var h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort: function abort() {
      xhr.abort();
    }
  };
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/uid.js
var now = +new Date();
var index = 0;

function uid_uid() {
  return "vc-upload-" + now + "-" + ++index;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/attr-accept.js
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/* harmony default export */ var attr_accept = (function (file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = file.type || '';
    var baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some(function (type) {
      var validType = type.trim();
      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/traverseFileTree.js
function loopFiles(item, callback) {
  var dirReader = item.createReader();
  var fileList = [];

  function sequence() {
    dirReader.readEntries(function (entries) {
      var entryList = Array.prototype.slice.apply(entries);
      fileList = fileList.concat(entryList);

      // Check if all the file has been viewed
      var isFinished = !entryList.length;

      if (isFinished) {
        callback(fileList);
      } else {
        sequence();
      }
    });
  }

  sequence();
}

var traverseFileTree = function traverseFileTree(files, callback, isAccepted) {
  var _traverseFileTree = function _traverseFileTree(item, path) {
    path = path || '';
    if (item.isFile) {
      item.file(function (file) {
        if (isAccepted(file)) {
          callback([file]);
        }
      });
    } else if (item.isDirectory) {
      loopFiles(item, function (entries) {
        entries.forEach(function (entryItem) {
          _traverseFileTree(entryItem, '' + path + item.name + '/');
        });
      });
    }
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      _traverseFileTree(file.webkitGetAsEntry());
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/* harmony default export */ var src_traverseFileTree = (traverseFileTree);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/AjaxUploader.js











var upLoadPropTypes = {
  componentTag: vue_types["a" /* default */].string,
  // style: PropTypes.object,
  prefixCls: vue_types["a" /* default */].string,
  name: vue_types["a" /* default */].string,
  // className: PropTypes.string,
  multiple: vue_types["a" /* default */].bool,
  directory: vue_types["a" /* default */].bool,
  disabled: vue_types["a" /* default */].bool,
  accept: vue_types["a" /* default */].string,
  // children: PropTypes.any,
  // onStart: PropTypes.func,
  data: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].func]),
  action: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].func]),
  headers: vue_types["a" /* default */].object,
  beforeUpload: vue_types["a" /* default */].func,
  customRequest: vue_types["a" /* default */].func,
  // onProgress: PropTypes.func,
  withCredentials: vue_types["a" /* default */].bool,
  openFileDialogOnClick: vue_types["a" /* default */].bool
};

var AjaxUploader = {
  inheritAttrs: false,
  name: 'ajaxUploader',
  mixins: [BaseMixin["a" /* default */]],
  props: upLoadPropTypes,
  data: function data() {
    this.reqs = {};
    return {
      uid: uid_uid()
    };
  },
  mounted: function mounted() {
    this._isMounted = true;
  },
  beforeDestroy: function beforeDestroy() {
    this._isMounted = false;
    this.abort();
  },

  methods: {
    onChange: function onChange(e) {
      var files = e.target.files;
      this.uploadFiles(files);
      this.reset();
    },
    onClick: function onClick() {
      var el = this.$refs.fileInputRef;
      if (!el) {
        return;
      }
      el.click();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        this.onClick();
      }
    },
    onFileDrop: function onFileDrop(e) {
      var _this = this;

      e.preventDefault();
      if (e.type === 'dragover') {
        return;
      }
      if (this.directory) {
        src_traverseFileTree(e.dataTransfer.items, this.uploadFiles, function (_file) {
          return attr_accept(_file, _this.accept);
        });
      } else {
        var files = partition_default()(Array.prototype.slice.call(e.dataTransfer.files), function (file) {
          return attr_accept(file, _this.accept);
        });
        this.uploadFiles(files[0]);
        if (files[1].length) {
          this.$emit('reject', files[1]);
        }
      }
    },
    uploadFiles: function uploadFiles(files) {
      var _this2 = this;

      var postFiles = Array.prototype.slice.call(files);
      postFiles.forEach(function (file) {
        file.uid = uid_uid();
        _this2.upload(file, postFiles);
      });
    },
    upload: function upload(file, fileList) {
      var _this3 = this;

      if (!this.beforeUpload) {
        // always async in case use react state to keep fileList
        return setTimeout(function () {
          return _this3.post(file);
        }, 0);
      }

      var before = this.beforeUpload(file, fileList);
      if (before && before.then) {
        before.then(function (processedFile) {
          var processedFileType = Object.prototype.toString.call(processedFile);
          if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
            return _this3.post(processedFile);
          }
          return _this3.post(file);
        })['catch'](function (e) {
          console && console.log(e); // eslint-disable-line
        });
      } else if (before !== false) {
        setTimeout(function () {
          return _this3.post(file);
        }, 0);
      }
    },
    post: function post(file) {
      var _this4 = this;

      if (!this._isMounted) {
        return;
      }
      var data = this.$props.data;

      if (typeof data === 'function') {
        data = data(file);
      }
      new Promise(function (resolve) {
        var action = _this4.action;

        if (typeof action === 'function') {
          return resolve(action(file));
        }
        resolve(action);
      }).then(function (action) {
        var uid = file.uid;

        var request = _this4.customRequest || upload;
        _this4.reqs[uid] = request({
          action: action,
          filename: _this4.name,
          file: file,
          data: data,
          headers: _this4.headers,
          withCredentials: _this4.withCredentials,
          onProgress: function onProgress(e) {
            _this4.$emit('progress', e, file);
          },
          onSuccess: function onSuccess(ret, xhr) {
            delete _this4.reqs[uid];
            _this4.$emit('success', ret, file, xhr);
          },
          onError: function onError(err, ret) {
            delete _this4.reqs[uid];
            _this4.$emit('error', err, ret, file);
          }
        });
        _this4.$emit('start', file);
      });
    },
    reset: function reset() {
      this.setState({
        uid: uid_uid()
      });
    },
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file && file.uid) {
          uid = file.uid;
        }
        if (reqs[uid]) {
          reqs[uid].abort();
          delete reqs[uid];
        }
      } else {
        Object.keys(reqs).forEach(function (uid) {
          if (reqs[uid]) {
            reqs[uid].abort();
          }

          delete reqs[uid];
        });
      }
    }
  },

  render: function render() {
    var _classNames;

    var h = arguments[0];
    var $props = this.$props,
        $attrs = this.$attrs;
    var Tag = $props.componentTag,
        prefixCls = $props.prefixCls,
        disabled = $props.disabled,
        multiple = $props.multiple,
        accept = $props.accept,
        directory = $props.directory,
        openFileDialogOnClick = $props.openFileDialogOnClick;

    var cls = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls, true), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), _classNames));
    var events = disabled ? {} : {
      click: openFileDialogOnClick ? this.onClick : function () {},
      keydown: this.onKeyDown,
      drop: this.onFileDrop,
      dragover: this.onFileDrop
    };
    var tagProps = {
      on: extends_default()({}, this.$listeners, events),
      attrs: {
        role: 'button',
        tabIndex: disabled ? null : '0'
      },
      'class': cls
    };
    return h(
      Tag,
      tagProps,
      [h('input', {
        attrs: {
          id: $attrs.id,
          type: 'file',

          accept: accept,
          directory: directory ? 'directory' : null,
          webkitdirectory: directory ? 'webkitdirectory' : null,
          multiple: multiple
        },
        ref: 'fileInputRef',
        key: this.uid,
        style: { display: 'none' }, on: {
          'change': this.onChange
        }
      }), this.$slots['default']]
    );
  }
};

/* harmony default export */ var src_AjaxUploader = (AjaxUploader);
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/warning.js
var warning = __webpack_require__("6a21");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/IframeUploader.js








var IFRAME_STYLE = {
  position: 'absolute',
  top: 0,
  opacity: 0,
  filter: 'alpha(opacity=0)',
  left: 0,
  zIndex: 9999
};

// diferent from AjaxUpload, can only upload on at one time, serial seriously
var IframeUploader = {
  mixins: [BaseMixin["a" /* default */]],
  props: {
    componentTag: vue_types["a" /* default */].string,
    // style: PropTypes.object,
    disabled: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string,
    // className: PropTypes.string,
    accept: vue_types["a" /* default */].string,
    // onStart: PropTypes.func,
    multiple: vue_types["a" /* default */].bool,
    // children: PropTypes.any,
    data: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].func]),
    action: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].func]),
    name: vue_types["a" /* default */].string
  },
  data: function data() {
    this.file = {};
    return {
      uploading: false
    };
  },

  methods: {
    onLoad: function onLoad() {
      if (!this.uploading) {
        return;
      }
      var file = this.file;

      var response = void 0;
      try {
        var doc = this.getIframeDocument();
        var script = doc.getElementsByTagName('script')[0];
        if (script && script.parentNode === doc.body) {
          doc.body.removeChild(script);
        }
        response = doc.body.innerHTML;
        this.$emit('success', response, file);
      } catch (err) {
        Object(warning["a" /* default */])(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
        response = 'cross-domain';
        this.$emit('error', err, null, file);
      }
      this.endUpload();
    },
    onChange: function onChange() {
      var _this = this;

      var target = this.getFormInputNode();
      // ie8/9 don't support FileList Object
      // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
      var file = this.file = {
        uid: uid_uid(),
        name: target.value && target.value.substring(target.value.lastIndexOf('\\') + 1, target.value.length)
      };
      this.startUpload();
      var props = this.$props;

      if (!props.beforeUpload) {
        return this.post(file);
      }
      var before = props.beforeUpload(file);
      if (before && before.then) {
        before.then(function () {
          _this.post(file);
        }, function () {
          _this.endUpload();
        });
      } else if (before !== false) {
        this.post(file);
      } else {
        this.endUpload();
      }
    },
    getIframeNode: function getIframeNode() {
      return this.$refs.iframeRef;
    },
    getIframeDocument: function getIframeDocument() {
      return this.getIframeNode().contentDocument;
    },
    getFormNode: function getFormNode() {
      return this.getIframeDocument().getElementById('form');
    },
    getFormInputNode: function getFormInputNode() {
      return this.getIframeDocument().getElementById('input');
    },
    getFormDataNode: function getFormDataNode() {
      return this.getIframeDocument().getElementById('data');
    },
    getFileForMultiple: function getFileForMultiple(file) {
      return this.multiple ? [file] : file;
    },
    getIframeHTML: function getIframeHTML(domain) {
      var domainScript = '';
      var domainInput = '';
      if (domain) {
        var script = 'script';
        domainScript = '<' + script + '>document.domain="' + domain + '";</' + script + '>';
        domainInput = '<input name="_documentDomain" value="' + domain + '" />';
      }
      return '\n      <!DOCTYPE html>\n      <html>\n      <head>\n      <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n      <style>\n      body,html {padding:0;margin:0;border:0;overflow:hidden;}\n      </style>\n      ' + domainScript + '\n      </head>\n      <body>\n      <form method="post"\n      encType="multipart/form-data"\n      action="" id="form"\n      style="display:block;height:9999px;position:relative;overflow:hidden;">\n      <input id="input" type="file"\n       name="' + this.name + '"\n       style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n      ' + domainInput + '\n      <span id="data"></span>\n      </form>\n      </body>\n      </html>\n      ';
    },
    initIframeSrc: function initIframeSrc() {
      if (this.domain) {
        this.getIframeNode().src = 'javascript:void((function(){\n          var d = document;\n          d.open();\n          d.domain=\'' + this.domain + '\';\n          d.write(\'\');\n          d.close();\n        })())';
      }
    },
    initIframe: function initIframe() {
      var iframeNode = this.getIframeNode();
      var win = iframeNode.contentWindow;
      var doc = void 0;
      this.domain = this.domain || '';
      this.initIframeSrc();
      try {
        doc = win.document;
      } catch (e) {
        this.domain = document.domain;
        this.initIframeSrc();
        win = iframeNode.contentWindow;
        doc = win.document;
      }
      doc.open('text/html', 'replace');
      doc.write(this.getIframeHTML(this.domain));
      doc.close();
      this.getFormInputNode().onchange = this.onChange;
    },
    endUpload: function endUpload() {
      if (this.uploading) {
        this.file = {};
        // hack avoid batch
        this.uploading = false;
        this.setState({
          uploading: false
        });
        this.initIframe();
      }
    },
    startUpload: function startUpload() {
      if (!this.uploading) {
        this.uploading = true;
        this.setState({
          uploading: true
        });
      }
    },
    updateIframeWH: function updateIframeWH() {
      var rootNode = this.$el;
      var iframeNode = this.getIframeNode();
      iframeNode.style.height = rootNode.offsetHeight + 'px';
      iframeNode.style.width = rootNode.offsetWidth + 'px';
    },
    abort: function abort(file) {
      if (file) {
        var uid = file;
        if (file && file.uid) {
          uid = file.uid;
        }
        if (uid === this.file.uid) {
          this.endUpload();
        }
      } else {
        this.endUpload();
      }
    },
    post: function post(file) {
      var _this2 = this;

      var formNode = this.getFormNode();
      var dataSpan = this.getFormDataNode();
      var data = this.$props.data;

      if (typeof data === 'function') {
        data = data(file);
      }
      var inputs = document.createDocumentFragment();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var input = document.createElement('input');
          input.setAttribute('name', key);
          input.value = data[key];
          inputs.appendChild(input);
        }
      }
      dataSpan.appendChild(inputs);
      new Promise(function (resolve) {
        var action = _this2.action;

        if (typeof action === 'function') {
          return resolve(action(file));
        }
        resolve(action);
      }).then(function (action) {
        formNode.setAttribute('action', action);
        formNode.submit();
        dataSpan.innerHTML = '';
        _this2.$emit('start', file);
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.updateIframeWH();
      _this3.initIframe();
    });
  },
  updated: function updated() {
    var _this4 = this;

    this.$nextTick(function () {
      _this4.updateIframeWH();
    });
  },
  render: function render() {
    var _classNames;

    var h = arguments[0];
    var _$props = this.$props,
        Tag = _$props.componentTag,
        disabled = _$props.disabled,
        prefixCls = _$props.prefixCls;

    var iframeStyle = extends_default()({}, IFRAME_STYLE, {
      display: this.uploading || disabled ? 'none' : ''
    });
    var cls = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls, true), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), _classNames));

    return h(
      Tag,
      {
        attrs: { className: cls },
        style: { position: 'relative', zIndex: 0 } },
      [h('iframe', { ref: 'iframeRef', on: {
          'load': this.onLoad
        },
        style: iframeStyle }), this.$slots['default']]
    );
  }
};

/* harmony default export */ var src_IframeUploader = (IframeUploader);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/Upload.js







function empty() {}

var uploadProps = {
  componentTag: vue_types["a" /* default */].string,
  prefixCls: vue_types["a" /* default */].string,
  action: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].func]),
  name: vue_types["a" /* default */].string,
  multipart: vue_types["a" /* default */].bool,
  directory: vue_types["a" /* default */].bool,
  // onError: PropTypes.func,
  // onSuccess: PropTypes.func,
  // onProgress: PropTypes.func,
  // onStart: PropTypes.func,
  data: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].func]),
  headers: vue_types["a" /* default */].object,
  accept: vue_types["a" /* default */].string,
  multiple: vue_types["a" /* default */].bool,
  disabled: vue_types["a" /* default */].bool,
  beforeUpload: vue_types["a" /* default */].func,
  customRequest: vue_types["a" /* default */].func,
  // onReady: PropTypes.func,
  withCredentials: vue_types["a" /* default */].bool,
  supportServerRender: vue_types["a" /* default */].bool,
  openFileDialogOnClick: vue_types["a" /* default */].bool
};
/* harmony default export */ var Upload = ({
  name: 'Upload',
  mixins: [BaseMixin["a" /* default */]],
  inheritAttrs: false,
  props: Object(props_util["r" /* initDefaultProps */])(uploadProps, {
    componentTag: 'span',
    prefixCls: 'rc-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    // onReady: empty,
    // onStart: empty,
    // onError: empty,
    // onSuccess: empty,
    supportServerRender: false,
    multiple: false,
    beforeUpload: empty,
    withCredentials: false,
    openFileDialogOnClick: true
  }),
  data: function data() {
    return {
      Component: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.supportServerRender) {
        /* eslint react/no-did-mount-set-state:0 */
        _this.setState({
          Component: _this.getComponent()
        }, function () {
          _this.$emit('ready');
        });
      }
    });
  },

  methods: {
    getComponent: function getComponent() {
      return typeof File !== 'undefined' ? src_AjaxUploader : src_IframeUploader;
    },
    abort: function abort(file) {
      this.$refs.uploaderRef.abort(file);
    }
  },

  render: function render() {
    var h = arguments[0];

    var componentProps = {
      props: extends_default()({}, this.$props),
      on: this.$listeners,
      ref: 'uploaderRef',
      attrs: this.$attrs
    };
    if (this.supportServerRender) {
      var _ComponentUploader = this.Component;
      if (_ComponentUploader) {
        return h(
          _ComponentUploader,
          componentProps,
          [this.$slots['default']]
        );
      }
      return null;
    }
    var ComponentUploader = this.getComponent();
    return h(
      ComponentUploader,
      componentProps,
      [this.$slots['default']]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/src/index.js
// export this package's api


/* harmony default export */ var src = (Upload);
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-upload/index.js
// rc-upload 2.6.3


/* harmony default export */ var vc_upload = __webpack_exports__["a"] = (src);

/***/ }),

/***/ "0bb5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1552");
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t("1552", 1);


/* harmony default export */ __webpack_exports__["a"] = (_package_json__WEBPACK_IMPORTED_MODULE_0__[/* version */ "a"]);

/***/ }),

/***/ "8496":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-ref/index.js
var vue_ref = __webpack_require__("46cf");
var vue_ref_default = /*#__PURE__*/__webpack_require__.n(vue_ref);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/contains.js
var contains = __webpack_require__("705c");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/requestAnimationTimeout.js + 1 modules
var requestAnimationTimeout = __webpack_require__("d41d");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/Dom/addEventListener.js
var addEventListener = __webpack_require__("f194");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/warning.js
var warning = __webpack_require__("6a21");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-align/index.js + 2 modules
var vc_align = __webpack_require__("4462");

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/LazyRenderBox.js


/* harmony default export */ var LazyRenderBox = ({
  props: {
    visible: vue_types["a" /* default */].bool,
    hiddenClassName: vue_types["a" /* default */].string
  },
  render: function render() {
    var h = arguments[0];
    var _$props = this.$props,
        hiddenClassName = _$props.hiddenClassName,
        visible = _$props.visible;

    var children = null;
    if (hiddenClassName || !this.$slots['default'] || this.$slots['default'].length > 1) {
      var cls = '';
      if (!visible && hiddenClassName) {
        // cls += ` ${hiddenClassName}`
      }
      children = h(
        'div',
        { 'class': cls },
        [this.$slots['default']]
      );
    } else {
      children = this.$slots['default'][0];
    }
    return children;
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/PopupInner.js




/* harmony default export */ var PopupInner = ({
  props: {
    hiddenClassName: vue_types["a" /* default */].string.def(''),
    prefixCls: vue_types["a" /* default */].string,
    visible: vue_types["a" /* default */].bool
  },
  render: function render() {
    var h = arguments[0];
    var _$props = this.$props,
        prefixCls = _$props.prefixCls,
        visible = _$props.visible,
        hiddenClassName = _$props.hiddenClassName;
    var $listeners = this.$listeners;

    var divProps = {
      on: $listeners
    };

    return h(
      'div',
      babel_helper_vue_jsx_merge_props_default()([divProps, { 'class': !visible ? hiddenClassName : '' }]),
      [h(
        LazyRenderBox,
        { 'class': prefixCls + '-content', attrs: { visible: visible }
        },
        [this.$slots['default']]
      )]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/css-animation/index.js
var css_animation = __webpack_require__("18ce");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/Popup.js









/* harmony default export */ var Popup = ({
  mixins: [BaseMixin["a" /* default */]],
  props: {
    visible: vue_types["a" /* default */].bool,
    getClassNameFromAlign: vue_types["a" /* default */].func,
    getRootDomNode: vue_types["a" /* default */].func,
    align: vue_types["a" /* default */].any,
    destroyPopupOnHide: vue_types["a" /* default */].bool,
    prefixCls: vue_types["a" /* default */].string,
    getContainer: vue_types["a" /* default */].func,
    transitionName: vue_types["a" /* default */].string,
    animation: vue_types["a" /* default */].any,
    maskAnimation: vue_types["a" /* default */].string,
    maskTransitionName: vue_types["a" /* default */].string,
    mask: vue_types["a" /* default */].bool,
    zIndex: vue_types["a" /* default */].number,
    popupClassName: vue_types["a" /* default */].any,
    popupStyle: vue_types["a" /* default */].object.def({}),
    stretch: vue_types["a" /* default */].string,
    point: vue_types["a" /* default */].shape({
      pageX: vue_types["a" /* default */].number,
      pageY: vue_types["a" /* default */].number
    })
  },
  data: function data() {
    this.domEl = null;
    return {
      // Used for stretch
      stretchChecked: false,
      targetWidth: undefined,
      targetHeight: undefined
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.rootNode = _this.getPopupDomNode();
      _this.setStretchSize();
    });
  },
  beforeUpdate: function beforeUpdate() {
    if (this.domEl && this.domEl.rcEndListener) {
      this.domEl.rcEndListener();
      this.domEl = null;
    }
  },
  updated: function updated() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.setStretchSize();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    } else if (this.$el.remove) {
      this.$el.remove();
    }
  },

  methods: {
    onAlign: function onAlign(popupDomNode, align) {
      var props = this.$props;
      var currentAlignClassName = props.getClassNameFromAlign(align);
      // FIX: https://github.com/react-component/trigger/issues/56
      // FIX: https://github.com/react-component/tooltip/issues/79
      if (this.currentAlignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName;
        popupDomNode.className = this.getClassName(currentAlignClassName);
      }
      this.$listeners.align && this.$listeners.align(popupDomNode, align);
    },


    // Record size if stretch needed
    setStretchSize: function setStretchSize() {
      var _$props = this.$props,
          stretch = _$props.stretch,
          getRootDomNode = _$props.getRootDomNode,
          visible = _$props.visible;
      var _$data = this.$data,
          stretchChecked = _$data.stretchChecked,
          targetHeight = _$data.targetHeight,
          targetWidth = _$data.targetWidth;


      if (!stretch || !visible) {
        if (stretchChecked) {
          this.setState({ stretchChecked: false });
        }
        return;
      }

      var $ele = getRootDomNode();
      if (!$ele) return;

      var height = $ele.offsetHeight;
      var width = $ele.offsetWidth;

      if (targetHeight !== height || targetWidth !== width || !stretchChecked) {
        this.setState({
          stretchChecked: true,
          targetHeight: height,
          targetWidth: width
        });
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.$refs.popupInstance ? this.$refs.popupInstance.$el : null;
    },
    getTargetElement: function getTargetElement() {
      return this.$props.getRootDomNode();
    },


    // `target` on `rc-align` can accept as a function to get the bind element or a point.
    // ref: https://www.npmjs.com/package/rc-align
    getAlignTarget: function getAlignTarget() {
      var point = this.$props.point;

      if (point) {
        return point;
      }
      return this.getTargetElement;
    },
    getMaskTransitionName: function getMaskTransitionName() {
      var props = this.$props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getTransitionName: function getTransitionName() {
      var props = this.$props;
      var transitionName = props.transitionName;
      var animation = props.animation;
      if (!transitionName) {
        if (typeof animation === 'string') {
          transitionName = '' + animation;
        } else if (animation && animation.props && animation.props.name) {
          transitionName = animation.props.name;
        }
      }
      return transitionName;
    },
    getClassName: function getClassName(currentAlignClassName) {
      return this.$props.prefixCls + ' ' + this.$props.popupClassName + ' ' + currentAlignClassName;
    },
    getPopupElement: function getPopupElement() {
      var _this3 = this;

      var h = this.$createElement;
      var props = this.$props,
          $slots = this.$slots,
          $listeners = this.$listeners,
          getTransitionName = this.getTransitionName;
      var _$data2 = this.$data,
          stretchChecked = _$data2.stretchChecked,
          targetHeight = _$data2.targetHeight,
          targetWidth = _$data2.targetWidth;
      var align = props.align,
          visible = props.visible,
          prefixCls = props.prefixCls,
          animation = props.animation,
          popupStyle = props.popupStyle,
          getClassNameFromAlign = props.getClassNameFromAlign,
          destroyPopupOnHide = props.destroyPopupOnHide,
          stretch = props.stretch;
      // const { mouseenter, mouseleave } = $listeners

      var className = this.getClassName(this.currentAlignClassName || getClassNameFromAlign(align));
      // const hiddenClassName = `${prefixCls}-hidden`
      if (!visible) {
        this.currentAlignClassName = null;
      }
      var sizeStyle = {};
      if (stretch) {
        // Stretch with target
        if (stretch.indexOf('height') !== -1) {
          sizeStyle.height = typeof targetHeight === 'number' ? targetHeight + 'px' : targetHeight;
        } else if (stretch.indexOf('minHeight') !== -1) {
          sizeStyle.minHeight = typeof targetHeight === 'number' ? targetHeight + 'px' : targetHeight;
        }
        if (stretch.indexOf('width') !== -1) {
          sizeStyle.width = typeof targetWidth === 'number' ? targetWidth + 'px' : targetWidth;
        } else if (stretch.indexOf('minWidth') !== -1) {
          sizeStyle.minWidth = typeof targetWidth === 'number' ? targetWidth + 'px' : targetWidth;
        }

        // Delay force align to makes ui smooth
        if (!stretchChecked) {
          // sizeStyle.visibility = 'hidden'
          setTimeout(function () {
            if (_this3.$refs.alignInstance) {
              _this3.$refs.alignInstance.forceAlign();
            }
          }, 0);
        }
      }
      var popupInnerProps = {
        props: {
          prefixCls: prefixCls,
          visible: visible
          // hiddenClassName,
        },
        'class': className,
        on: $listeners,
        ref: 'popupInstance',
        style: extends_default()({}, sizeStyle, popupStyle, this.getZIndexStyle())
      };
      var transitionProps = {
        props: extends_default()({
          appear: true,
          css: false
        })
      };
      var transitionName = getTransitionName();
      var useTransition = !!transitionName;
      var transitionEvent = {
        beforeEnter: function beforeEnter() {
          // el.style.display = el.__vOriginalDisplay
          // this.$refs.alignInstance.forceAlign();
        },
        enter: function enter(el, done) {
          // render 后 vue 会移除通过animate动态添加的 class导致动画闪动，延迟两帧添加动画class，可以进一步定位或者重写 transition 组件
          _this3.$nextTick(function () {
            if (_this3.$refs.alignInstance) {
              _this3.$refs.alignInstance.$nextTick(function () {
                _this3.domEl = el;
                Object(css_animation["a" /* default */])(el, transitionName + '-enter', done);
              });
            }
          });
        },
        beforeLeave: function beforeLeave() {
          _this3.domEl = null;
        },
        leave: function leave(el, done) {
          Object(css_animation["a" /* default */])(el, transitionName + '-leave', done);
        }
      };

      if ((typeof animation === 'undefined' ? 'undefined' : typeof_default()(animation)) === 'object') {
        useTransition = true;

        var _animation$on = animation.on,
            on = _animation$on === undefined ? {} : _animation$on,
            _animation$props = animation.props,
            _props = _animation$props === undefined ? {} : _animation$props;

        transitionProps.props = extends_default()({}, transitionProps.props, _props);
        transitionProps.on = extends_default()({}, transitionEvent, on);
      } else {
        transitionProps.on = transitionEvent;
      }
      if (!useTransition) {
        transitionProps = {};
      }
      if (destroyPopupOnHide) {
        return h(
          'transition',
          transitionProps,
          [visible ? h(
            vc_align["a" /* default */],
            {
              attrs: {
                target: this.getAlignTarget(),

                monitorWindowResize: true,
                align: align
              },
              key: 'popup',
              ref: 'alignInstance', on: {
                'align': this.onAlign
              }
            },
            [h(
              PopupInner,
              popupInnerProps,
              [$slots['default']]
            )]
          ) : null]
        );
      }
      return h(
        'transition',
        transitionProps,
        [h(
          vc_align["a" /* default */],
          {
            directives: [{
              name: 'show',
              value: visible
            }],
            attrs: {
              target: this.getAlignTarget(),

              monitorWindowResize: true,
              disabled: !visible,
              align: align
            },
            key: 'popup',
            ref: 'alignInstance', on: {
              'align': this.onAlign
            }
          },
          [h(
            PopupInner,
            popupInnerProps,
            [$slots['default']]
          )]
        )]
      );
    },
    getZIndexStyle: function getZIndexStyle() {
      var style = {};
      var props = this.$props;
      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }
      return style;
    },
    getMaskElement: function getMaskElement() {
      var h = this.$createElement;

      var props = this.$props;
      var maskElement = null;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = h(LazyRenderBox, {
          directives: [{
            name: 'show',
            value: props.visible
          }],

          style: this.getZIndexStyle(),
          key: 'mask',
          'class': props.prefixCls + '-mask',
          attrs: { visible: props.visible
          }
        });
        if (maskTransition) {
          maskElement = h(
            'transition',
            {
              attrs: { appear: true, name: maskTransition }
            },
            [maskElement]
          );
        }
      }
      return maskElement;
    }
  },

  render: function render() {
    var h = arguments[0];
    var getMaskElement = this.getMaskElement,
        getPopupElement = this.getPopupElement;

    return h('div', [getMaskElement(), getPopupElement()]);
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/utils.js

function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  var baseAlign = builtinPlacements[placementStr] || {};
  return extends_default()({}, baseAlign, align);
}

function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  var points = align.points;
  for (var placement in builtinPlacements) {
    if (builtinPlacements.hasOwnProperty(placement)) {
      if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
        return prefixCls + '-placement-' + placement;
      }
    }
  }
  return '';
}
function noop() {}
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vnode.js
var vnode = __webpack_require__("7b05");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/ContainerRender.js
var ContainerRender = __webpack_require__("98d3");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/Trigger.js















vue_runtime_esm["a" /* default */].use(vue_ref_default.a, { name: 'ant-ref' });

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}
var ALL_HANDLERS = ['click', 'mousedown', 'touchstart', 'mouseenter', 'mouseleave', 'focus', 'blur', 'contextmenu'];

/* harmony default export */ var Trigger = ({
  name: 'Trigger',
  mixins: [BaseMixin["a" /* default */]],
  props: {
    action: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].string)]).def([]),
    showAction: vue_types["a" /* default */].any.def([]),
    hideAction: vue_types["a" /* default */].any.def([]),
    getPopupClassNameFromAlign: vue_types["a" /* default */].any.def(returnEmptyString),
    // onPopupVisibleChange: PropTypes.func.def(noop),
    afterPopupVisibleChange: vue_types["a" /* default */].func.def(noop),
    popup: vue_types["a" /* default */].any,
    popupStyle: vue_types["a" /* default */].object.def({}),
    prefixCls: vue_types["a" /* default */].string.def('rc-trigger-popup'),
    popupClassName: vue_types["a" /* default */].string.def(''),
    popupPlacement: vue_types["a" /* default */].string,
    builtinPlacements: vue_types["a" /* default */].object,
    popupTransitionName: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    popupAnimation: vue_types["a" /* default */].any,
    mouseEnterDelay: vue_types["a" /* default */].number.def(0),
    mouseLeaveDelay: vue_types["a" /* default */].number.def(0.1),
    zIndex: vue_types["a" /* default */].number,
    focusDelay: vue_types["a" /* default */].number.def(0),
    blurDelay: vue_types["a" /* default */].number.def(0.15),
    getPopupContainer: vue_types["a" /* default */].func,
    getDocument: vue_types["a" /* default */].func.def(returnDocument),
    forceRender: vue_types["a" /* default */].bool,
    destroyPopupOnHide: vue_types["a" /* default */].bool.def(false),
    mask: vue_types["a" /* default */].bool.def(false),
    maskClosable: vue_types["a" /* default */].bool.def(true),
    // onPopupAlign: PropTypes.func.def(noop),
    popupAlign: vue_types["a" /* default */].object.def({}),
    popupVisible: vue_types["a" /* default */].bool,
    defaultPopupVisible: vue_types["a" /* default */].bool.def(false),
    maskTransitionName: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].object]),
    maskAnimation: vue_types["a" /* default */].string,
    stretch: vue_types["a" /* default */].string,
    alignPoint: vue_types["a" /* default */].bool // Maybe we can support user pass position in the future
  },
  provide: function provide() {
    return {
      vcTriggerContext: this
    };
  },

  inject: {
    vcTriggerContext: { 'default': function _default() {
        return {};
      } },
    savePopupRef: { 'default': function _default() {
        return noop;
      } },
    dialogContext: { 'default': function _default() {
        return null;
      } }
  },
  data: function data() {
    var props = this.$props;
    var popupVisible = void 0;
    if (Object(props_util["q" /* hasProp */])(this, 'popupVisible')) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    return {
      sPopupVisible: popupVisible,
      point: null
    };
  },

  watch: {
    popupVisible: function popupVisible(val) {
      if (val !== undefined) {
        this.sPopupVisible = val;
      }
    },
    sPopupVisible: function sPopupVisible(val) {
      var _this = this;

      this.$nextTick(function () {
        _this.renderComponent(null, function () {
          _this.afterPopupVisibleChange(_this.sPopupVisible);
        });
      });
    }
  },

  beforeCreate: function beforeCreate() {
    var _this2 = this;

    ALL_HANDLERS.forEach(function (h) {
      _this2['fire' + h] = function (e) {
        _this2.fireEvents(h, e);
      };
    });
  },
  deactivated: function deactivated() {
    this.setPopupVisible(false);
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.renderComponent(null);
      _this3.updatedCal();
    });
  },
  updated: function updated() {
    var _this4 = this;

    this.$nextTick(function () {
      _this4.updatedCal();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    clearTimeout(this.mouseDownTimeout);
  },

  methods: {
    updatedCal: function updatedCal() {
      var props = this.$props;
      var state = this.$data;

      // We must listen to `mousedown` or `touchstart`, edge case:
      // https://github.com/ant-design/ant-design/issues/5804
      // https://github.com/react-component/calendar/issues/250
      // https://github.com/react-component/trigger/issues/50
      if (state.sPopupVisible) {
        var currentDocument = void 0;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
          currentDocument = props.getDocument();
          this.clickOutsideHandler = Object(addEventListener["a" /* default */])(currentDocument, 'mousedown', this.onDocumentClick);
        }
        // always hide on mobile
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props.getDocument();
          this.touchOutsideHandler = Object(addEventListener["a" /* default */])(currentDocument, 'touchstart', this.onDocumentClick);
        }
        // close popup when trigger type contains 'onContextmenu' and document is scrolling.
        if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
          currentDocument = currentDocument || props.getDocument();
          this.contextmenuOutsideHandler1 = Object(addEventListener["a" /* default */])(currentDocument, 'scroll', this.onContextmenuClose);
        }
        // close popup when trigger type contains 'onContextmenu' and window is blur.
        if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
          this.contextmenuOutsideHandler2 = Object(addEventListener["a" /* default */])(window, 'blur', this.onContextmenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    },
    onMouseenter: function onMouseenter(e) {
      var mouseEnterDelay = this.$props.mouseEnterDelay;

      this.fireEvents('mouseenter', e);
      this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
    },
    onMouseMove: function onMouseMove(e) {
      this.fireEvents('mousemove', e);
      this.setPoint(e);
    },
    onMouseleave: function onMouseleave(e) {
      this.fireEvents('mouseleave', e);
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onPopupMouseenter: function onPopupMouseenter() {
      this.clearDelayTimer();
    },
    onPopupMouseleave: function onPopupMouseleave(e) {
      if (e && e.relatedTarget && !e.relatedTarget.setTimeout && this._component && this._component.getPopupDomNode && Object(contains["a" /* default */])(this._component.getPopupDomNode(), e.relatedTarget)) {
        return;
      }
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onFocus: function onFocus(e) {
      this.fireEvents('focus', e);
      // incase focusin and focusout
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.$props.focusDelay);
      }
    },
    onMousedown: function onMousedown(e) {
      this.fireEvents('mousedown', e);
      this.preClickTime = Date.now();
    },
    onTouchstart: function onTouchstart(e) {
      this.fireEvents('touchstart', e);
      this.preTouchTime = Date.now();
    },
    onBlur: function onBlur(e) {
      if (!Object(contains["a" /* default */])(e.target, e.relatedTarget || document.activeElement)) {
        this.fireEvents('blur', e);
        this.clearDelayTimer();
        if (this.isBlurToHide()) {
          this.delaySetPopupVisible(false, this.$props.blurDelay);
        }
      }
    },
    onContextmenu: function onContextmenu(e) {
      e.preventDefault();
      this.fireEvents('contextmenu', e);
      this.setPopupVisible(true, e);
    },
    onContextmenuClose: function onContextmenuClose() {
      if (this.isContextmenuToShow()) {
        this.close();
      }
    },
    onClick: function onClick(event) {
      this.fireEvents('click', event);
      // focus will trigger click
      if (this.focusTime) {
        var preTime = void 0;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.domEvent) {
        event.domEvent.preventDefault();
      }
      var nextVisible = !this.$data.sPopupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.$data.sPopupVisible, event);
      }
    },
    onPopupMouseDown: function onPopupMouseDown() {
      var _this5 = this;

      var _vcTriggerContext = this.vcTriggerContext,
          vcTriggerContext = _vcTriggerContext === undefined ? {} : _vcTriggerContext;

      this.hasPopupMouseDown = true;

      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(function () {
        _this5.hasPopupMouseDown = false;
      }, 0);

      if (vcTriggerContext.onPopupMouseDown) {
        vcTriggerContext.onPopupMouseDown.apply(vcTriggerContext, arguments);
      }
    },
    onDocumentClick: function onDocumentClick(event) {
      if (this.$props.mask && !this.$props.maskClosable) {
        return;
      }
      var target = event.target;
      var root = this.$el;
      if (!Object(contains["a" /* default */])(root, target) && !this.hasPopupMouseDown) {
        this.close();
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      if (this._component && this._component.getPopupDomNode) {
        return this._component.getPopupDomNode();
      }
      return null;
    },
    getRootDomNode: function getRootDomNode() {
      return this.$el;
      // return this.$el.children[0] || this.$el
    },
    handleGetPopupClassFromAlign: function handleGetPopupClassFromAlign(align) {
      var className = [];
      var props = this.$props;
      var popupPlacement = props.popupPlacement,
          builtinPlacements = props.builtinPlacements,
          prefixCls = props.prefixCls,
          alignPoint = props.alignPoint,
          getPopupClassNameFromAlign = props.getPopupClassNameFromAlign;

      if (popupPlacement && builtinPlacements) {
        className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint));
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    },
    getPopupAlign: function getPopupAlign() {
      var props = this.$props;
      var popupPlacement = props.popupPlacement,
          popupAlign = props.popupAlign,
          builtinPlacements = props.builtinPlacements;

      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    savePopup: function savePopup(node) {
      this._component = node;
      this.savePopupRef(node);
    },
    getComponent: function getComponent() {
      var h = this.$createElement;

      var self = this;
      var mouseProps = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.mouseenter = self.onPopupMouseenter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.mouseleave = self.onPopupMouseleave;
      }
      mouseProps.mousedown = this.onPopupMouseDown;
      mouseProps.touchstart = this.onPopupMouseDown;
      var handleGetPopupClassFromAlign = self.handleGetPopupClassFromAlign,
          getRootDomNode = self.getRootDomNode,
          getContainer = self.getContainer,
          $listeners = self.$listeners;
      var _self$$props = self.$props,
          prefixCls = _self$$props.prefixCls,
          destroyPopupOnHide = _self$$props.destroyPopupOnHide,
          popupClassName = _self$$props.popupClassName,
          action = _self$$props.action,
          popupAnimation = _self$$props.popupAnimation,
          popupTransitionName = _self$$props.popupTransitionName,
          popupStyle = _self$$props.popupStyle,
          mask = _self$$props.mask,
          maskAnimation = _self$$props.maskAnimation,
          maskTransitionName = _self$$props.maskTransitionName,
          zIndex = _self$$props.zIndex,
          stretch = _self$$props.stretch,
          alignPoint = _self$$props.alignPoint;
      var _$data = this.$data,
          sPopupVisible = _$data.sPopupVisible,
          point = _$data.point;

      var align = this.getPopupAlign();
      var popupProps = {
        props: {
          prefixCls: prefixCls,
          destroyPopupOnHide: destroyPopupOnHide,
          visible: sPopupVisible,
          point: alignPoint && point,
          action: action,
          align: align,
          animation: popupAnimation,
          getClassNameFromAlign: handleGetPopupClassFromAlign,
          stretch: stretch,
          getRootDomNode: getRootDomNode,
          mask: mask,
          zIndex: zIndex,
          transitionName: popupTransitionName,
          maskAnimation: maskAnimation,
          maskTransitionName: maskTransitionName,
          getContainer: getContainer,
          popupClassName: popupClassName,
          popupStyle: popupStyle
        },
        on: extends_default()({
          align: $listeners.popupAlign || noop
        }, mouseProps),
        directives: [{
          name: 'ant-ref',
          value: this.savePopup
        }]
      };
      return h(
        Popup,
        popupProps,
        [Object(props_util["g" /* getComponentFromProp */])(self, 'popup')]
      );
    },
    getContainer: function getContainer() {
      var props = this.$props,
          dialogContext = this.dialogContext;

      var popupContainer = document.createElement('div');
      // Make sure default popup container will never cause scrollbar appearing
      // https://github.com/react-component/trigger/issues/41
      popupContainer.style.position = 'absolute';
      popupContainer.style.top = '0';
      popupContainer.style.left = '0';
      popupContainer.style.width = '100%';
      var mountNode = props.getPopupContainer ? props.getPopupContainer(this.$el, dialogContext) : props.getDocument().body;
      mountNode.appendChild(popupContainer);
      this.popupContainer = popupContainer;
      return popupContainer;
    },
    setPopupVisible: function setPopupVisible(sPopupVisible, event) {
      var alignPoint = this.$props.alignPoint;

      this.clearDelayTimer();
      if (this.$data.sPopupVisible !== sPopupVisible) {
        if (!Object(props_util["q" /* hasProp */])(this, 'popupVisible')) {
          this.setState({
            sPopupVisible: sPopupVisible
          });
        }
        this.$listeners.popupVisibleChange && this.$listeners.popupVisibleChange(sPopupVisible);
      }
      // Always record the point position since mouseEnterDelay will delay the show
      if (sPopupVisible && alignPoint && event) {
        this.setPoint(event);
      }
    },
    setPoint: function setPoint(point) {
      var alignPoint = this.$props.alignPoint;

      if (!alignPoint || !point) return;

      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY
        }
      });
    },
    delaySetPopupVisible: function delaySetPopupVisible(visible, delayS, event) {
      var _this6 = this;

      var delay = delayS * 1000;
      this.clearDelayTimer();
      if (delay) {
        var point = event ? { pageX: event.pageX, pageY: event.pageY } : null;
        this.delayTimer = Object(requestAnimationTimeout["b" /* requestAnimationTimeout */])(function () {
          _this6.setPopupVisible(visible, point);
          _this6.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible, event);
      }
    },
    clearDelayTimer: function clearDelayTimer() {
      if (this.delayTimer) {
        Object(requestAnimationTimeout["a" /* cancelAnimationTimeout */])(this.delayTimer);
        this.delayTimer = null;
      }
    },
    clearOutsideHandler: function clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }

      if (this.contextmenuOutsideHandler1) {
        this.contextmenuOutsideHandler1.remove();
        this.contextmenuOutsideHandler1 = null;
      }

      if (this.contextmenuOutsideHandler2) {
        this.contextmenuOutsideHandler2.remove();
        this.contextmenuOutsideHandler2 = null;
      }

      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    },
    createTwoChains: function createTwoChains(event) {
      var fn = function fn() {};
      var events = this.$listeners;
      if (this.childOriginEvents[event] && events[event]) {
        return this['fire' + event];
      }
      fn = this.childOriginEvents[event] || events[event] || fn;
      return fn;
    },
    isClickToShow: function isClickToShow() {
      var _$props = this.$props,
          action = _$props.action,
          showAction = _$props.showAction;

      return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    },
    isContextmenuToShow: function isContextmenuToShow() {
      var _$props2 = this.$props,
          action = _$props2.action,
          showAction = _$props2.showAction;

      return action.indexOf('contextmenu') !== -1 || showAction.indexOf('contextmenu') !== -1;
    },
    isClickToHide: function isClickToHide() {
      var _$props3 = this.$props,
          action = _$props3.action,
          hideAction = _$props3.hideAction;

      return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    },
    isMouseEnterToShow: function isMouseEnterToShow() {
      var _$props4 = this.$props,
          action = _$props4.action,
          showAction = _$props4.showAction;

      return action.indexOf('hover') !== -1 || showAction.indexOf('mouseenter') !== -1;
    },
    isMouseLeaveToHide: function isMouseLeaveToHide() {
      var _$props5 = this.$props,
          action = _$props5.action,
          hideAction = _$props5.hideAction;

      return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseleave') !== -1;
    },
    isFocusToShow: function isFocusToShow() {
      var _$props6 = this.$props,
          action = _$props6.action,
          showAction = _$props6.showAction;

      return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
    },
    isBlurToHide: function isBlurToHide() {
      var _$props7 = this.$props,
          action = _$props7.action,
          hideAction = _$props7.hideAction;

      return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    },
    forcePopupAlign: function forcePopupAlign() {
      if (this.$data.sPopupVisible && this._component && this._component.$refs.alignInstance) {
        this._component.$refs.alignInstance.forceAlign();
      }
    },
    fireEvents: function fireEvents(type, e) {
      if (this.childOriginEvents[type]) {
        this.childOriginEvents[type](e);
      }
      this.__emit(type, e);
    },
    close: function close() {
      this.setPopupVisible(false);
    }
  },
  render: function render() {
    var _this7 = this;

    var h = arguments[0];
    var sPopupVisible = this.sPopupVisible;

    var children = Object(props_util["c" /* filterEmpty */])(this.$slots['default']);
    var _$props8 = this.$props,
        forceRender = _$props8.forceRender,
        alignPoint = _$props8.alignPoint;


    if (children.length > 1) {
      Object(warning["a" /* default */])(false, 'Trigger $slots.default.length > 1, just support only one default', true);
    }
    var child = children[0];
    this.childOriginEvents = Object(props_util["h" /* getEvents */])(child);
    var newChildProps = {
      props: {},
      on: {},
      key: 'trigger'
    };

    if (this.isContextmenuToShow()) {
      newChildProps.on.contextmenu = this.onContextmenu;
    } else {
      newChildProps.on.contextmenu = this.createTwoChains('contextmenu');
    }

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.on.click = this.onClick;
      newChildProps.on.mousedown = this.onMousedown;
      newChildProps.on.touchstart = this.onTouchstart;
    } else {
      newChildProps.on.click = this.createTwoChains('click');
      newChildProps.on.mousedown = this.createTwoChains('mousedown');
      newChildProps.on.touchstart = this.createTwoChains('onTouchstart');
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.on.mouseenter = this.onMouseenter;
      if (alignPoint) {
        newChildProps.on.mousemove = this.onMouseMove;
      }
    } else {
      newChildProps.on.mouseenter = this.createTwoChains('mouseenter');
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.on.mouseleave = this.onMouseleave;
    } else {
      newChildProps.on.mouseleave = this.createTwoChains('mouseleave');
    }

    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.on.focus = this.onFocus;
      newChildProps.on.blur = this.onBlur;
    } else {
      newChildProps.on.focus = this.createTwoChains('focus');
      newChildProps.on.blur = function (e) {
        if (e && (!e.relatedTarget || !Object(contains["a" /* default */])(e.target, e.relatedTarget))) {
          _this7.createTwoChains('blur')(e);
        }
      };
    }

    this.trigger = Object(vnode["a" /* cloneElement */])(child, newChildProps);

    return h(ContainerRender["a" /* default */], {
      attrs: {
        parent: this,
        visible: sPopupVisible,
        autoMount: false,
        forceRender: forceRender,
        getComponent: this.getComponent,
        getContainer: this.getContainer,
        children: function children(_ref) {
          var renderComponent = _ref.renderComponent;

          _this7.renderComponent = renderComponent;
          return _this7.trigger;
        }
      }
    });
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/vc-trigger/index.js
// based on rc-trigger 2.6.2

/* harmony default export */ var vc_trigger = __webpack_exports__["a"] = (Trigger);

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~61bc7846.296add79.js.map