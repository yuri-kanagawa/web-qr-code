import { FC } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { TextField } from '@mui/material'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const SubjectTextField: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <TextField
      label={'subject'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}
