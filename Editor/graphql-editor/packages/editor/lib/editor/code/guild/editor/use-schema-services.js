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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSchemaServices = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("./utils");
const EnrichedLanguageService_1 = require("./EnrichedLanguageService");
const utils_2 = require("./utils");
const graphql_editor_worker_1 = require("graphql-editor-worker");
const decorations_1 = require("../../monaco/decorations");
const containers_1 = require("../../../../state/containers");
const onCursor_1 = require("./onCursor");
const cursorIndex = {
    index: -1,
};
const useSchemaServices = (options) => {
    var _a, _b, _c;
    const [editorRef, setEditor] = (0, react_1.useState)(null);
    const [internalCodeErrors, setInternalCodeErrors] = (0, react_1.useState)([]);
    const [decorationIds, setDecorationIds] = (0, react_1.useState)([]);
    const [monacoRef, setMonaco] = (0, react_1.useState)(null);
    const { tree, selectedNodeId } = (0, containers_1.useTreesState)();
    const isExternal = (0, react_1.useRef)(false);
    const { theme } = (0, containers_1.useTheme)();
    const languageService = react_1.default.useMemo(() => {
        var _a;
        return (options.sharedLanguageService ||
            new EnrichedLanguageService_1.EnrichedLanguageService({
                schemaString: ((_a = options.schema) === null || _a === void 0 ? void 0 : _a.code)
                    ? options.schema.libraries
                        ? (0, utils_1.validationMerge)(options.schema.code, options.schema.libraries)
                        : options.schema.code
                    : undefined,
                schemaConfig: {
                    buildSchemaOptions: {
                        assumeValid: true,
                        assumeValidSDL: true,
                    },
                },
            }));
    }, [(_a = options.schema) === null || _a === void 0 ? void 0 : _a.libraries, (_b = options.schema) === null || _b === void 0 ? void 0 : _b.code]);
    const selectNodeUnderCursor = (model, e, currentSelectedNode) => __awaiter(void 0, void 0, void 0, function* () {
        languageService
            .buildBridgeForProviders(model, e)
            .then((bridge) => {
            if (bridge && options.select) {
                const { token: { state }, } = bridge;
                const n = (0, onCursor_1.findCurrentNodeName)(state);
                if (n !== currentSelectedNode) {
                    options.select(n);
                }
            }
        })
            .catch(() => {
        });
    });
    (0, react_1.useEffect)(() => {
        var _a;
        if (tree.schema) {
            const model = editorRef === null || editorRef === void 0 ? void 0 : editorRef.getModel();
            if (model) {
                const p = model === null || model === void 0 ? void 0 : model.getPositionAt(cursorIndex.index);
                selectNodeUnderCursor(model, p, (_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.name);
            }
        }
    }, [tree]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (((_a = options.schema) === null || _a === void 0 ? void 0 : _a.source) !== "code") {
            const model = editorRef === null || editorRef === void 0 ? void 0 : editorRef.getModel();
            model === null || model === void 0 ? void 0 : model.setValue(((_b = options.schema) === null || _b === void 0 ? void 0 : _b.code) || "");
        }
    }, [options.schema]);
    (0, react_1.useEffect)(() => {
        var _a;
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
            const handler = languageService.getModelChangeHandler((_a = options.schema) === null || _a === void 0 ? void 0 : _a.libraries);
            handler(editorRef, monacoRef, options.diagnosticsProviders || [], options.decorationsProviders || []);
            const onSelectCursor = (e) => {
                var _a, _b;
                if (e.source === "api")
                    return false;
                if (e.selection.startLineNumber !== e.selection.endLineNumber)
                    return;
                if (e.selection.startColumn !== e.selection.endColumn)
                    return;
                if (e.reason === 3) {
                    cursorIndex.index =
                        ((_a = editorRef.getModel()) === null || _a === void 0 ? void 0 : _a.getOffsetAt({
                            column: e.selection.startColumn,
                            lineNumber: e.selection.startLineNumber,
                        })) || -1;
                }
                if (e.reason === 0)
                    return;
                if (!options.select)
                    return;
                const model = editorRef.getModel();
                if (model) {
                    selectNodeUnderCursor(model, {
                        column: e.selection.startColumn,
                        lineNumber: e.selection.startLineNumber,
                    }, (_b = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.name);
                }
            };
            const cursorSelectionDisposable = editorRef.onDidChangeCursorSelection(onSelectCursor);
            const definitionProviderDisposable = monacoRef.languages.registerDefinitionProvider("graphql", languageService.getDefinitionProvider(options.definitionProviders || []));
            const hoverDisposable = monacoRef.languages.registerHoverProvider("graphql", languageService.getHoverProvider(options.hoverProviders || []));
            const liveDisposable = editorRef.onDidChangeModelContent((e) => {
                var _a;
                if (isExternal.current === false) {
                    (_a = options.onContentChange) === null || _a === void 0 ? void 0 : _a.call(options, e);
                }
                else {
                    isExternal.current = false;
                }
            });
            return () => {
                hoverDisposable && hoverDisposable.dispose();
                definitionProviderDisposable && definitionProviderDisposable.dispose();
                cursorSelectionDisposable && cursorSelectionDisposable.dispose();
                liveDisposable && liveDisposable.dispose();
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
        options.select,
        options.schema,
        (_c = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _c === void 0 ? void 0 : _c.id,
    ]);
    const receive = (e) => {
        var _a;
        isExternal.current = true;
        (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.getModel()) === null || _a === void 0 ? void 0 : _a.applyEdits(e.changes);
    };
    (0, react_1.useEffect)(() => {
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
        receive,
        codeErrors: internalCodeErrors,
        setEditor,
        setMonaco,
        editorRef,
        monacoRef,
        languageService,
        setSchema: (newValue) => {
            var _a, _b;
            const fullSchema = ((_a = options.schema) === null || _a === void 0 ? void 0 : _a.libraries)
                ? (0, utils_1.validationMerge)(newValue, (_b = options.schema) === null || _b === void 0 ? void 0 : _b.libraries)
                : newValue;
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
        editorApi: {
            jumpToType: (typeName) => __awaiter(void 0, void 0, void 0, function* () {
                var _d;
                try {
                    const schema = languageService.schema || (yield languageService.getSchema());
                    if (schema) {
                        const type = schema.getType(typeName);
                        if ((_d = type === null || type === void 0 ? void 0 : type.astNode) === null || _d === void 0 ? void 0 : _d.loc) {
                            const range = (0, utils_2.locToRange)(type.astNode.loc);
                            editorRef === null || editorRef === void 0 ? void 0 : editorRef.revealPositionInCenter({ column: 0, lineNumber: range.startLineNumber }, 0);
                        }
                    }
                }
                catch (error) {
                }
            }),
            deselect: () => {
                editorRef === null || editorRef === void 0 ? void 0 : editorRef.setSelection(utils_2.emptyLocation);
            },
            jumpToError: (lineNumber) => {
                editorRef === null || editorRef === void 0 ? void 0 : editorRef.setSelection({
                    startLineNumber: lineNumber,
                    endLineNumber: lineNumber,
                    endColumn: 1000,
                    startColumn: 0,
                });
                editorRef === null || editorRef === void 0 ? void 0 : editorRef.revealPositionInCenter({
                    column: 0,
                    lineNumber: lineNumber,
                }, 0);
            },
        },
    };
};
exports.useSchemaServices = useSchemaServices;
