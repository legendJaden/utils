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
		// return (url, param, configs) => {return this.request(url, param, configs, 'post')}
	}

	_createClass(Https, [{
		key: 'request',
		value: function request(url, param) {
			var configs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post';

			// 格式化请求数据
			var data = JSON.stringify(trim(param)); // 消除对象所有属性的空格
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

var https = new Https();

exports.default = https;