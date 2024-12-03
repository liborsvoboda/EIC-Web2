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
exports.Relation = void 0;
const PanZoom_1 = require("./PanZoom/PanZoom");
const containers_1 = require("../state/containers");
const react_1 = __importStar(require("react"));
const react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
const Graf_1 = require("../Graf/Graf");
const styled_1 = __importDefault(require("@emotion/styled"));
const framer_motion_1 = require("framer-motion");
const BackgroundFTUX_1 = require("./FTUX/BackgroundFTUX");
const router_1 = require("../state/containers/router");
const ImportSchema_1 = require("../shared/dialogs/ImportSchema");
const Relation = ({ setInitialSchema, title, schema }) => {
    const { activeNode, focusMode, allNodes } = (0, containers_1.useTreesState)();
    const { filteredFocusedNodes, filteredRelationNodes, filteredTypeRelatedToFocusedNode, } = (0, containers_1.useRelationNodesState)();
    const { editMode, ctrlToZoom } = (0, containers_1.useRelationsState)();
    const { set, routes } = (0, router_1.useRouter)();
    const [popupsState, setPopupsState] = (0, react_1.useState)({
        import: false,
    });
    const isFocus = !!(focusMode && filteredFocusedNodes);
    const nodesToShow = (0, react_1.useMemo)(() => {
        return [
            ...(filteredFocusedNodes || []),
            ...filteredTypeRelatedToFocusedNode,
        ];
    }, [filteredFocusedNodes, filteredTypeRelatedToFocusedNode]);
    const viewport = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_zoom_pan_pinch_1.TransformWrapper, { initialScale: 1, disabled: isFocus, maxScale: 1.5, wheel: {
                    activationKeys: ctrlToZoom ? ["Control", "OS", "Meta"] : [],
                    step: 0.03,
                }, minScale: 0.1, limitToBounds: false, zoomAnimation: { disabled: true } },
                react_1.default.createElement(PanZoom_1.PanZoom, { hide: isFocus, parentClass: "all", nodes: filteredRelationNodes, title: title }))));
    }, [filteredRelationNodes, isFocus, ctrlToZoom]);
    return (react_1.default.createElement(RelationContainer, null,
        allNodes.nodes.length ? (react_1.default.createElement(react_1.default.Fragment, null,
            viewport,
            isFocus && (react_1.default.createElement(FocusOverlay, null,
                react_1.default.createElement(react_zoom_pan_pinch_1.TransformWrapper, { initialScale: 1, maxScale: 1.5, wheel: {
                        activationKeys: ctrlToZoom ? ["Control", "OS", "Meta"] : [],
                        step: 0.03,
                    }, panning: { velocityDisabled: false }, minScale: 0.1, limitToBounds: false, zoomAnimation: { disabled: true } },
                    react_1.default.createElement(PanZoom_1.PanZoom, { title: title, parentClass: "focus", nodes: nodesToShow })))),
            react_1.default.createElement(framer_motion_1.AnimatePresence, null, !!editMode && activeNode && react_1.default.createElement(Graf_1.Graf, { node: activeNode })))) : (react_1.default.createElement(framer_motion_1.AnimatePresence, null,
            react_1.default.createElement(BackgroundFTUX_1.BackgroundFTUX, { showCode: routes.code === "off", onStartCoding: () => {
                    set(Object.assign(Object.assign({}, routes), { code: routes.code === "off" ? "on" : "off", source: "internal" }), "internal");
                }, onImport: () => {
                    setPopupsState({ import: true });
                }, schema: schema }))),
        react_1.default.createElement(ImportSchema_1.ImportSchema, { onClose: () => setPopupsState({ import: false }), onImport: (s) => {
                setInitialSchema(s);
            }, open: popupsState.import })));
};
exports.Relation = Relation;
const RelationContainer = styled_1.default.div `
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.neutrals.L6};
`;
const FocusOverlay = styled_1.default.div `
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
