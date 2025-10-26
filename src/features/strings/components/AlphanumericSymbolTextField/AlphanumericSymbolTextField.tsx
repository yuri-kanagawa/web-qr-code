import { AlphanumericSymbol } from '@/domains'
import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { ChangeEvent, FC } from 'react'

interface Props extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
}

export const AlphanumericSymbolTextField: FC<Props> = ({
  value,
  onChange,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const result = AlphanumericSymbol.create(inputValue)

    if (result.isSuccess && result.alphanumericSymbol) {
      onChange(result.alphanumericSymbol.value)
    }
  }

  return <TextField value={value} onChange={handleChange} {...rest} />
}
