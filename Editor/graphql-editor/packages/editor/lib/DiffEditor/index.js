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
exports.DiffEditor = void 0;
const code_1 = require("../editor/code");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const sort_1 = require("../state/containers/sort");
const styling_system_1 = require("@aexol-studio/styling-system");
const Main = styled_1.default.div `
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.neutrals.L6};
`;
const TopBar = styled_1.default.div `
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.neutrals.L8};
`;
const Heading = styled_1.default.h1 `
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const AZContainer = styled_1.default.div `
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${({ theme, active }) => active ? theme.accent.L2 : theme.text.disabled};
`;
const DiffEditor = ({ schemas }) => {
    const { sortAlphabetically } = (0, sort_1.useSortState)();
    const [isSortActive, setIsSortActive] = (0, react_1.useState)(true);
    const sortSchema = (schema) => {
        if (!schema)
            return "";
        const tree = graphql_js_tree_1.Parser.parse(schema);
        tree.nodes.sort(sortAlphabetically);
        tree.nodes = tree.nodes.filter((n) => { var _a; return ((_a = n.args) === null || _a === void 0 ? void 0 : _a.sort(sortAlphabetically)) && n; });
        return graphql_js_tree_1.TreeToGraphQL.parse(tree);
    };
    return (react_1.default.createElement(Main, null,
        react_1.default.createElement(TopBar, null,
            react_1.default.createElement(Heading, null, "DIFF VIEW"),
            react_1.default.createElement(AZContainer, { active: isSortActive, onClick: () => setIsSortActive((s) => !s) },
                react_1.default.createElement(styling_system_1.Arrow_AZ, null))),
        react_1.default.createElement(CompareBar, { justify: "between", align: "center" },
            react_1.default.createElement(styling_system_1.Typography, { fontWeight: 600, variant: "body2" }, schemas[0].name),
            react_1.default.createElement(styling_system_1.Typography, { fontWeight: 600, variant: "body2" }, schemas[1].name)),
        react_1.default.createElement(code_1.DiffEditorPane, { schema: isSortActive
                ? { content: sortSchema(schemas[1].content), name: schemas[1].name }
                : schemas[1], newSchema: isSortActive
                ? { content: sortSchema(schemas[0].content), name: schemas[0].name }
                : schemas[0], size: `100vw-50px` })));
};
exports.DiffEditor = DiffEditor;
const CompareBar = (0, styled_1.default)(styling_system_1.Stack) `
  padding-top: 3rem;
  padding-left: 64px;
  padding-right: 32px;
  position: absolute;
  width: 100%;
`;
