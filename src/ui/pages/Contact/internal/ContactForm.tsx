import { FC } from 'react'
import { QrValue } from '@/ui/pages/Contact/internal/QrValue'
import { QrCode } from '@mui/icons-material'
import GeneratedQrcode from '@/ui/cores/qrcode/GeneratedQrcode/GeneratedQrcode'
import { useQrcode } from '@/hooks'
import { convertContactToQrValue } from '@/ui/cores/qrcode'

type Props = {}

export const ContactForm: FC<Props> = ({}) => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    email,
    setEmail,
    cellPhone,
    setCellPhone,
    fax,
    setFax,
    homePhone,
    setHomePhone,
    workPhone,
    setWorkPhone,
    file
  } = useQrcode()
  return (
    <>
      <QrValue />
      <GeneratedQrcode
        value={convertContactToQrValue({
          firstName,
          middleName,
          lastName,
          email
        })}
        file={file}
      />
    </>
  )
}
