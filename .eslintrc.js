module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'prettier/prettier': 'off',
    'no-func-assign': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/self-closing-comp': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: true,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
  },
};
