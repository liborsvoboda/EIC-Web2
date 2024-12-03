"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffEditorSettings = exports.settings = void 0;
exports.settings = {
    glyphMargin: true,
    theme: 'graphql-editor',
    smoothScrolling: true,
};
const diffEditorSettings = (override = {}) => (Object.assign({ glyphMargin: true, renderSideBySide: true, smoothScrolling: true }, override));
exports.diffEditorSettings = diffEditorSettings;
