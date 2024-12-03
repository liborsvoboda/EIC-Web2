"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePane = void 0;
const react_1 = __importStar(require("react"));
const monaco_1 = require("./monaco");
const containers_1 = require("../../state/containers");
const guild_1 = require("./guild");
const monaco_2 = require("./monaco");
const graphql_js_tree_1 = require("graphql-js-tree");
const Code_1 = require("./style/Code");
const useDebouncedValue_1 = require("../../shared/hooks/useDebouncedValue");
const Models_1 = require("../../Models");
exports.CodePane = react_1.default.forwardRef((props, ref) => {
    var _a;
    const { schema, readonly, onChange, fullScreen } = props;
    const { theme } = (0, containers_1.useTheme)();
    const { selectedNodeId, setSelectedNodeId, allNodes } = (0, containers_1.useTreesState)();
    const { errorRowNumber } = (0, containers_1.useErrorsState)();
    const [temporaryString, setTemporaryString] = (0, react_1.useState)(schema.code);
    const debouncedTemporaryString = (0, useDebouncedValue_1.useDebouncedValue)(temporaryString, 800);
    const liveEditorApi = react_1.default.createRef();
    const codeSettings = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, monaco_1.settings), { fontFamily: theme.fontFamily, readOnly: readonly })), [readonly]);
    (0, react_1.useEffect)(() => {
        if (temporaryString !== schema.code) {
            onChange(debouncedTemporaryString, true);
        }
    }, [debouncedTemporaryString]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (liveEditorApi.current) {
            if ((selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.source) === "code") {
                return;
            }
            ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.name)
                ? liveEditorApi.current.jumpToType(selectedNodeId.value.name)
                : liveEditorApi.current.deselect();
        }
    }, [(_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id]);
    (0, react_1.useEffect)(() => {
        if (liveEditorApi.current && errorRowNumber) {
            liveEditorApi.current.jumpToError(errorRowNumber);
        }
    }, [errorRowNumber]);
    (0, react_1.useImperativeHandle)(ref, () => {
        return {
            receive: (e) => {
                var _a;
                (_a = liveEditorApi.current) === null || _a === void 0 ? void 0 : _a.receive(e);
            },
        };
    }, [liveEditorApi]);
    const selectFunction = (0, react_1.useCallback)((e) => {
        var _a;
        if (fullScreen)
            return;
        if (e) {
            const op = typeof e === "object" && e.operation
                ? e.operation.toLowerCase()
                : undefined;
            let n;
            if (op) {
                const schemaNode = allNodes.nodes.find((n) => n.data.type === graphql_js_tree_1.TypeSystemDefinition.SchemaDefinition);
                const opArg = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.args.find((a) => a.name === op);
                if (opArg) {
                    const opType = (0, graphql_js_tree_1.getTypeName)(opArg.type.fieldType);
                    n = allNodes.nodes.find((n) => n.name === opType);
                }
            }
            n = n || allNodes.nodes.find((an) => an.name === e);
            if ((n === null || n === void 0 ? void 0 : n.id) === ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id))
                return;
            setSelectedNodeId({
                source: "code",
                value: n ? { id: n.id, name: n.name } : undefined,
            });
        }
    }, [fullScreen, allNodes, selectedNodeId, setSelectedNodeId]);
    return (react_1.default.createElement(Code_1.CodeContainer, Object.assign({}, (0, Models_1.dataIt)("codeView")), theme && (react_1.default.createElement(guild_1.LiveSchemaEditor, { onContentChange: props.onContentChange, height: "100%", ref: liveEditorApi, onEditorMount: props.onEditorMount, beforeMount: (monaco) => monaco.editor.defineTheme("graphql-editor", (0, monaco_2.theme)(theme)), onChange: (v) => {
            if (props.readonly)
                return;
            if (v === schema.code)
                return;
            setTemporaryString(v || "");
        }, onBlur: (v) => {
            if (props.readonly)
                return;
            if (v === schema.code)
                return;
            onChange(v);
        }, schema: schema, options: codeSettings, select: selectFunction }))));
});
