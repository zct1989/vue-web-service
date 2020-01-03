(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~89a6fdd3"],{

/***/ "0a4f":
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__("3eba");
var layoutUtil = __webpack_require__("f934");

__webpack_require__("365b");
__webpack_require__("c03d");

var wordCloudLayoutHelper = __webpack_require__("793f");

if (!wordCloudLayoutHelper.isSupported) {
    throw new Error('Sorry your browser not support wordCloud');
}

// https://github.com/timdream/wordcloud2.js/blob/c236bee60436e048949f9becc4f0f67bd832dc5c/index.js#L233
function updateCanvasMask(maskCanvas) {
    var ctx = maskCanvas.getContext('2d');
    var imageData = ctx.getImageData(
        0, 0, maskCanvas.width, maskCanvas.height);
    var newImageData = ctx.createImageData(imageData);

    var toneSum = 0;
    var toneCnt = 0;
    for (var i = 0; i < imageData.data.length; i += 4) {
        var alpha = imageData.data[i + 3];
        if (alpha > 128) {
            var tone = imageData.data[i]
                + imageData.data[i + 1]
                + imageData.data[i + 2];
            toneSum += tone;
            ++toneCnt;
        }
    }
    var threshold = toneSum / toneCnt;

    for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i]
            + imageData.data[i + 1]
            + imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        if (alpha < 128 || tone > threshold) {
            // Area not to draw
            newImageData.data[i] = 0;
            newImageData.data[i + 1] = 0;
            newImageData.data[i + 2] = 0;
            newImageData.data[i + 3] = 0;
        }
        else {
            // Area to draw
            // The color must be same with backgroundColor
            newImageData.data[i] = 255;
            newImageData.data[i + 1] = 255;
            newImageData.data[i + 2] = 255;
            newImageData.data[i + 3] = 255;
        }
    }

    ctx.putImageData(newImageData, 0, 0);
}

echarts.registerLayout(function (ecModel, api) {
    ecModel.eachSeriesByType('wordCloud', function (seriesModel) {
        var gridRect = layoutUtil.getLayoutRect(
            seriesModel.getBoxLayoutParams(), {
                width: api.getWidth(),
                height: api.getHeight()
            }
        );
        var data = seriesModel.getData();

        var canvas = document.createElement('canvas');
        canvas.width = gridRect.width;
        canvas.height = gridRect.height;

        var ctx = canvas.getContext('2d');
        var maskImage = seriesModel.get('maskImage');
        if (maskImage) {
            try {
                ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
                updateCanvasMask(canvas);
            }
            catch (e) {
                console.error('Invalid mask image');
                console.error(e.toString());
            }
        }

        var sizeRange = seriesModel.get('sizeRange');
        var rotationRange = seriesModel.get('rotationRange');
        var valueExtent = data.getDataExtent('value');

        var DEGREE_TO_RAD = Math.PI / 180;
        var gridSize = seriesModel.get('gridSize');
        wordCloudLayoutHelper(canvas, {
            list: data.mapArray('value', function (value, idx) {
                var itemModel = data.getItemModel(idx);
                return [
                    data.getName(idx),
                    itemModel.get('textStyle.normal.textSize', true)
                        || echarts.number.linearMap(value, valueExtent, sizeRange),
                    idx
                ];
            }).sort(function (a, b) {
                // Sort from large to small in case there is no more room for more words
                return b[1] - a[1];
            }),
            fontFamily: seriesModel.get('textStyle.normal.fontFamily')
                || seriesModel.get('textStyle.emphasis.fontFamily')
                || ecModel.get('textStyle.fontFamily'),
            fontWeight: seriesModel.get('textStyle.normal.fontWeight')
                || seriesModel.get('textStyle.emphasis.fontWeight')
                || ecModel.get('textStyle.fontWeight'),
            gridSize: gridSize,

            ellipticity: gridRect.height / gridRect.width,

            minRotation: rotationRange[0] * DEGREE_TO_RAD,
            maxRotation: rotationRange[1] * DEGREE_TO_RAD,

            clearCanvas: !maskImage,

            rotateRatio: 1,

            rotationStep: seriesModel.get('rotationStep') * DEGREE_TO_RAD,

            drawOutOfBound: seriesModel.get('drawOutOfBound'),

            shuffle: false,

            shape: seriesModel.get('shape')
        });

        function onWordCloudDrawn(e) {
            var item = e.detail.item;
            if (e.detail.drawn && seriesModel.layoutInstance.ondraw) {
                e.detail.drawn.gx += gridRect.x / gridSize;
                e.detail.drawn.gy += gridRect.y / gridSize;
                seriesModel.layoutInstance.ondraw(
                    item[0], item[1], item[2], e.detail.drawn
                );
            }
        }

        canvas.addEventListener('wordclouddrawn', onWordCloudDrawn);

        if (seriesModel.layoutInstance) {
            // Dispose previous
            seriesModel.layoutInstance.dispose();
        }

        seriesModel.layoutInstance = {
            ondraw: null,

            dispose: function () {
                canvas.removeEventListener('wordclouddrawn', onWordCloudDrawn);
                // Abort
                canvas.addEventListener('wordclouddrawn', function (e) {
                    // Prevent default to cancle the event and stop the loop
                    e.preventDefault();
                });
            }
        };
    });
});

echarts.registerPreprocessor(function (option) {
    var series = (option || {}).series;
    !echarts.util.isArray(series) && (series = series ? [series] : []);

    var compats = ['shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY'];

    echarts.util.each(series, function (seriesItem) {
        if (seriesItem && seriesItem.type === 'wordCloud') {
            var textStyle = seriesItem.textStyle || {};

            compatTextStyle(textStyle.normal);
            compatTextStyle(textStyle.emphasis);
        }
    });

    function compatTextStyle(textStyle) {
        textStyle && echarts.util.each(compats, function (key) {
            if (textStyle.hasOwnProperty(key)) {
                textStyle['text' + echarts.format.capitalFirst(key)] = textStyle[key];
            }
        });
    }
});


/***/ }),

/***/ "10d5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("250d")


/***/ }),

/***/ "2114":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__("313e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = echarts.extendComponentView({
  type: 'bmap',
  render: function (bMapModel, ecModel, api) {
    var rendering = true;
    var bmap = bMapModel.getBMap();
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var coordSys = bMapModel.coordinateSystem;

    var moveHandler = function (type, target) {
      if (rendering) {
        return;
      }

      var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
      var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0];
      viewportRoot.style.left = mapOffset[0] + 'px';
      viewportRoot.style.top = mapOffset[1] + 'px';
      coordSys.setMapOffset(mapOffset);
      bMapModel.__mapOffset = mapOffset;
      api.dispatchAction({
        type: 'bmapRoam'
      });
    };

    function zoomEndHandler() {
      if (rendering) {
        return;
      }

      api.dispatchAction({
        type: 'bmapRoam'
      });
    }

    bmap.removeEventListener('moving', this._oldMoveHandler); // FIXME
    // Moveend may be triggered by centerAndZoom method when creating coordSys next time
    // bmap.removeEventListener('moveend', this._oldMoveHandler);

    bmap.removeEventListener('zoomend', this._oldZoomEndHandler);
    bmap.addEventListener('moving', moveHandler); // bmap.addEventListener('moveend', moveHandler);

    bmap.addEventListener('zoomend', zoomEndHandler);
    this._oldMoveHandler = moveHandler;
    this._oldZoomEndHandler = zoomEndHandler;
    var roam = bMapModel.get('roam');

    if (roam && roam !== 'scale') {
      bmap.enableDragging();
    } else {
      bmap.disableDragging();
    }

    if (roam && roam !== 'move') {
      bmap.enableScrollWheelZoom();
      bmap.enableDoubleClickZoom();
      bmap.enablePinchToZoom();
    } else {
      bmap.disableScrollWheelZoom();
      bmap.disableDoubleClickZoom();
      bmap.disablePinchToZoom();
    }
    /* map 2.0 */


    var originalStyle = bMapModel.__mapStyle;
    var newMapStyle = bMapModel.get('mapStyle') || {}; // FIXME, Not use JSON methods

    var mapStyleStr = JSON.stringify(newMapStyle);

    if (JSON.stringify(originalStyle) !== mapStyleStr) {
      // FIXME May have blank tile when dragging if setMapStyle
      if (Object.keys(newMapStyle).length) {
        bmap.setMapStyle(newMapStyle);
      }

      bMapModel.__mapStyle = JSON.parse(mapStyleStr);
    }
    /* map 3.0 */


    var originalStyle2 = bMapModel.__mapStyle2;
    var newMapStyle2 = bMapModel.get('mapStyleV2') || {}; // FIXME, Not use JSON methods

    var mapStyleStr2 = JSON.stringify(newMapStyle2);

    if (JSON.stringify(originalStyle2) !== mapStyleStr2) {
      // FIXME May have blank tile when dragging if setMapStyle
      if (Object.keys(newMapStyle2).length) {
        bmap.setMapStyleV2(newMapStyle2);
      }

      bMapModel.__mapStyle2 = JSON.parse(mapStyleStr2);
    }

    rendering = false;
  }
});

module.exports = _default;

/***/ }),

