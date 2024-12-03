"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveFieldName = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const constants_1 = require("../../../../../Graf/constants");
const ActiveType_1 = require("./ActiveType");
const styling_system_1 = require("@aexol-studio/styling-system");
const Main = styled_1.default.div `
  display: flex;
  flex-flow: ${({ printPreviewActive }) => printPreviewActive ? "row wrap" : "row nowrap"};
  overflow-x: ${({ printPreviewActive }) => printPreviewActive ? "unset" : "auto"};
  * {
    text-overflow: ellipsis;
  }
`;
const Name = styled_1.default.div `
  font-size: ${constants_1.FIELD_NAME_SIZE}px;
  color: ${({ theme }) => theme.text.default};
  margin-right: 2px;
`;
const Comma = styled_1.default.span `
  padding: 0 2px;
`;
const ActiveFieldName = ({ args, name, parentTypes, onClick, printPreviewActive }) => {
    if (args && args.length > 0) {
        return (react_1.default.createElement(Main, { printPreviewActive: printPreviewActive },
            react_1.default.createElement(Name, null, name),
            args && (react_1.default.createElement(react_1.default.Fragment, null,
                "(",
                args.map((a, i) => (react_1.default.createElement(styling_system_1.Stack, { key: a.name },
                    react_1.default.createElement("span", null, a.name),
                    ":",
                    react_1.default.createElement(ActiveType_1.ActiveType, { onClick: onClick ? () => onClick(a) : undefined, type: a.type, parentTypes: parentTypes }),
                    i < args.length - 1 && react_1.default.createElement(Comma, null, ",")))),
                ")"))));
    }
    return react_1.default.createElement(Name, null, name);
};
exports.ActiveFieldName = ActiveFieldName;
