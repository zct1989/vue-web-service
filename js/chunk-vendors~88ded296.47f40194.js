(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~88ded296"],{

/***/ "01ef":
/***/ (function(module, exports) {


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
 * For geo and graph.
 *
 * @param {Object} controllerHost
 * @param {module:zrender/Element} controllerHost.target
 */
function updateViewOnPan(controllerHost, dx, dy) {
  var target = controllerHost.target;
  var pos = target.position;
  pos[0] += dx;
  pos[1] += dy;
  target.dirty();
}
/**
 * For geo and graph.
 *
 * @param {Object} controllerHost
 * @param {module:zrender/Element} controllerHost.target
 * @param {number} controllerHost.zoom
 * @param {number} controllerHost.zoomLimit like: {min: 1, max: 2}
 */


function updateViewOnZoom(controllerHost, zoomDelta, zoomX, zoomY) {
  var target = controllerHost.target;
  var zoomLimit = controllerHost.zoomLimit;
  var pos = target.position;
  var scale = target.scale;
  var newZoom = controllerHost.zoom = controllerHost.zoom || 1;
  newZoom *= zoomDelta;

  if (zoomLimit) {
    var zoomMin = zoomLimit.min || 0;
    var zoomMax = zoomLimit.max || Infinity;
    newZoom = Math.max(Math.min(zoomMax, newZoom), zoomMin);
  }

  var zoomScale = newZoom / controllerHost.zoom;
  controllerHost.zoom = newZoom; // Keep the mouse center when scaling

  pos[0] -= (zoomX - pos[0]) * (zoomScale - 1);
  pos[1] -= (zoomY - pos[1]) * (zoomScale - 1);
  scale[0] *= zoomScale;
  scale[1] *= zoomScale;
  target.dirty();
}

exports.updateViewOnPan = updateViewOnPan;
exports.updateViewOnZoom = updateViewOnZoom;

/***/ }),

/***/ "0c41":
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

var zrUtil = __webpack_require__("6d8b");

var RoamController = __webpack_require__("4a01");

var roamHelper = __webpack_require__("01ef");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphic = __webpack_require__("2306");

var geoSourceManager = __webpack_require__("5b87");

var _component = __webpack_require__("8918");

var getUID = _component.getUID;

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
function getFixedItemStyle(model) {
  var itemStyle = model.getItemStyle();
  var areaColor = model.get('areaColor'); // If user want the color not to be changed when hover,
  // they should both set areaColor and color to be null.

  if (areaColor != null) {
    itemStyle.fill = areaColor;
  }

  return itemStyle;
}

function updateMapSelectHandler(mapDraw, mapOrGeoModel, regionsGroup, api, fromView) {
  regionsGroup.off('click');
  regionsGroup.off('mousedown');

  if (mapOrGeoModel.get('selectedMode')) {
    regionsGroup.on('mousedown', function () {
      mapDraw._mouseDownFlag = true;
    });
    regionsGroup.on('click', function (e) {
      if (!mapDraw._mouseDownFlag) {
        return;
      }

      mapDraw._mouseDownFlag = false;
      var el = e.target;

      while (!el.__regions) {
        el = el.parent;
      }

      if (!el) {
        return;
      }

      var action = {
        type: (mapOrGeoModel.mainType === 'geo' ? 'geo' : 'map') + 'ToggleSelect',
        batch: zrUtil.map(el.__regions, function (region) {
          return {
            name: region.name,
            from: fromView.uid
          };
        })
      };
      action[mapOrGeoModel.mainType + 'Id'] = mapOrGeoModel.id;
      api.dispatchAction(action);
      updateMapSelected(mapOrGeoModel, regionsGroup);
    });
  }
}

function updateMapSelected(mapOrGeoModel, regionsGroup) {
  // FIXME
  regionsGroup.eachChild(function (otherRegionEl) {
    zrUtil.each(otherRegionEl.__regions, function (region) {
      otherRegionEl.trigger(mapOrGeoModel.isSelected(region.name) ? 'emphasis' : 'normal');
    });
  });
}
/**
 * @alias module:echarts/component/helper/MapDraw
 * @param {module:echarts/ExtensionAPI} api
 * @param {boolean} updateGroup
 */


function MapDraw(api, updateGroup) {
  var group = new graphic.Group();
  /**
   * @type {string}
   * @private
   */

  this.uid = getUID('ec_map_draw');
  /**
   * @type {module:echarts/component/helper/RoamController}
   * @private
   */

  this._controller = new RoamController(api.getZr());
  /**
   * @type {Object} {target, zoom, zoomLimit}
   * @private
   */

  this._controllerHost = {
    target: updateGroup ? group : null
  };
  /**
   * @type {module:zrender/container/Group}
   * @readOnly
   */

  this.group = group;
  /**
   * @type {boolean}
   * @private
   */

  this._updateGroup = updateGroup;
  /**
   * This flag is used to make sure that only one among
   * `pan`, `zoom`, `click` can occurs, otherwise 'selected'
   * action may be triggered when `pan`, which is unexpected.
   * @type {booelan}
   */

  this._mouseDownFlag;
  /**
   * @type {string}
   */

  this._mapName;
  /**
   * @type {boolean}
   */

  this._initialized;
  /**
   * @type {module:zrender/container/Group}
   */

  group.add(this._regionsGroup = new graphic.Group());
  /**
   * @type {module:zrender/container/Group}
   */

  group.add(this._backgroundGroup = new graphic.Group());
}

MapDraw.prototype = {
  constructor: MapDraw,
  draw: function (mapOrGeoModel, ecModel, api, fromView, payload) {
    var isGeo = mapOrGeoModel.mainType === 'geo'; // Map series has data. GEO model that controlled by map series
    // will be assigned with map data. Other GEO model has no data.

    var data = mapOrGeoModel.getData && mapOrGeoModel.getData();
    isGeo && ecModel.eachComponent({
      mainType: 'series',
      subType: 'map'
    }, function (mapSeries) {
      if (!data && mapSeries.getHostGeoModel() === mapOrGeoModel) {
        data = mapSeries.getData();
      }
    });
    var geo = mapOrGeoModel.coordinateSystem;

    this._updateBackground(geo);

    var regionsGroup = this._regionsGroup;
    var group = this.group;

    if (geo._roamTransformable.transform) {
      group.transform = geo._roamTransformable.transform.slice();
      group.decomposeTransform();
    }

    var scale = geo._rawTransformable.scale;
    var position = geo._rawTransformable.position;
    regionsGroup.removeAll();
    var itemStyleAccessPath = ['itemStyle'];
    var hoverItemStyleAccessPath = ['emphasis', 'itemStyle'];
    var labelAccessPath = ['label'];
    var hoverLabelAccessPath = ['emphasis', 'label'];
    var nameMap = zrUtil.createHashMap();
    zrUtil.each(geo.regions, function (region) {
      // Consider in GeoJson properties.name may be duplicated, for example,
      // there is multiple region named "United Kindom" or "France" (so many
      // colonies). And it is not appropriate to merge them in geo, which
      // will make them share the same label and bring trouble in label
      // location calculation.
      var regionGroup = nameMap.get(region.name) || nameMap.set(region.name, new graphic.Group());
      var compoundPath = new graphic.CompoundPath({
        segmentIgnoreThreshold: 1,
        shape: {
          paths: []
        }
      });
      regionGroup.add(compoundPath);
      var regionModel = mapOrGeoModel.getRegionModel(region.name) || mapOrGeoModel;
      var itemStyleModel = regionModel.getModel(itemStyleAccessPath);
      var hoverItemStyleModel = regionModel.getModel(hoverItemStyleAccessPath);
      var itemStyle = getFixedItemStyle(itemStyleModel);
      var hoverItemStyle = getFixedItemStyle(hoverItemStyleModel);
      var labelModel = regionModel.getModel(labelAccessPath);
      var hoverLabelModel = regionModel.getModel(hoverLabelAccessPath);
      var dataIdx; // Use the itemStyle in data if has data

      if (data) {
        dataIdx = data.indexOfName(region.name); // Only visual color of each item will be used. It can be encoded by dataRange
        // But visual color of series is used in symbol drawing
        //
        // Visual color for each series is for the symbol draw

        var visualColor = data.getItemVisual(dataIdx, 'color', true);

        if (visualColor) {
          itemStyle.fill = visualColor;
        }
      }

      var transformPoint = function (point) {
        return [point[0] * scale[0] + position[0], point[1] * scale[1] + position[1]];
      };

      zrUtil.each(region.geometries, function (geometry) {
        if (geometry.type !== 'polygon') {
          return;
        }

        var points = [];

        for (var i = 0; i < geometry.exterior.length; ++i) {
          points.push(transformPoint(geometry.exterior[i]));
        }

        compoundPath.shape.paths.push(new graphic.Polygon({
          segmentIgnoreThreshold: 1,
          shape: {
            points: points
          }
        }));

        for (var i = 0; i < (geometry.interiors ? geometry.interiors.length : 0); ++i) {
          var interior = geometry.interiors[i];
          var points = [];

          for (var j = 0; j < interior.length; ++j) {
            points.push(transformPoint(interior[j]));
          }

          compoundPath.shape.paths.push(new graphic.Polygon({
            segmentIgnoreThreshold: 1,
            shape: {
              points: points
            }
          }));
        }
      });
      compoundPath.setStyle(itemStyle);
      compoundPath.style.strokeNoScale = true;
      compoundPath.culling = true; // Label

      var showLabel = labelModel.get('show');
      var hoverShowLabel = hoverLabelModel.get('show');
      var isDataNaN = data && isNaN(data.get(data.mapDimension('value'), dataIdx));
      var itemLayout = data && data.getItemLayout(dataIdx); // In the following cases label will be drawn
      // 1. In map series and data value is NaN
      // 2. In geo component
      // 4. Region has no series legendSymbol, which will be add a showLabel flag in mapSymbolLayout

      if (isGeo || isDataNaN && (showLabel || hoverShowLabel) || itemLayout && itemLayout.showLabel) {
        var query = !isGeo ? dataIdx : region.name;
        var labelFetcher; // Consider dataIdx not found.

        if (!data || dataIdx >= 0) {
          labelFetcher = mapOrGeoModel;
        }

        var textEl = new graphic.Text({
          position: transformPoint(region.center.slice()),
          // FIXME
          // label rotation is not support yet in geo or regions of series-map
          // that has no data. The rotation will be effected by this `scale`.
          // So needed to change to RectText?
          scale: [1 / group.scale[0], 1 / group.scale[1]],
          z2: 10,
          silent: true
        });
        graphic.setLabelStyle(textEl.style, textEl.hoverStyle = {}, labelModel, hoverLabelModel, {
          labelFetcher: labelFetcher,
          labelDataIndex: query,
          defaultText: region.name,
          useInsideStyle: false
        }, {
          textAlign: 'center',
          textVerticalAlign: 'middle'
        });
        regionGroup.add(textEl);
      } // setItemGraphicEl, setHoverStyle after all polygons and labels
      // are added to the rigionGroup


      if (data) {
        data.setItemGraphicEl(dataIdx, regionGroup);
      } else {
        var regionModel = mapOrGeoModel.getRegionModel(region.name); // Package custom mouse event for geo component

        compoundPath.eventData = {
          componentType: 'geo',
          componentIndex: mapOrGeoModel.componentIndex,
          geoIndex: mapOrGeoModel.componentIndex,
          name: region.name,
          region: regionModel && regionModel.option || {}
        };
      }

      var groupRegions = regionGroup.__regions || (regionGroup.__regions = []);
      groupRegions.push(region);
      regionGroup.highDownSilentOnTouch = !!mapOrGeoModel.get('selectedMode');
      graphic.setHoverStyle(regionGroup, hoverItemStyle);
      regionsGroup.add(regionGroup);
    });

    this._updateController(mapOrGeoModel, ecModel, api);

    updateMapSelectHandler(this, mapOrGeoModel, regionsGroup, api, fromView);
    updateMapSelected(mapOrGeoModel, regionsGroup);
  },
  remove: function () {
    this._regionsGroup.removeAll();

    this._backgroundGroup.removeAll();

    this._controller.dispose();

    this._mapName && geoSourceManager.removeGraphic(this._mapName, this.uid);
    this._mapName = null;
    this._controllerHost = {};
  },
  _updateBackground: function (geo) {
    var mapName = geo.map;

    if (this._mapName !== mapName) {
      zrUtil.each(geoSourceManager.makeGraphic(mapName, this.uid), function (root) {
        this._backgroundGroup.add(root);
      }, this);
    }

    this._mapName = mapName;
  },
  _updateController: function (mapOrGeoModel, ecModel, api) {
    var geo = mapOrGeoModel.coordinateSystem;
    var controller = this._controller;
    var controllerHost = this._controllerHost;
    controllerHost.zoomLimit = mapOrGeoModel.get('scaleLimit');
    controllerHost.zoom = geo.getZoom(); // roamType is will be set default true if it is null

    controller.enable(mapOrGeoModel.get('roam') || false);
    var mainType = mapOrGeoModel.mainType;

    function makeActionBase() {
      var action = {
        type: 'geoRoam',
        componentType: mainType
      };
      action[mainType + 'Id'] = mapOrGeoModel.id;
      return action;
    }

    controller.off('pan').on('pan', function (e) {
      this._mouseDownFlag = false;
      roamHelper.updateViewOnPan(controllerHost, e.dx, e.dy);
      api.dispatchAction(zrUtil.extend(makeActionBase(), {
        dx: e.dx,
        dy: e.dy
      }));
    }, this);
    controller.off('zoom').on('zoom', function (e) {
      this._mouseDownFlag = false;
      roamHelper.updateViewOnZoom(controllerHost, e.scale, e.originX, e.originY);
      api.dispatchAction(zrUtil.extend(makeActionBase(), {
        zoom: e.scale,
        originX: e.originX,
        originY: e.originY
      }));

      if (this._updateGroup) {
        var scale = this.group.scale;

        this._regionsGroup.traverse(function (el) {
          if (el.type === 'text') {
            el.attr('scale', [1 / scale[0], 1 / scale[1]]);
          }
        });
      }
    }, this);
    controller.setPointerChecker(function (e, x, y) {
      return geo.getViewRectAfterRoam().contain(x, y) && !onIrrelevantElement(e, api, mapOrGeoModel);
    });
  }
};
var _default = MapDraw;
module.exports = _default;

/***/ }),

