This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## プロジェクト構造

このプロジェクトはClean Architectureの原則に従い、関心の分離を明確に行っています。

### `/src/domains`

**ドメイン層** - コアビジネスロジックとエンティティ

- **エンティティ**: コアビジネスオブジェクト（例: `QrCode`, `GeoLocation`, `Device`）
- **値オブジェクト**: ドメイン概念を表現する不変オブジェクト（例: `Language`, `QrValue`, `QrSettings`）
- **リポジトリ**: データアクセスの契約を定義するリポジトリインターフェース
- **サービス**: ビジネスロジックをカプセル化するドメインサービス

**主な特徴:**

- フレームワークに依存しない純粋なTypeScript
- ビジネスロジックのみを含む
- 他のレイヤーへの依存がない

### `/src/application`

**アプリケーション層** - ドメインロジックを調整するユースケース

- **ユースケース**: アプリケーション固有のワークフロー（例: `ConfirmQrCodeUseCase`, `DownloadQrCodeUseCase`）
- **サービス**: ユースケースとリポジトリ間の調整を行うアプリケーションサービス
- **DTO**: レイヤー間でデータを渡すためのデータ転送オブジェクト

**主な特徴:**

- ドメインロジックを調整
- リポジトリインターフェースを使用（実装は使用しない）
- ユーザーインタラクションを表現するユースケースを実装

### `/src/infrastructure`

**インフラストラクチャ層** - 技術的な実装と外部サービス

- **リポジトリ**: リポジトリインターフェースの具体的な実装
  - QRコード生成（`QrGeneratorRepository`）
  - QRコードスキャン（`QrScannerRepository`）
  - 位置情報（`BrowserGeoLocationRepository`, `IpApiGeoLocationRepository`）
- **外部サービス**: サードパーティのAPIやライブラリとの統合
- **プロセッサー**: 処理を行うヘルパークラス（例: キャンバス透過処理、ロゴ処理）

**主な特徴:**

- 技術的な詳細を含む
- ドメイン層のリポジトリインターフェースを実装
- プラットフォーム固有の懸念事項を処理（ブラウザAPIなど）

### `/src/features`

**機能** - 機能ベースのコンポーネントとビジネスロジック

機能に特化したドメイン固有の実装で、UIコンポーネントとビジネスロジックを組み合わせます。

### `/src/ui`

**UI層** - プレゼンテーションコンポーネント

- **ページ**: Next.jsのページコンポーネント
- **フラグメント**: 再利用可能なUIフラグメント
- **コア**: コアUIコンポーネント（ボタン、入力など）
- **ストーリー**: コンポーネントドキュメント用のStorybookストーリー

**主な特徴:**

- プレゼンテーションロジックのみ
- ビジネスロジックを直接含まない
- ユーザーインタラクションにはユースケースを使用

### `/src/locales`

**国際化** - 多言語サポート

- 英語（`en`）、日本語（`ja`）、フランス語（`fr`）のサポート
- メッセージ翻訳
- 複数言語でのSEO用メタタグ

### `/src/stores`

**状態管理** - React Hooksを使用した状態管理

### `/src/hooks`

**カスタムフック** - 再利用可能なReactフック

### `/src/lib`

**ユーティリティ** - 共有ユーティリティ関数とヘルパー

## アーキテクチャの原則

1. **依存関係ルール**: 依存関係は内側に流れる - 外側のレイヤーは内側のレイヤーに依存するが、その逆はない
2. **インターフェース分離**: リポジトリインターフェースはドメイン層に、実装はインフラ層に配置
3. **単一責任の原則**: 各クラスには変更する理由が1つだけ
4. **開放閉鎖の原則**: 拡張に対して開いており、変更に対して閉じている

## セットアップ

まず、開発サーバーを起動します:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`app/page.tsx` を編集することで、ページの変更を開始できます。ファイルを編集すると、ページが自動的に更新されます。

このプロジェクトは [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) を使用して、カスタムのGoogle FontであるInterを自動的に最適化して読み込みます。

## 詳細はこちら

Next.jsの詳細については、以下のリソースを参照してください:

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsの機能とAPIを学習
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル

[Next.js GitHub repository](https://github.com/vercel/next.js/) をチェックしてください - フィードバックとコントリビューションをお待ちしています！

## Vercelへのデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの作成元である[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細は[Next.js deployment documentation](https://nextjs.org/docs/deployment)を確認してください。
