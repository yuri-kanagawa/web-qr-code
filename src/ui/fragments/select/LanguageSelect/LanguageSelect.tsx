import { FC } from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Language, LanguageKey } from '@/domains/valueObjects/language'
import { useRouter, usePathname } from 'next/navigation'
import { word } from '@/locales/en/word'

type Props = {
  language: Language
  onLanguageChange?: (language: Language) => void
}

export const LanguageSelect: FC<Props> = ({ language, onLanguageChange }) => {
  const router = useRouter()
  const pathname = usePathname()

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
      <InputLabel id="language-select-label">{word.select.language}</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language.value}
        label={word.select.language}
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
