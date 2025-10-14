import { FC, useMemo } from 'react'

import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'

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
  const array = useMemo(() => {
    const filtered = isOptional
      ? [...Device.list]
      : Device.list.filter((e) => !Device.isNotSet(e))

    // 非表示項目を除外
    return hiddenItems.length > 0
      ? filtered.filter((e) => !hiddenItems.includes(e))
      : filtered
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
          const deviceResult = Device.create(value, language)
          const name =
            deviceResult.isSuccess && deviceResult.device
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
          const name =
            deviceResult.isSuccess && deviceResult.device
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
