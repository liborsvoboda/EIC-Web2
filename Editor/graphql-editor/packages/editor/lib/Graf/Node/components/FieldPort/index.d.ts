import React from "react";
interface FieldPortProps {
    onClick: () => void;
    open?: boolean;
    icons: {
        closed: React.ReactNode;
        open: React.ReactNode;
    };
    children?: React.ReactNode;
}
export declare const FieldPort: React.ForwardRefExoticComponent<FieldPortProps & React.RefAttributes<HTMLDivElement>>;
export {};
