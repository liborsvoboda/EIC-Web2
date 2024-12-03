// src/index.ts
import { registerMarkerDataProvider } from "monaco-marker-data-provider";
import { createWorkerManager } from "monaco-worker-manager";

// src/languageFeatures.ts
import { fromRatio, names as namedColors } from "@ctrl/tinycolor";
import {
  fromCodeActionContext,
  fromCompletionContext,
  fromCompletionItem,
  fromPosition,
  fromRange,
  toCodeAction,
  toColorInformation,
  toCompletionItem,
  toCompletionList,
  toHover,
  toMarkerData
} from "monaco-languageserver-types";
var colorNames = Object.values(namedColors);
var editableColorRegex = new RegExp(
  `-\\[(${colorNames.join("|")}|((?:#|rgba?\\(|hsla?\\())[^\\]]+)\\]$`
);
var sheet = new CSSStyleSheet();
document.adoptedStyleSheets.push(sheet);
function colorValueToHex(value) {
  return Math.round(value * 255).toString(16).padStart(2, "0");
}
function createColorClass(color) {
  const hex = `${colorValueToHex(color.red)}${colorValueToHex(color.green)}${colorValueToHex(
    color.blue
  )}`;
  const className = `tailwindcss-color-decoration-${hex}`;
  const selector = `.${className}`;
  for (const rule of sheet.cssRules) {
    if (rule.selectorText === selector) {
      return className;
    }
  }
  sheet.insertRule(`${selector}{background-color:#${hex}}`);
  return className;
}
function createColorProvider(monaco, getWorker) {
  const modelMap = /* @__PURE__ */ new WeakMap();
  monaco.editor.onWillDisposeModel((model) => {
    modelMap.delete(model);
  });
  return {
    async provideDocumentColors(model) {
      const worker = await getWorker(model.uri);
      const editableColors = [];
      const nonEditableColors = [];
      const colors = await worker.getDocumentColors(String(model.uri), model.getLanguageId());
      if (colors) {
        for (const lsColor of colors) {
          const monacoColor = toColorInformation(lsColor);
          const text = model.getValueInRange(monacoColor.range);
          if (editableColorRegex.test(text)) {
            editableColors.push(monacoColor);
          } else {
            nonEditableColors.push({
              range: monacoColor.range,
              options: {
                before: {
                  content: "\xA0",
                  inlineClassName: `${createColorClass(monacoColor.color)} colorpicker-color-decoration`,
                  inlineClassNameAffectsLetterSpacing: true
                }
              }
            });
          }
        }
      }
      modelMap.set(model, model.deltaDecorations(modelMap.get(model) ?? [], nonEditableColors));
      return editableColors;
    },
    provideColorPresentations(model, colorInformation) {
      const className = model.getValueInRange(colorInformation.range);
      const match = new RegExp(
        `-\\[(${colorNames.join("|")}|(?:(?:#|rgba?\\(|hsla?\\())[^\\]]+)\\]$`,
        "i"
      ).exec(className);
      if (!match) {
        return [];
      }
      const [currentColor] = match;
      const isNamedColor = colorNames.includes(currentColor);
      const color = fromRatio({
        r: colorInformation.color.red,
        g: colorInformation.color.green,
        b: colorInformation.color.blue,
        a: colorInformation.color.alpha
      });
      let hexValue = color.toHex8String(
        !isNamedColor && (currentColor.length === 4 || currentColor.length === 5)
      );
      if (hexValue.length === 5) {
        hexValue = hexValue.replace(/f$/, "");
      } else if (hexValue.length === 9) {
        hexValue = hexValue.replace(/ff$/, "");
      }
      const rgbValue = color.toRgbString().replaceAll(" ", "");
      const hslValue = color.toHslString().replaceAll(" ", "");
      const prefix = className.slice(0, Math.max(0, match.index));
      return [
        { label: `${prefix}-[${hexValue}]` },
        { label: `${prefix}-[${rgbValue}]` },
        { label: `${prefix}-[${hslValue}]` }
      ];
    }
  };
}
function createHoverProvider(getWorker) {
  return {
    async provideHover(model, position) {
      const worker = await getWorker(model.uri);
      const hover = await worker.doHover(
        String(model.uri),
        model.getLanguageId(),
        fromPosition(position)
      );
      return hover && toHover(hover);
    }
  };
}
function createCodeActionProvider(getWorker) {
  return {
    async provideCodeActions(model, range, context) {
      const worker = await getWorker(model.uri);
      const codeActions = await worker.doCodeActions(
        String(model.uri),
        model.getLanguageId(),
        fromRange(range),
        fromCodeActionContext(context)
      );
      if (codeActions) {
        return {
          actions: codeActions.map(toCodeAction),
          dispose() {
          }
        };
      }
    }
  };
}
function createCompletionItemProvider(getWorker) {
  return {
    async provideCompletionItems(model, position, context) {
      const worker = await getWorker(model.uri);
      const completionList = await worker.doComplete(
        String(model.uri),
        model.getLanguageId(),
        fromPosition(position),
        fromCompletionContext(context)
      );
      if (!completionList) {
        return;
      }
      const wordInfo = model.getWordUntilPosition(position);
      return toCompletionList(completionList, {
        range: {
          startLineNumber: position.lineNumber,
          startColumn: wordInfo.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: wordInfo.endColumn
        }
      });
    },
    async resolveCompletionItem(item) {
      const worker = await getWorker();
      const result = await worker.resolveCompletionItem(fromCompletionItem(item));
      return toCompletionItem(result, { range: item.range });
    }
  };
}
function createMarkerDataProvider(getWorker) {
  return {
    owner: "tailwindcss",
    async provideMarkerData(model) {
      const worker = await getWorker(model.uri);
      const diagnostics = await worker.doValidate(String(model.uri), model.getLanguageId());
      return diagnostics?.map(toMarkerData);
    }
  };
}

