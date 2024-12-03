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
exports.TypedMenuItem = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const vars_1 = require("../../../../vars");
const Main = styled_1.default.div `
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  font-size: 14px;
  cursor: pointer;
  border-radius: ${(p) => p.theme.border.primary.radius};
  scroll-snap-align: end;
  background-color: ${({ isSelected, theme }) => isSelected && theme.neutrals.L5};
  transition: ${vars_1.transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;
const MenuItemName = styled_1.default.span `
  transition: ${vars_1.transition};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;
const MenuItemType = styled_1.default.span `
  font-size: 0.875rem;
  display: flex;
  align-items: flex-start;
  transition: ${vars_1.transition};
  color: ${({ theme, nodeType }) => theme.colors[nodeType] ? theme.colors[nodeType] : theme.text.active};
  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;
const TypedMenuItem = ({ type, dataType, onClick, name, selected, }) => {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        if (selected) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selected]);
    return (react_1.default.createElement(Main, { ref: ref, isSelected: selected, onClick: onClick },
        name && react_1.default.createElement(MenuItemName, null, name),
        react_1.default.createElement(MenuItemType, { nodeType: dataType }, type)));
};
exports.TypedMenuItem = TypedMenuItem;
