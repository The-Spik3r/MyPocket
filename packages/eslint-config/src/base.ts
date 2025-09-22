import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import fileProgress from 'eslint-plugin-file-progress';
import gitignore from 'eslint-config-flat-gitignore';
// @ts-expect-error - Missing types from package
import eslintPluginImportAlias from '@dword-design/eslint-plugin-import-alias';
import { findUpSync } from 'find-up-simple';
import type { Linter } from 'eslint';
import { spawnSync } from 'child_process';
import { basename, join } from 'path';

const CI_environment = Boolean(process.env.CI);

/**
 * Gets ESLint's minimal configuration for the monorepo
 *
 * @param packageName - The name of the current package
 * @param forceCache - Whether to enable ESLint caching for this run (default `true`)
 * @param warningAsErrors - All warnings are treated as errors (default `true`)
 */
export function getBaseConfig(
  packageName: string,
  forceCache = !CI_environment,
  warningAsErrors = true
) {
  const cliOverrides = forceCache || warningAsErrors;

  /**
   * Workaround for implementing https://github.com/eslint/eslint/issues/19015
   * Stops the current process if the necessary flags are provided, and spawn a new one with the appropiate flags
   * inheriting it.
   *
   * This is necessary to have predictable ESLint runs across the board, without having to worry about specifying the
   * correct flags for each monorepo package.
   * We check for eslint directly to avoid messing up with other packages reading this file, like @eslint/config-inspector.
   */
  if (cliOverrides && basename(process.argv[1]) === 'eslint') {
    const newArgs = process.argv.slice(1);

    if (
      forceCache
      && !(newArgs.includes('--cache') && newArgs.includes('--cache-location'))
    ) {
      const cacheLocation = join(
        findUpSync('node_modules', { type: 'directory' }) ?? '',
        '.cache/eslint',
        packageName.replace('/', '_')
      );

      newArgs.push('--cache', '--cache-location', cacheLocation);
      console.log(
        '[@snowball-tools/eslint-config] Force enabling caching for this run'
      );
    }

    if (
      warningAsErrors
      && !newArgs.some(arg => arg.includes('--max-warnings'))
    ) {
      newArgs.push('--max-warnings=0');
      console.log(
        '[@snowball-tools/eslint-config] Force enabling warnings for this run'
      );
    }

    const newArgsArray = Array.from(new Set(newArgs));
    const processArgsArray = Array.from(new Set(process.argv.slice(1)));
    const argsHaveChanged
      = newArgsArray.filter(x => !processArgsArray.includes(x)).length > 0;

    if (argsHaveChanged) {
      console.log();

      const result = spawnSync(process.argv[0], newArgs, {
        stdio: 'inherit',
        maxBuffer: Number.MAX_SAFE_INTEGER
      });

      process.exit(result.status ?? 0);
    }
  }

  return [
    js.configs.recommended,
    {
      languageOptions: {
        globals: {
          ...globals.node
        },
        parserOptions: {
          warnOnUnsupportedTypeScriptVersion: false
        }
      }
    },
    {
      plugins: {
        stylistic: stylistic
      },
      ...(stylistic.configs.customize({
        quotes: 'single',
        semi: true,
        commaDangle: 'never',
        braceStyle: '1tbs',
        arrowParens: false,
        blockSpacing: true
      }) as Linter.Config),
      name: '(@stylistic) Extended config from plugin'
    },
    {
      rules: {
        'no-empty': ['error', { allowEmptyCatch: true }],
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
        '@stylistic/linebreak-style': ['error', 'unix'],
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/jsx-indent-props': 'off',
        '@stylistic/jsx-closing-bracket-location': 'off'
      }
    },
    {
      ...stylistic.configs['disable-legacy'],
      name: 'Environment config - Disable legacy rules'
    },
    {
      ignores: ['**/.git', ...gitignore().ignores]
    },
    /** File progress plugin */
    {
      name: '(eslint) Linting progress report',
      settings: {
        progress: {
          successMessage: 'Linting done!'
        }
      },
      plugins: {
        'file-progress': fileProgress
      },
      rules: {
        'file-progress/activate': CI_environment ? 0 : 1
      }
    }
  ] satisfies Linter.Config[];
}

/**
 * Forces the module imports to use the @/* aliases. Only to be used
 * in projects that have a bundler or proper module resolution
 * configured.
 */
export function getImportAliasConfig() {
  return [
    {
      name: 'Common rules for all files',
      plugins: {
        '@dword-design/import-alias': eslintPluginImportAlias
      },
      rules: {
        '@dword-design/import-alias/prefer-alias': [
          'error',
          {
            alias: {
              '@/*': './src/*'
            }
          }
        ]
      }
    }
  ] satisfies Linter.Config[];
}

// export function getBaseConfig(packageName: string) {
//   return [
//   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
//   {
//     ignores: ["**/*.config.js", "**/*.config.ts", "vite-env.d.ts", "dist/**"],
//   },
//   {
//     languageOptions: { globals: globals.browser },
//   },
//   js.configs.recommended,
//   eslintPluginPrettierRecommended,
//   {
//     ...turboPlugin.configs["flat/recommended"],
//     rules: {
//       "turbo/no-undeclared-env-vars": "warn",
//     },
//   },
//   {
//     rules: {
//       "no-console": [0],
//     },
//   },
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     ...tseslint.configs.strictTypeChecked,
//   },
//   {
//     files: ["**/*.ts", "**/*.tsx"],
//     ...tseslint.configs.stylisticTypeChecked,
//   },
// ] satisfies Linter.Config[];

// export default config;
