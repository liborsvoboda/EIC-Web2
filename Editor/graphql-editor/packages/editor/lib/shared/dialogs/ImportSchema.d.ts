import React from "react";
import { GraphQLSchema } from "graphql";
export declare const ImportSchema: React.FC<{
    onClose: () => void;
    open?: boolean;
    onImport: (schema: string) => void;
}>;
export declare class Utils {
    static getFromUrl: (url: string, header?: Record<string, string>, signal?: AbortSignal) => Promise<string>;
    static printFullSchema: (schema: GraphQLSchema) => string;
}
export declare const proxyUrl: (url: string) => string;
