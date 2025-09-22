import {
  getBaseConfig,
  getImportAliasConfig,
  getTypeScriptConfig,
} from "@snowball-tools/eslint-config";

export default [
  ...getBaseConfig("api"),
  ...getImportAliasConfig(),
  ...getTypeScriptConfig(),
  {
    rules: {
      "@stylistic/linebreak-style": ["error", "crlf"], // Use CRLF for Windows
    },
  },
];
