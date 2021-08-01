module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2015,
  },
  env: {
    node: true,
    commonjs: true,
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-undef": "off",
  },
};
