const webpack = require('webpack');

const config = require('./webpack.prod.js');

webpack(config, (err, stats) => {
	if (err) {
		throw err;
	}

	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n');

	if (stats.hasErrors()) {
      console.log('  Build failed with errors.\n')
      process.exit(1)
    }
});