// https://github.com/expo/expo/tree/main/packages/eslint-config-universe
module.exports = {
  extends: [
    "universe",
    "universe/shared/typescript-analysis",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
