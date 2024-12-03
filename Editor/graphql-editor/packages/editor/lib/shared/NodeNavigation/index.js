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
exports.NodeNavigation = void 0;
const CollapseArrow_1 = require("../../editor/menu/CollapseArrow");
const dataIds_1 = require("../../Models/dataIds");
const components_1 = require("../components");
const io_1 = require("../hooks/io");
const NodeList_1 = require("./NodeList");
const containers_1 = require("../../state/containers");
const sort_1 = require("../../state/containers/sort");
const vars_1 = require("../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const react_1 = require("@emotion/react");
const styled_1 = __importDefault(require("@emotion/styled"));
const graphql_js_tree_1 = require("graphql-js-tree");
const react_2 = __importStar(require("react"));
const Container = styled_1.default.div `
  position: relative;
`;
const ListContainer = styled_1.default.div `
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.neutrals.L6};
  border-left: ${({ theme }) => theme.neutrals.L8} 2px solid;
  height: 100%;
  transition: width 0.5s ease-in-out;
  width: ${({ isCollapsed }) => (isCollapsed ? "50px" : "18rem")};
  overflow-y: ${({ isCollapsed }) => (isCollapsed ? "hidden" : "auto")};
`;
const ListWrapper = styled_1.default.div `
  width: 100%;
  padding: 0 1rem 100px 0;
  position: relative;
`;
const TopMenusWrapper = styled_1.default.div `
  position: sticky;
  width: 100%;
  top: 0;
  background: ${({ theme }) => theme.neutrals.L6};
  z-index: 2;
  padding: 1rem;
`;
const SearchWrapper = styled_1.default.div `
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
`;
const VisibilityBox = styled_1.default.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.disabled};
  transition: ${vars_1.transition};
  :hover {
    color: ${({ theme }) => theme.text.default};
  }
  svg {
    stroke-width: 2px;
    cursor: pointer;
  }
`;
const Header = styled_1.default.div `
  font-size: 16px;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  white-space: nowrap;
  margin-bottom: 1rem;
`;
const onShow = (0, react_1.keyframes) `
  0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
`;
const Expanded = styled_1.default.div `
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "block")};
  animation: ${onShow} 0.8s ease;
`;
const VerticalTitle = (0, styled_1.default)(Header) `
  align-items: center;
  margin-top: 1rem;
  writing-mode: tb-rl;
  text-orientation: upright;
  letter-spacing: 4px;
  display: ${({ isCollapsed }) => (isCollapsed ? "flex" : "none")};
  animation: ${onShow} 0.8s ease;
