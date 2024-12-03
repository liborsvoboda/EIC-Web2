"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragLeaveHandler = exports.dragOverHandler = exports.dragStartHandler = void 0;
const dragStartHandler = (e, startNodeName) => {
    e.dataTransfer.setData('startName', startNodeName);
};
exports.dragStartHandler = dragStartHandler;
const dragOverHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
exports.dragOverHandler = dragOverHandler;
const dragLeaveHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
exports.dragLeaveHandler = dragLeaveHandler;
