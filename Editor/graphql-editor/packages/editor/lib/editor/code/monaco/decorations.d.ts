import { EditorError } from "graphql-editor-worker/lib/validation";
import type * as monaco from "monaco-editor";
export declare const monacoSetDecorations: (theme: import("../../..").EditorTheme) => ({ codeErrors, decorationIds, monacoGql, m, }: {
    m: typeof monaco;
    codeErrors: EditorError[];
    monacoGql: monaco.editor.IStandaloneCodeEditor;
    decorationIds: string[];
}) => string[];
