import React from "react";
import { ParserField } from "graphql-js-tree";
export declare const TopNodeMenu: React.FC<{
    node: ParserField;
    parentNode?: ParserField;
    onDelete: () => void;
    onDuplicate?: () => void;
    onInputCreate?: () => void;
    isLibrary?: boolean;
}>;
