import React from "react";
import { FieldProps as GrafFieldProps } from "../../../../../Graf/Node/models";
type FieldProps = Pick<GrafFieldProps, "node"> & {
    showArgs?: boolean;
};
export declare const Field: React.FC<FieldProps>;
export {};
