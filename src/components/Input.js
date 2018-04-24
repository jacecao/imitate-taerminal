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

const _terminal_index = Symbol();

const _init = Symbol();


// key-char
// 需要监听的键盘按键名称和编码
let _key_arr = ['Backspce', 8, 'Enter', 13, 'ArrowUp', 38, 'ArrowDown', 40];
const key_set = new Set(_key_arr);

// 默认配置
const config = {
	hostName: 'Terminal-SYS',
	prompt: '$',
	mountTarget: 'body',
	storageSize: 10  // 设置需要记录历史操作的最大值
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
		this[_prompt] = option.prompt || config.prompt;
		// 挂载目标
		this[_mount_target] = option.mountTarget || config.mountTarget;
		// 记录当前地址
		this.path = '';
		// 记录当前输入内容
		this[_input_text] = new Array();
		this[_terminal_index] = 0;
		// 记录当前元素className
		this[_className] = '';
		// 元素是否已经挂载到页面
		this[_mount] = false;

		// 执行初始化类
		this[_init]();

	}

	[_init] () {
		this[_found_html]();
		this[_event]();
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
		_container.className = this[_className];
		_container.innerHTML = _html_str;

		let _fram = document.createDocumentFragment();
		_fram.appendChild(_container);

		let _mount_element = document.querySelector(`${this[_mount_target]}`);
		_mount_element.appendChild(_fram);

		// 获取挂载元素
		this[_get_elements]();
	}

	// 创建输入对象
	get input () {
		return this[_input_text][_terminal_index];
	}
	set input (value) {
		// 更新页面显示数据
		this.elements.show_ele.innerText = value;
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
		window.addEventListener('click', () => {
			// 输入框始终是焦点
			this.elements.input_ele.focus();
		}, false);
		// 输入框绑定键盘监听
		this.elements.input_ele.addEventListener('keyup', (e) => {
			this.input = e.target.value;
		}, false);
		// 监听特色按键
		this.elements.input_ele.addEventListener('keydown', (e) => {

			// console.log(e.key, e.keyCode);
			if (key_set.has(e.keyCode) || key_set.has(e.key) ) {
				switch (e.keyCode) {
					case 8:
						this.input = e.target.value;
						break;

					case 13: // 回车
						// 检查记录输入命令的个数
						// 如果记录的输入命令大于10个
						// 那么需要删除最后一个值，并在第一个位置追加新值
						if (this[_input_text].length === config.storageSize) {
							this[_input_text].shift();
						}
						this[_input_text].push(e.target.value);
						this[_terminal_index] = this[_input_text].length - 1;
						console.log(this[_input_text]);
						break;

					case 38:
						if (this[_terminal_index] > 0) {
							this[_terminal_index] --;
							this.input = this[_input_text][_terminal_index];
						} else if (this[_input_text].length > 0){
							this.input = this[_input_text][0];
						}
						break;
				}
			}
		}, false);
	}
}

export default Input;