import { FC } from 'react'
import { QRCode as QrCodeLogo, IProps } from 'react-qrcode-logo'
export type EcLevelType = 'L' | 'M' | 'Q' | 'H'
type Props = IProps

export const QRCode: FC<Props> = ({ ...rest }) => {
  return <QrCodeLogo {...rest} />
}
