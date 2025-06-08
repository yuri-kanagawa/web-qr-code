import { Select, SelectProps, MenuItem } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: 'L' | 'M' | 'Q' | 'H'
  onChange: (value: 'L' | 'M' | 'Q' | 'H') => void
} & Omit<SelectProps, 'onChange' | 'value'>

export const EcLevelSelect: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <Select
      value={value}
      onChange={(e) => {
        onChange(e.target.value as 'L' | 'M' | 'Q' | 'H')
      }}
      {...rest}
    >
      <MenuItem value="L">L</MenuItem>
      <MenuItem value="M">M</MenuItem>
      <MenuItem value="Q">Q</MenuItem>
      <MenuItem value="H">H</MenuItem>
    </Select>
  )
}
