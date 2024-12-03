"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const react_1 = __importStar(require("react"));
const Menu_1 = require("./menu/Menu");
const code_1 = require("./code");
const Components_1 = require("./code/Components");
const graphql_editor_worker_1 = require("graphql-editor-worker");
const containers_1 = require("../state/containers");
const DiffEditor_1 = require("../DiffEditor");
const Relation_1 = require("../Relation/Relation");
const Docs_1 = require("../Docs/Docs");
const sort_1 = require("../state/containers/sort");
const styled_1 = __importDefault(require("@emotion/styled"));
const router_1 = require("../state/containers/router");
const ErrorsList_1 = require("../shared/errors/ErrorsList");
const NodeNavigation_1 = require("../shared/NodeNavigation");
const Main = styled_1.default.div `
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) => `${theme.neutrals.L5} ${theme.neutrals.L6}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutrals.L6};
  }

  .full-screen-container {
    flex: 1;
    align-self: stretch;
    height: 100%;
  }
`;
const Sidebar = styled_1.default.div `
  align-self: stretch;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.neutrals.L6};
`;
const ErrorOuterContainer = styled_1.default.div `
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && "auto"};
  overflow-x: hidden;
`;
exports.Editor = react_1.default.forwardRef(({ schema = {
    code: "",
    libraries: "",
    source: "outside",
}, setSchema, diffSchemas, onTreeChange, path, readonly: editorReadOnly, theme, onRouteChange, onNodeSelect, onContentChange, title, disableExport, disableImport, onEditorMount, }, ref) => {
    var _a;
    const { setTheme } = (0, containers_1.useTheme)();
    const { codeErrors, errorsItems, setCodeErrors } = (0, containers_1.useErrorsState)();
    const { tree, setTree, setSnapshots, setUndos, setLibraryTree, setReadonly, generateTreeFromSchema, readonly, allNodes, selectedNodeId, setSelectedNodeId, } = (0, containers_1.useTreesState)();
    const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } = (0, sort_1.useSortState)();
    const { setSidebarSize, sidebarSize } = (0, containers_1.useLayoutState)();
    const { routes, set } = (0, router_1.useRouter)();
    const codePaneApi = react_1.default.createRef();
    const reset = () => {
        setSnapshots([]);
        setUndos([]);
        setCodeErrors([]);
    };
    (0, react_1.useImperativeHandle)(ref, () => ({
        selectNode: (nId) => {
            var _a;
            if (nId === ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id))
                return;
            const n = allNodes.nodes.find((an) => an.id === nId);
            setSelectedNodeId({
                source: "routing",
                value: nId
                    ? {
                        id: nId,
                        name: (n === null || n === void 0 ? void 0 : n.name) || "",
                    }
                    : undefined,
                justCreated: selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.justCreated,
            });
        },
        route: (routes) => {
            set(Object.assign({}, routes));
        },
        receive: (e) => {
            var _a;
            (_a = codePaneApi.current) === null || _a === void 0 ? void 0 : _a.receive(e);
        },
        currentRoute: routes,
    }), [set, setSelectedNodeId, allNodes, codePaneApi, routes]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (onNodeSelect &&
            selectedNodeId &&
            selectedNodeId.source !== "routing") {
            onNodeSelect((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id);
        }
    }, [(_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id]);
    (0, react_1.useEffect)(() => {
        isSortAlphabetically &&
            !isUserOrder &&
            setTree({
                nodes: tree.nodes.sort(sortByTypes),
            });
    }, [isSortAlphabetically, orderTypes]);
    (0, react_1.useEffect)(() => {
        if (theme) {
            setTheme(theme);
        }
    }, [theme]);
    (0, react_1.useEffect)(() => {
        setReadonly(!!editorReadOnly);
    }, [editorReadOnly]);
    (0, react_1.useEffect)(() => {
        if (schema.libraries) {
            graphql_editor_worker_1.GraphQLEditorWorker.generateTree({
                schema: schema.libraries,
                cutSchemaDefinition: true,
            }).then(setLibraryTree);
        }
        else {
            setLibraryTree({ nodes: [] });
        }
        reset();
    }, [schema.libraries]);
    (0, react_1.useEffect)(() => {
        if (!tree || !!tree.schema) {
            return;
        }
        if (tree.nodes.length === 0) {
            if (tree.initial) {
                return;
            }
            setSchema(Object.assign(Object.assign({}, schema), { source: "tree", code: "" }));
            return;
        }
        try {
            graphql_editor_worker_1.GraphQLEditorWorker.generateCode(tree).then((graphql) => {
                if (graphql !== schema.code) {
                    graphql_editor_worker_1.GraphQLEditorWorker.validate(graphql, schema.libraries).then((errors) => {
                        setCodeErrors(errors);
                        setSchema(Object.assign(Object.assign({}, schema), { code: graphql, source: "tree" }));
                    });
                }
            });
        }
        catch (error) {
            const msg = error.message;
            setCodeErrors([{ text: msg, __typename: "global" }]);
            return;
        }
        onTreeChange === null || onTreeChange === void 0 ? void 0 : onTreeChange(tree);
    }, [tree]);
    (0, react_1.useEffect)(() => {
        if (schema.source === "tree") {
            return;
        }
        generateTreeFromSchema(schema);
    }, [schema]);
    (0, react_1.useEffect)(() => {
        if (onRouteChange && routes.source === "internal") {
            onRouteChange(Object.assign({}, routes));
        }
    }, [routes.code, routes.pane]);
    return (react_1.default.createElement(Main, { onKeyDown: (e) => {
            if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
            }
        } },
        react_1.default.createElement(Menu_1.Menu, { schema: schema.code, libraries: schema.libraries, path: path, toggleCode: routes.code === "on", setSchema: setSchema, readOnly: readonly, setToggleCode: () => set(Object.assign(Object.assign({}, routes), { code: routes.code === "off" ? "on" : "off", source: "internal" }), "internal"), activePane: routes.pane, excludePanes: diffSchemas ? undefined : ["diff"], setActivePane: (p) => {
                const newState = Object.assign(Object.assign({}, routes), { pane: p });
                set(newState, "internal");
            }, disableExport: disableExport, disableImport: disableImport }),
        routes.pane !== "diff" && (react_1.default.createElement(Components_1.DynamicResize, { enable: { right: true }, disabledClass: !routes.pane ? "full-screen-container" : undefined, resizeCallback: (e, r, c) => {
                setSidebarSize(c.getBoundingClientRect().width);
            }, width: !routes.pane ? "100%" : routes.code === "on" ? sidebarSize : 0 },
            react_1.default.createElement(Sidebar, { className: !routes.pane ? "full-screen-container" : undefined },
                react_1.default.createElement(code_1.CodePane, { size: !routes.pane ? 100000 : routes.code === "on" ? sidebarSize : 0, onChange: (v, passGraphValidation) => {
                        setSchema(Object.assign(Object.assign({}, schema), { code: v, source: "code", passGraphValidation }));
                    }, onEditorMount: onEditorMount, ref: codePaneApi, onContentChange: onContentChange, schema: schema, fullScreen: !routes.pane, readonly: readonly })))),
        (routes.pane === "relation" || routes.pane === "docs") && (react_1.default.createElement(ErrorOuterContainer, null,
            routes.pane === "relation" && (react_1.default.createElement(Relation_1.Relation, { title: title, setInitialSchema: (s) => setSchema({
                    code: s,
                    libraries: schema.libraries,
                    source: "outside",
                }), schema: schema.code })),
            routes.pane === "docs" && react_1.default.createElement(Docs_1.Docs, null),
            react_1.default.createElement(NodeNavigation_1.NodeNavigation, { isCollapsed: routes.navigationCollapsed, setIsCollapsed: (collapsed) => {
                    set(Object.assign(Object.assign({}, routes), { navigationCollapsed: collapsed }));
                } }),
            !!codeErrors.length &&
                (routes.pane === "docs" || routes.pane === "relation") && (react_1.default.createElement(ErrorsList_1.ErrorsList, null, errorsItems)))),
        routes.pane === "diff" && diffSchemas && (react_1.default.createElement(DiffEditor_1.DiffEditor, { schemas: diffSchemas }))));
});
exports.Editor.displayName = "Editor";
