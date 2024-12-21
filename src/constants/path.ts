export const path = {
  url: (lang: string) => '/',
  socialMedia: (lang: string) => '/social-media',
  multiple: (lang: string) => '/multiple',
  wifi: (lang: string) => '/wi-fi',
  terminal: (lang: string) => '/terminal',
  contact: (lang: string) => '/contact',
  sms: (lang: string) => '/sms',
  reader: (lang: string) => '/reader',
  editor: (lang: string) => '/editor'
} as const
