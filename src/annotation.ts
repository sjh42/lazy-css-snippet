import type {
  DecorationOptions,
  ExtensionContext,
  TextEditor,
} from 'vscode'
import {
  DecorationRangeBehavior,
  Range,
  ThemeColor,
  window,
  workspace,
} from 'vscode'
import { SnippetMap } from './meta'
import { getConfig, getSnippetItem } from './config'
import { Log } from './utils'
import type { SnippetItem } from './meta'

export interface DecorationMatch extends DecorationOptions {
  key: string
}

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
    if (!editor)
      return

    const fileName = editor.document.fileName.toLowerCase()
    if (!fileName.endsWith('.scss') && !fileName.endsWith('.vue')) {
      editor.setDecorations(decorationType, [])
      return
    }

    // 每次更新时重新获取配置，而不是使用模块级别的常量
    const isAnnotationEnabled = getConfig('annotation', true)

    if (!isAnnotationEnabled) {
      editor.setDecorations(decorationType, [])
      return
    }

    const text = editor.document.getText()
    const colorRegex = /(#[0-9a-fA-F]{3,6})/g
    const fontSizeRegex = /(\d+px)/g
    const matches: Array<[Range, string]> = []

    // 每次都重新获取用户配置
    const customConfig = getSnippetItem('custom')
    const hasCustomConfig = customConfig && Object.keys(customConfig).length > 0
    const snippets: SnippetItem = hasCustomConfig && customConfig ? customConfig : SnippetMap

    Log.info(`Annotation: processing ${editor.document.fileName}, using ${hasCustomConfig ? 'custom' : 'default'} snippets`)

    // 匹配颜色值
    let colorMatch: RegExpExecArray | null
    // eslint-disable-next-line no-cond-assign
    while ((colorMatch = colorRegex.exec(text)) !== null) {
      const key = colorMatch[1]
      if (snippets[key]) {
        const startPos = editor.document.positionAt(colorMatch.index)
        const endPos = editor.document.positionAt(colorMatch.index + key.length)
        matches.push([new Range(startPos, endPos), key])
      }
    }

    // 匹配字体大小
    let fontMatch: RegExpExecArray | null
    // eslint-disable-next-line no-cond-assign
    while ((fontMatch = fontSizeRegex.exec(text)) !== null) {
      const key = fontMatch[1]
      if (snippets[key]) {
        const startPos = editor.document.positionAt(fontMatch.index)
        const endPos = editor.document.positionAt(fontMatch.index + key.length)
        matches.push([new Range(startPos, endPos), key])
      }
    }

    Log.info(`Annotation: find ${matches.length} matches`)

    // 如果没有匹配项，直接返回
    if (matches.length === 0) {
      editor.setDecorations(decorationType, [])
      return
    }

    // 创建装饰效果
    decorations = matches.map(([range, key]) => {
      return {
        range,
        key,
        renderOptions: {
          after: {
            contentText: `✨ ${snippets[key]}`,
            color: new ThemeColor('editorCodeLens.foreground'),
          },
        },
      } as DecorationMatch
    })

    editor.setDecorations(decorationType, decorations)
  }

  function triggerUpdateDecorations() {
    if (window.activeTextEditor) {
      editor = window.activeTextEditor
      updateDecorations()
    }
  }

  // 注册事件监听器
  ctx.subscriptions.push(
    window.onDidChangeActiveTextEditor(() => {
      triggerUpdateDecorations()
    }),
    window.onDidChangeTextEditorSelection(() => {
      triggerUpdateDecorations()
    }),
    workspace.onDidChangeTextDocument((event) => {
      if (window.activeTextEditor && event.document === window.activeTextEditor.document)
        triggerUpdateDecorations()
    }),
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('lazy-css-snippet'))
        triggerUpdateDecorations()
    }),
  )

  // 初始触发更新
  triggerUpdateDecorations()
}
