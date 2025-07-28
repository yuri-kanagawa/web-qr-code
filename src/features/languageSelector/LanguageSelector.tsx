'use client'
import { FC } from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { language, LanguageKey } from '@/locales/language'
import { useRouter, usePathname } from 'next/navigation'
import { path } from '@/config/path'

type Props = {
  currentLanguage: LanguageKey
  onLanguageChange?: (language: LanguageKey) => void
}

// 言語選択のラベル
const languageLabels = {
  en: 'Language',
  ja: '言語',
  fr: 'Langue'
} as const

export const LanguageSelector: FC<Props> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value as LanguageKey

    if (onLanguageChange) {
      onLanguageChange(newLanguage)
    } else {
      // デフォルトの言語切り替えロジック
      const currentPath = pathname
      let newPath = currentPath

      // 現在のパスから言語プレフィックスを除去
      if (currentLanguage !== 'en') {
        newPath = currentPath.replace(`/${currentLanguage}`, '')
      }

      // 新しい言語のパスを構築
      if (newLanguage !== 'en') {
        newPath = `/${newLanguage}${newPath}`
      }

      router.push(newPath)
    }
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="language-select-label">
        {languageLabels[currentLanguage]}
      </InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={currentLanguage}
        label={languageLabels[currentLanguage]}
        onChange={handleLanguageChange}
      >
        {Object.entries(language).map(([key, label]) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
