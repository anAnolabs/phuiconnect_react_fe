const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// Babel loader config for RN web
const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js|jsx)$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    // Include react-native modules that need transpilation
    path.resolve(appDirectory, 'node_modules/react-native'),
    path.resolve(appDirectory, 'node_modules/@react-native'),
    path.resolve(appDirectory, 'node_modules/react-native-safe-area-context'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:@react-native/babel-preset'],
      plugins: ['react-native-web'],
    },
  },
};

// Image loader
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),

  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(appDirectory, 'dist'),
    clean: true,
  },

  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration],
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-safe-area-context': 'react-native-web',
      '@react-native-google-signin/google-signin': path.resolve(appDirectory, 'src/stubs/google-signin.stub.js'),
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      '.json',
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'web/index.html'),
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(appDirectory, 'dist'),
    },
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },

  devtool: 'source-map',
};
