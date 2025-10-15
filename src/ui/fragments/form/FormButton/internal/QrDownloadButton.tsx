import { Language } from '@/domains/valueObjects/language'
import { Button } from '@/ui/cores'
import React, { FC, MutableRefObject, RefObject, useCallback } from 'react'
type Props = {
  onClick?: () => void
  isValid?: boolean
  language?: Language
}

export const QrDownloadButton: FC<Props> = ({
  onClick,
  isValid = true,
  language = Language.default()
}) => {
  const locale = language.getLocale()

  return (
    <>
      {onClick && (
        <Button variant="contained" onClick={onClick} disabled={!isValid}>
          {locale.word.buttons.download}
        </Button>
      )}
    </>
  )
}
