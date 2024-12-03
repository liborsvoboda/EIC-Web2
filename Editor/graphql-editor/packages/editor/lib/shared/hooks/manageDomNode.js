"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageDomNode = void 0;
const manageDomNode = (className, parentClass) => {
    const selectAll = () => document.querySelectorAll(Array.isArray(className)
        ? className.map((c) => `.${c}`).join(",")
        : parentClass
            ? `.${parentClass} .${className}`
            : `.${className}`);
    const addClassToAll = (addedClassName) => {
        selectAll().forEach((e) => e.classList.add(addedClassName));
    };
    const removeClasses = (classesToRemove) => {
        selectAll().forEach((e) => classesToRemove.forEach((ctr) => e.classList.remove(ctr)));
    };
    const addClassByFn = (addedClassName, fn) => {
        selectAll().forEach((e) => {
            if (fn(e)) {
                e.classList.add(addedClassName);
            }
        });
    };
    const toggleClassByFn = (addedClassName, fn) => {
        selectAll().forEach((e) => {
            if (fn(e)) {
                e.classList.add(addedClassName);
            }
            else {
                e.classList.remove(addedClassName);
            }
        });
    };
    return {
        addClassToAll,
        removeClasses,
        addClassByFn,
        toggleClassByFn,
    };
};
exports.manageDomNode = manageDomNode;
