export const word = {
  // Navigation labels
  navigation: {
    url: 'URL',
    wifi: 'Wi-Fi',
    socialMedia: 'SOCIAL MEDIA',
    device: 'DEVICE',
    contact: 'CONTACT',
    phone: 'PHONE',
    email: 'EMAIL',
    sms: 'SMS',
    text: 'Text',
    map: 'MAP',
    reader: 'READER',
    edit: 'EDIT'
  },

  // Form labels
  form: {
    label: 'Label',
    firstName: 'First Name',
    lastName: 'Last Name',
    middleName: 'Middle Name',
    email: 'Email',
    phone: 'Phone',
    phoneNumber: 'Phone Number',
    mobilePhone: 'Mobile Phone',
    homePhone: 'Home Phone',
    workMobile: 'Work Mobile',
    workPhone: 'Work Phone',
    url: 'URL',
    ssid: 'SSID',
    password: 'Password',
    subject: 'Subject',
    body: 'Body',
    address: 'Address',
    organization: 'Organization',
    post: 'Post',
    businessCellularTelephone: 'Business Cellular Telephone',
    privateCellularTelephone: 'Private Cellular Telephone'
  },

  // Form placeholders
  placeholder: {
    email: 'example@example.com',
    subject: 'Enter email subject',
    body: 'Enter email body'
  },

  // QR Code settings labels
  qrSettings: {
    size: 'QR Code Size',
    bgColor: 'Background Color',
    fgColor: 'Foreground Color',
    ecLevel: 'Error Correction Level',
    logo: 'Logo Image',
    opacity: 'Logo Opacity',
    logoPadding: 'Logo Padding Style',
    eyeColor1: 'Eye Color (Top-Left)',
    eyeColor2: 'Eye Color (Top-Right)',
    eyeColor3: 'Eye Color (Bottom-Left)'
  },

  // Select labels
  select: {
    device: 'Device',
    os: 'OS',
    encryptionType: 'Encryption Type',
    socialMedia: 'Social Media',
    age: 'Age',
    language: 'Language'
  },

  // Select options
  options: {
    qrStyle: {
      squares: 'squares',
      dots: 'dots',
      fluid: 'fluid'
    },
    logoPaddingStyle: {
      square: 'square',
      circle: 'circle'
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
      nopass: 'No Password',
      empty: 'Not Selected'
    },
    device: {
      notSet: 'Not Set',
      all: 'All',
      mobile: 'Mobile',
      tablet: 'Tablet',
      pc: 'PC'
    },
    os: {
      notSet: 'Not Set',
      windows: 'Windows',
      macintosh: 'Macintosh',
      ios: 'iOS',
      android: 'Android',
      linux: 'Linux',
      other: 'Other'
    },
    socialMedia: {
      notSet: 'Not Set',
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
    latitude: 'Latitude',
    longitude: 'Longitude'
  },

  // Buttons
  buttons: {
    confirm: 'Confirm',
    download: 'Download',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    editQrCode: 'Edit QR Code',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove',
    disagree: 'Disagree',
    close: 'Close',
    execute: 'Execute',
    getCurrentLocation: 'Get Current Location',
    selectFile: 'Select File',
    read: 'Read QR Code'
  },

  // Sidebar
  sidebar: {
    open: 'Open',
    close: 'Close'
  },

  // Dialog messages
  dialog: {
    qrCodeUrl: 'This QR code is a URL',
    qrCodeUrlMessage: 'Open in new tab?',
    qrCodeSms: 'This QR code is SMS',
    qrCodePhone: 'This QR code is a phone number'
  },

  // Language names
  languages: {
    en: 'English',
    ja: '日本語',
    fr: 'Français'
  },

  // Top page content
  topPage: {
    title: 'QR Code Generator',
    subtitle: 'Choose a feature to generate your QR code'
  },

  // Feature descriptions for top page
  features: {
    url: {
      title: 'URL QR Code',
      description: 'Generate QR codes for websites and URLs'
    },
    wifi: {
      title: 'Wi-Fi QR Code',
      description: 'Create QR codes to share Wi-Fi network credentials'
    },
    device: {
      title: 'Device QR Code',
      description: 'Generate QR codes for device information and settings'
    },
    contact: {
      title: 'Contact QR Code',
      description: 'Create QR codes for contact information (vCard)'
    },
    phone: {
      title: 'Phone QR Code',
      description: 'Generate QR codes for phone numbers'
    },
    email: {
      title: 'Email QR Code',
      description: 'Create QR codes for email addresses and messages'
    },
    sms: {
      title: 'SMS QR Code',
      description: 'Generate QR codes for SMS messages'
    },
    text: {
      title: 'Text QR Code',
      description: 'Create QR codes for plain text content'
    },
    map: {
      title: 'Map QR Code',
      description: 'Generate QR codes for location coordinates'
    },
    reader: {
      title: 'QR Code Reader',
      description: 'Scan and read QR codes with your device'
    }
  },

  // Contact form sections
  contact: {
    basicInformation: 'Basic Information',
    businessInformation: 'Business Information'
  },

  // Footer links
  footer: {
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service'
  },

  // Form sections
  formSections: {
    optionalSettings: 'Optional Settings',
    eyeConfiguration: 'Eye Configuration',
    individualSettings: 'Individual Settings',
    eyeSettings: 'Eye Settings',
    eyeTopLeft: 'Eye (Top Left)'
  },

  // Loading states
  loading: {
    processing: 'Processing...',
    downloading: 'Downloading...'
  },

  // Warning titles
  warnings: {
    errorCorrectionLevel: 'Error Correction Level Warning',
    foregroundColor: 'Foreground Color Warning',
    backgroundColor: 'Background Color Warning',
    eyeColor: 'Eye Color Warning',
    logoSize: 'Logo Size Warning',
    sizeDisplay: 'Size Display Warning',
    qrCodeSize: 'QR Code Size Warning'
  },

  // Warning messages
  warningMessages: {
    lowEcLevelWithLogo: (level: string) =>
      `Low error correction level (${level}) with logo may cause reading failure`,
    recommendedEcLevel: 'Recommended: Use Q or H level when using logos',
    actualSizeMayBeLarger: 'Actual size may be larger than displayed',
    sizeLessThan75MayFail: 'Size less than 75 may cause reading failure',
    recommendedSize75OrHigher: 'Recommended size: 75 or higher',
    eyeBgContrast: (ratio: string) =>
      `Eye color has low contrast with background (${ratio}:1)`,
    eyeFgContrast: (ratio: string) =>
      `Eye color has low contrast with foreground (${ratio}:1)`,
    fgBgContrast: (ratio: string) =>
      `Low contrast with background color (${ratio}:1)`,
    bgFgContrast: (ratio: string) =>
      `Low contrast with foreground color (${ratio}:1)`,
    recommendedContrastRatio: 'Recommended contrast ratio: 3.0:1 or higher'
  },

  // QR settings labels
  qrSettingsLabels: {
    width: 'Width (%)',
    height: 'Height (%)',
    currentOpacity: 'Current Opacity',
    currentSize: 'Current Size',
    max: 'Max',
    color: 'Color',
    cornerRadius: 'Corner Radius',
    eyeTopRight: 'Eye (Top Right)',
    eyeBottomLeft: 'Eye (Bottom Left)'
  }
}
