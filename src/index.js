import './css/base.css';
import './css/input.css';

import CreateHTML from 'components/CreateHTML.js';
import Input from 'components/Input.js';

const create_html = new CreateHTML();

const input = new Input({mountTarget: `#${create_html.id}`});

console.log(create_html.height);