"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeAllRelatedNodes = exports.ChangeRelatedNode = void 0;
const utils_1 = require("../../../utils");
const graphql_js_tree_1 = require("graphql-js-tree");
const ChangeRelatedNode = ({ newName, node, oldName, }) => {
    const typeName = (0, graphql_js_tree_1.getTypeName)(node.type.fieldType);
    if (typeName === oldName) {
        (0, utils_1.changeTypeName)(node.type.fieldType, newName);
    }
    if (node.args) {
        node.args.forEach((n) => (0, exports.ChangeRelatedNode)({ oldName, newName, node: n }));
    }
};
exports.ChangeRelatedNode = ChangeRelatedNode;
const ChangeAllRelatedNodes = ({ newName, nodes, oldName, }) => {
    nodes.forEach((n) => (0, exports.ChangeRelatedNode)({ oldName, newName, node: n }));
};
exports.ChangeAllRelatedNodes = ChangeAllRelatedNodes;
