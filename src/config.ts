import { workspace } from 'vscode'
import type { SnippetItem } from './meta'

export function getSnippetItem(key: string): SnippetItem | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key)
}

export function getConfig(key: string, defaultValue = false): unknown | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key, defaultValue)
}

export const LANGUAGES = ['vue', 'scss', 'less', 'sass']
