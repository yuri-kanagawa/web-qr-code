import { Language } from '@/domains/valueObjects/language'
import { WiFiType } from '@/domains/valueObjects/wifiType'
import { FormControl, InputLabel, MenuItem, Select } from '@/ui/cores'
import { FC, useMemo } from 'react'

type Props = {
  value: WiFiType
  onChange: (wifiType: WiFiType) => void
  language?: Language
  label: string
}

export const EncryptionSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  label
}) => {
  const encryptionOptions = useMemo(() => {
    const types = [
      { key: WiFiType.ENCRYPTION_TYPES.WPA, factory: WiFiType.wpa },
      { key: WiFiType.ENCRYPTION_TYPES.WEP, factory: WiFiType.wep },
      { key: WiFiType.ENCRYPTION_TYPES.NOPASS, factory: WiFiType.nopass }
    ]

    return types.map(({ key, factory }) => {
      const wifiType = factory(language)
      return {
        value: key,
        label: wifiType.label
      }
    })
  }, [language])

  return (
    <FormControl fullWidth>
      <InputLabel id="encryption-select-label">{label}</InputLabel>
      <Select
        labelId="encryption-select-label"
        id="encryption-select"
        value={value.value}
        label={label}
        onChange={(e) => {
          const wifiTypeResult = WiFiType.create(
            e.target.value as string,
            language
          )
          if (wifiTypeResult.isSuccess && wifiTypeResult.wifiType) {
            onChange(wifiTypeResult.wifiType)
          }
        }}
      >
        {encryptionOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
