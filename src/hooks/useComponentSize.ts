import { useEffect, useRef, useState } from 'react'

export const useComponentSize = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])
  return {
    width,
    setWidth
  }
}