/***/ "4a01":
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

var zrUtil = __webpack_require__("6d8b");

var Eventful = __webpack_require__("1fab");

var eventTool = __webpack_require__("607d");

var interactionMutex = __webpack_require__("a4fe");

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
 * @alias module:echarts/component/helper/RoamController
 * @constructor
 * @mixin {module:zrender/mixin/Eventful}
 *
 * @param {module:zrender/zrender~ZRender} zr
 */
function RoamController(zr) {
  /**
   * @type {Function}
   */
  this.pointerChecker;
  /**
   * @type {module:zrender}
   */

  this._zr = zr;
  /**
   * @type {Object}
   */

  this._opt = {}; // Avoid two roamController bind the same handler

  var bind = zrUtil.bind;
  var mousedownHandler = bind(mousedown, this);
  var mousemoveHandler = bind(mousemove, this);
  var mouseupHandler = bind(mouseup, this);
  var mousewheelHandler = bind(mousewheel, this);
  var pinchHandler = bind(pinch, this);
  Eventful.call(this);
  /**
   * @param {Function} pointerChecker
   *                   input: x, y
   *                   output: boolean
   */

  this.setPointerChecker = function (pointerChecker) {
    this.pointerChecker = pointerChecker;
  };
  /**
   * Notice: only enable needed types. For example, if 'zoom'
   * is not needed, 'zoom' should not be enabled, otherwise
   * default mousewheel behaviour (scroll page) will be disabled.
   *
   * @param  {boolean|string} [controlType=true] Specify the control type,
   *                          which can be null/undefined or true/false
   *                          or 'pan/move' or 'zoom'/'scale'
   * @param {Object} [opt]
   * @param {Object} [opt.zoomOnMouseWheel=true] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.moveOnMouseMove=true] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.moveOnMouseWheel=false] The value can be: true / false / 'shift' / 'ctrl' / 'alt'.
   * @param {Object} [opt.preventDefaultMouseMove=true] When pan.
   */


  this.enable = function (controlType, opt) {
    // Disable previous first
    this.disable();
    this._opt = zrUtil.defaults(zrUtil.clone(opt) || {}, {
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      // By default, wheel do not trigger move.
      moveOnMouseWheel: false,
      preventDefaultMouseMove: true
    });

    if (controlType == null) {
      controlType = true;
    }

    if (controlType === true || controlType === 'move' || controlType === 'pan') {
      zr.on('mousedown', mousedownHandler);
      zr.on('mousemove', mousemoveHandler);
      zr.on('mouseup', mouseupHandler);
    }

    if (controlType === true || controlType === 'scale' || controlType === 'zoom') {
      zr.on('mousewheel', mousewheelHandler);
      zr.on('pinch', pinchHandler);
    }
  };

  this.disable = function () {
    zr.off('mousedown', mousedownHandler);
    zr.off('mousemove', mousemoveHandler);
    zr.off('mouseup', mouseupHandler);
    zr.off('mousewheel', mousewheelHandler);
    zr.off('pinch', pinchHandler);
  };

  this.dispose = this.disable;

  this.isDragging = function () {
    return this._dragging;
  };

  this.isPinching = function () {
    return this._pinching;
  };
}

zrUtil.mixin(RoamController, Eventful);

function mousedown(e) {
  if (eventTool.isMiddleOrRightButtonOnMouseUpDown(e) || e.target && e.target.draggable) {
    return;
  }

  var x = e.offsetX;
  var y = e.offsetY; // Only check on mosedown, but not mousemove.
  // Mouse can be out of target when mouse moving.

  if (this.pointerChecker && this.pointerChecker(e, x, y)) {
    this._x = x;
    this._y = y;
    this._dragging = true;
  }
}

