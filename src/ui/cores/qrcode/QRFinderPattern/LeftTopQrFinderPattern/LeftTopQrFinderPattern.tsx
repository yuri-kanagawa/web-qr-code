import React, { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { CornerHighlightBox } from '@/ui/cores/box'
import { MuiColorInput } from 'mui-color-input'
import { useWindowSize } from '@/hooks'

type Props = {
  eyeColor1: string
  setEyeColor1: (value: string) => void
}

export const LeftTopQrFinderPattern: FC<Props> = ({
  eyeColor1,
  setEyeColor1
}) => {
  const { isLaptop } = useWindowSize()

  return (
    <>
      <MuiColorInput
        format="hex"
        value={eyeColor1}
        label={'Space Color'}
        onChange={setEyeColor1}
        isAlphaHidden={true}
      />
      {isLaptop && (
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
