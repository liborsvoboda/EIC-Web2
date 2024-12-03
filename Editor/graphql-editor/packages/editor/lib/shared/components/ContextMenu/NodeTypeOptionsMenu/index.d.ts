import React from "react";
import { ParserField, FieldType } from "graphql-js-tree";
interface NodeTypeOptionsMenuProps {
    node: ParserField;
    hideMenu: () => void;
    onCheck: (f: FieldType) => void;
}
export declare const NodeTypeOptionsMenu: React.ForwardRefExoticComponent<NodeTypeOptionsMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
