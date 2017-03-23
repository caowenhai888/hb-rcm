'use strict';

// Modules
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var ENV = process.env.NODE_ENV;
var isProd = ENV === 'production';

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];
var outputPath = path.join(__dirname, './dist');

module.exports = function makeWebpackConfig() {
  return {
    entry: isProd ? './src/app/app.js' : [
      './src/app/app.js',
      'webpack-dev-server/client?http://localhost:8080/'
    ],
    output: {
      path: outputPath,
      publicPath: isProd ? '/' : 'http://localhost:8080/',
      filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    },
    devtool: isProd ? 'source-map' : 'eval-source-map',
    module: {
      preLoaders: [],
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }, {
        test: /\.html$/,
        loader: 'raw'
      }, {
        test: /\.scss$/,
        loaders: ["style", "css", 'postcss']
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      }]
    },
    postcss: function plugins(bundler) {
      return [
        require('postcss-import')({
          addDependencyTo: bundler
        }),
        require('precss')(),
        require('autoprefixer')({
          browsers: AUTOPREFIXER_BROWSERS
        })
      ];
    },
    plugins: isProd ? [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new ngAnnotatePlugin({
        add: true
      }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }]),
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          keep_fnames: true
        },
        mangle: false,
      })
    ] : [
      new ngAnnotatePlugin({
        add: true
      }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }]),
      new ExtractTextPlugin('[name].[hash].css')
    ],
    devServer: {
      contentBase: './src/public',
      stats: 'minimal',
      port: 8080,
      inline: true
    }
  };
}();
