import { cyan } from '@mui/material/colors'

export const themeColors = {
  primary: {
    main: cyan['700'],
    light: cyan['400']
  },
  secondary: {
    main: '#E0C2FF',
    light: '#F5EBFF',
    contrastText: '#47008F'
  },
  dark: {},
  success: {
    main: '#009688'
  },
  error: {
    main: '#B33E5C'
  }
} as const
