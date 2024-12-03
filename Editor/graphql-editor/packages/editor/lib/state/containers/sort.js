"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortStateProvider = exports.useSortState = void 0;
const react_1 = require("react");
const unstated_next_1 = require("unstated-next");
const graphql_js_tree_1 = require("graphql-js-tree");
const trees_1 = require("./trees");
const defaultOrderTypes = [
    { name: graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition, value: 7 },
    { name: graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition, value: 6 },
    { name: graphql_js_tree_1.TypeDefinition.UnionTypeDefinition, value: 5 },
    { name: graphql_js_tree_1.TypeDefinition.EnumTypeDefinition, value: 4 },
    { name: graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition, value: 3 },
    { name: graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition, value: 2 },
    { name: graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition, value: 1 },
];
const useSortStateContainer = (0, unstated_next_1.createContainer)(() => {
    const { tree } = (0, trees_1.useTreesState)();
    const [isSortAlphabetically, setIsSortAlphabetically] = (0, react_1.useState)(false);
    const [orderTypes, setOrderTypes] = (0, react_1.useState)(defaultOrderTypes);
    const [isInit, setIsInit] = (0, react_1.useState)(true);
    const [isUserOrder, setIsUserOrder] = (0, react_1.useState)(false);
    const sortByTypes = (a, b) => {
        const bValue = orderTypes.find((t) => t.name === b.data.type)
            ? orderTypes.find((t) => t.name === b.data.type).value
            : 0;
        const aValue = orderTypes.find((t) => t.name === a.data.type)
            ? orderTypes.find((t) => t.name === a.data.type).value
            : 0;
        return bValue - aValue || a.name.localeCompare(b.name);
    };
    const isTypeDefinition = (type) => !!type &&
        (type === graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition ||
            type in graphql_js_tree_1.TypeDefinition);
    (0, react_1.useEffect)(() => {
        if (tree.nodes.length && isInit && !isUserOrder) {
            setIsInit(false);
            const initialOrderTypes = new Set();
            tree.nodes.forEach((node) => {
                isTypeDefinition(node.data.type) &&
                    initialOrderTypes.add(node.data.type);
            });
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.UnionTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.EnumTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition);
            initialOrderTypes.add(graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition);
            const initialOrderTypesArray = Array.from(initialOrderTypes);
            setOrderTypes(initialOrderTypesArray.map((a, i) => ({
                name: a,
                value: i,
            })));
        }
    }, [tree]);
    const sortAlphabetically = (a, b) => a.name.localeCompare(b.name);
    const isNodeBaseType = (nodeOperations) => nodeOperations &&
        (nodeOperations.includes(graphql_js_tree_1.OperationType.mutation) ||
            nodeOperations.includes(graphql_js_tree_1.OperationType.query) ||
            nodeOperations.includes(graphql_js_tree_1.OperationType.subscription));
    return {
        isSortAlphabetically,
        setIsSortAlphabetically,
        orderTypes,
        setOrderTypes,
        sortAlphabetically,
        sortByTypes,
        isNodeBaseType,
        isUserOrder,
        setIsUserOrder,
    };
});
exports.useSortState = useSortStateContainer.useContainer;
exports.SortStateProvider = useSortStateContainer.Provider;
