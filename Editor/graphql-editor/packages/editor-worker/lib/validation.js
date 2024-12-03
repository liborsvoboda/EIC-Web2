import { buildSchema, validateSchema, parse } from "graphql";
import { validateSDL } from "graphql/validation/validate";
import { Parser, TreeToGraphQL, TypeSystemDefinition, TypeSystemExtension, mergeSDLs, } from "graphql-js-tree";
const validateSDLErrors = (s) => {
    const schema = parse(s);
    const errors = validateSDL(schema);
    return errors;
};
const validateTypes = (s) => {
    const schema = buildSchema(s);
    const errors = validateSchema(schema);
    return errors;
};
const moveErrorsByLibraryPadding = () => {
    return (error) => {
        return {
            ...error,
            error: {
                ...error.error,
                locations: error.error.locations?.map((l) => ({
                    ...l,
                    line: l.line - 1,
                    column: l.column - 1,
                })),
                positions: error.error.positions,
            },
        };
    };
};
const allowMultipleDirectivesAtLocation = (s) => {
    return !s.match(new RegExp(/directive(.*)can only be used once/));
};
const allowNoSchemaDefinition = (s) => {
    return !s.includes("Query root type must be provided");
};
export const catchSchemaErrors = (schema, libraries = "") => {
    const paddingFunction = moveErrorsByLibraryPadding();
    try {
        let code = schema;
        if (libraries) {
            const mergeResult = mergeSDLs(schema, libraries);
            if (mergeResult.__typename === "error") {
                return mergeResult.errors.map((e) => ({
                    text: `There is a conflict with library schema on Type.field: ${e.conflictingNode}.${e.conflictingField}`,
                    __typename: "global",
                }));
            }
            code = [schema, cutUnnecessary(schema, libraries)].join("\n");
        }
        const errors = validateSDLErrors(code);
        if (errors.length > 0) {
            return errors
                .filter((e) => allowMultipleDirectivesAtLocation(e.message))
                .filter((e) => allowNoSchemaDefinition(e.message))
                .map((e) => {
                return paddingFunction({
                    __typename: "local",
                    error: e,
                });
            });
        }
        return validateTypes(code)
            .filter((e) => allowMultipleDirectivesAtLocation(e.message))
            .filter((e) => allowNoSchemaDefinition(e.message))
            .map((e) => {
            return paddingFunction({
                __typename: "local",
                error: e,
            });
        });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "columnNumber" in error &&
            "lineNumber" in error &&
            "message" in error) {
            const e = error;
            return [
                {
                    __typename: "global",
                    text: e.message,
                },
            ];
        }
        const er = error;
        return [{ __typename: "local", error: er }];
    }
    return [];
};
const cutUnnecessary = (baseTree, librarySchema) => {
    const baseSchemaTree = Parser.parse(baseTree).nodes.map((n) => n.name);
    const addedSchemaTree = Parser.parse(librarySchema).nodes.filter((n) => !baseSchemaTree.includes(n.name) &&
        n.data.type !== TypeSystemDefinition.SchemaDefinition &&
        n.data.type !== TypeSystemExtension.SchemaExtension);
    return TreeToGraphQL.parse({
        nodes: addedSchemaTree,
    });
};
