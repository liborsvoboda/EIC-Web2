import React from "react";
export interface DiffSchema {
    name: string;
    content: string;
}
export type DiffEditorPaneProps = {
    size: number | string;
    schema: DiffSchema;
    newSchema: DiffSchema;
};
export declare const DiffEditorPane: ({ schema, newSchema }: DiffEditorPaneProps) => React.JSX.Element;