/***/ "250d":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__("313e")):undefined}(this,function(t){return function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(e,o){e.exports=t},function(t,e,o){function n(t,e){this._amap=t,this.dimensions=["lng","lat"],this._mapOffset=[0,0],this._api=e}var a=o(0);n.prototype.dimensions=["lng","lat"],n.prototype.setZoom=function(t){this._zoom=t},n.prototype.setCenter=function(t){this._center=this._amap.lnglatToPixel(t)},n.prototype.setMapOffset=function(t){this._mapOffset=t},n.prototype.getAMap=function(){return this._amap},n.prototype.dataToPoint=function(t){var e=new AMap.LngLat(t[0],t[1]),o=this._amap.lngLatToContainer(e),n=this._mapOffset;return[o.x-n[0],o.y-n[1]]},n.prototype.pointToData=function(t){var e=this._mapOffset,t=this._amap.containerToLngLat({x:t[0]+e[0],y:t[1]+e[1]});return[t.lng,t.lat]},n.prototype.getViewRect=function(){var t=this._api;return new a.graphic.BoundingRect(0,0,t.getWidth(),t.getHeight())},n.prototype.getRoamTransform=function(){return a.matrix.create()};n.dimensions=n.prototype.dimensions,n.create=function(t,e){var o,r=e.getDom();t.eachComponent("amap",function(t){var i=e.getZr().painter.getViewportRoot();if("undefined"==typeof AMap)throw new Error("AMap api is not loaded");if(o)throw new Error("Only one amap component can exist");if(!t.__amap){var p=r.querySelector(".ec-extension-amap");p&&(i.style.left="0px",i.style.top="0px",r.removeChild(p)),p=document.createElement("div"),p.style.cssText="width:100%;height:100%",p.classList.add("ec-extension-amap"),r.appendChild(p);var s=t.get()||{};s=t.__options=a.util.clone(s);var c=t.__amap=new AMap.Map(p,s),f=t.__layer=new AMap.CustomLayer(i);f.setMap(c)}var c=t.getAMap(),f=t.getLayer();f.hide();var m=c.getZoom(),u=c.getCenter();o=new n(c,e),o.setMapOffset(t.__mapOffset||[0,0]),o.setZoom(m),o.setCenter([u.lng,u.lat]),t.coordinateSystem=o,f.show()}),t.eachSeries(function(t){"amap"===t.get("coordinateSystem")&&(t.coordinateSystem=o)})},t.exports=n},function(t,e,o){function n(t,e){return t&&e&&t[0]===e[0]&&t[1]===e[1]}t.exports=o(0).extendComponentModel({type:"amap",getAMap:function(){return this.__amap},getLayer:function(){return this.__layer},getMapOptions:function(){return this.__options},setCenterAndZoom:function(t,e){this.option.center=t,this.option.zoom=e},centerOrZoomChanged:function(t,e){var o=this.option;return!(n(t,o.center)&&e===o.zoom)},defaultOption:{center:[116.397475,39.908695],zoom:4}})},function(t,e,o){function n(t,e,o){var n,a,r,i;return i=function(){n=!1,a&&(r.apply(o,a),a=!1)},r=function(){n?a=arguments:(t.apply(o,arguments),setTimeout(i,e),n=!0)}}var a=o(0);t.exports=o(0).extendComponentView({type:"amap",render:function(t,e,o){function r(){p||o.dispatchAction({type:"amapRoam"})}function i(t){a.getInstanceByDom(o.getDom()).resize(),m.call(this,t)}var p=!0,s=t.getAMap(),c=o.getZr().painter.getViewportRoot(),f=t.coordinateSystem,m=function(e){if(!p){var n=c.parentNode.parentNode.parentNode,a=[-parseInt(n.style.left,10)||0,-parseInt(n.style.top,10)||0];c.style.left=a[0]+"px",c.style.top=a[1]+"px",f.setMapOffset(a),t.__mapOffset=a,o.dispatchAction({type:"amapRoam"})}},u=n(i,300,s);s.off("movestart",this._oldMoveHandler),s.off("zoomend",this._oldZoomEndHandler),s.off("moveend",this._oldZoomEndHandler),s.off("complete",this._oldZoomEndHandler),t.get("resizeEnable")&&s.off("resize",this._oldResizeHandler),s.on("movestart",m),s.on("zoomend",r),s.on("moveend",r),s.on("complete",r),t.get("resizeEnable")&&s.on("resize",u),this._oldMoveHandler=m,this._oldZoomEndHandler=r,this._oldResizeHandler=u,p=!1}})},function(t,e,o){o(0).registerCoordinateSystem("amap",o(1)),o(2),o(3),o(0).registerAction({type:"amapRoam",event:"amapRoam",update:"updateLayout"},function(t,e){e.eachComponent("amap",function(t){var e=t.getAMap(),o=e.getCenter();t.setCenterAndZoom([o.lng,o.lat],e.getZoom())})}),t.exports={version:"1.0.0-rc.6"}}])});
//# sourceMappingURL=echarts-amap.min.js.map

/***/ }),

/***/ "313e":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _echarts = __webpack_require__("3eba");

(function () {
  for (var key in _echarts) {
    if (_echarts == null || !_echarts.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _echarts[key];
  }
})();

var _export = __webpack_require__("b719");

(function () {
  for (var key in _export) {
    if (_export == null || !_export.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
    exports[key] = _export[key];
  }
})();

__webpack_require__("0352");

__webpack_require__("ef97");

__webpack_require__("94b1");

__webpack_require__("c037");

__webpack_require__("15af");

__webpack_require__("8deb");

__webpack_require__("675c");

__webpack_require__("ef97a");

__webpack_require__("dae1");

__webpack_require__("23ee");

__webpack_require__("07e6");

__webpack_require__("a4b1");

__webpack_require__("0817");

__webpack_require__("311a");

__webpack_require__("fa52");

__webpack_require__("085d");

__webpack_require__("1111");

__webpack_require__("a7e2");

__webpack_require__("5ce2");

__webpack_require__("aadf");

__webpack_require__("6c12f");

__webpack_require__("d7169");

__webpack_require__("e057");

__webpack_require__("cd12");

__webpack_require__("2f73");

__webpack_require__("d070");

__webpack_require__("2cfc");

__webpack_require__("f306");

__webpack_require__("9390");

__webpack_require__("7f59");

__webpack_require__("b11c");

__webpack_require__("007d");

__webpack_require__("cb8f");

__webpack_require__("2f31");

__webpack_require__("627c");

__webpack_require__("ee95");

__webpack_require__("db0e");

__webpack_require__("95a8");

__webpack_require__("7e32");

__webpack_require__("0b4b");

__webpack_require__("d28f");

__webpack_require__("0a6d");

__webpack_require__("7f72");

__webpack_require__("e4d1");

__webpack_require__("5450");

__webpack_require__("7419");

__webpack_require__("29a9");

__webpack_require__("f170");

__webpack_require__("8ee0");

/***/ }),

/***/ "32f8":
/***/ (function(module, exports, __webpack_require__) {

var completeDimensions = __webpack_require__("862d");
var echarts = __webpack_require__("3eba");

echarts.extendSeriesModel({

    type: 'series.liquidFill',

    visualColorAccessPath: 'textStyle.normal.color',

    optionUpdated: function () {
        var option = this.option;
        option.gridSize = Math.max(Math.floor(option.gridSize), 4);
    },

    getInitialData: function (option, ecModel) {
        var dimensions = completeDimensions(['value'], option.data);
        var list = new echarts.List(dimensions, this);
        list.initData(option.data);
        return list;
    },

    defaultOption: {
        color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
        center: ['50%', '50%'],
        radius: '50%',
        amplitude: '8%',
        waveLength: '80%',
        phase: 'auto',
        period: 'auto',
        direction: 'right',
        shape: 'circle',

        waveAnimation: true,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        animationDuration: 2000,
        animationDurationUpdate: 1000,

        outline: {
            show: true,
            borderDistance: 8,
            itemStyle: {
                color: 'none',
                borderColor: '#294D99',
                borderWidth: 8,
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.25)'
            }
        },

        backgroundStyle: {
            color: '#E3F7FF'
        },

        itemStyle: {
            opacity: 0.95,
            shadowBlur: 50,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
        },

        label: {
            show: true,
            color: '#294D99',
            insideColor: '#fff',
            fontSize: 50,
            fontWeight: 'bold',

            align: 'center',
            baseline: 'middle',
            position: 'inside'
        },

        emphasis: {
            itemStyle: {
                opacity: 0.8
            }
        }
    }
});


/***/ }),

/***/ "365b":
/***/ (function(module, exports, __webpack_require__) {

var completeDimensions = __webpack_require__("862d");
var echarts = __webpack_require__("3eba");

echarts.extendSeriesModel({

    type: 'series.wordCloud',

    visualColorAccessPath: 'textStyle.normal.color',

    optionUpdated: function () {
        var option = this.option;
        option.gridSize = Math.max(Math.floor(option.gridSize), 4);
    },

    getInitialData: function (option, ecModel) {
        var dimensions = completeDimensions(['value'], option.data);
        var list = new echarts.List(dimensions, this);
        list.initData(option.data);
        return list;
    },

    // Most of options are from https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md
    defaultOption: {

        maskImage: null,

        // Shape can be 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        shape: 'circle',

        left: 'center',

        top: 'center',

        width: '70%',

        height: '80%',

        sizeRange: [12, 60],

        rotationRange: [-90, 90],

        rotationStep: 45,

        gridSize: 8,

        drawOutOfBound: false,

        textStyle: {
            normal: {
                fontWeight: 'normal'
            }
        }
    }
});


/***/ }),

/***/ "4ae9":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _echarts = __webpack_require__("313e");

var zrUtil = _echarts.util;
var graphic = _echarts.graphic;
var matrix = _echarts.matrix;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/* global BMap */
function BMapCoordSys(bmap, api) {
  this._bmap = bmap;
  this.dimensions = ['lng', 'lat'];
  this._mapOffset = [0, 0];
  this._api = api;
  this._projection = new BMap.MercatorProjection();
}

