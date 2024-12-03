const ValidationWorker = new Worker(new URL("./validation.worker.js", import.meta.url));
const send = (key, data) => {
    return new Promise((resolve, reject) => {
        const id = Math.random().toString(8);
        ValidationWorker.postMessage({ ...data, event: key, id });
        ValidationWorker.addEventListener("message", (message) => {
            if (message.data.error) {
                reject(message.data.error);
            }
            if (message.data.event === key && message.data.id === id) {
                resolve(message.data.data);
            }
        });
    });
};
export class GraphQLEditorWorker {
    static simulateSort(args) {
        return send("simulateSort", args);
    }
    static validate(schema, libraries) {
        return send("validate", { schema, libraries });
    }
    static generateCode(tree) {
        return send("parse", { tree });
    }
    static generateTree({ schema, libraries, cutSchemaDefinition, }) {
        return send("parseSchema", { schema, libraries, cutSchemaDefinition });
    }
    static getTokenAtPosition(document, position) {
        return send("token", {
            document,
            position: {
                line: position.line,
                character: position.character,
            },
        }).then(JSON.parse);
    }
}
