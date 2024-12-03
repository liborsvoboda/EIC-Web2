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
exports.validationMerge = exports.cutUnnecessary = exports.showWidgetInPosition = exports.toMonacoRange = exports.toMarkerData = exports.toGraphQLPosition = exports.debugHoverSource = exports.coreHoverSource = exports.coreDefinitionSource = exports.coreDiagnosticsSource = exports.emptyLocation = exports.locToRange = exports.removeFalsey = exports.getRange = void 0;
const graphql_language_service_1 = require("graphql-language-service");
Object.defineProperty(exports, "getRange", { enumerable: true, get: function () { return graphql_language_service_1.getRange; } });
const monaco = __importStar(require("monaco-editor"));
const graphql_editor_worker_1 = require("graphql-editor-worker");
const graphql_js_tree_1 = require("graphql-js-tree");
function removeFalsey(obj) {
    return !!obj;
}
exports.removeFalsey = removeFalsey;
function locToRange(loc) {
    return {
        startLineNumber: loc.startToken.line,
        startColumn: loc.startToken.column,
        endLineNumber: loc.endToken.line + 1,
        endColumn: loc.endToken.column,
    };
}
exports.locToRange = locToRange;
exports.emptyLocation = {
    startLineNumber: 0,
    startColumn: 0,
    endLineNumber: 0,
    endColumn: 0,
};
exports.coreDiagnosticsSource = {
    forDocument({ document }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield graphql_editor_worker_1.GraphQLEditorWorker.validate(document);
            const markers = errors.flatMap((e) => {
                var _a;
                if (e.__typename === "global") {
                    return [
                        {
                            startColumn: 0,
                            startLineNumber: 0,
                            endLineNumber: 1000,
                            message: e.text,
                            severity: monaco.MarkerSeverity.Error,
                            endColumn: 1000,
                        },
                    ];
                }
                return (((_a = e.error.locations) === null || _a === void 0 ? void 0 : _a.map((l) => {
                    const r = (0, graphql_language_service_1.getRange)(Object.assign(Object.assign({}, l), { line: l.line + 1, column: l.column + 1 }), document);
                    return {
                        endColumn: r.end.character + 1,
                        startColumn: r.start.character + 1,
                        startLineNumber: r.start.line + 1,
                        endLineNumber: r.end.line + 1,
                        message: e.error.message,
                    };
                })) || []);
            });
            return markers;
        });
    },
};
exports.coreDefinitionSource = {
    forNode: ({ schema, model, token }) => {
        if (token.state && token.state.kind && token.state.name) {
            const type = schema.getType(token.state.name);
            if (type && type.astNode && type.astNode.loc) {
                return [
                    {
                        range: {
                            startLineNumber: type.astNode.loc.startToken.line,
                            startColumn: type.astNode.loc.startToken.column,
                            endLineNumber: type.astNode.loc.endToken.line + 1,
                            endColumn: type.astNode.loc.endToken.column,
                        },
                        uri: model.uri,
                    },
                ];
            }
        }
        return [];
    },
};
exports.coreHoverSource = {
    forNode: ({ schema, document, position, token }) => ({
        value: (0, graphql_language_service_1.getHoverInformation)(schema, document, position, token),
    }),
};
exports.debugHoverSource = {
    forNode: ({ token }) => ({
        value: "```json\n" + JSON.stringify(token.state, null, 2) + "\n```",
    }),
};
function toGraphQLPosition(position) {
    return new graphql_language_service_1.Position(position.lineNumber - 1, position.column - 1);
}
exports.toGraphQLPosition = toGraphQLPosition;
function toMarkerData(diagnostic) {
    return {
        startLineNumber: diagnostic.range.start.line + 1,
        endLineNumber: diagnostic.range.end.line + 1,
        startColumn: diagnostic.range.start.character + 1,
        endColumn: diagnostic.range.end.character,
        message: diagnostic.message,
        severity: 5,
        code: diagnostic.code || undefined,
    };
}
exports.toMarkerData = toMarkerData;
function toMonacoRange(range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    };
}
exports.toMonacoRange = toMonacoRange;
function showWidgetInPosition(editorInstance, position, htmlElement) {
    editorInstance.changeViewZones(function (changeAccessor) {
        changeAccessor.addZone({
            afterLineNumber: position.line + 1,
            heightInPx: 60,
            domNode: htmlElement,
        });
    });
}
exports.showWidgetInPosition = showWidgetInPosition;
const cutUnnecessary = (baseTree, librarySchema) => {
    const baseSchemaTree = graphql_js_tree_1.Parser.parse(baseTree).nodes.map((n) => n.name);
    const addedSchemaTree = graphql_js_tree_1.Parser.parse(librarySchema).nodes.filter((n) => !baseSchemaTree.includes(n.name) &&
        n.data.type !== graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition &&
        n.data.type !== graphql_js_tree_1.TypeSystemExtension.SchemaExtension);
    return graphql_js_tree_1.TreeToGraphQL.parse({
        nodes: addedSchemaTree,
    });
};
exports.cutUnnecessary = cutUnnecessary;
const validationMerge = (base, libraries) => {
    try {
        return [base, (0, exports.cutUnnecessary)(base, libraries)].join("\n");
    }
    catch (error) {
        return [base, libraries].join("\n");
    }
};
exports.validationMerge = validationMerge;
