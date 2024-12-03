/// <reference types="react" />
import { NumberNode } from "graphql-editor-worker";
import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
export declare const useDomManagerTs: (parent: "focus" | "all") => {
    lodCache: import("react").MutableRefObject<"far" | undefined>;
    selectNode: (nodeId: string) => void;
    deselectNodes: () => void;
    markRelated: (relatedNodeIdsToSelected: string[]) => void;
    cullNodes: (nodes: NumberNode[], state: ReactZoomPanPinchState, size: DOMRect, extraAreaPercentage?: number) => void;
    LoDNodes: (scale: number) => void;
    changeZoomInTopBar: (scale: number) => void;
    changeParentClass: (parent: "focus" | "all") => "all" | "focus";
};
