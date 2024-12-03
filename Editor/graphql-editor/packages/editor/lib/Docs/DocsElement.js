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
exports.DocsElement = void 0;
const FieldsList_1 = require("./FieldsList");
const InterfacesList_1 = require("./InterfacesList");
const containers_1 = require("../state/containers");
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importStar(require("react"));
const remarkable_1 = require("remarkable");
const styled_1 = __importDefault(require("@emotion/styled"));
const DocsStyles_1 = require("./DocsStyles");
const Description_1 = require("./Description");
const styling_system_1 = require("@aexol-studio/styling-system");
const Resolve_1 = require("../GraphQL/Resolve");
const Wrapper = (0, styled_1.default)(styling_system_1.Stack) `
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  padding: 5rem;
  max-width: 960px;
`;
const Top = (0, styled_1.default)(styling_system_1.Stack) `
  display: flex;
  align-items: flex-start;
`;
const Type = styled_1.default.div `
  color: ${({ theme }) => theme.colors.type};
  margin-left: 4px;
  font-size: 1.25rem;
`;
const Line = styled_1.default.div `
  border-bottom: 1px solid ${({ theme }) => theme.text.disabled}36;
  width: 100%;
`;
const DocsElement = ({ node }) => {
    const { setSelectedNodeId, tree, setTree, readonly, isLibrary } = (0, containers_1.useTreesState)();
    const [isEdit, setIsEdit] = (0, react_1.useState)(false);
    const isReadonly = readonly || isLibrary(node);
    const isExtension = (0, Resolve_1.isExtensionNode)(node.data.type);
    const setNode = (nodeName) => {
        const newSelectedNode = tree.nodes.filter((node) => node.name === nodeName);
        if (newSelectedNode.length > 0)
            setSelectedNodeId({
                value: {
                    id: newSelectedNode[0].id,
                    name: newSelectedNode[0].name,
                },
                source: "docs",
            });
    };
    const description = (0, react_1.useMemo)(() => {
        return node.description ? new remarkable_1.Remarkable().render(node.description) : "";
    }, [node.description]);
    const onSubmit = (description) => {
        const n = tree.nodes.find((0, graphql_js_tree_1.compareParserFields)(node));
        if (n) {
            n.description = description;
        }
        setTree(Object.assign({}, tree));
    };
    return (react_1.default.createElement(Wrapper, { direction: "column", gap: "1rem" },
        react_1.default.createElement(Top, { gap: "0.5rem" },
            react_1.default.createElement(DocsStyles_1.Title, { variant: "H2 SB", color: "active" }, node.name),
            react_1.default.createElement(Type, null, (0, graphql_js_tree_1.getTypeName)(node.type.fieldType))),
        !isExtension && (react_1.default.createElement(DocsStyles_1.DescWrapper, { readonly: isReadonly, isSvgVisible: !description, onClick: () => !isReadonly && setIsEdit(true) }, isEdit ? (react_1.default.createElement(Description_1.Description, { onChange: (description) => {
                onSubmit(description);
                setIsEdit(false);
            }, value: node.description || "" })) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(DocsStyles_1.DescText, { dangerouslySetInnerHTML: {
                    __html: description || "No description",
                } }),
            !isReadonly && react_1.default.createElement(styling_system_1.PenLine, null))))),
        node.interfaces && node.interfaces.length > 0 && (react_1.default.createElement(InterfacesList_1.InterfacesList, { setNode: setNode, interfacesList: node.interfaces })),
        react_1.default.createElement(Line, null),
        node.args && node.args.length > 0 && (react_1.default.createElement(FieldsList_1.FieldsList, { node: node, setNode: setNode }))));
};
exports.DocsElement = DocsElement;
