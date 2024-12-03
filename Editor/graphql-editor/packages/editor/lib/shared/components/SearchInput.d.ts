import React from "react";
interface MenuSearchProps {
    value: string;
    onChange: (v: string) => void;
    onClear: () => void;
    onSubmit: () => void;
    placeholder?: string;
    icon?: "search" | "add";
}
export declare const SearchInput: React.ForwardRefExoticComponent<MenuSearchProps & React.RefAttributes<HTMLInputElement>>;
export {};
