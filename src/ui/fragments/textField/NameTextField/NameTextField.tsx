import { Language } from '@/domains/valueObjects/language'
import { ResponsiveSwitcher } from '@/ui/fragments/ResponsiveSwitcher'
import {
  FirstNameFormProps,
  LastNameFormProps,
  MiddleNameFormProps
} from '@/ui/fragments/textField/NameTextField/Device/Common'
import { FC } from 'react'
import { Desktop } from './Device/Desktop'
import { Mobile } from './Device/Mobile'

type Props = {
  firstName: Omit<FirstNameFormProps, 'language'>
  lastName: Omit<LastNameFormProps, 'language'>
  middleName: Omit<MiddleNameFormProps, 'language'>
  language: Language
}

export const NameTextField: FC<Props> = ({
  firstName,
  lastName,
  middleName,
  language
}) => {
  const nameProps = {
    firstName: { ...firstName, language },
    lastName: { ...lastName, language },
    middleName: { ...middleName, language },
    language
  }

  return (
    <ResponsiveSwitcher
      desktop={<Desktop {...nameProps} />}
      laptop={<Desktop {...nameProps} />}
      tablet={<Mobile {...nameProps} />}
      mobile={<Mobile {...nameProps} />}
    />
  )
}
