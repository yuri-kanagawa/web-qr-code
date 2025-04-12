import { Button } from '@mui/material'
import React, { FC, MutableRefObject, RefObject, useCallback } from 'react'
type Props = {
  onClick?: () => void
}

export const QrDownloadButton: FC<Props> = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Download
    </Button>
  )
}
