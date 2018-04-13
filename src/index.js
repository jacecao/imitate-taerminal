import './css/index.css';

import createHTML from 'components/createHTML.js';
import stylePrint from 'components/stylePrint.js';

const init = async function () {
  let id = await createHTML();
  stylePrint(0,id);
}

init();