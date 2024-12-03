"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreesStateProvider = exports.useTreesState = void 0;
const unstated_next_1 = require("unstated-next");
const react_1 = require("react");
const graphql_js_tree_1 = require("graphql-js-tree");
const graphql_editor_worker_1 = require("graphql-editor-worker");
const Resolve_1 = require("../../../GraphQL/Resolve");
const containers_1 = require("..");
const DOMClassNames_1 = require("../../../shared/hooks/DOMClassNames");
let snapLock = true;
const useTreesStateContainer = (0, unstated_next_1.createContainer)(() => {
    var _a, _b;
    const [tree, _setTree] = (0, react_1.useState)({
        nodes: [],
        schema: false,
        initial: true,
    });
    const [libraryTree, setLibraryTree] = (0, react_1.useState)({ nodes: [] });
    const [snapshots, setSnapshots] = (0, react_1.useState)([]);
    const [focusMode, setFocusMode] = (0, react_1.useState)();
    const [undos, setUndos] = (0, react_1.useState)([]);
    const [selectedNodeId, _setSelectedNodeId] = (0, react_1.useState)();
    const [readonly, setReadonly] = (0, react_1.useState)(false);
    const { setCodeErrors } = (0, containers_1.useErrorsState)();
    const allNodes = (0, react_1.useMemo)(() => {
        return { nodes: tree.nodes };
    }, [tree]);
    const activeNode = (0, react_1.useMemo)(() => {
        return allNodes.nodes.find((n) => { var _a; return n.id === ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id); });
    }, [selectedNodeId, allNodes]);
    const scalars = (0, react_1.useMemo)(() => {
        const ownScalars = allNodes.nodes
            .filter((node) => (node.data.type === graphql_js_tree_1.TypeDefinition.ScalarTypeDefinition ||
            node.data.type === graphql_js_tree_1.TypeDefinition.EnumTypeDefinition) &&
            node.name)
            .map((scalar) => scalar.name)
            .concat(Resolve_1.BuiltInScalars.map((a) => a.name));
        return ownScalars;
    }, [allNodes]);
    const mutationRoot = (0, react_1.useMemo)(() => (0, graphql_js_tree_1.mutate)(tree, allNodes.nodes), [tree, allNodes]);
    const parentTypes = (0, react_1.useMemo)(() => (Object.assign({}, allNodes.nodes.reduce((obj, item) => Object.assign(obj, { [item.name]: (0, graphql_js_tree_1.getTypeName)(item.type.fieldType) }), {}))), [allNodes]);
    const isLibrary = (0, react_1.useCallback)((node) => !!node.fromLibrary, []);
    const updateNode = (node, fn) => {
        var _a, _b;
        const isSelected = node.id === ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id);
        makeSnapshot();
        fn === null || fn === void 0 ? void 0 : fn();
        setTree(tree);
        if (isSelected) {
            if (((_b = selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.id) !== node.id) {
                setSelectedNodeId({
                    source: "relation",
                    value: {
                        id: node.id,
                        name: node.name,
                    },
                });
            }
            else {
                if (!tree.nodes.find((n) => n.id === node.id)) {
                    setSelectedNodeId({
                        source: "relation",
                        value: undefined,
                    });
                }
            }
        }
    };
    const setTree = (v, blockSchemaUpdate) => {
        if (typeof v === "function") {
            _setTree((prevState) => {
                const result = v(prevState);
                return Object.assign(Object.assign({}, result), { schema: !!blockSchemaUpdate, initial: false });
            });
            return;
        }
        _setTree(Object.assign(Object.assign({}, v), { schema: !!blockSchemaUpdate, initial: false }));
    };
    const past = () => {
        const p = snapshots.pop();
        if (p) {
            setUndos((u) => [...u, p]);
            setSnapshots([...snapshots]);
            return JSON.parse(p);
        }
    };
    const future = () => {
        const p = undos.pop();
        if (p) {
            setUndos([...undos]);
            setSnapshots((s) => [...s, p]);
            return JSON.parse(p);
        }
    };
    const makeSnapshot = () => {
        if (snapLock) {
            snapLock = false;
            return;
        }
        const copyTree = JSON.stringify({ tree, selectedNodeId });
        if (snapshots.length === 0) {
            setSnapshots([copyTree]);
            return;
        }
        if (snapshots[snapshots.length - 1] !== copyTree) {
            setSnapshots([...snapshots, copyTree]);
        }
    };
    const undo = () => {
        const p = past();
        if (p) {
            snapLock = true;
            setTree(p.tree);
            setSelectedNodeId(p.selectedNodeId);
        }
    };
    const redo = () => {
        const f = future();
        if (f) {
            snapLock = true;
            setTree(f.tree);
            setSelectedNodeId(f.selectedNodeId);
        }
    };
    const relatedToSelectedTypes = (activeNode) => {
        const parents = allNodes.nodes.filter((node) => activeNode === null || activeNode === void 0 ? void 0 : activeNode.args.flatMap((ana) => ana.args).map((ana) => (0, graphql_js_tree_1.getTypeName)(ana.type.fieldType)).includes(node.name));
        const inputs = allNodes.nodes.filter((an) => an.args.find((ana) => (0, graphql_js_tree_1.getTypeName)(ana.type.fieldType) === (activeNode === null || activeNode === void 0 ? void 0 : activeNode.name) ||
            ana.args.find((nestedArg) => (0, graphql_js_tree_1.getTypeName)(nestedArg.type.fieldType) === (activeNode === null || activeNode === void 0 ? void 0 : activeNode.name))));
        const interfacesRelatedToActiveNode = allNodes.nodes.filter((node) => activeNode === null || activeNode === void 0 ? void 0 : activeNode.interfaces.includes(node.name));
        const nodesRelatedToActiveInterface = activeNode &&
            activeNode.data.type === graphql_js_tree_1.TypeDefinition.InterfaceTypeDefinition
            ? allNodes.nodes.filter((node) => node.interfaces.includes(activeNode.name))
            : [];
        const nodeExtensions = allNodes.nodes.filter((node) => (0, Resolve_1.isExtensionNode)(node.data.type) &&
            node.name === (activeNode === null || activeNode === void 0 ? void 0 : activeNode.name) &&
            node.id !== activeNode.id);
        const basicNodeToNodeExtension = (activeNode &&
            (0, Resolve_1.isExtensionNode)(activeNode === null || activeNode === void 0 ? void 0 : activeNode.data.type) &&
            allNodes.nodes.filter((node) => node.name === activeNode.name &&
                !(0, Resolve_1.isExtensionNode)(node.data.type) &&
                node.id !== activeNode.id)) ||
            [];
        const argsTypeRelated = allNodes.nodes.filter((node) => activeNode === null || activeNode === void 0 ? void 0 : activeNode.args.map((arg) => (0, graphql_js_tree_1.getTypeName)(arg.type.fieldType)).includes(node.name));
        const notBaseTypes = argsTypeRelated
            .concat(parents)
            .concat(inputs)
            .concat(interfacesRelatedToActiveNode)
            .concat(nodesRelatedToActiveInterface)
            .concat(nodeExtensions)
            .concat(basicNodeToNodeExtension)
            .filter((n) => !(0, Resolve_1.isBaseScalar)(n.name));
        const filtered = notBaseTypes === null || notBaseTypes === void 0 ? void 0 : notBaseTypes.filter((t, index) => index === notBaseTypes.indexOf(t));
        return filtered;
    };
    const relatedToSelected = (0, react_1.useMemo)(() => relatedToSelectedTypes(activeNode), [activeNode]);
    const relatedNodeIdsToSelected = (0, react_1.useMemo)(() => {
        return relatedToSelected === null || relatedToSelected === void 0 ? void 0 : relatedToSelected.map((n) => n.id);
    }, [relatedToSelected, allNodes]);
    const setSelectedNodeId = (0, react_1.useCallback)((_selectedNodeId) => {
        var _a, _b;
        const nodeId = (_a = _selectedNodeId === null || _selectedNodeId === void 0 ? void 0 : _selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id;
        if (nodeId !== ((_b = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.id) ||
            (_selectedNodeId === null || _selectedNodeId === void 0 ? void 0 : _selectedNodeId.justCreated) !== (selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.justCreated)) {
            DOMClassNames_1.DOMEvents.selectNode.trigger(nodeId);
            setTimeout(() => {
                return _setSelectedNodeId(_selectedNodeId);
            }, 250);
        }
    }, [_setSelectedNodeId, allNodes, (_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id, focusMode]);
    const setSelectedNodeIdThatWillBeAdded = (0, react_1.useCallback)((_selectedNodeId) => {
        var _a, _b;
        const nodeId = (_a = _selectedNodeId === null || _selectedNodeId === void 0 ? void 0 : _selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id;
        if (nodeId !== ((_b = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.id) ||
            (_selectedNodeId === null || _selectedNodeId === void 0 ? void 0 : _selectedNodeId.justCreated) !== (selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.justCreated)) {
            return _setSelectedNodeId(_selectedNodeId);
        }
    }, [_setSelectedNodeId, allNodes, (_b = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _b === void 0 ? void 0 : _b.id, focusMode]);
    const generateTreeFromSchema = (schema) => __awaiter(void 0, void 0, void 0, function* () {
        if (!schema.code && !schema.libraries) {
            setTree({ nodes: [] }, true);
            return;
        }
        try {
            yield graphql_editor_worker_1.GraphQLEditorWorker.generateTree({
                schema: schema.code,
                libraries: schema.libraries,
            }).then((parsedResult) => {
                setTree({
                    nodes: parsedResult.nodes,
                }, true);
            });
            yield graphql_editor_worker_1.GraphQLEditorWorker.validate(schema.code, schema.libraries).then((errors) => {
                setCodeErrors(errors);
            });
        }
        catch (error) {
            yield graphql_editor_worker_1.GraphQLEditorWorker.validate(schema.code, schema.libraries).then((errors) => {
                setCodeErrors(errors);
            });
        }
    });
    const updateFieldOnNode = (node, i, updatedField, parentNode) => {
        updateNode(node, () => mutationRoot.updateFieldOnNode(node, i, updatedField, parentNode));
    };
    const addFieldToNode = (node, f, name, parentNode) => {
        updateNode(node, () => {
            var _a;
            let newName = name || f.name[0].toLowerCase() + f.name.slice(1);
            const existingNodes = ((_a = node.args) === null || _a === void 0 ? void 0 : _a.filter((a) => a.name.match(`${newName}\d?`))) || [];
            if (existingNodes.length > 0) {
                newName = `${newName}${existingNodes.length}`;
            }
            mutationRoot.addFieldToNode(node, Object.assign(Object.assign({}, f), { name: newName }), parentNode);
        });
    };
    const renameNode = (node, newName) => {
        const isError = allNodes.nodes.map((n) => n.name).includes(newName);
        if (isError) {
            return;
        }
        updateNode(node, () => mutationRoot.renameRootNode(node, newName));
    };
    const removeFieldFromNode = (node, field, parentNode) => {
        updateNode(node, () => {
            if (field.data.type === graphql_js_tree_1.Instances.Argument) {
                node.args = node.args.filter((a) => a.id !== field.id);
                return;
            }
            mutationRoot.removeNode(field, parentNode);
        });
    };
    const removeNode = (node) => {
        updateNode(node, () => {
            mutationRoot.removeNode(node);
        });
    };
    const implementInterface = (node, interfaceNode) => {
        updateNode(node, () => mutationRoot.implementInterface(node, interfaceNode));
    };
    const deImplementInterface = (node, interfaceName) => {
        updateNode(node, () => mutationRoot.deImplementInterface(node, interfaceName));
    };
    const setValue = (node, value) => {
        updateNode(node, () => {
            if (!value) {
                delete node.value;
                return;
            }
            mutationRoot.setValueNode(node, value);
        });
    };
    const idempotentOperationAssign = (node) => {
        const nodeName = node.name.toLowerCase();
        if (!(nodeName === "query" ||
            nodeName === "mutation" ||
            nodeName === "subscription")) {
            return;
        }
        let schemaNode = allNodes.nodes.find((n) => n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition);
        if (!schemaNode) {
            schemaNode = (0, graphql_js_tree_1.createSchemaDefinition)({});
        }
        if (node.name.toLowerCase() === "query" &&
            !schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.query)) {
            schemaNode.args.push((0, graphql_js_tree_1.createPlainField)({ name: graphql_js_tree_1.OperationType.query, type: node.name }));
        }
        if (node.name.toLowerCase() === "mutation" &&
            !schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.mutation)) {
            schemaNode.args.push((0, graphql_js_tree_1.createPlainField)({ name: graphql_js_tree_1.OperationType.mutation, type: node.name }));
        }
        if (node.name.toLowerCase() === "subscription" &&
            !schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.subscription)) {
            schemaNode.args.push((0, graphql_js_tree_1.createPlainField)({ name: graphql_js_tree_1.OperationType.subscription, type: node.name }));
        }
        tree.nodes = tree.nodes.filter((n) => n.data.type !== graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition);
        tree.nodes.push(schemaNode);
    };
    const setOperationNode = (operationType, node) => {
        let noSchemaDefinitionNode = true;
        tree.nodes.forEach((n) => {
            if (n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition) {
                noSchemaDefinitionNode = false;
                n.args = [
                    ...n.args.filter((a) => a.name !== operationType),
                    (0, graphql_js_tree_1.createPlainField)({
                        name: operationType,
                        type: node.name,
                    }),
                ];
            }
        });
        if (noSchemaDefinitionNode) {
            tree.nodes.push((0, graphql_js_tree_1.createSchemaDefinition)({
                operations: {
                    [operationType]: node.name,
                },
            }));
        }
        setTree(tree);
    };
    const removeSchemaNodeField = (operationType) => {
        let removeSchemaNodeDefinition = false;
        tree.nodes.forEach((n) => {
            if (n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition) {
                n.args = n.args.filter((a) => a.name !== operationType);
                if (n.args.length === 0) {
                    removeSchemaNodeDefinition = true;
                }
            }
        });
        if (removeSchemaNodeDefinition) {
            tree.nodes = tree.nodes.filter((n) => n.data.type !== graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition &&
                n.data.type !== graphql_js_tree_1.TypeSystemExtension.SchemaExtension);
        }
        setTree(tree);
    };
    const queryNode = (0, react_1.useMemo)(() => {
        const schemaNode = allNodes.nodes.find((n) => n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition);
        const query = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.args.find((a) => a.name === graphql_js_tree_1.OperationType.query);
        const queryNode = query &&
            allNodes.nodes.find((n) => n.name === (0, graphql_js_tree_1.getTypeName)(query.type.fieldType));
        return queryNode;
    }, [allNodes]);
    const getParentOfField = (f) => {
        const tName = (0, graphql_js_tree_1.getTypeName)(f.type.fieldType);
        if ((0, Resolve_1.isBaseScalar)(tName))
            return;
        const node = allNodes.nodes.find((n) => n.name === tName && !(0, Resolve_1.isExtensionNode)(n.data.type));
        return node;
    };
    const focusNode = (0, react_1.useCallback)((n) => {
        setSelectedNodeId({
            source: "deFocus",
            value: {
                id: n.id,
                name: n.name,
            },
        });
        setFocusMode(n.id);
    }, [setSelectedNodeId, setFocusMode]);
    const exitFocus = (0, react_1.useCallback)(() => {
        setSelectedNodeId({
            source: "deFocus",
            value: selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value,
        });
        setFocusMode(undefined);
    }, [selectedNodeId, setSelectedNodeId]);
    const focusedNode = (0, react_1.useMemo)(() => {
        if (!focusMode)
            return;
        return allNodes.nodes.find((n) => n.id === focusMode);
    }, [focusMode, allNodes]);
    return {
        allNodes,
        tree,
        setTree,
        libraryTree,
        setLibraryTree,
        snapshots,
        setSnapshots,
        selectedNodeId,
        setSelectedNodeId,
        setSelectedNodeIdThatWillBeAdded,
        queryNode,
        getParentOfField,
        activeNode,
        past,
        undos,
        setUndos,
        undo,
        redo,
        makeSnapshot,
        future,
        relatedNodeIdsToSelected,
        relatedToSelectedTypes,
        relatedToSelected,
        parentTypes,
        scalars,
        generateTreeFromSchema,
        readonly,
        setReadonly,
        updateNode,
        isLibrary,
        updateFieldOnNode,
        addFieldToNode,
        renameNode,
        removeNode,
        removeFieldFromNode,
        implementInterface,
        deImplementInterface,
        setValue,
        setOperationNode,
        removeSchemaNodeField,
        idempotentOperationAssign,
        focusMode,
        focusedNode,
        focusNode,
        exitFocus,
    };
});
exports.useTreesState = useTreesStateContainer.useContainer;
exports.TreesStateProvider = useTreesStateContainer.Provider;
