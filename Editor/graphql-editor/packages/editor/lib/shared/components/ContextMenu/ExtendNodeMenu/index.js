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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendNodeMenu = void 0;
const react_1 = __importStar(require("react"));
const Resolve_1 = require("../../../../GraphQL/Resolve");
const graphql_js_tree_1 = require("graphql-js-tree");
const trees_1 = require("../../../../state/containers/trees");
const components_1 = require("../../../../Graf/Node/components");
const sort_1 = require("../sort");
exports.ExtendNodeMenu = react_1.default.forwardRef((_a, ref) => {
    var { hideMenu } = _a, props = __rest(_a, ["hideMenu"]);
    const { tree, allNodes, setTree, setSelectedNodeId } = (0, trees_1.useTreesState)();
    const [menuSearchValue, setMenuSearchValue] = (0, react_1.useState)("");
    const creationNodes = (0, react_1.useMemo)(() => allNodes.nodes.filter((a) => ![
        graphql_js_tree_1.TypeExtension.EnumTypeExtension,
        graphql_js_tree_1.TypeExtension.InputObjectTypeExtension,
        graphql_js_tree_1.TypeExtension.InterfaceTypeExtension,
        graphql_js_tree_1.TypeExtension.ObjectTypeExtension,
        graphql_js_tree_1.TypeExtension.ScalarTypeExtension,
        graphql_js_tree_1.TypeExtension.UnionTypeExtension,
        graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition,
    ].find((o) => a.data.type === o)) || [], [allNodes]);
    const filteredNodes = (0, react_1.useMemo)(() => (0, sort_1.sortNodes)(menuSearchValue, creationNodes), [allNodes, menuSearchValue]);
    const onClickFilteredNode = (f) => {
        hideMenu();
        const extendNode = (0, graphql_js_tree_1.createParserField)({
            data: {
                type: (0, Resolve_1.ResolveExtension)(f.data.type),
            },
            description: undefined,
            type: {
                fieldType: {
                    name: graphql_js_tree_1.TypeDefinitionDisplayMap[(0, Resolve_1.ResolveExtension)(f.data.type)],
                    type: graphql_js_tree_1.Options.name,
                },
            },
            name: f.name,
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
            justCreated: true,
        });
    };
    return (react_1.default.createElement(components_1.Menu, Object.assign({}, props, { menuName: "Extend node", onScroll: (e) => e.stopPropagation(), hideMenu: hideMenu, ref: ref }),
        react_1.default.createElement(components_1.MenuSearch, { onSubmit: () => {
                if (filteredNodes.length > 0) {
                    onClickFilteredNode(filteredNodes[0]);
                }
            }, value: menuSearchValue, onChange: setMenuSearchValue }),
        react_1.default.createElement(components_1.MenuScrollingArea, null, filteredNodes.map((f) => (react_1.default.createElement(components_1.MenuItem, { key: f.name, node: f, onClick: () => {
                onClickFilteredNode(f);
            } }))))));
});
exports.ExtendNodeMenu.displayName = "ExtendNodeMenu";
