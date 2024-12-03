import React from "react";
interface MenuSearchProps {
    value: string;
    onChange: (v: string) => void;
    onSubmit: () => void;
    placeholder?: string;
}
export declare const MenuSearch: React.FC<MenuSearchProps>;
export {};
