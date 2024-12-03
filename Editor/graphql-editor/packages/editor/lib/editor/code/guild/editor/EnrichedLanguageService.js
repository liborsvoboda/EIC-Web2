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
exports.EnrichedLanguageService = void 0;
const graphql_editor_worker_1 = require("graphql-editor-worker");
const graphql_language_service_1 = require("graphql-language-service");
const monaco = __importStar(require("monaco-editor"));
const utils_1 = require("./utils");
const graphql_js_tree_1 = require("graphql-js-tree");
class EnrichedLanguageService extends graphql_language_service_1.LanguageService {
    getNodeAtPosition(schema, document, position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (schema) {
                const token = yield graphql_editor_worker_1.GraphQLEditorWorker.getTokenAtPosition(document, position);
                if (token) {
                    return token;
                }
            }
            return null;
        });
    }
    buildBridgeForProviders(model, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const graphQLPosition = (0, utils_1.toGraphQLPosition)(position);
            const document = model.getValue();
            const schema = yield this.getSchema();
            if (!schema) {
                return null;
            }
            const tokenAtPosition = yield this.getNodeAtPosition(schema, document, graphQLPosition);
            if (!tokenAtPosition) {
                return null;
            }
            return {
                languageService: this,
                position: graphQLPosition,
                document,
                schema,
                token: tokenAtPosition,
                model,
            };
        });
    }
    getDefinitionProvider(rawSources) {
        const sources = [...rawSources, utils_1.coreDefinitionSource];
        return {
            provideDefinition: (model, position) => __awaiter(this, void 0, void 0, function* () {
                const bridge = yield this.buildBridgeForProviders(model, position).catch(() => {
                });
                if (!bridge) {
                    return [];
                }
                const nestedArrays = (yield Promise.all(sources.map((source) => source.forNode(bridge)))).filter(Boolean);
                const items = [].concat(...nestedArrays);
                return items;
            }),
        };
    }
    getHoverProvider(rawSources) {
        const sources = [...rawSources, utils_1.coreHoverSource];
        return {
            provideHover: (model, position) => __awaiter(this, void 0, void 0, function* () {
                const info = yield this.buildBridgeForProviders(model, position).catch(() => {
                });
                if (!info) {
                    return;
                }
                const contents = yield Promise.all(sources.map((source) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield source.forNode(info);
                    }
                    catch (e) {
                        return null;
                    }
                })));
                return {
                    contents: contents.filter(utils_1.removeFalsey),
                    range: (0, utils_1.toMonacoRange)((0, graphql_language_service_1.getRange)({
                        column: info.position.character,
                        line: info.position.line + 1,
                    }, info.document)),
                };
            }),
        };
    }
    handleDecorations(decorationSources, model, monacoInstance, editorInstance) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const source of decorationSources) {
                source.forDocument({
                    monaco: monacoInstance,
                    editor: editorInstance,
                    document: model.getValue(),
                    model,
                    languageService: this,
                });
            }
        });
    }
    handleDiagnostics(rawDiagnosticsSources, model, monacoInstance, libraries) {
        return __awaiter(this, void 0, void 0, function* () {
            const diagnosticsSources = [
                ...rawDiagnosticsSources,
                utils_1.coreDiagnosticsSource,
            ];
            const nestedArrays = (yield Promise.all(diagnosticsSources.map((source) => __awaiter(this, void 0, void 0, function* () {
                let c = model.getValue().toString();
                try {
                    if (libraries) {
                        const result = (0, graphql_js_tree_1.mergeSDLs)(model.getValue().toString(), libraries);
                        if (result.__typename === "error") {
                            return [
                                {
                                    message: "Cannot merge nodes: " +
                                        result.errors
                                            .map((e) => `${e.conflictingNode}.${e.conflictingField}`)
                                            .join(","),
                                    endColumn: 1000,
                                    endLineNumber: 19999,
                                    startColumn: 0,
                                    startLineNumber: 0,
                                    severity: monaco.MarkerSeverity.Warning,
                                },
                            ];
                        }
                        else {
                            c = [c, (0, utils_1.cutUnnecessary)(c, libraries)].join("\n");
                        }
                    }
                    const s = yield source.forDocument({
                        languageService: this,
                        model,
                        document: c,
                    });
                    return s;
                }
                catch (e) {
                    return null;
                }
            })))).filter(utils_1.removeFalsey);
            const markerData = [].concat(...nestedArrays);
            monacoInstance.editor.setModelMarkers(model, "graphql", markerData);
        });
    }
    getModelChangeHandler(libraries) {
        return (editorInstance, monacoInstance, diagnosticsSources, decorationsSources) => __awaiter(this, void 0, void 0, function* () {
            const model = editorInstance.getModel();
            if (!model) {
                return;
            }
            yield Promise.all([
                this.handleDiagnostics(diagnosticsSources, model, monacoInstance, libraries),
                this.handleDecorations(decorationsSources, model, monacoInstance, editorInstance),
            ]);
        });
    }
    trySchema(sdl) {
        return this.setSchema(sdl).then(() => this.getSchema());
    }
}
exports.EnrichedLanguageService = EnrichedLanguageService;
