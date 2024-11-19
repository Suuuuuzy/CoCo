(this["webpackJsonppopup"] = this["webpackJsonppopup"] || []).push([[3],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/components/Heatmap/Heatmap.module.css":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./src/components/Heatmap/Heatmap.module.css ***!
  \******************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".Heatmap_heatmap__3NBm4 {\n  height: 100%;\n  width: 100%;\n}\n\n.Heatmap_mapbox__2X6nq {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 7rem 8rem 3rem 8rem;\n  width: 100%;\n}\n\n.Heatmap_title__89O-b {\n  fill: rgb(51, 51, 51);\n  font-size: 22px;\n  font-weight: bold;\n  margin-top: 2rem;\n}\n", "",{"version":3,"sources":["webpack://src/components/Heatmap/Heatmap.module.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,4BAA4B;EAC5B,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,iBAAiB;EACjB,gBAAgB;AAClB","sourcesContent":[".heatmap {\n  height: 100%;\n  width: 100%;\n}\n\n.mapbox {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 7rem 8rem 3rem 8rem;\n  width: 100%;\n}\n\n.title {\n  fill: rgb(51, 51, 51);\n  font-size: 22px;\n  font-weight: bold;\n  margin-top: 2rem;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"heatmap": "Heatmap_heatmap__3NBm4",
	"mapbox": "Heatmap_mapbox__2X6nq",
	"title": "Heatmap_title__89O-b"
};
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/components/Coordinates/Coordinates.tsx":
/*!****************************************************!*\
  !*** ./src/components/Coordinates/Coordinates.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-mapbox-gl */ "./node_modules/react-mapbox-gl/lib-esm/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/sepehr/projects/my-snapp-extension/src/popup/src/components/Coordinates/Coordinates.tsx";



const Coordinates = ({
  paint,
  points
}) => {
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Layer"], {
    type: "heatmap",
    paint: paint,
    children: points.map((point, index) => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Feature"], {
      coordinates: [Number(point.lng), Number(point.lat)],
      properties: point
    }, index, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }, undefined))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Coordinates);

/***/ }),

/***/ "./src/components/Coordinates/index.ts":
/*!*********************************************!*\
  !*** ./src/components/Coordinates/index.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Coordinates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinates */ "./src/components/Coordinates/Coordinates.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Coordinates__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./src/components/Heatmap/Heatmap.module.css":
/*!***************************************************!*\
  !*** ./src/components/Heatmap/Heatmap.module.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-5-1!../../../node_modules/postcss-loader/src??postcss!./Heatmap.module.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/components/Heatmap/Heatmap.module.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/components/Heatmap/Heatmap.tsx":
/*!********************************************!*\
  !*** ./src/components/Heatmap/Heatmap.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_mapbox_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-mapbox-gl */ "./node_modules/react-mapbox-gl/lib-esm/index.js");
/* harmony import */ var utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/constants */ "./src/utils/constants.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/components/Heatmap/config.ts");
/* harmony import */ var components_Coordinates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Coordinates */ "./src/components/Coordinates/index.ts");
/* harmony import */ var _Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Heatmap.module.css */ "./src/components/Heatmap/Heatmap.module.css");
/* harmony import */ var _Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/sepehr/projects/my-snapp-extension/src/popup/src/components/Heatmap/Heatmap.tsx";







const mapStyle = {
  borderRadius: '4px',
  boxShadow: 'rgba(0, 209, 111, 0.5) 4px 4px 25px',
  flex: 1
};

const Heatmap = ({
  accessToken,
  points
}) => {
  const center = [53.688, 32.4279];
  const Mapbox = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_1__["default"])({
    accessToken
  }), [accessToken]);
  const {
    destination,
    origin
  } = points;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("div", {
    className: _Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.heatmap,
    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("div", {
      className: _Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.mapbox,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(Mapbox, {
        center: center,
        containerStyle: mapStyle,
        style: `mapbox://styles/mapbox/dark-v9`,
        zoom: [5],
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(components_Coordinates__WEBPACK_IMPORTED_MODULE_4__["default"], {
          paint: _config__WEBPACK_IMPORTED_MODULE_3__["originPaint"],
          points: origin
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 11
        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(components_Coordinates__WEBPACK_IMPORTED_MODULE_4__["default"], {
          paint: _config__WEBPACK_IMPORTED_MODULE_3__["destinationPaint"],
          points: destination
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])("span", {
        className: _Heatmap_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,
        children: utils_constants__WEBPACK_IMPORTED_MODULE_2__["default"].heatmapTitle
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 31,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Heatmap);

/***/ }),

/***/ "./src/components/Heatmap/config.ts":
/*!******************************************!*\
  !*** ./src/components/Heatmap/config.ts ***!
  \******************************************/
/*! exports provided: destinationPaint, originPaint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destinationPaint", function() { return destinationPaint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "originPaint", function() { return originPaint; });
const destinationPaint = {
  'heatmap-weight': {
    property: 'dbh',
    type: 'exponential',
    stops: [[1, 0], [62, 1]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[11, 1], [15, 3]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0,209,111,0)', 0.2, 'rgb(0,209,111)', 0.4, 'rgb(0,209,111)', 0.6, 'rgb(0,209,111)', 0.8, 'rgb(0,209,111)'],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[11, 16], [15, 14], [18, 10]]
  }
};
const originPaint = {
  'heatmap-weight': {
    property: 'dbh',
    type: 'exponential',
    stops: [[1, 0], [62, 1]]
  },
  'heatmap-intensity': {
    stops: [[11, 1], [15, 3]]
  },
  'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(66,100,251,0)', 0.2, 'rgb(66,100,251)', 0.4, 'rgb(66,100,251)', 0.6, 'rgb(66,100,251)', 0.8, 'rgb(66,100,251)'],
  'heatmap-radius': {
    stops: [[11, 16], [15, 14], [18, 10]]
  }
};

/***/ }),

/***/ "./src/components/Heatmap/index.ts":
/*!*****************************************!*\
  !*** ./src/components/Heatmap/index.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Heatmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Heatmap */ "./src/components/Heatmap/Heatmap.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Heatmap__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map