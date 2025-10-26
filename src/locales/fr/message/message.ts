export const message = {
  // Validation messages
  validation: {
    // Common validation messages
    common: {
      required: 'Requis',
      invalid: 'Invalide',
      minLength: (min: number) => `Doit comporter au moins ${min} caractères`,
      maxLength: (max: number) => `Ne doit pas dépasser ${max} caractères`,
      range: (min: number, max: number) => `Doit être entre ${min} et ${max}`
    },

    // Email validation
    email: {
      invalid: 'E-mail invalide',
      required: "L'e-mail est requis",
      atLeastOneField:
        'Veuillez saisir au moins un parmi e-mail, objet ou corps',
      pleaseEnterValid: 'Veuillez saisir une adresse e-mail valide',
      tooLong: (max: number) =>
        `L'adresse e-mail est trop longue (${max} caractères maximum)`
    },

    // URL validation
    url: {
      invalid: 'URL invalide',
      required: "L'URL est requise",
      pleaseEnterValid: 'Veuillez saisir une URL valide'
    },

    // Phone validation
    phone: {
      invalid: 'Numéro de téléphone invalide',
      required: 'Le numéro de téléphone est requis',
      pleaseEnterValid:
        'Veuillez saisir un numéro de téléphone dans un format valide (ex: +1-555-123-4567, 03-1234-5678)',
      invalidCharacters:
        'Le numéro de téléphone ne peut contenir que des chiffres, +, -, (), espaces et points'
    },

    // Map coordinates validation
    map: {
      latitude: {
        required: 'La latitude est requise',
        range: 'La latitude doit être entre -90 et 90',
        pleaseEnterValid: (min: number, max: number) =>
          `La latitude doit être entre ${min} et ${max}`
      },
      longitude: {
        required: 'La longitude est requise',
        range: 'La longitude doit être entre -180 et 180',
        pleaseEnterValid: (min: number, max: number) =>
          `La longitude doit être entre ${min} et ${max}`
      }
    },

    // SMS validation
    sms: {
      bothEmpty:
        'Le numéro de téléphone et le message ne peuvent pas être vides'
    },

    // Text validation
    text: {
      required: 'Le texte est requis',
      tooLong: (max: number) =>
        `Le texte est trop long (${max} caractères maximum)`
    },

    // Device validation
    device: {
      minSelection: 'Au moins une sélection est requise',
      notSelected: 'Non sélectionné',
      atLeastOneCompleteSet:
        'Au moins un ensemble complet (Appareil + OS + URL) est requis',
      invalidType: "Type d'appareil invalide"
    },

    // WiFi validation
    wifi: {
      ssid: {
        tooLong: 'Le SSID est trop long (32 caractères maximum)'
      },
      password: {
        wrongLength: 'Le mot de passe doit contenir entre 8 et 63 caractères'
      }
    },

    // Address validation
    address: {
      tooLong: (max: number) =>
        `L'adresse est trop longue (${max} caractères maximum)`
    },

    // Image file validation
    imageFile: {
      notSpecified: 'Aucun fichier spécifié',
      unsupportedFormat: (type: string) =>
        `Format d'image non pris en charge: ${type}`,
      tooLarge: (max: string) => `Fichier trop volumineux (max: ${max}MB)`
    },

    // Latitude validation
    latitude: {
      pleaseEnterValid: 'Veuillez saisir une latitude valide'
    },

    // Longitude validation
    longitude: {
      pleaseEnterValid: 'Veuillez saisir une longitude valide'
    },

    // OS validation
    os: {
      pleaseEnterValid: "Veuillez saisir un nom d'OS valide",
      invalidType: "Type de système d'exploitation invalide"
    },

    // Country validation
    country: {
      pleaseEnterValid: 'Veuillez saisir un nom de pays valide',
      invalidCode: 'Code pays invalide'
    },

    // Name validation
    name: {
      pleaseEnterValid: 'Veuillez saisir un nom valide',
      tooLong: (max: number) =>
        `Le nom est trop long (${max} caractères maximum)`
    },

    // Subject validation
    subject: {
      pleaseEnterValid: 'Veuillez saisir un objet valide'
    },

    // Body validation
    body: {
      pleaseEnterValid: 'Veuillez saisir un corps valide'
    },

    // Social media validation
    socialMedia: {
      pleaseEnterValid: 'Veuillez saisir une URL de réseau social valide'
    },

    // Base64 validation
    base64: {
      pleaseEnterValid: 'Veuillez saisir une chaîne base64 valide',
      tooLarge: (max: string) => `Fichier trop volumineux (max: ${max}MB)`,
      invalidFileType: 'Type de fichier invalide'
    },

    // QR style validation
    qrStyle: {
      pleaseEnterValid: 'Veuillez saisir un style QR valide'
    },

    // Eye radius validation
    eyeRadius: {
      pleaseEnterValid: "Veuillez saisir un rayon d'œil valide",
      outOfRange: "Le rayon de l'œil est hors limites"
    },

    // QR color validation
    qrColor: {
      pleaseEnterValid: 'Veuillez saisir une couleur valide'
    },

    // EC level validation
    ecLevel: {
      pleaseEnterValid:
        "Veuillez saisir un niveau de correction d'erreur valide"
    }
  },

  // Common messages
  common: {
    // Button texts
    buttons: {
      confirm: 'Confirmer',
      download: 'Télécharger',
      cancel: 'Annuler',
      save: 'Enregistrer',
      edit: 'Modifier',
      delete: 'Supprimer',
      add: 'Ajouter',
      remove: 'Retirer',
      disagree: 'Refuser',
      close: 'Fermer',
      execute: 'Exécuter',
      getCurrentLocation: 'Obtenir la position actuelle'
    },

    // Loading states
    loading: {
      loading: 'Chargement...',
      generating: 'Génération...',
      saving: 'Enregistrement...',
      uploading: 'Téléversement...'
    },

    // Success messages
    success: {
      saved: 'Enregistré avec succès',
      generated: 'Généré avec succès',
      downloaded: 'Téléchargé avec succès',
      uploaded: 'Téléversé avec succès'
    },

    // Error messages
    error: {
      title: 'Erreur',
      general: "Une erreur s'est produite",
      network: 'Erreur réseau',
      validation: 'Veuillez vérifier votre saisie',
      fileTooLarge: 'La taille du fichier est trop grande',
      unsupportedFormat: 'Format non pris en charge',
      qrCodeReadFailed: 'Échec de la lecture du QR code',
      noDeviceDestination:
        'Aucune destination trouvée pour cet appareil ou OS.',
      invalidUrlFormat: "L'URL de destination est invalide.",
      qrValueCannotBeEmpty: 'Veuillez saisir la valeur QR',
      geolocation: {
        notSupported:
          "La géolocalisation n'est pas prise en charge par ce navigateur.",
        failedToGet: "Échec de l'obtention de la position actuelle.",
        failedToCreate: 'Échec de la création de GeoLocation',
        ipNotSupported:
          'BrowserGeoLocationRepository ne prend pas en charge la géolocalisation basée sur IP'
      },
      qrScanner: {
        imageTooSmall: (width: number, height: number) =>
          `La taille du QR code est trop petite (${width}x${height}px). La lecture peut échouer.`,
        invalidResultStructure: 'Structure de résultat de scan QR invalide',
        failedToLoadImage: "Échec du chargement de l'image"
      },
      qrGenerator: {
        invalidQrData: 'Données QR code invalides',
        sizeTooSmall: (size: number) =>
          `La taille du QR code est trop petite (${size}px). Veuillez la définir à 75px ou plus.`,
        generationFailed: 'Échec de la génération du canvas QR code',
        canvasContextFailed: "Échec de l'obtention du contexte canvas",
        svgGenerationTimeout: "Délai d'attente de génération SVG dépassé",
        svgLoadFailed: "Échec du chargement de l'image SVG"
      }
    },

    // Form labels
    form: {
      required: 'Requis',
      optional: 'Optionnel',
      select: 'Veuillez sélectionner',
      enter: 'Veuillez saisir'
    },

    // QR Information Dialog
    qrInformationDialog: {
      titles: {
        deviceRedirect: "QR Code de redirection d'appareil",
        sms: 'SMS',
        map: 'Localisation carte',
        url: 'URL',
        phone: 'Téléphone'
      },
      messages: {
        deviceRedirect: (count: number) =>
          `Ce QR code redirige vers ${count} URL(s) différente(s) selon l'appareil/OS.`,
        contains: (value: string) => `Ce QR code contient : ${value}`
      },
      labels: {
        redirectUrls: 'URLs de redirection :'
      },
      buttons: {
        viewDetails: 'Voir les détails',
        openMap: 'Ouvrir la carte',
        openUrl: "Ouvrir l'URL",
        call: 'Appeler',
        sendSms: 'Envoyer SMS'
      }
    }
  },

  // Legal documents
  legal: {
    privacy: {
      title: 'Politique de confidentialité',
      lastUpdated: 'Dernière mise à jour : ',
      sections: {
        informationCollection: {
          title: "1. Collecte d'informations",
          content:
            'Ce générateur de QR code fonctionne entièrement dans votre navigateur. Nous ne collectons, ne stockons ni ne transmettons aucune information personnelle ou contenu de QR code à nos serveurs. Toute génération de QR code est effectuée localement sur votre appareil.'
        },
        cookies: {
          title: '2. Cookies et stockage local',
          content:
            'Nous pouvons utiliser le stockage local du navigateur pour sauvegarder vos paramètres et préférences de QR code pour une meilleure expérience utilisateur. Ces données restent sur votre appareil et ne nous sont pas transmises.'
        },
        thirdParty: {
          title: '3. Services tiers',
          content:
            "Ce site Web peut utiliser des services tiers pour l'analyse ou l'hébergement. Ces services peuvent collecter des informations telles que décrites dans leurs politiques de confidentialité respectives."
        },
        dataSecurity: {
          title: '4. Sécurité des données',
          content:
            'Étant donné que toute génération de QR code se produit localement dans votre navigateur, vos données ne quittent jamais votre appareil. Nous ne pouvons pas accéder ou consulter le contenu que vous créez.'
        },
        changes: {
          title: '5. Modifications de la politique de confidentialité',
          content:
            'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une date de révision mise à jour.'
        },
        contact: {
          title: '6. Contact',
          content:
            'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à : '
        }
      }
    },
    terms: {
      title: "Conditions d'utilisation",
      lastUpdated: 'Dernière mise à jour : ',
      sections: {
        acceptance: {
          title: '1. Acceptation des conditions',
          content:
            "En accédant et en utilisant ce service de générateur de QR code, vous acceptez et convenez d'être lié par les termes et dispositions de cet accord."
        },
        useOfService: {
          title: '2. Utilisation du service',
          content:
            'Ce service est fourni gratuitement pour un usage personnel et commercial. Vous pouvez générer des QR codes à des fins légales. Vous êtes responsable du contenu que vous créez et de son utilisation.'
        },
        prohibited: {
          title: '3. Utilisations interdites',
          content:
            'Vous acceptez de ne pas utiliser ce service pour créer des QR codes qui : contiennent du contenu illégal, violent les droits de propriété intellectuelle, distribuent des logiciels malveillants ou des virus, font du phishing ou de la fraude, ou violent toute loi ou réglementation applicable.'
        },
        warranty: {
          title: '4. Aucune garantie',
          content:
            'Ce service est fourni "tel quel" sans aucune garantie, expresse ou implicite. Nous ne garantissons pas que le service sera ininterrompu, sécurisé ou sans erreur.'
        },
        liability: {
          title: '5. Limitation de responsabilité',
          content:
            "Nous ne serons pas responsables de tout dommage direct, indirect, accessoire, spécial ou consécutif résultant de l'utilisation ou de l'impossibilité d'utiliser ce service."
        },
        intellectual: {
          title: '6. Propriété intellectuelle',
          content:
            'Les QR codes que vous générez sont les vôtres à utiliser librement. Le service lui-même et son code sous-jacent restent notre propriété.'
        },
        termsChanges: {
          title: '7. Modifications des conditions',
          content:
            'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet immédiatement après leur publication sur cette page.'
        },
        termsContact: {
          title: '8. Contact',
          content:
            'Si vous avez des questions concernant ces conditions, veuillez nous contacter à : '
        }
      }
    }
  }
}
