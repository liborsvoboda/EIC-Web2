/// <reference types="react" />
import { OmitNodes } from "../../Relation/shared/models";
export declare const useRelationsState: () => {
    setBaseTypesOn: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    baseTypesOn: boolean;
    editMode: string;
    setEditMode: import("react").Dispatch<import("react").SetStateAction<string>>;
    fieldsOn: boolean;
    setFieldsOn: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    ctrlToZoom: boolean;
    setCtrlToZoom: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    libraryNodesOn: boolean;
    setLibraryNodesOn: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    printPreviewActive: boolean;
    setPrintPreviewActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    printPreviewReady: boolean;
    setPrintPreviewReady: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    omitNodes: OmitNodes | undefined;
    setOmitNodes: import("react").Dispatch<import("react").SetStateAction<OmitNodes | undefined>>;
};
export declare const RelationsProvider: import("react").ComponentType<import("unstated-next").ContainerProviderProps<void>>;
