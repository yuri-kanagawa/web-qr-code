import { MutableRefObject, useCallback, useRef } from 'react'

/**
 * QRコード用のCanvas要素を管理するフック
 */
export const useQrCanvas = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const getCanvasFromRef = useCallback((): HTMLCanvasElement | null => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>
    console.log('getCanvas - ref.current:', mutableRef.current)
    const children = mutableRef.current?.children
    console.log('getCanvas - children:', children, 'length:', children?.length)
    if (!children || children.length === 0) return null

    const canvas = children[0] as HTMLCanvasElement | null
    console.log('getCanvas - canvas:', canvas, 'isCanvas:', canvas instanceof HTMLCanvasElement)
    return canvas instanceof HTMLCanvasElement ? canvas : null
  }, [])

  return {
    canvasRef: ref,
    getCanvas: getCanvasFromRef
  }
}
