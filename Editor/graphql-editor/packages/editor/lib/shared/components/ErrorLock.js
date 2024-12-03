"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLock = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.div `
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.neutrals.L6};
  cursor: pointer;
`;
const Message = styled_1.default.textarea `
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  padding: 30px;
  color: ${({ theme }) => theme.alert.error.L2};
  background-color: ${({ theme }) => theme.neutrals.L6};
  border: 0;
  position: relative;
  width: 100%;
  height: 100%;
`;
const ErrorLock = ({ onClick, value, }) => {
    return (react_1.default.createElement(Main, { onClick: onClick },
        react_1.default.createElement(Message, { disabled: true, value: JSON.stringify(value) })));
};
exports.ErrorLock = ErrorLock;
