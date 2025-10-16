import { FC, useMemo } from 'react'

import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FormHelperText } from '@mui/material'

type Props = {
  value: Device
  onChange: (device: Device) => void
  language?: Language
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
  label?: string
  error?: boolean
  helperText?: string
}

export const DeviceSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional = false,
  hiddenItems = [],
  label,
  error = false,
  helperText
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

  const locale = language.locale
  const displayLabel = label || locale.word.select.device

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="device-select-label">{displayLabel}</InputLabel>
      <Select
        labelId="device-select-label"
        id="device-select"
        value={value.value}
        label={displayLabel}
        onChange={(e) => {
          const deviceId = Number(e.target.value)
          const deviceResult = Device.create(deviceId, language)
          if (deviceResult.isSuccess && deviceResult.device) {
            onChange(deviceResult.device)
          }
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
