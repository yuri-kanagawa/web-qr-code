import { FC, useMemo } from 'react'

import { getOsName, osList } from '@/domain'
import { Select, FormControl, MenuItem, InputLabel } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
}

export const OsSelect: FC<Props> = ({
  value,
  onChange,
  isOptional = false
}) => {
  const array = useMemo(() => {
    if (isOptional) {
      return osList
    }
    return osList.filter((e) => e !== 0)
  }, [isOptional])
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">OS</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="OS"
        onChange={(e) => {
          const value = Number(e.target.value)
          onChange({
            id: value,
            name: getOsName(value)
          })
        }}
      >
        {array.map((e) => (
          <MenuItem key={e} value={Number(e)}>
            {getOsName(e)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
