import { cyan, teal, indigo } from '@mui/material/colors'

export const colors = {
  primary: {
    main: cyan['700'],
    light: cyan['400']
    // main: teal[500]
    // main: '#3f51b5'
    // main: '#3f51b5'
    // light: will be calculated form palette.primary.main,
    // dark: will be calculated form palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    main: '#E0C2FF',
    light: '#F5EBFF',
    // dark: will be calculated form palette.secondary.main,
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