// src/cssData.ts
function createTailwindDirective(name, value) {
  return {
    name: `@${name}`,
    description: { kind: "markdown", value },
    references: [
      {
        name: `@${name} documentation`,
        url: `https://tailwindcss.com/docs/functions-and-directives#${name}`
      }
    ]
  };
}
var tailwindDirective = createTailwindDirective(
  "tailwind",
  `Use the \`@tailwind\` directive to insert Tailwind's \`base\`, \`components\`, \`utilities\` and \`variants\` styles into your CSS.

\`\`\`css
/**
 * This injects Tailwind's base styles and any base styles registered by
 * plugins.
 */
@tailwind base;

/**
 * This injects Tailwind's component classes and any component classes
 * registered by plugins.
 */
@tailwind components;

/**
 * This injects Tailwind's utility classes and any utility classes registered
 * by plugins.
 */
@tailwind utilities;

/**
 * Use this directive to control where Tailwind injects the hover, focus,
 * responsive, dark mode, and other variants of each class.
 *
 * If omitted, Tailwind will append these classes to the very end of
 * your stylesheet by default.
 */
@tailwind variants;
\`\`\``
);
var layerDirective = createTailwindDirective(
  "layer",
  `Use the \`@layer\` directive to tell Tailwind which "bucket" a set of custom styles belong to. Valid layers are \`base\`, \`components\`, and \`utilities\`.

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}

@layer components {
  .btn-blue {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}

@layer utilities {
  .filter-none {
    filter: none;
  }
  .filter-grayscale {
    filter: grayscale(100%);
  }
}
\`\`\`

Tailwind will automatically move any CSS within a \`@layer\` directive to the same place as the corresponding \`@tailwind\` rule, so you don't have to worry about authoring your CSS in a specific order to avoid specificity issues.

Any custom CSS added to a layer will only be included in the final build if that CSS is actually used in your HTML, just like all of the classes built in to Tailwind by default.

Wrapping any custom CSS in a \`@layer\` directive also makes it possible to use modifiers with those rules, like \`hover:\` and \`focus:\` or responsive modifiers like \`md:\` and \`lg:\`.`
);
var applyDirective = createTailwindDirective(
  "apply",
  `Use \`@apply\` to inline any existing utility classes into your own custom CSS.

This is useful when you need to write custom CSS (like to override the styles in a third-party library) but still want to work with your design tokens and use the same syntax you're used to using in your HTML.

\`\`\`css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}
.select2-search {
  @apply border border-gray-300 rounded;
}
.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
\`\`\`

Any rules inlined with \`@apply\` will have \`!important\` **removed** by default to avoid specificity issues:

\`\`\`css
/* Input */
.foo {
  color: blue !important;
}

.bar {
  @apply foo;
}

/* Output */
.foo {
  color: blue !important;
}

.bar {
  color: blue;
}
\`\`\`

If you'd like to \`@apply\` an existing class and make it \`!important\`, simply add \`!important\` to the end of the declaration:

\`\`\`css
/* Input */
.btn {
  @apply font-bold py-2 px-4 rounded !important;
}

/* Output */
.btn {
  font-weight: 700 !important;
  padding-top: .5rem !important;
  padding-bottom: .5rem !important;
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  border-radius: .25rem !important;
}
\`\`\`

Note that if you're using Sass/SCSS, you'll need to use Sass' interpolation feature to get this to work:

\`\`\`css
.btn {
  @apply font-bold py-2 px-4 rounded #{!important};
}
\`\`\``
);
var configDirective = createTailwindDirective(
  "config",
  `Use the \`@config\` directive to specify which config file Tailwind should use when compiling CSS file. This is useful for projects that need to use different configuration files for different CSS entry points.

\`\`\`css
@config "./tailwind.site.config.js";
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

\`\`\`css
@config "./tailwind.admin.config.js";
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

The path you provide to the \`@config\` directive is relative to that CSS file, and will take precedence over a path defined in your PostCSS configuration or in the Tailwind CLI.`
);
var tailwindcssData = {
  version: 1.1,
  atDirectives: [tailwindDirective, layerDirective, applyDirective, configDirective]
};

