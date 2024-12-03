import React from "react";
import { CodePaneProps, DiffSchema } from "./code";
import { PassedSchema } from "../Models";
import { ParserTree } from "graphql-js-tree";
import { EditorTheme } from "../gshared/theme/MainTheme";
import { EditorRoutes } from "../state/containers/router";
import type * as monaco from "monaco-editor";
export interface EditorProps extends Pick<CodePaneProps, "onContentChange" | "onEditorMount"> {
    readonly?: boolean;
    schema: PassedSchema;
    diffSchemas?: [DiffSchema, DiffSchema];
    setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
    onTreeChange?: (tree: ParserTree) => void;
    theme?: EditorTheme;
    onRouteChange?: (r: EditorRoutes) => void;
    onNodeSelect?: (selectedNodeId?: string) => void;
    path: string;
    title?: React.ReactNode;
    fontFamily?: string;
    fontFamilySans?: string;
    disableExport?: boolean;
    disableImport?: boolean;
}
export interface ExternalEditorAPI {
    selectNode: (selectedNodeId?: string) => void;
    route: (r: EditorRoutes) => void;
    currentRoute: EditorRoutes;
    receive: (change: monaco.editor.IModelContentChangedEvent) => void;
}
export declare const Editor: React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<ExternalEditorAPI>>;
