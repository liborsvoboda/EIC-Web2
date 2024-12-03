"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentsList = void 0;
const DocsStyles_1 = require("./DocsStyles");
const Resolve_1 = require("../GraphQL/Resolve");
const styled_1 = __importDefault(require("@emotion/styled"));
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importDefault(require("react"));
const ArgumentsWrapper = styled_1.default.div `
  display: flex;
  flex-wrap: wrap;
`;
const FieldDiv = styled_1.default.div `
  display: flex;
  color: ${({ theme }) => theme.text.default};
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;
const ArgumentsList = ({ argument, setNode, }) => {
    return (react_1.default.createElement(ArgumentsWrapper, null, argument.args &&
        argument.args.map((a, i) => {
            var _a;
            return (react_1.default.createElement(react_1.default.Fragment, { key: i },
                i === 0 && react_1.default.createElement(DocsStyles_1.FieldText, null, "("),
                react_1.default.createElement(FieldDiv, null,
                    a.name,
                    ":",
                    react_1.default.createElement(DocsStyles_1.TypeText, { isScalar: Resolve_1.BuiltInScalars.some((scalar) => scalar.name === (0, graphql_js_tree_1.getTypeName)(a.type.fieldType)), onClick: () => setNode((0, graphql_js_tree_1.getTypeName)(a.type.fieldType)) }, (0, graphql_js_tree_1.compileType)(a.type.fieldType))),
                i === (((_a = argument.args) === null || _a === void 0 ? void 0 : _a.length) || 0) - 1 ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(DocsStyles_1.FieldText, null, ")"),
                    react_1.default.createElement(DocsStyles_1.TypeText, { isScalar: Resolve_1.BuiltInScalars.some((scalar) => scalar.name === (0, graphql_js_tree_1.getTypeName)(a.type.fieldType)), onClick: () => setNode((0, graphql_js_tree_1.getTypeName)(a.type.fieldType)) }, (0, graphql_js_tree_1.compileType)(argument.type.fieldType)))) : (react_1.default.createElement(DocsStyles_1.FieldText, null, ","))));
        })));
};
exports.ArgumentsList = ArgumentsList;
