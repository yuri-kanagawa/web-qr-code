import { word } from './word'
import {meta} from './metas'
import {message} from './message'
export const en = {
  word,
  meta,
  message
} as const


export type Locale =  typeof en