/// <reference types="react" />
import { EditorTheme } from "../../gshared/theme/MainTheme";
export declare const useTheme: () => {
    theme: EditorTheme;
    setTheme: import("react").Dispatch<import("react").SetStateAction<EditorTheme>>;
};
export declare const ThemeProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<EditorTheme>>;
