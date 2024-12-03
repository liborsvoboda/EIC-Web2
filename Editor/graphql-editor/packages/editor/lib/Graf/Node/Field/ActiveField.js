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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveField = void 0;
const react_1 = __importStar(require("react"));
const graphql_js_tree_1 = require("graphql-js-tree");
const ContextMenu_1 = require("../../../shared/components/ContextMenu");
const trees_1 = require("../../../state/containers/trees");
const components_1 = require("../components");
const styled_1 = __importDefault(require("@emotion/styled"));
const ActiveGrafFieldName_1 = require("./ActiveGrafFieldName");
const ActiveGrafType_1 = require("./ActiveGrafType");
const vars_1 = require("../../../vars");
const ActiveDirectiveName_1 = require("./ActiveDirectiveName");
const utils_1 = require("../../../utils");
const styling_system_1 = require("@aexol-studio/styling-system");
const NodeFieldContainer_1 = require("./NodeFieldContainer");
const Models_1 = require("../../../Models");
const ActiveField = ({ node, inputOpen, inputDisabled, outputOpen, outputDisabled, onInputClick, onOutputClick, isLocked, onDelete, onUpdate, parentNode, }) => {
    var _a, _b, _c, _d;
    const { parentTypes, readonly, setValue } = (0, trees_1.useTreesState)();
    const [menuOpen, setMenuOpen] = (0, react_1.useState)();
    const isEnumValue = node.data.type === graphql_js_tree_1.ValueDefinition.EnumValueDefinition;
    const isInputValue = node.data.type === graphql_js_tree_1.ValueDefinition.InputValueDefinition ||
        node.data.type === graphql_js_tree_1.Instances.Argument;
    const isArgumentNode = node.data.type === graphql_js_tree_1.Instances.Argument;
    const isDirectiveNode = node.data.type === graphql_js_tree_1.Instances.Directive;
    const isFromInterface = !!((_a = node.fromInterface) === null || _a === void 0 ? void 0 : _a.length);
    return (react_1.default.createElement(NodeFieldContainer_1.NodeFieldContainer, Object.assign({}, (0, Models_1.dataIt)("nodeField"), { fromInterface: !!((_b = node.fromInterface) === null || _b === void 0 ? void 0 : _b.length), active: !!(inputOpen || menuOpen || outputOpen) }),
        isDirectiveNode && react_1.default.createElement(ActiveDirectiveName_1.ActiveDirectiveName, { name: node.name }),
        node.data.type !== graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition &&
            !isDirectiveNode && (react_1.default.createElement(ActiveGrafFieldName_1.ActiveGrafFieldName, { afterChange: isLocked || isArgumentNode || isFromInterface
                ? undefined
                : (newName) => {
                    onUpdate(Object.assign(Object.assign({}, node), { name: newName }));
                }, name: node.name, args: node.args, parentTypes: parentTypes })),
        isFromInterface && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ActiveGrafType_1.ActiveGrafType, { type: node.type, parentTypes: parentTypes }),
            react_1.default.createElement(styling_system_1.Tooltip, { title: `This node comes from ${(_c = node.fromInterface) === null || _c === void 0 ? void 0 : _c.join(", ")} and is editable in parent node only`, position: "top-left" },
                react_1.default.createElement(LockContainer, null,
                    react_1.default.createElement(styling_system_1.Lock, null))))),
        node.fromLibrary && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(styling_system_1.Tooltip, { title: `This field comes from library and is a result of merge`, position: "top-left" },
                react_1.default.createElement(LockContainer, null,
                    react_1.default.createElement(styling_system_1.Lock, null))))),
        !isEnumValue &&
            !isArgumentNode &&
            !isDirectiveNode &&
            !isFromInterface && (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "type", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => (react_1.default.createElement(styling_system_1.Tooltip, { title: "Change field type" },
                react_1.default.createElement(ActiveGrafType_1.ActiveGrafType, Object.assign({}, triggerProps, { onClick: !readonly && !isLocked
                        ? () => setMenuOpen(menuOpen === "type" ? undefined : "type")
                        : undefined, type: node.type, parentTypes: parentTypes })))) }, ({ layerProps }) => (react_1.default.createElement(ContextMenu_1.NodeChangeFieldTypeMenu, Object.assign({}, layerProps, { node: parentNode, onSelectType: (f) => {
                onUpdate(Object.assign(Object.assign({}, node), { data: {
                        type: f.data.type,
                    }, type: Object.assign(Object.assign({}, node.type), { fieldType: (0, utils_1.changeTypeName)(node.type.fieldType, f.name) }) }));
            }, hideMenu: () => {
                setMenuOpen(undefined);
            } }))))),
        !isLocked &&
            !isEnumValue &&
            !isArgumentNode &&
            !isDirectiveNode &&
            !isFromInterface &&
            node.data.type !== graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition && (react_1.default.createElement(Actions, null,
            react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "options", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => {
                    return (react_1.default.createElement(styling_system_1.Tooltip, { title: "Set List/Required" },
                        react_1.default.createElement(components_1.FieldPort, Object.assign({}, (0, Models_1.dataIt)("fieldList"), triggerProps, { icons: {
                                closed: react_1.default.createElement(styling_system_1.BracketsSquare, { width: 18, height: 18 }),
                                open: react_1.default.createElement(styling_system_1.BracketsSquare, { width: 18, height: 18 }),
                            }, onClick: () => setMenuOpen("options") }))));
                } }, ({ layerProps }) => (react_1.default.createElement(ContextMenu_1.NodeTypeOptionsMenu, Object.assign({}, layerProps, { onCheck: (fieldType) => {
                    onUpdate(Object.assign(Object.assign({}, node), { type: Object.assign(Object.assign({}, node.type), { fieldType }) }));
                }, hideMenu: () => {
                    setMenuOpen(undefined);
                }, node: node })))))),
        isInputValue && (react_1.default.createElement(components_1.EditableDefaultValue, { value: ((_d = node.value) === null || _d === void 0 ? void 0 : _d.value) || "", onChange: isLocked
                ? undefined
                : (v) => {
                    setValue(node, v);
                } })),
        react_1.default.createElement(AbsoluteActions, { className: "field-actions" },
            !inputDisabled &&
                !isArgumentNode &&
                node.data.type !== graphql_js_tree_1.TypeSystemDefinition.UnionMemberDefinition && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Field arguments and directives" },
                react_1.default.createElement(components_1.FieldPort, Object.assign({}, (0, Models_1.dataIt)("fieldArgs"), { onClick: onInputClick, open: inputOpen, icons: {
                        closed: react_1.default.createElement(styling_system_1.Plus, { width: 18, height: 18 }),
                        open: react_1.default.createElement(styling_system_1.Minus, { width: 18, height: 18 }),
                    } })))),
            !isLocked && !isFromInterface && (react_1.default.createElement(ContextMenu_1.ContextMenu, { isOpen: menuOpen === "details", close: () => setMenuOpen(undefined), Trigger: ({ triggerProps }) => {
                    return (react_1.default.createElement(styling_system_1.Tooltip, { title: "Field options" },
                        react_1.default.createElement(components_1.FieldPort, Object.assign({}, (0, Models_1.dataIt)("fieldOptions"), triggerProps, { icons: {
                                closed: react_1.default.createElement(styling_system_1.DotsVertical, { width: 18, height: 18 }),
                                open: react_1.default.createElement(styling_system_1.DotsVertical, { width: 18, height: 18 }),
                            }, onClick: () => setMenuOpen("details") }))));
                } }, ({ layerProps }) => (react_1.default.createElement(components_1.Menu, Object.assign({ hideMenu: () => setMenuOpen(undefined) }, layerProps),
                react_1.default.createElement(components_1.MenuScrollingArea, null,
                    react_1.default.createElement(components_1.DetailMenuItem, { onClick: onDelete }, "Delete")))))),
            !outputDisabled && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Expand type" },
                react_1.default.createElement(OutputArrow, Object.assign({}, (0, Models_1.dataIt)("fieldArgs"), { className: "node-field-port", onClick: onOutputClick, opened: outputOpen }),
                    react_1.default.createElement(styling_system_1.ChevronLeft, { width: 18, height: 18 })))))));
};
exports.ActiveField = ActiveField;
const Actions = styled_1.default.div `
  display: flex;
  margin-left: ${({ toRight }) => (toRight ? "auto" : "unset")};
  z-index: 2;
`;
const AbsoluteActions = styled_1.default.div `
  display: flex;
  margin-left: auto;
  margin-right: -0.5rem;
  border-radius: ${(p) => p.theme.border.primary.radius};
`;
const OutputArrow = styled_1.default.div `
  pointer-events: all;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  svg {
    stroke: ${({ theme }) => theme.text.default};
    rotate: ${({ opened }) => (opened ? "270deg" : "180deg")};
    transition: ${vars_1.transition};
  }
`;
const LockContainer = styled_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.disabled};
`;
