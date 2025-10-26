'use client'
import { themeColors } from '@/config/theme'
import { NotifyProvider, QrProvider, SidebarProvider } from '@/stores'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FC } from 'react'

export const theme = createTheme({
  palette: themeColors,
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
  },
  // シンプルなCSS-in-JS最適化
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box'
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'inherit'
        }
      }
    }
  }
})

type Props = {
  children: React.ReactNode
}
export const StateWrap: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SidebarProvider>
        <NotifyProvider>
          <QrProvider>{children}</QrProvider>
        </NotifyProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
