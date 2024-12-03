"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfacesList = void 0;
const react_1 = __importDefault(require("react"));
const vars_1 = require("../vars");
const styled_1 = __importDefault(require("@emotion/styled"));
const DocsStyles_1 = require("./DocsStyles");
const Interface = styled_1.default.p `
  color: ${({ theme }) => theme.colors.interface};
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  padding: 4px 12px;
  margin: 0;
  margin-right: 4px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 4px;
  transition: ${vars_1.transition};

  &:hover {
    color: ${({ theme }) => theme.text.default};
  }
`;
const InterfacesWrapper = styled_1.default.div `
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 18px;
  margin-left: 14px;
`;
const InterfacesList = ({ interfacesList, setNode, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocsStyles_1.Title, { variant: "H3 SB" }, "Interfaces"),
        react_1.default.createElement(InterfacesWrapper, null, interfacesList.map((name) => (react_1.default.createElement(Interface, { key: name, onClick: () => setNode(name) }, name))))));
};
exports.InterfacesList = InterfacesList;
