import { expect, test } from '@playwright/test'

test.describe('トップページ', () => {
  test('トップページが正しく表示される', async ({ page }) => {
    await page.goto('/')

    // ページタイトルを確認
    await expect(page).toHaveTitle(/QR/)

    // メインコンテンツが表示されることを確認
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('機能カードが表示される', async ({ page }) => {
    await page.goto('/')

    // URL QRコード生成カードを確認
    const urlCard = page.getByText('URL')
    await expect(urlCard).toBeVisible()

    // Wi-Fi QRコード生成カードを確認
    const wifiCard = page.getByText('Wi-Fi')
    await expect(wifiCard).toBeVisible()
  })
})

test.describe('URL QRコード生成', () => {
  test('URLを入力してQRコードを生成できる', async ({ page }) => {
    await page.goto('/url')

    // URLを入力
    const urlInput = page.locator('input[type="url"]').first()
    await urlInput.fill('https://example.com')

    // QRコードが生成されることを確認
    // （実際のセレクタはコンポーネントに合わせて調整）
    const qrCode = page.locator('canvas, svg').first()
    await expect(qrCode).toBeVisible()
  })

  test('無効なURLの場合エラーが表示される', async ({ page }) => {
    await page.goto('/url')

    // 無効なURLを入力
    const urlInput = page.locator('input[type="url"]').first()
    await urlInput.fill('invalid-url')
    await urlInput.blur()

    // エラーメッセージが表示されることを確認
    const errorMessage = page.getByText(/invalid|無効|error/i)
    await expect(errorMessage).toBeVisible()
  })
})

test.describe('言語切り替え', () => {
  test('日本語と英語を切り替えられる', async ({ page }) => {
    await page.goto('/')

    // 英語ページ
    await expect(page).toHaveURL(/\/|\/en/)

    // 日本語に切り替え
    await page.goto('/ja')
    await expect(page).toHaveURL(/\/ja/)

    // ページが日本語で表示されることを確認
    const japaneseContent = page.getByText(/QRコード|作成|生成/)
    await expect(japaneseContent).toBeVisible()
  })
})

test.describe('レスポンシブデザイン', () => {
  test('モバイル表示で正しくレイアウトされる', async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // メインコンテンツが表示される
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('タブレット表示で正しくレイアウトされる', async ({ page }) => {
    // タブレットサイズに設定
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    // メインコンテンツが表示される
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })
})
