import type { ExtensionContext } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { RegisterCompletion } from './completion'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)

  RegisterCompletion(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
