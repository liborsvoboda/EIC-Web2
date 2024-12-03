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
exports.FieldsList = void 0;
const ArgumentsList_1 = require("./ArgumentsList");
const Resolve_1 = require("../GraphQL/Resolve");
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importStar(require("react"));
const remarkable_1 = require("remarkable");
const DocsStyles_1 = require("./DocsStyles");
const styled_1 = __importDefault(require("@emotion/styled"));
const containers_1 = require("../state/containers");
const Description_1 = require("./Description");
const styling_system_1 = require("@aexol-studio/styling-system");
const vars_1 = require("../vars");
const md = new remarkable_1.Remarkable();
const ListWrapper = (0, styled_1.default)(styling_system_1.Stack) `
  margin-left: 10px;
  flex: 1 1 auto;
  min-height: 0;
  word-wrap: normal;
`;
const FieldsWrapper = (0, styled_1.default)(styling_system_1.Stack) `
  border: 1px solid ${(p) => p.theme.neutrals.L5};
  position: relative;
  padding: 1rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;
const TitleWrapper = styled_1.default.div `
  display: flex;
  cursor: ${({ isType }) => (isType ? "pointer" : "default")};
`;
const IconWrapper = styled_1.default.div `
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  transition: ${vars_1.transition};
  color: ${(p) => p.theme.text.disabled};
  &:hover {
    color: ${(p) => p.theme.text.active};
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;
const FieldsList = ({ node, setNode }) => {
    var _a;
    const { setTree, tree, readonly, isLibrary } = (0, containers_1.useTreesState)();
    const [isEdit, setIsEdit] = (0, react_1.useState)(false);
    const [editedIdx, setEditedIdx] = (0, react_1.useState)(-1);
    const isReadonly = readonly || isLibrary(node);
    const onSubmit = (0, react_1.useCallback)((description, idx) => {
        if (node.args) {
            node.args[idx].description = description;
            const changedIdx = tree.nodes.findIndex((0, graphql_js_tree_1.compareParserFields)(node));
            tree.nodes[changedIdx] = node;
            setTree(tree);
        }
    }, [node, tree]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocsStyles_1.Title, { variant: "H3 SB" }, "Fields"),
        react_1.default.createElement(ListWrapper, { direction: "column", gap: "1rem" }, (_a = node.args) === null || _a === void 0 ? void 0 : _a.map((arg, i) => {
            var _a;
            return (react_1.default.createElement(FieldsWrapper, { key: i, direction: "column", gap: "0.5rem" },
                react_1.default.createElement(TitleWrapper, { isType: !Resolve_1.BuiltInScalars.some((scalar) => scalar.name === (0, graphql_js_tree_1.getTypeName)(arg.type.fieldType)) },
                    react_1.default.createElement(DocsStyles_1.FieldText, null, arg.name),
                    arg.args && ((_a = arg.args) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (react_1.default.createElement(ArgumentsList_1.ArgumentsList, { argument: arg, setNode: setNode })) : (react_1.default.createElement(DocsStyles_1.TypeText, { isScalar: Resolve_1.BuiltInScalars.some((scalar) => scalar.name === (0, graphql_js_tree_1.getTypeName)(arg.type.fieldType)), onClick: () => setNode((0, graphql_js_tree_1.getTypeName)(arg.type.fieldType)) }, (0, graphql_js_tree_1.compileType)(arg.type.fieldType)))),
                isEdit && editedIdx === i && (react_1.default.createElement(Description_1.Description, { onChange: (description) => {
                        onSubmit(description, i);
                        setIsEdit(false);
                    }, value: arg.description || "" })),
                (!isEdit || editedIdx !== i) && !!arg.description && (react_1.default.createElement(DocsStyles_1.DescWrapper, { isSvgVisible: !arg.description, readonly: isReadonly, onClick: () => {
                        if (isReadonly)
                            return;
                        setEditedIdx(i);
                        setIsEdit(true);
                    } },
                    react_1.default.createElement(DocsStyles_1.DescText, { dangerouslySetInnerHTML: {
                            __html: md.render(arg.description || "No description"),
                        } }))),
                !isReadonly && (react_1.default.createElement(IconWrapper, { onClick: () => {
                        if (isReadonly)
                            return;
                        setEditedIdx(i);
                        setIsEdit(true);
                    } },
                    react_1.default.createElement(styling_system_1.PenLine, null)))));
        }))));
};
exports.FieldsList = FieldsList;
