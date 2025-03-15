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
    <Box
      sx={{
        height,
        boxSizing: 'border-box',
        overflowY: 'auto',

        width: {
          xs: width / 3 - 30, // スマホ～タブレット未満の幅
          lg: 400 // ラップトップ以上の幅
        }
      }}
    >
      <Stack spacing={3} py={3} px={2}>
        <Controller
          control={control}
          name="url"
          render={({ field: { value, onChange }, fieldState }) => (
            <TextField
              label="URL*"
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
        <OptionalForm file={file} setFile={setFile} />
      </Stack>
    </Box>
  )
}
