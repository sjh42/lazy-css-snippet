import { ExtensionContext, languages, window } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { RegisterCompletion } from './completion'
// import { RegisterHover } from './hover'
import { RegisterAnnotations } from './annotation'
import { LANGUAGES } from './config'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🔥 extension activated, version v${version}`)
  Log.info(`supported languages: ${LANGUAGES.join(', ')}`)
  
  try {
    Log.info('🔧 register code completion...')
    RegisterCompletion(ctx)
    Log.info('✅ code completion registered')
    
    Log.info('🔧 register line annotation...')
    RegisterAnnotations(ctx)
    Log.info('✅ line annotation registered')
    
    // Log.info('🔧 register hover...')
    // RegisterHover(ctx)
    // Log.info('✅ hover registered')
    
    Log.info('🎉 all features registered')
    window.showInformationMessage(`Lazy CSS Snippet extension activated, version v${version}`);
  } catch (error) {
    Log.error(error, true)
    window.showErrorMessage(`Lazy CSS Snippet extension activation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function deactivate() {
  Log.info('🚧 extension deactivated')
}
