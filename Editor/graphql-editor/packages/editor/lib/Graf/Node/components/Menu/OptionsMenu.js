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
exports.OptionsMenu = void 0;
const react_1 = __importDefault(require("react"));
const Menu_1 = require("./Menu");
const DetailMenuItem_1 = require("./DetailMenuItem");
const styled_1 = __importDefault(require("@emotion/styled"));
const styling_system_1 = require("@aexol-studio/styling-system");
const Main = styled_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
exports.OptionsMenu = react_1.default.forwardRef((_a, ref) => {
    var { options, onCheck, hideMenu, menuName } = _a, props = __rest(_a, ["options", "onCheck", "hideMenu", "menuName"]);
    return (react_1.default.createElement(Menu_1.Menu, Object.assign({ menuName: menuName, hideMenu: hideMenu }, props, { ref: ref }), Object.keys(options).map((n) => {
        return (react_1.default.createElement(DetailMenuItem_1.DetailMenuItem, { key: n },
            react_1.default.createElement(Main, null,
                react_1.default.createElement(styling_system_1.Radio, { label: n, position: "end", onClick: () => onCheck(n), checked: options[n] }))));
    })));
});
