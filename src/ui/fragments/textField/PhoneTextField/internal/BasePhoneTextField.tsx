import { LocaleService } from '@/domains/services/locale'
import { Language } from '@/domains/valueObjects/language'
import { PhoneNumber } from '@/ui/cores/PhoneNumber/PhoneNumber'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC, useEffect, useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  label: string
  isRequired?: boolean
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

/**
 * 基本のPhoneTextField
 * CellPhone, HomePhone, Fax, WorkPhoneなどに使用される
 */
export const BasePhoneTextField: FC<Props> = ({
  value,
  onChange,
  language,
  label,
  isRequired = true,
  ...rest
}) => {
  const displayLabel = isRequired ? `*${label}` : label
  const [defaultCountry, setDefaultCountry] = useState<string>('US')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // クライアントサイドでのみ国コードを検出してHydration errorを回避
    try {
      const country = LocaleService.detectCountry()
      if (country && country.code) {
        setDefaultCountry(country.code)
      }
    } catch (error) {
      console.error('Failed to detect country:', error)
      // エラー時はデフォルトの'US'のまま
    }
  }, [])

  // クライアントサイドマウント後のみ表示
  if (!isMounted) {
    return null
  }

  return (
    <PhoneNumber
      label={displayLabel}
      defaultCountry={defaultCountry}
      value={value}
      onChange={(e) => onChange(typeof e === 'string' ? e : e.target.value)}
      variant="outlined"
      fullWidth
      {...rest}
    />
  )
}
