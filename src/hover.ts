import type { Disposable, ExtensionContext, HoverProvider, Position, ProviderResult, TextDocument } from 'vscode'
import { Hover, MarkdownString, languages, workspace } from 'vscode'
import { LANGUAGES, getConfig, getSnippetItem } from './config'
import { SnippetMap } from './meta'
import type { SnippetItem } from './meta'
import { Log } from './utils'

// 缓存机制
class SnippetsCache {
  private static instance: SnippetsCache
  private snippets: SnippetItem | null = null
  private lastUpdateTime = 0
  private readonly cacheLifetime: number = 5000 // 缓存有效期5秒

  private constructor() {}

  public static getInstance(): SnippetsCache {
    if (!SnippetsCache.instance)
      SnippetsCache.instance = new SnippetsCache()

    return SnippetsCache.instance
  }

  public getSnippets(): SnippetItem {
    const now = Date.now()
    if (this.snippets === null || now - this.lastUpdateTime > this.cacheLifetime) {
      const customConfig = getSnippetItem('custom')
      const hasCustomConfig = customConfig && Object.keys(customConfig).length > 0
      this.snippets = hasCustomConfig && customConfig ? customConfig : SnippetMap
      this.lastUpdateTime = now
    }
    return this.snippets
  }

  public invalidateCache(): void {
    this.snippets = null
  }
}

export function RegisterHover(ctx: ExtensionContext) {
  const snippetsCache = SnippetsCache.getInstance()

  const provider: HoverProvider = {
    provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
      const fileName = document.fileName.toLowerCase()
      if (!fileName.endsWith('.scss') && !fileName.endsWith('.vue'))
        return null

      const line = document.lineAt(position.line).text
      const wordRange = document.getWordRangeAtPosition(position, /(#[0-9a-fA-F]{3,6}|\d+px)/g)

      if (!wordRange)
        return null

      const word = document.getText(wordRange)
      const snippets = snippetsCache.getSnippets()

      if (snippets[word]) {
        const value = snippets[word]

        // 创建悬停提示内容
        const content = new MarkdownString()
        content.isTrusted = true // 允许执行Markdown中的HTML

        // 判断是颜色还是字体大小
        if (word.startsWith('#')) { // 颜色值
          content.appendText(`颜色变量: ${value}`)
          content.appendCodeblock(`/* CSS示例 */\ncolor: ${value};\n/* 原值: ${word} */`, 'css')
          // 添加颜色预览
          content.appendMarkdown(`<div style="width: 1em; height: 1em; background-color: ${word}; border: 1px solid #ccc;"></div>`)
        }
        else { // 字体大小
          content.appendText(`字体大小变量: ${value}`)
          content.appendCodeblock(`/* CSS示例 */\nfont-size: ${value};\n/* 原值: ${word} */`, 'css')
        }

        return new Hover(content, wordRange)
      }

      return null
    },
  }

  // 动态管理注册状态
  let hoverProviderRegistration: Disposable | undefined

  function updateHoverProvider(): void {
    // 如果已经注册过，先清除之前的注册
    if (hoverProviderRegistration) {
      hoverProviderRegistration.dispose()
      hoverProviderRegistration = undefined
    }

    const isHoverEnabled = getConfig('hover')
    if (isHoverEnabled) {
      hoverProviderRegistration = languages.registerHoverProvider(LANGUAGES, provider)
      ctx.subscriptions.push(hoverProviderRegistration)
      Log.info('悬停功能已启用')
    }
    else {
      Log.info('悬停功能已禁用')
    }
  }

  // 监听配置变化
  ctx.subscriptions.push(
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('lazy-css-snippet')) {
        snippetsCache.invalidateCache()
        updateHoverProvider()
      }
    }),
  )

  // 初始设置
  updateHoverProvider()
}

/**
 * 从文本行和位置中提取出当前光标下的文本
 * @param line 当前行文本
 * @param pos 当前位置
 * @returns 光标下的文本
 */
function getText(line: string, pos: Position): string {
  // 提取颜色值或字体大小值
  const colorRegex = /#[0-9a-fA-F]{3,6}/g
  const fontSizeRegex = /\d+px/g

  let match
  let result = ''

  // 查找颜色值
  // eslint-disable-next-line no-cond-assign
  while ((match = colorRegex.exec(line)) !== null) {
    const start = match.index
    const end = start + match[0].length

    if (pos.character >= start && pos.character <= end) {
      result = match[0]
      break
    }
  }

  // 如果没找到颜色值，尝试查找字体大小
  if (!result) {
    // eslint-disable-next-line no-cond-assign
    while ((match = fontSizeRegex.exec(line)) !== null) {
      const start = match.index
      const end = start + match[0].length

      if (pos.character >= start && pos.character <= end) {
        result = match[0]
        break
      }
    }
  }

  return result
}
