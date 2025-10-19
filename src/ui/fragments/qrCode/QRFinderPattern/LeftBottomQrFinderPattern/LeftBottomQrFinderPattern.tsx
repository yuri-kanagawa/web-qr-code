import { FC } from 'react'

import { Language } from '@/domains/valueObjects/language'
import { QrSettings } from '@/domains/valueObjects/qrSettings'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'
import { QRCode } from '@/ui/cores/QrCode'
import { CornerHighlightBox } from '@/ui/fragments/box'

type Props = {
  eyeColor3: string
  setEyeColor3: (qrColor: QrColor) => void
  label: string
  language: Language
}

export const LeftBottomQrFinderPattern: FC<Props> = ({
  eyeColor3,
  setEyeColor3,
  label,
  language
}) => {
  const { isOverLaptop } = useWindowSize()
  return (
    <>
      <ColorInput
        format="hex"
        value={eyeColor3}
        label={label}
        onChange={(value) => {
          const result = QrColor.create(value, language)
          if (result.isSuccess && result.qrColor) {
            setEyeColor3(result.qrColor)
          }
        }}
        isAlphaHidden={true}
      />
      {isOverLaptop && (
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
            eyeColor={['white', 'white', eyeColor3]}
            // logoPaddingStyle={logoPaddingStyle}
            // logoPadding={9}
          />
        </CornerHighlightBox>
      )}
    </>
  )
}
