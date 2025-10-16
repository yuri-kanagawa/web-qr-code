import { Language } from '@/domains'

export class PathBuilder {
  private static readonly PATHS = {
    URL: '/url',
    SOCIAL_MEDIA: '/social-media',
    WIFI: '/wi-fi',
    DEVICE: '/device',
    DEVICE_REDIRECT: '/device/redirect',
    CONTACT: '/contact',
    TEXT: '/text',
    TEXT_READ: '/text/read',
    SMS: '/sms',
    EMAIL: '/email',
    READER: '/reader',
    EDIT: '/edit',
    EDIT_CONTENT: '/edit/content',
    PHONE: '/phone',
    MAP: '/map',
    MULTIPLE: '/multiple',
    PRIVACY: '/privacy',
    TERMS: '/terms'
  } as const

  private readonly _language: Language

  constructor(language: Language) {
    this._language = language
  }

  private buildPath(basePath: string): string {
    if (this._language.isEnglish) {
      return basePath
    }
    return `/${this._language.value}${basePath}`
  }

  get url() {
    return {
      index: this.buildPath(PathBuilder.PATHS.URL)
    }
  }

  get socialMedia() {
    return {
      index: this.buildPath(PathBuilder.PATHS.SOCIAL_MEDIA)
    }
  }

  get wifi() {
    return {
      index: this.buildPath(PathBuilder.PATHS.WIFI)
    }
  }

  get device() {
    return {
      index: this.buildPath(PathBuilder.PATHS.DEVICE),
      redirect: this.buildPath(PathBuilder.PATHS.DEVICE_REDIRECT)
    }
  }

  get contact() {
    return {
      index: this.buildPath(PathBuilder.PATHS.CONTACT)
    }
  }

  get text() {
    return {
      index: this.buildPath(PathBuilder.PATHS.TEXT),
      read: this.buildPath(PathBuilder.PATHS.TEXT_READ)
    }
  }

  get sms() {
    return {
      index: (queryParameter?: { phoneNumber?: string; body?: string }) => {
        const queryParts = []
        if (queryParameter?.phoneNumber) {
          queryParts.push(`phoneNumber=${queryParameter.phoneNumber}`)
        }
        if (queryParameter?.body) {
          queryParts.push(`body=${queryParameter.body}`)
        }

        const queryString =
          queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
        return this.buildPath(`${PathBuilder.PATHS.SMS}${queryString}`)
      }
    }
  }

  get email() {
    return {
      index: this.buildPath(PathBuilder.PATHS.EMAIL)
    }
  }

  get reader() {
    return {
      index: this.buildPath(PathBuilder.PATHS.READER)
    }
  }

  get edit() {
    return {
      index: this.buildPath(PathBuilder.PATHS.EDIT),
      content: this.buildPath(PathBuilder.PATHS.EDIT_CONTENT)
    }
  }

  get phone() {
    return {
      index: (queryParameter?: { phoneNumber: string }) => {
        const queryString = queryParameter?.phoneNumber
          ? `?phoneNumber=${queryParameter.phoneNumber}`
          : ''
        return this.buildPath(`${PathBuilder.PATHS.PHONE}${queryString}`)
      }
    }
  }

  get map() {
    return {
      index: this.buildPath(PathBuilder.PATHS.MAP)
    }
  }

  get multiple() {
    return this.buildPath(PathBuilder.PATHS.MULTIPLE)
  }

  get privacy() {
    return this.buildPath(PathBuilder.PATHS.PRIVACY)
  }

  get terms() {
    return this.buildPath(PathBuilder.PATHS.TERMS)
  }
}
