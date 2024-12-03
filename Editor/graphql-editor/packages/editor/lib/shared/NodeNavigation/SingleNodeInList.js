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
exports.SingleSchemaNodeInList = exports.SingleNodeInList = void 0;
const components_1 = require("../../Graf/Node/components");
const SetOperationMenu_1 = require("./SetOperationMenu");
const ContextMenu_1 = require("../components/ContextMenu");
const DOMClassNames_1 = require("../hooks/DOMClassNames");
const manageDomNode_1 = require("../hooks/manageDomNode");
const containers_1 = require("../../state/containers");
const vars_1 = require("../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const selectNavigationNodeOnly = (nodeId) => {
    const DOMNavigationNode = (0, manageDomNode_1.manageDomNode)(DOMClassNames_1.DOMClassNames.navigationTitle);
    DOMNavigationNode.removeClasses(["active"]);
    DOMNavigationNode.addClassByFn("active", (e) => {
        const htmlElem = e;
        const m = htmlElem.dataset.id === nodeId;
        if (m) {
            htmlElem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return m;
    });
};
const SingleNodeInList = ({ node, colorKey, schemaProps, activeContext, setActive }) => {
    const { setSelectedNodeId, isLibrary, removeNode, tree } = (0, containers_1.useTreesState)();
    const { toggleNodeVisibility } = (0, containers_1.useRelationNodesState)();
    const { setEditMode } = (0, containers_1.useRelationsState)();
    const ref = (0, react_1.createRef)();
    return (react_1.default.createElement(NavSingleBox, { color: colorKey, ref: ref, className: DOMClassNames_1.DOMClassNames.navigationTitle, "data-id": node.id, onClick: () => {
            setEditMode("");
            if (node.isHidden) {
                toggleNodeVisibility(node);
            }
            selectNavigationNodeOnly(node.id);
            setSelectedNodeId({
                value: {
                    id: node.id,
                    name: node.name,
                },
                source: "navigation",
            });
        }, onContextMenu: (e) => {
            e.preventDefault();
            setActive(node);
        } },
        react_1.default.createElement(NodeName, { isHidden: node.isHidden, color: colorKey, className: DOMClassNames_1.DOMClassNames.navigationTitleSpan, "data-id": node.id, isContextMenuShown: activeContext },
            schemaProps && react_1.default.createElement("span", null, schemaProps.name),
            react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: activeContext, close: () => setActive(null), Trigger: ({ triggerProps }) => (react_1.default.createElement("span", Object.assign({}, triggerProps), node.name)) }, ({ layerProps }) => (react_1.default.createElement(components_1.Menu, Object.assign({}, layerProps, { hideMenu: () => setActive(null) }),
                react_1.default.createElement(NodeNavContextStack, { direction: "column", gap: "0.25rem" },
                    react_1.default.createElement(ContextMenuItem, { onClick: (e) => {
                            e.stopPropagation();
                            selectNavigationNodeOnly(node.id);
                            setSelectedNodeId({
                                value: {
                                    id: node.id,
                                    name: node.name,
                                },
                                source: "navigation",
                            });
                            setEditMode(node.id);
                        } }, "Edit node"),
                    react_1.default.createElement(ContextMenuItem, { onClick: (e) => {
                            e.stopPropagation();
                            setEditMode("");
                            const currentNode = tree.nodes.find((el) => el.id === node.id);
                            if (currentNode) {
                                removeNode(currentNode);
                            }
                        } }, "Delete node"))))),
            isLibrary(node) && (react_1.default.createElement(styling_system_1.Tooltip, { title: "From external library", position: "top" },
                react_1.default.createElement(ExternalLibrary, null,
                    react_1.default.createElement(styling_system_1.Link, null))))),
        react_1.default.createElement(Actions, { align: "center", gap: "0.25rem" },
            react_1.default.createElement(IconContainer, { isHidden: node.isHidden, onClick: (e) => {
                    e.stopPropagation();
                    toggleNodeVisibility(node);
                } }, node.isHidden ? react_1.default.createElement(styling_system_1.EyeSlash, { height: 16 }) : react_1.default.createElement(styling_system_1.Eye, { height: 16 })))));
};
exports.SingleNodeInList = SingleNodeInList;
const SingleSchemaNodeInList = ({ node, schemaProps }) => {
    const { setSelectedNodeId, isLibrary, removeSchemaNodeField, setOperationNode, } = (0, containers_1.useTreesState)();
    const { toggleNodeVisibility } = (0, containers_1.useRelationNodesState)();
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.createRef)();
    return (react_1.default.createElement(NavSingleBox, { color: "type", ref: ref, className: DOMClassNames_1.DOMClassNames.navigationTitle, "data-id": node === null || node === void 0 ? void 0 : node.id, onClick: () => {
            if (!node)
                return;
            if (node.isHidden) {
                toggleNodeVisibility(node);
            }
            selectNavigationNodeOnly(node.id);
            setSelectedNodeId({
                value: {
                    id: node.id,
                    name: node.name,
                },
                source: "navigation",
            });
        } },
        react_1.default.createElement(NodeName, { isHidden: node === null || node === void 0 ? void 0 : node.isHidden, color: "type", className: DOMClassNames_1.DOMClassNames.navigationTitleSpan, "data-id": node === null || node === void 0 ? void 0 : node.id },
            schemaProps && (react_1.default.createElement(styling_system_1.Typography, { variant: "caption", color: "active" }, schemaProps.name)),
            node && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, node.name),
                isLibrary(node) && (react_1.default.createElement(styling_system_1.Tooltip, { title: "From external library", position: "top" },
                    react_1.default.createElement(ExternalLibrary, null,
                        react_1.default.createElement(styling_system_1.Link, null))))))),
        react_1.default.createElement(Actions, { align: "center", gap: "0.25rem" },
            react_1.default.createElement(styling_system_1.Stack, { align: "center", gap: "0.25rem" }, node && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(SelectedActions, { className: DOMClassNames_1.DOMClassNames.navigationSelectedActions },
                    react_1.default.createElement(IconContainer, { isHidden: node.isHidden, onClick: (e) => {
                            e.stopPropagation();
                            removeSchemaNodeField(schemaProps.operationType);
                        } },
                        react_1.default.createElement(styling_system_1.Xmark, { height: 16 })))))),
            node ? (react_1.default.createElement(IconContainer, { isHidden: node.isHidden, onClick: (e) => {
                    e.stopPropagation();
                    toggleNodeVisibility(node);
                } }, node.isHidden ? react_1.default.createElement(styling_system_1.EyeSlash, { height: 16 }) : react_1.default.createElement(styling_system_1.Eye, { height: 16 }))) : (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen, close: () => setMenuOpen(false), Trigger: ({ triggerProps }) => (react_1.default.createElement(IconContainer, Object.assign({}, triggerProps, { onClick: () => {
                        setMenuOpen(true);
                    } }),
                    react_1.default.createElement(styling_system_1.DotsHorizontal, { height: 16 }))) }, ({ layerProps }) => (react_1.default.createElement(SetOperationMenu_1.SetOperationMenu, Object.assign({ operationType: schemaProps.operationType }, layerProps, { onSelectType: (n) => {
                    setOperationNode(schemaProps.operationType, n);
                }, hideMenu: () => {
                    setMenuOpen(false);
                } }))))))));
};
exports.SingleSchemaNodeInList = SingleSchemaNodeInList;
const ExternalLibrary = styled_1.default.span `
  color: ${({ theme }) => theme.text.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;
const Actions = (0, styled_1.default)(styling_system_1.Stack) `
  margin-left: auto;
