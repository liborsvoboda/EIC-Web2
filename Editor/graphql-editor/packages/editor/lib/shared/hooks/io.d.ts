export declare enum KeyboardActions {
    Delete = "Delete",
    Undo = "Undo",
    Redo = "Redo",
    Save = "Save",
    FindRelation = "FindRelation"
}
export declare const useIO: () => {
    mount: (actions: Partial<Record<KeyboardActions, Function>>) => {
        dispose: () => void;
    };
};