function mousemove(e) {
  if (!this._dragging || !isAvailableBehavior('moveOnMouseMove', e, this._opt) || e.gestureEvent === 'pinch' || interactionMutex.isTaken(this._zr, 'globalPan')) {
    return;
  }

  var x = e.offsetX;
  var y = e.offsetY;
  var oldX = this._x;
  var oldY = this._y;
  var dx = x - oldX;
  var dy = y - oldY;
  this._x = x;
  this._y = y;
  this._opt.preventDefaultMouseMove && eventTool.stop(e.event);
  trigger(this, 'pan', 'moveOnMouseMove', e, {
    dx: dx,
    dy: dy,
    oldX: oldX,
    oldY: oldY,
    newX: x,
    newY: y
  });
}

function mouseup(e) {
  if (!eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
    this._dragging = false;
  }
}

function mousewheel(e) {
  var shouldZoom = isAvailableBehavior('zoomOnMouseWheel', e, this._opt);
  var shouldMove = isAvailableBehavior('moveOnMouseWheel', e, this._opt);
  var wheelDelta = e.wheelDelta;
  var absWheelDeltaDelta = Math.abs(wheelDelta);
  var originX = e.offsetX;
  var originY = e.offsetY; // wheelDelta maybe -0 in chrome mac.

  if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
    return;
  } // If both `shouldZoom` and `shouldMove` is true, trigger
  // their event both, and the final behavior is determined
  // by event listener themselves.


  if (shouldZoom) {
    // Convenience:
    // Mac and VM Windows on Mac: scroll up: zoom out.
    // Windows: scroll up: zoom in.
    // FIXME: Should do more test in different environment.
    // wheelDelta is too complicated in difference nvironment
    // (https://developer.mozilla.org/en-US/docs/Web/Events/mousewheel),
    // although it has been normallized by zrender.
    // wheelDelta of mouse wheel is bigger than touch pad.
    var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
    var scale = wheelDelta > 0 ? factor : 1 / factor;
    checkPointerAndTrigger(this, 'zoom', 'zoomOnMouseWheel', e, {
      scale: scale,
      originX: originX,
      originY: originY
    });
  }

  if (shouldMove) {
    // FIXME: Should do more test in different environment.
    var absDelta = Math.abs(wheelDelta); // wheelDelta of mouse wheel is bigger than touch pad.

    var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
    checkPointerAndTrigger(this, 'scrollMove', 'moveOnMouseWheel', e, {
      scrollDelta: scrollDelta,
      originX: originX,
      originY: originY
    });
  }
}

function pinch(e) {
  if (interactionMutex.isTaken(this._zr, 'globalPan')) {
    return;
  }

  var scale = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
  checkPointerAndTrigger(this, 'zoom', null, e, {
    scale: scale,
    originX: e.pinchX,
    originY: e.pinchY
  });
}

function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)) {
    // When mouse is out of roamController rect,
    // default befavoius should not be be disabled, otherwise
    // page sliding is disabled, contrary to expectation.
    eventTool.stop(e.event);
    trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
  }
}

function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  // Also provide behavior checker for event listener, for some case that
  // multiple components share one listener.
  contollerEvent.isAvailableBehavior = zrUtil.bind(isAvailableBehavior, null, behaviorToCheck, e);
  controller.trigger(eventName, contollerEvent);
} // settings: {
//     zoomOnMouseWheel
//     moveOnMouseMove
//     moveOnMouseWheel
// }
// The value can be: true / false / 'shift' / 'ctrl' / 'alt'.


function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!zrUtil.isString(setting) || e.event[setting + 'Key']);
}

var _default = RoamController;
module.exports = _default;

/***/ }),

/***/ "7023":
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

var zrUtil = __webpack_require__("6d8b");

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
 * Data selectable mixin for chart series.
 * To eanble data select, option of series must have `selectedMode`.
 * And each data item will use `selected` to toggle itself selected status
 */
var _default = {
  /**
   * @param {Array.<Object>} targetList [{name, value, selected}, ...]
   *        If targetList is an array, it should like [{name: ..., value: ...}, ...].
   *        If targetList is a "List", it must have coordDim: 'value' dimension and name.
   */
  updateSelectedMap: function (targetList) {
    this._targetList = zrUtil.isArray(targetList) ? targetList.slice() : [];
    this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
      targetMap.set(target.name, target);
      return targetMap;
    }, zrUtil.createHashMap());
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  // PENGING If selectedMode is null ?
  select: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    var selectedMode = this.get('selectedMode');

    if (selectedMode === 'single') {
      this._selectTargetMap.each(function (target) {
        target.selected = false;
      });
    }

    target && (target.selected = true);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  unSelect: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name); // var selectedMode = this.get('selectedMode');
    // selectedMode !== 'single' && target && (target.selected = false);

    target && (target.selected = false);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  toggleSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);

    if (target != null) {
      this[target.selected ? 'unSelect' : 'select'](name, id);
      return target.selected;
    }
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  isSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    return target && target.selected;
  }
};
module.exports = _default;

/***/ }),

/***/ "7919":
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

var _layout = __webpack_require__("f934");

var getLayoutRect = _layout.getLayoutRect;
var layoutBox = _layout.box;
var positionElement = _layout.positionElement;

var formatUtil = __webpack_require__("eda2");

var graphic = __webpack_require__("2306");

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
 * Layout list like component.
 * It will box layout each items in group of component and then position the whole group in the viewport
 * @param {module:zrender/group/Group} group
 * @param {module:echarts/model/Component} componentModel
 * @param {module:echarts/ExtensionAPI}
 */
function layout(group, componentModel, api) {
  var boxLayoutParams = componentModel.getBoxLayoutParams();
  var padding = componentModel.get('padding');
  var viewportSize = {
    width: api.getWidth(),
    height: api.getHeight()
  };
  var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
  layoutBox(componentModel.get('orient'), group, componentModel.get('itemGap'), rect.width, rect.height);
  positionElement(group, boxLayoutParams, viewportSize, padding);
}

function makeBackground(rect, componentModel) {
  var padding = formatUtil.normalizeCssArray(componentModel.get('padding'));
  var style = componentModel.getItemStyle(['color', 'opacity']);
  style.fill = componentModel.get('backgroundColor');
  var rect = new graphic.Rect({
    shape: {
      x: rect.x - padding[3],
      y: rect.y - padding[0],
      width: rect.width + padding[1] + padding[3],
      height: rect.height + padding[0] + padding[2],
      r: componentModel.get('borderRadius')
    },
    style: style,
    silent: true,
    z2: -1
  }); // FIXME
  // `subPixelOptimizeRect` may bring some gap between edge of viewpart
  // and background rect when setting like `left: 0`, `top: 0`.
  // graphic.subPixelOptimizeRect(rect);

  return rect;
}

exports.layout = layout;
exports.makeBackground = makeBackground;

/***/ }),

/***/ "a4fe":
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

var echarts = __webpack_require__("3eba");

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
var ATTR = '\0_ec_interaction_mutex';

function take(zr, resourceKey, userKey) {
  var store = getStore(zr);
  store[resourceKey] = userKey;
}

function release(zr, resourceKey, userKey) {
  var store = getStore(zr);
  var uKey = store[resourceKey];

  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}

function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}

function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
/**
 * payload: {
 *     type: 'takeGlobalCursor',
 *     key: 'dataZoomSelect', or 'brush', or ...,
 *         If no userKey, release global cursor.
 * }
 */


echarts.registerAction({
  type: 'takeGlobalCursor',
  event: 'globalCursorTaken',
  update: 'update'
}, function () {});
exports.take = take;
exports.release = release;
exports.isTaken = isTaken;

/***/ }),

/***/ "bd9e":
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

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__("6d8b");

var graphic = __webpack_require__("2306");

var modelUtil = __webpack_require__("e0d3");

var brushHelper = __webpack_require__("f4a2");

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
var each = zrUtil.each;
var indexOf = zrUtil.indexOf;
var curry = zrUtil.curry;
var COORD_CONVERTS = ['dataToPoint', 'pointToData']; // FIXME
// how to genarialize to more coordinate systems.

var INCLUDE_FINDER_MAIN_TYPES = ['grid', 'xAxis', 'yAxis', 'geo', 'graph', 'polar', 'radiusAxis', 'angleAxis', 'bmap'];
/**
 * [option in constructor]:
 * {
 *     Index/Id/Name of geo, xAxis, yAxis, grid: See util/model#parseFinder.
 * }
 *
 *
 * [targetInfo]:
 *
 * There can be multiple axes in a single targetInfo. Consider the case
 * of `grid` component, a targetInfo represents a grid which contains one or more
 * cartesian and one or more axes. And consider the case of parallel system,
 * which has multiple axes in a coordinate system.
 * Can be {
 *     panelId: ...,
 *     coordSys: <a representitive cartesian in grid (first cartesian by default)>,
 *     coordSyses: all cartesians.
 *     gridModel: <grid component>
 *     xAxes: correspond to coordSyses on index
 *     yAxes: correspond to coordSyses on index
 * }
 * or {
 *     panelId: ...,
 *     coordSys: <geo coord sys>
 *     coordSyses: [<geo coord sys>]
 *     geoModel: <geo component>
 * }
 *
 *
 * [panelOpt]:
 *
 * Make from targetInfo. Input to BrushController.
 * {
 *     panelId: ...,
 *     rect: ...
 * }
 *
 *
 * [area]:
 *
 * Generated by BrushController or user input.
 * {
 *     panelId: Used to locate coordInfo directly. If user inpput, no panelId.
 *     brushType: determine how to convert to/from coord('rect' or 'polygon' or 'lineX/Y').
 *     Index/Id/Name of geo, xAxis, yAxis, grid: See util/model#parseFinder.
 *     range: pixel range.
 *     coordRange: representitive coord range (the first one of coordRanges).
 *     coordRanges: <Array> coord ranges, used in multiple cartesian in one grid.
 * }
 */

