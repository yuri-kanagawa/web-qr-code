import { QrCode } from '@/domains'
import { ColorInput } from '@/ui/cores/input'
import { FC } from 'react'

type Props = {
  qr: QrCode
  onChange: (qr: QrCode) => void
  label: string
}

export const EyeColor1: FC<Props> = ({ qr, onChange, label }) => {
  const isBgTransparent = qr.colors.bgColor.isTransparent()

  const updateEyeColor1 = (value: string) => {
    // 背景が透過の場合、全ての目の色を左上の目の色に合わせる
    const eyeColor2 = isBgTransparent ? value : qr.colors.eyeColor2.value
    const eyeColor3 = isBgTransparent ? value : qr.colors.eyeColor3.value

    const newQr = qr.changeColors(
      qr.colors.fgColor.value,
      qr.colors.bgColor.value,
      value,
      eyeColor2,
      eyeColor3
    )
    onChange(newQr)
  }

  return (
    <ColorInput
      format="hex"
      value={qr.colors.eyeColor1.value}
      label={label}
      onChange={updateEyeColor1}
      isAlphaHidden={true}
    />
  )
}
