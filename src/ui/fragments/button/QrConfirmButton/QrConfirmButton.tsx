import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { QrInformationDialog } from '@/features/qr-code'
import { FC, useState } from 'react'
import { QrFileCheckButton } from './internal'

type Props = {
  file: File | null
  language: Language
  isValid?: boolean
}
export const QrConfirmButton: FC<Props> = ({ file, language, isValid }) => {
  const [qr, setQr] = useState<QrCode>(QrCode.default(language))
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSetQr = (newQr: QrCode) => {
    setQr(newQr)
    setIsDialogOpen(true)
  }

  return (
    <>
      <QrFileCheckButton file={file} setQr={handleSetQr} language={language} />
      {isDialogOpen && (
        <QrInformationDialog qr={qr} onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  )
}
