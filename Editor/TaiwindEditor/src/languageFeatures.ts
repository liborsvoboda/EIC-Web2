import { fromRatio, names as namedColors } from '@ctrl/tinycolor'
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
} from 'monaco-languageserver-types'
import { type MarkerDataProvider } from 'monaco-marker-data-provider'
import { type editor, type languages, type MonacoEditor } from 'monaco-types'
import { type WorkerGetter } from 'monaco-worker-manager'

import { type TailwindcssWorker } from './tailwindcss.worker.js'

type WorkerAccessor = WorkerGetter<TailwindcssWorker>

const colorNames = Object.values(namedColors)
const editableColorRegex = new RegExp(
  `-\\[(${colorNames.join('|')}|((?:#|rgba?\\(|hsla?\\())[^\\]]+)\\]$`
)
const sheet = new CSSStyleSheet()
document.adoptedStyleSheets.push(sheet)

function colorValueToHex(value: number): string {
  return Math.round(value * 255)
    .toString(16)
    .padStart(2, '0')
}

function createColorClass(color: languages.IColor): string {
  const hex = `${colorValueToHex(color.red)}${colorValueToHex(color.green)}${colorValueToHex(
    color.blue
  )}`
  const className = `tailwindcss-color-decoration-${hex}`
  const selector = `.${className}`
  for (const rule of sheet.cssRules) {
    if ((rule as CSSStyleRule).selectorText === selector) {
      return className
    }
  }
  sheet.insertRule(`${selector}{background-color:#${hex}}`)
  return className
}

export function createColorProvider(
  monaco: MonacoEditor,
  getWorker: WorkerAccessor
): languages.DocumentColorProvider {
  const modelMap = new WeakMap<editor.ITextModel, string[]>()

  monaco.editor.onWillDisposeModel((model) => {
    modelMap.delete(model)
  })

  return {
    async provideDocumentColors(model) {
      const worker = await getWorker(model.uri)

      const editableColors: languages.IColorInformation[] = []
      const nonEditableColors: editor.IModelDeltaDecoration[] = []
      const colors = await worker.getDocumentColors(String(model.uri), model.getLanguageId())
      if (colors) {
        for (const lsColor of colors) {
          const monacoColor = toColorInformation(lsColor)
          const text = model.getValueInRange(monacoColor.range)
          if (editableColorRegex.test(text)) {
            editableColors.push(monacoColor)
          } else {
            nonEditableColors.push({
              range: monacoColor.range,
              options: {
                before: {
                  content: '\u00A0',
                  inlineClassName: `${createColorClass(monacoColor.color)} colorpicker-color-decoration`,
                  inlineClassNameAffectsLetterSpacing: true
                }
              }
            })
          }
        }
      }

      modelMap.set(model, model.deltaDecorations(modelMap.get(model) ?? [], nonEditableColors))

      return editableColors
    },

    provideColorPresentations(model, colorInformation) {
      const className = model.getValueInRange(colorInformation.range)
      const match = new RegExp(
        `-\\[(${colorNames.join('|')}|(?:(?:#|rgba?\\(|hsla?\\())[^\\]]+)\\]$`,
        'i'
      ).exec(className)

      if (!match) {
        return []
      }

      const [currentColor] = match

      const isNamedColor = colorNames.includes(currentColor)
      const color = fromRatio({
        r: colorInformation.color.red,
        g: colorInformation.color.green,
        b: colorInformation.color.blue,
        a: colorInformation.color.alpha
      })

      let hexValue = color.toHex8String(
        !isNamedColor && (currentColor.length === 4 || currentColor.length === 5)
      )
      if (hexValue.length === 5) {
        hexValue = hexValue.replace(/f$/, '')
      } else if (hexValue.length === 9) {
        hexValue = hexValue.replace(/ff$/, '')
      }

      const rgbValue = color.toRgbString().replaceAll(' ', '')
      const hslValue = color.toHslString().replaceAll(' ', '')
      const prefix = className.slice(0, Math.max(0, match.index))

      return [
        { label: `${prefix}-[${hexValue}]` },
        { label: `${prefix}-[${rgbValue}]` },
        { label: `${prefix}-[${hslValue}]` }
      ]
    }
  }
}

export function createHoverProvider(getWorker: WorkerAccessor): languages.HoverProvider {
  return {
    async provideHover(model, position) {
      const worker = await getWorker(model.uri)

      const hover = await worker.doHover(
        String(model.uri),
        model.getLanguageId(),
        fromPosition(position)
      )

      return hover && toHover(hover)
    }
  }
}

export function createCodeActionProvider(getWorker: WorkerAccessor): languages.CodeActionProvider {
  return {
    async provideCodeActions(model, range, context) {
      const worker = await getWorker(model.uri)

      const codeActions = await worker.doCodeActions(
        String(model.uri),
        model.getLanguageId(),
        fromRange(range),
        fromCodeActionContext(context)
      )

      if (codeActions) {
        return {
          actions: codeActions.map(toCodeAction),
          dispose() {
            // Do nothing
          }
        }
      }
    }
  }
}

export function createCompletionItemProvider(
  getWorker: WorkerAccessor
): languages.CompletionItemProvider {
  return {
    async provideCompletionItems(model, position, context) {
      const worker = await getWorker(model.uri)

      const completionList = await worker.doComplete(
        String(model.uri),
        model.getLanguageId(),
        fromPosition(position),
        fromCompletionContext(context)
      )

      if (!completionList) {
        return
      }

      const wordInfo = model.getWordUntilPosition(position)

      return toCompletionList(completionList, {
        range: {
          startLineNumber: position.lineNumber,
          startColumn: wordInfo.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: wordInfo.endColumn
        }
      })
    },

    async resolveCompletionItem(item) {
      const worker = await getWorker()

      const result = await worker.resolveCompletionItem(fromCompletionItem(item))

      return toCompletionItem(result, { range: item.range })
    }
  }
}

export function createMarkerDataProvider(getWorker: WorkerAccessor): MarkerDataProvider {
  return {
    owner: 'tailwindcss',
    async provideMarkerData(model) {
      const worker = await getWorker(model.uri)

      const diagnostics = await worker.doValidate(String(model.uri), model.getLanguageId())

      return diagnostics?.map(toMarkerData)
    }
  }
}
