"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorItem = void 0;
const containers_1 = require("../../state/containers");
const router_1 = require("../../state/containers/router");
const styling_system_1 = require("@aexol-studio/styling-system");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = __importDefault(require("react"));
const Main = (0, styled_1.default)(styling_system_1.Stack) `
  color: ${({ theme }) => theme.text.default};
  font-size: 0.75rem;
`;
const Message = styled_1.default.div `
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ErrorItem = ({ error }) => {
    var _a, _b;
    const { setErrorRowNumber } = (0, containers_1.useErrorsState)();
    const { set } = (0, router_1.useRouter)();
    const errorText = error.__typename === "global" ? error.text : error.error.message;
    const errorRow = error.__typename === "global" ? 0 : ((_b = (_a = error.error.locations) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.line) || 0;
    return (react_1.default.createElement(styling_system_1.Tooltip, { width: 300, position: "top-left", title: `${errorText}\nClick to go to this error.` },
        react_1.default.createElement(Main, { onClick: () => {
                setErrorRowNumber(errorRow + 1);
                set({ code: "on" });
            }, align: "center", justify: "between" },
            react_1.default.createElement(Message, null, errorText))));
};
exports.ErrorItem = ErrorItem;
