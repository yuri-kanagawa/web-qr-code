import { UploadFile } from '@/ui/cores/uploadFile/UploadFile'
import { convertBase64ToFile, convertImageToBase64 } from '@/utils/file'
import React, { FC } from 'react'
import { useQrcode } from '@/hooks'
import { Stack } from '@mui/material'
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
}

export const ImageForm: FC<Props> = memo(
  ({ file, setFile, setLogoHeight, setLogoWidth, logHeight, logWidth }) => {
    const isRelationFileDisabled = file == null
    return (
      <Stack spacing={8}>
        <Stack direction={'row'}>
          <HeightSlider
            value={logHeight}
            onChange={setLogoHeight}
            disabled={isRelationFileDisabled}
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
        <WidthSlider
          value={logWidth}
          onChange={setLogoWidth}
          disabled={isRelationFileDisabled}
        />
      </Stack>
    )
  }
)
