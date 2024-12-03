"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileOperations = void 0;
const file_saver_1 = __importDefault(require("file-saver"));
const useFileOperations = () => {
    const saveToFile = (name, content) => {
        const filename = `${name}.gql`;
        const file = new File([content], filename, {
            type: "application/graphql",
        });
        file_saver_1.default.saveAs(file, filename);
    };
    return {
        saveToFile,
    };
};
exports.useFileOperations = useFileOperations;
