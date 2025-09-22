import { getBaseConfig, getTypeScriptConfig } from './src';

export default [
  ...getBaseConfig('@snowball-tools/eslint-config'),
  ...getTypeScriptConfig()
];
