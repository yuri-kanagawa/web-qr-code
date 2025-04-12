import { FC } from 'react'
import {
  EmailTextField,
  NameTextField,
  OrganizationForm,
  PhoneTextField,
  UrlForm
} from '../../../../cores/textField'
import { useQrcode } from '@/hooks'

export const QrValue: FC<Props> = ({}) => {
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
    setWorkPhone
  } = useQrcode()
  return (
    <>
      <NameTextField
        firstName={{
          value: firstName,
          onChange: setFirstName
        }}
        lastName={{
          value: lastName,
          onChange: setLastName
        }}
        middleName={{
          value: middleName,
          onChange: setMiddleName
        }}
      />
      <PhoneTextField
        cellPhone={{
          value: cellPhone,
          onChange: setCellPhone
        }}
        fax={{
          value: fax,
          onChange: setFax
        }}
        homePhone={{
          value: workPhone,
          onChange: setHomePhone
        }}
        workPhone={{
          value: workPhone,
          onChange: setWorkPhone
        }}
      />
      <EmailTextField value={email} onChange={setEmail} />
      {/*<OrganizationForm />*/}
      <UrlForm />
    </>
  )
}
