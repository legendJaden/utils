'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /* --------------------------- 时间处理类 ----------------------------- */
  /**
   * 时间戳处理辅助方法 - 小于10的数字自动在前面加0
   * @param  {number||String} number 数字
   * @return {number||String}        数字
   */
  add0: function add0(number) {
    return number < 10 ? '0' + number : String(number);
  },
  /**
   * 时间戳转日期时间 eg: 1505174400000 => 2017-09-12 14:34:23
   * @param  {String} timestamp 时间戳
   * @return {String}           日期时间
   */
  formatTime: function formatTime(timestamp) {
    var self = this;
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    return y + '-' + self.add0(m) + '-' + self.add0(d) + ' ' + self.add0(hh) + ':' + self.add0(mm) + ':' + self.add0(ss);
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {String}           日期
   */
  formatDate: function formatDate(time) {
    var self = this;
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + self.add0(m) + '-' + self.add0(d);
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {Object}           时间日期
   */
  formatTimeObj: function formatTimeObj(timestamp) {
    var self = this;
    var time = new Date(timestamp);
    var obj = {
      y: self.add0(time.getFullYear()),
      m: self.add0(time.getMonth() + 1),
      d: self.add0(time.getDate()),
      hh: self.add0(time.getHours()),
      mm: self.add0(time.getMinutes()),
      ss: self.add0(time.getSeconds())
    };
    return obj;
  },
  /**
   * 日期转时间戳 eg: 2017-09-12 => 1505174400000
   * @param  {String} datetime 日期字符串
   * @return {number}          时间戳
   */
  unixTime: function unixTime(datetime) {
    var self = this;
    var tmp_datetime = '';
    var now = '';
    tmp_datetime = datetime.replace(/:|\/| /g, '-');
    // tmp_datetime = tmp_datetime.replace(/ /g, '-');
    // tmp_datetime = tmp_datetime.replace(/\//g, '-');
    var arr = tmp_datetime.split('-');
    if (datetime.indexOf(':') === -1) {
      now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2]));
    } else {
      now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    }

    return parseInt(now.getTime());
  },
  /**
   * 获取当前时间戳
   * @return {number} 时间戳
   */
  getTimestamp: function getTimestamp() {
    return new Date().getTime();
  },
  /**
   * 根据时间戳返回 距离此时间戳还有多少时分秒【倒计时用】
   * @param  {string} timestamp 时间戳
   * @return {object}           时间对象
   */
  getTimeDetailRemain: function getTimeDetailRemain(timestamp, nowStamp) {
    var self = this;
    var now = nowStamp || self.getTimestamp();
    var date = {
      // dd: '00',
      hh: '00',
      mm: '00',
      ss: '00',
      timeout: true
    };
    if (timestamp < now) {
      return date;
    }
    var timeRemain = timestamp - now;
    // date.dd = self.add0(Math.floor(timeRemain / (60 * 60 * 24 * 1000)));
    // date.hh = self.add0(Math.floor((timeRemain % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)));
    date.hh = self.add0(Math.floor(timeRemain / (60 * 60 * 1000)));
    date.mm = self.add0(Math.floor(timeRemain % (60 * 60 * 1000) / (60 * 1000)));
    date.ss = self.add0(Math.floor(timeRemain % (60 * 1000) / 1000));
    date.timeout = false;
    return date;
  }
};