import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import { FC } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { HeightSlider, WidthSlider } from '@/ui/fragments/slider'
import { Box, Stack, TextField } from '@mui/material'
import { memo } from 'react'
type Props = {
  file: File | null
  setFile: (value: File | null) => void
  logWidth: number | undefined
  logHeight: number | undefined
  setLogoWidth: (value: number) => void
  setLogoHeight: (value: number) => void
  max?: number
  language?: Language
}

export const ImageForm: FC<Props> = memo(
  ({
    file,
    setFile,
    setLogoHeight,
    setLogoWidth,
    logHeight,
    logWidth,
    max,
    language = Language.default()
  }) => {
    const isRelationFileDisabled = file == null

    return (
      <Stack spacing={2}>
        <Stack direction={'row'}>
          <HeightSlider
            value={logHeight ?? 100}
            onChange={setLogoHeight}
            disabled={isRelationFileDisabled}
            max={max}
          >
            <InputFile
              file={file}
              onChange={async (value) => {
                setFile(value)
              }}
              width={200}
              height={200}
              language={language}
            />
          </HeightSlider>
        </Stack>
        <Box sx={{ pl: 2 }}>
          <WidthSlider
            value={logWidth ?? 100}
            onChange={setLogoWidth}
            disabled={isRelationFileDisabled}
            max={max}
          />
        </Box>

        {/* 数値入力欄 */}
        <Stack direction="row" spacing={2}>
          <TextField
            label={language.isEnglish ? 'Width' : '幅'}
            type="number"
            size="small"
            value={logWidth || ''}
            onChange={(e) => {
              const value = e.target.value
              if (
                value === '' ||
                (!isNaN(Number(value)) &&
                  Number(value) >= 1 &&
                  Number(value) <= (max || 1000))
              ) {
                setLogoWidth(value === '' ? 0 : Number(value))
              }
            }}
            onBlur={(e) => {
              const value = e.target.value
              if (value === '' || Number(value) < 1) {
                setLogoWidth(1)
              }
            }}
            disabled={isRelationFileDisabled}
            inputProps={{ min: 1, max: max || 1000 }}
            sx={{ flex: 1 }}
          />
          <TextField
            label={language.isEnglish ? 'Height' : '高さ'}
            type="number"
            size="small"
            value={logHeight || ''}
            onChange={(e) => {
              const value = e.target.value
              if (
                value === '' ||
                (!isNaN(Number(value)) &&
                  Number(value) >= 1 &&
                  Number(value) <= (max || 1000))
              ) {
                setLogoHeight(value === '' ? 0 : Number(value))
              }
            }}
            onBlur={(e) => {
              const value = e.target.value
              if (value === '' || Number(value) < 1) {
                setLogoHeight(1)
              }
            }}
            disabled={isRelationFileDisabled}
            inputProps={{ min: 1, max: max || 1000 }}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Stack>
    )
  }
)

ImageForm.displayName = 'ImageForm'
