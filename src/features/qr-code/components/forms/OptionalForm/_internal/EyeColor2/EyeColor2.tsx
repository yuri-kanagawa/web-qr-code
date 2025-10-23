import { QrCode } from '@/domains'
import { ColorInput } from '@/ui/cores/input'
import { FC } from 'react'

type Props = {
  
  qr: QrCode
  onChange: (qr: QrCode) => void
  label: string
}

export const EyeColor2: FC<Props> = ({ qr, onChange, label }) => {
  const updateEyeColor2 = (value: string) => {
    const newQr = qr.changeColors(
      qr.colors.fgColor.value,
      qr.colors.bgColor.value,
      qr.colors.eyeColor1.value,
      value,
      qr.colors.eyeColor3.value
    )
    onChange(newQr)
  }

  return (
    <ColorInput
      format="hex"
      value={qr.colors.eyeColor2.value}
      label={label}
      onChange={updateEyeColor2}
      isAlphaHidden={true}
    />
  )
}
