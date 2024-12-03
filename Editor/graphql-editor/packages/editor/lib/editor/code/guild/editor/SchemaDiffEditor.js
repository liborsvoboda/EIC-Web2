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
exports.SchemaDiffEditor = void 0;
const React = __importStar(require("react"));
const react_1 = require("@monaco-editor/react");
const use_schema_services_1 = require("./use-schema-services");
function BaseSchemaDiffEditor(props, ref) {
    const originalSchemaService = (0, use_schema_services_1.useSchemaServices)(Object.assign({}, props));
    const modifiedSchemaService = (0, use_schema_services_1.useSchemaServices)(Object.assign({}, props));
    React.useImperativeHandle(ref, () => ({
        original: originalSchemaService.editorApi,
        modified: originalSchemaService.editorApi,
    }), [
        originalSchemaService.editorRef,
        modifiedSchemaService.editorRef,
        originalSchemaService.languageService,
        modifiedSchemaService.languageService,
    ]);
    return (React.createElement(react_1.DiffEditor, Object.assign({ height: "70vh" }, props, { beforeMount: (monaco) => {
            originalSchemaService.setMonaco(monaco);
            modifiedSchemaService.setMonaco(monaco);
            props.beforeMount && props.beforeMount(monaco);
        }, onMount: (editor, monaco) => {
            originalSchemaService.setEditor(editor.getOriginalEditor());
            modifiedSchemaService.setEditor(editor.getModifiedEditor());
            props.onMount && props.onMount(editor, monaco);
        }, options: Object.assign({ glyphMargin: true, lineNumbersMinChars: 2, minimap: {
                enabled: true,
                size: "fit",
            } }, (props.options || {})), language: "graphql" })));
}
exports.SchemaDiffEditor = React.forwardRef(BaseSchemaDiffEditor);
