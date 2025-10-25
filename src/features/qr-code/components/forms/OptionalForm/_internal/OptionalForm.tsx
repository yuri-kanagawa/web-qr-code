import { QrCode } from '@/domains'
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
  qr: QrCode
  onChange: (qr: QrCode) => void
}
export const OptionalForm: FC<Props> = ({ qr, onChange }) => {
  const locale = qr.language.locale
  const [individualEyeSettings, setIndividualEyeSettings] = useState(false)
  const file = qr.settings.logoFile
  const isBgTransparent = qr.settings.colors.bgColor.isTransparent()

  const handleToggle = (checked: boolean) => {
    setIndividualEyeSettings(checked)

    // OFFにした時（統一設定に戻す時）、全ての目を左上の値に統一
    if (!checked) {
      const newQr = qr.updateSettings((settings) => {
        // まず目の色を統一
        let newSettings = settings.changeColors(
          settings.colors.fgColor.value,
          settings.colors.bgColor.value,
          settings.colors.eyeColor1.value,
          settings.colors.eyeColor1.value, // eyeColor2を eyeColor1に統一
          settings.colors.eyeColor1.value // eyeColor3を eyeColor1に統一
        )

        // 目の半径も統一
        newSettings = newSettings.changeEye(
          settings.eye.radius1,
          settings.eye.radius1,
          settings.eye.radius1
        )

        return newSettings
      })

      onChange(newQr)
    }
  }

  return (
    <Stack spacing={4}>
      <Size qr={qr} onChange={onChange} />
      <BgColor qr={qr} onChange={onChange} />
      <FgColor qr={qr} onChange={onChange} />
      <EcLevel qr={qr} hasLogo={!!file} onChange={onChange} />

      {/* 目の個別設定スイッチ */}
      <FormSection label={locale.word.formSections.eyeConfiguration}>
        <FormControlLabel
          control={
            <Switch
              checked={individualEyeSettings}
              onChange={(e) => handleToggle(e.target.checked)}
              disabled={isBgTransparent}
            />
          }
          label={locale.word.formSections.individualSettings}
        />
      </FormSection>

      {individualEyeSettings ? (
        <>
          <EyeSettings1 isUnified={false} qr={qr} onChange={onChange} />
          <EyeSettings2 qr={qr} onChange={onChange} />
          <EyeSettings3 qr={qr} onChange={onChange} />
        </>
      ) : (
        <EyeSettings1 isUnified={true} qr={qr} onChange={onChange} />
      )}

      <Logo qr={qr} onChange={onChange} />
      <Opacity qr={qr} onChange={onChange} />
      <LogoPadding qr={qr} onChange={onChange} />
    </Stack>
  )
}
