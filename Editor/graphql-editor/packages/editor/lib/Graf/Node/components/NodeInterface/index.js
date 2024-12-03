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
exports.CreateNodeInterface = exports.NodeInterface = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const ContextMenu_1 = require("../../../../shared/components/ContextMenu");
const vars_1 = require("../../../../vars");
const Menu_1 = require("../Menu");
const Models_1 = require("../../../../Models");
const NodeInterfaceBlock = styled_1.default.div `
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.interface};
  font-size: 12px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  position: relative;
  cursor: pointer;
  border: 1px solid currentColor;
  &:hover {
    border: 1px ${({ isLocked }) => (isLocked ? "solid" : "dashed")}
      currentColor;
  }
`;
const NodeInterface = ({ onDelete, onDetach, children, isLocked, }) => {
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const [, setSelectedIndex] = (0, react_1.useState)(0);
    return (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen, close: () => setMenuOpen(false), Trigger: ({ triggerProps }) => (react_1.default.createElement(NodeInterfaceBlock, Object.assign({}, triggerProps, { title: "Click to remove", onClick: (e) => {
                if (isLocked) {
                    return;
                }
                e.stopPropagation();
                setMenuOpen(true);
            } }), children)) }, ({ layerProps }) => (react_1.default.createElement(Menu_1.Menu, Object.assign({}, layerProps, { menuName: "Detach interface", onScroll: (e) => e.stopPropagation(), hideMenu: () => setMenuOpen(false) }),
        react_1.default.createElement(Menu_1.MenuScrollingArea, { controls: {
                arrowDown: () => setSelectedIndex((s) => (s + 1) % 2),
                arrowUp: () => setSelectedIndex((s) => (s - 1) % 2),
            } },
            react_1.default.createElement(Menu_1.DetailMenuItem, { onClick: onDetach }, "Detach interface"),
            react_1.default.createElement(Menu_1.DetailMenuItem, { onClick: onDelete }, "Detach interface and remove fields"))))));
};
exports.NodeInterface = NodeInterface;
const CreateNodeInterfaceBlock = styled_1.default.div `
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.text.default};
  border-radius: ${(p) => p.theme.radius}px;
  position: relative;
  cursor: pointer;
  border: 1px dashed currentColor;
  transition: ${vars_1.transition};
  svg {
    fill: ${({ theme }) => theme.colors.interface};
  }
  :hover {
    color: ${({ theme }) => theme.colors.interface};
  }
`;
const CreateNodeInterface = ({ node, isLocked, }) => {
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen, close: () => setMenuOpen(false), Trigger: ({ triggerProps }) => (react_1.default.createElement(CreateNodeInterfaceBlock, Object.assign({}, (0, Models_1.dataIt)("implementInterface"), triggerProps, { onClick: (e) => {
                if (isLocked) {
                    return;
                }
                e.stopPropagation();
                setMenuOpen(true);
            } }), "Implement interface")) }, ({ layerProps }) => (react_1.default.createElement(ContextMenu_1.NodeImplementInterfacesMenu, Object.assign({}, layerProps, { node: node, hideMenu: () => setMenuOpen(false) })))));
};
exports.CreateNodeInterface = CreateNodeInterface;
