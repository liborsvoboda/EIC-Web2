export declare const manageDomNode: (className: string | string[], parentClass?: "focus" | "all") => {
    addClassToAll: (addedClassName: string) => void;
    removeClasses: (classesToRemove: string[]) => void;
    addClassByFn: (addedClassName: string, fn: (element: Element) => boolean) => void;
    toggleClassByFn: (addedClassName: string, fn: (element: Element) => boolean) => void;
};
