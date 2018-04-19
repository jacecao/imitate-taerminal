/*
** 构建输入模块类
** code-by Hiou 2018-4-17
 */

// 内部私有属性名
const _host_name = Symbol();
const _prompt = Symbol();
const _found_html = Symbol();
const _input = Symbol();
const _event = Symbol();
const _mount = Symbol();
const _get_elements = Symbol();
const _input_text = Symbol();
const _className = Symbol();
const _mount_target = Symbol();

const _init = Symbol();

// 默认配置
const config = {
	hostName: 'Terminal-SYS',
	prompt: '$',
	mountTarget: 'body'
};

// 定义 输入组件类
class Input {
	

	constructor (option) {
		if (!option) {
			option = config;
		}
		// 初始显示主机名
		this[_host_name] = option.hostName || config.hostName;
		// 初始命令提示符号
		this[_prompt] = option.prompt || config.mountTarget;
		// 挂载目标
		this[_mount_target] = option.mountTarget || config.mountTarget;
		// 记录当前地址
		this.path = '';
		// 记录当前输入内容
		this[_input_text] = '';
		// 记录当前元素className
		this[_className] = '';
		// 元素是否已经挂载到页面
		this[_mount] = false;

		// 执行初始化类
		this[_init]();

	}

	[_init] () {
		this[_found_html]();
		return this;
	}

	// 创建HTML结构
	[_found_html] () {

		this[_className] = `t-${Date.now().toString().substring(8)}`;

		let _html_str = `
			<p class="terminal-input">
				<span class="terminal-header">[${this[_host_name]}${this.path}]${this[_prompt]}</span>
				<span class="terminal-text"></span>
				<input class="watch-input-hook" type="text" value="" autofocus>
			</p>`;
		let _container = document.createElement('div');
		_container.innerHTML = _html_str;

		let _fram = document.createDocumentFragment();
		_fram.appendChild(_container);

		let _mount_element = document.querySelector(`${this[_mount_target]}`);
		console.log(_mount_element);
		_mount_element.appendChild(_fram);
	}

	// 创建输入对象
	get input () {
		return this[_input_text];
	}
	set input (value) {
		this[_input_text] = value;
		// 更新页面显示数据
	}

	// 获取内部组件元素
	[_get_elements] () {
		this.elements = {
			input_ele: document.querySelector(`.${this[_className]} .watch-input-hook`),
			show_ele: document.querySelector(`.${this[_className]} .terminal-text`)
		};
	}

	// 添加事件
	[_event] () {
		window.addEventListener('click', function () {
			// 输入框始终是焦点
			this.elements.input_ele.focus();
		}, false);
		// 输入框绑定键盘监听
		this.elements.input_ele.addEventListener('keyup', (e) => {
			this.input = e.target.value;
		}, false);
	}

}

export default Input;