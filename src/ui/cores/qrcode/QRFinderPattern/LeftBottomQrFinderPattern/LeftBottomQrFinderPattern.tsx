import React, { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { CornerHighlightBox } from '@/ui/cores/box'

type Props = {}

export const LeftBottomQrFinderPattern: FC<Props> = ({}) => {
  return (
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
        eyeColor={['white', 'white', 'red']}
        // logoPaddingStyle={logoPaddingStyle}
        // logoPadding={9}
      />
    </CornerHighlightBox>
  )
}
