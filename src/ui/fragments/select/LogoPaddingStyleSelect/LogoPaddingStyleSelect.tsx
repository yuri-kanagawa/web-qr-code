import { Language } from '@/domains'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: 'square' | 'circle'
  onChange: (value: 'square' | 'circle') => void
  language: Language
  label: string
  disabled?: boolean
}

const PADDING_STYLES = ['square', 'circle'] as const

export const LogoPaddingStyleSelect: FC<Props> = ({
  value,
  onChange,
  language,
  label,
  disabled = false
}) => {
  const locale = language.getLocale()

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="logo-padding-style-select-label">{label}</InputLabel>
      <Select
        labelId="logo-padding-style-select-label"
        id="logo-padding-style-select"
        value={value}
        label={label}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value as 'square' | 'circle')
        }
      >
        {PADDING_STYLES.map((style) => (
          <MenuItem key={style} value={style}>
            {locale.word.options.logoPaddingStyle[style]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
