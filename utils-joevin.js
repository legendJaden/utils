/**
 * title:  方法工具包
 * auther: create by marvel on 2017.09.12
 * desc:   通用方法函数工具包
 */

import shareLogo from '../img/wxLogo.jpg'
import wx from 'wx'

let utils = {
  /* --------------------------- 时间处理类 ----------------------------- */
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
    let self = this
    let time = new Date(timestamp)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()
    return (
      y +
      '-' +
      self.add0(m) +
      '-' +
      self.add0(d) +
      ' ' +
      self.add0(hh) +
      ':' +
      self.add0(mm) +
      ':' +
      self.add0(ss)
    )
  },
  /**
   * 时间戳转日期 eg: 1505174400000 => 2017-09-12
   * @param  {String} timestamp 时间戳
   * @return {Object}           时间日期
   */
  formatTimeObj: function (timestamp) {
    let self = this
    let time = new Date(timestamp)
    let obj = {
      y: self.add0(time.getFullYear()),
      m: self.add0(time.getMonth() + 1),
      d: self.add0(time.getDate()),
      hh: self.add0(time.getHours()),
      mm: self.add0(time.getMinutes()),
      ss: self.add0(time.getSeconds())
    }
    return obj
  },
  /**
   * 日期转时间戳 eg: 2017-09-12 => 1505174400000
   * @param  {String} datetime 日期字符串
   * @return {number}          时间戳
   */
  unixTime: function (datetime) {
    let self = this
    let tmp_datetime = ''
    let now = ''
    tmp_datetime = datetime.replace(/:|\/| /g, '-')
    // tmp_datetime = tmp_datetime.replace(/ /g, '-');
    // tmp_datetime = tmp_datetime.replace(/\//g, '-');
    let arr = tmp_datetime.split('-')
    if (datetime.indexOf(':') === -1) {
      now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2]))
    } else {
      now = new Date(
        Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5])
      )
    }

    return parseInt(now.getTime())
  },
  /**
   * 获取当前时间戳
   * @return {number} 时间戳
   */
  getTimestamp: function () {
    return new Date().getTime()
  },
  /**
   * 根据时间戳返回 距离此时间戳还有多少时分秒【倒计时用】
   * @param  {string} timestamp 时间戳
   * @return {object}           时间对象
   */
  getTimeDetailRemain: function (timestamp, nowStamp) {
    const self = this
    const now = nowStamp || self.getTimestamp()
    let date = {
      // dd: '00',
      hh: '00',
      mm: '00',
      ss: '00',
      timeout: true
    }
    if (timestamp < now) {
      return date
    }
    let timeRemain = timestamp - now
    // date.dd = self.add0(Math.floor(timeRemain / (60 * 60 * 24 * 1000)));
    // date.hh = self.add0(Math.floor((timeRemain % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)));
    date.hh = self.add0(Math.floor(timeRemain / (60 * 60 * 1000)))
    date.mm = self.add0(
      Math.floor((timeRemain % (60 * 60 * 1000)) / (60 * 1000))
    )
    date.ss = self.add0(Math.floor((timeRemain % (60 * 1000)) / 1000))
    date.timeout = false
    return date
  },
  /* --------------------------- 链接处理类 ----------------------------- */
  /**
   * 获取链接中指定键名对应的键值 当url不传时取window.location.href
   * @param  {String} name 键名
   * @param  {String} url  链接地址[可不传]
   * @return {String}      键值
   */
  getQueryString: function (name, url) {
    let self = this
    let queryUrl = url || window.location.href
    queryUrl = queryUrl.indexOf('#') != -1 ? queryUrl.split('#')[0] : queryUrl // 默认使用当前网址
    let path = window.location.pathname // 路径地址

    return self.getQueryName(name, queryUrl)
  },
  /**
   * getQueryString方法的正则辅助方法
   * @param  {String} name 键名
   * @param  {String} url  链接地址[可不传]
   * @return {String}      键值
   */
  getQueryName: function (name, url) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let content = url.replace(/\?/gi, '&')

    let r = content.match(reg)
    if (r != null) {
      return decodeURI(r[2])
    } else {
      return null
    }
  },
  /**
   * 更新链接中某一键值对的值(当匹配不到时往链接中添加该键值对) 当url不传时取window.location.href
   * @param  {String} name  键名
   * @param  {String} value 键值
   * @param  {String} url   链接地址[可不传]
   * @return {String}       链接地址
   */
  updateQueryString: function (name, value, url) {
    let queryUrl = url || window.location.href
    let hash = queryUrl.indexOf('#') != -1 ? queryUrl.split('#')[1] : '' // hash值
    let questionFlag = queryUrl.indexOf('?')
    let paramsString = ''
    if (hash != '') {
      queryUrl = queryUrl.split('#')[0]
      hash = '#' + hash
    }
    let queryBase = questionFlag == -1 ? queryUrl : queryUrl.split('?')[0]
    if (questionFlag != -1) {
      let paramsArray = queryUrl.split('?')[1].split('&')
      let len = paramsArray.length
      for (let i = 0; i < len; i++) {
        let k = paramsArray[i].split('=')[0]
        let v = paramsArray[i].split('=')[1]
        if (name == k) {
          paramsArray[i] = k + '=' + value
        }
      }
      if (queryUrl.split('?')[1].indexOf(name) == -1) {
        // 匹配不到时
        paramsArray.push(name + '=' + value)
      }
      paramsString = '?' + paramsArray.join('&')
    } else {
      paramsString = '?' + name + '=' + value
    }
    return queryBase + paramsString + hash
  },
  /**
   * 获取链接的属性
   * @param  {String} url 链接地址
   * @return {Object}     链接的属性值
   */
  parseURL: function (url) {
    var a = document.createElement('a')
    a.href = url
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        var ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          i = 0,
          s
        for (; i < len; i++) {
          if (!seg[i]) {
            continue
          }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    }
  },
  /**
   * 获取url的完整路径
   * @return {String} 完整路径 eg: http://heygeys.cn/test/index.html/#/home => http://heygeys.cn/test/
   */
  getFullPath: function () {
    let pathName = window.location.pathname.substring(1)
    let webName =
      pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'))
    if (webName == '') {
      return window.location.protocol + '//' + window.location.host
    } else {
      return (
        window.location.protocol + '//' + window.location.host + '/' + webName
      )
    }
  },
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
  clearCache: function (self) {
    var storage = window.localStorage
    // 不删除openId 先拿后存
    let openId = storage.getItem('openId')
    storage.clear()
    storage.setItem('openId', openId)
    // 清除cookie
    this.clearCookie('authToken')
    this.clearCookie('cityId')
    this.clearCookie('login.phone')
    self
      .$alert({
        title: '提示',
        content: '商城好像出了点意外,请点击 \'重新进入商城\' 进行购物',
        iconImg: '',
        btn: {
          text: '重新进入商城'
        }
      })
      .then(() => {
        let pro = this.sjConifg();
        if(pro=="https://")
          window.location.href = 'https://shop.ap-ec.cn/hhjhtml/index.html'
        else
          window.location.href = 'http://heyguys.ap88.com/hhjhtml/index.html'
      })
  },
  /* -------------------------- 环境配置类 ---------------------------- */
  //根据测试环境和正式环境配置config
  sjConfig:function () {
    if (/heyguys/.test(window.location))
      return "http://"
    else{
      return "https://"
    }
  },
  /* -------------------------- 微信分享处理类 ---------------------------- */
  /**
   * 初始化请求微信jssdk需要的配置参数
   * @param  {object} vue      vue对象
   * @param  {object} wxParams 分享提示对象
   * @return {null}            无
   */
  wxInit: function (vue, wxParams) {
    const self = this
    let appId = self.getCookie('appId')
    let timestamp = self.getCookie('timestamp')
    let nonceStr = self.getCookie('nonceStr')
    let signature = self.getCookie('signature')
    // cookie中存在则不发起请求
    // if(appId && timestamp && nonceStr && signature){
    //   self.wxConfig(vue, {
    //     appId: appId,
    //     timestamp: timestamp,
    //     nonceStr: nonceStr,
    //     signature: signature
    //   }, wxParams);
    // }else{
    try {
      let url = vue.api.home.getWXConfig
      let params = {
        url: window.location.href.split('#')[0]
      }
      let callback = function (data) {
        if (data.data) {
          // 存到cookie中 两小时内不重复发起请求
          self.setCookie('appId', data.data.appId, 7200)
          self.setCookie('timestamp', data.data.timestamp, 7200)
          self.setCookie('nonceStr', data.data.nonceStr, 7200)
          self.setCookie('signature', data.data.signature, 7200)
          self.wxConfig(vue, data.data, wxParams)
        }
      }
      // 返回一个错误回调
      let error_call_back = function (e, errorCode) {
        console.log('views-home-getWXConfig_' + e)
      }
      vue.ax.postJson(url, params, callback, error_call_back, function () {})
    } catch (e) {
      console.info('views-home-getWXConfig_' + e)
    }
    // }
  },
  wxReset: function (vue) {
    const self = this
    let logo = shareLogo
    self.wxShare(vue, {
      title: '好伙计商城',
      link: self.sjConfig() + window.location.host + '/hhjhtml/index.html#/home_100',
      desc: '餐饮门店标准食材供应服务平台！随叫随到，有品有料！',
      imgUrl: self.sjConfig() + window.location.host + '/hhjhtml/' + logo
    })
  },
  /**
   * 根据签名参数配置jssdk
   * @param  {object} wxObj    微信配置参数
   * @param  {object} wxParams 分享提示对象
   * @return {null}            无
   */
  wxConfig: function (vue, wxObj, wxParams) {
    const self = this
    let logo = shareLogo
    let obj = {
      title: wxParams.title || '好伙计商城',
      link:
        wxParams.link ||
        self.sjConfig() + window.location.host + '/hhjhtml/index.html#/home_100',
      desc:
        wxParams.desc || '餐饮门店标准食材供应服务平台！随叫随到，有品有料！',
      imgUrl:
        wxParams.imgUrl ||
        self.sjConfig() + window.location.host + '/hhjhtml/' + logo
    }
    if (wx) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxObj.appId, // 必填，公众号的唯一标识
        timestamp: wxObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxObj.nonceStr, // 必填，生成签名的随机串
        signature: wxObj.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'hideMenuItems'
          // 'onMenuShareQQ'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

      self.wxShare(vue, obj)

      wx.error(function (res) {
        // alert(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  },
  wxShare: function (vue, params, successCallback, cancelCallback) {
    if (wx) {
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。;
        // alert(JSON.stringify(params))
      // wx.showMenuItems({
      //   menuList: [
      //     'onMenuShareTimeline',
      //     'onMenuShareAppMessage',
      //     "menuItem:favorite",
      //     "menuItem:copyUrl",
      //     "menuItem:openWithSafari"
      //   ] // 要显示的菜单项，所有menu项见附录3
      // });

      wx.hideMenuItems({
        menuList: [
          'menuItem:share:qq',
          'menuItem:share:QZone',
          'menuItem:share:weiboApp'
        ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });

        wx.onMenuShareTimeline({
          title: params.title, // 分享标题
          link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: params.imgUrl, // 分享图标
          success: function () {
            // vue._$toast('分享成功')
            if (successCallback) {
              successCallback()
            }
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // vue._$toast('分享失败')
            if (cancelCallback) {
              cancelCallback()
            }
            // 用户取消分享后执行的回调函数
          }
        })
        wx.onMenuShareAppMessage({
          title: params.title, // 分享标题
          desc: params.desc, // 分享描述
          link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: params.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // window.location.href = "http://yg.ap88.com";
            // vue._$toast('分享成功')
            // 用户确认分享后执行的回调函数
            if (successCallback) {
              successCallback()
            }
          },
          cancel: function () {
            // vue._$toast('分享失败')
            if (cancelCallback) {
              cancelCallback()
            }
            // 用户取消分享后执行的回调函数
          }
        })
        // wx.onMenuShareQQ({
        //   title: params.title, // 分享标题
        //   desc: params.desc, // 分享描述
        //   shareUrl: window.location.host,
        //   link: params.link, // 分享链接
        //   imgUrl: params.imgUrl, // 分享图标
        //   success: function () {
        //     vue._$toast('分享成功')
        //     // 用户确认分享后执行的回调函数
        //   },
        //   cancel: function () {
        //     vue._$toast('分享失败')
        //     // 用户取消分享后执行的回调函数
        //   }
        // })
      })
    }
  },

  /* --------------------------- base64处理类 ----------------------------- */
  /**
   * base64编码
   *
   */
  base64encode: function (str) {
    var keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var output = ''
    var chr1,
      chr2,
      chr3 = ''
    var enc1,
      enc2,
      enc3,
      enc4 = ''
    var i = 0
    var input = this.utf16to8(str)
    do {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output =
        output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4)
      chr1 = chr2 = chr3 = ''
      enc1 = enc2 = enc3 = enc4 = ''
    } while (i < input.length)
    return output
  },
  /*
   * utf16转utf8    和base64转码配合使用
   * */
  utf16to8: function (str) {
    var out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i)
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      }
    }
    return out
  },
  /* --------------------------- 其他 ----------------------------- */
  /**
   * 生成长度限制内的随机字符串
   * @param  {number} len 长度限制
   * @return {String}     随机串
   */
  generateRandomAlphaNum: function (len) {
    var rdmString = ''
    for (
      ;
      rdmString.length < len;
      rdmString += Math.random()
        .toString(36)
        .substr(2)
    );
    return rdmString.substr(0, len)
  },
  /**
   * 过滤字符串函数
   **/
  filterStr: function (str) {
    var pattern = new RegExp(
      '[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？%+_\\s]'
    )
    var specialStr = ''
    for (var i = 0; i < str.length; i++) {
      specialStr += str.substr(i, 1).replace(pattern, '')
    }
    return specialStr
  },
  /* 用正则表达式实现html转码 */
  htmlEncodeByRegExp: function (str) {
    var s = ''
    if (str.length == 0) return ''
    s = str.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/\'/g, '&#39;')
    s = s.replace(/\"/g, '&quot;')
    return s
  },
  /// <summary>获得字符串实际长度，中文2，英文1</summary>
  /// <param name="str">要获得长度的字符串</param>
  GetLength (str) {
    var realLength = 0,
      len = str.length,
      charCode = -1
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) realLength += 1
      else realLength += 2
    }
    return realLength
  },
  /* 用正则表达式实现html解码 */
  htmlDecodeByRegExp: function (str) {
    var s = ''
    if (str.length == 0) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, '\'')
    s = s.replace(/&quot;/g, '"')
    return s
  },
  // 判断json格式
  isJSON: function (key = 'default', json) {
    if (!isNaN(Number(key))) {
      json = json.replace(/\\["\\\/bfnrtu]/g, '')
      json = json.replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        ''
      )
      json = json.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      if (json.length > 0) return /^[,:{}\s]*$/.test(json)
      else return false
    } else {
      return false
    }
  },
  // 数组去重
  unique: function (arr) {
    var result = [],
      hash = {}
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem)
        hash[elem] = true
      }
    }
    return result
  },
  /**
   * 阿里云图格式转换  4钟规格
   * 100*100  商品小图          ?x-oss-process=style/heyguys-equal-100
   * 250*250   商品详情主图         ?x-oss-process=style/heyguys-equal-250
   * 150*150	推荐商品			?x-oss-process=style/heyguys-equal-150
   * 200*200	其他类型				?x-oss-process=style/heyguys-equal-200
   *
   * 图片URL拼接?x-oss-process=style/heyguys-equal-200
      http://heyguys-image.oss-cn-shenzhen.aliyuncs.com/mi.png?x-oss-process=style/heyguys-equal-100
   **/
  imgALiYunTransform (imgUrl, imgParam = 100) {
    let rtSrc = ''
    try {
      if (!imgUrl) throw new Error('图片参数不存在')

      let actUrl = ''

      if (Object.prototype.toString.call(imgUrl) == '[object String]') {
        actUrl = imgUrl
      } else if (Object.prototype.toString.call(imgUrl) == '[object Object]') {
        actUrl = imgUrl.originalUrl || imgUrl.firstCompressionUrl || ''
      }
      switch (imgParam) {
        case 100:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-100'
          break
        case 250:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-250'
          break
        case 150:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-150'
          break
        case 200:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-200'
          break
        case 600:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-600'
          break
        default:
          rtSrc = actUrl + '?x-oss-process=style/heyguys-equal-100'
          break
      }
      return rtSrc
    } catch (e) {
      return rtSrc
    }
  },
  // 通过微信url获取code
  getUrlPar (url) {
    var key, value
    var parArray = {}
    try {
      var str = url || this.getValue('wx_url')
      if (str) {
      var index = str.indexOf('?')
      var parStr = str.substr(index + 1)
      var arr = parStr.split('&')
        for (var i = 0; i < arr.length; i++) {
          var parIndex = arr[i].toString().split('=')
          if (parIndex.length > 0) {
            key = parIndex[0]
            value = parIndex[1] ? parIndex[1] : null
          }
          parArray[key] = value
        }
      }
    } catch (e) {
      console.log('views-util-getUrlPar：' + e)
    }
    return parArray.code || ''
  },isAndroidFn () {
        var userAgentInfo = navigator.userAgent
        var Agents = ['Android', 'SymbianOS', 'Windows Phone']
        var flag = false
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true
            break
          }
        }
        return flag
  },
  /**
   * 0 安卓  1 苹果  2 win phone
   */
  getPhoneSystem () {
    var userAgentInfo = window.navigator.userAgent
    var Agents = ['Android', 'iPhone', 'Windows Phone']
    var flag = 0
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = v
        break
      }
    }
    return flag
  }
}

export default utils
