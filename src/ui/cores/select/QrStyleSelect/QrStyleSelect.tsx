import { MenuItem, Select, SelectProps } from '@mui/material'
import { FC } from 'react'
type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<SelectProps, 'value' | 'onChange'>
export const QrStyleSelect: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <Select
      {...rest}
      value={value}
      label="Age"
      onChange={(event) => onChange(String(event.target.value))}
    >
      <MenuItem value={'squares'}>squares</MenuItem>
      <MenuItem value={'dots'}>dots</MenuItem>
      <MenuItem value={'fluid'}>fluid</MenuItem>
    </Select>
  )
}
