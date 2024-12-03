"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExtensionNode = exports.ResolveExtension = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const ResolveExtension = (t) => {
    switch (t) {
        case graphql_js_tree_1.TypeDefinition.EnumTypeDefinition:
            return graphql_js_tree_1.TypeExtension.EnumTypeExtension;
        case graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition:
            return graphql_js_tree_1.TypeExtension.InputObjectTypeExtension;
        case graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition:
            return graphql_js_tree_1.TypeExtension.InterfaceTypeExtension;
        case graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition:
            return graphql_js_tree_1.TypeExtension.ObjectTypeExtension;
        case graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition:
            return graphql_js_tree_1.TypeExtension.ScalarTypeExtension;
        case graphql_js_tree_1.TypeDefinition.UnionTypeDefinition:
            return graphql_js_tree_1.TypeExtension.UnionTypeExtension;
    }
    throw new Error('Invalid extension node');
};
exports.ResolveExtension = ResolveExtension;
const isExtensionNode = (t) => !![
    graphql_js_tree_1.TypeExtension.EnumTypeExtension,
    graphql_js_tree_1.TypeExtension.InputObjectTypeExtension,
    graphql_js_tree_1.TypeExtension.InterfaceTypeExtension,
    graphql_js_tree_1.TypeExtension.ObjectTypeExtension,
    graphql_js_tree_1.TypeExtension.ScalarTypeExtension,
    graphql_js_tree_1.TypeExtension.UnionTypeExtension,
].find((o) => o === t);
exports.isExtensionNode = isExtensionNode;
