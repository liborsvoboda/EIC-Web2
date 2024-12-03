"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeFilter = void 0;
const Resolve_1 = require("../../GraphQL/Resolve");
const graphql_js_tree_1 = require("graphql-js-tree");
const nodeFilter = (nodes, options) => {
    const scalarTypes = nodes
        .filter((n) => n.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition)
        .map((n) => n.name);
    let currentNodes = nodes;
    if (options.omitNodes) {
        currentNodes = nodes.filter((n) => {
            if (options.omitNodes) {
                const nodeType = n.data.type in options.omitNodes
                    ? n.data.type
                    : undefined;
                if (nodeType && options.omitNodes[nodeType]) {
                    return false;
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.ObjectTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition];
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.EnumTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.EnumTypeDefinition];
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.InputObjectTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition];
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.InterfaceTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition];
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.ScalarTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition];
                }
                if (n.data.type === graphql_js_tree_1.TypeExtension.UnionTypeExtension) {
                    return !options.omitNodes[graphql_js_tree_1.TypeDefinition.UnionTypeDefinition];
                }
                return true;
            }
        });
    }
    if (!options.baseTypesOn) {
        currentNodes = currentNodes.map((n) => {
            var _a;
            return (Object.assign(Object.assign({}, n), { args: (_a = n.args) === null || _a === void 0 ? void 0 : _a.filter((a) => !(0, Resolve_1.isScalarArgument)(a, scalarTypes)) }));
        });
    }
    if (!options.libraryNodesOn) {
        currentNodes = filterLibraryNodes(currentNodes);
    }
    return currentNodes;
};
exports.nodeFilter = nodeFilter;
const filterLibraryNodes = (nodes) => nodes
    .filter((n) => !n.fromLibrary)
    .map((n) => {
    var _a;
    return (Object.assign(Object.assign({}, n), { args: (_a = n.args) === null || _a === void 0 ? void 0 : _a.filter((a) => !a.fromLibrary) }));
});
