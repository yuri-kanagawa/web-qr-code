export const word = {
  // Navigation labels
  navigation: {
    url: 'URL',
    wifi: 'Wi-Fi',
    socialMedia: 'ソーシャルメディア',
    device: 'デバイス',
    contact: '連絡先',
    phone: '電話',
    email: 'メール',
    sms: 'SMS',
    text: 'テキスト',
    map: '地図',
    reader: '読み取り',
    edit: '編集'
  },

  // Form labels
  form: {
    label: 'ラベル',
    firstName: '名',
    lastName: '姓',
    middleName: 'ミドルネーム',
    email: 'メールアドレス',
    phone: '電話',
    phoneNumber: '電話番号',
    mobilePhone: '携帯電話',
    homePhone: '自宅電話',
    workMobile: 'ビジネス携帯',
    workPhone: 'ビジネス電話',
    url: 'URL',
    ssid: 'SSID',
    password: 'パスワード',
    subject: '件名',
    body: '本文',
    address: '住所',
    organization: '組織',
    post: '役職',
    businessCellularTelephone: 'ビジネス携帯電話',
    privateCellularTelephone: 'プライベート携帯電話'
  },

  // Form placeholders
  placeholder: {
    email: 'example@example.com',
    subject: 'メールの件名を入力',
    body: 'メールの本文を入力'
  },

  // QR Code settings labels
  qrSettings: {
    size: 'QRコードサイズ',
    bgColor: '背景色',
    fgColor: '前景色',
    ecLevel: '誤り訂正レベル',
    logo: 'ロゴ画像',
    opacity: 'ロゴの透明度',
    logoPadding: 'ロゴパディングスタイル',
    eyeColor1: '目の色（左上）',
    eyeColor2: '目の色（右上）',
    eyeColor3: '目の色（左下）',
    transparent: '透過'
  },

  // Select labels
  select: {
    device: 'デバイス',
    os: 'OS',
    encryptionType: '暗号化タイプ',
    socialMedia: 'ソーシャルメディア',
    age: '年齢',
    language: '言語'
  },

  // Select options
  options: {
    qrStyle: {
      squares: '四角',
      dots: 'ドット',
      fluid: 'フルイド'
    },
    logoPaddingStyle: {
      square: '四角',
      circle: '円'
    },
    ecLevel: {
      L: 'L',
      M: 'M',
      Q: 'Q',
      H: 'H'
    },
    wifiEncryption: {
      wpa: 'WPA/WPA2',
      wep: 'WEP',
      nopass: 'パスワードなし',
      empty: '未選択'
    },
    device: {
      notSet: '未設定',
      all: 'すべて',
      mobile: 'モバイル',
      tablet: 'タブレット',
      pc: 'PC'
    },
    os: {
      notSet: '未設定',
      windows: 'Windows',
      macintosh: 'Macintosh',
      ios: 'iOS',
      android: 'Android',
      linux: 'Linux',
      other: 'その他'
    },
    socialMedia: {
      notSet: '未設定',
      facebook: 'Facebook',
      youtube: 'YouTube',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      x: 'X',
      linkedin: 'LinkedIn',
      snapchat: 'Snapchat',
      pinterest: 'Pinterest',
      reddit: 'Reddit',
      wechat: 'WeChat',
      telegram: 'Telegram',
      discord: 'Discord',
      tumblr: 'Tumblr',
      threads: 'Threads',
      mastodon: 'Mastodon',
      bluesky: 'Bluesky'
    }
  },

  // Map coordinates
  map: {
    latitude: '緯度',
    longitude: '経度'
  },

  // Buttons
  buttons: {
    confirm: '確認',
    download: 'ダウンロード',
    cancel: 'キャンセル',
    save: '保存',
    edit: '編集',
    editQrCode: 'QRコードを編集',
    delete: '削除',
    add: '追加',
    remove: '削除',
    disagree: '同意しない',
    close: '閉じる',
    execute: '実行',
    getCurrentLocation: '現在地を取得',
    selectFile: 'ファイルを選択',
    read: 'QRコードを読み取る'
  },

  // Sidebar
  sidebar: {
    open: '開く',
    close: '閉じる'
  },

  // Dialog messages
  dialog: {
    qrCodeUrl: 'このQRコードはURLです',
    qrCodeUrlMessage: '新しいタブで開きますか？',
    qrCodeSms: 'このQRコードはSMSです',
    qrCodePhone: 'このQRコードは電話番号です'
  },

  // Language names
  languages: {
    en: 'English',
    ja: '日本語',
    fr: 'Français'
  },

  // Top page content
  topPage: {
    title: 'QRコードジェネレーター',
    subtitle: 'QRコードを生成する機能を選択してください'
  },

  // Feature descriptions for top page
  features: {
    url: {
      title: 'URL QRコード',
      description: 'ウェブサイトやURLのQRコードを生成'
    },
    wifi: {
      title: 'Wi-Fi QRコード',
      description: 'Wi-Fiネットワークの認証情報を共有するQRコードを作成'
    },
    device: {
      title: 'デバイス QRコード',
      description: 'デバイス情報や設定のQRコードを生成'
    },
    contact: {
      title: '連絡先 QRコード',
      description: '連絡先情報（vCard）のQRコードを作成'
    },
    phone: {
      title: '電話 QRコード',
      description: '電話番号のQRコードを生成'
    },
    email: {
      title: 'メール QRコード',
      description: 'メールアドレスやメッセージのQRコードを作成'
    },
    sms: {
      title: 'SMS QRコード',
      description: 'SMSメッセージのQRコードを生成'
    },
    text: {
      title: 'テキスト QRコード',
      description: 'プレーンテキストのQRコードを作成'
    },
    map: {
      title: '地図 QRコード',
      description: '位置座標のQRコードを生成'
    },
    reader: {
      title: 'QRコード読み取り',
      description: 'デバイスでQRコードをスキャンして読み取り'
    }
  },

  // Contact form sections
  contact: {
    basicInformation: '基本情報',
    businessInformation: 'ビジネス情報'
  },

  // Footer links
  footer: {
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約'
  },

  // Form sections
  formSections: {
    optionalSettings: 'オプション設定',
    eyeConfiguration: '目の設定方法',
    individualSettings: '個別設定',
    eyeSettings: '目の設定',
    eyeTopLeft: '目（左上）'
  },

  // Loading states
  loading: {
    processing: '処理中...',
    downloading: 'ダウンロード中...'
  },

  // Warning titles
  warnings: {
    errorCorrectionLevel: 'エラー訂正レベル警告',
    foregroundColor: '前景色警告',
    backgroundColor: '背景色警告',
    eyeColor: '目の色警告',
    logoSize: 'ロゴサイズ警告',
    sizeDisplay: 'サイズ表示警告',
    qrCodeSize: 'QRコードサイズ警告'
  },

  // Warning messages
  warningMessages: {
    lowEcLevelWithLogo: (level: string) =>
      `低いエラー訂正レベル（${level}）とロゴの組み合わせは読み取りに失敗する可能性があります`,
    recommendedEcLevel: '推奨: ロゴ使用時はQまたはHレベルを使用',
    actualSizeMayBeLarger: '実際のサイズは表示より大きくなります',
    sizeLessThan75MayFail: '75未満だと読み込みに失敗します',
    recommendedSize75OrHigher: '推奨サイズ: 75以上',
    eyeBgContrast: (ratio: string) =>
      `目の色と背景色のコントラスト比が低いです (${ratio}:1)`,
    eyeFgContrast: (ratio: string) =>
      `目の色と前景色のコントラスト比が低いです (${ratio}:1)`,
    fgBgContrast: (ratio: string) =>
      `背景色とのコントラスト比が低いです (${ratio}:1)`,
    bgFgContrast: (ratio: string) =>
      `前景色とのコントラスト比が低いです (${ratio}:1)`,
    recommendedContrastRatio: '推奨コントラスト比: 3.0:1以上'
  },

  // QR settings labels
  qrSettingsLabels: {
    width: '幅 (%)',
    height: '高さ (%)',
    currentOpacity: '現在の透明度',
    currentSize: '現在のサイズ',
    max: '最大値',
    color: '色',
    cornerRadius: '角の丸み',
    eyeTopRight: '目（右上）',
    eyeBottomLeft: '目（左下）'
  }
}
