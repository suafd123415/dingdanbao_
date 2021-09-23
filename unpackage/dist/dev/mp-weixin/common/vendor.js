(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"dingdanbao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 105:
/*!***************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/eyes1.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAHCAQAAACv3NX0AAAA8UlEQVQYGW3BzyuDcRwH8A9jFz2ZcvBjc3qi3RxNSWqlnJwclIO4uHLjMj0pS5pmn8/7/V2tOHD4HpymHpRakh2cJtGUloP8GVauXi9hnRWbKvTKP3ySOV7Ri52zjTMuaaYYFPrkT49PllIaYg0x33ko5bTbxDO/WOc+VtwCczpreVvnMRv85rUtu2HxCc3iFh3esIkOX/HEJtr4wCMf+MOKGxURzbLKFjc0g0V+8p7b2OMb7mxGQ0ZsYacWiM3jAlu1QESn8eJ2S6lyGpeITyZETscY4UBHxA1qeDQgXTbHhq36RDFghLg6KV02hHHX/wtcYGuEa3ZujAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 106:
/*!***************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/eyes2.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAANCAQAAADsm+3rAAABvUlEQVQYGWXBT0jTYRgH8GdqzoYl6KSJUS3CqMsWgVYgjKRDHTKsICihkoZFHTr0h6AYCVkSsgZCP7a9z/f7TpT9pL8Hw2ITspV1CzoK0b1Dl4go9raKEurzkWUuYNo1zkO8xJt2hGc0wXXeCvlPwLSjj2OYxRymkYPiEZ7S4Gh2bapOlvmN7Na7rGASQ/mY2VqIaVzjdh/TrGCaeyea5TcvpINc4IweYKcXwnamWcIDPaURtmkvcniDi1NrRGR8JY9x0Y7YqF/vAuxmBV9Y5Vs9wn4v7AIaQZKvmfY6pLAH83qZbVLjteAWPtOxyhL6cMMOZIIimSAOssxzgmtcYJf8ohE+5Hc6VvGJ7/iBF7yQ1GSCSHJOcBqvsD8TlBq/FVl+paOjo+NHPe43So3ZiHEUhZ0cY0VPToVFUg12AEus0tHxm50vbBLRJm5DgWVNiIjXoSku2jumx2uZaMYQX/I9lzhjerQpt16HWeI9TaQa5KfJ1aaf9/Gc17nTRvMxu1t7s1vym3WQRbzgVRtN1ckffr1uwAn6LLPAK0ias7iNJ3zGUd2RXyX/ygTZZQ9zlEXM4jEMzptdXlj++gHFzeWOL8WS/AAAAABJRU5ErkJggg=="

/***/ }),

/***/ 11:
/*!*****************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/request.json ***!
  \*****************************************************/
/*! exports provided: interface1, interface3, interface7, interface4, interface5, interface8, interface, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"interface1\":\"http://txjt.cn1.utools.club\",\"interface3\":\"http://47.104.229.228:8080\",\"interface7\":\"http://101.201.147.68:8080\",\"interface4\":\"http://txjt.cn1.utools.club\",\"interface5\":\"http://82.157.97.185:8080\",\"interface8\":\"http://173.100.1.124:8080\",\"interface\":\"https://shop.tianxianjun.net\",\"data\":[{\"interface\":\"/shop/app/login\",\"name\":\"登录\",\"subscript\":0},{\"interface\":\"/shop/app/sendCode\",\"name\":\"发送验证码\",\"subscript\":1},{\"interface\":\"/shop/app/register\",\"name\":\"注册\",\"subscript\":2},{\"interface\":\"/shop/app/forgetPassword\",\"name\":\"忘记密码\",\"subscript\":3},{\"interface\":\"/shop/app/order/query\",\"name\":\"首页\",\"subscript\":4},{\"interface\":\"/shop/app/errands/getErrandsPre\",\"name\":\"详情\",\"subscript\":5},{\"interface\":\"/shop/app/errands/updateSettings\",\"name\":\"选择配送\",\"subscript\":6},{\"interface\":\"/shop/app/errands/addordergratuityfee\",\"name\":\"加小费\",\"subscript\":7},{\"interface\":\"/shop/app/errands/callRider\",\"name\":\"呼叫\",\"subscript\":8},{\"interface\":\"/shop/app/errands/cancelCall\",\"name\":\"取消呼叫\",\"subscript\":9},{\"interface\":\"/shop/app/errands/getSettings\",\"name\":\"获取自定义呼叫设置\",\"subscript\":10},{\"interface\":\"/shop/app/updatePhone\",\"name\":\"更改手机号\",\"subscript\":11},{\"interface\":\"/shop/app/errands/getErrandsPre\",\"name\":\"呼叫骑手详情\",\"subscript\":12},{\"interface\":\"/shop/app/findUser\",\"name\":\"查找用户手机号,店铺名称,地址\",\"subscript\":13},{\"interface\":\"/shop/app/updateUser\",\"name\":\"修改用户信息\",\"subscript\":14},{\"interface\":\"/shop/app/pay/querySendBalance\",\"name\":\"获取我的信息（余额 个性签名 姓名 ）\",\"subscript\":15},{\"interface\":\"/shop/app/bill/queryBillDate\",\"name\":\"账单\",\"subscript\":16},{\"interface\":\"/shop/app/bill/queryHistoryBillDate\",\"name\":\"查看30条历史账单\",\"subscript\":17},{\"interface\":\"/shop/app/bill/queryBillEveryDayOrder\",\"name\":\"获取账单(天)\",\"subscript\":18},{\"interface\":\"/shop/app/bill/queryBillOrderInfo\",\"name\":\"账单 获取订单详情\",\"subscript\":19},{\"interface\":\"/shop/app/custom/errands/getErrandsPrice\",\"name\":\"自定义配送获取价格\",\"subscript\":20},{\"interface\":\"/shop/app/custom/errands/call\",\"name\":\"自定义配送呼叫\",\"subscript\":21},{\"interface\":\"/shop/app/getShopAddress\",\"name\":\"获取店铺位置\",\"subscript\":22},{\"interface\":\"/shop/app/pay/prePay\",\"name\":\"H5微信支付（预支付）\",\"subscript\":23},{\"interface\":\"/shop/app/pay/checkPayOrder\",\"name\":\"H5微信支付（客户端检测是否成功）\",\"subscript\":24},{\"interface\":\"/shop/app/goods/queryCategoryList\",\"name\":\"获取商品分类(商家app)\",\"subscript\":25},{\"interface\":\"/shop/app/goods/queryCategoryGoodsInfo\",\"name\":\"根据分类id查找商品信息(商家app)\",\"subscript\":26},{\"interface\":\"/shop/app/goods/updateGoodsMoney\",\"name\":\"商家修改价格\",\"subscript\":27},{\"interface\":\"/shop/app/goods/goodsShelves\",\"name\":\"商品上下架\",\"subscript\":28},{\"interface\":\"/shop/app/goods/updateGoodsMoney\",\"name\":\"商家修改价格\",\"subscript\":29},{\"interface\":\"/shop/app/order/queryErrorOrderInfoList\",\"name\":\"商家退款异常订单列表\",\"subscript\":30},{\"interface\":\"/shop/app/order/refund/agree\",\"name\":\"商家同意退款\",\"subscript\":31},{\"interface\":\"/shop/app/order/refund/disagree\",\"name\":\"商家拒绝\",\"subscript\":32},{\"interface\":\"/shop/app/pay/queryPayGoodsList\",\"name\":\"获取充值商品列表\",\"subscript\":33},{\"interface\":\"/shop/app/order/cancel/agree\",\"name\":\"商家同意 用户取消订单\",\"subscript\":34},{\"interface\":\"/shop/app/order/cancel/refuse\",\"name\":\"商家拒绝 用户取消订单\",\"subscript\":35},{\"interface\":\"/shop/app/sendCode\",\"name\":\"发送验证码\",\"subscript\":36},{\"interface\":\"/shop/app/errands/queryRiderPrice\",\"name\":\"获取多个骑手价格\",\"subscript\":37},{\"interface\":\"/shop/app/bill/shopChecking\",\"name\":\"财务对账\",\"subscript\":38},{\"interface\":\"/shop/app/bill/queryShopCheckingDetail\",\"name\":\"财务对账详情信息\",\"subscript\":39},{\"interface\":\"/shop/app/updateShopPhone\",\"name\":\"修改手机号\",\"subscript\":40},{\"interface\":\"/shop/app/updatePassWord\",\"name\":\"修改登录密码\",\"subscript\":41},{\"interface\":\"/shop/app/getShopCentreByList\",\"name\":\"获取商家中心列表\",\"subscript\":42},{\"interface\":\"/shop/app/updateShopBusinessStatus\",\"name\":\"店铺修改营业状态\",\"subscript\":43},{\"interface\":\"/shop/app/updateShopBusinessTime\",\"name\":\"修改门店营业时间\",\"subscript\":44},{\"interface\":\"/shop/app/order/reprintReceipts\",\"name\":\"商家补打小票\",\"subscript\":45},{\"interface\":\"/shop/app/errands/manualCall/queryRiderPrice\",\"name\":\"手动呼叫（生成价格-> 输入完用户收件地址后 向服务器请求  过三秒后 请求获取配送价格接口）\",\"subscript\":46},{\"interface\":\"/shop/app/errands/manualCall\",\"name\":\"手动呼叫\",\"subscript\":47},{\"interface\":\"/shop/app/order/shopFinishOrder\",\"name\":\"商家手动确认小程序订单\",\"subscript\":48},{\"interface\":\"/shop/app/search/date\",\"name\":\"日期\",\"subscript\":49},{\"interface\":\"/shop/app/search\",\"name\":\"检索\",\"subscript\":50},{\"interface\":\"/shop/app/ocr/General\",\"name\":\"图片识别\",\"subscript\":51},{\"interface\":\"/shop/app/ocr/address\",\"name\":\"地址识别\",\"subscript\":52},{\"interface\":\"/shop/app/bill/queryErrands\",\"name\":\"配送账单\",\"subscript\":\"53\"},{\"interface\":\"/shop/app/bill/queryPayInfo\",\"name\":\"充值记录\",\"subscript\":54},{\"interface\":\"/shop/app/getOpenId\",\"name\":\"获取openID\",\"subscript\":55},{\"interface\":\"/shop/app/pay/minPrePay\",\"name\":\"充值\",\"subscript\":56},{\"interface\":\"/shop/app/queryShopAccount\",\"name\":\"查看所有账号密码\",\"subscript\":57}]}");

/***/ }),

/***/ 115:
/*!***********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_calendar.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAMAAABR24SMAAAAYFBMVEUAAAAAAP+qceO2bdvIbdu7Zt27d92/c+bCcOC5cty/bty/cNq+c9++ct6+ct6/ct+/c96/cty/ct+/cd2/c929ct3Act2/ct6/cd6/c96+ct/Ac9++c96+ct3Act++ct6XxENJAAAAIHRSTlMAAQkODg8PFBkdLDBHTl5gZGdnaGhpaWtsg4aJisXFyRQVdMcAAABISURBVAgdHcEHEoAgDADBA3sES+xY+P8vZdjFVqEsQm0hTvc4PHNs2DBg2AV1V+JVUDIVlEwFdVfiVVjIVuE9j+T8Wro+6/gB0cUEQo7WB50AAAAASUVORK5CYII="

/***/ }),

/***/ 116:
/*!*********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_delete.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAAnElEQVQY02NggIJA4ShVEAwUZkAGEVIR9yNOgWDkg1BpsFCoYsTGyI2ReyOfRW4Ew6dA9saIjQyhbKEGESvDKyL1YDC8ImJlpB5YV/iMyJggJQaGMBegoc6RMeEzoDaAJCK2MTBEPvZkj7yPLrEdKPHEgYMaErOAEpeMWSPPI0lETI5IBvuJGYQjkiMmQyUi7SMeQvwNhg8j7RkYABveUl+6Kzs4AAAAAElFTkSuQmCC"

/***/ }),

/***/ 12:
/*!************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/css/page.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 13:
/*!*************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/utile.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.throttle = throttle;exports.computationTime = computationTime;exports.startType = startType;exports.default = void 0; //防暴力点击
var timer = null; //定时器
var lastTime = 0; //当前时间戳
var lastTimeState = true; //控制频繁请求时的执行先后
var methods = null;

function throttle(menth, delay, duration, type) {
  var that = this;
  if (methods == type) {
    var current = new Date().getTime();
    if (current - lastTime >= duration) {
      lastTime = current;
      return menth();
    } else {
      lastTime = current;
    }
  } else {
    methods = type;
    lastTime = new Date().getTime();
    return menth();
  }
  /////////////注释掉，首页发送两次请求，定时器连续发送两次请求/////////////
  // if (lastTime == 0) {
  //   lastTime = new Date().getTime();
  // }
  // var current = new Date().getTime();
  // if (current - lastTime >= duration) {
  //   if (lastTimeState == true) {
  //     lastTime = 0;
  //     clearTimeout(timer);
  //     timer = setTimeout(function() {
  //       lastTimeState = false;
  //     }, delay);
  //     return menth();
  //   } else {
  //     timer = setTimeout(function() {
  //       lastTimeState = true;
  //     }, delay);
  //   }
  //   lastTime = current;
  // } else {
  //   timer = setTimeout(function() {
  //     lastTimeState = true
  //   }, delay);
  //   if (lastTimeState == true) {
  //     lastTimeState = false;
  //     return menth();
  //   }
  // }
}
//计算剩余时间
function computationTime(b) {
  var that = this;
  var curTime = new Date(b);
  var date1 = new Date(curTime.setHours(curTime.getHours() + 3));
  var date2 = new Date();
  var date3 = date1.getTime() - date2.getTime();
  if (date3 <= 0) {
    return 0 + ":" + 0 + ":" + 0;
  } else {
    var e = Math.floor(date3 / (24 * 3600 * 1000));
    var leave1 = date3 % (24 * 3600 * 1000) - 1000; //计算天数后剩余的毫秒数
    var f = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var g = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var h = Math.round(leave3 / 1000);
    if (e != null && f != null && g != null && h != null) {
      return f + ":" + g + ":" + h;
    }
  }
}

// var startType = false
function startType(e) {
  if (e == 0) {
    return startType;
  } else {
    exports.startType = startType = true;
    return startType;
  }
}var _default =

{
  throttle: throttle,
  computationTime: computationTime,
  startType: startType,
  orderTimer: null,
  dateTime: null };exports.default = _default;

/***/ }),

