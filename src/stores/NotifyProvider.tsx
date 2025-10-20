import { Alert, Snackbar } from '@mui/material'
import { createContext, ReactNode, useCallback, useState } from 'react'

type NotifyContextType = (
  msg: string,
  sev?: 'success' | 'error' | 'info' | 'warning'
) => void

export const NotifyContext = createContext<NotifyContextType | undefined>(
  undefined
)

type Props = {
  children: ReactNode
}

export function NotifyProvider({ children }: Props) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('info')

  const notify = useCallback(
    (msg: string, sev: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      setMessage(msg)
      setSeverity(sev)
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
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ minWidth: 300 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  )
}
