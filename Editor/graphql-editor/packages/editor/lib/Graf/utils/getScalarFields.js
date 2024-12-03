"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScalarFields = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const getScalarFields = (node, validScalars) => {
    var _a;
    return (((_a = node.args) === null || _a === void 0 ? void 0 : _a.filter((a) => {
        var _a;
        return validScalars.includes((0, graphql_js_tree_1.getTypeName)(a.type.fieldType)) &&
            ((_a = a.args) === null || _a === void 0 ? void 0 : _a.length) === 0;
    })) || []).map((a) => ({
        args: [],
        data: { type: a.data.type },
        id: a.id,
        name: a.name,
        type: a.type,
        value: a.value,
        directives: [],
        interfaces: [],
    }));
};
exports.getScalarFields = getScalarFields;
