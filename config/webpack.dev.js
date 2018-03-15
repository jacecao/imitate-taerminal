const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.base.config.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, '../dist/')
	}
});