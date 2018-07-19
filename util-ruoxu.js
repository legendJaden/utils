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

        return function() {
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

            timer = setTimeout(function() { // 延迟一段时间执行
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
    ObjectIndexOfArr ({object, key, arr}) {
        for (let i = 0; i < arr.length; i++) {
            if (object[key] === arr[i][key]) {
                return i
            }
        }
    },
	/*截取文字,保留一定位数*/
	splitWords(value, len){
		len = len?len:25
		return value.length < len?value:value.substring(0, len) + '......';
    },
    /*表格合计处理 处理二进制相加问题*/
    tableSummaries(param){
        const { columns, data } = param;
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
    /**
     * 表单验证规则：
     * 1. 在<script>中 import validator from '/path'
     *      将/path替换为此文件相对路径
     *
     * 2. 在js中调用 validator.rule(param)
     *      将rule替换为方法名,param为需要进行验证的对象
     *
     * 3. 运算完后返回布尔值，true为通过，false为不通过
     *
     * 4. 方法名                 与         对应的验证规则如下：
     *      intNum              -----     整数
     *      priceNum            -----     至多两位小数数字（多用于价格和金额）
     *      phone               -----     手机号
     *      email               -----     电子邮箱
     *      confirmPassword     -----     确认密码
     *      digit               -----     保留小数位
     *      amount              -----     金融数字
     *      dateTime            -----     日期时间
     *
     *  **/
    validator : {
        // 整数
        intNum: function (value) {
            let isInt = /^[0-9]*$/;
            return (isInt.test(value));
        },
        // 三位正小数，用于重量
        weightNum: function (value) {
            const isWeight = /^\d+(\.\d{1,3})?$/;
            return (isWeight.test(value));
        },
        // 只允许至多两位小数的数字，一般用于单价和金额
        priceNum: function (value) {
            let isPrice = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            return (isPrice.test(value));
        },
        // 手机号码
        phone: function (value) {
            // let isMobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            let isMobile = /^((1[3-9]{1}[0-9]{1})+\d{8})$/; // 增加了16+ 和 19+ 网段
            return (isMobile.test(value));
        },
        // 电子邮箱
        email: function (value) {
            let isEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            return (isEmail.test(value));
        },
        // 确认密码，需传两个参数
        confirmPassword: function (psw, confirmPsw) {
            return (confirmPsw == psw);
        },
        digit: function (value) {
            if (Number.isNaN(value)) {
                console.log('小数位参数应为数字');
                return false;
            } else if (value < 0 || value > 20) {
                console.log('小数位超过(0~20)限制');
                return false;
            } else {
                return true;
            }
        },
        amount: function (value) {
            // 都转化为字串符先
            var num = String(value);
            // 拆分成数组
            var strArr = num.split("");
            // 判断有没有非数字，"." & ","除外
            var someResult = strArr.some(function (item, index, array) {
                return ( Number.isNaN( Number(item) ) && (item != ".") && (item != ","));
            });
            // 获取字符串点号的位置
            var dotBackIndex = num.lastIndexOf(".");
            var dotFrontIndex = num.indexOf(".");
            // 获取字符串逗号的位置
            var commaBackIndex = num.lastIndexOf(",");

            if (someResult) {
                // 字符串中存在非数字，"e4春5g,s6e.g46g4"
                console.log('存在非数字');
                return false;
            } else {
                if (dotBackIndex == commaBackIndex == -1) {
                    // 既没有点也没有逗号，"1587965"
                    return true;
                } else {
                    if (dotBackIndex != dotFrontIndex) {
                        // 不止一个点，"16475.233.45"
                        console.log('不止一个"."');
                        return false;
                    } else {
                        if (commaBackIndex == -1) {
                            // 只有点没有逗号，"1658.544"，标准数字
                            return true;
                        } else {
                            // 存在逗号的情况，"155,45,456.5111" || "3564,573.387,8688"
                            if ((commaBackIndex > dotBackIndex) && (dotBackIndex != -1)) {
                                // 逗号在点后面"3564,573.387,8688"
                                console.log('逗号在点后面');
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }
            }
        },
        dateTime: function(value) {
            if (new Date(value) == 'Invalid Date') {
                console.log('日期时间格式有误');
                return false;
            } else {
                return true;
            }
        }
    },
    docCookies: {
        getItem: function (sKey) {
          return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
          if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
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
          if (!sKey || !this.hasItem(sKey)) { return false; }
          document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
          return true;
        },
        hasItem: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: /* optional method: you can safely remove it! */ function () {
          let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
          for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
          return aKeys;
        }
    },
    toFinancialNum: function(num, digit = 2) {
        let financialNum;
        // 判断负数
        num = Number(num);
        let negative = Number(num) < 0;
        if (negative) {
            num = -num;
        }
        // 强制转化为字符串
        num = String(num);
    
        // 小数位强制转化为数字
        digit = Number(digit);
        // 去除逗号再拼接成字符串（没有逗号也不影响）
        num = num.split(",").join("");
    
        // 对标准数字添加逗号的方法，标准数字为"34893664.564784"(至多有一个小数点)
        // 保留小数位，同时可标准化开头为0的数字，toFixed方法返回字符串
        let digNum = Number(num).toFixed(digit);
        // 拆分为数组
        let numArr = digNum.split('');
        // 获取数组长度值和小数点位置
        let numLength = numArr.length;
        let dotIndex = digNum.indexOf(".");
        if (dotIndex == -1) {
            dotIndex = numLength;
        }
        // 计算需添加逗号的数量，规则为从小数点开始往前每三位添加一个逗号
        let commaNum = parseInt((numLength - (numLength - dotIndex) - 1) / 3);
        // 循环次数等于需添加逗号的数量
        for (let i = 1; i <= commaNum; i++) {
            // 从小数点开始往前数，每3位添加一个逗号
            numArr.splice(-(4 * i - 1) - (numLength - dotIndex), 0, ",");
        }
        financialNum = negative? '-' + numArr.join("") : numArr.join("");
    
        return financialNum;
    }
}

export default util
