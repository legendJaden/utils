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
		const data = trim(param) // 消除对象所有属性的空格
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

/**
 * 主要用法:
 * https.post(url, param, configs).then(res => {}).catch(err => {})
 * https.get(url, param, configs).then(res => {}).catch(err => {})
 *
 * @param {String} url 请求地址
 * @param {Object} param 请求参数, 直接使用对象即可, 封装方法已帮助JSON.stringify
 * @param {Object} configs 额外配置, 支持axios的所有配置项, 详见axios文档: https://github.com/axios/axios/blob/master/README.md#request-config
 * @return {Promise} 返回Promise链, 用户需自行.then(res => {}).catch(err => {})
 *
 * 备注: 直接then的res为请求响应对象, 后续then需用户自行return res
 * */

