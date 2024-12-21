import { useEffect, useLayoutEffect, useState } from 'react'
import { useMediaQuery } from '@mui/system'
import { createTheme } from '@mui/material/styles'
type WindowSize = {
  width: number
  height: number
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const resize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const isOverMobile: boolean = useMediaQuery(theme.breakpoints.up('sm'))
  const isLessTablet: boolean = useMediaQuery(theme.breakpoints.down('md'))

  const isOverTablet: boolean = useMediaQuery(theme.breakpoints.up('md'))
  const isLessLaptop: boolean = useMediaQuery(theme.breakpoints.down('lg'))

  const isOverLaptop: boolean = useMediaQuery(theme.breakpoints.up('lg'))
  const isLessDesktop: boolean = useMediaQuery(theme.breakpoints.down('xl'))

  const isMobile: boolean = isOverMobile && isLessTablet
  const isTablet: boolean = isOverTablet && isLessLaptop
  const isLaptop: boolean = isOverLaptop && isLessDesktop
  const isOverDesktop: boolean = useMediaQuery(theme.breakpoints.up('xl'))

  return {
    ...windowSize,
    isOverMobile,
    isLessTablet,
    isOverTablet,
    isLessLaptop,
    isOverLaptop,
    isLessDesktop,
    isMobile,
    isTablet,
    isLaptop,
    isOverDesktop
  }
}
