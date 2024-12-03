import { ParserField, FieldType } from "graphql-js-tree";
export declare const ResolveCreateField: (field: ParserField, actualFields: ParserField[]) => ParserField[] | undefined;
export declare const ResolvePossibleOperationTypes: (actualFields: ParserField[]) => ParserField[];
export declare const ResolveImplementInterface: (field: ParserField, actualFields: ParserField[]) => ParserField[] | undefined;
export declare const ResolveDirectives: (field: ParserField, actualFields: ParserField[]) => ParserField[];
export declare const isBaseScalar: (typeName: string) => boolean;
export declare const isScalarArgument: (field: ParserField, scalarTypes: string[]) => boolean;
export declare const isArrayType: (f: FieldType) => boolean;
