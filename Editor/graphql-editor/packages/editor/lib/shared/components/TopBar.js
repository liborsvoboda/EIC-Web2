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
exports.TopBar = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const io_1 = require("../hooks/io");
const TopBarComponent = styled_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  height: 60px;
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: ${({ theme }) => theme.neutrals.L6}ee;
`;
const TopBar = ({ children }) => {
    const { mount } = (0, io_1.useIO)();
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const mounted = mount({
            [io_1.KeyboardActions.FindRelation]: () => {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
            },
        });
        return mounted.dispose;
    }, []);
    return react_1.default.createElement(TopBarComponent, null, children);
};
exports.TopBar = TopBar;
