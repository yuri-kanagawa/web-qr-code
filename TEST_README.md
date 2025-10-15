# テストとStorybook

このプロジェクトでは、E2Eテストとコンポーネントカタログのためのツールをセットアップしています。

## 🧪 E2Eテスト (Playwright)

### セットアップ

Playwrightは既にインストールされています。ブラウザをインストールするには:

```bash
npx playwright install
```

### テストの実行

```bash
# すべてのテストを実行
yarn test

# UIモードでテストを実行（推奨）
yarn test:ui

# ヘッドモードでテストを実行（ブラウザを表示）
yarn test:headed

# デバッグモードでテストを実行
yarn test:debug
```

### テストファイルの配置

テストファイルは `e2e/` ディレクトリに配置します:

```
e2e/
  ├─ example.spec.ts
  ├─ url-qr-code.spec.ts
  └─ map-qr-code.spec.ts
```

### テストの書き方

```typescript
import { test, expect } from '@playwright/test'

test.describe('機能名', () => {
  test('テストケース名', async ({ page }) => {
    await page.goto('/url')
    
    const input = page.locator('input[type="url"]')
    await input.fill('https://example.com')
    
    const qrCode = page.locator('canvas')
    await expect(qrCode).toBeVisible()
  })
})
```

## 📚 Storybook

### Storybookの起動

```bash
# 開発サーバーを起動
yarn storybook

# ビルド
yarn build-storybook
```

ブラウザで http://localhost:6006 を開きます。

### Storyファイルの配置

Storyファイルはコンポーネントと同じディレクトリに配置します:

```
src/ui/cores/Button/
  ├─ Button.tsx
  └─ Button.stories.tsx
```

### Storyの書き方

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'UI/Cores/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary'
  }
}
```

## 📖 既存のStory例

- `src/ui/cores/Button/Button.stories.tsx`
- `src/ui/cores/TextField/TextField.stories.tsx`

これらを参考に、他のコンポーネントのStoryを作成してください。

## 🎯 ベストプラクティス

### E2Eテスト
- ユーザーの実際の操作フローをテスト
- 重要な機能を優先的にカバー
- テストは独立して実行可能に
- `data-testid` 属性でセレクタを安定化

### Storybook
- コンポーネントの全バリエーションを網羅
- インタラクティブなコントロールを提供
- アクセシビリティをチェック（addon-a11y）
- ドキュメントを自動生成（autodocs）

## 🚀 CI/CDでの実行

```yaml
# GitHub Actionsの例
- name: Install dependencies
  run: yarn install

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: yarn test

- name: Build Storybook
  run: yarn build-storybook
```

