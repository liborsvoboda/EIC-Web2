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
exports.ActiveGrafType = void 0;
const react_1 = __importStar(require("react"));
const Compile_1 = require("../../../GraphQL/Compile");
const styled_1 = __importDefault(require("@emotion/styled"));
const constants_1 = require("../../constants");
const Models_1 = require("../../../Models");
exports.ActiveGrafType = react_1.default.forwardRef(({ type, parentTypes, onClick, children }, ref) => {
    const compiledType = (0, react_1.useMemo)(() => (0, Compile_1.compileTypeOptions)({ type }), [JSON.stringify(type)]);
    const sType = (0, react_1.useMemo)(() => (0, Compile_1.compileScalarTypes)(type), [JSON.stringify(type)]);
    const color = (parentTypes === null || parentTypes === void 0 ? void 0 : parentTypes[sType]) ? parentTypes[sType] : sType;
    return (react_1.default.createElement(Type, Object.assign({}, (0, Models_1.dataIt)("fieldType"), { ref: ref, color: color, cursor: onClick ? "pointer" : "default", onClick: onClick }),
        react_1.default.createElement("span", null, compiledType),
        children));
});
const Type = styled_1.default.a `
  color: ${({ color, theme }) => color
    ? theme.colors[color]
        ? theme.colors[color]
        : theme.text.default
    : theme.text.default};
  cursor: ${({ cursor }) => cursor};
  font-size: ${constants_1.GRAF_FIELD_TYPE_SIZE}px;
  position: relative;
`;