/**
 * @param {Object} option contains Index/Id/Name of xAxis/yAxis/geo/grid
 *        Each can be {number|Array.<number>}. like: {xAxisIndex: [3, 4]}
 * @param {module:echarts/model/Global} ecModel
 * @param {Object} [opt]
 * @param {Array.<string>} [opt.include] include coordinate system types.
 */

function BrushTargetManager(option, ecModel, opt) {
  /**
   * @private
   * @type {Array.<Object>}
   */
  var targetInfoList = this._targetInfoList = [];
  var info = {};
  var foundCpts = parseFinder(ecModel, option);
  each(targetInfoBuilders, function (builder, type) {
    if (!opt || !opt.include || indexOf(opt.include, type) >= 0) {
      builder(foundCpts, targetInfoList, info);
    }
  });
}

var proto = BrushTargetManager.prototype;

proto.setOutputRanges = function (areas, ecModel) {
  this.matchOutputRanges(areas, ecModel, function (area, coordRange, coordSys) {
    (area.coordRanges || (area.coordRanges = [])).push(coordRange); // area.coordRange is the first of area.coordRanges

    if (!area.coordRange) {
      area.coordRange = coordRange; // In 'category' axis, coord to pixel is not reversible, so we can not
      // rebuild range by coordRange accrately, which may bring trouble when
      // brushing only one item. So we use __rangeOffset to rebuilding range
      // by coordRange. And this it only used in brush component so it is no
      // need to be adapted to coordRanges.

      var result = coordConvert[area.brushType](0, coordSys, coordRange);
      area.__rangeOffset = {
        offset: diffProcessor[area.brushType](result.values, area.range, [1, 1]),
        xyMinMax: result.xyMinMax
      };
    }
  });
};

proto.matchOutputRanges = function (areas, ecModel, cb) {
  each(areas, function (area) {
    var targetInfo = this.findTargetInfo(area, ecModel);

    if (targetInfo && targetInfo !== true) {
      zrUtil.each(targetInfo.coordSyses, function (coordSys) {
        var result = coordConvert[area.brushType](1, coordSys, area.range);
        cb(area, result.values, coordSys, ecModel);
      });
    }
  }, this);
};

proto.setInputRanges = function (areas, ecModel) {
  each(areas, function (area) {
    var targetInfo = this.findTargetInfo(area, ecModel);
    area.range = area.range || []; // convert coordRange to global range and set panelId.

    if (targetInfo && targetInfo !== true) {
      area.panelId = targetInfo.panelId; // (1) area.range shoule always be calculate from coordRange but does
      // not keep its original value, for the sake of the dataZoom scenario,
      // where area.coordRange remains unchanged but area.range may be changed.
      // (2) Only support converting one coordRange to pixel range in brush
      // component. So do not consider `coordRanges`.
      // (3) About __rangeOffset, see comment above.

      var result = coordConvert[area.brushType](0, targetInfo.coordSys, area.coordRange);
      var rangeOffset = area.__rangeOffset;
      area.range = rangeOffset ? diffProcessor[area.brushType](result.values, rangeOffset.offset, getScales(result.xyMinMax, rangeOffset.xyMinMax)) : result.values;
    }
  }, this);
};

proto.makePanelOpts = function (api, getDefaultBrushType) {
  return zrUtil.map(this._targetInfoList, function (targetInfo) {
    var rect = targetInfo.getPanelRect();
    return {
      panelId: targetInfo.panelId,
      defaultBrushType: getDefaultBrushType && getDefaultBrushType(targetInfo),
      clipPath: brushHelper.makeRectPanelClipPath(rect),
      isTargetByCursor: brushHelper.makeRectIsTargetByCursor(rect, api, targetInfo.coordSysModel),
      getLinearBrushOtherExtent: brushHelper.makeLinearBrushOtherExtent(rect)
    };
  });
};

proto.controlSeries = function (area, seriesModel, ecModel) {
  // Check whether area is bound in coord, and series do not belong to that coord.
  // If do not do this check, some brush (like lineX) will controll all axes.
  var targetInfo = this.findTargetInfo(area, ecModel);
  return targetInfo === true || targetInfo && indexOf(targetInfo.coordSyses, seriesModel.coordinateSystem) >= 0;
};
/**
 * If return Object, a coord found.
 * If reutrn true, global found.
 * Otherwise nothing found.
 *
 * @param {Object} area
 * @param {Array} targetInfoList
 * @return {Object|boolean}
 */


proto.findTargetInfo = function (area, ecModel) {
  var targetInfoList = this._targetInfoList;
  var foundCpts = parseFinder(ecModel, area);

  for (var i = 0; i < targetInfoList.length; i++) {
    var targetInfo = targetInfoList[i];
    var areaPanelId = area.panelId;

    if (areaPanelId) {
      if (targetInfo.panelId === areaPanelId) {
        return targetInfo;
      }
    } else {
      for (var i = 0; i < targetInfoMatchers.length; i++) {
        if (targetInfoMatchers[i](foundCpts, targetInfo)) {
          return targetInfo;
        }
      }
    }
  }

  return true;
};

function formatMinMax(minMax) {
  minMax[0] > minMax[1] && minMax.reverse();
  return minMax;
}

function parseFinder(ecModel, option) {
  return modelUtil.parseFinder(ecModel, option, {
    includeMainTypes: INCLUDE_FINDER_MAIN_TYPES
  });
}

var targetInfoBuilders = {
  grid: function (foundCpts, targetInfoList) {
    var xAxisModels = foundCpts.xAxisModels;
    var yAxisModels = foundCpts.yAxisModels;
    var gridModels = foundCpts.gridModels; // Remove duplicated.

    var gridModelMap = zrUtil.createHashMap();
    var xAxesHas = {};
    var yAxesHas = {};

    if (!xAxisModels && !yAxisModels && !gridModels) {
      return;
    }

    each(xAxisModels, function (axisModel) {
      var gridModel = axisModel.axis.grid.model;
      gridModelMap.set(gridModel.id, gridModel);
      xAxesHas[gridModel.id] = true;
    });
    each(yAxisModels, function (axisModel) {
      var gridModel = axisModel.axis.grid.model;
      gridModelMap.set(gridModel.id, gridModel);
      yAxesHas[gridModel.id] = true;
    });
    each(gridModels, function (gridModel) {
      gridModelMap.set(gridModel.id, gridModel);
      xAxesHas[gridModel.id] = true;
      yAxesHas[gridModel.id] = true;
    });
    gridModelMap.each(function (gridModel) {
      var grid = gridModel.coordinateSystem;
      var cartesians = [];
      each(grid.getCartesians(), function (cartesian, index) {
        if (indexOf(xAxisModels, cartesian.getAxis('x').model) >= 0 || indexOf(yAxisModels, cartesian.getAxis('y').model) >= 0) {
          cartesians.push(cartesian);
        }
      });
      targetInfoList.push({
        panelId: 'grid--' + gridModel.id,
        gridModel: gridModel,
        coordSysModel: gridModel,
        // Use the first one as the representitive coordSys.
        coordSys: cartesians[0],
        coordSyses: cartesians,
        getPanelRect: panelRectBuilder.grid,
        xAxisDeclared: xAxesHas[gridModel.id],
        yAxisDeclared: yAxesHas[gridModel.id]
      });
    });
  },
  geo: function (foundCpts, targetInfoList) {
    each(foundCpts.geoModels, function (geoModel) {
      var coordSys = geoModel.coordinateSystem;
      targetInfoList.push({
        panelId: 'geo--' + geoModel.id,
        geoModel: geoModel,
        coordSysModel: geoModel,
        coordSys: coordSys,
        coordSyses: [coordSys],
        getPanelRect: panelRectBuilder.geo
      });
    });
  }
};
var targetInfoMatchers = [// grid
function (foundCpts, targetInfo) {
  var xAxisModel = foundCpts.xAxisModel;
  var yAxisModel = foundCpts.yAxisModel;
  var gridModel = foundCpts.gridModel;
  !gridModel && xAxisModel && (gridModel = xAxisModel.axis.grid.model);
  !gridModel && yAxisModel && (gridModel = yAxisModel.axis.grid.model);
  return gridModel && gridModel === targetInfo.gridModel;
}, // geo
function (foundCpts, targetInfo) {
  var geoModel = foundCpts.geoModel;
  return geoModel && geoModel === targetInfo.geoModel;
}];
var panelRectBuilder = {
  grid: function () {
    // grid is not Transformable.
    return this.coordSys.grid.getRect().clone();
  },
  geo: function () {
    var coordSys = this.coordSys;
    var rect = coordSys.getBoundingRect().clone(); // geo roam and zoom transform

    rect.applyTransform(graphic.getTransform(coordSys));
    return rect;
  }
};
var coordConvert = {
  lineX: curry(axisConvert, 0),
  lineY: curry(axisConvert, 1),
  rect: function (to, coordSys, rangeOrCoordRange) {
    var xminymin = coordSys[COORD_CONVERTS[to]]([rangeOrCoordRange[0][0], rangeOrCoordRange[1][0]]);
    var xmaxymax = coordSys[COORD_CONVERTS[to]]([rangeOrCoordRange[0][1], rangeOrCoordRange[1][1]]);
    var values = [formatMinMax([xminymin[0], xmaxymax[0]]), formatMinMax([xminymin[1], xmaxymax[1]])];
    return {
      values: values,
      xyMinMax: values
    };
  },
  polygon: function (to, coordSys, rangeOrCoordRange) {
    var xyMinMax = [[Infinity, -Infinity], [Infinity, -Infinity]];
    var values = zrUtil.map(rangeOrCoordRange, function (item) {
      var p = coordSys[COORD_CONVERTS[to]](item);
      xyMinMax[0][0] = Math.min(xyMinMax[0][0], p[0]);
      xyMinMax[1][0] = Math.min(xyMinMax[1][0], p[1]);
      xyMinMax[0][1] = Math.max(xyMinMax[0][1], p[0]);
      xyMinMax[1][1] = Math.max(xyMinMax[1][1], p[1]);
      return p;
    });
    return {
      values: values,
      xyMinMax: xyMinMax
    };
  }
};

