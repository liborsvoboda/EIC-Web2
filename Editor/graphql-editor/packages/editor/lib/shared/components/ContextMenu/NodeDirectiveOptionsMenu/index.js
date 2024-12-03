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
exports.NodeDirectiveOptionsMenu = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../../../Graf/Node/components");
const graphql_js_tree_1 = require("graphql-js-tree");
const trees_1 = require("../../../../state/containers/trees");
const configureOpts = (node) => {
    const { directiveOptions = [] } = node.type;
    const opts = {};
    Object.keys(graphql_js_tree_1.Directive).map((k) => {
        const v = graphql_js_tree_1.Directive[k];
        opts[v] = !!directiveOptions.includes(v);
    });
    return opts;
};
exports.NodeDirectiveOptionsMenu = react_1.default.forwardRef((_a, ref) => {
    var { node, hideMenu } = _a, props = __rest(_a, ["node", "hideMenu"]);
    const { tree, setTree } = (0, trees_1.useTreesState)();
    const [opts, setOpts] = (0, react_1.useState)(configureOpts(node));
    (0, react_1.useEffect)(() => {
        setOpts(configureOpts(node));
    }, [node.type.directiveOptions]);
    return (react_1.default.createElement(components_1.OptionsMenu, Object.assign({}, props, { ref: ref, hideMenu: hideMenu, options: opts, menuName: 'Add directive', onCheck: (o) => {
            var _a, _b;
            const turnOff = !!((_a = node.type.directiveOptions) === null || _a === void 0 ? void 0 : _a.includes(o));
            if (turnOff) {
                node.type.directiveOptions = (_b = node.type.directiveOptions) === null || _b === void 0 ? void 0 : _b.filter((opt) => opt !== o);
            }
            else {
                node.type.directiveOptions = [
                    ...(node.type.directiveOptions || []),
                    o,
                ];
            }
            setTree(Object.assign({}, tree));
        } })));
});
