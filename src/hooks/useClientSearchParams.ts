import { useEffect, useState } from 'react'

/**
 * クライアント側でURL検索パラメータを読み取るフック
 * useSearchParams()の代替として、静的エクスポートに対応
 */
export const useClientSearchParams = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)

  useEffect(() => {
    // クライアント側でのみ実行
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSearchParams(params)

      // URLが変更されたときに更新
      const handleChange = () => {
        setSearchParams(new URLSearchParams(window.location.search))
      }

      // popstateイベント（ブラウザの戻る/進む）を監視
      window.addEventListener('popstate', handleChange)

      return () => {
        window.removeEventListener('popstate', handleChange)
      }
    }
  }, [])

  // サーバーサイドレンダリング時は空のURLSearchParamsを返す
  return searchParams ?? new URLSearchParams()
}
