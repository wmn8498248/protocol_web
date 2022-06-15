// -------------------- 常用数据类型判断 ------------------------------

// 输入任意类型, 判断是否是 array 类型
var isArray = Array.isArray || function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

const boolTag = "[object Boolean]"

function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}

function isBoolean(value) {
  return (
    value === true ||
    value === false ||
    isObjectLike(value) && Object.prototype.toString.call(value) === boolTag
  )
}


// 判断是否为 object 对象
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

function isPromise(e) {
  return !!e && typeof e.then === 'function';
}

function isSymbol(d) {
  return Object.prototype.toString.call(d) === '[object Symbol]';
}

function isFunc(fuc) {
  const t = Object.prototype.toString.call(fuc);
  return t === '[object Function]' || t === '[object AsyncFunction]';
}
// TODO: is empty

function isEmptyObject(obj) {
  if (!isObject(obj)) {
    return false;
  }
  return !Object.keys(obj).length;
}

function canParseJson(string) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return false;
  }
}

function isTelNum(mobile) {
  return mobile && /^1\d{10}$/.test(mobile);
}

// ------------------- 常用设备的系统判断, android or ios ------------

function isIOS() {
  return /iPhone|iTouch|iPad/i.test(navigator.userAgent);
}

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}
export default {
  isArray,
  isObject,
  isString,
  isEmptyObject,
  isSymbol,
  isFunc,
  isPromise,
  canParseJson,
  // -------
  isTelNum,
  // ------
  isIOS,
  isAndroid,
  isBoolean
}