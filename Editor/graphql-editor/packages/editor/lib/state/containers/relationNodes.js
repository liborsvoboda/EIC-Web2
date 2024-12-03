"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationNodesProvider = exports.useRelationNodesState = exports.toggleableTypes = void 0;
const unstated_next_1 = require("unstated-next");
const react_1 = require("react");
const trees_1 = require("./trees");
const graphql_js_tree_1 = require("graphql-js-tree");
const Resolve_1 = require("../../GraphQL/Resolve");
exports.toggleableTypes = [
    graphql_js_tree_1.TypeDefinition.ObjectTypeDefinition,
    graphql_js_tree_1.TypeExtension.ObjectTypeExtension,
    graphql_js_tree_1.TypeDefinition.UnionTypeDefinition,
    graphql_js_tree_1.TypeExtension.UnionTypeExtension,
    graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition,
    graphql_js_tree_1.TypeExtension.InterfaceTypeExtension,
    graphql_js_tree_1.TypeDefinition.InputObjectTypeDefinition,
    graphql_js_tree_1.TypeExtension.InputObjectTypeExtension,
    graphql_js_tree_1.TypeDefinition.EnumTypeDefinition,
    graphql_js_tree_1.TypeExtension.EnumTypeExtension,
    graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition,
    graphql_js_tree_1.TypeExtension.ScalarTypeExtension,
    graphql_js_tree_1.TypeSystemDefinition.DirectiveDefinition,
];
const useRelationNodes = (0, unstated_next_1.createContainer)(() => {
    const { allNodes, setSelectedNodeId, selectedNodeId, focusMode } = (0, trees_1.useTreesState)();
    const relationNodes = (0, react_1.useMemo)(() => allNodes.nodes.filter((n) => exports.toggleableTypes.includes(n.data.type)), [allNodes]);
    const [nodesVisibilityArr, setNodesVisibilityArr] = (0, react_1.useState)(relationNodes.map((el) => ({ id: el.id, isHidden: false })));
    const [typeRelatedToFocusedNode, setTypeRelatedToFocusedNode] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setNodesVisibilityArr((prev) => {
            const newArray = relationNodes.map((el) => {
                const foundElement = prev.find((el2) => el.id === el2.id);
                return { id: el.id, isHidden: (foundElement === null || foundElement === void 0 ? void 0 : foundElement.isHidden) || false };
            });
            return newArray;
        });
    }, [allNodes]);
    const filteredRelationNodes = (0, react_1.useMemo)(() => {
        return relationNodes.filter((el) => {
            const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
            return foundNode ? !foundNode.isHidden : true;
        });
    }, [nodesVisibilityArr]);
    const hideRelationNodes = (0, react_1.useCallback)(() => {
        setNodesVisibilityArr((prev) => prev.map((el) => ({ id: el.id, isHidden: true })));
        setSelectedNodeId({ source: "relation", value: undefined });
    }, []);
    const showRelationNodes = (0, react_1.useCallback)(() => setNodesVisibilityArr((prev) => prev.map((el) => ({ id: el.id, isHidden: false }))), []);
    const focusedNodes = (0, react_1.useMemo)(() => {
        setTypeRelatedToFocusedNode([]);
        const nId = focusMode;
        if (nId) {
            const n = allNodes.nodes.find((an) => an.id === nId);
            if (n) {
                const types = n.args.map((a) => (0, graphql_js_tree_1.getTypeName)(a.type.fieldType));
                const argChild = n.args
                    .flatMap((a) => a.args)
                    .map((ca) => (0, graphql_js_tree_1.getTypeName)(ca.type.fieldType));
                const argChildren = allNodes.nodes.filter((an) => argChild.includes(an.name));
                const children = allNodes.nodes.filter((an) => types.includes(an.name));
                const parents = allNodes.nodes.filter((an) => an.args.some((a) => (0, graphql_js_tree_1.getTypeName)(a.type.fieldType) === n.name ||
                    a.args.some((aaa) => (0, graphql_js_tree_1.getTypeName)(aaa.type.fieldType) === n.name)));
                const interfacesRelatedToNode = allNodes.nodes.filter((node) => n.interfaces.includes(node.name));
                const nodesRelatedToInterface = n.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition
                    ? allNodes.nodes.filter((node) => node.interfaces.includes(n.name))
                    : [];
                const nodeExtensions = allNodes.nodes.filter((node) => (0, Resolve_1.isExtensionNode)(node.data.type) && node.name === (n === null || n === void 0 ? void 0 : n.name));
                const basicNodeToNodeExtension = ((0, Resolve_1.isExtensionNode)(n === null || n === void 0 ? void 0 : n.data.type) &&
                    allNodes.nodes.filter((node) => node.name === n.name &&
                        !(0, Resolve_1.isExtensionNode)(node.data.type) &&
                        node.id !== n.id)) ||
                    [];
                const relatedFocusNodes = [
                    ...children,
                    ...parents,
                    ...argChildren,
                    ...interfacesRelatedToNode,
                    ...nodesRelatedToInterface,
                    ...((0, Resolve_1.isExtensionNode)(n.data.type) ? basicNodeToNodeExtension : [n]),
                    ...nodeExtensions,
                ];
                return relatedFocusNodes
                    .filter((n, i) => i === relatedFocusNodes.findIndex((rfn) => rfn.id === n.id))
                    .filter((n) => exports.toggleableTypes.includes(n.data.type));
            }
        }
        return;
    }, [focusMode]);
    const filteredFocusedNodes = (0, react_1.useMemo)(() => {
        return focusedNodes === null || focusedNodes === void 0 ? void 0 : focusedNodes.filter((el) => {
            const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
            return foundNode ? !foundNode.isHidden : true;
        });
    }, [nodesVisibilityArr, focusedNodes]);
    const toggleNodeVisibility = (0, react_1.useCallback)((node) => {
        var _a;
        const newArr = [...nodesVisibilityArr];
        const foundIdx = newArr.findIndex((el) => el.id === node.id);
        newArr[foundIdx].isHidden = !newArr[foundIdx].isHidden;
        setNodesVisibilityArr(newArr);
        ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id) === node.id &&
            setSelectedNodeId({ source: "navigation", value: undefined });
    }, [nodesVisibilityArr]);
    const allVisible = (0, react_1.useMemo)(() => !nodesVisibilityArr.some((n) => n.isHidden), [nodesVisibilityArr]);
    const setTypeRelatedNodesToFocusedNode = (0, react_1.useCallback)((node) => {
        const alreadyExistsInTypeRelatedToFocusedNode = typeRelatedToFocusedNode.find((el) => el.id === node.id);
        const alreadyExistsInFocusedNodes = focusedNodes === null || focusedNodes === void 0 ? void 0 : focusedNodes.find((el) => el.id === node.id);
        const isToggleableTypeNode = exports.toggleableTypes.includes(node.data.type);
        if (!alreadyExistsInTypeRelatedToFocusedNode &&
            !alreadyExistsInFocusedNodes &&
            isToggleableTypeNode) {
            setTypeRelatedToFocusedNode([...typeRelatedToFocusedNode, node]);
        }
    }, [focusedNodes, typeRelatedToFocusedNode]);
    const filteredTypeRelatedToFocusedNode = (0, react_1.useMemo)(() => {
        return typeRelatedToFocusedNode === null || typeRelatedToFocusedNode === void 0 ? void 0 : typeRelatedToFocusedNode.filter((el) => {
            const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
            return foundNode ? !foundNode.isHidden : true;
        });
    }, [nodesVisibilityArr, typeRelatedToFocusedNode]);
    return {
        filteredRelationNodes,
        nodesVisibilityArr,
        hideRelationNodes,
        showRelationNodes,
        filteredFocusedNodes,
        toggleNodeVisibility,
        allVisible,
        focusedNodes,
        typeRelatedToFocusedNode,
        filteredTypeRelatedToFocusedNode,
        setTypeRelatedNodesToFocusedNode,
    };
});
exports.useRelationNodesState = useRelationNodes.useContainer;
exports.RelationNodesProvider = useRelationNodes.Provider;