BMapCoordSys.prototype.dimensions = ['lng', 'lat'];

BMapCoordSys.prototype.setZoom = function (zoom) {
  this._zoom = zoom;
};

BMapCoordSys.prototype.setCenter = function (center) {
  this._center = this._projection.lngLatToPoint(new BMap.Point(center[0], center[1]));
};

BMapCoordSys.prototype.setMapOffset = function (mapOffset) {
  this._mapOffset = mapOffset;
};

BMapCoordSys.prototype.getBMap = function () {
  return this._bmap;
};

BMapCoordSys.prototype.dataToPoint = function (data) {
  var point = new BMap.Point(data[0], data[1]); // TODO mercator projection is toooooooo slow
  // var mercatorPoint = this._projection.lngLatToPoint(point);
  // var width = this._api.getZr().getWidth();
  // var height = this._api.getZr().getHeight();
  // var divider = Math.pow(2, 18 - 10);
  // return [
  //     Math.round((mercatorPoint.x - this._center.x) / divider + width / 2),
  //     Math.round((this._center.y - mercatorPoint.y) / divider + height / 2)
  // ];

  var px = this._bmap.pointToOverlayPixel(point);

  var mapOffset = this._mapOffset;
  return [px.x - mapOffset[0], px.y - mapOffset[1]];
};

BMapCoordSys.prototype.pointToData = function (pt) {
  var mapOffset = this._mapOffset;

  var pt = this._bmap.overlayPixelToPoint({
    x: pt[0] + mapOffset[0],
    y: pt[1] + mapOffset[1]
  });

  return [pt.lng, pt.lat];
};

BMapCoordSys.prototype.getViewRect = function () {
  var api = this._api;
  return new graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
};

BMapCoordSys.prototype.getRoamTransform = function () {
  return matrix.create();
};

BMapCoordSys.prototype.prepareCustoms = function (data) {
  var rect = this.getViewRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: 'bmap',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: zrUtil.bind(this.dataToPoint, this),
      size: zrUtil.bind(dataToCoordSize, this)
    }
  };
};

function dataToCoordSize(dataSize, dataItem) {
  dataItem = dataItem || [0, 0];
  return zrUtil.map([0, 1], function (dimIdx) {
    var val = dataItem[dimIdx];
    var halfSize = dataSize[dimIdx] / 2;
    var p1 = [];
    var p2 = [];
    p1[dimIdx] = val - halfSize;
    p2[dimIdx] = val + halfSize;
    p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
    return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
  }, this);
}

var Overlay; // For deciding which dimensions to use when creating list data

BMapCoordSys.dimensions = BMapCoordSys.prototype.dimensions;

function createOverlayCtor() {
  function Overlay(root) {
    this._root = root;
  }

  Overlay.prototype = new BMap.Overlay();
  /**
   * 初始化
   *
   * @param {BMap.Map} map
   * @override
   */

  Overlay.prototype.initialize = function (map) {
    map.getPanes().labelPane.appendChild(this._root);
    return this._root;
  };
  /**
   * @override
   */


  Overlay.prototype.draw = function () {};

  return Overlay;
}

BMapCoordSys.create = function (ecModel, api) {
  var bmapCoordSys;
  var root = api.getDom(); // TODO Dispose

  ecModel.eachComponent('bmap', function (bmapModel) {
    var painter = api.getZr().painter;
    var viewportRoot = painter.getViewportRoot();

    if (typeof BMap === 'undefined') {
      throw new Error('BMap api is not loaded');
    }

    Overlay = Overlay || createOverlayCtor();

    if (bmapCoordSys) {
      throw new Error('Only one bmap component can exist');
    }

    if (!bmapModel.__bmap) {
      // Not support IE8
      var bmapRoot = root.querySelector('.ec-extension-bmap');

      if (bmapRoot) {
        // Reset viewport left and top, which will be changed
        // in moving handler in BMapView
        viewportRoot.style.left = '0px';
        viewportRoot.style.top = '0px';
        root.removeChild(bmapRoot);
      }

      bmapRoot = document.createElement('div');
      bmapRoot.style.cssText = 'width:100%;height:100%'; // Not support IE8

      bmapRoot.classList.add('ec-extension-bmap');
      root.appendChild(bmapRoot);
      var bmap = bmapModel.__bmap = new BMap.Map(bmapRoot);
      var overlay = new Overlay(viewportRoot);
      bmap.addOverlay(overlay); // Override

      painter.getViewportRootOffset = function () {
        return {
          offsetLeft: 0,
          offsetTop: 0
        };
      };
    }

    var bmap = bmapModel.__bmap; // Set bmap options
    // centerAndZoom before layout and render

    var center = bmapModel.get('center');
    var zoom = bmapModel.get('zoom');

    if (center && zoom) {
      var pt = new BMap.Point(center[0], center[1]);
      bmap.centerAndZoom(pt, zoom);
    }

    bmapCoordSys = new BMapCoordSys(bmap, api);
    bmapCoordSys.setMapOffset(bmapModel.__mapOffset || [0, 0]);
    bmapCoordSys.setZoom(zoom);
    bmapCoordSys.setCenter(center);
    bmapModel.coordinateSystem = bmapCoordSys;
  });
  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'bmap') {
      seriesModel.coordinateSystem = bmapCoordSys;
    }
  });
};

var _default = BMapCoordSys;
module.exports = _default;

/***/ }),

/***/ "5d99":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__("313e");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function v2Equal(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

var _default = echarts.extendComponentModel({
  type: 'bmap',
  getBMap: function () {
    // __bmap is injected when creating BMapCoordSys
    return this.__bmap;
  },
  setCenterAndZoom: function (center, zoom) {
    this.option.center = center;
    this.option.zoom = zoom;
  },
  centerOrZoomChanged: function (center, zoom) {
    var option = this.option;
    return !(v2Equal(center, option.center) && zoom === option.zoom);
  },
  defaultOption: {
    center: [104.114129, 37.550339],
    zoom: 5,
    mapStyle: {},
    mapStyleV2: {},
    roam: false
  }
});

module.exports = _default;

/***/ }),

/***/ "793f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2013 Tim Chien
 * Released under the MIT license
 */



// setImmediate
if (!window.setImmediate) {
  window.setImmediate = (function setupSetImmediate() {
    return window.msSetImmediate ||
    window.webkitSetImmediate ||
    window.mozSetImmediate ||
    window.oSetImmediate ||
    (function setupSetZeroTimeout() {
      if (!window.postMessage || !window.addEventListener) {
        return null;
      }

      var callbacks = [undefined];
      var message = 'zero-timeout-message';

      // Like setTimeout, but only takes a function argument.  There's
      // no time argument (always zero) and no arguments (you have to
      // use a closure).
      var setZeroTimeout = function setZeroTimeout(callback) {
        var id = callbacks.length;
        callbacks.push(callback);
        window.postMessage(message + id.toString(36), '*');

        return id;
      };

      window.addEventListener('message', function setZeroTimeoutMessage(evt) {
        // Skipping checking event source, retarded IE confused this window
        // object with another in the presence of iframe
        if (typeof evt.data !== 'string' ||
            evt.data.substr(0, message.length) !== message/* ||
            evt.source !== window */) {
          return;
        }

        evt.stopImmediatePropagation();

        var id = parseInt(evt.data.substr(message.length), 36);
        if (!callbacks[id]) {
          return;
        }

        callbacks[id]();
        callbacks[id] = undefined;
      }, true);

      /* specify clearImmediate() here since we need the scope */
      window.clearImmediate = function clearZeroTimeout(id) {
        if (!callbacks[id]) {
          return;
        }

        callbacks[id] = undefined;
      };

      return setZeroTimeout;
    })() ||
    // fallback
    function setImmediateFallback(fn) {
      window.setTimeout(fn, 0);
    };
  })();
}

if (!window.clearImmediate) {
  window.clearImmediate = (function setupClearImmediate() {
    return window.msClearImmediate ||
    window.webkitClearImmediate ||
    window.mozClearImmediate ||
    window.oClearImmediate ||
    // "clearZeroTimeout" is implement on the previous block ||
    // fallback
    function clearImmediateFallback(timer) {
      window.clearTimeout(timer);
    };
  })();
}

