'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { colors } from '@/constants'
import { FC } from 'react'
import { NotifyProvider } from '@/stores'

const theme = createTheme({
  palette: colors
})

type Props = {
  children: React.ReactNode
}
export const StateWrap: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NotifyProvider>{children}</NotifyProvider>
    </ThemeProvider>
  )
}
