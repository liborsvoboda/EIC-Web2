import { GraphQLError } from "graphql";
export type GlobalGraphQLError = {
    __typename: "global";
    text: string;
};
export type LocalGraphQLError = {
    __typename: "local";
    error: GraphQLError;
};
export type EditorError = GlobalGraphQLError | LocalGraphQLError;
export declare const catchSchemaErrors: (schema: string, libraries?: string) => EditorError[];
