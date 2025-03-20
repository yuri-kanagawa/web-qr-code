import { PhoneProps } from '@/ui/cores/textField/PhoneTextField/Device/Common/type'
import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  WorkPhoneTextField
} from '../Common'

type Props = PhoneProps

export const Desktop: FC<PhoneProps> = ({
  cellPhone,
  homePhone,
  workPhone,
  fax
}) => {
  return (
    <>
      <CellPhoneTextField {...cellPhone} />
      <HomePhoneTextField {...homePhone} />
      <FaxTextField {...fax} />
      <WorkPhoneTextField {...workPhone} />
    </>
  )
}
