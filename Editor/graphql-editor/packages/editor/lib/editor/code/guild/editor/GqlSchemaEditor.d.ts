import React from "react";
import { EditorProps } from "@monaco-editor/react";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { SchemaServicesOptions } from "./use-schema-services";
export type GqlSchemaEditorProps = SchemaServicesOptions & {
    onBlur?: (value: string) => void;
    onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
    onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
    onSchemaError?: (errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void;
} & Omit<EditorProps, "language"> & {
    gql?: string;
    setGql: (gql: string) => void;
};
export declare const GqlSchemaEditor: React.ForwardRefExoticComponent<SchemaServicesOptions & {
    onBlur?: ((value: string) => void) | undefined;
    onLanguageServiceReady?: ((languageService: EnrichedLanguageService) => void) | undefined;
    onSchemaChange?: ((schema: GraphQLSchema, sdl: string) => void) | undefined;
    onSchemaError?: ((errors: [GraphQLError], sdl: string, languageService: EnrichedLanguageService) => void) | undefined;
} & Omit<EditorProps, "language"> & {
    gql?: string | undefined;
    setGql: (gql: string) => void;
} & React.RefAttributes<unknown>>;
