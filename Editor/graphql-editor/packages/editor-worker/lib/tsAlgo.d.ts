import { ParserField } from "graphql-js-tree";
import * as d3 from "d3";
import { WorkerEvents } from "./worker/validation.worker";
export interface NumberNode {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    vx: number;
    vy: number;
    index: number;
    parserField: ParserField;
}
export interface NumberConnection {
    source: string;
    target: string;
    connectionType?: string;
}
export declare function storeCoordinates(nodes: NumberNode[], connections: NumberConnection[], iterations: number, alpha: number): d3.Simulation<NumberNode, undefined>;
export declare const sortNodesTs: ({ nodes, options: { existingNumberNodes, ignoreAlphaCalculation, alpha, maxFields, maxWidth, }, }: WorkerEvents["simulateSort"]["args"]) => {
    numberNodes: NumberNode[];
    connections: NumberConnection[];
    alpha: number;
};
export declare function createCollisionForce(nodes: NumberNode[]): (alpha: number, iterations?: number) => void;
export declare const calcDimensions: (numberNodes: NumberNode[]) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
