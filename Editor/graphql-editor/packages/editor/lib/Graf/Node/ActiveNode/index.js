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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveNode = exports.NodeType = exports.NodeName = void 0;
const react_1 = __importStar(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const Field_1 = require("../Field");
const components_1 = require("../components");
const trees_1 = require("../../../state/containers/trees");
const TopNodeMenu_1 = require("./TopNodeMenu");
const Resolve_1 = require("../../../GraphQL/Resolve");
const dnd_1 = require("../../../shared/dnd");
const styled_1 = __importDefault(require("@emotion/styled"));
const EditableText_1 = require("../Field/EditableText");
const ActiveGrafType_1 = require("../Field/ActiveGrafType");
const DirectivePlacement_1 = require("../components/DirectivePlacement");
const draggable_1 = require("../../state/draggable");
const containers_1 = require("../../../state/containers");
const styling_system_1 = require("@aexol-studio/styling-system");
const Models_1 = require("../../../Models");
const OpenedNode = styled_1.default.div `
  position: absolute;
  z-index: 4;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  pointer-events: none;
`;
const MainNodeArea = styled_1.default.div `
  position: relative;
  transition: border-color 0.25s ease-in-out;
  border-color: ${({ theme }) => `${theme.divider.main}`};
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  animation-name: fadeIn;
  animation-duration: 0.25s;
  overflow-y: hidden;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
const NodeContainer = styled_1.default.div `
  /* position: relative; */
  break-inside: avoid;
  min-width: 24rem;
  max-height: 100%;
  background-color: ${({ theme }) => theme.neutrals.L5};
  display: flex;
  flex-flow: column nowrap;
  border-radius: ${(p) => p.theme.border.primary.radius};
  pointer-events: all;
  border: 1px solid ${({ theme }) => `${theme.divider.main}`};
`;
const NodeFieldsContainer = styled_1.default.div `
  overflow-y: auto;
  flex: 1;
`;
const NodeFields = styled_1.default.div ``;
const DirectivePlacements = styled_1.default.div `
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-x: scroll;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider.main};
`;
const NodeInterfaces = styled_1.default.div `
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
  max-width: 100%;
  flex-flow: row wrap;
  overflow-x: auto;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.divider.main};
`;
const DndContainer = styled_1.default.div `
  &.drag-over {
    padding-top: 30px;
  }
`;
const GapBar = styled_1.default.div `
  width: 100%;
  height: 100%;
  pointer-events: all;
  background-color: ${({ theme }) => theme.neutrals.L6}99;
  transition: 0.25s background-color ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.neutrals.L6}11;
  }
`;
const NodeArea = styled_1.default.div `
  min-width: 80%;
  left: 30%;
  position: absolute;
  padding: 3.5rem 2rem;
  height: 100%;
`;
exports.NodeName = styled_1.default.div `
  margin-right: 10px;
  color: ${({ theme }) => theme.text.active};
  user-select: none;
`;
exports.NodeType = styled_1.default.div `
  margin-right: auto;
