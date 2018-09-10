/**
 * created by wbz20
 * on 2018/9/10
 * */

/**
 * 检测数据类型
 * @param value {any} 任意数据类型
 * @return type {String} 输出结果, 枚举如下:
 * object - 对象
 * string - 字符串
 * array - 数组
 * number - 数字
 * function - 函数
 * boolean - 布尔值
 * date - 日期类型
 * regExp - 正则类型
 * set - set类型
 * map - map类型
 * undefined - undefined
 * null - null
 * NaN - 非数字
 * symbol - 标识符
 * */
export default function detectType(value) {
	let type = 'unknown';
	const ObjectType = Object.prototype.toString.call(value);
	switch (ObjectType) {
		case '[object Object]':
			type = 'object';
			break;
		case '[object String]':
			type = 'string';
			break;
		case '[object Array]':
			type = 'array';
			break;
		case '[object Number]':
			if (Number.isNaN(value)) {
				type = 'NaN';
			}
			type = 'number';
			break;
		case '[object Function]':
			type = 'function';
			break;
		case '[object Boolean]':
			type = 'boolean';
			break;
		case '[object Date]':
			type = 'date';
			break;
		case '[object RegExp]':
			type = 'regExp';
			break;
		case '[object Set]':
			type = 'set';
			break;
		case '[object Map]':
			type = 'map';
			break;
		case '[object Undefined]':
			type = 'undefined';
			break;
		case '[object Null]':
			type = 'null';
			break;
		case '[object Symbol]':
			type = 'symbol';
			break;
		default:
			type = 'unknown';
			break;
	}
	return type;
}
