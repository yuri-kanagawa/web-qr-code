import { CellPhoneTextFieldProps } from './CellPhoneTextField'
import { FaxTextFieldProps } from './FaxTextField'
import { HomePhoneTextFieldProps } from './HomePhoneTextField'
import { WorkPhoneTextFieldProps } from './WorkPhoneTextField'

export type PhoneProps = {
  cellPhone?: CellPhoneTextFieldProps
  fax?: FaxTextFieldProps
  homePhone?: HomePhoneTextFieldProps
  workPhone?: WorkPhoneTextFieldProps
}
