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
exports.Docs = void 0;
const DocsElement_1 = require("./DocsElement");
const io_1 = require("../shared/hooks/io");
const containers_1 = require("../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const Wrapper = styled_1.default.div `
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.neutrals.L6};
  flex-direction: row;
  align-items: stretch;
`;
const SelectedNodeWrapper = styled_1.default.div `
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.neutrals.L6};
  overflow-x: hidden;
  height: 100%;
`;
const Docs = () => {
    const { activeNode, queryNode } = (0, containers_1.useTreesState)();
    const searchRef = (0, react_1.useRef)(null);
    const { mount } = (0, io_1.useIO)();
    (0, react_1.useEffect)(() => {
        const mounted = mount({
            [io_1.KeyboardActions.FindRelation]: () => {
                var _a;
                (_a = searchRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            },
        });
        return mounted.dispose;
    }, []);
    const node = activeNode || queryNode;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(SelectedNodeWrapper, null, node && react_1.default.createElement(DocsElement_1.DocsElement, { node: node }))));
};
exports.Docs = Docs;
