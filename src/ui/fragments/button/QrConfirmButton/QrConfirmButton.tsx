import { Qr } from '@/domains/valueObjects/qr'
import { FC, useState } from 'react'
import { QrFileCheckButton } from './internal'
import { QrInformationDialog } from './internal/QrInformationDialog'

type Props = {
  file: File | null
  isValid?: boolean
}
export const QrConfirmButton: FC<Props> = ({ file, isValid }) => {
  const [qr, setQr] = useState<Qr>(Qr.default())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSetQr = (newQr: Qr) => {
    setQr(newQr)
    setIsDialogOpen(true)
  }

  return (
    <>
      <QrFileCheckButton file={file} setQr={handleSetQr} />
      {isDialogOpen && (
        <QrInformationDialog qr={qr} onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  )
}
