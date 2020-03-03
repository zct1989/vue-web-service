(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~3f03297a"],{

/***/ "39ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: UploadProps, UploadListProps, UploadChangeParam

// EXTERNAL MODULE: ./node_modules/babel-helper-vue-jsx-merge-props/index.js
var babel_helper_vue_jsx_merge_props = __webpack_require__("92fa");
var babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("6042");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("41b2");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("4d26");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/lodash/uniqBy.js
var uniqBy = __webpack_require__("a8fc");
var uniqBy_default = /*#__PURE__*/__webpack_require__.n(uniqBy);

// EXTERNAL MODULE: ./node_modules/lodash/findIndex.js
var findIndex = __webpack_require__("51f5");
var findIndex_default = /*#__PURE__*/__webpack_require__.n(findIndex);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/vc-upload/index.js + 8 modules
var vc_upload = __webpack_require__("0264");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/BaseMixin.js
var BaseMixin = __webpack_require__("b488");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/props-util.js
var props_util = __webpack_require__("daa3");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/locale-provider/LocaleReceiver.js
var LocaleReceiver = __webpack_require__("e5cd");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/locale-provider/default.js
var locale_provider_default = __webpack_require__("02ea");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/config-provider/index.js + 1 modules
var config_provider = __webpack_require__("4df5");

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("1098");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/vue-types/index.js + 1 modules
var vue_types = __webpack_require__("4d91");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/interface.js



var UploadFileStatus = vue_types["a" /* default */].oneOf(['error', 'success', 'done', 'uploading', 'removed']);

// export const HttpRequestHeader {
//   [key: string]: string;
// }

// export const UploadFile = PropsTypes.shape({
//   uid: PropsTypes.oneOfType([
//     PropsTypes.string,
//     PropsTypes.number,
//   ]),
//   size: PropsTypes.number,
//   name: PropsTypes.string,
//   filename: PropsTypes.string,
//   lastModified: PropsTypes.number,
//   lastModifiedDate: PropsTypes.any,
//   url: PropsTypes.string,
//   status: UploadFileStatus,
//   percent: PropsTypes.number,
//   thumbUrl: PropsTypes.string,
//   originFileObj: PropsTypes.any,
//   response: PropsTypes.any,
//   error: PropsTypes.any,
//   linkProps: PropsTypes.any,
//   type: PropsTypes.string,
// }).loose

function UploadFile(_ref) {
  var uid = _ref.uid,
      name = _ref.name;

  if (!uid && uid !== 0) return false;
  if (!['string', 'number'].includes(typeof uid === 'undefined' ? 'undefined' : typeof_default()(uid))) return false;
  if (name === '' || typeof name !== 'string') return false;
  return true;
}

var UploadChangeParam = {
  file: vue_types["a" /* default */].custom(UploadFile),
  fileList: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].custom(UploadFile)),
  event: vue_types["a" /* default */].object
};

var ShowUploadListInterface = vue_types["a" /* default */].shape({
  showRemoveIcon: vue_types["a" /* default */].bool,
  showPreviewIcon: vue_types["a" /* default */].bool
}).loose;

var UploadLocale = vue_types["a" /* default */].shape({
  uploading: vue_types["a" /* default */].string,
  removeFile: vue_types["a" /* default */].string,
  uploadError: vue_types["a" /* default */].string,
  previewFile: vue_types["a" /* default */].string
}).loose;

var UploadProps = {
  type: vue_types["a" /* default */].oneOf(['drag', 'select']),
  name: vue_types["a" /* default */].string,
  defaultFileList: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].custom(UploadFile)),
  fileList: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].custom(UploadFile)),
  action: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].string, vue_types["a" /* default */].func]),
  directory: vue_types["a" /* default */].bool,
  data: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].object, vue_types["a" /* default */].func]),
  headers: vue_types["a" /* default */].object,
  showUploadList: vue_types["a" /* default */].oneOfType([vue_types["a" /* default */].bool, ShowUploadListInterface]),
  multiple: vue_types["a" /* default */].bool,
  accept: vue_types["a" /* default */].string,
  beforeUpload: vue_types["a" /* default */].func,
  // onChange: PropsTypes.func,
  listType: vue_types["a" /* default */].oneOf(['text', 'picture', 'picture-card']),
  // className: PropsTypes.string,
  // onPreview: PropsTypes.func,
  remove: vue_types["a" /* default */].func,
  supportServerRender: vue_types["a" /* default */].bool,
  // style: PropsTypes.object,
  disabled: vue_types["a" /* default */].bool,
  prefixCls: vue_types["a" /* default */].string,
  customRequest: vue_types["a" /* default */].func,
  withCredentials: vue_types["a" /* default */].bool,
  openFileDialogOnClick: vue_types["a" /* default */].bool,
  locale: UploadLocale,
  height: vue_types["a" /* default */].number,
  id: vue_types["a" /* default */].string
};

