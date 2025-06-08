import { FC, useState } from 'react'
import { QrFileCheckButton } from './internal'
import { QrInformationDialog } from './internal/QrInformationDialog'

type Props = {
  file: File | null
  isValid?: boolean
}
export const QrConfirmButton: FC<Props> = ({ file, isValid }) => {
  const [qrInformation, setQrInformation] = useState('')
  return (
    <>
      <QrFileCheckButton file={file} setQrInformation={setQrInformation} />
      <QrInformationDialog
        qrInformation={qrInformation}
        setQrInformation={setQrInformation}
      />
    </>
  )
}
