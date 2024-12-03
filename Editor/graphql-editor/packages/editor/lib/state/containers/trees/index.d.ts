import React from "react";
import { ParserTree, ParserField, OperationType } from "graphql-js-tree";
import { PassedSchema } from "../../../Models";
import { ActiveSource } from "../../../editor/menu/Menu";
type SelectedNodeId = {
    value?: {
        name: string;
        id: string;
    };
    source: ActiveSource;
    justCreated?: boolean;
};
type TreeWithSource = ParserTree & {
    schema: boolean;
    initial: boolean;
};
export declare const useTreesState: () => {
    allNodes: {
        nodes: ParserField[];
    };
    tree: TreeWithSource;
    setTree: (v: React.SetStateAction<Omit<TreeWithSource, "schema" | "initial">>, blockSchemaUpdate?: boolean) => void;
    libraryTree: ParserTree;
    setLibraryTree: React.Dispatch<React.SetStateAction<ParserTree>>;
    snapshots: string[];
    setSnapshots: React.Dispatch<React.SetStateAction<string[]>>;
    selectedNodeId: SelectedNodeId | undefined;
    setSelectedNodeId: (_selectedNodeId: SelectedNodeId) => void;
    setSelectedNodeIdThatWillBeAdded: (_selectedNodeId: SelectedNodeId) => void;
    queryNode: ParserField | undefined;
    getParentOfField: (f: ParserField) => ParserField | undefined;
    activeNode: ParserField | undefined;
    past: () => SnapshotType | undefined;
    undos: string[];
    setUndos: React.Dispatch<React.SetStateAction<string[]>>;
    undo: () => void;
    redo: () => void;
    makeSnapshot: () => void;
    future: () => SnapshotType | undefined;
    relatedNodeIdsToSelected: string[];
    relatedToSelectedTypes: (activeNode?: ParserField) => ParserField[];
    relatedToSelected: ParserField[];
    parentTypes: {
        [x: string]: string;
    };
    scalars: string[];
    generateTreeFromSchema: (schema: PassedSchema) => Promise<void>;
    readonly: boolean;
    setReadonly: React.Dispatch<React.SetStateAction<boolean>>;
    updateNode: (node: ParserField, fn?: () => void) => void;
    isLibrary: (node: ParserField) => boolean;
    updateFieldOnNode: (node: ParserField, i: number, updatedField: ParserField, parentNode: string) => void;
    addFieldToNode: (node: ParserField, f: ParserField, name: string, parentNode: string) => void;
    renameNode: (node: ParserField, newName: string) => void;
    removeNode: (node: ParserField) => void;
    removeFieldFromNode: (node: ParserField, field: ParserField, parentNode: string) => void;
    implementInterface: (node: ParserField, interfaceNode: ParserField) => void;
    deImplementInterface: (node: ParserField, interfaceName: string) => void;
    setValue: (node: ParserField, value?: string) => void;
    setOperationNode: (operationType: OperationType, node: ParserField) => void;
    removeSchemaNodeField: (operationType: OperationType) => void;
    idempotentOperationAssign: (node: ParserField) => void;
    focusMode: string | undefined;
    focusedNode: ParserField | undefined;
    focusNode: (n: ParserField) => void;
    exitFocus: () => void;
};
export declare const TreesStateProvider: React.ComponentType<import("unstated-next").ContainerProviderProps<void>>;
type SnapshotType = {
    tree: ParserTree;
    selectedNodeId: SelectedNodeId;
};
export {};