/***/ 14:
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ 15);
var parse = __webpack_require__(/*! ./parse */ 18);
var formats = __webpack_require__(/*! ./formats */ 17);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 143:
/*!****************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/areaList.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _city_list;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  province_list: {
    110000: "北京市",
    120000: "天津市",
    130000: "河北省",
    140000: "山西省",
    150000: "内蒙古自治区",
    210000: "辽宁省",
    220000: "吉林省",
    230000: "黑龙江省",
    310000: "上海市",
    320000: "江苏省",
    330000: "浙江省",
    340000: "安徽省",
    350000: "福建省",
    360000: "江西省",
    370000: "山东省",
    410000: "河南省",
    420000: "湖北省",
    430000: "湖南省",
    440000: "广东省",
    450000: "广西壮族自治区",
    460000: "海南省",
    500000: "重庆市",
    510000: "四川省",
    520000: "贵州省",
    530000: "云南省",
    540000: "西藏自治区",
    610000: "陕西省",
    620000: "甘肃省",
    630000: "青海省",
    640000: "宁夏回族自治区",
    650000: "新疆维吾尔自治区",
    710000: "台湾省",
    810000: "香港特别行政区",
    820000: "澳门特别行政区",
    900000: "海外" },

  city_list: (_city_list = {
    110100: "东城区",
    110200: "西城区",
    110300: "朝阳区",
    110400: "丰台区",
    110500: "石景山区",
    110600: "海淀区",
    110700: "石头沟区",
    110800: "房山区",
    110900: "通州区",
    111000: "顺义区",
    111100: "昌平区",
    111200: "大兴区",
    111300: "怀柔区",
    111400: "平谷区",
    111500: "密云区",
    111600: "延庆区",
    120100: "和平区",
    120200: "河东区",
    120300: "河西区",
    120400: "南开区",
    120500: "河北区" }, _defineProperty(_city_list, "120500",
  "红桥区"), _defineProperty(_city_list,
  120600, "东丽区"), _defineProperty(_city_list,
  120700, "西青区"), _defineProperty(_city_list,
  120800, "津南区"), _defineProperty(_city_list,
  120900, "北辰区"), _defineProperty(_city_list,
  121000, "武清区"), _defineProperty(_city_list,
  121100, "宝坻区"), _defineProperty(_city_list,
  121200, "宁河区"), _defineProperty(_city_list,
  121300, "静海区"), _defineProperty(_city_list,
  121400, "蓟州区"), _defineProperty(_city_list,
  130100, "石家庄市"), _defineProperty(_city_list,
  130200, "唐山市"), _defineProperty(_city_list,
  130300, "秦皇岛市"), _defineProperty(_city_list,
  130400, "邯郸市"), _defineProperty(_city_list,
  130500, "邢台市"), _defineProperty(_city_list,
  130600, "保定市"), _defineProperty(_city_list,
  130700, "张家口市"), _defineProperty(_city_list,
  130800, "承德市"), _defineProperty(_city_list,
  130900, "沧州市"), _defineProperty(_city_list,
  131000, "廊坊市"), _defineProperty(_city_list,
  131100, "衡水市"), _defineProperty(_city_list,
  140100, "太原市"), _defineProperty(_city_list,
  140200, "大同市"), _defineProperty(_city_list,
  140300, "阳泉市"), _defineProperty(_city_list,
  140400, "长治市"), _defineProperty(_city_list,
  140500, "晋城市"), _defineProperty(_city_list,
  140600, "朔州市"), _defineProperty(_city_list,
  140700, "晋中市"), _defineProperty(_city_list,
  140800, "运城市"), _defineProperty(_city_list,
  140900, "忻州市"), _defineProperty(_city_list,
  141000, "临汾市"), _defineProperty(_city_list,
  141100, "吕梁市"), _defineProperty(_city_list,
  150100, "呼和浩特市"), _defineProperty(_city_list,
  150200, "包头市"), _defineProperty(_city_list,
  150300, "乌海市"), _defineProperty(_city_list,
  150400, "赤峰市"), _defineProperty(_city_list,
  150500, "通辽市"), _defineProperty(_city_list,
  150600, "鄂尔多斯市"), _defineProperty(_city_list,
  150700, "呼伦贝尔市"), _defineProperty(_city_list,
  150800, "巴彦淖尔市"), _defineProperty(_city_list,
  150900, "乌兰察布市"), _defineProperty(_city_list,
  152200, "兴安盟"), _defineProperty(_city_list,
  152500, "锡林郭勒盟"), _defineProperty(_city_list,
  152900, "阿拉善盟"), _defineProperty(_city_list,
  210100, "沈阳市"), _defineProperty(_city_list,
  210200, "大连市"), _defineProperty(_city_list,
  210300, "鞍山市"), _defineProperty(_city_list,
  210400, "抚顺市"), _defineProperty(_city_list,
  210500, "本溪市"), _defineProperty(_city_list,
  210600, "丹东市"), _defineProperty(_city_list,
  210700, "锦州市"), _defineProperty(_city_list,
  210800, "营口市"), _defineProperty(_city_list,
  210900, "阜新市"), _defineProperty(_city_list,
  211000, "辽阳市"), _defineProperty(_city_list,
  211100, "盘锦市"), _defineProperty(_city_list,
  211200, "铁岭市"), _defineProperty(_city_list,
  211300, "朝阳市"), _defineProperty(_city_list,
  211400, "葫芦岛市"), _defineProperty(_city_list,
  220100, "长春市"), _defineProperty(_city_list,
  220200, "吉林市"), _defineProperty(_city_list,
  220300, "四平市"), _defineProperty(_city_list,
  220400, "辽源市"), _defineProperty(_city_list,
  220500, "通化市"), _defineProperty(_city_list,
  220600, "白山市"), _defineProperty(_city_list,
  220700, "松原市"), _defineProperty(_city_list,
  220800, "白城市"), _defineProperty(_city_list,
  222400, "延边朝鲜族自治州"), _defineProperty(_city_list,
  230100, "哈尔滨市"), _defineProperty(_city_list,
  230200, "齐齐哈尔市"), _defineProperty(_city_list,
  230300, "鸡西市"), _defineProperty(_city_list,
  230400, "鹤岗市"), _defineProperty(_city_list,
  230500, "双鸭山市"), _defineProperty(_city_list,
  230600, "大庆市"), _defineProperty(_city_list,
  230700, "伊春市"), _defineProperty(_city_list,
  230800, "佳木斯市"), _defineProperty(_city_list,
  230900, "七台河市"), _defineProperty(_city_list,
  231000, "牡丹江市"), _defineProperty(_city_list,
  231100, "黑河市"), _defineProperty(_city_list,
  231200, "绥化市"), _defineProperty(_city_list,
  232700, "大兴安岭地区"), _defineProperty(_city_list,
  310100, "黄埔区"), _defineProperty(_city_list,
  310200, "徐汇区"), _defineProperty(_city_list,
  310300, "长宁区"), _defineProperty(_city_list,
  310400, "静安区"), _defineProperty(_city_list,
  310500, "普陀区"), _defineProperty(_city_list,
  310600, "虹口区"), _defineProperty(_city_list,
  310700, "杨浦区"), _defineProperty(_city_list,
  310800, "闵行区"), _defineProperty(_city_list,
  310900, "宝山区"), _defineProperty(_city_list,
  311000, "嘉定区"), _defineProperty(_city_list,
  311100, "浦东新区"), _defineProperty(_city_list,
  311200, "金山区"), _defineProperty(_city_list,
  311300, "松江区"), _defineProperty(_city_list,
  311400, "青浦区"), _defineProperty(_city_list,
  311500, "奉贤区"), _defineProperty(_city_list,
  311600, "崇明区"), _defineProperty(_city_list,
  320100, "南京市"), _defineProperty(_city_list,
  320200, "无锡市"), _defineProperty(_city_list,
  320300, "徐州市"), _defineProperty(_city_list,
  320400, "常州市"), _defineProperty(_city_list,
  320500, "苏州市"), _defineProperty(_city_list,
  320600, "南通市"), _defineProperty(_city_list,
  320700, "连云港市"), _defineProperty(_city_list,
  320800, "淮安市"), _defineProperty(_city_list,
  320900, "盐城市"), _defineProperty(_city_list,
  321000, "扬州市"), _defineProperty(_city_list,
  321100, "镇江市"), _defineProperty(_city_list,
  321200, "泰州市"), _defineProperty(_city_list,
  321300, "宿迁市"), _defineProperty(_city_list,
  330100, "杭州市"), _defineProperty(_city_list,
  330200, "宁波市"), _defineProperty(_city_list,
  330300, "温州市"), _defineProperty(_city_list,
  330400, "嘉兴市"), _defineProperty(_city_list,
  330500, "湖州市"), _defineProperty(_city_list,
  330600, "绍兴市"), _defineProperty(_city_list,
  330700, "金华市"), _defineProperty(_city_list,
  330800, "衢州市"), _defineProperty(_city_list,
  330900, "舟山市"), _defineProperty(_city_list,
  331000, "台州市"), _defineProperty(_city_list,
  331100, "丽水市"), _defineProperty(_city_list,
  340100, "合肥市"), _defineProperty(_city_list,
  340200, "芜湖市"), _defineProperty(_city_list,
  340300, "蚌埠市"), _defineProperty(_city_list,
  340400, "淮南市"), _defineProperty(_city_list,
  340500, "马鞍山市"), _defineProperty(_city_list,
  340600, "淮北市"), _defineProperty(_city_list,
  340700, "铜陵市"), _defineProperty(_city_list,
  340800, "安庆市"), _defineProperty(_city_list,
  341000, "黄山市"), _defineProperty(_city_list,
  341100, "滁州市"), _defineProperty(_city_list,
  341200, "阜阳市"), _defineProperty(_city_list,
  341300, "宿州市"), _defineProperty(_city_list,
  341500, "六安市"), _defineProperty(_city_list,
  341600, "亳州市"), _defineProperty(_city_list,
  341700, "池州市"), _defineProperty(_city_list,
  341800, "宣城市"), _defineProperty(_city_list,
  350100, "福州市"), _defineProperty(_city_list,
  350200, "厦门市"), _defineProperty(_city_list,
  350300, "莆田市"), _defineProperty(_city_list,
  350400, "三明市"), _defineProperty(_city_list,
  350500, "泉州市"), _defineProperty(_city_list,
  350600, "漳州市"), _defineProperty(_city_list,
  350700, "南平市"), _defineProperty(_city_list,
  350800, "龙岩市"), _defineProperty(_city_list,
  350900, "宁德市"), _defineProperty(_city_list,
  360100, "南昌市"), _defineProperty(_city_list,
  360200, "景德镇市"), _defineProperty(_city_list,
  360300, "萍乡市"), _defineProperty(_city_list,
  360400, "九江市"), _defineProperty(_city_list,
  360500, "新余市"), _defineProperty(_city_list,
  360600, "鹰潭市"), _defineProperty(_city_list,
  360700, "赣州市"), _defineProperty(_city_list,
  360800, "吉安市"), _defineProperty(_city_list,
  360900, "宜春市"), _defineProperty(_city_list,
  361000, "抚州市"), _defineProperty(_city_list,
  361100, "上饶市"), _defineProperty(_city_list,
  370100, "济南市"), _defineProperty(_city_list,
  370200, "青岛市"), _defineProperty(_city_list,
  370300, "淄博市"), _defineProperty(_city_list,
  370400, "枣庄市"), _defineProperty(_city_list,
  370500, "东营市"), _defineProperty(_city_list,
  370600, "烟台市"), _defineProperty(_city_list,
  370700, "潍坊市"), _defineProperty(_city_list,
  370800, "济宁市"), _defineProperty(_city_list,
  370900, "泰安市"), _defineProperty(_city_list,
  371000, "威海市"), _defineProperty(_city_list,
  371100, "日照市"), _defineProperty(_city_list,
  371300, "临沂市"), _defineProperty(_city_list,
  371400, "德州市"), _defineProperty(_city_list,
  371500, "聊城市"), _defineProperty(_city_list,
  371600, "滨州市"), _defineProperty(_city_list,
  371700, "菏泽市"), _defineProperty(_city_list,
  410100, "郑州市"), _defineProperty(_city_list,
  410200, "开封市"), _defineProperty(_city_list,
  410300, "洛阳市"), _defineProperty(_city_list,
  410400, "平顶山市"), _defineProperty(_city_list,
  410500, "安阳市"), _defineProperty(_city_list,
  410600, "鹤壁市"), _defineProperty(_city_list,
  410700, "新乡市"), _defineProperty(_city_list,
  410800, "焦作市"), _defineProperty(_city_list,
  410900, "濮阳市"), _defineProperty(_city_list,
  411000, "许昌市"), _defineProperty(_city_list,
  411100, "漯河市"), _defineProperty(_city_list,
  411200, "三门峡市"), _defineProperty(_city_list,
  411300, "南阳市"), _defineProperty(_city_list,
  411400, "商丘市"), _defineProperty(_city_list,
  411500, "信阳市"), _defineProperty(_city_list,
  411600, "周口市"), _defineProperty(_city_list,
  411700, "驻马店市"), _defineProperty(_city_list,
  419000, "省直辖县"), _defineProperty(_city_list,
  420100, "武汉市"), _defineProperty(_city_list,
  420200, "黄石市"), _defineProperty(_city_list,
  420300, "十堰市"), _defineProperty(_city_list,
  420500, "宜昌市"), _defineProperty(_city_list,
  420600, "襄阳市"), _defineProperty(_city_list,
  420700, "鄂州市"), _defineProperty(_city_list,
  420800, "荆门市"), _defineProperty(_city_list,
  420900, "孝感市"), _defineProperty(_city_list,
  421000, "荆州市"), _defineProperty(_city_list,
  421100, "黄冈市"), _defineProperty(_city_list,
  421200, "咸宁市"), _defineProperty(_city_list,
  421300, "随州市"), _defineProperty(_city_list,
  422800, "恩施土家族苗族自治州"), _defineProperty(_city_list,
  429000, "省直辖县"), _defineProperty(_city_list,
  430100, "长沙市"), _defineProperty(_city_list,
  430200, "株洲市"), _defineProperty(_city_list,
  430300, "湘潭市"), _defineProperty(_city_list,
  430400, "衡阳市"), _defineProperty(_city_list,
  430500, "邵阳市"), _defineProperty(_city_list,
  430600, "岳阳市"), _defineProperty(_city_list,
  430700, "常德市"), _defineProperty(_city_list,
  430800, "张家界市"), _defineProperty(_city_list,
  430900, "益阳市"), _defineProperty(_city_list,
  431000, "郴州市"), _defineProperty(_city_list,
  431100, "永州市"), _defineProperty(_city_list,
  431200, "怀化市"), _defineProperty(_city_list,
  431300, "娄底市"), _defineProperty(_city_list,
  433100, "湘西土家族苗族自治州"), _defineProperty(_city_list,
  440100, "广州市"), _defineProperty(_city_list,
  440200, "韶关市"), _defineProperty(_city_list,
  440300, "深圳市"), _defineProperty(_city_list,
  440400, "珠海市"), _defineProperty(_city_list,
  440500, "汕头市"), _defineProperty(_city_list,
  440600, "佛山市"), _defineProperty(_city_list,
  440700, "江门市"), _defineProperty(_city_list,
  440800, "湛江市"), _defineProperty(_city_list,
  440900, "茂名市"), _defineProperty(_city_list,
  441200, "肇庆市"), _defineProperty(_city_list,
  441300, "惠州市"), _defineProperty(_city_list,
  441400, "梅州市"), _defineProperty(_city_list,
  441500, "汕尾市"), _defineProperty(_city_list,
  441600, "河源市"), _defineProperty(_city_list,
  441700, "阳江市"), _defineProperty(_city_list,
  441800, "清远市"), _defineProperty(_city_list,
  441900, "东莞市"), _defineProperty(_city_list,
  442000, "中山市"), _defineProperty(_city_list,
  445100, "潮州市"), _defineProperty(_city_list,
  445200, "揭阳市"), _defineProperty(_city_list,
  445300, "云浮市"), _defineProperty(_city_list,
  450100, "南宁市"), _defineProperty(_city_list,
  450200, "柳州市"), _defineProperty(_city_list,
  450300, "桂林市"), _defineProperty(_city_list,
  450400, "梧州市"), _defineProperty(_city_list,
  450500, "北海市"), _defineProperty(_city_list,
  450600, "防城港市"), _defineProperty(_city_list,
  450700, "钦州市"), _defineProperty(_city_list,
  450800, "贵港市"), _defineProperty(_city_list,
  450900, "玉林市"), _defineProperty(_city_list,
  451000, "百色市"), _defineProperty(_city_list,
  451100, "贺州市"), _defineProperty(_city_list,
  451200, "河池市"), _defineProperty(_city_list,
  451300, "来宾市"), _defineProperty(_city_list,
  451400, "崇左市"), _defineProperty(_city_list,
  460100, "海口市"), _defineProperty(_city_list,
  460200, "三亚市"), _defineProperty(_city_list,
  460300, "三沙市"), _defineProperty(_city_list,
  460400, "儋州市"), _defineProperty(_city_list,
  469000, "省直辖县"), _defineProperty(_city_list,
  500100, "万州区"), _defineProperty(_city_list,
  500200, "黔江区"), _defineProperty(_city_list,
  500300, "涪陵区"), _defineProperty(_city_list,
  500400, "渝中区"), _defineProperty(_city_list,
  500500, "大渡口区"), _defineProperty(_city_list,
  500600, "江北区"), _defineProperty(_city_list,
  500700, "沙坪坝区"), _defineProperty(_city_list,
  500800, "九龙坡区"), _defineProperty(_city_list,
  500900, "南岸区"), _defineProperty(_city_list,
  501000, "北碚区"), _defineProperty(_city_list,
  501100, "渝北区"), _defineProperty(_city_list,
  501200, "巴南区"), _defineProperty(_city_list,
  501300, "长寿区"), _defineProperty(_city_list,
  501400, "江津区"), _defineProperty(_city_list,
  501500, "合川区"), _defineProperty(_city_list,
  501600, "永川区"), _defineProperty(_city_list,
  501700, "南川区"), _defineProperty(_city_list,
  501800, "綦江区"), _defineProperty(_city_list,
  501900, "大足区"), _defineProperty(_city_list,
  502000, "璧山区"), _defineProperty(_city_list,
  502100, "铜梁区"), _defineProperty(_city_list,
  502200, "潼南区"), _defineProperty(_city_list,
  502300, "荣昌区"), _defineProperty(_city_list,
  502400, "开州区"), _defineProperty(_city_list,
  502500, "梁平区"), _defineProperty(_city_list,
  502600, "武隆区"), _defineProperty(_city_list, "500400",
  "渝中区"), _defineProperty(_city_list,
  510100, "成都市"), _defineProperty(_city_list,
  510300, "自贡市"), _defineProperty(_city_list,
  510400, "攀枝花市"), _defineProperty(_city_list,
  510500, "泸州市"), _defineProperty(_city_list,
  510600, "德阳市"), _defineProperty(_city_list,
  510700, "绵阳市"), _defineProperty(_city_list,
  510800, "广元市"), _defineProperty(_city_list,
  510900, "遂宁市"), _defineProperty(_city_list,
  511000, "内江市"), _defineProperty(_city_list,
  511100, "乐山市"), _defineProperty(_city_list,
  511300, "南充市"), _defineProperty(_city_list,
  511400, "眉山市"), _defineProperty(_city_list,
  511500, "宜宾市"), _defineProperty(_city_list,
  511600, "广安市"), _defineProperty(_city_list,
  511700, "达州市"), _defineProperty(_city_list,
  511800, "雅安市"), _defineProperty(_city_list,
  511900, "巴中市"), _defineProperty(_city_list,
  512000, "资阳市"), _defineProperty(_city_list,
  513200, "阿坝藏族羌族自治州"), _defineProperty(_city_list,
  513300, "甘孜藏族自治州"), _defineProperty(_city_list,
  513400, "凉山彝族自治州"), _defineProperty(_city_list,
  520100, "贵阳市"), _defineProperty(_city_list,
  520200, "六盘水市"), _defineProperty(_city_list,
  520300, "遵义市"), _defineProperty(_city_list,
  520400, "安顺市"), _defineProperty(_city_list,
  520500, "毕节市"), _defineProperty(_city_list,
  520600, "铜仁市"), _defineProperty(_city_list,
  522300, "黔西南布依族苗族自治州"), _defineProperty(_city_list,
  522600, "黔东南苗族侗族自治州"), _defineProperty(_city_list,
  522700, "黔南布依族苗族自治州"), _defineProperty(_city_list,
  530100, "昆明市"), _defineProperty(_city_list,
  530300, "曲靖市"), _defineProperty(_city_list,
  530400, "玉溪市"), _defineProperty(_city_list,
  530500, "保山市"), _defineProperty(_city_list,
  530600, "昭通市"), _defineProperty(_city_list,
  530700, "丽江市"), _defineProperty(_city_list,
  530800, "普洱市"), _defineProperty(_city_list,
  530900, "临沧市"), _defineProperty(_city_list,
  532300, "楚雄彝族自治州"), _defineProperty(_city_list,
  532500, "红河哈尼族彝族自治州"), _defineProperty(_city_list,
  532600, "文山壮族苗族自治州"), _defineProperty(_city_list,
  532800, "西双版纳傣族自治州"), _defineProperty(_city_list,
  532900, "大理白族自治州"), _defineProperty(_city_list,
  533100, "德宏傣族景颇族自治州"), _defineProperty(_city_list,
  533300, "怒江傈僳族自治州"), _defineProperty(_city_list,
  533400, "迪庆藏族自治州"), _defineProperty(_city_list,
  540100, "拉萨市"), _defineProperty(_city_list,
  540200, "日喀则市"), _defineProperty(_city_list,
  540300, "昌都市"), _defineProperty(_city_list,
  540400, "林芝市"), _defineProperty(_city_list,
  540500, "山南市"), _defineProperty(_city_list,
  540600, "那曲市"), _defineProperty(_city_list,
  542500, "阿里地区"), _defineProperty(_city_list,
  610100, "西安市"), _defineProperty(_city_list,
  610200, "铜川市"), _defineProperty(_city_list,
  610300, "宝鸡市"), _defineProperty(_city_list,
  610400, "咸阳市"), _defineProperty(_city_list,
  610500, "渭南市"), _defineProperty(_city_list,
  610600, "延安市"), _defineProperty(_city_list,
  610700, "汉中市"), _defineProperty(_city_list,
  610800, "榆林市"), _defineProperty(_city_list,
  610900, "安康市"), _defineProperty(_city_list,
  611000, "商洛市"), _defineProperty(_city_list,
  620100, "兰州市"), _defineProperty(_city_list,
  620200, "嘉峪关市"), _defineProperty(_city_list,
  620300, "金昌市"), _defineProperty(_city_list,
  620400, "白银市"), _defineProperty(_city_list,
  620500, "天水市"), _defineProperty(_city_list,
  620600, "武威市"), _defineProperty(_city_list,
  620700, "张掖市"), _defineProperty(_city_list,
  620800, "平凉市"), _defineProperty(_city_list,
  620900, "酒泉市"), _defineProperty(_city_list,
  621000, "庆阳市"), _defineProperty(_city_list,
  621100, "定西市"), _defineProperty(_city_list,
  621200, "陇南市"), _defineProperty(_city_list,
  622900, "临夏回族自治州"), _defineProperty(_city_list,
  623000, "甘南藏族自治州"), _defineProperty(_city_list,
  630100, "西宁市"), _defineProperty(_city_list,
  630200, "海东市"), _defineProperty(_city_list,
  632200, "海北藏族自治州"), _defineProperty(_city_list,
  632300, "黄南藏族自治州"), _defineProperty(_city_list,
  632500, "海南藏族自治州"), _defineProperty(_city_list,
  632600, "果洛藏族自治州"), _defineProperty(_city_list,
  632700, "玉树藏族自治州"), _defineProperty(_city_list,
  632800, "海西蒙古族藏族自治州"), _defineProperty(_city_list,
  640100, "银川市"), _defineProperty(_city_list,
  640200, "石嘴山市"), _defineProperty(_city_list,
  640300, "吴忠市"), _defineProperty(_city_list,
  640400, "固原市"), _defineProperty(_city_list,
  640500, "中卫市"), _defineProperty(_city_list,
  650100, "乌鲁木齐市"), _defineProperty(_city_list,
  650200, "克拉玛依市"), _defineProperty(_city_list,
  650400, "吐鲁番市"), _defineProperty(_city_list,
  650500, "哈密市"), _defineProperty(_city_list,
  652300, "昌吉回族自治州"), _defineProperty(_city_list,
  652700, "博尔塔拉蒙古自治州"), _defineProperty(_city_list,
  652800, "巴音郭楞蒙古自治州"), _defineProperty(_city_list,
  652900, "阿克苏地区"), _defineProperty(_city_list,
  653000, "克孜勒苏柯尔克孜自治州"), _defineProperty(_city_list,
  653100, "喀什地区"), _defineProperty(_city_list,
  653200, "和田地区"), _defineProperty(_city_list,
  654000, "伊犁哈萨克自治州"), _defineProperty(_city_list,
  654200, "塔城地区"), _defineProperty(_city_list,
  654300, "阿勒泰地区"), _defineProperty(_city_list,
  659000, "自治区直辖县级行政区划"), _defineProperty(_city_list,
  710100, "台北市"), _defineProperty(_city_list,
  710200, "高雄市"), _defineProperty(_city_list,
  710300, "台南市"), _defineProperty(_city_list,
  710400, "台中市"), _defineProperty(_city_list,
  710500, "金门县"), _defineProperty(_city_list,
  710600, "南投县"), _defineProperty(_city_list,
  710700, "基隆市"), _defineProperty(_city_list,
  710800, "新竹市"), _defineProperty(_city_list,
  710900, "嘉义市"), _defineProperty(_city_list,
  711100, "新北市"), _defineProperty(_city_list,
  711200, "宜兰县"), _defineProperty(_city_list,
  711300, "新竹县"), _defineProperty(_city_list,
  711400, "桃园县"), _defineProperty(_city_list,
  711500, "苗栗县"), _defineProperty(_city_list,
  711700, "彰化县"), _defineProperty(_city_list,
  711900, "嘉义县"), _defineProperty(_city_list,
  712100, "云林县"), _defineProperty(_city_list,
  712400, "屏东县"), _defineProperty(_city_list,
  712500, "台东县"), _defineProperty(_city_list,
  712600, "花莲县"), _defineProperty(_city_list,
  712700, "澎湖县"), _defineProperty(_city_list,
  712800, "连江县"), _defineProperty(_city_list,
  810100, "香港岛"), _defineProperty(_city_list,
  810200, "九龙"), _defineProperty(_city_list,
  810300, "新界"), _defineProperty(_city_list,
  820100, "澳门半岛"), _defineProperty(_city_list,
  820200, "离岛"), _defineProperty(_city_list,
  900400, "阿富汗"), _defineProperty(_city_list,
  900800, "阿尔巴尼亚"), _defineProperty(_city_list,
  901000, "南极洲"), _defineProperty(_city_list,
  901200, "阿尔及利亚"), _defineProperty(_city_list,
  901600, "美属萨摩亚"), _defineProperty(_city_list,
  902000, "安道尔"), _defineProperty(_city_list,
  902400, "安哥拉"), _defineProperty(_city_list,
  902800, "安提瓜和巴布达"), _defineProperty(_city_list,
  903100, "阿塞拜疆"), _defineProperty(_city_list,
  903200, "阿根廷"), _defineProperty(_city_list,
  903600, "澳大利亚"), _defineProperty(_city_list,
  904000, "奥地利"), _defineProperty(_city_list,
  904400, "巴哈马"), _defineProperty(_city_list,
  904800, "巴林"), _defineProperty(_city_list,
  905000, "孟加拉"), _defineProperty(_city_list,
  905100, "亚美尼亚"), _defineProperty(_city_list,
  905200, "巴巴多斯"), _defineProperty(_city_list,
  905600, "比利时"), _defineProperty(_city_list,
  906000, "百慕大"), _defineProperty(_city_list,
  906400, "不丹"), _defineProperty(_city_list,
  906800, "玻利维亚"), _defineProperty(_city_list,
  907000, "波黑"), _defineProperty(_city_list,
  907200, "博茨瓦纳"), _defineProperty(_city_list,
  907400, "布韦岛"), _defineProperty(_city_list,
  907600, "巴西"), _defineProperty(_city_list,
  908400, "伯利兹"), _defineProperty(_city_list,
  908600, "英属印度洋领地"), _defineProperty(_city_list,
  909000, "所罗门群岛"), _defineProperty(_city_list,
  909200, "英属维尔京群岛"), _defineProperty(_city_list,
  909600, "文莱"), _defineProperty(_city_list,
  910000, "保加利亚"), _defineProperty(_city_list,
  910400, "缅甸"), _defineProperty(_city_list,
  910800, "布隆迪"), _defineProperty(_city_list,
  911200, "白俄罗斯"), _defineProperty(_city_list,
  911600, "柬埔寨"), _defineProperty(_city_list,
  912000, "喀麦隆"), _defineProperty(_city_list,
  912400, "加拿大"), _defineProperty(_city_list,
  913200, "佛得角"), _defineProperty(_city_list,
  913600, "开曼群岛"), _defineProperty(_city_list,
  914000, "中非"), _defineProperty(_city_list,
  914400, "斯里兰卡"), _defineProperty(_city_list,
  914800, "乍得"), _defineProperty(_city_list,
  915200, "智利"), _defineProperty(_city_list,
  916200, "圣诞岛"), _defineProperty(_city_list,
  916600, "科科斯群岛"), _defineProperty(_city_list,
  917000, "哥伦比亚"), _defineProperty(_city_list,
  917400, "科摩罗"), _defineProperty(_city_list,
  917500, "马约特"), _defineProperty(_city_list,
  917800, "刚果（布）"), _defineProperty(_city_list,
  918000, "刚果（金）"), _defineProperty(_city_list,
  918400, "库克群岛"), _defineProperty(_city_list,
  918800, "哥斯达黎加"), _defineProperty(_city_list,
  919100, "克罗地亚"), _defineProperty(_city_list,
  919200, "古巴"), _defineProperty(_city_list,
  919600, "塞浦路斯"), _defineProperty(_city_list,
  920300, "捷克"), _defineProperty(_city_list,
  920400, "贝宁"), _defineProperty(_city_list,
  920800, "丹麦"), _defineProperty(_city_list,
  921200, "多米尼克"), _defineProperty(_city_list,
  921400, "多米尼加"), _defineProperty(_city_list,
  921800, "厄瓜多尔"), _defineProperty(_city_list,
  922200, "萨尔瓦多"), _defineProperty(_city_list,
  922600, "赤道几内亚"), _defineProperty(_city_list,
  923100, "埃塞俄比亚"), _defineProperty(_city_list,
  923200, "厄立特里亚"), _defineProperty(_city_list,
  923300, "爱沙尼亚"), _defineProperty(_city_list,
  923400, "法罗群岛"), _defineProperty(_city_list,
  923800, "马尔维纳斯群岛（ 福克兰）"), _defineProperty(_city_list,
  923900, "南乔治亚岛和南桑威奇群岛"), _defineProperty(_city_list,
  924200, "斐济群岛"), _defineProperty(_city_list,
  924600, "芬兰"), _defineProperty(_city_list,
  924800, "奥兰群岛"), _defineProperty(_city_list,
  925000, "法国"), _defineProperty(_city_list,
  925400, "法属圭亚那"), _defineProperty(_city_list,
  925800, "法属波利尼西亚"), _defineProperty(_city_list,
  926000, "法属南部领地"), _defineProperty(_city_list,
  926200, "吉布提"), _defineProperty(_city_list,
  926600, "加蓬"), _defineProperty(_city_list,
  926800, "格鲁吉亚"), _defineProperty(_city_list,
  927000, "冈比亚"), _defineProperty(_city_list,
  927500, "巴勒斯坦"), _defineProperty(_city_list,
  927600, "德国"), _defineProperty(_city_list,
  928800, "加纳"), _defineProperty(_city_list,
  929200, "直布罗陀"), _defineProperty(_city_list,
  929600, "基里巴斯"), _defineProperty(_city_list,
  930000, "希腊"), _defineProperty(_city_list,
  930400, "格陵兰"), _defineProperty(_city_list,
  930800, "格林纳达"), _defineProperty(_city_list,
  931200, "瓜德罗普"), _defineProperty(_city_list,
  931600, "关岛"), _defineProperty(_city_list,
  932000, "危地马拉"), _defineProperty(_city_list,
  932400, "几内亚"), _defineProperty(_city_list,
  932800, "圭亚那"), _defineProperty(_city_list,
  933200, "海地"), _defineProperty(_city_list,
  933400, "赫德岛和麦克唐纳群岛"), _defineProperty(_city_list,
  933600, "梵蒂冈"), _defineProperty(_city_list,
  934000, "洪都拉斯"), _defineProperty(_city_list,
  934800, "匈牙利"), _defineProperty(_city_list,
  935200, "冰岛"), _defineProperty(_city_list,
  935600, "印度"), _defineProperty(_city_list,
  936000, "印尼"), _defineProperty(_city_list,
  936400, "伊朗"), _defineProperty(_city_list,
  936800, "伊拉克"), _defineProperty(_city_list,
  937200, "爱尔兰"), _defineProperty(_city_list,
  937600, "以色列"), _defineProperty(_city_list,
  938000, "意大利"), _defineProperty(_city_list,
  938400, "科特迪瓦"), _defineProperty(_city_list,
  938800, "牙买加"), _defineProperty(_city_list,
  939200, "日本"), _defineProperty(_city_list,
  939800, "哈萨克斯坦"), _defineProperty(_city_list,
  940000, "约旦"), _defineProperty(_city_list,
  940400, "肯尼亚"), _defineProperty(_city_list,
  940800, "朝鲜 北朝鲜"), _defineProperty(_city_list,
  941000, "韩国"), _defineProperty(_city_list,
  941400, "科威特"), _defineProperty(_city_list,
  941700, "吉尔吉斯斯坦"), _defineProperty(_city_list,
  941800, "老挝"), _defineProperty(_city_list,
  942200, "黎巴嫩"), _defineProperty(_city_list,
  942600, "莱索托"), _defineProperty(_city_list,
  942800, "拉脱维亚"), _defineProperty(_city_list,
  943000, "利比里亚"), _defineProperty(_city_list,
  943400, "利比亚"), _defineProperty(_city_list,
  943800, "列支敦士登"), _defineProperty(_city_list,
  944000, "立陶宛"), _defineProperty(_city_list,
  944200, "卢森堡"), _defineProperty(_city_list,
  945000, "马达加斯加"), _defineProperty(_city_list,
  945400, "马拉维"), _defineProperty(_city_list,
  945800, "马来西亚"), _defineProperty(_city_list,
  946200, "马尔代夫"), _defineProperty(_city_list,
  946600, "马里"), _defineProperty(_city_list,
  947000, "马耳他"), _defineProperty(_city_list,
  947400, "马提尼克"), _defineProperty(_city_list,
  947800, "毛里塔尼亚"), _defineProperty(_city_list,
  948000, "毛里求斯"), _defineProperty(_city_list,
  948400, "墨西哥"), _defineProperty(_city_list,
  949200, "摩纳哥"), _defineProperty(_city_list,
  949600, "蒙古国"), _defineProperty(_city_list,
  949800, "摩尔多瓦"), _defineProperty(_city_list,
  949900, "黑山"), _defineProperty(_city_list,
  950000, "蒙塞拉特岛"), _defineProperty(_city_list,
  950400, "摩洛哥"), _defineProperty(_city_list,
  950800, "莫桑比克"), _defineProperty(_city_list,
  951200, "阿曼"), _defineProperty(_city_list,
  951600, "纳米比亚"), _defineProperty(_city_list,
  952000, "瑙鲁"), _defineProperty(_city_list,
  952400, "尼泊尔"), _defineProperty(_city_list,
  952800, "荷兰"), _defineProperty(_city_list,
  953300, "阿鲁巴"), _defineProperty(_city_list,
  953500, "荷兰加勒比区"), _defineProperty(_city_list,
  954000, "新喀里多尼亚"), _defineProperty(_city_list,
  954800, "瓦努阿图"), _defineProperty(_city_list,
  955400, "新西兰"), _defineProperty(_city_list,
  955800, "尼加拉瓜"), _defineProperty(_city_list,
  956200, "尼日尔"), _defineProperty(_city_list,
  956600, "尼日利亚"), _defineProperty(_city_list,
  957000, "纽埃"), _defineProperty(_city_list,
  957400, "诺福克岛"), _defineProperty(_city_list,
  957800, "挪威"), _defineProperty(_city_list,
  958000, "北马里亚纳群岛"), _defineProperty(_city_list,
  958100, "美国本土外小岛屿"), _defineProperty(_city_list,
  958300, "密克罗尼西亚联邦"), _defineProperty(_city_list,
  958400, "马绍尔群岛"), _defineProperty(_city_list,
  958500, "帕劳"), _defineProperty(_city_list,
  958600, "巴基斯坦"), _defineProperty(_city_list,
  959100, "巴拿马"), _defineProperty(_city_list,
  959800, "巴布亚新几内亚"), _defineProperty(_city_list,
  960000, "巴拉圭"), _defineProperty(_city_list,
  960400, "秘鲁"), _defineProperty(_city_list,
  960800, "菲律宾"), _defineProperty(_city_list,
  961200, "皮特凯恩群岛"), _defineProperty(_city_list,
  961600, "波兰"), _defineProperty(_city_list,
  962000, "葡萄牙"), _defineProperty(_city_list,
  962400, "几内亚比绍"), _defineProperty(_city_list,
  962600, "东帝汶"), _defineProperty(_city_list,
  963000, "波多黎各"), _defineProperty(_city_list,
  963400, "卡塔尔"), _defineProperty(_city_list,
  963800, "留尼汪"), _defineProperty(_city_list,
  964200, "罗马尼亚"), _defineProperty(_city_list,
  964300, "俄罗斯"), _defineProperty(_city_list,
  964600, "卢旺达"), _defineProperty(_city_list,
  965200, "圣巴泰勒米岛"), _defineProperty(_city_list,
  965400, "圣赫勒拿"), _defineProperty(_city_list,
  965900, "圣基茨和尼维斯"), _defineProperty(_city_list,
  966000, "安圭拉"), _defineProperty(_city_list,
  966200, "圣卢西亚"), _defineProperty(_city_list,
  966300, "法属圣马丁"), _defineProperty(_city_list,
  966600, "圣皮埃尔和密克隆"), _defineProperty(_city_list,
  967000, "圣文森特和格林纳丁斯"), _defineProperty(_city_list,
  967400, "圣马力诺"), _defineProperty(_city_list,
  967800, "圣多美和普林西比"), _defineProperty(_city_list,
  968200, "沙特阿拉伯"), _defineProperty(_city_list,
  968600, "塞内加尔"), _defineProperty(_city_list,
  968800, "塞尔维亚"), _defineProperty(_city_list,
  969000, "塞舌尔"), _defineProperty(_city_list,
  969400, "塞拉利昂"), _defineProperty(_city_list,
  970200, "新加坡"), _defineProperty(_city_list,
  970300, "斯洛伐克"), _defineProperty(_city_list,
  970400, "越南"), _defineProperty(_city_list,
  970500, "斯洛文尼亚"), _defineProperty(_city_list,
  970600, "索马里"), _defineProperty(_city_list,
  971000, "南非"), _defineProperty(_city_list,
  971600, "津巴布韦"), _defineProperty(_city_list,
  972400, "西班牙"), _defineProperty(_city_list,
  972800, "南苏丹"), _defineProperty(_city_list,
  972900, "苏丹"), _defineProperty(_city_list,
  973200, "西撒哈拉"), _defineProperty(_city_list,
  974000, "苏里南"), _defineProperty(_city_list,
  974400, "斯瓦尔巴群岛和 扬马延岛"), _defineProperty(_city_list,
  974800, "斯威士兰"), _defineProperty(_city_list,
  975200, "瑞典"), _defineProperty(_city_list,
  975600, "瑞士"), _defineProperty(_city_list,
  976000, "叙利亚"), _defineProperty(_city_list,
  976200, "塔吉克斯坦"), _defineProperty(_city_list,
  976400, "泰国"), _defineProperty(_city_list,
  976800, "多哥"), _defineProperty(_city_list,
  977200, "托克劳"), _defineProperty(_city_list,
  977600, "汤加"), _defineProperty(_city_list,
  978000, "特立尼达和多巴哥"), _defineProperty(_city_list,
  978400, "阿联酋"), _defineProperty(_city_list,
  978800, "突尼斯"), _defineProperty(_city_list,
  979200, "土耳其"), _defineProperty(_city_list,
  979500, "土库曼斯坦"), _defineProperty(_city_list,
  979600, "特克斯和凯科斯群岛"), _defineProperty(_city_list,
  979800, "图瓦卢"), _defineProperty(_city_list,
  980000, "乌干达"), _defineProperty(_city_list,
  980400, "乌克兰"), _defineProperty(_city_list,
  980700, "马其顿"), _defineProperty(_city_list,
  981800, "埃及"), _defineProperty(_city_list,
  982600, "英国"), _defineProperty(_city_list,
  983100, "根西岛"), _defineProperty(_city_list,
  983200, "泽西岛"), _defineProperty(_city_list,
  983300, "马恩岛"), _defineProperty(_city_list,
  983400, "坦桑尼亚"), _defineProperty(_city_list,
  984000, "美国"), _defineProperty(_city_list,
  985000, "美属维尔京群岛"), _defineProperty(_city_list,
  985400, "布基纳法索"), _defineProperty(_city_list,
  985800, "乌拉圭"), _defineProperty(_city_list,
  986000, "乌兹别克斯坦"), _defineProperty(_city_list,
  986200, "委内瑞拉"), _defineProperty(_city_list,
  987600, "瓦利斯和富图纳"), _defineProperty(_city_list,
  988200, "萨摩亚"), _defineProperty(_city_list,
  988700, "也门"), _defineProperty(_city_list,
  989400, "赞比亚"), _city_list),

  county_list: {
    110101: "东城区",
    110102: "西城区",
    110105: "朝阳区",
    110106: "丰台区",
    110107: "石景山区",
    110108: "海淀区",
    110109: "门头沟区",
    110111: "房山区",
    110112: "通州区",
    110113: "顺义区",
    110114: "昌平区",
    110115: "大兴区",
    110116: "怀柔区",
    110117: "平谷区",
    110118: "密云区",
    110119: "延庆区",
    120101: "和平区",
    120102: "河东区",
    120103: "河西区",
    120104: "南开区",
    120105: "河北区",
    120106: "红桥区",
    120110: "东丽区",
    120111: "西青区",
    120112: "津南区",
    120113: "北辰区",
    120114: "武清区",
    120115: "宝坻区",
    120116: "滨海新区",
    120117: "宁河区",
    120118: "静海区",
    120119: "蓟州区",
    130102: "长安区",
    130104: "桥西区",
    130105: "新华区",
    130107: "井陉矿区",
    130108: "裕华区",
    130109: "藁城区",
    130110: "鹿泉区",
    130111: "栾城区",
    130121: "井陉县",
    130123: "正定县",
    130125: "行唐县",
    130126: "灵寿县",
    130127: "高邑县",
    130128: "深泽县",
    130129: "赞皇县",
    130130: "无极县",
    130131: "平山县",
    130132: "元氏县",
    130133: "赵县",
    130181: "辛集市",
    130183: "晋州市",
    130184: "新乐市",
    130202: "路南区",
    130203: "路北区",
    130204: "古冶区",
    130205: "开平区",
    130207: "丰南区",
    130208: "丰润区",
    130209: "曹妃甸区",
    130224: "滦南县",
    130225: "乐亭县",
    130227: "迁西县",
    130229: "玉田县",
    130281: "遵化市",
    130283: "迁安市",
    130284: "滦州市",
    130302: "海港区",
    130303: "山海关区",
    130304: "北戴河区",
    130306: "抚宁区",
    130321: "青龙满族自治县",
    130322: "昌黎县",
    130324: "卢龙县",
    130390: "经济技术开发区",
    130402: "邯山区",
    130403: "丛台区",
    130404: "复兴区",
    130406: "峰峰矿区",
    130407: "肥乡区",
    130408: "永年区",
    130423: "临漳县",
    130424: "成安县",
    130425: "大名县",
    130426: "涉县",
    130427: "磁县",
    130430: "邱县",
    130431: "鸡泽县",
    130432: "广平县",
    130433: "馆陶县",
    130434: "魏县",
    130435: "曲周县",
    130481: "武安市",
    130502: "桥东区",
    130503: "桥西区",
    130521: "邢台县",
    130522: "临城县",
    130523: "内丘县",
    130524: "柏乡县",
    130525: "隆尧县",
    130526: "任县",
    130527: "南和县",
    130528: "宁晋县",
    130529: "巨鹿县",
    130530: "新河县",
    130531: "广宗县",
    130532: "平乡县",
    130533: "威县",
    130534: "清河县",
    130535: "临西县",
    130581: "南宫市",
    130582: "沙河市",
    130602: "竞秀区",
    130606: "莲池区",
    130607: "满城区",
    130608: "清苑区",
    130609: "徐水区",
    130623: "涞水县",
    130624: "阜平县",
    130626: "定兴县",
    130627: "唐县",
    130628: "高阳县",
    130629: "容城县",
    130630: "涞源县",
    130631: "望都县",
    130632: "安新县",
    130633: "易县",
    130634: "曲阳县",
    130635: "蠡县",
    130636: "顺平县",
    130637: "博野县",
    130638: "雄县",
    130681: "涿州市",
    130682: "定州市",
    130683: "安国市",
    130684: "高碑店市",
    130702: "桥东区",
    130703: "桥西区",
    130705: "宣化区",
    130706: "下花园区",
    130708: "万全区",
    130709: "崇礼区",
    130722: "张北县",
    130723: "康保县",
    130724: "沽源县",
    130725: "尚义县",
    130726: "蔚县",
    130727: "阳原县",
    130728: "怀安县",
    130730: "怀来县",
    130731: "涿鹿县",
    130732: "赤城县",
    130802: "双桥区",
    130803: "双滦区",
    130804: "鹰手营子矿区",
    130821: "承德县",
    130822: "兴隆县",
    130824: "滦平县",
    130825: "隆化县",
    130826: "丰宁满族自治县",
    130827: "宽城满族自治县",
    130828: "围场满族蒙古族自治县",
    130881: "平泉市",
    130902: "新华区",
    130903: "运河区",
    130921: "沧县",
    130922: "青县",
    130923: "东光县",
    130924: "海兴县",
    130925: "盐山县",
    130926: "肃宁县",
    130927: "南皮县",
    130928: "吴桥县",
    130929: "献县",
    130930: "孟村回族自治县",
    130981: "泊头市",
    130982: "任丘市",
    130983: "黄骅市",
    130984: "河间市",
    131002: "安次区",
    131003: "广阳区",
    131022: "固安县",
    131023: "永清县",
    131024: "香河县",
    131025: "大城县",
    131026: "文安县",
    131028: "大厂回族自治县",
    131081: "霸州市",
    131082: "三河市",
    131090: "开发区",
    131102: "桃城区",
    131103: "冀州区",
    131121: "枣强县",
    131122: "武邑县",
    131123: "武强县",
    131124: "饶阳县",
    131125: "安平县",
    131126: "故城县",
    131127: "景县",
    131128: "阜城县",
    131182: "深州市",
    140105: "小店区",
    140106: "迎泽区",
    140107: "杏花岭区",
    140108: "尖草坪区",
    140109: "万柏林区",
    140110: "晋源区",
    140121: "清徐县",
    140122: "阳曲县",
    140123: "娄烦县",
    140181: "古交市",
    140212: "新荣区",
    140213: "平城区",
    140214: "云冈区",
    140215: "云州区",
    140221: "阳高县",
    140222: "天镇县",
    140223: "广灵县",
    140224: "灵丘县",
    140225: "浑源县",
    140226: "左云县",
    140302: "城区",
    140303: "矿区",
    140311: "郊区",
    140321: "平定县",
    140322: "盂县",
    140403: "潞州区",
    140404: "上党区",
    140405: "屯留区",
    140406: "潞城区",
    140423: "襄垣县",
    140425: "平顺县",
    140426: "黎城县",
    140427: "壶关县",
    140428: "长子县",
    140429: "武乡县",
    140430: "沁县",
    140431: "沁源县",
    140502: "城区",
    140521: "沁水县",
    140522: "阳城县",
    140524: "陵川县",
    140525: "泽州县",
    140581: "高平市",
    140602: "朔城区",
    140603: "平鲁区",
    140621: "山阴县",
    140622: "应县",
    140623: "右玉县",
    140681: "怀仁市",
    140702: "榆次区",
    140721: "榆社县",
    140722: "左权县",
    140723: "和顺县",
    140724: "昔阳县",
    140725: "寿阳县",
    140726: "太谷县",
    140727: "祁县",
    140728: "平遥县",
    140729: "灵石县",
    140781: "介休市",
    140802: "盐湖区",
    140821: "临猗县",
    140822: "万荣县",
    140823: "闻喜县",
    140824: "稷山县",
    140825: "新绛县",
    140826: "绛县",
    140827: "垣曲县",
    140828: "夏县",
    140829: "平陆县",
    140830: "芮城县",
    140881: "永济市",
    140882: "河津市",
    140902: "忻府区",
    140921: "定襄县",
    140922: "五台县",
    140923: "代县",
    140924: "繁峙县",
    140925: "宁武县",
    140926: "静乐县",
    140927: "神池县",
    140928: "五寨县",
    140929: "岢岚县",
    140930: "河曲县",
    140931: "保德县",
    140932: "偏关县",
    140981: "原平市",
    141002: "尧都区",
    141021: "曲沃县",
    141022: "翼城县",
    141023: "襄汾县",
    141024: "洪洞县",
    141025: "古县",
    141026: "安泽县",
    141027: "浮山县",
    141028: "吉县",
    141029: "乡宁县",
    141030: "大宁县",
    141031: "隰县",
    141032: "永和县",
    141033: "蒲县",
    141034: "汾西县",
    141081: "侯马市",
    141082: "霍州市",
    141102: "离石区",
    141121: "文水县",
    141122: "交城县",
    141123: "兴县",
    141124: "临县",
    141125: "柳林县",
    141126: "石楼县",
    141127: "岚县",
    141128: "方山县",
    141129: "中阳县",
    141130: "交口县",
    141181: "孝义市",
    141182: "汾阳市",
    150102: "新城区",
    150103: "回民区",
    150104: "玉泉区",
    150105: "赛罕区",
    150121: "土默特左旗",
    150122: "托克托县",
    150123: "和林格尔县",
    150124: "清水河县",
    150125: "武川县",
    150202: "东河区",
    150203: "昆都仑区",
    150204: "青山区",
    150205: "石拐区",
    150206: "白云鄂博矿区",
    150207: "九原区",
    150221: "土默特右旗",
    150222: "固阳县",
    150223: "达尔罕茂明安联合旗",
    150302: "海勃湾区",
    150303: "海南区",
    150304: "乌达区",
    150402: "红山区",
    150403: "元宝山区",
    150404: "松山区",
    150421: "阿鲁科尔沁旗",
    150422: "巴林左旗",
    150423: "巴林右旗",
    150424: "林西县",
    150425: "克什克腾旗",
    150426: "翁牛特旗",
    150428: "喀喇沁旗",
    150429: "宁城县",
    150430: "敖汉旗",
    150502: "科尔沁区",
    150521: "科尔沁左翼中旗",
    150522: "科尔沁左翼后旗",
    150523: "开鲁县",
    150524: "库伦旗",
    150525: "奈曼旗",
    150526: "扎鲁特旗",
    150581: "霍林郭勒市",
    150602: "东胜区",
    150603: "康巴什区",
    150621: "达拉特旗",
    150622: "准格尔旗",
    150623: "鄂托克前旗",
    150624: "鄂托克旗",
    150625: "杭锦旗",
    150626: "乌审旗",
    150627: "伊金霍洛旗",
    150702: "海拉尔区",
    150703: "扎赉诺尔区",
    150721: "阿荣旗",
    150722: "莫力达瓦达斡尔族自治旗",
    150723: "鄂伦春自治旗",
    150724: "鄂温克族自治旗",
    150725: "陈巴尔虎旗",
    150726: "新巴尔虎左旗",
    150727: "新巴尔虎右旗",
    150781: "满洲里市",
    150782: "牙克石市",
    150783: "扎兰屯市",
    150784: "额尔古纳市",
    150785: "根河市",
    150802: "临河区",
    150821: "五原县",
    150822: "磴口县",
    150823: "乌拉特前旗",
    150824: "乌拉特中旗",
    150825: "乌拉特后旗",
    150826: "杭锦后旗",
    150902: "集宁区",
    150921: "卓资县",
    150922: "化德县",
    150923: "商都县",
    150924: "兴和县",
    150925: "凉城县",
    150926: "察哈尔右翼前旗",
    150927: "察哈尔右翼中旗",
    150928: "察哈尔右翼后旗",
    150929: "四子王旗",
    150981: "丰镇市",
    152201: "乌兰浩特市",
    152202: "阿尔山市",
    152221: "科尔沁右翼前旗",
    152222: "科尔沁右翼中旗",
    152223: "扎赉特旗",
    152224: "突泉县",
    152501: "二连浩特市",
    152502: "锡林浩特市",
    152522: "阿巴嘎旗",
    152523: "苏尼特左旗",
    152524: "苏尼特右旗",
    152525: "东乌珠穆沁旗",
    152526: "西乌珠穆沁旗",
    152527: "太仆寺旗",
    152528: "镶黄旗",
    152529: "正镶白旗",
    152530: "正蓝旗",
    152531: "多伦县",
    152921: "阿拉善左旗",
    152922: "阿拉善右旗",
    152923: "额济纳旗",
    210102: "和平区",
    210103: "沈河区",
    210104: "大东区",
    210105: "皇姑区",
    210106: "铁西区",
    210111: "苏家屯区",
    210112: "浑南区",
    210113: "沈北新区",
    210114: "于洪区",
    210115: "辽中区",
    210123: "康平县",
    210124: "法库县",
    210181: "新民市",
    210190: "经济技术开发区",
    210202: "中山区",
    210203: "西岗区",
    210204: "沙河口区",
    210211: "甘井子区",
    210212: "旅顺口区",
    210213: "金州区",
    210214: "普兰店区",
    210224: "长海县",
    210281: "瓦房店市",
    210283: "庄河市",
    210302: "铁东区",
    210303: "铁西区",
    210304: "立山区",
    210311: "千山区",
    210321: "台安县",
    210323: "岫岩满族自治县",
    210381: "海城市",
    210390: "高新区",
    210402: "新抚区",
    210403: "东洲区",
    210404: "望花区",
    210411: "顺城区",
    210421: "抚顺县",
    210422: "新宾满族自治县",
    210423: "清原满族自治县",
    210502: "平山区",
    210503: "溪湖区",
    210504: "明山区",
    210505: "南芬区",
    210521: "本溪满族自治县",
    210522: "桓仁满族自治县",
    210602: "元宝区",
    210603: "振兴区",
    210604: "振安区",
    210624: "宽甸满族自治县",
    210681: "东港市",
    210682: "凤城市",
    210702: "古塔区",
    210703: "凌河区",
    210711: "太和区",
    210726: "黑山县",
    210727: "义县",
    210781: "凌海市",
    210782: "北镇市",
    210793: "经济技术开发区",
    210802: "站前区",
    210803: "西市区",
    210804: "鲅鱼圈区",
    210811: "老边区",
    210881: "盖州市",
    210882: "大石桥市",
    210902: "海州区",
    210903: "新邱区",
    210904: "太平区",
    210905: "清河门区",
    210911: "细河区",
    210921: "阜新蒙古族自治县",
    210922: "彰武县",
    211002: "白塔区",
    211003: "文圣区",
    211004: "宏伟区",
    211005: "弓长岭区",
    211011: "太子河区",
    211021: "辽阳县",
    211081: "灯塔市",
    211102: "双台子区",
    211103: "兴隆台区",
    211104: "大洼区",
    211122: "盘山县",
    211202: "银州区",
    211204: "清河区",
    211221: "铁岭县",
    211223: "西丰县",
    211224: "昌图县",
    211281: "调兵山市",
    211282: "开原市",
    211302: "双塔区",
    211303: "龙城区",
    211321: "朝阳县",
    211322: "建平县",
    211324: "喀喇沁左翼蒙古族自治县",
    211381: "北票市",
    211382: "凌源市",
    211402: "连山区",
    211403: "龙港区",
    211404: "南票区",
    211421: "绥中县",
    211422: "建昌县",
    211481: "兴城市",
    220102: "南关区",
    220103: "宽城区",
    220104: "朝阳区",
    220105: "二道区",
    220106: "绿园区",
    220112: "双阳区",
    220113: "九台区",
    220122: "农安县",
    220182: "榆树市",
    220183: "德惠市",
    220192: "经济技术开发区",
    220202: "昌邑区",
    220203: "龙潭区",
    220204: "船营区",
    220211: "丰满区",
    220221: "永吉县",
    220281: "蛟河市",
    220282: "桦甸市",
    220283: "舒兰市",
    220284: "磐石市",
    220302: "铁西区",
    220303: "铁东区",
    220322: "梨树县",
    220323: "伊通满族自治县",
    220381: "公主岭市",
    220382: "双辽市",
    220402: "龙山区",
    220403: "西安区",
    220421: "东丰县",
    220422: "东辽县",
    220502: "东昌区",
    220503: "二道江区",
    220521: "通化县",
    220523: "辉南县",
    220524: "柳河县",
    220581: "梅河口市",
    220582: "集安市",
    220602: "浑江区",
    220605: "江源区",
    220621: "抚松县",
    220622: "靖宇县",
    220623: "长白朝鲜族自治县",
    220681: "临江市",
    220702: "宁江区",
    220721: "前郭尔罗斯蒙古族自治县",
    220722: "长岭县",
    220723: "乾安县",
    220781: "扶余市",
    220802: "洮北区",
    220821: "镇赉县",
    220822: "通榆县",
    220881: "洮南市",
    220882: "大安市",
    222401: "延吉市",
    222402: "图们市",
    222403: "敦化市",
    222404: "珲春市",
    222405: "龙井市",
    222406: "和龙市",
    222424: "汪清县",
    222426: "安图县",
    230102: "道里区",
    230103: "南岗区",
    230104: "道外区",
    230108: "平房区",
    230109: "松北区",
    230110: "香坊区",
    230111: "呼兰区",
    230112: "阿城区",
    230113: "双城区",
    230123: "依兰县",
    230124: "方正县",
    230125: "宾县",
    230126: "巴彦县",
    230127: "木兰县",
    230128: "通河县",
    230129: "延寿县",
    230183: "尚志市",
    230184: "五常市",
    230202: "龙沙区",
    230203: "建华区",
    230204: "铁锋区",
    230205: "昂昂溪区",
    230206: "富拉尔基区",
    230207: "碾子山区",
    230208: "梅里斯达斡尔族区",
    230221: "龙江县",
    230223: "依安县",
    230224: "泰来县",
    230225: "甘南县",
    230227: "富裕县",
    230229: "克山县",
    230230: "克东县",
    230231: "拜泉县",
    230281: "讷河市",
    230302: "鸡冠区",
    230303: "恒山区",
    230304: "滴道区",
    230305: "梨树区",
    230306: "城子河区",
    230307: "麻山区",
    230321: "鸡东县",
    230381: "虎林市",
    230382: "密山市",
    230402: "向阳区",
    230403: "工农区",
    230404: "南山区",
    230405: "兴安区",
    230406: "东山区",
    230407: "兴山区",
    230421: "萝北县",
    230422: "绥滨县",
    230502: "尖山区",
    230503: "岭东区",
    230505: "四方台区",
    230506: "宝山区",
    230521: "集贤县",
    230522: "友谊县",
    230523: "宝清县",
    230524: "饶河县",
    230602: "萨尔图区",
    230603: "龙凤区",
    230604: "让胡路区",
    230605: "红岗区",
    230606: "大同区",
    230621: "肇州县",
    230622: "肇源县",
    230623: "林甸县",
    230624: "杜尔伯特蒙古族自治县",
    230702: "伊春区",
    230703: "南岔区",
    230704: "友好区",
    230705: "西林区",
    230706: "翠峦区",
    230707: "新青区",
    230708: "美溪区",
    230709: "金山屯区",
    230710: "五营区",
    230711: "乌马河区",
    230712: "汤旺河区",
    230713: "带岭区",
    230714: "乌伊岭区",
    230715: "红星区",
    230716: "上甘岭区",
    230722: "嘉荫县",
    230781: "铁力市",
    230803: "向阳区",
    230804: "前进区",
    230805: "东风区",
    230811: "郊区",
    230822: "桦南县",
    230826: "桦川县",
    230828: "汤原县",
    230881: "同江市",
    230882: "富锦市",
    230883: "抚远市",
    230902: "新兴区",
    230903: "桃山区",
    230904: "茄子河区",
    230921: "勃利县",
    231002: "东安区",
    231003: "阳明区",
    231004: "爱民区",
    231005: "西安区",
    231025: "林口县",
    231081: "绥芬河市",
    231083: "海林市",
    231084: "宁安市",
    231085: "穆棱市",
    231086: "东宁市",
    231102: "爱辉区",
    231121: "嫩江县",
    231123: "逊克县",
    231124: "孙吴县",
    231181: "北安市",
    231182: "五大连池市",
    231202: "北林区",
    231221: "望奎县",
    231222: "兰西县",
    231223: "青冈县",
    231224: "庆安县",
    231225: "明水县",
    231226: "绥棱县",
    231281: "安达市",
    231282: "肇东市",
    231283: "海伦市",
    232701: "漠河市",
    232721: "呼玛县",
    232722: "塔河县",
    232790: "松岭区",
    232791: "呼中区",
    232792: "加格达奇区",
    232793: "新林区",
    310101: "黄浦区",
    310104: "徐汇区",
    310105: "长宁区",
    310106: "静安区",
    310107: "普陀区",
    310109: "虹口区",
    310110: "杨浦区",
    310112: "闵行区",
    310113: "宝山区",
    310114: "嘉定区",
    310115: "浦东新区",
    310116: "金山区",
    310117: "松江区",
    310118: "青浦区",
    310120: "奉贤区",
    310151: "崇明区",
    320102: "玄武区",
    320104: "秦淮区",
    320105: "建邺区",
    320106: "鼓楼区",
    320111: "浦口区",
    320113: "栖霞区",
    320114: "雨花台区",
    320115: "江宁区",
    320116: "六合区",
    320117: "溧水区",
    320118: "高淳区",
    320205: "锡山区",
    320206: "惠山区",
    320211: "滨湖区",
    320213: "梁溪区",
    320214: "新吴区",
    320281: "江阴市",
    320282: "宜兴市",
    320302: "鼓楼区",
    320303: "云龙区",
    320305: "贾汪区",
    320311: "泉山区",
    320312: "铜山区",
    320321: "丰县",
    320322: "沛县",
    320324: "睢宁县",
    320381: "新沂市",
    320382: "邳州市",
    320391: "工业园区",
    320402: "天宁区",
    320404: "钟楼区",
    320411: "新北区",
    320412: "武进区",
    320413: "金坛区",
    320481: "溧阳市",
    320505: "虎丘区",
    320506: "吴中区",
    320507: "相城区",
    320508: "姑苏区",
    320509: "吴江区",
    320581: "常熟市",
    320582: "张家港市",
    320583: "昆山市",
    320585: "太仓市",
    320590: "工业园区",
    320591: "高新区",
    320602: "崇川区",
    320611: "港闸区",
    320612: "通州区",
    320623: "如东县",
    320681: "启东市",
    320682: "如皋市",
    320684: "海门市",
    320685: "海安市",
    320691: "高新区",
    320703: "连云区",
    320706: "海州区",
    320707: "赣榆区",
    320722: "东海县",
    320723: "灌云县",
    320724: "灌南县",
    320803: "淮安区",
    320804: "淮阴区",
    320812: "清江浦区",
    320813: "洪泽区",
    320826: "涟水县",
    320830: "盱眙县",
    320831: "金湖县",
    320890: "经济开发区",
    320902: "亭湖区",
    320903: "盐都区",
    320904: "大丰区",
    320921: "响水县",
    320922: "滨海县",
    320923: "阜宁县",
    320924: "射阳县",
    320925: "建湖县",
    320981: "东台市",
    321002: "广陵区",
    321003: "邗江区",
    321012: "江都区",
    321023: "宝应县",
    321081: "仪征市",
    321084: "高邮市",
    321090: "经济开发区",
    321102: "京口区",
    321111: "润州区",
    321112: "丹徒区",
    321181: "丹阳市",
    321182: "扬中市",
    321183: "句容市",
    321202: "海陵区",
    321203: "高港区",
    321204: "姜堰区",
    321281: "兴化市",
    321282: "靖江市",
    321283: "泰兴市",
    321302: "宿城区",
    321311: "宿豫区",
    321322: "沭阳县",
    321323: "泗阳县",
    321324: "泗洪县",
    330102: "上城区",
    330103: "下城区",
    330104: "江干区",
    330105: "拱墅区",
    330106: "西湖区",
    330108: "滨江区",
    330109: "萧山区",
    330110: "余杭区",
    330111: "富阳区",
    330112: "临安区",
    330122: "桐庐县",
    330127: "淳安县",
    330182: "建德市",
    330203: "海曙区",
    330205: "江北区",
    330206: "北仑区",
    330211: "镇海区",
    330212: "鄞州区",
    330213: "奉化区",
    330225: "象山县",
    330226: "宁海县",
    330281: "余姚市",
    330282: "慈溪市",
    330302: "鹿城区",
    330303: "龙湾区",
    330304: "瓯海区",
    330305: "洞头区",
    330324: "永嘉县",
    330326: "平阳县",
    330327: "苍南县",
    330328: "文成县",
    330329: "泰顺县",
    330381: "瑞安市",
    330382: "乐清市",
    330402: "南湖区",
    330411: "秀洲区",
    330421: "嘉善县",
    330424: "海盐县",
    330481: "海宁市",
    330482: "平湖市",
    330483: "桐乡市",
    330502: "吴兴区",
    330503: "南浔区",
    330521: "德清县",
    330522: "长兴县",
    330523: "安吉县",
    330602: "越城区",
    330603: "柯桥区",
    330604: "上虞区",
    330624: "新昌县",
    330681: "诸暨市",
    330683: "嵊州市",
    330702: "婺城区",
    330703: "金东区",
    330723: "武义县",
    330726: "浦江县",
    330727: "磐安县",
    330781: "兰溪市",
    330782: "义乌市",
    330783: "东阳市",
    330784: "永康市",
    330802: "柯城区",
    330803: "衢江区",
    330822: "常山县",
    330824: "开化县",
    330825: "龙游县",
    330881: "江山市",
    330902: "定海区",
    330903: "普陀区",
    330921: "岱山县",
    330922: "嵊泗县",
    331002: "椒江区",
    331003: "黄岩区",
    331004: "路桥区",
    331022: "三门县",
    331023: "天台县",
    331024: "仙居县",
    331081: "温岭市",
    331082: "临海市",
    331083: "玉环市",
    331102: "莲都区",
    331121: "青田县",
    331122: "缙云县",
    331123: "遂昌县",
    331124: "松阳县",
    331125: "云和县",
    331126: "庆元县",
    331127: "景宁畲族自治县",
    331181: "龙泉市",
    340102: "瑶海区",
    340103: "庐阳区",
    340104: "蜀山区",
    340111: "包河区",
    340121: "长丰县",
    340122: "肥东县",
    340123: "肥西县",
    340124: "庐江县",
    340181: "巢湖市",
    340190: "高新技术开发区",
    340191: "经济技术开发区",
    340202: "镜湖区",
    340203: "弋江区",
    340207: "鸠江区",
    340208: "三山区",
    340221: "芜湖县",
    340222: "繁昌县",
    340223: "南陵县",
    340225: "无为县",
    340302: "龙子湖区",
    340303: "蚌山区",
    340304: "禹会区",
    340311: "淮上区",
    340321: "怀远县",
    340322: "五河县",
    340323: "固镇县",
    340402: "大通区",
    340403: "田家庵区",
    340404: "谢家集区",
    340405: "八公山区",
    340406: "潘集区",
    340421: "凤台县",
    340422: "寿县",
    340503: "花山区",
    340504: "雨山区",
    340506: "博望区",
    340521: "当涂县",
    340522: "含山县",
    340523: "和县",
    340602: "杜集区",
    340603: "相山区",
    340604: "烈山区",
    340621: "濉溪县",
    340705: "铜官区",
    340706: "义安区",
    340711: "郊区",
    340722: "枞阳县",
    340802: "迎江区",
    340803: "大观区",
    340811: "宜秀区",
    340822: "怀宁县",
    340824: "潜山县",
    340825: "太湖县",
    340826: "宿松县",
    340827: "望江县",
    340828: "岳西县",
    340881: "桐城市",
    341002: "屯溪区",
    341003: "黄山区",
    341004: "徽州区",
    341021: "歙县",
    341022: "休宁县",
    341023: "黟县",
    341024: "祁门县",
    341102: "琅琊区",
    341103: "南谯区",
    341122: "来安县",
    341124: "全椒县",
    341125: "定远县",
    341126: "凤阳县",
    341181: "天长市",
    341182: "明光市",
    341202: "颍州区",
    341203: "颍东区",
    341204: "颍泉区",
    341221: "临泉县",
    341222: "太和县",
    341225: "阜南县",
    341226: "颍上县",
    341282: "界首市",
    341302: "埇桥区",
    341321: "砀山县",
    341322: "萧县",
    341323: "灵璧县",
    341324: "泗县",
    341390: "经济开发区",
    341502: "金安区",
    341503: "裕安区",
    341504: "叶集区",
    341522: "霍邱县",
    341523: "舒城县",
    341524: "金寨县",
    341525: "霍山县",
    341602: "谯城区",
    341621: "涡阳县",
    341622: "蒙城县",
    341623: "利辛县",
    341702: "贵池区",
    341721: "东至县",
    341722: "石台县",
    341723: "青阳县",
    341802: "宣州区",
    341821: "郎溪县",
    341822: "广德县",
    341823: "泾县",
    341824: "绩溪县",
    341825: "旌德县",
    341881: "宁国市",
    350102: "鼓楼区",
    350103: "台江区",
    350104: "仓山区",
    350105: "马尾区",
    350111: "晋安区",
    350112: "长乐区",
    350121: "闽侯县",
    350122: "连江县",
    350123: "罗源县",
    350124: "闽清县",
    350125: "永泰县",
    350128: "平潭县",
    350181: "福清市",
    350203: "思明区",
    350205: "海沧区",
    350206: "湖里区",
    350211: "集美区",
    350212: "同安区",
    350213: "翔安区",
    350302: "城厢区",
    350303: "涵江区",
    350304: "荔城区",
    350305: "秀屿区",
    350322: "仙游县",
    350402: "梅列区",
    350403: "三元区",
    350421: "明溪县",
    350423: "清流县",
    350424: "宁化县",
    350425: "大田县",
    350426: "尤溪县",
    350427: "沙县",
    350428: "将乐县",
    350429: "泰宁县",
    350430: "建宁县",
    350481: "永安市",
    350502: "鲤城区",
    350503: "丰泽区",
    350504: "洛江区",
    350505: "泉港区",
    350521: "惠安县",
    350524: "安溪县",
    350525: "永春县",
    350526: "德化县",
    350527: "金门县",
    350581: "石狮市",
    350582: "晋江市",
    350583: "南安市",
    350602: "芗城区",
    350603: "龙文区",
    350622: "云霄县",
    350623: "漳浦县",
    350624: "诏安县",
    350625: "长泰县",
    350626: "东山县",
    350627: "南靖县",
    350628: "平和县",
    350629: "华安县",
    350681: "龙海市",
    350702: "延平区",
    350703: "建阳区",
    350721: "顺昌县",
    350722: "浦城县",
    350723: "光泽县",
    350724: "松溪县",
    350725: "政和县",
    350781: "邵武市",
    350782: "武夷山市",
    350783: "建瓯市",
    350802: "新罗区",
    350803: "永定区",
    350821: "长汀县",
    350823: "上杭县",
    350824: "武平县",
    350825: "连城县",
    350881: "漳平市",
    350902: "蕉城区",
    350921: "霞浦县",
    350922: "古田县",
    350923: "屏南县",
    350924: "寿宁县",
    350925: "周宁县",
    350926: "柘荣县",
    350981: "福安市",
    350982: "福鼎市",
    360102: "东湖区",
    360103: "西湖区",
    360104: "青云谱区",
    360105: "湾里区",
    360111: "青山湖区",
    360112: "新建区",
    360121: "南昌县",
    360123: "安义县",
    360124: "进贤县",
    360190: "经济技术开发区",
    360192: "高新区",
    360202: "昌江区",
    360203: "珠山区",
    360222: "浮梁县",
    360281: "乐平市",
    360302: "安源区",
    360313: "湘东区",
    360321: "莲花县",
    360322: "上栗县",
    360323: "芦溪县",
    360402: "濂溪区",
    360403: "浔阳区",
    360404: "柴桑区",
    360423: "武宁县",
    360424: "修水县",
    360425: "永修县",
    360426: "德安县",
    360428: "都昌县",
    360429: "湖口县",
    360430: "彭泽县",
    360481: "瑞昌市",
    360482: "共青城市",
    360483: "庐山市",
    360490: "经济技术开发区",
    360502: "渝水区",
    360521: "分宜县",
    360602: "月湖区",
    360603: "余江区",
    360681: "贵溪市",
    360702: "章贡区",
    360703: "南康区",
    360704: "赣县区",
    360722: "信丰县",
    360723: "大余县",
    360724: "上犹县",
    360725: "崇义县",
    360726: "安远县",
    360727: "龙南县",
    360728: "定南县",
    360729: "全南县",
    360730: "宁都县",
    360731: "于都县",
    360732: "兴国县",
    360733: "会昌县",
    360734: "寻乌县",
    360735: "石城县",
    360781: "瑞金市",
    360802: "吉州区",
    360803: "青原区",
    360821: "吉安县",
    360822: "吉水县",
    360823: "峡江县",
    360824: "新干县",
    360825: "永丰县",
    360826: "泰和县",
    360827: "遂川县",
    360828: "万安县",
    360829: "安福县",
    360830: "永新县",
    360881: "井冈山市",
    360902: "袁州区",
    360921: "奉新县",
    360922: "万载县",
    360923: "上高县",
    360924: "宜丰县",
    360925: "靖安县",
    360926: "铜鼓县",
    360981: "丰城市",
    360982: "樟树市",
    360983: "高安市",
    361002: "临川区",
    361003: "东乡区",
    361021: "南城县",
    361022: "黎川县",
    361023: "南丰县",
    361024: "崇仁县",
    361025: "乐安县",
    361026: "宜黄县",
    361027: "金溪县",
    361028: "资溪县",
    361030: "广昌县",
    361102: "信州区",
    361103: "广丰区",
    361121: "上饶县",
    361123: "玉山县",
    361124: "铅山县",
    361125: "横峰县",
    361126: "弋阳县",
    361127: "余干县",
    361128: "鄱阳县",
    361129: "万年县",
    361130: "婺源县",
    361181: "德兴市",
    370102: "历下区",
    370103: "市中区",
    370104: "槐荫区",
    370105: "天桥区",
    370112: "历城区",
    370113: "长清区",
    370114: "章丘区",
    370115: "济阳区",
    370116: "莱芜区",
    370117: "钢城区",
    370124: "平阴县",
    370126: "商河县",
    370190: "高新区",
    370202: "市南区",
    370203: "市北区",
    370211: "黄岛区",
    370212: "崂山区",
    370213: "李沧区",
    370214: "城阳区",
    370215: "即墨区",
    370281: "胶州市",
    370283: "平度市",
    370285: "莱西市",
    370290: "开发区",
    370302: "淄川区",
    370303: "张店区",
    370304: "博山区",
    370305: "临淄区",
    370306: "周村区",
    370321: "桓台县",
    370322: "高青县",
    370323: "沂源县",
    370402: "市中区",
    370403: "薛城区",
    370404: "峄城区",
    370405: "台儿庄区",
    370406: "山亭区",
    370481: "滕州市",
    370502: "东营区",
    370503: "河口区",
    370505: "垦利区",
    370522: "利津县",
    370523: "广饶县",
    370602: "芝罘区",
    370611: "福山区",
    370612: "牟平区",
    370613: "莱山区",
    370634: "长岛县",
    370681: "龙口市",
    370682: "莱阳市",
    370683: "莱州市",
    370684: "蓬莱市",
    370685: "招远市",
    370686: "栖霞市",
    370687: "海阳市",
    370690: "开发区",
    370702: "潍城区",
    370703: "寒亭区",
    370704: "坊子区",
    370705: "奎文区",
    370724: "临朐县",
    370725: "昌乐县",
    370781: "青州市",
    370782: "诸城市",
    370783: "寿光市",
    370784: "安丘市",
    370785: "高密市",
    370786: "昌邑市",
    370790: "开发区",
    370791: "高新区",
    370811: "任城区",
    370812: "兖州区",
    370826: "微山县",
    370827: "鱼台县",
    370828: "金乡县",
    370829: "嘉祥县",
    370830: "汶上县",
    370831: "泗水县",
    370832: "梁山县",
    370881: "曲阜市",
    370883: "邹城市",
    370890: "高新区",
    370902: "泰山区",
    370911: "岱岳区",
    370921: "宁阳县",
    370923: "东平县",
    370982: "新泰市",
    370983: "肥城市",
    371002: "环翠区",
    371003: "文登区",
    371082: "荣成市",
    371083: "乳山市",
    371091: "经济技术开发区",
    371102: "东港区",
    371103: "岚山区",
    371121: "五莲县",
    371122: "莒县",
    371302: "兰山区",
    371311: "罗庄区",
    371312: "河东区",
    371321: "沂南县",
    371322: "郯城县",
    371323: "沂水县",
    371324: "兰陵县",
    371325: "费县",
    371326: "平邑县",
    371327: "莒南县",
    371328: "蒙阴县",
    371329: "临沭县",
    371402: "德城区",
    371403: "陵城区",
    371422: "宁津县",
    371423: "庆云县",
    371424: "临邑县",
    371425: "齐河县",
    371426: "平原县",
    371427: "夏津县",
    371428: "武城县",
    371481: "乐陵市",
    371482: "禹城市",
    371502: "东昌府区",
    371521: "阳谷县",
    371522: "莘县",
    371523: "茌平县",
    371524: "东阿县",
    371525: "冠县",
    371526: "高唐县",
    371581: "临清市",
    371602: "滨城区",
    371603: "沾化区",
    371621: "惠民县",
    371622: "阳信县",
    371623: "无棣县",
    371625: "博兴县",
    371681: "邹平市",
    371702: "牡丹区",
    371703: "定陶区",
    371721: "曹县",
    371722: "单县",
    371723: "成武县",
    371724: "巨野县",
    371725: "郓城县",
    371726: "鄄城县",
    371728: "东明县",
    410102: "中原区",
    410103: "二七区",
    410104: "管城回族区",
    410105: "金水区",
    410106: "上街区",
    410108: "惠济区",
    410122: "中牟县",
    410181: "巩义市",
    410182: "荥阳市",
    410183: "新密市",
    410184: "新郑市",
    410185: "登封市",
    410190: "高新技术开发区",
    410191: "经济技术开发区",
    410202: "龙亭区",
    410203: "顺河回族区",
    410204: "鼓楼区",
    410205: "禹王台区",
    410212: "祥符区",
    410221: "杞县",
    410222: "通许县",
    410223: "尉氏县",
    410225: "兰考县",
    410302: "老城区",
    410303: "西工区",
    410304: "瀍河回族区",
    410305: "涧西区",
    410306: "吉利区",
    410311: "洛龙区",
    410322: "孟津县",
    410323: "新安县",
    410324: "栾川县",
    410325: "嵩县",
    410326: "汝阳县",
    410327: "宜阳县",
    410328: "洛宁县",
    410329: "伊川县",
    410381: "偃师市",
    410402: "新华区",
    410403: "卫东区",
    410404: "石龙区",
    410411: "湛河区",
    410421: "宝丰县",
    410422: "叶县",
    410423: "鲁山县",
    410425: "郏县",
    410481: "舞钢市",
    410482: "汝州市",
    410502: "文峰区",
    410503: "北关区",
    410505: "殷都区",
    410506: "龙安区",
    410522: "安阳县",
    410523: "汤阴县",
    410526: "滑县",
    410527: "内黄县",
    410581: "林州市",
    410590: "开发区",
    410602: "鹤山区",
    410603: "山城区",
    410611: "淇滨区",
    410621: "浚县",
    410622: "淇县",
    410702: "红旗区",
    410703: "卫滨区",
    410704: "凤泉区",
    410711: "牧野区",
    410721: "新乡县",
    410724: "获嘉县",
    410725: "原阳县",
    410726: "延津县",
    410727: "封丘县",
    410728: "长垣县",
    410781: "卫辉市",
    410782: "辉县市",
    410802: "解放区",
    410803: "中站区",
    410804: "马村区",
    410811: "山阳区",
    410821: "修武县",
    410822: "博爱县",
    410823: "武陟县",
    410825: "温县",
    410882: "沁阳市",
    410883: "孟州市",
    410902: "华龙区",
    410922: "清丰县",
    410923: "南乐县",
    410926: "范县",
    410927: "台前县",
    410928: "濮阳县",
    411002: "魏都区",
    411003: "建安区",
    411024: "鄢陵县",
    411025: "襄城县",
    411081: "禹州市",
    411082: "长葛市",
    411102: "源汇区",
    411103: "郾城区",
    411104: "召陵区",
    411121: "舞阳县",
    411122: "临颍县",
    411202: "湖滨区",
    411203: "陕州区",
    411221: "渑池县",
    411224: "卢氏县",
    411281: "义马市",
    411282: "灵宝市",
    411302: "宛城区",
    411303: "卧龙区",
    411321: "南召县",
    411322: "方城县",
    411323: "西峡县",
    411324: "镇平县",
    411325: "内乡县",
    411326: "淅川县",
    411327: "社旗县",
    411328: "唐河县",
    411329: "新野县",
    411330: "桐柏县",
    411381: "邓州市",
    411402: "梁园区",
    411403: "睢阳区",
    411421: "民权县",
    411422: "睢县",
    411423: "宁陵县",
    411424: "柘城县",
    411425: "虞城县",
    411426: "夏邑县",
    411481: "永城市",
    411502: "浉河区",
    411503: "平桥区",
    411521: "罗山县",
    411522: "光山县",
    411523: "新县",
    411524: "商城县",
    411525: "固始县",
    411526: "潢川县",
    411527: "淮滨县",
    411528: "息县",
    411602: "川汇区",
    411621: "扶沟县",
    411622: "西华县",
    411623: "商水县",
    411624: "沈丘县",
    411625: "郸城县",
    411626: "淮阳县",
    411627: "太康县",
    411628: "鹿邑县",
    411681: "项城市",
    411690: "经济开发区",
    411702: "驿城区",
    411721: "西平县",
    411722: "上蔡县",
    411723: "平舆县",
    411724: "正阳县",
    411725: "确山县",
    411726: "泌阳县",
    411727: "汝南县",
    411728: "遂平县",
    411729: "新蔡县",
    419001: "济源市",
    420102: "江岸区",
    420103: "江汉区",
    420104: "硚口区",
    420105: "汉阳区",
    420106: "武昌区",
    420107: "青山区",
    420111: "洪山区",
    420112: "东西湖区",
    420113: "汉南区",
    420114: "蔡甸区",
    420115: "江夏区",
    420116: "黄陂区",
    420117: "新洲区",
    420202: "黄石港区",
    420203: "西塞山区",
    420204: "下陆区",
    420205: "铁山区",
    420222: "阳新县",
    420281: "大冶市",
    420302: "茅箭区",
    420303: "张湾区",
    420304: "郧阳区",
    420322: "郧西县",
    420323: "竹山县",
    420324: "竹溪县",
    420325: "房县",
    420381: "丹江口市",
    420502: "西陵区",
    420503: "伍家岗区",
    420504: "点军区",
    420505: "猇亭区",
    420506: "夷陵区",
    420525: "远安县",
    420526: "兴山县",
    420527: "秭归县",
    420528: "长阳土家族自治县",
    420529: "五峰土家族自治县",
    420581: "宜都市",
    420582: "当阳市",
    420583: "枝江市",
    420590: "经济开发区",
    420602: "襄城区",
    420606: "樊城区",
    420607: "襄州区",
    420624: "南漳县",
    420625: "谷城县",
    420626: "保康县",
    420682: "老河口市",
    420683: "枣阳市",
    420684: "宜城市",
    420702: "梁子湖区",
    420703: "华容区",
    420704: "鄂城区",
    420802: "东宝区",
    420804: "掇刀区",
    420822: "沙洋县",
    420881: "钟祥市",
    420882: "京山市",
    420902: "孝南区",
    420921: "孝昌县",
    420922: "大悟县",
    420923: "云梦县",
    420981: "应城市",
    420982: "安陆市",
    420984: "汉川市",
    421002: "沙市区",
    421003: "荆州区",
    421022: "公安县",
    421023: "监利县",
    421024: "江陵县",
    421081: "石首市",
    421083: "洪湖市",
    421087: "松滋市",
    421102: "黄州区",
    421121: "团风县",
    421122: "红安县",
    421123: "罗田县",
    421124: "英山县",
    421125: "浠水县",
    421126: "蕲春县",
    421127: "黄梅县",
    421181: "麻城市",
    421182: "武穴市",
    421202: "咸安区",
    421221: "嘉鱼县",
    421222: "通城县",
    421223: "崇阳县",
    421224: "通山县",
    421281: "赤壁市",
    421303: "曾都区",
    421321: "随县",
    421381: "广水市",
    422801: "恩施市",
    422802: "利川市",
    422822: "建始县",
    422823: "巴东县",
    422825: "宣恩县",
    422826: "咸丰县",
    422827: "来凤县",
    422828: "鹤峰县",
    429004: "仙桃市",
    429005: "潜江市",
    429006: "天门市",
    429021: "神农架林区",
    430102: "芙蓉区",
    430103: "天心区",
    430104: "岳麓区",
    430105: "开福区",
    430111: "雨花区",
    430112: "望城区",
    430121: "长沙县",
    430181: "浏阳市",
    430182: "宁乡市",
    430202: "荷塘区",
    430203: "芦淞区",
    430204: "石峰区",
    430211: "天元区",
    430212: "渌口区",
    430223: "攸县",
    430224: "茶陵县",
    430225: "炎陵县",
    430281: "醴陵市",
    430302: "雨湖区",
    430304: "岳塘区",
    430321: "湘潭县",
    430381: "湘乡市",
    430382: "韶山市",
    430405: "珠晖区",
    430406: "雁峰区",
    430407: "石鼓区",
    430408: "蒸湘区",
    430412: "南岳区",
    430421: "衡阳县",
    430422: "衡南县",
    430423: "衡山县",
    430424: "衡东县",
    430426: "祁东县",
    430481: "耒阳市",
    430482: "常宁市",
    430502: "双清区",
    430503: "大祥区",
    430511: "北塔区",
    430521: "邵东县",
    430522: "新邵县",
    430523: "邵阳县",
    430524: "隆回县",
    430525: "洞口县",
    430527: "绥宁县",
    430528: "新宁县",
    430529: "城步苗族自治县",
    430581: "武冈市",
    430602: "岳阳楼区",
    430603: "云溪区",
    430611: "君山区",
    430621: "岳阳县",
    430623: "华容县",
    430624: "湘阴县",
    430626: "平江县",
    430681: "汨罗市",
    430682: "临湘市",
    430702: "武陵区",
    430703: "鼎城区",
    430721: "安乡县",
    430722: "汉寿县",
    430723: "澧县",
    430724: "临澧县",
    430725: "桃源县",
    430726: "石门县",
    430781: "津市市",
    430802: "永定区",
    430811: "武陵源区",
    430821: "慈利县",
    430822: "桑植县",
    430902: "资阳区",
    430903: "赫山区",
    430921: "南县",
    430922: "桃江县",
    430923: "安化县",
    430981: "沅江市",
    431002: "北湖区",
    431003: "苏仙区",
    431021: "桂阳县",
    431022: "宜章县",
    431023: "永兴县",
    431024: "嘉禾县",
    431025: "临武县",
    431026: "汝城县",
    431027: "桂东县",
    431028: "安仁县",
    431081: "资兴市",
    431102: "零陵区",
    431103: "冷水滩区",
    431121: "祁阳县",
    431122: "东安县",
    431123: "双牌县",
    431124: "道县",
    431125: "江永县",
    431126: "宁远县",
    431127: "蓝山县",
    431128: "新田县",
    431129: "江华瑶族自治县",
    431202: "鹤城区",
    431221: "中方县",
    431222: "沅陵县",
    431223: "辰溪县",
    431224: "溆浦县",
    431225: "会同县",
    431226: "麻阳苗族自治县",
    431227: "新晃侗族自治县",
    431228: "芷江侗族自治县",
    431229: "靖州苗族侗族自治县",
    431230: "通道侗族自治县",
    431281: "洪江市",
    431302: "娄星区",
    431321: "双峰县",
    431322: "新化县",
    431381: "冷水江市",
    431382: "涟源市",
    433101: "吉首市",
    433122: "泸溪县",
    433123: "凤凰县",
    433124: "花垣县",
    433125: "保靖县",
    433126: "古丈县",
    433127: "永顺县",
    433130: "龙山县",
    440103: "荔湾区",
    440104: "越秀区",
    440105: "海珠区",
    440106: "天河区",
    440111: "白云区",
    440112: "黄埔区",
    440113: "番禺区",
    440114: "花都区",
    440115: "南沙区",
    440117: "从化区",
    440118: "增城区",
    440203: "武江区",
    440204: "浈江区",
    440205: "曲江区",
    440222: "始兴县",
    440224: "仁化县",
    440229: "翁源县",
    440232: "乳源瑶族自治县",
    440233: "新丰县",
    440281: "乐昌市",
    440282: "南雄市",
    440303: "罗湖区",
    440304: "福田区",
    440305: "南山区",
    440306: "宝安区",
    440307: "龙岗区",
    440308: "盐田区",
    440309: "龙华区",
    440310: "坪山区",
    440311: "光明区",
    440402: "香洲区",
    440403: "斗门区",
    440404: "金湾区",
    440507: "龙湖区",
    440511: "金平区",
    440512: "濠江区",
    440513: "潮阳区",
    440514: "潮南区",
    440515: "澄海区",
    440523: "南澳县",
    440604: "禅城区",
    440605: "南海区",
    440606: "顺德区",
    440607: "三水区",
    440608: "高明区",
    440703: "蓬江区",
    440704: "江海区",
    440705: "新会区",
    440781: "台山市",
    440783: "开平市",
    440784: "鹤山市",
    440785: "恩平市",
    440802: "赤坎区",
    440803: "霞山区",
    440804: "坡头区",
    440811: "麻章区",
    440823: "遂溪县",
    440825: "徐闻县",
    440881: "廉江市",
    440882: "雷州市",
    440883: "吴川市",
    440890: "经济技术开发区",
    440902: "茂南区",
    440904: "电白区",
    440981: "高州市",
    440982: "化州市",
    440983: "信宜市",
    441202: "端州区",
    441203: "鼎湖区",
    441204: "高要区",
    441223: "广宁县",
    441224: "怀集县",
    441225: "封开县",
    441226: "德庆县",
    441284: "四会市",
    441302: "惠城区",
    441303: "惠阳区",
    441322: "博罗县",
    441323: "惠东县",
    441324: "龙门县",
    441402: "梅江区",
    441403: "梅县区",
    441422: "大埔县",
    441423: "丰顺县",
    441424: "五华县",
    441426: "平远县",
    441427: "蕉岭县",
    441481: "兴宁市",
    441502: "城区",
    441521: "海丰县",
    441523: "陆河县",
    441581: "陆丰市",
    441602: "源城区",
    441621: "紫金县",
    441622: "龙川县",
    441623: "连平县",
    441624: "和平县",
    441625: "东源县",
    441702: "江城区",
    441704: "阳东区",
    441721: "阳西县",
    441781: "阳春市",
    441802: "清城区",
    441803: "清新区",
    441821: "佛冈县",
    441823: "阳山县",
    441825: "连山壮族瑶族自治县",
    441826: "连南瑶族自治县",
    441881: "英德市",
    441882: "连州市",
    441901: "中堂镇",
    441903: "南城街道办事处",
    441904: "长安镇",
    441905: "东坑镇",
    441906: "樟木头镇",
    441907: "莞城街道办事处",
    441908: "石龙镇",
    441909: "桥头镇",
    441910: "万江街道办事处",
    441911: "麻涌镇",
    441912: "虎门镇",
    441913: "谢岗镇",
    441914: "石碣镇",
    441915: "茶山镇",
    441916: "东城街道办事处",
    441917: "洪梅镇",
    441918: "道滘镇",
    441919: "高埗镇",
    441920: "企石镇",
    441921: "凤岗镇",
    441922: "大岭山镇",
    441923: "松山湖管委会",
    441924: "清溪镇",
    441925: "望牛墩镇",
    441926: "厚街镇",
    441927: "常平镇",
    441928: "寮步镇",
    441929: "石排镇",
    441930: "横沥镇",
    441931: "塘厦镇",
    441932: "黄江镇",
    441933: "大朗镇",
    441934: "东莞港",
    441935: "东莞生态园",
    441990: "沙田镇",
    442001: "南头镇",
    442002: "神湾镇",
    442003: "东凤镇",
    442004: "五桂山街道办事处",
    442005: "黄圃镇",
    442006: "小榄镇",
    442007: "石岐区街道办事处",
    442008: "横栏镇",
    442009: "三角镇",
    442010: "三乡镇",
    442011: "港口镇",
    442012: "沙溪镇",
    442013: "板芙镇",
    442015: "东升镇",
    442016: "阜沙镇",
    442017: "民众镇",
    442018: "东区街道办事处",
    442019: "火炬开发区街道办事处",
    442020: "西区街道办事处",
    442021: "南区街道办事处",
    442022: "古镇镇",
    442023: "坦洲镇",
    442024: "大涌镇",
    442025: "南朗镇",
    445102: "湘桥区",
    445103: "潮安区",
    445122: "饶平县",
    445202: "榕城区",
    445203: "揭东区",
    445222: "揭西县",
    445224: "惠来县",
    445281: "普宁市",
    445302: "云城区",
    445303: "云安区",
    445321: "新兴县",
    445322: "郁南县",
    445381: "罗定市",
    450102: "兴宁区",
    450103: "青秀区",
    450105: "江南区",
    450107: "西乡塘区",
    450108: "良庆区",
    450109: "邕宁区",
    450110: "武鸣区",
    450123: "隆安县",
    450124: "马山县",
    450125: "上林县",
    450126: "宾阳县",
    450127: "横县",
    450202: "城中区",
    450203: "鱼峰区",
    450204: "柳南区",
    450205: "柳北区",
    450206: "柳江区",
    450222: "柳城县",
    450223: "鹿寨县",
    450224: "融安县",
    450225: "融水苗族自治县",
    450226: "三江侗族自治县",
    450302: "秀峰区",
    450303: "叠彩区",
    450304: "象山区",
    450305: "七星区",
    450311: "雁山区",
    450312: "临桂区",
    450321: "阳朔县",
    450323: "灵川县",
    450324: "全州县",
    450325: "兴安县",
    450326: "永福县",
    450327: "灌阳县",
    450328: "龙胜各族自治县",
    450329: "资源县",
    450330: "平乐县",
    450332: "恭城瑶族自治县",
    450381: "荔浦市",
    450403: "万秀区",
    450405: "长洲区",
    450406: "龙圩区",
    450421: "苍梧县",
    450422: "藤县",
    450423: "蒙山县",
    450481: "岑溪市",
    450502: "海城区",
    450503: "银海区",
    450512: "铁山港区",
    450521: "合浦县",
    450602: "港口区",
    450603: "防城区",
    450621: "上思县",
    450681: "东兴市",
    450702: "钦南区",
    450703: "钦北区",
    450721: "灵山县",
    450722: "浦北县",
    450802: "港北区",
    450803: "港南区",
    450804: "覃塘区",
    450821: "平南县",
    450881: "桂平市",
    450902: "玉州区",
    450903: "福绵区",
    450921: "容县",
    450922: "陆川县",
    450923: "博白县",
    450924: "兴业县",
    450981: "北流市",
    451002: "右江区",
    451021: "田阳县",
    451022: "田东县",
    451023: "平果县",
    451024: "德保县",
    451026: "那坡县",
    451027: "凌云县",
    451028: "乐业县",
    451029: "田林县",
    451030: "西林县",
    451031: "隆林各族自治县",
    451081: "靖西市",
    451102: "八步区",
    451103: "平桂区",
    451121: "昭平县",
    451122: "钟山县",
    451123: "富川瑶族自治县",
    451202: "金城江区",
    451203: "宜州区",
    451221: "南丹县",
    451222: "天峨县",
    451223: "凤山县",
    451224: "东兰县",
    451225: "罗城仫佬族自治县",
    451226: "环江毛南族自治县",
    451227: "巴马瑶族自治县",
    451228: "都安瑶族自治县",
    451229: "大化瑶族自治县",
    451302: "兴宾区",
    451321: "忻城县",
    451322: "象州县",
    451323: "武宣县",
    451324: "金秀瑶族自治县",
    451381: "合山市",
    451402: "江州区",
    451421: "扶绥县",
    451422: "宁明县",
    451423: "龙州县",
    451424: "大新县",
    451425: "天等县",
    451481: "凭祥市",
    460105: "秀英区",
    460106: "龙华区",
    460107: "琼山区",
    460108: "美兰区",
    460202: "海棠区",
    460203: "吉阳区",
    460204: "天涯区",
    460205: "崖州区",
    460321: "西沙群岛",
    460322: "南沙群岛",
    460323: "中沙群岛的岛礁及其海域",
    460401: "那大镇",
    460402: "和庆镇",
    460403: "南丰镇",
    460404: "大成镇",
    460405: "雅星镇",
    460406: "兰洋镇",
    460407: "光村镇",
    460408: "木棠镇",
    460409: "海头镇",
    460410: "峨蔓镇",
    460411: "王五镇",
    460412: "白马井镇",
    460413: "中和镇",
    460414: "排浦镇",
    460415: "东成镇",
    460416: "新州镇",
    460417: "洋浦经济开发区",
    460418: "华南热作学院",
    469001: "五指山市",
    469002: "琼海市",
    469005: "文昌市",
    469006: "万宁市",
    469007: "东方市",
    469021: "定安县",
    469022: "屯昌县",
    469023: "澄迈县",
    469024: "临高县",
    469025: "白沙黎族自治县",
    469026: "昌江黎族自治县",
    469027: "乐东黎族自治县",
    469028: "陵水黎族自治县",
    469029: "保亭黎族苗族自治县",
    469030: "琼中黎族苗族自治县",
    500101: "万州区",
    500102: "涪陵区",
    500103: "渝中区",
    500104: "大渡口区",
    500105: "江北区",
    500106: "沙坪坝区",
    500107: "九龙坡区",
    500108: "南岸区",
    500109: "北碚区",
    500110: "綦江区",
    500111: "大足区",
    500112: "渝北区",
    500113: "巴南区",
    500114: "黔江区",
    500115: "长寿区",
    500116: "江津区",
    500117: "合川区",
    500118: "永川区",
    500119: "南川区",
    500120: "璧山区",
    500151: "铜梁区",
    500152: "潼南区",
    500153: "荣昌区",
    500154: "开州区",
    500155: "梁平区",
    500156: "武隆区",
    500229: "城口县",
    500230: "丰都县",
    500231: "垫江县",
    500233: "忠县",
    500235: "云阳县",
    500236: "奉节县",
    500237: "巫山县",
    500238: "巫溪县",
    500240: "石柱土家族自治县",
    500241: "秀山土家族苗族自治县",
    500242: "酉阳土家族苗族自治县",
    500243: "彭水苗族土家族自治县",
    510104: "锦江区",
    510105: "青羊区",
    510106: "金牛区",
    510107: "武侯区",
    510108: "成华区",
    510112: "龙泉驿区",
    510113: "青白江区",
    510114: "新都区",
    510115: "温江区",
    510116: "双流区",
    510117: "郫都区",
    510121: "金堂县",
    510129: "大邑县",
    510131: "蒲江县",
    510132: "新津县",
    510181: "都江堰市",
    510182: "彭州市",
    510183: "邛崃市",
    510184: "崇州市",
    510185: "简阳市",
    510191: "高新区",
    510302: "自流井区",
    510303: "贡井区",
    510304: "大安区",
    510311: "沿滩区",
    510321: "荣县",
    510322: "富顺县",
    510402: "东区",
    510403: "西区",
    510411: "仁和区",
    510421: "米易县",
    510422: "盐边县",
    510502: "江阳区",
    510503: "纳溪区",
    510504: "龙马潭区",
    510521: "泸县",
    510522: "合江县",
    510524: "叙永县",
    510525: "古蔺县",
    510603: "旌阳区",
    510604: "罗江区",
    510623: "中江县",
    510681: "广汉市",
    510682: "什邡市",
    510683: "绵竹市",
    510703: "涪城区",
    510704: "游仙区",
    510705: "安州区",
    510722: "三台县",
    510723: "盐亭县",
    510725: "梓潼县",
    510726: "北川羌族自治县",
    510727: "平武县",
    510781: "江油市",
    510791: "高新区",
    510802: "利州区",
    510811: "昭化区",
    510812: "朝天区",
    510821: "旺苍县",
    510822: "青川县",
    510823: "剑阁县",
    510824: "苍溪县",
    510903: "船山区",
    510904: "安居区",
    510921: "蓬溪县",
    510922: "射洪县",
    510923: "大英县",
    511002: "市中区",
    511011: "东兴区",
    511024: "威远县",
    511025: "资中县",
    511083: "隆昌市",
    511102: "市中区",
    511111: "沙湾区",
    511112: "五通桥区",
    511113: "金口河区",
    511123: "犍为县",
    511124: "井研县",
    511126: "夹江县",
    511129: "沐川县",
    511132: "峨边彝族自治县",
    511133: "马边彝族自治县",
    511181: "峨眉山市",
    511302: "顺庆区",
    511303: "高坪区",
    511304: "嘉陵区",
    511321: "南部县",
    511322: "营山县",
    511323: "蓬安县",
    511324: "仪陇县",
    511325: "西充县",
    511381: "阆中市",
    511402: "东坡区",
    511403: "彭山区",
    511421: "仁寿县",
    511423: "洪雅县",
    511424: "丹棱县",
    511425: "青神县",
    511502: "翠屏区",
    511503: "南溪区",
    511504: "叙州区",
    511523: "江安县",
    511524: "长宁县",
    511525: "高县",
    511526: "珙县",
    511527: "筠连县",
    511528: "兴文县",
    511529: "屏山县",
    511602: "广安区",
    511603: "前锋区",
    511621: "岳池县",
    511622: "武胜县",
    511623: "邻水县",
    511681: "华蓥市",
    511702: "通川区",
    511703: "达川区",
    511722: "宣汉县",
    511723: "开江县",
    511724: "大竹县",
    511725: "渠县",
    511781: "万源市",
    511802: "雨城区",
    511803: "名山区",
    511822: "荥经县",
    511823: "汉源县",
    511824: "石棉县",
    511825: "天全县",
    511826: "芦山县",
    511827: "宝兴县",
    511902: "巴州区",
    511903: "恩阳区",
    511921: "通江县",
    511922: "南江县",
    511923: "平昌县",
    512002: "雁江区",
    512021: "安岳县",
    512022: "乐至县",
    513201: "马尔康市",
    513221: "汶川县",
    513222: "理县",
    513223: "茂县",
    513224: "松潘县",
    513225: "九寨沟县",
    513226: "金川县",
    513227: "小金县",
    513228: "黑水县",
    513230: "壤塘县",
    513231: "阿坝县",
    513232: "若尔盖县",
    513233: "红原县",
    513301: "康定市",
    513322: "泸定县",
    513323: "丹巴县",
    513324: "九龙县",
    513325: "雅江县",
    513326: "道孚县",
    513327: "炉霍县",
    513328: "甘孜县",
    513329: "新龙县",
    513330: "德格县",
    513331: "白玉县",
    513332: "石渠县",
    513333: "色达县",
    513334: "理塘县",
    513335: "巴塘县",
    513336: "乡城县",
    513337: "稻城县",
    513338: "得荣县",
    513401: "西昌市",
    513422: "木里藏族自治县",
    513423: "盐源县",
    513424: "德昌县",
    513425: "会理县",
    513426: "会东县",
    513427: "宁南县",
    513428: "普格县",
    513429: "布拖县",
    513430: "金阳县",
    513431: "昭觉县",
    513432: "喜德县",
    513433: "冕宁县",
    513434: "越西县",
    513435: "甘洛县",
    513436: "美姑县",
    513437: "雷波县",
    520102: "南明区",
    520103: "云岩区",
    520111: "花溪区",
    520112: "乌当区",
    520113: "白云区",
    520115: "观山湖区",
    520121: "开阳县",
    520122: "息烽县",
    520123: "修文县",
    520181: "清镇市",
    520201: "钟山区",
    520203: "六枝特区",
    520221: "水城县",
    520281: "盘州市",
    520302: "红花岗区",
    520303: "汇川区",
    520304: "播州区",
    520322: "桐梓县",
    520323: "绥阳县",
    520324: "正安县",
    520325: "道真仡佬族苗族自治县",
    520326: "务川仡佬族苗族自治县",
    520327: "凤冈县",
    520328: "湄潭县",
    520329: "余庆县",
    520330: "习水县",
    520381: "赤水市",
    520382: "仁怀市",
    520402: "西秀区",
    520403: "平坝区",
    520422: "普定县",
    520423: "镇宁布依族苗族自治县",
    520424: "关岭布依族苗族自治县",
    520425: "紫云苗族布依族自治县",
    520502: "七星关区",
    520521: "大方县",
    520522: "黔西县",
    520523: "金沙县",
    520524: "织金县",
    520525: "纳雍县",
    520526: "威宁彝族回族苗族自治县",
    520527: "赫章县",
    520602: "碧江区",
    520603: "万山区",
    520621: "江口县",
    520622: "玉屏侗族自治县",
    520623: "石阡县",
    520624: "思南县",
    520625: "印江土家族苗族自治县",
    520626: "德江县",
    520627: "沿河土家族自治县",
    520628: "松桃苗族自治县",
    522301: "兴义市",
    522302: "兴仁市",
    522323: "普安县",
    522324: "晴隆县",
    522325: "贞丰县",
    522326: "望谟县",
    522327: "册亨县",
    522328: "安龙县",
    522601: "凯里市",
    522622: "黄平县",
    522623: "施秉县",
    522624: "三穗县",
    522625: "镇远县",
    522626: "岑巩县",
    522627: "天柱县",
    522628: "锦屏县",
    522629: "剑河县",
    522630: "台江县",
    522631: "黎平县",
    522632: "榕江县",
    522633: "从江县",
    522634: "雷山县",
    522635: "麻江县",
    522636: "丹寨县",
    522701: "都匀市",
    522702: "福泉市",
    522722: "荔波县",
    522723: "贵定县",
    522725: "瓮安县",
    522726: "独山县",
    522727: "平塘县",
    522728: "罗甸县",
    522729: "长顺县",
    522730: "龙里县",
    522731: "惠水县",
    522732: "三都水族自治县",
    530102: "五华区",
    530103: "盘龙区",
    530111: "官渡区",
    530112: "西山区",
    530113: "东川区",
    530114: "呈贡区",
    530115: "晋宁区",
    530124: "富民县",
    530125: "宜良县",
    530126: "石林彝族自治县",
    530127: "嵩明县",
    530128: "禄劝彝族苗族自治县",
    530129: "寻甸回族彝族自治县",
    530181: "安宁市",
    530302: "麒麟区",
    530303: "沾益区",
    530304: "马龙区",
    530322: "陆良县",
    530323: "师宗县",
    530324: "罗平县",
    530325: "富源县",
    530326: "会泽县",
    530381: "宣威市",
    530402: "红塔区",
    530403: "江川区",
    530422: "澄江县",
    530423: "通海县",
    530424: "华宁县",
    530425: "易门县",
    530426: "峨山彝族自治县",
    530427: "新平彝族傣族自治县",
    530428: "元江哈尼族彝族傣族自治县",
    530502: "隆阳区",
    530521: "施甸县",
    530523: "龙陵县",
    530524: "昌宁县",
    530581: "腾冲市",
    530602: "昭阳区",
    530621: "鲁甸县",
    530622: "巧家县",
    530623: "盐津县",
    530624: "大关县",
    530625: "永善县",
    530626: "绥江县",
    530627: "镇雄县",
    530628: "彝良县",
    530629: "威信县",
    530681: "水富市",
    530702: "古城区",
    530721: "玉龙纳西族自治县",
    530722: "永胜县",
    530723: "华坪县",
    530724: "宁蒗彝族自治县",
    530802: "思茅区",
    530821: "宁洱哈尼族彝族自治县",
    530822: "墨江哈尼族自治县",
    530823: "景东彝族自治县",
    530824: "景谷傣族彝族自治县",
    530825: "镇沅彝族哈尼族拉祜族自治县",
    530826: "江城哈尼族彝族自治县",
    530827: "孟连傣族拉祜族佤族自治县",
    530828: "澜沧拉祜族自治县",
    530829: "西盟佤族自治县",
    530902: "临翔区",
    530921: "凤庆县",
    530922: "云县",
    530923: "永德县",
    530924: "镇康县",
    530925: "双江拉祜族佤族布朗族傣族自治县",
    530926: "耿马傣族佤族自治县",
    530927: "沧源佤族自治县",
    532301: "楚雄市",
    532322: "双柏县",
    532323: "牟定县",
    532324: "南华县",
    532325: "姚安县",
    532326: "大姚县",
    532327: "永仁县",
    532328: "元谋县",
    532329: "武定县",
    532331: "禄丰县",
    532501: "个旧市",
    532502: "开远市",
    532503: "蒙自市",
    532504: "弥勒市",
    532523: "屏边苗族自治县",
    532524: "建水县",
    532525: "石屏县",
    532527: "泸西县",
    532528: "元阳县",
    532529: "红河县",
    532530: "金平苗族瑶族傣族自治县",
    532531: "绿春县",
    532532: "河口瑶族自治县",
    532601: "文山市",
    532622: "砚山县",
    532623: "西畴县",
    532624: "麻栗坡县",
    532625: "马关县",
    532626: "丘北县",
    532627: "广南县",
    532628: "富宁县",
    532801: "景洪市",
    532822: "勐海县",
    532823: "勐腊县",
    532901: "大理市",
    532922: "漾濞彝族自治县",
    532923: "祥云县",
    532924: "宾川县",
    532925: "弥渡县",
    532926: "南涧彝族自治县",
    532927: "巍山彝族回族自治县",
    532928: "永平县",
    532929: "云龙县",
    532930: "洱源县",
    532931: "剑川县",
    532932: "鹤庆县",
    533102: "瑞丽市",
    533103: "芒市",
    533122: "梁河县",
    533123: "盈江县",
    533124: "陇川县",
    533301: "泸水市",
    533323: "福贡县",
    533324: "贡山独龙族怒族自治县",
    533325: "兰坪白族普米族自治县",
    533401: "香格里拉市",
    533422: "德钦县",
    533423: "维西傈僳族自治县",
    540102: "城关区",
    540103: "堆龙德庆区",
    540104: "达孜区",
    540121: "林周县",
    540122: "当雄县",
    540123: "尼木县",
    540124: "曲水县",
    540127: "墨竹工卡县",
    540202: "桑珠孜区",
    540221: "南木林县",
    540222: "江孜县",
    540223: "定日县",
    540224: "萨迦县",
    540225: "拉孜县",
    540226: "昂仁县",
    540227: "谢通门县",
    540228: "白朗县",
    540229: "仁布县",
    540230: "康马县",
    540231: "定结县",
    540232: "仲巴县",
    540233: "亚东县",
    540234: "吉隆县",
    540235: "聂拉木县",
    540236: "萨嘎县",
    540237: "岗巴县",
    540302: "卡若区",
    540321: "江达县",
    540322: "贡觉县",
    540323: "类乌齐县",
    540324: "丁青县",
    540325: "察雅县",
    540326: "八宿县",
    540327: "左贡县",
    540328: "芒康县",
    540329: "洛隆县",
    540330: "边坝县",
    540402: "巴宜区",
    540421: "工布江达县",
    540422: "米林县",
    540423: "墨脱县",
    540424: "波密县",
    540425: "察隅县",
    540426: "朗县",
    540502: "乃东区",
    540521: "扎囊县",
    540522: "贡嘎县",
    540523: "桑日县",
    540524: "琼结县",
    540525: "曲松县",
    540526: "措美县",
    540527: "洛扎县",
    540528: "加查县",
    540529: "隆子县",
    540530: "错那县",
    540531: "浪卡子县",
    540602: "色尼区",
    540621: "嘉黎县",
    540622: "比如县",
    540623: "聂荣县",
    540624: "安多县",
    540625: "申扎县",
    540626: "索县",
    540627: "班戈县",
    540628: "巴青县",
    540629: "尼玛县",
    540630: "双湖县",
    542521: "普兰县",
    542522: "札达县",
    542523: "噶尔县",
    542524: "日土县",
    542525: "革吉县",
    542526: "改则县",
    542527: "措勤县",
    610102: "新城区",
    610103: "碑林区",
    610104: "莲湖区",
    610111: "灞桥区",
    610112: "未央区",
    610113: "雁塔区",
    610114: "阎良区",
    610115: "临潼区",
    610116: "长安区",
    610117: "高陵区",
    610118: "鄠邑区",
    610122: "蓝田县",
    610124: "周至县",
    610202: "王益区",
    610203: "印台区",
    610204: "耀州区",
    610222: "宜君县",
    610302: "渭滨区",
    610303: "金台区",
    610304: "陈仓区",
    610322: "凤翔县",
    610323: "岐山县",
    610324: "扶风县",
    610326: "眉县",
    610327: "陇县",
    610328: "千阳县",
    610329: "麟游县",
    610330: "凤县",
    610331: "太白县",
    610402: "秦都区",
    610403: "杨陵区",
    610404: "渭城区",
    610422: "三原县",
    610423: "泾阳县",
    610424: "乾县",
    610425: "礼泉县",
    610426: "永寿县",
    610428: "长武县",
    610429: "旬邑县",
    610430: "淳化县",
    610431: "武功县",
    610481: "兴平市",
    610482: "彬州市",
    610502: "临渭区",
    610503: "华州区",
    610522: "潼关县",
    610523: "大荔县",
    610524: "合阳县",
    610525: "澄城县",
    610526: "蒲城县",
    610527: "白水县",
    610528: "富平县",
    610581: "韩城市",
    610582: "华阴市",
    610602: "宝塔区",
    610603: "安塞区",
    610621: "延长县",
    610622: "延川县",
    610623: "子长县",
    610625: "志丹县",
    610626: "吴起县",
    610627: "甘泉县",
    610628: "富县",
    610629: "洛川县",
    610630: "宜川县",
    610631: "黄龙县",
    610632: "黄陵县",
    610702: "汉台区",
    610703: "南郑区",
    610722: "城固县",
    610723: "洋县",
    610724: "西乡县",
    610725: "勉县",
    610726: "宁强县",
    610727: "略阳县",
    610728: "镇巴县",
    610729: "留坝县",
    610730: "佛坪县",
    610802: "榆阳区",
    610803: "横山区",
    610822: "府谷县",
    610824: "靖边县",
    610825: "定边县",
    610826: "绥德县",
    610827: "米脂县",
    610828: "佳县",
    610829: "吴堡县",
    610830: "清涧县",
    610831: "子洲县",
    610881: "神木市",
    610902: "汉滨区",
    610921: "汉阴县",
    610922: "石泉县",
    610923: "宁陕县",
    610924: "紫阳县",
    610925: "岚皋县",
    610926: "平利县",
    610927: "镇坪县",
    610928: "旬阳县",
    610929: "白河县",
    611002: "商州区",
    611021: "洛南县",
    611022: "丹凤县",
    611023: "商南县",
    611024: "山阳县",
    611025: "镇安县",
    611026: "柞水县",
    620102: "城关区",
    620103: "七里河区",
    620104: "西固区",
    620105: "安宁区",
    620111: "红古区",
    620121: "永登县",
    620122: "皋兰县",
    620123: "榆中县",
    620201: "市辖区",
    620290: "雄关区",
    620291: "长城区",
    620292: "镜铁区",
    620293: "新城镇",
    620294: "峪泉镇",
    620295: "文殊镇",
    620302: "金川区",
    620321: "永昌县",
    620402: "白银区",
    620403: "平川区",
    620421: "靖远县",
    620422: "会宁县",
    620423: "景泰县",
    620502: "秦州区",
    620503: "麦积区",
    620521: "清水县",
    620522: "秦安县",
    620523: "甘谷县",
    620524: "武山县",
    620525: "张家川回族自治县",
    620602: "凉州区",
    620621: "民勤县",
    620622: "古浪县",
    620623: "天祝藏族自治县",
    620702: "甘州区",
    620721: "肃南裕固族自治县",
    620722: "民乐县",
    620723: "临泽县",
    620724: "高台县",
    620725: "山丹县",
    620802: "崆峒区",
    620821: "泾川县",
    620822: "灵台县",
    620823: "崇信县",
    620825: "庄浪县",
    620826: "静宁县",
    620881: "华亭市",
    620902: "肃州区",
    620921: "金塔县",
    620922: "瓜州县",
    620923: "肃北蒙古族自治县",
    620924: "阿克塞哈萨克族自治县",
    620981: "玉门市",
    620982: "敦煌市",
    621002: "西峰区",
    621021: "庆城县",
    621022: "环县",
    621023: "华池县",
    621024: "合水县",
    621025: "正宁县",
    621026: "宁县",
    621027: "镇原县",
    621102: "安定区",
    621121: "通渭县",
    621122: "陇西县",
    621123: "渭源县",
    621124: "临洮县",
    621125: "漳县",
    621126: "岷县",
    621202: "武都区",
    621221: "成县",
    621222: "文县",
    621223: "宕昌县",
    621224: "康县",
    621225: "西和县",
    621226: "礼县",
    621227: "徽县",
    621228: "两当县",
    622901: "临夏市",
    622921: "临夏县",
    622922: "康乐县",
    622923: "永靖县",
    622924: "广河县",
    622925: "和政县",
    622926: "东乡族自治县",
    622927: "积石山保安族东乡族撒拉族自治县",
    623001: "合作市",
    623021: "临潭县",
    623022: "卓尼县",
    623023: "舟曲县",
    623024: "迭部县",
    623025: "玛曲县",
    623026: "碌曲县",
    623027: "夏河县",
    630102: "城东区",
    630103: "城中区",
    630104: "城西区",
    630105: "城北区",
    630121: "大通回族土族自治县",
    630122: "湟中县",
    630123: "湟源县",
    630202: "乐都区",
    630203: "平安区",
    630222: "民和回族土族自治县",
    630223: "互助土族自治县",
    630224: "化隆回族自治县",
    630225: "循化撒拉族自治县",
    632221: "门源回族自治县",
    632222: "祁连县",
    632223: "海晏县",
    632224: "刚察县",
    632321: "同仁县",
    632322: "尖扎县",
    632323: "泽库县",
    632324: "河南蒙古族自治县",
    632521: "共和县",
    632522: "同德县",
    632523: "贵德县",
    632524: "兴海县",
    632525: "贵南县",
    632621: "玛沁县",
    632622: "班玛县",
    632623: "甘德县",
    632624: "达日县",
    632625: "久治县",
    632626: "玛多县",
    632701: "玉树市",
    632722: "杂多县",
    632723: "称多县",
    632724: "治多县",
    632725: "囊谦县",
    632726: "曲麻莱县",
    632801: "格尔木市",
    632802: "德令哈市",
    632803: "茫崖市",
    632821: "乌兰县",
    632822: "都兰县",
    632823: "天峻县",
    640104: "兴庆区",
    640105: "西夏区",
    640106: "金凤区",
    640121: "永宁县",
    640122: "贺兰县",
    640181: "灵武市",
    640202: "大武口区",
    640205: "惠农区",
    640221: "平罗县",
    640302: "利通区",
    640303: "红寺堡区",
    640323: "盐池县",
    640324: "同心县",
    640381: "青铜峡市",
    640402: "原州区",
    640422: "西吉县",
    640423: "隆德县",
    640424: "泾源县",
    640425: "彭阳县",
    640502: "沙坡头区",
    640521: "中宁县",
    640522: "海原县",
    650102: "天山区",
    650103: "沙依巴克区",
    650104: "新市区",
    650105: "水磨沟区",
    650106: "头屯河区",
    650107: "达坂城区",
    650109: "米东区",
    650121: "乌鲁木齐县",
    650202: "独山子区",
    650203: "克拉玛依区",
    650204: "白碱滩区",
    650205: "乌尔禾区",
    650402: "高昌区",
    650421: "鄯善县",
    650422: "托克逊县",
    650502: "伊州区",
    650521: "巴里坤哈萨克自治县",
    650522: "伊吾县",
    652301: "昌吉市",
    652302: "阜康市",
    652323: "呼图壁县",
    652324: "玛纳斯县",
    652325: "奇台县",
    652327: "吉木萨尔县",
    652328: "木垒哈萨克自治县",
    652701: "博乐市",
    652702: "阿拉山口市",
    652722: "精河县",
    652723: "温泉县",
    652801: "库尔勒市",
    652822: "轮台县",
    652823: "尉犁县",
    652824: "若羌县",
    652825: "且末县",
    652826: "焉耆回族自治县",
    652827: "和静县",
    652828: "和硕县",
    652829: "博湖县",
    652901: "阿克苏市",
    652922: "温宿县",
    652923: "库车县",
    652924: "沙雅县",
    652925: "新和县",
    652926: "拜城县",
    652927: "乌什县",
    652928: "阿瓦提县",
    652929: "柯坪县",
    653001: "阿图什市",
    653022: "阿克陶县",
    653023: "阿合奇县",
    653024: "乌恰县",
    653101: "喀什市",
    653121: "疏附县",
    653122: "疏勒县",
    653123: "英吉沙县",
    653124: "泽普县",
    653125: "莎车县",
    653126: "叶城县",
    653127: "麦盖提县",
    653128: "岳普湖县",
    653129: "伽师县",
    653130: "巴楚县",
    653131: "塔什库尔干塔吉克自治县",
    653201: "和田市",
    653221: "和田县",
    653222: "墨玉县",
    653223: "皮山县",
    653224: "洛浦县",
    653225: "策勒县",
    653226: "于田县",
    653227: "民丰县",
    654002: "伊宁市",
    654003: "奎屯市",
    654004: "霍尔果斯市",
    654021: "伊宁县",
    654022: "察布查尔锡伯自治县",
    654023: "霍城县",
    654024: "巩留县",
    654025: "新源县",
    654026: "昭苏县",
    654027: "特克斯县",
    654028: "尼勒克县",
    654201: "塔城市",
    654202: "乌苏市",
    654221: "额敏县",
    654223: "沙湾县",
    654224: "托里县",
    654225: "裕民县",
    654226: "和布克赛尔蒙古自治县",
    654301: "阿勒泰市",
    654321: "布尔津县",
    654322: "富蕴县",
    654323: "福海县",
    654324: "哈巴河县",
    654325: "青河县",
    654326: "吉木乃县",
    659001: "石河子市",
    659002: "阿拉尔市",
    659003: "图木舒克市",
    659004: "五家渠市",
    659005: "北屯市",
    659006: "铁门关市",
    659007: "双河市",
    659008: "可克达拉市",
    659009: "昆玉市",
    710101: "中正区",
    710102: "大同区",
    710103: "中山区",
    710104: "松山区",
    710105: "大安区",
    710106: "万华区",
    710107: "信义区",
    710108: "士林区",
    710109: "北投区",
    710110: "内湖区",
    710111: "南港区",
    710112: "文山区",
    710199: "其它区",
    710201: "新兴区",
    710202: "前金区",
    710203: "芩雅区",
    710204: "盐埕区",
    710205: "鼓山区",
    710206: "旗津区",
    710207: "前镇区",
    710208: "三民区",
    710209: "左营区",
    710210: "楠梓区",
    710211: "小港区",
    710241: "苓雅区",
    710242: "仁武区",
    710243: "大社区",
    710244: "冈山区",
    710245: "路竹区",
    710246: "阿莲区",
    710247: "田寮区",
    710248: "燕巢区",
    710249: "桥头区",
    710250: "梓官区",
    710251: "弥陀区",
    710252: "永安区",
    710253: "湖内区",
    710254: "凤山区",
    710255: "大寮区",
    710256: "林园区",
    710257: "鸟松区",
    710258: "大树区",
    710259: "旗山区",
    710260: "美浓区",
    710261: "六龟区",
    710262: "内门区",
    710263: "杉林区",
    710264: "甲仙区",
    710265: "桃源区",
    710266: "那玛夏区",
    710267: "茂林区",
    710268: "茄萣区",
    710299: "其它区",
    710301: "中西区",
    710302: "东区",
    710303: "南区",
    710304: "北区",
    710305: "安平区",
    710306: "安南区",
    710339: "永康区",
    710340: "归仁区",
    710341: "新化区",
    710342: "左镇区",
    710343: "玉井区",
    710344: "楠西区",
    710345: "南化区",
    710346: "仁德区",
    710347: "关庙区",
    710348: "龙崎区",
    710349: "官田区",
    710350: "麻豆区",
    710351: "佳里区",
    710352: "西港区",
    710353: "七股区",
    710354: "将军区",
    710355: "学甲区",
    710356: "北门区",
    710357: "新营区",
    710358: "后壁区",
    710359: "白河区",
    710360: "东山区",
    710361: "六甲区",
    710362: "下营区",
    710363: "柳营区",
    710364: "盐水区",
    710365: "善化区",
    710366: "大内区",
    710367: "山上区",
    710368: "新市区",
    710369: "安定区",
    710399: "其它区",
    710401: "中区",
    710402: "东区",
    710403: "南区",
    710404: "西区",
    710405: "北区",
    710406: "北屯区",
    710407: "西屯区",
    710408: "南屯区",
    710431: "太平区",
    710432: "大里区",
    710433: "雾峰区",
    710434: "乌日区",
    710435: "丰原区",
    710436: "后里区",
    710437: "石冈区",
    710438: "东势区",
    710439: "和平区",
    710440: "新社区",
    710441: "潭子区",
    710442: "大雅区",
    710443: "神冈区",
    710444: "大肚区",
    710445: "沙鹿区",
    710446: "龙井区",
    710447: "梧栖区",
    710448: "清水区",
    710449: "大甲区",
    710450: "外埔区",
    710451: "大安区",
    710499: "其它区",
    710507: "金沙镇",
    710508: "金湖镇",
    710509: "金宁乡",
    710510: "金城镇",
    710511: "烈屿乡",
    710512: "乌坵乡",
    710614: "南投市",
    710615: "中寮乡",
    710616: "草屯镇",
    710617: "国姓乡",
    710618: "埔里镇",
    710619: "仁爱乡",
    710620: "名间乡",
    710621: "集集镇",
    710622: "水里乡",
    710623: "鱼池乡",
    710624: "信义乡",
    710625: "竹山镇",
    710626: "鹿谷乡",
    710701: "仁爱区",
    710702: "信义区",
    710703: "中正区",
    710704: "中山区",
    710705: "安乐区",
    710706: "暖暖区",
    710707: "七堵区",
    710799: "其它区",
    710801: "东区",
    710802: "北区",
    710803: "香山区",
    710899: "其它区",
    710901: "东区",
    710902: "西区",
    710999: "其它区",
    711130: "万里区",
    711132: "板桥区",
    711133: "汐止区",
    711134: "深坑区",
    711135: "石碇区",
    711136: "瑞芳区",
    711137: "平溪区",
    711138: "双溪区",
    711139: "贡寮区",
    711140: "新店区",
    711141: "坪林区",
    711142: "乌来区",
    711143: "永和区",
    711144: "中和区",
    711145: "土城区",
    711146: "三峡区",
    711147: "树林区",
    711148: "莺歌区",
    711149: "三重区",
    711150: "新庄区",
    711151: "泰山区",
    711152: "林口区",
    711153: "芦洲区",
    711154: "五股区",
    711155: "八里区",
    711156: "淡水区",
    711157: "三芝区",
    711158: "石门区",
    711287: "宜兰市",
    711288: "头城镇",
    711289: "礁溪乡",
    711290: "壮围乡",
    711291: "员山乡",
    711292: "罗东镇",
    711293: "三星乡",
    711294: "大同乡",
    711295: "五结乡",
    711296: "冬山乡",
    711297: "苏澳镇",
    711298: "南澳乡",
    711299: "钓鱼台",
    711387: "竹北市",
    711388: "湖口乡",
    711389: "新丰乡",
    711390: "新埔镇",
    711391: "关西镇",
    711392: "芎林乡",
    711393: "宝山乡",
    711394: "竹东镇",
    711395: "五峰乡",
    711396: "横山乡",
    711397: "尖石乡",
    711398: "北埔乡",
    711399: "峨眉乡",
    711414: "中坜区",
    711415: "平镇区",
    711417: "杨梅区",
    711418: "新屋区",
    711419: "观音区",
    711420: "桃园区",
    711421: "龟山区",
    711422: "八德区",
    711423: "大溪区",
    711425: "大园区",
    711426: "芦竹区",
    711487: "中坜市",
    711488: "平镇市",
    711489: "龙潭乡",
    711490: "杨梅市",
    711491: "新屋乡",
    711492: "观音乡",
    711493: "桃园市",
    711494: "龟山乡",
    711495: "八德市",
    711496: "大溪镇",
    711497: "复兴乡",
    711498: "大园乡",
    711499: "芦竹乡",
    711520: "头份市",
    711582: "竹南镇",
    711583: "头份镇",
    711584: "三湾乡",
    711585: "南庄乡",
    711586: "狮潭乡",
    711587: "后龙镇",
    711588: "通霄镇",
    711589: "苑里镇",
    711590: "苗栗市",
    711591: "造桥乡",
    711592: "头屋乡",
    711593: "公馆乡",
    711594: "大湖乡",
    711595: "泰安乡",
    711596: "铜锣乡",
    711597: "三义乡",
    711598: "西湖乡",
    711599: "卓兰镇",
    711736: "员林市",
    711774: "彰化市",
    711775: "芬园乡",
    711776: "花坛乡",
    711777: "秀水乡",
    711778: "鹿港镇",
    711779: "福兴乡",
    711780: "线西乡",
    711781: "和美镇",
    711782: "伸港乡",
    711783: "员林镇",
    711784: "社头乡",
    711785: "永靖乡",
    711786: "埔心乡",
    711787: "溪湖镇",
    711788: "大村乡",
    711789: "埔盐乡",
    711790: "田中镇",
    711791: "北斗镇",
    711792: "田尾乡",
    711793: "埤头乡",
    711794: "溪州乡",
    711795: "竹塘乡",
    711796: "二林镇",
    711797: "大城乡",
    711798: "芳苑乡",
    711799: "二水乡",
    711982: "番路乡",
    711983: "梅山乡",
    711984: "竹崎乡",
    711985: "阿里山乡",
    711986: "中埔乡",
    711987: "大埔乡",
    711988: "水上乡",
    711989: "鹿草乡",
    711990: "太保市",
    711991: "朴子市",
    711992: "东石乡",
    711993: "六脚乡",
    711994: "新港乡",
    711995: "民雄乡",
    711996: "大林镇",
    711997: "溪口乡",
    711998: "义竹乡",
    711999: "布袋镇",
    712180: "斗南镇",
    712181: "大埤乡",
    712182: "虎尾镇",
    712183: "土库镇",
    712184: "褒忠乡",
    712185: "东势乡",
    712186: "台西乡",
    712187: "仑背乡",
    712188: "麦寮乡",
    712189: "斗六市",
    712190: "林内乡",
    712191: "古坑乡",
    712192: "莿桐乡",
    712193: "西螺镇",
    712194: "二仑乡",
    712195: "北港镇",
    712196: "水林乡",
    712197: "口湖乡",
    712198: "四湖乡",
    712199: "元长乡",
    712451: "崁顶乡",
    712467: "屏东市",
    712468: "三地门乡",
    712469: "雾台乡",
    712470: "玛家乡",
    712471: "九如乡",
    712472: "里港乡",
    712473: "高树乡",
    712474: "盐埔乡",
    712475: "长治乡",
    712476: "麟洛乡",
    712477: "竹田乡",
    712478: "内埔乡",
    712479: "万丹乡",
    712480: "潮州镇",
    712481: "泰武乡",
    712482: "来义乡",
    712483: "万峦乡",
    712484: "莰顶乡",
    712485: "新埤乡",
    712486: "南州乡",
    712487: "林边乡",
    712488: "东港镇",
    712489: "琉球乡",
    712490: "佳冬乡",
    712491: "新园乡",
    712492: "枋寮乡",
    712493: "枋山乡",
    712494: "春日乡",
    712495: "狮子乡",
    712496: "车城乡",
    712497: "牡丹乡",
    712498: "恒春镇",
    712499: "满州乡",
    712584: "台东市",
    712585: "绿岛乡",
    712586: "兰屿乡",
    712587: "延平乡",
    712588: "卑南乡",
    712589: "鹿野乡",
    712590: "关山镇",
    712591: "海端乡",
    712592: "池上乡",
    712593: "东河乡",
    712594: "成功镇",
    712595: "长滨乡",
    712596: "金峰乡",
    712597: "大武乡",
    712598: "达仁乡",
    712599: "太麻里乡",
    712686: "花莲市",
    712687: "新城乡",
    712688: "太鲁阁",
    712689: "秀林乡",
    712690: "吉安乡",
    712691: "寿丰乡",
    712692: "凤林镇",
    712693: "光复乡",
    712694: "丰滨乡",
    712695: "瑞穗乡",
    712696: "万荣乡",
    712697: "玉里镇",
    712698: "卓溪乡",
    712699: "富里乡",
    712794: "马公市",
    712795: "西屿乡",
    712796: "望安乡",
    712797: "七美乡",
    712798: "白沙乡",
    712799: "湖西乡",
    712896: "南竿乡",
    712897: "北竿乡",
    712898: "东引乡",
    712899: "莒光乡",
    810101: "中西区",
    810102: "湾仔区",
    810103: "东区",
    810104: "南区",
    810201: "九龙城区",
    810202: "油尖旺区",
    810203: "深水埗区",
    810204: "黄大仙区",
    810205: "观塘区",
    810301: "北区",
    810302: "大埔区",
    810303: "沙田区",
    810304: "西贡区",
    810305: "元朗区",
    810306: "屯门区",
    810307: "荃湾区",
    810308: "葵青区",
    810309: "离岛区",
    820101: "澳门半岛",
    820201: "离岛" } };exports.default = _default;

/***/ }),

