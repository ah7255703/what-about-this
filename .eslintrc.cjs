/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    "@next/next/no-html-link-for-pages": ["off"],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  env: {
    es6: true,
  },
};
