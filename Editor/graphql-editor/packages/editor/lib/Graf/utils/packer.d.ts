export type Dimensions = [number, number];
export interface IndexedDimensions {
    dimensions: Dimensions;
    index: number;
}
export interface IndexedBoxes {
    box: Box;
    index: number;
}
interface Box {
    size: Dimensions;
    position: Dimensions;
}
interface Layout {
    size: Dimensions;
    boxes: Box[];
}
export declare function packBoxes(sizes: IndexedDimensions[], sort?: boolean): IndexedBoxes[];
export declare function whitespace(layout: Layout): number;
export {};