/***/ 15:
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 16);
var formats = __webpack_require__(/*! ./formats */ 17);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 16:
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ 168:
/*!***********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_payList2.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAY1BMVEUAAAC/ct+/c96/dN7Adt7BeN/Cet/PlubPl+bRnOfSnujUounXqerar+vbsOzdtu3fue7gvO7jw/DkxfHmyvLp0fPr1fTs1/Xt2fXu2/bv3fb8+f38+v39/P7+/f7+/v7///9xS7QGAAAAAnRSTlMAf7YpoZUAAABtSURBVBjTbc45FoJQFATReg044IyKI+D+V2kgHD7SFd6oCLkgPFtn7of7j6e+7449p77tKg1MSFoVkjbtRSMTyl91pnVzzVImVLbn5fuWa8KEdp/mWeiPCZ0eC804/cE73vGOd7zjHe94xzvev0hUBBArbhW8AAAAAElFTkSuQmCC"

/***/ }),

/***/ 17:
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 18:
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 16);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"dingdanbao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"dingdanbao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"dingdanbao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"dingdanbao","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 204:
/*!*************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/util.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ 205));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Calendar = /*#__PURE__*/function () {
  function Calendar()





  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},date = _ref.date,selected = _ref.selected,startDate = _ref.startDate,endDate = _ref.endDate,range = _ref.range;_classCallCheck(this, Calendar);
    // 当前日期
    this.date = this.getDate(new Date()); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.cleanMultipleStatus();
    // 每周日期
    this.weeks = {};
    // this._getWeek(this.date.fullDate)
  }
  /**
     * 设置日期
     * @param {Object} date
     */_createClass(Calendar, [{ key: "setDate", value: function setDate(
    date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }

    /**
       * 清理多选状态
       */ }, { key: "cleanMultipleStatus", value: function cleanMultipleStatus()
    {
      this.multipleStatus = {
        before: '',
        after: '',
        data: [] };

    }

    /**
       * 重置开始日期
       */ }, { key: "resetSatrtDate", value: function resetSatrtDate(
    startDate) {
      // 范围开始
      this.startDate = startDate;

    }

    /**
       * 重置结束日期
       */ }, { key: "resetEndDate", value: function resetEndDate(
    endDate) {
      // 范围结束
      this.endDate = endDate;
    }

    /**
       * 获取任意时间
       */ }, { key: "getDate", value: function getDate(
    date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay() };

    }


    /**
       * 获取上月剩余天数
       */ }, { key: "_getLastMonthDays", value: function _getLastMonthDays(
    firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true });

      }
      return dateArr;
    }
    /**
       * 获取本月天数
       */ }, { key: "_currentMonthDys", value: function _currentMonthDys(
    dateData, full) {var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;var _loop = function _loop(
      i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ?
        full.month : full.month) + '-' + (i < 10 ?
        '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          var dateCompBefore = _this.dateCompare(_this.startDate, fullDate);
          disableBefore = _this.dateCompare(dateCompBefore ? _this.startDate : fullDate, nowDate);
        }

        if (_this.endDate) {
          var dateCompAfter = _this.dateCompare(fullDate, _this.endDate);
          disableAfter = _this.dateCompare(nowDate, dateCompAfter ? _this.endDate : fullDate);
        }
        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.dateEqual(_this.multipleStatus.before, nowDate),
          afterMultiple: _this.dateEqual(_this.multipleStatus.after, nowDate),
          month: full.month,
          lunar: _this.getlunar(full.year, full.month, i),
          disable: !disableBefore || !disableAfter,
          isDay: isDay };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);};for (var i = 1; i <= dateData; i++) {_loop(i);
      }
      return dateArr;
    }
    /**
       * 获取下月天数
       */ }, { key: "_getNextMonthDays", value: function _getNextMonthDays(
    surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i),
          disable: true });

      }
      return dateArr;
    }

    /**
       * 获取当前日期详情
       * @param {Object} date
       */ }, { key: "getInfo", value: function getInfo(
    date) {var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {return item.fullDate === _this2.getDate(date).fullDate;});
      return dateInfo;
    }

    /**
       * 比较时间大小
       */ }, { key: "dateCompare", value: function dateCompare(
    startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
       * 比较时间是否相等
       */ }, { key: "dateEqual", value: function dateEqual(
    before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }


    /**
       * 获取日期范围内所有日期
       * @param {Object} begin
       * @param {Object} end
       */ }, { key: "geDateAll", value: function geDateAll(
    begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
       * 计算阴历日期显示
       */ }, { key: "getlunar", value: function getlunar(
    year, month, date) {
      return _calendar.default.solar2lunar(year, month, date);
    }
    /**
       * 设置打点
       */ }, { key: "setSelectInfo", value: function setSelectInfo(
    data, value) {
      this.selected = value;
      this._getWeek(data);
    }

    /**
       *  获取多选状态
       */ }, { key: "setMultiple", value: function setMultiple(
    fullDate) {var _this$multipleStatus =



      this.multipleStatus,before = _this$multipleStatus.before,after = _this$multipleStatus.after;

      if (!this.range) return;
      if (before && after) {
        this.multipleStatus.before = '';
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
        }
      }
      this._getWeek(fullDate);
    }

    /**
       * 获取每周数据
       * @param {Object} dateData
       */ }, { key: "_getWeek", value: function _getWeek(
    dateData) {var _this$getDate =






      this.getDate(dateData),fullDate = _this$getDate.fullDate,year = _this$getDate.year,month = _this$getDate.month,date = _this$getDate.date,day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
        nextMonthDays: [], // 下个月开始几天
        weeks: [] };

      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);return Calendar;}();var _default =


