'use client'
import { ButtonProps, Button } from '@/ui/cores'
import { FC, useState } from 'react'

type Props = {
  onClick: (location: { lat: number; lng: number }) => void
} & Omit<ButtonProps, 'onClick'>

export const LocationButton: FC<Props> = ({ children, onClick, ...rest }) => {
  const [error, setError] = useState<string | null>(null)

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('このブラウザでは位置情報がサポートされていません。')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onClick({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setError(null)
      },
      (err) => {
        setError('位置情報の取得に失敗しました。')
      }
    )
  }

  return (
    <Button {...rest} onClick={handleGetLocation}>
      {children}
    </Button>
  )
}
