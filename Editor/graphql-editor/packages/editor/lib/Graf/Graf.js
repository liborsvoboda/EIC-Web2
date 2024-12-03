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
exports.Graf = void 0;
const react_1 = __importStar(require("react"));
const Node_1 = require("./Node");
const trees_1 = require("../state/containers/trees");
const getScalarFields_1 = require("./utils/getScalarFields");
const graphql_js_tree_1 = require("graphql-js-tree");
const styled_1 = __importDefault(require("@emotion/styled"));
const io_1 = require("../shared/hooks/io");
const draggable_1 = require("./state/draggable");
const containers_1 = require("../state/containers");
const styling_system_1 = require("@aexol-studio/styling-system");
const framer_motion_1 = require("framer-motion");
const SubNodeContainer = styled_1.default.div `
  font-family: ${({ theme }) => theme.fontFamilySans};
  transition: max-width 0.5s ease-in-out;
  max-width: 80%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  padding: 3.5rem 2rem;
  height: 100%;
`;
const SubNodeWrapper = (0, styled_1.default)(framer_motion_1.motion.div) `
  width: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  overflow-x: auto;
`;
const Graf = ({ node }) => {
    var _a;
    const { tree, setTree, snapshots, selectedNodeId, readonly, setSelectedNodeId, scalars, undo, updateNode, activeNode, redo, } = (0, trees_1.useTreesState)();
    const { setEditMode } = (0, containers_1.useRelationsState)();
    const { mount } = (0, io_1.useIO)();
    const { createToast } = (0, styling_system_1.useToasts)();
    (0, react_1.useEffect)(() => {
        const keyEvents = mount({
            [io_1.KeyboardActions.Undo]: undo,
            [io_1.KeyboardActions.Redo]: redo,
        });
        return keyEvents.dispose;
    }, [snapshots, tree, (_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id, readonly]);
    const exit = () => {
        setEditMode("");
        setSelectedNodeId({
            source: "relation",
            value: selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value,
        });
        if (activeNode) {
            setSelectedNodeId({
                source: "relation",
                value: undefined,
            });
        }
    };
    const cancelCreate = () => {
        const allNodes = tree.nodes.filter((n) => { var _a; return n.id !== ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id); });
        setSelectedNodeId({ source: "relation", value: undefined });
        setTree({ nodes: allNodes });
        setEditMode("");
    };
    const handleNodeDuplication = (0, react_1.useCallback)((nodeToDuplicate) => {
        for (let i = 1;; i++) {
            const rest = __rest(nodeToDuplicate, []);
            const newName = `${nodeToDuplicate === null || nodeToDuplicate === void 0 ? void 0 : nodeToDuplicate.name}Copy${i}`;
            const newId = (0, graphql_js_tree_1.generateNodeId)(newName, nodeToDuplicate.data.type, nodeToDuplicate.args);
            const copyOfNodeAlreadyExists = tree.nodes.find((node) => node.id === newId);
            if (!copyOfNodeAlreadyExists) {
                const duplicatedNode = JSON.parse(JSON.stringify((0, graphql_js_tree_1.createParserField)(Object.assign(Object.assign({}, rest), { id: newId, name: newName }))));
                setTree({ nodes: [...tree.nodes, duplicatedNode] });
                setSelectedNodeId({
                    value: {
                        id: duplicatedNode.id,
                        name: duplicatedNode.name,
                    },
                    source: "relation",
                });
                return;
            }
        }
    }, [tree.nodes]);
    return (react_1.default.createElement(SubNodeWrapper, { onClick: (e) => {
            e.stopPropagation();
            if (selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.justCreated)
                return;
            exit();
        }, transition: { duration: 0.2 }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
        react_1.default.createElement(SubNodeContainer, null,
            react_1.default.createElement(draggable_1.DraggableProvider, null,
                react_1.default.createElement(Node_1.ActiveNode, { readonly: readonly, onDuplicate: handleNodeDuplication, onInputCreate: (nodeToCreateInput) => {
                        const createdInput = (0, graphql_js_tree_1.createParserField)({
                            args: (0, getScalarFields_1.getScalarFields)(node, scalars),
                            interfaces: [],
                            directives: [],
                            type: {
                                fieldType: {
                                    name: "input",
                                    type: graphql_js_tree_1.Options.name,
                                },
                            },
                            data: { type: graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition },
                            name: nodeToCreateInput.name + "Input",
                        });
                        updateNode(createdInput, () => {
                            tree.nodes.push(createdInput);
                            setSelectedNodeId({
                                value: {
                                    id: createdInput.id,
                                    name: createdInput.name,
                                },
                                source: "relation",
                            });
                        });
                    }, node: node })),
            (selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.justCreated) && (react_1.default.createElement(CreateActions, { justify: "end", gap: "1rem" },
                react_1.default.createElement(styling_system_1.Button, { variant: "neutral", onClick: (e) => {
                        e.stopPropagation();
                        cancelCreate();
                    } }, "Cancel"),
                react_1.default.createElement(styling_system_1.Button, { onClick: (e) => {
                        e.stopPropagation();
                        if ((activeNode === null || activeNode === void 0 ? void 0 : activeNode.args.length) ||
                            (activeNode === null || activeNode === void 0 ? void 0 : activeNode.data.type) ===
                                graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition ||
                            (activeNode === null || activeNode === void 0 ? void 0 : activeNode.data.type) === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition) {
                            exit();
                            return;
                        }
                        createToast({
                            message: "Node must have fields to be created",
                            variant: "error",
                        });
                    } }, "Create"))))));
};
exports.Graf = Graf;
const CreateActions = (0, styled_1.default)(styling_system_1.Stack) `
  padding: 1rem 0;
`;
