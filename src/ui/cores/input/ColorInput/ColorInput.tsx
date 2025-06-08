import { MuiColorInput, MuiColorButtonProps } from 'mui-color-input'
import { FC } from 'react'

type Props = React.ComponentProps<typeof MuiColorInput>

export const ColorInput: FC<Props> = ({ ...rest }) => {
  return <MuiColorInput {...rest} />
}
