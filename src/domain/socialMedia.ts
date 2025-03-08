export const SocialMedia = {
  NotSet: 0,
  Facebook: 1, // 約29億人
  YouTube: 2, // 約25億人
  WhatsApp: 3, // 約20億人
  Instagram: 4, // 約20億人
  TikTok: 5, // 約10億人
  X: 6, // 約3.5億人
  LinkedIn: 7, // 約3.1億人
  Snapchat: 8, // 約3.1億人
  Pinterest: 9, // 約4.5億人
  Reddit: 10, // 約4.3億人
  WeChat: 11, // 約13億人
  Telegram: 12, // 約7億人
  Discord: 13, // 約3億人
  Tumblr: 14, // 約3.2億人
  Threads: 15, // 約1億人
  Mastodon: 16, // 約1000万人
  Bluesky: 17 // 約100万人
} as const

export const socialMediaList = Object.values(SocialMedia)

export const getSocialMediaName = (value: number): string => {
  const entry = Object.entries(SocialMedia).find(([key, val]) => val === value)
  return entry ? entry[0] : ''
}
