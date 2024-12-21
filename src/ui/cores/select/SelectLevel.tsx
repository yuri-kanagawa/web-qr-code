import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  value: string
  onchange: (value: string) => void
}
export const SelectLevel: FC<Props> = (props) => {
  const onChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    props.onchange(event.target.value)
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
      <MenuItem value={'S'}>S</MenuItem>
    </Select>
  )
}
