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
  },
  /**
   * 截取日期到年月日
   * @param {String} str 时间字符串
   * @return {String}          字符串
   */
  substringDate: function substringDate(str) {
    if (str) {
      return str.substring(0, 10);
    }
  },
  /**
   * 通过 时间字符串 返回这个时间距离当前时间过了多久了
   * eg: 2018-08-28 19:00:00 -> 'xx分钟前'/'xx小时前'/'刚刚'
   * @param {String} timesData 时间字符串
   * @return {String}          字符串
   */
  getPassDateString: function getPassDateString(timesData) {
    var self = this;
    if (!timesData) {
      return timesData;
    }
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(timesData.replace(/-/g, "/")); //将-转化为/，使用new Date
    var dateEnd = new Date(); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var timesString = '';

    if (dayDiff != 0) {
      // timesString = dayDiff + '天之前';
      timesString = self.substringDate(timesData);
    } else if (dayDiff == 0 && hours != 0) {
      timesString = hours + '小时之前';
    } else if (dayDiff == 0 && hours == 0) {
      timesString = minutes + '分钟之前';
      if (minutes == 0) {
        timesString = '刚刚';
      }
    }
    return timesString;
  }
};