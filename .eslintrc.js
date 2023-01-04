module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: false,
          },
        ],
      },
    },
  ],
  // parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    // requireConfigFile: false,
    // babelOptions: {
    //   plugins: ['@babel/plugin-syntax-import-assertions'],
    // },
  },
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-duplicate-imports': 'error',
    'no-console': 'error',
    'no-var': 'error',
    semi: ['error', 'never'],
    'import/no-unresolved': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        // alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
}
