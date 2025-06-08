import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device/Common/type'
import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  WorkPhoneTextField
} from '@/ui/fragments/textField/PhoneTextField/Device'

type Props = PhoneProps

export const Mobile: FC<Props> = ({ cellPhone, homePhone, workPhone, fax }) => {
  const isMulti = !!cellPhone && !!homePhone && !!workPhone && !!fax
  return (
    <>
      {isMulti && (
        <>
          <CellPhoneTextField {...cellPhone} />
          <HomePhoneTextField {...homePhone} />
          <FaxTextField {...fax} />
          <WorkPhoneTextField {...workPhone} />
        </>
      )}
    </>
  )
}
