const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.resolve(__dirname, './example');
const DIST = path.resolve(__dirname, './build');

module.exports ={
  resolve: {
    extensions: [
      '*', '.json',
      '.js', '.jsx',
      '.scss', '.sass', '.css'
    ],
    modules: [
      SRC,
      'node_modules'
    ]
  },
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    `${SRC}/example.js`
  ],
  target: 'web',
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'example.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        context: '/',
        postcss: () => [autoprefixer],
      }
    }),
    new CopyWebpackPlugin([{
      context: SRC,
      from: "*.*",
      ignore: "example.js"
    }])
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap'] }
    ]
  }
};
