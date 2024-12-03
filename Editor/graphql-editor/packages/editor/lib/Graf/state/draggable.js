"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableProvider = exports.useDraggable = void 0;
const react_1 = require("react");
const unstated_next_1 = require("unstated-next");
const useDraggableContainer = (0, unstated_next_1.createContainer)(() => {
    const [draggable, setDraggable] = (0, react_1.useState)(true);
    return {
        draggable,
        setDraggable,
    };
});
exports.useDraggable = useDraggableContainer.useContainer;
exports.DraggableProvider = useDraggableContainer.Provider;
