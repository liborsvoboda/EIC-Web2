export declare const DOMClassNames: {
    readonly active: "active";
    readonly node: "graph-node";
    readonly nodeConnection: "graph-connection";
    readonly nodeTitle: "graph-node-title";
    readonly navigationTitle: "navigation-title";
    readonly navigationTitleSpan: "navigation-title-span";
    readonly navigationSelectedActions: "navigation-selectedActions";
    readonly nodeFields: "graph-node-fields";
    readonly nodeSelection: "selection";
    readonly nodeInViewport: "inViewport";
    readonly nodeField: "graph-field";
    readonly topBarZoom: "zoom-percentage";
};
export declare const DOMEvents: {
    selectNode: {
        trigger: (id?: string) => void;
        disposable: (fn: (id?: string) => void) => {
            dispose: () => void;
        };
    };
};
