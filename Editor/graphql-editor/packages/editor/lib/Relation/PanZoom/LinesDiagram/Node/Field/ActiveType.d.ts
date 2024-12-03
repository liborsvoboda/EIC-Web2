import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const ActiveType: React.FC<Pick<ParserField, "type"> & {
    parentTypes?: Record<string, string>;
    onClick?: () => void;
}>;
