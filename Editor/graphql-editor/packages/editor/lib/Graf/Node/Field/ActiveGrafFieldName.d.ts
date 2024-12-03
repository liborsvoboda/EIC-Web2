import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const ActiveGrafFieldName: React.FC<Pick<ParserField, "name" | "args"> & {
    afterChange?: (newName: string) => void;
    parentTypes?: Record<string, string>;
}>;
