import { EcLevel, Language } from '@/domains'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: EcLevel
  onChange: (ecLevel: EcLevel) => void
  language: Language
  label: string
}

export const EcLevelSelect: FC<Props> = ({
  value,
  onChange,
  language,
  label
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="ec-level-select-label">{label}</InputLabel>
      <Select
        labelId="ec-level-select-label"
        id="ec-level-select"
        value={value.value}
        label={label}
        onChange={(e) => {
          const result = EcLevel.create(e.target.value as string, language)
          if (result.isSuccess && result.ecLevel) {
            onChange(result.ecLevel)
          }
        }}
      >
        {EcLevel.list.map((level) => {
          const ecLevel = EcLevel[level](language)
          return (
            <MenuItem key={level} value={level}>
              {ecLevel.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