Calendar;exports.default = _default;

/***/ }),

/***/ 205:
/*!*****************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/calendar.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     * @1900-2100区间内的公历、农历互转
                                                                                                     * @charset UTF-8
                                                                                                     * @github  https://github.com/jjonline/calendar.js
                                                                                                     * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                     * @Time    2014-7-21
                                                                                                     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                     * @Version 1.0.3
                                                                                                     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                     */
/* eslint-disable */
var calendar = {

  /**
                     * 农历1900-2100的润大小信息表
                     * @Array Of Property
                     * @return Hex
                     */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                    * 天干地支之天干速查表
                                                                    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                    * @return Cn string
                                                                    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                                 * 天干地支之地支速查表
                                                                                                                 * @Array Of Property
                                                                                                                 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                                 * @return Cn string
                                                                                                                 */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                     * 天干地支之地支速查表<=>生肖
                                                                                                                                     * @Array Of Property
                                                                                                                                     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                     * @return Cn string
                                                                                                                                     */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                         * 24节气速查表
                                                                                                                                         * @Array Of Property
                                                                                                                                         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
                                                                                                                                         * @return Cn string
                                                                                                                                         */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                   * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                   * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                   * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                             * 数字转中文速查表
                                                                                                             * @Array Of Property
                                                                                                             * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                             * @return Cn string
                                                                                                             */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                             * 日期转农历称呼速查表
                                                                                                                             * @Array Of Property
                                                                                                                             * @trans ['初','十','廿','卅']
                                                                                                                             * @return Cn string
                                                                                                                             */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                       * 月份转农历称呼速查表
                                                       * @Array Of Property
                                                       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                       * @return Cn string
                                                       */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                       * 返回农历y年一整年的总天数
                                                                                                                                       * @param lunar Year
                                                                                                                                       * @return Number
                                                                                                                                       * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                       */
  lYearDays: function lYearDays(y) {
    var i;var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
  leapMonth: function leapMonth(y) {// 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {// 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
        * 农历年份转换为干支纪年
        * @param  lYear 农历年的年份数
        * @return Cn string
        */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
        * 公历月、日判断所属星座
        * @param  cMonth [description]
        * @param  cDay [description]
        * @return Cn string
        */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },

  /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
  toChinaDay: function toChinaDay(d) {// 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
  solar2lunar: function solar2lunar(y, m, d) {// 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;var leap = 0;var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0) {
      offset += temp;--i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': this.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month), 'IDayCn': this.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
  },

  /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {// 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {// 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };var _default =


calendar;exports.default = _default;

/***/ }),

/***/ 206:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 207:
/*!*******************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/i18n/index.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 208));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 209));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 210));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 208:
/*!******************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/i18n/en.json ***!
  \******************************************************************************************************/
/*! exports provided: uni-calender.ok, uni-calender.cancel, uni-calender.today, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.SUN, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-calender.ok\":\"ok\",\"uni-calender.cancel\":\"cancel\",\"uni-calender.today\":\"today\",\"uni-calender.MON\":\"MON\",\"uni-calender.TUE\":\"TUE\",\"uni-calender.WED\":\"WED\",\"uni-calender.THU\":\"THU\",\"uni-calender.FRI\":\"FRI\",\"uni-calender.SAT\":\"SAT\",\"uni-calender.SUN\":\"SUN\"}");

/***/ }),

