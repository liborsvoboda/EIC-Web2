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
exports.ActiveDescription = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Models_1 = require("../../../../Models");
const Main = styled_1.default.textarea `
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.default};
  padding: 1rem;
  width: 100%;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
`;
const MainWrapper = styled_1.default.div `
  padding: 0.33rem;
  border: 0;
  border-bottom-color: ${({ theme }) => `${theme.divider.main}`};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
`;
const ActiveDescription = ({ onChange, value, isLocked }) => {
    const [text, setText] = (0, react_1.useState)(value);
    const DescriptionRef = (0, react_1.useRef)(null);
    const currentRef = (0, react_1.useRef)(value);
    const destroyRef = (0, react_1.useRef)(value);
    (0, react_1.useEffect)(() => {
        setText(value);
    }, [value]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (currentRef.current !== destroyRef.current && !isLocked) {
                onChange(destroyRef.current);
            }
        };
    }, []);
    return (react_1.default.createElement(MainWrapper, Object.assign({}, (0, Models_1.dataIt)("nodeDescription")),
        react_1.default.createElement(Main, { rows: 1, "data-gramm_editor": "false", ref: DescriptionRef, placeholder: "Put your description here", onClick: (e) => e.stopPropagation(), onMouseMove: (e) => e.stopPropagation(), onFocus: (e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            }, onBlur: (e) => {
                e.currentTarget.style.height = "auto";
                if (isLocked)
                    return;
                if (DescriptionRef.current) {
                    currentRef.current = text;
                    onChange(text);
                }
            }, onChange: (e) => {
                if (isLocked)
                    return;
                setText(e.target.value);
                destroyRef.current = e.target.value;
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
            }, value: text })));
};
exports.ActiveDescription = ActiveDescription;
