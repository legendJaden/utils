import moment from 'moment-timezone'

const util = {
  /**
   * 获取元素相对于视窗左侧的位置
   * 一般为event.target
   * @param {Dom} element
   * @returns amount px
   */
  getLeft(element) {
    let offsetLeft = element.offsetLeft - element.scrollLeft
    if (element.offsetParent != null) {
      offsetLeft += this.getLeft(element.offsetParent)
    }
    return offsetLeft
  },
  /**
   * 获取元素相对于视窗上方的位置
   * 一般为event.target
   * @param {Dom} element
   * @returns amount px
   */
  getTop(element) {
    // 减去scrollTop 是因为祖先元素有可能会滚动
    let offsetTop = element.offsetTop - element.scrollTop
    while (element.offsetParent != null) {
      element = element.offsetParent
      offsetTop += element.offsetTop - element.scrollTop
    }
    return offsetTop
  },
  formatYMD(time) {
    if (time != null) {
      return time = moment(time).format('YYYY-MM-DD')
    } else {
      return ''
    }
  },
  formatYMDHms(time) {
    if (time != null) {
      return time = moment(time).format('YYYY-MM-DD HH:mm:ss')
    } else {
      return ''
    }
  },
  /**
   * 时间戳处理辅助方法 - 小于10的数字自动在前面加0
   * @param  {number||String} number 数字
   * @return {number||String}        数字
   */
  add0: function (number) {
    return number < 10 ? '0' + number : String(number)
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {String}           时间日期
   */
  formatTime: function (timestamp) {
    let self = this;
    let time = new Date(timestamp);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let hh = time.getHours();
    let mm = time.getMinutes();
    let ss = time.getSeconds();
    return y + '-' + self.add0(m) + '-' + self.add0(d) + ' ' + self.add0(hh) + ':' + self.add0(mm) + ':' + self.add0(ss);
  },
  /**
   * 用新对象的覆盖旧对象原有的属性值，不添加新的属性值
   *
   * @param {any} oldObj
   * @param {any} newObj
   * @returns
   */
  updateObj(oldObj, newObj) {
    for (let key in newObj) {
      if (oldObj.hasOwnProperty(key)) {
        oldObj[key] = newObj[key]
      }
    }
    return oldObj
  },
  throttle(fn, interval) {
    const __self = fn // 保存需要被延迟执行的函数引用
    let timer // 定时器
    let firstTime = true // 是否是第一次调用

    return function () {
      let args = arguments
      let __me = this

      if (firstTime) { // 如果是第一次调用，不需延迟执行
        __self.apply(__me, args)
        firstTime = false
        return firstTime
      }

      if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
        return false
      }

      timer = setTimeout(function () { // 延迟一段时间执行
        clearTimeout(timer)
        timer = null
        __self.apply(__me, args)
      }, interval || 500)
    }
  },
  /**
   * 找出由对象组成的数组里，具有某个属性值的对象的下标
   * @param {String} 对象的属性名
   * @returns 数组下标
   */
  ObjectIndexOfArr({object, key, arr}) {
    for (let i = 0; i < arr.length; i++) {
      if (object[key] === arr[i][key]) {
        return i
      }
    }
  },
  /*截取文字,保留一定位数*/
  splitWords(value, len) {
    len = len ? len : 25
    return value.length < len ? value : value.substring(0, len) + '......';
  },
  /*表格合计处理 处理二进制相加问题*/
  tableSummaries(param) {
    const {columns, data} = param;
    const sums = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '总价';
        return;
      }
      const values = data.map(item => Number(item[column.property]));
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        sums[index] = this.toFinancialNum(sums[index], 2);
      } else {
        sums[index] = '';
      }
    });

    return sums;
  },
  docCookies: {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      let sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    }
  },
}

export default util
