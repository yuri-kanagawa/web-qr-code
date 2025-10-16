import { PhoneProps } from '@/ui/fragments/textField/PhoneTextField/Device/Common/type'
import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  PhoneTextField,
  WorkPhoneTextField
} from '../Common'

type Props = PhoneProps

export const Desktop: FC<PhoneProps> = ({
  cellPhone,
  homePhone,
  workPhone,
  fax,
  language
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
          language={language}
        />
      )}
    </>
  )
}
