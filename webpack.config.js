/* global __dirname, require, module */
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, './src'),
	devtool: '#source-map',
	entry: {
		app: './select-item.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'select-item.js',
	},
};