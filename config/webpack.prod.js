const merge = require('webpack-merge');
// 代码精简插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.base.config.js');

// const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
	// 剔除导入模块中未被使用的代码
		new UglifyJSPlugin({
			sourceMap: true
		})
	]
});