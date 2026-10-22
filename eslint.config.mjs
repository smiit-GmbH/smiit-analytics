import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Formatting is Prettier's job – turn off every rule that conflicts with it.
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    // Node scripts (media build, test server) report progress on the console.
    files: ["scripts/**", "e2e/**/*.mjs"],
    rules: { "no-console": "off" },
  },
  globalIgnores([".next/**", "out/**", ".archiv/**", "next-env.d.ts"]),
])
