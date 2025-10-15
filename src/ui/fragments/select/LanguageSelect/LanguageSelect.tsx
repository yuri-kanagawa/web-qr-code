import { Language, LanguageKey } from '@/domains/valueObjects/language'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

type Props = {
  language: Language
  onLanguageChange?: (language: Language) => void
}

export const LanguageSelect: FC<Props> = ({ language, onLanguageChange }) => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = language.getLocale()

  const handleLanguageChange = (event: any) => {
    const newLanguageKey = event.target.value as LanguageKey
    const result = Language.create(newLanguageKey)

    if (result.isFailure) return

    const newLanguage = result.language!

    if (onLanguageChange) {
      onLanguageChange(newLanguage)
    } else {
      // デフォルトの言語切り替えロジック
      const currentPath = pathname
      let newPath = currentPath

      // 現在のパスから言語プレフィックスを除去
      if (!language.isEnglish) {
        newPath = currentPath.replace(`/${language.value}`, '')
      }

      // 新しい言語のパスを構築
      if (!newLanguage.isEnglish) {
        newPath = `/${newLanguage.value}${newPath}`
      }

      router.push(newPath)
    }
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
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
