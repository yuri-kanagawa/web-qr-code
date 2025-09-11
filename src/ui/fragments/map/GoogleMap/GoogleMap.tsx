'use client'
import { FC } from 'react'
import { Box, BoxProps } from '@mui/material'

type LocationValue = {
  latitude?: number
  longitude?: number
}

type Props = {
  value: LocationValue
  boxProps?: BoxProps
  isLoading: boolean
}

// デフォルト座標（日本の中心）
const DEFAULT_LOCATION = {
  latitude: 35.681236,
  longitude: 139.767125
}

export const GoogleMap: FC<Props> = ({
  value,
  boxProps,
  isLoading = false
}) => {
  // propsで受け取った値がある場合はそれを使用、なければデフォルト位置を使用
  const hasValidLatitude = value.latitude && !isNaN(Number(value.latitude))
  const hasValidLongitude = value.longitude && !isNaN(Number(value.longitude))

  const latitude = hasValidLatitude
    ? Number(value.latitude)
    : DEFAULT_LOCATION.latitude
  const longitude = hasValidLongitude
    ? Number(value.longitude)
    : DEFAULT_LOCATION.longitude

  console.log('GoogleMap coordinates:', {
    latitude,
    longitude,
    hasValidLatitude,
    hasValidLongitude,
    userValue: value
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
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=${hasValidLatitude || hasValidLongitude ? 15 : 5}&output=embed`}
        allowFullScreen
        title="Google Maps"
      />
    </Box>
  )
}
