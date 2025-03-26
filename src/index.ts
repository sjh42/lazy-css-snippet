import type { ExtensionContext } from 'vscode'
import { window } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { RegisterCompletion } from './completion'

// import { RegisterHover } from './hover'
import { LANGUAGES, getConfig } from './config'
import { RegisterAnnotations } from './annotation'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🔥 extension activated, version v${version}`)
  Log.info(`supported languages: ${LANGUAGES.join(', ')}`)

  const isOpen = getConfig('annotations', false) as boolean

  try {
    Log.info('🔧 register code completion...')
    RegisterCompletion(ctx)
    Log.info('✅ code completion registered')

    if (isOpen) {
      Log.info('🔧 register line annotation...')
      RegisterAnnotations(ctx)
      Log.info('✅ line annotation registered')
    }

    // Log.info('🔧 register hover...')
    // RegisterHover(ctx)
    // Log.info('✅ hover registered')

    Log.info('🎉 all features registered')
    window.showInformationMessage(`Lazy CSS Snippet extension activated, version v${version}`)
  }
  catch (error) {
    Log.error(error, true)
    window.showErrorMessage(`Lazy CSS Snippet extension activation failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export function deactivate() {
  Log.info('🚧 extension deactivated')
}
