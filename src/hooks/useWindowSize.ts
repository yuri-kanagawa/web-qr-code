import { useMediaQuery } from '@mui/system'
import { useEffect, useState } from 'react'
import { theme } from '../app/_state'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    // window オブジェクトがクライアントサイドでのみ利用可能なので、useEffect内で設定
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // 初期サイズを設定
    handleResize()

    // リサイズ時に再計算
    window.addEventListener('resize', handleResize)

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 空の依存配列で、最初のレンダリング後に1度だけ実行

  const isOverMobile: boolean = useMediaQuery(theme.breakpoints.up('sm'))
  const isLessTablet: boolean = useMediaQuery(theme.breakpoints.down('md'))

  const isOverTablet: boolean = useMediaQuery(theme.breakpoints.up('md'))
  const isLessLaptop: boolean = useMediaQuery(theme.breakpoints.down('lg'))

  const isOverLaptop: boolean = useMediaQuery(theme.breakpoints.up('lg'))
  const isLessDesktop: boolean = useMediaQuery(theme.breakpoints.down('xl'))

  const isMobile: boolean = isLessTablet
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
