"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaList = exports.NodeList = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const vars_1 = require("../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const SingleNodeInList_1 = require("./SingleNodeInList");
const Title = styled_1.default.div `
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-weight: 600;
  font-size: 14px;
  cursor: ${({ empty }) => (empty ? "auto" : "pointer")};
  color: ${({ theme, empty }) => empty ? theme.text.disabled : theme.text.active};
  margin: 0;
  padding-bottom: 5px;
  padding-left: 1rem;
  margin-right: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${vars_1.transition};
  svg {
    color: ${({ theme, open }) => open ? theme.text.active : theme.content.standalone.disabled};
    transition: ${vars_1.transition};
    transform-origin: 50%;
    transform: ${({ open }) => (open ? "rotate(0deg)" : "rotate(-90deg)")};
  }
`;
const NodeList = ({ nodeList, listTitle, setExpanded, expanded, colorKey, }) => {
    const open = expanded.includes(listTitle);
    const empty = !(nodeList === null || nodeList === void 0 ? void 0 : nodeList.length);
    const [activeContextNode, setActiveContextNode] = (0, react_1.useState)(null);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Title, { color: colorKey, empty: empty, onClick: () => setExpanded(listTitle), open: open },
            react_1.default.createElement("div", null, listTitle),
            !empty && react_1.default.createElement(styling_system_1.ChevronDown, { width: 18 })),
        open &&
            nodeList &&
            nodeList.map((node) => (react_1.default.createElement(SingleNodeInList_1.SingleNodeInList, { key: node.id, colorKey: colorKey, node: node, activeContext: activeContextNode === node, setActive: (node) => setActiveContextNode(node) })))));
};
exports.NodeList = NodeList;
const SchemaList = ({ queryNode, mutationNode, subscriptionNode }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Title, { color: "type", empty: !queryNode && !mutationNode && !subscriptionNode, open: true },
            react_1.default.createElement("div", null, "Schema")),
        react_1.default.createElement(SingleNodeInList_1.SingleSchemaNodeInList, { node: queryNode, schemaProps: { name: "query", operationType: graphql_js_tree_1.OperationType.query } }),
        react_1.default.createElement(SingleNodeInList_1.SingleSchemaNodeInList, { node: mutationNode, schemaProps: {
                name: "mutation",
                operationType: graphql_js_tree_1.OperationType.mutation,
            } }),
        react_1.default.createElement(SingleNodeInList_1.SingleSchemaNodeInList, { node: subscriptionNode, schemaProps: {
                name: "subscription",
                operationType: graphql_js_tree_1.OperationType.subscription,
            } })));
};
exports.SchemaList = SchemaList;
