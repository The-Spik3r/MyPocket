import {
  getBaseConfig,
  getImportAliasConfig,
  getTypeScriptConfig,
  getReactConfig
} from '@snowball-tools/eslint-config';

export default [
  ...getBaseConfig('web'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig(),
  ...getReactConfig()
];
