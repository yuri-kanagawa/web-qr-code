'use client'

import { QrCode } from '@/domains'
import { Box, Button } from '@/ui/cores'
import { GeneratedQrCode } from '@/features/qr-code'
import { CircularProgress } from '@mui/material'
import { FC, useCallback, useRef, useState } from 'react'

type Props = {
  onClick?: () => void
  isValid?: boolean
  language?: Language
  qr?: QrCode
  isLoading?: boolean
}

export const DownloadButton: FC<Props> = ({
  onClick,
  isValid = true,
  language = Language.default(),
  qr,
  isLoading = false
}) => {
  const [internalLoading, setInternalLoading] = useState(false)
  const loading = isLoading || internalLoading
  const locale = qr.qr.language.locale
  const qrRef = useRef<HTMLDivElement>(null)

  const generateFileName = (): string => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    return `qr-code-${timestamp}.png`
  }

  const handleInternalDownload = useCallback(async () => {
    if (!qr) {
      console.log('QRオブジェクトが存在しません')
      return
    }
    setInternalLoading(true)
    try {
      console.log('=== ダウンロード処理開始 ===')
      console.log('qrRef.current:', qrRef.current)
      console.log('qrRef.currentのHTML:', qrRef.current?.innerHTML)

      // レンダリング完了を待つ
      await new Promise((resolve) => setTimeout(resolve, 100))

      const canvas = qrRef.current?.querySelector('canvas') as
        | HTMLCanvasElement
        | undefined
      console.log('見つかったcanvas:', canvas)

      if (!canvas) {
        console.error('キャンバスが見つかりませんでした')
        console.log('利用可能な要素:', qrRef.current?.querySelectorAll('*'))
        return
      }

      console.log('キャンバスサイズ:', canvas.width, 'x', canvas.height)
      const dataUrl = canvas.toDataURL('image/png')
      console.log('DataURL生成完了:', dataUrl.substring(0, 50) + '...')

      const link = document.createElement('a')
      link.download = generateFileName()
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log('ダウンロード完了')
    } catch (e) {
      console.error('ダウンロード処理でエラーが発生しました', e)
    } finally {
      setInternalLoading(false)
    }
  }, [qr])

  const onPress = useCallback(() => {
    if (loading || !isValid) return
    // 外部 onClick があればそれを優先し、なければ内部処理
    if (onClick) {
      onClick()
      return
    }
    void handleInternalDownload()
  }, [loading, isValid, onClick, handleInternalDownload])

  return (
    <>
      {/* 非表示のQRコンポーネント（ダウンロード用に内部生成） */}
      <Box
        sx={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {qr && (
          <GeneratedQrCode
            ref={qrRef}
            qr={qr}
            isValid={isValid && qr.isValid()}
          />
        )}
      </Box>
      <Button
        variant="contained"
        onClick={onPress}
        disabled={!isValid || loading}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
            {qr.language.isEnglish ? 'Downloading...' : 'ダウンロード中...'}
          </>
        ) : (
          locale.word.buttons.download
        )}
      </Button>
    </>
  )
}