function axisConvert(axisNameIndex, to, coordSys, rangeOrCoordRange) {
  var axis = coordSys.getAxis(['x', 'y'][axisNameIndex]);
  var values = formatMinMax(zrUtil.map([0, 1], function (i) {
    return to ? axis.coordToData(axis.toLocalCoord(rangeOrCoordRange[i])) : axis.toGlobalCoord(axis.dataToCoord(rangeOrCoordRange[i]));
  }));
  var xyMinMax = [];
  xyMinMax[axisNameIndex] = values;
  xyMinMax[1 - axisNameIndex] = [NaN, NaN];
  return {
    values: values,
    xyMinMax: xyMinMax
  };
}

var diffProcessor = {
  lineX: curry(axisDiffProcessor, 0),
  lineY: curry(axisDiffProcessor, 1),
  rect: function (values, refer, scales) {
    return [[values[0][0] - scales[0] * refer[0][0], values[0][1] - scales[0] * refer[0][1]], [values[1][0] - scales[1] * refer[1][0], values[1][1] - scales[1] * refer[1][1]]];
  },
  polygon: function (values, refer, scales) {
    return zrUtil.map(values, function (item, idx) {
      return [item[0] - scales[0] * refer[idx][0], item[1] - scales[1] * refer[idx][1]];
    });
  }
};

function axisDiffProcessor(axisNameIndex, values, refer, scales) {
  return [values[0] - scales[axisNameIndex] * refer[0], values[1] - scales[axisNameIndex] * refer[1]];
} // We have to process scale caused by dataZoom manually,
// although it might be not accurate.


function getScales(xyMinMaxCurr, xyMinMaxOrigin) {
  var sizeCurr = getSize(xyMinMaxCurr);
  var sizeOrigin = getSize(xyMinMaxOrigin);
  var scales = [sizeCurr[0] / sizeOrigin[0], sizeCurr[1] / sizeOrigin[1]];
  isNaN(scales[0]) && (scales[0] = 1);
  isNaN(scales[1]) && (scales[1] = 1);
  return scales;
}

function getSize(xyMinMax) {
  return xyMinMax ? [xyMinMax[0][1] - xyMinMax[0][0], xyMinMax[1][1] - xyMinMax[1][0]] : [NaN, NaN];
}

var _default = BrushTargetManager;
module.exports = _default;

/***/ }),

/***/ "c526":
/***/ (function(module, exports) {


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
var IRRELEVANT_EXCLUDES = {
  'axisPointer': 1,
  'tooltip': 1,
  'brush': 1
};
/**
 * Avoid that: mouse click on a elements that is over geo or graph,
 * but roam is triggered.
 */

function onIrrelevantElement(e, api, targetCoordSysModel) {
  var model = api.getComponentByElement(e.topTarget); // If model is axisModel, it works only if it is injected with coordinateSystem.

  var coordSys = model && model.coordinateSystem;
  return model && model !== targetCoordSysModel && !IRRELEVANT_EXCLUDES[model.mainType] && coordSys && coordSys.model !== targetCoordSysModel;
}

exports.onIrrelevantElement = onIrrelevantElement;

/***/ }),

/***/ "ef6a":
/***/ (function(module, exports) {


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
 * Calculate slider move result.
 * Usage:
 * (1) If both handle0 and handle1 are needed to be moved, set minSpan the same as
 * maxSpan and the same as `Math.abs(handleEnd[1] - handleEnds[0])`.
 * (2) If handle0 is forbidden to cross handle1, set minSpan as `0`.
 *
 * @param {number} delta Move length.
 * @param {Array.<number>} handleEnds handleEnds[0] can be bigger then handleEnds[1].
 *              handleEnds will be modified in this method.
 * @param {Array.<number>} extent handleEnds is restricted by extent.
 *              extent[0] should less or equals than extent[1].
 * @param {number|string} handleIndex Can be 'all', means that both move the two handleEnds.
 * @param {number} [minSpan] The range of dataZoom can not be smaller than that.
 *              If not set, handle0 and cross handle1. If set as a non-negative
 *              number (including `0`), handles will push each other when reaching
 *              the minSpan.
 * @param {number} [maxSpan] The range of dataZoom can not be larger than that.
 * @return {Array.<number>} The input handleEnds.
 */
function _default(delta, handleEnds, extent, handleIndex, minSpan, maxSpan) {
  delta = delta || 0;
  var extentSpan = extent[1] - extent[0]; // Notice maxSpan and minSpan can be null/undefined.

  if (minSpan != null) {
    minSpan = restrict(minSpan, [0, extentSpan]);
  }

  if (maxSpan != null) {
    maxSpan = Math.max(maxSpan, minSpan != null ? minSpan : 0);
  }

  if (handleIndex === 'all') {
    var handleSpan = Math.abs(handleEnds[1] - handleEnds[0]);
    handleSpan = restrict(handleSpan, [0, extentSpan]);
    minSpan = maxSpan = restrict(handleSpan, [minSpan, maxSpan]);
    handleIndex = 0;
  }

  handleEnds[0] = restrict(handleEnds[0], extent);
  handleEnds[1] = restrict(handleEnds[1], extent);
  var originalDistSign = getSpanSign(handleEnds, handleIndex);
  handleEnds[handleIndex] += delta; // Restrict in extent.

  var extentMinSpan = minSpan || 0;
  var realExtent = extent.slice();
  originalDistSign.sign < 0 ? realExtent[0] += extentMinSpan : realExtent[1] -= extentMinSpan;
  handleEnds[handleIndex] = restrict(handleEnds[handleIndex], realExtent); // Expand span.

  var currDistSign = getSpanSign(handleEnds, handleIndex);

  if (minSpan != null && (currDistSign.sign !== originalDistSign.sign || currDistSign.span < minSpan)) {
    // If minSpan exists, 'cross' is forbidden.
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + originalDistSign.sign * minSpan;
  } // Shrink span.


  var currDistSign = getSpanSign(handleEnds, handleIndex);

  if (maxSpan != null && currDistSign.span > maxSpan) {
    handleEnds[1 - handleIndex] = handleEnds[handleIndex] + currDistSign.sign * maxSpan;
  }

  return handleEnds;
}

function getSpanSign(handleEnds, handleIndex) {
  var dist = handleEnds[handleIndex] - handleEnds[1 - handleIndex]; // If `handleEnds[0] === handleEnds[1]`, always believe that handleEnd[0]
  // is at left of handleEnds[1] for non-cross case.

  return {
    span: Math.abs(dist),
    sign: dist > 0 ? -1 : dist < 0 ? 1 : handleIndex ? -1 : 1
  };
}

function restrict(value, extend) {
  return Math.min(extend[1] != null ? extend[1] : Infinity, Math.max(extend[0] != null ? extend[0] : -Infinity, value));
}

module.exports = _default;

/***/ }),

/***/ "f4a2":
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

var BoundingRect = __webpack_require__("9850");

var _cursorHelper = __webpack_require__("c526");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphicUtil = __webpack_require__("2306");

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
function makeRectPanelClipPath(rect) {
  rect = normalizeRect(rect);
  return function (localPoints, transform) {
    return graphicUtil.clipPointsByRect(localPoints, rect);
  };
}

