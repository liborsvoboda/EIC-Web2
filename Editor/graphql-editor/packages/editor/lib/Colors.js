"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mix = exports.fade = exports.Colors = void 0;
exports.Colors = {
    grey: "#F3F3F4",
    main: "#d966ff",
    green: "#acf7c1",
    yellow: "#cfee9e",
    red: "#de3c4b",
    orange: "#f18f01",
    pink: "#e6bccd",
    blue: "#17bebb",
    sky: "#A3E7FC",
};
const isHexa = (s) => {
    return s.length === 6 || (s.length === 7 && s.slice(0, 1) === "#");
};
const fade = (c, alpha) => {
    return `${c}${Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0")}`;
};
exports.fade = fade;
const mix = (c1, c2, weight = 50) => {
    const color1 = c1.slice(1);
    const color2 = c2.slice(1);
    if (!isHexa(color1) || !isHexa(color2)) {
        throw new Error("Pass Hexadecimal values only");
    }
    function d2h(d) {
        return d.toString(16);
    }
    function h2d(h) {
        return parseInt(h, 16);
    }
    let color = "#";
    for (let i = 0; i <= 5; i += 2) {
        const v1 = h2d(color1.substr(i, 2));
        const v2 = h2d(color2.substr(i, 2));
        let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
        while (val.length < 2) {
            val = "0" + val;
        }
        color += val;
    }
    return color;
};
exports.mix = mix;
