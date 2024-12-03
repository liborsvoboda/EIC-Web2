"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsProvider = exports.useRelationsState = void 0;
const unstated_next_1 = require("unstated-next");
const react_1 = require("react");
const useRelationsContainer = (0, unstated_next_1.createContainer)(() => {
    const [baseTypesOn, setBaseTypesOn] = (0, react_1.useState)(true);
    const [fieldsOn, setFieldsOn] = (0, react_1.useState)(true);
    const [ctrlToZoom, setCtrlToZoom] = (0, react_1.useState)(true);
    const [editMode, setEditMode] = (0, react_1.useState)("");
    const [libraryNodesOn, setLibraryNodesOn] = (0, react_1.useState)(true);
    const [printPreviewActive, setPrintPreviewActive] = (0, react_1.useState)(false);
    const [printPreviewReady, setPrintPreviewReady] = (0, react_1.useState)(false);
    const [omitNodes, setOmitNodes] = (0, react_1.useState)();
    return {
        setBaseTypesOn,
        baseTypesOn,
        editMode,
        setEditMode,
        fieldsOn,
        setFieldsOn,
        ctrlToZoom,
        setCtrlToZoom,
        libraryNodesOn,
        setLibraryNodesOn,
        printPreviewActive,
        setPrintPreviewActive,
        printPreviewReady,
        setPrintPreviewReady,
        omitNodes,
        setOmitNodes,
    };
});
exports.useRelationsState = useRelationsContainer.useContainer;
exports.RelationsProvider = useRelationsContainer.Provider;
