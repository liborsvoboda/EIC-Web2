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
exports.FilterNodes = void 0;
const dataIds_1 = require("../../../Models/dataIds");
const ContextMenu_1 = require("../ContextMenu");
const FilterNodesMenu_1 = require("./FilterNodesMenu");
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importStar(require("react"));
const FilterNodes = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(MainContent, Object.assign({}, (0, dataIds_1.dataIt)("filter"), { onClick: () => setOpen(true) }),
        react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: open, close: () => setOpen(false), Trigger: ({ triggerProps }) => (react_1.default.createElement(Main, Object.assign({}, triggerProps),
                react_1.default.createElement(styling_system_1.Tooltip, { title: "Filter by root type", position: "left-bottom" },
                    react_1.default.createElement(styling_system_1.Button, { size: "small", variant: "secondary", endAdornment: react_1.default.createElement(styling_system_1.FilterList, null) })))) }, ({ layerProps }) => (react_1.default.createElement(FilterNodesMenu_1.FilterNodesMenu, Object.assign({}, layerProps, { hideMenu: () => setOpen(false) }))))));
};
exports.FilterNodes = FilterNodes;
const MainContent = styled_1.default.div `
  position: relative;
`;
const Main = styled_1.default.div ``;
