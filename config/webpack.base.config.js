const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPlugin = new HtmlWebpackPlugin({
	title: 'Echarts-DEMO'
});

const ClearWebpackPlugin = require('clean-webpack-plugin');
let clearOptions = {
	exclude: [],
	verbose: true,
	dry: false
};
let clear = new ClearWebpackPlugin(['dist']);


module.exports = {
	entry: path.resolve(__dirname, '../src/index.js'),
	plugins: [
		clear, 
		htmlPlugin
	],
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, '../dist/')
	},
	resolve: {
	  extensions: ['.js', '.css', '.json'],
	  alias: {
	    'components': path.resolve(__dirname, '../src/components')
	  }
	},
	module: {
		rules: [{
			test:/\.css$/,
			exclude: /node_modules/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {importLoaders: 1}
			}, {
				loader: 'postcss-loader'
			}]
		}]
	}
};