function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
  rect = normalizeRect(rect);
  return function (xyIndex) {
    var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
    var brushWidth = idx ? rect.width : rect.height;
    var base = idx ? rect.x : rect.y;
    return [base, base + (brushWidth || 0)];
  };
}

function makeRectIsTargetByCursor(rect, api, targetModel) {
  rect = normalizeRect(rect);
  return function (e, localCursorPoint, transform) {
    return rect.contain(localCursorPoint[0], localCursorPoint[1]) && !onIrrelevantElement(e, api, targetModel);
  };
} // Consider width/height is negative.


function normalizeRect(rect) {
  return BoundingRect.create(rect);
}

exports.makeRectPanelClipPath = makeRectPanelClipPath;
exports.makeLinearBrushOtherExtent = makeLinearBrushOtherExtent;
exports.makeRectIsTargetByCursor = makeRectIsTargetByCursor;

/***/ }),

/***/ "fc82":
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

var _config = __webpack_require__("4e08");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__("6d8b");

var Eventful = __webpack_require__("1fab");

var graphic = __webpack_require__("2306");

var interactionMutex = __webpack_require__("a4fe");

var DataDiffer = __webpack_require__("80f0");

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
var curry = zrUtil.curry;
var each = zrUtil.each;
var map = zrUtil.map;
var mathMin = Math.min;
var mathMax = Math.max;
var mathPow = Math.pow;
var COVER_Z = 10000;
var UNSELECT_THRESHOLD = 6;
var MIN_RESIZE_LINE_WIDTH = 6;
var MUTEX_RESOURCE_KEY = 'globalPan';
var DIRECTION_MAP = {
  w: [0, 0],
  e: [0, 1],
  n: [1, 0],
  s: [1, 1]
};
var CURSOR_MAP = {
  w: 'ew',
  e: 'ew',
  n: 'ns',
  s: 'ns',
  ne: 'nesw',
  sw: 'nesw',
  nw: 'nwse',
  se: 'nwse'
};
var DEFAULT_BRUSH_OPT = {
  brushStyle: {
    lineWidth: 2,
    stroke: 'rgba(0,0,0,0.3)',
    fill: 'rgba(0,0,0,0.1)'
  },
  transformable: true,
  brushMode: 'single',
  removeOnClick: false
};
var baseUID = 0;
/**
 * @alias module:echarts/component/helper/BrushController
 * @constructor
 * @mixin {module:zrender/mixin/Eventful}
 * @event module:echarts/component/helper/BrushController#brush
 *        params:
 *            areas: Array.<Array>, coord relates to container group,
 *                                    If no container specified, to global.
 *            opt {
 *                isEnd: boolean,
 *                removeOnClick: boolean
 *            }
 *
 * @param {module:zrender/zrender~ZRender} zr
 */

function BrushController(zr) {
  Eventful.call(this);
  /**
   * @type {module:zrender/zrender~ZRender}
   * @private
   */

  this._zr = zr;
  /**
   * @type {module:zrender/container/Group}
   * @readOnly
   */

  this.group = new graphic.Group();
  /**
   * Only for drawing (after enabledBrush).
   *     'line', 'rect', 'polygon' or false
   *     If passing false/null/undefined, disable brush.
   *     If passing 'auto', determined by panel.defaultBrushType
   * @private
   * @type {string}
   */

  this._brushType;
  /**
   * Only for drawing (after enabledBrush).
   *
   * @private
   * @type {Object}
   */

  this._brushOption;
  /**
   * @private
   * @type {Object}
   */

  this._panels;
  /**
   * @private
   * @type {Array.<nubmer>}
   */

  this._track = [];
  /**
   * @private
   * @type {boolean}
   */

  this._dragging;
  /**
   * @private
   * @type {Array}
   */

  this._covers = [];
  /**
   * @private
   * @type {moudule:zrender/container/Group}
   */

  this._creatingCover;
  /**
   * `true` means global panel
   * @private
   * @type {module:zrender/container/Group|boolean}
   */

  this._creatingPanel;
  /**
   * @private
   * @type {boolean}
   */

  this._enableGlobalPan;
  /**
   * @private
   * @type {boolean}
   */

  /**
   * @private
   * @type {string}
   */
  this._uid = 'brushController_' + baseUID++;
  /**
   * @private
   * @type {Object}
   */

  this._handlers = {};
  each(pointerHandlers, function (handler, eventName) {
    this._handlers[eventName] = zrUtil.bind(handler, this);
  }, this);
}

BrushController.prototype = {
  constructor: BrushController,

  /**
   * If set to null/undefined/false, select disabled.
   * @param {Object} brushOption
   * @param {string|boolean} brushOption.brushType 'line', 'rect', 'polygon' or false
   *                          If passing false/null/undefined, disable brush.
   *                          If passing 'auto', determined by panel.defaultBrushType.
   *                              ('auto' can not be used in global panel)
   * @param {number} [brushOption.brushMode='single'] 'single' or 'multiple'
   * @param {boolean} [brushOption.transformable=true]
   * @param {boolean} [brushOption.removeOnClick=false]
   * @param {Object} [brushOption.brushStyle]
   * @param {number} [brushOption.brushStyle.width]
   * @param {number} [brushOption.brushStyle.lineWidth]
   * @param {string} [brushOption.brushStyle.stroke]
   * @param {string} [brushOption.brushStyle.fill]
   * @param {number} [brushOption.z]
   */
  enableBrush: function (brushOption) {
    this._brushType && doDisableBrush(this);
    brushOption.brushType && doEnableBrush(this, brushOption);
    return this;
  },

  /**
   * @param {Array.<Object>} panelOpts If not pass, it is global brush.
   *        Each items: {
   *            panelId, // mandatory.
   *            clipPath, // mandatory. function.
   *            isTargetByCursor, // mandatory. function.
   *            defaultBrushType, // optional, only used when brushType is 'auto'.
   *            getLinearBrushOtherExtent, // optional. function.
   *        }
   */
  setPanels: function (panelOpts) {
    if (panelOpts && panelOpts.length) {
      var panels = this._panels = {};
      zrUtil.each(panelOpts, function (panelOpts) {
        panels[panelOpts.panelId] = zrUtil.clone(panelOpts);
      });
    } else {
      this._panels = null;
    }

    return this;
  },

  /**
   * @param {Object} [opt]
   * @return {boolean} [opt.enableGlobalPan=false]
   */
  mount: function (opt) {
    opt = opt || {};
    this._enableGlobalPan = opt.enableGlobalPan;
    var thisGroup = this.group;

    this._zr.add(thisGroup);

    thisGroup.attr({
      position: opt.position || [0, 0],
      rotation: opt.rotation || 0,
      scale: opt.scale || [1, 1]
    });
    this._transform = thisGroup.getLocalTransform();
    return this;
  },
  eachCover: function (cb, context) {
    each(this._covers, cb, context);
  },

  /**
   * Update covers.
   * @param {Array.<Object>} brushOptionList Like:
   *        [
   *            {id: 'xx', brushType: 'line', range: [23, 44], brushStyle, transformable},
   *            {id: 'yy', brushType: 'rect', range: [[23, 44], [23, 54]]},
   *            ...
   *        ]
   *        `brushType` is required in each cover info. (can not be 'auto')
   *        `id` is not mandatory.
   *        `brushStyle`, `transformable` is not mandatory, use DEFAULT_BRUSH_OPT by default.
   *        If brushOptionList is null/undefined, all covers removed.
   */
  updateCovers: function (brushOptionList) {
    brushOptionList = zrUtil.map(brushOptionList, function (brushOption) {
      return zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
    });
    var tmpIdPrefix = '\0-brush-index-';
    var oldCovers = this._covers;
    var newCovers = this._covers = [];
    var controller = this;
    var creatingCover = this._creatingCover;
    new DataDiffer(oldCovers, brushOptionList, oldGetKey, getKey).add(addOrUpdate).update(addOrUpdate).remove(remove).execute();
    return this;

    function getKey(brushOption, index) {
      return (brushOption.id != null ? brushOption.id : tmpIdPrefix + index) + '-' + brushOption.brushType;
    }

    function oldGetKey(cover, index) {
      return getKey(cover.__brushOption, index);
    }

    function addOrUpdate(newIndex, oldIndex) {
      var newBrushOption = brushOptionList[newIndex]; // Consider setOption in event listener of brushSelect,
      // where updating cover when creating should be forbiden.

      if (oldIndex != null && oldCovers[oldIndex] === creatingCover) {
        newCovers[newIndex] = oldCovers[oldIndex];
      } else {
        var cover = newCovers[newIndex] = oldIndex != null ? (oldCovers[oldIndex].__brushOption = newBrushOption, oldCovers[oldIndex]) : endCreating(controller, createCover(controller, newBrushOption));
        updateCoverAfterCreation(controller, cover);
      }
    }

    function remove(oldIndex) {
      if (oldCovers[oldIndex] !== creatingCover) {
        controller.group.remove(oldCovers[oldIndex]);
      }
    }
  },
  unmount: function () {
    this.enableBrush(false); // container may 'removeAll' outside.

    clearCovers(this);

    this._zr.remove(this.group);

    return this;
  },
  dispose: function () {
    this.unmount();
    this.off();
  }
};
zrUtil.mixin(BrushController, Eventful);

