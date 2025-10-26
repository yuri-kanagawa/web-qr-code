import { AlphanumericSymbol } from '@/domains'
import { Language } from '@/domains/valueObjects/language'

export interface AlphanumericSymbolTextFieldProps {
  value: string
  onChange: (value: AlphanumericSymbol) => void
  language: Language
  label?: string
  error?: boolean
  helperText?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  disabled?: boolean
  required?: boolean
}
