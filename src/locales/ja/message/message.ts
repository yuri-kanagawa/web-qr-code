export const message = {
  // Validation messages
  validation: {
    // Common validation messages
    common: {
      required: '入力してください',
      invalid: '無効です',
      minLength: (min: number) => `${min}文字以上で入力してください`,
      maxLength: (max: number) => `${max}文字以下で入力してください`,
      range: (min: number, max: number) =>
        `${min}から${max}の範囲で入力してください`
    },

    // Email validation
    email: {
      invalid: 'メールが無効',
      required: 'メールアドレスを入力してください',
      atLeastOneField:
        'メールアドレス、件名、本文のいずれか1つは入力してください',
      pleaseEnterValid: '有効なメールアドレスを入力してください',
      tooLong: (max: number) => `メールアドレスが長すぎます（最大${max}文字）`
    },

    // URL validation
    url: {
      invalid: 'URLが無効です',
      required: 'URLを入力してください',
      pleaseEnterValid: '有効なURLを入力してください'
    },

    // Phone validation
    phone: {
      invalid: '電話番号が無効です',
      required: '電話番号を入力してください',
      pleaseEnterValid:
        '有効な電話番号の形式で入力してください（例: +1-555-123-4567, 03-1234-5678）',
      invalidCharacters:
        '電話番号には数字、+、-、()、スペース、ドットのみ使用できます'
    },

    // Map coordinates validation
    map: {
      latitude: {
        required: '緯度を入力してください',
        range: '緯度は-90から90の範囲で入力してください',
        pleaseEnterValid: (min: number, max: number) =>
          `緯度は${min}から${max}の範囲で指定してください`
      },
      longitude: {
        required: '経度を入力してください',
        range: '経度は-180から180の範囲で入力してください',
        pleaseEnterValid: (min: number, max: number) =>
          `経度は${min}から${max}の範囲で指定してください`
      }
    },

    // SMS validation
    sms: {
      bothEmpty: '電話番号と本文の両方を空にはできません'
    },

    // Text validation
    text: {
      required: '入力してください',
      tooLong: (max: number) => `テキストが長すぎます（最大${max}文字）`
    },

    // Device validation
    device: {
      minSelection: '一つ以上選択しないと',
      notSelected: '未選択です',
      atLeastOneCompleteSet:
        '少なくとも1つの完全なセット（デバイス + OS + URL）が必要です',
      invalidType: '無効なデバイスタイプです'
    },

    // WiFi validation
    wifi: {
      ssid: {
        tooLong: 'SSIDが長すぎます（最大32文字）'
      },
      password: {
        wrongLength: 'パスワードは8～63文字で入力してください'
      }
    },

    // Address validation
    address: {
      tooLong: (max: number) => `住所が長すぎます（最大${max}文字）`
    },

    // Image file validation
    imageFile: {
      notSpecified: 'ファイルが指定されていません',
      unsupportedFormat: (type: string) =>
        `サポートされていない画像形式です: ${type}`,
      tooLarge: (max: string) =>
        `ファイルサイズが大きすぎます（最大: ${max}MB）`
    },

    // Latitude validation
    latitude: {
      pleaseEnterValid: '有効な緯度を入力してください'
    },

    // Longitude validation
    longitude: {
      pleaseEnterValid: '有効な経度を入力してください'
    },

    // OS validation
    os: {
      pleaseEnterValid: '有効なOS名を入力してください',
      invalidType: '無効なOSタイプです'
    },

    // Country validation
    country: {
      pleaseEnterValid: '有効な国名を入力してください',
      invalidCode: '無効な国コードです'
    },

    // Name validation
    name: {
      pleaseEnterValid: '有効な名前を入力してください',
      tooLong: (max: number) => `名前が長すぎます（最大${max}文字）`
    },

    // Subject validation
    subject: {
      pleaseEnterValid: '有効な件名を入力してください'
    },

    // Body validation
    body: {
      pleaseEnterValid: '有効な本文を入力してください'
    },

    // Social media validation
    socialMedia: {
      pleaseEnterValid: '有効なソーシャルメディアURLを入力してください'
    },

    // Base64 validation
    base64: {
      pleaseEnterValid: '有効なbase64文字列を入力してください',
      tooLarge: (max: string) =>
        `ファイルサイズが大きすぎます（最大: ${max}MB）`,
      invalidFileType: '無効なファイルタイプです'
    },

    // QR style validation
    qrStyle: {
      pleaseEnterValid: '有効なQRスタイルを入力してください'
    },

    // Eye radius validation
    eyeRadius: {
      pleaseEnterValid: '有効な目の半径を入力してください',
      outOfRange: '目の半径が範囲外です'
    },

    // QR color validation
    qrColor: {
      pleaseEnterValid: '有効な色を入力してください'
    },

    // EC level validation
    ecLevel: {
      pleaseEnterValid: '有効なエラー訂正レベルを入力してください'
    }
  },

  // Common messages
  common: {
    // Button texts
    buttons: {
      confirm: '確認',
      download: 'ダウンロード',
      cancel: 'キャンセル',
      save: '保存',
      edit: '編集',
      delete: '削除',
      add: '追加',
      remove: '削除',
      disagree: '同意しない',
      close: '閉じる',
      execute: '実行',
      getCurrentLocation: '現在地を取得'
    },

    // Loading states
    loading: {
      loading: '読み込み中...',
      generating: '生成中...',
      saving: '保存中...',
      uploading: 'アップロード中...'
    },

    // Success messages
    success: {
      saved: '保存しました',
      generated: '生成しました',
      downloaded: 'ダウンロードしました',
      uploaded: 'アップロードしました'
    },

    // Error messages
    error: {
      title: 'エラー',
      general: 'エラーが発生しました',
      network: 'ネットワークエラーが発生しました',
      validation: '入力内容を確認してください',
      fileTooLarge: 'ファイルサイズが大きすぎます',
      unsupportedFormat: 'サポートされていない形式です',
      qrCodeReadFailed: 'QRコードの読み込みに失敗しました',
      noDeviceDestination:
        'このデバイスもしくはOSと一致する遷移先が存在しませんでした',
      invalidUrlFormat: '遷移先のURLが無効です。',
      qrValueCannotBeEmpty: 'QR値を入力してください',
      geolocation: {
        notSupported: 'このブラウザでは位置情報がサポートされていません。',
        failedToGet: '位置情報の取得に失敗しました。',
        failedToCreate: 'GeoLocationの作成に失敗しました',
        ipNotSupported:
          'BrowserGeoLocationRepositoryはIPベースの位置情報をサポートしていません'
      },
      qrScanner: {
        imageTooSmall: (width: number, height: number) =>
          `QRコードのサイズが小さすぎます (${width}x${height}px)。読み取りに失敗する可能性があります。`,
        invalidResultStructure: '無効なQRスキャン結果構造です',
        failedToLoadImage: '画像の読み込みに失敗しました'
      },
      qrGenerator: {
        invalidQrData: '無効なQRコードデータです',
        sizeTooSmall: (size: number) =>
          `QRコードのサイズが小さすぎます（${size}px）。75px以上にしてください。`,
        generationFailed: 'QRコードキャンバスの生成に失敗しました',
        canvasContextFailed: 'キャンバスコンテキストの取得に失敗しました',
        svgGenerationTimeout: 'SVG生成がタイムアウトしました',
        svgLoadFailed: 'SVG画像の読み込みに失敗しました'
      }
    },

    // Form labels
    form: {
      required: '必須',
      optional: '任意',
      select: '選択してください',
      enter: '入力してください'
    },

    // QR Information Dialog
    qrInformationDialog: {
      titles: {
        deviceRedirect: 'デバイス振り分けQRコード',
        sms: 'SMS',
        map: '地図',
        url: 'URL',
        phone: '電話'
      },
      messages: {
        deviceRedirect: (count: number) =>
          `このQRコードは、デバイス/OSに応じて${count}種類のURLにリダイレクトします。`,
        contains: (value: string) =>
          `このQRコードには次の内容が含まれています: ${value}`
      },
      labels: {
        redirectUrls: 'リダイレクト先URL:'
      },
      buttons: {
        viewDetails: '詳細を見る',
        openMap: '地図を開く',
        openUrl: 'URLを開く',
        call: '電話をかける',
        sendSms: 'SMSを送る'
      }
    }
  },

  // Legal documents
  legal: {
    privacy: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日：',
      sections: {
        informationCollection: {
          title: '1. 情報の収集',
          content:
            'このQRコードジェネレーターは完全にブラウザ内で動作します。個人情報やQRコードのコンテンツを収集、保存、または当社のサーバーに送信することはありません。すべてのQRコード生成はお使いのデバイス上でローカルに実行されます。'
        },
        cookies: {
          title: '2. Cookieとローカルストレージ',
          content:
            'より良いユーザー体験のために、ブラウザのローカルストレージを使用してQRコードの設定や環境設定を保存する場合があります。このデータはお使いのデバイスに保存され、当社に送信されることはありません。'
        },
        thirdParty: {
          title: '3. 第三者サービス',
          content:
            'このウェブサイトは、分析やホスティングのために第三者サービスを使用する場合があります。これらのサービスは、それぞれのプライバシーポリシーに記載されている情報を収集する場合があります。'
        },
        dataSecurity: {
          title: '4. データセキュリティ',
          content:
            'すべてのQRコード生成はブラウザ内でローカルに行われるため、データがお使いのデバイスを離れることはありません。作成されたコンテンツにアクセスしたり閲覧したりすることはできません。'
        },
        changes: {
          title: '5. プライバシーポリシーの変更',
          content:
            'このプライバシーポリシーは随時更新される場合があります。変更があった場合は、このページに更新日とともに掲載されます。'
        },
        contact: {
          title: '6. お問い合わせ',
          content:
            'このプライバシーポリシーに関するご質問がある場合は、以下までお問い合わせください：'
        }
      }
    },
    terms: {
      title: '利用規約',
      lastUpdated: '最終更新日：',
      sections: {
        acceptance: {
          title: '1. 規約の承認',
          content:
            'このQRコードジェネレーターサービスにアクセスして使用することにより、本規約の条項および規定に拘束されることに同意したものとみなされます。'
        },
        useOfService: {
          title: '2. サービスの使用',
          content:
            'このサービスは個人利用および商用利用のために無料で提供されています。合法的な目的のためにQRコードを生成することができます。作成したコンテンツとその使用については、お客様が責任を負うものとします。'
        },
        prohibited: {
          title: '3. 禁止事項',
          content:
            'お客様は、以下のQRコードを作成するために本サービスを使用しないことに同意します：違法なコンテンツを含むもの、知的財産権を侵害するもの、マルウェアやウイルスを配布するもの、フィッシングや詐欺行為を行うもの、または適用される法律や規制に違反するもの。'
        },
        warranty: {
          title: '4. 免責事項',
          content:
            '本サービスは「現状のまま」提供され、明示的または黙示的な保証はありません。サービスが中断されず、安全で、エラーがないことを保証するものではありません。'
        },
        liability: {
          title: '5. 責任の制限',
          content:
            '本サービスの使用または使用不能から生じる直接的、間接的、偶発的、特別、または結果的な損害について、当社は一切の責任を負いません。'
        },
        intellectual: {
          title: '6. 知的財産権',
          content:
            '生成されたQRコードは、お客様が自由に使用できます。サービス自体とその基礎となるコードは当社の財産です。'
        },
        termsChanges: {
          title: '7. 規約の変更',
          content:
            '当社は、本規約をいつでも変更する権利を留保します。変更は、このページに掲載された時点で直ちに有効となります。'
        },
        termsContact: {
          title: '8. お問い合わせ',
          content:
            '本規約に関するご質問がある場合は、以下までお問い合わせください：'
        }
      }
    }
  }
}
