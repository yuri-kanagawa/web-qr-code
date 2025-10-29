'use client'

import { DeviceOsService } from '@/domains/services/deviceOs'
import { Device } from '@/domains/valueObjects/device'
import { Language } from '@/domains/valueObjects/language'
import { Os } from '@/domains/valueObjects/os'
import { useNavigation } from '@/hooks'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@/ui/cores'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

type ErrorType = 'noDestination' | 'invalidUrl' | null

type Props = {
  language: Language
}

export const DeviceRedirectPage = ({ language }: Props) => {
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const { navigateToRoot } = useNavigation(language)
  const locale = language.locale

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const deviceOsParam = searchParams.get('deviceOs') || ''
    const urlsParam = searchParams.get('urls') || ''

    // クエリが不足している場合
    if (!deviceOsParam || !urlsParam) {
      setErrorType('noDestination')
      return
    }

    // deviceOs: カンマ区切りの数値配列
    const rawIds = deviceOsParam
      .split(',')
      .map((s) => Number(s))
      .filter((n) => Number.isFinite(n))

    // 後方互換: 旧ID(1..24)は×10して新IDに正規化。0はそのまま
    const normalizeId = (id: number) => {
      if (id === 0) return 0
      // 旧世代(1..24) → ×10、既に10刻みはそのまま
      if (id > 0 && id <= 24) return id * 10
      return id
    }
    const deviceOsIds = rawIds.map(normalizeId)

    // urls: カンマ区切り、URLエンコード済み
    const urls = urlsParam.split(',').map((s) => {
      try {
        return decodeURIComponent(s)
      } catch {
        return ''
      }
    })

    // 配列長の整合性チェック
    if (deviceOsIds.length === 0 || deviceOsIds.length !== urls.length) {
      setErrorType('noDestination')
      return
    }

    const isValidUrl = (u: string) => {
      try {
        // Allow http(s) only
        const parsed = new URL(u)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      } catch {
        return false
      }
    }

    // 現在の環境のDevice/OSを検出
    const currentDevice = Device.detect()
    const currentOs = Os.detect()

    // 最初にマッチしたURLへ遷移
    for (let i = 0; i < deviceOsIds.length; i++) {
      const id = deviceOsIds[i]
      const url = urls[i]
      if (!url) continue

      // idが現在環境にマッチするか
      if (DeviceOsService.isMatch(id, currentDevice, currentOs)) {
        if (!isValidUrl(url)) {
          setErrorType('invalidUrl')
          return
        }
        window.location.replace(url)
        return
      }
    }

    // マッチ無し
    setErrorType('noDestination')
  }, [])

  const handleClose = () => {
    setErrorType(null)
    // トップページに遷移
    navigateToRoot()
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