/***/ 209:
/*!***********************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/i18n/zh-Hans.json ***!
  \***********************************************************************************************************/
/*! exports provided: uni-calender.ok, uni-calender.cancel, uni-calender.today, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-calender.ok\":\"确定\",\"uni-calender.cancel\":\"取消\",\"uni-calender.today\":\"今日\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 210:
/*!***********************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-calendar/components/uni-calendar/i18n/zh-Hant.json ***!
  \***********************************************************************************************************/
/*! exports provided: uni-calender.ok, uni-calender.cancel, uni-calender.today, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-calender.ok\":\"確定\",\"uni-calender.cancel\":\"取消\",\"uni-calender.today\":\"今日\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\"}");

/***/ }),

/***/ 218:
/*!*********************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.3.7
                                                                                                        * 2021-04-12 wenju
                                                                                                        * https://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.3.7'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    if (!me.isUpAutoLoad) {// 部分小程序(头条小程序)emit是异步, 会导致isUpAutoLoad判断有误, 先延时确保先执行down的callback,再执行up的callback
      setTimeout(function () {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view快速滚动到顶部时,此时的scroll-top可能大于0, 此值用于控制最大的误差
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    textSuccess: '加载成功', // 加载成功的文本
    textErr: '加载失败', // 加载失败的文本
    beforeEndDelay: 0, // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 显示下拉刷新进度的回调之后,马上要执行的代码 (如: 在wxs中使用)
    beforeEndDownScroll: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    afterEndDownScroll: null, // 结束下拉刷新的回调,马上要执行的代码 (如: 在wxs中使用)
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 150, // 距底部多远时,触发upCallback,仅mescroll-uni生效 ( mescroll-body配置的是pages.json的 onReachBottomDistance )
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 9990, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* 简单判断是否配置了颜色 (非透明,非白色) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.startAngle = 0; // 初始角度
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  var me = this;

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0,也有可能大于0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的初始角度是否在配置的范围内
      if (!me.startAngle) me.startAngle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (me.startAngle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }

      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.isDownEndSuccess = null; // 重置是否加载成功的状态 (wxs执行的是wxs.wxs)
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += diff * me.optDown.outOffsetRate; // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      me.downHight = Math.round(me.downHight); // 取整
      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.showDownLoadingCall(0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.showDownLoadingCall(this.downHight); // 下拉刷新中...
  }
};

MeScroll.prototype.showDownLoadingCall = function (downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight); // 下拉刷新中...
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight); // 下拉刷新中...触发之后马上要执行的代码
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.showDownLoadingCall(0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
      me.scrollTo(0, 0); // scroll-view需重置滚动条到顶部,避免startTop大于0时,对下拉刷新的影响
    }
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.beforeEndDownScroll) {
    delay = me.optDown.beforeEndDownScroll(me); // 结束下拉刷新的延时,单位ms
    if (me.isDownEndSuccess == null) delay = 0; // 没有执行加载中,则不延时
  }
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

MeScroll.prototype.endDownScrollCall = function () {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendUpScroll(me.optUp);

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) {
    me.isDownEndSuccess = true;
    me.endDownScroll();
  }

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    this.isDownEndSuccess = false;
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault, 已在wxs中禁止
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止, 或使用renderjs禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 219:
/*!****************************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni-option.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    offset: 150, // 距底部多远时,触发upCallback,仅mescroll-uni生效 ( mescroll-body配置的是pages.json的 onReachBottomDistance )
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "https://www.mescroll.com/img/mescroll-totop.png", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "https://www.mescroll.com/img/mescroll-empty.png" // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
    } },

  // 国际化配置
  i18n: {
    // 中文
    zh: {
      down: {
        textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
        textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
        textLoading: '加载中 ...', // 加载中的提示文本
        textSuccess: '加载成功', // 加载成功的文本
        textErr: '加载失败' // 加载失败的文本
      },
      up: {
        textLoading: '加载中 ...', // 加载中的提示文本
        textNoMore: '-- END --', // 没有更多数据的提示文本
        empty: {
          tip: '~ 空空如也 ~' // 空提示
        } } },


    // 英文
    en: {
      down: {
        textInOffset: 'drop down refresh',
        textOutOffset: 'release updates',
        textLoading: 'loading ...',
        textSuccess: 'loaded successfully',
        textErr: 'loading failed' },

      up: {
        textLoading: 'loading ...',
        textNoMore: '-- END --',
        empty: {
          tip: '~ absolutely empty ~' } } } } };var _default =






GlobalOption;exports.default = _default;

/***/ }),

