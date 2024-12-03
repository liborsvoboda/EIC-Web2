"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const framer_motion_1 = require("framer-motion");
const react_1 = __importDefault(require("react"));
const react_laag_1 = require("react-laag");
const ContextMenu = ({ children, Trigger, isOpen, close }) => {
    const { renderLayer, triggerProps, layerProps } = (0, react_laag_1.useLayer)({
        isOpen,
        onOutsideClick: close,
        auto: true,
        placement: "bottom-start",
        containerOffset: 8,
        triggerOffset: 8,
        arrowOffset: 8,
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        Trigger({ triggerProps }),
        renderLayer(react_1.default.createElement(framer_motion_1.AnimatePresence, null, isOpen && children({ layerProps })))));
};
exports.ContextMenu = ContextMenu;
