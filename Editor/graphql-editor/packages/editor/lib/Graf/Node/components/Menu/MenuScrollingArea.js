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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuScrollingArea = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const Main = styled_1.default.div `
  color: ${({ theme }) => theme.text.default};
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  scroll-snap-type: y mandatory;
`;
const MenuScrollingArea = (_a) => {
    var { children, controls } = _a, props = __rest(_a, ["children", "controls"]);
    (0, react_1.useEffect)(() => {
        function downHandler(e) {
            var _a, _b;
            const { key } = e;
            if (key === "ArrowDown") {
                e.preventDefault();
                (_a = controls === null || controls === void 0 ? void 0 : controls.arrowDown) === null || _a === void 0 ? void 0 : _a.call(controls);
            }
            if (key === "ArrowUp") {
                e.preventDefault();
                (_b = controls === null || controls === void 0 ? void 0 : controls.arrowUp) === null || _b === void 0 ? void 0 : _b.call(controls);
            }
        }
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);
    return react_1.default.createElement(Main, Object.assign({}, props), children);
};
exports.MenuScrollingArea = MenuScrollingArea;
