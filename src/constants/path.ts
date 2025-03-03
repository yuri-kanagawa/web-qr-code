import { isEn } from '@/constants/locale/utils'

export const path = {
  url: ({ lang }: { lang: string }) => {
    const path = '/'
    if (isEn(lang)) {
      return path
    } else {
      return `/${lang}${path}`
    }
  },
  socialMedia: (lang: string) => '/social-media',
  multiple: (lang: string) => '/multiple',
  wifi: (lang: string) => '/wi-fi',
  terminal: (lang: string) => '/terminal',
  contact: (lang: string) => '/contact',
  sms: (lang: string) => '/sms',
  reader: (lang: string) => '/reader',
  editor: (lang: string) => '/editor'
} as const
