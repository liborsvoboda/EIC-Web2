import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const ActiveGrafType: React.ForwardRefExoticComponent<Pick<ParserField, "type"> & {
    parentTypes?: Record<string, string> | undefined;
    onClick?: (() => void) | undefined;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>>;
