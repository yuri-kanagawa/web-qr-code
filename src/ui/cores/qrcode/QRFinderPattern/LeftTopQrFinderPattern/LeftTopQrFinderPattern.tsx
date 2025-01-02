import React, { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { CornerHighlightBox } from '@/ui/cores/box'

type Props = {}

export const LeftTopQrFinderPattern: FC<Props> = ({}) => {
  return (
    <CornerHighlightBox width={170} p={2}>
      <QRCode
        value={''}
        bgColor={'white'}
        fgColor={'white'}
        // ecLevel={ecLevel}
        // logoImage={logoImage}
        // logoOpacity={logoOpacity}
        eyeRadius={[40, 0, 0]}
        eyeColor={['red', 'white', 'white']}
        // logoPaddingStyle={logoPaddingStyle}
        // logoPadding={9}
      />
    </CornerHighlightBox>
  )
}
