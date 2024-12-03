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
exports.SearchInput = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const vars = __importStar(require("../../vars"));
const styling_system_1 = require("@aexol-studio/styling-system");
const Wrapper = styled_1.default.div `
  position: relative;
  flex: 1;
  display: flex;
`;
const Main = styled_1.default.input `
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-radius: ${(p) => p.theme.border.primary.radius};
  color: ${({ theme }) => theme.text.default};
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 2.5rem 0 0.5rem;
  font-size: 14px;
  outline: 0;
  position: relative;
  border-color: ${(p) => p.theme.neutrals.L2};
  border-width: 1px;
  border-style: solid;
  transition: ${vars.transition};
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
  :focus {
    border-color: ${({ theme }) => theme.accent.L2};
  }
`;
const IconContainerStyle = styled_1.default.span `
  position: absolute;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  right: 0.5rem;
`;
const SearchIconContainer = (0, styled_1.default)(IconContainerStyle) `
  margin-left: 15px;
  color: ${({ theme }) => theme.text.disabled};
`;
exports.SearchInput = react_1.default.forwardRef(({ value, onChange, onSubmit, placeholder = "Search...", icon = "search" }, ref) => {
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(Main, { ref: ref, onKeyDown: (e) => {
                if (e.key === "Enter") {
                    onSubmit();
                }
            }, placeholder: placeholder, type: "text", value: value, onChange: (e) => onChange(e.target.value) }),
        react_1.default.createElement(SearchIconContainer, null,
            icon === "search" && react_1.default.createElement(styling_system_1.Search, null),
            icon === "add" && react_1.default.createElement(styling_system_1.Plus, null))));
});
exports.SearchInput.displayName = "SearchInput";
