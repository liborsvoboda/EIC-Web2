import React from "react";
import { PassedSchema } from "../../../Models";
export interface GqlCodePaneOuterProps {
    readonly?: boolean;
    placeholder?: string;
}
export type GqlCodePaneProps = {
    size: number | string;
    schema: PassedSchema;
    gql: string;
    onChange: (v: string, isInvalid?: string) => void;
} & GqlCodePaneOuterProps;
export declare const GqlCodePane: (props: GqlCodePaneProps) => React.JSX.Element;
