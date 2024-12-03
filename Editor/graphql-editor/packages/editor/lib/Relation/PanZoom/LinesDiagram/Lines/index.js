"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lines = void 0;
const Draw_1 = require("./Draw");
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importDefault(require("react"));
const containers_1 = require("../../../../state/containers");
const styled_1 = __importDefault(require("@emotion/styled"));
const RelationsContainer = styled_1.default.svg `
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  stroke: ${({ theme }) => theme.neutrals.L5};
  fill: transparent;
  stroke-width: 2px;
  transform: translatez(0);
  margin: -20px;
  overflow: visible;
`;
const Lines = ({ relations, isPrintPreviewActive, }) => {
    const { theme } = (0, containers_1.useTheme)();
    const relationCount = (relations === null || relations === void 0 ? void 0 : relations.length) || 0;
    const optimized = relationCount > 200;
    return (react_1.default.createElement(RelationsContainer, null, relations === null || relations === void 0 ? void 0 : relations.map((r, index) => {
        var _a, _b, _c, _d;
        return (react_1.default.createElement(react_1.default.Fragment, { key: index },
            react_1.default.createElement(Draw_1.Draw, { optimized: optimized, relationType: ((_a = r.target) === null || _a === void 0 ? void 0 : _a.parserField.type.fieldType) || {
                    type: graphql_js_tree_1.Options.name,
                    name: "",
                }, color: r.connectionType
                    ? theme.colors[r.connectionType]
                    : theme.colors[(0, graphql_js_tree_1.getTypeName)(((_b = r.target) === null || _b === void 0 ? void 0 : _b.parserField.type.fieldType) || {
                        type: graphql_js_tree_1.Options.name,
                        name: "",
                    })], key: `${index}}-${index}-${(_c = r.source) === null || _c === void 0 ? void 0 : _c.parserField.name}-${(_d = r.target) === null || _d === void 0 ? void 0 : _d.parserField.name}`, from: r.source, to: r.target, isPrintPreviewActive: isPrintPreviewActive }),
            ");"));
    })));
};
exports.Lines = Lines;
