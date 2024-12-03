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
exports.Menu = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const vars_1 = require("../../vars");
const styling_system_1 = require("@aexol-studio/styling-system");
const ImportSchema_1 = require("../../shared/dialogs/ImportSchema");
const FileOperations_1 = require("./Tools/FileOperations");
const dataIds_1 = require("../../Models/dataIds");
const Sidebar = styled_1.default.div `
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.disabled};
  z-index: 4;
  border: 0 solid ${({ theme }) => theme.neutrals.L8};
  border-right-width: 2px;
  border-left-width: 2px;
  position: relative;
  transition: width 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
const Filler = styled_1.default.div `
  flex: 1;
  background-color: ${({ theme }) => theme.neutrals.L6};
`;
const MenuItem = styled_1.default.div `
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isDisabled }) => isDisabled ? theme.text.disabled : theme.text.default};
  width: 2rem;
  height: 2rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.25s ease;
  overflow: visible;
  user-select: none;
  background-color: ${({ theme }) => theme.neutrals.L5};
  border-bottom: ${(p) => p.theme.neutrals.L7} 1px solid;

  &:hover {
    background-color: ${({ theme, isDisabled }) => !isDisabled && theme.neutrals.L5};
    color: ${({ isDisabled, theme }) => isDisabled ? theme.text.disabled : theme.accent.L2};
  }

  svg {
    flex-shrink: 0;
    height: 1.25rem;
    transition: ${vars_1.transition};
  }

  &.active {
    color: ${({ theme }) => theme.accent.L2};
    font-weight: 600;
  }
  &.toggle-active {
    color: ${({ theme }) => theme.accent.L1};
    font-weight: 600;
  }
`;
const Menu = ({ toggleCode, setToggleCode, setActivePane, activePane, setSchema, path, schema, libraries, readOnly, excludePanes = [], disableImport, disableExport, }) => {
    const [importOpen, setImportOpen] = (0, react_1.useState)(false);
    const { saveToFile } = (0, FileOperations_1.useFileOperations)();
    const exportActions = [
        {
            name: "Export schema",
            onClick: () => {
                saveToFile(path, schema);
            },
        },
        {
            name: "Export libraries",
            onClick: () => {
                if (!libraries)
                    return;
                saveToFile(path, libraries);
            },
            disabled: !libraries,
        },
        {
            name: "Export schema with libraries",
            onClick: () => {
                if (!libraries)
                    return;
                saveToFile(path, [libraries, schema].join("\n"));
            },
            disabled: !libraries,
        },
    ];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Sidebar, Object.assign({}, (0, dataIds_1.dataIt)("sidebar")),
            react_1.default.createElement(styling_system_1.Tooltip, { title: "Toggle Code", position: "right-bottom" },
                react_1.default.createElement(MenuItem, Object.assign({ className: toggleCode ? "toggle-active" : "", onClick: () => {
                        if (!activePane || activePane === "diff")
                            return;
                        setToggleCode(!toggleCode);
                    }, isDisabled: activePane === "diff" }, (0, dataIds_1.dataIt)("menuCode")),
                    react_1.default.createElement(styling_system_1.Code, null))),
            !excludePanes.includes("relation") && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Relations", position: "right-center" },
                react_1.default.createElement(MenuItem, Object.assign({ className: activePane === "relation" ? "active" : "", onClick: () => {
                        if (activePane === "relation" && toggleCode) {
                            setActivePane(undefined);
                            return;
                        }
                        setActivePane("relation");
                    } }, (0, dataIds_1.dataIt)("menuRelations")),
                    react_1.default.createElement(styling_system_1.Tool, null)))),
            !excludePanes.includes("docs") && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Documentation", position: "right-center" },
                react_1.default.createElement(MenuItem, Object.assign({ className: activePane === "docs" ? "active" : "", onClick: () => {
                        if (activePane === "docs" && toggleCode) {
                            setActivePane(undefined);
                            return;
                        }
                        setActivePane("docs");
                    } }, (0, dataIds_1.dataIt)("menuDocs")),
                    react_1.default.createElement(styling_system_1.File, null)))),
            !excludePanes.includes("diff") && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Compare versions", position: "right-center" },
                react_1.default.createElement(MenuItem, Object.assign({ className: activePane === "diff" ? "active" : "", onClick: () => setActivePane("diff") }, (0, dataIds_1.dataIt)("menuDiff")),
                    react_1.default.createElement(styling_system_1.Filter, null)))),
            !disableExport && (react_1.default.createElement(styling_system_1.DropdownMenu, { actionType: "icon", dropdownPosition: "right-bottom", menuItems: exportActions, distanceX: "10px" },
                react_1.default.createElement(styling_system_1.Tooltip, { title: "Export schema", position: "right-center" },
                    react_1.default.createElement(MenuItem, Object.assign({}, (0, dataIds_1.dataIt)("menuExport"), { "data-tour": "export" }),
                        react_1.default.createElement(styling_system_1.ArrowNarrowUpMove, null))))),
            !readOnly && !disableImport && (react_1.default.createElement(styling_system_1.Tooltip, { title: "Import schema", position: "right-center" },
                react_1.default.createElement(MenuItem, Object.assign({}, (0, dataIds_1.dataIt)("menuImport"), { onClick: () => setImportOpen(true), "data-tour": "import" }),
                    react_1.default.createElement(styling_system_1.ArrowNarrowBottomAlignment, null)))),
            react_1.default.createElement(Filler, null)),
        react_1.default.createElement(ImportSchema_1.ImportSchema, { onClose: () => {
                setImportOpen(false);
            }, open: importOpen, onImport: (s) => {
                setSchema({
                    code: s,
                    source: "outside",
                });
            } })));
};
exports.Menu = Menu;
