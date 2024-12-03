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
exports.GqlCodePane = void 0;
const react_1 = __importStar(require("react"));
const containers_1 = require("../../../state/containers");
const monaco_1 = require("../monaco");
const GqlSchemaEditor_1 = require("../guild/editor/GqlSchemaEditor");
const Code_1 = require("../style/Code");
const GqlCodePane = (props) => {
    var _a;
    const { schema, readonly, onChange, gql } = props;
    const { theme } = (0, containers_1.useTheme)();
    const { selectedNodeId, setSelectedNodeId, allNodes } = (0, containers_1.useTreesState)();
    const { errorRowNumber } = (0, containers_1.useErrorsState)();
    const ref = react_1.default.createRef();
    const codeSettings = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, monaco_1.settings), { fontFamily: theme.fontFamily, readOnly: readonly })), [readonly]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (ref.current) {
            if ((selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.source) === "code") {
                return;
            }
            ((_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.name)
                ? ref.current.jumpToType(selectedNodeId.value.name)
                : ref.current.deselect();
        }
    }, [(_a = selectedNodeId === null || selectedNodeId === void 0 ? void 0 : selectedNodeId.value) === null || _a === void 0 ? void 0 : _a.id]);
    (0, react_1.useEffect)(() => {
        if (ref.current && errorRowNumber) {
            ref.current.jumpToError(errorRowNumber);
        }
    }, [errorRowNumber]);
    return (react_1.default.createElement(Code_1.CodeContainer, null, theme && (react_1.default.createElement(GqlSchemaEditor_1.GqlSchemaEditor, { setGql: (e) => {
            onChange(e);
        }, gql: gql, height: "100%", ref: ref, beforeMount: (monaco) => monaco.editor.defineTheme("graphql-editor", (0, monaco_1.theme)(theme)), onChange: (v) => {
            if (!props.readonly)
                onChange(v || "");
        }, schema: schema, options: codeSettings, select: (e) => {
            if (e) {
                const n = allNodes.nodes.find((an) => an.name === e);
                setSelectedNodeId({
                    source: "code",
                    value: n && {
                        id: n.id,
                        name: n.name,
                    },
                });
            }
        } }))));
};
exports.GqlCodePane = GqlCodePane;
