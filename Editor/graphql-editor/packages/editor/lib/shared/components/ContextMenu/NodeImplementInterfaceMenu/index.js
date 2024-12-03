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
exports.NodeImplementInterfacesMenu = void 0;
const react_1 = __importStar(require("react"));
const Resolve_1 = require("../../../../GraphQL/Resolve");
const graphql_js_tree_1 = require("graphql-js-tree");
const trees_1 = require("../../../../state/containers/trees");
const components_1 = require("../../../../Graf/Node/components");
const sort_1 = require("../sort");
exports.NodeImplementInterfacesMenu = react_1.default.forwardRef((_a, ref) => {
    var { node, hideMenu } = _a, props = __rest(_a, ["node", "hideMenu"]);
    const { allNodes, implementInterface } = (0, trees_1.useTreesState)();
    const [menuSearchValue, setMenuSearchValue] = (0, react_1.useState)("");
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const creationNodes = (0, react_1.useMemo)(() => {
        var _a;
        return ((_a = (0, Resolve_1.ResolveImplementInterface)(node, allNodes.nodes)) === null || _a === void 0 ? void 0 : _a.filter((a) => { var _a; return !((_a = node.interfaces) === null || _a === void 0 ? void 0 : _a.includes(a.name)); })) || [];
    }, [allNodes]);
    const filteredNodes = (0, react_1.useMemo)(() => (0, sort_1.sortNodes)(menuSearchValue, creationNodes), [creationNodes, menuSearchValue]);
    (0, react_1.useEffect)(() => {
        if (!menuSearchValue) {
            setSelectedIndex(0);
        }
    }, [menuSearchValue]);
    const fNLength = (filteredNodes === null || filteredNodes === void 0 ? void 0 : filteredNodes.length) || 1;
    const selectedNodeIndex = (selectedIndex < 0 ? fNLength - selectedIndex : selectedIndex) % fNLength;
    const onNodeClick = (f) => {
        implementInterface(node, f);
        hideMenu();
    };
    return (react_1.default.createElement(components_1.Menu, Object.assign({}, props, { menuName: "Implement interface", onScroll: (e) => e.stopPropagation(), hideMenu: () => hideMenu(), ref: ref }),
        react_1.default.createElement(components_1.MenuSearch, { onSubmit: () => {
                if (filteredNodes && filteredNodes.length > 0) {
                    onNodeClick(filteredNodes[selectedNodeIndex]);
                }
            }, value: menuSearchValue, onChange: setMenuSearchValue }),
        react_1.default.createElement(components_1.MenuScrollingArea, { controls: {
                arrowDown: () => setSelectedIndex((s) => s + 1),
                arrowUp: () => setSelectedIndex((s) => s - 1),
            } }, filteredNodes === null || filteredNodes === void 0 ? void 0 : filteredNodes.map((f, i) => (react_1.default.createElement(components_1.TypedMenuItem, { key: f.name, type: f.name, dataType: (0, graphql_js_tree_1.getTypeName)(f.type.fieldType), selected: i === selectedNodeIndex, onClick: () => {
                onNodeClick(f);
            } }))))));
});
