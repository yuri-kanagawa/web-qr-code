import { FC } from 'react'
import { ConfirmButton } from './internal/ConfirmButton'
import { QrInformationDialog } from './internal/QrInformationDialog'

type Props = {
  onClick?: () => Promise<string | undefined>
  isValid?: boolean
  value: string
}
export const QrConfirmButton: FC<Props> = ({ onClick, isValid, value }) => {
  return (
    <>
      <ConfirmButton onClick={onClick} isValid={isValid} />
      {/* <QrInformationDialog qrInformation={value} setQrInformation={setQrInformation} /> */}
    </>
  )
}
