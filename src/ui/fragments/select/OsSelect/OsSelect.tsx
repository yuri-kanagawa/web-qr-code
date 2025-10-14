import { FC, useMemo } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'

type Props = {
  value: number
  onChange: ({ id, name }: { id: number; name: string }) => void
  language?: Language
  isOptional?: boolean
  hiddenItems?: number[] // 非表示にする項目のID配列
}

export const OsSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  isOptional = false,
  hiddenItems = []
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

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">OS</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="OS"
        onChange={(e) => {
          const value = Number(e.target.value)
          const osResult = Os.create(value, language)
          const name = osResult.isSuccess && osResult.os ? osResult.os.name : ''
          onChange({
            id: value,
            name
          })
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
