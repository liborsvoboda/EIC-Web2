import React from "react";
import { ParserField } from "graphql-js-tree";
interface NodeAddDirectiveMenuProps {
    node: ParserField;
    hideMenu: () => void;
}
export declare const NodeAddDirectiveMenu: React.ForwardRefExoticComponent<NodeAddDirectiveMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
