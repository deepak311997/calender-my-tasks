const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    app: './client/src/index.js',
    vendor: [
      'axios',
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    modules: ['node_modules', './client/src'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: []
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'resolve-url-loader' }, { loader: 'sass-loader?sourceMap' }],
      },
      { test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/i, loader: 'file-loader?name=img/[name].[ext]' },
    ],
  },

  output: {
    path: path.join(__dirname, '../build/client'),
    filename: '[name].bundle.[hash].js',
    pathinfo: true,
    publicPath: '/',
  },
  watchOptions: {
    ignored: /node_modules/,
  },

  devServer: {
    port: 8000,
    contentBase: './dist',
    proxy: {
      '/api/**': {
        target: 'http://localhost:9091/',
      },
    }
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // Code splitting
    new MiniCssExtractPlugin('bundle.[hash].css'),
  ],
};
