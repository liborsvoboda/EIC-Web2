"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveGrafFieldName = void 0;
const react_1 = __importDefault(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const EditableText_1 = require("./EditableText");
const ActiveGrafType_1 = require("./ActiveGrafType");
const constants_1 = require("../../constants");
const Models_1 = require("../../../Models");
const Main = styled_1.default.div `
  display: flex;
  flex-flow: row wrap;
  font-size: ${constants_1.GRAF_FIELD_NAME_SIZE}px;
  gap: 0.1rem;
`;
const ActiveGrafFieldName = ({ args, name, afterChange, parentTypes }) => {
    if (args && args.length > 0) {
        return (react_1.default.createElement(Main, Object.assign({}, (0, Models_1.dataIt)("fieldName")),
            react_1.default.createElement(EditableText_1.EditableText, { value: name, onChange: afterChange }),
            "(",
            afterChange &&
                args.map((a, i) => (react_1.default.createElement(react_1.default.Fragment, { key: a.name },
                    react_1.default.createElement("span", null, a.name),
                    ":",
                    react_1.default.createElement(ActiveGrafType_1.ActiveGrafType, { type: a.type, parentTypes: parentTypes }),
                    i < args.length - 1 && react_1.default.createElement("span", null, ",")))),
            !afterChange &&
                args.map((a, i) => (react_1.default.createElement(react_1.default.Fragment, { key: a.name },
                    react_1.default.createElement("span", null, a.name),
                    ":",
                    react_1.default.createElement(ActiveGrafType_1.ActiveGrafType, { type: a.type, parentTypes: parentTypes }),
                    i < args.length - 1 && react_1.default.createElement("span", null, ",")))),
            ")"));
    }
    return react_1.default.createElement(EditableText_1.EditableText, { value: name, onChange: afterChange });
};
exports.ActiveGrafFieldName = ActiveGrafFieldName;
