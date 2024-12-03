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
exports.Draw = void 0;
const DOMClassNames_1 = require("../../../../shared/hooks/DOMClassNames");
const vars_1 = require("../../../../vars");
const styled_1 = __importDefault(require("@emotion/styled"));
const graphql_js_tree_1 = require("graphql-js-tree");
const react_1 = __importStar(require("react"));
const interpolate = (p1, p2, weight) => {
    const distance = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
    };
    return {
        x: p1.x + distance.x * weight,
        y: p1.y + distance.y * weight,
    };
};
const Draw = ({ from, to, color, relationType, isPrintPreviewActive, optimized, }) => {
    const stroke = color;
    const fac = (0, react_1.useMemo)(() => {
        if (relationType.type === graphql_js_tree_1.Options.name &&
            relationType.name === "refInterface") {
            return 1;
        }
        if (relationType.type === graphql_js_tree_1.Options.required) {
            return 2;
        }
        return 1;
    }, [relationType]);
    if (from && to) {
        const f = {
            x: from.x,
            y: from.y,
        };
        const t = {
            x: to.x,
            y: to.y,
        };
        const upDown = f.y > t.y;
        const center = {
            x: (t.x + f.x) / 2.0,
            y: (t.y + f.y) / 2.0,
        };
        const maxBezier = 600.0;
        const bezierWeight = Math.min(0.9, Math.max(-0.15, (maxBezier - Math.abs(f.y - t.y)) / maxBezier));
        const bezierPoint1 = {
            x: (t.x + center.x) / 2.0,
            y: (t.y + center.y) / 2.0,
        };
        const bezier1 = interpolate(upDown
            ? {
                x: t.x,
                y: center.y,
            }
            : {
                x: center.x,
                y: t.y,
            }, bezierPoint1, bezierWeight);
        const bezierPoint2 = {
            x: (f.x + center.x) / 2.0,
            y: (f.y + center.y) / 2.0,
        };
        const bezier2 = interpolate(upDown
            ? {
                x: f.x,
                y: center.y,
            }
            : {
                x: center.x,
                y: f.y,
            }, bezierPoint2, bezierWeight);
        const PathComponent = optimized ? OptimizedPathG : PathG;
        return (react_1.default.createElement(PathComponent, { "data-from": from.id, "data-to": to.id, className: `${DOMClassNames_1.DOMClassNames.nodeConnection} inViewport`, isPrintPreviewActive: isPrintPreviewActive },
            react_1.default.createElement("path", { stroke: stroke, strokeWidth: fac, d: `M ${t.x} ${t.y}
           Q ${bezier1.x} ${bezier1.y} ${center.x} ${center.y}
           Q ${bezier2.x} ${bezier2.y} ${f.x} ${f.y}` })));
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.Draw = Draw;
const PathG = styled_1.default.g `
  opacity: ${({ isPrintPreviewActive }) => (isPrintPreviewActive ? 1 : 0)};
  transition: ${vars_1.transition};
  &.inViewport {
    opacity: 1;
    &.selection {
      opacity: ${({ isPrintPreviewActive }) => (isPrintPreviewActive ? 1 : 0)};
    }
  }
  &.selection {
    &.${DOMClassNames_1.DOMClassNames.active} {
      opacity: 1;
    }
  }
`;
const OptimizedPathG = styled_1.default.g `
  visibility: ${({ isPrintPreviewActive }) => isPrintPreviewActive ? "visible" : "hidden"};
  transition: ${vars_1.transition};
  &.inViewport {
    visibility: visible;
    &.selection {
      visibility: ${({ isPrintPreviewActive }) => isPrintPreviewActive ? "visible" : "hidden"};
    }
  }
  &.selection {
    &.${DOMClassNames_1.DOMClassNames.active} {
      visibility: visible;
    }
  }
`;
