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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlSchemaEditor = void 0;
const react_1 = __importStar(require("react"));
const react_2 = __importDefault(require("@monaco-editor/react"));
const containers_1 = require("../../../../state/containers");
const monaco_1 = require("../../monaco");
const use_gql_services_1 = require("./use-gql-services");
function BaseGqlEditor(props) {
    const { languageService, setMonaco, monacoRef, setEditor, editorRef, onValidate, } = (0, use_gql_services_1.useGqlServices)(props);
    (0, react_1.useEffect)(() => {
        if (editorRef)
            editorRef === null || editorRef === void 0 ? void 0 : editorRef.revealPositionInCenter({ column: 0, lineNumber: 0 });
    }, [editorRef]);
    const { theme } = (0, containers_1.useTheme)();
    react_1.default.useEffect(() => {
        if (languageService && props.onLanguageServiceReady) {
            props.onLanguageServiceReady(languageService);
        }
    }, [languageService, props.onLanguageServiceReady]);
    const [onBlurHandler, setOnBlurSubscription] = react_1.default.useState();
    react_1.default.useEffect(() => {
        if (editorRef && props.onBlur) {
            onBlurHandler === null || onBlurHandler === void 0 ? void 0 : onBlurHandler.dispose();
            const subscription = editorRef.onDidBlurEditorText(() => {
                props.onBlur && props.onBlur(editorRef.getValue() || "");
            });
            setOnBlurSubscription(subscription);
        }
    }, [props.onBlur, editorRef]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (theme && ((_a = props.options) === null || _a === void 0 ? void 0 : _a.theme)) {
            monacoRef === null || monacoRef === void 0 ? void 0 : monacoRef.editor.defineTheme((_b = props.options) === null || _b === void 0 ? void 0 : _b.theme, (0, monaco_1.theme)(theme));
        }
    }, [theme, monacoRef]);
    return (react_1.default.createElement(react_2.default, Object.assign({ height: "auto" }, props, { beforeMount: (monaco) => {
            setMonaco(monaco);
            props.beforeMount && props.beforeMount(monaco);
        }, onMount: (editor, monaco) => {
            setEditor(editor);
            props.onMount && props.onMount(editor, monaco);
        }, onValidate: onValidate, onChange: (newValue, ev) => {
            props.onChange && props.onChange(newValue, ev);
            if (newValue) {
                props.setGql(newValue);
            }
        }, options: Object.assign({ glyphMargin: true, lineNumbersMinChars: 2, minimap: {
                enabled: true,
                size: "fit",
            } }, (props.options || {})), language: "graphql", value: props.gql })));
}
exports.GqlSchemaEditor = react_1.default.forwardRef(BaseGqlEditor);
