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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompletionItemKind = exports.CompletionItemKind = exports.toCompletion = exports.toMonacoRange = exports.useGqlServices = void 0;
const react_1 = __importDefault(require("react"));
const monaco = __importStar(require("monaco-editor"));
const EnrichedLanguageService_1 = require("./EnrichedLanguageService");
const graphql_editor_worker_1 = require("graphql-editor-worker");
const decorations_1 = require("../../monaco/decorations");
const containers_1 = require("../../../../state/containers");
const graphql_language_service_1 = require("graphql-language-service");
const compileSchema = ({ schema, libraries, }) => {
    return [schema, libraries || ""].join("\n");
};
const useGqlServices = (options = {}) => {
    var _a, _b;
    const [editorRef, setEditor] = react_1.default.useState(null);
    const [internalCodeErrors, setInternalCodeErrors] = react_1.default.useState([]);
    const [decorationIds, setDecorationIds] = react_1.default.useState([]);
    const [monacoRef, setMonaco] = react_1.default.useState(null);
    const { theme } = (0, containers_1.useTheme)();
    const languageService = react_1.default.useMemo(() => options.sharedLanguageService ||
        new EnrichedLanguageService_1.EnrichedLanguageService({
            schemaString: options.schema
                ? compileSchema({
                    libraries: options.schema.libraries,
                    schema: options.schema.code,
                })
                : undefined,
            schemaConfig: {
                buildSchemaOptions: {
                    assumeValid: true,
                    assumeValidSDL: true,
                },
            },
        }), [
        (_a = options.schema) === null || _a === void 0 ? void 0 : _a.libraries,
        (_b = options.schema) === null || _b === void 0 ? void 0 : _b.code,
        options.sharedLanguageService,
    ]);
    react_1.default.useEffect(() => {
        if (monacoRef && editorRef) {
            if (options.keyboardShortcuts) {
                for (const action of options.keyboardShortcuts(editorRef, monacoRef)) {
                    editorRef.addAction(action);
                }
            }
            for (const action of options.actions || []) {
                editorRef.addAction({
                    id: action.id,
                    label: action.label,
                    keybindings: action.keybindings,
                    contextMenuGroupId: action.contextMenuGroupId || "navigation",
                    contextMenuOrder: action.contextMenuOrder,
                    run: (editor) => __awaiter(void 0, void 0, void 0, function* () {
                        const model = editor.getModel();
                        const position = editor.getPosition();
                        if (model && position) {
                            const bridge = yield languageService
                                .buildBridgeForProviders(model, position)
                                .catch(() => {
                            });
                            if (bridge) {
                                action.onRun({ editor: editorRef, monaco: monacoRef, bridge });
                            }
                        }
                    }),
                });
            }
            const handler = languageService.getModelChangeHandler();
            handler(editorRef, monacoRef, options.diagnosticsProviders || [], options.decorationsProviders || []);
            const completionProviderDisposable = monacoRef.languages.registerCompletionItemProvider("graphql", {
                provideCompletionItems: (model, position, _context, _token) => __awaiter(void 0, void 0, void 0, function* () {
                    const bridge = yield languageService
                        .buildBridgeForProviders(model, position)
                        .catch(() => {
                    });
                    if (bridge) {
                        const suggestions = (0, graphql_language_service_1.getAutocompleteSuggestions)(bridge.schema, bridge.document, bridge.position, bridge.token);
                        return {
                            suggestions: suggestions.map((s) => toCompletion(s)),
                        };
                    }
                    return { suggestions: [] };
                }),
            });
            const definitionProviderDisposable = monacoRef.languages.registerDefinitionProvider("graphql", languageService.getDefinitionProvider(options.definitionProviders || []));
            const hoverDisposable = monacoRef.languages.registerHoverProvider("graphql", languageService.getHoverProvider(options.hoverProviders || []));
            return () => {
                completionProviderDisposable && completionProviderDisposable.dispose();
                hoverDisposable && hoverDisposable.dispose();
                definitionProviderDisposable && definitionProviderDisposable.dispose();
            };
        }
        return () => { };
    }, [
        editorRef,
        monacoRef,
        options.keyboardShortcuts,
        options.actions,
        options.diagnosticsProviders,
        options.decorationsProviders,
        options.definitionProviders,
        options.hoverProviders,
    ]);
    react_1.default.useEffect(() => {
        if (internalCodeErrors && editorRef && monacoRef) {
            setDecorationIds((0, decorations_1.monacoSetDecorations)(theme)({
                codeErrors: internalCodeErrors,
                decorationIds,
                m: monacoRef,
                monacoGql: editorRef,
            }));
        }
    }, [editorRef, monacoRef, internalCodeErrors]);
    return {
        codeErrors: internalCodeErrors,
        setEditor,
        setMonaco,
        editorRef,
        monacoRef,
        languageService,
        setSchema: (newValue) => {
            const fullSchema = compileSchema(Object.assign(Object.assign({}, options), { schema: newValue }));
            return languageService.trySchema(fullSchema);
        },
        onValidate: () => {
            var _a, _b;
            const currentValue = (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.getModel()) === null || _a === void 0 ? void 0 : _a.getValue();
            if (currentValue) {
                graphql_editor_worker_1.GraphQLEditorWorker.validate(currentValue, (_b = options.schema) === null || _b === void 0 ? void 0 : _b.libraries).then((errors) => {
                    setInternalCodeErrors(errors);
                });
            }
        },
    };
};
exports.useGqlServices = useGqlServices;
function toMonacoRange(range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    };
}
exports.toMonacoRange = toMonacoRange;
function toCompletion(entry, range) {
    var _a;
    const results = {
        label: entry.label,
        insertText: (_a = entry.insertText) !== null && _a !== void 0 ? _a : entry.label,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        sortText: entry.sortText,
        filterText: entry.filterText,
        documentation: entry.documentation,
        detail: entry.detail,
        range: range ? toMonacoRange(range) : undefined,
        kind: entry.kind,
    };
    if (entry.command) {
        results.command = Object.assign(Object.assign({}, entry.command), { id: entry.command.command });
    }
    return results;
}
exports.toCompletion = toCompletion;
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Text"] = 1] = "Text";
    CompletionItemKind[CompletionItemKind["Method"] = 2] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 3] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 4] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 5] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 6] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 7] = "Class";
    CompletionItemKind[CompletionItemKind["Interface"] = 8] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 9] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 10] = "Property";
    CompletionItemKind[CompletionItemKind["Unit"] = 11] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 12] = "Value";
    CompletionItemKind[CompletionItemKind["Enum"] = 13] = "Enum";
    CompletionItemKind[CompletionItemKind["Keyword"] = 14] = "Keyword";
    CompletionItemKind[CompletionItemKind["Snippet"] = 15] = "Snippet";
    CompletionItemKind[CompletionItemKind["Color"] = 16] = "Color";
    CompletionItemKind[CompletionItemKind["File"] = 17] = "File";
    CompletionItemKind[CompletionItemKind["Reference"] = 18] = "Reference";
    CompletionItemKind[CompletionItemKind["Folder"] = 19] = "Folder";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 20] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Constant"] = 21] = "Constant";
    CompletionItemKind[CompletionItemKind["Struct"] = 22] = "Struct";
    CompletionItemKind[CompletionItemKind["Event"] = 23] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 24] = "Operator";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 25] = "TypeParameter";
})(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));
function toCompletionItemKind(kind) {
    return kind in kindMap
        ? kindMap[kind]
        : monaco.languages.CompletionItemKind.Text;
}
exports.toCompletionItemKind = toCompletionItemKind;
const kindMap = {
    [CompletionItemKind.Text]: monaco.languages.CompletionItemKind.Text,
    [CompletionItemKind.Method]: monaco.languages.CompletionItemKind.Method,
    [CompletionItemKind.Function]: monaco.languages.CompletionItemKind.Function,
    [CompletionItemKind.Constructor]: monaco.languages.CompletionItemKind.Constructor,
    [CompletionItemKind.Field]: monaco.languages.CompletionItemKind.Field,
    [CompletionItemKind.Variable]: monaco.languages.CompletionItemKind.Variable,
    [CompletionItemKind.Class]: monaco.languages.CompletionItemKind.Class,
    [CompletionItemKind.Interface]: monaco.languages.CompletionItemKind.Interface,
    [CompletionItemKind.Module]: monaco.languages.CompletionItemKind.Module,
    [CompletionItemKind.Property]: monaco.languages.CompletionItemKind.Property,
    [CompletionItemKind.Unit]: monaco.languages.CompletionItemKind.Unit,
    [CompletionItemKind.Value]: monaco.languages.CompletionItemKind.Value,
    [CompletionItemKind.Enum]: monaco.languages.CompletionItemKind.Enum,
    [CompletionItemKind.Keyword]: monaco.languages.CompletionItemKind.Keyword,
    [CompletionItemKind.Snippet]: monaco.languages.CompletionItemKind.Snippet,
    [CompletionItemKind.Color]: monaco.languages.CompletionItemKind.Color,
    [CompletionItemKind.File]: monaco.languages.CompletionItemKind.File,
    [CompletionItemKind.Reference]: monaco.languages.CompletionItemKind.Reference,
    [CompletionItemKind.Folder]: monaco.languages.CompletionItemKind.Folder,
    [CompletionItemKind.EnumMember]: monaco.languages.CompletionItemKind.EnumMember,
    [CompletionItemKind.Constant]: monaco.languages.CompletionItemKind.Constant,
    [CompletionItemKind.Struct]: monaco.languages.CompletionItemKind.Struct,
    [CompletionItemKind.Event]: monaco.languages.CompletionItemKind.Event,
    [CompletionItemKind.Operator]: monaco.languages.CompletionItemKind.Operator,
    [CompletionItemKind.TypeParameter]: monaco.languages.CompletionItemKind.TypeParameter,
};
