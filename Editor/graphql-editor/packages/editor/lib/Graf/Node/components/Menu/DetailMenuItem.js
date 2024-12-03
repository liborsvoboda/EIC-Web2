"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailMenuItem = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.div `
  display: flex;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  scroll-snap-align: end;
`;
const MenuItemText = styled_1.default.span `
  transition: color 0.25s ease-in-out;
  color: ${({ theme }) => theme.text.active};
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.accent.L2};
  }
`;
const DetailMenuItem = ({ children, onClick, }) => {
    return (react_1.default.createElement(Main, { onClick: onClick },
        react_1.default.createElement(MenuItemText, null, children)));
};
exports.DetailMenuItem = DetailMenuItem;
