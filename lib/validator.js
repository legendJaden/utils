/**
 * 表单验证规则：
 * 1. 在js中调用 validator.rule(param)
 *      将rule替换为方法名,param为需要进行验证的参数
 *
 * 2. 运算完后返回布尔值，true为通过，false为不通过
 *
 * 3. 方法名                 与         对应的验证规则如下：
 *      intNum              -----     整数
 *      priceNum            -----     至多两位小数数字（多用于价格和金额）
 *      phone               -----     手机号
 *      email               -----     电子邮箱
 *      confirmPassword     -----     确认密码
 *      amount              -----     金融数字
 *      dateTime            -----     日期时间
 *
 *  **/
export default {
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
  // 身份证号
  idCard: function (value) {
    let isIdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
    return (isIdCard.test(value));
  },
  // 确认密码，需传两个参数
  confirmPassword: function (psw, confirmPsw) {
    return (confirmPsw == psw);
  },
  // 金融数字
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
  // 日期时间
  dateTime: function(value) {
    if (new Date(value) == 'Invalid Date') {
      console.log('日期时间格式有误');
      return false;
    } else {
      return true;
    }
  }
}