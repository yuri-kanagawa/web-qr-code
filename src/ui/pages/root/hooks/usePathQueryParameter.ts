import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { boolean } from 'zod'
import { useQrcode } from '@/hooks'
import { addQueryParameter } from '@/utils/queryParameter'
import { useMemo } from 'react'

export const usePathQueryParameter = () => {
  const searchParams = useSearchParams()

  // クエリパラメーターを直接取得する
  const url = useMemo(() => searchParams.get('url') ?? '', [searchParams])
  const setUrl = (value: string) => {
    addQueryParameter({ url: value })
  }
  const qrcode = useQrcode()
  return { url, setUrl, ...qrcode }
}
