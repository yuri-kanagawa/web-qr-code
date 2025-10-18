import { QrCodeSettings } from '@/domains'
import { Language } from '@/domains/valueObjects/language'
import {
  EyeRadius,
  EyeSettings,
  QrColors
} from '@/domains/valueObjects/qrSettings'
import { Stack } from '@/ui/cores'
import { FormSection } from '@/ui/fragments/box'
import { FormControlLabel, Switch } from '@mui/material'
import { FC, useState } from 'react'
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
  settings: QrCodeSettings
  onChange: (settings: QrCodeSettings) => void
}
export const OptionalForm: FC<Props> = ({
  file,
  setFile,
  language,
  settings,
  onChange
}) => {
  const locale = language.locale
  const [individualEyeSettings, setIndividualEyeSettings] = useState(false)

  const handleToggle = (checked: boolean) => {
    setIndividualEyeSettings(checked)

    // OFFにした時（統一設定に戻す時）、全ての目を左上の値に統一
    if (!checked) {
      // まず目の色を統一
      const unifiedColors = QrColors.create(
        settings.colors.fgColor,
        settings.colors.bgColor,
        settings.colors.eyeColor1,
        settings.colors.eyeColor1, // eyeColor2を eyeColor1に統一
        settings.colors.eyeColor1 // eyeColor3を eyeColor1に統一
      )
      let newSettings = settings.changeColors(unifiedColors)

      // 目の半径も統一
      const r1 = EyeRadius.create(settings.eye.radius1, language)
      const r2 = EyeRadius.create(settings.eye.radius1, language)
      const r3 = EyeRadius.create(settings.eye.radius1, language)

      if (
        r1.isSuccess &&
        r2.isSuccess &&
        r3.isSuccess &&
        r1.eyeRadius &&
        r2.eyeRadius &&
        r3.eyeRadius
      ) {
        const unifiedEye = EyeSettings.create(
          r1.eyeRadius,
          r2.eyeRadius,
          r3.eyeRadius
        )
        newSettings = newSettings.changeEye(unifiedEye)
      }

      onChange(newSettings)
    }
  }

  return (
    <Stack spacing={4}>
      <Size language={language} settings={settings} onChange={onChange} />
      <BgColor language={language} settings={settings} onChange={onChange} />
      <FgColor language={language} settings={settings} onChange={onChange} />
      <EcLevel
        language={language}
        settings={settings}
        onChange={onChange}
        hasLogo={!!file}
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
            settings={settings}
            onChange={onChange}
          />
          <EyeSettings2
            language={language}
            settings={settings}
            onChange={onChange}
          />
          <EyeSettings3
            language={language}
            settings={settings}
            onChange={onChange}
          />
        </>
      ) : (
        <EyeSettings1
          language={language}
          isUnified={true}
          settings={settings}
          onChange={onChange}
        />
      )}

      <Logo
        file={file}
        setFile={setFile}
        language={language}
        settings={settings}
        onChange={onChange}
      />
      <Opacity
        file={file}
        language={language}
        settings={settings}
        onChange={onChange}
      />
      <LogoPadding
        language={language}
        file={file}
        settings={settings}
        onChange={onChange}
      />
    </Stack>
  )
}
