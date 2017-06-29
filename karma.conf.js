module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [ 'mocha', 'chai' ],
    files: [
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*spec.js': [ 'webpack' ]
    },
    webpack: {
      entry: './src/select-item.js',
      output: {
        libraryTarget: 'umd',
        library: 'select-item'
      },
      module: {
        rules: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: [ 'node_modules' ],
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
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    reporters: [ 'progress' ],
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: true,
    browsers: [ 'Firefox' ], // 'PhantomJS','Chrome','Firefox','Safari'
    captureTimeout: 60000,
    plugins: [
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-firefox-launcher"),
      require("karma-webpack")
    ]
  });
};
