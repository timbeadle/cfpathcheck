import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import redos from "eslint-plugin-redos";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends("xo", "plugin:import/recommended")), {
    plugins: {
        import: fixupPluginRules(_import),
        redos,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 2021,
        sourceType: "module",
    },

    rules: {
        "arrow-parens": 0,
        "object-curly-spacing": 0,
        "import/no-unresolved": [2],
        "redos/no-vulnerable": "error",
    },
}, {
    files: ["**/*.spec.js"],

    rules: {
        "redos/no-vulnerable": "off",
    },
}];