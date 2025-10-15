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
      required: 'Email is required'
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
      minSelection: 'At least one selection is required'
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
      general: 'An error occurred',
      network: 'Network error occurred',
      validation: 'Please check your input',
      fileTooLarge: 'File size is too large',
      unsupportedFormat: 'Unsupported format',
      qrCodeReadFailed: 'Failed to read QR code'
    },

    // Form labels
    form: {
      required: 'Required',
      optional: 'Optional',
      select: 'Please select',
      enter: 'Please enter'
    }
  }
}
