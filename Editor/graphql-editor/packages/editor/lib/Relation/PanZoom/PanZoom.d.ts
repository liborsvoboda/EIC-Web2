import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const PanZoom: React.FC<{
    nodes: ParserField[];
    hide?: boolean;
    title?: React.ReactNode;
    parentClass: "focus" | "all";
}>;
