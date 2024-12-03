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
exports.Node = void 0;
const containers_1 = require("../../../../state/containers");
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importStar(require("react"));
const vars_1 = require("../../../../vars");
const styled_1 = __importDefault(require("@emotion/styled"));
const styling_system_1 = require("@aexol-studio/styling-system");
const ActiveType_1 = require("./Field/ActiveType");
const Field_1 = require("./Field");
const DOMClassNames_1 = require("../../../../shared/hooks/DOMClassNames");
const useClickDetector_1 = require("../../../../shared/hooks/useClickDetector");
const nodeLook_1 = require("../../../shared/nodeLook");
const Models_1 = require("../../../../Models");
const Content = styled_1.default.div `
  max-width: ${(p) => p.printPreviewActive
    ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
    : nodeLook_1.RELATION_NODE_MAX_WIDTH}px;
  background-color: ${({ theme }) => `${theme.neutrals.L6}`};
  padding: 12px;
  position: relative;
  text-rendering: optimizeSpeed;
  border-radius: ${(p) => p.theme.border.primary.radius};
  transition: 0.25s all ease-in-out;
  z-index: 1;
  flex: 1 0 auto;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  max-width: 66vw;
  visibility: ${({ printPreviewActive }) => printPreviewActive ? "visible" : "hidden"};
  cursor: pointer;
  border-width: 2px;
  border-style: ${({ isLibrary }) => (isLibrary ? "dashed" : "solid")};
  border-color: ${({ theme }) => `${theme.divider.main}88`};
  &:hover {
    border-color: ${({ theme, nodeType }) => theme.colors[nodeType] ? theme.colors[nodeType] : `${theme.accent.L1}00`};
  }
  .graph-field {
    pointer-events: none;
  }
  &.inViewport {
    visibility: visible;
  }
  &.selection {
    opacity: ${({ printPreviewActive }) => (printPreviewActive ? "1" : "0.3")};
    &.active {
      opacity: 1;
      visibility: visible;
      cursor: auto;
      border-color: ${({ theme, nodeType }) => theme.colors[nodeType]
    ? theme.colors[nodeType]
    : `${theme.divider.main}88`};
      .editNode {
        display: flex;
      }
      .graph-field {
        pointer-events: auto;
      }
      &.far {
        .graph-field {
          pointer-events: none;
        }
      }
    }
    &.related {
      visibility: visible;
      opacity: 1;
    }
  }
  .editNode {
    display: none;
  }
  &.far {
    width: ${(p) => p.width}px;
    border-width: 0;
    background-color: transparent;
    .graph-node-fields {
      opacity: 0;
      pointer-events: none;
    }
    .graph-node-title {
      transform: translate(-50%, -50%);
      flex-direction: column;
      padding: 1.5rem;
      font-size: 34px;
      letter-spacing: 1px;
      top: 50%;
      left: 50%;
    }
    .editNode {
      scale: 2;
      transform: translate(0, -50%);
      font-size: 14px;
    }
  }
`;
const NodeRelationFields = styled_1.default.div `
  width: calc(
    ${(p) => Math.min(p.width, p.printPreviewActive
    ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_WIDTH
    : nodeLook_1.RELATION_NODE_MAX_WIDTH)}px - 24px
  );
  transition: ${vars_1.transition};
  position: relative;
  margin-top: 24px;
`;
const NodeTitle = styled_1.default.div `
  position: absolute;
  align-items: center;
  /* background-color: ${({ theme }) => `${theme.neutrals.L6}`}; */
  color: ${({ theme }) => theme.text.active};
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  display: flex;
  left: 0;
  top: 0;
  right: 0;
`;
const NodeTitlePlaceholder = styled_1.default.div `
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  pointer-events: none;
  visibility: hidden;
  height: 0;
`;
const EditNodeContainer = styled_1.default.div `
  position: absolute;
  right: 0;
  display: flex;
  gap: 0.25rem;
  top: 0;
  transform: translateY(calc(-100% - 0.5rem));
`;
const SmallClickableButton = (0, styled_1.default)(styling_system_1.Button) `
  font-size: 14px;
  text-transform: none;
  padding: 0.25rem 0.5rem;

  & > svg {
    width: 16px;
    height: 16px;
  }
`;
const NameInRelation = styled_1.default.span `
  margin-right: 5px;
  color: ${({ theme }) => theme.text.active};
  padding: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const EditToSeeWhole = (0, styled_1.default)(styling_system_1.Stack) `
  padding: 1rem;
  position: absolute;
  z-index: 10;
  color: ${(p) => p.theme.text.default};
  margin: 1rem -12px;
  background: ${(p) => p.theme.neutrals.L5};
  width: calc(100% + 26px);
  border-bottom-left-radius: ${(p) => p.theme.border.primary.radius};
  border-bottom-right-radius: ${(p) => p.theme.border.primary.radius};
  cursor: pointer;
  transition: ${vars_1.transition};
  :hover {
    background: ${(p) => p.theme.neutrals.L4};
    color: ${(p) => p.theme.text.active};
  }
