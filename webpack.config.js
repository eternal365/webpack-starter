const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const filename = (directory, extension) => {
  const filename = isProduction
    ? `[name].[contenthash]${extension}`
    : `[name]${extension}`;

  return path.join(directory, filename);
};

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('scripts', '.js'),
    assetModuleFilename: filename('media', '[ext]'),
    clean: true,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: isProduction ? ['postcss-preset-env'] : [],
          },
        },
      }, {
        loader: 'sass-loader',
      }],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    }, {
      test: /\.(jpg|jpeg|png|svg|webp)$/i,
      type: 'asset/resource',
    }],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['./favicon.ico'],
    }),
    new MiniCssExtractPlugin({
      filename: filename('styles', '.css'),
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Starter',
      filename: 'index.html',
      inject: 'body',
      template: './index.html',
    }),
  ],
  devtool: isDevelopment ? 'source-map' : false,
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    open: true,
  },
};
