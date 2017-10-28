(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

exports.main = main;

var _uuid = __webpack_require__(2);

var _uuid2 = _interopRequireDefault(_uuid);

var _awsSdk = __webpack_require__(3);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _requestPromise = __webpack_require__(4);

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "ap-southeast-2" });

function main(event, context, callback) {
    var eventBody = event.payload.body;
    var date = new Date();
    var startDate = date.getYear() - 100 + '-' + date.getMonth() + '-' + date.getDate();
    var endDate = date.getYear() - 100 + 1 + '-' + date.getMonth() + '-' + date.getDate();

    var rpOptions = {
        uri: 'https://my.tanda.co/api/v2/leave',
        qs: {
            'from': startDate.toString(),
            'to': endDate.toString()
        },
        headers: {
            'Authorization': 'Bearer 0f9ea1cdbab7ff28774111c27045f145baafb3c00520e3c73c5763597cd80c76'
        },
        json: true
    };

    (0, _requestPromise2.default)(rpOptions).then(function (requestEvents) {
        console.log('User has %d repos', requestEvents.length);

        var pending = 0,
            approved = 0,
            declined = 0;

        requestEvents.forEach(function (reqEvent) {
            if (reqEvent.status === 'rejected') declined++;
            if (reqEvent.status === 'approved') approved++;
            if (reqEvent.status === 'pending') pending++;
        });

        var returnBody = "There is " + pending + " pending, " + approved + " approved and " + declined + " declined requests for leave";

        var response = {
            statusCode: 200,
            body: returnBody
        };
        callback(null, response);
    }).catch(function (err) {
        var response = {
            statusCode: 500,
            body: (0, _stringify2.default)(err)
        };
        callback(null, response);
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })
/******/ ])));