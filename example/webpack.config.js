const path = require("path");

const babelConfig = {
  plugins: ["@vue/babel-plugin-jsx"],
};

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(__dirname, "./index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: babelConfig,
          },
          "vue-jsx-hot-loader",
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
    extensions: [".jsx", ".js"],
  },
  resolveLoader: {
    alias: {
      "vue-jsx-hot-loader": require.resolve("../"),
    },
  },
};
