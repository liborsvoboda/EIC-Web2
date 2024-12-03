import { ParserField } from "graphql-js-tree";
import React from "react";
import { NumberNode, RelativeNumberConnection } from "graphql-editor-worker";
export interface RelationPath {
    field: NumberNode;
    index: number;
    connectingField: ParserField;
}
interface LinesProps {
    relations: RelativeNumberConnection[] | undefined;
    isPrintPreviewActive: boolean;
}
export declare const Lines: React.FC<LinesProps>;
export {};
