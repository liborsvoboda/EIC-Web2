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
exports.NodeTypeOptionsMenu = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../../../Graf/Node/components");
const graphql_js_tree_1 = require("graphql-js-tree");
const configureOpts = (node) => {
    const theType = (0, graphql_js_tree_1.compileType)(node.type.fieldType);
    const t = (0, graphql_js_tree_1.getTypeName)(node.type.fieldType);
    const opts = {
        [`${t}`]: theType === `${t}`,
        [`${t}!`]: theType === `${t}!`,
        [`[${t}]`]: theType === `[${t}]`,
        [`[${t}!]`]: theType === `[${t}!]`,
        [`[${t}!]!`]: theType === `[${t}!]!`,
        [`[${t}]!`]: theType === `[${t}]!`,
    };
    return opts;
};
exports.NodeTypeOptionsMenu = react_1.default.forwardRef((_a, ref) => {
    var { node, hideMenu, onCheck } = _a, props = __rest(_a, ["node", "hideMenu", "onCheck"]);
    const [opts, setOpts] = (0, react_1.useState)(configureOpts(node));
    (0, react_1.useEffect)(() => {
        setOpts(configureOpts(node));
    }, [node.type.fieldType]);
    return (react_1.default.createElement(components_1.OptionsMenu, Object.assign({}, props, { ref: ref, menuName: "Node kind", hideMenu: hideMenu, options: opts, onCheck: (o) => {
            onCheck((0, graphql_js_tree_1.decompileType)(o));
        } })));
});
