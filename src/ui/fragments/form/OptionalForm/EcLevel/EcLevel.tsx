import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { EcLevelSelect } from '@/ui/fragments/select'
import { FC } from 'react'

type Props = {
  language: Language
}

export const EcLevel: FC<Props> = ({ language }) => {
  const { settings, updateEcLevel } = useQrCode()
  const locale = language.getLocale()

  return (
    <EcLevelSelect
      value={settings.ecLevel}
      onChange={updateEcLevel}
      language={language}
      label={locale.word.qrSettings.ecLevel}
    />
  )
}
