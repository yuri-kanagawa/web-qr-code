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
    index: ({ lang }: { lang: string }) => {
      const path = '/sms'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
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
    index: ({ lang }: { lang: string }) => {
      const path = '/phone'
      if (isEn(lang)) {
        return path
      }
      return `/${lang}${path}`
    }
  }
} as const
