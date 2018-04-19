const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPlugin = new HtmlWebpackPlugin({
	title: 'Imitate-Terminal',
	template: path.resolve(__dirname, '../index.html')
});

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../dist/'),
		publicPath: '/'
	},
	plugins: [htmlPlugin]
});