import React from "react";
import type * as monaco from "monaco-editor";
import { DecorationsSource, DefinitionSource, DiagnosticsSource, EditorAction, HoverSource } from "./utils";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { Maybe } from "graphql-language-service";
import { PassedSchema } from "../../../../Models";
import { EditorError } from "graphql-editor-worker/lib/validation";
export type SchemaEditorApi = {
    jumpToType(typeName: string): void;
    deselect(): void;
    jumpToError(rowNumber: number): void;
    editor?: monaco.editor.IStandaloneCodeEditor;
};
export type SchemaServicesOptions = {
    schema?: PassedSchema;
    hoverProviders?: HoverSource[];
    definitionProviders?: DefinitionSource[];
    diagnosticsProviders?: DiagnosticsSource[];
    decorationsProviders?: DecorationsSource[];
    onContentChange?: (v: monaco.editor.IModelContentChangedEvent) => void;
    actions?: EditorAction[];
    select?: (name?: Maybe<string> | Maybe<{
        operation: "Query" | "Mutation" | "Subscription";
    }>) => void;
    onBlur?: (value: string) => void;
    onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
    onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
    onSchemaError?: (errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void;
    sharedLanguageService?: EnrichedLanguageService;
    keyboardShortcuts?: (editorInstance: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => monaco.editor.IActionDescriptor[];
};
export declare const useSchemaServices: (options: SchemaServicesOptions) => {
    receive: (e: monaco.editor.IModelContentChangedEvent) => void;
    codeErrors: EditorError[];
    setEditor: React.Dispatch<React.SetStateAction<monaco.editor.IStandaloneCodeEditor | null>>;
    setMonaco: React.Dispatch<React.SetStateAction<typeof monaco | null>>;
    editorRef: monaco.editor.IStandaloneCodeEditor | null;
    monacoRef: typeof monaco | null;
    languageService: EnrichedLanguageService;
    setSchema: (newValue: string) => Promise<GraphQLSchema | null>;
    onValidate: () => void;
    editorApi: SchemaEditorApi;
};
