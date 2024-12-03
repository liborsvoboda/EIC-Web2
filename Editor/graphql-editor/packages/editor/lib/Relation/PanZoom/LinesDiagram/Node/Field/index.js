"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const react_1 = __importDefault(require("react"));
const trees_1 = require("../../../../../state/containers/trees");
const styled_1 = __importDefault(require("@emotion/styled"));
const graphql_js_tree_1 = require("graphql-js-tree");
const constants_1 = require("../../Lines/constants");
const ActiveFieldName_1 = require("./ActiveFieldName");
const ActiveType_1 = require("./ActiveType");
const DOMClassNames_1 = require("../../../../../shared/hooks/DOMClassNames");
const containers_1 = require("../../../../../state/containers");
const styling_system_1 = require("@aexol-studio/styling-system");
const Main = styled_1.default.div `
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: ${({ printPreviewActive }) => printPreviewActive
    ? constants_1.PRINT_PREVIEW_FIELD_HEIGHT
    : constants_1.RELATION_CONSTANTS.FIELD_HEIGHT}px;
  padding: 0 12px;
  color: ${({ theme }) => theme.text.disabled};
  margin: ${({ printPreviewActive }) => printPreviewActive ? "5px -12px" : "0 -12px"};
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.neutrals.L5};
  }
`;
const Field = ({ node }) => {
    const { parentTypes, setSelectedNodeId, setSelectedNodeIdThatWillBeAdded, getParentOfField, focusMode, } = (0, trees_1.useTreesState)();
    const { printPreviewActive } = (0, containers_1.useRelationsState)();
    const { setTypeRelatedNodesToFocusedNode, filteredFocusedNodes, filteredTypeRelatedToFocusedNode, } = (0, containers_1.useRelationNodesState)();
    const nodeClick = (n) => {
        const parent = getParentOfField(n);
        if (parent) {
            const isFocus = !!(focusMode && filteredFocusedNodes);
            if (isFocus) {
                setTypeRelatedNodesToFocusedNode(parent);
                if (!filteredFocusedNodes
                    .concat(filteredTypeRelatedToFocusedNode)
                    .find((ffn) => ffn.id === parent.id)) {
                    setSelectedNodeIdThatWillBeAdded({
                        source: "relation",
                        value: {
                            id: parent.id,
                            name: parent.name,
                        },
                    });
                    return;
                }
            }
            setSelectedNodeId({
                source: "relation",
                value: {
                    id: parent.id,
                    name: parent.name,
                },
            });
        }
    };
    return (react_1.default.createElement(Main, { className: DOMClassNames_1.DOMClassNames.nodeField, onClick: (e) => {
            e.stopPropagation();
            nodeClick(node);
        }, printPreviewActive: printPreviewActive },
        react_1.default.createElement(ActiveFieldName_1.ActiveFieldName, { name: node.data.type !== graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition
                ? node.name
                : "", args: node.args, parentTypes: parentTypes, onClick: (n) => {
                nodeClick(n);
            }, printPreviewActive: printPreviewActive }),
        react_1.default.createElement(ActiveType_1.ActiveType, { type: node.type, parentTypes: parentTypes, onClick: () => nodeClick(node) }),
        node.fromLibrary && react_1.default.createElement(styling_system_1.Link, null)));
};
exports.Field = Field;
