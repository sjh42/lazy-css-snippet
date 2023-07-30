import type { CompletionItemProvider, ExtensionContext } from 'vscode'
import { CompletionItem, CompletionItemKind, languages } from 'vscode'
import { SnippetMap } from './meta'

const LANGUAGES = ['vue', 'scss']
const REG = /^#+/

export function RegisterCompletion(ctx: ExtensionContext) {
  const provider: CompletionItemProvider = {
    provideCompletionItems() {

      const completionItems = Object.keys(SnippetMap).map((key: string) => {
        if (REG.test(key)) {
          const completionItem = new CompletionItem(key)
          completionItem.kind = CompletionItemKind.Snippet
          completionItem.insertText = `color: ${SnippetMap[key]}`
          completionItem.detail = `color: ${key}`
          return completionItem
        } else {
          const completionItem = new CompletionItem(key)
          completionItem.kind = CompletionItemKind.Snippet
          completionItem.insertText = `font-size: ${SnippetMap[key]}`
          completionItem.detail = `font-size: ${key}`
          return completionItem
        }
      })
      return completionItems
    }
  }

  ctx.subscriptions.push(languages.registerCompletionItemProvider(LANGUAGES, provider))
}
