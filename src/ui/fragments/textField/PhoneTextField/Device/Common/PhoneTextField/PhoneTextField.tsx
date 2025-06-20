import { FC, useMemo } from 'react'
import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device'

import { getCountryCode } from '@/utils/detect'
import { Stack } from '@/ui/cores/Stack'
import { PhoneNumber } from '@/ui/cores/PhoneNumber/PhoneNumber'

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
  const helperText = useMemo(() => {
    if (cellPhone) {
      return cellPhone.helperText
    }
    if (homePhone) {
      return homePhone.helperText
    }
    if (fax) {
      return fax.helperText
    }
    if (workPhone) {
      return workPhone.helperText
    }
  }, [cellPhone, homePhone, fax, workPhone])

  const inputRef = useMemo(() => {
    if (cellPhone) {
      return cellPhone.inputRef
    }
    if (homePhone) {
      return homePhone.inputRef
    }
    if (fax) {
      return fax.inputRef
    }
    if (workPhone) {
      return workPhone.inputRef
    }
    return null
  }, [cellPhone, homePhone, fax, workPhone])

  return (
    <Stack>
      <PhoneNumber
        label={'*phone'}
        defaultCountry={getCountryCode()}
        value={value}
        onChange={(e) => onChange(typeof e === 'string' ? e : e.target.value)}
        variant="outlined"
        error={error}
        helperText={helperText}
        ref={inputRef}
      />
    </Stack>
  )
}
