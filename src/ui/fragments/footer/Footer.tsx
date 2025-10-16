'use client'

import { Language } from '@/domains/valueObjects/language'
import { PathBuilder } from '@/lib/routing'
import { Box, Link, Typography } from '@mui/material'

type Props = {
  language: Language
  isFixed?: boolean
  leftMargin?: number
}

export const Footer = ({
  language,
  isFixed = false,
  leftMargin = 0
}: Props) => {
  const locale = language.locale
  const currentYear = new Date().getFullYear()
  const pathBuilder = new PathBuilder(language)

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 1,
        mt: isFixed ? 0 : 'auto',
        width: isFixed ? `calc(100% - ${leftMargin}px)` : '100%',
        position: isFixed ? 'fixed' : 'relative',
        bottom: isFixed ? 0 : 'auto',
        left: isFixed ? leftMargin : 'auto',
        zIndex: isFixed ? 1000 : 'auto',
        transition:
          'left 200ms cubic-bezier(0.4, 0, 0.2, 1), width 200ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
          gap: 1
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {currentYear}{' '}
          <Link
            href="https://ledenm.com"
            target="_blank"
            rel="noopener noreferrer"
            color="text.secondary"
            underline="hover"
          >
            ledenm.com
          </Link>
          . All rights reserved.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <Link
            href={pathBuilder.privacy}
            color="text.secondary"
            underline="hover"
            variant="body2"
          >
            {language.isEnglish ? 'Privacy Policy' : 'プライバシーポリシー'}
          </Link>
          <Link
            href={pathBuilder.terms}
            color="text.secondary"
            underline="hover"
            variant="body2"
          >
            {language.isEnglish ? 'Terms of Service' : '利用規約'}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
