// IPジオロケーションAPIから位置情報を取得
export const getLocationFromIP = async (): Promise<{
  latitude: number
  longitude: number
  country?: string
}> => {
  try {
    console.log('Fetching location from IP...')
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    console.log('IP geolocation result:', data)

    if (
      data.latitude &&
      data.longitude &&
      !isNaN(data.latitude) &&
      !isNaN(data.longitude)
    ) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country_name
      }
    } else {
      console.warn('Invalid location data from API:', data)
      // デフォルト座標（日本の中心）
      return {
        latitude: 35.681236,
        longitude: 139.767125,
        country: 'Japan'
      }
    }
  } catch (error) {
    console.error('Error fetching location from IP:', error)
    // デフォルト座標（日本の中心）
    return {
      latitude: 35.681236,
      longitude: 139.767125,
      country: 'Japan'
    }
  }
}
