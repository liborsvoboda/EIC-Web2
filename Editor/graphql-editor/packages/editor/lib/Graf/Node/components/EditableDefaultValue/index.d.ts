import React from "react";
interface EditableDefaultValueProps {
    value: string;
    onChange?: (value: string) => void;
    style?: React.CSSProperties;
}
export declare const EditableDefaultValue: React.FC<EditableDefaultValueProps>;
export {};