(function(global) {

  // Check if WordCloud can run on this browser
  var isSupported = (function isSupported() {
    var canvas = document.createElement('canvas');
    if (!canvas || !canvas.getContext) {
      return false;
    }

    var ctx = canvas.getContext('2d');
    if (!ctx.getImageData) {
      return false;
    }
    if (!ctx.fillText) {
      return false;
    }

    if (!Array.prototype.some) {
      return false;
    }
    if (!Array.prototype.push) {
      return false;
    }

    return true;
  }());

  // Find out if the browser impose minium font size by
  // drawing small texts on a canvas and measure it's width.
  var minFontSize = (function getMinFontSize() {
    if (!isSupported) {
      return;
    }

    var ctx = document.createElement('canvas').getContext('2d');

    // start from 20
    var size = 20;

    // two sizes to measure
    var hanWidth, mWidth;

    while (size) {
      ctx.font = size.toString(10) + 'px sans-serif';
      if ((ctx.measureText('\uFF37').width === hanWidth) &&
          (ctx.measureText('m').width) === mWidth) {
        return (size + 1);
      }

      hanWidth = ctx.measureText('\uFF37').width;
      mWidth = ctx.measureText('m').width;

      size--;
    }

    return 0;
  })();

  // Based on http://jsfromhell.com/array/shuffle
  var shuffleArray = function shuffleArray(arr) {
    for (var j, x, i = arr.length; i;
      j = Math.floor(Math.random() * i),
      x = arr[--i], arr[i] = arr[j],
      arr[j] = x) {}
    return arr;
  };

  var WordCloud = function WordCloud(elements, options) {
    if (!isSupported) {
      return;
    }

    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    elements.forEach(function(el, i) {
      if (typeof el === 'string') {
        elements[i] = document.getElementById(el);
        if (!elements[i]) {
          throw 'The element id specified is not found.';
        }
      } else if (!el.tagName && !el.appendChild) {
        throw 'You must pass valid HTML elements, or ID of the element.';
      }
    });

    /* Default values to be overwritten by options object */
    var settings = {
      list: [],
      fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' +
                  '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
      fontWeight: 'normal',
      color: 'random-dark',
      minSize: 0, // 0 to disable
      weightFactor: 1,
      clearCanvas: true,
      backgroundColor: '#fff',  // opaque white = rgba(255, 255, 255, 1)

      gridSize: 8,
      drawOutOfBound: false,
      origin: null,

      drawMask: false,
      maskColor: 'rgba(255,0,0,0.3)',
      maskGapWidth: 0.3,

      wait: 0,
      abortThreshold: 0, // disabled
      abort: function noop() {},

      minRotation: - Math.PI / 2,
      maxRotation: Math.PI / 2,
      rotationStep: 0.1,

      shuffle: true,
      rotateRatio: 0.1,

      shape: 'circle',
      ellipticity: 0.65,

      classes: null,

      hover: null,
      click: null
    };

    if (options) {
      for (var key in options) {
        if (key in settings) {
          settings[key] = options[key];
        }
      }
    }

    /* Convert weightFactor into a function */
    if (typeof settings.weightFactor !== 'function') {
      var factor = settings.weightFactor;
      settings.weightFactor = function weightFactor(pt) {
        return pt * factor; //in px
      };
    }

    /* Convert shape into a function */
    if (typeof settings.shape !== 'function') {
      switch (settings.shape) {
        case 'circle':
        /* falls through */
        default:
          // 'circle' is the default and a shortcut in the code loop.
          settings.shape = 'circle';
          break;

        case 'cardioid':
          settings.shape = function shapeCardioid(theta) {
            return 1 - Math.sin(theta);
          };
          break;

        /*
        To work out an X-gon, one has to calculate "m",
        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
        where t' equals to mod(t, 2PI/X);
        */

        case 'diamond':
        case 'square':
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
          // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
          // +0+..+2*PI
          settings.shape = function shapeSquare(theta) {
            var thetaPrime = theta % (2 * Math.PI / 4);
            return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
          };
          break;

        case 'triangle-forward':
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
          // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
          // %29%29%2C+t+%3D+0+..+2*PI
          settings.shape = function shapeTriangle(theta) {
            var thetaPrime = theta % (2 * Math.PI / 3);
            return 1 / (Math.cos(thetaPrime) +
                        Math.sqrt(3) * Math.sin(thetaPrime));
          };
          break;

        case 'triangle':
        case 'triangle-upright':
          settings.shape = function shapeTriangle(theta) {
            var thetaPrime = (theta + Math.PI * 3 / 2) % (2 * Math.PI / 3);
            return 1 / (Math.cos(thetaPrime) +
                        Math.sqrt(3) * Math.sin(thetaPrime));
          };
          break;

        case 'pentagon':
          settings.shape = function shapePentagon(theta) {
            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 5);
            return 1 / (Math.cos(thetaPrime) +
                        0.726543 * Math.sin(thetaPrime));
          };
          break;

        case 'star':
          settings.shape = function shapeStar(theta) {
            var thetaPrime = (theta + 0.955) % (2 * Math.PI / 10);
            if ((theta + 0.955) % (2 * Math.PI / 5) - (2 * Math.PI / 10) >= 0) {
              return 1 / (Math.cos((2 * Math.PI / 10) - thetaPrime) +
                          3.07768 * Math.sin((2 * Math.PI / 10) - thetaPrime));
            } else {
              return 1 / (Math.cos(thetaPrime) +
                          3.07768 * Math.sin(thetaPrime));
            }
          };
          break;
      }
    }

    /* Make sure gridSize is a whole number and is not smaller than 4px */
    settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

    /* shorthand */
    var g = settings.gridSize;
    var maskRectWidth = g - settings.maskGapWidth;

    /* normalize rotation settings */
    var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
    var minRotation = Math.min(settings.maxRotation, settings.minRotation);
    var rotationStep = settings.rotationStep;

    /* information/object available to all functions, set when start() */
    var grid, // 2d array containing filling information
      ngx, ngy, // width and height of the grid
      center, // position of the center of the cloud
      maxRadius;

    /* timestamp for measuring each putWord() action */
    var escapeTime;

    /* function for getting the color of the text */
    var getTextColor;
    function random_hsl_color(min, max) {
      return 'hsl(' +
        (Math.random() * 360).toFixed() + ',' +
        (Math.random() * 30 + 70).toFixed() + '%,' +
        (Math.random() * (max - min) + min).toFixed() + '%)';
    }
    switch (settings.color) {
      case 'random-dark':
        getTextColor = function getRandomDarkColor() {
          return random_hsl_color(10, 50);
        };
        break;

      case 'random-light':
        getTextColor = function getRandomLightColor() {
          return random_hsl_color(50, 90);
        };
        break;

      default:
        if (typeof settings.color === 'function') {
          getTextColor = settings.color;
        }
        break;
    }

    /* function for getting the classes of the text */
    var getTextClasses = null;
    if (typeof settings.classes === 'function') {
      getTextClasses = settings.classes;
    }

    /* Interactive */
    var interactive = false;
    var infoGrid = [];
    var hovered;

    var getInfoGridFromMouseTouchEvent =
    function getInfoGridFromMouseTouchEvent(evt) {
      var canvas = evt.currentTarget;
      var rect = canvas.getBoundingClientRect();
      var clientX;
      var clientY;
      /** Detect if touches are available */
      if (evt.touches) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
      }
      var eventX = clientX - rect.left;
      var eventY = clientY - rect.top;

      var x = Math.floor(eventX * ((canvas.width / rect.width) || 1) / g);
      var y = Math.floor(eventY * ((canvas.height / rect.height) || 1) / g);

      return infoGrid[x][y];
    };

    var wordcloudhover = function wordcloudhover(evt) {
      var info = getInfoGridFromMouseTouchEvent(evt);

      if (hovered === info) {
        return;
      }

      hovered = info;
      if (!info) {
        settings.hover(undefined, undefined, evt);

        return;
      }

      settings.hover(info.item, info.dimension, evt);

    };

    var wordcloudclick = function wordcloudclick(evt) {
      var info = getInfoGridFromMouseTouchEvent(evt);
      if (!info) {
        return;
      }

      settings.click(info.item, info.dimension, evt);
      evt.preventDefault();
    };

    /* Get points on the grid for a given radius away from the center */
    var pointsAtRadius = [];
    var getPointsAtRadius = function getPointsAtRadius(radius) {
      if (pointsAtRadius[radius]) {
        return pointsAtRadius[radius];
      }

      // Look for these number of points on each radius
      var T = radius * 8;

      // Getting all the points at this radius
      var t = T;
      var points = [];

      if (radius === 0) {
        points.push([center[0], center[1], 0]);
      }

      while (t--) {
        // distort the radius to put the cloud in shape
        var rx = 1;
        if (settings.shape !== 'circle') {
          rx = settings.shape(t / T * 2 * Math.PI); // 0 to 1
        }

        // Push [x, y, t]; t is used solely for getTextColor()
        points.push([
          center[0] + radius * rx * Math.cos(-t / T * 2 * Math.PI),
          center[1] + radius * rx * Math.sin(-t / T * 2 * Math.PI) *
            settings.ellipticity,
          t / T * 2 * Math.PI]);
      }

      pointsAtRadius[radius] = points;
      return points;
    };

    /* Return true if we had spent too much time */
    var exceedTime = function exceedTime() {
      return ((settings.abortThreshold > 0) &&
        ((new Date()).getTime() - escapeTime > settings.abortThreshold));
    };

    /* Get the deg of rotation according to settings, and luck. */
    var getRotateDeg = function getRotateDeg() {
      if (settings.rotateRatio === 0) {
        return 0;
      }

      if (Math.random() > settings.rotateRatio) {
        return 0;
      }

      if (rotationRange === 0) {
        return minRotation;
      }

      return minRotation + Math.round(Math.random() * rotationRange / rotationStep) * rotationStep;
    };

    var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
      // calculate the acutal font size
      // fontSize === 0 means weightFactor function wants the text skipped,
      // and size < minSize means we cannot draw the text.
      var debug = false;
      var fontSize = settings.weightFactor(weight);
      if (fontSize <= settings.minSize) {
        return false;
      }

      // Scale factor here is to make sure fillText is not limited by
      // the minium font size set by browser.
      // It will always be 1 or 2n.
      var mu = 1;
      if (fontSize < minFontSize) {
        mu = (function calculateScaleFactor() {
          var mu = 2;
          while (mu * fontSize < minFontSize) {
            mu += 2;
          }
          return mu;
        })();
      }

      var fcanvas = document.createElement('canvas');
      var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

      fctx.font = settings.fontWeight + ' ' +
        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

      // Estimate the dimension of the text with measureText().
      var fw = fctx.measureText(word).width / mu;
      var fh = Math.max(fontSize * mu,
                        fctx.measureText('m').width,
                        fctx.measureText('\uFF37').width) / mu;

      // Create a boundary box that is larger than our estimates,
      // so text don't get cut of (it sill might)
      var boxWidth = fw + fh * 2;
      var boxHeight = fh * 3;
      var fgw = Math.ceil(boxWidth / g);
      var fgh = Math.ceil(boxHeight / g);
      boxWidth = fgw * g;
      boxHeight = fgh * g;

      // Calculate the proper offsets to make the text centered at
      // the preferred position.

      // This is simply half of the width.
      var fillTextOffsetX = - fw / 2;
      // Instead of moving the box to the exact middle of the preferred
      // position, for Y-offset we move 0.4 instead, so Latin alphabets look
      // vertical centered.
      var fillTextOffsetY = - fh * 0.4;

      // Calculate the actual dimension of the canvas, considering the rotation.
      var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) +
                           boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
      var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) +
                           boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
      var width = cgw * g;
      var height = cgh * g;

      fcanvas.setAttribute('width', width);
      fcanvas.setAttribute('height', height);

      if (debug) {
        // Attach fcanvas to the DOM
        document.body.appendChild(fcanvas);
        // Save it's state so that we could restore and draw the grid correctly.
        fctx.save();
      }

      // Scale the canvas with |mu|.
      fctx.scale(1 / mu, 1 / mu);
      fctx.translate(width * mu / 2, height * mu / 2);
      fctx.rotate(- rotateDeg);

      // Once the width/height is set, ctx info will be reset.
      // Set it again here.
      fctx.font = settings.fontWeight + ' ' +
        (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

      // Fill the text into the fcanvas.
      // XXX: We cannot because textBaseline = 'top' here because
      // Firefox and Chrome uses different default line-height for canvas.
      // Please read https://bugzil.la/737852#c6.
      // Here, we use textBaseline = 'middle' and draw the text at exactly
      // 0.5 * fontSize lower.
      fctx.fillStyle = '#000';
      fctx.textBaseline = 'middle';
      fctx.fillText(word, fillTextOffsetX * mu,
                    (fillTextOffsetY + fontSize * 0.5) * mu);

      // Get the pixels of the text
      var imageData = fctx.getImageData(0, 0, width, height).data;

      if (exceedTime()) {
        return false;
      }

      if (debug) {
        // Draw the box of the original estimation
        fctx.strokeRect(fillTextOffsetX * mu,
                        fillTextOffsetY, fw * mu, fh * mu);
        fctx.restore();
      }

      // Read the pixels and save the information to the occupied array
      var occupied = [];
      var gx = cgw, gy, x, y;
      var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
      while (gx--) {
        gy = cgh;
        while (gy--) {
          y = g;
          singleGridLoop: {
            while (y--) {
              x = g;
              while (x--) {
                if (imageData[((gy * g + y) * width +
                               (gx * g + x)) * 4 + 3]) {
                  occupied.push([gx, gy]);

                  if (gx < bounds[3]) {
                    bounds[3] = gx;
                  }
                  if (gx > bounds[1]) {
                    bounds[1] = gx;
                  }
                  if (gy < bounds[0]) {
                    bounds[0] = gy;
                  }
                  if (gy > bounds[2]) {
                    bounds[2] = gy;
                  }

                  if (debug) {
                    fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
                  }
                  break singleGridLoop;
                }
              }
            }
            if (debug) {
              fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
              fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
            }
          }
        }
      }

      if (debug) {
        fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        fctx.fillRect(bounds[3] * g,
                      bounds[0] * g,
                      (bounds[1] - bounds[3] + 1) * g,
                      (bounds[2] - bounds[0] + 1) * g);
      }

      // Return information needed to create the text on the real canvas
      return {
        mu: mu,
        occupied: occupied,
        bounds: bounds,
        gw: cgw,
        gh: cgh,
        fillTextOffsetX: fillTextOffsetX,
        fillTextOffsetY: fillTextOffsetY,
        fillTextWidth: fw,
        fillTextHeight: fh,
        fontSize: fontSize
      };
    };

    /* Determine if there is room available in the given dimension */
    var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
      // Go through the occupied points,
      // return false if the space is not available.
      var i = occupied.length;
      while (i--) {
        var px = gx + occupied[i][0];
        var py = gy + occupied[i][1];

        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
          if (!settings.drawOutOfBound) {
            return false;
          }
          continue;
        }

        if (!grid[px][py]) {
          return false;
        }
      }
      return true;
    };

    /* Actually draw the text on the grid */
    var drawText = function drawText(gx, gy, info, word, weight,
                                     distance, theta, rotateDeg, attributes) {

      var fontSize = info.fontSize;
      var color;
      if (getTextColor) {
        color = getTextColor(word, weight, fontSize, distance, theta);
      } else {
        color = settings.color;
      }

      var classes;
      if (getTextClasses) {
        classes = getTextClasses(word, weight, fontSize, distance, theta);
      } else {
        classes = settings.classes;
      }

      var dimension;
      var bounds = info.bounds;
      dimension = {
        x: (gx + bounds[3]) * g,
        y: (gy + bounds[0]) * g,
        w: (bounds[1] - bounds[3] + 1) * g,
        h: (bounds[2] - bounds[0] + 1) * g
      };

      elements.forEach(function(el) {
        if (el.getContext) {
          var ctx = el.getContext('2d');
          var mu = info.mu;

          // Save the current state before messing it
          ctx.save();
          ctx.scale(1 / mu, 1 / mu);

          ctx.font = settings.fontWeight + ' ' +
                     (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
          ctx.fillStyle = color;

          // Translate the canvas position to the origin coordinate of where
          // the text should be put.
          ctx.translate((gx + info.gw / 2) * g * mu,
                        (gy + info.gh / 2) * g * mu);

          if (rotateDeg !== 0) {
            ctx.rotate(- rotateDeg);
          }

          // Finally, fill the text.

          // XXX: We cannot because textBaseline = 'top' here because
          // Firefox and Chrome uses different default line-height for canvas.
          // Please read https://bugzil.la/737852#c6.
          // Here, we use textBaseline = 'middle' and draw the text at exactly
          // 0.5 * fontSize lower.
          ctx.textBaseline = 'middle';
          ctx.fillText(word, info.fillTextOffsetX * mu,
                             (info.fillTextOffsetY + fontSize * 0.5) * mu);

          // The below box is always matches how <span>s are positioned
          /* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
            info.fillTextWidth, info.fillTextHeight); */

          // Restore the state.
          ctx.restore();
        } else {
          // drawText on DIV element
          var span = document.createElement('span');
          var transformRule = '';
          transformRule = 'rotate(' + (- rotateDeg / Math.PI * 180) + 'deg) ';
          if (info.mu !== 1) {
            transformRule +=
              'translateX(-' + (info.fillTextWidth / 4) + 'px) ' +
              'scale(' + (1 / info.mu) + ')';
          }
          var styleRules = {
            'position': 'absolute',
            'display': 'block',
            'font': settings.fontWeight + ' ' +
                    (fontSize * info.mu) + 'px ' + settings.fontFamily,
            'left': ((gx + info.gw / 2) * g + info.fillTextOffsetX) + 'px',
            'top': ((gy + info.gh / 2) * g + info.fillTextOffsetY) + 'px',
            'width': info.fillTextWidth + 'px',
            'height': info.fillTextHeight + 'px',
            'lineHeight': fontSize + 'px',
            'whiteSpace': 'nowrap',
            'transform': transformRule,
            'webkitTransform': transformRule,
            'msTransform': transformRule,
            'transformOrigin': '50% 40%',
            'webkitTransformOrigin': '50% 40%',
            'msTransformOrigin': '50% 40%'
          };
          if (color) {
            styleRules.color = color;
          }
          span.textContent = word;
          for (var cssProp in styleRules) {
            span.style[cssProp] = styleRules[cssProp];
          }
          if (attributes) {
            for (var attribute in attributes) {
              span.setAttribute(attribute, attributes[attribute]);
            }
          }
          if (classes) {
            span.className += classes;
          }
          el.appendChild(span);
        }
      });
    };

    /* Help function to updateGrid */
    var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
      if (x >= ngx || y >= ngy || x < 0 || y < 0) {
        return;
      }

      grid[x][y] = false;

      if (drawMask) {
        var ctx = elements[0].getContext('2d');
        ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
      }

      if (interactive) {
        infoGrid[x][y] = { item: item, dimension: dimension };
      }
    };

    /* Update the filling information of the given space with occupied points.
       Draw the mask on the canvas if necessary. */
    var updateGrid = function updateGrid(gx, gy, gw, gh, info, item) {
      var occupied = info.occupied;
      var drawMask = settings.drawMask;
      var ctx;
      if (drawMask) {
        ctx = elements[0].getContext('2d');
        ctx.save();
        ctx.fillStyle = settings.maskColor;
      }

      var dimension;
      if (interactive) {
        var bounds = info.bounds;
        dimension = {
          x: (gx + bounds[3]) * g,
          y: (gy + bounds[0]) * g,
          w: (bounds[1] - bounds[3] + 1) * g,
          h: (bounds[2] - bounds[0] + 1) * g
        };
      }

      var i = occupied.length;
      while (i--) {
        var px = gx + occupied[i][0];
        var py = gy + occupied[i][1];

        if (px >= ngx || py >= ngy || px < 0 || py < 0) {
          continue;
        }

        fillGridAt(px, py, drawMask, dimension, item);
      }

      if (drawMask) {
        ctx.restore();
      }
    };

    /* putWord() processes each item on the list,
       calculate it's size and determine it's position, and actually
       put it on the canvas. */
    var putWord = function putWord(item) {
      var word, weight, attributes;
      if (Array.isArray(item)) {
        word = item[0];
        weight = item[1];
      } else {
        word = item.word;
        weight = item.weight;
        attributes = item.attributes;
      }
      var rotateDeg = getRotateDeg();

      // get info needed to put the text onto the canvas
      var info = getTextInfo(word, weight, rotateDeg);

      // not getting the info means we shouldn't be drawing this one.
      if (!info) {
        return false;
      }

      if (exceedTime()) {
        return false;
      }

      // If drawOutOfBound is set to false,
      // skip the loop if we have already know the bounding box of
      // word is larger than the canvas.
      if (!settings.drawOutOfBound) {
        var bounds = info.bounds;
        if ((bounds[1] - bounds[3] + 1) > ngx ||
          (bounds[2] - bounds[0] + 1) > ngy) {
          return false;
        }
      }

      // Determine the position to put the text by
      // start looking for the nearest points
      var r = maxRadius + 1;

      var tryToPutWordAtPoint = function(gxy) {
        var gx = Math.floor(gxy[0] - info.gw / 2);
        var gy = Math.floor(gxy[1] - info.gh / 2);
        var gw = info.gw;
        var gh = info.gh;

        // If we cannot fit the text at this position, return false
        // and go to the next position.
        if (!canFitText(gx, gy, gw, gh, info.occupied)) {
          return false;
        }

        // Actually put the text on the canvas
        drawText(gx, gy, info, word, weight,
                 (maxRadius - r), gxy[2], rotateDeg, attributes);

        // Mark the spaces on the grid as filled
        updateGrid(gx, gy, gw, gh, info, item);

        return {
          gx: gx,
          gy: gy,
          rot: rotateDeg,
          info: info
        };
      };

      while (r--) {
        var points = getPointsAtRadius(maxRadius - r);

        if (settings.shuffle) {
          points = [].concat(points);
          shuffleArray(points);
        }

        // Try to fit the words by looking at each point.
        // array.some() will stop and return true
        // when putWordAtPoint() returns true.
        for (var i = 0; i < points.length; i++) {
          var res = tryToPutWordAtPoint(points[i]);
          if (res) {
            return res;
          }
        }

        // var drawn = points.some(tryToPutWordAtPoint);
        // if (drawn) {
        //   // leave putWord() and return true
        //   return true;
        // }
      }
      // we tried all distances but text won't fit, return null
      return null;
    };

    /* Send DOM event to all elements. Will stop sending event and return
       if the previous one is canceled (for cancelable events). */
    var sendEvent = function sendEvent(type, cancelable, detail) {
      if (cancelable) {
        return !elements.some(function(el) {
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(type, true, cancelable, detail || {});
          return !el.dispatchEvent(evt);
        }, this);
      } else {
        elements.forEach(function(el) {
          var evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(type, true, cancelable, detail || {});
          el.dispatchEvent(evt);
        }, this);
      }
    };

    /* Start drawing on a canvas */
    var start = function start() {
      // For dimensions, clearCanvas etc.,
      // we only care about the first element.
      var canvas = elements[0];

      if (canvas.getContext) {
        ngx = Math.ceil(canvas.width / g);
        ngy = Math.ceil(canvas.height / g);
      } else {
        var rect = canvas.getBoundingClientRect();
        ngx = Math.ceil(rect.width / g);
        ngy = Math.ceil(rect.height / g);
      }

      // Sending a wordcloudstart event which cause the previous loop to stop.
      // Do nothing if the event is canceled.
      if (!sendEvent('wordcloudstart', true)) {
        return;
      }

      // Determine the center of the word cloud
      center = (settings.origin) ?
        [settings.origin[0]/g, settings.origin[1]/g] :
        [ngx / 2, ngy / 2];

      // Maxium radius to look for space
      maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

      /* Clear the canvas only if the clearCanvas is set,
         if not, update the grid to the current canvas state */
      grid = [];

      var gx, gy, i;
      if (!canvas.getContext || settings.clearCanvas) {
        elements.forEach(function(el) {
          if (el.getContext) {
            var ctx = el.getContext('2d');
            ctx.fillStyle = settings.backgroundColor;
            ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
            ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
          } else {
            el.textContent = '';
            el.style.backgroundColor = settings.backgroundColor;
            el.style.position = 'relative';
          }
        });

        /* fill the grid with empty state */
        gx = ngx;
        while (gx--) {
          grid[gx] = [];
          gy = ngy;
          while (gy--) {
            grid[gx][gy] = true;
          }
        }
      } else {
        /* Determine bgPixel by creating
           another canvas and fill the specified background color. */
        var bctx = document.createElement('canvas').getContext('2d');

        bctx.fillStyle = settings.backgroundColor;
        bctx.fillRect(0, 0, 1, 1);
        var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

        /* Read back the pixels of the canvas we got to tell which part of the
           canvas is empty.
           (no clearCanvas only works with a canvas, not divs) */
        var imageData =
          canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

        gx = ngx;
        var x, y;
        while (gx--) {
          grid[gx] = [];
          gy = ngy;
          while (gy--) {
            y = g;
            singleGridLoop: while (y--) {
              x = g;
              while (x--) {
                i = 4;
                while (i--) {
                  if (imageData[((gy * g + y) * ngx * g +
                                 (gx * g + x)) * 4 + i] !== bgPixel[i]) {
                    grid[gx][gy] = false;
                    break singleGridLoop;
                  }
                }
              }
            }
            if (grid[gx][gy] !== false) {
              grid[gx][gy] = true;
            }
          }
        }

        imageData = bctx = bgPixel = undefined;
      }

      // fill the infoGrid with empty state if we need it
      if (settings.hover || settings.click) {

        interactive = true;

        /* fill the grid with empty state */
        gx = ngx + 1;
        while (gx--) {
          infoGrid[gx] = [];
        }

        if (settings.hover) {
          canvas.addEventListener('mousemove', wordcloudhover);
        }

        if (settings.click) {
          canvas.addEventListener('click', wordcloudclick);
          canvas.addEventListener('touchstart', wordcloudclick);
          canvas.addEventListener('touchend', function (e) {
            e.preventDefault();
          });
          canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
        }

        canvas.addEventListener('wordcloudstart', function stopInteraction() {
          canvas.removeEventListener('wordcloudstart', stopInteraction);

          canvas.removeEventListener('mousemove', wordcloudhover);
          canvas.removeEventListener('click', wordcloudclick);
          hovered = undefined;
        });
      }

      i = 0;
      var loopingFunction, stoppingFunction;
      if (settings.wait !== 0) {
        loopingFunction = window.setTimeout;
        stoppingFunction = window.clearTimeout;
      } else {
        loopingFunction = window.setImmediate;
        stoppingFunction = window.clearImmediate;
      }

      var addEventListener = function addEventListener(type, listener) {
        elements.forEach(function(el) {
          el.addEventListener(type, listener);
        }, this);
      };

      var removeEventListener = function removeEventListener(type, listener) {
        elements.forEach(function(el) {
          el.removeEventListener(type, listener);
        }, this);
      };

      var anotherWordCloudStart = function anotherWordCloudStart() {
        removeEventListener('wordcloudstart', anotherWordCloudStart);
        stoppingFunction(timer);
      };

      addEventListener('wordcloudstart', anotherWordCloudStart);

      var timer = loopingFunction(function loop() {
        if (i >= settings.list.length) {
          stoppingFunction(timer);
          sendEvent('wordcloudstop', false);
          removeEventListener('wordcloudstart', anotherWordCloudStart);

          return;
        }
        escapeTime = (new Date()).getTime();
        var drawn = putWord(settings.list[i]);
        var canceled = !sendEvent('wordclouddrawn', true, {
          item: settings.list[i], drawn: drawn });
        if (exceedTime() || canceled) {
          stoppingFunction(timer);
          settings.abort();
          sendEvent('wordcloudabort', false);
          sendEvent('wordcloudstop', false);
          removeEventListener('wordcloudstart', anotherWordCloudStart);
          return;
        }
        i++;
        timer = loopingFunction(loop, settings.wait);
      }, settings.wait);
    };

    // All set, start the drawing
    start();
  };

  WordCloud.isSupported = isSupported;
  WordCloud.minFontSize = minFontSize;

  // Expose the library as an AMD module
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() { return WordCloud; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})(this); //jshint ignore:line