`;
const EditableTitle = {
    fontWeight: 500,
};
const ActiveNode = (_a) => {
    var _b, _c, _d, _e;
    var { node, parentNode } = _a, sharedProps = __rest(_a, ["node", "parentNode"]);
    const { setEditMode, editMode } = (0, containers_1.useRelationsState)();
    const { setSelectedNodeId } = (0, trees_1.useTreesState)();
    const [openedNode, setOpenedNode] = (0, react_1.useState)();
    const [dragOverName, setDragOverName] = (0, react_1.useState)("");
    const { draggable } = (0, draggable_1.useDraggable)();
    const { allNodes, selectedNodeId, parentTypes, readonly, updateNode, renameNode, deImplementInterface, isLibrary, updateFieldOnNode, removeNode, removeFieldFromNode, idempotentOperationAssign, } = (0, trees_1.useTreesState)();
    const libraryNode = isLibrary(node);
    const isLocked = !!sharedProps.readonly || libraryNode || readonly;
    const findNodeByField = (field) => {
        return field
            ? allNodes.nodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(field.type.fieldType) &&
                !(0, Resolve_1.isExtensionNode)(n.data.type))
            : undefined;
    };
    const dropHandler = (e, endNodeName) => {
        e.stopPropagation();
        const startNodeName = e.dataTransfer.getData("startName");
        if (endNodeName === startNodeName)
            return;
        if (node.args) {
            const startIdx = node.args.findIndex((a) => a.name === startNodeName);
            const endIdx = node.args.findIndex((a) => a.name === endNodeName);
            node.args.splice(endIdx, 0, node.args.splice(startIdx, 1)[0]);
        }
        updateNode(node);
    };
    (0, react_1.useEffect)(() => {
        setOpenedNode(undefined);
    }, [(_b = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.id]);
    const openedNodeNode = openedNode
        ? openedNode.type === "directives"
            ? node.directives[openedNode.index]
            : openedNode.type === "args"
                ? node.args[openedNode.index]
                : openedNode.type === "directiveOutput"
                    ? findNodeByField(node.directives[openedNode.index])
                    : findNodeByField(node.args[openedNode.index])
        : undefined;
    return (react_1.default.createElement(NodeContainer, Object.assign({}, (0, Models_1.dataIt)("activeNode"), { className: `NodeBackground-${(0, graphql_js_tree_1.getTypeName)(node.type.fieldType)}`, onWheel: (e) => e.stopPropagation(), onClick: (e) => e.stopPropagation() }),
        !(0, Resolve_1.isExtensionNode)(node.data.type) && (react_1.default.createElement(components_1.ActiveDescription, { onChange: (d) => {
                if (d === node.description)
                    return;
                updateNode(node, () => {
                    node.description = d;
                });
            }, isLocked: isLocked, value: node.description || "" })),
        node.data.type === graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition && (react_1.default.createElement(DirectivePlacements, null,
            !isLocked && react_1.default.createElement(DirectivePlacement_1.CreateNodeDirective, { node: node, isLocked: isLocked }), (_c = node.type.directiveOptions) === null || _c === void 0 ? void 0 :
            _c.map((d) => (react_1.default.createElement(styling_system_1.Tooltip, { key: d, title: "Detach directive" },
                react_1.default.createElement(DirectivePlacement_1.DirectivePlacement, { isLocked: isLocked, onDelete: () => {
                        updateNode(node, () => {
                            var _a;
                            node.type.directiveOptions =
                                (_a = node.type.directiveOptions) === null || _a === void 0 ? void 0 : _a.filter((oldDirective) => oldDirective !== d);
                        });
                    } }, d)))))),
        (node.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition ||
            node.data.type === graphql_js_tree_1.TypeExtension.ObjectTypeExtension ||
            node.data.type === graphql_js_tree_1.TypeExtension.InterfaceTypeExtension ||
            node.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition) && (react_1.default.createElement(NodeInterfaces, { isHidden: libraryNode && !node.interfaces.length },
            !isLocked && react_1.default.createElement(components_1.CreateNodeInterface, { node: node, isLocked: isLocked }),
            node.interfaces.map((i) => (react_1.default.createElement(styling_system_1.Tooltip, { key: i, title: "Interface options" },
                react_1.default.createElement(components_1.NodeInterface, { isLocked: isLocked, onDelete: () => deImplementInterface(node, i), onDetach: () => {
                        var _a;
                        node.interfaces = (_a = node.interfaces) === null || _a === void 0 ? void 0 : _a.filter((oldInterface) => oldInterface !== i);
                        node.args = node.args.map((a) => {
                            var _a;
                            return (Object.assign(Object.assign({}, a), { fromInterface: (_a = a.fromInterface) === null || _a === void 0 ? void 0 : _a.filter((fi) => fi !== i) }));
                        });
                        updateNode(node);
                    } }, i)))))),
        openedNodeNode && openedNode && (react_1.default.createElement(OpenedNode, null,
            react_1.default.createElement(GapBar, { onClick: (e) => {
                    e.stopPropagation();
                    if (openedNode) {
                        setOpenedNode(undefined);
                    }
                } }),
            react_1.default.createElement(NodeArea, null,
                react_1.default.createElement(draggable_1.DraggableProvider, null,
                    react_1.default.createElement(exports.ActiveNode, Object.assign({}, sharedProps, { readonly: isLocked, parentNode: openedNode.type === "args" || openedNode.type === "directives"
                            ? {
                                indexInParent: openedNode.index,
                                node: node,
                            }
                            : undefined, node: openedNodeNode })))))),
        react_1.default.createElement(MainNodeArea, { onClick: (e) => {
                e.stopPropagation();
            } },
            libraryNode && react_1.default.createElement(FromLibrary, null, "External library"),
            react_1.default.createElement(NodeTitle, null,
                react_1.default.createElement(exports.NodeName, null,
                    parentNode && (react_1.default.createElement(EditableText_1.EditableText, { style: EditableTitle, value: `${parentNode.node.name}.` })),
                    isLocked && (react_1.default.createElement(EditableText_1.EditableText, { style: EditableTitle, value: node.name })),
                    !isLocked && (react_1.default.createElement(EditableText_1.EditableText, { style: EditableTitle, value: node.name, exclude: Object.keys(parentTypes).filter((pt) => pt !== node.name), onChange: (newName) => {
                            if (parentNode) {
                                updateFieldOnNode(parentNode.node, parentNode.indexInParent, Object.assign(Object.assign({}, node), { name: newName }), editMode);
                                return;
                            }
                            idempotentOperationAssign(Object.assign(Object.assign({}, node), { name: newName }));
                            renameNode(node, newName);
                        } }))),
                react_1.default.createElement(exports.NodeType, null,
                    react_1.default.createElement(ActiveGrafType_1.ActiveGrafType, { type: node.type })),
                !(!!sharedProps.readonly || readonly) && (react_1.default.createElement(TopNodeMenu_1.TopNodeMenu, Object.assign({}, sharedProps, { parentNode: parentNode === null || parentNode === void 0 ? void 0 : parentNode.node, isLibrary: libraryNode, onDelete: () => {
                        removeNode(node);
                        if (!(parentNode === null || parentNode === void 0 ? void 0 : parentNode.node)) {
                            setEditMode("");
                            setSelectedNodeId({
                                value: undefined,
                                source: "relation",
                            });
                        }
                    }, onDuplicate: () => { var _a; return (_a = sharedProps.onDuplicate) === null || _a === void 0 ? void 0 : _a.call(sharedProps, node); }, onInputCreate: () => { var _a; return (_a = sharedProps.onInputCreate) === null || _a === void 0 ? void 0 : _a.call(sharedProps, node); }, node: node })))),
            react_1.default.createElement(NodeFieldsContainer, null,
                react_1.default.createElement(NodeFields, null, (_d = node.directives) === null || _d === void 0 ? void 0 :
                    _d.map((d, i) => {
                        const outputDisabled = !allNodes.nodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(d.type.fieldType));
                        return (react_1.default.createElement(Field_1.ActiveField, { isLocked: isLocked, parentNode: node, key: d.name + i, onInputClick: () => {
                                setOpenedNode((oN) => (oN === null || oN === void 0 ? void 0 : oN.index) === i && oN.type === "directives"
                                    ? undefined
                                    : { type: "directives", index: i });
                            }, onOutputClick: () => {
                                setOpenedNode((oN) => (oN === null || oN === void 0 ? void 0 : oN.index) === i && oN.type === "directiveOutput"
                                    ? undefined
                                    : { type: "directiveOutput", index: i });
                            }, node: d, inputOpen: (openedNode === null || openedNode === void 0 ? void 0 : openedNode.type) === "directives" && (openedNode === null || openedNode === void 0 ? void 0 : openedNode.index) === i, outputDisabled: outputDisabled, outputOpen: (openedNode === null || openedNode === void 0 ? void 0 : openedNode.type) === "directiveOutput" &&
                                (openedNode === null || openedNode === void 0 ? void 0 : openedNode.index) === i, onUpdate: (updatedNode) => {
                                updateNode(node, () => {
                                    node.directives[i] = updatedNode;
                                });
                            }, onDelete: () => {
                                setOpenedNode(undefined);
                                updateNode(node, () => node.directives.splice(i, 1));
                            } }));
                    }), (_e = node.args) === null || _e === void 0 ? void 0 :
                    _e.map((a, i) => {
                        const outputDisabled = !allNodes.nodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(a.type.fieldType));
                        return (react_1.default.createElement(DndContainer, { key: a.name, id: a.name, onDrop: (e) => {
                                setDragOverName("");
                                dropHandler(e, a.name);
                            }, onDragEnd: () => setDragOverName(""), onDragLeave: (e) => {
                                (0, dnd_1.dragLeaveHandler)(e);
                            }, onDragOver: (e) => {
                                setDragOverName(a.name);
                                (0, dnd_1.dragOverHandler)(e);
                            }, className: a.name === dragOverName ? `drag-over` : "" },
                            react_1.default.createElement("div", { draggable: !isLocked && draggable, onDragStart: (e) => {
                                    (0, dnd_1.dragStartHandler)(e, a.name);
                                } },
                                react_1.default.createElement(Field_1.ActiveField, { parentNode: node, isLocked: isLocked || a.fromLibrary, key: a.name, onInputClick: () => {
                                        setOpenedNode((oN) => (oN === null || oN === void 0 ? void 0 : oN.index) === i && oN.type === "args"
                                            ? undefined
                                            : { type: "args", index: i });
                                    }, onOutputClick: () => {
                                        setOpenedNode((oN) => (oN === null || oN === void 0 ? void 0 : oN.index) === i && oN.type === "output"
                                            ? undefined
                                            : { type: "output", index: i });
                                    }, node: a, inputOpen: (openedNode === null || openedNode === void 0 ? void 0 : openedNode.type) === "args" && (openedNode === null || openedNode === void 0 ? void 0 : openedNode.index) === i, outputDisabled: outputDisabled, outputOpen: (openedNode === null || openedNode === void 0 ? void 0 : openedNode.type) === "output" && (openedNode === null || openedNode === void 0 ? void 0 : openedNode.index) === i, onDelete: () => removeFieldFromNode(node, a, editMode), onUpdate: (updatedNode) => {
                                        updateFieldOnNode(node, i, updatedNode, editMode);
                                    } }))));
                    })))),
        react_1.default.createElement("div", { style: { marginBottom: "1rem" } })));
};
exports.ActiveNode = ActiveNode;
const NodeTitle = styled_1.default.div `
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text.default};
  padding: 1rem;
  user-select: none;
`;
const FromLibrary = (0, styled_1.default)(NodeTitle) `
  padding: 1rem 1rem 0;
`;
