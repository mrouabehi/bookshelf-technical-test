module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "indent": ["error", 4],
    "quotes": ['error', 'single'],
    "semi": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-trailing-spaces": ["error", { "ignoreComments": true }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "max-params": ["error", 5],
    "max-depth": ["error", 4],
    "max-lines-per-function": ["error", { max: 25, skipComments: true, skipBlankLines: true }],
    "object-curly-spacing": ["error", "always"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"]
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.database.repository.ts'],
      rules: {
        "max-lines-per-function": "off",
      }
    }
  ]
};
