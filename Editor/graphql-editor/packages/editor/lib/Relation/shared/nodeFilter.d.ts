import { OmitNodes } from "./models";
import { ParserField } from "graphql-js-tree";
export declare const nodeFilter: (nodes: ParserField[], options: {
    baseTypesOn?: boolean;
    omitNodes?: OmitNodes;
    libraryNodesOn?: boolean;
}) => ParserField[];
