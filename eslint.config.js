import nextVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist', '.next/**', 'out/**', 'build/**']
  },
  nextVitals,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        globals: {
            ...globals.browser,
        }
    },
    rules: {
      // Custom rules from the original .eslintrc.js
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
    }
  }
);
