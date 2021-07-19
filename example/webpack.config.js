const { resolve: _resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: _resolve(__dirname, './index.js'),
  },
  output: {
    path: _resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
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
    open: false,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  resolveLoader: {
    alias: {
      'vue-jsx-hot-loader': require.resolve('../'),
    },
  },
  devtool: 'eval-source-map',
}
