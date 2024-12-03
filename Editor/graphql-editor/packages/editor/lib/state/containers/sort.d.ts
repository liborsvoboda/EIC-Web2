/// <reference types="react" />
import { OperationType, ParserField, TypeDefinition, TypeSystemDefinition } from "graphql-js-tree";
type OrderType = {
    name: TypeDefinition | TypeSystemDefinition.DirectiveDefinition;
    value: number;
};
export declare const useSortState: () => {
    isSortAlphabetically: boolean;
    setIsSortAlphabetically: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    orderTypes: OrderType[];
    setOrderTypes: import("react").Dispatch<import("react").SetStateAction<OrderType[]>>;
    sortAlphabetically: (a: ParserField, b: ParserField) => number;
    sortByTypes: (a: ParserField, b: ParserField) => number;
    isNodeBaseType: (nodeOperations: OperationType[] | undefined) => boolean | undefined;
    isUserOrder: boolean;
    setIsUserOrder: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export declare const SortStateProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<void>>;
export {};
