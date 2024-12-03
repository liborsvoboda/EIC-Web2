import React from "react";
import { ParserField } from "graphql-js-tree";
interface NodeInterfaceProps {
    onDelete: () => void;
    onDetach: () => void;
    children?: React.ReactNode;
    isLocked?: boolean;
}
export declare const NodeInterface: React.FC<NodeInterfaceProps>;
interface CreateNodeInterfaceProps {
    isLocked?: boolean;
    node: ParserField;
}
export declare const CreateNodeInterface: React.FC<CreateNodeInterfaceProps>;
export {};
