import { WiFiType } from '@/domains/valueObjects/wifiType'
import { Language } from '@/domains/valueObjects/language'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps
} from '@/ui/cores'
import { FC, useMemo } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  language?: Language
} & Omit<SelectProps, 'onChange' | 'value'>

export const EncryptionSelect: FC<Props> = ({
  value,
  onChange,
  language = Language.default(),
  ...rest
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
      <InputLabel>Encryption Type</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        label="Encryption Type"
        {...rest}
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
