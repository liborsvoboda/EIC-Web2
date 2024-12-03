"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDomManagerTs = void 0;
const manageDomNode_1 = require("./manageDomNode");
const react_1 = require("react");
const DOMClassNames_1 = require("./DOMClassNames");
const useDomManagerTs = (parent) => {
    let parentClass = parent;
    const DOMGraphNode = (0, manageDomNode_1.manageDomNode)(DOMClassNames_1.DOMClassNames.node, parentClass);
    const DOMGraphConnection = (0, manageDomNode_1.manageDomNode)(DOMClassNames_1.DOMClassNames.nodeConnection, parentClass);
    const DOMNavigationNode = (0, manageDomNode_1.manageDomNode)(DOMClassNames_1.DOMClassNames.navigationTitle);
    const visibleNodesCache = (0, react_1.useRef)();
    const lodCache = (0, react_1.useRef)();
    const selectNode = (nodeId) => {
        deselectNodes();
        DOMGraphNode.addClassToAll("selection");
        DOMGraphConnection.addClassToAll("selection");
        DOMNavigationNode.addClassByFn("active", (e) => {
            const htmlElem = e;
            const m = htmlElem.dataset.id === nodeId;
            if (m) {
                htmlElem.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return m;
        });
        DOMGraphConnection.addClassByFn("active", (e) => {
            const svgElem = e;
            return (svgElem.dataset["from"] === nodeId || svgElem.dataset["to"] === nodeId);
        });
        DOMGraphNode.addClassByFn("active", (e) => {
            return e.id === `node-${nodeId}`;
        });
    };
    const deselectNodes = () => {
        DOMGraphNode.removeClasses(["active", "selection", "related"]);
        DOMGraphConnection.removeClasses(["active", "selection"]);
        DOMNavigationNode.removeClasses(["active"]);
    };
    const markRelated = (relatedNodeIdsToSelected) => {
        DOMGraphNode.addClassByFn("related", (e) => {
            return relatedNodeIdsToSelected.map((r) => `node-${r}`).includes(e.id);
        });
    };
    const markInViewport = (nodesInViewport) => {
        const mappedNodes = nodesInViewport.map((r) => `node-${r}`);
        DOMGraphConnection.toggleClassByFn("inViewport", (e) => {
            const svgElem = e;
            return !!((svgElem.dataset["from"] &&
                nodesInViewport.includes(svgElem.dataset["from"])) ||
                (svgElem.dataset["to"] &&
                    nodesInViewport.includes(svgElem.dataset["to"])));
        });
        DOMGraphNode.toggleClassByFn("inViewport", (e) => {
            return mappedNodes.includes(e.id);
        });
    };
    const cullNodes = (nodes, state, size, extraAreaPercentage = 0.0) => {
        const pan = {
            x: state.positionX / state.scale,
            y: state.positionY / state.scale,
            scale: state.scale,
        };
        const viewport = {
            w: size.width / state.scale,
            h: size.height / state.scale,
        };
        const bb = {
            x: [-pan.x, -pan.x + viewport.w * (1 + extraAreaPercentage)],
            y: [-pan.y, -pan.y + viewport.h * (1 + extraAreaPercentage)],
        };
        const activeNodes = nodes
            .filter((node) => {
            const n = Object.assign(Object.assign({}, node), { x: node.x - node.width / 2.0, y: node.y - node.height / 2.0 });
            const x = (n.x < bb.x[1] && n.x > bb.x[0]) ||
                (n.x + n.width > bb.x[0] && n.x + n.width < bb.x[1]) ||
                (n.x < bb.x[0] && n.x + n.width > bb.x[1]);
            const y = (n.y < bb.y[1] && n.y > bb.y[0]) ||
                (n.y + n.height > bb.y[0] && n.y + n.height < bb.y[1]) ||
                (n.y < bb.y[0] && n.y + n.height > bb.y[1]);
            return x && y;
        })
            .map((n) => n.id);
        const refValue = visibleNodesCache.current;
        if (refValue && JSON.stringify(refValue) === JSON.stringify(activeNodes)) {
            return;
        }
        visibleNodesCache.current = activeNodes;
        markInViewport(activeNodes);
    };
    const LoDNodes = (scale) => {
        if (scale < 0.66) {
            if (lodCache.current === "far")
                return;
            DOMGraphNode.addClassToAll("far");
            lodCache.current = "far";
        }
        else {
            if (!lodCache.current)
                return;
            DOMGraphNode.removeClasses(["far"]);
            lodCache.current = undefined;
        }
    };
    const changeZoomInTopBar = (scale) => {
        const topBarZoomSpan = document.querySelector(`.${parentClass} .${DOMClassNames_1.DOMClassNames.topBarZoom}`);
        if (topBarZoomSpan) {
            topBarZoomSpan.innerHTML = `${(scale * 100).toFixed() + "%"}`;
        }
    };
    return {
        lodCache,
        selectNode,
        deselectNodes,
        markRelated,
        cullNodes,
        LoDNodes,
        changeZoomInTopBar,
        changeParentClass: (parent) => (parentClass = parent),
    };
};
exports.useDomManagerTs = useDomManagerTs;
