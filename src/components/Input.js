/*
** 构建输入模块类
 */
const _host_name = Symbol();
const _prompt = Symbol();
const _found_html = Symbol();
const _input = Symbol();

class Input {
	constructor (option) {
		// 初始显示主机名
		this[_host_name] = option.hostName || 'Terminal-SYS';
		// 初始命令提示符号
		this[_prompt] = option.prompt || '$';
		// 记录当前地址
		this.path = '';
		// 记录当前输入内容
		this[_input_text] = '';
		// 记录当前元素className
		this[_name] = '';
	}

	// 创建HTML结构
	[_found_html](){

		this[_name] = `t-${Date.now().toString().substring(8)}`;

		let _html_str = `
			<p class="terminal-input ${this[_name]}">
				<span class="terminal-header">[${this[_host_name]}${this.path}]${this[_prompt]}</span>
				<span class="terminal-text"></span>
				<input class="watch-input-hook" type="text" value="" autofocus>
			</p>`;
		let _fram = document.createDocumentFragment();
		_fram.innerHTML = html_str;
		return _fram;
	}

	// 创建输入对象
	get input () {
		return this[_input_text];
	}
	set input (value) {
		this[_input_text] = value;
		// 更新页面显示数据
	}
}