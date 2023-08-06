import type { HoverProvider, ProviderResult, TextDocument, ExtensionContext } from 'vscode'
import { Hover, MarkdownString, Position, languages } from 'vscode'
import { Log } from './utils'
import { LANGUAGES, getHover } from './config'

// 暂不使用
export function RegisterHover(ctx: ExtensionContext) {
  const provider: HoverProvider = {
    provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
      const line = document.lineAt(position.line).text.trim()
      const text = getText(line, position)
      return new Hover(new MarkdownString('hello world').appendCodeblock('hello world', 'scss'))
    }
  }
  const isHover = getHover('hover')
  if (isHover) {
    ctx.subscriptions.push(languages.registerHoverProvider(LANGUAGES, provider))
  }
}

function getText(line: string, pos: Position): string {
  let text = ''
  return text
}
