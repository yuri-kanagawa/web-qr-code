import { Language, QrStyle } from '@/domains'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: QrStyle
  onChange: (qrStyle: QrStyle) => void
  language: Language
  label: string
}

export const QrStyleSelect: FC<Props> = ({
  value,
  onChange,
  language,
  label
}) => {
  const locale = language.locale

  return (
    <FormControl fullWidth>
      <InputLabel id="qr-style-select-label">{label}</InputLabel>
      <Select
        labelId="qr-style-select-label"
        id="qr-style-select"
        value={value.value || ''}
        label={label}
        onChange={(event) => {
          const result = QrStyle.create(event.target.value as string, language)
          if (result.isSuccess && result.qrStyle) {
            onChange(result.qrStyle)
          }
        }}
      >
        {QrStyle.list.map((style) => {
          const qrStyle = QrStyle[style](language)
          return (
            <MenuItem key={style} value={style}>
              {locale.word.options.qrStyle[style]}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
