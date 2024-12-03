import React from "react";
import { TriggerProps, LayerProps } from "react-laag";
export declare const ContextMenu: React.FC<{
    isOpen: boolean;
    close: () => void;
    Trigger: ({ triggerProps }: {
        triggerProps: TriggerProps;
    }) => JSX.Element;
    children: ({ layerProps }: {
        layerProps: LayerProps;
    }) => JSX.Element;
}>;
