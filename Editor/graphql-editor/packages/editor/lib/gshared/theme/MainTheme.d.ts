import { ITheme } from "@aexol-studio/styling-system";
export declare const MainTheme: {
    base: string;
    shadow: string;
    colors: {
        type: string;
        union: string;
        input: string;
        scalar: string;
        interface: string;
        enum: string;
        directive: string;
        extend: string;
    };
    fontFamily: string;
    fontFamilySans: string;
};
type MainThemeType = typeof MainTheme;
export type EditorTheme = ITheme & MainThemeType;
export {};
