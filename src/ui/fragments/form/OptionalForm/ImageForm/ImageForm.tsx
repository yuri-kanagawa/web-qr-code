import { InputFile } from '@/ui/fragments/input/InputFile/InputFile'
import { FC } from 'react'

import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { HeightSlider, WidthSlider } from '@/ui/fragments/slider'
import { Box, Stack, TextField } from '@mui/material'
import { memo } from 'react'
type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
  max?: number
  language?: Language
}

export const ImageForm: FC<Props> = memo(
  ({ qr, onChange, max, language = Language.default() }) => {
    const file = qr.settings.logoFile
    const isRelationFileDisabled = file == null

    console.log('ImageForm render:', { file, isRelationFileDisabled })

    const updateLogoWidth = (width: number) => {
      const newQr = qr.updateSettings((settings) =>
        settings.changeLogo(
          width,
          settings.logo.height || 0,
          settings.logo.opacity || 1,
          settings.logo.paddingStyle
        )
      )
      onChange(newQr)
    }

    const updateLogoHeight = (height: number) => {
      const newQr = qr.updateSettings((settings) =>
        settings.changeLogo(
          settings.logo.width || 0,
          height,
          settings.logo.opacity || 1,
          settings.logo.paddingStyle
        )
      )
      onChange(newQr)
    }

    const handleFileChange = (newFile: File | null) => {
      try {
        console.log('handleFileChange called with:', newFile)
        console.log(
          'Step 1: Current qr.settings.logoFile:',
          qr.settings.logoFile
        )
        console.log('Step 2: handleFileChange function:', handleFileChange)
        console.log('Step 2.5: newFile value:', newFile)
        console.log('Step 2.6: !newFile condition:', !newFile)
        console.log('Step 2.7: newFile === null:', newFile === null)

        // ファイルが削除された場合、ロゴ設定をクリア
        if (!newFile) {
          console.log('Step 3: File deletion: clearing logo settings')
          const newQr = qr.updateSettings((settings) => {
            // ロゴファイルをnullに設定し、ロゴサイズも0にクリア
            console.log('Step 4: Inside updateSettings callback')
            console.log(
              'Step 4.1: settings.logoFile before changeLogoFile:',
              settings.logoFile
            )
            const clearedSettings = settings.changeLogoFile(null)
            console.log(
              'Step 5: After changeLogoFile, clearedSettings.logoFile:',
              clearedSettings.logoFile
            )
            const result = clearedSettings.changeLogo(
              0,
              0,
              1,
              clearedSettings.logo.paddingStyle
            )
            console.log(
              'Step 5.1: After changeLogo, result.logoFile:',
              result.logoFile
            )
            return result
          })
          console.log('Step 6: New QR after deletion:', newQr.settings.logoFile)
          console.log('Step 7: Calling onChange with newQr')
          console.log(
            'Step 7.5: newQr.settings.logoFile before onChange:',
            newQr.settings.logoFile
          )
          onChange(newQr)
          console.log('Step 8: onChange called')
          console.log(
            'Step 8.5: After onChange, current qr.settings.logoFile:',
            qr.settings.logoFile
          )
        } else {
          // ファイルが設定された場合、ロゴファイルを更新し、デフォルトサイズを設定
          const newQr = qr.updateSettings((settings) => {
            // まずロゴファイルを設定
            let updatedSettings = settings.changeLogoFile(newFile)
            // ロゴサイズが0の場合はデフォルトサイズを設定
            if (
              !updatedSettings.logo.width ||
              updatedSettings.logo.width === 0
            ) {
              updatedSettings = updatedSettings.changeLogo(
                100,
                100,
                1,
                updatedSettings.logo.paddingStyle
              )
            }
            return updatedSettings
          })
          onChange(newQr)
        }
      } catch (error) {
        console.error('Error in handleFileChange:', error)
      }
    }

    return (
      <Stack spacing={2}>
        <Stack direction={'row'}>
          <HeightSlider
            value={qr.settings.logo.height ?? 100}
            onChange={updateLogoHeight}
            disabled={isRelationFileDisabled}
            max={max}
          >
            <InputFile
              file={file}
              onChange={handleFileChange}
              width={200}
              height={200}
              language={language}
            />
          </HeightSlider>
        </Stack>
        <Box sx={{ pl: 2 }}>
          <WidthSlider
            value={qr.settings.logo.width ?? 100}
            onChange={updateLogoWidth}
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
            value={qr.settings.logo.width || ''}
            onChange={(e) => {
              const value = e.target.value
              if (
                value === '' ||
                (!isNaN(Number(value)) &&
                  Number(value) >= 1 &&
                  Number(value) <= (max || 1000))
              ) {
                updateLogoWidth(value === '' ? 0 : Number(value))
              }
            }}
            onBlur={(e) => {
              const value = e.target.value
              if (value === '' || Number(value) < 1) {
                updateLogoWidth(1)
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
            value={qr.settings.logo.height || ''}
            onChange={(e) => {
              const value = e.target.value
              if (
                value === '' ||
                (!isNaN(Number(value)) &&
                  Number(value) >= 1 &&
                  Number(value) <= (max || 1000))
              ) {
                updateLogoHeight(value === '' ? 0 : Number(value))
              }
            }}
            onBlur={(e) => {
              const value = e.target.value
              if (value === '' || Number(value) < 1) {
                updateLogoHeight(1)
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
