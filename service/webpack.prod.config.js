const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.info('loading webpack production environment - server');

module.exports = {
  mode: 'production',
  entry: './service/src/app.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'native-ext-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, '../build/service'),
    publicPath: '/',
    filename: 'service.js',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['node_modules'],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
    ],
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './service/src/config.json', to: '' },
      ],
    })
  ]
};

