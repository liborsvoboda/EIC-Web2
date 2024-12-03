import React from "react";
interface TypedMenuItemProps {
    onClick: () => void;
    name?: string;
    type: string;
    dataType: string;
    selected?: boolean;
}
export declare const TypedMenuItem: React.FC<TypedMenuItemProps>;
export {};
