import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material'
import { FC, ReactNode } from 'react'
type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<SelectProps, 'value' | 'onChange'>
export const LogoPaddingStyleSelect: FC<Props> = ({
  value,
  onChange,
  ...selectProps
}) => {
  return (
    <Select
      {...selectProps}
      value={value}
      label="Age"
      onChange={(event) => onChange(String(event.target.value))}
    >
      <MenuItem value={'square'}>square</MenuItem>
      <MenuItem value={'circle'}>circle</MenuItem>
    </Select>
  )
}
