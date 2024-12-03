"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundFTUX = void 0;
const NewNode_1 = require("../../shared/components/NewNode");
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const BackgroundFTUX = ({ onImport, onStartCoding, showCode, schema, }) => {
    return (react_1.default.createElement(Container, { direction: "column", align: "center", justify: "center", gap: "2rem" },
        react_1.default.createElement(styling_system_1.Stack, { direction: "column", gap: "4rem" },
            react_1.default.createElement(styling_system_1.Stack, { direction: "column", gap: "1rem" },
                !schema ? (react_1.default.createElement(styling_system_1.Typography, null, "Your schema is empty! Please create your first node.")) : (react_1.default.createElement(styling_system_1.Typography, null, "Cannot parse the schema! Please correct it or create new one.")),
                !schema && (react_1.default.createElement(styling_system_1.Stack, { gap: "1rem" },
                    showCode && (react_1.default.createElement(styling_system_1.Button, { onClick: onStartCoding, variant: "neutral", size: "small" }, "Start coding")),
                    react_1.default.createElement(NewNode_1.NewNode, null)))),
            react_1.default.createElement(styling_system_1.Stack, { direction: "column", gap: "1rem" },
                react_1.default.createElement(styling_system_1.Typography, null, "You can also import the schema from URL and .graphql or .json file."),
                react_1.default.createElement(styling_system_1.Stack, { gap: "1rem" },
                    react_1.default.createElement(styling_system_1.Button, { endAdornment: react_1.default.createElement(styling_system_1.ArrowNarrowBottomAlignment, null), onClick: onImport, variant: "neutral", size: "small" }, "Import schema"))))));
};
exports.BackgroundFTUX = BackgroundFTUX;
const Container = (0, styled_1.default)(styling_system_1.Stack) `
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
`;
