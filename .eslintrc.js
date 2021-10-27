// 0 off, 1 warm, 2 error
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'airbnb', // Uses rules from eslint-config-airbnb,
    'plugin:react-hooks/recommended', // Uses rules from eslint-plugin-react-hooks
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  settings: {
    'import/resolver': {
      // To fix Unable to resolve path to module ‘./App’
      // yarn add -D eslint-import-resolver-typescript
      typescript: {},
    },
  },
  rules: {
    // To fix redux toolkit slice error: 'no-param-reassign': 'warn',
    'no-shadow': 1,
    'no-param-reassign': 1,
    'jsx-quotes': 1,
    'no-var': 1,
    'no-trailing-spaces': 1,
    'import/prefer-default-export': 1,
    // To fix error: Missing file extension ‘tsx’ for ‘./App’
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    // https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
    // To fix error: ‘React’ was used before it was defined
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/no-explicit-any': 2,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/display-name': [1, {ignoreTranspilerName: false}],
    'react/forbid-prop-types': [1, {forbid: ['any']}],
    'react/jsx-boolean-value': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-spacing': 1,
    'react/jsx-indent-props': 0,
    'react/jsx-key': 1,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 1,
    'react/jsx-pascal-case': 1,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-multi-comp': 1,
    'react/no-set-state': 0,
    'react/no-unknown-property': 1,
    'react/prefer-es6-class': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/sort-comp': 1,
    'react/jsx-props-no-spreading': 1,
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.ts', '.tsx']}], // To fix error: JSX not allowed in files with extension ‘.tsx’
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
  },
  overrides: [
    {
      files: ['serviceWorker.ts'],
      rules: {
        '@typescript-eslint/no-use-before-define': 1,
      },
    },
  ],
};
