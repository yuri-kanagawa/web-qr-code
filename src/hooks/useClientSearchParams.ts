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
      const updateParams = () => {
        setSearchParams(new URLSearchParams(window.location.search))
      }

      // 初期読み込み
      updateParams()

      // URLが変更されたときに更新
      const handleChange = () => {
        updateParams()
      }

      // popstateイベント（ブラウザの戻る/進む）を監視
      window.addEventListener('popstate', handleChange)

      // pushState/replaceStateを監視（カスタムナビゲーション）
      const originalPushState = window.history.pushState
      const originalReplaceState = window.history.replaceState

      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args)
        setTimeout(updateParams, 0)
      }

      window.history.replaceState = function (...args) {
        originalReplaceState.apply(window.history, args)
        setTimeout(updateParams, 0)
      }

      return () => {
        window.removeEventListener('popstate', handleChange)
        window.history.pushState = originalPushState
        window.history.replaceState = originalReplaceState
      }
    }
  }, [])

  // サーバーサイドレンダリング時は空のURLSearchParamsを返す
  return searchParams ?? new URLSearchParams()
}
