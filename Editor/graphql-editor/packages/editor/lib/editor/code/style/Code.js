"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLock = exports.CodeContainer = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
exports.CodeContainer = styled_1.default.div `
  flex: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  border-right: 2px solid ${({ theme }) => theme.neutrals.L8};

  &.monaco-scrollable-element {
    padding: 8px;
  }

  &.vs-dark .monaco-scrollable-element > .scrollbar {
    background: ${({ theme }) => theme.neutrals.L6};
    &.invisible {
      opacity: 0.5;
    }
  }

  &.vs-dark .monaco-scrollable-element > .scrollbar > .slider {
    background: ${({ theme }) => theme.neutrals.L6};
  }
`;
exports.ErrorLock = styled_1.default.div `
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.neutrals.L6};
  cursor: pointer;
  color: ${({ theme }) => theme.alert.error.L2};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  padding: 30px;
`;
