import React from "react";
import { PassedSchema } from "../Models";
import { EditorTheme } from "../gshared/theme/MainTheme";
export interface GqlEditorProps {
    readonly?: boolean;
    placeholder?: string;
    schema: PassedSchema;
    gql: string;
    setGql: (gql: string) => void;
    theme?: EditorTheme;
}
export declare const GqlEditor: ({ placeholder, schema, gql, readonly: editorReadOnly, theme, setGql, }: GqlEditorProps) => React.JSX.Element;
