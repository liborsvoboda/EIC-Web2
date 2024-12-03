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
exports.EditableText = void 0;
const react_1 = __importStar(require("react"));
const styled_1 = __importDefault(require("@emotion/styled"));
const constants_1 = require("../../../constants");
const draggable_1 = require("../../../state/draggable");
const styling_system_1 = require("@aexol-studio/styling-system");
const Input = styled_1.default.input `
  border: 0;
  background-color: transparent;
  min-width: auto;
  padding: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: ${constants_1.GRAF_FIELD_NAME_SIZE}px;
  color: inherit;
`;
const EditableText = ({ value, onChange, style = {}, exclude = [] }) => {
    const [editedValue, setEditedValue] = (0, react_1.useState)(value);
    const { setDraggable } = (0, draggable_1.useDraggable)();
    const [isError, setIsError] = (0, react_1.useState)(false);
    const spanRef = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    const constantValueRef = (0, react_1.useRef)(value);
    const valueRef = (0, react_1.useRef)(value);
    const genericId = (0, react_1.useRef)(Math.random().toString(16));
    const checkEdit = () => {
        var _a;
        constantValueRef.current = editedValue;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        setDraggable(true);
        if (isError) {
            setEditedValue(value);
            return;
        }
        if (editedValue && onChange) {
            if (editedValue !== value) {
                onChange(editedValue);
            }
        }
        else {
            setEditedValue(value);
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            if (constantValueRef.current !== valueRef.current && onChange) {
                onChange(valueRef.current);
            }
        };
    }, []);
    (0, react_1.useEffect)(() => {
        setEditedValue(value);
    }, [value]);
    (0, react_1.useEffect)(() => {
        setIsError(exclude.includes(editedValue));
    }, [editedValue]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (((_a = spanRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) && inputRef.current) {
            inputRef.current.style.width = spanRef.current.offsetWidth + "px";
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, onChange ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(styling_system_1.Tooltip, { title: isError ? "Name already exists" : "rename" },
            react_1.default.createElement(Input, { id: genericId.current, ref: inputRef, isError: isError, value: editedValue, pattern: "[_A-Za-z][_0-9A-Za-z]*", style: Object.assign({}, style), onFocus: () => setDraggable(false), onMouseDown: () => setDraggable(false), onBlur: (e) => {
                    checkEdit();
                }, onClick: (e) => e.target.focus(), onKeyDown: (e) => {
                    var _a;
                    if (e.key === "Enter") {
                        (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                    }
                }, onChange: (e) => {
                    setEditedValue(e.target.value);
                    valueRef.current = e.target.value;
                } })),
        react_1.default.createElement(HiddenSpan, { style: Object.assign({}, style), ref: spanRef }, editedValue))) : (react_1.default.createElement("span", { style: Object.assign({}, style) }, editedValue))));
};
exports.EditableText = EditableText;
const HiddenSpan = styled_1.default.span `
  visibility: hidden;
  padding: 0;
  font-family: ${({ theme }) => theme.fontFamilySans};
  left: 0;
  position: absolute;
  pointer-events: none;
  font-size: ${constants_1.GRAF_FIELD_NAME_SIZE}px;
`;
