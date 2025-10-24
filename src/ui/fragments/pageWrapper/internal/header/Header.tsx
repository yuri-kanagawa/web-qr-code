import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef } from 'react'

import { Language } from '@/domains'
import { LanguageSelect } from '@/features/qr-code'
import { useWindowSize } from '@/hooks'
import { useSidebar } from '@/stores'

type Props = {
  language: Language
  children?: React.ReactNode
}

export const Header = forwardRef<HTMLDivElement, Props>(
  ({ language, children }, ref) => {
    const { isSidebarOpen, toggleSidebar } = useSidebar()
    const { isLessLaptop } = useWindowSize()
    const router = useRouter()
    const pathname = usePathname()

    const handleLanguageChange = (newLanguage: Language) => {
      let newPath = pathname

      // 現在のパスから言語プレフィックスを除去
      if (!language.isEnglish) {
        newPath = pathname.replace(`/${language.value}`, '')
      }

      // 新しい言語のパスを構築
      if (!newLanguage.isEnglish) {
        newPath = `/${newLanguage.value}${newPath}`
      }

      router.push(newPath)
    }

    return (
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'grey.100',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          color: 'text.primary'
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: '100%' }}
          >
            {/* ハンバーガーメニューボタン */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    backgroundColor: 'currentColor',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    backgroundColor: 'currentColor',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    height: 2,
                    backgroundColor: 'currentColor',
                    transition: 'all 0.3s ease'
                  }}
                />
              </Box>
            </IconButton>

            {/* アプリタイトル */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QR Code Generator
            </Typography>

            {/* 言語選択 */}
            <Box sx={{ minWidth: 200 }}>
              <LanguageSelect
                language={language}
                onChange={handleLanguageChange}
                isSidebarOpen={true}
              />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    )
  }
)

Header.displayName = 'Header'
