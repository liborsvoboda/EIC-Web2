import React from "react";
interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    hideMenu: () => void;
    menuName?: string;
}
export declare const Menu: React.ForwardRefExoticComponent<Omit<MenuProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export {};
