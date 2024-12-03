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
exports.MenuSearch = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Wrapper = styled_1.default.div `
  position: relative;
  max-width: 100%;
  padding: 0 0.5rem;
  gap: 0.5rem;
  display: flex;
`;
const Main = styled_1.default.input `
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-radius: ${(p) => p.theme.border.primary.radius};
  color: ${({ theme }) => theme.text.default};
  width: auto;
  flex: 1;
  min-width: 0;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  font-size: 14px;
  outline: 0;
  position: relative;
  border: 1px solid ${({ theme }) => theme.neutrals.L2};
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
  &:focus {
    border-color: ${({ theme }) => theme.accent.L2};
  }
`;
const MenuSearch = ({ value, onChange, onSubmit, placeholder = "Search...", }) => {
    const ref = (0, react_1.useRef)(null);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(Main, { autoFocus: true, ref: ref, onKeyDown: (e) => {
                if (e.key === "Enter") {
                    onSubmit();
                }
            }, placeholder: placeholder, type: "text", value: value, onChange: (e) => onChange(e.target.value) })));
};
exports.MenuSearch = MenuSearch;
