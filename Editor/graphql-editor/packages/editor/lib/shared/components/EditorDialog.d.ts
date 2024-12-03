import { DialogProps } from "@aexol-studio/styling-system";
import React from "react";
export declare const EditorDialog: React.FC<React.PropsWithChildren<Omit<DialogProps, "backdrop"> & {
    title: string;
}>>;
