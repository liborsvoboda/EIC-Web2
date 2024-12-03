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
exports.PanZoom = void 0;
const react_1 = __importStar(require("react"));
const trees_1 = require("../../state/containers/trees");
const containers_1 = require("../../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const html_to_image_1 = require("html-to-image");
const vars = __importStar(require("../../vars"));
const react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
const styling_system_1 = require("@aexol-studio/styling-system");
const ControlsBar_1 = require("./ControlsBar");
const LinesDiagram_1 = require("./LinesDiagram/LinesDiagram");
const nodeFilter_1 = require("../shared/nodeFilter");
const useClickDetector_1 = require("../../shared/hooks/useClickDetector");
const Models_1 = require("../../Models");
const MAX_SCHEMA_SIZE = 20000 * 20000;
const PanZoom = ({ nodes, hide, parentClass, title }) => {
    const mainRef = (0, react_1.useRef)(null);
    const wrapperRef = (0, react_1.useRef)(null);
    const linesRef = (0, react_1.useRef)(null);
    const { setSelectedNodeId, readonly: isReadOnly, activeNode, } = (0, trees_1.useTreesState)();
    const { isClick, mouseDown } = (0, useClickDetector_1.useClickDetector)();
    const { createToast } = (0, styling_system_1.useToasts)();
    const { setTransform } = (0, react_zoom_pan_pinch_1.useControls)();
    const { getContext } = (0, react_zoom_pan_pinch_1.useTransformContext)();
    const { editMode, baseTypesOn, fieldsOn, omitNodes, ctrlToZoom, libraryNodesOn, printPreviewReady, printPreviewActive, } = (0, containers_1.useRelationsState)();
    const [largeSimulationLoading, setLargeSimulationLoading] = (0, react_1.useState)(false);
    const [zoomingMode, setZoomingMode] = (0, react_1.useState)("pan");
    const [viewportParams, setViewportParams] = (0, react_1.useState)();
    const [paramsBeforeExport, setParamsBeforeExport] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [loadingCounter, setLoadingCounter] = (0, react_1.useState)(30);
    const [isGraphReloadingAfterPrint, setIsGraphReloadingAfterPrint] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const intervalRef = (0, react_1.useRef)();
    const filteredNodes = (0, react_1.useMemo)(() => {
        return (0, nodeFilter_1.nodeFilter)(nodes, {
            baseTypesOn,
            omitNodes,
            libraryNodesOn,
        });
    }, [nodes, baseTypesOn, omitNodes, libraryNodesOn]);
    const downloadPng = (0, react_1.useCallback)(() => {
        var _a;
        if ((viewportParams === null || viewportParams === void 0 ? void 0 : viewportParams.height) && (viewportParams === null || viewportParams === void 0 ? void 0 : viewportParams.width)) {
            if (viewportParams.height * viewportParams.width > MAX_SCHEMA_SIZE) {
                createToast({
                    message: "Schema is too big to be printed as a whole. Please focus some nodes or hide part of them before printing.",
                    variant: "error",
                    closeMethod: {
                        method: "closeManually",
                    },
                });
                return;
            }
            setLoading(true);
            const ctx = getContext();
            setParamsBeforeExport({
                x: ctx.state.positionX,
                y: ctx.state.positionY,
                scale: ctx.state.scale,
            });
            (_a = linesRef.current) === null || _a === void 0 ? void 0 : _a.triggerResimulation(true);
        }
    }, [mainRef, JSON.stringify(viewportParams)]);
    (0, react_1.useEffect)(() => {
        if (largeSimulationLoading) {
            setLoadingCounter(Math.floor(filteredNodes.length / 100));
            intervalRef.current = setInterval(() => setLoadingCounter((lc) => (lc - 1 >= 0 ? lc - 1 : 0)), 1000);
        }
        else {
            clearInterval(intervalRef.current);
            setLoadingCounter(30);
        }
    }, [largeSimulationLoading]);
    (0, react_1.useEffect)(() => {
        if (paramsBeforeExport &&
            viewportParams &&
            printPreviewReady &&
            printPreviewActive &&
            !hide &&
            !isGraphReloadingAfterPrint) {
            setTimeout(() => {
                var _a;
                setTransform(-viewportParams.x, -viewportParams.y, 1, 0);
                setSelectedNodeId({ source: "relation", value: undefined });
                const refElem = (_a = mainRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
                if (!refElem || refElem === null || !viewportParams) {
                    return;
                }
                (0, html_to_image_1.toPng)(refElem, {
                    cacheBust: true,
                    width: viewportParams.width,
                    height: viewportParams.height,
                })
                    .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = `${"relation_view"}`;
                    link.href = dataUrl;
                    link.click();
                })
                    .catch((e) => {
                    const message = e instanceof Error ? e.message : "Unknown error";
                    createToast({
                        message: "Export failed: " + message,
                        variant: "error",
                    });
                })
                    .finally(() => {
                    var _a;
                    setIsGraphReloadingAfterPrint(true);
                    (_a = linesRef.current) === null || _a === void 0 ? void 0 : _a.triggerResimulation(false);
                });
            }, 2000);
        }
    }, [
        JSON.stringify(paramsBeforeExport),
        JSON.stringify(viewportParams),
        printPreviewReady,
        hide,
        isGraphReloadingAfterPrint,
        printPreviewActive,
    ]);
    (0, react_1.useEffect)(() => {
        if (paramsBeforeExport &&
            isGraphReloadingAfterPrint &&
            !largeSimulationLoading &&
            !printPreviewReady) {
            setTimeout(() => {
                setTransform(paramsBeforeExport.x, paramsBeforeExport.y, paramsBeforeExport.scale, 0);
                setParamsBeforeExport(undefined);
                setIsGraphReloadingAfterPrint(false);
                setLoading(false);
            }, 1000);
        }
    }, [isGraphReloadingAfterPrint, largeSimulationLoading]);
    (0, react_1.useEffect)(() => {
        var _a;
        const listenerDown = (ev) => {
            if (ev.key === "Control" ||
                ev.metaKey ||
                ev.key === "OS" ||
                ev.key === "Meta") {
                setZoomingMode("zoom");
            }
        };
        const listenerUp = (ev) => {
            if (ev.key === "Control" ||
                ev.metaKey ||
                ev.key === "OS" ||
                ev.key === "Meta")
                setZoomingMode("pan");
        };
        const scrollListenerZoom = (e) => {
            e.preventDefault();
        };
        const scrollListener = (e) => {
            e.preventDefault();
            if (!wrapperRef.current)
                return;
            if (zoomingMode === "zoom" || !ctrlToZoom) {
                return;
            }
            const factor = (e.detail
                ? -e.detail / 3
                : "wheelDelta" in e
                    ? e.wheelDelta
                    : 0) * 2;
            const transformState = getContext().instance.transformState;
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                const newX = e.deltaX
                    ? (transformState.positionX || 0) + factor
                    : transformState.positionX || 0;
                setTransform(newX, transformState.positionY, transformState.scale, 300, "easeOutCubic");
                return;
            }
            else {
                const newY = e.deltaY
                    ? (transformState.positionY || 0) + factor
                    : transformState.positionY || 0;
                setTransform(transformState.positionX, newY, transformState.scale, 300, "easeOutCubic");
            }
        };
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener("wheel", scrollListener);
        document.addEventListener("wheel", scrollListenerZoom);
        document.addEventListener("keydown", listenerDown);
        document.addEventListener("keyup", listenerUp);
        return () => {
            var _a;
            document.removeEventListener("keydown", listenerDown);
            document.removeEventListener("keyup", listenerUp);
            document.removeEventListener("wheel", scrollListenerZoom);
            (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("wheel", scrollListener);
        };
    }, [ref, zoomingMode, ctrlToZoom]);
    const memoizedDiagram = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(LinesDiagram_1.LinesDiagram, { ref: linesRef, hide: hide, isReadOnly: isReadOnly, nodes: filteredNodes, setViewportParams: (p) => setViewportParams(p), fieldsOn: fieldsOn, nodesWithoutFilter: nodes, parentClass: parentClass, mainRef: mainRef, loading: largeSimulationLoading, setLoading: (e) => {
                setLargeSimulationLoading(e);
            } }));
    }, [
        filteredNodes,
        largeSimulationLoading,
        setLargeSimulationLoading,
        fieldsOn,
        hide,
    ]);
    return (react_1.default.createElement(Wrapper, Object.assign({}, (0, Models_1.dataIt)("relationView"), { className: parentClass }),
        react_1.default.createElement(ControlsBar_1.ControlsBar, { title: title, triggerResimulation: () => {
                var _a;
                (_a = linesRef.current) === null || _a === void 0 ? void 0 : _a.triggerResimulation();
            }, downloadPng: downloadPng }),
        react_1.default.createElement(Main, { ref: wrapperRef, onMouseDown: mouseDown, onClick: (e) => {
                if (!isClick(e))
                    return;
                setSelectedNodeId({ source: "relation", value: undefined });
            } },
            react_1.default.createElement(react_zoom_pan_pinch_1.TransformComponent, { wrapperStyle: {
                    flex: 1,
                    height: "100%",
                    filter: activeNode && editMode ? `blur(4px)` : `blur(0px)`,
                    transition: "all 0.25s ease-in-out",
                } }, memoizedDiagram),
            largeSimulationLoading && (react_1.default.createElement(LoadingContainer, null,
                react_1.default.createElement(styling_system_1.Loader, { size: "lg" }),
                react_1.default.createElement("span", null,
                    "Loading ",
                    filteredNodes.length,
                    " nodes estimated time:",
                    " ",
                    loadingCounter,
                    " seconds"))),
            loading && (react_1.default.createElement(LoadingContainer, null,
                react_1.default.createElement(styling_system_1.Loader, { size: "lg" }),
                react_1.default.createElement("span", null,
                    "Exporting ",
                    filteredNodes.length,
                    " nodes"))))));
};
exports.PanZoom = PanZoom;
const Wrapper = styled_1.default.div `
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: ${vars.transition};
  background: ${({ theme }) => theme.neutrals.L6};
`;
const LoadingContainer = styled_1.default.div `
  position: absolute;
  z-index: 2;
  inset: 0;
  padding: 2rem;
  gap: 1rem;
  color: ${({ theme }) => theme.text.default};
  background-color: ${({ theme }) => theme.neutrals.L6};
  inset: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Main = styled_1.default.div `
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  font-family: ${({ theme }) => theme.fontFamily};
  justify-content: flex-end;
  cursor: grab;
`;
