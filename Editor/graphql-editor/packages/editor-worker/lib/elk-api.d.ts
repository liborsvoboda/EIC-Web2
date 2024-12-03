export type LayoutOptions = Record<string, string>;
export type ElkPoint = {
    x: number;
    y: number;
};
export type ElkGraphElement = {
    id?: string;
    labels?: ElkLabel[];
    layoutOptions?: LayoutOptions;
};
export type ElkShape = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
} & ElkGraphElement;
export type ElkNode = {
    id: string;
    children?: ElkNode[];
    ports?: ElkPort[];
    edges?: ElkExtendedEdge[];
} & ElkShape;
export type ElkPort = {
    id: string;
} & ElkShape;
export type ElkLabel = {
    text?: string;
} & ElkShape;
export type ElkEdge = {
    id: string;
    junctionPoints?: ElkPoint[];
} & ElkGraphElement;
export type ElkExtendedEdge = {
    sources: string[];
    targets: string[];
    sections?: ElkEdgeSection[];
} & ElkEdge;
export type ElkEdgeSection = {
    id: string;
    startPoint: ElkPoint;
    endPoint: ElkPoint;
    bendPoints?: ElkPoint[];
    incomingShape?: string;
    outgoingShape?: string;
    incomingSections?: string[];
    outgoingSections?: string[];
} & ElkGraphElement;
export type ElkLayoutArguments = {
    layoutOptions?: LayoutOptions;
    logging?: boolean;
    measureExecutionTime?: boolean;
};
export type ElkCommonDescription = {
    id?: string;
    name?: string;
    description?: string;
};
export type ElkLayoutAlgorithmDescription = {
    category?: string;
    knownOptions?: string[];
    supportedFeatures?: string[];
} & ElkCommonDescription;
export type ElkLayoutCategoryDescription = {
    knownLayouters?: string[];
} & ElkCommonDescription;
export type ElkLayoutOptionDescription = {
    group?: string;
    type?: string;
    targets?: string[];
} & ElkCommonDescription;
export declare class ElkApi {
    private readonly worker;
    private id;
    private readonly resolvers;
    private initialized;
    constructor();
    layout(graph: ElkNode, args?: ElkLayoutArguments): Promise<ElkNode>;
    knownLayoutAlgorithms(): Promise<ElkLayoutAlgorithmDescription[]>;
    knownLayoutOptions(): Promise<ElkLayoutOptionDescription[]>;
    knownLayoutCategories(): Promise<ElkLayoutCategoryDescription[]>;
    private init;
    private run;
    private convertGwtStyleError;
}
