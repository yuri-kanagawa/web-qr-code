import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { RegisterQrCodeEmailSchema } from '@/ui/pages/Email/hooks'
import { EmailTextField } from '@/ui/cores/textField'

type Props = {
  control: Control<RegisterQrCodeEmailSchema>
}
export const Mobile: FC<Props> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, ref }, fieldState }) => (
          <EmailTextField value={value} onChange={onChange} inputRef={ref} />
        )}
      />
    </>
  )
}
