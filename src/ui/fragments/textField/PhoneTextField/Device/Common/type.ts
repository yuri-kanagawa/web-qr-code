import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { CellPhoneTextFieldProps } from './CellPhoneTextField'
import { FaxTextFieldProps } from './FaxTextField'
import { HomePhoneTextFieldProps } from './HomePhoneTextField'
import { WorkPhoneTextFieldProps } from './WorkPhoneTextField'

export type PhoneProps = {
  cellPhone?: CellPhoneTextFieldProps & TextFieldProps
  fax?: FaxTextFieldProps & TextFieldProps
  homePhone?: HomePhoneTextFieldProps & TextFieldProps
  workPhone?: WorkPhoneTextFieldProps & TextFieldProps
  language: Language
}
