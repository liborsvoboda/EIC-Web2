"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIO = exports.KeyboardActions = void 0;
var KeyboardActions;
(function (KeyboardActions) {
    KeyboardActions["Delete"] = "Delete";
    KeyboardActions["Undo"] = "Undo";
    KeyboardActions["Redo"] = "Redo";
    KeyboardActions["Save"] = "Save";
    KeyboardActions["FindRelation"] = "FindRelation";
})(KeyboardActions = exports.KeyboardActions || (exports.KeyboardActions = {}));
const useIO = () => {
    const handleKeyboard = (on) => (event) => {
        const ctrl = event.ctrlKey || event.metaKey;
        if (event.key === 'Delete') {
            event.preventDefault();
            on(KeyboardActions.Delete);
        }
        if (event.key === 'z' && ctrl && !event.shiftKey) {
            event.preventDefault();
            on(KeyboardActions.Undo);
        }
        if (event.key === 'z' && ctrl && event.shiftKey) {
            event.preventDefault();
            on(KeyboardActions.Redo);
        }
        if (event.key === 'f' && ctrl) {
            event.preventDefault();
            on(KeyboardActions.FindRelation);
        }
    };
    const mount = (actions) => {
        const handler = handleKeyboard((a) => { var _a; return (_a = actions[a]) === null || _a === void 0 ? void 0 : _a.call(actions); });
        document.addEventListener('keydown', handler);
        const dispose = () => {
            document.removeEventListener('keydown', handler);
        };
        return {
            dispose,
        };
    };
    return { mount };
};
exports.useIO = useIO;
