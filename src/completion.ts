import type { CompletionItemProvider, ExtensionContext } from 'vscode'
import { CompletionItem, CompletionItemKind, languages } from 'vscode'
import { getSnippetItem, LANGUAGES } from './config'
import type { SnippetItem } from './meta'
import { SnippetMap } from './meta'

const REG = /^#+/
const USER_SNIPPET: SnippetItem = getSnippetItem('custom')

export function RegisterCompletion(ctx: ExtensionContext) {
  const provider: CompletionItemProvider = {
    provideCompletionItems() {
      let completionItems: CompletionItem[] = []
      if (USER_SNIPPET) {
        completionItems = Object.keys(USER_SNIPPET).map((key: string) => {
          if (REG.test(key)) {
            const completionItem = new CompletionItem(key)
            completionItem.kind = CompletionItemKind.Snippet
            completionItem.insertText = `color: ${USER_SNIPPET[key]}`
            completionItem.detail = `color: ${key}`
            return completionItem
          } else {
            const completionItem = new CompletionItem(key)
            completionItem.kind = CompletionItemKind.Snippet
            completionItem.insertText = `font-size: ${USER_SNIPPET[key]}`
            completionItem.detail = `font-size: ${key}`
            return completionItem
          }
        })
      } else {
        completionItems = Object.keys(SnippetMap).map((key: string) => {
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
      }
      return completionItems
    }
  }

  ctx.subscriptions.push(languages.registerCompletionItemProvider(LANGUAGES, provider))
}
