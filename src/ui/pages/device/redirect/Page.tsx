'use client'

import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { Url } from '@/domains/valueObjects/url'
import { useQrCode } from '@/hooks'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@/ui/cores'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type ErrorType = 'noDestination' | 'invalidUrl' | null

type Props = {
  language: Language
}

export const Page = ({ language }: Props) => {
  const { deviceOs: deviceOsList, urls } = useQrCode()
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const router = useRouter()
  const locale = language.getLocale()

  // マッチするインデックスを探す（Device=All対応）
  const matchedIndex = useMemo(() => {
    const currentDevice = Device.detect()
    const currentOs = Os.detect()
    return DeviceOsService.findMatchingIndex(
      deviceOsList,
      currentDevice,
      currentOs
    )
  }, [deviceOsList])

  useEffect(() => {
    console.log('deviceOsList:', deviceOsList, 'matchedIndex:', matchedIndex)

    // マッチするインデックスがない、または、urlsが空、またはurlがnullの場合
    if (
      matchedIndex === -1 ||
      urls.length === 0 ||
      urls[matchedIndex] == null
    ) {
      setErrorType('noDestination')
      return
    }

    let urlString = urls[matchedIndex]

    // URLが相対URLの場合、http:// を補完
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = 'http://' + urlString // http:// を追加して外部リンクとして解釈
    }

    // URL valueObjectでバリデーション
    const urlResult = Url.create(urlString, language)
    if (urlResult.isFailure) {
      console.error('Invalid URL:', urlString)
      setErrorType('invalidUrl')
      return
    }

    console.log('Redirecting to:', urlString)
    window.location.href = urlString
  }, [urls, matchedIndex, language])

  const handleClose = () => {
    setErrorType(null)
    // トップページに遷移
    const topPath = language.isEnglish ? '/' : `/${language.value}`
    router.push(topPath)
  }

  const errorMessage =
    errorType === 'invalidUrl'
      ? locale.message.common.error.invalidUrlFormat
      : locale.message.common.error.noDeviceDestination

  return (
    <>
      <Dialog open={errorType !== null} onClose={handleClose}>
        <DialogTitle>{locale.message.common.error.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
