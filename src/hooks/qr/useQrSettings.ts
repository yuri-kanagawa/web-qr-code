import { useCallback, useState } from 'react'

// デフォルト設定
const defaultSettings = {
  colors: {
    bgColor: { value: '#FFFFFF' },
    fgColor: { value: '#000000' },
    eyeColor1: { value: '#000000' },
    eyeColor2: { value: '#000000' },
    eyeColor3: { value: '#000000' }
  },
  size: { value: 200 },
  ecLevel: { value: 'M' as 'L' | 'M' | 'Q' | 'H' },
  logo: {
    width: 0,
    height: 0,
    opacity: 1,
    paddingStyle: 'square' as 'square' | 'circle'
  },
  eye: {
    radius1: 0,
    radius2: 0,
    radius3: 0
  },
  enableCORS: false
}

export const useQrSettings = () => {
  const [settings, setSettings] = useState(defaultSettings)

  const updateBgColor = useCallback((color: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, bgColor: { value: color } }
    }))
  }, [])

  const updateFgColor = useCallback((color: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, fgColor: { value: color } }
    }))
  }, [])

  const updateEyeColor1 = useCallback((color: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, eyeColor1: { value: color } }
    }))
  }, [])

  const updateEyeColor2 = useCallback((color: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, eyeColor2: { value: color } }
    }))
  }, [])

  const updateEyeColor3 = useCallback((color: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, eyeColor3: { value: color } }
    }))
  }, [])

  const updateSize = useCallback((size: number) => {
    setSettings((prev) => ({
      ...prev,
      size: { value: size }
    }))
  }, [])

  const updateEcLevel = useCallback((level: 'L' | 'M' | 'Q' | 'H') => {
    setSettings((prev) => ({
      ...prev,
      ecLevel: { value: level }
    }))
  }, [])

  const updateLogoWidth = useCallback((width: number) => {
    setSettings((prev) => ({
      ...prev,
      logo: { ...prev.logo, width }
    }))
  }, [])

  const updateLogoHeight = useCallback((height: number) => {
    setSettings((prev) => ({
      ...prev,
      logo: { ...prev.logo, height }
    }))
  }, [])

  const updateLogoOpacity = useCallback((opacity: number) => {
    setSettings((prev) => ({
      ...prev,
      logo: { ...prev.logo, opacity }
    }))
  }, [])

  const updateLogoPaddingStyle = useCallback((style: 'square' | 'circle') => {
    setSettings((prev) => ({
      ...prev,
      logo: { ...prev.logo, paddingStyle: style }
    }))
  }, [])

  const updateEyeRadius1 = useCallback((radius: number) => {
    setSettings((prev) => ({
      ...prev,
      eye: { ...prev.eye, radius1: radius }
    }))
  }, [])

  const updateEyeRadius2 = useCallback((radius: number) => {
    setSettings((prev) => ({
      ...prev,
      eye: { ...prev.eye, radius2: radius }
    }))
  }, [])

  const updateEyeRadius3 = useCallback((radius: number) => {
    setSettings((prev) => ({
      ...prev,
      eye: { ...prev.eye, radius3: radius }
    }))
  }, [])

  const updateEnableCORS = useCallback((enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      enableCORS: enabled
    }))
  }, [])

  return {
    settings,
    updateBgColor,
    updateFgColor,
    updateEyeColor1,
    updateEyeColor2,
    updateEyeColor3,
    updateSize,
    updateEcLevel,
    updateLogoWidth,
    updateLogoHeight,
    updateLogoOpacity,
    updateLogoPaddingStyle,
    updateEyeRadius1,
    updateEyeRadius2,
    updateEyeRadius3,
    updateEnableCORS
  }
}
