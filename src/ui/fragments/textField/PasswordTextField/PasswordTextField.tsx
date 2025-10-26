import { AlphanumericSymbolTextField } from '@/features/strings/components'
import { TextFieldProps } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>

export const PasswordTextField: FC<Props> = ({
  value,
  onChange,
  children,
  ...rest
}) => {
  return (
    <AlphanumericSymbolTextField
      {...rest}
      value={value}
      onChange={(e) => onChange(e)}
      label="Password"
    >
      {children}
    </AlphanumericSymbolTextField>
  )
}
