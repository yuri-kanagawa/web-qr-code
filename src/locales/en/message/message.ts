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
      atLeastOneField: 'Please enter at least one of email, subject, or body'
    },

    // URL validation
    url: {
      invalid: 'Invalid URL',
      required: 'URL is required'
    },

    // Phone validation
    phone: {
      invalid: 'Invalid phone number',
      required: 'Phone number is required'
    },

    // Map coordinates validation
    map: {
      latitude: {
        required: 'Latitude is required',
        range: 'Latitude must be between -90 and 90'
      },
      longitude: {
        required: 'Longitude is required',
        range: 'Longitude must be between -180 and 180'
      }
    },

    // SMS validation
    sms: {
      bothEmpty: 'Both phone number and message cannot be empty'
    },

    // Text validation
    text: {
      required: 'Text is required'
    },

    // Device validation
    device: {
      minSelection: 'At least one selection is required',
      notSelected: 'Not selected',
      atLeastOneCompleteSet:
        'At least one complete set (Device + OS + URL) is required'
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
      qrValueCannotBeEmpty: 'QR value cannot be empty'
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
