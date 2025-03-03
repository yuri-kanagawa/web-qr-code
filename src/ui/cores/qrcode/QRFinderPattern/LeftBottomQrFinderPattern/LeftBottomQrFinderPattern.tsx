import React, { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { CornerHighlightBox } from '@/ui/cores/box'
import { MuiColorInput } from 'mui-color-input'

type Props = {
  eyeColor3: string
  setEyeColor3: (value: string) => void
}

export const LeftBottomQrFinderPattern: FC<Props> = ({
  eyeColor3,
  setEyeColor3
}) => {
  return (
    <>
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
      <MuiColorInput
        format="hex"
        value={eyeColor3}
        label={'Space Color'}
        onChange={setEyeColor3}
        isAlphaHidden={true}
      />
    </>
  )
}
