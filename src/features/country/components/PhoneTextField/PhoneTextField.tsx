import { Country } from '@/domains'
import { PhoneNumber } from '@/ui/cores/PhoneNumber'
import { CenterLoading } from '@/ui/fragments'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { FC, useEffect, useRef, useState } from 'react'

export interface Props
  extends Omit<TextFieldProps, 'value' | 'onChange' | 'label'> {
  value: string
  onChange: (value: string) => void
  language: any // Language型を後で修正
  label: string
  isRequired?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  detectedCountry?: Country | null
  isCountryDetecting?: boolean
}

/**
 * 電話番号入力フィールド
 * 検出された国または言語の国コードを使用してデフォルト国を設定
 */
export const PhoneTextField: FC<Props> = ({
  value,
  onChange,
  language,
  label,
  isRequired = true,
  inputRef,
  detectedCountry,
  isCountryDetecting,
  ...rest
}) => {
  const displayLabel = isRequired ? `*${label}` : label
  const [isMounted, setIsMounted] = useState(false)
  const internalRef = useRef<any>(null)

  // マウント状態を管理
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleChange = (e: any) => {
    const newValue = typeof e === 'string' ? e : e.target.value
    onChange(newValue)
  }

  const handleEvent =
    (eventName: string, handler?: (e: any) => void) => (e: any) => {
      try {
        // setSelectionRangeエラーを防ぐための特別な処理
        if (eventName === 'onKeyDown' || eventName === 'onInput') {
          const inputElement = internalRef.current?.querySelector?.('input')
          if (
            inputElement &&
            typeof inputElement.setSelectionRange === 'function'
          ) {
            try {
              const supportedTypes = ['text', 'search', 'tel', 'url']
              if (supportedTypes.includes(inputElement.type)) {
                const cursorPosition = inputElement.selectionStart || 0
                inputElement.setSelectionRange(cursorPosition, cursorPosition)
              }
            } catch (selectionError) {
              console.warn('setSelectionRange error ignored:', selectionError)
            }
          }
        }
        handler?.(e)
      } catch (error) {
        console.error(`PhoneNumber ${eventName} error:`, error)
      }
    }

  // ローディング中の場合
  if (isCountryDetecting) {
    return (
      <CenterLoading
        message=""
        boxProps={{
          sx: {
            height: '56px',
            background: 'transparent'
          }
        }}
      />
    )
  }

  // 国コードを取得（検出された国または言語の国を使用）
  const defaultCountry = detectedCountry?.value || language.country.value

  // mui-phone-numberライブラリを使用
  try {
    return (
      <PhoneNumber
        label={displayLabel}
        defaultCountry={defaultCountry}
        value={value || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        ref={internalRef}
        onKeyDown={handleEvent('onKeyDown', rest.onKeyDown)}
        onInput={handleEvent('onInput', rest.onInput)}
        onBlur={handleEvent('onBlur', rest.onBlur)}
        onFocus={handleEvent('onFocus', rest.onFocus)}
        {...rest}
      />
    )
  } catch (error) {
    // エラーが発生した場合は'us'をフォールバック
    return (
      <PhoneNumber
        label={displayLabel}
        defaultCountry="us"
        value={value || ''}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        ref={internalRef}
        onKeyDown={handleEvent('onKeyDown', rest.onKeyDown)}
        onInput={handleEvent('onInput', rest.onInput)}
        onBlur={handleEvent('onBlur', rest.onBlur)}
        onFocus={handleEvent('onFocus', rest.onFocus)}
        {...rest}
      />
    )
  }
}
