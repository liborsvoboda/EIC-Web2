/// <reference types="react" />
import { AllTypes } from "graphql-js-tree";
type DragOverStylesDiagram = {
    nodeName: string;
    nodeType?: string;
    isPaddingLeft: boolean;
};
export declare const useLayoutState: () => {
    windowWidth: number;
    sidebarSize: number;
    setSidebarSize: import("react").Dispatch<import("react").SetStateAction<number>>;
    dragOverStylesDiagram: DragOverStylesDiagram | undefined;
    setDragOverStylesDiagram: import("react").Dispatch<import("react").SetStateAction<DragOverStylesDiagram | undefined>>;
    dndType: AllTypes | undefined;
    setDndType: import("react").Dispatch<import("react").SetStateAction<AllTypes | undefined>>;
    startDragIdx: number | undefined;
    setStartDragIdx: import("react").Dispatch<import("react").SetStateAction<number | undefined>>;
};
export declare const LayoutStateProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<void>>;
export {};
