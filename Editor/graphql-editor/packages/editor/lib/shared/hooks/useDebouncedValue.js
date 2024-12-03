"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebouncedValue = void 0;
const react_1 = require("react");
const useDebouncedValue = (value, delay = 250) => {
    const timeoutRef = (0, react_1.useRef)();
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);
    }, [value]);
    return debouncedValue;
};
exports.useDebouncedValue = useDebouncedValue;
