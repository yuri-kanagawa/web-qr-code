import { Button } from '@mui/material'
import React, { MutableRefObject, RefObject, useCallback } from 'react'
type Props = {}

const QrDownloadButton = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const onClick = useCallback(() => {
      console.log('Received ref:', ref)

      // refがnullでないことを確認
      if (!ref || !(ref as MutableRefObject<HTMLDivElement | null>).current) {
        console.log('ref is null or undefined')
        return
      }

      const currentRef = ref as MutableRefObject<HTMLDivElement | null>
      const children = currentRef.current?.children // currentRefを使用

      // childrenが存在し、長さが0でないことを確認
      if (!children || children.length === 0) {
        console.log('No children found')
        return
      }

      // children[0]がHTMLCanvasElementかどうか確認
      const canvas = children[0] as HTMLCanvasElement | null

      // canvasがHTMLCanvasElementのインスタンスか確認
      if (canvas instanceof HTMLCanvasElement) {
        const pngDataUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.href = pngDataUrl
        downloadLink.download = 'qr.png'
        downloadLink.click()
      } else {
        console.log('No canvas found')
      }
    }, [ref])

    return (
      <Button variant="contained" onClick={onClick}>
        Download
      </Button>
    )
  }
)

QrDownloadButton.displayName = 'QrDownloadButton'

export default QrDownloadButton
