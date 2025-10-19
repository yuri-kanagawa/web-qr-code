'use client'

import { Language } from '@/domains/valueObjects/language'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@/ui/cores'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ErrorType = 'noDestination' | 'invalidUrl' | null

type Props = {
  language: Language
}

export const DeviceRedirectPage = ({ language }: Props) => {
  const [errorType, setErrorType] = useState<ErrorType>(null)
  const router = useRouter()
  const locale = language.locale

  useEffect(() => {
    // デバイスリダイレクト機能は一時的に無効化
    setErrorType('noDestination')
  }, [])

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
