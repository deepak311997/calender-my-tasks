const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

console.info('loading webpack production environment - client');

module.exports = (env = {}) => {
  config.mode = 'production';
  config.devtool = 'nosources-source-map';
  config.plugins = [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Code splitting
    new MiniCssExtractPlugin ('bundle.[hash].css'),
  ],
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    output: {
                        beautify: false,
                        comments: false,
                    },
                },
            }),
        ],
    }

  return config;
};
