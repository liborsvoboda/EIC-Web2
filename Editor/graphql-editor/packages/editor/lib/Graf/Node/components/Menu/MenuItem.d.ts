import React from "react";
import { ParserField } from "graphql-js-tree";
interface MenuItemProps {
    node: ParserField;
    onClick: () => void;
    name?: string;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export {};
