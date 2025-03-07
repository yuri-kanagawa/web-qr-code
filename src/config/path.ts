import { isEn } from '@/constants/locale/utils'

export const path = {
  url: {
    index: ({ lang }: { lang: string }) => {
      const path = '/'
      if (isEn(lang)) {
        return path
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
  wifi: (lang: string) => '/wi-fi',
  terminal: {
    index: ({ lang }: { lang: string }) => {
      const path = '/terminal'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    },
    redirect: ({ lang }: { lang: string }) => {
      const path = '/terminal/redirect'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  },
  contact: (lang: string) => '/contact',
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
  sms: (lang: string) => '/sms',
  reader: (lang: string) => '/reader',
  editor: (lang: string) => '/editor'
} as const
