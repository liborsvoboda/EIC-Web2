import { NumberNode } from "../tsAlgo";
import { EditorError } from "../validation";
import { ParserField, ParserTree } from "graphql-js-tree";
import { IPosition } from "graphql-language-service";
export interface RelativeNumberConnection {
    source?: NumberNode;
    target?: NumberNode;
    connectionType?: string;
}
export type WorkerEvents = {
    validate: {
        args: {
            schema: string;
            libraries?: string;
        };
        returned: EditorError[];
    };
    parse: {
        args: {
            tree: ParserTree;
        };
        returned: string;
    };
    parseSchema: {
        args: {
            schema: string;
            libraries?: string;
            cutSchemaDefinition?: boolean;
        };
        returned: ParserTree;
    };
    token: {
        args: {
            document: string;
            position: Pick<IPosition, "character" | "line">;
        };
        returned: string;
    };
    simulateSort: {
        args: {
            nodes: ParserField[];
            options: {
                existingNumberNodes?: NumberNode[];
                iterations?: number;
                ignoreAlphaCalculation?: boolean;
                alpha?: number;
                maxFields?: number;
                maxWidth?: number;
            };
        };
        returned: {
            nodes: NumberNode[];
            x: number;
            y: number;
            width: number;
            height: number;
            connections: RelativeNumberConnection[];
        };
    };
};
