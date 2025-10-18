import { Language } from '@/domains/valueObjects/language'
import { FC } from 'react'
import { QrFileCheckButton } from './internal'

type Props = {
  file: File | null
  language: Language
}

export const QrEditButton: FC<Props> = ({ file, language }) => {
  return (
    <>
      <QrFileCheckButton file={file} language={language} />
    </>
  )
}
