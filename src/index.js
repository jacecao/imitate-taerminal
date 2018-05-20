import './css/base.css';
import './css/input.css';

import CreateHTML from 'components/CreateHTML.js';
import Input from 'components/Input.js';

const view = new CreateHTML();

const terminal_input = new Input({mountTarget: `#${view.id}`});

console.log(view.height);

window.addEventListener('keydown', (e) => {
	if (e.keyCode == 13) {
		view.show(terminal_input.bashStr);
		console.log(terminal_input.input);
	}
});
