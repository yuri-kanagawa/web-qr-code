'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { colors } from '@/constants'
import { FC } from 'react'
import { NotifyProvider } from '@/stores'

export const theme = createTheme({
  palette: colors,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  zIndex: {
    drawer: 1200, // Drawer用の zIndex
    appBar: 1100, // AppBar 用の zIndex
    modal: 1300, // Modal 用の zIndex
    tooltip: 1400, // Tooltip 用の zIndex
    snackbar: 1500 // Snackbar 用の zIndex
  }
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
