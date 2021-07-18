const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, './index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
          'vue-jsx-hot-loader',
        ],
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-transform-typescript'],
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
