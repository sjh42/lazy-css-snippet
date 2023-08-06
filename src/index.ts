import { ExtensionContext, languages } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { RegisterCompletion } from './completion'
import { RegisterHover } from './hover'
// import { RegisterAnnotations } from './line-annotation'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)
  RegisterCompletion(ctx)
  // RegisterAnnotations(ctx)
  // RegisterHover(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
