"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCurrentNodeName = void 0;
const findPrevState = (state) => {
    const allowedKinds = [
        "ObjectTypeDef",
        "InterfaceDef",
        "InputDef",
        "EnumDef",
        "UnionDef",
        "DirectiveDef",
        "ExtendDef",
    ];
    if (state.kind) {
        if (allowedKinds.includes(state.kind)) {
            return state.name;
        }
    }
    if (state.kind === "Query" ||
        state.kind === "Mutation" ||
        state.kind === "Subscription") {
        return { operation: state.kind };
    }
    if (state.prevState) {
        return findPrevState(state.prevState);
    }
};
const findCurrentNodeName = (state) => {
    return findPrevState(state);
};
exports.findCurrentNodeName = findCurrentNodeName;
