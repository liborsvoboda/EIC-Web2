"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
const utils_1 = require("../../../Theming/utils");
const rules = (0, utils_1.themed)(({ text, accent }) => [
    { token: "keyword.gql", foreground: accent.L1 },
    { token: "type.identifier.gql", foreground: accent.L2 },
    { token: "key.identifier.gql", foreground: text.active },
    { token: "keyword", foreground: accent.L1 },
    { token: "annotation", foreground: text.default },
    { token: "", foreground: text.active },
    { token: "string.md", foreground: text.default },
    { token: "keyword.md", foreground: accent.L1, fontStyle: "bold" },
    { token: "string.gql", foreground: text.default },
    { token: "number.gql", foreground: text.contrast },
    { token: "delimiter.square.gql", foreground: accent.L5 },
    { token: "delimiter.curly.gql", foreground: accent.L5 },
    { token: "delimiter.parenthesis.gql", foreground: accent.L5 },
    {
        token: "string.quote.gql",
        foreground: text.default,
    },
    { token: "comment.gql", foreground: text.default },
    {
        token: "operator.gql",
        fontStyle: "bold",
        foreground: accent.L3,
    },
]);
const colors = (0, utils_1.themed)(({ neutrals, text, alert, colors: { scalar } }) => ({
    "editor.foreground": text.active,
    "editor.background": neutrals.L6,
    "minimap.background": neutrals.L6,
    "diffEditor.insertedTextBackground": `${scalar}22`,
    "diffEditor.removedTextBackground": `${alert.error.L3}22`,
}));
exports.theme = (0, utils_1.themed)((theme) => ({
    base: "vs-dark",
    inherit: true,
    rules: rules(theme),
    colors: colors(theme),
}));
