import { FC, useMemo } from 'react'

import { devices, getDeviceName } from '@/constants/device'
import { getOsName } from '@/constants'
import { Select, InputLabel, FormControl, MenuItem } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
}

export const DeviceSelect: FC<Props> = ({
  value,
  onChange,
  isOptional = false,
  hiddenItems = []
}) => {
  const array = useMemo(() => {
    let filtered = isOptional ? devices : devices.filter((e) => e !== 0)

    // 非表示項目を除外
    if (hiddenItems.length > 0) {
      filtered = filtered.filter((e) => !hiddenItems.includes(e))
    }

    return filtered
  }, [isOptional, hiddenItems])

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Device</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Device"
        onChange={(e) => {
          const value = Number(e.target.value)
          onChange({
            id: value,
            name: getDeviceName(value)
          })
        }}
      >
        {array.map((e) => (
          <MenuItem key={e} value={Number(e)}>
            {getDeviceName(e)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
