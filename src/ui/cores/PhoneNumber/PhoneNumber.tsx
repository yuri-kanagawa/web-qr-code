import MuiPhoneNumber, { MuiPhoneNumberProps } from 'mui-phone-number'
import { FC } from 'react'

type PhoneNumberProps = MuiPhoneNumberProps

export const PhoneNumber: FC<PhoneNumberProps> = ({ ...props }) => {
  return <MuiPhoneNumber {...props} />
}
