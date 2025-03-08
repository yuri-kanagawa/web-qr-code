import { FC, useMemo } from 'react'
import { getSocialMediaName, socialMediaList } from '@/domain'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

type Props = {
  id: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
}

export const SocialMediaSelect: FC<Props> = ({ id, onChange, isOptional }) => {
  const array = useMemo(() => {
    if (isOptional) {
      return socialMediaList
    }
    return socialMediaList.filter((e) => e !== 0)
  }, [isOptional])
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={id}
        label="Age"
        onChange={(e) => {
          const value = Number(e.target.value)
          onChange({
            id: value,
            name: getSocialMediaName(value)
          })
        }}
      >
        {array.map((e) => (
          <MenuItem key={e} value={Number(e)}>
            {getSocialMediaName(e)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
