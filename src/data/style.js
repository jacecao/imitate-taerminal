let styles = [
  `
/*
* Inspired by http://strml.net/
* 大家好，我是王敏
* 看到首页链接的效果，自己也想实现一个
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
  -webkit-transition: all .3s;
}

/* 文字离边框太近了 */

/* 代码高亮 */

/* 接下来我给自己准备一个编辑器 */
.resume-wrap{
}
/* 好了，我开始写简历了 */
`,
  `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`,
  `
/* 再对 HTML 加点样式 */
.resume-wrap{
  padding: 1.5em;
}
.resume-wrap h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resume-wrap ul,.resume-wrap ol{
  list-style: none;
}
.resume-wrap ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resume-wrap ol {
  counter-reset: section;
}
.resume-wrap ol li::before {
  counter-increment: section;            
  content: counters(section, ".") " ";  
  margin-right: .5em;
}
.resume-wrap blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`
]

export default styles
