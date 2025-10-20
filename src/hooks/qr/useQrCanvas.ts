import { MutableRefObject, useCallback, useRef } from 'react'

/**
 * QRコード用のCanvas要素を管理するフック
 */
export const useQrCanvas = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const getCanvasFromRef = useCallback((): HTMLCanvasElement | null => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>
    console.log('getCanvas - ref.current:', mutableRef.current)

    if (!mutableRef.current) return null

    // すべての子要素を詳細に調べる
    const children = mutableRef.current.children
    console.log('getCanvas - children:', children, 'length:', children?.length)

    // 子要素を順番にチェック
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      console.log(`getCanvas - child[${i}]:`, child, 'tagName:', child.tagName)

      // Canvas要素を直接探す
      if (child instanceof HTMLCanvasElement) {
        console.log('getCanvas - Found canvas at index:', i)
        return child
      }

      // 子要素の中にCanvasがあるかチェック
      const canvasInChild = child.querySelector('canvas')
      if (canvasInChild) {
        console.log('getCanvas - Found canvas in child:', canvasInChild)
        return canvasInChild
      }
    }

    // querySelectorでCanvas要素を直接探す
    const canvas = mutableRef.current.querySelector('canvas')
    console.log('getCanvas - querySelector canvas:', canvas)

    return canvas
  }, [])

  return {
    canvasRef: ref,
    getCanvas: getCanvasFromRef
  }
}