`;
const Node = (props) => {
    const { numberNode, isLibrary, isReadOnly } = props;
    const { parserField: field } = numberNode;
    const { setSelectedNodeId, focusNode, focusMode, exitFocus } = (0, containers_1.useTreesState)();
    const { setEditMode, printPreviewActive } = (0, containers_1.useRelationsState)();
    const { isClick, mouseDown } = (0, useClickDetector_1.useClickDetector)();
    const nodeRef = (0, react_1.useRef)(null);
    const isFieldFocused = (0, react_1.useMemo)(() => {
        return focusMode === field.id;
    }, [field, focusMode]);
    const RelationFields = (0, react_1.useMemo)(() => {
        const maxFields = printPreviewActive
            ? nodeLook_1.PRINT_PREVIEW_RELATION_NODE_MAX_FIELDS
            : nodeLook_1.RELATION_NODE_MAX_FIELDS;
        return (react_1.default.createElement(NodeRelationFields, { printPreviewActive: printPreviewActive, width: numberNode.width, className: `${DOMClassNames_1.DOMClassNames.nodeFields}` },
            field.args.slice(0, maxFields).map((a) => (react_1.default.createElement(Field_1.Field, { key: a.id, node: a }))),
            field.args.length > maxFields && (react_1.default.createElement(EditToSeeWhole, { onClick: (e) => {
                    e.stopPropagation();
                    setSelectedNodeId({
                        value: {
                            id: field.id,
                            name: field.name,
                        },
                        source: "relation",
                    });
                    setEditMode(field.id);
                }, align: "center", justify: "center" },
                react_1.default.createElement("span", null,
                    "Open to see ",
                    field.args.length - maxFields,
                    " more fields"),
                react_1.default.createElement(styling_system_1.ChevronRightDouble, null)))));
    }, [JSON.stringify(field), printPreviewActive]);
    const NodeContent = (0, react_1.useMemo)(() => (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NodeTitlePlaceholder, null,
            react_1.default.createElement(NameInRelation, null, field.name),
            react_1.default.createElement(ActiveType_1.ActiveType, { type: field.type })),
        react_1.default.createElement(NodeTitle, { className: `${DOMClassNames_1.DOMClassNames.nodeTitle}` },
            react_1.default.createElement(NameInRelation, null, field.name),
            react_1.default.createElement(ActiveType_1.ActiveType, { type: field.type }),
            !printPreviewActive && (react_1.default.createElement(EditNodeContainer, { className: "editNode" },
                react_1.default.createElement(SmallClickableButton, Object.assign({ variant: "neutral" }, (0, Models_1.dataIt)("nodeFocus"), { onClick: (e) => {
                        e.stopPropagation();
                        if (isFieldFocused) {
                            exitFocus();
                        }
                        else {
                            focusNode(field);
                        }
                    } }),
                    react_1.default.createElement("span", null, isFieldFocused ? "Unfocus" : "Focus"),
                    react_1.default.createElement(styling_system_1.EagleEye, { width: 16, height: 16 })),
                react_1.default.createElement(SmallClickableButton, Object.assign({ variant: "neutral" }, (0, Models_1.dataIt)("nodeEditExpand"), { onClick: (e) => {
                        e.stopPropagation();
                        setEditMode(field.id);
                    } }),
                    react_1.default.createElement("span", null, isReadOnly ? "Expand" : "Edit"),
                    isReadOnly ? (react_1.default.createElement(styling_system_1.ChevronRightDouble, { width: 16, height: 16 })) : (react_1.default.createElement(styling_system_1.PenLine, { width: 16, height: 16 })))))))), [JSON.stringify(field), printPreviewActive, isFieldFocused]);
    return (react_1.default.createElement(Content, Object.assign({}, (0, Models_1.dataIt)("graphNode"), { width: numberNode.width, className: `${DOMClassNames_1.DOMClassNames.node} inViewport`, id: `node-${field.id}`, ref: nodeRef, isLibrary: isLibrary, nodeType: (0, graphql_js_tree_1.getTypeName)(field.type.fieldType), onMouseDown: mouseDown, onClick: (e) => {
            var _a;
            if (!isClick(e)) {
                return;
            }
            e.stopPropagation();
            if ((_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.classList.contains("active"))
                return;
            setSelectedNodeId({
                value: {
                    id: field.id,
                    name: field.name,
                },
                source: "relation",
            });
        }, printPreviewActive: printPreviewActive }),
        NodeContent,
        RelationFields));
};
exports.Node = Node;
