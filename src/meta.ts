export const EXT_NAMESPACE = 'lazy-css-snippet'
export const EXT_ID = '42.lazy-css-snippet'
export const EXT_NAME = 'Lazy Css Snippet'

export interface SnippetItem {
  [key: string]: string
}

export interface HoverResult {
  type: string;
  documentation: string;
  from: string;
  to: string;
}

export const SnippetMap: SnippetItem = {
  "9px": "$font-xxxs;", 
  "10px": "$font-xxs;",
  "11px": "$font-xs;",
  "12px": "$font-s;",
  "13px": "$font-m;",
  "14px": "$font-xm;",
  "15px": '123',
  "16px": "$font-l;",
  "18px": "$font-xl;",
  "20px": "$font-xxl;",
  "24px": "$font-xxxl",
  "#1181d7": "$color-primary;",
  "#eda12d": "$color-yellow;",
  "#fdbb56": "$color-yellow-1;",
  "#a38766": "$color-yellow-2;",
  "#57301B": "$color-yellow-3;",
  "#fff": "$color-white;",
  "#f8f9fc": "$color-white-1;",
  "#f5f6fa": "$color-bg;",
  "#09134e": "$color-black;",
  "#000": "$color-black-1;",
  "#0f2128": "$color-black-2;",
  "#202231": "$color-black-3;",
  "#9299c6": "$color-gray;",
  "#d3d5e1": "$color-gray-2;",
  "#dfe2ea": "$color-gray-3;",
  "#bfc3e1": "$color-gray-4;",
  "#596297": "$color-gray-5;",
  "#eae9e9": "$color-gray-6;",
  "#eef0f6": "$color-gray-7;",
  "#838c8f": "$color-gray-8;",
  "#7e84a7": "$color-gray-9;",
  "#d9d9d9": "$color-gray-10;",
  "#0f489f": "$color-blue;",
  "#5bbdfa": "$color-blue-1;",
  "#063481": "$color-blue-2;",
  "#1656b4": "$color-blue-3;",
  "#3aa7ed": "$color-blue-4;",
  "#6cc9ff": "$color-blue-5;",
  "#ccecff": "$color-blue-6;",
  "#47a3e6": "$color-blue-7;",
  "#1874C1": "$color-blue-8;",
  "#53C3F7": "$color-blue-9;",
  "#dd2d4d": "$color-red;",
  "#932135": "$color-red-1;",
  "#f5727a": "$color-red-2;",
  "#8d2213": "$color-red-3;",
  "#c11e3d": "$color-red-4;",
  "#e63e59": "$color-red-5;",
  "#f96e79": "$color-red-6;",
  "#f76060": "$color-red-7;",
  "#e22d4b": "$color-red-8;",
  "#ee0a24": "$color-red-9;",
  "#FF6D7B": "$color-red-10;",
  "#f99d3b": "$color-red-11;",
  "#e54545": "$color-red-12;",
  "#08bcc8": "$color-green;",
  "#4CBF00": "$color-green-1;",
}
