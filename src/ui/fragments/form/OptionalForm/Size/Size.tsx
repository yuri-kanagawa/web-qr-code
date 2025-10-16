import { Language } from '@/domains/valueObjects/language'
import { useQrCode, useWindowSize } from '@/hooks'
import { Box, FormLabel, Slider, Stack, TextField } from '@mui/material'
import { FC, useEffect, useMemo, useState } from 'react'

type Props = {
  language: Language
}

export const Size: FC<Props> = ({ language }) => {
  const { height, width } = useWindowSize()
  const {
    settings,
    updateSize,
    maxSize: savedMaxSize,
    updateMaxSize
  } = useQrCode()
  const locale = language.getLocale()

  // 画面サイズから計算される推奨最大値
  const calculatedMaxSize = useMemo(() => {
    if (height < width) {
      return height - 150
    }
    return width - 500
  }, [height, width])

  // 実際に使用する最大値（保存された値 or デフォルト計算値）
  const currentMaxSize = savedMaxSize ?? calculatedMaxSize

  const [previousMaxSize, setPreviousMaxSize] = useState(currentMaxSize)

  // currentMaxSizeが変更されたら更新
  useEffect(() => {
    setPreviousMaxSize(currentMaxSize)
  }, [currentMaxSize])

  const updateMaxSizeAndRatio = (numValue: number) => {
    if (!isNaN(numValue) && numValue > 0) {
      const oldMaxSize = previousMaxSize
      const currentSize = settings.size.value

      // 割合を計算して新しいサイズを決定
      const ratio = currentSize / oldMaxSize
      const newSize = Math.round(numValue * ratio)

      // 最大値を更新
      updateMaxSize(numValue)
      setPreviousMaxSize(numValue)

      // サイズも割合に応じて更新
      if (newSize >= 1) {
        updateSize(newSize)
      }
    }
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!isNaN(numValue) && numValue >= 1) {
      // maxSizeを超えた場合はmaxSizeも拡張
      if (numValue > currentMaxSize) {
        updateMaxSize(numValue)
        setPreviousMaxSize(numValue)
      }
      updateSize(numValue)
    }
  }

  const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!isNaN(numValue) && numValue > 0) {
      updateMaxSizeAndRatio(numValue)
    }
  }

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
        {locale.word.qrSettings.size}
      </FormLabel>
      <Stack spacing={3}>
        <TextField
          label={language.isEnglish ? 'Current Size' : '現在のサイズ'}
          type="number"
          size="small"
          value={settings.size.value}
          onChange={handleSizeChange}
          inputProps={{ min: 1, max: currentMaxSize }}
          fullWidth
        />
        <Stack direction="row" spacing={3} alignItems="center">
          <Slider
            max={currentMaxSize}
            value={Math.min(settings.size.value, currentMaxSize)}
            min={1}
            onChange={(event, value) => updateSize(Number(value))}
            marks={[
              { value: 1, label: 1 },
              { value: currentMaxSize, label: currentMaxSize }
            ]}
            valueLabelDisplay="auto"
            sx={{ flex: 1 }}
          />
          <TextField
            label={language.isEnglish ? 'Max' : '最大値'}
            type="number"
            size="small"
            value={currentMaxSize}
            onChange={handleMaxSizeChange}
            inputProps={{ min: 1 }}
            sx={{ width: 100 }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
