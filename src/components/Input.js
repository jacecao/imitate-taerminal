/*
** 构建输入模块类
** code-by Hiou 2018-4-17
*/

// todo? 空格录入限制

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

const _path = Symbol();

const _terminal_index = Symbol();
const _throw_bash = Symbol();

const _init = Symbol();


// key-char
// 需要监听的键盘按键名称和编码
let _key_arr = [
	'Backspce', 8, 'Enter', 13, 
	'ArrowUp', 38, 'ArrowDown', 40, 
	'ArrowRight', 39, 'ArrowLeft', 37
];
const key_set = new Set(_key_arr);

// 默认配置
const config = {
	hostName: 'Terminal-SYS',
	prompt: '$',
	mountTarget: 'body',
	storageSize: 10,  // 设置需要记录历史操作的最大值
	cursorSpace: 10 // 定义光标左右移动值
};

// 模拟光标移动
// @ele_cursor 模拟光标元素
// @ele_input 原始输入框元素（input 元素）
// @direction 光标移动方向
const cursorPosition = function (ele_cursor, ele_input, direction) {
	
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
		this[_path] = '';
		// 记录当前输入内容
		this[_input_text] = new Array();
		// 用于保存当前执行命令的索引
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
				<span class="terminal-header">[${this[_host_name]}${this[_path]}]${this[_prompt]}</span>
				<code class="terminal-text"></code>
				<span class="terminal-cursor">.</span>
				<input class="watch-input-hook" type="text" value="" autofocus>
			</p>`;
		let _container = document.createElement('div');
		_container.className = this[_className];
		_container.innerHTML = _html_str;

		let _fram = document.createDocumentFragment();
		_fram.appendChild(_container);

		let _mount_element = document.querySelector(`${this[_mount_target]}`);
		_mount_element.appendChild(_fram);

		// 获取已经挂载的输入元素
		this[_get_elements]();
		this[_mount] = true;
	}

	// 创建输入对象
	get input () {
		return this[_input_text][ this[_terminal_index] ];
	}
	set input (value) {
		// 更新页面显示数据
		// 首先需要替换非法的字符串
		if (this[_mount]) {
			this.elements.show_ele.innerHTML = value;
		} else {
			console.error('the input class not mount');
		}
		
	}

	// 创建当前执行地址
	get path () {
		return this[_path];
	}
	set path (value) {
		if (this[_mount]) {
			// 重新录入当前路径
			this[_path] = value;
			// 更新页面路径显示
			this.elements.terminal_header.innerHTML = `[${this[_host_name]}${this[_path]}]${this[_prompt]}`;
		} else {
			console.error('the input class not mount');
		}
	}

	// 获取内部组件元素
	[_get_elements] () {
		this.elements = {
			input_ele: document.querySelector(`.${this[_className]} .watch-input-hook`),
			show_ele: document.querySelector(`.${this[_className]} .terminal-text`),
			terminal_header: document.querySelector(`.${this[_className]} .terminal-header`)
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
			// todo 这里应该判断什么时候按键才应该更新显示
			this.input = e.target.value;
		}, false);
		// 监听特殊按键
		this.elements.input_ele.addEventListener('keydown', (e) => {
			// console.log(e.key, e.keyCode);
			if (key_set.has(e.keyCode) || key_set.has(e.key) ) {
				switch (e.keyCode) {
					// 删除按键
					case 8:
						// 需要重新设定光标的位置
						// 让光标的位置始终保持在最末尾
						e.target.selectionStart = e.target.value.length;
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
						// 始终将输入记录索引指向最后一个输入值
						this[_terminal_index] = this[_input_text].length - 1;
						// console.log(this[_input_text]);
						// 需要向外抛出当前的信息
						this[_throw_bash]();
						// 将当前输入环境清空
						e.target.value = '';
						break;
					// 向上按键 
					case 38:
						// 如果当前索引值大于0，那么直接递减索引值
						if (this[_terminal_index] > 0) {
							this[_terminal_index] --;
						} else {
						// 否则将索引值返回到末尾状态	
							this[_terminal_index] = this[_input_text].length - 1;
						}
						// 为什么这里没有将值直接赋值给类的input属性呢
						// 因为在一旦这里赋值给input属性，那么在keyup事件中将重置该属性的值
						// 所以这里我们只需要改变input元素中的值即可,然后通过keyup事件传递给input属性
						e.target.value = this[_input_text][this[_terminal_index]];
						break;
					// 向下按键	
					case 40:
						// 如果当前索引值大于数组索引，那么将索引直接为0
						if (this[_terminal_index] >= this[_input_text].length - 1) {
							this[_terminal_index] = 0;
						} else {
						// 否则将索引值返回到末尾状态	
							this[_terminal_index] ++;
						}
						e.target.value = this[_input_text][this[_terminal_index]];
						break;	
				}
			}
		}, false);
	}

	// 抛出当前回车后执行的信息
	[_throw_bash] () {
		let _html_str = `
			<p class="terminal-input-ed">
				[${this[_host_name]}${this[_path]}]${this[_prompt]} ${this.input}
			</p>`;
		// 创建用于储存回车后需要执行的命令语句
		this.bashStr = _html_str;
		// 当前命令索引需要向前推进一位
		this[_terminal_index] ++;
	}
}

export default Input;