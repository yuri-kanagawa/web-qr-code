import type { Preview } from '@storybook/nextjs'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: {
      appDirectory: true
    }
  },
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline
    })
  ]
}

export default preview