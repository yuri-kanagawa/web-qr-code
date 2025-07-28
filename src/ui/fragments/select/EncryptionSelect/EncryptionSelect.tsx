import { encryption, isEncryptionNonpass } from '@/constants/encryption'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps
} from '@/ui/cores'
import { FC } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
} & Omit<SelectProps, 'onChange' | 'value'>

export const EncryptionSelect: FC<Props> = ({ value, onChange, ...rest }) => {
  const encryptionOptions = Object.entries(encryption).map(([key, label]) => {
    const newLabel = isEncryptionNonpass(key) ? '' : label
    return {
      value: key,
      label: newLabel
    }
  })

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
