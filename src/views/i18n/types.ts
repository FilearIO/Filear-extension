export interface Locale {
  message: string
  description?: string
}

export interface LocalesDict {
  [translationKey: string]: Locale
}
