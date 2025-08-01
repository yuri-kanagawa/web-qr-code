import React, { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { CornerHighlightBox } from '@/ui/fragments/box'
import { MuiColorInput } from 'mui-color-input'
import { useWindowSize } from '@/hooks'
import { ColorInput } from '@/ui/cores/input'

type Props = {
  eyeColor2: string
  setEyeColor2: (value: string) => void
}

export const RightTopQrFinderPattern: FC<Props> = ({
  eyeColor2,
  setEyeColor2
}) => {
  const { isLessLaptop } = useWindowSize()
  return (
    <>
      <ColorInput
        format="hex"
        value={eyeColor2}
        label={'Space Color'}
        onChange={setEyeColor2}
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
