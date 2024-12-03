"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltInScalars = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
exports.BuiltInScalars = [
    graphql_js_tree_1.ScalarTypes.String,
    graphql_js_tree_1.ScalarTypes.Boolean,
    graphql_js_tree_1.ScalarTypes.Float,
    graphql_js_tree_1.ScalarTypes.ID,
    graphql_js_tree_1.ScalarTypes.Int,
].map((t) => ({
    data: {
        type: graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition,
    },
    type: {
        fieldType: {
            name: t,
            type: graphql_js_tree_1.Options.name,
        },
    },
    name: t,
}));
