/**
 * 键值匹配器
 * @param {String} val 待匹配原始值
 * @param {Array} list 匹配枚举对象数组
 * @param {String} key = 'key' 对应输入键的字段名
 * @param {String} name = 'name' 对应输出文字的字段名
 * */
export default (val, list, key = 'key', name = 'name') => {
  const result = {
    name: val,
    info: {},
  };
  for (let item of list) {
    if (val === item[key]) {
      result.name = item[name];
      result.info = item.info
    }
  }
  return result;
};

// list参数示例
const keyValue = [
  {
    id: 0,
    key: '0',
    name: '待处理',
    info: {
      color: '#ccc'
    },
  },
  {
    id: 1,
    key: '1',
    name: '处理中',
    info: {
      color: '#00f'
    },
  },
  {
    id: 2,
    key: '2',
    name: '已审核',
    info: {
      color: '#0f0'
    },
  },
  {
    id: 3,
    key: '3',
    name: '已驳回',
    info: {
      color: '#f00'
    },
  },
]