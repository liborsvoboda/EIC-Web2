"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsList = exports.ErrorLabel = exports.ErrorWrapper = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const styling_system_1 = require("@aexol-studio/styling-system");
exports.ErrorWrapper = (0, styled_1.default)(styling_system_1.Stack) `
  font-family: ${({ theme }) => theme.fontFamilySans};
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 24rem;
  pointer-events: none;
  padding: 1rem;
`;
exports.ErrorLabel = styled_1.default.p `
  color: ${(p) => p.theme.text.default};
`;
const Errors = (0, styled_1.default)(styling_system_1.Stack) `
  pointer-events: all;
  background-color: ${(p) => p.theme.neutrals.L4};
  padding: 0.5rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;
const List = (0, styled_1.default)(styling_system_1.Stack) `
  background-color: ${(p) => p.theme.neutrals.L4};
  padding: 0.5rem;
`;
const SmallLabel = (0, styled_1.default)(styling_system_1.Typography) ``;
const IconBox = (0, styled_1.default)(styling_system_1.Stack) `
  cursor: pointer;
  color: ${(p) => p.theme.text.default};
`;
const ErrorsList = ({ children }) => {
    const [shrink, setShrink] = (0, react_1.useState)(false);
    return (react_1.default.createElement(exports.ErrorWrapper, { direction: "column", gap: "1rem", justify: "end", onClick: (e) => e.stopPropagation() },
        react_1.default.createElement(Errors, { gap: "0.5rem", direction: "column" },
            react_1.default.createElement(styling_system_1.Stack, { justify: "between" },
                react_1.default.createElement(SmallLabel, { variant: "caption", textTransform: "uppercase", fontWeight: 700 }, "problems"),
                react_1.default.createElement(IconBox, { align: "center", onClick: () => setShrink(!shrink) },
                    !shrink && react_1.default.createElement(styling_system_1.ChevronDownDouble, null),
                    shrink && react_1.default.createElement(styling_system_1.ChevronUpDouble, null))),
            !shrink && (react_1.default.createElement(List, { gap: "0.25rem", direction: "column" }, children)))));
};
exports.ErrorsList = ErrorsList;
