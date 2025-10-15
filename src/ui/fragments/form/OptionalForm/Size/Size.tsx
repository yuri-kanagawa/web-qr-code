import { Language } from '@/domains/valueObjects/language'
import { useQrCode, useWindowSize } from '@/hooks'
import { Box, FormLabel, Slider, Stack, TextField } from '@mui/material'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

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

  const [maxSizeInput, setMaxSizeInput] = useState(currentMaxSize.toString())
  const [sizeInput, setSizeInput] = useState(settings.size.value.toString())
  const [previousMaxSize, setPreviousMaxSize] = useState(currentMaxSize)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sizeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // currentMaxSizeが変更されたら入力欄も更新
  useEffect(() => {
    setMaxSizeInput(currentMaxSize.toString())
    setPreviousMaxSize(currentMaxSize)
  }, [currentMaxSize])

  // サイズが変更されたら入力欄も更新
  useEffect(() => {
    setSizeInput(settings.size.value.toString())
  }, [settings.size.value])

  const updateMaxSizeAndRatio = (numValue: number) => {
    if (!isNaN(numValue) && numValue > 0) {
      const oldMaxSize = previousMaxSize
      const currentSize = settings.size.value

      // 割合を計算して新しいサイズを決定
      const ratio = currentSize / oldMaxSize
      const newSize = Math.round(numValue * ratio)

      console.log('Updating maxSize:', {
        oldMaxSize,
        newMaxSize: numValue,
        currentSize,
        ratio,
        newSize
      })

      // 最大値を更新
      updateMaxSize(numValue)
      setPreviousMaxSize(numValue)

      // サイズも割合に応じて更新
      if (newSize >= 1) {
        updateSize(newSize)
      }
    }
  }

  const handleMaxSizeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setMaxSizeInput(value)

    // デバウンスタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 500ms後に更新処理を実行
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue > 0) {
      debounceTimerRef.current = setTimeout(() => {
        updateMaxSizeAndRatio(numValue)
      }, 500)
    }
  }

  const handleMaxSizeBlur = () => {
    // デバウンスタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }

    const numValue = Number(maxSizeInput)
    if (!isNaN(numValue) && numValue > 0) {
      updateMaxSizeAndRatio(numValue)
    } else {
      // 無効な値の場合は元に戻す
      setMaxSizeInput(currentMaxSize.toString())
    }
  }

  const handleSizeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setSizeInput(value)

    // デバウンスタイマーをクリア
    if (sizeDebounceTimerRef.current) {
      clearTimeout(sizeDebounceTimerRef.current)
    }

    // 500ms後に更新処理を実行
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 1) {
      sizeDebounceTimerRef.current = setTimeout(() => {
        const clampedValue = Math.min(numValue, currentMaxSize)
        updateSize(clampedValue)
      }, 500)
    }
  }

  const handleSizeBlur = () => {
    // デバウンスタイマーをクリア
    if (sizeDebounceTimerRef.current) {
      clearTimeout(sizeDebounceTimerRef.current)
      sizeDebounceTimerRef.current = null
    }

    const numValue = Number(sizeInput)
    if (!isNaN(numValue) && numValue >= 1) {
      const clampedValue = Math.min(numValue, currentMaxSize)
      updateSize(clampedValue)
    } else {
      // 無効な値の場合は元に戻す
      setSizeInput(settings.size.value.toString())
    }
  }

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (sizeDebounceTimerRef.current) {
        clearTimeout(sizeDebounceTimerRef.current)
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
        {locale.word.qrSettings.size}
      </FormLabel>
      <Stack spacing={3}>
        <TextField
          label={language.isEnglish ? 'Current Size' : '現在のサイズ'}
          type="number"
          size="small"
          value={sizeInput}
          onChange={handleSizeInputChange}
          onBlur={handleSizeBlur}
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
            value={maxSizeInput}
            onChange={handleMaxSizeInputChange}
            onBlur={handleMaxSizeBlur}
            inputProps={{ min: 1 }}
            sx={{ width: 100 }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