/***/ 220:
/*!**********************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-i18n.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 国际化工具类
var mescrollI18n = {
  // 默认语言
  def: "zh",
  // 获取当前语言类型
  getType: function getType() {
    return uni.getStorageSync("mescroll-i18n") || this.def;
  },
  // 设置当前语言类型
  setType: function setType(type) {
    uni.setStorageSync("mescroll-i18n", type);
  } };var _default =


mescrollI18n;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 221:
/*!*******************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/mescroll-uni/components/mescroll-uni/wxs/mixins.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 定义在wxs (含renderjs) 逻辑层的数据和方法, 与视图层相互通信
var WxsMixin = {
  data: function data() {
    return {
      // 传入wxs视图层的数据 (响应式)
      wxsProp: {
        optDown: {}, // 下拉刷新的配置
        scrollTop: 0, // 滚动条的距离
        bodyHeight: 0, // body的高度
        isDownScrolling: false, // 是否正在下拉刷新中
        isUpScrolling: false, // 是否正在上拉加载中
        isScrollBody: true, // 是否为mescroll-body滚动
        isUpBoth: true, // 上拉加载时,是否同时可以下拉刷新
        t: 0 // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },

      // 标记调用wxs视图层的方法
      callProp: {
        callType: '', // 方法名
        t: 0 // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },

      // 不用wxs的平台使用此处的wxsBiz对象,抹平wxs的写法 (微信小程序和APP使用的wxsBiz对象是./wxs/wxs.wxs)



















      // 不用renderjs的平台使用此处的renderBiz对象,抹平renderjs的写法 (app 和 h5 使用的renderBiz对象是./wxs/renderjs.js)

      renderBiz: {
        propObserver: function propObserver() {} // 抹平renderjs的写法
      } };


  },
  methods: {
    // wxs视图层调用逻辑层的回调
    wxsCall: function wxsCall(msg) {
      if (msg.type === 'setWxsProp') {
        // 更新wxsProp数据 (值改变才触发更新)
        this.wxsProp = {
          optDown: this.mescroll.optDown,
          scrollTop: this.mescroll.getScrollTop(),
          bodyHeight: this.mescroll.getBodyHeight(),
          isDownScrolling: this.mescroll.isDownScrolling,
          isUpScrolling: this.mescroll.isUpScrolling,
          isUpBoth: this.mescroll.optUp.isBoth,
          isScrollBody: this.mescroll.isScrollBody,
          t: Date.now() };

      } else if (msg.type === 'setLoadType') {
        // 设置inOffset,outOffset的状态
        this.downLoadType = msg.downLoadType;
        // 状态挂载到mescroll对象, 以便在其他组件中使用, 比如<me-video>中
        this.$set(this.mescroll, 'downLoadType', this.downLoadType);
        // 重置是否加载成功的状态
        this.$set(this.mescroll, 'isDownEndSuccess', null);
      } else if (msg.type === 'triggerDownScroll') {
        // 主动触发下拉刷新
        this.mescroll.triggerDownScroll();
      } else if (msg.type === 'endDownScroll') {
        // 结束下拉刷新
        this.mescroll.endDownScroll();
      } else if (msg.type === 'triggerUpScroll') {
        // 主动触发上拉加载
        this.mescroll.triggerUpScroll(true);
      }
    } },

  mounted: function mounted() {var _this = this;

    // 配置主动触发wxs显示加载进度的回调
    this.mescroll.optDown.afterLoading = function () {
      _this.callProp = { callType: "showLoading", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
    };
    // 配置主动触发wxs隐藏加载进度的回调
    this.mescroll.optDown.afterEndDownScroll = function () {
      _this.callProp = { callType: "endDownScroll", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
      var delay = 300 + (_this.mescroll.optDown.beforeEndDelay || 0);
      setTimeout(function () {
        if (_this.downLoadType === 4 || _this.downLoadType === 0) {
          _this.callProp = { callType: "clearTransform", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
        }
        // 状态挂载到mescroll对象, 以便在其他组件中使用, 比如<me-video>中
        _this.$set(_this.mescroll, 'downLoadType', _this.downLoadType);
      }, delay);
    };
    // 初始化wxs的数据
    this.wxsCall({ type: 'setWxsProp' });

  } };var _default =


WxsMixin;exports.default = _default;

/***/ }),

