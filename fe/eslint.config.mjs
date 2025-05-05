export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'writable',
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      semi: ['error', 'never'], // Không có dấu chấm phẩy
      'react/jsx-uses-react': 'off', // Không cần với React 17+
      'react/react-in-jsx-scope': 'off', // Với Next.js không cần
    },
  },
]