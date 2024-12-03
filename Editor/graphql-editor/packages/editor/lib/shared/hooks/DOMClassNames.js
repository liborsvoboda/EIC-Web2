"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMEvents = exports.DOMClassNames = void 0;
exports.DOMClassNames = {
    active: "active",
    node: "graph-node",
    nodeConnection: "graph-connection",
    nodeTitle: "graph-node-title",
    navigationTitle: "navigation-title",
    navigationTitleSpan: "navigation-title-span",
    navigationSelectedActions: "navigation-selectedActions",
    nodeFields: "graph-node-fields",
    nodeSelection: "selection",
    nodeInViewport: "inViewport",
    nodeField: "graph-field",
    topBarZoom: "zoom-percentage",
};
exports.DOMEvents = {
    selectNode: {
        trigger: (id) => {
            document.dispatchEvent(new CustomEvent("selectnode", { detail: { id } }));
        },
        disposable: (fn) => {
            const listener = (e) => {
                fn(e.detail.id);
            };
            document.addEventListener("selectnode", listener);
            return {
                dispose: () => document.removeEventListener("selectnode", listener),
            };
        },
    },
};