/***/ 23:
/*!*********************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_financial_calendar.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAQAAAB+HTb/AAAAoUlEQVQY02NggIETDKxgmgXIggMuhkKGZgZzhvsMckC6mUEGyLIG0kVAGYZOhhsMBQy6DHcZJBmygVAcyDIAitxk6GJgWM7gCTZBGW4WhOUNlAEiGwZswB4mKcSwBEgj4DKg/fYInZoMOkhQi4EJWRKPseRLCjOcYjiPBM8yKBKl0xmrpCtIcjrDYQYfBnc06MNwBCjDIMWwgGEzFriAQRoA8ng7bJvZX+oAAAAASUVORK5CYII="

/***/ }),

/***/ 24:
/*!*********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_seaver.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA8UlEQVQoz2NgAAMDU5NFpo9Mfpm8Nt1sHMCABhhNukz+mh4zLjEKN8402WD6x2SLOi+SvEmX6XejaATf2NzkqeleBmaYtJnJX2RpsJiO6TeTbBhnselRBgxg0m96C8Z8alyERYG16X99aTDT9I9xKKYCU1nT/0bGEOY7k3RMBQYGpv8NVCEKtpuuw2JFmckrBiYIM9j0j5kJqrS2kMlzk06E6m2mj400UaSPmL4w5ocLmPOZHDD9ZtpjaqUnY6gPNPy56UuTv8a5yGayGOeZ3DH9D4Imr026jPlNCtCVgIJYzsBUXw3qNAasStB8QpSSPgBFlEzCNHm5CAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 25:
/*!*******************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_contactWithRider.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABBUlEQVQYlU3QK0sEYRTG8d/qgkXYIJicZJzkBTYJCzbvRYNGLYb5BH4ALYI4VYN30CDIVv0AJsUdMVkGRF1EWEyKKK87ig+8nMM5/3N7S7OLLyXMow8P2I+j9CvLkwU04ii9hg6MYA73GMO0tt6xkeXJ8i/4isc4Sk+wipkCnMIKlrI86QrgHQaK5Cd6Cj8UDeEU3eU4Sj+yPLnK8qSGQZwHKo7SW4T3o3Jh17CLcdSzPAmxSdxgK47SRhgdqsMhx1jHBHoR6AscZHlS+QELeBPP2MFmGB1H6Vn4IlQ6a7WwWlu9lcvzZqv6hu1mqzrcbFW7MYqjv47/OteLaw/Rj704Sp++AejVTYtOxdjbAAAAAElFTkSuQmCC"

/***/ }),

/***/ 26:
/*!***********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_receipts.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAABG0lEQVQokZ2SvUpDQRBGT/RamNp20MJGFgOiBLEQ8QWsIiiksrC6IIhgo4JgodhN5QOIvWIlCMEmWAgi9wVcK8FSBfGPgQ1c1ixcnGqZmTPz7e5Xa6291IEVYJBq8QWcZcASsA1cVwQXgTcDa8CtE12vQhU+PzUmKyWawGjU9wNcOtH3eEBWOs8Dzaj+CXSBpyToRI+rSP0DJqT2ouNEn1NSF4CZBOiB/qATPfqv1HFgrE+PvWzXib6mpLaBucSCfeAmJXWv8PmQfa4T/Sg3FT4fLnw+4ES/eznz6mqw3RWwAxh8CJyEwRvAFvAIHITeCyvYHVrACLBsPgzSNoPxO8AkMAHsArPAuW00uOFE7yJ5U+YcJ/oQ5aeB+1/vuEvYVIqVnAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 27:
/*!**************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/suitableAbundant.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAYAAADNX8xBAAAACXBIWXMAAAsSAAALEgHS3X78AAABpklEQVQ4ja2UPU7DMBTHn1FhxSBh4YlKeMjW3KDlBO0RwgmAjY0MHKBHCDcoEjvlBkFiyFCJMhV1MiuL0SvP4WGnoUj9T7H9/Mv7tHDOwTa0sxVKG8ho1TVaFUYrZ7SyRqvLyIipMTSjVQ4AeHE/OHrG/dliOW0FGa1GADAGgBPa+qB1CgBDdu98tlgWHNQhQEoX+uzsjv5uyWZANj0A6EYenR4focEj23siQBnF/A2UCK+EzCj8MnE2Q48GLIxstlhOottMD++faSVk7r1/7YheApDxqpUIwT9VQk4rIX9VqRJSVkIW5P0K8rIn4Pag85OjQCkZ9pn7g6CKb+j99eFunZImUE7JHFJief5WVUyczVcrreqDqCETZ23iLLbBGfWNF1axW0MCNXnkgdh0mFgMa544O4+MmNaCAuCf4qHJTS54YT/xNYIsffeMViV1cKtoFuchCHvj3sOwSkarCU5/gxcjoxUCbqgVsIpXwIc2mCVgAzumsIu2WYyeEXp38qD5/GuAapzFde8ReoCwC7aNwDx8PlpBDIh58okd+zD+DdpYAPAFQZ2hrf1evXoAAAAASUVORK5CYII="

/***/ }),

/***/ 28:
/*!*****************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/meituan.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEX/wwD/wwD/wwD/wwD/wwA/MAC/kgAfGADPngBvVQAvJAChewAAAAB/YQBPPADvtwDfqwAPCwCziQA4t14nAAAABHRSTlPgwDAQNrKXdQAAAGRJREFUGNOFj0sOgCAMRAE7pXxF739YKWwgmvh289J0WuMMLfRoaMNq3vgSpxAxCSuiIl5ADlAiVADeI4BL8WkVrYZ4r4K8gIcoNec+3IaYS1PIdS5NKpi0WmYr/V/6fs7ZLR8P1VMFXzShECIAAAAASUVORK5CYII="

/***/ }),

/***/ 288:
/*!********************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 29:
/*!*********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/hummingbird.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAACXBIWXMAAAsSAAALEgHS3X78AAABEUlEQVQokY2SMU7EMBBFHyt6ovgApHDPlnSsBAeAG2zrihwhR6BKSoK0JQU3IA0lEtRJkT2AJZDog0aaRMaBLF9y7Bnrz/8TD8MwTCst2ySMl9aRfEzVZcAHkAONd7bhAFZ6nQhBz7WpOokXsTJVVysxUUVRltwiRLEHnnXfaYGNqbrtEnHs8Q0409wL8AWcA2vvbD9jBcRH4Ao4Ce7egVfgEjgFHryz25jYaH91oBxjH/ReH+tBrMqTbIACuI1IN97Zp5lVgam6QnONFrnXeO+dzWL5URHvbKEF1kD4R/OZ6WAAQgjxAvj8zeKEeB7Tsu3Tss3/Nasj9NGz0fYSph51Pu/U6kGEPV4L8a9J+QHgG35qpXnJNUoxAAAAAElFTkSuQmCC"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!******************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/shansong.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABp1BMVEUAAAD8wQUEmf8Fmv8Fmv8Fmv8Emv8Fmv8Fmv8Dmv8Fmv8Fmv8Fmv8AmP8Fmv8Fmv8Emv8Fmv8Fmv8Emv8Fmv8Gmv8Emf8Gmv8Fmv8Fmv/+wwQFmv8Gmv8Gmv8Fmv8Hmv8Fmv8Fmv8Gmv8Fmv8Emv8Emf8Am/8Fmv8Fmv/+wwT+xAUFmv/+wwUFmv8Emv/9wwUImf8Fmv/+wwQFmv8Emv8Gmv8Dmf8Em//+wgP9wgEAn//+wwQFmv/+wwb+wwYFmv/+wgX+xQYAmf8Amf8AmP8Fmv8Emv/+wwX+wwT9wwUFmv8Fmv8Emv/+xAb+wwQFmv/+wwX+wwP+wwT+wwYImf8Am//+wwYFmv8Fmv/9wwYGm//+wwT/wwX+wwQFmv/9xAb+wwX9wwX9wwb9wwX+wwT+xAX/xwD+wwX+wwUGmv/9wwP9wwj/xQb+wggAjf/9wwX+wwX+wwQFmv/+wwYFmv/9wwUAnP/7vAD+wwX/xgD+wwb/xAb9wwbovhkFmv/9wwb/wgG6t0dqq5kuodWQsHKbsmbJuTcin+E8o8dLpbdaqKmes2Pnvhky9KgpAAAAfnRSTlMAgIC/tNmwmTZM66cyFNGSePiccWNYRir0ybyjh08uJN28uI50QBD8n3NtaWlfQ0EczquWfVVJOzoSCu/TwrdmKyUZFwbv5eLOjW1cq5iTi3pkXksgDevo4YeDgkX3xbKloZ1UUDAJy8ZSNR8bGAL989zV1MGoEgxaBdhW5uSnwKiJAAALa0lEQVR42tXdZ1tbNxgG4AeDjTGYDbYZxuy9CbMQNoEwAoEEyCAtJaQNkNHMjlfunj+68yoFrK0D7v2dD8JHR++QdOCVppq88rL2wrXiQGZWbnFB1UDJ9bLqrh78j7xpLGnJJ465zILSoTdIdzWf7GZtk9zL5d0ypKuTwewQaehEOpq+mVtEerKQduIlWaSvHullpiRGRq4jnQQLQmSoEemjLEDmZpEmehryyUIM6SHeP0dWCpAOZqqiZCkdFsSTkgRZ64HQ+0/ftWZktG4Mv4VnbsbIXggCI20VyX8dZkzBC+VZ5MJDcB2tJs/pG4Zr8RZyoxI8bQ+SF608hlPtIXJkAByPkim96IY7m5XkzDWkVpHk2YArZQlyJ4/3e/DdhxNNBeTSKFLJSIocwYHBXnJpHql0J4X6YG+X3MpEKi+SYuuwNJ1FjlUhhdakxNh7WMnrJQ63kdZCUuYWbOSEyEh0Oz8zULzm+0d9IP800ozgouGk1A1YKCVtd2vrS4OjuCgcvFaY6yfqRQr3knLHMDZAehL1jWGIbTVucdZCqX2Y6icdvb4gjCUV3IOhgOYoLEwlueyXkiz1adE/CDu3kwoWYKSAFAU6m2CrI6lgDCZKSE12Hhy4l1TwwCil1RmGvTavfpFqrWHY+zip4CtoKycFgTw4M5lU8H0XNA01k9RcCVxKKvgmfxpa8hIkFYjDqfGk3LeUCx3hfJOfw/vXFuOULbiySaY2Ditm0e93nLoFz3WS6Z+FezeSMj/RH+YjUBQPkVjzEji8fQF/TX+pcxVhvSyHNz6UTXW99qOPxJZ74JERybtXr/84KK3aeue+cDGkf83l2b95s+GldcEE0WzSZ19tx2xdOI5ThZC4RkJL8NqnTzgryFlFQxA6iZFIOS5B61jyvB9+vrgiQ6hB3gvw3uPWG2efql8oBR8ENu8qPVfem2x7dOP5s+Sz33749ZsfKaVQjWnxpwoeWh+/M/EU50T8hu+dRhLIhXfWD9kfPr6YFYVIIGgUm8TC8MoXh+wvuCin2WRp7iS+6BA8Mvkh+9s4UmgngUFOSfaDq5jorXfYPzqQSjHxBfSDxWJ44/44+9db/ZCpESmM+omr9w28cLzKTlUYxBotmmlhcxe8sP6C/UcrOFqIqzmOi14RVwM88GkfO2MKHDWCVXoNF+SIWrDuvc94wM6YMKpBhy4mebnElQPnPn7CzukAXx1dwA3n80QzyrWnK+y8hREYRRwfnOCseuKJxuFYxwK7YAcia8R1E2dMh4jHB7eGJ1gKkxBp4q/Vdap5yMsmuPR2h6XyyLxXc3ZpyCeedrfx4Q2W0m1I1KkFHV3E4x8FXMeHF41btM9CTThVRTyFbuNDjg5I9Sol4DHiuDvjLj6sYDwLI5AqUXm2It6ntyOLjG8RcuF54tielY+2KAI3Nj5nAsNQUEU8OfIUtx9OHLxmIhVQEWmWViFmizwtyD3OeM6EOqCkhRumSDvq+XBg/5CJ3TmGkDziqpHVrXedLB0yKxCTL4ql+Ns8v3Bk69YYk7oPRQ2SF3CcOF7B0u1xJvcEqoKSSVLqUYY79RFT0QoZeUQYFqciNbDR+iVTMgVlBeKVpJZSi1kGJGomoG5QnDPNu18Nn64yVW3QEBKd+31DHJ02uayyKWhYptTmhevMJsx0TzB1E2429U0DWOKlVDByvMh0tEFHE3e2C9b1FtMyqJYpaMkUzPaHDqfI8B7TMwE9LYL/+hylFoeukZ1nTFObo536tUCPs2PaG58xXXeOHG3h9fMLKNv6xXV9i9A0xEtl+X2UWr3k6d4DZuAAmnr4799S3rpuXXeT+xDaeMlskBvkl0DZ5CNmphva/JRaNXZtmyLvOcmT3B5O2WaJpdzQuEa9ZWNqH/qyublTJaVmmzzJPXF55KuKW9NSreaa64CBQl7azm3mWqbkcs+PXB7OCYDXC9JpBHr+7pXvTcnEvOFA2r5kdj6GiVLuQKJGA+muYJYWYKSTO5Bmg4G8XWTWHsFIGXcgc/oDGX7C7HXAyCfcgWxrD2T/OXNgEkZyeAPhvrVGwfMZc+EARsq5A3moXUN5wlx43pch17Y/PDWiVKMLoE6/Et99e//delvrrZ3F1Y8e9U1UVEzs7fW9/vCjlZXVxZ2dexl/Wu1jrnSrrCPFWObGxZb2mSMdKp3EKrR4ddfdMHPjxqTKbqwGbi1+AJb2mBMVxzglKl7tenVQhDlx/hqnu9wtwNc92kHewRzo68ZZo8SRJ3gx23nBrFVcjCsj/J5VDaUWhZWn9pN8Q6PVEwVOiCMCGyvM0s5bnXTEDyDBrUvYGGNWJoaRUr2gnJjpxTm928zGl226fd1iwXGAXliYYBY+mgLHtKgbWujFrak2k3zf4HBhjiDnoiEYu8VMPbj32OQM2LRoD3YJjB0ar4CfQsQvvAkuyt0abOqAmflsA0IR4sgS7x4ahaFVZuLZzojpzQc+TjnVNiVZYAb2hiFTKd6LUu76xPc7pu/FOuS2xc/OG+JOITOvmbbVY6VSkKRN+NDtReIjD7TD3PtQkSvbWFbgdvtym26PuhVKaopkWxY73d4kXqEbkFi2Rijx71Cdnq76lOk4/BiqYvKzU7XEEYC+ezoBScZ7B/dk3VQ4z9MFPvuKat+Bi/uMojOcpd+uBHHbKCCRmwkRxzJnG5RlCKzc5l0c0e65yUuJhc7upTkaU8xlu8Ghe0a9eVPtOGXQi0VkoQOafIpflnno6oqdcaZg5Sk0ReYUj+X5yM2Lq5vJjd+GtmLiSWzhvzajxJPlNhN5fgtO71rcVb+2tBTKRu4widcHMFBHyqfAgsTlDzurXH++4foS6Bad8+xVruLFxWOY2PpAZwYPEldR0EmTavw+zPj0LhSptb9tZ5Hxjd2CoWrNe7I6ra93ebwgmOSTMLTp1710J0ZcRV1QsOF2kssnLw1pXx2kdKnrniA+NFZocLFfLVlNkwPd0oLtZYtFcW65RcBnmBqOtcLC9AdG3+8LWH1B63OWwqNJ2KgkDvHdbV0kMB+H0BepksB3sDJAAruG/wDy50HkNa8q7c1Ep/wm8AVJZDsCvqlnol6HB/fWf2LxCZu7m+pNqsN3sNROIv0Qmo2RyNwMeG6cC0gew1IOibycsfpzio4qVYE+moStPBIqs/0wRDNS+5CTy5oKW1/WG35JYjVI4ejBaYWkDfa2SCjRA7kykigXpoarT2Gvy8lXkltIop0/1fe64UAhObkF+s1DkljjVIHG1+HA1jKJxZqgJhgiiUBPioGsdMOFoW0Sa27U2Ekvk//J2Qh+7M6tIzjRTjINWg+pVMGZFekt3Aj3k0yuZolS6mUZnCv1k4y/BzpGM0kuuwdODQVIrhp6IgmSS3TCnXAVKfBBV1eUFGTluHyq5OrtDgF5P5ShAKnItiodez+UT3JJSS7MLNFlDGWzsJfUZFnHPHL5vjiMlBdHSVEmzDWQuqzrYWiaWXpFyjJho5w0hLIHm6Csa6BujtQtW2ecWqKZa9UKg4k3BEKkpR62avJJV299dWQUHOG80tx50rUEezNZZCLUGyhouNYYjNdsTjeNnoTzqturKjMTRWTiOlyYraQr1glHCulKlcGZ6gRdmd5yOFQToCvSEoZbVXQVipbg3E0/XbpYIzwwXUCXLHsL3sh5SJfog5vwzMlAEV2WtSZ4KRigS1HXCK9dyyTP3V3CZSjtJW9l1+ByzJYkyDuVQVyesM9P3shtxOUaLfVirgTKcQUGK5vJpebKHFyRSFWCXPH7IrhCs9cqo+RAXecsrlpPe51tMFI/hPQQ99UWkaHawjykk6bq+hjpShRf20Iaaqpeqw2RmuZXa9UzSGc9OQPLfhIo8tf1lwTx/zDbE6y+PtC//CqW79++O1fUHPLHapeL1wrLgjPwxO8DYkJtimChMAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 31:
/*!**************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/dada.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAB11BMVEUAAAAAd+8Ad+8Ad+4Adu4Ad+8Ad+4Ad+4Adu4Ad+8AePAAdu0Ad+8Ad+4Ad+8Ad+4Adu4Ad+4Ad+8AdfEAd+4Adu8Aee4Adu4Adu4Ad+4Ad+8Ad+4Ad+4Ad+4Ad+4Ad+4Ad+4Ad+8Ad+8Ad+4AePAAfvcAdu8Ad+4Ad+4AeO4Ad+8Adu4Adu4Ad+4AeO4Ad+7///+Au/e/3ftAmfJBmvIbhvD/qgFNoPPb7P3I4vsvkPGWx/iOw/hpr/U3lPIki/EJfO/z+f5usvVJnvM7l/LM5PzF4Puu1PqayfgSge/3+//s9f7Q5vx1tvbo8/7k8f1fqvQzkvEojPH7/f/Y6/283PuGvvd5uPZSo/QEee612Pqm0PmSxfiJwPd8ufZcqPRZp/RFnPMOf+/V6fy52vqq0vmgzflytPZiq/UgiPCp0flVpPQsj/EXg/AUgu/w9/7g7/3S5/yjzvlWpfTe7f3C3/uy1vqDvfedy/mQxPhmrfVHnfPc7f1krfU+hLReipd6j3yZll/t6dknfsmzxcf/46rToSnxpw2s0/n//PbJ3/JYoeMOeuETe9ygwNMefdJSlMhlnMT/6r/v37iuspWqrYv91IL/z27/wUa0m0bDnjjUoSj/tSHWONg9AAAAL3RSTlMAkB1uV9/W0Zs6Kw78xbCtgVpHE/RBJlEk9+7p5LeWc2nbvoYzB6nZy2ZfMHqiS6yAA5wAAAwSSURBVHja7Nn5VxJRFAfwR4a4kGbHyhbatVO/fO9kgorkSkKomJQLFuZWmrap7ft+2ve9PzaCBIZh5j2WATpnPv/BPe/ce7/vPWYwGAwGg8FgMBgMBoPBYDAYDAaD4X9Vt6HEZFtnKTVvq7Vaa7eZSy3rbKaSDXXsP1JRUrUbqnZXH9jEit+ag2XyIi42DnmRrNS0dg0rYvU11ZBpd56gsAHnMqLe3LuHf6pr6llxKjeZIdMxMkCrXMDj+w+f2e12xJhN5azoVO7agyTzbkrw+ac94gES7dlVyYrJpvVmJPMepURf7REPkcS8vnhaf2PZFiiMXSOZ7/awX/ehtKVsIysG5VVIxUUyT8NlPH/wGqlVFb5ZKvdakdI4Jfr42/784WOosu4tcK/UWKBiQH4ezx68gyZLDSucigaoaaW4F99+3AfQI0FTQwUrkM3boaqdYj59uQcM9c8EmqFt+2ZWEDuhYYqiHj15D3gHey9R2G1w7GQFsAOamiNVvALGuj1+ihoHzw6Wb3U2aHv59gOAqcElP8W4IXNxCgq2POf8faXga+qaCVAieZOMUGcbFPbndTuWbwXPUKiPkvmQwEFhjVCoXcvyZiP45v2kEECCIIX1I4UDLE/WQsQsKbQgbpn+chRyeK2HkAlSkBB3iP4aQkrrWR7shCA3ycj3yCBFQEUe+uQARN2iJM1TiGmhv4JQw5ldOvYH/0gCk4iRKKILqnQO9htrIc4hH1xziOmmqHao2rqP6ahuP9LRNEsxPklxHnQWGkr13PE2pElyU0SgrT2eJ5fon8PQYmO62YH0Hb8+4wlNHEeMI7bxewuVIHcia2OjS7Tq2BFw6LQYNyNL3lHnHYoLgUuXm1bF9rT6/PBtx8LEnKurPzR80zN+7aR75RLJzIJvewXLvQYIutAd6r1MPH0Q0cByrka0uT0kohNialiOVVpyWQa5IchSyXJrLwQsekjMDQjby3Kq3Aq+xjsk5MoZiLPmNnRVgW+UhJwIeZGOKpbnu+0IifC7OsChZ6IvA1eQRFybR9rKWM5s2gKeNoo7cV6SpBVKpRvp27Ipj7f0BVrV4riAiCVKAXw63uArzeBoukRRnaGx2AwjJR8yYc7VLtkFnhmK6m2VHZJCMzKyi+XGHnBIFNUv/3tTakFG9uRoGYJnhSImkShESjPITG6Wogk8FHEGMqdIaRyZMbEcqDeDx0lhI4rfUCUnMmOuz1N+95B/DklOktJ1cOiZ5quRmT5SOosMVbOsrUGG/JTCKddkEzKxRq83Ur4AqRg4PYm0HdRpZvG1kgb3LXDkPjmWIjMu0uQeRFp2Zx18kaHzxOH0Ih0VunyH8M0fI54+B9JQUqDhO0wCXFDQ7ca7G1zSIeUUOn6MRHRBRs8mAdcgEUmQW5wmMQsQxrJSB64ZUlSyPE2iHBBVx7KxATw9FBHswaqhsySupQOCNrBslIAjntavSj3zY8DisI8UVpznBh2Ty65QMPMcWaLvXr/A7+oVqREx3olZkmuFGJO+n4Zd3G3RNQW51tOyGNaGqFFpbhEabCwb68DBa+vTSKF7gOJ8TQB6PJ1ENK1VyTqWDQu0dZOmO2rjtYXiZheGL1PUOaiz6BoZg6Ql2A41hygVCepKWTbM0NROWtogw69kYArqzCwb26DpJqnz3wX4V2HxAbaNZaMWmihCcpwPUJLp/ou8we1L7/WulmXDKlDITQBDI26K883e6gDXKMmcgzarnoVMJ7yM/GHmXp+SiMIwgNvU1HSfbjPdpulDt6mm59klRkTlLggiKgJCaqDmjRQhL2nl9/7sgF327AIL6IHq90WnWWnO7nnfc86e97AyPvbJxQN1Q/GgN2kKa04MtCGP0VHQFVdwbrNnenP3eEjGUwySi5rUCrp7OiTjNQZpiXWT6MVryZF9kIKscuVF+Cuwd0VyrjVQLvJ4FxrHpL9jrNwc0P76V3UsCVlBZRZ17kyKNVNR2Lk1oPXIIcnDrSj6wDme7uF1xIXBrBCDrIuN/oQUn2N63U8hDDsXB1M1t8iGuDK8i3OJBpUvfjbxwIZcNd07tDdHi5HRWS/OIreTH42TZ9nUeie3xQ4bG2xWLgY8TnRVCp3WpjJnr0i7PjSYoX1nnW3Mu9QNZWvF64NFruT1BAvjn4/DU+zGgbaeDu7d78dPtDfv30vM/ErFJ8JqvOxnzyoK2rs1yFrfwgj7KraYhQ3pgpS76Gg/wr6ZWPDC3ochOffQhTvjYh9UxoLoRH439Aq68c1+opywEkIXV/5OYX9yU+V5fZl2o7sLf2172v357JFfLi4Ed9GTB0PS7qNXyfxJeJ69iR0uZ73o2eO/VCkr5EKbXUa9g/TkQmEOZ/PsH522KIW2MpORwzVTi/Zc4cXM6cdtnMuDIXnXIMNX2k7OhdzOHKS8GJJ29T7+A4/uDKBjjXUt6RshF9DCaV5tLJNfOvy52/jNI9ZV8itEVVW9MERa66481SsgJMhZtPCQdEI32VIX+E1VHUYjtT9fTTDug+5tH+JjyVKwGCYzrTfRL5qaa38yL2s+B75OLsFi2FhUrTR2JNzkt/5MUt6gLmjZ60i1eUWgmJvqbH8sepwso0qpSZOKDro9JmrtUVXVRVVDquJZv+pDKTmpwjBFZtHEY26qm+QqWmTIsNZoi1NT7HmAUzaLyM/kL0On1nqOoy4J6jfz+/fvCixNVXSmKxyo2ycDG2Sx+gFYt6n7nyMVYMF+4+uy/DTLUQWFLTbNV3ih2m5CTZPZNDkWZgyOGnJK+0G3+TPM+WIDzS7158CewhZ5WKhs4TTSxdwaGZjhL9SckmsASiSj4l6JhvishcRyUXJdpKSqHUvH0a2gLsoao2ulSVXR+YyUvbtHZsnDRoZVtd5EaEYt4RAkWUCL63JzkwSrouZmwcrLqhnoQiRVWE0wtkpyjiw2GlbUUm5MjE7kkuVuGdBwTW65rqokzcMaj1vGQ9PRwiMjeoQpptwkk43QrZAnWkZ2QVNPttNQO5anfZAsZ/SRfujW21ZmDJNH0DhYNwszMp3VPkSti5FioIDGRRag0j4Sz3uQ5L3oOuLGbZEstkbiuNh3OiaZIueHrdOs400yhXbFKwfQxMiQHvMkZ0h+c2jQ8F7yII+jEaPwzpBhX5rkj+bBThG5bdQ9RSbcMHgURVnSIoctwtAYOc43QTK0XI8Zq+eSw0iBLBodyx9CKd78ZVkbjZYVWGspPpJMrcLst2ni5CIn2k2ORQKb1n5kYHFJLtgxTZ6g5rNe45qcIfeSENJ6daKX9ZYCX8WtFtluWUQUf2wrVdZZThk1C9T76TetQcI5ywFfPoJuSf/ATeMehWLkgc8ykZzT7yoLjajhEUzKZEDktUoOW9bkltVbHiAZyRkp+QeEGy8lz4NGtCSUN018hmnpHX7SCUTLpq8/+dzUx+eN4thhvQWLlglKgFzUH2Va75S5NBnbh+G27FmeEXIFCOmPXKSviHkFAvjSlqR/YukZq2J9eESWowB29shDmNaMy9owNbILXWmETIhgfCu7OT1D7mC76bDXtOn5bJNTQMSclvU+vg/djpGURMVzwPhNez4B7IZde5VtGLYrZMojvUF9SSTGKDoJkRV0NkwmUON0kRU9vL6YDv0ddq1mviT7cm6XpEP3sVljuaF2vgLjZNxIrnmxBDFW5b9IxWFDIkI0955o/529T6jZpA0RJsv6tfuWc5WKyAgx2oqh6vV16V1dp7/btzfkaUNksaKWKUoV6xb0mpGvj2gr1YcNkoePAeRVWxnURMdVW0HU6cPfSfVfNiD8VKqcqHJ+VWwBj6TfNd67hf/An/bubjdBIIgC8DDb2tWUgKzBWlpUsCkVybz/2zXeGI3/urCrOd8bnJyZ61Mw3U/NxbG5IitMHIpDRWzImg+lw0w6l4V6xtSqpCet6CXUMY6kBRFT90qxriQnhr9i1euQHDGBWKSZ3EkKa1/+Qm5NM7EhMOQal59yL70gH6TB+zPEWKvzm1uZ5P7EWDMqlBt8lf6sj2wkzbW1vE3dv/hBZhlN5FJV7Md+yhE8+87krFGhPDypPYs/XZ1oIl8O6IEMxqumGu3UUDWr8UNl2PJjOK37/Tpl4+v8FgAAAAAAAAAAAABA2/4B+bFMYpyzQg0AAAAASUVORK5CYII="

/***/ }),

