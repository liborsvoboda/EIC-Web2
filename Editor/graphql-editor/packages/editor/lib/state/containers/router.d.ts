/// <reference types="react" />
import { ActivePane } from "../../editor/menu/Menu";
type ValuesType = {
    pane?: ActivePane;
    code: "on" | "off";
    source?: "internal" | "initial";
    navigationCollapsed?: boolean;
};
declare const defaultValues: ValuesType;
export type EditorRoutes = typeof defaultValues;
export declare const useRouterContainer: import("unstated-next").Container<{
    set: (props: Partial<typeof defaultValues>, source?: ValuesType["source"]) => void;
    routes: ValuesType;
}, void>;
export declare const useRouter: () => {
    set: (props: Partial<typeof defaultValues>, source?: ValuesType["source"]) => void;
    routes: ValuesType;
};
export declare const RouterProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<void>>;
export {};
