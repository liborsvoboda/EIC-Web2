import React from 'react';
import { ParserField } from 'graphql-js-tree';
interface NodeChangeFieldTypeMenuProps {
    node: ParserField;
    hideMenu: () => void;
    onSelectType: (f: ParserField) => void;
}
export declare const NodeChangeFieldTypeMenu: React.ForwardRefExoticComponent<NodeChangeFieldTypeMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
