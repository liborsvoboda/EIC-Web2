"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileScalarTypes = exports.compileTypeOptions = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const compileTypeOptions = ({ type }) => {
    return (0, graphql_js_tree_1.compileType)(type.fieldType);
};
exports.compileTypeOptions = compileTypeOptions;
const compileScalarTypes = (type) => {
    const typeName = (0, graphql_js_tree_1.getTypeName)(type.fieldType);
    if (Object.values(graphql_js_tree_1.ScalarTypes).includes(typeName)) {
        return graphql_js_tree_1.TypeDefinitionDisplayMap[graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition];
    }
    return typeName;
};
exports.compileScalarTypes = compileScalarTypes;
