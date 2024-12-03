"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottledValue = void 0;
const react_1 = require("react");
const useThrottledValue = ({ delay = 300, initialValue, }) => {
    const [liveValue, setLiveValue] = (0, react_1.useState)(initialValue);
    const [value, _setValue] = (0, react_1.useState)(initialValue);
    const [, setT] = (0, react_1.useState)();
    const setValue = (v) => {
        setLiveValue(v);
        setT((oldTimeout) => {
            if (oldTimeout)
                clearTimeout(oldTimeout);
            return setTimeout(() => _setValue(v), delay);
        });
    };
    return {
        liveValue,
        value,
        setValue,
    };
};
exports.useThrottledValue = useThrottledValue;
