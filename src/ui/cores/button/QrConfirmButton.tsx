import React, {
  FC,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect
} from 'react'
import { Button } from '@mui/material'
import QrScanner from 'qr-scanner'
import { useNotify } from '@/hooks/useNotify'
import { extractPngDataUrl, isUrl } from '@/utils/qr'
import { useQrScanner } from '@/hooks/useQrScanner'

type Props = {
  onClick?: () => void
}

export const QrConfirmButton: FC<Props> = ({ onClick }) => {
  return (
    <Button variant={'contained'} onClick={onClick}>
      Confirm
    </Button>
  )
}
