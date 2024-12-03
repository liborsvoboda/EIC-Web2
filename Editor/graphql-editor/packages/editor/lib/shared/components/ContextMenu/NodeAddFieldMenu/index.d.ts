import React from "react";
import { ParserField } from "graphql-js-tree";
interface NodeAddFieldMenuProps {
    node: ParserField;
    hideMenu: () => void;
}
export declare const NodeAddFieldMenu: React.ForwardRefExoticComponent<NodeAddFieldMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
