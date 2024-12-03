"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickDetector = void 0;
const react_1 = require("react");
const useClickDetector = () => {
    const md = (0, react_1.useRef)({ clientX: 0, clientY: 0, start: 0 });
    const mouseDown = (0, react_1.useCallback)((e) => {
        md.current = {
            clientX: e.clientX,
            clientY: e.clientY,
            start: Date.now(),
        };
    }, []);
    const isClick = (0, react_1.useCallback)((e) => {
        const timeDelta = Date.now() - md.current.start;
        const positionDelta = Math.sqrt(Math.pow(e.clientX - md.current.clientX, 2) +
            Math.pow(e.clientY - md.current.clientY, 2));
        return timeDelta < 1000 && positionDelta < 5;
    }, []);
    return {
        mouseDown,
        isClick,
    };
};
exports.useClickDetector = useClickDetector;
