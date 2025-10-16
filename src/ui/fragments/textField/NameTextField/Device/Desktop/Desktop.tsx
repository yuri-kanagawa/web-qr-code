import { FC } from 'react'
import {
  FirstNameForm,
  LastNameForm,
  MiddleNameForm,
  NameProps
} from '../Common'

type Props = NameProps

export const Desktop: FC<Props> = ({
  firstName,
  middleName,
  lastName,
  language
}) => {
  return (
    <>
      <FirstNameForm {...firstName} language={language} />
      <MiddleNameForm {...middleName} language={language} />
      <LastNameForm {...lastName} language={language} />
    </>
  )
}
