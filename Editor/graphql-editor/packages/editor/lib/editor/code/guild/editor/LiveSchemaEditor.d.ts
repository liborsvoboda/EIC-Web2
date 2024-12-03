import React from "react";
import { EditorProps } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { SchemaEditorApi, SchemaServicesOptions } from "./use-schema-services";
export type LiveSchemaEditorProps = SchemaServicesOptions & {
    onBlur?: (value: string) => void;
    onEditorMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
    onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
    onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
    onSchemaError?: (errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void;
} & Omit<EditorProps, "language">;
export type LiveSchemaEditorApi = SchemaEditorApi & {
    receive: (e: monaco.editor.IModelContentChangedEvent) => void;
};
export declare const LiveSchemaEditor: React.ForwardRefExoticComponent<SchemaServicesOptions & {
    onBlur?: ((value: string) => void) | undefined;
    onEditorMount?: ((editor: monaco.editor.IStandaloneCodeEditor) => void) | undefined;
    onLanguageServiceReady?: ((languageService: EnrichedLanguageService) => void) | undefined;
    onSchemaChange?: ((schema: GraphQLSchema, sdl: string) => void) | undefined;
    onSchemaError?: ((errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void) | undefined;
} & Omit<EditorProps, "language"> & React.RefAttributes<LiveSchemaEditorApi>>;
