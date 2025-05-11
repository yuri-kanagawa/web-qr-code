import { FC, useMemo } from 'react'
import { PhoneProps } from '@/ui/cores/textField/PhoneTextField/Device'
import MuiPhoneNumber from 'mui-phone-number'
import { Stack, Typography } from '@mui/material'
import { getCountryCode } from '@/utils/detect'

export const PhoneTextField: FC<PhoneProps> = ({
  cellPhone,
  homePhone,
  fax,
  workPhone
}) => {
  const value = useMemo(() => {
    if (cellPhone) {
      return cellPhone.value
    }
    if (homePhone) {
      return homePhone.value
    }
    if (fax) {
      return fax.value
    }
    if (workPhone) {
      return workPhone.value
    }
    return ''
  }, [cellPhone, homePhone, fax, workPhone])

  const onChange = (value: string) => {
    console.log(value)
    if (cellPhone) {
      return cellPhone.onChange(value ?? '')
    }
    if (homePhone) {
      return homePhone.onChange(value ?? '')
    }
    if (fax) {
      return fax.onChange(value ?? '')
    }
    if (workPhone) {
      return workPhone.onChange(value ?? '')
    }
  }
  const error = useMemo(() => {
    if (cellPhone) {
      return cellPhone.error
    }
    if (homePhone) {
      return homePhone.error
    }
    if (fax) {
      return fax.error
    }
    if (workPhone) {
      return workPhone.error
    }
  }, [cellPhone, homePhone, fax, workPhone])
  const message = useMemo(() => {
    if (cellPhone) {
      return cellPhone.message
    }
    if (homePhone) {
      return homePhone.message
    }
    if (fax) {
      return fax.message
    }
    if (workPhone) {
      return workPhone.message
    }
  }, [cellPhone, homePhone, fax, workPhone])
  console.log('fsfs', getCountryCode())
  return (
    <Stack>
      <MuiPhoneNumber
        label={'*phone'}
        defaultCountry={getCountryCode()}
        value={value}
        onChange={(e) => onChange(typeof e === 'string' ? e : e.target.value)}
        variant="outlined"
        error={error}
        helperText={message}
      />
    </Stack>
  )
}
