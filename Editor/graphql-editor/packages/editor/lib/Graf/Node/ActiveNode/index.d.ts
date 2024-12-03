import React from "react";
import { ParserField } from "graphql-js-tree";
interface NodeProps {
    node: ParserField;
    onDuplicate?: (node: ParserField) => void;
    onInputCreate?: (node: ParserField) => void;
    readonly?: boolean;
    parentNode?: {
        node: ParserField;
        indexInParent: number;
    };
}
export declare const NodeName: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const NodeType: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ActiveNode: React.FC<NodeProps>;
export {};
