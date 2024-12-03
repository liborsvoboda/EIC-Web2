"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseArrow = void 0;
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const Container = styled_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 24px;
  width: 20px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  background-color: ${({ theme }) => theme.neutrals.L6};
  position: absolute;
  z-index: 2;
  top: 50%;
  right: ${({ isRight }) => (isRight ? "unset" : 0)};
  left: ${({ isRight }) => (isRight ? 0 : "unset")};
  translate: ${({ isRight }) => (isRight ? "-50% -50%" : "50% -50%")};
  color: ${({ theme }) => theme.text.default};
  transition: color 0.25s ease;
  background-color: ${(p) => p.theme.neutrals.L4};

  &:hover {
    color: ${({ theme }) => theme.accent.L2};
  }

  svg {
    transform: ${({ isCollapsed, isRight }) => {
    if (isRight)
        return isCollapsed ? "rotate(0deg)" : "rotate(180deg)";
    return isCollapsed ? "rotate(180deg)" : "rotate(0deg)";
}};
  }
`;
const CollapseArrow = ({ isCollapsed, toggle, isRight, }) => {
    return (react_1.default.createElement(Container, { isRight: isRight, isCollapsed: isCollapsed, onClick: () => toggle() },
        react_1.default.createElement(styling_system_1.ChevronLeftDouble, { height: 16 })));
};
exports.CollapseArrow = CollapseArrow;