/***/ }),

/***/ "87a1":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("0a4f");

/***/ }),

/***/ "a00a":
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__("313e");

var BMapCoordSys = __webpack_require__("4ae9");

__webpack_require__("5d99");

__webpack_require__("2114");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * BMap component extension
 */
echarts.registerCoordinateSystem('bmap', BMapCoordSys); // Action

echarts.registerAction({
  type: 'bmapRoam',
  event: 'bmapRoam',
  update: 'updateLayout'
}, function (payload, ecModel) {
  ecModel.eachComponent('bmap', function (bMapModel) {
    var bmap = bMapModel.getBMap();
    var center = bmap.getCenter();
    bMapModel.setCenterAndZoom([center.lng, center.lat], bmap.getZoom());
  });
});
var version = '1.0.0';
exports.version = version;

/***/ }),

/***/ "a98e":
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__("3eba");

__webpack_require__("32f8");
__webpack_require__("cb7d");


echarts.registerVisual(
    echarts.util.curry(
        __webpack_require__("98e7"), 'liquidFill'
    )
);


/***/ }),

/***/ "c03d":
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__("3eba");

function getShallow(model, path) {
    return model && model.getShallow(path);
}

echarts.extendChartView({

    type: 'wordCloud',

    render: function (seriesModel, ecModel, api) {
        var group = this.group;
        group.removeAll();

        var data = seriesModel.getData();

        var gridSize = seriesModel.get('gridSize');

        seriesModel.layoutInstance.ondraw = function (text, size, dataIdx, drawn) {
            var itemModel = data.getItemModel(dataIdx);
            var textStyleModel = itemModel.getModel('textStyle.normal');
            var emphasisTextStyleModel = itemModel.getModel('textStyle.emphasis');

            var textEl = new echarts.graphic.Text({
                style: echarts.graphic.setTextStyle({}, textStyleModel, {
                    x: drawn.info.fillTextOffsetX,
                    y: drawn.info.fillTextOffsetY + size * 0.5,
                    text: text,
                    textBaseline: 'middle',
                    textFill: data.getItemVisual(dataIdx, 'color'),
                    fontSize: size
                }),
                scale: [1 / drawn.info.mu, 1 / drawn.info.mu],
                position: [
                    (drawn.gx + drawn.info.gw / 2) * gridSize,
                    (drawn.gy + drawn.info.gh / 2) * gridSize
                ],
                rotation: drawn.rot
            });

            group.add(textEl);

            data.setItemGraphicEl(dataIdx, textEl);

            echarts.graphic.setHoverStyle(
                textEl,
                echarts.graphic.setTextStyle({}, emphasisTextStyleModel, null, {forMerge: true}, true)
            );
        };

        this._model = seriesModel;
    },

    remove: function () {
        this.group.removeAll();

        this._model.layoutInstance.dispose();
    },

    dispose: function () {
        this._model.layoutInstance.dispose();
    }
});


