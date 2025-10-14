/**
 * URLSearchParamsの型安全なラッパー
 * ブラウザのクエリパラメータを管理する
 */
export class SearchParamsManager {
  /**
   * 現在のURLにクエリパラメータを追加または更新
   * @param params - 追加するパラメータのオブジェクト
   * @example
   * SearchParamsManager.add({ size: 150, color: 'red' })
   */
  static add(
    params: Record<
      string,
      string | number | boolean | (string | number | boolean)[]
    >
  ): void {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    const searchParams = url.searchParams

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        // 配列の場合はカンマ区切りの文字列に変換
        searchParams.set(key, value.map(String).join(','))
      } else {
        // プリミティブ型は文字列に変換
        searchParams.set(key, String(value))
      }
    }

    url.search = searchParams.toString()
    const newUrl = url.toString()
    window.history.replaceState({}, '', newUrl)
  }

  /**
   * 指定したキーのクエリパラメータを削除
   * @param keys - 削除するキーの配列
   * @example
   * SearchParamsManager.remove(['size', 'color'])
   */
  static remove(keys: string[]): void {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    const searchParams = url.searchParams

    keys.forEach((key) => searchParams.delete(key))

    url.search = searchParams.toString()
    const newUrl = url.toString()
    window.history.replaceState({}, '', newUrl)
  }

  /**
   * クエリパラメータの値を取得
   * @param key - 取得するキー
   * @returns パラメータの値、存在しない場合はnull
   * @example
   * const size = SearchParamsManager.get('size')
   */
  static get(key: string): string | null {
    if (typeof window === 'undefined') return null

    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(key)
  }

  /**
   * すべてのクエリパラメータをクリア
   * @example
   * SearchParamsManager.clear()
   */
  static clear(): void {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.search = ''
    const newUrl = url.toString()
    window.history.replaceState({}, '', newUrl)
  }

  /**
   * クエリパラメータが存在するか確認
   * @param key - 確認するキー
   * @returns 存在する場合はtrue
   * @example
   * if (SearchParamsManager.has('size')) { ... }
   */
  static has(key: string): boolean {
    if (typeof window === 'undefined') return false

    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.has(key)
  }
}
