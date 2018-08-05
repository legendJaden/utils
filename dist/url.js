'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /* --------------------------- 链接处理类 ----------------------------- */
  /**
   * 获取链接中指定键名对应的键值 当url不传时取window.location.href
   * @param  {String} name 键名
   * @param  {String} url  链接地址[可不传]
   * @return {String}      键值
   */
  getQueryString: function getQueryString(name, url) {
    var self = this;
    var queryUrl = url || window.location.href;
    queryUrl = queryUrl.indexOf('#') != -1 ? queryUrl.split('#')[0] : queryUrl; // 默认使用当前网址
    var path = window.location.pathname; // 路径地址

    return self.getQueryName(name, queryUrl);
  },
  /**
   * getQueryString方法的正则辅助方法
   * @param  {String} name 键名
   * @param  {String} url  链接地址[可不传]
   * @return {String}      键值
   */
  getQueryName: function getQueryName(name, url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var content = url.replace(/\?/gi, '&');

    var r = content.match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  },
  /**
   * 更新链接中某一键值对的值(当匹配不到时往链接中添加该键值对) 当url不传时取window.location.href
   * @param  {String} name  键名
   * @param  {String} value 键值
   * @param  {String} url   链接地址[可不传]
   * @return {String}       链接地址
   */
  updateQueryString: function updateQueryString(name, value, url) {
    var queryUrl = url || window.location.href;
    var hash = queryUrl.indexOf('#') != -1 ? queryUrl.split('#')[1] : ''; // hash值
    var questionFlag = queryUrl.indexOf('?');
    var paramsString = '';
    if (hash != '') {
      queryUrl = queryUrl.split('#')[0];
      hash = '#' + hash;
    }
    var queryBase = questionFlag == -1 ? queryUrl : queryUrl.split('?')[0];
    if (questionFlag != -1) {
      var paramsArray = queryUrl.split('?')[1].split('&');
      var len = paramsArray.length;
      for (var i = 0; i < len; i++) {
        var k = paramsArray[i].split('=')[0];
        var v = paramsArray[i].split('=')[1];
        if (name == k) {
          paramsArray[i] = k + '=' + value;
        }
      }
      if (queryUrl.split('?')[1].indexOf(name) == -1) {
        // 匹配不到时
        paramsArray.push(name + '=' + value);
      }
      paramsString = '?' + paramsArray.join('&');
    } else {
      paramsString = '?' + name + '=' + value;
    }
    return queryBase + paramsString + hash;
  },
  /**
   * 获取链接的属性
   * @param  {String} url 链接地址
   * @return {Object}     链接的属性值
   */
  parseURL: function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: function () {
        var ret = {},
            seg = a.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i = 0,
            s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split('=');
          ret[s[0]] = s[1];
        }
        return ret;
      }(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    };
  },
  /**
   * 获取url的完整路径
   * @return {String} 完整路径 eg: http://heygeys.cn/test/index.html/#/home => http://heygeys.cn/test/
   */
  getFullPath: function getFullPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    if (webName == '') {
      return window.location.protocol + '//' + window.location.host;
    } else {
      return window.location.protocol + '//' + window.location.host + '/' + webName;
    }
  }
};