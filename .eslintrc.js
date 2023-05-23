module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: ['vue', '@typescript-eslint', 'uniapp'],
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  globals: {
    uni: true,
    wx: true
  }
}
