/**
 * 環境変数の使用例
 *
 * @example
 * ```typescript
 * import { env, getAppUrl } from '@/config'
 *
 * // アプリケーションのベースURLを取得
 * const appUrl = getAppUrl()
 * console.log(appUrl) // 開発: http://localhost:3000, 本番: https://your-domain.com
 *
 * // 完全なURLを生成
 * const fullUrl = `${appUrl}/qr/123`
 *
 * // 環境を判定
 * if (isProduction()) {
 *   console.log('本番環境です')
 * }
 * ```
 */

export const exampleUsage = {
  // QRコード共有用のURL生成
  generateShareUrl: (qrId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/qr/${qrId}`
  },

  // API エンドポイントのURL生成
  generateApiUrl: (endpoint: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/api/${endpoint}`
  }
}
