import { Language } from '@/domains/valueObjects/language'
import { PhoneNumber } from '@/ui/cores/PhoneNumber/PhoneNumber'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language: Language
  label: string
  isRequired?: boolean
  inputRef?: React.Ref<HTMLInputElement>
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
  inputRef,
  ...rest
}) => {
  const displayLabel = isRequired ? `*${label}` : label
  const [defaultCountry, setDefaultCountry] = useState<string>('US')
  const [isMounted, setIsMounted] = useState(false)
  const internalRef = useRef<any>(null)

  useEffect(() => {
    setIsMounted(true)
    const country = language.country
    if (country?.code) {
      setDefaultCountry(country.code)
    }
  }, [language])

  // refを適切に処理してsetSelectionRangeエラーを防ぐ
  useEffect(() => {
    if (inputRef && internalRef.current) {
      // inputRefが関数の場合
      if (typeof inputRef === 'function') {
        inputRef(internalRef.current)
      } else if (inputRef.current !== undefined) {
        // inputRefがオブジェクトの場合
        inputRef.current = internalRef.current
      }
    }
  }, [inputRef])

  if (!isMounted) return null

  const handleChange = (e: any) => {
    const newValue = typeof e === 'string' ? e : e.target.value
    // 常に値を更新（バリデーションはZodで行う）
    onChange(newValue)
  }

  const handleEvent =
    (eventName: string, handler?: (e: any) => void) => (e: any) => {
      try {
        // setSelectionRangeエラーを防ぐための特別な処理
        if (eventName === 'onKeyDown' || eventName === 'onInput') {
          // ネイティブinput要素のsetSelectionRangeを安全に呼び出す
          const inputElement = internalRef.current?.querySelector?.('input')
          if (
            inputElement &&
            typeof inputElement.setSelectionRange === 'function'
          ) {
            try {
              // 入力タイプがsetSelectionRangeをサポートしているかチェック
              const supportedTypes = ['text', 'search', 'tel', 'url']
              if (supportedTypes.includes(inputElement.type)) {
                // カーソル位置を安全に設定
                const cursorPosition = inputElement.selectionStart || 0
                inputElement.setSelectionRange(cursorPosition, cursorPosition)
              }
            } catch (selectionError) {
              // setSelectionRangeエラーを無視
              console.warn('setSelectionRange error ignored:', selectionError)
            }
          }
        }
        handler?.(e)
      } catch (error) {
        console.error(`PhoneNumber ${eventName} error:`, error)
      }
    }

  return (
    <PhoneNumber
      label={displayLabel}
      defaultCountry={defaultCountry}
      value={value || ''}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      ref={internalRef}
      disableFormatting={false}
      preferredCountries={['US', 'JP']}
      regions={['america', 'asia']}
      onKeyDown={handleEvent('onKeyDown', rest.onKeyDown)}
      onInput={handleEvent('onInput', rest.onInput)}
      onBlur={handleEvent('onBlur', rest.onBlur)}
      onFocus={handleEvent('onFocus', rest.onFocus)}
      {...rest}
    />
  )
}
