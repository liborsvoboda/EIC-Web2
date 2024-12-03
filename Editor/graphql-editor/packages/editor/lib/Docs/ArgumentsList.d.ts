import { ParserField } from "graphql-js-tree";
import React from "react";
interface ArgumentsListI {
    argument: ParserField;
    setNode: (nodeName: string) => void;
}
export declare const ArgumentsList: React.FC<ArgumentsListI>;
export {};
