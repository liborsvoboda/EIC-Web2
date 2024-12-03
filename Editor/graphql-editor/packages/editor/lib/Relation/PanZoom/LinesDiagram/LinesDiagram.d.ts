import React from "react";
import { ParserField } from "graphql-js-tree";
import { NumberNode } from "graphql-editor-worker";
import { RelationPath } from "./Lines";
export type FilteredFieldsTypesProps = {
    fieldsTypes?: string[];
    searchValueEmpty: boolean;
};
export interface ViewportParams {
    width: number;
    height: number;
    x: number;
    y: number;
}
type LinesDiagramProps = {
    mainRef: React.RefObject<HTMLDivElement>;
    nodes: ParserField[];
    nodesWithoutFilter: ParserField[];
    setLoading: (b: boolean) => void;
    loading?: boolean;
    fieldsOn?: boolean;
    hide?: boolean;
    isReadOnly?: boolean;
    parentClass: "focus" | "all";
    setViewportParams: (props: ViewportParams) => void;
};
export interface LinesDiagramApi {
    triggerResimulation: (printingProcessingFlag?: boolean) => void;
}
export interface RelationInterface {
    to: RelationPath;
    from: RelationPath[];
    fromLength: number;
    interfaces: NumberNode[];
    extensions: NumberNode[];
}
export declare const LinesDiagram: React.ForwardRefExoticComponent<LinesDiagramProps & React.RefAttributes<LinesDiagramApi>>;
export {};
