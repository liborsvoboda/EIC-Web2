import { State } from "graphql-language-service";
export declare const findCurrentNodeName: (state: State) => string | {
    operation: "Query" | "Mutation" | "Subscription";
} | null | undefined;
