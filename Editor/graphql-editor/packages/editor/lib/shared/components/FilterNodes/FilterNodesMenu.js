"use strict";
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
exports.FilterNodesMenu = void 0;
const react_1 = __importDefault(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const components_1 = require("../../../Graf/Node/components");
const styled_1 = __importDefault(require("@emotion/styled"));
const vars_1 = require("../../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const containers_1 = require("../../../state/containers");
exports.FilterNodesMenu = react_1.default.forwardRef((_a, ref) => {
    var { hideMenu } = _a, props = __rest(_a, ["hideMenu"]);
    const { omitNodes, setOmitNodes, setBaseTypesOn, baseTypesOn } = (0, containers_1.useRelationsState)();
    const selectableFilters = [
        ["interface", graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition],
        ["scalar", graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition],
        ["union", graphql_js_tree_1.TypeDefinition.UnionTypeDefinition],
        ["enum", graphql_js_tree_1.TypeDefinition.EnumTypeDefinition],
        ["type", graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition],
        ["input", graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition],
        ["directive", graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition],
    ];
    return (react_1.default.createElement(components_1.Menu, Object.assign({}, props, { ref: ref, onScroll: (e) => e.stopPropagation(), hideMenu: hideMenu }),
        react_1.default.createElement(PaddingContainer, { direction: "column", gap: "0.25rem" },
            react_1.default.createElement(CreateNodeItem, { active: baseTypesOn, onClick: () => {
                    setBaseTypesOn(!baseTypesOn);
                } },
                react_1.default.createElement(CreateNodeName, null, "built-in fields"),
                baseTypesOn && react_1.default.createElement(styling_system_1.Check, null)),
            selectableFilters.map(([label, value]) => (react_1.default.createElement(CreateNodeItem, { type: label, key: label, active: !(omitNodes === null || omitNodes === void 0 ? void 0 : omitNodes[value]), onClick: () => {
                    setOmitNodes(Object.assign(Object.assign({}, omitNodes), { [value]: !(omitNodes === null || omitNodes === void 0 ? void 0 : omitNodes[value]) }));
                } },
                react_1.default.createElement(CreateNodeName, null, label),
                !(omitNodes === null || omitNodes === void 0 ? void 0 : omitNodes[value]) && react_1.default.createElement(styling_system_1.Check, null)))))));
});
const CreateNodeItem = styled_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2rem;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ theme, active }) => active ? theme.text.default : theme.text.disabled};
  svg {
    color: ${({ theme }) => theme.text.default};
    height: 1rem;
  }

  background-color: ${({ theme }) => theme.neutrals.L6};
  border-left: 1px solid
    ${({ type, theme }) => type
    ? theme.colors[type]
    : theme.text.default};
  transition: ${vars_1.transition};
  border-radius: ${(p) => p.theme.border.primary.radius};
  :hover {
    background-color: ${({ theme }) => theme.neutrals.L7};
  }
`;
const CreateNodeName = styled_1.default.div `
  font-size: 0.75rem;
`;
const PaddingContainer = (0, styled_1.default)(styling_system_1.Stack) `
  padding: 1rem;
`;
