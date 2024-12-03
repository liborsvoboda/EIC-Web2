import React from "react";
import { EditorTheme } from "../gshared/theme/MainTheme";
import { PassedSchema } from "../Models";
export interface EmbeddedEditorProps {
    schema: PassedSchema;
    theme?: EditorTheme;
}
export declare const EmbeddedEditor: ({ schema, theme }: EmbeddedEditorProps) => React.JSX.Element;
