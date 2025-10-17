import { Language } from '@/domains/valueObjects/language'
import { TextFieldProps } from '@/ui/cores/TextField'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { FirstNameTextField } from './FirstNameTextField'
import { LastNameTextField } from './LastNameTextField'
import { MiddleNameTextField } from './MiddleNameTextField'

type NameFieldProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextFieldProps, 'onChange' | 'value' | 'label'>

type Props = {
  firstName: NameFieldProps
  lastName: NameFieldProps
  middleName: NameFieldProps
  language: Language
}

export const FullNameTextField: FC<Props> = ({
  firstName,
  lastName,
  middleName,
  language
}) => {
  return (
    <Stack spacing={2}>
      <FirstNameTextField {...firstName} language={language} />
      <MiddleNameTextField {...middleName} language={language} />
      <LastNameTextField {...lastName} language={language} />
    </Stack>
  )
}
