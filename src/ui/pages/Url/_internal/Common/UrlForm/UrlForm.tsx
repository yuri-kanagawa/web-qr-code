import { Box, Stack, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { OptionalForm } from '@/ui/fragments/form'
import React, { FC, useEffect } from 'react'
import { RegisterQrCodeUrlSchema } from '../../../_hooks'
import { useWindowSize } from '@/hooks'

type Props = {
  control: Control<RegisterQrCodeUrlSchema>
  file: File | null
  setFile: (value: File | null) => void
}

export const UrlForm: FC<Props> = ({ control, setFile, file }) => {
  const { height, width } = useWindowSize()

  return (
    <Controller
      control={control}
      name="url"
      render={({ field: { value, onChange, ref }, fieldState }) => (
        <TextField
          label="URL*"
          inputRef={ref}
          placeholder="https://"
          value={value}
          onChange={(e) => {
            onChange(e.currentTarget.value)
          }}
          error={!!fieldState.error} // エラー状態
          helperText={fieldState.error?.message} // エラーメッセージ
        />
      )}
    />
  )
}
