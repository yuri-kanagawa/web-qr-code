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
  // 積極的なCSS-in-JS最適化
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // グローバルスタイルの最適化
        '*': {
          boxSizing: 'border-box'
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'inherit'
        }
      }
    },
    // よく使われるコンポーネントのスタイルを事前定義
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // デフォルトの大文字変換を無効化
          fontWeight: 500
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit'
        }
      }
    }
  },
  // テーマの最適化
  shape: {
    borderRadius: 8
  },
  // アニメーションの最適化（適度な速度に調整）
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
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
