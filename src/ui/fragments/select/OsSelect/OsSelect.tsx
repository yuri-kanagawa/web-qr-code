import { FC, useMemo } from 'react'

import { getOsName, os } from '@/constants'
import { Select, FormControl, MenuItem, InputLabel } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
}

export const OsSelect: FC<Props> = ({
  value,
  onChange,
  isOptional = false,
  hiddenItems = []
}) => {
  const array = useMemo(() => {
    let filtered = isOptional ? os : os.filter((e) => e !== 0)

    // 非表示項目を除外
    if (hiddenItems.length > 0) {
      filtered = filtered.filter((e) => !hiddenItems.includes(e))
    }

    return filtered
  }, [isOptional, hiddenItems])

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
