"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEditorErrorToMonacoDecoration = void 0;
const utils_1 = require("../../../Theming/utils");
exports.mapEditorErrorToMonacoDecoration = (0, utils_1.themed)(({ error }) => (m) => (e) => {
    var _a;
    if (e.__typename === "local") {
        return (((_a = e.error.locations) === null || _a === void 0 ? void 0 : _a.map((l) => ({
            range: new m.Range(l.line, l.column, l.line, 1000),
            options: {
                className: "monacoError",
                isWholeLine: true,
                minimap: {
                    color: error.light,
                    position: 1,
                },
                hoverMessage: [
                    {
                        value: e.error.message,
                    },
                ],
                glyphMarginHoverMessage: {
                    value: e.error.message,
                },
                glyphMarginClassName: "monacoMarginError",
            },
        }))) || []);
    }
    return [
        {
            range: new m.Range(1, 1, 1, 1000),
            options: {
                className: "monacoError",
                isWholeLine: true,
                minimap: {
                    color: error.light,
                    position: 1,
                },
                hoverMessage: [
                    {
                        value: e.text,
                    },
                ],
                glyphMarginHoverMessage: {
                    value: e.text,
                },
                glyphMarginClassName: "monacoMarginError",
            },
        },
    ];
});
