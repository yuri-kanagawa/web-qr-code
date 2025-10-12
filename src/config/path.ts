export const path = {
  url: {
    index: ({ lang, queryParameter }: { lang: string, queryParameter?: { url?: string } }) => {
      const path = '/url'
      const queryString = queryParameter?.url ? `?url=${encodeURIComponent(queryParameter.url)}` : ''
      const finalPath = `${path}${queryString}`
      if (lang === 'en') {
        return finalPath
      } else {
        return `/${lang}${finalPath}`
      }
    }
  },
  socialMedia: {
    index: ({ lang }: { lang: string }) => {
      const path = '/social-media'
      if (lang === 'en') {
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
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    },
  },
  device: {
    index: ({ lang }: { lang: string }) => {
      const path = '/device'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    },
    redirect: ({ lang }: { lang: string }) => {
      const path = '/device/redirect'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    }
  },
  contact: {
    index: ({ lang }: { lang: string }) => {
      const path = '/contact'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    }
  },
  text: {
    index: ({ lang }: { lang: string }) => {
      const path = '/text'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    },
    read: ({ lang }: { lang: string }) => {
      const path = '/text/read'
      if (lang === 'en') {
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

      if (lang === 'en') {
        return finalPath
      }
      return `/${lang}${finalPath}`
    }
  },
  email: {
    index: ({ lang }: { lang: string }) => {
      const path = '/email'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    }
  },
  reader: {
    index: ({ lang }: { lang: string }) => {
      const path = '/reader'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    }
  },
  edit: {
    index: ({ lang }: { lang: string }) => {
      const path = '/edit'
      if (lang === 'en') {
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
      if (lang === 'en') {
        return `${path}${queryString}`
      }
      return `/${lang}${path}${queryString}`
    }
  },
  map: {
    index: ({ lang }: { lang: string }) => {
      const path = '/map'
      if (lang === 'en') {
        return path
      }
      return `/${lang}${path}`
    }
  }
} as const
