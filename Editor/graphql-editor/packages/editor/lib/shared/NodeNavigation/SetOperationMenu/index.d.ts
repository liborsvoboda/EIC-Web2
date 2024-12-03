import React from "react";
import { OperationType, ParserField } from "graphql-js-tree";
interface NodeChangeFieldTypeMenuProps {
    selectedNode?: ParserField;
    operationType: OperationType;
    hideMenu: () => void;
    onSelectType: (f: ParserField) => void;
}
export declare const SetOperationMenu: React.ForwardRefExoticComponent<NodeChangeFieldTypeMenuProps & React.RefAttributes<HTMLDivElement>>;
export {};
