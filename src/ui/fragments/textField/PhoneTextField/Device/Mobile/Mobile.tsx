import { FC } from 'react'
import {
  CellPhoneTextField,
  FaxTextField,
  HomePhoneTextField,
  WorkPhoneTextField,
  PhoneTextField,
  PhoneProps
} from '../Common'

type Props = PhoneProps

export const Mobile: FC<Props> = ({ cellPhone, homePhone, workPhone, fax }) => {
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
