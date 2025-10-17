import { Language } from '@/domains/valueObjects/language'
import { useQrCode } from '@/hooks'
import { Stack } from '@/ui/cores'
import { FormSection } from '@/ui/fragments/box'
import { FormControlLabel, Switch } from '@mui/material'
import { FC } from 'react'
import { BgColor } from './BgColor'
import { EcLevel } from './EcLevel'
import { EyeSettings1 } from './EyeSettings1'
import { EyeSettings2 } from './EyeSettings2'
import { EyeSettings3 } from './EyeSettings3'
import { FgColor } from './FgColor/FgColor'
import { Logo } from './Logo'
import { LogoPadding } from './LogoPadding'
import { Opacity } from './Opacity'
import { Size } from './Size'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
}
export const OptionalForm: FC<Props> = ({ file, setFile, language }) => {
  const {
    individualEyeSettings,
    updateIndividualEyeSettings,
    settings,
    updateEyeColor2,
    updateEyeColor3,
    updateEyeRadius2,
    updateEyeRadius3
  } = useQrCode()
  const locale = language.locale

  const handleToggle = (checked: boolean) => {
    updateIndividualEyeSettings(checked)

    // OFFにした時（統一設定に戻す時）、全ての目を左上の値に統一
    if (!checked) {
      updateEyeColor2(settings.colors.eyeColor1)
      updateEyeColor3(settings.colors.eyeColor1)
      updateEyeRadius2(settings.eye.radius1)
      updateEyeRadius3(settings.eye.radius1)
    }
  }

  return (
    <Stack spacing={4}>
      <Size language={language} />
      <BgColor language={language} />
      <FgColor language={language} />
      <EcLevel language={language} />

      {/* 目の個別設定スイッチ */}
      <FormSection
        label={language.isEnglish ? 'Eye Configuration' : '目の設定方法'}
      >
        <FormControlLabel
          control={
            <Switch
              checked={individualEyeSettings}
              onChange={(e) => handleToggle(e.target.checked)}
            />
          }
          label={language.isEnglish ? 'Individual Settings' : '個別設定'}
        />
      </FormSection>

      {individualEyeSettings ? (
        <>
          <EyeSettings1 language={language} isUnified={false} />
          <EyeSettings2 language={language} />
          <EyeSettings3 language={language} />
        </>
      ) : (
        <EyeSettings1 language={language} isUnified={true} />
      )}

      <Logo file={file} setFile={setFile} language={language} />
      <Opacity file={file} language={language} />
      <LogoPadding language={language} file={file} />
    </Stack>
  )
}
