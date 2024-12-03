"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayType = exports.isScalarArgument = exports.isBaseScalar = exports.ResolveDirectives = exports.ResolveImplementInterface = exports.ResolvePossibleOperationTypes = exports.ResolveCreateField = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const BuiltInNodes_1 = require("./BuiltInNodes");
const ResolveCreateField = (field, actualFields) => {
    var _a;
    const typeName = (0, graphql_js_tree_1.getTypeName)(field.type.fieldType);
    if (field.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition ||
        field.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition ||
        field.data.type === graphql_js_tree_1.TypeExtension.InterfaceTypeExtension ||
        field.data.type === graphql_js_tree_1.TypeExtension.ObjectTypeExtension) {
        return BuiltInNodes_1.BuiltInScalars.concat(actualFields)
            .filter((f) => f.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.UnionTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition)
            .map((n) => (Object.assign(Object.assign({}, n), { data: {
                type: graphql_js_tree_1.TypeSystemDefinition.FieldDefinition,
            } })));
    }
    if (field.data.type === graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition ||
        field.data.type === graphql_js_tree_1.TypeExtension.InputObjectTypeExtension ||
        field.data.type === graphql_js_tree_1.TypeSystemDefinition.FieldDefinition ||
        field.data.type === graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition) {
        return actualFields
            .filter((f) => f.data.type === graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition ||
            f.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition)
            .concat(BuiltInNodes_1.BuiltInScalars)
            .map((n) => (Object.assign(Object.assign({}, n), { data: {
                type: graphql_js_tree_1.ValueDefinition.InputValueDefinition,
            } })));
    }
    if (field.data.type === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition) {
        return [
            (0, graphql_js_tree_1.createParserField)({
                data: {
                    type: graphql_js_tree_1.ValueDefinition.EnumValueDefinition,
                },
                type: {
                    fieldType: {
                        name: graphql_js_tree_1.ValueDefinition.EnumValueDefinition,
                        type: graphql_js_tree_1.Options.name,
                    },
                },
                name: "",
            }),
        ];
    }
    if (field.data.type === graphql_js_tree_1.TypeDefinition.UnionTypeDefinition ||
        field.data.type === graphql_js_tree_1.TypeExtension.UnionTypeExtension) {
        return actualFields
            .filter((f) => f.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition)
            .map((n) => (Object.assign(Object.assign({}, n), { type: {
                fieldType: {
                    name: n.name,
                    type: graphql_js_tree_1.Options.name,
                },
            }, data: {
                type: graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition,
            } })));
    }
    if (field.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition) {
        return undefined;
    }
    if (field.data.type === graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition) {
        return undefined;
    }
    if (field.data.type === graphql_js_tree_1.Instances.Directive) {
        const typeNode = actualFields.find((a) => a.name === typeName);
        return (((_a = typeNode === null || typeNode === void 0 ? void 0 : typeNode.args) === null || _a === void 0 ? void 0 : _a.filter((a) => { var _a; return !((_a = field.args) === null || _a === void 0 ? void 0 : _a.map((el) => el.name).includes(a.name)); }).map((a) => {
            return Object.assign(Object.assign({}, a), { data: {
                    type: graphql_js_tree_1.Instances.Argument,
                }, type: {
                    fieldType: {
                        name: a.name,
                        type: graphql_js_tree_1.Options.name,
                    },
                }, value: {
                    value: "",
                    type: checkValueType(a, actualFields),
                }, args: [] });
        })) || []);
    }
    return [];
};
exports.ResolveCreateField = ResolveCreateField;
const ResolvePossibleOperationTypes = (actualFields) => {
    return (actualFields.filter((f) => f.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition) || []);
};
exports.ResolvePossibleOperationTypes = ResolvePossibleOperationTypes;
const ResolveImplementInterface = (field, actualFields) => {
    if (field.data.type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition ||
        field.data.type === graphql_js_tree_1.TypeExtension.ObjectTypeExtension ||
        field.data.type === graphql_js_tree_1.TypeExtension.InterfaceTypeExtension ||
        field.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition) {
        return actualFields
            .filter((f) => f.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition)
            .filter((f) => f.name !== field.name);
    }
    return [];
};
exports.ResolveImplementInterface = ResolveImplementInterface;
const getAcceptedDirectives = (f) => {
    const { data: { type }, } = f;
    if (type === graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.ObjectTypeExtension) {
        return [graphql_js_tree_1.Directive.OBJECT];
    }
    if (type === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.EnumTypeExtension) {
        return [graphql_js_tree_1.Directive.ENUM];
    }
    if (type === graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.InputObjectTypeExtension) {
        return [graphql_js_tree_1.Directive.INPUT_OBJECT];
    }
    if (type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.InterfaceTypeExtension) {
        return [graphql_js_tree_1.Directive.INTERFACE];
    }
    if (type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.ScalarTypeExtension) {
        return [graphql_js_tree_1.Directive.SCALAR];
    }
    if (type === graphql_js_tree_1.TypeDefinition.UnionTypeDefinition ||
        type === graphql_js_tree_1.TypeExtension.UnionTypeExtension) {
        return [graphql_js_tree_1.Directive.UNION];
    }
    if (type === graphql_js_tree_1.TypeSystemDefinition.FieldDefinition) {
        return [graphql_js_tree_1.Directive.FIELD_DEFINITION];
    }
    if (type === graphql_js_tree_1.ValueDefinition.EnumValueDefinition) {
        return [graphql_js_tree_1.Directive.ENUM_VALUE];
    }
    if (type === graphql_js_tree_1.ValueDefinition.InputValueDefinition) {
        return [graphql_js_tree_1.Directive.INPUT_FIELD_DEFINITION];
    }
    return [];
};
const ResolveDirectives = (field, actualFields) => {
    const acceptedDirectives = getAcceptedDirectives(field);
    return actualFields
        .filter((f) => f.data.type === graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition)
        .filter((f) => { var _a; return !!((_a = f.type.directiveOptions) === null || _a === void 0 ? void 0 : _a.find((dO) => acceptedDirectives.includes(dO))); });
};
exports.ResolveDirectives = ResolveDirectives;
const isBaseScalar = (typeName) => {
    if (typeName === graphql_js_tree_1.ScalarTypes.Boolean) {
        return true;
    }
    if (typeName === graphql_js_tree_1.ScalarTypes.Float) {
        return true;
    }
    if (typeName === graphql_js_tree_1.ScalarTypes.ID) {
        return true;
    }
    if (typeName === graphql_js_tree_1.ScalarTypes.Int) {
        return true;
    }
    if (typeName === graphql_js_tree_1.ScalarTypes.String) {
        return true;
    }
    return false;
};
exports.isBaseScalar = isBaseScalar;
const isScalarArgument = (field, scalarTypes) => {
    const typeName = (0, graphql_js_tree_1.getTypeName)(field.type.fieldType);
    return (0, exports.isBaseScalar)(typeName) || scalarTypes.includes(typeName);
};
exports.isScalarArgument = isScalarArgument;
const checkValueType = (node, nodes) => {
    const isArray = (0, exports.isArrayType)(node.type.fieldType);
    if (isArray)
        return graphql_js_tree_1.Value.ListValue;
    const tName = (0, graphql_js_tree_1.getTypeName)(node.type.fieldType);
    const scalarTypes = nodes
        .filter((n) => n.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition)
        .map((n) => n.name);
    if ((0, exports.isScalarArgument)(node, scalarTypes)) {
        if (tName === graphql_js_tree_1.ScalarTypes.Boolean) {
            return graphql_js_tree_1.Value.BooleanValue;
        }
        if (tName === graphql_js_tree_1.ScalarTypes.Float) {
            return graphql_js_tree_1.Value.FloatValue;
        }
        if (tName === graphql_js_tree_1.ScalarTypes.ID) {
            return graphql_js_tree_1.Value.IDValue;
        }
        if (tName === graphql_js_tree_1.ScalarTypes.Int) {
            return graphql_js_tree_1.Value.IntValue;
        }
        if (tName === graphql_js_tree_1.ScalarTypes.String) {
            return graphql_js_tree_1.Value.StringValue;
        }
        return graphql_js_tree_1.Value.ScalarValue;
    }
    const parentNode = nodes.find((n) => n.name === tName);
    if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.data.type) === graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition ||
        (parentNode === null || parentNode === void 0 ? void 0 : parentNode.data.type) === graphql_js_tree_1.TypeExtension.InputObjectTypeExtension) {
        return graphql_js_tree_1.Value.ObjectValue;
    }
    if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.data.type) === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition ||
        (parentNode === null || parentNode === void 0 ? void 0 : parentNode.data.type) === graphql_js_tree_1.TypeExtension.EnumTypeExtension) {
        return graphql_js_tree_1.Value.EnumValue;
    }
    return graphql_js_tree_1.Value.Variable;
};
const isArrayType = (f) => f.type === graphql_js_tree_1.Options.required
    ? f.nest.type === graphql_js_tree_1.Options.array
    : f.type === graphql_js_tree_1.Options.array;
exports.isArrayType = isArrayType;
