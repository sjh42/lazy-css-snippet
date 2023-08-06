import { workspace } from 'vscode'
import { SnippetItem } from './meta'

export function getConfig(key: string): SnippetItem | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key)
}

export function getHover(key: string): Boolean | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key)
}

export function getAnnotation(key: string): Boolean | undefined {
  return workspace.getConfiguration('lazy-css-snippet').get(key)
}

export const LANGUAGES = ['vue', 'scss']
