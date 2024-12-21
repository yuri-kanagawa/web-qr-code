import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from 'react'
import { Snackbar, Alert } from '@mui/material'

// NotifyContext の型を定義
type NotifyContextType = (
  msg: string,
  sev?: 'success' | 'error' | 'info' | 'warning'
) => void

// Context を作成
export const NotifyContext = createContext<NotifyContextType | undefined>(
  undefined
)

type Props = {
  children: ReactNode
}

// NotifyProvider を定義
export function NotifyProvider({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('info')

  const notify = useCallback(
    (msg: string, sev: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      setMessage(msg)
      setSeverity(sev) // severity によって色を変更
      setOpen(true)
    },
    []
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  )
}
