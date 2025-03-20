import { FC } from 'react'
import {
  AddressTextFieldProps,
  CityTextField,
  CityTextFieldProps,
  PostalCodeTextField,
  PostalCodeTextFieldProps,
  RegionTextField,
  RegionTextFieldProps,
  StreetAddressTextField,
  StreetAddressTextFieldProps
} from '../Common'

type Props = AddressTextFieldProps

export const Desktop: FC<Props> = ({
  postalCode,
  city,
  region,
  streetAddress
}) => {
  return (
    <>
      <PostalCodeTextField {...postalCode} />
      <CityTextField {...city} />
      <RegionTextField {...region} />
      <StreetAddressTextField {...streetAddress} />
    </>
  )
}
