import { QrCode } from '@/domains'
import { WarningAlert } from '@/ui/fragments/box'
import { LabeledBox } from '@/ui/fragments/form'
import { Slider, Stack, TextField } from '@mui/material'
import { FC, useEffect, useState } from 'react'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
}

export const Size: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale
  const [savedMaxSize, setSavedMaxSize] = useState<number | null>(null)

  // 最大値を1000に固定（画面サイズに関係なく）
  const MAX_SIZE = 1000

  // 実際に使用する最大値（保存された値 or デフォルト値1000）
  const currentMaxSize = savedMaxSize ?? MAX_SIZE

  const [previousMaxSize, setPreviousMaxSize] = useState(currentMaxSize)

  // currentMaxSizeが変更されたら更新
  useEffect(() => {
    setPreviousMaxSize(currentMaxSize)
  }, [currentMaxSize])

  const updateMaxSizeAndRatio = (numValue: number) => {
    if (!isNaN(numValue) && numValue > 0) {
      const oldMaxSize = previousMaxSize
      const currentSize = qr.settings.size.value

      // 割合を計算して新しいサイズを決定
      const ratio = currentSize / oldMaxSize
      const newSize = Math.round(numValue * ratio)

      // 最大値を更新
      setSavedMaxSize(numValue)
      setPreviousMaxSize(numValue)

      // サイズも割合に応じて更新
      if (newSize >= 1) {
        const newQr = qr.updateSettings((settings) =>
          settings.changeSize(newSize)
        )
        onChange(newQr)
      }
    }
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!isNaN(numValue) && numValue >= 1) {
      // maxSizeを超えた場合はmaxSizeも拡張
      if (numValue > currentMaxSize) {
        setSavedMaxSize(numValue)
        setPreviousMaxSize(numValue)
      }
      const newQr = qr.updateSettings((settings) =>
        settings.changeSize(numValue)
      )
      onChange(newQr)
    }
  }

  const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value)
    if (!isNaN(numValue) && numValue > 0) {
      updateMaxSizeAndRatio(numValue)
    }
  }

  return (
    <LabeledBox label={locale.word.qrSettings.size}>
      <Stack spacing={3}>
        <TextField
          label={locale.word.qrSettingsLabels.currentSize}
          type="number"
          size="small"
          value={qr.settings.size.value}
          onChange={handleSizeChange}
          inputProps={{ min: 1, max: currentMaxSize }}
          fullWidth
        />
        <Stack direction="row" spacing={3} alignItems="center">
          <Slider
            max={Math.max(currentMaxSize, qr.settings.size.value)}
            value={qr.settings.size.value}
            min={1}
            onChange={(event, value) => {
              const numValue = Number(value)
              console.log('Size slider changed:', numValue)

              // maxSizeを超えた場合はmaxSizeも拡張
              if (numValue > currentMaxSize) {
                setSavedMaxSize(numValue)
                setPreviousMaxSize(numValue)
              }

              const newQr = qr.updateSettings((settings) =>
                settings.changeSize(numValue)
              )
              console.log('New QR created:', newQr.settings.size.value)
              onChange(newQr)
            }}
            marks={[
              { value: 1, label: 1 },
              {
                value: Math.max(currentMaxSize, qr.settings.size.value),
                label: Math.max(currentMaxSize, qr.settings.size.value)
              }
            ]}
            valueLabelDisplay="auto"
            sx={{ flex: 1 }}
          />
          <TextField
            label={locale.word.qrSettingsLabels.max}
            type="number"
            size="small"
            value={currentMaxSize}
            onChange={handleMaxSizeChange}
            inputProps={{ min: 1 }}
            sx={{ width: 100 }}
          />
        </Stack>
        {currentMaxSize > MAX_SIZE && (
          <WarningAlert
            language={qr.language}
            title={locale.word.warnings.sizeDisplay}
            messages={[locale.word.warningMessages.actualSizeMayBeLarger]}
          />
        )}
        {qr.settings.size.value < 75 && (
          <WarningAlert
            language={qr.language}
            title={locale.word.warnings.qrCodeSize}
            messages={[locale.word.warningMessages.sizeLessThan75MayFail]}
            recommendedText={
              locale.word.warningMessages.recommendedSize75OrHigher
            }
          />
        )}
      </Stack>
    </LabeledBox>
  )
}
