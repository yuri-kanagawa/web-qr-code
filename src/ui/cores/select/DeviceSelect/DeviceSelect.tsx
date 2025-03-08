import { FC, useMemo } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { devices, getDeviceName } from '@/domain/device'
type Props = {
  id: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
}

export const DeviceSelect: FC<Props> = ({
  id,
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
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={id}
        label="Age"
        onChange={(e) =>
          onChange({
            id: Number(e.target.value),
            name: ''
          })
        }
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
