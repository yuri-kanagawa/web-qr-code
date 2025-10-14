import { FC, useMemo } from 'react'

import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Select, InputLabel, FormControl, MenuItem } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  language?: Language
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
}

export const DeviceSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional = false,
  hiddenItems = []
}) => {
  const devices = Object.values(Device.TYPES)
  
  const array = useMemo(() => {
    let filtered = isOptional ? devices : devices.filter((e) => e !== Device.TYPES.NOT_SET)

    // 非表示項目を除外
    if (hiddenItems.length > 0) {
      filtered = filtered.filter((e) => !hiddenItems.includes(e))
    }

    return filtered
  }, [isOptional, hiddenItems, devices])

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
          const deviceResult = Device.create(value, language)
          const name = deviceResult.isSuccess && deviceResult.device
            ? deviceResult.device.name
            : ''
          onChange({
            id: value,
            name
          })
        }}
      >
        {array.map((deviceValue) => {
          const deviceResult = Device.create(deviceValue, language)
          const name = deviceResult.isSuccess && deviceResult.device
            ? deviceResult.device.name
            : ''
          return (
            <MenuItem key={deviceValue} value={Number(deviceValue)}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
