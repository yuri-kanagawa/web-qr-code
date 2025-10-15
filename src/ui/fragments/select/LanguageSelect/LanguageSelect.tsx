import { Language, LanguageKey } from '@/domains/valueObjects/language'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FC } from 'react'

type Props = {
  language: Language
  onChange: (language: Language) => void
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const locale = language.getLocale()

  const handleLanguageChange = (event: any) => {
    const newLanguageKey = event.target.value as LanguageKey
    const result = Language.create(newLanguageKey)

    if (result.isFailure) return

    const newLanguage = result.language!
    onChange(newLanguage)
  }

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="language-select-label">
        {locale.word.select.language}
      </InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language.value}
        label={locale.word.select.language}
        onChange={handleLanguageChange}
      >
        {Language.getAllLanguages().map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
