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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicResize = void 0;
const react_1 = __importStar(require("react"));
const re_resizable_1 = require("re-resizable");
const DynamicResize = ({ children, width, resizeCallback, disabledClass, maxWidth = "94%", minWidth = "90", enable, }) => {
    const ref = react_1.default.createRef();
    if (disabledClass) {
        return react_1.default.createElement("div", { className: disabledClass }, children);
    }
    const enableObj = {
        left: (enable === null || enable === void 0 ? void 0 : enable.left) ? enable.left : false,
        right: (enable === null || enable === void 0 ? void 0 : enable.right) ? enable.right : false,
    };
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (width !== ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.state.width)) {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.setState({
                width,
            });
        }
    }, [width]);
    return (react_1.default.createElement(re_resizable_1.Resizable, { defaultSize: {
            width,
            height: "100%",
        }, ref: ref, style: {
            display: "flex",
            flexFlow: "row nowrap",
            zIndex: 3,
        }, onResize: resizeCallback, maxWidth: maxWidth, minWidth: minWidth, enable: enableObj }, children));
};
exports.DynamicResize = DynamicResize;
