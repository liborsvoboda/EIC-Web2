import { ParserTree } from "graphql-js-tree";
import { ContextToken, IPosition } from "graphql-language-service";
import type { WorkerEvents } from "./validation.worker";
export declare class GraphQLEditorWorker {
    static simulateSort(args: WorkerEvents["simulateSort"]["args"]): Promise<{
        nodes: import("..").NumberNode[];
        x: number;
        y: number;
        width: number;
        height: number;
        connections: import("./validation.worker").RelativeNumberConnection[];
    }>;
    static validate(schema: string, libraries?: string): Promise<import("../validation").EditorError[]>;
    static generateCode(tree: ParserTree): Promise<string>;
    static generateTree({ schema, libraries, cutSchemaDefinition, }: {
        schema: string;
        libraries?: string;
        cutSchemaDefinition?: boolean;
    }): Promise<ParserTree>;
    static getTokenAtPosition(document: string, position: Pick<IPosition, "character" | "line">): Promise<ContextToken>;
}
