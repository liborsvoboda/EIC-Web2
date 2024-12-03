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
exports.GqlEditor = void 0;
const react_1 = __importStar(require("react"));
const code_1 = require("./code");
const containers_1 = require("../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.div `
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;
`;
const GqlEditor = ({ placeholder, schema = {
    code: "",
    libraries: "",
    source: "outside",
}, gql, readonly: editorReadOnly, theme, setGql, }) => {
    const { setTheme } = (0, containers_1.useTheme)();
    const { setReadonly, readonly } = (0, containers_1.useTreesState)();
    const { sidebarSize } = (0, containers_1.useLayoutState)();
    (0, react_1.useEffect)(() => {
        if (theme) {
            setTheme(theme);
        }
    }, [theme]);
    (0, react_1.useEffect)(() => {
        setReadonly(!!editorReadOnly);
    }, [editorReadOnly]);
    return (react_1.default.createElement(Main, { onKeyDown: (e) => {
            if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
            }
        } },
        react_1.default.createElement(code_1.GqlCodePane, { gql: gql, size: sidebarSize, onChange: (v) => {
                setGql(v);
            }, schema: schema, placeholder: placeholder, readonly: readonly })));
};
exports.GqlEditor = GqlEditor;
