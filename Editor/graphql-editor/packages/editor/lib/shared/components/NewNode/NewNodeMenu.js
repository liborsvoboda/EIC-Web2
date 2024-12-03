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
exports.NewNodeMenu = void 0;
const react_1 = __importStar(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const trees_1 = require("../../../state/containers/trees");
const components_1 = require("../../../Graf/Node/components");
const styled_1 = __importDefault(require("@emotion/styled"));
const vars_1 = require("../../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const containers_1 = require("../../../state/containers");
exports.NewNodeMenu = react_1.default.forwardRef((_a, ref) => {
    var { hideMenu } = _a, props = __rest(_a, ["hideMenu"]);
    const { createToast } = (0, styling_system_1.useToasts)();
    const { setTree, tree, setSelectedNodeId, idempotentOperationAssign } = (0, trees_1.useTreesState)();
    const { setEditMode } = (0, containers_1.useRelationsState)();
    const [nodeName, setNodeName] = (0, react_1.useState)("");
    const [creating, setCreating] = (0, react_1.useState)();
    const nodeTypes = [
        graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition,
        graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition,
        graphql_js_tree_1.TypeDefinition.UnionTypeDefinition,
        graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition,
        graphql_js_tree_1.TypeDefinition.EnumTypeDefinition,
        graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition,
    ];
    const allTypes = [
        ...nodeTypes.map((nt) => ({
            data: nt,
            type: graphql_js_tree_1.TypeDefinitionDisplayMap[nt],
        })),
        {
            data: graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition,
            type: graphql_js_tree_1.TypeSystemDefinitionDisplayMap[graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition],
        },
    ];
    const createNode = (data, type) => {
        if (!nodeName) {
            createToast({
                message: "Cannot create node without name.",
                variant: "error",
            });
            return;
        }
        const doesNodeAlreadyExist = tree.nodes.find((node) => node.name.toLowerCase() === nodeName.toLowerCase() &&
            node.data.type === data);
        if (doesNodeAlreadyExist) {
            setNodeName("");
            createToast({
                message: "Node creation failed. Node already exists.",
                variant: "error",
            });
        }
        else {
            const node = (0, graphql_js_tree_1.createParserField)({
                data: {
                    type: data,
                },
                name: nodeName,
                type: Object.assign({ fieldType: {
                        name: type,
                        type: graphql_js_tree_1.Options.name,
                    } }, (data === graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition
                    ? {
                        directiveOptions: [graphql_js_tree_1.Directive.OBJECT],
                    }
                    : {})),
            });
            idempotentOperationAssign(node);
            tree.nodes.push(node);
            setTree(Object.assign({}, tree));
            setSelectedNodeId({
                source: "relation",
                value: {
                    id: node.id,
                    name: node.name,
                },
                justCreated: true,
            });
            setEditMode(node.id);
            hideMenu();
        }
    };
    return (react_1.default.createElement(components_1.Menu, Object.assign({}, props, { ref: ref, onScroll: (e) => e.stopPropagation(), hideMenu: hideMenu }),
        react_1.default.createElement(PaddingContainer, { direction: "column", gap: "0.25rem" }, allTypes.map((nt) => (react_1.default.createElement(react_1.default.Fragment, { key: nt.type },
            creating === nt.data && (react_1.default.createElement(CreationInput, { autoFocus: true, value: nodeName, placeholder: `Create ${nt.type}`, type: nt.type, onChange: (e) => {
                    setNodeName(e.target.value);
                }, onKeyDown: (e) => {
                    if (e.key === "Enter") {
                        createNode(nt.data, nt.type);
                    }
                    if (e.key === "Escape") {
                        setCreating(undefined);
                        setNodeName("");
                    }
                }, onBlur: () => {
                    setCreating(undefined);
                    setNodeName("");
                } })),
            creating !== nt.data && (react_1.default.createElement(CreateNodeItem, { type: nt.type, key: nt.type, onClick: () => {
                    setCreating(nt.data);
                } },
                react_1.default.createElement(CreateNodeName, null, nt.type),
                react_1.default.createElement(styling_system_1.Plus, null)))))))));
});
exports.NewNodeMenu.displayName = "NewNodeMenu";
const CreateNodeItem = styled_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3rem;
  font-size: 16px;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.text.default};
  }

  background-color: ${({ theme }) => theme.neutrals.L6};
  border-left: 1px solid
    ${({ type, theme }) => theme.colors[type]};
  transition: ${vars_1.transition};
  border-radius: ${(p) => p.theme.border.primary.radius};
  :hover {
    background-color: ${({ theme }) => theme.neutrals.L7};
  }
`;
const CreateNodeName = styled_1.default.div `
  color: ${({ theme }) => theme.text.default};
  font-size: 16px;
`;
const CreationInput = styled_1.default.input `
  border: 0;
  width: 100%;
  height: 3rem;
  color: ${({ theme }) => theme.text.active};
  border-left: 1px solid
    ${({ type, theme }) => theme.colors[type]};
  font-size: 16px;
  outline: 0;
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-radius: ${(p) => p.theme.border.primary.radius};
  padding: 1rem;
`;
const PaddingContainer = (0, styled_1.default)(styling_system_1.Stack) `
  padding: 1rem;
`;
