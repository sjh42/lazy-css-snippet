import type { 
  DecorationOptions, 
  Disposable,
  TextDocument,
  TextEditor,
  TextEditorSelectionChangeEvent,
  ExtensionContext,
} from 'vscode'
import { 
  window, 
  Range, 
  Position,
  Selection,
  ThemeColor,
  workspace,
  DecorationRangeBehavior, 
} from 'vscode'
import { HoverResult } from './meta'
import { getConfig, getSnippetItem } from './config'
import { Log } from './utils'

export interface DecorationMatch extends DecorationOptions {
  key: string
}

const isAnnotation = getConfig('annotation')
const snippetItem = getSnippetItem('custom')

export function RegisterAnnotations(ctx: ExtensionContext) {
  const decorationType = window.createTextEditorDecorationType({
    after: {
      margin: '0 0 0 1.5em',
      textDecoration: 'none',
    },
    rangeBehavior: DecorationRangeBehavior.ClosedOpen,
  })

  let decorations: DecorationMatch[] = []
  let editor: TextEditor | undefined

  async function updateDecorations() {
    if (!editor) return

    if (!isAnnotation) {
      editor.setDecorations(decorationType, [])
      return
    }
    // TODO: 搞清楚这里的逻辑
    const text = editor.document.getText()
    const keys: [Range, string][] = []
    let match: any
    const key = match[1]
    const startPos = editor.document.positionAt(match.index + 1)
    const endPos = editor.document.positionAt(match.index + match[0].length)
    keys.push([new Range(startPos, endPos), key])
  }
}
