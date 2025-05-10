import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { Box, Stack } from '@mui/material'
import { HeightSlider, WidthSlider } from '@/ui/cores/slider'
import { height } from '@mui/system'
import { memo, useCallback } from 'react'
type Props = {
  file: File | null
  setFile: (value: File | null) => void
  logWidth: number
  logHeight: number
  setLogoWidth: (value: number) => void
  setLogoHeight: (value: number) => void
  max?: number
}

export const ImageForm: FC<Props> = memo(
  ({
    file,
    setFile,
    setLogoHeight,
    setLogoWidth,
    logHeight,
    logWidth,
    max
  }) => {
    const isRelationFileDisabled = file == null

    return (
      <Stack spacing={2}>
        <Stack direction={'row'}>
          <HeightSlider
            value={logHeight}
            onChange={setLogoHeight}
            disabled={isRelationFileDisabled}
            max={max}
          >
            <UploadFile
              file={file}
              onChange={async (value) => {
                setFile(value)
              }}
              width={100}
              height={100}
            />
          </HeightSlider>
        </Stack>
        <Box sx={{ pl: 2 }}>
          <WidthSlider
            value={logWidth}
            onChange={setLogoWidth}
            disabled={isRelationFileDisabled}
            max={max}
          />
        </Box>
      </Stack>
    )
  }
)
