"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldPort = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const Main = styled_1.default.div `
  position: relative;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  pointer-events: all;
`;
exports.FieldPort = react_1.default.forwardRef(({ onClick, open, icons }, ref) => {
    const OpenComponent = icons.open;
    const ClosedComponent = icons.closed;
    return (react_1.default.createElement(Main, { ref: ref, className: "node-field-port", onClick: onClick },
        react_1.default.createElement(OpenerComponent, { className: "opener-icon" },
            open && OpenComponent,
            !open && ClosedComponent)));
});
const OpenerComponent = styled_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
`;
