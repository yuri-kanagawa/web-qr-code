import { PhoneProps } from '@/ui/cores/textField/PhoneTextField/Device/Common/type'
import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  WorkPhoneTextField
} from '@/ui/cores/textField/PhoneTextField/Device'

type Props = PhoneProps

export const Mobile: FC<Props> = ({ cellPhone, homePhone, workPhone, fax }) => {
  return (
    <>
      <CellPhoneTextField {...cellPhone} />
      <HomePhoneTextField {...homePhone} />
      <FaxTextField {...fax} />
      <WorkPhoneTextField {...workPhone} />
    </>
  )
}
