"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monacoSetDecorations = void 0;
const errors_1 = require("./errors");
const utils_1 = require("../../../Theming/utils");
exports.monacoSetDecorations = (0, utils_1.themed)((theme) => ({ codeErrors, decorationIds, monacoGql, m, }) => {
    const monacoDecorations = codeErrors.flatMap((0, errors_1.mapEditorErrorToMonacoDecoration)(theme)(m));
    const newDecorationIds = monacoGql.deltaDecorations(decorationIds, monacoDecorations);
    return newDecorationIds;
});
