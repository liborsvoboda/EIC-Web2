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
exports.EmbeddedEditor = void 0;
const react_1 = __importStar(require("react"));
const containers_1 = require("../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const ErrorsList_1 = require("../shared/errors/ErrorsList");
const NodeNavigation_1 = require("../shared/NodeNavigation");
const Relation_1 = require("../Relation/Relation");
const Main = styled_1.default.div `
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) => `${theme.neutrals.L5} ${theme.neutrals.L6}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutrals.L5};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutrals.L6};
  }

  .full-screen-container {
    flex: 1;
    align-self: stretch;
    height: 100%;
  }
`;
const ErrorOuterContainer = styled_1.default.div `
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && "auto"};
  overflow-x: hidden;
`;
const EmbeddedEditor = ({ schema, theme }) => {
    const { setTheme } = (0, containers_1.useTheme)();
    const { generateTreeFromSchema } = (0, containers_1.useTreesState)();
    const { codeErrors, errorsItems } = (0, containers_1.useErrorsState)();
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (theme) {
            setTheme(theme);
        }
    }, [theme]);
    (0, react_1.useEffect)(() => {
        if (schema.source === "tree") {
            return;
        }
        generateTreeFromSchema(schema);
    }, [schema]);
    return (react_1.default.createElement(Main, { onKeyDown: (e) => {
            if (e.key.toLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
            }
        } },
        react_1.default.createElement(ErrorOuterContainer, null,
            react_1.default.createElement(Relation_1.Relation, { setInitialSchema: (s) => {
                }, schema: schema.code }),
            react_1.default.createElement(NodeNavigation_1.NodeNavigation, { isCollapsed: isCollapsed, setIsCollapsed: (c) => setIsCollapsed(c) })),
        !!codeErrors.length && react_1.default.createElement(ErrorsList_1.ErrorsList, null, errorsItems)));
};
exports.EmbeddedEditor = EmbeddedEditor;
