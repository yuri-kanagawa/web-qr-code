export const message = {
  // Validation messages
  validation: {
    // Common validation messages
    common: {
      required: 'Required',
      invalid: 'Invalid',
      minLength: (min: number) => `Must be at least ${min} characters`,
      maxLength: (max: number) => `Must be no more than ${max} characters`,
      range: (min: number, max: number) => `Must be between ${min} and ${max}`
    },

    // Email validation
    email: {
      invalid: 'Invalid email',
      required: 'Email is required',
      atLeastOneField: 'Please enter at least one of email, subject, or body',
      pleaseEnterValid: 'Please enter a valid email address',
      tooLong: (max: number) =>
        `Email address is too long (maximum ${max} characters)`
    },

    // URL validation
    url: {
      invalid: 'Invalid URL',
      required: 'URL is required',
      pleaseEnterValid: 'Please enter a valid URL'
    },

    // Phone validation
    phone: {
      invalid: 'Invalid phone number',
      required: 'Phone number is required',
      pleaseEnterValid:
        'Please enter a valid phone number format (e.g., +1-555-123-4567, 03-1234-5678)',
      invalidCharacters:
        'Phone number can only contain digits, +, -, (), spaces, and dots'
    },

    // Map coordinates validation
    map: {
      latitude: {
        required: 'Latitude is required',
        range: 'Latitude must be between -90 and 90',
        pleaseEnterValid: (min: number, max: number) =>
          `Latitude must be between ${min} and ${max}`
      },
      longitude: {
        required: 'Longitude is required',
        range: 'Longitude must be between -180 and 180',
        pleaseEnterValid: (min: number, max: number) =>
          `Longitude must be between ${min} and ${max}`
      }
    },

    // SMS validation
    sms: {
      bothEmpty: 'Both phone number and message cannot be empty'
    },

    // Text validation
    text: {
      required: 'Text is required',
      tooLong: (max: number) => `Text is too long (maximum ${max} characters)`
    },

    // Device validation
    device: {
      minSelection: 'At least one selection is required',
      notSelected: 'Not selected',
      atLeastOneCompleteSet:
        'At least one complete set (Device + OS + URL) is required',
      invalidType: 'Invalid device type'
    },

    // WiFi validation
    wifi: {
      ssid: {
        tooLong: 'SSID is too long (maximum 32 characters)'
      },
      password: {
        wrongLength: 'Password must be between 8 and 63 characters'
      }
    },

    // Address validation
    address: {
      tooLong: (max: number) =>
        `Address is too long (maximum ${max} characters)`
    },

    // Image file validation
    imageFile: {
      notSpecified: 'No file specified',
      unsupportedFormat: (type: string) => `Unsupported image format: ${type}`,
      tooLarge: (max: string) => `File size too large (max: ${max}MB)`
    },

    // Latitude validation
    latitude: {
      pleaseEnterValid: 'Please enter a valid latitude'
    },

    // Longitude validation
    longitude: {
      pleaseEnterValid: 'Please enter a valid longitude'
    },

    // OS validation
    os: {
      pleaseEnterValid: 'Please enter a valid OS name',
      invalidType: 'Invalid OS type'
    },

    // Country validation
    country: {
      pleaseEnterValid: 'Please enter a valid country name',
      invalidCode: 'Invalid country code'
    },

    // Name validation
    name: {
      pleaseEnterValid: 'Please enter a valid name',
      tooLong: (max: number) => `Name is too long (maximum ${max} characters)`
    },

    // Contact validation
    contact: {
      atLeastOneField: 'Please enter at least one field'
    },

    // Subject validation
    subject: {
      pleaseEnterValid: 'Please enter a valid subject'
    },

    // Body validation
    body: {
      pleaseEnterValid: 'Please enter a valid body'
    },

    // Social media validation
    socialMedia: {
      pleaseEnterValid: 'Please enter a valid social media URL'
    },

    // Base64 validation
    base64: {
      pleaseEnterValid: 'Please enter a valid base64 string',
      tooLarge: (max: string) => `File size too large (max: ${max}MB)`,
      invalidFileType: 'Invalid file type'
    },

    // QR style validation
    qrStyle: {
      pleaseEnterValid: 'Please enter a valid QR style'
    },

    // Eye radius validation
    eyeRadius: {
      pleaseEnterValid: 'Please enter a valid eye radius',
      outOfRange: 'Eye radius is out of range'
    },

    // QR color validation
    qrColor: {
      pleaseEnterValid: 'Please enter a valid color'
    },

    // EC level validation
    ecLevel: {
      pleaseEnterValid: 'Please enter a valid error correction level'
    }
  },

  // Common messages
  common: {
    // Button texts
    buttons: {
      confirm: 'Confirm',
      download: 'Download',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      remove: 'Remove',
      disagree: 'Disagree',
      close: 'Close',
      execute: 'Execute',
      getCurrentLocation: 'Get Current Location'
    },

    // Loading states
    loading: {
      loading: 'Loading...',
      generating: 'Generating...',
      saving: 'Saving...',
      uploading: 'Uploading...'
    },

    // Success messages
    success: {
      saved: 'Saved successfully',
      generated: 'Generated successfully',
      downloaded: 'Downloaded successfully',
      uploaded: 'Uploaded successfully'
    },

    // Error messages
    error: {
      title: 'Error',
      general: 'An error occurred',
      network: 'Network error occurred',
      validation: 'Please check your input',
      fileTooLarge: 'File size is too large',
      unsupportedFormat: 'Unsupported format',
      qrCodeReadFailed: 'Failed to read QR code',
      noDeviceDestination: 'No destination found for this device or OS.',
      invalidUrlFormat: 'The destination URL is invalid.',
      qrValueCannotBeEmpty: 'QR value cannot be empty',
      geolocation: {
        notSupported: 'Geolocation is not supported by this browser.',
        failedToGet: 'Failed to get current position.',
        failedToCreate: 'Failed to create GeoLocation',
        ipNotSupported:
          'BrowserGeoLocationRepository does not support IP-based location'
      },
      qrScanner: {
        imageTooSmall: (width: number, height: number) =>
          `QR code size is too small (${width}x${height}px). Reading may fail.`,
        invalidResultStructure: 'Invalid QR scan result structure',
        failedToLoadImage: 'Failed to load image'
      },
      qrGenerator: {
        invalidQrData: 'Invalid QR code data',
        sizeTooSmall: (size: number) =>
          `QR code size is too small (${size}px). Please set it to 75px or more.`,
        generationFailed: 'Failed to generate QR code canvas',
        canvasContextFailed: 'Failed to get canvas context',
        svgGenerationTimeout: 'SVG generation timeout',
        svgLoadFailed: 'Failed to load SVG image'
      }
    },

    // Form labels
    form: {
      required: 'Required',
      optional: 'Optional',
      select: 'Please select',
      enter: 'Please enter'
    },

    // QR Information Dialog
    qrInformationDialog: {
      titles: {
        deviceRedirect: 'Device Redirect QR Code',
        sms: 'SMS',
        map: 'Map Location',
        url: 'URL',
        phone: 'Phone'
      },
      messages: {
        deviceRedirect: (count: number) =>
          `This QR code redirects to ${count} different URL(s) based on device/OS.`,
        contains: (value: string) => `This QR code contains: ${value}`
      },
      labels: {
        redirectUrls: 'Redirect URLs:'
      },
      buttons: {
        viewDetails: 'View Details',
        openMap: 'Open Map',
        openUrl: 'Open URL',
        call: 'Call',
        sendSms: 'Send SMS'
      }
    }
  },

  // Legal documents
  legal: {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: ',
      sections: {
        informationCollection: {
          title: '1. Information Collection',
          content:
            'This QR code generator operates entirely in your browser. We do not collect, store, or transmit any personal information or QR code content to our servers. All QR code generation is performed locally on your device.'
        },
        cookies: {
          title: '2. Cookies and Local Storage',
          content:
            'We may use browser local storage to save your QR code settings and preferences for a better user experience. This data remains on your device and is not transmitted to us.'
        },
        thirdParty: {
          title: '3. Third-Party Services',
          content:
            'This website may use third-party services for analytics or hosting. These services may collect information as described in their respective privacy policies.'
        },
        dataSecurity: {
          title: '4. Data Security',
          content:
            'Since all QR code generation happens locally in your browser, your data never leaves your device. We cannot access or view any content you create.'
        },
        changes: {
          title: '5. Changes to Privacy Policy',
          content:
            'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.'
        },
        contact: {
          title: '6. Contact',
          content:
            'If you have any questions about this privacy policy, please contact us at: '
        }
      }
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: ',
      sections: {
        acceptance: {
          title: '1. Acceptance of Terms',
          content:
            'By accessing and using this QR code generator service, you accept and agree to be bound by the terms and provisions of this agreement.'
        },
        useOfService: {
          title: '2. Use of Service',
          content:
            'This service is provided free of charge for personal and commercial use. You may generate QR codes for any lawful purpose. You are responsible for the content you create and its use.'
        },
        prohibited: {
          title: '3. Prohibited Uses',
          content:
            'You agree not to use this service to create QR codes that: contain illegal content, infringe on intellectual property rights, distribute malware or viruses, engage in phishing or fraud, or violate any applicable laws or regulations.'
        },
        warranty: {
          title: '4. No Warranty',
          content:
            'This service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.'
        },
        liability: {
          title: '5. Limitation of Liability',
          content:
            'We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service.'
        },
        intellectual: {
          title: '6. Intellectual Property',
          content:
            'The QR codes you generate are yours to use freely. The service itself and its underlying code remain our property.'
        },
        termsChanges: {
          title: '7. Changes to Terms',
          content:
            'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.'
        },
        termsContact: {
          title: '8. Contact',
          content:
            'If you have any questions about these terms, please contact us at: '
        }
      }
    }
  }
}
