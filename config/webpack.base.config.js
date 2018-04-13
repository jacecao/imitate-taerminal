const path = require('path');


const ClearWebpackPlugin = require('clean-webpack-plugin');
let clearOptions = {
	root: path.resolve(__dirname, '../'),
	exclude: [],
	verbose: true,
	dry: false
};
let clear = new ClearWebpackPlugin(['dist'], clearOptions);


module.exports = {
	entry: path.resolve(__dirname, '../src/index.js'),
	plugins: [clear],
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, '../dist/js/')
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
