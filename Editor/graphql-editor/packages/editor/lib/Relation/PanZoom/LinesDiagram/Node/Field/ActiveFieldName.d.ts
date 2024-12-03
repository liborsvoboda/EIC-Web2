import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const ActiveFieldName: React.FC<Pick<ParserField, "name" | "args"> & {
    printPreviewActive: boolean;
    parentTypes?: Record<string, string>;
    onClick?: (n: ParserField) => void;
}>;
