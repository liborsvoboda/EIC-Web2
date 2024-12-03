import * as React from "react";
import { DiffEditorProps } from "@monaco-editor/react";
import { SchemaEditorApi, SchemaServicesOptions } from "./use-schema-services";
export type SchemaDiffEditorProps = SchemaServicesOptions & Omit<DiffEditorProps, "language"> & {
    libraries?: string;
};
export declare const SchemaDiffEditor: React.ForwardRefExoticComponent<SchemaServicesOptions & Omit<DiffEditorProps, "language"> & {
    libraries?: string | undefined;
} & React.RefAttributes<{
    original: SchemaEditorApi;
    modified: SchemaEditorApi;
}>>;
