import { FC, useMemo } from 'react'
import { SocialMedia } from '@/domains/valueObjects/socialMedia'
import { Language } from '@/domains/valueObjects/language'
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
  language?: Language
  isOptional?: boolean
} & Omit<SelectProps, 'onChange' | 'value'>

export const SocialMediaSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional
}) => {
  const array = useMemo(() => {
    const filtered = isOptional
      ? [...SocialMedia.list]
      : SocialMedia.list.filter((e) => !SocialMedia.isNotSet(e))
    return filtered
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
          const socialMediaResult = SocialMedia.create(value, language)
          const name =
            socialMediaResult.isSuccess && socialMediaResult.socialMedia
              ? socialMediaResult.socialMedia.name
              : ''
          onChange({
            id: value,
            name
          })
        }}
      >
        {array.map((socialMediaValue) => {
          const socialMediaResult = SocialMedia.create(
            socialMediaValue,
            language
          )
          const name =
            socialMediaResult.isSuccess && socialMediaResult.socialMedia
              ? socialMediaResult.socialMedia.name
              : ''
          return (
            <MenuItem key={socialMediaValue} value={Number(socialMediaValue)}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
