import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigAirbnb from 'eslint-config-airbnb'
import globals from 'globals'

export default [
    {
        // Настройки для TypeScript и JSX
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser, // Глобальные переменные браузера
                ...globals.es2021, // Глобальные переменные ES2021
                ...globals.jest, // Глобальные переменные Jest
            },
        },
        plugins: {
            react: eslintPluginReact,
            '@typescript-eslint': eslintPluginTypescript,
            'react-hooks': eslintPluginReactHooks,
            import: eslintPluginImport,
            prettier: eslintPluginPrettier,
            'jsx-a11y': eslintPluginJsxA11y,
        },
        rules: {
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': ['error'],
            'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    ts: 'never',
                    tsx: 'never',
                },
            ],
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': ['error'],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                },
            ],
            'max-len': [
                'warn',
                {
                    code: 100,
                    ignoreComments: true,
                    ignoreUrls: true,
                },
            ],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'import/prefer-default-export': 'off',
            'react/prop-types': 'off',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
            'jsx-a11y/alt-text': 'warn', // Пример правила из eslint-plugin-jsx-a11y
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
            react: {
                version: 'detect',
            },
        },
    },
    eslintConfigPrettier, // Интеграция с Prettier
    eslintConfigAirbnb, // Конфигурация Airbnb
]
