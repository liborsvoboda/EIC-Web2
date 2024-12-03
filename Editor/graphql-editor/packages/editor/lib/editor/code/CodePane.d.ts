import React from "react";
import { LiveSchemaEditorApi, LiveSchemaEditorProps } from "./guild";
import { PassedSchema } from "../../Models";
import type * as monaco from "monaco-editor";
export interface CodePaneOuterProps {
    readonly?: boolean;
}
export type CodePaneProps = Pick<LiveSchemaEditorProps, "onContentChange"> & {
    size: number | string;
    schema: PassedSchema;
    onChange: (v: string, passGraphValidation?: boolean) => void;
    onEditorMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
    fullScreen?: boolean;
} & CodePaneOuterProps;
export type CodePaneApi = Pick<LiveSchemaEditorApi, "receive">;
export declare const CodePane: React.ForwardRefExoticComponent<Pick<LiveSchemaEditorProps, "onContentChange"> & {
    size: number | string;
    schema: PassedSchema;
    onChange: (v: string, passGraphValidation?: boolean) => void;
    onEditorMount?: ((editor: monaco.editor.IStandaloneCodeEditor) => void) | undefined;
    fullScreen?: boolean | undefined;
} & CodePaneOuterProps & React.RefAttributes<CodePaneApi>>;
