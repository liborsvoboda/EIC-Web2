import { FieldType } from "graphql-js-tree";
import React from "react";
export declare const Draw: ({ from, to, color, relationType, isPrintPreviewActive, optimized, }: {
    from?: {
        x: number;
        y: number;
        id: string;
    } | undefined;
    to?: {
        x: number;
        y: number;
        id: string;
    } | undefined;
    color: string;
    relationType: FieldType;
    isPrintPreviewActive: boolean;
    optimized?: boolean | undefined;
}) => React.JSX.Element;
