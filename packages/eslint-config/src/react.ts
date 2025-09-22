import type { Linter } from 'eslint';
// @ts-expect-error - Missing types from package
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export function getReactConfig() {
  return [
    reactRefresh.default.configs.recommended,
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      settings: { react: { version: '19.0.0' } },
      plugins: {
        react,
        'react-hooks': reactHooks
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true }
        ],
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules
      }
    }
  ] satisfies Linter.Config[];
}
