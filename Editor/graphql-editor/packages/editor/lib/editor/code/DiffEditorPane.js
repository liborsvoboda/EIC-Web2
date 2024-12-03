"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffEditorPane = void 0;
const react_1 = __importStar(require("react"));
const monaco_1 = require("./monaco");
const containers_1 = require("../../state/containers");
const guild_1 = require("./guild");
const Code_1 = require("./style/Code");
const Models_1 = require("../../Models");
const DiffEditorPane = ({ schema, newSchema }) => {
    const { theme } = (0, containers_1.useTheme)();
    const codeSettings = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, monaco_1.diffEditorSettings), { fontFamily: theme.fontFamily })), []);
    return (react_1.default.createElement(react_1.default.Fragment, null, theme && (react_1.default.createElement(Code_1.CodeContainer, Object.assign({}, (0, Models_1.dataIt)("diffView")),
        react_1.default.createElement(guild_1.SchemaDiffEditor, { height: "100%", beforeMount: (monaco) => monaco.editor.defineTheme("graphql-editor", (0, monaco_1.theme)(theme)), original: newSchema.content, modified: schema.content, theme: "graphql-editor", options: Object.assign(Object.assign({}, codeSettings), { modifiedAriaLabel: schema.name, originalAriaLabel: newSchema.name }) })))));
};
exports.DiffEditorPane = DiffEditorPane;
