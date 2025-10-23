import { FC, useMemo } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FormHelperText } from '@mui/material'

type Props = {
  value: Os
  onChange: (os: Os) => void
  language?: Language
  isOptional?: boolean
  isRequired?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
  label?: string
  error?: boolean
  helperText?: string
}

export const OsSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional = false,
  isRequired = false,
  hiddenItems = [],
  label,
  error = false,
  helperText
}) => {
  const array = useMemo(() => {
    const filtered = isOptional
      ? [...Os.list]
      : Os.list.filter((e) => {
          const osObj = Os.create(e, language)
          return osObj.isSuccess && !osObj.os!.isNotSet
        })

    // 非表示項目を除外
    return hiddenItems.length > 0
      ? filtered.filter((e) => !hiddenItems.includes(e))
      : filtered
  }, [isOptional, hiddenItems, language])

  const locale = language.locale
  const baseLabel = label || locale.word.select.os
  const displayLabel = isRequired ? `*${baseLabel}` : baseLabel

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="os-select-label">{displayLabel}</InputLabel>
      <Select
        labelId="os-select-label"
        id="os-select"
        value={value.value}
        label={displayLabel}
        onChange={(e) => {
          const osId = Number(e.target.value)
          const osResult = Os.create(osId, language)
          if (osResult.isSuccess && osResult.os) {
            onChange(osResult.os)
          }
        }}
      >
        {array.map((osValue) => {
          const osResult = Os.create(osValue, language)
          const name = osResult.isSuccess && osResult.os ? osResult.os.name : ''
          return (
            <MenuItem key={osValue} value={Number(osValue)}>
              {name}
            </MenuItem>
          )
        })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
