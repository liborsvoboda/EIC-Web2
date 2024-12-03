"use strict";
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
exports.EditorDialog = void 0;
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const EditorDialog = (_a) => {
    var { children, title } = _a, props = __rest(_a, ["children", "title"]);
    return (react_1.default.createElement(styling_system_1.Dialog, Object.assign({ backdrop: "blur" }, props),
        react_1.default.createElement(DialogContent, null,
            react_1.default.createElement(styling_system_1.Stack, { direction: "column", gap: "0.5rem" },
                react_1.default.createElement(Title, { variant: "h6" }, title),
                children))));
};
exports.EditorDialog = EditorDialog;
const Title = (0, styled_1.default)(styling_system_1.Typography) `
  border-bottom: ${(p) => p.theme.divider.main} 1px solid;
  margin-bottom: 1rem;
`;
const DialogContent = styled_1.default.div `
  background-color: ${(p) => p.theme.neutrals.L6};
  min-width: 480px;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
