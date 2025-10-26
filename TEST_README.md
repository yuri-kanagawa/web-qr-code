# テストとStorybook

このプロジェクトでは、Unit Test、E2Eテスト、コンポーネントカタログのためのツールをセットアップしています。

## 🧪 Unit Test (Vitest)

### セットアップ

Vitestは既にインストールされています。

### テストの実行

```bash
# すべてのUnit Testを実行
yarn test

# ウォッチモードで実行（推奨）
yarn test:watch

# UIモードで実行
yarn test:ui

# カバレッジレポートを生成
yarn test:coverage
```

### テストファイルの配置

テストファイルはテスト対象と同じディレクトリに配置します:

```
src/domains/valueObjects/
  ├─ geoLocation/
  │   ├─ valueObject.ts
  │   └─ valueObject.test.ts     ← ここにテスト
  ├─ base64/
  │   ├─ valueObject.ts
  │   └─ valueObject.test.ts     ← ここにテスト
  └─ email/
      ├─ valueObject.ts
      └─ valueObject.test.ts     ← ここにテスト
```

### テストの書き方

```typescript
import { describe, it, expect } from 'vitest'
import { GeoLocation } from '@/domains/entities/geoLocation'
import { Language } from '@/domains/valueObjects/language'

describe('GeoLocation', () => {
  it('正しい緯度・経度で作成できる', () => {
    const geoLocation = GeoLocation.create(
      35.68,
      139.76,
      'Tokyo',
      Language.default()
    )

    expect(geoLocation).not.toBeNull()
    expect(geoLocation?.latitude).toBe(35.68)
  })
})
```

### 既存のテスト例

- `src/domains/valueObjects/geoLocation/valueObject.test.ts`
- `src/domains/valueObjects/base64/valueObject.test.ts`
- `src/domains/valueObjects/email/valueObject.test.ts`
- `src/infrastructure/repositories/geoLocation/IpApiGeoLocationRepository.test.ts`

## 🎭 E2Eテスト (Playwright)

### セットアップ

Playwrightは既にインストールされています。ブラウザをインストールするには:

```bash
npx playwright install
```

### テストの実行

```bash
# すべてのE2Eテストを実行
yarn test:e2e

# UIモードでテストを実行（推奨）
yarn test:e2e:ui

# ヘッドモードでテストを実行（ブラウザを表示）
yarn test:e2e:headed

# デバッグモードでテストを実行
yarn test:e2e:debug
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

### Unit Test (推奨順)

1. **Domain層（最優先）**: Value Objects、Domain Services
2. **Infrastructure層**: Repository実装（モックを使用）
3. **Hooks**: 複雑なロジックを持つカスタムフック
4. **UI Components**: 必要な場合のみ（基本はStorybookで十分）

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

## 📊 テスト戦略

```
テストピラミッド:
        /\
       /  \  E2E Tests (少数・重要フローのみ)
      /----\
     /      \ Integration Tests (中)
    /--------\
   /          \ Unit Tests (多数・Domain層中心)
  /____________\
```

### 優先順位:

1. 🔴 **Domain層のUnit Test** - ビジネスロジックの核心
2. 🟠 **E2Eテスト** - クリティカルなユーザーフロー
3. 🟡 **Repository層のUnit Test** - 外部依存のテスト
4. 🟢 **Storybook** - UIコンポーネントの視覚確認

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
