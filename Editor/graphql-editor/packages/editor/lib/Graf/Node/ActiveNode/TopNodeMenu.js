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
exports.TopNodeMenu = void 0;
const react_1 = __importStar(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const components_1 = require("../components");
const ContextMenu_1 = require("../../../shared/components/ContextMenu");
const trees_1 = require("../../../state/containers/trees");
const getScalarFields_1 = require("../../utils/getScalarFields");
const styled_1 = __importDefault(require("@emotion/styled"));
const Resolve_1 = require("../../../GraphQL/Resolve");
const vars_1 = require("../../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const Models_1 = require("../../../Models");
const NodeIconArea = styled_1.default.div `
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: ${vars_1.transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L2};
  }
  color: ${({ opened, theme }) => opened ? theme.accent.L2 : theme.text.default};
`;
const TopNodeMenu = ({ node, parentNode, onDelete, onDuplicate, onInputCreate, isLibrary, }) => {
    var _a;
    const { scalars, tree, setTree, selectedNodeId, setSelectedNodeId } = (0, trees_1.useTreesState)();
    const [menuOpen, setMenuOpen] = (0, react_1.useState)();
    const [closeMenu, setCloseMenu] = (0, react_1.useState)(false);
    const isCreateInputValid = () => {
        var _a;
        return ((_a = (0, getScalarFields_1.getScalarFields)(node, scalars)) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
            node.data.type === "ObjectTypeDefinition";
    };
    const isRequiredMenuValid = () => {
        var _a, _b;
        return node.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition ||
            node.data.type === graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition ||
            (node.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition &&
                (((_a = node.interfaces) === null || _a === void 0 ? void 0 : _a.length) === 0 ||
                    (!node.interfaces && !!((_b = node.args) === null || _b === void 0 ? void 0 : _b.length))));
    };
    (0, react_1.useEffect)(() => {
        hideMenu();
    }, [closeMenu]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (node.id === ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id) && selectedNodeId.justCreated) {
            setMenuOpen("field");
        }
    }, [(_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id]);
    const hideMenu = () => {
        setMenuOpen(undefined);
    };
    return (react_1.default.createElement(styling_system_1.Stack, { direction: "row", gap: "0.5rem", align: "center" },
        !isLibrary && (react_1.default.createElement(react_1.default.Fragment, null,
            node.data.type !== graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition &&
                node.data.type !== graphql_js_tree_1.ValueDefinition.EnumValueDefinition && (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "field", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => (react_1.default.createElement(styling_system_1.Tooltip, { title: "Add field" },
                    react_1.default.createElement(NodeIconArea, Object.assign({}, (0, Models_1.dataIt)("addField"), triggerProps, { onClick: () => {
                            setMenuOpen("field");
                        }, opened: menuOpen === "field" }),
                        react_1.default.createElement(styling_system_1.PlusLarge, { width: 18, height: 18 })))) }, ({ layerProps }) => (react_1.default.createElement(ContextMenu_1.NodeAddFieldMenu, Object.assign({}, layerProps, { node: node, hideMenu: hideMenu }))))),
            node.data.type !== graphql_js_tree_1.Instances.Directive && (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "directive", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => (react_1.default.createElement(styling_system_1.Tooltip, { title: "Add directive" },
                    react_1.default.createElement(NodeIconArea, Object.assign({}, (0, Models_1.dataIt)("addDirective"), triggerProps, { onClick: () => {
                            setMenuOpen("directive");
                        }, opened: menuOpen === "directive" }),
                        react_1.default.createElement(styling_system_1.AtSign, { width: 18, height: 18 })),
                    " ")) }, ({ layerProps }) => (react_1.default.createElement(react_1.default.Fragment, null,
                node.data.type !==
                    graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition && (react_1.default.createElement(ContextMenu_1.NodeAddDirectiveMenu, Object.assign({}, layerProps, { node: node, hideMenu: hideMenu }))),
                node.data.type ===
                    graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition && (react_1.default.createElement(ContextMenu_1.NodeDirectiveOptionsMenu, Object.assign({}, layerProps, { node: node, hideMenu: hideMenu }))))))))),
        !parentNode && (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "options", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => (react_1.default.createElement(styling_system_1.Tooltip, { title: "Node actions" },
                react_1.default.createElement(NodeIconArea, Object.assign({}, (0, Models_1.dataIt)("nodeOptions"), triggerProps, { onClick: () => {
                        setMenuOpen("options");
                    }, opened: menuOpen === "options" }),
                    react_1.default.createElement(styling_system_1.DotsHorizontal, { width: 18, height: 18 })))) }, ({ layerProps }) => (react_1.default.createElement(components_1.Menu, Object.assign({}, layerProps, { menuName: "Node options", hideMenu: hideMenu }),
            react_1.default.createElement(components_1.MenuScrollingArea, null,
                !isLibrary && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(components_1.DetailMenuItem, { onClick: onDelete }, "Delete node"),
                    isRequiredMenuValid() && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(components_1.DetailMenuItem, { onClick: () => {
                                var _a;
                                (_a = node.args) === null || _a === void 0 ? void 0 : _a.forEach((arg) => {
                                    if (arg.type.fieldType.type === graphql_js_tree_1.Options.required) {
                                        arg.type.fieldType = Object.assign({}, arg.type.fieldType.nest);
                                    }
                                });
                                const idx = tree.nodes.findIndex((n) => n.name === node.name);
                                tree.nodes.splice(idx, 1, node);
                                setTree({ nodes: tree.nodes }, false);
                            } }, "Make all fields optional"),
                        react_1.default.createElement(components_1.DetailMenuItem, { onClick: () => {
                                var _a;
                                (_a = node.args) === null || _a === void 0 ? void 0 : _a.forEach((arg) => {
                                    const argType = (0, graphql_js_tree_1.compileType)(arg.type.fieldType);
                                    if (!argType.endsWith("!")) {
                                        arg.type.fieldType = {
                                            type: graphql_js_tree_1.Options.required,
                                            nest: arg.type.fieldType,
                                        };
                                    }
                                });
                                const idx = tree.nodes.findIndex((n) => n.name === node.name);
                                tree.nodes.splice(idx, 1, node);
                                setTree({ nodes: tree.nodes }, false);
                            } }, "Make all fields required"))))),
                !(0, Resolve_1.isExtensionNode)(node.data.type) && (react_1.default.createElement(components_1.DetailMenuItem, { onClick: () => {
                        const extendNode = (0, graphql_js_tree_1.createParserField)({
                            data: {
                                type: (0, Resolve_1.ResolveExtension)(node.data.type),
                            },
                            description: undefined,
                            type: {
                                fieldType: {
                                    name: graphql_js_tree_1.TypeDefinitionDisplayMap[(0, Resolve_1.ResolveExtension)(node.data.type)],
                                    type: graphql_js_tree_1.Options.name,
                                },
                            },
                            name: node.name,
                            args: [],
                            interfaces: [],
                            directives: [],
                        });
                        tree.nodes.push(extendNode);
                        setTree(Object.assign({}, tree));
                        setSelectedNodeId({
                            value: {
                                id: extendNode.id,
                                name: extendNode.name,
                            },
                            source: "relation",
                        });
                    } }, "Extend node")),
                !(0, Resolve_1.isExtensionNode)(node.data.type) && onDuplicate && (react_1.default.createElement(components_1.DetailMenuItem, { onClick: () => {
                        setCloseMenu((prevValue) => !prevValue);
                        onDuplicate();
                    } }, "Duplicate node")),
                onInputCreate && isCreateInputValid() && (react_1.default.createElement(components_1.DetailMenuItem, { onClick: () => {
                        setCloseMenu((prevValue) => !prevValue);
                        onInputCreate();
                    } }, "Create input from node")))))))));
};
exports.TopNodeMenu = TopNodeMenu;
