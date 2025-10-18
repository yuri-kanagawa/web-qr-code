'use client'
import { Language } from '@/domains/valueObjects/language'
import { Qr } from '@/domains/valueObjects/qr'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

interface QrContextType {
  qr: Qr | null
  setQr: (qr: Qr | null) => void
  clearQr: () => void
}

const QrContext = createContext<QrContextType | undefined>(undefined)

const QR_STORAGE_KEY = 'qr_edit_data'

// QRデータを保存用にシリアライズ
const serializeQr = (qr: Qr) => {
  return {
    value: qr.value,
    languageValue: qr.language.value
  }
}

// 保存されたデータからQRを復元
const deserializeQr = (data: {
  value: string
  languageValue: string
}): Qr | null => {
  try {
    const languageResult = Language.create(data.languageValue)
    if (!languageResult.isSuccess || !languageResult.language) {
      return null
    }
    return Qr.create(data.value, languageResult.language)
  } catch {
    return null
  }
}

interface Props {
  children: ReactNode
}

export const QrProvider: React.FC<Props> = ({ children }) => {
  const [qr, setQrState] = useState<Qr | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(QR_STORAGE_KEY)
      if (stored) {
        try {
          const data = JSON.parse(stored)
          const restoredQr = deserializeQr(data)
          if (restoredQr) {
            setQrState(restoredQr)
          }
        } catch (error) {
          console.error('Failed to restore QR from localStorage:', error)
        }
      }
      setIsInitialized(true)
    }
  }, [])

  const setQr = useCallback((newQr: Qr | null) => {
    setQrState(newQr)
    // localStorageに保存
    if (typeof window !== 'undefined') {
      if (newQr) {
        try {
          const serialized = serializeQr(newQr)
          localStorage.setItem(QR_STORAGE_KEY, JSON.stringify(serialized))
        } catch (error) {
          console.error('Failed to save QR to localStorage:', error)
        }
      } else {
        localStorage.removeItem(QR_STORAGE_KEY)
      }
    }
  }, [])

  const clearQr = useCallback(() => {
    setQrState(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(QR_STORAGE_KEY)
    }
  }, [])

  return (
    <QrContext.Provider value={{ qr, setQr, clearQr }}>
      {children}
    </QrContext.Provider>
  )
}

export const useQr = (): QrContextType => {
  const context = useContext(QrContext)
  if (!context) {
    throw new Error('useQr must be used within a QrProvider')
  }
  return context
}
