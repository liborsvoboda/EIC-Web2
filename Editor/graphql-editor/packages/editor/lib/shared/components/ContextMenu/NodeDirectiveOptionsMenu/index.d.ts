import React from 'react';
import { ParserField } from 'graphql-js-tree';
interface NodeDirectiveOptionsMenuProps {
    node: ParserField;
    hideMenu: () => void;
}
export declare const NodeDirectiveOptionsMenu: React.ForwardRefExoticComponent<NodeDirectiveOptionsMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
