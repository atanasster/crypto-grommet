const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
const useAlias = process.env.USE_ALIAS;

let plugins = [
  new CopyWebpackPlugin([{ from: './public' }]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
  }),
];

const loaderOptionsConfig = {};

let alias;
const devConfig = {};
if (env === 'production') {
  loaderOptionsConfig.minimize = true;
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }));
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
  devConfig.devtool = 'cheap-module-source-map';
  devConfig.entry = [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/index.js',
  ];
  devConfig.devServer = {
    compress: true,
    clientLogLevel: 'none',
    contentBase: path.resolve('./dist'),
    publicPath: '/',
    port: 8567,
    quiet: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: true,
  };
}

plugins.push(new webpack.LoaderOptionsPlugin(loaderOptionsConfig));

module.exports = Object.assign({
  devtool: 'hidden-source-map',
  entry: {
    client: './src/index.js',
    server: './server/server.js',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
  },
  resolve: {
    alias,
    extensions: ['.js', '.scss', '.css', '.json'],
  },
  plugins,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}, devConfig);
