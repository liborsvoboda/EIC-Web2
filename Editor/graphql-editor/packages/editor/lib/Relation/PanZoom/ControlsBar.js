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
exports.ControlsBar = void 0;
const react_1 = __importDefault(require("react"));
const trees_1 = require("../../state/containers/trees");
const containers_1 = require("../../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const vars = __importStar(require("../../vars"));
const TopBar_1 = require("../../shared/components/TopBar");
const react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
const NewNode_1 = require("../../shared/components/NewNode");
const styling_system_1 = require("@aexol-studio/styling-system");
const DOMClassNames_1 = require("../../shared/hooks/DOMClassNames");
const FilterNodes_1 = require("../../shared/components/FilterNodes");
const dataIds_1 = require("../../Models/dataIds");
const ControlsBar = ({ downloadPng, title }) => {
    const { readonly, exitFocus, focusMode, focusedNode, libraryTree } = (0, trees_1.useTreesState)();
    const { zoomIn, zoomOut } = (0, react_zoom_pan_pinch_1.useControls)();
    const { fieldsOn, setFieldsOn, libraryNodesOn, setLibraryNodesOn } = (0, containers_1.useRelationsState)();
    const step = 0.2;
    return (react_1.default.createElement(TopBar_1.TopBar, null,
        react_1.default.createElement(Menu, null,
            react_1.default.createElement(styling_system_1.Stack, { align: "center", gap: "1rem" },
                focusMode && (react_1.default.createElement(styling_system_1.Button, Object.assign({}, (0, dataIds_1.dataIt)("defocus"), { size: "small", onClick: () => exitFocus(), endAdornment: react_1.default.createElement(styling_system_1.Xmark, null) }),
                    react_1.default.createElement(SpanFlow, null, focusedNode === null || focusedNode === void 0 ? void 0 : focusedNode.name))),
                !readonly && !focusMode && react_1.default.createElement(NewNode_1.NewNode, null),
                title),
            react_1.default.createElement(styling_system_1.Stack, { align: "center", gap: "1rem" },
                !!libraryTree.nodes.length && (react_1.default.createElement(styling_system_1.Checkbox, Object.assign({}, (0, dataIds_1.dataIt)("libraryNodes"), { label: "library nodes", labelPosition: "start", onChange: () => setLibraryNodesOn(!libraryNodesOn), checked: libraryNodesOn, wrapperCss: { fontWeight: 300 } }))),
                react_1.default.createElement(FilterNodes_1.FilterNodes, null),
                react_1.default.createElement(styling_system_1.Tooltip, { title: "Relations only", position: "left-bottom" },
                    react_1.default.createElement(IconWrapper, Object.assign({}, (0, dataIds_1.dataIt)("relationsOnly"), { active: !fieldsOn, onClick: () => {
                            setFieldsOn(!fieldsOn);
                        } }),
                        react_1.default.createElement(styling_system_1.CodeFork, null))),
                react_1.default.createElement(styling_system_1.Tooltip, { title: "Export to png", position: "left-bottom" },
                    react_1.default.createElement(IconWrapper, Object.assign({}, (0, dataIds_1.dataIt)("export"), { onClick: () => downloadPng() }),
                        react_1.default.createElement(styling_system_1.ImageSquareCheck, null))),
                react_1.default.createElement(ZoomWrapper, null,
                    react_1.default.createElement(IconWrapper, { onClick: () => {
                            zoomOut(step);
                        } },
                        react_1.default.createElement(styling_system_1.Minus, null)),
                    react_1.default.createElement(styling_system_1.Tooltip, { position: "left-bottom", title: "Click ctrl/cmd + scroll mouse to zoom" },
                        react_1.default.createElement(TooltippedZoom, Object.assign({}, (0, dataIds_1.dataIt)("zoom")),
                            react_1.default.createElement("span", { className: `${DOMClassNames_1.DOMClassNames.topBarZoom}` }, "100%"))),
                    react_1.default.createElement(IconWrapper, { onClick: () => {
                            zoomIn(step);
                        } },
                        react_1.default.createElement(styling_system_1.Plus, null)))))));
};
exports.ControlsBar = ControlsBar;
const SpanFlow = styled_1.default.span `
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-transform: none;
`;
const TooltippedZoom = styled_1.default.div `
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  width: 4ch;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.text.default};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconWrapper = styled_1.default.div `
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme, active }) => active ? theme.text.active : theme.text.disabled};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text.active};
  }
`;
const ZoomWrapper = styled_1.default.div `
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.275rem 0.75rem;
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-color: ${({ theme }) => theme.neutrals.L2};
  border-style: solid;
  border-width: 1px;
  border-radius: ${(p) => p.theme.border.primary.radius};
  gap: 8px;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const Menu = styled_1.default.div `
  display: flex;
  font-family: ${({ theme }) => theme.fontFamilySans};
  gap: 1rem;
  align-items: center;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;
