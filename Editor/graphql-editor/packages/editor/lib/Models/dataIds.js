"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataIt = exports.DataIds = void 0;
exports.DataIds = {
    search: "search",
    navigation: "navigation",
    sidebar: "sidebar-menu",
    menuCode: "menu-code",
    menuRelations: "menu-relations",
    menuDocs: "menu-docs",
    menuExport: "menu-export",
    menuImport: "menu-import",
    menuDiff: "menu-diff",
    diffView: "diff-view",
    codeView: "code-view",
    docsView: "docs-view",
    relationView: "relation-view",
    graphNode: "graph-node",
    nodeFocus: "node-focus",
    nodeEditExpand: "node-edit-expand",
    defocus: "defocus",
    newNode: "newNode",
    filter: "filter",
    relationsOnly: "relations-only",
    libraryNodes: "library-nodes",
    export: "export",
    zoom: "zoom",
    activeNode: "active-node",
    nodeDescription: "node-description",
    addField: "add-field",
    implementInterface: "implement-interface",
    addDirective: "add-directive",
    nodeOptions: "node-options",
    nodeField: "node-field",
    fieldName: "field-name",
    fieldType: "field-type",
    fieldList: "field-list",
    fieldExpand: "field-expand",
    fieldArgs: "field-args",
    fieldOptions: "field-options",
};
const dataIt = (d) => {
    return {
        "data-id": exports.DataIds[d],
    };
};
exports.dataIt = dataIt;
