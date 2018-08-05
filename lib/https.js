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
		// return (url, param, configs) => {return this.request(url, param, configs, 'post')}
	}

	request(url, param, configs = {}, method = 'post') {
		// 格式化请求数据
		const data = JSON.stringify(trim(param)) // 消除对象所有属性的空格
		const axiosConfig = {
			url, // 请求链接
			method, // 方法, 默认post
			data, // 格式化后的参数
			...configs, // 其他参数
		}
		// 返回请求结果
		return axios(axiosConfig) // 处理权交给用户
			// .then((res) => {
			// 	return configs.resFn? configs.resFn() : res
			// })
			// .catch((err) => {
			//
			// })
	}
	post(url, param, configs) {
		return this.request(url, param, configs, 'post')
	}
  get(url, param, configs) {
    return this.request(url, param, configs, 'get')
  }
}

const https = new Https();

export default https;

