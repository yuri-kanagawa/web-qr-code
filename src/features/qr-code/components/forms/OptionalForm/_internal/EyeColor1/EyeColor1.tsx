import { QrCode } from '@/domains'
import { ColorInput } from '@/ui/cores/input'
import { FC } from 'react'

type Props = {
  
  qr: QrCode
  onChange: (qr: QrCode) => void
  label: string
}

export const EyeColor1: FC<Props> = ({ qr, onChange, label }) => {
  const updateEyeColor1 = (value: string) => {
    const newQr = qr.changeColors(
      qr.colors.fgColor.value,
      qr.colors.bgColor.value,
      value,
      qr.colors.eyeColor2.value,
      qr.colors.eyeColor3.value
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
