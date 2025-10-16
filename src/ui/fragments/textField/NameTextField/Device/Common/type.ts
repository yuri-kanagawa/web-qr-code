import { Language } from '@/domains/valueObjects/language'
import { FirstNameFormProps } from './FirstNameForm'
import { LastNameFormProps } from './LastNameForm'
import { MiddleNameFormProps } from './MiddleNameForm'

export type NameProps = {
  lastName: LastNameFormProps
  firstName: FirstNameFormProps
  middleName: MiddleNameFormProps
  language: Language
}