/***/ }),

/***/ "cb7d":
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__("3eba");
var numberUtil = echarts.number;
var symbolUtil = __webpack_require__("a15a");
var parsePercent = numberUtil.parsePercent;

var LiquidLayout = __webpack_require__("ccf7");

function getShallow(model, path) {
    return model && model.getShallow(path);
}

echarts.extendChartView({

    type: 'liquidFill',

    render: function (seriesModel, ecModel, api) {
        var group = this.group;
        group.removeAll();

        var data = seriesModel.getData();

        var itemModel = data.getItemModel(0);

        var center = itemModel.get('center');
        var radius = itemModel.get('radius');

        var width = api.getWidth();
        var height = api.getHeight();
        var size = Math.min(width, height);
        // itemStyle
        var outlineDistance = 0;
        var outlineBorderWidth = 0;
        var showOutline = seriesModel.get('outline.show');

        if (showOutline) {
            outlineDistance = seriesModel.get('outline.borderDistance');
            outlineBorderWidth = parsePercent(
                seriesModel.get('outline.itemStyle.borderWidth'), size
            );
        }

        var cx = parsePercent(center[0], width);
        var cy = parsePercent(center[1], height);

        var outterRadius;
        var innerRadius;
        var paddingRadius;

        var isFillContainer = false;

        var symbol = seriesModel.get('shape');
        if (symbol === 'container') {
            // a shape that fully fills the container
            isFillContainer = true;

            outterRadius = [
                width / 2,
                height / 2
            ];
            innerRadius = [
                outterRadius[0] - outlineBorderWidth / 2,
                outterRadius[1] - outlineBorderWidth / 2
            ];
            paddingRadius = [
                parsePercent(outlineDistance, width),
                parsePercent(outlineDistance, height)
            ];

            radius = [
                Math.max(innerRadius[0] - paddingRadius[0], 0),
                Math.max(innerRadius[1] - paddingRadius[1], 0)
            ];
        }
        else {
            outterRadius = parsePercent(radius, size) / 2;
            innerRadius = outterRadius - outlineBorderWidth / 2;
            paddingRadius = parsePercent(outlineDistance, size);

            radius = Math.max(innerRadius - paddingRadius, 0);
        }

        if (showOutline) {
            var outline = getOutline();
            outline.style.lineWidth = outlineBorderWidth;
            group.add(getOutline());
        }

        var left = isFillContainer ? 0 : cx - radius;
        var top = isFillContainer ? 0 : cy - radius;

        var wavePath = null;

        group.add(getBackground());

        // each data item for a wave
        var oldData = this._data;
        var waves = [];
        data.diff(oldData)
            .add(function (idx) {
                var wave = getWave(idx, false);

                var waterLevel = wave.shape.waterLevel;
                wave.shape.waterLevel = isFillContainer ? height / 2 : radius;
                echarts.graphic.initProps(wave, {
                    shape: {
                        waterLevel: waterLevel
                    }
                }, seriesModel);

                wave.z2 = 2;
                setWaveAnimation(idx, wave, null);

                group.add(wave);
                data.setItemGraphicEl(idx, wave);
                waves.push(wave);
            })
            .update(function (newIdx, oldIdx) {
                var waveElement = oldData.getItemGraphicEl(oldIdx);

                // new wave is used to calculate position, but not added
                var newWave = getWave(newIdx, false, waveElement);

                // changes with animation
                var shape = {};
                var shapeAttrs = ['amplitude', 'cx', 'cy', 'phase', 'radius', 'radiusY', 'waterLevel', 'waveLength'];
                for (var i = 0; i < shapeAttrs.length; ++i) {
                    var attr = shapeAttrs[i];
                    if (newWave.shape.hasOwnProperty(attr)) {
                        shape[attr] = newWave.shape[attr];
                    }
                }

                var style = {};
                var styleAttrs = ['fill', 'opacity', 'shadowBlur', 'shadowColor'];
                for (var i = 0; i < styleAttrs.length; ++i) {
                    var attr = styleAttrs[i];
                    if (newWave.style.hasOwnProperty(attr)) {
                        style[attr] = newWave.style[attr];
                    }
                }

                if (isFillContainer) {
                    shape.radiusY = height / 2;
                }

                // changes with animation
                echarts.graphic.updateProps(waveElement, {
                    shape: shape,
                    style: style
                }, seriesModel);

                // instant changes
                waveElement.position = newWave.position;
                waveElement.setClipPath(newWave.clipPath);
                waveElement.shape.inverse = newWave.inverse;

                setWaveAnimation(newIdx, waveElement, waveElement);
                group.add(waveElement);
                data.setItemGraphicEl(newIdx, waveElement);
                waves.push(waveElement);
            })
            .remove(function (idx) {
                var wave = oldData.getItemGraphicEl(idx);
                group.remove(wave);
            })
            .execute();

        if (itemModel.get('label.show')) {
            group.add(getText(waves));
        }

        this._data = data;

        /**
         * Get path for outline, background and clipping
         *
         * @param {number} r outter radius of shape
         * @param {boolean|undefined} isForClipping if the shape is used
         *                                          for clipping
         */
        function getPath(r, isForClipping) {
            if (symbol) {
                // customed symbol path
                if (symbol.indexOf('path://') === 0) {
                    var path = echarts.graphic.makePath(symbol.slice(7), {});
                    var bouding = path.getBoundingRect();
                    var w = bouding.width;
                    var h = bouding.height;
                    if (w > h) {
                        h = r * 2 / w * h;
                        w = r * 2;
                    }
                    else {
                        w = r * 2 / h * w;
                        h = r * 2;
                    }

                    var left = isForClipping ? 0 : cx - w / 2;
                    var top = isForClipping ? 0 : cy - h / 2;
                    path = echarts.graphic.makePath(
                        symbol.slice(7),
                        {},
                        new echarts.graphic.BoundingRect(left, top, w, h)
                    );
                    if (isForClipping) {
                        path.position = [-w / 2, -h / 2];
                    }
                    return path;
                }
                else if (isFillContainer) {
                    // fully fill the container
                    var x = isForClipping ? -r[0] : cx - r[0];
                    var y = isForClipping ? -r[1] : cy - r[1];
                    return symbolUtil.createSymbol(
                        'rect', x, y, r[0] * 2, r[1] * 2
                    );
                }
                else {
                    var x = isForClipping ? -r : cx - r;
                    var y = isForClipping ? -r : cy - r;
                    if (symbol === 'pin') {
                        y += r;
                    }
                    else if (symbol === 'arrow') {
                        y -= r;
                    }
                    return symbolUtil.createSymbol(symbol, x, y, r * 2, r * 2);
                }
            }

            return new echarts.graphic.Circle({
                shape: {
                    cx: isForClipping ? 0 : cx,
                    cy: isForClipping ? 0 : cy,
                    r: r
                }
            });
        }
        /**
         * Create outline
         */
        function getOutline() {
            var outlinePath = getPath(outterRadius);
            outlinePath.style.fill = null;

            outlinePath.setStyle(seriesModel.getModel('outline.itemStyle')
                .getItemStyle());

            return outlinePath;
        }

        /**
         * Create background
         */
        function getBackground() {
            // Seperate stroke and fill, so we can use stroke to cover the alias of clipping.
            var strokePath = getPath(radius);
            strokePath.setStyle(seriesModel.getModel('backgroundStyle')
                .getItemStyle());
            strokePath.style.fill = null;

            // Stroke is front of wave
            strokePath.z2 = 5;

            var fillPath = getPath(radius);
            fillPath.setStyle(seriesModel.getModel('backgroundStyle')
                .getItemStyle());
            fillPath.style.stroke = null;

            var group = new echarts.graphic.Group();
            group.add(strokePath);
            group.add(fillPath);

            return group;
        }

        /**
         * wave shape
         */
        function getWave(idx, isInverse, oldWave) {
            var radiusX = isFillContainer ? radius[0] : radius;
            var radiusY = isFillContainer ? height / 2 : radius;

            var itemModel = data.getItemModel(idx);
            var itemStyleModel = itemModel.getModel('itemStyle');
            var phase = itemModel.get('phase');
            var amplitude = parsePercent(itemModel.get('amplitude'),
                radiusY * 2);
            var waveLength = parsePercent(itemModel.get('waveLength'),
                radiusX * 2);

            var value = data.get('value', idx);
            var waterLevel = radiusY - value * radiusY * 2;
            phase = oldWave ? oldWave.shape.phase
                : (phase === 'auto' ? idx * Math.PI / 4 : phase);
            var normalStyle = itemStyleModel.getItemStyle();
            if (!normalStyle.fill) {
                var seriesColor = seriesModel.get('color');
                var id = idx % seriesColor.length;
                normalStyle.fill = seriesColor[id];
            }

            var x = radiusX * 2;
            var wave = new LiquidLayout({
                shape: {
                    waveLength: waveLength,
                    radius: radiusX,
                    radiusY: radiusY,
                    cx: x,
                    cy: 0,
                    waterLevel: waterLevel,
                    amplitude: amplitude,
                    phase: phase,
                    inverse: isInverse
                },
                style: normalStyle,
                position: [cx, cy]
            });
            wave.shape._waterLevel = waterLevel;

            var hoverStyle = itemModel.getModel('emphasis.itemStyle')
                .getItemStyle();
            hoverStyle.lineWidth = 0;
            echarts.graphic.setHoverStyle(wave, hoverStyle);

            // clip out the part outside the circle
            var clip = getPath(radius, true);
            // set fill for clipPath, otherwise it will not trigger hover event
            clip.setStyle({
                fill: 'white'
            });
            wave.setClipPath(clip);

            return wave;
        }

        function setWaveAnimation(idx, wave, oldWave) {
            var itemModel = data.getItemModel(idx);

            var maxSpeed = itemModel.get('period');
            var direction = itemModel.get('direction');

            var value = data.get('value', idx);

            var phase = itemModel.get('phase');
            phase = oldWave ? oldWave.shape.phase
                : (phase === 'auto' ? idx * Math.PI / 4 : phase);

            var defaultSpeed = function (maxSpeed) {
                var cnt = data.count();
                return cnt === 0 ? maxSpeed : maxSpeed *
                    (0.2 + (cnt - idx) / cnt * 0.8);
            };
            var speed = 0;
            if (maxSpeed === 'auto') {
                speed = defaultSpeed(5000);
            }
            else {
                speed = typeof maxSpeed === 'function'
                    ? maxSpeed(value, idx) : maxSpeed;
            }

            // phase for moving left/right
            var phaseOffset = 0;
            if (direction === 'right' || direction == null) {
                phaseOffset = Math.PI;
            }
            else if (direction === 'left') {
                phaseOffset = -Math.PI;
            }
            else if (direction === 'none') {
                phaseOffset = 0;
            }
            else {
                console.error('Illegal direction value for liquid fill.');
            }

            // wave animation of moving left/right
            if (direction !== 'none' && itemModel.get('waveAnimation')) {
                wave
                    .animate('shape', true)
                    .when(0, {
                        phase: phase
                    })
                    .when(speed / 2, {
                        phase: phaseOffset + phase
                    })
                    .when(speed, {
                        phase: phaseOffset * 2 + phase
                    })
                    .during(function () {
                        if (wavePath) {
                            wavePath.dirty(true);
                        }
                    })
                    .start();
            }
        }

        /**
         * text on wave
         */
        function getText(waves) {
            var labelModel = itemModel.getModel('label');

            function formatLabel() {
                var formatted = seriesModel.getFormattedLabel(0, 'normal');
                var defaultVal = (data.get('value', 0) * 100);
                var defaultLabel = data.getName(0) || seriesModel.name;
                if (!isNaN(defaultVal)) {
                    defaultLabel = defaultVal.toFixed(0) + '%';
                }
                return formatted == null ? defaultLabel : formatted;
            }

            var textOption = {
                z2: 10,
                shape: {
                    x: left,
                    y: top,
                    width: (isFillContainer ? radius[0] : radius) * 2,
                    height: (isFillContainer ? radius[1] : radius) * 2
                },
                style: {
                    fill: 'transparent',
                    text: formatLabel(),
                    textAlign: labelModel.get('align'),
                    textVerticalAlign: labelModel.get('baseline')
                },
                silent: true
            };

            var outsideTextRect = new echarts.graphic.Rect(textOption);
            var color = labelModel.get('color');
            echarts.graphic.setText(outsideTextRect.style, labelModel, color);

            var insideTextRect = new echarts.graphic.Rect(textOption);
            var insColor = labelModel.get('insideColor');
            echarts.graphic.setText(insideTextRect.style, labelModel, insColor);
            insideTextRect.style.textFill = insColor;

            var group = new echarts.graphic.Group();
            group.add(outsideTextRect);
            group.add(insideTextRect);

            // clip out waves for insideText
            var boundingCircle = getPath(radius, true);

            wavePath = new echarts.graphic.CompoundPath({
                shape: {
                    paths: waves
                },
                position: [cx, cy]
            });

            wavePath.setClipPath(boundingCircle);
            insideTextRect.setClipPath(wavePath);

            return group;
        }
    },

    dispose: function () {
        // dispose nothing here
    }
});


