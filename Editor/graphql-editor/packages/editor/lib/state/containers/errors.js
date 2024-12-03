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
exports.ErrorsStateProvider = exports.useErrorsState = void 0;
const unstated_next_1 = require("unstated-next");
const react_1 = __importStar(require("react"));
const ErrorItem_1 = require("../../shared/errors/ErrorItem");
const useErrorsStateContainer = (0, unstated_next_1.createContainer)(() => {
    const [codeErrors, setCodeErrors] = (0, react_1.useState)([]);
    const [errorRowNumber, setErrorRowNumber] = (0, react_1.useState)();
    const [errorNodeNames, setErrorNodeNames] = (0, react_1.useState)();
    const [errorsItems, setErrorsItems] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (codeErrors) {
            const errors = codeErrors.map((e, i) => react_1.default.createElement(ErrorItem_1.ErrorItem, { key: i, error: e }));
            setErrorsItems(errors);
        }
    }, [codeErrors]);
    return {
        codeErrors,
        setCodeErrors,
        errorRowNumber,
        setErrorRowNumber,
        errorNodeNames,
        setErrorNodeNames,
        setErrorsItems,
        errorsItems,
    };
});
exports.useErrorsState = useErrorsStateContainer.useContainer;
exports.ErrorsStateProvider = useErrorsStateContainer.Provider;
