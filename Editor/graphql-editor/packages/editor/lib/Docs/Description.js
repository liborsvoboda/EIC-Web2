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
exports.Description = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.textarea `
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.default};
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0.5rem;
  resize: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamilySans};
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
`;
const Description = ({ onChange, value, isLocked }) => {
    const [text, setText] = (0, react_1.useState)(value);
    const DescriptionRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setText(value);
    }, [value]);
    (0, react_1.useEffect)(() => {
        if (DescriptionRef.current) {
            DescriptionRef.current.style.height = "auto";
            DescriptionRef.current.style.height =
                DescriptionRef.current.scrollHeight + "px";
        }
    }, [DescriptionRef.current]);
    if (isLocked) {
        if (!value) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        return (react_1.default.createElement(Main, { disabled: true, rows: 1, "data-gramm_editor": "false", ref: DescriptionRef, value: text }));
    }
    return (react_1.default.createElement(Main, { rows: 1, "data-gramm_editor": "false", ref: DescriptionRef, placeholder: "Put your description here", onClick: (e) => e.stopPropagation(), onMouseMove: (e) => e.stopPropagation(), autoFocus: true, onBlur: (e) => {
            e.currentTarget.style.height = "auto";
            if (DescriptionRef.current) {
                onChange(text);
            }
        }, onChange: (e) => {
            setText(e.target.value);
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }, value: text }));
};
exports.Description = Description;
