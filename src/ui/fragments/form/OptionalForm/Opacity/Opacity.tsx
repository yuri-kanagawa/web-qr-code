import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { Step01Slider } from '@/ui/fragments/slider'
import { Box, FormLabel, Stack, TextField } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  file: File | null
  language: Language
}

export const Opacity: FC<Props> = ({ file, language }) => {
  const isRelationFileDisabled = file == null
  const { settings, updateLogoOpacity } = useQrCode()
  const locale = language.getLocale()

  const [opacityInput, setOpacityInput] = useState(
    (settings.logo.opacity ?? 1).toString()
  )
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // opacityが変更されたら入力欄も更新
  useEffect(() => {
    setOpacityInput((settings.logo.opacity ?? 1).toString())
  }, [settings.logo.opacity])

  const handleOpacityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setOpacityInput(value)

    // デバウンスタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 500ms後に更新処理を実行
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      debounceTimerRef.current = setTimeout(() => {
        updateLogoOpacity(numValue)
      }, 500)
    }
  }

  const handleOpacityBlur = () => {
    // デバウンスタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const numValue = Number(opacityInput)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      updateLogoOpacity(numValue)
    } else {
      // 無効な値の場合は元に戻す
      setOpacityInput((settings.logo.opacity ?? 1).toString())
    }
  }

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
        position: 'relative',
        px: 2,
        pt: 3,
        pb: 4,
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)'
        }
      }}
    >
      <FormLabel
        sx={{
          position: 'absolute',
          top: -10,
          left: 10,
          px: 0.5,
          bgcolor: 'background.paper',
          fontSize: '0.75rem'
        }}
      >
        {locale.word.qrSettings.opacity}
      </FormLabel>
      <Stack spacing={3}>
        <TextField
          label={language.isEnglish ? 'Current Opacity' : '現在の透明度'}
          type="number"
          size="small"
          value={opacityInput}
          onChange={handleOpacityInputChange}
          onBlur={handleOpacityBlur}
          disabled={isRelationFileDisabled}
          inputProps={{ min: 0, max: 1, step: 0.1 }}
          fullWidth
        />
        <Step01Slider
          min={0}
          max={1}
          disabled={isRelationFileDisabled}
          value={settings.logo.opacity ?? 1}
          onChange={updateLogoOpacity}
          marks={[
            { value: 0, label: 0 },
            { value: 1, label: 1 }
          ]}
          valueLabelDisplay={'auto'}
        />
      </Stack>
    </Box>
  )
}
