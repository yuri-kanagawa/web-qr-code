'use client'
import { Qr } from '@/domains/valueObjects/qr'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

interface QrContextType {
  qr: Qr | null
  setQr: (qr: Qr | null) => void
  clearQr: () => void
}

const QrContext = createContext<QrContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const QrProvider: React.FC<Props> = ({ children }) => {
  const [qr, setQrState] = useState<Qr | null>(null)

  const setQr = useCallback((newQr: Qr | null) => {
    setQrState(newQr)
  }, [])

  const clearQr = useCallback(() => {
    setQrState(null)
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
