import { EditorTheme } from "../../gshared/theme/MainTheme";
import { OperationType, ParserField } from "graphql-js-tree";
import React from "react";
type ToggleableParserField = ParserField & {
    isHidden?: boolean;
};
export declare const SingleNodeInList: React.FC<{
    node: ToggleableParserField;
    colorKey: keyof EditorTheme["colors"];
    schemaProps?: {
        name: string;
    };
    activeContext: boolean;
    setActive: (node: ToggleableParserField | null) => void;
}>;
export declare const SingleSchemaNodeInList: React.FC<{
    node?: ToggleableParserField;
    schemaProps: {
        name: string;
        operationType: OperationType;
    };
}>;
export {};
