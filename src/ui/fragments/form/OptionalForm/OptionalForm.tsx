import { QrCode } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import { Stack } from '@/ui/cores'
import { FormSection } from '@/ui/fragments/box'
import { FormControlLabel, Switch } from '@mui/material'
import { FC, useState } from 'react'
import { BgColor } from './BgColor'
import { EcLevel } from './EcLevel'
import { EyeSettings1 } from './EyeSettings1'
import { EyeSettings2 } from './EyeSettings2'
import { EyeSettings3 } from './EyeSettings3'
import { FgColor } from './FgColor'
import { Logo } from './Logo'
import { LogoPadding } from './LogoPadding'
import { Opacity } from './Opacity'
import { Size } from './Size'

type Props = {
  file: File | null
  setFile: (value: File | null) => void
  language: Language
  qr: QrCode
  onChange: (qr: QrCode) => void
}
export const OptionalForm: FC<Props> = ({
  file,
  setFile,
  language,
  qr,
  onChange
}) => {
  const locale = language.locale
  const [individualEyeSettings, setIndividualEyeSettings] = useState(false)

  const handleToggle = (checked: boolean) => {
    setIndividualEyeSettings(checked)

    // OFFにした時（統一設定に戻す時）、全ての目を左上の値に統一
    if (!checked) {
      // まず目の色を統一
      let newSettings = qr.changeColors(
        qr.colors.fgColor.value,
        qr.colors.bgColor.value,
        qr.colors.eyeColor1.value,
        qr.colors.eyeColor1.value, // eyeColor2を eyeColor1に統一
        qr.colors.eyeColor1.value // eyeColor3を eyeColor1に統一
      )

      // 目の半径も統一
      newSettings = newSettings.changeEye(
        qr.eye.radius1,
        qr.eye.radius1,
        qr.eye.radius1
      )

      onChange(newSettings)
    }
  }

  return (
    <Stack spacing={4}>
      <Size language={language} qr={qr} onChange={onChange} />
      <BgColor language={language} qr={qr} onChange={onChange} />
      <FgColor language={language} qr={qr} onChange={onChange} />
      <EcLevel
        language={language}
        qr={qr}
        hasLogo={!!file}
        onChange={onChange}
      />

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
          <EyeSettings1
            language={language}
            isUnified={false}
            qr={qr}
            onChange={onChange}
          />
          <EyeSettings2 language={language} qr={qr} onChange={onChange} />
          <EyeSettings3 language={language} qr={qr} onChange={onChange} />
        </>
      ) : (
        <EyeSettings1
          language={language}
          isUnified={true}
          qr={qr}
          onChange={onChange}
        />
      )}

      <Logo
        file={file}
        setFile={setFile}
        language={language}
        qr={qr}
        onChange={onChange}
      />
      <Opacity language={language} qr={qr} onChange={onChange} file={file} />
      <LogoPadding
        language={language}
        qr={qr}
        onChange={onChange}
        file={file}
      />
    </Stack>
  )
}
