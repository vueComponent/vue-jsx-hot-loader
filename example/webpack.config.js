const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: resolve(__dirname, './index.js'),
  },
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
          'vue-jsx-hot-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  resolveLoader: {
    alias: {
      'vue-jsx-hot-loader': require.resolve('../'),
    },
  },
  devtool: 'inline-source-map',
};