/***/ }),

/***/ "ccf7":
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__("3eba");

module.exports = echarts.graphic.extendShape({
    type: 'ec-liquid-fill',

    shape: {
        waveLength: 0,
        radius: 0,
        radiusY: 0,
        cx: 0,
        cy: 0,
        waterLevel: 0,
        amplitude: 0,
        phase: 0,
        inverse: false
    },

    buildPath: function (ctx, shape) {
        if (shape.radiusY == null) {
            shape.radiusY = shape.radius;
        }

        /**
         * We define a sine wave having 4 waves, and make sure at least 8 curves
         * is drawn. Otherwise, it may cause blank area for some waves when
         * wave length is large enough.
         */
        var curves = Math.max(
            Math.ceil(2 * shape.radius / shape.waveLength * 4) * 2,
            8
        );

        // map phase to [-Math.PI * 2, 0]
        while (shape.phase < -Math.PI * 2) {
            shape.phase += Math.PI * 2;
        }
        while (shape.phase > 0) {
            shape.phase -= Math.PI * 2;
        }
        var phase = shape.phase / Math.PI / 2 * shape.waveLength;

        var left = shape.cx - shape.radius + phase - shape.radius * 2;

        /**
         * top-left corner as start point
         *
         * draws this point
         *  |
         * \|/
         *  ~~~~~~~~
         *  |      |
         *  +------+
         */
        ctx.moveTo(left, shape.waterLevel);

        /**
         * top wave
         *
         * ~~~~~~~~ <- draws this sine wave
         * |      |
         * +------+
         */
        var waveRight = 0;
        for (var c = 0; c < curves; ++c) {
            var stage = c % 4;
            var pos = getWaterPositions(c * shape.waveLength / 4, stage,
                shape.waveLength, shape.amplitude);
            ctx.bezierCurveTo(pos[0][0] + left, -pos[0][1] + shape.waterLevel,
                pos[1][0] + left, -pos[1][1] + shape.waterLevel,
                pos[2][0] + left, -pos[2][1] + shape.waterLevel);

            if (c === curves - 1) {
                waveRight = pos[2][0];
            }
        }

        if (shape.inverse) {
            /**
             * top-right corner
             *                  2. draws this line
             *                          |
             *                       +------+
             * 3. draws this line -> |      | <- 1. draws this line
             *                       ~~~~~~~~
             */
            ctx.lineTo(waveRight + left, shape.cy - shape.radiusY);
            ctx.lineTo(left, shape.cy - shape.radiusY);
            ctx.lineTo(left, shape.waterLevel);
        }
        else {
            /**
             * top-right corner
             *
             *                       ~~~~~~~~
             * 3. draws this line -> |      | <- 1. draws this line
             *                       +------+
             *                          ^
             *                          |
             *                  2. draws this line
             */
            ctx.lineTo(waveRight + left, shape.cy + shape.radiusY);
            ctx.lineTo(left, shape.cy + shape.radiusY);
            ctx.lineTo(left, shape.waterLevel);
        }

        ctx.closePath();
    }
});



