import {
  getBaseConfig,
  getImportAliasConfig,
  getTypeScriptConfig
} from '@snowball-tools/eslint-config';

export default [
  ...getBaseConfig('api'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig()
];
