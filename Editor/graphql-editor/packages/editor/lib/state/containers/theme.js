"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = exports.useTheme = void 0;
const unstated_next_1 = require("unstated-next");
const react_1 = require("react");
const MainTheme_1 = require("../../gshared/theme/MainTheme");
const styling_system_1 = require("@aexol-studio/styling-system");
const useThemeContainer = (0, unstated_next_1.createContainer)((theme = Object.assign(Object.assign({}, MainTheme_1.MainTheme), (0, styling_system_1.themeColors)("graphqleditor", "dark"))) => {
    const [currentTheme, setCurrentTheme] = (0, react_1.useState)(theme);
    return {
        theme: currentTheme,
        setTheme: setCurrentTheme,
    };
});
exports.useTheme = useThemeContainer.useContainer;
exports.ThemeProvider = useThemeContainer.Provider;
