import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  value: 'L' | 'M' | 'Q' | 'H'
  onChange: (value: string) => void
} & Omit<SelectProps, 'onChange' | 'value'>
export const EcLevelSelect: FC<Props> = (props) => {
  const onChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    props.onChange(event.target.value)
  }
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.value}
      label="Age"
      onChange={onChange}
    >
      <MenuItem value={'L'}>L</MenuItem>
      <MenuItem value={'M'}>M</MenuItem>
      <MenuItem value={'Q'}>Q</MenuItem>
      <MenuItem value={'H'}>H</MenuItem>
    </Select>
  )
}
