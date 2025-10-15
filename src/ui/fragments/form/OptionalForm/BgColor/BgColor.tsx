import { useQrCode } from '@/hooks'
import { MuiColorInput } from 'mui-color-input'
import { FC } from 'react'

type Props = {}

export const BgColor: FC<Props> = ({}) => {
  const { settings, updateBgColor } = useQrCode()

  return (
    <MuiColorInput
      format="hex"
      value={settings.colors.bgColor.value}
      label={'Module Color'}
      onChange={updateBgColor}
      isAlphaHidden={true}
    />
  )
}
