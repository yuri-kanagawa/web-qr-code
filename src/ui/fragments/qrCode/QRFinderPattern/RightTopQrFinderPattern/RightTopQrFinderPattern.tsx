import { Language } from '@/domains/valueObjects/language'
import { QrColor } from '@/domains/valueObjects/qrSettings'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'

type Props = {
  eyeColor2: string
  setEyeColor2: (qrColor: QrColor) => void
  label: string
  language: Language
}

export const RightTopQrFinderPattern: FC<Props> = ({
  eyeColor2,
  setEyeColor2,
  label,
  language
}) => {
  const { isLessLaptop } = useWindowSize()
  return (
    <>
      <ColorInput
        format="hex"
        value={eyeColor2}
        label={label}
        onChange={(value) => {
          const result = QrColor.create(value, language)
          if (result.isSuccess && result.qrColor) {
            setEyeColor2(result.qrColor)
          }
        }}
        isAlphaHidden={true}
      />
      {isLessLaptop && (
        <CornerHighlightBox width={170} p={2}>
          <QRCode
            value={''}
            size={150}
            bgColor={'white'}
            fgColor={'white'}
            // ecLevel={ecLevel}
            // logoImage={logoImage}
            // logoOpacity={logoOpacity}
            eyeRadius={[0, 0, 40]}
            eyeColor={['white', eyeColor2, 'white']}
            // logoPaddingStyle={logoPaddingStyle}
            // logoPadding={9}
          />
        </CornerHighlightBox>
      )}
    </>
  )
}
