const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './service/src/app.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.join(__dirname, '../build/service'),
    publicPath: '/',
    filename: 'service.js',
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
