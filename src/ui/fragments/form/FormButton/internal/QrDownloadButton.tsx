import { Language } from '@/domains/valueObjects/language'
import { Button } from '@/ui/cores'
import { FC } from 'react'
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
