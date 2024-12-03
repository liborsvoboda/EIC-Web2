import { ParserField } from 'graphql-js-tree';
export declare const compileTypeOptions: ({ type }: Pick<ParserField, 'type'>) => string;
export declare const compileScalarTypes: (type: ParserField['type']) => string;
