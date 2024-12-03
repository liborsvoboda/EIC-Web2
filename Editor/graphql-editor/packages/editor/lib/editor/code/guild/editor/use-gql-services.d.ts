import React from "react";
import * as monaco from "monaco-editor";
import { DecorationsSource, DefinitionSource, DiagnosticsSource, EditorAction, HoverSource } from "./utils";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { CompletionItem, IRange, Maybe } from "graphql-language-service";
import { PassedSchema } from "../../../../Models";
import { EditorError } from "graphql-editor-worker/lib/validation";
export type SchemaServicesOptions = {
    schema?: PassedSchema;
    gql?: string;
    hoverProviders?: HoverSource[];
    definitionProviders?: DefinitionSource[];
    diagnosticsProviders?: DiagnosticsSource[];
    decorationsProviders?: DecorationsSource[];
    actions?: EditorAction[];
    select?: (name?: Maybe<string>) => void;
    onBlur?: (value: string) => void;
    onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
    onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
    onSchemaError?: (errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void;
    sharedLanguageService?: EnrichedLanguageService;
    keyboardShortcuts?: (editorInstance: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => monaco.editor.IActionDescriptor[];
};
export declare const useGqlServices: (options?: SchemaServicesOptions) => {
    codeErrors: EditorError[];
    setEditor: React.Dispatch<React.SetStateAction<monaco.editor.IStandaloneCodeEditor | null>>;
    setMonaco: React.Dispatch<React.SetStateAction<typeof monaco | null>>;
    editorRef: monaco.editor.IStandaloneCodeEditor | null;
    monacoRef: typeof monaco | null;
    languageService: EnrichedLanguageService;
    setSchema: (newValue: string) => Promise<GraphQLSchema | null>;
    onValidate: () => void;
};
export declare function toMonacoRange(range: IRange): monaco.IRange;
export declare function toCompletion(entry: CompletionItem, range?: IRange): monaco.languages.CompletionItem;
export declare enum CompletionItemKind {
    Text = 1,
    Method = 2,
    Function = 3,
    Constructor = 4,
    Field = 5,
    Variable = 6,
    Class = 7,
    Interface = 8,
    Module = 9,
    Property = 10,
    Unit = 11,
    Value = 12,
    Enum = 13,
    Keyword = 14,
    Snippet = 15,
    Color = 16,
    File = 17,
    Reference = 18,
    Folder = 19,
    EnumMember = 20,
    Constant = 21,
    Struct = 22,
    Event = 23,
    Operator = 24,
    TypeParameter = 25
}
export declare function toCompletionItemKind(kind: CompletionItemKind): monaco.languages.CompletionItemKind;
