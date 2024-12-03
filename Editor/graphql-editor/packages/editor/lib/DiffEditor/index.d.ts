import { DiffSchema } from "../editor/code";
import React from "react";
interface DiffEditorProps {
    schemas: [DiffSchema, DiffSchema];
}
export declare const DiffEditor: ({ schemas }: DiffEditorProps) => React.JSX.Element;
export {};
