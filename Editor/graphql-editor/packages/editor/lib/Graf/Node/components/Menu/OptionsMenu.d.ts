import React from 'react';
interface OptionsMenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    options: Record<string, boolean>;
    onCheck: (name: string) => void;
    hideMenu: () => void;
    menuName: string;
}
export declare const OptionsMenu: React.ForwardRefExoticComponent<Omit<OptionsMenuProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export {};
