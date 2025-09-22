import {
  getBaseConfig,
  getTypeScriptConfig,
  getImportAliasConfig,
  getReactConfig
} from '@snowball-tools/eslint-config';

export default [
  ...getBaseConfig('@snowball-tools/ui'),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig(),
  ...getReactConfig()
];
