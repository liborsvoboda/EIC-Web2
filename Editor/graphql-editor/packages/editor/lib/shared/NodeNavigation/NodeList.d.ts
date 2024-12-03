import { ParserField } from "graphql-js-tree";
import React from "react";
import { EditorTheme } from "../../gshared/theme/MainTheme";
type ToggleableParserField = ParserField & {
    isHidden?: boolean;
};
interface NodeListI {
    listTitle: string;
    nodeList?: ToggleableParserField[];
    expanded: Array<string>;
    setExpanded: (e: string) => void;
    colorKey: keyof EditorTheme["colors"];
}
export declare const NodeList: React.FC<NodeListI>;
export declare const SchemaList: React.FC<{
    queryNode?: ParserField;
    mutationNode?: ParserField;
    subscriptionNode?: ParserField;
}>;
export {};
