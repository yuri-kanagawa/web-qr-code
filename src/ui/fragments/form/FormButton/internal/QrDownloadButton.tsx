import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { Button } from '@/ui/cores'
import { FC } from 'react'
type Props = {
  onClick?: () => void
  isValid?: boolean
  language?: Language
  qr?: QrCode
}

export const QrDownloadButton: FC<Props> = ({
  onClick,
  isValid = true,
  language = Language.default(),
  qr
}) => {
  const locale = language.locale

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
