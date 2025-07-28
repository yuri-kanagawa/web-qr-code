import { TextField, TextFieldProps } from '@/ui/cores/TextField'
import { FC, useState, useEffect } from 'react'

type Props = {
  value: number | undefined
  onChange: (value: number) => void
  isInteger?: boolean // 整数のみかどうか
  decimalPlaces?: number // 小数点以下の桁数
  min?: number
  max?: number
} & Omit<TextFieldProps, 'value' | 'onChange'>

export const NumberTextField: FC<Props> = ({
  value,
  onChange,
  isInteger = false,
  decimalPlaces,
  min,
  max,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState(value?.toString() || '')

  // valueが変更されたときにdisplayValueを更新
  useEffect(() => {
    setDisplayValue(value?.toString() || '')
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // 空文字の場合は0を設定
    if (inputValue === '') {
      setDisplayValue('')
      onChange(0)
      return
    }

    // 数値以外の文字を除去（小数点は保持）
    let cleanValue = inputValue.replace(/[^\d.-]/g, '')

    // 整数のみの場合、小数点を除去
    if (isInteger) {
      cleanValue = cleanValue.replace(/\./g, '')
    }

    // 先頭の0を除去（小数点の前の0は保持）
    if (cleanValue.includes('.')) {
      const [integerPart, decimalPart] = cleanValue.split('.')
      const normalizedInteger = integerPart.replace(/^0+/, '') || '0'
      cleanValue = `${normalizedInteger}.${decimalPart}`
    } else {
      cleanValue = cleanValue.replace(/^0+/, '') || '0'
    }

    // 小数点以下の桁数を制限
    if (decimalPlaces !== undefined && !isInteger) {
      if (cleanValue.includes('.')) {
        const [integerPart, decimalPart] = cleanValue.split('.')
        if (decimalPart.length > decimalPlaces) {
          cleanValue = `${integerPart}.${decimalPart.slice(0, decimalPlaces)}`
        }
      }
    }

    // 正規化された値を表示
    setDisplayValue(cleanValue)

    // 数値に変換
    const numValue = parseFloat(cleanValue)

    // 有効な数値でない場合は処理しない
    if (isNaN(numValue)) {
      return
    }

    // 範囲チェック
    if (min !== undefined && numValue < min) {
      return
    }
    if (max !== undefined && numValue > max) {
      return
    }

    onChange(numValue)
  }

  return (
    <TextField
      value={displayValue}
      onChange={handleChange}
      type="text" // numberにするとブラウザの制御が入るためtextにする
      inputProps={{
        inputMode: 'decimal',
        pattern: isInteger ? '[0-9]*' : '[0-9]*[.]?[0-9]*'
      }}
      {...rest}
    />
  )
}
