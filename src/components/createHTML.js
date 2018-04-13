import config from './config.js';

const createHTML = (target) => {
	let _target = target || config.eleTarget;
	let id = `print-${Date.now().toString().substring(8)}`;
	let html_str = '<div id="' + id + '">' +
	  '<div class="styles-wrap">' +
	    '<style></style>' +
	    '<pre></pre>' +
	  '</div>' +
	  '<div class="resume-wrap">' +
	    '<div class="resume-tag"></div>' +
	    '<pre class="resume-markdown"></pre>' +
	  '</div>' +
	'</div>';
	
	// let _fram = document.createDocumentFragment();
	// _fram.innerHTML = html_str;

	document.querySelector(_target).innerHTML = html_str;
	
	return Promise.resolve(id);
};

export default createHTML;