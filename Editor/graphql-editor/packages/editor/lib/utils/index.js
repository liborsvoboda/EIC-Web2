"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTypeName = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const changeTypeName = (field, newName) => {
    const changeFieldName = (field, newName) => {
        if (field.type === graphql_js_tree_1.Options.array) {
            return changeFieldName(field.nest, newName);
        }
        else if (field.type === graphql_js_tree_1.Options.required) {
            return changeFieldName(field.nest, newName);
        }
        field.name = newName;
    };
    changeFieldName(field, newName);
    return field;
};
exports.changeTypeName = changeTypeName;
