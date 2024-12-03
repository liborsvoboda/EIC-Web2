"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterProvider = exports.useRouter = exports.useRouterContainer = void 0;
const react_1 = require("react");
const unstated_next_1 = require("unstated-next");
const defaultValues = {
    pane: "relation",
    code: "off",
    navigationCollapsed: false,
    source: "initial",
};
exports.useRouterContainer = (0, unstated_next_1.createContainer)(() => {
    const [path, setPath] = (0, react_1.useState)(defaultValues);
    const set = (props, source) => {
        setPath((p) => (Object.assign(Object.assign(Object.assign({}, p), props), { source })));
    };
    return {
        set,
        routes: path,
    };
});
exports.useRouter = exports.useRouterContainer.useContainer;
exports.RouterProvider = exports.useRouterContainer.Provider;
