"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const react_1 = __importDefault(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.div `
  display: flex;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  scroll-snap-align: end;
`;
const MenuItemText = styled_1.default.span `
  transition: color 0.25s ease-in-out;
  width: 100%;
  color: ${({ theme, nodeType }) => theme.colors[nodeType] ? theme.colors[nodeType] : theme.text.active};

  &:hover {
    color: ${({ theme }) => theme.accent.L1};
  }
`;
const MenuItem = ({ node, onClick, name }) => {
    return (react_1.default.createElement(Main, { onClick: onClick },
        react_1.default.createElement(MenuItemText, { nodeType: (0, graphql_js_tree_1.getTypeName)(node.type.fieldType) }, name || node.name)));
};
exports.MenuItem = MenuItem;
