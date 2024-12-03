import { EditorError } from "graphql-editor-worker/lib/validation";
import type * as monaco from "monaco-editor";
export declare const mapEditorErrorToMonacoDecoration: (theme: import("../../..").EditorTheme) => (m: typeof monaco) => (e: EditorError) => monaco.editor.IModelDeltaDecoration[];
