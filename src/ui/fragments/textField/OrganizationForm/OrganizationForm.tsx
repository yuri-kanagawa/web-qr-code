import { TextFieldProps } from '@mui/material'
import { FC } from 'react'
type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value'>

export const OrganizationForm: FC<Props> = ({
  value,
  onChange,
  ...rest
}: Props) => {
  return <></>
}