function doEnableBrush(controller, brushOption) {
  var zr = controller._zr; // Consider roam, which takes globalPan too.

  if (!controller._enableGlobalPan) {
    interactionMutex.take(zr, MUTEX_RESOURCE_KEY, controller._uid);
  }

  mountHandlers(zr, controller._handlers);
  controller._brushType = brushOption.brushType;
  controller._brushOption = zrUtil.merge(zrUtil.clone(DEFAULT_BRUSH_OPT), brushOption, true);
}

function doDisableBrush(controller) {
  var zr = controller._zr;
  interactionMutex.release(zr, MUTEX_RESOURCE_KEY, controller._uid);
  unmountHandlers(zr, controller._handlers);
  controller._brushType = controller._brushOption = null;
}

function mountHandlers(zr, handlers) {
  each(handlers, function (handler, eventName) {
    zr.on(eventName, handler);
  });
}

function unmountHandlers(zr, handlers) {
  each(handlers, function (handler, eventName) {
    zr.off(eventName, handler);
  });
}

function createCover(controller, brushOption) {
  var cover = coverRenderers[brushOption.brushType].createCover(controller, brushOption);
  cover.__brushOption = brushOption;
  updateZ(cover, brushOption);
  controller.group.add(cover);
  return cover;
}

function endCreating(controller, creatingCover) {
  var coverRenderer = getCoverRenderer(creatingCover);

  if (coverRenderer.endCreating) {
    coverRenderer.endCreating(controller, creatingCover);
    updateZ(creatingCover, creatingCover.__brushOption);
  }

  return creatingCover;
}

function updateCoverShape(controller, cover) {
  var brushOption = cover.__brushOption;
  getCoverRenderer(cover).updateCoverShape(controller, cover, brushOption.range, brushOption);
}

function updateZ(cover, brushOption) {
  var z = brushOption.z;
  z == null && (z = COVER_Z);
  cover.traverse(function (el) {
    el.z = z;
    el.z2 = z; // Consider in given container.
  });
}

function updateCoverAfterCreation(controller, cover) {
  getCoverRenderer(cover).updateCommon(controller, cover);
  updateCoverShape(controller, cover);
}

function getCoverRenderer(cover) {
  return coverRenderers[cover.__brushOption.brushType];
} // return target panel or `true` (means global panel)


function getPanelByPoint(controller, e, localCursorPoint) {
  var panels = controller._panels;

  if (!panels) {
    return true; // Global panel
  }

  var panel;
  var transform = controller._transform;
  each(panels, function (pn) {
    pn.isTargetByCursor(e, localCursorPoint, transform) && (panel = pn);
  });
  return panel;
} // Return a panel or true


function getPanelByCover(controller, cover) {
  var panels = controller._panels;

  if (!panels) {
    return true; // Global panel
  }

  var panelId = cover.__brushOption.panelId; // User may give cover without coord sys info,
  // which is then treated as global panel.

  return panelId != null ? panels[panelId] : true;
}

function clearCovers(controller) {
  var covers = controller._covers;
  var originalLength = covers.length;
  each(covers, function (cover) {
    controller.group.remove(cover);
  }, controller);
  covers.length = 0;
  return !!originalLength;
}

function trigger(controller, opt) {
  var areas = map(controller._covers, function (cover) {
    var brushOption = cover.__brushOption;
    var range = zrUtil.clone(brushOption.range);
    return {
      brushType: brushOption.brushType,
      panelId: brushOption.panelId,
      range: range
    };
  });
  controller.trigger('brush', areas, {
    isEnd: !!opt.isEnd,
    removeOnClick: !!opt.removeOnClick
  });
}

function shouldShowCover(controller) {
  var track = controller._track;

  if (!track.length) {
    return false;
  }

  var p2 = track[track.length - 1];
  var p1 = track[0];
  var dx = p2[0] - p1[0];
  var dy = p2[1] - p1[1];
  var dist = mathPow(dx * dx + dy * dy, 0.5);
  return dist > UNSELECT_THRESHOLD;
}

function getTrackEnds(track) {
  var tail = track.length - 1;
  tail < 0 && (tail = 0);
  return [track[0], track[tail]];
}

function createBaseRectCover(doDrift, controller, brushOption, edgeNames) {
  var cover = new graphic.Group();
  cover.add(new graphic.Rect({
    name: 'main',
    style: makeStyle(brushOption),
    silent: true,
    draggable: true,
    cursor: 'move',
    drift: curry(doDrift, controller, cover, 'nswe'),
    ondragend: curry(trigger, controller, {
      isEnd: true
    })
  }));
  each(edgeNames, function (name) {
    cover.add(new graphic.Rect({
      name: name,
      style: {
        opacity: 0
      },
      draggable: true,
      silent: true,
      invisible: true,
      drift: curry(doDrift, controller, cover, name),
      ondragend: curry(trigger, controller, {
        isEnd: true
      })
    }));
  });
  return cover;
}

function updateBaseRect(controller, cover, localRange, brushOption) {
  var lineWidth = brushOption.brushStyle.lineWidth || 0;
  var handleSize = mathMax(lineWidth, MIN_RESIZE_LINE_WIDTH);
  var x = localRange[0][0];
  var y = localRange[1][0];
  var xa = x - lineWidth / 2;
  var ya = y - lineWidth / 2;
  var x2 = localRange[0][1];
  var y2 = localRange[1][1];
  var x2a = x2 - handleSize + lineWidth / 2;
  var y2a = y2 - handleSize + lineWidth / 2;
  var width = x2 - x;
  var height = y2 - y;
  var widtha = width + lineWidth;
  var heighta = height + lineWidth;
  updateRectShape(controller, cover, 'main', x, y, width, height);

  if (brushOption.transformable) {
    updateRectShape(controller, cover, 'w', xa, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'e', x2a, ya, handleSize, heighta);
    updateRectShape(controller, cover, 'n', xa, ya, widtha, handleSize);
    updateRectShape(controller, cover, 's', xa, y2a, widtha, handleSize);
    updateRectShape(controller, cover, 'nw', xa, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'ne', x2a, ya, handleSize, handleSize);
    updateRectShape(controller, cover, 'sw', xa, y2a, handleSize, handleSize);
    updateRectShape(controller, cover, 'se', x2a, y2a, handleSize, handleSize);
  }
}

function updateCommon(controller, cover) {
  var brushOption = cover.__brushOption;
  var transformable = brushOption.transformable;
  var mainEl = cover.childAt(0);
  mainEl.useStyle(makeStyle(brushOption));
  mainEl.attr({
    silent: !transformable,
    cursor: transformable ? 'move' : 'default'
  });
  each(['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw'], function (name) {
    var el = cover.childOfName(name);
    var globalDir = getGlobalDirection(controller, name);
    el && el.attr({
      silent: !transformable,
      invisible: !transformable,
      cursor: transformable ? CURSOR_MAP[globalDir] + '-resize' : null
    });
  });
}

function updateRectShape(controller, cover, name, x, y, w, h) {
  var el = cover.childOfName(name);
  el && el.setShape(pointsToRect(clipByPanel(controller, cover, [[x, y], [x + w, y + h]])));
}

function makeStyle(brushOption) {
  return zrUtil.defaults({
    strokeNoScale: true
  }, brushOption.brushStyle);
}

function formatRectRange(x, y, x2, y2) {
  var min = [mathMin(x, x2), mathMin(y, y2)];
  var max = [mathMax(x, x2), mathMax(y, y2)];
  return [[min[0], max[0]], // x range
  [min[1], max[1]] // y range
  ];
}

function getTransform(controller) {
  return graphic.getTransform(controller.group);
}

function getGlobalDirection(controller, localDirection) {
  if (localDirection.length > 1) {
    localDirection = localDirection.split('');
    var globalDir = [getGlobalDirection(controller, localDirection[0]), getGlobalDirection(controller, localDirection[1])];
    (globalDir[0] === 'e' || globalDir[0] === 'w') && globalDir.reverse();
    return globalDir.join('');
  } else {
    var map = {
      w: 'left',
      e: 'right',
      n: 'top',
      s: 'bottom'
    };
    var inverseMap = {
      left: 'w',
      right: 'e',
      top: 'n',
      bottom: 's'
    };
    var globalDir = graphic.transformDirection(map[localDirection], getTransform(controller));
    return inverseMap[globalDir];
  }
}

function driftRect(toRectRange, fromRectRange, controller, cover, name, dx, dy, e) {
  var brushOption = cover.__brushOption;
  var rectRange = toRectRange(brushOption.range);
  var localDelta = toLocalDelta(controller, dx, dy);
  each(name.split(''), function (namePart) {
    var ind = DIRECTION_MAP[namePart];
    rectRange[ind[0]][ind[1]] += localDelta[ind[0]];
  });
  brushOption.range = fromRectRange(formatRectRange(rectRange[0][0], rectRange[1][0], rectRange[0][1], rectRange[1][1]));
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}

