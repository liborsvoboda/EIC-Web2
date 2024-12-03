import React from "react";
interface MenuScrollingAreaProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    controls?: {
        arrowDown?: () => void;
        arrowUp?: () => void;
    };
}
export declare const MenuScrollingArea: React.FC<MenuScrollingAreaProps>;
export {};
