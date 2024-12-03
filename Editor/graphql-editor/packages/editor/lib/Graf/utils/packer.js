"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whitespace = exports.packBoxes = void 0;
function packBoxes(sizes, sort) {
    const layout = { size: [0, 0], boxes: [] };
    const order = new Array(sizes.length);
    for (let i = 0; i < sizes.length; i++) {
        order[i] = i;
    }
    if (sort) {
        order.sort(function (a, b) {
            return (sizes[b].dimensions[0] * sizes[b].dimensions[1] -
                sizes[a].dimensions[0] * sizes[a].dimensions[1]);
        });
    }
    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[order[i]].dimensions;
        const positions = [[0, 0]];
        for (let j = 0; j < layout.boxes.length; j++) {
            const box = layout.boxes[j];
            positions.push([box.position[0], box.position[1] + box.size[1]], [box.position[0] + box.size[0], box.position[1]]);
        }
        const best = { score: Infinity, position: positions[0] };
        if (positions.length > 1) {
            for (let j = 0; j < positions.length; j++) {
                const position = positions[j];
                const box = { size: size, position: position };
                if (validate(layout.boxes, box)) {
                    const boxes = layout.boxes.slice();
                    boxes.push(box);
                    const score = rate({
                        size: bounds(boxes),
                        boxes: boxes,
                    });
                    if (score < best.score) {
                        best.score = score;
                        best.position = position;
                    }
                }
            }
        }
        const box = { size: size, position: best.position };
        layout.boxes.push(box);
        layout.size = bounds(layout.boxes);
    }
    const boxes = layout.boxes.slice();
    for (let i = 0; i < boxes.length; i++) {
        layout.boxes[order[i]] = boxes[i];
    }
    return boxes.map((box, i) => ({
        index: order[i],
        box,
    }));
}
exports.packBoxes = packBoxes;
function rate(layout) {
    return Math.max(layout.size[0], layout.size[1]);
}
function whitespace(layout) {
    let whitespace = layout.size[0] * layout.size[1];
    for (let i = 0; i < layout.boxes.length; i++) {
        const box = layout.boxes[i];
        whitespace -= box.size[0] * box.size[1];
    }
    return whitespace;
}
exports.whitespace = whitespace;
function bounds(boxes) {
    let width = 0;
    let height = 0;
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const right = box.position[0] + box.size[0];
        const bottom = box.position[1] + box.size[1];
        if (right > width) {
            width = right;
        }
        if (bottom > height) {
            height = bottom;
        }
    }
    return [width, height];
}
function validate(boxes, box) {
    const a = box;
    for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (intersects(a, b)) {
            return false;
        }
    }
    return true;
}
function intersects(a, b) {
    return (a.position[0] < b.position[0] + b.size[0] &&
        a.position[0] + a.size[0] > b.position[0] &&
        a.position[1] < b.position[1] + b.size[1] &&
        a.position[1] + a.size[1] > b.position[1]);
}
