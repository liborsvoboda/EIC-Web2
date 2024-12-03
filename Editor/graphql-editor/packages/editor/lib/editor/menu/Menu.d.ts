import React from "react";
import { PassedSchema } from "../../Models";
export type ActiveSource = "relation" | "docs" | "code" | "navigation" | "routing" | "deFocus";
export type ActivePane = "diff" | "relation" | "docs";
export interface MenuProps {
    setToggleCode: (v: boolean) => void;
    toggleCode: boolean;
    activePane?: ActivePane;
    excludePanes?: ActivePane[];
    setActivePane: (pane?: ActivePane) => void;
    schema: string;
    libraries?: string;
    readOnly?: boolean;
    setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
    path: string;
    disableImport?: boolean;
    disableExport?: boolean;
}
export declare const Menu: ({ toggleCode, setToggleCode, setActivePane, activePane, setSchema, path, schema, libraries, readOnly, excludePanes, disableImport, disableExport, }: MenuProps) => React.JSX.Element;
