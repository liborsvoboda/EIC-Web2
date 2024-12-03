"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAfterFramePaint = void 0;
function runAfterFramePaint(callback) {
    requestAnimationFrame(() => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = callback;
        messageChannel.port2.postMessage(undefined);
    });
}
exports.runAfterFramePaint = runAfterFramePaint;
