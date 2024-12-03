"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutStateProvider = exports.useLayoutState = void 0;
const react_1 = require("react");
const unstated_next_1 = require("unstated-next");
const vars_1 = require("../../vars");
const useLayoutStateContainer = (0, unstated_next_1.createContainer)(() => {
    const [sidebarSize, setSidebarSize] = (0, react_1.useState)(vars_1.sizeSidebar);
    const [windowWidth, setWindowWidth] = (0, react_1.useState)(0);
    const [dragOverStylesDiagram, setDragOverStylesDiagram] = (0, react_1.useState)();
    const [dndType, setDndType] = (0, react_1.useState)();
    const [startDragIdx, setStartDragIdx] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const updateWindowDimensions = () => {
            setWindowWidth(window.innerWidth);
        };
        updateWindowDimensions();
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);
    return {
        windowWidth,
        sidebarSize,
        setSidebarSize,
        dragOverStylesDiagram,
        setDragOverStylesDiagram,
        dndType,
        setDndType,
        startDragIdx,
        setStartDragIdx,
    };
});
exports.useLayoutState = useLayoutStateContainer.useContainer;
exports.LayoutStateProvider = useLayoutStateContainer.Provider;
