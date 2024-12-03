"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyUrl = exports.Utils = exports.ImportSchema = void 0;
const components_1 = require("../components");
const styling_system_1 = require("@aexol-studio/styling-system");
const react_1 = __importStar(require("react"));
const graphql_1 = require("graphql");
const containers_1 = require("../../state/containers");
const ImportSchema = ({ onClose, open, onImport }) => {
    const [importURL, setImportURL] = (0, react_1.useState)("");
    const [proxyImport, setProxyImport] = (0, react_1.useState)(false);
    const [headers, setHeaders] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { createToast } = (0, styling_system_1.useToasts)();
    const { theme } = (0, containers_1.useTheme)();
    (0, react_1.useEffect)(() => {
        setImportURL("");
        setHeaders([]);
        setProxyImport(false);
    }, [open]);
    (0, react_1.useEffect)(() => {
        if (headers.length) {
            if (headers.length > 1) {
                const lastHeader = headers[headers.length - 1];
                const prevHeader = headers[headers.length - 2];
                if (!lastHeader[0] &&
                    !prevHeader[0] &&
                    !lastHeader[1] &&
                    !prevHeader[1]) {
                    headers.pop();
                    setHeaders([...headers]);
                    return;
                }
            }
            const lastHeader = headers[headers.length - 1];
            if (lastHeader[0]) {
                headers.push(["", ""]);
                setHeaders([...headers]);
            }
        }
        else {
            headers.push(["", ""]);
            setHeaders([...headers]);
        }
    }, [headers]);
    const loadFromURL = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        const url = importURL;
        const header = Object.fromEntries(headers.filter((h) => h[0] && h[1]));
        try {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                createToast({
                    message: `Please add https:// or http:// at the beginning of your URL we don't want to guess it.`,
                    variant: "error",
                });
                return false;
            }
            try {
                const newSchema = yield Utils.getFromUrl(proxyImport ? (0, exports.proxyUrl)(url) : url, header);
                createToast({
                    message: "Successfully loaded schema from URL",
                    variant: "success",
                });
                return newSchema;
            }
            catch (error) {
                createToast({
                    message: `${proxyImport
                        ? "Error with CORS proxy. "
                        : "Error without CORS proxy. "}${error instanceof Error
                        ? error.message
                        : `${url} is not correct GraphQL endpoint or you don't have access. Check your settings and try again`}. Trying ${proxyImport ? "Trying without proxy" : "Trying with proxy"}, please wait...`,
                    variant: "error",
                });
                const newSchema = yield Utils.getFromUrl(!proxyImport ? (0, exports.proxyUrl)(url) : url, header);
                createToast({
                    message: "Successfully loaded schema from URL",
                    variant: "success",
                });
                return newSchema;
            }
        }
        catch (error) {
            createToast({
                message: `${!proxyImport
                    ? "Error with CORS proxy. "
                    : "Error without CORS proxy. "}${error instanceof Error
                    ? error.message
                    : `${url} is not correct GraphQL endpoint or you don't have access. Check your settings and try again`}`,
                variant: "error",
            });
            return false;
        }
        finally {
            setIsLoading(false);
        }
    });
    return (react_1.default.createElement(components_1.EditorDialog, { title: "Import schema", onClose: onClose, open: !!open },
        react_1.default.createElement(styling_system_1.Stack, { gap: "1rem" },
            react_1.default.createElement(styling_system_1.Button, { variant: "secondary", onClick: () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.onchange = (_) => {
                        const files = input.files;
                        if (files) {
                            const f = files[0];
                            f.text()
                                .then((content) => {
                                onImport(content);
                                onClose();
                            })
                                .catch((e) => {
                                e instanceof Error
                                    ? createToast({
                                        message: e.message,
                                        variant: "error",
                                    })
                                    : createToast({
                                        message: "Unknown import error",
                                        variant: "error",
                                    });
                            });
                        }
                    };
                    input.click();
                } }, "from GraphQL File"),
            react_1.default.createElement(styling_system_1.Button, { variant: "secondary", onClick: () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.onchange = (_) => {
                        const files = input.files;
                        if (files) {
                            const f = files[0];
                            f.text()
                                .then((content) => {
                                const r = JSON.parse(content);
                                const graphqlSchema = (0, graphql_1.buildClientSchema)(r);
                                const printedStringSchema = (0, graphql_1.printSchema)(graphqlSchema);
                                onImport(printedStringSchema);
                                onClose();
                            })
                                .catch((e) => {
                                e instanceof Error
                                    ? createToast({
                                        message: e.message,
                                        variant: "error",
                                    })
                                    : createToast({
                                        message: "Unknown import error",
                                        variant: "error",
                                    });
                            });
                        }
                    };
                    input.click();
                } }, "from JSON file")),
        react_1.default.createElement(styling_system_1.Stack, { direction: "column" },
            react_1.default.createElement(styling_system_1.TextField, { value: importURL, onChange: (e) => {
                    setImportURL(e.target.value);
                }, fullWidth: true, label: "https://yourschema.com/graphql", wrapperCss: { background: theme.neutrals.L7 } }),
            react_1.default.createElement(styling_system_1.Stack, { direction: "column", gap: "1rem" },
                react_1.default.createElement(styling_system_1.Checkbox, { label: "Proxy to avoid CORS", checked: proxyImport, onChange: () => setProxyImport(!proxyImport), wrapperCss: { fontWeight: 300 } }),
                react_1.default.createElement(styling_system_1.Typography, { variant: "caption" }, "Headers")),
            react_1.default.createElement(styling_system_1.Stack, { direction: "column", css: { maxHeight: "22rem", overflow: "auto", marginBottom: "1rem" } }, headers.map(([k, v], i) => (react_1.default.createElement(styling_system_1.Stack, { key: i, gap: "1rem" },
                react_1.default.createElement(styling_system_1.TextField, { label: "key", value: k, onChange: (e) => {
                        headers[i][0] = e.target.value;
                        setHeaders([...headers]);
                    }, wrapperCss: { background: theme.neutrals.L7 } }),
                react_1.default.createElement(styling_system_1.TextField, { onChange: (e) => {
                        headers[i][1] = e.target.value;
                        setHeaders([...headers]);
                    }, label: "value", value: v, wrapperCss: { background: theme.neutrals.L7 } }))))),
            react_1.default.createElement(styling_system_1.Stack, { justify: "end", gap: "1rem" },
                react_1.default.createElement(styling_system_1.Button, { onClick: onClose, variant: "neutral" }, "Cancel"),
                react_1.default.createElement(styling_system_1.Button, { showLoading: isLoading, disabled: !importURL, onClick: () => {
                        loadFromURL().then((s) => {
                            if (s) {
                                onImport(s);
                                onClose();
                            }
                        });
                    } }, "Import from URL")))));
};
exports.ImportSchema = ImportSchema;
class Utils {
}
exports.Utils = Utils;
_a = Utils;
Utils.getFromUrl = (url, header, signal) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = Object.assign({ "Content-Type": "application/json" }, header);
    const response = yield fetch(url, {
        method: "POST",
        signal: signal,
        headers,
        body: JSON.stringify({ query: (0, graphql_1.getIntrospectionQuery)() }),
    });
    if (response.status !== 200) {
        let textResponse = "";
        try {
            textResponse = yield response.text();
        }
        catch (_b) {
            throw new Error(`Response Status:${response.status}, Status text:${response.statusText}`);
        }
        throw new Error(`Response Status:${response.status}, Status text:${response.statusText}. ${textResponse}`);
    }
    const { data, errors } = yield response.json();
    if (errors) {
        throw new Error(JSON.stringify(errors));
    }
    const c = (0, graphql_1.buildClientSchema)(data);
    return Utils.printFullSchema(c);
});
Utils.printFullSchema = (schema) => {
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    let printedSchema = (0, graphql_1.printSchema)(schema);
    const schemaPrintedAtTheBeginning = (queryType && queryType.name !== "Query") ||
        (mutationType && mutationType.name !== "Mutation") ||
        (subscriptionType && subscriptionType.name !== "Subscription");
    if (!schemaPrintedAtTheBeginning) {
        const addons = [];
        if (queryType) {
            addons.push(`query: ${queryType.name}`);
        }
        if (mutationType) {
            addons.push(`mutation: ${mutationType.name}`);
        }
        if (subscriptionType) {
            addons.push(`subscription: ${subscriptionType.name}`);
        }
        if (addons.length > 0) {
            printedSchema += `\nschema{\n\t${addons.join(",\n\t")}\n}`;
        }
    }
    printedSchema = printedSchema.replace(/^[*\s]*""""""[*]*$\n/gm, "");
    return printedSchema;
};
const checkIfURLisLocalRegex = new RegExp(/^(?:(https?):\/\/)?(localhost|127\.(\d+).*)(?::\d{2,5})?(?:[\/?#]\S*)?$/);
const checkIfURLisLocal = (url) => checkIfURLisLocalRegex.test(url);
const proxyUrl = (url) => {
    if (checkIfURLisLocal(url)) {
        return url;
    }
    return `https://proxy.graphqleditor.com/?url=${encodeURIComponent(url)}`;
};
exports.proxyUrl = proxyUrl;
