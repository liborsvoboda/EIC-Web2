"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveDirectiveName = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const constants_1 = require("../../constants");
const Main = styled_1.default.div `
  display: flex;
  flex-flow: row wrap;
  font-size: ${constants_1.GRAF_FIELD_NAME_SIZE}px;
  gap: 0.1rem;
  color: ${({ theme }) => theme.text.default};
`;
const ActiveDirectiveName = ({ name, }) => {
    return react_1.default.createElement(Main, null,
        "@",
        name);
};
exports.ActiveDirectiveName = ActiveDirectiveName;
