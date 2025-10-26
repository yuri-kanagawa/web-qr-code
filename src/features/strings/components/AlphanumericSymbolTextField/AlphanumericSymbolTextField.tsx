import { AlphanumericSymbol } from '@/domains'
import { TextField } from '@/ui/cores/TextField'
import { ChangeEvent, FC } from 'react'
import { AlphanumericSymbolTextFieldProps } from './types'

export const AlphanumericSymbolTextField: FC<
  AlphanumericSymbolTextFieldProps
> = ({
  value,
  onChange,
  language,
  label,
  error,
  helperText,
  placeholder,
  multiline = false,
  rows = 1,
  disabled = false,
  required = false
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const result = AlphanumericSymbol.create(inputValue)

    if (result.isSuccess && result.alphanumericSymbol) {
      onChange(result.alphanumericSymbol)
    }
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      label={label}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      required={required}
    />
  )
}
