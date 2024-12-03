"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescWrapper = exports.Title = exports.TypeText = exports.FieldText = exports.DescText = void 0;
const vars_1 = require("../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
exports.DescText = styled_1.default.div `
  color: ${({ theme }) => theme.text.default};
  padding: 0.5rem;
  font-size: 0.875rem;
  p {
    font-size: 0.875rem;
    margin: 0;
  }
  h1 {
    font-size: 0.875rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;
exports.FieldText = styled_1.default.p `
  color: ${({ theme }) => theme.text.active};
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
  padding-left: 2px;
`;
exports.TypeText = styled_1.default.p `
  color: ${({ isScalar, theme: { colors } }) => isScalar ? colors.scalar : colors.type};
  font-size: 1rem;
  padding-left: 8px;
  margin: 0;
  transition: ${vars_1.transition};
  line-height: 1.6;
  &:hover {
    color: ${({ isScalar, theme }) => isScalar ? theme.colors.scalar : theme.text.active};
  }
`;
exports.Title = (0, styled_1.default)(styling_system_1.Typography) `
  color: ${({ theme }) => theme.text.active};
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
exports.DescWrapper = styled_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  background-color: ${(p) => p.theme.neutrals.L5};
  cursor: ${({ readonly }) => (readonly ? "auto" : "pointer")};

  svg {
    color: ${({ theme }) => theme.text.default};
    opacity: ${({ isSvgVisible }) => (isSvgVisible ? 1 : 0)};
    transition: opacity 0.5s;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;
