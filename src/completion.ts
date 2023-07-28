import type { CompletionItemProvider, ExtensionContext } from 'vscode'
import { CompletionItem, CompletionItemKind, languages } from 'vscode'
import { SnippetMap } from './meta'

const LANGUAGES = ['vue', 'css', 'scss', 'less', 'html', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact']

export function RegisterCompletion(ctx: ExtensionContext) {
  const provider: CompletionItemProvider = {
    provideCompletionItems() {

      const completionItems = Object.keys(SnippetMap).map((key: string) => {
        const completionItem = new CompletionItem(key)
        completionItem.kind = CompletionItemKind.Snippet
        completionItem.insertText = `font-size: ${SnippetMap[key]}`
        completionItem.detail = `font-size: ${SnippetMap[key]}`
        return completionItem
      })
      return completionItems
    }
  }

  ctx.subscriptions.push(languages.registerCompletionItemProvider(LANGUAGES, provider))
}
