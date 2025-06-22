import { FC, useMemo } from 'react'

import { devices, getDeviceName } from '@/domain/device'
import { getOsName } from '@/domain'
import { Select, InputLabel, FormControl, MenuItem } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
}

export const DeviceSelect: FC<Props> = ({
  value,
  onChange,
  isOptional = false
}) => {
  const array = useMemo(() => {
    if (isOptional) {
      return devices
    }
    return devices.filter((e) => e !== 0)
  }, [isOptional])
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
