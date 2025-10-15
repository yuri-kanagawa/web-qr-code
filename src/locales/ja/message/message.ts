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
      required: 'メールアドレスを入力してください'
    },

    // URL validation
    url: {
      invalid: 'URLが無効です',
      required: 'URLを入力してください'
    },

    // Phone validation
    phone: {
      invalid: '電話番号が無効です',
      required: '電話番号を入力してください'
    },

    // Map coordinates validation
    map: {
      latitude: {
        required: '緯度を入力してください',
        range: '緯度は-90から90の範囲で入力してください'
      },
      longitude: {
        required: '経度を入力してください',
        range: '経度は-180から180の範囲で入力してください'
      }
    },

    // SMS validation
    sms: {
      bothEmpty: '電話番号と本文の両方を空にはできません'
    },

    // Text validation
    text: {
      required: '入力してください'
    },

    // Device validation
    device: {
      minSelection: '一つ以上選択しないと'
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
      general: 'エラーが発生しました',
      network: 'ネットワークエラーが発生しました',
      validation: '入力内容を確認してください',
      fileTooLarge: 'ファイルサイズが大きすぎます',
      unsupportedFormat: 'サポートされていない形式です',
      qrCodeReadFailed: 'QRコードの読み込みに失敗しました'
    },

    // Form labels
    form: {
      required: '必須',
      optional: '任意',
      select: '選択してください',
      enter: '入力してください'
    }
  }
}
