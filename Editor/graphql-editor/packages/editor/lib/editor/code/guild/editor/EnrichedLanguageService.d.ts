import { GraphQLSchema } from "graphql";
import { LanguageService, IPosition as GraphQLPosition, ContextToken } from "graphql-language-service";
import * as monaco from "monaco-editor";
import { BridgeOptions, DecorationsSource, DefinitionSource, DiagnosticsSource, HoverSource } from "./utils";
export declare class EnrichedLanguageService extends LanguageService {
    getNodeAtPosition(schema: GraphQLSchema, document: string, position: GraphQLPosition): Promise<ContextToken | null>;
    buildBridgeForProviders<T extends {
        lineNumber: number;
        column: number;
    }>(model: monaco.editor.ITextModel, position: T): Promise<null | BridgeOptions>;
    getDefinitionProvider(rawSources: DefinitionSource[]): monaco.languages.DefinitionProvider;
    getHoverProvider(rawSources: HoverSource[]): monaco.languages.HoverProvider;
    private handleDecorations;
    private handleDiagnostics;
    getModelChangeHandler(libraries?: string): (editorInstance: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco, diagnosticsSources: DiagnosticsSource[], decorationsSources: DecorationsSource[]) => void;
    trySchema(sdl: string): Promise<GraphQLSchema | null>;
}
