import { workspace } from 'vscode'
import { SnippetItem, SnippetMap } from './meta'

export function getSnippetItem(key: string): SnippetItem {
  return workspace.getConfiguration('lazy-css-snippet').get(key) || SnippetMap
}

export function getConfig(key: string): Boolean | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key)
}

export const LANGUAGES = ['vue', 'scss']
