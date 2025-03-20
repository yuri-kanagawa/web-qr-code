import { TextField } from '@mui/material'
import {
  FirstNameForm,
  LastNameForm,
  MiddleNameForm,
  NameProps
} from '../Common'
import { FC } from 'react'

type Props = NameProps

export const Desktop: FC<Props> = ({ firstName, middleName, lastName }) => {
  return (
    <>
      <FirstNameForm {...firstName} />
      <MiddleNameForm {...middleName} />
      <LastNameForm {...lastName} />
    </>
  )
}