`;
const SelectedActions = styled_1.default.div `
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  pointer-events: none;
`;
const NavSingleBox = styled_1.default.a `
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: ${({ theme, color }) => theme.colors[color]} 1px solid;
  padding: 0.5rem 0 0.5rem 1rem;
  margin-left: 1rem;
  transition: ${vars_1.transition};
  background-color: ${(p) => p.theme.neutrals.L6};
  &.${DOMClassNames_1.DOMClassNames.active} {
    .${DOMClassNames_1.DOMClassNames.navigationSelectedActions} {
      pointer-events: auto;
      opacity: 1;
    }
    .${DOMClassNames_1.DOMClassNames.navigationTitleSpan} {
      color: ${(p) => p.theme.accent.L2};
    }
  }
  :hover {
    background-color: ${(p) => p.theme.neutrals.L5};
    svg {
      opacity: 1;
    }
  }
`;
const NodeName = styled_1.default.div `
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 0.8rem;
  color: ${({ theme, isContextMenuShown }) => isContextMenuShown ? theme.text.active : theme.text.default};
  transition: ${vars_1.transition};
  opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1)};
  min-width: 0;
  width: 28ch;
  white-space: nowrap;
  &:hover {
    color: ${({ theme, color, isContextMenuShown }) => isContextMenuShown ? theme.text.active : theme.colors[color]};
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const IconContainer = styled_1.default.div `
  display: flex;
  transition: ${vars_1.transition};
  color: ${({ theme }) => theme.content.standalone.disabled};
  :hover {
    color: ${({ theme }) => theme.text.active};
  }
  svg {
    opacity: ${({ isHidden }) => (isHidden ? 0.25 : 1.0)};
    transition: ${vars_1.transition};
  }
`;
const NodeNavContextStack = (0, styled_1.default)(styling_system_1.Stack) `
  width: 100%;
  padding: 0.25rem;
`;
const ContextMenuItem = styled_1.default.div `
  padding: 0.25rem;
  font-size: 0.75rem;
  transition: background-color 0.25s ease-in-out;
  cursor: pointer;
  color: ${({ theme }) => theme.text.active};
  width: 100%;
  background-color: ${(p) => p.theme.neutrals.L4};

  &:hover {
    background-color: ${(p) => p.theme.neutrals.L2};
  }
`;
