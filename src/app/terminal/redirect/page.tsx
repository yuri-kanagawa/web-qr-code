'use client'

import { useEffect } from 'react'
import { useQrCode } from '@/hooks'

export default function Page() {
  const { deviceOsIndex, urls } = useQrCode()
  useEffect(() => {
    console.log(deviceOsIndex, urls)
    let url = urls[deviceOsIndex]
    if (url == null) {
      return
    }
    // URLが相対URLの場合、http:// を補完
    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url // http:// を追加して外部リンクとして解釈
    }
    console.log(url)
    window.location.href = url
  }, [urls, deviceOsIndex])
  return <></>
}
