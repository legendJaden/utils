export default function toFinancialNum(num, digit = 2, symbol = '￥') {
  if (Object.prototype.toString.call(symbol) !== '[object String]') {
    // 判断是否为字符串
    throw new Error('symbol is not a string');
  }
  let financialNum;
  // 强制转化为字符串
  num = String(num);
  // 替换部分格式化字符
  const symbolReg = new RegExp(symbol, 'g');
  num = num.replace(symbolReg, '').replace(/,/g, '').replace(/\.00/, ''); // 部分格式化的金额恢复为无格式字符
  // 判断负数
  let negative = Number(num) < 0;
  if (negative) {
    num = (-Number(num)).toString();
  }

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
  if (dotIndex === -1) {
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

  return symbol + financialNum;
}