function driftPolygon(controller, cover, dx, dy, e) {
  var range = cover.__brushOption.range;
  var localDelta = toLocalDelta(controller, dx, dy);
  each(range, function (point) {
    point[0] += localDelta[0];
    point[1] += localDelta[1];
  });
  updateCoverAfterCreation(controller, cover);
  trigger(controller, {
    isEnd: false
  });
}

function toLocalDelta(controller, dx, dy) {
  var thisGroup = controller.group;
  var localD = thisGroup.transformCoordToLocal(dx, dy);
  var localZero = thisGroup.transformCoordToLocal(0, 0);
  return [localD[0] - localZero[0], localD[1] - localZero[1]];
}

function clipByPanel(controller, cover, data) {
  var panel = getPanelByCover(controller, cover);
  return panel && panel !== true ? panel.clipPath(data, controller._transform) : zrUtil.clone(data);
}

function pointsToRect(points) {
  var xmin = mathMin(points[0][0], points[1][0]);
  var ymin = mathMin(points[0][1], points[1][1]);
  var xmax = mathMax(points[0][0], points[1][0]);
  var ymax = mathMax(points[0][1], points[1][1]);
  return {
    x: xmin,
    y: ymin,
    width: xmax - xmin,
    height: ymax - ymin
  };
}

function resetCursor(controller, e, localCursorPoint) {
  if ( // Check active
  !controller._brushType // resetCursor should be always called when mouse is in zr area,
  // but not called when mouse is out of zr area to avoid bad influence
  // if `mousemove`, `mouseup` are triggered from `document` event.
  || isOutsideZrArea(controller, e)) {
    return;
  }

  var zr = controller._zr;
  var covers = controller._covers;
  var currPanel = getPanelByPoint(controller, e, localCursorPoint); // Check whether in covers.

  if (!controller._dragging) {
    for (var i = 0; i < covers.length; i++) {
      var brushOption = covers[i].__brushOption;

      if (currPanel && (currPanel === true || brushOption.panelId === currPanel.panelId) && coverRenderers[brushOption.brushType].contain(covers[i], localCursorPoint[0], localCursorPoint[1])) {
        // Use cursor style set on cover.
        return;
      }
    }
  }

  currPanel && zr.setCursorStyle('crosshair');
}

function preventDefault(e) {
  var rawE = e.event;
  rawE.preventDefault && rawE.preventDefault();
}

function mainShapeContain(cover, x, y) {
  return cover.childOfName('main').contain(x, y);
}

function updateCoverByMouse(controller, e, localCursorPoint, isEnd) {
  var creatingCover = controller._creatingCover;
  var panel = controller._creatingPanel;
  var thisBrushOption = controller._brushOption;
  var eventParams;

  controller._track.push(localCursorPoint.slice());

  if (shouldShowCover(controller) || creatingCover) {
    if (panel && !creatingCover) {
      thisBrushOption.brushMode === 'single' && clearCovers(controller);
      var brushOption = zrUtil.clone(thisBrushOption);
      brushOption.brushType = determineBrushType(brushOption.brushType, panel);
      brushOption.panelId = panel === true ? null : panel.panelId;
      creatingCover = controller._creatingCover = createCover(controller, brushOption);

      controller._covers.push(creatingCover);
    }

    if (creatingCover) {
      var coverRenderer = coverRenderers[determineBrushType(controller._brushType, panel)];
      var coverBrushOption = creatingCover.__brushOption;
      coverBrushOption.range = coverRenderer.getCreatingRange(clipByPanel(controller, creatingCover, controller._track));

      if (isEnd) {
        endCreating(controller, creatingCover);
        coverRenderer.updateCommon(controller, creatingCover);
      }

      updateCoverShape(controller, creatingCover);
      eventParams = {
        isEnd: isEnd
      };
    }
  } else if (isEnd && thisBrushOption.brushMode === 'single' && thisBrushOption.removeOnClick) {
    // Help user to remove covers easily, only by a tiny drag, in 'single' mode.
    // But a single click do not clear covers, because user may have casual
    // clicks (for example, click on other component and do not expect covers
    // disappear).
    // Only some cover removed, trigger action, but not every click trigger action.
    if (getPanelByPoint(controller, e, localCursorPoint) && clearCovers(controller)) {
      eventParams = {
        isEnd: isEnd,
        removeOnClick: true
      };
    }
  }

  return eventParams;
}

function determineBrushType(brushType, panel) {
  if (brushType === 'auto') {
    return panel.defaultBrushType;
  }

  return brushType;
}

var pointerHandlers = {
  mousedown: function (e) {
    if (this._dragging) {
      // In case some browser do not support globalOut,
      // and release mose out side the browser.
      handleDragEnd(this, e);
    } else if (!e.target || !e.target.draggable) {
      preventDefault(e);
      var localCursorPoint = this.group.transformCoordToLocal(e.offsetX, e.offsetY);
      this._creatingCover = null;
      var panel = this._creatingPanel = getPanelByPoint(this, e, localCursorPoint);

      if (panel) {
        this._dragging = true;
        this._track = [localCursorPoint.slice()];
      }
    }
  },
  mousemove: function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = this.group.transformCoordToLocal(x, y);
    resetCursor(this, e, localCursorPoint);

    if (this._dragging) {
      preventDefault(e);
      var eventParams = updateCoverByMouse(this, e, localCursorPoint, false);
      eventParams && trigger(this, eventParams);
    }
  },
  mouseup: function (e) {
    handleDragEnd(this, e);
  }
};

function handleDragEnd(controller, e) {
  if (controller._dragging) {
    preventDefault(e);
    var x = e.offsetX;
    var y = e.offsetY;
    var localCursorPoint = controller.group.transformCoordToLocal(x, y);
    var eventParams = updateCoverByMouse(controller, e, localCursorPoint, true);
    controller._dragging = false;
    controller._track = [];
    controller._creatingCover = null; // trigger event shoule be at final, after procedure will be nested.

    eventParams && trigger(controller, eventParams);
  }
}

function isOutsideZrArea(controller, x, y) {
  var zr = controller._zr;
  return x < 0 || x > zr.getWidth() || y < 0 || y > zr.getHeight();
}
/**
 * key: brushType
 * @type {Object}
 */


var coverRenderers = {
  lineX: getLineRenderer(0),
  lineY: getLineRenderer(1),
  rect: {
    createCover: function (controller, brushOption) {
      return createBaseRectCover(curry(driftRect, function (range) {
        return range;
      }, function (range) {
        return range;
      }), controller, brushOption, ['w', 'e', 'n', 's', 'se', 'sw', 'ne', 'nw']);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      return formatRectRange(ends[1][0], ends[1][1], ends[0][0], ends[0][1]);
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      updateBaseRect(controller, cover, localRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  },
  polygon: {
    createCover: function (controller, brushOption) {
      var cover = new graphic.Group(); // Do not use graphic.Polygon because graphic.Polyline do not close the
      // border of the shape when drawing, which is a better experience for user.

      cover.add(new graphic.Polyline({
        name: 'main',
        style: makeStyle(brushOption),
        silent: true
      }));
      return cover;
    },
    getCreatingRange: function (localTrack) {
      return localTrack;
    },
    endCreating: function (controller, cover) {
      cover.remove(cover.childAt(0)); // Use graphic.Polygon close the shape.

      cover.add(new graphic.Polygon({
        name: 'main',
        draggable: true,
        drift: curry(driftPolygon, controller, cover),
        ondragend: curry(trigger, controller, {
          isEnd: true
        })
      }));
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      cover.childAt(0).setShape({
        points: clipByPanel(controller, cover, localRange)
      });
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  }
};

function getLineRenderer(xyIndex) {
  return {
    createCover: function (controller, brushOption) {
      return createBaseRectCover(curry(driftRect, function (range) {
        var rectRange = [range, [0, 100]];
        xyIndex && rectRange.reverse();
        return rectRange;
      }, function (rectRange) {
        return rectRange[xyIndex];
      }), controller, brushOption, [['w', 'e'], ['n', 's']][xyIndex]);
    },
    getCreatingRange: function (localTrack) {
      var ends = getTrackEnds(localTrack);
      var min = mathMin(ends[0][xyIndex], ends[1][xyIndex]);
      var max = mathMax(ends[0][xyIndex], ends[1][xyIndex]);
      return [min, max];
    },
    updateCoverShape: function (controller, cover, localRange, brushOption) {
      var otherExtent; // If brushWidth not specified, fit the panel.

      var panel = getPanelByCover(controller, cover);

      if (panel !== true && panel.getLinearBrushOtherExtent) {
        otherExtent = panel.getLinearBrushOtherExtent(xyIndex, controller._transform);
      } else {
        var zr = controller._zr;
        otherExtent = [0, [zr.getWidth(), zr.getHeight()][1 - xyIndex]];
      }

      var rectRange = [localRange, otherExtent];
      xyIndex && rectRange.reverse();
      updateBaseRect(controller, cover, rectRange, brushOption);
    },
    updateCommon: updateCommon,
    contain: mainShapeContain
  };
}

var _default = BrushController;
module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=chunk-vendors~88ded296.47f40194.js.map