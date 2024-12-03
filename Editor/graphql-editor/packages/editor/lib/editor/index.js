"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLSdlCodeDisplay = exports.GraphQLGqlEditor = exports.EmbeddedGraphQLEditor = exports.GraphQLEditor = void 0;
const react_1 = __importDefault(require("react"));
const Editor_1 = require("./Editor");
const containers_1 = require("../state/containers");
const react_2 = require("@emotion/react");
const layout_1 = require("../state/containers/layout");
const sort_1 = require("../state/containers/sort");
const GqlEditor_1 = require("./GqlEditor");
const MainTheme_1 = require("../gshared/theme/MainTheme");
const router_1 = require("../state/containers/router");
const EmbeddedEditor_1 = require("./EmbeddedEditor");
const styling_system_1 = require("@aexol-studio/styling-system");
const code_1 = require("./code");
const ErrorsList_1 = require("../shared/errors/ErrorsList");
exports.GraphQLEditor = react_1.default.forwardRef((_a, ref) => {
    var props = __rest(_a, []);
    const baseITheme = (0, styling_system_1.themeColors)("graphqleditor", "dark");
    const combinedTheme = Object.assign(Object.assign(Object.assign(Object.assign({}, MainTheme_1.MainTheme), baseITheme), (props.fontFamily && { fontFamily: props.fontFamily })), (props.fontFamilySans && { fontFamilySans: props.fontFamilySans }));
    const theme = props.theme || combinedTheme;
    return (react_1.default.createElement(containers_1.ThemeProvider, { initialState: theme },
        react_1.default.createElement(router_1.RouterProvider, null,
            react_1.default.createElement(containers_1.ErrorsStateProvider, null,
                react_1.default.createElement(containers_1.TreesStateProvider, null,
                    react_1.default.createElement(containers_1.RelationsProvider, null,
                        react_1.default.createElement(sort_1.SortStateProvider, null,
                            react_1.default.createElement(layout_1.LayoutStateProvider, null,
                                react_1.default.createElement(containers_1.RelationNodesProvider, null,
                                    react_1.default.createElement(react_2.ThemeProvider, { theme: theme },
                                        react_1.default.createElement(styling_system_1.ToastsProvider, null,
                                            react_1.default.createElement(Editor_1.Editor, Object.assign({}, props, { ref: ref })))))))))))));
});
const EmbeddedGraphQLEditor = (_a) => {
    var props = __rest(_a, []);
    const baseITheme = (0, styling_system_1.themeColors)("graphqleditor", "dark");
    const combinedTheme = Object.assign(Object.assign({}, MainTheme_1.MainTheme), baseITheme);
    const theme = props.theme || combinedTheme;
    return (react_1.default.createElement(containers_1.ThemeProvider, { initialState: theme },
        react_1.default.createElement(router_1.RouterProvider, null,
            react_1.default.createElement(containers_1.ErrorsStateProvider, null,
                react_1.default.createElement(containers_1.TreesStateProvider, null,
                    react_1.default.createElement(containers_1.RelationsProvider, null,
                        react_1.default.createElement(sort_1.SortStateProvider, null,
                            react_1.default.createElement(layout_1.LayoutStateProvider, null,
                                react_1.default.createElement(containers_1.RelationNodesProvider, null,
                                    react_1.default.createElement(react_2.ThemeProvider, { theme: theme },
                                        react_1.default.createElement(styling_system_1.ToastsProvider, null,
                                            react_1.default.createElement(EmbeddedEditor_1.EmbeddedEditor, Object.assign({}, props)))))))))))));
};
exports.EmbeddedGraphQLEditor = EmbeddedGraphQLEditor;
const GraphQLGqlEditor = (_a) => {
    var props = __rest(_a, []);
    const baseITheme = (0, styling_system_1.themeColors)("graphqleditor", "dark");
    const combinedTheme = Object.assign(Object.assign({}, MainTheme_1.MainTheme), baseITheme);
    const theme = props.theme || combinedTheme;
    return (react_1.default.createElement(containers_1.ThemeProvider, { initialState: theme },
        react_1.default.createElement(router_1.RouterProvider, null,
            react_1.default.createElement(containers_1.ErrorsStateProvider, null,
                react_1.default.createElement(containers_1.TreesStateProvider, null,
                    react_1.default.createElement(sort_1.SortStateProvider, null,
                        react_1.default.createElement(layout_1.LayoutStateProvider, null,
                            react_1.default.createElement(react_2.ThemeProvider, { theme: theme },
                                react_1.default.createElement(GqlEditor_1.GqlEditor, Object.assign({}, props))))))))));
};
exports.GraphQLGqlEditor = GraphQLGqlEditor;
const SdlEditor = react_1.default.forwardRef((props, ref) => {
    const { errorsItems } = (0, containers_1.useErrorsState)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(code_1.CodePane, Object.assign({}, props, { ref: ref })),
        !!(errorsItems === null || errorsItems === void 0 ? void 0 : errorsItems.length) && react_1.default.createElement(ErrorsList_1.ErrorsList, null, errorsItems)));
});
exports.GraphQLSdlCodeDisplay = react_1.default.forwardRef((_a, ref) => {
    var props = __rest(_a, []);
    const baseITheme = (0, styling_system_1.themeColors)("graphqleditor", "dark");
    const combinedTheme = Object.assign(Object.assign({}, MainTheme_1.MainTheme), baseITheme);
    const theme = props.theme || combinedTheme;
    return (react_1.default.createElement(containers_1.ThemeProvider, { initialState: theme },
        react_1.default.createElement(containers_1.ErrorsStateProvider, null,
            react_1.default.createElement(containers_1.TreesStateProvider, null,
                react_1.default.createElement(react_2.ThemeProvider, { theme: theme },
                    react_1.default.createElement(styling_system_1.ToastsProvider, null,
                        react_1.default.createElement(SdlEditor, { schema: props.schema, onChange: () => {
                            }, size: 500, readonly: true, fullScreen: true, ref: ref })))))));
});
