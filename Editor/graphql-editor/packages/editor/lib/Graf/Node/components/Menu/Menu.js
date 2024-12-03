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
exports.Menu = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const framer_motion_1 = require("framer-motion");
const Wrapper = (0, styled_1.default)(framer_motion_1.motion.div) `
  width: 220px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  border: 1px solid ${(p) => p.theme.neutrals.L3};
  font-family: ${({ theme }) => theme.fontFamilySans};
  z-index: 2;
`;
const Content = styled_1.default.div `
  background: ${({ theme }) => theme.neutrals.L4};
  border-radius: ${(p) => p.theme.border.primary.radius};
  padding: 0;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Title = styled_1.default.div `
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.contrast};
  border-bottom: 1px solid ${(p) => p.theme.neutrals.L2};
`;
exports.Menu = react_1.default.forwardRef((_a, ref) => {
    var { children, hideMenu, menuName } = _a, props = __rest(_a, ["children", "hideMenu", "menuName"]);
    return (react_1.default.createElement(Wrapper, Object.assign({}, props, { ref: ref, transition: { duration: 0.2 }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }),
        react_1.default.createElement(Content, null,
            menuName && react_1.default.createElement(Title, null, menuName),
            children)));
});
exports.Menu.displayName = "Menu";
