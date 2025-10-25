export const word = {
  // Navigation labels
  navigation: {
    url: 'URL',
    wifi: 'Wi-Fi',
    socialMedia: 'MÉDIAS SOCIAUX',
    device: 'APPAREIL',
    contact: 'CONTACT',
    phone: 'TÉLÉPHONE',
    email: 'E-MAIL',
    sms: 'SMS',
    text: 'Texte',
    map: 'CARTE',
    reader: 'LECTEUR',
    edit: 'MODIFIER'
  },

  // Form labels
  form: {
    label: 'Libellé',
    firstName: 'Prénom',
    lastName: 'Nom',
    middleName: 'Deuxième prénom',
    email: 'E-mail',
    phone: 'Téléphone',
    phoneNumber: 'Numéro de téléphone',
    mobilePhone: 'Téléphone portable',
    homePhone: 'Téléphone domicile',
    workMobile: 'Portable professionnel',
    workPhone: 'Téléphone bureau',
    url: 'URL',
    ssid: 'SSID',
    password: 'Mot de passe',
    subject: 'Objet',
    body: 'Corps',
    address: 'Adresse',
    organization: 'Organisation',
    post: 'Poste',
    businessCellularTelephone: 'Téléphone portable professionnel',
    privateCellularTelephone: 'Téléphone portable privé'
  },

  // Form placeholders
  placeholder: {
    email: 'exemple@exemple.com',
    subject: "Entrez l'objet de l'e-mail",
    body: "Entrez le corps de l'e-mail"
  },

  // QR Code settings labels
  qrSettings: {
    size: 'Taille du QR Code',
    bgColor: 'Couleur de fond',
    fgColor: 'Couleur avant-plan',
    ecLevel: "Niveau de correction d'erreur",
    logo: 'Image du logo',
    opacity: 'Opacité du logo',
    logoPadding: 'Style de remplissage du logo',
    eyeColor1: "Couleur de l'œil (haut-gauche)",
    eyeColor2: "Couleur de l'œil (haut-droite)",
    eyeColor3: "Couleur de l'œil (bas-gauche)"
  },

  // Select labels
  select: {
    device: 'Appareil',
    os: 'OS',
    encryptionType: 'Type de chiffrement',
    socialMedia: 'Médias sociaux',
    age: 'Âge',
    language: 'Langue'
  },

  // Select options
  options: {
    qrStyle: {
      squares: 'carrés',
      dots: 'points',
      fluid: 'fluide'
    },
    logoPaddingStyle: {
      square: 'carré',
      circle: 'cercle'
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
      nopass: 'Sans mot de passe',
      empty: 'Non sélectionné'
    },
    device: {
      notSet: 'Non défini',
      all: 'Tous',
      mobile: 'Mobile',
      tablet: 'Tablette',
      pc: 'PC'
    },
    os: {
      notSet: 'Non défini',
      windows: 'Windows',
      macintosh: 'Macintosh',
      ios: 'iOS',
      android: 'Android',
      linux: 'Linux',
      other: 'Autre'
    },
    socialMedia: {
      notSet: 'Non défini',
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
    confirm: 'Confirmer',
    download: 'Télécharger',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    editQrCode: 'Modifier le QR Code',
    delete: 'Supprimer',
    add: 'Ajouter',
    remove: 'Retirer',
    disagree: 'Refuser',
    close: 'Fermer',
    execute: 'Exécuter',
    getCurrentLocation: 'Obtenir la position actuelle',
    selectFile: 'Sélectionner un fichier',
    read: 'Lire le QR Code'
  },

  // Sidebar
  sidebar: {
    open: 'Ouvrir',
    close: 'Fermer'
  },

  // Dialog messages
  dialog: {
    qrCodeUrl: 'Ce QR code est une URL',
    qrCodeUrlMessage: 'Ouvrir dans un nouvel onglet ?',
    qrCodeSms: 'Ce QR code est un SMS',
    qrCodePhone: 'Ce QR code est un numéro de téléphone'
  },

  // Language names
  languages: {
    en: 'English',
    ja: '日本語',
    fr: 'Français'
  },

  // Top page content
  topPage: {
    title: 'Générateur de QR Code',
    subtitle: 'Choisissez une fonctionnalité pour générer votre QR code'
  },

  // Feature descriptions for top page
  features: {
    url: {
      title: 'QR Code URL',
      description: 'Générer des QR codes pour sites web et URLs'
    },
    wifi: {
      title: 'QR Code Wi-Fi',
      description:
        'Créer des QR codes pour partager les identifiants réseau Wi-Fi'
    },
    device: {
      title: 'QR Code Appareil',
      description:
        "Générer des QR codes pour informations et paramètres d'appareil"
    },
    contact: {
      title: 'QR Code Contact',
      description: 'Créer des QR codes pour informations de contact (vCard)'
    },
    phone: {
      title: 'QR Code Téléphone',
      description: 'Générer des QR codes pour numéros de téléphone'
    },
    email: {
      title: 'QR Code E-mail',
      description: 'Créer des QR codes pour adresses e-mail et messages'
    },
    sms: {
      title: 'QR Code SMS',
      description: 'Générer des QR codes pour messages SMS'
    },
    text: {
      title: 'QR Code Texte',
      description: 'Créer des QR codes pour contenu texte brut'
    },
    map: {
      title: 'QR Code Carte',
      description: 'Générer des QR codes pour coordonnées de localisation'
    },
    reader: {
      title: 'Lecteur de QR Code',
      description: 'Scanner et lire des QR codes avec votre appareil'
    }
  },

  // Contact form sections
  contact: {
    basicInformation: 'Informations de base',
    businessInformation: 'Informations professionnelles'
  },

  // Footer links
  footer: {
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: "Conditions d'utilisation"
  },

  // Form sections
  formSections: {
    optionalSettings: 'Paramètres optionnels',
    eyeConfiguration: "Configuration de l'œil",
    individualSettings: 'Paramètres individuels'
  },

  // Loading states
  loading: {
    processing: 'Traitement...',
    downloading: 'Téléchargement...'
  },

  // Warning titles
  warnings: {
    errorCorrectionLevel: "Avertissement niveau de correction d'erreur",
    foregroundColor: 'Avertissement couleur avant-plan',
    backgroundColor: 'Avertissement couleur de fond',
    eyeColor: "Avertissement couleur de l'œil",
    logoSize: 'Avertissement taille du logo',
    sizeDisplay: 'Avertissement affichage de la taille',
    qrCodeSize: 'Avertissement taille du QR Code'
  },

  // Warning messages
  warningMessages: {
    lowEcLevelWithLogo: (level: string) =>
      `Un faible niveau de correction d'erreur (${level}) avec logo peut provoquer un échec de lecture`,
    recommendedEcLevel:
      "Recommandé : Utiliser le niveau Q ou H lors de l'utilisation de logos"
  },

  // QR settings labels
  qrSettingsLabels: {
    width: 'Largeur (%)',
    height: 'Hauteur (%)',
    currentOpacity: 'Opacité actuelle',
    currentSize: 'Taille actuelle',
    max: 'Max',
    color: 'Couleur',
    cornerRadius: 'Rayon du coin',
    eyeTopRight: 'Œil (haut-droite)',
    eyeBottomLeft: 'Œil (bas-gauche)'
  }
}
