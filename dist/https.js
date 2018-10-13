'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 消除空格
function trim(param) {
	for (var k in param) {
		if (typeof param[k] === 'string') {
			param[k] = param[k].trim();
		}
	}
	return param;
}

var Https = function () {
	function Https() {
		_classCallCheck(this, Https);

		this.request = this.request.bind(this);
		this.post = this.post.bind(this); // 如果不bind，后面合并axios其他方法时导致 post 丢失不生效
		this.get = this.get.bind(this);
	}

	_createClass(Https, [{
		key: 'request',
		value: function request(url, param) {
			var configs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post';

			// 格式化请求数据
			var data = trim(param); // 消除对象所有属性的空格
			var axiosConfig = _extends({
				url: url, // 请求链接
				method: method, // 方法, 默认post
				data: data }, configs);
			// 返回请求结果
			return (0, _axios2.default)(axiosConfig); // 处理权交给用户
			// .then((res) => {
			// 	return configs.resFn? configs.resFn() : res
			// })
			// .catch((err) => {
			//
			// })
		}
	}, {
		key: 'post',
		value: function post(url, param, configs) {
			return this.request(url, param, configs, 'post');
		}
	}, {
		key: 'get',
		value: function get(url, param, configs) {
			return this.request(url, param, configs, 'get');
		}
	}]);

	return Https;
}();

var https = _extends({}, _axios2.default, new Https()); // 保留axios其他属性

exports.default = https;

/**
 * 主要用法:
 * https.post(url, param, configs).then(res => {}).catch(err => {})
 * https.get(url, param, configs).then(res => {}).catch(err => {})
 *
 * @param {String} url 请求地址
 * @param {Object} param 请求参数, 直接使用对象即可
 * @param {Object} configs 额外配置, 支持axios的所有配置项, 详见axios文档: https://github.com/axios/axios/blob/master/README.md#request-config
 * @return {Promise} 返回Promise链, 用户需自行.then(res => {}).catch(err => {})
 *
 * 此外，还保留axios所有其他属性，例如interceptor拦截器，用法同axios
 *
 * 备注: 直接then的res为请求响应对象, 后续then需用户自行return res
 * */