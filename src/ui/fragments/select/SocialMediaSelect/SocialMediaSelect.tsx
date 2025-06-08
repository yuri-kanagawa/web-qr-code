import { FC, useMemo } from 'react'
import { getSocialMediaName, socialMediaList } from '@/domain'
import {
  SelectProps,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  isOptional?: boolean
} & Omit<SelectProps, 'onChange' | 'value'>

export const SocialMediaSelect: FC<Props> = ({
  value,
  onChange,
  isOptional
}) => {
  const array = useMemo(() => {
    if (isOptional) {
      return socialMediaList
    }
    return socialMediaList.filter((e) => e !== 0)
  }, [isOptional])
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Social Media</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="social media"
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
