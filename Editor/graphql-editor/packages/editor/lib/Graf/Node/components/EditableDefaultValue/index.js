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
exports.EditableDefaultValue = void 0;
const react_1 = __importStar(require("react"));
const vars_1 = require("../../../../vars");
const styled_1 = __importDefault(require("@emotion/styled"));
const Input = styled_1.default.input `
  border: 0;
  background: ${({ theme }) => theme.neutrals.L6}00;
  color: ${({ theme }) => theme.text.default};
  min-width: 18ch;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 12px;
  text-align: left;
  padding: 0.25rem 1rem;
  outline: 0;
  transition: ${vars_1.transition};
  border-bottom: 1px solid ${({ theme }) => theme.accent.L2}00;
  :focus {
    outline: 0;
    border-bottom: 1px solid ${({ theme }) => theme.accent.L2};
  }
`;
const EditableDefaultValue = ({ value, onChange, style = {}, }) => {
    const [editedValue, setEditedValue] = (0, react_1.useState)(value);
    const checkEdit = () => {
        if (onChange) {
            if (editedValue !== value) {
                onChange(editedValue);
            }
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input, { disabled: !onChange, value: editedValue, style: Object.assign({ width: `${editedValue.length + 5}ch` }, style), onBlur: checkEdit, placeholder: "Default value", onKeyDown: (e) => {
                if (e.key === "Enter") {
                    checkEdit();
                }
            }, onChange: (e) => setEditedValue(e.target.value) })));
};
exports.EditableDefaultValue = EditableDefaultValue;
