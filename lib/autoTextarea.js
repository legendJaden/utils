let utils = {


	/**
	 * 文本框根据输入内容自适应高度
	 * @param                {HTMLElement}            输入框元素
	 * @param                {Number}                设置最大高度(可选)
	 * @param                {Number}                设置光标与输入框保持的距离(默认0)

	 */
	autoTextarea(elem, maxHeight, extra) {
		extra = extra || 0
		var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
			isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),

			addEvent = function (type, callback) { //给当前节点添加监听事件
				elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback)
			},

			getStyle = elem.currentStyle ? function (name) {
				var val = elem.currentStyle[name]
				if (name === 'height' && val.search(/px/i) !== 1) {
					var rect = elem.getBoundingClientRect()
					return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px'
				}

				return val
			} : function (name) {

				return getComputedStyle(elem, null)[name]
			},

			minHeight = parseFloat(getStyle('height'))
		elem.style.resize = 'none'//不允许拖拽元素

		var change = function () {
			var scrollTop, height, padding = 0, style = elem.style

			if (elem._length === elem.value.length) return
			elem._length = elem.value.length

			if (!isFirefox && !isOpera) {
				padding = parseFloat(getStyle('paddingTop')) + parseFloat(getStyle('paddingBottom'))
			}

			scrollTop = document.body.scrollTop || document.documentElement.scrollTop

			elem.style.height = minHeight + 'px'


			if (elem.scrollHeight > minHeight) {
				if (maxHeight && elem.scrollHeight > maxHeight) {//若设置了参数：maxHeight
					height = maxHeight - padding
					style.overflowY = 'auto'
				}
				else {
					height = elem.scrollHeight - padding
					style.overflowY = 'hidden'
				}

				style.height = height + extra + 'px'   //extra 光标与输入框保持的距离
				scrollTop += parseInt(style.height) - elem.currHeight
				document.body.scrollTop = scrollTop
				document.documentElement.scrollTop = scrollTop
				elem.currHeight = parseInt(style.height)
			}

		}

		addEvent('propertychange', change)
		addEvent('input', change)
		addEvent('focus', change)
		change()
	}
}
export default utils
