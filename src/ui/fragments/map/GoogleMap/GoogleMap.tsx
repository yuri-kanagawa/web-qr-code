'use client'
import { FC, useEffect, useState } from 'react'
import { Box, BoxProps } from '@mui/material'
import { CenterLoading } from '@/ui/fragments/loading'

type LocationValue = {
  latitude?: number
  longitude?: number
}

type Props = {
  value: LocationValue
  boxProps?: BoxProps
}

// デフォルト座標（日本の中心）
const DEFAULT_LOCATION = {
  latitude: 35.681236,
  longitude: 139.767125,
  country: 'Japan'
}

// IPジオロケーションAPIから位置情報を取得
const getLocationFromIP = async () => {
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
      return DEFAULT_LOCATION
    }
  } catch (error) {
    console.warn('IP geolocation failed, using default location:', error)
    return DEFAULT_LOCATION
  }
}

export const GoogleMap: FC<Props> = ({ value, boxProps }) => {
  const [defaultLocation, setDefaultLocation] = useState(DEFAULT_LOCATION)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true)
      const location = await getLocationFromIP()
      console.log('Setting default location:', location)
      setDefaultLocation(location)
      setIsLoading(false)
    }

    fetchLocation()
  }, [])

  // ユーザーが入力した値がある場合はそれを使用、なければIPから取得した位置を使用
  const hasValidLatitude = value.latitude && !isNaN(Number(value.latitude))
  const hasValidLongitude = value.longitude && !isNaN(Number(value.longitude))

  const latitude = hasValidLatitude
    ? Number(value.latitude)
    : defaultLocation.latitude
  const longitude = hasValidLongitude
    ? Number(value.longitude)
    : defaultLocation.longitude

  // 常に地図を表示（IPジオロケーションの結果があれば）
  const shouldShowMap =
    !isLoading && defaultLocation.latitude && defaultLocation.longitude

  console.log('Final coordinates:', {
    latitude,
    longitude,
    hasValidLatitude,
    hasValidLongitude,
    userValue: value,
    shouldShowMap
  })

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        border: '1px solid #ddd',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative'
      }}
      {...boxProps}
    >
      {isLoading ? (
        <CenterLoading />
      ) : (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=${hasValidLatitude || hasValidLongitude ? 15 : 5}&output=embed`}
          allowFullScreen
          title="Google Maps"
        />
      )}
    </Box>
  )
}
