"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const StyledHeading = styled_1.default.h1 `
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.disabled};
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const Heading = ({ heading }) => {
    return react_1.default.createElement(StyledHeading, null, heading);
};
exports.Heading = Heading;
