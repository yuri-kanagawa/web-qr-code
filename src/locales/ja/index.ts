import { word } from './word'
import { message } from './message'
import { meta } from './metas'

export const ja = {
  word,
  message,
  meta
} as const

export * from './word'
export * from './message'
export * from './metas'
