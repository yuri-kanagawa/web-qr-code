import { Language, WiFiSsid } from '@/domains'
import { TextField, TextFieldProps } from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: WiFiSsid
  onChange: (ssid: WiFiSsid) => void
  language: Language
} & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>

export const SSIDTextField: FC<Props> = ({
  value,
  onChange,
  language,
  children,
  ...rest
}) => {
  const handleChange = (inputValue: string) => {
    const result = WiFiSsid.create(inputValue, language)
    if (result.isSuccess && result.wifiSsid) {
      onChange(result.wifiSsid)
    }
  }

  return (
    <TextField
      {...rest}
      value={value.value}
      onChange={(e) => handleChange(e.currentTarget.value)}
      label="SSID"
    >
      {children}
    </TextField>
  )
}
