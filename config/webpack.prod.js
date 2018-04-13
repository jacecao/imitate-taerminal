const merge = require('webpack-merge');
const path = require('path');
// 代码精简插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPlugin = new HtmlWebpackPlugin({
	title: 'Echarts-DEMO',
	template: path.resolve(__dirname, '../index.html'),
	filename: path.resolve(__dirname, '../dist/index.html')
});

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
	// 剔除导入模块中未被使用的代码
		new UglifyJSPlugin({
			sourceMap: true
		}),
		htmlPlugin
	]
});