// src/index.ts
var defaultLanguageSelector = ["css", "javascript", "html", "mdx", "typescript"];
var configureMonacoTailwindcss = (monaco, { languageSelector = defaultLanguageSelector, tailwindConfig } = {}) => {
  const workerManager = createWorkerManager(monaco, {
    label: "tailwindcss",
    moduleId: "monaco-tailwindcss/tailwindcss.worker",
    createData: { tailwindConfig }
  });
  const disposables = [
    workerManager,
    monaco.languages.registerCodeActionProvider(
      languageSelector,
      createCodeActionProvider(workerManager.getWorker)
    ),
    monaco.languages.registerColorProvider(
      languageSelector,
      createColorProvider(monaco, workerManager.getWorker)
    ),
    monaco.languages.registerCompletionItemProvider(
      languageSelector,
      createCompletionItemProvider(workerManager.getWorker)
    ),
    monaco.languages.registerHoverProvider(
      languageSelector,
      createHoverProvider(workerManager.getWorker)
    )
  ];
  for (const language of Array.isArray(languageSelector) ? languageSelector : [languageSelector]) {
    if (typeof language === "string") {
      disposables.push(
        registerMarkerDataProvider(
          monaco,
          language,
          createMarkerDataProvider(workerManager.getWorker)
        )
      );
    }
  }
  return {
    dispose() {
      for (const disposable of disposables) {
        disposable.dispose();
      }
    },
    setTailwindConfig(newTailwindConfig) {
      workerManager.updateCreateData({ tailwindConfig: newTailwindConfig });
    },
    async generateStylesFromContent(css, contents) {
      const client = await workerManager.getWorker();
      return client.generateStylesFromContent(
        css,
        contents.map((content) => typeof content === "string" ? { content } : content)
      );
    }
  };
};
export {
  configureMonacoTailwindcss,
  defaultLanguageSelector,
  tailwindcssData
};
//# sourceMappingURL=index.js.map