/**
 * Using Bezier curves to fit sine wave.
 * There is 4 control points for each curve of wave,
 * which is at 1/4 wave length of the sine wave.
 *
 * The control points for a wave from (a) to (d) are a-b-c-d:
 *          c *----* d
 *     b *
 *       |
 * ... a * ..................
 *
 * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
 *
 * @param {number} x          x position of the left-most point (a)
 * @param {number} stage      0-3, stating which part of the wave it is
 * @param {number} waveLength wave length of the sine wave
 * @param {number} amplitude  wave amplitude
 */
function getWaterPositions(x, stage, waveLength, amplitude) {
    if (stage === 0) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2, amplitude / 2],
            [x + 1 / 2 * waveLength / Math.PI,     amplitude],
            [x + waveLength / 4,                   amplitude]
        ];
    }
    else if (stage === 1) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2),
            amplitude],
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1),
            amplitude / 2],
            [x + waveLength / 4,                   0]
        ]
    }
    else if (stage === 2) {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2, -amplitude / 2],
            [x + 1 / 2 * waveLength / Math.PI,     -amplitude],
            [x + waveLength / 4,                   -amplitude]
        ]
    }
    else {
        return [
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2),
            -amplitude],
            [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1),
            -amplitude / 2],
            [x + waveLength / 4,                   0]
        ]
    }
}


/***/ }),

/***/ "d015":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("a98e");


/***/ })

}]);
//# sourceMappingURL=chunk-vendors~89a6fdd3.6ffcb888.js.map