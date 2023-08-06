import type { 
  DecorationOptions, 
  Disposable,
  TextDocument,
  TextEditor,
  TextEditorSelectionChangeEvent,
  ExtensionContext,
} from 'vscode'
import { 
  window, 
  Range, 
  Position,
  Selection,
  ThemeColor,
  workspace,
  DecorationRangeBehavior, 
} from 'vscode'
import { HoverResult } from './meta'
import { getAnnotation } from './config'
import { Log } from './utils'

const decorationType = window.createTextEditorDecorationType({
  after: {
    margin: '0 0 0 1.5em',
    textDecoration: 'none',
  },
  rangeBehavior: DecorationRangeBehavior.ClosedOpen,
})

