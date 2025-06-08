import { Button } from '@mui/material'
import React, { FC, MutableRefObject, RefObject, useCallback } from 'react'
type Props = {
  onClick?: () => void
  isValid?: boolean
}

export const QrDownloadButton: FC<Props> = ({ onClick, isValid = true }) => {
  return (
    <>
      {onClick && (
        <Button variant="contained" onClick={onClick} disabled={!isValid}>
          Download
        </Button>
      )}
    </>
  )
}
