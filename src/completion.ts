import type { CompletionItemProvider, ExtensionContext, TextDocument } from 'vscode'
import { CompletionItem, CompletionItemKind, languages } from 'vscode'
import { LANGUAGES, getSnippetItem } from './config'
import { SnippetMap } from './meta'
import type { SnippetItem } from './meta'

function getRegexForLanguage(languageId: string): RegExp {
  switch (languageId) {
    case 'scss':
    case 'sass':
      return /^#+/
    case 'less':
      return /^@+/
    default:
      return /^--+/
  }
}

export function RegisterCompletion(ctx: ExtensionContext) {
  const provider: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument) {
      const REG = getRegexForLanguage(document.languageId)

      let completionItems: CompletionItem[] = []

      const customConfig = getSnippetItem('custom')
      const hasCustomConfig = customConfig && Object.keys(customConfig).length > 0

      const snippets: SnippetItem = hasCustomConfig ? customConfig as SnippetItem : SnippetMap

      completionItems = Object.keys(snippets).map((key: string) => {
        if (REG.test(key)) {
          const completionItem = new CompletionItem(key)
          completionItem.kind = CompletionItemKind.Snippet
          completionItem.insertText = `color: ${snippets[key]}`
          completionItem.detail = `color: ${key}`
          return completionItem
        }
        else {
          const completionItem = new CompletionItem(key)
          completionItem.kind = CompletionItemKind.Snippet
          completionItem.insertText = `font-size: ${snippets[key]}`
          completionItem.detail = `font-size: ${key}`
          return completionItem
        }
      })

      return completionItems
    },
  }

  ctx.subscriptions.push(languages.registerCompletionItemProvider(LANGUAGES, provider))
}
