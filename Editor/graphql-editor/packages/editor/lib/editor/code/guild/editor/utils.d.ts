import { GraphQLSchema, Location } from "graphql";
import { IRange as GraphQLRange, IPosition as GraphQLPosition, Diagnostic, ContextToken, getRange } from "graphql-language-service";
import * as monaco from "monaco-editor";
import type { EnrichedLanguageService } from "./EnrichedLanguageService";
export { getRange };
export declare function removeFalsey<T>(obj: T | null): obj is T;
export declare function locToRange(loc: Location): monaco.IRange;
export declare const emptyLocation: monaco.IRange;
export type BridgeOptions = {
    schema: GraphQLSchema;
    document: string;
    position: GraphQLPosition;
    model: monaco.editor.ITextModel;
    token: ContextToken;
    languageService: EnrichedLanguageService;
};
export type HoverSource = {
    forNode(options: BridgeOptions): monaco.IMarkdownString | null | Promise<monaco.IMarkdownString | null>;
};
export type DiagnosticsSource = {
    forDocument(options: Pick<BridgeOptions, "document" | "languageService" | "model">): monaco.editor.IMarkerData[] | null | Promise<monaco.editor.IMarkerData[] | null>;
};
export declare const coreDiagnosticsSource: DiagnosticsSource;
export type DecorationsSource = {
    forDocument(options: Pick<BridgeOptions, "document" | "languageService" | "model"> & {
        editor: monaco.editor.IStandaloneCodeEditor | monaco.editor.IStandaloneDiffEditor;
        monaco: typeof monaco;
    }): void | Promise<void>;
};
export type DefinitionSource = {
    forNode(options: BridgeOptions): monaco.languages.Definition[] | null | Promise<monaco.languages.Definition[] | null>;
};
export declare const coreDefinitionSource: DefinitionSource;
export declare const coreHoverSource: HoverSource;
export declare const debugHoverSource: HoverSource;
export declare function toGraphQLPosition<T extends {
    lineNumber: number;
    column: number;
}>(position: T): GraphQLPosition;
export declare function toMarkerData(diagnostic: Diagnostic): monaco.editor.IMarkerData;
export declare function toMonacoRange(range: GraphQLRange): monaco.IRange;
export type PreviewAction = {
    id: string;
    title: string;
    onOpen: () => HTMLElement;
    onClose: () => void;
};
export type EditorAction = {
    id: string;
    label: string;
    keybindings?: number[];
    contextMenuGroupId?: string;
    contextMenuOrder?: number;
    onRun: (options: {
        editor: monaco.editor.IStandaloneCodeEditor | monaco.editor.IStandaloneDiffEditor;
        monaco: typeof monaco;
        bridge: BridgeOptions;
    }) => void;
};
export declare function showWidgetInPosition(editorInstance: monaco.editor.IStandaloneCodeEditor, position: BridgeOptions["position"], htmlElement: HTMLElement): void;
export declare const cutUnnecessary: (baseTree: string, librarySchema: string) => string;
export declare const validationMerge: (base: string, libraries: string) => string;
