import { MutableRefObject, useCallback, useRef } from 'react'

/**
 * QRコード用のCanvas要素を管理するフック
 */
export const useQrCanvas = () => {

  const getCanvasFromRef = useCallback((): HTMLCanvasElement | null => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>
    const children = mutableRef.current?.children
    if (!children || children.length === 0) return null

    const canvas = children[0] as HTMLCanvasElement | null
    return canvas instanceof HTMLCanvasElement ? canvas : null
  }, [])

  return {
    getCanvas: getCanvasFromRef
  }
}
