export const EXT_NAMESPACE = 'lazy-css-snippet'
export const EXT_ID = '42.lazy-css-snippet'
export const EXT_NAME = 'Lazy Css Snippet'

interface SnippetMap {
  [key: string]: string
}

export const SnippetMap: SnippetMap = {
  '9px': '$font-xxxs;', 
  '10px': '$font-xxs;',
  '11px': '$font-xs;',
  '12px': '$font-s;',
  '13px': '$font-m;',
  '14px': '$font-xm;',
  '16px': '$font-l;',
  '18px': '$font-xl;',
  '20px': '$font-xxl;',
  '24px': '$font-xxxl'
}
