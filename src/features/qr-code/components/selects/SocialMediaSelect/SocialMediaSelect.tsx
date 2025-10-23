import { Language } from '@/domains/valueObjects/language'
import { SocialMedia } from '@/domains/valueObjects/socialMedia'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FC, useMemo } from 'react'

type Props = {
  value: SocialMedia
  onChange: (socialMedia: SocialMedia) => void
  language?: Language
  isOptional?: boolean
  label: string
}

export const SocialMediaSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional,
  label
}) => {
  const array = useMemo(() => {
    const filtered = isOptional
      ? [...SocialMedia.list]
      : SocialMedia.list.filter((e) => !SocialMedia.isNotSet(e))
    return filtered
  }, [isOptional])

  return (
    <FormControl fullWidth>
      <InputLabel id="social-media-select-label">{label}</InputLabel>
      <Select
        labelId="social-media-select-label"
        id="social-media-select"
        value={value.value}
        label={label}
        onChange={(e) => {
          const socialMediaId = Number(e.target.value)
          const socialMediaResult = SocialMedia.create(socialMediaId, language)
          if (socialMediaResult.isSuccess && socialMediaResult.socialMedia) {
            onChange(socialMediaResult.socialMedia)
          }
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
