import React from "react";
import { EditorError } from "graphql-editor-worker/lib/validation";
export declare const useErrorsState: () => {
    codeErrors: EditorError[];
    setCodeErrors: React.Dispatch<React.SetStateAction<EditorError[]>>;
    errorRowNumber: number | undefined;
    setErrorRowNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
    errorNodeNames: string[] | undefined;
    setErrorNodeNames: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    setErrorsItems: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>;
    errorsItems: JSX.Element[] | undefined;
};
export declare const ErrorsStateProvider: React.ComponentType<import("unstated-next").ContainerProviderProps<void>>;
