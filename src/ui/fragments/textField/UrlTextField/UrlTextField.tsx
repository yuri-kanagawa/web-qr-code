import { FC } from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField/TextField'

type Props = {
  isRequired?: boolean
} & Omit<TextFieldProps, 'label' | 'placeholder'>

export const UrlTextField: FC<Props> = ({
  isRequired = false,
  ...rest
}: Props) => {
  return (
    <TextField
      label={isRequired ? '*URL' : 'URL'}
      placeholder="https://"
      {...rest}
    />
  )
}
