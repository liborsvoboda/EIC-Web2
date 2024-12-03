import React from "react";
import { NumberNode } from "graphql-editor-worker";
interface NodeProps {
    numberNode: NumberNode;
    isLibrary?: boolean;
    isReadOnly?: boolean;
    optimized?: boolean;
}
export declare const Node: React.FC<NodeProps>;
export {};
