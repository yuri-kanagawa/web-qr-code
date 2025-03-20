import { CellPhoneTextFieldProps } from './CellPhoneTextField'
import { FaxTextFieldProps } from './FaxTextField'
import { HomePhoneTextFieldProps } from './HomePhoneTextFieldProps'
import { WorkPhoneTextFieldProps } from '@/ui/cores/textField/PhoneTextField/Device/Common/WorkPhoneTextField'

export type PhoneProps = {
  cellPhone: CellPhoneTextFieldProps
  fax: FaxTextFieldProps
  homePhone: HomePhoneTextFieldProps
  workPhone: WorkPhoneTextFieldProps
}
