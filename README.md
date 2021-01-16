# @ant-design-vue/vue-jsx-hot-loader

Tweak Vue components written in JSX in real time.

## Usage

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    loaders: [
      // Enable HMR for JSX.
      {
        test: /\.jsx$/,
        use: ["babel-loader", "@ant-design-vue/vue-jsx-hot-loader"],
      },
      // Remember to use babel on the rest of the JS files.
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
```
