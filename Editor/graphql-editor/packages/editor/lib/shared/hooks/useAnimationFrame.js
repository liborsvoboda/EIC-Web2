"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimationFrame = void 0;
const react_1 = require("react");
const useAnimationFrame = (cb) => {
    if (typeof performance === 'undefined' || typeof window === 'undefined') {
        return;
    }
    const cbRef = (0, react_1.useRef)();
    const frame = (0, react_1.useRef)();
    const init = (0, react_1.useRef)(performance.now());
    const last = (0, react_1.useRef)(performance.now());
    cbRef.current = cb;
    const animate = (now) => {
        var _a;
        (_a = cbRef.current) === null || _a === void 0 ? void 0 : _a.call(cbRef, {
            time: now - init.current,
            delta: now - last.current,
        });
        last.current = now;
        frame.current = requestAnimationFrame(animate);
    };
    (0, react_1.useLayoutEffect)(() => {
        frame.current = requestAnimationFrame(animate);
        return () => {
            if (frame.current)
                cancelAnimationFrame(frame.current);
        };
    }, []);
};
exports.useAnimationFrame = useAnimationFrame;
