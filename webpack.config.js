const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname, './lib'),
  entry: './select-item.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'select-item.js',
    libraryTarget: 'umd',
    library: 'select-item'
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devServer: {
    hot: true,
    open: true,
    contentBase: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      children: false,
      async: true,
      minChunks: 2
    })
  ]
};
