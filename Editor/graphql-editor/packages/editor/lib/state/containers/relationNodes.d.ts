/// <reference types="react" />
import { AllTypes, ParserField } from "graphql-js-tree";
export declare const toggleableTypes: AllTypes[];
export declare const useRelationNodesState: () => {
    filteredRelationNodes: ParserField[];
    nodesVisibilityArr: {
        id: string;
        isHidden: boolean;
    }[];
    hideRelationNodes: () => void;
    showRelationNodes: () => void;
    filteredFocusedNodes: ParserField[] | undefined;
    toggleNodeVisibility: (node: ParserField) => void;
    allVisible: boolean;
    focusedNodes: ParserField[] | undefined;
    typeRelatedToFocusedNode: ParserField[];
    filteredTypeRelatedToFocusedNode: ParserField[];
    setTypeRelatedNodesToFocusedNode: (node: ParserField) => void;
};
export declare const RelationNodesProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<void>>;
