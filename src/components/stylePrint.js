import touchBottom from './touchBottom.js';

import config from './config.js';
import styles from '../data/style.js';

const stylePrint = (num, id) => {

  let _class = `#${id} .styles-wrap`;
  const ele_styles_wrap = document.querySelector(_class);

  let ele_style = ele_styles_wrap.querySelector('style');
  let ele_style_pre = ele_styles_wrap.querySelector('pre');

  let style = styles[num];

  let length = styles.filter((item, i) => {
      return i <= num;
   }).reduce((result, item) => {
    result += item.length;
    return result;
   }, 0)
  let prevLength = length - style.length;
  console.log(prevLength);
  let currentStyle = '';

  let timer = null;

  clearInterval(timer)
  timer = setInterval(() => {
    let start = currentStyle.length - prevLength;
    let char = style.substring(start, start + 1) || '';
    currentStyle += char;
    if (currentStyle.length === length) {
      clearInterval(timer);
      // callback && callback()
    } else {
      // touchBottom(ele_styles_wrap, ele_style_pre);
      // goBottom($resumeWrap, $resumetag)
      ele_style.innerHTML += char;
      ele_style_pre.innerHTML += char;
      // $stylePre.html(Prism.highlight(currentStyle, Prism.languages.css))
    }
  }, config.DELAY);
}

export default stylePrint;
