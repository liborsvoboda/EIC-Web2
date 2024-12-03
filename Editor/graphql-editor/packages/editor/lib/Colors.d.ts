export declare const Colors: {
    readonly grey: "#F3F3F4";
    readonly main: "#d966ff";
    readonly green: "#acf7c1";
    readonly yellow: "#cfee9e";
    readonly red: "#de3c4b";
    readonly orange: "#f18f01";
    readonly pink: "#e6bccd";
    readonly blue: "#17bebb";
    readonly sky: "#A3E7FC";
};
type HexaDecimal = string;
export declare const fade: (c: HexaDecimal, alpha: number) => string;
export declare const mix: (c1: HexaDecimal, c2: HexaDecimal, weight?: number) => string;
export {};
