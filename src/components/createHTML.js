import config from './config.js';

const _inner_html = Symbol();
const _create_html = Symbol();
const _event = Symbol();
const _init = Symbol();

class CreateHTML {
	constructor () {
		// 记录当前窗口高度
		this.height = null;
		// 执行初始化
		this[_init]();
	}
	// 初始化类
	[_init] () {
		this[_create_html]();
		this[_event]();
	}

	// 构建主题HTML结构
	[_create_html] (target) {
		let _target = target || config.eleTarget;
		let id = `terminal-${Date.now().toString().substring(9)}`;
		let html_str = '<div id="' + id + '">' +
		  '<div class="show-wrap"></div>' +
		'</div>';

		document.querySelector(_target).innerHTML = html_str;
		
		this.id = id;
	}

	// 添加事件监听
	[_event] () {
		// 获取当前窗口的高度
		this.height = document.documentElement.clientHeight;
		// 监听窗口事件
		window.addEventListener('resize', () => {
			this.height = document.documentElement.clientHeight;
		}, false);
	}

	// 设置需要显示的内容
	show (info) {
		document.querySelector(`#${this.id} .show-wrap`).innerHTML += info;
	}

}


export default CreateHTML;