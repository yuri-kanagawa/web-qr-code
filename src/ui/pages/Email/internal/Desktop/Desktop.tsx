import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import { RegisterQrCodeEmailSchema } from '@/ui/pages/Email/hooks'
import { EmailTextField } from '@/ui/cores/textField'

type Props = {
  control: Control<RegisterQrCodeEmailSchema>
}

export const Desktop: FC<Props> = ({ control }) => {
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({
          field: { value, onChange, ref },
          fieldState: { error }
        }) => (
          <Stack>
            <EmailTextField value={value} onChange={onChange} inputRef={ref} />
            {error && (
              <Typography sx={{ color: 'red' }}>{error.message}</Typography>
            )}
          </Stack>
        )}
      />
    </>
  )
}