`;
const NodeNavigation = ({ isCollapsed, setIsCollapsed, }) => {
    const { allNodes, focusMode } = (0, containers_1.useTreesState)();
    const { focusedNodes, typeRelatedToFocusedNode } = (0, containers_1.useRelationNodesState)();
    const { nodesVisibilityArr, hideRelationNodes, showRelationNodes, allVisible, } = (0, containers_1.useRelationNodesState)();
    const { sortAlphabetically } = (0, sort_1.useSortState)();
    const [q, setQ] = (0, react_2.useState)("");
    const [listExpanded, setListExpanded] = (0, react_2.useState)([
        "Types",
        "Schema",
        "Interface",
        "Inputs",
        "Enums",
        "Scalars",
        "Unions",
        "Directives",
        "Type Extensions",
    ]);
    const searchRef = (0, react_2.useRef)(null);
    const { mount } = (0, io_1.useIO)();
    (0, react_2.useEffect)(() => {
        const mounted = mount({
            [io_1.KeyboardActions.FindRelation]: () => {
                var _a;
                (_a = searchRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            },
        });
        return mounted.dispose;
    }, []);
    const splittedNodes = (0, react_2.useMemo)(() => {
        const enumNodes = [];
        const unionNodes = [];
        const inputNodes = [];
        const scalarNodes = [];
        const typeNodes = [];
        const interfaceNodes = [];
        const schemaNodes = [];
        const schemaExtensionNodes = [];
        const directivesNodes = [];
        const extEnumNodes = [];
        const extUnionNodes = [];
        const extInputNodes = [];
        const extScalarNodes = [];
        const extTypeNodes = [];
        const extInterfaceNodes = [];
        const mainNodes = focusMode && focusedNodes
            ? [...focusedNodes, ...typeRelatedToFocusedNode]
            : allNodes.nodes;
        const filteredNodes = mainNodes
            .filter((n) => n.name.toLowerCase().includes(q.toLowerCase()))
            .map((el) => {
            const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
            return Object.assign(Object.assign({}, el), { isHidden: (foundNode === null || foundNode === void 0 ? void 0 : foundNode.isHidden) || false });
        });
        filteredNodes.sort(sortAlphabetically);
        filteredNodes.forEach((node) => {
            switch (node.data.type) {
                case graphql_js_tree_1.TypeExtension.ObjectTypeExtension:
                    extTypeNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeExtension.EnumTypeExtension:
                    extEnumNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeExtension.InputObjectTypeExtension:
                    extInputNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeExtension.InterfaceTypeExtension:
                    extInterfaceNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeExtension.ScalarTypeExtension:
                    extScalarNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeExtension.UnionTypeExtension:
                    extUnionNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.EnumTypeDefinition:
                    enumNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.UnionTypeDefinition:
                    unionNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition:
                    inputNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition:
                    scalarNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition:
                    interfaceNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition:
                    directivesNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition:
                    typeNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition:
                    schemaNodes.push(node);
                    break;
                case graphql_js_tree_1.TypeSystemExtension.SchemaExtension:
                    schemaExtensionNodes.push(node);
                    break;
            }
        });
        const schemaNode = schemaNodes === null || schemaNodes === void 0 ? void 0 : schemaNodes.find((n) => n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition);
        const query = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.query);
        const mutation = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.mutation);
        const subscription = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.subscription);
        const queryNode = query &&
            (typeNodes === null || typeNodes === void 0 ? void 0 : typeNodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(query.type.fieldType)));
        const mutationNode = mutation &&
            (typeNodes === null || typeNodes === void 0 ? void 0 : typeNodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(mutation.type.fieldType)));
        const subscriptionNode = subscription &&
            (typeNodes === null || typeNodes === void 0 ? void 0 : typeNodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(subscription.type.fieldType)));
        const rootNodes = [
            queryNode === null || queryNode === void 0 ? void 0 : queryNode.name,
            subscriptionNode === null || subscriptionNode === void 0 ? void 0 : subscriptionNode.name,
            mutationNode === null || mutationNode === void 0 ? void 0 : mutationNode.name,
        ];
        return {
            enumNodes,
            unionNodes,
            inputNodes,
            scalarNodes,
            typeNodes: typeNodes.filter((tn) => !rootNodes.includes(tn.name)),
            interfaceNodes,
            schemaNodes,
            queryNode,
            mutationNode,
            subscriptionNode,
            schemaExtensionNodes,
            directivesNodes,
            extEnumNodes,
            extInputNodes,
            extInterfaceNodes,
            extScalarNodes,
            extTypeNodes,
            extUnionNodes,
        };
    }, [
        allNodes,
        nodesVisibilityArr,
        q,
        focusedNodes,
        focusMode,
        typeRelatedToFocusedNode,
    ]);
    const allExtensionNodes = splittedNodes.extTypeNodes.concat(splittedNodes.extInterfaceNodes, splittedNodes.extEnumNodes, splittedNodes.extInputNodes, splittedNodes.extScalarNodes, splittedNodes.extUnionNodes);
    return (react_2.default.createElement(Container, Object.assign({}, (0, dataIds_1.dataIt)("navigation")),
        react_2.default.createElement(ListContainer, { isCollapsed: isCollapsed },
            react_2.default.createElement(CollapseArrow_1.CollapseArrow, { isCollapsed: isCollapsed, isRight: true, toggle: () => setIsCollapsed(!isCollapsed) }),
            react_2.default.createElement(VerticalTitle, { isCollapsed: isCollapsed }, "Navigation"),
            react_2.default.createElement(Expanded, { isCollapsed: isCollapsed },
                react_2.default.createElement(TopMenusWrapper, null,
                    react_2.default.createElement(SearchWrapper, null,
                        react_2.default.createElement(components_1.SearchInput, Object.assign({ ref: searchRef, onChange: (e) => {
                                setQ(e);
                            }, value: q, onClear: () => setQ(""), onSubmit: () => {
                            } }, (0, dataIds_1.dataIt)("search"))),
                        react_2.default.createElement(react_2.default.Fragment, null, allVisible ? (react_2.default.createElement(styling_system_1.Tooltip, { title: "hide all", position: "left-bottom" },
                            react_2.default.createElement(VisibilityBox, { onClick: hideRelationNodes },
                                react_2.default.createElement(styling_system_1.EyeSlash, null)))) : (react_2.default.createElement(styling_system_1.Tooltip, { title: "show all", position: "left-bottom" },
                            react_2.default.createElement(VisibilityBox, { onClick: showRelationNodes },
                                react_2.default.createElement(styling_system_1.Eye, null))))))),
                react_2.default.createElement(ListWrapper, null,
                    react_2.default.createElement(NodeList_1.SchemaList, { queryNode: splittedNodes.queryNode, mutationNode: splittedNodes.mutationNode, subscriptionNode: splittedNodes.subscriptionNode }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.typeNodes, listTitle: "Types", colorKey: "type" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.interfaceNodes, listTitle: "Interface", colorKey: "interface" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.unionNodes, listTitle: "Unions", colorKey: "union" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.inputNodes, listTitle: "Inputs", colorKey: "input" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.enumNodes, listTitle: "Enums", colorKey: "enum" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.scalarNodes, listTitle: "Scalars", colorKey: "scalar" }),
                    react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: splittedNodes.directivesNodes, listTitle: "Directives", colorKey: "directive" }),
                    !!allExtensionNodes.length && (react_2.default.createElement(NodeList_1.NodeList, { expanded: listExpanded, setExpanded: (e) => setListExpanded((le) => le.includes(e) ? le.filter((l) => l !== e) : [...le, e]), nodeList: allExtensionNodes, listTitle: "Extensions", colorKey: "extend" })))))));
};
exports.NodeNavigation = NodeNavigation;
