import { Language } from '@/domains/valueObjects/language'
import { QrColor } from '@/domains/valueObjects/qrSettings'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { FC } from 'react'

type Props = {
  eyeColor1: string
  setEyeColor1: (qrColor: QrColor) => void
  label: string
  language: Language
}

export const LeftTopQrFinderPattern: FC<Props> = ({
  eyeColor1,
  setEyeColor1,
  label,
  language
}) => {
  const { isOverLaptop } = useWindowSize()

  return (
    <>
      <ColorInput
        format="hex"
        value={eyeColor1}
        label={label}
        onChange={(value) => {
          const result = QrColor.create(value, language)
          if (result.isSuccess && result.qrColor) {
            setEyeColor1(result.qrColor)
          }
        }}
        isAlphaHidden={true}
      />
      {isOverLaptop && (
        <CornerHighlightBox width={170} p={2}>
          <QRCode
            value={''}
            bgColor={'white'}
            fgColor={'white'}
            // ecLevel={ecLevel}
            // logoImage={logoImage}
            // logoOpacity={logoOpacity}
            eyeRadius={[40, 0, 0]}
            eyeColor={[eyeColor1, 'white', 'white']}
            // logoPaddingStyle={logoPaddingStyle}
            // logoPadding={9}
          />
        </CornerHighlightBox>
      )}
    </>
  )
}
