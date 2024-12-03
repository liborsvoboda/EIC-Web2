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
exports.LinesDiagram = void 0;
const react_1 = __importStar(require("react"));
const trees_1 = require("../../../state/containers/trees");
const Node_1 = require("./Node");
const styled_1 = __importDefault(require("@emotion/styled"));
const graphql_editor_worker_1 = require("graphql-editor-worker");
const useMarkFramePaint_1 = require("../../../shared/hooks/useMarkFramePaint");
const containers_1 = require("../../../state/containers");
const Lines_1 = require("./Lines");
const react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
const useDomManager_1 = require("../../../shared/hooks/useDomManager");
const DOMClassNames_1 = require("../../../shared/hooks/DOMClassNames");
const nodeLook_1 = require("../../shared/nodeLook");
const Main = styled_1.default.div `
  position: relative;
  overflow-x: visible;
  font-family: ${({ theme }) => theme.fontFamilySans};
  align-items: flex-start;
  display: flex;
  padding: 20px;
  gap: 4rem;
  flex-wrap: nowrap;
  animation: show 1 0.5s ease-in-out;
  min-height: 100%;
  margin: auto;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const NodePane = styled_1.default.div `
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
  transform-origin: center;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
`;
exports.LinesDiagram = react_1.default.forwardRef((props, ref) => {
    const { nodes, setLoading, mainRef, isReadOnly } = props;
    const { isLibrary, setSelectedNodeId, selectedNodeId, focusMode, relatedToSelectedTypes, activeNode, } = (0, trees_1.useTreesState)();
    const { cullNodes, LoDNodes, lodCache, changeZoomInTopBar, markRelated, selectNode, deselectNodes, } = (0, useDomManager_1.useDomManagerTs)(props.parentClass);
    const { setTransform, instance } = (0, react_zoom_pan_pinch_1.useControls)();
    const { editMode, printPreviewActive, printPreviewReady, setPrintPreviewReady, setPrintPreviewActive, } = (0, containers_1.useRelationsState)();
    const { transformState: { scale }, } = (0, react_zoom_pan_pinch_1.useTransformContext)();
    const [simulatedNodes, setSimulatedNodes] = (0, react_1.useState)();
    const [connections, setConnections] = (0, react_1.useState)();
    const zoomToNode = (nodeX, nodeY) => {
        const wrapper = instance.wrapperComponent;
        if (wrapper) {
            const size = wrapper.getBoundingClientRect();
            const s = instance.transformState.scale;
            const transformTo = {
                x: -nodeX * s + size.width / 2.0,
                y: -nodeY * s + size.height / 2.0,
            };
            setTransform(transformTo.x, transformTo.y, s, 200, "easeOut");
        }
    };
    (0, react_1.useEffect)(() => {
        const selectDisposable = DOMClassNames_1.DOMEvents.selectNode.disposable((nodeId) => {
            if (nodeId) {
                const toNode = simulatedNodes === null || simulatedNodes === void 0 ? void 0 : simulatedNodes.find((sn) => sn.parserField.id === nodeId);
                selectNode(nodeId);
                if (toNode) {
                    const rts = relatedToSelectedTypes(toNode.parserField);
                    const ids = rts === null || rts === void 0 ? void 0 : rts.map((n) => n.id);
                    if (ids === null || ids === void 0 ? void 0 : ids.length) {
                        markRelated(ids);
                    }
                    zoomToNode(toNode.x, toNode.y);
                }
            }
            else {
                deselectNodes();
            }
        });
        return () => selectDisposable.dispose();
    }, [simulatedNodes]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        triggerResimulation: (printingProcessingFlag) => {
            setLoading(true);
            if (printingProcessingFlag !== undefined) {
                setPrintPreviewActive(printingProcessingFlag);
            }
            graphql_editor_worker_1.GraphQLEditorWorker.simulateSort({
                nodes,
                options: {
                    iterations: 200,
                    maxWidth: printingProcessingFlag
                        ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
                        : nodeLook_1.RELATION_NODE_MAX_WIDTH,
                    maxFields: printingProcessingFlag
                        ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS
                        : nodeLook_1.RELATION_NODE_MAX_FIELDS,
                    ignoreAlphaCalculation: true,
                },
            }).then((_a) => {
                var { nodes: positionedNodes, connections } = _a, positionParams = __rest(_a, ["nodes", "connections"]);
                props.setViewportParams(positionParams);
                setSimulatedNodes(positionedNodes);
                setConnections(connections);
            });
        },
    }), [nodes]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (!((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id) && simulatedNodes && !printPreviewActive) {
            const schemaNode = simulatedNodes === null || simulatedNodes === void 0 ? void 0 : simulatedNodes.find((sn) => sn.parserField.name === "Query");
            if (schemaNode) {
                zoomToNode(schemaNode.x, schemaNode.y);
            }
            else {
                if (simulatedNodes.length > 0) {
                    const randomFirstNode = simulatedNodes[0];
                    zoomToNode(randomFirstNode.x, randomFirstNode.y);
                }
            }
        }
    }, [simulatedNodes]);
    (0, react_1.useLayoutEffect)(() => {
        if (!props.loading) {
            if (instance.wrapperComponent) {
                transformEffect(instance.transformState, instance.wrapperComponent);
                setSelectedNodeId({
                    source: "relation",
                    value: activeNode && (selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value)
                        ? selectedNodeId.value
                        : undefined,
                });
            }
        }
    }, [props.loading, focusMode]);
    const transformEffect = (state, wrapper) => {
        if (simulatedNodes && !props.hide) {
            const size = wrapper.getBoundingClientRect();
            changeZoomInTopBar(state.scale);
            if (!size)
                return;
            requestAnimationFrame(() => {
                cullNodes(simulatedNodes, state, size);
                if (props.fieldsOn) {
                    LoDNodes(state.scale);
                }
                else {
                    LoDNodes(0.2);
                }
            });
        }
    };
    (0, react_zoom_pan_pinch_1.useTransformEffect)((r) => {
        if (r.instance.wrapperComponent) {
            transformEffect(r.state, r.instance.wrapperComponent);
        }
    });
    (0, react_1.useEffect)(() => {
        if (!props.fieldsOn) {
            LoDNodes(0.2);
        }
        else {
            LoDNodes(scale);
        }
    }, [props.fieldsOn]);
    (0, react_1.useEffect)(() => {
        if (!nodes.length) {
            setSimulatedNodes([]);
            setConnections([]);
            return;
        }
        if (!editMode) {
            setLoading(true);
        }
        graphql_editor_worker_1.GraphQLEditorWorker.simulateSort({
            nodes,
            options: {
                existingNumberNodes: simulatedNodes,
                iterations: 200,
                maxWidth: printPreviewActive
                    ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
                    : nodeLook_1.RELATION_NODE_MAX_WIDTH,
                maxFields: printPreviewActive
                    ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS
                    : nodeLook_1.RELATION_NODE_MAX_FIELDS,
            },
        }).then((_a) => {
            var { nodes: positionedNodes, connections } = _a, positionParams = __rest(_a, ["nodes", "connections"]);
            props.setViewportParams(positionParams);
            setSimulatedNodes(positionedNodes);
            setConnections(connections);
        });
        return;
    }, [nodes]);
    (0, react_1.useLayoutEffect)(() => {
        if (!simulatedNodes) {
            return;
        }
        (0, useMarkFramePaint_1.runAfterFramePaint)(() => {
            var _a;
            setLoading(false);
            DOMClassNames_1.DOMEvents.selectNode.trigger((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id);
            if (printPreviewActive && !printPreviewReady) {
                lodCache.current = undefined;
                setPrintPreviewReady(true);
            }
            else if (!printPreviewActive && printPreviewReady) {
                lodCache.current = undefined;
                setPrintPreviewReady(false);
            }
        });
    }, [simulatedNodes]);
    const SvgLinesContainer = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(Lines_1.Lines, { relations: connections, isPrintPreviewActive: printPreviewActive }));
    }, [connections]);
    const NodesContainer = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(react_1.default.Fragment, null, simulatedNodes === null || simulatedNodes === void 0 ? void 0 : simulatedNodes.map((n) => (react_1.default.createElement(NodePane, { x: n.x, id: `${n.id}`, y: n.y, key: n.parserField.id },
            react_1.default.createElement(Node_1.Node, { isReadOnly: isReadOnly, isLibrary: isLibrary(n.parserField), numberNode: n }))))));
    }, [isLibrary, simulatedNodes]);
    return (react_1.default.createElement(Main, { ref: mainRef },
        NodesContainer,
        SvgLinesContainer));
});
exports.LinesDiagram.displayName = "LinesDiagram";
