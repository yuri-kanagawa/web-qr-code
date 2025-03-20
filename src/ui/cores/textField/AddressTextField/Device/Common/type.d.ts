import { PostalCodeTextFieldProps } from '@/ui/cores/textField/AddressTextField/Device/Common/PostalCodeTextField'
import { CityTextFieldProps } from '@/ui/cores/textField/AddressTextField/Device/Common/CityTextField'
import { RegionTextFieldProps } from '@/ui/cores/textField/AddressTextField/Device/Common/RegionTextField'
import { StreetAddressTextFieldProps } from '@/ui/cores/textField/AddressTextField/Device/Common/StreetAddressTextField'

export type AddressTextFieldProps = {
  postalCode: PostalCodeTextFieldProps
  city: CityTextFieldProps
  region: RegionTextFieldProps
  streetAddress: StreetAddressTextFieldProps
}
