const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    app: './src/index.js',
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
    modules: ['node_modules', 'src'],
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
    path: path.resolve(__dirname, 'dist/calender-my-tasks/client'),
    filename: '[name].bundle.[hash].js',
    pathinfo: true,
    publicPath: '/',
  },
  watchOptions: {
    ignored: /node_modules/,
  },

  devServer: {
    port: 5000,
    contentBase: './dist',
  },
  plugins: [
    // /* Delete Distribution before building it */
    // new CleanWebpackPlugin('dist/calender-my-tasks/client'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: './img' },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    // Code splitting
    new MiniCssExtractPlugin('bundle.[hash].css'),
  ],
};
