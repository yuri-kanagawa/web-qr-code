import NextLink, { LinkProps } from 'next/link'
import { FC, ReactNode } from 'react'

type Props = LinkProps & {
  children?: ReactNode
}

export const Link: FC<Props> = ({ children, ...rest }) => {
  return <NextLink {...rest}>{children}</NextLink>
}
