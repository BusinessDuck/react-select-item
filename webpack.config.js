const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const SRC = path.resolve(__dirname, './src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  context: SRC,
  entry: './select-item.js',
  output: {
    path: DIST,
    filename: 'select-item.js',
    libraryTarget: 'umd',
    library: 'select-item'
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')],
            sourceMap: 'inline'
          }
        }, 'resolve-url-loader']
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
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
