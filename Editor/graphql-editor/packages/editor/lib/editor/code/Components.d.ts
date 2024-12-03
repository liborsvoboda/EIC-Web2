import React from "react";
import { Enable, ResizeCallback } from "re-resizable";
export interface TitleOfPaneProps {
    children: React.ReactNode;
}
export declare const DynamicResize: React.FunctionComponent<{
    width: number | string;
    resizeCallback: ResizeCallback;
    disabledClass?: string;
    maxWidth?: string | number;
    minWidth?: string | number;
    enable?: Enable;
    children?: React.ReactNode;
}>;
