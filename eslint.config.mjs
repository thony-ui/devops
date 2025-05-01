import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "jest.config.js",
    ]
  },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"],rules: {
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_"
    }]
  } },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
 
]);