import { Language } from '@/domains/valueObjects/language'
import { Qr as QrValue } from '@/domains/valueObjects/qr'
import { FC, useState } from 'react'
import { QrFileCheckButton } from './internal'
import { QrInformationDialog } from './internal/QrInformationDialog'

type Props = {
  file: File | null
  language: Language
  isValid?: boolean
}
export const QrConfirmButton: FC<Props> = ({ file, language, isValid }) => {
  const [qr, setQr] = useState<QrValue>(QrValue.default(language))
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSetQr = (newQr: QrValue) => {
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
