"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortNodes = void 0;
const BuiltInNodes_1 = require("../../../GraphQL/Resolve/BuiltInNodes");
const fuzzyjs_1 = require("fuzzyjs");
const bar = 10;
const sortNodes = (menuSearchValue, fields) => {
    const [fieldName, fieldType] = menuSearchValue.split(" ");
    const searchValue = (fieldType || fieldName).toLowerCase();
    const scalars = fields.filter((a) => BuiltInNodes_1.BuiltInScalars.find((b) => a.name === b.name));
    const matchingScalars = scalars.filter((scalar) => scalar.name.toLowerCase().startsWith(searchValue));
    const sortedScalars = [
        ...matchingScalars,
        ...scalars.filter((el) => !matchingScalars.some((s) => s.name === el.name)),
    ];
    fields = fields.filter((a) => !BuiltInNodes_1.BuiltInScalars.find((b) => a.name === b.name));
    const exactMatchFields = [];
    const worseMatchFields = [];
    const results = fields
        .map((f) => {
        const fuzzyScore = (0, fuzzyjs_1.match)(searchValue, f.name).score;
        const startsScore = searchValue
            .toLowerCase()
            .startsWith(f.name.toLowerCase())
            ? 11
            : 0;
        return {
            f,
            score: Math.max(startsScore, fuzzyScore),
        };
    })
        .sort((a, b) => {
        return a.score > b.score ? -1 : a.score === b.score ? 0 : 1;
    });
    results.forEach((r) => {
        if (r.score > bar) {
            exactMatchFields.push(r.f);
        }
        else {
            worseMatchFields.push(r.f);
        }
    });
    return [...exactMatchFields, ...sortedScalars, ...worseMatchFields];
};
exports.sortNodes = sortNodes;
