import { Language, QrCode } from '@/domains'
import { UrlForm } from '@/ui/fragments'
import { PageWrapper } from '@/ui/fragments/pageWrapper'
import { useState } from 'react'

interface Props {
  language: Language
  qr: QrCode
}

export const UrlPage = (props: Props) => {
  const [currentQr, setCurrentQr] = useState<QrCode>(
    props.qr.changeToUrl()
  )

  return (
    <PageWrapper language={props.language}>
      <UrlForm
        language={props.language}
        qr={currentQr}
        onChange={setCurrentQr}
      />
    </PageWrapper>
  )
}