var UploadState = {
  fileList: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].custom(UploadFile)),
  dragState: vue_types["a" /* default */].string
};

var UploadListProps = {
  listType: vue_types["a" /* default */].oneOf(['text', 'picture', 'picture-card']),
  // onPreview: PropsTypes.func,
  // onRemove: PropsTypes.func,
  // items: PropsTypes.arrayOf(UploadFile),
  items: vue_types["a" /* default */].arrayOf(vue_types["a" /* default */].custom(UploadFile)),
  // items: PropsTypes.any,
  progressAttr: vue_types["a" /* default */].object,
  prefixCls: vue_types["a" /* default */].string,
  showRemoveIcon: vue_types["a" /* default */].bool,
  showPreviewIcon: vue_types["a" /* default */].bool,
  locale: UploadLocale
};
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/Dragger.js





/* harmony default export */ var Dragger = ({
  name: 'AUploadDragger',
  props: UploadProps,
  render: function render() {
    var h = arguments[0];

    var props = Object(props_util["k" /* getOptionProps */])(this);
    var draggerProps = {
      props: extends_default()({}, props, {
        type: 'drag'
      }),
      on: Object(props_util["j" /* getListeners */])(this),
      style: { height: this.height }
    };
    return h(
      Upload,
      draggerProps,
      [this.$slots['default']]
    );
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/_util/getTransitionProps.js
var getTransitionProps = __webpack_require__("94eb");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/icon/index.js + 3 modules
var es_icon = __webpack_require__("0c63");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/tooltip/index.js + 2 modules
var tooltip = __webpack_require__("f933");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/progress/index.js + 4 modules
var es_progress = __webpack_require__("f2ca");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/UploadList.js













var imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp', 'dpg', 'ico'];
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
var previewFile = function previewFile(file, callback) {
  if (file.type && !imageTypes.includes(file.type)) {
    callback('');
  }
  var reader = new window.FileReader();
  reader.onloadend = function () {
    return callback(reader.result);
  };
  reader.readAsDataURL(file);
};

var extname = function extname(url) {
  if (!url) {
    return '';
  }
  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

var isImageUrl = function isImageUrl(file) {
  if (imageTypes.includes(file.type)) {
    return true;
  }
  var url = file.thumbUrl || file.url;
  var extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp|dpg|ico)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

/* harmony default export */ var UploadList = ({
  name: 'AUploadList',
  mixins: [BaseMixin["a" /* default */]],
  props: Object(props_util["s" /* initDefaultProps */])(UploadListProps, {
    listType: 'text', // or picture
    progressAttr: {
      strokeWidth: 2,
      showInfo: false
    },
    showRemoveIcon: true,
    showPreviewIcon: true
  }),
  inject: {
    configProvider: { 'default': function _default() {
        return config_provider["a" /* ConfigConsumerProps */];
      } }
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.listType !== 'picture' && _this.listType !== 'picture-card') {
        return;
      }
      (_this.items || []).forEach(function (file) {
        if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof window.File) || file.thumbUrl !== undefined) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint -enable */
        previewFile(file.originFileObj, function (previewDataUrl) {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          /*eslint -enable */
          _this.$forceUpdate();
        });
      });
    });
  },

  methods: {
    handleClose: function handleClose(file) {
      this.$emit('remove', file);
    },
    handlePreview: function handlePreview(file, e) {
      var _getListeners = Object(props_util["j" /* getListeners */])(this),
          preview = _getListeners.preview;

      if (!preview) {
        return;
      }
      e.preventDefault();
      return this.$emit('preview', file);
    }
  },
  render: function render() {
    var _this2 = this,
        _classNames2;

    var h = arguments[0];

    var _getOptionProps = Object(props_util["k" /* getOptionProps */])(this),
        customizePrefixCls = _getOptionProps.prefixCls,
        _getOptionProps$items = _getOptionProps.items,
        items = _getOptionProps$items === undefined ? [] : _getOptionProps$items,
        listType = _getOptionProps.listType,
        showPreviewIcon = _getOptionProps.showPreviewIcon,
        showRemoveIcon = _getOptionProps.showRemoveIcon,
        locale = _getOptionProps.locale;

    var getPrefixCls = this.configProvider.getPrefixCls;
    var prefixCls = getPrefixCls('upload', customizePrefixCls);

    var list = items.map(function (file) {
      var _classNames;

      var progress = void 0;
      var icon = h(es_icon["a" /* default */], {
        attrs: { type: file.status === 'uploading' ? 'loading' : 'paper-clip' }
      });

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = h(
            'div',
            { 'class': prefixCls + '-list-item-uploading-text' },
            [locale.uploading]
          );
        } else if (!file.thumbUrl && !file.url) {
          icon = h(es_icon["a" /* default */], { 'class': prefixCls + '-list-item-thumbnail', attrs: { type: 'picture', theme: 'twoTone' }
          });
        } else {
          var thumbnail = isImageUrl(file) ? h('img', {
            attrs: { src: file.thumbUrl || file.url, alt: file.name }
          }) : h(es_icon["a" /* default */], {
            attrs: { type: 'file', theme: 'twoTone' },
            'class': prefixCls + '-list-item-icon' });
          icon = h(
            'a',
            {
              'class': prefixCls + '-list-item-thumbnail',
              on: {
                'click': function click(e) {
                  return _this2.handlePreview(file, e);
                }
              },
              attrs: {
                href: file.url || file.thumbUrl,
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            },
            [thumbnail]
          );
        }
      }

      if (file.status === 'uploading') {
        var progressProps = {
          props: extends_default()({}, _this2.progressAttr, {
            type: 'line',
            percent: file.percent
          })
        };
        // show loading icon if upload progress listener is disabled
        var loadingProgress = 'percent' in file ? h(es_progress["a" /* default */], progressProps) : null;

        progress = h(
          'div',
          { 'class': prefixCls + '-list-item-progress', key: 'progress' },
          [loadingProgress]
        );
      }
      var infoUploadingClass = classnames_default()((_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-list-item', true), defineProperty_default()(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
      var linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      var preview = file.url ? h(
        'a',
        babel_helper_vue_jsx_merge_props_default()([{
          attrs: {
            target: '_blank',
            rel: 'noopener noreferrer',

            title: file.name
          },
          'class': prefixCls + '-list-item-name' }, linkProps, {
          attrs: {
            href: file.url
          },
          on: {
            'click': function click(e) {
              return _this2.handlePreview(file, e);
            }
          }
        }]),
        [file.name]
      ) : h(
        'span',
        {
          'class': prefixCls + '-list-item-name',
          on: {
            'click': function click(e) {
              return _this2.handlePreview(file, e);
            }
          },
          attrs: {
            title: file.name
          }
        },
        [file.name]
      );
      var style = file.url || file.thumbUrl ? undefined : {
        pointerEvents: 'none',
        opacity: 0.5
      };
      var previewIcon = showPreviewIcon ? h(
        'a',
        {
          attrs: {
            href: file.url || file.thumbUrl,
            target: '_blank',
            rel: 'noopener noreferrer',

            title: locale.previewFile
          },
          style: style,
          on: {
            'click': function click(e) {
              return _this2.handlePreview(file, e);
            }
          }
        },
        [h(es_icon["a" /* default */], {
          attrs: { type: 'eye-o' }
        })]
      ) : null;
      var iconProps = {
        props: {
          type: 'delete',
          title: locale.removeFile
        },
        on: {
          click: function click() {
            _this2.handleClose(file);
          }
        }
      };
      var iconProps1 = extends_default()({}, iconProps, { props: { type: 'close' } });
      var removeIcon = showRemoveIcon ? h(es_icon["a" /* default */], iconProps) : null;
      var removeIconClose = showRemoveIcon ? h(es_icon["a" /* default */], iconProps1) : null;
      var actions = listType === 'picture-card' && file.status !== 'uploading' ? h(
        'span',
        { 'class': prefixCls + '-list-item-actions' },
        [previewIcon, removeIcon]
      ) : removeIconClose;
      var message = void 0;
      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = file.error && file.error.statusText || locale.uploadError;
      }
      var iconAndPreview = file.status === 'error' ? h(
        tooltip["a" /* default */],
        {
          attrs: { title: message }
        },
        [icon, preview]
      ) : h('span', [icon, preview]);
      var transitionProps = Object(getTransitionProps["a" /* default */])('fade');
      return h(
        'div',
        { 'class': infoUploadingClass, key: file.uid },
        [h(
          'div',
          { 'class': prefixCls + '-list-item-info' },
          [iconAndPreview]
        ), actions, h(
          'transition',
          transitionProps,
          [progress]
        )]
      );
    });
    var listClassNames = classnames_default()((_classNames2 = {}, defineProperty_default()(_classNames2, prefixCls + '-list', true), defineProperty_default()(_classNames2, prefixCls + '-list-' + listType, true), _classNames2));
    var animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
    var transitionGroupProps = Object(getTransitionProps["a" /* default */])(prefixCls + '-' + animationDirection);
    return h(
      'transition-group',
      babel_helper_vue_jsx_merge_props_default()([transitionGroupProps, {
        attrs: { tag: 'div' },
        'class': listClassNames }]),
      [list]
    );
  }
});
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/utils.js