/***/ 32:
/*!*********************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_callRiderPhone_but.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAQAAADMDLw1AAAAkUlEQVQIHQXBvQpBAQCA0e8W4gEMkkkGg5+UzBKDTV7BC1hszAwGKXkDZTMaDFaRxL0LO/IQn3Nw69efM7Dk26VxjMDAuyljZp07xYtJcGHHoi/LRri0Cx5tgC0rDrHhzphP0wAAgHub9j059uzEDGDeyJw91xYceQXAtqFVAPAGAFg3dGXNwAcAACYcePDj5g/jkGF5HRkC5gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 35:
/*!************************************************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用
var MescrollMixin = {
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调 (mixin默认resetUpScroll)
    downCallback: function downCallback() {var _this = this;
      if (this.mescroll.optUp.use) {
        this.mescroll.resetUpScroll();
      } else {
        setTimeout(function () {
          _this.mescroll.endSuccess();
        }, 500);
      }
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this2 = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this2.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 4:
/*!***************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/pages.json ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 52:
/*!***************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_totalRevenue.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAApCAMAAAButatJAAAAM1BMVEUAAAD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1AD/1ACGIB3WAAAAEHRSTlMAgEAQ8MCg0GAgMLCQcFDgBYC3gQAAAUlJREFUOMvFlEuWhCAMRUkIoCj69r/aVqQJVbHtUZ16E4RzyY9E9xnNMYR18223Hbsl31CCqkClUMAlyxVgxyhJABmMAHZ5TahKKzt/h21APFfPh3y7WAzmBZifDtTrMu5j92nMsW4zIN7daAJ23SU1brxi1TuHEtvyJgBCmnkAbHRZzsOXYPgEo6FSNmG8cf6k/E1WouEeCo2aqPktRL9vg20wvvsRjwB6xuLVZW6HlYtDTEv/jDUA5SplntZLtavca37UjExqbGaOV/k5D+akeZ97xiptlaslgOSesK2+GQ8VpBBCAvZjGdoDCDW0qV8kogiEYyljT0mblXunelqx/IytDfNOC8IFiDwUpBLdaRebZlz+xTS27W1qs5liOQs7jyNk1YHdDKQZzHK9WXzg+OyktspC96q/qKXzTwq+BRn3v6E0uW/pB88WGWPoCgo6AAAAAElFTkSuQmCC"

/***/ }),

/***/ 53:
/*!**************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_freshCounty.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAANCAYAAAA5QzeRAAAACXBIWXMAAAsSAAALEgHS3X78AAACIklEQVRIic1VQU7jQBCsoNzhwHmZJxjuI7IvID/Y/IAwH2BzR8bS3lfmB/lBjKy95wnDjSNI3DgEdVRtTXocZ4U4UJLlsadnprq7ume02Wzw3VG2bg7gHsBN8LFSukdfxbtsnStbV5jvGceFjj+JyGUv6fKxIfD7f/YOPvbZ1dyj4dgBmHE87XF2AmCS7QI05n8TfFwCGFnDQ5Gf8RlE2boTAJeM0Dz4qJHSTLiB9akTtwNzGXYibyPK6GT/eyAOvpLkOpHPcRLhpTgZfNTU73NIbGPwsT6khK/S/JR6vCSpiiQWAFaUgsyfZCtzJyZJtuW9zlYQXeTppU2bztmWtOjJRs31tUaaZG9JYJ3ICfwXSVAde1XNM2Nn/O7F2BxuDStubIlG5FDH5f1IUiofJZjqt2DGzuiozm+LO/jYlK174toqOy0lz6h0pFiEktI7iQorfggLEpd3EXycJ1mTIt4JDDUtRB/UlvZpZ6rozDD5HlTMxJtkRYrQpN0i1WnBlqlYle1W2p3cGJwrjn8ltg9m3xfsQVawsmnZuiU9nvNGW7JbFP3bbCX3D8AfAH9FZsHHiTyU0M/g48jUiez1xPF2nrYCueBq3qp1dhqxQ57XcGTxdJEOPs6YhYY2FkLqHcAPABcArjOLHELedpK0G8nZ50Ny7ciTlER7yqjtSIS6lHnpBPbikqIT+1NtfQNZSokq+apsnY6f2ecle3vbJAB8ABHM4kVDGD0vAAAAAElFTkSuQmCC"

/***/ }),

/***/ 54:
/*!*************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_hungryBest.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAAACXBIWXMAAAsSAAALEgHS3X78AAAB0klEQVQ4jbVTPUsDQRB9J+kiJIWdF0xjqxFbIbGyu4u/IFGwNqmvMAoHduofMDGNnZofIFw6QYLJL/AjCHZeYFPKyh4zd5u7E1HxwXGzM7vz3szOGlJK/DcynN9wcAPABnAGBHYHwJLG3wdQBrApXXiGA1bXF13bp7NpaGY0Z57++/SNNJJnACWynwwn2HtIayXIS0nOGOokK7HgC4BVslsA2mQrMqXcUxUpx7SLHMW4Cww/O+4NgzsxHBQBPCY0fI+m6NqK6OGrndlxz+BKilpbuEUjqmRCytnf13J4KT6uNkc5wosP+w2gTklbRHJKsQMAF9IN4hHcnjIrumtasNXQ1NR96CR86UOanI42LXWtz7Wt+uDj6vZoN9GXCGua6IBkLlaJHyMFtSlUOlhYXk+kTYIHJr0STf072Tu0Vmge35+/Abik9bYmjEWGArPjnqdXUqZ/0XCCqhq8UbpB6zju72007hK6IyiCKq1G7M3Qw2KcABAA5mndj8XbNG0Tmp7rBE0E7krQrnxsBF8BLJLtpcRBCUokRqRU4888SvUYf/MJ0+oI05LCtCp8XphWi3x1PSffyY8wLdhKLU8kP2Tdnnk3f6kkL0yrmuKfqUJKiU90d/+h9qGc4gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 55:
/*!**********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_meituan.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAACXBIWXMAAAsSAAALEgHS3X78AAABzUlEQVQ4jaWTzWsTURTFf++9aaptalJTaEXBakEIajvgQlxIs3JdlO6E9J9wbSpuXbhz56x00YVuxKUpBevCRVukOyFFxAqNjt9JM5Mrb5pJx0mEQA9ceO+ce877gIuIJKskIs9FpCb9UevopaQvGeD1tf0fXjqk0q813H0mYf1VD59AJQ7Ji4jfI4tI4yVRtbbKPVoH1pfXgAvkSEB+bxC+zWNOgBkD+f6CcLMIXzwI/WSr9blavq0vyNcqBAmxWUMNT6MMKAe0s8fT6k12tx8g78aRD0uwX4u7SyrYWqy2P6/Mx4wan0dlz6Nzs0jgI3seNHf4k7nOqF7rnnPv4QVu31lhpji77JCC+KvQeEPbf/yPcDxYg5FTEHyK9teuZpg8fTZaH4QoMCcL0VL26/Y9SAvU0GGIOjYHhSVU1o32Ny65YHKHIUrbqttO2i37dwUIf+JMNVETZfSZCgxPpy/dRRQiIbQ+QvtHA2QUna2jp4roy09QI26PKQ3NUGE9uk0GTAHMxC/MuTLOldcDBQBVG/IozZqLHjj5QQIsNrSZub+jJxdXY0aNzQ1qtlgG/O4ABpu3toP3d480gHEtdEa97yx1eKvbvgOPCH8BL+rZ0INldqsAAAAASUVORK5CYII="

/***/ }),

/***/ 66:
/*!********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_setUp.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABOUlEQVQYGQXBz0tTAQAA4G97Ht62d9L98JlDEqlbMUnTBUKG4iEEFaRILIQyCcJLQQx2KqgwF8rYDqEbW+1N81rgX+f3AeRt6Ppq1gM/nHlqFIDAHTUDDee6un75KfHRtAAoaetZljdlxRNlBWsSDXkg1vFaCEIhiBxqK0HGnKE1aRmzXnjuntCIDb9VhOzpORLL2jXU1JLYFio71bHDtbqywKIrOyaV7blUEbjti/8MVJBz4EQMJrXsyqBqyB/3EXmnoQhiTa9k8NCAax+MS1tyZVNJ7Jm/5qXdUvOP9wY+K4rsu3Ss4cJLWbHv+vaJVF1YkRJZcuCtRVkj1iXm5CDW8UaIlJysFCKHWopAQVPPY2MmVC2YkLdq6NgYELirLvFNW19fy5HEJzMCAAq29J1Y8Ehbz7pR4AZYKEdjoXT3JAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 67:
/*!*****************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_my.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAABDCAMAAAAYlP1qAAAAnFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+TINBkAAAANHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzJL4wIgAABHxJREFUWMOdV+t2sjoQ5Q4WL5XWKvqhKFZAICST93+3MwGKCgmudeaPLGEnk7ns2dG0V9O971NK2dBolZ62vqlNmxHcCAUuMaB1EXmTYHNbdlBgtDf2txzLlhNg/bsCASRlnkRhb3GSFa1HkC/UaC8DDiQ9rD3HMo3eTMt2V9v4TvDtr6Pc+qfmLA0caXAMywkSCvWXrkBbMYP0Q1cfzD0zdlQF3s6g3hpTUV0T+LUV75yCk9VkTrySF87/RrslLx2l5/yN5ysCmcpz6wJwtaeK6chYbCkzRjn5nEDP7kB/lDn5KDlc1JubEYPyQ/kaXef1j+rkelABiyb67LPicJ8rXi5ygMKfOJh1Yhyu8j6cXYHTcDIlM+wTdpKldJaIhZ3JchBn4zQaRU5fXNl0f7attCWc1yMSmaNPvAr0N2jNimokkWT2uuaOIjVkC+MdWrMFHJKXkjI2+B+nRei9hVthxeigYt2ECmKjt0/l9lbHKmZwOgxLyt3nteC8MlTU4uxcnNw2wuZ4B8PbZGL/+iTzXl/cGJbpRFR1LxR8PYzoXx2iX5/T6VxeRezHcFGHUG06j/Uhrxp265QXCVoewj1Rh0UPDrL45QPzkK5buLWtBNwbdC7W4VJ/dCrLFs/pJnDpCsDcIJxF1kt1486rlz6Hm/cAV9CjxVKckycWwM7CM+tPq5Wi1ewncPmocSuiyAL+c1fTg/lSmehex68NuA9Jw9xnxtnZemKUQee2+y3/nh4hacy/AyedM4KIq2GiGxAevf0d9LWB4xJu7X6riktmm4Cxk4sTXVJcDlZH/a23FA+lhOwEvL5WQGWF/Ul4mwWvAPlYNTYlAJBIxmX2Dbigdv275mStYKkaWVQ6eXSkC4o5FyM/Hy6v246wrxpP1zyN9IRXNHmSOa4HaSlMdARpnvJ/AxesBF33tYCMh495Hkm2chB3I8SJ+aXt6/HIN3YEWuPdLx0JjhXu+k87Ul66I4bbXBK0FCsyFQ+XnScRISzWcEZIpIhuCVsTTEfzZMhkCty0FCBVjewlolXa0kZgpmFzJqOUmv5KGMak3jdP89EGGHQF2tgVRBgyONTNUzWSFD06H70ZZ6wadoqdC7QoWHeklR97N0qbkNHeKN0wapixaqQ1jP7c9IwSexcsR+eeV5wetbDuOlUq7lCBCY09fi8Iog4FLbHYVKMVGTNjxpGQPDx96avRCuHqY+/nnqAWrlJhanSDEq2JtNayp+LccqGOjF2t+sExk30zL3klXXeGee6my0rMtasMbu6L2FYIP6hW3YAUQ/m2lCgS07FkUxx3fgwfJ2kVifdWjjUKpFEQkDjPKhJXSzfeu5um6W1ToV5eJoR3bgRRnR/XrqXSVIblro+tchpIH3t3Z81NkxRJGMxdx3q6DJqW5bjzIEwK0n50/xnE0viIStpddkmF99DL8XEPvSR5Wf3djWkZfYzdM/1DTvrrLjxdghn0/zKSHxTXcNNZH35LUj++frp+A6tJ+XtYOxOBNR0/2Me3jAzu/iS7xfvAH0L/AzTsyzXtlFJpAAAAAElFTkSuQmCC"

/***/ }),

/***/ 68:
/*!**********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/merchants_id.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUAAABVY+1VY+5VY+5VY+1VY+1ZaPBfX+FVY+5VY+1VZO1UY/BVY+5VYu1UY+1VY+1VY+1WY+5VY+1VY+1UY+5VY+1VYuxVY+1UZe5VY+1VY+1VY+1WY+1XZexVZe9UY+1VY+5UYu5VY+5VZO0/lhpRAAAAJHRSTlMA0mnM7pwQCHVvRyHAvWJcRBbq15B8TsQd9uO5gzUwKqKUhFRPgik/AAAAmUlEQVQY001O2xaDIAxLARUQRFCZ17nL///jjiLb+tIkTdvgqHEwXWelx1WD4C/nVh5Y4g8RE3iLPs3rbN0nBtRTC417w5oRiMJjvaHsqsL0T9oALnFTKHlVOMAtgLSg9hQY4KmEpj+hpgotwX5X5AIoDpmPFvMGxAY+5Lc5DvsFq/ez9UEnHgW7PLNRWisTVLZ6aYnsMB74A01AB5C+0qfsAAAAAElFTkSuQmCC"

/***/ }),

/***/ 69:
/*!**************************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/merchants_center.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAMAAADH72RtAAAAM1BMVEUAAABWZO1UZOtVY+5VY+1YYO9VZe9VY+1VYuxVY+1VY+5WZO1UYu1QYO9VY+1WY+xVY+25nDHrAAAAEHRSTlMAgEC/7yAwz2Dfr49wEJ9QnlPr0QAAAGhJREFUGNONzjkSwyAUBNEG/sIqcf/TGrnKhlAv6GCiASxuPJqkP3eWomweQYXD1eFOHHKFEMjzR61AujnJQJRTitQGXXxgIraiqLsXq5JmznMFuL5PNY4n3YDJIYSXS2lhEwM0HCJ8AOdCAyfbTU3yAAAAAElFTkSuQmCC"

/***/ }),

/***/ 70:
/*!***********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_feedback.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBklEQVQ4T6XTT0gUURwH8O/vvRmzYMNmUg9BRVRE1qGC0rIO3bp0SGY9Vju1nRQPnaTAU4cuUYGB7GxCB3FnCVuIIC/uwVPXpIN4SzLd2VZbonbmzS9makNtbYXe8f3e+/D78x6l06xXQi8dMp0WDEKDxQRi0Lu8Y4zWw/23V46qUAxTMuVlmXCeADdkBI0AAFIA73NZMxfFr6UqhySpWYDyZNneJyFl7+RY28IWlzdsWze94xCYBuC6jjlEll2e16TWMzG2u9QM6LfLJ0JwEaBnrmPci87/Asjvnch0fv4X0JcuHROKZgkYzTnmfetW6TJWzeIG4GpqJSFCTeotzH6NqHKwrTozQkHS/nKJET5hwuN8xnxu2cuHAfkWkk7FgN4izvrfpQaqvQaQAIERTURgxM2Yk5ZdniJwMeeYj6Is+24sHxFCFqBRdwwEeu2C5nV6KrF6gMKarJfiC1oqZNu/XhngHW+e0o/6fgxI+QqSemIAKrjojncsNWvilkA0hSqq33aq1gEG72JGuAmTRDzvOntf/ClhfQaBr3WzUEqX6gExtW7O5PdL/JB3jIcNge2McT36Vw/+E/AWfCXOTI3vqWy3iVa6vB+Kp30lzkV/YZGBIVozXnZ1gefmGv/ICI/iM4Do+OjdYaZBrBknKWmXrjPoLhiL8QNqvgSAfeBw2M22F34CsfHzWHcIM+sAAAAASUVORK5CYII="

/***/ }),

/***/ 71:
/*!*********************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_manual.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOBAMAAADUAYG5AAAAJ1BMVEUAAABWZO1VZOxQYO9VY+5UYu1UZOtVY+1UY+1VY+1VYuxWY+xVY+0NHSMGAAAADHRSTlMAgMAQsHBA0KCQYFBe0on2AAAAVElEQVQI12MwPwMGxQwiDGDgyCDopAQEKoIMIj6CQHDEEahmJQPDLKAaBp49AaynDzAAGawn5wSAGTFnzhwFM8wy2pJxiDAwCjBAGMwGEAbIzgMMAJ71IrwZGs9KAAAAAElFTkSuQmCC"

/***/ }),

/***/ 88:
/*!*******************************************************************!*\
  !*** D:/projrct/dingdanbao/dingdanbao/static/image/icon_logo.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAC91BMVEV4guolMrCaqOOJlOZCTcJKVspLVcEvPLdDUcpcZs1UXsc3RL5ueeNga9lmcNRHUr2DjOh9h+d5guFnct9wettsddhSXc9lbcshLq51ft5bZdZWYtKepvCPmO2OlexaZMRsdcqRmu9KVb2Ciuw0P7aHj+19h+mUm+7////S1viytuP3+f/7/v9JVL/6+//y9v+Ci+dTXceGj+tPWcVLVcO5yv5kbtNaZctXYsn09/+9xfels/fKzvJdaM9FUL3zwADv8//P0vaWovKQm/GMmPFzfd1pdNZvedpmcNVha87D1P+qufquvPmhrfSDjOtPXND1zSXzyhvo7P68zP6otfeHku++w+t7hOJ1f+Frddg3Qrn20TTGyu99h+lZZNglMLH76qX0xgjY4//A0P+3x/22vvZga9JYY9D53WjxtgCzxP26vuf++t1sdt1xfNpCTLz2yxLp8f/d5//x9P6xwfudqvWcpvBhbNhtds4vOrb54nz311Di7P/J2f///vrDx+tteOKBi+Cil4j544XR3//h5fvY3ft2guqPmud6hd2NlNhVX8o6Rb766Jn42l3QskL/1wP1/v/H0Pvm6fpvf/rFyvZTZfSxufPQ0/H++ub99dJJVcv98sRVX8NBTcM9R7r87a/65pCrm2zFsWr521X31Uf41T7duzX90gtkdv7Z3PRicvKqse/Dx+1teedOXd9lcN4/T9hydK5qbKuunnn54HTDqlHsxyTu+f9Ua//Q1vvr7Pni5PdNX+5yfepgbumYoug9UOhfauB3ftH888qIjMqNjbr877mKh6WfmJ+ZjoWhk3fLslXVuErYuD///fOpsOhWZeOfpeGBideBhMRdZLlzd7iJgoi9rn65p3O/qmDivy94g/Gxueyssd93gdo1R9qPjrCZlq8FCp2Df5qyo4T12nS0n2D20hHs7/0uRO0lM7oXJKunn5b/9WaVi2OejEPjxDnnwiz/4QDc3Nnm5djGx8t4fsieoMLOy8HVypGBel7fswPf4WFMAAAAKHRSTlPz8wH+8/Ly8v7y8vLy8vLE8vLy8vLy8vf08vLyZsvEZ2XV09LRwsJr3fOfewAACA9JREFUWMPtl3VUWlEYwN1Yd3fn3UCEAYIwRAkRExCGwihxog4Uu501c8Z0Ycxttuvu7u7u7u78Y/chLnTuLP7ZOdvvcC7nPM73e/e7fPe775k1bdp0UMeWRtoaaVZLcxM9IH379u3Tp097I10R2hkZ0Q8GQ0FHZcTlibWM+8ykSZMWGRlfy9gv2JqYHrZ4OBTA+EngN0nZ3L+p2aCHBeC3mby4n9mwCPAHOA816zX6TwS2ZmZNJv6JYBQUjP4v+CcEGAT4Hey5Pm/9vV8XYLBYNBoNhBrHUCZLLFr7myl4OtIcHWnOYaEOU39LEOQYEuIEBc5MJvXebwiwJL8Qt1i/0NDQMNYYF+H3BJipEExjAqGflyYsM82NxmSx2Zsn1BfMVYGdt5OSkm7PAhBVEkAoLIqD4074G8TTz82BcEPq6ZlHFTFTWfUFWfwjRdE+Pj7ROwGEkQ2HOCBQx8UVFQlklYg10I/kEHEDHxQUExgYlDf9W8HMIxVVFUlJWUnQUFUZXcmozI7mFwFGBUhiqNUCNeKjOpC8QtLygpI9PYMC0aCeoLA0ysDnMxiV0dk+UaUM2SyVr6FwlZqvk/noZLI9OgAyIp2TNX4OmlhPKIiJQTdYxAofEOWrAghFvllA5bunUK2O0hlkpfwqeG200pqY4OTgR3OKjYkJihFiGgjUOp3vKhB9BF7hM44AvjoOzGLAj8qHL1PphNIACp5IThDFkmgTgtbG2DSog52CuQzf7CjoAHN9o0GhbxQApXwQzQdRPgyDzkVZgqeQKQR6grNjaKiTsH4lUl89q4qqzFLtyY4GQOY7F6xSw1+y1XMNq1SGKoYucE4AgUK3tPP3t/NHMcW0jRPHT/5a0Pbt2acfK/bMVZVWCLKKGII4wOcnyQT87ChG6SoZn/H48gMigcKz87+SniBxd3dfOHYcNxzzlaDV3vIPT59VVMlkVbIsma8PTF2trswqhMs6Kw74MB6joAAPc+BpXV0V4fEKNjha/PUMWo5+/+TJ66nGHR9XmlWIVt3eiTVW5B446HRghxIKKHResffxS0e3puHkMUcVeV8JelHj3r20sgm2wph2P6jHLqOAnHliI0Cwyl/PZqXO/GoRL4N6FEwcNwliOtRHnYhEBARLK2DCCm4op8DGt/PEh8pI6ZQps2e3KnZ11WrDPcwDoIDnL/m8BSbIWbGe6EYFGTfmzLE2h3fNJNO9Le3t3D0I5sRMe45+u23dvF3EohhMQwEGi7awsLGxjeBF8MgUMp0Hoz24HA4Ox+Fy7Twk8cy6pwIxW0xbj60nMPVfLLwenBLiBztYLY4imsgRDhKue10fyBez2C6bRzWSAtoCa+GAoHEjucU6kEhuXk5QEMLkxodhkP5sYZPCZjHHbAlrvCfG+sFgkhfsQluv+KejaCEiEc0xjBO/EAMztLAAVDZbn7B166X5jQgwnhoSInDT+AcQyd727qEhiMBDYeqFWKaL/aW1a6dOnjnq+wK0MNkLEcSmRxLoHhyOu3uoE03knOZCRQNIsLPYftzatHSUbaA8ePIPBBon6wAKnUDmSORMRxrN2UsjchalTJ7OZEtQgR6wUMIl26fnf0+ATdbA+3s5hEmJZLxSydVT1zOhAMJks1liljN3ZiyRGDlHMkY+M6VzQwEGm0xycyN5aWhScwo5gMhdmpLHDmUymSwIWywWs5emORDwBEtUWiq1QQpINVmhA4WBcLmtdijxRK23YmHQBGodE4xESPE8SzsP/XahsIEAxltYYTG1i1EyBZWAmpBiC+qxwRwur324YuYPzkYsLBjM5AS/5OQ8qhBtZQRdBwjOoHvbJ8DdZfs9AVLPcCKwaDBAaCPMx1jZQIIt6oBTBMAif8Nf/4yE3rBx/vyCgrEFBfPnb9wQjP15QX7B6OMZJyIs6dpMVwStFjkU0lFbj46z3Yj+sWDD+OMneITZSD8j4jO1dLq3t6WlpT3EMjxcoVCE6yVpC8fmf1+AHXs8gjAlUoqEUsjaJUuW0I9t2rTpmP0MyFK9fsGCxRwOR780fKk7aqFtcH3BpIwSaaTUmoAvcV22bZsrecnN5ad7nt67cv/eiJWJKxN3bNFf270jfvG8efNS093jl8bLw6YH150LY8H8jJJIpdScuKx4WTEef7OsbPnp1TlrVityap4Lzs8w1OTWvFl5/rDh3I5b5x5d3zVt3kW5XBIfj1sIm1oKPJkyMqRKqbW5ObF4RfGBFffv3K25e+BmbllO9ZIDdwUHI7YfFqw5eLL6wsFDJ3cfWmM4tGta+fVpchwOJ1+8mTXKtrNZs0jlHHOEqysEq2uql+0vW31geVlu9YXDvPO5LwTHEmtqcs+vrD70XLB738E1gvJ1t3Kvl5+dhsO5jBmTmipGmVkHBFhbWyOCMzk5h18cWFFtWLO8LGf/nTL6/tWJiXtPJyau3Jt47lqiYN+6c7nXdu8+XH5wjUkAQZkNmWMStCLmVN+5cOrMheX7l5/Sblui4Ck2HdsUvn3Glhlb9FsWrDt5csG+W+vWlefuO2vYZRKIxww2GyitE7TKWb3izP0VePgvuCrIWi3PGykDezs7Ow8PPdd/weIrC+alp+7a96j80EW5SeDSD776Sk2CU2dOLVtW4upKoVDIZDKdzuPBeJOAy+X6c5D+mr553rQEOYw3Clz6G1++YRLmEOLVViXwUSLzhwIJJPUizijAuQxoigiaDuzYwkSbWlrX0rNnByPdId0gvXv37oLQuXPnTggDRsLgT4NFadef24l9AAAAAElFTkSuQmCC"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map