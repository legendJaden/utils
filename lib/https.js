import axios from 'axios'

// 消除空格
function trim(param) {
	for (let k in param) {
		if (typeof param[k] === 'string') {
			param[k] = param[k].trim();
		}
	}
	return param;
}

class Https {
	constructor() {
		this.request = this.request.bind(this)
	}
	request = (method = 'post', url, param, configs) => {
		// 格式化请求数据
		const data = JSON.stringify(trim(param)) // 消除对象所有属性的空格

		// 返回请求结果
		return axios({
			url, // 请求链接
			method, // 方法, 默认post
			data, // 格式化后的参数
			...configs // 其他参数
		});
	}
}

export default Https;