function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return extends_default()({}, file, {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  var k = 0.1;
  var i = 0.01;
  var end = 0.98;
  return function (s) {
    var start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start;
  };
}

function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}
// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/Upload.js



















/* harmony default export */ var Upload = ({
  name: 'AUpload',
  mixins: [BaseMixin["a" /* default */]],
  inheritAttrs: false,
  Dragger: Dragger,
  props: Object(props_util["s" /* initDefaultProps */])(UploadProps, {
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    disabled: false,
    supportServerRender: true
  }),
  inject: {
    configProvider: { 'default': function _default() {
        return config_provider["a" /* ConfigConsumerProps */];
      } }
  },
  // recentUploadStatus: boolean | PromiseLike<any>;
  data: function data() {
    this.progressTimer = null;
    return {
      sFileList: this.fileList || this.defaultFileList || [],
      dragState: 'drop'
    };
  },

  watch: {
    fileList: function fileList(val) {
      this.sFileList = val || [];
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clearProgressTimer();
  },

  methods: {
    onStart: function onStart(file) {
      var targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      var nextFileList = this.sFileList.concat();
      var fileIndex = findIndex_default()(nextFileList, function (_ref) {
        var uid = _ref.uid;
        return uid === targetItem.uid;
      });
      if (fileIndex === -1) {
        nextFileList.push(targetItem);
      } else {
        nextFileList[fileIndex] = targetItem;
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    },
    autoUpdateProgress: function autoUpdateProgress(_, file) {
      var _this = this;

      var getPercent = genPercentAdd();
      var curPercent = 0;
      this.clearProgressTimer();
      this.progressTimer = setInterval(function () {
        curPercent = getPercent(curPercent);
        _this.onProgress({
          percent: curPercent * 100
        }, file);
      }, 200);
    },
    onSuccess: function onSuccess(response, file) {
      this.clearProgressTimer();
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {
        /* do nothing */
      }
      var fileList = this.sFileList;
      var targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: extends_default()({}, targetItem),
        fileList: fileList
      });
    },
    onProgress: function onProgress(e, file) {
      var fileList = this.sFileList;
      var targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: extends_default()({}, targetItem),
        fileList: this.sFileList
      });
    },
    onError: function onError(error, response, file) {
      this.clearProgressTimer();
      var fileList = this.sFileList;
      var targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.onChange({
        file: extends_default()({}, targetItem),
        fileList: fileList
      });
    },
    onReject: function onReject(fileList) {
      this.$emit('reject', fileList);
    },
    handleRemove: function handleRemove(file) {
      var _this2 = this;

      var remove = this.remove;
      var status = file.status;

      file.status = 'removed'; // eslint-disable-line

      Promise.resolve(typeof remove === 'function' ? remove(file) : remove).then(function (ret) {
        // Prevent removing file
        if (ret === false) {
          file.status = status;
          return;
        }

        var removedFileList = removeFileItem(file, _this2.sFileList);
        if (removedFileList) {
          _this2.onChange({
            file: file,
            fileList: removedFileList
          });
        }
      });
    },
    handleManualRemove: function handleManualRemove(file) {
      if (this.$refs.uploadRef) {
        this.$refs.uploadRef.abort(file);
      }
      this.handleRemove(file);
    },
    onChange: function onChange(info) {
      if (!Object(props_util["r" /* hasProp */])(this, 'fileList')) {
        this.setState({ sFileList: info.fileList });
      }
      this.$emit('change', info);
    },
    onFileDrop: function onFileDrop(e) {
      this.setState({
        dragState: e.type
      });
    },
    reBeforeUpload: function reBeforeUpload(file, fileList) {
      if (!this.beforeUpload) {
        return true;
      }
      var result = this.beforeUpload(file, fileList);
      if (result === false) {
        this.onChange({
          file: file,
          fileList: uniqBy_default()(this.sFileList.concat(fileList.map(fileToObject)), function (item) {
            return item.uid;
          })
        });
        return false;
      }
      if (result && result.then) {
        return result;
      }
      return true;
    },
    clearProgressTimer: function clearProgressTimer() {
      clearInterval(this.progressTimer);
    },
    renderUploadList: function renderUploadList(locale) {
      var h = this.$createElement;

      var _getOptionProps = Object(props_util["k" /* getOptionProps */])(this),
          _getOptionProps$showU = _getOptionProps.showUploadList,
          showUploadList = _getOptionProps$showU === undefined ? {} : _getOptionProps$showU,
          listType = _getOptionProps.listType;

      var showRemoveIcon = showUploadList.showRemoveIcon,
          showPreviewIcon = showUploadList.showPreviewIcon;

      var uploadListProps = {
        props: {
          listType: listType,
          items: this.sFileList,
          showRemoveIcon: showRemoveIcon,
          showPreviewIcon: showPreviewIcon,
          locale: extends_default()({}, locale, this.$props.locale)
        },
        on: {
          remove: this.handleManualRemove
        }
      };
      var listeners = Object(props_util["j" /* getListeners */])(this);
      if (listeners.preview) {
        uploadListProps.on.preview = listeners.preview;
      }
      return h(UploadList, uploadListProps);
    }
  },
  render: function render() {
    var _classNames2;

    var h = arguments[0];

    var _getOptionProps2 = Object(props_util["k" /* getOptionProps */])(this),
        customizePrefixCls = _getOptionProps2.prefixCls,
        showUploadList = _getOptionProps2.showUploadList,
        listType = _getOptionProps2.listType,
        type = _getOptionProps2.type,
        disabled = _getOptionProps2.disabled;

    var getPrefixCls = this.configProvider.getPrefixCls;
    var prefixCls = getPrefixCls('upload', customizePrefixCls);

    var vcUploadProps = {
      props: extends_default()({}, this.$props, {
        prefixCls: prefixCls,
        beforeUpload: this.reBeforeUpload
      }),
      on: {
        start: this.onStart,
        error: this.onError,
        progress: this.onProgress,
        success: this.onSuccess,
        reject: this.onReject
      },
      ref: 'uploadRef',
      attrs: this.$attrs
    };

    var uploadList = showUploadList ? h(LocaleReceiver["a" /* default */], {
      attrs: {
        componentName: 'Upload',
        defaultLocale: locale_provider_default["a" /* default */].Upload
      },
      scopedSlots: { 'default': this.renderUploadList }
    }) : null;

    var children = this.$slots['default'];

    if (type === 'drag') {
      var _classNames;

      var dragCls = classnames_default()(prefixCls, (_classNames = {}, defineProperty_default()(_classNames, prefixCls + '-drag', true), defineProperty_default()(_classNames, prefixCls + '-drag-uploading', this.sFileList.some(function (file) {
        return file.status === 'uploading';
      })), defineProperty_default()(_classNames, prefixCls + '-drag-hover', this.dragState === 'dragover'), defineProperty_default()(_classNames, prefixCls + '-disabled', disabled), _classNames));
      return h('span', [h(
        'div',
        {
          'class': dragCls,
          on: {
            'drop': this.onFileDrop,
            'dragover': this.onFileDrop,
            'dragleave': this.onFileDrop
          }
        },
        [h(
          vc_upload["a" /* default */],
          babel_helper_vue_jsx_merge_props_default()([vcUploadProps, { 'class': prefixCls + '-btn' }]),
          [h(
            'div',
            { 'class': prefixCls + '-drag-container' },
            [children]
          )]
        )]
      ), uploadList]);
    }

    var uploadButtonCls = classnames_default()(prefixCls, (_classNames2 = {}, defineProperty_default()(_classNames2, prefixCls + '-select', true), defineProperty_default()(_classNames2, prefixCls + '-select-' + listType, true), defineProperty_default()(_classNames2, prefixCls + '-disabled', disabled), _classNames2));

    // Remove id to avoid open by label when trigger is hidden
    // https://github.com/ant-design/ant-design/issues/14298
    if (!children) {
      delete vcUploadProps.props.id;
    }

    var uploadButton = h(
      'div',
      { 'class': uploadButtonCls, style: children ? undefined : { display: 'none' } },
      [h(
        vc_upload["a" /* default */],
        vcUploadProps,
        [children]
      )]
    );

    if (listType === 'picture-card') {
      return h('span', [uploadList, uploadButton]);
    }
    return h('span', [uploadButton, uploadList]);
  }
});
// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/base/index.js + 1 modules
var base = __webpack_require__("db14");

// CONCATENATED MODULE: ./node_modules/ant-design-vue/es/upload/index.js






Upload.Dragger = Dragger;

/* istanbul ignore next */
Upload.install = function (Vue) {
  Vue.use(base["a" /* default */]);
  Vue.component(Upload.name, Upload);
  Vue.component(Dragger.name, Dragger);
};

/* harmony default export */ var upload = __webpack_exports__["a"] = (Upload);

/***/ })

}]);