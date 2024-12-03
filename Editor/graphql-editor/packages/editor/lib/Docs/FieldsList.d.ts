import { ParserField } from "graphql-js-tree";
import React from "react";
interface FieldsListI {
    node: ParserField;
    setNode: (nodeName: string) => void;
}
export declare const FieldsList: React.FC<FieldsListI>;
export {};
