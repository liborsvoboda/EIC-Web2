import React from "react";
import { ParserField } from "graphql-js-tree";
interface NodeDirectiveProps {
    onDelete: () => void;
    isLocked?: boolean;
    children?: React.ReactNode;
}
export declare const DirectivePlacement: React.FC<NodeDirectiveProps>;
interface CreateNodeDirectiveProps {
    isLocked?: boolean;
    node: ParserField;
}
export declare const CreateNodeDirective: React.FC<CreateNodeDirectiveProps>;
export {};
