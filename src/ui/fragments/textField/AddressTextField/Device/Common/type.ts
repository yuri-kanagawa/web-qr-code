import { PostalCodeTextFieldProps } from './PostalCodeTextField'
import { CityTextFieldProps } from './CityTextField'
import { RegionTextFieldProps } from './RegionTextField'
import { StreetAddressTextFieldProps } from './StreetAddressTextField'

export type AddressTextFieldProps = {
  postalCode: PostalCodeTextFieldProps
  city: CityTextFieldProps
  region: RegionTextFieldProps
  streetAddress: StreetAddressTextFieldProps
}
