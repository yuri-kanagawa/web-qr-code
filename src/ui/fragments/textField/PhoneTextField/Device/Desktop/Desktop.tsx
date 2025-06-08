import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device/Common/type'
import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  WorkPhoneTextField,
  PhoneTextField
} from '../Common'

type Props = PhoneProps

export const Desktop: FC<PhoneProps> = ({
  cellPhone,
  homePhone,
  workPhone,
  fax
}) => {
  const isMulti = !!cellPhone && !!homePhone && !!workPhone && !!fax
  const isSingle =
    [!!cellPhone, !!homePhone, !!workPhone, !!fax].filter(Boolean).length ===
    Number(true)
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
      {isSingle && (
        <PhoneTextField
          cellPhone={cellPhone}
          homePhone={homePhone}
          workPhone={workPhone}
          fax={fax}
        />
      )}
    </>
  )
}
