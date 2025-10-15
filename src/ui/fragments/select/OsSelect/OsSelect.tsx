import { FC, useMemo } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'

type Props = {
  value: Os
  onChange: (os: Os) => void
  language?: Language
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
  label?: string
}

export const OsSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional = false,
  hiddenItems = [],
  label
}) => {
  const array = useMemo(() => {
    const filtered = isOptional
      ? [...Os.list]
      : Os.list.filter((e) => !Os.isNotSet(e))

    // 非表示項目を除外
    return hiddenItems.length > 0
      ? filtered.filter((e) => !hiddenItems.includes(e))
      : filtered
  }, [isOptional, hiddenItems])

  const locale = language.getLocale()
  const displayLabel = label || locale.word.select.os

  return (
    <FormControl fullWidth>
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
    </FormControl>
  )
}
