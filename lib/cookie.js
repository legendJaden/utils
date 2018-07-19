export default {
  /* --------------------------- cookie处理类 ----------------------------- */
  /**
   * 获取cookie
   * @param  {String} name  cookie名
   * @return {String} value cookie值
   */
  getCookie: function (name) {
    let val = null,
      r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g
    if (document.cookie && document.cookie != '') {
      let h = document.cookie.split(';')
      for (let g = 0; g < h.length; g++) {
        let f = (h[g] || '').replace(r, '')
        if (f.substring(0, name.length + 1) === name + '=') {
          val = decodeURIComponent(f.substring(name.length + 1))
          break
        }
      }
    }
    return val
  },
  /**
   * 设置cookie值
   * @param {String} name cookie名
   * @param {String} val  cookie值
   * @param {String} sec  失效时间
   */
  setCookie: function (name, val, sec) {
    let exp = new Date()
    exp.setTime(exp.getTime() + sec * 1000)
    document.cookie =
      name +
      '=' +
      encodeURIComponent(val) +
      ';expires=' +
      exp.toGMTString() +
      ';path=/;domain=' +
      document.domain
  },
  /**
   * 清除指定cookie
   * @param {String} name cookie名
   * @return {null}      无
   */
  clearCookie: function (name) {
    this.setCookie(name, '', -1)
  },
  /**
   * 清除所有cookie
   * @return {null}      无
   */
  clearAllCookie: function () {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (let i = keys.length; i--;) { document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() }
    }
  },
  // 获取存在localstorage或者cookie中的值
  getValue: function (cl_key) {
    return window.localStorage.getItem(cl_key) || this.getCookie(cl_key)
  },
  // 将值存入storage
  setValue: function (c_name, value) {
    this.setCookie(c_name, value, 365) // 默认365天
    window.localStorage.setItem(c_name, value)
  },
  removeValue: function (key) {
    this.clearCookie(key)
    window.localStorage.removeItem(key)
  },
}