import { ParserField } from "graphql-js-tree";
export declare const ChangeRelatedNode: ({ newName, node, oldName, }: {
    oldName: string;
    newName: string;
    node: ParserField;
}) => void;
export declare const ChangeAllRelatedNodes: ({ newName, nodes, oldName, }: {
    nodes: ParserField[];
    oldName: string;
    newName: string;
}) => void;
