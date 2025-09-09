
import { isEn } from '@/locales/language';

export const path = {
  url: {
    index: ({ lang }: { lang: string, }) => {
      const path = '/'
      if (isEn(lang)) {
        return `${path}`
      } else {
        return `/${lang}${path}`
      }
    }
  },
  socialMedia: {
    index: ({ lang }: { lang: string }) => {
      const path = '/social-media'
      if (isEn(lang)) {
        return path
      } else {
        return `/${lang}${path}`
      }
    }
  },
  multiple: (lang: string) => '/multiple',
  wifi: {
    index: ({ lang }: { lang: string }) => {
      const path = '/wi-fi'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    },
  },
  device: {
    index: ({ lang }: { lang: string }) => {
      const path = '/device'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    },
    redirect: ({ lang }: { lang: string }) => {
      const path = '/device/redirect'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  contact: {
    index: ({ lang }: { lang: string }) => {
      const path = '/contact'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  text: {
    index: ({ lang }: { lang: string }) => {
      const path = '/text'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    },
    read: ({ lang }: { lang: string }) => {
      const path = '/text/read'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  sms: {
    index: ({ lang , queryParameter}: { lang: string, queryParameter?: {
      phoneNumber?: string
      body? : string
    } }) => {
      const path = '/sms'
      const queryParts = []
      if (queryParameter?.phoneNumber) {
        queryParts.push(`phoneNumber=${queryParameter.phoneNumber}`)
      }
      if (queryParameter?.body) {
        queryParts.push(`body=${queryParameter.body}`)
      }

      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
      const finalPath = `${path}${queryString}`

      if (isEn(lang)) {
        return finalPath
      }
      return `/${lang}${finalPath}`
    }
  },
  email: {
    index: ({ lang }: { lang: string }) => {
      const path = '/email'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  reader: {
    index: ({ lang }: { lang: string }) => {
      const path = '/reader'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  edit: {
    index: ({ lang }: { lang: string }) => {
      const path = '/edit'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  phone: {
    index: ({ lang, queryParameter }: { lang: string, queryParameter?: {
      phoneNumber: string
    } }) => {
      const path = '/phone'
      const queryString = queryParameter?.phoneNumber ? `?phoneNumber=${queryParameter.phoneNumber}` : ''
      if (isEn(lang)) {
        return `${path}${queryString}`
      }
      return `/${lang}${path}${queryString}`
    }
  },
  map: {
    index: ({ lang }: { lang: string }) => {
      const path = '/map'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  }
} as const
