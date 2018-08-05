'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /* --------------------------- cookie处理类 ----------------------------- */
  /**
   * 获取cookie
   * @param  {String} name  cookie名
   * @return {String} value cookie值
   */
  getCookie: function getCookie(name) {
    var val = null,
        r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    if (document.cookie && document.cookie != '') {
      var h = document.cookie.split(';');
      for (var g = 0; g < h.length; g++) {
        var f = (h[g] || '').replace(r, '');
        if (f.substring(0, name.length + 1) === name + '=') {
          val = decodeURIComponent(f.substring(name.length + 1));
          break;
        }
      }
    }
    return val;
  },
  /**
   * 设置cookie值
   * @param {String} name cookie名
   * @param {String} val  cookie值
   * @param {String} sec  失效时间
   */
  setCookie: function setCookie(name, val, sec) {
    var exp = new Date();
    exp.setTime(exp.getTime() + sec * 1000);
    document.cookie = name + '=' + encodeURIComponent(val) + ';expires=' + exp.toGMTString() + ';path=/;domain=' + document.domain;
  },
  /**
   * 清除指定cookie
   * @param {String} name cookie名
   * @return {null}      无
   */
  clearCookie: function clearCookie(name) {
    this.setCookie(name, '', -1);
  },
  /**
   * 清除所有cookie
   * @return {null}      无
   */
  clearAllCookie: function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
      }
    }
  },
  // 获取存在localstorage或者cookie中的值
  getValue: function getValue(cl_key) {
    return window.localStorage.getItem(cl_key) || this.getCookie(cl_key);
  },
  // 将值存入storage
  setValue: function setValue(c_name, value) {
    this.setCookie(c_name, value, 365); // 默认365天
    window.localStorage.setItem(c_name, value);
  },
  removeValue: function removeValue(key) {
    this.clearCookie(key);
    window.localStorage.removeItem(key);
  }
};