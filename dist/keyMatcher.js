'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 键值匹配器
 * @param {String} val 待匹配原始值
 * @param {Array} list 匹配枚举对象数组
 * @param {String} key = 'key' 对应输入键的字段名
 * @param {String} name = 'name' 对应输出文字的字段名
 * @return {Object} result = {
 *   name,
 *   info: {},
 * }
 * */
exports.default = function (val, list) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'key';
  var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'name';

  var result = {
    name: val,
    info: {}
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (val === item[key]) {
        result.name = item[name];
        result.info = item.info;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

// list参数示例


var keyValue = [{
  id: 0,
  key: '0',
  name: '待处理',
  info: {
    color: '#ccc'
  }
}, {
  id: 1,
  key: '1',
  name: '处理中',
  info: {
    color: '#00f'
  }
}, {
  id: 2,
  key: '2',
  name: '已审核',
  info: {
    color: '#0f0'
  }
}, {
  id: 3,
  key: '3',
  name: '已驳回',
  info: {
    color: '#f00'
  }
}];